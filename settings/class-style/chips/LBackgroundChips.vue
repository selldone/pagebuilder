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
  <template v-if="background">
    <u-color-circle
      v-if="background.bg_gradient?.length"
      class="ms-2"
      :color="background.bg_gradient"
      size="18"
    ></u-color-circle>

    <v-chip
      v-if="background.bg_color"
      class="ms-1"
      color="#000"
      label
      size="x-small"
      density="comfortable"
      variant="flat"
    >
      <v-icon start :color="background.bg_color">circle</v-icon>
      {{ background.bg_color }}
    </v-chip>

    <v-chip
      v-if="background.bg_image"
      class="ms-1"
      color="#00796B"
      label
      size="x-small"
      density="comfortable"
      variant="flat"
      prepend-icon="image"
      :prepend-avatar="getShopImagePath(background.bg_image)"
    >
      Image
    </v-chip>

    <v-chip
      v-if="background.bg_custom"
      :style="{ background: background.bg_custom }"
      class="ms-1"
      color="#00796B"
      label
      size="x-small"
      density="comfortable"
      variant="flat"
      prepend-icon="css"
    >
      Custom
    </v-chip>

    <v-chip
      v-if="background.bg_video"
      class="ms-1"
      color="#D32F2F"
      label
      size="x-small"
      density="comfortable"
      variant="flat"
      prepend-icon="smart_display"
    >
      Video
    </v-chip>

    <v-chip
      v-if="background.bg_backdrop"
      class="ms-1"
      color="#000"
      label
      size="x-small"
      density="comfortable"
      variant="flat"
      prepend-icon="photo_filter"
    >
      Backdrop
    </v-chip>
  </template>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { LModelBackground } from "@selldone/page-builder/models/background/LModelBackground.ts";

export default defineComponent({
  name: "LBackgroundChips",
  props: {
    background: {
      type: LModelBackground,
    },
  },
});
</script>

<style scoped lang="scss"></style>
