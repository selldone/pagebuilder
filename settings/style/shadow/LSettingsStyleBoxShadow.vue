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
        v-if="boxShadow"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
      >
        <v-icon start>layers</v-icon>
        <span class="me-1">{{
          in_custom_shadow_mode ? "Custom Shadow" : "Has Shadow"
        }}</span>

        <v-icon v-for="it in shadow_colors" :color="it">circle</v-icon>
      </v-chip>
    </template>

    <v-expand-transition group>
      <!-- Custom shadow edit mode -->

      <div v-if="in_custom_shadow_mode" key="1">
        <s-setting-shadow
          :model-value="boxShadow"
          @update:model-value="(v) => $emit('update:boxShadow', v)"
          label="Custom Shadow"
          icon="tune"
          auto-add-first
        ></s-setting-shadow>
      </div>

      <!-- Select shadow collection (default) -->
      <v-item-group
        v-else
        key="2"
        :model-value="boxShadow"
        @update:model-value="(v) => $emit('update:boxShadow', v)"
        :style="{ 'max-height': 30 + 'vh' }"
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
                  height="64"
                  width="64"
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
    <!-- Edit custom shadow -->
    <v-btn
      v-if="!in_custom_shadow_mode"
      @click="openCustomShadow()"
      block
      class="mt-3"
      variant="outlined"
    >
      <v-icon start>layers</v-icon>
      Edit custom shadow
    </v-btn>
  </s-setting-expandable>
</template>

<script>
import { defineComponent } from "vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import ShadowCollection from "@selldone/page-builder/src/enums/ShadowCollection";
import SSettingShadow from "@selldone/page-builder/styler/settings/shadow/SSettingShadow.vue";
import { BoxShadowHelper } from "@selldone/page-builder/styler/settings/shadow/BoxShadowHelper";
import { isObject } from "lodash-es";

export default defineComponent({
  name: "LSettingsStyleBoxShadow",
  components: {
    SSettingShadow,

    SSettingExpandable,
  },
  emits: ["update:boxShadow"],
  props: {
    value: {},

    inputStyle: {},

    boxShadow: {
      type: String,
    },
  },
  data: () => ({
    ShadowCollection: ShadowCollection,

    in_custom_shadow_mode: false,
  }),
  computed: {
    shadow_object() {
      return BoxShadowHelper.Extract(this.boxShadow);
    },
    shadow_colors() {
      if (!Array.isArray(this.shadow_object)) return [];
      return this.shadow_object.map((s) => s.c);
    },
  },

  watch: {
    inputStyle() {
      this.init();
    },

    shadow_object(val) {
      if (!val || !val.length) {
        this.in_custom_shadow_mode = false;
      }
    },
  },

  created() {
    this.init();
  },

  methods: {
    isObject,
    openCustomShadow() {
      this.in_custom_shadow_mode = true;
    },
    init() {
      this.in_custom_shadow_mode = !ShadowCollection.includes(this.boxShadow); // Be in collection!
    },
  },
});
</script>

<style scoped lang="scss"></style>
