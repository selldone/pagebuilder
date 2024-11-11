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
    v-bind="$attrs"
    :class="{ 'disabled-scale-down': disabled }"
    density="compact"
    class="s--setting-toggle"
  >
    <template v-slot:prepend>
      <span class="-label me-2 min-width-100">
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
        class="d-flex flex-nowrap overflow-x-auto overflow-y-hidden hide-scroll"
        base-color="#fff"
        style="background: #444"
        rounded="lg"
        density="compact"
        hide-details
        selected-class="blue-flat elevation-3"
        variant="text"
        @update:model-value="(val) => setValue(val)"
        v-dragscroll="true"
        :multiple="multiple"
      >
        <v-btn
          v-for="item in items"
          :key="is_object ? item.value : item"
          :value="is_object ? item.value : item"
          class="tnt ma-1"
          size="small"
          height="28"
          rounded="lg"
          :prepend-icon="item?.icon"
          :class="{
            'black-flat elevation-3':
              !modelValue &&
              defaultValue &&
              defaultValue === (is_object ? item.value : item),
          }"
        >
          {{ is_object ? (item.title ? item.title : item.value) : item }}
        </v-btn>

        <slot name="append-items"></slot>
      </v-btn-toggle>
    </template>
  </v-list-item>
  <div v-if="subtitle" class="small">{{ subtitle }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SSettingToggle",
  emits: ["update:modelValue"],
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
    multiple: Boolean,
    subtitle: {},
    defaultValue: {},
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

  ::v-deep(.v-list-item__append) {
    overflow: hidden;
  }
}
</style>
