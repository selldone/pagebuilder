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
  <v-list-item>
    <template v-slot:prepend>
      <v-avatar
        :class="{
          '-user': note.user_id !== USER_ID(),
          '-current': note.user_id === USER_ID(),
        }"
        class="avatar-gradient -thin"
      >
        <v-img :src="getUserAvatar(note.user_id)" />
      </v-avatar>
    </template>
    <v-list-item-title
      class="text-wrap html-style"
      v-html="smartBeautify(compileMarkdown(note.data?.message))"
    >
    </v-list-item-title>
    <v-list-item-subtitle
      v-if="note.created_at === note.updated_at"
      class="text-end"
      title="Write date"
    >
      {{ getFromNowString(note.created_at) }} ●
      {{ getLocalDateString(note.created_at) }}
    </v-list-item-subtitle>
    <v-list-item-subtitle v-else class="text-end" title="Last update date">
      {{ getFromNowString(note.updated_at) }} ●
      {{ getLocalDateString(note.updated_at) }}
      <v-icon
        :title="`Created at ${getLocalDateString(note.updated_at)}`"
        class="mx-1"
        size="small"
        >edit
      </v-icon>
    </v-list-item-subtitle>

    <template v-slot:append>
      <v-list-item-action end>
        <v-btn
          :loading="delete_busy === note"
          color="red"
          icon
          title="Remove note."
          variant="text"
          @click.stop="
            openDangerAlert(
              'Remove Note',
              'Are you sure to remove this note?',
              'Yes, Remove Now',
              () => removeNote(note),
            )
          "
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script lang="ts">
import NotificationService from "@selldone/components-vue/plugins/notification/NotificationService.ts";

import { ShopTransportations } from "@selldone/core-js/enums/logistic/ShopTransportations";
import { Reactions } from "@selldone/core-js/enums/support/Reactions";
import { Brands } from "@selldone/core-js/enums/social/Brands";
import { CompileMarkdown } from "@selldone/core-js/helper/html/HtmlHelper";
import { CampaignLink, Club } from "@selldone/core-js";
import DateMixin from "@selldone/components-vue/mixin/date/DateMixin.ts";

export default {
  name: "PNoteBox",
  mixins: [DateMixin],

  components: {},
  inject: ["$shop"],
  emits: ["delete"],

  props: {
    inShopAdmin: {
      type: Boolean,
    },

    note: {
      required: true,
    },
  },
  data: () => ({
    delete_busy: null,
  }),

  computed: {},

  watch: {},
  created() {},
  mounted() {},
  beforeUnmount() {},

  methods: {
    compileMarkdown(message) {
      return CompileMarkdown(message);
    },

    smartBeautify(html) {
      let out = html;

      const repos = [
        ShopTransportations,
        Reactions,
        Brands,
        CampaignLink.Medium,
        Club.Levels,
      ];

      repos.forEach((obj) => {
        const list = Array.isArray(obj) ? obj : Object.values(obj);
        list.forEach((it) => {
          if (it.code) {
            out = out.replace(
              " " + it.code + " ",
              `<img width="16" height="16" src="${it.icon}" title="${this.$t(
                it.name || it.code,
              )}">`,
            );
          } else
            out = out.replace(
              " " + it.name + " ",
              `<img width="16" height="16" src="${it.icon}" title="${this.$t(
                it.name,
              )}">`,
            );
        });
      });

      // Replace connect OS:
      out = out.replace(
        " Connect OS",
        ` <b>Connect</b> <span class="text-gradient bg-desert-hump">OS</span>`,
      );

      return out;
    },

    removeNote(note) {
      this.delete_busy = note;

      const base_url = this.inShopAdmin
        ? window.API.DELETE_SHOP_NOTE(this.$shop.id, note.id)
        : undefined;

      axios
        .delete(base_url)
        .then(({ data }) => {
          if (data.error) {
            return NotificationService.showErrorAlert(null, data.error_msg);
          }

          this.$emit("delete");
          NotificationService.showSuccessAlert(
            null,
            "This message has been successfully removed!",
          );
        })
        .catch((error) => {
          NotificationService.showLaravelError(error);
        })
        .finally(() => {
          this.delete_busy = null;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
