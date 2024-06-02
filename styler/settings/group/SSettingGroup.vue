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
    <v-card-title v-if="title" class="-group-title pb-0 mt-2 text-uppercase d-flex align-center">
      <v-icon v-if="icon" class="me-2">{{ icon }}</v-icon>
      {{ title }} <v-spacer></v-spacer> <slot name="title-action"></slot>
    </v-card-title>
    <v-card-subtitle v-if="subtitle" class="small text-wrap"
      >{{ subtitle }}
    </v-card-subtitle>
    <v-card class="my-2" color="#282828" rounded="lg">
      <div class="-card-content">
        <slot></slot>
      </div>
    </v-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SSettingGroup",
  components: {},
  props: {
    title: {},
    subtitle: {},
    icon: {},
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
  margin-bottom: 12px;

  .-group-title {
    font-size: 14px !important;
    opacity: 0.6;
  }

  .-card-content {
    > :not(:last-child) {
      border-bottom: solid 1px #545454;
    }
  }

  --background: #282828; // For nested components like <s-fade-scroll>
}
</style>
