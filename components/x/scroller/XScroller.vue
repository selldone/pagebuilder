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
  <u-fade-scroll
    class="x--scroller"
    :class="[object?.classes]"
    :style="[object.style, background_style]"
    placeholder="[Row] Drag & Drop.."
    drag-scroll
  >
    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Main Slot ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    <slot></slot>
  </u-fade-scroll>
</template>

<script lang="ts">
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "../../../mixins/x-component/LMixinXComponent";
import { defineComponent } from "vue";
import { XScrollerObject } from "@selldone/page-builder/components/x/scroller/XScrollerObject.ts";
import UFadeScroll from "@selldone/components-vue/ui/fade-scroll/UFadeScroll.vue";

export default defineComponent({
  name: "XScroller",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],
  components: { UFadeScroll },

  props: {
    object: { type: XScrollerObject, required: true },
  },
  data: () => ({}),

  computed: {},

  watch: {},

  mounted() {
    //   this.setLocation();
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.x--scroller {
}
</style>

<style lang="scss"></style>
