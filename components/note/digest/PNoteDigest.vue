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
        :shop="shop"
        class="fadeIn pp"
        in-shop-admin
        @click="show(note)"
        @delete="$emit('delete', note.id)"
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

<script>
import PNoteBox from "@app-page-builder/components/note/box/PNoteBox.vue";
import { LMixinNote } from "@app-page-builder/mixins/note/LMixinNote";

export default {
  name: "PNoteDigest",
  mixins: [LMixinNote],

  components: { PNoteBox },
  emits: ["delete"],
  props: {
    shop: {
      required: true,
    },
    notes: {
      required: false,
      type: Array,
    },
    hoverAble: {
      type: Boolean,
    },
    limit: {},

    page: {
      // Assigned target.
    },
    popup: {
      // Assigned target.
    },
  },
  data: () => ({}),

  computed: {
    limited_notes() {
      return this.notes.sortByKey("id", false).limit(this.limit);
    },
  },

  watch: {},
  created() {},
  mounted() {},
  beforeUnmount() {},

  methods: {
    show(note) {
      this.showGlobalShopNoteDialog(
        this.notes,
        note.element_id,
        this.page?.id,
        this.popup?.id,
      );
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
