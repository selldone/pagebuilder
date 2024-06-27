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
        <v-icon start>layers</v-icon>
        <span class="me-1">{{
          isObject(shadow) ? "Custom Shadow" : "Has Shadow"
        }}</span>

        <v-icon v-for="it in shadow_colors" :color="it">circle</v-icon>
      </v-chip>
    </template>

    <v-expand-transition>
      <!-- Custom shadow edit mode -->

      <div v-if="in_shadow_edit">
        <s-setting-shadow
          :model-value="shadow"
          @update:model-value="(v) => $emit('update:shadow', v)"
          label="Custom Shadow"
          icon="tune"
          auto-add-first
        ></s-setting-shadow>
      </div>

      <!-- Select shadow collection (default) -->
      <v-item-group
        v-else
        :model-value="shadow"
        @update:model-value="(v) => $emit('update:shadow', v)"
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
      v-if="!in_shadow_edit"
      @click="addShadow()"
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

export default defineComponent({
  name: "LSettingsStyleShadow",
  components: {
    SSettingShadow,

    SSettingExpandable,
  },
  emits: [],
  props: {
    value: {},

    inputStyle: {},

    shadow: {},
  },
  data: () => ({
    ShadowCollection: ShadowCollection,
  }),
  computed: {
    shadow_colors() {
      if (!Array.isArray(this.shadow)) return [];
      return this.shadow.map((s) => s.c);
    },

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
      this.$emit("update:shadow", [BoxShadowHelper.NewItem()]);
    },
  },
});
</script>

<style scoped lang="scss"></style>
