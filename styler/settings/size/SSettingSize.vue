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
  <!-- ████████████████████████ Size ████████████████████████ -->
  <v-list-item
    :title="title"
    :prepend-icon="icon"
    density="compact"
    :class="{ 'disabled-scale-down': disabled }"
    class="s--setting-size"
  >
    <template v-slot:append>
      <s-number-dimension-input
        :model-value="modelValue"
        @update:model-value="setValue"
        hide-details
        dense
        style="min-width: 200px"
        variant="plain"
        :disabled="disabled"
      ></s-number-dimension-input>
    </template>
  </v-list-item>
</template>

<script>
import { defineComponent } from "vue";
import SNumberDimensionInput from "@components/ui/dimension/SNumberDimensionInput.vue";

export default defineComponent({
  name: "SSettingSize",
  components: { SNumberDimensionInput },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: {},
    icon: {},

    disabled: Boolean,
  },
  computed: {
    is_object() {
      return this.items[0] instanceof Object;
    },
  },
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
.s--setting-size {
}
</style>
