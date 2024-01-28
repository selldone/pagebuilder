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
  <div class="">
    <v-fade-transition>
      <div
        v-if="(inPageEditMode && !page) || busy_fetch"
        class="center-fix loading-view-rect-center s--shadow-with-padding"
        style="z-index: 99999"
      >
        <v-progress-circular
          :size="50"
          :color="SaminColorLight"
          indeterminate
        />
        <p class="mt-2">
          {{ $t("page_builder.waiting_fetch") }}
        </p>
      </div>
    </v-fade-transition>
    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Top Tools ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

    <page-builder-top-tools
      v-if="page && inEditMode"
      :shop="shop"
      :page="page"
      :pageBuilder="$refs.vueBuilder"
      :busySave="busy_save"
      :inDesignTab="in_desig_tab"
      @click:save="onSave"
      @click:history="history_dialog = true"
      @click:auto-generate="autoGenerate"
      history
      class="toolbar-top-rounded"
      @click:prompt="show_prompt = !show_prompt"
      has-ai-button
    >
    </page-builder-top-tools>

    <v-expand-transition>
      <div v-if="show_prompt" class="pa-3 pa-sm-5">
        <div class="d-flex">
          <v-spacer></v-spacer>
          <ai-model-select
            v-model="ai_model"
            outlined
            class="max-w-300"
            label="label"
            hide-details
          >
          </ai-model-select>
        </div>

        <v-textarea
          v-model="prompt"
          hide-details
          :rows="2"
          auto-grow
          placeholder="Write short about this page..."
          style="font-size: 1.2em; font-weight: 600"
          :counter="512"
          label="Prompt"
          class="mt-3"
          persistent-placeholder
          :rules="[GlobalRules.counter(512)]"
        >
        </v-textarea>

        <s-smart-suggestion
          class="mt-2 mb-4"
          :samples="prompt_samples"
          @select="(v) => (prompt = v)"
        >
        </s-smart-suggestion>

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
            @click="autoGenerate"
            :loading="auto_generate_busy"
            outlined
            x-large
          >
            Auto Generate Page
          </v-btn>

          <v-btn @click="show_prompt = false" color="primary" x-large>
            <v-icon class="me-1">check</v-icon> {{ $t("global.actions.done") }}
          </v-btn>
        </div>
      </div>
    </v-expand-transition>
    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Design ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

    <SPageEditor
      v-show="tab === 'design'"
      class="designer-container"
      ref="vueBuilder"
      :dir="page ? page.direction : 'auto'"
      :page="page"
      @saved="onSave"
      :hasSaveButton="isOfficialPage"
      @openSeo="sheet_seo = true"
      @historyOpen="history_dialog = true"
      @changeMode="(val) => (inEditMode = val)"
      @scale="
        (val) => {
          scale = val;
          $emit('scale', val);
        }
      "
      @load:template="onSetPageBySelectTemplate"
      :shop="shop"
      :pageStyle="style"
      :showIntro="(page_id === 'new' || isNew) && !page /*Not created yet!*/"
      :ai-auto-fill-function="aiAutoFillFunction"
      @update:preview="(_page) => $emit('update:preview', _page)"
    >
      <template v-slot:header>
        <slot name="header"></slot>
      </template>
    </SPageEditor>
    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Setting ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

    <setting-custom-page
      v-show="tab === 'setting'"
      v-if="page"
      :shop="shop"
      :page="page"
      :name.sync="page.name"
      :color.sync="page.color"
      :note.sync="page.note"
      :cluster-id.sync="page.cluster_id"
      :direction.sync="page.direction"
      :is-official-page="isOfficialPage"
    ></setting-custom-page>

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ SEO ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <s-page-builder-seo v-if="page" v-show="tab === 'seo'" :page="page" />

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Statistic ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

    <page-builder-users-behavior
      v-if="page && tab === 'behavior'"
      :page="page"
    ></page-builder-users-behavior>

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Files ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <page-builder-files-list v-if="page?.id && tab === 'files'" :page="page" />

    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ History ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
    <v-bottom-sheet
      v-if="page"
      v-model="history_dialog"
      max-width="840px"
      inset
      scrollable
      content-class="rounded-t-xl"
    >
      <v-card class="position-relative rounded-t-xl" tile>
        <v-progress-linear
          v-if="busy_fetch"
          indeterminate
          class="loader-to-bar"
        ></v-progress-linear>
        <v-card-title>
          <p class="ma-auto dialog-title text-start">
            <v-icon color="#111" class="me-2">history</v-icon>
            {{ $t("page_builder.history.title") }}
          </p>
        </v-card-title>

        <v-card-text>
          <v-list dense class="text-start v-line-list">
            <v-list-item ripple @click="fetchPageData()" two-line>
              <v-list-item-icon>
                <v-icon>settings_backup_restore</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> Restore last saved page </v-list-item-title>
                <v-list-item-subtitle>{{
                  getFromNowString(page.updated_at)
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>


              <v-list-item
                  v-for="history in histories"
                :key="history.id"
                ripple
                @click="getHistory(history.id)"
                two-line
              >
                <v-list-item-icon>
                  <v-icon
                    :color="
                      current_history_id === history.id ? 'green' : '#333'
                    "
                    >{{
                      current_history_id === history.id
                        ? "adjust"
                        : "panorama_fish_eye"
                    }}</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ getLocalTimeString(history.created_at) }}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{
                    getFromNowString(history.created_at)
                  }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon @click="togglePersistent(history)" @click.stop>
                    <v-icon v-if="history.persistent" color="yellow darken-2">
                      star
                    </v-icon>
                    <v-icon v-else color="grey lighten-1"> star_border </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

          </v-list>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import SPageBuilderSeo from "./src/seo/SPageBuilderSeo.vue";
