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
  <div class="widget-box mb-5">
    <s-widget-header :title="title" icon="view_agenda"></s-widget-header>
    <v-list-subheader
      >Enter column values here and adjust their size according to your
      customization preferences.
    </v-list-subheader>
    <div class="border-between-vertical-white-space">
      <div v-for="(_column, i) in column.columns" :key="i">
        <v-list-subheader>
          <div class="flex-grow-1">
            <v-icon>arrow_drop_down</v-icon>
            Contents of sub-column {{ i + 1 }}.
          </div>
          <v-avatar v-if="_column.image?.src" rounded size="42">
            <v-icon v-if="_column.image.src.includes('{{')">tonality</v-icon>
            <img v-else :src="getShopImagePath(_column.image.src)"
          /></v-avatar>
        </v-list-subheader>

        <v-text-field
          v-if="hasTitle(_column)"
          v-model="_column.title"
          label="Title"
          variant="underlined"
        ></v-text-field>
        <v-textarea
          v-if="hasContent(_column)"
          v-model="_column.content"
          :rows="2"
          auto-grow
          label="Content"
          variant="underlined"
        ></v-textarea>

        <feeder-grid-input
          v-if="hasGrid(_column)"
          v-model:grid="_column.grid"
        ></feeder-grid-input>

        <!-- ████████████████████ Image ████████████████████ -->

        <feeder-image v-if="hasImage(_column)" v-model="_column.image">
        </feeder-image>
      </div>
    </div>
  </div>
</template>

<script>
import FeederGridInput from "@app-page-builder/src/feeders/FeederGridInput.vue";
import FeederImage from "@app-page-builder/src/feeders/FeederImage.vue";

export default {
  name: "FeederColumn",
  components: { FeederImage, FeederGridInput },
  emits: ["column:update"],
  props: {
    title: { default: "Column" },
    column: { required: true },
  },
  methods: {
    update() {
      this.$emit("column:update", this.column);
    },

    hasTitle(_column) {
      return _column.title !== undefined;
    },
    hasGrid(_column) {
      return _column.grid !== undefined;
    },
    hasContent(_column) {
      return _column.content !== undefined;
    },
    hasImage(_column) {
      return (
        _column.image !== undefined &&
        !["x-layout-title-content", "x-layout-content-title"].includes(
          _column?.layout,
        )
      );
    },
  },
};
</script>

<style scoped></style>
