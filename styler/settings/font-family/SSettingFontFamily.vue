<!--
  - Copyright (c) 2024. Selldone® Business OS™
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
  <!-- ████████████████████████ Select ████████████████████████ -->
  <v-list-item
    v-bind="$attrs"
    :class="{ 'disabled-scale-down': disabled }"
    density="compact"
    class="s--setting-select"
  >
    <template v-slot:title>
      <span class="-label">
        <v-icon v-if="icon" class="me-1">{{ icon }}</v-icon>

        {{ label }}</span
      >
    </template>

    <template v-slot:append>
      <v-select
        :clearable="clearable"
        :disabled="disabled"
        :items="fonts"
        :model-value="modelValue"
        class="v-input-small"
        style="min-width: 160px"
        color="#1976D2"
        density="compact"
        hide-details
        inset
        variant="outlined"
        placeholder="Select font..."
        rounded="lg"
        @update:model-value="(val) => setValue(val)"
      >
        <template v-slot:selection="{ item }">
          <span :style="{ fontFamily: item.raw }">
            {{ item.raw }}
          </span>
        </template>
        <template v-slot:item="{ item, props }">
          <v-list-item class="text-start" v-bind="props">
            <template v-slot:title>
              <span :style="{ fontFamily: item.raw }">{{ item.raw }}</span>
            </template>
          </v-list-item>
        </template>
      </v-select>

      <v-btn
        v-if="hasAdd"
        @click.stop="dialog = true"
        variant="elevated"
        color="#1976D2"
        title="Add New Font"
        class="ms-1"
        min-width="20"
        width="32"
        height="32"
        rounded="lg"
      >
        <v-icon>add_box</v-icon>
      </v-btn>
    </template>
  </v-list-item>

  <!-- ███████████████████████ Dialog > Add Font ███████████████████████ -->

  <v-bottom-sheet
    v-if="hasAdd"
    v-model="dialog"
    max-width="640"
    width="98vw"
    content-class="rounded-t-xl"
  >
    <v-card rounded="t-xl" class="text-start" color="#222">
      <v-card-title>
        <v-icon class="me-2">font_download</v-icon>
        Add New Font
      </v-card-title>

      <v-card-text>
        <v-list-subheader
          >You can add new fonts from Google fonts. Just write the font name in
          the following box.
        </v-list-subheader>

        <v-list density="compact" class="my-3 border-between-vertical bg-transparent" max-height="40vh">
          <v-list-item v-for="font in fonts" :key="font">
            <template v-slot:title>
              <v-icon class="me-1" size="small">font_download</v-icon>

              <b :style="{ fontFamily: font }"> {{ font }}</b>
            </template>
            <template v-slot:append>
              <v-btn icon @click="deleteFont(font)" size="small">
                <v-icon>close</v-icon>
              </v-btn>
            </template>
          </v-list-item>
        </v-list>

      <div class="d-flex align-start">
        <v-combobox
            v-model="font_input"
            v-model:search="font_input"
            :items="filtered_fonts"
            label="Font name"
            persistent-placeholder
            messages="Type font name Ex.Akzidenz Grotesk and pres Enter..."
            variant="solo"
            @keydown.enter="addFont"
            bg-color="#fff"
        >

        </v-combobox>
        <v-btn
            :class="{disabled:!font_input}"
            color="#1976D2"
            prepend-icon="add"
            variant="elevated" class="ms-2"
            height="56"
            @click.prevent="addFont()"
        >
          Add font
        </v-btn>
      </div>

        <div class="text-end">
          <v-btn
            class="tnt"
            color="amber"
            href="https://fonts.google.com/"
            size="small"
            target="_blank"
            variant="text"
            >View Google Fonts
            <v-icon class="ms-1" size="small">open_in_new</v-icon>
          </v-btn>
        </div>
      </v-card-text>

      <v-card-actions>
        <div class="widget-buttons">
          <v-btn
            size="x-large"
            variant="text"
            @click="dialog = false"
            prepend-icon="close"
          >
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-bottom-sheet>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FontLoader, FONTS } from "@selldone/core-js";

export default defineComponent({
  name: "SSettingFontFamily",
  emits: ["update:modelValue", "update:fonts"],
  props: {
    modelValue: {},
    label: {},
    icon: {},
    fonts: {
      type: Array,
      required: true,
    },
    disabled: Boolean,
    clearable: Boolean,
    hasAdd: Boolean, // Add new font button!
  },
  computed: {
    filtered_fonts() {
      return FONTS.filter((i) => !this.fonts?.includes(i));
    },
  },
  data() {
    return {
      dialog: false,
      font_input: null,
    };
  },

  created() {
    if (!this.fonts || !Array.isArray(this.fonts)) {
      this.$emit("update:fonts", []);
    }
  },

  methods: {
    setValue(value) {
      this.$emit("update:modelValue", value);
    },

    addFont() {
      if (!this.font_input) return;

      if (!this.fonts || !Array.isArray(this.fonts)) {
        console.error("Fonts array is not defined or not an array");
        return;
      }

      this.font_input = this.extractFontName(this.font_input);

      this.font_input = this.font_input.trim(); //.replace(' ','+')
      if (this.fonts.includes(this.font_input)) {
        this.font_input = "";
        return;
      }
      this.fonts.push(this.font_input);
      this.font_input = "";
      FontLoader.LoadFonts(this.fonts);



    },
    deleteFont(font) {
      NotificationService.openDangerAlert(
        `Remove ${font}`,
        `Are you sure you want to remove the font ${font}?`,
        this.$t("global.actions.delete"),
        () => {
          this.fonts.remove(font);
          this.$forceUpdate();
        },
      );
    },
    extractFontName(url) {
      if (!url?.startsWith("http")) return url;
      // Create a URL object from the input URL string
      const urlObject = new URL(url);

      // Extract the pathname from the URL object
      const pathname = urlObject.pathname;

      // Split the pathname into parts using '/' as the delimiter
      const parts = pathname.split("/");

      // The font name will be the last part of the pathname
      const fontName = parts[parts.length - 1];

      // Replace '+' with spaces to get the actual font name
      const decodedFontName = fontName.replace(/\+/g, " ");

      return decodedFontName;
    },
  },
});
</script>

<style lang="scss" scoped>
.s--setting-select {

  .-label {
    font-size: 0.8rem;
  }
}
</style>
