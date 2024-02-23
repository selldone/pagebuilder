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

import {LandingSettingStructure, LGroup, LSelect, LSwitch,} from "@app-page-builder/sections/LandingSettingStructure";

export const SlideStructure: LandingSettingStructure[] = [
  LGroup("Appearance", [
    LSelect("direction", "Slides direction", "turn_slight_right", [
      {
        value: "horizontal",
        icon: "horizontal_distribute",
      },
      { value: "vertical",
        icon: "vertical_distribute" },
    ]),

    LSwitch("grabCursor", "Grab cursor", "mouse"),
  ]),
];
