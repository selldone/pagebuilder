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
  <s-setting-group class="o-switch-auto-play">
    <s-setting-switch
      v-model="modelValue.data.autoplay.enabled"
      icon="animation"
      label="Auto play"
    ></s-setting-switch>

    <v-expand-transition>
      <div v-if="modelValue.data.autoplay.enabled" class="-content">
        <s-setting-slider
          v-model="modelValue.data.autoplay.delay"
          :max="60000"
          :max-slider="10000"
          :min="1000"
          suffix="ms"
          label="Delay"
        ></s-setting-slider>

        <s-setting-switch
          v-model="modelValue.data.autoplay.disableOnInteraction"
          label="Disable on interaction"
        ></s-setting-switch>

        <s-setting-switch
          v-model="modelValue.data.autoplay.pauseOnMouseEnter"
          label="Pause on pointer enter"
        ></s-setting-switch>

        <s-setting-switch
          v-model="modelValue.data.autoplay.reverseDirection"
          label="Reverse direction"
        ></s-setting-switch>

        <s-setting-switch
          v-model="modelValue.data.autoplay.stopOnLastSlide"
          label="Stop on last slide"
        ></s-setting-switch>
      </div>
    </v-expand-transition>
  </s-setting-group>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SSettingGroup from "../../../../styler/settings/group/SSettingGroup.vue";
import SSettingSwitch from "../../../../styler/settings/switch/SSettingSwitch.vue";
import SSettingSlider from "../../../../styler/settings/slider/SSettingSlider.vue";
import { XSwiperObject } from "@selldone/page-builder/components/x/swiper/XSwiperObject.ts";

export default defineComponent({
  name: "OSwiperAutoPlay",
  components: {
    SSettingSlider,

    SSettingSwitch,

    SSettingGroup,
  },
  props: {
    modelValue: {
      type: XSwiperObject,
      required: true,
    },
  },
  computed: {},
  watch: {},
  created() {
    if (
      !this.modelValue.data.autoplay ||
      !this.isObject(this.modelValue.data.autoplay) ||
      !this.modelValue.data.autoplay.delay
    )
      this.modelValue.data.autoplay = {
        enabled: false,
        delay: 3000,
        pauseOnMouseEnter: true,
      };
  },
});
</script>

<style lang="scss" scoped>
.o-switch-auto-play {
  .-content {
    > :not(:last-child) {
      border-bottom: dashed 1px #545454;
    }
  }
}
</style>
