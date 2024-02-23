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
      v-model="modelValue.effect"
      title="Effect"
      icon="view_compact_alt"
      :items="effects"
    ></s-setting-select>
  </s-setting-group>
</template>

<script>
import { defineComponent } from "vue";
import SSettingSelect from "@app-page-builder/styler/settings/select/SSettingSelect.vue";
import SSettingGroup from "@app-page-builder/styler/settings/group/SSettingGroup.vue";

export default defineComponent({
  name: "OSwiperEffect",
  components: { SSettingGroup, SSettingSelect },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  computed: {},
  data() {
    return {
      effects: [
        "slide",
        "fade",
        "cube",
        "flip",
        "coverflow",
        "cards",
        "panorama",
        "carousel",
        "shutters",
        "slicer",
        "gl",
        "tinder",
        "material",
        "creative",
      ],
    };
  },
  watch: {},
  created() {
    if (!this.modelValue.effect) this.modelValue.effect = "slide";
  },
});
</script>

<style scoped lang="scss"></style>
