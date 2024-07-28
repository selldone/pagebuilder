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
  <v-row
    v-styler:buttons-row="{ target: object }"
    :align="object.data ? object.data.align : 'center'"
    :justify="object.data ? object.data.justify : 'space-around'"
    class="x--buttons"
    no-gutters
    :class="[object.classes, { 'is-editable': $builder.isEditing }]"
    :style="[object.style, background_style]"
  >
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
      You can add buttons here...
    </v-col>
    <!-- Only addable cna remove col-->
    <x-button
      v-for="(child, index) in object.children"
      :key="`${index}-${object.children.length}`"
      :augment="augment"
      :object="child"
      :removeChild="
        () => {
          object.children.splice(index, 1);
        }
      "
      class="ma-2"
    >
    </x-button>
  </v-row>
</template>

<script>
import XButton from "../../../components/x/button/XButton.vue";
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "../../../mixins/x-component/LMixinXComponent";
import { defineComponent } from "vue";
import { XButtonsObject } from "@selldone/page-builder/components/x/buttons/XButtonsObject.ts";

export default defineComponent({
  name: "XButtons",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],
  components: { XButton },
  props: {
    object: {
      type: XButtonsObject,
      required: true,
    },
    augment: {
      // Extra information to show to dynamic show in page content
    },
  },
  computed: {
    buttons() {
      // New version:
      if (this.object instanceof XButtonsObject) {
        return this.object.children;
      }
      console.error("❗Old buttons version!");
      return [];
    },
  },

  created() {
    //console.log("XButtons created | Object: ", this.object);
    // New version:
    if (this.object instanceof XButtonsObject) {
      return;
    }
    console.error(
      "❗Old buttons version! Please migrate to new version.",
      this.object,
    );
  },
});
</script>

<style scoped>
.x--buttons {
  text-align: start;
}
</style>
