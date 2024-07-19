/*
 * Copyright (c) 2023-2024. Selldone® Business OS™
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

import {defineComponent, inject, provide} from "vue";
import {Section} from "../../src/section/section";
import Builder from "../../Builder.ts";

const DEBUG = false;

/**
 * @deprecated
 */
interface DataProps {
  $builder: Builder | null; // Replace 'any' with the actual type of $builder
  $section: Section | null;
}

const LMixinSection = defineComponent({
  props: {
    // sectionData: {}, // Old version
    //  sectionObject: {}, // 🪵 New version
    section: {
      type: Section,
      required: true,
    },
    augment: {
      // Extra information to show to dynamic show in page content
    },
  },
  data(): DataProps {
    return {
      $builder: null,
      $section: null,
    };
  },

  beforeCreate() {
    // Get builder from main page editor/viewer
    this.$builder = inject("$builder");

    // Find corresponding section by id
    this.$section = this.$props.section;

    // Provide section to all children
    provide("$section", this.$section);

    LOG(`ID: ${this.$props.id} `, "$section", this.$section ? "✅" : "❌");
  },

  updated() {
    /*try {
              Array.from(this.$el.querySelectorAll("[contentEditable]")).forEach(
                (el: any) => {
                  el.contentEditable = this.$builder.isEditing;
                },
              );
            } catch (e) {
              console.error("updated | section", e, this);
            }*/
  },

  computed: {
    SHOW_EDIT_TOOLS() {
      return this.$builder.isEditing && !this.$builder.isHideExtra;
    },
  },

  watch: {},

  created() {},

  methods: {},
});

export default LMixinSection;

function LOG(...text: any) {
  if (DEBUG) console.log("🪷 SectionMixin", ...text);
}
