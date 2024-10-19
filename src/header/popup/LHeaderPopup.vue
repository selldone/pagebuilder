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
  <div v-if="popup" class="d-flex align-center">
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

      <v-avatar
        color="#000"
        class="avatar-gradient -thin -amber hover-scale-small"
        size="24"
      >
        <v-img :src="getShopImagePath(popup.image, 256, popup.id)" />
      </v-avatar>

      <v-icon class="ms-2 d-none d-md-inline-block">drag_indicator</v-icon>

      <v-btn
        :title="
          (popup.published
            ? $t('global.commons.published')
            : $t('global.commons.draft')) +
          ` - You should save to apply changes!`
        "
        class="mx-1 tnt"
        size="small"
        variant="text"
        @click="popup.published = !popup.published"
      >
        <v-icon :color="popup.published ? '#fff' : 'red'" size="small" start>
          {{ popup.published ? "visibility" : "visibility_off" }}
        </v-icon>
        {{
          popup.published
            ? $t("global.commons.published")
            : $t("global.commons.draft")
        }}
      </v-btn>
    </v-sheet>

    <v-spacer class="mx-1"></v-spacer>

    <v-sheet elevation="3" rounded="lg" color="#000" class="ma-1 pa-1">
      <v-btn
        @click="show_preview_popup = true"
        class="tnt fadeIn delay_200"
        size="small"
        variant="text"
        prepend-icon="cast_connected"
      >
        {{ $t("popup_page.preview") }}
      </v-btn>

      <!-- --------------------------------- Preview --------------------------------- -->
      <s-storefront-popup
        v-if="show_preview_popup"
        v-model="show_preview_popup"
        :preview-popup="popup"
        preview
      ></s-storefront-popup>

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
import SStorefrontPopup from "@selldone/components-vue/storefront/popup/SStorefrontPopup.vue";

export default defineComponent({
  name: "LHeaderPopup",
  components: { SStorefrontPopup },
  inject: ["$builder", "$shop"],
  props: {
    /**
     * Back route
     */
    backTo: { required: true },
  },

  data: () => ({
    show_preview_popup: false,
  }),

  computed: {
    popup() {
      return this.$builder.model;
    },
  },

  methods: {},
});
</script>

<style lang="scss"></style>
