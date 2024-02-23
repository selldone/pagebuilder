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
    <v-card class="text-start pb-16" flat>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn variant="text" @click="show_edit_slide = false" size="x-large">
            <v-icon class="me-1">close</v-icon>
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
            v-for="(item, i) in target[keySlide].items"
            :key="i"
            @click="goToSlide(i )"
          >
            <v-expansion-panel-title class="text-start py-1">
              <div class="flex-grow-0">
                <v-avatar v-if="item.image?.src" size="16" rounded class="me-2">
                  <v-img :src="getShopImagePath(item.image.src)"></v-img>
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
              <v-btn
                icon
                @click.stop="removeSlide(i)"
                class="flex-grow-0"
                size="small"
              >
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

              <v-text-field
                v-model="item.title"
                label="Slide Title"
                variant="underlined"
              >
              </v-text-field>

              <v-text-field
                v-model="item.subtitle"
                label="Slide Subtitle"
                variant="underlined"
              >
              </v-text-field>

              <template v-if="slide.thumbs">
                <v-text-field
                  v-model="item.thumb_title"
                  label="Thumbnail Title"
                  variant="underlined"
                >
                </v-text-field>

                <v-text-field
                  v-model="item.thumb_subtitle"
                  label="Thumbnail Subtitle"
                  variant="underlined"
                >
                </v-text-field>
              </template>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <!-- ████████████████████ Appearance ████████████████████ -->

        <s-setting-group title="Appearance">
          <s-setting-select
            v-model="target[keySlide].direction"
            title="Slides direction"
            icon="turn_slight_right"
            :items="[
              {
                value: 'horizontal',
                icon: 'horizontal_distribute',
              },
              { value: 'vertical', icon: 'vertical_distribute' },
            ]"
          ></s-setting-select>

          <o-swiper-slides-per-view
            v-model="target[keySlide]"
          ></o-swiper-slides-per-view>
          <o-swiper-slides-per-group
            v-model="target[keySlide]"
          ></o-swiper-slides-per-group>

          <o-swiper-grid v-model="target[keySlide]"></o-swiper-grid>
          <o-swiper-centered-slides
            v-model="target[keySlide]"
          ></o-swiper-centered-slides>
          <o-swiper-space-between
            v-model="target[keySlide]"
          ></o-swiper-space-between>

          <o-swiper-initial-slide
            v-model="target[keySlide]"
          ></o-swiper-initial-slide>

          <o-swiper-loop v-model="target[keySlide]"></o-swiper-loop>

          <s-setting-switch
            v-model="target[keySlide].grabCursor"
            title="Grab cursor"
            icon="mouse"
          ></s-setting-switch>
        </s-setting-group>

        <!-- ████████████████████ Effects ████████████████████ -->

        <o-swiper-effect v-model="target[keySlide]"></o-swiper-effect>

        <!-- ████████████████████ Size ████████████████████ -->
        <o-swiper-size v-model="target[keySlide]"></o-swiper-size>

        <!-- ████████████████████ Auto Play ████████████████████ -->
        <o-swiper-auto-play v-model="target[keySlide]"></o-swiper-auto-play>

        <!-- ████████████████████ Thumbnail ████████████████████ -->

        <o-swiper-thumbnail
            v-if="hasThumbnail"
            v-model="target[keySlide]"
        ></o-swiper-thumbnail>


        <!-- ████████████████████ Modules ████████████████████ -->
        <s-setting-group title="Modules"></s-setting-group>

        <o-swiper-navigation v-model="target[keySlide]"></o-swiper-navigation>

        <o-swiper-pagination v-model="target[keySlide]"></o-swiper-pagination>

        <o-swiper-keyboard v-model="target[keySlide]"></o-swiper-keyboard>




      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import { HighlightEditingElements } from "@app-page-builder/src/helpers/HighlightEditingElements";
