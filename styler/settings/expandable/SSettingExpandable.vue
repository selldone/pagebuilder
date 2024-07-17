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
  <v-expansion-panel
    :value="value"
    :bg-color="bgColor"
    color="s--setting-expandable"
  >
    <v-expansion-panel-title class="-group-title py-0">
      <v-img v-if="image" class="me-2 flex-grow-0 border" width="21" height="21" :src="image" cover rounded="lg"></v-img>
      <v-icon v-else-if="icon" class="me-2">{{ icon }}</v-icon>
      {{ title }}
      <v-chip
        v-for="tag in tags"
        :key="tag"
        class="ma-1"
        color="green"
        label
        size="x-small"
        variant="flat"
        >{{ tag }}
      </v-chip>
      <slot name="title"></slot>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-list-subheader v-if="subtitle">{{subtitle}}</v-list-subheader>
      <div class="-content">
        <slot></slot>
      </div>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SSettingExpandable",
  components: {},
  props: {
    value: {},
    title: {},
    subtitle:{},
    image:{},
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
