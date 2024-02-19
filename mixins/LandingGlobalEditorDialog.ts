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
import {PageBuilderColorsHelper} from "@app-page-builder/src/helpers/PageBuilderColorsHelper";

const LandingGlobalEditorDialog = defineComponent({
  props: {
    builder: {
      type: Object,
      required: true,
    },
  },
  data: () => ({}),
  beforeCreate() {},
  updated() {},


  computed: {
    /**
     * Apply custom plate colors on style variables.
     * @return {{"--plate-dark-12": string, "--plate-light-1": any, "--plate-dark-11": any, "--plate-light-2": any, "--plate-light-3": any, "--plate-light-4": any, "--plate-light-5": any, "--plate-light-6": any, "--plate-light-7": any, "--plate-light-8": any, "--plate-light-9": any, "--plate-dark-8": any, "--plate-dark-9": any, "--plate-dark-6": any, "--plate-light-10": any, "--plate-dark-7": any, "--plate-dark-4": any, "--plate-light-12": string, "--plate-dark-5": any, "--plate-light-11": any, "--plate-dark-2": any, "--plate-dark-10": any, "--plate-dark-3": any, "--plate-dark-1": any}}
     */
    pageStyleVariables() {
      return (
        this.builder &&
        PageBuilderColorsHelper.GenerateColorsStyle(this.builder.style)
      );
    },
  },

  watch: {},

  created() {},

  methods: {},
});
export default LandingGlobalEditorDialog;
