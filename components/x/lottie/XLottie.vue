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
  <x-uploader
    :object="object"
    :aspect-ratio="1"
    :augment="augment"
    file-key="lottie"
    no-preview
    @uploaded="refreshAnimation"
    accept="application/json"
  >
    <template v-slot="{ src }">
      <u-lottie
        v-if="show_lottie_view"
        :options="{
          path: getShopJsonPath(src),
          loop: true,
          autoplay: true,
        }"
        :speed="1"
        class="-in-animation"
        height="auto"
        style="max-width: 800px; max-height: 800px"
        width="100%"
      />
    </template>
  </x-uploader>
</template>

<script lang="ts">
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "@selldone/page-builder/mixins/x-component/LMixinXComponent";
import XUploader from "@selldone/page-builder/components/x/uploader/XUploader.vue";
import { XLottieObject } from "@selldone/page-builder/components/x/lottie/XLottieObject.ts";
import { defineAsyncComponent } from "vue";

export default {
  name: "XLottie",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],

  components: {
    XUploader,
    // Asynchronously load the u-lottie component
    ULottie: defineAsyncComponent(
      () =>
        import(
          /* webpackChunkName: "plug-lottie" */ "@selldone/components-vue/ui/lottie/ULottie.vue"
        ),
    ),
  },

  props: {
    object: {
      type: XLottieObject,
      required: true,
    },
    augment: {},
  },

  data: () => ({
    show_lottie_view: true,
  }),
  computed: {},
  watch: {},

  created() {},

  mounted() {},

  methods: {
    refreshAnimation() {
      this.show_lottie_view = false;
      this.$nextTick(function () {
        this.show_lottie_view = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
