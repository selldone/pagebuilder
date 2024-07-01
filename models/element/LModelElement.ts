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
    this.style = style?style:{};
    this.classes = classes ? classes : [];
    this.children = children ? children : [];
    this.data = data;
    this.props = props;


  }

  addChild(element: LModelElement<any> | null) {
    if (!element) return;
    this.children.push(element);
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

}
