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
  >
    <template v-slot:append>
      <v-select
        inset
        hide-details
        density="compact"
        color="#1976D2"
        :items="items"
        :item-value="is_object ? 'value' : undefined"
        :item-title="is_object ? 'title' : undefined"
        :return-object="false"
        :model-value="modelValue"
        @update:model-value="(val) => setValue(val)"
        variant="plain"
        :clearable="clearable"
        :disabled="disabled" class="mt-n1 mb-1"
      >
        <template v-slot:selection="{ item }">
          <v-icon v-if="is_object && item.raw.icon" class="me-2" size="20"
            >{{ item.raw.icon }}
          </v-icon>
          {{
            is_object
              ? item.raw.title
                ? item.raw.title
                : item.raw.value
              : item.raw
          }}
        </template>
        <template v-slot:item="{ item, props }">
          <v-list-item
            v-bind="props"
            :title="
              is_object
                ? item.raw.title
                  ? item.raw.title
                  : item.raw.value
                : item.raw
            "
            :prepend-icon="item.raw.icon"
            class="text-start"
          ></v-list-item>
        </template>
      </v-select>
    </template>
  </v-list-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SSettingSelect",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: {},
    icon: {},
    items: {
      type: Array,
      required: true,
    },
    disabled: Boolean,
    clearable: Boolean,
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
.s--setting-select {
}
</style>
