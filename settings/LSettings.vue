<!--
  - Copyright (c) 2024. Selldone® Business OS™
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
  <!-- ――――――――――――――――――――――  Dialog Master Page Style ―――――――――――――――――――― -->

  <LSettingsPageStyle></LSettingsPageStyle>
  <LSettingsPageTypography></LSettingsPageTypography>

  <!-- ――――――――――――――――――――――  Dialog Master Style ―――――――――――――――――――― -->

  <l-settings-class-style></l-settings-class-style>
  <l-settings-background></l-settings-background>
  <l-settings-product></l-settings-product>
  <l-settings-products-filter></l-settings-products-filter>

  <l-settings-animation></l-settings-animation>

  <l-settings-color></l-settings-color>

  <l-settings-blogs></l-settings-blogs>

  <l-settings-link></l-settings-link>

  <l-settings-frame></l-settings-frame>
  <l-settings-input></l-settings-input>
  <l-settings-form></l-settings-form>

  <l-settings-swiper></l-settings-swiper>
  <l-settings-column></l-settings-column>
  <l-settings-marquee></l-settings-marquee>

  <l-settings-gallery></l-settings-gallery>

  <l-settings-code-editor></l-settings-code-editor>
  <l-settings-code-properties></l-settings-code-properties>


  <l-settings-embed-page></l-settings-embed-page>


  <!-- ――――――――――――――――――――――  Dialog Master Style Image ―――――――――――――――――――― -->

  <l-settings-image-size></l-settings-image-size>
  <l-settings-image-layers></l-settings-image-layers>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LSettingsLink from "@selldone/page-builder/settings/link/LSettingsLink.vue";
import LSettingsMarquee from "@selldone/page-builder/settings/marquee/LSettingsMarquee.vue";
import LSettingsGallery from "@selldone/page-builder/settings/gallery/LSettingsGallery.vue";
import LSettingsProductsFilter from "@selldone/page-builder/settings/products-filter/LSettingsProductsFilter.vue";
import LSettingsBackground from "@selldone/page-builder/settings/background/LSettingsBackground.vue";
import LSettingsColor from "@selldone/page-builder/settings/color/LSettingsColor.vue";
import LSettingsForm from "@selldone/page-builder/settings/form/LSettingsForm.vue";
import LSettingsImageLayers from "@selldone/page-builder/settings/image/layers/LSettingsImageLayers.vue";
import LSettingsClassStyle from "@selldone/page-builder/settings/class-style/LSettingsClassStyle.vue";
import LSettingsPageStyle from "@selldone/page-builder/settings/page/style/LSettingsPageStyle.vue";
import LSettingsColumn from "@selldone/page-builder/settings/column/LSettingsColumn.vue";
import LSettingsInput from "@selldone/page-builder/settings/input/LSettingsInput.vue";
import LSettingsFrame from "@selldone/page-builder/settings/frame/LSettingsFrame.vue";
import LSettingsCodeProperties from "@selldone/page-builder/settings/code/editor/LSettingsCodeProperties.vue";
import LSettingsPageTypography from "@selldone/page-builder/settings/page/typography/LSettingsPageTypography.vue";
import LSettingsCodeEditor from "@selldone/page-builder/settings/code/editor/LSettingsCodeEditor.vue";
import LSettingsProduct from "@selldone/page-builder/settings/product/LSettingsProduct.vue";
import LSettingsSwiper from "@selldone/page-builder/settings/swiper/LSettingsSwiper.vue";
import LSettingsImageSize from "@selldone/page-builder/settings/image/size/LSettingsImageSize.vue";
import LSettingsBlogs from "@selldone/page-builder/settings/blogs/LSettingsBlogs.vue";
import LSettingsAnimation from "@selldone/page-builder/settings/animation/LSettingsAnimation.vue";
import LSettingsEmbedPage from "@selldone/page-builder/settings/embed/page/LSettingsEmbedPage.vue";

export default defineComponent({
  name: "LSettings",
  components: {
    LSettingsEmbedPage,
    LSettingsAnimation,
    LSettingsBlogs,
    LSettingsImageSize,
    LSettingsSwiper,
    LSettingsProduct,
    LSettingsCodeEditor,
    LSettingsPageTypography,
    LSettingsCodeProperties,
    LSettingsFrame,
    LSettingsInput,
    LSettingsColumn,
    LSettingsPageStyle,
    LSettingsClassStyle,
    LSettingsImageLayers,
    LSettingsForm,
    LSettingsColor,
    LSettingsBackground,
    LSettingsProductsFilter,
    LSettingsGallery,
    LSettingsMarquee,
    LSettingsLink,
  },
  data() {
    return {};
  },

  computed: {},

  beforeCreate() {},
});
</script>

<style scoped lang="scss"></style>
