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
    path="$sectionData"
  >
    <!-- --------------------------------------------------------------------------------------------------------- -->

    <swiper
      v-if="showSlider"
      ref="swiperTop"
      :options="swiperTop"
      @slideChange="realIndex = $refs.swiperTop.$swiper.realIndex"
    >
      <swiper-slide
        v-for="(slide, index) in $sectionData.slide.items"
        :key="index"
        :style="{ height: $sectionData.slide.height }"
        class="d-flex justify-center"
      >
        <div
          v-styler:container="{ target: $sectionData.slide.items[index] }"
          :class="[
            $sectionData.slide.items[index].classes,
            realIndex === index ? $sectionData.slide.active : null,
          ]"
          :index="index"
          :style="[
            backgroundStyle($sectionData.slide.items[index].background),
            $sectionData.slide.items[index].style,
          ]"
          class="container position-relative h-100"
          clonable="true"
          @click="
            $builder.onClickClone($event, $sectionData.slide.items[index], [
              'classes',
              'style',
            ]);
            $forceUpdate();
          "
        >
          <!-- 📹 Background video -->
          <video-background
            v-if="$sectionData.slide.items[index]?.background?.bg_video"
            :video="
              getVideoUrl($sectionData.slide.items[index]?.background?.bg_video)
            "
          >
          </video-background>

          <!-- ----------------- Image Layer ----------------- -->

          <x-uploader
            v-model="slide.image"
            :augment="augment"
            :class="{ pen: !$section.lock }"
            :initialSize="{
              w: '100px',
              h: '100px',
              min_h: '20px',
              min_w: '20px',
            }"
            :path="`$sectionData.slide.items[${index}].image`"
            contain
          />

          <h2
            v-styler:text="{
              target: $sectionData.slide.items[index],
              keyText: 'title',
            }"
            :index="index"
            v-html="
              $sectionData.slide.items[index].title?.applyAugment(
                augment,
                $builder.isEditing,
              )
            "
          />
          <p
            v-styler:text="{
              target: $sectionData.slide.items[index],
              keyText: 'subtitle',
            }"
            :index="index"
            v-html="
              $sectionData.slide.items[index].subtitle?.applyAugment(
                augment,
                $builder.isEditing,
              )
            "
          ></p>

          <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Start Column Action Button ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->

          <x-button
            v-if="$sectionData.slide.items[index].button"
            v-styler:button="{ target: $sectionData.slide.items[index].button }"
            :augment="augment"
            :btn-data="$sectionData.slide.items[index].button"
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
                v-if="!$sectionData.slide.items[index].button"
                key="add"
                class="ma-1"
                title="Add action button."
                variant="outlined"
                @click.stop="
                  $sectionData.slide.items[index].button = getInstance(
                    types.Button,
                  );
                  $forceUpdate();
                "
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
                  $sectionData.slide.items[index].button = null;
                  $forceUpdate();
                "
              >
                <v-icon color="red" start>close</v-icon>
                Remove Action
              </v-btn>
            </v-slide-x-reverse-transition>
            <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ End Column Action Button ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->

            <v-btn
              v-if="$builder.isEditing && !$builder.isHideExtra"
              class="tnt ma-1"
              dark
              style="z-index: 100"
              variant="outlined"
              @click.stop="removeSlide(index)"
            >
              <v-icon color="red" start>close</v-icon>
              Delete Slide
            </v-btn>
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
import * as types from "../../../src/types";
import { Seeder } from "@app-page-builder/src/seeder";
import XButton from "@app-page-builder/sections/components/XButton.vue";
import VideoBackground from "@app-page-builder/sections/components/VideoBackground.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import StylerDirective from "@app-page-builder/styler/StylerDirective";
import SectionMixin from "@app-page-builder/mixins/SectionMixin";

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
  { title: "None", value: null },
  { title: "Elevation", value: "slide-elevation" },
  { title: "Bordered", value: "slide-bordered" },
  { title: "Slide Up", value: "slide-up" },
];

