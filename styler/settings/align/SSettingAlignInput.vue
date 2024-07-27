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
  <!-- ████████████████████████ Select ████████████████████████ -->
  <div
    :class="{ 'disabled-scale-down': disabled }"
    class="s--setting-align-input"
  >
    <v-list-item density="compact">
      <template v-slot:prepend>
        <span class="-label me-2 min-width-100">
          <v-icon v-if="icon" class="me-1">{{ icon }}</v-icon>

          {{ label }}</span
        >
      </template>

      <div class="d-flex align-center">
        <v-sheet
          :width="32 * 3"
          :height="32 * 3"
          color="#444"
          rounded="lg"
          style="border: #000 thin solid"
        >
          <v-row no-gutters>
            <v-col v-for="item in items" cols="4">
              <v-btn
                @click="onClick(item)"
                variant="text"
                min-width="24"
                min-height="24"
                width="32"
                height="32"
                :class="{
                  '-default-activated elevation-3':
                    !align &&
                    !justify &&
                    item.align === defaultAlign &&
                    item.justify === defaultJustify,
                }"
              >
                <v-icon
                  v-if="align === item.align && justify === item.justify"
                  size="20"
                  >view_day
                </v-icon>

                <span v-else class="-dot"></span>
              </v-btn>
            </v-col>
          </v-row>
        </v-sheet>

        <div class="flex-grow-1">
          <s-setting-select
            :items="ALIGN"
            item-value="val"
            :model-value="align"
            @update:model-value="(v) => $emit('update:align', v)"
            :default-value="defaultAlign"
            clearable
          >
          </s-setting-select>
          <s-setting-select
            :items="JUSTIFY"
            item-value="val"
            :model-value="justify"
            @update:model-value="(v) => $emit('update:justify', v)"
            :default-value="defaultJustify"
            clearable

          >
          </s-setting-select>
        </div>
      </div>
    </v-list-item>
    <div>
      <slot></slot>
    </div>
  </div>
  <div v-if="subtitle" class="small">{{ subtitle }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SSettingSelect from "@selldone/page-builder/styler/settings/select/SSettingSelect.vue";
import ALIGN from "@selldone/page-builder/src/enums/ALIGN.ts";
import JUSTIFY from "@selldone/page-builder/src/enums/JUSTIFY.ts";

export default defineComponent({
  name: "SSettingAlignInput",
  components: { SSettingSelect },
  props: {
    align: {},
    defaultAlign: {},

    justify: {},
    defaultJustify: {},

    label: {},

    icon: {},
    min: { default: 0 },
    max: { default: 100 },
    clearable: Boolean,
    hasAuto: Boolean,
    disabled: Boolean,
    lock: Boolean,
    suffix: {},
    subtitle: {},
    placeholder: {},
    defaultValue: {},
  },
  computed: {},
  data() {
    return {
      ALIGN: ALIGN,
      JUSTIFY: JUSTIFY,

      items: [
        { align: "start", justify: "start" },
        { align: "start", justify: "center" },
        { align: "start", justify: "end" },
        { align: "center", justify: "start" },
        { align: "center", justify: "center" },
        { align: "center", justify: "end" },
        { align: "end", justify: "start" },
        { align: "end", justify: "center" },
        { align: "end", justify: "end" },
      ],
    };
  },
  methods: {
    setValue(value) {
      this.$emit("update:modelValue", value);
    },
    onClick(item) {
      if (this.align === item.align && this.justify === item.justify) {
        this.$emit("update:align", null);
        this.$emit("update:justify", null);
      } else {
        this.$emit("update:align", item.align);
        this.$emit("update:justify", item.justify);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.s--setting-align-input {
  .-label {
    font-size: 0.8rem;
  }

  .-dot {
    background-color: #b5b5b5;
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }

  .-default-activated {
    background-color: #000 !important;
  }
}
</style>
