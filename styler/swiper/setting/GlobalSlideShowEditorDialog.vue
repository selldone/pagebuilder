<!--
  - Copyright (c) 2023. Selldone® Business OS™
  -
  - Author: M.Pajuhaan
  - Web: https://selldone.com
  - ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  -
  - All rights reserved. In the weave of time, where traditions and innovations intermingle, this content was crafted.
  - From the essence of thought, through the corridors of creativity, each word, and sentiment has been molded.
  - Not just to exist, but to inspire. Like an artist's stroke or a sculptor's chisel, every nuance is deliberate.
  - Our journey is not just about reaching a destination, but about creating a masterpiece.
  - Tread carefully, for you're treading on dreams.
  -->

<template>
  <v-navigation-drawer
    v-model="show_edit_slide"
    theme="dark"
    location="right"
    temporary
    :width="
      $vuetify.display.xlAndUp ? 560 : $vuetify.display.lgAndUp ? 420 : 320
    "
    :scrim="false"
    color="#1e1e1e"
    class="x-page-builder-options-slider"
  >
    <v-card class="text-start" flat>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn variant="text" @click="show_edit_slide = false" size="x-large">
            <v-icon class="me-1">close </v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-text v-if="dialog_pre">

        <!-- ████████████████████ Slides ████████████████████ -->
        <s-widget-header
          title="Slides"
          icon="layers"
          add-caption="Add Slide"
          @click:add="addSlide"
          class="mt-5"
          button-color="#fff"
        ></s-widget-header>
        <v-list-subheader
          >You can customize and make your filter here.
        </v-list-subheader>

        <v-expansion-panels>
          <v-expansion-panel
            v-for="(item, i) in slide.items"
            :key="i"
            @click="goToSlide(i+1)"
          >
            <v-expansion-panel-title class="text-start py-1">
              <div class="flex-grow-0">
                <v-avatar v-if="item.image?.src" size="16" rounded class="me-2">
                  <v-img :src="getShopImagePath(item.image.src)" ></v-img>
                </v-avatar>
                <v-icon v-else class="me-2" size="16">view_headline</v-icon>
                Slide {{ i + 1 }}
              </div>
              <div
                v-if="StripTags(item.title)"
                class="mx-2 flex-grow-1 font-weight-bold"
              >
                | {{ StripTags(item.title)?.limitWords(5) }}
              </div>
              <v-btn icon @click.stop="removeSlide(i)" class="flex-grow-0" size="small">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <s-image-uploader
                v-if="item.image"
                :image="getShopImagePath(item.image.src)"
                @new-path="(path) => (item.image.src = path)"
                auto-compact
                :server="getPageBuilderUploadUrlImage()"
                clearable
                @onClear="item.image.src = null"
                dark
                label="Slide Image"
              />

              <v-text-field v-model="item.title" label="Slide Title" variant="underlined">
              </v-text-field>

              <v-text-field v-model="item.subtitle" label="Slide Subtitle" variant="underlined">
              </v-text-field>

              <template v-if="slide.thumbs">
                <v-text-field
                  v-model="item.thumb_title"
                  label="Thumbnail Title" variant="underlined"
                >
                </v-text-field>

                <v-text-field
                  v-model="item.thumb_subtitle"
                  label="Thumbnail Subtitle" variant="underlined"
                >
                </v-text-field>
              </template>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <!-- ████████████████████ Settings ████████████████████ -->

