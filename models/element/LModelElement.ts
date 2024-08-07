/*
 * Copyright (c) 2024. Selldone® Business OS™
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

import {LModelBackground} from "@selldone/page-builder/models/background/LModelBackground.ts";
import {isFunction, isObject} from "lodash-es";

// Define an interface for common functionality

export abstract class LModelElement<T> {
  /**
   * Represents a UI component.
   * @type {string}
   */
  component: string;

  /**
   * Unique identifier for the element.
   * @type {string | null}
   */
  id: string | null = null;

  /**
   * Background properties of the element.
   * @type {LModelBackground}
   */
  background: LModelBackground;

  /**
   * CSS style declarations for the element.
   * @type {Partial<CSSStyleDeclaration>}
   */
  style: Partial<CSSStyleDeclaration>;

  /**
   * CSS classes applied to the element.
   * @type {string[]}
   */
  classes: string[];

  /**
   * Custom data associated with the element.
   * @type {T}
   */
  data: T;

  /**
   * Child elements of the current element.
   * @type {LModelElement<any>[]}
   */
  children: LModelElement<any>[];

  /**
   * Additional properties for the element.
   * @type {Record<string, any> | null}
   */
  props: Record<string, any> | null;

  constructor(
    component: string,
    background: LModelBackground | null,
    style: any,
    classes: string[] | null,
    children: LModelElement<any>[] | null,
    data: T,
    props: Record<string, any> | null,
  ) {
    this.component = component;
    this.background = background ? background : new LModelBackground(null);
    this.style = style ? style : {};
    this.classes = classes ? classes : [];
    this.children = children ? children : [];
    this.data = data;
    this.props = props;

    // Fix issues:
    if (Array.isArray(this.style) || !isObject(this.style)) this.style = {};
    if (!Array.isArray(this.classes)) this.classes = [];
  }

  addChild(
    element: LModelElement<any> | null,
    int: number | null = null,
  ): LModelElement<T> {
    if (!element) return this;
    if (int >= 0 && int !== null) {
      this.children.splice(int, 0, element);
    } else {
      this.children.push(element);
    }

    return this;
  }

  removeChild(child: LModelElement<any> | null): LModelElement<T> {
    if (child) {
      this.children.splice(this.children.indexOf(child), 1);
    }

    return this;
  }

  // ━━━━━━━━━━━━━━━━━ ⚡ Life Cycle ━━━━━━━━━━━━━━━━━
  /**
   * This method is called before saving the element.
   */
  public callBeforeSave() {
    // Implement this method in the child class
  }

  // ━━━━━━━━━━━━━━━━━ Clone To ━━━━━━━━━━━━━━━━━
  public cloneAttributesTo(object: LModelElement<any>) {
    if (this.classes?.length) {
      object.classes = Object.assign([], this.classes);
    }

    if (this.style) {
      object.style = Object.assign({}, this.style);
    }

    if (this.background) {
      object.background = new LModelBackground(this.background);
    }
  }

  // ━━━━━━━━━━━━━━━━━ 🥽 Label ━━━━━━━━━━━━━━━━━

  /**
   * Optional.
   * We use label to identify the element when we want to find specific child element. For example when we want to find title, content elements in the {@see XColumnImageText}.
   * @private
   */
  private label: string | null = null;

  public setLabel(label: string | null): this {
    this.label = label;
    return this;
  }

  public getLabel(): string | null {
    return this.label;
  }

  public findChildByLabel(label: string): LModelElement<any> | null {
    return this.children.find((child) => child.getLabel() === label) || null;
  }

  // ━━━━━━━━━━━━━━━━━ ⌚ Temporary Variables (Should not save) ━━━━━━━━━━━━━━━━━

  /**
   * Use to find corresponding element.
   */
  public $element: HTMLElement | null = null;
  public __setExpand: Function | null = null;

  // ━━━━━━━━━━━━━━━━━ Helpers ━━━━━━━━━━━━━━━━━

  // Utility function to find all nested children of a specific type
  findChildrenOfType(
    object: LModelElement<T>,
    type: any,
    deep: boolean = true,
  ) {
    const results: LModelElement<T>[] = [];

    // Recursive function to navigate through all children
    function searchChildren(children: LModelElement<T>[]) {
      children.forEach((child) => {
        if (child instanceof type) {
          results.push(child);
        }
        if (deep && child.children) {
          searchChildren(child.children);
        }
      });
    }

    if (object.children) {
      searchChildren(object.children);
    }

    return results;
  }

  // ━━━━━━━━━━━━━━━━━ Sort ━━━━━━━━━━━━━━━━━

  sort(oldIndex: number, newIndex: number) {
    const child = this.children[oldIndex];
    if (!child) return;
    this.children.splice(oldIndex, 1);
    this.children.splice(newIndex, 0, child);
  }

  // ━━━━━━━━━━━━━━━━━ Interpreter ━━━━━━━━━━━━━━━━━

  /**
   * Convert JSON to Instance
   * This static method should be implemented in each subclass to ensure proper typing and instance creation.
   */
  protected static _JsonToInstance<T, U extends LModelElement<T>>(
    this: new (...args: any[]) => U,
    json: Record<string, any> | null,
    dataConstructor: new (data: any) => T,
  ): U {
    //console.log("_JsonToInstance -->", this, json);

    const style =
      json?.style && isObject(json?.style) && !Array.isArray(json?.style)
        ? json?.style
        : {};

    const classes = Array.isArray(json?.classes) ? json.classes : [];

    const props =
      json?.props && isObject(json?.props) && !Array.isArray(json?.props)
        ? json?.props
        : {};

    const instance = new this(
      new LModelBackground(json?.background),
      style,
      classes,
      [],
      new dataConstructor(json?.data), // Instantiate T using the constructor passed
      props,
    );
    instance.setLabel(json?.label || null);
    return instance;
  }

  /**
   * Export the element to JSON
   * Converts the instance to a JSON object.
   * @returns {object} The JSON representation of the instance.
   */
  toJson(): Record<string, any> {
    if (isFunction(this.callBeforeSave)) this.callBeforeSave();

    return {
      component: this.component,
      id: this.id,
      background: this.background,
      style: this.style,
      classes: this.classes,
      data: this.data,
      props: this.props,
      children: this.children.map((child) => child.toJson()),
      label: this.label,
    };
  }

  // ━━━━━━━━━━━━━━━━━ Apply Change By Json ━━━━━━━━━━━━━━━━━
  public updateObjectWithFeed(feed: any): void {
    if (!feed) return;
    this.updateRecursive(this, feed);
  }

  private updateRecursive(input: any, feed: any): void {
    for (const key in input) {
      if (input.hasOwnProperty(key) && feed.hasOwnProperty(key)) {
        if (typeof input[key] === 'object' && input[key] !== null && typeof feed[key] === 'object' && feed[key] !== null) {
          // Recursive call for nested objects
          this.updateRecursive(input[key], feed[key]);
        } else if ((typeof input[key] === 'string' || typeof input[key] === 'number') &&
            (typeof feed[key] === 'string' || typeof feed[key] === 'number')) {
          if (input[key] !== feed[key]) {
            console.log(`Match found. Replacing ${key}: "${input[key]}" with "${feed[key]}"`);
            input[key] = feed[key];
          }
        }
      }
    }
  }

}



// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace LModelElementTypes {
  export interface IModelElement {
    new (...args: any[]): LModelElement<any>; // Ensure constructor signature
    ComponentName: string; // Static property must be present
    JsonToInstance: (json: Record<string, any>) => LModelElement<any>; // Static method
  }
}
