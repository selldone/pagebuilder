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
import {Shop} from "@selldone/core-js";

export class XFormObjectData extends LModelData<XFormObjectData> {
  method: XFormObjectDataTypes.Methods = XFormObjectDataTypes.Methods.POST;
  url: string = "";
  hidden: XFormObjectDataTypes.IHidden = [];

  success: {
    title: string;
    message: string;
  } = {
    title: "Success",
    message: "Thank you for your submission.",
  };

  constructor(params: { method?: XFormObjectDataTypes.Methods; url?: string }) {
    super(); // Calling the constructor of the base class

    // Assigning default values if not provided
    this.method = params.method ?? XFormObjectDataTypes.Methods.POST;
    this.url = params.url ?? "";
  }

  // ━━━━━━━━━━━━━━━━━ ✨ Helper Methods ━━━━━━━━━━━━━━━━━

  public getGeneratedUrl(shop: Shop | null): string {
    // Dynamic URL generation based on the source:
    if (
      this.url ===
      XFormObjectDataTypes.SOURCE.SELLDONE_STREAM_NEWSLETTER_ENDPOINT
    ) {
      return window.XAPI.POST_STREAM_USER_ADD_NEWSLETTER(
        shop?.id /*Dynamic value will be replaced in the getGeneratedUrl method*/,
        "newsletter",
      );
    }

    if (shop) {
      return this.url
        .replace("{shop_id}", "" + shop.id)
        .replace("{shop_name}", "" + shop.name);
    }

    return this.url;
  }

  /**
   * Get the generated parameters for the form.
   * @param params The object of parameters set by inputs in the form.
   */
  public getGeneratedParams(params: Record<string, any>) {
    const hidden_params = this.hidden.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    if (this.method === "GET") {
      return {
        params: {
          ...hidden_params,
          ...params,
        },
      };
    } else {
      return {
        ...hidden_params,
        ...params,
      };
    }
  }

  public getMethod() {
    if (
      this.url ===
      XFormObjectDataTypes.SOURCE.SELLDONE_STREAM_NEWSLETTER_ENDPOINT
    ) {
      return XFormObjectDataTypes.Methods.POST;
    }
    return this.method;
  }

  // ━━━━━━━━━━━━━━━━━ 🟢 Setters ━━━━━━━━━━━━━━━━━
  public setMethod(method: XFormObjectDataTypes.Methods): XFormObjectData {
    this.method = method;
    return this;
  }

  public setUrl(url: string): XFormObjectData {
    this.url = url;
    return this;
  }

  public setSuccess(title: string, message: string): XFormObjectData {
    this.success.title = title;
    this.success.message = message;
    return this;
  }

  public setHidden(hidden: XFormObjectDataTypes.IHidden): XFormObjectData {
    this.hidden = hidden;
    return this;
  }
}

// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace XFormObjectDataTypes {
  export enum Methods {
    POST = "POST",
    GET = "GET",
  }

  export type IHidden = {
    type: "string" | "boolean" | "number" | "array";
    key: string;
    value: any;
  }[];

  export enum SOURCE {
    SELLDONE_STREAM_NEWSLETTER_ENDPOINT = "SELLDONE_STREAM_NEWSLETTER_ENDPOINT",
  }
}
