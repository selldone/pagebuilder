const assert = require("node:assert/strict");
const { existsSync, readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const Vue = require("vue");
const { JSDOM } = require("jsdom");
const ts = require("typescript");
const {
  parse,
  compileScript,
  compileTemplate,
  compileStyleAsync,
} = require("@vue/compiler-sfc");

const packages = path.resolve(__dirname, "../../..");
const files = {
  list: path.join(__dirname, "list/LTemplatesList.vue"),
  card: path.join(__dirname, "card/LTemplateCard.vue"),
  dialog: path.join(__dirname, "picker/LTemplatesPickerDialog.vue"),
  code: path.join(packages, "page-builder/components/x/code/XCode.vue"),
};
const flatten = (element) => [element, ...element.children.flatMap(flatten)];
const evaluate = (source, globals, exports = {}) => {
  const result = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    reportDiagnostics: true,
  });
  assert.deepEqual(result.diagnostics, []);
  vm.runInNewContext(result.outputText, { exports, ...globals });
  return exports;
};

// Mount the real picker and native starter section models with isolated transport and UI leaves.
async function fixture(t, options = {}) {
  const document = new JSDOM("<main></main>").window.document;
  const opener = document.createElement("button");
  opener.textContent = "Choose template";
  document.body.prepend(opener);
  if (options.focusOpener) opener.focus();
  const requests = [],
    events = [],
    notifications = [],
    bus = [],
    instances = {};
  const failures = [],
    sources = [],
    controls = [],
    dialogs = [],
    cache = new Map();
  const state = Vue.reactive({
    open: true,
    premium: true,
    modern: true,
    template: {
      id: 12,
      name: "Example page",
      image: "example.jpg",
      preview: "/preview/example",
      premium: false,
      hot: true,
    },
    ...options,
  });
  const route = Vue.reactive(options.route || { params: {}, query: {} });
  const lodash = await import("lodash-es");
  const eventBus = { $emit: (...args) => bus.push(args) };
  const globals = {
    document,
    DOMParser: document.defaultView.DOMParser,
    URL,
    window: {
      SERACH_THROTTLE: 15,
      GAPI: { GET_PAGE_BUILDER_TEMPLATES: () => "/isolated/templates" },
      API: {
        GET_PAGE_BUILDER_TEMPLATE_CONTENT: (id) => "/isolated/templates/" + id,
      },
      CDN: { GET_SHOP_IMAGE_PATH: (image) => "/isolated/images/" + image },
    },
    axios: {
      get: (url, config) =>
        new Promise((resolve, reject) =>
          requests.push({
            url,
            config,
            resolve: (data) => resolve({ data }),
            reject,
          }),
        ),
    },
  };
  const dependency = (name, from) => {
    if (name === "vue" || name === "vue/dist/vue.esm-bundler.js") return Vue;
    if (from === files.code && /LMixinXComponent|StylerDirective|DynamicScriptDirective/.test(name))
      return {};
    if (name === "lodash-es") return lodash;
    if (name.includes("NotificationService"))
      return {
        showErrorAlert: (...args) => notifications.push(["server", ...args]),
        showLaravelError: (...args) => notifications.push(["transport", ...args]),
      };
    if (name.endsWith("/BEventBusMixin.ts"))
      return loadModule(
        path.join(packages, "components-vue/utils/events/BEventBusMixin.ts"),
      );
    if (name.endsWith("/EventBus.ts")) return { EventBus: eventBus };
    if (name.endsWith("LTemplateCard.vue")) return load(files.card);
    if (name.endsWith("LTemplatesList.vue")) return load(files.list);
    if (name.endsWith("LPageViewer.vue")) {
      return Vue.defineComponent({
        name: "LPageViewer",
        props: ["initialPageData", "customFonts"],
        setup(props) {
          return () => Vue.h("div", props.initialPageData.sections.map(({ uid, object }) => {
            const children = flatten(object).map(({ component, data }) => {
              if (component === "XText") return Vue.h(data.tag, data.value);
              if (component === "XButton" && data.href) {
                return Vue.h("a", { href: data.href }, data.content);
              }
              if (component === "XForm") {
                return Vue.h("form", { onSubmit: () => events.push(["submit"]) }, [
                  Vue.h("button", { type: "submit" }, "Submit"),
                ]);
              }
              if (component === "XCode" && data.mode === "html") {
                return Vue.h("div", {
                  "data-html-block": "",
                  innerHTML: data.code,
                });
              }
              if (component === "XCode" && data.mode === "vue") {
                const { component: compiled } = starterCode(data.code);
                return Vue.h("div", { "data-vue-block": "" }, [
                  Vue.h(compiled, { properties: data.properties }),
                ]);
              }
            });
            return Vue.h("section", { id: uid }, children);
          }));
        },
      });
    }
    if (name.endsWith(".vue")) return leaf("div");
    if (/\.(jpg|svg|png|webp)$/.test(name)) return "/isolated/asset.svg";
    if (name.endsWith("/SetupService.ts"))
      return {
        SetupService: { MainServiceUrl: () => "https://platform.example" },
      };
    if (["@selldone/core-js", "@selldone/core-js/helper"].includes(name))
      return { CONSOLE: { log() {}, style() {} } };
    const pageBuilder = path.join(packages, "page-builder") + path.sep;
    const source = name.startsWith("@selldone/page-builder/")
      ? path.join(packages, name.slice("@selldone/".length))
      : from?.startsWith(pageBuilder) && name.startsWith(".")
        ? path.resolve(path.dirname(from), name)
        : null;
    if (source) {
      const file = source.endsWith(".ts") ? source : `${source}.ts`;
      if (existsSync(file)) return loadModule(file);
    }
    return {};
  };
  function loadModule(file) {
    if (!cache.has(file)) {
      const exported = {};
      cache.set(file, exported);
      evaluate(
        readFileSync(file, "utf8"),
        { ...globals, require: (name) => dependency(name, file) },
        exported,
      );
    }
    return cache.get(file);
  }
  function load(file) {
    if (cache.has(file)) return cache.get(file);
    const result = parse(readFileSync(file, "utf8"), { filename: file });
    assert.deepEqual(result.errors, []);
    const descriptor = result.descriptor;
    sources.push({ file, descriptor });
    const script = compileScript(descriptor, { id: "templates-test" });
    const component = evaluate(script.content, {
      ...globals,
      require: (name) => dependency(name, file),
    }).default;
    const template = compileTemplate({
      source: descriptor.template.content,
      filename: file,
      id: "templates-test",
      compilerOptions: { bindingMetadata: script.bindings },
    });
    assert.deepEqual(template.errors, []);
    component.render = evaluate(template.code, {
      ...globals,
      require: (name) => dependency(name, file),
    }).render;
    const created = component.created;
    component.created = function () {
      (instances[component.name] ||= []).push(this);
      created?.call(this);
    };
    cache.set(file, component);
    return component;
  }
  const generatedCode = new Map();
  function starterCode(source) {
    if (!generatedCode.has(source)) {
      const { methods } = load(files.code);
      const host = { parseHTML: methods.parseHTML };
      // Exercise the same prop factories and runtime template extraction as Raw HTML.
      const definition = methods.generateComponent.call(host, source);
      const template = compileTemplate({
        source: definition.template,
        filename: files.code,
        id: "starter-vue",
      });
      assert.deepEqual(template.errors, []);
      const { render } = evaluate(template.code, { require: () => Vue });
      generatedCode.set(source, {
        component: Vue.markRaw({ ...definition, render }),
        defaults: host.defaultValues,
        structure: host.structure,
      });
    }
    return generatedCode.get(source);
  }
  const renderer = Vue.createRenderer({
    createElement: (tag) => document.createElement(tag),
    createText: (value) => document.createTextNode(value),
    createComment: (value) => document.createComment(value),
    setText: (node, value) => {
      node.nodeValue = value;
    },
    setElementText: (node, value) => {
      node.textContent = value;
    },
    parentNode: (node) => node.parentNode,
    nextSibling: (node) => node.nextSibling,
    insert: (node, parent, anchor = null) => parent.insertBefore(node, anchor),
    remove: (node) => node.parentNode?.removeChild(node),
    patchProp(node, key, previous, value) {
      if (/^on[A-Z]/.test(key)) {
        const capture = key.endsWith("Capture");
        const event = key.slice(2).replace(/Capture$/, "").toLowerCase();
        node.listeners ||= {};
        if (node.listeners[key])
          node.removeEventListener(event, node.listeners[key], capture);
        if (value) {
          node.listeners[key] = (e) =>
            (Array.isArray(value) ? value : [value]).forEach((handler) =>
              handler(e),
            );
          node.addEventListener(event, node.listeners[key], capture);
        }
      } else if (key === "style" && value && typeof value === "object")
        Object.assign(node.style, value);
      else if (key === "innerHTML") node.innerHTML = value ?? "";
      else if (value == null || value === false) node.removeAttribute(key);
      else node.setAttribute(key, String(value));
    },
  });
  const leaf = (tag, marker) =>
    Vue.defineComponent({
      inheritAttrs: false,
      setup:
        (_, { attrs, slots }) =>
        () =>
          Vue.h(
            tag,
            { ...attrs, ...(marker ? { "data-ui-leaf": marker } : {}) },
            [slots.activator?.({ props: {} }), slots.default?.()],
          ),
    });
  const entry = load(files[options.kind || "list"]);
  let context;
  const props = () =>
    options.kind === "card"
      ? {
          template: state.template,
          modern: state.modern,
          selection: !!state.selection,
          clickable: !!state.clickable,
          loading: !!state.loading,
          disabled: !!state.disabled,
          to: state.to,
        }
      : options.kind === "dialog"
        ? {
            modelValue: state.open,
            initialTemplate: state.initialTemplate,
            selectable: state.selectable,
          }
        : {
            modern: state.modern,
            hasRawTemplates: !!state.raw,
            clickable: !!state.clickable,
            ...options.listProps,
          };
  const app = renderer.createApp({
    render: () =>
      Vue.h(entry, {
        ...props(),
        ref: (value) => {
          context = value;
        },
        onSelect: (...args) => events.push(["select", ...args]),
        onPreview: (...args) => events.push(["preview", ...args]),
        "onSelect:page": (...args) => events.push(["select:page", ...args]),
        "onSelect:raw-theme": (...args) =>
          events.push(["select:raw-theme", ...args]),
        "onUpdate:modelValue": (value) => {
          events.push(["update:modelValue", value]);
          state.open = value;
        },
        "onUpdate:busy": (value) => events.push(["update:busy", value]),
      }),
  });
  app.mixin(
    loadModule(path.join(packages, "components-vue/mixin/CoreMixin.ts"))
      .default,
  );
  const locale = options.locale || "en";
  const dictionary = (group) =>
    evaluate(
      readFileSync(
        path.join(packages, "translate", group, locale + ".ts"),
        "utf8",
      ),
      { require: () => ({}) },
    ).default;
  const messages = { ...dictionary("dashboard"), global: dictionary("global") };
  Object.assign(app.config.globalProperties, {
    $route: route,
    $store: {
      getters: {
        get getUser() {
          return { id: 7, premium: state.premium };
        },
      },
    },
    $vuetify: {
      display: { mdAndDown: false, smAndUp: true, xs: false },
      locale: { isRtl: locale === "fa" },
    },
    $t: (key, params) => {
      let value =
        key.split(".").reduce((item, part) => item?.[part], messages) ?? key;
      for (const [name, replacement] of Object.entries(params || {}))
        value = String(value).replaceAll("{" + name + "}", String(replacement));
      return value;
    },
    $n: (value) => new Intl.NumberFormat(locale).format(value),
  });
  const tags = new Set(
    sources.flatMap(({ descriptor }) =>
      [...descriptor.template.content.matchAll(/<(v-[\w-]+|u-[\w-]+)/g)].map(
        (match) => match[1],
      ),
    ),
  );
  for (const tag of tags) {
    if (["v-btn", "v-dialog", "v-text-field"].includes(tag)) continue;
    app.component(tag, leaf(tag === "v-icon" ? "span" : "div", tag));
  }
  app.component(
    "v-btn",
    Vue.defineComponent({
      inheritAttrs: false,
      setup:
        (_, { attrs, slots }) =>
        () => {
          controls.push(attrs);
          return Vue.h(
            attrs.href || attrs.to ? "a" : "button",
            attrs,
            slots.default?.(),
          );
        },
    }),
  );
  app.component(
    "v-dialog",
    Vue.defineComponent({
      inheritAttrs: false,
      props: ["modelValue", "persistent"],
      setup(props, { attrs, slots }) {
        dialogs.push({ props, afterLeave: () => attrs.onAfterLeave?.() });
        return () =>
          props.modelValue
            ? Vue.h(
                "section",
                { ...attrs, "data-dialog": "" },
                slots.default?.(),
              )
            : null;
      },
    }),
  );
  app.component(
    "v-text-field",
    Vue.defineComponent({
      inheritAttrs: false,
      props: ["modelValue", "disabled", "placeholder"],
      emits: ["update:modelValue"],
      setup:
        (props, { attrs, emit }) =>
        () =>
          Vue.h("div", attrs, [
            Vue.h("input", {
              value: props.modelValue || "",
              disabled: props.disabled,
              placeholder: props.placeholder,
              onInput: (event) => emit("update:modelValue", event.target.value),
            }),
          ]),
    }),
  );
  app.config.warnHandler = (message) => {
    throw new Error(message);
  };
  app.config.errorHandler = (error) => failures.push(error);
  app.mount(document.querySelector("main"));
  const tick = async () => {
    await Vue.nextTick();
    await Promise.resolve();
    await Vue.nextTick();
    assert.deepEqual(
      failures,
      [],
      "render errors and rejected handlers must fail",
    );
  };
  await tick();
  let mounted = true;
  const destroy = () => {
    if (mounted) {
      mounted = false;
      app.unmount();
    }
  };
  t.after(destroy);
  return {
    app,
    document,
    opener,
    state,
    route,
    requests,
    events,
    notifications,
    bus,
    instances,
    sources,
    controls,
    dialogs,
    starterCode,
    context: () => context,
    tick,
    destroy,
    click: async (selector) => {
      const target = document.querySelector(selector);
      assert.ok(target, "Missing control: " + selector);
      target.click();
      await tick();
    },
  };
}

