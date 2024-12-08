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
  <l-setting-navigation v-model="show_edit_slide">
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

        <s-setting-group
          title="Slides"
          icon="layers"
          subtitle="List of slides in the swiper. Click on a slide to edit it."
        >
          <template v-slot:title-action>
            <s-setting-button
              label="Add Slide"
              icon="add_box"
              @click="addSlide"
            >
            </s-setting-button>
          </template>
        </s-setting-group>
        <draggable
          v-model="target.children"
          handle=".handle"
          tag="div"
          animation="200"
          ghostClass="bg-primary"
          class="border-between-vertical"
          itemKey="id"
        >
          <template v-slot:item="{ element, index }">
            <l-settings-swiper-slide
              :object="element"
              @click="goToSlide(index)"
              :label="`Slide ${index + 1}`"
              class="flex-grow-1"
              :class="{ 'bg-blue': index === section.__currentSlide }"
            >
            </l-settings-swiper-slide>
          </template>
        </draggable>

        <!-- ████████████████████ Appearance ████████████████████ -->

        <s-setting-group title="Appearance" icon="design_services">
          <s-setting-select
            v-model="target.data.direction"
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

          <o-swiper-slides-per-view v-model="target"></o-swiper-slides-per-view>

          <o-swiper-slides-per-group
            v-model="target"
          ></o-swiper-slides-per-group>

          <o-swiper-grid v-model="target"></o-swiper-grid>

          <o-swiper-centered-slides v-model="target"></o-swiper-centered-slides>

          <o-swiper-space-between v-model="target"></o-swiper-space-between>

          <o-swiper-initial-slide v-model="target"></o-swiper-initial-slide>

          <o-swiper-loop v-model="target"></o-swiper-loop>

          <s-setting-switch
            v-model="target.data.grabCursor"
            icon="mouse"
            label="Grab cursor"
          ></s-setting-switch>
        </s-setting-group>

        <!-- ████████████████████ Effects ████████████████████ -->

        <o-swiper-effect v-model="target"></o-swiper-effect>

        <!-- ████████████████████ Size ████████████████████ -->
        <o-swiper-size v-model="target"></o-swiper-size>

        <!-- ████████████████████ Auto Play ████████████████████ -->
        <o-swiper-auto-play v-model="target"></o-swiper-auto-play>

        <!-- ████████████████████ Modules ████████████████████ -->
        <s-setting-group title="Modules"></s-setting-group>

        <o-swiper-navigation v-model="target"></o-swiper-navigation>

        <o-swiper-pagination v-model="target"></o-swiper-pagination>

        <o-swiper-keyboard v-model="target"></o-swiper-keyboard>
      </v-card-text>
    </v-card>
  </l-setting-navigation>
</template>

<script lang="ts">
import LEventsName from "../../mixins/events/name/LEventsName";
import { LUtilsHighlight } from "../../utils/highligh/LUtilsHighlight";
import { StripTags } from "@selldone/core-js/helper/html/HtmlHelper";
import SSettingSwitch from "../../styler/settings/switch/SSettingSwitch.vue";
import SSettingSelect from "../../styler/settings/select/SSettingSelect.vue";
import SSettingGroup from "../../styler/settings/group/SSettingGroup.vue";
import OSwiperSize from "../../settings/swiper/items/Size/OSwiperSize.vue";
import OSwiperAutoPlay from "../../settings/swiper/items/AutoPlay/OSwiperAutoPlay.vue";
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
import { EventBus } from "@selldone/core-js/events/EventBus";
import { XSwiperObject } from "@selldone/page-builder/components/x/swiper/XSwiperObject.ts";
import LSettingsSwiperSlide from "@selldone/page-builder/settings/swiper/slide/LSettingsSwiperSlide.vue";
import SSettingButton from "@selldone/page-builder/styler/settings/button/SSettingButton.vue";
import { LUtilsClone } from "@selldone/page-builder/utils/clone/LUtilsClone.ts";
import LSettingNavigation from "@selldone/page-builder/settings/LSettingNavigation.vue";
import { defineAsyncComponent } from "vue";
import NotificationService from "@selldone/components-vue/plugins/notification/NotificationService.ts";

export default {
  name: "LSettingsSwiper",

  mixins: [LMixinEvents],

  components: {
    LSettingNavigation,
    SSettingButton,
    draggable: defineAsyncComponent(() => import("vuedraggable")),
    LSettingsSwiperSlide,
    OSwiperKeyboard,
    OSwiperEffect,
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
  },
  inject: ["$builder"],
  props: {},
  data: () => ({
    el: null,
    section: null,
    target: null,

    //----------------------- Bg image -----------------------
    show_edit_slide: false,
    dialog_pre: false,

    lock: true,
    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {},
  watch: {
    show_edit_slide(dialog) {
      // Keep highlight active element:
      if (!dialog) LUtilsHighlight.RemoveAllElementFocusEditing();
      else if (this.el) LUtilsHighlight.Activate(this.el);
    },

    lock(lock) {
      this.section.__lock = lock;
      //this.refresh();
    },
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsSwiper",

      ({ el, section, target }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.section = section;
        this.target = target;
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
      this.__lock = this.section.__lock; // temporary values

      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.show_edit_slide = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },
    //----------------------------------------------------------------------------

    addSlide() {
      const slide = this.target.children[0];

      this.target.addChild(
        slide ? LUtilsClone.CloneElement(slide) : XSwiperObject.SeedSlide(),
      );
      //this.refresh();
    },

    removeSlide(index) {
      NotificationService.openDeleteAlert(() => {
        this.target.children.splice(index, 1);
        //this.refresh();
      });
    },

    /*  refresh() {
        this.setSlideDebounced();
      },*/

    goToSlide(index) {
      // console.log("goToSlide", index);
      this.section.__goToSlide(index);
    },

    //----------------------------------------------------------------------------
  },
};
</script>

<style lang="scss" scoped></style>
