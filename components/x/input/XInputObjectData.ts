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

import {LModelData} from "@selldone/page-builder/models/data/LModelData.ts";

export class XInputObjectData extends LModelData<XInputObjectData> {
  name: string;

  backgroundColor: string | null = null;
  color: string | null = null;
  flat: boolean = false;
  hint: string | null = null;
  label: string | null = null;
  messages: string | null = null;
  persistentPlaceholder: boolean = false;
  singleLine: boolean = true;
  hideDetails: boolean = false;
  placeholder: string | null = null;
  rounded: boolean = false;
  variant: XInputObjectDataTypes.IVariant | null = null;
  prependIcon: string | null = null;
  appendIcon: string | null = null;
  prependInnerIcon: string | null = null;
  appendInnerIcon: string | null = null;

  constructor(params: {
    name: string;
    [key: string]: any /*To allow extra properties*/;
  }) {
    super();
    this.name = params.name;
    // Assign provided properties to the class instance
    Object.assign(this, params);
  }

  // ━━━━━━━━━━━━━━━━━ ✨ Helper Methods ━━━━━━━━━━━━━━━━━

  // ━━━━━━━━━━━━━━━━━ 🟢 Setters ━━━━━━━━━━━━━━━━━

  public setName(name: string): this {
    this.name = name;
    return this;
  }

  public setBackgroundColor(backgroundColor: string | null): this {
    this.backgroundColor = backgroundColor;
    return this;
  }

  public setColor(color: string | null): this {
    this.color = color;
    return this;
  }

  public setFlat(flat: boolean): this {
    this.flat = flat;
    return this;
  }

  public setHint(hint: string | null): this {
    this.hint = hint;
    return this;
  }

  public setLabel(label: string | null): this {
    this.label = label;
    return this;
  }

  public setMessages(messages: string | null): this {
    this.messages = messages;
    return this;
  }

  public setPersistentPlaceholder(persistentPlaceholder: boolean): this {
    this.persistentPlaceholder = persistentPlaceholder;
    return this;
  }

  public setSingleLine(singleLine: boolean): this {
    this.singleLine = singleLine;
    return this;
  }

  public setHideDetails(hideDetails: boolean): this {
    this.hideDetails = hideDetails;
    return this;
  }

  public setPlaceholder(placeholder: string | null): this {
    this.placeholder = placeholder;
    return this;
  }

  public setRounded(rounded: boolean): this {
    this.rounded = rounded;
    return this;
  }

  public setVariant(variant: XInputObjectDataTypes.IVariant | null): this {
    this.variant = variant;
    return this;
  }

  public setPrependIcon(prependIcon: string | null): this {
    this.prependIcon = prependIcon;
    return this;
  }

  public setAppendIcon(appendIcon: string | null): this {
    this.appendIcon = appendIcon;
    return this;
  }

  public setPrependInnerIcon(prependInnerIcon: string | null): this {
    this.prependInnerIcon = prependInnerIcon;
    return this;
  }

  public setAppendInnerIcon(appendInnerIcon: string | null): this {
    this.appendInnerIcon = appendInnerIcon;
    return this;
  }
}

// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace XInputObjectDataTypes {
  export type IVariant =
    | "underlined"
    | "outlined"
    | "filled"
    | "solo"
    | "solo-inverted"
    | "solo-filled"
    | "plain";
}
