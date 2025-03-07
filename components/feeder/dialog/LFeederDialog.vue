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
  <l-setting-navigation v-model="show_dialog">
    <v-card v-if="section_object" class="text-start">
      <!-- ████████████████████ Actions ████████████████████ -->
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="show_dialog = false">
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-text style="padding-bottom: 10vh">
        <s-setting-group
          :title="`Feeder | ${section.label}`"
          icon="donut_large"
        >
        </s-setting-group>

        <l-feeder-component :object="section_object"></l-feeder-component>
      </v-card-text>
    </v-card>
  </l-setting-navigation>
</template>

<script lang="ts">
import { LMixinEvents } from "../../../mixins/events/LMixinEvents";
import { Section } from "@selldone/page-builder/src/section/section.ts";
import LFeederComponent from "@selldone/page-builder/components/feeder/component/LFeederComponent.vue";
import LSettingNavigation from "@selldone/page-builder/settings/LSettingNavigation.vue";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import { EventBus } from "@selldone/components-vue/utils/events/EventBus.ts";
import LEventsName from "@selldone/page-builder/mixins/events/name/LEventsName.ts";

export default {
  name: "LFeederDialog",
  mixins: [LMixinEvents],
  components: {
    SSettingGroup,
    LSettingNavigation,
    LFeederComponent,
  },

  props: {},
  data: () => ({
    show_dialog: false,
    section: null as Section,

    //--------------------------
    key_listener_keydown: null,
  }),

  computed: {
    section_object() {
      return this.section?.object;
    },
  },
  watch: {},
  created() {},
  mounted() {
    EventBus.$on(
      "show:LFeederDialog",

      ({ section }) => {
        //   this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.
        if(section===this.section){
          this.show_dialog = !this.show_dialog;
        }else{
          this.show_dialog = true;
        }


        this.section = section;
        //console.log("🆎 LFeederDialog -> section", section, this.show_dialog);
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
    EventBus.$off("show:LFeederDialog");
    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
