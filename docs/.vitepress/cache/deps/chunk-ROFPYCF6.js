import {
  $self,
  JSONParse,
  JSONStringify,
  MEMORY,
  PromiseCls,
  RegExpCls,
  STORAGE_RESTORE,
  buildNamespacedCacheKey,
  defaultIsSSR,
  deleteAttr,
  falseValue,
  filterItem,
  forEach,
  getConfig,
  getContext,
  getContextOptions,
  getLocalCacheConfigParam,
  getMethodInternalKey,
  getOptions,
  getTime,
  instanceOf,
  isArray,
  isFn,
  isPlainObject,
  isSpecialRequestBody,
  isString,
  key,
  len,
  mapItem,
  newInstance,
  noop,
  objAssign,
  objectKeys,
  promiseCatch,
  promiseFinally,
  promiseReject,
  promiseThen,
  pushItem,
  sloughFunction,
  trueValue,
  undefinedValue
} from "./chunk-4HOVM5XU.js";

// node_modules/@alova/shared/dist/assert.js
var undefStr = "undefined";
typeof window === undefStr && (typeof process !== undefStr ? typeof process.cwd === "function" : typeof Deno !== undefStr);
var newInstance2 = (Cls, ...args) => new Cls(...args);
var AlovaError = class extends Error {
  constructor(prefix, message, errorCode) {
    super(message + (errorCode ? `

For detailed: https://alova.js.org/error#${errorCode}` : ""));
    this.name = `[alova${prefix ? `/${prefix}` : ""}]`;
  }
};
var createAssert = (prefix = "") => (expression, message, errorCode) => {
  if (!expression) {
    throw newInstance2(AlovaError, prefix, message, errorCode);
  }
};

