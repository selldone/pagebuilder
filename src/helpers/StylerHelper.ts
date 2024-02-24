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

import {ClassesHelper} from "@core/helper/style/Classes";

export class StylerHelper {
  static GetAnimationClassesDetail(classes, style) {
    if (!classes || !Array.isArray(classes)) return "";

    const _animations = classes
      .filter((x) => ClassesHelper.AnimationsClasses().includes(x))
      .unique();

    const _hovers = classes
      .filter((x) => ClassesHelper.HoversClasses().includes(x))
      .unique();

    return {
      animations: _animations,
      hovers: _hovers,
    };

    return (
      (_animations
        ? `<small class="ma-1"  title="Animation">🟢 ${_animations}</small>` +
          (style?.threshold
            ? `<small class="me-2">⚡ Threshold: <b>${
                style.threshold * 100
              }%</b></small>`
            : "")
        : "") +
      (_hovers ? `<small class="ma-1" title="Hover">🟡 ${_hovers}</small>` : "")
    );
  }

  static GetHovers(classes): string[] {
    if (!classes || !Array.isArray(classes)) return [];

    return classes
      .filter((x) => ClassesHelper.HoversClasses().includes(x))
      .unique();
  }

  static GetAnimations(classes): string[] {
    if (!classes || !Array.isArray(classes)) return [];

    return classes
      .filter((x) => ClassesHelper.AnimationsClasses().includes(x))
      .unique();
  }

  static GetThreshold(style): number {
    return style?.threshold;
  }
}
