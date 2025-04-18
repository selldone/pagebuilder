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
  <s-setting-expandable :value="value" icon="transform" title="Transform">
    <template v-slot:title>
      <s-setting-chip
        :value="transform_object?.rotate"
        label="R"
      ></s-setting-chip>

      <s-setting-chip
        :value="transform_object?.rotateX"
        label="Rx"
      ></s-setting-chip>

      <s-setting-chip
        :value="transform_object?.rotateY"
        label="Ry"
      ></s-setting-chip>

      <s-setting-chip
        :value="transform_object?.rotateZ"
        label="Rz"
      ></s-setting-chip>

      <s-setting-chip
        :value="transform_object?.translateX"
        label="Tx"
      ></s-setting-chip>

      <s-setting-chip
        :value="transform_object?.translateY"
        label="Ty"
      ></s-setting-chip>

      <s-setting-chip
        :value="transform_object?.translateZ"
        label="Tz"
      ></s-setting-chip>

      <s-setting-chip
        :value="transform_object?.scaleX"
        label="Sx"
      ></s-setting-chip>

      <s-setting-chip
        :value="transform_object?.scaleY"
        label="Sy"
      ></s-setting-chip>

      <s-setting-chip
        :value="transform_object?.skewX"
        label="Kx"
      ></s-setting-chip>

      <s-setting-chip
        :value="transform_object?.skewY"
        label="Ky"
      ></s-setting-chip>
    </template>

    <v-row no-gutters class="pb-4">
      <v-card
        v-for="it in collection"
        class="me-2 pa-3"
        variant="outlined"
        color="#666"
        @click="transform_object = it"
      >
        <v-sheet
          rounded="lg"
          color="#fff"
          width="20"
          height="20"
          :style="{ transform: StyleTransformHelper.Generate(it) }"
          class="d-flex align-center justify-center"
        >
          <v-icon size="14">liquor</v-icon>
        </v-sheet>
      </v-card>
    </v-row>

    <s-setting-group
      icon="rotate_90_degrees_ccw"
      title="Rotation"
      subtitle="The rotation defines a transformation that rotates an element around a fixed point on the 2D plane, without deforming it."
    >
    </s-setting-group>

    <s-setting-slider
      v-model="transform_object.rotate"
      :max="360"
      :min="-360"
      label="Rotate"
      suffix="deg"
    ></s-setting-slider>

    <s-setting-slider
      v-model="transform_object.rotateX"
      :max="360"
      :min="-360"
      label="Rotate X"
      suffix="deg"
    ></s-setting-slider>

    <s-setting-slider
      v-model="transform_object.rotateY"
      :max="360"
      :min="-360"
      label="Rotate Y"
      suffix="deg"
    ></s-setting-slider>

    <s-setting-slider
      v-model="transform_object.rotateZ"
      :max="360"
      :min="-360"
      label="Rotate Z"
      suffix="deg"
    ></s-setting-slider>

    <s-setting-group
      icon="flip_to_back"
      title="Translate"
      subtitle="The translate allows you to transfer an element from one place to another along the X (horizontal) axis, the Y (vertical) axis, and the Z (depth) axis."
    >
    </s-setting-group>

    <s-setting-slider
      v-model="transform_object.translateX"
      clearable
      label="Translate X"
    ></s-setting-slider>

    <s-setting-slider
      v-model="transform_object.translateY"
      clearable
      label="Translate y"
    ></s-setting-slider>

    <s-setting-slider
      v-model="transform_object.translateZ"
      clearable
      label="Translate z"
    ></s-setting-slider>

    <s-setting-group
      icon="transform"
      title="Scale"
      subtitle="The scale defines a transformation that resizes an element on the 2D plane."
    >
    </s-setting-group>

    <s-setting-slider
      v-model="transform_object.scaleX"
      :decimal="1"
      :max="10"
      :min="0"
      :step="0.1"
      clearable
      label="Scale X"
    ></s-setting-slider>

    <s-setting-slider
      v-model="transform_object.scaleY"
      :decimal="1"
      :max="10"
      :min="0"
      :step="0.1"
      clearable
      label="Scale Y"
    ></s-setting-slider>

    <s-setting-slider
      v-model="transform_object.scaleZ"
      :decimal="1"
      :max="10"
      :min="0"
      :step="0.1"
      clearable
      label="Scale Z"
    ></s-setting-slider>

    <s-setting-slider
      v-model="transform_object.perspective"
      clearable
      label="Perspective"
    ></s-setting-slider>

    <s-setting-group
      icon="360"
      title="Skew"
      subtitle="This transformation is a shear mapping that distorts each point within an element by a certain angle in the horizontal and vertical directions."
    >
    </s-setting-group>
    <s-setting-slider
      v-model="transform_object.skewX"
      :max="360"
      :min="-360"
      label="Skew Y"
      suffix="deg"
    ></s-setting-slider>
    <s-setting-slider
      v-model="transform_object.skewY"
      :max="360"
      :min="-360"
      label="Skew Y"
      suffix="deg"
    ></s-setting-slider>
  </s-setting-expandable>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import SSettingSlider from "@selldone/page-builder/styler/settings/slider/SSettingSlider.vue";
import { StyleTransformHelper } from "@selldone/page-builder/settings/style/transform/StyleTransformHelper.ts";
import SSettingChip from "@selldone/page-builder/styler/settings/chip/SSettingChip.vue";

export default defineComponent({
  name: "LSettingsStyleTransform",
  components: {
    SSettingChip,
    SSettingSlider,
    SSettingExpandable,
    SSettingGroup,
  },
  emits: [],
  props: {
    value: {},

    inputStyle: {},

    transform: {
      type: String,
    },
  },
  data() {
    return {
      StyleTransformHelper: StyleTransformHelper,
      transform_object: null,
    };
  },
  computed: {
    transform_gen() {
      return StyleTransformHelper.Generate(this.transform_object);
    },
    collection() {
      return [
        { rotate: -26, rotateX: 52, rotateY: 29, rotateZ: -23 },
        { rotate: -10, rotateX: 45, rotateY: 20, rotateZ: -15 }, // View 2
        { rotate: -20, rotateX: 50, rotateY: 25, rotateZ: -18 }, // View 3
        { rotate: -15, rotateX: 40, rotateY: 30, rotateZ: -10 }, // View 4
        { rotate: -30, rotateX: 55, rotateY: 35, rotateZ: -20 }, // View 5
        { rotate: 33, rotateX: -47, rotateY: -3, rotateZ: -26 }, // View 5

        { rotate: 45, skewX: 30, skewY: 0 }, // Right view
        { rotate: 35, skewX: 0, skewY: 30 }, // Top view
        { rotate: 0, skewX: 30, skewY: 30 }, // Front view
        { rotate: -45, skewX: 30, skewY: 0 }, // Left view
        { rotate: 50, skewX: 25, skewY: 25 }, // Isometric view
      ];
    },
  },

  watch: {
    inputStyle() {
      this.init();
    },
    transform_gen(val) {
      this.$emit("update:transform", val);
    },
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      // Get raw transform from original object because of reset transform in draggable page edit:

      this.transform_object = StyleTransformHelper.Extract(this.transform);
    },
  },
});
</script>

<style scoped lang="scss"></style>
