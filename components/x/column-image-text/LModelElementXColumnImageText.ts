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
import {LModelElementXColumn} from "@selldone/page-builder/components/x/column/LModelElementXColumn.ts";
import {LModelElementXCollection} from "@selldone/page-builder/components/x/collection/LModelElementXCollection.ts";
import {
  XColumnImageTextData,
  XColumnImageTextDataTypes,
} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextData.ts";
import {XProductData} from "@selldone/page-builder/components/x/product/XProductData.ts";
import {XCollectionData} from "@selldone/page-builder/components/x/collection/XCollectionData.ts";
import {LModelElementXUploader} from "@selldone/page-builder/components/x/uploader/LModelElementXUploader.ts";
import {LModelElementXText} from "@selldone/page-builder/components/x/text/LModelElementXText.ts";
import {LModelElementXProduct} from "@selldone/page-builder/components/x/product/LModelElementXProduct.ts";

export class LModelElementXColumnImageText extends LModelElement<XColumnImageTextData> {
  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XColumnImageTextData | null,
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
        : new XColumnImageTextData(
            new LModelGrid({ mobile: 12, tablet: 6, desktop: 4 }),
          ),
      props,
    );
  }

  static Seed(
    mobile = 12,
    tablet = 6,
    desktop = 4,
    widescreen,
    layout: string,
    initialColumnLayout: string = "x-layout-normal",
    initialClassesContent: string[] = [],
  ): LModelElementXColumnImageText {
    const data = new XColumnImageTextData(
      new LModelGrid(
        {
          mobile: mobile,
          tablet: tablet,
          desktop: desktop,
          widescreen: widescreen,
        },
        layout ? layout : initialColumnLayout,
      ),
    );
    return new LModelElementXColumn(
      null,
      null,
      initialClassesContent,
      [],
      data,
      null,
    );
  }

  static MigrateOld(old: any): LModelElementXColumnImageText {
    if (!old.layout) {
      console.error("! No layout selected! old:", old);
      old.layout = XColumnImageTextDataTypes.LAYOUTS.NORMAL;
    }

    const data = new XColumnImageTextData(
      new LModelGrid(old?.grid),
      old.layout,
    );
    console.log(
      "Migrate LModelElementXColumnImageText | data:",
      old,
      "--data-->",
      data,
    );

    const column = new LModelElementXColumnImageText(
      new LModelBackground(old?.background),
      old?.style,
      old?.classes,
      [],
      data,
      null,
    );

    column.addChild(LModelElementXText.MigrateOld(old.title));
    column.addChild(LModelElementXText.MigrateOld(old.content));
    column.addChild(LModelElementXUploader.MigrateOld(old.image));

    if (old.layout === "product") {
      column.addChild(
        new LModelElementXProduct(
          null,
          null,
          null,
          null,
          new XProductData(old.product_info?.id),
          null,
        ),
      );
    } else if (old.layout === "collection") {
      const _children = old.columns.map((_column: any) => {
        return {
          column: LModelElementXColumn.MigrateOld(LModelGrid(_column)),
          title: LModelElementXText.MigrateOld(_column.title),
          image: LModelElementXUploader.MigrateOld(_column.image),
        };
      });
      column.addChild(
        new LModelElementXCollection(
          null,
          null,
          null,
          null,
          new XCollectionData(_children),
          null,
        ),
      );
    }

    return column;
  }
}
