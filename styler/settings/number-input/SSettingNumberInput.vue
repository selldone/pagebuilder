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

          {{ label }}

          <small v-if="min && max && !noLimit" class="ms-1">{{ min }} ~ {{ max }}</small>
        </span>
      </template>

      <template v-slot:append>
        <v-btn
          v-if="
            currentDefaultValue &&
            (currentValue === null || currentValue === undefined)
          "
          @click="setValue(currentDefaultValue)"
          size="small"
          variant="tonal"
          prepend-icon="shortcut"
          color="#B2EBF2"
        >
          Set
          <span
            v-if="currentDefaultValue !== 'unset'"
            style="font-size: 9px"
            class="ms-1 tnt"
            >[{{ currentDefaultValue }}]</span
          >
        </v-btn>

        <u-number-input
          v-else
          :key="selectedScreen"
          :clearable="clearable || selectedScreen"
          :max="noLimit?Number.MAX_SAFE_INTEGER:max"
          :min="noLimit?Number.MIN_SAFE_INTEGER:min"
          :decimal="decimal"
          :model-value="currentValue"
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

    <!-- ━━━━━━━━━━━━━━━━━━━━ Responsive ━━━━━━━━━━━━━━━━━━━━ -->
    <s-setting-responsive-buttons
      v-if="responsive"
      v-model:screen="selectedScreen"
      :model-value="modelValue"
      :sm-value="smValue"
      :md-value="mdValue"
      :lg-value="lgValue"
      :xl-value="xlValue"
      :xxl-value="xxlValue"
    >
    </s-setting-responsive-buttons>

    <!-- ━━━━━━━━━━━━━━━━━━━━ Subtitle ━━━━━━━━━━━━━━━━━━━━ -->

    <div v-if="subtitle" class="small">{{ subtitle }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UNumberInput from "@selldone/components-vue/ui/number/input/UNumberInput.vue";
import SSettingResponsiveMixin from "@selldone/page-builder/styler/settings/responsive-mixin/SSettingResponsiveMixin.ts";
import SSettingResponsiveButtons from "@selldone/page-builder/styler/settings/responsive-mixin/SSettingResponsiveButtons.vue";

export default defineComponent({
  name: "SSettingNumberInput",
  mixins: [SSettingResponsiveMixin],
  components: { SSettingResponsiveButtons, UNumberInput },
  emits: [
    "update:modelValue",
    "update:smValue",
    "update:mdValue",
    "update:lgValue",
    "update:xlValue",
  ],
  props: {
    modelValue: {},
    label: {},
    icon: {},
    min: { default: 0 },
    max: { default: 100 },
    decimal: { default: 0 },
    clearable: Boolean,
    hasAuto: Boolean,
    disabled: Boolean,
    lock: Boolean,
    suffix: {},
    subtitle: {},
    placeholder: {},
    noLimit: Boolean,

    /**
     * Add responsive options
     */
    responsive: Boolean,
  },
  computed: {},
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.s--setting-number-input {
  .-label {
    font-size: 0.8rem;
  }
}
</style>
