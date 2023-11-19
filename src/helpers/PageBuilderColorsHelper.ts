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

export class PageBuilderColorsHelper {
  static PLATE_LIGHT_1 = "#70557e";
  static PLATE_DARK_1 = "#3a2c41"; // samin    colorSamin

  static PLATE_LIGHT_2 = "#e91e63";
  static PLATE_DARK_2 = "#d32f2f"; // pink colorPink

  static PLATE_LIGHT_3 = "#333333";
  static PLATE_DARK_3 = "#212121"; // black      colorBlack

  static PLATE_LIGHT_4 = "#afb42b";
  static PLATE_DARK_4 = "#388e3c"; //green    colorGreen

  static PLATE_LIGHT_5 = "#303f9f";
  static PLATE_DARK_5 = "#0288d1"; // blue    colorBlue

  static PLATE_LIGHT_6 = "#ffffff";
  static PLATE_DARK_6 = "#eeeeee"; // white    colorWhite

  static PLATE_LIGHT_7 = "#7b1fa2";
  static PLATE_DARK_7 = "#512da8"; // deep-purple  colorDeep-purple

  static PLATE_LIGHT_8 = "#0097a7";
  static PLATE_DARK_8 = "#00796b"; // teal

  static PLATE_LIGHT_9 = "#0288d1";
  static PLATE_DARK_9 = "#0097a7"; // colorCyan

  static PLATE_LIGHT_10 = "#ff5722";
  static PLATE_DARK_10 = "#ffa000"; // colorAmber

  static PLATE_LIGHT_11 = "#455a64";
  static PLATE_DARK_11 = "#374d57"; // colorBlue-grey

  static GenerateColorsStyle(style) {
    return {
      "--plate-light-1": style?.plate_light_1
        ? style.plate_light_1
        : this.PLATE_LIGHT_1,
      "--plate-dark-1": style?.plate_dark_1
        ? style.plate_dark_1
        : this.PLATE_DARK_1,
      "--plate-light-2": style?.plate_light_2
        ? style.plate_light_2
        : this.PLATE_LIGHT_2,
      "--plate-dark-2": style?.plate_dark_2
        ? style.plate_dark_2
        : this.PLATE_DARK_2,
      "--plate-light-3": style?.plate_light_3
        ? style.plate_light_3
        : this.PLATE_LIGHT_3,
      "--plate-dark-3": style?.plate_dark_3
        ? style.plate_dark_3
        : this.PLATE_DARK_3,
      "--plate-light-4": style?.plate_light_4
        ? style.plate_light_4
        : this.PLATE_LIGHT_4,
      "--plate-dark-4": style?.plate_dark_4
        ? style.plate_dark_4
        : this.PLATE_DARK_4,
      "--plate-light-5": style?.plate_light_5
        ? style.plate_light_5
        : this.PLATE_LIGHT_5,
      "--plate-dark-5": style?.plate_dark_5
        ? style.plate_dark_5
        : this.PLATE_DARK_5,
      "--plate-light-6": style?.plate_light_6
        ? style.plate_light_6
        : this.PLATE_LIGHT_6,
      "--plate-dark-6": style?.plate_dark_6
        ? style.plate_dark_6
        : this.PLATE_DARK_6,
      "--plate-light-7": style?.plate_light_7
        ? style.plate_light_7
        : this.PLATE_LIGHT_7,
      "--plate-dark-7": style?.plate_dark_7
        ? style.plate_dark_7
        : this.PLATE_DARK_7,
      "--plate-light-8": style?.plate_light_8
        ? style.plate_light_8
        : this.PLATE_LIGHT_8,
      "--plate-dark-8": style?.plate_dark_8
        ? style.plate_dark_8
        : this.PLATE_DARK_8,
      "--plate-light-9": style?.plate_light_9
        ? style.plate_light_9
        : this.PLATE_LIGHT_9,
      "--plate-dark-9": style?.plate_dark_9
        ? style.plate_dark_9
        : this.PLATE_DARK_9,
      "--plate-light-10": style?.plate_light_10
        ? style.plate_light_10
        : this.PLATE_LIGHT_10,
      "--plate-dark-10": style?.plate_dark_10
        ? style.plate_dark_10
        : this.PLATE_DARK_10,
      "--plate-light-11": style?.plate_light_11
        ? style.plate_light_11
        : this.PLATE_LIGHT_11,
      "--plate-dark-11": style?.plate_dark_11
        ? style.plate_dark_11
        : this.PLATE_DARK_11,
    };
  }

  static GetColorLight(style, index) {
    return this.ConvertToSixCharHex(
      style[`plate_light_` + index]
        ? style[`plate_light_` + index]
        : this[`PLATE_LIGHT_` + index]
    );
  }
  static GetColorDark(style, index) {
    return this.ConvertToSixCharHex(
      style[`plate_dark_` + index]
        ? style[`plate_dark_` + index]
        : this[`PLATE_DARK_` + index]
    );
  }

  static ConvertToSixCharHex(color) {
    if (color.length === 9) {
      // '#RRGGBBAA' format
      return "#" + color.slice(1, 7); // Slice from 1 to 7, removing the alpha channel
    } else if (color.length === 7) {
      // '#RRGGBB' format
      return color;
    }
    return null;
  }
}
