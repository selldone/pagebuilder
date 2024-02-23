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
  <div>
    <s-setting-switch
      v-model="modelValue.centeredSlides"
      title="Centered slides"
      icon="view_carousel"
    >
    </s-setting-switch>

    <s-setting-expandable
      title="Center slide effect"
      icon="subdirectory_arrow_right"
      bg-color="transparent"

    >
      <s-setting-select
        :items="CenterSlideEffect"
        v-model="modelValue.active"
        title="Effect"
        icon="layers"
        clearable
      ></s-setting-select>
    </s-setting-expandable>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import SSettingSwitch from "@app-page-builder/styler/settings/switch/SSettingSwitch.vue";
import SSettingExpandable from "@app-page-builder/styler/settings/expandable/SSettingExpandable.vue";
import { CenterSlideEffect } from "@app-page-builder/styler/swiper/setting/enums/CneterSlideEnums";
import SSettingSelect from "@app-page-builder/styler/settings/select/SSettingSelect.vue";

export default defineComponent({
  name: "OSwiperCenteredSlides",
  components: { SSettingSelect, SSettingExpandable, SSettingSwitch },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  computed: {},
  data: () => ({
    CenterSlideEffect: CenterSlideEffect,
  }),
  watch: {},
  created() {},
});
</script>

<style scoped lang="scss"></style>
