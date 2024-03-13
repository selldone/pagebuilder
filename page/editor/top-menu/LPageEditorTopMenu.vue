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
  <v-toolbar
      v-if="pageBuilder"
    v-intersect="
      (isIntersecting) => {
        visible_to_user = isIntersecting;
      }
    "
    class="s--landing-menus-top-tools border-bottom overflow-auto"
    color="#fff"
    flat
    v-bind="$attrs"
      height="auto"
  >
    <!-- ――――――――――――――――――――――  Tools A ―――――――――――――――――――― -->

    <v-toolbar-items>
      <v-btn
        :color="saveColor"
        :loading="busySave"
        stacked
        variant="elevated"
        width="84"
        @click="$emit('click:save')"
        class="ma-1 rounded-xl"
        min-height="56"
      >
        <v-icon size="20">{{ saveIcon }}</v-icon>
        <span class="small mt-1 tnt">{{ $t("global.actions.save") }}</span>
      </v-btn>

      <template v-if="inDesignTab">
        <!-- ▃▃▃▃▃▃▃▃▃▃ History ▃▃▃▃▃▃▃▃▃▃ -->

        <v-btn
          v-if="history"
          color="#333"
          icon
          stacked
          @click.stop="$emit('click:history')"
        >
          <v-icon>history</v-icon>
          <span class="small mt-1 tnt">{{
            $t("page_builder.design.tools.history")
          }}</span>

          <v-tooltip
            activator="parent"
            content-class="text-start small pa-2 bg-black"
            location="bottom"
            max-width="420"
          >
            <b class="d-block">
              {{ $t("page_builder.design.tools.history") }}
              <span v-if="histories">({{ histories.length }})</span>
            </b>
            Access the list of saved history checkpoints for this page. Easily
            restore a previous version with just a single click.

            <div v-if="histories_users">
              <small class="d-block mt-2">Contributors</small>
              <s-dense-images-circles-users
                :ids="histories_users"
              ></s-dense-images-circles-users>
            </div>
          </v-tooltip>
        </v-btn>

        <v-btn
          :disabled="!pageBuilder.hasUndo"
          :title="$t('global.commons.undo')"
          color="#333"
          icon
          stacked
          @click.stop="pageBuilder.goUndo()"
        >
          <v-icon>undo</v-icon>
          <span class="small mt-1 tnt">{{ $t("global.commons.undo") }}</span>
        </v-btn>

        <v-btn
          :disabled="!pageBuilder.hasRedo"
          color="#333"
          icon
          stacked
          @click.stop="pageBuilder.goRedo()"
        >
          <v-icon>redo</v-icon>
          <span class="small mt-1 tnt">{{ $t("global.commons.redo") }}</span>
        </v-btn>

        <v-divider class="m-0" vertical></v-divider>

        <div :class="{ '-active': pageBuilder.listShown }" class="down-bar-btn">
          <!-- ▃▃▃▃▃▃▃▃▃▃ Tools ▃▃▃▃▃▃▃▃▃▃ -->

          <v-btn
            :color="pageBuilder.listShown ? '#0b77bf' : '#333'"
            stacked
            @click.stop="pageBuilder.newSection"
          >
            <v-icon>construction</v-icon>

            <span class="small mt-1 tnt">{{
              $t("page_builder.design.tools.tools")
            }}</span>

            <v-tooltip
              activator="parent"
              content-class="text-start small pa-3 bg-black"
              location="bottom"
              max-width="420"
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
                <v-icon class="mx-1" dark size="small">sync_alt</v-icon>
                <b>TAB</b>
              </div>
            </v-tooltip>
          </v-btn>
        </div>

        <div
          :class="{ '-active': pageBuilder.$builder.isSorting }"
          class="down-bar-btn"
        >
          <!-- ▃▃▃▃▃▃▃▃▃▃ Sort ▃▃▃▃▃▃▃▃▃▃ -->

          <v-btn
            :color="pageBuilder.$builder.isSorting ? '#0b77bf' : '#333'"
            stacked
            @click.stop="pageBuilder.toggleSort"
          >
            <v-icon>open_with</v-icon>
            <div class="small mt-1 tnt">
              {{ $t("page_builder.design.tools.rearrange") }}
            </div>

            <v-tooltip
              activator="parent"
              content-class="text-start small pa-3 bg-black"
              location="bottom"
              max-width="420"
            >
              <b class="d-block">
                {{ $t("page_builder.design.tools.rearrange") }}
              </b>
              When you activate this feature, it will allow you to effortlessly
              rearrange and reorganize sections by dragging them.
            </v-tooltip>
          </v-btn>
        </div>

        <div
          :class="{ '-active': pageBuilder.$builder.isHideExtra }"
          class="down-bar-btn"
        >
          <!-- ▃▃▃▃▃▃▃▃▃▃ Edit/View Mode ▃▃▃▃▃▃▃▃▃▃ -->

          <v-btn
            :color="pageBuilder.$builder.toggleHideExtra ? '#0b77bf' : '#333'"
            stacked
            @click.stop="pageBuilder.toggleHideExtra()"
          >
            <v-icon
              >{{ !pageBuilder.$builder.isHideExtra ? "edit" : "visibility" }}
            </v-icon>

            <div class="small mt-1 tnt">
              {{ !pageBuilder.$builder.isHideExtra ? "Edit" : "View" }}
            </div>

            <v-tooltip
              activator="parent"
              content-class="text-start small pa-3 bg-black"
              location="bottom"
              max-width="420"
            >
              <b class="d-block"> Edit / View Mode </b>
              <div class="my-1">
                <v-icon dark size="small">edit</v-icon>
                <b class="mx-1">Edit Mode:</b> All editing tools will be shown.
              </div>
              <div class="my-1">
                <v-icon dark size="small">visibility</v-icon>
                <b class="mx-1">View Mode:</b> View what users see by hiding
                extra edit tools and empty texts.
              </div>
            </v-tooltip>
          </v-btn>
        </div>

        <v-divider class="m-0" vertical></v-divider>

        <!-- ▃▃▃▃▃▃▃▃▃▃ Page Style ▃▃▃▃▃▃▃▃▃▃ -->

        <v-btn
          :color="landing_show_page_style ? 'primary' : '#333'"
          :title="$t('page_builder.design.tools.style')"
          icon
          stacked
          @click.stop="
            ShowLSettingsPageStyle(pageBuilder.$builder.style, !landing_show_page_style)
          "
        >
          <v-icon>format_paint</v-icon>
          <div class="small mt-1 tnt">
            {{ $t("page_builder.design.tools.style") }}
          </div>

          <v-tooltip
            activator="parent"
            content-class="text-start small pa-3 bg-black"
            location="bottom"
            max-width="420"
          >
            <b class="d-block"> Page Style </b>
            Personalize the primary page's appearance, such as background and
            top menu here.
          </v-tooltip>
        </v-btn>

        <!-- ▃▃▃▃▃▃▃▃▃▃ Typography ▃▃▃▃▃▃▃▃▃▃ -->

        <v-btn
          :color="'#333'"
          :title="$t('page_builder.design.tools.typography')"
          icon
          stacked
          @click.stop="ShowLSettingsPageTypography(style)"
        >
          <v-icon>text_fields</v-icon>
          <div class="small mt-1 tnt">
            {{ $t("page_builder.design.tools.typography")?.substring(0, 4) }}
          </div>

          <v-tooltip
            activator="parent"
            content-class="text-start small pa-3 bg-black"
            location="bottom"
            max-width="420"
          >
            <b class="d-block"> Typography </b>
            Configure the typography, fonts, and size of elements on the page.
          </v-tooltip>
        </v-btn>

        <!-- ▃▃▃▃▃▃▃▃▃▃ Prebuilt Sections Repository ▃▃▃▃▃▃▃▃▃▃ -->

        <v-btn
          :color="landing_show_elements_repository ? 'primary' : '#333'"
          icon
          stacked
          @click.stop="toggleLandingShowElementsRepository()"
        >
          <v-icon>widgets</v-icon>
          <div class="small mt-1 tnt">Repository</div>

          <v-tooltip
            activator="parent"
            content-class="text-start small pa-3 bg-black"
            location="bottom"
            max-width="420"
          >
            <b class="d-block"> Prebuilt Sections </b>
            Enable or disable the display of pre-constructed and designed
            sections. These sections are created using standard sections
            available in the left menu, demonstrating the versatility of this
            page builder.
          </v-tooltip>
        </v-btn>

        <!-- ▃▃▃▃▃▃▃▃▃▃ Clone Style ▃▃▃▃▃▃▃▃▃▃ -->

        <v-btn
          :color="pageBuilder.$builder.cloneStyle ? 'primary' : '#333'"
          icon
          stacked
          @click.stop="pageBuilder.$builder.toggleCloneStyleMode()"
        >
          <v-icon>colorize</v-icon>
          <div class="small mt-1 tnt">Clone</div>

          <v-tooltip
            activator="parent"
            content-class="text-start small pa-3 bg-black"
            location="bottom"
            max-width="420"
          >
            <b class="d-block"> Clone Style </b>
            Using this tool, you can duplicate styles such as fonts,
            backgrounds, margins, and borders. To do this, follow these steps:

            <ol class="my-1">
              <li>
                <v-icon dark size="small"
                  >near_me arrow_right_alt colorize
                </v-icon>
                Enable the tool and hover your mouse over text, columns, or
                images; the cursor will resemble a pipette.
              </li>
              <li>Click on the target element to copy its style.</li>
              <li>
                <v-icon dark size="small"
                  >colorize arrow_right_alt format_color_fill
                </v-icon>
                The cursor will revert to a palette; click on the destination
                element to apply the copied style.
              </li>
            </ol>
            <div>
              <v-icon color="amber" size="x-small">circle</v-icon>
              Hotkey:
              <v-icon class="mx-1" dark size="small">sync_alt</v-icon>
              <b>⌘Ctrl + E</b>
            </div>
          </v-tooltip>
        </v-btn>

        <!-- ▃▃▃▃▃▃▃▃▃▃ AI ▃▃▃▃▃▃▃▃▃▃ -->

        <ai-button
          v-if="hasAiButton"
          :tooltip="null"
          @click="$emit('click:prompt')"
        >
          <v-tooltip
            activator="parent"
            content-class="text-start small pa-3 bg-black"
            location="bottom"
            max-width="420"
          >
            <b class="d-block"> AI Assistance </b>
            Utilize this tool to configure prompts, AI models, and plugins,
            enabling the automatic generation of text, images, and sections with
            the help of your AI assistant.
            <ol class="my-1">
              <li>Enter page prompt.</li>
              <li>
                Set custom prompt by adding
                <span style="font-size: 1.3em">🆕</span> or
                <code>prompt:</code> to fields. (optional)
              </li>
              <li>
                Click on the
                <img
                  :height="24"
                  :width="24"
                  class="mx-1"
                  src="@components/assets/icons/ci-logo.png"
                />left side of the section.
              </li>
            </ol>
          </v-tooltip>
        </ai-button>
      </template>
      <v-divider class="m-0" vertical></v-divider>

      <!-- ▃▃▃▃▃▃▃▃▃▃ Import ▃▃▃▃▃▃▃▃▃▃ -->

      <v-btn color="#333" icon stacked @click="show_import = true">
        <v-icon size="small">fa:fas fa-file-import</v-icon>

        <div class="small mt-1 tnt">Import</div>

        <v-tooltip
          activator="parent"
          content-class="text-start small pa-3 bg-black"
          location="bottom"
          max-width="420"
        >
          <b class="d-block"> Import Landing Page </b>
          <v-icon dark size="small">folder</v-icon>
          <b class="mx-1">Load: </b> You can import a .landing file, which will
          replace all existing sections with the newly added ones.
        </v-tooltip>
      </v-btn>

      <!-- ▃▃▃▃▃▃▃▃▃▃ Export ▃▃▃▃▃▃▃▃▃▃ -->

      <v-btn color="#333" icon stacked @click="exportFile()">
        <v-icon size="small">fa:fas fa-file-export</v-icon>

        <div class="small mt-1 tnt">Export</div>

        <v-tooltip
          activator="parent"
          content-class="text-start small pa-3 bg-black"
          location="bottom"
          max-width="420"
        >
          <b class="d-block"> Export Landing Page </b>
          <v-icon dark size="small">save</v-icon>
          <b class="mx-1">Save: </b> You have the option to export this page as
          a .landing file, which can be imported into other shops or repurposed
          for creating additional pages.
        </v-tooltip>
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <!-- ――――――――――――――――――――――  Tools B ―――――――――――――――――――― -->
    <v-toolbar-items v-if="inDesignTab">
      <!-- ▃▃▃▃▃▃▃▃▃▃ LTR / RTL ▃▃▃▃▃▃▃▃▃▃ -->

      <v-btn
        icon
        @click="
          page.direction =
            page.direction === 'rtl'
              ? 'ltr'
              : page.direction === 'auto'
                ? 'rtl'
                : 'auto'
        "
      >
        <v-icon v-if="page.direction !== 'auto'" color="#111">
          {{
            page.direction === "rtl"
              ? "format_textdirection_r_to_l"
              : "format_textdirection_l_to_r"
          }}
        </v-icon>
        <span v-else> Auto </span>
        <v-tooltip
          activator="parent"
          content-class="text-start small pa-3 bg-black"
          location="bottom"
          max-width="420"
        >
          <b class="d-block"> LTR / RTL </b>
          <div class="my-1">
            <v-icon dark size="small">format_textdirection_r_to_l</v-icon>
            <b class="mx-1">RTL:</b> Adjust the page orientation to
            right-to-left.
          </div>
          <div class="my-1">
            <v-icon dark size="small">format_textdirection_l_to_r</v-icon>
            <b class="mx-1">LTR:</b> Adjust the page orientation to
            left-to-right.
          </div>

          <div class="my-1">
            <b class="me-1">Auto:</b> The page direction set automatically based
            on content.
          </div>
        </v-tooltip>
      </v-btn>

      <v-btn color="#111" stacked variant="text" @click="show_hotkeys = true">
        <v-icon start>keyboard_alt</v-icon>

        <div class="small mt-1 tnt">Hot Keys</div>

        <v-tooltip
          activator="parent"
          content-class="text-start small pa-3 bg-black"
          location="bottom"
          max-width="420"
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
    </v-toolbar-items>
  </v-toolbar>

  <!-- ████████████████████ Dialog > Import file ████████████████████ -->
  <v-dialog
    v-model="show_import"
    :max-width="
      $vuetify.display.xlAndUp
        ? 860
        : $vuetify.display.lgAndUp
          ? 620
          : undefined
    "
    :scrim="false"
    color="#1e1e1e"
    dark
  >
    <v-card class="text-start" flat>
      <v-card-title></v-card-title>
      <v-card-text>
        <s-widget-header icon="input" title="Import Design File">
        </s-widget-header>
        <v-list-subheader>
          <div>
            You can import custom-designed pages in this section. Ensure that
            the file is in the <b>.landing</b> format.
          </div>
        </v-list-subheader>

        <!-- ⬬⬬⬬⬬⬬⬬⬬⬬⬬ Drop Zone ⬬⬬⬬⬬⬬⬬⬬⬬⬬ -->

        <s-drop-zone
          class="min-height-40vh my-3"
          extension=".landing"
          hint="Drag and drop your landing page file here, or click on the input field at the top."
          icon="design_services"
          label="Select template file (.landing)"
          @select:file="importFile"
        ></s-drop-zone>
      </v-card-text>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="show_import = false">
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>

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
  >
    <v-scroll-y-reverse-transition>
      <div v-if="!visible_to_user">
        <v-btn-group color="#000" rounded="xl">
          <!-- ▃▃▃▃▃▃▃▃▃▃ History ▃▃▃▃▃▃▃▃▃▃ -->

          <v-btn v-if="history" stacked @click.stop="$emit('click:history')">
            <v-icon>history</v-icon>
            <span class="small mt-1 tnt">{{
              $t("page_builder.design.tools.history")
            }}</span>
          </v-btn>

          <v-btn
            :disabled="!pageBuilder.hasUndo"
            :title="$t('global.commons.undo')"
            stacked
            @click.stop="pageBuilder.goUndo()"
          >
            <v-icon>undo</v-icon>
            <span class="small mt-1 tnt">{{ $t("global.commons.undo") }}</span>
          </v-btn>

          <v-btn
            :disabled="!pageBuilder.hasRedo"
            stacked
            @click.stop="pageBuilder.goRedo()"
          >
            <v-icon>redo</v-icon>
            <span class="small mt-1 tnt">{{ $t("global.commons.redo") }}</span>
          </v-btn>

          <!-- ▃▃▃▃▃▃▃▃▃▃ Clone Style ▃▃▃▃▃▃▃▃▃▃ -->

          <v-btn
            :color="pageBuilder.$builder.cloneStyle ? 'primary' : '#000'"
            icon
            stacked
            @click.stop="pageBuilder.$builder.toggleCloneStyleMode()"
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
import { SetupService } from "@core/server/SetupService";
import SDropZone from "@components/uploader/SDropZone.vue";
import AiButton from "@components/ui/button/ai/AiButton.vue";
import { LMixinEvents } from "@app-page-builder/mixins/events/LMixinEvents";
import { LUtilsMigration } from "@app-page-builder/utils/migration/LUtilsMigration";
import SDenseImagesCirclesUsers from "@components/user/dense-circles/SDenseImagesCirclesUsers.vue";

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
  name: "LPageEditorTopMenu",

  components: { SDenseImagesCirclesUsers, AiButton, SDropZone },
  mixins: [LMixinEvents],
  props: {
    shop: {
      required: false,
      type: Object,
    },

    page: {
      require: true,
    },
    histories: {
      type: Array,
    },

    pageBuilder: {
      require: true,
    },

    busySave: {
      type: Boolean,
      default: false,
    },

    inDesignTab: {
      type: Boolean,
      default: false,
    },

    // Options:
    history: {
      type: Boolean,
      default: false,
    },

    saveIcon: {
      default: "save",
    },
    saveColor: {
      default: "success",
    },

    hasAiButton: {
      type: Boolean,
      default: false,
    },
  },

  computed: {


    landing_show_page_style() {
      return this.$store.getters.getLandingShowPageStyle;
    },
    landing_show_elements_repository() {
      return this.$store.getters.getLandingShowElementsRepository;
    },

    histories_users() {
      return this.histories
        ?.map((h) => h.user_id)
        .unique()
        .removeNulls();
    },
  },

  data: () => ({
    ShortKeys: ShortKeys,
    show_hotkeys: false,

    show_import: false,

    visible_to_user: false,
  }),

  methods: {
    toggleLandingShowElementsRepository() {
      this.$store.commit(
        "setLandingShowElementsRepository",
        !this.landing_show_elements_repository,
      );
    },

    exportFile() {
      const out = {
        content: {
          sections: this.page.content.sections,
          style: this.page.content.style,
        },
        title: this.page.title,
        description: this.page.description,
        image: this.page.image,
        direction: this.page.direction,
        note: this.page.note,
        service: SetupService.MainServiceUrl(),
      };
      this.downloadText(
        this.page.title + ".landing",
        JSON.stringify(out, null, 4),
      );
    },

    importFile(file) {
      if (!file) return;

      this.current_history_id = null;

      try {
        const fr = new FileReader();
        fr.onload = () => {
          const template = JSON.parse(fr.result);
          this.show_import = false;

          if (
            !template.content ||
            !template.content.sections ||
            !Array.isArray(template.content.sections) ||
            !template.content.sections.length
          ) {
            this.showErrorAlert(null, "Sections in the file is empty!");
          }

          // Migrate from old version:
          template.content = LUtilsMigration.MigratePageContent(template.content);

          const components = this.pageBuilder.$builder.components;

          const valid_sections = [];

          template.content.sections.forEach((section) => {
            if (!section.name || !section.data) {
              this.showErrorAlert(null, `Invalid section structure detected!`);
              return;
            }
            if (components[section.name]) {
              valid_sections.push(section);
            } else {
              this.showErrorAlert(
                null,
                `This section in the landing file not found: ${section.name}`,
              );
            }
          });

          this.page.content.sections = valid_sections;
          this.page.content.style = template.content.style;

          this.page.title = template.title;
          this.page.description = template.description;
          this.page.image = template.image;
          this.page.direction = template.direction;
          this.page.note = template.note;

          this.pageBuilder.setPage(this.page.content);

          /////this.pageBuilder.title = "Page builder | " + this.page.title + " 📐";

          //   this.$emit('request:loadData',this.page);

          this.showSuccessAlert(null, "Landing page file load successfully.");
        };
        fr.onerror = () => {
          this.showErrorAlert(null, "Can not read file!");
        };

        fr.readAsText(file);
      } catch (e) {
        this.showErrorAlert(null, "Bad file format!");
        console.error(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.s--landing-menus-top-tools {
  ::v-deep(.v-toolbar-items) {
    .v-btn {
      padding: 4px !important;
      width: auto;
      min-width: 48px !important;
    }
  }
  ::v-deep(.v-toolbar__content){
    padding: 0 !important;
  }
}

.down-bar-btn {
  position: relative;

  &:after {
    content: " ";
    background: #eee;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
  }

  &.-active {
    &:after {
      background: #0b77bf;
    }
  }

  button {
    min-height: 100% !important;
  }
}

.info-item {
  font-size: 0.8rem;
  margin: 3px 6px !important;
  text-align: left;
  direction: ltr;
  color: #fff;

  b {
    text-transform: uppercase;
    padding-right: 4px;
  }
}
</style>
