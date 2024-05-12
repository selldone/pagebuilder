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
    :class="{ 'disabled-scale-down': disabled }"
    :prepend-icon="icon"
    :title="title"
    class="s--setting-size"
    density="compact"
  >
    <template v-slot:append>
      <u-dimension-input
        :disabled="disabled"
        :model-value="modelValue"
        dense
        hide-details
        style="min-width: 200px"
        variant="plain"
        @update:model-value="setValue"
      ></u-dimension-input>
    </template>
  </v-list-item>
</template>

<script>
import { defineComponent } from "vue";
import UDimensionInput from "@selldone/components-vue/ui/dimension/input/UDimensionInput.vue";

export default defineComponent({
  name: "SSettingSize",
  components: { UDimensionInput },
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
