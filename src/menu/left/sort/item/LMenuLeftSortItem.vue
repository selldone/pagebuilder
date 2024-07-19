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
  <div>
    <v-img
      :src="canvas"
      :key="section.uid"
      :height="height"
      color="#fff"
      :rounded="rounded"
    >
      <template v-slot:placeholder>
        <div v-if="error" class="pa-2 small text-center">
          <v-icon class="me-1">warning_amber</v-icon>
          Can not capture the element!
        </div>
      </template>
    </v-img>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Section } from "@selldone/page-builder/src/section/section.ts";

export default defineComponent({
  name: "LMenuLeftSortItem",
  props: {
    section: {
      required: true,
      type: Section,
    },
    rounded: {},
    height: {
      default: 80,
    },
  },
  data() {
    return {
      canvas: null,
      error: false,
    };
  },
  computed: {},
  watch: {
    section() {
      this.render();
    },
  },

  mounted() {
    this.render();
  },

  methods: {
    async render() {
      this.section
        .render()
        .then((dataURI) => {
          this.error = false;
          this.canvas = dataURI; // Data URI of the captured image
        })
        .catch((error) => {
          this.error = true;
          console.error("Error rendering the element:", error);
        });
    },
  },
});
</script>

<style scoped lang="scss"></style>
