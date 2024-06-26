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

    <s-image-uploader
      :dark="dark"
      :image="modelValue ? getShopImagePath(modelValue) : null"
      :label="modelValue?label:undefined"
      :server="uploadUrl"
      auto-compact
      clearable
      dense
      max-file-size="2MB"
      allow-image-transform
      @onClear="$emit('update:modelValue', null)"
      @new-path="handleProcessFile"
      min-height="140px"
      border
      rounded="lg"
    >
    </s-image-uploader>
  </v-list-item>
</template>

<script>
import { defineComponent } from "vue";
import SImageUploader from "@selldone/components-vue/ui/uploader/SImageUploader.vue";

export default defineComponent({
  name: "SSettingImage",
  components: {
    SImageUploader,
  },

  emits: ["update:modelValue"],
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
    handleProcessFile(path) {
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
