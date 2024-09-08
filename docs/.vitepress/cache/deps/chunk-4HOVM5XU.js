// node_modules/@alova/shared/dist/vars.js
var undefStr = "undefined";
var PromiseCls = Promise;
var promiseResolve = (value) => PromiseCls.resolve(value);
var promiseReject = (value) => PromiseCls.reject(value);
var ObjectCls = Object;
var RegExpCls = RegExp;
var undefinedValue = void 0;
var nullValue = null;
var trueValue = true;
var falseValue = false;
var promiseThen = (promise, onFulfilled, onrejected) => promise.then(onFulfilled, onrejected);
var promiseCatch = (promise, onrejected) => promise.catch(onrejected);
var promiseFinally = (promise, onfinally) => promise.finally(onfinally);
var JSONStringify = (value, replacer, space) => JSON.stringify(value, replacer, space);
var JSONParse = (value) => JSON.parse(value);
var setTimeoutFn = (fn, delay = 0) => setTimeout(fn, delay);
var clearTimeoutTimer = (timer) => clearTimeout(timer);
var objectKeys = (obj) => ObjectCls.keys(obj);
var objectValues = (obj) => ObjectCls.values(obj);
var forEach = (ary, fn) => ary.forEach(fn);
var pushItem = (ary, ...item) => ary.push(...item);
var mapItem = (ary, callbackfn) => ary.map(callbackfn);
var filterItem = (ary, predicate) => ary.filter(predicate);
var shift = (ary) => ary.shift();
var splice = (ary, start, deleteCount = 0, ...items) => ary.splice(start, deleteCount, ...items);
var len = (data) => data.length;
var isArray = (arg) => Array.isArray(arg);
var deleteAttr = (arg, attr) => delete arg[attr];
var regexpTest = (reg, str) => reg.test(str);
var includes = (ary, target) => ary.includes(target);
var valueObject = (value, writable = falseValue) => ({ value, writable });
var defineProperty = (o, key2, value, isDescriptor = falseValue) => ObjectCls.defineProperty(o, key2, isDescriptor ? value : valueObject(value, falseValue));
var defaultIsSSR = typeof window === undefStr && (typeof process !== undefStr ? typeof process.cwd === "function" : typeof Deno !== undefStr);
var MEMORY = "memory";
var STORAGE_RESTORE = "restore";

