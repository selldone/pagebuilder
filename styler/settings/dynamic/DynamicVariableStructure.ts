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

/**
 * A utility class to generate a dynamic structure from an object.
 * This structure can be used to create UI components or settings dynamically.
 */
export class DynamicVariableStructure {
  /**
   * Generates a structure definition for UI or settings based on a given object.
   *
   * @param default_structure - An optional predefined structure. If provided, it will be used directly.
   * @param default_value - The value object from which the structure is to be inferred.
   * @returns A structure object representing the UI/setting structure.
   */
  public static CreateSettingStructure(
    default_structure: Record<string, any> | null,
    default_value: Record<string, any> | null,
  ): Record<string, any> {
    // Use the provided default structure if it exists and has keys
    if (default_structure && Object.keys(default_structure).length) {
      return default_structure;
    }

    // If no default value is provided, return an empty structure
    if (!default_value) {
      return {};
    }

    // Infer the structure from the default_value
    const structure = Object.keys(default_value).reduce(
      (acc, key) => {
        const value = default_value[key];
        const type = this.GetValueType(value, key);

        acc[key] = {
          key: key,
          title: key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase()),
          type: type,
          ...(type === "object" && value
            ? { structure: this.CreateSettingStructure(null, value) }
            : {}),
          ...(type === "array" && Array.isArray(value) && value.length
            ? {
                structure: this.CalculateArrayStructure(value),
              }
            : {}),
        };

        return acc;
      },
      {} as Record<string, any>,
    );

    return structure;
  }

  /**
   * Determines the type of a given value.
   *
   * @param value - The value to analyze.
   * @param key
   * @returns A string representing the type, e.g., "string", "number", "array", etc.
   */
  public static GetValueType(value: any, key: string): string {
    /**
     * Checks if a string represents a valid hex color.
     *
     * @param value - The string to check.
     * @returns True if the string is a hex color, false otherwise.
     */
    function isHexColor(value: string|any): boolean {
      if (!value) return false;
      const hexColorRegex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
      return typeof value === "string" && hexColorRegex.test(value);
    }

    function isImage(value: string, key: string): boolean {
      console.log("isImage -> key:", key, "value:", value);

      // Define sets for faster lookup
      const imageKeys = new Set(['image', 'avatar']);
      const imageExtensions = new Set(['.svg', '.png', '.jpg', '.jpeg', '.webp']);

      // List of known placeholder services
      const placeholderServices = [
        'placeholder.com',
        'placehold.co',
        'placekitten.com',
        'via.placeholder.com',
        'dummyimage.com',
        'picsum.photos'
      ];

      // Normalize key and value to lowercase to ensure case-insensitive comparison
      const normalizedKey = key.toLowerCase();
      const normalizedValue = value.toLowerCase();

      // Check if the key indicates an image
      if (imageKeys.has(normalizedKey)) {
        return true;
      }

      // Check if the value ends with a known image extension
      for (const ext of imageExtensions) {
        if (normalizedValue.endsWith(ext)) {
          return true;
        }
      }

      // Check if the URL is from a known placeholder service
      for (const service of placeholderServices) {
        if (normalizedValue.includes(service)) {
          return true;
        }
      }

      // If none of the conditions are met, it's not an image
      return false;
    }


    if (typeof value === "string") {
      return isImage(value, key)
        ? "image"
        : isHexColor(value)
          ? "color"
          : "string";
    } else if (value === undefined || value === null) {
      return "string";
    } else if (typeof value === "number") {
      return "number";
    } else if (typeof value === "boolean") {
      return "boolean";
    } else if (Array.isArray(value)) {
      if (
        !value.length || // Empty arrays default to string arrays
        (value.length > 0 && typeof value[0] === "string")
      )
        return "combobox";
      return "array";
    } else if (typeof value === "object") {
      return "object";
    } else {
      return "unknown";
    }
  }

  /**
   * Calculates a unified structure for an array of objects.
   *
   * @param array - The array to analyze.
   * @returns A structure object representing the combined structure of the array's items.
   */
  private static CalculateArrayStructure(array: any[]): Record<string, any> {
    // Combine keys from all items in the array
    const combinedKeys = array.reduce((keys, item) => {
      if (typeof item === "object" && item !== null) {
        Object.keys(item).forEach((key) => keys.add(key));
      }
      return keys;
    }, new Set<string>());

    // Generate a structure for the combined keys
    const structure = Array.from(combinedKeys).reduce(
      (acc, key) => {
        const sampleValue = array.find(
          (item) => item && item[key] !== undefined,
        )?.[key];
        const type = this.GetValueType(sampleValue, key);

        acc[key] = {
          key: key,
          title: key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase()),
          type: type,
          ...(type === "object" && sampleValue
            ? { structure: this.CreateSettingStructure(null, sampleValue) }
            : {}),
          ...(type === "array" &&
          Array.isArray(sampleValue) &&
          sampleValue.length
            ? {
                structure: this.CalculateArrayStructure(sampleValue),
              }
            : {}),
        };

        return acc;
      },
      {} as Record<string, any>,
    );

    return structure;
  }
}
