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
  <v-col
    class="x--column pa-0 d-flex flex-column"
    v-data-x="object.style"
    v-styler:column="{
      target: object,
      hasCustomLayout: true,
      removeChild: removeChild,
      position: 'right-bottom',
    }"
    :cloneable="true"
    @click="
      $builder.isEditing ? $builder.onClickClone($event, object) : undefined
    "
    :class="[
      grid_class,
      {
        'is-editable': $builder.isEditing,
        'position-relative': object.background?.bg_video,
      },
    ]"
  >
    <div
      class="flex-grow-1"
      :class="[object.classes, contentClass]"
      :style="[object.style, background_style]"
    >
      <!-- 📹 Background video -->
      <x-video-background
        v-if="object.background?.bg_video"
        :video="getVideoUrl(object.background.bg_video)"
      >
      </x-video-background>

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
      <template v-else-if="layout === 'collection' && collection">
        <x-component
          v-for="(child, index) in other_children_collection_layout"
          :object="child"
          :augment="augment"
          :remove-child="() => object.children.splice(index, 1)"
        >
        </x-component>
      </template>

      <!-- ━━━━━━━━━━━━━━━━━━━━━━ Normal ━━━━━━━━━━━━━━━━━━━━━━ -->

      <div v-else :class="layout_class" class="position-relative">
        <x-text
          v-if="
            title &&
            layout_class === 'x-layout-middle' &&
            (title?.data?.value || SHOW_EDIT_TOOLS)
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
          :class="{ '--override-max-width': image.style.maxWidth !== '100%' }"
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
            v-for="(child, index) in other_children_normal_layouts"
            :object="child"
            :augment="augment"
            :remove-child="() => object.children.splice(index, 1)"
          >
          </x-component>
        </div>
      </div>

      <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Start Column Action Button ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
      <div
        v-if="button"
        :style="{
          textAlign: button.data.align,
        }"
      >
        <x-button
          :augment="augment"
          :object="button"
          :editing="SHOW_EDIT_TOOLS"
          has-align
        >
        </x-button>
      </div>

      <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Placeholder ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
      <v-col
        cols="12"
        v-if="SHOW_EDIT_TOOLS && !object.children?.length"
        style="
          min-height: 48px;
          opacity: 0.5;
          text-align: center;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <v-icon class="me-1">library_add</v-icon>
        You can add elements here...
      </v-col>
    </div>
  </v-col>
</template>

<script lang="ts">
import XButton from "../../../components/x/button/XButton.vue";
import { LUtilsClasses } from "../../../utils/classes/LUtilsClasses";
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "../../../mixins/x-component/LMixinXComponent";
import { defineComponent } from "vue";
import XUploader from "../../../components/x/uploader/XUploader.vue";
import XProduct from "@selldone/page-builder/components/x/product/XProduct.vue";
import XText from "@selldone/page-builder/components/x/text/XText.vue";
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";
import { XColumnImageTextObject } from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObject";
import { XColumnImageTextDataTypes } from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObjectData.ts";
import XVideoBackground from "@selldone/page-builder/components/x/video-background/XVideoBackground.vue";
import DataXDirective from "@selldone/page-builder/directives/DataXDirective.ts";
import { Grid } from "@selldone/page-builder/src/types/types.ts";

export default defineComponent({
  name: "XColumnImageText",
  directives: { styler: StylerDirective, "data-x": DataXDirective },
  mixins: [LMixinXComponent],

  components: {
    XVideoBackground,
    XComponent,
    XText,
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
    contentClass: {},
  },
  data: () => ({
    standard_classes: LUtilsClasses.StandardClasses(),
  }),

  computed: {
    grid_class() {
      const grid = this.object.data?.grid;
      return (Object.keys(grid ? grid : {}) as (keyof Grid)[]).map((device) => {
        if (!grid[device]) {
          return "";
        }
        const prefix = this.$builder.columnsPrefix[device];
        return `${prefix}${grid[device]}`;
      });
    },

    layout() {
      return this.object.data.layout;
    },
    layout_class() {
      return this.layout ? this.layout : "x-layout-normal";
    },

    title() {
      return this.object.getTitleChild();
    },

    content() {
      return this.object.getContentChild();
    },
    image() {
      return this.object.getImageChild();
    },

    product() {
      return this.object.getProductChild();
    },
    collection() {
      return this.object.getCollectionChild();
    },

    button() {
      return this.object.getActionChild();
    },

    other_children_normal_layouts() {
      return this.object.children?.filter(
        (c) =>
          c !== this.title &&
          c !== this.content &&
          c !== this.image &&
          c !== this.product &&
          c !== this.collection &&
          c !== this.button,
      );
    },

    other_children_collection_layout() {
      return this.object.children?.filter((c) => c !== this.button);
    },
  },
  watch: {
    layout() {
      // Auto config layout:
      if (this.layout === XColumnImageTextDataTypes.LAYOUTS.PRODUCT) {
        this.object.getTitleChild(true);
        this.object.getProductChild(true);
        this.object.removeChild(this.content);
        this.object.removeChild(this.collection);
        this.object.removeChild(this.image);
      } else if (this.layout === XColumnImageTextDataTypes.LAYOUTS.COLLECTION) {
        this.object.getTitleChild(true);
        this.object.getCollectionChild(true);
        this.object.removeChild(this.content);
        this.object.removeChild(this.product);
        this.object.removeChild(this.image);
      }

      if (
        [
          XColumnImageTextDataTypes.LAYOUTS.NORMAL,

          XColumnImageTextDataTypes.LAYOUTS.REVERSE,
          XColumnImageTextDataTypes.LAYOUTS.ROW,
          XColumnImageTextDataTypes.LAYOUTS.ROW_REVERSE,
          XColumnImageTextDataTypes.LAYOUTS.MIDDLE,
        ].includes(this.layout)
      ) {
        this.object.getImageChild(true);
        this.object.getTitleChild(true);
        this.object.getContentChild(true);
        this.object.removeChild(this.collection);
        this.object.removeChild(this.product);
      }

      if (
        [
          XColumnImageTextDataTypes.LAYOUTS.OVERLAY_TOP,
          XColumnImageTextDataTypes.LAYOUTS.OVERLAY_CENTER,
          XColumnImageTextDataTypes.LAYOUTS.OVERLAY_BOTTOM,
        ].includes(this.layout)
      ) {
        this.object.getImageChild(true);
        this.object.getTitleChild(true);

        this.object.removeChild(this.content);
        this.object.removeChild(this.collection);
        this.object.removeChild(this.product);
      }

      if ([XColumnImageTextDataTypes.LAYOUTS.IMAGE].includes(this.layout)) {
        this.object.getImageChild(true);
      }

      if (
        [
          XColumnImageTextDataTypes.LAYOUTS.TITLE_CENTER,
          XColumnImageTextDataTypes.LAYOUTS.CONTENT_TITLE,
        ].includes(this.layout)
      ) {
        this.object.getTitleChild(true);
        this.object.getContentChild(true);

        this.object.removeChild(this.image);
        this.object.removeChild(this.collection);
        this.object.removeChild(this.product);
      }
    },
  },
  created() {
    if (!this.object.data.layout) {
      this.object.data.layout = this.initialColumnLayout;
    }
  },
  methods: {
    getVideoUrl(file_name: string) {
      return window.CDN.GET_VIDEO_URL(file_name);
    },
    /* copyStyle(event) {
       console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXX", event);
       this.$builder.onClickClone(event, this.object);
     },*/
  },
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
    &:not(.--override-max-width) {
      max-width: 50% !important; // Prevent exceed image size!
    }
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
