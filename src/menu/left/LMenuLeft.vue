<!--
  - Copyright (c) 2024. Selldone® Business OS™
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
  <v-sheet
    color="#222"
    class="l--page-editor-side-menu no-inv overflow-hidden elevation-3"
    :class="{
      'is-visible': isVisible,
      'pen usn': !isVisible,
      '-scroll-down': isScrollDown,
      '-dragged': is_dragged,
      '-small': $vuetify.display.xs,
    }"
    :width="!tab ? 58 : width"
    v-if="model"
    dir="ltr"
  >
    <div class="l-buttons">
      <v-btn
        v-for="tabItem in tabs"
        :key="tabItem.key"
        variant="text"
        min-width="46"
        min-height="46"
        rounded="lg"
        class="ma-1"
        @click="toggle(tabItem.key)"
        :color="tab === tabItem.key ? 'amber' : undefined"
      >
        <v-icon>{{ tabItem.icon }}</v-icon>
        <v-tooltip activator="parent">{{ tabItem.tooltip }}</v-tooltip>
      </v-btn>

      <v-spacer></v-spacer>
      <!-- ━━━━━━━━━━━━━━━ CSS ━━━━━━━━━━━━━━━ -->
      <l-menu-left-css />

      <!-- ━━━━━━━━━━━━━━━ Statistic ━━━━━━━━━━━━━━━ -->
      <l-menu-left-statistics v-if="is_page"></l-menu-left-statistics>

      <!-- ━━━━━━━━━━━━━━━ SEO ━━━━━━━━━━━━━━━ -->
      <l-menu-left-seo v-if="is_page" />

      <!-- ━━━━━━━━━━━━━━━ Filter ━━━━━━━━━━━━━━━ -->
      <l-menu-left-popup-filter v-if="is_popup"></l-menu-left-popup-filter>

      <!-- ━━━━━━━━━━━━━━━ Appearance ━━━━━━━━━━━━━━━ -->
      <l-menu-left-popup-appearance
        v-if="is_popup"
      ></l-menu-left-popup-appearance>

      <!-- ━━━━━━━━━━━━━━━ Settings ━━━━━━━━━━━━━━━ -->
      <l-menu-left-setting></l-menu-left-setting>
    </div>

    <div class="l-window overflow-auto thin-scroll">
      <v-tabs-window :model-value="tab">
        <!-- ━━━━━━━━━━━━━━━ Navigation ━━━━━━━━━━━━━━━ -->

        <v-tabs-window-item
          value="navigation"
          eager
          :style="{ width: min_width_window + 'px' }"
        >
          <l-menu-left-hierarchy></l-menu-left-hierarchy>
        </v-tabs-window-item>

        <!-- ━━━━━━━━━━━━━━━ Sections ━━━━━━━━━━━━━━━ -->

        <v-tabs-window-item
          value="sections"
          eager
          :style="{ width: min_width_window + 'px' }"
        >
          <l-menu-left-sections
            @update:is-dragged="(val) => (is_dragged = val)"
          ></l-menu-left-sections>
        </v-tabs-window-item>
        <!-- ━━━━━━━━━━━━━━━ Elements ━━━━━━━━━━━━━━━ -->
        <v-tabs-window-item
          value="elements"
          eager
          :style="{ width: min_width_window + 'px' }"
        >
          <LMenuLeftElements
            @update:is-dragged="(val) => (is_dragged = val)"
          ></LMenuLeftElements>
        </v-tabs-window-item>

        <!-- ━━━━━━━━━━━━━━━ Versions ━━━━━━━━━━━━━━━ -->
        <v-tabs-window-item
          value="versions"
          eager
          :style="{ width: min_width_window + 'px' }"
        >
          <l-menu-left-versions
            :histories="histories"
            :setPageFunction="setPageFunction"
            :fetchPageData="fetchPageData"
          ></l-menu-left-versions>
        </v-tabs-window-item>

        <!-- ━━━━━━━━━━━━━━━ Assets ━━━━━━━━━━━━━━━ -->
        <v-tabs-window-item
          v-if="is_page"
          value="assets"
          :style="{ width: min_width_window + 'px' }"
        >
          <l-menu-left-assets />
        </v-tabs-window-item>

        <!-- ━━━━━━━━━━━━━━━ Sort ━━━━━━━━━━━━━━━ -->
        <v-tabs-window-item
          value="sort"
          :style="{ width: min_width_window + 'px' }"
        >
          <l-menu-left-sort />
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LMenuLeftHierarchy from "@selldone/page-builder/src/menu/left/hierarchy/LMenuLeftHierarchy.vue";
import LMenuLeftSections from "@selldone/page-builder/src/menu/left/sections/LMenuLeftSections.vue";
import LMenuLeftElements from "@selldone/page-builder/src/menu/left/elements/LMenuLeftElements.vue";
import LMenuLeftVersions from "@selldone/page-builder/src/menu/left/versions/LMenuLeftVersions.vue";
import LMenuLeftSetting from "@selldone/page-builder/src/menu/left/setting/LMenuLeftSetting.vue";
import LMenuLeftSeo from "@selldone/page-builder/src/menu/left/seo/LMenuLeftSeo.vue";
import LMenuLeftCss from "@selldone/page-builder/src/menu/left/css/LMenuLeftCss.vue";
import LMenuLeftAssets from "@selldone/page-builder/src/menu/left/assets/LMenuLeftAssets.vue";
import LMenuLeftStatistics from "@selldone/page-builder/src/menu/left/statistics/LMenuLeftStatistics.vue";
import LMenuLeftSort from "@selldone/page-builder/src/menu/left/sort/LMenuLeftSort.vue";
import LMenuLeftPopupAppearance from "@selldone/page-builder/src/menu/left/popup/LMenuLeftPopupAppearance.vue";
import LMenuLeftPopupFilter from "@selldone/page-builder/src/menu/left/popup/LMenuLeftPopupFilter.vue";

