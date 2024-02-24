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
  <div
    v-scroll="onScroll"
    class="page-builder position-relative"
    data-gramm="false"
    spellcheck="false"
    style="min-height: 60vh"
  >
    <!-- ------------------------------------- Themes ------------------------------------------>

    <page-templates-list
      v-if="showIntro && !$builder.sections.length"
      :themes="themes"
      has-header
      @select:raw-theme="(_raw) => addTheme(_raw)"
      @select:page="(_page) => loadTemplate(_page)"
    ></page-templates-list>

    <!-- ████████████████████████ Editor ████████████████████████ -->
    <div
      :class="{ hidden: showIntro && !$builder.sections.length }"
      :style="{ 'max-height': max_h }"
      class="overflow-y-hidden"
      @mouseup="
        $builder.isEditing && components && components.length
          ? onSaveHistory()
          : undefined
      "
    >
      <!-- ████████████████████████ Editor > 🪅 Artboard ████████████████████████ -->

      <div
        id="artboard"
        ref="artboard"
        :class="{
          'is-sorting': $builder.isSorting,
          'is-editable': $builder.isEditing && inEditMode,
        }"
        class="artboard overflow-hidden"
      >
        <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆  Side Helper (View Mode) ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

        <v-slide-x-reverse-transition leave-absolute>
          <div
            v-if="
              !$builder.isAnimation &&
              !$builder.isTracking &&
              ($vuetify.display.xlAndUp || scale_down)
            "
            :class="{ '-scale-down': scale_down }"
            class="side-menu zoomIn"
          >
            <b>View</b>
            <v-btn
              :color="!render_mode ? 'amber' : undefined"
              icon
              variant="text"
              @click="render_mode = null"
            >
              <v-icon>burst_mode</v-icon>
            </v-btn>
            <v-btn
              :color="render_mode === 'simple' ? 'amber' : undefined"
              icon
              variant="text"
              @click="render_mode = 'simple'"
            >
              <v-icon>apps</v-icon>
            </v-btn>
            <v-btn
              :color="render_mode === 'wire' ? 'amber' : undefined"
              icon
              variant="text"
              @click="render_mode = 'wire'"
            >
              <v-icon>grid_on</v-icon>
            </v-btn>

            <v-expand-transition>
              <div v-if="render_mode === 'wire'" class="d-flex flex-column">
                <hr />
                <v-btn
                  :color="show_classes ? '#512DA8' : undefined"
                  caption="Class"
                  class="sub-caption mb-3"
                  icon
                  variant="text"
                  @click="
                    show_classes = !show_classes;
                    show_styles = false;
                  "
                >
                  <v-icon>architecture</v-icon>
                </v-btn>
                <v-btn
                  :color="show_styles ? '#512DA8' : undefined"
                  caption="Style"
                  class="sub-caption mb-3"
                  icon
                  variant="text"
                  @click="
                    show_styles = !show_styles;
                    show_classes = false;
                  "
                >
                  <v-icon>format_paint</v-icon>
                </v-btn>
              </div>
            </v-expand-transition>
          </div>
        </v-slide-x-reverse-transition>

        <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆  Top Bar ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

        <div
          :class="{
            'in-scale-down': scale_down,
            desktop: device === 'desktop',
            tablet: device === 'tablet',
            mobile: device === 'mobile',

            '--blueprint-mode':
              $builder.isAnimation ||
              $builder.isTracking ||
              render_mode === 'simple' ||
              render_mode === 'wire',
            '--tracking': $builder.isTracking,
            '--wire': in_design_mode && render_mode === 'wire',
            '--show-classes':
              in_design_mode && render_mode === 'wire' && show_classes,
            '--show-styles':
              in_design_mode && render_mode === 'wire' && show_styles,

            '--editable': in_design_mode,
          }"
          :style="CUSTOM_PAGE_STYLE"
          class="main-sections-container no-inv"
        >
          <v-toolbar
            v-if="page"
            class="py-1 border-bottom rounded-t-xl"
            color="#fff"
            dir="ltr"
            flat
            height="84"
          >
            <!-- ▃▃▃▃▃▃▃▃▃▃ 📇 View > Normal ▃▃▃▃▃▃▃▃▃▃ -->

            <v-tooltip
              content-class="bg-black text-start pa-3 small"
              location="top"
              max-width="420"
            >
              <template v-slot:activator="{ props }">
                <span caption="Design" class="sub-caption -hover b-16px ms-2">
                  <v-btn
                    :size="32"
                    icon
                    v-bind="props"
                    variant="text"
                    @click="
                      $builder.isAnimation = false;
                      $builder.isTracking = false;
                      $builder.isHideExtra = false;
                    "
                  >
                    <v-icon
                      :color="
                        !$builder.isAnimation && !$builder.isTracking
                          ? 'green'
                          : '#333'
                      "
                      :size="
                        !$builder.isAnimation && !$builder.isTracking ? 20 : 14
                      "
                      class="hover-scale-small"
                      >lens</v-icon
                    >
                  </v-btn>
                </span>
              </template>
              <b class="d-block">Normal View</b>
              <div>
                <v-icon class="me-1" dark size="small">design_services</v-icon>
                You can access all the elements and editing tools required to
                modify the content and layout of the landing page.
              </div>
            </v-tooltip>

            <!-- ▃▃▃▃▃▃▃▃▃▃ 📇 View > Animation ▃▃▃▃▃▃▃▃▃▃ -->

            <v-tooltip
              content-class="bg-black text-start pa-3 small"
              location="top"
              max-width="420"
            >
              <template v-slot:activator="{ props }">
                <span caption="Animation" class="sub-caption -hover b-16px">
                  <v-btn
                    :size="32"
                    icon
                    v-bind="props"
                    variant="text"
                    @click="
                      $builder.isAnimation = true;
                      $builder.isTracking = false;
                      $builder.isHideExtra = true;
                    "
                  >
                    <v-icon
                      :color="$builder.isAnimation ? 'blue' : '#333'"
                      :size="$builder.isAnimation ? 20 : 14"
                      class="hover-scale-small"
                      >lens</v-icon
                    >
                  </v-btn>
                </span>
              </template>
              <b class="d-block">Animation View</b>
              <div>
                <v-icon class="me-1" dark size="small">animation</v-icon>
                To configure animation and user interactions such as mouse hover
                transitions, you can check out the blueprint and the minimalist
                view of the page.
              </div>
            </v-tooltip>

            <!-- ▃▃▃▃▃▃▃▃▃▃ 📇 View > Tracking ▃▃▃▃▃▃▃▃▃▃ -->

            <v-tooltip
              content-class="bg-black text-start pa-3 small"
              location="top"
              max-width="420"
            >
              <template v-slot:activator="{ props }">
                <span caption="Tracking" class="sub-caption -hover m-0 b-16px">
                  <v-btn
                    :size="32"
                    icon
                    v-bind="props"
                    variant="text"
                    @click="
                      $builder.isTracking = true;
                      $builder.isAnimation = false;
                      $builder.isHideExtra = true;
                    "
                  >
                    <v-icon
                      :color="$builder.isTracking ? 'red' : '#333'"
                      :size="$builder.isTracking ? 20 : 14"
                      class="hover-scale-small"
                      >lens</v-icon
                    >
                  </v-btn>
                </span>
              </template>
              <b class="d-block">Tracking View</b>
              <div>
                <v-icon class="me-1" dark size="small">highlight_alt</v-icon>
                This view mode presents a simplified display of the page,
                allowing the allocation of tracking IDs to actions (buttons)
                that can be utilized in Google Tag Manager and other tracking
                applications.
              </div>
            </v-tooltip>

            <v-text-field
              v-model="page.name"
              :density="$vuetify.display.smAndDown ? 'compact' : undefined"
              :disabled="isPopup"
              :placeholder="isPopup ? 'Popup' : 'Enter page address*'"
              :prefix="!isPopup && $vuetify.display.smAndUp ? base_url : ''"
              :prepend-inner-icon="isPopup ? 'notifications_none' : undefined"
              :rules="!isPopup ? [GlobalRules.required()] : undefined"
              class="english-field mx-1 mx-sm-2 mx-md-3"
              flat
              hide-details
              rounded
              variant="solo-filled"
            >
              <template v-if="!isPopup" v-slot:append-inner>
                <v-btn
                  :href="base_url + page.name"
                  icon
                  target="_blank"
                  title="Open page"
                >
                  <v-icon>launch</v-icon>
                </v-btn>
              </template>
            </v-text-field>

            <v-tooltip
              content-class="bg-black text-start pa-3 small"
              location="top"
              max-width="420"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  class="ms-1"
                  icon
                  v-bind="props"
                  @click="toggleListVisibility"
                >
                  <v-icon
                    >{{ scale_down ? "fullscreen_exit" : "fullscreen" }}
                  </v-icon>
                </v-btn>
              </template>
              <b class="d-block">View Mode</b>
              <div>
                <v-icon class="me-1" dark size="small"
                  >center_focus_weak
                </v-icon>
                Make fullscreen/compact view mode.
              </div>
              <div>
                Or press
                <span class="text-amber"
                  ><v-icon class="mx-1" color="amber" size="small"
                    >swap_horiz</v-icon
                  >
                  Tab</span
                >.
              </div>
            </v-tooltip>
          </v-toolbar>

          <v-progress-linear
            v-if="delay_load > 0 && delay_load < 999"
            :model-value="load_percent"
            color="success"
            striped
          ></v-progress-linear>
          <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆  Page Content ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

          <div
            :class="{
              'drop-active':
                !$builder.sections.length && past_hover_index === 0,
            }"
            :style="[
              {
                '--bg-color':
                  pageStyle && pageStyle.bg_color ? pageStyle.bg_color : '#fff',
                fontFamily:
                  pageStyle && pageStyle.font ? pageStyle.font : undefined,
              },
              {
                '--background': pageStyle?.bg_color
                  ? pageStyle.bg_color
                  : '#fff' /*IMPORTANT! Used by shop dynamic css. e.g. fade scrolls*/,
              },
            ]"
            class="page-content-wrap-editor position-relative"
          >
            <!-- Important: set key and wrap with div to prevent loss proper for dragging elements -->
            <div key="header-demo">
              <slot name="header"></slot>
            </div>

            <div
              ref="pagecontent"
              :class="{ 'min-height-80vh': $builder.isEditing }"
              :style="[
                PageBuilderTypoHelper.GenerateTypoStyle(pageStyle),
                PageBuilderColorsHelper.GenerateColorsStyle(pageStyle),
              ]"
              class="page-content"
              @click="handleClickOnSections"
              @dragleave="
                (e) => (!$builder.isEditing ? undefined : leaveDrag(e))
              "
              @dragover="
                (e) =>
                  !$builder.isEditing || $builder.sections.length
                    ? undefined
                    : allowDropSection(e, 0)
              "
              @drop="
                (e) =>
                  !$builder.isEditing || $builder.sections.length
                    ? undefined
                    : dropSection(e, 0)
              "
            >
              <template
                v-for="(section, index) in $builder.sections"
                :key="section.uid"
              >
                <div class="position-relative">
                  <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Margin Arrows - Start ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
                  <div
                    v-if="$builder.isEditing && section.data?.style?.marginTop"
                    :class="{
                      '--reverse': parseInt(section.data.style.marginTop) < 0,
                    }"
                    :margin="section.data.style.marginTop"
                    :style="{ '--margin': section.data.style.marginTop }"
                    class="arrow-margin -top"
                    title="Top Margin"
                    @mousedown.prevent
                  ></div>
                  <div
                    v-if="
                      $builder.isEditing && section.data?.style?.marginBottom
                    "
                    :class="{
                      '--reverse':
                        parseInt(section.data.style.marginBottom) < 0,
                    }"
                    :margin="section.data.style.marginBottom"
                    :style="{ '--margin': section.data.style.marginBottom }"
                    class="arrow-margin -bottom"
                    title="Bottom Margin"
                    @mousedown.prevent
                  ></div>
                  <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Margin Arrows - End ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->

                  <div
                    :class="{
                      'cursor-pipette':
                        $builder.cloneStyle && !$builder.cloneObject,
                      'cursor-bucket':
                        $builder.cloneStyle && $builder.cloneObject,

                      'show-name': listShown && inEditMode,
                    }"
                    :section-name="$builder.components[section.name].label"
                    class="position-relative d-flex flex-column target-drop"
                    @dragover="
                      (e) =>
                        !$builder.isEditing
                          ? undefined
                          : allowDropSection(e, index)
                    "
                    @drop="
                      (e) =>
                        !$builder.isEditing ? undefined : dropSection(e, index)
                    "
                  >
                    <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ 🪂 Section Component - Start 🪂 ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
                    <component
                      :is="section.name"
                      v-if="delay_load > index"
                      :id="section.uid"
                      :ref="'SECTION_' + section.uid"
                      :class="{
                        'move-courser block-pointer-event': $builder.isSorting,

                        'ignore-elements': !$builder.isSorting,
                        pen: drop_section,
                      }"
                      :style="section.get('$sectionData.style')"
                    />
                    <div
                      v-else
                      class="d-flex align-center justify-center"
                      style="height: 400px"
                    >
                      <v-progress-circular
                        indeterminate
                        size="84"
                      ></v-progress-circular>
                    </div>
                  </div>

                  <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Copy & Past Section - Start ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
                  <s-landing-section-side-bar
                    v-if="listShown && inEditMode"
                    v-model:past-hover-index="past_hover_index"
                    :copy-section="copy_section"
                    :section="section"
                    :section-index="index"
                    @click:copy="copySection(section)"
                    @click:delete="deleteSection(section)"
                    @click:save="saveSectionToRepository(section)"
                    @click:past="pastSection(index + 1)"
                  ></s-landing-section-side-bar>
                  <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Copy & Past Section - End ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->

                  <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Side Section Buttons - Start ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
                  <div
                    :class="{
                      '-single': !aiAutoFillFunction && !has_note,
                      '-double':
                        (!aiAutoFillFunction && has_note) ||
                        (aiAutoFillFunction && !has_note),
                      '-triple': aiAutoFillFunction && has_note,
                    }"
                    class="x-feeder"
                    dir="ltr"
                  >
                    <v-btn
                      :class="{ disabled: !section.data || !section.schema }"
                      class="x-feeder-btn hover-scale-small force-top ml-6"
                      color="#000"
                      icon
                      size="x-large"
                      variant="flat"
                      @click="showFeeder(section)"
                    >
                      <v-icon size="36">donut_large</v-icon>
                      <v-tooltip
                        activator="parent"
                        content-class="bg-black"
                        location="bottom"
                      >
                        <b>Feed</b><br />
                        Simple edit section contents.
                      </v-tooltip>
                    </v-btn>

                    <ai-button
                      v-if="aiAutoFillFunction"
                      :loading="loading_ai.includes(section)"
                      class="x-feeder-btn hover-scale-small force-top ml-6"
                      icon
                      tooltip="<b>AI</b><br>Auto generate contents."
                      tooltip-location="bottom"
                      x-large
                      @click="autoComplete(section)"
                    >
                    </ai-button>

                    <v-badge
                      v-if="has_note"
                      :content="
                        numeralFormat(
                          notes?.filter((n) => n.element_id === section.uid)
                            ?.length,
                          '0a',
                        )
                      "
                      :model-value="
                        notes?.filter((n) => n.element_id === section.uid)
                          ?.length > 0
                      "
                      color="#000"
                    >
                      <v-btn
                        :color="
                          notes?.filter((n) => n.element_id === section.uid)
                            ?.length
                            ? 'amber'
                            : '#000'
                        "
                        class="x-feeder-btn hover-scale-small force-top"
                        icon
                        size="x-large"
                        variant="flat"
                        @click="showWriteNote(section)"
                      >
                        <v-icon size="36">sticky_note_2</v-icon>
                        <v-tooltip
                          activator="parent"
                          content-class="bg-black"
                          location="bottom"
                        >
                          <b>Message</b> ({{
                            notes?.filter((n) => n.element_id === section.uid)
                              ?.length
                          }})<br />

                          Write a reminder note or message to your agency.
                        </v-tooltip>
                      </v-btn>
                    </v-badge>
                  </div>
                  <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Side Section Buttons - End ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->

                  <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Notes - Start ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
                  <p-note-digest
                    v-if="$vuetify.display.lgAndUp && has_note"
                    :limit="2"
                    :notes="notes?.filter((n) => n.element_id === section.uid)"
                    :page="shop_page"
                    :popup="shop_popup"
                    :shop="shop"
                    :style="{ width: '400px', right: '-600px' }"
                    class="position-absolute"
                    hover-able
                    style="top: 50px"
                    @delete="(id) => DeleteItemByID(page.notes, id)"
                  ></p-note-digest>
                  <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Notes - End ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
                </div>
                <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Past & Drop Expanding Bar ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
                <v-expand-transition>
                  <div
                    v-if="past_hover_index === index && drop_section"
                    class="bg-lily-meadow typo-body d-flex flex-column align-center justify-center"
                    style="height: 84px"
                  >
                    Will add here
                  </div>
                  <div
                    v-else-if="past_hover_index === index"
                    class="bg-blue-soft d-flex align-center justify-center"
                    style="height: 84px"
                  >
                    Past section here!
                  </div>
                </v-expand-transition>
              </template>
            </div>
          </div>
        </div>

        <s-landing-editor-components-menu
          :components="components"
          :is-visible="listShown && inEditMode"
          :isScrollDown="scrollTop > 200"
        ></s-landing-editor-components-menu>
      </div>
    </div>

    <!-- ――――――――――――――――――――――  Dialog Master Page Style ―――――――――――――――――――― -->

    <LSettingsPageStyle></LSettingsPageStyle>
    <LSettingsPageTypography @change="$forceUpdate()"></LSettingsPageTypography>

    <!-- ――――――――――――――――――――――  Dialog Master Style ―――――――――――――――――――― -->

    <l-settings-class-style :builder="$builder"></l-settings-class-style>
    <l-settings-background :builder="$builder"></l-settings-background>
    <l-settings-product></l-settings-product>
    <l-settings-products-filter></l-settings-products-filter>

    <l-settings-animation></l-settings-animation>

    <l-settings-color></l-settings-color>

    <l-settings-blogs></l-settings-blogs>

    <l-settings-link></l-settings-link>

    <l-settings-frame></l-settings-frame>
    <l-settings-input></l-settings-input>

    <l-settings-swiper></l-settings-swiper>
    <l-settings-column></l-settings-column>
    <l-settings-marquee></l-settings-marquee>

    <!-- ――――――――――――――――――――――  Dialog Master Style Image ―――――――――――――――――――― -->

    <l-settings-image-size></l-settings-image-size>
    <l-settings-image-layers></l-settings-image-layers>

    <!-- ――――――――――――――――――――――  Repository ―――――――――――――――――――― -->

    <page-elements-repository v-if="inEditMode" :scale-down-mode="scale_down">
    </page-elements-repository>

    <!-- ――――――――――――――――――――――  Repository ―――――――――――――――――――― -->
    <global-section-feeder-dialog
      v-if="selected_section && selected_component"
      v-model="dialog_feeder"
      :section="selected_section"
      :section-component="selected_component"
    ></global-section-feeder-dialog>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import SStylerIcon from "@app-page-builder/styler/icon/SStylerIcon.vue";

