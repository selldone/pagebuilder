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
        <v-icon>{{ lock_scroll ? "lock" : "lock_open" }}</v-icon>
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
          @right-click="
            (val) => {
              menu_selected_item = val;
              menu = true;
            }
          "
        >
        </l-settings-hierarchy-item>
      </template>
    </draggable>
    <v-menu
      v-if="menu_selected_item"
      v-model="menu"
      :activator="menu_selected_item.activator"
      :close-on-content-click="true"
      location="end"
      max-width="320"
      width="90vw"
    >
      <v-card class="text-start">
        <v-card-title class="text-subtitle-2 border-bottom">
          <v-icon class="me-1">{{ menu_selected_item.icon }}</v-icon>
          {{ menu_selected_item.title }}
        </v-card-title>

        <v-list density="compact">
          <v-list-item
            title="Classes & Style"
            subtitle="Change element appearance."
            prepend-icon="architecture"
            @click="showMasterDesignDialog(menu_selected_item)"
          >
          </v-list-item>
          <v-list-item
            title="Delete Element"
            subtitle="Remove element and all its children."
            prepend-icon="close"
            @click="deleteItem(menu_selected_item)"
          >
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import LSettingsHierarchyItem from "@selldone/page-builder/settings/hierarchy/item/LSettingsHierarchyItem.vue";
import Builder from "@selldone/page-builder/Builder";
import draggable from "vuedraggable";
import { Section } from "@selldone/page-builder/src/section/section.ts";
import { LModelElement } from "@selldone/page-builder/models/element/LModelElement.ts";
import { LMixinEvents } from "@selldone/page-builder/mixins/events/LMixinEvents.ts";

export default {
  name: "LSettingsHierarchy",
  mixins: [LMixinEvents],
  components: { draggable, LSettingsHierarchyItem },

  props: {
    builder: { type: Builder, required: true },
  },
  data: () => ({
    expanded: false,
    lock_scroll: false,

    //---------------------
    menu: false,
    menu_selected_item: null,
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

  methods: {
    showMasterDesignDialog({
      object,
    }: {
      object: LModelElement;
      section: Section;
      parent: Section;
    }) {
      this.ShowLSettingsClassStyle(object.$element, object.$element, object);
    },

    deleteItem({
      object,
      section,
      parent,
    }: {
      object: LModelElement;
      section: Section;
      parent: Section;
    }) {
      if (!parent) {
        // In the root
        this.builder.remove(section);
      } else {
        parent.removeChild(object);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