export default defineComponent({
  name: "LMenuLeft",
  components: {
    LMenuLeftPopupFilter,
    LMenuLeftPopupAppearance,
    LMenuLeftSort,
    LMenuLeftStatistics,
    LMenuLeftAssets,
    LMenuLeftCss,
    LMenuLeftSeo,
    LMenuLeftSetting,
    LMenuLeftVersions,
    LMenuLeftSections,
    LMenuLeftHierarchy,
    LMenuLeftElements,
  },
  inject: ["$builder", "$shop"],
  props: {
    isVisible: Boolean,
    isScrollDown: Boolean,
    histories: { required: true, type: Array },
    setPageFunction: { required: true, type: Function },
    fetchPageData: { required: true, type: Function },
  },

  data: () => ({
    tab: "sections",

    is_dragged: false,
  }),

  computed: {
    model() {
      return this.$builder.model;
    },
    is_page() {
      return this.$builder.isPage();
    },
    is_popup() {
      return this.$builder.isPopup();
    },
    is_menu() {
      return this.$builder.isMenu();
    },

    tabs() {
      const out = [
        {
          key: "navigation",
          icon: "account_tree",
          tooltip: this.$t("page_builder.design.tools.hierarchy"),
        },
        { key: "sort", icon: "view_day", tooltip: "Sort" },

        { key: "sections", icon: "grid_view", tooltip: "Sections" },
        { key: "elements", icon: "yard", tooltip: "Elements" },
        { key: "versions", icon: "history", tooltip: "Versions" },
      ];

      if (this.is_page) {
        out.push({ key: "assets", icon: "folder_open", tooltip: "Assets" });
      }

      return out;
    },

    width() {
      return this.$vuetify.display.xlAndUp
        ? 320
        : this.$vuetify.display.lgAndUp
          ? 300
          : 240;
    },
    min_width_window() {
      return this.width - 58;
    },
  },

  methods: {
    toggle(tab) {
      this.tab = this.tab === tab ? null : tab;
    },
  },
});
</script>

<style scoped lang="scss">
.l--page-editor-side-menu {
  display: flex;
  position: fixed;

  z-index: 999;
  text-align: start;

  top: 74px;
  left: 24px;
  bottom: 24px;

  border-radius: 14px;

  .l-buttons {
    display: flex;
    flex-direction: column;
    padding: 4px 0;
    border-right: solid thin #000;
  }

  .l-window {
    flex-grow: 1;
    transition: all 0.4s;
  }

  transition: all 0.2s ease-in-out;
  opacity: 0;
  transform: translateX(-200px);

  &.is-visible {
    opacity: 1;
    transform: translateX(0);
  }

  @media only screen and (max-width: 2100px) {
    // Ultra-wide mode
    top: 220px;

    &.-dragged {
      // Hide on dragged
      transform: translateX(-100%);
    }

    &.-scroll-down {
      top: 24px;
    }
  }

  .-group {
    .-group-body {
      max-width: 160px;

      .-item-element {
        position: relative;
        cursor: pointer;
        user-select: none;

        .-item-image {
          height: 24px;
          margin: 2px;
          pointer-events: none;
        }

        transition: all 0.35s !important;

        &:hover {
          box-shadow: 0px 10px 50px 0px rgba(0, 0, 0, 0.2);
        }
      }
    }

    .-group-header {
      margin-top: 0.6rem;

      font-size: 0.7em;
      text-transform: uppercase;
      margin-bottom: 4px;
      font-weight: 800;
      display: block;
    }
  }
}
</style>
