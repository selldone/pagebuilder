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

import "intersection-observer";

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0.5) {
      entry.target.classList.add("is-active");
      entry.target.classList.remove("is-inactive");
      return;
    }
    entry.target.classList.add("is-inactive");
    entry.target.classList.remove("is-active");
  });
};

const observer = new IntersectionObserver(callback, {
  root: null,
  rootMargin: "0px",
  threshold: [0.1, 0.5, 0.9, 1],
});

const scrolling = (rootEl) => {
  if (!rootEl) return;
  let sections = Array.from(rootEl.querySelectorAll("section"));
  sections.forEach((section) => {
    section.classList.add("is-inactive");
    observer.observe(section);
  });
};

export default function install({ builder }) {
  builder.scrolling = scrolling;
}
