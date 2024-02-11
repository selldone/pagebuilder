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
      v-model="value.input.placeholder"
      label="Input placeholder"
      placeholder="john@gmail..."
      append-icon="mail_outline"
    ></v-text-field>

    <feeder-input v-model="value.input"></feeder-input>

    <v-list-subheader>
      This message will be shown after user successfully submit their email.
    </v-list-subheader>
    <v-text-field
      v-model="value.success_dialog.title"
      label="Dialog success title"
      placeholder="Thanks..."
      append-icon="check_circle_outline"
    ></v-text-field>
    <v-text-field
      v-model="value.success_dialog.message"
      label="Dialog success message"
      placeholder="Thank you, we have..."
      append-icon="check_circle_outline"
    ></v-text-field>

    <v-list-subheader>
      This message will be shown when email is empty.
    </v-list-subheader>
    <v-text-field
      v-model="value.error_dialog.title"
      label="Dialog error title"
      placeholder="Email is empty!"
      append-icon="error_outline"
    ></v-text-field>
    <v-text-field
      v-model="value.error_dialog.message"
      label="Dialog error message"
      placeholder="Please enter your email address..."
      append-icon="error_outline"
    ></v-text-field>
  </div>
</template>

<script>
import ALIGN from "@app-page-builder/src/enums/ALIGN";
import FeederInput from "@app-page-builder/src/feeders/FeederInput.vue";

export default {
  name: "FeederNewsletter",
  components: { FeederInput },
  props: {
    value: {},
  },
  data: () => {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
