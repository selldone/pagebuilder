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
  <l-setting-navigation v-model="dialog">
    <v-card class="text-start" flat>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="dialog = false">
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-text v-if="target" class="pb-16">
        <!-- ████████████████████ Sort ████████████████████ -->
        <s-setting-group subtitle="Set how to sort blogs to show." title="Sort">
          <s-setting-select
            v-model="target.data.filter.sortBy"
            :items="SortKEys"
            icon="swap_vert"
            label="Sort by"
          ></s-setting-select>
          <s-setting-toggle
            v-model="target.data.filter.sortDesc"
            :items="SortDirections"
            icon="unfold_more"
            mandatory
            label="Direction"
          ></s-setting-toggle>
        </s-setting-group>

        <!-- ████████████████████ Filter ████████████████████ -->
        <s-setting-group subtitle="Filter by tags and search." title="Filter">
          <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Tags ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->
          <s-setting-combobox
            v-model="target.data.filter.tags"
            clearable
            icon="label"
            subtitle="Show blogs that include at least one of these tags."
            title="Tags"
          ></s-setting-combobox>

          <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Search ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->
          <s-setting-text-input
            v-model="target.data.filter.search"
            clearable
            icon="search"
            subtitle="Show result contains these words in their title or description."
            label="Query"
            placeholder="Write search text..."
          ></s-setting-text-input>
        </s-setting-group>

        <!-- ████████████████████ Limit ████████████████████ -->

        <s-setting-group
          subtitle="Set the limit and offset of blogs."
          title="Limit"
        >
          <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Offset ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->
          <s-setting-number-input
            v-model="target.data.filter.offset"
            :max="1000"
            :min="0"
            icon="padding"
            label="Offset"
          ></s-setting-number-input>
          <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Count ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->
          <s-setting-number-input
            v-model="target.data.filter.limit"
            :max="100"
            :min="1"
            icon="margin"
            label="Count"
          ></s-setting-number-input>
        </s-setting-group>

        <!-- ████████████████████ Appearance ████████████████████ -->

        <s-setting-group
          subtitle="Customize blog card style."
          title="Appearance"
        >
          <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Flat ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->
          <s-setting-toggle
            v-model="target.data.card.flat"
            :items="[
              { title: 'Flat', icon: 'layers_clear', value: true },
              { title: 'Elevated', icon: 'layers', value: false },
            ]"
            icon="layers"
            label="Elevated"
          ></s-setting-toggle>
          <v-expand-transition>
          <div     v-if="!target.data.card.flat">
            <s-setting-number-input

                v-model="target.data.card.elevation"
                :min="0"
                :max="16"
            >
            </s-setting-number-input>
          </div>
          </v-expand-transition>

          <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Corner ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->
          <s-setting-toggle
            v-model="target.data.card.rounded"
            :items="[
              { title: 'Rect', icon: 'crop_square', value: 0 },
              { title: 'Xl', icon: 'rounded_corner', value: 'xl' },
              { title: 'Lg', icon: 'rounded_corner', value: 'lg' },
              { title: 'Md', icon: 'rounded_corner', value: 'md' },
              { title: 'Sm', icon: 'rounded_corner', value: 'sm' },
            ]"
            icon="rounded_corner"
            label="Corner"
          ></s-setting-toggle>

          <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Dark ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->
          <s-setting-switch
            v-model="target.data.card.dark"
            icon="dark_mode"
            label="Dark"
          ></s-setting-switch>
          <!-- ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ Color ▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅▅ -->
          <s-setting-color
            v-model="target.data.card.color"
            clearable
            icon="palette"
            label="Card color"
          ></s-setting-color>
        </s-setting-group>

        <l-settings-style-grid
          v-model:grid="target.data.grid"
          :expandable="false"
        >
        </l-settings-style-grid>
      </v-card-text>
    </v-card>
  </l-setting-navigation>
</template>

<script lang="ts">
import LEventsName from "../../mixins/events/name/LEventsName";
import { isNumber, isObject } from "lodash-es";
import SSettingGroup from "../../styler/settings/group/SSettingGroup.vue";
import SSettingSelect from "../../styler/settings/select/SSettingSelect.vue";
import SSettingToggle from "../../styler/settings/toggle/SSettingToggle.vue";
import SSettingCombobox from "../../styler/settings/combobox/SSettingCombobox.vue";
import SSettingTextInput from "../../styler/settings/text-input/SSettingTextInput.vue";
import SSettingNumberInput from "../../styler/settings/number-input/SSettingNumberInput.vue";
import SSettingSwitch from "../../styler/settings/switch/SSettingSwitch.vue";
import SSettingColor from "../../styler/settings/color/SSettingColor.vue";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import LSettingNavigation from "@selldone/page-builder/settings/LSettingNavigation.vue";
import LSettingsStyleGrid from "@selldone/page-builder/settings/style/grid/LSettingsStyleGrid.vue";
import {LModelElement} from "@selldone/page-builder/models/element/LModelElement.ts";
import {XFeederBlogsObject} from "@selldone/page-builder/components/x/feeder/blogs/XFeederBlogsObject.ts";

export default {
  name: "LSettingsBlogs",
  mixins: [LMixinEvents],

  components: {
    LSettingsStyleGrid,
    LSettingNavigation,
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
    target: null as XFeederBlogsObject,

    //----------------------- Products Filter -----------------------

    dialog: false,

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
  watch: {},
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsBlogs",

      ({ el, target }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.target = target;
        this.showDialog();
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
    showDialog() {
      if (!isObject(this.target.data.filter)) {
        this.target.data.filter = {};
      }
      if (!isObject(this.target.data.card)) {
        this.target.data.card = {};
      }

      if (!isNumber(this.target.data.filter.offset))
        this.target.data.filter.offset = 0;
      if (
        !isNumber(this.target.data.filter.limit) ||
        !this.target.data.filter.limit
      )
        this.target.data.filter.limit = 4;

      this.dialog = true;
      this.$nextTick(() => {
        this.LOCK = false; // 🔓 Now can update values
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
