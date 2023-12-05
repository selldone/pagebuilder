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
  <div class="widget-box">
    <s-widget-header
      title="Image"
      icon="image"
      add-icon="whatshot"
      add-caption="Set Dynamic Source"
      @click:add="
        lock = false;
        value.src = '{{key}}';
      "
      add-text
    >
    </s-widget-header>
    <v-text-field
      v-model="value.src"
      label="Image path"
      @change="$emit('change', value)"
      @click:append="lock = !lock"
      :append-icon="lock ? 'lock' : 'lock_open'"
      :disabled="lock"
      messages="You can input an image URL or a dynamic value like { { key } }. This dynamic value can even be part of a complete URL."
    ></v-text-field>
  </div>
</template>

<script>

export default {
  name: "FeederImage",
  components: {
  },
  props: {
    value: {},
  },
  data: () => {
    return {
      lock: true,
    };
  },
  methods: {},
  created() {
    this.lock = !this.value?.src?.includes("{{");
  },
};
</script>

<style scoped></style>
