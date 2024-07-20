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
  <v-img
    :src="canvas"
    :key="section.uid"
    :height="height"
    color="#fff"
    class="l--sort-item"
  >
    <template v-slot:placeholder>
      <div v-if="error" class="pa-2 small text-center center-absolute w-100">
        <v-icon class="me-1">wallpaper</v-icon>
        {{section.label}}
      </div>
      <v-progress-circular v-else-if="busy" indeterminate class="center-absolute">

      </v-progress-circular>
    </template>
  </v-img>
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
    height: {
      default: 80,
    },
  },
  data() {
    return {
      canvas: null,
      error: false,
      busy:false,
    };
  },
  computed: {},
  watch: {
    section() {
      this.$nextTick(() => {
        this.render();
      });
    },
  },

  mounted() {

    this.$nextTick(() => {
      this.render();
    });
  },

  methods: {
    async render() {
      this.canvas = null;
      this.busy=true;
      this.section
        .render()
        .then((dataURI) => {
          this.error = false;
          this.canvas = dataURI; // Data URI of the captured image
        })
        .catch((error) => {
          this.error = true;
          console.error("Error rendering the element:", error);
        }).finally(()=>{
          this.busy=false;
        });
    },
  },
});
</script>

<style scoped lang="scss">
.l--sort-item {
  border: solid 5px #333;
  border-radius: 12px;

  &:hover {
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.9);
    border-color: #000000;
  }
}
</style>
