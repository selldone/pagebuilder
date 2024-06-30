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
  <v-row
    v-styler:row="rowBinding"
    :align-content="object.data ? object.data.align : 'center'"
    :align="object.data ? object.data.align : 'center'"
    :justify="object.data ? object.data.justify : 'space-around'"
    class="x--row"

    :class="[object?.classes, {'-no-wrap': hasWrap && object.data?.no_wrap, 'is-editable': $builder.isEditing }]"
    :style="[object?.style, backgroundStyle(object.background)]"

  >
    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Main Slot ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    <slot></slot>

    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Placeholder ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    <v-col cols="12"
      v-if="addColumn && SHOW_EDIT_TOOLS && !object.children?.length"
      style="
        min-height: 48px;
        opacity: 0.5;
        text-align: center;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        justify-content: center;
      "
    >
      <v-icon class="me-1">library_add</v-icon>
      You can add columns here...
    </v-col>
  </v-row>
</template>

<script>
import * as types from "../../../src/types/types";
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "../../../mixins/x-component/LMixinXComponent";
import { defineComponent } from "vue";

export default defineComponent({
  name: "XRow",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],
  components: {},

  props: {
    object: { required: true },

    addColumn: {
      type: Boolean,
      default: true,
    },
    hasArrangement: { type: Boolean, default: true },

    hasWrap: { type: Boolean, default: true },
    hasFluid: { type: Boolean, default: true },

    columnStructure: {
      type: Array,
      default: () => [
        'h3',   'img','p'
      ],
    },

    /**
     * Set the location of the proper
     */
    position:{},
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
        position:this.position
      };
    },
  },
  created() {},
  methods: {},
});
</script>

<style lang="scss" scoped>
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
