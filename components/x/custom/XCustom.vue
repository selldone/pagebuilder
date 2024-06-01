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
  <div  :style="{minHeight:$builder.isEditing?'100px' :undefined}">
    <template v-for="(item,i) in object.structure" :key="i">

      <!-- ━━━━━━━━━━━━━━━━━━━━━━ Text ━━━━━━━━━━━━━━━━━━━━━━ -->
      <component v-if="isText(item)" :is="getComponent(item)" v-styler:text="{ target: item, keyText: 'title' }"   v-html="item.title?.applyAugment(augment, $builder.isEditing)"></component>

      <!-- ━━━━━━━━━━━━━━━━━━━━━━ Image ━━━━━━━━━━━━━━━━━━━━━━ -->
      <x-uploader
          v-else-if="item.component === 'img'"
          v-model="item.image"
          :augment="augment"
          :initialSize="{
            w: '100%',
            h: 'auto',
            contain: true,
            min_h: '20px',
            min_w: '20px',
          }"
      />
      <!-- ━━━━━━━━━━━━━━━━━━━━━━ hr ━━━━━━━━━━━━━━━━━━━━━━ -->
      <hr
          v-else-if="item.component === 'hr'"
      />





    </template>
  </div>

</template>

<script>
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "@selldone/page-builder/mixins/x-component/LMixinXComponent";
import XUploader from "@selldone/page-builder/components/x/uploader/XUploader.vue";
import { isArray } from "lodash-es";

export default {
  name: "XCustom",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],

  components: { XUploader },

  props: {
    object: { required: true },
    augment: {},

  },

  data: () => ({}),
  computed: {},
  watch: {},

  created() {
    if (!this.object.structure || !isArray(this.object.structure))
      this.object.structure = [];
  },

  mounted() {},

  methods: {
    getComponent(item){
      if(!item.component)return 'div';

     // return item.component

      return item.component;
    },

    isText(item){
      return ['p','h1','h2','h3','h4','h5','div'].includes(item.component)
    }
  },
};
</script>

<style lang="scss" scoped></style>
