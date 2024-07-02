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
  <component
    :is="component"
    :object="object"
    :augment="augment"
    v-bind="object.props"
  >
    <!--  <div
      v-if="component === 'XSection'"
      class="absolute-top-center bg-white pa-2 z2"
    >
      🌞 NEW 🔽🔽
    </div>-->
    <!-- ━━━━━━━━━━━━ Children ━━━━━━━━━━━━ -->
    <x-component
      v-for="(child, index) in children"
      :object="child"
      :augment="augment"
      :remove-child="() => children.splice(index, 1)"
    >
    </x-component>
  </component>
</template>

<script>
import { defineComponent } from "vue";
import { LModelElement } from "@selldone/page-builder/models/element/LModelElement";

export default defineComponent({
  name: "XComponent",
  props: {
    object: {
      type: LModelElement,
      required: true,
    },
    augment: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    component() {
      return this.object.component;
    },
    children() {
      return this.object.children;
    },
  },
  mounted() {
  },
});
</script>

<style scoped lang="scss"></style>
