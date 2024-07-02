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
import {XButtonObjectData} from "@selldone/page-builder/components/x/button/XButtonObjectData.ts";

export class XButtonObject extends LModelElement<XButtonObjectData> {
  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XButtonObjectData | null,
    props: any,
  ) {
    super(
      "XButton",
      background,
      style,
      classes,
      children,
      data ? data : new XButtonObjectData(),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XButtonObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  static Seed(): XButtonObject {
    const instance = this.NewInstance();
    instance.data
      .setColor("#1976D2")
      .setContent("Action...")
      .setSize("x-large")
      .setRounded("xl");

    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━
  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */

  static MigrateOld(old: any): XButtonObject {
    const data = new XButtonObjectData(
      old.color ?? "#1976D2",
      old.content ?? "Action...",
      old.glow ?? false,
      old.href ?? null,
      old.ripple ?? false,
      old.rounded ?? "xl",
      old.size ?? "x-large",
      old.align ?? null,
      old.variant ?? null,
    );

    return new XButtonObject(
      new LModelBackground(old?.background),
      old?.style,
      old?.classes,
      [],
      data,
      null,
    );
  }
}
