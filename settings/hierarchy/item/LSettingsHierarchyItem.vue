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
  <div
    class="l--settings-hierarchy-item py-1 my-1 border-start ps-2"
    @mouseenter="onHoverIn"
    @mouseleave="onHoverOut"
  >
    <div >
      {{ object.component }}

      <v-btn
        v-if="object.classes && has_classes"
        size="x-small"
        :color="
          object.classes?.length ||
          (object.style && Object.keys(object.style).length)
            ? '#303F9F'
            : '#000'
        "
        class="ms-1 tnt"
        @click="showMasterDesignDialog()"
      >
        Class & Style
      </v-btn>
    </div>

    <l-settings-hierarchy-item
      v-for="(child, index) in object.children"
      :key="index"
      :object="child"
      class="ms-3"
    >
    </l-settings-hierarchy-item>
  </div>
</template>

<script>
import { LModelElement } from "@selldone/page-builder/models/element/LModelElement.ts";
import { LMixinEvents } from "@selldone/page-builder/mixins/events/LMixinEvents.ts";

export default {
  name: "LSettingsHierarchyItem",
  mixins: [LMixinEvents],

  components: {
    LSettingsHierarchyItem: () => import("./LSettingsHierarchyItem.vue"),
  },
  emits: ["hover-in", "hover-out"],
  props: {
    object: { type: LModelElement, required: true },
  },
  data: () => ({
    dialog: false,
    callback: null,
  }),

  computed: {
    has_classes(){
      return this.object.$element?.classList
    }
  },

  watch: {},
  created() {},
  mounted() {},

  methods: {
    onHoverIn(event){
      if(!this.has_classes){

      //  console.error('onHoverIn objects',this.object)
        return
      }
    //  console.log('onHoverIn objects',this.object)
      this.object.$element?.classList.add('element-focus-editing')
    },
    onHoverOut(event){
      if(!this.has_classes){

       // console.error('onHoverOut objects',this.object)
        return
      }
     //  console.log('onHoverOut objects',this.object)
      this.object.$element?.classList.remove('element-focus-editing')
    },

    showMasterDesignDialog() {
      const el = this.object.$element;
      console.log("showMasterDesignDialog > Element", el);
      this.ShowLSettingsClassStyle(
        el,
        el,
        this.object,
        `style`,
        `classes`,
        "background",
        null,

        //   { noSize:this.type === "container" } // Not show size ! conflict with container size!
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.l--settings-hierarchy-item{
  font-size: 0.7rem;
  //cursor: pointer;
  user-select: none;

  &:hover{
    border-width: 4px !important;
  }
}
</style>
