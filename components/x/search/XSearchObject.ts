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
import {XSearchObjectData} from "@selldone/page-builder/components/x/search/XSearchObjectData.ts";
import {XInputTextObject} from "@selldone/page-builder/components/x/input/text/XInputTextObject.ts";
import {XButtonObject} from "@selldone/page-builder/components/x/button/XButtonObject.ts";

export class XSearchObject extends LModelElement<XSearchObjectData> {
  // Custom elements [Permanent]
  public input: XInputTextObject | null = null;

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XSearchObjectData | null,
    props: any,
  ) {
    super(
      "XSearch",
      background,
      style,
      classes,
      children,
      data ? data : new XSearchObjectData(),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XSearchObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  static Seed(): XSearchObject {
   const instance=  this.NewInstance();
    instance.input = XInputTextObject.Seed();
    instance.input.data.setVariant('solo')

    return instance;
  }

  public getInput() {
    if (!this.input) {
      this.input = XInputTextObject.Seed();
    }

    return this.input;
  }


  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━
  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */
  static MigrateOld(old: any): XSearchObject | null {
    if (!old) return null;

    const data = new XSearchObjectData();

    const instance = new XSearchObject(null, null, null, [], data, null);

    instance.input = XInputTextObject.MigrateOld(old);

    console.log("Migrate Search Element ", old, "--- instance --->", instance);


    return instance;
  }
}
