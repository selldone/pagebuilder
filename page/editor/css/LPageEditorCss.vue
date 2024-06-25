<!--
  - Copyright (c) 2023. Selldone® Business OS™
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
  <div class="py-5">
    <!-- ============== CSS ============== -->
    <div class="widget-box -x-large mb-5">
      <prism-editor
        v-model="css"
        :highlight="highlighter"
        class="light-code scrollable-element-light"
        contenteditable="false"
        language="html"
        line-numbers
        style="min-height: 50vh; font-size: 12px"
        @blur="checkClasses"
        @update:model-value="changed = true"
      >
      </prism-editor>
    </div>
  </div>
</template>

<script>
import { PrismEditor } from "vue-prism-editor";

export default {
  name: "LPageEditorCss",
  components: {PrismEditor},
  props: {
    page: {},
  },

  data: () => ({
    css: '',
    changed: false,
  }),

  computed: {

  },

  watch: {},
  created() {},

  methods: {
    highlighter(code) {
      return Prism.highlight(code, Prism.languages.css, "css");
    },
    checkClasses() {},
  },
};
</script>

<style scoped></style>
