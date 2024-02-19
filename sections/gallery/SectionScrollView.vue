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

<template xmlns:v-styler="http://www.w3.org/1999/xhtml">
  <x-section
    :object="$sectionData"
    path="$sectionData"
    class="p-0"
    v-styler:slide="$sectionData.slide"
  >
    <!--
    <v-sheet
      dark
      color="#225082"
      v-if="$builder.isEditing && !$builder.isHideExtra"
      class="inline-editor-sheet"
      @click.stop
    >
      <v-toolbar
        class="overflow-x-auto thin-scroll"
        flat
        height="84"
        color="#225082"
      >
        <v-toolbar-title style="min-width: 120px"> </v-toolbar-title>
        <v-toolbar-items>
          <v-btn
            @click.stop="addSlide"
            depressed
            color="#2196F3"
            class="tnt rounded-lg me-2"
            dark
            ><v-icon left>add</v-icon> Add Slide
          </v-btn>


          <v-tooltip bottom color="#111">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="
                  $section.lock = !$section.lock;
                  refresh();
                "
                v-bind="attrs"
                v-on="on"
                depressed
                color="#225082"
              >
                <v-icon>{{ $section.lock ? "lock" : "swap_horiz" }}</v-icon>
              </v-btn>
            </template>
            <div class="text-start small">
              <div class="my-1">
                <v-icon class="me-1" small>lock</v-icon> <b>Lock: </b> Scroll by
                dragging, touch functionality disabled for seamless editing.
              </div>
              <div class="my-1">
                <v-icon class="me-1" small>visibility</v-icon>
                <b>Unlock: </b> Drag and touch functionality is enabled,
                allowing you to scroll horizontally.
              </div>
            </div>
          </v-tooltip>


          <v-tooltip bottom color="#111">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="toggleLoop()"
                depressed
                v-bind="attrs"
                v-on="on"
                color="#225082"
              >
                <v-icon>{{
                  $sectionData.slide.loop ? "all_inclusive" : "linear_scale"
                }}</v-icon>
              </v-btn>
            </template>
            <div class="text-start small">
              <div class="my-1">
                <v-icon class="me-1" small>linear_scale</v-icon>
                <b>Forward: </b> Without a loop, there is a single sliding
                direction.
              </div>
              <div class="my-1">
                <v-icon class="me-1" small>all_inclusive</v-icon>
                <b>Infinite: </b> Automatically rotate slides. This feature is
                exclusively accessible on the live page.
              </div>
            </div>
          </v-tooltip>


          <v-tooltip bottom color="#111">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="togglePagination()"
                class="tnt"
                depressed
                title="Pagination"
                color="#225082"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{
                  $sectionData.slide.pagination === "bullets"
                    ? "more_horiz"
                    : $sectionData.slide.pagination === "fraction"
                    ? "numbers"
                    : $sectionData.slide.pagination === "progressbar"
                    ? "horizontal_rule"
                    : "check_box_outline_blank"
                }}</v-icon>
              </v-btn>
            </template>
            <div class="text-start small">
              <div class="my-1">
                <v-icon class="me-1" small>more_horiz</v-icon> <b>Bullets</b>
              </div>
              <div class="my-1">
                <v-icon class="me-1" small>numbers</v-icon> <b>Fraction</b>
              </div>
              <div class="my-1">
                <v-icon class="me-1" small>horizontal_rule</v-icon>
                <b>Progress Bar </b>
              </div>
              <div class="my-1">
                <v-icon class="me-1" small>check_box_outline_blank</v-icon>
                <b>None </b>
              </div>
            </div>
          </v-tooltip>


          <v-tooltip bottom color="#111">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="toggleNavigation()"
                depressed
                color="#225082"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon :class="{ 'op-0-3': !$sectionData.slide.navigation }"
                  >settings_ethernet</v-icon
                >
              </v-btn>
            </template>
            <div class="text-start small">
              <div class="my-1">
                <v-icon class="me-1" small>settings_ethernet</v-icon>
                <b>Enable: </b> Display of navigation arrows will occur.
              </div>
              <div class="my-1">
                <v-icon class="me-1 op-0-3" small>settings_ethernet</v-icon>
                <b>Disable: </b> The slide navigation arrows will not be
                displayed.
              </div>
            </div>
          </v-tooltip>


          <v-tooltip bottom color="#111">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="toggleDirection()"
                depressed
                color="#225082"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{
                  $sectionData.slide.vertical
                    ? "vertical_distribute"
                    : "horizontal_distribute"
                }}</v-icon>
              </v-btn>
            </template>
            <div class="text-start small">
              <div class="my-1">
                <v-icon class="me-1" small>horizontal_distribute</v-icon>
                <b>Horizontal: </b> The presentation slides will be displayed in
                landscape orientation.
              </div>
              <div class="my-1">
                <v-icon class="me-1 op-0-3" small>vertical_distribute</v-icon>
                <b>Vertical: </b> The presentation slides will be displayed in a
                portrait orientation.
              </div>
            </div>
          </v-tooltip>


          <v-btn @click="refresh()" depressed title="Refresh" color="#225082">
            <v-icon>refresh</v-icon>
          </v-btn>

          <v-tooltip bottom color="#111">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="toggleAutoplay()"
                depressed
                title="Auto play"
                v-bind="attrs"
                v-on="on"
                color="#225082"
              >
                <v-icon>{{
                  $sectionData.slide.autoplay ? "play_arrow" : "stop"
                }}</v-icon>
              </v-btn>
            </template>
            <div class="text-start small">
              <div class="my-1">
                <v-icon class="me-1" small>play_arrow</v-icon> <b>On: </b> Auto
                play slides. This option available only in the live page.
              </div>
              <div class="my-1">
                <v-icon class="me-1" small>stop</v-icon> <b>Off: </b> Manually
                slide change only.
              </div>
            </div>
          </v-tooltip>
        </v-toolbar-items>

        <v-divider vertical class="mx-1 my-0"></v-divider>

        <s-number-input
          v-model="$sectionData.slide.slidesPerView"
          @blur="refresh()"
          label="Preview count"
          filled
          class="nbt mx-1"
          hide-details
          style="width: 144px; min-width: 144px"
          background-color="#225082"
        ></s-number-input>
        <s-number-input
          v-model="$sectionData.slide.spaceBetween"
          @blur="refresh()"
          label="Space between"
          filled
          class="nbt mx-1"
          hide-details
          style="width: 144px; min-width: 144px"
          background-color="#225082"
        ></s-number-input>

        <s-number-dimension-input
          v-model="$sectionData.slide.height"
          @blur="refresh()"
          label="Height"
          filled
          class="nbt mx-1"
          hide-details
          style="max-width: 200px; min-width: 200px"
          background-color="#225082"
        ></s-number-dimension-input>

        <v-divider vertical class="mx-1 my-0"></v-divider>

        <v-select
          v-model="$sectionData.slide.effect"
          :items="EFFECTS"
          @change="refresh()"
          item-text="title"
          item-value="value"
          label="Effect"
          :return-object="false"
          class="nbt mx-1"
          hide-details
          filled
          style="max-width: 124px; min-width: 124px"
          background-color="#225082"
        >
        </v-select>

        <v-select
          v-model="$sectionData.slide.active"
          :items="ACTIVE_CENTER"
          @change="refresh()"
          item-text="title"
          item-value="value"
          label="Center Style"
          :return-object="false"
          class="nbt mx-1"
          hide-details
          filled
          style="max-width: 124px; min-width: 124px"
          background-color="#225082"
        >
        </v-select>
      </v-toolbar>
    </v-sheet>
    -->
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
          class="container position-relative h-100"
          :index="index"
          :style="[
            backgroundStyle($sectionData.slide.items[index].background),
            $sectionData.slide.items[index].style,
          ]"
          :class="[
            $sectionData.slide.items[index].classes,
            realIndex === index ? $sectionData.slide.active : null,
          ]"
          v-styler:container="$sectionData.slide.items[index]"
          no-fluid="true"
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
            :path="`$sectionData.slide.items[${index}].image`"
            :class="{ pen: !$section.lock }"
            :initialSize="{
              w: '100px',
              h: '100px',
              min_h: '20px',
              min_w: '20px',
            }"
            contain
            :augment="augment"
          />

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
            v-styler:button="{ target: $sectionData.slide.items[index].button }"
            :index="index"
            :btn-data="$sectionData.slide.items[index].button"
            class="m-2"
            :editing="$builder.isEditing"
            :augment="augment"
          >
          </x-button>

          <v-sheet
            v-if="$builder.isEditing && !$builder.isHideExtra"
            dark
            class="inline-editor-sheet"
          >
            <v-slide-x-reverse-transition hide-on-leave>
              <v-btn
                key="add"
                v-if="!$sectionData.slide.items[index].button"
                @click.stop="
                  $sectionData.slide.items[index].button = getInstance(
                    types.Button,
                  );
                  $forceUpdate();
                "
                variant="outlined"
                class="ma-1"
                title="Add action button."
              >
                <v-icon color="success" start>add</v-icon>
                Add Action
              </v-btn>
              <v-btn
                key="del"
                v-else
                variant="outlined"
                class="ma-1"
                title="Delete button."
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
              dark
              class="tnt ma-1"
              style="z-index: 100"
              @click.stop="removeSlide(index)"
              variant="outlined"
            >
              <v-icon start color="red">close</v-icon>
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
import * as types from "../../src/types";
import { Seeder } from "@app-page-builder/src/seeder";
import SNumberInput from "@components/ui/input/number/SNumberInput.vue";
import SNumberDimensionInput from "@components/ui/dimension/SNumberDimensionInput";
import XButton from "@app-page-builder/sections/components/XButton.vue";
import VideoBackground from "@app-page-builder/sections/components/VideoBackground.vue";
import { Swiper, SwiperSlide } from "swiper/vue";

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
  name: "SectionScrollView",
  components: {
    VideoBackground,
    XButton,
    SNumberDimensionInput,
    SNumberInput,
    Swiper,
    SwiperSlide,
  },
  cover: require("../../assets/images/covers/scroll-view.svg"),

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
