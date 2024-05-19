/*
 * Copyright (c) 2023. Selldone® Business OS™
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

export class Avatar {}

export class Title {}

export class Text {}

export class Logo {}

export class Image {}

export class Quote {}

export class Link {}

export class ClassList {}

export class Button {
  color: string | null;
  content: string;
  dark: boolean;
  depressed: boolean | null;
  // fab: boolean | null;
  // glow: boolean | null;
  href: string | null;
  // outlined: boolean | null;
  ripple?: boolean | null;
  rounded: boolean | string | "0" | "sm" | "md" | "lg" | "xl" | null;
  size: string | number | "x-small" | "small" | "default" | "large" | "x-large";
  // text: string | null;
  // tile: boolean | null;
  variant?:
    | "flat"
    | "text"
    | "elevated"
    | "tonal"
    | "outlined"
    | "plain"
    | null;

  font?: string | null;

  constructor() {
    this.color = null;
    this.content = "Action";
    this.dark = true;
    this.depressed = null;
    // this.fab = null;
    // this.glow = null;
    this.href = null;
    // this.outlined = null;
    this.ripple = undefined;
    this.rounded = true;
    this.size = "default";
    //  this.text = null;
    //  this.tile = null;
  }
}

export class Newsletter {}

export class Input {}

// export class Grid {}

export class Products {}

export class Product {}

//export class Background {};
export class FrameProduct {}

export class FrameCategory {}

export class Html {}

export class Lottie {}

export class Background {
  bg_custom?: string;
  bg_gradient?: string[];
  bg_image?: string;
  bg_size?: string;
  bg_repeat?: string;
  bg_color?: string;
  dark?: boolean;
  bg_position?: string;
}

export class Style {}

export class Row {
  align?: string;
  justify?: string;

  fluid?: boolean;
  no_wrap?: boolean;
  columns?: Column[];
}

export class Container {}

export class Blogs {}

export class Slide {}

export class TextLoop {}

export class Column {
  title: Title;
  image: Image;
  content: Text;
  grid: Grid;
  style?: Style;

  constructor() {
    this.title = new Title();
    this.image = new Image();
    this.content = new Text();
    this.grid = new Grid();
  }
}

export class Grid {
  mobile: number;
  tablet: number | null;
  desktop: number | null;
  widescreen: number | null;

  constructor() {
    this.mobile = 12;
    this.tablet = null;
    this.desktop = null;
    this.widescreen = null;
  }
}

export class ButtonsRow {
  btn_row: Row;
  buttons: Button[];

  constructor() {
    this.btn_row = new Row();
    this.buttons = [];
  }
}
