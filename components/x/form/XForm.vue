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
    :style="[object?.style, background_style]"
    validate-on="submit lazy"
    @submit.prevent="submit"
    class="x--form"
    ref="form"
  >
    <!-- ━━━━━━━━━━━━ Children ━━━━━━━━━━━━ -->
    <v-expand-transition>
      <div v-if="success" key="1" class="text-start">
        <h3 v-if="object.data.success?.title" class="mt-5 mb-3 px-3">
          {{ object.data.success?.title }}
        </h3>
        <div v-if="object.data.success?.message" class="mb-5 px-3">
          {{ object.data.success?.message }}
        </div>
      </div>
      <div v-else key="2">
        <x-component
          v-for="(child, index) in other_children"
          :object="child"
          :augment="augment"
          :remove-child="() => children.splice(index, 1)"
          v-model="params[child.data.name]"
        >
        </x-component>
      </div>
    </v-expand-transition>
    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Validation Errors ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    <div v-if="errors" class="text-start text-subtitle-2">
      <div v-for="e in errors" class="py-1">
        {{ e }}
      </div>
    </div>
    <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Submit Button ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    <v-expand-transition>
      <div
        v-if="button && !success"
        :style="{
          textAlign: button.data.align,
        }"
      >
        <x-button
          :augment="augment"
          :object="button"
          type="submit"
          :loading="busy"
          has-align
          no-link
        >
        </x-button>
      </div>
    </v-expand-transition>
  </v-form>
</template>

<script>
import StylerDirective from "../../../styler/StylerDirective";
import LMixinXComponent from "../../../mixins/x-component/LMixinXComponent";
import { defineComponent } from "vue";
import { XFormObject } from "@selldone/page-builder/components/x/form/XFormObject.ts";
import XButton from "@selldone/page-builder/components/x/button/XButton.vue";
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";
import { XFormObjectDataTypes } from "@selldone/page-builder/components/x/form/XFormObjectData.ts";

export default defineComponent({
  name: "XForm",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],

  components: { XComponent, XButton },
  emits: ["update:object"],
  props: {
    object: { type: XFormObject, required: true },
    augment: {
      // Extra information to show to dynamic show in page content
      required: true,
    },
  },
  data: () => ({
    params: {},
    busy: false,
    errors: null,
    success: false,
  }),

  computed: {
    is_editing() {
      return this.$builder.isEditing;
    },

    button() {
      return this.object.getButton();
    },

    children() {
      return this.object.children;
    },

    other_children() {
      return this.children.filter((child) => child !== this.button);
    },


    shop() {
      return this.getShop();
    },
  },
  watch: {},
  created() {},
  methods: {
    async submit(event) {
      if (this.is_editing) return;

      this.busy = true;
      this.errors = null;

      const results = await event;
      if (!results.valid) {
        this.errors = results.errors;
        this.busy = false;
        return;
      }

      //  alert(JSON.stringify(this.params, null, 2));

      (this.object.data.getMethod() === XFormObjectDataTypes.Methods.POST
        ? axios.post(
            this.object.data.getGeneratedUrl(this.shop),
            this.object.data.getGeneratedParams(this.params),
          )
        : axios.get(
            this.object.data.getGeneratedUrl(this.shop),
            this.object.data.getGeneratedParams(this.params),
          )
      )

        .then(({ data }) => {
          if (data.error) {
            console.error(data.error_msg);
            return;
          }
          this.success = true;

          if (
            this.object.data.success?.title ||
            this.object.data.success?.message
          ) {
            return this.showSuccessAlert(
              this.object.data.success.title,
              this.object.data.success.message,
            );
          }
        })
        .catch((error) => {
          console.error(error);

          this.showLaravelError(error);
        })
        .finally(() => {
          this.busy = false;
        });
    },
  },
});
</script>

<style lang="scss" scoped>
.x--form {
  text-align: start;
}
</style>