// node_modules/@alova/shared/dist/function.js
var FrameworkReadableState = class {
  constructor(state, key2, dehydrate, exportState) {
    this.s = state;
    this.k = key2;
    this.$dhy = dehydrate;
    this.$exp = exportState;
  }
  get v() {
    return this.$dhy(this.s);
  }
  get e() {
    return this.$exp(this.s);
  }
};
var FrameworkState = class extends FrameworkReadableState {
  constructor(state, key2, dehydrate, exportState, update) {
    super(state, key2, dehydrate, exportState);
    this.$upd = update;
  }
  set v(newValue) {
    this.$upd(this.s, newValue);
  }
  get v() {
    return super.v;
  }
};
var undefStr2 = "undefined";
var PromiseCls2 = Promise;
var ObjectCls2 = Object;
var undefinedValue2 = void 0;
var nullValue2 = null;
var trueValue2 = true;
var falseValue2 = false;
var promiseThen2 = (promise, onFulfilled, onrejected) => promise.then(onFulfilled, onrejected);
var JSONStringify2 = (value, replacer, space) => JSON.stringify(value, replacer, space);
var setTimeoutFn2 = (fn, delay = 0) => setTimeout(fn, delay);
var objectKeys2 = (obj) => ObjectCls2.keys(obj);
var forEach2 = (ary, fn) => ary.forEach(fn);
var pushItem2 = (ary, ...item) => ary.push(...item);
var mapItem2 = (ary, callbackfn) => ary.map(callbackfn);
var shift2 = (ary) => ary.shift();
var len2 = (data) => data.length;
var typeOf = (arg) => typeof arg;
var includes2 = (ary, target) => ary.includes(target);
typeof window === undefStr2 && (typeof process !== undefStr2 ? typeof process.cwd === "function" : typeof Deno !== undefStr2);
var MEMORY2 = "memory";
var STORAGE_RESTORE2 = "restore";
var noop = () => {
};
var $self = (arg) => arg;
var isFn = (arg) => typeOf(arg) === "function";
var isNumber = (arg) => typeOf(arg) === "number" && !Number.isNaN(arg);
var isString = (arg) => typeOf(arg) === "string";
var isObject = (arg) => arg !== nullValue2 && typeOf(arg) === "object";
var globalToString = (arg) => ObjectCls2.prototype.toString.call(arg);
var isPlainObject = (arg) => globalToString(arg) === "[object Object]";
var instanceOf = (arg, cls) => arg instanceof cls;
var getTime = (date) => date ? date.getTime() : Date.now();
var getContext = (methodInstance) => methodInstance.context;
var getConfig = (methodInstance) => methodInstance.config;
var getContextOptions = (alovaInstance) => alovaInstance.options;
var getOptions = (methodInstance) => getContextOptions(getContext(methodInstance));
var key = (methodInstance) => {
  const { params, headers } = getConfig(methodInstance);
  return JSONStringify2([methodInstance.type, methodInstance.url, params, methodInstance.data, headers]);
};
var uuid = () => {
  const timestamp = (/* @__PURE__ */ new Date()).getTime();
  return Math.floor(Math.random() * timestamp).toString(36);
};
var getMethodInternalKey = (methodInstance) => methodInstance.key;
var getHandlerMethod = (methodHandler, assert, args = []) => {
  const methodInstance = isFn(methodHandler) ? methodHandler(...args) : methodHandler;
  assert(!!methodInstance.key, "hook handler must be a method instance or a function that returns method instance");
  return methodInstance;
};
var isSpecialRequestBody = (data) => {
  const dataTypeString = globalToString(data);
  return /^\[object (Blob|FormData|ReadableStream|URLSearchParams)\]$/i.test(dataTypeString) || instanceOf(data, ArrayBuffer);
};
var objAssign = (target, ...sources) => ObjectCls2.assign(target, ...sources);
var omit = (obj, ...keys) => {
  const result = {};
  for (const key2 in obj) {
    if (!keys.includes(key2)) {
      result[key2] = obj[key2];
    }
  }
  return result;
};
function usePromise() {
  let retResolve;
  let retReject;
  const promise = new Promise((resolve, reject) => {
    retResolve = resolve;
    retReject = reject;
  });
  return { promise, resolve: retResolve, reject: retReject };
}
var getLocalCacheConfigParam = (methodInstance) => {
  const { cacheFor } = getConfig(methodInstance);
  const getCacheExpireTs = (cacheExpire) => isNumber(cacheExpire) ? getTime() + cacheExpire : getTime(cacheExpire || undefinedValue2);
  let cacheMode = MEMORY2;
  let expire = () => 0;
  let store = falseValue2;
  let tag = undefinedValue2;
  const controlled = isFn(cacheFor);
  if (!controlled) {
    let expireColumn = cacheFor;
    if (isPlainObject(cacheFor)) {
      const { mode = MEMORY2, expire: expire2, tag: configTag } = cacheFor || {};
      cacheMode = mode;
      store = mode === STORAGE_RESTORE2;
      tag = configTag ? configTag.toString() : undefinedValue2;
      expireColumn = expire2;
    }
    expire = (mode) => getCacheExpireTs(isFn(expireColumn) ? expireColumn({ method: methodInstance, mode }) : expireColumn);
  }
  return {
    f: cacheFor,
    c: controlled,
    e: expire,
    m: cacheMode,
    s: store,
    t: tag
  };
};
var newInstance = (Cls, ...args) => new Cls(...args);
var sloughConfig = (config, args = []) => isFn(config) ? config(...args) : config;
var sloughFunction = (arg, defaultFn) => isFn(arg) ? arg : ![falseValue2, nullValue2].includes(arg) ? defaultFn : noop;
var createSyncOnceRunner = (delay = 0) => {
  let timer = undefinedValue2;
  return (fn) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeoutFn2(fn, delay);
  };
};
var createAsyncQueue = (catchError = falseValue2) => {
  const queue = [];
  let completedHandler = undefinedValue2;
  let executing = false;
  const executeQueue = async () => {
    executing = true;
    while (len2(queue) > 0) {
      const asyncFunc = shift2(queue);
      if (asyncFunc) {
        await asyncFunc();
      }
    }
    completedHandler && completedHandler();
    executing = false;
  };
  const addQueue = (asyncFunc) => newInstance(PromiseCls2, (resolve, reject) => {
    const wrappedFunc = () => promiseThen2(asyncFunc(), resolve, (err) => {
      catchError ? resolve(undefinedValue2) : reject(err);
    });
    pushItem2(queue, wrappedFunc);
    if (!executing) {
      executeQueue();
    }
  });
  const onComplete = (fn) => {
    completedHandler = fn;
  };
  return {
    addQueue,
    onComplete
  };
};
var walkObject = (target, callback, preorder = trueValue2, key2, parent) => {
  const callCallback = () => {
    if (parent && key2) {
      target = callback(target, key2, parent);
      if (target !== parent[key2]) {
        parent[key2] = target;
      }
    }
  };
  preorder && callCallback();
  if (isObject(target)) {
    for (const i in target) {
      if (!instanceOf(target, String)) {
        walkObject(target[i], callback, preorder, i, target);
      }
    }
  }
  !preorder && callCallback();
  return target;
};
function statesHookHelper(statesHook, referingObject = { trackedKeys: {}, bindError: falseValue2 }) {
  const ref = (initialValue) => statesHook.ref ? statesHook.ref(initialValue) : { current: initialValue };
  referingObject = ref(referingObject).current;
  const exportState = (state) => (statesHook.export || $self)(state, referingObject);
  const memorize = (fn) => {
    if (!isFn(statesHook.memorize)) {
      return fn;
    }
    const memorizedFn = statesHook.memorize(fn);
    memorizedFn.memorized = true;
    return memorizedFn;
  };
  const { dehydrate } = statesHook;
  const update = (newValue, state, key2) => newValue !== dehydrate(state, key2, referingObject) && referingObject.trackedKeys[key2] && statesHook.update(newValue, state, key2, referingObject);
  const mapDeps = (deps) => mapItem2(deps, (item) => instanceOf(item, FrameworkReadableState) ? item.e : item);
  const createdStateList = [];
  const depKeys = {};
  return {
    create: (initialValue, key2) => {
      pushItem2(createdStateList, key2);
      return newInstance(FrameworkState, statesHook.create(initialValue, key2, referingObject), key2, (state) => dehydrate(state, key2, referingObject), exportState, (state, newValue) => update(newValue, state, key2));
    },
    computed: (getter, depList, key2) => {
      forEach2(depList, (dep) => {
        if (dep.k) {
          depKeys[dep.k] = true;
        }
      });
      return newInstance(FrameworkReadableState, statesHook.computed(getter, mapDeps(depList), key2, referingObject), key2, (state) => dehydrate(state, key2, referingObject), exportState);
    },
    effectRequest: (effectRequestParams) => statesHook.effectRequest(effectRequestParams, referingObject),
    ref,
    watch: (source, callback) => statesHook.watch(mapDeps(source), callback, referingObject),
    onMounted: (callback) => statesHook.onMounted(callback, referingObject),
    onUnmounted: (callback) => statesHook.onUnmounted(callback, referingObject),
    /**
     * refering object that sharing some value with this object.
     */
    __referingObj: referingObject,
    /**
     * expose provider for specified use hook.
     * @param object object that contains state proxy, framework state, operating function and event binder.
     * @returns provider component.
     */
    exposeProvider: (object) => {
      const provider = {};
      const originalStatesMap = {};
      for (const key2 in object) {
        const value = object[key2];
        const isValueFunction = isFn(value);
        if (isValueFunction) {
          provider[key2] = key2.startsWith("on") ? (...args) => {
            value(...args);
            return completedProvider;
          } : value.memorized ? value : memorize(value);
        } else {
          const isFrameworkState = instanceOf(value, FrameworkReadableState);
          if (isFrameworkState) {
            originalStatesMap[key2] = value.s;
          }
          ObjectCls2.defineProperty(provider, key2, {
            get: () => {
              referingObject.trackedKeys[key2] = trueValue2;
              return isFrameworkState ? value.e : value;
            },
            // set need to set an function,
            // otherwise it will throw `TypeError: Cannot set property __referingObj of #<Object> which has only a getter` when setting value
            set: noop,
            enumerable: trueValue2,
            configurable: trueValue2
          });
        }
      }
      const { update: nestedHookUpdate, __proxyState: nestedProxyState } = provider;
      referingObject.trackedKeys = {
        ...depKeys
      };
      referingObject.bindError = falseValue2;
      const extraProvider = {
        // expose referingObject automatically.
        __referingObj: referingObject,
        // the new updating function that can update the new states and nested hook states.
        update: memorize((newStates) => {
          objectKeys2(newStates).forEach((key2) => {
            if (includes2(createdStateList, key2)) {
              update(newStates[key2], originalStatesMap[key2], key2);
            } else if (key2 in provider && isFn(nestedHookUpdate)) {
              nestedHookUpdate({
                [key2]: newStates[key2]
              });
            }
          });
        }),
        __proxyState: memorize((key2) => {
          if (includes2(createdStateList, key2) && instanceOf(object[key2], FrameworkReadableState)) {
            referingObject.trackedKeys[key2] = trueValue2;
            return object[key2];
          }
          return nestedProxyState(key2);
        })
      };
      const completedProvider = objAssign(provider, extraProvider);
      return completedProvider;
    },
    /**
     * transform state proxies to object.
     * @param states proxy array of framework states
     * @param filterKey filter key of state proxy
     * @returns an object that contains the states of target form
     */
    objectify: (states, filterKey) => states.reduce((result, item) => {
      result[item.k] = filterKey ? item[filterKey] : item;
      return result;
    }, {}),
    transformState2Proxy: (state, key2) => newInstance(FrameworkState, state, key2, (state2) => dehydrate(state2, key2, referingObject), exportState, (state2, newValue) => update(newValue, state2, key2))
  };
}
var cacheKeyPrefix = "$a.";
var buildNamespacedCacheKey = (namespace, key2) => cacheKeyPrefix + namespace + key2;
var delayWithBackoff = (backoff, retryTimes) => {
  let { startQuiver, endQuiver } = backoff;
  const { delay, multiplier = 1 } = backoff;
  let retryDelayFinally = (delay || 0) * multiplier ** (retryTimes - 1);
  if (startQuiver || endQuiver) {
    startQuiver = startQuiver || 0;
    endQuiver = endQuiver || 1;
    retryDelayFinally += retryDelayFinally * startQuiver + Math.random() * retryDelayFinally * (endQuiver - startQuiver);
    retryDelayFinally = Math.floor(retryDelayFinally);
  }
  return retryDelayFinally;
};

