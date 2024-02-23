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

export namespace landing.settings {
  export enum IType {
    Group = "group",
    Boolean = "boolean",
    Enum = "enum",
  }
}

export class LandingSettingStructure {
  key: string;
  title: string;
  icon: string | null;
  type: landing.settings.IType;
  children?: LandingSettingStructure[];
  options: any;

  constructor(
    key: string,
    title: string,
    icon: string | null,
    type: landing.settings.IType,
    children: LandingSettingStructure[] | null,
    options: any,
  ) {
    this.key = key;
    this.title = title;
    this.icon = icon;
    this.type = type;
    this.children = children;
    this.options = options;
  }
}

/**
 * Make group items
 * @param title
 * @param children
 * @constructor
 */
export function LGroup(title: string, children: LandingSettingStructure[]) {
  return new LandingSettingStructure(
    title,
    title,
    null,
    landing.settings.IType.Group,
    children,
    null,
  );
}

export function LSwitch(key: string, title: string, icon: string | null) {
  return new LandingSettingStructure(
    key,
    title,
    icon,
    landing.settings.IType.Boolean,
    null,
    null,
  );
}

export function LSelect(
  key: string,
  title: string,
  icon: string | null,
  options: any[],
) {
  return new LandingSettingStructure(
    key,
    title,
    icon,
    landing.settings.IType.Enum,
    null,
    options,
  );
}
