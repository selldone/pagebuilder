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
    :title="title"
    :prepend-icon="icon"
    density="compact"
    class="s--setting-switch"
    :class="{ 'disabled-scale-down': disabled }"
  >
    <template v-slot:append>
      <s-number-input
        inset
        :model-value="modelValue"
        @update:model-value="(val) => setValue(val)"
        @click.stop
        hide-details
        density="compact"
        color="#1976D2"
        variant="plain"
        style="min-width: 100px"
        :min="min"
        :max="max"
        :disabled="disabled"
      ></s-number-input>
      <small class="ms-1" v-if="suffix">{{ suffix }}</small>
    </template>
    <v-slider
      :model-value="modelValue"
      @update:model-value="(val) => setValue(val)"
      rounded
      hide-details
      density="compact"
      track-size="5"
      color="#1976D2"
      class="px-2"
      :min="minSlider ? minSlider : min"
      :max="maxSlider ? maxSlider : max"
      :disabled="disabled"
    ></v-slider>
  </v-list-item>
</template>

<script>
import { defineComponent } from "vue";
import SNumberInput from "@components/ui/input/number/SNumberInput.vue";

export default defineComponent({
  name: "SSettingSlider",
  components: { SNumberInput },
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
