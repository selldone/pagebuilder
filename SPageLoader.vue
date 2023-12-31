<!--
  - Copyright (c) 2023. Selldone® Business OS™
  -
  - Author: M.Pajuhaan
  - Web: https://selldone.com
  - ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  -
  - All rights reserved. In the weave of time, where traditions and innovations intermingle, this content was crafted.
  - From the essence of thought, through the corridors of creativity, each word, and sentiment has been molded.
  - Not just to exist, but to inspire. Like an artist's stroke or a sculptor's chisel, every nuance is deliberate.
  - Our journey is not just about reaching a destination, but about creating a masterpiece.
  - Tread carefully, for you're treading on dreams.
  -->

<template>
  <div
    ref="page_render_container"
    id="page-builder"
    :dir="direction"
    class="page-builder"
    style="background-color: #fff"
    @mousemove="handleDebouncedMouseMove"
    @click="handleMouseClick"
    v-resize="onResize"
  >
    <!-- ⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬ Top Shop Menu ⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬ -->
    <div :class="{ 'top-abs': menu_transparent }">
      <slot name="header"></slot>
    </div>
    <!-- ⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬⬬ -->

    <div v-if="busy" class="min-height-80vh">
      <s-loading height="240px" class="my-10"></s-loading>
    </div>

    <SPageRender
      :key="'page_' + page?.id"
      v-if="json"
      ref="page_render"
      style="min-height: 800px"
      :data="json"
      :style="background"
      :augment="augment"
    />

    <div
      v-if="show_heat_map"
      class="widget p-3 s--shadow-no-padding font-weight-bold"
      style="position: fixed; top: 12px; left: 16px"
    >
      <v-btn-toggle
        v-model="action"
        class="m-1 widget-toggle"
        mandatory
        dense
        active-class="blue-flat"
        borderless
      >
        <v-btn value="move">
          <v-icon class="me-1">mouse</v-icon>
          Move
        </v-btn>
        <v-btn value="click">
          <v-icon class="me-1">touch_app</v-icon>

          Click
        </v-btn>
        <v-btn value="scroll">
          <v-icon class="me-1">unfold_more</v-icon>

          Scroll
        </v-btn>
      </v-btn-toggle>

      <div class="mt-2 widget-buttons">
        <v-btn :href="window.location.href" target="_blank" text
          ><v-icon class="me-1">open_in_new</v-icon> Open full page
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import * as h337 from "heatmap.js";
import { opts } from "@components/plugins/vuetify/vuetify";

