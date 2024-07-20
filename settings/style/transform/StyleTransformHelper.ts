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

export class StyleTransformHelper {
  static Generate(transform: Array | string) {
    if (!transform) return null;
    const transformMap = {
      perspective: "px",
      rotate: "deg",
      rotateX: "deg",
      rotateY: "deg",
      rotateZ: "deg",
      scaleX: "",
      scaleY: "",
      scaleZ: "",
      skewX: "deg",
      skewY: "deg",
      translateX: "px",
      translateY: "px",
      translateZ: "px",
    };

    let out = "";

    Object.keys(transform).forEach((key) => {
      const value = transform[key];
      if (!value || ["auto", "none", "unset"].includes(value)) return;

      const unit = transformMap[key] || "";
      out += `${key}(${value}${unit}) `;
    });

    return out.trim();
  }

  static Extract(transform_str: string) {
    if (!transform_str) return {};
    const out = {};

    transform_str.split(" ").forEach((style) => {
      const arr = style.split("(");
      if (arr.length > 1) {
        out[arr[0].trim()] = arr[1].trim().replace(")", "").replace(";", "");
      }
    });

    // Remove deg from values: (Deg inputs are raw number!)
    Object.keys(out).forEach((key) => {
      const val = out[key];
      if (val.includes("deg")) out[key] = val.replace("deg", "");
    });

    return out;
  }
}
