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

import {LUtilsComponents} from "@selldone/page-builder/utils/components/LUtilsComponents.ts";
import {LModelElement, LModelElementTypes,} from "@selldone/page-builder/models/element/LModelElement.ts";

export class LUtilsLoader {
  static ClassesList: Record<string, LModelElementTypes.IModelElement> = [];

  static InitializeClassesList(): Record<
    string,
    LModelElementTypes.IModelElement
  > {
    const out: Record<string, LModelElementTypes.IModelElement> = {};

    LUtilsComponents.XObjects.forEach(
      (obj_class: LModelElementTypes.IModelElement) => {
        if (obj_class.ComponentName) {
          out[obj_class.ComponentName] = obj_class;
        } else {
          console.error("Missing component property in class", obj_class);
        }
      },
    );

    return out;
  }

  /**
   * Converts a JSON object back to an instance of LModelElement.
   * @param {object} json - The JSON object to convert.
   * @returns {LModelElement<T>} The instance of LModelElement.
   */
  static JsonObjectToInstance<T>(
    json: Record<string, any>,
  ): LModelElement<T> | null {
    if (!this.ClassesList?.length)
      this.ClassesList = this.InitializeClassesList();

    const clazz = this.ClassesList[json.component];
    if (!clazz) {
      console.error(
        "LUtilsLoader | JsonObjectToInstance | Class not found! Component:",
        json.component,
        "List:",
        this.ClassesList,
        json,
      );
      return null;
    }

    const instance = clazz.JsonToInstance(json);
    // Assuming addChild and instance checking is handled appropriately
    if (json.children) {
      json.children.forEach((child: Record<string, any>) => {
        const childInstance = LUtilsLoader.JsonObjectToInstance(child);
        if (instance && childInstance) instance.addChild(childInstance);
      });
    }

    return instance;
  }
}
