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
    :class="[
      object?.classes,
      {
        '-no-wrap': hasWrap && object.data?.no_wrap,
        'is-editable': $builder.isEditing,
        '-reverse': object.data?.reverse,
      },
    ]"
    :style="[object.style, background_style]"
    placeholder="[Row] Drag & Drop.."
  >
    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Main Slot ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    <slot></slot>

  </v-row>
</template>

<script>
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "../../../mixins/x-component/LMixinXComponent";
import { defineComponent } from "vue";
import { XRowObject } from "@selldone/page-builder/components/x/row/XRowObject.ts";

export default defineComponent({
  name: "XRow",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],
  components: {},

  props: {
    object: { type: XRowObject, required: true },

    addColumn: {
      type: Boolean,
      default: true,
    },
    hasArrangement: { type: Boolean, default: true },

    hasWrap: { type: Boolean, default: true },
    hasFluid: { type: Boolean, default: true },
    /*
        columnStructure: {
          type: Array,
          default: () => ["h3", "img", "p"],
        },*/
  },
  data: () => ({
    /**
     * Set the location of the proper
     */
    //position: "right-start",
  }),

  computed: {
    /*  columnStructure() {
        const child = this.object.children.length
          ? this.object.children[this.object.children.length - 1]
          : null;
  
        if (!child || !child.children.length) return ["h3", "img", "p"];
  
        // Auto create from sample:
        console.log("🐍 Auto create from sample child:", child);
        return child.children
          .map((child) => {
            if (child instanceof XTextObject) return child.data.tag;
            if (child instanceof XUploaderObject) return "img";
            return null;
          })
          .filter((v) => !!v); // Remove null!
      },*/
    /**
     * 🐍 Use compute for better performance.
     * @return {{target: *}}
     */
    rowBinding() {
      return {
        target: this.object,
        //  columnStructure: this.columnStructure,
        hasWrap: this.hasWrap,
        hasAdd: this.addColumn,
        hasArrangement: this.hasArrangement,
        hasFluid: this.hasFluid,
        position: this.getLocation(),
      };
    },
  },

  watch: {
    "object.style.alignItems"(val) {
      // Update when style change!
      this.object.data.align = val;
    },
    "object.style.justifyContent"(val) {
      // Update when style change!
      this.object.data.justify = val;
    },
  },

  mounted() {
    //   this.setLocation();
  },
  methods: {
    /**
     * Not work! Live update position is not working!
     */
    getLocation() {
      // Get all parents of the element
      const count = this.countXRowElements(this.object) % 4;

      const position =
        count === 0
          ? "right-start"
          : count === 1
            ? "right-center"
            : count === 2
              ? "right-end"
              : "top-start";

      //console.log("count -->", count, position);
      return position;
    },

    countXRowElements(object) {
      let count = -1; // Ignore self!

      function findParents(obj) {
        // Check if the current object is an XRow and increment the count if true
        if (obj.component === "XRow") {
          count++;
        }

        // Recursively check the children
        if (obj.children && obj.children.length && count < 10) {
          obj.children.forEach((child) => {
            findParents(child);
          });
        }
      }

      // Start the recursion with the provided object
      findParents(object);

      return count;
    },
  },
});
</script>

<style lang="scss" scoped>
.x--row {
  &.-no-wrap {
    flex-wrap: nowrap;
    overflow: auto;
  }

  &.-reverse {
    flex-direction: row-reverse;
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
