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
    v-if="$builder.isEditing"
    id="styler"
    ref="styler"
    class="styler"
    @click.stop=""
    :class="[
      {
        'is-visible': isVisible,
        /* && !other_styler_open !==  type*/ /*Prevent open style with samy view type to make inline editor simple!*/ '-dot -red':
          type === 'button' || type === 'text',
        '-dot -green':
          type === 'row' || type === 'row-grid' || type === 'buttons-row',
        '-dot -amber': type === 'container',

        '-dot -blue': type === 'grid',
        '-dot': type === 'section',
      },
      `-type-${type}`,
    ]"
    :style="[
      {
        display: !has_tools ? 'none' : undefined,
        zIndex: currentOption ? 201 : undefined,
      },
      PageBuilderColorsHelper.GenerateColorsStyle($builder.style),
    ]"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <!-- Important: Display non because of preventing proper error -->

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ――――――――――――――――――――――― Normal editing tools ―――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul
      v-if="!$builder.isAnimation && !$builder.isTracking"
      class="styler-list"
    >
      <!-- ―――――――――――――――――― Delete button / col ―――――――――――――――――― -->

      <template
        v-if="(type === 'button' || type === 'grid') && parentIs('addable')"
      >
        <li>
          <button
            class="styler-button"
            @click="removeItem"
            :title="type === 'button' ? 'Delete button' : 'Delete column'"
          >
            <v-icon color="red" size="20">close</v-icon>
          </button>
        </li>
        <v-divider class="mx-2" vertical dark inset></v-divider>
      </template>

      <!-- ―――――――――――――――――― Custom Layout (XColumn) ―――――――――――――――――― -->

      <li v-if="type === 'grid' && hasAttribute('has-custom-layout')">
        <button
          class="styler-button"
          @click="showCustomLayout"
          title="Customize Layout"
        >
          <v-icon size="20" dark>fit_screen</v-icon>
        </button>
      </li>

      <!-- ―――――――――――――――――― Size & Class ―――――――――――――――――― -->

      <li v-if="type === 'section' || type === 'grid' || type === 'container'">
        <button
          class="styler-button"
          @click="showMasterDesignDialog()"
          title="Size & Class"
        >
          <v-icon dark size="20">architecture</v-icon>
        </button>
      </li>

      <!-- ―――――――――――――――――― Bg image ―――――――――――――――――― -->

      <li v-if="type === 'section' || type === 'grid' || type === 'container'">
        <button
          class="styler-button"
          @click="showStyleDialog()"
          title="Background image"
        >
          <v-icon size="20" dark>fas fa-image</v-icon>
        </button>
      </li>

      <!-- ―――――――――――――――――― Colors ―――――――――――――――――― -->

      <li v-if="type === 'button' || type === 'section'">
        <button
          class="styler-button"
          @click="updateOption('colorer')"
          title="Background color"
        >
          <SStylerIcon name="palettes" />
        </button>
      </li>
      <!-- ―――――――――――――――――― Bg styler ―――――――――――――――――― -->
      <li v-if="type === 'section'">
        <button
          class="styler-button"
          @click="updateOption('bg-styler')"
          title="Section style"
        >
          <v-icon size="20" dark>style</v-icon>
        </button>
      </li>

      <!-- ―――――――――――――――――― Row Align / Justify ―――――――――――――――――― -->

      <li
        v-if="
          (type === 'row' && hasAttribute('has-arrange')) ||
          type === 'buttons-row'
        "
      >
        <button
          class="styler-button"
          @click="updateOption('row-align-justify')"
          title="Align & Justify"
        >
          <v-icon dark size="20">vertical_distribute</v-icon>
        </button>
      </li>

      <!-- ―――――――――――――――――― Wrap / Scroll Mode ―――――――――――――――――― -->

      <li v-if="type === 'row' && hasAttribute('has-wrap')">
        <button
          class="styler-button"
          @click="toggleNoWrap"
          title="Wrap / Nowrap"
        >
          <v-icon dark size="20">{{
            no_wrap ? "view_column" : "view_comfy"
          }}</v-icon>
        </button>
      </li>

      <!-- ―――――――――――――――――― Add New Column ―――――――――――――――――― -->

      <li v-if="type === 'row' && el.hasAttribute('has-add')">
        <button
          class="styler-button"
          @click="addNewColumn"
          title="Add new column"
        >
          <v-icon dark size="20" color="#CDDC39">library_add</v-icon>
        </button>
      </li>

      <!-- ―――――――――――――――――― XButtons List (Add Button) ―――――――――――――――――― -->

      <li v-if="type === 'buttons-row'">
        <button
          class="styler-button"
          @click="addNewButton()"
          title="Add new button"
        >
          <v-icon dark size="20" color="#CDDC39">add_box</v-icon>
        </button>
      </li>

      <!-- ―――――――――――――――――― Row Fluid ―――――――――――――――――― -->

      <li
        v-if="
          ((type === 'row' &&
            parentIs('container')) /*Parent container has editable itself!*/ ||
            type === 'container') &&
          !blockFluid()
        "
      >
        <button
          class="styler-button"
          @click="container_fluid = !container_fluid"
          title="Fluid container"
        >
          <v-icon dark size="20">{{
            container_fluid ? "swap_horiz" : "compare_arrows"
          }}</v-icon>
        </button>
      </li>

      <!-- ―――――――――――――――――― Button ―――――――――――――――――― -->

      <li
        v-if="
          (type === 'button' || type === 'text') && !hasAttribute('no-link')
        "
      >
        <button
          class="styler-button"
          @click="updateOption('link')"
          title="Link"
        >
          <SStylerIcon name="link" />
        </button>
      </li>

      <li v-if="type === 'button'">
        <button
          class="styler-button"
          @click="updateOption('btn-shape')"
          title="Shape"
        >
          <v-icon dark size="20">smart_button</v-icon>
        </button>
      </li>

      <li v-if="type === 'button'">
        <button
          class="styler-button"
          @click="updateOption('btn-size')"
          title="Size"
        >
          <v-icon dark size="20">straighten</v-icon>
        </button>
      </li>

      <!-- ―――――――――――――――――― Products & Categories ―――――――――――――――――― -->

      <template v-if="type === 'products'">
        <li
          v-if="
            el.getAttribute(
              'custom-layout'
            ) /*Only show if this attribute exist!*/
          "
        >
          <button
            class="styler-button"
            @click="showCustomProductFrame"
            title="Custom Code"
          >
            <v-icon color="#fff" size="20"> code </v-icon>
          </button>
        </li>
        <li>
          <button
            class="styler-button"
            @click="showQueryBuilderProducts"
            title="Products & Categories"
          >
            <v-icon color="#fff" size="20"> filter_alt </v-icon>
          </button>
        </li>
      </template>

      <!-- ―――――――――――――――――― Slide Show ―――――――――――――――――― -->

      <li v-if="type === 'slide'">
        <button
          class="styler-button"
          @click="showEditSlides"
          title="Slides Setting"
        >
          <v-icon color="#fff" size="20"> tune </v-icon>
        </button>
      </li>

      <!-- ―――――――――――――――――― Blogs ―――――――――――――――――― -->

      <li v-if="type === 'blogs'">
        <button
          class="styler-button"
          @click="showQueryBuilderBlogs"
          title="Blogs"
        >
          <v-icon color="#fff" size="20"> filter_alt </v-icon>
        </button>
      </li>

      <!-- ―――――――――――――――――― Text Loop ―――――――――――――――――― -->

      <li v-if="type === 'text-loop'">
        <button
          class="styler-button"
          @click="showQueryBuilderTextLoop"
          title="Text Loop"
        >
          <v-icon color="#fff" size="20"> recycling </v-icon>
        </button>
      </li>

      <!-- ―――――――――――――――――― Product ―――――――――――――――――― -->

      <li v-if="type === 'product'">
        <button
          class="styler-button"
          @click="showSelectProduct"
          title="Select product"
        >
          <v-icon color="#fff" size="20"> bento </v-icon>
        </button>
      </li>

      <!-- ―――――――――――――――――― Delete ―――――――――――――――――― -->

      <li v-if="type === 'header' || type === 'section'">
        <button
          class="styler-button"
          @click="removeSection"
          title="Delete section"
        >
          <SStylerIcon name="trash" />
        </button>
      </li>

      <!-- ―――――――――――――――――― Text & Button caption―――――――――――――――――― -->
      <template v-if="type === 'text' || type === 'button'">
        <li>
          <button
            class="styler-button"
            @click="updateOption('textColor')"
            title="Text Color"
          >
            <v-icon dark size="20">format_color_text</v-icon>
          </button>
        </li>

        <li>
          <button
            class="styler-button"
            @click="updateOption('text-font')"
            title="Font"
          >
            <v-icon dark size="20">font_download</v-icon>
          </button>
        </li>

        <li v-if="type === 'text' || hasButtonAlign">
          <button
            class="styler-button"
            @click="updateOption('align')"
            title="Text Align"
          >
            <SStylerIcon name="align" />
          </button>
        </li>
      </template>

      <!-- ―――――――――――――――――― Text ―――――――――――――――――― -->

      <template v-if="type === 'text'">
        <li>
          <button
            class="styler-button"
            @click="updateOption('textStyle')"
            title="Text style"
          >
            <SStylerIcon name="textStyle" />
          </button>
        </li>

        <li>
          <button
            class="styler-button"
            @click="updateOption('text-gradient')"
            title="Text gradient"
          >
            <v-icon dark size="20">gradient</v-icon>
          </button>
        </li>
      </template>

      <!-- ―――――――――――――――――― Grid ―――――――――――――――――― -->

      <template v-if="type === 'grid' || type === 'row-grid'">
        <v-divider
          v-if="type === 'grid'"
          class="mx-2"
          vertical
          dark
          inset
        ></v-divider>
        <!-- Row grid use to apply grid to all elements like blogs -->

        <li>
          <button
            class="styler-button"
            @click="selectDevice('mobile')"
            :class="{ selected: device === 'mobile' }"
            title="Size on mobile devices."
          >
            <SStylerIcon name="mobile" />
          </button>
        </li>
        <li>
          <button
            class="styler-button"
            @click="selectDevice('tablet')"
            :class="{ selected: device === 'tablet' }"
            title="Size on tablet devices."
          >
            <SStylerIcon name="tablet" />
          </button>
        </li>
        <li>
          <button
            class="styler-button"
            @click="selectDevice('desktop')"
            :class="{ selected: device === 'desktop' }"
            title="Size on pc devices."
          >
            <SStylerIcon name="laptop" />
          </button>
        </li>
        <li>
          <button
            class="styler-button"
            @click="selectDevice('widescreen')"
            :class="{ selected: device === 'widescreen' }"
            title="Size on large display."
          >
            <v-icon dark size="20">tv</v-icon>
          </button>
        </li>
      </template>

      <!-- ―――――――――――――――――― Dark / Light Mode ―――――――――――――――――― -->
      <li v-if="type === 'section' || type === 'button'">
        <button
          class="styler-button"
          @click="toggleDarkMode()"
          title="Dark / Light"
        >
          <v-scroll-y-reverse-transition group leave-absolute>
            <v-icon
              key="1"
              dark
              v-if="dark_mode"
              color="#1BD4F2"
              class="bg-malibu-beach text-gradient"
              size="20"
              >nights_stay</v-icon
            >
            <v-icon
              key="2"
              v-else
              dark
              color="#FFC107"
              class="bg-sunny-morning text-gradient"
              size="20"
              >wb_sunny</v-icon
            >
          </v-scroll-y-reverse-transition>
        </button>
      </li>

      <!-- ―――――――――――――――――― Input ―――――――――――――――――― -->

      <li v-if="type === 'input'">
        <button
          class="styler-button"
          @click="showInputEditor"
          title="Input Setting"
        >
          <v-icon color="#fff" size="20"> input </v-icon>
        </button>
      </li>
    </ul>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――― Normal editing tools (sub list) ――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul
      v-if="!$builder.isAnimation && !$builder.isTracking"
      class="styler-list"
    >
      <!-- ―――――――――――――――――― Row Align / Justify ―――――――――――――――――― -->

      <div v-if="currentOption === 'row-align-justify'">
        <v-btn-toggle
          v-model="row_align"
          class="m-3 d-block"
          rounded
          dark
          borderless
          active-class="success"
        >
          <v-btn
            v-for="it in ALIGN"
            :key="it.val"
            :value="it.val"
            :caption="it.title"
            :title="it.title"
            class="sub-caption -hover"
            icon
          >
            <v-icon class="flip-image-rtl" size="20">{{ it.icon }}</v-icon>
          </v-btn>
        </v-btn-toggle>

        <v-btn-toggle
          v-model="row_justify"
          class="m-3 d-block"
          rounded
          dark
          borderless
          active-class="blue-flat"
        >
          <v-btn
            v-for="it in JUSTIFY"
            :key="it.val"
            :value="it.val"
            :caption="it.title"
            :title="it.title"
            class="sub-caption -hover"
            icon
          >
            <v-icon class="flip-image-rtl" size="20">{{ it.icon }}</v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>

      <!-- =================================================================================================== -->

      <!-- ―――――――――――――――――― Color ―――――――――――――――――― -->

      <li v-if="currentOption === 'colorer'">
        <ul class="colorer">
          <li v-for="color in COLORS_LIGHT" :key="color">
            <input
              :id="`color${color.charAt(0).toUpperCase() + color.slice(1)}`"
              v-model="colorerColor"
              type="radio"
              name="colorer"
              :value="color"
            />
          </li>

          <v-btn
            icon
            class="mb-1 ms-3 bg-tiny-checkers rounded-circle"
            @click="
              showColorDialog(
                custom_color_value,
                setCustomColorerBgSection,
                true
              )
            "
          >
            <v-icon :color="custom_color_value" size="20">adjust</v-icon>
          </v-btn>
        </ul>
      </li>

      <!-- ―――――――――――――――――― Bg styler ―――――――――――――――――― -->

      <li v-if="currentOption === 'bg-styler'" style="--bg-color: #323c47">
        <v-item-group v-model="bgStylerStyle" mandatory dark>
          <v-item
            v-for="item in FrameStyles"
            :key="item.code"
            :value="item.code"
          >
            <v-btn
              slot-scope="{ active, toggle }"
              :color="active ? 'primary' : ''"
              dark
              icon
              @click="toggle"
            >
              <div
                :class="`bg-style-${item.code}`"
                style="
                  background-color: white;
                  width: 20px;
                  height: 20px;
                  z-index: inherit;
                "
              />
            </v-btn>
          </v-item>
        </v-item-group>
      </li>

      <!-- ―――――――――――――――――― Text Color ―――――――――――――――――― -->

      <li v-if="currentOption === 'textColor'">
        <ul class="colorer">
          <li v-for="(color, index) in TEXT_COLORS" :key="color">
            <input
              :value="color"
              type="radio"
              name="colorer"
              @mousedown="
                (event) => {
                  execute('forecolor', TEXT_COLORS[index]);
                  event.preventDefault();
                }
              "
              :style="{ backgroundColor: TEXT_COLORS[index] }"
              :title="`Color ${index + 1}`"
            />
          </li>

          <v-btn
            icon
            class="mb-1 ms-3 bg-tiny-checkers rounded-circle"
            @mousedown="openTextColorEdit"
            title="Open color dialog."
          >
            <v-icon
              :color="text_color_display"
              size="20"
              class="hover-scale-small"
              >circle</v-icon
            >
          </v-btn>
        </ul>
      </li>
      <!-- ―――――――――――――――――― Link ―――――――――――――――――― -->

      <li v-if="currentOption === 'link'">
        <div class="input-group is-rounded has-itemAfter is-primary">
          <v-text-field
            single-line
            solo
            flat
            rounded
            dark
            dense
            v-model="url"
            class="english-field mx-2"
            placeholder="https://..."
            messages="● External: https://domain.. ● Internal: /shop"
            @blur="addLink"
            @keydown.enter="addLink"
            :append-outer-icon="url ? 'link' : 'link_off'"
            @click:append-outer="addLink"
          />
        </div>
      </li>

      <!-- ―――――――――――――――――― Button Shape ―――――――――――――――――― -->
      <li v-if="currentOption === 'btn-shape'">
        <v-btn-toggle
          v-model="btnShapeValue"
          rounded
          multiple
          dense
          active-class="blue-flat"
          dark
          class="mx-1 my-2"
          @change="setButtonShapeValue()"
        >
          <v-btn
            v-for="shape in BtnShapes"
            :key="shape.val"
            :value="shape.val"
            small
            class="dens-btn sub-caption -hover b-16px"
            :caption="shape.title"
          >
            <v-icon size="20">{{ shape.icon }}</v-icon>
          </v-btn>
        </v-btn-toggle>
      </li>

      <!-- ―――――――――――――――――― Button Size ―――――――――――――――――― -->
      <li v-if="currentOption === 'btn-size'">
        <v-btn-toggle
          v-model="btnSizeValue"
          rounded
          mandatory
          dense
          active-class="blue-flat"
          dark
          class="mx-1 my-2"
        >
          <v-btn
            v-for="(size, index) in BtnSizes"
            :key="size.val"
            :value="size.val"
            small
            class="dens-btn sub-caption -hover b-16px"
            @click="setButtonSizeValue(size.val)"
            :caption="size.title"
          >
            <v-icon :size="10 + 4 * index">lens</v-icon>
          </v-btn>
        </v-btn-toggle>
      </li>

      <!-- ―――――――――――――――――― Align ―――――――――――――――――― -->

      <li v-if="currentOption === 'align'">
        <ul class="align">
          <li
            v-for="it in type === 'text' ? TextAlign : ButtonAlign"
            :key="it.val"
          >
            <button
              class="styler-button"
              @mousedown="
                (event) => {
                  if (type === 'text') setTextAlign(it.val);
                  else if (type === 'button') setButtonAlign(it.val);

                  event.preventDefault();
                }
              "
              :title="getName(it.val)"
            >
              <v-icon dark size="20">{{ it.icon }}</v-icon>
            </button>
          </li>
        </ul>
      </li>

      <!-- ―――――――――――――――――― Text Gradient ―――――――――――――――――― -->

      <li v-if="currentOption === 'text-gradient'">
        <ul class="align">
          <li v-for="it in TextGradients" :key="it">
            <v-btn
              @mousedown="
                (event) => {
                  setElementClass('bg-', it, true);
                  event.preventDefault();
                }
              "
              icon
              width="30"
              height="30"
              class="styler-button bordered-dark"
            >
              <v-icon dark class="text-gradient" :class="'bg-' + it"
                >lens</v-icon
              >
            </v-btn>
          </li>
          <v-divider class="mx-2" vertical dark inset></v-divider>

          <li>
            <button
              class="styler-button"
              @mousedown="
                (event) => {
                  toggleElementClass('text-gradient', true);
                  text_gradient_mode = !text_gradient_mode;
                  event.preventDefault();
                }
              "
              :title="text_gradient_mode ? 'Foreground' : 'Background'"
            >
              <v-icon dark size="20">{{
                text_gradient_mode ? "texture" : "format_color_fill"
              }}</v-icon>
            </button>
          </li>
        </ul>
      </li>

      <!-- ―――――――――――――――――― Text Font ―――――――――――――――――― -->

      <li v-if="currentOption === 'text-font'">
        <v-select
          :items="fonts"
          v-model="text_font"
          solo
          rounded
          dark
          clearable
          clear-icon="close"
          append-icon="arrow_drop_down"
          class="mx-2"
          dense
          @change="setFont"
          messages=" "
        >
          <template v-slot:item="{ item }">
            <span :style="{ fontFamily: item }">{{ item }}</span>
          </template>
          <template v-slot:selection="{ item }">
            <span :style="{ fontFamily: item }">{{ item }}</span>
          </template>
          <template v-slot:message>
            <div class="mt-1">
              ● Add font in <b><v-icon small>format_paint</v-icon> Style</b>.
            </div>
          </template>
        </v-select>
      </li>

      <!-- ―――――――――――――――――― Text Style ―――――――――――――――――― -->

      <li v-if="currentOption === 'textStyle'">
        <ul class="align">
          <li>
            <button
              class="styler-button"
              @mousedown="
                (event) => {
                  execute('bold');
                  event.preventDefault();
                }
              "
            >
              <SStylerIcon name="bold" />
            </button>
          </li>
          <li>
            <button
              class="styler-button"
              @mousedown="
                (event) => {
                  execute('italic');
                  event.preventDefault();
                }
              "
            >
              <SStylerIcon name="italic" />
            </button>
          </li>
          <li>
            <button
              class="styler-button"
              @mousedown="
                (event) => {
                  execute('underline');
                  event.preventDefault();
                }
              "
            >
              <SStylerIcon name="underline" />
            </button>
          </li>

          <li>
            <button
              class="styler-button"
              title="Uppercase"
              @mousedown="
                (event) => {
                  toggleCase();
                  event.preventDefault();
                }
              "
            >
              <v-icon dark size="20">{{
                uppercase ? "title" : "format_size"
              }}</v-icon>
            </button>
          </li>
        </ul>
      </li>

      <!-- ―――――――――――――――――― Grid ―――――――――――――――――― -->

      <li v-if="currentOption === 'columnWidth'">
        <v-btn-toggle
          v-model="gridValue"
          rounded
          mandatory
          dense
          active-class="blue-flat"
          dark
          class="mx-1 my-2"
        >
          <v-btn :value="null" small class="dens-btn">
            <v-icon small>close</v-icon>
          </v-btn>
          <v-btn
            v-for="col in 12"
            :key="col"
            :value="col"
            small
            class="dens-btn"
            @click="setGridValue(col)"
          >
            {{ col }}
          </v-btn>
        </v-btn-toggle>
      </li>
    </ul>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――― Animation tools ―――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul v-if="$builder.isAnimation" class="styler-list">
      <!-- ―――――――――――――――――― Delete button / col ―――――――――――――――――― -->
      <!-- Available for: section / grid -->
      <li>
        <button
          class="styler-button"
          @click="showAnimationEdit"
          title="Animation"
        >
          <v-icon dark size="20">movie_filter</v-icon>
        </button>
      </li>
      <span v-html="getAnimationClassesDetail()"></span>
    </ul>

    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――― Tracking tools ―――――――――――――――――――――――― -->
    <!-- ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――― -->

    <ul v-if="$builder.isTracking" class="styler-list">
      <!-- ―――――――――――――――――― Delete button / col ―――――――――――――――――― -->
      <!-- Available for: section / grid -->
      <li v-if="!element_id">
        <button
          class="styler-button fadeIn"
          @click="enableTrackingCode()"
          title="Animation"
        >
          <v-icon dark size="20">gps_fixed</v-icon>
        </button>
      </li>

      <v-text-field
        solo
        dense
        label="ID"
        v-if="element_id"
        v-model="element_id"
        clearable
        @click:clear="setId(null)"
        @blur="setId(element_id)"
        dark
        hide-details
        flat
        clear-icon="location_disabled"
        rounded
        background-color="#111"
        class="zoomInRight"
      ></v-text-field>
    </ul>
  </div>
