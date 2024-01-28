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
  <v-navigation-drawer
    v-model="show_dialog"
    dark
    right
    fixed
    :width="
      $vuetify.display.xl
        ? 560
        : $vuetify.display.lgAndUp
        ? 420
        : 320
    "
    stateless
    hide-overlay
    color="#1e1e1e"
    class="x-page-builder-options-slider"
  >
    <v-card v-if="dialog_pre" class="text-start" flat>
      <!-- ████████████████████ Actions ████████████████████ -->
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn text @click="show_dialog = false" x-large>
            <v-icon class="me-1">close</v-icon
            >{{ $t("global.actions.close") }}</v-btn
          >
        </div>
      </v-card-actions>

      <v-expansion-panels flat v-model="selected_tab">
        <!-- ████████████████████ Animations ████████████████████ -->
        <v-expansion-panel>
          <v-expansion-panel-header>
            <div>
              <v-icon class="me-1" dark>animation</v-icon> Animations

              <v-icon
                right
                v-if="selected_animation?.length"
                x-small
                color="green"
                >lens</v-icon
              >

              <v-chip v-if="selected_animation" label x-small class="mx-1">{{
                getName(selected_animation)
              }}</v-chip>

              <v-chip v-if="animationDuration" label x-small class="mx-1"
                ><v-icon left x-small>timer</v-icon>
                {{ getName(animationDuration) }}</v-chip
              >
              <v-chip v-if="animationDelay" label x-small class="mx-1"
                ><v-icon left x-small>hourglass_empty</v-icon>
                {{ getName(animationDelay) }}</v-chip
              >
              <v-chip v-if="animationIterationCount" label x-small class="mx-1"
                ><v-icon left x-small>loop</v-icon>
                {{ getName(animationIterationCount) }}</v-chip
              >
              <v-chip v-if="animationDirection" label x-small class="mx-1"
                ><v-icon left x-small>multiple_stop</v-icon>
                {{ getName(animationDirection) }}</v-chip
              >
              <v-chip v-if="animationTimingFunction" label x-small class="mx-1"
                ><v-icon left x-small>ssid_chart</v-icon>
                {{ getName(animationTimingFunction) }}</v-chip
              >
              <v-chip v-if="threshold!==null" label x-small class="mx-1" title="Animation start threshold."
              ><v-icon left x-small>network_ping</v-icon>
                {{ threshold }}</v-chip
              >

            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card class="pa-16 mb-4">
              <v-card
                class="mx-auto"
                width="84"
                height="84"
                color="#fafafa"
                :class="selected_animation"
                :style="{
                  animationDuration: animationDuration,
                  animationDelay: animationDelay,
                  animationIterationCount: animationIterationCount,
                  animationDirection: animationDirection,
                  animationTimingFunction: animationTimingFunction,
                }"
              >
              </v-card>
            </v-card>

            <v-expansion-panels class="mb-5">
              <v-expansion-panel>
                <v-expansion-panel-header
                  ><span
                    ><v-icon class="me-1" small>fa:fas fa-cogs</v-icon> Customize
                    animation
                  </span></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <v-row dense>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="animationDuration"
                        label="Duration"
                        dense
                        messages="Ex. 400ms"
                        clearable
                        append-icon="timer"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="animationDelay"
                        label="Delay"
                        dense
                        messages="Ex. 2s"
                        clearable
                        append-icon="hourglass_empty"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-combobox
                        v-model="animationIterationCount"
                        :items="['infinite']"
                        label="Iteration count"
                        messages="Ex. 5"
                        dense
                        clearable
                        append-icon="loop"
                      ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="animationDirection"
                        :items="[
                          'normal',
                          'reverse',
                          'alternate',
                          'alternate-reverse',
                        ]"
                        label="Direction"
                        dense
                        clearable
                        append-icon="multiple_stop"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        v-model="animationTimingFunction"
                        :items="[
                          'linear',
                          'ease',
                          'ease-in',
                          'ease-out',
                          'ease-in-out',
                          'step-start',
                          'step-end',
                        ]"
                        label="Timing function"
                        dense
                        clearable
                        append-icon="ssid_chart"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" >
                      <v-slider v-model="threshold"
                                :step="0.1"
                                :min="0"
                                :max="1"
                                append-icon="network_ping"

                                label="Threshold" messages="The animation start threshold can range from 0 to 1. A threshold of 0 signifies that the animation will commence as soon as the element becomes visible. Conversely, a threshold of 0.5 indicates that the animation will start when 50% of the element comes into the user's view. Default is 0.3."></v-slider>
                    </v-col>

                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>

            <animation-class-selector
              v-model="selected_animation"
            ></animation-class-selector>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- ████████████████████ Hover ████████████████████ -->
        <v-expansion-panel>
          <v-expansion-panel-header>
            <div>
              <v-icon class="me-1" dark>mouse</v-icon> Hover

              <v-icon
                right
                v-if="selected_hover_classes?.length"
                x-small
                color="green"
                >lens</v-icon
              >

              <v-chip
                v-for="it in selected_hover_classes"
                :key="it"
                label
                x-small
                class="mx-1"
                >{{ getName(it) }}</v-chip
              >
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card
              class="pa-16 mb-4 bg-tiny-checkers"
              style="background-color: #ddd"
            >
              <v-card
                class="mx-auto text-center transition-ease-in-out"
                width="120"
                min-height="84"
                color="#fafafa"
                :class="selected_hover_classes"
              >
                <div class="bg-aqua-splash" style="height: 24px">
                  <v-icon small class="m-1">lens</v-icon>
                  <v-icon small class="m-1">lens</v-icon>
                </div>
                <v-icon class="m-3 bg-sunny-morning text-gradient" large
                  >lens</v-icon
                >
              </v-card>
            </v-card>

            <hover-class-selector
              v-model="selected_hover_classes"
              multiple
            ></hover-class-selector>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { ClassesHelper } from "@core/helper/style/Classes";
