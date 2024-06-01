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
  <v-col :class="[calcGridClasses(object.grid)]" class="position-relative pa-0">
    <x-column
      :object="object"
      :removeColumn="removeColumn"
      cloneable
      has-custom-layout
      no-grid
    >
      <!-- ━━━━━━━━━━━━━━━━━━━━━━ Product ━━━━━━━━━━━━━━━━━━━━━━ -->
      <x-product
        v-if="selected_layout === 'product'"
        :object="object"
        :augment="augment"
      >
      </x-product>
      <!-- ━━━━━━━━━━━━━━━━━━━━━━ Collection ━━━━━━━━━━━━━━━━━━━━━━ -->
      <x-collection
        v-else-if="selected_layout === 'collection'"
        :object="object"
        :augment="augment"
      >
      </x-collection>
      <!-- ━━━━━━━━━━━━━━━━━━━━━━ Custom ━━━━━━━━━━━━━━━━━━━━━━ -->
      <!--  <x-custom
           v-else-if="selected_layout === 'custom'"
           :object="object"
           :augment="augment"
       >
       </x-custom>-->
      <!-- ━━━━━━━━━━━━━━━━━━━━━━ Normal ━━━━━━━━━━━━━━━━━━━━━━ -->

      <div v-else :class="layout_class" class="position-relative">
        <h3
          v-if="
            layout_class === 'x-layout-middle' &&
            (object.title || SHOW_EDIT_TOOLS)
          "
          v-styler:text="{ target: object, keyText: 'title' }"
          class="mb-3"
          v-html="object.title?.applyAugment(augment, $builder.isEditing)"
        />

        <x-uploader
          v-if="
            !['x-layout-title-content', 'x-layout-content-title'].includes(
              layout_class,
            )
          "
          v-model="object.image"
          :augment="augment"
          :initialClasses="['mx-auto', 'my-2']"
          class="--image"
          contain
        />

        <div class="--contents">
          <component
            :is="headerType"
            v-if="
              layout_class !== 'x-layout-middle' &&
              (object.title || SHOW_EDIT_TOOLS)
            "
            v-styler:text="{ target: object, keyText: 'title' }"
            class="mb-3"
            v-html="object.title?.applyAugment(augment, $builder.isEditing)"
          />

          <p
            v-if="object.content || SHOW_EDIT_TOOLS"
            v-styler:text="{ target: object, keyText: 'content' }"
            :class="contentClass"
            class="mt-2"
            v-html="object.content?.applyAugment(augment, $builder.isEditing)"
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
        <x-button
          v-if="object.button"
          v-styler:button="{ target: object.button, hasAlign: true }"
          :augment="augment"
          :btn-data="object.button"
          :editing="SHOW_EDIT_TOOLS"
          class="m-2"
        >
        </x-button>
      </div>
    </x-column>
  </v-col>
</template>

<script>
import XButton from "../../../components/x/button/XButton.vue";
import { LUtilsClasses } from "../../../utils/classes/LUtilsClasses";
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "../../../mixins/x-component/LMixinXComponent";
import { defineComponent } from "vue";
import XUploader from "../../../components/x/uploader/XUploader.vue";
import XProduct from "@selldone/page-builder/components/x/product/XProduct.vue";
import XCollection from "@selldone/page-builder/components/x/collection/XCollection.vue";

export default defineComponent({
  name: "XColumnImageText",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],

  components: { XCollection, XProduct, XUploader, XButton },

  props: {
    object: { required: true },
    initialColumnLayout: { default: "x-layout-normal" },
    contentClass: {
      /*Permanent class for content*/
    },

    noActionButtons: { type: Boolean, default: false },
    headerType: { default: "h3" } /*Can be h1...h5*/,
    augment: {
      // Extra information to show to dynamic show in page content
    },
    removeColumn: {
      // Used in v-styler
      type: Function,
    },
  },
  data: () => ({
    standard_classes: LUtilsClasses.StandardClasses(),

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
});
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
