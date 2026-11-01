# Pre-built page templates

`LTemplatesList` owns the existing category/search catalog, pagination and full-page selection. Gallery and Picker opt into its modern presentation and the same `LTemplateCard`. The public Gallery keeps native preview and deployment destinations; its in-place preview opens the shared dialog in browse/deploy mode.

Open the focused selector from another component with:

```vue
<l-templates-picker-dialog
  v-model="choosePage"
  @select:page="loadPageTemplate"
/>
```

Import `LTemplatesPickerDialog` from `@selldone/page-builder/components/templates/picker/LTemplatesPickerDialog.vue`. It defaults to pre-built pages only. Selection loads the real full-page object, emits the existing `select:page` contract and closes; the caller decides how to use that page. It does not create, save or publish a page. `selectable=false` retains native Deploy actions instead. `initialTemplate` opens a catalog item's preview immediately. The optional activator slot forwards Vuetify's activator props for native focus restoration.

The existing editor's raw starters, generated raw-theme events and `template_id` deep links stay available through `LTemplatesList`'s original default props. The dialog ignores unrelated route deep links. Both views preserve premium checks and configured API/image helpers. Search covers all categories, and clearing it returns to the previously selected category. Requests retain 20 items per page; each instance owns and cancels its throttle. Changed queries and unmounted components ignore stale results. Missing or malformed responses remain retryable errors, distinct from a successful empty catalog.

Modern store setup opens this same dialog through **Templates gallery**, with `fullscreen` and `selectable=false`. It preserves the current shop's native template-to-editor actions, keeps setup in place while browsing and closes the dialog when the shop changes. Other callers retain the normal bounded dialog unless they explicitly request `fullscreen`; narrow screens remain full-screen by default.

The shared modern results container controls grid density for Gallery, embedded lists and both dialog sizes: one column below 520px of content width, then two at 520px, three at 820px, four at 1120px and five at 1440px. Container queries keep a bounded 1080px dialog at three columns even on a large monitor; a fullscreen picker expands to four or five. The public Gallery's existing 1200px outer cap naturally keeps it at four. Loading placeholders and raw starters use the same grid.

Run `node --test components/templates/templates.test.cjs` from this package (or use its full workspace path). Tests use synthetic catalog/page data and mocked requests. Do not select a real page merely for read-only UI verification: the content endpoint increments its usage counter. Catalog browsing and opening previews are separate from saving/deploying.