import { BackgroundHelper } from "@core/helper/style/BackgroundHelper";
import LSettingsPageStyle from "@app-page-builder/settings/page/style/LSettingsPageStyle.vue";
import LSettingsClassStyle from "@app-page-builder/settings/class-style/LSettingsClassStyle.vue";
import LSettingsBlogs from "@app-page-builder/settings/blogs/LSettingsBlogs.vue";
import PageElementsRepository from "@app-page-builder/src/element-repository/PageElementsRepository.vue";
import GlobalSectionFeederDialog from "@app-page-builder/src/feeders/GlobalSectionFeederDialog.vue";
import AiButton from "@components/ui/button/ai/AiButton.vue";
import LSettingsSwiper from "@app-page-builder/settings/swiper/LSettingsSwiper.vue";
import LSettingsPageTypography from "@app-page-builder/settings/page/typography/LSettingsPageTypography.vue";
import { PageBuilderTypoHelper } from "@app-page-builder/src/helpers/PageBuilderTypoHelper";
import { PageBuilderColorsHelper } from "@app-page-builder/src/helpers/PageBuilderColorsHelper";
import LSettingsMarquee from "@app-page-builder/settings/marquee/LSettingsMarquee.vue";
import PNoteDigest from "@app-page-builder/components/note/digest/PNoteDigest.vue";
import PageTemplatesList from "@app-page-builder/src/pages/PageTemplatesList.vue";
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import { HighlightEditingElements } from "@app-page-builder/src/helpers/HighlightEditingElements";
import _ from "lodash-es";
import { PageBuilderNoteMixin } from "@app-page-builder/mixins/PageBuilderNoteMixin";
import PageEventBusMixin from "@app-page-builder/mixins/PageEventBusMixin";
import SLandingEditorComponentsMenu from "@app-page-builder/components/editor/components-menu/SLandingEditorComponentsMenu.vue";
import SLandingSectionSideBar from "@app-page-builder/components/section/side-bar/SLandingSectionSideBar.vue";
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";
import { LMixinsHistory } from "@app-page-builder/mixins/history/LMixinsHistory";
import { defineComponent } from "vue";
import { Migration } from "@app-page-builder/src/MigrateFromOldVersion";
import LSettingsProduct from "@app-page-builder/settings/product/LSettingsProduct.vue";
import LSettingsBackground from "@app-page-builder/settings/background/LSettingsBackground.vue";
import LSettingsProductsFilter from "@app-page-builder/settings/products-filter/LSettingsProductsFilter.vue";
import LSettingsAnimation from "@app-page-builder/settings/animation/LSettingsAnimation.vue";
import LSettingsColor from "@app-page-builder/settings/color/LSettingsColor.vue";
import LSettingsImageSize from "@app-page-builder/settings/image/size/LSettingsImageSize.vue";
import LSettingsImageLayers from "@app-page-builder/settings/image/layers/LSettingsImageLayers.vue";
import LSettingsLink from "@app-page-builder/settings/link/LSettingsLink.vue";
import LSettingsFrame from "@app-page-builder/settings/frame/LSettingsFrame.vue";
import LSettingsInput from "@app-page-builder/settings/input/LSettingsInput.vue";
import LSettingsColumn from "@app-page-builder/settings/column/LSettingsColumn.vue";

