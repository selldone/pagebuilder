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
  <!-- ████████████████████████ Slider ████████████████████████ -->

  <v-list-item
    :class="{ 'disabled-scale-down': disabled }"
    class="s--setting-switch"
    density="compact"
  >
    <template v-slot:prepend>
      <span class="-label me-2 min-width-100">
        <v-icon v-if="icon" class="me-1">{{ icon }}</v-icon>

        {{ label }}</span
      >
    </template>

    <template v-slot:append>
      <v-list-item-action end>
        <u-number-input
          :disabled="disabled"
          :max="max"
          :min="min"
          :model-value="modelValue"
          color="#1976D2"
          density="compact"
          class="v-input-small"
          hide-details
          inset
          style="min-width: 100px"
          variant="outlined"
          rounded="lg"
          @update:model-value="(val) => setValue(val)"
          @click.stop
          :step="step"
          :decimal="decimal?decimal:step<1 ? 2 : 0"

        >
          <template v-if="suffix" v-slot:append-inner>
            <small  class="ms-1">{{ suffix }}</small>
          </template>

        </u-number-input>

      </v-list-item-action>
    </template>
    <v-slider
      :disabled="disabled"
      :max="maxSlider ? maxSlider : max"
      :min="minSlider ? minSlider : min"
      :model-value="modelValue"
      class="px-2"
      color="#1976D2"
      density="compact"
      hide-details
      rounded
      track-size="5"
      @update:model-value="(val) => setValue(val)"
    ></v-slider>
  </v-list-item>
</template>

<script>
import { defineComponent } from "vue";
import UNumberInput from "@selldone/components-vue/ui/number/input/UNumberInput.vue";

export default defineComponent({
  name: "SSettingSlider",
  components: { UNumberInput },
  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    label: {},
    icon: {},
    disabled: Boolean,
    min: {
      default: 0,
    },
    max: {
      default: 100,
    },
    minSlider: {
      default: null,
    },
    maxSlider: {
      default: null,
    },
    suffix: {},

    step:{
      default: 1,

    },
    decimal:{}
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
.s--setting-switch {
  .-label {
    font-size: 0.8rem;
  }
}
</style>
