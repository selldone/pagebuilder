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

import * as types from "./types";
import ProductFramesSample from "@app-page-builder/sections/store/custom-listing/frames/ProductFramesSample";
import CategoryFramesSample from "@app-page-builder/sections/store/custom-listing/frames/CategoryFramesSample";
import {isFunction, isObject} from "lodash-es";

const DEBUG = false;

const SeederRepository: Map<string, any> = new Map([
  [types.Title.name, "Lorem ipsum dolor sit amet"],
  [
    types.Text.name,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  ],
  [types.Avatar.name, require("../assets/images/samples/empty-photo-1.svg")],
  [types.Logo.name, require("../assets/images/samples/empty-photo-2.svg")],
  [types.Link.name, ""],
  [
    types.Image.name,
    () => ({
      src: require("../assets/images/samples/empty-photo-3.svg"),
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
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  ],
  [
    types.Grid.name,
    () => ({ mobile: "", tablet: "", desktop: "", widescreen: "" }),
  ],
  [Number.name, 100],
  [
    String.name,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
      classes: Seeder.seed(types.ClassList),
      style: Seeder.seed(types.Style),
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
      title: "Title",
      subtitle: "Some messages...",
      image: Seeder.seed(types.Image),
      row: Seeder.seed(types.Row) /*Align message!*/,
      container: Seeder.seed(types.Container),
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

      input: Seeder.seed(types.Input),

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
    }),
  ],
]);

export class Seeder {
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
      return schema.map((s) => Seeder.seed(s));
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
          values[key] = Seeder.seed(schema[key]);
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
}