<landing-settings-input v-model="target[keySlide]" :structure="SlideStructure"></landing-settings-input>





        <s-widget-header
          title="Settings"
          icon="settings"
          @click:add="refresh()"
          add-caption="Refresh"
          add-icon="refresh"
          add-text
          class="mt-5"
        ></s-widget-header>
        <v-list-subheader
          >You can customize and make your filter here.
        </v-list-subheader>




        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title
              ><span
                ><v-icon class="me-1" size="small">pan_tool_alt</v-icon>
                Behaviour</span
              >
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <!-- ▃▃▃▃▃▃▃▃▃▃ Loop ▃▃▃▃▃▃▃▃▃▃ -->

              <s-smart-toggle
                v-model="slide.loop"
                @change="refresh()"
                dark
                true-icon="linear_scale"
                false-icon="all_inclusive"
                true-title="Loop: Forward"
                false-title="Loop: Infinite"
                true-description="One slide direction."
                false-description="Auto rotate slides. This option available only in the live page."
                class="my-3"
                false-gray
              >
              </s-smart-toggle>

              <!-- ▃▃▃▃▃▃▃▃▃▃ Pagination ▃▃▃▃▃▃▃▃▃▃ -->

              <s-smart-select
                v-model="slide.pagination"
                @change="refresh()"
                dark
                item-value="code"
                item-text="title"
                item-description="description"
                item-icon="icon"
                :items="[
                  {
                    code: 'bullets',
                    title: 'Pagination: Bullets',
                    description: '',
                    icon: 'more_horiz',
                  },
                  {
                    code: 'fraction',
                    title: 'Pagination: Fraction',
                    description: '',
                    icon: 'numbers',
                  },
                  {
                    code: 'progressbar',
                    title: 'Pagination: Progress Bar',
                    description: '',
                    icon: 'horizontal_rule',
                  },
                  {
                    code: 'custom',
                    title: 'Pagination: None',
                    description: '',
                    icon: 'check_box_outline_blank',
                  },
                ]"
                class="my-3"
              >
              </s-smart-select>

              <!-- ▃▃▃▃▃▃▃▃▃▃ Navigation ▃▃▃▃▃▃▃▃▃▃ -->

              <s-smart-toggle
                v-model="slide.navigation"
                @change="refresh()"
                dark
                true-icon="settings_ethernet"
                false-icon="code_off"
                true-title="Navigation: Enable"
                false-title="Navigation: Disable"
                true-description="Display of navigation arrows will occur."
                false-description="The slide navigation arrows will not be displayed."
                class="my-3"
                false-gray
              >
              </s-smart-toggle>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- ▃▃▃▃▃▃▃▃▃▃ Size ▃▃▃▃▃▃▃▃▃▃ -->

          <v-expansion-panel>
            <v-expansion-panel-title
              ><span
                ><v-icon class="me-1" size="small">straighten</v-icon>
                Size</span
              >
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <s-number-input
                v-model="slide.slidesPerView"
                @blur="refresh()"
                label="Preview count"
                messages="Only available in the Slide, Coverflow, and Cards  effect mode."
              ></s-number-input>
              <s-number-input
                v-model="slide.spaceBetween"
                @blur="refresh()"
                label="Space between"
              ></s-number-input>

              <s-number-dimension-input
                v-model="slide.height"
                @blur="refresh()"
                label="Height"
              ></s-number-dimension-input>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- ▃▃▃▃▃▃▃▃▃▃ Animation ▃▃▃▃▃▃▃▃▃▃ -->

          <v-expansion-panel>
            <v-expansion-panel-title
              ><span
                ><v-icon class="me-1" size="small">animation</v-icon>
                Animations
              </span>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <!-- ▃▃▃▃▃▃▃▃▃▃ Direction ▃▃▃▃▃▃▃▃▃▃ -->

              <s-smart-toggle
                v-model="slide.vertical"
                @change="refresh()"
                dark
                true-icon="vertical_distribute"
                false-icon="horizontal_distribute"
                true-title="Direction: Vertical"
                false-title="Direction: Horizontal"
                true-description="The presentation slides will be displayed in a portrait orientation."
                false-description="The presentation slides will be displayed in landscape orientation."
                class="my-3"
                false-gray
              >
              </s-smart-toggle>

              <!-- ▃▃▃▃▃▃▃▃▃▃ Auto Play ▃▃▃▃▃▃▃▃▃▃ -->

              <s-smart-toggle
                v-model="slide.autoplay"
                @change="refresh()"
                dark
                true-icon="play_arrow"
                false-icon="stop"
                true-title="Auto Play: On"
                false-title="Auto Play: Off"
                true-description="Auto play slides. This option available only in the live page."
                false-description="Manually slide change only."
                class="my-3"
                false-gray
              >
              </s-smart-toggle>

              <s-smart-select
                v-model="slide.effect"
                :items="EFFECTS"
                @change="refresh()"
                item-text="title"
                item-value="value"
                label="Slide Effect"
                :return-object="false"
                class="my-3"
                dark
              >
              </s-smart-select>

              <s-smart-select
                v-model="slide.active"
                :items="ACTIVE_CENTER"
                @change="refresh()"
                item-text="title"
                item-value="value"
                label="Center Slide Style"
                :return-object="false"
                dark
                class="my-3"
              >
              </s-smart-select>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- ▃▃▃▃▃▃▃▃▃▃ Thumbnail ▃▃▃▃▃▃▃▃▃▃ -->

          <v-expansion-panel v-if="el?.hasAttribute('has-thumbnail')">
            <v-expansion-panel-title
              ><span
                ><v-icon class="me-1" size="small">calendar_view_month</v-icon>
                Thumbnail

                <v-icon
                  v-if="slide.thumbs"
                  color="green"
                  class="mx-1"
                  size="small"
                  >check_circle</v-icon
                >
              </span>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <s-smart-toggle
                v-model="slide.thumbs"
                @change="refresh()"
                dark
                true-icon="view_module"
                false-icon="view_column"
                true-title="Has Thumbnail"
                false-title="No Thumbnail"
                true-description="Incorporate thumbnail views of the slides at the bottom of the primary slide and establish connections between them."
                false-description="Manually slide change only."
                class="my-3"
                false-gray
              >
              </s-smart-toggle>

              <v-expand-transition>
                <div v-if="slide.thumbs">
                  <s-smart-toggle
                    v-model="slide.thumbs_round"
                    @change="refresh()"
                    dark
                    true-icon="rounded_corner"
                    false-icon="crop_square"
                    true-title="Rounded Corner"
                    false-title="Rect Corner"
                    class="my-3"
                    false-gray
                  >
                  </s-smart-toggle>

                  <s-smart-select
                    v-model="slide.thumbs_type"
                    :items="THUMBS_TYPES"
                    item-text="title"
                    item-value="class"
                    label="Thumbnail Style"
                    :return-object="false"
                    dark
                    class="my-3"
                  >
                  </s-smart-select>

                  <s-smart-select
                    v-model="slide.thumbs_active"
                    :items="ACTIVE_CENTER"
                    @change="refresh()"
                    item-text="title"
                    item-value="value"
                    label="Center Slide Style"
                    :return-object="false"
                    dark
                    class="my-3"
                  >
                  </s-smart-select>
                </div>
              </v-expand-transition>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import { HighlightEditingElements } from "@app-page-builder/src/helpers/HighlightEditingElements";
