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
  <v-container
    :fluid="object.row ? object.row.fluid : false"
    :style="{ maxWidth: object.row?.fluid ? undefined : maxWidthNormal }"
    class="x--container"
  >
    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Main Slot ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    <slot></slot>
  </v-container>
</template>

<script>
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "../../../mixins/x-component/LMixinXComponent";
import { defineComponent } from "vue";

export default defineComponent({
  name: "XContainer",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],
  components: {},

  props: {
    object: { required: true },
    maxWidthNormal: {
      // Override max with (non-fluid)
    },
  },

  data: () => ({}),
  created() {},
});
</script>

<style lang="scss">
.x--container {
  height: inherit;
  min-height: inherit;
  max-height: inherit;
}
</style>
