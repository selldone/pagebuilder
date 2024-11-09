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
  <!-- ―――――――――――――――――――――― LPageViewer > Page Content ―――――――――――――――――――― -->

  <div
    v-if="isInitialized"
    ref="render_container"
    :style="[
      CUSTOM_PAGE_STYLE,
      PageBuilderTypoHelper.GenerateTypoStyle(style, $vuetify.display.name),
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
      v-for="section in sections"
      :key="section.uid"
      :id="section.uid"
      :object="section.object"
      :augment="augment"
      :section="section"
    />

    <!--  IMPORTANT : UNIQUE ID OF RENDERED ITEM TO PREVENT WITH BUILDER STYLER!  CAN NOT DO THIS NOW! COMPONENT NOT RENDER!-->
  </div>
  <!-- ――――――――――――――――――――――  Tools ―――――――――――――――――――― -->
</template>

<script lang="ts">
import { LUtilsBackground } from "../../utils/background/LUtilsBackground";
import { LUtilsClasses } from "../../utils/classes/LUtilsClasses";
import { LUtilsTypo } from "../../utils/typo/LUtilsTypo";
import { LUtilsColors } from "../../utils/colors/LUtilsColors";
import Builder from "../../Builder.ts";
import { cleanDOM } from "../../utils/html/LUtilsHtml";
import { LandingCssHelper } from "@selldone/page-builder/src/menu/left/css/LandingCssHelper";
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";
import { Section } from "@selldone/page-builder/src/section/section.ts";

export default {
  name: "LPageViewer",
  inject: ["$PageHyper"],
  components: { XComponent },
  props: {
    initialPageData: {
      type: Object,
      default: () => ({
        title: "",
        sections: [],
      }),
    },
    initialPageCss: {},

    augment: {
      // Extra information to show to dynamic show in page content
    },
  },
  data: () => ({
    PageBuilderTypoHelper: LUtilsTypo,
    PageBuilderColorsHelper: LUtilsColors,
  }),

  computed: {
    isInitialized(): boolean {
      return this.$PageHyper?.isInitialized.value || false;
    },

    style() {
      return this.initialPageData.style ? this.initialPageData.style : {};
    },
    CUSTOM_PAGE_STYLE() {
      return LUtilsBackground.CreateCompleteBackgroundStyleObject(this.style);
    },

    sections() {
      return this.$builder.sections?.filter((section: Section) => {
        // Hide to users:
        if (this.USER() && section.object.data.hide.user) return false;
        // Hide to guests:
        if (!this.USER() && section.object.data.hide.guest) return false;

        if (section.object?.data.hide.sm && this.$vuetify.display.smAndDown)
          return false;
        if (section.object?.data.hide.md && this.$vuetify.display.md)
          return false;
        if (section.object?.data.hide.lg && this.$vuetify.display.lg)
          return false;
        if (section.object?.data.hide.xl && this.$vuetify.display.xlAndUp)
          return false;

        return true;
      });
    },
  },
  watch: {
    initialPageData() {
      this.$builder.setContent(this.initialPageData);

      LandingCssHelper.Inject(
        this.initialPageCss /*Css*/,
        this.$refs.render_container,
      );
    },
  },
  provide() {
    return {
      /**
       * @deprecated MAYBE!
       */
      builder: this.$builder,

      $augment: this.augment,

      $builder: this.$builder,
    };
  },

  beforeCreate() {
    // Initialize builder
    this.$builder = Builder.newInstance(null, {
      isEditing: false,
      isRendered: true,
      showLeftMenu: false,
      isSorting: false,
    });
  },

  created() {
    console.style("<b>🪐 Render page</b>");
    this.$builder.setContent(this.initialPageData);

    if (this.$PageHyper) {
      this.$PageHyper
        .initialize()
        .then(() => {
          this.initializeViewer();
        })

        .catch((err) => {
          // Handle initialization errors
          console.error("Page Builder initialization failed:", err);
          this.error = err;
        });
    } else {
      console.error(
        "Page Builder initialization failed: $PageHyper not found! You must initialize $PageHyper before using Page Builder by `HyperPage(app,options)`!",
      );
    }
  },

  mounted() {},

  methods: {
    initializeViewer() {
      this.$nextTick(() => {
        cleanDOM(this.$refs.render_container);
        this.initAnimations(this.$refs.render_container);

        LandingCssHelper.Inject(
          this.initialPageCss /*Css*/,
          this.$refs.render_container,
        );
      });
    },

    initAnimations(target) {
      this.$nextTick(() => {
        let classSelector = LUtilsClasses.AnimationsClasses()
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
        return LUtilsClasses.AnimationsClasses().includes(className);
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
<style lang="scss"></style>
