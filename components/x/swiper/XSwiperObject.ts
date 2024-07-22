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
import {XSwiperObjectData} from "@selldone/page-builder/components/x/swiper/XSwiperObjectData.ts";
import {XContainerObject} from "@selldone/page-builder/components/x/container/XContainerObject.ts";
import {XRowObject} from "@selldone/page-builder/components/x/row/XRowObject.ts";
import {XColumnObject} from "@selldone/page-builder/components/x/column/XColumnObject.ts";
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";
import {XButtonsObject} from "@selldone/page-builder/components/x/buttons/XButtonsObject.ts";

export class XSwiperObject extends LModelElement<XSwiperObjectData> {
  public static ComponentName = "XSwiper";
  public static Info = {
    group: "Layout",
    icon: "web_stories",
    title: "Swiper",
  };

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XSwiperObjectData | null,
    props: any,
  ) {
    super(
      XSwiperObject.ComponentName,
      background,
      style,
      classes,
      children,
      data ? data : new XSwiperObjectData(),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XSwiperObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  static Seed(children_count: number = 3): XSwiperObject {
    const instance = this.NewInstance();

    for (let i = 1; i <= children_count; i++) {
      instance.addChild(this.SeedSlide(`Slide Title ${i}`));
    }

    return instance;
  }

  static SeedSlide(
    title_value: string = "Enter your headline here...",
  ): XContainerObject {
    const container = XContainerObject.Seed();
    const row = XRowObject.Seed();
    const column = XColumnObject.Seed(12, 9, 7);
    const title = XTextObject.Seed(title_value, "h2", ["mb-5"]);
    const subtitle = XTextObject.Seed(
      "Write your main content here, including key details about your topic, ensuring to cover the main elements of discussion or description...",
      "p",
      ["mb-5"],
    );
    const buttons = XButtonsObject.Seed();

    container.addChild(row);
    row.addChild(column);
    column.addChild(title);
    column.addChild(subtitle);
    column.addChild(buttons);
    return container;
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━
  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */

  static MigrateOld(old: any): XSwiperObject {
    const data = new XSwiperObjectData(old);
    data.autoHeight = false;
    return new XSwiperObject(null, null, null, [], data, null);
  }

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(json: Record<string, any>): XSwiperObject {
    return this._JsonToInstance(json, XSwiperObjectData);
  }
}
