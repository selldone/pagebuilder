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
    v-model="show_dialog"
    dark
    location="right"
    fixed
    :width="$vuetify.display.xl ? 560 : $vuetify.display.lgAndUp ? 420 : 320"
    stateless
    :scrim="false"
    color="#1e1e1e"
    class="x-page-builder-options-slider"
  >
    <v-card v-if="show_dialog" class="text-start" flat>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn
            variant="text"
            @click="show_dialog = false"
            color="primary"
            size="x-large"
          >
            <v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}</v-btn
          >
        </div>
      </v-card-actions>

      <v-card-text>
        <s-widget-header
          :title="$t('global.commons.link')"
          icon="add_link"
        ></s-widget-header>
        <small style="height: unset" class="my-2"
          >When using absolute links, always include "https://" to ensure the
          correct path is accessed. If "https://" is omitted, the link will be
          treated as a relative path and appended to the current URL.</small
        >

        <v-text-field
          variant="outlined"
          :label="$t('global.commons.url')"
          v-model="link"
          class="english-field my-3"
          append-icon="link"
          clearable
          @change="setLink"
        >
        </v-text-field>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import _ from "lodash-es";
import PageEventBusMixin from "@app-page-builder/mixins/PageEventBusMixin";

export default {
  name: "GlobalLinkEditorDialog",
  mixins: [PageEventBusMixin],

  components: {},

  props: {},
  data: () => ({
    el: null,
    section: null,
    urlPath: null, // $sectionData.url

    // ---------------------------------
    show_dialog: false,

    link: null,

    //--------------------------
    key_listener_keydown: null,
  }),

  computed: {},

  watch: {
    show_dialog(val) {
      if (!val)
        // Reset after close!
        _.delay(() => {
          this.resetToDefault(); // 🞇 Reset to default
        }, 300);
    },
  },
  created() {},
  mounted() {
    this.EventBus.$on(
      "show:GlobalLinkEditorDialog",

      ({ el, section, urlPath }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.el = el;

        this.section = section;
        this.urlPath = urlPath;

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
    this.EventBus.$on(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.show_dialog = false;
    });
  },
  beforeUnmount() {
    this.EventBus.$off("show:GlobalLinkEditorDialog");

    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showDialog() {
      this.link = this.section.get(this.urlPath);

      this.show_dialog = true;
    },

    //----------------------------------------------------------------------------
    setLink() {
      if (!this.show_dialog) return;

      this.section?.set(this.urlPath, this.link); // Save data in section!
      //this.show_dialog = false;
    },
  },
};
</script>

<style scoped lang="scss"></style>