export default {
  name: "LSectionGalleryScroll",
  directives: { styler: StylerDirective },
  mixins: [SectionMixin],

  components: {
    VideoBackground,
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
    EFFECTS: EFFECTS,
    ACTIVE_CENTER: ACTIVE_CENTER,

    showSlider: true,

    swiperTop: {},

    realIndex: 0,
  }),

  computed: {},

  watch: {},

  created() {
    //  this.$section.__refreshCallback = this.refresh; // initial temporary elements in section to be accessible on GlobalSlideShowEditorDialog
    this.$section.lock = true; // initial temporary elements in section to be accessible on GlobalSlideShowEditorDialog
    this.$section.__goToSlide = (index) => {
      this.$refs.swiperTop?.$swiper?.slideTo(index);
    };

    this.init();
  },

  mounted() {
    this.refresh();
  },

  methods: {
    // Computed values not call!
    init() {
      this.swiperTop = {
        allowTouchMove: !this.$builder.isEditing || !this.$section.lock,
        //  allowSlideNext: true,
        //   allowSlidePrev: true,
        autoHeight: true,
        direction: this.$sectionData.slide.vertical ? "vertical" : "horizontal",

        loop: !this.$builder.isEditing && this.$sectionData.slide.loop, // Not loop on edit mode!
        loopedSlides: this.$sectionData.slide.items.length, // looped slides should be the same

        //loopedSlides: "auto", // conflict with loop!
        centeredSlides: true,
        keyboard: {
          enabled: true,
        },

        slidesPerView: this.calcSlidesPerView(),
        spaceBetween: this.$sectionData.slide.spaceBetween
          ? this.$sectionData.slide.spaceBetween
          : 0,

        effect: this.$sectionData.slide.effect,

        pagination: {
          el: ".swiper-pagination",
          type: this.$sectionData.slide.pagination, // 'bullets' | 'fraction' | 'progressbar' | 'custom'
          dynamicBullets: true,
          clickable: true,
        },
        navigation: this.$sectionData.slide.navigation
          ? {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }
          : false,

        autoplay:
          !this.$builder.isEditing && this.$sectionData.slide.autoplay
            ? {
                delay: 7000,
              }
            : false,
      };
    },

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
      this.init();
      const current_slide = this.$refs.swiperTop.$swiper.realIndex;

      this.$nextTick(() => {
        // Force apply change to computed options.
        this.showSlider = false;
        this.$nextTick(() => {
          this.showSlider = true;
          this.$nextTick(() => {
            // Go current index:
            this.$refs.swiperTop.$swiper.slideToLoop(current_slide, 0);
            this.$nextTick(() => {
              this.$forceUpdate();
            });
          });
        });
      });
    },

    addSlide() {
      this.$sectionData.slide.items.add(Seeder.seed(types.Slide));
      this.$refs.swiperTop.$swiper.update();
      this.$nextTick(() => {
        this.$refs.swiperTop.$swiper.slideTo(
          this.$sectionData.slide.items.length - 1,
        );
      });
    },
    removeSlide(index) {
      this.openDeleteAlert(() => {
        this.$sectionData.slide.items.splice(index, 1);
        this.$refs.swiperTop.$swiper.update();
        this.refresh();
      });
    },

    toggleLoop() {
      this.$sectionData.slide.loop = !this.$sectionData.slide.loop;
      this.refresh();
    },

    toggleNavigation() {
      this.$sectionData.slide.navigation = !this.$sectionData.slide.navigation;
      this.refresh();
    },

    togglePagination() {
      this.$sectionData.slide.pagination =
        this.$sectionData.slide.pagination === "bullets"
          ? "fraction"
          : this.$sectionData.slide.pagination === "fraction"
            ? "progressbar"
            : this.$sectionData.slide.pagination === "progressbar"
              ? "custom"
              : "bullets";

      this.refresh();
    },

    toggleDirection() {
      this.$sectionData.slide.vertical = !this.$sectionData.slide.vertical;
      this.refresh();
    },

    toggleAutoplay() {
      this.$sectionData.slide.autoplay = !this.$sectionData.slide.autoplay;
      this.refresh();
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
