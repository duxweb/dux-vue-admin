import {
  isVue2
} from "./chunk-ZDT2FX2F.js";
import {
  Fragment,
  Teleport,
  computed,
  createApp,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  markRaw,
  nextTick,
  onMounted,
  provide,
  ref,
  watch
} from "./chunk-4ROYU34L.js";
import "./chunk-G3PMV62Z.js";

// node_modules/@overlastic/vue/node_modules/@vueuse/core/node_modules/@vueuse/shared/index.mjs
var isClient = typeof window !== "undefined" && typeof document !== "undefined";
var isWorker = typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
var isDef = (val) => typeof val !== "undefined";
var isIOS = getIsIOS();
function getIsIOS() {
  var _a, _b;
  return isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function cacheStringFunction(fn) {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
function identity(arg) {
  return arg;
}

// node_modules/@overlastic/vue/node_modules/@vueuse/core/index.mjs
var defaultDocument = isClient ? window.document : void 0;
var defaultNavigator = isClient ? window.navigator : void 0;
var defaultLocation = isClient ? window.location : void 0;
function cloneFnJSON(source) {
  return JSON.parse(JSON.stringify(source));
}
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__vueuse_ssr_handlers__";
var handlers = getHandlers();
function getHandlers() {
  if (!(globalKey in _global))
    _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
var defaultState = {
  x: 0,
  y: 0,
  pointerId: 0,
  pressure: 0,
  tiltX: 0,
  tiltY: 0,
  width: 0,
  height: 0,
  twist: 0,
  pointerType: null
};
var keys = Object.keys(defaultState);
var DEFAULT_UNITS = [
  { max: 6e4, value: 1e3, name: "second" },
  { max: 276e4, value: 6e4, name: "minute" },
  { max: 72e6, value: 36e5, name: "hour" },
  { max: 5184e5, value: 864e5, name: "day" },
  { max: 24192e5, value: 6048e5, name: "week" },
  { max: 28512e6, value: 2592e6, name: "month" },
  { max: Number.POSITIVE_INFINITY, value: 31536e6, name: "year" }
];
var _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
var TransitionPresets = Object.assign({}, { linear: identity }, _TransitionPresets);
function useVModel(props, key, emit, options = {}) {
  var _a, _b, _c, _d, _e;
  const {
    clone = false,
    passive = false,
    eventName,
    deep = false,
    defaultValue,
    shouldEmit
  } = options;
  const vm = getCurrentInstance();
  const _emit = emit || (vm == null ? void 0 : vm.emit) || ((_a = vm == null ? void 0 : vm.$emit) == null ? void 0 : _a.bind(vm)) || ((_c = (_b = vm == null ? void 0 : vm.proxy) == null ? void 0 : _b.$emit) == null ? void 0 : _c.bind(vm == null ? void 0 : vm.proxy));
  let event = eventName;
  if (!key) {
    if (isVue2) {
      const modelOptions = (_e = (_d = vm == null ? void 0 : vm.proxy) == null ? void 0 : _d.$options) == null ? void 0 : _e.model;
      key = (modelOptions == null ? void 0 : modelOptions.value) || "value";
      if (!eventName)
        event = (modelOptions == null ? void 0 : modelOptions.event) || "input";
    } else {
      key = "modelValue";
    }
  }
  event = event || `update:${key.toString()}`;
  const cloneFn = (val) => !clone ? val : typeof clone === "function" ? clone(val) : cloneFnJSON(val);
  const getValue = () => isDef(props[key]) ? cloneFn(props[key]) : defaultValue;
  const triggerEmit = (value) => {
    if (shouldEmit) {
      if (shouldEmit(value))
        _emit(event, value);
    } else {
      _emit(event, value);
    }
  };
  if (passive) {
    const initialValue = getValue();
    const proxy = ref(initialValue);
    let isUpdating = false;
    watch(
      () => props[key],
      (v) => {
        if (!isUpdating) {
          isUpdating = true;
          proxy.value = cloneFn(v);
          nextTick(() => isUpdating = false);
        }
      }
    );
    watch(
      proxy,
      (v) => {
        if (!isUpdating && (v !== props[key] || deep))
          triggerEmit(v);
      },
      { deep }
    );
    return proxy;
  } else {
    return computed({
      get() {
        return getValue();
      },
      set(value) {
        triggerEmit(value);
      }
    });
  }
}

// node_modules/@overlastic/core/dist/index.js
var UnifiedOverlayProviderID = "unified-overlay";
function defineGlobalElement(id = "", root = document.body) {
  const el = document.createElement("div");
  if (id)
    el.id = id;
  if (root !== false)
    root.appendChild(el);
  return el;
}
var context = {
  position: null,
  spaces: {}
};
function defineName(id = UnifiedOverlayProviderID, auto = true) {
  if (!context.spaces[id])
    context.spaces[id] = 0;
  if (auto)
    return `${id}--${++context.spaces[id]}`;
  return id;
}
function getIndex(id = UnifiedOverlayProviderID) {
  return context.spaces[id] || 0;
}
function createDeferred() {
  let resolve, reject;
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  promise.resolve = (v) => {
    resolve(v);
    return promise;
  };
  promise.reject = reject;
  return promise;
}
function watchClickPosition() {
  if (typeof window === "undefined" && typeof document === "undefined")
    return;
  document.addEventListener("click", (event) => {
    if (event.target instanceof Element) {
      const { left, top, width, height } = event.target.getBoundingClientRect();
      if (left > 0 || top > 0) {
        context.position = { x: left + width / 2, y: top + height / 2 };
      } else {
        context.position = null;
      }
    } else {
      context.position = null;
    }
    setTimeout(() => context.position = null, 64);
  });
}
function createConstructor(mount, options = {}) {
  const { container: globalContainer } = options;
  function define2(instance, options2) {
    function executor(props, options3) {
      const deferred = createDeferred();
      const name = defineName(options3.id, options3.autoIncrement);
      const index = getIndex(options3.id);
      const root = globalContainer ? options3.root : document.body;
      const container = defineGlobalElement(name, root);
      mount(instance, props, Object.assign(options3, {
        position: context.position,
        id: name,
        deferred,
        index,
        container
      }));
      return deferred;
    }
    let inst;
    function only(props, options3) {
      if (!inst) {
        inst = executor(props, options3);
        inst.finally(() => inst = void 0);
      }
      return inst;
    }
    function caller(props, overrides) {
      const opts = { ...options2, ...overrides };
      return opts.only ? only(props, opts) : executor(props, opts);
    }
    return caller;
  }
  function render(instance, props, options2) {
    return define2(instance, options2)(props);
  }
  return { define: define2, render };
}
watchClickPosition();
function noop2() {
}
function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// node_modules/tslib/tslib.es6.mjs
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};

// node_modules/lower-case/dist.es2015/index.js
function lowerCase(str) {
  return str.toLowerCase();
}

// node_modules/no-case/dist.es2015/index.js
var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
function noCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lowerCase : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
  var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
  var start = 0;
  var end = result.length;
  while (result.charAt(start) === "\0")
    start++;
  while (result.charAt(end - 1) === "\0")
    end--;
  return result.slice(start, end).split("\0").map(transform).join(delimiter);
}
function replace(input, re, value) {
  if (re instanceof RegExp)
    return input.replace(re, value);
  return re.reduce(function(input2, re2) {
    return input2.replace(re2, value);
  }, input);
}

// node_modules/pascal-case/dist.es2015/index.js
function pascalCaseTransform(input, index) {
  var firstChar = input.charAt(0);
  var lowerChars = input.substr(1).toLowerCase();
  if (index > 0 && firstChar >= "0" && firstChar <= "9") {
    return "_" + firstChar + lowerChars;
  }
  return "" + firstChar.toUpperCase() + lowerChars;
}
function pascalCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase(input, __assign({ delimiter: "", transform: pascalCaseTransform }, options));
}

