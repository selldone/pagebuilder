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
<!-- IMPORTANT: Element must have -trackable class! -->

<template>
  <swiper
    v-styler:swiper="{
      target: object,
    }"
    :allow-touch-move="allow_touch_move"
    :auto-height="
      SLIDE_DATA.autoHeight
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
      SLIDE_DATA.slidesPerGroup ? SLIDE_DATA.slidesPerGroup : undefined
    "
    :slides-per-group-auto="SLIDE_DATA.slidesPerGroup === 'auto' /*boolean*/"
    :slides-per-view="calcSlidesPerView()"
    :space-between="SLIDE_DATA.spaceBetween ? SLIDE_DATA.spaceBetween : 0"
    :thumbs="{ swiper: thumbsSwiper }"
    slide-to-clicked-slide
    @realIndexChange="(s) => (realIndex = s.realIndex)"
    @swiper="onMainSwiperInitialized"
    :class="[
      object.classes,
      {
        'is-editable': $builder.isEditing,
        'overflow-visible': is_overflow_visible,
      },
    ]"
    :style="[object.style, background_style, { height: SLIDE_DATA.height }]"
  >
    <swiper-slide
      v-for="(_slide, index) in object.children"
      :key="index"
      :class="[
        realIndex === index ? SLIDE_DATA.active : null,
        {
          'swiper-material-wrapper': is_material_effect,
        },
      ]"
    >
      <!-- ━━━━━━━━━━━━ Children ━━━━━━━━━━━━ -->
      <x-component
        :object="_slide"
        :augment="augment"
        :remove-child="() => object.children.splice(index, 1)"
        :class="[
          {
            'swiper-material-content': is_material_effect,
          },
        ]"
      >
      </x-component>
    </swiper-slide>
  </swiper>
</template>

<script>
import LMixinXComponent from "@selldone/page-builder/mixins/x-component/LMixinXComponent";
import { XSwiperObject } from "@selldone/page-builder/components/x/swiper/XSwiperObject.ts";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";

import { Swiper, SwiperSlide } from "swiper/vue";
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
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";
import StylerDirective from "@selldone/page-builder/styler/StylerDirective.ts";

export default {
  name: "XSwiper",
  directives: { styler: StylerDirective },
  components: {
    XComponent,

    SwiperSlide,
    Swiper,
  },
  mixins: [LMixinXComponent],
  props: {
    object: {
      type: XSwiperObject,
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
    is_editing() {
      return this.$builder.isEditing;
    },
    allow_touch_move() {
      return !this.is_editing || !this.$section.__lock;
    },

    SLIDE_DATA() {
      return this.object.data;
    },

    autoplay() {
      return !this.is_editing && this.SLIDE_DATA.autoplay?.enabled
        ? this.SLIDE_DATA.autoplay
        : undefined;
    },

    keyboard() {
      return this.SLIDE_DATA.keyboard?.enabled
        ? this.SLIDE_DATA.keyboard
        : undefined;
    },
    navigation() {
      return this.SLIDE_DATA.navigation?.enabled
        ? this.SLIDE_DATA.navigation
        : undefined;
    },
    pagination() {
      return this.SLIDE_DATA.pagination?.enabled
        ? this.SLIDE_DATA.pagination
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

    realIndex() {
      this.$section.__currentSlide = this.realIndex;
    },
  },
  created() {
    this.$section.__lock = true; // initial temporary elements in section to be accessible on GlobalSlideShowEditorDialog

    this.$section.__goToSlide = (index) => {
      this.mainSwiper.slideTo(index);
    };

    this.$section.__currentSlide = this.realIndex;
  },

  methods: {
    onMainSwiperInitialized(swiper) {
      this.mainSwiper = swiper;
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

      this.mainSwiper.init();

      this.$forceUpdate(); // Update vue component!
    },

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
  },
};
</script>

<style lang="scss">
.x--swiper {
}
</style>
