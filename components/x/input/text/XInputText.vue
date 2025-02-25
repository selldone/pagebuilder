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

  <v-text-field
    v-styler:input="{ target: object }"
    :model-value="modelValue"
    @update:model-value="(v) => $emit('update:modelValue', v)"
    :bg-color="object.data.backgroundColor ?? undefined"
    :color="object.data.color ?? undefined"
    :flat="object.data.flat"
    :hint="object.data.hint ?? undefined"
    :label="object.data.label ?? undefined"
    :messages="object.data.messages ? object.data.messages : undefined"
    :persistent-placeholder="object.data.persistentPlaceholder ?? false"
    :single-line="object.data.singleLine ?? false"
    :hide-details="object.data.hideDetails??false"
    :placeholder="object.data.placeholder ?? undefined"
    :rounded="object.data.rounded"
    :rules="[
      /*GlobalRules.email(), GlobalRules.required()*/
    ]"
    :variant="object.data.variant ?? undefined"
    :prepend-icon="object.data.prependIcon ?? undefined"
    :prepend-inner-icon="object.data.prependInnerIcon ?? undefined"
    :append-icon="object.data.appendIcon ?? undefined"
    :append-inner-icon="object.data.appendInnerIcon ?? undefined"
    :error-messages="
      !object.data.name
        ? ['⛔ Please set a param name for the input in the input settings.']
        : undefined
    "
    class="x--input-text"
    :class="[object.classes, { 'is-editable': $builder.isEditing }]"
    :style="[object.style, background_style]"
  ></v-text-field>
</template>

<script lang="ts">
import StylerDirective from "../../../../styler/StylerDirective.ts";
import LMixinXComponent from "../../../../mixins/x-component/LMixinXComponent.ts";
import { defineComponent } from "vue";
import { XInputTextObject } from "@selldone/page-builder/components/x/input/text/XInputTextObject.ts";

export default defineComponent({
  name: "XInputText",
  directives: { styler: StylerDirective },
  mixins: [LMixinXComponent],

  components: {},
  emits: ["update:object", "update:modelValue"],
  props: {
    object: { type: XInputTextObject, required: true },
    augment: {
      // Extra information to show to dynamic show in page content
      required: true,
    },

    modelValue: {},
  },
  data: () => ({}),

  computed: {
    is_editing() {
      return this.$builder.isEditing;
    },
  },
  watch: {},
  created() {},
  methods: {},
});
</script>

<style lang="scss" scoped>
.x--input-text {
}
</style>
