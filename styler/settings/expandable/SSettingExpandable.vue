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
  <!-- ████████████████████████ Group ████████████████████████ -->
  <v-expansion-panels class="s--setting-expandable">
    <v-expansion-panel :bg-color="bgColor">
      <v-expansion-panel-title class="-group-title py-0">
        <v-icon v-if="icon" class="me-2">{{ icon }}</v-icon>
        {{ title }}
        <v-chip
          size="x-small"
          v-for="tag in tags"
          :key="tag"
          class="ma-1"
          color="green" label
          variant="flat"
          >{{ tag }}</v-chip
        >
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="-content">
          <slot></slot>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SSettingExpandable",
  components: {},
  props: {
    title: {},
    icon: {},
    bgColor: {},
    tags: {
      type: Array,
    },
  },
  computed: {},
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.s--setting-expandable {
  .-group-title {
    font-size: 14px !important;
  }

  .-content {
    > :not(:last-child) {
      border-bottom: dashed 1px #545454;
    }
  }
}
</style>
