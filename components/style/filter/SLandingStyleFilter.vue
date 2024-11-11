<!--
  - Copyright (c) 2023-2024. Selldone® Business OS™
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
  <div>
    <!-- ████████████████████ Preview ████████████████████ -->

    <v-img
      v-if="showPreview"
      :src="selected_prev"
      :style="{ filter: filter }"
      class="mb-3"
      max-height="360px"
      max-width="800"
      height="15vh"
      cover
      rounded="lg"
    >
      <div>
        <v-img
          v-if="previewImage"
          :src="previewImage"
          class="pr-item shadow-hover"
          @click="selected_prev = previewImage"
          cover
        ></v-img>
        <v-img
          v-for="im in plates"
          :key="im"
          :src="im"
          cover
          class="pr-item shadow-hover"
          @click="selected_prev = im"
        ></v-img>
      </div>
    </v-img>
    <!-- ████████████████████ Collection ████████████████████ -->

    <s-setting-group
      title="Filters collection"
      icon="filter_vintage"
      subtitle="Select a filter from the collection. Using complex filters may slow down your page experience."
    ></s-setting-group>

    <v-item-group v-model="filter_value">
      <v-container>
        <v-row justify="center">
          <v-item
            v-for="(it, index) in presets"
            :key="index"
            v-slot="{ isSelected, toggle }"
            :value="it.value"
          >
            <v-card
              :color="isSelected ? 'blue' : ''"
              :elevation="isSelected ? 10 : 0"
              class="p-1 rounded-18px overflow-hidden m-1 position-relative"
              flat
              @click="toggle"
            >
              <v-img
                :src="selected_prev"
                :style="{ filter: calcFilter(it.value) }"
                class="rounded-18px"
                height="64"
                width="64"
                cover
              >
              </v-img>
              <v-sheet
                class="bottom-absolute-bar-dark"
                :color="isSelected ? 'blue' : ''"
              >
                <v-icon
                  v-if="it.value.url"
                  color="#fff"
                  size="8"
                  title="Slowdown!"
                  cover
                  >warning
                </v-icon>
                {{ it.name }}
              </v-sheet>
            </v-card>
          </v-item>
        </v-row>
      </v-container>
    </v-item-group>

    <!-- ████████████████████ Customize ████████████████████ -->

    <v-expand-transition>
      <s-setting-group
        v-if="editable_values?.length"
        title="Tune"
        icon="tune"
        subtitle="You can customize and make your filter here."
      >
        <s-setting-slider
          v-for="key in editable_values"
          :key="key"
          v-model="filter_value[key]"
          :label="key"
          :max="getMax(key)"
          :min="getMin(key)"
          :step="getStep(key)"
          thumb-color="#1976D2"
          thumb-label
          icon="fa:fas fa-cogs"
        >
        </s-setting-slider>
      </s-setting-group>
    </v-expand-transition>
  </div>
</template>

<script lang="ts">
import {
  CssFiltersGallery,
  LUtilsFilter,
} from "../../../utils/filter/LUtilsFilter";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import SSettingSlider from "@selldone/page-builder/styler/settings/slider/SSettingSlider.vue";

export default {
  name: "SLandingStyleFilter",
  components: { SSettingSlider, SSettingGroup },
  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    previewImage: {
      default: null,
    },
    showPreview: {
      default: false,
      type: Boolean,
    },
  },
  data: () => ({
    presets: CssFiltersGallery,
    filter_value: null,
    plates: [
      require("../../../assets/images/samples/plate-1.jpg"),
      require("../../../assets/images/samples/plate-2.jpg"),
      require("../../../assets/images/samples/plate-3.jpg"),
    ],
    selected_prev: null,
  }),

  watch: {
    filter(val) {
      this.$emit("update:modelValue", val);
    },
  },

  computed: {
    filter() {
      return this.calcFilter(this.filter_value);
    },

    editable_values() {
      if (!this.filter_value) return null;
      return Object.keys(this.filter_value).filter((it) =>
        [
          "brightness",
          "invert",
          "saturate",
          "sepia",
          "blur",
          "contrast",
          "grayscale",
        ].includes(it),
      );
    },
  },

  created() {
    this.selected_prev = this.previewImage ? this.previewImage : this.plates[0];
  },

  mounted() {},

  methods: {
    getMin(prop) {
      return 0;
    },
    getMax(prop) {
      if (prop === "brightness" || prop === "saturate") return 4;
      if (prop === "hue-rotate") return 360;
      if (prop === "blur") return 30;

      return 1;
    },
    getStep(prop) {
      if (prop === "hue-rotate") return 1;
      if (prop === "blur") return 1;

      return 0.01;
    },

    calcFilter(filter) {
      return LUtilsFilter.CalcFilter(filter);
    },
  },
};
</script>

<style lang="scss" scoped>
.pr-item {
  margin: 4px;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  cursor: pointer;
  border: solid #fff 2px;
}
</style>
