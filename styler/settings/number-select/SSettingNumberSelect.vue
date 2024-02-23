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
  <div class="s--setting-number-select" :class="{'disabled-scale-down':disabled}">
    <v-list-item :title="title" :prepend-icon="icon" density="compact" >
      <template v-slot:append>
        <v-select
          inset
          hide-details
          density="compact"
          color="#1976D2"
          :items="items"
          :model-value="modelValue"
          @update:model-value="(val) => setValue(val)"
          variant="plain"
          style="min-width: 64px"
          :clearable="clearable"
        >
        </v-select>
      </template>
    </v-list-item>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SSettingNumberSelect",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: {},
    icon: {},
    min: { default: 1 },
    max: { default: 10 },
    clearable: Boolean,
    hasAuto: Boolean,
    disabled: Boolean,
  },
  computed: {
    items() {
      const items = Array.from(
        { length: this.max - this.min + 1 },
        (v, k) => k + this.min,
      );

      if (this.hasAuto) {
        items.push("auto");
      }

      return items;
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
.s--setting-number-select {

}
</style>
