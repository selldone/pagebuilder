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

    class="styler"
    @click.stop=""
    :class="[
      {
        'is-visible': isVisible,
      '-dot -red':
          type === 'button' || type === 'text',
        '-dot -green':
          type === 'row' || type === 'row-grid' || type === 'buttons-row',
        '-dot -amber': type === 'container',

        '-dot -blue': type === 'grid',
        '-dot': type === 'section',
      },
      `-type-${type}`,
    ]"
    :style="[PageBuilderColorsHelper.GenerateColorsStyle(builder.style)]"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <!-- Important: Display non because of preventing proper error -->

    <slot v-if="!builder.isAnimation && !builder.isTracking"></slot>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――― Animation tools ―――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul v-if="builder.isAnimation" class="styler-list">
      <!-- ―――――――――――――――――― Delete button / col ―――――――――――――――――― -->
      <!-- Available for: section / grid -->
      <li>
        <button
          class="styler-button"
          @click="showAnimationEdit"
          title="Animation"
        >
          <v-icon dark size="20">movie_filter</v-icon>
        </button>
      </li>
      <span v-html="getAnimationClassesDetail()"></span>
    </ul>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――― Tracking tools ―――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul v-if="builder.isTracking" class="styler-list">
      <!-- ―――――――――――――――――― Delete button / col ―――――――――――――――――― -->
      <!-- Available for: section / grid -->
      <li v-if="!element_id">
        <button
          class="styler-button fadeIn"
          @click="enableTrackingCode()"
          title="Animation"
        >
          <v-icon dark size="20">gps_fixed</v-icon>
        </button>
      </li>

      <v-text-field
        variant="solo"
        single-line
        label="ID"
        v-if="element_id"
        v-model="element_id"
        clearable
        @click:clear="setId(null)"
        @blur="setId(element_id)"
        hide-details
        flat
        clear-icon="location_disabled"
        rounded
        bg-color="#111"
        class="zoomInRight min-width-200"
      ></v-text-field>
    </ul>
  </div>
</template>

<script>


import { PageBuilderColorsHelper } from "@app-page-builder/src/helpers/PageBuilderColorsHelper";
import { StylerHelper } from "@app-page-builder/src/helpers/StylerHelper";
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";
import PageEventBusMixin from "@app-page-builder/mixins/PageEventBusMixin";
import { LandingHistoryMixin } from "@app-page-builder/mixins/LandingToolsMixin";

export default {
  name: "SStylerTemplate",

  mixins: [PageBuilderMixin, PageEventBusMixin, LandingHistoryMixin],

  components: {},
  props: {
    builder: {
      // type: Object,
      required: true,
    },

    el: {
      // type: Object,
      required: true,
    },
    type: {
      // depricated
      type: String,
      required: true,
    },
    name: {
      // depricated
      type: String,
      required: true,
    },

    section: {
      type: Object,
      required: true,
    },
    isVisible:Boolean,

  },
  data: () => ({
    PageBuilderColorsHelper: PageBuilderColorsHelper,



    element_id: null,


  }),

  computed: {

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
        this.ShowGlobalAnimationEditorDialog(
          this.el,
          this.el,
          this.section,
          `$sectionData.style`,
          `$sectionData.classes`,
        );
      } else if (this.type === "grid") {
        const column_path = this.name.substring(0, this.name.lastIndexOf("."));

        this.ShowGlobalAnimationEditorDialog(
          this.el,
          this.el,
          this.section,
          `${column_path}.style`,
          `${column_path}.classes`,
        );
      }
    },
    getAnimationClassesDetail() {
      let classes = null;
      let style = null;
      if (this.type === "section") {
        classes = this.section.get(`$sectionData.classes`);
        style = this.section.get(`$sectionData.style`);
      } else if (this.type === "grid") {
        const column_path = this.name.substring(0, this.name.lastIndexOf("."));
        classes = this.section.get(`${column_path}.classes`);
        style = this.section.get(`${column_path}.style`);
      }
      return StylerHelper.GetAnimationClassesDetail(classes, style);
    },

    //----------------------------------------------------------------------------
    enableTrackingCode() {
      this.element_id = "tracking-" + Math.random().toString(36).substring(7);
      this.setId(this.element_id);
    },
    setId(id) {
      if (id && $(`#${id}`).length) {
        console.log("Duplicate ID!");
        return;
      }

      this.el.id = id ? id : "";
      this.section.set(`${this.name}.id`, id);
    },

    //――――――――――――――――――――――  Mouse Events ――――――――――――――――――――

    mouseenter(e) {
      if (!this.el.classList.contains("highlight-blueprint")) {
        this.el.classList.add("highlight-blueprint");
      }
    },
    mouseleave(e) {
      // Reset
      this.el.classList.remove("highlight-blueprint");
    },
  },
};
</script>