test("modern cards keep premium checks in the actual mixin and emit one selection", async (t) => {
  const f = await fixture(t, {
    kind: "card",
    selection: true,
    premium: false,
    template: {
      id: 12,
      name: "Premium page",
      premium: true,
      image: null,
    },
  });
  assert.match(f.document.body.textContent, /Thumbnail unavailable/);
  await f.click(".l-template-card-modern__actions button:last-child");
  assert.equal(
    f.bus.filter(([event]) => event === "need-premium-subscription").length,
    1,
  );
  assert.equal(f.events.filter(([event]) => event === "select").length, 0);
  f.state.premium = true;
  await f.tick();
  await f.click(".l-template-card-modern__actions button:last-child");
  assert.equal(f.events.filter(([event]) => event === "select").length, 1);
  f.state.loading = true;
  await f.tick();
  assert.equal(
    f.document.querySelectorAll('[data-ui-leaf="u-loading-progress"]').length,
    1,
  );
  await f.click(".l-template-card-modern__actions button:last-child");
  assert.equal(f.events.filter(([event]) => event === "select").length, 1);
  f.state.loading = false;
  f.state.disabled = true;
  await f.tick();
  await f.click(".l-template-card-modern__actions button:last-child");
  await f.click(".l-template-card-modern__actions button:first-child");
  await f.click(".l-template-card-modern__preview");
  assert.equal(f.events.filter(([event]) => event === "select").length, 1);
  assert.equal(f.events.filter(([event]) => event === "preview").length, 0);
  assert.equal(
    f.document.querySelectorAll('[data-ui-leaf="u-loading-progress"]').length,
    0,
  );
});

