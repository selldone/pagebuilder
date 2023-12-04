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
    class="page-builder position-relative"
    v-scroll="onScroll"
    spellcheck="false"
    data-gramm="false"
    style="min-height: 60vh"
  >
    <!-- ------------------------------------- Themes ------------------------------------------>

    <page-templates-list
      v-if="showIntro && !$builder.sections.length"
      has-header
      :themes="themes"
      @select:raw-theme="(_raw) => addTheme(_raw)"
      @select:page="(_page) => loadTemplate(_page)"
    ></page-templates-list>

    <!-- ████████████████████████ Editor ████████████████████████ -->
    <div
      :style="{ 'max-height': max_h }"
      class="overflow-y-hidden"
      :class="{ hidden: showIntro && !$builder.sections.length }"
      @mouseup="
        $builder.isEditing && sections && sections.length
          ? onSaveHistory()
          : undefined
      "
    >
      <!--
      <div
        class="absolute-top-start text-start op-0-5 p-3 hover-show"
        style="width: 380px; max-width: 25%"
      >
        <h2 class="font-weight-medium">BETA</h2>
        <div class="small hide-on-small-900">
          <v-icon x-small>check</v-icon> It will contain an onboarding +AI in
          the stable version.<br />
          <v-icon x-small>check</v-icon> You describe your request, and the
          landing page will be created.<br />
          <v-icon x-small>check</v-icon> Publish your dream design sketch on
          Twitter ( + <span class="p-0" v-copy>@SelldoneInc</span>), then we
          make it as a template for free.<br />
        </div>
      </div>-->
      <div
        id="artboard"
        ref="artboard"
        class="artboard overflow-hidden"
        :class="{
          'is-sorting': $builder.isSorting,
          'is-editable': $builder.isEditing && inEditMode,
        }"
      >
        <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆  Side Helper (View Mode) ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

        <div
          class="side-menu zoomIn"
          v-if="!$builder.isAnimation && !$builder.isTracking"
          :class="{ '-scale-down': scale_down }"
        >
          <b>View</b>
          <v-btn
            icon
            dark
            @click="render_mode = null"
            :color="!render_mode ? 'amber' : undefined"
            ><v-icon>burst_mode</v-icon></v-btn
          >
          <v-btn
            icon
            dark
            @click="render_mode = 'simple'"
            :color="render_mode === 'simple' ? 'amber' : undefined"
            ><v-icon>apps</v-icon></v-btn
          >
          <v-btn
            icon
            dark
            @click="render_mode = 'wire'"
            :color="render_mode === 'wire' ? 'amber' : undefined"
            ><v-icon>grid_on</v-icon></v-btn
          >

          <v-expand-transition>
            <div v-if="render_mode === 'wire'" class="d-flex flex-column">
              <hr />
              <v-btn
                icon
                dark
                @click="
                  show_classes = !show_classes;
                  show_styles = false;
                "
                :color="show_classes ? '#512DA8' : undefined"
                class="sub-caption mb-3"
                caption="Class"
                ><v-icon>architecture</v-icon></v-btn
              >
              <v-btn
                icon
                dark
                @click="
                  show_styles = !show_styles;
                  show_classes = false;
                "
                :color="show_styles ? '#512DA8' : undefined"
                class="sub-caption mb-3"
                caption="Style"
                ><v-icon>format_paint</v-icon></v-btn
              >
            </div>
          </v-expand-transition>
        </div>

        <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆  Top Bar ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

        <div
          class="main-sections-container no-inv"
          :style="CUSTOM_PAGE_STYLE"
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
        >
          <v-toolbar
            v-if="page"
            dir="ltr"
            flat
            class="py-1 border-bottom rounded-t-xl"
            height="84"
          >
            <!-- ▃▃▃▃▃▃▃▃▃▃ 📇 View > Normal ▃▃▃▃▃▃▃▃▃▃ -->

            <v-tooltip color="#111" top max-width="420">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  small
                  icon
                  class="sub-caption -hover m-0 b-16px"
                  caption="Design"
                  @click="
                    $builder.isAnimation = false;
                    $builder.isTracking = false;
                    $builder.isHideExtra = false;
                  "
                >
                  <v-icon
                    small
                    :color="
                      !$builder.isAnimation && !$builder.isTracking
                        ? 'green'
                        : undefined
                    "
                    class="hover-scale-small"
                    >lens</v-icon
                  >
                </v-btn>
              </template>
              <div class="text-start small pa-1">
                <b class="d-block">Normal View</b>
                <div>
                  <v-icon dark small class="me-1">design_services</v-icon> You
                  can access all the elements and editing tools required to
                  modify the content and layout of the landing page.
                </div>
              </div>
            </v-tooltip>

            <!-- ▃▃▃▃▃▃▃▃▃▃ 📇 View > Animation ▃▃▃▃▃▃▃▃▃▃ -->

            <v-tooltip color="#111" top max-width="420">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  small
                  icon
                  class="sub-caption -hover m-0 b-16px"
                  caption="Animation"
                  @click="
                    $builder.isAnimation = true;
                    $builder.isTracking = false;
                    $builder.isHideExtra = true;
                  "
                >
                  <v-icon
                    small
                    :color="$builder.isAnimation ? 'blue' : undefined"
                    class="hover-scale-small"
                    >lens</v-icon
                  >
                </v-btn>
              </template>
              <div class="text-start small pa-1">
                <b class="d-block">Animation View</b>
                <div>
                  <v-icon dark small class="me-1">animation</v-icon> To
                  configure animation and user interactions such as mouse hover
                  transitions, you can check out the blueprint and the
                  minimalist view of the page.
                </div>
              </div>
            </v-tooltip>

            <!-- ▃▃▃▃▃▃▃▃▃▃ 📇 View > Tracking ▃▃▃▃▃▃▃▃▃▃ -->

            <v-tooltip color="#111" top max-width="420">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  small
                  icon
                  class="sub-caption -hover m-0 b-16px"
                  caption="Tracking"
                  @click="
                    $builder.isTracking = true;
                    $builder.isAnimation = false;
                    $builder.isHideExtra = true;
                  "
                >
                  <v-icon
                    small
                    :color="$builder.isTracking ? 'red' : undefined"
                    class="hover-scale-small"
                    >lens</v-icon
                  >
                </v-btn>
              </template>
              <div class="text-start small pa-1">
                <b class="d-block">Tracking View</b>
                <div>
                  <v-icon dark small class="me-1">highlight_alt</v-icon> This
                  view mode presents a simplified display of the page, allowing
                  the allocation of tracking IDs to actions (buttons) that can
                  be utilized in Google Tag Manager and other tracking
                  applications.
                </div>
              </div>
            </v-tooltip>

            <v-text-field
              :disabled="isPopup"
              class="english-field mx-1 mx-sm-2 mx-md-3"
              rounded
              hide-details
              flat
              filled
              :prefix="!isPopup && $vuetify.breakpoint.smAndUp ? base_url : ''"
              v-model="page.name"
              :dense="$vuetify.breakpoint.smAndDown"
              :placeholder="isPopup ? 'Popup' : 'Enter page address*'"
              :rules="!isPopup ? [GlobalRules.required()] : undefined"
              :prepend-inner-icon="isPopup ? 'notifications_none' : undefined"
            >
              <template v-if="!isPopup" v-slot:append>
                <v-btn
                  icon
                  :href="base_url + page.name"
                  target="_blank"
                  class="mt-n3 me-n4"
                  title="Open page"
                  ><v-icon>launch</v-icon></v-btn
                >
              </template>
            </v-text-field>

            <v-tooltip color="#111" top max-width="420">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon
                  @click="toggleListVisibility"
                  class="ml-1"
                >
                  <v-icon>{{
                    scale_down ? "fullscreen_exit" : "fullscreen"
                  }}</v-icon>
                </v-btn>
              </template>
              <div class="text-start small pa-1">
                <b class="d-block">View Mode</b>
                <div>
                  <v-icon dark small class="me-1">center_focus_weak</v-icon>
                  Make fullscreen/compact view mode.
                </div>
                <div>
                  Or press
                  <span class="amber--text"
                    ><v-icon small class="mx-1" color="amber"
                      >swap_horiz</v-icon
                    >
                    Tab</span
                  >.
                </div>
              </div>
            </v-tooltip>
          </v-toolbar>

          <v-progress-linear
            v-if="delay_load > 0 && delay_load < 999"
            striped
            color="success"
            :value="(100 * delay_load) / sections_length"
          ></v-progress-linear>
          <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆  Page Content ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

          <div
            class="page-content-wrap-editor position-relative"
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
            :class="{
              'drop-active': !$builder.sections.length && past_hover === 0,
            }"
          >
            <!-- Important: set key and wrap with div to prevent loss proper for dragging elements -->
            <div key="header-demo">
              <slot name="header"></slot>
            </div>

            <div
              ref="pagecontent"
              @click="handleClickOnSections"
              @drop="
                (e) =>
                  !$builder.isEditing || $builder.sections.length
                    ? undefined
                    : dropSection(e, 0)
              "
              @dragover="
                (e) =>
                  !$builder.isEditing || $builder.sections.length
                    ? undefined
                    : allowDropSection(e, 0)
              "
              @dragleave="
                (e) => (!$builder.isEditing ? undefined : leaveDrag(e))
              "
              class="page-content"
              :style="[
                PageBuilderTypoHelper.GenerateTypoStyle(pageStyle),
                PageBuilderColorsHelper.GenerateColorsStyle(pageStyle),
              ]"
              :class="{ 'min-height-80vh': $builder.isEditing }"
            >
              <div
                v-for="(section, index) in $builder.sections"
                :key="section.id"
                class="position-relative d-flex flex-column target-drop"
                :class="{
                  'cursor-pipette':
                    $builder.cloneStyle && !$builder.cloneObject,
                  'cursor-bucket': $builder.cloneStyle && $builder.cloneObject,

                  'show-name': listShown && inEditMode,
                }"
                :section-name="$builder.components[section.name].options.label"
                @drop="
                  (e) =>
                    !$builder.isEditing ? undefined : dropSection(e, index)
                "
                @dragover="
                  (e) =>
                    !$builder.isEditing ? undefined : allowDropSection(e, index)
                "
              >
                <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Margin Arrows - Start ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->

                <div
                  v-if="$builder.isEditing && section.data?.style?.marginTop"
                  class="arrow-margin -top"
                  :margin="section.data.style.marginTop"
                  :style="{ '--margin': section.data.style.marginTop }"
                  :class="{
                    '--reverse': parseInt(section.data.style.marginTop) < 0,
                  }"
                  title="Top Margin"
                  @mousedown.prevent
                ></div>

                <div
                  v-if="$builder.isEditing && section.data?.style?.marginBottom"
                  class="arrow-margin -bottom"
                  :margin="section.data.style.marginBottom"
                  :style="{ '--margin': section.data.style.marginBottom }"
                  :class="{
                    '--reverse': parseInt(section.data.style.marginBottom) < 0,
                  }"
                  title="Bottom Margin"
                  @mousedown.prevent
                ></div>
                <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Margin Arrows - End ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->

                <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Section Component - Start ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
                <component
                  v-if="delay_load > index"
                  :is="section.name"
                  :id="section.id"
                  :class="{
                    'move-courser block-pointer-event': $builder.isSorting,

                    'ignore-elements': !$builder.isSorting,
                    pen: drop_section,
                  }"
                  :style="section.get('$sectionData.style')"
                  :ref="'SECTION_' + section.id"
                />
                <div v-else style="height: 400px"></div>

                <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Copy & Past Section - Start ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->

                <div
                  v-if="listShown && inEditMode"
                  class="side-section"
                  :class="{
                    '-copy': copy_hover === section.id,
                    '-delete': delete_hover === section.id,
                    '-row': ['infinite-stream'].includes(section.name),
                  }"
                >
                  <!-- ▃▃▃▃▃▃▃▃▃▃ Copy ▃▃▃▃▃▃▃▃▃▃ -->

                  <v-tooltip color="#111" top max-width="420">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        icon
                        color="#000"
                        large
                        class="hover-scale -fast"
                        @mouseenter="copy_hover = section.id"
                        @mouseleave="copy_hover = null"
                        @click="copySection(section)"
                        ><v-icon>content_copy</v-icon></v-btn
                      >
                    </template>
                    <div class="text-start small pa-1">
                      <b class="d-block">Copy Section Now!</b>
                      <div>
                        When you click here, this section structure and data
                        will be copied, allowing you to paste it onto this page
                        or any other pages.
                      </div>
                    </div>
                  </v-tooltip>

                  <v-spacer></v-spacer>

                  <v-btn
                    icon
                    title="Delete section"
                    color="red"
                    large
                    class="hover-scale -fast"
                    @mouseenter="delete_hover = section.id"
                    @mouseleave="delete_hover = null"
                    @click="deleteSection(section)"
                    ><v-icon>close</v-icon></v-btn
                  >

                  <v-spacer></v-spacer>

                  <!-- ▃▃▃▃▃▃▃▃▃▃ Save Section (Page's Element) ▃▃▃▃▃▃▃▃▃▃ -->

                  <v-tooltip
                    v-if="
                      $route.params.shop_id /*Only in shop admin dashboard!*/
                    "
                    color="#111"
                    top
                    max-width="420"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        icon
                        color="#000"
                        class="hover-scale -fast"
                        large
                        @click="saveSectionToRepository(section)"
                      >
                        <v-icon>add</v-icon></v-btn
                      >
                    </template>
                    <div class="text-start small pa-1">
                      <b class="d-block">Save & Reuse This Section</b>
                      <div>
                        Save this section to my repository for use on other
                        pages.
                      </div>
                    </div>
                  </v-tooltip>

                  <!-- ▃▃▃▃▃▃▃▃▃▃ Past ▃▃▃▃▃▃▃▃▃▃ -->

                  <v-tooltip color="#111" top max-width="420">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        icon
                        color="#000"
                        class="hover-scale -fast"
                        large
                        @mouseenter="past_hover = index"
                        @mouseleave="past_hover = null"
                        @click="pastSection(index + 1)"
                      >
                        <v-icon>content_paste</v-icon></v-btn
                      >
                    </template>
                    <div class="text-start small pa-1">
                      <b class="d-block">Ctrl + V Now!</b>
                      <div v-if="copy_section" class="py-1">
                        <v-icon color="success" x-small>circle</v-icon> Copy
                        available
                      </div>

                      <div>
                        Clicking this button will add a copied section here. If
                        you've copied a section <b>from another page</b>, simply
                        use <b>Ctrl + V</b> to paste it here, as we cannot
                        access the clipboard programmatically.
                      </div>
                    </div>
                  </v-tooltip>
                </div>

                <v-expand-transition>
                  <div
                    v-if="past_hover === index && drop_section"
                    class="bg-lily-meadow typo-body d-flex flex-column align-center justify-center"
                    style="height: 84px"
                  >
                    Will add here
                  </div>
                  <div
                    v-else-if="past_hover === index"
                    class="bg-red-soft"
                    style="height: 4px"
                  ></div>
                </v-expand-transition>

                <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Copy & Past Section - End ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->

                <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Side Section Buttons - Start ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
                <div
                  class="x-feeder"
                  :class="{
                    '-single': !aiAutoFillFunction && !has_note,
                    '-double':
                      (!aiAutoFillFunction && has_note) ||
                      (aiAutoFillFunction && !has_note),
                    '-triple': aiAutoFillFunction && has_note,
                  }"
                  dir="ltr"
                >
                  <v-btn
                    class="x-feeder-btn hover-scale force-top sub-caption b-16px -black ml-6"
                    caption="Feed"
                    icon
                    dark
                    x-large
                    :class="{ disabled: !section.data || !section.schema }"
                    @click="showFeeder(section)"
                    title="Simple edit section contents."
                  >
                    <v-icon>donut_large</v-icon>
                  </v-btn>

                  <ai-button
                    v-if="aiAutoFillFunction"
                    class="x-feeder-btn hover-scale force-top sub-caption b-16px -black ml-6"
                    caption="AI"
                    icon
                    dark
                    x-large
                    @click="autoComplete(section)"
                    :loading="loading_ai.includes(section)"
                    title="Auto generate contents."
                  >
                  </ai-button>

                  <v-badge
                    v-if="has_note"
                    overlap
                    :value="
                      page?.notes?.filter(
                        (n) => n.element_id === section.data?.id
                      )?.length > 0
                    "
                    :content="
                      page?.notes?.filter(
                        (n) => n.element_id === section.data?.id
                      )?.length | numeralFormat('0a')
                    "
                    color="#000"
                  >
                    <v-btn
                      class="x-feeder-btn hover-scale force-top sub-caption b-16px -black"
                      caption="Message"
                      icon
                      dark
                      x-large
                      :color="
                        page?.notes?.filter(
                          (n) => n.element_id === section.data?.id
                        )?.length
                          ? 'amber'
                          : '#fff'
                      "
                      @click="showWriteNote(section)"
                      title="Write a reminder note or message to your agency."
                    >
                      <v-icon>sticky_note_2</v-icon>
                    </v-btn>
                  </v-badge>
                </div>
                <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Side Section Buttons - End ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->

                <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Notes - Start ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
                <notes-digest-view
                  v-if="$vuetify.breakpoint.lgAndUp && has_note"
                  :notes="
                    page?.notes?.filter(
                      (n) => n.element_id === section.data?.id
                    )
                  "
                  :shop="shop"
                  :page="shop_page"
                  :popup="shop_popup"
                  class="position-absolute"
                  style="top: 50px"
                  :style="{ width: '400px', right: '-600px' }"
                  hover-able
                  :limit="2"
                ></notes-digest-view>
                <!-- ▃▃▃▃▃▃▃▃▃▃▃▃▃ Notes - End ▃▃▃▃▃▃▃▃▃▃▃▃▃ -->
              </div>
            </div>
          </div>
        </div>

        <!-- ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆  Tools ▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆▆ -->

        <div
          ref="menu"
          class="float-menu no-inv rounded-xl thin-scroll"
          :class="{
            'is-visiable': listShown && inEditMode,
            '-scroll-down': scrollTop > 200,
            '-dragged': start_drag,
          }"
        >
          <v-expansion-panels
            v-model="expanded"
            flat
            dark
            :style="{ maxWidth: expanded === 0 ? '260px' : '130px' }"
            class="rounded-xl overflow-hidden"
          >
            <v-expansion-panel
              :style="{ background: expanded === 0 ? '#111' : '#0152d0' }"
            >
              <v-expansion-panel-header>
                <v-icon small class="me-1">view_day</v-icon>
                <div class="flex-grow-1">Sections</div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div class="border-between-vertical">
                  <div
                    v-for="(group, name) in groups"
                    :key="name"
                    class="fmenu-group mb-2 pb-3"
                  >
                    <div class="fmenu-header">
                      <span class="fmenu-title">{{ name }}</span>
                    </div>
                    <v-row class="fmenu-body" dense justify="space-around">
                      <span
                        v-for="(section, index) in group"
                        :key="index"
                        class="fmenu-element hover-scale-small"
                        :section-name="section.name"
                        draggable="true"
                        @mouseenter="(e) => showMenu(e, section)"
                        @mouseleave="hideMenu()"
                      >
                        <img
                          v-if="section.cover"
                          class="fmenu-elementImage"
                          :src="section.cover"
                        />
                      </span>
                    </v-row>
                  </div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
    </div>

    <!-- Side help menu -->
    <v-menu
      v-if="hover_section?.help"
      v-model="show_element_info"
      :position-x="menu_x"
      :position-y="menu_y"
      absolute
      max-width="420"
      nudge-width="300"
      content-class="pen"
      right
    >
      <v-sheet color="#000" dark>
        <v-responsive
          v-if="hover_section.help.video"
          :aspect-ratio="1920 / 1080"
        >
          <video
            :key="hover_section.help.video"
            autoplay
            playsinline
            loop
            muted
            width="100%"
          >
            <source
              :src="hover_section.help.video"
              :type="VideoHelper.GetMime(hover_section.help.video)"
            />
          </video>
        </v-responsive>

        <v-img
          v-else-if="hover_section.help.image"
          :src="hover_section.help.image"
        ></v-img>

        <div v-if="hover_section.help.title" class="pa-3 text-start small">
          <b class="d-block text-capitalize">
            {{ hover_section.label }}
          </b>
          {{ hover_section.help.title }}
        </div>
      </v-sheet>
    </v-menu>

    <!-- ――――――――――――――――――――――  Dialog Master Page Style ―――――――――――――――――――― -->

    <GlobalPageStyleEditorDialog></GlobalPageStyleEditorDialog>
    <GlobalTypographyEditorDialog
      @change="$forceUpdate()"
    ></GlobalTypographyEditorDialog>

    <!-- ――――――――――――――――――――――  Dialog Master Style ―――――――――――――――――――― -->

    <global-style-editor-dialog></global-style-editor-dialog>
    <global-background-editor-dialog></global-background-editor-dialog>
    <global-product-select-dialog></global-product-select-dialog>
    <global-products-categories-select-dialog></global-products-categories-select-dialog>

    <global-animation-editor-dialog></global-animation-editor-dialog>

    <global-color-selector-dialog></global-color-selector-dialog>

    <global-blogs-filter-dialog></global-blogs-filter-dialog>

    <global-link-editor-dialog></global-link-editor-dialog>

    <global-products-frame-dialog></global-products-frame-dialog>
    <global-input-editor-dialog></global-input-editor-dialog>

    <global-slide-show-editor-dialog></global-slide-show-editor-dialog>
    <global-x-column-layout-editor-dialog></global-x-column-layout-editor-dialog>
    <global-text-loop-dialog></global-text-loop-dialog>

    <!-- ――――――――――――――――――――――  Dialog Master Style Image ―――――――――――――――――――― -->

    <global-image-size-dialog></global-image-size-dialog>
    <global-image-layers-dialog></global-image-layers-dialog>

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
import SStylerIcon from "../components/SStylerIcon";

