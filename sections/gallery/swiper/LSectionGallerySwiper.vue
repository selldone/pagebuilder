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
    :object="$sectionData"
    path="$sectionData"
    class="pa-0"
    v-styler:swiper="{ target: $sectionData, keySlide: 'slide' }"
    has-thumbnail="true"
  >
    <!-- ████████████████████████ Main ████████████████████████ -->
    <swiper
      @swiper="onMainSwiperInitialized"
      :modules="modules"
      :thumbs="{ swiper: thumbsSwiper }"
      :allow-touch-move="allow_touch_move"
      auto-height
      :direction="SLIDE_DATA.direction?SLIDE_DATA.direction:'horizontal' "
      :loop="SLIDE_DATA.loop"
      :centered-slides="true"
      :keyboard="{ enabled: true }"
      :slides-per-view="calcSlidesPerView()"
      :space-between="SLIDE_DATA.spaceBetween ? SLIDE_DATA.spaceBetween : 0"
      :effect="SLIDE_DATA.effect"
      :pagination="pagination"
      :navigation="navigation"
      :autoplay="autoplay"
      :grab-cursor="SLIDE_DATA.grabCursor"
      :cubeEffect="{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }"
    >
      <swiper-slide
        v-for="(_slide, index) in SLIDE_DATA.items"
        :key="index"
        class="overflow-hidden"
        :style="{ height: SLIDE_DATA.height }"
      >
        <!-- 📹 Background video -->
        <video-background
          v-if="_slide.container?.background?.bg_video"
          :video="getVideoUrl(_slide.container?.background?.bg_video)"
        >
        </video-background>

        <div
          class="position-relative h-100"
          :index="index"
          :style="[backgroundStyle(_slide.background)]"
          :class="[realIndex === index ? SLIDE_DATA.active : null]"
        >
          <!-- ----------------- Image Layer ----------------- -->

          <x-uploader
            :path="`$sectionData.slide.items[${index}].image`"
            :class="{ pen: !$section.lock }"
            style="min-height: 100%; min-width: 100%; max-height: 100%"
            :augment="augment"
          />

          <!-- ----------------- Text Layer ----------------- -->
          <div
            class="abs-container container"
            style="z-index: 100"
            :index="index"
            :container-styler="true"
            :class="[
              _slide.container.classes,
              {
                'container--fluid': _slide.container
                  ? _slide.container.fluid
                  : false,
              },
            ]"
            :style="[_slide.container.style]"
            v-styler:container="{
              target: $sectionData.slide.items[index].container,
              hasFluid: true,
            }"
            clonable="true"
            @click="
              $builder.onClickClone($event, _slide.container, [
                'classes',
                'style',
              ]);
              $forceUpdate();
            "
          >
            <v-row
              no-gutters
              :index="index"
              :align="_slide.row ? _slide.row.align : 'center'"
              :justify="_slide.row ? _slide.row.justify : 'start'"
              v-styler:row="{
                target: $sectionData.slide.items[index],
                hasArrangement: true,
                hasFluid: true,
              }"
            >
              <div>
                <h2
                  v-styler:text="{
                    target: $sectionData.slide.items[index],
                    keyText: 'title',
                  }"
                  v-html="
                    _slide.title?.applyAugment(augment, $builder.isEditing)
                  "
                  :index="index"
                />
                <p
                  v-styler:text="{
                    target: $sectionData.slide.items[index],
                    keyText: 'subtitle',
                  }"
                  v-html="
                    _slide.subtitle?.applyAugment(augment, $builder.isEditing)
                  "
                  :index="index"
                ></p>

                <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Start Column Action Button ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->

                <x-button
                  v-if="_slide.button"
                  v-styler:button="{
                    target: $sectionData.slide.items[index].button,
                  }"
                  :index="index"
                  :btn-data="_slide.button"
                  class="m-2 z2"
                  :editing="$builder.isEditing"
                  :augment="augment"
                >
                </x-button>
                <v-slide-x-reverse-transition
                  v-if="$builder.isEditing"
                  hide-on-leave
                >
                  <v-btn
                    key="add"
                    v-if="!_slide.button"
                    variant="flat"
                    color="success"
                    @click.stop="
                      _slide.button = getInstance(types.Button);
                      $forceUpdate();
                    "
                    class="z2"
                    icon
                  >
                    <v-icon>add</v-icon>
                  </v-btn>
                  <v-btn
                    key="del"
                    v-else
                    variant="flat"
                    color="red"
                    class="z2"
                    @click.stop="
                      _slide.button = null;
                      $forceUpdate();
                    "
                    icon
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-slide-x-reverse-transition>
                <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ End Column Action Button ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
              </div>
            </v-row>
          </div>
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

    <!-- ████████████████████████ Thumbnail ████████████████████████ -->
    <swiper
      @swiper="onThumbnailSwiperInitialized"
      v-if=" SLIDE_DATA.thumbs"
      :allow-touch-move="allow_touch_move"
      :slide-to-clicked-slide="true"
      :slides-per-view="thumbnail_slides_per_view"
      :space-between="10"
      :centered-slides="true"
      :loop="SLIDE_DATA.loop"
    >
      <swiper-slide
        v-for="(slide, index) in SLIDE_DATA.items"
        :key="index"
        :style="{ height: SLIDE_DATA.heightThumbs }"
        :class="{ pp: swiperOptionThumbs.allowTouchMove }"
      >
        <div
          :class="[
            $sectionData.slide.thumbs_type,
            {
              'thumb-round': $sectionData.slide.thumbs_round,
              'thumb-margin': true,
              'thumb-hover': true,
            },
            realIndex === index ? $sectionData.slide.thumbs_active : null,
          ]"
        >
          <h3
            v-styler:text="{
              target: $sectionData.slide.items[index],
              keyText: 'thumb_title',
            }"
            v-html="
              $sectionData.slide.items[index].thumb_title?.applyAugment(
                augment,
                $builder.isEditing,
              )
            "
            :index="index"
          />
          <p
            v-styler:text="{
              target: $sectionData.slide.items[index],
              keyText: 'thumb_subtitle',
            }"
            v-html="
              $sectionData.slide.items[index].thumb_subtitle?.applyAugment(
                augment,
                $builder.isEditing,
              )
            "
            :index="index"
          ></p>
        </div>
      </swiper-slide>
    </swiper>
  </x-section>
