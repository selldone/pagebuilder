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

//―――――――――――――――――――――― Event Bus ――――――――――――――――――――
import {EventBus} from "@core/events/EventBus";
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import {defineComponent} from "vue";

const PageEventBusMixin = defineComponent({
  data() {
    return {
      EventBus: EventBus,
    };
  },

  methods: {
    //―――――――――――――――――――――― Page builder global ――――――――――――――――――――
    /**
     * Close all except indicated code! (Almost we call it when a new tool open, and we want to close all other menus)
     * @constructor
     */
    CloseAllPageBuilderNavigationDrawerTools() {
      this.EventBus.$emit(EventBusTriggers.PAGE_BUILDER_CLOSE_TOOLS);
    },
    onPageBuilderStyleOpen(type: StylerType, show: boolean) {
      this.EventBus.$emit(EventBusTriggers.PAGE_BUILDER_STYLER_OPEN, {
        type,
        show,
      });
    },
  },
});

export default PageEventBusMixin;
