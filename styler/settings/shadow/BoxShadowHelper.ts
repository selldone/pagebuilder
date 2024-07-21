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

export class BoxShadowHelper {
  static Generate(shadow: IShadow[] | string) {
    if (!shadow) return null;
    if (isString(shadow)) return shadow;

    if (!Array.isArray(shadow) && isObject(shadow)) {
      shadow = [shadow];
    }

    const out = [];
    shadow.forEach((_item) => {
      out.push(
        `${_item.w}px ${_item.h}px ${_item.r}px ${
          _item.s
        }px ${_item.c} ${_item.i ? "inset" : ""}`,
      );
    });

    return out.join(", ");
  }

  static Extract(shadow_str: string): IShadow[] | null {
    if (!shadow_str) return null;

    const out: IShadow[] = [];
    try {
      // Split shadows by comma while accounting for possible commas in rgba colors
      const shadowStrings = shadow_str.match(/(?:[^,(]+|\([^)]*\))+/g);
      console.log("shadowStrings", shadowStrings);

      shadowStrings?.forEach((shadow_str) => {
        if (!shadow_str) return;

        const obj = this.extractShadowValues(shadow_str);
        console.log("shadowStrings -- match --> ", shadow_str, "--->", obj);

        if (obj) out.push(obj);
      });
    } catch (e) {
      console.error(e);
    }

    console.log("Shadow > Extract > Raw shadow ", shadow_str, "--->", out);

    return out;
  }

  static extractShadowValues(shadowString: string): IShadow | null {
    // Regular expression to match all parts: lengths, colors, and 'inset'
    const regex =
      /(-?\d+px)|(#[\da-fA-F]{3,8})|(rgba?\([\d\s,]+\))|(hsla?\([\d\s%,]+\))|(inset)/g;
    const matches = shadowString.match(regex);

    if (!matches) {
      return null;
    }

    // Initialize default values
    let xOffset = null;
    let yOffset = null;
    let blurRadius = null;
    let spreadRadius = null;
    let color = "#000000";
    let inset = false;

    // Categorize matched values
    matches.forEach((match) => {
      if (match.endsWith("px")) {
        if (xOffset === null) xOffset = match;
        else if (yOffset === null) yOffset = match;
        else if (blurRadius === null) blurRadius = match;
        else spreadRadius = match;
      } else if (
        match.startsWith("#") ||
        match.startsWith("rgb") ||
        match.startsWith("hsl")
      ) {
        color = match;
      } else if (match === "inset") {
        inset = true;
      }
    });

    return {
      w: parseFloat(xOffset),
      h: parseFloat(yOffset),
      r: parseFloat(blurRadius),
      s: parseFloat(spreadRadius),
      c: color,
      i: inset,
    };
  }

  static NewItem() {
    return { w: 10, h: 10, r: 15, s: 20, c: "#44444433", i: false }; // Box shadow mode
  }
}

type IShadow = {
  w: number;
  h: number;
  r: number;
  s: number;
  c: string;
  i: boolean;
};
