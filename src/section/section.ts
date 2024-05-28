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
import {App} from "vue";
import {isString} from "lodash-es";
import {LUtilsObject} from "../../utils/object/LUtilsObject";

const DEBUG = false;
export namespace Section {
  export interface IData {
    id?: string;

    [key: string]: any;
  }

  export interface IOptions {
    name: string;
    uid: string; // [New] save section ID (previously we saved section ID in data.id)
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
    data?: IData;
  }

  export interface ISection {
    uid: string;
    id: string;
    name: string;
    schema: Object;
    data: IData;
    stylers: { instance: App; container: Element }[];
  }
}

export class Section implements Section.ISection {
  public uid: string; // New save section ID
  public id: string; // Old save section ID in data.id (deprecated)
  public name: string;
  public schema: any;
  public data: Section.IData;
  public stylers: {
    instance: App;
    container: Element;
    argument: string;
    //el: HTMLElement;
    //props: any;
  }[];

  constructor(options: Section.IOptions, force_set_new_uid: boolean = false) {
    LOG("⚽ Section > Constructor", options, this, force_set_new_uid);
    LOG("🪷 ", options);

    // this.id=options.data?.id
    options = Object.assign({}, options);
    this.name = options.name;
    this.schema = options.schema;
    this.data = options.data || LUtilsSeeder.seed(options.schema);
    this.stylers = [];

    this.uid = options.uid;
    // Compatible with old version:
    if (!this.uid && options.data?.id) {
      this.uid = options.data?.id;
    }

    if (force_set_new_uid || !this.uid /*Auto assign an id!*/) {
      // Set random ID for sections
      this.uid = "auto_" + Math.round(Math.random() * 99999999999);

      LOG(
        "🪷 Section.ts > constructor > UID (NEW):",
        this.uid,
        "force",
        force_set_new_uid,
      );
    } else {
      LOG("🪷 Section.ts > constructor > UID (EXIST):", this.uid);
    }
    // Compatible with missed updated in code(temporary)
    this.id = this.uid;
  }

  set(name: string, value: Object) {
    LOG("⚽ Section > Set", "name", name, "value", value);

    const path = toPath(name);
    const prop = path.pop();

    if (!prop) {
      console.error("🪷 Section.ts > set > prop is undefined", name, value);
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
      console.error("🪷 Section.ts > get > prop is undefined", name);
      return;
    }

    path.shift();
    const obj = path.length === 0 ? this.data : getPath(this.data, path);

    if (!obj) return; // Fix.

    return obj[prop];
  }

  destroy() {
    LOG("Destroy all stylers in the section!", this);

    this.stylers.forEach(({ instance, container }) => {
      instance.unmount();
      container.remove();
    });
    this.stylers = [];
  }

  /**
   * Remove empty <br> data.
   * @returns {*|{}}
   */
  removeBRFromSectionData() {
    // console.log('removeBR',data)

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
  if (DEBUG) console.log("🐤 Section.ts", ...text);
}
