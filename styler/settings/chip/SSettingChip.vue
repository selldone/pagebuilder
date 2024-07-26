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
  <v-chip
    v-if="value && value !== 'unset'"
    :prepend-icon="icon"
    class="ms-1"
    color="#FBC02D"
    label
    size="x-small"
    density="comfortable"
    variant="tonal"
  >
    <span v-if="label" class="me-1">{{ label }}</span>
    <span>{{ value }}</span>
  </v-chip>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SSettingChip",
  props: {
    icon: {},
    value: {
      required: true,
    },
    label: {},
  },
});
</script>

<style scoped lang="scss"></style>
