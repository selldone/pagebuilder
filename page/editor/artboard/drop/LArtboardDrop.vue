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
    @dragover="(e) => (!$builder.isEditing ? undefined : allowDropSection(e))"
    @drop="(e) => (!$builder.isEditing ? undefined : dropSection(e))"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {LMixinArtboard} from "@selldone/page-builder/mixins/artboard/LMixinArtboard.ts";

export default defineComponent({
  name: "LArtboardDrop",
  mixins: [LMixinArtboard],
  inject: ["$builder"],
  emits: ["onDropOver"],
  props: {
    index: {
      type: Number,
      required: true,
    },
    dropOver: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    //――――――――――――――――――――――  Drop section (pre-built) ――――――――――――――――――――
    dropSection(event) {
      // console.log('dropSection!' ,event)

      const text = event.dataTransfer.getData("section");

      if (text)
        try {
          const json = JSON.parse(text);

          if (json?.object /*V2*/ || json?.data /*V1*/) {
            event.preventDefault();

            this.$builder.add(json, this.index + 1, true);
            this.autoLoadSectionFonts(json);
          }
        } catch (e) {
          this.showErrorAlert(null, e);
        }
      this.$emit("onDropOver", false);

      this.$builder.history.save();
    },

    allowDropSection(event) {
      // Tips:  getData("section") not available on drag over event in chrome , edge ,... security!
      const types = event.dataTransfer.types;

      if (types.includes("section")) {
        event.preventDefault();
        this.$emit("onDropOver", true);

        return true;
      }
    },
  },
});
</script>

<style scoped lang="scss"></style>
