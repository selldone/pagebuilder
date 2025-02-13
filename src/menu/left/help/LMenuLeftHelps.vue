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
  <!-- ████████████████████ Toolbar > Helps ████████████████████ -->

  <v-toolbar
    density="compact"
    color="#222"
    height="52"
    style="border-bottom: solid #111 thin"
  >
    <v-toolbar-title style="font-size: 12px"><b>Helps</b></v-toolbar-title>
  </v-toolbar>

  <div ref="menu" class="l--page-editor-components-menu">
    <div
      class="-groups border-between-vertical mx-2"
      style="--border-color: #000"
    >
      <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Helps ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
      <div v-for="(it, key) in items">
        <s-widget-help  :code="it" color="#fff"></s-widget-help>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SWidgetHelp from "@selldone/components-vue/ui/widget/help/SWidgetHelp.vue";
import { flatMapDeep } from "lodash-es";

export default defineComponent({
  name: "LMenuLeftHelps",
  components: { SWidgetHelp },
  directives: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    items() {
      return this.flattenItems(this.$tm("help.Landing"));
    },
  },
  created() {},

  mounted() {},
  beforeUnmount() {},
  methods: {
    flattenItems(obj) {
      // Flatten the object while preserving 'embed' and 'title' properties
      return flatMapDeep(obj, (value) => {
        if (value.embed && value.title) {
          return { embed: value.embed, title: value.title ,description: value.description,youtube: value.youtube};
        }
        // If the value is an object, recurse into it
        return this.flattenItems(value);
      });
    },
  },
});
</script>

<style lang="scss" scoped></style>
