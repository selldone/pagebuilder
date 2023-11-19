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

export default class HighlightEditingElements {
  static ELEMENT_FOCUS_EDITING_CLASS = "element-focus-editing";
  static RemoveAllElementFocusEditing() {
    const elements = document.querySelectorAll(
      "." + this.ELEMENT_FOCUS_EDITING_CLASS
    );

    elements.forEach((element) => {
      element.classList.remove(this.ELEMENT_FOCUS_EDITING_CLASS);
    });

    // Remove any existing 'is-blur' class from elements
    document.querySelectorAll(".is-blur").forEach((el) => {
      el.classList.remove("is-blur");
    });
  }
  static Activate(element) {
    // Remove any existing 'is-blur' class from elements
    document.querySelectorAll(".is-blur").forEach((el) => {
      el.classList.remove("is-blur");
    });

    // Add 'element-focus-editing' class to the current element
    element.classList.add(this.ELEMENT_FOCUS_EDITING_CLASS);

    // Get all section elements
    const sections = document.querySelectorAll("section");

    // Iterate over each section
    sections.forEach((section) => {
      // If the current section is not the active one and does not contain the active one
      if (section !== element && !section.contains(element)) {
        // Add the 'blur' class
        section.classList.add("is-blur");
      }
    });
  }

  static IsChildOfHighlightActiveEditing(element) {
    return this.HasClassOrParentHasClass(
      element,
      this.ELEMENT_FOCUS_EDITING_CLASS
    );
  }
  static HasClassOrParentHasClass(element, className) {
    while (element) {
      if (element.classList && element.classList.contains(className)) {
        return true;
      }
      element = element.parentElement;
    }
    return false;
  }
}
