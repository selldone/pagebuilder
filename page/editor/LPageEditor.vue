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

<template>
  <v-fade-transition>
    <div
      v-if="busyFetch"
      style="
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        left: 0;
        width: 100%;
        top: 0;
        height: 100%;
        z-index: 999999;
        backdrop-filter: blur(4px) grayscale(100%);
      "
    >
      <div
        class="center-fix loading-view-rect-center s--shadow-with-padding rounded-xl"
        style="z-index: 99999"
      >
        <v-progress-circular color="#222" :size="50" indeterminate />
        <p class="mt-2">
          {{ $t("page_builder.waiting_fetch") }}
        </p>
      </div>
    </div>
  </v-fade-transition>

  <div
    v-bind="$attrs"
    @dragover="onDragEnter"
    @dragleave="onDragLeave"
    @drop.stop="onDropFile"
  >
    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Top Header ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

    <l-header :backTo="backTo"></l-header>

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Top Tools ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

    <l-menu-top :busy-save="busySave" :saveFunction="saveFunction">
    </l-menu-top>

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Page ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <div
      v-scroll="onScroll"
      class="page-builder position-relative"
      data-gramm="false"
      spellcheck="false"
      style="
        min-height: 60vh;
        max-width: 1720px;
        margin: auto;
        border-radius: 20px;
        overflow: hidden;
      "
    >
      <!-- ------------------------------------- Themes ------------------------------------------>

      <l-templates-list
        v-if="show_templates"
        has-header
        clickable
        @select:raw-theme="(_raw) => loadRawTemplate(_raw)"
        @select:page="(_page) => loadPageTemplate(_page)"
      ></l-templates-list>

      <!-- ████████████████████████ Editor ████████████████████████ -->
      <div
        :class="{ hidden: show_templates }"
        :style="{ 'max-height': max_h }"
        class="designer-container"
        @mouseup="$builder.isEditing ? $builder.history.save() : undefined"
        @mousemove="(e) => (lastCursorY = e.clientY)"
      >
        <!-- ████████████████████████ Editor > 🪅 Artboard ████████████████████████ -->

        <div
          id="artboard"
          ref="artboard"
          :class="{
            'is-sorting': $builder.isSorting,
            'is-editable': $builder.isEditing && inEditMode,
          }"
          class="artboard overflow-hidden"
          :style="{ minHeight: scale_down ? '200vh' : '100vh' }"
        >
          <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆  Side Helper (View Mode) ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

          <v-slide-x-reverse-transition leave-absolute>
            <l-page-editor-artboard-view-mode
              v-if="
                !$builder.isAnimation &&
                !$builder.isTracking &&
                ($vuetify.display.xlAndUp || scale_down)
              "
              :fullscreen="!scale_down"
              v-model:render-mode="render_mode"
            >
            </l-page-editor-artboard-view-mode>
          </v-slide-x-reverse-transition>

          <div
            :class="{
              'in-scale-down': scale_down,
              desktop: device === 'desktop',
              tablet: device === 'tablet',
              mobile: device === 'mobile',

              '--blueprint-mode':
                $builder.isAnimation ||
                $builder.isTracking ||
                render_mode === 'simple' ||
                render_mode === 'wire',
              '--tracking': $builder.isTracking,
              '--wire': in_design_mode && render_mode === 'wire',
              '--show-classes':
                in_design_mode && render_mode === 'wire' && show_classes,
              '--show-styles':
                in_design_mode && render_mode === 'wire' && show_styles,

              '--editable': in_design_mode,
            }"
            :style="CUSTOM_PAGE_STYLE"
            class="main-sections-container no-inv"
          >
            <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆  Top Bar ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

            <l-page-editor-artboard-top-bar
              :page="modelValue"
              :fullscreen="!scale_down"
              :shop="$shop"
              :isPopup="isPopup"
              :isMenu="isMenu"
              :demo="demo"
            ></l-page-editor-artboard-top-bar>
            <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆  Progress Loading ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

            <v-progress-linear
              v-if="delay_load > 0 && delay_load < 999"
              :model-value="load_percent"
              color="success"
              striped
            ></v-progress-linear>

            <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆  Page Content ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
            <v-locale-provider :rtl="modelValue?.direction === 'rtl'">
              <div
                :class="{
                  'drop-active':
                    !$builder.sections.length && past_hover_index === 0,
                }"
                :style="[
                  PageBuilderTypoHelper.GenerateTypoStyle($builder.style),
                  PageBuilderColorsHelper.GenerateColorsStyle($builder.style),
                ]"
                class="page-content-wrap-editor position-relative"
                :dir="modelValue ? modelValue.direction : 'auto'"
              >
                <!-- Important: set key and wrap with div to prevent loss proper for dragging elements -->
                <div key="header-demo" class="usn pen">
                  <slot name="header" :builder="$builder"></slot>
                </div>

                <div
                  ref="pagecontent"
                  :class="{ 'min-height-80vh': $builder.isEditing }"
                  class="page-content"
                  @click="handleClickOnSections"
                  @dragleave="
                    (e) => (!$builder.isEditing ? undefined : leaveDrag(e))
                  "
                >
                  <l-artboard-section
                    v-for="(section, index) in $builder.sections"
                    :key="section.uid"
                    :section="section"
                    :loading="delay_load <= index"
                    :index="index"
                    :shop="$shop"
                    :aiAutoFillFunction="aiAutoFillFunction"
                    v-model:past-hover-index="past_hover_index"
                  ></l-artboard-section>

                  <l-artboard-drop
                    v-if="$builder.isEditing && !$builder.sections.length"
                    :index="0"
                    key="empty"
                  >
                    <div
                      class="pa-5 d-flex align-center justify-center"
                      style="
                        min-height: 70vh;
                        background: #6548cc;
                        border-radius: 20px;
                        margin: 4%;
                        color: #fff;
                        font-size: 2rem;
                        font-weight: 400;
                      "
                    >
                      Drop Section Here...
                    </div>
                  </l-artboard-drop>
                </div>
              </div>
            </v-locale-provider>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="drop_landing_file"
    @drop.stop="onDropFile"
    style="
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(22, 22, 22, 0.5);
      backdrop-filter: blur(8px);

      z-index: 9999;
    "
    class="usn pen d-flex flex-column align-center justify-center pa-8 text-white text-h5"
  >
    <div class="position-relative">
      <v-icon size="64" class="ma-5">architecture</v-icon>
      <v-progress-circular
        v-if="busy_import"
        size="94"
        indeterminate
        class="center-absolute"
      ></v-progress-circular>
    </div>
    <div class="my-5">Drop Landing File Here</div>
    <v-btn
      icon
      @click="drop_landing_file = false"
      style="pointer-events: all"
      variant="text"
    >
      <v-icon>close</v-icon>
    </v-btn>
  </div>

  <!-- ――――――――――――――――――――――  Repository ―――――――――――――――――――― -->

  <l-page-editor-repository
    v-if="inEditMode && !show_templates"
    :scale-down-mode="scale_down"
  >
  </l-page-editor-repository>

  <!-- ――――――――――――――  Hierarchy / Sections / Elements / ... ―――――――――――――― -->

  <l-menu-left
    v-if="!show_templates"
    :is-visible="$builder.showLeftMenu && inEditMode"
    :is-scroll-down="scrollTop > 200"
    :histories="histories"
    :set-page-function="setPage"
    :fetch-page-data="fetchPageData"
    :page="modelValue"
  ></l-menu-left>

  <!-- ――――――――――――――――――――――  Settings ―――――――――――――――――――― -->
  <l-settings></l-settings>

  <!-- ――――――――――――――――――――――  Uploader Toolbar ―――――――――――――――――――― -->
  <x-uploader-toolbar></x-uploader-toolbar>

  <!-- ――――――――――――――――――――――  Feeder ―――――――――――――――――――― -->
  <l-feeder-dialog></l-feeder-dialog>
