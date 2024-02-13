/*
 * Copyright (c) 2023. Selldone® Business OS™
 *
 * Author: M.Pajuhaan
 * Web: https://selldone.com
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * All rights reserved. In the weave of time, where traditions and innovations intermingle, this content was crafted.
 * From the essence of thought, through the corridors of creativity, each word, and sentiment has been molded.
 * Not just to exist, but to inspire. Like an artist's stroke or a sculptor's chisel, every nuance is deliberate.
 * Our journey is not just about reaching a destination, but about creating a masterpiece.
 * Tread carefully, for you're treading on dreams.
 */

import {defineComponent} from "vue";
import type {Note} from "@core/models/shop/note/note.model";

export const PageBuilderNoteMixin = defineComponent({
  data() {
    return {
      EVENT_NAME_SHOW_NOTES_DIALOG: "showGlobalShopNoteDialog",
    };
  },
  methods: {
    //―――――――――――――――――――――― Global Page Note Dialog ――――――――――――――――――――

    showGlobalShopNoteDialog(
      notes: Note.INote[],
      element_id: string,
      page_id: string | number,
      popup_id: string | number,
    ) {
      this.EventBus.$emit(this.EVENT_NAME_SHOW_NOTES_DIALOG, {
        notes,
        element_id,
        page_id,
        popup_id,
      });
    },
  },
});