<style lang="stylus">
//@import '~@baianat/base.framework/src/stylus/util/colors'
@import "../../src/stylus/colors.styl"

$dark = #323c47;
$white = #fff;
.styler
  position: absolute
  top: 0
  left 0
  display none
  z-index: 200
  visibility: hidden
  opacity: 0
  margin: 10px 0
  padding: 5px
  background: $dark
  border-radius: 26px
  flex-direction: column
  justify-content: center
  align-items: center

  &-list
    display: flex
    justify-content: center
    align-items: center
    list-style: none
    margin: 0
    padding: 0 !important
    color: #fff

  &-input
    background: $white
    color: $dark
    border: 0
    outline: 0
    width: 40px
    height: 40px
    border-radius: 42px
    margin: 0 5px 0 0
    text-align: center
    -webkit-appearance: none
    -moz-appearance: textfield
    appearance: none

  &-button
    display: flex
    justify-content: center
    align-items: center
    outline: 0
    background: $dark
    border: 0
    fill: $white
    color: $white
    width: 42px
    height: 42px
    border-radius: 42px
    margin: 0 5px 0 0

    &:hover
      background: darken($dark, 20%)

    &:first-child
      margin-left: 5px

    &.selected
      background: darken($dark, 40%)

  &-selector
    margin: 0 5px

  &.is-visible
    visibility: visible
    opacity: 1
    display flex

  .input-group
    margin: 5px

.align
  @extend .styler-list
  height: 42px


.colorer
  @extend .styler-list
  height: 42px

  li > input
    -webkit-appearance: none
    -moz-appearance: textfield
    appearance: none
    width: 30px
    height: 30px
    border-radius: 40px
    border: 4px solid darken($dark, 20%)
    margin: 0 5px
    outline: none

    &:checked
      border-color: lighten($dark, 20%)

    &:hover
      border-color: lighten($dark, 20%)

    &#colorRed
      background $red

    &#colorSamin
      background var(--plate-light-1)

    &#colorPink
      background var(--plate-light-2)

    &#colorBlack
      background var(--plate-light-3)

    &#colorGreen
      background var(--plate-light-4)

    &#colorBlue
      background var(--plate-light-5)

    &#colorWhite
      background var(--plate-light-6)

    &#colorDeep-purple
      background var(--plate-light-7)

    &#colorTeal
      background var(--plate-light-8)

    &#colorCyan
      background var(--plate-light-9)

    &#colorAmber
      background var(--plate-light-10)

    &#colorBlue-grey
      background var(--plate-light-11)


    &#colorTransparent
      background linear-gradient(45deg, white 50%, #444 50%);


.is-hidden
  display: none

input[type=number]::-webkit-inner-spin-button
input[type=number]::-webkit-outer-spin-button
  -webkit-appearance: none
  margin: 0
</style>

<style lang="scss">
.styler {
  &:hover {
    // Fix some over lapping of stylers!
    z-index: 250;
  }

  @media only screen and (max-width: 600px) {
    overflow: auto;
    max-width: 96%;
    // transform: unset !important;
    //top: unset !important;
    // left: 2% !important;
    // bottom: 0 !important;
    // border-radius: 8px !important;
    // border: solid #1a2128 medium;
    // padding: 4px 12px;

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
    &:after {
      position: absolute;
      top: 9px;
      left: 9px;
      content: " ";
      width: 6px;
      height: 6px;

      border-radius: 8px;
      background-color: #fff;
    }

    &.-red {
      &:after {
        background-color: #e64a19;
      }
    }

    &.-green {
      &:after {
        background-color: #8bc34a;
      }
    }

    &.-blue {
      &:after {
        background-color: #03a9f4;
      }
    }

    &.-amber {
      &:after {
        background-color: #ffa000;
      }
    }
  }

  //------------------ End Styler dot color ------------------
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

    &.white--text {
      background: rgba(38, 38, 38, 0.87);
    }

    &.black--text {
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
