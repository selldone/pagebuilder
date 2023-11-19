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
  <div class="">
    <!-- --------------------------------- Top Tools --------------------------------- -->

    <page-builder-top-tools
      v-if="value && inEditMode"
      :page="value"
      :pageBuilder="$refs.vueBuilder"
      :busySave="busySave"
      :inDesignTab="true"
      @click:save="onSave"
      @click:history="history_dialog = true"
      :save-icon="isMenu ? 'check' : 'save'"
      :save-color="isMenu ? 'blue' : 'green'"
      class="toolbar-top-rounded"
    >
    </page-builder-top-tools>

    <SPageEditor
      class="designer-container"
      ref="vueBuilder"
      :dir="value ? value.direction : 'auto'"
      :page="value"
      @saved="onSave"
      @scale="(val) => (scale = val)"
      @changeMode="(val) => (inEditMode = val)"
      @load:template="onSetPageBySelectTemplate"
      :shop="shop"
      :pageStyle="style"
      :showIntro="show_intro"
      :isPopup="isPopup"
      :isMenu="isMenu"
    />
  </div>
</template>

<script>
import PageBuilderTopTools from "./src/menus/PageBuilderTopTools.vue";
export default {
  name: "SPageBuilderLight",
  components: { PageBuilderTopTools },
  props: {
    shop: { require: true, type: Object },
    value: {},
    isMenu: {
      type: Boolean,
      default: false,
    },
    isPopup: {
      type: Boolean,
      default: false,
    },

    busySave: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    inEditMode: false, // Set after page builder initialize! important in access by $refs!

    scale: false,
  }),

  computed: {
    style() {
      return this.value && this.value.content && this.value.content.style;
    },

    show_intro() {
      return this.isPopup && this.$route.params.popup_id === "new";
    },
  },

  watch: {
    value() {
      // IMPORTANT: EACH PAGE NEED RECREATE ALL OF THIS COMPONENT!
      this.$refs.vueBuilder.setPage(this.value.content);
    },
  },

  mounted() {
    if (!this.value || !this.value.content || !this.value.content.sections) {
      this.$emit("input", {
        direction: "auto",
        content: { sections: [], style: { font_size: 16 } },
      }); // Create blank page!
    } else {
      this.$refs.vueBuilder.setPage(this.value.content);
    }
  },

  methods: {
    onSave() {
      const content = this.$refs.vueBuilder.getJson();

      content.style = this.style;

      this.value.content = content;

      this.$emit("input", this.value); // Not needed! value updated directly!

      this.save(content);
    },

    onSetPageBySelectTemplate(page) {
      console.log("📐 Auto save page.", page);

      this.value.content = page.content;
      this.value.image = page.image;

      this.$emit("input", this.value); // Not needed! value updated directly!

      this.save(page.content, page.image);
    },
    save(content, image = null) {
      if (!this.value.content.style) this.value.content.style = {}; // Important: Fix style in content!

      this.$emit("onSave", { content, image });
    },
  },
};
</script>

<style scoped lang="scss"></style>
