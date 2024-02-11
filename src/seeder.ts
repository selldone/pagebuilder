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
import { isObject } from "./util";
import ProductFramesSample from "@app-page-builder/sections/products/frames/ProductFramesSample";
import CategoryFramesSample from "@app-page-builder/sections/products/frames/CategoryFramesSample";

const data = new Map([
  [types.Title, "Lorem ipsum dolor sit amet"],
  [
    types.Text,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  ],
  [types.Avatar, require("../assets/images/samples/empty-photo-1.svg")],
  [types.Logo, require("../assets/images/samples/empty-photo-2.svg")],
  [types.Link, ""],
  [
    types.Image,
    () => ({
      src: require("../assets/images/samples/empty-photo-3.svg"),
      setting: { contain: false, aspect: 1 },
    }),
  ],
  [types.Style, () => ({})],
  [types.ClassList, () => []],
  [
    types.Button,
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
    types.Quote,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  ],
  [types.Grid, () => ({ mobile: "", tablet: "", desktop: "", widescreen: "" })],
  [Number, 100],
  [
    String,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  ],

  [
    types.Products,
    () => ({
      sort: "most_popular",
      only_available: true,
      count: 4,
      categories_count: 4,
    }),
  ],
  [types.Product, () => ({ id: null })],

  [
    types.Html,
    "<h1 class='text-h2'>\n<b>Hello world.</b>\n</h1>\n<h2>We are Selldoners.</h2>\n<br>\n<br>\n<br>\n<br>\n<p> The #1 operating system for fast-growing companies </p>\n<br>\n<br>\n\n\n\n",
  ],

  [
    types.Lottie,
    () => ({
      src: "/animation/23222-checkmark.json",
      setting: { size: "auto", width: "100%" },
    }),
  ],

  [
    types.Background,
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
    types.Row,
    () => ({
      align: "stretch",
      justify: "space-around",
      fluid: false,
      no_wrap: false,
    }),
  ],
  [
    types.Container,
    () => ({
      fluid: false,
      classes: Seeder.seed(types.ClassList),
      style: Seeder.seed(types.Style),
    }),
  ],

  [
    types.Blogs,
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
    types.Slide,
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
    types.FrameProduct,
    () => ({ code: ProductFramesSample.Curvy_Card, classes: [] }),
  ],
  [
    types.FrameCategory,
    () => ({ code: CategoryFramesSample.Curvy_Card, classes: [] }),
  ],

  [
    types.Input,
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
    types.Newsletter,
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
    types.TextLoop,
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
  static seed(schema) {
    //console.log("seeder > schema", schema);

    //━━━━━━━━━━━━━━━ Ignore init function ━━━━━━━━━━━━━━━
    if (schema?.name === "$init") return; // init in $schema is used to set default value on add new section step.
    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    if (isObject(schema)) {
      return Object.keys(schema).reduce((values, key) => {
        // console.log("seeder > Object", key, schema[key]);

        values[key] = Seeder.seed(schema[key]);
        return values;
      }, {});
    } else if (Array.isArray(schema)) {
      // console.log("seeder > Array", schema);
      return schema.map((s) => {
        return Seeder.seed(s);
      });
    }
    // console.log("seeder > Normal", schema);

    let value = data.get(schema);
    if (value === undefined) {
      value = schema;
    }
    return typeof value === "function" ? value() : value;
  }
}
