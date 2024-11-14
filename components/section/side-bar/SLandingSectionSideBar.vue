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
  <div
    :class="{
      '-copy': copy_hover,
      '-delete': delete_hover,
      '-row': is_row,
    }"
    class="side-section"
    v-size="
      ({ height }) => {
        el_height = height;
      }
    "
  >
    <!-- ▃▃▃▃▃▃▃▃▃▃ Copy ▃▃▃▃▃▃▃▃▃▃ -->

    <v-btn
      class="hover-scale-small -fast force-top"
      color="#000"
      icon
      size="large"
      variant="text"
      @click="copySection()"
      @mouseenter="copy_hover = true"
      @mouseleave="copy_hover = false"
    >
      <v-icon size="36">content_copy</v-icon>

      <v-tooltip
        activator="parent"
        content-class="bg-black pa-3 text-start small"
        location="left"
        max-width="420"
        :open-delay="500"
      >
        <b class="d-block">
          <v-icon class="me-1">content_copy</v-icon>
          Copy Section Now!</b
        >
        <div>
          When you click here, this section structure and data will be copied,
          allowing you to paste it onto this page or any other pages.
        </div>
      </v-tooltip>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn
      class="hover-scale-small -fast force-top"
      color="red"
      icon
      size="large"
      variant="text"
      @click="deleteSection()"
      @mouseenter="delete_hover = true"
      @mouseleave="delete_hover = false"
    >
      <v-icon size="36">close</v-icon>

      <v-tooltip
        activator="parent"
        content-class="bg-red pa-3 text-start small"
        location="left"
        max-width="420"
        text="Delete Section"
        :open-delay="500"
      >
      </v-tooltip>
    </v-btn>

    <v-spacer></v-spacer>
    <!-- ▃▃▃▃▃▃▃▃▃▃ Custom Show / Hide Section ▃▃▃▃▃▃▃▃▃▃ -->
    <div class="position-relative">
      <div
        class="d-flex align-center position-absolute"
        :style="{ bottom: is_row ? '42px' : '12px' }"
        style="right: 0px"
      >
        <div
          v-if="section.object.data?.hide.sm"
          class="position-relative me-3 hover-scale"
          title="Hide on small screens"
        >
          <v-icon size="20">smartphone</v-icon>
          <v-icon class="center-absolute op-0-7" size="30" color="red"
            >block
          </v-icon>
        </div>

        <div
          v-if="section.object.data?.hide.md"
          class="position-relative me-3 hover-scale"
          title="Hide on medium screens"
        >
          <v-icon size="20">tablet_android</v-icon>
          <v-icon class="center-absolute op-0-7" size="30" color="red"
            >block
          </v-icon>
        </div>

        <div
          v-if="section.object.data?.hide.lg"
          class="position-relative me-3 hover-scale"
          title="Hide on normal screens"
        >
          <v-icon size="20">laptop</v-icon>
          <v-icon class="center-absolute op-0-7" size="30" color="red"
            >block
          </v-icon>
        </div>
        <div
          v-if="section.object.data?.hide.xl"
          class="position-relative me-3 hover-scale"
          title="Hide on large screens"
        >
          <v-icon size="20">desktop_windows</v-icon>
          <v-icon class="center-absolute op-0-7" size="30" color="red"
            >block
          </v-icon>
        </div>

        <div
          v-if="section.object.data?.hide.user"
          class="position-relative me-3 hover-scale"
          title="Hide for users"
        >
          <v-icon size="20">account_circle</v-icon>
          <v-icon class="center-absolute op-0-7" size="30" color="red"
            >block
          </v-icon>
        </div>

        <div
          v-if="section.object.data?.hide.guest"
          class="position-relative me-3 hover-scale"
          title="Hide for guests"
        >
          <v-icon size="20">person_outline</v-icon>
          <v-icon class="center-absolute op-0-7" size="30" color="red"
            >block
          </v-icon>
        </div>
      </div>
    </div>

    <!-- ▃▃▃▃▃▃▃▃▃▃ Save Section (Page's Element) ▃▃▃▃▃▃▃▃▃▃ -->

    <v-btn
      v-if="$route.params.shop_id /*Only in shop admin dashboard!*/"
      class="hover-scale-small -fast force-top mb-1"
      color="#000"
      icon
      size="large"
      variant="text"
      :loading="busy_save"
      @click="saveSectionToRepository()"
    >
      <v-icon size="36">save</v-icon>

      <v-tooltip
        activator="parent"
        content-class="bg-black pa-3 text-start small"
        location="left"
        max-width="420"
        :open-delay="500"
      >
        <b class="d-block">
          <v-icon class="me-1">save</v-icon>
          Save & Reuse This Section</b
        >
        <div>Save this section to my repository for use on other pages.</div>
      </v-tooltip>
    </v-btn>

    <!-- ▃▃▃▃▃▃▃▃▃▃ Past ▃▃▃▃▃▃▃▃▃▃ -->

    <v-btn
      class="hover-scale-small -fast"
      color="#000"
      icon
      size="large"
      variant="text"
      @click="pastSection()"
      @mouseenter="$emit('update:pastHoverIndex', sectionIndex)"
      @mouseleave="$emit('update:pastHoverIndex', null)"
    >
      <v-icon size="36">content_paste</v-icon>

      <v-tooltip
        activator="parent"
        content-class="bg-black pa-3 text-start small"
        location="left"
        max-width="420"
        :open-delay="500"
      >
        <b>
          <v-icon class="me-1">content_paste</v-icon>
          Ctrl + V Now!</b
        >
        <v-chip
          v-if="$builder._copy_section"
          class="ma-1"
          color="green"
          size="small"
          variant="tonal"
        >
          <v-icon color="success" size="x-small" start>circle</v-icon>
          Copy available
        </v-chip>

        <div>
          Clicking this button will add a copied section here. If you've copied
          a section <b>from another page</b>, simply use <b>Ctrl + V</b> to
          paste it here, as we cannot access the clipboard programmatically.
        </div>
      </v-tooltip>
    </v-btn>
  </div>
</template>

<script lang="ts">
import NotificationService from "@selldone/components-vue/plugins/notification/NotificationService.ts";

import { defineComponent } from "vue";
import { Section } from "@selldone/page-builder/src/section/section.ts";
import { EventBus } from "@selldone/core-js/events/EventBus.ts";

export default defineComponent({
  name: "SLandingSectionSideBar",
  inject: ["$builder"],
  mixins: [],

  emits: ["update:pastHoverIndex"],
  props: {
    section: {
      type: Section,
      required: true,
    },
    sectionIndex: {
      type: Number,
      required: true,
    },
    pastHoverIndex: {
      type: Number,
      default: null,
    },

    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      copy_hover: false,
      delete_hover: false,
      el_height: 0,

      busy_save: false,
    };
  },

  computed: {
    is_row() {
      return (
        //   ["LSectionTextMarquee"].includes(this.section.name) ||
        this.el_height < 200
      );
    },
  },

  created() {},

  methods: {
    copySection() {
      this.$builder._copy_section = JSON.stringify(this.section.toJson());
      this.copyToClipboard(
        this.$builder._copy_section,
        "Copy Section Data & Structure",
        `The section has been successfully copied to the clipboard. You can paste it onto other pages.`,
      );
    },

    //――――――――――――――――――――――  Past Section ――――――――――――――――――――

    pastSection() {
      if (!this.$builder._copy_section) {
        NotificationService.showWarningAlert(
          "First copy a section!",
          "Data on clipboard not found!",
        );

        return;
      }

      try {
        let section = JSON.parse(this.$builder._copy_section);
        if (section.object) {
          this.$builder.add(section, this.index + 1, true);
          this.$builder.history.save();
          this.autoLoadSectionFonts(section);
          return;
        }
      } catch (e) {
        console.error(e);
      }

      NotificationService.showWarningAlert("Invalid", "Clipboard data has invalid structure!");
    },

    //――――――――――――――――――――――  Delete Section ――――――――――――――――――――

    deleteSection() {
      try {
        this.$builder.remove(this.section);
        this.$builder.history.save();
      } catch (e) {
        console.error(e);
        NotificationService.showErrorAlert(
          null,
          "We can not remove this section! Maybe fix it by refreshing the page.",
        );
      }
    },

    //――――――――――――――――――――――  Save Section ――――――――――――――――――――

    async saveSectionToRepository() {
      this.busy_save = true;
      let _image = null;
      try {
        _image = await this.section.render();
      } catch (e) {
        console.error(e);
      }

      const _section = JSON.stringify(this.section.toJson());
      EventBus.$emit("show:LPageEditorElementsRepository:Add-My-Section", {
        section: _section,
        image: _image,
      });

      this.busy_save = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.side-section {
  position: absolute;
  left: -84px;
  top: 0;
  bottom: 0;
  z-index: 1;

  display: flex;
  flex-direction: column;
  padding: 24px 8px;
  max-height: 100%;
  height: 100%;

  &.-row {
    flex-direction: row;
    left: -262px;
    width: 250px;
    top: -20px;
  }

  &:before {
    transition: all 0.2s ease-in-out;
    content: "";
    position: absolute;
    right: 0;
    top: 12px;
    bottom: 12px;
    width: 4px;
    background: #0d0d0d;
  }

  &.-copy {
    &:before {
      background: #8bc34a;
      width: 6px;
      right: -1px;
    }
  }

  &.-delete {
    &:before {
      background: #d22323;
      width: 6px;
      right: -1px;
    }
  }
}
</style>
