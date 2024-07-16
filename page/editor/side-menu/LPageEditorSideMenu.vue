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
    class="l--page-editor-side-menu no-inv overflow-hidden"
    :class="{
      'is-visible': isVisible,
      '-scroll-down': isScrollDown,
      '-dragged': is_dragged,
      '-small': $vuetify.display.xs,
    }"
    :width="!tab ? 58 : width"
    v-if="page"
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
      <l-page-editor-css :page="page" />


      <!-- ━━━━━━━━━━━━━━━ Statistic ━━━━━━━━━━━━━━━ -->
      <l-page-editor-statistics
        :page="page"
      ></l-page-editor-statistics>


      <!-- ━━━━━━━━━━━━━━━ SEO ━━━━━━━━━━━━━━━ -->
      <l-page-editor-seo v-if="hasSEO" :page="page" />

      <!-- ━━━━━━━━━━━━━━━ Settings ━━━━━━━━━━━━━━━ -->

      <l-page-editor-setting
        v-if="hasSetting"
        v-model:cluster-id="page.cluster_id"
        v-model:color="page.color"
        v-model:direction="page.direction"
        v-model:name="page.name"
        v-model:note="page.note"
        :is-official-page="!shop"
        :page="page"
        :shop="shop"
      ></l-page-editor-setting>
    </div>

    <div class="l-window overflow-auto thin-scroll">
      <v-tabs-window :model-value="tab">
        <!-- ━━━━━━━━━━━━━━━ Navigation ━━━━━━━━━━━━━━━ -->

        <v-tabs-window-item
          value="navigation"
          eager
          :style="{ width: min_width_window + 'px' }"
        >
          <l-settings-hierarchy :builder="builder"></l-settings-hierarchy>
        </v-tabs-window-item>

        <!-- ━━━━━━━━━━━━━━━ Sections ━━━━━━━━━━━━━━━ -->

        <v-tabs-window-item
          value="sections"
          eager
          :style="{ width: min_width_window + 'px' }"
        >
          <l-page-editor-components-menu
            :builder="builder"
            @update:is-dragged="(val) => (is_dragged = val)"
          ></l-page-editor-components-menu>
        </v-tabs-window-item>
        <!-- ━━━━━━━━━━━━━━━ Elements ━━━━━━━━━━━━━━━ -->
        <v-tabs-window-item
          value="elements"
          eager
          :style="{ width: min_width_window + 'px' }"
        >
          <LPageEditorElementsMenu
            :builder="builder"
            @update:is-dragged="(val) => (is_dragged = val)"
          ></LPageEditorElementsMenu>
        </v-tabs-window-item>

        <!-- ━━━━━━━━━━━━━━━ Versions ━━━━━━━━━━━━━━━ -->
        <v-tabs-window-item
          value="versions"
          eager
          :style="{ width: min_width_window + 'px' }"
        >
          <l-page-editor-versions-menu
            :builder="builder"
            :histories="histories"
            :setPageFunction="setPageFunction"
            :fetchPageData="fetchPageData"
            :page="page"
          ></l-page-editor-versions-menu>
        </v-tabs-window-item>

        <!-- ━━━━━━━━━━━━━━━ Assets ━━━━━━━━━━━━━━━ -->
        <v-tabs-window-item
          value="assets"
          :style="{ width: min_width_window + 'px' }"
        >
          <l-page-editor-files v-if="page" :page="page" />
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
  </v-sheet>
</template>

<script>
import { defineComponent, inject } from "vue";
import LSettingsHierarchy from "@selldone/page-builder/settings/hierarchy/LSettingsHierarchy.vue";
import LPageEditorComponentsMenu from "@selldone/page-builder/page/editor/components-menu/LPageEditorComponentsMenu.vue";
import LPageEditorElementsMenu from "@selldone/page-builder/page/editor/elements-menu/LPageEditorElementsMenu.vue";
import LPageEditorVersionsMenu from "@selldone/page-builder/page/editor/versions-menu/LPageEditorVersionsMenu.vue";
import LPageEditorSetting from "@selldone/page-builder/page/editor/setting/LPageEditorSetting.vue";
import LPageEditorSeo from "@selldone/page-builder/page/editor/seo/LPageEditorSeo.vue";
import LPageEditorCss from "@selldone/page-builder/page/editor/css/LPageEditorCss.vue";
import LPageEditorFiles from "@selldone/page-builder/page/editor/files/LPageEditorFiles.vue";
import LPageEditorStatistics from "@selldone/page-builder/page/editor/statistics/LPageEditorStatistics.vue";

export default defineComponent({
  name: "LPageEditorSideMenu",
  components: {
    LPageEditorStatistics,
    LPageEditorFiles,
    LPageEditorCss,
    LPageEditorSeo,
    LPageEditorSetting,
    LPageEditorVersionsMenu,
    LPageEditorComponentsMenu,
    LSettingsHierarchy,
    LPageEditorElementsMenu,
  },

  props: {
    isVisible: Boolean,
    isScrollDown: Boolean,
    histories: { required: true, type: Array },
    setPageFunction: { required: true, type: Function },
    fetchPageData: { required: true, type: Function },
    page: {},
    shop: {},
  },

  data: () => ({
    tab: "sections",

    is_dragged: false,
  }),

  computed: {
    tabs() {
      return [
        {
          key: "navigation",
          icon: "account_tree",
          tooltip: this.$t("page_builder.design.tools.hierarchy"),
        },
        { key: "sections", icon: "grid_view", tooltip: "Sections" },
        { key: "elements", icon: "yard", tooltip: "Elements" },
        { key: "versions", icon: "history", tooltip: "Versions" },
        { key: "assets", icon: "folder_open", tooltip: "Assets" },
      ];
    },
    builder() {
      // Get builder from main page editor/viewer
      return inject("$builder");
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
    hasSetting() {
      return this.page && this.page.id;
    },
    hasSEO() {
      return this.page && this.page.id;
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
