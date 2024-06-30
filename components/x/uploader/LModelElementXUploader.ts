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
import {XUploaderData, XUploaderDataTypes,} from "@selldone/page-builder/components/x/uploader/XUploaderData.ts";
import imagePlaceholder from "../../../assets/images/samples/image-placeholder.png";

export class LModelElementXUploader extends LModelElement<XUploaderData> {
  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XUploaderData | null,
    props: any,
  ) {
    super(
      "XUploader",
      background,
      style,
      classes,
      children,
      data ? data : new XUploaderData(null, new XUploaderDataTypes.Setting()),
      props,
    );
  }

  static Seed(
    aspect: number = 1,
    contain: boolean = false,
    round: boolean = false,
    initialClasses: string[] = ["ma-auto"],
  ): LModelElementXUploader {
    const data = new XUploaderData(
      imagePlaceholder,
      new XUploaderDataTypes.Setting({
        aspect: aspect,
        contain: contain,
        round: round,
      }),
    );

    return new LModelElementXUploader(
      null,
      null,
      initialClasses,
      null,
      data,
      null,
    );
  }

  static MigrateOld(old: any): LModelElementXUploader | null {
    if (!old) return null;
    const data = new XUploaderData(old?.src, old?.setting);

    console.log("IMAGE----------?", old, "--->", data);

    return new LModelElementXUploader(
      new LModelBackground(old?.background),
      old?.style,
      old?.classes,
      [],
      data,
      null,
    );
  }
}
