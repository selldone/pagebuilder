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
import {XSectionObjectData} from "@selldone/page-builder/components/x/section/XSectionObjectData.ts";
import {XContainerObject} from "@selldone/page-builder/components/x/container/XContainerObject.ts";
import {XSectionObject} from "@selldone/page-builder/components/x/section/XSectionObject.ts";
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";
import {XRowObject} from "@selldone/page-builder/components/x/row/XRowObject.ts";
import {XFeederBlogsObject} from "@selldone/page-builder/components/x/feeder/blogs/XFeederBlogsObject.ts";

export class LMigrationV2BlogsList {
  static Migrate($sectionData: any): LModelElement<XSectionObjectData> | null {
    if (!$sectionData) {
      return null;
    }

    const section = XSectionObject.MigrateOld($sectionData);

    section.addChild(
      XTextObject.MigrateOld($sectionData.title, "h2", ["my-5"]),
    );

    section.addChild(XTextObject.MigrateOld($sectionData.text, "p", ["my-5"]));

    const container = XContainerObject.MigrateOld($sectionData);
    section.addChild(container);

    const row = XRowObject.MigrateOld($sectionData);
    container.addChild(row);

    const blogs = XFeederBlogsObject.MigrateOld($sectionData);
    row.addChild(blogs);

    console.log(
      "Migrate V2 LSectionBlogList | $sectionData",
      $sectionData,
      "--structure-->",
      section,
    );

    return section;
  }
}
