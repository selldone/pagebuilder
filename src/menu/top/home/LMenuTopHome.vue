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
    class="l--menu-top-tools"
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
        {{ $t("l_menu_top_home.hot_keys") }}

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
          <div class="my-2">{{ $t("l_menu_top_home.click_to_view_all") }}</div>
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
        {{ $t("global.commons.clone") }}

        <v-tooltip
          activator="parent"
          content-class="text-start small pa-3 bg-black"
          location="bottom"
          max-width="420"
          :open-delay="500"
        >
          <b class="d-block"
            >{{ $t("l_menu_top_home.clone_tooltip.title") }}
          </b>
          {{ $t("l_menu_top_home.clone_tooltip.subtitle") }}

          <ol class="my-1">
            <li>
              <v-icon size="small">near_me arrow_right_alt colorize</v-icon>
              {{ $t("l_menu_top_home.clone_tooltip.step_1") }}
            </li>
            <li>{{ $t("l_menu_top_home.clone_tooltip.step_2") }}</li>
            <li>
              <v-icon size="small"
                >colorize arrow_right_alt format_color_fill
              </v-icon>
              {{ $t("l_menu_top_home.clone_tooltip.step_3") }}
            </li>
          </ol>
          <div>
            <v-icon color="amber" size="x-small">circle</v-icon>
            {{ $t("global.commons.hotkey") }}:
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
              {{ $t("l_menu_top_home.show_side_menu_tooltip.subtitle") }}

              <div>
                <v-icon color="amber" size="x-small">circle</v-icon>
                {{ $t("global.commons.hotkey") }}:
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
              {{ $t("l_menu_top_home.sort_tooltip.subtitle") }}
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
            {{
              !$builder.isHideExtra
                ? $t("global.commons.edit")
                : $t("global.commons.view")
            }}

            <v-tooltip
              activator="parent"
              content-class="text-start small pa-3 bg-black"
              location="bottom"
              max-width="420"
              :open-delay="500"
            >
              <b class="d-block">
                {{ $t("l_menu_top_home.edit_mode_tooltip.title") }}</b
              >
              <div class="my-1">
                <v-icon size="small">edit</v-icon>
                <b class="mx-1"
                  >{{
                    $t("l_menu_top_home.edit_mode_tooltip.edit_mode_title")
                  }}:</b
                >
                {{ $t("l_menu_top_home.edit_mode_tooltip.edit_mode_msg") }}
              </div>
              <div class="my-1">
                <v-icon size="small">visibility</v-icon>
                <b class="mx-1"
                  >{{
                    $t("l_menu_top_home.edit_mode_tooltip.view_mode_title")
                  }}:</b
                >
                {{ $t("l_menu_top_home.edit_mode_tooltip.view_mode_msg") }}
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
            {{ $t("global.commons.repository") }}

            <v-tooltip
              activator="parent"
              content-class="text-start small pa-3 bg-black"
              location="bottom"
              max-width="420"
              :open-delay="500"
            >
              <b class="d-block">
                {{ $t("l_menu_top_home.repository_tooltip.title") }}
              </b>
              {{ $t("l_menu_top_home.repository_tooltip.subtitle") }}
            </v-tooltip>
          </v-btn>
        </div>
      </v-sheet>
    </div>

    <!-- ▃▃▃▃▃▃▃▃▃▃ Only For Popup ▃▃▃▃▃▃▃▃▃▃ -->
    <div v-if="is_popup && model">
      <v-sheet
        color="#222"
        class="d-flex ma-1 overflow-hidden justify-space-between"
        rounded="lg"
        height="38"
      >
        <v-chip prepend-icon="local_mall" size="small" class="ma-1" label>
          <small class="me-1">{{ $t("global.commons.buy") }}</small>
          {{ model.purchased }}
        </v-chip>

        <v-chip size="small" class="ma-1" label>
          <small class="me-1">{{ $t("global.commons.register") }}</small>

          <template v-if="model.registered === 'Yes'">
            <v-icon color="success" size="small" class="me-1"
              >check_circle</v-icon
            >
            {{ $t("global.commons.login") }}
          </template>
          <template v-else-if="model.registered === 'No'">
            <v-icon color="red" size="small" class="me-1">face</v-icon>
            {{ $t("global.commons.guest") }}
          </template>
          <template v-else>
            <v-icon size="small">all_inclusive</v-icon>
            {{ $t("global.commons.all") }}
          </template>
        </v-chip>

        <v-chip size="small" class="ma-1" label>
          <small class="me-1">{{ $t("global.commons.sex") }}</small>
          <v-icon v-if="model.sex === 'Male'" color="#0288D1" size="20"
            >male
          </v-icon>
          <v-icon v-else-if="model.sex === 'Female'" color="#E91E63" size="20"
            >female
          </v-icon>
          <v-icon v-else size="small">all_inclusive</v-icon>
        </v-chip>

        <v-chip size="small" class="ma-1" label>
          <small class="me-1">{{ $t("global.commons.age") }}</small>
          {{ model.age }}
        </v-chip>

        <v-chip size="small" class="ma-1" label>
          <small class="me-1">{{ $t("global.commons.levels") }}</small>
          <img
            v-for="level in model.levels"
            :key="level"
            :src="getCustomerClubLevel(level).icon"
            :title="$t(getCustomerClubLevel(level).name)"
            class="m-1"
            height="20"
            width="20"
          />
          <v-icon v-if="!model.levels?.length" size="small"
            >all_inclusive</v-icon
          >
        </v-chip>

        <v-chip
          v-if="model.countries?.length"
          size="small"
          class="ma-1"
          label
          prepend-icon="share_location"
        >
          <small class="me-1">{{ $t("global.commons.countries") }}</small>
          <flag
            v-for="con in model.countries"
            :key="con"
            :iso="con"
            :squared="false"
            class="m-1"
          />
        </v-chip>
      </v-sheet>
    </div>

    <!-- ▃▃▃▃▃▃▃▃▃▃ Prebuilt Sections Repository ▃▃▃▃▃▃▃▃▃▃ -->

    <v-divider vertical></v-divider>

    <div class="lmt-group">
      <u-button-ai-large
        v-if="aiPageGenerateFunction && page?.id"
        :loading="busy_ai_page"
        @click.stop="autoCreatePage"
        title="Auto Generate Page"
        size="small"
        :avatar-size="18"
        prefix-class=" "
        class="flex-grow-0"
      >
      </u-button-ai-large>
      <!-- ▃▃▃▃▃▃▃▃▃▃ Set as home page ▃▃▃▃▃▃▃▃▃▃ -->
      <div v-if="is_page && $shop && page" class="mx-2">
        <v-btn
          prepend-icon="home"
          class="tnt"
          variant="flat"
          :color="is_shop_home ? '#000' : '#fff'"
          :class="{ pen: is_shop_home }"
          size="small"
          rounded
          min-width="100%"
          @click="setAsHome"
          :loading="busy_set_home"
        >
          {{ is_shop_home ? "It's Home" : "Set as Home" }}

          <v-icon v-if="is_shop_home" end color="#009688">check_circle</v-icon>
        </v-btn>
      </div>
    </div>

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
            {{ $t("l_menu_top_home.live_view.title") }}
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
            :size="32"
            class="pa-0 overflow-visible mt-2 fadeIn delay_300"
            color="#FFC107"
            title="Online team members are viewing this page."
          ></u-dense-circles-users>
        </template>
        <template v-else>
          <b class="d-block">{{ $t("l_menu_top_home.live_view.title") }} </b>
          <span class="small d-block mt-2">{{
            $t("l_menu_top_home.live_view.subtitle")
          }}</span>
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

        {{ $t("l_menu_top_home.hotkeys_dialog.title") }}
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
                <div
                  v-html="$t('l_menu_top_home.hotkeys_dialog.augment_tips')"
                ></div>
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

          <v-btn
            :disabled="!has_redo"
            stacked
            @click.stop="history.redo()"
            :title="$t('global.commons.redo') + ' (⌘Ctrl + Y)'"
          >
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