export {
  PromiseCls,
  promiseResolve,
  promiseReject,
  ObjectCls,
  RegExpCls,
  undefinedValue,
  nullValue,
  trueValue,
  falseValue,
  promiseThen,
  promiseCatch,
  promiseFinally,
  JSONStringify,
  JSONParse,
  setTimeoutFn,
  clearTimeoutTimer,
  objectKeys,
  objectValues,
  forEach,
  pushItem,
  mapItem,
  filterItem,
  shift,
  splice,
  len,
  isArray,
  deleteAttr,
  regexpTest,
  includes,
  valueObject,
  defineProperty,
  defaultIsSSR,
  MEMORY,
  STORAGE_RESTORE,
  noop,
  $self,
  isFn,
  isNumber,
  isString,
  isObject,
  globalToString,
  isPlainObject,
  instanceOf,
  getTime,
  getContext,
  getConfig,
  getContextOptions,
  getOptions,
  key,
  uuid,
  getMethodInternalKey,
  getHandlerMethod,
  isSpecialRequestBody,
  objAssign,
  omit,
  usePromise,
  getLocalCacheConfigParam,
  newInstance,
  sloughConfig,
  sloughFunction,
  createSyncOnceRunner,
  createAsyncQueue,
  walkObject,
  statesHookHelper,
  buildNamespacedCacheKey,
  delayWithBackoff
};
//# sourceMappingURL=chunk-4HOVM5XU.js.map
