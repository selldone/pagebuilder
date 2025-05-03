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
  <!-- ━━━━━━━━━━━━━━━━━━━━ Properties ━━━━━━━━━━━━━━━━━━━━ -->
  <s-setting-group
    v-bind="$attrs"
    subtitle="You can set dynamic values in the component by defining properties in the props of the custom Vue component."
    :title="title ? title : 'Properties'"
    icon="data_object"
    :class="{ 'ps-2 border-start': nested }"
  >
    <template v-for="item in structure_primitive" :key="item.key">
      <s-setting-text-input
        v-if="item.type === 'string'"
        v-model="modelValue[item.key]"
        :label="item.title"
        clearable
      ></s-setting-text-input>
      <s-setting-image
        v-else-if="item.type === 'image'"
        :model-value="modelValue[item.key]"
        @new-url="
          (url) => {
            // Save URL!
            modelValue[item.key] = url;
          }
        "
        :label="item.title"
        clearable
        icon="image"
        :uploadUrl="upload_image_url"
      >
        <template v-slot:input-append-inner>
          <v-avatar
            v-if="modelValue[item.key]"
            :image="getShopImagePath(modelValue[item.key])"
            size="20"
            rounded
          ></v-avatar>
        </template>
      </s-setting-image>
      <s-setting-number-input
        v-else-if="item.type === 'number'"
        v-model="modelValue[item.key]"
        :label="item.title"
        clearable
        :decimal="10"
        no-limit
      ></s-setting-number-input>
      <s-setting-switch
        v-else-if="item.type === 'boolean'"
        v-model="modelValue[item.key]"
        :label="item.title"
        clearable
      ></s-setting-switch>
      <s-setting-color
        v-else-if="item.type === 'color'"
        v-model="modelValue[item.key]"
        :label="item.title"
        clearable
      ></s-setting-color>

      <div v-else class="small pa-2">
        <v-icon class="me-1" size="small">warning_amber</v-icon>
        Invalid type: {{ item }}
      </div>
    </template>
  </s-setting-group>
  <!-- ━━━━━━━━━━━━━━━━━━━━ Array > strings (combobox) ━━━━━━━━━━━━━━━━━━━━ -->
  <s-setting-combobox
    v-for="_item in combobox_array"
    :key="_item.key"
    v-model="modelValue[_item.key]"
    :title="_item.title"
    :class="{ 'ps-2 border-start': nested }"
    icon="data_array"
  ></s-setting-combobox>

  <!-- ━━━━━━━━━━━━━━━━━━━━ Array ━━━━━━━━━━━━━━━━━━━━ -->
  <u-setting-array
    v-for="_item in structure_array"
    :key="_item.key"
    :title="_item.title"
    :properties-structure="_item.structure /*Item structure!*/"
    v-model="modelValue[_item.key]"
    :class="{ 'ps-2 border-start': nested }"
  >
    <!-- Prevent circular call for objects -->
    <template v-slot:item="{ index, structure }">
      <!-- structured items -->
      <u-setting-dynamic
        v-if="
          structure ||
          isObject(modelValue[_item.key][index]) ||
          Array.isArray(modelValue[_item.key][index])
        "
        v-model="modelValue[_item.key][index]"
        :properties-structure="structure"
        nested
        :title="
          `${_item.title} [${index}] ` +
          (guessTitle(modelValue[_item.key][index])
            ? ' ● ' + guessTitle(modelValue[_item.key][index])
            : '')
        "
      ></u-setting-dynamic>
      <!-- no structured items -->
      <template v-else>
        <s-setting-number-input
          v-if="getType(modelValue[_item.key][index]) === 'number'"
          v-model="modelValue[_item.key][index]"
          :label="`${_item.title} [${index}] `"
          :max="9999"
        ></s-setting-number-input>
        <s-setting-switch
          v-else-if="getType(modelValue[_item.key][index]) === 'boolean'"
          v-model="modelValue[_item.key][index]"
          :label="`${_item.title} [${index}] `"
        ></s-setting-switch>
        <s-setting-color
          v-else-if="getType(modelValue[_item.key][index]) === 'color'"
          v-model="modelValue[_item.key][index]"
          :label="`${_item.title} [${index}] `"
        ></s-setting-color>

        <!-- default is string item -->
        <s-setting-text-input
          v-else
          v-model="modelValue[_item.key][index]"
          :label="`${_item.title} [${index}] `"
        ></s-setting-text-input>
      </template>
    </template>
  </u-setting-array>
  <!-- ━━━━━━━━━━━━━━━━━━━━ Object ━━━━━━━━━━━━━━━━━━━━ -->
  <u-setting-dynamic
    v-for="item in structure_object"
    :key="item.key"
    :title="item.title"
    :properties-structure="item.structure /*Item structure!*/"
    v-model="modelValue[item.key]"
    nested
  >
  </u-setting-dynamic>

  <s-setting-group
    v-if="Object.keys(missingProperties).length"
    title="Missing Properties"
    subtitle="These properties are not defined in the properties structure."
  >
    <v-list>
      <v-fade-transition group>
        <v-list-item
          v-for="(item, key) in missingProperties"
          :title="key"
          :subtitle="item"
          :key="key"
        >
          <template v-slot:append>
            <v-btn
              icon
              variant="text"
              color="red"
              @click="delete modelValue[key]"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </v-fade-transition>
    </v-list>
  </s-setting-group>
