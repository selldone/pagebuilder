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
    <LPageEditor
      ref="vueBuilder"
      :isMenu="isMenu"
      :isPopup="isPopup"
      :page="modelValue"
      :showIntro="show_intro"
      @saved="onSave"
      @load:template="onSetPageBySelectTemplate"
      :histories="null"
    />
  </div>
</template>

<script>
import LPageEditor from "./page/editor/LPageEditor.vue";

export default {
  name: "LandingBuilderFragment",
  components: { LPageEditor },
  inject: ["$shop"],

  emits: ["update:modelValue", "onSave"],
  props: {
    modelValue: {},
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


  }),

  computed: {
    show_intro() {
      return this.isPopup && this.$route.params.popup_id === "new";
    },
  },

  watch: {
    modelValue() {
      // IMPORTANT: EACH PAGE NEED RECREATE ALL OF THIS COMPONENT!
      this.$refs.vueBuilder.setPage(
        this.modelValue.content,
        this.modelValue.css,
        false,
      );
    },
  },

  mounted() {
    if (
      !this.modelValue ||
      !this.modelValue.content ||
      !this.modelValue.content.sections
    ) {
      this.$emit("update:modelValue", {
        direction: "auto",
        content: { sections: [], style: { font_size: 16 } },
      }); // Create blank page!
    } else {
      this.$refs.vueBuilder.setPage(
        this.modelValue.content,
        this.modelValue.css,
        false,
      );
    }

  },

  methods: {
    onSave() {
      const content = this.$refs.vueBuilder.getJson();

      this.modelValue.content = content;

      this.$emit("update:modelValue", this.modelValue); // Not needed! modelValue updated directly!

      this.save(content);
    },

    onSetPageBySelectTemplate(page) {
      console.log("📐 Auto save page.", page);

      this.modelValue.content = page.content;
      this.modelValue.image = page.image;

      this.$emit("update:modelValue", this.modelValue); // Not needed! modelValue updated directly!

      this.save(page.content, page.image);
    },
    save(content, image = null) {
      if (!this.modelValue.content.style) this.modelValue.content.style = {}; // Important: Fix style in content!

      this.$emit("onSave", { content, image });
    },
  },
};
</script>

<style scoped lang="scss"></style>