// node_modules/@overlastic/vue/dist/index.js
var context2 = {
  appContext: null
};
var ScriptsInjectionKey = Symbol("OverlayScripts");
var InstancesInjectionKey = Symbol("OverlayInstances");
function useExtendOverlay(options = {}) {
  const { duration = 0, immediate = true, model = "visible", automatic = true } = options;
  const overlay = inject(ScriptsInjectionKey, useDeclarative(model, options));
  const dec = Reflect.get(overlay, "in_dec");
  const { visible, deferred, vanish } = overlay;
  async function destroy() {
    visible.value = false;
    await delay(duration);
    vanish == null ? void 0 : vanish();
    return Promise.resolve();
  }
  if (!dec && automatic)
    deferred == null ? void 0 : deferred.then(destroy).catch(destroy);
  if (!dec && immediate)
    onMounted(() => visible.value = true);
  provide(ScriptsInjectionKey, null);
  return overlay;
}
function useDeclarative(model, options = {}) {
  const { reject = "reject", resolve = "resolve" } = options.events || {};
  const instance = getCurrentInstance();
  if (!instance)
    throw new Error("Please use useExtendOverlay in component setup");
  const visible = useVModel(instance.props, model, instance.emit, { passive: true });
  const _reject = (value) => {
    instance == null ? void 0 : instance.emit(reject, value);
    visible.value = false;
  };
  const _resolve = (value) => {
    instance == null ? void 0 : instance.emit(resolve, value);
    visible.value = false;
  };
  return {
    reject: _reject,
    resolve: _resolve,
    vanish: noop2,
    visible,
    in_dec: true
  };
}
function useScripts(options) {
  const { reject: _reject } = options.deferred || {};
  const { vanish: _vanish } = options;
  const visible = ref(false);
  function vanish() {
    _vanish == null ? void 0 : _vanish();
    _reject == null ? void 0 : _reject();
  }
  return {
    resolve: options.deferred.resolve,
    reject: options.deferred.reject,
    deferred: options.deferred,
    visible,
    vanish
  };
}
function useOverlayHolder(component, options = {}) {
  const { callback, scripts, props, refresh } = useRefreshMetadata();
  const name = defineName(options.id, options.autoIncrement);
  function render() {
    return h(
      Teleport,
      {
        to: options.root || document.body,
        disabled: options.root === false
      },
      h("div", { id: name }, [
        h(component, props.value)
      ])
    );
  }
  const Holder = defineComponent({
    name: pascalCase(name),
    setup() {
      provide(ScriptsInjectionKey, scripts);
      return () => refresh.value ? render() : null;
    }
  });
  return [Holder, callback];
}
function useRefreshMetadata() {
  const visible = ref(false);
  const refresh = ref(false);
  const props = ref();
  const scripts = { vanish, visible };
  function vanish() {
    refresh.value = false;
    props.value = {};
    scripts.reject();
  }
  function callback(_props) {
    scripts.deferred = createDeferred();
    scripts.resolve = scripts.deferred.resolve;
    scripts.reject = scripts.deferred.reject;
    props.value = _props;
    refresh.value = true;
    return scripts.deferred;
  }
  return { callback, scripts, props, refresh };
}
var { define } = createConstructor((Instance, props, options) => {
  const { id, deferred, render, vanish: _vanish } = options;
  const InstanceWithProvider = defineComponent({
    name: pascalCase(id),
    setup: () => {
      const scripts = useScripts({ vanish, deferred });
      provide(ScriptsInjectionKey, scripts);
    },
    render: () => h(Instance, props)
  });
  function vanish() {
    _vanish(InstanceWithProvider);
  }
  render(InstanceWithProvider, props);
}, { container: false });
function useOverlayInject(Instance) {
  const { render, vanish } = inject(InstancesInjectionKey);
  return define(Instance, { render, vanish });
}
function inheritParent(app, appContext) {
  var _a;
  const parent = (appContext == null ? void 0 : appContext.app) || ((_a = context2.appContext) == null ? void 0 : _a.app);
  if (parent) {
    app.config.globalProperties = parent.config.globalProperties;
    Object.assign(app._context, parent._context);
  }
}
var constructor = createConstructor((Instance, props, options) => {
  const { container, id, deferred, appContext } = options;
  function vanish() {
    app.unmount();
    container.remove();
  }
  const InstanceWithProvider = defineComponent({
    name: pascalCase(id),
    setup: () => {
      const scripts = useScripts({
        vanish,
        deferred
      });
      provide(ScriptsInjectionKey, scripts);
    },
    render: () => h(Instance, props)
  });
  const app = createApp(InstanceWithProvider);
  inheritParent(app, appContext);
  app.mount(container);
  return vanish;
});
var defineOverlay = constructor.define;
var renderOverlay = constructor.render;
var Field = defineComponent({
  name: "Field",
  props: {
    is: {
      type: [String, Number, Object],
      default: ""
    }
  },
  setup(props) {
    return () => {
      if (typeof props.is === "string" || typeof props.is === "number")
        return props.is;
      return props.is ? h(props.is) : null;
    };
  }
});
var OverlaysProvider = defineComponent({
  setup(_, { slots }) {
    const instances = ref([]);
    function render(Instance, props) {
      console.log({ Instance, props });
      instances.value.push({ Instance: markRaw(Instance), props });
    }
    function vanish(instance) {
      instances.value = instances.value.filter(({ Instance }) => Instance !== instance);
    }
    provide(InstancesInjectionKey, { render, vanish });
    return () => {
      var _a;
      return h(Fragment, [
        ...instances.value.map(
          ({ Instance, props }, index) => h(Instance, { ...props, key: index })
        ),
        (_a = slots.default) == null ? void 0 : _a.call(slots)
      ]);
    };
  }
});
function install(app) {
  context2.appContext = app._context;
}
var unoverlay = { install };
var src_default = unoverlay;
export {
  Field,
  OverlaysProvider,
  src_default as default,
  defineOverlay,
  install,
  renderOverlay,
  useExtendOverlay,
  useOverlayHolder,
  useOverlayInject
};
//# sourceMappingURL=@overlastic_vue.js.map
