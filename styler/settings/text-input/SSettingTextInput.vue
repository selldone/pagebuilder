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
    class="s--setting-text-input"
    density="compact"
  >
    <template v-if="label" v-slot:prepend>
      <span class="-label me-2 min-width-100">
        <v-icon v-if="icon" class="me-1">{{ icon }}</v-icon>

        {{ label }}</span
      >
    </template>

    <v-btn
      v-if="defaultValue && (modelValue === null || modelValue === undefined)"
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

    <v-textarea
      v-else-if="multipleLines"
      :clearable="clearable"
      :counter="counter"
      :disabled="disabled"
      :messages="messages ? messages : ''"
      :model-value="modelValue"
      :placeholder="placeholder"
      :rules="rules"
      class="v-input-small"
      color="#1976D2"
      density="compact"
      :hide-details="!messages"
      auto-grow
      style="min-width: 200px"
      variant="outlined"
      @update:model-value="(val) => setValue(val)"
      @blur="$emit('blur')"
      :append-inner-icon="hasLock ? (lock ? 'lock' : 'lock_open') : undefined"
      :readonly="lock && hasLock"
      @click:append-inner="lock = !lock"
    >
    </v-textarea>
    <v-text-field
      v-else
      :clearable="clearable"
      :counter="counter"
      :disabled="disabled"
      :messages="messages ? messages : ''"
      :model-value="modelValue"
      :placeholder="placeholder"
      :rules="rules"
      class="v-input-small"
      color="#1976D2"
      density="compact"
      :hide-details="!messages"
      style="min-width: 200px"
      variant="outlined"
      @update:model-value="(val) => setValue(val)"
      @blur="$emit('blur')"
      @keydown.enter.prevent="$emit('enter')"
      :append-inner-icon="hasLock ? (lock ? 'lock' : 'lock_open') : undefined"
      :readonly="lock && hasLock"
      @click:append-inner="lock = !lock"
    >
    </v-text-field>
  </v-list-item>

  <u-smart-suggestion
    v-if="samples?.length"
    :samples="samples"
    @select="(v) => $emit('update:modelValue', v)"
  ></u-smart-suggestion>

  <div
    v-if="subtitle"
    style="font-size: 0.7rem; padding: 4px 16px; opacity: 0.5"
  >
    <v-icon>arrow_drop_up</v-icon>
    {{ subtitle }}
  </div>
</template>

<script>
import { defineComponent } from "vue";
import USmartSuggestion from "@selldone/components-vue/ui/smart/suggestion/USmartSuggestion.vue";

export default defineComponent({
  name: "SSettingTextInput",
  components: { USmartSuggestion },

  emits: ["update:modelValue", "blur", "enter"],
  props: {
    modelValue: {},
    label: {},
    subtitle: {},
    icon: {},
    items: {
      type: Array,
      required: false,
    },
    disabled: Boolean,
    clearable: Boolean,
    messages: {},
    placeholder: {
      default: "Enter...",
    },
    rules: {},
    counter: {},
    multipleLines: Boolean,

    hasLock: Boolean,
    defaultValue: {},
    samples: {
      type: Array,
    },
  },
  computed: {},
  data() {
    return {
      lock: true,
    };
  },
  methods: {
    setValue(value) {
      this.$emit("update:modelValue", value);
    },
  },
});
</script>

<style lang="scss" scoped>
.s--setting-text-input {
  .-label {
    font-size: 0.8rem;
  }
}
</style>
