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

export class XRowObjectData extends LModelData<XRowObjectData> {
  align: XRowObjectDataTypes.IAlign;
  justify: XRowObjectDataTypes.IJustify;

  no_wrap: boolean;

  constructor(params: {
    align?: XRowObjectDataTypes.IAlign;
    justify?: XRowObjectDataTypes.IJustify;
    no_wrap?: boolean;
  }) {
    super(); // Calling the constructor of the base class

    // Use nullish coalescing operator to provide default values
    this.align = params?.align ?? "center";
    this.justify = params?.justify ?? "center";
    this.no_wrap = params?.no_wrap ?? false;
  }

  // ━━━━━━━━━━━━━━━━━ 🟢 Setters ━━━━━━━━━━━━━━━━━
  public setAlign(align: XRowObjectDataTypes.IAlign) {
    this.align = align;
    return this;
  }

  public setJustify(justify: XRowObjectDataTypes.IJustify) {
    this.justify = justify;
    return this;
  }

  public setNoWrap(no_wrap: boolean) {
    this.no_wrap = no_wrap;
    return this;
  }
}

// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace XRowObjectDataTypes {
  export type IAlign = "end" | "center" | "start" | "stretch" | "baseline";

  export type IJustify =
    | "end"
    | "center"
    | "start"
    | "space-around"
    | "space-between"
    | "space-evenly"
    | "stretch";
}
