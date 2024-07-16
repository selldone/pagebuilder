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
    v-if="pageBuilder"
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
          :disabled="!pageBuilder.hasUndo"
          :title="$t('global.commons.undo')"
          @click.stop="pageBuilder.goUndo()"
          prepend-icon="undo"
          variant="text"
          size="small"
          class="tnt"
        >
          {{ $t("global.commons.undo") }}
        </v-btn>

        <v-btn
          :disabled="!pageBuilder.hasRedo"
          @click.stop="pageBuilder.goRedo()"
          prepend-icon="redo"
          variant="text"
          size="small"
          class="tnt"
        >
          {{ $t("global.commons.redo") }}
        </v-btn>
      </div>



    </div>


    <v-divider vertical></v-divider>

    <!-- ▃▃▃▃▃▃▃▃▃▃ Clone Style ▃▃▃▃▃▃▃▃▃▃ -->

 <div class="lmt-group">
   <v-btn
       :color="pageBuilder.$builder.cloneStyle ? 'amber' : '#fff'"
       variant="text"
       @click.stop="pageBuilder.$builder.toggleCloneStyleMode()"
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

      <v-sheet color="#222" class="d-flex ma-1 overflow-hidden" rounded="lg" height="38">



        <div :class="{ '-active': pageBuilder.listShown }" class="down-bar-btn ma-1 rounded-lg">
          <!-- ▃▃▃▃▃▃▃▃▃▃ Tools ▃▃▃▃▃▃▃▃▃▃ -->

          <v-btn
              :color="pageBuilder.listShown ? 'amber' : '#111'"
              variant="flat"
              size="small"
              @click.stop="pageBuilder.toggleListVisibility"
              class="tnt  "
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
            :class="{ '-active': pageBuilder.$builder.isSorting }"
            class="down-bar-btn ma-1 rounded-lg "
        >
          <!-- ▃▃▃▃▃▃▃▃▃▃ Sort ▃▃▃▃▃▃▃▃▃▃ -->

          <v-btn
              :color="pageBuilder.$builder.isSorting ? 'amber' : '#111'"
              variant="flat"
              size="small"
              class="tnt"
              @click.stop="pageBuilder.toggleSort"
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


      <v-sheet color="#222" class="d-flex ma-1 overflow-hidden" rounded="lg" height="38">

        <div
            :class="{ '-active': pageBuilder.$builder.isHideExtra }"
            class="down-bar-btn ma-1 rounded-lg "
        >
          <!-- ▃▃▃▃▃▃▃▃▃▃ Edit/View Mode ▃▃▃▃▃▃▃▃▃▃ -->

          <v-btn
              color="#111"
              variant="flat"
              size="small"
              class="tnt"
              @click.stop="pageBuilder.toggleHideExtra()"
              :prepend-icon="
            pageBuilder.$builder.isHideExtra ? 'visibility' : 'edit'
          "
          >
            {{ !pageBuilder.$builder.isHideExtra ? "Edit" : "View" }}

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
                <b class="mx-1">View Mode:</b> View what users see by hiding extra
                edit tools and empty texts.
              </div>
            </v-tooltip>
          </v-btn>
        </div>
        <div
            :class="{ '-active': landing_show_elements_repository }"
            class="down-bar-btn ma-1 rounded-lg "
        >
        <v-btn
            color="#111"
            variant="flat"
            size="small"
            class="tnt"
            @click.stop="toggleLandingShowElementsRepository()"
            prepend-icon="widgets"
        >

          <div class="small mt-1 tnt">Repository</div>

          <v-tooltip
              activator="parent"
              content-class="text-start small pa-3 bg-black"
              location="bottom"
              max-width="420"
              :open-delay="500"
          >
            <b class="d-block"> Prebuilt Sections </b>
            Enable or disable the display of pre-constructed and designed sections.
            These sections are created using standard sections available in the left
            menu, demonstrating the versatility of this page builder.
          </v-tooltip>
        </v-btn>
        </div>
      </v-sheet>

    </div>

    <!-- ▃▃▃▃▃▃▃▃▃▃ Prebuilt Sections Repository ▃▃▃▃▃▃▃▃▃▃ -->



    <!-- ▃▃▃▃▃▃▃▃▃▃ AI ▃▃▃▃▃▃▃▃▃▃ -->

    <u-button-ai-small
      v-if="hasAiButton && !demo"
      :tooltip="null"
      @click="show_prompt = true"
    >
      <v-tooltip
        activator="parent"
        content-class="text-start small pa-3 bg-black"
        location="bottom"
        max-width="420"
        :open-delay="500"
      >
        <b class="d-block"> AI Assistance </b>
        Utilize this tool to configure prompts, AI models, and plugins, enabling
        the automatic generation of text, images, and sections with the help of
        your AI assistant.
        <ol class="my-1">
          <li>Enter page prompt.</li>
          <li>
            Set custom prompt by adding
            <span style="font-size: 1.3em">🆕</span> or <code>prompt:</code> to
            fields. (optional)
          </li>
          <li>
            Click on the
            <img
              :height="24"
              :width="24"
              class="mx-1"
              src="../../../../../components-vue/assets/icons/ci-logo.png"
            />left side of the section.
          </li>
        </ol>
      </v-tooltip>
    </u-button-ai-small>
    <v-divider  vertical></v-divider>

    <!-- ▃▃▃▃▃▃▃▃▃▃ Shop Top Menu ▃▃▃▃▃▃▃▃▃▃ -->

    <template v-if="hasShopMenu">
      <v-btn
        variant="text"
        size="small"
        stacked
        @click="show_menu_editor = true"
      >
        <v-icon size="small">menu</v-icon>

        <div class="small mt-1 tnt">Menu</div>
        <v-avatar
          :image="getShopImagePath(shop.icon, 128)"
          class="avatar-gradient -shop -thin absolute-top-end"
          size="18"
        >
        </v-avatar>
      </v-btn>
      <v-divider  vertical></v-divider>

      <l-store-top-bar-editor
        v-model="show_menu_editor"
        :builder="pageBuilder.$builder"
        :shop="shop"
      ></l-store-top-bar-editor>
    </template>

    <!-- ▃▃▃▃▃▃▃▃▃▃ Import ▃▃▃▃▃▃▃▃▃▃ -->

    <v-btn variant="text" size="small" stacked @click="show_import = true">
      <v-icon size="small">fa:fas fa-file-import</v-icon>

      <div class="small mt-1 tnt">Import</div>

      <v-tooltip
        activator="parent"
        content-class="text-start small pa-3 bg-black"
        location="bottom"
        max-width="420"
        :open-delay="500"
      >
        <b class="d-block"> Import Landing Page </b>
        <v-icon size="small">folder</v-icon>
        <b class="mx-1">Load: </b> You can import a .landing file, which will
        replace all existing sections with the newly added ones.
      </v-tooltip>
    </v-btn>

    <v-spacer></v-spacer>

    <!-- ――――――――――――――――――――――  Tools B ―――――――――――――――――――― -->


    <v-btn
      stacked
      variant="text"
      size="small"
      @click="show_hotkeys = true"
      class="me-3"
    >
      <v-icon start>keyboard_alt</v-icon>

      <div class="small mt-1 tnt">Hot Keys</div>

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

    <v-btn
      v-if="hasLiveView"
      :class="{ disabled: !page }"
      :color="audiences?.length ? 'primary' : '#000'"
      :to="{
        name: 'BPageLandingLive',
        params: { shop_id: page.shop_id, page_id: page.id },
        query: { responsible: true },
      }"
      class="rounded py-1 px-2 text-start pp usn mt-3 mx-3 fadeIn tnt hover-scale-tiny"
      style="min-height: 54px"
      target="_blank"
      @click="$emit('update:liveStream', true) /*Enable live stream*/"
      variant="elevated"
      ripple
    >
      <v-icon size="24">cast</v-icon>
      <div class="ms-2 flex-grow-1" style="min-width: 160px">
        <template v-if="audiences?.length">
          <b class="d-block fadeInUp small">
            Live Preview
            <v-icon
              v-if="liveStream"
              class="mx-1 blink-me"
              color="#fff"
              size="x-small"
              >circle
            </v-icon>
          </b>
          <u-dense-circles-users
            :ids="audiences"
            :limit="5"
            :size="23"
            class="pa-0 overflow-visible mt-1 fadeIn delay_300"
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
    <v-card class="text-start" flat rounded="xl">
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
    v-if="!demo"
  >
    <v-scroll-y-reverse-transition>
      <div v-if="!visible_to_user">
        <v-btn-group color="#000" rounded="xl">
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

  <v-dialog v-model="show_prompt">
    <v-card>
      <v-card-text>
        <div class="pa-3 pa-sm-5">
          <div class="d-flex">
            <v-spacer></v-spacer>
            <b-ai-model-input
              v-model="ai_model"
              class="max-w-300"
              hide-details
              label="label"
              variant="outlined"
            >
            </b-ai-model-input>
          </div>

          <v-textarea
            v-model="prompt"
            :counter="512"
            :rows="2"
            :rules="[GlobalRules.counter(512)]"
            auto-grow
            class="mt-3"
            hide-details
            label="Prompt"
            persistent-placeholder
            placeholder="Write short about this page..."
            style="font-size: 1.2em; font-weight: 600"
            variant="underlined"
          >
          </v-textarea>

          <u-smart-suggestion
            :samples="prompt_samples"
            class="mt-2 mb-4"
            @select="(v) => (prompt = v)"
          >
          </u-smart-suggestion>

          <ol class="my-3 text-start">
            <li>
              Write a prompt describing the page you want to create. What is the
              purpose of this page, and what does your brand represent?
            </li>
            <li>
              Click on the AI button on the left side of each section, and we
              will automatically generate content and replace the existing text.
            </li>
            <li>
              To customize each prompt of the fields in the sections, use the
              following pattern: <code>prompt: write your prompt...</code> or
              <code>🆕write your prompt...</code>.
            </li>
          </ol>

          <div class="widget-buttons mb-3">
            <v-btn
              v-if="false"
              :loading="auto_generate_busy"
              size="x-large"
              variant="outlined"
              @click="autoGenerate"
            >
              Auto Generate Page
            </v-btn>

            <v-btn color="primary" size="x-large" @click="show_prompt = false">
              <v-icon class="me-1">check</v-icon>
              {{ $t("global.actions.done") }}
            </v-btn>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="show_prompt = false">
            <v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SDropZone from "@selldone/components-vue/ui/uploader/SDropZone.vue";
