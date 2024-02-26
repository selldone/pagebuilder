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
    v-model="dialog"
    :scrim="false"
    :width="
      $vuetify.display.xlAndUp
        ? 560
        : $vuetify.display.lgAndUp
          ? 420
          : undefined
    "
    class="x-page-builder-options-slider"
    color="#1e1e1e"
    temporary
    touchless
  >
    <v-card
      class="text-start d-flex flex-column"
      color="#1e1e1e"
      flat
      style="min-height: 100%; height: 100%"
    >
      <!-- ████████████████████ Chats ████████████████████ -->

      <v-list ref="list" class="flex-grow-0 overflow-auto py-16" lines="two">
        <p-note-box
          v-for="note in filtered_notes"
          :key="note.id"
          :in-shop-admin="inShopAdmin"
          :note="note"
          :shop="shop"
          @delete="DeleteItemByID(notes, note.id)"
        >
        </p-note-box>
      </v-list>

      <v-spacer></v-spacer>
      <div class="pa-2 flex-grow-0">
        <s-mentionable-input
          v-model="message"
          v-model:mentions="mentions"
          :label="$t('order_timeline.message_input')"
          :shop-id="shop.id"
          auto-grow
          class="mb-2"
        ></s-mentionable-input>

        <s-dense-images-circles-users
          v-if="mentions && mentions.users"
          :ids="mentions.users"
          :size="32"
        ></s-dense-images-circles-users>

        <!-- ████████████████████ Actions ████████████████████ -->

        <div class="widget-buttons">
          <v-btn size="x-large" variant="text" @click="dialog = false">
            <v-icon start>{{ $t("icons.chevron_back") }}</v-icon>
            {{ $t("global.actions.close") }}
          </v-btn>

          <v-btn
            :disabled="!message"
            :loading="saving"
            color="primary"
            size="x-large"
            variant="elevated"
            @click="addNewNote()"
          >
            {{ $t("global.actions.send") }}
            <v-icon end>send</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import SDenseImagesCirclesUsers from "@components/user/dense-circles/SDenseImagesCirclesUsers.vue";
import SMentionableInput from "@components/ui/text/SMentionableInput.vue";
import PNoteBox from "@app-page-builder/components/note/box/PNoteBox.vue";
import { LMixinNote } from "@app-page-builder/mixins/note/LMixinNote";
import { LMixinEvents } from "@app-page-builder/mixins/events/LMixinEvents";
import {EventBus} from "@core/events/EventBus";

export default {
  name: "PNoteDialog",
  mixins: [LMixinNote, LMixinEvents],
  components: { PNoteBox, SMentionableInput, SDenseImagesCirclesUsers },

  props: {
    shop: {
      required: true,
    },
    inShopAdmin: {
      type: Boolean,
    },
  },
  data: () => ({
    notes: [],
    element_id: null,
    page_id: null,
    popup_id: null,

    dialog: false,

    //--------------------
    message: "",
    mentions: {},
    saving: false,
  }),

  computed: {
    filtered_notes() {
      if (!this.element_id) return this.notes;
      return this.notes?.filter((n) => n.element_id === this.element_id);
    },
  },

  watch: {},
  created() {},
  mounted() {
    EventBus.$on(
      this.EVENT_NAME_SHOW_NOTES_DIALOG,

      ({ notes, element_id, page_id, popup_id }) => {
        if (this.dialog && element_id === this.element_id) {
          // Toggle mode!
          this.dialog = false;
          return;
        }
        this.notes = Array.isArray(notes) ? notes : [];
        this.element_id = element_id;
        this.page_id = page_id;
        this.popup_id = popup_id;

        this.dialog = true;
      },
    );

    //――――――――――――――――――――――  START Editor key listener ――――――――――――――――――――
    this.key_listener_keydown = (event) => {
      // Scape:
      let isEscape =
        event.key === "Escape" || event.key === "Esc" || event.keyCode === 27;

      if (isEscape) {
        if (this.dialog) {
          // Close tools
          this.dialog = false;
          event.preventDefault();
          return false;
        }
      }
    };
    document.addEventListener("keydown", this.key_listener_keydown, true);
    //――――――――――――――――――――――  END Editor key listener ――――――――――――――――――――
  },
  beforeUnmount() {
    EventBus.$off(this.EVENT_NAME_SHOW_NOTES_DIALOG);

    //――――――――――――――――――――――  REMOVE key listener ――――――――――――――――――――
    document.removeEventListener("keydown", this.key_listener_keydown, true);
  },

  methods: {
    addNewNote() {
      if (this.saving) return;
      this.saving = true;

      const base_url = this.inShopAdmin
        ? window.API.POST_SHOP_NOTE_ADD(this.shop.id)
        : undefined;

      axios
        .post(base_url, {
          message: this.message,
          mentions: this.mentions,
          page_id: this.page_id,
          popup_id: this.popup_id,

          element_id: this.element_id,
        })
        .then(({ data }) => {
          if (data.error) {
            return this.showErrorAlert(null, data.error_msg);
          }

          this.AddOrUpdateItemByID(this.notes, data.note, "id", true);
          this.showSuccessAlert(
            null,
            "Your message has been successfully added!",
          );
          this.message = "";
          this.mentions = {};

          // Auto scroll to end:

          this.$nextTick(() => {
            const div = this.$refs.list?.$el;
            if (div) div.scrollTop = div.scrollHeight;
          });
        })
        .catch((error) => {
          this.showLaravelError(error);
        })
        .finally(() => {
          this.saving = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
