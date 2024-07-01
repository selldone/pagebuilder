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
import {XButtonObject} from "@selldone/page-builder/components/x/button/XButtonObject.ts";
import {XRowObjectData} from "@selldone/page-builder/components/x/row/XRowObjectData.ts";

export class XButtonsObject extends LModelElement<XRowObjectData> {
  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XRowObjectData | null,
    props: Record<string, any> | null,
  ) {
    super(
      "XButtons",
      background,
      style,
      classes,
      children,
      data ? data : new XRowObjectData("center", "center", false),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XButtonsObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  static Seed(): XButtonsObject {
    const instance = this.NewInstance();
    instance.data.setJustify("center").setAlign("center");
    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━
  /**
   * Migrate from V1 to V2
   * @param btn_row
   * @param buttons
   * @constructor
   */
  static MigrateOld(btn_row: any, buttons: []): XButtonsObject {
    const align = btn_row?.align ?? null;
    const justify = btn_row?.justify ?? null;
    const no_wrap = btn_row?.no_wrap ?? null;

    const row_buttons = new XButtonsObject(
      new LModelBackground(btn_row?.background),
      btn_row?.style,
      btn_row?.classes,
      [],

      new XRowObjectData(align, justify, no_wrap),
      null,
    );

    buttons.forEach((_button) => {
      const _btn_element = XButtonObject.MigrateOld(_button);
      console.log("_btn_element -- Add--->", _btn_element);

      row_buttons.addChild(_btn_element);
    });

    console.log("row_buttons", row_buttons);

    return row_buttons;
  }
}