import { BackgroundHelper } from "@core/helper/style/BackgroundHelper";
import GlobalPageStyleEditorDialog from "../tools/style/GlobalPageStyleEditorDialog.vue";
import GlobalBackgroundEditorDialog from "../tools/background/GlobalBackgroundEditorDialog.vue";
import GlobalStyleEditorDialog from "../tools/style/GlobalStyleEditorDialog.vue";
import GlobalProductSelectDialog from "../tools/product/GlobalProductSelectDialog.vue";
import GlobalProductsCategoriesSelectDialog from "../tools/product/GlobalProductsCategoriesSelectDialog.vue";
import GlobalAnimationEditorDialog from "../tools/animation/GlobalAnimationEditorDialog.vue";
import GlobalColorSelectorDialog from "../tools/color/GlobalColorSelectorDialog.vue";
import GlobalImageSizeDialog from "../tools/image/GlobalImageSizeDialog.vue";
import GlobalImageLayersDialog from "../tools/image/GlobalImageLayersDialog.vue";
import GlobalBlogsFilterDialog from "../tools/blog/GlobalBlogsFilterDialog.vue";
import GlobalLinkEditorDialog from "../tools/link/GlobalLinkEditorDialog.vue";
import { findAllFontsInSection } from "@app-page-builder/src/util";
import { FontLoader } from "@core/helper/font/FontLoader";
import PageElementsRepository from "@app-page-builder/src/element-repository/PageElementsRepository.vue";
import GlobalSectionFeederDialog from "@app-page-builder/src/feeders/GlobalSectionFeederDialog.vue";
import AiButton from "@components/ui/button/ai/AiButton.vue";
import GlobalProductsFrameDialog from "@app-page-builder/src/tools/product/GlobalProductsFrameDialog.vue";
import GlobalInputEditorDialog from "@app-page-builder/src/tools/input/GlobalInputEditorDialog.vue";
import GlobalSlideShowEditorDialog from "@app-page-builder/src/tools/slide-show/GlobalSlideShowEditorDialog.vue";
import GlobalXColumnLayoutEditorDialog from "@app-page-builder/src/tools/column/GlobalXColumnLayoutEditorDialog.vue";
import GlobalTypographyEditorDialog from "@app-page-builder/src/tools/typography/GlobalTypographyEditorDialog.vue";
import { PageBuilderTypoHelper } from "@app-page-builder/src/helpers/PageBuilderTypoHelper";
import VideoHelper from "@core/helper/video/VideoHelper";
import { PageBuilderColorsHelper } from "@app-page-builder/src/helpers/PageBuilderColorsHelper";
import GlobalTextLoopDialog from "@app-page-builder/src/tools/text/GlobalTextLoopDialog.vue";
import NotesDigestView from "@components/backoffice/note/NotesDigestView.vue";
import PageTemplatesList from "@app-page-builder/src/pages/PageTemplatesList.vue";
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import HighlightEditingElements from "@app-page-builder/src/helpers/HighlightEditingElements";
import _ from "lodash-es";

