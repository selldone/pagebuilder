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
      <s-setting-chip
        v-if="has_html"
        value="Has HTML"
        icon="warning_amber"
        class="ms-1"
      >
        <v-tooltip activator="parent" max-width="320" content-class="bg-black text-start">
          Some styles might not be applied correctly if they are overridden by HTML tags.
        </v-tooltip>
      </s-setting-chip>
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
import SSettingChip from "@selldone/page-builder/styler/settings/chip/SSettingChip.vue";

function hasHtmlTag(text) {
  const htmlTagRegex = /<\/?[a-z][\s\S]*>/i;
  return text && htmlTagRegex.test(text);
}

export default defineComponent({
  name: "LSettingsContentText",
  components: {
    SSettingChip,
    SSettingExpandable,
    SSettingTextInput,
  },
  emits: [],
  props: {
    text: {},
    value: {},
  },
  computed: {
    has_html() {
      return hasHtmlTag(this.text);
    },
  },
  created() {},
});
</script>

<style scoped lang="scss"></style>
