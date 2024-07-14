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
      //'widget-hover pp': clickable /*We are in teh shop!*/,
    }"
    :disabled="!!loading"
    :min-width="minWidth"
    :ripple="clickable"
    :to="need_become_premium ? undefined : to"
    class="rounded-2rem position-relative overflow-hidden pa-2 border"
    @click="need_become_premium ? showNeedSubscribePremium() : $emit('select')"
    :variant="variant"
    :style="!clickable && !to ? 'cursor: initial' : undefined"
  >
    <v-img
      :src="getShopImagePath(template.image)"
      aspect-ratio="1"
      class="rounded-2rem elevation-3"
      cover
    >
      <template v-slot:placeholder>
        <v-icon class="center-absolute op-0-3" size="48">layers</v-icon>
      </template>
      <div class="ma-2 absolute-bottom-end">
        <v-chip
          v-if="template.premium"
          class="ma-1"
          color="#673AB7"
          size="x-small"
          variant="flat"
          title="This template is accessible exclusively for premium users who have subscribed to premium content."
        >
          <v-icon start>auto_awesome</v-icon>
          premium
        </v-chip>
        <v-chip
          v-if="template.hot"
          class="ma-1"
          color="#D32F2F"
          size="x-small"
          variant="flat"
        >
          <v-icon start>local_fire_department</v-icon>
          hot
        </v-chip>
      </div>
    </v-img>
    <u-loading-progress v-if="loading"></u-loading-progress>
    <v-card-title class="text-subtitle-2">
      {{ template.name }}
    </v-card-title>
    <v-card-actions>
      <div class="widget-buttons">
        <v-btn
          v-if="template.preview"
          :href="template.preview"
          :size="size"
          target="_blank"
          variant="outlined"
          @click.stop
          >{{ $t("global.commons.preview") }}
          <v-icon end>open_in_new</v-icon>
        </v-btn>

        <v-btn
          v-if="need_become_premium"
          color="#000"
          :size="size"
          variant="elevated"
          @click="showNeedSubscribePremium()"
        >
          <v-icon start>auto_awesome</v-icon>

          {{ $t("global.actions.become_premium") }}
        </v-btn>

        <v-btn
          v-else-if="!in_shop_mode"
          :href="`/magic-links/shop:pages:template?template_id=${template.id}`"
          color="#000"
          :size="size"
          target="_blank"
          variant="elevated"
        >
          <v-icon start>upload_file</v-icon>

          {{ $t("global.actions.deploy_now") }}
        </v-btn>
        <v-btn
          v-else-if="in_shop_mode"
          :to="{
            name: 'BPageLandingEditor',
            params: { page_id: 'new' },
            query: { template_id: template.id },
          }"
          color="#000"
          :size="size"
          variant="elevated"
        >
          <v-icon start>upload_file</v-icon>

          {{ $t("global.actions.deploy_now") }}
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "LTemplateCard",
  components: {},
  emits: ["select"],
  props: {
    template: {
      type: Object,
      require: true,
    },
    to: {},

    loading: {},

    clickable: Boolean,
    variant: {
      default: "outlined",
    },
    minWidth:{},

    size: {
      default: "large",
    },

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

    in_shop_mode() {
      return !!this.$route.params.shop_id;
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

<style lang="scss" scoped></style>
