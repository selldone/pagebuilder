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
  <!-- 📹 Background video -->
  <video
    :poster="poster"
    autoplay
    class="bg-video hide-on-blueprint"
    loop
    muted
    playsinline
  >
    <source :src="video" :type="VideoHelper.GetMime(video)" />
  </video>
</template>

<script lang="ts">
import { VideoHelper } from "@selldone/core-js/helper/video/VideoHelper";

export default {
  name: "XVideoBackground",
  props: {
    video: {},
    poster: {},
  },
  data() {
    return {
      VideoHelper: VideoHelper,
    };
  },
};
</script>

<style scoped></style>
