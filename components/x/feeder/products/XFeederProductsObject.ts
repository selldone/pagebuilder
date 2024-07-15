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
import {
  XFeederProductsObjectData
} from "@selldone/page-builder/components/x/feeder/products/XFeederProductsObjectData.ts";
import ProductFramesSample from "@selldone/page-builder/sections/store/custom-listing/frames/ProductFramesSample.ts";
import CategoryFramesSample from "@selldone/page-builder/sections/store/custom-listing/frames/CategoryFramesSample.ts";

export class XFeederProductsObject extends LModelElement<XFeederProductsObjectData> {
  public static ComponentName = "XFeederProducts";
  public static Info = {
    group:'Feeder',
    icon:'shelves',
    title:'Products'
  };

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XFeederProductsObjectData | null,
    props: any,
  ) {
    super(
      XFeederProductsObject.ComponentName,
      background,
      style,
      classes,
      children,
      data ? data : new XFeederProductsObjectData(),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    const instance = new XFeederProductsObject(
      null,
      null,
      null,
      null,
      null,
      null,
    );
    instance.data.frame_product.code = ProductFramesSample.Curvy_Card;
    instance.data.frame_category.code = CategoryFramesSample.Curvy_Card;
    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  static Seed(): XFeederProductsObject {
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

  static MigrateOld(old: any): XFeederProductsObject {
    const data = new XFeederProductsObjectData({
      filter: old.filter,
      frame_category: old.frame_category,
      frame_product: old.frame_product,
    });
    //   data.align = old.row?.align;
    //   data.justify = old.row?.justify;

    return new XFeederProductsObject(null, null, null, [], data, null);
  }

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(
    json: Record<string, any>,
  ): XFeederProductsObject {
    return this._JsonToInstance(json, XFeederProductsObjectData);
  }
}
