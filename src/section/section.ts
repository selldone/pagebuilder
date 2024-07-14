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
import {LModelElement} from "@selldone/page-builder/models/element/LModelElement.ts";
import {LUtilsMigration} from "@selldone/page-builder/utils/migration/LUtilsMigration.ts";
import {Page} from "@selldone/core-js/models";
import {LUtilsLoader} from "@selldone/page-builder/utils/loader/LUtilsLoader.ts";

const DEBUG = false;
export namespace Section {
  export interface IData {
    id?: string;

    [key: string]: any;
  }

  export interface ISection {
    uid: string;
    label: string;
    object: LModelElement<any> | null;

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
  public object: LModelElement<any> | null = null; // 🪵 New Version!

  /**
   * @deprecated
   */
  public data: Section.IData | null = null; // TODO: Deduplicated OLD!
  /**
   * @deprecated
   */
  public name: string;

  constructor(options: Page.ISection, force_set_new_uid: boolean = false) {

    this.label = options.label?options.label:options.name;
    if(!this.label)this.label='Section'
    this.uid = options.uid;

    LOG(
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
      console.log(
        `Try to migrate section ${options.name} from V1 to V2. options:`,
        options,
      );
      try {
        LUtilsMigration.MigrateSectionV1toV2(options);
      } catch (e) {
        console.error(`Migration failed for ${options.name}!`, e);
      }
      console.log(
        `After migration ${options.name} from V1 to V2. Data:`,
        options.data,
        "Object:",
        options.object,
      );
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━ V2 ━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (options.object && isObject(options.object)) {
      console.log(
        `🪵 ${this.label} | New version load data in section...`,
        options,
      );

      this.object = LUtilsLoader.JsonObjectToInstance(options.object);
    }
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━ Error  ━━━━━━━━━━━━━━━━━━━━━━━━━━
    else {
      console.log(
        `We can not find object in the section or migrate from V1 to V2. Options in the section:`,
        options,
      );
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━ Create by Seeder  ━━━━━━━━━━━━━━━━━━━━━━━━━━
    /* else {
           console.log(`Create new instance by seeder.`);
     
           const _object = LUtilsSeeder.SeedNew(options.name);
           LOG(
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

      LOG(
        `🪷 ${this.label} | Section.ts > constructor > UID (NEW):`,
        this.uid,
        "force",
        force_set_new_uid,
      );
    } else {
      LOG(
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

  set(name: string, value: Object) {
    LOG(`⚽ ${name} | Section > Set`, "name", name, "value", value);

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
        console.log("🌶 Remove empty tags", text);
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
}

function LOG(...text: any) {
  if (DEBUG) console.log("🐤 SECTION", ...text);
}
