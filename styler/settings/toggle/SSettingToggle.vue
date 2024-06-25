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
    density="compact"
    class="s--setting-toggle"
  >
    <template v-slot:prepend>
      <span class="-label me-2">
        <v-icon v-if="icon" class="me-1">{{ icon }}</v-icon>

        {{ label }}</span
      >
    </template>

    <template v-slot:append>
      <v-btn-toggle
        :disabled="disabled"
        :items="items"
        :mandatory="mandatory"
        :model-value="modelValue"
        class="bg-gray"
        rounded="xl"
        density="compact"
        hide-details
        selected-class="blue-flat elevation-3"
        variant="text"
        @update:model-value="(val) => setValue(val)"
      >
        <v-btn
          v-for="item in items"
          :key="item.value"
          :value="item.value"
          class="tnt ma-1"
          size="small"
          height="28"
          rounded="xl"
          :prepend-icon="item.icon"
        >
          {{ is_object ? (item.title ? item.title : item.value) : item }}
        </v-btn>
      </v-btn-toggle>
    </template>
  </v-list-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SSettingToggle",
  props: {
    modelValue: {},
    label: {},
    icon: {},
    items: {
      type: Array,
      required: true,
    },
    disabled: Boolean,
    mandatory: Boolean,
  },
  computed: {
    is_object() {
      return this.items[0] instanceof Object;
    },
  },
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
.s--setting-toggle {
  .-label {
    font-size: 0.8rem;
  }
}
</style>
