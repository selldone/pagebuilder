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
  <v-btn
    @click="dialog = true"
    variant="text"
    min-width="46"
    min-height="46"
    rounded="lg"
    class="ma-1"
  >
    <v-icon>picture_in_picture</v-icon>
    <v-tooltip activator="parent"
      >{{ $t("popup_page.menu.appearance") }}
    </v-tooltip>
  </v-btn>

  <v-dialog
    v-model="dialog"
    scrollable
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>

        <!-- ――――――――――――――――――――――  Container ―――――――――――――――――――― -->
        <div class="widget-box mb-5">
          <h2>
            <v-icon class="me-1">picture_in_picture</v-icon>
            {{ $t("popup_appearance.position") }}
          </h2>
          <v-list-subheader>
            {{ $t("popup_appearance.position_desc") }}
          </v-list-subheader>

          <v-item-group v-model="popup.position" mandatory>
            <v-container class="text-center">
              <v-row>
                <v-col v-for="pos in PopupPositions" :key="pos" cols="4">
                  <v-item v-slot="{ isSelected, toggle }" :value="pos">
                    <v-card
                      :color="isSelected ? 'primary' : ''"
                      :dark="isSelected"
                      :flat="!isSelected"
                      :height="100"
                      :width="100"
                      class="d-flex align-center justify-center ma-auto pa-2 small"
                      @click="toggle"
                    >
                      {{ pos }}
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>
        </div>

        <div class="widget-box mb-5">
          <h2>
            <v-icon class="me-1">straighten</v-icon>
            {{ $t("popup_appearance.width") }}
          </h2>
          <v-list-subheader>
            {{ $t("popup_appearance.width_desc") }}
          </v-list-subheader>

          <u-dimension-input
            v-model="popup.style.w"
            :label="$t('popup_appearance.width')"
            clearable
          ></u-dimension-input>

          <h2>
            <v-icon class="me-1 rotate-90-e">straighten</v-icon>
            {{ $t("popup_appearance.height") }}
          </h2>
          <v-list-subheader>
            {{ $t("popup_appearance.height_desc") }}
          </v-list-subheader>

          <u-dimension-input
            v-model="popup.style.h"
            :label="$t('popup_appearance.height')"
            clearable
          ></u-dimension-input>

          <h2>
            <v-icon class="me-1">rounded_corner</v-icon>
            {{ $t("popup_appearance.radius") }}
          </h2>
          <v-list-subheader>
            {{ $t("popup_appearance.radius_desc") }}
          </v-list-subheader>

          <u-dimension-input
            v-model="popup.style.r"
            :label="$t('popup_appearance.radius')"
            clearable
          ></u-dimension-input>

          <h2>
            <v-icon class="me-1">layers</v-icon>
            {{ $t("popup_appearance.shadow") }}
          </h2>
          <v-list-subheader>
            {{ $t("popup_appearance.shadow_desc") }}
          </v-list-subheader>
          <u-smart-switch
            v-model="popup.style.s"
            :true-title="$t('popup_appearance.shadow')"
            color="green"
            false-icon="layers_clear"
            false-title="Flat"
            inset
            true-icon="layers"
          ></u-smart-switch>
        </div>

        <div class="widget-box mb-5">
          <h2>
            <v-icon class="me-1">timer</v-icon>
            {{ $t("popup_appearance.delay") }}
          </h2>
          <v-list-subheader>
            {{ $t("popup_appearance.delay_desc") }}
          </v-list-subheader>

          <u-number-input
            v-model="popup.delay"
            :label="$t('popup_appearance.delay')"
            :min="0"
            :suffix="$t('global.commons.seconds')"
          ></u-number-input>

          <h2>
            <v-icon class="me-1">timelapse</v-icon>
            {{ $t("popup_appearance.hide") }}
          </h2>
          <v-list-subheader>
            {{ $t("popup_appearance.hide_desc") }}
          </v-list-subheader>

          <u-number-input
            v-model="popup.hide"
            :label="$t('popup_appearance.hide')"
            :min="0"
            :suffix="$t('global.commons.seconds')"
          ></u-number-input>
        </div>

        <div class="widget-box mb-5">
          <h2>
            <v-icon class="me-1">animation</v-icon>
            {{ $t("popup_appearance.transition") }}
          </h2>
          <v-list-subheader
            >Set a custom popup animation for this popup.
          </v-list-subheader>
          <animation-class-selector
            v-model="popup.transition"
          ></animation-class-selector>
        </div>
      </v-card-text>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="dialog = false">
            <v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import UNumberInput from "@selldone/components-vue/ui/number/input/UNumberInput.vue";
import AnimationClassSelector from "@selldone/page-builder/components/style/animation/AnimationClassSelector.vue";
import UDimensionInput from "@selldone/components-vue/ui/dimension/input/UDimensionInput.vue";
import USmartSwitch from "@selldone/components-vue/ui/smart/switch/USmartSwitch.vue";

export default {
  name: "LMenuLeftPopupAppearance",
  components: {
    USmartSwitch,
    UDimensionInput,
    AnimationClassSelector,
    UNumberInput,
  },
  inject: ["$builder", "$shop"],

  props: {
    busySave: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    dialog:false,

    PopupPositions: [
      "top-left",
      "top-center",
      "top-right",
      "left-center",
      "center",
      "right-center",
      "bottom-left",
      "bottom-center",
      "bottom-right",
    ],
  }),

  computed: {
    popup() {
      return this.$builder.model;
    },
  },

  created() {
    // Fix style object:
    if (!this.popup.style || Array.isArray(this.popup.style))
      this.popup.style = { w: "800px", h: "600px", r: "15%", s: true };

    if (!this.popup.position) this.popup.position = "center";
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
