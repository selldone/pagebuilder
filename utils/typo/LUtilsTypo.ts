// @ts-nocheck
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

import {Page} from "@selldone/core-js/models";


export class LUtilsTypo {
  static H1_SIZE_DEFAULT = "2em";
  static H2_SIZE_DEFAULT = "1.5em";
  static H3_SIZE_DEFAULT = "1.17em";
  static H4_SIZE_DEFAULT = "1em";
  static H5_SIZE_DEFAULT = "0.83em";
  static H6_SIZE_DEFAULT = "0.67em";
  static P_SIZE_DEFAULT = undefined;

  /**
   * GenerateTypoStyle generates a set of CSS custom properties for typography styles based on the provided style and screen size.
   *
   * @param {Style} style - An object containing typography styles such as font sizes for different screen sizes.
   * @param {Screen} screen - The current screen size (e.g., "sm", "md", "lg", etc.) used to determine which styles to apply. Use: $vuetify.display.name
   * @returns {object} An object containing CSS custom properties for the typography, including font sizes for headings, paragraphs, and base font size.
   */
  static GenerateTypoStyle(style:Page.IStyle, screen: null | 'xs' | "sm" | "md" | "lg" | "xl") {

    if(screen==='xs')screen=null;

    const resolveFontSize = (style: Page.IStyle, screen: Screen, baseKey: string): string|null => {
      const isValidSize = (size: any) => size !== undefined && size !== null && !["auto", "unset", "0", 0].includes(size);

      if (screen === "xxl" && isValidSize(style[`${baseKey}_xxl`])) return `${style[`${baseKey}_xxl`]}`;
      if (screen === "xl" && isValidSize(style[`${baseKey}_xl`])) return `${style[`${baseKey}_xl`]}`;
      if (screen === "lg" && isValidSize(style[`${baseKey}_lg`])) return `${style[`${baseKey}_lg`]}`;
      if (screen === "md" && isValidSize(style[`${baseKey}_md`])) return `${style[`${baseKey}_md`]}`;
      if (screen === "sm" && isValidSize(style[`${baseKey}_sm`])) return `${style[`${baseKey}_sm`]}`;
      if (!screen && isValidSize(style[baseKey])) return `${style[baseKey]}`;
      return null;
    };

    const resolveCascadingFontSize = (style:  Page.IStyle, screen: Screen, baseKey: string): string => {
      switch (screen) {
        case "xxl":
          return resolveFontSize(style, "xxl", baseKey) || resolveCascadingFontSize(style, "xl", baseKey);
        case "xl":
          return resolveFontSize(style, "xl", baseKey) || resolveCascadingFontSize(style, "lg", baseKey);
        case "lg":
          return resolveFontSize(style, "lg", baseKey) || resolveCascadingFontSize(style, "md", baseKey);
        case "md":
          return resolveFontSize(style, "md", baseKey) || resolveCascadingFontSize(style, "sm", baseKey);
        case "sm":
          return resolveFontSize(style, "sm", baseKey) || resolveFontSize(style, null, baseKey);
        default:
          return resolveFontSize(style, null, baseKey);
      }
    };


    // Base font size is number only without dimension!
    let baseFontSize = resolveCascadingFontSize(style, screen, "font_size");
    // Check if the base font size has no px then add px
    if (baseFontSize && !baseFontSize.includes("px")) {
      baseFontSize = `${baseFontSize}px`;
    }else if (!baseFontSize) {
        baseFontSize = "16px";
    }


    const out = {
      "--base-font-size":baseFontSize,

      "--h1-font-size": resolveCascadingFontSize(style, screen, "h1_size") || this.H1_SIZE_DEFAULT,
      "--h2-font-size": resolveCascadingFontSize(style, screen, "h2_size") || this.H2_SIZE_DEFAULT,
      "--h3-font-size": resolveCascadingFontSize(style, screen, "h3_size") || this.H3_SIZE_DEFAULT,
      "--h4-font-size": resolveCascadingFontSize(style, screen, "h4_size") || this.H4_SIZE_DEFAULT,
      "--h5-font-size": resolveCascadingFontSize(style, screen, "h5_size") || this.H5_SIZE_DEFAULT,
      "--h6-font-size": resolveCascadingFontSize(style, screen, "h6_size") || this.H6_SIZE_DEFAULT,
      "--p-font-size": resolveCascadingFontSize(style, screen, "p_size") || this.P_SIZE_DEFAULT,
    };

    const font_family = style && style.font ? style.font : undefined;
    if (font_family) {
      Object.assign(out, {
        fontFamily: font_family,
        "--font": font_family,
      });
    }

    return out;
  }
}
