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

export class XUploaderData {
  src: string | null;
  setting: null | XUploaderDataTypes.Setting;

  link: string | null;

  constructor(src: string | null, setting: null | XUploaderDataTypes.Setting) {
    this.src = src;
    this.setting = setting;
  }
}

export namespace XUploaderDataTypes {

  export class Setting{
    aspect: number | null;
    contain: boolean | null;
    round: boolean;
    float: any;
    bg: LModelBackground | null;
    fg: LModelBackground | null;
    size: {
      h: any;
      w: any;
      max_h: any;
      max_w: any;
      min_h: any;
      min_w: any;
    } | null;

    constructor(data?: Partial<Setting>) {
      this.aspect = (data && data.aspect) || null;
      this.contain = (data && data.contain) || false;
      this.round = (data && data.round) || false;
      this.float = (data && data.float) || null;
      this.bg = (data && data.bg) || null;
      this.fg = (data && data.fg) || null;
      this.size = (data && data.size) || {
        h: "100%",
        w: "100%",
        max_h: null,
        max_w: "100%",
        min_h: "20px",
        min_w: null,
      };
    }

  }
   interface ISetting {
    aspect: number | null;
    contain: boolean | null;
    round: boolean;
    float: any;
    bg: LModelBackground | null;
    fg: LModelBackground | null;
    size: {
      h: any;
      w: any;
      max_h: any;
      max_w: any;
      min_h: any;
      min_w: any;
    } | null;
  }
}
