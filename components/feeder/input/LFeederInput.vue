<!--
  - Copyright (c) 2023. Selldone® Business OS™
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
  <div v-if="modelValue">


    <s-setting-text-input label="Label" placeholder="Input label..."   v-model="modelValue.label"></s-setting-text-input>

    <s-setting-text-input label="Placeholder" placeholder="Sample of input..."   v-model="modelValue.placeholder"></s-setting-text-input>


    <s-setting-text-input label="Message" placeholder="A short message..."   v-model="modelValue.messages"></s-setting-text-input>


    <s-setting-text-input label="Hint" placeholder="A short help..." subtitle="It will appear when the user clicks on the input and focusing on it."   v-model="modelValue.hint"></s-setting-text-input>



    <s-setting-switch v-model="modelValue.persistentPlaceholder" label="Persistent Placeholder"></s-setting-switch>



    <s-setting-switch v-model="modelValue.flat" label="Flat"></s-setting-switch>

    <s-setting-rounded v-model="modelValue.rounded"></s-setting-rounded>

    <s-setting-variant v-model="modelValue.variant"></s-setting-variant>

    <s-setting-color v-model="modelValue.color" label="Color" clearable></s-setting-color>

    <s-setting-color
      v-model="modelValue.backgroundColor"
      label="Background"
      clearable
    ></s-setting-color>
  </div>
</template>

<script>
import SSettingSwitch from "@selldone/page-builder/styler/settings/switch/SSettingSwitch.vue";
import SSettingRounded from "@selldone/page-builder/styler/settings/rounded/SSettingRounded.vue";
import SSettingVariant from "@selldone/page-builder/styler/settings/variant/SSettingVariant.vue";
import SSettingColor from "@selldone/page-builder/styler/settings/color/SSettingColor.vue";
import SSettingTextInput from "@selldone/page-builder/styler/settings/text-input/SSettingTextInput.vue";

export default {
  name: "LFeederInput",
  components: {
    SSettingTextInput,
    SSettingColor,
    SSettingVariant,
    SSettingRounded,
    SSettingSwitch,
  },

  props: {
    modelValue: {},
  },
  data: () => {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
