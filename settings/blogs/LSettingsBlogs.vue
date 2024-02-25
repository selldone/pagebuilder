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
    :scrim="false"
    :width="
      $vuetify.display.xlAndUp ? 560 : $vuetify.display.lgAndUp ? 420 : 320
    "
    class="x-page-builder-options-slider"
    color="#1e1e1e"
    location="right"
    temporary
    theme="dark"
  >
    <v-card class="text-start" flat>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="dialog = false">
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-text class="pb-16">
        <!-- ████████████████████ Sort ████████████████████ -->
        <s-setting-group subtitle="Set how to sort blogs to show." title="Sort">
          <s-setting-select
            v-model="blogs_filter.sortBy"
            :items="SortKEys"
            icon="swap_vert"
            title="Sort by"
          ></s-setting-select>
          <s-setting-toggle
            v-model="blogs_filter.sortDesc"
            :items="SortDirections"
            icon="unfold_more"
            mandatory
            title="Direction"
          ></s-setting-toggle>
        </s-setting-group>

        <!-- ████████████████████ Filter ████████████████████ -->
        <s-setting-group subtitle="Filter by tags and search." title="Filter">
          <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Tags ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->
          <s-setting-combobox
            v-model="blogs_filter.tags"
            clearable
            icon="label"
            subtitle="Show blogs that include at least one of these tags."
            title="Tags"
          ></s-setting-combobox>

          <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Search ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->
          <s-setting-text-input
            v-model="blogs_filter.search"
            clearable
            icon="search"
            subtitle="Show result contains these words in their title or description."
            title="Search query"
          ></s-setting-text-input>
        </s-setting-group>

        <!-- ████████████████████ Limit ████████████████████ -->

        <s-setting-group
          subtitle="Set the limit and offset of blogs."
          title="Limit"
        >
          <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Offset ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->
          <s-setting-number-input
            v-model="blogs_filter.offset"
            :max="1000"
            :min="0"
            icon="padding"
            title="Offset"
          ></s-setting-number-input>
          <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Count ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->
          <s-setting-number-input
            v-model="blogs_filter.limit"
            :max="100"
            :min="1"
            icon="margin"
            title="Count"
          ></s-setting-number-input>
        </s-setting-group>

        <!-- ████████████████████ Appearance ████████████████████ -->

        <s-setting-group
          subtitle="Customize blog card style."
          title="Appearance"
        >
          <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Flat ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->
          <s-setting-toggle
            v-model="blogs_filter.style.flat"
            :items="[
              { title: 'Flat', icon: 'layers_clear', value: false },
              { title: 'Elevated', icon: 'layers', value: true },
            ]"
            icon="layers"
            title="Elevated"
          ></s-setting-toggle>

          <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Corner ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->
          <s-setting-toggle
            v-model="blogs_filter.style.rounded"
            :items="[
              { title: 'Rect', icon: 'crop_square', value: 0 },
              { title: 'Xl', icon: 'rounded_corner', value: 'xl' },
              { title: 'Lg', icon: 'rounded_corner', value: 'lg' },
              { title: 'Md', icon: 'rounded_corner', value: 'md' },
              { title: 'Sm', icon: 'rounded_corner', value: 'sm' },
            ]"
            icon="rounded_corner"
            title="Corner"
          ></s-setting-toggle>

          <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Dark ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->
          <s-setting-switch
            v-model="blogs_filter.style.dark"
            icon="dark_mode"
            title="Dark"
          ></s-setting-switch>
          <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Color ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->
          <s-setting-color
            v-model="blogs_filter.style.color"
            clearable
            icon="palette"
            title="Card color"
          ></s-setting-color>
        </s-setting-group>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import LEventsName from "@app-page-builder/mixins/events/name/LEventsName";
import _, { isNumber } from "lodash-es";
import SSettingGroup from "@app-page-builder/styler/settings/group/SSettingGroup.vue";
import SSettingSelect from "@app-page-builder/styler/settings/select/SSettingSelect.vue";
import SSettingToggle from "@app-page-builder/styler/settings/toggle/SSettingToggle.vue";
import SSettingCombobox from "@app-page-builder/styler/settings/combobox/SSettingCombobox.vue";
import SSettingTextInput from "@app-page-builder/styler/settings/text-input/SSettingTextInput.vue";
import SSettingNumberInput from "@app-page-builder/styler/settings/number-input/SSettingNumberInput.vue";
import SSettingSwitch from "@app-page-builder/styler/settings/switch/SSettingSwitch.vue";
import SSettingColor from "@app-page-builder/styler/settings/color/SSettingColor.vue";
import { LMixinEvents } from "@app-page-builder/mixins/events/LMixinEvents";
import {EventBus} from "@core/events/EventBus";

export default {
  name: "LSettingsBlogs",
  mixins: [LMixinEvents],

  components: {
    SSettingColor,
    SSettingSwitch,
    SSettingNumberInput,
    SSettingTextInput,
    SSettingCombobox,
    SSettingToggle,
    SSettingSelect,
    SSettingGroup,
  },

  props: {},
  data: () => ({
    tab: null,

    el: null,
    target: null,
    keyFilter: null, // ex. blogs_filter

    //----------------------- Products Filter -----------------------

    dialog: false,

    blogs_filter: { style: {} },

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {
    SortKEys() {
      return [
        {
          title: this.$t("global.sort.title"),
          value: "title",
          icon: "article",
        },
        { title: this.$t("global.sort.like"), value: "like", icon: "favorite" },
        {
          title: this.$t("global.commons.comments"),
          value: "comments_count",
          icon: "chat_bubble",
        },
        {
          title: this.$t("global.commons.views"),
          value: "views",
          icon: "visibility",
        },

        {
          title: this.$t("global.sort.created_at"),
          value: "created_at",
          icon: "note_add",
        },
        {
          title: this.$t("global.sort.updated_at"),
          value: "updated_at",
          icon: "rate_review",
        },
      ];
    },

    SortDirections() {
      return [
        { title: "Ascending", icon: "keyboard_double_arrow_up", value: false },
        {
          title: "Descending",
          icon: "keyboard_double_arrow_down",
          value: true,
        },
      ];
    },
  },
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
    EventBus.$on(
      "show:LSettingsBlogs",

      ({ el, target, keyFilter }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.target = target;
        this.keyFilter = keyFilter;
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
    EventBus.$on(LEventsName.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.dialog = false;
    });
  },
  beforeUnmount() {
    EventBus.$off("show:LSettingsBlogs");

    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showProductsDialog() {
      this.blogs_filter = this.target[this.keyFilter];

      if (!this.isObject(this.blogs_filter)) {
        this.blogs_filter = {};
      }
      if (!this.isObject(this.blogs_filter.style)) {
        this.blogs_filter.style = {
          flat: false,
          rounded: "xl",
          dark: false,
          color: null,
        };
      }

      if (!isNumber(this.blogs_filter.offset)) this.blogs_filter.offset = 0;
      if (!isNumber(this.blogs_filter.limit) || !this.blogs_filter.limit)
        this.blogs_filter.limit = 4;

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

      this.target[this.keyFilter] = Object.assign({}, this.blogs_filter); // Save data in section!

      /// this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
