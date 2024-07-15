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
  XCollectionDataTypes,
  XCollectionObjectData,
} from "@selldone/page-builder/components/x/collection/XCollectionObjectData.ts";
import {XColumnObjectData} from "@selldone/page-builder/components/x/column/XColumnObjectData.ts";
import {LModelGrid} from "@selldone/page-builder/models/grid/LModelGrid.ts";
import {XTextObjectData} from "@selldone/page-builder/components/x/text/XTextObjectData.ts";
import {XUploaderObjectData} from "@selldone/page-builder/components/x/uploader/XUploaderObjectData.ts";
import imagePlaceholder from "../../../assets/images/samples/image-placeholder.png";

/**
 * @deprecated
 */
export class XCollectionObject extends LModelElement<XCollectionObjectData> {
  public static ComponentName = "XCollection";

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XCollectionObjectData | null,
    props: any,
  ) {
    super(
      XCollectionObject.ComponentName,
      background,
      style,
      classes,
      children,
      data ? data : new XCollectionObjectData({}),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XCollectionObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  static Seed(): XCollectionObject {
    const instance = this.NewInstance();

    const items: XCollectionDataTypes.IItem[] = [];

    for (let i = 0; i < 4; i++) {
      items.push({
        column: new XColumnObjectData({
          grid: new (LModelGrid({ mobile: 6 }))(),
        }),
        title: new XTextObjectData({ value: "Title", tag: "h3" }),
        image: new XUploaderObjectData({ src: imagePlaceholder }),
      });
    }

    instance.data.setItems(items);
    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━
  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */

  static MigrateOld(old: any): XCollectionObject {}

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(json: Record<string, any>): XCollectionObject {
    return this._JsonToInstance(json, XCollectionObjectData);
  }
}
