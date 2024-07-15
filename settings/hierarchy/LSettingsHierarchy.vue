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

    <v-toolbar
      density="compact"
      color="#222"
      height="52"
      style="border-bottom: solid #111 thin"
    >
      <v-toolbar-title style="font-size: 12px"
        ><b>Navigator</b></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn
        size="small"
        @click="lock_scroll = !lock_scroll"
        variant="text"
        :title="lock_scroll ? 'Lock Scroll' : 'Scroll to Element'"
        min-width="32"
      >
        <v-icon>{{ lock_scroll ? "lock" : "lock_open" }} </v-icon>
      </v-btn>

      <v-btn
        size="small"
        @click="expanded = !expanded"
        variant="text"
        :title="expanded ? 'Collapse All' : 'Expand All'"
        min-width="32"
      >
        <v-icon
          >{{ expanded ? "unfold_more_double" : "unfold_less_double" }}
        </v-icon>
      </v-btn>
    </v-toolbar>

    <!-- ████████████████████ Hierarchy ████████████████████ -->
    <draggable
      v-model="builder.sections"
      tag="div"
      animation="200"
      ghostClass="bg-primary"
    >
      <template v-slot:item="{ element }">
        <l-settings-hierarchy-item
          :object="element.object"
          :section="element"
          class="mx-2"
          has-editable-title
          :lock-scroll="lock_scroll"
        >
        </l-settings-hierarchy-item>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import LSettingsHierarchyItem from "@selldone/page-builder/settings/hierarchy/item/LSettingsHierarchyItem.vue";
import Builder from "@selldone/page-builder/Builder";
import draggable from "vuedraggable";
import { Section } from "@selldone/page-builder/src/section/section.ts";

export default {
  name: "LSettingsHierarchy",
  mixins: [],
  components: { draggable, LSettingsHierarchyItem },

  props: {
    builder: { type: Builder, required: true },
  },
  data: () => ({
    expanded: false,
    lock_scroll: false,
  }),

  computed: {
    sections() {
      return this.builder.sections;
    },
  },

  watch: {
    expanded(expanded) {
      this.sections.forEach((section: Section) => {
        section.object.__setExpand(expanded);
      });
    },
  },
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
