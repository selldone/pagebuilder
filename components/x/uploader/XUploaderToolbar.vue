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
  <v-menu
    v-if="object && (has_edit_toolbar || has_animate_toolbar)"
    v-model="show"
    :activator="object.$element"
    :close-on-content-click="false"
    :open-delay="0"
    :close-delay="10"
    location="top"
    open-on-hover
    transition="slide-y-transition"
  >
    <v-toolbar
      v-if="has_edit_toolbar"
      color="#111"
      density="compact"
      rounded="lg"
      style="max-width: max-content"
      theme="dark"
    >
      <v-toolbar-items>
        <v-btn
          icon
          size="small"
          @click.stop="setting.contain = !setting.contain"
        >
          <v-icon
            >{{ setting.contain ? "fullscreen_exit" : "fullscreen" }}
          </v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black"
            location="bottom"
            text="Contain / Cover"
          ></v-tooltip>
        </v-btn>

        <v-btn icon size="small" @click.stop="showResize()">
          <v-icon> crop</v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black text-start"
            location="bottom"
            max-width="360"
          >
            Size

            <v-chip
              v-if="object.style?.width"
              class="ma-1"
              color="#fff"
              size="x-small"
              variant="tonal"
              ><b>Width: </b> {{ object.style.width }}
            </v-chip>
            <v-chip
              v-if="object.style?.height"
              class="ma-1"
              color="#fff"
              size="x-small"
              variant="tonal"
              ><b>Height: </b> {{ object.style.height }}
            </v-chip>
          </v-tooltip>
        </v-btn>

        <v-btn icon size="small" @click.stop="showMasterDesignDialog()">
          <v-icon> architecture</v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black"
            location="bottom"
            text="Classes & Style"
          ></v-tooltip>
        </v-btn>

        <v-btn icon size="small" @click.stop="showLayers()">
          <v-icon> layers</v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black"
            location="bottom"
          >
            Image Layers

            <div
              v-if="object.background.hasValue()"
              class="py-1 d-flex align-center small"
            >
              <v-card
                :style="bg_cal"
                class="me-2"
                height="24"
                rounded="lg"
                width="24"
              ></v-card>
              Background
            </div>
            <div
              v-if="setting.fg?.hasValue()"
              class="py-1 d-flex align-center small"
            >
              <v-card
                :style="fg_cal"
                class="me-2"
                height="24"
                rounded="lg"
                width="24"
              ></v-card>
              Foreground
            </div>
          </v-tooltip>
        </v-btn>

        <v-menu :close-on-content-click="false" open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn icon size="small" v-bind="props">
              <v-icon> {{ selected_aspect.icon }}</v-icon>
            </v-btn>
          </template>

          <v-card class="text-start bg-black" subtitle="Aspect Ratio">
            <v-list
              bg-color="transparent"
              class="border-between-vertical"
              density="compact"
            >
              <v-list-item
                v-for="(item, index) in ASPECTS"
                :key="index"
                :prepend-icon="item.icon"
                :title="item.title"
                @click.stop="setting.aspect = item.val"
              >
                <template v-slot:append>
                  <v-list-item-action>
                    <v-icon v-if="setting.aspect === item.val" color="green"
                      >check
                    </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-list-item
                key="round"
                prepend-icon="panorama_fish_eye"
                @click.stop="setting.round = !setting.round"
              >
                <v-list-item-title> Circle</v-list-item-title>
                <template v-slot:append>
                  <v-list-item-action>
                    <v-icon v-if="setting.round" color="green">check</v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>

        <v-menu v-if="!noFloat" :close-on-content-click="false" open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn icon size="small" v-bind="props">
              <v-icon> {{ selected_float.icon }}</v-icon>
            </v-btn>
          </template>

          <v-card class="text-start bg-black" subtitle="Float Position">
            <v-list
              bg-color="transparent"
              class="border-between-vertical"
              density="compact"
            >
              <v-list-item
                v-for="(item, index) in FLOATS"
                :key="index"
                :prepend-icon="item.icon"
                :title="item.title"
                @click="setting.float = item.val"
              >
                <template v-slot:append>
                  <v-list-item-action>
                    <v-icon v-if="setting.float === item.val" color="green"
                      >check
                    </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>

        <v-btn icon size="small" @click.stop="showLink()">
          <v-icon>{{ object.data.link ? "link" : "add_link" }}</v-icon>

          <v-icon
            v-if="object.data.link"
            color="green"
            size="12"
            class="absolute-bottom-end ma-1"
            >check_circle
          </v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black"
            location="bottom"
            text="Add Link"
          ></v-tooltip>
        </v-btn>
        <v-btn
          v-if="hasRestore"
          variant="flat"
          size="small"
          color="amber"
          @click.stop="restoreImage()"
        >
          <v-icon size="24">settings_backup_restore</v-icon>
          <v-tooltip
            activator="parent"
            content-class="bg-black"
            location="bottom"
            text="Restore Previous Image"
          ></v-tooltip>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-toolbar
      v-else-if="has_animate_toolbar"
      color="#111"
      density="compact"
      rounded="lg"
      style="max-width: max-content"
      theme="dark"
    >
      <v-btn
        icon
        title="Image Animation"
        variant="text"
        @click.stop="showAnimationEdit()"
      >
        <v-icon>movie_filter</v-icon>
      </v-btn>

      <v-chip
        v-for="a in animations"
        :Key="a"
        class="me-2"
        color="blue"
        label
        prepend-icon="animation"
        size="x-small"
      >
        {{ a }}
      </v-chip>
      <v-chip
        v-for="h in hovers"
        :Key="h"
        class="me-2"
        color="amber"
        label
        prepend-icon="mouse"
        size="x-small"
      >
        {{ h }}
      </v-chip>
      <v-chip
        v-if="threshold"
        class="me-2"
        color="fff"
        label
        prepend-icon="bolt"
        size="x-small"
        >Threshold: <b>{{ threshold * 100 }}%</b></v-chip
      >
    </v-toolbar>
  </v-menu>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { LUtilsClasses } from "@selldone/page-builder/utils/classes/LUtilsClasses.ts";
