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
<!-- ━━━━━━━━━━━━━━━━━━━━━━ X-Text ━━━━━━━━━━━━━━━━━━━━━━ -->

<template>
  <v-form
    v-styler:form="{
      target: object,
    }"
    :class="[object?.classes, { 'is-editable': is_editing }]"
    :style="[object?.style, backgroundStyle(object.background)]"
    validate-on="submit lazy"
    @submit.prevent="submit"
    class="x--form"
  >
    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Main Slot ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    <slot></slot>

    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Submit Button ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    <div
      v-if="button"
      :style="{
        textAlign: button.data.align,
      }"
    >
      <x-button
        v-styler:button="{
          target: button,
          hasAlign: true,
          noLink: true,
        }"
        :augment="augment"
        :object="button"
        :editing="SHOW_EDIT_TOOLS"
        type="submit"
      >
      </x-button>
    </div>
  </v-form>
</template>

<script>
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "../../../mixins/x-component/LMixinXComponent";
import { defineComponent } from "vue";
import { XFormObject } from "@selldone/page-builder/components/x/form/XFormObject.ts";
import XButton from "@selldone/page-builder/components/x/button/XButton.vue";

export default defineComponent({
  name: "XForm",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],

  components: { XButton },
  emits: ["update:object"],
  props: {
    object: { type: XFormObject, required: true },
    augment: {
      // Extra information to show to dynamic show in page content
      required: true,
    },
  },
  data: () => ({}),

  computed: {
    is_editing() {
      return this.$builder.isEditing;
    },

    button(){
      return this.object.getButton()
    }
  },
  watch: {},
  created() {},
  methods: {
    async submit(event) {
      this.loading = true;

      const results = await event;

      this.loading = false;

      alert(JSON.stringify(results, null, 2));
    },
  },
});
</script>

<style lang="scss" scoped>
.x--form{
  text-align: start;
}
</style>
