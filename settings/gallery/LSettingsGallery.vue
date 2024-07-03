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
    v-model="show_edit_slide"
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
    <v-card class="text-start pb-16" flat>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="show_edit_slide = false">
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-text v-if="dialog_pre">
        <!-- ████████████████████ Slides ████████████████████ -->

        <s-setting-group
          title="Slides"
          icon="layers"
          subtitle="List of slides in the gallery. Click on a slide to edit it."
        >
          <template v-slot:title-action>
            <v-btn
              @click="addSlide"
              prepend-icon="add_box"
              color="#1976D2"
              variant="elevated"
            >
              Add Slide
            </v-btn>
          </template>
        </s-setting-group>

        <v-expansion-panels>
          <l-settings-gallery-slide
            v-for="(item, i) in slides"
            :key="i"
            :builder="builder"
            :object="item"
            @click:delete="removeSlide(i)"
          >
          </l-settings-gallery-slide>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script lang="ts">
import LEventsName from "../../mixins/events/name/LEventsName";
import { LUtilsHighlight } from "../../utils/highligh/LUtilsHighlight";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/core-js/events/EventBus";
import { XGalleryExpandableItemObject } from "@selldone/page-builder/components/x/gallery-expandable/item/XGalleryExpandableItemObject.ts";
import LSettingsGallerySlide from "@selldone/page-builder/settings/gallery/slide/LSettingsGallerySlide.vue";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";

export default {
  name: "LSettingsGallery",

  mixins: [LMixinEvents],

  components: {
    SSettingGroup,
    LSettingsGallerySlide,
  },

  props: {
    builder: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      el: null as HTMLElement | null,
      section: null,
      target: null as XGalleryExpandableObject | null,

      // ----------------------- Bg image -----------------------
      show_edit_slide: false,
      dialog_pre: false,

      // --------------------------
      key_listener_keydown: null,

      LOCK: false, // 🔐 Lock changes
    };
  },

  computed: {
    slides() {
      return this.target.children.filter(
        (c) => c instanceof XGalleryExpandableItemObject,
      );
    },
  },
  watch: {
    show_edit_slide(dialog) {
      // Keep highlight active element:
      if (!dialog) LUtilsHighlight.RemoveAllElementFocusEditing();
      else if (this.el) LUtilsHighlight.Activate(this.el);
    },
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsGallery",

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
        if (this.show_edit_slide) {
          // Close tools
          this.show_edit_slide = false;
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
      this.show_edit_slide = false;
    });
  },
  beforeUnmount() {
    EventBus.$off("show:LSettingsGallery");
    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    showDialog() {
      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.show_edit_slide = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },
    //----------------------------------------------------------------------------

    addSlide() {
      this.target.addChild(XGalleryExpandableItemObject.Seed());
    },

    removeSlide(index) {
      this.openDeleteAlert(() => {
        this.target.children.splice(index, 1);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
