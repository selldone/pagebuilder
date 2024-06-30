<!--
  - Copyright (c) 2023-2024. Selldone® Business OS™
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

<template xmlns:v-styler="http://www.w3.org/1999/xhtml">
  <v-card class="text-start px-4 py-2" variant="text">
    <!-- Moved to parent!  <x-text
        v-model:object="object.title"
        :augment="augment"
        initial-type="h3"
        :initial-classes="['mb-2']"
      ></x-text>-->
    <x-row
      :column-structure="ItemType"
      :object="object"
      add-column
      has-arrangement
      position="right-center"
      ><!-- Only addable can remove col-->

      <x-column
        v-for="(item, index) in object.children"
        :key="`${index}-${object.children.length}`"
        :object="item.column"
        :remove-child="() => object.children.splice(index, 1)"
        nested
      >
        <x-uploader
          v-model:object="item.image"
          :augment="augment"
          :initialSize="{
            w: '100%',
            h: 'auto',
            contain: false,
            min_h: '20px',
            min_w: '20px',
            aspect: 1,
          }"
          cover
        />
        <x-text
          v-model:object="item.title"
          :augment="augment"
          initial-type="p"
          :initial-classes="['text-subtitle-2', 'line-height-normal']"
        ></x-text>
      </x-column>
    </x-row>
  </v-card>
</template>

<script>
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "@selldone/page-builder/mixins/x-component/LMixinXComponent";
import XUploader from "@selldone/page-builder/components/x/uploader/XUploader.vue";
import * as types from "@selldone/page-builder/src/types/types";
import XRow from "@selldone/page-builder/components/x/row/XRow.vue";
import XColumn from "@selldone/page-builder/components/x/column/XColumn.vue";
import { defineAsyncComponent } from "vue";
import { LModelElementXCollection } from "@selldone/page-builder/components/x/collection/LModelElementXCollection";

const XText = defineAsyncComponent(
  () => import("@selldone/page-builder/components/x/text/XText.vue"),
);

export default {
  name: "XCollection",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],

  components: { XColumn, XRow, XText, XUploader },

  props: {
    object: {
      type: LModelElementXCollection,
      required: true,
    },
    augment: {},
    initialCount: {
      default: 4,
    },
  },

  data: () => ({
    ItemType: {
      title: types.Title,
      image: types.Image,
      grid: {
        mobile: 6,
        tablet: null,
        desktop: null,
        widescreen: null,
      },
    },
  }),
  computed: {},
  watch: {},

  created() {
    if (!this.object.children || !Array.isArray(this.object.children)) {
      console.error("XCollection: No children found, seeding...");
      /* this.object.children = [];
     * for (let i = 0; i < this.initialCount; i++) {
         this.object.children.push(LUtilsSeeder.seed(this.ItemType));
       }*/
    }

    // if (!this.object.row || !isObject(this.object.row)) this.object.row = {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