</template>

<script>
import Popper from "popper.js";
import SStylerIcon from "../components/SStylerIcon";
import { isParentTo } from "../util";
import * as types from "@app-page-builder/src/types";
import { Seeder } from "@app-page-builder/src/seeder";
import ALIGN from "@app-page-builder/src/enums/ALIGN";
import JUSTIFY from "@app-page-builder/src/enums/JUSTIFY";
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import { PageBuilderColorsHelper } from "@app-page-builder/src/helpers/PageBuilderColorsHelper";
import { StylerHelper } from "@app-page-builder/src/helpers/StylerHelper";
import { PageBuilderMixin } from "@app-page-builder/mixins/PageBuilderMixin";

const COLORS = [
  "samin",
  "pink",
  "black",
  "green",

  "blue",
  "white",
  "deep-purple",
  "teal",
  "cyan",
  "amber",
  "blue-grey",

  "transparent",
];

const FrameStyles = {
  Normal: { code: "normal" },
  DiagonalLR60: { code: "diagonal-l-r-60" },
  DiagonalRL60: { code: "diagonal-r-l-60" },
  DiagonalLR80: { code: "diagonal-l-r-80" },
  DiagonalRL80: { code: "diagonal-r-l-80" },

  StripeRL60: { code: "stripe-r-l-60" },
  StripeLR60: { code: "stripe-l-r-60" },
  StripeRL80: { code: "stripe-r-l-80" },
  StripeLR80: { code: "stripe-l-r-80" },

  ArrowUp: { code: "arrow-up" },
};

