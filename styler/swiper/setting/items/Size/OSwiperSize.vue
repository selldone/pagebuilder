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
  <s-setting-group title="Size">
    <s-setting-switch
      v-model="modelValue.autoHeight"
      title="Auto height"
      icon="height"
    ></s-setting-switch>

    <s-setting-size
      v-model="modelValue.height"
      title="Slides Height"
      icon="straighten"
    ></s-setting-size>
  </s-setting-group>
</template>

<script>
import { defineComponent } from "vue";
import SSettingGroup from "@app-page-builder/styler/settings/group/SSettingGroup.vue";
import SSettingSize from "@app-page-builder/styler/settings/size/SSettingSize.vue";
import SSettingSwitch from "@app-page-builder/styler/settings/switch/SSettingSwitch.vue";

export default defineComponent({
  name: "OSwiperSize",
  components: {
    SSettingSwitch,
    SSettingSize,

    SSettingGroup,
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  computed: {},
  watch: {},
  created() {},
});
</script>

<style scoped lang="scss"></style>
