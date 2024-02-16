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
  <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆  Tools ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

  <div
    ref="menu"
    class="float-menu no-inv thin-scroll"
    :class="{
      'is-visiable': isVisible,
      '-scroll-down': isScrollDown,
      '-dragged': isDragged,
    }"

  >
    <v-expansion-panels
      v-model="expanded"
      theme="dark"
      :style="{ maxWidth: expanded === 0 ? '260px' : '140px' }"
      class="overflow-hidden rounded-18px"
      style="transition: all 0.35s; --v-activated-opacity: 0"
    >
      <v-expansion-panel :bg-color="expanded === 0 ? '#111' : '#0152d0'">
        <v-expansion-panel-title ripple>
          <v-icon size="small" start>view_day</v-icon>
          <div class="flex-grow-1">Sections</div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div class="border-between-vertical">
            <div
              v-for="(group, name) in groups"
              :key="name"
              class="fmenu-group mb-2 pb-3"
            >
              <div class="fmenu-header">
                <span class="fmenu-title">{{ name }}</span>
              </div>
              <v-row class="fmenu-body" dense justify="space-around">
                <span
                  v-for="(section, index) in group"
                  :key="index"
                  class="fmenu-element hover-scale-small"
                  :section-name="section.name"
                  draggable="true"
                  @mouseenter="(e) => showMenu(e, section)"
                  @mouseleave="hideMenu()"
                >
                  <img
                    v-if="section.cover"
                    class="fmenu-elementImage"
                    :src="section.cover"
                  />
                </span>
              </v-row>
            </div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
  <!-- Side help menu -->
  <v-menu
    v-if="hover_section?.help"
    v-model="show_element_info"
    :target="hover_element"
    absolute
    max-width="420"
    width="300"
    :offset="36"
    content-class="pen"
    location="right"
  >
    <v-sheet color="#000">
      <v-responsive v-if="hover_section.help.video" :aspect-ratio="1920 / 1080">
        <video
          :key="hover_section.help.video"
          autoplay
          playsinline
          loop
          muted
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

<script>
import { defineComponent } from "vue";
import Sortable from "sortablejs";
import { VideoHelper } from "@core/helper/video/VideoHelper";

export default defineComponent({
  name: "SLandingComponents",
  emits: ["update:isDragged"],
  props: {
    components: {
      type: Array,
      required: true,
    },
    isDragged: Boolean,
    isVisible: Boolean,
    isScrollDown: Boolean,
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
    const groups = this.$refs.menu.querySelectorAll(".fmenu-body");
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
    this.sortables_group.forEach((sortable) => {
      sortable.destroy();
    });
    this.sortables_group = [];
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
      let group_no_category = [];

      // group sections together
      this.components.forEach((section) => {
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

<style scoped lang="scss">
.float-menu {
  user-select: none;
  z-index: 210;
  position: fixed;
  top: 74px;
  left: 24px;
  bottom: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;

  color: #fff;

  transition: all 0.4s ease-in-out;
  opacity: 0;
  transform: translateX(-200px);

  /*
    border-radius: 24px;
      padding: 12px 6px 84px 6px;

  background: #000;
  */

  &.is-visiable {
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

  .fmenu-group {
    .fmenu-body {
      max-width: 160px;

      .fmenu-element {
        position: relative;
        cursor: pointer;
        user-select: none;

        .fmenu-elementImage {
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

    .fmenu-header {
      margin-top: 0.6rem;

      .fmenu-title {
        font-size: 0.7em;
        text-transform: uppercase;
        margin-bottom: 4px;
        font-weight: 800;
        display: block;
      }
    }
  }
}

.sortable-ghost {
  background-color: #0c91d3;
  opacity: 0.9;
  height: max-content;
  box-shadow: 0 0 2px 1px #0c91d3;

  .fmenu-elementImage {
    width: 100%;
    height: auto;
    background: #1976d2;
  }
}
</style>
