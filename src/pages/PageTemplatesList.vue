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
  <v-card
    v-if="blur"
    min-height="60vh"
    class="x--page-builder-templates d-flex align-center justify-center pa-3 display-3 font-weight-thin text-muted"
    style="--background: #fff"
  >
    Loading Template...
  </v-card>
  <v-card v-else flat class="x--page-builder-templates">
    <v-app-bar color="transparent" prominent flat max-height="64">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
    </v-app-bar>

    <div v-if="hasHeader" class="px-2 px-sm-5 px-md-10">
      <h1 class="display-2 font-weight-bold mb-2">
        <span class="app-box me-1" style="--bapp-size: 48px"
          ><img
            src="@components/assets/selldone-logo/selldone-gradient-purple.svg"
            width="55%"
            height="55%"
        /></span>

        {{ $t("page_builder.design.themes.title") }}
      </h1>
      <p class="display-1">
        {{ $t("page_builder.design.themes.message") }}
      </p>
    </div>

    <progress-loading v-if="busy_fetch"></progress-loading>

    <div class="position-relative min-height-60vh">
      <v-navigation-drawer
        v-model="drawer"
        absolute
        :temporary="$vuetify.breakpoint.mdAndDown"
        class="drawer"
      >
        <v-list nav dense>
          <v-list-item
            link
            v-for="item in categories"
            :key="item.code"
            @click="
              selected_category = item.code;
              drawer = !$vuetify.breakpoint.mdAndDown;
            "
          >
            <v-list-item-icon>
              <v-icon color="amber">{{
                item.code === selected_category
                  ? "fas fa-folder-open"
                  : "fas fa-folder"
              }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-card-text
        :class="{
          'drawer-open-margin': !$vuetify.breakpoint.mdAndDown && drawer,
        }"
        class="transition-ease-in-out mt-2 pb-16"
      >
        <div>
          <v-text-field
            v-model="search"
            single-line
            :placeholder="$t('global.commons.search')"
            prepend-inner-icon="search"
            class="max-width-field"
            clearable
            solo
            flat
          ></v-text-field>
        </div>
        <template v-if="themes && selected_category === 'raw'">
          <v-fade-transition
            group
            tag="v-row"
            row
            class="align-items-center justify-start"
            hide-on-leave
          >
            <v-col
              v-for="(theme, index) in themes"
              :key="'raw-' + index"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card
                class="widget-hover rounded-2rem widget border overflow-hidden"
                @click="selectRawTheme(theme)"
              >
                <v-img :src="theme.image" aspect-ratio="1" class="rounded-2rem">
                  <v-chip class="ma-3 absolute-bottom-end" small color="amber"
                    >raw</v-chip
                  >
                </v-img>
                <v-card-title>
                  {{ theme.name }}
                </v-card-title>
              </v-card>
            </v-col>
          </v-fade-transition>
        </template>

        <template v-else>
          <v-fade-transition
            group
            tag="v-row"
            row
            class="align-items-center justify-start"
            hide-on-leave
          >
            <v-col
              v-for="item in templates"
              :key="'tem-' + item.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              style="min-width: max-content"
            >
              <page-template-card
                :template="item"
                @click="$route.params.shop_id ? loadTemplate(item) : undefined"
                :loading="busy_get_template === item.id"
              ></page-template-card>
            </v-col>
          </v-fade-transition>
        </template>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import PageTemplateCard from "@app-page-builder/src/pages/components/PageTemplateCard.vue";
import _ from "lodash-es";

export default {
  name: "PageTemplatesList",
  components: { PageTemplateCard },
  props: {
    themes: {
      type: Array,
    },
    hasHeader: { type: Boolean },
  },
  data() {
    return {
      drawer: this.$vuetify.breakpoint.smAndUp,
      selected_category: "raw",

      search: null,
      templates: null,
      busy_fetch: false,

      blur: false,

      busy_get_template: null,
    };
  },

  computed: {
    has_raw_themes() {
      return this.themes?.length;
    },
    categories() {
      return [
        ...(this.has_raw_themes
          ? [{ code: "raw", title: "landing_categories.raw" }]
          : []),

        { code: "marketing", title: "landing_categories.marketing" },
        { code: "product", title: "landing_categories.product" },
        { code: "health", title: "landing_categories.health" },
        { code: "food", title: "landing_categories.food" },
        { code: "house", title: "landing_categories.house" },
        { code: "device", title: "landing_categories.device" },
        { code: "car", title: "landing_categories.car" },
        { code: "software", title: "landing_categories.software" },
        { code: "clothing", title: "landing_categories.clothing" },
        { code: "jewellery", title: "landing_categories.jewellery" },
      ];
    },
  },

  watch: {
    search: _.throttle(function (newVal, oldVal) {
      this.fetchTemplates();
    }, window.SERACH_THROTTLE),

    selected_category() {
      this.fetchTemplates();
    },
  },
  created() {
    // Auto select a template by query:
    const template_id = this.$route.query.template_id;
    if (template_id) {
      this.blur = true;
      this.loadTemplate({ id: template_id });
      return;
    }

    if (!this.has_raw_themes) {
      this.selected_category = "marketing";
    }
  },
  mounted() {},

  updated() {},

  beforeDestroy() {},
  methods: {
    fetchTemplates() {
      if (this.selected_category === "raw" && !this.search) {
        // Local templates mode!
        return;
      }
      this.templates = [];
      this.busy_fetch = true;
      axios
        .get(window.GAPI.GET_PAGE_BUILDER_TEMPLATES(), {
          params: {
            search: this.search,
            category: this.selected_category,
          },
        })
        .then(({ data }) => {
          if (!data.error) {
            this.templates = data.templates;
          } else {
            this.showErrorAlert(null, data.error_msg);
          }
        })
        .catch((error) => {
          this.showLaravelError(error);
        })
        .finally(() => {
          this.busy_fetch = false;
          this.blur = false;
        });
    },

    selectRawTheme(theme) {
      this.$emit("select:raw-theme", theme);
    },

    loadTemplate(item) {
      this.busy_get_template = item.id;
      axios
        .get(window.API.GET_PAGE_BUILDER_TEMPLATE_CONTENT(item.id))
        .then(({ data }) => {
          if (!data.error) {
            this.$emit("select:page", data.page);
          } else {
            this.showErrorAlert(null, data.error_msg);
          }
        })
        .catch((error) => {
          this.showLaravelError(error);
        })
        .finally(() => {
          this.busy_get_template = null;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.x--page-builder-templates {
  overflow: hidden;
  text-align: start;
  border-radius: 12px;

  .drawer {
    // z-index: 99;
  }
  .drawer-open-margin {
    padding-left: 280px;
  }
}
</style>
