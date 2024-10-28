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
    <u-widget-header
      add-caption="Set Dynamic Source"
      add-icon="whatshot"
      add-text
      icon="image"
      title="Image"
      @click:add="
        lock = false;
        object.data.src = '{{key}}';
      "
    >
    </u-widget-header>
    <v-text-field
      v-model="object.data.src"
      :append-inner-icon="lock ? 'lock' : 'lock_open'"
      :readonly="lock"
      label="Image path"
      messages="You can input an image URL or a dynamic value like { { key } }. This dynamic value can even be part of a complete URL."
      variant="underlined"
      @click:append-inner="lock = !lock"
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import { XUploaderObject } from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";

export default {
  name: "LFeederImage",
  components: {},
  props: {
    object: {
      type: XUploaderObject,
    },
  },
  data: () => {
    return {
      lock: true,
    };
  },
  methods: {},
  created() {
    this.lock = !this.object?.data.src?.includes("{{");
  },
};
</script>

<style scoped></style>
