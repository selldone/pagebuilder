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

import getPath from "lodash-es/get";
import toPath from "lodash-es/toPath";
import { Seeder } from "./seeder";

const SECTION_OPTIONS = {
  name: null,
  schema: {},
};

let counter = 0;

export class Section {
  constructor(options) {
    this.id = counter++;
    options = Object.assign({}, SECTION_OPTIONS, options);
    this.name = options.name;
    this.schema = options.schema;
    this.data = options.data || Seeder.seed(options.schema);
    this.stylers = [];
  }

  set(name, value) {
    const path = toPath(name);
    const prop = path.pop();

    path.shift();
    const obj = path.length === 0 ? this.data : getPath(this.data, path);
    /*
       console.log("name : "+name)
      console.log("value : "+value)

      console.log(obj)*/
    if (!obj) return; // Fix. on delete item (buttons or cols this value is undefined!)

    if (typeof value === "function") {
      value(obj[prop]);
      return;
    }

    obj[prop] = value;
  }

  get(name) {
    const path = toPath(name);
    const prop = path.pop();
    path.shift();
    const obj = path.length === 0 ? this.data : getPath(this.data, path);

    if (!obj) return; // Fix.

    return obj[prop];
  }

  destroy() {
    this.stylers.forEach((styler) => styler.$destroy());
  }
}
