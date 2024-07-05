<!--
  - Copyright (c) 2023-2024. Selldone® Business OS™
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

<template xmlns:v-styler="http://www.w3.org/1999/xhtml">
  <x-component :object="$sectionObject" :augment="augment"></x-component>


  <x-section
    v-if="false"
    v-styler:swiper="{
      target: $sectionData,
      keySlide: 'slide',
    }"
    :object="$sectionData"
    class="pa-0"
  >
    <!-- ████████████████████████ Main ████████████████████████ -->
    <swiper
      ref="main_swiper_ref"
      :allow-touch-move="allow_touch_move"
      :auto-height="
        SLIDE_DATA.autoHeight !== undefined ? SLIDE_DATA.autoHeight : false
      "
      :autoplay="autoplay"
      :centered-slides="SLIDE_DATA.centeredSlides"
      :cubeEffect="{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }"
      :materialEffect="{
        slideSplitRatio: 0.65,
      }"
      :direction="SLIDE_DATA.direction ? SLIDE_DATA.direction : 'horizontal'"
      :effect="SLIDE_DATA.effect"
      :grab-cursor="SLIDE_DATA.grabCursor"
      :grid="SLIDE_DATA.grid"
      :height="SLIDE_DATA.height"
      :initial-slide="SLIDE_DATA.initialSlide"
      :keyboard="keyboard"
      :loop="SLIDE_DATA.loop"
      :modules="modules"
      :navigation="navigation"
      :pagination="pagination"
      :slides-per-group="
        SLIDE_DATA.slidesPerGroup !== 'auto' ? SLIDE_DATA.slidesPerGroup : 1
      "
      :slides-per-group-auto="SLIDE_DATA.slidesPerGroup === 'auto' /*boolean*/"
      :slides-per-view="calcSlidesPerView()"
      :space-between="SLIDE_DATA.spaceBetween ? SLIDE_DATA.spaceBetween : 0"
      :style="{ height: SLIDE_DATA.height }"
      :thumbs="{ swiper: thumbsSwiper }"
      slide-to-clicked-slide
      @realIndexChange="(s) => (realIndex = s.realIndex)"
      @swiper="onMainSwiperInitialized"
      :class="{ 'overflow-visible': is_overflow_visible }"
    >
      <swiper-slide
        v-for="(_slide, index) in $sectionData.slide.items"
        :key="index"
      >
        <!-- 📹 Background video -->
        <x-video-background
          v-if="_slide.container?.background?.bg_video"
          :video="getVideoUrl(_slide.container?.background?.bg_video)"
        >
        </x-video-background>

        <div
          :class="[
            realIndex === index ? SLIDE_DATA.active : null,
            {
              'swiper-material-wrapper': is_material_effect,
            },
          ]"
          :style="[backgroundStyle(_slide.background)]"
          class="position-relative h-100"
        >
          <!-- ----------------- Image Layer ----------------- -->

          <x-uploader
            v-model:object="_slide.image"
            :augment="augment"
            :class="{ pen: !$section.lock }"
            style="min-height: 100%; min-width: 100%; max-height: 100%"
          />

          <!-- ----------------- Text Layer ----------------- -->
          <v-container
            v-styler:container="{
              target: _slide.container,
              hasFluid: true,
            }"
            :fluid="_slide.container?.fluid"
            :class="[
              _slide.container.classes,
              {
                'swiper-material-content': is_material_effect,
              },
            ]"
            :style="[_slide.container.style]"
            class="abs-container"
            cloneable="true"
            style="z-index: 100"
            @click="
              $builder.onClickClone($event, _slide.container, [
                'classes',
                'style',
              ]);
              $forceUpdate();
            "
          >
            <v-row
              v-styler:row="{
                target: _slide,
                hasArrangement: true,
                hasFluid: false,
              }"
              :align="_slide.row ? _slide.row.align : 'center'"
              :justify="_slide.row ? _slide.row.justify : 'start'"
              no-gutters
            >
              <div>
                <x-text
                  v-model:object="_slide.title"
                  :augment="augment"
                  initial-type="h2"
                ></x-text>

                <x-text
                  v-model:object="_slide.subtitle"
                  :augment="augment"
                  initial-type="p"
                ></x-text>

                <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Start Column Action Button ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->

                <x-button
                  v-if="_slide.button"
                  v-styler:button="{
                    target: _slide.button,
                  }"
                  :augment="augment"
                  :object="_slide.button"
                  :editing="$builder.isEditing"
                  class="m-2 z2"
                >
                </x-button>
                <v-slide-x-reverse-transition
                  v-if="$builder.isEditing"
                  hide-on-leave
                >
                  <v-btn
                    v-if="!_slide.button"
                    key="add"
                    class="z2"
                    color="success"
                    icon
                    variant="flat"
                    @click.stop="
                      _slide.button = getInstance(types.Button);
                      $forceUpdate();
                    "
                  >
                    <v-icon>add</v-icon>
                  </v-btn>
                  <v-btn
                    v-else
                    key="del"
                    class="z2"
                    color="red"
                    icon
                    variant="flat"
                    @click.stop="
                      _slide.button = null;
                      $forceUpdate();
                    "
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-slide-x-reverse-transition>
                <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ End Column Action Button ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
              </div>
            </v-row>
          </v-container>
        </div>
      </swiper-slide>
    </swiper>

    <!-- ████████████████████████ Thumbnail ████████████████████████ -->
    <swiper
      v-if="SLIDE_DATA.thumbnail?.enable"
      :allow-touch-move="allow_touch_move"
      :centered-slides="true"
      :loop="SLIDE_DATA.loop"
      :slide-to-clicked-slide="true"
      :slides-per-view="thumbnail_slides_per_view"
      :space-between="10"
      @swiper="onThumbnailSwiperInitialized"
    >
      <swiper-slide
        v-for="(slide, index) in $sectionData.slide.items"
        :key="index"
        :class="{ pp: swiperOptionThumbs.allowTouchMove }"
        :style="{ height: SLIDE_DATA.heightThumbs }"
      >
        <div
          :class="[
            $sectionData.slide.thumbnail.type,
            {
              'thumb-round': $sectionData.slide.thumbnail.rounded,
              'thumb-margin': true,
              'thumb-hover': true,
            },
            realIndex === index ? $sectionData.slide.thumbnail.active : null,
          ]"
        >
          <x-text
            v-model:object="slide.thumb_title"
            :augment="augment"
            initial-type="h3"
          ></x-text>

          <x-text
            v-model:object="slide.thumb_subtitle"
            :augment="augment"
            initial-type="p"
          ></x-text>
        </div>
      </swiper-slide>
    </swiper>
  </x-section>
