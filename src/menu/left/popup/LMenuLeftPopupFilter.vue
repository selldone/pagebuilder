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
  <v-btn
    @click="dialog = true"
    variant="text"
    min-width="46"
    min-height="46"
    rounded="lg"
    class="ma-1"
  >
    <v-icon>filter_alt</v-icon>
    <v-tooltip activator="parent"
      >{{ $t("popup_page.menu.filter") }}
    </v-tooltip>
  </v-btn>

  <v-dialog
    v-model="dialog"
    scrollable
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>
        <!-- ============== Registered ============== -->

        <div class="widget-box mb-5">
          <h2>
            <v-icon class="me-1">people_alt</v-icon>
            {{ $t("popup_filter.registered") }}
          </h2>

          <v-list-subheader>
            {{ $t("popup_filter.registered_desc") }}
          </v-list-subheader>

          <div class="text-center mb-4">
            <v-btn-toggle
              v-model="popup.registered"
              class="widget-toggle"
              mandatory
              selected-class="blue-flat"
            >
              <v-btn value="None"> {{ $t("global.commons.all") }}</v-btn>
              <v-btn value="No">
                <v-icon class="me-1" size="small">person_outline</v-icon>
                {{ $t("popup_filter.only_guests") }}
              </v-btn>
              <v-btn value="Yes">
                <v-icon class="me-1" size="small">person</v-icon>
                {{ $t("popup_filter.only_users") }}
              </v-btn>
            </v-btn-toggle>
          </div>
        </div>

        <div class="widget-box mb-5">
          <h2>
            <v-icon class="me-1">shopping_bag</v-icon>
            {{ $t("popup_filter.purchased") }}
          </h2>

          <v-list-subheader>
            {{ $t("popup_filter.purchased_desc") }}
          </v-list-subheader>
          <div class="text-center mb-4">
            <v-btn-toggle
              v-model="popup.purchased"
              class="widget-toggle"
              mandatory
              selected-class="blue-flat"
            >
              <v-btn value="None"> {{ $t("global.commons.all") }}</v-btn>
              <v-btn value="No">
                <v-icon class="me-1" size="small">remove_shopping_cart</v-icon>
                {{ $t("popup_filter.no_purchase") }}
              </v-btn>
              <v-btn value="Yes">
                <v-icon class="me-1" size="small">shopping_cart</v-icon>
                {{ $t("popup_filter.yes_purchase") }}
              </v-btn>
            </v-btn-toggle>
          </div>
        </div>

        <div class="widget-box mb-5">
          <h2>
            <v-icon class="me-1">wc</v-icon>
            {{ $t("popup_filter.sex") }}
          </h2>

          <v-list-subheader>
            {{ $t("popup_filter.sex_desc") }}
          </v-list-subheader>
          <div class="text-center mb-4">
            <v-btn-toggle
              v-model="popup.sex"
              class="widget-toggle"
              mandatory
              selected-class="blue-flat"
            >
              <v-btn
                value=""
                :active="!popup.sex"
                :class="{ 'blue-flat': !popup.sex }"
              >
                {{ $t("global.commons.all") }}
              </v-btn>
              <v-btn value="Male">
                <v-icon start>male</v-icon>
                {{ $t("global.commons.male") }}
              </v-btn>
              <v-btn value="Female">
                <v-icon start>female</v-icon>
                {{ $t("global.commons.female") }}
              </v-btn>
            </v-btn-toggle>
          </div>
        </div>

        <div class="widget-box mb-5">
          <h2>
            <v-icon class="me-1">child_care</v-icon>
            {{ $t("popup_filter.age") }}
          </h2>

          <v-list-subheader>
            {{ $t("popup_filter.age_desc") }}
          </v-list-subheader>

          <u-number-input
            v-model="popup.age"
            :max="100"
            :min="0"
            :messages="
              popup.age > 6
                ? '🚷 User should register and declare age!'
                : undefined
            "
          ></u-number-input>
        </div>

        <div class="widget-box mb-5">
          <h2>
            <v-icon class="me-1">diamond</v-icon>
            {{ $t("popup_filter.levels") }}
          </h2>

          <v-list-subheader>
            {{ $t("popup_filter.levels_desc") }}
          </v-list-subheader>

          <b-club-select
            v-model="popup.levels"
            :clear-text="$t('global.commons.all')"
            clearable
            multiple
          ></b-club-select>
        </div>

        <div class="widget-box mb-5">
          <h2>
            <v-icon class="me-1">place</v-icon>
            {{ $t("popup_filter.countries") }}
          </h2>

          <v-list-subheader>
            {{ $t("popup_filter.countries_desc") }}
          </v-list-subheader>

          <s-country-select
            v-model="popup.countries"
            :label="$t('global.commons.countries')"
            :placeholder="$t('global.commons.all')"
            clearable
            item-value="alpha2"
            multiple
          >
          </s-country-select>
        </div>
      </v-card-text>
      <v-card-actions>
        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="dialog = false">
            <v-icon start>close</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import SCountrySelect from "@selldone/components-vue/ui/country/select/SCountrySelect.vue";
import UNumberInput from "@selldone/components-vue/ui/number/input/UNumberInput.vue";
import BClubSelect from "@selldone/components-vue/backoffice/club/select/BClubSelect.vue";
import { Club } from "@selldone/core-js";

export default {
  name: "LMenuLeftPopupFilter",
  components: { BClubSelect, UNumberInput, SCountrySelect },

  inject: ["$builder", "$shop"],

  props: {},
  data: () => ({
    dialog: false,

    busy_delete: false,
    CustomerClubLevels: Club.Levels,
  }),

  computed: {
    popup() {
      return this.$builder.model;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
