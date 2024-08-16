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
    <v-list-item density="compact">
      <template v-slot:prepend>
        <span class="-label me-2 min-width-100">
          <v-icon v-if="icon" class="me-1">{{ icon }}</v-icon>

          {{ label }}</span
        >
      </template>

      <template v-slot:append>
        <v-btn
          v-if="
            defaultValue && (modelValue === null || modelValue === undefined)
          "
          @click="$emit('update:modelValue', defaultValue)"
          size="small"
          variant="tonal"
          prepend-icon="shortcut"
          color="#B2EBF2"
        >
          Set
          <span
            v-if="defaultValue !== 'unset'"
            style="font-size: 9px"
            class="ms-1 tnt"
            >[{{ defaultValue }}]</span
          >
        </v-btn>

        <u-number-input
          v-else
          :clearable="clearable"
          :max="max"
          :min="min"
          :model-value="modelValue"
          dense
          hide-details
          style="min-width: 140px"
          variant="outlined"
          rounded="lg"
          class="v-input-small"
          @update:model-value="(val) => setValue(val)"
          :suffix="suffix"
          dark
          :lock="lock"
          :placeholder="placeholder"
          @clear="setValue(null)"
          :alternative-button-value="null"
        >
        </u-number-input>
      </template>
    </v-list-item>
    <div>
      <slot></slot>
    </div>
  </div>
  <div v-if="subtitle" class="small">{{ subtitle }}</div>
</template>

<script>
import { defineComponent } from "vue";
import UNumberInput from "@selldone/components-vue/ui/number/input/UNumberInput.vue";

export default defineComponent({
  name: "SSettingNumberInput",
  components: { UNumberInput },
  props: {
    modelValue: {},
    label: {},
    icon: {},
    min: { default: 0 },
    max: { default: 100 },
    clearable: Boolean,
    hasAuto: Boolean,
    disabled: Boolean,
    lock: Boolean,
    suffix: {},
    subtitle: {},
    placeholder: {},
    defaultValue: {},
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
  .-label {
    font-size: 0.8rem;
  }
}
</style>
