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
  <div
    v-if="builder.isEditing"
    :caption="type"
    :class="[
      {
        'is-visible':
          isVisible && (normal_mode || tracking_mode || animation_mode),
      },
      `-type-${type}`,
    ]"
    :style="[
      PageBuilderColorsHelper.GenerateColorsStyle(builder.style),
      {
        '--dot-color':
          type === 'button' || type === 'text'
            ? '#455A64'
            : type === 'row' || type === 'grid' || type === 'buttons-row'
              ? '#8BC34A'
              : type === 'container' || type === 'blogs' || type === 'marquee'
                ? '#FFA000'
                : type === 'column'
                  ? '#1976D2'
                  : type === 'products' || type === 'code'
                    ? '#C2185B'
                    : type === 'form'
                      ? '#3F51B5'
                      : type === 'input'
                        ? '#03A9F4'
                        : type === 'swiper'
                          ? '#E91E63'
                          : type === 'section'
                            ? '#673AB7'
                            : '#fff',
      },
    ]"
    class="styler -dot"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    @click.stop=""
  >
    <!-- Important: Display non because of preventing proper error -->

    <slot v-if="normal_mode"></slot>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――― Animation tools ―――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul v-if="animation_mode" class="styler-list">
      <!-- ―――――――――――――――――― Delete button / col ―――――――――――――――――― -->
      <!-- Available for: section / column -->
      <li>
        <button class="styler-button" @click="showAnimationEdit">
          <v-icon size="20">movie_filter</v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black text-white text-start"
            location="bottom"
            max-width="360"
          >
            Animation
          </v-tooltip>
        </button>
      </li>

      <v-chip
        v-for="a in animations"
        :Key="a"
        class="me-2"
        color="blue"
        label
        prepend-icon="animation"
        size="x-small"
      >
        {{ a }}
      </v-chip>
      <v-chip
        v-for="h in hovers"
        :Key="h"
        class="me-2"
        color="amber"
        label
        prepend-icon="mouse"
        size="x-small"
      >
        {{ h }}
      </v-chip>
      <v-chip
        v-if="threshold"
        class="me-2"
        color="fff"
        label
        prepend-icon="bolt"
        size="x-small"
        >Threshold: <b class="mx-1">{{ threshold * 100 }}%</b></v-chip
      >
    </ul>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――― Tracking tools ―――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul v-if="tracking_mode" class="styler-list">
      <!-- ―――――――――――――――――― Delete button / col ―――――――――――――――――― -->
      <!-- Available for: section / column -->
      <li v-if="!element_id">
        <button class="styler-button fadeIn" @click="enableTrackingCode()">
          <v-icon size="20">gps_fixed</v-icon>

          <v-tooltip
            activator="parent"
            content-class="bg-black text-white text-start"
            location="bottom"
            max-width="360"
          >
            Add ID
            <div class="small">
              You can use this ID to track this element with Google Analytics or
              other tracking tools.
            </div>
          </v-tooltip>
        </button>
      </li>

      <v-text-field
        v-if="element_id"
        v-model="element_id"
        bg-color="#111"
        class="min-width-200"
        clear-icon="location_disabled"
        clearable
        flat
        hide-details
        label="ID"
        rounded
        single-line
        variant="solo"
        @blur="setId(element_id)"
        @click:clear="setId(null)"
      ></v-text-field>
    </ul>
  </div>
</template>

<script lang="ts">
import { LUtilsColors } from "../../utils/colors/LUtilsColors";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import { LUtilsClasses } from "../../utils/classes/LUtilsClasses";
import { CONSOLE } from "@selldone/core-js/helper";

