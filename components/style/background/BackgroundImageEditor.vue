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

<template>
  <div>
    <div
      class="grad-layer bg-tiny-checkers-dark mx-auto mb-3 position-relative text-center"
    >
      <div class="center-absolute pa-2">{{ $t("global.commons.preview") }}</div>
      <div :style="final_bg_styles" class="grad-layer"></div>
    </div>

    <v-toolbar class="my-5 rounded-lg" flat>
      <v-toolbar-items>
        <v-btn
          :color="tab === 1 ? 'amber' : undefined"
          variant="text"
          @click.stop="tab = 1"
        >
          <v-icon class="me-1">format_color_fill</v-icon>
          Pattern

          <v-fab-transition>
            <v-icon
              v-if="bgGradient?.length || bgCustom"
              color="#fff"
              end
              size="small"
              >check_circle
            </v-icon>
          </v-fab-transition>
        </v-btn>
        <v-btn
          :color="tab === 2 ? 'amber' : undefined"
          variant="text"
          @click.stop="tab = 2"
        >
          <v-icon class="me-1">image</v-icon>
          Image
          <v-fab-transition>
            <v-icon v-if="bgImage" color="#fff" end size="small"
              >check_circle
            </v-icon>
          </v-fab-transition>
        </v-btn>
        <v-btn
          v-if="hasBgVideo"
          :color="tab === 3 ? 'amber' : undefined"
          variant="text"
          @click.stop="tab = 3"
        >
          <v-icon class="me-1">smart_display</v-icon>
          Video

          <v-fab-transition>
            <v-icon v-if="bgVideo" color="#fff" end size="small"
              >check_circle
            </v-icon>
          </v-fab-transition>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-window v-model="tab">
      <v-window-item :value="1">
        <!-- ████████████████████ Custom style ████████████████████ -->

        <s-setting-group
          icon="style"
          subtitle="To create a more custom style, you can use this option."
          title="Custom style"
        >
          <v-list-item prepend-icon="texture">
            <u-fade-scroll>
              <div class="d-flex align-center">
                <v-btn
                  v-for="item in BgImageStyles"
                  :key="item"
                  class="ma-1"
                  icon
                  variant="text"
                  @click="
                    $emit('update:bgCustom', item);
                    onChange();
                  "
                >
                  <v-avatar :style="safeBg(item)" size="26"></v-avatar>
                </v-btn>
              </div>
            </u-fade-scroll>
          </v-list-item>
          <v-list-item prepend-icon="css">
            <v-textarea
              :max-rows="3"
              :model-value="bgCustom"
              :rows="1"
              auto-grow
              class="english-field"
              clearable
              flat
              placeholder="Custom bg image style e.g. background-image ..."
              variant="plain"
              @update:model-value="
                (val) => {
                  $emit('update:bgCustom', val);
                  onChange();
                }
              "
            ></v-textarea>
          </v-list-item>
        </s-setting-group>

        <!-- ████████████████████ Gradient ████████████████████ -->
        <v-expand-transition>
          <div v-if="!raw_style_mode">
            <s-setting-group
              icon="gradient"
              subtitle="Select more than one color to create a gradient."
              title="Gradient"
            >
              <gradient-builder
                :model-value="bgGradient"
                clearable
                @change="onChange"
                @update:model-value="
                  (val) => {
                    $emit('update:bgGradient', val);
                    onChange();
                  }
                "
              ></gradient-builder>
            </s-setting-group>
          </div>
        </v-expand-transition>
      </v-window-item>

      <!-- ████████████████████ Background image ████████████████████ -->

      <v-window-item
        :class="{ disabled: raw_style_mode }"
        :value="2"
        class="py-5"
      >
        <s-widget-header
          icon="texture"
          title="Background image"
        ></s-widget-header>

        <v-list-subheader
          >Add an image as your background pattern.
        </v-list-subheader>

        <s-image-uploader
            :dark="dark"
            :image="bgImage ? getShopImagePath(bgImage) : null"
            :server="uploadUrl"
            auto-compact
            class="mt-2"
            clearable
            dense
            max-file-size="2MB"
            @onClear="$emit('update:bgImage', null)"
            @new-path="handleProcessFile"
            label="Background Image"
        >
        </s-image-uploader>


        <div class="p-1 text-center">
          <v-btn-toggle
            :model-value="bgImageSize"
            class="mx-auto"
            density="compact"
            rounded
            selected-class="blue-flat"
          >
            <v-btn
              v-for="item in BgImageSizes"
              :key="item"
              :value="item"
              size="small"
              @click="
                (val) => {
                  $emit('update:bgImageSize', item);
                  onChange();
                }
              "
            >
              {{ item }}
            </v-btn>
            <v-btn size="small" @click="show_custom_size = true"
              >Custom: {{ bgImageSize ? bgImageSize : "auto" }}
            </v-btn>
          </v-btn-toggle>
        </div>

        <div class="p-1 text-center">
          <v-btn-toggle
            :model-value="bgImageRepeat"
            class="mx-auto"
            density="compact"
            rounded
            selected-class="blue-flat"
          >
            <v-btn
              v-for="item in bgImageRepeats"
              :key="item"
              :value="item"
              size="small"
              @click="
                (val) => {
                  $emit('update:bgImageRepeat', item);
                  onChange();
                }
              "
            >
              {{ item }}
            </v-btn>
          </v-btn-toggle>
        </div>



        <v-item-group
          :model-value="bgPosition"
          mandatory
          @update:model-value="
            (val) => {
              $emit('update:bgPosition', val);
              onChange();
            }
          "
        >
          <v-container class="mx-auto" style="max-width: 240px">
            <div class="text-center mb-2">Background position</div>
            <v-row dense style="font-size: 8px">
              <v-col v-for="pos in BackgroundPositions" :key="pos" cols="4">
                <v-item v-slot="{ isSelected, toggle }" :value="pos">
                  <v-card
                    :color="isSelected ? 'blue' : ''"
                    :height="64"
                    :width="64"
                    class="d-flex align-center justify-center ma-auto"
                    dark
                    @click="toggle"
                  >
                    {{ pos }}
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
      </v-window-item>

      <!-- ████████████████████ Background video ████████████████████ -->

      <v-window-item v-if="hasBgVideo" :value="3" class="py-5">
        <s-widget-header
          icon="movie"
          title="Background video"
        ></s-widget-header>

        <v-list-subheader class="my-2" style="min-height: unset">
          <div>
            Add a video that automatically plays in the background.<br />
            <b>Important!</b> If the background does not update after uploading,
            please save the changes and refresh the page.
          </div>
        </v-list-subheader>

        <s-video-uploader
          :dark="dark"
          :server="uploadVideoUrl"
          :video="bgVideo ? getVideoUrl(bgVideo) : null"
          auto-compact
          class="mt-2"
          clearable
          dense
          max-file-size="8MB"
          @onClear="$emit('update:bgVideo', null)"
          @new-path="handleProcessVideo"
          label="Background Video"
        >
        </s-video-uploader>
      </v-window-item>
    </v-window>

    <!-- ████████████████████ Dialog > Custom Size ████████████████████ -->

    <v-dialog v-model="show_custom_size" dark max-width="400">
      <v-card color="#353e45" dark>
        <v-card-title
          ><span class="small">Custom background size</span>
        </v-card-title>
        <v-card-text>
          <u-dimension-input
            v-model="size_w"
            dense
            label="Background width"
          ></u-dimension-input>

          <u-dimension-input
            v-model="size_h"
            dense
            label="Background height"
          ></u-dimension-input>
        </v-card-text>
        <v-card-actions>
          <div class="widget-buttons">
            <v-btn
              size="x-large"
              variant="text"
              @click="show_custom_size = false"
            >
              <v-icon start>close</v-icon>
              {{ $t("global.actions.close") }}
            </v-btn>

            <v-btn size="x-large" variant="text" @click="setBgSize()">
              <v-icon class="me-1">check</v-icon>
              <b>{{ $t("global.actions.set") }}</b>
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import SImageUploader from "@components/ui/uploader/SImageUploader.vue";
import GradientBuilder from "../gradient/GradientBuilder.vue";
import { LUtilsBackground } from "@app-page-builder/utils/background/LUtilsBackground";
import UDimensionInput from "@components/ui/dimension/input/UDimensionInput.vue";

