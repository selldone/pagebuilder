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
  <div
    :class="{ 'disabled-scale-down': disabled }"
    class="s--setting-number-input"
  >
    <v-list-item :prepend-icon="icon" :title="title" density="compact">
      <template v-slot:append>
        <u-number-input
          :clearable="clearable"
          :max="max"
          :min="min"
          :model-value="modelValue"
          color="#1976D2"
          density="compact"
          hide-details
          style="min-width: 100px"
          variant="plain"
          @update:model-value="(val) => setValue(val)"
        >
        </u-number-input>
      </template>
    </v-list-item>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import UNumberInput from "@selldone/components-vue/ui/number/input/UNumberInput.vue";

export default defineComponent({
  name: "SSettingNumberInput",
  components: { UNumberInput },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: {},
    icon: {},
    min: { default: 0 },
    max: { default: 100 },
    clearable: Boolean,
    hasAuto: Boolean,
    disabled: Boolean,
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
.s--setting-number-input {
}
</style>
