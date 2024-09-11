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

import {LUtilsObject} from "../../utils/object/LUtilsObject";
import {isString} from "lodash-es";

export class LUtilsFont {
  /**
   * List of found fonts in the section.
   * This method searches through the given data for any text or style objects that contain a font family.
   * It will return a list of unique font families found.
   *
   * @param {Record<string, any>} data - The data object that contains text and/or style properties.
   * @returns {string[]} An array of unique font families found in the section.
   */
  public static FindAllFontsInSection(data: Record<string, any>): string[] {
    const fonts: string[] = [];

    LUtilsObject.IterateOverSectionData(data, (item: any) => {
      // Handle if the item is a string containing HTML
      if (isString(item)) {
        const div = document.createElement("div");
        div.innerHTML = item.trim();
        $(div)
            .find("*")
            .each(function () {
              const font = $(this)
                  .css("font-family")
                  .replace(/[`~!@#$%^&*()_|\-=?;:'",.<>\{\}\[\]\\\/]/gi, "")
                  .trim();
              if (font && !fonts.includes(font)) {
                fonts.push(font);
              }
            });
      }
      console.log("item -->", item);

      // Handle if the item is an object with a style object containing fontFamily
      if (item && typeof item === 'object' && item.style && item.style.fontFamily) {
        const font = item.style.fontFamily.trim();
        if (font && !fonts.includes(font)) {
          fonts.push(font);
        }
      }

      return item; // Return item to continue iteration
    });

    return fonts;
  }

  /**
   * Recursively find all font families in the style object of a nested structure.
   *
   * This function looks only for the `style.fontFamily` property in the nested data
   * and returns an array of unique font families found.
   *
   * @param {Record<string, any>} section_data - The data object containing nested structures.
   * @returns {string[]} An array of unique font families found in the style objects.
   */
  public static FindFontFamiliesInStyles(section_data: Record<string, any>): string[] {
    const fonts: string[] = [];

    // Helper function to recursively check style.fontFamily
    const extractFontFamily = (item: any) => {
      if (item && typeof item === 'object') {
        // Check if item has a style object with fontFamily
        if (item.style && item.style.fontFamily) {
          // console.log("item.style.fontFamily -->", item.style.fontFamily);
          const font = item.style.fontFamily
              .replace(/[`~!@#$%^&*()_|\-=?;:'",.<>\{\}\[\]\\\/]/gi, "") // Sanitize the font family
              .trim();

          // Add to fonts array if it's a new font
          if (font && !fonts.includes(font)) {
            fonts.push(font);
          }
        }

        // Recursively check children if they exist
        if (item.children && Array.isArray(item.children)) {
          item.children.forEach((child) => extractFontFamily(child));
        }
      }
    };

    // Start iterating over the data
    extractFontFamily(section_data.object);

    return fonts;
  }

}
