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
  <v-item-group
    :model-value="modelValue"
    @update:model-value="(val) => $emit('update:modelValue', val)"
    :multiple="multiple"
  >
    <v-container>
      <v-row justify="center" class="pb-10">
        <v-item
          v-for="(item, index) in hoversClasses"
          :key="index"
          v-slot="{ active, toggle }"
          :value="item"
        >
          <v-card
            :color="active ? 'amber' : ''"
            class="p-1 rounded-18px overflow-hidden m-1 position-relative d-flex align-center justify-center transition-ease-in-out hover-top"
            flat
            @click="toggle"
            :elevation="active ? 10 : 0"
            width="72"
            height="72"
            :class="item"
          >
            <v-icon color="blue" class="bg-sunny-morning text-gradient mb-3"
              >lens</v-icon
            >

            <div class="bottom-absolute-bar-dark text-capitalize p-1">
              {{ getName(item) }}
            </div>
          </v-card>
        </v-item>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
import { ClassesHelper } from "@core/helper/style/Classes";

export default {
  name: "HoverClassSelector",
  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    hoversClasses: ClassesHelper.HoversClasses(),
  }),
};
</script>

<style scoped lang="scss">
.hover-top {
  &:hover {
    z-index: 1;
  }
}
</style>