</template>

<script>
import * as types from "../../../src/types/types";
import XButton from "../../../components/x/button/XButton.vue";
import XVideoBackground from "../../../components/x/video-background/XVideoBackground.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import StylerDirective from "../../../styler/StylerDirective";
import LMixinSection from "../../../mixins/section/LMixinSection";
import {
  Autoplay,
  Controller,
  EffectCards,
  EffectCoverflow,
  EffectCreative,
  EffectCube,
  EffectFade,
  EffectFlip,
  FreeMode,
  Grid,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Parallax,
  Scrollbar,
  Thumbs,
  Virtual,
  Zoom,
} from "swiper/modules";
import EffectMaterial from "@selldone/components-vue/ui/swiper/effects/material/effect-material.esm.js";

import XUploader from "../../../components/x/uploader/XUploader.vue";
import XText from "@selldone/page-builder/components/x/text/XText.vue";
import XSection from "@selldone/page-builder/components/x/section/XSection.vue";
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";

export default {
  name: "LSectionGallerySwiper",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],

  components: {
    XComponent,
    XSection,
    XText,
    XUploader,
    XVideoBackground,
    XButton,
    Swiper,
    SwiperSlide,
  },
  cover: require("../../../assets/images/covers/slideshow.svg"),

  group: "Gallery",
  label: "Slide show",

  help: {
    title:
      "This section allows for the creation of a fully customizable slideshow.",
  },

  $schema: {
    classes: types.ClassList,
    row: types.Row,

    background: types.Background,
    style: types.Style,

    slide: {
      effect: "slide",
      autoplay: true,

      items: [types.Slide],
      height: "640px",
      heightThumbs: "180px",
      loop: false,
      navigation: true,
      pagination: "bullets",
      vertical: false,
      slidesPerView: 1,
      spaceBetween: 0,
      active: null, // Center slide custom class

      thumbnail: {
        enable: false,
      },
    },
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    augment: {
      // Extra information to show to dynamic show in page content
    },
  },

  data: () => ({
    modules: [
      // Effect modules
      EffectFade, // Fade Effect module
      EffectCube, // Cube Effect module
      EffectFlip, // Flip Effect module
      EffectCoverflow, // Coverflow Effect module
      EffectCards, // Cards Effect module
      EffectCreative, // Creative Effect module

      EffectMaterial, // Material Effect module

      // Navigation modules
      Navigation, // Navigation module
      Pagination, // Pagination module
      Scrollbar, // Scrollbar module
      Thumbs, // Thumbs module

      // Control modules
      Keyboard, // Keyboard Control module
      Mousewheel, // Mousewheel Control module
      Controller, // Controller module

      // Advanced functionality modules
      Virtual, // Virtual Slides module
      Parallax, // Parallax module
      FreeMode, // Free Mode module
      Grid, // Grid module
      //  Manipulation, // Slides manipulation module (only for Core version)
      Zoom, // Zoom module

      // Accessibility & Usability modules
      //   A11y, // Accessibility module
      //   History, // History Navigation module
      //    HashNavigation, // Hash Navigation module
      Autoplay, // Autoplay module
    ],

    realIndex: 0,

    dialog: false,

    swiperOptionThumbs: {},

    thumbsSwiper: null,
    mainSwiper: null,

    key: 0,

    show: true,
  }),

  computed: {
    thumbnail_slides_per_view() {
      return this.$vuetify.display.xlAndUp
        ? 5
        : this.$vuetify.display.lg
          ? 4
          : this.$vuetify.display.md
            ? 3
            : this.$vuetify.display.sm
              ? 2
              : 1;
    },

    allow_touch_move() {
      return !this.$builder.isEditing || !this.$section.lock;
    },

    SLIDE_DATA() {
      return this.$sectionData.slide;
    },

    navigation() {
      return this.SLIDE_DATA.navigation?.enable
        ? {
            enabled: true,
          }
        : false;
    },

    pagination() {
      return this.SLIDE_DATA.pagination?.enable
        ? {
            enabled: this.SLIDE_DATA.pagination.enable,
            type: this.SLIDE_DATA.pagination.type,
            hideOnClick: this.SLIDE_DATA.pagination.hideOnClick,
            dynamicBullets: this.SLIDE_DATA.pagination.dynamicBullets,
            dynamicMainBullets: this.SLIDE_DATA.pagination.dynamicMainBullets,
          }
        : undefined;
    },

    autoplay() {
      return !this.$builder.isEditing && this.SLIDE_DATA.autoplay?.enable
        ? {
            enabled: true,
            delay: this.SLIDE_DATA.autoplay.delay,
            disableOnInteraction:
              !!this.SLIDE_DATA.autoplay.disableOnInteraction,
            pauseOnMouseEnter: !!this.SLIDE_DATA.autoplay.pauseOnMouseEnter,
            reverseDirection: !!this.SLIDE_DATA.autoplay.reverseDirection,
            stopOnLastSlide: !!this.SLIDE_DATA.autoplay.stopOnLastSlide,
          }
        : undefined;
    },

    keyboard() {
      return this.SLIDE_DATA.keyboard?.enable
        ? {
            enabled: true,
            onlyInViewport: this.SLIDE_DATA.keyboard.onlyInViewport,
            pageUpDown: this.SLIDE_DATA.keyboard.pageUpDown,
          }
        : undefined;
    },

    is_material_effect() {
      return this.SLIDE_DATA.effect === "material";
    },
    is_overflow_visible() {
      return this.SLIDE_DATA.effect === "cards";
    },
  },

  watch: {
    SLIDE_DATA: {
      deep: true,
      handler() {
        this.refresh();
      },
    },
    allow_touch_move() {
      this.refresh();
    },
  },

  created() {
    // this.$section.__refreshCallback = this.refresh; // initial temporary elements in section to be accessible on GlobalSlideShowEditorDialog
    this.$section.lock = true; // initial temporary elements in section to be accessible on GlobalSlideShowEditorDialog

    this.$section.__goToSlide = (index) => {
      this.mainSwiper.slideTo(index);
    };

    // Migrate old version:
   // this.SLIDE_DATA.direction = this.SLIDE_DATA.vertical ? "vertical" : "horizontal";

    // this.init();
  },

  mounted() {
    // this.refresh();
  },

  methods: {
    onMainSwiperInitialized(swiper) {
      this.mainSwiper = swiper;
    },

    onThumbnailSwiperInitialized(swiper) {
      this.thumbsSwiper = swiper;
    },

    // Computed values not call!
    init() {},

    /**
     * Calculate slides per view based on the screen size
     * @return {number|*}
     */
    calcSlidesPerView() {
      if (this.$vuetify.display.lgAndUp && this.SLIDE_DATA.slidesPerViewLg)
        return this.SLIDE_DATA.slidesPerViewLg;
      else if (this.$vuetify.display.mdAndUp && this.SLIDE_DATA.slidesPerViewMd)
        return this.SLIDE_DATA.slidesPerViewMd;
      else if (this.$vuetify.display.smAndUp && this.SLIDE_DATA.slidesPerViewSm)
        return this.SLIDE_DATA.slidesPerViewSm;
      // Default:
      else if (this.SLIDE_DATA.slidesPerView >= 1)
        return this.SLIDE_DATA.slidesPerView;

      return 1;
    },

    refresh() {
      if (!this.mainSwiper) return;

      console.log("REQUEST REFRESH!!!!");
      this.mainSwiper.allowTouchMove = this.allow_touch_move; // Edit mode!

      // Update grabCursor:
      if (this.SLIDE_DATA.grabCursor) {
        this.mainSwiper.setGrabCursor();
      } else {
        this.mainSwiper.unsetGrabCursor();
      }

      // Update direction:
      this.mainSwiper.changeDirection(this.SLIDE_DATA.direction, true);

      this.mainSwiper.update();
    },
  },
};
</script>

<style lang="scss" scoped>
.abs-container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 0;
  // width: 100%;
  //height: 100%;
  z-index: 100;
  display: flex;
  margin: auto;
  pointer-events: none;

  h1,
  h2,
  p,
  a,
  button {
    pointer-events: auto;
  }
}

.thumb-margin {
  margin: 24px 8px;
  transition: all 0.3s;
  padding: 8px;
}

.thumb-hover {
  transition: all 0.45s !important;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 10px 50px 0px rgba(0, 0, 0, 0.2);
    transition: all 0.35s !important;
    z-index: 3;
    transform: translateY(-2px);
  }
}

.thumb-round {
  border-radius: 2rem;
}

.thumb-outline {
  border: solid thin #aaa;
}

.thumb-morph {
  background-color: rgb(255, 255, 255);
  border-color: rgb(255, 255, 255);
  color: #222;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}

.thumb-paper {
  border: solid thin #bbb;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.thumb-shadow-lg {
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
}

.thumb-shadow-sm {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
