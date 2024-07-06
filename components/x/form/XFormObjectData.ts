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

  success: {
    title: string;
    message: string;
  } = {
    title: "Success",
    message: "Thank you for your submission.",
  };

  error: {
    title: string;
    message: string;
  } = {
    title: "Error",
    message: "An error occurred. Please try again.",
  };

  constructor(
    method: XFormObjectDataTypes.Methods = XFormObjectDataTypes.Methods.POST,
    url: string = "",
  ) {
    super();

    this.method = method;
    this.url = url;
  }

  // ━━━━━━━━━━━━━━━━━ ✨ Helper Methods ━━━━━━━━━━━━━━━━━

  public getGeneratedUrl(shop: Shop | null): string {
    if (shop) {
      return this.url
        .replace("{shop_id}", "" + shop.id)
        .replace("{shop_name}", "" + shop.name);
    }

    return this.url;
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

  public setError(title: string, message: string): XFormObjectData {
    this.error.title = title;
    this.error.message = message;
    return this;
  }
}

// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace XFormObjectDataTypes {
  export enum Methods {
    POST = "POST",
    GET = "GET",
  }
}