import SVideoUploader from "@components/ui/uploader/SVideoUploader.vue";
import SSettingGroup from "@app-page-builder/styler/settings/group/SSettingGroup.vue";
import UFadeScroll from "@components/ui/fade-scroll/UFadeScroll.vue";

export default {
  name: "BackgroundImageEditor",
  components: {
    UFadeScroll,
    SSettingGroup,
    SVideoUploader,

    UDimensionInput,
    GradientBuilder,
    SImageUploader,
  },
  emits: [
    "update:bgImage",
    "update:bgGradient",
    "update:bgImageSize",
    "update:bgCustom",
    "update:bgImageRepeat",
    "update:bgPosition",
    "update:bgVideo",
    "change",
  ],
  props: {
    bgImage: {},
    bgGradient: {},
    bgImageSize: {
      default: "cover",
    },
    bgImageRepeat: {},

    bgCustom: {},
    BgColor: {},

    bgPosition: {
      default: "center",
    },

    uploadUrl: {
      require: true,
    },
    uploadVideoUrl: {
      require: true,
    },
    dark: { type: Boolean, default: false },

    bgVideo: {},
    hasBgVideo: { type: Boolean, default: false },
  },

  data: () => ({
    tab: 1,

    BgImageSizes: ["auto", "contain", "cover"],
    bgImageRepeats: [
      "inherit",
      "repeat",
      "repeat-x",
      "repeat-y",
      "revert",
      "round",
      "space",
    ],

    BgImageStyles: [
      "repeating-linear-gradient(-45deg, rgba(255,0,0,.25), rgba(255,0,0,.25) 5px, rgba(0,0,255,.25) 5px, rgba(0,0,255,.25) 10px )",
      "repeating-linear-gradient(-45deg, #5D403744, #5D403744 5px, #E64A1944 5px, #E64A1944 10px )",
      "repeating-linear-gradient(-45deg, #1976D244, #1976D244 5px, #03A9F444 5px, #03A9F444 10px )",
      "repeating-linear-gradient(-45deg, #C2185B44, #C2185B44 5px, #D32F2F44 5px, #D32F2F44 10px )",
      "repeating-linear-gradient(-45deg, #AFB42B44, #AFB42B44 5px, #8BC34A44 5px, #8BC34A44 10px )",
      "repeating-linear-gradient(-45deg, #22222255, #22222255 5px, #44444455 5px, #44444455 10px )",
      "repeating-linear-gradient(-45deg, #ffffff55, #ffffff55 5px, #dddddd55 5px, #dddddd55 10px )",

      "repeating-linear-gradient(45deg,#606dbc,#606dbc 10px,#465298 10px,#465298 20px)",
      "repeating-linear-gradient(to right,#f6ba52,#f6ba52 10px,#ffd180 10px,#ffd180 20px)",
      "repeating-linear-gradient(30deg,#512DA8,#512DA8 10px,#9C27B0 10px,#9C27B0 20px)",
      "repeating-linear-gradient(120deg,#FFA000,#FFA000 10px,#FBC02D 10px,#FBC02D 20px)",
      "repeating-linear-gradient(90deg,#607D8B,#607D8B 10px,#212121 10px,#212121 20px)",
      "repeating-radial-gradient(circle,purple,purple 8px,#4b026f 8px,#4b026f 15px)",
      "repeating-linear-gradient(145deg,#8BC34A,#8BC34A 10px,#388E3C 10px,#388E3C 20px)",

      "background-image: radial-gradient(#212121 20%, transparent 20%), radial-gradient(#fafafa 20%, transparent 20%);background-color: #e53935;background-position: 0 0, 20px 20px;background-size: 40px 40px;background-repeat: repeat;",
      "background-image: radial-gradient(#2196f3 20%, #00bcd4 20%);background-size: 40px 40px;background-repeat: repeat;",
      "repeating-radial-gradient(circle at 0 0,#eee,#ccc 50px)",
      " background:linear-gradient(red, transparent),linear-gradient(to top left, lime, transparent),linear-gradient(to top right, blue, transparent);background-blend-mode: screen;",
      "background:linear-gradient(limegreen,transparent),linear-gradient(90deg,skyblue,transparent),linear-gradient(-90deg,coral,transparent);background-blend-mode: screen;",
      "background:radial-gradient(circle at bottom left,transparent 0,transparent 2em,beige 2em,beige 4em,transparent 4em,transparent 6em,khaki 6em,khaki 8em,transparent 8em,transparent 10em),radial-gradient(circle at top right,transparent 0,transparent 2em,beige 2em,beige 4em,transparent 4em,transparent 6em,khaki 6em,khaki 8em,transparent 8em,transparent 10em),radial-gradient(circle at top left,transparent 0,transparent 2em,navajowhite 2em,navajowhite 4em,transparent 4em,transparent 6em,peachpuff 6em,peachpuff 8em,transparent 8em,transparent 10em),radial-gradient(circle at bottom right,transparent 0,transparent 2em,palegoldenrod 2em,palegoldenrod 4em,transparent 4em,transparent 6em,peachpuff 6em,peachpuff 8em,transparent 8em,transparent 10em), blanchedalmond;background-blend-mode: multiply;background-size: 10em 10em;background-position: 0 0, 0 0, 5em 5em, 5em 5em;",
      "background:repeating-linear-gradient(to top left,transparent,transparent 5em,#96526B 5em,#96526B 10em,transparent 10em,transparent 15em,#F5CF66 15em,#F5CF66 20em),repeating-linear-gradient(to top right,transparent,transparent 5em,#EBAD60 5em,#EBAD60 10em,transparent 10em,transparent 15em,#8BAB8D 15em,#8BAB8D 20em), wheat;background-blend-mode: multiply;",
      `background-color: #0d2374;background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2346a4c6' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");background-repeat: repeat;background-size: 40px;`,
      `background-color: #170a44;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%237f24ce' fill-opacity='0.94'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");background-repeat: repeat;background-size: 40px;`,
      `background-color: #174c87;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%2343a7c3' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E");background-repeat: repeat;background-size: 40px;`,
    ],

    //----------------------
    show_custom_size: false,
    size_w: 0,
    size_h: 0,

    //----------------
    BackgroundPositions: [
      "top left",
      "top center",
      "top right",
      "left center",
      "center",
      "right center",
      "bottom left",
      "bottom center",
      "bottom right",
    ],
  }),

  computed: {
    final_bg_styles() {
      // console.log("final_bg_styles", this.bgCustom, this.bgGradient);
      return LUtilsBackground.CreateCompleteBackgroundStyleObject(
        this.bgCustom,
        this.bgGradient,
        this.bgImage ? this.getShopImagePath(this.bgImage) : null,
        this.bgImageSize,
        this.bgImageRepeat,
        this.BgColor,
        null,
        this.bgPosition,
      );
    },

    raw_style_mode() {
      return this.bgCustom && this.bgCustom.includes("background");
    },
  },

  methods: {
    onChange() {
      this.$nextTick(() => {
        this.$emit("change");
      });
    },

    handleProcessFile(path) {
      this.$emit("update:bgImage", path);
      this.onChange();
    },
    safeBg(style) {
      return LUtilsBackground.GetBackgroundSafeStyle(style);
    },
    setBgSize() {
      if (this.size_w && this.size_h)
        this.$emit("update:bgImageSize", `${this.size_w} ${this.size_h}`);
      else this.$emit("update:bgImageSize", `cover`);

      this.onChange();
      this.show_custom_size = false;
    },

    handleProcessVideo(path) {
      this.$emit("update:bgVideo", path);
      this.onChange();
    },
  },
};
</script>

<style scoped>
.grad-layer {
  width: 250px;
  height: 150px;
  border-radius: 2rem;
  overflow: hidden;
}
</style>
