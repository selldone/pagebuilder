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

import {isObject, isString} from "lodash-es";
import {CONSOLE} from "@selldone/core-js/helper";

export class TextShadowHelper {
  static Generate(shadow: Array | string) {
    if (!shadow) return "";
    if (isString(shadow)) return shadow;

    if (!Array.isArray(shadow) && isObject(shadow)) {
      shadow = [shadow];
    }

    const out = [];
    shadow.forEach((_item) => {
      const { w, h, r, c } = _item;
      out.push(`${w}px ${h}px ${r}px ${c}`.trim());
    });

    return out.join(", ");
  }

  static Extract(shadow_str) {
    if (!shadow_str) return null;

    const out = [];
    try {
      // Match the complete shadow definitions
      const regex =
        /(rgba?\([^)]+\)|#[0-9a-fA-F]{3,6}|[a-zA-Z]+)\s(-?\d+\.?\d*px)\s(-?\d+\.?\d*px)\s(\d+\.?\d*px)/g;

      let match;

      while ((match = regex.exec(shadow_str)) !== null) {
        const [, color, xOffset, yOffset, blurRadius] = match;

        out.push({
          w: parseFloat(xOffset),
          h: parseFloat(yOffset),
          r: parseFloat(blurRadius),
          c: color,
        });
      }
    } catch (e) {
      console.error(e);
    }

    CONSOLE.log("Shadow > Extract > Raw shadow ", shadow_str, "--->", out);

    return out.length ? out : null;
  }

  static NewItem() {
    return { w: 5, h: 5, r: 5, c: "#FFA000" }; // Text shadow mode
  }
}
