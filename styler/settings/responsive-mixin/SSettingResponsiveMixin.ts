/*
 * Copyright (c) 2024. Selldone® Business OS™
 *
 * Author: M.Pajuhaan
 * Web: https://selldone.com
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * All rights reserved. In the weave of time, where traditions and innovations intermingle, this content was crafted.
 * From the essence of thought, through the corridors of creativity, each word, and sentiment has been molded.
 * Not just to exist, but to inspire. Like an artist's stroke or a sculptor's chisel, every nuance is deliberate.
 * Our journey is not just about reaching a destination, but about creating a masterpiece.
 * Tread carefully, for you're treading on dreams.
 */

// mixins/ResponsiveMixin.ts
import {defineComponent, PropType} from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number, Object] as PropType<string | number | object>,
      default: null,
    },
    defaultValue: {
      type: [String, Number, Object] as PropType<string | number | object>,
      default: null,
    },

    // Responsive mode

    responsive: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    smValue: {
      type: [String, Number, Object] as PropType<string | number | object>,
      default: null,
    },
    mdValue: {
      type: [String, Number, Object] as PropType<string | number | object>,
      default: null,
    },
    lgValue: {
      type: [String, Number, Object] as PropType<string | number | object>,
      default: null,
    },
    xlValue: {
      type: [String, Number, Object] as PropType<string | number | object>,
      default: null,
    },
    xxlValue: {
      type: [String, Number, Object] as PropType<string | number | object>,
      default: null,
    },
  },
  data() {
    return {
      selectedScreen: null as string | null,
    };
  },
  computed: {
    sizes() {
      return [
        { value: null, title: this.$t("global.commons.default") },
        { value: "sm", title: "sm", icon: "smartphone" },
        { value: "md", title: "md", icon: "tablet_mac" },
        { value: "lg", title: "lg", icon: "laptop" },
        { value: "xl", title: "xl", icon: "monitor" },
        { value: "xxl", title: "xxl", icon: "tv" },
      ];
    },

    currentValue(): string | number | object | null {
      switch (this.selectedScreen) {
        case "sm":
          return this.smValue;
        case "md":
          return this.mdValue;
        case "lg":
          return this.lgValue;
        case "xl":
          return this.xlValue;
        case "xxl":
          return this.xxlValue;
        default:
          return this.modelValue;
      }
    },

    currentDefaultValue(): string | number | object | null {
      return this.responsive && !this.isValidSize(this.defaultValue)
        ? this.modelValue
        : this.defaultValue;
    },
  },
  methods: {
    isValidSize(size: any) {
      size !== undefined &&
        size !== null &&
        !["auto", "unset", "0", 0].includes(size);
    },

    setValue(value: string | number | object | null) {
      switch (this.selectedScreen) {
        case "sm":
          this.$emit("update:smValue", value);
          break;
        case "md":
          this.$emit("update:mdValue", value);
          break;
        case "lg":
          this.$emit("update:lgValue", value);
          break;
        case "xl":
          this.$emit("update:xlValue", value);
          break;
        case "xxl":
          this.$emit("update:xxlValue", value);
          break;
        default:
          this.$emit("update:modelValue", value);
      }
    },
    selectScreen(size: string | null) {
      this.selectedScreen = size;
    },
  },
});
