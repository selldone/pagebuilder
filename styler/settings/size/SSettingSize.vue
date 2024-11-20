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
  <!-- ████████████████████████ Size ████████████████████████ -->
  <div :class="{ 'disabled-scale-down': disabled }" class="s--setting-size">
    <v-list-item density="compact">
      <template v-slot:title>
        <span class="-label me-2">
          <v-icon v-if="icon" class="me-1" :class="iconClass">{{
            icon
          }}</v-icon>

          {{ label }}</span
        >
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
        <u-dimension-input
          v-else
          :key="selectedScreen"
          :disabled="disabled"
          :model-value="currentValue"
          dense
          hide-details
          single-line
          :onlyPositiveValue="onlyPositiveValue"
          style="min-width: 150px"
          variant="outlined"
          density="compact"
          @update:model-value="setValue"
          rounded="lg"
          class="v-input-small"
          :clearable="clearable"
          @clear="setValue(null)"
        ></u-dimension-input>
      </template>
    </v-list-item>

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
import UDimensionInput from "@selldone/components-vue/ui/dimension/input/UDimensionInput.vue";
import SSettingResponsiveMixin from "@selldone/page-builder/styler/settings/responsive-mixin/SSettingResponsiveMixin.ts";
import SSettingResponsiveButtons from "@selldone/page-builder/styler/settings/responsive-mixin/SSettingResponsiveButtons.vue";

export default defineComponent({
  name: "SSettingSize",
  components: { SSettingResponsiveButtons, UDimensionInput },
  mixins: [SSettingResponsiveMixin],

  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    onlyPositiveValue: Boolean,
    label: {},
    icon: {},
    iconClass: {},

    disabled: Boolean,
    defaultValue: {
      default: "unset",
    },
    subtitle: {},
    clearable:Boolean
  },
  computed: {},
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.s--setting-size {
  .-label {
    font-size: 0.8rem;
  }
}
</style>
