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
  <x-column
    :object="object"
    :removeChild="removeChild"
    cloneable
    has-custom-layout
  >
    <!-- ━━━━━━━━━━━━━━━━━━━━━━ Product ━━━━━━━━━━━━━━━━━━━━━━ -->
    <template v-if="layout === 'product' && product">
      <x-text
        v-model:object="title"
        :augment="augment"
        initial-type="h3"
        :initial-classes="['mb-2']"
      ></x-text>

      <x-product :object="product" :augment="augment"></x-product>
    </template>

    <!-- ━━━━━━━━━━━━━━━━━━━━━━ Collection ━━━━━━━━━━━━━━━━━━━━━━ -->
    <x-collection
      v-else-if="layout === 'collection' && collection"
      :object="collection"
      :augment="augment"
    >
    </x-collection>
    <!-- ━━━━━━━━━━━━━━━━━━━━━━ Custom ━━━━━━━━━━━━━━━━━━━━━━ -->
    <!--  <x-custom
         v-else-if="layout === 'custom'"
         :object="object"
         :augment="augment"
     >
     </x-custom>-->
    <!-- ━━━━━━━━━━━━━━━━━━━━━━ Normal ━━━━━━━━━━━━━━━━━━━━━━ -->

    <div v-else :class="layout_class" class="position-relative">
      <x-text
        v-if="
          title &&
          layout_class === 'x-layout-middle' &&
          (title?.value || SHOW_EDIT_TOOLS)
        "
        :initial-type="headerType"
        :initial-classes="['mb-3']"
        v-model:object="title"
        :augment="augment"
        class="--title"
      ></x-text>

      <x-uploader
        v-if="
          image &&
          !['x-layout-title-content', 'x-layout-content-title'].includes(
            layout_class,
          )
        "
        v-model:object="image"
        :augment="augment"
        :initialClasses="['mx-auto', 'my-2']"
        class="--image"
        contain
      />

      <div class="--contents">
        <x-text
          v-if="
            title &&
            layout_class !== 'x-layout-middle' &&
            (title.data?.value || SHOW_EDIT_TOOLS)
          "
          :initial-type="headerType"
          :initial-classes="['mb-3']"
          v-model:object="title"
          :augment="augment"
          class="--title"
        ></x-text>

        <x-text
          v-if="content && (content.data?.value || SHOW_EDIT_TOOLS)"
          initial-type="p"
          :initial-classes="[
            'mt-2',
            ...(initialClassesContent ? initialClassesContent : []),
          ]"
          v-model:object="content"
          :augment="augment"
          class="--content"
        ></x-text>

        <!-- ━━━━━━━━━━━━ Other Children ━━━━━━━━━━━━ -->
        <x-component
          v-for="(child, index) in other_children"
          :object="child"
          :augment="augment"
          :remove-child="() => object.children.splice(index, 1)"
        >
        </x-component>
      </div>
    </div>
    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Start Column Action Button ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    <div
      v-if="object.button"
      :style="{
        textAlign: object.button.data.align,
      }"
    >
      <x-button
        v-styler:button="{ target: object.button, hasAlign: true }"
        :augment="augment"
        :object="object.button"
        :editing="SHOW_EDIT_TOOLS"
        class="m-2"
      >
      </x-button>
    </div>
  </x-column>
</template>

<script>
import XButton from "../../../components/x/button/XButton.vue";
import { LUtilsClasses } from "../../../utils/classes/LUtilsClasses";
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "../../../mixins/x-component/LMixinXComponent";
import { defineAsyncComponent, defineComponent } from "vue";
import XUploader from "../../../components/x/uploader/XUploader.vue";
import XProduct from "@selldone/page-builder/components/x/product/XProduct.vue";
//import XCollection from "@selldone/page-builder/components/x/collection/XCollection.vue";
import XText from "@selldone/page-builder/components/x/text/XText.vue";
import XColumn from "@selldone/page-builder/components/x/column/XColumn.vue";
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";
import {
  XColumnImageTextObject,
  XColumnImageTextObjectTypes,
} from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObject";

// Asynchronously load components
const XCollection = defineAsyncComponent(
  () =>
    import("@selldone/page-builder/components/x/collection/XCollection.vue"),
);

export default defineComponent({
  name: "XColumnImageText",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],

  components: {
    XComponent,
    XColumn,
    XText,
    XCollection,
    XProduct,
    XUploader,
    XButton,
  },

  props: {
    object: { type: XColumnImageTextObject, required: true },
    initialColumnLayout: { default: "x-layout-normal" },
    initialClassesContent: {
      type: Array,
    },

    noActionButtons: { type: Boolean, default: false },
    headerType: { default: "h3" } /*Can be h1...h5*/,
    augment: {
      // Extra information to show to dynamic show in page content
    },
    removeChild: {
      // Used in v-styler
      type: Function,
    },
  },
  data: () => ({
    standard_classes: LUtilsClasses.StandardClasses(),

  }),

  computed: {
    layout(){
      return this.object.data.layout
    },
    layout_class() {
      return this.layout ? this.layout : "x-layout-normal";
    },

    title() {
      return this.object.findChildByLabel(
        XColumnImageTextObjectTypes.LABELS.TITLE,
      );
    },

    content() {
      return this.object.findChildByLabel(
        XColumnImageTextObjectTypes.LABELS.CONTENT,
      );
    },
    image() {
      return this.object.findChildByLabel(
        XColumnImageTextObjectTypes.LABELS.IMAGE,
      );
    },

    product() {
      return this.object.findChildByLabel(
        XColumnImageTextObjectTypes.LABELS.PRODUCT,
      );
    },
    collection() {
      return this.object.findChildByLabel(
        XColumnImageTextObjectTypes.LABELS.COLLECTION,
      );
    },

    other_children() {
      return this.object.children?.filter(
        (c) =>
          c !== this.title &&
          c !== this.content &&
          c !== this.image &&
          c !== this.product &&
          c !== this.collection,
      );
    },
  },
  watch: {

  },
  created() {
    if (!this.object.data.layout) {
      this.object.data.layout = this.initialColumnLayout;
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
  height: 100%;

  .--content {
    display: none;
  }

  .--title {
    position: absolute;
    top: 22px;
    left: 12px;
    right: 12px;
    z-index: 100;
  }
}

.x-layout-overlay-center {
  height: 100%;

  .--content {
    display: none;
  }

  .--title {
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
  height: 100%;

  .--content {
    display: none;
  }

  .--title {
    position: absolute;
    bottom: 22px;
    left: 12px;
    right: 12px;
    z-index: 100;
  }
}

.x-layout-image {
  .--content,
  .--title {
    display: none;
  }
}

// Column modes

.x-layout-reverse {
  display: flex;
  flex-direction: column-reverse;

  .--content,
  .--title {
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

    .--content,
    .--title {
      // Make sure fill width!
      margin-left: 0;
      margin-right: 0;
    }
  }
}
</style>