// node_modules/alova/dist/alova.esm.js
var globalConfigMap = {
  autoHitCache: "global",
  ssr: defaultIsSSR
};
var globalConfig = (config) => {
  globalConfigMap = {
    ...globalConfigMap,
    ...config
  };
};
var titleStyle = "color: black; font-size: 12px; font-weight: bolder";
var defaultCacheLogger = (response, methodInstance, cacheMode, tag) => {
  const cole = console;
  const log = (...args) => console.log(...args);
  const { url } = methodInstance;
  const isRestoreMode = cacheMode === STORAGE_RESTORE;
  const hdStyle = "\x1B[42m%s\x1B[49m";
  const labelStyle = "\x1B[32m%s\x1B[39m";
  const startSep = ` [HitCache]${url} `;
  const endSepFn = () => Array(len(startSep) + 1).join("^");
  if (globalConfigMap.ssr) {
    log(hdStyle, startSep);
    log(labelStyle, " Cache ", response);
    log(labelStyle, " Mode  ", cacheMode);
    isRestoreMode && log(labelStyle, " Tag   ", tag);
    log(labelStyle, endSepFn());
  } else {
    cole.groupCollapsed ? cole.groupCollapsed("%cHitCache", "padding: 2px 6px; background: #c4fcd3; color: #53b56d;", url) : log(hdStyle, startSep);
    log("%c[Cache]", titleStyle, response);
    log("%c[Mode]", titleStyle, cacheMode);
    isRestoreMode && log("%c[Tag]", titleStyle, tag);
    log("%c[Method]", titleStyle, methodInstance);
    cole.groupEnd ? cole.groupEnd() : log(labelStyle, endSepFn());
  }
};
var hitSourceStringCacheKey = (key2) => `hss.${key2}`;
var hitSourceRegexpPrefix = "hsr.";
var hitSourceRegexpCacheKey = (regexpStr) => hitSourceRegexpPrefix + regexpStr;
var unifiedHitSourceRegexpCacheKey = "$$hsrs";
var regexpSourceFlagSeparator = "__$<>$__";
var addItem = (obj, item) => {
  obj[item] = 0;
};
var setWithCacheAdapter = async (namespace, key2, data, expireTimestamp, cacheAdapter, hitSource, tag) => {
  if (expireTimestamp > getTime() && data) {
    const methodCacheKey = buildNamespacedCacheKey(namespace, key2);
    await cacheAdapter.set(methodCacheKey, filterItem([data, expireTimestamp === Infinity ? undefinedValue : expireTimestamp, tag], Boolean));
    if (hitSource) {
      const hitSourceKeys = {};
      const hitSourceRegexpSources = [];
      forEach(hitSource, (sourceItem) => {
        const isRegexp = instanceOf(sourceItem, RegExpCls);
        const targetHitSourceKey = isRegexp ? sourceItem.source + (sourceItem.flags ? regexpSourceFlagSeparator + sourceItem.flags : "") : sourceItem;
        if (targetHitSourceKey) {
          if (isRegexp && !hitSourceKeys[targetHitSourceKey]) {
            pushItem(hitSourceRegexpSources, targetHitSourceKey);
          }
          addItem(hitSourceKeys, isRegexp ? hitSourceRegexpCacheKey(targetHitSourceKey) : hitSourceStringCacheKey(targetHitSourceKey));
        }
      });
      const promises = mapItem(objectKeys(hitSourceKeys), async (hitSourceKey) => {
        const targetMethodKeys = await cacheAdapter.get(hitSourceKey) || {};
        addItem(targetMethodKeys, methodCacheKey);
        await cacheAdapter.set(hitSourceKey, targetMethodKeys);
      });
      const saveRegexp = async () => {
        if (len(hitSourceRegexpSources)) {
          const regexpList = await cacheAdapter.get(unifiedHitSourceRegexpCacheKey) || [];
          pushItem(regexpList, ...hitSourceRegexpSources);
          await cacheAdapter.set(unifiedHitSourceRegexpCacheKey, regexpList);
        }
      };
      await PromiseCls.all([...promises, saveRegexp()]);
    }
  }
};
var removeWithCacheAdapter = async (namespace, key2, cacheAdapter) => {
  const methodStoreKey = buildNamespacedCacheKey(namespace, key2);
  await cacheAdapter.remove(methodStoreKey);
};
var getRawWithCacheAdapter = async (namespace, key2, cacheAdapter, tag) => {
  const storagedData = await cacheAdapter.get(buildNamespacedCacheKey(namespace, key2));
  if (storagedData) {
    const [_, expireTimestamp, storedTag] = storagedData;
    if (storedTag === tag && (!expireTimestamp || expireTimestamp > getTime())) {
      return storagedData;
    }
    await removeWithCacheAdapter(namespace, key2, cacheAdapter);
  }
};
var getWithCacheAdapter = async (namespace, key2, cacheAdapter, tag) => {
  const rawData = await getRawWithCacheAdapter(namespace, key2, cacheAdapter, tag);
  return rawData ? rawData[0] : undefinedValue;
};
var clearWithCacheAdapter = async (cacheAdapters) => PromiseCls.all(cacheAdapters.map((cacheAdapter) => cacheAdapter.clear()));
var hitTargetCacheWithCacheAdapter = async (sourceKey, sourceName, cacheAdapter) => {
  const sourceNameStr = `${sourceName}`;
  const sourceTargetKeyMap = {};
  const hitSourceKey = hitSourceStringCacheKey(sourceKey);
  sourceTargetKeyMap[hitSourceKey] = await cacheAdapter.get(hitSourceKey);
  let unifiedHitSourceRegexpChannel;
  if (sourceName) {
    const hitSourceName = hitSourceStringCacheKey(sourceNameStr);
    sourceTargetKeyMap[hitSourceName] = await cacheAdapter.get(hitSourceName);
    unifiedHitSourceRegexpChannel = await cacheAdapter.get(unifiedHitSourceRegexpCacheKey);
    const matchedRegexpStrings = [];
    if (unifiedHitSourceRegexpChannel && len(unifiedHitSourceRegexpChannel)) {
      forEach(unifiedHitSourceRegexpChannel, (regexpStr) => {
        const [source, flag] = regexpStr.split(regexpSourceFlagSeparator);
        if (newInstance(RegExpCls, source, flag).test(sourceNameStr)) {
          pushItem(matchedRegexpStrings, regexpStr);
        }
      });
      await PromiseCls.all(mapItem(matchedRegexpStrings, async (regexpString) => {
        const hitSourceRegexpString = hitSourceRegexpCacheKey(regexpString);
        sourceTargetKeyMap[hitSourceRegexpString] = await cacheAdapter.get(hitSourceRegexpString);
      }));
    }
  }
  const removeWithTargetKey = async (targetKey) => {
    try {
      await cacheAdapter.remove(targetKey);
      for (const sourceKey2 in sourceTargetKeyMap) {
        const targetKeys = sourceTargetKeyMap[sourceKey2];
        if (targetKeys) {
          deleteAttr(targetKeys, targetKey);
        }
      }
    } catch (error) {
    }
  };
  const accessedKeys = {};
  await PromiseCls.all(mapItem(objectKeys(sourceTargetKeyMap), async (sourceKey2) => {
    const targetKeys = sourceTargetKeyMap[sourceKey2];
    if (targetKeys) {
      const removingPromises = [];
      for (const key2 in targetKeys) {
        if (!accessedKeys[key2]) {
          addItem(accessedKeys, key2);
          pushItem(removingPromises, removeWithTargetKey(key2));
        }
      }
      await PromiseCls.all(removingPromises);
    }
  }));
  const unifiedHitSourceRegexpChannelLen = len(unifiedHitSourceRegexpChannel || []);
  await PromiseCls.all(mapItem(objectKeys(sourceTargetKeyMap), async (sourceKey2) => {
    const targetKeys = sourceTargetKeyMap[sourceKey2];
    if (targetKeys) {
      if (len(objectKeys(targetKeys))) {
        await cacheAdapter.set(sourceKey2, targetKeys);
      } else {
        await cacheAdapter.remove(sourceKey2);
        if (sourceKey2.includes(hitSourceRegexpPrefix) && unifiedHitSourceRegexpChannel) {
          unifiedHitSourceRegexpChannel = filterItem(unifiedHitSourceRegexpChannel, (rawRegexpStr) => hitSourceRegexpCacheKey(rawRegexpStr) !== sourceKey2);
        }
      }
    }
  }));
  if (unifiedHitSourceRegexpChannelLen !== len(unifiedHitSourceRegexpChannel || [])) {
    await cacheAdapter.set(unifiedHitSourceRegexpCacheKey, unifiedHitSourceRegexpChannel);
  }
};
var cloneMethod = (methodInstance) => {
  const { data, config } = methodInstance;
  const newConfig = { ...config };
  const { headers = {}, params = {} } = newConfig;
  const ctx = getContext(methodInstance);
  newConfig.headers = { ...headers };
  newConfig.params = { ...params };
  const newMethod = newInstance(Method, methodInstance.type, ctx, methodInstance.url, newConfig, data);
  return objAssign(newMethod, {
    ...methodInstance,
    config: newConfig
  });
};
var queryCache = async (matcher, { policy = "all" } = {}) => {
  if (matcher && matcher.key) {
    const { id, l1Cache, l2Cache } = getContext(matcher);
    const methodKey = getMethodInternalKey(matcher);
    const { f: cacheFor, c: controlled, s: store, e: expireMilliseconds, t: tag } = getLocalCacheConfigParam(matcher);
    if (controlled) {
      return cacheFor();
    }
    let cachedData = policy !== "l2" ? await getWithCacheAdapter(id, methodKey, l1Cache) : undefinedValue;
    if (policy === "l2") {
      cachedData = await getWithCacheAdapter(id, methodKey, l2Cache, tag);
    } else if (policy === "all" && !cachedData) {
      if (store && expireMilliseconds(STORAGE_RESTORE) > getTime()) {
        cachedData = await getWithCacheAdapter(id, methodKey, l2Cache, tag);
      }
    }
    return cachedData;
  }
};
var setCache = async (matcher, dataOrUpdater, { policy = "all" } = {}) => {
  const methodInstances = isArray(matcher) ? matcher : [matcher];
  const batchPromises = methodInstances.map(async (methodInstance) => {
    const { hitSource } = methodInstance;
    const { id, l1Cache, l2Cache } = getContext(methodInstance);
    const methodKey = getMethodInternalKey(methodInstance);
    const { e: expireMilliseconds, s: toStore, t: tag, c: controlled } = getLocalCacheConfigParam(methodInstance);
    if (controlled) {
      return;
    }
    let data = dataOrUpdater;
    if (isFn(dataOrUpdater)) {
      let cachedData = policy !== "l2" ? await getWithCacheAdapter(id, methodKey, l1Cache) : undefinedValue;
      if (policy === "l2" || policy === "all" && !cachedData && toStore && expireMilliseconds(STORAGE_RESTORE) > getTime()) {
        cachedData = await getWithCacheAdapter(id, methodKey, l2Cache, tag);
      }
      data = dataOrUpdater(cachedData);
      if (data === undefinedValue) {
        return;
      }
    }
    return PromiseCls.all([
      policy !== "l2" && setWithCacheAdapter(id, methodKey, data, expireMilliseconds(MEMORY), l1Cache, hitSource),
      policy === "l2" || policy === "all" && toStore ? setWithCacheAdapter(id, methodKey, data, expireMilliseconds(STORAGE_RESTORE), l2Cache, hitSource, tag) : undefinedValue
    ]);
  });
  return PromiseCls.all(batchPromises);
};
var invalidateCache = async (matcher) => {
  if (!matcher) {
    await PromiseCls.all([clearWithCacheAdapter(usingL1CacheAdapters), clearWithCacheAdapter(usingL2CacheAdapters)]);
    return;
  }
  const methodInstances = isArray(matcher) ? matcher : [matcher];
  const batchPromises = methodInstances.map((methodInstance) => {
    const { id, l1Cache, l2Cache } = getContext(methodInstance);
    const { c: controlled } = getLocalCacheConfigParam(methodInstance);
    if (controlled) {
      return;
    }
    const methodKey = getMethodInternalKey(methodInstance);
    return PromiseCls.all([
      removeWithCacheAdapter(id, methodKey, l1Cache),
      removeWithCacheAdapter(id, methodKey, l2Cache)
    ]);
  });
  await PromiseCls.all(batchPromises);
};
var hitCacheBySource = async (sourceMethod) => {
  const { autoHitCache } = globalConfigMap;
  const { l1Cache, l2Cache } = getContext(sourceMethod);
  const sourceKey = getMethodInternalKey(sourceMethod);
  const { name: sourceName } = getConfig(sourceMethod);
  const cacheAdaptersInvolved = {
    global: [...usingL1CacheAdapters, ...usingL2CacheAdapters],
    self: [l1Cache, l2Cache],
    close: []
  }[autoHitCache];
  if (cacheAdaptersInvolved && len(cacheAdaptersInvolved)) {
    await PromiseCls.all(mapItem(cacheAdaptersInvolved, (involvedCacheAdapter) => hitTargetCacheWithCacheAdapter(sourceKey, sourceName, involvedCacheAdapter)));
  }
};
var adapterReturnMap = {};
var buildCompletedURL = (baseURL, url, params) => {
  baseURL = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
  if (url !== "") {
    url = url.match(/^(\/|https?:\/\/)/) ? url : `/${url}`;
  }
  const completeURL = baseURL + url;
  const paramsStr = mapItem(filterItem(objectKeys(params), (key2) => params[key2] !== undefinedValue), (key2) => `${key2}=${params[key2]}`).join("&");
  return paramsStr ? +completeURL.includes("?") ? `${completeURL}&${paramsStr}` : `${completeURL}?${paramsStr}` : completeURL;
};
function sendRequest(methodInstance, forceRequest) {
  let fromCache = trueValue;
  let requestAdapterCtrlsPromiseResolveFn;
  const requestAdapterCtrlsPromise = newInstance(PromiseCls, (resolve) => {
    requestAdapterCtrlsPromiseResolveFn = resolve;
  });
  const response = async () => {
    const { beforeRequest = noop, responded, requestAdapter, cacheLogger } = getOptions(methodInstance);
    const methodKey = getMethodInternalKey(methodInstance);
    const { s: toStorage, t: tag, m: cacheMode, e: expireMilliseconds } = getLocalCacheConfigParam(methodInstance);
    const { id, l1Cache, l2Cache, snapshots } = getContext(methodInstance);
    const { cacheFor } = getConfig(methodInstance);
    const { hitSource: methodHitSource } = methodInstance;
    let cachedResponse = await (isFn(cacheFor) ? cacheFor() : (
      // 如果是强制请求的，则跳过从缓存中获取的步骤
      // 否则判断是否使用缓存数据
      forceRequest ? undefinedValue : getWithCacheAdapter(id, methodKey, l1Cache)
    ));
    if (cacheMode === STORAGE_RESTORE && !cachedResponse) {
      const rawL2CacheData = await getRawWithCacheAdapter(id, methodKey, l2Cache, tag);
      if (rawL2CacheData) {
        const [l2Response, l2ExpireMilliseconds] = rawL2CacheData;
        await setWithCacheAdapter(id, methodKey, l2Response, l2ExpireMilliseconds, l1Cache, methodHitSource);
        cachedResponse = l2Response;
      }
    }
    const clonedMethod = cloneMethod(methodInstance);
    await beforeRequest(clonedMethod);
    const { baseURL, url: newUrl, type, data } = clonedMethod;
    const { params = {}, headers = {}, transform = $self, shareRequest } = getConfig(clonedMethod);
    const namespacedAdapterReturnMap = adapterReturnMap[id] = adapterReturnMap[id] || {};
    let requestAdapterCtrls = namespacedAdapterReturnMap[methodKey];
    let responseSuccessHandler = $self;
    let responseErrorHandler = undefinedValue;
    let responseCompleteHandler = noop;
    if (isFn(responded)) {
      responseSuccessHandler = responded;
    } else if (isPlainObject(responded)) {
      const { onSuccess: successHandler, onError: errorHandler, onComplete: completeHandler } = responded;
      responseSuccessHandler = isFn(successHandler) ? successHandler : responseSuccessHandler;
      responseErrorHandler = isFn(errorHandler) ? errorHandler : responseErrorHandler;
      responseCompleteHandler = isFn(completeHandler) ? completeHandler : responseCompleteHandler;
    }
    if (cachedResponse !== undefinedValue) {
      requestAdapterCtrlsPromiseResolveFn();
      sloughFunction(cacheLogger, defaultCacheLogger)(cachedResponse, clonedMethod, cacheMode, tag);
      responseCompleteHandler(clonedMethod);
      return cachedResponse;
    }
    fromCache = falseValue;
    if (!shareRequest || !requestAdapterCtrls) {
      const ctrls = requestAdapter({
        url: buildCompletedURL(baseURL, newUrl, params),
        type,
        data,
        headers
      }, clonedMethod);
      requestAdapterCtrls = namespacedAdapterReturnMap[methodKey] = ctrls;
    }
    requestAdapterCtrlsPromiseResolveFn(requestAdapterCtrls);
    const handleResponseTask = async (handlerReturns, responseHeaders, callInSuccess = trueValue) => {
      const responseData = await handlerReturns;
      const transformedData = await transform(responseData, responseHeaders || {});
      snapshots.save(methodInstance);
      try {
        await hitCacheBySource(clonedMethod);
      } catch (error) {
      }
      const requestBody = clonedMethod.data;
      const toCache = !requestBody || !isSpecialRequestBody(requestBody);
      if (toCache && callInSuccess) {
        try {
          await PromiseCls.all([
            setWithCacheAdapter(id, methodKey, transformedData, expireMilliseconds(MEMORY), l1Cache, methodHitSource),
            toStorage && setWithCacheAdapter(id, methodKey, transformedData, expireMilliseconds(STORAGE_RESTORE), l2Cache, methodHitSource, tag)
          ]);
        } catch (error) {
        }
      }
      return transformedData;
    };
    return promiseFinally(promiseThen(PromiseCls.all([requestAdapterCtrls.response(), requestAdapterCtrls.headers()]), ([rawResponse, rawHeaders]) => {
      deleteAttr(namespacedAdapterReturnMap, methodKey);
      return handleResponseTask(responseSuccessHandler(rawResponse, clonedMethod), rawHeaders);
    }, (error) => {
      deleteAttr(namespacedAdapterReturnMap, methodKey);
      return isFn(responseErrorHandler) ? (
        // 响应错误时，如果未抛出错误也将会处理响应成功的流程，但不缓存数据
        handleResponseTask(responseErrorHandler(error, clonedMethod), undefinedValue, falseValue)
      ) : promiseReject(error);
    }), () => {
      responseCompleteHandler(clonedMethod);
    });
  };
  return {
    // 请求中断函数
    abort: () => {
      promiseThen(requestAdapterCtrlsPromise, (requestAdapterCtrls) => requestAdapterCtrls && requestAdapterCtrls.abort());
    },
    onDownload: (handler) => {
      promiseThen(requestAdapterCtrlsPromise, (requestAdapterCtrls) => requestAdapterCtrls && requestAdapterCtrls.onDownload && requestAdapterCtrls.onDownload(handler));
    },
    onUpload: (handler) => {
      promiseThen(requestAdapterCtrlsPromise, (requestAdapterCtrls) => requestAdapterCtrls && requestAdapterCtrls.onUpload && requestAdapterCtrls.onUpload(handler));
    },
    response,
    fromCache: () => fromCache
  };
}
var offEventCallback = (offHandler, handlers) => () => {
  const index = handlers.indexOf(offHandler);
  index >= 0 && handlers.splice(index, 1);
};
var Method = class _Method {
  constructor(type, context, url, config, data) {
    this.dhs = [];
    this.uhs = [];
    this.fromCache = undefinedValue;
    const abortRequest = () => {
      abortRequest.a();
    };
    abortRequest.a = noop;
    const instance = this;
    const contextOptions = getContextOptions(context);
    instance.abort = abortRequest;
    instance.baseURL = contextOptions.baseURL || "";
    instance.url = url;
    instance.type = type;
    instance.context = context;
    const contextConcatConfig = {};
    const mergedLocalCacheKey = "cacheFor";
    const globalLocalCache = isPlainObject(contextOptions[mergedLocalCacheKey]) ? contextOptions[mergedLocalCacheKey][type] : undefinedValue;
    const hitSource = config && config.hitSource;
    forEach(["timeout", "shareRequest"], (mergedKey) => {
      if (contextOptions[mergedKey] !== undefinedValue) {
        contextConcatConfig[mergedKey] = contextOptions[mergedKey];
      }
    });
    if (globalLocalCache !== undefinedValue) {
      contextConcatConfig[mergedLocalCacheKey] = globalLocalCache;
    }
    if (hitSource) {
      instance.hitSource = mapItem(isArray(hitSource) ? hitSource : [hitSource], (sourceItem) => instanceOf(sourceItem, _Method) ? getMethodInternalKey(sourceItem) : sourceItem);
      deleteAttr(config, "hitSource");
    }
    instance.config = {
      ...contextConcatConfig,
      headers: {},
      params: {},
      ...config || {}
    };
    instance.data = data;
    instance.meta = config ? config.meta : instance.meta;
    instance.key = instance.generateKey();
  }
  /**
   * 绑定下载进度回调函数
   * @param progressHandler 下载进度回调函数
   * @version 2.17.0
   * @return 解绑函数
   */
  onDownload(downloadHandler) {
    pushItem(this.dhs, downloadHandler);
    return offEventCallback(downloadHandler, this.dhs);
  }
  /**
   * 绑定上传进度回调函数
   * @param progressHandler 上传进度回调函数
   * @version 2.17.0
   * @return 解绑函数
   */
  onUpload(uploadHandler) {
    pushItem(this.uhs, uploadHandler);
    return offEventCallback(uploadHandler, this.uhs);
  }
  /**
   * 通过method实例发送请求，返回promise对象
   */
  send(forceRequest = falseValue) {
    const instance = this;
    const { response, onDownload, onUpload, abort, fromCache } = sendRequest(instance, forceRequest);
    len(instance.dhs) > 0 && onDownload((loaded, total) => forEach(instance.dhs, (handler) => handler({ loaded, total })));
    len(instance.uhs) > 0 && onUpload((loaded, total) => forEach(instance.uhs, (handler) => handler({ loaded, total })));
    instance.abort.a = abort;
    instance.fromCache = undefinedValue;
    instance.promise = promiseThen(response(), (r) => {
      instance.fromCache = fromCache();
      return r;
    });
    return instance.promise;
  }
  /**
   * 设置方法名称，如果已有名称将被覆盖
   * @param name 方法名称
   */
  setName(name) {
    getConfig(this).name = name;
  }
  generateKey() {
    return key(this);
  }
  /**
   * 绑定resolve和/或reject Promise的callback
   * @param onfulfilled resolve Promise时要执行的回调
   * @param onrejected 当Promise被reject时要执行的回调
   * @returns 返回一个Promise，用于执行任何回调
   */
  then(onfulfilled, onrejected) {
    return promiseThen(this.send(), onfulfilled, onrejected);
  }
  /**
   * 绑定一个仅用于reject Promise的回调
   * @param onrejected 当Promise被reject时要执行的回调
   * @returns 返回一个完成回调的Promise
   */
  catch(onrejected) {
    return promiseCatch(this.send(), onrejected);
  }
  /**
   * 绑定一个回调，该回调在Promise结算（resolve或reject）时调用
   * @param onfinally Promise结算（resolve或reject）时执行的回调。
   * @return 返回一个完成回调的Promise。
   */
  finally(onfinally) {
    return promiseFinally(this.send(), onfinally);
  }
};
var myAssert = createAssert();
var undefStr2 = "undefined";
var pushItem2 = (ary, ...item) => ary.push(...item);
var mapItem2 = (ary, callbackfn) => ary.map(callbackfn);
var filterItem2 = (ary, predicate) => ary.filter(predicate);
typeof window === undefStr2 && (typeof process !== undefStr2 ? typeof process.cwd === "function" : typeof Deno !== undefStr2);
var createEventManager = () => {
  const eventMap = {};
  return {
    eventMap,
    on(type, handler) {
      const eventTypeItem = eventMap[type] = eventMap[type] || [];
      pushItem2(eventTypeItem, handler);
      return () => {
        eventMap[type] = filterItem2(eventTypeItem, (item) => item !== handler);
      };
    },
    off(type, handler) {
      const handlers = eventMap[type];
      if (!handlers) {
        return;
      }
      if (handler) {
        const index = handlers.indexOf(handler);
        index > -1 && handlers.splice(index, 1);
      } else {
        delete eventMap[type];
      }
    },
    emit(type, event) {
      const handlers = eventMap[type] || [];
      return mapItem2(handlers, (handler) => handler(event));
    }
  };
};
var EVENT_SUCCESS_KEY = "success";
var memoryAdapter = () => {
  let l1Cache = {};
  const l1CacheEmitter = createEventManager();
  const adapter = {
    set(key2, value) {
      l1Cache[key2] = value;
      l1CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: "set", key: key2, value, container: l1Cache });
    },
    get: (key2) => {
      const value = l1Cache[key2];
      l1CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: "get", key: key2, value, container: l1Cache });
      return value;
    },
    remove(key2) {
      deleteAttr(l1Cache, key2);
      l1CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: "remove", key: key2, container: l1Cache });
    },
    clear: () => {
      l1Cache = {};
      l1CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: "clear", key: "", container: l1Cache });
    },
    emitter: l1CacheEmitter
  };
  return adapter;
};
var storage = () => {
  myAssert(typeof localStorage !== "undefined", "l2Cache is not defined.");
  return localStorage;
};
var localStorageAdapter = () => {
  const l2CacheEmitter = createEventManager();
  const adapter = {
    set: (key2, value) => {
      storage().setItem(key2, JSONStringify(value));
      l2CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: "set", key: key2, value, container: storage() });
    },
    get: (key2) => {
      const data = storage().getItem(key2);
      const value = data ? JSONParse(data) : data;
      l2CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: "get", key: key2, value, container: storage() });
      return value;
    },
    remove: (key2) => {
      storage().removeItem(key2);
      l2CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: "remove", key: key2, container: storage() });
    },
    clear: () => {
      storage().clear();
      l2CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: "clear", key: "", container: storage() });
    },
    emitter: l2CacheEmitter
  };
  return adapter;
};
var SetCls = Set;
var MethodSnapshotContainer = class {
  constructor(capacity) {
    this.records = {};
    this.occupy = 0;
    myAssert(capacity >= 0, "expected snapshots limit to be >= 0");
    this.capacity = capacity;
  }
  /**
   * 保存method实例快照
   * @param methodInstance method实例
   */
  save(methodInstance) {
    const { name } = getConfig(methodInstance);
    const { records, occupy, capacity } = this;
    if (name && occupy < capacity) {
      const targetSnapshots = records[name] = records[name] || newInstance(SetCls);
      targetSnapshots.add(methodInstance);
      this.occupy += 1;
    }
  }
  /**
   * 获取Method实例快照，它将根据matcher来筛选出对应的Method实例
   * @param matcher 匹配的快照名称，可以是字符串或正则表达式、或带过滤函数的对象
   * @returns 匹配到的Method实例快照数组
   */
  match(matcher, matchAll = true) {
    let nameString;
    let nameReg;
    let matchHandler;
    let nameMatcher = matcher;
    if (isPlainObject(matcher)) {
      nameMatcher = matcher.name;
      matchHandler = matcher.filter;
    }
    if (instanceOf(nameMatcher, RegExpCls)) {
      nameReg = nameMatcher;
    } else if (isString(nameMatcher)) {
      nameString = nameMatcher;
    }
    const { records } = this;
    let matches = newInstance(SetCls);
    if (nameString) {
      matches = records[nameString] || matches;
    } else if (nameReg) {
      forEach(filterItem(objectKeys(records), (methodName) => nameReg.test(methodName)), (methodName) => {
        records[methodName].forEach((method) => matches.add(method));
      });
    }
    const fromMatchesArray = isFn(matchHandler) ? filterItem([...matches], matchHandler) : [...matches];
    return matchAll ? fromMatchesArray : fromMatchesArray[0];
  }
};
var typeGet = "GET";
var typeHead = "HEAD";
var typePost = "POST";
var typePut = "PUT";
var typePatch = "PATCH";
var typeDelete = "DELETE";
var typeOptions = "OPTIONS";
var defaultAlovaOptions = {
  /**
   * GET请求默认缓存5分钟（300000毫秒），其他请求默认不缓存
   */
  cacheFor: {
    [typeGet]: 3e5
  },
  /**
   * 共享请求默认为true
   */
  shareRequest: trueValue,
  /**
   * method快照数量，默认为1000
   */
  snapshots: 1e3
};
var idCount = 0;
var Alova = class {
  constructor(options) {
    var _a, _b;
    const instance = this;
    instance.id = (options.id || (idCount += 1)).toString();
    instance.l1Cache = options.l1Cache || memoryAdapter();
    instance.l2Cache = options.l2Cache || localStorageAdapter();
    instance.options = {
      ...defaultAlovaOptions,
      ...options
    };
    instance.snapshots = newInstance(MethodSnapshotContainer, (_b = (_a = options.snapshots) !== null && _a !== void 0 ? _a : defaultAlovaOptions.snapshots) !== null && _b !== void 0 ? _b : 0);
  }
  Get(url, config) {
    return newInstance(Method, typeGet, this, url, config);
  }
  Post(url, data = {}, config) {
    return newInstance(Method, typePost, this, url, config, data);
  }
  Delete(url, data = {}, config) {
    return newInstance(Method, typeDelete, this, url, config, data);
  }
  Put(url, data = {}, config) {
    return newInstance(Method, typePut, this, url, config, data);
  }
  Head(url, config) {
    return newInstance(Method, typeHead, this, url, config);
  }
  Patch(url, data = {}, config) {
    return newInstance(Method, typePatch, this, url, config, data);
  }
  Options(url, config) {
    return newInstance(Method, typeOptions, this, url, config);
  }
};
var boundStatesHook = undefinedValue;
var usingL1CacheAdapters = [];
var usingL2CacheAdapters = [];
var createAlova = (options) => {
  const alovaInstance = newInstance(Alova, options);
  const newStatesHook = alovaInstance.options.statesHook;
  if (boundStatesHook) {
    myAssert(boundStatesHook === newStatesHook, "expected to use the same `statesHook`");
  }
  boundStatesHook = newStatesHook;
  const { l1Cache, l2Cache } = alovaInstance;
  !usingL1CacheAdapters.includes(l1Cache) && pushItem(usingL1CacheAdapters, l1Cache);
  !usingL2CacheAdapters.includes(l2Cache) && pushItem(usingL2CacheAdapters, l2Cache);
  return alovaInstance;
};
var promiseStatesHook = () => {
  myAssert(!!boundStatesHook, `\`statesHook\` is not set in alova instance`);
  return boundStatesHook;
};

export {
  AlovaError,
  createAssert,
  globalConfigMap,
  globalConfig,
  queryCache,
  setCache,
  invalidateCache,
  hitCacheBySource,
  Method,
  createAlova,
  promiseStatesHook
};
//# sourceMappingURL=chunk-ROFPYCF6.js.map
