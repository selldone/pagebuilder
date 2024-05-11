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
  <div class="p-2">
    <u-loading-progress v-if="busy"></u-loading-progress>
    <v-container fluid>
      <v-row>
        <v-col
          v-for="file in videos"
          :key="file.id"
          cols="6"
          lg="2"
          md="3"
          sm="4"
        >
          <div class="con-asset">
            <video class="prev-asset" controls muted>
              <source
                :src="getVideoUrl(file.path)"
                :type="VideoHelper.GetMime(file.path)"
              />
            </video>
            <v-spacer></v-spacer>
            <div class="pa-1 d-flex align-center">
              <b v-if="file.size" class="small mx-2">{{
                numeralFormat(file.size, "0 b")
              }}</b>
              <v-spacer></v-spacer>
              <v-btn
                color="black"
                title="Copy video URL."
                @click="copyToClipboard(getVideoUrl(file.path))"
              >
                <v-icon>content_copy</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>

        <v-col
          v-for="file in images"
          :key="file.id"
          cols="6"
          lg="2"
          md="3"
          sm="4"
        >
          <div class="con-asset">
            <v-img
              :src="getShopImagePath(file.path)"
              class="prev-asset"
            ></v-img>

            <div class="pa-1 d-flex align-center">
              <b v-if="file.size" class="small mx-2">{{
                numeralFormat(file.size, "0 b")
              }}</b>
              <v-spacer></v-spacer>
              <v-btn
                color="black"
                title="Copy image URL."
                @click="copyToClipboard(getShopImagePath(file.path))"
              >
                <v-icon>content_copy</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>

        <v-col
          v-if="!busy && !images?.length && !videos?.length"
          class="pa-6 text-h4 font-weight-light op-0-4 usn min-height-40vh d-flex align-center justify-center"
          cols="12"
        >
          <v-icon class="ma-2" size="x-large">folder_open</v-icon>
          No asset uploaded yet.
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { VideoHelper } from "@selldone/core-js/helper/video/VideoHelper";

export default {
  name: "LPageEditorFiles",
  components: {},
  props: {
    page: {},
  },

  data: () => ({
    VideoHelper: VideoHelper,

    images: [],
    videos: [],
    busy: false,
  }),

  computed: {},

  watch: {},
  created() {
    this.fetchFiles();
  },

  methods: {
    fetchFiles() {
      this.busy = true;
      axios
        .get(window.API.GET_PAGE_FILES(this.page.shop_id, this.page.id))
        .then(({ data }) => {
          if (!data.error) {
            this.images = data.images;
            this.videos = data.videos;
          } else {
            this.showErrorAlert(null, data.error_msg);
          }
        })
        .catch((error) => {
          this.showLaravelError(error);
        })
        .finally(() => {
          this.busy = null;
        });
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
  }
}
</style>
