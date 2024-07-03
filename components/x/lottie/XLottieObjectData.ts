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

import {
  XUploaderDataTypes,
  XUploaderObjectData,
} from "@selldone/page-builder/components/x/uploader/XUploaderObjectData.ts";

export class XLottieObjectData extends XUploaderObjectData {
  constructor(src: string | null, setting: null | XUploaderDataTypes.Setting) {
    super(src, setting);
  }
}
