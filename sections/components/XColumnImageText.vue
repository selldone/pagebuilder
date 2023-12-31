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
  <v-col
    :class="[calcGridClasses(object.grid)]"
    class="position-relative pa-0 addable"
  >
    <x-column :object="object" :path="path" clonable no-grid has-custom-layout>
      <div :class="layout_class" class="position-relative">
        <h3
          v-if="
            layout_class === 'x-layout-middle' &&
            (object.title || SHOW_EDIT_TOOLS)
          "
          v-styler="`${path}.title`"
          class="mb-3"
          v-html="object.title?.applyAugment(augment, $builder.isEditing)"
        />

        <uploader
          v-if="
            !['x-layout-title-content', 'x-layout-content-title'].includes(
              layout_class
            )
          "
          :path="`${path}.image`"
          :initialClasses="['mx-auto', 'my-2']"
          contain
          class="--image"
          :augment="augment"
        />

        <div class="--contents">
          <component
            :is="headerType"
            v-if="
              layout_class !== 'x-layout-middle' &&
              (object.title || SHOW_EDIT_TOOLS)
            "
            v-styler="`${path}.title`"
            class="mb-3"
            v-html="object.title?.applyAugment(augment, $builder.isEditing)"
          />

          <p
            v-if="object.content || SHOW_EDIT_TOOLS"
            v-styler="`${path}.content`"
            class="mt-2"
            v-html="object.content?.applyAugment(augment, $builder.isEditing)"
            :class="contentClass"
          />
        </div>
      </div>
      <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Start Column Action Button ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->

      <slot name="buttons"></slot>
      <div
        :style="{
          textAlign: object.button?.align,
        }"
      >
        <custom-button
          v-if="object.button"
          v-styler:button="`${path}.button`"
          :btn-data="object.button"
          class="m-2"
          has-align
          :editing="SHOW_EDIT_TOOLS"
          :augment="augment"
        >
        </custom-button>
      </div>
    </x-column>
  </v-col>
</template>

<script>
import CustomButton from "@app-page-builder/sections/components/CustomButton.vue";
import { ClassesHelper } from "@core/helper/style/Classes";

const LAYOUTS = [
  "x-layout-normal", // Column | Image + Title + Content
  "x-layout-overlay-top", // Image + Column of Title Content inside image
  "x-layout-overlay-center",
  "x-layout-overlay-bottom",
  "x-layout-image",
  "x-layout-reverse",
  "x-layout-row",
  "x-layout-row-reverse",
  "x-layout-middle", // Title Image Content
  "x-layout-title-content", //Title Content (no image)
  "x-layout-content-title", // Content Title (no image)
];
export default {
  name: "XColumnImageText",
  components: { CustomButton },

  props: {
    object: { required: true },
    path: { required: true },
    initialColumnLayout: { default: "x-layout-normal" },
    contentClass: {
      /*Permanent class for content*/
    },

    noActionButtons: { type: Boolean, default: false },
    headerType: { default: "h3" } /*Can be h1...h5*/,
    augment: {
      // Extra information to show to dynamic show in page content
    },
  },
  data: () => ({
    standard_classes: ClassesHelper.StandardClasses(),

    LAYOUTS: LAYOUTS,
    selected_layout: null,
  }),

  computed: {
    layout_class() {
      return this.selected_layout ? this.selected_layout : "x-layout-normal";
    },
  },
  watch: {
    "object.layout"(val) {
      if (val) this.selected_layout = val;
    },
  },
  created() {
    if (!this.object.layout) {
      this.object.layout = this.initialColumnLayout;
      this.selected_layout = this.initialColumnLayout;
    } else {
      this.selected_layout = this.object.layout;
    }
  },
  methods: {},
};
</script>

<style lang="scss">
.x-layout-normal,
.x-layout-middle {
}
.x-layout-overlay-top {
  p {
    display: none;
  }
  h3 {
    position: absolute;
    top: 22px;
    left: 12px;
    right: 12px;
    z-index: 100;
  }
}
.x-layout-overlay-center {
  p {
    display: none;
  }
  h3 {
    position: absolute;
    right: 12px;
    z-index: 100;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 85%;
  }
}

.x-layout-overlay-bottom {
  p {
    display: none;
  }
  h3 {
    position: absolute;
    bottom: 22px;
    left: 12px;
    right: 12px;
    z-index: 100;
  }
}
.x-layout-image {
  p,
  h3 {
    display: none;
  }
}

// Column modes

.x-layout-reverse {
  display: flex;
  flex-direction: column-reverse;
  p,
  h3 {
    margin-left: 0;
    margin-right: 0;
  }
}

// Row modes
.x-layout-row,
.x-layout-row-reverse {
  display: flex;

  .--contents {
    flex-grow: 1;
    padding: 0 8px;
  }
  .--image {
    max-width: 50% !important; // Prevent exceed image size!
  }
}
.x-layout-row {
  flex-direction: row;
}
.x-layout-row-reverse {
  flex-direction: row-reverse;
}
.x-layout-title-content {
}
.x-layout-content-title {
  .--contents {
    display: flex;
    flex-direction: column-reverse;
    align-items: stretch;
    p,
    h3 {
      // Make sure fill width!
      margin-left: 0;
      margin-right: 0;
    }
  }
}
</style>
