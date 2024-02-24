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
  <v-navigation-drawer
    v-model="show_dialog_size"
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
    <v-card v-if="dialog_pre" :style="global_variables" class="text-start" flat>
      <!-- ████████████████████ Actions ████████████████████ -->

      <v-card-actions>
        <div class="widget-buttons">
          <v-btn
            size="x-large"
            variant="text"
            @click="show_dialog_size = false"
          >
            <v-icon class="me-1">close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>

      <v-expansion-panels v-model="Selected_tab">
        <!-- ████████████████████ Size ████████████████████ -->

        <v-expansion-panel v-if="has_size">
          <v-expansion-panel-title>
            <div>
              <v-icon class="me-1">fit_screen</v-icon>
              Size

              <v-chip
                v-if="in_width && in_width !== 'unset'"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Width"
                variant="tonal"
              >
                <v-icon size="x-small" start>fullscreen</v-icon>
                {{ in_width }}
              </v-chip>
              <v-chip
                v-if="in_minWidth && in_minWidth !== 'unset'"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Min Width"
                variant="tonal"
              >
                <v-icon size="x-small" start>fullscreen_exit</v-icon>
                {{ in_minWidth }}
              </v-chip>
              <v-chip
                v-if="in_maxWidth && in_maxWidth !== 'unset'"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Max Width"
                variant="tonal"
              >
                <v-icon size="x-small" start>crop_free</v-icon>
                {{ in_maxWidth }}
              </v-chip>

              <v-chip
                v-if="in_height && in_height !== 'unset'"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Height"
                variant="tonal"
              >
                <v-icon size="x-small" start>fullscreen</v-icon>
                {{ in_height }}
              </v-chip>
              <v-chip
                v-if="in_minHeight && in_minHeight !== 'unset'"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Min Height"
                variant="tonal"
              >
                <v-icon size="x-small" start>fullscreen_exit</v-icon>
                {{ in_minHeight }}
              </v-chip>
              <v-chip
                v-if="in_maxHeight && in_maxHeight !== 'unset'"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Max Height"
                variant="tonal"
              >
                <v-icon size="x-small" start>crop_free</v-icon>
                {{ in_maxHeight }}
              </v-chip>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div key="size">
              <s-landing-style-preview
                :model-value="in_style"
                class="mb-5"
                size
                @click:area="(val) => (Selected_tab = indexOf(val))"
              ></s-landing-style-preview>

              <s-widget-header
                icon="fullscreen"
                title="Preferred size"
              ></s-widget-header>
              <v-list-subheader
                >The element will have this size by default.
              </v-list-subheader>

              <v-row class="max-w-640 mx-auto">
                <v-col cols="12" sm="6">
                  <s-number-dimension-input
                    v-model="in_width"
                    :hint="size_hint"
                    clearable
                    label="Width"
                  ></s-number-dimension-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <s-number-dimension-input
                    v-model="in_height"
                    :hint="size_hint"
                    clearable
                    label="Height"
                  ></s-number-dimension-input>
                </v-col>
              </v-row>

              <s-widget-header
                icon="fullscreen_exit"
                title="Minimum size"
              ></s-widget-header>
              <v-list-subheader
                >The element is forced to have this minimum size.
              </v-list-subheader>

              <v-row class="max-w-640 mx-auto">
                <v-col cols="12" sm="6">
                  <s-number-dimension-input
                    v-model="in_minWidth"
                    :hint="size_hint"
                    clearable
                    label="Minimum Width"
                  ></s-number-dimension-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <s-number-dimension-input
                    v-model="in_minHeight"
                    :hint="size_hint"
                    clearable
                    label="Minimum Height"
                  ></s-number-dimension-input>
                </v-col>
              </v-row>

              <s-widget-header
                icon="crop_free"
                title="Maximum size"
              ></s-widget-header>
              <v-list-subheader
                >The element size will be limited to these constraints.
              </v-list-subheader>

              <v-row class="max-w-640 mx-auto">
                <v-col cols="12" sm="6">
                  <s-number-dimension-input
                    v-model="in_maxWidth"
                    :hint="size_hint"
                    clearable
                    label="Maximum Width"
                  ></s-number-dimension-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <s-number-dimension-input
                    v-model="in_maxHeight"
                    :hint="size_hint"
                    clearable
                    label="Maximum Height"
                  ></s-number-dimension-input>
                </v-col>
              </v-row>

              <div class="py-5">
                <b>Relative Units</b>
                <ul>
                  <li><b>EM</b>: Relative to the parent element</li>

                  <li><b>REM</b>: Relative to the root element (HTML tag)</li>

                  <li><b>%</b>: Relative to the parent element</li>

                  <li><b>VW</b>: Relative to the viewport’s width</li>

                  <li><b> VH</b>: Relative to the viewport’s height</li>
                </ul>
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- ████████████████████ Padding ████████████████████ -->

        <v-expansion-panel v-if="available_tabs.includes('padding')">
          <v-expansion-panel-title>
            <div>
              <v-icon class="me-1">padding</v-icon>
              Padding

              <v-chip
                v-if="in_paddingLeft && in_paddingLeft !== 'unset'"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Padding Left"
                variant="tonal"
                >Left: {{ in_paddingLeft }}
              </v-chip>
              <v-chip
                v-if="in_paddingRight && in_paddingRight !== 'unset'"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Padding Right"
                variant="tonal"
                >Right: {{ in_paddingRight }}
              </v-chip>
              <v-chip
                v-if="in_paddingTop && in_paddingTop !== 'unset'"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Padding top"
                variant="tonal"
                >top: {{ in_paddingTop }}
              </v-chip>
              <v-chip
                v-if="in_paddingBottom && in_paddingBottom !== 'unset'"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Padding Bottom"
                variant="tonal"
                >Bottom: {{ in_paddingBottom }}
              </v-chip>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div key="padding">
              <s-landing-style-preview
                :model-value="in_style"
                class="mb-5"
                padding
                @click:area="(val) => (Selected_tab = indexOf(val))"
              ></s-landing-style-preview>

              <s-widget-header icon="padding" title="Padding"></s-widget-header>
              <v-list-subheader
                >An element's padding area is the space between its content and
                its border.
              </v-list-subheader>

              <v-row class="max-w-640 mx-auto">
                <v-col cols="12" sm="6">
                  <s-number-dimension-input
                    v-model="in_paddingLeft"
                    :hint="size_hint"
                    clearable
                    label="Padding left"
                  ></s-number-dimension-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <s-number-dimension-input
                    v-model="in_paddingRight"
                    :hint="size_hint"
                    clearable
                    label="Padding right"
                  ></s-number-dimension-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <s-number-dimension-input
                    v-model="in_paddingTop"
                    :hint="size_hint"
                    clearable
                    label="Padding top"
                  ></s-number-dimension-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <s-number-dimension-input
                    v-model="in_paddingBottom"
                    :hint="size_hint"
                    clearable
                    label="Padding bottom"
                  ></s-number-dimension-input>
                </v-col>
              </v-row>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- ████████████████████ Margin ████████████████████ -->

        <v-expansion-panel v-if="available_tabs.includes('margin')">
          <v-expansion-panel-title>
            <div>
              <v-icon class="me-1">margin</v-icon>
              Margin

              <v-chip
                v-if="in_marginLeft && in_marginLeft !== 'unset'"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Margin Left"
                variant="tonal"
                >Left: {{ in_marginLeft }}
              </v-chip>
              <v-chip
                v-if="in_marginRight && in_marginRight !== 'unset'"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Margin Right"
                variant="tonal"
                >Right: {{ in_marginRight }}
              </v-chip>
              <v-chip
                v-if="in_marginTop && in_marginTop !== 'unset'"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Margin top"
                variant="tonal"
                >top: {{ in_marginTop }}
              </v-chip>
              <v-chip
                v-if="in_marginBottom && in_marginBottom !== 'unset'"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Margin Bottom"
                variant="tonal"
                >Bottom: {{ in_marginBottom }}
              </v-chip>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div key="margin">
              <s-landing-style-preview
                :model-value="in_style"
                class="mb-5"
                margin
                @click:area="(val) => (Selected_tab = indexOf(val))"
              ></s-landing-style-preview>

              <s-widget-header icon="margin" title="Margin"></s-widget-header>
              <v-list-subheader
                >In CSS, a margin is the space around an element's border, while
                padding is the space between an element's border and the
                element's content.
              </v-list-subheader>

              <v-row class="max-w-640 mx-auto">
                <v-col cols="12" sm="6">
                  <s-number-dimension-input
                    v-model="in_marginLeft"
                    :hint="size_hint"
                    clearable
                    label="Margin left"
                  ></s-number-dimension-input>
                </v-col>

                <v-col cols="12" sm="6">
                  <s-number-dimension-input
                    v-model="in_marginRight"
                    :hint="size_hint"
                    clearable
                    label="Margin right"
                  ></s-number-dimension-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <s-number-dimension-input
                    v-model="in_marginTop"
                    :hint="size_hint"
                    clearable
                    label="Margin top"
                  ></s-number-dimension-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <s-number-dimension-input
                    v-model="in_marginBottom"
                    :hint="size_hint"
                    clearable
                    label="Margin bottom"
                  ></s-number-dimension-input>
                </v-col>
              </v-row>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- ████████████████████ Border ████████████████████ -->

        <v-expansion-panel v-if="available_tabs.includes('border')">
          <v-expansion-panel-title>
            <div>
              <v-icon class="me-1">rounded_corner</v-icon>
              Border

              <v-chip
                v-if="in_borderLeft.trim() && !in_borderLeft.includes('unset')"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Border Left"
                variant="tonal"
              >
                <v-icon size="x-small" start>border_left</v-icon>
                {{ getName(in_borderLeft) }}
              </v-chip>
              <v-chip
                v-if="
                  in_borderRight.trim() && !in_borderRight.includes('unset')
                "
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Border Right"
                variant="tonal"
              >
                <v-icon size="x-small" start>border_right</v-icon>
                {{ getName(in_borderRight) }}
              </v-chip>
              <v-chip
                v-if="in_borderTop.trim() && !in_borderTop.includes('unset')"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Border Top"
                variant="tonal"
              >
                <v-icon size="x-small" start>border_top</v-icon>
                {{ getName(in_borderTop) }}
              </v-chip>
              <v-chip
                v-if="
                  in_borderBottom.trim() && !in_borderBottom.includes('unset')
                "
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Border Bottom"
                variant="tonal"
              >
                <v-icon size="x-small" start>border_bottom</v-icon>
                {{ getName(in_borderBottom) }}
              </v-chip>

              <v-chip
                v-if="in_borderRadius && in_borderRadius !== 'unset'"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Border Left"
                variant="tonal"
              >
                <v-icon size="x-small" start>rounded_corner</v-icon>
                {{ getName(in_borderRadius) }}
              </v-chip>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div key="border">
              <s-landing-style-preview
                :model-value="in_style"
                border
                class="mb-5"
                @click:area="(val) => (Selected_tab = indexOf(val))"
              ></s-landing-style-preview>

              <s-widget-header
                icon="rounded_corner"
                title="Border radius"
              ></s-widget-header>
              <v-list-subheader
                >The CSS border is a shorthand property used to set the border
                on an element.
              </v-list-subheader>

              <v-row class="max-w-640 mx-auto">
                <v-col cols="12" sm="6">
                  <s-number-dimension-input
                    v-model="in_borderRadius"
                    :hint="size_hint"
                    clearable
                    label="Border radius"
                  ></s-number-dimension-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <s-smart-toggle
                    v-model="borders_same"
                    dark
                    true-title="All same"
                  >
                  </s-smart-toggle>
                </v-col>
              </v-row>

              <s-widget-header
                icon="border_style"
                title="Border style"
              ></s-widget-header>

              <s-landing-style-border
                v-model="in_borderLeft"
                :label="borders_same ? 'Border' : 'Border left'"
                @update:modelValue="
                  (val) => {
                    if (borders_same) {
                      in_borderRight = in_borderTop = in_borderBottom = val;
                    }
                  }
                "
              ></s-landing-style-border>

              <v-expand-transition>
                <div v-if="!borders_same">
                  <s-landing-style-border
                    v-model="in_borderRight"
                    label="Border right"
                  ></s-landing-style-border>
                  <s-landing-style-border
                    v-model="in_borderTop"
                    label="Border top"
                  ></s-landing-style-border>
                  <s-landing-style-border
                    v-model="in_borderBottom"
                    label="Border bottom"
                  ></s-landing-style-border>
                </div>
              </v-expand-transition>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- ████████████████████ Class ████████████████████ -->

        <v-expansion-panel v-if="available_tabs.includes('classes')">
          <v-expansion-panel-title>
            <div>
              <v-icon class="me-1">turned_in</v-icon>
              Class

              <v-chip
                v-for="(it, i) in in_classes"
                :key="i"
                class="mx-1"
                color="green"
                label
                size="x-small"
                variant="tonal"
                >{{ getName(it) }}
              </v-chip>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div key="classes" class="min-height-40vh">
              <div
                class="class-prev-con bg-tiny-checkers-dark pa-3 overflow-auto"
                style="min-height: 120px; max-height: 200px !important"
              >
                <div :class="in_classes" class="class-prev">
                  Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.
                </div>
              </div>

              <s-widget-header
                icon="integration_instructions"
                title="Classes"
              ></s-widget-header>
              <v-list-subheader
                >In CSS, a class represents a collection of elements with
                similar or identical characteristics. All classes in Bootstrap 4
                are supported.
              </v-list-subheader>

              <div class="pa-1 border-between-vertical max-w-640 mx-auto">
                <div
                  v-for="(it, i) in in_classes"
                  :key="i"
                  class="d-flex align-center pa-1"
                >
                  <b>{{ it }}</b>
                  <v-spacer></v-spacer>
                  <div
                    :class="it"
                    style="
                      min-height: unset !important;
                      height: unset !important;
                    "
                    title="Sample"
                  >
                    ABC
                  </div>
                  <v-btn
                    class="ms-2"
                    color="red"
                    icon
                    title="Delete"
                    variant="text"
                    @click="remove(in_classes, it)"
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </div>
              </div>

              <v-combobox
                v-model="in_classes"
                :items="standard_classes"
                chips
                class="max-w-640 mx-auto"
                clearable
                closable-chips
                multiple
                variant="underlined"
              >
              </v-combobox>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- ████████████████████ Shadow ████████████████████ -->

        <v-expansion-panel v-if="available_tabs.includes('margin')">
          <v-expansion-panel-title>
            <div>
              <v-icon class="me-1">wb_shade</v-icon>
              Shadow

              <v-chip
                v-if="shadow"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Shadow"
                variant="tonal"
              >
                <v-icon size="x-small" start>layers</v-icon>
                {{ isObject(shadow) ? "Custom Shadow" : "Has Shadow" }}
              </v-chip>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div key="shadow" class="d-flex flex-column">
              <v-expand-transition>
                <div v-if="shadow && in_shadow_edit" class="pb-2">
                  <div class="shad-con bg-tiny-checkers mb-3">
                    <div
                      :class="{ '-inset': shadow_gen.includes('inset') }"
                      :style="{ boxShadow: shadow_gen }"
                      class="shad-pre"
                    ></div>

                    <div class="bottom-absolute-bar-dark" dir="ltr">
                      {{ shadow_gen }}
                    </div>
                  </div>
                </div>
              </v-expand-transition>

              <v-expand-transition>
                <!-- Custom shadow edit mode -->

                <div v-if="in_shadow_edit">
                  <s-widget-header
                    icon="looks_one"
                    title="Horizontal shadow length"
                  ></s-widget-header>

                  <v-slider
                    v-model="shadow.h"
                    :max="200"
                    :min="-200"
                    step="1"
                    thumb-color="#555"
                    thumb-label="always"
                  ></v-slider>

                  <s-widget-header
                    icon="looks_two"
                    title="Vertical shadow length"
                  ></s-widget-header>

                  <v-slider
                    v-model="shadow.w"
                    :max="200"
                    :min="-200"
                    step="1"
                    thumb-color="#555"
                    thumb-label="always"
                  ></v-slider>

                  <s-widget-header
                    icon="blur_on"
                    title="Blur Radius"
                  ></s-widget-header>

                  <v-slider
                    v-model="shadow.r"
                    :max="200"
                    :min="-200"
                    step="1"
                    thumb-color="#555"
                    thumb-label="always"
                  ></v-slider>

                  <s-widget-header
                    icon="blur_linear"
                    title="Spread Radius"
                  ></s-widget-header>

                  <v-slider
                    v-model="shadow.s"
                    :max="200"
                    :min="-200"
                    step="1"
                    thumb-color="#555"
                    thumb-label="always"
                  ></v-slider>

                  <s-smart-switch
                    v-model="shadow.i"
                    class="my-5"
                    dark
                    false-icon="wb_shade"
                    false-title="Outbound shadow"
                    inset
                    true-icon="curtains"
                    true-title="Inset shadow"
                  ></s-smart-switch>

                  <s-widget-header
                    icon="format_color_fill"
                    title="Color"
                  ></s-widget-header>

                  <s-color-selector
                    v-model="shadow.c"
                    title="Shadow Color"
                  ></s-color-selector>
                </div>

                <!-- Select shadow collection (default) -->
                <v-item-group
                  v-else
                  v-model="shadow"
                  :style="{ 'max-height': 50 + 'vh' }"
                  class="overflow-y-auto bg-tiny-checkers"
                >
                  <v-container>
                    <v-row align="center" justify="center">
                      <v-col v-for="(item, i) in ShadowCollection" :key="i">
                        <v-item v-slot="{ active, toggle }" :value="item">
                          <v-card
                            :style="`box-shadow:${item}`"
                            class="d-flex align-center"
                            color="#fff"
                            height="120"
                            width="120"
                            @click="toggle"
                          >
                            <v-scroll-y-transition>
                              <div
                                v-if="active"
                                class="flex-grow-1 text-center"
                              >
                                <v-icon color="success" size="large"
                                  >check
                                </v-icon>
                              </div>
                            </v-scroll-y-transition>
                          </v-card>
                        </v-item>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-item-group>
              </v-expand-transition>

              <div class="py-2">
                <!-- Edit custom shadow -->
                <v-btn v-if="!in_shadow_edit && !shadow" @click="addShadow()">
                  <v-icon class="me-1">layers</v-icon>
                  Edit custom shadow
                </v-btn>

                <v-btn v-if="shadow" @click="removeShadow()">
                  <v-icon class="me-1">layers_clear</v-icon>
                  Remove shadow
                </v-btn>
              </div>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- ████████████████████ Filter ████████████████████ -->

        <v-expansion-panel v-if="available_tabs.includes('filter')">
          <v-expansion-panel-title>
            <div>
              <v-icon class="me-1">movie_filter</v-icon>
              Filter

              <v-chip
                v-if="filter"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Filter"
                variant="tonal"
              >
                <v-icon size="x-small" start>photo_filter</v-icon>
                Has Filter
              </v-chip>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div key="filter">
              <s-landing-style-filter
                v-model="filter"
                :preview-image="
                  options?.prev_image
                    ? getShopImagePath(options.prev_image)
                    : undefined
                "
                show-preview
              ></s-landing-style-filter>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- ████████████████████ Transform ████████████████████ -->

        <v-expansion-panel v-if="available_tabs.includes('transform')">
          <v-expansion-panel-title>
            <div>
              <v-icon class="me-1">transform</v-icon>
              Transform

              <v-chip
                v-if="transform && transform.rotate"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Rotate"
                variant="tonal"
                >R {{ transform.rotate }}°
              </v-chip>
              <v-chip
                v-if="transform && transform.rotateX"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Rotate X"
                variant="tonal"
                >Rx {{ transform.rotateX }}°
              </v-chip>
              <v-chip
                v-if="transform && transform.rotateY"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Rotate Y"
                variant="tonal"
                >Ry {{ transform.rotateY }}°
              </v-chip>
              <v-chip
                v-if="transform && transform.rotateZ"
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Rotate Z"
                variant="tonal"
                >Rz {{ transform.rotateZ }}°
              </v-chip>

              <v-chip
                v-if="
                  transform &&
                  transform.translateX &&
                  transform.translateX !== 'unset'
                "
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Translate X"
                variant="tonal"
                >Tx {{ getName(transform.translateX) }}
              </v-chip>
              <v-chip
                v-if="
                  transform &&
                  transform.translateY &&
                  transform.translateY !== 'unset'
                "
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Translate Y"
                variant="tonal"
                >Ty {{ getName(transform.translateY) }}
              </v-chip>
              <v-chip
                v-if="
                  transform &&
                  transform.translateZ &&
                  transform.translateZ !== 'unset'
                "
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Translate Z"
                variant="tonal"
                >Tz {{ getName(transform.translateZ) }}
              </v-chip>

              <v-chip
                v-if="
                  transform && transform.scaleX && transform.scaleX !== 'unset'
                "
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Scale X"
                variant="tonal"
                >Sx {{ getName(transform.scaleX) }}
              </v-chip>
              <v-chip
                v-if="
                  transform && transform.scaleY && transform.scaleY !== 'unset'
                "
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Scale Y"
                variant="tonal"
                >Sy {{ getName(transform.scaleY) }}
              </v-chip>

              <v-chip
                v-if="
                  transform && transform.skewX && transform.skewX !== 'unset'
                "
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Skew X"
                variant="tonal"
                >Kx {{ getName(transform.skewX) }}
              </v-chip>
              <v-chip
                v-if="
                  transform && transform.skewY && transform.skewY !== 'unset'
                "
                class="mx-1"
                color="green"
                label
                size="x-small"
                title="Skew Y"
                variant="tonal"
                >Ky {{ getName(transform.skewY) }}
              </v-chip>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div key="transform">
              <div class="shad-con bg-tiny-checkers mb-3">
                <div
                  :style="{ transform: transform_gen }"
                  class="shad-pre s--shadow-no-padding"
                  style="border-radius: 6px"
                ></div>
                <div class="bottom-absolute-bar-dark" dir="ltr">
                  {{ transform_gen }}
                </div>
              </div>

              <s-widget-header
                icon="rotate_90_degrees_ccw"
                title="Rotation"
              ></s-widget-header>
              <v-list-subheader>
                The rotation defines a transformation that rotates an element
                around a fixed point on the 2D plane, without deforming it.
              </v-list-subheader>

              <v-row>
                <v-col cols="12" md="3" sm="6">
                  <s-number-input
                    v-model="transform.rotate"
                    :max="360"
                    :min="-360"
                    label="Rotate"
                    suffix="deg"
                  ></s-number-input>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <s-number-input
                    v-model="transform.rotateX"
                    :max="360"
                    :min="-360"
                    label="Rotate X"
                    suffix="deg"
                  ></s-number-input>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <s-number-input
                    v-model="transform.rotateY"
                    :max="360"
                    :min="-360"
                    label="Rotate Y"
                    suffix="deg"
                  ></s-number-input>
                </v-col>
                <v-col cols="12" md="3" sm="6">
                  <s-number-input
                    v-model="transform.rotateZ"
                    :max="360"
                    :min="-360"
                    label="Rotate Z"
                    suffix="deg"
                  ></s-number-input>
                </v-col>
              </v-row>

              <s-widget-header
                icon="flip_to_back"
                title="Translate"
              ></s-widget-header>
              <v-list-subheader>
                The translate allows you to transfer an element from one place
                to another along the X (horizontal) axis, the Y (vertical) axis,
                and the Z (depth) axis.
              </v-list-subheader>

              <v-row>
                <v-col cols="12" md="4" sm="6">
                  <s-number-dimension-input
                    v-model="transform.translateX"
                    clearable
                    label="Translate X"
                  ></s-number-dimension-input>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <s-number-dimension-input
                    v-model="transform.translateY"
                    clearable
                    label="Translate y"
                  ></s-number-dimension-input>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                  <s-number-dimension-input
                    v-model="transform.translateZ"
                    clearable
                    label="Translate z"
                  ></s-number-dimension-input>
                </v-col>
              </v-row>

              <s-widget-header icon="transform" title="Scale"></s-widget-header>
              <v-list-subheader>
                The scale defines a transformation that resizes an element on
                the 2D plane.
              </v-list-subheader>

              <v-row>
                <v-col cols="12" md="4" sm="6">
                  <s-number-input
                    v-model="transform.scaleX"
                    :decimal="1"
                    :max="10"
                    :min="0"
                    :step="0.1"
                    clearable
                    label="Scale X"
                  ></s-number-input>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                  <s-number-input
                    v-model="transform.scaleY"
                    :decimal="1"
                    :max="10"
                    :min="0"
                    :step="0.1"
                    clearable
                    label="Scale Y"
                  ></s-number-input>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                  <s-number-input
                    v-model="transform.scaleZ"
                    :decimal="1"
                    :max="10"
                    :min="0"
                    :step="0.1"
                    clearable
                    label="Scale Z"
                  ></s-number-input>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <s-number-dimension-input
                    v-model="transform.perspective"
                    clearable
                    label="Perspective"
                  ></s-number-dimension-input>
                </v-col>
              </v-row>
              <s-widget-header icon="360" title="Skew"></s-widget-header>
              <v-list-subheader
                >This transformation is a shear mapping that distorts each point
                within an element by a certain angle in the horizontal and
                vertical directions.
              </v-list-subheader>

              <v-row>
                <v-col cols="12" sm="6">
                  <s-number-input
                    v-model="transform.skewX"
                    :max="360"
                    :min="-360"
                    label="Skew Y"
                    suffix="deg"
                  ></s-number-input>
                </v-col>

                <v-col cols="12" sm="6">
                  <s-number-input
                    v-model="transform.skewY"
                    :max="360"
                    :min="-360"
                    label="Skew Y"
                    suffix="deg"
                  ></s-number-input>
                </v-col>
              </v-row>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import SNumberDimensionInput from "@components/ui/dimension/SNumberDimensionInput.vue";
