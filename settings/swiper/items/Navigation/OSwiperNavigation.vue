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
  <s-setting-group>
    <s-setting-switch
      v-model="modelValue.navigation.enable"
      icon="settings_ethernet"
      label="Navigation"
    >
    </s-setting-switch>

    <v-expand-transition>
      <div v-if="modelValue.navigation.enable"></div>
    </v-expand-transition>
  </s-setting-group>
</template>

<script>
import { defineComponent } from "vue";
import SSettingSwitch from "../../../../styler/settings/switch/SSettingSwitch.vue";
import SSettingGroup from "../../../../styler/settings/group/SSettingGroup.vue";

export default defineComponent({
  name: "OSwiperNavigation",
  components: { SSettingGroup, SSettingSwitch },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  computed: {},
  watch: {},
  created() {
    if (
      !this.modelValue.navigation ||
      !this.isObject(this.modelValue.navigation)
    )
      this.modelValue.navigation = {
        enable: false,
      };
  },
});
</script>

<style scoped lang="scss"></style>
