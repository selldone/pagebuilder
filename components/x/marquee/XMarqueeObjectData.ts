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

import {LModelData} from "@selldone/page-builder/models/data/LModelData.ts";

export class XMarqueeObjectData extends LModelData<XMarqueeObjectData> {
  html: string;
  duration: string;
  space: number;
  repeat: number;
  reverse: boolean;

  constructor(params: {
    html?: string;
    duration?: string;
    space?: number;
    repeat?: number;
    reverse?: boolean;
  }) {
    super(); // Calling the constructor of the base class

    this.html = params.html ?? "";
    this.duration = params.duration ?? "10s";
    this.space = params.space ?? 200;
    this.repeat = params.repeat ?? 10;
    this.reverse = params.reverse ?? false;
  }

  // ━━━━━━━━━━━━━━━━━ 🟢 Setters ━━━━━━━━━━━━━━━━━
  setHtml(html: string) {
    this.html = html;
    return this;
  }

  setDuration(duration: string) {
    this.duration = duration;
    return this;
  }

  setSpace(space: number) {
    this.space = space;
    return this;
  }

  setRepeat(repeat: number) {
    this.repeat = repeat;
    return this;
  }

  setReverse(reverse: boolean) {
    this.reverse = reverse;
    return this;
  }
}
