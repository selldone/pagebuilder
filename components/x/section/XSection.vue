<!--
  - Copyright (c) 2023-2024. Selldone® Business OS™
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
    :class="[object.classes, { '-no-padding': noDefaultPadding ,'-dark':object.background?.dark}]"
    :style="[background_style, object.style]"
    class="section"
  >
    <!-- 📹 Background video -->
    <x-video-background
      v-if="object.background?.bg_video"
      :video="getVideoUrl(object.background.bg_video)"
    >
    </x-video-background>
    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Main Slot ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    <slot></slot>
  </section>
</template>

<script>
import XVideoBackground from "../../../components/x/video-background/XVideoBackground.vue";
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "../../../mixins/x-component/LMixinXComponent";
import DataXDirective from "../../../directives/DataXDirective";

export default {
  name: "XSection",
  directives: { styler: StylerDirective, "data-x": DataXDirective },
  mixins: [LMixinXComponent],
  components: { XVideoBackground },

  props: {
    object: { required: true },
    noDefaultPadding: Boolean,
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

    background_style() {
      return this.backgroundStyle(this.object.background);
    },
  },
  created() {},
};
</script>

<style scoped></style>
