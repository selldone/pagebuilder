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

<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-fade-transition>
    <div
      v-if="show_loading"
      class="center-fix loading-view-rect-center s--shadow-with-padding rounded-xl"
      style="z-index: 99999"
    >
      <v-progress-circular :color="SaminColorLight" :size="50" indeterminate />
      <p class="mt-2">
        {{ $t("page_builder.waiting_fetch") }}
      </p>
    </div>
  </v-fade-transition>

  <div v-bind="$attrs" class="blur-animate" :class="{ blurred: show_loading }">
    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Top Tools ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <l-page-editor-top-menu
      v-if="(page || demoPage) && inEditMode && $refs.vueBuilder"
      :busySave="busy_save"
      :histories="histories"
      :inDesignTab="in_desig_tab"
      :page="demoPage ? demoPage : page"
      :pageBuilder="$refs.vueBuilder"
      :shop="shop"
      :has-shop-menu="!!shop"
      has-ai-button
      history
      :demo="demo"
      style="border-radius: 26px 26px 0 0"
      @click:save="onSave"
      @click:history="history_dialog = true"
      @click:auto-generate="autoGenerate"
      @click:prompt="show_prompt = !show_prompt"
      :hasClose="hasClose"
      @click:close="$emit('click:close')"
    >
    </l-page-editor-top-menu>
    <v-sheet
      v-else-if="page || show_loading"
      height="64"
      style="border-radius: 26px 26px 0 0"
    ></v-sheet>

    <v-expand-transition>
      <div v-if="show_prompt" class="pa-3 pa-sm-5">
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
            Click on the AI button on the left side of each section, and we will
            automatically generate content and replace the existing text.
          </li>
          <li>
            To customize each prompt of the fields in the sections, use the
            following pattern: <code>prompt: write your prompt...</code> or
            <code>🆕write your prompt...</code>.
          </li>
        </ol>

        <div class="widget-buttons mb-3">
          <v-btn
            v-if="false"
            :loading="auto_generate_busy"
            size="x-large"
            variant="outlined"
            @click="autoGenerate"
          >
            Auto Generate Page
          </v-btn>

          <v-btn color="primary" size="x-large" @click="show_prompt = false">
            <v-icon class="me-1">check</v-icon>
            {{ $t("global.actions.done") }}
          </v-btn>
        </div>
      </div>
    </v-expand-transition>
    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Design ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

    <LPageEditor
      v-show="tab === 'design'"
      ref="vueBuilder"
      :ai-auto-fill-function="aiAutoFillFunction"
      :page="demoPage ? demoPage : page"
      :demo="demo"
      :initial-page-data="demoPage"
      :shop="shop"
      :showIntro="(page_id === 'new' || isNew) && !page /*Not created yet!*/"
      @changeMode="(val) => (inEditMode = val)"
      @saved="onSave"
      @scale="
        (val) => {
          scale = val;
          $emit('scale', val);
        }
      "
      @load:template="onSetPageBySelectTemplate"
      @update:preview="(_page) => $emit('update:preview', _page)"
    >
      <template v-slot:header="{ builder }">
        <slot name="header" :builder="builder"></slot>
      </template>
    </LPageEditor>
  </div>

  <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Setting ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

  <l-page-editor-setting
    v-if="page && !demo"
    v-show="tab === 'setting'"
    v-model:cluster-id="page.cluster_id"
    v-model:color="page.color"
    v-model:direction="page.direction"
    v-model:name="page.name"
    v-model:note="page.note"
    :is-official-page="isOfficialPage"
    :page="page"
    :shop="shop"
  ></l-page-editor-setting>

  <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ SEO ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
  <l-page-editor-seo v-if="page && !demo" v-show="tab === 'seo'" :page="page" />

  <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ CSS ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
  <l-page-editor-css v-if="page" v-show="tab === 'css'" :page="page" />

  <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Statistic ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

  <l-page-editor-statistics
    v-if="page && tab === 'behavior' && !demo"
    :page="page"
  ></l-page-editor-statistics>

  <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Assets ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
  <l-page-editor-files
    v-if="page?.id && tab === 'files' && !demo"
    :page="page"
  />

  <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ History ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
  <v-bottom-sheet
    v-if="page && !demo"
    v-model="history_dialog"
    content-class="rounded-t-xl"
    max-width="98vw"
    width="840px"
    scrollable
  >
    <v-card class="position-relative rounded-t-xl" rounded="0">
      <v-progress-linear
        v-if="busy_fetch"
        class="loader-to-bar"
        indeterminate
      ></v-progress-linear>
      <v-card-title>
        <p class="ma-auto dialog-title text-start">
          <v-icon class="me-2" color="#111">history</v-icon>
          {{ $t("page_builder.history.title") }}
        </p>
      </v-card-title>

      <v-card-text>
        <v-list class="text-start border-between-vertical" density="compact">
          <v-list-item
            class="-h-item"
            lines="two"
            prepend-icon="settings_backup_restore"
            ripple
            @click="fetchPageData()"
          >
            <v-list-item-title> Restore last saved page</v-list-item-title>
            <v-list-item-subtitle class="op-1-0"
              >{{ getFromNowString(page.updated_at) }}
            </v-list-item-subtitle>
          </v-list-item>

          <v-list-item
            v-for="history in histories"
            :key="history.id"
            class="-h-item"
            lines="two"
            ripple
            @click="getHistory(history.id)"
          >
            <template v-slot:prepend>
              <v-icon
                :color="current_history_id === history.id ? 'primary' : '#111'"
                >{{
                  current_history_id === history.id
                    ? "circle"
                    : "panorama_fish_eye"
                }}
              </v-icon>
            </template>

            <v-list-item-title>
              {{ getLocalTimeString(history.created_at) }}
            </v-list-item-title>
            <v-list-item-subtitle class="op-1-0">
              <v-avatar
                v-if="history.user_id"
                :size="28"
                class="avatar-gradient -thin -user me-2 hover-scale"
              >
                <v-img :src="getUserAvatar(history.user_id)" />
              </v-avatar>

              {{ getFromNowString(history.created_at) }}
            </v-list-item-subtitle>

            <template v-slot:append>
              <v-list-item-action end>
                <small>{{
                  history.persistent ? "persistent" : "temporary"
                }}</small>
                <v-btn
                  icon
                  variant="text"
                  @click="togglePersistent(history)"
                  @click.stop
                >
                  <v-icon v-if="history.persistent" color="yellow-darken-2">
                    star
                  </v-icon>
                  <v-icon v-else color="grey-lighten-1">star_border</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import LPageEditorSeo from "./page/editor/seo/LPageEditorSeo.vue";