<script lang="ts">
import { LMixinEvents } from "../../../../mixins/events/LMixinEvents.ts";
import UDenseCirclesUsers from "@selldone/components-vue/ui/dense-circles/users/UDenseCirclesUsers.vue";
import { CONSOLE } from "@selldone/core-js/helper/index";
import UButtonAiLarge from "@selldone/components-vue/ui/button/ai/large/UButtonAiLarge.vue";
import ClubMixin from "@selldone/components-vue/mixin/club/ClubMixin.ts";

export default {
  name: "LMenuTopHome",
  mixins: [LMixinEvents, ClubMixin],
  components: {
    UDenseCirclesUsers,
    UButtonAiLarge,
  },

  emits: ["click:save"],
  inject: ["$builder", "$shop"],
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

    aiPageGenerateFunction: {
      require: false,
      type: Function,
    },
  },

  data: () => ({
    show_hotkeys: false,

    visible_to_user: false,

    busy_ai_page: false,

    busy_set_home: false,
  }),

  computed: {
    is_shop_home() {
      return "" + this.$shop?.home === "" + this.page?.id;
    },
    ShortKeys() {
      return {
        "⌘ctrl+z": this.$t("global.commons.undo"),
        "⌘ctrl+y": this.$t("global.commons.redo"),
        "⌘ctrl+b": this.$t("l_menu_top_home.hotkeys.ctrl_b"),
        "⌘ctrl+i": this.$t("l_menu_top_home.hotkeys.ctrl_i"),
        "⌘ctrl+l": this.$t("l_menu_top_home.hotkeys.ctrl_l"),
        "⌘ctrl+u": this.$t("l_menu_top_home.hotkeys.ctrl_u"),
        "⌘ctrl+1": this.$t("l_menu_top_home.hotkeys.ctrl_1"),
        "⌘ctrl+2": this.$t("l_menu_top_home.hotkeys.ctrl_2"),
        "⌘ctrl+r": this.$t("l_menu_top_home.hotkeys.ctrl_r"),
        "⌘ctrl+s": this.$t("l_menu_top_home.hotkeys.ctrl_s"),
        "⌘Ctrl + E": this.$t("l_menu_top_home.hotkeys.ctrl_e"),
        TAB: this.$t("l_menu_top_home.hotkeys.tab"),
      };
    },

    is_page() {
      return this.$builder.isPage();
    },
    is_popup() {
      return this.$builder.isPopup();
    },
    is_menu() {
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

    model() {
      return this.$builder.model;
    },
  },

  watch: {},

  methods: {
    toggleLandingShowElementsRepository() {
      this.$store.commit(
        "setLandingShowElementsRepository",
        !this.landing_show_elements_repository,
      );
    },

    autoCreatePage() {
      const promise = this.aiPageGenerateFunction();
      if (!promise) return;

      // console.log("section -> ", section);
      this.busy_ai_page = true;

      promise
        .then((data) => {
          if (data?.page) {
            this.$builder.loadPage(data.page);
            CONSOLE.log("🆎 AI created page.");
          }
        })

        .finally(() => {
          this.busy_ai_page = false;
        });
    },

    setAsHome() {
      this.busy_set_home = true;

      axios
        .put(window.API.PUT_SHOP_HOME_PAGE(this.$shop.id), {
          page_id: this.page.id,
        })
        .then(({ data }) => {
          if (!data.error) {
            this.$shop.home = data.home;
            NotificationService.showSuccessAlert(
              null,
              "Home page has been set successfully.",
            );
          } else {
            NotificationService.showErrorAlert(null, data.error_msg);
          }
        })
        .catch((error) => {
          NotificationService.showLaravelError(error);
        })
        .finally(() => {
          this.busy_set_home = false;
        });
    },
  },

  created() {},
};
</script>

<style lang="scss" scoped></style>
