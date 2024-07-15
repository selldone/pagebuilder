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
  <div
    class="l--settings-hierarchy-item py-1 my-1 border-start ps-1"
    @mouseenter="onHoverIn"
    @mouseleave="onHoverOut"
  >
    <div class="d-flex align-center single-line">
      <div @click="expanded = !expanded" class="pp overflow-hidden">
        <v-icon
          v-if="object.children?.length"
          class="me-1 t-all-400"
          :class="{ 'rotate-90-s': !expanded }"
          >arrow_drop_down
        </v-icon>
        <v-icon class="me-1">{{ icon }}</v-icon>

        <span
          :contenteditable="hasEditableTitle"
          @blur="(e) => (section.label = e.target.innerText)"
          v-text="title"
        >
        </span>
      </div>

      <v-btn
        v-if="object.classes && has_classes"
        size="x-small"
        :color="
          object.classes.length ||
          (object.style && Object.keys(object.style).length)
            ? '#fff'
            : '#999'
        "
        class="ms-1 tnt"
        @click="showMasterDesignDialog()"
        title="Classes & Styles"
        min-width="20"
        variant="text"
      >
        <v-icon>architecture</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      <v-img
        v-if="object.data.src"
        :src="getShopImagePath(object.data.src)"
        width="20"
        height="20"
        rounded="sm"
        class="ms-1 flex-grow-0"
      ></v-img>

      <v-chip
        v-if="object.label"
        size="x-small"
        class="ms-1 px-1"
        label
        density="comfortable"
        >{{ object.label }}
      </v-chip>

      <v-btn
        v-if="isSection"
        size="x-small"
        class="ms-1"
        @click="setExpand(!expanded)"
        variant="plain"
        :title="expanded ? 'Collapse All' : 'Expand All'"
        min-width="20"
      >
        <v-icon>{{ expanded ? "unfold_more" : "unfold_less" }}</v-icon>
      </v-btn>
    </div>

    <v-expand-transition>
      <div v-if="expanded">
        <draggable
          v-model="object.children"
          tag="div"
          animation="200"
          ghostClass="bg-primary"
          :group="{
            name: 'hierarchy-children' /*Make it possible to drag and drop element in other sections*/,
          }"
        >
          <template v-slot:item="{ element }">
            <l-settings-hierarchy-item
              :object="element"
              :lock-scroll="lockScroll"
              class="ms-2"
            >
            </l-settings-hierarchy-item>
          </template>
        </draggable>
      </div>
    </v-expand-transition>
  </div>
</template>

<script lang="ts">
import { LModelElement } from "@selldone/page-builder/models/element/LModelElement.ts";
import { LMixinEvents } from "@selldone/page-builder/mixins/events/LMixinEvents.ts";
import draggable from "vuedraggable";
import debounce from "lodash-es/debounce";
import { XDivObject } from "@selldone/page-builder/components/x/div/XDivObject.ts";
import { XSectionObject } from "@selldone/page-builder/components/x/section/XSectionObject.ts";
import { XContainerObject } from "@selldone/page-builder/components/x/container/XContainerObject.ts";
import { XRowObject } from "@selldone/page-builder/components/x/row/XRowObject.ts";
import { XColumnObject } from "@selldone/page-builder/components/x/column/XColumnObject.ts";
import { XTextObject } from "@selldone/page-builder/components/x/text/XTextObject.ts";
import { XUploaderObject } from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";
import { XButtonObject } from "@selldone/page-builder/components/x/button/XButtonObject.ts";
import { XProductObject } from "@selldone/page-builder/components/x/product/XProductObject.ts";
import { XColumnImageTextObject } from "@selldone/page-builder/components/x/column-image-text/XColumnImageTextObject.ts";
import { XButtonsObject } from "@selldone/page-builder/components/x/buttons/XButtonsObject.ts";
import { XGalleryExpandableObject } from "@selldone/page-builder/components/x/gallery-expandable/XGalleryExpandableObject.ts";
import { XGalleryExpandableItemObject } from "@selldone/page-builder/components/x/gallery-expandable/item/XGalleryExpandableItemObject.ts";
import { XSwiperObject } from "@selldone/page-builder/components/x/swiper/XSwiperObject.ts";
import { XArticleObject } from "@selldone/page-builder/components/x/article/XArticleObject.ts";
import { XCodeObject } from "@selldone/page-builder/components/x/code/XCodeObject.ts";
import { XFeederBlogsObject } from "@selldone/page-builder/components/x/feeder/blogs/XFeederBlogsObject.ts";
import { XFeederProductsObject } from "@selldone/page-builder/components/x/feeder/products/XFeederProductsObject.ts";
import { XFormObject } from "@selldone/page-builder/components/x/form/XFormObject.ts";
import { XInputTextObject } from "@selldone/page-builder/components/x/input/text/XInputTextObject.ts";
import { XLottieObject } from "@selldone/page-builder/components/x/lottie/XLottieObject.ts";
import { XMarqueeObject } from "@selldone/page-builder/components/x/marquee/XMarqueeObject.ts";
import { XSearchObject } from "@selldone/page-builder/components/x/search/XSearchObject.ts";
import { XVideoBackgroundObject } from "@selldone/page-builder/components/x/video-background/XVideoBackgroundObject.ts";

