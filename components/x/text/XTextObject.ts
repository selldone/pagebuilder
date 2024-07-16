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
import {XTextObjectData, XTextObjectDataTypes,} from "@selldone/page-builder/components/x/text/XTextObjectData.ts";
import {isString} from "lodash-es";

export class XTextObject extends LModelElement<XTextObjectData> {
  public static ComponentName = "XText";
  public static Info = {
    group: "Text",
    icon: "title",
    title: "Text",
  };

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XTextObjectData | null,
    props: any,
  ) {
    super(
      XTextObject.ComponentName,
      background,
      style,
      classes,
      children,
      data ? data : new XTextObjectData({ value: "", tag: "p" }),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XTextObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━
  /**
   * Create a new instance of XTextObject
   * @param value
   * @param tag
   * @param classes
   * @constructor
   */
  static Seed(
    value: string = "Write something here...",
    tag: XTextObjectDataTypes.ITag = "p",
    classes: string[] | null = null,
  ): XTextObject {
    const instance = XTextObject.NewInstance();
    instance.data.setValue(value).setTag(tag);
    instance.classes = classes ? classes : [];
    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━
  /**
   * Migrate from V1 to V2
   * @param old
   * @param initialType
   * @param initialClasses
   * @constructor
   */
  static MigrateOld(
    old: any,
    initialType: string | null,
    initialClasses: string[] | null,
  ): XTextObject {
    if (!old) old = "";

    const data = new XTextObjectData({
      value: isString(old) ? old : (old.value ?? null),
      tag: old.tag ?? initialType,
    });

    console.log("Text Element ", old, "--- old --->", data);
    return new XTextObject(
      new LModelBackground(old?.background),
      old?.style,
      old?.classes ? old.classes : initialClasses,
      [],
      data,
      null,
    );
  }

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(json: Record<string, any>): XTextObject {
    return this._JsonToInstance(json, XTextObjectData);
  }
}
