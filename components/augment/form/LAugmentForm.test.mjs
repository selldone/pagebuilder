import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import * as Vue from "vue";
import ts from "typescript";
import { parse, compileScript, compileTemplate, compileStyleAsync } from "@vue/compiler-sfc";

const filename = fileURLToPath(new URL("./LAugmentForm.vue", import.meta.url));
const { descriptor, errors } = parse(readFileSync(filename, "utf8"), { filename });
assert.deepEqual(errors, []);
const script = compileScript(descriptor, { id: "augment-form-test" });
const template = compileTemplate({ source: descriptor.template.content, filename, id: "augment-form-test",
  compilerOptions: { bindingMetadata: script.bindings } });
assert.deepEqual(template.errors, []);
const transpile = source => ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

// The application installs these array helpers; keep their relevant behavior in the isolated renderer.
Object.defineProperties(Array.prototype, {
  sortByKey: { configurable: true, value(key, ascending) {
    return this.sort((a, b) => String(a[key]).localeCompare(String(b[key])) * (ascending ? 1 : -1));
  } },
  remove: { configurable: true, value(item) { const index = this.indexOf(item); if (index >= 0) this.splice(index, 1); } },
});
const node = (type, text = "") => ({ type, text, props: {}, children: [], parent: null, focus() { this.focused = true; } });
const all = root => [root, ...root.children.flatMap(all)];
const hasClass = (entry, name) => String(entry.props.class || "").split(" ").includes(name);
const renderer = Vue.createRenderer({
  createElement: type => node(type), createText: text => node("text", text), createComment: text => node("comment", text),
  insert(child, parent, anchor = null) {
    if (child.parent) child.parent.children.splice(child.parent.children.indexOf(child), 1);
    parent.children.splice(anchor ? parent.children.indexOf(anchor) : parent.children.length, 0, child); child.parent = parent;
  },
  remove(child) { if (child.parent) child.parent.children.splice(child.parent.children.indexOf(child), 1); child.parent = null; },
  setText(entry, text) { entry.text = text; }, setElementText(entry, text) { entry.text = text; entry.children = []; },
  patchProp(entry, key, before, after) { entry.props[key] = after; }, parentNode: entry => entry.parent,
  nextSibling: entry => entry.parent?.children[entry.parent.children.indexOf(entry) + 1] || null,
});
const settle = async () => { await Vue.nextTick(); await Vue.nextTick(); };

function fixture(t, initial = [], options = {}) {
  const events = [], uploaders = [];
  const Uploader = Vue.defineComponent({ name: "SImageUploader", inheritAttrs: false,
    props: { image: String, server: String, disabled: Boolean, maxFileSize: String },
    setup(props, { attrs, emit }) {
      uploaders.push({ props, attrs, emit });
      return () => Vue.h("uploader", { ...attrs, ...props });
    },
  });
  const exports = {};
  const evaluate = source => new Function("exports", "require", "window", transpile(source))(exports,
    name => name === "vue" ? Vue : { default: name.includes("SImageUploader") ? Uploader : Vue.defineComponent({
      props: { name: String, size: Number }, setup: props => () => Vue.h("svg", { width: props.size, height: props.size }),
    }) },
    { API: { POST_SHOP_AUGMENT_UPLOAD_IMAGE: id => `/shops/${id}/augment/image` },
      VAPI: { POST_MY_VENDOR_AUGMENT_UPLOAD_IMAGE: id => `/vendors/${id}/augment/image` } });
  evaluate(script.content); const Form = exports.default;
  evaluate(template.code); Form.render = exports.render;
  const state = Vue.reactive({ values: initial, modern: true, disabled: false, loading: false, ...options });
  const holder = node("root"); let form;
  const app = renderer.createApp({ setup: () => () => Vue.h(Form, {
    ref: value => { form = value; }, modelValue: state.values, modern: state.modern, disabled: state.disabled, loading: state.loading,
    onChange: () => events.push(["change"]), "onUpload-busy": value => events.push(["upload-busy", value]),
    "onUpdate:modelValue": value => { state.values = value; },
  }) });
  const leaf = (name, gated = false) => Vue.defineComponent({ name, props: { modelValue: Boolean },
    setup(props, { attrs, slots }) { return () => gated && !props.modelValue ? null : Vue.h(name, attrs,
      [slots.activator?.({ props: {} }), slots.default?.()]); },
  });
  for (const name of ["VBtn", "VIcon", "VList", "VListItem", "VListItemTitle", "VListItemSubtitle", "VListSubheader", "VTable", "VTextField", "UWidgetHeader", "ULoadingProgress", "VTooltip"])
    app.component(name, leaf(name));
  for (const name of ["VMenu", "VDialog", "VBottomSheet"]) app.component(name, leaf(name, true));
  app.config.warnHandler = () => {};
  Object.assign(app.config.globalProperties, {
    $t: (key, params) => params?.count === undefined ? key : `${key}:${params.count}`,
    $route: options.route || { params: { shop_id: 7 }, matched: [] },
    getShopImagePath: path => `/images/${path}`, getName: key => key,
    GlobalRules: { counter: () => () => true },
    remove: (array, item) => array.remove(item),
  });
  app.mount(holder);
  // Native DOM focus/query behavior is the only missing host behavior in this renderer.
  form.$el.querySelector = selector => selector === '[aria-invalid="true"]'
    ? all(holder).find(entry => entry.props["aria-invalid"] === "true")
    : all(holder).find(entry => `#${entry.props.id}` === selector);
  t.after(() => app.unmount());
  return { state, events, uploaders, form, holder, nodes: name => all(holder).filter(entry => hasClass(entry, name)) };
}

