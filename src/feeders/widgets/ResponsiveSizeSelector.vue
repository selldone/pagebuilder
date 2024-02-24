<!--
  - Copyright (c) 2023. Selldone® Business OS™
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
  <div class="pa-1 text-center min-width-75 d-flex flex-column align-center">
    <v-btn
      :color="modelValue ? 'primary' : undefined"
      :variant="modelValue ? 'flat' : 'outlined'"
    >
      {{ modelValue ? modelValue : "❌" }}

      <v-menu activator="parent" location="top">
        <v-sheet class="pa-2" color="#fff" rounded="lg">
          <div class="text-start">
            <v-icon class="me-1">{{ icon }}</v-icon>
            <b>{{ label }}</b>
          </div>
          <div class="my-2 text-start">
            Opt for a 12-split layout in relative design, enabling flexible,
            evenly divided sections for efficient space utilization.
          </div>

          <v-btn
            key="-"
            class="ma-1"
            icon
            min-width="36"
            size="small"
            title="Inherit from smaller screen size."
            variant="text"
            @click="$emit('update:modelValue', null)"
          >
            ❌
          </v-btn>
          <v-btn
            v-for="index in 12"
            :key="index"
            :color="modelValue === index ? 'primary' : undefined"
            class="ma-1"
            icon
            min-width="36"
            size="small"
            variant="flat"
            @click="$emit('update:modelValue', index)"
          >
            {{ index }}
          </v-btn>
        </v-sheet>
      </v-menu>
    </v-btn>

    <small class="mt-2">
      <v-icon size="small">{{ icon }}</v-icon>
      {{ label }}</small
    >
  </div>
</template>

<script>
export default {
  name: "ResponsiveSizeSelector",
  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    label: { required: true },
    icon: {},
  },
};
</script>

<style scoped></style>
