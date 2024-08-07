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
      @click.stop="ShowLFeederDialog(section)"
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
        @click="showWriteNote()"
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
import { LMixinNote } from "@selldone/page-builder/mixins/note/LMixinNote.ts";
import { LMixinEvents } from "@selldone/page-builder/mixins/events/LMixinEvents.ts";
import {Section} from "@selldone/page-builder/src/section/section.ts";

export default defineComponent({
  name: "LPageEditorArtboardSideExtended",
  mixins: [LMixinNote, LMixinEvents],
  components: {
    UButtonAiSmall,
  },
  inject: ["$builder"],
  emits: ["click:note"],
  props: {
    section: Object,
    aiAutoFillFunction: Boolean,
    notes: Array,

  },
  data() {
    return {
      loading_ai: false,
    };
  },

  computed: {
    hasNote() {
      return this.$builder.type === "page" || this.$builder.type === "popup";
    },
  },

  methods: {
    autoComplete(section:Section) {
      const promise = this.aiAutoFillFunction(section);
      if (!promise) return;

      // console.log("section -> ", section);
      this.loading_ai = true;

      promise
        .then((generated) => {
          console.log("🆎 AI created content.", section, generated);
          section.object.updateObjectWithFeed(generated.object)
        })

        .finally(() => {
          this.loading_ai = false;
        });
    },

    //――――――――――――――――――――――  Note ――――――――――――――――――――

    showWriteNote() {
      this.showGlobalShopNoteDialog(this.section.uid);
    },
  },
});
</script>

<style scoped lang="scss">
.x-feeder {
  display: flex;
  align-items: center;

  position: absolute;
  //top: -18px;
  top: 100px;
  flex-direction: row-reverse;

  --margin-left-bar: 0;
  --width-bar: 0;
  --left: 0;

  left: var(--left);

  &:before {
    content: "";
    height: 4px;
    background: #0d0d0d;
    width: var(--width-bar);
    margin-left: var(--margin-left-bar);
    pointer-events: none;
  }

  &.-single {
    --margin-left-bar: -50px;
    --width-bar: 150px;
    --left: -200px;
  }

  &.-double {
    --margin-left-bar: -100px;
    --width-bar: 224px;
    --left: -290px;
  }

  &.-triple {
    --margin-left-bar: -175px;
    --width-bar: 290px;
    --left: -370px;
  }

  .x-feeder-btn {
    background: #0d0d0d;
    border-radius: 50%;
    position: relative;
    z-index: 1;

    .v-icon {
      transition: all 0.3s;
    }

    &:hover {
      .v-icon {
        transform: rotate(120deg);
      }
    }
  }
}
</style>