import AnimationClassSelector from "./widgets/AnimationClassSelector.vue";
import HoverClassSelector from "./widgets/HoverClassSelector.vue";
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import _ from "lodash-es";

export default {
  name: "GlobalAnimationEditorDialog",
  components: {
    HoverClassSelector,
    AnimationClassSelector,
  },

  props: {},
  data: () => ({
    animationClasses: ClassesHelper.AnimationsClasses(),
    hoversClasses: ClassesHelper.HoversClasses(),

    el_style: null,
    el_class: null,
    section: null,
    stylePath: null, // $sectionData.style
    classPath: null, // $sectionData.classes
    options: {},

    // ---------------------------------
    show_dialog: false,
    dialog_pre: false,

    selected_tab: null,

    //--------------------------
    selected_animation: null,

    animationDuration: null,
    animationDelay: null,
    animationIterationCount: null,
    animationDirection: null,
    animationTimingFunction: null,
    threshold:0.5,

    //--------------------------
    selected_hover_classes: [],

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {},

  watch: {
    selected_animation: {
      handler() {
        this.setAnimationDebounced();
      },
      deep: true,
    },

    selected_hover_classes: {
      handler() {
        this.setAnimationDebounced();
      },
      deep: true,
    },

    animationDuration() {
      this.setAnimationDebounced();
    },
    animationDelay() {
      this.setAnimationDebounced();
    },
    animationIterationCount() {
      this.setAnimationDebounced();
    },
    animationDirection() {
      this.setAnimationDebounced();
    },
    animationTimingFunction() {
      this.setAnimationDebounced();
    },
    threshold() {
      this.setAnimationDebounced();
    },
  },
  created() {},
  mounted() {
    this.EventBus.$on(
      "show:GlobalAnimationEditorDialog",

      ({ el_style, el_class, section, stylePath, classPath, options }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el_style = el_style;
        this.el_class = el_class;

        this.section = section;
        this.stylePath = stylePath;
        this.classPath = classPath;

        this.options = options;

        this.showDialog();
      }
    );

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――
    this.key_listener_keydown = (event) => {
      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        if (this.show_dialog) {
          // Close tools
          this.show_dialog = false;
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
    this.EventBus.$on(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.show_dialog = false;
    });
  },
  beforeDestroy() {
    this.EventBus.$off("show:GlobalAnimationEditorDialog");
    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showDialog() {
      this.selected_animation = this.el_class.className
        .split(" ")
        .find((val) => this.animationClasses.includes(val)); // Find first match! (Other remove on the save if exist)

      this.selected_hover_classes = this.el_class.className
        .split(" ")
        .filter((val) => this.hoversClasses.includes(val))
        .unique();

      //console.log('Classes',this.el_class.className,'Animations:',  this.selected_animation ,'Hovers:', this.selected_hover_classes)
      //console.log('Style',this.el_style.style)

      this.animationDuration = this.el_style.style.animationDuration;
      this.animationDelay = this.el_style.style.animationDelay;
      this.animationIterationCount =
        this.el_style.style.animationIterationCount;
      this.animationDirection = this.el_style.style.animationDirection;
      this.animationTimingFunction =
        this.el_style.style.animationTimingFunction;


      let _style = this.section.get(this.stylePath);
      if(_style && (typeof _style.threshold === 'number') ){
        this.threshold=_style.threshold
      }else{
        this.threshold=null
      }


      // console.log("boxShadow ", this.el_style.style.boxShadow);

      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.show_dialog = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },

    //----------------------------------------------------------------------------

    setAnimationDebounced: _.debounce(function () {
      this.setAnimation();
    }, 100),

    setAnimation() {
      if (!this.show_dialog || this.LOCK) return;

      this.el_style.style.animationDuration = this.animationDuration;
      this.el_style.style.animationDelay = this.animationDelay;
      this.el_style.style.animationIterationCount =
        this.animationIterationCount;
      this.el_style.style.animationDirection = this.animationDirection;
      this.el_style.style.animationTimingFunction =
        this.animationTimingFunction;


      if(this.threshold)
      this.el_style.setAttribute('data-threshold',this.threshold)

      // Update only animation properties:
      let style = this.section.get(this.stylePath);
      if (!style) style = {};

      style.animationDuration = this.animationDuration;
      style.animationDelay = this.animationDelay;
      style.animationIterationCount = this.animationIterationCount;
      style.animationDirection = this.animationDirection;
      style.animationTimingFunction = this.animationTimingFunction;


      //  console.log("Style After ->", style);
      style.threshold=this.threshold


      this.section.set(`${this.stylePath}`, style); // Save data in section!

      // ----------------------- Save Custom Classes -----------------------
      let classes = this.section.get(this.classPath);
      if (!classes) classes = [];
      // console.log("classes BEFORE ->", classes);

      const deletes = classes.filter(
        (val) =>
          this.animationClasses.includes(val) ||
          this.hoversClasses.includes(val)
      ); // Delete all animation classes!

      //console.log(" Set classes", "deletes", deletes, "adds", this.selected_animation, this.selected_hover_classes);

      this.el_class.classList.remove(...deletes);

      // 1. Add animation class:
      if (this.selected_animation)
        this.el_class.classList.add(this.selected_animation);

      // 2. Add hover class:
      if (this.selected_hover_classes)
        this.el_class.classList.add(...this.selected_hover_classes);

      // Keep only valid classes:
      classes = classes
        .filter(
          (it) =>
            (!this.animationClasses.includes(it) ||
              it === this.selected_animation) &&
            (!this.hoversClasses.includes(it) ||
              this.selected_hover_classes.includes(it))
        )
        .unique();

      // 1. Add animation class:
      if (this.selected_animation) classes.push(this.selected_animation);
      // 2. Add hover class:
      classes.push(...this.selected_hover_classes);

      //console.log("classes AFTER ->", classes);
      this.section.set(this.classPath, classes); // Save data in section!

      //console.log('this.section.get("$sectionData.classes")',this.section.get("$sectionData.classes"))

      /// this.show_dialog = false;
    },
  },
};
</script>

<style scoped lang="scss"></style>
