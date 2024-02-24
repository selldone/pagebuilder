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

import { ObjectDirective } from "vue";

/**
 * This directive is used to add a custom data attribute to elements within a Vue 3 application.
 * Specifically designed for a page builder, it allows elements to have extra data attributes
 * dynamically added based on the directive's binding value. The directive primarily focuses
 * on adding a `data-threshold` attribute, which could be used for various purposes such as
 * animation threshold settings.
 *
 * Usage:
 * <div v-data-x="{ threshold: '50%' }"></div>
 */
const DataXDirective: ObjectDirective<Element, { threshold?: string }> = {
  /**
   * Hook that is called right before the element is mounted to the DOM.
   * This lifecycle hook is ideal for setting the initial attribute value.
   *
   * @param {Element} el - The element the directive is bound to.
   * @param {DirectiveBinding} binding - An object containing the directive's binding value.
   */
  beforeMount(el, binding) {
    // Extract the value passed to the directive.
    const style = binding.value;

    // Early exit if no value is provided.
    if (!style) return;

    // Check for the 'threshold' property and set the corresponding data attribute.
    if (style.threshold) {
      el.setAttribute("data-threshold", style.threshold);
    }
  },

  // Additional directive hooks (e.g., updated, mounted) can be defined here if needed.
};

export default DataXDirective;