import SNumberDimensionInput from "@components/ui/dimension/SNumberDimensionInput.vue";
import SNumberInput from "@components/ui/input/number/SNumberInput.vue";
import { Seeder } from "@app-page-builder/src/seeder";
import * as types from "@app-page-builder/src/types";

import SSmartSwitch from "@components/smart/SSmartSwitch.vue";
import SSmartToggle from "@components/smart/SSmartToggle.vue";
import SSmartSelect from "@components/smart/SSmartSelect.vue";
import { StripTags } from "@core/helper/html/HtmlHelper";
import SImageUploader from "@components/uploader/SImageUploader.vue";
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";
import _ from "lodash-es";
import PageEventBusMixin from "@app-page-builder/mixins/PageEventBusMixin";
import LandingSettingsInput from "@app-page-builder/styler/settings/LandingSettingsInput.vue";
import {SlideStructure} from "@app-page-builder/styler/swiper/SwiperOptions";

const THUMBS_TYPES = [
  { title: "None", class: "" },
  { title: "Outline", class: "thumb-outline" },
  { title: "Morph", class: "thumb-morph" },
  { title: "Paper", class: "thumb-paper" },
  { title: "Large shadow", class: "thumb-shadow-lg" },
  { title: "Small shadow", class: "thumb-shadow-sm" },
];

const EFFECTS = [
  { title: "Slide", value: "slide" },
  { title: "Fade", value: "fade" },
  { title: "Cube", value: "cube" },
  { title: "Coverflow", value: "coverflow" },
  { title: "Flip", value: "flip" },
  // {title:'Creative',value:'creative'},
  { title: "Cards", value: "cards" },
];

