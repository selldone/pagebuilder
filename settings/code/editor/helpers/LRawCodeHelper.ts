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
export enum RawCodeMode {
  MODE_VUE = "vue",
  MODE_HTML = "html",
}

export class LRawCodeHelper {
  static DetectMode(code: string) {
    if (code?.includes("<!----vue---->") || code?.includes("<template>")) {
      return RawCodeMode.MODE_VUE;
    } else {
      return RawCodeMode.MODE_HTML;
    }
  }
}
