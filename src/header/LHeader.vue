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
  <l-header-page v-if="is_page" :backTo="backTo"></l-header-page>
  <l-header-popup v-else-if="is_popup" :backTo="backTo"></l-header-popup>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LHeaderPage from "@selldone/page-builder/src/header/page/LHeaderPage.vue";
import LHeaderPopup from "@selldone/page-builder/src/header/popup/LHeaderPopup.vue";

export default defineComponent({
  name: "LHeader",
  components: { LHeaderPopup, LHeaderPage },

  inject: ["$builder"],

  props:{
    /**
     * Back route
     */
    backTo: { required: true },
  },

  computed: {
    is_page() {
      return this.$builder.isPage();
    },
    is_popup() {
      return this.$builder.isPopup();
    },
    is_menu() {
      return this.$builder.isMenu();
    },
  },
});
</script>

<style scoped lang="scss"></style>
