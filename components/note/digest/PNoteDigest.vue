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
  <div v-if="notes?.length" class="d--notes-digest-view">
    <v-list class="border-between-vertical overflow-visible" lines="two">
      <p-note-box
        v-for="note in limited_notes"
        :key="note.id"
        :class="{ 'hover-scale-small force-top bg-white border-0': hoverAble }"
        :note="note"
        class="fadeIn pp"
        in-shop-admin
        @click="show(note)"
        @delete="DeleteItemByID($builder.model.notes, note.id)"
      >
      </p-note-box>
    </v-list>
    <div
      v-if="limit && notes.length > limit"
      class="text-blue pa-2 pp"
      @click="show(notes[0])"
    >
      {{ $t("global.commons.more") }}...
    </div>
  </div>
</template>

<script lang="ts">
import PNoteBox from "../../../components/note/box/PNoteBox.vue";
import { LMixinNote } from "../../../mixins/note/LMixinNote";
import { Section } from "@selldone/page-builder/src/section/section.ts";

export default {
  name: "PNoteDigest",
  inject: ["$builder"],
  mixins: [LMixinNote],

  components: { PNoteBox },

  props: {

    section: {
      required: true,
      type: Section,
    },

    hoverAble: {
      type: Boolean,
    },
    limit: {},
  },
  data: () => ({}),

  computed: {
    limited_notes() {
      return this.notes.sortByKey("id", false).limit(this.limit);
    },

    notes() {
      return this.$builder.model?.notes?.filter(
        (n) => n.element_id + "" === this.section.uid + "",
      );
    },
  },

  watch: {},
  created() {},
  mounted() {},
  beforeUnmount() {},

  methods: {
    show(note) {
      this.showGlobalShopNoteDialog(note.element_id);
    },
  },
};
</script>

<style lang="scss" scoped>
.d--notes-digest-view {
  text-align: start;
  font-family: var(--font);
}
</style>
