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
  <!-- ――――――――――――――――――――――  Page Content ―――――――――――――――――――― -->

  <div
    ref="render_container"
    :style="[
      CUSTOM_PAGE_STYLE,
      PageBuilderTypoHelper.GenerateTypoStyle(style),
      PageBuilderColorsHelper.GenerateColorsStyle(style),
      {
        '--bg-color': style.bg_color ? style.bg_color : '#fff',
        fontFamily: style && style.font ? style.font : undefined,
      },
      {
        '--background': style.bg_color
          ? style.bg_color
          : '#fff' /*IMPORTANT! Used by shop dynamic css. e.g. fade scrolls*/,
      },
    ]"
    class="page-content"
  >
    <x-component
      v-for="section in $builder.sections"
      :key="section.uid"
      :section="section"
      :id="section.uid"
      :object="section.object"
      :augment="augment"
    />
    <!--  IMPORTANT : UNIQUE ID OF RENDERED ITEM TO PREVENT WITH BUILDER STYLER!  CAN NOT DO THIS NOW! COMPONENT NOT RENDER!-->
  </div>
</template>

<script>
import { LUtilsBackground } from "../utils/background/LUtilsBackground";
import { LUtilsTypo } from "../utils/typo/LUtilsTypo";
import { LUtilsColors } from "../utils/colors/LUtilsColors";
import { FontLoader } from "@selldone/core-js/helper/font/FontLoader";
import { cleanDOM } from "../utils/html/LUtilsHtml";
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";

export default {
  name: "LPagePopup",
  components: { XComponent },
  props: {
    data: {
      type: Object,
      default: () => ({
        title: "",
        sections: [],
      }),
    },
    augment: {
      // Extra information to show to dynamic show in page content
    },
  },
  data: () => ({
    PageBuilderTypoHelper: LUtilsTypo,
    PageBuilderColorsHelper: LUtilsColors,
  }),
  computed: {
    style() {
      return this.data.style ? this.data.style : {};
    },
    CUSTOM_PAGE_STYLE() {
      return LUtilsBackground.CreateCompleteBackgroundStyleObject(
          this.style
      );
    },
  },
  watch: {
    data() {
      this.$builder.isEditing = false;
      this.$builder.isRendered = true;
      this.$builder.setContent(this.data);
      //-------------------
    },
  },
  created() {
    // Load fonts:
    if (this.style) FontLoader.LoadFonts(this.style.fonts);

    console.style("<b>🪐 Render page</b>");

    this.$builder.isEditing = false;
    this.$builder.isRendered = true;
    this.$builder.setContent(this.data);
  },

  mounted() {
    this.$nextTick(() => {
      cleanDOM(this.$refs.render_container);
      this.initAnimations(this.$refs.render_container);
    });
  },
};
</script>
