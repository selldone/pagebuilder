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
    <v-card rounded="t-xl">
      <v-card-text>
        <div class="pa-3 pa-sm-5">
          <div class="d-flex">
            <v-spacer></v-spacer>
            <b-ai-model-input
              v-model="ai_model"
              class="max-w-300"
              hide-details
              label="label"
              variant="outlined"
            >
            </b-ai-model-input>
          </div>

          <v-textarea
            v-model="page.prompt"
            :counter="512"
            :rows="2"
            :rules="[GlobalRules.counter(512)]"
            auto-grow
            class="mt-3"
            hide-details
            label="Prompt"
            persistent-placeholder
            placeholder="Write short about this page..."
            style="font-size: 1.2em; font-weight: 600"
            variant="underlined"
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
            <li>
              To customize each prompt of the fields in the sections, use the
              following pattern: <code>prompt: write your prompt...</code> or
              <code>🆕write your prompt...</code>.
            </li>
          </ol>

          <div v-if="false" class="widget-buttons mb-3">
            <v-btn
              :loading="auto_generate_busy"
              size="x-large"
              variant="outlined"
              @click="autoGenerate"
            >
              Auto Generate Page
            </v-btn>
          </div>
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

export default defineComponent({
  name: "LMenuTopAi",
  components: {
    UButtonAiSmall,
    USmartSuggestion,
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

  methods: {
    autoGenerate() {
      // Require prompt:
      if (!this.page.prompt) {
        this.show_prompt = true;
        this.showWarningAlert(
          "Enter Prompt Please",
          "Kindly set a prompt for the page before proceeding.",
        );
        return;
      }

      // ┣━━━━━━━━━━━━━━━━━━━━━━━━━━ AI / Auto generate page  ━━━━━━━━━━━━━━━━━━━━━━━━━━┫
      console.log("🆎 AI / Auto generate page.");
      let url = null;
      if (this.$shop)
        url = window.API.POST_AI_PAGE_BUILDER_AUTO_GENERATE(
          this.$shop.id,
          this.page.id,
        );
      else if (this.isOfficialPage)
        url = window.ADMIN_API.POST_ADMIN_AI_PAGE_BUILDER_AUTO_GENERATE(
          this.page.id,
        );
      else return;

      this.auto_generate_busy = true;

      axios
        .post(url)
        .then(({ data }) => {
          if (data.error) {
            this.showErrorAlert(null, data.error_msg);
          } else {
            this.$builder.loadPage(data.page);

            this.showSuccessAlert(
              "Build completed",
              "Page successfully auto created and loaded.",
            );
          }
        })
        .catch((error) => {
          this.showLaravelError(error);
        })
        .finally(() => {
          this.auto_generate_busy = false;
        });
    },
  },
});
</script>

<style lang="scss"></style>
