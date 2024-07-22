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
  <div class="l--menu-top-tools" v-bind="$attrs">
    <!-- ――――――――――――――――――――――  Tools A ―――――――――――――――――――― -->

    <!-- ▃▃▃▃▃▃▃▃▃▃ Page Style ▃▃▃▃▃▃▃▃▃▃ -->

    <lmt-large-button
      icon="format_paint"
      :caption="$t('page_builder.design.tools.style')"
      sub-caption="Page Style"
      @click.stop="ShowLSettingsPageStyle($builder.style, 'toggle')"
    >
      <template v-slot:tooltip>
        <b class="d-block"> Page Style </b>
        Personalize the primary page's appearance, such as background and top
        menu here.
      </template>
    </lmt-large-button>

    <!-- ▃▃▃▃▃▃▃▃▃▃ Typography ▃▃▃▃▃▃▃▃▃▃ -->

    <lmt-large-button
      :caption="$t('page_builder.design.tools.typography')"
      sub-caption="Default size & font"
      icon="text_fields"
      stacked
      @click.stop="ShowLSettingsPageTypography($builder.style)"
    >
      <template v-slot:tooltip>
        <b class="d-block"> Typography </b>
        Configure the typography, fonts, and size of elements on the page.
      </template>
    </lmt-large-button>

    <!-- ▃▃▃▃▃▃▃▃▃▃ Shop Top Menu ▃▃▃▃▃▃▃▃▃▃ -->
    <template v-if="has_shop_menu">
      <lmt-large-button
        @click="show_menu_editor = true"
        sub-caption="Menu"
        icon="menu"
      >
        <v-avatar
          :image="getShopImagePath($shop.icon, 128)"
          class="avatar-gradient -shop -thin absolute-top-end"
          style="margin: 16%"
          size="20"
        >
        </v-avatar>
      </lmt-large-button>

      <l-store-top-bar-editor
        v-model="show_menu_editor"
        :shop="$shop"
      ></l-store-top-bar-editor>
    </template>

    <v-divider vertical></v-divider>

    <div class="lmt-group">
      <!-- ▃▃▃▃▃▃▃▃▃▃ LTR / RTL ▃▃▃▃▃▃▃▃▃▃ -->
      <v-btn-toggle
        v-model="page.direction"
        base-color="#222"
        rounded="lg"
        color="#fff"
        class="ma-1"
        mandatory
        density="compact"
        style="background: #222"
        selected-class="blue-flat elevation-3"
      >
        <v-btn value="ltr" size="small" class="ma-1">
          <v-icon>format_textdirection_l_to_r</v-icon>

          <v-tooltip
            activator="parent"
            content-class="text-start small pa-3 bg-black"
            location="bottom"
            max-width="420"
            :open-delay="500"
          >
            <div class="my-1">
              <v-icon size="small">format_textdirection_l_to_r</v-icon>
              <b class="mx-1">LTR:</b> Adjust the page orientation to
              left-to-right.
            </div>
          </v-tooltip>
        </v-btn>
        <v-btn value="auto" size="small" class="tnt ma-1">
          Auto

          <v-tooltip
            activator="parent"
            content-class="text-start small pa-3 bg-black"
            location="bottom"
            max-width="420"
            :open-delay="500"
          >
            <div class="my-1">
              <b class="me-1">Auto:</b> The page direction set automatically
              based on content.
            </div>
          </v-tooltip>
        </v-btn>

        <v-btn value="rtl" size="small" class="ma-1">
          <v-icon>format_textdirection_r_to_l</v-icon>

          <v-tooltip
            activator="parent"
            content-class="text-start small pa-3 bg-black"
            location="bottom"
            max-width="420"
            :open-delay="500"
          >
            <div class="my-1">
              <v-icon size="small">format_textdirection_r_to_l</v-icon>
              <b class="mx-1">RTL:</b> Adjust the page orientation to
              right-to-left.
            </div>
          </v-tooltip>
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script>
import { LMixinEvents } from "../../../../mixins/events/LMixinEvents.ts";
import LStoreTopBarEditor from "@selldone/page-builder/components/store/top-bar/editor/LStoreTopBarEditor.vue";
import LmtLargeButton from "@selldone/page-builder/src/menu/top/components/LmtLargeButton.vue";

export default {
  name: "LMenuTopPage",
  inject: ["$builder",'$shop'],
  components: { LmtLargeButton, LStoreTopBarEditor },
  mixins: [LMixinEvents],
  emits: ["click:save"],
  props: {


    page: {
      require: true,
    },
  },

  data: () => ({
    show_menu_editor: false,
  }),

  computed: {
    landing_show_elements_repository() {
      return this.$store.getters.getLandingShowElementsRepository;
    },

    has_shop_menu() {
      return this.$builder?.type === "page" && this.page.shop_id;
    },
  },

  watch: {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
