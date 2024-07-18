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
  <component
    v-if="object"
    :is="component"
    :object="object"
    :augment="augment"
    v-bind="object.props"
    ref="wrapper"
  >
    <!--  <div
      v-if="component === 'XSection'"
      class="absolute-top-center bg-white pa-2 z2"
    >
      🌞 NEW 🔽🔽
    </div>-->
    <!-- ━━━━━━━━━━━━ Children ━━━━━━━━━━━━ -->

    <x-component
      v-for="(child, index) in children"
      :object="child"
      :augment="augment"
      :remove-child="() => children.splice(index, 1)"
    >
    </x-component>

    <div
      v-if="has_drag"
      @mousedown="onMouseDown"
      style="
        position: absolute;
        left: 0;
        top: 0;
        background: #222;
        padding: 12px;
        z-index: 999;
      "
      draggable="false"
      class="usn"
      :style="{ cursor: isDragging ? 'grabbing' : 'grab' }"
    >
      <v-icon>open_with</v-icon>
    </div>
  </component>
  <div v-else-if="is_editing">
    <v-alert color="error">
      <v-icon>error</v-icon>
      <span>Component not found! Invalid {object}.</span>
    </v-alert>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { LModelElement } from "@selldone/page-builder/models/element/LModelElement";
import Sortable from "sortablejs";
import { LUtilsLoader } from "@selldone/page-builder/utils/loader/LUtilsLoader.ts";

export default defineComponent({
  name: "XComponent",
  inject: ["$builder"],
  props: {
    object: {
      type: LModelElement,
      required: true,
    },
    augment: {
      type: Object,
      default: () => ({}),
    },
    removeChild: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      sortable: null,

      isDragging: false,
      initialMouseX: 0,
      initialMouseY: 0,
      initialLeft: 0,
      initialTop: 0,
    };
  },
  computed: {
    is_editing() {
      return this.$builder?.isEditing;
    },

    component() {
      return this.object.component;
    },
    children() {
      return this.object.children;
    },

    has_drag() {
      return (
        this.is_editing && this.object.style.position === "absolute"
      );
    },
  },
  mounted() {
    this.initSortable();
  },
  updated() {},
  beforeUnmount() {
    try {
      this.sortable.destroy();
    } catch (e) {}
  },

  methods: {
    initSortable() {
      if (
        ![
          "XSection",
          "XContainer",
          "XRow",
          "XColumn",
          "XColumnImageText",
        ].includes(this.object.component)
      )
        return;

      try {
        const _self = this;

        const wrapper = this.$refs.wrapper;
        const wrapper_element = wrapper?.$el ? wrapper.$el : wrapper;

        if (!wrapper_element || !(wrapper_element instanceof HTMLElement)) {
          return;
        }

        console.log(
          "Wrapper element of the default slot ===== wrapper =====>",
          wrapper_element,
        );

        this.sortable = Sortable.create(wrapper_element, {
          group: {
            name: "artboard",
            put: "elements-group",
          },
          ghostClass: "element-ghost",
          animation: 150,
          scroll: true,
          scrollSpeed: 10,
          sort: false,
          disabled: false,
          preventOnFilter: false,
          //easing: "cubic-bezier(1, 0, 0, 1)",
          removeCloneOnHide: true,

          //filter: ".ignore-elements",

          onAdd(evt) {
            try {
              const seed = evt.item._dragData;
              // console.log("Drop element", seed, "Event item", evt.item);

              if (seed) {
                const instance = LUtilsLoader.JsonObjectToInstance(
                  JSON.parse(seed),
                );

                _self.object.addChild(instance, evt.newIndex);
              } else {
                console.error("Seed data is not attached!");
              }

              evt.item.remove();
            } catch (e) {
              console.error("Error onAdd Element", e);
            }
          },
          onUpdate(evt) {
            _self.object.sort(evt.oldIndex, evt.newIndex);
            console.log("sortable : onUpdate");
          },
        });
      } catch (e) {
        console.error("Error initSortable", e);
      }
    },

    //----------------------------------------------------------------------------
    getScaleFactor() {
      const scale_down =
        this.$builder.isEditing &&
        (this.$builder.isSorting || this.$builder.showLeftMenu);
      return scale_down ? 0.5 : 1; // default scale
    },

    onMouseDown(event) {
      event.preventDefault();
      this.isDragging = true;
      this.initialMouseX = event.clientX;
      this.initialMouseY = event.clientY;
      this.initialLeft = parseFloat(this.object.style.left) || 0;
      this.initialTop = parseFloat(this.object.style.top) || 0;

      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseUp);
    },
    onMouseMove(event) {
      //console.log('mouse move')
      if (!this.isDragging) return;
      event.preventDefault();

      const scaleFactor = this.getScaleFactor();
      //console.log('scaleFactor',scaleFactor)

      const deltaX = (event.clientX - this.initialMouseX) / scaleFactor;
      const deltaY = (event.clientY - this.initialMouseY) / scaleFactor;

      this.object.style.left = `${this.initialLeft + deltaX}px`;
      this.object.style.top = `${this.initialTop + deltaY}px`;
    },
    onMouseUp() {
      this.isDragging = false;
      document.removeEventListener("mousemove", this.onMouseMove);
      document.removeEventListener("mouseup", this.onMouseUp);
    },
  },
});
</script>

<style lang="scss">
.element-ghost {
  background-color: #f89c14;
  opacity: 0.9;
  height: max-content;
  box-shadow: 0 0 8px 10px #bd6103;
  padding: 10px 20px;
  border-radius: 8px;
}
</style>
