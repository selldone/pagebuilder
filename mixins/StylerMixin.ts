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

        this.popper = new Popper(
          this.el,
          this.$refs.styler.$el
            ? this.$refs.styler.$el /*Vue components*/
            : this.$refs.styler /*Native elements*/,
          {
            placement: position,
          },
        );
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

      this.onPageBuilderStyleOpen(this.type, true); //Signal to other stylers about showing this styler!

      event.preventDefault();
    },

    hideStyler(event: Event) {
      if (
        event &&
        (isParentTo(event.target, this.$el) || // Click on element in page builder
          isParentTo(event.target, this.el) || // Click on styler element
          !(
            event.target instanceof Element && event.target.closest(".artboard")
          )) // Close styler only if click inside artboard
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

    //――――――――――――――――――――――  Text Range Select ――――――――――――――――――――

    saveRangeSelected() {
      this.selection = null;
      if (window.getSelection) {
        const sel = window.getSelection();
        if (sel?.getRangeAt && sel.rangeCount) {
          this.selection = sel.getRangeAt(0).cloneRange();
          //console.log('this.selection --> Save',sel);
        }
      } /*else if (document.selection && document.selection.createRange) {
        this.selection = document.selection.createRange();
      }*/
      // console.log('Save selection', this.selection)
    },

    restoreSelection() {
      // console.log('Load selection', this.selection)
      //console.log('this.selection --> Restore',this.selection);

      const range = this.selection.cloneRange();
      if (range && !range.collapsed) {
        if (window.getSelection) {
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
        } /*else if (document.selection && range.select) {
          range.select();
        }*/
      }
    },

    getSelectedText(): string {
      let selectedText: string | undefined = "";
      if (window.getSelection) {
        selectedText = window.getSelection()?.toString();
      } /* else if (document.selection && document.selection.type !== "Control") {
        selectedText = document.selection.createRange().text;
      }*/
      return selectedText ? selectedText : "";
    },

    getSelectedTextColor() {
      const selectedText = this.getSelectedText();
      //console.log("Selected text:", selectedText);

      if (selectedText === "") {
        //console.log("No text selected");
        return;
      }
      const range = window.getSelection()?.getRangeAt(0);
      if (!range) return null;
      //console.log("Selected range:", range);

      const parentElement = range.commonAncestorContainer.parentElement;
      if (!parentElement) return null;
      const textColor = window.getComputedStyle(parentElement).color;

      // Convert RGB color to hexadecimal format
      const rgb = textColor.match(/\d+/g);
      if (rgb)
        try {
          const hexColor = `#${Number(rgb[0])
            .toString(16)
            .padStart(2, "0")}${Number(rgb[1])
            .toString(16)
            .padStart(2, "0")}${Number(rgb[2]).toString(16).padStart(2, "0")}`;

          return hexColor;
        } catch (e) {
          console.error(e);
        }
      return null;
    },

    //――――――――――――――――――――――  Element Helpers ――――――――――――――――――――

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

    // ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Old execute commands ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

    execute(command, value = null) {
      this.el.focus();
      //console.log("execute: ", this.el.focus(), command);
      //  console.log('this.el: '+this.el)
      document.execCommand(command, false, value);
    },
  },
});
