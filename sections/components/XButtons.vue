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
    class="text-center addable"
    no-gutters
    v-styler:buttons-row="object.btn_row"
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
      <v-icon class="me-1">library_add</v-icon> You can add buttons here...
    </div>
    <!-- Only addable cna remove col-->

    <custom-button
      v-for="(col, index) in object.buttons"
      :key="index"
      :index="index"
      v-styler:button="object.buttons[index]"
      :btnData="object.buttons[index]"
      class="m-2"
      :editing="$builder.isEditing"
      :augment="augment"
    >
    </custom-button>
  </v-row>
  <!-- End Buttons group -->
  <!-- ▙▉▉▉▉▉▉▉▉▉▉▉▚▚▚▚▚▚▚▚ CALL TO ACTION PATTERN ▚▚▚▚▚▚▚▚▉▉▉▉▉▉▉▉▉▉▉▟ -->
</template>

<script>
import CustomButton from "@app-page-builder/sections/components/CustomButton.vue";

export default {
  name: "XButtons",
  components: { CustomButton },
  props: {
    object: { required: true },
    path: { required: true /*Required for v-styler*/ },
    augment: {
      // Extra information to show to dynamic show in page content
    },
  },
};
</script>

<style scoped></style>