import UButtonAiSmall from "@selldone/components-vue/ui/button/ai/small/UButtonAiSmall.vue";
import { LMixinEvents } from "../../../../mixins/events/LMixinEvents.ts";
import { LUtilsMigration } from "../../../../utils/migration/LUtilsMigration.ts";
import LStoreTopBarEditor from "@selldone/page-builder/components/store/top-bar/editor/LStoreTopBarEditor.vue";

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
    LStoreTopBarEditor,
    UButtonAiSmall,
    SDropZone,
  },
  mixins: [LMixinEvents],
  emits: ["click:save"],
  props: {
    shop: {
      required: false,
      type: Object,
    },
    hasShopMenu: Boolean,

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

    // Options:

    saveIcon: {
      default: "save",
    },
    saveColor: {
      default: "primary",
    },

    hasAiButton: {
      type: Boolean,
      default: false,
    },
    demo: Boolean,

    audiences: {},
    liveStream: {},
  },

  computed: {
    landing_show_page_style() {
      return this.$store.getters.getLandingShowPageStyle;
    },
    landing_show_elements_repository() {
      return this.$store.getters.getLandingShowElementsRepository;
    },
    hasLiveView() {
      return this.page?.id && this.page.shop_id;
    },
  },

  data: () => ({
    ShortKeys: ShortKeys,
    show_hotkeys: false,

    show_import: false,

    visible_to_user: false,

    show_menu_editor: false,

    //-----------------------

    show_prompt: false,
    prompt: null,
    prompt_samples: [],
    //------------------------
    auto_generate_busy: false,
  }),

  watch: {
    show_import(val) {
      // this.BlurApp(val);
    },
  },

  methods: {
    toggleLandingShowElementsRepository() {
      this.$store.commit(
        "setLandingShowElementsRepository",
        !this.landing_show_elements_repository,
      );
    },

    importFile(file) {
      if (!file) return;

      //////////////this.current_history_id = null;

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
          template.content = LUtilsMigration.MigratePageContent(
            template.content,
          );

          const components = this.pageBuilder.$builder.components;

          const valid_sections = [];

          template.content.sections.forEach((section) => {
            if (!section.object) {
              this.showErrorAlert(null, `Invalid section structure detected!`);
              return;
            }
            // if (components[section.name]) { TODO: CHECK V2
            valid_sections.push(section);
            /* } else {
               this.showErrorAlert(
                 null,
                 `This section in the landing file not found: ${section.name}`,
               );
             }*/
          });

          this.page.content.sections = valid_sections;
          this.page.content.style = template.content.style;

          this.page.title = template.title;
          this.page.description = template.description;
          this.page.image = template.image;
          this.page.direction = template.direction;
          this.page.note = template.note;

          this.pageBuilder.setPage(this.page.content, null, false);

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

    autoGenerate() {
      // Require prompt:
      if (!this.prompt) {
        this.show_prompt = true;
        this.showWarningAlert(
          "Enter Prompt Please",
          "Kindly set a prompt for the page before proceeding.",
        );
        return;
      }

      // ┣━━━━━━━━━━━━━━━━━━━━━━━━━━ AI / Auto generate page  ━━━━━━━━━━━━━━━━━━━━━━━━━━┫
      console.log("🆎 AI / Auto generate page.");
      let url = null;
      if (this.shop)
        url = window.API.POST_AI_PAGE_BUILDER_AUTO_GENERATE(
          this.shop.id,
          this.page.id,
        );
      else if (this.isOfficialPage)
        url = window.ADMIN_API.POST_ADMIN_AI_PAGE_BUILDER_AUTO_GENERATE(
          this.page.id,
        );
      else return;

      this.auto_generate_busy = true;

      axios
        .post(url)
        .then(({ data }) => {
          if (data.error) {
            this.showErrorAlert(null, data.error_msg);
          } else {
            this.$refs.vueBuilder.setPage(
              data.page.content,
              data.page.css,
              false,
            );

            this.showSuccessAlert(
              "Build completed",
              "Page successfully auto created and loaded.",
            );
          }
        })
        .catch((error) => {
          this.showLaravelError(error);
        })
        .finally(() => {
          this.auto_generate_busy = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>


</style>
