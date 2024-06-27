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
  <v-bottom-sheet
    :model-value="modelValue"
    @update:model-value="(v) => $emit('update:modelValue', v)"
    content-class="text-start rounded-t-xl"
    class="no-blur-overlay"
    width="98vw"
    max-width="640"
  >
    <v-card rounded="t-xl" color="#121212">
      <v-card-title>
        <v-icon class="me-2">linear_scale</v-icon>
        Menu Style
      </v-card-title>
      <v-card-text>
        <s-setting-group
          icon="control_camera"
          title="Position"
          subtitle="Set position and behavior of the menu."
        ></s-setting-group>

        <s-setting-toggle
          v-model="page_style.header_mode"
          :items="['normal', 'overlay', 'hidden']"
          label="Menu Position"
          mandatory
        >
        </s-setting-toggle>

        <s-setting-toggle
          v-model="page_style.menu_transparent"
          :items="[
            { title: 'Transparent', icon: 'format_color_reset', value: true },
            { title: 'Solid', icon: 'opacity', value: false },
          ]"
          label="Behavior"
          mandatory
        >
        </s-setting-toggle>

        <s-setting-group
          icon="format_color_fill"
          title="Color"
          subtitle="Set the color and dark/light mode of the menu."
        ></s-setting-group>

        <s-setting-toggle
          v-model="page_style.menu_dark"
          :items="[
            { title: 'Dark', icon: 'dark_mode', value: true },
            { title: 'Light', icon: 'light_mode', value: false },
          ]"
          label="Color Mode"
          mandatory
          icon="contrast"
        >
        </s-setting-toggle>

        <s-setting-color
          v-model="page_style.header_color"
          icon="palette"
          label="Color"
          clearable
        >
        </s-setting-color>
      </v-card-text>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn
            size="x-large"
            variant="text"
            @click="$emit('update:modelValue', false)"
          >
            <v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import { defineComponent } from "vue";
import { LMixinEvents } from "../../../../mixins/events/LMixinEvents";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import SSettingToggle from "@selldone/page-builder/styler/settings/toggle/SSettingToggle.vue";
import SSettingColor from "@selldone/page-builder/styler/settings/color/SSettingColor.vue";

export default defineComponent({
  name: "LStoreTopBarEditor",
  mixins: [LMixinEvents],
  components: { SSettingColor, SSettingToggle, SSettingGroup },
  emits: ["update:modelValue"],
  props: {
    modelValue: {},
    shop: {
      type: Object,
      required: true,
    },
    builder: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },

  computed: {
    page_style() {
      return this.builder.style;
    },
  },
  watch: {
    page_style() {
      if (!this.page_style) this.builder.style = {};
      if (!this.page_style.header_mode) this.page_style.header_mode = "normal";
    },
  },
  created() {
    if (!this.page_style) this.builder.style = {};
    if (!this.page_style.header_mode) this.page_style.header_mode = "normal";
  },
  methods: {},
});
</script>

<style scoped lang="scss"></style>
