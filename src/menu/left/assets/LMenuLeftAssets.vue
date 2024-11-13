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
  <!-- ████████████████████ Toolbar ████████████████████ -->

  <v-toolbar
    density="compact"
    color="#222"
    height="52"
    style="border-bottom: solid #111 thin"
  >
    <v-toolbar-title style="font-size: 12px"><b>Assets</b></v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn
      size="small"
      @click="fetchFiles"
      variant="text"
      title="Refresh Assets"
      min-width="32"
      :loading="busy"
    >
      <v-icon>sync</v-icon>
    </v-btn>
  </v-toolbar>

  <v-container fluid>
    <v-row dense>
      <v-col v-for="file in videos" :key="file.id" cols="4">
        <div class="con-asset">
          <video class="prev-asset" controls muted>
            <source
              :src="getVideoUrl(file.path)"
              :type="VideoHelper.GetMime(file.path)"
            />
          </video>
          <v-spacer></v-spacer>
          <div class="pa-1 d-flex align-center">
            <b v-if="file.size" class="me-1" style="font-size: 8px">{{
              numeralFormat(file.size, "0 b")
            }}</b>
            <v-spacer></v-spacer>
            <v-btn
              color="black"
              title="Copy video URL."
              size="24"
              @click="copyToClipboard(getVideoUrl(file.path))"
            >
              <v-icon size="16">content_copy</v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>

      <v-col v-for="file in images" :key="file.id" cols="4">
        <div
          class="con-asset"
          draggable="true"
          @dragstart="handleDragStart($event, file)"
        >
          <v-img
            :src="getShopImagePath(file.path)"
            class="prev-asset"
            cover
          ></v-img>

          <div class="pa-1 d-flex align-center">
            <b v-if="file.size" class="me-1" style="font-size: 8px">{{
              numeralFormat(file.size, "0 b")
            }}</b>
            <v-spacer></v-spacer>
            <v-btn
              color="black"
              title="Copy image URL."
              size="24"
              @click="copyToClipboard(getShopImagePath(file.path))"
            >
              <v-icon size="16">content_copy</v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>

      <v-col
        v-if="!busy && !images?.length && !videos?.length"
        class="pa-6 font-weight-light op-0-4 usn d-flex flex-column text-center align-center justify-center"
        cols="12"
      >
        <v-icon class="ma-2" size="x-large">folder_open</v-icon>

        {{ $t("l_menu_left_assets.no_asset_uploaded") }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { VideoHelper } from "@selldone/core-js/helper/video/VideoHelper.ts";

export default {
  name: "LMenuLeftAssets",
  components: {},
  inject: ["$builder"],
  props: {},

  data: () => ({
    VideoHelper: VideoHelper,

    images: [],
    videos: [],
    busy: false,
  }),

  computed: {
    page() {
      return this.$builder.model;
    },
  },

  watch: {
    "page.id"() {
      this.fetchFiles();
    },
  },
  created() {
    this.fetchFiles();
  },

  methods: {
    getVideoUrl(file_name: string) {
      return window.CDN.GET_VIDEO_URL(file_name);
    },

    fetchFiles() {
      this.busy = true;
      axios
        .get(window.API.GET_PAGE_FILES(this.page.shop_id, this.page.id))
        .then(({ data }) => {
          if (!data.error) {
            this.images = data.images;
            this.videos = data.videos;

            this.$builder.setAssets(data.images, data.videos);
          } else {
            NotificationService.showErrorAlert(null, data.error_msg);
          }
        })
        .catch((error) => {
          NotificationService.showLaravelError(error);
        })
        .finally(() => {
          this.busy = null;
        });
    },

    handleDragStart(event, file) {
      event.dataTransfer.setData("text/plain", file.path);
    },
  },
};
</script>

<style lang="scss" scoped>
.con-asset {
  background: #000;
  border-radius: 6px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  color: #fff;

  .prev-asset {
    max-width: 100%;
    aspect-ratio: 1;
    border-radius: 6px;
    margin: 3px;
  }
}
</style>
