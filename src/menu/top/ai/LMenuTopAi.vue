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
  <!-- ▃▃▃▃▃▃▃▃▃▃ AI ▃▃▃▃▃▃▃▃▃▃ -->

  <u-button-ai-small
    :tooltip="null"
    @click="show_prompt = true"
    size="36"
    v-bind="$attrs"
  >
    <v-tooltip
      activator="parent"
      content-class="text-start small pa-3 bg-black"
      location="bottom"
      max-width="420"
      :open-delay="500"
    >
      <b class="d-block"> AI Assistance </b>
      Utilize this tool to configure prompts, AI models, and plugins, enabling
      the automatic generation of text, images, and sections with the help of
      your AI assistant.
      <ol class="my-1">
        <li>Enter page prompt.</li>
        <li>
          Set custom prompt by adding
          <span style="font-size: 1.3em">🆕</span> or <code>prompt:</code> to
          fields. (optional)
        </li>
        <li>
          Click on the
          <img
            :height="24"
            :width="24"
            class="mx-1"
            src="../../../../../components-vue/assets/icons/ci-logo.png"
          />left side of the section.
        </li>
      </ol>
    </v-tooltip>
  </u-button-ai-small>

  <v-bottom-sheet
    v-model="show_prompt"
    max-width="1420"
    content-class="rounded-t-xl"
  >
    <v-card rounded="t-xl" class="text-start" color="#212121">
      <v-card-title>
        <v-icon>lightbulb</v-icon>
        <span class="ms-2">My AI Copywriter</span>
      </v-card-title>
      <v-card-text>
        <div class="pa-3 pa-sm-5">
          <div class="d-flex">
            <v-spacer></v-spacer>
            <b-ai-model-input
              model-value="chatgpt"
              class="max-w-300"
              hide-details
              label="label"
              variant="outlined"
              single-line
            >
            </b-ai-model-input>
          </div>

          <v-textarea
            v-model="page.prompt"
            :counter="512"
            :rows="3"
            :rules="[GlobalRules.counter(512)]"
            auto-grow
            class="mt-3"
            hide-details
            persistent-placeholder
            placeholder="Write short about this page..."
            variant="solo-filled"
            bg-color="#2f2f2f"
            rounded="lg"
          >
          </v-textarea>

          <u-smart-suggestion
            :samples="samples"
            class="mt-2 mb-4"
            @select="(v) => (page.prompt = v)"
          >
          </u-smart-suggestion>
          <ol class="my-3 text-start">
            <li>
              Write a prompt describing the page you want to create. What is the
              purpose of this page, and what does your brand represent?
            </li>
            <li>
              Click on the AI button on the left side of each section, and we
              will automatically generate content and replace the existing text.
            </li>
          </ol>
        </div>
      </v-card-text>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="show_prompt = false">
            <v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import UButtonAiSmall from "@selldone/components-vue/ui/button/ai/small/UButtonAiSmall.vue";
import USmartSuggestion from "@selldone/components-vue/ui/smart/suggestion/USmartSuggestion.vue";
import BAiModelInput from "@selldone/components-vue/backoffice/ai/model/input/BAiModelInput.vue";
import { EventBus } from "@selldone/components-vue/utils/events/EventBus.ts";

export default defineComponent({
  name: "LMenuTopAi",
  components: {
    UButtonAiSmall,
    USmartSuggestion,
    BAiModelInput,
  },
  inject: ["$builder", "$shop"],
  props: {},

  data: () => ({
    show_prompt: false,

    auto_generate_busy: false,
  }),

  computed: {
    page() {
      return this.$builder.model;
    },

    is_page() {
      return this.$builder.isPage();
    },

    is_menu() {
      return this.$builder.isMenu();
    },

    samples() {
      return this.$tm("suggestions.page.prompts")?.map((prompt) => {
        return prompt.replace("{shop}", this.$shop.title);
      });
    },
  },

  watch: {},

  created() {},

  mounted() {
    EventBus.$on(
      "show:AiPromptDialog",

      ({ show }) => {
        this.show_prompt = show;
      },
    );
  },

  beforeUnmount() {
    EventBus.$off("show:AiPromptDialog");
  },

  methods: {},
});
</script>

<style lang="scss"></style>
