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
  <l-menu-left-setting-page v-if="is_page"></l-menu-left-setting-page>
  <l-menu-left-setting-popup v-else-if="is_popup"></l-menu-left-setting-popup>
</template>

<script lang="ts">
import LMenuLeftSettingPage from "@selldone/page-builder/src/menu/left/setting/page/LMenuLeftSettingPage.vue";
import LMenuLeftSettingPopup from "@selldone/page-builder/src/menu/left/setting/popup/LMenuLeftSettingPopup.vue";

export default {
  name: "LMenuLeftSetting",
  components: {
    LMenuLeftSettingPopup,
    LMenuLeftSettingPage,
  },
  inject: ["$builder", "$shop"],
  props: {},
  data: () => ({}),

  computed: {
    is_page() {
      return this.$builder.isPage();
    },
    is_popup() {
      return this.$builder.isPopup();
    },
    is_menu(){
      return this.$builder.isMenu();
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
