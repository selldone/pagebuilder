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
  <s-setting-expandable :value="value" icon="transform" title="Transform">
    <template v-slot:title>
      <v-chip
        v-if="transform && transform.rotate"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >R {{ transform.rotate }}°
      </v-chip>
      <v-chip
        v-if="transform && transform.rotateX"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Rx {{ transform.rotateX }}°
      </v-chip>
      <v-chip
        v-if="transform && transform.rotateY"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Ry {{ transform.rotateY }}°
      </v-chip>
      <v-chip
        v-if="transform && transform.rotateZ"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Rz {{ transform.rotateZ }}°
      </v-chip>

      <v-chip
        v-if="
          transform && transform.translateX && transform.translateX !== 'unset'
        "
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Tx {{ getName(transform.translateX) }}
      </v-chip>
      <v-chip
        v-if="
          transform && transform.translateY && transform.translateY !== 'unset'
        "
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Ty {{ getName(transform.translateY) }}
      </v-chip>
      <v-chip
        v-if="
          transform && transform.translateZ && transform.translateZ !== 'unset'
        "
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Tz {{ getName(transform.translateZ) }}
      </v-chip>

      <v-chip
        v-if="transform && transform.scaleX && transform.scaleX !== 'unset'"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Sx {{ getName(transform.scaleX) }}
      </v-chip>
      <v-chip
        v-if="transform && transform.scaleY && transform.scaleY !== 'unset'"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Sy {{ getName(transform.scaleY) }}
      </v-chip>

      <v-chip
        v-if="transform && transform.skewX && transform.skewX !== 'unset'"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Kx {{ getName(transform.skewX) }}
      </v-chip>
      <v-chip
        v-if="transform && transform.skewY && transform.skewY !== 'unset'"
        class="ms-1"
        color="#000"
        label
        size="x-small"
        density="comfortable"
        variant="flat"
        >Ky {{ getName(transform.skewY) }}
      </v-chip>
    </template>

    <s-setting-group
      icon="rotate_90_degrees_ccw"
      title="Rotation"
      subtitle="The rotation defines a transformation that rotates an element around a fixed point on the 2D plane, without deforming it."
    >
    </s-setting-group>

    <s-setting-slider
      v-model="transform.rotate"
      :max="360"
      :min="-360"
      label="Rotate"
      suffix="deg"
    ></s-setting-slider>

    <s-setting-slider
      v-model="transform.rotateX"
      :max="360"
      :min="-360"
      label="Rotate X"
      suffix="deg"
    ></s-setting-slider>

    <s-setting-slider
      v-model="transform.rotateY"
      :max="360"
      :min="-360"
      label="Rotate Y"
      suffix="deg"
    ></s-setting-slider>

    <s-setting-slider
      v-model="transform.rotateZ"
      :max="360"
      :min="-360"
      label="Rotate Z"
      suffix="deg"
    ></s-setting-slider>

    <s-setting-group
      icon="flip_to_back"
      title="Translate"
      subtitle="The translate allows you to transfer an element from one place to another along the X (horizontal) axis, the Y (vertical) axis, and the Z (depth) axis."
    >
    </s-setting-group>

    <s-setting-slider
      v-model="transform.translateX"
      clearable
      label="Translate X"
    ></s-setting-slider>

    <s-setting-slider
      v-model="transform.translateY"
      clearable
      label="Translate y"
    ></s-setting-slider>

    <s-setting-slider
      v-model="transform.translateZ"
      clearable
      label="Translate z"
    ></s-setting-slider>

    <s-setting-group
      icon="transform"
      title="Scale"
      subtitle="The scale defines a transformation that resizes an element on the 2D plane."
    >
    </s-setting-group>

    <s-setting-slider
      v-model="transform.scaleX"
      :decimal="1"
      :max="10"
      :min="0"
      :step="0.1"
      clearable
      label="Scale X"
    ></s-setting-slider>

    <s-setting-slider
      v-model="transform.scaleY"
      :decimal="1"
      :max="10"
      :min="0"
      :step="0.1"
      clearable
      label="Scale Y"
    ></s-setting-slider>

    <s-setting-slider
      v-model="transform.scaleZ"
      :decimal="1"
      :max="10"
      :min="0"
      :step="0.1"
      clearable
      label="Scale Z"
    ></s-setting-slider>

    <s-setting-slider
      v-model="transform.perspective"
      clearable
      label="Perspective"
    ></s-setting-slider>

    <s-setting-group
      icon="360"
      title="Skew"
      subtitle="This transformation is a shear mapping that distorts each point within an element by a certain angle in the horizontal and vertical directions."
    >
    </s-setting-group>
    <s-setting-slider
      v-model="transform.skewX"
      :max="360"
      :min="-360"
      label="Skew Y"
      suffix="deg"
    ></s-setting-slider>
    <s-setting-slider
      v-model="transform.skewY"
      :max="360"
      :min="-360"
      label="Skew Y"
      suffix="deg"
    ></s-setting-slider>
  </s-setting-expandable>
</template>

<script>
import { defineComponent } from "vue";
import SSettingGroup from "@selldone/page-builder/styler/settings/group/SSettingGroup.vue";
import SSettingExpandable from "@selldone/page-builder/styler/settings/expandable/SSettingExpandable.vue";
import SSettingSlider from "@selldone/page-builder/styler/settings/slider/SSettingSlider.vue";

export default defineComponent({
  name: "LSettingsStyleTransform",
  components: {
    SSettingSlider,
    SSettingExpandable,
    SSettingGroup,
  },
  emits: [],
  props: {
    value:{},

    inputStyle: {},

    transform: {},
  },

  computed:{

  }
});
</script>

<style scoped lang="scss"></style>
