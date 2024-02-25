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

export function isParentTo(
  target: HTMLElement | EventTarget | null,
  parent: HTMLElement,
) {
  if (!target) return false;
  let currentNode: any = target;
  while (currentNode) {
    if (currentNode === parent) return true;
    currentNode = currentNode.parentNode;
  }
  return false;
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
