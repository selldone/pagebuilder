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
  <v-container
    v-styler:container="containerBinding"
    :fluid="object.data ? object.data.fluid : false"
    class="x--container"
    :class="[object?.classes, { 'is-editable': $builder.isEditing }]"
    :style="[
      object?.style,
      background_style,
      { maxWidth: object.data?.fluid ? undefined : maxWidthNormal },
    ]"
    placeholder="[Container] Drag & Drop.."
  >
    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ XContainer > Children ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    <slot></slot>
  </v-container>
</template>

<script lang="ts">
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "../../../mixins/x-component/LMixinXComponent";
import { defineComponent } from "vue";
import { XContainerObject } from "@selldone/page-builder/components/x/container/XContainerObject.ts";

export default defineComponent({
  name: "XContainer",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],
  components: {},

  props: {
    object: { required: true, type: XContainerObject },
    maxWidthNormal: {
      // Override max with (non-fluid)
    },
  },

  data: () => ({}),

  computed: {
    /**
     * 🐍 Use compute for better performance.
     * @return {{target: *}}
     */
    containerBinding() {
      return {
        target: this.object,
        //  position:'left'
      };
    },
  },

  created() {

  },
});
</script>

<style lang="scss">
.x--container {
  height: inherit;
  min-height: inherit;
  max-height: inherit;
}
</style>
