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
  <!-- ████████████████████████ Image Position ████████████████████████ -->
  <v-list-item
    :class="{ 'disabled-scale-down': disabled }"
    density="compact"
    class="s--setting-image-position"
  >
    <template v-slot:prepend>
      <span class="-label me-2 min-width-100">
        <v-icon v-if="icon" class="me-1">{{ icon }}</v-icon>

        {{ label }}</span
      >
    </template>

    <template v-slot:append>
      <v-item-group
        :model-value="modelValue"
        :mandatory="mandatory"
        @update:model-value="
          (val) => {
            $emit('update:modelValue', val);
          }
        "
      >
        <v-container class="mx-auto text-center" style="max-width: 200px">
          <v-row dense style="font-size: 8px">
            <v-col v-for="pos in BackgroundPositions" :key="pos" cols="4">
              <v-item v-slot="{ isSelected, toggle }" :value="pos">
                <v-card
                  :color="isSelected ? 'blue' : ''"
                  :height="42"
                  :width="42"
                  :elevation="isSelected?3:0"
                  class="d-flex align-center justify-center ma-auto border"
                  dark
                  @click="toggle"
                >
                  {{ pos }}
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </template>
  </v-list-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SSettingImagePosition",
  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    label: {},
    icon: {},

    disabled: Boolean,
    mandatory: Boolean,
  },
  computed: {},
  data() {
    return {
      BackgroundPositions: [
        "top left",
        "top center",
        "top right",
        "left center",
        "center",
        "right center",
        "bottom left",
        "bottom center",
        "bottom right",
      ],
    };
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.s--setting-image-position {
  .-label {
    font-size: 0.8rem;
  }
}
</style>
