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

let STANDARD_CLASSES = null;

const ANIMATION_CLASSES = [
  "blinker",
  "jump",
  "bounceIn",
  "bounceInDown",
  "bounceInLeft",
  "bounceInRight",
  "bounceInUp",
  "fadeIn",
  "fadeInDown",
  "fadeInDownBig",
  "fadeInLeft",
  "fadeInLeftBig",
  "fadeInRight",
  "fadeInRightBig",
  "fadeInUp",
  "fadeInUpBig",
  "flipInX",
  "flipInY",
  "lightSpeedIn",
  "rotateIn",
  "rotateInDownLeft",
  "rotateInDownRight",
  "rotateInUpLeft",
  "rotateInUpRight",
  "zoomIn",
  "zoomInDown",
  "zoomInLeft",
  "zoomInRight",
  "zoomInUp",
  "slideInDown",
  "slideInLeft",
  "slideInRight",
  "slideInUp",
  "heartbeat",

  "slideInDownSmall",
];
const HOVER_CLASSES = [
  "hover-scale",
  "hover-scale-small",
  "hover-scale-tiny",
  "hover-grayscale-80",
  "hover-grayscale-100",
  "hover-opacity",
  "card-3d-up",
  "hover-round-2rem",
  "hover-shadow",
  "hover-shadow-large",
  "hover-sepia",
  "hover-sepia-inv",
  "hover-invert",
  "hover-invert-inv",
];

export class ClassesHelper {
  static AnimationsClasses() {
    return ANIMATION_CLASSES;
  }

  static HoversClasses() {
    return HOVER_CLASSES;
  }

  static StandardClasses() {
    if (STANDARD_CLASSES) return STANDARD_CLASSES;

    const out = [];

    // Extra:
    out.push(
      ...[
        "overflow-hidden",
        "white--text",
        "black--text",
        "text-white",
        "blockquote",
        "text-h1",
        "text-h2",
        "text-h3",
        "text-h4",
        "text-h5",
        "text-h6",
        "subtitle-1",
        "subtitle-2",
        "body-1",
        "body-2",
        "text-start",
        "text-end",
        "text-left",
        "text-right",
        "text-justify",
        "rounded-0",
        "rounded-sm",
        "rounded-md",
        "rounded-lg",
        "rounded-xl",
        "rounded-pill",
        "rounded-circle",

        "ma-auto",
        "mx-auto",
        "my-auto",

        "max-w-100p",
        "max-h-100p",
        "float-start",
        "float-end",

        "d-flex",
        "justify-center",
        "align-center",
      ],
    );

    // Margins:
    out.push(...this.AutoGenerateResponsive("ma-", -16, 16));
    out.push(...this.AutoGenerateResponsive("mt-", -16, 16));
    out.push(...this.AutoGenerateResponsive("mb-", -16, 16));
    out.push(...this.AutoGenerateResponsive("ms-", -16, 16));
    out.push(...this.AutoGenerateResponsive("me-", -16, 16));
    out.push(...this.AutoGenerateResponsive("mx-", 0, 16));
    out.push(...this.AutoGenerateResponsive("my-", 0, 16));

    // Padding
    out.push(...this.AutoGenerateResponsive("pa-", 0, 16));
    out.push(...this.AutoGenerateResponsive("pt-", 0, 16));
    out.push(...this.AutoGenerateResponsive("pb-", 0, 16));
    out.push(...this.AutoGenerateResponsive("ps-", 0, 16));
    out.push(...this.AutoGenerateResponsive("pe-", 0, 16));
    out.push(...this.AutoGenerateResponsive("px-", 0, 16));
    out.push(...this.AutoGenerateResponsive("py-", 0, 16));
    // Elevation
    out.push(...this.AutoGenerate("elevation-", 0, 16));

    // Cols
    out.push(...this.AutoGenerateResponsive("v-col-", 1, 12));

    out.push(...ANIMATION_CLASSES);
    out.push(...HOVER_CLASSES);

    STANDARD_CLASSES = out;
    return out;
  }

  static AutoGenerateResponsive(prefix, start, end) {
    const out = [];
    ["", "sm-", "md-", "lg-"].forEach((it) => {
      out.push(...this.AutoGenerate(prefix + it, start, end));
    });

    return out;
  }

  static AutoGenerate(prefix, start, end) {
    const out = [];
    for (let i = start; i < end; i++) {
      out.push(prefix + (i < 0 ? "n" : "") + Math.abs(i));
    }
    return out;
  }

    /**
     * return just hover classes from classes of  landing component
     * @param classes
     * @constructor
     */
  static GetHovers(classes): string[] {
    if (!classes || !Array.isArray(classes)) return [];

    return classes
      .filter((x) => ClassesHelper.HoversClasses().includes(x))
      .unique();
  }

    /**
     * Return just animation classes from classes of  landing component
     * @param classes
     * @constructor
     */
  static GetAnimations(classes): string[] {
    if (!classes || !Array.isArray(classes)) return [];

    return classes
      .filter((x) => ClassesHelper.AnimationsClasses().includes(x))
      .unique();
  }

    /**
     * Get threshould from style of landing component
     * @param style
     * @constructor
     */

  static GetThreshold(style): number {
    return style?.threshold;
  }
}
