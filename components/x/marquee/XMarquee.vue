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
  <div
    class="-x-infinite-sec"
    v-styler:marquee="{
      target: object,
    }"
    :class="[object.classes, { 'is-editable': $builder.isEditing }]"
    :style="[background_style, object.style]"
  >
    <u-marquee
      :id="marquee_id"
      :duration="object.data?.duration ? object.data?.duration : '10s'"
      :reverse="!!object.data?.reverse"
      auto-width
      style="min-width: 100%"
      :key="
        object.data?.html?.length +
        '-' +
        object.data?.repeat +
        '-' +
        object.data?.space
      "
      :repeat="object.data?.repeat ? object.data?.repeat : 10"
      :space="object.data?.space ? object.data?.space : 200"
    >
      <div class="-x-infinite-content" v-html="object.data?.html"></div>
    </u-marquee>
  </div>
</template>

<script>
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "@selldone/page-builder/mixins/x-component/LMixinXComponent";
import { XMarqueeObject } from "@selldone/page-builder/components/x/marquee/XMarqueeObject.ts";
import UMarquee from "@selldone/components-vue/ui/marquee/UMarquee.vue";

export default {
  name: "XMarquee",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],

  components: { UMarquee },

  props: {
    object: {
      type: XMarqueeObject,
      required: true,
    },
    augment: {},
  },

  data: () => ({
    marquee_id: "marquee_" + Math.round(Math.random() * 999999),
  }),

  computed: {
    background_style() {
      return this.backgroundStyle(this.object.background);
    },
  },
  watch: {},

  created() {},

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.-x-infinite-sec {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  .-x-infinite-content {
    white-space: nowrap;
  }
}
</style>
