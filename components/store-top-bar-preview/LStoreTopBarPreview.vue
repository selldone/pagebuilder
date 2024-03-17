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
    style="transition: all 0.4s; z-index: 1"
  >
    <div
      style="position: absolute; left: 0; right: 0; top: 0"
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
        <s-header-section-logo
          :shop="shop"
          view-only
        ></s-header-section-logo>
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

    <v-menu
      activator="parent"
      open-on-hover
      location="right"
      content-class="bg-black text-start pa-2 rounded-xl"
      :close-on-content-click="false"
      :offset="[16, 0]"
    >
      <v-btn
        color="#fff"
        variant="tonal"
        class="me-1 tnt"
        rounded="t-xl"
        min-width="100"
        @click="ShowLSettingsPageStyle(builder.style, true, 'menu')"
      >
        <v-icon start>edit</v-icon>
        Menu
      </v-btn>

      <div class="d-flex align-center border-top-dashed mt-2">
        <div class="d-inline-flex flex-column align-stretch">
          <v-chip size="small" label @click="toggleMode" class="ma-1">
            <v-icon start>control_camera</v-icon>
            {{ page_style.header_mode }}
          </v-chip>
          <v-chip
            size="small"
            label
            class="ma-1"
            @click="page_style.menu_transparent = !page_style.menu_transparent"
          >
            <v-icon start>gradient</v-icon>
            {{ page_style.menu_transparent ? "transparent" : "solid" }}
          </v-chip>
        </div>

        <v-btn
          @click="page_style.menu_dark = !page_style.menu_dark"
          icon
          class="ma-2"
          :size="32"
          title="Dark/Light mode"
        >
          <v-slide-y-transition leave-absolute>
            <v-icon v-if="page_style.menu_dark" color="blur">dark_mode</v-icon>
            <v-icon v-else color="amber">light_mode</v-icon>
          </v-slide-y-transition>
        </v-btn>

        <u-color-selector
          v-model="page_style.header_color"
          end
          class="ma-2"
          :size="36"
          nullable
          >circle
        </u-color-selector>
      </div>
    </v-menu>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import SStorefrontTopMenu from "@components/storefront/menu/header/SStorefrontTopMenu.vue";
import SHeaderSectionLogo from "@components/storefront/header/section/logo/SHeaderSectionLogo.vue";
import { LMixinEvents } from "@app-page-builder/mixins/events/LMixinEvents";
import UColorSelector from "@components/ui/color/selector/UColorSelector.vue";

export default defineComponent({
  name: "LStoreTopBarPreview",
  mixins: [LMixinEvents],
  components: { UColorSelector, SHeaderSectionLogo, SStorefrontTopMenu },
  props: {
    shop: {
      type: Object,
      required: true,
    },
    builder: {
      type: Object,
      required: true,
    },
  },

  computed: {
    page_style() {
      return this.builder.style;
    },

    header_color() {
      return this.page_style.header_color
        ? this.page_style.header_color
        : this.page_style?.header_mode === "overlay"
          ? "transparent"
          : this.page_style?.menu_dark
            ? this.shop.theme?.color_deep_dark
              ? this.shop.theme.color_deep_dark
              : "#000"
            : "#fff";
    },
  },
  watch: {
    page_style() {
      if (!this.page_style) this.builder.style = {};
      if (!this.page_style.header_mode) this.page_style.header_mode = "normal";
    },
  },
  created() {
    if (!this.page_style) this.builder.style = {};
    if (!this.page_style.header_mode) this.page_style.header_mode = "normal";
  },
  methods: {
    toggleMode() {
      if (this.page_style.header_mode === "normal") {
        this.page_style.header_mode = "overlay";
      } else if (this.page_style.header_mode === "overlay") {
        this.page_style.header_mode = "hidden";
      } else if (this.page_style.header_mode === "hidden") {
        this.page_style.header_mode = "normal";
      }
    },
  },
});
</script>

<style scoped lang="scss"></style>
