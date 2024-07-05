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
import {XRowObjectDataTypes} from "@selldone/page-builder/components/x/row/XRowObjectData.ts";

export class XProductsObjectData extends LModelData<XProductsObjectData> {
  align: XRowObjectDataTypes.IAlign = "start";
  justify: XRowObjectDataTypes.IJustify = "start";
  filter: XProductsObjectData.IFilter = {};

  constructor(params?: Partial<XProductsObjectData>) {
    super();

    this.align = params?.align ?? "start";
    this.justify = params?.justify ?? "start";
    this.filter = params?.filter ?? {};
  }

  // ━━━━━━━━━━━━━━━━━ 🟢 Setters ━━━━━━━━━━━━━━━━━
}

// ━━━━━━━━━━━━━━━━━ 🦫 Types ━━━━━━━━━━━━━━━━━

export namespace XProductsObjectData {
  export type IFilter = {
    /**
     * Number of items to fetch, corresponds to `this.forcePackage.count`.
     */
    count?: number;

    /**
     * Number of categories, typically used in the products section of a page builder.
     */
    categories_count?: number;

    /**
     * Sorting criteria.
     */
    sort?: string;

    /**
     * Indicates if only available products/categories should be fetched. Maps to `this.forcePackage.only_available`.
     */
    only_available?: boolean;

    /**
     * Search query string.
     */
    search?: string;

    /**
     * Type of search.
     */
    search_type?: string;

    /**
     * Direction for search. Default is "*", which forces a search across all products & categories.
     */
    dir?: string;

    /**
     * Filter criteria. If set, it's converted to a string using JSON.stringify.
     */
    filter?: Record<string, any>;

    /**
     * If true, fetches only products.
     */
    products_only?: boolean;

    /**
     * If true, fetches only categories.
     */
    categories_only?: boolean;

    /**
     * Array of directions.
     */
    dirs?: string[];

    /**
     * Bounds for searching, particularly in map views.
     */
    bounds?: Record<string, any>;

    /**
     * Tags associated with products or categories.
     */
    tags?: string[];

    /**
     * Specific vendor ID to fetch products for.
     */
    vendor_id?: number | string;

    /**
     * Some flag or condition (this needs more context for a clearer description).
     */
    surrounded?: boolean;
  };
}
