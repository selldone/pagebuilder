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
      class="styler-button"
      @click="setDevice('mobile')"
      :class="{ selected: modelValue === 'mobile' }"
    >
      <v-badge :model-value="mobileValue>0" location="bottom end" color="#fff"  :content="mobileValue">
        <SStylerIcon name="mobile" />
      </v-badge>

      <v-tooltip
        activator="parent"
        location="bottom"
        content-class="bg-black white--text"
        attach
      >
        Mobile
        <v-chip v-if="mobileValue" label color="green" size="small" variant="tonal"
          >{{ mobileValue }}
        </v-chip>
      </v-tooltip>
    </button>
  </li>
  <li>
    <button
      class="styler-button"
      @click="setDevice('tablet')"
      :class="{ selected: modelValue === 'tablet' }"
    >

      <v-badge :model-value="tabletValue>0" location="bottom end" color="#fff" :content="tabletValue">
        <SStylerIcon name="tablet" />
      </v-badge>

      <v-tooltip
        activator="parent"
        location="bottom"
        content-class="bg-black white--text"
        attach
      >
        Tablet
        <v-chip v-if="tabletValue" label color="green" size="small" variant="tonal"
          >{{ tabletValue }}
        </v-chip>
      </v-tooltip>
    </button>
  </li>
  <li>
    <button
      class="styler-button"
      @click="setDevice('desktop')"
      :class="{ selected: modelValue === 'desktop' }"
      title="Size on pc devices."
    >

      <v-badge :model-value="desktopValue>0" location="bottom end" color="#fff" :content="desktopValue">
        <SStylerIcon name="laptop" />
      </v-badge>



      <v-tooltip
        activator="parent"
        location="bottom"
        content-class="bg-black white--text"
        attach
      >
        Desktop
        <v-chip v-if="desktopValue" label color="green" size="small" variant="tonal"
          >{{ desktopValue }}
        </v-chip>
      </v-tooltip>
    </button>
  </li>
  <li>
    <button
      class="styler-button"
      @click="setDevice('widescreen')"
      :class="{ selected: modelValue === 'widescreen' }"
      title="Size on large display."
    >
      <v-badge :model-value="widescreenValue>0" location="bottom end" color="#fff" :content="widescreenValue">
        <v-icon dark size="20">tv</v-icon>
      </v-badge>

      <v-tooltip
        activator="parent"
        location="bottom"
        content-class="bg-black white--text"
        attach
      >
        Widescreen
        <v-chip v-if="widescreenValue" label color="green" size="small" variant="tonal"
          >{{ widescreenValue }}
        </v-chip>
      </v-tooltip>
    </button>
  </li>
</template>
<script>
import { defineComponent } from "vue";
import { LandingHistoryMixin } from "@app-page-builder/mixins/LandingToolsMixin";
import SStylerIcon from "@app-page-builder/styler/icon/SStylerIcon.vue";

export default defineComponent({
  name: "SStylerToolsDevices",
  components: { SStylerIcon },
  mixins: [LandingHistoryMixin],
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

<style scoped lang="scss"></style>
