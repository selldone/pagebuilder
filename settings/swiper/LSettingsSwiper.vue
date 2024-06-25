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
    :scrim="false"
    :width="
      $vuetify.display.xlAndUp ? 560 : $vuetify.display.lgAndUp ? 420 : 320
    "
    class="x-page-builder-options-slider"
    color="#1e1e1e"
    location="right"
    temporary
    theme="dark"
  >
    <v-card class="text-start pb-16" flat>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="show_edit_slide = false">
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-text v-if="dialog_pre">
        <!-- ████████████████████ Slides ████████████████████ -->
        <s-widget-header
          add-caption="Add Slide"
          button-color="#fff"
          class="mt-5"
          icon="layers"
          title="Slides"
          @click:add="addSlide"
        ></s-widget-header>
        <v-list-subheader
          >List of slides in the swiper. Click on a slide to edit it.
        </v-list-subheader>

        <v-expansion-panels>
          <v-expansion-panel
            v-for="(item, i) in target[keySlide].items"
            :key="i"
            @click="goToSlide(i)"
          >
            <v-expansion-panel-title class="text-start py-1">
              <div class="flex-grow-0">
                <v-avatar v-if="item.image?.src" class="me-2" rounded size="16">
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
                class="flex-grow-0"
                icon
                size="small"
                @click.stop="removeSlide(i)"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <s-image-uploader
                v-if="item.image"
                :image="getShopImagePath(item.image.src)"
                :server="upload_image_url"
                auto-compact
                clearable
                dark
                label="Slide Image"
                @onClear="item.image.src = null"
                @new-path="(path) => (item.image.src = path)"
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
            :items="[
              {
                value: 'horizontal',
                icon: 'horizontal_distribute',
              },
              { value: 'vertical', icon: 'vertical_distribute' },
            ]"
            icon="turn_slight_right"
            label="Slides direction"
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
            icon="mouse"
            label="Grab cursor"
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
import LEventsName from "../../mixins/events/name/LEventsName";
import { LUtilsHighlight } from "../../utils/highligh/LUtilsHighlight";
import { LUtilsSeeder } from "../../utils/seeder/LUtilsSeeder";
import * as types from "../../src/types/types";
import { StripTags } from "@selldone/core-js/helper/html/HtmlHelper";
import SImageUploader from "@selldone/components-vue/ui/uploader/SImageUploader.vue";
import _ from "lodash-es";
import SSettingSwitch from "../../styler/settings/switch/SSettingSwitch.vue";
import SSettingSelect from "../../styler/settings/select/SSettingSelect.vue";
import SSettingGroup from "../../styler/settings/group/SSettingGroup.vue";
import OSwiperSize from "../../settings/swiper/items/Size/OSwiperSize.vue";
import OSwiperAutoPlay from "../../settings/swiper/items/AutoPlay/OSwiperAutoPlay.vue";
import OSwiperThumbnail from "../../settings/swiper/items/Thumbnail/OSwiperThumbnail.vue";
import OSwiperEffect from "../../settings/swiper/items/Effect/OSwiperEffect.vue";
import OSwiperKeyboard from "../../settings/swiper/items/Keyboard/OSwiperKeyboard.vue";
import OSwiperPagination from "../../settings/swiper/items/Pagination/OSwiperPagination.vue";
import OSwiperNavigation from "../../settings/swiper/items/Navigation/OSwiperNavigation.vue";
import OSwiperLoop from "../../settings/swiper/items/Loop/OSwiperLoop.vue";
import OSwiperInitialSlide from "../../settings/swiper/items/InitialSlide/OSwiperInitialSlide.vue";
import OSwiperSpaceBetween from "../../settings/swiper/items/SpaceBetween/OSwiperSpaceBetween.vue";
import OSwiperCenteredSlides from "../../settings/swiper/items/CenteredSlides/OSwiperCenteredSlides.vue";
import OSwiperGrid from "../../settings/swiper/items/Grid/OSwiperGrid.vue";
import OSwiperSlidesPerGroup from "../../settings/swiper/items/SlidesPerGroup/OSwiperSlidesPerGroup.vue";
import OSwiperSlidesPerView from "../../settings/swiper/items/SlidesPerView/OSwiperSlidesPerView.vue";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import {EventBus} from "@selldone/core-js/events/EventBus";

export default {
  name: "LSettingsSwiper",

  mixins: [LMixinEvents],

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

  props: {
    builder: {
      type: Object,
      required: true,
    },
  },
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
    upload_image_url() {
      return this.builder.getImageUploadUrl();
    },
  },
  watch: {
    show_edit_slide(dialog) {
      // Keep highlight active element:
      if (!dialog) LUtilsHighlight.RemoveAllElementFocusEditing();
      else if (this.el) LUtilsHighlight.Activate(this.el);
    },

    lock(lock) {
      this.section.lock = lock;
      this.refresh();
    },
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsSwiper",

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
    EventBus.$on(LEventsName.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.show_edit_slide = false;
    });
  },
  beforeUnmount() {
    EventBus.$off("show:LSettingsSwiper");
    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

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
      this.target[this.keySlide].items.push(LUtilsSeeder.seed(types.Slide));
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

<style lang="scss" scoped></style>
