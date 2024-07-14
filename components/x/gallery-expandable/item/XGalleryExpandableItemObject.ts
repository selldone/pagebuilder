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
    XGalleryExpandableItemObjectData
} from "@selldone/page-builder/components/x/gallery-expandable/item/XGalleryExpandableItemObjectData.ts";
import {XUploaderObject} from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";
import {
    XColumnImageTextObjectTypes
} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObject.ts";

export class XGalleryExpandableItemObject extends LModelElement<XGalleryExpandableItemObjectData> {
  public static ComponentName = "XGalleryExpandableItem";

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XGalleryExpandableItemObjectData | null,
    props: any,
  ) {
    super(
      XGalleryExpandableItemObject.ComponentName,
      background,
      style,
      classes,
      children,
      data ? data : new XGalleryExpandableItemObjectData(),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XGalleryExpandableItemObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ Labeled Children ━━━━━━━━━━━━━━━━━

  getImageChild(): XUploaderObject | null {
    return this.findChildByLabel(
      XGalleryExpandableItemObjectTypes.LABELS.IMAGE,
    );
  }

  getTitleChild(): XTextObject | null {
    return this.findChildByLabel(
      XGalleryExpandableItemObjectTypes.LABELS.TITLE,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  /**
   * Create a new instance of XGalleryExpandableItemObject
   * @constructor
   */
  static Seed(): XGalleryExpandableItemObject {
    const instance = XGalleryExpandableItemObject.NewInstance();

    instance.addChild(
      XUploaderObject.Seed(null, false, false, []).setLabel(
        XGalleryExpandableItemObjectTypes.LABELS.IMAGE,
      ),
    );
    instance.addChild(
      XTextObject.Seed("Gallery item header...", "h3").setLabel(
        XGalleryExpandableItemObjectTypes.LABELS.TITLE,
      ),
    );
    instance.addChild(
      XTextObject.Seed(
        "Write your main content here, including key details about your topic... ",
        "p",
      ),
    );

    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━

  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */
  static MigrateOld(old: any): XGalleryExpandableItemObject {
    const data = new XGalleryExpandableItemObjectData();

    const out = new XGalleryExpandableItemObject(
      new LModelBackground(old?.background),
      old?.style,
      old?.classes,
      [],
      data,
      null,
    );
    out.addChild(
      XTextObject.MigrateOld(old?.title, "h3", []).setLabel(
        XColumnImageTextObjectTypes.LABELS.TITLE,
      ),
    );

    out.addChild(XTextObject.MigrateOld(old?.subtitle, "p", []));

    let image = XUploaderObject.MigrateOld(old?.image);
    if (!image) image = XUploaderObject.Seed(null, false, false, []);
    out.addChild(image.setLabel(XColumnImageTextObjectTypes.LABELS.IMAGE));

    console.log(
      "Migration | GalleryExpandable Element ",
      old,
      "--- old --->",
      data,
    );

    return out;
  }

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(
    json: Record<string, any>,
  ): XGalleryExpandableItemObject {
    return this._JsonToInstance(json, XGalleryExpandableItemObjectData);
  }
}

// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace XGalleryExpandableItemObjectTypes {
  /**
   * We use these labels to distinguished between specific children elements in the XColumnImageTextObject from other children elements.
   * User can not remove these element, and they will be shown base on the layout type.
   */
  export enum LABELS {
    IMAGE = "image",
    TITLE = "title",
  }
}
