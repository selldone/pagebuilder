
# Product Listing Material - Limited Offers

### Page Builder Code
You can copy and paste the following code into the raw code section of the page builder.

```html
<!----vue---->
<v-sheet :color="properties?.background_color" style="overflow-x: auto;width: 100%" class="my-5 py-3 py-sm-5 mx-auto"
         :style="[$vuetify.display.xlAndUp?'border-radius:2rem;max-width:1720px;width:98%;':'',
                 {
                     '--height':properties?.height,
                     '--width':properties?.width,
                     '--image-height':'calc(var(--height) * 0.7)',
                     '--font-size-header':properties?.font_size_header,
                     '--font-size-text':properties?.font_size_text,

                 }]">
    <v-container fluid>
        <v-row class="flex-nowrap" align="stretch" justify="start">
            <v-col style="min-width: var(--width);max-width: var(--width)"
                   class="text-center d-flex flex-column align-center flex-grow-0">
                <v-spacer></v-spacer>
                <div>
                    <h3 class="my-3" style="font-size: var(--font-size-header)"><b>{{ properties?.title }}</b>
                    </h3>

                    <v-img :src="properties?.icon"
                           height="100px" width="100px" class="mx-auto my-3"></v-img>
                </div>
                <v-spacer></v-spacer>
                <v-btn color="#fff" variant="text" :to="getProductsListingTo()" target="_blank">
                    {{ properties?.action_offer }}

                    <span class="material-icons">  {{ properties?.action_offer_icon }} </span>
                </v-btn>
            </v-col>
            <v-col v-for="(product, index) in products" :key="index" class="pa-1 flex-grow-0 text-start">
                <v-card
                        style="width: var(--width);min-height: var(--height);height: 100%"
                        :rounded="index==0?'s-xl':undefined"
                        flat
                        :to="getProductTo(product)"
                >
                    <v-img :src="getImageUrl(product.icon)" height="var(--image-height)"  :cover="properties?.cover"></v-img>
                    <div class="d-flex justify-space-between pa-2">
                        <b>{{ product.price }}
                            {{ product.currency }}</b>
                        <v-chip color="red" size="x-small" variant="flat">
                            {{ Math.round(100 * (product.discount) / (product.price)) }}%
                        </v-chip>
                    </div>
                    <v-card-text class="text-wrap pb-2" style="font-size: var(--font-size-text);overflow: hidden;">{{ product.title }}</v-card-text>

                </v-card>
            </v-col>
            <v-col class="pa-1 flex-grow-0 pe-8">
                <v-card
                        style="width: var(--width);min-height: var(--height);height: 100%"
                        rounded="e-xl" class="d-flex flex-column align-center justify-center"
                        flat
                        :to="getProductsListingTo()"
                        target="_blank"
                >

                    <div style="height: 56px;width: 56px;border-radius: 50%;border: solid thin #eee"
                         class="d-flex align-center justify-center">
                                <span class="material-icons">
                                {{ properties?.action_more_icon }}
                                </span>
                    </div>

                    <div class="mt-5">

                        {{ properties?.action_more }}
                    </div>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</v-sheet>


<script>
 config = {
     props: {
         // This will be feed by landing builder if you want to build a dynamic and customizable landing section!
         properties: {
             default: () => ({
                 title: 'Incredible Offer Deal',
                 background_color:'#ef3c51',

                 limit: 10,
                 icon: 'https://cdn.selldone.com/app/shops/115/pages/1926/images/confettisvg967788a152da6f5a63ca8fef86119157.svg',
                 action_offer: 'More Info',
                 action_offer_icon: 'chevron_right',

                 action_more: 'View All',
                 action_more_icon: 'trending_flat',

                 height: '240px',
                 width:'200px',
                 font_size_header: '1.5rem',
                 font_size_text: '0.85rem',

                 cover:false,

                 with_limited_time:false
             }),
         },
     },
     data() {
         return {

             products: [],
             folders: []
         };
     },
     methods: {
         fetchProducts(dir, more, limit, options) {
             window.$storefront.products
                     .optimize(600) // Cache products for 600 seconds
                     .list(dir, more ? this.products.length : 0, limit, options)
                     .then(({products, folders}) => {
                         this.products = products;
                         this.folders = folders;
                     })
                     .catch((error) => {
                         console.error("Failed to fetch products:", error);
                     });
         },
         getImageUrl(path, size) {
             return window.CDN.GET_SHOP_IMAGE_PATH(path, size)
         },
         getProductTo(product) {
             return {
                 name: window.$storefront.routes.PRODUCT_PAGE,
                 params: {
                     product_id: product.id,
                 }
             }
         },
         getProductsListingTo() {
             return {
                 name: window.$storefront.routes.SHOP_PAGE,
                 query: {
                     search: '*',
                     sort: 'most_popular',
                     filter: JSON.stringify({only_has_discount: true})
                 }
             }
         }
     },
     created() {

         this.fetchProducts('*', false, this.properties?.limit, {
             categories_count: 0,
             with_parent: true,
             with_page: true,
             sort: 'random',
             available: false,
             search: null,
             search_type: null,
             dirs: null,
             filter: JSON.stringify({only_has_discount: true,limited_offer:this.properties?.with_limited_time}),
             products_only: false,
             categories_only: false,
             with_total: true,
             bounds: null,
             tags: null,
             vendor_id: null,
             surrounded: false
         })
     }
 }
</script>
```