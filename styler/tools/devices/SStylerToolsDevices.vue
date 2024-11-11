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
        rounded
      >
        <SStylerIcon name="mobile" />
      </v-badge>

      <v-tooltip
        activator="parent"
        content-class="bg-black text-white"
        location="bottom"
      >
        Mobile
        <v-chip
          v-if="mobileValue"
          color="green"
          class="mx-1"
          size="x-small"
          variant="flat"
          >{{ mobileValue }}
        </v-chip>

        <s-layout-responsive-view
          v-if="mobileValue"
          :cols="mobileValue"
          class="mt-1"
        ></s-layout-responsive-view>
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
        rounded
      >
        <SStylerIcon name="tablet" />
      </v-badge>

      <v-tooltip
        activator="parent"
        content-class="bg-black text-white"
        location="bottom"
      >
        Tablet
        <v-chip
          v-if="tabletValue"
          color="green"
          class="mx-1"
          size="x-small"
          variant="flat"
          >{{ tabletValue }}
        </v-chip>

        <s-layout-responsive-view
          v-if="tabletValue"
          :cols="tabletValue"
          class="mt-1"
        ></s-layout-responsive-view>
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
        rounded
      >
        <SStylerIcon name="laptop" />
      </v-badge>

      <v-tooltip
        activator="parent"
        content-class="bg-black text-white"
        location="bottom"
      >
        Desktop
        <v-chip
          v-if="desktopValue"
          color="green"
          class="mx-1"
          size="x-small"
          variant="flat"
          >{{ desktopValue }}
        </v-chip>

        <s-layout-responsive-view
          v-if="desktopValue"
          :cols="desktopValue"
          class="mt-1"
        ></s-layout-responsive-view>
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
        rounded
      >
        <v-icon size="20">tv</v-icon>
      </v-badge>

      <v-tooltip
        activator="parent"
        content-class="bg-black text-white"
        location="bottom"
      >
        Widescreen
        <v-chip
          v-if="widescreenValue"
          color="green"
          class="mx-1"
          size="x-small"
          variant="flat"
          >{{ widescreenValue }}
        </v-chip>

        <s-layout-responsive-view
          v-if="widescreenValue"
          :cols="widescreenValue"
          class="mt-1"
        ></s-layout-responsive-view>
      </v-tooltip>
    </button>
  </li>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { LMixinEvents } from "../../../mixins/events/LMixinEvents";
import SStylerIcon from "../../../styler/icon/SStylerIcon.vue";
import SLayoutResponsiveView from "@selldone/page-builder/styler/tools/devices/SLayoutResponsiveView.vue";

export default defineComponent({
  name: "SStylerToolsDevices",
  components: { SLayoutResponsiveView, SStylerIcon },
  mixins: [LMixinEvents],
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
