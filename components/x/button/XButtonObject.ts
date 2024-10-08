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
import {CONSOLE} from "@selldone/core-js/helper";

export class XButtonObject extends LModelElement<XButtonObjectData> {
  public static ComponentName = "XButton";
  public static Info = {
    group:'Action',
    icon:'ads_click',
    title:'Button'
  };

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XButtonObjectData | null,
    props: any,
  ) {
    super(
      XButtonObject.ComponentName,
      background,
      style,
      classes,
      children,
      data ? data : new XButtonObjectData({}),
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
    CONSOLE.log("XButtonObject | Migrate | Old:", old);
    const data = new XButtonObjectData(old);

    return new XButtonObject(
      new LModelBackground(old?.background),
      old?.style,
      old?.classes,
      [],
      data,
      null,
    );
  }

  // ━━━━━━━━━━━━━━━━━ Clone To (Override) ━━━━━━━━━━━━━━━━━
  public cloneAttributesTo(object: LModelElement<any>) {
    super.cloneAttributesTo(object);
    if(object.data instanceof XButtonObjectData){
      object.data.color =this.data.color
        object.data.glow =this.data.glow
        object.data.ripple =this.data.ripple
        object.data.rounded =this.data.rounded
        object.data.size =this.data.size
        object.data.align =this.data.align
        object.data.variant =this.data.variant
        object.data.elevation =this.data.elevation


    }
  }

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(json: Record<string, any>): XButtonObject {
    return this._JsonToInstance(json, XButtonObjectData);
  }
}
