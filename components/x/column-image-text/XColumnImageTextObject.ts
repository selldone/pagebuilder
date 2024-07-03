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
import {LModelGrid} from "@selldone/page-builder/models/grid/LModelGrid.ts";
import {XColumnObject} from "@selldone/page-builder/components/x/column/XColumnObject.ts";
import {XCollectionObject} from "@selldone/page-builder/components/x/collection/XCollectionObject.ts";
import {
  XColumnImageTextDataTypes,
  XColumnImageTextObjectData,
} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObjectData.ts";
import {XProductObjectData} from "@selldone/page-builder/components/x/product/XProductObjectData.ts";
import {XCollectionObjectData} from "@selldone/page-builder/components/x/collection/XCollectionObjectData.ts";
import {XUploaderObject} from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";
import {XProductObject} from "@selldone/page-builder/components/x/product/XProductObject.ts";

export class XColumnImageTextObject extends LModelElement<XColumnImageTextObjectData> {
  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XColumnImageTextObjectData | null,
    props: any,
  ) {
    super(
      "XColumnImageText",
      background,
      style,
      classes,
      children,
      data
        ? data
        : new XColumnImageTextObjectData(
            new LModelGrid({ mobile: 12, tablet: 6, desktop: 4 }),
            XColumnImageTextDataTypes.LAYOUTS.NORMAL,
          ),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XColumnImageTextObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━
  /**
   * Create a new instance of LModelElementXColumnImageText
   * @param mobile
   * @param tablet
   * @param desktop
   * @param widescreen
   * @param layout
   * @param initialColumnLayout
   * @param initialClassesContent
   * @param hasImage
   * @constructor
   */

  static Seed(
    mobile: number | null = 12,
    tablet: number | null = 6,
    desktop: number | null = 4,
    widescreen: number | null = null,
    layout: XColumnImageTextDataTypes.LAYOUTS | null,
    initialColumnLayout: XColumnImageTextDataTypes.LAYOUTS|null = XColumnImageTextDataTypes.LAYOUTS.NORMAL,
    initialClassesContent: string[] = [],
    hasImage: boolean = false,
  ): XColumnImageTextObject {
    const instance = XColumnImageTextObject.NewInstance();
    instance.data.grid
      ?.setMobile(mobile)
      .setTablet(tablet)
      .setDesktop(desktop)
      .setWidescreen(widescreen);
    instance.data.setLayout(layout ? layout : initialColumnLayout);

    // Add initial children:
    instance.addChild(
      XTextObject.Seed("Enter your title here...", "h2", null).setLabel(
        XColumnImageTextObjectTypes.LABELS.TITLE,
      ),
    );
    instance.addChild(
      XTextObject.Seed(
        "Write your main content here, including key details about your topic, ensuring to cover the main elements of discussion or description...",
        "p",
        initialClassesContent,
      ).setLabel(XColumnImageTextObjectTypes.LABELS.CONTENT),
    );

    if (hasImage) {
      instance.addChild(
        XUploaderObject.Seed().setLabel(
          XColumnImageTextObjectTypes.LABELS.IMAGE,
        ),
      );
    }

    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ Labeled Children ━━━━━━━━━━━━━━━━━

  getImageChild(): XUploaderObject | null {
    return this.findChildByLabel(XColumnImageTextObjectTypes.LABELS.IMAGE);
  }

  getProductChild(): XProductObject | null {
    return this.findChildByLabel(XColumnImageTextObjectTypes.LABELS.PRODUCT);
  }

  getCollectionChild(): XCollectionObject | null {
    return this.findChildByLabel(XColumnImageTextObjectTypes.LABELS.COLLECTION);
  }

  getTitleChild(): XTextObject | null {
    return this.findChildByLabel(XColumnImageTextObjectTypes.LABELS.TITLE);
  }

  getContentChild(): XTextObject | null {
    return this.findChildByLabel(XColumnImageTextObjectTypes.LABELS.CONTENT);
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━

  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */

  static MigrateOld(old: any): XColumnImageTextObject {
    if (!old.layout) {
      console.error("! No layout selected! old:", old);
      old.layout = XColumnImageTextDataTypes.LAYOUTS.NORMAL;
    }

    const data = new XColumnImageTextObjectData(
      new LModelGrid(old?.grid),
      old.layout,
    );
    console.log(
      "Migrate LModelElementXColumnImageText | data:",
      old,
      "--data-->",
      data,
    );

    const column = new XColumnImageTextObject(
      new LModelBackground(old?.background),
      old?.style,
      old?.classes,
      [],
      data,
      null,
    );

    column.addChild(
      XTextObject.MigrateOld(old.title, "h2", []).setLabel(
        XColumnImageTextObjectTypes.LABELS.TITLE,
      ),
    );
    column.addChild(
      XTextObject.MigrateOld(old.content, "p", []).setLabel(
        XColumnImageTextObjectTypes.LABELS.CONTENT,
      ),
    );

    if (old.image)
      column.addChild(
        XUploaderObject.MigrateOld(old.image)!.setLabel(
          XColumnImageTextObjectTypes.LABELS.IMAGE,
        ),
      );

    if (old.layout === "product") {
      column.addChild(
        new XProductObject(
          null,
          null,
          null,
          null,
          new XProductObjectData(old.product_info?.id),
          null,
        ).setLabel(XColumnImageTextObjectTypes.LABELS.PRODUCT),
      );
    } else if (old.layout === "collection") {
      const _children = old.columns.map((_column: any) => {
        return {
          column: XColumnObject.MigrateOld(_column),
          title: XTextObject.MigrateOld(_column.title, "h3", []),
          image: XUploaderObject.MigrateOld(_column.image),
        };
      });
      column.addChild(
        new XCollectionObject(
          null,
          null,
          null,
          null,
          new XCollectionObjectData(_children),
          null,
        ).setLabel(XColumnImageTextObjectTypes.LABELS.COLLECTION),
      );
    }

    return column;
  }
}

// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace XColumnImageTextObjectTypes {
  /**
   * We use these labels to distinguished between specific children elements in the XColumnImageTextObject from other children elements.
   * User can not remove these element, and they will be shown base on the layout type.
   */
  export enum LABELS {
    TITLE = "title",
    CONTENT = "content",
    IMAGE = "image",
    PRODUCT = "product",
    COLLECTION = "collection",
  }
}
