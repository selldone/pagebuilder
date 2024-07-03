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
   * @param color - Button color.
   * @param content - Button content.
   * @param glow - Glow effect flag.
   * @param href - Hyperlink reference.
   * @param ripple - Ripple effect flag.
   * @param rounded - Rounded corners flag.
   * @param size - Button size.
   * @param align
   * @param variant
   * @param elevation
   */
  constructor(
    color: string = "",
    content: string = "",
    glow: boolean = false,
    href: string | null = null,
    ripple: boolean = false,
    rounded: XButtonObjectDataTypes.IRounded | null = null,
    size: XButtonObjectDataTypes.ISize | null = null,
    align: XButtonObjectDataTypes.IAlign | null = null,
    variant: XButtonObjectDataTypes.IVariant | null = null,
    elevation: number | null = null,
  ) {
    super();
    this.color = color;
    this.content = content;
    this.glow = glow;
    this.href = href;
    this.ripple = ripple;
    this.rounded = rounded;
    this.size = size ? size : "x-large";
    this.align = align;
    this.variant = variant ? variant : "elevated";
    this.elevation = elevation;
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
}
