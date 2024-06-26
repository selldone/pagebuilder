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

<template xmlns:v-styler="http://www.w3.org/1999/xhtml">
  <x-section
    v-styler:marquee="{
      target: $sectionData,
      keyMarquee: 'text_loop',
    }"
    :object="$sectionData"
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
    class="-x-infinite-sec"
  >
    <u-marquee
      :id="marquee_id"
      :duration="
        $sectionData.text_loop?.duration
          ? $sectionData.text_loop?.duration
          : '10s'
      "
      :reverse="!!$sectionData.text_loop?.reverse"
      auto-width
      style="min-width: 100%"
      :key="
        $sectionData.text_loop?.html?.length +
        '-' +
        $sectionData.text_loop?.repeat +
        '-' +
        $sectionData.text_loop?.space
      "
      :repeat="
        $sectionData.text_loop?.repeat ? $sectionData.text_loop?.repeat : 10
      "
      :space="
        $sectionData.text_loop?.space ? $sectionData.text_loop?.space : 200
      "
    >
      <div
        class="-x-infinite-content"
        v-html="$sectionData.text_loop?.html"
      ></div>
    </u-marquee>
  </x-section>
</template>

<script>
import * as types from "../../../src/types/types";
import UMarquee from "@selldone/components-vue/ui/marquee/UMarquee.vue";
import StylerDirective from "../../../styler/StylerDirective";
import LMixinSection from "../../../mixins/section/LMixinSection";
import XSection from "@selldone/page-builder/components/x/section/XSection.vue";

export default {
  name: "LSectionTextMarquee",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],
  components: {XSection, UMarquee },
  cover: require("../../../assets/images/covers/section-infinite-text.png"),

  group: "Text",
  label: "Infinite Marquee",
  help: {
    title:
      "Add an infinite scrolling text or HTML, also known as a marquee view.",
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
<style lang="scss" scoped>
.-x-infinite-sec {
  min-height: var(--height);

  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.-x-infinite-content {
  white-space: nowrap;
  font-size: var(--font-size) !important;
  color: var(--font-color) !important;
}
</style>
