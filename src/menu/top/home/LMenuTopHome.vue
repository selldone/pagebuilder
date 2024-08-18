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
  <div
    v-intersect="
      (isIntersecting) => {
        visible_to_user = isIntersecting;
      }
    "
    class="l--menu-top-tools "
    v-bind="$attrs"
  >
    <!-- ――――――――――――――――――――――  Tools A ―――――――――――――――――――― -->

    <v-sheet color="#fff" class="pa-1 ma-1" rounded="xl">
      <v-btn
        v-if="!demo"
        :color="saveColor"
        :loading="busySave"
        stacked
        variant="elevated"
        width="84"
        @click="$emit('click:save')"
        rounded="xl"
        min-height="100%"
        elevation="3"
      >
        <v-icon size="20">{{ saveIcon }}</v-icon>
        <span class="small mt-1 tnt">{{ $t("global.actions.save") }}</span>
      </v-btn>
    </v-sheet>

    <div class="lmt-group">
      <div>
        <v-btn
          :disabled="!has_undo"
          :title="$t('global.commons.undo') + ' (⌘Ctrl + Z)'"
          @click.stop="history.undo()"
          prepend-icon="undo"
          variant="text"
          size="small"
          class="tnt"
        >
          {{ $t("global.commons.undo") }}
        </v-btn>

        <v-btn
          :disabled="!has_redo"
          @click.stop="history.redo()"
          :title="$t('global.commons.redo') + ' (⌘Ctrl + Y)'"
          prepend-icon="redo"
          variant="text"
          size="small"
          class="tnt"
        >
          {{ $t("global.commons.redo") }}
        </v-btn>
      </div>

      <v-btn
        variant="text"
        size="small"
        @click="show_hotkeys = true"
        class="tnt"
        prepend-icon="keyboard_alt"
      >
        Hot Keys

        <v-tooltip
          activator="parent"
          content-class="text-start small pa-3 bg-black"
          location="bottom"
          max-width="420"
          :open-delay="500"
        >
          <p
            v-for="short_key in Object.keys(ShortKeys).limit(5)"
            :key="short_key"
            class="info-item"
          >
            <b>{{ short_key }}</b
            >: <span v-html="ShortKeys[short_key]"></span>
          </p>
          <div class="my-2">Click to view all...</div>
        </v-tooltip>
      </v-btn>
    </div>

    <v-divider vertical></v-divider>

    <!-- ▃▃▃▃▃▃▃▃▃▃ Clone Style ▃▃▃▃▃▃▃▃▃▃ -->

    <div class="lmt-group">
      <v-btn
        :color="$builder.cloneStyle ? 'amber' : '#fff'"
        variant="text"
        @click.stop="$builder.toggleCloneStyleMode()"
        prepend-icon="colorize"
        size="small"
        class="tnt"
      >
        Clone

        <v-tooltip
          activator="parent"
          content-class="text-start small pa-3 bg-black"
          location="bottom"
          max-width="420"
          :open-delay="500"
        >
          <b class="d-block"> Clone Style </b>
          Using this tool, you can duplicate styles such as fonts, backgrounds,
          margins, and borders. To do this, follow these steps:

          <ol class="my-1">
            <li>
              <v-icon size="small">near_me arrow_right_alt colorize</v-icon>
              Enable the tool and hover your mouse over text, columns, or
              images; the cursor will resemble a pipette.
            </li>
            <li>Click on the target element to copy its style.</li>
            <li>
              <v-icon size="small"
                >colorize arrow_right_alt format_color_fill
              </v-icon>
              The cursor will revert to a palette; click on the destination
              element to apply the copied style.
            </li>
          </ol>
          <div>
            <v-icon color="amber" size="x-small">circle</v-icon>
            Hotkey:
            <v-icon class="mx-1" size="small">sync_alt</v-icon>
            <b>⌘Ctrl + E</b>
          </div>
        </v-tooltip>
      </v-btn>
    </div>

    <v-divider vertical></v-divider>

    <div class="lmt-group">
      <v-sheet
        color="#222"
        class="d-flex ma-1 overflow-hidden justify-space-between"
        rounded="lg"
        height="38"
      >
        <div
          :class="{ '-active': $builder.showLeftMenu }"
          class="down-bar-btn ma-1 rounded-lg"
        >
          <!-- ▃▃▃▃▃▃▃▃▃▃ Tools ▃▃▃▃▃▃▃▃▃▃ -->

          <v-btn
            :color="$builder.showLeftMenu ? 'amber' : '#111'"
            variant="flat"
            size="small"
            @click.stop="$builder.showLeftMenu = !$builder.showLeftMenu"
            class="tnt"
            prepend-icon="construction"
          >
            {{ $t("page_builder.design.tools.tools") }}

            <v-tooltip
              activator="parent"
              content-class="text-start small pa-3 bg-black"
              location="bottom"
              max-width="420"
              :open-delay="500"
            >
              <b class="d-block">
                {{ $t("page_builder.design.tools.tools") }}
              </b>
              You have the option to enable or disable the display of the side
              menu, which includes all section categories for constructing your
              page.

              <div>
                <v-icon color="amber" size="x-small">circle</v-icon>
                Hotkey:
                <v-icon class="mx-1" size="small">sync_alt</v-icon>
                <b>TAB</b>
              </div>
            </v-tooltip>
          </v-btn>
        </div>

        <div
          :class="{ '-active': $builder.isSorting }"
          class="down-bar-btn ma-1 rounded-lg"
        >
          <!-- ▃▃▃▃▃▃▃▃▃▃ Sort ▃▃▃▃▃▃▃▃▃▃ -->

          <v-btn
            :color="$builder.isSorting ? 'amber' : '#111'"
            variant="flat"
            size="small"
            class="tnt"
            @click.stop="$builder.isSorting = !$builder.isSorting"
            prepend-icon="open_with"
          >
            {{ $t("page_builder.design.tools.rearrange") }}

            <v-tooltip
              activator="parent"
              content-class="text-start small pa-3 bg-black"
              location="bottom"
              max-width="420"
              :open-delay="500"
            >
              <b class="d-block">
                {{ $t("page_builder.design.tools.rearrange") }}
              </b>
              When you activate this feature, it will allow you to effortlessly
              rearrange and reorganize sections by dragging them.
            </v-tooltip>
          </v-btn>
        </div>
      </v-sheet>

      <v-sheet
        color="#222"
        class="d-flex ma-1 overflow-hidden justify-space-between"
        rounded="lg"
        height="38"
      >
        <div
          :class="{ '-active': $builder.isHideExtra }"
          class="down-bar-btn ma-1 rounded-lg"
        >
          <!-- ▃▃▃▃▃▃▃▃▃▃ Edit/View Mode ▃▃▃▃▃▃▃▃▃▃ -->

          <v-btn
            color="#111"
            variant="flat"
            size="small"
            class="tnt"
            @click.stop="$builder.isHideExtra = !$builder.isHideExtra"
            :prepend-icon="$builder.isHideExtra ? 'visibility' : 'edit'"
          >
            {{ !$builder.isHideExtra ? "Edit" : "View" }}

            <v-tooltip
              activator="parent"
              content-class="text-start small pa-3 bg-black"
              location="bottom"
              max-width="420"
              :open-delay="500"
            >
              <b class="d-block"> Edit / View Mode </b>
              <div class="my-1">
                <v-icon size="small">edit</v-icon>
                <b class="mx-1">Edit Mode:</b> All editing tools will be shown.
              </div>
              <div class="my-1">
                <v-icon size="small">visibility</v-icon>
                <b class="mx-1">View Mode:</b> View what users see by hiding
                extra edit tools and empty texts.
              </div>
            </v-tooltip>
          </v-btn>
        </div>
        <div
          :class="{ '-active': landing_show_elements_repository }"
          class="down-bar-btn ma-1 rounded-lg"
        >
          <v-btn
            color="#111"
            variant="flat"
            size="small"
            class="tnt"
            @click.stop="toggleLandingShowElementsRepository()"
            prepend-icon="widgets"
          >
            Repository

            <v-tooltip
              activator="parent"
              content-class="text-start small pa-3 bg-black"
              location="bottom"
              max-width="420"
              :open-delay="500"
            >
              <b class="d-block"> Prebuilt Sections </b>
              Enable or disable the display of pre-constructed and designed
              sections. These sections are created using standard sections
              available in the left menu, demonstrating the versatility of this
              page builder.
            </v-tooltip>
          </v-btn>
        </div>
      </v-sheet>
    </div>

    <!-- ▃▃▃▃▃▃▃▃▃▃ Prebuilt Sections Repository ▃▃▃▃▃▃▃▃▃▃ -->

    <v-divider vertical></v-divider>

    <v-spacer></v-spacer>

    <!-- ――――――――――――――――――――――  Livestream ―――――――――――――――――――― -->

    <v-btn
      v-if="hasLiveView"
      :class="{ disabled: !page }"
      :color="audiences?.length ? '#111' : '#111'"
      :to="{
        name: 'BPageLandingLive',
        params: { shop_id: page.shop_id, page_id: page.id },
        query: { responsible: true },
      }"
      class="py-1 px-2 text-start pp usn fadeIn tnt hover-scale-tiny"
      style="min-height: 54px"
      :style="
        $vuetify.locale.isRtl
          ? 'border-right: solid #1E1E1E 4px'
          : 'border-left: solid #1E1E1E 4px'
      "
      rounded="0"
      target="_blank"
      @click="$builder.livestream.setEnable(true) /*Enable live stream*/"
      variant="elevated"
      ripple
      height="100"
    >
      <v-icon size="24">cast</v-icon>
      <div class="ms-2 flex-grow-1" style="min-width: 160px">
        <template v-if="audiences?.length">
          <b class="d-block fadeInUp small">
            Live Preview
            <v-icon
              v-if="audiences?.length"
              class="mx-1 blink-me"
              color="#fff"
              size="x-small"
              >circle
            </v-icon>
          </b>
          <u-dense-circles-users
            :ids="audiences"
            :limit="5"
            :size="36"
            class="pa-0 overflow-visible mt-2 fadeIn delay_300"
            color="#FFC107"
            title="Online team members are viewing this page."
          ></u-dense-circles-users>
        </template>
        <template v-else>
          <b class="d-block"> Live Preview </b>
          <span class="small d-block mt-1">View updates in real-time.</span>
        </template>
      </div>
    </v-btn>
  </div>

  <!-- ████████████████████ Dialog > Hot keys ████████████████████ -->
  <v-dialog
    v-model="show_hotkeys"
    fullscreen
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card class="text-start">
      <v-card-title>
        <v-icon class="me-1">keyboard</v-icon>
        Hotkeys
      </v-card-title>
      <v-card-text class="text-start">
        <v-container>
          <v-row>
            <v-col
              v-for="(desc, key) in ShortKeys"
              :key="key"
              cols="6"
              md="3"
              sm="4"
            >
              <div class="border rounded-lg pa-3 min-h-100">
                <div class="text-h4 text-uppercase">
                  {{ key }}
                </div>
                <div v-html="desc"></div>
              </div>
            </v-col>

            <v-col cols="12">
              <div class="border rounded-lg pa-3 min-h-100">
                <div class="text-h4 text-uppercase">
                  {{ "\{\{" }}<span class="text-blue">key</span>{{ "\}\}" }}
                </div>
                <div>
                  "You can load dynamic content on your page and replace it with
                  <b>augment</b> values. Augment is used for custom dynamic
                  pages such as <b>Products</b>, <b>Categories</b>, and
                  <b>Include Items</b>. To set an image to load dynamically,
                  click on <b>Feeder</b> and select <b>Dynamic Source</b> for
                  that image.
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="show_hotkeys = false">
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- ████████████████████ Floating Menu (minimized on top) ████████████████████ -->

  <div
    style="
      position: fixed;
      top: 8px;
      left: 50%;
      transform: translate(-50%, 0);
      z-index: 100;
    "
    v-if="!demo"
  >
    <v-scroll-y-reverse-transition>
      <div v-if="!visible_to_user">
        <v-btn-group color="#000" rounded="xl">
          <v-btn
            :disabled="!has_undo"
            :title="$t('global.commons.undo') + ' (⌘Ctrl + Z)'"
            stacked
            @click.stop="history.undo()"
          >
            <v-icon>undo</v-icon>
            <span class="small mt-1 tnt">{{ $t("global.commons.undo") }}</span>
          </v-btn>

          <v-btn :disabled="!has_redo" stacked @click.stop="history.redo()"     :title="$t('global.commons.redo') + ' (⌘Ctrl + Y)'">
            <v-icon>redo</v-icon>
            <span class="small mt-1 tnt">{{ $t("global.commons.redo") }}</span>
          </v-btn>

          <!-- ▃▃▃▃▃▃▃▃▃▃ Clone Style ▃▃▃▃▃▃▃▃▃▃ -->

          <v-btn
            :color="$builder.cloneStyle ? 'primary' : '#000'"
            icon
            stacked
            @click.stop="$builder.toggleCloneStyleMode()"
            title="⌘Ctrl + E"
          >
            <v-icon>colorize</v-icon>
            <div class="small mt-1 tnt">Clone</div>
          </v-btn>
        </v-btn-group>
      </div>
    </v-scroll-y-reverse-transition>
  </div>
