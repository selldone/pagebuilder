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
import {XButtonData} from "@selldone/page-builder/components/x/button/XButtonData.ts";

export class LModelElementXButton extends LModelElement<XButtonData> {
  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XButtonData | null,
    props: any,
  ) {
    super(
      "XButton",
      background,
      style,
      classes,
      children,
      data ? data : new XButtonData(),
      props,
    );
  }

  static Seed(): LModelElementXButton {
    const data = new XButtonData(
      "#1976D2",
      "Action...",
      false,
      false,
      false,
      null,
      false,
      "xl",
      "x-large",
      false,
    );
    return new LModelElementXButton(null, null, null, null, data, null);
  }

  static MigrateOld(old: any, props: any): LModelElementXButton {
    const data = new XButtonData(
      old.color ?? "#1976D2",
      old.content ?? "Action...",
      old.dark ?? false,
      old.fab ?? false,
      old.glow ?? false,
      old.href ?? null,
      old.ripple ?? false,
      old.rounded ?? "xl",
      old.size ?? "x-large",
      old.tile ?? false,
    );

    return new LModelElementXButton(
      new LModelBackground(old?.background),
      old?.style,
      old?.classes,
      [],
      data,
      props,
    );
  }
}
