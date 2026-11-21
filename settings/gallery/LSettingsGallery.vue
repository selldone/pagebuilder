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
  <l-setting-navigation v-model="show_edit_slide">
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
            <s-setting-button
              label="Add Slide"
              icon="add_box"
              @click="addSlide"
            >
            </s-setting-button>
          </template>
        </s-setting-group>

        <v-expansion-panels variant="accordion">
          <draggable
            v-model="target.children"
            handle=".handle"
            tag="div"
            class="flex-grow-1 border-between-vertical"
            animation="200"
            ghostClass="bg-primary"
          >
            <template v-slot:item="{ element, index }">
              <l-settings-gallery-slide
                v-if="isSlideComponent(element)"
                :object="element"
                @click:delete="removeSlide(index)"
                :label="`Slide ${index + 1}`"
              >
              </l-settings-gallery-slide>

              <div v-else class="pa-2 text-subtitle-2">
                {{ element.component }}
              </div>
            </template>
          </draggable>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </l-setting-navigation>
</template>

<script lang="ts">
import LEventsName from "../../mixins/events/name/LEventsName";
import { LUtilsHighlight } from "../../utils/highligh/LUtilsHighlight";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import { EventBus } from "@selldone/components-vue/utils/events/EventBus.ts";
import { XGalleryExpandableItemObject } from "@selldone/page-builder/components/x/gallery-expandable/item/XGalleryExpandableItemObject.ts";
import LSettingsGallerySlide from "@selldone/page-builder/settings/gallery/slide/LSettingsGallerySlide.vue";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import SSettingButton from "@selldone/page-builder/styler/settings/button/SSettingButton.vue";
import LSettingNavigation from "@selldone/page-builder/settings/LSettingNavigation.vue";
import { defineAsyncComponent } from "vue";
import NotificationService from "@selldone/components-vue/plugins/notification/NotificationService.ts";

export default {
  name: "LSettingsGallery",

  mixins: [LMixinEvents],

  components: {
    LSettingNavigation,
    SSettingButton,
    draggable: defineAsyncComponent(() => import("@selldone/components-vue/ui/sortable/USortableList.ts")),
    SSettingGroup,
    LSettingsGallerySlide,
  },
  props: {},
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

    isSlideComponent(child) {
      return child instanceof XGalleryExpandableItemObject;
    },
    addSlide() {
      this.target.addChild(XGalleryExpandableItemObject.Seed());
    },

    removeSlide(index) {
      NotificationService.openDeleteAlert(() => {
        this.target.children.splice(index, 1);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
