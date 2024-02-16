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
  <v-navigation-drawer
    v-model="dialog"
    theme="dark"
    location="right"
    temporary
    :width="$vuetify.display.xlAndUp ? 560 : $vuetify.display.lgAndUp ? 420 : 320"
    :scrim="false"
    color="#1e1e1e"
    class="x-page-builder-options-slider"
  >
    <v-card flat class="text-start">
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn variant="text" @click="dialog = false" size="x-large">
            <v-icon class="me-1">close</v-icon
            >{{ $t("global.actions.close") }}</v-btn
          >
        </div>
      </v-card-actions>

      <v-card-text>
        <v-expansion-panels flat v-model="tab">
          <!-- ████████████████████ Sort ████████████████████ -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div>
                <div><v-icon class="me-1">sort</v-icon> Sort</div>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list-subheader
                >Set how to sort blogs to show.</v-list-subheader
              >

              <v-row class="my-2">
                <v-btn-toggle
                  mandatory
                  v-model="blogs_filter.sortBy"
                  selected-class="blue-flat"
                  class="overflow-auto px-0 my-2"
                  dark
                >
                  <v-btn
                    v-for="val in keys"
                    :key="val.value"
                    :value="val.value"
                    class="tnt"
                  >
                    <v-icon v-if="val.icon" size="small" class="me-1">{{
                      val.icon
                    }}</v-icon>
                    {{ $t(val.label) }}
                  </v-btn>
                </v-btn-toggle>

                <v-btn-toggle
                  mandatory
                  v-model="blogs_filter.sortDesc"
                  selected-class="blue-flat"
                  class="my-2"
                  dark
                >
                  <v-btn :value="true" title="Descending">
                    <v-icon>keyboard_arrow_down</v-icon>
                  </v-btn>
                  <v-btn :value="false" title="Ascending">
                    <v-icon>keyboard_arrow_up</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- ████████████████████ Filter ████████████████████ -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div>
                <div><v-icon class="me-1">filter_alt</v-icon> Filter</div>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list-subheader>Filter by tags and search.</v-list-subheader>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Tags ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <v-combobox
                chips
                class="my-3 max-width-field mx-auto"
                v-model="blogs_filter.tags"
                multiple
                label="Tags"
                clearable
                messages="Show blogs that include at least one of these tags."
                item-color="primary"
              ></v-combobox>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Search ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <v-text-field
                class="my-3 max-width-field mx-auto"
                v-model="blogs_filter.search"
                label="Search query"
                show-buttons
                messages="Show result contains these words in their title or description."
              ></v-text-field>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- ████████████████████ Limit ████████████████████ -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div>
                <div><v-icon class="me-1">margin</v-icon> Limit</div>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list-subheader>Set the limit of blogs.</v-list-subheader>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Offset ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <s-number-input
                class="my-3 max-width-field mx-auto"
                v-model="blogs_filter.offset"
                label="Offset"
                :min="0"
                :step="1"
                show-buttons
                messages="Max items count"
              ></s-number-input>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Count ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <s-number-input
                class="my-3 max-width-field mx-auto"
                v-model="blogs_filter.limit"
                label="Count"
                :min="1"
                :step="1"
                :max="24"
                clearable
                messages="Max items count"
              ></s-number-input>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- ████████████████████ Appearance ████████████████████ -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div>
                <div><v-icon class="me-1">brush</v-icon> Appearance</div>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list-subheader>Customize blog card style.</v-list-subheader>

              <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Flat ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->

              <s-smart-toggle
                class="my-3"
                v-model="blogs_filter.style.flat"
                @change="$forceUpdate()"
                true-title="Flat - No shadow"
                false-title="Elevated"
                true-icon="layers_clear"
                false-icon="layers"
              ></s-smart-toggle>

              <s-smart-toggle
                class="my-3"
                v-model="blogs_filter.style.rect"
                @change="$forceUpdate()"
                true-title="Rect Corner"
                false-title="Rounded Corner"
                true-icon="crop_square"
                false-icon="rounded_corner"
              ></s-smart-toggle>

              <s-smart-toggle
                class="my-3"
                v-model="blogs_filter.style.dark"
                @change="$forceUpdate()"
                true-title="Dark Mode"
                false-title="Light Mode"
                true-icon="dark_mode"
                false-icon="light_mode"
              ></s-smart-toggle>

              <s-color-selector
                class="my-3"
                title="Card Color"
                v-model="blogs_filter.style.color"
                @change="$forceUpdate()"
                nullable
              ></s-color-selector>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import SNumberInput from "@components/ui/input/number/SNumberInput.vue";
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import SSmartToggle from "@components/smart/SSmartToggle.vue";
import SColorSelector from "@components/ui/color/selector/SColorSelector.vue";
import _ from "lodash-es";
import PageEventBusMixin from "@app-page-builder/mixins/PageEventBusMixin";
export default {
  name: "GlobalBlogsFilterDialog",
  mixins: [PageEventBusMixin],

  components: {
    SColorSelector,
    SSmartToggle,
    SNumberInput,
  },

  props: {},
  data: () => ({
    tab: null,

    el: null,
    section: null,
    blogsPath: null, // $sectionData.products

    //----------------------- Products Filter -----------------------

    dialog: false,

    blogs_filter: { style: {} },

    keys: [
      { label: "global.sort.title", value: "title" },
      { label: "global.sort.like", value: "like", icon: "favorite" },
      {
        label: "global.commons.comments",
        value: "comments_count",
        icon: "chat_bubble",
      },
      { label: "global.commons.views", value: "views", icon: "visibility" },

      { label: "global.sort.created_at", value: "created_at", icon: "" },
      { label: "global.sort.updated_at", value: "updated_at", icon: "" },
    ],

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {},
  watch: {
    blogs_filter: {
      handler() {
        this.onAcceptDebounced();
      },
      deep: true,
    },
  },
  created() {},
  mounted() {
    this.EventBus.$on(
      "show:GlobalBlogsFilterDialog",

      ({ el, section, blogsPath }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.section = section;
        this.blogsPath = blogsPath;
        this.showProductsDialog();
      },
    );

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――
    this.key_listener_keydown = (event) => {
      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        if (this.dialog) {
          // Close tools
          this.dialog = false;
          event.preventDefault();
          return false;
        }
      }
    };
    document.addEventListener("keydown", this.key_listener_keydown, true);
    //――――――――――――――――――――――  END Editor key listener ――――――――――――――――――――

    //█████████████████████████████████████████████████████████████
    //――――――――――――――― Event Bus ――――――――――――――――
    //█████████████████████████████████████████████████████████████
    // Listen for show loading data from server
    this.EventBus.$on(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.dialog = false;
    });
  },
  beforeUnmount() {
    this.EventBus.$off("show:GlobalBlogsFilterDialog");

    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showProductsDialog() {
      this.blogs_filter = this.section.get(this.blogsPath);

      if (!this.isObject(this.blogs_filter)) {
        this.blogs_filter = {};
      }
      if (!this.isObject(this.blogs_filter.style)) {
        this.blogs_filter.style = {
          flat: false,
          rect: false,
          dark: false,
          color: null,
        };
      }

      this.dialog = true;
      this.$nextTick(() => {
        this.LOCK = false; // 🔓 Now can update values
      });
    },

    //----------------------------------------------------------------------------
    onAcceptDebounced: _.debounce(function () {
      this.onAccept(false);
    }, 3000),

    onAccept() {
      if (!this.dialog || this.LOCK) return;

      this.section?.set(this.blogsPath, Object.assign({}, this.blogs_filter)); // Save data in section!

      /// this.dialog = false;
    },
  },
};
</script>

<style scoped lang="scss"></style>
