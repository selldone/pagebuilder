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
    <div
      class="d-flex align-center single-line"
      @contextmenu.prevent="
        (ev) =>
          $emit('right-click', {
            activator: ev.target,
            parent: parent,
            object: object,
            section: section,
            icon,
            title,
          })
      "
    >
      <div @click="expanded = !expanded" class="pp overflow-hidden">
        <v-icon
          v-if="object.children?.length"
          class="me-1 t-all-400 usn"
          :class="{ 'rotate-90-s': !expanded }"
          >arrow_drop_down
        </v-icon>
        <v-icon class="me-1 usn">{{ icon }}</v-icon>

        <span
          :contenteditable="hasEditableTitle"
          @blur="(e) => (section.label = e.target.innerText)"
          v-text="title"
        >
        </span>
      </div>

      <v-btn
        size="x-small"
        :color="object.classes.length || has_custom_styles ? '#fff' : '#999'"
        class="ms-1 tnt usn"
        @click="showMasterDesignDialog()"
        :title="`Classes & Styles ${object.classes?.length ? ' [' + object.classes.join(', ') + ']' : ''}`"
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
        class="ms-1 flex-grow-0 usn"
      ></v-img>

      <div
        v-if="object.background.hasValue()"
        style="width: 18px; height: 18px; border-radius: 3px"
        class="ms-1"
        :style="background_style"
        title="Background"
      ></div>

      <v-chip
        v-if="object.label"
        size="x-small"
        class="ms-1 px-1 usn"
        label
        density="comfortable"
        title="Label | Can have different behaviour in its parent component."
        >{{ object.label }}
      </v-chip>

      <v-btn
        v-if="isSection"
        size="x-small"
        class="ms-1 usn"
        @click="setExpand(!expanded)"
        variant="plain"
        :title="expanded ? 'Collapse All' : 'Expand All'"
        min-width="20"
      >
        <v-icon>{{ expanded ? "unfold_more" : "unfold_less" }}</v-icon>
      </v-btn>
    </div>

    <v-expand-transition>
      <div
        v-if="
          (can_have_children ||
            object.children?.length) /*Force show children!*/ &&
          (expanded || !object.children?.length)
        "
      >
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
            <l-menu-left-hierarchy-item
              :parent="object"
              :object="element"
              :lock-scroll="lockScroll"
              class="ms-2"
              @right-click="(ev) => $emit('right-click', ev)"
            >
            </l-menu-left-hierarchy-item>
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
import ScrollHelper from "@selldone/core-js/utils/scroll/ScrollHelper.ts";
import { LUtilsComponents } from "@selldone/page-builder/utils/components/LUtilsComponents.ts";

export default {
  name: "LMenuLeftHierarchyItem",
  mixins: [LMixinEvents],

  components: {
    draggable,
    LMenuLeftHierarchyItem: self, // Directly referencing the component
  },
  emits: ["hover-in", "hover-out", "right-click"],
  props: {
    object: { type: LModelElement, required: true },
    parent: { type: LModelElement, required: false },
    hasEditableTitle: Boolean,
    section: {},
    lockScroll: Boolean,
  },
  data: () => ({
    dialog: false,
    callback: null,

    expanded: false,

    debouncedScrollToElement: null,
  }),

  computed: {
    has_classes() {
      return this.object.$element?.classList;
    },
    element_type() {
      return LUtilsComponents.ComponentToObject[this.object.component];
    },

    has_custom_styles() {
      return this.object.style && Object.keys(this.object.style).length;
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

    can_have_children() {
      return [
        "XButtons",
        "XColumn",
        "XColumnImageText",
        "XContainer",
        "XRow",
        "XSection",
        "XForm",
        "XGalleryExpandable",
        "XGalleryExpandableItem",
        "XSwiper",
      ].includes(this.object.component);
    },
    background_style() {
      return this.object.background?.generate(this.getShopImagePath);
    },
  },

  watch: {},
  created() {
    this.debouncedScrollToElement = debounce(this.scrollToElement, 500, {
      leading: true,
      trailing: false,
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

      if (!this.lockScroll) {
        this.debouncedScrollToElement();
      }
    },
    onHoverOut() {
      if (!this.has_classes) {
        // console.error('onHoverOut objects',this.object)
        return;
      }
      //  console.log('onHoverOut objects',this.object)
      this.object.$element?.classList.remove("element-focus-editing");
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
      ScrollHelper.scrollToElement(this.object.$element, 0, "smooth", true);
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
