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
import {XInputTextObjectData} from "@selldone/page-builder/components/x/input/text/XInputTextObjectData.ts";
import {isObject} from "lodash-es";

export class XInputTextObject extends LModelElement<XInputTextObjectData> {
  public static ComponentName = "XInputText";

  // Custom elements [Permanent]
  public button: XButtonObject | null = null;

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XInputTextObjectData | null,
    props: any,
  ) {
    super(
      XInputTextObject.ComponentName,
      background,
      style,
      classes,
      children,
      data
        ? data
        : new XInputTextObjectData({
            name: "param_" + Math.abs(Math.random() * 999),
          }),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XInputTextObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  static Seed(): XInputTextObject {
    const instance = this.NewInstance();

    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━
  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */

  static MigrateOld(old: Record<string, any> | null): XInputTextObject {
    const data = new XInputTextObjectData({ name: "" });

    if (old && isObject(old)) {
      data
        .setName(old.name ?? "")
        .setBackgroundColor(old.color ?? null) // Old version we just had color!
        .setColor(null)
        .setFlat(old.flat ?? null)
        .setHint(old.hint ?? null)
        .setLabel(old.label ?? null)
        .setMessages(old.messages ?? null)
        .setPersistentPlaceholder(old.persistentPlaceholder ?? false)
        .setPlaceholder(old.placeholder ?? null)
        .setRounded(old.rounded ?? false)
        .setVariant(
          old.solo
            ? "solo"
            : old.outlined
              ? "outlined"
              : old.filled
                ? "filled"
                : "underlined",
        );
    }

    return new XInputTextObject(null, null, null, [], data, null);
  }

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(json: Record<string, any>): XInputTextObject {
    return this._JsonToInstance(json, XInputTextObjectData);
  }
}
