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
  <s-setting-group class="o-swiper-thumbnail">
    <s-setting-switch
      v-model="modelValue.thumbnail.enable"
      icon="calendar_view_month"
      title="Thumbnail"
    >
    </s-setting-switch>

    <v-expand-transition>
      <div v-if="modelValue.thumbnail.enable" class="-content">
        <s-setting-select
          v-model="modelValue.thumbnail.type"
          :items="ThumbnailType"
          title="Type"
        ></s-setting-select>

        <s-setting-select
          v-model="modelValue.thumbnail.active"
          :items="CenterSlideEffect"
          title="Center slide effect"
        ></s-setting-select>

        <s-setting-switch
          v-model="modelValue.thumbnail.rounded"
          title="Rounded"
        ></s-setting-switch>
      </div>
    </v-expand-transition>
  </s-setting-group>
</template>

<script>
import { defineComponent } from "vue";
import SSettingSwitch from "../../../../styler/settings/switch/SSettingSwitch.vue";
import SSettingGroup from "../../../../styler/settings/group/SSettingGroup.vue";
import SSettingSelect from "../../../../styler/settings/select/SSettingSelect.vue";
import { ThumbnailType } from "../../../../settings/swiper/enums/ThumbnailEnums";
import { CenterSlideEffect } from "../../../../settings/swiper/enums/CneterSlideEnums";

export default defineComponent({
  name: "OSwiperThumbnail",
  components: { SSettingSelect, SSettingGroup, SSettingSwitch },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  computed: {},
  data: () => ({
    ThumbnailType: ThumbnailType,
    CenterSlideEffect: CenterSlideEffect,
  }),

  watch: {},
  created() {
    if (!this.modelValue.thumbnail || !this.isObject(this.modelValue.thumbnail))
      this.modelValue.thumbnail = {
        enable: false,
      };
  },
});
</script>

<style lang="scss" scoped>
.o-swiper-thumbnail {
  .-content {
    > :not(:last-child) {
      border-bottom: dashed 1px #545454;
    }
  }
}
</style>
