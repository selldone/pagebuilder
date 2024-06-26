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
  <s-setting-expandable :value="value" icon="wb_shade" title="Shadow">
    <template v-slot:title>
      <v-chip
        v-if="shadow"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
      >
        <v-icon size="x-small" start>layers</v-icon>
        {{ isObject(shadow) ? "Custom Shadow" : "Has Shadow" }}
      </v-chip>
    </template>

    <v-expand-transition>
      <!-- Custom shadow edit mode -->

      <div v-if="in_shadow_edit">
        <s-setting-slider
          v-model="shadow.h"
          label="Vertical"
          icon="swap_vert"
          :max="200"
          :min="-200"
        ></s-setting-slider>

        <s-setting-slider
          v-model="shadow.w"
          label="Horizontal"
          icon="swap_horiz"
          :max="200"
          :min="-200"
        ></s-setting-slider>

        <s-setting-slider
          v-model="shadow.r"
          label="Blur"
          icon="blur_on"
          :max="200"
          :min="0"
        ></s-setting-slider>

        <s-setting-slider
          v-model="shadow.s"
          label="Spread"
          icon="blur_linear"
          :max="200"
          :min="-200"
        ></s-setting-slider>

        <s-setting-toggle
          v-model="shadow.i"
          label="Type"
          icon="blinds"
          :items="[
            { title: 'Outbound', icon: 'wb_shade', value: false },
            { title: 'Inset', icon: 'curtains', value: true },
          ]"
        ></s-setting-toggle>



        <s-setting-color
          v-model="shadow.c"
          icon="format_color_fill"
          label="Color"
        ></s-setting-color>
      </div>

      <!-- Select shadow collection (default) -->
      <v-item-group
        v-else
        :model-value="shadow"
        @update:model-value="(v) => $emit('update:shadow', v)"
        :style="{ 'max-height': 40 + 'vh' }"
        class="overflow-y-auto bg-tiny-checkers rounded-lg"
      >
        <v-container>
          <v-row align="center" justify="center">
            <v-col v-for="(item, i) in ShadowCollection" :key="i">
              <v-item v-slot="{ isSelected, toggle }" :value="item">
                <v-card
                  :style="`box-shadow:${item}`"
                  class="d-flex align-center"
                  color="#fff"
                  height="80"
                  width="80"
                  @click="toggle"
                >
                  <v-scroll-y-transition>
                    <div v-if="isSelected" class="flex-grow-1 text-center">
                      <v-icon color="success" size="large">check</v-icon>
                    </div>
                  </v-scroll-y-transition>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </v-expand-transition>

    <div class="py-2">
      <!-- Edit custom shadow -->
      <v-btn v-if="!in_shadow_edit && !shadow" @click="addShadow()">
        <v-icon class="me-1">layers</v-icon>
        Edit custom shadow
      </v-btn>

      <v-btn v-if="shadow" @click="removeShadow()">
        <v-icon class="me-1">layers_clear</v-icon>
        Remove shadow
      </v-btn>
    </div>
  </s-setting-expandable>
</template>

<script>
import { defineComponent } from "vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import ShadowCollection from "@selldone/page-builder/src/enums/ShadowCollection";
import SSettingSlider from "@selldone/page-builder/styler/settings/slider/SSettingSlider.vue";
import SSettingToggle from "@selldone/page-builder/styler/settings/toggle/SSettingToggle.vue";
import SSettingColor from "@selldone/page-builder/styler/settings/color/SSettingColor.vue";

export default defineComponent({
  name: "LSettingsStyleShadow",
  components: {
    SSettingColor,
    SSettingToggle,
    SSettingSlider,
    SSettingExpandable,
  },
  emits: [],
  props: {
    value:{},

    inputStyle: {},

    shadow: {},

  },
  data: () => ({
    ShadowCollection: ShadowCollection,
  }),
  computed: {
    in_shadow_edit() {
      return this.shadow && !this.isString(this.shadow);
    },
    shadow_gen() {
      if (!this.shadow) return "";
      if (this.isString(this.shadow)) return this.shadow;
      return `${this.shadow.w}px ${this.shadow.h}px ${this.shadow.r}px ${
        this.shadow.s
      }px ${this.shadow.c} ${this.shadow.i ? "inset" : ""}`;
    },
  },

  watch: {},

  created() {},

  methods: {
    addShadow() {
      this.$emit("update:shadow", {
        w: 10,
        h: 10,
        r: 15,
        s: 20,
        c: "#44444433",
        i: false,
      });
    },
    removeShadow() {
      this.$emit("update:shadow", null);
    },
  },
});
</script>

<style scoped lang="scss"></style>
