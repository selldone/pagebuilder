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
  <div style="background-color: #333333; padding: 6px; border-radius: 4px">
    <v-btn
      @click="$emit('click')"
      :prepend-icon="icon"
      color="#222"
      variant="elevated"
      elevation="8"
      class="tnt"
      size="small"
    >
      {{ label }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SSettingButton",
  emits: ["click"],
  props: {
    label: {},
    icon: {},
  },
});
</script>

<style scoped lang="scss"></style>
