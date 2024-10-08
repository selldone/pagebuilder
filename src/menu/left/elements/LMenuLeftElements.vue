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
    <v-toolbar-title style="font-size: 12px"><b>Elements</b></v-toolbar-title>
  </v-toolbar>

  <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆  List ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->
  <div ref="menu" class="l--page-editor-components-menu">
    <div
      class="-groups border-between-vertical mx-2"
      style="--border-color: #000"
    >
      <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Sections ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

      <div
        v-for="(group, name) in groups_sections"
        :key="name"
        class="-group mb-2 pb-3"
      >
        <div class="-group-header">
          {{ name }}
        </div>
        <v-row
          class="-group-body -group-body-sections px-2"
          dense
          justify="space-around"
        >
          <span
            v-for="(item, index) in group"
            :key="index"
            :data-seed="item.data_seed /*Use in drop*/"
            class="-item-element hover-scale-small"
            draggable="true"
            @mouseenter="(e) => showMenu(e, item)"
            @mouseleave="hideMenu()"
          >
            <img v-if="item.image" :src="item.image" class="-item-image" />
            <!--<v-icon v-if="item.icon" class="me-1">{{ item.Info.icon }}</v-icon>-->
            {{ item.title }}
          </span>
        </v-row>
      </div>

      <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Elements ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->

      <div
        v-for="(group, name) in groups_element"
        :key="name"
        class="-group mb-2 pb-3"
      >
        <div class="-group-header">
          {{ name }}
        </div>
        <v-row
          class="-group-body -group-body-elements px-2"
          dense
          justify="space-around"
        >
          <span
            v-for="(item, index) in group"
            :key="index"
            :data-seed="item.data_seed /*Use in drop*/"
            class="-item-element hover-scale-small"
            draggable="true"
            @mouseenter="(e) => showMenu(e, item)"
            @mouseleave="hideMenu()"
          >
            <img v-if="item.image" :src="item.image" class="-item-image" />
            <v-icon v-if="item.icon" class="me-1">{{ item.Info.icon }}</v-icon>
            {{ item.title }}
          </span>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sortable from "sortablejs";
import { VideoHelper } from "@selldone/core-js/helper/video/VideoHelper.ts";
import AttachDirective from "@selldone/page-builder/directives/AttachDirective.ts";
import { LUtilsComponents } from "@selldone/page-builder/utils/components/LUtilsComponents.ts";
import { LModelElementTypes } from "@selldone/page-builder/models/element/LModelElement.ts";
import { XSectionObject } from "@selldone/page-builder/components/x/section/XSectionObject.ts";

export default defineComponent({
  name: "LMenuLeftElements",
  emits: ["update:isDragged"],
  directives: {
    attach: AttachDirective,
  },
  props: {},
  data() {
    return {
      VideoHelper: VideoHelper,

      expanded: 0,
      groups_element: {},
      groups_sections: {},

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
    const _self = this;

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Sections ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Initial sections:
    const groups_sections = this.$refs.menu.querySelectorAll(
      ".-group-body-sections",
    );
    groups_sections.forEach((group) => {
      const sortable = Sortable.create(group, {
        group: {
          name: "sections-group",
          put: false,
          pull: "clone",
        },
        sort: false,
        ghostClass: "sortable-ghost", // Class name for the drop placeholder

        onStart: function (/**Event*/ evt) {
          const item_seed = evt.item.getAttribute("data-seed");
          evt.item._dragData = item_seed; // Store data directly on the item
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

    //━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Elements ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Initial elements:
    const groups_elements = this.$refs.menu.querySelectorAll(
      ".-group-body-elements",
    );
    groups_elements.forEach((group) => {
      const sortable = Sortable.create(group, {
        group: {
          name: "elements-group",
          put: false,
          pull: "clone",
        },
        sort: false,

        onStart: function (/**Event*/ evt) {
          const item_seed = evt.item.getAttribute("data-seed");
          evt.item._dragData = item_seed; // Store data directly on the item
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
      let groups_element = {};
      let groups_sections = {};
      let group_no_category: any[] = [];

      // group elements together
      LUtilsComponents.XObjects.forEach(
        (element: LModelElementTypes.IModelElement) => {
          const group = element.Info?.group;

          // ━━━━━━ Sections ━━━━━━
          if (group === "Section") {

            const _section_object=(element as XSectionObject).Seed();
            _section_object.style.minHeight='20vh';
            const data_seed = JSON.stringify({
              object: _section_object.toJson(),
              label: "Section",
            });

            const _section = Object.assign({}, element, {
              data_seed,
              title: element.Info?.title,
              icon: element.Info?.icon,
              image: element.Info?.image,
            });

            if (!groups_sections[group]) {
              groups_sections[group] = [_section];
            } else {
              groups_sections[group].push(_section);
            }
          }

          // ━━━━━━ Elements ━━━━━━
          else {
            const data_seed = JSON.stringify(element.Seed().toJson());

            element = Object.assign({}, element, {
              data_seed,
              title: element.Info?.title,
              icon: element.Info?.icon,
              image: element.Info?.image,
            });

            if (!group) {
              group_no_category.push(element);
              return;
            }

            if (!groups_element[group]) {
              groups_element[group] = [element];
              return;
            }
            groups_element[group].push(element);
          }
        },
      );
      if (group_no_category.length) {
        const no_category = " "; //this.$t('page_builder.design.no_category');
        groups_element[no_category] = group_no_category;
      }

      this.groups_element = groups_element;
      this.groups_sections = groups_sections;
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
        padding: 4px;
        margin: 2px;
        font-size: 11px;
        border: solid thin #333;
        border-radius: 3px;
        background: #222;
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
      opacity: 0.5;

      font-size: 0.6em;
      text-transform: uppercase;
      margin-bottom: 8px;
      font-weight: 600;
      display: block;
    }
  }
}
</style>
