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
  <s-setting-expandable icon="margin" title="Margin">
    <template v-slot:title>
      <v-chip
        v-if="marginLeft && marginLeft !== 'unset'"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Left: {{ marginLeft }}
      </v-chip>
      <v-chip
        v-if="marginRight && marginRight !== 'unset'"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Right: {{ marginRight }}
      </v-chip>
      <v-chip
        v-if="marginTop && marginTop !== 'unset'"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Top: {{ marginTop }}
      </v-chip>
      <v-chip
        v-if="marginBottom && marginBottom !== 'unset'"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Bottom: {{ marginBottom }}
      </v-chip>
    </template>



    <s-landing-style-preview
      :model-value="inputStyle"
      class="mb-5"
      margin
      @click:area="(val) => $emit('click:area', val)"
    ></s-landing-style-preview>

    <s-setting-group
        title="Margin"
        icon="margin"
        subtitle="In CSS, a margin is the space around an element's border, while padding is the space between an element's border and the element's content."
    ></s-setting-group>

    <v-row dense>
      <v-col cols="6">
        <s-setting-size
          :model-value="marginLeft"
          @update:model-value="(v) => $emit('update:marginLeft', v)"
          clearable
          label="Left"
        ></s-setting-size>
      </v-col>
      <v-col cols="6">
        <s-setting-size
          :model-value="marginRight"
          @update:model-value="(v) => $emit('update:marginRight', v)"
          clearable
          label="Right"
        ></s-setting-size>
      </v-col>
      <v-col cols="6">
        <s-setting-size
          :model-value="marginTop"
          @update:model-value="(v) => $emit('update:marginTop', v)"
          clearable
          label="Top"
        ></s-setting-size>
      </v-col>
      <v-col cols="6">
        <s-setting-size
          :model-value="marginBottom"
          @update:model-value="(v) => $emit('update:marginBottom', v)"
          clearable
          label="Bottom"
        ></s-setting-size>
      </v-col>
    </v-row>
  </s-setting-expandable>
</template>

<script>
import { defineComponent } from "vue";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import SLandingStylePreview from "@selldone/page-builder/components/style/preview/SLandingStylePreview.vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import SSettingSize from "@selldone/page-builder/styler/settings/size/SSettingSize.vue";

export default defineComponent({
  name: "LSettingsStyleMargin",
  components: {
    SSettingSize,
    SSettingExpandable,
    SLandingStylePreview,
    SSettingGroup,
  },
  emits: [
    "update:marginLeft",
    "update:marginRight",
    "update:marginTop",
    "update:marginBottom",
    "click:area",
  ],
  props: {
    inputStyle: {},

    marginLeft: {},
    marginRight: {},

    marginTop: {},
    marginBottom: {},
  },
});
</script>

<style scoped lang="scss"></style>
