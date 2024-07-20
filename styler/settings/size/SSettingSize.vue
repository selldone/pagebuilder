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
  <!-- ████████████████████████ Size ████████████████████████ -->
  <v-list-item
    :class="{ 'disabled-scale-down': disabled }"
    class="s--setting-size"
    density="compact"
  >
    <template v-slot:title>
      <span class="-label me-2">
        <v-icon v-if="icon" class="me-1" :class="iconClass">{{ icon }}</v-icon>

        {{ label }}</span
      >
    </template>
    <template v-slot:append>
      <v-btn
        v-if="defaultValue && (modelValue === null || modelValue === undefined)"
        @click="$emit('update:modelValue', defaultValue)"
        size="small"
        variant="plain"
        prepend-icon="shortcut"
      >
        Set <span v-if="defaultValue!=='unset'" style="font-size: 9px" class="ms-1 tnt">[{{defaultValue}}]</span>
      </v-btn>
      <u-dimension-input
        v-else
        :disabled="disabled"
        :model-value="modelValue"
        dense
        hide-details
        single-line
        style="min-width: 150px"
        variant="outlined"
        density="compact"
        @update:model-value="setValue"
        rounded="lg"
        class="v-input-small"
      ></u-dimension-input>
    </template>
  </v-list-item>
</template>

<script>
import { defineComponent } from "vue";
import UDimensionInput from "@selldone/components-vue/ui/dimension/input/UDimensionInput.vue";

export default defineComponent({
  name: "SSettingSize",
  components: { UDimensionInput },
  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    label: {},
    icon: {},
    iconClass: {},

    disabled: Boolean,
    defaultValue: {
      default: "unset",
    },
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
.s--setting-size {
  .-label {
    font-size: 0.8rem;
  }
}
</style>
