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
  <v-card
    class="rounded-2rem widget position-relative border overflow-hidden"
    @click.native="
      need_become_premium ? showNeedSubscribePremium() : $emit('click')
    "
    :disabled="!!loading"
    :class="{
      'widget-hover pp': !show_deploy_button /*We are in teh shop!*/,
    }"
    :ripple="!show_deploy_button"
    :to="need_become_premium ? undefined : to"
    :min-width="show_deploy_button ? 360 : undefined"
  >
    <v-img
      :src="getShopImagePath(template.image)"
      aspect-ratio="1"
      class="rounded-2rem"
    >
      <div class="ma-2 absolute-bottom-end">
        <v-chip
          v-if="template.premium"
          class="ma-1"
          small
          color="#673AB7"
          dark
          title="This template is accessible exclusively for premium users who have subscribed to premium content."
          ><v-icon small left>auto_awesome</v-icon> premium</v-chip
        >
        <v-chip v-if="template.hot" class="ma-1" small color="#D32F2F" dark
          ><v-icon small left>local_fire_department</v-icon> hot</v-chip
        >
      </div>
    </v-img>
    <s-progress-loading v-if="loading"></s-progress-loading>
    <v-card-title>
      {{ template.name }}
    </v-card-title>
    <v-card-actions>
      <div class="widget-buttons">
        <v-btn
          v-if="template.preview"
          outlined
          :href="template.preview"
          target="_blank"
          @click.stop
          x-large
          >Preview <v-icon class="ms-1" small>open_in_new</v-icon></v-btn
        >

        <v-btn
          v-if="
            show_deploy_button &&
            !need_become_premium /*We are in the templates page of selldone*/
          "
          depressed
          color="success"
          dark
          :href="`/magic-links/shop:pages:template?template_id=${template.id}`"
          target="_blank"
          x-large
        >
          <v-icon class="me-1" small>upload_file</v-icon> Deploy Now
        </v-btn>

        <v-btn
          v-if="show_deploy_button && need_become_premium"
          @click="showNeedSubscribePremium()"
          depressed
          x-large
          color="primary"
          dark
        >
          <v-icon class="me-1">auto_awesome</v-icon>
          Become Premium
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "PageTemplateCard",
  components: {},
  props: {
    template: {
      type: Object,
      require: true,
    },
    to: {},

    loading: {},
  },
  data() {
    return {};
  },

  computed: {
    user() {
      return this.USER();
    },
    need_become_premium() {
      return this.template.premium && !this.user?.premium;
    },

    show_deploy_button() {
      return !this.$route.params.shop_id;
    },
  },

  watch: {},
  created() {},
  mounted() {},

  updated() {},

  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.x--page-builder-templates {
  overflow: hidden;
  text-align: start;
  border-radius: 12px;

  .drawer {
    // z-index: 99;
  }
  .drawer-open-margin {
    padding-left: 280px;
  }
}
</style>
