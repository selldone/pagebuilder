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

import { LModelElement } from "@selldone/page-builder/models/element/LModelElement.ts";
import { LModelBackground } from "@selldone/page-builder/models/background/LModelBackground.ts";
import {
  XEmbedPageObjectData,
} from "@selldone/page-builder/components/x/embed/page/XEmbedPageObjectData.ts";

export class XEmbedPageObject extends LModelElement<XEmbedPageObjectData> {
  public static ComponentName = "XEmbedPage";
  public static Info = {
    group: "Raw",
    icon: "developer_board",
    title: "Embed Page",
  };

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XEmbedPageObjectData | null,
    props: any,
  ) {
    super(
      XEmbedPageObject.ComponentName,
      background,
      style,
      classes,
      children,
      data
        ? data
        : new XEmbedPageObjectData({
            page_id: null,
        sections:[]
          }),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XEmbedPageObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  static Seed(): XEmbedPageObject {
    const instance = this.NewInstance();

    return instance;
  }



  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(json: Record<string, any>): XEmbedPageObject {
    return this._JsonToInstance(json, XEmbedPageObjectData);
  }
}
