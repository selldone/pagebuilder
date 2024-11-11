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
  <!-- ████████████████████████ Color ████████████████████████ -->
  <v-list-item
    :class="{ 'disabled-scale-down': disabled }"
    class="s--setting-color"
    density="compact"
    :subtitle="subtitle"
  >
    <template v-slot:prepend>
      <span class="-label me-2">
        <v-icon v-if="icon" class="me-1">{{ icon }}</v-icon>

        {{ label }}</span
      >
    </template>

    <template v-slot:append>
      <u-color-selector
        :dialog-title="label"
        :model-value="modelValue"
        :nullable="clearable"
        @update:model-value="setValue"
      ></u-color-selector>
    </template>
  </v-list-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UColorSelector from "@selldone/components-vue/ui/color/selector/UColorSelector.vue";

export default defineComponent({
  name: "SSettingColor",
  components: { UColorSelector },
  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    label: {},
    subtitle:{},
    icon: {},
    clearable: Boolean,

    disabled: Boolean,
  },
  computed: {},
  data() {
    return {};
  },
  methods: {
    setValue(value) {
      this.$emit("update:modelValue", value);
    },
  },
});
</script>

<style lang="scss" scoped>
.s--setting-color {
  .-label {
    font-size: 0.8rem;
  }
}
</style>
