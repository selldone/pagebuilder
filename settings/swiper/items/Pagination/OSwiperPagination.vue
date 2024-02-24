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
  <s-setting-group class="o-switch-pagination">
    <s-setting-switch
      v-model="modelValue.pagination.enabled"
      icon="more_horiz"
      title="Pagination"
    >
    </s-setting-switch>

    <v-expand-transition>
      <div v-if="modelValue.pagination.enabled" class="-content">
        <s-setting-select
          v-model="modelValue.pagination.type"
          :items="['progressbar', 'bullets', 'fraction']"
          title="Type"
        ></s-setting-select>

        <s-setting-switch
          v-model="modelValue.pagination.hideOnClick"
          title="Hide on click"
        ></s-setting-switch>
        <s-setting-switch
          v-model="modelValue.pagination.dynamicBullets"
          title="Dynamic bullets"
        ></s-setting-switch>
        <s-setting-number-select
          v-model="modelValue.pagination.dynamicMainBullets"
          :disabled="!modelValue.pagination.dynamicBullets"
          :max="10"
          :min="1"
          title="Dynamic main bullets"
        ></s-setting-number-select>
      </div>
    </v-expand-transition>
  </s-setting-group>
</template>

<script>
import { defineComponent } from "vue";
import SSettingSwitch from "@app-page-builder/styler/settings/switch/SSettingSwitch.vue";
import SSettingGroup from "@app-page-builder/styler/settings/group/SSettingGroup.vue";
import SSettingSelect from "@app-page-builder/styler/settings/select/SSettingSelect.vue";
import SSettingNumberSelect from "@app-page-builder/styler/settings/number-select/SSettingNumberSelect.vue";

export default defineComponent({
  name: "OSwiperPagination",
  components: {
    SSettingNumberSelect,
    SSettingSelect,
    SSettingGroup,
    SSettingSwitch,
  },
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
      !this.modelValue.pagination ||
      !this.isObject(this.modelValue.pagination)
    )
      this.modelValue.pagination = {
        enabled: false,
        type: "bullets",
        el: ".swiper-pagination",
        dynamicBullets: false,
        dynamicMainBullets: 3,
        clickable: true,
      };
  },
});
</script>

<style lang="scss" scoped>
.o-switch-pagination {
  .-content {
    > :not(:last-child) {
      border-bottom: dashed 1px #545454;
    }
  }
}
</style>
