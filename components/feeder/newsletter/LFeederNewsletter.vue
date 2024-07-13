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
  <div>
    <v-text-field
      v-model="modelValue.input.placeholder"
      append-icon="mail_outline"
      label="Input placeholder"
      placeholder="john@gmail..."
    ></v-text-field>
    TODO: CORRECT THIS!
    <l-feeder-input v-model="modelValue.input"></l-feeder-input>

    <v-list-subheader>
      This message will be shown after user successfully submit their email.
    </v-list-subheader>
    <v-text-field
      v-model="modelValue.success_dialog.title"
      append-icon="check_circle_outline"
      label="Dialog success title"
      placeholder="Thanks..."
    ></v-text-field>
    <v-text-field
      v-model="modelValue.success_dialog.message"
      append-icon="check_circle_outline"
      label="Dialog success message"
      placeholder="Thank you, we have..."
    ></v-text-field>

    <v-list-subheader>
      This message will be shown when email is empty.
    </v-list-subheader>
    <v-text-field
      v-model="modelValue.error_dialog.title"
      append-icon="error_outline"
      label="Dialog error title"
      placeholder="Email is empty!"
    ></v-text-field>
    <v-text-field
      v-model="modelValue.error_dialog.message"
      append-icon="error_outline"
      label="Dialog error message"
      placeholder="Please enter your email address..."
    ></v-text-field>
  </div>
</template>

<script>
import LFeederInput from "../../../components/feeder/input/LFeederInput.vue";

export default {
  name: "LFeederNewsletter",
  components: { LFeederInput },
  props: {
    modelValue: {},
  },
  data: () => {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
