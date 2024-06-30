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

export class LModelInput {
  backgroundColor: string;
  color: string;
  variant: string;

  flat: boolean;
  hint: string;
  label: string;
  messages: string;
  persistentPlaceholder: boolean;
  placeholder: string;
  rounded: boolean;

  constructor(
    params?: {
      backgroundColor?: string;
      color?: string;
    //  dark?: boolean;
      filled?: boolean; // Deprecated!
      flat?: boolean;
      hint?: string;
      label?: string;
      messages?: string;
      outlined?: boolean; // Deprecated!
      persistentPlaceholder?: boolean;
      placeholder?: string;
      rounded?: boolean;
      solo?: boolean; // Deprecated!
      variant: string;
    } | null,
  ) {
    this.backgroundColor = params?.backgroundColor || null;
    this.color = params?.color || null;
    //this.dark = params?.dark || false;

    this.variant = params?.variant
      ? params?.variant
      : params?.solo && params?.filled
        ? "solo-filled"
        : params?.solo
          ? "solo"
          : params?.filled
            ? "filled"
            : params?.outlined
              ? "outlined"
              : "underlined";

    this.flat = params?.flat || false;
    this.hint = params?.hint || null;
    this.label = params?.label || "Find something...";
    this.messages = params?.messages || null;
    this.persistentPlaceholder = params?.persistentPlaceholder || false;
    this.placeholder = params?.placeholder || null;
    this.rounded = params?.rounded || false;
  }
}
