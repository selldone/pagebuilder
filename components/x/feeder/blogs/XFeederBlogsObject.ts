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
import {XFeederBlogsObjectData} from "@selldone/page-builder/components/x/feeder/blogs/XFeederBlogsObjectData.ts";
import {XContainerObjectData} from "@selldone/page-builder/components/x/container/XContainerObjectData.ts";

export class XFeederBlogsObject extends LModelElement<XFeederBlogsObjectData> {

  public static ComponentName="XFeederBlogs";
  public static Info = {
    group:'Feeder',
    icon:'description',
    title:'Blogs'
  };

  constructor(
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: XFeederBlogsObjectData | null,
    props: any,
  ) {
    super(
        XFeederBlogsObject.ComponentName,
      background,
      style,
      classes,
      children,
      data ? data : new XFeederBlogsObjectData(),
      props,
    );
  }

  // ━━━━━━━━━━━━━━━━━ 🥪 Instance ━━━━━━━━━━━━━━━━━
  static NewInstance() {
    return new XFeederBlogsObject(null, null, null, null, null, null);
  }

  // ━━━━━━━━━━━━━━━━━ 🫘 Seed ━━━━━━━━━━━━━━━━━

  static Seed(): XFeederBlogsObject {
    const instance = this.NewInstance();
    instance.data.filter.sortBy = "created_at";
    instance.data.filter.sortDesc = true;
    instance.data.filter.limit = 4;

    instance.data.grid.mobile = 12;
    instance.data.grid.tablet = 6;
    instance.data.grid.desktop = 3;

    instance.data.card.rounded = "xl";
    instance.data.card.elevation = 5;

    return instance;
  }

  // ━━━━━━━━━━━━━━━━━ 🍢 Migration ━━━━━━━━━━━━━━━━━
  /**
   * Migrate from V1 to V2
   * @param old
   * @constructor
   */

  static MigrateOld(old: any): XFeederBlogsObject {
    const data = new XFeederBlogsObjectData();

    data.filter.sortBy = old.blogs_filter?.sortBy;
    data.filter.sortDesc = old.blogs_filter?.sortDesc;
    data.filter.limit = old.blogs_filter?.limit;
    data.filter.offset = old.blogs_filter?.offset;
    data.filter.search = old.blogs_filter?.search;
    data.filter.tags = old.blogs_filter?.tags;

    data.grid.mobile = old.grid?.mobile;
    data.grid.tablet = old.grid?.tablet;
    data.grid.desktop = old.grid?.desktop;
    data.grid.widescreen = old.grid?.widescreen;

    data.card.color = old.blogs_filter?.style?.color;
    data.card.dark = old.blogs_filter?.style?.dark;
    data.card.flat = old.blogs_filter?.style?.flat;
    data.card.rounded = old.blogs_filter?.style?.rounded;

    return new XFeederBlogsObject(null, null, null, [], data, null);
  }

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  public static JsonToInstance(json: Record<string, any>): XFeederBlogsObject {
    return this._JsonToInstance(json, XFeederBlogsObjectData);
  }

}
