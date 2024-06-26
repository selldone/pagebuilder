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

import {IPageCss} from "@selldone/page-builder/Builder.ts";

/**
 * 🩴 Helper class for generating and injecting CSS into a web page.
 */

export class LandingCssHelper {
  /**
   * Generates a CSS string from an IPageCss interface object.
   * @param {IPageCss | null | undefined} css - The CSS interface object that contains raw CSS or structured CSS classes.
   * @returns {string} A string representation of the CSS rules; an empty string if input is null or undefined.
   */
  static Generate(css: IPageCss | null | undefined): string {
    if (!css) return "";
    let out = "";

    if (css.raw) out = css.raw;

    if (css.classes) {
      css.classes.forEach((cls) => {
        if (cls.value) out += `${cls.selector}\n{\n${cls.value}\n}\n`;
      });
    }

    return out;
  }

  /**
   * Injects or updates CSS into a specified HTML element using a parent selector to scope the styles.
   * It updates existing style element if present or creates a new one if not.
   * @param {IPageCss} css - The CSS styles to be applied.
   * @param {HTMLElement} target - The DOM element into which the style element will be injected.
   * @returns {HTMLStyleElement | null} The updated or newly created style element, or null if CSS text is empty.
   */
  static Inject(css: IPageCss, target: HTMLElement): HTMLStyleElement | null {
    if(!target){
      console.error("🩴 Target element is not provided for CSS injection.");
      return ;
    }
    const css_text = LandingCssHelper.Generate(css);

    if (!css_text) return null;

    // Use a consistent ID for the style element
    const styleId = "page-custom-style";

    let style = target.querySelector<HTMLStyleElement>(`#${styleId}`);
    if (!style) {
      style = document.createElement("style");
      style.id = styleId; // Set an ID to identify it later
      target.appendChild(style);
    }

    // Update the innerHTML of the style element
    style.innerHTML = css_text;

    console.log("🩴 Injected or updated CSS", style);
    return style;
  }


  /**
   * Extracts valid CSS class names from an IPageCss object.
   * @param {IPageCss} css - The CSS object containing class selectors.
   * @returns {string[]} An array of unique valid CSS class names, excluding other types of selectors.
   */
  static GetListOfClasses(css: IPageCss): string[] {
    if (!css?.classes) return [];

    // Regular expression to match class names in the selectors.
    const classRegex = /\.([a-zA-Z0-9_-]+)/g;

    const allClasses = css.classes.flatMap((cls) => {
      const matches = [];
      let match;
      // Iterate over all matches for class names in each selector
      while ((match = classRegex.exec(cls.selector)) !== null) {
        matches.push(match[1]); // Capture the class name without the dot
      }
      return matches;
    });

    // Return unique class names using a Set to filter out duplicates
    return [...new Set(allClasses)];
  }


}
