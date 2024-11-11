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
  <!-- ━━━━━━━━━━━━━━━━━━━━ Array ━━━━━━━━━━━━━━━━━━━━ -->
  <s-setting-group
    v-bind="$attrs"
    subtitle="Set the values of the array."
    :title="title"
    icon="data_array"
  >
    <template v-slot:title-action>
      <v-btn @click="addItemToArray()" class="tnt" variant="text">
        <v-icon color="green" start>add_box</v-icon>
        Add to {{ title?.limitWords(2) }}
      </v-btn>
    </template>
    <v-tabs v-model="tab" align-tabs="end" color="amber">
      <v-tab v-for="(_value, k) in modelValue" :key="k" :value="k" class="tnt">
        <div
          class="text-ellipsis d-block overflow-hidden"
          style="max-width: 60px"
        >
          {{
            _value.title
              ? _value.title
              : _value.name
                ? _value.name
                : `Item ${k}`
          }}
        </div>

        <v-fade-transition leave-absolute>
          <v-btn
            v-if="modelValue.length > 1"
            @click.stop="removeItem(k)"
            color="red"
            class="ms-1 hover-scale-small"
            icon
            variant="text"
            size="20"
            title="Delete item"
          >
            <v-icon size="16">close</v-icon>
          </v-btn>
        </v-fade-transition>
      </v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item v-for="(_value, k) in modelValue" :key="k" :value="k">
        <slot
          name="item"
          :value="modelValue"
          :index="k"
          :structure="propertiesStructure"
        >
        </slot>
      </v-tabs-window-item>
    </v-tabs-window>
  </s-setting-group>
</template>

<script lang="ts">
import { LMixinEvents } from "../../../mixins/events/LMixinEvents";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";

export default {
  name: "USettingArray",

  mixins: [LMixinEvents],

  components: {
    SSettingGroup,
  },

  props: {
    title: {},

    modelValue: {
      type: Object,
      required: true,
    },
    propertiesStructure: {},
  },
  data: () => ({
    tab: 0,
  }),

  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeUnmount() {},

  methods: {
    addItemToArray() {
      if (!this.modelValue?.length) {
        this.showErrorAlert(
          "Invalid Structure",
          "Please add least one item to the array in the structure.",
        );

        return;
      }
      this.modelValue.push(JSON.parse(JSON.stringify(this.modelValue[0])));
    },

    removeItem(index) {
      this.openDangerAlert(
        "Remove Item",
        "Are you sure you want to remove this item?",
        "Yes, Remove Item",
        () => {
          this.modelValue.splice(index, 1);
        },
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
