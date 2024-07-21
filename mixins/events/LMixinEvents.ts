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

export const LMixinEvents = defineComponent({
  data() {
    return {};
  },
  mounted() {},

  computed: {},
  methods: {
    /**
     * Emits an event to show the settings page style.
     *
     * @param {Object} style - The style object to be displayed.
     * @param {boolean} show - A flag indicating whether to show the settings page style.
     * @param {string} tab - The tab to be displayed on the settings page.
     */
    ShowLSettingsPageStyle(
      style: Object,
      show: boolean | "toggle",
      tab: string = null,
    ) {
      EventBus.$emit("show:LSettingsPageStyle", {
        style,
        show,
        tab,
      });
    },

    /**
     * Emits an event to show the settings page style.
     *
     * @param {Object} style - The style object to be displayed.
     * @param {string} tab - The tab to be displayed on the settings page.
     */
    ShowLSettingsPageTypography(style: Object, tab: string) {
      console.log("style:", style);

      EventBus.$emit("show:LSettingsPageTypography", { style, tab });
    },

    ShowLSettingsClassStyle(
      el_style: HTMLElement,
      el_class: HTMLElement,
      target: Object,
      options = {},
    ) {
      // Option: noSize: Has no sizing (Image mode) / prev_image: Filter preview image
      EventBus.$emit("show:LSettingsClassStyle", {
        el_style,
        el_class,
        target,
        options,
      });
    },

    ShowLSettingsAnimation(
      el_style: HTMLElement,
      el_class: HTMLElement,
      target: Object,
      keyStyle: string,
      keyClass: string,
      options = {},
    ) {
      // Option: noSize: Has no sizing (Image mode) / prev_image: Filter preview image
      EventBus.$emit("show:LSettingsAnimation", {
        el_style,
        el_class,
        target,
        keyStyle,
        keyClass,
        options,
      });
    },

    ShowLSettingsLink(el: HTMLElement, target: Object, keyLink: string) {
      EventBus.$emit("show:LSettingsLink", {
        el,
        target,
        keyLink,
      });
    },

    ShowLSettingsBackground(el: HTMLElement, target: LModelElement<any>) {
      EventBus.$emit("show:LSettingsBackground", {
        el,
        target,
      });
    },
    ShowLSettingsProduct(el: HTMLElement, target: XProductOverviewObject) {
      EventBus.$emit("show:LSettingsProduct", {
        el,
        target,
      });
    },
    ShowLSettingsProductsFilter(
      el: HTMLElement,
      target: Object,
      options: { view_mode: boolean },
    ) {
      EventBus.$emit("show:LSettingsProductsFilter", {
        el,
        target,
        options,
      });
    },

    ShowLSettingsFrame(el: HTMLElement, target: Object) {
      EventBus.$emit("show:LSettingsFrame", {
        el,
        target,
      });
    },

    ShowLSettingsInput(
      el: HTMLElement,
      target: Object,
      options: { no_name: boolean } | null = null,
    ) {
      EventBus.$emit("show:LSettingsInput", {
        el,
        target,
        options,
      });
    },

    ShowLSettingsForm(el: HTMLElement, target: Object) {
      EventBus.$emit("show:LSettingsForm", {
        el,
        target,
      });
    },

    ShowLSettingsSwiper(
      el: HTMLElement,
      section: Section,
      target: XFormObject,
    ) {
      EventBus.$emit("show:LSettingsSwiper", {
        el,
        section,
        target,
      });
    },
    ShowLSettingsColumn(
      el: HTMLElement,
      target: XColumnObject | XColumnImageTextObject,
    ) {
      EventBus.$emit("show:LSettingsColumn", {
        el,
        target,
      });
    },

    ShowLSettingsImageSize(
      el: HTMLElement,
      target: XUploaderObject,
      src: string | null,
      updateCallback: () => void,
    ) {
      EventBus.$emit("show:LSettingsImageSize", {
        el,
        target,
        src,
        updateCallback,
      });
    },
    ShowLSettingsImageLayers(
      el: HTMLElement,
      target: XUploaderObject,
      src: string | null,
      updateCallback: () => void,
    ) {
      EventBus.$emit("show:LSettingsImageLayers", {
        el,
        target,
        src,
        updateCallback,
      });
    },

    ShowLSettingsColor(
      element: Element,
      color: string | null,
      callback: () => void,
      alpha: boolean,
    ) {
      EventBus.$emit("show:LSettingsColor", {
        element,
        color,
        callback,
        alpha,
      });
    },

    ShowLSettingsBlogs(el: HTMLElement, target: Object) {
      EventBus.$emit("show:LSettingsBlogs", {
        el,
        target,
      });
    },

    ShowLSettingsMarquee(el: HTMLElement, target: Object) {
      EventBus.$emit("show:LSettingsMarquee", {
        el,
        target,
      });
    },

    ShowLSettingsGallery(el: HTMLElement, section: Section, target: Object) {
      EventBus.$emit("show:LSettingsGallery", {
        el,
        section,
        target,
      });
    },

    ShowLSettingsCodeEditor(
      el: HTMLElement,
      section: Section,
      target: Object,
      refresh: Function,
    ) {
      EventBus.$emit("show:LSettingsCodeEditor", {
        el,
        section,
        target,
        refresh,
      });
    },
    ShowLSettingsCodeProperties(
      el: HTMLElement,
      section: Section,
      target: Object,
      propertiesStructure: Object,
      propertiesDefault: Object,
    ) {
      EventBus.$emit("show:LSettingsCodeProperties", {
        el,
        section,
        target,
        propertiesStructure,
        propertiesDefault,
      });
    },

    /**
     * Show tools on top of the images
     * @param noPreview
     * @param augment
     * @param object
     * @param blobUrl
     * @param hasRestore
     * @param restoreImage
     * @constructor
     */
    ShowUploaderToolbar(
      noPreview,
      augment,
      object,
      blobUrl,
      hasRestore,
      restoreImage,
    ) {
      // Option: noSize: Has no sizing (Image mode) / prev_image: Filter preview image
      EventBus.$emit("show:XUploaderToolbar", {
        noPreview,
        augment,
        object,
        blobUrl,
        hasRestore,
        restoreImage,
      });
    },

    /**
     * Show feeder of the section
     * @constructor
     * @param section
     */
    ShowLFeederDialog(section: Section) {
      // Option: noSize: Has no sizing (Image mode) / prev_image: Filter preview image
      EventBus.$emit("show:LFeederDialog", {
        section,
      });
    },

    //―――――――――――――――――――――― Page builder global ――――――――――――――――――――
    /**
     * Close all except indicated code! (Almost we call it when a new tool open, and we want to close all other menus)
     * @constructor
     */
    CloseAllPageBuilderNavigationDrawerTools() {
      EventBus.$emit(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);
    },
    OnPageBuilderStylerOpen(type: StylerOptions.Argument, show: boolean) {
      EventBus.$emit(LEventsName.PAGE_BUILDER_STYLER_OPEN, {
        type,
        show,
      });
    },
  },
});
