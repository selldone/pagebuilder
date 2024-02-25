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
  <v-navigation-drawer
    v-model="show_edit_slide"
    :scrim="false"
    :width="
      $vuetify.display.xlAndUp ? 560 : $vuetify.display.lgAndUp ? 420 : 320
    "
    class="x-page-builder-options-slider"
    color="#1e1e1e"
    location="right"
    temporary
    theme="dark"
  >
    <v-card class="text-start pb-16" flat>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="show_edit_slide = false">
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-card-text v-if="dialog_pre">
        <!-- ████████████████████ Slides ████████████████████ -->
        <s-widget-header
          add-caption="Add Slide"
          button-color="#fff"
          class="mt-5"
          icon="layers"
          title="Slides"
          @click:add="addSlide"
        ></s-widget-header>
        <v-list-subheader
          >List of slides in the gallery. Click on a slide to edit it.
        </v-list-subheader>

        <v-expansion-panels>
          <v-expansion-panel
            v-for="(item, i) in target[keyColumns]"
            :key="i"
            @click="goToSlide(i)"
          >
            <v-expansion-panel-title class="text-start py-1">
              <div class="flex-grow-0">
                <v-avatar v-if="item.image?.src" class="me-2" rounded size="16">
                  <v-img :src="getShopImagePath(item.image.src)"></v-img>
                </v-avatar>
                <v-icon v-else class="me-2" size="16">view_headline</v-icon>
                Slide {{ i + 1 }}
              </div>
              <div
                v-if="StripTags(item.title)"
                class="mx-2 flex-grow-1 font-weight-bold"
              >
                | {{ StripTags(item.title)?.limitWords(5) }}
              </div>
              <v-btn
                class="flex-grow-0"
                icon
                size="small"
                @click.stop="removeSlide(i)"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <s-image-uploader
                v-if="item.image"
                :image="getShopImagePath(item.image.src)"
                :server="upload_image_url"
                auto-compact
                clearable
                dark
                label="Slide Image"
                @onClear="item.image.src = null"
                @new-path="(path) => (item.image.src = path)"
              />

              <v-text-field
                v-model="item.title"
                label="Slide Title"
                variant="underlined"
              >
              </v-text-field>

              <v-text-field
                v-model="item.subtitle"
                label="Slide Subtitle"
                variant="underlined"
              >
              </v-text-field>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import LEventsName from "@app-page-builder/mixins/events/name/LEventsName";
import { LUtilsHighlight } from "@app-page-builder/utils/highligh/LUtilsHighlight";
import { LUtilsSeeder } from "@app-page-builder/utils/seeder/LUtilsSeeder";
import * as types from "@app-page-builder/src/types/types";
import { StripTags } from "@core/helper/html/HtmlHelper";
import SImageUploader from "@components/uploader/SImageUploader.vue";
import { LMixinEvents } from "@app-page-builder/mixins/events/LMixinEvents";
import { EventBus } from "@core/events/EventBus";

export default {
  name: "LSettingsGallery",

  mixins: [LMixinEvents],

  components: {
    SImageUploader,
  },

  props: {
    builder: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    el: null,
    section: null,
    target: null,
    keyColumns: null, // ex. columns

    //----------------------- Bg image -----------------------
    show_edit_slide: false,
    dialog_pre: false,

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {
    effect() {
      return this.target?.effect;
    },
    upload_image_url() {
      return this.builder.getImageUploadUrl();
    },
  },
  watch: {
    show_edit_slide(dialog) {
      // Keep highlight active element:
      if (!dialog) LUtilsHighlight.RemoveAllElementFocusEditing();
      else if (this.el) LUtilsHighlight.Activate(this.el);
    },
  },
  created() {},
  mounted() {
    EventBus.$on(
      "show:LSettingsGallery",

      ({ el, section, target, keyColumns }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el = el;
        this.section = section;
        this.target = target;
        this.keyColumns = keyColumns;
        this.showDialog();
      },
    );

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――
    this.key_listener_keydown = (event) => {
      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        if (this.show_edit_slide) {
          // Close tools
          this.show_edit_slide = false;
          event.preventDefault();
          return false;
        }
      }
    };
    document.addEventListener("keydown", this.key_listener_keydown, true);
    //――――――――――――――――――――――  END Editor key listener ――――――――――――――――――――

    //█████████████████████████████████████████████████████████████
    //――――――――――――――― Event Bus ――――――――――――――――
    //█████████████████████████████████████████████████████████████
    // Listen for show loading data from server
    EventBus.$on(LEventsName.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.show_edit_slide = false;
    });
  },
  beforeUnmount() {
    EventBus.$off("show:LSettingsGallery");
    EventBus.$off(LEventsName.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    StripTags,
    showDialog() {
      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.show_edit_slide = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },
    //----------------------------------------------------------------------------

    addSlide() {
      this.target[this.keyColumns].push(LUtilsSeeder.seed(types.Slide));
    },

    removeSlide(index) {
      this.openDeleteAlert(() => {
        this.target[this.keyColumns].splice(index, 1);
      });
    },

    goToSlide(index) {},
  },
};
</script>

<style lang="scss" scoped></style>
