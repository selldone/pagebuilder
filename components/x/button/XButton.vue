<!--
  - Copyright (c) 2023. Selldone® Business OS™
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
<!-- IMPORTANT: Element must have -trackable class! -->

<template>
  <v-btn
    v-styler:button="{
      target: object,
      removeChild: removeChild,
      hasAlign: hasAlign,
      noLink: noLink,
    }"
    :id="object.data.id"

    :class="[
      object.classes,
      { 'is-editable': $builder.isEditing, '-button-glow': is_glow },
    ]"
    :style="[
      object.style,
      background_style,
      {
        '--shadow-color': object.data.color,
      },
    ]"

    :color="object.data.color"
    :elevation="object.data.elevation"
    :height="object.data.height"
    :href="is_editing ? undefined : object.data.href"
    :icon="object.data.icon"
    :loading="loading"
    :ripple="object.data.ripple"
    :rounded="object.data.rounded"
    :size="object.data.size"
    :theme="is_dark ? 'dark' : is_light ? 'light' : undefined"
    :variant="is_glow ? 'elevated' : object.data.variant"
    class="x--button tnt -trackable"
    v-html="object.data.content?.applyAugment(augment, is_editing)"


  >
  </v-btn>
</template>

<script>
import LMixinXComponent from "@selldone/page-builder/mixins/x-component/LMixinXComponent";
import { XButtonObject } from "@selldone/page-builder/components/x/button/XButtonObject.ts";
import StylerDirective from "@selldone/page-builder/styler/StylerDirective.ts";

export default {
  name: "XButton",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],
  props: {
    object: {
      type: XButtonObject,
      required: true,
    },
    loading: {},
    augment: {
      // Extra information to show to dynamic show in page content
    },
    removeChild: {},
    hasAlign: Boolean,
    noLink: Boolean,
  },
  computed: {
    is_editing() {
      return this.$builder.isEditing;
    },
    is_glow() {
      return (
        this.object.data.variant === "glow" /*New*/ || this.object.glow
      ); /*Old*/
    },
    is_dark() {
      if (typeof this.object.data.color === "string") {
        return this.object.data.color.includes("-dark-"); // ex. var(--plate-dark-4)
      }
      return false;
    },
    is_light() {
      if (typeof this.object.data.color === "string") {
        return this.object.data.color.includes("-light-"); // ex. var(--plate-light-4)
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
.x--button {
  &.-button-glow {
    text-align: center;

    background-size: 300% 100%;

    transition: all 0.4s ease-in-out;

    background: var(--shadow-color);
    box-shadow: 0 4px 15px 0 var(--shadow-color) !important;

    &:hover {
      background-position: 100% 0 !important;
      transition: all 0.4s ease-in-out;
      text-decoration: none;
    }

    &:focus {
      outline: none;
    }
  }
}
</style>
