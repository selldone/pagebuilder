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
    };
  },
  computed: {
    is_editing() {
      return this.$builder?.isEditing || !this.$builder;
    },

    component() {
      return this.object.component;
    },
    children() {
      return this.object.children;
    },
  },
  mounted() {
    this.initSortable();
  },
  updated() {
    this.$nextTick(() => {
      this.initSortable();
    });
  },
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
    },
  },
});
</script>

<style scoped lang="scss"></style>
