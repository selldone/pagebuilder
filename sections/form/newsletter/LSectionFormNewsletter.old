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
  <x-component :object="$sectionObject" :augment="augment"></x-component>
</template>

<script>
import StylerDirective from "../../../styler/StylerDirective";
import LMixinSection from "../../../mixins/section/LMixinSection";
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";

export default {
  name: "LSectionFormNewsletter",
  directives: { styler: StylerDirective },
  mixins: [LMixinSection],

  components: { XComponent },
  cover: require("../../../assets/images/covers/newsletter.svg"),
  label: "Newsletter",
  help: {
    title:
      "In this section, you can gather email addresses. These collected emails can be found under the Shop > Marketing > Stream tab.",
    video: "/app/videos/page-builder/NewsletterForm.mp4",
  },

  group: "Form",

  props: {
    augment: {
      // Extra information to show to dynamic show in page content
    },
  },

  data: () => ({
    busy: false,
    success: false,
    email: null,
  }),

  computed: {},
  watch: {},

  created() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
