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
    :class="{ 'disabled-scale-down': disabled }"
    density="compact"
    class="s--setting-select"
  >
    <template v-slot:prepend>
      <span class="-label">
        <v-icon v-if="icon" class="me-1">{{ icon }}</v-icon>

        {{ label }}</span
      >
    </template>

    <div class="d-flex justify-end py-1">
      <v-btn
        v-if="defaultValue && (modelValue === null || modelValue === undefined)"
        @click="$emit('update:modelValue', defaultValue)"
        size="small"
        variant="tonal"
        prepend-icon="shortcut"
        class="flex-grow-0 ms-2"
        color="#B2EBF2"
      >
        Set Value
        <span
          v-if="defaultValue !== 'unset'"
          style="font-size: 9px"
          class="ms-1 tnt"
          >[{{ defaultValue }}]</span
        >
      </v-btn>

      <u-language-input
        v-else
        :clearable="clearable"
        :disabled="disabled"
        :model-value="modelValue"
        :return-object="false"
        class="v-input-small flex-grow-0 ms-2"
        style="min-width: 90px"
        color="#1976D2"
        density="compact"
        hide-details
        single-line
        :available-languages="availableLanguages"
        variant="outlined"
        rounded="lg"
        @update:model-value="(val) => setValue(val)"
      >
      </u-language-input>
    </div>
  </v-list-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ULanguageInput from "@selldone/components-vue/ui/language/input/ULanguageInput.vue";

export default defineComponent({
  name: "SSettingLanguage",
  emits: ["update:modelValue"],
  components: { ULanguageInput },
  props: {
    modelValue: {},
    label: {},
    icon: {},

    availableLanguages: {
      require: false,
      type: Array,
    },

    disabled: Boolean,
    clearable: Boolean,
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
.s--setting-select {
  .-label {
    font-size: 0.8rem;
  }
}
</style>
