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

import {LModelElement,} from "@selldone/page-builder/models/element/LModelElement.ts";
import {LUtilsLoader} from "@selldone/page-builder/utils/loader/LUtilsLoader.ts";

export class LUtilsClone {
  // ━━━━━━━━━━━━━━━━━ 🍒 Clone ━━━━━━━━━━━━━━━━━
  /**
   * Creates a deep clone of the provided LModelElement instance.
   *
   * This method converts the provided instance to its JSON representation
   * and then back to a new instance of LModelElement, effectively creating a deep clone.
   *
   * @template T - The type parameter of the LModelElement.
   * @param {LModelElement<T>} element - The instance of LModelElement to clone.
   * @returns {LModelElement<T>} A new instance of LModelElement that is a deep clone of the original.
   */
  public static CloneElement<T>(element: LModelElement<T>): LModelElement<T> {
    return LUtilsLoader.JsonObjectToInstance<T>(element.toJson());
  }

}