import { Seeder } from "@app-page-builder/src/seeder";
import * as types from "@app-page-builder/src/types";
import SSmartToggle from "@components/smart/SSmartToggle.vue";
import SSmartSelect from "@components/smart/SSmartSelect.vue";
import { StripTags } from "@core/helper/html/HtmlHelper";
import SImageUploader from "@components/uploader/SImageUploader.vue";
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";
import _ from "lodash-es";
import PageEventBusMixin from "@app-page-builder/mixins/PageEventBusMixin";
import SSettingSwitch from "@app-page-builder/styler/settings/switch/SSettingSwitch.vue";
import SSettingSelect from "@app-page-builder/styler/settings/select/SSettingSelect.vue";
import SSettingGroup from "@app-page-builder/styler/settings/group/SSettingGroup.vue";
import OSwiperSlidesPerView from "@app-page-builder/styler/swiper/setting/items/SlidesPerView/OSwiperSlidesPerView.vue";
import OSwiperSlidesPerGroup from "@app-page-builder/styler/swiper/setting/items/SlidesPerGroup/OSwiperSlidesPerGroup.vue";
import OSwiperGrid from "@app-page-builder/styler/swiper/setting/items/Grid/OSwiperGrid.vue";
import OSwiperCenteredSlides from "@app-page-builder/styler/swiper/setting/items/CenteredSlides/OSwiperCenteredSlides.vue";
import OSwiperSpaceBetween from "@app-page-builder/styler/swiper/setting/items/SpaceBetween/OSwiperSpaceBetween.vue";
import OSwiperInitialSlide from "@app-page-builder/styler/swiper/setting/items/InitialSlide/OSwiperInitialSlide.vue";
import OSwiperLoop from "@app-page-builder/styler/swiper/setting/items/Loop/OSwiperLoop.vue";
import OSwiperNavigation from "@app-page-builder/styler/swiper/setting/items/Navigation/OSwiperNavigation.vue";
import OSwiperPagination from "@app-page-builder/styler/swiper/setting/items/Pagination/OSwiperPagination.vue";
import OSwiperSize from "@app-page-builder/styler/swiper/setting/items/Size/OSwiperSize.vue";
import OSwiperAutoPlay from "@app-page-builder/styler/swiper/setting/items/AutoPlay/OSwiperAutoPlay.vue";
import OSwiperThumbnail from "@app-page-builder/styler/swiper/setting/items/Thumbnail/OSwiperThumbnail.vue";
import OSwiperEffect from "@app-page-builder/styler/swiper/setting/items/Effect/OSwiperEffect.vue";
import OSwiperKeyboard from "@app-page-builder/styler/swiper/setting/items/Keyboard/OSwiperKeyboard.vue";

export default {
  name: "GlobalSlideShowEditorDialog",

  mixins: [PageBuilderMixin, PageEventBusMixin],

  components: {
    OSwiperKeyboard,
    OSwiperEffect,
    OSwiperThumbnail,
    OSwiperAutoPlay,
    OSwiperSize,
    OSwiperPagination,
    OSwiperNavigation,
    OSwiperLoop,
    OSwiperInitialSlide,
    OSwiperSpaceBetween,
    OSwiperCenteredSlides,
    OSwiperGrid,
    OSwiperSlidesPerGroup,
    OSwiperSlidesPerView,
    SSettingGroup,
    SSettingSelect,
    SSettingSwitch,
    SImageUploader,

  },

  props: {},
  data: () => ({
    el: null,
    section: null,
    target: null,
    keySlide: null, // ex. slide
    hasThumbnail: false,

    //----------------------- Bg image -----------------------
    show_edit_slide: false,
    dialog_pre: false,

    slide: null,
    lock: true,
    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {
    effect() {
      return this.target?.effect;
    },
  },
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

      ({ el, section, target, keySlide, hasThumbnail }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.section = section;
        this.target = target;
        this.keySlide = keySlide;
        this.hasThumbnail = hasThumbnail;
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
      this.target[this.keySlide].items.push(Seeder.seed(types.Slide));
      this.refresh();
    },

    removeSlide(index) {
      this.openDeleteAlert(() => {
        this.slide.items.splice(index, 1);
        this.refresh();
      });
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

      //this.section?.__refreshCallback();
    },
  },
};
</script>

<style scoped lang="scss"></style>
