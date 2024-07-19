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
  <div v-bind="$attrs" class="l--menu-top-tools">
    <!-- ▃▃▃▃▃▃▃▃▃▃ Import ▃▃▃▃▃▃▃▃▃▃ -->

    <lmt-large-button
      @click="show_import = true"
      icon="content_paste_go"
      caption="Import"
      sub-caption=".landing"
    >
      <template v-slot:tooltip>
        <b class="d-block"> Import Landing Page </b>
        <v-icon size="small">folder</v-icon>
        <b class="mx-1">Load: </b> You can import a .landing file, which will
        replace all existing sections with the newly added ones.
      </template>
    </lmt-large-button>

    <v-divider vertical></v-divider>
  </div>

  <!-- ████████████████████ Dialog > Import file ████████████████████ -->
  <v-dialog
    v-model="show_import"
    :max-width="
      $vuetify.display.xlAndUp
        ? 860
        : $vuetify.display.lgAndUp
          ? 620
          : undefined
    "
    :scrim="false"
    color="#1e1e1e"
    dark
  >
    <v-card class="text-start" flat rounded="xl">
      <v-card-title></v-card-title>
      <v-card-text>
        <s-widget-header icon="input" title="Import Design File">
        </s-widget-header>
        <v-list-subheader>
          <div>
            You can import custom-designed pages in this section. Ensure that
            the file is in the <b>.landing</b> format.
          </div>
        </v-list-subheader>

        <!-- ⬬⬬⬬⬬⬬⬬⬬⬬⬬ Drop Zone ⬬⬬⬬⬬⬬⬬⬬⬬⬬ -->

        <s-drop-zone
          class="min-height-40vh my-3"
          extension=".landing"
          hint="Drag and drop your landing page file here, or click on the input field at the top."
          icon="design_services"
          label="Select template file (.landing)"
          @select:file="importFile"
        ></s-drop-zone>
      </v-card-text>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="show_import = false">
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LmtLargeButton from "@selldone/page-builder/src/menu/top/components/LmtLargeButton.vue";
import SDropZone from "@selldone/components-vue/ui/uploader/SDropZone.vue";
import Builder from "@selldone/page-builder/Builder.ts";

export default defineComponent({
  name: "LMenuTopImport",
  inject: ["$builder"],
  components: {
    LmtLargeButton,
    SDropZone,
  },

  props: {
    page: Object,
  },

  data: () => ({
    show_import: false,
  }),

  computed: {},

  methods: {
    importFile(file) {
      (this.$builder as Builder).importer
        .loadFile(file)
        .then(() => {
          this.show_import = false;
          this.showSuccessAlert(null, "Landing file loaded successfully.");
        })
        .catch((e) => {
          this.showErrorAlert(null, e.toString());
          console.error(e);
        });
    },
  },
});
</script>

<style scoped lang="scss"></style>
