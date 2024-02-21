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
    class="p-0"
    v-styler:slide="$sectionData.slide"
    has-thumbnail="true"
  >
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
        class="overflow-hidden"
      >
        <!-- 📹 Background video -->
        <video-background
          v-if="$sectionData.slide.items[index].container?.background?.bg_video"
          :video="
            getVideoUrl(
              $sectionData.slide.items[index].container?.background?.bg_video,
            )
          "
        >
        </video-background>

        <div
          class="position-relative h-100"
          :index="index"
          :style="[backgroundStyle($sectionData.slide.items[index].background)]"
          :class="[realIndex === index ? $sectionData.slide.active : null]"
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
              $sectionData.slide.items[index].container.classes,
              {
                'container--fluid': $sectionData.slide.items[index].container
                  ? $sectionData.slide.items[index].container.fluid
                  : false,
              },
            ]"
            :style="[$sectionData.slide.items[index].container.style]"
            v-styler:container="{
              target: $sectionData.slide.items[index].container,
              hasFluid: true,
            }"
            clonable="true"
            @click="
              $builder.onClickClone(
                $event,
                $sectionData.slide.items[index].container,
                ['classes', 'style'],
              );
              $forceUpdate();
            "
          >
            <v-row
              no-gutters
              :index="index"
              :align="
                $sectionData.slide.items[index].row
                  ? $sectionData.slide.items[index].row.align
                  : 'center'
              "
              :justify="
                $sectionData.slide.items[index].row
                  ? $sectionData.slide.items[index].row.justify
                  : 'start'
              "
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
                    $sectionData.slide.items[index].title?.applyAugment(
                      augment,
                      $builder.isEditing,
                    )
                  "
                  :index="index"
                />
                <p
                  v-styler:text="{
                    target: $sectionData.slide.items[index],
                    keyText: 'subtitle',
                  }"
                  v-html="
                    $sectionData.slide.items[index].subtitle?.applyAugment(
                      augment,
                      $builder.isEditing,
                    )
                  "
                  :index="index"
                ></p>

                <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Start Column Action Button ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->

                <x-button
                  v-if="$sectionData.slide.items[index].button"
                  v-styler:button="{
                    target: $sectionData.slide.items[index].button,
                  }"
                  :index="index"
                  :btn-data="$sectionData.slide.items[index].button"
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
                    v-if="!$sectionData.slide.items[index].button"
                    variant="flat"
                    color="success"
                    @click.stop="
                      $sectionData.slide.items[index].button = getInstance(
                        types.Button,
                      );
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
                    dark
                    class="z2"
                    @click.stop="
                      $sectionData.slide.items[index].button = null;
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

    <!-- swiper2 Thumbs -->
    <swiper
      v-if="showSlider && $sectionData.slide.thumbs"
      class="overflow-visible"
      :options="swiperOptionThumbs"
      ref="swiperThumbs"
    >
      <swiper-slide
        v-for="(slide, index) in $sectionData.slide.items"
        :key="index"
        :style="{ height: $sectionData.slide.heightThumbs }"
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
    realIndex: 0,

    dialog: false,
    showSlider: true,

    swiperTop: {},

    swiperOptionThumbs: {},
  }),

  watch: {},

  created() {
    this.$section.__refreshCallback = this.refresh; // initial temporary elements in section to be accessible on GlobalSlideShowEditorDialog
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
      this.swiperOptionThumbs = {
        allowTouchMove: !this.$builder.isEditing || !this.$section.lock,
        loop: this.$sectionData.slide.loop,
        loopedSlides: this.$sectionData.slide.items.length, // looped slides should be the same
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: this.$vuetify.display.xlAndUp
          ? 5
          : this.$vuetify.display.lg
            ? 4
            : this.$vuetify.display.md
              ? 3
              : this.$vuetify.display.sm
                ? 2
                : 1,
        touchRatio: 0.2,
        slideToClickedSlide: true,
      };

      this.swiperTop = {
        allowTouchMove: !this.$builder.isEditing || !this.$section.lock,
        //  allowSlideNext: true,
        //   allowSlidePrev: true,
        autoHeight: true,
        direction: this.$sectionData.slide.vertical ? "vertical" : "horizontal",

        loop: this.$sectionData.slide.loop,
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
      // Reset controllers:
      const swiperTop = this.$refs.swiperTop?.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs?.$swiper;
      if (swiperTop?.controller?.control) swiperTop.controller.control = null;
      if (swiperThumbs?.controller?.control)
        swiperThumbs.controller.control = null;

      this.$forceUpdate();
      this.$nextTick(() => {
        this.init();
        const current_slide = this.$refs.swiperTop.$swiper.realIndex;

        this.$nextTick(() => {
          // Force apply change to computed options.
          this.showSlider = false;
          this.$nextTick(() => {
            this.showSlider = true;

            if (this.$sectionData.slide.thumbs) {
              this.$nextTick(() => {
                const swiperTop = this.$refs.swiperTop.$swiper;
                const swiperThumbs = this.$refs.swiperThumbs.$swiper;
                swiperTop.controller.control = swiperThumbs;
                swiperThumbs.controller.control = swiperTop;

                // Go current index:
                this.$nextTick(() => {
                  this.$refs.swiperTop.$swiper.slideToLoop(current_slide, 0);
                });
              });
            } else {
              this.$nextTick(() => {
                // Go current index:
                this.$nextTick(() => {
                  this.$refs.swiperTop.$swiper.slideToLoop(current_slide, 0);

                  this.$forceUpdate();
                });
              });
            }
          });
        });
      });
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