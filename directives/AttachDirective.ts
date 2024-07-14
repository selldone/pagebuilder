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

import {ObjectDirective} from "vue";

interface AttachDirectiveBinding {
  [key: string]: any;
}

/**
 * AttachDirective
 *
 * This directive allows attaching objects or functions to elements using a specified argument as the key.
 * The attached value can be accessed later during event handling or other operations.
 *
 * Example:
 *   ```v-attach:seed="item.Seed"```
 */

const AttachDirective: ObjectDirective<Element, AttachDirectiveBinding> = {


  /**
   * Called before the element is mounted to the DOM.
   *
   * @param el - The element to which the directive is bound.
   * @param binding - An object containing the value and argument passed to the directive.
   */
  beforeMount(el, binding) {
    // Get the value passed to the directive
    const value = binding.value;

    // Check if value is defined
    if (!value) return;

    // Get the argument passed to the directive
    const arg = binding.arg;

    // Attach the value to the element using the argument as the key
    if (arg) {
      el[arg] = value;
    //  console.log(`Attached value to element: ${arg}`,el);
    }
  },

  // Additional directive hooks can be defined here if needed
};

export default AttachDirective;
