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
      style="
        background: rgba(0, 0, 0, 0.6);
        position: fixed;
        left: 0;
        width: 100%;
        top: 0;
        height: 100%;
        z-index: 999999;
        backdrop-filter: blur(4px) grayscale(100%);
      "
    >
      <div
        class="center-fix loading-view-rect-center s--shadow-with-padding rounded-xl"
        style="z-index: 99999"
      >
        <v-progress-circular
          :color="SaminColorLight"
          :size="50"
          indeterminate
        />
        <p class="mt-2">
          {{ $t("page_builder.waiting_fetch") }}
        </p>
      </div>
    </div>
  </v-fade-transition>

  <div v-bind="$attrs">
    <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ Design ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

    <LPageEditor
      ref="vueBuilder"
      :ai-auto-fill-function="aiAutoFillFunction"
      :page="demoPage ? demoPage : page"
      :histories="histories"
      :demo="demo"
      :initial-page-data="demoPage"
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
      :fetchPageData="fetchPageData"
      :backTo="backTo"
      :busySave="busy_save"
      :onSave="onSave"
    >
      <template v-slot:header="{ builder }">
        <slot name="header" :builder="builder"></slot>
      </template>
    </LPageEditor>
  </div>
</template>

<script lang="ts">
import { standardDesignColor } from "@selldone/core-js/helper/color/ColorGenerator";
import { LMixinEvents } from "./mixins/events/LMixinEvents";
import LPageEditor from "./page/editor/LPageEditor.vue";
import { StorefrontSDK } from "@selldone/sdk-storefront/StorefrontSDK";

/**
 * <landing-builder>
 */
export default {
  name: "LandingBuilder",
  mixins: [LMixinEvents],

  components: {
    LPageEditor,
  },
  inject: ["$shop"],

  emits: ["update:page", "update", "create", "scale"],
  props: {
    isOfficialPage: {
      required: false,
      type: Boolean,
      default: false,
    },

    isNew: {
      type: Boolean,
      default: false,
    },
    demo: Boolean,
    demoPage: null,

    /**
     * Back route
     */
    backTo: {},
  },

  data: () => ({
    // showLoading: true,

    inEditMode: false, // Set after page builder initialize! important in access by $refs!

    page: null,

    histories: [],

    busy_save: false,

    busy_fetch: false,

    //-----------------------

    //-----------------------
    dialog_master_style: false,
    colors: standardDesignColor,

    //-----------------------
    show_edit_style: false,
    selected_section_style: null,

    scale: false,

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
  },
  mounted() {
    if (this.demo) {
      if (this.demoPage) {
        // this.page=this.demoPage;
        this.$refs.vueBuilder.setPage(
          this.demoPage.content,
          this.demoPage.css,
          false,
        ); // Force to update all page after first creation!
      }

      // Simulate current active shop:
      this.$store.commit("setCurrentAdminShop", this.$shop);
      StorefrontSDK.Setup(this.$shop.name);
      this.$forceUpdate(); // Important to update $refs.vueBuilder!
    }
  },
  beforeUnmount() {},
  methods: {
    // Call when user select local template: (Raw template):
    onSave() {
      console.log("Page buildr | On Save");
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

      ////////////// this.current_history_id = null;

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
        if (this.$shop)
          url = window.API.PUT_EDIT_PAGE(this.$shop.id, this.page.id);
        else if (this.isOfficialPage)
          url = window.ADMIN_API.PUT_EDIT_PAGE(this.page.id);
        else {
          console.error("📐 🚫 No shop or official page found!");
          return;
        }

        axios
          .put(url, {
            content: content,
            css: this.page.css, // Keep pre compiled classes structure!
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
        if (this.$shop) url = window.API.POST_ADD_SHOP_PAGE(this.$shop.id);
        else if (this.isOfficialPage) url = window.ADMIN_API.POST_ADD_PAGE();
        else {
          console.error("📐 🚫 No shop or official page found!");
          return;
        }

        axios
          .post(url, {
            content: content,
            css: null,
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

              this.$emit("create", data.page);
              /* Old way!
                                                  this.$route.params.page_id = data.page.id;
                                    */
              this.page = data.page;
              this.$refs.vueBuilder.setPage(
                data.page.content,
                data.page.css,
                false,
              ); // Force to update all page after first creation!

              // Update page route (new -> page id!)
              this.$router.replace({ params: { page_id: data.page.id } });
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
      //////////// this.current_history_id = null;
      console.log("this.$shop", this.$shop);
      let url = null;
      if (this.$shop)
        url = window.API.GET_PAGE_DATA(this.$shop.id, this.page_id);
      else if (this.isOfficialPage)
        url = window.ADMIN_API.GET_PAGE_DATA(this.page_id);
      else {
        console.error("📐 🚫 No shop or official page found!");
        return;
      }

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

            this.$refs.vueBuilder.setPage(
              data.page.content,
              data.page.css,
              false,
            );

            this.histories = data.histories;

            this.$emit("update", data.page);
          }
        })
        .catch((error) => {
          this.showLaravelError(error);
        })
        .finally(() => {
          this.busy_fetch = false;
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
      if (this.$shop)
        url = window.API.POST_AI_PAGE_BUILDER_SECTION_CONTENT_GENERATE(
          this.$shop.id,
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

<style lang="scss"></style>
