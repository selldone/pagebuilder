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
 * Class representing button data with various properties.
 */
export class XButtonObjectData {
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
   * Rounded corners flag.
   */
  rounded: boolean | string;

  /**
   * Button size.
   */
  size: string;

  /**
   * Creates an instance of XButtonData.
   * @param color - Button color.
   * @param content - Button content.
   * @param glow - Glow effect flag.
   * @param href - Hyperlink reference.
   * @param ripple - Ripple effect flag.
   * @param rounded - Rounded corners flag.
   * @param size - Button size.
   */
  constructor(
    color: string = "",
    content: string = "",
    glow: boolean = false,
    href: string | null = null,
    ripple: boolean = false,
    rounded: boolean | string = false,
    size: string = "x-large",
  ) {
    this.color = color;
    this.content = content;
    this.glow = glow;
    this.href = href;
    this.ripple = ripple;
    this.rounded = rounded;
    this.size = size;
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

  public setRounded(rounded: boolean | string) {
    this.rounded = rounded;
    return this;
  }

  public setSize(size: string) {
    this.size = size;
    return this;
  }
}