const TextAlign = [
  { val: "left", icon: "format_align_left" },
  { val: "center", icon: "format_align_center" },
  { val: "right", icon: "format_align_right" },
  { val: "justify", icon: "format_align_justify" },
];
const ButtonAlign = [
  { val: "left", icon: "format_align_left" },
  { val: "center", icon: "format_align_center" },
  { val: "right", icon: "format_align_right" },
];

const TextGradients = [
  "gray",
  "plum",
  "spring-warmth",
  "sunny-morning",
  "dusty-grass",
  "heavy-rain",
  "malibu-beach",
  "star-wine",
  "fly-high",
  "strong-bliss",
  "teen-notebook",
  "polite-rumors",
  "aqua-splash",
  "spiky-naga",
  "desert-hump",
  "over-sun",
  "eternal-constance",
  "vicious-stance",
  "crystal-river",
  "blacker",
  "lily-meadow",
  "red-soft",
  "pink-soft",
  "blue-soft",
  "teal-soft",
  "amber-soft",
  "indigo-soft",
  "deep-purple-soft",
  "green-soft",
  "snow-again",
  "premium-white",
  "le-cocktail",
];

export default {
  name: "Styler",
  mixins: [PageBuilderMixin],

  components: {
    SStylerIcon,
  },
  props: {
    el: {
      // type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    section: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    PageBuilderColorsHelper: PageBuilderColorsHelper,

    COLORS_LIGHT: COLORS,
    COLORS_DARK: COLORS,
    ALIGN: ALIGN,
    JUSTIFY: JUSTIFY,
    FrameStyles: FrameStyles,
    TextAlign: TextAlign,
    ButtonAlign: ButtonAlign,
    TextGradients: TextGradients,

    BtnSizes: [
      { val: "xSmall", title: "X Small" },
      { val: "small", title: "Small" },
      { val: "normal", title: "Normal" },
      { val: "large", title: "Large" },
      { val: "xLarge", title: "X Large" },
    ],
    BtnShapes: [
      //{ val: "dark", title: "Dark",icon:'brightness_2' },
      { val: "depressed", title: "Depressed", icon: "layers_clear" },
      { val: "outlined", title: "Outlined", icon: "done_outline" },
      { val: "text", title: "Text", icon: "text_rotation_none" },
      { val: "fab", title: "Fab", icon: "stop_circle" },
      { val: "tile", title: "Tile", icon: "crop_din" },
      { val: "ripple", title: "Ripple", icon: "leak_add" },
      { val: "rounded", title: "Rounded", icon: "rounded_corner" },
      { val: "glow", title: "Glow", icon: "all_out" },
    ],

    textColor: "",
    text_color_display: null, // Just for display!

    colorerColor: "",
    mouseTarget: "",
    currentOption: "",
    url: "",
    gridValue: 0,

    // ===== Align / Justify =====

    row_align: "center",
    row_justify: "space-around",
    container_fluid: false,
    no_wrap: false,

    isVisible: false,
    other_styler_open: null,

    // ===== Bg styles =====

    old_bgStylerStyle: "",

    bgStylerStyle: "Normal",

    // ---------------------------------
    device: null,

    // ---------------------------------
    btnSizeValue: "normal",
    btnShapeValue: [],
    custom_color_value: null,

    // ---------------------------------
    dark_mode: false,

    // ---------------------------------
    text_gradient_mode: false,
    uppercase: false,

    // ---------------------------------
    element_id: null,

    // ---------------------------------
    // Save range selection:
    selection: null,

    // ---------------------------------
    text_font: null,

    // ---------------------------------
    hasButtonAlign: false, // Must be the button and has attributed : has-align
  }),

  computed: {
    TEXT_COLORS() {
      return [
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 1),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 2),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 3),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 4),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 5),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 6),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 7),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 8),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 9),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 10),
        PageBuilderColorsHelper.GetColorDark(this.$builder.style, 11),

        // #FFFFFF not work! bug in execute foreground!
        "transparent",
      ];
    },

    fonts() {
      return this.$builder.style && this.$builder.style.fonts;
    },
    upload_bg_url() {
      return this.getPageBuilderUploadUrlImage();
    },

    server_credential() {
      return {
        url: this.upload_bg_url,
        process: {
          method: "POST",
          withCredentials: true,
        },
      };
    },
    //-----------------------------------

    has_tools() {
      return (
        (!this.$builder.isAnimation ||
          this.type === "section" ||
          this.type === "grid") &&
        (!this.$builder.isTracking || this.type === "button")
      );
    },
  },
  watch: {
    colorerColor() {
      this.changeColor();
    },

    row_align() {
      if (this.type === "row") {
        this.section.set(
          this.name + ".row" /*Always pass object (in XRow )*/,
          (row) => {
            row["align"] = this.row_align;
          }
        );
      } else if (this.type === "buttons-row") {
        this.section.set(
          this.name /*Always pass object.btn_row (XButtons)*/,
          (row) => {
            row["align"] = this.row_align;
          }
        );
      }
    },

    row_justify() {
      if (this.type === "row") {
        this.section.set(
          this.name + ".row" /*Always pass object (in XRow)*/,
          (row) => {
            row["justify"] = this.row_justify;
          }
        );
      } else if (this.type === "buttons-row") {
        this.section.set(
          this.name /*Always pass object.btn_row (in XButtons)*/,
          (row) => {
            row["justify"] = this.row_justify;
          }
        );
      }
    },
    container_fluid() {
      this.section.set(
        this.type === "row"
          ? this.name + ".row" /*Always pass object (in XRow)*/
          : this.type === "container"
          ? this.name /*in XContainer we set fluid in the container object.*/
          : null,
        (row) => {
          row["fluid"] = this.container_fluid;
        }
      );
      // Fix remove .is-editable at change element classes
      this.isEditableFix();
    },
    no_wrap() {
      this.section.set(this.name + ".row" /*We pass object*/, (row) => {
        row.no_wrap = this.no_wrap;
        if (this.no_wrap) {
          row.justify = "start";
        }
      });
      // Fix remove .is-editable at change element classes
      this.isEditableFix();
    },

    bgStylerStyle() {
      this.changeBgStyle();
    },
  },
  created() {
    if (this.type === "button") {
      this.url = this.section.get(`${this.name}.href`);
      this.el.contentEditable = "true";
      this.btnShapeValue = Object.assign({}, this.section.get(this.name));

      this.custom_color_value = this.section.get(`${this.name}.color`);
      this.dark_mode = this.section.get(`${this.name}.dark`);
    }
    if (this.type === "text") {
      this.el.contentEditable = "true";

      // console.log('this.el.firstChild',this.el.firstChild)
      if (
        this.el.childElementCount === 1 &&
        this.el.firstChild.nodeName === "DIV"
      ) {
        this.text_gradient_mode =
          this.el.firstChild.classList.contains("text-gradient");

        this.uppercase =
          this.el.firstChild.classList.contains("text-uppercase");
      }
    }
    if (this.type === "row") {
      let row = this.section.get(`${this.name}.row`);

      if (!row) {
        row = { align: "center", justify: "space-around" };
        this.section.set(`${this.name}.row`, row);
      }

      this.row_align = row.align;
      this.row_justify = row.justify;
      this.container_fluid = row.fluid;

      this.no_wrap = row.no_wrap;
    }
    if (this.type === "buttons-row") {
      // In Buttons, we have object.btn_row
      let row = this.section.get(`${this.name}`);

      if (!row) {
        row = { align: "center", justify: "space-around" };
        this.section.set(`${this.name}`, row);
      }

      this.row_align = row.align;
      this.row_justify = row.justify;
    }

    if (this.type === "container") {
      //console.log('created > this.name',this.name,this.section)
      let container = this.section.get(`${this.name}`);
      if (!container) {
        container = Seeder.seed(types.Container);
        this.section.set(`${this.name}`, container);
      }
      this.container_fluid = container.fluid;
    }

    if (this.type === "section") {
      this.dark_mode = this.section.get(`$sectionData.background.dark`);
      this.custom_color_value = this.section.get(
        `$sectionData.background.bg_color`
      );
    }

    // Get element ID:
    this.element_id = this.el.id;

    if (!this.$vuetify.theme) this.$vuetify.theme = {};
    if (!this.$vuetify.icons) this.$vuetify.icons = {};
    if (!this.$vuetify.lang) {
      this.$vuetify.lang = {
        t: (v) => {
          return "";
        },
      };
    }
  },
  mounted() {
    if (!this.$builder.isEditing) return;

    // this.el.removeEventListener("click");

    // add listeners to show/hide styler
    this.el.addEventListener("click", this.showStyler);

    // Add blur listener: html -> text in past! (only for text fields)
    if (this.type === "text") {
      this.el.addEventListener("paste", this.stripHtmlToText, true);
    }

    if (this.type === "button") {
      this.hasButtonAlign = this.el.hasAttribute("has-align");
    }

    // Set font:
    if (this.type === "text" || this.type === "button") {
      if (
        this.el.childElementCount === 1 &&
        this.el.firstChild.nodeName === "DIV"
      ) {
        this.text_font = this.el.firstChild.style.fontFamily;
      }
    }

    // Fix editable button:
    if (this.type === "button") {
    }

    //█████████████████████████████████████████████████████████████
    //――――――――――――――― Event Bus ――――――――――――――――
    //█████████████████████████████████████████████████████████████
    this.EventBus.$on(
      EventBusTriggers.PAGE_BUILDER_STYLER_OPEN,
      ({ type, show }) => {
        if (show) {
          this.other_styler_open = type; //TODO: We can limit showing stylers here!
        }
      }
    );
  },
  beforeDestroy() {
    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_STYLER_OPEN);

    // console.log("...beforeDestroy...",this.$builder.isEditing,this.$refs.styler,this.el);

    this.hideStyler();
    try {
      if (this.$builder.isEditing) this.$refs.styler.remove();
    } catch (e) {
      console.error(e);
    }

    this.el.classList.remove("is-editable");
    this.el.removeEventListener("click", this.showStyler);
    document.removeEventListener("click", this.hideStyler, true);

    // Remove blur listener: html -> text in past! (only for text fields)
    if (this.type === "text") {
      this.el.removeEventListener("paste", this.stripHtmlToText, true);
    }
  },
  methods: {
    parentIs(clazz) {
      //  console.log('parentIs',clazz,this.el.parentElement.classList.contains(clazz),this.el.parentElement)

      return (
        this.el.parentElement && this.el.parentElement.classList.contains(clazz)
      );
    },
    blockFluid() {
      // console.log('blockFluid',this.el.getAttribute("no-fluid"),this.el)
      // Add :  :container-styler="true" If you want to prevent show fluid button on roe!
      // console.log('container-styler',this.el.parentElement.getAttribute('container-styler'))
      return (
        (this.el.parentElement &&
          this.el.parentElement.getAttribute("container-styler")) ||
        this.el.getAttribute("no-fluid")
      );
    },
    hasAttribute(attribute) {
      return (
        this.el.hasAttribute(attribute) &&
        this.el.getAttribute(attribute) !== "false"
      );
    },
    //------------------------------------------------------------------

    setButtonShapeValue(val) {
      //console.log('setButtonShapeValue',this.btnShapeValue)
      const btn_value = this.section.get(this.name);
      // console.log('btn_value 1',btn_value)

      this.BtnShapes.forEach(({ val }) => {
        btn_value[val] = this.btnShapeValue.includes(val);
      });

      // console.log('btn_value 2',btn_value)

      this.section.set(this.name, btn_value);
    },

    setButtonSizeValue(val) {
      const btn_value = this.section.get(this.name);
      btn_value.xSmall = false;
      btn_value.small = false;
      btn_value.large = false;
      btn_value.xLarge = false;

      if (val !== "normal") btn_value[val] = true;

      this.section.set(this.name, btn_value);
    },

    //------------------------------------------------------------------

    removeItem() {
      const parent_path = this.name.substring(0, this.name.lastIndexOf("["));
      let child_path = this.name;

      if (this.type === "button") {
        // $sectionData.button[0]
      } else if (this.type === "grid") {
        // $sectionData.columns[6].grid
        child_path = this.name.substring(0, this.name.lastIndexOf("."));
      }

      //  console.log("removeItem", parent_path, child_path);

      const arr = Object.assign([], this.section.get(parent_path));
      const item = this.section.get(child_path);

      this.remove(arr, item);
      this.section.set(parent_path, arr);
    },

    //------------------------------------------------------------------

    setGridValue(val) {
      val = Math.min(Math.max(val, 0), 12);
      this.section.set(this.name, (grid) => {
        grid[this.device] = val;
      });
      // Fix remove .is-editable at change element classes
      this.isEditableFix();
    },

    isEditableFix() {
      /* this.$nextTick(() => {

        this.el.classList.add("is-editable");

       // console.log('this.el.classList',this.el.classList)
      });*/
    },

    //================================= Product Filter ===================================

    showQueryBuilderProducts() {
      this.ShowGlobalProductsCategoriesSelectDialog(
        this.el,
        this.section,
        this.name
      );
    },

    showSelectProduct() {
      this.ShowGlobalProductSelectDialog(this.el, this.section, this.name);
    },

    showCustomProductFrame() {
      this.ShowGlobalProductsFrameDialog(this.el, this.section, this.name);
    },
    //================================= Slide Show ===================================

    showEditSlides() {
      this.ShowGlobalSlideShowEditorDialog(this.el, this.section, this.name);
    },

    //================================= Blogs Filter ===================================

    showQueryBuilderBlogs() {
      this.ShowGlobalBlogsFilterDialog(this.el, this.section, this.name);
    },

    //================================= Text Loop ===================================

    showQueryBuilderTextLoop() {
      this.ShowGlobalTextLoopDialog(this.el, this.section, this.name);
    },

    //=====================================================================================
    showStyleDialog() {
      if (this.type === "section") {
        this.ShowGlobalBackgroundEditorDialog(
          this.el,
          this.section,
          `$sectionData.background`
        );
      } else if (this.type === "grid" /* this.name.includes('[')*/) {
        const column_path = this.name.substring(0, this.name.lastIndexOf("."));

        this.ShowGlobalBackgroundEditorDialog(
          this.el,
          this.section,
          `${column_path}.background`
        );
      } /* if (this.type === "container")*/ else {
        const path = this.name;

        this.ShowGlobalBackgroundEditorDialog(
          this.el,
          this.section,
          `${path}.background`
        );
      }
    },
    //=====================================================================================
    showColorDialog(color, callback, alpha) {
      this.showGlobalColorSelectorDialog(this.el, color, callback, alpha);
    },
    //=====================================================================================

    updateOption(option) {
      if (option === "textColor") {
        // Update current color:
        this.text_color_display = this.getSelectedTextColor();
      }

      // Save range selection:
      this.saveRangeSelected();

      //console.log("updateOption", option);
      this.currentOption = option;
      this.$nextTick(() => {
        this.checkProper();
        this.popper.update();
      });
    },
    saveRangeSelected() {
      this.selection = null;
      if (window.getSelection) {
        const sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          this.selection = sel.getRangeAt(0).cloneRange();
          //console.log('this.selection --> Save',sel);
        }
      } else if (document.selection && document.selection.createRange) {
        this.selection = document.selection.createRange();
      }
      // console.log('Save selection', this.selection)
    },

    addLink(e) {
      if (this.type === "button") {
        this.section.set(`${this.name}.href`, this.url);
      } else if (this.type === "text") {
        this.restoreSelection();

        if (this.url) this.execute("createLink", this.url);
        else this.execute("unlink");
      }

      this.currentOption = null;
      e.preventDefault();
    },

    restoreSelection() {
      // console.log('Load selection', this.selection)
      //console.log('this.selection --> Restore',this.selection);

      const range = this.selection.cloneRange();
      if (range && !range.collapsed) {
        if (window.getSelection) {
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        } else if (document.selection && range.select) {
          range.select();
        }
      }
    },

    //------------------------------------------------------------------
    changeColor() {
      // console.log("changeColor", this.colorerColor);

      this.removeClass(`is-`);
      this.addClass(`is-${this.colorerColor}`);

      // Remove custom color property:
      if (this.type === "button") {
        this.section.set(this.name, (btn) => {
          btn["color"] = null;
        });
      } else if (this.type === "section") {
        // console.log('${this.name}.background',this.name, this.section.get(`${this.name}.background`));

        this.section.set(`$sectionData.background`, (background) => {
          background.bg_color = null;
        });
        // this.el.style.backgroundColor=null; // Live update!
      }
    },

    setCustomColorerBgSection(color) {
      //   console.log("Set custom color:", color);
      this.custom_color_value = color;
      this.removeClass(`is-`); // Remove all color class!

      if (this.type === "button") {
        this.section.set(this.name, (btn) => {
          btn["color"] = color;
          btn["glow"] = false;
        });
      } else if (this.type === "section") {
        this.section.set(`$sectionData.background`, (background) => {
          background.bg_color = color;
        });
        //  this.el.style.backgroundColor=color; // Live update!
      }
    },

    //------------------------------------------------------------------

    toggleDarkMode() {
      this.dark_mode = !this.dark_mode;
      if (this.type === "button") {
        this.section.set(this.name, (btn) => {
          btn.dark = this.dark_mode;
        });
      }
      if (this.type === "section") {
        this.section.set(`$sectionData.background`, (background) => {
          background.dark = this.dark_mode;
        });
      }
    },

    //------------------------------------------------------------------

    changeBgStyle() {
      this.removeClass(`bg-style-`);
      this.old_bgStylerStyle = this.bgStylerStyle;
      this.addClass(`bg-style-${this.bgStylerStyle}`);
    },

    addClass(className) {
      //console.log("addClass", className);
      this.section.set(this.name, (value) => {
        if (value && value.classes && Array.isArray(value.classes)) {
          value = value.classes;
        }
        value.push(className);
      });
    },
    selectDevice(device) {
      const section_value = this.section.get(this.name);
      if (!section_value)
        this.section.set(this.name, { mobile: 12, tablet: 6, desktop: 4 });

      const gridValue = section_value ? section_value[device] : null;
      this.updateOption("columnWidth");
      this.device = device;
      this.gridValue = gridValue;
    },
    removeClass(className) {
      //console.log("removeClass", className);
      if (Array.isArray(className)) {
        return className.forEach((c) => {
          this.removeClass(c);
        });
      }

      this.section.set(this.name, (value) => {
        if (value && value.classes && Array.isArray(value.classes)) {
          value = value.classes;
        }

        let splices = [];
        let i = 0;
        value.forEach((item) => {
          // console.log("item ",item)

          try {
            if (item.startsWith(className)) {
              splices.push(i);

              // console.log("find = "+item)
            }
          } catch (e) {
            console.error(e);
          }
          i++;
        });
        splices.reverse().forEach((idx) => {
          value.splice(idx, 1);
        });

        /*  const idx = value.indexOf(className);
        console.log("idx = "+idx)
          if(idx<0)return;
        value.splice(idx, 1);*/
      });
    },
    removeSection() {
      this.$builder.remove(this.section);
    },

    // ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Root inner element > Set class ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

    /**
     * Apply class to inner html!
     * @param prefix_class_name
     * @param class_name
     */
    setElementClass(
      prefix_class_name,
      class_name,
      remove_from_all_children = false
    ) {
      // console.log("setElementClass",  this.el);

      this.el.focus();

      // Remove All classes started with 'prefix_class_name' :
      // Why? by enter add <div class='...'> to separating the text!
      if (remove_from_all_children) {
        $(this.el)
          .find("*")
          .removeClass(function (index, css) {
            return (
              css.match(new RegExp("\\S*" + prefix_class_name + "\\S*", "g")) ||
              []
            ).join(" "); // removes anything that starts with "page-"
          });
      } else {
        $(this.el)
          .children()
          .removeClass(function (index, css) {
            return (
              css.match(new RegExp("\\S*" + prefix_class_name + "\\S*", "g")) ||
              []
            ).join(" "); // removes anything that starts with "page-"
          });
      }

      if (
        this.el.childElementCount === 1 &&
        this.el.firstChild.nodeName === "DIV"
      ) {
      } else {
        // Need wrap by tag
        $(this.el).wrapInner("<div></div>");
      }

      const child = this.el.firstChild;

      child.classList.add(prefix_class_name + class_name);
    },

    // ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Root inner element > Toggle class ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

    toggleElementClass(class_name, remove_from_all_children = false) {
      this.el.focus();

      // console.log("toggleElementClass",  this.el);

      if (
        this.el.childElementCount === 1 &&
        this.el.firstChild.nodeName === "DIV"
      ) {
        //nodeType=3 is pure text!  (Wrap by element!)
      } else {
        // Need wrap by tag
        $(this.el).wrapInner("<div></div>");
      }

      const child = this.el.firstChild;

      const add = !child.classList.contains(class_name);

      // Remove All classes 'class_name' except first child (root) :
      // Why? by enter add <div class='...'> to separating the text!
      if (remove_from_all_children) {
        $(this.el)
          .find("*")
          .removeClass(function (index, css) {
            return (
              css.match(new RegExp("\\S*" + class_name + "\\S*", "g")) || []
            ).join(" "); // removes anything that starts with "page-"
          });
      } else {
        $(this.el)
          .children()
          .removeClass(function (index, css) {
            return (
              css.match(new RegExp("\\S*" + class_name + "\\S*", "g")) || []
            ).join(" "); // removes anything that starts with "page-"
          });
      }

      if (add) {
        child.classList.add(class_name);
      } else {
        child.classList.remove(class_name);
      }
    },

    // ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Focus Element ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

    /* getFocusElement(){ not work!
      return   this.selection.focusNode;
    },*/

    // ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Upper /Normal case ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

    toggleCase() {
      this.uppercase = !this.uppercase;
      this.toggleElementClass("text-uppercase", true);
    },
    // ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Font ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

    /*
    Set root element font! not selected!
     */
    setFont(font) {
      // console.log("📐 Set font", font, this.el);
      this.restoreSelection();
      this.setTextRootElementStyle("font-family", font, true);
    },
    setTextRootElementStyle(property, value, remove_from_all_children = false) {
      if (
        this.el.childElementCount === 1 &&
        this.el.firstChild.nodeName === "DIV"
      ) {
      } else {
        // Need wrap by tag
        $(this.el).wrapInner("<div></div>");
      }

      if (remove_from_all_children) {
        $(this.el)
          .find("*")
          .each(function () {
            $(this).css(property, "");
          });
      } else {
        $(this.el)
          .children()
          .each(function () {
            $(this).css(property, "");
          });
      }

      const child = this.el.firstChild;
      child.style[property] = value;
      // Force set value on content! (not trigger styler hide!)
      if (this.type === "button") {
        this.section.set(this.name + ".content", this.el.innerHTML);
      } else if (this.type === "text") {
        this.section.set(this.name, this.el.innerHTML);
      }
    },

    // ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Text Align ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

    setTextAlign(val) {
      this.setElementClass("text-align-", val, true);
    },
    // ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Button Align ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂
    /**
     * Apply to parent div! align button.
     * @param val
     */
    setButtonAlign(val) {
      this.section.set(this.name + ".align", val);
      // Need live update:
      this.el.parentElement.style.textAlign = val;
    },

    // ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Old execute commands ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

    execute(command, value = null) {
      this.el.focus();
      //console.log("execute: ", this.el.focus(), command);
      //  console.log('this.el: '+this.el)
      document.execCommand(command, false, value);
    },
    showStyler(event) {
      // event.stopPropagation();
      if (this.isVisible) return;
      this.isVisible = true;

      // exute popper element
      this.checkProper();
      document.addEventListener("click", this.hideStyler, true);

      this.currentOption = "";

      this.onPageBuilderStyleOpen(this.type, true); //Signal to other stylers about showing this styler!
    },
    checkProper() {
      if (!this.popper) {
        const position =
          this.$props.type === "section"
            ? "left-start"
            : this.$props.type === "row" && this.hasAttribute("has-add")
            ? "left-center" // Prevent over lapping rows
            : this.$props.type === "buttons-row"
            ? "left-center"
            : this.$props.type === "row"
            ? "right-end"
            : this.$props.type === "container"
            ? "right-center"
            : this.$props.type === "grid" || this.$props.type === "row-grid"
            ? "bottom"
            : "top";

        this.popper = new Popper(this.el, this.$refs.styler, {
          placement: position,
        });

        //console.log('checkProper',this.$props.type,position,this.popper)
      }
    },

    //------------------------------------------------------------------
    /**
     * Safe past (remove all html tags)
     * @param event
     */
    stripHtmlToText(event) {
      // Prevent past section data:
      try {
        function IsValidJsonSectionString(str) {
          try {
            let json = JSON.parse(str);
            return json.name && json.data && Object.keys(json.data).length > 0;
          } catch (e) {}
          return false;
        }
        let paste = (event.clipboardData || window.clipboardData).getData(
          "text"
        );
        if (IsValidJsonSectionString(paste)) return;
      } catch (e) {}
      // console.log("types", event.clipboardData.types);

      event.preventDefault();

      const cb = event.clipboardData;
      let pastedContent = "";
      if (cb.types.indexOf("text/plain") !== -1) {
        // contains html
        pastedContent = cb.getData("text/plain");
      } else if (cb.types.indexOf("text/html") !== -1) {
        // contains text
        pastedContent = $(cb.getData("text/html")).text();
      } else {
        return;
        //pastedContent = cb.getData(cb.types[0]); // get whatever it has
      }
      // console.log("Past", event, pastedContent);
      //    let doc = new DOMParser().parseFromString(pastedContent, "text/html");
      //  const pure = doc.body.textContent.trim() || "";

      let pure = pastedContent.replace(/(\r\n|\n|\r)/gm, "");
      // console.log("Past", 'pure', pure);

      //  console.log('pure',pure)
      this.el.insertAtCaret(pure);
    },
    //------------------------------------------------------------------

    hideStyler(event) {
      if (
        (event && isParentTo(event.target, this.$el)) ||
        (event && isParentTo(event.target, this.el))
      ) {
        return;
      }
      this.isVisible = false;
      if (this.popper) {
        this.popper.destroy();
        this.popper = null;
      }
      document.removeEventListener("click", this.hideStyler, true);

      // Important: Prevent inject invalid html code as parameter! (like for blog, product, ...)
      if (
        this.type === "section" ||
        this.type === "grid" ||
        this.type === "row" ||
        this.type === "container" ||
        this.type === "product" ||
        this.type === "products" ||
        this.type === "blogs" ||
        this.type === "row-grid" ||
        this.type === "input" ||
        this.type === "slide" ||
        this.type === "buttons-row" ||
        this.type === "text-loop"
      ) {
        return;
      }
      if (this.type === "button") {
        this.section.set(`${this.name}.content`, this.el.innerHTML);
        return;
      }

      this.section.set(this.name, this.el.innerHTML);

      this.onPageBuilderStyleOpen(this.type, false); //Signal to other stylers about hiding this styler!
    },
    //----------------------------------------------------------------------------

    showMasterDesignDialog() {
      //  console.log('showMasterDesignDialog',this.name)
      if (this.type === "section") {
        this.ShowGlobalStyleEditorDialog(
          this.el,
          this.el,
          this.section,
          `$sectionData.style`,
          `$sectionData.classes`
        );
      } else if (this.type === "grid" /*this.name.includes('[')*/) {
        // Class and style is in the same level of grid!!! not it's child!
        const column_path = this.name.substring(0, this.name.lastIndexOf("."));

        this.ShowGlobalStyleEditorDialog(
          this.el,
          this.el,
          this.section,
          `${column_path}.style`,
          `${column_path}.classes`
        );
      } /* if (this.type === "container")*/ else {
        const path = this.name;

        this.ShowGlobalStyleEditorDialog(
          this.el,
          this.el,
          this.section,
          `${path}.style`,
          `${path}.classes`

          //   { noSize:this.type === "container" } // Not show size ! conflict with container size!
        );
      }
    },
    //----------------------------------------------------------------------------

    showAnimationEdit() {
      if (this.type === "section") {
        this.ShowGlobalAnimationEditorDialog(
          this.el,
          this.el,
          this.section,
          `$sectionData.style`,
          `$sectionData.classes`
        );
      } else if (this.type === "grid") {
        const column_path = this.name.substring(0, this.name.lastIndexOf("."));

        this.ShowGlobalAnimationEditorDialog(
          this.el,
          this.el,
          this.section,
          `${column_path}.style`,
          `${column_path}.classes`
        );
      }
    },
    getAnimationClassesDetail() {
      let classes = null;
      let style = null;
      if (this.type === "section") {
        classes = this.section.get(`$sectionData.classes`);
        style = this.section.get(`$sectionData.style`);
      } else if (this.type === "grid") {
        const column_path = this.name.substring(0, this.name.lastIndexOf("."));
        classes = this.section.get(`${column_path}.classes`);
        style = this.section.get(`${column_path}.style`);
      }
      return StylerHelper.GetAnimationClassesDetail(classes, style);
    },
    //----------------------------------------------------------------------------

    showInputEditor() {
      this.ShowGlobalInputEditorDialog(this.el, this.section, this.name);
    },
    //----------------------------------------------------------------------------
    openTextColorEdit(event) {
      // Save range selection:

      this.showColorDialog(
        this.getSelectedTextColor(),
        (val) => {
          this.$nextTick(() => {
            //  this.restoreSelection();

            this.execute("forecolor", val);

            this.text_color_display = val;
            this.execute("forecolor", val);
          });
        },
        false
      );

      event.preventDefault();
    },

    getSelectedText() {
      let selectedText = "";
      if (window.getSelection) {
        selectedText = window.getSelection().toString();
      } else if (document.selection && document.selection.type !== "Control") {
        selectedText = document.selection.createRange().text;
      }
      return selectedText;
    },
    getSelectedTextColor() {
      const selectedText = this.getSelectedText();
      //console.log("Selected text:", selectedText);

      if (selectedText === "") {
        //console.log("No text selected");
        return;
      }
      const range = window.getSelection().getRangeAt(0);
      //console.log("Selected range:", range);

      const parentElement = range.commonAncestorContainer.parentElement;
      const textColor = window.getComputedStyle(parentElement).color;

      // Convert RGB color to hexadecimal format
      const rgb = textColor.match(/\d+/g);
      const hexColor = `#${Number(rgb[0])
        .toString(16)
        .padStart(2, "0")}${Number(rgb[1])
        .toString(16)
        .padStart(2, "0")}${Number(rgb[2]).toString(16).padStart(2, "0")}`;

      //console.log("Text color (hexadecimal):", hexColor);
      return hexColor;
    },

    //----------------------------------------------------------------------------
    enableTrackingCode() {
      this.element_id = "tracking-" + Math.random().toString(36).substring(7);
      this.setId(this.element_id);
    },
    setId(id) {
      if (id && $(`#${id}`).length) {
        console.log("Duplicate ID!");
        return;
      }

      this.el.id = id ? id : "";
      this.section.set(`${this.name}.id`, id);
    },

    mouseenter(e) {
      if (!this.el.classList.contains("highlight-blueprint")) {
        this.el.classList.add("highlight-blueprint");
      }
    },
    mouseleave(e) {
      // Reset
      this.el.classList.remove("highlight-blueprint");
    },

    toggleNoWrap() {
      this.no_wrap = !this.no_wrap;
    },

    //------------------------------------------------------------------

    /**
     * SectionSlideShow | Edit slides
     */
    showCustomLayout() {
      this.ShowGlobalXColumnLayoutEditorDialog(
        this.el,
        this.section,
        this.name
      );
    },

    /**
     * XButtons | Add button
     */
    addNewButton() {
      // we have (object.btn_row) here and need (object.buttons)
      const buttons_path =
        this.name.substring(0, this.name.lastIndexOf(".")) + ".buttons";

      let buttons = this.section.get(buttons_path);
      buttons.push(Seeder.seed(types.Button));
    },

    /**
     * XRow | Add new column
     */
    addNewColumn() {
      //console.log('Name:',this.name,'Object',this.section.get(this.name+ ".columns"))

      // we have (object) here and need (object.columns)
      const columns_path = this.name + ".columns";

      let columns = this.section.get(columns_path);
      columns.push(Seeder.seed(this.section.__initialNewColumn));
    },
  },
};
</script>

