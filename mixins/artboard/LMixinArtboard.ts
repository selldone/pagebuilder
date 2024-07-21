/*
 * Copyright (c) 2023-2024. Selldone® Business OS™
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
import {EventBus} from "@selldone/core-js/events/EventBus";
import {Section} from "../../src/section/section";
import LEventsName from "../../mixins/events/name/LEventsName";
import {StylerOptions} from "../../styler/StylerDirective";
import {XProductOverviewObject} from "@selldone/page-builder/components/x/product-overview/XProductOverviewObject.ts";
import {LModelElement} from "@selldone/page-builder/models/element/LModelElement.ts";
import {XFormObject} from "@selldone/page-builder/components/x/form/XFormObject.ts";
import {XUploaderObject} from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";
import {XColumnObject} from "@selldone/page-builder/components/x/column/XColumnObject.ts";
import {XColumnImageTextObject} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObject.ts";
import {LUtilsFont} from "@selldone/page-builder/utils/font/LUtilsFont.ts";
import {FontLoader} from "@selldone/core-js/helper";

export const LMixinArtboard = defineComponent({

  data() {
    return {};
  },
  mounted() {},

  computed: {},
  methods: {
    //――――――――――――――――――――――  Load Fonts ――――――――――――――――――――

    autoLoadSectionFonts(json) {
      const builder = this.$builder;
      try {
        this.fonts = LUtilsFont.FindAllFontsInSection(json);

        //console.log("Fonts ---->", this.fonts);

        if (!builder.style) builder.style = {};

        if (!builder.style.fonts || !Array.isArray(builder.style.fonts))
          builder.style.fonts = [];

        console.log("👢 builder.style ---->", builder.style);
        console.log("👢 this.fonts ---->", this.fonts);

        this.fonts.forEach((font) => {
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
  },
});
