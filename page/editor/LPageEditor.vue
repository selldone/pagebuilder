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
  <div
    v-scroll="onScroll"
    class="page-builder position-relative"
    data-gramm="false"
    spellcheck="false"
    style="min-height: 60vh"
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
      @mouseup="$builder.isEditing ? onSaveHistory() : undefined"
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
            :page="page"
            :fullscreen="!scale_down"
            @click:full-screen="toggleListVisibility"
            :shop="shop"
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
          <v-locale-provider :rtl="page?.direction === 'rtl'">
            <div
              :class="{
                'drop-active':
                  !$builder.sections.length && past_hover_index === 0,
              }"
              :style="[
                {
                  '--bg-color':
                    builder.style && builder.style.bg_color
                      ? builder.style.bg_color
                      : '#fff',
                  fontFamily:
                    builder.style && builder.style.font
                      ? builder.style.font
                      : undefined,
                },
                {
                  '--background': builder.style?.bg_color
                    ? builder.style.bg_color
                    : '#fff' /*IMPORTANT! Used by shop dynamic css. e.g. fade scrolls*/,
                },
              ]"
              class="page-content-wrap-editor position-relative"
              :dir="page ? page.direction : 'auto'"
            >
              <!-- Important: set key and wrap with div to prevent loss proper for dragging elements -->
              <div key="header-demo" class="usn pen">
                <slot name="header" :builder="builder"></slot>
              </div>

              <div
                ref="pagecontent"
                :class="{ 'min-height-80vh': $builder.isEditing }"
                :style="[
                  PageBuilderTypoHelper.GenerateTypoStyle(builder.style),
                  PageBuilderColorsHelper.GenerateColorsStyle(builder.style),
                ]"
                class="page-content"
                @click="handleClickOnSections"
                @dragleave="
                  (e) => (!$builder.isEditing ? undefined : leaveDrag(e))
                "
                @dragover="
                  (e) =>
                    !$builder.isEditing || $builder.sections.length
                      ? undefined
                      : allowDropSection(e, 0)
                "
                @drop="
                  (e) =>
                    !$builder.isEditing || $builder.sections.length
                      ? undefined
                      : dropSection(e, 0)
                "
              >
                <template
                  v-for="(section, index) in $builder.sections"
                  :key="section.uid"
                >
                  <div class="position-relative">
                    <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Margin Arrows - Start ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
                    <div
                      v-if="
                        $builder.isEditing && section.object?.style?.marginTop
                      "
                      :class="{
                        '--reverse':
                          parseInt(section.object.style.marginTop) < 0,
                      }"
                      :margin="section.object.style.marginTop"
                      :style="{ '--margin': section.object.style.marginTop }"
                      class="arrow-margin -top"
                      title="Top Margin"
                      @mousedown.prevent
                    ></div>
                    <div
                      v-if="
                        $builder.isEditing &&
                        section.object?.style?.marginBottom
                      "
                      :class="{
                        '--reverse':
                          parseInt(section.object.style.marginBottom) < 0,
                      }"
                      :margin="section.object.style.marginBottom"
                      :style="{ '--margin': section.object.style.marginBottom }"
                      class="arrow-margin -bottom"
                      title="Bottom Margin"
                      @mousedown.prevent
                    ></div>
                    <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Margin Arrows - End ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->

                    <div
                      :class="{
                        'cursor-pipette':
                          $builder.cloneStyle && !$builder.cloneObject,
                        'cursor-bucket':
                          $builder.cloneStyle && $builder.cloneObject,

                        'show-name': listShown && inEditMode,
                      }"
                      :section-name="section.label"
                      class="position-relative d-flex flex-column target-drop"
                      @dragover="
                        (e) =>
                          !$builder.isEditing
                            ? undefined
                            : allowDropSection(e, index)
                      "
                      @drop="
                        (e) =>
                          !$builder.isEditing
                            ? undefined
                            : dropSection(e, index)
                      "
                    >
                      <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ 🪂 Section Component - Start 🪂 ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
                      <x-component
                        v-if="delay_load > index"
                        :object="section.object"
                        :augment="null"
                        :id="section.uid"
                        :section="section"
                        :ref="'SECTION_' + section.uid"
                        :class="{
                          'move-courser block-pointer-event':
                            $builder.isSorting,

                          'ignore-elements': !$builder.isSorting,
                          pen: drop_section,
                          'hover-z-10': $builder.isEditing,
                        }"
                      />
                      <div
                        v-else
                        class="d-flex align-center justify-center"
                        style="height: 400px"
                      >
                        <v-progress-circular
                          indeterminate
                          size="84"
                        ></v-progress-circular>
                      </div>
                    </div>

                    <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Copy & Past Section - Start ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
                    <s-landing-section-side-bar
                      v-if="listShown && inEditMode"
                      v-model:past-hover-index="past_hover_index"
                      :copy-section="copy_section"
                      :section="section"
                      :section-index="index"
                      @click:copy="copySection(section)"
                      @click:delete="deleteSection(section)"
                      @click:save="saveSectionToRepository(section)"
                      @click:past="pastSection(index + 1)"
                    ></s-landing-section-side-bar>
                    <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Copy & Past Section - End ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->

                    <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Side Section Buttons - Start ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
                    <l-page-editor-artboard-side-extended
                      :hasNote="has_note"
                      :aiAutoFillFunction="aiAutoFillFunction"
                      @click:note="showWriteNote(section)"
                      @click:feeder="showFeeder(section)"
                    ></l-page-editor-artboard-side-extended>
                    <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Side Section Buttons - End ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->

                    <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Notes - Start ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
                    <p-note-digest
                      v-if="$vuetify.display.lgAndUp && has_note"
                      :limit="2"
                      :notes="
                        notes?.filter((n) => n.element_id === section.uid)
                      "
                      :page="shop_page"
                      :popup="shop_popup"
                      :shop="shop"
                      :style="{ width: '400px', right: '-600px' }"
                      class="position-absolute"
                      hover-able
                      style="top: 50px"
                      @delete="(id) => DeleteItemByID(page.notes, id)"
                    ></p-note-digest>
                    <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Notes - End ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
                  </div>
                  <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Past & Drop Expanding Bar ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
                  <v-expand-transition>
                    <div
                      v-if="past_hover_index === index && drop_section"
                      class="bg-lily-meadow typo-body d-flex flex-column align-center justify-center"
                      style="height: 84px"
                    >
                      Will add here
                    </div>
                    <div
                      v-else-if="past_hover_index === index"
                      class="bg-blue-soft d-flex align-center justify-center"
                      style="height: 84px"
                    >
                      Past section here!
                    </div>
                  </v-expand-transition>
                </template>
              </div>
            </div>
          </v-locale-provider>
        </div>
      </div>
    </div>

    <!-- ――――――――――――――――――――――  Repository ―――――――――――――――――――― -->

    <l-page-editor-repository
      v-if="inEditMode && !show_templates"
      :scale-down-mode="scale_down"
    >
    </l-page-editor-repository>

    <!-- ――――――――――――――――――――――  Feeder ―――――――――――――――――――― -->
    <l-feeder-dialog
      v-if="selected_section && selected_component"
      v-model="dialog_feeder"
      :section="selected_section"
      :section-component="selected_component"
    ></l-feeder-dialog>

    <!-- ――――――――――――――  Hierarchy / Sections / Elements / ... ―――――――――――――― -->

    <l-page-editor-side-menu
      v-if="!show_templates"
      :is-visible="listShown && inEditMode"
      :is-scroll-down="scrollTop > 200"
    ></l-page-editor-side-menu>

    <!-- ――――――――――――――――――――――  Settings ―――――――――――――――――――― -->
    <l-settings></l-settings>
  </div>
