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
        $vuetify.display.xlAndUp ? 560 : $vuetify.display.lgAndUp ? 420 : 320
      "
      class="x-page-builder-options-slider"
      color="#1e1e1e"
      location="left"
      temporary
      theme="dark"
    >
      <v-card class="text-start" flat style="padding-bottom: 10vh">
        <!-- ████████████████████ Actions ████████████████████ -->

        <v-card-actions>
          <div class="widget-buttons">
            <v-btn size="x-large" variant="text" @click="dialog = false">
              <v-icon class="me-1">close</v-icon>
              {{ $t("global.actions.close") }}
            </v-btn>
          </div>
        </v-card-actions>

        <!-- ████████████████████ Hierarchy ████████████████████ -->

        <v-treeview
            :items="items"
            density="compact"
        ></v-treeview>


      </v-card>
    </v-navigation-drawer>
  </teleport>
</template>

<script>
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";

export default {
  name: "LSettingsHierarchy",
  mixins: [LMixinEvents],
  components: {},

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
    items(){

      console.log('sections', this.sections)
      return [];
      return this.sections.map(section => {
        return {
          id: section.id,
          title: section.name,
          children: section.columns.map(child => {
            return {
              id: child.id,
              title: child.name,

            }
          })
        }
      })
    }
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

  methods: {},
};
</script>

<style lang="scss" scoped></style>