test("modern Gallery keeps public/shop deployment destinations and preview separate", async (t) => {
  const f = await fixture(t, { kind: "card" });
  const link = f.document.querySelector("a");
  assert.equal(
    link.getAttribute("href"),
    "/magic-links/shop:pages:template?template_id=12",
  );
  assert.equal(link.getAttribute("target"), "_blank");
  assert.equal(link.getAttribute("rel"), "noopener noreferrer");
  await f.click(".l-template-card-modern__preview");
  assert.equal(f.events.filter(([event]) => event === "preview").length, 1);
  assert.equal(f.events.filter(([event]) => event === "select").length, 0);
  assert.equal(f.requests.length, 0);
  f.route.params.shop_id = 42;
  await f.tick();
  const shopLink = f.controls.findLast((attrs) => attrs.to);
  assert.equal(shopLink.to.name, "BPageLandingEditor");
  assert.equal(shopLink.to.params.page_id, "new");
  assert.equal(shopLink.to.query.template_id, 12);
});

const rows = () => [
  { id: 10, name: "First page", image: null, preview: "/preview/10" },
  {
    id: 11,
    name: "Second page",
    image: "second.jpg",
    premium: true,
    hot: true,
  },
];
const catalog = (data = rows(), total = data.length) => ({
  error: false,
  templates: data,
  total,
});
const fullPage = (title, sections = []) => ({
  content: { title, sections },
  css: {},
  direction: "ltr",
});

