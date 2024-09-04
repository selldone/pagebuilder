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
  <s-setting-expandable :value="value" icon="edit_note" title="Content">
    <template v-slot:title>

    </template>

    <s-setting-text-input
      :model-value="text"
      @update:model-value="(v) => $emit('update:text', v)"
      multiple-lines
      messages="Set dynamic values by {{key}}, also if you want to use this as a template in the product page, you can set dynamic values by {{product.title}}, {{product.title_en}}, {{product.sku}},..."
    ></s-setting-text-input>
  </s-setting-expandable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SSettingTextInput from "@selldone/page-builder/styler/settings/text-input/SSettingTextInput.vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";

export default defineComponent({
  name: "LSettingsContentText",
  components: {
    SSettingExpandable,
    SSettingTextInput,
  },
  emits: [],
  props: {
    text: {},
  },
});
</script>

<style scoped lang="scss"></style>
