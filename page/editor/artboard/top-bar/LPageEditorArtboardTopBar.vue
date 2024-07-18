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
  <v-toolbar
    v-if="page"
    class="py-1 border-bottom rounded-t-xl"
    color="#fff"
    dir="ltr"
    flat
    height="84"
    :open-delay="500"
  >
    <!-- ▃▃▃▃▃▃▃▃▃▃ 📇 View > Normal ▃▃▃▃▃▃▃▃▃▃ -->

    <v-tooltip
      content-class="bg-black text-start pa-3 small"
      location="top"
      max-width="420"
      :open-delay="500"
    >
      <template v-slot:activator="{ props }">
        <span caption="Design" class="sub-caption -hover b-16px ms-2">
          <v-btn
            :size="32"
            icon
            v-bind="props"
            variant="text"
            @click="
              builder.isAnimation = false;
              builder.isTracking = false;
              builder.isHideExtra = false;
            "
          >
            <v-icon
              :color="
                !builder.isAnimation && !builder.isTracking ? 'green' : '#333'
              "
              :size="!builder.isAnimation && !builder.isTracking ? 20 : 14"
              class="hover-scale-small"
              >lens</v-icon
            >
          </v-btn>
        </span>
      </template>
      <b class="d-block">Normal View</b>
      <div>
        <v-icon class="me-1" size="small">design_services</v-icon>
        You can access all the elements and editing tools required to modify the
        content and layout of the landing page.
      </div>
    </v-tooltip>

    <!-- ▃▃▃▃▃▃▃▃▃▃ 📇 View > Animation ▃▃▃▃▃▃▃▃▃▃ -->

    <v-tooltip
      content-class="bg-black text-start pa-3 small"
      location="top"
      max-width="420"
      :open-delay="500"
    >
      <template v-slot:activator="{ props }">
        <span caption="Animation" class="sub-caption -hover b-16px">
          <v-btn
            :size="32"
            icon
            v-bind="props"
            variant="text"
            @click="
              builder.isAnimation = true;
              builder.isTracking = false;
              builder.isHideExtra = true;
            "
          >
            <v-icon
              :color="builder.isAnimation ? 'blue' : '#333'"
              :size="builder.isAnimation ? 20 : 14"
              class="hover-scale-small"
              >lens</v-icon
            >
          </v-btn>
        </span>
      </template>
      <b class="d-block">Animation View</b>
      <div>
        <v-icon class="me-1" size="small">animation</v-icon>
        To configure animation and user interactions such as mouse hover
        transitions, you can check out the blueprint and the minimalist view of
        the page.
      </div>
    </v-tooltip>

    <!-- ▃▃▃▃▃▃▃▃▃▃ 📇 View > Tracking ▃▃▃▃▃▃▃▃▃▃ -->

    <v-tooltip
      content-class="bg-black text-start pa-3 small"
      location="top"
      max-width="420"
      :open-delay="500"
    >
      <template v-slot:activator="{ props }">
        <span caption="Tracking" class="sub-caption -hover m-0 b-16px">
          <v-btn
            :size="32"
            icon
            v-bind="props"
            variant="text"
            @click="
              builder.isTracking = true;
              builder.isAnimation = false;
              builder.isHideExtra = true;
            "
          >
            <v-icon
              :color="builder.isTracking ? 'red' : '#333'"
              :size="builder.isTracking ? 20 : 14"
              class="hover-scale-small"
              >lens</v-icon
            >
          </v-btn>
        </span>
      </template>
      <b class="d-block">Tracking View</b>
      <div>
        <v-icon class="me-1" size="small">highlight_alt</v-icon>
        This view mode presents a simplified display of the page, allowing the
        allocation of tracking IDs to actions (buttons) that can be utilized in
        Google Tag Manager and other tracking applications.
      </div>
    </v-tooltip>
    <div v-if="isMenu" class="flex-grow-1 text-start text-muted px-2">Menu</div>
    <div v-else-if="isPopup" class="flex-grow-1 text-start text-muted px-2">
      Popup
    </div>
    <v-text-field
      v-else
      v-model="page.name"
      :density="$vuetify.display.smAndDown ? 'compact' : undefined"
      :disabled="isPopup"
      :placeholder="isPopup ? 'Popup' : 'Enter page address*'"
      :prefix="!isPopup && $vuetify.display.smAndUp ? base_url : ''"
      :prepend-inner-icon="isPopup ? 'notifications_none' : undefined"
      :rules="!isPopup ? [GlobalRules.required()] : undefined"
      class="english-field mx-1 mx-sm-2 mx-md-3"
      flat
      hide-details
      rounded
      variant="solo"
      bg-color="#fafafa"
    >
      <template v-if="!isPopup" v-slot:append-inner>
        <v-btn
          v-if="!demo"
          :href="base_url + page.name"
          icon
          target="_blank"
          title="Open page"
          class="mt-n3"
          @click.stop
        >
          <v-icon>launch</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <v-tooltip
      content-class="bg-black text-start pa-3 small"
      location="top"
      max-width="420"
      :open-delay="500"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          class="ms-1"
          icon
          v-bind="props"
          @click="
            () => {
              $builder.isSorting = false;

              if (fullscreen) {
                $builder.showLeftMenu = true;
              } else {
                $builder.showLeftMenu = false;
              }
            }
          "
        >
          <v-icon>{{ !fullscreen ? "fullscreen_exit" : "fullscreen" }}</v-icon>
        </v-btn>
      </template>
      <b class="d-block">View Mode</b>
      <div>
        <v-icon class="me-1" size="small">center_focus_weak</v-icon>
        Make fullscreen/compact view mode.
      </div>
      <div>
        Or press
        <span class="text-amber"
          ><v-icon class="mx-1" color="amber" size="small">swap_horiz</v-icon>
          Tab</span
        >.
      </div>
    </v-tooltip>
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "LPageEditorArtboardTopBar",
  components: {},
  inject: ["$builder"],
  emits: [],
  props: {
    page: { required: true, type: Object },
    fullscreen: { required: true, type: Boolean },

    shop: {},
    isPopup: { required: true, type: Boolean },
    isMenu: { required: true, type: Boolean },
    demo: { required: true, type: Boolean },
  },

  computed: {
    builder() {
      // Get builder from main page editor/viewer
      return inject("$builder");
    },
    base_url() {
      return this.shop
        ? `${this.getShopMainUrl(this.shop)}/pages/`
        : `${this.SetupService.MainServiceUrl()}/`;
    },
  },
});
</script>

<style scoped lang="scss"></style>