test("catalog preserves the 20-item query, native pagination and category after clearing global search", async (t) => {
  const f = await fixture(t);
  assert.equal(f.requests.length, 1);
  assert.equal(f.requests[0].config.params.limit, 20);
  assert.equal(f.requests[0].config.params.offset, 0);
  assert.equal(f.requests[0].config.params.category, "*");
  f.requests[0].resolve(catalog(rows(), 45));
  await f.tick();
  assert.equal(f.context().page_count, 3);
  f.context().page = 2;
  f.context().fetchTemplates();
  assert.equal(f.requests.at(-1).config.params.offset, 20);
  f.context().selected_category = "food";
  await f.tick();
  assert.equal(f.requests.at(-1).config.params.category, "food");
  assert.equal(f.requests.at(-1).config.params.offset, 0);
  f.context().search = "launch";
  await f.tick();
  assert.equal(f.requests.at(-1).config.params.search, "launch");
  assert.match(
    f.document.body.textContent,
    /Search results across all categories/,
  );
  f.context().search = null;
  await f.tick();
  f.context().searchThrottled.flush();
  assert.equal(f.context().selected_category, "food");
  assert.equal(f.requests.at(-1).config.params.category, "food");
  assert.equal(f.requests.at(-1).config.params.search, null);
});

test("late catalog responses cannot replace the current category and refresh keeps loaded rows", async (t) => {
  const f = await fixture(t);
  const old = f.requests[0];
  f.context().selected_category = "health";
  await f.tick();
  const current = f.requests.at(-1);
  assert.equal(f.context().templates, null);
  current.resolve(catalog(rows()));
  await f.tick();
  assert.equal(
    f.document.querySelectorAll(".l-template-card-modern").length,
    2,
  );
  old.resolve(catalog([{ id: 99, name: "Stale page" }], 99));
  await f.tick();
  assert.equal(f.context().templates[0].id, 10);
  assert.equal(f.context().total, 2);
  f.context().fetchTemplates();
  assert.equal(
    f.context().templates[0].id,
    10,
    "same-scope refresh retains valid loaded data",
  );
  assert.equal(f.context().busy_fetch, true);
  f.requests.at(-1).resolve(catalog([], 0));
  await f.tick();
  assert.equal(
    f.document.querySelectorAll(".l-template-card-modern").length,
    0,
  );
  assert.match(f.document.body.textContent, /No templates found/);
});

test("legacy refresh retains rows but cannot select stale content while the catalog is pending", async (t) => {
  const f = await fixture(t, { modern: false, clickable: true });
  f.requests[0].resolve(catalog(rows(), 40));
  await f.tick();
  const list = f.context();
  list.page = 2;
  list.fetchTemplates();
  assert.equal(list.templates[0].id, 10);
  const refresh = f.requests.at(-1);
  list.loadTemplate(rows()[0]);
  assert.equal(
    f.requests.length,
    2,
    "refresh blocks content requests from retained rows",
  );
  refresh.resolve(catalog(rows(), 40));
  await f.tick();
  list.loadTemplate(rows()[0]);
  assert.equal(f.requests.length, 3);
  assert.equal(f.requests.at(-1).url, "/isolated/templates/10");
  f.requests.at(-1).resolve({ error: false, page: fullPage("After refresh") });
  await f.tick();
  assert.equal(f.events.filter(([event]) => event === "select:page").length, 1);
});

test("Back from preview restores the original card, with search as the absent-card fallback", async (t) => {
  const f = await fixture(t);
  f.requests[0].resolve(catalog(rows()));
  await f.tick();
  await f.click(".l-template-card-modern__preview");
  assert.ok(f.document.querySelector(".l-templates-modern__detail"));
  await f.click(".l-templates-modern__back");
  assert.equal(f.document.querySelector(".l-templates-modern__detail"), null);
  assert.match(
    f.document.activeElement.getAttribute("aria-label"),
    /First page/,
  );
  f.context().showPreview({ id: 99, name: "Page outside this result" });
  await f.tick();
  await f.click(".l-templates-modern__back");
  assert.equal(f.document.activeElement.tagName, "INPUT");
  assert.equal(f.document.activeElement.placeholder, "Search all templates…");
});

