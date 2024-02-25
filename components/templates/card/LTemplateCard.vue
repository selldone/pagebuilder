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
    :class="{
      'widget-hover pp': !show_deploy_button /*We are in teh shop!*/,
    }"
    :disabled="!!loading"
    :min-width="show_deploy_button ? 360 : undefined"
    :ripple="!show_deploy_button"
    :to="need_become_premium ? undefined : to"
    class="rounded-2rem widget position-relative border overflow-hidden"
    @click="need_become_premium ? showNeedSubscribePremium() : $emit('click')"
  >
    <v-img
      :src="getShopImagePath(template.image)"
      aspect-ratio="1"
      class="rounded-2rem"
      cover
    >
      <div class="ma-2 absolute-bottom-end">
        <v-chip
          v-if="template.premium"
          class="ma-1"
          color="#673AB7"
          size="small"
          title="This template is accessible exclusively for premium users who have subscribed to premium content."
        >
          <v-icon size="small" start>auto_awesome</v-icon>
          premium
        </v-chip>
        <v-chip v-if="template.hot" class="ma-1" color="#D32F2F" size="small">
          <v-icon size="small" start>local_fire_department</v-icon>
          hot
        </v-chip>
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
          :href="template.preview"
          size="x-large"
          target="_blank"
          variant="outlined"
          @click.stop
          >Preview
          <v-icon class="ms-1" size="small">open_in_new</v-icon>
        </v-btn>

        <v-btn
          v-if="
            show_deploy_button &&
            !need_become_premium /*We are in the templates page of selldone*/
          "
          :href="`/magic-links/shop:pages:template?template_id=${template.id}`"
          color="success"
          size="x-large"
          target="_blank"
          variant="flat"
        >
          <v-icon class="me-1" size="small">upload_file</v-icon>
          Deploy Now
        </v-btn>

        <v-btn
          v-if="show_deploy_button && need_become_premium"
          color="primary"
          size="x-large"
          variant="flat"
          @click="showNeedSubscribePremium()"
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
  name: "LTemplateCard",
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

  beforeUnmount() {},
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
