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

<template xmlns:v-styler="http://www.w3.org/1999/xhtml">
  <x-section :object="$sectionData">
    <x-container :object="$sectionData">
      <x-row :object="$sectionData" has-arrangement has-fluid>
        <!-- ██████████████████████ Column 1 ██████████████████████ -->

        <x-column
          :object="$sectionData.columns[0]"
        >
          <x-text
            v-model:object="$sectionData.columns[0].title"
            :augment="augment"
            initial-type="h1"
            :initial-classes="['mb-2']"
          ></x-text>

          <x-text
            v-model:object="$sectionData.columns[0].content"
            :augment="augment"
            initial-type="p"
            :initial-classes="['mb-4']"
          ></x-text>

          <v-expand-transition>
            <div v-if="success" key="1">
              <x-text
                v-model:object="$sectionData.newsletter.success_msg"
                :augment="augment"
                initial-type="p"
                :initial-classes="['my-4']"
              ></x-text>
            </div>
            <div v-else key="2">
              <v-text-field
                v-model="email"
                v-styler:input="$sectionData.newsletter.input"
                :bg-color="$sectionData.newsletter.input.backgroundColor"
                :color="$sectionData.newsletter.input.color"
                :flat="$sectionData.newsletter.input.flat"
                :hint="$sectionData.newsletter.input.hint"
                :label="$sectionData.newsletter.input.label"
                :messages="
                  $sectionData.newsletter.input.messages
                    ? $sectionData.newsletter.input.messages
                    : undefined
                "
                :persistent-placeholder="
                  $sectionData.newsletter.input.persistentPlaceholder
                "
                :placeholder="$sectionData.newsletter.input.placeholder"
                :rounded="$sectionData.newsletter.input.rounded"
                :rules="[GlobalRules.email(), GlobalRules.required()]"
                :variant="
                  $sectionData.newsletter.input.solo
                    ? 'solo'
                    : $sectionData.newsletter.input.outlined
                      ? 'outlined'
                      : $sectionData.newsletter.input.filled
                        ? 'filled'
                        : undefined
                "
                class="x--input max-w-400 mx-auto"
              ></v-text-field>

              <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Start Column Action Button ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
              <div
                :style="{
                  textAlign: $sectionData.button?.align,
                }"
              >
                <x-button
                  v-if="$sectionData.button"
                  v-styler:button="{
                    target: $sectionData.button,
                    hasAlign: true,
                    noLink: true,
                  }"
                  :augment="augment"
                  :btn-data="$sectionData.button"
                  :editing="$builder.isEditing && !$builder.isHideExtra"
                  :loading="busy"
                  class="m-2"
                  @click="$builder.isEditing ? undefined : submit()"
                >
                </x-button>
              </div>
            </div>
          </v-expand-transition>

          <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Edit Menu ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->

          <v-sheet
            v-if="$builder.isEditing && !$builder.isHideExtra"
            class="inline-editor-sheet absolute-bottom-end op-0-3 op1h"
            theme="dark"
          >
            <v-btn
              class="tnt ma-1"
              variant="outlined"
              @click.stop="toggleMode()"
            >
              <v-icon start>flip_camera_android</v-icon>
              {{ success ? "Show form" : "Show success" }}
            </v-btn>
          </v-sheet>
        </x-column>
      </x-row>
    </x-container>
  </x-section>
</template>

<script>
import * as types from "../../../src/types/types";
import XButton from "../../../components/x/button/XButton.vue";
import StylerDirective from "../../../styler/StylerDirective";
import LMixinSection from "../../../mixins/section/LMixinSection";
import XText from "@selldone/page-builder/components/x/text/XText.vue";
import XSection from "@selldone/page-builder/components/x/section/XSection.vue";
import XContainer from "@selldone/page-builder/components/x/container/XContainer.vue";
import XRow from "@selldone/page-builder/components/x/row/XRow.vue";
import XColumn from "@selldone/page-builder/components/x/column/XColumn.vue";

export default {
  name: "LSectionFormNewsletter",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],

  components: {XColumn, XRow, XContainer, XSection, XText, XButton },
  cover: require("../../../assets/images/covers/newsletter.svg"),
  label: "Newsletter",
  help: {
    title:
      "In this section, you can gather email addresses. These collected emails can be found under the Shop > Marketing > Stream tab.",
    video: "/app/videos/page-builder/NewsletterForm.mp4",
  },

  group: "Form",

  $schema: {
    classes: types.ClassList,
    row: types.Row,

    // Background & Style:
    background: types.Background,
    style: types.Style,

    button: types.Button,

    newsletter: types.Newsletter,

    // Columns:
    columns: [
      {
        title: types.Title,
        content: types.Text,

        grid: {
          mobile: 12,
          tablet: 8,
          desktop: 6,
          widescreen: null,
        },
      },
    ],

    /**
     * Set up custom default values, such as classes, when establishing a new section to streamline the initialization process.
     */
    $init: (data) => {
      data.classes = ["d-flex" /*Keep row fill container! Important.*/];
      data.row.align = "center";
      data.style = { minHeight: "35vh" };
    },
  },

  props: {
    id: {
      type: Number,
      required: true,
    },
    augment: {
      // Extra information to show to dynamic show in page content
    },
  },

  data: () => ({
    busy: false,
    success: false,
    email: null,
  }),

  computed: {},
  watch: {},

  created() {},

  methods: {
    submit() {
      if (!this.email) {
        return this.showErrorAlert(
          this.$sectionData.newsletter?.error_dialog?.title
            ? this.$sectionData.newsletter.error_dialog.title
            : "Email is empty!",
          this.$sectionData.newsletter?.error_dialog?.message
            ? this.$sectionData.newsletter.error_dialog.message
            : "Please enter your email address.",
        );
      }
      this.busy = true;

      axios
        .post(window.XAPI.POST_STREAM_USER_ADD_NEWSLETTER(this.getShop().id), {
          email: this.email,
          tags: ["newsletter"],
        })
        .then(({ data }) => {
          if (data.error) {
            console.error(null, data.error_msg);
            return;
          }
          this.success = true;
          return this.showSuccessAlert(
            this.$sectionData.newsletter?.success_dialog?.title
              ? this.$sectionData.newsletter.success_dialog.title
              : "Thanks",
            this.$sectionData.newsletter?.success_dialog?.message
              ? this.$sectionData.newsletter.success_dialog.message
              : "Thank you, we have received your email address for our newsletter.",
          );
        })
        .catch((error) => {
          this.showLaravelError(error);
        })
        .finally(() => {
          this.busy = false;
        });
    },

    toggleMode() {
      this.success = !this.success;
    },
  },
};
</script>

<style lang="scss" scoped></style>
