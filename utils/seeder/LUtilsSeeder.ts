/*
 * Copyright (c) 2023-2024. Selldone® Business OS™
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

import * as types from "../../src/types/types";
import ProductFramesSample from "../../sections/store/custom-listing/frames/ProductFramesSample";
import CategoryFramesSample from "../../sections/store/custom-listing/frames/CategoryFramesSample";
import {isFunction, isObject} from "lodash-es";
import imagePlaceholder from "../../assets/images/samples/image-placeholder.png";
import {
  LSectionHeroHorizontalSeed
} from "@selldone/page-builder/sections/hero/horizontal/LSectionHeroHorizontalSeed.ts";
import {LSectionHeroVerticalSeed} from "@selldone/page-builder/sections/hero/vertical/LSectionHeroVerticalSeed.ts";
import {LSectionHeroLottieSeed} from "@selldone/page-builder/sections/hero/lottie/LSectionHeroLottieSeed.ts";
import {LSectionHeroSearchSeed} from "@selldone/page-builder/sections/hero/search/LSectionHeroSearchSeed.ts";
import {
  LSectionTextTwoColumnsSeed
} from "@selldone/page-builder/sections/text/two-columns/LSectionTextTwoColumnsSeed.ts";
import {
  LSectionTextThreeColumnsSeed
} from "@selldone/page-builder/sections/text/three-columns/LSectionTextThreeColumnsSeed.ts";
import {LSectionTextNumbersSeed} from "@selldone/page-builder/sections/text/numbers/LSectionTextNumbersSeed.ts";
import {LSectionImageSocialsSeed} from "@selldone/page-builder/sections/image/socials/LSectionImageSocialsSeed.ts";
import {LSectionImageCardsSeed} from "@selldone/page-builder/sections/image/cards/LSectionImageCardsSeed.ts";
import {LSectionImageFeaturesSeed} from "@selldone/page-builder/sections/image/features/LSectionImageFeaturesSeed.ts";
import {LSectionImageIntroSeed} from "@selldone/page-builder/sections/image/intro/LSectionImageIntroSeed.ts";
import {LSectionTextMarqueeSeed} from "@selldone/page-builder/sections/text/marquee/LSectionTextMarqueeSeed.ts";
import {
  LSectionImageTwoColumnsSeed
} from "@selldone/page-builder/sections/image/two-columns/LSectionImageTwoColumnsSeed.ts";
import {
  LSectionImageThreeColumnsSeed
} from "@selldone/page-builder/sections/image/three-columns/LSectionImageThreeColumnsSeed.ts";
import {
  LSectionGalleryExpandableSeed
} from "@selldone/page-builder/sections/gallery/expandable/LSectionGalleryExpandableSeed.ts";
import {LSectionGalleryBrandsSeed} from "@selldone/page-builder/sections/gallery/brands/LSectionGalleryBrandsSeed.ts";

const DEBUG = false;

const SeederRepository: Map<string, any> = new Map<string, any>([
  [types.Title.name, () => ({ value: "Enter your headline here..." })],
  [
    types.Text.name,
    () => ({
      value:
        "Write your main content here, including key details about your topic, ensuring to cover the main elements of discussion or description...",
    }),
  ],
  [types.Avatar.name, imagePlaceholder],
  [types.Logo.name, imagePlaceholder],
  [types.Link.name, ""],
  [
    types.Image.name,
    () => ({
      src: imagePlaceholder,
      setting: { contain: false, aspect: 1 },
    }),
  ],
  [types.Style.name, () => ({})],
  [types.ClassList.name, () => []],
  [
    types.Button.name,
    () => ({
      content: "Action",
      classes: [],
      href: "",
      color: "#1976D2",
      xSmall: false,
      small: false,
      large: false,
      xLarge: true,
      dark: true,
      depressed: false,
      outlined: false,
      text: false,
      fab: false,
      tile: false,
      ripple: false,
      rounded: true,
      glow: false,
    }),
  ],
  [
    types.Quote.name,
    () => ({
      value: "Describe your experience in detail...",
    }),
  ],
  [
    types.Grid.name,
    () => ({ mobile: "", tablet: "", desktop: "", widescreen: "" }),
  ],
  [
    Number.name,
    () => ({
      value: 100,
    }),
  ],
  [
    String.name,
    () => ({
      value:
        "Write your article, starting with a catchy introduction followed by supporting paragraphs and a conclusion...",
    }),
  ],

  [
    types.Products.name,
    () => ({
      sort: "most_popular",
      only_available: true,
      count: 4,
      categories_count: 4,
    }),
  ],
  [types.Product.name, () => ({ id: null })],

  [
    types.Html.name,
    "<h1 class='text-h2'>\n<b>Hello world.</b>\n</h1>\n<h2>We are Selldoners.</h2>\n<br>\n<br>\n<br>\n<br>\n<p> The #1 operating system for fast-growing companies </p>\n<br>\n<br>\n\n\n\n",
  ],

  [
    types.Lottie.name,
    () => ({
      src: "/animation/23222-checkmark.json",
      setting: { size: "auto", width: "100%" },
    }),
  ],

  [
    types.Background.name,
    () => ({
      bg_color: null,
      bg_image: null,
      bg_video: null,
      bg_gradient: [],
      bg_size: null,
      bg_custom: null,
      bg_repeat: null,
      dark: false,
    }),
  ],

  [
    types.Row.name,
    () => ({
      align: "stretch",
      justify: "space-around",
      fluid: false,
      no_wrap: false,
    }),
  ],
  [
    types.Container.name,
    () => ({
      fluid: false,
      classes: LUtilsSeeder.seed(types.ClassList),
      style: LUtilsSeeder.seed(types.Style),
    }),
  ],

  [
    types.Blogs.name,
    () => ({
      tags: [],
      offset: 0,
      limit: 4,
      sortBy: "created_at",
      sortDesc: true,
      search: null,
      style: { flat: false, rect: false, dark: false, color: null },
    }),
  ],

  [
    types.Slide.name,
    () => ({
      title: () => ({ value: "Slide title" }),
      subtitle: () => ({ value: "Some messages..." }),
      image: LUtilsSeeder.seed(types.Image),
      row: LUtilsSeeder.seed(types.Row) /*Align message!*/,
      container: LUtilsSeeder.seed(types.Container),
      // Thumbs:
      thumb_title: "Title",
      thumb_subtitle: "Sub title...",
      button: null,
    }),
  ],

  [
    types.FrameProduct.name,
    () => ({ code: ProductFramesSample.Curvy_Card, classes: [] }),
  ],
  [
    types.FrameCategory.name,
    () => ({ code: CategoryFramesSample.Curvy_Card, classes: [] }),
  ],

  [
    types.Input.name,
    () => ({
      placeholder: "Enter your email john@...",
      flat: false,
      solo: true,
      outlined: false,
      dark: false,
      backgroundColor: "#FFF",
      filled: false,
      rounded: false,

      label: null,
      messages: null,
      hint: null,
      persistentPlaceholder: false,
    }),
  ],

  [
    types.Newsletter.name,
    () => ({
      success_msg:
        "Thank you, we have received your email address for our newsletter.",

      input: LUtilsSeeder.seed(types.Input),

      success_dialog: {
        title: "Thanks",
        message:
          "Thank you, we have received your email address for our newsletter.",
      },
      error_dialog: {
        title: "Email is empty!",
        message: "Please enter your email address.",
      },
    }),
  ],

  [
    types.TextLoop.name,
    () => ({
      html: "Write some text here...",
      height: "24px",
      duration: "10s",
      color: null,
      space: 200,
      repeat: 10,
    }),
  ],
]);

