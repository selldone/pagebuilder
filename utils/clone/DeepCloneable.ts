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

export abstract class DeepCloneable<T> {
  public clone(): T {
    const cloneDeep = (obj: any): any => {
      if (obj === null || typeof obj !== "object") {
        return obj;
      }

      if (Array.isArray(obj)) {
        return obj.map(cloneDeep);
      }

      if (obj instanceof Map) {
        return new Map(
          Array.from(obj.entries()).map(([k, v]) => [
            cloneDeep(k),
            cloneDeep(v),
          ]),
        );
      }

      if (obj instanceof Set) {
        return new Set(Array.from(obj.values()).map(cloneDeep));
      }

      if (obj.clone && typeof obj.clone === "function") {
        return obj.clone();
      }

      const clonedObj: any = new (obj.constructor as { new (): any })();
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = cloneDeep(obj[key]);
        }
      }
      return clonedObj;
    };

    const clonedInstance = new (this.constructor as { new (): T })();
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        clonedInstance[key] = cloneDeep(this[key]);
      }
    }

    return clonedInstance;
  }
}
