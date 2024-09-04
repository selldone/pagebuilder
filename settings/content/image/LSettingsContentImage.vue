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
  <s-setting-expandable
    :value="value"
    :image="src ? getShopImagePath(src) : null"
    icon="image"
    title="Content"
  >
    <template v-slot:title></template>

    <s-setting-image
      :model-value="src"
      @update:model-value="(v) => $emit('update:src', v)"
      icon="image"
      :label="$t('global.commons.image')"
      dark
      :upload-url="upload_url"
    ></s-setting-image>
  </s-setting-expandable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import SSettingImage from "@selldone/page-builder/styler/settings/image/SSettingImage.vue";

export default defineComponent({
  name: "LSettingsContentImage",
  components: {
    SSettingImage,
    SSettingExpandable,
  },
  inject: ["$builder"],
  emits: [],
  props: {
    uploadUrl: {
      require: true,
    },
    src: {},
  },

  computed: {
    upload_url() {
      return this.$builder.getImageUploadUrl();
    },
  },
});
</script>

<style scoped lang="scss"></style>
