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

import {LUtilsFilter} from "@selldone/page-builder/utils/filter/LUtilsFilter.ts";
import {LModelBackground} from "@selldone/page-builder/models/background/LModelBackground.ts";
import {RemoveEmptyFromObject} from "@selldone/core-js/prototypes";

export class LUtilsBackground {
  /**
   * Creates a complete background style object.
   * @param {IBackground} background - The background configuration.
   * @returns {object} The background style object.
   */
  static CreateCompleteBackgroundStyleObject(
    background: IBackground | LModelBackground,
    augment:any=null,bypass:boolean=true
  ): object {
    if (!window.CDN.GET_SHOP_IMAGE_PATH) {
      console.error(
        "LModelBackground | window.CDN.GET_SHOP_IMAGE_PATH is not defined! Define the function to convert image path to url.",
      );
      return {};
    }

    const {
      bg_custom = null,
      bg_gradient = null,
      bg_image = null,
      bg_size = null,
      bg_repeat = null,
      bg_color = null,
      dark = false,
      bg_position = null,
      bg_rotation = null,
      bg_backdrop = null,
    } = background || {};

    let imageUrl = bg_image ? window.CDN.GET_SHOP_IMAGE_PATH(bg_image) : null as string;

    if(bg_image?.includes('{{')){
      //console.log('bg_image',bg_image,'bypass',bypass,'augment',augment,'out',bg_image.applyAugment(augment,false))
      // Dynamic Value!
      if(bypass){
        imageUrl=require('../../components/x/uploader/assets/dynamic-image-placeholder.png')
      }else{
        imageUrl=window.CDN.GET_SHOP_IMAGE_PATH(bg_image.applyAugment(augment,false))
      }

    }


    if (bg_custom && bg_custom.includes("background")) {
      return this.StringStyleToObj(bg_custom);
    }

    const out = {
      backgroundColor: bg_color,
      backgroundImage: this.CreateBackgroundImageStyle(
        bg_custom,
        bg_gradient,
        imageUrl,
        bg_rotation,
      ),
      backgroundSize: this.CreateBackgroundSizeStyle(
        bg_custom,
        bg_gradient,
        imageUrl,
        bg_size,
      ),
      backgroundRepeat: bg_repeat ,
      backgroundPosition: bg_position ,

      // 🍃 Set backdrop filter:
      backdropFilter: bg_backdrop
        ? LUtilsFilter.CalcFilter(bg_backdrop)
        : undefined,
    };

    return RemoveEmptyFromObject(out);
  }

  /**
   * Converts a string style to an object.
   * @param {string} style - The style string.
   * @returns {object} The style object.
   */
  static StringStyleToObj(style: string): Record<string, string> {
    if (!style) return {};
    const attributes = style.trim().split(";");
    const result: Record<string, string> = {};
    attributes.forEach(attribute => {
      const [key, ...value] = attribute.split(":");
      if (!key) return;
      result[key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase())] = value.join(":").trim();
    });
    return result;
  }

  /**
   * Gets a safe background style.
   * @param {string} style - The style string.
   * @returns {object} The background style.
   */
  static GetBackgroundSafeStyle(style: string): object {
    return style && style.includes("background")
      ? { backgroundImage: style }
      : { backgroundImage: style };
  }

  /**
   * Creates a background image style string.
   * @param {string} [bg_custom] - Custom background.
   * @param {string[]} [bg_gradient] - Gradient backgrounds.
   * @param {string} [bg_image] - Background image.
   * @param {number|null} [bg_rotation] - Rotation for gradient.
   * @returns {string} The background image style string.
   */
  static CreateBackgroundImageStyle(
    bg_custom?: string,
    bg_gradient?: string[],
    bg_image?: string,
    bg_rotation?: number | null,
  ): string {
    const out = [];
    if (bg_image) out.push(`url('${bg_image}')`);

    if (bg_custom) out.push(bg_custom);

    if (bg_gradient && bg_gradient.length >= 2) {
      const gradient = `linear-gradient(${bg_rotation || 45}deg, ${bg_gradient.join(",")})`;
      out.push(gradient);
    }

    return out.join(",");
  }

  /**
   * Creates a background size style string.
   * @param {string} [bg_custom] - Custom background.
   * @param {string[]} [bg_gradient] - Gradient backgrounds.
   * @param {string} [bg_image] - Background image.
   * @param {string} [bg_size] - Background size.
   * @returns {string} The background size style string.
   */
  static CreateBackgroundSizeStyle(
    bg_custom?: string,
    bg_gradient?: string[],
    bg_image?: string,
    bg_size?: string,
  ): string {
    const out = [];
    if (bg_custom || (bg_gradient && bg_gradient.length >= 2))
      out.push("cover");
    if (bg_image) out.push(bg_size || "auto");
    return out.join(",");
  }
}
