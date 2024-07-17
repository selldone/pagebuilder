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
  <v-btn
    variant="text"
    size="small"
    stacked
    height="inherit"
    class="tnt px-1"
    min-width="84"

    :class="{ disabled: disabled }"
  >
    <v-icon v-if="icon" size="24">{{ icon }}</v-icon>

    <b v-if="caption" class="mt-1">{{ caption }}</b>
    <div v-if="subCaption" class="small mt-1" style="max-width: 84px">{{ subCaption }}</div>
    <slot></slot>
    <v-tooltip
      v-if="$slots['tooltip']"
      activator="parent"
      content-class="text-start small pa-3 bg-black"
      location="bottom"
      max-width="420"
      :open-delay="500"
    >
      <slot name="tooltip"></slot>
    </v-tooltip>

  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LmtLargeButton",
  props: {
    icon: {},
    caption: {},
    subCaption: {},
    disabled:Boolean,
  },
});
</script>

<style scoped lang="scss"></style>
