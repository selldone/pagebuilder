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
  autoHeight: boolean = false;
  centeredSlides: boolean = false;
  direction: string = "horizontal";
  effect: XSwiperObjectDataTypes.Effect = XSwiperObjectDataTypes.Effect.Slide;
  grabCursor: boolean = false;
  grid: GridOptions|null = null;
  height: string | null = "640px";
  initialSlide: number = 0;
  loop: boolean = false;
  slidesPerGroup: number | "auto" = "auto";
  spaceBetween: number = 0;

  pagination: PaginationOptions | null = null;
  autoplay: AutoplayOptions | null = null;
  keyboard: KeyboardOptions | null = null;
  navigation: NavigationOptions | null = null;

  slidesPerView: number | "auto" = "auto";
  slidesPerViewLg: number | "auto" = "auto";
  slidesPerViewMd: number | "auto" = "auto";
  slidesPerViewSm: number | "auto" = "auto";

  /**
   * Active Slide Classes
   */
  active: string[] | null = null;

  /**
   *
   * @param autoHeight
   * @param centeredSlides
   * @param direction
   * @param effect
   * @param grabCursor
   * @param grid
   * @param height
   * @param initialSlide
   * @param loop
   * @param slidesPerGroup
   * @param spaceBetween
   * @param pagination
   * @param autoplay
   * @param keyboard
   * @param navigation
   * @param active
   */
  constructor({
    autoHeight = false,
    centeredSlides = false,
    direction = "horizontal",
    effect = XSwiperObjectDataTypes.Effect.Slide,
    grabCursor = false,
    grid = null,
    height = "640px",
    initialSlide = 0,
    loop = false,
    slidesPerGroup = "auto",
    spaceBetween = 0,
    pagination = null,
    autoplay = null,
    keyboard = null,
    navigation = null,
    active = null,
  }: Partial<XSwiperObjectData> = {}) {
    super();
    this.autoHeight = autoHeight;
    this.centeredSlides = centeredSlides;
    this.direction = direction;
    this.effect = effect;
    this.grabCursor = grabCursor;
    this.grid = grid;
    this.height = height;
    this.initialSlide = initialSlide;
    this.loop = loop;
    this.slidesPerGroup = slidesPerGroup;
    this.spaceBetween = spaceBetween;
    this.pagination = pagination;
    this.autoplay = autoplay;
    this.keyboard = keyboard;
    this.navigation = navigation;
    this.active = active;
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
