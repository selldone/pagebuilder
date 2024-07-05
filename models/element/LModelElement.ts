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
import {isFunction} from "lodash-es";

export abstract class LModelElement<T> {
  component: string;

  id: string | null = null;

  background: LModelBackground;

  style: Record<string, any>;

  classes: string[];

  data: T;

  children: LModelElement<any>[];

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
  }

  addChild(
    element: LModelElement<any> | null,
    int: number | null = null,
  ): LModelElement<T> {
    if (!element) return this;
    if (int || int ===0) {
      this.children.splice(int, 0, element);
    } else {
      this.children.push(element);
    }

    return this;
  }

  // ━━━━━━━━━━━━━━━━━ ⚡ Life Cycle ━━━━━━━━━━━━━━━━━
  /**
   * This method is called before saving the element.
   */
  public callBeforeSave(){
    // Implement this method in the child class
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

  /**
   * Use to find corresponding element.
   */
  public $element: HTMLElement | null = null;

  // ━━━━━━━━━━━━━━━━━ 🍒 Clone ━━━━━━━━━━━━━━━━━
  public clone(): LModelElement<T> {
    const cloneBackground = this.background ? this.background.clone() : null;
    const cloneStyle = this.style ? JSON.parse(JSON.stringify(this.style)) : {};
    const cloneClasses = this.classes ? [...this.classes] : [];

    // If T is an object with a clone method, call it. Otherwise, shallow copy it.
    const cloneData =
      this.data && isFunction((this.data as any).clone)
        ? (this.data as any).clone()
        : null;
    console.log("Clone Data", cloneData);

    const cloneChildren = this.children.map((child) => child.clone());
    const cloneProps = this.props ? { ...this.props } : null;

    const clonedElement = new (this.constructor as any)(
      cloneBackground,
      cloneStyle,
      cloneClasses,
      cloneChildren,
      cloneData,
      cloneProps,
    );

    clonedElement.label = this.label;

    return clonedElement;
  }
}
