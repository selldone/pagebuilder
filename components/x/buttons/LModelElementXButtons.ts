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
import {LModelElementXButton} from "@selldone/page-builder/components/x/button/LModelElementXButton.ts";
import {XRowData} from "@selldone/page-builder/components/x/row/XRowData.ts";

export class LModelElementXButtons extends LModelElement<XRowData> {
  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XRowData | null,
    props: Record<string, any> | null,
  ) {
    super(
      "XButtons",
      background,
      style,
      classes,
      children,
      data ? data : new XRowData("center", "center", false),
      props,
    );
  }

  static Seed(): LModelElementXButtons {
    return new LModelElementXButtons(
      null,
      null,
      null,
      null,
      new XRowData("center", "center", false),
      null,
    );
  }

  static MigrateOld(
    btn_row: any,
    buttons: [],
    props: any,
  ): LModelElementXButtons {
    const align = btn_row?.align ?? null;
    const justify = btn_row?.justify ?? null;
    const no_wrap = btn_row?.no_wrap ?? null;

    const row_buttons = new LModelElementXButtons(
      new LModelBackground(btn_row?.background),
      btn_row?.style,
      btn_row?.classes,
      [],

      new XRowData(align, justify, no_wrap),
      null,
    );

    buttons.forEach((_button) => {
      const _btn_element = LModelElementXButton.MigrateOld(_button, props);
      console.log("_btn_element -- Add--->", _btn_element);

      row_buttons.addChild(_btn_element);
    });

    console.log("row_buttons", row_buttons);

    return row_buttons;
  }
}