export default {
  name: "LSettingsHierarchyItem",
  mixins: [LMixinEvents],

  components: {
    draggable,
    LSettingsHierarchyItem: () => import("./LSettingsHierarchyItem.vue"),
  },
  emits: ["hover-in", "hover-out"],
  props: {
    object: { type: LModelElement, required: true },
    hasEditableTitle: Boolean,
    section: {},
    lockScroll: Boolean,
  },
  data: () => ({
    dialog: false,
    callback: null,

    expanded: false,

    ElementTypes: {
      XSection: XSectionObject,
      XContainer: XContainerObject,
      XRow: XRowObject,
      XColumn: XColumnObject,
      XText: XTextObject,
      XUploader: XUploaderObject,
      XButton: XButtonObject,
      XProduct: XProductObject,
      XColumnImageText: XColumnImageTextObject,
      XButtons: XButtonsObject,
      XGalleryExpandable: XGalleryExpandableObject,
      XGalleryExpandableItem: XGalleryExpandableItemObject,
      XSwiper: XSwiperObject,
      XArticle: XArticleObject,
      XCode: XCodeObject,
      XDiv: XDivObject,
      XFeederBlogs: XFeederBlogsObject,
      XFeederProducts: XFeederProductsObject,
      XForm: XFormObject,
      XInputText: XInputTextObject,
      XLottie: XLottieObject,
      XMarquee: XMarqueeObject,
      XSearch: XSearchObject,
      XVideoBackground: XVideoBackgroundObject,
    },

    debouncedScrollToElement: null,
  }),

  computed: {
    has_classes() {
      return this.object.$element?.classList;
    },
    element_type() {
      return this.ElementTypes[this.object.component];
    },

    icon() {
      return this.element_type?.Info?.icon || "highlight_alt";
    },
    title() {
      if (this.section && this.hasEditableTitle) {
        return this.section.label;
      }
      return this.element_type?.Info?.title || this.object.component;
    },
    isSection() {
      return this.object.component === "XSection";
    },
  },

  watch: {},
  created() {
    this.debouncedScrollToElement = debounce(this.scrollToElement, 300, {
      leading: true,
      trailing: true,
    });
  },
  mounted() {
    // Add method to object as temporary variable:
    this.object.__setExpand = this.setExpand;
  },

  methods: {
    onHoverIn() {
      if (!this.has_classes) {
        //  console.error('onHoverIn objects',this.object)
        return;
      }
      // Remove all 'element-focus-editing' classes from elements
      $(".element-focus-editing").removeClass("element-focus-editing");
      //    console.log('onHoverIn objects',this.object)
      this.object.$element?.classList.add("element-focus-editing");
    },
    onHoverOut() {
      if (!this.has_classes) {
        // console.error('onHoverOut objects',this.object)
        return;
      }
      //  console.log('onHoverOut objects',this.object)
      this.object.$element?.classList.remove("element-focus-editing");

      if (!this.lockScroll) {
        this.debouncedScrollToElement();
      }
    },

    showMasterDesignDialog() {
      const el = this.object.$element;
      console.log("showMasterDesignDialog > Element", el);
      this.ShowLSettingsClassStyle(
        el,
        el,
        this.object,

        null,

        //   { noSize:this.type === "container" } // Not show size ! conflict with container size!
      );
    },

    scrollToElement() {
      this.object.$element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    },

    /**
     * IMPORTANT! This method will be called externally from LSettingsHierarchy
     * @param expanded
     */
    async setExpand(expanded: boolean) {
      this.expanded = expanded;
      // Add 200ms wait:
      await new Promise((resolve) => setTimeout(resolve, 300));
      // Pass to its children:
      this.$nextTick(() => {
        this.object.children.forEach((item: LModelElement<any>) => {
          if (item.__setExpand) item.__setExpand(expanded);
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.l--settings-hierarchy-item {
  font-size: 0.7rem;
  //cursor: pointer;
  user-select: none;

  &:hover {
    border-width: 3px !important;
  }
}
</style>
