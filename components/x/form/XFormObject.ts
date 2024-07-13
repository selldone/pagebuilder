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
import {XFormObjectData, XFormObjectDataTypes,} from "@selldone/page-builder/components/x/form/XFormObjectData.ts";
import {XButtonObject} from "@selldone/page-builder/components/x/button/XButtonObject.ts";
import {XInputTextObject} from "@selldone/page-builder/components/x/input/text/XInputTextObject.ts";

export class XFormObject extends LModelElement<XFormObjectData> {
  public static ComponentName = "XForm";

  // Custom elements [Permanent]
  public button: XButtonObject | null = null;

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XFormObjectData | null,
    props: any,
  ) {
    super(
      XFormObject.ComponentName,
      background,
      style,
      classes,
      children,
      data ? data : new XFormObjectData({}),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XFormObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  /**
   * Create a newsletter form
   * @constructor
   */
  static Seed(): XFormObject {
    const instance = this.NewInstance();
    instance.data
      .setMethod(XFormObjectDataTypes.Methods.POST)
      .setUrl(
        window.XAPI.POST_STREAM_USER_ADD_NEWSLETTER(
          "{shop_id}" /*Dynamic value will be replaced in the getGeneratedUrl method*/,
          "newsletter",
        ),
      )
      .setHidden([{ type: "array", key: "tags", value: ["newsletter"] }]);

    const email = XInputTextObject.Seed();
    email.data
      .setName("email")
      .setPlaceholder("Enter your email john@...")
      .setLabel("Email")
      .setVariant("outlined")
      .setPrependInnerIcon("email");
    instance.addChild(email);

    return instance;
  }

  public getButton() {
    if (!this.button) {
      this.button = XButtonObject.Seed();
      this.button.data
        .setAlign("center")
        .setContent("Subscribe")
        .setColor("#000")
        .setSize("x-large");
      this.button.classes = ["mt-5"];
    }

    return this.button;
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━
  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */

  static MigrateOld(old: any): XFormObject {
    const data = new XFormObjectData({});

    const instance = new XFormObject(null, null, null, [], data, null);
    instance.button = XButtonObject.MigrateOld(old.button);

    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(json: Record<string, any>): XFormObject {
    const instance = this._JsonToInstance(json, XFormObjectData);
    instance.button = XButtonObject.JsonToInstance(json.button);
    return instance;
  }
}
