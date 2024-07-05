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

export class XCodeObjectData extends LModelData<XCodeObjectData> {
  code: string = "";
  mode: XCodeObjectDataTypes.Mode | null = null;


  properties: Record<string, any> | null = null;

  constructor(
    mode: XCodeObjectDataTypes.Mode | null,
    code: string = "",
    properties: Record<string, any> | null,
  ) {
    super();
    this.mode = mode;
    this.code = code;
    this.properties = properties;
  }

  // ━━━━━━━━━━━━━━━━━ 🟢 Setters ━━━━━━━━━━━━━━━━━

  public setCode(code: string): XCodeObjectData {
    this.code = code;
    return this;
  }

  public setMode(mode: XCodeObjectDataTypes.Mode): XCodeObjectData {
    if (!Object.values(XCodeObjectDataTypes.Mode).includes(mode)) {
      console.error(`XCodeObjectData | Invalid mode: ${mode}`);
      return this;
    }
    this.mode = mode;
    return this;
  }

  public setProperties(
    properties: Record<string, any> | null,
  ): XCodeObjectData {
    this.properties = properties;
    return this;
  }
}

// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace XCodeObjectDataTypes {
  export enum Mode {
    MODE_VUE = "vue",
    MODE_HTML = "html",
  }
}
