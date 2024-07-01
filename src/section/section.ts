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
import {LUtilsSeeder} from "../../utils/seeder/LUtilsSeeder";
import {isObject, isString} from "lodash-es";
import {LUtilsObject} from "../../utils/object/LUtilsObject";
import {LModelElement} from "@selldone/page-builder/models/element/LModelElement.ts";

const DEBUG = false;
export namespace Section {
  export interface IData {
    id?: string;

    [key: string]: any;
  }

  export interface IOptions {
    name: string;
    uid: string; // [New] save section ID (previously we saved section ID in data.id)
    /**
     * @deprecated
     */
    schema: {
      name: string;
      schema: any;
      data: any;
      /**
       * The function that will be called when the section is initialized.
       * Not saved in the data.
       */
      $init?: Function;
    } & Record<
      string,
      any
    > /*More optional data (Not save on the model on database)*/;

    /**
     * New version
     */
    object: LModelElement | null;

    /**
     * @Deprecated
     * Old version
     */
    data?: IData;
  }

  export interface ISection {
    uid: string;
    id: string;
    name: string;
    schema: Object;
    object: LModelElement | null;


    data: IData|null; // Deprecated! Migrate to new version it will be null!
    //stylers: { instance: App; container: Element }[];
  }
}

export class Section implements Section.ISection {
  public uid: string; // New save section ID
  public id: string; // Old save section ID in data.id (deprecated)
  public name: string;
  public schema: any;
  public data: Section.IData | null = null; // TODO: Deduplicated OLD!

  public object: LModelElement | null = null; // 🪵 New Version!


  constructor(options: Section.IOptions, force_set_new_uid: boolean = false) {
    LOG(
      `⚽ ${options.name} | Section > Constructor`,
      options,
      this,
      force_set_new_uid,
    );
    LOG(`🪷 ${options.name} | `, options);

    // this.id=options.data?.id
    options = Object.assign({}, options);
    this.name = options.name;
    this.schema = options.schema;
    this.uid = options.uid;

    // TODO: Should implement for new version here:
    if (options.object && isObject(options.object)) {
      console.log(
        `🪵 ${options.name} | New version load data in section...`,
        options,
      );
      this.object = options.object /* || LUtilsSeeder.seed(options.schema)*/; // TODO: Should seed generate new version compatible data!
    } else if (options.data) {
      /*Old Version*/
      console.log(
        `${options.name} | Load data from old version!`,
        options.data,
      );
      this.data = options.data;
      //this.stylers = [];

      // Compatible with old version:
      if (!this.uid && options.data?.id) {
        this.uid = options.data?.id;
      }
    } else {
      const _object = LUtilsSeeder.SeedNew(options.name);
      LOG(
        `🪷 ${options.name} | Section.ts > constructor > Seed:`,
        options.name,
        "--object-->",
        _object,
      );
      if (_object) {
        this.object = _object;
      }

      this.data = LUtilsSeeder.seed(options.schema);
    }

    if (force_set_new_uid || !this.uid /*Auto assign an id!*/) {
      // Set random ID for sections
      this.uid = "auto_" + Math.round(Math.random() * 99999999999);

      LOG(
        `🪷 ${options.name} | Section.ts > constructor > UID (NEW):`,
        this.uid,
        "force",
        force_set_new_uid,
      );
    } else {
      LOG(
        `🪷 ${options.name} | Section.ts > constructor > UID (EXIST):`,
        this.uid,
      );
    }
    // Compatible with missed updated in code(temporary)
   // this.id = this.uid;

    if(!this.object){
      console.error("❗The object is not defined! Please check migration from V1 to V2!",options.name)
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
}

function LOG(...text: any) {
  if (DEBUG) console.log("🐤 SECTION", ...text);
}
