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
      @mouseenter="
        lock_scroll
          ? undefined
          : window.scrollTo({ top: 0, behavior: 'smooth' })
      "
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
      v-model="$builder.sections"
      tag="div"
      animation="200"
      ghostClass="bg-primary"
      itemKey="uid"
    >
      <template v-slot:item="{ element }">
        <l-menu-left-hierarchy-item
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
        </l-menu-left-hierarchy-item>
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
        <v-card-title class="text-subtitle-2 border-bottom bg-black">
          <v-icon class="me-1">{{ menu_selected_item.icon }}</v-icon>
          {{ menu_selected_item.title }}
        </v-card-title>

        <v-list density="compact" class="border-between-vertical">
          <v-list-item
            title="Classes & Style"
            subtitle="Change element appearance."
            prepend-icon="architecture"
            @click="showMasterDesignDialog(menu_selected_item)"
          >
          </v-list-item>

          <v-list-item
            title="Duplicate Element"
            subtitle="Create a copy of the element."
            prepend-icon="content_copy"
            @click="duplicateItem(menu_selected_item)"
          >
          </v-list-item>

          <v-list-item
            title="Delete Element"
            subtitle="Remove element and all its children."
            @click="deleteItem(menu_selected_item)"
          >
            <template v-slot:prepend>
              <v-icon color="red">close</v-icon>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import LMenuLeftHierarchyItem from "@selldone/page-builder/src/menu/left/hierarchy/item/LMenuLeftHierarchyItem.vue";
import { Section } from "@selldone/page-builder/src/section/section.ts";
import { LModelElement } from "@selldone/page-builder/models/element/LModelElement.ts";
import { LMixinEvents } from "@selldone/page-builder/mixins/events/LMixinEvents.ts";
import { LUtilsClone } from "@selldone/page-builder/utils/clone/LUtilsClone.ts";
import ScrollHelper from "@selldone/core-js/utils/scroll/ScrollHelper.ts";
import { defineAsyncComponent } from "vue";

export default {
  name: "LMenuLeftHierarchy",
  mixins: [LMixinEvents],
  components: {
    draggable: defineAsyncComponent(() => import("vuedraggable")),
    LMenuLeftHierarchyItem,
  },

  inject: ["$builder"],
  props: {},
  data: () => ({
    expanded: false,
    lock_scroll: false,

    //---------------------
    menu: false,
    menu_selected_item: null,
  }),

  computed: {
    ScrollHelper() {
      return ScrollHelper;
    },
    sections() {
      return this.$builder.sections;
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
      object: LModelElement<any>;
      section: Section | null;
      parent: LModelElement<any> | null;
    }) {
      if (!parent) {
        // In the root
        this.$builder.remove(section);
      } else {
        parent.removeChild(object);
      }
    },

    duplicateItem({
      object,
      section,
      parent,
    }: {
      object: LModelElement<any>;
      section: Section | null;
      parent: LModelElement<any> | null;
    }) {
      const clone = LUtilsClone.CloneElement(object);

      if (!parent) {
        const index = this.$builder.sections.indexOf(section);
        // In the root
        this.$builder.add(
          { object: clone, label: `🍒 ${section.label}` },
          index >= 0 ? index + 1 : 0,
          true,
        );
      } else {
        const index = parent?.children.indexOf(object);
        //console.log(parent, index);
        clone.setLabel(null);
        parent.addChild(clone, index);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
