<!--
  - Copyright (c) 2024. Selldone® Business OS™
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
  <v-sheet
    color="#222"
    class="l--page-editor-side-menu no-inv overflow-hidden"
    :class="{
      'is-visible': isVisible,
      '-scroll-down': isScrollDown,
      '-dragged': is_dragged,
      '-small': $vuetify.display.xs,
    }"
    :width="!tab ? 58 : width"
  >
    <div class="l-buttons">

      <v-btn
          variant="text"
          min-width="46"
          min-height="46"
          rounded="lg"
          class="ma-1"
          @click="toggle('navigation')"
      >
        <v-icon> account_tree</v-icon>
        <v-tooltip activator="parent">
          {{ $t("page_builder.design.tools.hierarchy") }}
        </v-tooltip>
      </v-btn>

      <v-btn
        variant="text"
        min-width="46"
        min-height="46"
        rounded="lg"
        class="ma-1"
        @click="toggle('sections')"
      >
        <v-icon> grid_view</v-icon>
        <v-tooltip activator="parent"> Sections</v-tooltip>
      </v-btn>

      <v-btn
          variant="text"
          min-width="46"
          min-height="46"
          rounded="lg"
          class="ma-1"
          @click="toggle('elements')"
      >
        <v-icon>yard</v-icon>
        <v-tooltip activator="parent"> Elements</v-tooltip>
      </v-btn>
    </div>

    <div class="l-window overflow-auto thin-scroll">
      <v-tabs-window :model-value="tab">


        <v-tabs-window-item
          value="navigation"
          eager
          :style="{ width: min_width_window + 'px' }"
        >
          <l-settings-hierarchy :builder="builder"></l-settings-hierarchy>
        </v-tabs-window-item>

        <v-tabs-window-item
            value="sections"
            eager
            :style="{ width: min_width_window + 'px' }"
        >
          <l-page-editor-components-menu
              :builder="builder"
              @update:is-dragged="(val) => (is_dragged = val)"
          ></l-page-editor-components-menu>
        </v-tabs-window-item>
        <v-tabs-window-item
            value="elements"
            eager
            :style="{ width: min_width_window + 'px' }"
        >
          <LPageEditorElementsMenu
              :builder="builder"
              @update:is-dragged="(val) => (is_dragged = val)"
          ></LPageEditorElementsMenu>
        </v-tabs-window-item>

      </v-tabs-window>
    </div>
  </v-sheet>
</template>

<script>
import { defineComponent, inject } from "vue";
import LSettingsHierarchy from "@selldone/page-builder/settings/hierarchy/LSettingsHierarchy.vue";
import LPageEditorComponentsMenu from "@selldone/page-builder/page/editor/components-menu/LPageEditorComponentsMenu.vue";
import LPageEditorElementsMenu from "@selldone/page-builder/page/editor/elements-menu/LPageEditorElementsMenu.vue";

export default defineComponent({
  name: "LPageEditorSideMenu",
  components: { LPageEditorComponentsMenu, LSettingsHierarchy ,LPageEditorElementsMenu},

  props: {
    isVisible: Boolean,
    isScrollDown: Boolean,
  },

  data: () => ({
    tab: "sections",
    is_dragged: false,
  }),

  computed: {
    builder() {
      // Get builder from main page editor/viewer
      return inject("$builder");
    },

    width() {
      return this.$vuetify.display.xlAndUp
        ? 320
        : this.$vuetify.display.lgAndUp
          ? 300
          : 240;
    },
    min_width_window() {
      return this.width - 58;
    },
  },

  methods: {
    toggle(tab) {
      this.tab = this.tab === tab ? null : tab;
    },
  },
});
</script>

<style scoped lang="scss">
.l--page-editor-side-menu {
  display: flex;
  position: fixed;

  z-index: 999;
  text-align: start;

  top: 74px;
  left: 24px;
  bottom: 24px;

  border-radius: 14px;

  .l-buttons {
    display: flex;
    flex-direction: column;
    padding: 4px 0;
    border-right: solid thin #000;
  }

  .l-window {
    flex-grow: 1;
    transition: all 0.4s;
  }

  transition: all 0.2s ease-in-out;
  opacity: 0;
  transform: translateX(-200px);

  &.is-visible {
    opacity: 1;
    transform: translateX(0);
  }

  @media only screen and (max-width: 2100px) {
    // Ultra-wide mode
    top: 220px;

    &.-dragged {
      // Hide on dragged
      transform: translateX(-100%);
    }

    &.-scroll-down {
      top: 24px;
    }
  }

  .-group {
    .-group-body {
      max-width: 160px;

      .-item-element {
        position: relative;
        cursor: pointer;
        user-select: none;

        .-item-image {
          height: 24px;
          margin: 2px;
          pointer-events: none;
        }

        transition: all 0.35s !important;

        &:hover {
          box-shadow: 0px 10px 50px 0px rgba(0, 0, 0, 0.2);
        }
      }
    }

    .-group-header {
      margin-top: 0.6rem;

      font-size: 0.7em;
      text-transform: uppercase;
      margin-bottom: 4px;
      font-weight: 800;
      display: block;
    }
  }
}
</style>
