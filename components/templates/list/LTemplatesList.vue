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
  <section
    v-if="modern"
    class="l-templates-modern text-start"
    :class="{ 'l-templates-modern--with-starters': hasRawTemplates }"
    :aria-busy="busy_fetch || !!busy_get_template"
  >
    <header
      v-if="hasHeader && !preview_raw"
      class="l-templates-modern__heading"
    >
      <h2>
        {{
          $t(
            hasRawTemplates
              ? "page_builder.templates.starter_title"
              : "page_builder.templates.picker_title",
          )
        }}
      </h2>
      <p>
        {{
          $t(
            hasRawTemplates
              ? "page_builder.templates.starter_subtitle"
              : "page_builder.templates.picker_subtitle",
          )
        }}
      </p>
    </header>
    <nav
      v-if="hasRawTemplates && !preview_template && !preview_raw"
      class="l-template-starters__tabs"
      :aria-label="$t('global.commons.templates')"
    >
      <v-btn
        variant="text"
        :aria-pressed="show_raw_templates"
        :disabled="!!busy_get_template"
        @click="
          search = null;
          selected_category = 'raw';
        "
      >
        {{ $t("page_builder.templates.starter_tab") }}
      </v-btn>
      <v-btn
        variant="text"
        :aria-pressed="!show_raw_templates"
        :disabled="!!busy_get_template"
        @click="show_raw_templates && (selected_category = '*')"
      >
        {{ $t("page_builder.templates.library_tab") }}
      </v-btn>
    </nav>
    <template v-if="preview_template">
      <v-btn
        variant="text"
        class="l-templates-modern__back"
        :disabled="!!busy_get_template"
        @click="backToTemplates()"
      >
        <v-icon start size="17">arrow_back</v-icon
        >{{ $t("page_builder.templates.back_to_templates") }}
      </v-btn>
      <div class="l-templates-modern__detail">
        <l-template-card
          :template="preview_template"
          modern
          previewing
          :selection="clickable"
          :loading="!!busy_get_template"
          @select="loadTemplate(preview_template)"
        >
          <template #details
            ><div class="l-templates-modern__detail-info">
              <p>{{ $t("page_builder.templates.prebuilt_page") }}</p>
              <v-btn
                v-if="preview_template.preview"
                :href="preview_template.preview"
                target="_blank"
                rel="noopener noreferrer"
                variant="text"
                color="primary"
                class="l-templates-modern__action"
              >
                {{ $t("page_builder.templates.full_preview")
                }}<v-icon end size="16">north_east</v-icon>
              </v-btn>
            </div></template
          >
        </l-template-card>
      </div>
    </template>
    <div
      v-else-if="preview_raw && show_raw_templates"
      class="l-template-starters"
    >
      <article class="l-template-starters__preview">
        <header class="l-template-starters__preview-header">
          <v-btn
            ref="starterBack"
            variant="text"
            class="l-templates-modern__back"
            @click="closeRawPreview()"
          >
            <v-icon
              start
              size="17"
              class="l-template-starters__back-icon"
              aria-hidden="true"
            >arrow_back</v-icon>
            {{ $t("page_builder.templates.back_to_templates") }}
          </v-btn>
          <div class="l-template-starters__preview-title">
            <h2>{{ rawText(preview_raw.theme, "name") }}</h2>
            <v-btn
              color="primary"
              variant="flat"
              :aria-label="`${$t('page_builder.templates.use_template')} · ${rawText(preview_raw.theme, 'name')}`"
              @click="selectRawTheme(preview_raw.theme)"
            >
              {{ $t("page_builder.templates.use_template") }}
            </v-btn>
          </div>
          <nav
            v-if="preview_raw.content.sections?.length"
            class="l-template-starters__outline"
            :aria-labelledby="`preview-section-count-${preview_raw.content.sections[0].uid}`"
          >
            <span :id="`preview-section-count-${preview_raw.content.sections[0].uid}`">
              {{
                $t(
                  "page_builder.templates.section_count",
                  { count: $n(preview_raw.content.sections.length) },
                  preview_raw.content.sections.length,
                )
              }}
            </span>
            <ul>
              <li
                v-for="section in preview_raw.content.sections"
                :key="section.uid"
              >
                <a
                  :href="`#${section.uid}`"
                  @click.prevent="scrollToRawSection(section.uid)"
                >{{ section.label }}</a>
              </li>
            </ul>
          </nav>
        </header>
        <fieldset
          ref="starterPreviewContent"
          class="l-template-starters__preview-content"
          :aria-label="$t('global.commons.preview')"
          disabled
          @click.capture="followRawPreviewLink"
          @submit.capture.prevent.stop
        >
          <l-page-viewer
            :initial-page-data="preview_raw.content"
            :custom-fonts="[]"
            dir="ltr"
          />
        </fieldset>
      </article>
    </div>
    <div v-else-if="show_raw_templates" class="l-template-starters">
      <div ref="starterGrid" class="l-template-starters__grid">
        <article
          v-for="theme in RawTemplate.List"
          :key="theme.id"
          class="l-template-starters__card"
        >
          <v-img
            class="l-template-starters__image"
            :src="theme.image"
            :aspect-ratio="1.6"
            alt=""
          >
            <template #error>
              <div class="l-template-starters__image-error">
                {{ $t("page_builder.templates.preview_unavailable") }}
              </div>
            </template>
          </v-img>
          <div class="l-template-starters__body">
            <div class="l-template-starters__title-line">
              <h3>
                {{ rawText(theme, "name") }}
              </h3>
              <span>
                {{
                  $t(
                    "page_builder.templates.section_count",
                    { count: $n(theme.sections.length) },
                    theme.sections.length,
                  )
                }}
              </span>
            </div>
            <p v-if="theme.description">{{ rawText(theme, "description") }}</p>
            <div class="l-template-starters__actions">
              <v-btn
                variant="text"
                :aria-label="`${$t('global.commons.preview')} · ${rawText(theme, 'name')}`"
                :data-starter-preview="theme.id"
                @click="openRawPreview(theme)"
              >
                {{ $t("global.commons.preview") }}
              </v-btn>
              <v-btn
                color="primary"
                variant="tonal"
                :aria-label="`${$t('page_builder.templates.use_template')} · ${rawText(theme, 'name')}`"
                @click="selectRawTheme(theme)"
              >
                {{ $t("page_builder.templates.use_template") }}
              </v-btn>
            </div>
          </div>
        </article>
      </div>
    </div>
    <template v-else>
      <div class="l-templates-modern__toolbar">
        <v-text-field
          ref="searchField"
          v-model="search"
          :placeholder="$t('page_builder.templates.search')"
          :aria-label="$t('page_builder.templates.search')"
          :disabled="!!busy_get_template"
          class="l-templates-modern__search"
          variant="outlined"
          density="compact"
          clearable
          hide-details
          prepend-inner-icon="search"
        />
        <span class="l-templates-modern__count" role="status">{{
          busy_fetch && templates === null
            ? $t("page_builder.templates.loading")
            : $t("page_builder.templates.results_count", { count: total })
        }}</span>
      </div>
      <nav
        class="l-templates-modern__categories"
        :aria-label="$t('landing_categories.all')"
      >
        <v-btn
          v-for="item in catalog_categories.slice(0, 5)"
          :key="item.code"
          variant="text"
          :aria-pressed="!search && selected_category === item.code"
          :class="{
            'l-templates-modern__category--selected':
              !search && selected_category === item.code,
          }"
          :disabled="!!search || !!busy_get_template"
          @click="selected_category = item.code"
          >{{ $t(item.title) }}</v-btn
        >
        <v-menu v-if="catalog_categories.length > 5">
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              variant="text"
              :disabled="!!search || !!busy_get_template"
              :class="{
                'l-templates-modern__category--selected': more_category,
              }"
            >
              {{
                more_category
                  ? $t(more_category.title)
                  : $t("page_builder.templates.more_categories")
              }}<v-icon end size="16">expand_more</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in catalog_categories.slice(5)"
              :key="item.code"
              :active="selected_category === item.code"
              @click="selected_category = item.code"
            >
              <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </nav>
      <v-select
        v-model="selected_category"
        class="l-templates-modern__category-select"
        :items="catalog_categories"
        item-value="code"
        :item-title="(item) => $t(item.title)"
        :label="$t('landing_categories.all')"
        :disabled="!!search || !!busy_get_template"
        variant="outlined"
        density="compact"
        hide-details
      />
      <p v-if="search" class="l-templates-modern__hint">
        {{ $t("page_builder.templates.search_all_hint") }}
      </p>
      <div class="l-templates-modern__results">
        <u-loading-progress
          v-if="busy_fetch && templates !== null"
          class="l-templates-modern__progress"
        />
        <div
          v-if="blur || (busy_fetch && templates === null)"
          class="l-templates-modern__grid"
          :aria-label="$t('page_builder.templates.loading')"
        >
          <v-skeleton-loader
            v-for="index in 6"
            :key="index"
            type="image, article"
          />
        </div>
        <div
          v-else-if="fetch_error"
          class="l-templates-modern__empty"
          role="alert"
        >
          <v-icon size="26" aria-hidden="true">cloud_off</v-icon>
          <h3>{{ $t("page_builder.templates.load_error_title") }}</h3>
          <p>{{ $t("page_builder.templates.load_error_description") }}</p>
          <v-btn variant="outlined" @click="fetchTemplates()">{{
            $t("page_builder.templates.retry")
          }}</v-btn>
        </div>
        <div
          v-else-if="templates && !templates.length"
          class="l-templates-modern__empty"
          role="status"
        >
          <v-icon size="26" aria-hidden="true">search</v-icon>
          <h3>{{ $t("page_builder.templates.empty_title") }}</h3>
          <p>{{ $t("page_builder.templates.empty_description") }}</p>
          <v-btn variant="outlined" @click="showAllTemplates()">{{
            $t("page_builder.templates.show_all")
          }}</v-btn>
        </div>
        <div v-else class="l-templates-modern__grid">
          <l-template-card
            v-for="item in templates || []"
            :key="item.id"
            ref="templateCards"
            :template="item"
            modern
            :selection="clickable"
            :loading="busy_get_template === item.id"
            :disabled="busy_fetch || !!busy_get_template"
            @select="clickable ? loadTemplate(item) : undefined"
            @preview="showPreview(item)"
          />
        </div>
      </div>
      <footer
        v-if="templates?.length && !fetch_error"
        class="l-templates-modern__footer"
      >
        <span>{{
          $t("page_builder.templates.showing", {
            from: (page - 1) * limit + 1,
            to: Math.min(page * limit, total),
            total,
          })
        }}</span>
        <v-pagination
          v-if="page_count > 1"
          v-model="page"
          :length="page_count"
          :disabled="busy_fetch || !!busy_get_template"
          :total-visible="4"
          @update:model-value="fetchTemplates()"
        />
      </footer>
    </template>
  </section>
  <v-card
    v-else-if="blur"
    class="x--page-builder-templates d-flex align-center justify-center pa-3 text-h2 font-weight-thin text-muted overflow-hidden"
    min-height="60vh"
    style="--background: #fff"
  >
    Loading Template...
  </v-card>
  <v-card v-else class="x--page-builder-templates" flat>
    <div v-if="hasHeader" class="px-2 px-sm-5 px-md-10 py-5">
      <h1 class="text-h3 font-weight-bold mb-2">
        <span class="app-box me-1" style="--bapp-size: 48px"
          ><img
            height="55%"
            src="@selldone/components-vue/assets/selldone-logo/selldone-gradient-purple.svg"
            width="55%"
            alt="SD"
        /></span>

        {{ $t("page_builder.design.themes.title") }}
      </h1>
      <p class="text-h4">
        {{ $t("page_builder.design.themes.message") }}
      </p>
    </div>

    <u-loading-progress v-if="busy_fetch"></u-loading-progress>

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

      <v-list v-else min-width="280" max-width="280">
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
            :placeholder="$t('global.commons.search')"
            class="max-width-field"
            clearable
            hide-details
            prepend-inner-icon="search"
            single-line
            variant="plain"
          ></v-text-field>
        </div>
        <v-row
          v-if="selected_category === 'raw'"
          justify="start"
          align="center"
        >
          <v-fade-transition group hide-on-leave>
            <v-col
              v-for="(theme, index) in RawTemplate.List"
              :key="'raw-' + index"
              lg="2"
              md="3"
              sm="4"
              cols="6"
            >
              <v-card
                class="rounded-2rem position-relative border overflow-hidden pa-2"
                color="#333"
                variant="outlined"
                @click="selectRawTheme(theme)"
              >
                <v-img
                  :src="theme.image"
                  aspect-ratio="1"
                  class="rounded-2rem elevation-3"
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
                <v-card-title class="text-subtitle-2">
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
              lg="2"
              md="3"
              sm="4"
              cols="6"
            >
              <l-template-card
                :loading="busy_get_template === item.id"
                :template="item"
                @select="clickable ? loadTemplate(item) : undefined"
                :clickable="clickable"
                variant="outlined"
                size="default"
              ></l-template-card>
            </v-col>
          </v-fade-transition>
        </v-row>
      </v-card-text>
    </div>
  </v-card>
