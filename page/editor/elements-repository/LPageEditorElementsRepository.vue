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
  <div
    v-if="$vuetify.display.mdAndUp"
    v-show="(scaleDownMode || $vuetify.display.xlAndUp) && show"
    :class="{ collapse: collapse }"
    class="r-con c-container -force-rounded p-2 fadeIn"
  >
    <v-expand-transition>
      <div v-if="!collapse" class="text-center text-white">
        Drag & Drop <small class="d-block">Pre-built sections</small>
      </div>
    </v-expand-transition>

    <div
      class="c-widget m-2 p-2 flex-grow-1 d-flex flex-column position-relative overflow-hidden"
    >
      <v-text-field
        v-model="search"
        :append-icon="collapse ? 'expand_more' : 'expand_less'"
        class="flex-grow-0"
        flat
        hide-details
        placeholder="Search..."
        variant="solo"
        @click:append.stop="collapse = !collapse"
      ></v-text-field>

      <v-fade-transition leave-absolute>
        <div v-show="!collapse" class="hide-scroll overflow-auto">
          <v-list class="border-between-vertical">
            <v-card
              v-for="(item, i) in elements"
              :key="i"
              class="r-card mb-2"
              draggable="true"
              flat
              height="84"
              @dragstart="(e) => drag(e, item)"
            >
              <v-img
                :src="getShopImagePath(item.image)"
                class="-img"
                cover
                height="100%"
              >
                <v-btn
                  v-if="item.shop_id"
                  class="absolute-top-end"
                  icon
                  size="small"
                  title="Edit element"
                  variant="flat"
                  @click.stop="showEdit(item)"
                >
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-img>
              <div class="label single-line">
                {{ item.title }}
              </div>
            </v-card>
          </v-list>

          <div
            v-intersect="
              (isIntersecting, entries, observer) => {
                if (isIntersecting) {
                  loadMore();
                }
              }
            "
            class="py-4"
          >
            <small v-if="more">Load more...</small>
          </div>
        </div>
      </v-fade-transition>

      <v-spacer></v-spacer>

      <u-loading-progress v-if="busy_fetch"></u-loading-progress>
    </div>

    <v-bottom-sheet
      v-if="shop_id /*Only in shop admin dashboard!*/"
      v-model="dialog"
      content-class="rounded-t-xl"
      max-width="840px"
      scrollable
      width="98%"
    >
      <v-card rounded="t-xl" class="text-start">
        <v-card-title class="d-flex align-center">
          <v-icon class="me-2" color="#111">add_box</v-icon>
          Add My Custom Section

          <v-spacer></v-spacer>
          <v-btn
            v-if="selected_element"
            :loading="busy_delete"
            color="red"
            variant="text"
            @click="deleteSection(selected_element)"
          >
            <v-icon start>delete</v-icon>
            {{ $t("global.actions.delete") }}
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div class="widget-box mb-5">
            <s-widget-header
              icon="tune"
              title="Configuration"
            ></s-widget-header>
            <v-list-subheader>
              You can save custom-designed sections for later use in your page
              designs. These saved sections are accessible to all admins in this
              shop.
            </v-list-subheader>

            <v-text-field
              v-model="title"
              label="Title"
              variant="underlined"
              messages="Public title."
            ></v-text-field>

            <v-combobox
              v-model="tags"
              chips
              closable-chips
              variant="underlined"
              label="Tags"
              messages="Used for search and categorize elements."
              multiple
            ></v-combobox>
          </div>

          <div v-if="selected_element" class="widget-box mb-5">
            <s-widget-header icon="image" title="Image"></s-widget-header>
            <v-list-subheader>Public image in the list.</v-list-subheader>

            <s-image-uploader
              :image="getShopImagePath(selected_element.image)"
              :server="
                window.API.POST_PAGE_ELEMENT_UPLOAD_IMAGE(
                  shop_id,
                  selected_element.id,
                )
              "
              auto-compact
              class="my-2 mx-auto fadeIn"
              label="Preview Image "
              max-file-size="2MB"
              @new-path="(path) => (selected_element.image = path)"
            >
            </s-image-uploader>
          </div>

          <div class="widget-box mb-5">
            <s-widget-header icon="data_object" title="Code"></s-widget-header>
            <v-list-subheader>
              You can copy and past the element code form left side of sections
              in the page builder.
            </v-list-subheader>
            <v-textarea
              v-model="section"
              messages="Copy section on page builder."
              @blur="onBlur"
              variant="underlined"
            ></v-textarea>

            <div class="max-w-300 mt-4">
              <div
                v-for="font in fonts"
                :key="font"
                class="row-font text-start"
              >
                <b :style="{ fontFamily: font }">
                  <v-icon start>font_download</v-icon>
                  {{ font }}</b
                >
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <div class="widget-buttons">
            <v-btn size="x-large" variant="text" @click="dialog = false">
              <v-icon start>close</v-icon>
              {{ $t("global.actions.close") }}
            </v-btn>

            <v-btn
              :loading="busy_save"
              color="primary"
              size="x-large"
              variant="elevated"
              @click="selected_element ? editElement() : addElement()"
            >
              <v-icon start>{{ selected_element ? "save" : "add" }}</v-icon>
              {{ selected_element ? "Update" : "Add new" }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import SImageUploader from "@components/ui/uploader/SImageUploader.vue";
import { FontLoader } from "@selldone/core-js/helper/font/FontLoader";
import _ from "lodash-es";
import { LMixinEvents } from "@app-page-builder/mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import { LUtilsFont } from "@app-page-builder/utils/font/LUtilsFont";

export default {
  name: "LPageEditorComponentsMenu",
  mixins: [LMixinEvents],

  components: { SImageUploader },

  props: {
    scaleDownMode: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    elements: [],

    search: "",
    sortDesc: true,
    sortBy: "created_at",
    tag: null,

    more: false,
    page: 1,
    itemsPerPage: 10,
    busy_fetch: false,

    collapse: false,

    locally_hide: false,

    dialog: false,
    selected_element: null,
    title: null,
    section: null,
    fonts: [], // Found fonts in the raw code
    tags: [],
    busy_save: false,

    busy_delete: false,
  }),

  computed: {
    shop_id() {
      return this.$route.params.shop_id;
    },
    local_show() {
      return this.$store.getters.getLandingShowElementsRepository;
    },

    show() {
      return this.local_show && !this.force_hide && !this.locally_hide;
    },
    force_hide() {
      return this.$store.getters.getLandingShowPageStyle;
    },
  },

  watch: {
    search: _.throttle(function (newVal, oldVal) {
      this.page = 1;
      this.fetchElements();
    }, window.SERACH_THROTTLE),

    local_show(value) {
      localStorage.setItem("page-builder:repository", value ? "true" : "false"); // Keep hide state!
    },

    dialog(dialog) {
      window.PAGE_BUILDER_BLOCK_LISTEN_KEYS = dialog;
    },
  },

  created() {
    this.fetchElements();

    if (localStorage.getItem("page-builder:repository") === "false") {
      this.locally_hide = false;
      this.$store.commit("setLandingShowElementsRepository", false);
    }
  },

  mounted() {
    EventBus.$on(
      "show:LPageEditorElementsRepository:Add-My-Section",

      ({ section }) => {
        this.selected_element = null;
        this.title = "My New Section";
        this.section = section;
        this.tags = [];
        this.published = true;
        this.fonts = [];
        this.onBlur(); // Find fonts

        this.dialog = true;
      },
    );
  },
  beforeUnmount() {
    EventBus.$off("show:LPageEditorElementsRepository:Add-My-Section");
  },

  methods: {
    drag(ev, item) {
      ev.dataTransfer.setData("section", item.section); // Send data as section type
    },

    loadMore() {
      if (this.busy_fetch || !this.more) return;

      this.page++;
      this.fetchElements();
    },

    fetchElements() {
      this.busy_fetch = true;
      if (this.page === 1) this.elements = [];
      axios
        .get(window.GAPI.GET_LANDING_PAGE_PUBLISHED_ELEMENTS(), {
          params: {
            tag: this.tag,

            offset: (this.page - 1) * this.itemsPerPage,
            limit: this.itemsPerPage,
            sortBy: "id", //random
            sortDesc: true,
            search: this.search,

            shop_id: this.shop_id, // Include element in this shop!
          },
        })
        .then(({ data }) => {
          this.elements.push(...data.elements);
          this.more = data.more;
        })
        .catch((error) => {
          this.showLaravelError(error);
        })
        .finally(() => {
          this.busy_fetch = false;
        });
    },

    //----------------------------------------------------------------------
    showEdit(element) {
      this.selected_element = element;
      this.title = element.title;
      this.section = element.section;
      this.tags = element.tags;
      this.published = element.published;
      this.onBlur(); // Find fonts

      this.dialog = true;
    },

    onBlur() {
      this.fonts = [];

      try {
        this.fonts = LUtilsFont.FindAllFontsInSection(JSON.parse(this.section));
        // Load fonts:
        FontLoader.LoadFonts(this.fonts);
      } catch (e) {
        console.error(e);
      }
    },

    addElement() {
      this.busy_save = true;

      axios
        .post(window.API.POST_PAGE_ELEMENTS_ADD(this.shop_id), {
          title: this.title,
          section: this.section,
          tags: this.tags,
          published: true,
        })
        .then(({ data }) => {
          if (data.error) {
            this.showErrorAlert(null, data.error_msg);
            return;
          }

          this.AddOrUpdateItemByID(this.elements, data.element, "id", false);
          this.dialog = false;
        })
        .catch((error) => {
          this.showLaravelError(error);
        })
        .finally(() => {
          this.busy_save = false;
        });
    },

    editElement() {
      this.busy_save = true;

      axios
        .put(
          window.API.PUT_PAGE_ELEMENT_EDIT(
            this.shop_id,
            this.selected_element.id,
          ),
          {
            title: this.title,
            section: this.section,
            tags: this.tags,
            published: true,
          },
        )
        .then(({ data }) => {
          if (data.error) {
            this.showErrorAlert(null, data.error_msg);
            return;
          }

          this.AddOrUpdateItemByID(this.elements, data.element);
          this.dialog = false;
        })
        .catch((error) => {
          this.showLaravelError(error);
        })
        .finally(() => {
          this.busy_save = false;
        });
    },

    deleteSection(element) {
      this.openDangerAlert(
        "Remove Page Element",
        "Are you sure to remove this element?",
        "Yes, Remove now!",
        () => {
          this.busy_delete = true;

          axios
            .delete(window.API.DELETE_PAGE_ELEMENT(this.shop_id, element.id))
            .then(({ data }) => {
              if (data.error) {
                this.showErrorAlert(null, data.error_msg);
                return;
              }

              this.DeleteItemByID(this.elements, data.id);
              this.dialog = false;
            })
            .catch((error) => {
              this.showLaravelError(error);
            })
            .finally(() => {
              this.busy_delete = false;
            });
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.r-con {
  --top: 84px;

  position: fixed;
  right: 24px;
  top: var(--top);
  width: 260px;
  max-width: 260px;
  max-height: calc(100% - var(--top));
  //min-height: 400px;
  z-index: 1;
  transition: all 0.5s ease-in-out;

  &.collapse {
    max-height: 92px;
    //min-height: unset;
  }

  @media screen and (max-width: 2200px) {
    --top: 220px;
  }

  @media screen and (max-width: 1400px) {
    right: calc(2%);
    width: calc(25% - 66px);
  }

  .label {
    position: absolute;
    padding: 6px 12px;
    font-size: 11px;
    bottom: 0;
    text-align: start;
    background: #223;
    color: #fff;
    border-radius: 12px 12px 0 0 !important;
    left: 18px;
    right: 18px;
    font-weight: 400;
    letter-spacing: 0.05em;
  }

  .r-card {
    position: relative;
    cursor: move;
    background: #223;
    padding: 8px;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: all 0.35s;

    &:hover {
      transition: all 0.2s;
      transform: translateY(-3px);
    }

    .-img {
      border-radius: 8px 8px 8px 8px;
      flex-grow: 1;
    }
  }
}
</style>