export default {
  name: "SPageLoader",
  components: {},
  props: {
    forceFetchUrl: {
      // Set fetch url externally! Used in page builder widget!
    },
  },
  data: () => ({
    // showLoading: true,

    json: null,
    page: null,
    augment: null, // Extra information to show to dynamic show in page content
    busy: false,

    catch_data: {
      type: null,
      move: {},
      scroll: {},
      click: {},
    },

    // ------------------
    scale: 1,
    heatmap: null,
    action: "move", // move   click   scroll

    //-------------------
    handleDebouncedMouseMove: null,
    handleDebouncedScroll: null,
  }),

  computed: {
    direction() {
      return this.page ? this.page.direction : "auto";
    },
    background() {
      return this.page ? this.page.background : null;
    },

    enable_tracking() {
      return this.$route.name !== "ShopPageRender";
    },

    show_heat_map() {
      return this.$route.name === "ShopPageRender";
    },

    menu_transparent() {
      return this.page?.content?.style?.menu_transparent;
    },

    header_mode() {
      return this.page?.content?.style?.header_mode;
    },

    menu_dark() {
      return this.page?.content?.style?.menu_dark;
    },
  },
  watch: {
    "$route.params.page_name"() {
      this.fetchPageData();
    },
    "$route.name"() {
      this.fetchPageData();
    },

    action() {
      if (this.show_heat_map) this.initHeatmap();
    },
  },

  created() {
    this.fetchShopDataIfNeeded();
    this.fetchPageData();

    if (this.enable_tracking) {
      this.catch_data.type = this.$vuetify.breakpoint.smAndDown
        ? "mobile"
        : this.$vuetify.breakpoint.mdAndDown
        ? "tablet"
        : "desktop";

      this.handleDebouncedScroll = debounce(this.handleScroll, 100);
      window.addEventListener("scroll", this.handleDebouncedScroll);

      this.interval = setInterval(() => {
        this.sendStatistics();
      }, 10000);
    }
    this.handleDebouncedMouseMove = debounce(this.onMouseMove, 30);
  },

  beforeDestroy() {
    if (this.enable_tracking) {
      if (this.interval) clearInterval(this.interval);

      this.sendStatistics(true);
      // I switched the example from `destroyed` to `beforeDestroy`
      // to exercise your mind a bit. This lifecycle method works too.
      window.removeEventListener("scroll", this.handleDebouncedScroll);
    }
  },

  methods: {
    // Fetch data for shop components:
    fetchShopDataIfNeeded() {
      if (
        !this.$route.params.shop_id ||
        this.$store.getters.getCurrentAdminShop
      )
        return;

      this.fetchCurrentAdminShop(
        this.$route.params.shop_id,
        () => {},
        false,
        0,
        0
      );
    },

    onResize() {
      setTimeout(() => {
        this.initHeatmap();
      }, 500);
    },
    //------------------------------------- Visualize Heatmap For Admin ------------------------------------------------

    initHeatmap() {
      if (!this.page) return;

      let type = this.$vuetify.breakpoint.smAndDown
        ? "mobile"
        : this.$vuetify.breakpoint.mdAndDown
        ? "tablet"
        : "desktop";
      let action = this.action;

      if (!this.page[type] || !this.page[type][action]) {
        if (this.heatmap) {
          this.heatmap.setData({
            max: 10,
            data: [],
          });
        }

        return;
      }

      const statistic = this.page[type][action];
      console.log("initHeatmap", type, action, "statistic", statistic);

      let data = [];

      let max = 0;
      Object.keys(statistic).forEach((pos) => {
        max = statistic[pos] > max ? statistic[pos] : max;
      });

      const container_rect =
        this.$refs.page_render.$refs.render_container.getBoundingClientRect();

      Object.keys(statistic).forEach((pos) => {
        if (action === "scroll") {
          let y = parseInt(pos) * 200;
          for (let i = 0; i <= 20; i++) {
            data.push({
              x: Math.round((i * container_rect.width) / (20 * this.scale)),
              y: Math.round(y),
              value: statistic[pos],
            });
          }
        } else {
          let res = pos.split(":");
          let x = (parseInt(res[0]) * container_rect.width) / (10 * this.scale);
          let y = parseInt(res[1]) * 200;

          data.push({
            x: Math.round(x),
            y: Math.round(y),
            value: statistic[pos],
          });
        }
      });

      // console.log('this.$refs.page_render.$el',this.$refs.page_render.$refs)
      if (!this.heatmap) {
        this.heatmap = h337.create({
          container: this.$refs.page_render.$refs.render_container,
          maxOpacity: 0.6,
          radius: 150,
          blur: 0.7,
          backgroundColor: "rgba(0, 0, 0, 0)",
        });
      }

      console.log("data", data, "max", max);

      this.heatmap.setData({
        max: max,
        data: data, // [{ x: 10, y: 15, value: 5},{ x: 200, y: 105, value: 5}]
      });

      //  console.log('data',data,max)
    },

    //------------------------------------------------------------------------------------------------
    handleScroll(event) {
      if (!this.enable_tracking) return;

      const y_n = Math.abs(Math.round(window.scrollY / 200));
      ///////console.log('handleScroll',y_n)
      if (!this.catch_data.scroll["" + y_n]) {
        this.catch_data.scroll["" + y_n] = 1;
      } else {
        this.catch_data.scroll["" + y_n] += 1;
      }
    },

    handleMouseClick(event) {
      if (!this.enable_tracking) return;

      const coordination = this.getNormalizeCoordination(event);
      if (!coordination) return; // Exit point!

      const x_n = coordination[0];
      const y_n = coordination[1];

      if (!this.catch_data.click[`${x_n}:${y_n}`])
        this.catch_data.click[`${x_n}:${y_n}`] = 1;
      else {
        this.catch_data.click[`${x_n}:${y_n}`] += 1;
      }
    },

    fetchPageData() {
      if (this.busy) return;
      this.busy = true;
      this.page = null;
      this.json = null;

      let url = "";

      if (this.forceFetchUrl) {
        url = this.forceFetchUrl;
      } else {
        // 🚀 Boost mode! Load preloaded data on html page:
        if (window.PRE_LOADED_DATA && window.PRE_LOADED_DATA.PAGE) {
          this.loadPage(window.PRE_LOADED_DATA.PAGE);
          window.PRE_LOADED_DATA.PAGE = null; // Clear pre loaded data!
          this.busy = false;
          return;
        }

        // Shop home page in storefront
        if (this.$route.name === "CustomHomePage") {
          url = window.XAPI.GET_CUSTOM_HOME_PAGE(
            this.shop_name,
            window.$storefront.home
          );
        }
        // Render of selldone dashboard:
        else if (this.$route.name === "ShopPageRender") {
          //  Page Builder ▶ Render for User behavior
          url = window.API.GET_PAGE_DATA(
            this.$route.params.shop_id,
            this.$route.params.page_id
          );
        } else if (this.$route.name === window.$storefront?.routes.INCLUDE_PAGE_RENDER) {
          if (!this.shop_name) return;
          url = window.XAPI.GET_INCLUDE_PAGE_DATA(
            this.shop_name,
            this.$route.params.include_id
          );
        }

        // Normal shop landing page on the storefront:
        else {
          url = this.shop_name
            ? window.XAPI.GET_PAGE_DATA(
                this.shop_name,
                this.$route.params.page_name
              )
            : window.GAPI.GET_PAGE_DATA(this.$route.params.page_name);
        }
      }

      axios
        .get(url)
        .then(({ data }) => {
          if (data.error) {
            this.showErrorAlert(null, data.error_msg);
          } else {
            this.loadPage(data);
          }
        })
        .catch((error) => {
          this.showLaravelError(error);
        })

        .finally(() => {
          this.busy = false;
        });
    },

    loadPage(data) {
      this.$emit("onFetch:data", data);

      this.page = data.page;
      this.json = data.page.content;

      //Augment data:
      this.augment = data.augment;

      this.$emit("update:page", this.page);
      this.$emit("update:menu-transparent", this.menu_transparent);
      this.$emit("update:header-mode", this.header_mode);

      if (this.menu_dark !== null || this.menu_dark !== undefined) {
        this.$emit("update:menu-dark", this.menu_dark);
      }

      if (this.show_heat_map) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.initHeatmap();
          }, 500);
        });
      }
    },

    onMouseMove(e) {
      const coordination = this.getNormalizeCoordination(e);
      if (!coordination) return; // Exit point!

      const x_n = coordination[0];
      const y_n = coordination[1];

      this.catch_data.x_n = x_n;
      this.catch_data.y_n = y_n;

      if (!this.catch_data.move[`${x_n}:${y_n}`])
        this.catch_data.move[`${x_n}:${y_n}`] = 1;
      else {
        this.catch_data.move[`${x_n}:${y_n}`] += 1;
      }

      ///  console.log(x_n,y_n)
    },

    getNormalizeCoordination(e) {
      if (!this.$refs.page_render_container) return; // Fix: On change page null return.

      const x = e.clientX; //- rect.left; //x position within the element.
      const y = e.clientY + window.scrollY; //- rect.top +e.target.offsetTop;  //y position within the element.

      const container_rect =
        this.$refs.page_render_container.getBoundingClientRect();

      const x_n = Math.abs(Math.round((x * 10) / container_rect.width));
      const y_n = Math.abs(Math.round(y / 200));

      return [x_n, y_n];
    },

    sendStatistics(force_send = false) {
      if (
        !this.shop_name ||
        !this.page ||
        this.page
          .preview /*Send by server when show page in preview mode [PREVIEW-TEMPLATE:14]*/
      )
        return; //Only for shop!

      //console.log('sendStatistics',Object.keys(this.catch_data.move).length)
      if (Object.keys(this.catch_data.move).length < 10 && !force_send) return;

      axios
        .get(window.XAPI.GET_PAGE_STATISTIC(this.shop_name, this.page.id), {
          params: {
            data: this.catch_data,
          },
        })
        .then(({ data }) => {
          this.catch_data.move = {};
          this.catch_data.scroll = {};
          this.catch_data.click = {};

          this.catch_data.changed = true;
        })
        .catch((e) => {
          //this.showLaravelError(e);
        })
        .finally(() => {});
    },
  },
};
</script>

<style lang="scss">
.page-builder {
  display: flow-root; // Fix problem in first section margin from top! (Not show background of main element)
  position: relative;
}
.top-abs {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
}
</style>
