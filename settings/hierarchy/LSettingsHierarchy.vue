<!--
  - Copyright (c) 2023-2024. Selldone® Business OS™
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
    <!-- ████████████████████ Toolbar ████████████████████ -->

    <v-toolbar density="compact" color="#222" height="52" style="border-bottom: solid #111 thin">
      <v-toolbar-title style="font-size: 12px"><b>Navigator</b></v-toolbar-title>
    </v-toolbar>

    <!-- ████████████████████ Hierarchy ████████████████████ -->




    <l-settings-hierarchy-item
      v-for="(section, index) in sections"
      :key="index"
      :builder="builder"
      :object="section.object"
      class="mx-2"
    >
    </l-settings-hierarchy-item>
  </div>
</template>

<script>
import LSettingsHierarchyItem from "@selldone/page-builder/settings/hierarchy/item/LSettingsHierarchyItem.vue";
import Builder from "@selldone/page-builder/Builder";

export default {
  name: "LSettingsHierarchy",
  mixins: [],
  components: { LSettingsHierarchyItem },

  props: {
    builder: { type: Builder, required: true },
  },
  data: () => ({
    dialog: false,
    callback: null,
  }),

  computed: {
    sections() {
      return this.builder.sections;
    },
  },

  watch: {},
  created() {},
  mounted() {
    //█████████████████████████████████████████████████████████████
    //――――――――――――――― Event Bus ――――――――――――――――
    //█████████████████████████████████████████████████████████████
  },
  beforeUnmount() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
