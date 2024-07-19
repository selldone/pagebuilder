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
    <div class="d-flex align-center">
      <v-sheet elevation="3" rounded="lg" color="#000" class="ma-1 pa-1">
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
            class="avatar-gradient -thin -shop hover-scale-small"
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
            class="avatar-gradient -thin -blue hover-scale-small"
            size="24"
          >
            <v-img :src="getShopImagePath(page.image, 256, page.id)" />
            <!-- Only 64 & 256 exist for page cover -->
          </v-avatar>
        </a>

        <v-icon class="ms-2 d-none d-md-inline-block">drag_indicator</v-icon>

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
      </v-sheet>

      <v-spacer class="mx-1"></v-spacer>

      <v-sheet elevation="3" rounded="lg" color="#000" class="ma-1 pa-1">

        <v-btn
            v-if="hasLiveView"
            class="tnt fadeIn delay_400"
            size="small"

            :to="{
        name: 'BPageLandingLive',
        params: { shop_id: page.shop_id, page_id: page.id },
        query: { responsible: true },
      }"
            target="_blank"
            :variant="audiences?.length?'elevated':'text'"
            :color="audiences?.length?'primary':undefined"
            @click="$builder.livestream.setEnable(true) /*Enable live stream*/"

        >
          Live Preview

          <u-dense-circles-users
              :ids="audiences"
              :limit="5"
              :size="20"
              class="pa-0 overflow-visible ms-2 fadeIn delay_300"
              color="#FFC107"
              title="Online team members are viewing this page."
          ></u-dense-circles-users>

        </v-btn>


        <span class="mx-1 d-none d-md-inline-block">|</span>



        <v-btn
          :href="page_view_url"
          class="tnt fadeIn delay_200"
          size="small"
          target="_blank"
          variant="text"
          append-icon="open_in_new"
          title="View Public Page"
        >
          {{ page.title }}
        </v-btn>

        <span class="mx-1 d-none d-md-inline-block">|</span>

        <v-chip
          v-if="USER()"
          class="mx-2"
          variant="outlined"
          size="small"
          :prepend-avatar="getUserAvatar(USER().id)"
        >
          {{ USER().name }}
        </v-chip>
        <v-chip
          v-else
          class="mx-2"
          variant="outlined"
          size="small"
          prepend-icon="account_circle"
        >
          Guest
        </v-chip>
      </v-sheet>
    </div>

    <div style="max-width: 1720px; margin: auto" class="mb-2">
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

        <!-- ▃▃▃▃▃▃▃▃▃▃ AI ▃▃▃▃▃▃▃▃▃▃ -->

        <u-button-ai-small
          v-if="!demo"
          :tooltip="null"
          @click="show_prompt = true"
          size="36"
          class="ms-2"
        >
          <v-tooltip
            activator="parent"
            content-class="text-start small pa-3 bg-black"
            location="bottom"
            max-width="420"
            :open-delay="500"
          >
            <b class="d-block"> AI Assistance </b>
            Utilize this tool to configure prompts, AI models, and plugins,
            enabling the automatic generation of text, images, and sections with
            the help of your AI assistant.
            <ol class="my-1">
              <li>Enter page prompt.</li>
              <li>
                Set custom prompt by adding
                <span style="font-size: 1.3em">🆕</span> or
                <code>prompt:</code> to fields. (optional)
              </li>
              <li>
                Click on the
                <img
                  :height="24"
                  :width="24"
                  class="mx-1"
                  src="../../../../components-vue/assets/icons/ci-logo.png"
                />left side of the section.
              </li>
            </ol>
          </v-tooltip>
        </u-button-ai-small>
      </v-tabs>

      <v-sheet color="#111" rounded="xl" height="100" class="overflow-hidden">
        <v-window v-model="tab">
          <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ home ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

          <v-window-item value="home">
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
            >
            </l-menu-top-home>
          </v-window-item>

          <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ page ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
          <v-window-item value="page">
            <l-menu-top-page :shop="shop" :page="page"></l-menu-top-page>
          </v-window-item>

          <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ export ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
          <v-window-item value="export">
            <l-menu-top-export :shop="shop" :page="page"></l-menu-top-export>
          </v-window-item>

          <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ import ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
          <v-window-item value="import">
            <l-menu-top-import :shop="shop" :page="page"></l-menu-top-import>
          </v-window-item>
        </v-window>
      </v-sheet>
    </div>
  </v-sheet>

  <v-bottom-sheet
    v-model="show_prompt"
    max-width="1420"
    content-class="rounded-t-xl"
  >
    <v-card rounded="t-xl">
      <v-card-text>
        <div class="pa-3 pa-sm-5">
          <div class="d-flex">
            <v-spacer></v-spacer>
            <b-ai-model-input
              v-model="ai_model"
              class="max-w-300"
              hide-details
              label="label"
              variant="outlined"
            >
            </b-ai-model-input>
          </div>

          <v-textarea
            v-model="prompt"
            :counter="512"
            :rows="2"
            :rules="[GlobalRules.counter(512)]"
            auto-grow
            class="mt-3"
            hide-details
            label="Prompt"
            persistent-placeholder
            placeholder="Write short about this page..."
            style="font-size: 1.2em; font-weight: 600"
            variant="underlined"
          >
          </v-textarea>

          <u-smart-suggestion
            :samples="prompt_samples"
            class="mt-2 mb-4"
            @select="(v) => (prompt = v)"
          >
          </u-smart-suggestion>

          <ol class="my-3 text-start">
            <li>
              Write a prompt describing the page you want to create. What is the
              purpose of this page, and what does your brand represent?
            </li>
            <li>
              Click on the AI button on the left side of each section, and we
              will automatically generate content and replace the existing text.
            </li>
            <li>
              To customize each prompt of the fields in the sections, use the
              following pattern: <code>prompt: write your prompt...</code> or
              <code>🆕write your prompt...</code>.
            </li>
          </ol>

          <div v-if="false" class="widget-buttons mb-3">
            <v-btn
              :loading="auto_generate_busy"
              size="x-large"
              variant="outlined"
              @click="autoGenerate"
            >
              Auto Generate Page
            </v-btn>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="show_prompt = false">
            <v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import LMenuTopHome from "@selldone/page-builder/src/menu/top/home/LMenuTopHome.vue";
