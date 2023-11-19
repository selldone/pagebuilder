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

import Vue from "vue";
import Router from "vue-router";

//――――――――――――――――――――――――― Page Builder ―――――――――――――――――――――――――
import PageBuilder from "../SPageBuilder.vue";

Vue.use(Router);
const router = new Router({
  mode: "history",
  base: "page-builder", //process.env.BASE_URL
  routes: [
    {
      path: "/:shop_id",
      name: "PageBuilder",
      component: PageBuilder,
    },

    {
      path: "/:shop_id/:page_id",
      name: "ShopPageBuilderPage",
      component: PageBuilder,
    },

    //█████████████████████████████████████████████████████████████
    //――――――――――――――――――――― Shop General Layout (fake) ―――――――――――――――――――――――
    //█████████████████████████████████████████████████████████████

    {
      path: "/@:shop_name",

      children: [
        // ▶ ▶ ⬬⬬⬬⬬⬬⬬⬬⬬ Shop Page ⬬⬬⬬⬬⬬⬬⬬⬬
        {
          path: "",
          name: "ShopPage",
        },

        // ▶ ▶ ⬬⬬⬬⬬⬬⬬⬬⬬ Product Page ⬬⬬⬬⬬⬬⬬⬬⬬
        {
          path: "product/:product_id",
          name: "ProductPage",
        },

        // ▶ ▶ ⬬⬬⬬⬬⬬⬬⬬⬬ Basket Page (Physical) ⬬⬬⬬⬬⬬⬬⬬⬬
        {
          path: "basket",
          name: "BasketPage",
        },
      ],
    },
  ],
});

export default router;
