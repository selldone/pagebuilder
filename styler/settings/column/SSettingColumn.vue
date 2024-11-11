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
    class="s--setting-column"
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
        <v-btn
          v-if="clearable"
          :disabled="!modelValue"
          @click="$emit('update:modelValue', null)"
          class="ms-1"
          size="32"
          icon
          color="red"
          variant="text"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-list-item-action>
    </template>

    <v-row
      no-gutters
      align="center"
      justify="end"
      :class="{ 'op-0-5': !modelValue }"
    >
      <v-card
        v-for="i in 12"
        :key="i"
        @click="$emit('update:modelValue', i)"
        width="16"
        height="16"
        rounded="sm"
        class="-col pp"
        style="margin: 1px"
        :color="modelValue >= i ? '#2196F3' : 'grey'"
      ></v-card>
    </v-row>
  </v-list-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SSettingColumn",
  components: {},
  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    label: {},
    icon: {},
    defaultValue: { default: 0 },
    disabled: Boolean,

    clearable: Boolean,
  },
  computed: {},
  data() {
    return {};
  },
  methods: {

  },
});
</script>

<style lang="scss" scoped>
.s--setting-column {
  .-label {
    font-size: 0.8rem;
  }

  .-col {
    position: relative;
    transition: 0.2s ease-in-out;

    &:hover {
      background-color: #ffa000 !important;
      transform: scale(1.2);
      z-index: 1;
    }
  }
}
</style>
