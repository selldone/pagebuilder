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
  <div
    :style="{
      height:
        (page_style.menu_transparent ? 0 : 64) +
        (['overlay', 'hidden'].includes(page_style.header_mode) ? 0 : 64) +
        'px',
    }"
    class="position-relative"
    style="transition: all 0.4s; z-index: 10"
    v-bind="$attrs"
  >
    <div
      style="position: absolute; left: 0; right: 0; top: 0; overflow: hidden"
      :style="{ color: page_style.menu_dark ? '#fff' : '#000' }"
    >
      <v-toolbar
        v-if="page_style.header_mode !== 'hidden'"
        :color="header_color"
        :theme="page_style.menu_dark ? 'dark' : 'light'"
        :style="{
          'z-index':
            page_style.header_mode === 'overlay'
              ? 99
              : undefined /*In the overlay mode we set high z-index to be visible over first section*/,
        }"
        class="position-relative"
        flat
        height="64"
      >
        <s-header-section-logo :shop="shop" view-only></s-header-section-logo>
      </v-toolbar>

      <s-storefront-top-menu
        :class="{ 'top-abs': page_style.menu_transparent }"
        :force-dark="page_style.menu_dark"
        :color="header_color"
        :shop="shop"
        :style="{
          'z-index': page_style.menu_transparent
            ? 99
            : undefined /*In the overlay mode we set high z-index to be visible over first section*/,
        }"
        :tabs="[
          { title: 'Home', icon: 'home' },
          { title: 'Community' },
          { title: 'New Collection' },
          { title: 'Categories' },
        ]"
        :transparent="page_style.menu_transparent"
        class="pen usn position-relative"
        flat
        preview
      ></s-storefront-top-menu>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import SStorefrontTopMenu from "@selldone/components-vue/storefront/menu/header/SStorefrontTopMenu.vue";
import SHeaderSectionLogo from "@selldone/components-vue/storefront/header/section/logo/SHeaderSectionLogo.vue";
import { LMixinEvents } from "../../../../mixins/events/LMixinEvents";

export default defineComponent({
  name: "LStoreTopBarPreview",
  mixins: [LMixinEvents],
  components: { SHeaderSectionLogo, SStorefrontTopMenu },
  inject: ["$builder"],
  props: {
    shop: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },

  computed: {
    page_style() {
      return this.$builder.style;
    },

    header_color() {
      return this.page_style.header_color
        ? this.page_style.header_color
        : "transparent";
    },
  },
  watch: {
    page_style() {
      if (!this.page_style) this.$builder.style = {};
      if (!this.page_style.header_mode) this.page_style.header_mode = "normal";
    },
  },
  created() {
    if (!this.page_style) this.$builder.style = {};
    if (!this.page_style.header_mode) this.page_style.header_mode = "normal";
  },
  methods: {},
});
</script>

<style scoped lang="scss"></style>
