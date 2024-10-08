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
  <!-- ━━━━━━━━━━━━━━━━━━━━ Responsive ━━━━━━━━━━━━━━━━━━━━ -->
  <div class="pb-1">
    <v-btn
      v-for="size in sizes"
      :key="size.value"
      size="x-small"
      class="tnt px-1 ms-1 hover-scale-tiny"
      min-width="20"
      :variant="screen === size.value ? 'flat' : hasValue(size.value) ? 'text' : 'plain'"
      :color="screen === size.value ? color : undefined"
      @click.stop="$emit('update:screen', size.value)"
      :prepend-icon="size.icon"
    >
      {{ size.title }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SSettingResponsiveMixin from "@selldone/page-builder/styler/settings/responsive-mixin/SSettingResponsiveMixin.ts";

export default defineComponent({
  name: "SSettingResponsiveButtons",
  mixins: [SSettingResponsiveMixin],
  components: {},
  emits: ["update:screen"],
  props: {
    screen: {},
    color:{
      default:'amber'
    }
  },
  computed: {},
  data() {
    return {};
  },
  methods: {
    hasValue(screen): boolean {
      const isValidSize = (size: any) =>
        size !== undefined &&
        size !== null &&
        !["auto", "unset", "0", 0].includes(size);

      switch (screen) {
        case "sm":
          return isValidSize(this.smValue);
        case "md":
          return isValidSize(this.mdValue);
        case "lg":
          return isValidSize(this.lgValue);
        case "xl":
          return isValidSize(this.xlValue);
        case "xxl":
          return isValidSize(this.xxlValue);
        default:
          return isValidSize(this.modelValue);
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