test("search throttles belong to each mounted picker and cancel queued work on unmount", async (t) => {
  const first = await fixture(t),
    second = await fixture(t);
  const a = first.context(),
    b = second.context();
  assert.notEqual(a.searchThrottled, b.searchThrottled);
  a.search = "a";
  await first.tick();
  b.search = "b";
  await second.tick();
  assert.equal(first.requests.at(-1).config.params.search, "a");
  assert.equal(second.requests.at(-1).config.params.search, "b");
  a.search = "queued";
  await first.tick();
  const count = first.requests.length,
    throttle = a.searchThrottled;
  first.destroy();
  throttle.flush();
  assert.equal(first.requests.length, count);
  b.search = "still active";
  await second.tick();
  b.searchThrottled.flush();
  assert.equal(second.requests.at(-1).config.params.search, "still active");
});

test("null/malformed catalog responses show recovery without mounting invalid cards", async (t) => {
  const f = await fixture(t);
  for (const response of [null, catalog(null, 0), catalog([null], 1)]) {
    if (f.requests.length > 1 || f.context().fetch_error)
      f.context().fetchTemplates();
    f.requests.at(-1).resolve(response);
    await f.tick();
    assert.equal(f.context().fetch_error, true);
    assert.equal(
      f.document.querySelectorAll(".l-template-card-modern").length,
      0,
    );
    assert.match(f.document.body.textContent, /Templates couldn.t load/);
  }
  f.context().fetchTemplates();
  f.requests.at(-1).resolve(catalog(rows()));
  await f.tick();
  assert.equal(f.context().fetch_error, false);
  assert.equal(
    f.document.querySelectorAll(".l-template-card-modern").length,
    2,
  );
});

test("server and transport errors remain retryable and stale failures stay silent", async (t) => {
  const f = await fixture(t);
  const obsolete = f.requests[0];
  f.context().selected_category = "software";
  await f.tick();
  f.requests.at(-1).resolve({ error: true, error_msg: "Fixture unavailable" });
  await f.tick();
  assert.equal(f.context().fetch_error, true);
  assert.equal(f.context().busy_fetch, false);
  obsolete.reject(new Error("Obsolete failure"));
  await f.tick();
  assert.equal(f.notifications.length, 1);
  f.context().fetchTemplates();
  f.requests.at(-1).reject(new Error("Fixture transport failure"));
  await f.tick();
  assert.equal(f.notifications.length, 2);
  assert.equal(f.context().busy_fetch, false);
  f.context().fetchTemplates();
  f.requests.at(-1).resolve(catalog([]));
  await f.tick();
  assert.equal(f.context().fetch_error, false);
  assert.match(f.document.body.textContent, /No templates found/);
});

test("all six starter selections emit fresh native content with artwork and working page anchors", async (t) => {
  const f = await fixture(t, { raw: true, clickable: true });
  const cards = f.document.querySelectorAll(".l-template-starters__card");
  assert.equal(cards.length, 6);
  const titles = new Set();
  const headlines = new Set();
  const artworkUrls = new Set();
  const heroPalettes = new Set();
  const componentTypes = new Set();
  const publicDirectory = path.resolve(packages, "../Backend/public");

  for (const card of cards) {
    const button = card.querySelector(
      ".l-template-starters__actions button:last-child",
    );
    button.click();
    await f.tick();
    const [event, page] = f.events.at(-1);
    assert.equal(event, "select:raw-theme");
    titles.add(page.title);
    assert.equal(page.sections.length, page.title === "Shop Collection" ? 7 : 5);
    assert.equal(
      new Set(page.sections.map(({ uid }) => uid)).size,
      page.sections.length,
    );

    const sections = page.sections.map(({ uid, object }) => ({
      uid,
      object: JSON.parse(JSON.stringify(object.toJson())),
    }));
    const [hero] = sections;
    assert.equal(hero.object.component, "XSection");
    heroPalettes.add(hero.object.background.bg_color);
    const heroElements = flatten(hero.object);
    const headline = heroElements.find((element) => element.data?.tag === "h1");
    const image = heroElements.find((element) => element.component === "XUploader");
    const action = heroElements.find((element) => element.component === "XButton");
    assert.ok(headline.data.value);
    headlines.add(headline.data.value);
    assert.ok(image.data.alt);
    const preview = card.querySelector(".l-template-starters__image").getAttribute("src");
    assert.match(preview, /^\/assets\/img\/landing-starters\/[a-z]+-preview\.webp$/);
    const heroImage = new URL(image.data.src);
    assert.equal(heroImage.origin, "https://platform.example");
    assert.equal(heroImage.pathname, preview.replace("-preview", ""));
    for (const asset of [preview, heroImage.pathname]) {
      const bytes = readFileSync(path.join(publicDirectory, asset));
      assert.equal(bytes.toString("ascii", 8, 12), "WEBP", asset);
    }
    artworkUrls.add(image.data.src);
    assert.ok(sections.slice(1).some(({ uid }) => action.data.href === `#${uid}`));
    for (const section of sections) {
      for (const element of flatten(section.object)) componentTypes.add(element.component);
    }
    const customBlocks = sections.flatMap(({ object }) =>
      flatten(object).filter(({ component }) => component === "XCode"),
    );
    assert.equal(customBlocks.length, page.title === "Shop Collection" ? 3 : 2);
    for (const { data } of customBlocks) {
      assert.equal(data.mode, "vue");
      const { defaults, structure } = f.starterCode(data.code);
      assert.deepEqual(Object.keys(data.properties), Object.keys(defaults));
      assert.deepEqual(Object.keys(structure), Object.keys(defaults));
      for (const [key, field] of Object.entries(structure)) {
        assert.equal(field.key, key);
        assert.ok(field.title);
        if (field.type === "array") assert.ok(Object.keys(field.structure).length);
      }
    }

    // A merchant edit to one generated page must never leak into a later page.
    const nativeHeadline = flatten(page.sections[0].object).find(
      (element) => element.data?.tag === "h1",
    );
    nativeHeadline.data.setValue("Merchant edit");
    button.click();
    await f.tick();
    const [, fresh] = f.events.at(-1);
    assert.notEqual(fresh.sections[0].uid, page.sections[0].uid);
    const freshHeadline = flatten(fresh.sections[0].object).find(
      (element) => element.data?.tag === "h1",
    );
    assert.equal(freshHeadline.data.value, headline.data.value);
  }

  for (const unique of [titles, headlines, artworkUrls, heroPalettes]) {
    assert.equal(unique.size, 6);
  }
  for (const component of ["XArticle", "XForm", "XProducts"]) {
    assert.ok(componentTypes.has(component), component);
  }
  assert.equal(f.requests.length, 0);
});

