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
  <v-row
    :align="object.row ? object.row.align : 'center'"
    :justify="object.row ? object.row.justify : 'space-around'"
    :class="{ addable: addColumn, '-no-wrap': hasWrap && object.row?.no_wrap }"
    v-styler:row="`${path}`"
    class="x--row"
    v-bind:has-wrap="hasWrap"
    v-bind:has-add="addColumn"
    v-bind:has-arrange="hasArrangement"
  >
    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Main Slot ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    <slot></slot>

    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Placeholder ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    <div
      v-if="addColumn && SHOW_EDIT_TOOLS && !object.columns?.length"
      style="
        min-height: 48px;
        opacity: 0.5;
        text-align: center;
        text-transform: uppercase;
        display: flex;
        align-items: center;
      "
    >
      <v-icon class="me-1">library_add</v-icon> You can add columns here...
    </div>

    <!-- <v-col
      v-if="addColumn && SHOW_EDIT_TOOLS"
      key="add"
      class="add-col"
      @click="addItemToArray(object.columns, initialNewColumn)"
    >
      <v-icon dark>add</v-icon>
    </v-col>-->
  </v-row>
</template>

<script>
import * as types from "@app-page-builder/src/types";

export default {
  name: "XRow",
  components: {},

  props: {
    object: { required: true },
    path: { required: true /*Required for v-styler*/ },

    addColumn: {
      // set initial column : this.$section.__initialNewColumn
      type: Boolean, default: false },
    hasArrangement: { type: Boolean, default: false },

    hasWrap: { type: Boolean, default: false },

    initialNewColumn: {
      default: () => {
        return {
          title: types.Title,
          image: types.Image,
          content: types.Text,
          grid: {
            mobile: 12,
            tablet: null,
            desktop: null,
            widescreen: null,
          },
        };
      },
    },
  },
  data: () => ({}),
  created() {
    this.$section.__initialNewColumn = this.initialNewColumn;
  },
  methods: {
    /*  applyStylerDirective() {
      if (this.hasArrangement) {
        console.log("applyStylerDirective");
        return { "v-styler:row": this.object.row };
      }
      return {};
    },*/
  },
};
</script>

<style scoped lang="scss">
.x--row {
  &.-no-wrap {
    flex-wrap: nowrap;
    overflow: auto;
  }
}
</style>

<style lang="scss">
.x--row {
  height: inherit;
  min-height: inherit;
  max-height: inherit;
}
</style>
