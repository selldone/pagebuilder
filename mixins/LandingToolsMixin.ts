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
import {Section} from "@app-page-builder/src/section";

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

    ShowGlobalPageStyleEditorDialog(style:Object, show:boolean, tab:string) {
      EventBus.$emit("show:SLandingToolsStylePage", {
        style,
        show,
        tab,
      });
    },
    ShowGlobalTypographyEditorDialog(style:Object, tab:string) {
      EventBus.$emit("show:GlobalTypographyEditorDialog", { style, tab });
    },

    ShowGlobalStyleEditorDialog(
      el_style: HTMLElement,
      el_class: HTMLElement,
      target: Object,
      keyStyle: string,
      keyClass: string,
      options = {},
    ) {
      // Option: noSize: Has no sizing (Image mode) / prev_image: Filter preview image
      EventBus.$emit("show:SLandingToolsStyleElement", {
        el_style,
        el_class,
        target,
        keyStyle,
        keyClass,
        options,
      });
    },
    ShowGlobalAnimationEditorDialog(
      el_style:HTMLElement,
      el_class:HTMLElement,
      section:Section,
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

    ShowGlobalLinkEditorDialog(el:HTMLElement, section, urlPath) {
      EventBus.$emit("show:GlobalLinkEditorDialog", {
        el,
        section,
        urlPath,
      });
    },

    ShowGlobalBackgroundEditorDialog(el:HTMLElement, target:Object, keyBackground:string) {
      EventBus.$emit("show:GlobalBackgroundEditorDialog", {
        el,
        target,
        keyBackground,
      });
    },
    ShowGlobalProductSelectDialog(el:HTMLElement, target:Object) {
      EventBus.$emit("show:GlobalProductSelectDialog", {
        el,
        target,
      });
    },
    ShowGlobalProductsCategoriesSelectDialog(el:HTMLElement, target:Object,keyFilter:string) {
      EventBus.$emit("show:GlobalProductsCategoriesSelectDialog", {
        el,
        target,
        keyFilter
      });
    },

    ShowGlobalProductsFrameDialog(el:HTMLElement, target:Object,keyFrameCategory:string,keyFrameProduct:string) {
      EventBus.$emit("show:GlobalProductsFrameDialog", {
        el,
        target,
        keyFrameCategory,keyFrameProduct

      });
    },

    ShowGlobalInputEditorDialog(el:HTMLElement, target:Object) {
      EventBus.$emit("show:GlobalInputEditorDialog", {
        el,
        target,
      });
    },
    ShowGlobalSlideShowEditorDialog(el:HTMLElement,section:Section, target:Object, keySlide:string) {
      EventBus.$emit("show:GlobalSlideShowEditorDialog", {
        el,
        section,
        target,
        keySlide,
      });
    },
    ShowSLandingToolsColumnLayout(el:HTMLElement, target:Object) {
      EventBus.$emit("show:SLandingToolsColumnLayout", {
        el,
        target,
      });
    },

    ShowGlobalImageSizeDialog(
      el:HTMLElement,
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
      el:HTMLElement,
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

    showGlobalColorSelectorDialog(
      element: Element,
      color: string | null,
      callback: () => void,
      alpha: boolean,
    ) {
      EventBus.$emit("show:GlobalColorSelectorDialog", {
        element,
        color,
        callback,
        alpha,
      });
    },

    ShowGlobalBlogsFilterDialog(el:HTMLElement, target:Object, keyFilter:string) {
      EventBus.$emit("show:GlobalBlogsFilterDialog", {
        el,
        target,
        keyFilter,
      });
    },

    ShowGlobalTextLoopDialog(el:HTMLElement, target:Object, keyMarquee:string) {
      EventBus.$emit("show:GlobalTextLoopDialog", {
        el,
        target,
        keyMarquee,
      });
    },
  },
});
