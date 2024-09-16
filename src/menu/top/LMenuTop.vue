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
  <v-sheet v-bind="$attrs" color="#1e1e1e">
    <div style="max-width: 1720px; margin: auto" class="mb-2">
      <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Tabs ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

      <v-tabs v-model="tab" align-tabs="start" density="compact" class="mb-2">
        <v-tab value="home" color="#fff" class="tnt">
          <v-icon class="me-1" size="small">home</v-icon>
          {{ $t("global.commons.home") }}
        </v-tab>
        <v-tab value="page" color="#fff" class="tnt">
          <v-icon class="me-1" size="small">edit_document</v-icon>
          {{ $t("global.commons.page") }}
        </v-tab>

        <v-tab value="export" color="#fff" class="tnt">
          <v-icon class="me-1" size="small">fa:fas fa-file-export</v-icon>
          {{ $t("global.commons.export") }}
        </v-tab>

        <v-tab value="import" color="#fff" class="tnt">
          <v-icon class="me-1" size="small">fa:fas fa-file-import</v-icon>
          {{ $t("global.commons.import") }}
        </v-tab>

        <!-- ▃▃▃▃▃▃▃▃▃▃ AI ▃▃▃▃▃▃▃▃▃▃ -->

        <l-menu-top-ai v-if="!demo" class="ms-2"></l-menu-top-ai>
      </v-tabs>

      <v-sheet
        color="#111"
        rounded="xl"
        height="100"
        class="overflow-hidden"
        elevation="3"
      >
        <v-window v-model="tab">
          <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ home ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

          <v-window-item value="home">
            <l-menu-top-home
              :busySave="busySave"
              :page="page"
              has-ai-button
              :demo="demo"
              @click:save="
                () => {
                  saveFunction($builder.export());
                }
              "
              :ai-page-generate-function="aiPageGenerateFunction"
            >
            </l-menu-top-home>
          </v-window-item>

          <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ page ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
          <v-window-item value="page">
            <l-menu-top-page :page="page"></l-menu-top-page>
          </v-window-item>

          <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ export ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
          <v-window-item value="export">
            <l-menu-top-export :page="page"></l-menu-top-export>
          </v-window-item>

          <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ import ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
          <v-window-item value="import">
            <l-menu-top-import :page="page"></l-menu-top-import>
          </v-window-item>
        </v-window>
      </v-sheet>
    </div>
  </v-sheet>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import LMenuTopHome from "@selldone/page-builder/src/menu/top/home/LMenuTopHome.vue";
import LMenuTopExport from "@selldone/page-builder/src/menu/top/export/LMenuTopExport.vue";
import LMenuTopPage from "@selldone/page-builder/src/menu/top/page/LMenuTopPage.vue";
import LMenuTopImport from "@selldone/page-builder/src/menu/top/import/LMenuTopImport.vue";
import LMenuTopAi from "@selldone/page-builder/src/menu/top/ai/LMenuTopAi.vue";

export default defineComponent({
  name: "LMenuTop",
  components: {
    LMenuTopAi,
    LMenuTopImport,
    LMenuTopPage,
    LMenuTopExport,
    LMenuTopHome,
  },
  inject: ["$builder", "$shop"],
  props: {
    saveFunction: {
      require: true,
    },
    busySave: {
      type: Boolean,
      default: false,
    },
    aiPageGenerateFunction: {
      require: false,
      type: Function,
    },
    demo: Boolean,
  },

  data: () => ({
    tab: "home",
  }),

  computed: {
    page() {
      return this.$builder.model;
    },

    is_page() {
      return this.$builder.isPage();
    },

    is_menu() {
      return this.$builder.isMenu();
    },
  },

  methods: {},
});
</script>

<style lang="scss">
/**
Used in nested components!
 */
.l--menu-top-tools {
  display: flex;
  align-items: stretch;
  justify-content: start;
  min-height: 100px;
  text-align: start;

  ::v-deep(.v-divider) {
    border-color: #fff !important;
    opacity: 0.3;
    margin: 0 4px;
  }

  .down-bar-btn {
    position: relative;

    &:after {
      content: " ";
      background: #eee;
      position: absolute;
      bottom: 2px;
      left: 8px;
      right: 8px;
      height: 3px;
      border-radius: 2px;
    }

    &.-active {
      &:after {
        background: #ffa000;
      }
    }

    button {
      min-height: 100% !important;
    }
  }

  .info-item {
    font-size: 0.8rem;
    margin: 3px 6px !important;
    text-align: left;
    direction: ltr;
    color: #fff;

    b {
      text-transform: uppercase;
      padding-right: 4px;
    }
  }

  .lmt-group {
    padding: 4px;
  }
}
</style>
