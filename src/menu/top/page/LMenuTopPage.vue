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

    <div>
      <!-- ▃▃▃▃▃▃▃▃▃▃ Page Style ▃▃▃▃▃▃▃▃▃▃ -->

      <v-btn
        :color="landing_show_page_style ? 'amber' : '#fff'"
        :title="$t('page_builder.design.tools.style')"
        variant="text"
        stacked
        @click.stop="
          ShowLSettingsPageStyle(builder.style, !landing_show_page_style)
        "
      >
        <v-icon>format_paint</v-icon>
        <div class="small mt-1 tnt">
          {{ $t("page_builder.design.tools.style") }}
        </div>

        <v-tooltip
          activator="parent"
          content-class="text-start small pa-3 bg-black"
          location="bottom"
          max-width="420"
          :open-delay="500"
        >
          <b class="d-block"> Page Style </b>
          Personalize the primary page's appearance, such as background and top
          menu here.
        </v-tooltip>
      </v-btn>

      <!-- ▃▃▃▃▃▃▃▃▃▃ Typography ▃▃▃▃▃▃▃▃▃▃ -->

      <v-btn
        :title="$t('page_builder.design.tools.typography')"
        variant="text"
        stacked
        @click.stop="ShowLSettingsPageTypography(builder.style)"
      >
        <v-icon>text_fields</v-icon>
        <div class="small mt-1 tnt">
          {{ $t("page_builder.design.tools.typography")?.substring(0, 4) }}
        </div>

        <v-tooltip
          activator="parent"
          content-class="text-start small pa-3 bg-black"
          location="bottom"
          max-width="420"
          :open-delay="500"
        >
          <b class="d-block"> Typography </b>
          Configure the typography, fonts, and size of elements on the page.
        </v-tooltip>
      </v-btn>

      <!-- ▃▃▃▃▃▃▃▃▃▃ LTR / RTL ▃▃▃▃▃▃▃▃▃▃ -->
      <v-btn-toggle
        v-model="page.direction"
        base-color="#222"
        rounded="lg"
        color="#fff"
        class="ma-1"
        mandatory
        density="compact"
      >
        <v-btn value="ltr" size="small">
          <v-icon>format_textdirection_l_to_r</v-icon>
        </v-btn>
        <v-btn value="auto" size="small" class="tnt"> Auto</v-btn>

        <v-btn value="rtl" size="small">
          <v-icon>format_textdirection_r_to_l</v-icon>
        </v-btn>

        <v-tooltip
          activator="parent"
          content-class="text-start small pa-3 bg-black"
          location="bottom"
          max-width="420"
          :open-delay="500"
        >
          <b class="d-block"> LTR / RTL </b>
          <div class="my-1">
            <v-icon size="small">format_textdirection_r_to_l</v-icon>
            <b class="mx-1">RTL:</b> Adjust the page orientation to
            right-to-left.
          </div>
          <div class="my-1">
            <v-icon size="small">format_textdirection_l_to_r</v-icon>
            <b class="mx-1">LTR:</b> Adjust the page orientation to
            left-to-right.
          </div>

          <div class="my-1">
            <b class="me-1">Auto:</b> The page direction set automatically based
            on content.
          </div>
        </v-tooltip>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script>
import { LMixinEvents } from "../../../../mixins/events/LMixinEvents.ts";
import { inject } from "vue";

export default {
  name: "LMenuTopPage",

  components: {},
  mixins: [LMixinEvents],
  emits: ["click:save"],
  props: {
    shop: {
      required: false,
      type: Object,
    },

    page: {
      require: true,
    },
  },

  computed: {
    builder() {
      return inject("$builder");
    },
    landing_show_page_style() {
      return this.$store.getters.getLandingShowPageStyle;
    },
    landing_show_elements_repository() {
      return this.$store.getters.getLandingShowElementsRepository;
    },
  },

  data: () => ({}),

  watch: {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
