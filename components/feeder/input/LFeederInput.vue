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
      :append-inner-icon="
        modelValue.persistentPlaceholder ? 'lock' : 'lock_open'
      "
      label="Placeholder"
      placeholder="Sample of input..."
      @change="$emit('change', modelValue)"
      @click:append-inner="
        modelValue.persistentPlaceholder = !modelValue.persistentPlaceholder;
        $emit('change', modelValue);
        $forceUpdate();
      "
    ></v-text-field>

    <v-text-field
      v-model="modelValue.messages"
      label="Message"
      messages="It will be shown under input."
      placeholder="A short message..."
      @change="$emit('change', modelValue)"
    >
    </v-text-field>
    <v-text-field
      v-model="modelValue.hint"
      label="Hint"
      messages="It will appear when the user clicks on the input and focusing on it."
      placeholder="A short help..."
      @change="$emit('change', modelValue)"
    >
    </v-text-field>

    <v-list-subheader></v-list-subheader>

    <v-btn
      :color="modelValue.flat ? 'primary' : undefined"
      class="ma-1"
      min-width="36"
      variant="flat"
      @click="
        () => {
          modelValue.flat = !modelValue.flat;
          $emit('change', modelValue);
        }
      "
    >
      Flat
    </v-btn>

    <v-btn
      :color="modelValue.rounded ? 'primary' : undefined"
      class="ma-1"
      min-width="36"
      variant="flat"
      @click="
        () => {
          modelValue.rounded = !modelValue.rounded;
          $emit('change', modelValue);
        }
      "
    >
      <v-icon>{{ modelValue.rounded ? "rounded_corner" : "crop_din" }}</v-icon>
    </v-btn>

    <v-btn
      :color="modelValue.solo ? 'primary' : undefined"
      class="ma-1"
      min-width="36"
      variant="flat"
      @click="
        () => {
          modelValue.solo = !modelValue.solo;
          $emit('change', modelValue);
        }
      "
    >
      Solo
    </v-btn>

    <v-btn
      :color="modelValue.outlined ? 'primary' : undefined"
      class="ma-1"
      min-width="36"
      variant="flat"
      @click="
        () => {
          modelValue.outlined = !modelValue.outlined;
          $emit('change', modelValue);
        }
      "
    >
      Outlined
    </v-btn>

    <v-btn
      :color="modelValue.dark ? 'primary' : undefined"
      class="ma-1"
      min-width="36"
      variant="flat"
      @click="
        () => {
          modelValue.dark = !modelValue.dark;
          $emit('change', modelValue);
        }
      "
    >
      Dark
    </v-btn>

    <v-btn
      :color="modelValue.filled ? 'primary' : undefined"
      class="ma-1"
      min-width="36"
      variant="flat"
      @click="
        () => {
          modelValue.filled = !modelValue.filled;
          $emit('change', modelValue);
        }
      "
    >
      Filled
    </v-btn>

    <s-color-selector
      v-model="modelValue.color"
      class="my-3"
      nullable
      title="Color"
      @change="$emit('change', modelValue)"
    ></s-color-selector>

    <s-color-selector
      v-model="modelValue.backgroundColor"
      class="my-3"
      nullable
      title="Background color"
      @change="$emit('change', modelValue)"
    ></s-color-selector>
  </div>
</template>

<script>
import SColorSelector from "@components/ui/color/selector/SColorSelector.vue";

export default {
  name: "LFeederInput",
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
