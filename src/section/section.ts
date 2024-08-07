/*
 * Copyright (c) 2023-2024. Selldone® Business OS™
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

import getPath from "lodash-es/get";
import toPath from "lodash-es/toPath";
import {isObject, isString} from "lodash-es";
import {LUtilsObject} from "../../utils/object/LUtilsObject";
import {LUtilsMigration} from "@selldone/page-builder/utils/migration/LUtilsMigration.ts";
import {Page} from "@selldone/core-js/models";
import {LUtilsLoader} from "@selldone/page-builder/utils/loader/LUtilsLoader.ts";
import {XSectionObject} from "@selldone/page-builder/components/x/section/XSectionObject.ts";
import {Screenshot} from "@selldone/core-js/helper";
import {CONSOLE} from "@selldone/core-js";

const DEBUG = false;
export namespace Section {
  export interface IData {
    id?: string;

    [key: string]: any;
  }

  export interface ISection {
    uid: string;
    label: string;
    object: XSectionObject;

    /**
     * V1
     * Deprecated! Migrate to new version it will be null!
     * @deprecated
     */
    data: IData | null;
    /**
     * @deprecated
     */
    id: string;
    /**
     * @deprecated
     */
    name: string;
  }
}

export class Section implements Section.ISection {
  public uid: string; // New save section ID
  public label: string;
  public object: XSectionObject; // 🪵 New Version!

  /**
   * @deprecated
   */
  public data: Section.IData | null = null; // TODO: Deduplicated OLD!
  /**
   * @deprecated
   */
  public name: string;

  constructor(options: Page.ISection, force_set_new_uid: boolean = false) {
    this.label = options.label
      ? options.label
      : LUtilsMigration.MigrateNameV1toV2(options.name);
    if (!this.label) this.label = "Section";
    this.uid = options.uid;

    CONSOLE.log(
      `⚽ ${this.label} | Section > Constructor`,
      options,
      this,
      force_set_new_uid,
    );

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━ V1 [Migration] ━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Try to migrate from V1 to V2
    if (!options.object && options.data) {
      options = Object.assign({}, options);

      options.name = LUtilsMigration.MigrateSectionName(options.name);

      // Try to migrate old version:
      CONSOLE.log(
        `Try to migrate section ${options.name} from V1 to V2. options:`,
        options,
      );
      try {
        LUtilsMigration.MigrateSectionV1toV2(options);
      } catch (e) {
        console.error(`Migration failed for ${options.name}!`, e);
      }
      CONSOLE.log(
        `After migration ${options.name} from V1 to V2. Data:`,
        options.data,
        "Object:",
        options.object,
      );
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━ V2 ━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (options.object && isObject(options.object)) {
      CONSOLE.log(`🪵 ${this.label} | New version load data in section...`, options,);

      this.object = LUtilsLoader.JsonObjectToInstance(options.object);
    }
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━ Error  ━━━━━━━━━━━━━━━━━━━━━━━━━━
    else {
      CONSOLE.log(
        `We can not find object in the section or migrate from V1 to V2. Options in the section:`,
        options,
      );
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━ Create by Seeder  ━━━━━━━━━━━━━━━━━━━━━━━━━━
    /* else {
                           CONSOLE.log(`Create new instance by seeder.`);
                     
                           const _object = LUtilsSeeder.SeedNew(options.name);
                           CONSOLE.log(
                             `🪷 ${options.name} | Section.ts > constructor > Seed:`,
                             options.name,
                             "--object-->",
                             _object,
                           );
                           if (_object) {
                             this.object = _object;
                           } else {
                             console.error(`V2 Seeder does not exist for ${options.name}!`);
                           }
                     
                           // this.data = LUtilsSeeder.seed(options.schema);
                         }*/

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    if (force_set_new_uid || !this.uid /*Auto assign an id!*/) {
      // Set random ID for sections
      this.uid = "auto_" + Math.round(Math.random() * 99999999999);

      CONSOLE.log(
        `🪷 ${this.label} | Section.ts > constructor > UID (NEW):`,
        this.uid,
        "force",
        force_set_new_uid,
      );
    } else {
      CONSOLE.log(
        `🪷 ${this.label} | Section.ts > constructor > UID (EXIST):`,
        this.uid,
      );
    }
    // Compatible with missed updated in code(temporary)
    // this.id = this.uid;

    if (!this.object) {
      console.error(
        "❗The object is not defined! Please check migration from V1 to V2!",
        this.label,
      );
      return;
    }
  }

  /**
   * @deprecated
   * @param name
   * @param value
   */
  set(name: string, value: Object) {
    CONSOLE.log(`⚽ ${name} | Section > Set`, "name", name, "value", value);

    const path = toPath(name);
    const prop = path.pop();

    if (!prop) {
      console.error(
        `🪷 ${name} | Section.ts > set > prop is undefined`,
        name,
        value,
      );
      return;
    }

    path.shift();
    const obj = path.length === 0 ? this.data : getPath(this.data, path);

    if (!obj) return; // Fix. on delete item (buttons or cols this value is undefined!)

    if (typeof value === "function") {
      value(obj[prop]);
      return;
    }

    obj[prop] = value;
  }

  /**
   * @deprecated
   * @param name
   */
  get(name: string) {
    const path = toPath(name);
    const prop = path.pop();

    if (!prop) {
      console.error(`🪷 ${name} | Section.ts > get > prop is undefined`, name);
      return;
    }

    path.shift();
    const obj = path.length === 0 ? this.data : getPath(this.data, path);

    if (!obj) return; // Fix.

    return obj[prop];
  }

  destroy() {}

  /**
   * Remove empty <br> data.
   * @returns {*|{}}
   * @deprecated
   */
  removeBRFromSectionData() {
    return LUtilsObject.IterateOverSectionData(this.data, (text: any) => {
      if (isString(text) && text.trim() === "<br>") {
        CONSOLE.log("🌶 Remove empty tags", text);
        return "";
      }
      return text;
    });
  }

  toJson() {
    return {
      uid: this.uid,
      label: this.label,
      object: this.object?.toJson(),
    };
  }

  //----------------------------------------------
  private _image_rendered: string | null = null;

  /**
   * Get or create an image from section
   * @param force - Force rendering the image even if already rendered
   * @returns {Promise<string | null>} - The rendered image data URL or null if rendering fails
   */
  render(force: boolean = false): Promise<string | null> {
    return new Promise(async (resolve, reject) => {
      if (!force && this._image_rendered) {
        return resolve(this._image_rendered);
      }

      if (!this.object.$element) {
        return resolve(null);
      }

      CONSOLE.log("Render section element!");

      try {
        this._image_rendered = await Screenshot.FromElement(
          this.object.$element,
          null,
          false,
          10,
          false,
        );
        resolve(this._image_rendered);
      } catch (e) {
        // console.error("Initial rendering failed, retrying...", e);
        try {
          this._image_rendered = await Screenshot.FromElement(
            this.object.$element,
            null,
            false,
            5,
            true,
          );
          resolve(this._image_rendered);
        } catch (e) {
          reject("Retrying failed", e);
          //resolve(null);
        }
      }
    });
  }
}


