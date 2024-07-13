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

export class XDivObject extends LModelElement<null> {

  public static ComponentName="XDive";


  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: null,
    props: any,
  ) {
    super(
        XDivObject.ComponentName,
      background,
      style,
      classes,
      children,
      data,
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XDivObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ Labeled Children ━━━━━━━━━━━━━━━━━

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  /**
   * Create a new instance of XDivObject
   * @constructor
   */
  static Seed(): XDivObject {
    return XDivObject.NewInstance();
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━

  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */
  static MigrateOld(old: any): XDivObject {
    const data = new XDivObject();

    return new XDivObject(
      new LModelBackground(old?.background),
      old?.style,
      old?.classes,
      [],
      data,
      null,
    );
  }
}
