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
import {XRowObject} from "@selldone/page-builder/components/x/row/XRowObject.ts";
import {XColumnObject} from "@selldone/page-builder/components/x/column/XColumnObject.ts";
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";
import {XFormObject} from "@selldone/page-builder/components/x/form/XFormObject.ts";
import {isString} from "lodash-es";
import {XInputTextObject} from "@selldone/page-builder/components/x/input/text/XInputTextObject.ts";
import {XFormObjectDataTypes} from "@selldone/page-builder/components/x/form/XFormObjectData.ts";

export class LMigrationV2Newsletter {
  static Migrate($sectionData: any): LModelElement<XSectionObjectData> | null {
    if (!$sectionData) {
      return null;
    }

    const section = XSectionObject.MigrateOld($sectionData);

    const container = XContainerObject.MigrateOld($sectionData);
    section.addChild(container);

    const row = XRowObject.MigrateOld($sectionData);
    container.addChild(row);

    const column = XColumnObject.MigrateOld($sectionData.columns[0]);
    row.addChild(column);

    column.addChild(
      XTextObject.MigrateOld($sectionData.columns[0].title, "h2", ["mb-2"]),
    );
    column.addChild(
      XTextObject.MigrateOld($sectionData.columns[0].content, "p", ["mb-4"]),
    );

    // Add form
    const form = XFormObject.MigrateOld(null);
    column.addChild(form);

    if ($sectionData.newsletter.success_msg) {
      form.data.success.title = "Success";
      form.data.success.message = isString($sectionData.newsletter.success_msg)
        ? $sectionData.newsletter.success_msg
        : "Thank you for your submission.";
    }

    form.data
      .setMethod(XFormObjectDataTypes.Methods.POST)
      .setUrl(
        window.XAPI.POST_STREAM_USER_ADD_NEWSLETTER(
          "{shop_id}" /*Dynamic value will be replaced in the getGeneratedUrl method*/,
          "newsletter",
        ),
      )
      .setHidden([{ type: "array", key: "tags", value: ["newsletter"] }]);

    const email = XInputTextObject.MigrateOld($sectionData.newsletter.input);
    email.data.setName("email"); // Force be email!
    form.addChild(email);

    console.log(
      "Migrate V2 LSectionFormNewsletter | $sectionData",
      $sectionData,
      "--structure-->",
      section,
    );

    return section;
  }
}
