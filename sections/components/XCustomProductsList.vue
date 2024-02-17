<!--
  - Copyright (c) 2023. Selldone® Business OS™
  -
  - Author: M.Pajuhaan
  - Web: https://selldone.com
  - ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  -
  - All rights reserved. In the weave of time, where traditions and innovations intermingle, this content was crafted.
  - From the essence of thought, through the corridors of creativity, each word, and sentiment has been molded.
  - Not just to exist, but to inspire. Like an artist's stroke or a sculptor's chisel, every nuance is deliberate.
  - Our journey is not just about reaching a destination, but about creating a masterpiece.
  - Tread carefully, for you're treading on dreams.
  -->

<template>
  <x-container :object="$sectionData">
    <x-row :object="$sectionData" path="$sectionData" has-arrangement has-wrap>
      <slot name="folders" :folders="folders"></slot>

      <slot name="products" :products="products"></slot>
    </x-row>
  </x-container>
</template>

<script>
export default {
  name: "XCustomProductsList",
  emits: ["update"],
  props: {
    forcePackage: {},
  },

  data: () => ({
    busy_fetch: false,

    products: [],
    folders: [],
  }),

  computed: {
    shop() {
      return this.getShop();
    },
  },
  watch: {
    forcePackage() {
      return this.fetchData();
    },
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.busy_fetch = true;

      let limit,
        categories_count,
        sort,
        available,
        search,
        search_type,
        dir,
        filter,
        products_only,
        categories_only,
        dirs,
        bounds,
        tags,
        vendor_id,
        surrounded;

      limit = this.forcePackage.count;
      categories_count = this.forcePackage.categories_count; // In page builder! Products section!
      sort = this.forcePackage.sort;
      available = this.forcePackage.only_available;
      search = this.forcePackage.search;
      search_type = this.forcePackage.search_type;
      dir = "*"; //this.forcePackage.dir Force search in all products & categories!
      filter = this.forcePackage.filter
        ? JSON.stringify(this.forcePackage.filter)
        : null;
      products_only = this.forcePackage.products_only;
      categories_only = this.forcePackage.categories_only;
      dirs = this.forcePackage.dirs;

      bounds = this.forcePackage.bounds;

      tags = this.forcePackage.tags;
      vendor_id = this.forcePackage.vendor_id;
      surrounded = this.forcePackage.surrounded;

      axios
        .get(window.XAPI.GET_PRODUCTS(this.shop.name), {
          params: {
            offset: 0,
            limit: limit,
            categories_count: categories_count,

            with_parent: false,

            sort: sort,
            available: available,
            search: search,
            search_type: search_type,

            dir: dir,
            dirs: dirs,

            filter: filter, //filter

            products_only: products_only, // Only products if load more!
            categories_only: categories_only,

            with_total: false,

            bounds: bounds, // Location constraints

            tags: tags, //Filter by tags
            vendor_id: vendor_id, // Show only for this vendor!

            surrounded: surrounded, // true:Show only selected categories. false: Show items inside selected categories.
          },
        })
        .then(({ data }) => {
          if (data.error) {
            return this.showErrorAlert(null, data.error_msg);
          }

          this.products = data.products;
          this.folders = data.folders;
          this.$nextTick(() => {
            this.$emit("update", {
              categories: this.folders,
              products: this.products,
            });
          });
        })
        .catch((error) => {
          this.showLaravelError(error);
        })

        .finally(() => {
          this.busy_fetch = false;
        });
    },
  },
};
</script>

<style scoped></style>
