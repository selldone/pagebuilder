<!--
  - Copyright (c) 2023-2024. Selldone® Business OS™
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
  <section
    :id="object.id"
    v-data-x="object.style"
    v-styler:section="sectionBinding"
    :class="[
      object.classes,
      { '-no-padding': noDefaultPadding, '-dark': object.background?.dark },
    ]"
    :style="[object.style, background_style]"
    class="section z0"
    placeholder="[Section] Drag & Drop.."
  >
    <!-- 📹 Background video -->
    <x-video-background
      v-if="object.background?.bg_video"
      :video="getVideoUrl(object.background.bg_video)"
    >
    </x-video-background>
    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Main Slot ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    <slot></slot>
  </section>
</template>

<script lang="ts">
import XVideoBackground from "../../../components/x/video-background/XVideoBackground.vue";
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "../../../mixins/x-component/LMixinXComponent";
import DataXDirective from "../../../directives/DataXDirective";
import { XSectionObject } from "@selldone/page-builder/components/x/section/XSectionObject.ts";
import { provide } from "vue";

export default {
  name: "XSection",
  directives: { styler: StylerDirective, "data-x": DataXDirective },
  mixins: [LMixinXComponent],
  components: { XVideoBackground },

  props: {
    object: { required: true, type: XSectionObject },
    noDefaultPadding: Boolean,
    section: { required: true, type: Object },
  },

  setup(props) {
    // Provide the section object to child components
    provide("$section", props.section);

    return {};
  },

  computed: {
    /**
     * 🐍 Use compute for better performance.
     * @return {{target: *}}
     */
    sectionBinding() {
      return { target: this.object };
    },
  },

  beforeCreate() {},

  created() {},

  methods: {
    getVideoUrl(file_name: string) {
      return window.CDN.GET_VIDEO_URL(file_name);
    },
  },
};
</script>

<style scoped lang="scss"></style>
