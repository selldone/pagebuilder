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
import {XSectionObjectData} from "@selldone/page-builder/components/x/section/XSectionObjectData.ts";

export class XSectionObject extends LModelElement<XSectionObjectData> {
  public static ComponentName = "XSection";
  public static Info = {
    group: "Layout",
    icon: "crop_din",
    title: "Section",
  };

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XSectionObjectData | null,
    props: Record<string, any> | null,
  ) {
    super(
      XSectionObject.ComponentName,
      background,
      style,
      classes,
      children,
      data ? data : new XSectionObjectData({}),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XSectionObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  static Seed(): XSectionObject {
    return this.NewInstance();
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━

  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */
  static MigrateOld(old: any): XSectionObject {
    const data = new XSectionObjectData({});

    data.hide = {
      sm: old?.hide_sm || false,
      md: old?.hide_md || false,
      lg: old?.hide_lg || false,
      xl: old?.hide_xl || false,
    };

    // console.log("old", old);
    return new XSectionObject(
      new LModelBackground(old?.background),
      old?.style,
      old?.classes,
      [],
      data,
      null,
    );
  }

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(
    json: Record<string, any>,
  ): LModelElement<XSectionObjectData> {
    return this._JsonToInstance(json, XSectionObjectData);
  }
}
