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
    class="custom-btn text-no-transform -trackable"
    :class="[btnData.classes, { 'button-glow': btnData.glow }]"
    :href="editing ? ' ' : btnData.href"
    v-html="btnData.content?.applyAugment(augment, editing)"
    :color="btnData.glow ? undefined : btnData.color"
    :dark="btnData.dark"
    :icon="btnData.icon"
    :depressed="btnData.depressed"
    :outlined="btnData.outlined"
    :text="btnData.text"
    :fab="btnData.fab"
    :tile="btnData.tile"
    :x-small="btnData.xSmall"
    :small="btnData.small"
    :large="btnData.large"
    :x-large="btnData.xLarge"
    :ripple="btnData.ripple"
    :rounded="btnData.rounded"
    :link="!!btnData.href"
    retain-focus-on-click
    @click.stop="$emit('click')"
    :id="btnData.id"
    :loading="loading"
  >
  </v-btn>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    btnData: {},
    editing: { type: Boolean, default: false },
    loading: {},
    augment: {
      // Extra information to show to dynamic show in page content
    },
  },
};
</script>

<style scoped></style>
