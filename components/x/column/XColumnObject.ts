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
import {XColumnObjectData} from "@selldone/page-builder/components/x/column/XColumnObjectData.ts";
import {LModelGrid} from "@selldone/page-builder/models/grid/LModelGrid.ts";

export class XColumnObject extends LModelElement<XColumnObjectData> {
  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XColumnObjectData | null,
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
        : new XColumnObjectData(
            new LModelGrid({ mobile: 12, tablet: 6, desktop: 4 }),
          ),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XColumnObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  /**
   * Create a new instance of XColumnObject
   * @param mobile
   * @param tablet
   * @param desktop
   * @param widescreen
   * @constructor
   */
  static Seed(
    mobile = 12,
    tablet = 6,
    desktop = 4,
    widescreen = null,
  ): XColumnObject {
    const instance = XColumnObject.NewInstance();
    instance.data.grid
      .setMobile(mobile)
      .setTablet(tablet)
      .setDesktop(desktop)
      .setWidescreen(widescreen);

    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━


  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */
  static MigrateOld(old: any): XColumnObject {
    const data = new XColumnObjectData(new LModelGrid(old?.grid));

    return new XColumnObject(
      new LModelBackground(old?.background),
      old?.style,
      old?.classes,
      [],
      data,
      null,
    );
  }
}
