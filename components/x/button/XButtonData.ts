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
export class XButtonData {
  /**
   * Button color.
   */
  color: string;

  /**
   * Button content.
   */
  content: string;

  /**
   * Dark theme flag.
   */
  dark: boolean;

  /**
   * Floating action button flag.
   */
  fab: boolean;

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
   * Tile style flag.
   */
  tile: boolean;

  /**
   * Creates an instance of XButtonData.
   * @param color - Button color.
   * @param content - Button content.
   * @param dark - Dark theme flag.
   * @param depressed - Depressed style flag.
   * @param fab - Floating action button flag.
   * @param glow - Glow effect flag.
   * @param href - Hyperlink reference.
   * @param ripple - Ripple effect flag.
   * @param rounded - Rounded corners flag.
   * @param size - Button size.
   * @param tile - Tile style flag.
   */
  constructor(
    color: string = "",
    content: string = "",
    dark: boolean = false,
    fab: boolean = false,
    glow: boolean = false,
    href: string | null = null,
    ripple: boolean = false,
    rounded: boolean | string = false,
    size: string = "x-large",
    tile: boolean = false,
  ) {
    this.color = color;
    this.content = content;
    this.dark = dark;
    this.fab = fab;
    this.glow = glow;
    this.href = href;
    this.ripple = ripple;
    this.rounded = rounded;
    this.size = size;
    this.tile = tile;
  }
}
