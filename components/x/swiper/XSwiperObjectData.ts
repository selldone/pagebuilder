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
import type {AutoplayOptions, GridOptions, KeyboardOptions, NavigationOptions, PaginationOptions,} from "swiper/types";

/**
 * Class representing button data with various properties.
 */
export class XSwiperObjectData extends LModelData<XSwiperObjectData> {
  autoHeight: boolean = true;
  centeredSlides: boolean = false;
  direction: string = "horizontal";
  effect: XSwiperObjectDataTypes.Effect = XSwiperObjectDataTypes.Effect.Slide;
  grabCursor: boolean = false;
  grid: GridOptions | null = null;
  height: string | undefined = undefined;
  initialSlide: number = 0;
  loop: boolean = false;
  slidesPerGroup: number | null = null;
  spaceBetween: number = 0;

  pagination: PaginationOptions | null = null;
  autoplay: AutoplayOptions | null = null;
  keyboard: KeyboardOptions | null = null;
  navigation: NavigationOptions | null = null;

  slidesPerView: number | null = null;
  slidesPerViewLg: number | null = null;
  slidesPerViewMd: number | null = null;
  slidesPerViewSm: number | null = null;

  /**
   * Active Slide Classes
   */
  active: string[] | null = null;

  /**
   *
   * @param params
   */
  constructor(params: Partial<XSwiperObjectData> = {}) {
    super();
    Object.assign(this, params);

    this.direction = params?.direction ?? "horizontal";
    this.effect = params?.effect ?? XSwiperObjectDataTypes.Effect.Slide;
    this.initialSlide = params?.initialSlide ?? 0;
    this.spaceBetween = params?.spaceBetween ?? 0;
  }

  // ━━━━━━━━━━━━━━━━━ 🟢 Setters ━━━━━━━━━━━━━━━━━
}

// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace XSwiperObjectDataTypes {
  export const enum Effect {
    Slide = "slide",
    Fade = "fade",
    Cube = "cube",
    Flip = "flip",
    Coverflow = "coverflow",
    Cards = "cards",
    Carousel = "carousel",
    Slicer = "slicer",
    Material = "material",

    // "panorama",
    //  "shutters",
    //  "gl",
    // "tinder",
    // "creative",
  }
}
