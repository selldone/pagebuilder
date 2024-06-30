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
import {
  XUploaderDataTypes,
  XUploaderObjectData,
} from "@selldone/page-builder/components/x/uploader/XUploaderObjectData.ts";

export class XUploaderObject extends LModelElement<XUploaderObjectData> {
  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XUploaderObjectData | null,
    props: any,
  ) {
    super(
      "XUploader",
      background,
      style,
      classes,
      children,
      data
        ? data
        : new XUploaderObjectData(null, new XUploaderDataTypes.Setting()),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XUploaderObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━
  /**
   * Create a new instance of XUploaderObject
   * @param aspect
   * @param contain
   * @param round
   * @param initialClasses
   * @constructor
   */

  static Seed(
    aspect: number = 1,
    contain: boolean = false,
    round: boolean = false,
    initialClasses: string[] = ["ma-auto"],
  ): XUploaderObject {
    const instance = XUploaderObject.NewInstance();
    instance.data.setting.setAspect(aspect).setContain(contain).setRound(round);
    instance.classes = initialClasses;

    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━
  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */

  static MigrateOld(old: any): XUploaderObject | null {
    if (!old) return null;
    const data = new XUploaderObjectData(old?.src, old?.setting);

    console.log("Migration Image | ---------->", old, "--->", data);

    return new XUploaderObject(
      new LModelBackground(old?.background),
      old?.style,
      old?.classes,
      [],
      data,
      null,
    );
  }
}
