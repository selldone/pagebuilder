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
  <div
    class="pre-parent bg-tiny-checkers-dark"
    :class="{
      '-border': border,
      '-size': size,
      '-margin': margin,
      '-padding': padding,
    }"
  >
    Container
    <div
      class="pre-margin pointer-pointer"
      @click.stop="$emit('click:area', 'margin')"
      :style="{ borderRadius: value.borderRadius }"
    >
      Margin

      <div
        class="pre-layer pointer-pointer"
        @click.stop="$emit('click:area', 'padding')"
        :style="{
          borderLeft: value.borderLeft,
          borderRight: value.borderRight,
          borderTop: value.borderTop,
          borderBottom: value.borderBottom,
          borderRadius: value.borderRadius,
        }"
      >
        Padding
        <div
          class="pre-content pointer-pointer"
          @click.stop="$emit('click:area', 'size')"
          :style="{ borderRadius: value.borderRadius }"
        >
          <p class="m-0 text-center">Content</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StylePreview",
  props: {
    value: {},

    border: { type: Boolean },
    size: { type: Boolean },
    margin: { type: Boolean },
    padding: { type: Boolean },
  },

  computed: {
    val_normal() {
      const out = Object.assign({}, this.value);
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

<style scoped lang="scss">
.pre-parent {
  padding: 8px;

  position: relative;

  min-height: 300px;
  font-size: 11px;
  font-weight: 500;

  &.-border {
  }

  &.-margin {
    .pre-margin {
      background: #ac460f
        repeating-linear-gradient(
          45deg,
          #ac460f,
          #ac460f 5px,
          #bb5720 5px,
          #bb5720 10px
        );
    }
  }

  &.-padding {
    .pre-layer {
      background: #32b1ec
        repeating-linear-gradient(
          45deg,
          #32b1ec,
          #32b1ec 5px,
          #4ebaec 5px,
          #4ebaec 10px
        );
    }
  }

  &.-size {
    .pre-content {
      background: #c2185b
        repeating-linear-gradient(
          45deg,
          #c2185b,
          #c2185b 5px,
          #cb2969 5px,
          #cb2969 10px
        );
    }
  }

  .pre-margin {
    position: absolute;
    left: 10%;
    top: 32px;
    width: 80%;

    color: #fff;
    padding: 8px;
    border-radius: 2px;

    background: #c2a89a;
  }

  .pre-layer {
    background-color: #9fc2d2;
    color: #fff;
    margin: 24px;
    padding: 8px;
  }

  .pre-content {
    padding: 8px;

    background-color: #ce7f9f;
    color: #fff;
    display: flex;
    align-content: center;
    align-items: center;
    height: 100px;
    text-align: center;
    border-radius: 2px;
  }
}
</style>
