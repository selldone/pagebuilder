/*
 * Copyright (c) 2023. Selldone® Business OS™
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

import {App} from "vue";
import Builder, {builder} from "./Builder";

import "./styles/page-builder.scss";
import {isFunction} from "lodash-es";
import {Page} from "@selldone/core-js/models/shop/page/page.model";

export function SetupPageBuilder(app: App, options: Partial<builder.IOptions>) {
  console.log("⚽ 1. Setup Page builder");

  if (!options)
    throw new Error("Options are not set in the setup page builder!");

  if (options?.mode === "view") {
    // install the builder
    app.use(Builder,options);
  } else if (options?.mode === "edit") {
    if (!options.server) {
      throw new Error(
        "In the edit mode options should have 'server' property! Correct it in  SetupPageBuilder(...,here)",
      );
    }
    // Use the uploadImageUrl function if provided
    if (
      !options.server?.uploadImageUrl ||
      !isFunction(options.server?.uploadImageUrl)
    ) {
      console.error(
        "Edit mode. Invalid uploadImageUrl function in SetupPageBuilder(...,here)!",
      );
    } else {
      const test = options.server?.uploadImageUrl("page", {
        id: 0,
        shop_id: 0,
      } as Page);
      if (!test) {
        console.error(
          "Invalid uploadImageUrl! Generated test upload image path is " + test,
        );
      }
    }

    // install the builder
    app.use(Builder, options);
  } else {
    console.error(
      "Invalid page builder initial mode! Use 'edit' or 'view'!",
      options?.mode,
    );
  }
}