const DEBUG = false;
export default {
  name: "SPageEditor",
  components: {
    PageTemplatesList,
    NotesDigestView,
    GlobalTextLoopDialog,
    GlobalTypographyEditorDialog,
    GlobalXColumnLayoutEditorDialog,
    GlobalSlideShowEditorDialog,
    GlobalInputEditorDialog,
    GlobalProductsFrameDialog,
    AiButton,
    GlobalSectionFeederDialog,
    PageElementsRepository,
    GlobalLinkEditorDialog,
    GlobalBlogsFilterDialog,
    GlobalImageLayersDialog,
    GlobalImageSizeDialog,
    GlobalColorSelectorDialog,
    GlobalAnimationEditorDialog,
    GlobalProductsCategoriesSelectDialog,
    GlobalProductSelectDialog,
    GlobalStyleEditorDialog,
    GlobalBackgroundEditorDialog,
    GlobalPageStyleEditorDialog,

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
      VideoHelper: VideoHelper,

      PageBuilderTypoHelper: PageBuilderTypoHelper,
      PageBuilderColorsHelper: PageBuilderColorsHelper,

      //----------------------------

      delay_load: 0,
      //----------------------------
      title: null,
      listShown: false,
      sections: this.getSections(),
      currentSection: "", // Important not be null (BUG occur)
      start_drag: false,
      groups: {},

      inEditMode: false,
      themes: null,

      max_h: "unset",

      interval: null, // Max height calculation interval!

      expanded: 0,
      //-------------------

      templates: null,

      //-------------------
      local_history: [],
      history_index: 0, // Current position in history!

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
      sortables_group: [],

      //------------------- Extra buttons side ---------------
      copy_hover: null,
      past_hover: null,
      delete_hover: null,
      drop_section: false, // Indicate that pre-built section drag over
      copy_section: null,
      onPast: null,

      //-------------------
      selected_section: null,
      selected_component: null,

      dialog_feeder: false,

      loading_ai: [],

      //-------------------
      menu_x: 0,
      menu_y: 0,
      show_element_info: false,
      hover_section: null,
    };
  },

  computed: {
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

    has_undo() {
      return this.history_index + 1 < this.local_history.length;
    },
    has_redo() {
      return this.history_index - 1 >= 0;
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
  },

  watch: {
    "$route.query.element_id"(element_id) {
      this.autoShowNote();
    },
    page() {
      this.autoShowNote();
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
        //console.log('Update Preview!',_page)
      },
    },

    scale_down(scale_down) {
      //let height = this.$refs.pagecontent.clientHeight +200;
      // console.log('---------height----------',height)

      this.calcMaxH();

      this.$emit("scale", scale_down ? 0.5 : 1);
    },

    /* title(value) {
      this.$builder.title = value;
      if(value) // Set page title:
        document.title = value;
    },*/
    inEditMode(val) {
      this.$emit("changeMode", val);
    },

    sections_length(val) {
      if (val > 0 && this.delay_load < 999)
        // loaded any section?
        this.loadNextDelayed();
    },
  },
  created() {
    // sets the initial data.

    this.$builder.set(this.data);
    // this.title = this.$builder.title;
    this.themes = this.$builder.themes;
    this.generateGroups();

    // Add global past:
    this.onPast = (event) => {
      if (window.PAGE_BUILDER_BLOCK_LISTEN_KEYS) return;

      let paste = (event.clipboardData || window.clipboardData).getData("text");

      // console.log('paste action initiated',paste)

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
          this.past_hover === null
            ? this.$builder.sections.length + 1
            : this.past_hover + 1
        );
        event.preventDefault();
      }
    };
    document.addEventListener("paste", this.onPast, true);

    /*  if (!this.title)
      this.title = "Landing-" + Math.random().toString(36).substring(7);*/
  },
  mounted() {
    this.$builder.rootEl = this.$refs.artboard;
    const groups = this.$refs.menu.querySelectorAll(".fmenu-body");
    const _self = this;
    groups.forEach((group) => {
      const sortable = Sortable.create(group, {
        group: {
          name: "sections-group",
          put: false,
          pull: "clone",
        },
        sort: false,

        onStart: function (/**Event*/ evt) {
          //console.log('START')
          //console.log('evt',evt.item.getAttribute('section-name'))
          _self.start_drag = true;
          _self.hideMenu();
        },
        // Element dragging ended
        onEnd: function (/**Event*/ evt) {
          //console.log('END')
          _self.start_drag = false;
        },
      });

      this.sortables_group.push(sortable);
    });

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
        //console.log('onAdd',_self.item)

        const section_name = evt.item.getAttribute("section-name");
        const section = _self.sections.find((it) => it.name === section_name);

        if (section) {
          _self.addSection(section, evt.newIndex);
        }

        evt.item.remove();

        //console.log("sortable : onAdd");
      },
      onUpdate(evt) {
        _self.$builder.sort(evt.oldIndex, evt.newIndex);

        //console.log("sortable : onUpdate");
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
          go_to_scale_down ? 0 : 350
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
        } /* else if ((event.ctrlKey || event.metaKey)&& event.code === "Digit3") {
          event.preventDefault();
          document.selectionSetStyle('color','#847')

        }else if ((event.ctrlKey || event.metaKey)&& event.code === "Digit4") {
          event.preventDefault();
          document.selectionSetStyle('color','#0F7')

        }*/

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
  },

  updated() {
    if (this.$builder.scrolling) {
      this.$builder.scrolling(this.$refs.artboard);
    }
  },

  beforeDestroy() {
    window.onbeforeunload = undefined;

    // console.log("Unregister hot key.", this.key_listener_keydown);

    // Destroy sortables: (memory leakage)
    this.sortable.destroy();
    this.sortables_group.forEach((sortable) => {
      sortable.destroy();
    });
    this.sortables_group = [];
    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
    document.removeEventListener("paste", this.onPast, true);

    this.$builder.clear();

    window.clearInterval(this.interval);

    //console.log("...beforeDestroy...",this.$builder);
  },
  methods: {
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
          this.pageStyle.bg_color
        );

      //console.log('Calculate page style!', this.CUSTOM_PAGE_STYLE);
    },

    //――――――――――――――――――――――  History > Save ――――――――――――――――――――

    onSaveHistory() {
      this.saveLocalHistory(
        this.local_history,
        this.$builder.sections,
        this.history_index,
        () => (this.history_index = 0)
      );
    },

    /**
     * @callback : Callback if history saved! must index set to zero.
     */
    saveLocalHistory: _.throttle(async function (
      local_history,
      sections,
      current_index,
      callback
    ) {
      // Keep only data, id , name
      const filtered = sections.map(function (i) {
        return { name: i.name, id: i.id, data: i.data };
      });

      if (
        local_history.length > current_index &&
        JSON.stringify(filtered).trim() === local_history[current_index]
      )
        return;

      // Remove death zone:
      if (current_index > 0) {
        if (DEBUG) console.log("Clear death zone history", current_index);
        local_history.splice(0, current_index);
      }

      if (DEBUG) console.log("saveLocalHistory", current_index, filtered);

      const clone = JSON.stringify(filtered).trim();

      local_history.unshift(clone);
      if (local_history.length > 20) local_history.length = 20;
      if (DEBUG)
        console.log("---NEW HISTORY---", local_history.length, local_history);

      if (callback) callback();
    },
    2000),

    //――――――――――――――――――――――  History > Undo ――――――――――――――――――――

    goUndo() {
      if (DEBUG)
        console.log(
          "goUndo",
          this.has_undo,
          this.history_index,
          this.local_history.length
        );
      if (this.has_undo) {
        this.history_index++;

        this.loadLocalHistory();

        this.showNotificationAlert(
          "Undo",
          "Go back in actions.",
          undefined,
          undefined,
          undefined,
          500
        );
      } else {
        this.showWarningAlert("Undo", "No history available.", 500);
      }
    },
    //――――――――――――――――――――――  History > Redo ――――――――――――――――――――

    goRedo() {
      if (this.has_redo) {
        this.history_index--;

        this.loadLocalHistory();

        this.showNotificationAlert(
          "Redo",
          "Go forward in actions.",
          undefined,
          undefined,
          undefined,
          500
        );
      } else {
        this.showWarningAlert("Redo", "In the last state.", 500);
      }
    },

    //――――――――――――――――――――――  History > Load ――――――――――――――――――――
    loadLocalHistory() {
      const raw_sections = JSON.parse(this.local_history[this.history_index]); // Keep only data, id , name

      // 1. Check section exist:
      const exists = [];
      raw_sections.forEach((raw) => {
        // Keep real sections
        const found = this.$builder.find(raw.id);
        if (found && found.name === raw.name) {
          exists.push(found);
        }
      });
      if (DEBUG) console.log("goUndo", "1 exists", exists);

      //2. Remove all:
      this.$builder.sections.splice(0, this.$builder.sections.length);

      // 3. Create new section:
      let index = 0;
      raw_sections.forEach((raw) => {
        const found = exists.find(
          (it) => it.id === raw.id && it.name === raw.name
        );
        if (found) {
          found.data = raw.data;
          if (DEBUG) console.log("goUndo", "3 Update", found);
          this.$builder.sections.push(found);
        } else {
          this.$builder.add(raw, index, false);
          if (DEBUG) console.log("goUndo", "3 Add", raw);
        }
        index++;
      });
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
      const page = this.$builder.export("json");
      this.checkHealth(page);

      // 🌼 Fix real time font adding issue:
      /*  if (!page.style) page.style = {};
      if (!page.style.fonts || !Array.isArray(page.style.fonts))
        page.style.fonts = [];

      console.log('getJson',page)*/
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
            key === "html" /**@see SectionRawHtml**/
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

    //-----------------------------------

    getHtml() {
      var $div = $("<div>");
      $div.html(this.$refs.pagecontent.innerHTML);

      $div
        .find("*")
        .not(
          "a,i,ul,li,img,br,p,div,section,button,b,h1,h2,h3,h4,h5,h6,font,figure,figcaption,svg"
        )
        .each(function () {
          if ($(this).closest("svg").length > 0) return; //prevent remove inside svg!

          $(this).replaceWith("");
        });

      // Remove no-render class objects:
      $div.find(".no-render").each(function () {
        $(this).replaceWith("");
      });

      $div.find("*").each(function () {
        if ($(this).closest("svg").length > 0) return; //prevent remove inside svg!

        var element = $(this);

        var attributes = $.map(this.attributes, function (item) {
          return item.name;
        });

        // now use jQuery to remove the attributes

        $.each(attributes, function (i, item) {
          if (
            [
              "href",
              "src",
              "alt",
              "class",
              "style",
              "rel",
              "width",
              "height",
            ].indexOf(item) === -1
          )
            element.removeAttr(item);
        });
      });
      // console.log($div.html());

      return $div.html();
    },

    newSection() {
      // add the section immediately if none are present.
      if (this.sections.length === 1) {
        this.addSection(this.sections[0]);
        return;
      }
      this.toggleListVisibility();
    },
    addSection(section, position) {
      //console.log("addSection", section, "position", position);

      this.$builder.add(section, position, true);

      // Fix BUG direction change by vuetify!
      this.$nextTick(() => {
        //console.log("Set Direction addSection > Fix", this.getCurrentLanguage().dir);
        this.$vuetify.rtl = this.getCurrentLanguage().dir === "rtl";
      });

      this.onSaveHistory();
    },
    clearSections() {
      this.inEditMode = false;
      this.$builder.clear();
      this.$router.replace({
        name: "PageBuilder",
        params: { shop_id: this.$route.params.shop_id },
      });
    },

    addTheme(theme) {
      this.setPage(theme, true);

      this.$emit("load:template", { content: this.getJson(), image: null }); // Simulate like landing page template files!
    },
    setPage(data, from_theme = false) {
      console.style("<b>📐 Set page builder data.</b>", data, from_theme);
      // --- Reset history ---
      this.local_history = [];
      this.history_index = 0;

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
      this.$builder.set(data, from_theme);

      if (from_theme) {
      } else {
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
    hideList() {
      this.listShown = false;
      this.sortable.option("disabled", true);
    },
    toggleGroupVisibility(e) {
      const element = e.target;
      const group = element.closest(".menu-group");
      group.classList.toggle("is-visiable");
    },
    submit() {
      this.$emit("saved", this.$builder);
    },
    generateGroups() {
      let groups = {};
      let group_no_category = [];

      // group sections together
      this.sections.forEach((section) => {
        let sectionGroup = section.group;
        if (!sectionGroup) {
          group_no_category.push(section);
          return;
        }
        if (!groups[sectionGroup]) {
          groups[sectionGroup] = [section];
          return;
        }
        groups[sectionGroup].push(section);
      });
      if (group_no_category.length) {
        const no_category = " "; //this.$t('page_builder.design.no_category');
        groups[no_category] = [];
      }
      this.groups = groups;
    },
    getSections() {
      let sections = [];

      // get sections data
      sections = Object.keys(this.$builder.components).map((sec) => {
        return {
          name: sec,
          group: this.$builder.components[sec].options.group,
          cover: this.$builder.components[sec].options.cover,
          label: this.$builder.components[sec].options.label,
          help: this.$builder.components[sec].options.help,

          schema: this.$builder.components[sec].options.$schema,
        };
      });
      return sections;
    },

    loadTemplate(page) {
      this.setPage(page.content);

      //update random title:
      const title = "Landing-" + Math.random().toString(36).substring(7);
      page.content.title = title;

      this.$emit("load:template", page);
    },

    onScroll(e) {
      this.scrollTop = document.documentElement.scrollTop;
    },
    onDragTool(section) {
      if (DEBUG) console.log("onDragTool", section);
      this.currentSection = section;
      this.start_drag = true;
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
        `The section has been successfully copied to the clipboard. You can paste it onto other pages.`
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
          "Data on clipboard not found!"
        );

        return;
      }

      if (DEBUG) console.log("Insert section on: ", index);

      try {
        let section = JSON.parse(this.copy_section);
        if (section.name && section.data) {
          this.$builder.add(section, index, false);
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
        this.$builder.remove(section);
        this.onSaveHistory();
      } catch (e) {
        this.showErrorAlert(
          null,
          "We can not remove this section! Maybe fix it by refreshing the page."
        );
      }
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
            this.$builder.add(json, index + 1, false);
            this.autoLoadSectionFonts(json);
          }
        } catch (e) {}
      this.past_hover = null;
      this.drop_section = false;

      this.onSaveHistory();
    },
    allowDropSection(event, index) {
      // Tips:  getData("section") not available on drag over event in chrome , edge ,... security!
      const types = event.dataTransfer.types;
      //  console.log('allowDropSection!' ,types)

      if (types.includes("section")) {
        // console.log('allowDropSection' ,this.past_hover,index)
        event.preventDefault();
        this.past_hover = index;
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
      //  console.log('leaveDrag' ,this.past_hover)

      this.past_hover = null;
      this.drop_section = false;
    },

    autoLoadSectionFonts(json) {
      try {
        this.fonts = findAllFontsInSection(json);

        if (DEBUG) console.log("Fonts ---->", this.fonts);

        if (!this.$builder.style) this.$builder.style = {};

        if (
          !this.$builder.style.fonts ||
          !Array.isArray(this.$builder.style.fonts)
        )
          this.$builder.style.fonts = [];
        this.fonts.forEach((font) => {
          if (!this.$builder.style.fonts.includes(font)) {
            this.$builder.style.fonts.push(font);
            this.showSuccessAlert(
              "Font : " + font,
              "Font has been added successfully."
            );
          }
        });

        // Load fonts:
        FontLoader.LoadFonts(this.fonts);
      } catch (e) {
        console.error(e);
      }
    },

    showFeeder(section) {
      this.selected_section = section;
      this.selected_component = this.$refs[`SECTION_${section.id}`][0]; // v-for return refs in array!
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

    showMenu(e, section) {
      //console.log(e.clientX)
      this.hover_section = section;
      this.menu_x = 180; //e.clientX // Fixed X
      this.menu_y = e.clientY;
      this.show_element_info = true;
    },

    hideMenu() {
      this.show_element_info = false;
    },

    showWriteNote(section) {
      if (!section) return;

      this.showGlobalShopNoteDialog(
        this.page.notes,
        section.data.id,
        this.shop_page?.id,
        this.shop_popup?.id
      );
    },
    autoShowNote() {
      if (this.$route.query.element_id) {
        this.showWriteNote(
          this.$builder.sections.find(
            (s) => s.data.id === this.$route.query.element_id
          )
        ); // Auto open note dialog if element_id be in query (used in notifications link)
      }
    },

    handleClickOnSections(event) {
      if (
        !HighlightEditingElements.IsChildOfHighlightActiveEditing(event.target)
      )
        this.EventBus.$emit(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .sortable-ghost {
  .fmenu-elementImage {
    width: 100%;
    height: auto;
    background: #1976d2;
  }
}
.float-menu {
  user-select: none;
  z-index: 210;
  position: fixed;
  top: 74px;
  left: 24px;
  bottom: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;

  color: #fff;

  transition: all 0.4s ease-in-out;
  opacity: 0;
  transform: translateX(-200px);

  /*
    border-radius: 24px;
      padding: 12px 6px 84px 6px;

  background: #000;
  */

  &.is-visiable {
    opacity: 1;
    transform: translateX(0);
  }

  @media only screen and (max-width: 2100px) {
    // Ultra-wide mode
    top: 220px;

    &.-dragged {
      // Hide on dragged
      transform: translateX(-100%);
    }

    &.-scroll-down {
      top: 24px;
    }
  }

  .fmenu-group {
    .fmenu-body {
      max-width: 160px;

      .fmenu-element {
        position: relative;
        cursor: pointer;
        user-select: none;

        .fmenu-elementImage {
          height: 24px;
          margin: 2px;
          pointer-events: none;
        }
        transition: all 0.35s !important;

        &:hover {
          box-shadow: 0px 10px 50px 0px rgba(0, 0, 0, 0.2);
        }
      }
    }

    .fmenu-header {
      margin-top: 0.6rem;

      .fmenu-title {
        font-size: 0.7em;
        text-transform: uppercase;
        margin-bottom: 4px;
        font-weight: 800;
        display: block;
      }
    }
  }
}
</style>

<style lang="stylus" scoped>
@import '../stylus/_app.styl'

h1{
  font-size 1.7rem;
}
p{
  font-size 1.2rem;
  &.small{
    font-size 1rem;
  }
}


.artboard
  transform-origin: top center
  &.is-editable .is-editable
    outline: none
    //&:hover
    //  box-shadow: inset 0 0 0 4px #323c47
.controller
  box-sizing: border-box
  &-panel
    position: fixed
    z-index: 200
    bottom: 30px
    right: 40px
  &-input
    outline: none
    border: 1px solid $gray
    padding: 0.5em 1em
    margin: 20px 0
    border-radius: 40px
    width: 100%
    font-size: 16px
    max-width 500px
    &:focus
      border-color: $blue
      box-shadow: 0 0 0 2px alpha($blue, 50%)
  &-button
    transition: 0.2s
    border: none
    outline: none
    border-radius: 20px
    padding: 5px
    color: $white
    fill: $white
    font-size: 16px
    svg
      transition: 0.2s
    &:not(:last-child)
      margin-right: 20px
    &.is-rotated >svg
      transform: rotate(45deg)
    &:hover
      @extends $floatHover
    &.is-blue
      background-color: $blue
      &:hover
        background-color: darken($blue, 20%)
    &.is-red
      background-color: $red
      &:hover
        background-color: darken($red, 20%)
    &.is-green
      background-color: $green
      &:hover
        background-color: darken($green, 20%)
    &.is-dark
      background-color: $dark
      &:hover
        background-color: darken($dark, 20%)
    &.is-gray
      background-color: $gary
      &:hover
        background-color: darken($gray, 20%)
  &-intro
    width: 100%
    max-width: 1620px
    margin: auto
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    padding: 70px 50px
    text-align: center
    font-size: 30px
    color: $dark




.menu
  user-select: none
  -moz-user-select: none
  position: fixed
  z-index 300
  top: 0
  left: 0
  bottom: 0
  margin: 0
  width: 250px
  background: $white
  padding: 20px 10px
  display: flex
  flex-direction: column
  overflow-y: auto
  list-style: none
  transition: 0.4s
  box-shadow: 1px 0 10px alpha($dark, 20%)
  transform: translate3d(-100%, 0, 0)
  &.is-visiable
    transform: translate3d(0, 0, 0)
  &-body
    display: none
    padding: 0
    margin: 0
    list-style: none
    ~/-group &
      width: 90%
      margin: 10px auto
    ~/-group.is-visiable &
      display: block
  &-icon
    width: 24px
    height: 24px
    fill: $gray
    transition: 0.2s
    ~/-group.is-visiable &
      transform: rotate(180deg)

  &-element
    position: relative
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    min-height: 50px
    border-radius: 5px
    background: #fafafa
    transition: 0.3s
    cursor: pointer
    color: $white
    overflow: hidden
    user-select: none
    -moz-user-select: none
    &:not(:last-child)
      margin-bottom: 10px
    &:hover
      @extends $floatHover

  &-elementImage
    max-width: 100%
    pointer-events: none


  &-header
    display: flex
    justify-content: space-between
    align-items: center
    padding: 10px 5px
    border-bottom: 1px solid alpha($black, 5%)

.sortable-ghost
  background-color #0c91d3
  opacity: 0.9
  height max-content
  box-shadow: 0 0 2px 1px $blue
 // transform: scale(0.8)


.is-editable
  &:hover
    //box-shadow: inset 0 0 0 2px $gray
</style>

<style scoped lang="scss">
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
::v-deep .block-pointer-event {
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
            &.row {
              &:after {
                top: unset;
                bottom: -30px;
                right: 0;
              }
            }
            // Column:
            &.col {
              &:after {
                top: unset;
                bottom: 0px;
                right: unset;
                left: 0;
              }
            }
            // Container:
            &.container {
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
        } //End of is-editable
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

          .v-image {
            // v-image (Old i used this)
            filter: none !important;
            pointer-events: var(--ban-pointer-event) !important;

            .v-image__image {
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
          > :not(.v-image, img):not(header):not(.-in-animation) {
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
        } // END: .image-container

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

        // Add buttons: (make hide!)
        .add-col,
        .add-btn,
        .remove-btn,
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
              } // end after

              > div {
                // Content of card:
                opacity: 0 !important;
              }
            } // end div

            > .card-item-new {
              &:after {
                content: "\f291" !important;
              }
            }
          } // end products-layout
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
      } // End section
    }
  }
}

.side-menu {
  position: absolute;
  right: -60px;
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
    right: calc(25% - 60px);
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

.side-section {
  position: absolute;
  left: -84px;
  top: 0;
  bottom: 0;
  z-index: 1;

  display: flex;
  flex-direction: column;
  padding: 24px 8px;

  &.-row {
    flex-direction: row;
    left: -224px;
    width: 200px;
    top: 0;
  }
  &:before {
    transition: all 0.2s ease-in-out;
    content: "";
    position: absolute;
    right: 0;
    top: 12px;
    bottom: 12px;
    width: 4px;
    background: #0d0d0d;
  }
  &.-copy {
    &:before {
      background: #8bc34a;
      width: 6px;
      right: -1px;
    }
  }
  &.-delete {
    &:before {
      background: #d22323;
      width: 6px;
      right: -1px;
    }
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
  left: -335px;
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
