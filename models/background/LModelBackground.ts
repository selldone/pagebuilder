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

interface IBackground {
  bg_custom?: string;
  bg_gradient?: string[];
  bg_image?: string;
  bg_size?: string;
  bg_repeat?: string;
  bg_color?: string;
  dark: boolean;
  bg_position: string;
  bg_rotation: number; // degrees
  bg_backdrop: any[]; // Backdrop Filter
}

export class LModelBackground {
  bg_custom?: string;
  bg_gradient?: string[];
  bg_image?: string;
  bg_size?: string;
  bg_repeat?: string;
  bg_color?: string;
  dark: boolean;
  bg_position: string;
  bg_rotation: number;
  bg_backdrop: any[];

  constructor(params: IBackground | null) {
    if (!params) return;
    this.bg_custom = params.bg_custom;
    this.bg_gradient = params.bg_gradient;
    this.bg_image = params.bg_image;
    this.bg_size = params.bg_size;
    this.bg_repeat = params.bg_repeat;
    this.bg_color = params.bg_color;
    this.dark = params.dark;
    this.bg_position = params.bg_position;
    this.bg_rotation = params.bg_rotation;
    this.bg_backdrop = params.bg_backdrop;
  }

  CreateCompleteBackgroundStyleObject(): Record<string, any> {
    if (this.bg_custom && this.bg_custom.includes("background")) {
      const out = LModelBackground.StringStyleToObj(this.bg_custom);
      return out;
    }

    const out: Record<string, any> = {
      backgroundColor: this.bg_color,
      backgroundImage: this.CreateBackgroundImageStyle(),
      backgroundSize: this.CreateBackgroundSizeStyle(),
      backgroundRepeat: this.bg_repeat,
      backgroundPosition: this.bg_position,
    };

    // 🍃 Set backdrop filter:
    if (this.bg_backdrop) {
      out["backdropFilter"] = LUtilsFilter.CalcFilter(this.bg_backdrop);
    }

    return out;
  }

  static StringStyleToObj(style: string): Record<string, string> {
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

  static GetBackgroundSafeStyle(
    style: string,
  ): Record<string, string> | { backgroundImage: string } {
    if (style && style.includes("background"))
      return this.StringStyleToObj(style);
    return { backgroundImage: style };
  }

  CreateBackgroundImageStyle(): string {
    const out = [];

    if (this.bg_custom) out.push(this.bg_custom);

    let gradient = "";
    if (this.bg_gradient && this.bg_gradient.length >= 2) {
      gradient = `linear-gradient(${this.bg_rotation}deg`;
      this.bg_gradient.forEach(function (e) {
        gradient += "," + e;
      });
      gradient += ")";
      out.push(gradient);
    }

    if (this.bg_image) out.push(`url('${this.bg_image}')`);

    return out.join(",");
  }

  CreateBackgroundSizeStyle(): string {
    const out = [];

    if (this.bg_custom) out.push("cover");

    if (this.bg_gradient && this.bg_gradient.length >= 2) {
      out.push("cover");
    }

    if (this.bg_image) out.push(this.bg_size);

    return out.join(",");
  }

  // ━━━━━━━━━━━━━━━━━ 🍒 Clone ━━━━━━━━━━━━━━━━━

  public clone(): LModelBackground {
    return new LModelBackground(JSON.stringify(this));
  }
}