</template>

<script>
import Sortable from "sortablejs";

import { LUtilsBackground } from "../../utils/background/LUtilsBackground";
import LPageEditorRepository from "@selldone/page-builder/page/editor/repository/LPageEditorRepository.vue";
import LFeederDialog from "../../components/feeder/dialog/LFeederDialog.vue";
import { LUtilsTypo } from "../../utils/typo/LUtilsTypo";
import { LUtilsColors } from "../../utils/colors/LUtilsColors";
import PNoteDigest from "../../components/note/digest/PNoteDigest.vue";
import LTemplatesList from "../../components/templates/list/LTemplatesList.vue";
import LEventsName from "../../mixins/events/name/LEventsName";
import { LUtilsHighlight } from "../../utils/highligh/LUtilsHighlight";
import _ from "lodash-es";
import { LMixinNote } from "../../mixins/note/LMixinNote";
import { LMixinHistory } from "../../mixins/history/LMixinHistory";
import { defineComponent, provide } from "vue";
import { LUtilsMigration } from "../../utils/migration/LUtilsMigration";
import { FontLoader } from "@selldone/core-js/helper/font/FontLoader";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import Builder from "../../Builder.ts";
import { LUtilsFont } from "../../utils/font/LUtilsFont";
import { LandingCssHelper } from "@selldone/page-builder/page/editor/css/LandingCssHelper";
import LPageEditorSideMenu from "@selldone/page-builder/page/editor/side-menu/LPageEditorSideMenu.vue";
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";
import LSettings from "@selldone/page-builder/settings/LSettings.vue";
import SLandingSectionSideBar from "@selldone/page-builder/components/section/side-bar/SLandingSectionSideBar.vue";
import LPageEditorArtboardTopBar from "@selldone/page-builder/page/editor/artboard/top-bar/LPageEditorArtboardTopBar.vue";
import LPageEditorArtboardSideExtended from "@selldone/page-builder/page/editor/artboard/side-extended/LPageEditorArtboardSideExtended.vue";
import LPageEditorArtboardViewMode from "@selldone/page-builder/page/editor/artboard/view-mode/LPageEditorArtboardViewMode.vue";
import { LUtilsLoader } from "@selldone/page-builder/utils/loader/LUtilsLoader.ts";

