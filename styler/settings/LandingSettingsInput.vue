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
  <div class="s--landing-settings-input" :class="{'border-between-vertical':borderBetween}">
    <template v-for="item in structure" :key="item.key">
      <!-- ████████████████████████ Group ████████████████████████ -->
      <template v-if="item.type === 'group'">
        <v-card-title class="-group-title pb-0 mt-2">{{ item.title }}</v-card-title>
        <v-card color="#99999911" rounded="lg" class="my-2">
          <landing-settings-input
            :structure="item.children!"
            :model-value="modelValue"
            border-between
          >
          </landing-settings-input>
        </v-card>
      </template>

      <!-- ████████████████████████ Switch ████████████████████████ -->

      <v-list-item
        v-else-if="item.type === 'boolean'"
        :title="item.title"
        :prepend-icon="item.icon"
        density="compact"
        @click="
          lodash.set(modelValue, item.key, !lodash.get(modelValue, item.key))
        "
      >
        <template v-slot:append>
          <v-switch
            inset
            :model-value="lodash.get(modelValue, item.key)"
            @click.stop
            hide-details
            density="compact"
            color="#1976D2"
            @update:model-value="(val) => lodash.set(modelValue, item.key, val)"
          ></v-switch>
        </template>
      </v-list-item>
      <!-- ████████████████████████ Select ████████████████████████ -->
      <v-list-item
        v-else-if="item.type === 'enum'"
        :title="item.title"
        :prepend-icon="item.icon"
        density="compact"
      >
        <template v-slot:append>
          <v-select
            inset
            hide-details
            density="compact"
            color="#1976D2"
            :items="item.options"
            item-value="value"
            item-title="value"
            :return-object="false"
            :model-value="lodash.get(modelValue, item.key)"
            @update:model-value="(val) => lodash.set(modelValue, item.key, val)"
            variant="plain"
          >
            <template v-slot:selection="{ item }">
              <v-icon v-if="item.raw.icon" class="me-2" size="20">{{
                item.raw.icon
              }}</v-icon>
              {{ item.raw.title ? item.raw.title : item.raw.value }}
            </template>
            <template v-slot:item="{ item, props }">
              <v-list-item
                v-bind="props"
                :title="item.raw.title ? item.raw.title : item.raw.value"
                :prepend-icon="item.raw.icon"
              ></v-list-item>
            </template>
          </v-select>
        </template>
      </v-list-item>

      <!-- ████████████████████████ Invalid ████████████████████████ -->

      <div v-else class="pa-2 text-red">
        Invalid setting item!
        <div>
          <code>
            {{ item }}
          </code>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { LandingSettingStructure } from "@app-page-builder/sections/LandingSettingStructure";
import _ from "lodash";

export default defineComponent({
  name: "LandingSettingsInput",
  props: {
    modelValue: {
      type: Object as PropType<Record<string, unknown>>,
      required: true,
    },
    structure: {
      type: Array as PropType<LandingSettingStructure[]>,
      required: true,
    },
    borderBetween:Boolean
  },
  computed: {},
  data() {
    return {
      lodash: _,
    };
  },
});
</script>

<style lang="scss" scoped>
.s--landing-settings-input {
  .-group-title {
    font-size: 14px !important;
    opacity: 0.6;
  }
}
</style>
