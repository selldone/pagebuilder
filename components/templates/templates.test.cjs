const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
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
};
const evaluate = (source, globals) => {
  const exports = {};
  const result = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    reportDiagnostics: true,
  });
  assert.deepEqual(result.diagnostics, []);
  vm.runInNewContext(result.outputText, { exports, ...globals });
  return exports;
};

// Mount the real feature and helper owners; only transport, UI leaves and
// section seeds outside the picker are isolated.
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
  const throttle = (await import("lodash-es")).throttle;
  const eventBus = { $emit: (...args) => bus.push(args) };
  const globals = {
    document,
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
  const dependency = (name) => {
    if (name === "vue") return Vue;
    if (name === "lodash-es") return { throttle };
    if (name.includes("NotificationService"))
      return {
        default: {
          showErrorAlert: (...args) => notifications.push(["server", ...args]),
          showLaravelError: (...args) =>
            notifications.push(["transport", ...args]),
        },
      };
    if (name.endsWith("/BEventBusMixin.ts"))
      return loadModule(
        path.join(packages, "components-vue/utils/events/BEventBusMixin.ts"),
      );
    if (name.endsWith("/EventBus.ts")) return { EventBus: eventBus };
    if (name.endsWith("/RawTemplate.ts"))
      return loadModule(path.join(__dirname, "list/RawTemplate.ts"));
    if (name.endsWith("LTemplateCard.vue"))
      return { default: load(files.card) };
    if (name.endsWith("LTemplatesList.vue"))
      return { default: load(files.list) };
    if (name.endsWith(".vue")) return { default: leaf("div") };
    if (/\.(jpg|svg|png)$/.test(name)) return "/isolated/asset.svg";
    if (name.includes("/sections/"))
      return new Proxy(
        {},
        {
          get: () => ({
            label: "Fixture section",
            Seed: () => ({ value: "fresh section" }),
          }),
        },
      );
    if (name === "@selldone/core-js") return { CONSOLE: { log() {} } };
    return {};
  };
  function loadModule(file) {
    if (!cache.has(file))
      cache.set(
        file,
        evaluate(readFileSync(file, "utf8"), {
          ...globals,
          require: dependency,
        }),
      );
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
      require: dependency,
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
      require: dependency,
    }).render;
    const created = component.created;
    component.created = function () {
      (instances[component.name] ||= []).push(this);
      created?.call(this);
    };
    cache.set(file, component);
    return component;
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
        const event = key.slice(2).toLowerCase();
        node.listeners ||= {};
        if (node.listeners[key])
          node.removeEventListener(event, node.listeners[key]);
        if (value) {
          node.listeners[key] = (e) =>
            (Array.isArray(value) ? value : [value]).forEach((handler) =>
              handler(e),
            );
          node.addEventListener(event, node.listeners[key]);
        }
      } else if (key === "style" && value && typeof value === "object")
        Object.assign(node.style, value);
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

test("modern and legacy raw starters retain real fresh generation without remote selection", async (t) => {
  for (const modern of [false, true]) {
    const f = await fixture(t, { raw: true, modern });
    assert.equal(f.requests.length, 0);
    assert.equal(f.context().selected_category, "raw");
    assert.match(f.document.body.textContent, /Branding/);
    const raw = f.context().RawTemplate.List[0];
    f.context().selectRawTheme(raw);
    f.context().selectRawTheme(raw);
    const generated = f.events
      .filter(([event]) => event === "select:raw-theme")
      .map(([, value]) => value);
    assert.equal(generated.length, 2);
    assert.equal(generated[0].title, "Raw Template Branding");
    assert.equal(generated[0].sections.length, 4);
    assert.ok(
      generated[0].sections.every((section) => section.uid.startsWith("auto_")),
    );
    assert.notEqual(generated[0].sections[0].uid, generated[1].sections[0].uid);
    assert.notEqual(
      generated[0].sections[0].object,
      generated[1].sections[0].object,
    );
    assert.equal(f.requests.length, 0);
  }
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
