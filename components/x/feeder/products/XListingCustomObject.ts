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

import {LModelElement} from "@selldone/page-builder/models/element/LModelElement.ts";
import {LModelBackground} from "@selldone/page-builder/models/background/LModelBackground.ts";
import {XListingCustomObjectData} from "@selldone/page-builder/components/x/feeder/products/XListingCustomObjectData.ts";
import ProductFramesSample from "@selldone/page-builder/sections/store/custom-listing/frames/ProductFramesSample.ts";
import CategoryFramesSample from "@selldone/page-builder/sections/store/custom-listing/frames/CategoryFramesSample.ts";

export class XListingCustomObject extends LModelElement<XListingCustomObjectData> {
  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XListingCustomObjectData | null,
    props: any,
  ) {
    super(
      "XFeederProducts",
      background,
      style,
      classes,
      children,
      data ? data : new XListingCustomObjectData(),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    const instance= new XListingCustomObject(null, null, null, null, null, null);
    instance.data.frame_product.code = ProductFramesSample.Curvy_Card;
    instance.data.frame_category.code = CategoryFramesSample.Curvy_Card;
    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  static Seed(): XListingCustomObject {
    const instance = this.NewInstance();
    instance.data.filter.sort = "most_popular";
    instance.data.filter.only_available = true;
    instance.data.filter.count = 4;
    instance.data.filter.categories_count = 4;

    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━
  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */

  static MigrateOld(old: any): XListingCustomObject {
    const data = new XListingCustomObjectData({filter:old.filter,
      frame_category:old.frame_category,
      frame_product:old.frame_product,

    });
    data.align = old.row?.align;
    data.justify = old.row?.justify;

    return new XListingCustomObject(null, null, null, [], data, null);
  }
}