import SettingCustomPage from "@app-page-builder/src/setting/SettingCustomPage";

import PageBuilderUsersBehavior from "@app-page-builder/src/statistics/PageBuilderUsersBehavior";
import { standardDesignColor } from "@core/helper/color/ColorGenerator";
import PageBuilderTopTools from "./src/menus/PageBuilderTopTools.vue";
import { FontLoader } from "@core/helper/font/FontLoader";
import PageBuilderFilesList from "@app-page-builder/src/files/PageBuilderFilesList.vue";
import AiModelSelect from "@app-backoffice/components/ai/AiModelSelect.vue";
import SSmartSuggestion from "@components/smart/suggestions/SSmartSuggestion.vue";
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";

export default {
  name: "SPageBuilder",
  mixins: [PageBuilderMixin],
  components: {
    SSmartSuggestion,
    AiModelSelect,
    PageBuilderFilesList,
    PageBuilderTopTools,

    PageBuilderUsersBehavior,
    SettingCustomPage,
    SPageBuilderSeo,
  },

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
    page_id() {
      // First check route param then feed by prop:
      return this.$route.params.page_id;
    },

    style() {
      return this.page?.content?.style;
    },

    in_desig_tab() {
      return this.tab === "design";
    },

    upload_bg_url() {
      return this.getPageBuilderUploadUrlImage();
    },

    page_view_url() {
      if (this.shop) return `/@${this.shop.name}/pages/${this.page.name}`;
      // Official Samin!
      else return this.isOfficialPage ? `/pages/${this.page.name}` : null;
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
    },
    externalTab(tab) {
      this.tab = tab;
    },
    page_id() {
      this.fetchPageData();
    },
  },

  created() {
    if (this.inPageEditMode) {
      this.fetchPageData();
    }

    if (this.externalTab) this.tab = this.externalTab;
  },
  mounted() {
    // 🗲 Global page refresh trigger
    this.EventBus.$on(
      "trigger:RefreshGlobalPageBuilder",

      ({}) => {
        //console.log('*******here*******','style',this.style)
        this.$forceUpdate();
        this.$refs.vueBuilder.PageStyleCalc(); // Force recalculate style! do not trigger on watch 'pageStyle'!
      }
    );
  },
  beforeDestroy() {
    this.EventBus.$off("trigger:RefreshGlobalPageBuilder");
  },
  methods: {
    /*  updateGlobal() {
      this.$forceUpdate();

      this.$nextTick(function () {
        this.$refs.vueBuilder.$forceUpdate();
        this.$refs.vueBuilder.PageStyleCalc();
      });
    },*/

    getHistory(history_id) {
      this.busy_fetch = true;
      this.current_history_id = history_id;

      let url = null;
      if (this.shop)
        url = window.API.GET_PAGE_HISTORY(
          this.$route.params.shop_id,
          this.page_id,
          history_id
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
            this.$refs.vueBuilder.setPage(data.content);
            this.loadPageData();

            this.showSuccessAlert(
              "Fetch completed",
              "Page successfully loaded from history." //صفحه ذخیره شده از تاریخچه لود شد.
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
          history.id
        );
      else if (this.isOfficialPage)
        url = window.ADMIN_API.PUT_SET_HISTORY_PERSISTENT(
          this.page_id,
          history.id
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
      const content = this.$refs.vueBuilder.getJson();
      //const html_content = this.$refs.vueBuilder.getHtml();
      const html_content = ""; // no need anymore!

      // Locally update style: (IMPORTANT)
      content.style = this.style;

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
            this.page.id
          );
        else if (this.isOfficialPage)
          url = window.ADMIN_API.PUT_EDIT_PAGE(this.page.id);
        else return;

        axios
          .put(url, {
            content: content,
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
                "Page has been updated successfully."
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
              //t.$route.params.page_id=data.page.id;//({name:'ShopPageBuilderPage',params:{shop_id:this.$route.params.shop_id,page_id:data.page.id}})

              this.$emit("create", data.page);
              /* Old way!
              this.$route.params.page_id = data.page.id;
*/
              this.page = data.page;
              this.$refs.vueBuilder.setPage(data.page.content); // Force to update all page after first creation!

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
          this.page_id
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

            this.$refs.vueBuilder.setPage(data.page.content);

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
      this.$refs.vueBuilder.title = "Page builder | " + this.page.title + " 📐";

      // console.log('this.page.content.style',this.style)
      // Load fonts:
      if (this.style) FontLoader.LoadFonts(this.style.fonts);
    },

    autoGenerate() {
      // Require prompt:
      if (!this.prompt) {
        this.show_prompt = true;
        this.showWarningAlert(
          "Enter Prompt Please",
          "Kindly set a prompt for the page before proceeding."
        );
        return;
      }

      // ┣━━━━━━━━━━━━━━━━━━━━━━━━━━ AI / Auto generate page  ━━━━━━━━━━━━━━━━━━━━━━━━━━┫
      console.log("🆎 AI / Auto generate page.");
      let url = null;
      if (this.shop)
        url = window.API.POST_AI_PAGE_BUILDER_AUTO_GENERATE(
          this.shop.id,
          this.page.id
        );
      else if (this.isOfficialPage)
        url = window.ADMIN_API.POST_ADMIN_AI_PAGE_BUILDER_AUTO_GENERATE(
          this.page.id
        );
      else return;

      this.auto_generate_busy = true;

      axios
        .post(url)
        .then(({ data }) => {
          if (data.error) {
            this.showErrorAlert(null, data.error_msg);
          } else {
            this.$refs.vueBuilder.setPage(data.page.content);
            this.loadPageData();

            this.showSuccessAlert(
              "Build completed",
              "Page successfully auto created and loaded."
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
          "Kindly set a prompt for the page before proceeding."
        );
        return;
      }

      console.log("🆎 AI / Auto fill content.");

      let url = null;
      if (this.shop)
        url = window.API.POST_AI_PAGE_BUILDER_SECTION_CONTENT_GENERATE(
          this.$route.params.shop_id,
          this.page?.id
        );
      else if (this.isOfficialPage)
        url =
          window.ADMIN_API.POST_ADMIN_AI_PAGE_BUILDER_SECTION_CONTENT_GENERATE(
            this.page?.id
          );
      else return;

      return axios
        .post(url, {
          name: section.name,
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
.x-page-builder-options-slider {
  z-index: 999;
}
</style>
