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

<script>
import { defineComponent } from "vue";
import SSettingToggle from "@selldone/page-builder/styler/settings/toggle/SSettingToggle.vue";

export default defineComponent({
  name: "SSettingVariant",
  components: { SSettingToggle },
  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    label: {
      default: "Variant",
    },
    icon: {
      default: "list_alt",
    },

    disabled: Boolean,
    mandatory: Boolean,
  },
  computed: {
    items() {
      return [
        { value: "outlined", title: "Outlined" },
        { value: "underlined", title: "Underlined" },
        { value: "plain", title: "Plain" },
        { value: "filled", title: "Filled" },
        { value: "solo", title: "Solo" },
        { value: "solo-filled", title: "Solo Filled" },
        { value: "solo-inverted", title: "Solo Inverted" },


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