test("starter preview shows full read-only content and restores focus without loading the catalog", async (t) => {
  const f = await fixture(t, { raw: true, clickable: true });
  assert.equal(f.requests.length, 0);
  await f.click("[data-starter-preview='studio']");
  const preview = f.document.querySelector(
    ".l-template-starters__preview fieldset.l-template-starters__preview-content[disabled]",
  );
  assert.ok(preview);
  assert.equal(preview.firstElementChild.children.length, 5);
  assert.equal(preview.querySelectorAll("[data-vue-block]").length, 2);
  assert.match(preview.textContent, /Objects for slower days\./);
  assert.match(preview.textContent, /Made with intention/);
  assert.match(preview.textContent, /Notes from the studio/);
  assert.equal(f.document.querySelector(".l-template-starters__image"), null);

  const form = preview.querySelector("form");
  assert.ok(form.querySelector("button:disabled"));
  const submit = new f.document.defaultView.Event("submit", {
    bubbles: true,
    cancelable: true,
  });
  assert.equal(form.dispatchEvent(submit), false);

  const link = preview.querySelector("a[href^='#']");
  const section = preview.querySelector(link.getAttribute("href"));
  let scrolledToSection = false;
  section.scrollIntoView = () => {
    scrolledToSection = true;
  };
  // JSDOM's click() treats every descendant of a disabled fieldset as disabled.
  const click = new f.document.defaultView.MouseEvent("click", {
    bubbles: true,
    cancelable: true,
  });
  assert.equal(link.dispatchEvent(click), false);
  assert.equal(scrolledToSection, true);
  assert.equal(f.document.location.hash, "");
  const outline = f.document.querySelector(".l-template-starters__outline");
  assert.match(outline.textContent, /5 sections/);
  assert.equal(outline.querySelectorAll("a").length, 5);
  const jump = outline.querySelector(`a[href="${link.getAttribute("href")}"]`);
  scrolledToSection = false;
  jump.click();
  assert.equal(scrolledToSection, true);

  assert.equal(
    f.document.activeElement,
    f.document.querySelector(".l-template-starters .l-templates-modern__back"),
  );
  assert.equal(f.events.length, 0);
  await f.click(".l-template-starters .l-templates-modern__back");
  assert.equal(f.document.activeElement.dataset.starterPreview, "studio");
  assert.equal(f.requests.length, 0);

  await f.click(".l-template-starters__tabs button:last-child");
  assert.equal(f.requests.length, 1);
  assert.equal(f.requests[0].config.params.category, "*");
  f.requests[0].resolve(catalog(rows()));
  await f.tick();
  assert.equal(f.document.querySelectorAll(".l-template-card-modern").length, 2);
  await f.click(".l-template-starters__tabs button:first-child");
  assert.equal(f.document.querySelectorAll(".l-template-starters__card").length, 6);
  assert.equal(f.requests.length, 1);
});

