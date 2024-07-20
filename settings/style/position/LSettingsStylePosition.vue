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
  <s-setting-expandable :value="value" icon="control_camera" title="Position">
    <template v-slot:title>
      <v-chip
        v-if="position"
        class="ms-1 text-capitalize"
        color="#3F51B5"
        label
        size="x-small"
        title="Margin Bottom"
        variant="flat"
        density="comfortable"
        >{{ position }}
      </v-chip>

      <v-chip
        v-if="left && left !== 'unset'"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Left: {{ left }}
      </v-chip>
      <v-chip
        v-if="right && right !== 'unset'"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Right: {{ right }}
      </v-chip>
      <v-chip
        v-if="top && top !== 'unset'"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Top: {{ top }}
      </v-chip>
      <v-chip
        v-if="bottom && bottom !== 'unset'"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Bottom: {{ bottom }}
      </v-chip>

      <v-chip
        v-if="zIndex"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Z-Index: {{ zIndex }}
      </v-chip>
    </template>

    <s-landing-style-preview
      :model-value="inputStyle"
      class="mb-5"
      position
      @click:area="(val) => $emit('click:area', val)"
    >
    </s-landing-style-preview>

    <s-setting-group
      title="Position"
      icon="control_camera"
      subtitle="The position property specifies the type of positioning method used for an element (static, relative, absolute, fixed, or sticky)."
    ></s-setting-group>

    <s-setting-select
      :model-value="position"
      @update:model-value="(v) => $emit('update:position', v)"
      :items="POSITION"
      label="Position"
      clearable
      :default-value="computedStyle?.position"
    ></s-setting-select>

    <v-row dense :class="{ disabled: position === 'static' || !position }">
      <v-col cols="6">
        <s-setting-size
          :model-value="top"
          @update:model-value="(v) => $emit('update:top', v)"
          label="Top"
          :default-value="computedStyle?.top"
        ></s-setting-size>

        <s-setting-size
          :model-value="left"
          @update:model-value="(v) => $emit('update:left', v)"
          label="Left"
          :default-value="computedStyle?.left"
        ></s-setting-size>
      </v-col>
      <v-col cols="6">
        <s-setting-size
          :model-value="bottom"
          @update:model-value="(v) => $emit('update:bottom', v)"
          label="Bottom"
          :default-value="computedStyle?.bottom"
        ></s-setting-size>

        <s-setting-size
          :model-value="right"
          @update:model-value="(v) => $emit('update:right', v)"
          label="Right"
          :default-value="computedStyle?.right"
        ></s-setting-size>
      </v-col>

      <v-col cols="12">
        <s-setting-number-input
          :model-value="zIndex"
          @update:model-value="(v) => $emit('update:zIndex', v)"
          label="Z-Index"
          clearable
          :max="999999"
          :default-value="computedStyle?.zIndex"
        ></s-setting-number-input>
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
import SSettingSelect from "@selldone/page-builder/styler/settings/select/SSettingSelect.vue";
import { POSITION } from "@selldone/page-builder/src/enums/position/POSITION";
import SSettingNumberInput from "@selldone/page-builder/styler/settings/number-input/SSettingNumberInput.vue";

export default defineComponent({
  name: "LSettingsStylePosition",
  components: {
    SSettingNumberInput,
    SSettingSelect,
    SSettingSize,
    SSettingExpandable,
    SLandingStylePreview,
    SSettingGroup,
  },
  emits: [
    "update:position",
    "update:right",
    "update:left",
    "update:top",
    "update:bottom",
    "click:area",
    "update:zIndex",
  ],
  props: {
    value: {},
    inputStyle: {},
    computedStyle: {
      type: CSSStyleDeclaration,
    },
    position: {},

    right: {},
    left: {},

    top: {},
    bottom: {},

    zIndex: {},
  },
  data: () => ({
    POSITION: POSITION,
  }),
});
</script>

<style scoped lang="scss"></style>
