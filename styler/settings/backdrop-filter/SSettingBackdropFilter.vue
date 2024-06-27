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
  <!-- ████████████████████████ Backdrop Filter ████████████████████████ -->
  <div
    :class="{ 'disabled-scale-down': disabled }"
    class="s--setting-backdrop-filter"
  >
    <v-list-item>
      <span class="-label me-2 min-width-100">
        <v-icon v-if="icon" class="me-1">{{ icon }}</v-icon>

        {{ label }}</span
      >
      <template v-slot:append>
        <v-btn
          v-if="!isValid"
          @click="addFilter()"
          size="small"
          class="ms-1 tnt"
          variant="outlined"
          prepend-icon="add_box"
        >
          Add Filter
        </v-btn>

        <v-btn
          v-else
          @click="$emit('update:modelValue', null)"
          color="red"
          variant="text"
          size="small"
          class="ms-1 tnt"
          prepend-icon="close"
        >
          Remove filter
        </v-btn>
      </template>
    </v-list-item>

    <template v-if="isValid">
      <s-setting-slider
        v-for="(item, key) in FILTERS"
        :key="key"
        v-model="modelValue[key]"
        :label="item.title"
        :icon="item.icon"
        :max="item.max"
        :min="item.min"
        :step="item.step"
        :decimal="2"
        :suffix="item.dim"
        class="border-start-white-thin ms-6"
        clearable
      >
      </s-setting-slider>
    </template>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { isObject } from "lodash-es";
import SSettingSlider from "@selldone/page-builder/styler/settings/slider/SSettingSlider.vue";
import { FILTERS } from "@selldone/page-builder/utils/filter/LUtilsFilter";

export default defineComponent({
  name: "SSettingBackdropFilter",
  components: { SSettingSlider },
  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    label: {},
    icon: {},
    clearable: Boolean,

    disabled: Boolean,
  },
  computed: {
    isValid() {
      return this.modelValue && isObject(this.modelValue);
    },
  },
  data() {
    return {
      FILTERS: FILTERS,
    };
  },
  methods: {
    addFilter() {
      this.$emit("update:modelValue", {});
    },
  },

  created() {
    if (
      this.modelValue &&
      (!isObject(this.modelValue) || Array.isArray(this.modelValue))
    ) {
      this.$emit("update:modelValue", null);
    }
  },
});
</script>

<style lang="scss" scoped>
.s--setting-backdrop-filter {
  .-label {
    font-size: 0.8rem;
  }
}
</style>
