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

export const CssFiltersGallery = [
  {
    name: "Noisy",
    value: {
      brightness: 1,
      invert: 0,
      saturate: 1,
      sepia: 0,
      url: "#filter_grain",
      blur: 0,
      contrast: 1,
      grayscale: 0,
    },
  },
  {
    name: "Stained",
    value: {
      brightness: 1,
      invert: 0,
      saturate: 4,
      sepia: 0.85,
      url: "#filter_stained",
      blur: 0,
      contrast: 1,
      grayscale: 0,
    },
  },

  {
    name: "1977",
    value: {
      url: "#filter_grain",
      contrast: 1.1,
      brightness: 1.1,
      saturate: 1.3,
    },
  },

  {
    name: "watercolor",
    value: {
      brightness: 1.3,
      invert: 0.17,
      saturate: 2.6,
      sepia: 0.25,
      url: "#filter_squiggly",
    },
  },

  {
    name: "Aden",
    value: {
      contrast: 0.9,
      brightness: 1.2,
      saturate: 0.85,
      "hue-rotate": 20,
    },
  },

  {
    name: "Amaro",
    value: {
      contrast: 0.9,
      brightness: 1.1,
      saturate: 1.5,
      "hue-rotate": 350,
    },
  },

  {
    name: "Brannan",
    value: {
      contrast: 1.4,
      sepia: 0.5,
    },
  },

  {
    name: "Broolyn",
    value: {
      contrast: 0.9,
      brightness: 1.1,
    },
  },

  {
    name: "Earlybird",
    value: {
      contrast: 0.9,
      sepia: 0.2,
    },
  },

  {
    name: "Inkwell",
    value: {
      contrast: 1.1,
      brightness: 1.1,
      sepia: 0.3,
      grayscale: 1,
    },
  },

  {
    name: "Maven",
    value: {
      contrast: 0.95,
      brightness: 0.95,
      saturate: 1.5,
      sepia: 0.25,
    },
  },

  {
    name: "Rayes",
    value: {
      contrast: 0.85,
      brightness: 1.1,
      saturate: 0.75,
      sepia: 0.22,
    },
  },

  {
    name: "Toaster",
    value: {
      contrast: 1.5,
      brightness: 0.9,
    },
  },

  {
    name: "Walden",
    value: {
      brightness: 1.1,
      saturate: 1.6,
      sepia: 0.3,
      "hue-rotate": 350,
    },
  },

  {
    name: "faded-photo",
    value: {
      blur: 0.2,
      brightness: 1.1,
      "hue-rotate": 5,
      opacity: 0.9,
      saturate: 1.3,
      sepia: 0.4,
    },
  },
  {
    name: "old-horror",
    value: {
      url: "#filter_grain",
      grayscale: 1,
      sepia: 0.5,
      brightness: 1.3,
      invert: 0.8,
    },
  },
  {
    name: "old-grainy",
    value: {
      url: "#filter_grain",
      grayscale: 0.6,
      sepia: 0.5,
      brightness: 1.5,
    },
  },
  {
    name: "fade-out",
    value: {
      brightness: 0.8,
      "hue-rotate": 350,
      saturate: 3,
      blur: 1,
      contrast: 0.6,
    },
  },
  {
    name: "mist",
    value: {
      url: "#filter_fluffy",
      brightness: 0.8,
      saturate: 0.8,
    },
  },
  {
    name: "Gotham",
    value: {
      url: "#filter_gothamish",
      brightness: 1,
      saturate: 0.95,
      invert: 0,
      sepia: 0,
      opacity: 1,
    },
  },

  {
    name: "No filter",
    value: {},
  },
];

export class LUtilsFilter {
  static CalcFilter(filter) {
    if (!filter) return null;

    let out = "";
    Object.keys(filter).forEach((key) => {
      if (key === "hue-rotate") {
        out += `${key}(${filter[key]}deg) `;
      } else if (key === "blur") {
        out += `${key}(${filter[key]}px) `;
      } else if (key === "url") {
        out += `${key}('${filter[key]}') `;
      } else {
        out += `${key}(${filter[key]}) `;
      }
    });
    return out;
  }
}
