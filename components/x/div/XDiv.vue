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
    v-styler:div="{ target: object, removeChild:clearable? removeChild:undefined }"
    :class="object.classes"
    :style="[background_style, object.style]"
  >
    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Main Slot ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    <slot></slot>
  </div>
</template>

<script>
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "../../../mixins/x-component/LMixinXComponent";

export default {
  name: "XDiv",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],
  components: {},

  props: {
    object: { required: true },
    clearable: Boolean,
    removeChild: Function,
  },
  data: () => ({}),
  computed: {
    background_style() {
      return this.backgroundStyle(this.object.background);
    },
  },
  created() {},
};
</script>

<style scoped></style>