</template>

<script lang="ts">
import Sortable from "sortablejs";

import { LUtilsBackground } from "../../utils/background/LUtilsBackground";
import LPageEditorRepository from "@selldone/page-builder/page/editor/repository/LPageEditorRepository.vue";
import LFeederDialog from "../../components/feeder/dialog/LFeederDialog.vue";
import { LUtilsTypo } from "../../utils/typo/LUtilsTypo";
import { LUtilsColors } from "../../utils/colors/LUtilsColors";
import LTemplatesList from "../../components/templates/list/LTemplatesList.vue";
import LEventsName from "../../mixins/events/name/LEventsName";
import { LUtilsHighlight } from "../../utils/highligh/LUtilsHighlight";
import _ from "lodash-es";
import { defineComponent } from "vue";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import Builder from "../../Builder.ts";
import LMenuLeft from "@selldone/page-builder/src/menu/left/LMenuLeft.vue";
import LSettings from "@selldone/page-builder/settings/LSettings.vue";
import LPageEditorArtboardTopBar from "@selldone/page-builder/page/editor/artboard/top-bar/LPageEditorArtboardTopBar.vue";
import LPageEditorArtboardViewMode from "@selldone/page-builder/page/editor/artboard/view-mode/LPageEditorArtboardViewMode.vue";
import { LUtilsLoader } from "@selldone/page-builder/utils/loader/LUtilsLoader.ts";
import LMenuTop from "@selldone/page-builder/src/menu/top/LMenuTop.vue";
import LArtboardSection from "@selldone/page-builder/page/editor/LArtboardSection.vue";
import LArtboardDrop from "@selldone/page-builder/page/editor/artboard/drop/LArtboardDrop.vue";
import { LMixinArtboard } from "@selldone/page-builder/mixins/artboard/LMixinArtboard.ts";
import XUploaderToolbar from "@selldone/page-builder/components/x/uploader/XUploaderToolbar.vue";
import LHeader from "@selldone/page-builder/src/header/LHeader.vue";
import { Page, Popup } from "@selldone/core-js/models";
import { RawTemplate } from "@selldone/page-builder/components/templates/list/RawTemplate.ts";
import { CONSOLE } from "@selldone/core-js";

