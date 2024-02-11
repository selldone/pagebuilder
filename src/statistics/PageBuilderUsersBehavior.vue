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
    <v-row no-gutters>
      <v-spacer></v-spacer>
      <div class="c-container -force-rounded inline-block w-auto p-2 my-5">
        <v-btn-toggle
          v-model="type"
          class="rounded-group m-1 c-widget"
          rounded
          mandatory
          selected-class="blue-flat"
          borderless
        >
          <v-btn value="desktop">
            <v-icon>desktop_mac</v-icon>

            <span class="ms-2">
              {{
                numeralFormat(page.desktop ? page.desktop.count : 0, "0.[0] a")
              }}</span
            >
          </v-btn>
          <v-btn value="tablet">
            <v-icon>tablet_android</v-icon>

            <span class="ms-2">
              {{
                numeralFormat(page.tablet ? page.tablet.count : 0, "0.[0] a")
              }}</span
            >
          </v-btn>
          <v-btn value="mobile">
            <v-icon>stay_primary_portrait</v-icon>

            <span class="ms-2">{{
              numeralFormat(page.mobile ? page.mobile.count : 0, "0.[0] a")
            }}</span>
          </v-btn>
        </v-btn-toggle>
      </div>
      <v-spacer></v-spacer>
    </v-row>

    <div>
      <iframe
        :src="render_url"
        :width="
          type === 'desktop' ? '98%' : type === 'tablet' ? '768px' : '420px'
        "
        :height="
          type === 'desktop' ? '800px' : type === 'tablet' ? '1024px' : '736px'
        "
        frameborder="0"
        scrolling="auto"
        style="
          border-radius: 18px;
          transition: all 0.3s;
          border: #eee solid 8px;
        "
        class="mt-4 mx-auto d-block"
        ref="ifram_view"
      >
      </iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageBuilderUsersBehavior",

  props: {
    page: { require: true },
  },

  data: () => ({
    type: "desktop", // desktop   tablet   mobile
  }),

  computed: {
    render_url() {
      return `/shuttle/shop-component/${this.$route.params.shop_id}/pages/${this.page.id}/render`;
    },
  },

  watch: {},

  created() {},
  mounted() {},

  methods: {},
};
</script>

<style scoped></style>
