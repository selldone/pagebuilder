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
  <u-fade-scroll class="text-start">
    <div class="d-flex" title="Dynamic values auto fill by augmentation.">
      <v-chip v-for="it in array" :key="it" class="me-1" label size="x-small"
        >{{ it }}
      </v-chip>
    </div>
  </u-fade-scroll>
</template>

<script>
import UFadeScroll from "@selldone/components-vue/ui/fade-scroll/UFadeScroll.vue";
import { isString } from "lodash-es";

export default {
  name: "LAugmentFinder",
  components: { UFadeScroll },
  props: {
    modelValue: {},
  },

  data: function () {
    return {
      show_add: false,
    };
  },
  computed: {
    array() {
      if (isString(this.modelValue))
        return this.modelValue?.findAllDynamicAugmentKeys().unique(); // Find all {{key}}
      else {
        console.error(
          "LAugmentFinder: modelValue is not a string.",
          this.modelValue,
        );
        return [];
      }
    },
  },

  watch: {},

  created() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
