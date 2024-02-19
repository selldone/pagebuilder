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
  <!--  ▛▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ CALL TO ACTION PATTERN ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▜ -->
  <!-- Start Buttons group -->
  <v-row
    class="x--buttons"
    no-gutters
    v-styler:buttons-row="{ target: object }"
    :align="object.btn_row ? object.btn_row.align : 'center'"
    :justify="object.btn_row ? object.btn_row.justify : 'space-around'"
  >
    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Placeholder ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->

    <div
      v-if="SHOW_EDIT_TOOLS && !object.buttons?.length"
      style="
        min-height: 48px;
        opacity: 0.5;
        text-align: center;
        text-transform: uppercase;
        display: flex;
        align-items: center;
      "
    >
      <v-icon class="me-1">library_add</v-icon>
      You can add buttons here...
    </div>
    <!-- Only addable cna remove col-->

    <x-button
      v-for="(col, index) in object.buttons"
      :key="`${index}-${object.buttons.length}`"
      v-styler:button="{
        target: col,
        remove: () => {
          object.buttons.splice(index, 1);
        },
      }"
      :btn-data="col"
      class="m-2"
      :editing="$builder.isEditing"
      :augment="augment"
    >
    </x-button>
  </v-row>
  <!-- End Buttons group -->
  <!-- ▙▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ CALL TO ACTION PATTERN ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▟ -->
</template>

<script>
import XButton from "@app-page-builder/sections/components/XButton.vue";
import StylerDirective from "@app-page-builder/styler/StylerDirective";
import XMixin from "@app-page-builder/mixins/XMixin";
import { defineComponent } from "vue";

export default defineComponent({
  name: "XButtons",
  directives: { styler: StylerDirective },
  mixins: [XMixin],
  components: { XButton },
  props: {
    object: { required: true },
    path: { required: true /*Required for v-styler*/ },
    augment: {
      // Extra information to show to dynamic show in page content
    },
  },
});
</script>

<style scoped>
.x--buttons {
  text-align: start;
}
</style>
