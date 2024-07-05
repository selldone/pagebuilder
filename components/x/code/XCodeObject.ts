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
import {XCodeObjectData, XCodeObjectDataTypes,} from "@selldone/page-builder/components/x/code/XCodeObjectData.ts";

export class XCodeObject extends LModelElement<XCodeObjectData> {
  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XCodeObjectData | null,
    props: any,
  ) {
    super(
      "XCode",
      background,
      style,
      classes,
      children,
      data
        ? data
        : new XCodeObjectData(XCodeObjectDataTypes.Mode.MODE_HTML, "", null),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XCodeObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  static Seed(): XCodeObject {
    const instance = this.NewInstance();
    instance.data
      .setCode(
        `
    <h1>
      <b>SSSSSSSSSSSSSSSSSSSS</b>
    </h1>

  `,
      )
      .setMode(XCodeObjectDataTypes.Mode.MODE_HTML);
    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━
  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */

  static MigrateOld(old: any): XCodeObject {
    const data = new XCodeObjectData(old.mode, old.html, old.properties);

    return new XCodeObject(null, null, null, [], data, null);
  }
}
