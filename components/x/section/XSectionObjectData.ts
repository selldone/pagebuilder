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

import {LModelData} from "@selldone/page-builder/models/data/LModelData.ts";

export class XSectionObjectData extends LModelData<XSectionObjectData> {
  hide: {
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
    /**
     * Hide to guests
     */
    guest: boolean;
    /**
     * Hide to users
     */
    user: boolean;
  };

  constructor(params?: any) {
    super();
    this.hide = {
      sm: params?.hide?.sm || false,
      md: params?.hide?.md || false,
      lg: params?.hide?.lg || false,
      xl: params?.hide?.xl || false,
      guest: params?.hide?.guest || false,
      user: params?.hide?.user || false,
    };
  }
}
