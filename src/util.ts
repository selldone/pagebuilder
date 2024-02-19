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
import * as types from "./types";
import {isObject, isString} from "lodash-es";

export function isParentTo(target: HTMLElement, parent: HTMLElement) {
  let currentNode: ParentNode | null = target;
  while (currentNode !== null) {
    if (currentNode === parent) return true;
    currentNode = currentNode.parentNode;
  }
  return false;
}

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

export function cleanDOM(artboard: HTMLElement) {
  const editables: HTMLElement[] = Array.from(
    artboard.querySelectorAll(".is-editable"),
  );
  const uploaders: HTMLElement[] = Array.from(
    artboard.querySelectorAll(".uploader"),
  );
  const stylers: HTMLElement[] = Array.from(
    artboard.querySelectorAll(".styler"),
  );

  editables.forEach((el) => {
    el.contentEditable = "inherit";
    el.classList.remove("is-editable");
  });

  const editables2 = Array.from(artboard.querySelectorAll("[contenteditable]"));
  editables2.forEach((el) => {
    el.removeAttribute("contenteditable");
  });

  uploaders.forEach((el) => {
    const input = el.querySelector(":scope > input");
    const image = el.querySelector(":scope > img");

    image?.classList.add("add-full-width");
    el.classList.remove("uploader");

    if (input) input.remove();
  });
  stylers.forEach((styler) => {
    styler.remove();
  });
}

//----------------------------------------------
// Remove empty <br> :

export function iterateOverSectionData(
  data: { [key: string]: any },
  callback: (text: any) => any,
): any {
  if (!data) return null;

  if (Array.isArray(data)) {
    return data.map((v) => iterateOverSectionData(v, callback));
  }
  if (isObject(data)) {
    const out: any = {};
    Object.keys(data).forEach((key: string) => {
      out[key] = iterateOverSectionData(data[key], callback);
    });
    return out;
  }

  return callback(data);
}

/**
 * Remove empty <br> data.
 * @param data
 * @returns {*|{}}
 */
export function removeBRFromSectionData(data: { [key: string]: any }) {
  // console.log('removeBR',data)

  return iterateOverSectionData(data, (text: any) => {
    if (isString(text) && text.trim() === "<br>") {
      console.log("🌶 Remove empty tags", text);
      return "";
    }
    return text;
  });
}

/**
 * List of found fonts on the section.
 * @param data
 * @returns {*[]}
 */
export function findAllFontsInSection(data: { [key: string]: any }) {
  // console.log('removeBR',data)
  const fonts: string[] = [];

  iterateOverSectionData(data, (text: any) => {
    if (isString(text)) {
      const div = document.createElement("div");
      div.innerHTML = text.trim();
      $(div)
        .find("*")
        .each(function () {
          const font = $(this)
            .css("font-family")
            .replace(/[`~!@#$%^&*()_|\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
          if (font && !fonts.includes(font.trim())) {
            fonts.push(font.trim());
            // console.log("Find font =>", font);
          }
        });
    }
    return text;
  });

  return fonts;
}