</template>

<script>
import * as types from "../../../src/types";
import XButton from "@app-page-builder/sections/components/XButton.vue";
import VideoBackground from "@app-page-builder/sections/components/VideoBackground.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import StylerDirective from "@app-page-builder/styler/StylerDirective";
import SectionMixin from "@app-page-builder/mixins/SectionMixin";
import {
  A11y,
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
  HashNavigation,
  History,
  Keyboard,
  Manipulation,
  Mousewheel,
  Navigation,
  Pagination,
  Parallax,
  Scrollbar,
  Thumbs,
  Virtual,
  Zoom,
} from "swiper/modules";
import { LandingSettingStructure } from "@app-page-builder/sections/LandingSettingStructure";
import {SlideStructure} from "@app-page-builder/styler/swiper/SwiperOptions";

export default {
  name: "LSectionGallerySwiper",
  directives: { styler: StylerDirective },
  mixins: [SectionMixin],

  components: {
    VideoBackground,
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

      thumbs: false,
      thumbs_type: "thumb-outline",
      thumbs_round: true,
      thumbs_active: null, // Center slide custom class
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
      Manipulation, // Slides manipulation module (only for Core version)
      Zoom, // Zoom module

      // Accessibility & Usability modules
      A11y, // Accessibility module
      History, // History Navigation module
      HashNavigation, // Hash Navigation module
      Autoplay, // Autoplay module
    ],

    realIndex: 0,

    dialog: false,


    swiperOptionThumbs: {},

    thumbsSwiper: null,
    mainSwiper: null,

    key:0,
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

    pagination() {
      return {
        el: ".swiper-pagination",
        type: this.SLIDE_DATA.pagination, // 'bullets' | 'fraction' | 'progressbar' | 'custom'
        dynamicBullets: true,
        clickable: true,
      };
    },

    navigation() {
      return this.$sectionData.slide.navigation
        ? {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }
        : false;
    },

    autoplay() {
      return !this.$builder.isEditing && this.$sectionData.slide.autoplay
        ? {
            delay: 7000,
          }
        : false;
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
    this.SLIDE_DATA.direction=this.SLIDE_DATA.vertical?'vertical':'horizontal';


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

    refresh() {
      if (!this.mainSwiper) return;

      console.log("REQUEST REFRESH!!!!");
      this.mainSwiper.allowTouchMove = this.allow_touch_move; // Edit mode!

      if(this.SLIDE_DATA.grabCursor){
        this.mainSwiper.setGrabCursor();
      }else{
        this.mainSwiper.unsetGrabCursor()
      }





      this.mainSwiper.update();

      this.$forceUpdate();

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
