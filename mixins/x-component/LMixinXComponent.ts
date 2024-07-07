/*
 * Copyright (c) 2024. Selldone® Business OS™
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

import {LUtilsBackground} from "../../utils/background/LUtilsBackground";
import {defineComponent, inject} from "vue";
import Builder from "../../Builder.ts";
import {Section} from "../../src/section/section";
import {Background, Grid} from "../../src/types/types";

const LMixinXComponent = defineComponent({
  data: () => ({
    $builder: null as Builder | null,
    $section: null as Section | null,
  }),
  beforeCreate() {
    // Get builder from main page editor/viewer
    this.$builder = inject("$builder");

    // Get section from parent section
    this.$section = inject("$section");

    LOG(
      "$builder",
      this.$builder ? "✅" : "❌",
      "$section",
      this.$section ? "✅" : "❌",
    );
  },
  updated() {
  /*  try {
      if (typeof this.$el.querySelectorAll === "function")
        Array.from(this.$el.querySelectorAll("[contentEditable]")).forEach(
          (el: any) => {
            el.contentEditable = this.$builder.isEditing;
          },
        );
    } catch (e) {
      console.error("updated | x component", e, this);
    }*/
  },

  //------------------------------------------------- New Common -------------------------------------------------

  computed: {
    SHOW_EDIT_TOOLS() {
      return this.$builder.isEditing && !this.$builder.isHideExtra;
    },
  },

  watch: {},

  created() {},
  mounted() {
    // Assign current element to object (Temporary variable)
    this.object.$element = this.$el;
  },
  updated() {
    // Reassign current element to object (Temporary variable)
    this.object.$element = this.$el;
  },

  methods: {
    backgroundStyle(background: Background) {
      if (!background) return null;

      return LUtilsBackground.CreateCompleteBackgroundStyleObject(
        background.bg_custom,
        background.bg_gradient,
        background.bg_image ? this.getShopImagePath(background.bg_image) : null,
        background.bg_size,
        background.bg_repeat,
        background.bg_color,
        background.dark,
        background.bg_position,
        background.bg_rotation,
        background.bg_backdrop,
      );
    },

  },
});
export default LMixinXComponent;

function LOG(...text: any) {
  // console.log("🪷 XMixin", ...text);
}