export default {
  name: "SStylerTemplate",

  mixins: [LMixinEvents],

  components: {},
  props: {
    builder: {
      // type: Object,
      required: true,
    },
    target: {
      required: true,
      type: Object,
    },

    el: {
      // type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },

    section: {
      type: Object,
      required: true,
    },
    isVisible: Boolean,
    hasAnimation: Boolean,
    hasTracking: Boolean,
  },
  data: () => ({
    PageBuilderColorsHelper: LUtilsColors,

    element_id: null,
  }),

  computed: {
    normal_mode() {
      return !this.builder.isAnimation && !this.builder.isTracking;
    },
    tracking_mode() {
      return this.builder.isTracking && this.hasTracking;
    },
    animation_mode() {
      return this.builder.isAnimation && this.hasAnimation;
    },

    animations() {
      return LUtilsClasses.GetAnimations(this.target.classes);
    },
    hovers() {
      return LUtilsClasses.GetHovers(this.target.classes);
    },
    threshold() {
      return LUtilsClasses.GetThreshold(this.target.style);
    },
  },
  watch: {},
  created() {
    // Get element ID:
    this.element_id = this.el.id;
  },
  mounted() {},
  beforeUnmount() {},
  methods: {
    //----------------------------------------------------------------------------

    showAnimationEdit() {
      if (this.type === "section") {
        this.ShowLSettingsAnimation(
          this.el,
          this.el,
          this.target,
          `style`,
          `classes`,
        );
      } else if (this.type === "column") {
        this.ShowLSettingsAnimation(
          this.el,
          this.el,
          this.target,
          `style`,
          `classes`,
        );
      }
    },

    //----------------------------------------------------------------------------
    enableTrackingCode() {
      this.element_id = "tracking-" + Math.random().toString(36).substring(7);
      this.setId(this.element_id);
    },
    setId(id) {
      if (id && $(`#${id}`).length) {
        CONSOLE.log("Duplicate ID!");
        return;
      }

      this.el.id = id ? id : "";
      this.target.id = id;
    },

    //――――――――――――――――――――――  Mouse Events ――――――――――――――――――――

    mouseenter() {
      if (!this.el.classList.contains("highlight-blueprint")) {
        this.el.classList.add("highlight-blueprint");
      }
    },
    mouseleave() {
      // Reset
      this.el.classList.remove("highlight-blueprint");
    },
  },
};
</script>

<style lang="scss">
$dark: #323c47;
$white: #fff;
$red: #ff3d3d;

.styler {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999 !important;
  display: none;
  visibility: hidden;
  opacity: 0;
  margin: 10px 0;
  padding: 5px;
  background: $dark;
  border-radius: 26px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(32, 38, 46, 0.79) 1px 1px 4px 1px;
  border: #20262e solid thin;

  &-list {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0 !important;
    color: #fff;

    .v-divider {
      border-color: #aaa;
      opacity: 0.4;
    }
  }

  &-input {
    background: $white;
    color: $dark;
    border: 0;
    outline: 0;
    width: 40px;
    height: 40px;
    border-radius: 42px;
    margin: 0 5px 0 0;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    appearance: none;
  }

  &-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 0;
    background: $dark;
    border: 0;
    fill: $white;
    color: $white;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    margin: 0 5px 0 0;

    &:hover {
      background: darken($dark, 20%);
    }

    &:first-child {
      margin-left: 5px;
    }

    &.selected {
      background: darken($dark, 40%);
    }
  }

  &-selector {
    margin: 0 5px;
  }

  &.is-visible {
    visibility: visible;
    opacity: 1;
    display: flex;
  }

  .input-group {
    margin: 5px;
  }
}

.align {
  @extend .styler-list;
  min-height: 42px;
  flex-wrap: wrap;
  max-width: 860px;
}

.colorer {
  @extend .styler-list;
  height: 42px;

  li > input {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    appearance: none;
    width: 30px;
    height: 30px;
    border-radius: 40px;
    border: 4px solid darken($dark, 20%);
    margin: 0 5px;
    outline: none;

    &:checked {
      border-color: lighten($dark, 20%);
    }

    &:hover {
      border-color: lighten($dark, 20%);
    }

    &#colorRed {
      background: $red;
    }

    &#colorSamin {
      background: var(--plate-light-1);
    }

    // Repeat for other colors with appropriate variable or custom value
  }
}