const DEBUG = false;
export default defineComponent({
  name: "SPageEditor",
  mixins: [
    PageBuilderNoteMixin,
    PageEventBusMixin,
    PageBuilderMixin,
    LMixinsHistory,
  ],
  components: {
    SLandingSectionSideBar,
    SLandingEditorComponentsMenu,
    PageTemplatesList,
    PNoteDigest,
    LSettingsMarquee,
    LSettingsPageTypography,
    LSettingsColumn,
    LSettingsSwiper,
    LSettingsInput,
    LSettingsFrame,
    AiButton,
    GlobalSectionFeederDialog,
    PageElementsRepository,
    LSettingsLink,
    LSettingsBlogs,
    LSettingsImageLayers,
    LSettingsImageSize,
    LSettingsColor,
    LSettingsAnimation,
    LSettingsProductsFilter,
    LSettingsProduct,
    LSettingsClassStyle,
    LSettingsBackground,
    LSettingsPageStyle,

    SStylerIcon,
  },
  props: {
    showIntro: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Object,
      default: () => ({
        title: "",
        sections: [],
      }),
    },

    hasSettingButton: {
      type: Boolean,
      default: false,
    },
    hasSaveButton: {
      type: Boolean,
      default: false,
    },

    device: {
      default: "desktop", // desktop   tablet   mobile
    },
    page: {},
    pageStyle: {}, // Solver eal time update issue!

    shop: {
      required: false,
      type: Object,
    },

    isPopup: {
      type: Boolean,
      default: false,
    },
    isMenu: {
      type: Boolean,
      default: false,
    },

    aiAutoFillFunction: {},
  },
  data() {
    return {
      PageBuilderTypoHelper: PageBuilderTypoHelper,
      PageBuilderColorsHelper: PageBuilderColorsHelper,

      //----------------------------

      delay_load: 0,
      //----------------------------
      title: null,
      listShown: false,
      components: this.getComponents(),
      currentSection: "", // Important not be null (BUG occur)

      inEditMode: false,
      themes: null,

      max_h: "unset",

      interval: null, // Max height calculation interval!

      //-------------------

      templates: null,

      //-------------------

      key_listener_keydown: null,

      //-------------------
      scrollTop: 0,

      //-------------------
      CUSTOM_PAGE_STYLE: null,

      //-------------------
      render_mode: null,
      show_classes: false,
      show_styles: false,

      //-------------------
      sortable: null,

      //-------------------
      selected_section: null,
      selected_component: null,

      dialog_feeder: false,

      loading_ai: [],

      //-------------------

      drop_section: false, // Indicate that pre-built section drag over

      //-------------------

      past_hover_index: null,
      onPast: null,
    };
  },

  computed: {
    load_percent() {
      return (100 * this.delay_load) / this.sections_length;
    },
    shop_page() {
      return this.shop && !this.isMenu && !this.isPopup ? this.page : null;
    },
    shop_popup() {
      return this.shop && !this.isMenu && this.isPopup ? this.page : null;
    },
    shop_menu() {
      return this.shop && this.isMenu && !this.isPopup ? this.page : null;
    },

    has_note() {
      return this.shop_page || this.shop_popup;
    },

    scale_down() {
      return this.$builder.isSorting || this.listShown;
    },

    base_url() {
      return this.shop
        ? `${this.getShopMainUrl(this.shop)}/pages/`
        : `${this.SetupService.MainServiceUrl()}/`;
    },

    in_design_mode() {
      return !this.$builder.isAnimation && !this.$builder.isTracking;
    },

    sections_length() {
      return this.$builder.sections && this.$builder.sections.length;
    },

    notes() {
      return this.page?.notes;
    },
  },

  watch: {
    "$route.query.element_id"(element_id) {
      this.autoShowNote();
    },
    page() {
      this.autoShowNote();
      this.setModelInBuilder();
    },

    pageStyle: {
      deep: true,
      handler() {
        this.PageStyleCalc();
      },
    },

    "$builder.sections": {
      deep: true,
      handler(sections) {
        if (!this.page?.id) return; // Only emit changes if page exists!

        const _page = {
          title: this.title,
          image: this.page.image,
          name: this.page.name,
          direction: this.page.direction,
          color: this.page.color,
          content: {
            title: this.title,
            sections: sections.map((s) => ({
              name: s.name,
              data: s.data,
            })),
            style: this.pageStyle,
          },
        };
        this.$emit("update:preview", _page);
      },
    },

    scale_down(scale_down) {
      this.calcMaxH();
      this.$emit("scale", scale_down ? 0.5 : 1);
    },

    inEditMode(val) {
      this.$emit("changeMode", val);
    },
    /*
        sections_length(val) {
          if (val > 0 && this.delay_load < 999)
            // loaded any section?
            this.loadNextDelayed();
        },*/
  },
  created() {
    // sets the initial data.
    this.setPage(this.data);
    this.setModelInBuilder();

    this.themes = this.$builder.themes;

  },
  mounted() {
    this.$builder.rootEl = this.$refs.artboard;

    const _self = this;

    this.sortable = Sortable.create(this.$refs.pagecontent, {
      group: {
        name: "artboard",
        put: "sections-group",
      },

      animation: 150,
      scroll: true,
      scrollSpeed: 10,
      sort: false,
      disabled: true,
      preventOnFilter: false,
      //easing: "cubic-bezier(1, 0, 0, 1)",
      removeCloneOnHide: true,

      filter: ".ignore-elements",

      onAdd(evt) {
        const section_name = evt.item.getAttribute("section-name");
        const section = _self.components.find((it) => it.name === section_name);

        if (section) {
          _self.addSection(section, evt.newIndex);
        }

        evt.item.remove();

        //console.log("sortable : onAdd");
      },
      onUpdate(evt) {
        _self.$builder.sort(evt.oldIndex, evt.newIndex);

        console.log("sortable : onUpdate");
        _self.onSaveHistory();
      },
    });

    this.showList(); // On edit mode!

    this.interval = window.setInterval(() => {
      this.calcMaxH();
    }, 500);

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――

    //const t = this;

    this.key_listener_keydown = (event) => {
      if (window.PAGE_BUILDER_BLOCK_LISTEN_KEYS) return;

      //------------- Global key listener -----------

      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        //console.log('isEscape')
        if (this.$builder.cloneStyle) {
          this.$builder.cloneStyle = false;
          event.preventDefault();
          return false;
        }
      }

      // Save: Ctrl + S
      if ((event.ctrlKey || event.metaKey) && event.code === "KeyS") {
        this.submit();
        event.preventDefault();
        return false;
      }

      // Copy Style Pipette: Ctrl + E
      if ((event.ctrlKey || event.metaKey) && event.code === "KeyE") {
        this.$builder.cloneStyle = !this.$builder.cloneStyle;
        event.preventDefault();
        return false;
      }

      // Toggle scale mode:
      if (event.code === "Tab" /*&& !event.target.isContentEditable*/) {
        function calculateScroll(multiple) {
          return (
            200 /*Top fixed high approximately!*/ +
            (window.scrollY - 200) * multiple
          );
        }

        // Call the function to perform the scroll (Must view scale completed!)

        const go_to_scale_down = !this.listShown;
        const scroll = calculateScroll(go_to_scale_down ? 0.5 : 2);

        _.delay(
          () => {
            this.$nextTick(() => {
              window.scrollTo({
                top: scroll,
                // behavior: "smooth", // Optional: for smooth scrolling
              });
            });
          },
          go_to_scale_down ? 0 : 350,
        ); // In scale up mode we need to wait to all view being scaled and scroll be available!

        this.toggleListVisibility();
        event.preventDefault();
      }

      if (event.target.isContentEditable) {
        // console.log('event.code : '+event.code )

        //------------- Short key only if in editable element! -----------

        if ((event.ctrlKey || event.metaKey) && event.code === "KeyB") {
          document.execCommand("bold");
          event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.code === "KeyI") {
          document.execCommand("italic");
          event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.code === "KeyR") {
          document.execCommand("removeFormat");
          event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.code === "KeyL") {
          document.execCommand("strikeThrough");
          event.preventDefault();
        } else if ((event.ctrlKey || event.metaKey) && event.code === "KeyU") {
          document.execCommand("underline");
          event.preventDefault();
        } else if (
          (event.ctrlKey || event.metaKey) &&
          event.code === "Digit1"
        ) {
          event.preventDefault();
          document.selectionAddTag("small", "big");
        } else if (
          (event.ctrlKey || event.metaKey) &&
          event.code === "Digit2"
        ) {
          event.preventDefault();
          document.selectionAddTag("big", "small");
        }

        return; // No action in content editable focus!
      }

      //------------- Add Undo Redo -----------
      if ((event.ctrlKey || event.metaKey) && event.code === "KeyZ") {
        if (this.inActiveEditingMode()) this.goUndo();
      } else if ((event.ctrlKey || event.metaKey) && event.code === "KeyY") {
        if (this.inActiveEditingMode()) this.goRedo();
      }
    };

    document.addEventListener("keydown", this.key_listener_keydown, true);
    //――――――――――――――――――――――  END Editor key listener ――――――――――――――――――――

    window.onbeforeunload = function () {
      return "Are you sure to <b>close page design</b>?";
    };

    this.registerPastListener();
  },

  updated() {
    if (this.$builder.scrolling) {
      this.$builder.scrolling(this.$refs.artboard);
    }
  },

  beforeUnmount() {
    window.onbeforeunload = undefined;

    // console.log("Unregister hot key.", this.key_listener_keydown);

    // Destroy sortables: (memory leakage)
    this.sortable.destroy();

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);

    this.$builder.clear();

    window.clearInterval(this.interval);

    //console.log("...beforeDestroy...",this.$builder);

    //―――――――――――――――――――――― Past >Unregister ――――――――――――――――――――
    document.removeEventListener("paste", this.onPast, true);
  },

  methods: {
    //―――――――――――――――――――――― Past > Register ――――――――――――――――――――
    registerPastListener() {
      // Add global past:
      this.onPast = (event) => {
        if (window.PAGE_BUILDER_BLOCK_LISTEN_KEYS) return;

        let paste = (event.clipboardData || window.clipboardData).getData(
          "text",
        );

        function IsValidJsonSectionString(str) {
          try {
            let json = JSON.parse(str);
            return json.name && json.data && Object.keys(json.data).length > 0;
          } catch (e) {}
          return false;
        }

        // Try parse as section:
        if (paste && IsValidJsonSectionString(paste)) {
          this.copy_section = paste;

          this.pastSection(
            this.past_hover_index === null
              ? this.$builder.sections.length + 1
              : this.past_hover_index + 1,
          );
          event.preventDefault();
        }
      };
      document.addEventListener("paste", this.onPast, true);
    },

    //――――――――――――――――――――――  Copy Section ――――――――――――――――――――

    copySection(section) {
      this.copy_section = JSON.stringify({
        name: section.name,
        data: section.data,
      });
      this.copyToClipboard(
        this.copy_section,
        "Copy Section Data & Structure",
        `The section has been successfully copied to the clipboard. You can paste it onto other pages.`,
      );
    },
    saveSectionToRepository(section) {
      const _section = JSON.stringify({
        name: section.name,
        data: section.data,
      });
      this.EventBus.$emit("show:PageElementsRepository:Add-My-Section", {
        section: _section,
      });
    },

    //――――――――――――――――――――――  Past Section ――――――――――――――――――――

    pastSection(index) {
      if (!this.copy_section) {
        this.showWarningAlert(
          "First copy a section!",
          "Data on clipboard not found!",
        );

        return;
      }

      try {
        let section = JSON.parse(this.copy_section);
        if (section.name && section.data) {
          this.builder.add(section, index, false, true);
          this.onSaveHistory();
          this.autoLoadSectionFonts(section);
          return;
        }
      } catch (e) {
        console.error(e);
      }

      this.showWarningAlert("Invalid", "Clipboard data has invalid structure!");
    },

    //――――――――――――――――――――――  Delete Section ――――――――――――――――――――

    deleteSection(section) {
      try {
        this.builder.remove(section);
        this.onSaveHistory();
      } catch (e) {
        console.error(e);
        this.showErrorAlert(
          null,
          "We can not remove this section! Maybe fix it by refreshing the page.",
        );
      }
    },

    inActiveEditingMode() {
      // Are we the other tab?
      if (!this.isElementVisible(this.$el)) {
        return false;
      }
      // Check dialog open then prevent any undo / redo short key!
      if ($(".v-dialog__content.v-dialog__content--active").length) {
        // The element exists
        return false;
      }
      return true;
    },
    isElementVisible(element) {
      var rect = element.getBoundingClientRect();
      return rect.height > 0;
    },

    /**
     * External function call. (don't change it!)
     *
     * @constructor
     */
    PageStyleCalc() {
      if (!this.pageStyle) return; // Fix bugs

      this.CUSTOM_PAGE_STYLE =
        BackgroundHelper.CreateCompleteBackgroundStyleObject(
          this.pageStyle.bg_custom,
          this.pageStyle.bg_gradient,
          this.pageStyle.bg_image
            ? this.getShopImagePath(this.pageStyle.bg_image)
            : null,
          this.pageStyle.bg_size,
          this.pageStyle.bg_repeat,
          this.pageStyle.bg_color,
        );

      //console.log('Calculate page style!', this.CUSTOM_PAGE_STYLE);
    },

    //-----------------------------------

    calcMaxH() {
      //console.log('calcMaxH',this.max_h)
      if (this.scale_down) {
        let height = this.$refs.artboard.clientHeight;
        this.max_h = 100 + height / 2 + "px"; //height/2 + 'px'; // problem in add new element
      } else {
        this.max_h = "unset";
      }
    },
    getJson() {
      const page = this.$builder.export();
      this.checkHealth(page);
      return page;
    },

    //-----------------------------------

    checkHealth(page) {
      const t = this;

      function checking(obj) {
        for (let key of Object.keys(obj)) {
          const val = obj[key];

          if (
            !val ||
            key === "iframe" ||
            key === "html" /**@see LSectionHtml**/
          )
            continue; // Not change iframe!

          if (t.isString(val)) {
            // Purify if past from word:
            if (val.includes("<!--")) {
              // Remove comments:
              let corrected = val.replace(/<!--.*?-->/gs, "");
              // Remove classes:
              corrected = corrected.replace(/class=".*?"/gs, "");

              /* console.error(
                      "FAULT DETECTION ->",
                      key + " -> " + val,
                      "Corrected",
                      corrected
              );*/
              obj[key] = corrected;
            }
          } else if (Array.isArray(val)) {
            // Array:
            checking(val);
          } else if (typeof val === "object" && val !== null) {
            // Object:
            checking(val);
          }
        }
      }

      // Check all values:
      checking(page);
    },

    newSection() {
      // add the section immediately if none are present.
      if (this.components.length === 1) {
        this.addSection(this.components[0]);
        return;
      }
      this.toggleListVisibility();
    },
    addSection(section, position) {
      //console.log("addSection", section, "position", position);

      this.$builder.add(section, position, true, true);

      // Fix BUG direction change by vuetify!
      this.$nextTick(() => {
        //console.log("Set Direction addSection > Fix", this.getCurrentLanguage().dir);
        this.$vuetify.rtl = this.getCurrentLanguage().dir === "rtl";
      });

      this.onSaveHistory();
    },

    loadNextDelayed() {
      _.delay(() => {
        this.delay_load++;
        // console.log('this.delay_load',this.delay_load,this.$builder.sections.length)
        if (this.delay_load <= this.$builder.sections.length) {
          this.$nextTick(() => {
            this.loadNextDelayed();
          });
        } else {
          this.delay_load = 999;
        }
      }, 300);
    },

    addTheme(theme) {
      this.setPage(theme, true);

      this.$emit("load:template", { content: this.getJson(), image: null }); // Simulate like landing page template files!
    },

    loadTemplate(page) {
      this.setPage(page.content);

      //update random title:
      const title = "Landing-" + Math.random().toString(36).substring(7);
      page.content.title = title;

      this.$emit("load:template", page);
    },

    setPage(data, from_theme = false) {
      this.delay_load = 0;

      console.style("<b>📐 Set page builder data.</b>", data, from_theme);

      // ---------------------------------------*******************-------------------------------------
      // 🌼 Set style if not exist:
      if (!data.style || Array.isArray(data.style))
        data.style = { font_size: 16, bg_color: "", fonts: [] };

      if (!data.style.font_size) data.style.font_size = 16;
      if (!data.style.bg_color) data.style.bg_color = "";
      if (!data.style.bg_gradient) data.style.bg_gradient = [];
      if (!data.style.bg_size) data.style.bg_size = "cover";
      if (!data.style.bg_custom) data.style.bg_custom = null;
      if (!data.style.bg_repeat) data.style.bg_repeat = null;

      // Set initial fonts size:
      if (!this.isValidFontSize(data.style.h1_size))
        data.style.h1_size = PageBuilderTypoHelper.H1_SIZE_DEFAULT;
      if (!this.isValidFontSize(data.style.h2_size))
        data.style.h2_size = PageBuilderTypoHelper.H2_SIZE_DEFAULT;
      if (!this.isValidFontSize(data.style.h3_size))
        data.style.h3_size = PageBuilderTypoHelper.H3_SIZE_DEFAULT;
      if (!this.isValidFontSize(data.style.h4_size))
        data.style.h4_size = PageBuilderTypoHelper.H4_SIZE_DEFAULT;
      if (!this.isValidFontSize(data.style.h5_size))
        data.style.h5_size = PageBuilderTypoHelper.H5_SIZE_DEFAULT;
      if (!this.isValidFontSize(data.style.h6_size))
        data.style.h6_size = PageBuilderTypoHelper.H6_SIZE_DEFAULT;
      if (!this.isValidFontSize(data.style.p_size))
        data.style.p_size = PageBuilderTypoHelper.P_SIZE_DEFAULT;

      // ---------------------------------------*******************-------------------------------------

      this.inEditMode = true;
      this.$builder.setContent(data, from_theme);

      this.loadNextDelayed();

      if (!from_theme) {
        // Save initial state: (Call after set!)
        this.onSaveHistory();
      }
    },

    isValidFontSize(size) {
      return size && this.isString(size) && !size.includes("-") && size !== "0";
    },

    toggleSort() {
      // BUG: when in sort mode drop new section that section can't be edited!
      if (!this.$builder.isSorting && this.listShown)
        this.toggleListVisibility();

      this.$builder.isSorting = !this.$builder.isSorting;
      this.$builder.isEditing = !this.$builder.isSorting;
      if (!this.$builder.isSorting && this.sortable) {
        this.sortable.option("sort", false);
        this.sortable.option("disabled", true);

        return;
      }
      this.sortable.option("disabled", false);
      this.sortable.option("sort", true);
    },

    /**
     * Hide add buttons and empty texts
     */
    toggleHideExtra() {
      this.$builder.isHideExtra = !this.$builder.isHideExtra;
    },

    toggleListVisibility() {
      // BUG: when in sort mode drop new section that section can't be edited!
      if (!this.listShown && this.$builder.isSorting) this.toggleSort();

      this.listShown = !this.listShown;
      this.sortable.option("disabled", !this.listShown);
    },
    showList() {
      this.listShown = true;
      this.sortable.option("disabled", false);
    },

    submit() {
      this.$emit("saved", this.$builder);
    },

    getComponents() {
      let components = [];

      // get components data
      components = Object.keys(this.$builder.components).map((name) => {
        name = Migration.MigrateSectionName(name);
        const component = this.$builder.components[name];
        return {
          name: name,
          group: component.group,
          cover: component.cover,
          label: component.label,
          help: component.help,

          schema: component.$schema,
        };
      });

      return components;
    },

    onScroll(e) {
      this.scrollTop = document.documentElement.scrollTop;
    },

    //――――――――――――――――――――――  Drop section (pre-built) ――――――――――――――――――――
    dropSection(event, index) {
      // console.log('dropSection!' ,event)

      const text = event.dataTransfer.getData("section");

      if (text)
        try {
          const json = JSON.parse(text);

          if (json && json.name && json.data) {
            event.preventDefault();
            // console.log("added!");
            this.$builder.add(json, index + 1, false, true);
            this.autoLoadSectionFonts(json);
          }
        } catch (e) {
          this.showErrorAlert(null, e);
        }
      this.past_hover_index = null;
      this.drop_section = false;

      this.onSaveHistory();
    },
    allowDropSection(event, index, allowed_class) {
      // Tips:  getData("section") not available on drag over event in chrome , edge ,... security!
      const types = event.dataTransfer.types;
      //  console.log('allowDropSection!' ,types)

      if (types.includes("section")) {
        // console.log('allowDropSection' ,this.past_hover_index,index)
        event.preventDefault();
        this.past_hover_index = index;
        this.drop_section = true;
        return true;
      }
    },
    leaveDrag(event) {
      if (
        this.$builder.sections.length /*No section mode!*/ &&
        !event.target.classList.contains("target-drop")
      )
        return;
      //  console.log('leaveDrag' ,event)
      // if (event.dataTransfer.types.includes("section")) return;
      //  console.log('leaveDrag' ,this.past_hover_index)

      this.past_hover_index = null;
      this.drop_section = false;
    },

    showFeeder(section) {
      this.selected_section = section;
      this.selected_component = this.$refs[`SECTION_${section.uid}`][0]; // v-for return refs in array!
      this.dialog_feeder = true;
    },

    autoComplete(section) {
      const promise = this.aiAutoFillFunction(section);
      if (!promise) return;

      // console.log("section -> ", section);
      this.loading_ai.push(section);

      promise
        .then((generated) => {
          console.log("🆎 AI created content.", section, generated);
          Object.assign(section.data, generated);
        })
        .finally(() => {})
        .finally(() => {
          this.loading_ai.remove(section);
        });
    },

    showWriteNote(section) {
      if (!section) return;

      this.showGlobalShopNoteDialog(
        this.page.notes,
        section.uid,
        this.shop_page?.id,
        this.shop_popup?.id,
      );
    },
    autoShowNote() {
      if (this.$route.query.element_id) {
        this.showWriteNote(
          this.$builder.sections.find(
            (s) => s.id === this.$route.query.element_id,
          ),
        ); // Auto open note dialog if element_id be in query (used in notifications link)
      }
    },

    setModelInBuilder() {
      const model_type = this.isPopup ? "popup" : this.isMenu ? "menu" : "page";
      this.$builder.setModel(model_type, this.page); // Link model (pass to generate upload urls)
    },

    handleClickOnSections(event) {
      if (
        !HighlightEditingElements.IsChildOfHighlightActiveEditing(event.target)
      )
        this.EventBus.$emit(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../stylus/app";
//@import "../stylus/colors";

$gray: #c1c1c1;
$blue: #0072ff;
$red: #ff3d3d;
$green: #18d88b;
$dark: #323c47;

::v-deep(.sortable-ghost) {
  .fmenu-elementImage {
    width: 100%;
    height: auto;
    background: #1976d2;
  }
}

h1 {
  font-size: 1.7rem;
}

p {
  font-size: 1.2rem;

  &.small {
    font-size: 1rem;
  }
}

.artboard {
  transform-origin: top center;

  &.is-editable .is-editable {
    outline: none;
  }
}

.controller {
  box-sizing: border-box;

  &-panel {
    position: fixed;
    z-index: 200;
    bottom: 30px;
    right: 40px;
  }

  &-input {
    outline: none;
    border: 1px solid $gray;
    padding: 0.5em 1em;
    margin: 20px 0;
    border-radius: 40px;
    width: 100%;
    font-size: 16px;
    max-width: 500px;

    &:focus {
      border-color: $blue;
      box-shadow: 0 0 0 2px rgba($blue, 50%);
    }
  }

  &-button {
    transition: 0.2s;
    border: none;
    outline: none;
    border-radius: 20px;
    padding: 5px;
    color: $white;
    fill: $white;
    font-size: 16px;

    svg {
      transition: 0.2s;
    }

    &:not(:last-child) {
      margin-right: 20px;
    }

    &.is-rotated > svg {
      transform: rotate(45deg);
    }

    &.is-blue {
      background-color: $blue;

      &:hover {
        background-color: darken($blue, 20%);
      }
    }

    &.is-red {
      background-color: $red;

      &:hover {
        background-color: darken($red, 20%);
      }
    }

    &.is-green {
      background-color: $green;

      &:hover {
        background-color: darken($green, 20%);
      }
    }

    &.is-dark {
      background-color: $dark;

      &:hover {
        background-color: darken($dark, 20%);
      }
    }

    &.is-gray {
      background-color: $gray;

      &:hover {
        background-color: darken($gray, 20%);
      }
    }
  }

  &-intro {
    width: 100%;
    max-width: 1620px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 70px 50px;
    text-align: center;
    font-size: 30px;
    color: $dark;
  }
}

.menu {
  user-select: none;
  position: fixed;
  z-index: 300;
  top: 0;
  left: 0;
  bottom: 0;
  margin: 0;
  width: 250px;
  background: $white;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  list-style: none;
  transition: 0.4s;
  box-shadow: 1px 0 10px rgba($dark, 20%);
  transform: translate3d(-100%, 0, 0);

  &.is-visiable {
    transform: translate3d(0, 0, 0);
  }

  &-body {
    display: none;
    padding: 0;
    margin: 0;
    list-style: none;

    .menu-group & {
      width: 90%;
      margin: 10px auto;
    }

    .menu-group.is-visiable & {
      display: block;
    }
  }

  &-icon {
    width: 24px;
    height: 24px;
    fill: $gray;
    transition: 0.2s;

    .menu-group.is-visiable & {
      transform: rotate(180deg);
    }
  }

  &-element {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 50px;
    border-radius: 5px;
    background: #fafafa;
    transition: 0.3s;
    cursor: pointer;
    color: $white;
    overflow: hidden;
    user-select: none;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &-elementImage {
    max-width: 100%;
    pointer-events: none;
  }

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 5px;
    border-bottom: 1px solid rgba($black, 5%);
  }
}

.sortable-ghost {
  background-color: #0c91d3;
  opacity: 0.9;
  height: max-content;
  box-shadow: 0 0 2px 1px $blue;
}

.is-editable {
  &:hover {
    //box-shadow: inset 0 0 0 2px $gray;
  }
}

.controller-panel {
  background-color: #353e45;
  border-radius: 24px;
  box-shadow: 5px 10px 10px 0px rgba(0, 0, 0, 0.3);
  transition: all 0.65s;

  &:hover {
    box-shadow: 8px 15px 10px 0px rgba(0, 0, 0, 0.3);

    transition: all 0.5s;
  }

  //  padding: 8px 16px 24px 16px;
  padding: 0;

  .button-item {
    margin: 8px 16px 24px 16px;
  }
}

label {
  margin: 12px 0 0 0;
  font-size: 1.2rem;
}

.widget-hover {
  transition: all 0.65s;
  min-height: 100px;
  box-shadow: none;

  &:hover {
    box-shadow: 0px 10px 50px 0px rgba(0, 0, 0, 0.2);
    transition: all 0.5s;
  }
}

.move-courser {
  position: relative;
  cursor: move;
  transition: all 0.3s;

  &:hover {
    &::after {
      animation: fadeInFromNone 0.3s ease-out;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #ffc107 !important;
      opacity: 0.4;
    }

    box-shadow: 0px 10px 50px 0px rgba(0, 0, 0, 0.2);
  }

  &:active {
    /* &::after{
        background-color: #FFA000 !important;
        opacity: 0.8;
      }*/
  }
}

::v-deep(.block-pointer-event) {
  div {
    pointer-events: none;
    animation: none !important;
  }
}

@keyframes fadeInFromNone {
  0% {
    opacity: 0;
  }

  1% {
    opacity: 0;
  }

  100% {
    opacity: 0.4;
  }
}
</style>

<style lang="scss">
// ------------------------------ Clone style ------------------------------

.cursor-pipette {
  [clonable] {
    pointer-events: auto !important;
    transition: none !important;

    &:hover {
      cursor: url(data:image/x-icon;base64,AAABAAEAEBAAAAAAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAD///8BAAAAfwAAAIH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////Af///wH///8BAAAAcQAAAN8AAADTAAAArwAAAE8AAAAJ////Af///wH///8B////Af///wH///8B////Af///wH///8B////AQAAAJEAAADLAAAAEwAAAHsAAADDAAAA3wAAADP///8B////Af///wH///8B////Af///wH///8B////Af///wH///8BAAAAuQAAAHX///8B////AQAAAF0AAADtAAAAOf///wH///8B////Af///wH///8B////Af///wH///8B////AQAAAFMAAAC/////Af///wH///8BAAAAUQAAAO0AAAA5////Af///wH///8B////Af///wH///8B////Af///wEAAAANAAAA5wAAAFH///8B////Af///wEAAABRAAAA7QAAADn///8B////Af///wH///8B////Af///wH///8B////AQAAAD0AAADtAAAARf///wH///8B////AQAAAFEAAADtAAAAOQAAACP///8B////Af///wH///8B////Af///wH///8BAAAARQAAAO0AAABF////Af///wH///8BAAAAUQAAAO0AAADvAAAAmf///wH///8B////Af///wH///8B////Af///wEAAABFAAAA7QAAAEX///8B////AQAAADUAAADxAAAA/wAAAPcAAAAr////Af///wH///8B////Af///wH///8B////AQAAAEUAAADtAAAARQAAADUAAADvAAAA/wAAAPcAAABFAAAALf///wH///8B////Af///wH///8B////Af///wH///8BAAAARQAAAO0AAADvAAAA/wAAAPcAAABFAAAAgwAAAPsAAABX////Af///wH///8B////Af///wH///8B////AQAAACUAAADvAAAA/wAAAPcAAABFAAAAgwAAAP8AAAD/AAAA+wAAAE////8B////Af///wH///8B////Af///wEAAAADAAAAoQAAAPcAAABFAAAAgwAAAP8AAAD/AAAA/wAAAP8AAADf////Af///wH///8B////Af///wH///8B////AQAAAAMAAAAvAAAALQAAAPsAAAD/AAAA/wAAAP8AAAD/AAAA+////wH///8B////Af///wH///8B////Af///wH///8B////Af///wEAAABXAAAA+wAAAP8AAAD/AAAA/wAAALX///8B////Af///wH///8B////Af///wH///8B////Af///wH///8B////AQAAAE8AAADfAAAA+wAAALUAAAAXAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//w==),
        default !important;
      border: solid 4px #000 !important;
    }

    * {
      pointer-events: none;
    }
  }
}

.cursor-bucket {
  [clonable] {
    pointer-events: auto !important;
    transition: none !important;

    &:hover {
      cursor: url("data:image/x-icon;base64,AAACAAEAICAQAAAAAADoAgAAFgAAACgAAAAgAAAAQAAAAAEABAAAAAAAAAIAAAAAAAAAAAAAEAAAAAAAAAAAAAAAR0dHAP///wAiIiIAMjIyABYWFgA9PT0AODg4AE9PTwBfX18AKioqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiIiIiIiIiIgAAAAAAAAAACgAAAKMAAAIAAAAAAAAAAAAAAAoiMAACAAAAAAAAAAAAAAACIiYAAgAAAAAAAAAAYAAAIiIiMAIAAAAAAAAAADAAAiIiIiACAAAAAAAAAAUFACIiIiIiQgAAAAAAAAADAKIiIiIiIgIAAAAAAAAAAGMiImIiIiECAAAAAAAAAAUAIiApIiJgAgAAAAAAAAAApgIiAiIgAAIAAAAAAAAAAAAKIoIiAAACAAAAAAAAAAAABwICIAAAAgAAAAAAAAAAAAAAAlAAAAIAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAACgAIAAAgAAAAAAAAAAAAAAAKAAAAIAAAAAAAAAD///////////////////////////////////////////////////////////////////////////////+AAH//359//58Pf/8eB3//HAN//xgBf/8QAH//AAB//wABf/8AA3//gAd//8APf//wD3///C9///5vf//+73///x9//w=="),
        auto;

      border: solid 4px #000 !important;
    }

    * {
      pointer-events: none;
    }
  }
}

// ------------------------------ Global style ------------------------------
.main-sections-container {
  transition: all 0.5s;
  transform-origin: 50% 84px;
  background-color: #fff;
  border-radius: 28px;

  &.in-scale-down {
    //  overflow: hidden;
    // border-radius: 18px;
    transform: scale(0.5);
    //   outline: #333 dashed 3px;
    //  outline-offset: 8px;
    box-shadow: 0px 10px 50px 5px rgba(113, 112, 112, 0.24) !important;
  }

  margin: auto;

  &.desktop {
    max-width: 1920px;
  }

  &.tablet {
    max-width: 1200px;
  }

  &.mobile {
    max-width: 680px;
  }

  // Fix no sections page height
  .page-content-wrap-editor {
    min-height: 80vh;

    &.drop-active {
      background: #4e52c4 !important;
    }
  }

  //---------------------- Animation render mode ---------------------------
  &.--blueprint-mode {
    --main-bg-color: #225082;
    --section-bg-color: unset; //rgba(11, 119, 191, 0.85);
    --element-bg-color: rgba(9, 55, 84, 0.1);
    --solid-bg-color: #0b77bf;
    --solid-bg-color-dark: #0b6aaa;
    --text-color: rgba(255, 255, 255, 0.1);
    --btn-bg-color: #115a89;
    --btn-text-color: rgba(255, 255, 255, 0.2);

    --border-color: #fff;

    --ban-pointer-event: none;
    --ban-user-select: none;

    &.--editable {
      --ban-pointer-event: auto;
      --ban-user-select: auto;
    }

    &.--tracking {
      --main-bg-color: #fafafa;
      --section-bg-color: unset; // rgba(217, 216, 216, 0.79);
      --element-bg-color: rgba(167, 167, 167, 0.11);
      --solid-bg-color: #eee;
      --solid-bg-color-dark: #ddd;
      --text-color: #33333322;
      --btn-bg-color: #eee;
      --btn-text-color: #333;

      .-in-animation {
        opacity: 0 !important;
      }

      // Show ID of editable elements:
      .-trackable {
        // Element must have -trackable class!
        position: relative;

        &[id]:not([id=""]) {
          border: solid #b60e0e !important;

          &:after {
            position: absolute;
            top: -30px;
            right: 0;
            background: #b60e0e;
            color: #fff;
            font-size: 8px;
            padding: 4px 8px;
            border-radius: 6px;
            content: attr(id);
            font-weight: 700;
            z-index: 4;
            transition: all 0.5s ease-in-out;
          }

          &:hover {
            &:after {
              transform: translateY(-50%);
            }
          }
        }
      }
    }

    &.--wire {
      --main-bg-color: #fafafa;
      --section-bg-color: unset; // rgba(217, 216, 216, 0.79);
      --element-bg-color: rgba(167, 167, 167, 0.11);
      --solid-bg-color: #eee;
      --solid-bg-color-dark: #ddd;
      --text-color: #33333322;
      --btn-bg-color: #eee;
      --btn-text-color: #333;

      --border-color: #333;

      .-in-animation {
        opacity: 0 !important;
      }

      // Start add class & style show box

      &.--show-classes {
        .is-editable {
          &[class]:not([class=""]) {
            &:after {
              content: attr(class);
            }
          }
        }
      }

      &.--show-styles {
        .is-editable {
          &[style]:not([style=""]) {
            &:after {
              content: attr(style);
            }
          }
        }
      }

      &.--show-classes,
      &.--show-styles {
        .is-editable {
          position: relative;

          &[class]:not([class=""]),
          &[style]:not([style=""]) {
            &:after {
              //border: solid #AFB42B 1px !important;
              position: absolute;
              top: -30px;
              right: 0;
              background: #f0f4c3;
              color: #000;
              font-size: 8px;
              padding: 4px 8px;
              border-radius: 6px;
              font-weight: 700;
              z-index: 4;
              transition: all 0.5s ease-in-out;
              line-height: normal;
            }

            &:hover {
              &:after {
                transform: scale(1.2);
                z-index: 10;

                background: var(--def-color);
                color: #fff;
              }
            }

            // Row:
            &.v-row {
              &:after {
                top: unset;
                bottom: -30px;
                right: 0;
              }
            }

            // Column:
            &.v-col {
              &:after {
                top: unset;
                bottom: 0px;
                right: unset;
                left: 0;
              }
            }

            // Container:
            &.v-container {
              &:after {
                top: 0;
                bottom: unset;
                right: unset;
                left: 0;
              }
            }

            // Section:
            &.section {
              &:after {
                top: 0;
                right: 0;
                transform-origin: right;
              }
            }
          }
        }

        //End of is-editable
      }

      // End add class & style show box
    }

    // Start fix border width in scale down mode
    &.in-scale-down {
      .page-content-wrap-editor {
        section {
          border-width: 1.5px !important;

          .is-editable:not(section):not(.button):not(.artboard):not(.v-btn) {
            border-width: 1.5px !important;
          }
        }
      }
    }

    // End fix border width in scale down mode

    .page-content-wrap-editor {
      background: var(--main-bg-color) !important;
      // Add margin between sections to beter view:
      > section:first-child {
        border-top: unset !important;
      }

      section {
        border-style: dashed !important;
        border-width: thin !important;
        border-color: var(--border-color) !important;
        background: var(--section-bg-color) !important;

        border-left: unset !important;
        border-right: unset !important;
        border-bottom: unset !important;

        .is-editable {
          border-style: dashed !important;
          border-width: thin !important;
          border-color: var(--border-color) !important;
          background: var(--element-bg-color) !important;
          transition-duration: 0.2s;
        }

        // ************************* Images: (Blue print mode -> stripe) *************************
        .image-container {
          cursor: initial;

          .v-img {
            // v-image (Old i used this)
            filter: none !important;
            pointer-events: var(--ban-pointer-event) !important;

            .v-img__image {
              background-color: var(--solid-bg-color) !important;
              background-image: repeating-linear-gradient(
                -45deg,
                var(--solid-bg-color),
                var(--solid-bg-color) 5px,
                var(--solid-bg-color-dark) 5px,
                var(--solid-bg-color-dark) 10px
              ) !important;
              background-size: cover;
            }
          }

          > :not(.v-img, img):not(header):not(.-in-animation) {
            display: none;
          }

          // ************************* <img> (New) *************************
          .-foreground {
            //img has no after!
            position: absolute !important;
            display: block !important;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            filter: none !important;
            pointer-events: var(--ban-pointer-event) !important;
            background-color: var(--solid-bg-color) !important;
            background-image: repeating-linear-gradient(
              -45deg,
              var(--solid-bg-color),
              var(--solid-bg-color) 5px,
              var(--solid-bg-color-dark) 5px,
              var(--solid-bg-color-dark) 10px
            ) !important;
            background-size: cover;
          }

          img {
            opacity: 0;
          }
        }

        // END: .image-container

        .v-input {
          .v-input__slot {
            color: var(--text-color) !important;
            background: var(--solid-bg-color) !important;
          }
        }

        // Texts:
        p,
        h1,
        h2,
        h3,
        h4,
        h5 {
          color: var(--text-color) !important;
          background: transparent !important;
          user-select: var(--ban-user-select) !important;
          cursor: initial;

          font,
          big,
          small {
            color: var(--text-color) !important;
          }

          > div {
            // All time text gradient wrap with div!
            -webkit-text-fill-color: unset !important;
            -webkit-background-clip: unset !important;
            background: transparent !important;
            color: var(--text-color) !important;
          }
        }

        // buttons:

        button.is-editable {
          // Not apply to toolbar tools! (In image uploader)
          box-shadow: none !important;
          background: var(--btn-bg-color) !important;
          color: var(--btn-text-color) !important;
          user-select: var(--ban-user-select) !important;
        }

        // (make hide!)
        .hide-on-blueprint {
          display: none !important;
        }

        // Product:
        .product-view {
          pointer-events: var(--ban-pointer-event);
          position: relative;

          &:after {
            font-family: "fontawesome";
            content: "\f291";
            font-size: 5rem;

            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;

            position: absolute;
            background: var(--solid-bg-color)
              repeating-linear-gradient(
                45deg,
                var(--solid-bg-color),
                var(--solid-bg-color) 10px,
                var(--solid-bg-color-dark) 10px,
                var(--solid-bg-color-dark) 20px
              );
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            border-radius: 8px;
            border: solid var(--solid-bg-color-dark);
          }
        }

        // Products & Categories:
        .products-container {
          .products-layout {
            > .flex,
            .card-item-new {
              pointer-events: var(--ban-pointer-event);
              position: relative;

              &:after {
                font-family: "fontawesome";
                content: "\f115";
                font-size: 3rem;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;

                position: absolute;
                background: repeating-linear-gradient(
                  45deg,
                  var(--solid-bg-color),
                  var(--solid-bg-color) 10px,
                  var(--solid-bg-color-dark) 10px,
                  var(--solid-bg-color-dark) 20px
                );
                left: 2%;
                top: 2%;
                width: 96%;
                height: 96%;
                z-index: 100;

                border-radius: 8px;
                border: solid var(--solid-bg-color-dark);
              }

              // end after

              > div {
                // Content of card:
                opacity: 0 !important;
              }
            }

            // end div

            > .card-item-new {
              &:after {
                content: "\f291" !important;
              }
            }
          }

          // end products-layout
        }

        // Article: (Or blogs)
        .s--article-editor-container,
        .blog-card {
          pointer-events: var(--ban-pointer-event);
          position: relative;

          &:after {
            font-family: "fontawesome";
            content: "\f1ea";
            font-size: 5rem;

            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;

            position: absolute;
            background: var(--solid-bg-color)
              repeating-linear-gradient(
                45deg,
                var(--solid-bg-color),
                var(--solid-bg-color) 10px,
                var(--solid-bg-color-dark) 10px,
                var(--solid-bg-color-dark) 20px
              );
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            border-radius: 8px;
            border: solid var(--solid-bg-color-dark);
          }
        }

        // Blogs:
        .blog-card {
          &:after {
          }
        }
      }

      // End section
    }
  }
}

.side-menu {
  position: absolute;
  right: -80px;
  top: 200px;
  background: #7577fa;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  padding: 4px;
  text-align: center;
  transition: all ease-in-out 0.25s;
  transition-delay: 0s;
  font-size: 10px;
  color: #fff;

  &.-scale-down {
    right: calc(25% - 64px);
    transition-delay: 0.1s;
    transition-duration: 0.5s;
  }
}

.hidden {
  display: none;
}

.show-name {
  position: relative;

  &:after {
    position: absolute;
    left: 0;
    padding: 4px 8px 4px 20px;
    top: 20px;
    content: attr(section-name);
    display: block;
    background-color: #222;
    border-radius: 0 12px 12px 0;
    color: #fff;
    font-size: 20px;
    text-transform: capitalize;
    z-index: 100;
  }
}

.arrow-margin {
  position: absolute;
  width: 6px;
  height: var(--margin);
  right: -12px;
  z-index: 2;

  border-right: dashed 3px;
  border-top: solid 3px;
  border-bottom: solid 3px;

  user-select: none;

  &:hover {
    border-color: #d32f2f;

    &:after {
      background: #d32f2f;
    }
  }

  &:after {
    content: attr(margin);
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translate(0, -50%);
    padding: 4px;
    background: #000;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    border-radius: 6px;
  }

  &.-top {
    top: 0;
  }

  &.-bottom {
    bottom: 0;
  }

  &.--reverse {
    height: calc(-1 * var(--margin));

    &.-top {
      top: var(--margin);
    }

    &.-bottom {
      bottom: var(--margin);
    }
  }
}

.x-feeder {
  display: flex;
  align-items: center;

  position: absolute;
  left: -360px;
  top: 100px;
  flex-direction: row-reverse;

  --margin-left-bar: -80px;

  &:before {
    content: "";
    height: 4px;
    background: #0d0d0d;
    width: 280px;
    margin-left: var(--margin-left-bar);
    pointer-events: none;
  }

  &.-single {
    --margin-left-bar: -45px;
  }

  &.-double {
    --margin-left-bar: -100px;
  }

  &.-triple {
    --margin-left-bar: -175px;
  }

  .x-feeder-btn {
    background: #0d0d0d;
    border-radius: 50%;
    position: relative;
    z-index: 1;

    .v-icon {
      transition: all 0.3s;
    }

    &:hover {
      .v-icon {
        transform: rotate(120deg);
      }
    }
  }
}

//-------------------- Inline editor menus -----------------------
.inline-editor-sheet {
  background-color: #225082 !important;
  margin: 8px;
  padding: 8px;
  border-radius: 8px;
  text-align: center;
}

.in-scale-down {
  .inline-editor-sheet {
    button.v-btn--outlined {
      border-width: 4px !important; // Fix outline bad show in scale down mode!
    }
  }
}
</style>
