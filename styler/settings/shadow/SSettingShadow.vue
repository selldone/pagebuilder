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
  <!-- ████████████████████████ Shadow ████████████████████████ -->
  <div :class="{ 'disabled-scale-down': disabled }" class="s--setting-shadow">
    <v-list-item>
      <span class="-label me-2 min-width-100">
        <v-icon v-if="icon" class="me-1">{{ icon }}</v-icon>

        {{ label }}</span
      >
      <template v-slot:append>
        <v-btn
          v-if="modelValue"
          @click="$emit('update:modelValue', null)"
          color="red"
          variant="text"
          size="small"
          class="ms-1 tnt"
        >
          <v-icon class="me-1">layers_clear</v-icon>
          Remove shadow
        </v-btn>

        <v-btn
          @click="addNewShadow()"
          size="small"
          class="ms-1 tnt"
          variant="outlined"
        >
          <v-icon start>add_box</v-icon>
          Add Shadow
        </v-btn>
      </template>
    </v-list-item>

    <template v-if="isValid">
      <v-expand-transition>
        <v-carousel
          v-if="text_shadow_object?.length"
          v-model="tab"
          color="#fff"
          hide-delimiter-background
          continuous
          :height="textShadowMode ? 220 : 300"
          :show-arrows="false"
        >
          <v-carousel-item v-for="(item, i) in text_shadow_object" :key="i">
            <s-setting-slider
              v-model="item.h"
              label="Vertical"
              icon="swap_vert"
              :max="200"
              :min="-200"
              suffix="px"
              class="border-start-white-thin ms-6"
            ></s-setting-slider>

            <s-setting-slider
              v-model="item.w"
              label="Horizontal"
              icon="swap_horiz"
              :max="200"
              :min="-200"
              suffix="px"
              class="border-start-white-thin ms-6"
            ></s-setting-slider>

            <s-setting-slider
              v-model="item.r"
              label="Blur"
              icon="blur_on"
              :max="200"
              :min="0"
              suffix="px"
              class="border-start-white-thin ms-6"
            ></s-setting-slider>

            <s-setting-slider
              v-if="!textShadowMode"
              v-model="item.s"
              label="Spread"
              icon="blur_linear"
              :max="200"
              :min="-200"
              suffix="px"
              class="border-start-white-thin ms-6"
            ></s-setting-slider>

            <s-setting-toggle
              v-if="!textShadowMode"
              v-model="item.i"
              label="Type"
              icon="blinds"
              :items="[
                { title: 'Outbound', icon: 'wb_shade', value: false },
                { title: 'Inset', icon: 'curtains', value: true },
              ]"
              class="border-start-white-thin ms-6"
            ></s-setting-toggle>

            <s-setting-color
              v-model="item.c"
              icon="format_color_fill"
              label="Color"
              clearable
              class="border-start-white-thin ms-6"
            ></s-setting-color>
          </v-carousel-item>
        </v-carousel>
      </v-expand-transition>
    </template>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import SSettingSlider from "@selldone/page-builder/styler/settings/slider/SSettingSlider.vue";
import SSettingColor from "@selldone/page-builder/styler/settings/color/SSettingColor.vue";
import SSettingToggle from "@selldone/page-builder/styler/settings/toggle/SSettingToggle.vue";
import { BoxShadowHelper } from "@selldone/page-builder/styler/settings/shadow/BoxShadowHelper";
import { TextShadowHelper } from "@selldone/page-builder/styler/settings/shadow/TextShadowHelper";

export default defineComponent({
  name: "SSettingShadow",
  components: { SSettingToggle, SSettingColor, SSettingSlider },
  emits: ["update:modelValue"],
  props: {
    /**
     * It should be string
     */
    modelValue: {
      type: String,
    },
    label: {},
    icon: {},
    disabled: Boolean,
    autoAddFirst: Boolean,

    /**
     * Has no Spread & Inset options
     */
    textShadowMode: Boolean,
  },
  data() {
    return {
      tab: 0,

      /**
       * It should be array of shadows
       */
      text_shadow_object: null,
    };
  },

  computed: {
    isValid() {
      return this.text_shadow_object && Array.isArray(this.text_shadow_object);
    },
    shadow_text_gen() {
      return this.textShadowMode
        ? TextShadowHelper.Generate(this.text_shadow_object)
        : BoxShadowHelper.Generate(this.text_shadow_object);
    },
  },
  watch: {
    shadow_text_gen(val) {
      this.$emit("update:modelValue", val);
    },
  },

  methods: {
    addNewShadow() {
      const new_item = this.textShadowMode
        ? TextShadowHelper.NewItem()
        : BoxShadowHelper.NewItem();

      if (this.isValid) {
        this.text_shadow_object.push(new_item);
        this.tab = this.text_shadow_object.length - 1;
      } else {
        this.text_shadow_object = [new_item];

        this.tab = 0;
      }
    },
  },

  created() {
    this.text_shadow_object = this.textShadowMode
      ? TextShadowHelper.Extract(this.modelValue)
      : BoxShadowHelper.Extract(this.modelValue);

    if (this.autoAddFirst && !this.text_shadow_object?.length) {
      const new_item = this.textShadowMode
        ? TextShadowHelper.NewItem()
        : BoxShadowHelper.NewItem();

      this.text_shadow_object = [new_item];
    }
  },
});
</script>

<style lang="scss" scoped>
.s--setting-shadow {
  .-label {
    font-size: 0.8rem;
  }
}
</style>