test("the collection renders live Vue sections and preserves inspector values", async (t) => {
  const f = await fixture(t, { raw: true, clickable: true });
  await f.click("[data-starter-preview='collection']");
  const preview = f.document.querySelector(".l-template-starters__preview-content");
  const previewSections = [...preview.firstElementChild.children];
  assert.equal(previewSections.length, 7);
  assert.match(preview.textContent, /products.*appear here/i);
  const previewBlocks = [...preview.querySelectorAll("[data-vue-block]")];
  assert.deepEqual(
    previewBlocks.map((block) => block.querySelector("h2").textContent.trim()),
    ["From our roaster to your cup", "Your first pour-over", "Good to know"],
  );
  const questions = [...previewBlocks.at(-1).querySelectorAll("details")];
  assert.ok(questions.length >= 3);
  for (const question of questions) {
    assert.equal(question.firstElementChild.tagName, "SUMMARY");
    assert.ok(question.firstElementChild.textContent.trim());
  }
  const previewFirstBlock = f.context().preview_raw.content.sections
    .flatMap(({ object }) => flatten(object))
    .find(({ component }) => component === "XCode");
  previewFirstBlock.data.properties.title = "<strong>Editable example</strong>";
  await f.tick();
  assert.equal(previewBlocks[0].querySelector("h2").textContent.trim(), "<strong>Editable example</strong>");
  assert.equal(previewBlocks[0].querySelector("h2 strong"), null);
  assert.equal(f.events.length, 0);
  assert.equal(f.requests.length, 0);

  const previewIds = new Set(previewSections.map(({ id }) => id));
  await f.click(".l-template-starters__preview-title button");
  const [event, page] = f.events.at(-1);
  assert.equal(event, "select:raw-theme");
  assert.equal(page.sections.length, 7);
  assert.ok(page.sections.every(({ uid }) => !previewIds.has(uid)));
  const listing = page.sections[2];
  assert.ok(
    flatten(listing.object).some(({ component }) => component === "XProducts"),
  );
  assert.ok(
    flatten(page.sections[0].object).some(
      ({ component, data }) =>
        component === "XButton" && data.href === `#${listing.uid}`,
    ),
  );
  assert.ok(
    flatten(page.sections.at(-1).object).some(
      ({ component }) => component === "XForm",
    ),
  );

  const codeBlocks = Array.from(page.sections).flatMap(({ object }) =>
    flatten(object).filter(({ component }) => component === "XCode"),
  );
  assert.equal(codeBlocks.length, 3);
  for (const [index, block] of codeBlocks.entries()) {
    const { code } = block.data;
    const parsed = previewBlocks[index];
    assert.equal(parsed.querySelector("script, iframe"), null);
    assert.ok(
      [...parsed.querySelectorAll("*")].every((element) =>
        element.getAttributeNames().every((name) => !name.startsWith("on")),
      ),
    );

    const stored = JSON.parse(JSON.stringify(block.toJson()));
    const restored = block.constructor.JsonToInstance(stored);
    assert.equal(restored.data.mode, "vue");
    assert.equal(restored.data.code, code);
    assert.deepEqual(restored.data.properties, stored.data.properties);
    assert.notEqual(restored.data.properties.title, "<strong>Editable example</strong>");
    restored.data.setCode("<p>Edited example</p>");
    assert.equal(block.data.code, code);
  }
  assert.equal(f.requests.length, 0);
});

test("legacy starter selection still works without a remote request", async (t) => {
  const f = await fixture(t, { raw: true, modern: false });
  assert.equal(f.requests.length, 0);
  assert.match(f.document.body.textContent, /Brand Studio/);
  f.context().selectRawTheme(f.context().RawTemplate.List[0]);
  assert.equal(f.events.at(-1)[1].title, "Brand Studio");
  assert.equal(f.requests.length, 0);
});

test("deep links keep full-page selection while picker dialog ignores surrounding template queries", async (t) => {
  const page = fullPage("Actual content", [
    { uid: "keep", object: { value: "full" } },
  ]);
  const f = await fixture(t, {
    route: { params: {}, query: { template_id: "37" } },
  });
  assert.equal(f.requests.length, 1);
  assert.equal(f.requests[0].url, "/isolated/templates/37");
  f.requests[0].resolve({ error: false, page });
  await f.tick();
  assert.equal(f.events.filter(([event]) => event === "select:page").length, 1);
  assert.equal(f.events.find(([event]) => event === "select:page")[1], page);
  const dialog = await fixture(t, {
    kind: "dialog",
    route: { params: {}, query: { template_id: "37" } },
  });
  assert.equal(dialog.requests.length, 1);
  assert.equal(dialog.requests[0].url, "/isolated/templates");
  const list = dialog.instances.LTemplatesList[0];
  assert.equal(list.hasRawTemplates, false);
  assert.equal(
    list.categories.some((category) => category.code === "raw"),
    false,
  );
});

test("shared dialog uses the real selection, prevents duplicate requests and closes only on valid success", async (t) => {
  const f = await fixture(t, { kind: "dialog" });
  f.requests[0].resolve(catalog(rows()));
  await f.tick();
  const list = f.instances.LTemplatesList[0];
  list.loadTemplate(rows()[0]);
  await f.tick();
  assert.equal(f.context().selecting, true);
  f.context().setOpen(false);
  await f.tick();
  assert.equal(f.state.open, true);
  list.loadTemplate(rows()[1]);
  assert.equal(
    f.requests.length,
    2,
    "busy selection cannot issue another content request",
  );
  f.requests[1].resolve({ error: false, page: null });
  await f.tick();
  assert.equal(f.state.open, true);
  assert.equal(f.context().selecting, false);
  assert.equal(f.events.filter(([event]) => event === "select:page").length, 0);
  list.loadTemplate(rows()[0]);
  await f.tick();
  const page = fullPage("Selected content");
  f.requests.at(-1).resolve({ error: false, page });
  await f.tick();
  assert.equal(f.state.open, false);
  assert.equal(f.events.filter(([event]) => event === "select:page").length, 1);
  assert.equal(f.events.find(([event]) => event === "select:page")[1], page);
});

