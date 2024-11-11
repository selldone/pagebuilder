<!--
  - Copyright (c) 2024. Selldone® Business OS™
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
  <div class="s--layout-responsive-view">
    <div
      v-for="i in 12"
      :key="i"
      class="-cl"
      :class="{ '-fill': cols >= i }"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SLayoutResponsiveView",
  props: {
    cols: {},
  },
});
</script>

<style scoped lang="scss">
.s--layout-responsive-view {
  display: flex;
  align-items: center;
  border: solid #6b848e thin;
  padding: 3px;



  .-cl {
    width: 6px;
    height: 6px;
    margin: 1px;
    border-radius: 1px;
    background: #6b848e;
    &.-fill {
      background: #fff;
    }
  }
}
</style>
