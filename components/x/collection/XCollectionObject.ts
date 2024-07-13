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
import {XCollectionObjectData} from "@selldone/page-builder/components/x/collection/XCollectionObjectData.ts";
import {XCodeObjectData} from "@selldone/page-builder/components/x/code/XCodeObjectData.ts";

export class XCollectionObject extends LModelElement<XCollectionObjectData> {
  public static ComponentName="XCollection";


  static Seed(): XCollectionObject {
    const data = new XCollectionObjectData({});

    return new XCollectionObject(null, null, null, null, data, null);
  }

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XCollectionObjectData | null,
    props: any,
  ) {
    super(
        XCollectionObject.ComponentName,
      background,
      style,
      classes,
      children,
      data ? data : new XCollectionObjectData({}),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(json: Record<string, any>): XCollectionObject {
    return this._JsonToInstance(json, XCollectionObjectData);
  }

}
