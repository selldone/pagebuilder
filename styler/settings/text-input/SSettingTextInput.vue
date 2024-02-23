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
    :title="title"
    :prepend-icon="icon"
    density="compact"
    :class="{ 'disabled-scale-down': disabled }"
    class="s--setting-combobox"
  >
    <div v-if="subtitle" class="small">{{subtitle}}</div>
    <v-text-field
      hide-details
      density="compact"
      single-line
      color="#1976D2"
      :model-value="modelValue"
      @update:model-value="(val) => setValue(val)"
      variant="plain"
      :clearable="clearable"
      :disabled="disabled"
      class="my-1"
      placeholder="Enter..."
      style="min-width: 200px"
    >
    </v-text-field>
  </v-list-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SSettingTextInput",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: {},
    subtitle: {},
    icon: {},
    items: {
      type: Array,
      required: false,
    },
    disabled: Boolean,
    clearable: Boolean,
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
.s--setting-combobox {
}
</style>
