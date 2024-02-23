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
      <v-btn-toggle
        :mandatory="mandatory"
        hide-details
        selected-class="blue-flat"
        density="compact"
        :items="items"
        :model-value="modelValue"
        @update:model-value="(val) => setValue(val)"
        variant="text"
        :disabled="disabled"
        class="my-1"
      >
        <v-btn
          v-for="item in items"
          :key="item.value"
          :value="item.value"
          class="tnt"
          size="small"
        >
          <v-icon v-if="item.icon" start
            >{{ item.icon }}
          </v-icon>
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
.s--setting-select {
}
</style>