export class LUtilsSeeder {
  // Seeds values using a schema.
  /**
   * Recursively seeds a given schema, transforming it based on predefined rules or data mappings.
   * If the schema is an array, each element is seeded individually.
   * If the schema is an object (excluding arrays), its properties are seeded.
   * The method supports special cases, such as skipping seeding for a schema named "$init",
   * and directly returning values for schemas associated with a predefined value or a function in `data`.
   *
   * @param schema The input schema to seed, which can be an array, object, or any other type.
   * @returns The seeded schema, with transformations applied to each element or property as needed.
   */
  static seed(schema: Record<string, any>): any {
    //━━━━━━━━━━━━━━━ Ignore init function ━━━━━━━━━━━━━━━
    if (schema?.name === "$init") return; // init in $schema is used to set default value on add new section step.
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    if (DEBUG)
      console.log(
        `Seed > schema:${schema?.name} ${Array.isArray(schema) ? "Array" : ""} ${isObject(schema) ? "Object" : ""}  ${isFunction(schema) ? "Function" : ""} >`,
        schema,
      );

    if (Array.isArray(schema)) {
      return schema.map((s) => LUtilsSeeder.seed(s));
    } else if (isFunction(schema)) {
      const value = SeederRepository.get(schema?.name);
      if (value !== undefined) {
        const out = isFunction(value) ? value() : value;
        if (DEBUG) console.log(`👽 Seed by repository ${schema?.name} ->`, out);

        return out;
      }
    } else if (isObject(schema)) {
      return Object.keys(schema).reduce(
        (values, key) => {
          values[key] = LUtilsSeeder.seed(schema[key]);
          return values;
        },
        {} as Record<string, any>,
      );
    }

    // Assuming `data` is a predefined map or function to get seeded values
    const out = isFunction(schema) ? schema() : schema;

    if (DEBUG) console.log(`😅 Seed by schema ${schema} ->`, out);

    return out;
  }

  static SeedNew(name: string) {
    console.log("🪵 Seed", name);

    if (name === "LSectionHeroHorizontal") {
      return LSectionHeroHorizontalSeed();
    } else if (name === "LSectionHeroVertical") {
      return LSectionHeroVerticalSeed();
    } else if (name === "LSectionHeroLottie") {
      return LSectionHeroLottieSeed();
    } else if (name === "LSectionHeroSearch") {
      return LSectionHeroSearchSeed();
    } else if (name === "LSectionTextTwoColumns") {
      return LSectionTextTwoColumnsSeed();
    } else if (name === "LSectionTextThreeColumns") {
      return LSectionTextThreeColumnsSeed();
    } else if (name === "LSectionTextNumbers") {
      return LSectionTextNumbersSeed();
    } else if (name === "LSectionImageSocials") {
      return LSectionImageSocialsSeed();
    } else if (name === "LSectionImageCards") {
      return LSectionImageCardsSeed();
    } else if (name === "LSectionImageFeatures") {
      return LSectionImageFeaturesSeed();
    } else if (name === "LSectionImageIntro") {
      return LSectionImageIntroSeed();
    } else if (name === "LSectionTextMarquee") {
      return LSectionTextMarqueeSeed();
    } else if (name === "LSectionImageTwoColumns") {
      return LSectionImageTwoColumnsSeed();
    } else if (name === "LSectionImageThreeColumns") {
      return LSectionImageThreeColumnsSeed();
    } else if (name === "LSectionGalleryExpandable") {
      return LSectionGalleryExpandableSeed();
    }else if (name === "LSectionGalleryBrands") {
      return LSectionGalleryBrandsSeed();
    }





    console.error("🚨 Seed not found", name);
    return null;
  }
}
