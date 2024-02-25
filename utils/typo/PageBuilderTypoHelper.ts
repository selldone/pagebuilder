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

export class PageBuilderTypoHelper {
  static H1_SIZE_DEFAULT = "2em";
  static H2_SIZE_DEFAULT = "1.5em";
  static H3_SIZE_DEFAULT = "1.17em";
  static H4_SIZE_DEFAULT = "1em";
  static H5_SIZE_DEFAULT = "0.83em";
  static H6_SIZE_DEFAULT = "0.67em";
  static P_SIZE_DEFAULT = undefined;

  static GenerateTypoStyle(style) {
    return {
      "--base-font-size": style?.font_size ? style.font_size + "px" : "16px",

      "--h1-font-size":
        style?.h1_size && !["auto", "unset", "0", 0].includes(style.h1_size)
          ? style.h1_size
          : this.H1_SIZE_DEFAULT,
      "--h2-font-size":
        style?.h2_size && !["auto", "unset", "0", 0].includes(style.h2_size)
          ? style.h2_size
          : this.H2_SIZE_DEFAULT,
      "--h3-font-size":
        style?.h3_size && !["auto", "unset", "0", 0].includes(style.h3_size)
          ? style.h3_size
          : this.H3_SIZE_DEFAULT,
      "--h4-font-size":
        style?.h4_size && !["auto", "unset", "0", 0].includes(style.h4_size)
          ? style.h4_size
          : this.H4_SIZE_DEFAULT,
      "--h5-font-size":
        style?.h5_size && !["auto", "unset", "0", 0].includes(style.h5_size)
          ? style.h5_size
          : this.H5_SIZE_DEFAULT,
      "--h6-font-size":
        style?.h6_size && !["auto", "unset", "0", 0].includes(style.h6_size)
          ? style.h6_size
          : this.H6_SIZE_DEFAULT,
      "--p-font-size":
        style?.p_size && !["auto", "unset", "0", 0].includes(style.p_size)
          ? style.p_size
          : this.P_SIZE_DEFAULT,
    };
  }
}
