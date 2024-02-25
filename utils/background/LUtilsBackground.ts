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

export class LUtilsBackground {
  static CreateCompleteBackgroundStyleObject(
    bgCustom?: string,
    bgGradient?: string[],
    bgImage?: string,
    bgImageSize?: string,
    BgImageRepeat?: string,
    bgColor?: string,
    dark: boolean = false,
    position: string = "center",
  ) {
    if (bgCustom && bgCustom.includes("background")) {
      const out = this.StringStyleToObj(bgCustom);
      if (!out.color && dark !== null && dark !== undefined) {
        out.color = dark ? "#fff" : "#333";
      }
      return out;
    }

    const out = {
      backgroundColor: bgColor,
      backgroundImage: this.CreateBackgroundImageStyle(
        bgCustom,
        bgGradient,
        bgImage,
      ),
      backgroundSize: this.CreateBackgroundSizeStyle(
        bgCustom,
        bgGradient,
        bgImage,
        bgImageSize,
      ),
      backgroundRepeat: BgImageRepeat,
      color:
        dark === null || dark === undefined
          ? undefined
          : dark
            ? "#fff"
            : "#333",
      backgroundPosition: position,
    };

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
    bgCustom?: string,
    bgGradient?: string[],
    bgImage?: string,
  ) {
    const out = [];

    if (bgCustom) out.push(bgCustom);

    let gradient = "";
    if (bgGradient && bgGradient.length >= 2) {
      gradient = "linear-gradient(45deg";
      bgGradient.forEach(function (e) {
        gradient += "," + e;
      });
      gradient += ")";
      out.push(gradient);
    }

    if (bgImage) out.push(`url('${bgImage}')`);

    return out.join(",");
  }

  static CreateBackgroundSizeStyle(
    bgCustom?: string,
    bgGradient?: string[],
    bgImage?: string,
    bgImageSize?:string,
  ) {
    const out = [];

    if (bgCustom) out.push("cover");

    if (bgGradient && bgGradient.length >= 2) {
      out.push("cover");
    }

    if (bgImage) out.push(bgImageSize);

    return out.join(",");
  }
}
