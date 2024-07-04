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
  <s-setting-group title="Effects">
    <s-setting-select
      v-model="modelValue.data.effect"
      :items="effects"
      icon="view_compact_alt"
      label="Effect"
    ></s-setting-select>
  </s-setting-group>
</template>

<script>
import { defineComponent } from "vue";
import SSettingSelect from "../../../../styler/settings/select/SSettingSelect.vue";
import SSettingGroup from "../../../../styler/settings/group/SSettingGroup.vue";
import { XSwiperObjectDataTypes } from "@selldone/page-builder/components/x/swiper/XSwiperObjectData.ts";
import { XSwiperObject } from "@selldone/page-builder/components/x/swiper/XSwiperObject.ts";

export default defineComponent({
  name: "OSwiperEffect",
  components: { SSettingGroup, SSettingSelect },
  props: {
    modelValue: {
      type: XSwiperObject,
      required: true,
    },
  },
  computed: {},
  data() {
    return {
      effects: Object.values(XSwiperObjectDataTypes.Effect),
    };
  },
  watch: {},
  created() {
    if (!this.modelValue.data.effect)
      this.modelValue.data.effect = XSwiperObjectDataTypes.Effect.Slide;
  },
});
</script>

<style lang="scss" scoped></style>