test("modern key and text input update the current payload before blur and retain long HTML", async t => {
  const f = fixture(t, [{ key: "headline", type: "text", value: null, group: "Hero", group_index: 3, metadata: "keep" }]);
  const longHtml = `<p>${"content ".repeat(100)}</p>`;
  f.nodes("l-augment-form__key")[0].props.onInput({ target: { value: "new_headline" } });
  f.nodes("l-augment-form__text")[0].props.onInput({ target: { value: longHtml } });
  assert.equal(f.state.values[0].key, "new_headline");
  assert.equal(f.state.values[0].value, longHtml);
  assert.equal(f.state.values[0].metadata, "keep");
  assert.equal(f.events.filter(([event]) => event === "change").length, 2);
  assert.equal(f.nodes("l-augment-form__text")[0].props.maxlength, undefined);
  assert.equal(await f.form.prepareSave(), true);
});

test("first-value action adds text and focuses its key; editing then removing keeps the intended row", async t => {
  const f = fixture(t);
  const firstAction = all(f.nodes("l-augment-form__empty")[0]).find(entry => entry.type === "VBtn");
  firstAction.props.onClick(); await settle();
  assert.equal(f.state.values[0].type, "text");
  assert.equal(f.nodes("l-augment-form__key")[0].focused, true);
  f.state.values[0].key = "alpha";
  f.form.addImageItem(); await settle();
  const firstKey = f.nodes("l-augment-form__key")[0];
  assert.equal(firstKey.focused, true);
  firstKey.props.onInput({ target: { value: "zulu" } });
  firstKey.props.onBlur?.(); await settle();
  f.nodes("l-augment-form__remove")[0].props.onClick();
  assert.deepEqual(f.state.values.map(item => item.key), ["alpha"]);
});

test("modern save rejects empty, whitespace and overlong keys without altering drafts", async t => {
  const f = fixture(t, [{ key: "", type: "text", value: "draft" }]);
  assert.equal(await f.form.prepareSave(), false);
  assert.equal(f.nodes("l-augment-form__key")[0].focused, true);
  for (const key of ["   ", "x".repeat(33)]) {
    f.state.values[0].key = key;
    assert.equal(await f.form.prepareSave(), false);
    assert.equal(f.state.values[0].key, key);
  }
  f.state.values[0].key = "x".repeat(32);
  assert.equal(await f.form.prepareSave(), true);
});

test("reserved sources stay read-only and grouped ordering preserves metadata", async t => {
  const f = fixture(t, [
    { key: "z", group: "Later", group_index: 8, value: "later", type: "text", metadata: { label: "keep" } },
    { key: "vendor.name", group: "Earlier", group_index: 2, value: "vendor", type: "image" },
    { key: "include.title", group: "Earlier", group_index: 2, value: "include", type: "text" },
    { key: "product.title", value: "product", type: "text" },
  ]);
  assert.deepEqual(f.form.group_items.map(group => group.group), ["Others", "Earlier", "Later"]);
  assert.deepEqual(f.form.group_items[1].children.map(item => item.key), ["include.title", "vendor.name"]);
  assert.equal(f.nodes("l-augment-form__auto").length, 3);
  assert.equal(f.nodes("l-augment-form__text").length, 1);
  assert.equal(f.uploaders.length, 0);
  const reserved = f.state.values[1];
  f.form.setDraft(reserved, "value", "cannot overwrite");
  assert.equal(reserved.value, "vendor");
  assert.equal(f.state.values[0].metadata.label, "keep");
  assert.equal(await f.form.prepareSave(), true);
});

