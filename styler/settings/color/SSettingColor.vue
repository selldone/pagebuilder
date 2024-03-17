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
  <!-- ████████████████████████ Color ████████████████████████ -->
  <v-list-item
    :class="{ 'disabled-scale-down': disabled }"
    :prepend-icon="icon"
    :title="title"
    class="s--setting-color"
    density="compact"
  >
    <template v-slot:append>
      <u-color-selector
        :model-value="modelValue"
        :nullable="clearable"
        :dialog-title="title"
        @update:model-value="setValue"
      ></u-color-selector>
    </template>
  </v-list-item>
</template>

<script>
import { defineComponent } from "vue";
import UColorSelector from "@components/ui/color/selector/UColorSelector.vue";

export default defineComponent({
  name: "SSettingColor",
  components: { UColorSelector },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: {},
    icon: {},
    clearable: Boolean,

    disabled: Boolean,
  },
  computed: {},
  data() {
    return {};
  },
  methods: {
    setValue(value) {
      this.$emit("update:modelValue", value);
    },
  },
});
</script>

<style lang="scss" scoped>
.s--setting-color {
}
</style>
