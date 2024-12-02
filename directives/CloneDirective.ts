import {ComponentInstance, DirectiveBinding, VNode} from "vue";
import Builder from "@selldone/page-builder/Builder.ts";
import {Section} from "@selldone/page-builder/src/section/section.ts";
import {LModelElement} from "@selldone/page-builder/models/element/LModelElement.ts";
import {XUploaderObject} from "@selldone/page-builder/components/x/uploader/XUploaderObject.ts";
import {XTextObject} from "@selldone/page-builder/components/x/text/XTextObject.ts";
import {isEmpty} from "lodash-es";
import {XButtonObject} from "@selldone/page-builder/components/x/button/XButtonObject.ts";

/**
 * A global tooltip element used by the CloneDirective.
 * The tooltip is dynamically positioned and styled for better UX.
 * @example
 *     v-clone="{
 *       tooltipText: 'Image',
 *        object: object,
 *     }"
 */
const tooltip = document.createElement("div");
tooltip.style.position = "absolute";
tooltip.style.backgroundColor = "black";
tooltip.style.color = "white";
tooltip.style.padding = "5px";
tooltip.style.borderRadius = "4px";
tooltip.style.fontSize = "12px";
tooltip.style.visibility = "hidden";
tooltip.style.pointerEvents = "none";
tooltip.style.zIndex = "1000";
document.body.appendChild(tooltip);

/**
 * The CloneDirective is a custom Vue directive that:
 * 1. Displays a tooltip when the user hovers over the element.
 * 2. Triggers a cloning action (via `$builder`) when the element is clicked, provided the app is in editing mode.
 */
const CloneDirective = {
  /**
   * Called when the directive is mounted on the element.
   * Sets up event listeners for tooltip and click behavior.
   *
   * @param el - The target DOM element to which the directive is bound.
   * @param binding - The directive binding containing the value and modifiers.
   * @param vnode - The virtual node that contains context about the directive.
   */
  async mounted(el: HTMLElement, binding: DirectiveBinding, vnode: any) {
    // Extract instance from binding
    const instance = binding.instance as ComponentInstance<{
      $builder: Builder;
      $section: Section;
    }>;

    // Access the Builder instance provided by the parent component
    const builder: Builder = instance.$builder;

    // Check if the application is in editing mode
    const isEditing = builder?.isEditing;
    if (!isEditing) return;

    // Destructure tooltip text and object to clone from the directive's value
    const {
      tooltipText = "Clone",
      object,
    }: { tooltipText: String; object: LModelElement } = binding.value || {};

    el.__clone_object = object;

    // Mouseover to show the tooltip
    el.addEventListener("mouseover", (event: MouseEvent) => {
      if (!builder.cloneStyle) return;


      // Prevent tooltip display for parent if hovering over a child
      if (event.target !== el) {
        return;
      }



      const object = el.__clone_object;
      //console.log("mouseover", object);
      tooltip.innerHTML = builder.cloneObject?`<strong>Past to ${tooltipText}</strong>`: makeTooltipContent(tooltipText, object);
      tooltip.style.textAlign = "start";
      tooltip.style.visibility = "visible";
      tooltip.style.left = `${event.pageX + 10}px`;
      tooltip.style.top = `${event.pageY + 10}px`;
    });

    // Mousemove to reposition the tooltip
    el.addEventListener("mousemove", (event: MouseEvent) => {
      tooltip.style.left = `${event.pageX + 10}px`;
      tooltip.style.top = `${event.pageY + 10}px`;
    });

    // Mouseout to hide the tooltip
    el.addEventListener("mouseout", (event: MouseEvent) => {
      if (event.relatedTarget && el.contains(event.relatedTarget as Node)) {
        // Ignore mouseout if moving to a child element
        return;
      }

      tooltip.style.visibility = "hidden";
    });

    // Click handler for cloning action
    el.addEventListener("click", (event: MouseEvent) => {
      console.log("CLICK CLONE", builder?.isEditing, builder?.onClickClone);
      if (builder?.isEditing && typeof builder.onClickClone === "function") {
        const object = el.__clone_object;
        builder.onClickClone(event, object);
      }
    });
  },

  async updated(
    el: HTMLElement & {
      $section?: Section;
      __props?: any;
      __instance?: any;
      __container?: any;
    },
    binding: DirectiveBinding,
    vnode: VNode,
  ) {
    if (
      binding.oldValue?.object &&
      binding.oldValue?.object !== binding.value?.object
    ) {
      //console.log("UPDATE CLONE! A",binding.value.object);
      el.__clone_object = binding.value.object;
    }
  },

  /**
   * Called when the directive is unmounted from the element.
   * Ensures that the tooltip is hidden to avoid UI artifacts.
   */
  unmounted() {
    tooltip.style.visibility = "hidden";
  },
};

/**
 * Generates the tooltip content for the given object.
 * @param title
 * @param object
 */
function makeTooltipContent(title: string, object: LModelElement) {
  const has_background = object.background?.hasValue();
  const background = has_background ? object.background?.toString() : undefined;

  // Safely handle object properties
  const classes = Array.isArray(object.classes)
    ? object.classes?.limit(3).join(", ")
    : "";
  const style =
    typeof object.style === "object" && object.style !== null
      ? Object.entries(object.style)
          .limit(3)
          .map(([key, value]) => `${key}: ${value}`)
          .join("; ")
      : "";

  // Update tooltip content with proper formatting
  let _html = `<strong>Clone ${title} Style</strong>`;

  if (classes) {
    _html += `<br>Classes: ${classes}`;
    if (object.classes.length > 3) {
      _html += `...`;
    }
  }
  if (style) {
    _html += `<br>Style: ${style}`;
    if (Object.keys(object.style).length > 3) {
      _html += `...`;
    }
  }
  if (background) {
    _html += `<div class="d-flex align-center">Background: <span style="${background};min-width: 20px;min-height: 20px;border-radius: 4px;border: solid thin #999" class="mx-1 d-inline-block"></span></div>`;
  }

  if (object instanceof XUploaderObject && object.data.setting && !isEmpty(object.data.setting)) {
    _html += `<div>Settings: ${object.data.setting}</div>`;
  }


  if (object instanceof XTextObject && object.data.tag) {
    _html += `<div>Tag: ${object.data.tag}</div>`;
  }

  if (object instanceof XButtonObject && object.data) {
    _html += `<div>Button Appearance</div>`;
  }


  return _html;
}

export default CloneDirective;