const DEBUG = false;
export default defineComponent({
  name: "LPageEditor",
  mixins: [LMixinNote, LMixinEvents, LMixinHistory],
  components: {
    LPageEditorArtboardViewMode,
    LPageEditorArtboardSideExtended,
    LPageEditorArtboardTopBar,
    SLandingSectionSideBar,
    LSettings,
    XComponent,
    LPageEditorSideMenu,

    LTemplatesList,
    PNoteDigest,

    LFeederDialog,
    LPageEditorRepository,
  },
  emits: ["update:preview", "changeMode", "scale", "saved", "load:template"],
  props: {
    showIntro: {
      type: Boolean,
      default: true,
    },
    initialPageData: {
      type: Object,
      default: () => ({
        title: "",
        sections: [],
      }),
    },
    initialPageCss: {
      type: Object,
    },

    hasSettingButton: {
      type: Boolean,
      default: false,
    },

    device: {
      default: "desktop", // desktop   tablet   mobile
    },
    page: {},

    shop: {
      required: false,
      type: Object,
    },

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
  },
  data() {
    return {
      lastCursorY: 0,
      PageBuilderTypoHelper: LUtilsTypo,
      PageBuilderColorsHelper: LUtilsColors,

      //----------------------------

      delay_load: 0,
      //----------------------------
      title: null,
      listShown: false,
      components: this.getComponents(),
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
      selected_section: null,
      selected_component: null,

      dialog_feeder: false,

      loading_ai: [],

      //-------------------

      drop_section: false, // Indicate that pre-built section drag over

      //-------------------

      past_hover_index: null,
      onPast: null,

      copy_section: null,
    };
  },

  computed: {
    /**
     * External function call. (don't change it!)
     *
     * @constructor
     */
    CUSTOM_PAGE_STYLE() {
      if (!this.builder.style) return null; // Fix bugs

      return LUtilsBackground.CreateCompleteBackgroundStyleObject(
        this.builder.style.bg_custom,
        this.builder.style.bg_gradient,
        this.builder.style.bg_image
          ? this.getShopImagePath(this.builder.style.bg_image)
          : null,
        this.builder.style.bg_size,
        this.builder.style.bg_repeat,
        this.builder.style.bg_color,
        this.builder.style.dark,
        this.builder.style.bg_position,
        this.builder.style.bg_rotation,
        null,
      );
    },

    show_templates() {
      return this.showIntro && !this.$builder.sections.length;
    },

    load_percent() {
      return (100 * this.delay_load) / this.sections_length;
    },
    is_loading_sections() {
      return this.sections_length && this.load_percent < 100;
    },
    shop_page() {
      return this.shop && !this.isMenu && !this.isPopup ? this.page : null;
    },
    shop_popup() {
      return this.shop && !this.isMenu && this.isPopup ? this.page : null;
    },
    shop_menu() {
      return this.shop && this.isMenu && !this.isPopup ? this.page : null;
    },

    has_note() {
      return this.shop_page || this.shop_popup;
    },

    scale_down() {
      return this.$builder.isSorting || this.listShown;
    },

    base_url() {
      return this.shop
        ? `${this.getShopMainUrl(this.shop)}/pages/`
        : `${this.SetupService.MainServiceUrl()}/`;
    },

    in_design_mode() {
      return !this.$builder.isAnimation && !this.$builder.isTracking;
    },

    sections_length() {
      return this.$builder.sections && this.$builder.sections.length;
    },

    notes() {
      return this.page?.notes;
    },

    /**
     * Compiled CSS
     * @return {*}
     */
    custom_css() {
      return this.page?.css;
    },
  },

  watch: {
    "$route.query.element_id"(element_id) {
      this.autoShowNote();
    },
    page() {
      this.autoShowNote();
      this.setModelInBuilder();
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
      LandingCssHelper.Inject(css /*Css*/, this.$refs.pagecontent);
      this.$builder.css = css; // Update builder pre compiled css
    },

    scale_down(scale_down) {
      this.calcMaxH();
      this.$emit("scale", scale_down ? 0.5 : 1);
    },

    inEditMode(val) {
      this.$emit("changeMode", val);
    },
    /*
        sections_length(val) {
          if (val > 0 && this.delay_load < 999)
            // loaded any section?
            this.loadNextDelayed();
        },*/
  },

  beforeCreate() {
    // Initialize builder
    const builder = Builder.newInstance();
    provide("$builder", builder);
    this.$builder = builder;
  },

  created() {
    // sets the initial data.
    this.setPage(this.initialPageData, this.initialPageCss, false);
    this.setModelInBuilder();
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

      onAdd(evt) {
        try {
          const seed = evt.item._dragData;
         // console.log("Drop seed", seed, "Event item", evt.item);

          if (seed) {
            const json=JSON.parse(seed);
            const object = LUtilsLoader.JsonObjectToInstance(
                json  .object
            );
const instance={object:object,label:json.label}
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

        console.log("sortable : onUpdate");
        _self.onSaveHistory();
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
        this.submit();
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

        const scaleDown = !this.listShown; // Determine if we need to scale down or up

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
        this.toggleListVisibility();

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
        if (this.inActiveEditingMode()) this.goUndo();
      } else if ((event.ctrlKey || event.metaKey) && event.code === "KeyY") {
        if (this.inActiveEditingMode()) this.goRedo();
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
      if (!this.page?.id) return; // Only emit changes if page exists!

      const _page = {
        title: this.title,
        image: this.page.image,
        name: this.page.name,
        direction: this.page.direction,
        color: this.page.color,
        content: {
          title: this.title,
          sections: sections.map((s) => ({
            name: s.name,
            data: s.data,
          })),
          style: this.builder.style,
        },
        css: this.page.css,
      };
      this.$emit("update:preview", _page);
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
          this.copy_section = paste;

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

    //――――――――――――――――――――――  Copy Section ――――――――――――――――――――

    copySection(section) {
      this.copy_section = JSON.stringify(section.toJson()); //TODO: V1 !CHECK!
      this.copyToClipboard(
        this.copy_section,
        "Copy Section Data & Structure",
        `The section has been successfully copied to the clipboard. You can paste it onto other pages.`,
      );
    },
    saveSectionToRepository(section) {
      const _section = JSON.stringify(section.toJson()); //TODO: V2 Check
      EventBus.$emit("show:LPageEditorElementsRepository:Add-My-Section", {
        section: _section,
      });
    },

    //――――――――――――――――――――――  Past Section ――――――――――――――――――――

    pastSection(index) {
      if (!this.copy_section) {
        this.showWarningAlert(
          "First copy a section!",
          "Data on clipboard not found!",
        );

        return;
      }

      try {
        let section = JSON.parse(this.copy_section);
        if (section.object) {
          this.builder.add(section, index, true);
          this.onSaveHistory();
          this.autoLoadSectionFonts(section);
          return;
        }
      } catch (e) {
        console.error(e);
      }

      this.showWarningAlert("Invalid", "Clipboard data has invalid structure!");
    },

    //――――――――――――――――――――――  Delete Section ――――――――――――――――――――

    deleteSection(section) {
      try {
        this.builder.remove(section);
        this.onSaveHistory();
      } catch (e) {
        console.error(e);
        this.showErrorAlert(
          null,
          "We can not remove this section! Maybe fix it by refreshing the page.",
        );
      }
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
      // Are we the other tab?
      if (!this.isElementVisible(this.$el)) {
        return false;
      }
      // Check dialog open then prevent any undo / redo short key!
      if ($(".v-dialog__content.v-dialog__content--active").length) {
        // The element exists
        return false;
      }
      return true;
    },
    isElementVisible(element) {
      var rect = element.getBoundingClientRect();
      return rect.height > 0;
    },

    //-----------------------------------

    calcMaxH() {
      //console.log('calcMaxH',this.max_h)
      if (this.scale_down) {
        let height = this.$refs.artboard?.clientHeight;
        this.max_h = 120 + height / 2 + "px"; //height/2 + 'px'; // problem in add new element
      } else {
        this.max_h = "unset";
      }
    },
    getJson() {
      const content = this.$builder.export();
      this.checkHealth(content);
      return content;
    },

    //-----------------------------------

    checkHealth(content) {
      const t = this;

      function checking(obj) {
        for (let key of Object.keys(obj)) {
          const val = obj[key];

          if (
            !val ||
            key === "iframe" ||
            key === "html" /**@see LSectionHtml**/
          )
            continue; // Not change iframe!

          if (t.isString(val)) {
            // Purify if past from word:
            if (val.includes("<!" + "--")) {
              // Remove comments:
              let corrected = val.replace(/<!--.*?-->/gs, "");
              // Remove classes:
              corrected = corrected.replace(/class=".*?"/gs, "");

              /* console.error(
                      "FAULT DETECTION ->",
                      key + " -> " + val,
                      "Corrected",
                      corrected
              );*/
              obj[key] = corrected;
            }
          } else if (Array.isArray(val)) {
            // Array:
            checking(val);
          } else if (typeof val === "object" && val !== null) {
            // Object:
            checking(val);
          }
        }
      }

      // Check all values:
      checking(content);
    },

    /*  newSection() {
     // add the section immediately if none are present.
  if (this.components.length === 1) {
       this.addSection(this.components[0]);
       return;
     }
     this.toggleListVisibility();
   },*/
    addSection(section, position) {
      //console.log("addSection", section, "position", position);

      this.$builder.add(section, position, true);

      this.onSaveHistory();
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

    loadRawTemplate(theme) {
      console.log("Page buildr | Load raw template", theme);
      this.setPage(theme, null, true);

      this.$emit("load:template", { content: this.getJson(), image: null }); // Simulate like landing page template files!
    },

    loadPageTemplate(page) {
      this.setPage(page.content, page.css, false);

      //update random title:
      const title = "Landing-" + Math.random().toString(36).substring(7);
      page.content.title = title;

      this.$emit("load:template", page);
    },

    /**
     * IMPORTANT: Externally call this function to set page builder content.
     * @param content
     * @param css
     * @param from_theme
     */
    setPage(content, css, from_theme = false) {
      this.delay_load = 0;

      console.style("<b>📐 Set page builder content.</b>", content, from_theme);

      // ---------------------------------------*******************-------------------------------------
      // 🌼 Set style if not exist:
      if (!content.style || Array.isArray(content.style))
        content.style = { font_size: 16, bg_color: "", fonts: [] };

      if (!content.style.font_size) content.style.font_size = 16;
      if (!content.style.bg_color) content.style.bg_color = "";
      if (!content.style.bg_gradient) content.style.bg_gradient = [];
      if (!content.style.bg_size) content.style.bg_size = "cover";
      if (!content.style.bg_custom) content.style.bg_custom = null;
      if (!content.style.bg_repeat) content.style.bg_repeat = null;

      // Set initial fonts size:
      if (!this.isValidFontSize(content.style.h1_size))
        content.style.h1_size = LUtilsTypo.H1_SIZE_DEFAULT;
      if (!this.isValidFontSize(content.style.h2_size))
        content.style.h2_size = LUtilsTypo.H2_SIZE_DEFAULT;
      if (!this.isValidFontSize(content.style.h3_size))
        content.style.h3_size = LUtilsTypo.H3_SIZE_DEFAULT;
      if (!this.isValidFontSize(content.style.h4_size))
        content.style.h4_size = LUtilsTypo.H4_SIZE_DEFAULT;
      if (!this.isValidFontSize(content.style.h5_size))
        content.style.h5_size = LUtilsTypo.H5_SIZE_DEFAULT;
      if (!this.isValidFontSize(content.style.h6_size))
        content.style.h6_size = LUtilsTypo.H6_SIZE_DEFAULT;
      if (!this.isValidFontSize(content.style.p_size))
        content.style.p_size = LUtilsTypo.P_SIZE_DEFAULT;

      // ---------------------------------------*******************-------------------------------------

      // 🩴 Inject custom css:
      LandingCssHelper.Inject(css /*Custom Css*/, this.$refs.pagecontent);

      this.inEditMode = true;
      this.$builder.setContent(content);

      this.loadNextDelayed();

      if (!from_theme) {
        // Save initial state: (Call after set!)
        this.onSaveHistory();
      }
    },

    isValidFontSize(size) {
      return size && this.isString(size) && !size.includes("-") && size !== "0";
    },

    toggleSort() {
      // BUG: when in sort mode drop new section that section can't be edited!
      if (!this.$builder.isSorting && this.listShown)
        this.toggleListVisibility();

      this.$builder.isSorting = !this.$builder.isSorting;
      this.$builder.isEditing = !this.$builder.isSorting;
      if (!this.$builder.isSorting && this.sortable) {
        this.sortable.option("sort", false);
        this.sortable.option("disabled", true);

        return;
      }
      this.sortable.option("disabled", false);
      this.sortable.option("sort", true);
    },

    /**
     * Hide add buttons and empty texts
     */
    toggleHideExtra() {
      this.$builder.isHideExtra = !this.$builder.isHideExtra;
    },

    /**
     * Important: Externally called!
     */
    toggleListVisibility() {
      // BUG: when in sort mode drop new section that section can't be edited!
      if (!this.listShown && this.$builder.isSorting) this.toggleSort();

      this.listShown = !this.listShown;
      this.sortable.option("disabled", !this.listShown);
    },
    showList() {
      this.listShown = true;
      this.sortable.option("disabled", false);
    },

    submit() {
      this.$emit("saved", this.$builder);
    },

    getComponents() {
      return Object.entries(this.$builder.components).map(
        ([originalName, component]) => {
          const name = LUtilsMigration.MigrateSectionName(originalName);
          return {
            name: name,
            group: component.group,
            cover: component.cover,
            label: component.label,
            help: component.help,
            schema: component.$schema,
          };
        },
      );
    },

    onScroll(e) {
      this.scrollTop = document.documentElement.scrollTop;
    },

    //――――――――――――――――――――――  Drop section (pre-built) ――――――――――――――――――――
    dropSection(event, index) {
      // console.log('dropSection!' ,event)

      const text = event.dataTransfer.getData("section");

      if (text)
        try {
          const json = JSON.parse(text);

          if (json?.object /*V2*/ || json?.data /*V1*/) {
            event.preventDefault();
            // console.log("added!");
            this.$builder.add(json, index + 1, true);
            this.autoLoadSectionFonts(json);
          }
        } catch (e) {
          this.showErrorAlert(null, e);
        }
      this.past_hover_index = null;
      this.drop_section = false;

      this.onSaveHistory();
    },
    allowDropSection(event, index, allowed_class) {
      // Tips:  getData("section") not available on drag over event in chrome , edge ,... security!
      const types = event.dataTransfer.types;
      //  console.log('allowDropSection!' ,types)

      if (types.includes("section")) {
        // console.log('allowDropSection' ,this.past_hover_index,index)
        event.preventDefault();
        this.past_hover_index = index;
        this.drop_section = true;
        return true;
      }
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

    showFeeder(section) {
      this.selected_section = section;
      this.selected_component = this.$refs[`SECTION_${section.uid}`][0]; // v-for return refs in array!
      this.dialog_feeder = true;
    },

    showWriteNote(section) {
      if (!section) return;

      this.showGlobalShopNoteDialog(
        this.page.notes,
        section.uid,
        this.shop_page?.id,
        this.shop_popup?.id,
      );
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

    setModelInBuilder() {
      const model_type = this.isPopup ? "popup" : this.isMenu ? "menu" : "page";
      this.$builder.setModel(model_type, this.page); // Link model (pass to generate upload urls)
    },

    handleClickOnSections(event) {
      if (!LUtilsHighlight.IsChildOfHighlightActiveEditing(event.target))
        EventBus.$emit(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);
    },

    //――――――――――――――――――――――  Load Fonts ――――――――――――――――――――

    autoLoadSectionFonts(json) {
      const builder = this.builder;
      try {
        this.fonts = LUtilsFont.FindAllFontsInSection(json);

        if (DEBUG) console.log("Fonts ---->", this.fonts);

        if (!builder.style) builder.style = {};

        if (!builder.style.fonts || !Array.isArray(builder.style.fonts))
          builder.style.fonts = [];

        console.log("👢 builder.style ---->", builder.style);
        console.log("👢 this.fonts ---->", this.fonts);

        this.fonts.forEach((font) => {
          if (!builder.style.fonts.includes(font)) {
            builder.style.fonts.push(font);
            this.showSuccessAlert(
              "Font : " + font,
              "Font has been added successfully.",
            );
          }
        });

        // Load fonts:
        FontLoader.LoadFonts(this.fonts);
      } catch (e) {
        console.error(e);
      }
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

::v-deep(.sortable-ghost) {
  .fmenu-elementImage {
    width: 100%;
    height: auto;
    background: #1976d2;
  }
}

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

.controller {
  box-sizing: border-box;

  &-panel {
    position: fixed;
    z-index: 200;
    bottom: 30px;
    right: 40px;
  }

  &-input {
    outline: none;
    border: 1px solid $gray;
    padding: 0.5em 1em;
    margin: 20px 0;
    border-radius: 40px;
    width: 100%;
    font-size: 16px;
    max-width: 500px;

    &:focus {
      border-color: $blue;
      box-shadow: 0 0 0 2px rgba($blue, 50%);
    }
  }

  &-button {
    transition: 0.2s;
    border: none;
    outline: none;
    border-radius: 20px;
    padding: 5px;
    color: $white;
    fill: $white;
    font-size: 16px;

    svg {
      transition: 0.2s;
    }

    &:not(:last-child) {
      margin-right: 20px;
    }

    &.is-rotated > svg {
      transform: rotate(45deg);
    }

    &.is-blue {
      background-color: $blue;

      &:hover {
        background-color: darken($blue, 20%);
      }
    }

    &.is-red {
      background-color: $red;

      &:hover {
        background-color: darken($red, 20%);
      }
    }

    &.is-green {
      background-color: $green;

      &:hover {
        background-color: darken($green, 20%);
      }
    }

    &.is-dark {
      background-color: $dark;

      &:hover {
        background-color: darken($dark, 20%);
      }
    }

    &.is-gray {
      background-color: $gray;

      &:hover {
        background-color: darken($gray, 20%);
      }
    }
  }

  &-intro {
    width: 100%;
    max-width: 1620px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 70px 50px;
    text-align: center;
    font-size: 30px;
    color: $dark;
  }
}

.sortable-ghost {
  background-color: #0c91d3;
  opacity: 0.9;
  height: max-content;
  box-shadow: 0 0 2px 1px $blue;
}

.is-editable {
  &:hover {
    //box-shadow: inset 0 0 0 2px $gray;
  }
}

.controller-panel {
  background-color: #353e45;
  border-radius: 24px;
  box-shadow: 5px 10px 10px 0px rgba(0, 0, 0, 0.3);
  transition: all 0.65s;

  &:hover {
    box-shadow: 8px 15px 10px 0px rgba(0, 0, 0, 0.3);

    transition: all 0.5s;
  }

  //  padding: 8px 16px 24px 16px;
  padding: 0;

  .button-item {
    margin: 8px 16px 24px 16px;
  }
}

label {
  margin: 12px 0 0 0;
  font-size: 1.2rem;
}

.widget-hover {
  transition: all 0.65s;
  min-height: 100px;
  box-shadow: none;

  &:hover {
    box-shadow: 0px 10px 50px 0px rgba(0, 0, 0, 0.2);
    transition: all 0.5s;
  }
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
    font-size: 12px;
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

.x-feeder {
  display: flex;
  align-items: center;

  position: absolute;
  left: -360px;
  top: 100px;
  flex-direction: row-reverse;

  --margin-left-bar: -80px;

  &:before {
    content: "";
    height: 4px;
    background: #0d0d0d;
    width: 280px;
    margin-left: var(--margin-left-bar);
    pointer-events: none;
  }

  &.-single {
    --margin-left-bar: -8px;
  }

  &.-double {
    --margin-left-bar: -100px;
  }

  &.-triple {
    --margin-left-bar: -175px;
  }

  .x-feeder-btn {
    background: #0d0d0d;
    border-radius: 50%;
    position: relative;
    z-index: 1;

    .v-icon {
      transition: all 0.3s;
    }

    &:hover {
      .v-icon {
        transform: rotate(120deg);
      }
    }
  }
}

//-------------------- Inline editor menus -----------------------
.inline-editor-sheet {
  background-color: #225082 !important;
  margin: 8px;
  padding: 8px;
  border-radius: 8px;
  text-align: center;
}

.in-scale-down {
  .inline-editor-sheet {
    button.v-btn--outlined {
      border-width: 4px !important; // Fix outline bad show in scale down mode!
    }
  }
}
</style>
