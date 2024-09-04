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

import {LUtilsBackground} from "@selldone/page-builder/utils/background/LUtilsBackground.ts";

interface IBackground {
  bg_custom?: string;
  bg_gradient?: string[];
  bg_image?: string;
  bg_size?: LModelBackgroundTypes.ISize | string;
  bg_repeat?: string;
  bg_color?: string;
  dark: boolean;
  bg_position: string;
  bg_rotation: number; // degrees
  bg_backdrop: any[]; // Backdrop Filter
  bg_video?: string; // Background filter
}

export class LModelBackground {
  bg_custom?: string;
  bg_gradient?: string[];
  bg_image?: string;
  bg_size?: LModelBackgroundTypes.ISize | string = "cover";
  bg_repeat?: string;
  bg_color?: string;
  dark: boolean;
  bg_position: string;
  bg_rotation: number;
  bg_backdrop: any[];
  bg_video?: string;

  constructor(params: IBackground | null = null) {
    if (!params) return;
    this.bg_custom = params.bg_custom;
    this.bg_gradient = params.bg_gradient;
    this.bg_image = params.bg_image;
    this.bg_size = params.bg_size ?? "cover";
    this.bg_repeat = params.bg_repeat;
    this.bg_color = params.bg_color;
    this.dark = params.dark;
    this.bg_position = params.bg_position;
    this.bg_rotation = params.bg_rotation;
    this.bg_backdrop = params.bg_backdrop;
    this.bg_video = params.bg_video;
  }

  /**
   * Generate background style object
   */
  generate( augment:any=null,bypass:boolean=true): Record<string, any> {
    return LUtilsBackground.CreateCompleteBackgroundStyleObject(
      this,
        augment,bypass
    );
  }

  hasValue(): boolean {
    return (
      !!this.bg_custom ||
      !!this.bg_gradient ||
      !!this.bg_image ||
      !!this.bg_color ||
      !!this.bg_video
    );
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

  // ━━━━━━━━━━━━━━━━━ 🍒 Clone ━━━━━━━━━━━━━━━━━

  public clone(): LModelBackground {
    return new LModelBackground(JSON.stringify(this));
  }
}

// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace LModelBackgroundTypes {
  export type ISize =
    | "auto"
    | "cover"
    | "contain"
    | "100% 100%"
    | "100% auto"
    | "auto 100%";
}
