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
    <v-text-field
      v-model="modelValue.label"
      label="Label"
      placeholder="Input label..."
      @change="$emit('change', modelValue)"
    >
    </v-text-field>

    <v-text-field
      v-model="modelValue.placeholder"
      label="Placeholder"
      placeholder="Sample of input..."
      @change="$emit('change', modelValue)"
      :append-inner-icon="modelValue.persistentPlaceholder ? 'lock' : 'lock_open'"
      @click:append-inner="
        modelValue.persistentPlaceholder = !modelValue.persistentPlaceholder;
        $emit('change', modelValue);
        $forceUpdate();
      "
    ></v-text-field>

    <v-text-field
      v-model="modelValue.messages"
      label="Message"
      placeholder="A short message..."
      messages="It will be shown under input."
      @change="$emit('change', modelValue)"
    >
    </v-text-field>
    <v-text-field
      v-model="modelValue.hint"
      label="Hint"
      placeholder="A short help..."
      messages="It will appear when the user clicks on the input and focusing on it."
      @change="$emit('change', modelValue)"
    >
    </v-text-field>

    <v-list-subheader></v-list-subheader>

    <v-btn
      @click="
        () => {
          modelValue.flat = !modelValue.flat;
          $emit('change', modelValue);
        }
      "
      class="ma-1"
      tile
      min-width="36"
      :color="modelValue.flat ? 'primary' : undefined"
      variant="flat"
    >
      Flat
    </v-btn>

    <v-btn
      @click="
        () => {
          modelValue.rounded = !modelValue.rounded;
          $emit('change', modelValue);
        }
      "
      class="ma-1"
      tile
      min-width="36"
      :color="modelValue.rounded ? 'primary' : undefined"
      variant="flat"
    >
      <v-icon>{{ modelValue.rounded ? "rounded_corner" : "crop_din" }}</v-icon>
    </v-btn>

    <v-btn
      @click="
        () => {
          modelValue.solo = !modelValue.solo;
          $emit('change', modelValue);
        }
      "
      class="ma-1"
      tile
      min-width="36"
      :color="modelValue.solo ? 'primary' : undefined"
      variant="flat"
    >
      Solo
    </v-btn>

    <v-btn
      @click="
        () => {
          modelValue.outlined = !modelValue.outlined;
          $emit('change', modelValue);
        }
      "
      class="ma-1"
      tile
      min-width="36"
      :color="modelValue.outlined ? 'primary' : undefined"
      variant="flat"
    >
      Outlined
    </v-btn>

    <v-btn
      @click="
        () => {
          modelValue.dark = !modelValue.dark;
          $emit('change', modelValue);
        }
      "
      class="ma-1"
      tile
      min-width="36"
      :color="modelValue.dark ? 'primary' : undefined"
      variant="flat"
    >
      Dark
    </v-btn>

    <v-btn
      @click="
        () => {
          modelValue.filled = !modelValue.filled;
          $emit('change', modelValue);
        }
      "
      class="ma-1"
      tile
      min-width="36"
      :color="modelValue.filled ? 'primary' : undefined"
      variant="flat"
    >
      Filled
    </v-btn>

    <s-color-selector
      v-model="modelValue.color"
      title="Color"
      class="my-3"
      nullable
      @change="$emit('change', modelValue)"
    ></s-color-selector>

    <s-color-selector
      v-model="modelValue.backgroundColor"
      title="Background color"
      class="my-3"
      nullable
      @change="$emit('change', modelValue)"
    ></s-color-selector>
  </div>
</template>

<script>
import SColorSelector from "@components/ui/color/selector/SColorSelector.vue";

export default {
  name: "FeederInput",
  components: { SColorSelector },
  emits: ["change"],

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
