/*
 * Copyright (c) 2023. Selldone® Business OS™
 *
 * Author: M.Pajuhaan
 * Web: https://selldone.com
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * All rights reserved. In the weave of time, where traditions and innovations intermingle, this content was crafted.
 * From the essence of thought, through the corridors of creativity, each word, and sentiment has been molded.
 * Not just to exist, but to inspire. Like an artist's stroke or a sculptor's chisel, every nuance is deliberate.
 * Our journey is not just about reaching a destination, but about creating a masterpiece.
 * Tread carefully, for you're treading on dreams.
 */

import {defineComponent} from "vue";
import {findAllFontsInSection} from "@app-page-builder/src/util";
import {FontLoader} from "@core/helper/font/FontLoader.js";

const DEBUG = false;
/**
 * Mixin to provide inline editing capabilities.
 * @mixin PageBuilderMixin
 */
export const PageBuilderMixin = defineComponent({
  data() {
    return {
      /*  builder:this.$builder
                  ? this
                      .$builder
                  : inject("$builder")
        */
    };
  },
  created() {},
  methods: {
    //――――――――――――――――――――――  Load Fonts ――――――――――――――――――――

    autoLoadSectionFonts(json: any) {
      const builder = this.builder;
      try {
        this.fonts = findAllFontsInSection(json);

        if (DEBUG) console.log("Fonts ---->", this.fonts);

        if (!builder.style) builder.style = {};

        if (!builder.style.fonts || !Array.isArray(builder.style.fonts))
          builder.style.fonts = [];
        this.fonts.forEach((font: string) => {
          if (!builder.style.fonts.includes(font)) {
            builder.style.fonts.push(font);
            this.showSuccessAlert(
              "Font : " + font,
              "Font has been added successfully.",
            );
          }
        });

        // Load fonts:
        FontLoader.LoadFonts(this.fonts);
      } catch (e) {
        console.error(e);
      }
    },

    //―――――――――――――――――――――― Upload Url For Page Builder ――――――――――――――――――――

    getPageBuilderUploadUrlImage() {
      if (this.$route.params.shop_id) {
        // Popups:
        if (this.$route.params.popup_id) {
          return window.API.POST_UPLOAD_POPUP_IMAGE(
            this.$route.params.shop_id,
            this.$route.params.popup_id,
          );
        }
        // Shop landing pages & Menus:
        return window.API.POST_UPLOAD_PAGE_IMAGE(
          this.$route.params.shop_id,
          this.$route.params.page_id ? this.$route.params.page_id : "default", // Save in default (For menus / notifications custom page design)
        );
      } else {
        // Admin selldone landing builder
        return window.ADMIN_API.POST_UPLOAD_PAGE_IMAGE(
          this.$route.params.page_id,
        );
      }
    },

    getPageBuilderUploadUrlVideo() {
      if (this.$route.params.shop_id) {
        // Popups:
        if (this.$route.params.popup_id) {
          return null;
        }
        // Shop landing pages & Menus:
        return window.API.POST_UPLOAD_PAGE_VIDEO(
          this.$route.params.shop_id,
          this.$route.params.page_id ? this.$route.params.page_id : "default", // Save in default (For menus / notifications custom page design)
        );
      } else {
        // Admin selldone landing builder
        return window.ADMIN_API.POST_UPLOAD_PAGE_VIDEO(
          this.$route.params.page_id,
        );
      }
    },
  },
});
