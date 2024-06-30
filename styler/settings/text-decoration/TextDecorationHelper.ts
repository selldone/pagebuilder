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

import {isObject} from "lodash-es";

export class TextDecorationHelper {
  static Generate(decorations) {
    if (!decorations) return "";
    if (typeof decorations === "string") return decorations;

    if (!isObject(decorations)) {
      return null;
    }

    const { line, color, style, thickness } = decorations;
    const parts = [];
    if (line) parts.push(line.join(" "));
    if (color) parts.push(color);
    if (style) parts.push(style);
    if (thickness) parts.push(thickness);

    //console.log('Generated',decorations,'-->',parts.join(" ").trim())

    return parts.join(" ").trim();
  }

  static Extract(decorationStr) {
    if (!decorationStr) return null;

    try {
      // Regular expression to match text decoration properties

      const regex =
        /(\b(?:underline|overline|line-through|blink|none)\b|\b(?:solid|double|dotted|dashed|wavy)\b|rgba?\([^)]+\)|rgb\([^)]+\)|#[0-9a-fA-F]{3,8}\b|\b[a-zA-Z]+\b|\b\d+(?:px|em|rem|%|pt|cm|mm|in|pc|ex|ch|vw|vh|vmin|vmax)\b)/g;

      let match;
      const result = {
        line: [],
        color: null,
        style: null,
        thickness: null,
      };

      while ((match = regex.exec(decorationStr)) !== null) {
      //  console.log("match", match);

        const value = match[0];
        const is_thickness =
          /\d+(?:px|em|rem|%|pt|cm|mm|in|pc|ex|ch|vw|vh|vmin|vmax)/.test(value);
       // console.log("value", value, is_thickness);

        if (is_thickness) {
          // console.log("Thickness=========>", value);
          result.thickness = value;
        } else if (
          ["none", "underline", "overline", "line-through", "blink"].includes(
            value,
          )
        ) {
          result.line.push(value);
        } else if (
          ["solid", "double", "dotted", "dashed", "wavy"].includes(value)
        ) {
          result.style = value;
        } else if (
          /rgba?\([^)]+\)|rgb\([^)]+\)|#[0-9a-fA-F]{3,8}\b|[a-zA-Z]+\b/.test(
            value,
          )
        ) {
          result.color = value;
        }
      }

    //  console.log("Text Decoration > Extract > Raw decoration ", decorationStr, "--->", result);

      return result;
    } catch (e) {
      console.error(e);
    }

    return null;
  }
}
