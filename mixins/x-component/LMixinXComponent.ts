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

import {defineComponent} from "vue";
import {LModelElement} from "@selldone/page-builder/models/element/LModelElement.ts";

const LMixinXComponent = defineComponent({
  inject: ["$builder", "$section"],
  props: {
    object: {
      type: LModelElement<any>,
    },
  },
  data: () => ({}),
  beforeCreate() {
    LOG(
      "$builder",
      this.$builder ? "✅" : "❌",
      "$section",
      this.$section ? "✅" : "❌",
    );
  },

  //------------------------------------------------- New Common -------------------------------------------------

  computed: {
    SHOW_EDIT_TOOLS() {
      return this.$builder.isEditing && !this.$builder.isHideExtra;
    },

    background_style() {
      return this.object.background?.generate();
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

  methods: {},
});
export default LMixinXComponent;

function LOG(...text: any) {
  // console.log("🪷 XMixin", ...text);
}
