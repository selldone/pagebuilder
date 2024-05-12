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
    :prepend-icon="icon"
    :title="title"
    class="s--setting-switch"
    density="compact"
  >
    <template v-slot:append>
      <u-number-input
        :disabled="disabled"
        :max="max"
        :min="min"
        :model-value="modelValue"
        color="#1976D2"
        density="compact"
        hide-details
        inset
        style="min-width: 100px"
        variant="plain"
        @update:model-value="(val) => setValue(val)"
        @click.stop
      ></u-number-input>
      <small v-if="suffix" class="ms-1">{{ suffix }}</small>
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
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: {},
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
}
</style>
