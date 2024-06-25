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
  <s-setting-expandable icon="turned_in" title="Class">
    <template v-slot:title>
      <v-chip
        v-for="(it, i) in classes?.limit(3)"
        :key="i"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >{{ getName(it) }}
      </v-chip>
    </template>


    <s-setting-group
        title="Classes"
        icon="integration_instructions"
        subtitle="In CSS, a class represents a collection of elements with similar or identical characteristics. All classes in Bootstrap 4 are supported."
    ></s-setting-group>



    <v-combobox
      :items="standard_classes"
      :model-value="classes"
      @update:model-value="(v) => $emit('update:classes', v)"
      chips
      class="max-w-640 mx-auto"
      clearable
      closable-chips
      multiple
      variant="underlined"
    >
      <template v-slot:chip="{item,props}">
        <v-chip v-bind="props" label color="#1976D2" variant="flat">

        </v-chip>
      </template>
    </v-combobox>
  </s-setting-expandable>
</template>

<script>
import { defineComponent } from "vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import { LUtilsClasses } from "@selldone/page-builder/utils/classes/LUtilsClasses";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";

export default defineComponent({
  name: "LSettingsClasses",
  components: {
    SSettingGroup,
    SSettingExpandable,
  },
  emits: ["update:classes"],
  props: {
    classes: {},
  },
  data: () => ({
    standard_classes: LUtilsClasses.StandardClasses(),
  }),

  watch: {},

  created() {},
});
</script>

<style scoped lang="scss"></style>
