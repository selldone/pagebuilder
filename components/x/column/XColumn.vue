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
    :is="noGrid ? 'div' : 'v-col'"
    v-data-x="object.style"
    v-styler:column="{
      target: object,
      hasCustomLayout: hasCustomLayout,
      removeColumn: removeColumn,
    }"
    :class="[
      !noGrid ? calcGridClasses(object.grid) : undefined,
      object.classes,
    ]"
    :cloneable="cloneable"
    :style="[object.style, backgroundStyle(object.background)]"
    @click="copyStyle"
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

<script>
import XVideoBackground from "@app-page-builder/components/x/video-background/XVideoBackground.vue";
import StylerDirective from "@app-page-builder/styler/StylerDirective";
import LMixinXComponent from "@app-page-builder/mixins/x-component/LMixinXComponent";
import { defineComponent } from "vue";
import DataXDirective from "@app-page-builder/directives/DataXDirective";

export default defineComponent({
  name: "XColumn",
  directives: { styler: StylerDirective, "data-x": DataXDirective },
  mixins: [LMixinXComponent],
  components: { XVideoBackground },

  props: {
    object: { required: true },
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
    removeColumn: {
      // Used in v-styler
      type: Function,
    },
  },
  created() {},

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
  },
});
</script>

<style scoped></style>