</template>

<script lang="ts">
import { LMixinEvents } from "../../../mixins/events/LMixinEvents";
import SSettingTextInput from "@selldone/page-builder/styler/settings/text-input/SSettingTextInput.vue";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import SSettingNumberInput from "@selldone/page-builder/styler/settings/number-input/SSettingNumberInput.vue";
import SSettingSwitch from "@selldone/page-builder/styler/settings/switch/SSettingSwitch.vue";
import SSettingColor from "@selldone/page-builder/styler/settings/color/SSettingColor.vue";
import USettingArray from "@selldone/page-builder/styler/settings/array/USettingArray.vue";
import SSettingCombobox from "@selldone/page-builder/styler/settings/combobox/SSettingCombobox.vue";
import { isObject } from "lodash-es";
import { DynamicVariableStructure } from "@selldone/page-builder/styler/settings/dynamic/DynamicVariableStructure.ts";
import SSettingImage from "@selldone/page-builder/styler/settings/image/SSettingImage.vue";

export default {
  name: "USettingDynamic",

  mixins: [LMixinEvents],
  inject: ["$builder"],

  components: {
    SSettingImage,
    SSettingCombobox,
    USettingArray,
    SSettingColor,
    SSettingSwitch,
    SSettingNumberInput,
    SSettingGroup,
    SSettingTextInput,
  },
  emits: ["update:modelValue"],

  props: {
    propertiesStructure: {
      type: Object,
      required: false,
    },
    modelValue: {
      type: Object,
      required: true,
    },
    title: {},
    nested: Boolean,
  },
  data: () => ({}),

  computed: {
    structure() {
      return DynamicVariableStructure.CreateSettingStructure(
        this.propertiesStructure,
        this.modelValue,
      );
    },

    structure_primitive() {
      return Object.fromEntries(
        Object.entries(this.structure).filter(
          ([key, value]) =>
            !["array", "object", "combobox"].includes(value.type),
        ),
      );
    },
    combobox_array() {
      return Object.fromEntries(
        Object.entries(this.structure).filter(([key, value]) =>
          ["combobox"].includes(value.type),
        ),
      );
    },

    structure_array() {
      return Object.fromEntries(
        Object.entries(this.structure).filter(([key, value]) =>
          ["array"].includes(value.type),
        ),
      );
    },

    structure_object() {
      return Object.fromEntries(
        Object.entries(this.structure).filter(([key, value]) =>
          ["object"].includes(value.type),
        ),
      );
    },
    upload_image_url() {
      return this.$builder.getImageUploadUrl();
    },

    missingProperties() {
      let targetProperties = this.modelValue;
      let structureKeys = Object.keys(this.structure);
      let missingProperties = {};

      for (let key in targetProperties) {
        if (!structureKeys.includes(key)) {
          missingProperties[key] = targetProperties[key];
        }
      }

      return missingProperties;
    },
  },
  watch: {},
  created() {
    if (!this.modelValue || Array.isArray(this.modelValue)) {
      this.$emit("update:modelValue", {});
    }
  },
  mounted() {},
  beforeUnmount() {},

  methods: {
    isObject,
    getType(value) {
      return DynamicVariableStructure.GetValueType(value);
    },

    guessTitle(value) {
      if (!value) return null;
      return value.title ? value.title : value.name ? value.name : null;
    },
  },
};
</script>

<style lang="scss" scoped></style>