<style lang="stylus">
//@import '~@baianat/base.framework/src/stylus/util/colors'
@import "../stylus/colors.styl"

$dark=#323c47;
$white=#fff;
.styler
  position: absolute
  top: 0
  z-index: 200
  visibility: hidden
  opacity: 0
  margin: 10px 0
  padding: 5px
  background: $dark
  border-radius: 26px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  &-list
    display: flex
    justify-content: center
    align-items: center
    list-style: none
    margin: 0
    padding: 0 !important
    color:#fff

  &-input
    background: $white
    color: $dark
    border: 0
    outline: 0
    width: 40px
    height: 40px
    border-radius: 42px
    margin: 0 5px 0 0
    text-align: center
    -webkit-appearance: none
    -moz-appearance: textfield
    appearance: none
  &-button
    display: flex
    justify-content: center
    align-items: center
    outline: 0
    background: $dark
    border: 0
    fill: $white
    color: $white
    width: 42px
    height: 42px
    border-radius: 42px
    margin: 0 5px 0 0
    &:hover
      background: darken($dark, 20%)
    &:first-child
      margin-left: 5px
    &.selected
      background: darken($dark, 40%)
  &-selector
    margin: 0 5px
  &.is-visible
    visibility: visible
    opacity: 1
  .input-group
    margin: 5px

