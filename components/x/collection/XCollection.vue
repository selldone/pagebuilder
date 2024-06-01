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
    <h3 class="mb-2">{{ object.title }}</h3>
    <x-row
      :column-structure="ItemType"
      :object="object"
      add-column
      has-arrangement
      position="right-center"
      ><!-- Only addable can remove col-->

      <x-column
        v-for="(col, index) in object.columns"
        :key="`${index}-${object.columns.length}`"
        :object="col"
        :remove-column="() => object.columns.splice(index, 1)"
        nested
      >
        <x-uploader
          v-model="col.image"
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
        <div
          v-if="object.title || SHOW_EDIT_TOOLS"
          class="text-subtitle-2 line-height-normal"
          v-styler:text="{ target: col, keyText: 'title' }"
          v-html="col.title?.applyAugment(augment, $builder.isEditing)"
        ></div>
      </x-column>
    </x-row>
  </v-card>
</template>

<script>
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "@selldone/page-builder/mixins/x-component/LMixinXComponent";
import XUploader from "@selldone/page-builder/components/x/uploader/XUploader.vue";
import * as types from "@selldone/page-builder/src/types/types";
import { isObject } from "lodash-es";
import { LUtilsSeeder } from "@selldone/page-builder/utils/seeder/LUtilsSeeder";

export default {
  name: "XCollection",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],

  components: { XUploader },

  props: {
    object: { required: true },
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
    if (!this.object.columns || !Array.isArray(this.object.columns)) {
      this.object.columns = [];
      for (let i = 0; i < this.initialCount; i++) {
        this.object.columns.push(LUtilsSeeder.seed(this.ItemType));
      }
    }

    if (!this.object.row || !isObject(this.object.row)) this.object.row = {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