export default defineComponent({
  name: "LPageEditor",
  mixins: [LMixinEvents, LMixinArtboard],
  inject: ["$shop"],
  components: {
    LHeader,
    XUploaderToolbar,
    LArtboardDrop,
    LArtboardSection,
    LMenuTop,
    LPageEditorArtboardViewMode,
    LPageEditorArtboardTopBar,
    LSettings,
    LMenuLeft,

    LTemplatesList,

    LFeederDialog,
    LPageEditorRepository,
  },
  emits: ["changeMode", "scale", "load:template"],
  props: {
    modelValue: {
      required: false,
      type: Object,
    },

    hasSettingButton: {
      type: Boolean,
      default: false,
    },

    device: {
      default: "desktop", // desktop   tablet   mobile
    },

    histories: { required: true, type: Array },

    isPopup: {
      type: Boolean,
      default: false,
    },
    isMenu: {
      type: Boolean,
      default: false,
    },

    aiAutoFillFunction: {},
    demo: Boolean,
    fetchPageData: { required: false, type: Function },

    backTo: { required: true },
    busySave: Boolean,
    busyFetch: Boolean,
    saveFunction: {
      type: Function,
    },
  },
  data() {
    return {
      $builder: null,

      lastCursorY: 0,
      PageBuilderTypoHelper: LUtilsTypo,
      PageBuilderColorsHelper: LUtilsColors,

      //----------------------------

      delay_load: 0,
      //----------------------------
      title: null,
      currentSection: "", // Important not be null (BUG occur)

      inEditMode: false,
      themes: null,

      max_h: "unset",

      interval: null, // Max height calculation interval!

      //-------------------

      templates: null,

      //-------------------

      key_listener_keydown: null,

      //-------------------
      scrollTop: 0,

      //-------------------
      render_mode: null,
      show_classes: false,
      show_styles: false,

      //-------------------
      sortable: null,

      //-------------------

      loading_ai: [],

      //-------------------

      drop_section: false, // Indicate that pre-built section drag over

      //-------------------

      past_hover_index: null,
      onPast: null,

      //-------------------
      busy_push: false,

      //-------------------
      drop_landing_file: false,
      busy_import: false,
    };
  },

  computed: {
    /**
     * External function call. (don't change it!)
     *
     * @constructor
     */
    CUSTOM_PAGE_STYLE() {
      if (!this.$builder.style) return null; // Fix bugs

      return LUtilsBackground.CreateCompleteBackgroundStyleObject(
        this.$builder.style,
      );
    },

    show_templates() {
      return !this.$builder.model?.id && !this.$builder.sections.length;
    },

    load_percent() {
      return (100 * this.delay_load) / this.sections_length;
    },
    is_loading_sections() {
      return this.sections_length && this.load_percent < 100;
    },

    scale_down() {
      return this.$builder.isSorting || this.$builder.showLeftMenu;
    },

    in_design_mode() {
      return !this.$builder.isAnimation && !this.$builder.isTracking;
    },

    sections_length() {
      return this.$builder.sections && this.$builder.sections.length;
    },

    /**
     * Compiled CSS
     * @return {*}
     */
    custom_css() {
      return this.modelValue?.css;
    },
  },

  watch: {
    "$route.query.element_id"(element_id) {
      this.autoShowNote();
    },
    modelValue(modelValue) {
      this.onModelChanged(modelValue);

      this.autoShowNote();
    },

    "modelValue.id"() {
      this.$builder.livestream.reset(); // Reset!
    },

    "$builder.sections": {
      deep: true,
      handler(sections) {
        // Do not emit sections change in loading sections!
        if (this.is_loading_sections) return;
        this.onUpdatePreview();
      },
    },

    custom_css(css) {
      //console.log("🩴 -----> custom_css Updated!");
      this.$builder.setCss(css);
    },

    scale_down(scale_down) {
      this.calcMaxH();
      this.$emit("scale", scale_down ? 0.5 : 1);
    },

    inEditMode(val) {
      this.$emit("changeMode", val);
    },

    "$builder.isSorting"(sort) {
      this.sortable.option("sort", sort); // Set sorting enabled or disabled

      if (sort) {
        this.sortable.option("disabled", false); // Force enable to be able to sort!
        this.$builder.isEditing = false; // Disable editing mode if sorting!
        //this.sortable.option("disabled", true);// Can not drop if in sorting mode!
      } else {
        this.$builder.isEditing = true;
        // this.sortable.option("disabled", !this.$builder.showLeftMenu);
      }
      //  this.onSortingModeChange();
    },
    "$builder.showLeftMenu"(menu) {
      this.sortable.option("disabled", !menu); // Can not drop if in sorting mode!
      if (menu) {
        this.$builder.isSorting = false; // Always make it false if menu is open!
      } else {
        if (this.$builder.isSorting) {
          this.sortable.option("disabled", false); // Keep sorting enable!
        }
      }
    },
  },
  provide() {
    return {
      $builder: this.$builder,
    };
  },

  beforeCreate() {
    // Initialize builder
    this.$builder = Builder.newInstance();
  },

  created() {
    // sets the initial data.
    if (this.modelValue) {
      this.onModelChanged(this.modelValue);
    }
  },
  mounted() {
    this.$builder.rootEl = this.$refs.artboard;

    const _self = this;

    this.sortable = Sortable.create(this.$refs.pagecontent, {
      group: {
        name: "artboard",
        put: "sections-group",
      },

      animation: 150,
      scroll: true,
      scrollSpeed: 10,
      sort: false,
      disabled: true,
      preventOnFilter: false,
      //easing: "cubic-bezier(1, 0, 0, 1)",
      removeCloneOnHide: true,

      filter: ".ignore-elements",
      chosenClass: "bg-amber", // Class name for the chosen item

      onAdd(evt) {
        try {
          const seed = evt.item._dragData;
          // console.log("Drop seed", seed, "Event item", evt.item);

          if (seed) {
            const json = JSON.parse(seed);
            const object = LUtilsLoader.JsonObjectToInstance(json.object);
            const instance = { object: object, label: json.label };
            _self.addSection(instance, evt.newIndex);
          } else {
            console.error("Seed data is not attached!");
          }

          evt.item.remove();

          //console.log("sortable : onAdd");
        } catch (e) {
          console.error("Error onAdd Section", e);
        }
      },
      onUpdate(evt) {
        _self.$builder.sort(evt.oldIndex, evt.newIndex);

        CONSOLE.log("sortable : onUpdate");
        _self.$builder.history.save();
      },
      setData: function (
        /** DataTransfer */ dataTransfer: DataTransfer,
        /** HTMLElement*/ dragEl,
      ) {
        // Prevent the default drag image from being shown
        const emptyImage = new Image();
        emptyImage.src =
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        dataTransfer.setDragImage(emptyImage, 0, 0);

        //dataTransfer.clearData('Text'); //Clear data to prevent insert text in dropped element!
      },
    });

    this.showList(); // On edit mode!

    this.interval = window.setInterval(() => {
      this.calcMaxH();
    }, 500);

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――

    //const t = this;

    this.key_listener_keydown = (event) => {
      if (window.PAGE_BUILDER_BLOCK_LISTEN_KEYS) return;

      //------------- Global key listener -----------

      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        //console.log('isEscape')
        if (this.$builder.cloneStyle) {
          this.$builder.cloneStyle = false;
          event.preventDefault();
          return false;
        }
      }

      // Save: Ctrl + S
      if ((event.ctrlKey || event.metaKey) && event.code === "KeyS") {
        this.saveFunction(this.$builder.export());
        event.preventDefault();
        return false;
      }

      // Copy Style Pipette: Ctrl + E
      if ((event.ctrlKey || event.metaKey) && event.code === "KeyE") {
        this.$builder.cloneStyle = !this.$builder.cloneStyle;
        event.preventDefault();
        return false;
      }

      // Toggle scale mode:
      if (event.code === "Tab" /*&& !event.target.isContentEditable*/) {
        //console.log("this.lastCursorY", this.lastCursorY);

        event.preventDefault(); // Prevent the default Tab behavior

        const scaleDown = !this.$builder.showLeftMenu; // Determine if we need to scale down or up

        // Function to capture the cursor's Y position on the screen
        const cursorYPosition =
          this.lastCursorY + (scaleDown ? -300 : -300); /*Top header height*/

        // Calculate the new scroll position to maintain focus around the cursor position
        function calculateScroll(multiple, cursorY) {
          const viewportHeight = window.innerHeight;
          // Calculate the proportional distance of the cursor from the top of the viewport
          const cursorProportionFromTop = cursorY / viewportHeight;
          // Adjust scroll position based on scale and cursor's proportion from the top
          return (
            (window.scrollY + cursorProportionFromTop * viewportHeight) *
              multiple -
            cursorY
          );
        }

        // Determine the new scale value and calculate the scroll adjustment
        // Adjust the '200' and other fixed values as needed for your specific layout
        const scrollPosition = calculateScroll(
          scaleDown ? 0.5 : 2,
          cursorYPosition,
        );

        // Toggle the visibility of the list or perform the scaling operation
        this.$builder.showLeftMenu = !this.$builder.showLeftMenu;

        // Delay the scrolling to allow the scaling animation to complete
        _.delay(
          () => {
            this.$nextTick(() => {
              window.scrollTo({
                top: Math.max(0, scrollPosition), // Ensure the scroll position does not go below 0
                behavior: "smooth", // Enable smooth scrolling
              });
            });
          },
          scaleDown ? 500 : 300,
        ); // Delay for scaling up, immediate for scaling down
      }

      if (event.target.isContentEditable) {
        // console.log('event.code : '+event.code )

        //------------- Short key only if in editable element! -----------

        if ((event.ctrlKey || event.metaKey) && event.code === "KeyB") {
          document.execCommand("bold");
          event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.code === "KeyI") {
          document.execCommand("italic");
          event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.code === "KeyR") {
          document.execCommand("removeFormat");
          event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.code === "KeyL") {
          document.execCommand("strikeThrough");
          event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.code === "KeyU") {
          document.execCommand("underline");
          event.preventDefault();
        } else if (
          (event.ctrlKey || event.metaKey) &&
          event.code === "Digit1"
        ) {
          event.preventDefault();
          document.selectionAddTag("small", "big");
        } else if (
          (event.ctrlKey || event.metaKey) &&
          event.code === "Digit2"
        ) {
          event.preventDefault();
          document.selectionAddTag("big", "small");
        }

        return; // No action in content editable focus!
      }

      //------------- Add Undo Redo -----------
      if ((event.ctrlKey || event.metaKey) && event.code === "KeyZ") {
        if (this.inActiveEditingMode()) this.$builder.history.undo();
      } else if ((event.ctrlKey || event.metaKey) && event.code === "KeyY") {
        if (this.inActiveEditingMode()) this.$builder.history.redo();
      }
    };

    document.addEventListener("keydown", this.key_listener_keydown, true);
    //――――――――――――――――――――――  END Editor key listener ――――――――――――――――――――

    window.onbeforeunload = function () {
      return "Are you sure to <b>close page design</b>?";
    };

    this.registerPastListener();
  },

  updated() {
    if (this.$builder.scrolling && this.$refs.artboard) {
      this.$builder.scrolling(this.$refs.artboard);
    }
  },

  beforeUnmount() {
    window.onbeforeunload = undefined;

    // console.log("Unregister hot key.", this.key_listener_keydown);

    // Destroy sortables: (memory leakage)
    try {
      this.sortable.destroy();
    } catch (e) {}

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
    try {
      this.$builder.clear();
    } catch (e) {}
    window.clearInterval(this.interval);

    //console.log("...beforeDestroy...",this.$builder);

    //―――――――――――――――――――――― Past >Unregister ――――――――――――――――――――
    document.removeEventListener("paste", this.onPast, true);
  },

  methods: {
    onUpdatePreview: _.throttle(function () {
      const sections = this.$builder?.sections;
      // console.log("sections -------->", sections);
      if (!this.modelValue?.id) return; // Only emit changes if page exists!

      const _page = {
        title: this.title,
        image: this.modelValue.image,
        name: this.modelValue.name,
        direction: this.modelValue.direction,
        color: this.modelValue.color,
        content: {
          title: this.title,
          sections: sections.map((s) => s.toJson()),
          style: this.$builder.style,
        },
        css: this.modelValue.css,
      };

      this.updateRealtimePreview(_page);
    }, 1000),

    //―――――――――――――――――――――― Past > Register ――――――――――――――――――――
    registerPastListener() {
      // Add global past:
      this.onPast = (event) => {
        if (window.PAGE_BUILDER_BLOCK_LISTEN_KEYS) return;

        let paste = (event.clipboardData || window.clipboardData).getData(
          "text",
        );

        function IsValidJsonSectionString(str) {
          try {
            let json = JSON.parse(str);
            return !!json?.object;
          } catch (e) {}
          return false;
        }

        // Try parse as section:
        if (paste && IsValidJsonSectionString(paste)) {
          this.$builder._copy_section = paste;

          this.pastSection(
            this.past_hover_index === null
              ? this.$builder.sections.length + 1
              : this.past_hover_index + 1,
          );
          event.preventDefault();
        }
      };
      document.addEventListener("paste", this.onPast, true);
    },

    //――――――――――――――――――――――  Past Section ――――――――――――――――――――

    pastSection(index) {
      if (!this.$builder._copy_section) {
        this.showWarningAlert(
          "First copy a section!",
          "Data on clipboard not found!",
        );

        return;
      }

      try {
        let section = JSON.parse(this.$builder._copy_section);
        if (section.object) {
          this.$builder.add(section, index, true);
          this.$builder.history.save();
          this.autoLoadSectionFonts(section);
          return;
        }
      } catch (e) {
        console.error(e);
      }

      this.showWarningAlert("Invalid", "Clipboard data has invalid structure!");
    },

    inActiveEditingMode() {
      // Dialog open then prevent any undo / redo short key!
      // console.log('--->',document.querySelector('.v-overlay-container > .v-overlay--active'),document.querySelector('.v-navigation-drawer--active'))
      if (
        document.querySelector(".v-overlay-container > .v-overlay--active") !==
          null ||
        document.querySelector(".v-navigation-drawer--active") !== null
      )
        return false;

      // Check dialog open then prevent any undo / redo short key!
      if ($(".v-dialog__content.v-dialog__content--active").length) {
        // The element exists
        return false;
      }
      return true;
    },

    //-----------------------------------

    calcMaxH() {
      if (this.scale_down) {
        let height = this.$refs.artboard?.clientHeight;
        this.max_h = 120 + height / 2 + "px"; //height/2 + 'px'; // problem in add new element
      } else {
        this.max_h = "unset";
      }

      // console.log('calcMaxH',this.max_h)
    },

    addSection(section, position) {
      //console.log("addSection", section, "position", position);

      this.$builder.add(section, position, true);

      this.$builder.history.save();
    },

    loadNextDelayed() {
      _.delay(() => {
        this.delay_load++;
        // console.log('this.delay_load',this.delay_load,this.$builder.sections.length)
        if (this.delay_load <= this.$builder.sections.length) {
          this.$nextTick(() => {
            this.loadNextDelayed();
          });
        } else {
          this.delay_load = 999;
        }
      }, 100);
    },

    loadRawTemplate(theme: RawTemplate) {
      CONSOLE.log("Page buildr | Load raw template", theme);
      (this.$builder as Builder).loadPage({ content: theme });

      this.$emit("load:template", {
        content: this.$builder.export(),
        image: null,
      }); // Simulate like landing page template files!
    },

    loadPageTemplate(page) {
      (this.$builder as Builder).loadPage(page);

      //update random title:
      page.content.title = "Landing-" + Math.random().toString(36).substring(7);

      this.$emit("load:template", page);
    },

    onModelChanged(
      model: Page | Popup /*Or shop menu*/,
      save_history: boolean = true,
    ) {
      //TODO: Add shop menu model
      this.delay_load = 0;

      console.style(
        "<b>📐 On model changed | Set page builder content.</b>",
        model,
      );

      // Set model and type in the builder:
      const model_type = this.isPopup ? "popup" : this.isMenu ? "menu" : "page";
      this.$builder.setModel(model_type, this.modelValue); // Link model (pass to generate upload urls)

      this.inEditMode = true;
      (this.$builder as Builder).loadPage(model);

      this.loadNextDelayed();

      if (save_history) {
        // Save initial state: (Call after set!)
        this.$builder.history.save();
      }
    },

    /**
     * IMPORTANT: Externally call this function to set page builder content.
     * @param content
     * @param css
     * @param from_theme
     */
    setPage(content, css, from_theme = false) {
      this.delay_load = 0;

      console.error("<b>📐 Set page builder content.</b>", content, from_theme);

      this.inEditMode = true;
      this.$builder.loadPage({ content, css });

      this.loadNextDelayed();

      if (!from_theme) {
        // Save initial state: (Call after set!)
        this.$builder.history.save();
      }
    },
    /*  onSortingModeChange() {
        console.log("onSortingModeChange", this.$builder.isSorting);
  
        this.$builder.isEditing = !this.$builder.isSorting;
  
        if (!this.sortable) return;
  
        if (!this.$builder.isSorting && this.$builder.showLeftMenu) {
          this.onShowLeftMenuUpdate();
        }
  
        const sortingEnabled = this.$builder.isSorting;
        this.sortable.option("sort", sortingEnabled);  // Set sorting enabled or disabled
        this.sortable.option("disabled", !sortingEnabled);// Can not drop if in sorting mode!
      },*/

    /*  onShowLeftMenuUpdate() {
        console.log("onShowLeftMenuUpdate", this.$builder.showLeftMenu);
  
        if (!this.sortable) return;
  
        if (!this.$builder.showLeftMenu && this.$builder.isSorting) {
          this.$builder.isSorting = false;
          this.onSortingModeChange();
        }
  
        const menuVisible = this.$builder.showLeftMenu;
  
        this.sortable.option("disabled", !menuVisible); // Can drop if left menu is visible!
      },*/

    showList() {
      this.$builder.showLeftMenu = true;
      if (this.sortable) {
        this.sortable.option("disabled", false);
      }
    },

    onScroll(e) {
      this.scrollTop = document.documentElement.scrollTop;
    },

    leaveDrag(event) {
      if (
        this.$builder.sections.length /*No section mode!*/ &&
        !event.target.classList.contains("target-drop")
      )
        return;
      //  console.log('leaveDrag' ,event)
      // if (event.dataTransfer.types.includes("section")) return;
      //  console.log('leaveDrag' ,this.past_hover_index)

      this.past_hover_index = null;
      this.drop_section = false;
    },

    showWriteNote(section) {
      if (!section) return;

      this.showGlobalShopNoteDialog(section.uid);
    },
    autoShowNote() {
      if (this.$route.query.element_id) {
        this.showWriteNote(
          this.$builder.sections.find(
            (s) => s.id === this.$route.query.element_id,
          ),
        ); // Auto open note dialog if element_id be in query (used in notifications link)
      }
    },
    /*
    setModelInBuilder() {
      const model_type = this.isPopup ? "popup" : this.isMenu ? "menu" : "page";
      this.$builder.setModel(model_type, this.page); // Link model (pass to generate upload urls)
    },*/

    handleClickOnSections(event) {
      if (!LUtilsHighlight.IsChildOfHighlightActiveEditing(event.target))
        EventBus.$emit(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);
    },

    //-------------------------------------------------------------------------------------
    updateRealtimePreview: _.throttle(function (_page) {
      this.updateRealtimePreviewNow(_page);
    }, 5000),

    updateRealtimePreviewNow(_page) {
      // console.log('updateRealtimePreviewNow',_page,this.$builder.livestream.canSend())
      // First time try update and get presence audience! If there is audience then auto activate the live stream.
      if (!this.$shop /*Only for shop*/ || !this.$builder.livestream.canSend())
        return;

      if (!_page || this.busy_push || !this.modelValue?.id) return;

      this.$builder.livestream.onSend();

      CONSOLE.log("Update Preview!");

      this.busy_push = true;
      axios
        .post(
          window.API.POST_PAGE_DATA_UPDATE_PREVIEW(
            this.$shop.id,
            this.modelValue.id,
          ),
          _page,
        )
        .then(({ data }) => {
          if (data.error) {
            this.showErrorAlert(null, data.error_msg);
            return;
          }
          this.$builder.livestream.setAudiences(data.audiences);
        })
        .catch((error) => {
          this.showLaravelError(error);
        })
        .finally(() => (this.busy_push = false));
    },

    //-------------------------------------------------------------------------------------

    onDragEnter(event) {
      // Check if there is a file with .landing extension
      const items = event.dataTransfer.items;
      for (let i = 0; i < items.length; i++) {
        if (
          items[i].kind === "file" &&
          items[i].type === "" /*.landing text file!*/
        ) {
          this.drop_landing_file = true;
          event.stopPropagation();
          break;
        }
      }
    },
    onDragLeave() {
      this.drop_landing_file = false;
    },

    onDropFile(event) {
      CONSOLE.log("Drop file!", event.dataTransfer.files);
      const files = event.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        if (files[i].name.endsWith(".landing")) {
          CONSOLE.log("Drop landing file!");
          event.preventDefault();
          event.stopPropagation();
          // Process the .landing file
          this.processFile(files[i]);
          return;
        }
      }

      this.drop_landing_file = false;
    },

    async processFile(file) {
      this.busy_import = true;
      this.delay_load = 0;
      // Handle the .landing file
      CONSOLE.log("Dropped file:", file);

      this.$builder.importer
        .loadFile(file)
        .then(() => {
          this.showSuccessAlert(null, "Landing file loaded successfully.");
        })
        .catch((e) => {
          this.showErrorAlert(null, e.toString());
          console.error(e);
        })
        .finally(() => {
          this.drop_landing_file = false;
          this.busy_import = false;
          this.loadNextDelayed();
        });
    },
  },
});
</script>

