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
  <li>
    <button
      :class="{ selected: modelValue === 'mobile' }"
      class="styler-button"
      @click="setDevice('mobile')"
    >
      <v-badge
        :content="mobileValue"
        :model-value="mobileValue > 0"
        color="#fff"
        location="bottom end"
      >
        <SStylerIcon name="mobile" />
      </v-badge>

      <v-tooltip
        activator="parent"
        attach
        content-class="bg-black white--text"
        location="bottom"
      >
        Mobile
        <v-chip
          v-if="mobileValue"
          color="green"
          label
          size="small"
          variant="tonal"
          >{{ mobileValue }}
        </v-chip>
      </v-tooltip>
    </button>
  </li>
  <li>
    <button
      :class="{ selected: modelValue === 'tablet' }"
      class="styler-button"
      @click="setDevice('tablet')"
    >
      <v-badge
        :content="tabletValue"
        :model-value="tabletValue > 0"
        color="#fff"
        location="bottom end"
      >
        <SStylerIcon name="tablet" />
      </v-badge>

      <v-tooltip
        activator="parent"
        attach
        content-class="bg-black white--text"
        location="bottom"
      >
        Tablet
        <v-chip
          v-if="tabletValue"
          color="green"
          label
          size="small"
          variant="tonal"
          >{{ tabletValue }}
        </v-chip>
      </v-tooltip>
    </button>
  </li>
  <li>
    <button
      :class="{ selected: modelValue === 'desktop' }"
      class="styler-button"
      @click="setDevice('desktop')"
    >
      <v-badge
        :content="desktopValue"
        :model-value="desktopValue > 0"
        color="#fff"
        location="bottom end"
      >
        <SStylerIcon name="laptop" />
      </v-badge>

      <v-tooltip
        activator="parent"
        attach
        content-class="bg-black white--text"
        location="bottom"
      >
        Desktop
        <v-chip
          v-if="desktopValue"
          color="green"
          label
          size="small"
          variant="tonal"
          >{{ desktopValue }}
        </v-chip>
      </v-tooltip>
    </button>
  </li>
  <li>
    <button
      :class="{ selected: modelValue === 'widescreen' }"
      class="styler-button"
      @click="setDevice('widescreen')"
    >
      <v-badge
        :content="widescreenValue"
        :model-value="widescreenValue > 0"
        color="#fff"
        location="bottom end"
      >
        <v-icon dark size="20">tv</v-icon>
      </v-badge>

      <v-tooltip
        activator="parent"
        attach
        content-class="bg-black white--text"
        location="bottom"
      >
        Widescreen
        <v-chip
          v-if="widescreenValue"
          color="green"
          label
          size="small"
          variant="tonal"
          >{{ widescreenValue }}
        </v-chip>
      </v-tooltip>
    </button>
  </li>
</template>
<script>
import { defineComponent } from "vue";
import { LMixinsEvents } from "@app-page-builder/mixins/events/LMixinsEvents";
import SStylerIcon from "@app-page-builder/styler/icon/SStylerIcon.vue";

export default defineComponent({
  name: "SStylerToolsDevices",
  components: { SStylerIcon },
  mixins: [LMixinsEvents],
  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    mobileValue: {},
    tabletValue: {},
    desktopValue: {},
    widescreenValue: {},
  },

  computed: {},

  methods: {
    setDevice(device) {
      this.$emit("update:modelValue", device);
    },
  },
});
</script>

<style lang="scss" scoped></style>