import { ClassesHelper } from "@core/helper/style/Classes";
import SLandingStylePreview from "@app-page-builder/components/style/preview/SLandingStylePreview.vue";
import SLandingStyleBorder from "@app-page-builder/components/style/border/SLandingStyleBorder.vue";
import SColorSelector from "@components/ui/color/selector/SColorSelector.vue";
import SLandingStyleFilter from "@app-page-builder/components/style/filter/SLandingStyleFilter.vue";
import SNumberInput from "@components/ui/input/number/SNumberInput.vue";
import ShadowCollection from "../../src/enums/ShadowCollection";

import SSmartToggle from "@components/smart/SSmartToggle.vue";
import SSmartSwitch from "@components/smart/SSmartSwitch.vue";
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import { HighlightEditingElements } from "@app-page-builder/src/helpers/HighlightEditingElements";
import _ from "lodash-es";
import PageEventBusMixin from "@app-page-builder/mixins/PageEventBusMixin";
import { PageBuilderColorsHelper } from "@app-page-builder/src/helpers/PageBuilderColorsHelper";

const STYLE_TABS = [
  "size",
  "padding",
  "border",
  "margin",
  "shadow",
  "classes",
  "filter",
  "transform",
];

export default {
  name: "LSettingsClassStyle",
  mixins: [PageEventBusMixin],
  components: {
    SSmartSwitch,
    SSmartToggle,

    SNumberInput,
    SLandingStyleFilter,
    SColorSelector,
    SLandingStyleBorder,
    SLandingStylePreview,
    SNumberDimensionInput,
  },

  props: {
    builder: { type: Object, required: true },
  },
  data: () => ({
    el_style: null,
    el_class: null,
    target: null,
    keyStyle: null, // style
    keyClass: null, // classes
    options: {},

    // ---------------------------------
    show_dialog_size: false,
    dialog_pre: false,

    Selected_tab: null,

    standard_classes: ClassesHelper.StandardClasses(),
    in_classes: null,

    in_width: null,
    in_height: null,
    in_minWidth: null,
    in_minHeight: null,
    in_maxWidth: null,
    in_maxHeight: null,

    in_marginLeft: null,
    in_marginRight: null,
    in_marginTop: null,
    in_marginBottom: null,

    in_paddingLeft: null,
    in_paddingRight: null,
    in_paddingTop: null,
    in_paddingBottom: null,

    in_borderRadius: 0,

    in_borderLeft: null,
    in_borderRight: null,
    in_borderTop: null,
    in_borderBottom: null,

    size_hint: "Can set in %, px, vh, vm, pt, mm & ...",

    borders_same: false,

    //--------------------------
    shadow: null,
    ShadowCollection: ShadowCollection,
    //--------------------------
    filter: null,

    //--------------------------
    transform: {},

    //--------------------------
    key_listener_keydown: null,

    LOCK: false, // 🔐 Lock changes
  }),

  computed: {
    global_variables() {
      return PageBuilderColorsHelper.GenerateColorsStyle(this.builder.style);
    },

    available_tabs() {
      if (this.has_size) return STYLE_TABS;
      return STYLE_TABS.slice(1);
    },

    shadow_gen() {
      if (!this.shadow) return "";
      if (this.isString(this.shadow)) return this.shadow;
      return `${this.shadow.w}px ${this.shadow.h}px ${this.shadow.r}px ${
        this.shadow.s
      }px ${this.shadow.c} ${this.shadow.i ? "inset" : ""}`;
    },
    in_shadow_edit() {
      return this.shadow && !this.isString(this.shadow);
    },

    //-----------------------------------
    transform_gen() {
      let out = "";

      Object.keys(this.transform).forEach((key) => {
        const value = this.transform[key];
        if (!value || ["auto", "none", "unset"].includes(value)) return;

        const dim = key.includes("rotate") || key.includes("skew") ? "deg" : "";
        out += `${key}(${value}${dim}) `;
      });

      return out;
    },

    //-----------------------------------
    in_style() {
      const out = {
        marginLeft: this.in_marginLeft,
        marginRight: this.in_marginRight,
        marginTop: this.in_marginTop,
        marginBottom: this.in_marginBottom,

        paddingLeft: this.in_paddingLeft,
        paddingRight: this.in_paddingRight,
        paddingTop: this.in_paddingTop,
        paddingBottom: this.in_paddingBottom,

        borderRadius: this.in_borderRadius,
        borderLeft: this.in_borderLeft,
        borderRight: this.in_borderRight,
        borderTop: this.in_borderTop,
        borderBottom: this.in_borderBottom,

        boxShadow: this.shadow_gen,

        filter: this.filter,

        transform: this.transform_gen,
      };

      if (this.has_size) {
        out.width = this.in_width;
        out.height = this.in_height;

        out.minWidth = this.in_minWidth;
        out.minHeight = this.in_minHeight;

        out.maxWidth = this.in_maxWidth;
        out.maxHeight = this.in_maxHeight;
      }

      return out;
    },

    //------------- Options ----------
    has_size() {
      return !this.options || !this.options.noSize;
    },
  },

  watch: {
    in_classes() {
      this.setSizePositionDebounced();
    },

    in_width() {
      this.setSizePositionDebounced();
    },
    in_height() {
      this.setSizePositionDebounced();
    },
    in_minWidth() {
      this.setSizePositionDebounced();
    },
    in_minHeight() {
      this.setSizePositionDebounced();
    },
    in_maxWidth() {
      this.setSizePositionDebounced();
    },
    in_maxHeight() {
      this.setSizePositionDebounced();
    },

    in_marginLeft() {
      this.setSizePositionDebounced();
    },
    in_marginRight() {
      this.setSizePositionDebounced();
    },
    in_marginTop() {
      this.setSizePositionDebounced();
    },
    in_marginBottom() {
      this.setSizePositionDebounced();
    },

    in_paddingLeft() {
      this.setSizePositionDebounced();
    },
    in_paddingRight() {
      this.setSizePositionDebounced();
    },
    in_paddingTop() {
      this.setSizePositionDebounced();
    },
    in_paddingBottom() {
      this.setSizePositionDebounced();
    },

    in_borderRadius() {
      this.setSizePositionDebounced();
    },

    in_borderLeft() {
      this.setSizePositionDebounced();
    },
    in_borderRight() {
      this.setSizePositionDebounced();
    },
    in_borderTop() {
      this.setSizePositionDebounced();
    },
    in_borderBottom() {
      this.setSizePositionDebounced();
    },

    borders_same() {
      this.setSizePositionDebounced();
    },

    shadow: {
      handler() {
        this.setSizePositionDebounced();
      },
      deep: true,
    },

    filter: {
      handler() {
        this.setSizePositionDebounced();
      },
      deep: true,
    },

    transform: {
      handler() {
        this.setSizePositionDebounced();
      },
      deep: true,
    },

    show_dialog_size(dialog) {
      // Keep highlight active element:
      if (!dialog) HighlightEditingElements.RemoveAllElementFocusEditing();
      else if (this.el_class) HighlightEditingElements.Activate(this.el_class);
    },
  },
  created() {},
  mounted() {
    this.EventBus.$on(
      "show:LSettingsClassStyle",

      ({ el_style, el_class, target, keyStyle, keyClass, options }) => {
        this.CloseAllPageBuilderNavigationDrawerTools(); // Close all open tools.

        this.LOCK = true; // 🔒 Prevent update style and classes

        this.el_style = el_style;
        this.el_class = el_class;

        this.target = target;
        this.keyStyle = keyStyle;
        this.keyClass = keyClass;

        this.options = options;

        this.showSizeDialog();
      },
    );

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――
    this.key_listener_keydown = (event) => {
      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        if (this.show_dialog_size) {
          // Close tools
          this.show_dialog_size = false;
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
    this.EventBus.$on(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS, () => {
      this.show_dialog_size = false;
    });
  },
  beforeUnmount() {
    this.EventBus.$off("show:LSettingsClassStyle");
    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    indexOf(val) {
      if (val === "size") return 0;
      else if (val === "padding") return 1 - (this.has_size ? 0 : 1);
      else if (val === "margin") return 2 - (this.has_size ? 0 : 1);
      else if (val === "border") return 3 - (this.has_size ? 0 : 1);
    },

    addShadow() {
      this.shadow = { w: 10, h: 10, r: 15, s: 20, c: "#44444433", i: false };
    },
    removeShadow() {
      this.shadow = null;
    },

    showSizeDialog() {
      //  this.Selected_tab = this.has_size ? STYLE_TABS[0] : STYLE_TABS[1];

      let classes = this.target[this.keyClass];
      if (!classes) classes = [];
      this.in_classes = classes.unique();

      /*
            this.in_classes = this.el_class.className
        .split(" ")
        .filter(
          (val) => val.startsWith("is-") || this.standard_classes.includes(val)
        ); // Tips: 'is-' is official classes by styler!
        */

      //console.log(' this.in_classes', this.in_classes,this.el_class.className)
      let style = this.target[this.keyStyle];
      if (!style || Array.isArray(style)) style = {};

      this.in_width = this.el_style.style.width;
      this.in_height = this.el_style.style.height;

      this.in_minWidth = this.el_style.style.minWidth;
      this.in_minHeight = this.el_style.style.minHeight;

      this.in_maxWidth = this.el_style.style.maxWidth;
      this.in_maxHeight = this.el_style.style.maxHeight;

      // Margin:

      this.in_marginLeft = this.el_style.style.marginLeft;
      this.in_marginRight = this.el_style.style.marginRight;
      this.in_marginTop = this.el_style.style.marginTop;
      this.in_marginBottom = this.el_style.style.marginBottom;

      // Padding:

      this.in_paddingLeft = this.el_style.style.paddingLeft;
      this.in_paddingRight = this.el_style.style.paddingRight;
      this.in_paddingTop = this.el_style.style.paddingTop;
      this.in_paddingBottom = this.el_style.style.paddingBottom;

      // Border:

      this.in_borderRadius = this.el_style.style.borderRadius;

      this.in_borderLeft = `${this.el_style.style.borderLeftWidth} ${this.el_style.style.borderLeftStyle} ${this.el_style.style.borderLeftColor}`;
      this.in_borderRight = `${this.el_style.style.borderRightWidth} ${this.el_style.style.borderRightStyle} ${this.el_style.style.borderRightColor}`;
      this.in_borderTop = `${this.el_style.style.borderTopWidth} ${this.el_style.style.borderTopStyle} ${this.el_style.style.borderTopColor}`;
      this.in_borderBottom = `${this.el_style.style.borderBottomWidth} ${this.el_style.style.borderBottomStyle} ${this.el_style.style.borderBottomColor}`;

      this.borders_same =
        this.in_borderLeft === this.in_borderRight &&
        this.in_borderTop === this.in_borderBottom &&
        this.in_borderLeft === this.in_borderBottom;

      // Filter:
      this.filter = this.el_style.style.filter;

      // Shadow:

      this.shadow = this.el_style.style.boxShadow;
      //console.log("boxShadow ", this.el_style.style.boxShadow);
      // Try to extract value:
      if (
        this.el_style.style.boxShadow &&
        !ShadowCollection.includes(this.shadow)
      )
        // Not in collection!
        try {
          const arr = this.el_style.style.boxShadow.split(/ (?![^(]*\))/);
          if (arr.length >= 5)
            this.shadow = {
              w: parseInt(arr[1]),
              h: parseInt(arr[2]),
              r: parseInt(arr[3]),
              s: parseInt(arr[4]),
              c: arr[0],
              i: arr.includes("inset"),
            };
          //console.log("boxShadow ",this.el_style.style.boxShadow,  this.shadow);
        } catch (e) {
          console.error(e);
        }

      // Transform:

      // Get raw transform from original object because of reset transform in draggable page edit:
      const transform_raw = style.transform;
      //console.log("transform_raw", transform_raw);

      this.transform = this.ConvertStylePropertyToObject(transform_raw);
      // Remove deg from values: (Deg inputs are raw number!)
      Object.keys(this.transform).forEach((key) => {
        const val = this.transform[key];
        if (val.includes("deg")) this.transform[key] = val.replace("deg", "");
      });

      //console.log("transform object:", this.transform);

      this.dialog_pre = false;
      this.$nextTick(() => {
        this.dialog_pre = true;
        this.show_dialog_size = true;
        this.LOCK = false; // 🔓 Now can update values
      });
    },

    /**
     * Extract transform property : transform: rotate(12deg) translateX(15px);
     * @param styles
     * @returns {{}}
     * @constructor
     */
    ConvertStylePropertyToObject(styles) {
      if (!styles) return {};
      const out = {};

      styles.split(" ").forEach((style) => {
        const arr = style.split("(");
        if (arr.length > 1) {
          out[arr[0].trim()] = arr[1].trim().replace(")", "").replace(";", "");
        }
      });
      return out;
    },

    //----------------------------------------------------------------------------
    setSizePositionDebounced: _.debounce(function () {
      this.setSizePosition();
    }, 100),

    setSizePosition() {
      if (!this.show_dialog_size || this.LOCK) return;

      const t = this;

      function convertToDashSeparated(str) {
        return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }

      function safeSetStyle(key, val) {
        if (val && val !== "unset") t.el_style.style[key] = val;
        else {
          t.el_style.style.removeProperty(key); // The removeProperty() method in JavaScript is used to remove a CSS property from the style object of an element. However, it only works with properties that are set through CSS stylesheets, not inline styles.
          //const converted = convertToDashSeparated(key); // minWidth -> min-width
          t.el_style.style[key] = "";
          //console.log('Set Style',key,converted,val)
        }
      }

      if (this.has_size) {
        safeSetStyle("width", this.in_width);
        safeSetStyle("height", this.in_height);
        safeSetStyle("minWidth", this.in_minWidth);
        safeSetStyle("minHeight", this.in_minHeight);
        safeSetStyle("maxWidth", this.in_maxWidth);
        safeSetStyle("maxHeight", this.in_maxHeight);
      }

      safeSetStyle("marginLeft", this.in_marginLeft);
      safeSetStyle("marginRight", this.in_marginRight);
      safeSetStyle("marginTop", this.in_marginTop);
      safeSetStyle("marginBottom", this.in_marginBottom);
      safeSetStyle("paddingLeft", this.in_paddingLeft);
      safeSetStyle("paddingRight", this.in_paddingRight);
      safeSetStyle("paddingTop", this.in_paddingTop);
      safeSetStyle("paddingBottom", this.in_paddingBottom);

      safeSetStyle("borderRadius", this.in_borderRadius);
      safeSetStyle("borderLeft", this.in_borderLeft);
      safeSetStyle("borderRight", this.in_borderRight);
      safeSetStyle("borderTop", this.in_borderTop);
      safeSetStyle("borderBottom", this.in_borderBottom);

      safeSetStyle("boxShadow", this.shadow_gen);

      safeSetStyle("filter", this.filter);

      safeSetStyle("transform", this.transform_gen);

      let style = this.target[this.keyStyle];
      if (!style || Array.isArray(style)) style = {};

      // Keep other style values and filter!
      Object.keys(this.in_style).forEach((k) => {
        if (
          this.in_style[k] &&
          this.in_style[k].trim().length &&
          this.in_style[k].trim() !== "unset"
        ) {
          style[k] = this.in_style[k];
        } else {
          delete style[k];
        }
      });
      console.log("Element style -->  ", style);

      //  style = Object.assign(style, filtered_style);

      this.target[this.keyStyle] = style; // Save data in section!

      // ----------------------- Save Custom Classes -----------------------
      // Set classes:
      let classes = this.target[this.keyClass];
      if (!classes) classes = [];
      const cur_classes = classes;

      /*

      const cur_classes = this.el_class.className
        .split(" ")
        .filter(
          (val) => val.startsWith("is-") || this.standard_classes.includes(val)
        );
*/
      // console.log(' Set classes', 'cur_classes',cur_classes)

      const deletes = cur_classes.filter(
        (element) => !this.in_classes.includes(element),
      );
      const adds = this.in_classes.filter(
        (element) => !cur_classes.includes(element),
      );

      //  console.log(' Set classes', 'deletes',deletes,'adds',adds)

      this.el_class.classList.remove(...deletes);
      this.el_class.classList.add(...adds);

      console.log("Element classes -->  ", this.in_classes);

      this.target[this.keyClass] = this.in_classes; // Save data in section!
    },
  },
};
</script>

<style lang="scss" scoped>
.shad-con {
  position: relative;
  min-height: 220px;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .shad-pre {
    height: 64px;
    width: 64px;
    border-radius: 50%;
    background: #fafafa;
    transition: all 0.5s ease-in-out;

    &.-inset {
      height: 200px;
      width: 200px;
    }
  }
}
</style>
