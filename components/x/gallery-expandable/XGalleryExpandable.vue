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
  <div class="container-gallery">
    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Main Slot ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->

    <x-component
      v-for="(col, index) in object.children"
      :key="index"
      :object="col"
      :augment="augment"
      :remove-child="() => object.children.splice(index, 1)"
    >
    </x-component>
  </div>
</template>

<script>
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "../../../mixins/x-component/LMixinXComponent";
import { defineComponent } from "vue";
import DataXDirective from "../../../directives/DataXDirective";
import { XGalleryExpandableObject } from "@selldone/page-builder/components/x/gallery-expandable/XGalleryExpandableObject.ts";
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";

export default defineComponent({
  name: "XGalleryExpandable",
  directives: { styler: StylerDirective, "data-x": DataXDirective },
  mixins: [LMixinXComponent],
  components: { XComponent },

  props: {
    object: {
      type: XGalleryExpandableObject,
      required: true,
    },
    augment: {},

    removeChild: {
      // Used in v-styler
      type: Function,
    },
  },
  created() {},

  methods: {},
});
</script>

<style scoped lang="scss">
.container-gallery {
  display: flex;
  width: 100%;
  padding: 4% 2%;
  box-sizing: border-box;
  height: 70vh;
  max-height: 840px;
}
</style>