import { EventBus } from "@selldone/core-js/events/EventBus.ts";
import { LMixinEvents } from "@selldone/page-builder/mixins/events/LMixinEvents.ts";
import { XUploaderObject } from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";
import { delay } from "lodash-es";

const ASPECTS = [
  { val: undefined, title: "Auto", icon: "crop_free" },
  { val: 1, title: "Square", icon: "crop_square" },
  { val: 7 / 5, title: "7:5", icon: "crop_7_5" },
  { val: 5 / 4, title: "5:4", icon: "crop_5_4" },
  { val: 3 / 2, title: "3:2", icon: "crop_3_2" },
  { val: 16 / 9, title: "16:9", icon: "crop_16_9" },
  { val: 2, title: "2:1", icon: "crop_square" },
];

const FLOATS = [
  { val: undefined, title: "None", icon: "remove" },
  { val: "start", title: "Start", icon: "first_page" },
  { val: "end", title: "End", icon: "last_page" },
];

export default defineComponent({
  name: "XUploaderToolbar",
  mixins: [LMixinEvents],
  inject: ["$builder"],
  props: {},
  data: () => ({
    ASPECTS: ASPECTS,
    FLOATS: FLOATS,

    show: false,

    noPreview: false,
    noFloat: false,

    augment: null,
    object: null as XUploaderObject,
    blobUrl: null,
    hasRestore: false,
    restoreImage: null,
  }),

  computed: {
    is_input() {
      return this.$builder.isEditing; // this.mode === 'input'
    },

    has_image() {
      return this.src || this.blobUrl;
    },

    src() {
      if (this.$builder.isEditing) return this.object.data.src;
      return this.object.data.src?.applyAugment(this.augment, false);
    },

    has_edit_toolbar() {
      return (
        !this.$builder.isHideExtra /*Hide extra edit buttons*/ &&
        this.is_input &&
        !this.noPreview &&
        !this.$builder.isAnimation &&
        !this.$builder.isTracking &&
        (this.has_image /*Image menu*/ || this.hasRestore) /*Restore menu*/
      );
    },

    has_animate_toolbar() {
      return this.is_input && !this.noPreview && this.$builder.isAnimation;
    },
    setting() {
      return this.object.data?.setting;
    },

    animations() {
      return LUtilsClasses.GetAnimations(this.object.classes);
    },
    hovers() {
      return LUtilsClasses.GetHovers(this.object.classes);
    },
    threshold() {
      return LUtilsClasses.GetThreshold(this.object.style);
    },

    selected_aspect() {
      if (!this.setting) return ASPECTS[0];

      const obj = ASPECTS.find((it) => it.val === this.setting.aspect);
      return obj ? obj : ASPECTS[0];
    },
    selected_float() {
      if (!this.setting) return FLOATS[0];

      const obj = FLOATS.find((it) => it.val === this.setting.float);
      return obj ? obj : FLOATS[0];
    },
  },

  mounted() {
    EventBus.$on(
      "show:XUploaderToolbar",

      ({
        noPreview,
        noFloat,
        augment,
        object,
        blobUrl,
        hasRestore,
        restoreImage,
      }) => {
        //console.log('XUploaderToolbar | Hover',object.$element)
        this.noPreview = noPreview;
        this.noFloat = noFloat;
        this.augment = augment;
        this.object = object;
        this.blobUrl = blobUrl;
        this.hasRestore = hasRestore;
        this.restoreImage = restoreImage;

        delay(() => {
          this.show = true;
        }, 30);
      },
    );
  },
  beforeUnmount() {
    EventBus.$off("show:XUploaderToolbar");
  },

  methods: {
    //-------------------------------------------------------------
    showResize() {
      this.ShowLSettingsImageSize(
        this.object.$element,
        this.object,
        this.src,
        () => {},
      );
    },
    //-------------------------------------------------------------

    showMasterDesignDialog() {
      this.ShowLSettingsClassStyle(
        this.object.$element,
        this.object.$element,

        this.object,
        {
          /*noSize: true,*/ prev_image: this.object.data.src,
          exclude: ["typeface", "grid"],
        }, // Not show size ! conflict with image size!
      );
    },

    showLink() {
      this.ShowLSettingsLink(this.object.$element, this.object, "link");
    },

    //----------------------------------------------------------------------------

    showAnimationEdit() {
      this.ShowLSettingsAnimation(
        this.object.$element, // Style
        this.object.$element, // Class

        this.object,
        "style",
        "classes",
        {
          /* noSize: true,*/ prev_image: this.object.data.src,
          exclude: ["typeface"],
        }, // Not show size ! conflict with image size!
      );
    },

    //-------------------------------------------------------------
    showLayers() {
      this.ShowLSettingsImageLayers(
        this.object.$element,
        this.object,
        this.src,
        () => {},
      );
    },
  },
});
</script>

<style scoped lang="scss"></style>
