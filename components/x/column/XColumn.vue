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
  <component
    class="x--column"
    :is="noGrid ? 'div' : 'v-col'"
    v-data-x="object.style"
    v-styler:column="{
      target: object,
      hasCustomLayout: hasCustomLayout,
      removeChild: removeChild,
      position: nested ? 'left-bottom' : undefined,
    }"
    :cloneable="cloneable"
    @click="copyStyle"
    :class="[
      object.classes,
      !noGrid ? calcGridClasses(object.data?.grid) : undefined,
      { 'is-editable': $builder.isEditing }
    ]"
    :style="[object?.style, backgroundStyle(object.background)]"
  >
    <!-- 📹 Background video -->
    <x-video-background
      v-if="object.background?.bg_video"
      :video="getVideoUrl(object.background.bg_video)"
    >
    </x-video-background>

    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Main Slot ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    <slot></slot>
  </component>
</template>

<script lang="ts">
import XVideoBackground from "../../../components/x/video-background/XVideoBackground.vue";
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "../../../mixins/x-component/LMixinXComponent";
import { defineComponent } from "vue";
import DataXDirective from "../../../directives/DataXDirective";
import { XColumnObject } from "@selldone/page-builder/components/x/column/XColumnObject";
import {Grid} from "@selldone/page-builder/src/types/types.js";

export default defineComponent({
  name: "XColumn",
  directives: { styler: StylerDirective, "data-x": DataXDirective },
  mixins: [LMixinXComponent],
  components: { XVideoBackground },

  props: {
    object: {
      type: XColumnObject,
      required: true,
    },
    cloneable: { default: false, type: Boolean },
    noGrid: {
      /*No grid: Grid do not apply to the column here, but apply in it's parent which is column! It useful to have margin and it act like a card.*/
      default: false,
      type: Boolean,
    },
    hasCustomLayout: {
      // Used in v-styler
      default: false,
      type: Boolean,
    },
    removeChild: {
      // Used in v-styler
      type: Function,
    },

    /**
     * Change the offset for the proper in nested columns to prevent overlap
     * Default is 15
     */
    nested: Boolean,
  },
  created() {
    if (this.object && !this.object.classes) {
      // Auto add position relative to the column by default (to show video correctly!)
      this.object.classes = ["position-relative"];
    }
  },

  methods: {
    copyStyle(event) {
      if (!this.cloneable || !this.$builder.isEditing) return;
      this.$builder.onClickClone(event, this.object, [
        "classes",
        "style",
        "background",
      ]);
      this.$forceUpdate();
    },


    calcGridClasses(grid: Grid) {
      return (Object.keys(grid ? grid : {}) as (keyof Grid)[]).map((device) => {
        if (!grid[device]) {
          return "";
        }
        const prefix = this.$builder.columnsPrefix[device];
        return `${prefix}${grid[device]}`;
      });
    },

  },
});
</script>

<style scoped lang="scss">
.x--column {
 // height: 100%; // Fix some difference between edit mode and view mode when image does not exist!
}
</style>
