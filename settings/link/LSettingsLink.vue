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
    <v-card v-if="show_dialog" class="text-start" flat>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="show_dialog = false">
            <v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-text>
        <s-widget-header
          :title="$t('global.commons.link')"
          icon="add_link"
        ></s-widget-header>
        <small class="my-2" style="height: unset"
          >When using absolute links, always include "https://" to ensure the
          correct path is accessed. If "https://" is omitted, the link will be
          treated as a relative path and appended to the current URL.</small
        >

        <v-text-field
          v-model="link"
          :label="$t('global.commons.url')"
          class="english-field my-3"
          clearable
          prepend-inner-icon="link"
          variant="outlined"
          @change="setLink"
        >
        </v-text-field>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import LEventsName from "../../mixins/events/name/LEventsName";
import _ from "lodash-es";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import {EventBus} from "@selldone/core-js/events/EventBus";

export default {
  name: "LSettingsLink",
  mixins: [LMixinEvents],

  components: {},

  props: {},
  data: () => ({
    el: null,
    target: null,
    keyLink: null, // ex. link

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
    EventBus.$on(
      "show:LSettingsLink",

      ({ el, target, keyLink }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.el = el;

        this.target = target;
        this.keyLink = keyLink;

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
    EventBus.$off("show:LSettingsLink");

    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showDialog() {
      this.link = this.target[this.keyLink];

      this.show_dialog = true;
    },

    //----------------------------------------------------------------------------
    setLink() {
      if (!this.show_dialog) return;

      this.target[this.keyLink] = this.link; // Save data in section!
    },
  },
};
</script>

<style lang="scss" scoped></style>
