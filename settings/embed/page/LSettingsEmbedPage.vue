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
  <!-- █████████████████████ Edit Dialog █████████████████████ -->

  <l-setting-navigation v-model="show_dialog">
    <v-card v-if="dialog_pre" class="text-start">
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="show_dialog = false">
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-text>
        <!-- ━━━━━━━━━━━━━━━━━━━━ Properties > Reset Default ━━━━━━━━━━━━━━━━━━━━ -->

        <s-setting-group
          title="Select Page"
          subtitle="Choose any existing landing-page to embed here. Its header, footer,
          and styles will automatically be inherited. When that page is updated,
          this section will update everywhere. Use the search field below to
          find or paste the ID of a landing-page. You can clear your choice at
          any time and pick another page."
        >
          <BPageInput
            v-model="target.data.page_id"
            :returnObject="false"
            clearable
            class="mt-3"
            variant="outlined"
          />
        </s-setting-group>
      </v-card-text>
    </v-card>
  </l-setting-navigation>
</template>

<script lang="ts">
import LEventsName from "../../../mixins/events/name/LEventsName";
import { LMixinEvents } from "../../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/components-vue/utils/events/EventBus.ts";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import USettingDynamic from "@selldone/page-builder/styler/settings/dynamic/USettingDynamic.vue";
import LSettingNavigation from "@selldone/page-builder/settings/LSettingNavigation.vue";
import BPageInput from "@selldone/components-vue/backoffice/page/input/BPageInput.vue";

export default {
  name: "LSettingsEmbedPage",

  mixins: [LMixinEvents],

  components: {
    LSettingNavigation,
    USettingDynamic,

    SSettingGroup,
    BPageInput,
  },
  inject: ["$builder"],
  props: {},
  data: () => ({
    el: null,
    section: null,
    target: null,

    //----------------------- Bg image -----------------------
    show_dialog: false,
    dialog_pre: false,

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {
    effect() {
      return this.target?.effect;
    },
  },
  watch: {
    show_dialog(dialog) {},
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsEmbedPage",

      ({ el, section, target }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.section = section;
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
        if (this.show_dialog) {
          // Close tools
          this.show_dialog = false;
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
      this.show_dialog = false;
    });
  },
  beforeUnmount() {
    EventBus.$off("show:LSettingsEmbedPage");
    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showDialog() {
      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.show_dialog = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
