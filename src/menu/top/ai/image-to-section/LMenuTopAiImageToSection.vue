<!--
  - Copyright (c) 2023-2025. Selldone® Business OS™
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

    <v-btn @click="dialog_image_to_section = true" color="#673AB7" rounded size="small" class="tnt" v-bind="$attrs" prepend-icon="bolt">
      AI | Image to Section
    </v-btn>

  <!-- ████████████████████ Dialog > Image to Section AI ████████████████████ -->

  <v-dialog v-model="dialog_image_to_section" fullscreen scrollable>
    <v-card class="text-start">
      <v-card-title>
        <v-icon class="me-2">bolt</v-icon>
        AI | Image to Section
      </v-card-title>
      <v-card-text>

        <u-loading-progress v-if="uploading "></u-loading-progress>

        <p>
          Drag and drop (or past) an image to the uploader below. The AI will
          analyze the image and create a new section based on it.
        </p>
        <s-image-uploader
          :allow-multiple="false"
          :dark="false"
          :headers="{}"
          :placeholder-image="require('./assets/upload.svg')"
          :server="
            window.API.POST_AI_PAGE_BUILDER_IMAGE_TO_COMPONENT(
              $shop.id,
              page.id,
            )
          "
          max-file-size="8MB"
          min-height="320px"
          paramName="photo"
          no-svg
          @onAddFile="onAddFile"
          @onError="uploading = false"
          @onProcessFileAbort="onAbortUpload"
          @onProcessFileStart="onStartUpload"
          @response="handleAiUploadImage"
        ></s-image-uploader>
      </v-card-text>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn
            size="x-large"
            variant="text"
            @click="dialog_image_to_section = false"
          >
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import NotificationService from "@selldone/components-vue/plugins/notification/NotificationService.ts";

import { LMixinEvents } from "../../../../../mixins/events/LMixinEvents.ts";
import UDenseCirclesUsers from "@selldone/components-vue/ui/dense-circles/users/UDenseCirclesUsers.vue";
import UButtonAiLarge from "@selldone/components-vue/ui/button/ai/large/UButtonAiLarge.vue";
import ClubMixin from "@selldone/components-vue/mixin/club/ClubMixin.ts";
import SImageUploader from "@selldone/components-vue/ui/uploader/SImageUploader.vue";
import { XSectionObject } from "@selldone/page-builder/components/x/section/XSectionObject.ts";
import { XCodeObject } from "@selldone/page-builder/components/x/code/XCodeObject.ts";
import { Section } from "@selldone/page-builder/src/section/section.ts";

export default {
  name: "LMenuTopAiImageToSection",
  mixins: [LMixinEvents, ClubMixin],
  components: {
    UDenseCirclesUsers,
    UButtonAiLarge,
    SImageUploader,
  },

  emits: ["click:save"],
  inject: ["$builder", "$shop"],
  props: {
    page: {
      require: true,
    },
  },

  data: () => ({
    uploading: false,
    dialog_image_to_section: false,
  }),

  computed: {},

  watch: {},

  methods: {
    handleAiUploadImage(response) {
      this.uploading = false;

      if (response.error) {
        NotificationService.showErrorAlert(null, response.error_msg);
        return;
      }
      NotificationService.showSuccessAlert(
        "Create Section",
        "The new section has been added to the page.",
      );

      console.log("response --->", response);

      // Add new section to the page:
      const section_obj = XSectionObject.Seed();
      section_obj.classes = ["pa-0"];

      const code = XCodeObject.Seed();
      code.data.code = response.code;
      code.data.mode = "vue";
      section_obj.addChild(code);

      console.log("section_obj", section_obj);
      const section = new Section({});
      section.object = section_obj;

      console.log("section-->", section);

      this.$builder.add(section, 0, true);

      this.dialog_image_to_section = false;
    },

    onAddFile({ error, file }) {
      this.uploading = true;
    },

    onStartUpload(file) {
      this.uploading = true;
      //console.log("onStartUpload", file);
    },
    onAbortUpload(file) {
      this.uploading = false;

      //console.log("onAbortUpload", file);
    },
  },

  created() {},
};
</script>

<style lang="scss" scoped></style>
