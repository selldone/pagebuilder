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
import LEventsName from "../../mixins/events/name/LEventsName";
import {autoUpdate, computePosition, detectOverflow, offset,} from "@floating-ui/dom";
import {LMixinEvents} from "../../mixins/events/LMixinEvents";
import {EventBus} from "@selldone/core-js/events/EventBus";
import {isParentTo} from "../../utils/html/LUtilsHtml";
import {CONSOLE} from "@selldone/core-js/helper";
import LeaderLine from "vue3-leaderline";

export const LMixinStyler = defineComponent({
  mixins: [LMixinEvents],
  props: {
    type: {
      type: String,
      required: true,
    },
    builder: {
      required: true,
    },

    el: {
      required: true,
    },
    section: {
      //   type: Section, /*Uncaught ReferenceError: can't access lexical declaration 'Section' before initialization*/
      required: true,
    },

    position: {
      type: String,
      default: "bottom",
    },
  },
  data() {
    return {
      isVisible: false,
      selection: null, // Keep selection range by user (text selection)
      line: null,
    };
  },

  computed: {},
  watch: {
    isVisible(visible) {
      if (visible) {
        this.checkLine();
        if (this.line) {
          this.line.show("draw");
        }
      } else {
        if (this.line) {
          // this.line.remove()
          // this.line=null
          this.line.hide("draw");
        }
      }

      if (window.innerWidth > 2440) {
        this.$builder.focusMode = false;
        return;
      }
      console.log("isVisible", this.isVisible);
      this.$nextTick(() => {
        if ($("div.styler.is-visible").length > 0) {
          console.log("At least one styler is visible.");
          this.$builder.focusMode = true;
        } else {
          console.log("No styler is currently visible.");
          this.$builder.focusMode = false;
        }
      });
    },
  },

  created() {},

  mounted() {
    if (!this.builder.isEditing) return;

    // add listeners to show/hide styler
    this.el.addEventListener("click", this.showStyler);

    //█████████████████████████████████████████████████████████████
    //――――――――――――――― Event Bus ――――――――――――――――
    //█████████████████████████████████████████████████████████████
    EventBus.$on(LEventsName.PAGE_BUILDER_STYLER_OPEN, ({ type, show }) => {
      if (show) {
        //TODO: We can limit showing stylers here!
      }
    });
  },

  beforeUnmount() {
    CONSOLE.log(
      `Styler Mixin | beforeUnmount | Remove event listener ${this.position}`,
      this,
    );

    if (this.line) {
      this.line.remove();
    }

    EventBus.$off(LEventsName.PAGE_BUILDER_STYLER_OPEN);

    this.el?.classList.remove("is-editable");
    this.el?.removeEventListener("click", this.showStyler);
    document.removeEventListener("click", this.hideStyler, true);
  },

  methods: {
    checkLine() {
      if (this.line) return;
      try {
        const referenceEl = this.el;
        const floatingEl = this.$refs.styler.$el
          ? this.$refs.styler.$el /*Vue components*/
          : this.$refs.styler; /*Native elements*/

        //console.log("- - - - - - >", floatingEl.firstElementChild, referenceEl);

        this.line = new LeaderLine(referenceEl, floatingEl, {
          color: "#20262e",
          size: 2,
          dash: true,
          startPlug: 'disc',
        });

        this.line.hide();
      } catch (e) {
        console.error(e);
      }
    },

    checkProper() {
      if (!this.cleanup) {
        //  const position = this.position;

        if (!this.$refs.styler) {
          console.error("Styler Mixin: No styler ref found!");
          return;
        }
        if (!this.el) {
          console.error("Styler Mixin: No el found!");
          return;
        }
        const referenceEl = this.el;
        const floatingEl = this.$refs.styler.$el
          ? this.$refs.styler.$el /*Vue components*/
          : this.$refs.styler; /*Native elements*/

        if (
          !(referenceEl instanceof Element && floatingEl instanceof Element)
        ) {
          console.debug(
            "Check Float UI | Invalid element!",
            referenceEl,
            floatingEl,
          );
          return;
        }

        const PADDING = 100;
        // When the floating element is open on the screen
        this.cleanup = autoUpdate(
          referenceEl,
          floatingEl,
          () => {
            computePosition(referenceEl, floatingEl, {
              placement: this.position,
              middleware: [
                offset(PADDING),
                {
                  name: "custom",

                  // Detect if the floating element is overflowing its boundary

                  async fn(state) {
                    const { bottom, left, top, right } = await detectOverflow(
                      state,
                      {
                        boundary: document.body,
                        padding: PADDING,
                      },
                    );

                    if (left > 0) {
                      // Overflow from left
                      return { x: PADDING };
                    } else if (right > 0) {
                      // Overflow from right
                      return {
                        x:
                          window.innerWidth -
                          state.rects.floating.width -
                          PADDING,
                      };
                    }

                    return {};
                  },
                },
              ],
            }).then((out) => {
              Object.assign(floatingEl.style, {
                left: `${out.x}px`,
                top: `${out.y}px`,
              });
              this.line?.position();
            });
          },
          /* {
                                                                                             layoutShift: true,
                                                                               
                                                                                           }*/
        );
      }
    },

    showStyler(event: Event) {
      if(this.$vuetify.display.xs){
        event.stopPropagation();
      }

      CONSOLE.log("Styler Mixin | showStyler", this);

      // console.log("showStyler", this.isVisible);
      // event.stopPropagation();
      if (this.isVisible) return;
      this.isVisible = true;

      // execute popper element
      this.checkProper();
      document.addEventListener("click", this.hideStyler, true);

      this.OnPageBuilderStylerOpen(this.type, true); //Signal to other stylers about showing this styler!

      event.preventDefault();
    },

    hideStyler(event: Event) {
      CONSOLE.log("Styler Mixin | hideStyler", this);

      if (
        event &&
        // Click on styler but not this styler:
        !(
          event.target instanceof Element &&
          event.target.closest(".styler") &&
          event.target.closest(".styler") !== this.$el
        ) &&
        (isParentTo(event.target, this.$el) || // Click on styler element
          isParentTo(event.target, this.el) || // Click on element in page builder
          !(
            event.target instanceof Element && event.target.closest(".artboard")
          )) // Close styler only if click inside artboard
      ) {
        return;
      }
      this.isVisible = false;
      if (this.cleanup) {
        this.cleanup();
        this.cleanup = null;
      }

      /*
                                                                                                                        if (this.popper) {
                                                                                                                          this.popper.destroy();
                                                                                                                          this.popper = null;
                                                                                                                        }*/
      document.removeEventListener("click", this.hideStyler, true);

      this.OnPageBuilderStylerOpen(this.type, false); //Signal to other stylers about hiding this styler!
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

    getSelectedTextFont() {
      // Get the selected range
      const selection = window.getSelection();
      if (!selection?.rangeCount) return null; // No selection

      // Get the first node in the selected range
      let node: Node | null = selection.getRangeAt(0).startContainer;
      if (!node) {
        // console.error("Selected node is not an element ,node :", node);
        return;
      }
      if (!(node instanceof Element)) {
        node = node.parentElement;
      }
      if (!node || !(node instanceof Element)) {
        // console.error("Selected node is not an element ,node :", node);
        return;
      }

      // Get the computed style of the node
      const computedStyle = window.getComputedStyle(node);

      // Get the font family
      const fontFamily = computedStyle.getPropertyValue("font-family");

      // Split the font family string by comma and get the first font
      const firstFont = fontFamily.split(",")[0];

      return firstFont;
    },

    getSelectedTextLink() {
      // Get the selected range
      const selection = window.getSelection();
      if (!selection?.rangeCount) return null; // No selection

      // Get the first node in the selected range
      let node: Node | null = selection.getRangeAt(0).startContainer;

      // Initialize a counter for the loop
      let counter = 0;

      // Traverse up the DOM tree to find the nearest enclosing <a> tag, up to 5 parents
      while (node && node.nodeName !== "A" && counter < 10) {
        node = node.parentElement;
        counter++;
      }

      // If an <a> tag is found within 5 parents, log its href attribute
      if (node && node.nodeName === "A") {
        const link = (node as HTMLAnchorElement).href;
        //  console.log(link);
        return link;
      } else {
        // console.log("No link found in the selected range or within 5 parent nodes.",);
      }
    },

    //――――――――――――――――――――――  Element Helpers ――――――――――――――――――――

    setTextRootElementStyleXXXXXXXXXXX(
      property: "font-family",
      value: string,
      remove_from_all_children: boolean = false,
    ) {
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
        this.ta;
        this.section.set(this.name + ".content", this.el.innerHTML);
      } else if (this.type === "text") {
        this.section.set(this.name, this.el.innerHTML);
      }
    },

    // ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Old execute commands ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

    execute(command: string, value?: string) {
      this.el.focus();
      //console.log("execute: ", this.el.focus(), command);
      //  console.log('this.el: '+this.el)
      document.execCommand(command, false, value);
    },

    // ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ Root inner element > Set class ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

    /**
     * Applies a specified class to the first child element within the component's root element, optionally removing
     * existing classes that match a given prefix from all child elements or direct children only.
     *
     * This method first ensures the root element has a single wrapper `<div>` if necessary, then applies the new class
     * to this wrapper. It's useful for dynamically adjusting styles based on component state or props.
     *
     * @param {string} prefix_class_name - The prefix used to identify classes for removal. Only classes starting with this prefix are removed.
     * @param {string} class_name - The class name to be added to the first child of the root element. The full class name will be the concatenation of `prefix_class_name` and `class_name`.
     * @param {boolean} [remove_from_all_children=false] - Determines whether classes should be removed from all descendants (`true`) or direct children (`false`) of the root element.
     */
    setElementClass(
      prefix_class_name: string,
      class_name: string,
      remove_from_all_children = false,
    ) {
      this.el.focus(); // Set focus to the root element

      // Define a helper function to remove classes based on the prefix
      const removeClasses = (element: Element) => {
        $(element).removeClass(function (index, css) {
          return (
            css.match(new RegExp(`\\b${prefix_class_name}\\S*`, "g")) || []
          ).join(" ");
        });
      };

      // Remove matching classes from either all descendants or direct children
      if (remove_from_all_children) {
        $(this.el)
          .find("*")
          .each(function () {
            removeClasses(this);
          });
      } else {
        $(this.el)
          .children()
          .each(function () {
            removeClasses(this);
          });
      }

      // Ensure there's a single <div> wrapper for the element's content
      if (
        this.el.childElementCount !== 1 ||
        this.el.firstChild.nodeName !== "DIV"
      ) {
        $(this.el).wrapInner("<div></div>");
      }

      // Add the new class to the first child element
      const child = this.el.firstChild;
      child.classList.add(`${prefix_class_name}${class_name}`);
    },

    //------------------------------------------------------------------
    /**
     * Safe past (remove all html tags)
     * @param event
     */
    stripHtmlToText(event: any) {
      // Prevent past section data:
      try {
        function IsValidJsonSectionString(str: any) {
          try {
            const json = JSON.parse(str);
            return !!json?.object;
          } catch (e) {}
          return false;
        }

        // @ts-ignore
        const paste = (event.clipboardData || window.clipboardData).getData(
          "text",
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

      const pure = pastedContent.replace(/(\r\n|\n|\r)/gm, "");
      // console.log("Past", 'pure', pure);

      //  console.log('pure',pure)
      this.el.insertAtCaret(pure);
    },
  },
});
