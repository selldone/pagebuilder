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
import {XContainerObjectData} from "@selldone/page-builder/components/x/container/XContainerObjectData.ts";

export class XContainerObject extends LModelElement<XContainerObjectData> {
  public static ComponentName = "XContainer";
  public static Info = {
    group:'Layout',
    icon:'aspect_ratio',
    title:'Container'
  };

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XContainerObjectData | null,
    props: any,
  ) {
    super(
      XContainerObject.ComponentName,
      background,
      style,
      classes,
      children,
      data ? data : new XContainerObjectData({ fluid: false }),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XContainerObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  static Seed(): XContainerObject {
    return this.NewInstance();
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━
  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */
  static MigrateOld(old: any): XContainerObject {
    const data = new XContainerObjectData({ fluid: false });

    if (old?.row?.fluid || old?.fluid) {
      data.setFluid(true);
    }

    return new XContainerObject(null, null, null, [], data, null);
  }

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(json: Record<string, any>): XContainerObject {
    return this._JsonToInstance(json, XContainerObjectData);
  }
}
