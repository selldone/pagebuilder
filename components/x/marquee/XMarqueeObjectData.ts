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

export class XMarqueeObjectData {
  html: string;
  duration: string;
  space: number;
  repeat: number;
  reverse: boolean;

  constructor(
    html: string,
    duration: string = "10s",
    space: number = 200,
    repeat: number = 10,
    reverse: boolean = false,
  ) {
    this.html = html;
    this.duration = duration ? duration : "10s";
    this.space = space ? space : 200;
    this.repeat = repeat ? repeat : 10;
    this.reverse = reverse;
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