const ACTIVE_CENTER = [
  { title: "None", value: "" },
  { title: "Elevation", value: "slide-elevation" },
  { title: "Bordered", value: "slide-bordered" },
  { title: "Slide Up", value: "slide-up" },
];

export default {
  name: "GlobalSlideShowEditorDialog",

  mixins: [PageBuilderMixin, PageEventBusMixin],

  components: {
    LandingSettingsInput,
    SImageUploader,
    SSmartSelect,
    SSmartToggle,

    SNumberInput,
    SNumberDimensionInput,
  },

  props: {},
  data: () => ({
    SlideStructure:SlideStructure,
    THUMBS_TYPES: THUMBS_TYPES,
    EFFECTS: EFFECTS,
    ACTIVE_CENTER: ACTIVE_CENTER,

    el: null,
    section: null,
    target: null,
    keySlide: null, // ex. slide

    //----------------------- Bg image -----------------------
    show_edit_slide: false,
    dialog_pre: false,

    slide: null,
    lock: true,
    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {},
  watch: {
    show_edit_slide(dialog) {
      // Keep highlight active element:
      if (!dialog) HighlightEditingElements.RemoveAllElementFocusEditing();
      else if (this.el) HighlightEditingElements.Activate(this.el);
    },

    lock(lock) {
      this.section.lock = lock;
      this.refresh();
    },
  },
  created() {},
  mounted() {
    this.EventBus.$on(
      "show:GlobalSlideShowEditorDialog",

      ({ el, section, target, keySlide }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.section = section;
        this.target = target;
        this.keySlide = keySlide;
        this.showDialog();
      },
    );

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――
    this.key_listener_keydown = (event) => {
      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        if (this.show_edit_slide) {
          // Close tools
          this.show_edit_slide = false;
          event.preventDefault();
          return false;
        }
      }
    };
    document.addEventListener("keydown", this.key_listener_keydown, true);
    //――――――――――――――――――――――  END Editor key listener ――――――――――――――――――――

    //█████████████████████████████████████████████████████████████
    //――――――――――――――― Event Bus ――――――――――――――――
    //█████████████████████████████████████████████████████████████
    // Listen for show loading data from server
    this.EventBus.$on(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.show_edit_slide = false;
    });
  },
  beforeUnmount() {
    this.EventBus.$off("show:GlobalSlideShowEditorDialog");
    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    StripTags,
    showDialog() {
      this.slide = this.target[this.keySlide];

      this.lock = this.section.lock; // temporary values

      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.show_edit_slide = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },
    //----------------------------------------------------------------------------

    addSlide() {
      this.slide.items.push(Seeder.seed(types.Slide));
      this.refresh();
    },

    removeSlide(index) {
      this.openDeleteAlert(() => {
        this.slide.items.splice(index, 1);
        this.refresh();
      });
    },

    toggleLoop() {
      this.slide.loop = !this.slide.loop;
      this.refresh();
    },

    toggleNavigation() {
      this.slide.navigation = !this.slide.navigation;
      this.refresh();
    },

    togglePagination() {
      this.slide.pagination =
        this.slide.pagination === "bullets"
          ? "fraction"
          : this.slide.pagination === "fraction"
            ? "progressbar"
            : this.slide.pagination === "progressbar"
              ? "custom"
              : "bullets";

      this.refresh();
    },

    toggleDirection() {
      this.slide.vertical = !this.slide.vertical;
      this.refresh();
    },

    toggleAutoplay() {
      this.slide.autoplay = !this.slide.autoplay;
      this.refresh();
    },

    refresh() {
      this.setSlideDebounced();
    },

    goToSlide(index) {
      this.section.__goToSlide(index);
    },

    //----------------------------------------------------------------------------

    setSlideDebounced: _.debounce(function () {
      this.setSlide();
    }, 100),

    setSlide() {
      if (!this.show_edit_slide || this.LOCK) return;

      this.target[this.keySlide] = this.slide; // Force update slide to trigger watch on component and refresh slider

      this.section?.__refreshCallback();
    },
  },
};
</script>

<style scoped lang="scss"></style>
