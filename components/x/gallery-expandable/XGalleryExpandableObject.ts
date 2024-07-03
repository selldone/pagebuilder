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
  XGalleryExpandableObjectData
} from "@selldone/page-builder/components/x/gallery-expandable/XGalleryExpandableObjectData.ts";
import {
  XGalleryExpandableItemObject
} from "@selldone/page-builder/components/x/gallery-expandable/item/XGalleryExpandableItemObject.ts";

export class XGalleryExpandableObject extends LModelElement<XGalleryExpandableObjectData> {
  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XGalleryExpandableObjectData | null,
    props: any,
  ) {
    super(
      "XGalleryExpandable",
      background,
      style,
      classes,
      children,
      data ? data : new XGalleryExpandableObjectData(),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XGalleryExpandableObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ Labeled Children ━━━━━━━━━━━━━━━━━

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  /**
   * Create a new instance of XGalleryExpandableObject
   * @constructor
   */
  static Seed(): XGalleryExpandableObject {
    const instance = XGalleryExpandableObject.NewInstance();

    for (let i = 0; i < 4; i++) {
      instance.addChild(XGalleryExpandableItemObject.Seed());
    }

    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━

  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */
  static MigrateOld(old: any): XGalleryExpandableObject {
    const data = new XGalleryExpandableObjectData();
    const out = new XGalleryExpandableObject(
      new LModelBackground(old?.background),
      old?.style,
      old?.classes,
      [],
      data,
      null,
    );

    old.columns.forEach((column: any) => {
      out.addChild(XGalleryExpandableItemObject.MigrateOld(column));
    });

    return out;
  }
}

// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace XGalleryExpandableObjectTypes {}
