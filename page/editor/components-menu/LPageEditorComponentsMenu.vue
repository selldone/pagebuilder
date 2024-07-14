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
  <!-- ████████████████████ Toolbar ████████████████████ -->

  <v-toolbar
    density="compact"
    color="#222"
    height="52"
    style="border-bottom: solid #111 thin"
  >
    <v-toolbar-title style="font-size: 12px"><b>Sections</b></v-toolbar-title>
  </v-toolbar>

  <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆  List ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
  <div ref="menu" class="l--page-editor-components-menu">
    <div
      class="-groups border-between-vertical mx-2"
      style="--border-color: #000"
    >
      <div v-for="(group, name) in groups" :key="name" class="-group mb-2 pb-3">
        <div class="-group-header">
          {{ name }}
        </div>
        <v-row class="-group-body px-2" dense justify="space-around">
          <span
            v-for="(item, index) in group"
            :key="index"
            v-attach:seed="
              () => {
                return { object: item.Seed(), label: item.label };
              } /*Use in drop*/
            "
            class="-item-element hover-scale-small"
            draggable="true"
            @mouseenter="(e) => showMenu(e, item)"
            @mouseleave="hideMenu()"
          >
            <img v-if="item.cover" :src="item.cover" class="-item-image" />
          </span>
        </v-row>
      </div>
    </div>
  </div>

  <!-- Side help menu -->
  <v-menu
    v-if="hover_section?.help"
    v-model="show_element_info"
    :offset="36"
    :target="hover_element"
    absolute
    content-class="pen"
    location="right"
    max-width="420"
    width="300"
  >
    <v-sheet color="#000">
      <v-responsive v-if="hover_section.help.video" :aspect-ratio="1920 / 1080">
        <video
          :key="hover_section.help.video"
          autoplay
          loop
          muted
          playsinline
          width="100%"
        >
          <source
            :src="hover_section.help.video"
            :type="VideoHelper.GetMime(hover_section.help.video)"
          />
        </video>
      </v-responsive>

      <v-img
        v-else-if="hover_section.help.image"
        :src="hover_section.help.image"
      ></v-img>

      <div v-if="hover_section.help.title" class="pa-3 text-start small">
        <b class="d-block text-capitalize">
          {{ hover_section.label }}
        </b>
        {{ hover_section.help.title }}
      </div>
    </v-sheet>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sortable from "sortablejs";
import { VideoHelper } from "@selldone/core-js/helper/video/VideoHelper";
import Builder from "@selldone/page-builder/Builder.ts";
import { DefaultSections } from "@selldone/page-builder/sections/DefaultSections.ts";
import AttachDirective from "@selldone/page-builder/directives/AttachDirective.ts";

export default defineComponent({
  name: "SLandingEditorComponentsMenu",
  emits: ["update:isDragged"],
  directives: {
    attach: AttachDirective,
  },
  props: {
    builder: { type: Builder, required: true },
  },
  data() {
    return {
      VideoHelper: VideoHelper,

      expanded: 0,
      groups: {},

      sortables_group: [],

      //-------------------
      show_element_info: false,
      hover_section: null,
      hover_element: null,
    };
  },
  created() {
    this.generateGroups();
  },

  mounted() {
    const groups = this.$refs.menu.querySelectorAll(".-group-body");
    const _self = this;
    groups.forEach((group) => {
      const sortable = Sortable.create(group, {
        group: {
          name: "sections-group",
          put: false,
          pull: "clone",
        },
        sort: false,

        onStart: function (/**Event*/ evt) {
          _self.setDragMode(true);
          _self.hideMenu();
        },
        // Element dragging ended
        onEnd: function (/**Event*/ evt) {
          _self.setDragMode(false);
        },
      });

      this.sortables_group.push(sortable);
    });
  },
  beforeUnmount() {
    try {
      this.sortables_group.forEach((sortable) => {
        sortable.destroy();
      });
      this.sortables_group = [];
    } catch (e) {}
  },
  methods: {
    setDragMode(drag) {
      this.$emit("update:isDragged", drag);
    },

    showMenu(e, section) {
      //console.log(e.clientX)
      this.hover_element = e.target;

      this.hover_section = section;
      this.show_element_info = true;
    },
    hideMenu() {
      this.show_element_info = false;
    },

    generateGroups() {
      let groups = {};
      let group_no_category:any[] = [];

      // group sections together
      DefaultSections.List.forEach((section) => {
        let sectionGroup = section.group;
        if (!sectionGroup) {
          group_no_category.push(section);
          return;
        }
        if (!groups[sectionGroup]) {
          groups[sectionGroup] = [section];
          return;
        }
        groups[sectionGroup].push(section);
      });
      if (group_no_category.length) {
        const no_category = " "; //this.$t('page_builder.design.no_category');
        groups[no_category] = group_no_category;
      }
      this.groups = groups;
    },
  },
});
</script>

<style lang="scss" scoped>
.l--page-editor-components-menu {
  text-align: center;
  user-select: none;

  overflow-y: auto;
  overflow-x: hidden;

  color: #fff;

  .-group {
    .-group-body {
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
      font-weight: 600;
      display: block;
    }
  }
}

.sortable-ghost {
  background-color: #0c91d3;
  opacity: 0.9;
  height: max-content;
  box-shadow: 0 0 2px 1px #0c91d3;

  .-item-image {
    width: 100%;
    height: auto;
    background: #1976d2;
  }
}
</style>
