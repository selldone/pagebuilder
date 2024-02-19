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
import {EventBus} from "@core/events/EventBus";

export const LandingHistoryMixin = defineComponent({
  data() {
    return {};
  },
  mounted() {},

  computed: {},
  methods: {
    // ――――― Page builder ―――――
    /**
     * 🗲 Global page refresh trigger.
     */
    triggerRefreshGlobalPageBuilder() {
      EventBus.$emit("trigger:RefreshGlobalPageBuilder", {});
    },

    ShowGlobalPageStyleEditorDialog(style, show, tab) {
      EventBus.$emit("show:SLandingToolsStylePage", {
        style,
        show,
        tab,
      });
    },
    ShowGlobalTypographyEditorDialog(style, tab) {
      EventBus.$emit("show:GlobalTypographyEditorDialog", { style, tab });
    },

    ShowGlobalStyleEditorDialog(
      el_style,
      el_class,
      section,
      stylePath,
      classPath,
      options = {},
    ) {
      // Option: noSize: Has no sizing (Image mode) / prev_image: Filter preview image
      EventBus.$emit("show:SLandingToolsStyleElement", {
        el_style,
        el_class,
        section,
        stylePath,
        classPath,
        options,
      });
    },
    ShowGlobalAnimationEditorDialog(
      el_style,
      el_class,
      section,
      stylePath,
      classPath,
      options = {},
    ) {
      // Option: noSize: Has no sizing (Image mode) / prev_image: Filter preview image
      EventBus.$emit("show:GlobalAnimationEditorDialog", {
        el_style,
        el_class,
        section,
        stylePath,
        classPath,
        options,
      });
    },

    ShowGlobalLinkEditorDialog(el, section, urlPath) {
      EventBus.$emit("show:GlobalLinkEditorDialog", {
        el,
        section,
        urlPath,
      });
    },

    ShowGlobalBackgroundEditorDialog(el, section, backgroundPath) {
      EventBus.$emit("show:GlobalBackgroundEditorDialog", {
        el,
        section,
        backgroundPath,
      });
    },
    ShowGlobalProductSelectDialog(el, section, productPath) {
      EventBus.$emit("show:GlobalProductSelectDialog", {
        el,
        section,
        productPath,
      });
    },
    ShowGlobalProductsCategoriesSelectDialog(el, section, productsPath) {
      EventBus.$emit("show:GlobalProductsCategoriesSelectDialog", {
        el,
        section,
        productsPath,
      });
    },

    ShowGlobalProductsFrameDialog(el, section, productsPath) {
      EventBus.$emit("show:GlobalProductsFrameDialog", {
        el,
        section,
        productsPath,
      });
    },

    ShowGlobalInputEditorDialog(el, section, inputPath) {
      EventBus.$emit("show:GlobalInputEditorDialog", {
        el,
        section,
        inputPath,
      });
    },
    ShowGlobalSlideShowEditorDialog(el, section, slidePath) {
      EventBus.$emit("show:GlobalSlideShowEditorDialog", {
        el,
        section,
        slidePath,
      });
    },
    ShowGlobalXColumnLayoutEditorDialog(el, section, gridPath) {
      EventBus.$emit("show:GlobalXColumnLayoutEditorDialog", {
        el,
        section,
        gridPath,
      });
    },

    ShowGlobalImageSizeDialog(
      el,
      section,
      sizePath,
      src,
      setting,
      updateCallback,
    ) {
      EventBus.$emit("show:GlobalImageSizeDialog", {
        el,
        section,
        sizePath,
        src,
        setting,
        updateCallback,
      });
    },
    ShowGlobalImageLayersDialog(
      el,
      section,
      settingPath,
      src,
      setting,
      updateCallback,
    ) {
      EventBus.$emit("show:GlobalImageLayersDialog", {
        el,
        section,
        settingPath,
        src,
        setting,
        updateCallback,
      });
    },

    showGlobalColorSelectorDialog(element:Element, color:string|null, callback:()=>void, alpha:boolean) {
      EventBus.$emit("show:GlobalColorSelectorDialog", {
        element,
        color,
        callback,
        alpha,
      });
    },

    ShowGlobalBlogsFilterDialog(el, section, blogsPath) {
      EventBus.$emit("show:GlobalBlogsFilterDialog", {
        el,
        section,
        blogsPath,
      });
    },

    ShowGlobalTextLoopDialog(el, section, path) {
      EventBus.$emit("show:GlobalTextLoopDialog", {
        el,
        section,
        path,
      });
    },
  },
});
