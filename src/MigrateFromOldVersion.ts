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

export const MigrateFromOldVersion = (obj: Object) => {
  replaceStringInObject(obj, "is-samin", "bg--plate-dark-1");
  replaceStringInObject(obj, "is-red", "bg--plate-dark-2");

  replaceStringInObject(obj, "is-black", "bg--plate-light-3");
  replaceStringInObject(obj, "is-green", "bg--plate-light-4");
  replaceStringInObject(obj, "is-blue", "bg--plate-light-5");
  replaceStringInObject(obj, "is-white", "bg--plate-light-6");
  replaceStringInObject(obj, "is-deep-purple", "bg--plate-light-7");
  replaceStringInObject(obj, "is-teal", "bg--plate-light-8");
  replaceStringInObject(obj, "is-cyan", "bg--plate-light-9");
  replaceStringInObject(obj, "is-amber", "bg--plate-light-10");
  replaceStringInObject(obj, "is-pink", "bg--plate-light-2");
  replaceStringInObject(obj, "is-blue-grey", "bg--plate-light-11");
  replaceStringInObject(obj, "is-transparent", "bg--plate-transparent");

  return obj;
};

function replaceStringInObject(
  value: any,
  searchValue: string,
  replaceValue: string,
) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      value[index] = replaceStringInObject(item, searchValue, replaceValue);
    });
  } else if (typeof value === "object" && value !== null) {
    Object.keys(value).forEach((key) => {
      value[key] = replaceStringInObject(value[key], searchValue, replaceValue);
    });
  } else if (typeof value === "string") {
    return value.replace(new RegExp(searchValue, "g"), replaceValue);
  }
  return value;
}
