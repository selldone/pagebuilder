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
    :prepend-icon="icon"
    :title="title"
    class="s--setting-combobox"
    density="compact"
  >
    <div v-if="subtitle" class="small">{{ subtitle }}</div>
    <v-combobox
      :clearable="clearable"
      :disabled="disabled"
      :item-title="'title'"
      :item-value="'value'"
      :items="items"
      :model-value="modelValue"
      :return-object="false"
      chips
      class="my-1"
      closable-chips
      color="#1976D2"
      density="compact"
      hide-details
      multiple
      placeholder="Select..."
      single-line
      style="min-width: 200px"
      variant="plain"
      @update:model-value="(val) => setValue(val)"
    >
      <template v-slot:chip="{ item, props }">
        <v-chip v-bind="props">
          <v-icon
            v-if="isObject(item.raw) && item.raw.icon"
            class="me-2"
            size="20"
            >{{ item.raw.icon }}
          </v-icon>
          {{
            isObject(item.raw)
              ? item.raw.title
                ? item.raw.title
                : item.raw.value
              : item.raw
          }}
        </v-chip>
      </template>
      <template v-slot:item="{ item, props }">
        <v-list-item
          :prepend-icon="item.raw.icon"
          :title="
            isObject(item.raw)
              ? item.raw.title
                ? item.raw.title
                : item.raw.value
              : item.raw
          "
          class="text-start"
          v-bind="props"
        ></v-list-item>
      </template>
    </v-combobox>
  </v-list-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SSettingCombobox",
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
