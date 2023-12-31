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

<template xmlns:v-styler="http://www.w3.org/1999/xhtml">
  <x-section
    :object="$sectionData"
    path="$sectionData"
    class="-x-infinite-sec"
    v-styler:text-loop="$sectionData.text_loop"
    :style="{
      '--height': $sectionData.text_loop?.height
        ? $sectionData.text_loop?.height
        : '24px',
      '--duration': $sectionData.text_loop?.duration
        ? $sectionData.text_loop?.duration
        : '10s',
      '--font-size': $sectionData.text_loop?.font_size,
      '--font-color': $sectionData.text_loop?.font_color,
    }"
  >
    <marquee-slider
      :id="marquee_id"
      :duration="
        $sectionData.text_loop?.duration
          ? $sectionData.text_loop?.duration
          : '10s'
      "
      auto-width
      :reverse="!!$sectionData.text_loop?.reverse"
      style="min-width: 100%;"
    >
      <div
        v-html="$sectionData.text_loop?.html"
        class="-x-infinite-content"
      ></div>
    </marquee-slider>
  </x-section>
</template>

<script>
import * as types from "../../src/types";
import MarqueeSlider from "@components/ui/marquee/vue-marquee-slider.vue";

export default {
  name: "infinite-stream",
  components: { MarqueeSlider },
  cover: require("../../assets/images/covers/section-infinite-text.png"),

  group: "Text",
  label: "Infinite Marquee",
  help: {
    title: "Add an infinite scrolling text or HTML, also known as a marquee view.",
  },
  $schema: {
    classes: types.ClassList,
    row: types.Row,

    background: types.Background,
    style: types.Style,

    text_loop: types.TextLoop,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    augment: {
      // Extra information to show to dynamic show in page content
    },
  },
  data: () => ({
    marquee_id: "marquee_" + Math.round(Math.random() * 999999),
  }),
};
</script>
<style scoped lang="scss">
.-x-infinite-sec {
  min-height: var(--height);

  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}
.-x-infinite-content {
  white-space: nowrap;
  font-size: var(--font-size);
  color: var(--font-color);
}
</style>