</template>

<script lang="ts">
import NotificationService from "@selldone/components-vue/plugins/notification/NotificationService.ts";

import LTemplateCard from "../../../components/templates/card/LTemplateCard.vue";
import LPageViewer from "../../../page/viewer/LPageViewer.vue";
import { throttle } from "lodash-es";
import { RawTemplate } from "@selldone/page-builder/components/templates/list/RawTemplate.ts";
import { CONSOLE } from "@selldone/core-js";
import type { Page } from "@selldone/core-js/models";
import { BEventBusMixin } from "@selldone/components-vue/utils/events/BEventBusMixin.ts";

/**
 * <l-templates-list>
 */
export default {
  name: "LTemplatesList",
  mixins: [BEventBusMixin],
  components: { LTemplateCard, LPageViewer },
  emits: ["select:page", "select:raw-theme", "preview", "update:busy"],
  props: {
    modern: Boolean,
    previewInPlace: { type: Boolean, default: true },
    initialPreview: Object,
    loadFromQuery: { type: Boolean, default: true },
    hasHeader: { type: Boolean },
    clickable: Boolean,

    hasRawTemplates: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      RawTemplate: RawTemplate,

      drawer: false,
      selected_category: this.hasRawTemplates ? "raw" : "*",

      search: null,
      templates: null,
      total: 0,
      limit: 20,
      page: 1,
      busy_fetch: false,
      fetch_error: false,
      catalogRequest: 0,
      selectionRequest: 0,
      searchThrottled: null,
      preview_template: this.initialPreview || null,
      preview_raw: null as { theme: RawTemplate; content: Page.IContent } | null,

      blur: false,

      busy_get_template: null,
    };
  },

  computed: {
    show_raw_templates() {
      return (
        this.hasRawTemplates &&
        this.selected_category === "raw" &&
        !this.search &&
        !this.blur
      );
    },
    catalog_categories() {
      return this.categories.filter((item) => item.code !== "raw");
    },
    more_category() {
      return (
        !this.search &&
        this.catalog_categories
          .slice(5)
          .find((item) => item.code === this.selected_category)
      );
    },
    categories() {
      return [
        ...(this.hasRawTemplates
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
    search() {
      this.page = 1;
      this.resetCatalog();
      this.searchThrottled();
    },

    selected_category() {
      this.page = 1;
      this.searchThrottled.cancel();
      this.resetCatalog();
      this.fetchTemplates();
    },
    initialPreview(value) {
      this.preview_template = value || null;
    },
    busy_get_template(value) {
      this.$emit("update:busy", value !== null);
    },
  },
  created() {
    this.searchThrottled = throttle(
      () => this.fetchTemplates(),
      window.SERACH_THROTTLE,
    );
    // Auto select a template by query:
    const template_id = this.loadFromQuery && this.$route.query.template_id;
    if (template_id) {
      this.blur = true;
      this.loadTemplate({ id: template_id });
      return;
    }

    if (!this.hasRawTemplates) {
      this.fetchTemplates();
    }

    this.drawer = this.$vuetify.display.smAndUp;
  },
  mounted() {},

  updated() {},

  beforeUnmount() {
    this.searchThrottled.cancel();
    this.catalogRequest++;
    this.selectionRequest++;
  },
  methods: {
    resetCatalog() {
      this.catalogRequest++;
      this.templates = null;
      this.total = 0;
      this.fetch_error = false;
      this.busy_fetch = false;
    },
    showAllTemplates() {
      if (!this.search && this.selected_category === "*")
        return this.fetchTemplates();
      this.search = null;
      this.selected_category = "*";
    },
    showPreview(item) {
      if (this.previewInPlace) this.preview_template = item;
      else this.$emit("preview", item);
    },
    rawText(theme: RawTemplate, field: "name" | "description") {
      const key = `page_builder.templates.raw.${theme.id}.${field}`;
      const translated = this.$t(key);
      return translated === key ? theme[field] : translated;
    },
    openRawPreview(theme: RawTemplate) {
      this.preview_raw = {
        theme,
        content: theme.generate({
          productsPlaceholder: this.$t(
            "page_builder.templates.starter_products_preview",
            "Products from your store will appear here.",
          ),
        }),
      };
      this.$nextTick(() => this.$refs.starterBack?.$el.focus());
    },
    closeRawPreview() {
      const id = this.preview_raw?.theme.id;
      this.preview_raw = null;
      this.$nextTick(() => {
        const buttons =
          this.$refs.starterGrid?.querySelectorAll("[data-starter-preview]") || [];
        Array.from<HTMLButtonElement>(buttons)
          .find((button) => button.dataset.starterPreview === id)
          ?.focus();
      });
    },
    followRawPreviewLink(event: MouseEvent) {
      const link = (event.target as Element)?.closest("a");
      if (!link) return;

      event.preventDefault();
      event.stopPropagation();
      const href = link.getAttribute("href");
      const section = this.preview_raw?.content.sections?.find(
        ({ uid }) => href === `#${uid}`,
      );
      if (section) {
        this.scrollToRawSection(section.uid);
      }
    },
    scrollToRawSection(uid?: string) {
      if (!uid) return;
      (this.$refs.starterPreviewContent as HTMLElement | undefined)
        ?.querySelector(`#${uid}`)
        ?.scrollIntoView({ block: "start" });
    },
    backToTemplates() {
      const id = this.preview_template.id;
      this.preview_template = null;
      this.$nextTick(() => {
        const card = this.$refs.templateCards?.find(
          (card) => card.template.id === id,
        );
        const target =
          card?.$el.querySelector("button") ||
          this.$refs.searchField?.$el.querySelector("input");
        target?.focus();
      });
    },
    fetchTemplates() {
      if (this.selected_category === "raw" && !this.search) {
        // Local templates mode!
        return;
      }
      const request = ++this.catalogRequest;
      this.busy_fetch = true;
      this.fetch_error = false;
      return axios
        .get(window.GAPI.GET_PAGE_BUILDER_TEMPLATES(), {
          params: {
            search: this.search,
            category: this.selected_category,
            limit: this.limit,
            offset: (this.page - 1) * this.limit,
          },
        })
        .then(({ data }) => {
          if (request !== this.catalogRequest) return;
          if (
            !data ||
            (!data.error &&
              (!Array.isArray(data.templates) ||
                data.templates.some(
                  (item) =>
                    !item ||
                    typeof item !== "object" ||
                    item.id == null ||
                    typeof item.name !== "string",
                ) ||
                !Number.isFinite(data.total) ||
                data.total < 0))
          ) {
            this.fetch_error = true;
            return;
          }
          if (!data.error) {
            this.templates = data.templates;
            this.total = data.total;
          } else {
            this.fetch_error = true;
            NotificationService.showErrorAlert(null, data.error_msg);
          }
        })
        .catch((error) => {
          if (request !== this.catalogRequest) return;
          this.fetch_error = true;
          NotificationService.showLaravelError(error);
        })
        .finally(() => {
          if (request !== this.catalogRequest) return;
          this.busy_fetch = false;
          this.blur = false;
        });
    },

    selectRawTheme(theme) {
      CONSOLE.log("select:raw-theme", theme);
      this.$emit("select:raw-theme", theme.generate());
    },

    loadTemplate(item) {
      if (this.busy_fetch || this.busy_get_template !== null || !item?.id)
        return;
      if (item.premium && !this.USER()?.premium) {
        this.showNeedSubscribePremium();
        return;
      }
      const request = ++this.selectionRequest;
      this.busy_get_template = item.id;
      return axios
        .get(window.API.GET_PAGE_BUILDER_TEMPLATE_CONTENT(item.id))
        .then(({ data }) => {
          if (request !== this.selectionRequest) return;
          if (
            data &&
            !data.error &&
            data.page &&
            typeof data.page === "object" &&
            !Array.isArray(data.page) &&
            data.page.content &&
            typeof data.page.content === "object" &&
            !Array.isArray(data.page.content)
          ) {
            this.$emit("select:page", data.page);
          } else {
            NotificationService.showErrorAlert(
              null,
              data?.error_msg ||
                this.$t("page_builder.templates.load_error_description"),
            );
          }
        })
        .catch((error) => {
          if (request !== this.selectionRequest) return;
          NotificationService.showLaravelError(error);
        })
        .finally(() => {
          if (request !== this.selectionRequest) return;
          this.busy_get_template = null;
          this.blur = false;
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
.l-templates-modern {
  --lt-line: rgba(var(--v-theme-on-surface), 0.12);
  --lt-muted: rgba(var(--v-theme-on-surface), 0.66);
  min-width: 0;
  color: rgb(var(--v-theme-on-surface));
  font-family: inherit;
  font-size: 13px;
  line-height: 1.6;
  &--with-starters {
    max-inline-size: 1160px;
    margin-inline: auto;
    padding: clamp(22px, 4vw, 52px) clamp(14px, 3.4vw, 38px) 64px;
    color: rgb(var(--v-theme-on-background));
    background: rgb(var(--v-theme-background));
    border-radius: 20px;
  }
  &__heading {
    margin-block-end: 24px;
    h2 {
      font-size: 24px;
      font-weight: 500;
    }
    p {
      margin: 6px 0 14px;
      color: var(--lt-muted);
    }
  }
  &--with-starters &__heading {
    margin-block-end: 26px;
    h2 {
      font-size: clamp(24px, 3.2vw, 36px);
      line-height: 1.15;
      font-weight: 650;
      text-wrap: balance;
    }
    p {
      margin-block: 10px 0;
      font-size: 14px;
    }
  }
  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-block-end: 16px;
  }
  &__search {
    max-width: 470px;
    :deep(.v-field) {
      border-radius: 10px;
    }
    :deep(.v-field__input) {
      font: inherit;
    }
  }
  &__count {
    font-size: 12px;
    color: var(--lt-muted);
    white-space: nowrap;
  }
  &__categories {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 5px;
    margin-block-end: 22px;
  }
  &__categories > .v-btn {
    min-height: 36px;
    height: auto;
    padding: 8px 10px;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0;
    text-transform: none;
    border-radius: 7px;
  }
  &__categories .l-templates-modern__category--selected {
    color: rgb(var(--v-theme-primary));
    background: rgba(var(--v-theme-primary), 0.08);
  }
  &__category-select {
    display: none;
  }
  &__hint {
    color: var(--lt-muted);
    margin-block: 0 18px;
  }
  &__results {
    position: relative;
    min-height: 240px;
    container: page-templates / inline-size;
  }
  &__progress {
    position: absolute;
    inset: 0 0 auto;
    z-index: 1;
  }
  &__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 22px 18px;
    align-items: stretch;
  }
  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: 360px;
    padding: 24px;
    text-align: center;
    h3 {
      font-size: 16px;
      font-weight: 500;
      margin: 0;
    }
    p {
      color: var(--lt-muted);
      margin: 0 0 7px;
    }
  }
  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-block-start: 24px;
    color: var(--lt-muted);
    font-size: 12px;
    :deep(.v-pagination) {
      margin-inline-start: auto;
    }
  }
  &__back,
  &__action {
    min-height: 42px;
    height: auto;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0;
    text-transform: none;
  }
  &__back {
    margin-block-end: 18px;
  }
  &__detail {
    min-width: 0;
  }
  &__detail-info {
    p {
      margin: 0 0 12px;
      color: var(--lt-muted);
    }
    .v-btn {
      white-space: normal;
    }
  }
  @container page-templates (min-width: 520px) {
    &__grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @container page-templates (min-width: 820px) {
    &__grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  @container page-templates (min-width: 1120px) {
    &__grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
  @container page-templates (min-width: 1440px) {
    &__grid {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }
  @media (max-width: 600px) {
    &__toolbar {
      flex-wrap: wrap;
      gap: 9px;
    }
    &__search {
      flex-basis: 100%;
      max-width: none;
      :deep(input) {
        font-size: 16px;
      }
    }
    &__categories {
      display: none;
    }
    &__category-select {
      display: block;
      margin-block-end: 18px;
    }
    &__grid {
      gap: 15px 10px;
    }
    &__detail {
      grid-template-columns: minmax(0, 1fr);
      gap: 18px;
    }
    &__back,
    &__action {
      min-height: 44px;
    }
  }
}

.l-template-starters {
  container: landing-starters / inline-size;

  &__tabs {
    display: inline-flex;
    max-inline-size: 100%;
    flex-wrap: wrap;
    gap: 4px;
    margin-block-end: 22px;
    padding: 4px;
    background: rgba(var(--v-theme-on-surface), 0.05);
    border: 1px solid var(--lt-line);
    border-radius: 12px;

    > .v-btn[aria-pressed="true"] {
      background: rgb(var(--v-theme-surface));
      color: rgb(var(--v-theme-on-surface));
      box-shadow: 0 1px 3px rgba(var(--v-theme-on-surface), 0.1);
    }
  }

  &__grid {
    display: grid;
    gap: 20px;
    grid-template-columns: minmax(0, 1fr);
  }

  &__card {
    display: flex;
    flex-direction: column;
    color: rgb(var(--v-theme-on-surface));
    background: rgb(var(--v-theme-surface));
    border: 1px solid var(--lt-line);
    border-radius: 16px;
    overflow: hidden;
  }

  &__image {
    flex: none;
    background: rgba(var(--v-theme-on-surface), 0.035);
    border-block-end: 1px solid var(--lt-line);
  }

  &__image-error {
    display: grid;
    place-items: center;
    min-block-size: 100%;
    color: var(--lt-muted);
  }

  &__body {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-inline-size: 0;
    padding: 16px;

    > p {
      margin: 6px 0 14px;
      color: var(--lt-muted);
      font-size: 13px;
      line-height: 1.55;
    }
  }

  &__title-line {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 4px 8px;

    h3 {
      margin: 0;
      font-size: 17px;
      line-height: 1.35;
      font-weight: 600;
    }

    span {
      color: var(--lt-muted);
      font-size: 12px;
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    margin-block-start: auto;
    padding-block-start: 8px;
  }

  &__tabs > .v-btn,
  &__actions > .v-btn,
  &__preview-title > .v-btn {
    min-block-size: 44px;
    height: auto;
    max-inline-size: 100%;
    padding-block: 6px;
    padding-inline: 12px;
    border-radius: 8px;
    font-size: 13px;
    line-height: 1.4;
    font-weight: 500;
    letter-spacing: 0;
    text-transform: none;
    white-space: normal;
  }

  &__tabs > .v-btn:focus-visible,
  &__actions > .v-btn:focus-visible,
  &__preview-title > .v-btn:focus-visible {
    outline: 2px solid rgb(var(--v-theme-primary));
    outline-offset: 2px;
  }

  &__back-icon:dir(rtl) {
    transform: scaleX(-1);
  }

  &__preview-header {
    margin-block-end: 20px;
  }

  &__preview-title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 10px 20px;

    h2 {
      margin: 0;
      font-size: clamp(24px, 3vw, 32px);
      line-height: 1.2;
      font-weight: 650;
    }
  }

  &__outline {
    margin-block-start: 16px;

    > span {
      font-size: 13px;
      font-weight: 600;
      color: var(--lt-muted);
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 8px;
      padding: 0;
      margin: 4px 0 0;
      list-style: none;
    }

    a {
      display: inline-flex;
      align-items: center;
      min-block-size: 44px;
      padding-inline: 10px;
      border: 1px solid var(--lt-line);
      border-radius: 8px;
      color: rgb(var(--v-theme-on-surface));
      font-size: 13px;
      text-decoration: none;

      &:hover {
        background: rgba(var(--v-theme-on-surface), 0.045);
      }

      &:focus-visible {
        outline: 2px solid rgb(var(--v-theme-primary));
        outline-offset: 2px;
      }
    }
  }

  &__preview-content {
    min-inline-size: 0;
    margin: 0;
    padding: 0;
    border: 1px solid var(--lt-line);
    border-radius: 16px;
    overflow: hidden;
    background: #fff;
  }

  @container landing-starters (min-width: 520px) {
    &__grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @container landing-starters (min-width: 810px) {
    &__grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
}
</style>
