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
    class="page-content"
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
  >
    <div v-for="section in $builder.sections" :key="section.uid">
      <component
        :is="section.name"
        :id="section.uid"
        :style="section.get('$sectionData.style')"
        :augment="augment"
      />
    </div>

    <!--  IMPORTANT : UNIQUE ID OF RENDERED ITEM TO PREVENT WITH BUILDER STYLER!  CAN NOT DO THIS NOW! COMPONENT NOT RENDER!-->
  </div>
  <!-- ――――――――――――――――――――――  Tools ―――――――――――――――――――― -->
</template>

<script>
import { cleanDOM } from "./src/util";
import { BackgroundHelper } from "@core/helper/style/BackgroundHelper";
import { FontLoader } from "@core/helper/font/FontLoader";
import { ClassesHelper } from "@core/helper/style/Classes";
import { PageBuilderTypoHelper } from "@app-page-builder/src/helpers/PageBuilderTypoHelper";
import { PageBuilderColorsHelper } from "@app-page-builder/src/helpers/PageBuilderColorsHelper";

export default {
  name: "SPageRender",
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
    PageBuilderTypoHelper: PageBuilderTypoHelper,
    PageBuilderColorsHelper: PageBuilderColorsHelper,
    cleanDOM: cleanDOM,
  }),

  computed: {
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
      this.$builder.set(this.data);
      //-------------------
    },
  },
  created() {
    // Load fonts:
    if (this.style) FontLoader.LoadFonts(this.style.fonts);

    //console.log("data");
    //console.log(this.data);
    console.style("<b>🪐 Render page</b>");

    this.$builder.isEditing = false;
    this.$builder.isRendered = true;
    this.$builder.set(this.data);
  },

  mounted() {
    // console.log("----------->" + this.$refs.render_container);
    this.$nextTick(() => {
      cleanDOM(this.$refs.render_container);
      this.initAnimations(this.$refs.render_container);
    });
  },

  methods: {
    initAnimations(target) {
      this.$nextTick(() => {
        let classSelector = ClassesHelper.AnimationsClasses()
          .map((c) => "." + c)
          .join(", ");

        $(target)
          .find(classSelector)
          .each(function () {
            this.style.setProperty("opacity", "0", "important");
          });

        let observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              let threshold =
                parseFloat($(entry.target).data("threshold")) || 0.3; // Get from this attribute: data-threshold="0.7"
              // console.log('threshold',threshold,entry.intersectionRatio)

              if (entry.intersectionRatio >= threshold) {
                //console.log("observer :", entry);

                const t = this;

                // Set the threshold to 0.5
                let img = entry.target.querySelector("img[src]");
                if (img) {
                  img.onload = img.onerror = function () {
                    t.playAnimation(entry.target);
                    // Optionally unobserve the target after it has become visible
                    observer.unobserve(entry.target);
                  };
                  if (img.complete) img.onload(); // If image is already loaded, manually trigger onload
                } else {
                  t.playAnimation(entry.target);

                  // Optionally unobserve the target after it has become visible
                  observer.unobserve(entry.target);
                }
              }
            });
          },
          {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], // Set the threshold to 0.5
          },
        );

        $(target)
          .find(classSelector)
          .each((i, childElement) => {
            observer.observe(childElement);
            //console.log("init observer", childElement);
          });
      });
    },

    playAnimation(childElement) {
      let classLists = $(childElement).attr("class").split(/\s+/);

      // get animation classes
      let animation_classes = $.grep(classLists, function (className) {
        return ClassesHelper.AnimationsClasses().includes(className);
      });

      //if (animation_classes.length) console.log("🎠 Animation", animation_classes);

      // Initially hide the elements
      $(childElement).css("visibility", "hidden");

      $(childElement).removeClass(animation_classes.join(" "));

      // Wait set visibility of parent
      setTimeout(() => {
        $(childElement).css("opacity", "1");

        $(childElement).addClass(animation_classes.join(" "));
        // Make the elements visible when animation is triggered
        $(childElement).css("visibility", "visible");
      }, 100);
    },
  },
};
</script>
<style lang="scss">
.hm150 {
  min-height: 150px;
}
</style>
