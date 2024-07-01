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

export class XRowObjectData {
  align: string | null;
  justify: string | null;

  no_wrap: boolean | null;

  constructor(
    align: string | null,
    justify: string | null,
    no_wrap: boolean | null,
  ) {
    this.align = align;

    this.justify = justify;
    this.no_wrap = no_wrap;
  }

  // ━━━━━━━━━━━━━━━━━ 🟢 Setters ━━━━━━━━━━━━━━━━━
  public setAlign(align: string) {
    this.align = align;
    return this;
  }

  public setJustify(justify: string) {
    this.justify = justify;
    return this;
  }

  public setNoWrap(no_wrap: boolean) {
    this.no_wrap = no_wrap;
    return this;
  }
}
