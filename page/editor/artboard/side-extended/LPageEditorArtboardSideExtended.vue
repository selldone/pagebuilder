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
      '-single': !aiAutoFillFunction && !hasNote,
      '-double':
        (!aiAutoFillFunction && hasNote) || (aiAutoFillFunction && !hasNote),
      '-triple': aiAutoFillFunction && hasNote,
    }"
    class="x-feeder"
    dir="ltr"
  >
    <v-btn
      class="x-feeder-btn hover-scale-small force-top ml-6"
      color="#000"
      icon
      size="x-large"
      variant="flat"
      @click="$emit('click:feeder')"
    >
      <v-icon size="36">donut_large</v-icon>
      <v-tooltip
        activator="parent"
        content-class="bg-black text-start"
        location="bottom"
        :open-delay="500"
      >
        <b>Feed</b><br />
        Simple edit section contents.
      </v-tooltip>
    </v-btn>

    <u-button-ai-small
      v-if="aiAutoFillFunction"
      :loading="loading_ai"
      class="x-feeder-btn hover-scale-small force-top ml-6"
      icon
      tooltip="<b>AI</b><br>Auto generate contents."
      tooltip-location="bottom"
      x-large
      :open-delay="500"
      @click="autoComplete(section)"
    >
    </u-button-ai-small>

    <v-badge
      v-if="hasNote"
      :content="
        numeralFormat(
          notes?.filter((n) => n.element_id === section.uid)?.length,
          '0a',
        )
      "
      :model-value="
        notes?.filter((n) => n.element_id === section.uid)?.length > 0
      "
      color="#000"
    >
      <v-btn
        :color="
          notes?.filter((n) => n.element_id === section.uid)?.length
            ? 'amber'
            : '#000'
        "
        class="x-feeder-btn hover-scale-small force-top"
        icon
        size="x-large"
        variant="flat"
        @click="$emit('click:note')"
      >
        <v-icon size="36">sticky_note_2</v-icon>
        <v-tooltip
          activator="parent"
          content-class="bg-black"
          location="bottom"
          :open-delay="500"
        >
          <b>Message</b> ({{
            notes?.filter((n) => n.element_id === section.uid)?.length
          }})<br />

          Write a reminder note or message to your agency.
        </v-tooltip>
      </v-btn>
    </v-badge>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UButtonAiSmall from "@selldone/components-vue/ui/button/ai/small/UButtonAiSmall.vue";

export default defineComponent({
  name: "LPageEditorArtboardSideExtended",
  components: {
    UButtonAiSmall,
  },

  emits: ["click:note", "click:feeder"],
  props: {
    section: Object,
    aiAutoFillFunction: Boolean,
    hasNote: Boolean,
    notes: Array,
  },
  data() {
    return {
      loading_ai: false,
    };
  },

  methods: {
    autoComplete(section) {
      const promise = this.aiAutoFillFunction(section);
      if (!promise) return;

      // console.log("section -> ", section);
      this.loading_ai = true;

      promise
        .then((generated) => {
          console.log("🆎 AI created content.", section, generated);
          Object.assign(section.data, generated);
        })

        .finally(() => {
          this.loading_ai = false;
        });
    },
  },
});
</script>

<style scoped lang="scss"></style>
