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
  <!-- ████████████████████████ Group ████████████████████████ -->
  <div class="s--setting-group">
    <v-card-title
      v-if="title"
      class="-group-title pb-0 mt-2 text-uppercase d-flex align-center"
    >
      <img
        v-if="image"
        :src="image"
        width="24"
        height="24"
        class="me-2 border rounded-lg"
      />
      <v-icon v-else-if="icon" class="me-2">{{ icon }}</v-icon>

      {{ title }}
      <v-spacer></v-spacer>
      <slot name="title-action"></slot>
    </v-card-title>
    <v-card-subtitle v-if="subtitle || helpPath" class="small text-wrap pt-1"
      >{{ subtitle }}
      <s-widget-help v-if="helpPath" :code="helpPath" color="#fff" inline></s-widget-help>
    </v-card-subtitle>
    <v-card class="my-2" color="#282828" rounded="lg" flat>
      <div class="-card-content">
        <slot></slot>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SWidgetHelp from "@selldone/components-vue/ui/widget/help/SWidgetHelp.vue";

export default defineComponent({
  name: "SSettingGroup",
  components: { SWidgetHelp },
  props: {
    title: {},
    subtitle: {},
    icon: {},
    image: {},
    helpPath:{},
  },
  computed: {},
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="scss">
.s--setting-group {
  padding-bottom: 12px;

  .-group-title {
    font-size: 14px !important;
    // opacity: 0.6;
  }

  .-card-content {
    > :not(:last-child) {
      border-bottom: solid 1px #545454;
    }
  }

  --background: #282828; // For nested components like <s-fade-scroll>
}
</style>
