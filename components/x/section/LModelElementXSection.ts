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
import {XSectionData} from "@selldone/page-builder/components/x/section/XSectionData.ts";

export class LModelElementXSection extends LModelElement<XSectionData> {
  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XSectionData | null,
    props: Record<string, any> | null,
  ) {
    super(
      "XSection",
      background,
      style,
      classes,
      children,
      data ? data : new XSectionData(),
      props,
    );
  }

  static Seed(): LModelElementXSection {
    const data = new XSectionData();
    return new LModelElementXSection(null, null, null, null, data, null);
  }

  static MigrateOld(
    old: any,
    props: Record<string, any> | null,
  ): LModelElementXSection {
    const data = new XSectionData();

    console.log("old", old);
    return new LModelElementXSection(
      new LModelBackground(old?.background),
      old?.style,
      old?.classes,
      [],
      data,
      props,
    );
  }
}
