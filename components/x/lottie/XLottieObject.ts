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
import {XLottieObjectData} from "@selldone/page-builder/components/x/lottie/XLottieObjectData.ts";
import {XUploaderDataTypes} from "@selldone/page-builder/components/x/uploader/XUploaderObjectData.ts";

export class XLottieObject extends LModelElement<XLottieObjectData> {
  public static ComponentName = "XLottie";
  public static Info = {
    group:'Animation',
    icon:'theaters',
    title:'Lottie'
  };

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XLottieObjectData | null,
    props: any,
  ) {
    super(
      XLottieObject.ComponentName,
      background,
      style,
      classes,
      children,
      data ? data : new XLottieObjectData({}),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  static Seed(): XLottieObject {
    const data = new XLottieObjectData({
      src: "/animation/23222-checkmark.json",
      setting: new XUploaderDataTypes.Setting(),
    });
    console.log("data lottie --->", data);

    return new XLottieObject(null, null, null, null, data, null);
  }

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(json: Record<string, any>): XLottieObject {
    return this._JsonToInstance(json, XLottieObjectData);
  }
}
