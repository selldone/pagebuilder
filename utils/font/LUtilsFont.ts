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
   * List of found fonts on the section.
   * @returns {*[]}
   */
  public static FindAllFontsInSection(data: Record<string, any>) {
    const fonts: string[] = [];

    LUtilsObject.IterateOverSectionData(data, (text: any) => {
      if (isString(text)) {
        const div = document.createElement("div");
        div.innerHTML = text.trim();
        $(div)
          .find("*")
          .each(function () {
            const font = $(this)
              .css("font-family")
              .replace(/[`~!@#$%^&*()_|\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
            if (font && !fonts.includes(font.trim())) {
              fonts.push(font.trim());
            }
          });
      }
      return text;
    });

    return fonts;
  }
}
