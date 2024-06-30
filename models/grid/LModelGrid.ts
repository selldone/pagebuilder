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

interface IGrid {
  mobile?: number | null;
  tablet?: number | null;
  desktop?: number | null;
  widescreen?: number | null;
}

export class LModelGrid {
  mobile?: number | null;
  tablet?: number | null;
  desktop?: number | null;
  widescreen?: number | null;

  constructor(params: IGrid | null) {
    if (!params) return;
    this.mobile = params.mobile;
    this.tablet = params.tablet;
    this.desktop = params.desktop;
    this.widescreen = params.widescreen;
  }
}