</template>

<script>
import { LMixinEvents } from "../../../../mixins/events/LMixinEvents.ts";
import UDenseCirclesUsers from "@selldone/components-vue/ui/dense-circles/users/UDenseCirclesUsers.vue";

const ShortKeys = {
  "⌘ctrl+z": "Undo",
  "⌘ctrl+y": "Redo",
  "⌘ctrl+b": "Toggles bold on/off  of selected text | <b>Make me bold</b>",
  "⌘ctrl+i": "Toggles italics on/off of selected text | <i>Make me italic</i>",
  "⌘ctrl+l":
    "Toggles strikethrough on/off of selected text | <s>Strike through me</s>",
  "⌘ctrl+u": "Toggles underline on/off of selected text | <u>Underline me</u>",
  "⌘ctrl+1": "Decrease font size of selected box  | <big>Make me big</big>",
  "⌘ctrl+2":
    "Increase font size of selected box  | <small>Make me small</small>",
  "⌘ctrl+r": "Removes all formatting of selected text | Clean all style",
  "⌘ctrl+s": "Save page",
  TAB: "Switch scale mode",
  "⌘Ctrl + E": "Switch clone style mode",
};

export default {
  name: "LMenuTopHome",

  components: {
    UDenseCirclesUsers,
  },
  mixins: [LMixinEvents],
  emits: ["click:save"],
  inject: ["$builder",'$shop'],
  props: {


    page: {
      require: true,
    },
    histories: {
      type: Array,
    },

    busySave: {
      type: Boolean,
      default: false,
    },

    // Options:

    saveIcon: {
      default: "save",
    },
    saveColor: {
      default: "primary",
    },

    demo: Boolean,

    liveStream: {},
  },

  data: () => ({
    ShortKeys: ShortKeys,
    show_hotkeys: false,

    visible_to_user: false,
  }),

  computed: {
    is_page() {
      return this.$builder.isPage();
    },
    is_popup() {
      return this.$builder.isPopup();
    },
    is_menu(){
      return this.$builder.isMenu();
    },

    audiences() {
      return this.$builder.livestream.audiences;
    },

    landing_show_elements_repository() {
      return this.$store.getters.getLandingShowElementsRepository;
    },
    hasLiveView() {
      return this.is_page && this.page?.id && this.page.shop_id;
    },

    history() {
      return this.$builder.history;
    },
    has_undo() {
      return this.history.hasUndo();
    },
    has_redo() {
      return this.history.hasRedo();
    },
  },

  watch: {

  },

  methods: {
    toggleLandingShowElementsRepository() {
      this.$store.commit(
        "setLandingShowElementsRepository",
        !this.landing_show_elements_repository,
      );
    },
  },

  created() {},
};
</script>

<style lang="scss" scoped></style>
