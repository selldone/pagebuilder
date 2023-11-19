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
    <v-menu top offset-y rounded="lg">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :color="value ? 'primary' : undefined"
          :depressed="!value"
          :dark="!!value"
          v-bind="attrs"
          v-on="on"
        >
          {{ value ? value : "❌" }}
        </v-btn>
      </template>

      <v-sheet color="#fff">
        <v-subheader
          >Opt for a 12-split layout in relative design, enabling flexible,
          evenly divided sections for efficient space utilization.</v-subheader
        >

        <v-btn
          @click="$emit('input', null)"
          key="-"
          depressed
          small
          class="ma-1"
          min-width="36"
          title="Inherit from smaller screen size."
        >
          ❌
        </v-btn>
        <v-btn
          depressed
          v-for="index in 12"
          :key="index"
          small
          class="ma-1"
          @click="$emit('input', index)"
          min-width="36"
        >
          {{ index }}
        </v-btn>
      </v-sheet>
    </v-menu>
    <small class="mt-2"
      ><v-icon small>{{ icon }}</v-icon> {{ label }}</small
    >
  </div>
</template>

<script>
export default {
  name: "ResponsiveSizeSelector",
  props: {
    value: {},
    label: { required: true },
    icon: {},
  },
};
</script>

<style scoped></style>
