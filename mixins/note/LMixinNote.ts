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
import {LMixinEvents} from "../../mixins/events/LMixinEvents";
import {EventBus} from "@selldone/components-vue/utils/events/EventBus.ts";

export const LMixinNote = defineComponent({
  mixins: [LMixinEvents],
  data() {
    return {
      EVENT_NAME_SHOW_NOTES_DIALOG: "showGlobalShopNoteDialog",
    };
  },
  methods: {
    //―――――――――――――――――――――― Global Page Note Dialog ――――――――――――――――――――

    showGlobalShopNoteDialog(element_id: string) {
      const model = this.$builder?.model;
      const type = this.$builder?.type;
      if (!model) {
        console.error(
          "Model not found! Please set the model in the $builder. Builder:",
          this.$builder,
        );
        return;
      }

      if (!["page", "popup"].includes(type)) {
        console.error("Only page and popup types are supported. Type:", type);
        return;
      }

      EventBus.$emit(this.EVENT_NAME_SHOW_NOTES_DIALOG, {
        notes: model.notes,
        element_id,
        page_id: type === "page" ? model.id : null,
        popup_id: type === "popup" ? model.id : null,
      });
    },
  },
});
