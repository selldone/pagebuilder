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
    :class="{ '-no-wrap': hasWrap && object.row?.no_wrap }"
    v-styler:row="rowBinding"
    class="x--row"
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
      <v-icon class="me-1">library_add</v-icon>
      You can add columns here...
    </div>
  </v-row>
</template>

<script>
import * as types from "@app-page-builder/src/types";
import StylerDirective from "@app-page-builder/styler/StylerDirective";
import XMixin from "@app-page-builder/mixins/XMixin";
import { defineComponent } from "vue";

export default defineComponent({
  name: "XRow",
  directives: { styler: StylerDirective },
  mixins: [XMixin],
  components: {},

  props: {
    object: { required: true },
    path: { required: true /*Required for v-styler*/ },

    addColumn: {
      type: Boolean,
      default: false,
    },
    hasArrangement: { type: Boolean, default: false },

    hasWrap: { type: Boolean, default: false },
    hasFluid: { type: Boolean, default: false },

    columnStructure: {
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

  computed: {
    /**
     * 🐍 Use compute for better performance.
     * @return {{target: *}}
     */
    rowBinding() {
      return {
        target: this.object,
        columnStructure: this.columnStructure,
        hasWrap: this.hasWrap,
        hasAdd: this.addColumn,
        hasArrangement: this.hasArrangement,
        hasFluid: this.hasFluid,
      };
    },
  },
  created() {},
  methods: {},
});
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
