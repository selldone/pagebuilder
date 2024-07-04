<!--
  - Copyright (c) 2023. Selldone® Business OS™
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
  <v-expansion-panel rounded="0">
    <v-expansion-panel-title class="text-start py-1 ps-0">
      <template v-slot:actions>
        <v-btn
          class="flex-grow-0"
          icon
          variant="text"
          size="small"
          @click.stop="$emit('click:delete')"
          color="red"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </template>
      <v-icon class="handle cursor-grab me-3"> unfold_more</v-icon>


      <div class="flex-grow-0">
        <v-avatar v-if="image?.data.src" class="me-2 hover-scale" rounded size="16">
          <v-img :src="getShopImagePath(image.data.src)"></v-img>
        </v-avatar>
        <v-icon v-else class="me-2" size="16">view_headline</v-icon>
        {{ label }}
      </div>
      <div
        v-if="StripTags(title?.data?.value)"
        class="mx-2 flex-grow-1 font-weight-bold"
      >
        |
        {{ StripTags(title.data.value)?.limitWords(5) }}
      </div>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <s-image-uploader
        v-if="image"
        :image="image?.data.src ? getShopImagePath(image.data.src) : undefined"
        :server="upload_image_url"
        auto-compact
        clearable
        dark
        label="Slide Image"
        @onClear="image.data.setSrc(null)"
        @new-path="
          (path) => {
            image.data.setSrc(path);
          }
        "
      />

      <v-text-field
        v-model="title.data.value"
        label="Slide Title"
        variant="underlined"
      >
      </v-text-field>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script>
import SImageUploader from "@selldone/components-vue/ui/uploader/SImageUploader.vue";
import { XGalleryExpandableItemObject } from "@selldone/page-builder/components/x/gallery-expandable/item/XGalleryExpandableItemObject.ts";
import { StripTags } from "@selldone/core-js";

export default {
  name: "LSettingsGallerySlide",

  mixins: [],

  components: {
    SImageUploader,
  },
  emits: ["click:delete"],
  props: {
    builder: {
      type: Object,
      required: true,
    },
    object: {
      type: XGalleryExpandableItemObject,
    },

    label: {
      default: "Slide",
    },
  },
  data: () => ({}),

  computed: {
    image() {
      return this.object.getImageChild();
    },
    title() {
      return this.object.getTitleChild();
    },

    upload_image_url() {
      return this.builder.getImageUploadUrl();
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeUnmount() {},

  methods: { StripTags },
};
</script>

<style lang="scss" scoped></style>
