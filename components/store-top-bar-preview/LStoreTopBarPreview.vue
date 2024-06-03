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

  <v-btn
    @click="dialog = true"
    style="position: absolute; right: 20px; top: 8px; z-index: 20"
    color="#000"
    prepend-icon="menu"
    class="tnt"
    >Menu Settings
  </v-btn>

  <v-bottom-sheet
    v-model="dialog"
    content-class="text-start rounded-t-xl"
    width="98vw"
    max-width="640"
  >
    <v-card rounded="t-xl">
      <v-card-title>
        <v-icon class="me-2">menu</v-icon>
        Menu Style
      </v-card-title>
      <v-card-text>
        <s-widget-header icon="control_camera" title="Position">
        </s-widget-header>
        <v-list-subheader>
          Set position and behavior of the menu.
        </v-list-subheader>

        <v-btn-toggle
          selected-class="black-flat"
          v-model="page_style.header_mode"
          rounded="xl"
          variant="flat"
          class="overflow-auto"
          border
        >
          <v-btn
            v-for="(item, index) in ['normal', 'overlay', 'hidden']"
            :key="index"
            :value="item"
          >
            {{ item }}
          </v-btn>
        </v-btn-toggle>

        <s-widget-header icon="gradient" title="Color" class="mt-3">
        </s-widget-header>
        <v-list-subheader>
          Set the color and dark/light mode of the menu.
        </v-list-subheader>

        <v-row no-gutters align="center" justify="space-between">
          <v-btn-toggle
            selected-class="black-flat"
            v-model="page_style.menu_transparent"
            rounded="xl"
            variant="flat"
            border
            class="overflow-auto"
          >
            <v-btn :value="true"> transparent </v-btn>
            <v-btn :value="false"> solid </v-btn>
          </v-btn-toggle>

          <v-btn
            @click="page_style.menu_dark = !page_style.menu_dark"
            icon
            class="ma-2"
            :size="32"
            title="Dark/Light mode"
            variant="elevated"
            :color="page_style.menu_dark?'blue':'amber'"
          >
            <v-slide-y-transition leave-absolute>
              <v-icon v-if="page_style.menu_dark"
                >dark_mode</v-icon
              >
              <v-icon v-else >light_mode</v-icon>
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
        </v-row>
      </v-card-text>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="dialog = false">
            <v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>

          <v-btn
            variant="elevated"
            color="#000"
            size="x-large"
            @click="dialog=false;ShowLSettingsPageStyle(builder.style, true, 'menu')"
          >
            <v-icon start>edit</v-icon>
            Show More Settings
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import { defineComponent } from "vue";
import SStorefrontTopMenu from "@selldone/components-vue/storefront/menu/header/SStorefrontTopMenu.vue";
import SHeaderSectionLogo from "@selldone/components-vue/storefront/header/section/logo/SHeaderSectionLogo.vue";
import { LMixinEvents } from "../../mixins/events/LMixinEvents";
import UColorSelector from "@selldone/components-vue/ui/color/selector/UColorSelector.vue";

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
  data() {
    return {
      dialog: false,
    };
  },

  computed: {
    page_style() {
      return this.builder.style;
    },

    header_color() {
      return this.page_style.header_color
        ? this.page_style.header_color
        : "transparent";
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
