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
  <x-component :object="$sectionObject" :augment="augment"></x-component>
</template>

<script>
import StylerDirective from "../../../styler/StylerDirective";
import LMixinSection from "../../../mixins/section/LMixinSection";
import { defineComponent } from "vue";
import coverImage from "../../../assets/images/covers/hero-1.svg";
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";

export default defineComponent({
  name: "LSectionHeroHorizontal",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],
  components: {
    XComponent,
  },
  cover: coverImage,
  label: "Horizontal Hero",
  help: {
    title: "Place this section at the beginning of your page.",
    video: "/app/videos/page-builder/SectionHeroHorizontal.mp4",
  },

  group: "Hero",

  props: {
    /**
     * 🪵 New version!
     */
    object: {},

    id: {
      type: Number,
      required: true,
    },
    augment: {
      // Extra information to show to dynamic show in page content
    },
  },

  data: () => ({}),

  computed: {},
  watch: {},
  beforeCreate() {},
  created() {
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━ 🪵 Convert to new page: ━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (this.$sectionObject) {
      console.log("🪵 New version detected!", this.$sectionObject);
      return; //🪵 New version!
    }
    console.log(
      "❗Load old data! It should migrate before here.",
      "LSectionHeroHorizontal | Section Data:",
      this.$sectionData,
    );
  },

  methods: {},
});
</script>

<style lang="scss" scoped></style>
