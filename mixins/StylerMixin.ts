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
import EventBusTriggers from "@core/enums/event-bus/EventBusTriggers";
import {isParentTo} from "@app-page-builder/src/util";
import PageEventBusMixin from "@app-page-builder/mixins/PageEventBusMixin";
import Popper from "popper.js";

/**
 * Mixin to provide inline editing capabilities.
 * @mixin PageBuilderMixin
 */
export const StylerMixin = defineComponent({
  mixins: [PageEventBusMixin],
  data() {
    return {
      isVisible: false,

    };
  },
  created() {},

  mounted() {
    if (!this.builder.isEditing) return;

    // add listeners to show/hide styler
    this.el.addEventListener("click", this.showStyler);

    //█████████████████████████████████████████████████████████████
    //――――――――――――――― Event Bus ――――――――――――――――
    //█████████████████████████████████████████████████████████████
    this.EventBus.$on(
      EventBusTriggers.PAGE_BUILDER_STYLER_OPEN,
      ({ type, show }) => {
        if (show) {
          this.other_styler_open = type; //TODO: We can limit showing stylers here!
        }
      },
    );
  },

  beforeUnmount() {
    this.EventBus.$off(EventBusTriggers.PAGE_BUILDER_STYLER_OPEN);

    this.hideStyler();
    try {
      if (this.builder.isEditing) this.$refs.styler.remove();
    } catch (e) {
      console.error(e);
    }

    this.el.classList.remove("is-editable");
    this.el.removeEventListener("click", this.showStyler);
    document.removeEventListener("click", this.hideStyler, true);
  },

  methods: {
    //――――――――――――――――――――――  Proper (Styler tools location) ――――――――――――――――――――
    updatePopper() {
      this.$nextTick(() => {
        this.checkProper();
        this.popper.update();
      });
    },
    checkProper() {
      if (!this.popper) {
        const position = this.position;
        /* this.$props.type === "section"
                                   ? "left-start"
                                   : this.$props.type === "row" && this.hasAttribute("has-add")
                                     ? "left-center" // Prevent over lapping rows
                                     : this.$props.type === "buttons-row"
                                       ? "left-center"
                                       : this.$props.type === "row"
                                         ? "right-end"
                                         : this.$props.type === "container"
                                           ? "right-center"
                                           : this.$props.type === "grid" ||
                                               this.$props.type === "row-grid"
                                             ? "bottom"
                                             : "top";*/

        if (!this.$refs.styler) {
          console.error("Styler Mixin: No styler ref found!");
          return;
        }
        if (!this.el) {
          console.error("Styler Mixin: No el found!");
          return;
        }
        console.log(
          "checkProper",
          this.el,
          this.$refs.styler.$el,
          position,
          this.popper,
        );

        this.popper = new Popper(this.el, this.$refs.styler.$el, {
          placement: position,
        });
      }
    },

    showStyler(event: Event) {
      console.log("showStyler", this.isVisible);
      // event.stopPropagation();
      if (this.isVisible) return;
      this.isVisible = true;

      // execute popper element
      this.checkProper();
      document.addEventListener("click", this.hideStyler, true);

      this.currentOption = "";

      this.onPageBuilderStyleOpen(this.type, true); //Signal to other stylers about showing this styler!
    },

    hideStyler(event: Event) {
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

      this.onPageBuilderStyleOpen(this.type, false); //Signal to other stylers about hiding this styler!
    },
  },
});
