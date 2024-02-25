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

import getPath from "lodash/get";
import * as types from "@app-page-builder/src/types/types";
import {isBoolean, isObject, isString} from "lodash-es";


/**
 *
 * @param {String} target
 * @param {Object} schema
 */
export function getTypeFromSchema(target: string, schema: Object) {
  const tempTarget = target.split(".");
  tempTarget.shift();
  const value = getPath(schema, tempTarget.join("."));
  if (value === types.Grid) return "grid";
  if (value === types.Text) return "text";
  if (value === types.Title) return "text";
  if (value === types.Button) return "button";
  if (value === types.ClassList) return "section";
  if (value === String) return "text";
  if (value === Number) return "text";
  if (value === types.Products) return "products";
  if (value === types.Html) return "html";
  if (value === types.Slide) return "slide";

  // if (value ===  types.Background) return "background";
  return null;
}

export function getImageBlob(URL: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", URL);
    xhr.responseType = "blob";

    xhr.onload = function () {
      const imageBlob = this.response;
      const fileType = this.response.type.split("/")[1].split("+")[0];
      const randomNumber = new Date().getUTCMilliseconds();
      const filename = `image-${randomNumber}.${fileType}`;
      resolve({ blob: imageBlob, name: filename });
    };
    xhr.send(null);
  });
}

export function getTypeFromTagName(tagName: string) {
  tagName = tagName.toUpperCase();
  switch (tagName) {
    case "H1":
      return "text";
    case "H2":
      return "text";
    case "H3":
      return "text";
    case "H4":
      return "text";
    case "H5":
      return "text";
    case "H6":
      return "text";
    case "P":
      return "text";
    case "B":
      return "text";
    case "SPAN":
      return "text";
    case "BUTTON":
      return "button";
    case "A":
      return "button";
    case "SECTION":
      return "section";
    case "HEADER":
      return "section";
    default:
      break;
  }
}


