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
  <div v-if="value">
    <v-text-field
      v-model="value.label"
      label="Label"
      placeholder="Input label..."
      @change="$emit('change', value)"
    >
    </v-text-field>

    <v-text-field
      v-model="value.placeholder"
      label="Placeholder"
      placeholder="Sample of input..."
      @change="$emit('change', value)"
      :append-inner-icon="value.persistentPlaceholder ? 'lock' : 'lock_open'"
      @click:append-inner="
        value.persistentPlaceholder = !value.persistentPlaceholder;
        $emit('change', value);
        $forceUpdate();
      "
    ></v-text-field>

    <v-text-field
      v-model="value.messages"
      label="Message"
      placeholder="A short message..."
      messages="It will be shown under input."
      @change="$emit('change', value)"
    >
    </v-text-field>
    <v-text-field
      v-model="value.hint"
      label="Hint"
      placeholder="A short help..."
      messages="It will appear when the user clicks on the input and focusing on it."
      @change="$emit('change', value)"
    >
    </v-text-field>

    <v-list-subheader></v-list-subheader>

    <v-btn
      @click="
        () => {
          value.flat = !value.flat;
          $emit('change', value);
        }
      "
      class="ma-1"
      tile
      min-width="36"
      :color="value.flat ? 'primary' : undefined"
      depressed
    >
      Flat
    </v-btn>

    <v-btn
      @click="
        () => {
          value.rounded = !value.rounded;
          $emit('change', value);
        }
      "
      class="ma-1"
      tile
      min-width="36"
      :color="value.rounded ? 'primary' : undefined"
      depressed
    >
      <v-icon>{{ value.rounded ? "rounded_corner" : "crop_din" }}</v-icon>
    </v-btn>

    <v-btn
      @click="
        () => {
          value.solo = !value.solo;
          $emit('change', value);
        }
      "
      class="ma-1"
      tile
      min-width="36"
      :color="value.solo ? 'primary' : undefined"
      depressed
    >
      Solo
    </v-btn>

    <v-btn
      @click="
        () => {
          value.outlined = !value.outlined;
          $emit('change', value);
        }
      "
      class="ma-1"
      tile
      min-width="36"
      :color="value.outlined ? 'primary' : undefined"
      depressed
    >
      Outlined
    </v-btn>

    <v-btn
      @click="
        () => {
          value.dark = !value.dark;
          $emit('change', value);
        }
      "
      class="ma-1"
      tile
      min-width="36"
      :color="value.dark ? 'primary' : undefined"
      depressed
    >
      Dark
    </v-btn>

    <v-btn
      @click="
        () => {
          value.filled = !value.filled;
          $emit('change', value);
        }
      "
      class="ma-1"
      tile
      min-width="36"
      :color="value.filled ? 'primary' : undefined"
      depressed
    >
      Filled
    </v-btn>

    <s-color-selector
      v-model="value.color"
      title="Color"
      class="my-3"
      nullable
      @change="$emit('change', value)"
    ></s-color-selector>

    <s-color-selector
      v-model="value.backgroundColor"
      title="Background color"
      class="my-3"
      nullable
      @change="$emit('change', value)"
    ></s-color-selector>
  </div>
</template>

<script>
import SColorSelector from "@components/ui/color/selector/SColorSelector.vue";

export default {
  name: "FeederInput",
  components: { SColorSelector },
  props: {
    value: {},
  },
  data: () => {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
