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
  <s-setting-expandable :value="value" icon="rounded_corner" title="Border">
    <template v-slot:title>
      <s-setting-chip
        v-if="borderLeft?.trim() && !borderLeft.includes('unset')"
        :value="getName(borderLeft)"
        icon="border_left"
      ></s-setting-chip>

      <s-setting-chip
        v-if="
          !borders_same && borderRight?.trim() && !borderRight.includes('unset')
        "
        :value="getName(borderRight)"
        icon="border_right"
      ></s-setting-chip>

      <s-setting-chip
        v-if="
          !borders_same && borderTop?.trim() && !borderTop.includes('unset')
        "
        :value="getName(borderTop)"
        icon="border_top"
      ></s-setting-chip>

      <s-setting-chip
        v-if="
          !borders_same &&
          borderBottom?.trim() &&
          !borderBottom.includes('unset')
        "
        :value="getName(borderBottom)"
        icon="border_bottom"
      ></s-setting-chip>

      <s-setting-chip
        v-if="borderRadius && borderRadius !== 'unset'"
        :value="getName(borderRadius)"
        icon="rounded_corner"
      ></s-setting-chip>
    </template>

    <s-landing-style-preview
      :model-value="inputStyle"
      border
      class="mb-5"
      @click:area="(val) => $emit('click:area', val)"
    ></s-landing-style-preview>

    <s-setting-group
      title="Border style"
      icon="border_style"
      subtitle="Set the boarder style here."
    ></s-setting-group>

    <s-setting-switch v-model="borders_same" label="All same">
    </s-setting-switch>

    <s-landing-style-border
      :label="borders_same ? 'Border' : 'Left'"
      :model-value="borderLeft"
      @update:model-value="
        (v) => {
          $emit('update:borderLeft', v);

          if (borders_same) {
            $emit('update:borderRight', v);
            $emit('update:borderTop', v);
            $emit('update:borderBottom', v);
          }
        }
      "
      :icon="borders_same ? 'border_outer' : 'border_left'"
    ></s-landing-style-border>

    <v-expand-transition>
      <div v-if="!borders_same">
        <s-landing-style-border
          :model-value="borderRight"
          @update:model-value="(v) => $emit('update:borderRight', v)"
          label="Right"
          icon="border_right"
        ></s-landing-style-border>
        <s-landing-style-border
          :model-value="borderTop"
          @update:model-value="(v) => $emit('update:borderTop', v)"
          label="Top"
          icon="border_top"
        ></s-landing-style-border>
        <s-landing-style-border
          :model-value="borderBottom"
          @update:model-value="(v) => $emit('update:borderBottom', v)"
          label="Bottom"
          icon="border_bottom"
        ></s-landing-style-border>
      </div>
    </v-expand-transition>

    <s-setting-size
      :model-value="borderRadius"
      @update:model-value="(v) => $emit('update:borderRadius', v)"
      icon="rounded_corner"
      clearable
      label="Border radius"
    ></s-setting-size>
  </s-setting-expandable>
</template>

<script>
import { defineComponent } from "vue";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import SLandingStylePreview from "@selldone/page-builder/components/style/preview/SLandingStylePreview.vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import SLandingStyleBorder from "@selldone/page-builder/components/style/border/SLandingStyleBorder.vue";
import SSettingSwitch from "@selldone/page-builder/styler/settings/switch/SSettingSwitch.vue";
import SSettingSize from "@selldone/page-builder/styler/settings/size/SSettingSize.vue";
import SSettingChip from "@selldone/page-builder/styler/settings/chip/SSettingChip.vue";

export default defineComponent({
  name: "LSettingsStyleBorder",
  components: {
    SSettingChip,
    SSettingSize,
    SSettingSwitch,
    SLandingStyleBorder,
    SSettingExpandable,
    SLandingStylePreview,
    SSettingGroup,
  },
  emits: [
    "update:borderLeft",
    "update:borderRight",
    "update:borderTop",
    "update:borderBottom",
    "update:borderRadius",
    "click:area",
  ],
  props: {
    value: {},

    inputStyle: {},

    borderLeft: {},
    borderRight: {},
    borderTop: {},
    borderBottom: {},

    borderRadius: {},
  },
  data: () => ({
    borders_same: false,
  }),

  watch: {
    borders_same(val) {
      if (val) {
        this.$emit("update:borderRight", this.borderLeft);
        this.$emit("update:borderTop", this.borderLeft);
        this.$emit("update:borderBottom", this.borderLeft);
      }
    },
  },

  created() {
    this.borders_same =
      this.borderLeft === this.borderRight &&
      this.borderRight === this.borderTop &&
      this.borderTop === this.borderBottom;
    // console.log(this.borderLeft, this.borderRight, this.borderTop, this.borderBottom, this.borders_same,);
  },
});
</script>

<style scoped lang="scss"></style>
