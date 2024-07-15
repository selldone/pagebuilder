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
 * Class representing button data with various properties.
 */
export class XButtonObjectData extends LModelData<XButtonObjectData> {
  /**
   * Button color.
   */
  color: string;

  /**
   * Button content.
   */
  content: string;

  /**
   * Glow effect flag.
   */
  glow: boolean;

  /**
   * Hyperlink reference.
   */
  href: string | null;

  /**
   * Ripple effect flag.
   */
  ripple: boolean;

  /**
   * Designates the border-radius applied to the component. This can be 0, xs, sm, true, lg, xl, pill, circle, and shaped.
   * Rounded corners flag.
   */
  rounded: XButtonObjectDataTypes.IRounded | null;

  /**
   * Default unit is px. Can also use the following predefined sizes: x-small, small, default, large, and x-large.
   * Button size.
   */
  size: XButtonObjectDataTypes.ISize;

  /**
   * Button align in its parent.
   */
  align: XButtonObjectDataTypes.IAlign | null;

  variant: XButtonObjectDataTypes.IVariant;

  elevation: number | null;

  /**
   * Creates an instance of XButtonData.
   * @param options
   */
  constructor(options: XButtonObjectDataTypes.IOptions = {}) {
    super();
    this.color = options.color || "";
    this.content = options.content || "";
    this.glow = options.glow || false;
    this.href = options.href || null;
    this.ripple = options.ripple || false;
    this.rounded = options.rounded || null;
    this.size = options.size || "x-large";
    this.align = options.align || null;
    this.variant = options.variant || "elevated";
    this.elevation = options.elevation || null;
  }

  // ━━━━━━━━━━━━━━━━━ 🟢 Setters ━━━━━━━━━━━━━━━━━
  public setColor(color: string) {
    this.color = color;
    return this;
  }

  public setContent(content: string) {
    this.content = content;
    return this;
  }

  public setGlow(glow: boolean) {
    this.glow = glow;
    return this;
  }

  public setHref(href: string | null) {
    this.href = href;
    return this;
  }

  public setRipple(ripple: boolean) {
    this.ripple = ripple;
    return this;
  }

  public setRounded(rounded: XButtonObjectDataTypes.IRounded | null) {
    this.rounded = rounded;
    return this;
  }

  public setSize(size: string) {
    this.size = size;
    return this;
  }

  public setAlign(align: XButtonObjectDataTypes.IAlign | null) {
    this.align = align;
    return this;
  }

  public setVariant(variant: XButtonObjectDataTypes.IVariant | null) {
    this.variant = variant;
    return this;
  }

  public setElevation(elevation: number | null) {
    this.elevation = elevation;
    return this;
  }
}

// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace XButtonObjectDataTypes {
  export type ISize =
    | "x-small"
    | "small"
    | "default"
    | "large"
    | "x-large"
    | string
    | number;
  export type IVariant =
    | "flat"
    | "text"
    | "elevated"
    | "tonal"
    | "outlined"
    | "plain"
    | null;

  export type IAlign =
    | "left"
    | "center"
    | "right"
    | "justify"
    | "start"
    | "end";

  export type IRounded =
    | 0
    | "xs"
    | "sm"
    | "true"
    | "lg"
    | "xl"
    | "pill"
    | "circle"
    | "shaped";

  export interface IOptions {
    color?: string;
    content?: string;
    glow?: boolean;
    href?: string | null;
    ripple?: boolean;
    rounded?: XButtonObjectDataTypes.IRounded | null;
    size?: XButtonObjectDataTypes.ISize | null;
    align?: XButtonObjectDataTypes.IAlign | null;
    variant?: XButtonObjectDataTypes.IVariant | null;
    elevation?: number | null;
  }
}
