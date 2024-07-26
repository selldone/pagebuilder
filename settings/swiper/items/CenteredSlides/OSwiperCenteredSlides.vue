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
      v-model="modelValue.data.centeredSlides"
      icon="view_carousel"
      label="Centered slides"
    >
    </s-setting-switch>

    <v-expansion-panels>
      <s-setting-expandable
        bg-color="transparent"
        icon="subdirectory_arrow_right"
        title="Center slide effect"
      >
        <template v-slot:title>
          <s-setting-chip :value="modelValue.data.active" icon="filter_tilt_shift"></s-setting-chip>
        </template>
        <s-setting-select
          v-model="modelValue.data.active"
          :items="CenterSlideEffect"
          clearable
          icon="layers"
          label="Effect"
        ></s-setting-select>
      </s-setting-expandable>
    </v-expansion-panels>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import SSettingSwitch from "../../../../styler/settings/switch/SSettingSwitch.vue";
import SSettingExpandable from "../../../../styler/settings/expandable/SSettingExpandable.vue";
import { CenterSlideEffect } from "../../../../settings/swiper/enums/CneterSlideEnums";
import SSettingSelect from "../../../../styler/settings/select/SSettingSelect.vue";
import { XSwiperObject } from "@selldone/page-builder/components/x/swiper/XSwiperObject.ts";
import SSettingChip from "@selldone/page-builder/styler/settings/chip/SSettingChip.vue";

export default defineComponent({
  name: "OSwiperCenteredSlides",
  components: {SSettingChip, SSettingSelect, SSettingExpandable, SSettingSwitch },
  props: {
    modelValue: {
      type: XSwiperObject,
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

<style lang="scss" scoped></style>