test("premium is rechecked at list selection and late dialog requests cannot select after closing", async (t) => {
  const f = await fixture(t, { kind: "dialog", premium: false });
  f.requests[0].resolve(catalog(rows()));
  await f.tick();
  const list = f.instances.LTemplatesList[0];
  list.loadTemplate(rows()[1]);
  await f.tick();
  assert.equal(f.requests.length, 1);
  assert.equal(
    f.bus.filter(([event]) => event === "need-premium-subscription").length,
    1,
  );
  list.loadTemplate(rows()[0]);
  await f.tick();
  const pending = f.requests.at(-1);
  f.state.open = false;
  await f.tick();
  pending.resolve({ error: false, page: fullPage("Late page") });
  await f.tick();
  assert.equal(f.events.filter(([event]) => event === "select:page").length, 0);
  f.state.open = true;
  await f.tick();
  assert.equal(
    f.instances.LTemplatesList.length,
    2,
    "reopen mounts a fresh picker",
  );
  assert.equal(f.instances.LTemplatesList[1].search, null);
  f.context().setOpen(false);
  await f.tick();
  assert.equal(f.state.open, false);
});

test("a programmatically opened dialog restores its connected opener after leave and ignores stale transitions", async (t) => {
  const f = await fixture(t, {
    kind: "dialog",
    open: false,
    focusOpener: true,
  });
  assert.equal(f.document.activeElement, f.opener);
  assert.equal(f.requests.length, 0);
  f.state.open = true;
  await f.tick();
  assert.equal(f.context().returnFocus, f.opener);
  f.document.querySelector(".l-templates-picker__close").focus();
  await f.click(".l-templates-picker__close");
  assert.equal(f.state.open, false);
  assert.notEqual(f.document.activeElement, f.opener);
  f.dialogs[0].afterLeave();
  assert.equal(f.document.activeElement, f.opener);
  assert.equal(f.context().returnFocus, null);

  f.state.open = true;
  await f.tick();
  const close = f.document.querySelector(".l-templates-picker__close");
  close.focus();
  f.dialogs[0].afterLeave();
  assert.equal(
    f.document.activeElement,
    close,
    "old leave events cannot steal focus from a reopened dialog",
  );
  assert.equal(f.context().returnFocus, f.opener);
  await f.click(".l-templates-picker__close");
  f.opener.remove();
  const current = f.document.createElement("button");
  f.document.body.append(current);
  current.focus();
  f.dialogs[0].afterLeave();
  assert.equal(f.document.activeElement, current);
  assert.equal(f.context().returnFocus, null);
});

test("selection errors retain the dialog and permit retry without emitting empty content", async (t) => {
  const f = await fixture(t, { kind: "dialog" });
  f.requests[0].resolve(catalog(rows()));
  await f.tick();
  const list = f.instances.LTemplatesList[0];
  list.loadTemplate(rows()[0]);
  await f.tick();
  f.requests
    .at(-1)
    .resolve({ error: true, error_msg: "Fixture selection denied" });
  await f.tick();
  assert.equal(f.state.open, true);
  assert.equal(f.context().selecting, false);
  assert.equal(
    f.events.some(([event]) => event === "select:page"),
    false,
  );
  list.loadTemplate(rows()[0]);
  await f.tick();
  f.requests.at(-1).reject(new Error("Fixture selection transport failure"));
  await f.tick();
  assert.equal(f.state.open, true);
  assert.equal(f.context().selecting, false);
  assert.equal(f.notifications.length, 2);
  for (const page of [[], {}, { content: null }, { content: [] }]) {
    list.loadTemplate(rows()[0]);
    await f.tick();
    f.requests.at(-1).resolve({ error: false, page });
    await f.tick();
    assert.equal(f.state.open, true);
    assert.equal(f.context().selecting, false);
    assert.equal(
      f.events.some(([event]) => event === "select:page"),
      false,
    );
  }
  const legacyPage = {
    content: { title: "Legacy content" },
    css: {},
    direction: "ltr",
  };
  list.loadTemplate(rows()[0]);
  await f.tick();
  f.requests.at(-1).resolve({ error: false, page: legacyPage });
  await f.tick();
  assert.equal(f.state.open, false);
  assert.equal(
    f.events.find(([event]) => event === "select:page")[1],
    legacyPage,
  );
});

test("actual EN/FA components render and all shared scripts, templates and scoped styles compile", async (t) => {
  for (const locale of ["en", "fa"]) {
    const starters = await fixture(t, { raw: true, locale, listProps: { hasHeader: true } });
    assert.equal(starters.document.querySelectorAll(".l-template-starters__card").length, 6);
    assert.doesNotMatch(starters.document.body.textContent, /page_builder\.templates\./);
    const f = await fixture(t, { kind: "dialog", locale });
    f.requests[0].resolve(catalog(rows()));
    await f.tick();
    assert.equal(
      f.document.querySelectorAll(".l-template-card-modern").length,
      2,
    );
    assert.equal(
      f.document.body.textContent.includes("page_builder.templates."),
      false,
    );
    for (const { file, descriptor } of f.sources) {
      for (const style of descriptor.styles) {
        const result = await compileStyleAsync({
          source: style.content,
          filename: file,
          id: "templates-test",
          scoped: style.scoped,
          preprocessLang: style.lang,
        });
        assert.deepEqual(result.errors, []);
      }
    }
  }
});
