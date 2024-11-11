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
  <s-setting-toggle
    :items="items"
    :model-value="modelValue"
    @update:model-value="(v) => $emit('update:modelValue', v)"
    :icon="icon"
    :label="label"
    :mandatory="mandatory"
    :disabled="mandatory"
  >
  </s-setting-toggle>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SSettingToggle from "@selldone/page-builder/styler/settings/toggle/SSettingToggle.vue";

export default defineComponent({
  name: "SSettingRounded",
  components: { SSettingToggle },
  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    label: {
      default: "Rounded",
    },
    icon: {
      default: "rounded_corner",
    },

    disabled: Boolean,
    mandatory: Boolean,
  },
  computed: {
    items() {
      return [
        { value: "0", title: "None" },
        { value: "sm", title: "Small" },
        { value: "md", title: "Medium" },
        { value: "lg", title: "Large" },
        { value: "xl", title: "Extra Large" },
        { value: "pill", title: "Pill" },
      ];
    },
  },
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.s--setting-rounded {
  .-label {
    font-size: 0.8rem;
  }

  ::v-deep(.v-list-item__append) {
    overflow: hidden;
  }
}
</style>
