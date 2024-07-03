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

/**
 * Class representing text data with an associated HTML tag.
 */
export class XTextObjectData extends LModelData<XTextObjectData> {
  /**
   * HTML or text value.
   */
  value: string | null;

  /**
   * Custom HTML tag.
   */
  tag: XTextObjectDataTypes.ITag;

  /**
   * Creates an instance of XTextData.
   * @param value - HTML or text value.
   * @param tag - Custom HTML tag.
   */
  constructor(
    value: string | null = null,
    tag: XTextObjectDataTypes.ITag | null = null,
  ) {
    super();
    this.value = value;
    this.tag = tag ? tag : "p";
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━

  static NewInstance() {
    return new XTextObjectData(null, "p");
  }

  // ━━━━━━━━━━━━━━━━━ 🟢 Setters ━━━━━━━━━━━━━━━━━
  public setValue(value: string | null) {
    this.value = value;
    return this;
  }

  public setTag(tag: XTextObjectDataTypes.ITag) {
    this.tag = tag;
    return this;
  }
}

// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace XTextObjectDataTypes {
  /**
   * Type alias for the valid HTML tag types.
   */
  export type ITag =
    | "p"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "span"
    | "div";
}
