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
  <section
    v-styler:section="`${path}.classes`"
    class="section background"
    :class="object.classes"
    :style="[BACKGROUND_STYLE, object.style]"
    v-init-data-attribute="object.style"
    :id="object.id"
  >
    <!-- 📹 Background video -->
    <video-background
      v-if="object.background?.bg_video"
      :video="getVideoUrl(object.background.bg_video)"
    >
    </video-background>
    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Main Slot ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    <slot></slot>
  </section>
</template>

<script>
import VideoBackground from "@app-page-builder/sections/components/VideoBackground.vue";

export default {
  name: "XSection",
  components: { VideoBackground },

  props: {
    object: { required: true },
    path: { required: true /*Required for v-styler*/ },
  },
  data: () => ({}),
  created() {},
};
</script>

<style scoped></style>
