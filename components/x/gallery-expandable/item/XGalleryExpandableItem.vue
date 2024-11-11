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
  <x-div
    :object="object"
    :class="{ 'run-mode': /*!$builder.isEditing*/ !$builder.isEditing }"
    class="x--gallery-expandable-item"
    clearable
  >
    <x-uploader
      v-if="image"
      :object="image"
      :augment="augment"

      class="g-image"
      cover
    >
    </x-uploader>

    <div class="g-content">
      <x-text
        v-if="title"
        :object="title"
        :augment="augment"
        initial-type="h3"
        class="g-title"
      ></x-text>

      <x-component
        v-for="child in others"
        :object="child"
        :augment="augment"
      ></x-component>

      <!-- ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Main Slot ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂-->
    </div>
  </x-div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import XUploader from "@selldone/page-builder/components/x/uploader/XUploader.vue";
import XText from "@selldone/page-builder/components/x/text/XText.vue";
import { XGalleryExpandableItemObject } from "@selldone/page-builder/components/x/gallery-expandable/item/XGalleryExpandableItemObject.ts";
import XComponent from "@selldone/page-builder/components/x/component/XComponent.vue";
import LMixinXComponent from "@selldone/page-builder/mixins/x-component/LMixinXComponent.ts";
import XDiv from "@selldone/page-builder/components/x/div/XDiv.vue";

export default defineComponent({
  name: "XGalleryExpandableItem",
  directives: {},
  mixins: [LMixinXComponent],
  components: { XDiv, XComponent, XText, XUploader },

  props: {
    object: {
      type: XGalleryExpandableItemObject,
      required: true,
    },
    augment: {},

    /**
     * Change the offset for the proper in nested columns to prevent overlap
     */
    nested: Boolean,
  },

  computed: {
    image() {
      return this.object.getImageChild();
    },
    title() {
      return this.object.getTitleChild();
    },
    others() {
      return this.object.children.filter(
        (child) => child !== this.image && child !== this.title,
      );
    },
  },

  created() {},

  methods: {},
});
</script>

<style scoped lang="scss">
.x--gallery-expandable-item {
  flex: 1;
  overflow: hidden;
  transition: 0.5s;
  margin: 0 2%;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
  position: relative;

  .g-image {
    overflow: hidden;
    width: 200%;
    height: calc(100%);
    object-fit: cover;
    transition: 0.5s;

  }

  .g-content {
    text-align: start;
    position: absolute;
    z-index: 10;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 10%;
    align-items: flex-start;
    justify-content: flex-start;
    line-height: normal;
    pointer-events: none;

    & > * {
      pointer-events: auto;
    }

    .g-title {
      margin-bottom: 12px;
    }
  }

  &.run-mode {
    &:hover {
      flex: 1 1 50% !important;

      .g-image {
        width: 100%;
        height: 100%;

      }
    }
  }
}
</style>
