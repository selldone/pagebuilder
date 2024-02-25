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
  <div
    :class="{
      '-copy': copy_hover,
      '-delete': delete_hover,
      '-row': ['infinite-stream'].includes(section.name),
    }"
    class="side-section"
  >
    <!-- ▃▃▃▃▃▃▃▃▃▃ Copy ▃▃▃▃▃▃▃▃▃▃ -->

    <v-btn
      class="hover-scale-small -fast force-top"
      color="#000"
      icon
      size="large"
      variant="text"
      @click="$emit('click:copy', section)"
      @mouseenter="copy_hover = true"
      @mouseleave="copy_hover = false"
    >
      <v-icon size="36">content_copy</v-icon>

      <v-tooltip
        activator="parent"
        content-class="bg-black pa-3 text-start small"
        location="left"
        max-width="420"
      >
        <b class="d-block">
          <v-icon class="me-1">content_copy</v-icon>
          Copy Section Now!</b
        >
        <div>
          When you click here, this section structure and data will be copied,
          allowing you to paste it onto this page or any other pages.
        </div>
      </v-tooltip>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn
      class="hover-scale-small -fast force-top"
      color="red"
      icon
      size="large"
      variant="text"
      @click="$emit('click:delete', section)"
      @mouseenter="delete_hover = true"
      @mouseleave="delete_hover = false"
    >
      <v-icon size="36">close</v-icon>

      <v-tooltip
        activator="parent"
        content-class="bg-red pa-3 text-start small"
        location="left"
        max-width="420"
        text="Delete Section"
      >
      </v-tooltip>
    </v-btn>

    <v-spacer></v-spacer>

    <!-- ▃▃▃▃▃▃▃▃▃▃ Save Section (Page's Element) ▃▃▃▃▃▃▃▃▃▃ -->

    <v-btn
      v-if="$route.params.shop_id /*Only in shop admin dashboard!*/"
      class="hover-scale-small -fast force-top mb-1"
      color="#000"
      icon
      size="large"
      variant="text"
      @click="$emit('click:save', section)"
    >
      <v-icon size="36">save</v-icon>

      <v-tooltip
        activator="parent"
        content-class="bg-black pa-3 text-start small"
        location="left"
        max-width="420"
      >
        <b class="d-block">
          <v-icon class="me-1">save</v-icon>
          Save & Reuse This Section</b
        >
        <div>Save this section to my repository for use on other pages.</div>
      </v-tooltip>
    </v-btn>

    <!-- ▃▃▃▃▃▃▃▃▃▃ Past ▃▃▃▃▃▃▃▃▃▃ -->

    <v-btn
      class="hover-scale-small -fast"
      color="#000"
      icon
      size="large"
      variant="text"
      @click="$emit('click:past', section)"
      @mouseenter="$emit('update:pastHoverIndex', sectionIndex)"
      @mouseleave="$emit('update:pastHoverIndex', null)"
    >
      <v-icon size="36">content_paste</v-icon>

      <v-tooltip
        activator="parent"
        content-class="bg-black pa-3 text-start small"
        location="left"
        max-width="420"
      >
        <b>
          <v-icon class="me-1">content_paste</v-icon>
          Ctrl + V Now!</b
        >
        <v-chip
          v-if="copySection"
          class="ma-1"
          color="green"
          size="small"
          variant="tonal"
        >
          <v-icon color="success" size="x-small" start>circle</v-icon>
          Copy available
        </v-chip>

        <div>
          Clicking this button will add a copied section here. If you've copied
          a section <b>from another page</b>, simply use <b>Ctrl + V</b> to
          paste it here, as we cannot access the clipboard programmatically.
        </div>
      </v-tooltip>
    </v-btn>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { LMixinHistory } from "@app-page-builder/mixins/history/LMixinHistory";

export default defineComponent({
  name: "SLandingSectionSideBar",
  mixins: [LMixinHistory],

  emits: ["update:pastHoverIndex"],
  props: {
    section: {
      type: Object,
      required: true,
    },
    sectionIndex: {
      type: Number,
      required: true,
    },
    pastHoverIndex: {
      type: Number,
      default: null,
    },

    copySection: {},
  },
  data() {
    return {
      copy_hover: false,
      delete_hover: false,
    };
  },

  created() {},

  methods: {},
});
</script>

<style lang="scss" scoped>
.side-section {
  position: absolute;
  left: -84px;
  top: 0;
  bottom: 0;
  z-index: 1;

  display: flex;
  flex-direction: column;
  padding: 24px 8px;

  &.-row {
    flex-direction: row;
    left: -224px;
    width: 200px;
    top: 0;
  }

  &:before {
    transition: all 0.2s ease-in-out;
    content: "";
    position: absolute;
    right: 0;
    top: 12px;
    bottom: 12px;
    width: 4px;
    background: #0d0d0d;
  }

  &.-copy {
    &:before {
      background: #8bc34a;
      width: 6px;
      right: -1px;
    }
  }

  &.-delete {
    &:before {
      background: #d22323;
      width: 6px;
      right: -1px;
    }
  }
}
</style>
