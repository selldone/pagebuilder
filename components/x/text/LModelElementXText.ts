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
import {IXTextDataTypes, XTextData,} from "@selldone/page-builder/components/x/text/XTextData.ts";
import {isString} from "lodash-es";

export class LModelElementXText extends LModelElement<XTextData> {
  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XTextData | null,
    props: any,
  ) {
    super(
      "XText",
      background,
      style,
      classes,
      children,
      data ? data : new XTextData("", "p"),
      props,
    );
  }

  static Seed(
    value: string,
    tag: IXTextDataTypes.IType,
    classes: string[],
  ): LModelElementXText {
    const data = new XTextData(value, tag);
    return new LModelElementXText(null, null, classes, null, data, null);
  }

  static MigrateOld(
    old: any,
    initialType: string | null,
    initialClasses: string[] | null,
  ): LModelElementXText | null {
    if (!old) return null;

    const data = new XTextData(
      isString(old) ? old : old.value ?? null,
      old.tag ?? initialType,
    );

    console.log("Text Element ", old, "--- old --->", data);
    return new LModelElementXText(
      new LModelBackground(old?.background),
      old?.style,
      old?.classes ? old.classes : initialClasses,
      [],
      data,
      null,
    );
  }
}
