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
  <!-- ████████████████████████ Select ████████████████████████ -->
  <v-list-item
    :class="{ 'disabled-scale-down': disabled }"
    class="s--setting-text-input"
    density="compact"
  >
    <template v-slot:prepend>
      <span v-if="!modelValue" class="-label me-2 min-width-100">
        <v-icon v-if="icon" class="me-1">{{ icon }}</v-icon>

        {{ label }}</span
      >
    </template>

    <s-video-uploader
      :dark="dark"
      :server="uploadUrl"
      :video="modelValue ? getVideoUrl(modelValue) : null"
      auto-compact
      clearable
      dense
      max-file-size="8MB"
      @onClear="$emit('update:modelValue', null)"
      @new-path="handleProcessVideo"
      @new-url="(v) => $emit('new-url', v)"
      @new-item="(v) => $emit('new-item', v)"
      :label="modelValue ? label : undefined"
      min-height="140px"
      border
      rounded="lg"
    >
    </s-video-uploader>
  </v-list-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SVideoUploader from "@selldone/components-vue/ui/uploader/SVideoUploader.vue";

export default defineComponent({
  name: "SSettingVideo",
  components: {
    SVideoUploader,
  },

  emits: ["update:modelValue", "new-url", "new-item"],
  props: {
    uploadUrl: {
      require: true,
    },
    dark: Boolean,

    modelValue: {},
    label: {},

    icon: {},

    disabled: Boolean,
    messages: {},
  },
  computed: {},
  data() {
    return {};
  },

  methods: {
    getVideoUrl(file_name: string) {
      return window.CDN.GET_VIDEO_URL(file_name);
    },
    handleProcessVideo(path) {
      this.$emit("update:modelValue", path);
    },
  },
});
</script>

<style lang="scss" scoped>
.s--setting-text-input {
  .-label {
    font-size: 0.8rem;
  }
}
</style>
