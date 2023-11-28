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
  <v-toolbar flat color="#fff" class="neg-margin stick-menu border-bottom">
    <!--
        <p><v-icon color="blue">info</v-icon> Before save, make sure all content and elements loaded! Scroll to the end of the page.</p>
        -->
    <!-- ――――――――――――――――――――――  Tools A ―――――――――――――――――――― -->

    <v-toolbar-items>
      <v-btn
        depressed
        :color="saveColor"
        dark
        @click="$emit('click:save')"
        :loading="busySave"
        :title="$t('global.commons.save_changes')"
        ><v-icon>{{ saveIcon }}</v-icon></v-btn
      >

      <template v-if="inDesignTab">
        <!-- ▃▃▃▃▃▃▃▃▃▃ History ▃▃▃▃▃▃▃▃▃▃ -->

        <v-tooltip v-if="history" bottom color="#111" max-width="420">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon
              @click.stop="$emit('click:history')"
              color="#333"
              class="sub-caption b4px"
              :caption="$t('page_builder.design.tools.history')"
            >
              <v-icon>history</v-icon>
            </v-btn>
          </template>
          <div class="text-start small pa-1">
            <b class="d-block">
              {{ $t("page_builder.design.tools.history") }}
            </b>
            Access the list of saved history checkpoints for this page. Easily
            restore a previous version with just a single click.
          </div>
        </v-tooltip>

        <v-btn
          icon
          :title="$t('global.commons.undo')"
          color="#333"
          @click.stop="pageBuilder.goUndo()"
          class="sub-caption b4px"
          :caption="$t('global.commons.undo')"
          :disabled="!has_undo"
        >
          <v-icon>undo</v-icon>
        </v-btn>

        <v-btn
          icon
          :title="$t('global.commons.redo')"
          color="#333"
          @click.stop="pageBuilder.goRedo()"
          class="sub-caption b4px"
          :caption="$t('global.commons.redo')"
          :disabled="!has_redo"
        >
          <v-icon>redo</v-icon>
        </v-btn>

        <v-divider vertical class="m-0"></v-divider>

        <div class="down-bar-btn" :class="{ '-active': pageBuilder.listShown }">
          <!-- ▃▃▃▃▃▃▃▃▃▃ Tools ▃▃▃▃▃▃▃▃▃▃ -->

          <v-tooltip bottom color="#111" max-width="420">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                tile
                :title="$t('page_builder.design.tools.tools')"
                :color="pageBuilder.listShown ? '#0b77bf' : '#333'"
                :dark="pageBuilder.listShown"
                @click.stop="pageBuilder.newSection"
                class="sub-caption b4px"
                :caption="$t('page_builder.design.tools.tools')"
              >
                <v-icon>construction</v-icon>
              </v-btn>
            </template>
            <div class="text-start small pa-1">
              <b class="d-block">
                {{ $t("page_builder.design.tools.tools") }}
              </b>
              You have the option to enable or disable the display of the side
              menu, which includes all section categories for constructing your
              page.

              <div>
                <v-icon x-small color="amber">circle</v-icon> Hotkey:
                <v-icon small dark class="mx-1">sync_alt</v-icon><b>TAB</b>
              </div>
            </div>
          </v-tooltip>
        </div>

        <div
          class="down-bar-btn"
          :class="{ '-active': pageBuilder.$builder.isSorting }"
        >
          <!-- ▃▃▃▃▃▃▃▃▃▃ Sort ▃▃▃▃▃▃▃▃▃▃ -->

          <v-tooltip bottom color="#111" max-width="420">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                tile
                :color="pageBuilder.$builder.isSorting ? '#0b77bf' : '#333'"
                :dark="pageBuilder.$builder.isSorting"
                @click.stop="pageBuilder.toggleSort"
                class="sub-caption b4px"
                :caption="$t('page_builder.design.tools.rearrange')"
              >
                <v-icon>open_with</v-icon>
              </v-btn>
            </template>
            <div class="text-start small pa-1">
              <b class="d-block">
                {{ $t("page_builder.design.tools.rearrange") }}
              </b>
              When you activate this feature, it will allow you to effortlessly
              rearrange and reorganize sections by dragging them.
            </div>
          </v-tooltip>
        </div>

        <div
          class="down-bar-btn"
          :class="{ '-active': pageBuilder.$builder.isHideExtra }"
        >
          <!-- ▃▃▃▃▃▃▃▃▃▃ Edit/View Mode ▃▃▃▃▃▃▃▃▃▃ -->

          <v-tooltip bottom color="#111" max-width="420">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                tile
                :color="
                  pageBuilder.$builder.toggleHideExtra ? '#0b77bf' : '#333'
                "
                :dark="pageBuilder.$builder.toggleHideExtra"
                @click.stop="pageBuilder.toggleHideExtra()"
                class="sub-caption b4px"
                :caption="!pageBuilder.$builder.isHideExtra ? 'Edit' : 'View'"
              >
                <v-icon>{{
                  !pageBuilder.$builder.isHideExtra ? "edit" : "visibility"
                }}</v-icon>
              </v-btn>
            </template>
            <div class="text-start small pa-1">
              <b class="d-block"> Edit / View Mode </b>
              <div class="my-1">
                <v-icon small dark>edit</v-icon>
                <b class="mx-1">Edit Mode:</b> All editing tools will be shown.
              </div>
              <div class="my-1">
                <v-icon small dark>visibility</v-icon>
                <b class="mx-1">View Mode:</b> View what users see by hiding
                extra edit tools and empty texts.
              </div>
            </div>
          </v-tooltip>
        </div>

        <v-divider vertical class="m-0"></v-divider>

        <!-- ▃▃▃▃▃▃▃▃▃▃ Page Style ▃▃▃▃▃▃▃▃▃▃ -->

        <v-tooltip bottom color="#111" max-width="420">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon
              :title="$t('page_builder.design.tools.style')"
              :color="landing_show_page_style ? 'primary' : '#333'"
              @click.stop="
                ShowGlobalPageStyleEditorDialog(style, !landing_show_page_style)
              "
              class="sub-caption b4px"
              :caption="$t('page_builder.design.tools.style')"
            >
              <v-icon>format_paint</v-icon>
            </v-btn>
          </template>
          <div class="text-start small pa-1">
            <b class="d-block"> Page Style </b>
            Personalize the primary page's appearance, such as background and
            top menu here.
          </div>
        </v-tooltip>

        <!-- ▃▃▃▃▃▃▃▃▃▃ Typography ▃▃▃▃▃▃▃▃▃▃ -->

        <v-tooltip bottom color="#111" max-width="420">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon
              :title="$t('page_builder.design.tools.typography')"
              @click.stop="ShowGlobalTypographyEditorDialog(style)"
              class="sub-caption b4px"
              :caption="
                $t('page_builder.design.tools.typography')?.substring(0, 4)
              "
              :color="'#333'"
            >
              <v-icon>text_fields</v-icon>
            </v-btn>
          </template>
          <div class="text-start small pa-1">
            <b class="d-block"> Typography </b>
            Configure the typography, fonts, and size of elements on the page.
          </div>
        </v-tooltip>

        <!-- ▃▃▃▃▃▃▃▃▃▃ Prebuilt Sections Repository ▃▃▃▃▃▃▃▃▃▃ -->

        <v-tooltip bottom color="#111" max-width="420">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon
              :color="landing_show_elements_repository ? 'primary' : '#333'"
              @click.stop="toggleLandingShowElementsRepository()"
              class="sub-caption b4px"
              caption="Repository"
            >
              <v-icon>widgets</v-icon>
            </v-btn>
          </template>
          <div class="text-start small pa-1">
            <b class="d-block"> Prebuilt Sections </b>
            Enable or disable the display of pre-constructed and designed
            sections. These sections are created using standard sections
            available in the left menu, demonstrating the versatility of this
            page builder.
          </div>
        </v-tooltip>

        <!-- ▃▃▃▃▃▃▃▃▃▃ Clone Style ▃▃▃▃▃▃▃▃▃▃ -->

        <v-tooltip bottom color="#111" max-width="420">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon
              @click.stop="pageBuilder.$builder.toggleCloneStyleMode()"
              class="sub-caption b4px"
              caption="Clone"
              :color="pageBuilder.$builder.cloneStyle ? 'primary' : '#333'"
            >
              <v-icon>colorize</v-icon>
            </v-btn>
          </template>
          <div class="text-start small pa-1">
            <b class="d-block"> Clone Style </b>
            Using this tool, you can duplicate styles such as fonts,
            backgrounds, margins, and borders. To do this, follow these steps:

            <ol class="my-1">
              <li>
                <v-icon small dark>near_me arrow_right_alt colorize</v-icon>
                Enable the tool and hover your mouse over text, columns, or
                images; the cursor will resemble a pipette.
              </li>
              <li>Click on the target element to copy its style.</li>
              <li>
                <v-icon small dark
                  >colorize arrow_right_alt format_color_fill</v-icon
                >
                The cursor will revert to a palette; click on the destination
                element to apply the copied style.
              </li>
            </ol>
            <div>
              <v-icon x-small color="amber">circle</v-icon> Hotkey:
              <v-icon small dark class="mx-1">sync_alt</v-icon><b>⌘Ctrl + E</b>
            </div>
          </div>
        </v-tooltip>

        <!-- ▃▃▃▃▃▃▃▃▃▃ AI ▃▃▃▃▃▃▃▃▃▃ -->

        <v-tooltip v-if="hasAiButton" bottom color="#111" max-width="420">
          <template v-slot:activator="{ on, attrs }">
            <ai-button v-bind="attrs" v-on="on" @click="$emit('click:prompt')">
            </ai-button>
          </template>
          <div class="text-start small pa-1">
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
                  src="@components/assets/icons/ci-logo.png"
                  :width="24"
                  :height="24"
                  class="mx-1"
                />left side of the section.
              </li>
            </ol>
          </div>
        </v-tooltip>
      </template>
      <v-divider vertical class="m-0"></v-divider>

      <!-- ▃▃▃▃▃▃▃▃▃▃ Import ▃▃▃▃▃▃▃▃▃▃ -->

      <v-tooltip bottom color="#111" max-width="420">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            @click="show_import = true"
            class="sub-caption b4px"
            caption="Import"
            color="#333"
          >
            <v-icon small>fas fa-file-import</v-icon>
          </v-btn>
        </template>
        <div class="text-start small pa-1">
          <b class="d-block"> Import Landing Page </b>
          <v-icon small dark>folder</v-icon> <b class="mx-1">Load: </b> You can
          import a .landing file, which will replace all existing sections with
          the newly added ones.
        </div>
      </v-tooltip>

      <!-- ▃▃▃▃▃▃▃▃▃▃ Export ▃▃▃▃▃▃▃▃▃▃ -->

      <v-tooltip bottom color="#111" max-width="420">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            @click="exportFile()"
            class="sub-caption b4px"
            caption="Export"
            color="#333"
          >
            <v-icon small>fas fa-file-export</v-icon>
          </v-btn>
        </template>
        <div class="text-start small pa-1">
          <b class="d-block"> Export Landing Page </b>
          <v-icon small dark>save</v-icon> <b class="mx-1">Save: </b> You have
          the option to export this page as a .landing file, which can be
          imported into other shops or repurposed for creating additional pages.
        </div>
      </v-tooltip>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <!-- ――――――――――――――――――――――  Tools B ―――――――――――――――――――― -->
    <v-toolbar-items v-if="inDesignTab">
      <!-- ▃▃▃▃▃▃▃▃▃▃ LTR / RTL ▃▃▃▃▃▃▃▃▃▃ -->

      <v-tooltip bottom color="#111" max-width="420">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
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
          </v-btn>
        </template>
        <div class="text-start small pa-1">
          <b class="d-block"> LTR / RTL </b>
          <div class="my-1">
            <v-icon small dark>format_textdirection_r_to_l</v-icon>
            <b class="mx-1">RTL:</b> Adjust the page orientation to
            right-to-left.
          </div>
          <div class="my-1">
            <v-icon small dark>format_textdirection_l_to_r</v-icon>
            <b class="mx-1">LTR:</b> Adjust the page orientation to
            left-to-right.
          </div>

          <div class="my-1">
            <b class="me-1">Auto:</b> The page direction set automatically based
            on content.
          </div>
        </div>
      </v-tooltip>

      <v-tooltip bottom color="#000">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="#111"
            text
            v-bind="attrs"
            v-on="on"
            @click="show_hotkeys = true"
          >
            <v-icon small left>info</v-icon> Hot Keys
          </v-btn>
        </template>
        <p
          class="info-item"
          v-for="short_key in Object.keys(ShortKeys).limit(5)"
          :key="short_key"
        >
          <b>{{ short_key }}</b
          >: <span v-html="ShortKeys[short_key]"></span>
        </p>
        <div class="my-2">Click to view all...</div>
      </v-tooltip>
    </v-toolbar-items>

    <!-- ████████████████████ Dialog > Import file ████████████████████ -->
    <v-dialog
      v-model="show_import"
      dark
      :max-width="
        $vuetify.breakpoint.xl
          ? 560
          : $vuetify.breakpoint.lgAndUp
          ? 420
          : undefined
      "
      hide-overlay
      color="#1e1e1e"
    >
      <v-card class="text-start" flat>
        <v-card-title></v-card-title>
        <v-card-text>
          <widget-header icon="input" title="Import Design File">
          </widget-header>
          <v-subheader>
            <div>
              You can import custom-designed pages in this section. Ensure that
              the file is in the <b>.landing</b> format.
            </div>
          </v-subheader>

          <!-- ⬬⬬⬬⬬⬬⬬⬬⬬⬬ Drop Zone ⬬⬬⬬⬬⬬⬬⬬⬬⬬ -->

          <s-drop-zone
            extension=".landing"
            label="Select template file (.landing)"
            @select:file="importFile"
            class="min-height-40vh my-3"
            hint="Drag and drop your landing page file here, or click on the input field at the top."
            icon="design_services"
          ></s-drop-zone>
        </v-card-text>
        <v-card-actions>
          <div class="widget-buttons">
            <v-btn text x-large @click="show_import = false">
              <v-icon class="me-1">close</v-icon
              >{{ $t("global.actions.close") }}</v-btn
            >
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
      <v-card>
        <v-card-title>
          <v-icon class="me-1">keyboard</v-icon>
          Hotkeys</v-card-title
        >
        <v-card-text class="text-start">
          <v-container>
            <v-row>
              <v-col
                v-for="(desc, key) in ShortKeys"
                :key="key"
                cols="6"
                sm="4"
                md="3"
              >
                <div class="border rounded-lg pa-3 min-h-100">
                  <div class="display-1 text-uppercase">
                    {{ key }}
                  </div>
                  <div v-html="desc"></div>
                </div>
              </v-col>

              <v-col cols="12">
                <div class="border rounded-lg pa-3 min-h-100">
                  <div class="display-1 text-uppercase">
                    {{ "\{\{" }}<span class="blue--text">key</span>{{ "\}\}" }}
                  </div>
                  <div>
                    "You can load dynamic content on your page and replace it
                    with <b>augment</b> values. Augment is used for custom
                    dynamic pages such as <b>Products</b>, <b>Categories</b>,
                    and <b>Include Items</b>. To set an image to load
                    dynamically, click on <b>Feeder</b> and select
                    <b>Dynamic Source</b> for that image.
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="widget-buttons">
            <v-btn text x-large @click="show_hotkeys = false">
              <v-icon class="me-1">close</v-icon
              >{{ $t("global.actions.close") }}</v-btn
            >
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>

