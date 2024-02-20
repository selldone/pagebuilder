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
    v-styler:grid="{target:object.grid,hasCustomLayout:hasCustomLayout,removeColumn:removeColumn}"
    :class="[
      !noGrid ? calcGridClasses(object.grid) : undefined,
      object.classes,
    ]"
    :style="[object.style, backgroundStyle(object.background)]"
    v-init-data-attribute="object.style"
    :clonable="clonable"
    @click="copyStyle"
  >
    <!-- 📹 Background video -->
    <video-background
      v-if="object.background?.bg_video"
      :video="getVideoUrl(object.background.bg_video)"
    >
    </video-background>

    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Main Slot ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    <slot></slot>
  </component>
</template>

<script>
import VideoBackground from "@app-page-builder/sections/components/VideoBackground.vue";
import StylerDirective from "@app-page-builder/styler/StylerDirective";
import XMixin from "@app-page-builder/mixins/XMixin";
import { defineComponent } from "vue";

export default defineComponent({
  name: "XColumn",
  directives: { styler: StylerDirective },
  mixins: [XMixin],
  components: { VideoBackground },

  props: {
    object: { required: true },
    path: { required: true /*Required for v-styler*/ },
    clonable: { default: false, type: Boolean },
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
  created() {
    if(!this.isObject(this.object.grid)){
      this.object.grid= { mobile: 12, tablet: 6, desktop: 4 }
    }
  },

  methods: {
    copyStyle(event) {
      if (!this.clonable || !this.$builder.isEditing) return;
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
