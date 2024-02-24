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
    ]"
    class="page-content"
  >
    <component
      :is="section.name"
      v-for="section in $builder.sections"
      :id="section.uid"
      :key="section.uid"
      :style="section.get('$sectionData.style')"
    />
    <!--  IMPORTANT : UNIQUE ID OF RENDERED ITEM TO PREVENT WITH BUILDER STYLER!  CAN NOT DO THIS NOW! COMPONENT NOT RENDER!-->
  </div>
</template>

<script>
import { cleanDOM } from "./src/util";
import { BackgroundHelper } from "@core/helper/style/BackgroundHelper";
import { PageBuilderTypoHelper } from "@app-page-builder/src/helpers/PageBuilderTypoHelper";
import { PageBuilderColorsHelper } from "@app-page-builder/src/helpers/PageBuilderColorsHelper";

export default {
  name: "SPageRenderPopup",
  props: {
    data: {
      type: Object,
      default: () => ({
        title: "",
        sections: [],
      }),
    },
  },

  computed: {
    PageBuilderColorsHelper() {
      return PageBuilderColorsHelper;
    },
    PageBuilderTypoHelper() {
      return PageBuilderTypoHelper;
    },

    style() {
      return this.data.style ? this.data.style : {};
    },
    CUSTOM_PAGE_STYLE() {
      return BackgroundHelper.CreateCompleteBackgroundStyleObject(
        this.style.bg_custom,
        this.style.bg_gradient,
        this.style.bg_image ? this.getShopImagePath(this.style.bg_image) : null,
        this.style.bg_size,
        this.style.bg_repeat,
        this.style.bg_color,
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
    //console.log("data");
    //console.log(this.data);
    console.style("<b>🪐 Render page</b>");

    this.$builder.isEditing = false;
    this.$builder.isRendered = true;
    this.$builder.setContent(this.data);
  },

  mounted() {
    // console.log("----------->" + this.$refs.render_container);
    cleanDOM(this.$refs.render_container);
  },
};
</script>