test("native image events block save through selection and processing and update only current rows", async t => {
  const f = fixture(t, [{ key: "photo", type: "image", value: "old.png" }]);
  const uploader = f.uploaders[0];
  assert.equal(uploader.props.maxFileSize, "2MB");
  assert.equal(uploader.props.server, "/shops/7/augment/image");
  uploader.emit("onAddFileStart", { id: "one" }); await settle();
  f.form.setDraft(f.state.values[0], "key", "product.image");
  assert.equal(f.state.values[0].key, "photo");
  assert.equal(await f.form.prepareSave(), false);
  assert.deepEqual(f.events.at(-1), ["upload-busy", true]);
  uploader.emit("onAddFile", { error: null }); uploader.emit("onProcessFileStart", {});
  assert.equal(await f.form.prepareSave(), false);
  uploader.emit("new-path", "new.png"); await settle();
  assert.equal(f.state.values[0].value, "new.png");
  assert.equal(await f.form.prepareSave(), true);
  assert.deepEqual(f.events.at(-1), ["upload-busy", false]);
  uploader.emit("onClear"); assert.equal(f.state.values[0].value, null);
  f.state.values = [{ key: "replacement", type: "text", value: "unchanged" }]; await settle();
  uploader.emit("new-path", "stale.png");
  assert.equal(f.state.values[0].value, "unchanged");
});

test("upload errors and aborts release busy state, while removal cannot discard an active upload", async t => {
  const f = fixture(t, [{ key: "photo", type: "image", value: "old.png" }], {
    route: { params: { vendor_id: 5 }, matched: [{ meta: { vendor: true } }] },
  });
  assert.equal(f.uploaders[0].props.server, "/vendors/5/augment/image");
  const item = f.state.values[0];
  for (const [event, payload] of [["onAddFile", { error: {} }], ["onProcessFileAbort", {}], ["onError", {}], ["onRemoveFile", {}]]) {
    f.uploaders[0].emit("onAddFileStart", {});
    f.form.removeItem(item);
    assert.equal(f.state.values.length, 1);
    f.uploaders[0].emit(event, payload); await settle();
    assert.equal(await f.form.prepareSave(), true);
  }
  f.form.removeItem(item); assert.equal(f.state.values.length, 0);
});

test("disabled and loading guard actual add, remove, key, text and image mutations", async t => {
  const f = fixture(t, [{ key: "headline", type: "text", value: "original" }]);
  const item = f.state.values[0];
  for (const property of ["disabled", "loading"]) {
    f.state[property] = true; await settle();
    f.form.addTextItem(); f.form.addImageItem(); f.form.removeItem(item);
    f.form.setDraft(item, "key", "changed"); f.form.setDraft(item, "value", "changed"); f.form.setImage(item, "changed.png");
    assert.equal(f.state.values.length, 1); assert.equal(item.key, "headline"); assert.equal(item.value, "original");
    assert.equal(f.nodes("l-augment-form__key")[0].props.disabled, true);
    assert.equal(f.nodes("l-augment-form__text")[0].props.disabled, true);
    assert.equal(await f.form.prepareSave(), false);
    f.state[property] = false; await settle();
  }
});

test("legacy defaults retain header, table, empty-key save and unchanged payload mutation", async t => {
  assert.equal(exportsDefault().props.modern.default, false);
  assert.equal(exportsDefault().props.disabled.default, false);
  const f = fixture(t, [], { modern: false });
  assert.equal(all(f.holder).filter(entry => entry.type === "UWidgetHeader").length, 1);
  assert.equal(all(f.holder).filter(entry => entry.type === "VTable").length, 1);
  assert.equal(f.nodes("l-augment-form--modern").length, 0);
  f.form.addTextItem();
  assert.deepEqual({ ...f.state.values[0] }, { key: "", value: null, type: "text" });
  assert.equal(await f.form.prepareSave(), true);
  f.form.addImageItem(); assert.equal(f.state.values[1].type, "image");
  f.form.removeItem(f.state.values[0]); assert.equal(f.state.values.length, 1);
});

function exportsDefault() {
  const exports = {};
  new Function("exports", "require", transpile(script.content))(exports, () => ({ default: {} }));
  return exports.default;
}

test("scoped modern SCSS compiles", async () => {
  const result = await compileStyleAsync({ source: descriptor.styles[0].content, filename,
    id: "data-v-augment-form-test", scoped: true, preprocessLang: "scss" });
  assert.deepEqual(result.errors, []);
});