import LPageEditorSetting from "./page/editor/setting/LPageEditorSetting.vue";

import LPageEditorStatistics from "./page/editor/statistics/LPageEditorStatistics.vue";
import { standardDesignColor } from "@selldone/core-js/helper/color/ColorGenerator";
import LPageEditorTopMenu from "./page/editor/top-menu/LPageEditorTopMenu.vue";
import LPageEditorFiles from "./page/editor/files/LPageEditorFiles.vue";
import BAiModelInput from "@selldone/components-vue/backoffice/ai/model/input/BAiModelInput.vue";

import USmartSuggestion from "@selldone/components-vue/ui/smart/suggestion/USmartSuggestion.vue";
import { LMixinEvents } from "./mixins/events/LMixinEvents";
import LPageEditor from "./page/editor/LPageEditor.vue";
import { StorefrontSDK } from "@selldone/sdk-storefront/StorefrontSDK";
import LPageEditorCss from "@selldone/page-builder/page/editor/css/LPageEditorCss.vue";

/**
 * <landing-builder>
 */
export default {
  name: "LandingBuilder",
  mixins: [LMixinEvents],

  components: {
    LPageEditorCss,
    LPageEditor,
    USmartSuggestion,
    BAiModelInput,
    LPageEditorFiles,
    LPageEditorTopMenu,

    LPageEditorStatistics,
    LPageEditorSetting,
    LPageEditorSeo,
  },
  emits: [
    "update:page",
    "update:externalTab",
    "update",
    "create",
    "scale",
    "update:preview",
  ],
  props: {
    shop: {
      required: false,
      type: Object,
    },

    isOfficialPage: {
      required: false,
      type: Boolean,
      default: false,
    },
    externalTab: {},
    hideToolbar: {
      default: false,
      type: Boolean,
    },

    isNew: {
      type: Boolean,
      default: false,
    },
    demo: Boolean,
    hasClose: Boolean, // External close! like when open in th dialog
    demoPage: null,
  },

  data: () => ({
    // showLoading: true,

    tab: "design",
    inEditMode: false, // Set after page builder initialize! important in access by $refs!

    page: null,

    history_dialog: false,
    histories: [],

    busy_save: false,

    busy_fetch: false,

    //-----------------------

    show_prompt: false,
    prompt: null,
    prompt_samples: [],
    //-----------------------
    current_history_id: null,

    //-----------------------
    dialog_master_style: false,
    colors: standardDesignColor,

    //-----------------------
    show_edit_style: false,
    selected_section_style: null,

    scale: false,

    //------------------------
    auto_generate_busy: false,

    //------------------------
    ai_model: "chatgpt",
  }),
  computed: {
    show_loading() {
      return (this.inPageEditMode && !this.page) || this.busy_fetch;
    },
    page_id() {
      // First check route param then feed by prop:
      return this.$route.params.page_id;
    },

    in_desig_tab() {
      return this.tab === "design";
    },

    inPageEditMode() {
      return (
        (this.page && this.page.id) ||
        (this.$route.params.hasOwnProperty("page_id") &&
          this.page_id &&
          this.page_id !== "new")
      );
    },
  },

  watch: {
    page(page) {
      this.$emit("update:page", page);
    },
    tab(tab) {
      this.$emit("update:externalTab", tab);

      if(tab === 'design' && this.page) this.page.css=Object.assign({},this.page.css); // Force update CSS and inject it!
    },
    externalTab(tab) {
      this.tab = tab;
    },
    page_id() {
      this.fetchPageData();
    },
  },

  created() {
    if (this.demo) {
      return;
    }

    if (this.inPageEditMode) {
      this.fetchPageData();
    }

    if (this.externalTab) this.tab = this.externalTab;
  },
  mounted() {
    if (this.demo) {
      if (this.demoPage) {
        // this.page=this.demoPage;
        this.$refs.vueBuilder.setPage(this.demoPage.content,this.demoPage.css,false); // Force to update all page after first creation!
      }

      // Simulate current active shop:
      this.$store.commit("setCurrentAdminShop", this.shop);
      StorefrontSDK.Setup(this.shop.name);
      this.$forceUpdate(); // Important to update $refs.vueBuilder!
    }
  },
  beforeUnmount() {},
  methods: {
    getHistory(history_id) {
      this.busy_fetch = true;
      this.current_history_id = history_id;

      let url = null;
      if (this.shop)
        url = window.API.GET_PAGE_HISTORY(
          this.$route.params.shop_id,
          this.page_id,
          history_id,
        );
      else if (this.isOfficialPage)
        url = window.ADMIN_API.GET_PAGE_HISTORY(this.page_id, history_id);
      else return;

      axios
        .get(url)
        .then(({ data }) => {
          if (data.error) {
            this.showErrorAlert(null, data.error_msg);
          } else {
            this.$refs.vueBuilder.setPage(data.content,data.css,false);
            this.loadPageData();

            this.showSuccessAlert(
              "Fetch completed",
              "Page successfully loaded from history.", //صفحه ذخیره شده از تاریخچه لود شد.
            );
          }
        })
        .finally(() => {
          this.busy_fetch = false;
        });
    },

    togglePersistent(history) {
      let t = this;

      let url = null;
      if (this.shop)
        url = window.API.PUT_SET_HISTORY_PERSISTENT(
          this.$route.params.shop_id,
          this.page_id,
          history.id,
        );
      else if (this.isOfficialPage)
        url = window.ADMIN_API.PUT_SET_HISTORY_PERSISTENT(
          this.page_id,
          history.id,
        );
      else return;

      axios
        .put(url, {
          persistent: !history.persistent,
        })
        .then(({ data }) => {
          if (data.error) {
            t.showErrorAlert(null, data.error_msg);
          } else {
            history.persistent = data.persistent;
            t.showSuccessAlert(null, "Change has been applied.");
          }
        });
    },

    // Call when user select local template: (Raw template):
    onSave() {
      console.log('Page buildr | On Save')
      const content = this.$refs.vueBuilder.getJson();
      //const html_content = this.$refs.vueBuilder.getHtml();
      const html_content = ""; // no need anymore!

      this.save(content, html_content);
    },

    // Call when user select a template page (from pre-made page in the server):
    onSetPageBySelectTemplate(page) {
      console.log("📐 Auto save page.", page);

      this.save(page.content, null, page.image);
    },

    save(content, html_content = null, image = null) {
      if (!content.style) content.style = {}; // Important: Fix style in content!

      this.current_history_id = null;

      //update random title: (Solve problem in auto save in the first page build!)
      if (!content.title) {
        const title = "Landing-" + Math.random().toString(36).substring(7);
        content.title = title;
      }

      this.busy_save = true;
      if (this.inPageEditMode) {
        // ┣━━━━━━━━━━━━━━━━━━━━━━━━━━ Update  ━━━━━━━━━━━━━━━━━━━━━━━━━━┫
        console.log("📐 💾 Save changes.");
        let url = null;
        if (this.shop)
          url = window.API.PUT_EDIT_PAGE(
            this.$route.params.shop_id,
            this.page.id,
          );
        else if (this.isOfficialPage)
          url = window.ADMIN_API.PUT_EDIT_PAGE(this.page.id);
        else return;

        axios
          .put(url, {
            content: content,
            css:this.page.css, // Keep pre compiled classes structure!
            html: html_content,
            seo: this.page.seo,
            title: this.page.title,
            description: this.page.description,

            color: this.page.color,
            name: this.page.name,
            note: this.page.note,
            direction: this.page.direction,
            published: this.page.published,

            background: this.page.background,

            cluster_id: this.page.cluster_id,

            prompt: this.prompt,
            //  image: this.page.image,
          })
          .then(({ data }) => {
            if (data.error) {
              this.showErrorAlert(null, data.error_msg);
            } else {
              if (data.history)
                // No change in content => history = null
                this.histories.unshift(data.history);
              this.showSuccessAlert(
                null,
                "Page has been updated successfully.",
              );

              /*
                                   IMPORTANT: disconnect objects relations! especially for fonts -> change will not apply!
                                    this.page = data.page;
                                   this.loadPageData();
                                    */
            }
          })
          .catch((error) => {
            this.showLaravelError(error);
          })
          .finally(() => {
            this.busy_save = false;
          });
      } else {
        // ┣━━━━━━━━━━━━━━━━━━━━━━━━━━ Add  ━━━━━━━━━━━━━━━━━━━━━━━━━━┫
        // (Page is null!)
        console.log("📐 🞧 Add page.");
        let url = null;
        if (this.shop)
          url = window.API.POST_ADD_SHOP_PAGE(this.$route.params.shop_id);
        else if (this.isOfficialPage) url = window.ADMIN_API.POST_ADD_PAGE();
        else return;

        axios
          .post(url, {
            content: content,
            css:null,
            html: html_content,
            seo: null,
            title: content.title,
            description: "",

            color: "#03A9F4",
            name: content.title,
            note: "",
            direction: "auto",
            published: true,

            background: null,

            image: image,

            prompt: this.prompt,
          })
          .then(({ data }) => {
            if (data.error) {
              this.showErrorAlert(null, data.error_msg);
            } else {
              this.showSuccessAlert(null, "Page has been saved successfully.");
              //t.$route.params.page_id=data.page.id;//({name:'BPageLandingEditor',params:{shop_id:this.$route.params.shop_id,page_id:data.page.id}})

              this.$emit("create", data.page);
              /* Old way!
                                      this.$route.params.page_id = data.page.id;
                        */
              this.page = data.page;
              this.$refs.vueBuilder.setPage(data.page.content,data.page.css,false); // Force to update all page after first creation!

              // Update page route (new -> page id!)
              this.$router.replace({ params: { page_id: data.page.id } });
              /*
                                      IMPORTANT: disconnect objects relations! especially for fonts -> change will not apply!
                        
                                      this.loadPageData();
                                       */
            }
          })
          .catch((error) => {
            this.showLaravelError(error);
          })
          .finally(() => {
            this.busy_save = false;
          });
      }
    },

    fetchPageData() {
      this.current_history_id = null;

      let url = null;
      if (this.shop)
        url = window.API.GET_PAGE_DATA(
          this.$route.params.shop_id,
          this.page_id,
        );
      else if (this.isOfficialPage)
        url = window.ADMIN_API.GET_PAGE_DATA(this.page_id);
      else return;

      this.busy_fetch = true;

      axios
        .get(url)
        .then(({ data }) => {
          if (data.error) {
            this.showErrorAlert(null, data.error_msg);
          } else {
            this.page = data.page;
            this.prompt_samples = data.prompts;

            this.prompt = this.page.prompt;

            // 🌼 Fix style:
            if (!this.page.content.style) this.page.content.style = {};
            if (
              !this.page.content.style.fonts ||
              !Array.isArray(this.page.content.style.fonts)
            )
              this.page.content.style.fonts = [];

            this.$refs.vueBuilder.setPage(data.page.content,data.page.css,false);

            this.histories = data.histories;

            this.$emit("update", data.page);

            this.loadPageData();
          }
        })
        .catch((error) => {
          this.showLaravelError(error);
        })
        .finally(() => {
          this.busy_fetch = false;
        });
    },
    loadPageData() {
      ///this.$refs.vueBuilder.title = "Page builder | " + this.page.title + " 📐";
    },

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
            this.$refs.vueBuilder.setPage(data.page.content,data.page.css,false);
            this.loadPageData();

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

    aiAutoFillFunction(section) {
      // Require prompt:
      if (!this.prompt) {
        this.show_prompt = true;
        this.showWarningAlert(
          "Enter Prompt",
          "Kindly set a prompt for the page before proceeding.",
        );
        return;
      }

      console.log("🆎 AI / Auto fill content.");

      let url = null;
      if (this.shop)
        url = window.API.POST_AI_PAGE_BUILDER_SECTION_CONTENT_GENERATE(
          this.$route.params.shop_id,
          this.page?.id,
        );
      else if (this.isOfficialPage)
        url =
          window.ADMIN_API.POST_ADMIN_AI_PAGE_BUILDER_SECTION_CONTENT_GENERATE(
            this.page?.id,
          );
      else return;

      return axios
        .post(url, {
          name: section.name, // TODO: CChange to V2
          data: section.data,
          prompt: this.prompt,
        })
        .then(({ data }) => {
          if (data.error) {
            this.showErrorAlert(null, data.error_msg);
          } else {
            return data.generated;
          }
        })
        .catch((error) => {
          this.showLaravelError(error);
        });
    },
  },
};
</script>

<style lang="scss">
// Global setting drawer: (Important)
.x-page-builder-options-slider {
  z-index: 999;
  --background: #1e1e1e; // For nested components like <s-fade-scroll>

  .v-list-subheader {
    .v-list-subheader__text {
      text-wrap: wrap !important;
    }
  }

  @media (max-width: 620px) {
    font-size: 12px;

    .v-list-subheader {
      font-size: 10px;
    }
  }


}
</style>