.align
  @extend .styler-list
  height: 42px


.colorer
  @extend .styler-list
  height: 42px
  li >input
    -webkit-appearance: none
    -moz-appearance: textfield
    appearance: none
    width: 30px
    height: 30px
    border-radius: 40px
    border: 4px solid darken($dark, 20%)
    margin: 0 5px
    outline: none
    &:checked
      border-color: lighten($dark, 20%)
    &:hover
      border-color: lighten($dark, 20%)
    &#colorRed
      background $red

    &#colorSamin
      background var(--plate-light-1)
    &#colorPink
      background var(--plate-light-2)
    &#colorBlack
      background var(--plate-light-3)

    &#colorGreen
      background var(--plate-light-4)
    &#colorBlue
      background var(--plate-light-5)

    &#colorWhite
      background var(--plate-light-6)

    &#colorDeep-purple
      background var(--plate-light-7)

    &#colorTeal
      background var(--plate-light-8)
    &#colorCyan
       background var(--plate-light-9)
    &#colorAmber
       background var(--plate-light-10)

    &#colorBlue-grey
       background var(--plate-light-11)



    &#colorTransparent
      background linear-gradient(45 deg, white 50%, #444 50%);






.is-hidden
  display: none

input[type=number]::-webkit-inner-spin-button
input[type=number]::-webkit-outer-spin-button
  -webkit-appearance: none
  margin: 0
</style>

<style lang="scss">
.styler {
  &:hover {
    // Fix some over lapping of stylers!
    z-index: 250;
  }

  @media only screen and (max-width: 600px) {
    overflow: auto;
    max-width: 96%;
    // transform: unset !important;
    //top: unset !important;
    // left: 2% !important;
    // bottom: 0 !important;
    // border-radius: 8px !important;
    // border: solid #1a2128 medium;
    // padding: 4px 12px;

    ul {
      max-width: 100%;
      li {
        max-width: 100%;
        > div {
          max-width: 100%;
          overflow: auto;
        }
      }
    }
  }

  //------------------ Start Styler dot color ------------------
  &.-dot {
    &:after {
      position: absolute;
      top: 9px;
      left: 9px;
      content: " ";
      width: 6px;
      height: 6px;

      border-radius: 8px;
      background-color: #fff;
    }

    &.-red {
      &:after {
        background-color: #e64a19;
      }
    }
    &.-green {
      &:after {
        background-color: #8bc34a;
      }
    }
    &.-blue {
      &:after {
        background-color: #03a9f4;
      }
    }
    &.-amber {
      &:after {
        background-color: #ffa000;
      }
    }
  }
  //------------------ End Styler dot color ------------------
}
//------------------ Slop polygon ------------------
.bg-style-normal {
}
@media only screen and (min-width: 900px) {
  .bg-style-diagonal-l-r-80 {
    //z-index: -1;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 80%);
    padding-bottom: 20% !important;
  }

  .bg-style-diagonal-r-l-80 {
    //z-index: -1;
    clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
    padding-bottom: 20% !important;
  }

  .bg-style-diagonal-l-r-60 {
    // z-index: -1;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 60%);
    padding-bottom: 40% !important;
  }
  .bg-style-diagonal-r-l-60 {
    // z-index: -1;
    clip-path: polygon(0 0, 100% 0, 100% 60%, 0 100%);
    padding-bottom: 40% !important;
  }

  .bg-style-stripe-r-l-60 {
    //z-index: -1;
    clip-path: polygon(0 40%, 100% 0, 100% 60%, 0 100%);
    padding-top: 40% !important;
    padding-bottom: 40% !important;
  }

  .bg-style-stripe-l-r-60 {
    // z-index: -1;
    clip-path: polygon(0 0%, 100% 40%, 100% 100%, 0 60%);
    padding-top: 40% !important;
    padding-bottom: 40% !important;
  }
  .bg-style-stripe-r-l-80 {
    //  z-index: -1;
    clip-path: polygon(0 20%, 100% 0, 100% 80%, 0 100%);
    padding-top: 20% !important;
    padding-bottom: 20% !important;
  }

  .bg-style-stripe-l-r-80 {
    //  z-index: -1;
    clip-path: polygon(0 0%, 100% 20%, 100% 100%, 0 80%);
    padding-top: 20% !important;
    padding-bottom: 20% !important;
  }

  .bg-style-arrow-up {
    &:before {
      content: "";
      width: 100%;
      height: 200px;
      max-height: 50%;
      position: absolute;
      bottom: -0.5px; // Fix some issue in showing line!
      left: 0;
      background-color: var(--bg-color);
      clip-path: polygon(71.5% 0, 0% 100%, 100% 100%);
    }
  }
}
//-------------------------------------------------------

//------------------ Responsive ------------------

.page-builder {
}
//-------------------------------------------------------

.is-editable:not(section):not(.button):not(.artboard):not(.v-btn) {
  min-width: 84px;
  background-color: rgba(221, 221, 221, 0.06);
  border: dashed 1px #ddd;
  border-radius: 2px;
}
// Start fix border width in scale down mode
.in-scale-down {
  .is-editable:not(section):not(.button):not(.artboard):not(.v-btn) {
    border-width: 1.5px;
  }
}

.dens-btn {
  min-width: 20px !important;
  border-radius: 50% !important;
  width: 26px;
  height: 26px !important;
  margin: 4px;
}

.class-prev-con {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;

  .class-prev {
    background: rgba(38, 38, 38, 0.87);
    flex-grow: 1;
    &.white--text {
      background: rgba(38, 38, 38, 0.87);
    }
    &.black--text {
      background: rgba(255, 255, 255, 0.87);
    }
  }
}
.bg-tools {
  background: #2f3133;
}

.bordered-dark {
  border: 4px solid #283039;
  &:hover {
    border: 4px solid #36414d;
  }
}
</style>