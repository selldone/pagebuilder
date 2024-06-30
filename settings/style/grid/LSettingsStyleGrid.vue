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
  <s-setting-expandable :value="value" icon="grid_on" title="Grid">
    <template v-slot:title>
      <v-chip
        v-for="item in DEVICES.filter((i) => !!grid[i.key])"
        :key="item.key"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        :prepend-icon="item.icon"
      >
        {{ grid[item.key] }}
      </v-chip>
    </template>

    <s-setting-group
      icon="calendar_view_week"
      title="Size"
      subtitle="Set the size of the column. Consider the width has been split into 12 parts, and you set the size of the column as a proportion of these 12 parts."
    >
    </s-setting-group>

    <s-setting-column
      v-for="item in DEVICES"
      :key="item.key"
      v-model="grid[item.key]"
      :label="item.title"
      :icon="item.icon"
      clearable
    >
    </s-setting-column>
  </s-setting-expandable>
</template>

<script>
import { defineComponent } from "vue";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import SSettingColumn from "@selldone/page-builder/styler/settings/column/SSettingColumn.vue";

export default defineComponent({
  name: "LSettingsStyleGrid",
  components: {
    SSettingColumn,
    SSettingExpandable,
    SSettingGroup,
  },
  emits: [],
  props: {
    value: {},

    inputStyle: {},

    grid: {},
  },

  data() {
    return {
      DEVICES: [
        { key: "mobile", title: "Mobile", icon: "smartphone" },
        { key: "tablet", title: "Tablet", icon: "tablet" },
        { key: "desktop", title: "Desktop", icon: "laptop" },
        { key: "widescreen", title: "Widescreen", icon: "desktop_mac" },
      ],
    };
  },

  computed: {},
});
</script>

<style scoped lang="scss"></style>
