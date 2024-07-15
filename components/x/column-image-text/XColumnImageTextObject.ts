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
import {
  XColumnImageTextDataTypes,
  XColumnImageTextObjectData,
} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObjectData.ts";
import {XProductObjectData} from "@selldone/page-builder/components/x/product/XProductObjectData.ts";
import {XUploaderObject} from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";
import {XProductObject} from "@selldone/page-builder/components/x/product/XProductObject.ts";
import {XButtonObject} from "@selldone/page-builder/components/x/button/XButtonObject.ts";
import {XRowObject} from "@selldone/page-builder/components/x/row/XRowObject.ts";

export class XColumnImageTextObject extends LModelElement<XColumnImageTextObjectData> {
  public static ComponentName = "XColumnImageText";
  public static Info = {
    group:'Layout',
    icon:'broken_image',
    title:'Stylish Column'
  };


  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XColumnImageTextObjectData | null,
    props: any,
  ) {
    super(
      XColumnImageTextObject.ComponentName,
      background,
      style,
      classes,
      children,
      data
        ? data
        : new XColumnImageTextObjectData({
            grid: new LModelGrid({ mobile: 12, tablet: 6, desktop: 4 }),
            layout: XColumnImageTextDataTypes.LAYOUTS.NORMAL,
          }),
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
    initialColumnLayout: XColumnImageTextDataTypes.LAYOUTS | null = XColumnImageTextDataTypes
      .LAYOUTS.NORMAL,
    initialClassesContent: string[] = [],
    hasImage: boolean = false,
  ): XColumnImageTextObject {
    const instance = XColumnImageTextObject.NewInstance();
    instance.data.grid
      ?.setMobile(mobile)
      .setTablet(tablet)
      .setDesktop(desktop)
      .setWidescreen(widescreen);

    const layout_code = layout
      ? layout
      : initialColumnLayout
        ? initialColumnLayout
        : XColumnImageTextDataTypes.LAYOUTS.NORMAL;
    instance.data.setLayout(layout_code);

    // Add initial children:
    instance.addChild(
      XTextObject.Seed("Enter your title here...", "h3", null).setLabel(
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

  getImageChild(force_seed: false): XUploaderObject | null {
    let image = this.findChildByLabel(XColumnImageTextObjectTypes.LABELS.IMAGE);
    if (image || !force_seed) return image;

    image = XUploaderObject.Seed().setLabel(
      XColumnImageTextObjectTypes.LABELS.IMAGE,
    );
    this.addChild(image);

    return image;
  }

  getProductChild(force_seed: false): XProductObject | null {
    let product = this.findChildByLabel(
      XColumnImageTextObjectTypes.LABELS.PRODUCT,
    );
    if (product || !force_seed) return product;

    product = XProductObject.Seed().setLabel(
      XColumnImageTextObjectTypes.LABELS.PRODUCT,
    );

    this.addChild(product);

    return product;
  }

  getCollectionChild(force_seed: false): XRowObject | null {
    let collection = this.findChildByLabel(
      XColumnImageTextObjectTypes.LABELS.COLLECTION,
    );

    if (collection || !force_seed) return collection;

    collection = XRowObject.Seed().setLabel(
      XColumnImageTextObjectTypes.LABELS.COLLECTION,
    );
    this.addChild(collection);

    for (let i = 0; i < 4; i++) {
      const _column = XColumnObject.Seed(6, null, null, null);

      _column.addChild(
        XTextObject.Seed("Write your header here", "p", [
          "text-subtitle-2",
          "line-height-normal",
        ]),
      );
      _column.addChild(XUploaderObject.Seed());

      collection.addChild(_column);
    }

    return collection;
  }

  getTitleChild(force_seed: false): XTextObject | null {
    let title = this.findChildByLabel(XColumnImageTextObjectTypes.LABELS.TITLE);

    if (title || !force_seed) return title;

    title = XTextObject.Seed("Enter your title here...", "h3", null).setLabel(
      XColumnImageTextObjectTypes.LABELS.TITLE,
    );

    this.addChild(title);

    return title;
  }

  getContentChild(force_seed: false): XTextObject | null {
    let content = this.findChildByLabel(
      XColumnImageTextObjectTypes.LABELS.CONTENT,
    );

    if (content || !force_seed) return content;

    content = XTextObject.Seed(
      "Write your main content here, including key details about your topic, ensuring to cover the main elements of discussion or description...",
      "p",
    ).setLabel(XColumnImageTextObjectTypes.LABELS.CONTENT);

    this.addChild(content);

    return content;
  }

  getActionChild(): XTextObject | null {
    return this.findChildByLabel(XColumnImageTextObjectTypes.LABELS.ACTION);
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

    const data = new XColumnImageTextObjectData({
      grid: new LModelGrid(old?.grid),
      layout: old.layout,
    });
    console.log(
      "Migrate LModelElementXColumnImageText | data:",
      old,
      "--data-->",
      data,
    );

    const column = new XColumnImageTextObject(
      new LModelBackground(old?.background),
      old?.style,
      null,
      [],
      data,
      null,
    );

    column.addChild(
      XTextObject.MigrateOld(old.title, "h3", []).setLabel(
        XColumnImageTextObjectTypes.LABELS.TITLE,
      ),
    );

    if (old.layout === "product") {
      column.addChild(
        new XProductObject(
          null,
          null,
          null,
          null,
          new XProductObjectData({ id: old.product_info?.id }),
          null,
        ).setLabel(XColumnImageTextObjectTypes.LABELS.PRODUCT),
      );
    } else if (old.layout === "collection") {
      // Add row:
      const _row = XRowObject.MigrateOld(old);

      //Add columns:
      old.columns.forEach((_column_old: any) => {
        const _column = XColumnObject.MigrateOld(_column_old);

        _column.addChild(
          XTextObject.MigrateOld(_column_old.title, "p", [
            "text-subtitle-2",
            "line-height-normal",
          ]),
        );
        _column.addChild(XUploaderObject.MigrateOld(_column_old.image));

        _row.addChild(_column);
      });

      column.addChild(
        _row.setLabel(XColumnImageTextObjectTypes.LABELS.COLLECTION),
      );
    } else {
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
    }

    if (old.button) {
      const button = XButtonObject.MigrateOld(old.button)!.setLabel(
        XColumnImageTextObjectTypes.LABELS.ACTION,
      );

      button.classes = ["ma-2"];
      column.addChild(button);
    }

    return column;
  }

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(
    json: Record<string, any>,
  ): XColumnImageTextObject {
    const instance = this._JsonToInstance(json, XColumnImageTextObjectData);

    return instance;
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
    ACTION = "action",
  }
}
