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
  XVideoBackgroundObjectData
} from "@selldone/page-builder/components/x/video-background/XVideoBackgroundObjectData.ts";

export class XVideoBackgroundObject extends LModelElement<XVideoBackgroundObjectData> {
  public static ComponentName = "XVideoBackground";
  public static Info = {
    group:'Video',
    icon:'video_library',
    title:'Video Background'
  };

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XVideoBackgroundObjectData | null,
    props: any,
  ) {
    super(
      XVideoBackgroundObject.ComponentName,
      background,
      style,
      classes,
      children,
      data ? data : new XVideoBackgroundObjectData({}),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XVideoBackgroundObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  static Seed(): XVideoBackgroundObject {
    const instance = this.NewInstance();

    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(
    json: Record<string, any>,
  ): XVideoBackgroundObject {
    return this._JsonToInstance(json, XVideoBackgroundObjectData);
  }
}
