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
  <teleport to=".v-main">
    <v-navigation-drawer
      v-model="dialog"
      :scrim="false"
      :width="
        $vuetify.display.xlAndUp ? 420 : $vuetify.display.lgAndUp ? 360 : 320
      "
      class="x-page-builder-options-slider"
      color="#1e1e1e"
      location="left"
      temporary
      theme="dark"
    >
      <v-card class="text-start" flat style="padding-bottom: 10vh;">
        <!-- ████████████████████ Actions ████████████████████ -->

        <div style="position: fixed;left: 0;right: 0;background-color: #1e1e1e99;backdrop-filter: blur(4px);z-index: 5">
          <div class="widget-buttons" >
            <v-btn size="x-large" variant="text" @click="dialog = false">
              <v-icon class="me-1">close</v-icon>
              {{ $t("global.actions.close") }}
            </v-btn>
          </div>
        </div>

        <!-- ████████████████████ Hierarchy ████████████████████ -->
        <h2 class="px-2" style="margin-top: 120px">Hierarchy</h2>

        <l-settings-hierarchy-item v-for="(section,index) in sections" :key="index"  :object="section.object" class="mx-2"




        >
        </l-settings-hierarchy-item>


      </v-card>
    </v-navigation-drawer>
  </teleport>
</template>

<script>
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import LSettingsHierarchyItem from "@selldone/page-builder/settings/hierarchy/item/LSettingsHierarchyItem.vue";

export default {
  name: "LSettingsHierarchy",
  mixins: [LMixinEvents],
  components: {LSettingsHierarchyItem},

  props: {
    builder: { type: Object, required: true },
  },
  data: () => ({
    dialog: false,
    callback: null,
  }),

  computed: {
    sections() {
      return this.builder.sections;
    },

  },

  watch: {
    dialog() {
      if (this.callback) {
        this.callback(this.dialog);
      }
    },
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsHierarchy",

      ({ show, callback }) => {
        this.dialog = show;
        this.callback = callback;
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
  },
  beforeUnmount() {
    EventBus.$off("show:LSettingsClassStyle");

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {

  },
};
</script>

<style lang="scss" scoped></style>
