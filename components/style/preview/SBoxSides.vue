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
  <v-sheet
    :color="bgColor"
    :height="height"
    class="s--box-sides"
    :class="{ '-selected': selected, '-outline': outline }"
    :rounded="rounded"
    :style="{ '--width': widthPercent, '--height': heightPercent }"
  >
    <div class="box">
      <div
        class="trapezoid -top"
        @click.stop="$emit('click:side', 'top')"
      ></div>
      <div
        class="trapezoid -left"
        @click.stop="$emit('click:side', 'left')"
      ></div>
      <div
        class="trapezoid -right"
        @click.stop="$emit('click:side', 'right')"
      ></div>
      <div
        class="trapezoid -bottom"
        @click.stop="$emit('click:side', 'bottom')"
      ></div>
    </div>
    <div class="-label">
      <span class="op-0-5 me-1 text-uppercase">{{ label }}</span>

      <slot name="label"></slot>
    </div>

    <div class="-container">
      <slot></slot>
    </div>

    <div class="value-box -top">
      {{ topLabel==='unset'?'-':topLabel }}
    </div>
    <div class="value-box -bottom">
      {{ bottomLabel==='unset'?'-':bottomLabel }}
    </div>
    <div class="value-box -left">
      {{ leftLabel==='unset'?'-':leftLabel }}
    </div>
    <div class="value-box -right">
      {{ rightLabel==='unset'?'-':rightLabel }}
    </div>
  </v-sheet>
</template>

<script lang="ts">
export default {
  name: "SBoxSides",
  emits: ["click:side"],
  props: {
    label: {},
    bgColor: {},

    selected: Boolean,

    height: {},
    rounded: {},
    widthPercent: {
      default: "10%",
    },
    heightPercent: {
      default: "15%",
    },
    topLabel: {},
    bottomLabel: {},
    leftLabel: {},
    rightLabel: {},
    outline: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.s--box-sides {
  position: relative;
  overflow: hidden;

  --side-rev-w: calc(100% - var(--width));
  --side-rev-h: calc(100% - var(--height));

  --color1: rgba(51, 51, 51, 0.84);
  --color2: rgba(68, 68, 68, 0.89);
  --color3: rgba(68, 68, 85, 0.88);
  --side-opacity: 0.6; // Default

  &.-selected {
    --color1: rgba(63, 81, 181, 0.94);
    --color2: rgba(48, 63, 159, 0.93);
    --color3: rgba(25, 84, 210, 0.96);
    --side-opacity: 0.8;

    background: var(--color1) !important;
  }

  &.-outline {
    outline: solid 3px #000;
  }

  .-container {
    position: absolute;
    left: var(--width);
    right: var(--width);
    top: var(--height);
    bottom: var(--height);
    z-index: 1;
  }

  .-label {
    font-size: 8px;
    //text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 6px;
    top: 3px;
    font-weight: 600;
    color: #fff;
    z-index: 1;
    user-select: none;
    pointer-events: none;
   // text-transform: uppercase;
  }

  .box {
    position: relative;
    width: 100%;
    height: 100%;

    .trapezoid {
      position: absolute;
      width: 100px;
      height: 30px;
      cursor: pointer;
      opacity: var(--side-opacity);
      background-image: linear-gradient(
        45deg,
        var(--color1),
        var(--color2),
        var(--color3)
      );
      transition-duration: 0.3s;

      &:hover {
        opacity: 1;
      }

      &.-top {
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: var(--height);
        clip-path: polygon(
          0 0,
          100% 0,
          var(--side-rev-w) 100%,
          var(--width) 100%
        );
        background-image: linear-gradient(
          45deg,
          var(--color1),
          var(--color2),
          var(--color1)
        );
      }

      &.-bottom {
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: var(--height);
        clip-path: polygon(
          var(--width) 0,
          var(--side-rev-w) 0,
          100% 100%,
          0 100%
        );
        background-color: rgba(153, 82, 10, 0.1);
        background-image: linear-gradient(
          45deg,
          var(--color1),
          var(--color2),
          var(--color1)
        );
      }

      &.-left {
        top: 0;
        bottom: 0;
        height: 100%;
        width: var(--width);
        left: 0;
        clip-path: polygon(
          0 0,
          100% var(--height),
          100% var(--side-rev-h),
          0 100%
        );
        background-color: rgba(10, 153, 40, 0.1);
      }

      &.-right {
        top: 0;
        bottom: 0;
        height: 100%;
        width: var(--width);
        right: 0;
        clip-path: polygon(
          0 var(--height),
          100% 0,
          100% 100%,
          0 var(--side-rev-h)
        );
        background-color: rgba(180, 53, 28, 0.1);
      }
    }
  }

  .value-box {
    position: absolute;
    font-size: 8px;
    font-weight: 500;
    z-index: 2;
    user-select: none;
    pointer-events: none;

    &.-top {
      top: 6px;
      left: 50%;
      transform: translate(-50%, 0);
    }

    &.-bottom {
      bottom: 6px;
      left: 50%;
      transform: translate(-50%, 0);
    }

    &.-left {
      top: 50%;
      left: 6px;
      transform: translate(0, -50%);
    }

    &.-right {
      top: 50%;
      right: 6px;
      transform: translate(0, -50%);
    }
  }
}
</style>
