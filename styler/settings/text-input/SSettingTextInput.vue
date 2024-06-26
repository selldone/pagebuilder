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
      <span class="-label me-2 min-width-100">
        <v-icon v-if="icon" class="me-1">{{ icon }}</v-icon>

        {{ label }}</span
      >
    </template>

    <v-text-field
      :clearable="clearable"
      :counter="counter"
      :disabled="disabled"
      :messages="messages ? messages : ''"
      :model-value="modelValue"
      :placeholder="placeholder"
      :rules="rules"
      class="my-1"
      color="#1976D2"
      density="compact"
      hide-details
      style="min-width: 200px"
      :label="subtitle"
      variant="outlined"
      @update:model-value="(val) => setValue(val)"
    >
    </v-text-field>
  </v-list-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SSettingTextInput",

  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    label: {},
    subtitle: {},
    icon: {},
    items: {
      type: Array,
      required: false,
    },
    disabled: Boolean,
    clearable: Boolean,
    messages: {},
    placeholder: {
      default: "Enter...",
    },
    rules: {},
    counter: {},
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
.s--setting-text-input {
  .-label {
    font-size: 0.8rem;
  }
}
</style>
