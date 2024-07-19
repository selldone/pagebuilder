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
      <v-toolbar-title style="font-size: 12px"><b>Sort</b></v-toolbar-title>
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
    </v-toolbar>


    <!-- ████████████████████ Hierarchy ████████████████████ -->
    <draggable
      v-model="$builder.sections"
      tag="div"
      animation="200"
      ghostClass= "ghost"
    >
      <template v-slot:item="{ element}">
        <l-menu-left-sort-item
          :section="element"
          @mouseenter="onHoverIn(element)"
          @mouseleave="onHoverOut(element)"
          class="mb-3 mx-2"
          rounded="lg"
          height="64"
        >
        </l-menu-left-sort-item>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import { LMixinEvents } from "@selldone/page-builder/mixins/events/LMixinEvents.ts";
import ScrollHelper from "@selldone/core-js/utils/scroll/ScrollHelper.ts";
import debounce from "lodash-es/debounce";
import { Section } from "@selldone/page-builder/src/section/section.ts";
import LMenuLeftSortItem from "@selldone/page-builder/src/menu/left/sort/item/LMenuLeftSortItem.vue";

export default {
  name: "LMenuLeftSort",
  mixins: [LMixinEvents],
  components: { LMenuLeftSortItem, draggable },

  inject: ["$builder"],
  props: {},
  data: () => ({
    lock_scroll: false,
    current_section: null,
    x: null,
  }),

  computed: {
    ScrollHelper() {
      return ScrollHelper;
    },
    sections() {
      return this.$builder.sections;
    },
  },

  watch: {},
  created() {
    this.debouncedScrollToElement = debounce(this.scrollToElement, 500, {
      leading: true,
      trailing: false,
    });
  },
  mounted() {
    this.x = this.$refs.x;
  },
  beforeUnmount() {},

  methods: {
    onHoverIn(section: Section) {
      // Remove all 'element-focus-editing' classes from elements
      $(".element-focus-editing").removeClass("element-focus-editing");

      section.object.$element?.classList.add("element-focus-editing");

      if (!this.lockScroll) {
        this.debouncedScrollToElement(section);
      }
    },

    onHoverOut(section) {
      //  console.log('onHoverOut objects',this.object)
      section.object.$element?.classList.remove("element-focus-editing");
    },
    scrollToElement(section) {
      ScrollHelper.scrollToElement(section.object.$element, 0, "smooth", true);
    },
  },
};
</script>

<style lang="scss" scoped></style>
