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
import {XColumnData} from "@selldone/page-builder/components/x/column/XColumnData.ts";
import {LModelGrid} from "@selldone/page-builder/models/grid/LModelGrid.ts";

export class LModelElementXColumn extends LModelElement<XColumnData> {
  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XColumnData | null,
    props: any,
  ) {
    super(
      "XColumn",
      background,
      style,
      classes,
      children,
      data
        ? data
        : new XColumnData(
            new LModelGrid({ mobile: 12, tablet: 6, desktop: 4 }),
          ),
      props,
    );
  }

  static Seed(
    mobile = 12,
    tablet = 6,
    desktop = 4,
    widescreen = null,
  ): LModelElementXColumn {
    const data = new XColumnData(
      new LModelGrid({
        mobile: mobile,
        tablet: tablet,
        desktop: desktop,
        widescreen: widescreen,
      }),
    );
    return new LModelElementXColumn(null, null, null, null, data, null);
  }

  static MigrateOld(old: any): LModelElementXColumn {
    const data = new XColumnData(new LModelGrid(old?.grid));

    return new LModelElementXColumn(
      new LModelBackground(old?.background),
      old?.style,
      old?.classes,
      [],
      data,
      null,
    );
  }
}
