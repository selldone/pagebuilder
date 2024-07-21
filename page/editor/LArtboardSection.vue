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
  <div class="position-relative">
    <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Margin Arrows - Start ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
    <div
      v-if="$builder.isEditing && section.object?.style?.marginTop"
      :class="{
        '--reverse': parseInt(section.object.style.marginTop) < 0,
      }"
      :margin="section.object.style.marginTop"
      :style="{ '--margin': section.object.style.marginTop }"
      class="arrow-margin -top"
      title="Top Margin"
      @mousedown.prevent
    ></div>
    <div
      v-if="$builder.isEditing && section.object?.style?.marginBottom"
      :class="{
        '--reverse': parseInt(section.object.style.marginBottom) < 0,
      }"
      :margin="section.object.style.marginBottom"
      :style="{
        '--margin': section.object.style.marginBottom,
      }"
      class="arrow-margin -bottom"
      title="Bottom Margin"
      @mousedown.prevent
    ></div>
    <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Margin Arrows - End ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->

    <l-artboard-drop
      :class="{
        'cursor-pipette': $builder.cloneStyle && !$builder.cloneObject,
        'cursor-bucket': $builder.cloneStyle && $builder.cloneObject,

        'show-name': $builder.showLeftMenu,
      }"
      :section-name="section.label"
      class="position-relative d-flex flex-column target-drop"
      :index="index"
      @onDropOver="
        (over) => {
          if (over) {
            $emit('update:pastHoverIndex', index);
            drop_section = true;
          } else {
            $emit('update:pastHoverIndex', null);
            drop_section = false;
          }
        }
      "
    >
      <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ 🪂 Section Component - Start 🪂 ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
      <x-component
        v-if="!loading"
        :object="section.object"
        :augment="null"
        :id="section.uid"
        :section="section"
        :class="{
          'move-courser block-pointer-event': $builder.isSorting,

          'ignore-elements': !$builder.isSorting,
          pen: drop_section,
          'hover-z-10': $builder.isEditing,
        }"
      />
      <div
        v-else
        class="d-flex align-center justify-center"
        style="height: 400px"
      >
        <v-progress-circular indeterminate size="84"></v-progress-circular>
      </div>
    </l-artboard-drop>

    <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Copy & Past Section - Start ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
    <s-landing-section-side-bar
      v-if="$builder.showLeftMenu"
      :index="index"
      :past-hover-index="pastHoverIndex"
      @update:past-hover-index="(val) => $emit('update:pastHoverIndex', val)"
      :copy-section="copy_section"
      :section="section"
      :section-index="index"
    ></s-landing-section-side-bar>
    <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Copy & Past Section - End ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->

    <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Side Section Buttons - Start ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
    <l-page-editor-artboard-side-extended
      :aiAutoFillFunction="aiAutoFillFunction"
      :notes="notes"
      :section="section"
      :shop="shop"
    ></l-page-editor-artboard-side-extended>
    <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Side Section Buttons - End ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->

    <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Notes - Start ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
    <p-note-digest
      v-if="$vuetify.display.lgAndUp"
      :limit="2"
      :section="section"
      :shop="shop"
      :style="{ width: '400px', right: '-600px' }"
      class="position-absolute"
      hover-able
      style="top: 50px"
    ></p-note-digest>
    <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Notes - End ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
  </div>
  <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Past & Drop Expanding Bar ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
  <v-expand-transition>
    <div
      v-if="pastHoverIndex === index && drop_section"
      class="bg-lily-meadow typo-body d-flex flex-column align-center justify-center"
      style="height: 84px"
    >
      Will add here
    </div>
    <div
      v-else-if="pastHoverIndex === index"
      class="bg-blue-soft d-flex align-center justify-center"
      style="height: 84px"
    >
      Past section here!
    </div>
  </v-expand-transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";
import SLandingSectionSideBar from "@selldone/page-builder/components/section/side-bar/SLandingSectionSideBar.vue";
import PNoteDigest from "@selldone/page-builder/components/note/digest/PNoteDigest.vue";
import LPageEditorArtboardSideExtended from "@selldone/page-builder/page/editor/artboard/side-extended/LPageEditorArtboardSideExtended.vue";
import { Section } from "@selldone/page-builder/src/section/section.ts";
import LArtboardDrop from "@selldone/page-builder/page/editor/artboard/drop/LArtboardDrop.vue";
import { LMixinArtboard } from "@selldone/page-builder/mixins/artboard/LMixinArtboard.ts";

export default defineComponent({
  name: "LArtboardSection",
  mixins: [LMixinArtboard],
  components: {
    LArtboardDrop,
    LPageEditorArtboardSideExtended,
    PNoteDigest,
    SLandingSectionSideBar,
    XComponent,
  },
  inject: ["$builder"],
  props: {
    section: {
      required: true,
      type: Section,
    },
    loading: {
      required: true,
      type: Boolean,
    },
    index: {
      required: true,
      type: Number,
    },
    shop: {
      required: false,
      type: Object,
    },

    pastHoverIndex: {},
    aiAutoFillFunction: Boolean,
  },

  data: () => ({
    drop_section: false, // Indicate that pre-built section drag over

    //-------------------

    onPast: null,

    copy_section: null,
  }),

  computed: {
    notes() {
      return this.$builder.model?.notes;
    },
  },

  methods: {

  },
});
</script>

<style scoped lang="scss"></style>
