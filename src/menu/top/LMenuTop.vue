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
  <v-sheet color="#1e1e1e">
    <div class="d-flex align-center">
      <v-btn
        :prepend-icon="$t('icons.arrow_back')"
        :to="backTo"
        class="tnt me-2"
        variant="text"
        size="small"
      >
        {{ $t("global.actions.back") }}
      </v-btn>

      <!-- Shop -->

      <a
        :href="getShopMainUrl(shop)"
        :title="`Open ${shop.title} home page ➡`"
        target="_blank"
      >
        <v-avatar
          v-if="shop.icon"
          class="avatar-gradient -thin -shop"
          size="24"
        >
          <v-img :src="getShopImagePath(shop.icon, 64)" />
        </v-avatar>
      </a>

      <img
        class="mx-2"
        src="../../../../components-vue/assets/icons/wire-w.svg"
        width="12"
      />

      <!-- Page -->

      <a
        :class="{ 'disabled-view': !page.published }"
        :href="page_view_url"
        :title="`Open this landing page ➡`"
        target="_blank"
      >
        <v-avatar
          :color="SaminColorDarkDeep"
          class="avatar-gradient -thin -blue"
          size="24"
        >
          <v-img :src="getShopImagePath(page.image, 256, page.id)" />
          <!-- Only 64 & 256 exist for page cover -->
        </v-avatar>
      </a>

      <v-btn
        :title="
          (page.published
            ? $t('global.commons.published')
            : $t('global.commons.draft')) +
          ` - You should save to apply changes!`
        "
        class="mx-1 tnt"
        size="small"
        variant="text"
        @click="page.published = !page.published"
      >
        <v-icon :color="page.published ? '#fff' : 'red'" size="small" start>
          {{ page.published ? "visibility" : "visibility_off" }}
        </v-icon>
        {{
          page.published
            ? $t("global.commons.published")
            : $t("global.commons.draft")
        }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :href="page_view_url"
        class="tnt fadeIn delay_200"
        size="small"
        target="_blank"
        variant="text"
        append-icon="open_in_new"
        title=" View Public Page"
      >
        {{ page.title }}
      </v-btn>
    </div>

    <div style="max-width: 1740px; margin: auto" class="mb-2">

      <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Tabs ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

      <v-tabs v-model="tab" align-tabs="start" density="compact" class="mb-2">
        <v-tab value="home" color="#fff" class="tnt">
          <v-icon class="me-1" size="small">home</v-icon>
          Home
        </v-tab>
        <v-tab value="page" color="#fff" class="tnt">
          <v-icon class="me-1" size="small">edit_document</v-icon>
          Page
        </v-tab>

        <v-tab value="export" color="#fff" class="tnt">
          <v-icon class="me-1" size="small">fa:fas fa-file-export</v-icon>
          Export
        </v-tab>

        <v-tab value="import" color="#fff" class="tnt">
          <v-icon class="me-1" size="small">fa:fas fa-file-import</v-icon>
          Import
        </v-tab>
      </v-tabs>

      <v-sheet color="#111" rounded="xl" height="100" class="overflow-hidden">
        <v-window v-model="tab">

          <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ home ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

          <v-window-item
            value="home"
          >
            <l-menu-top-home
              :busySave="busySave"
              :page="page"
              :shop="shop"
              has-ai-button
              :demo="demo"
              @click:save="
                () => {
                  saveFunction();
                }
              "
              :liveStream="liveStream"
              :audiences="audiences"
            >
            </l-menu-top-home>
          </v-window-item>


          <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ page ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
          <v-window-item value="page">
            <l-menu-top-page :shop="shop" :page="page">
            </l-menu-top-page>
          </v-window-item>

          <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ export ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
          <v-window-item value="export">
            <l-menu-top-export :shop="shop" :page="page">
            </l-menu-top-export>
          </v-window-item>

          <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ import ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
          <v-window-item value="import">
            <l-menu-top-import :shop="shop" :page="page">
            </l-menu-top-import>
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

export default defineComponent({
  name: "LMenuTop",
  components: {LMenuTopImport, LMenuTopPage, LMenuTopExport, LMenuTopHome },
  props: {
    /**
     * Back route
     */
    backTo: { required: true },
    shop: { required: true },
    page: { required: true },
    audiences: {},
    liveStream: {},

    saveFunction: {
      require: true,
    },
    demo: Boolean,
    busySave: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    tab: "home",
  }),

  computed: {
    page_view_url() {
      if (this.shop)
        return this.getShopMainUrl(this.shop) + `/pages/${this.page.name}`;
      return null;
      // return `/@${this.shop.name}/pages/${this.page.name}`;
    },
  },

  methods: {},
});
</script>

<style lang="scss">
.l--menu-top-tools {
  display: flex;
  align-items: stretch;
  justify-content: start;
  min-height: 100px;
  text-align:start;

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

  .lmt-group{
    padding: 4px;
  }

}

</style>
