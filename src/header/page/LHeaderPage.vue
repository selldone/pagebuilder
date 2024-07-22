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
  <div v-if="page" class="d-flex align-center">
    <v-sheet elevation="3" rounded="lg" color="#000" class="ma-1 pa-1">
      <v-btn
        :prepend-icon="$t('icons.arrow_back')"
        :to="backTo"
        class="tnt me-2"
        variant="text"
        size="small"
      >
        {{ $t("global.actions.back") }}
      </v-btn>

      <!-- Shop -->

      <a
        :href="getShopMainUrl($shop)"
        :title="`Open ${$shop.title} home page ➡`"
        target="_blank"
      >
        <v-avatar
          v-if="$shop.icon"
          class="avatar-gradient -thin -shop hover-scale-small"
          size="24"
        >
          <v-img :src="getShopImagePath($shop.icon, 64)" />
        </v-avatar>
      </a>

      <img
        class="mx-2"
        src="../../../../components-vue/assets/icons/wire-w.svg"
        width="12"
      />

      <!-- Page -->
      <a
        :class="{ 'disabled-view': !page.published }"
        :href="page_view_url"
        :title="`Open this landing page ➡`"
        target="_blank"
      >
        <v-avatar
          color="#000"
          class="avatar-gradient -thin -blue hover-scale-small"
          size="24"
        >
          <v-img :src="getShopImagePath(page.image, 256, page.id)" />
          <!-- Only 64 & 256 exist for page cover -->
        </v-avatar>
      </a>

      <v-icon class="ms-2 d-none d-md-inline-block">drag_indicator</v-icon>

      <v-btn
        :title="
          (page.published
            ? $t('global.commons.published')
            : $t('global.commons.draft')) +
          ` - You should save to apply changes!`
        "
        class="mx-1 tnt"
        size="small"
        variant="text"
        @click="page.published = !page.published"
      >
        <v-icon :color="page.published ? '#fff' : 'red'" size="small" start>
          {{ page.published ? "visibility" : "visibility_off" }}
        </v-icon>
        {{
          page.published
            ? $t("global.commons.published")
            : $t("global.commons.draft")
        }}
      </v-btn>
    </v-sheet>

    <v-spacer class="mx-1"></v-spacer>

    <v-sheet elevation="3" rounded="lg" color="#000" class="ma-1 pa-1">
      <template v-if="hasLiveView">
        <v-btn
          class="tnt fadeIn delay_400"
          size="small"
          :to="{
            name: 'BPageLandingLive',
            params: { shop_id: page.shop_id, page_id: page.id },
            query: { responsible: true },
          }"
          target="_blank"
          :variant="audiences?.length ? 'elevated' : 'text'"
          :color="audiences?.length ? 'primary' : undefined"
          @click="$builder.livestream.setEnable(true) /*Enable live stream*/"
        >
          Live Preview

          <u-dense-circles-users
            :ids="audiences"
            :limit="5"
            :size="20"
            class="pa-0 overflow-visible ms-2 fadeIn delay_300"
            color="#FFC107"
            title="Online team members are viewing this page."
          ></u-dense-circles-users>
        </v-btn>

        <span class="mx-1 d-none d-md-inline-block">|</span>
      </template>

      <v-btn
        :href="page_view_url"
        class="tnt fadeIn delay_200"
        size="small"
        target="_blank"
        variant="text"
        append-icon="open_in_new"
        title="View Public Page"
      >
        {{ page.title }}
      </v-btn>

      <span class="mx-1 d-none d-md-inline-block">|</span>

      <v-chip
        v-if="USER()"
        class="mx-2"
        variant="outlined"
        size="small"
        :prepend-avatar="getUserAvatar(USER().id)"
      >
        {{ USER().name }}
      </v-chip>
      <v-chip
        v-else
        class="mx-2"
        variant="outlined"
        size="small"
        prepend-icon="account_circle"
      >
        Guest
      </v-chip>
    </v-sheet>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import UDenseCirclesUsers from "@selldone/components-vue/ui/dense-circles/users/UDenseCirclesUsers.vue";

export default defineComponent({
  name: "LHeaderPage",
  components: {
    UDenseCirclesUsers,
  },
  inject: ["$builder", "$shop"],
  props: {
    /**
     * Back route
     */
    backTo: { required: true },
  },

  data: () => ({}),

  computed: {
    page() {
      return this.$builder.model;
    },

    page_view_url() {
      if (this.$shop)
        return this.getShopMainUrl(this.$shop) + `/pages/${this.page.name}`;
      return null;
      // return `/@${this.shop.name}/pages/${this.page.name}`;
    },
    hasLiveView() {
      return this.page?.id && this.page.shop_id;
    },
    audiences() {
      return this.$builder.livestream.audiences;
    },
  },

  methods: {},
});
</script>

<style lang="scss"></style>