<style lang="scss" scoped>
$gray: #c1c1c1;
$blue: #0072ff;
$red: #ff3d3d;
$green: #18d88b;
$dark: #323c47;
$white: #fff;
$black: #000;

h1 {
  font-size: 1.7rem;
}

p {
  font-size: 1.2rem;

  &.small {
    font-size: 1rem;
  }
}

.artboard {
  transform-origin: top center;

  &.is-editable .is-editable {
    outline: none;
  }
}

.is-editable {
  &:hover {
    //box-shadow: inset 0 0 0 2px $gray;
  }
}

label {
  margin: 12px 0 0 0;
  font-size: 1.2rem;
}

.move-courser {
  position: relative;
  cursor: move;
  transition: all 0.3s;

  &:hover {
    &::after {
      animation: fadeInFromNone 0.3s ease-out;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #ffc107 !important;
      opacity: 0.4;
    }

    box-shadow: 0px 10px 50px 0px rgba(0, 0, 0, 0.2);
  }

  &:active {
    /* &::after{
        background-color: #FFA000 !important;
        opacity: 0.8;
      }*/
  }
}

::v-deep(.block-pointer-event) {
  div {
    pointer-events: none;
    animation: none !important;
  }
}

.hover-z-10 {
  &:hover {
    z-index: 10;
  }
}

