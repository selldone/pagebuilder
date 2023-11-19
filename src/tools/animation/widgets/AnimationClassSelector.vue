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
  <v-item-group :value="value" @change="(val) => $emit('input', val)">
    <v-container>
      <v-row justify="center" class="pb-10">
        <v-item
          v-for="(item, index) in animationClasses"
          :key="index"
          v-slot="{ active, toggle }"
          :value="item"
        >
          <v-card
            :color="active ? 'amber' : ''"
            class="p-1 rounded-18px overflow-hidden m-1 position-relative d-flex align-center justify-content-center"
            flat
            @click="toggle"
            :elevation="active ? 10 : 0"
            width="72"
            height="72"
          >
            <v-icon color="blue" :class="item" class="inf-anim mb-3">{{
              item && item.includes("rotate") ? "remove_circle" : "lens"
            }}</v-icon>

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
  name: "AnimationClassSelector",
  props: {
    value: {},
  },
  data: () => ({
    animationClasses: ClassesHelper.AnimationsClasses(),
  }),
};
</script>

<style scoped lang="scss">
.inf-anim {
  animation-iteration-count: infinite;
}
</style>
