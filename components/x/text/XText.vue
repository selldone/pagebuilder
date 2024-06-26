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

<template>
  <!-- ━━━━━━━━━━━━━━━━━━━━━━ X-Text ━━━━━━━━━━━━━━━━━━━━━━ -->
  <component
    v-if="isValid"
    :is="object.tag"
    v-styler:text="{
      target: object,

    }"
    :class="[object?.classes, { 'is-editable': $builder.isEditing }]"
    :style="[object?.style]"
    v-html="object?.value?.applyAugment(augment, $builder.isEditing)"
  ></component>
</template>

<script>
import XButton from "../../../components/x/button/XButton.vue";
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "../../../mixins/x-component/LMixinXComponent";
import { defineComponent } from "vue";
import XUploader from "../../../components/x/uploader/XUploader.vue";
import XProduct from "@selldone/page-builder/components/x/product/XProduct.vue";
import XCollection from "@selldone/page-builder/components/x/collection/XCollection.vue";
import { isObject } from "lodash-es";

export default defineComponent({
  name: "XText",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],

  components: { XCollection, XProduct, XUploader, XButton },
emits: ["update:object"],
  props: {
    object: { required: true },

    initialClasses: { type: Array },
    initialType: { required: true },

    augment: {
      // Extra information to show to dynamic show in page content
      required: true
    },
  },
  data: () => ({}),

  computed: {
    isValid() {
      return isObject(this.object);
    },
  },
  watch: {},
  created() {
    // ♻ Migration from old!
    if (!isObject(this.object)) {
      console.log("Need migration header!", this.object);
      this.$emit("update:object", {
        tag: this.initialType,
        value: "" + this.object,
        classes: this.initialClasses,
        style: {},
      });
    }else{
      // Set initial classes if not set yet!
      if(!this.object.classes && this.initialClasses){
        this.object.classes = [...this.initialClasses]
      }
      if(!this.object.tag){
        this.object.tag=this.initialType
      }
    }


  },
  methods: {},
});
</script>

<style lang="scss"></style>
