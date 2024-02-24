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
    :id="object.id"
    v-data-x="object.style"
    v-styler:section="sectionBinding"
    :class="object.classes"
    :style="[BACKGROUND_STYLE, object.style]"
    class="section background"
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
import StylerDirective from "@app-page-builder/styler/StylerDirective";
import XMixin from "@app-page-builder/mixins/XMixin";
import DataXDirective from "@app-page-builder/directives/DataXDirective";

export default {
  name: "XSection",
  directives: { styler: StylerDirective, "data-x": DataXDirective },
  mixins: [XMixin],
  components: { VideoBackground },

  props: {
    object: { required: true },
  },
  data: () => ({}),
  computed: {
    /**
     * 🐍 Use compute for better performance.
     * @return {{target: *}}
     */
    sectionBinding() {
      return { target: this.object };
    },
  },
  created() {},
};
</script>

<style scoped></style>
