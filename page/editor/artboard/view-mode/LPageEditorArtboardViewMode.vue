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
  <div
    :class="{
      '-scale-down': !fullscreen,
      '-small': $vuetify.display.xs,
    }"
    class="side-menu zoomIn"
  >
    <b>View</b>
    <v-btn
      :color="!renderMode ? 'amber' : undefined"
      icon
      variant="text"
      @click="$emit('update:renderMode', null)"
    >
      <v-icon>burst_mode</v-icon>
    </v-btn>
    <v-btn
      :color="renderMode === 'simple' ? 'amber' : undefined"
      icon
      variant="text"
      @click="$emit('update:renderMode', 'simple')"
    >
      <v-icon>apps</v-icon>
    </v-btn>
    <v-btn
      :color="renderMode === 'wire' ? 'amber' : undefined"
      icon
      variant="text"
      @click="$emit('update:renderMode', 'wire')"
    >
      <v-icon>grid_on</v-icon>
    </v-btn>

    <v-expand-transition>
      <div v-if="renderMode === 'wire'" class="d-flex flex-column">
        <hr />
        <v-btn
          :color="show_classes ? '#512DA8' : undefined"
          class="mb-3"
          icon
          variant="text"
          @click="
            show_classes = !show_classes;
            show_styles = false;
          "
        >
          <v-icon>architecture</v-icon>
          <v-tooltip
            content-class="bg-deep-purple-accent-3"
            activator="parent"
            location="right"
            :open-delay="500"
            >Show Classes
          </v-tooltip>
        </v-btn>
        <v-btn
          :color="show_styles ? '#512DA8' : undefined"
          class="mb-3"
          icon
          variant="text"
          @click="
            show_styles = !show_styles;
            show_classes = false;
          "
        >
          <v-icon>format_paint</v-icon>
          <v-tooltip
            content-class="bg-deep-purple-accent-3"
            activator="parent"
            location="right"
            :open-delay="500"
            >Show Style
          </v-tooltip>
        </v-btn>
      </div>
    </v-expand-transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LPageEditorArtboardViewMode",
  emits: ["update:renderMode"],
  props: {
    fullscreen: Boolean,
    renderMode: String,
  },
});
</script>

<style scoped lang="scss">
.side-menu {
  position: absolute;
  right: -80px;
  top: 140px;
  background: #7577fa;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  padding: 4px;
  text-align: center;
  transition: all ease-in-out 0.25s;
  transition-delay: 0s;
  font-size: 10px;
  color: #fff;

  &.-scale-down {
    right: calc(25% - 64px);
    transition-delay: 0.1s;
    transition-duration: 0.5s;
  }

  &.-small {
    font-size: 8px;
    right: calc(25% - 48px);
    top: 100px;

    .v-btn {
      --v-btn-height: 20px;
    }
  }
}


</style>
