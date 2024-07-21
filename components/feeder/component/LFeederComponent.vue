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
  <small class="ps-1">
    <v-icon class="me-1">{{ icon }}</v-icon>
    {{ title }}</small
  >

  <div class="border-start ms-1 hov-border">
    <template v-if="is_text">
      <s-setting-toggle
        v-model="object.data.tag"
        :items="['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div']"
        label="Tag"
        icon="code"
      ></s-setting-toggle>
      <s-setting-text-input
        clearable
        v-model="object.data.value"
        label="Title"
        icon="notes"
        multiple-lines
      >
      </s-setting-text-input>
      <l-augment-finder :model-value="object.data.value"></l-augment-finder>
    </template>

    <template v-if="is_image">
      <s-setting-group
        title="Image"
        icon="image"
        :image="object.data.src ? getShopImagePath(object.data.src) : undefined"
      >
        <template v-slot:title-action>
          <v-btn
            prepend-icon="whatshot"
            variant="outlined"
            size="small"
            @click="object.data.src = '{{key}}'"
          >
            Set Dynamic Source
          </v-btn>
        </template>
      </s-setting-group>

      <s-setting-text-input
        v-model="object.data.src"
        messages="You can input an image URL or a dynamic value like { { key } }. This dynamic value can even be part of a complete URL."
        has-lock
      ></s-setting-text-input>
    </template>

    <l-feeder-component v-for="child in object.children" :object="child">
    </l-feeder-component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LModelElement } from "@selldone/page-builder/models/element/LModelElement.ts";
import { XTextObject } from "@selldone/page-builder/components/x/text/XTextObject.ts";
import LAugmentFinder from "@selldone/page-builder/components/augment/finder/LAugmentFinder.vue";
import SSettingTextInput from "@selldone/page-builder/styler/settings/text-input/SSettingTextInput.vue";
import { XUploaderObject } from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import { LUtilsComponents } from "@selldone/page-builder/utils/components/LUtilsComponents.ts";
import SSettingToggle from "@selldone/page-builder/styler/settings/toggle/SSettingToggle.vue";

export default defineComponent({
  name: "LFeederComponent",
  inject: ["$builder"],
  components: {
    SSettingToggle,
    SSettingGroup,

    SSettingTextInput,
    LAugmentFinder,
    LFeederComponent: this,
  },
  props: {
    object: {
      type: LModelElement,
      required: true,
    },
  },
  computed: {
    element_type() {
      return LUtilsComponents.ComponentToObject[this.object.component];
    },

    icon() {
      return this.element_type?.Info?.icon || "highlight_alt";
    },
    title() {
      return this.element_type?.Info?.title || this.object.component;
    },

    is_text() {
      return this.object instanceof XTextObject;
    },
    is_image() {
      return this.object instanceof XUploaderObject;
    },

    uploadUrl() {
      return this.$builder.getImageUploadUrl();
    },
  },
});
</script>

<style scoped lang="scss">
.hov-border {
  border-color: #777 !important;

  &:hover {
    border-color: #fff !important;
  }
}
</style>