<script>
import SetupService from "@core/server/SetupService";
import SDropZone from "@components/uploader/SDropZone.vue";
import AiButton from "@components/ui/button/ai/AiButton.vue";
import WidgetHeader from "@components/widget/WidgetHeader.vue";

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
  name: "PageBuilderTopTools",
  components: { WidgetHeader, AiButton, SDropZone },
  props: {
    shop: {
      required: false,
      type: Object,
    },

    page: {
      require: true,
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
    style() {
      return this.page.content.style;
    },

    landing_show_page_style() {
      return this.$store.getters.getLandingShowPageStyle;
    },
    landing_show_elements_repository() {
      return this.$store.getters.getLandingShowElementsRepository;
    },

    has_undo() {
      return (
        this.pageBuilder.history_index + 1 <
        this.pageBuilder.local_history.length
      );
    },
    has_redo() {
      return this.pageBuilder.history_index - 1 >= 0;
    },
  },

  data: () => ({
    ShortKeys: ShortKeys,
    show_hotkeys: false,

    show_import: false,
  }),

  methods: {
    toggleLandingShowElementsRepository() {
      this.$store.commit(
        "setLandingShowElementsRepository",
        !this.landing_show_elements_repository
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
        JSON.stringify(out, null, 4)
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
                `This section in the landing file not found: ${section.name}`
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

          this.pageBuilder.title = "Page builder | " + this.page.title + " 📐";

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

<style lang="scss">
.neg-margin {
  .v-toolbar__content {
    margin: 0 -17px;
  }
}
.stick-menu {
  top: 0;
  z-index: 200;
  position: sticky;
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
