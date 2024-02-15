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
    class="side-section"
    :class="{
      '-copy': copy_hover === section.id,
      '-delete': delete_hover === section.id,
      '-row': ['infinite-stream'].includes(section.name),
    }"
  >
    <!-- ▃▃▃▃▃▃▃▃▃▃ Copy ▃▃▃▃▃▃▃▃▃▃ -->

    <v-btn
      icon
      variant="tonal"
      color="#000"
      size="large"
      class="hover-scale -fast force-top"
      @mouseenter="copy_hover = section.id"
      @mouseleave="copy_hover = null"
      @click="copySection(section)"
    >
      <v-icon size="x-large">content_copy</v-icon>

      <v-tooltip
        activator="parent"
        location="right"
        max-width="420"
        content-class="bg-black pa-3 text-start small"
      >
        <b class="d-block">Copy Section Now!</b>
        <div>
          When you click here, this section structure and data will be copied,
          allowing you to paste it onto this page or any other pages.
        </div>
      </v-tooltip>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn
      icon
      variant="tonal"
      title="Delete section"
      color="red"
      size="large"
      class="hover-scale -fast force-top"
      @mouseenter="delete_hover = section.id"
      @mouseleave="delete_hover = null"
      @click="deleteSection(section)"
    >
      <v-icon size="x-large">close</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <!-- ▃▃▃▃▃▃▃▃▃▃ Save Section (Page's Element) ▃▃▃▃▃▃▃▃▃▃ -->

      <v-btn
        v-if="$route.params.shop_id /*Only in shop admin dashboard!*/"
        icon
        variant="tonal"
        color="#000"
        class="hover-scale -fast force-top mb-1"
        size="large"
        @click="saveSectionToRepository(section)"
      >
        <v-icon size="x-large">add</v-icon>

        <v-tooltip
          activator="parent"
          location="right"
          max-width="420"
          content-class="bg-black pa-3 text-start small"
        >
          <b class="d-block">Save & Reuse This Section</b>
          <div>Save this section to my repository for use on other pages.</div>
        </v-tooltip>
      </v-btn>

    <!-- ▃▃▃▃▃▃▃▃▃▃ Past ▃▃▃▃▃▃▃▃▃▃ -->

    <v-btn
      icon
      variant="tonal"
      color="#000"
      class="hover-scale -fast"
      size="large"
      @mouseenter="$emit('update:pastHoverIndex', sectionIndex)"
      @mouseleave="$emit('update:pastHoverIndex', null)"
      @click="pastSection(sectionIndex + 1)"
    >
      <v-icon size="x-large">content_paste</v-icon>

      <v-tooltip
        activator="parent"
        location="right"
        max-width="420"
        content-class="bg-black pa-3 text-start small"
      >
        <b class="d-block">Ctrl + V Now!</b>
        <div v-if="copy_section" class="py-1">
          <v-icon color="success" size="x-small">circle</v-icon>
          Copy available
        </div>

        <div>
          Clicking this button will add a copied section here. If you've copied
          a section <b>from another page</b>, simply use <b>Ctrl + V</b> to
          paste it here, as we cannot access the clipboard programmatically.
        </div>
      </v-tooltip>
    </v-btn>
  </div>
</template>

<script>
import {defineComponent, inject} from "vue";
import {PageBuilderMixin} from "@app-page-builder/mixins/PageBuilderMixin";
import {LandingHistoryMixin} from "@app-page-builder/mixins/LandingHistoryMixin";

export default defineComponent({
  name: "SLandingSectionSideActionsBar",
  mixins:[PageBuilderMixin,LandingHistoryMixin],

  emits: ["update:pastHoverIndex"],
  props: {
    section: {
      type: Object,
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
  },
  data() {
    return {
      //------------------- Extra buttons side ---------------
      copy_hover: null,
      delete_hover: null,
      copy_section: null,
      onPast: null,

      builder : inject("$builder")

    };
  },

  created() {


    // Add global past:
    this.onPast = (event) => {
      if (window.PAGE_BUILDER_BLOCK_LISTEN_KEYS) return;

      let paste = (event.clipboardData || window.clipboardData).getData("text");

      // console.log('paste action initiated',paste)

      function IsValidJsonSectionString(str) {
        try {
          let json = JSON.parse(str);
          return json.name && json.data && Object.keys(json.data).length > 0;
        } catch (e) {}
        return false;
      }

      // Try parse as section:
      if (paste && IsValidJsonSectionString(paste)) {
        this.copy_section = paste;

        this.pastSection(
          this.pastHoverIndex === null
            ? this.builder.sections.length + 1
            : this.pastHoverIndex + 1,
        );
        event.preventDefault();
      }
    };
    document.addEventListener("paste", this.onPast, true);


  },

  beforeUnmount() {
    document.removeEventListener("paste", this.onPast, true);
  },

  methods: {
    //――――――――――――――――――――――  Copy Section ――――――――――――――――――――

    copySection(section) {
      this.copy_section = JSON.stringify({
        name: section.name,
        data: section.data,
      });
      this.copyToClipboard(
        this.copy_section,
        "Copy Section Data & Structure",
        `The section has been successfully copied to the clipboard. You can paste it onto other pages.`,
      );
    },
    saveSectionToRepository(section) {
      const _section = JSON.stringify({
        name: section.name,
        data: section.data,
      });
      this.EventBus.$emit("show:PageElementsRepository:Add-My-Section", {
        section: _section,
      });
    },

    //――――――――――――――――――――――  Past Section ――――――――――――――――――――

    pastSection(index) {
      if (!this.copy_section) {
        this.showWarningAlert(
          "First copy a section!",
          "Data on clipboard not found!",
        );

        return;
      }


      try {
        let section = JSON.parse(this.copy_section);
        if (section.name && section.data) {
          this.builder.add(section, index, false);
          this.onSaveHistory();
          this.autoLoadSectionFonts(section);
          return;
        }
      } catch (e) {
        console.error(e);
      }

      this.showWarningAlert("Invalid", "Clipboard data has invalid structure!");
    },

    //――――――――――――――――――――――  Delete Section ――――――――――――――――――――

    deleteSection(section) {
      try {
        this.builder.remove(section);
        this.onSaveHistory();
      } catch (e) {
        console.error(e)
        this.showErrorAlert(
            null,
            "We can not remove this section! Maybe fix it by refreshing the page.",
        );
      }
    },



  },
});
</script>

<style scoped lang="scss">
.side-section {
  position: absolute;
  left: -84px;
  top: 0;
  bottom: 0;
  z-index: 1;

  display: flex;
  flex-direction: column;
  padding: 24px 8px;

  &.-row {
    flex-direction: row;
    left: -224px;
    width: 200px;
    top: 0;
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
