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
  <div class="text-start py-1 d-flex align-center">
    <v-icon class="handle cursor-grab me-3"> unfold_more</v-icon>

    <div class="flex-grow-0">
      <v-avatar v-if="image" class="me-2 hover-scale" rounded size="16">
        <v-img :src="image"></v-img>
      </v-avatar>
      <v-icon v-else class="me-2" size="16">panorama_wide_angle</v-icon>
      {{ label }}
    </div>
    <div v-if="title" class="mx-2 flex-grow-1 font-weight-bold">
      | {{ title?.limitWords(5) }}
    </div>
    <v-spacer></v-spacer>
    <v-btn
      class="flex-grow-0"
      icon
      size="small"
      variant="text"
      @click.stop="removeSlide(i)"
    >
      <v-icon color="red">close</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { LModelElement } from "@selldone/page-builder/models/element/LModelElement.ts";
import { StripTags } from "@selldone/core-js";

export default {
  name: "LSettingsSwiperSlide",

  mixins: [],

  components: {},

  props: {
    object: {
      type: LModelElement,
      required: true,
    },
    label: {
      type: String,
      default: "Slide",
    },
  },
  data: () => ({}),

  computed: {
    image() {
      if (this.object.background.bg_image) {
        return this.getShopImagePath(this.object.background.bg_image);
      }

      // Reference the root element
      const rootElement = this.object.$element;

      // Find the first img element with a src attribute within the root element
      const imgElement = rootElement?.querySelector("img[src]");

      if (imgElement) {
        // Get the src value of the found img element
        return imgElement.getAttribute("src");
      }
      return null;
    },

    title() {
      const rootElement = this.object.$element;

      return rootElement?.textContent;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeUnmount() {},

  methods: {  },
};
</script>

<style lang="scss" scoped></style>
