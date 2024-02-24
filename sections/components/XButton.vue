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

<template>
  <!-- IMPORTANT: Element must have -trackable class! -->
  <v-btn
    :id="btnData.id"
    :class="[btnData.classes, { '-button-glow': is_glow }]"
    :color="btnData.color"
    :elevation="btnData.elevation"
    :height="btnData.height"
    :href="editing ? ' ' : btnData.href"
    :icon="btnData.icon"
    :loading="loading"
    :ripple="btnData.ripple"
    :rounded="
      btnData.rounded ? btnData.rounded : btnData.tile ? 0 : btnData.rounded
    "
    :size="
      btnData.size
        ? btnData.size
        : btnData.xLarge
          ? 'x-large'
          : btnData.large
            ? 'large'
            : btnData.small
              ? 'small'
              : btnData.xSmall
                ? 'x-small'
                : undefined
    "
    :style="{ fontFamily: btnData.font, '--shadow-color': btnData.color }"
    :theme="is_dark ? 'dark' : is_light ? 'light' : undefined"
    :variant="
      is_glow
        ? 'elevated'
        : btnData.variant
          ? btnData.variant
          : btnData.depressed
            ? 'flat'
            : btnData.outlined
              ? 'outlined'
              : btnData.text
                ? 'text'
                : btnData.fab
                  ? 'elevated'
                  : undefined
    "
    class="x--button tnt -trackable"
    v-html="btnData.content?.applyAugment(augment, editing)"
    @click.stop="$emit('click')"
  >
  </v-btn>
</template>

<script>
export default {
  name: "XButton",
  props: {
    btnData: {},
    editing: { type: Boolean, default: false },
    loading: {},
    augment: {
      // Extra information to show to dynamic show in page content
    },
  },
  computed: {
    is_glow() {
      return (
        this.btnData.variant === "glow" /*New*/ || this.btnData.glow
      ); /*Old*/
    },
    is_dark() {
      if (typeof this.btnData.color === "string") {
        return this.btnData.color.includes("-dark-"); // ex. var(--plate-dark-4)
      }
      return false;
    },
    is_light() {
      if (typeof this.btnData.color === "string") {
        return this.btnData.color.includes("-light-"); // ex. var(--plate-light-4)
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