@keyframes fadeInFromNone {
  0% {
    opacity: 0;
  }

  1% {
    opacity: 0;
  }

  100% {
    opacity: 0.4;
  }
}
</style>

<style lang="scss">
// ------------------------------ Clone style ------------------------------

.cursor-pipette {
  [cloneable] {
    pointer-events: auto !important;
    transition: none !important;

    &:hover {
      cursor: url(data:image/x-icon;base64,AAABAAEAEBAAAAAAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAD///8BAAAAfwAAAIH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8BAAAAcQAAAN8AAADTAAAArwAAAE8AAAAJ////Af///wH///8B////Af///wH///8B////Af///wH///8B////AQAAAJEAAADLAAAAEwAAAHsAAADDAAAA3wAAADP///8B////Af///wH///8B////Af///wH///8B////Af///wH///8BAAAAuQAAAHX///8B////AQAAAF0AAADtAAAAOf///wH///8B////Af///wH///8B////Af///wH///8B////AQAAAFMAAAC/////Af///wH///8BAAAAUQAAAO0AAAA5////Af///wH///8B////Af///wH///8B////Af///wEAAAANAAAA5wAAAFH///8B////Af///wEAAABRAAAA7QAAADn///8B////Af///wH///8B////Af///wH///8B////AQAAAD0AAADtAAAARf///wH///8B////AQAAAFEAAADtAAAAOQAAACP///8B////Af///wH///8B////Af///wH///8BAAAARQAAAO0AAABF////Af///wH///8BAAAAUQAAAO0AAADvAAAAmf///wH///8B////Af///wH///8B////Af///wEAAABFAAAA7QAAAEX///8B////AQAAADUAAADxAAAA/wAAAPcAAAAr////Af///wH///8B////Af///wH///8B////AQAAAEUAAADtAAAARQAAADUAAADvAAAA/wAAAPcAAABFAAAALf///wH///8B////Af///wH///8B////Af///wH///8BAAAARQAAAO0AAADvAAAA/wAAAPcAAABFAAAAgwAAAPsAAABX////Af///wH///8B////Af///wH///8B////AQAAACUAAADvAAAA/wAAAPcAAABFAAAAgwAAAP8AAAD/AAAA+wAAAE////8B////Af///wH///8B////Af///wEAAAADAAAAoQAAAPcAAABFAAAAgwAAAP8AAAD/AAAA/wAAAP8AAADf////Af///wH///8B////Af///wH///8B////AQAAAAMAAAAvAAAALQAAAPsAAAD/AAAA/wAAAP8AAAD/AAAA+////wH///8B////Af///wH///8B////Af///wH///8B////Af///wEAAABXAAAA+wAAAP8AAAD/AAAA/wAAALX///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////AQAAAE8AAADfAAAA+wAAALUAAAAXAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//w==),
        default !important;
      border: solid 4px #000 !important;
    }

    * {
      pointer-events: none;
    }
  }
}

.cursor-bucket {
  [cloneable] {
    pointer-events: auto !important;
    transition: none !important;

    &:hover {
      cursor: url("data:image/x-icon;base64,AAACAAEAICAQAAAAAADoAgAAFgAAACgAAAAgAAAAQAAAAAEABAAAAAAAAAIAAAAAAAAAAAAAEAAAAAAAAAAAAAAAR0dHAP///wAiIiIAMjIyABYWFgA9PT0AODg4AE9PTwBfX18AKioqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiIiIiIiIiIgAAAAAAAAAACgAAAKMAAAIAAAAAAAAAAAAAAAoiMAACAAAAAAAAAAAAAAACIiYAAgAAAAAAAAAAYAAAIiIiMAIAAAAAAAAAADAAAiIiIiACAAAAAAAAAAUFACIiIiIiQgAAAAAAAAADAKIiIiIiIgIAAAAAAAAAAGMiImIiIiECAAAAAAAAAAUAIiApIiJgAgAAAAAAAAAApgIiAiIgAAIAAAAAAAAAAAAKIoIiAAACAAAAAAAAAAAABwICIAAAAgAAAAAAAAAAAAAAAlAAAAIAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAACgAIAAAgAAAAAAAAAAAAAAAKAAAAIAAAAAAAAAD///////////////////////////////////////////////////////////////////////////////+AAH//359//58Pf/8eB3//HAN//xgBf/8QAH//AAB//wABf/8AA3//gAd//8APf//wD3///C9///5vf//+73///x9//w=="),
        auto;

      border: solid 4px #000 !important;
    }

    * {
      pointer-events: none;
    }
  }
}

// ------------------------------ Global style ------------------------------
.main-sections-container {
  transition: all 0.5s;
  transform-origin: 50% 84px;
  background-color: #fff;
  border-radius: 28px;

  &.in-scale-down {
    //  overflow: hidden;
    // border-radius: 18px;
    transform: scale(0.5);
    //   outline: #333 dashed 3px;
    //  outline-offset: 8px;
    box-shadow: 0px 10px 50px 5px rgba(113, 112, 112, 0.24) !important;
  }

  margin: auto;

  &.desktop {
    max-width: 1920px;
  }

  &.tablet {
    max-width: 1200px;
  }

  &.mobile {
    max-width: 680px;
  }

  // Fix no sections page height
  .page-content-wrap-editor {
    min-height: 80vh;

    &.drop-active {
      background: #4e52c4 !important;
    }
  }

  //---------------------- Animation render mode ---------------------------
  &.--blueprint-mode {
    --main-bg-color: #225082;
    --section-bg-color: unset; //rgba(11, 119, 191, 0.85);
    --element-bg-color: rgba(9, 55, 84, 0.1);
    --solid-bg-color: #0b77bf;
    --solid-bg-color-dark: #0b6aaa;
    --text-color: rgba(255, 255, 255, 0.1);
    --btn-bg-color: #115a89;
    --btn-text-color: rgba(255, 255, 255, 0.2);

    --border-color: #fff;

    --ban-pointer-event: none;
    --ban-user-select: none;

    &.--editable {
      --ban-pointer-event: auto;
      --ban-user-select: auto;
    }

    &.--tracking {
      --main-bg-color: #fafafa;
      --section-bg-color: unset; // rgba(217, 216, 216, 0.79);
      --element-bg-color: rgba(167, 167, 167, 0.11);
      --solid-bg-color: #eee;
      --solid-bg-color-dark: #ddd;
      --text-color: #33333322;
      --btn-bg-color: #eee;
      --btn-text-color: #333;

      .-in-animation {
        opacity: 0 !important;
      }

      // Show ID of editable elements:
      .-trackable {
        // Element must have -trackable class!
        position: relative;

        &[id]:not([id=""]) {
          border: solid #b60e0e !important;

          &:after {
            position: absolute;
            top: -30px;
            right: 0;
            background: #b60e0e;
            color: #fff;
            font-size: 8px;
            padding: 4px 8px;
            border-radius: 6px;
            content: attr(id);
            font-weight: 700;
            z-index: 4;
            transition: all 0.5s ease-in-out;
          }

          &:hover {
            &:after {
              transform: translateY(-50%);
            }
          }
        }
      }
    }

    &.--wire {
      --main-bg-color: #fafafa;
      --section-bg-color: unset; // rgba(217, 216, 216, 0.79);
      --element-bg-color: rgba(167, 167, 167, 0.11);
      --solid-bg-color: #eee;
      --solid-bg-color-dark: #ddd;
      --text-color: #33333322;
      --btn-bg-color: #eee;
      --btn-text-color: #333;

      --border-color: #333;

      .-in-animation {
        opacity: 0 !important;
      }

      // Start add class & style show box

      &.--show-classes {
        .is-editable {
          &[class]:not([class=""]) {
            &:after {
              content: attr(class);
            }
          }
        }
      }

      &.--show-styles {
        .is-editable {
          &[style]:not([style=""]) {
            &:after {
              content: attr(style);
            }
          }
        }
      }

      &.--show-classes,
      &.--show-styles {
        .is-editable {
          position: relative;

          &[class]:not([class=""]),
          &[style]:not([style=""]) {
            &:after {
              //border: solid #AFB42B 1px !important;
              position: absolute;
              top: -30px;
              right: 0;
              background: #f0f4c3;
              color: #000;
              font-size: 8px;
              padding: 4px 8px;
              border-radius: 6px;
              font-weight: 400;
              z-index: 4;
              transition: all 0.5s ease-in-out;
              line-height: normal;
              overflow: hidden;
              text-wrap: wrap;
              white-space: wrap;
              letter-spacing: normal;
              max-width: 200px;
            }

            &:hover {
              &:after {
                transform: scale(1.2);
                z-index: 10;

                background: var(--def-color);
                color: #fff;
              }
            }

            // Row:
            &.v-row {
              &:after {
                top: unset;
                bottom: -30px;
                right: 0;
              }
            }

            // Column:
            &.v-col {
              &:after {
                top: unset;
                bottom: 0px;
                right: unset;
                left: 0;
              }
            }

            // Container:
            &.v-container {
              &:after {
                top: 0;
                bottom: unset;
                right: unset;
                left: 0;
              }
            }

            // Section:
            &.section {
              &:after {
                top: 0;
                right: 0;
                transform-origin: right;
              }
            }
          }
        }

        //End of is-editable
      }

      // End add class & style show box
    }

    // Start fix border width in scale down mode
    &.in-scale-down {
      .page-content-wrap-editor {
        section {
          border-width: 1.5px !important;

          .is-editable:not(section):not(.button):not(.artboard):not(.v-btn) {
            border-width: 1.5px !important;
          }
        }
      }
    }

    // End fix border width in scale down mode

    .page-content-wrap-editor {
      background: var(--main-bg-color) !important;
      // Add margin between sections to beter view:
      > section:first-child {
        border-top: unset !important;
      }

      section {
        border-style: dashed !important;
        border-width: thin !important;
        border-color: var(--border-color) !important;
        background: var(--section-bg-color) !important;

        border-left: unset !important;
        border-right: unset !important;
        border-bottom: unset !important;

        .is-editable {
          border-style: dashed !important;
          border-width: thin !important;
          border-color: var(--border-color) !important;
          background: var(--element-bg-color) !important;
          transition-duration: 0.2s;
        }

        // ************************* Images: (Blue print mode -> stripe) *************************
        .image-container {
          cursor: initial;

          .v-img {
            // v-image (Old i used this)
            filter: none !important;
            pointer-events: var(--ban-pointer-event) !important;

            .v-img__image {
              background-color: var(--solid-bg-color) !important;
              background-image: repeating-linear-gradient(
                -45deg,
                var(--solid-bg-color),
                var(--solid-bg-color) 5px,
                var(--solid-bg-color-dark) 5px,
                var(--solid-bg-color-dark) 10px
              ) !important;
              background-size: cover;
            }
          }

          > :not(.v-img, img):not(header):not(.-in-animation) {
            display: none;
          }

          // ************************* <img> (New) *************************
          .-foreground {
            //img has no after!
            position: absolute !important;
            display: block !important;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            filter: none !important;
            pointer-events: var(--ban-pointer-event) !important;
            background-color: var(--solid-bg-color) !important;
            background-image: repeating-linear-gradient(
              -45deg,
              var(--solid-bg-color),
              var(--solid-bg-color) 5px,
              var(--solid-bg-color-dark) 5px,
              var(--solid-bg-color-dark) 10px
            ) !important;
            background-size: cover;
          }

          img {
            opacity: 0;
          }
        }

        // END: .image-container

        .v-input {
          .v-input__slot {
            color: var(--text-color) !important;
            background: var(--solid-bg-color) !important;
          }
        }

        // Texts:
        p,
        h1,
        h2,
        h3,
        h4,
        h5 {
          color: var(--text-color) !important;
          background: transparent !important;
          user-select: var(--ban-user-select) !important;
          cursor: initial;

          font,
          big,
          small {
            color: var(--text-color) !important;
          }

          > div {
            // All time text gradient wrap with div!
            -webkit-text-fill-color: unset !important;
            -webkit-background-clip: unset !important;
            background: transparent !important;
            color: var(--text-color) !important;
          }
        }

        // buttons:

        button.is-editable {
          // Not apply to toolbar tools! (In image uploader)
          box-shadow: none !important;
          background: var(--btn-bg-color) !important;
          color: var(--btn-text-color) !important;
          user-select: var(--ban-user-select) !important;
        }

        // (make hide!)
        .hide-on-blueprint {
          display: none !important;
        }

        // Product:
        .x--product-view {
          pointer-events: var(--ban-pointer-event);
          position: relative;

          &:after {
            font-family: "fontawesome";
            content: "\f291";
            font-size: 5rem;

            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;

            position: absolute;
            background: var(--solid-bg-color)
              repeating-linear-gradient(
                45deg,
                var(--solid-bg-color),
                var(--solid-bg-color) 10px,
                var(--solid-bg-color-dark) 10px,
                var(--solid-bg-color-dark) 20px
              );
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            border-radius: 8px;
            border: solid var(--solid-bg-color-dark);
          }

          & > * {
            opacity: 0;
          }
        }

        // Article: (Or blogs)
        .s--article-editor-container,
        .s--shop-blog-card,
        .x--category-frame,
        .x--product-frame,
        .x--input,
        .s--category-card,
        .s--product-card {
          pointer-events: var(--ban-pointer-event);
          position: relative;

          background: none !important;

          &:after {
            font-family: "fontawesome";
            content: "\f1ea";
            font-size: 5rem;

            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;

            position: absolute;
            background: var(--solid-bg-color)
              repeating-linear-gradient(
                45deg,
                var(--solid-bg-color),
                var(--solid-bg-color) 10px,
                var(--solid-bg-color-dark) 10px,
                var(--solid-bg-color-dark) 20px
              );
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            border-radius: 8px;
            border: solid var(--solid-bg-color-dark);
          }

          & > * {
            opacity: 0;
          }
        }

        .x--category-frame {
          &:after {
            content: "\f07b" !important;
          }
        }

        .x--product-frame {
          &:after {
            content: "\e4c7" !important;
          }
        }

        .x--input {
          &:after {
            content: "\f11c" !important;
            font-size: 3rem;
          }
        }

        .s--category-card {
          &:after {
            content: "\f07b" !important;
          }
        }

        .s--product-card {
          &:after {
            content: "\e4c7" !important;
          }
        }
      }

      // End section
    }
  }
}

.hidden {
  display: none;
}

.show-name {
  position: relative;

  &:after {
    position: absolute;
    left: 0;
    padding: 4px 8px 4px 20px;
    top: 20px;
    content: attr(section-name);
    display: block;
    background-color: #222;
    border-radius: 0 12px 12px 0;
    color: #fff;
    font-size: 20px;
    text-transform: capitalize;
    z-index: 100;
  }
}

.arrow-margin {
  position: absolute;
  width: 6px;
  height: var(--margin);
  right: -12px;
  z-index: 2;

  border-right: dashed 3px;
  border-top: solid 3px;
  border-bottom: solid 3px;

  user-select: none;

  &:hover {
    border-color: #d32f2f;

    &:after {
      background: #d32f2f;
    }
  }

  &:after {
    content: attr(margin);
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translate(0, -50%);
    padding: 4px;
    background: #000;
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 6px;
  }

  &.-top {
    top: 0;
  }

  &.-bottom {
    bottom: 0;
  }

  &.--reverse {
    height: calc(-1 * var(--margin));

    &.-top {
      top: var(--margin);
    }

    &.-bottom {
      bottom: var(--margin);
    }
  }
}
</style>
