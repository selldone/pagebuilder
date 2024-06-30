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
  <x-section
    v-styler:swiper="{ target: $sectionData, keySlide: 'slide' }"
    :object="$sectionData"
    class="p-0"
  >
    <!-- --------------------------------------------------------------------------------------------------------- -->

    <swiper
      v-if="showSlider"
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
      :slide-to-clicked-slide="!$section.lock"
      @realIndexChange="(s) => (realIndex = s.realIndex)"
      @swiper="
        (swiper) => {
          mainSwiper = swiper;
        }
      "
    >
      <swiper-slide
        v-for="(slide, index) in $sectionData.slide.items"
        :key="index"
        :style="{ height: $sectionData.slide.height }"
        class="d-flex justify-center"
      >
        <div
          v-styler:container="{ target: slide }"
          :class="[
            slide.classes,
            realIndex === index ? $sectionData.slide.active : null,
            {
              'w-100': slide.fluid,
            },
          ]"
          :style="[
            backgroundStyle(slide.background),
            slide.style,
          ]"
          cloneable="true"
          @click="
            $builder.onClickClone($event, slide, [
              'classes',
              'style',
            ]);
            $forceUpdate();
          "
        >
          <!-- 📹 Background video -->
          <x-video-background
            v-if="slide?.background?.bg_video"
            :video="
              getVideoUrl(slide?.background?.bg_video)
            "
          >
          </x-video-background>

          <!-- ----------------- Image Layer ----------------- -->

          <x-uploader
            v-model:object="slide.image"
            :augment="augment"
            :class="{ pen: !$section.lock }"
            :initialSize="{
              w: '100px',
              h: '100px',
              min_h: '20px',
              min_w: '20px',
            }"
            contain
          />

          <x-text
            v-model:object="slide.title"
            :augment="augment"
            initial-type="h2"
          ></x-text>

          <x-text
            v-model:object="slide.subtitle"
            :augment="augment"
            initial-type="p"
          ></x-text>

          <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Start Column Action Button ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->

          <x-button
            v-if="slide.button"
            v-styler:button="{ target: slide.button }"
            :augment="augment"
            :object="slide.button"
            :editing="$builder.isEditing"
            :index="index"
            class="m-2"
          >
          </x-button>

          <v-sheet
            v-if="$builder.isEditing && !$builder.isHideExtra"
            class="inline-editor-sheet"
            dark
          >
            <v-slide-x-reverse-transition hide-on-leave>
              <v-btn
                v-if="!slide.button"
                key="add"
                class="ma-1"
                title="Add action button."
                variant="outlined"
                @click.stop="
                  slide.button = getInstance(
                    types.Button,
                  );
                  $forceUpdate();
                "
                color="#fff"
              >
                <v-icon color="success" start>add</v-icon>
                Add Action
              </v-btn>
              <v-btn
                v-else
                key="del"
                class="ma-1"
                title="Delete button."
                variant="outlined"
                @click.stop="
                  slide.button = null;
                  $forceUpdate();
                "
                color="#fff"
              >
                <v-icon color="red" start>close</v-icon>
                Remove Action
              </v-btn>
            </v-slide-x-reverse-transition>
          </v-sheet>
        </div>
      </swiper-slide>

      <template v-slot:pagination>
        <div class="swiper-pagination"></div>
      </template>

      <template v-if="$sectionData.slide.navigation" v-slot:button-prev>
        <div class="swiper-button-prev"></div>
      </template>
      <template v-if="$sectionData.slide.navigation" v-slot:button-next>
        <div class="swiper-button-next"></div>
      </template>
    </swiper>
  </x-section>
</template>

<script>
import * as types from "../../../src/types/types";
import XButton from "../../../components/x/button/XButton.vue";
import XVideoBackground from "../../../components/x/video-background/XVideoBackground.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import StylerDirective from "../../../styler/StylerDirective";
import LMixinSection from "../../../mixins/section/LMixinSection";
import XUploader from "../../../components/x/uploader/XUploader.vue";
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
import XText from "@selldone/page-builder/components/x/text/XText.vue";
import XSection from "@selldone/page-builder/components/x/section/XSection.vue";

export default {
  name: "LSectionGalleryScroll",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],

  components: {
    XSection,
    XText,
    XUploader,
    XVideoBackground,
    XButton,

    Swiper,
    SwiperSlide,
  },
  cover: require("../../../assets/images/covers/scroll-view.svg"),

  group: "Gallery",
  label: "Scroll View",

  help: {
    title: "This section showcases a combination of images and text.",
  },

  $schema: {
    classes: types.ClassList,

    background: types.Background,
    style: types.Style,

    slide: {
      effect: "slide",
      autoplay: true,

      items: [types.Slide],
      height: "auto",
      loop: false,
      navigation: true,
      pagination: "bullets",
      vertical: false,
      slidesPerView: 4,
      spaceBetween: 30,

      active: null,
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
    types: types,

    modules: [
      // Effect modules
      EffectFade, // Fade Effect module
      EffectCube, // Cube Effect module
      EffectFlip, // Flip Effect module
      EffectCoverflow, // Coverflow Effect module
      EffectCards, // Cards Effect module
      EffectCreative, // Creative Effect module

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

    showSlider: true,

    realIndex: 0,

    mainSwiper: null,
  }),

  computed: {
    allow_touch_move() {
      return !this.$builder.isEditing || !this.$section.lock;
    },
    SLIDE_DATA() {
      return this.$sectionData.slide;
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

    keyboard() {
      return this.SLIDE_DATA.keyboard?.enable
        ? {
            enabled: true,
            onlyInViewport: this.SLIDE_DATA.keyboard.onlyInViewport,
            pageUpDown: this.SLIDE_DATA.keyboard.pageUpDown,
          }
        : undefined;
    },
  },

  watch: {},

  created() {
    //this.$section.lock = true; // initial temporary elements in section to be accessible on GlobalSlideShowEditorDialog

    this.$section.__goToSlide = (index) => {
      this.mainSwiper.slideTo(index);
    };
  },

  mounted() {},

  methods: {
    calcSlidesPerView() {
      if (
        !this.$sectionData.slide.slidesPerView ||
        this.$sectionData.slide.slidesPerView <= 1
      )
        return 1;
      else if (this.$vuetify.display.lgAndUp)
        return this.$sectionData.slide.slidesPerView;
      else if (this.$vuetify.display.md)
        return Math.min(this.$sectionData.slide.slidesPerView, 3);
      else if (this.$vuetify.display.sm)
        return Math.min(this.$sectionData.slide.slidesPerView, 2);
      return 1;
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
  button {
    pointer-events: auto;
  }
}
</style>
