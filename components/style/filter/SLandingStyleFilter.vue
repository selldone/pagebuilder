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
      max-height="30vh"
      max-width="800"
      min-height="15vh"
    >
      <div>
        <v-img
          v-if="previewImage"
          :src="previewImage"
          class="pr-item shadow-hover"
          @click="selected_prev = previewImage"
        ></v-img>
        <v-img
          v-for="im in plates"
          :key="im"
          :src="im"
          class="pr-item shadow-hover"
          @click="selected_prev = im"
        ></v-img>
      </div>
    </v-img>
    <!-- ████████████████████ Collection ████████████████████ -->

    <s-widget-header
      icon="filter_vintage"
      title="Filters collection"
    ></s-widget-header>
    <v-list-subheader
      >Select a filter from the collection. Using complex filters may slow down
      your page experience.
    </v-list-subheader>

    <v-item-group v-model="filter_value">
      <v-container>
        <v-row justify="center">
          <v-item
            v-for="(it, index) in presets"
            :key="index"
            v-slot="{ active, toggle }"
            :value="it.value"
          >
            <v-card
              :color="active ? 'blue' : ''"
              :elevation="active ? 10 : 0"
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
              >
              </v-img>
              <div class="bottom-absolute-bar-dark">
                <v-icon
                  v-if="it.value.url"
                  color="#fff"
                  size="8"
                  title="Slowdown!"
                  >warning
                </v-icon>
                {{ it.name }}
              </div>
            </v-card>
          </v-item>
        </v-row>
      </v-container>
    </v-item-group>

    <!-- ████████████████████ Customize ████████████████████ -->

    <s-widget-header icon="tune" title="Tune"></s-widget-header>
    <v-list-subheader
      >You can customize and make your filter here.
    </v-list-subheader>

    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title
          ><span
            ><v-icon class="me-1" size="small">fa:fas fa-cogs</v-icon> Filter
            values</span
          >
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-slider
            v-for="key in editable_values"
            :key="key"
            v-model="filter_value[key]"
            :label="key"
            :max="getMax(key)"
            :min="getMin(key)"
            :step="getStep(key)"
            thumb-color="#1976D2"
            thumb-label
          >
          </v-slider>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { CssFilter, CssFiltersGallery } from "@core/helper/style/CssFilters";

export default {
  name: "SLandingStyleFilter",
  components: {},
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
      return CssFilter.CalcFilter(filter);
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
}
</style>
