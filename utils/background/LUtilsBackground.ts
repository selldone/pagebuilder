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

import {LUtilsFilter} from "@selldone/page-builder/utils/filter/LUtilsFilter.ts";

export class LUtilsBackground {
  static CreateCompleteBackgroundStyleObject(
    bg_custom?: string,
    bg_gradient?: string[],
    bg_image?: string,
    bg_size?: string,
    bg_repeat?: string,
    bg_color?: string,
    dark: boolean = false,
    bg_position: string = "center",
    bg_rotation: number = 45 /*deg*/,
    bg_backdrop: [] = null /*Backdrop Filter*/,
  ) {
    if (bg_custom && bg_custom.includes("background")) {
      const out = this.StringStyleToObj(bg_custom);
     /* if (!out.color && dark !== null && dark !== undefined) {
        out.color = dark ? "#fff" : "#333";
      }*/
      return out;
    }

    const out = {
      backgroundColor: bg_color,
      backgroundImage: this.CreateBackgroundImageStyle(
        bg_custom,
        bg_gradient,
        bg_image,
        bg_rotation,
      ),
      backgroundSize: this.CreateBackgroundSizeStyle(
        bg_custom,
        bg_gradient,
        bg_image,
        bg_size,
      ),
      backgroundRepeat: bg_repeat,
    /*  color:
        dark === null || dark === undefined
          ? undefined
          : dark
            ? "#fff"
            : "#333",*/
      backgroundPosition: bg_position,
    };

    // 🍃 Set backdrop filter:
    if (bg_backdrop) {
        out["backdropFilter"] = LUtilsFilter.CalcFilter(bg_backdrop);
    }

    //   console.log('CreateCompleteBackgroundStyleObject',out)
    return out;
  }

  static StringStyleToObj(style: string) {
    if (!style) return {};
    const attributes = style.trim().split(";");
    const result: Record<string, string> = {};
    for (let i = 0; i < attributes.length; i++) {
      const entry = attributes[i].split(":");

      // Convert to camel case:
      const key = entry
        .splice(0, 1)[0]
        .trim()
        .replace(/-([a-z])/g, function (g) {
          return g[1].toUpperCase();
        });
      if (!key) continue;

      result[key] = entry.join(":");
    }
    return result;
  }

  static GetBackgroundSafeStyle(style: string) {
    if (style && style.includes("background")) return style;
    return { backgroundImage: style };
  }

  static CreateBackgroundImageStyle(
    bg_custom?: string,
    bg_gradient?: string[],
    bg_image?: string,
    bg_rotation: number,
  ) {
    const out = [];

    if (bg_custom) out.push(bg_custom);

    let gradient = "";
    if (bg_gradient && bg_gradient.length >= 2) {
      gradient = `linear-gradient(${bg_rotation}deg`;
      bg_gradient.forEach(function (e) {
        gradient += "," + e;
      });
      gradient += ")";
      out.push(gradient);
    }

    if (bg_image) out.push(`url('${bg_image}')`);

    return out.join(",");
  }

  static CreateBackgroundSizeStyle(
    bg_custom?: string,
    bg_gradient?: string[],
    bg_image?: string,
    bg_size?: string,
  ) {
    const out = [];

    if (bg_custom) out.push("cover");

    if (bg_gradient && bg_gradient.length >= 2) {
      out.push("cover");
    }

    if (bg_image) out.push(bg_size);

    return out.join(",");
  }
}
