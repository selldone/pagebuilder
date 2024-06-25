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
  <s-box-sides
    :selected="position"
    class="my-4"
    bg-color="#000"
    @click:side="$emit('click:area', 'position')"
    height="180"
    height-percent="13%"
    rounded="lg"
    label="Position"
    style="border: dashed thin #eee"
    :top-label="modelValue.top ? modelValue.top : '-'"
    :bottom-label="modelValue.bottom ? modelValue.bottom : '-'"
    :left-label="modelValue.left ? modelValue.left : '-'"
    :right-label="modelValue.right ? modelValue.right : '-'"
  >
    <template v-slot:label>
      <v-chip
        v-if="modelValue.position && modelValue.position!=='static'"
        size="x-small"
        label
        density="compact"
        class="text-capitalize"
        color="#fff"
        variant="elevated"
        >{{ modelValue.position }}
      </v-chip>
    </template>

    <s-box-sides
      :selected="margin"
      bg-color="#222"
      @click:side="$emit('click:area', 'margin')"
      height="100%"
      height-percent="25%"
      rounded="lg"
      label="MARGIN"
      outline

      :top-label="modelValue.marginTop ? modelValue.marginTop : '-'"
      :bottom-label="modelValue.marginBottom ? modelValue.marginBottom : '-'"
      :left-label="modelValue.marginLeft ? modelValue.marginLeft : '-'"
      :right-label="modelValue.marginRight ? modelValue.marginRight : '-'"
    >
      <s-box-sides
        :selected="padding"
        bg-color="#222"
        @click:side="$emit('click:area', 'padding')"
        height-percent="35%"
        height="100%"
        outline
        :style="{outlineColor:border?'#3F51B5':undefined}"
        rounded="lg"
        label="PADDING"
        :top-label="modelValue.paddingTop ? modelValue.paddingTop : '-'"
        :bottom-label="
          modelValue.paddingBottom ? modelValue.paddingBottom : '-'
        "
        :left-label="modelValue.paddingLeft ? modelValue.paddingLeft : '-'"
        :right-label="modelValue.paddingRight ? modelValue.paddingRight : '-'"
      >
        <v-sheet
          :color="size ? '#3F51B5' : '#222'"
          @click.stop="$emit('click:area', 'size')"
          rounded="lg"
          height="100%"
          style="outline: solid 3px #000; font-size: 9px"
          class="d-flex align-center justify-center overflow-hidden pp"
        >
          <span class="op-0-5 text-uppercase">Content</span>
        </v-sheet>
      </s-box-sides>
    </s-box-sides>
  </s-box-sides>
</template>

<script>
import SBoxSides from "@selldone/page-builder/components/style/preview/SBoxSides.vue";

export default {
  name: "SLandingStylePreview",
  components: { SBoxSides },
  emits: ["update:modelValue", "click:area"],
  props: {
    modelValue: {},

    border: { type: Boolean },
    size: { type: Boolean },
    margin: { type: Boolean },
    padding: { type: Boolean },
    position: Boolean,
  },

  computed: {
    val_normal() {
      const out = Object.assign({}, this.modelValue);
      out.width = "100px";
      out.heigth = "100px";

      out.maxWidth = "100px";
      out.maxHeight = "100px";

      out.minWidth = "100px";
      out.minHeight = "100px";
      return out;
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(101, 72, 204, 0.74);
}

.trapezoid {
  position: absolute;
  width: 100px;
  height: 30px;
  background-color: orange;
  cursor: pointer;

  --width: 10%;
  --height: 15%;

  --side-rev-w: calc(100% - var(--width));
  --side-rev-h: calc(100% - var(--width));
}

.top {
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: var(--height);
  clip-path: polygon(0 0, 100% 0, var(--side-rev-w) 100%, var(--width) 100%);
  background-color: rgba(48, 105, 183, 0.84);
}

.bottom {
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: var(--height);
  clip-path: polygon(var(--width) 0, var(--side-rev-w) 0, 100% 100%, 0 100%);
  background-color: rgba(153, 82, 10, 0.85);
}

.left {
  top: 0;
  bottom: 0;
  height: 100%;
  width: var(--width);
  left: 0;
  clip-path: polygon(0 0, 100% var(--height), 100% var(--side-rev-h), 0 100%);
  background-color: rgba(10, 153, 40, 0.8);
}

.right {
  top: 0;
  bottom: 0;
  height: 100%;
  width: var(--width);
  right: 0;
  clip-path: polygon(0 var(--height), 100% 0, 100% 100%, 0 var(--side-rev-h));
  background-color: rgba(180, 53, 28, 0.88);
}
</style>