import LMenuTopExport from "@selldone/page-builder/src/menu/top/export/LMenuTopExport.vue";
import LMenuTopPage from "@selldone/page-builder/src/menu/top/page/LMenuTopPage.vue";
import LMenuTopImport from "@selldone/page-builder/src/menu/top/import/LMenuTopImport.vue";
import UButtonAiSmall from "@selldone/components-vue/ui/button/ai/small/UButtonAiSmall.vue";
import UDenseCirclesUsers from "@selldone/components-vue/ui/dense-circles/users/UDenseCirclesUsers.vue";

export default defineComponent({
  name: "LMenuTop",
  components: {
    LMenuTopImport,
    LMenuTopPage,
    LMenuTopExport,
    LMenuTopHome,
    UButtonAiSmall,
    UDenseCirclesUsers
  },
  inject: ["$builder"],
  props: {
    /**
     * Back route
     */
    backTo: { required: true },
    shop: { required: true },
    page: { required: true },

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

    //-----------------------

    show_prompt: false,
    prompt: null,
    prompt_samples: [],

    auto_generate_busy: false,
  }),

  computed: {
    page_view_url() {
      if (this.shop)
        return this.getShopMainUrl(this.shop) + `/pages/${this.page.name}`;
      return null;
      // return `/@${this.shop.name}/pages/${this.page.name}`;
    },
    hasLiveView() {
      return this.page?.id && this.page.shop_id;
    },
    audiences() {
      return this.$builder.livestream.audiences;
    },


  },

  methods: {
    autoGenerate() {
      // Require prompt:
      if (!this.prompt) {
        this.show_prompt = true;
        this.showWarningAlert(
          "Enter Prompt Please",
          "Kindly set a prompt for the page before proceeding.",
        );
        return;
      }

      // ┣━━━━━━━━━━━━━━━━━━━━━━━━━━ AI / Auto generate page  ━━━━━━━━━━━━━━━━━━━━━━━━━━┫
      console.log("🆎 AI / Auto generate page.");
      let url = null;
      if (this.shop)
        url = window.API.POST_AI_PAGE_BUILDER_AUTO_GENERATE(
          this.shop.id,
          this.page.id,
        );
      else if (this.isOfficialPage)
        url = window.ADMIN_API.POST_ADMIN_AI_PAGE_BUILDER_AUTO_GENERATE(
          this.page.id,
        );
      else return;

      this.auto_generate_busy = true;

      axios
        .post(url)
        .then(({ data }) => {
          if (data.error) {
            this.showErrorAlert(null, data.error_msg);
          } else {
            this.$refs.vueBuilder.setPage(
              data.page.content,
              data.page.css,
              false,
            );

            this.showSuccessAlert(
              "Build completed",
              "Page successfully auto created and loaded.",
            );
          }
        })
        .catch((error) => {
          this.showLaravelError(error);
        })
        .finally(() => {
          this.auto_generate_busy = false;
        });
    },




  },
});
</script>

<style lang="scss">
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
