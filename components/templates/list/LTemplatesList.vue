<!--
  - Copyright (c) 2023-2024. Selldone® Business OS™
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
    class="x--page-builder-templates d-flex align-center justify-center pa-3 text-h2 font-weight-thin text-muted overflow-hidden"
    min-height="60vh"
    style="--background: #fff"
  >
    Loading Template...
  </v-card>
  <v-card v-else class="x--page-builder-templates" flat>
    <div v-if="hasHeader" class="px-2 px-sm-5 px-md-10">
      <h1 class="text-h3 font-weight-bold mb-2">
        <span class="app-box me-1" style="--bapp-size: 48px"
          ><img
            height="55%"
            src="@components/assets/selldone-logo/selldone-gradient-purple.svg"
            width="55%"
        /></span>

        {{ $t("page_builder.design.themes.title") }}
      </h1>
      <p class="text-h4">
        {{ $t("page_builder.design.themes.message") }}
      </p>
    </div>

    <s-progress-loading v-if="busy_fetch"></s-progress-loading>

    <div class="position-relative min-height-60vh d-flex align-start pb-16">
      <v-navigation-drawer
        v-if="$vuetify.display.mdAndDown"
        v-model="drawer"
        temporary
        absolute
      >
        <v-list-item
          v-for="item in categories"
          :key="item.code"
          link
          @click="
            selected_category = item.code;
            drawer = !$vuetify.display.mdAndDown;
          "
        >
          <template v-slot:prepend>
            <v-icon color="amber"
              >{{
                item.code === selected_category
                  ? "fa:fas fa-folder-open"
                  : "fa:fas fa-folder"
              }}
            </v-icon>
          </template>
          <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
        </v-list-item>
      </v-navigation-drawer>

      <v-list v-else min-width="280"  max-width="280">
        <v-list-item
          v-for="item in categories"
          :key="item.code"
          link
          @click="
            selected_category = item.code;
            drawer = !$vuetify.display.mdAndDown;
          "
        >
          <template v-slot:prepend>
            <v-icon color="amber"
              >{{
                item.code === selected_category
                  ? "fa:fas fa-folder-open"
                  : "fa:fas fa-folder"
              }}
            </v-icon>
          </template>
          <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-card-text class="mt-2 pb-16 flex-grow-1">
        <div class="mb-3 d-flex align-center">
          <v-btn
            v-if="$vuetify.display.mdAndDown"
            @click.stop="drawer = !drawer"
            variant="text"
            class="me-3"
            icon
          >
            <v-icon>menu</v-icon>
          </v-btn>

          <v-text-field
            v-model="search"
            :label="$t('global.commons.search')"
            class="max-width-field"
            clearable
            hide-details
            prepend-inner-icon="search"
            single-line
            variant="plain"
          ></v-text-field>
        </div>
        <v-row
          v-if="themes && selected_category === 'raw'"
          justify="start"
          align="center"
        >
          <v-fade-transition group hide-on-leave>
            <v-col
              v-for="(theme, index) in themes"
              :key="'raw-' + index"
              cols="12"
              lg="3"
              md="4"
              sm="6"
            >
              <v-card
                class="rounded-2rem position-relative border overflow-hidden pa-4"
                color="#333"
                variant="outlined"
                @click="selectRawTheme(theme)"
              >
                <v-img
                  :src="theme.image"
                  aspect-ratio="1"
                  class="rounded-2rem"
                  cover
                >
                  <v-chip
                    class="ma-3 absolute-bottom-end"
                    color="amber"
                    size="small"
                    variant="flat"
                    >raw
                  </v-chip>
                </v-img>
                <v-card-title>
                  {{ theme.name }}
                </v-card-title>
              </v-card>
            </v-col>
          </v-fade-transition>
        </v-row>

        <v-row v-else justify="start" align="center">
          <v-fade-transition group hide-on-leave>
            <v-col v-if="page_count > 1" key="p" cols="12">
              <v-pagination
                v-model="page"
                :disabled="busy_fetch"
                :length="page_count"
                rounded
                @update:model-value="fetchTemplates()"
              />
            </v-col>

            <v-col
              v-for="item in templates"
              :key="'tem-' + item.id"
              cols="12"
              lg="3"
              md="4"
              sm="6"
              style="min-width: max-content"
            >
              <l-template-card
                :loading="busy_get_template === item.id"
                :template="item"
                @select="$route.params.shop_id ? loadTemplate(item) : undefined"
              ></l-template-card>
            </v-col>
          </v-fade-transition>
        </v-row>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import LTemplateCard from "@app-page-builder/components/templates/card/LTemplateCard.vue";
import _ from "lodash-es";

/**
 * <l-templates-list>
 */
export default {
  name: "LTemplatesList",
  components: { LTemplateCard },
  emits: ["select:page", "select:raw-theme"],
  props: {
    themes: {
      type: Array,
    },
    hasHeader: { type: Boolean },
  },
  data() {
    return {
      drawer: false,
      selected_category: "raw",

      search: null,
      templates: null,
      total: 0,
      limit: 20,
      page: 1,
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

        { code: "*", title: "landing_categories.all" },
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

    page_count() {
      return Math.ceil(this.total / this.limit);
    },
  },

  watch: {
    search: _.throttle(function (newVal, oldVal) {
      this.page = 1;
      this.fetchTemplates();
    }, window.SERACH_THROTTLE),

    selected_category() {
      this.page = 1;
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
      this.selected_category = "*";
    }

    this.drawer = this.$vuetify.display.smAndUp;
  },
  mounted() {},

  updated() {},

  beforeUnmount() {},
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
            limit: this.limit,
            offset: (this.page - 1) * this.limit,
          },
        })
        .then(({ data }) => {
          if (!data.error) {
            this.templates = data.templates;
            this.total = data.total;
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
  border-radius: 26px;
}
</style>
