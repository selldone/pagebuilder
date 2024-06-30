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

/**
 * Interface defining the structure for XTextData.
 */
interface IXTextData {
  /**
   * HTML or text value.
   */
  value: string | null;

  /**
   * Custom HTML tag.
   */
  tag: IXTextDataTypes.IType | null;
}

export namespace IXTextDataTypes {
  /**
   * Type alias for the valid HTML tag types.
   */
  export type IType =
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

/**
 * Class representing text data with an associated HTML tag.
 */
export class XTextData implements IXTextData {
  /**
   * HTML or text value.
   */
  value: string | null;

  /**
   * Custom HTML tag.
   */
  tag: TagType | null;

  /**
   * Creates an instance of XTextData.
   * @param value - HTML or text value.
   * @param tag - Custom HTML tag.
   */
  constructor(value: string | null = null, tag: TagType | null = null) {
    this.value = value;
    this.tag = tag;
  }
}