.is-hidden {
  display: none;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

<style lang="scss">
.styler {
  text-align: start;

  &:hover {
    // Fix some over lapping of stylers!
    z-index: 2500 !important;
  }

  .styler-button {
    .v-tooltip {
      .v-overlay__content {
        min-width: 130px !important;
      }
    }

    &.selected{
      background: #20272e;
    }
  }

  @media only screen and (max-width: 600px) {
    overflow: auto;
    max-width: 96%;

    ul {
      max-width: 100%;

      li {
        max-width: 100%;

        > div {
          max-width: 100%;
          overflow: auto;
        }
      }
    }
  }

  //------------------ Start Styler dot color ------------------
  &.-dot {
    &:before {
      position: absolute;
      z-index: 1;
      top: 4px;
      left: 23px;
      content: attr(caption);
      font-size: 8px;
      color: #fff;
      background: transparent;
      text-transform: capitalize;
    }

    &:after {
      position: absolute;
      top: 6px;
      left: 12px;
      content: " ";
      width: 8px;
      height: 8px;


      border-radius: 8px;
      background-color: var(--dot-color);
    }
  }

  //------------------ End Styler dot color ------------------


  @media screen and (max-width: 600px) {
.styler-button{
  width: 32px;
  height: 32px;
  margin: 0;
  .v-icon{
    font-size: 14px !important;
    height: 14px !important;
    width: 14px !important;
  }
}
  }

}

//------------------ Slop polygon ------------------
.bg-style-normal {
}

@media only screen and (min-width: 900px) {
  .bg-style-diagonal-l-r-80 {
    //z-index: -1;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%);
    padding-bottom: 20% !important;
  }

  .bg-style-diagonal-r-l-80 {
    //z-index: -1;
    clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
    padding-bottom: 20% !important;
  }

  .bg-style-diagonal-l-r-60 {
    // z-index: -1;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 60%);
    padding-bottom: 40% !important;
  }
  .bg-style-diagonal-r-l-60 {
    // z-index: -1;
    clip-path: polygon(0 0, 100% 0, 100% 60%, 0 100%);
    padding-bottom: 40% !important;
  }

  .bg-style-stripe-r-l-60 {
    //z-index: -1;
    clip-path: polygon(0 40%, 100% 0, 100% 60%, 0 100%);
    padding-top: 40% !important;
    padding-bottom: 40% !important;
  }

  .bg-style-stripe-l-r-60 {
    // z-index: -1;
    clip-path: polygon(0 0%, 100% 40%, 100% 100%, 0 60%);
    padding-top: 40% !important;
    padding-bottom: 40% !important;
  }
  .bg-style-stripe-r-l-80 {
    //  z-index: -1;
    clip-path: polygon(0 20%, 100% 0, 100% 80%, 0 100%);
    padding-top: 20% !important;
    padding-bottom: 20% !important;
  }

  .bg-style-stripe-l-r-80 {
    //  z-index: -1;
    clip-path: polygon(0 0%, 100% 20%, 100% 100%, 0 80%);
    padding-top: 20% !important;
    padding-bottom: 20% !important;
  }

  .bg-style-arrow-up {
    &:before {
      content: "";
      width: 100%;
      height: 200px;
      max-height: 50%;
      position: absolute;
      bottom: -0.5px; // Fix some issue in showing line!
      left: 0;
      background-color: var(--bg-color);
      clip-path: polygon(71.5% 0, 0% 100%, 100% 100%);
    }
  }
}

//-------------------------------------------------------

//------------------ Responsive ------------------

.page-builder {
}

//-------------------------------------------------------

.is-editable:not(section):not(.button):not(.artboard):not(.v-btn) {
  min-width: 84px;
  background-color: rgba(221, 221, 221, 0.06);
  border: dashed 1px #ddd;
  border-radius: 2px;
}

// Start fix border width in scale down mode
.in-scale-down {
  .is-editable:not(section):not(.button):not(.artboard):not(.v-btn) {
    border-width: 1.5px;
  }
}

.dens-btn {
  min-width: 20px !important;
  border-radius: 50% !important;
  width: 26px;
  height: 26px !important;
  margin: 4px;
}

.class-prev-con {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;

  .class-prev {
    background: rgba(38, 38, 38, 0.87);
    flex-grow: 1;

    &.text-white {
      background: rgba(38, 38, 38, 0.87);
    }

    &.text-black {
      background: rgba(255, 255, 255, 0.87);
    }
  }
}

.bg-tools {
  background: #2f3133;
}

.bordered-dark {
  border: 4px solid #283039;

  &:hover {
    border: 4px solid #36414d;
  }
}
</style>
