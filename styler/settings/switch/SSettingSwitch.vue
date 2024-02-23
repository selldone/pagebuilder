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
  <!-- ████████████████████████ Switch ████████████████████████ -->

  <v-list-item
    :title="title"
    :prepend-icon="icon"
    density="compact"
    @click="setValue(!modelValue)"
    class="s--setting-switch"
    :class="{'disabled-scale-down':disabled}"
  >
    <template v-slot:append>
      <v-switch
        inset
        :model-value="modelValue"
        @update:model-value="(val) => setValue(val)"
        @click.stop
        hide-details
        density="compact"
        color="#1976D2"
        class="-switch"
        :disabled="disabled"
      ></v-switch>
    </template>
  </v-list-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SSettingSwitch",
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    title: {},
    icon: {},
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
.s--setting-switch {

  .-switch{
    transform: scale(0.8);
  }
}
</style>
