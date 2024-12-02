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

import {LModelBackground} from "@selldone/page-builder/models/background/LModelBackground.ts";
import {LModelData} from "@selldone/page-builder/models/data/LModelData.ts";

export class XUploaderObjectData extends LModelData<XUploaderObjectData> {
  src: string | null;
  setting: XUploaderDataTypes.Setting;

  link: string | null;
  alt: string | null;

  constructor(params?: {
    src?: string | null;
    setting?: XUploaderDataTypes.Setting | null;
    link?: string | null;
    alt?: string | null;
  }) {
    super(); // Calling the constructor of the base class

    // Initialize src directly; it defaults to null if not provided
    this.src = params?.src ?? null;

    // Initialize setting with a default new Setting object if not provided
    if (params?.setting instanceof XUploaderDataTypes.Setting) {
      this.setting = params.setting;
    } else {
      this.setting = new XUploaderDataTypes.Setting(
        params?.setting ?? undefined,
      );
    }

    // Initialize link to null
    this.link = params?.link ?? null;

    // Initialize alt to null
    this.alt = params?.alt ?? null;
  }

  // ━━━━━━━━━━━━━━━━━ 🟢 Setters ━━━━━━━━━━━━━━━━━
  public setSrc(src: string | null) {
    this.src = src;
    return this;
  }

  public setLink(link: string | null) {
    this.link = link;
    return this;
  }
}

// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace XUploaderDataTypes {
  export class Setting {
    aspect: number | null;
    contain: boolean | null;
    round: boolean;
    float: any;

    fg: LModelBackground | null;

    constructor(data?: Partial<Setting>) {
      this.aspect = (data && data.aspect) || null;
      this.contain = (data && data.contain) || false;
      this.round = (data && data.round) || false;
      this.float = (data && data.float) || null;

      if (data?.fg) {
        if (this.fg instanceof LModelBackground) {
          this.fg = data.fg;
        } else {
          this.fg = new LModelBackground(data.fg);
        }
        //console.log('Convert foreground:', data.fg,'--->',this.fg);
      }
    }

    // ━━━━━━━━━━━━━━━━━ 🟢 Setters ━━━━━━━━━━━━━━━━━
    public setAspect(aspect: number | null) {
      this.aspect = aspect;
      return this;
    }

    public setContain(contain: boolean) {
      this.contain = contain;
      return this;
    }

    public setRound(round: boolean) {
      this.round = round;
      return this;
    }

    public setFloat(float: any) {
      this.float = float;
      return this;
    }

    public setFg(fg: LModelBackground | null) {
      this.fg = fg;
      return this;
    }

    /**
     * Override toString to generate a readable string representation
     */
    toString(): string {
      const parts: string[] = [];

      // aspect
      if (this.aspect !== null && this.aspect !== undefined) {
        parts.push(`Aspect: ${this.aspect}`);
      }

      // contain
      if (this.contain !== null && this.contain !== undefined) {
        parts.push(`Contain: ${this.contain ? 'Yes' : 'No'}`);
      }

      // round
      if (this.round !== null && this.round !== undefined) {
        parts.push(`Round: ${this.round ? 'Yes' : 'No'}`);
      }

      // float
      if (this.float !== null && this.float !== undefined) {
        parts.push(`Float: ${this.float ?? 'N/A'}`);
      }

      // Foreground background (LModelBackground)
      if (this.fg instanceof LModelBackground) {
        parts.push(`Foreground: Exists`);
      }

      // Combine all parts into a single string, excluding empty parts
      return parts.join(', ');
    }


  }
}
