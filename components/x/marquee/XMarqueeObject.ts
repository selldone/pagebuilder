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
import {XMarqueeObjectData} from "@selldone/page-builder/components/x/marquee/XMarqueeObjectData.ts";

export class XMarqueeObject extends LModelElement<XMarqueeObjectData> {
  public static ComponentName = "XMarquee";
  public static Info = {
    group:'Text',
    icon:'motion_photos_auto',
    title:'Marquee'
  };

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XMarqueeObjectData | null,
    props: any,
  ) {
    super(
      XMarqueeObject.ComponentName,
      background,
      style,
      classes,
      children,
      data ? data : new XMarqueeObjectData({}),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XMarqueeObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  static Seed(): XMarqueeObject {
    const instance = this.NewInstance();
    instance.data.setHtml("Write some text here...");
    instance.style.fontSize = "2rem";
    instance.style.color = "#ffffff";
    instance.background.bg_color = "#673AB7";
    console.log("Instance Marquee --->", instance);

    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━
  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */

  static MigrateOld(old: any): XMarqueeObject {
    const data = new XMarqueeObjectData({
      html: old.text_loop.html,
      duration: old.text_loop.duration,
      space: old.text_loop.space,
      repeat: old.text_loop.repeat,
      reverse: old.text_loop.reverse,
    });

    const style = old.style ? old.style : {};
    style.height = old.text_loop.height;
    style.color = old.text_loop.font_color;
    style.fontSize = old.text_loop.font_size;

    return new XMarqueeObject(
      new LModelBackground(old?.background),
      style,
      old?.classes,
      [],
      data,
      null,
    );
  }

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(json: Record<string, any>): XMarqueeObject {
    return this._JsonToInstance(json, XMarqueeObjectData);
  }
}
