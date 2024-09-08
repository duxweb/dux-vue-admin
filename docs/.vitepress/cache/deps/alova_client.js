import {
  AlovaError,
  Method,
  createAssert,
  globalConfigMap,
  hitCacheBySource,
  invalidateCache,
  promiseStatesHook,
  queryCache,
  setCache
} from "./chunk-ROFPYCF6.js";
import {
  $self,
  MEMORY,
  ObjectCls,
  PromiseCls,
  RegExpCls,
  buildNamespacedCacheKey,
  clearTimeoutTimer,
  createAsyncQueue,
  defineProperty,
  delayWithBackoff,
  deleteAttr,
  falseValue,
  filterItem,
  forEach,
  getConfig,
  getContext,
  getHandlerMethod,
  getLocalCacheConfigParam,
  getMethodInternalKey,
  getOptions,
  getTime,
  globalToString,
  includes,
  instanceOf,
  isArray,
  isFn,
  isNumber,
  isObject,
  isPlainObject,
  isString,
  len,
  mapItem,
  newInstance,
  noop,
  nullValue,
  objAssign,
  objectKeys,
  objectValues,
  omit,
  promiseCatch,
  promiseFinally,
  promiseReject,
  promiseResolve,
  promiseThen,
  pushItem,
  regexpTest,
  setTimeoutFn,
  shift,
  sloughConfig,
  splice,
  statesHookHelper,
  trueValue,
  undefinedValue,
  usePromise,
  uuid,
  valueObject,
  walkObject
} from "./chunk-4HOVM5XU.js";
import "./chunk-G3PMV62Z.js";

// node_modules/alova/dist/clienthook/index.esm.js
var defaultVisitorMeta = {
  authRole: null
};
var defaultLoginMeta = {
  authRole: "login"
};
var defaultLogoutMeta = {
  authRole: "logout"
};
var defaultRefreshTokenMeta = {
  authRole: "refreshToken"
};
var checkMethodRole = ({ meta }, metaMatches) => {
  if (isPlainObject(meta)) {
    for (const key in meta) {
      if (Object.prototype.hasOwnProperty.call(meta, key)) {
        const matchedMetaItem = metaMatches[key];
        if (instanceOf(matchedMetaItem, RegExp) ? matchedMetaItem.test(meta[key]) : meta[key] === matchedMetaItem) {
          return trueValue;
        }
      }
    }
  }
  return falseValue;
};
var waitForTokenRefreshed = (method, waitingList) => newInstance(PromiseCls, (resolve) => {
  pushItem(waitingList, {
    method,
    resolve
  });
});
var callHandlerIfMatchesMeta = (method, authorizationInterceptor, defaultMeta, response) => {
  if (checkMethodRole(method, (authorizationInterceptor === null || authorizationInterceptor === void 0 ? void 0 : authorizationInterceptor.metaMatches) || defaultMeta)) {
    const handler = isFn(authorizationInterceptor) ? authorizationInterceptor : isPlainObject(authorizationInterceptor) && isFn(authorizationInterceptor.handler) ? authorizationInterceptor.handler : noop;
    return handler(response, method);
  }
};
var refreshTokenIfExpired = async (method, waitingList, updateRefreshStatus, handlerParams, refreshToken, tokenRefreshing) => {
  const fromResponse = len(handlerParams) >= 2;
  let isExpired = refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.isExpired(...handlerParams);
  if (instanceOf(isExpired, PromiseCls)) {
    isExpired = await isExpired;
  }
  if (isExpired) {
    try {
      let intentToRefreshToken = trueValue;
      if (fromResponse && tokenRefreshing) {
        intentToRefreshToken = falseValue;
        await waitForTokenRefreshed(method, waitingList);
      }
      if (intentToRefreshToken) {
        updateRefreshStatus(trueValue);
        await (refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.handler(...handlerParams));
        updateRefreshStatus(falseValue);
        forEach(waitingList, ({ resolve }) => resolve());
      }
      if (fromResponse) {
        const { config } = method;
        const methodTransformData = config.transform;
        config.transform = undefinedValue;
        const resentData = await method;
        config.transform = methodTransformData;
        return resentData;
      }
    } finally {
      updateRefreshStatus(falseValue);
      splice(waitingList, 0, len(waitingList));
    }
  }
};
var onResponded2Record = (onRespondedHandlers) => {
  let successHandler = undefinedValue;
  let errorHandler = undefinedValue;
  let onCompleteHandler = undefinedValue;
  if (isFn(onRespondedHandlers)) {
    successHandler = onRespondedHandlers;
  } else if (isPlainObject(onRespondedHandlers)) {
    const { onSuccess, onError, onComplete } = onRespondedHandlers;
    successHandler = isFn(onSuccess) ? onSuccess : successHandler;
    errorHandler = isFn(onError) ? onError : errorHandler;
    onCompleteHandler = isFn(onComplete) ? onComplete : onCompleteHandler;
  }
  return {
    onSuccess: successHandler,
    onError: errorHandler,
    onComplete: onCompleteHandler
  };
};
var createClientTokenAuthentication = ({ visitorMeta, login, logout, refreshToken, assignToken = noop }) => {
  let tokenRefreshing = falseValue;
  const waitingList = [];
  const onAuthRequired = (onBeforeRequest) => async (method) => {
    const isVisitorRole = checkMethodRole(method, visitorMeta || defaultVisitorMeta);
    const isLoginRole = checkMethodRole(method, (login === null || login === void 0 ? void 0 : login.metaMatches) || defaultLoginMeta);
    if (!isVisitorRole && !isLoginRole && !checkMethodRole(method, (refreshToken === null || refreshToken === void 0 ? void 0 : refreshToken.metaMatches) || defaultRefreshTokenMeta)) {
      if (tokenRefreshing) {
        await waitForTokenRefreshed(method, waitingList);
      }
      await refreshTokenIfExpired(method, waitingList, (refreshing) => {
        tokenRefreshing = refreshing;
      }, [method], refreshToken);
    }
    if (!isVisitorRole && !isLoginRole) {
      await assignToken(method);
    }
    return onBeforeRequest === null || onBeforeRequest === void 0 ? void 0 : onBeforeRequest(method);
  };
  const onResponseRefreshToken = (originalResponded) => {
    const respondedRecord = onResponded2Record(originalResponded);
    return {
      ...respondedRecord,
      onSuccess: async (response, method) => {
        await callHandlerIfMatchesMeta(method, login, defaultLoginMeta, response);
        await callHandlerIfMatchesMeta(method, logout, defaultLogoutMeta, response);
        return (respondedRecord.onSuccess || $self)(response, method);
      }
    };
  };
  return {
    waitingList,
    onAuthRequired,
    onResponseRefreshToken
  };
};
var createServerTokenAuthentication = ({ visitorMeta, login, logout, refreshTokenOnSuccess, refreshTokenOnError, assignToken = noop }) => {
  let tokenRefreshing = falseValue;
  const waitingList = [];
  const onAuthRequired = (onBeforeRequest) => async (method) => {
    const isVisitorRole = checkMethodRole(method, visitorMeta || defaultVisitorMeta);
    const isLoginRole = checkMethodRole(method, (login === null || login === void 0 ? void 0 : login.metaMatches) || defaultLoginMeta);
    if (!isVisitorRole && !isLoginRole && !checkMethodRole(method, (refreshTokenOnSuccess === null || refreshTokenOnSuccess === void 0 ? void 0 : refreshTokenOnSuccess.metaMatches) || defaultRefreshTokenMeta) && !checkMethodRole(method, (refreshTokenOnError === null || refreshTokenOnError === void 0 ? void 0 : refreshTokenOnError.metaMatches) || defaultRefreshTokenMeta)) {
      if (tokenRefreshing) {
        await waitForTokenRefreshed(method, waitingList);
      }
    }
    if (!isVisitorRole && !isLoginRole) {
      await assignToken(method);
    }
    return onBeforeRequest === null || onBeforeRequest === void 0 ? void 0 : onBeforeRequest(method);
  };
  const onResponseRefreshToken = (onRespondedHandlers) => {
    const respondedRecord = onResponded2Record(onRespondedHandlers);
    return {
      ...respondedRecord,
      onSuccess: async (response, method) => {
        if (!checkMethodRole(method, visitorMeta || defaultVisitorMeta) && !checkMethodRole(method, (login === null || login === void 0 ? void 0 : login.metaMatches) || defaultLoginMeta) && !checkMethodRole(method, (refreshTokenOnSuccess === null || refreshTokenOnSuccess === void 0 ? void 0 : refreshTokenOnSuccess.metaMatches) || defaultRefreshTokenMeta)) {
          const dataResent = await refreshTokenIfExpired(method, waitingList, (refreshing) => {
            tokenRefreshing = refreshing;
          }, [response, method], refreshTokenOnSuccess, tokenRefreshing);
          if (dataResent) {
            return dataResent;
          }
        }
        await callHandlerIfMatchesMeta(method, login, defaultLoginMeta, response);
        await callHandlerIfMatchesMeta(method, logout, defaultLogoutMeta, response);
        return (respondedRecord.onSuccess || $self)(response, method);
      },
      onError: async (error, method) => {
        if (!checkMethodRole(method, visitorMeta || defaultVisitorMeta) && !checkMethodRole(method, (login === null || login === void 0 ? void 0 : login.metaMatches) || defaultLoginMeta) && !checkMethodRole(method, (refreshTokenOnError === null || refreshTokenOnError === void 0 ? void 0 : refreshTokenOnError.metaMatches) || defaultRefreshTokenMeta)) {
          const dataResent = await refreshTokenIfExpired(method, waitingList, (refreshing) => {
            tokenRefreshing = refreshing;
          }, [error, method], refreshTokenOnError, tokenRefreshing);
          if (dataResent) {
            return dataResent;
          }
        }
        return (respondedRecord.onError || noop)(error, method);
      }
    };
  };
  return {
    waitingList,
    onAuthRequired,
    onResponseRefreshToken
  };
};
var coreAssert = createAssert("");
var requestHookAssert = createAssert("useRequest");
var watcherHookAssert = createAssert("useWatcher");
var fetcherHookAssert = createAssert("useFetcher");
var coreHookAssert = (hookType) => ({
  [
    1
    /* EnumHookType.USE_REQUEST */
  ]: requestHookAssert,
  [
    2
    /* EnumHookType.USE_WATCHER */
  ]: watcherHookAssert,
  [
    3
    /* EnumHookType.USE_FETCHER */
  ]: fetcherHookAssert
})[hookType];
var assertMethod = (assert2, methodInstance) => assert2(instanceOf(methodInstance, Method), "expected a method instance.");
var throwFn = (error) => {
  throw error;
};
function useCallback(onCallbackChange = noop) {
  let callbacks = [];
  const setCallback = (fn) => {
    if (!callbacks.includes(fn)) {
      callbacks.push(fn);
      onCallbackChange(callbacks);
    }
    return () => {
      callbacks = filterItem(callbacks, (e) => e !== fn);
      onCallbackChange(callbacks);
    };
  };
  const triggerCallback = (...args) => {
    if (callbacks.length > 0) {
      return forEach(callbacks, (fn) => fn(...args));
    }
  };
  const removeAllCallback = () => {
    callbacks = [];
    onCallbackChange(callbacks);
  };
  return [setCallback, triggerCallback, removeAllCallback];
}
var debounce = (fn, delay) => {
  let timer = nullValue;
  return function debounceFn(...args) {
    const bindFn = fn.bind(this, ...args);
    const delayMill = isNumber(delay) ? delay : delay(...args);
    timer && clearTimeoutTimer(timer);
    if (delayMill > 0) {
      timer = setTimeoutFn(bindFn, delayMill);
    } else {
      bindFn();
    }
  };
};
var getHandlerMethod2 = (methodHandler, args = []) => {
  const methodInstance = isFn(methodHandler) ? methodHandler(...args) : methodHandler;
  createAssert("scene")(instanceOf(methodInstance, Method), "hook handler must be a method instance or a function that returns method instance");
  return methodInstance;
};
var mapObject = (obj, callback) => {
  const ret = {};
  for (const key in obj) {
    ret[key] = callback(obj[key], key, obj);
  }
  return ret;
};
var undefStr = "undefined";
var pushItem2 = (ary, ...item) => ary.push(...item);
var mapItem2 = (ary, callbackfn) => ary.map(callbackfn);
var filterItem2 = (ary, predicate) => ary.filter(predicate);
typeof window === undefStr && (typeof process !== undefStr ? typeof process.cwd === "function" : typeof Deno !== undefStr);
var uuid2 = () => {
  const timestamp = (/* @__PURE__ */ new Date()).getTime();
  return Math.floor(Math.random() * timestamp).toString(36);
};
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
var decorateEvent = (onEvent, decoratedHandler) => {
  const emitter = createEventManager();
  const eventType = uuid2();
  const eventReturn = onEvent((event) => emitter.emit(eventType, event));
  return (handler) => {
    emitter.on(eventType, (event) => {
      decoratedHandler(handler, event);
    });
    return eventReturn;
  };
};
var KEY_SUCCESS = "success";
var KEY_ERROR = "error";
var KEY_COMPLETE = "complete";
var createHook = (ht, c, eventManager, ro) => ({
  /** 最后一次请求的method实例 */
  m: undefinedValue,
  /** saveStatesFns */
  sf: [],
  /** removeStatesFns */
  rf: [],
  /** frontStates */
  fs: {},
  /** eventManager */
  em: eventManager,
  /** hookType, useRequest=1, useWatcher=2, useFetcher=3 */
  ht,
  /** hook config */
  c,
  /** referingObject */
  ro,
  /** managedStates */
  ms: {}
});
var AlovaEventBase = class _AlovaEventBase {
  constructor(method, args) {
    this.method = method;
    this.args = args;
  }
  clone() {
    return { ...this };
  }
  static spawn(method, args) {
    return new _AlovaEventBase(method, args);
  }
};
var AlovaSuccessEvent = class extends AlovaEventBase {
  constructor(base, data, fromCache) {
    super(base.method, base.args);
    this.data = data;
    this.fromCache = fromCache;
  }
};
var AlovaErrorEvent = class extends AlovaEventBase {
  constructor(base, error) {
    super(base.method, base.args);
    this.error = error;
  }
};
var AlovaCompleteEvent = class extends AlovaEventBase {
  constructor(base, status, data, fromCache, error) {
    super(base.method, base.args);
    this.status = status;
    this.data = data;
    this.fromCache = status === "error" ? false : fromCache;
    this.error = error;
  }
};
var defaultMiddleware = (_, next) => next();
var stateCache = {};
var getStateCache = (namespace, key) => {
  const cachedState = stateCache[namespace] || {};
  return cachedState[key] || {};
};
var setStateCache = (namespace, key, data, hookInstance) => {
  const cachedState = stateCache[namespace] = stateCache[namespace] || {};
  cachedState[key] = {
    s: data,
    h: hookInstance
  };
};
var removeStateCache = (namespace, key) => {
  const cachedState = stateCache[namespace];
  if (cachedState) {
    deleteAttr(cachedState, key);
  }
};
function useHookToSendRequest(hookInstance, methodHandler, sendCallingArgs = []) {
  const currentHookAssert = coreHookAssert(hookInstance.ht);
  let methodInstance = getHandlerMethod(methodHandler, currentHookAssert, sendCallingArgs);
  const { fs: frontStates, ht: hookType, c: useHookConfig, ms: managedStates } = hookInstance;
  const { loading: loadingState, data: dataState, error: errorState } = frontStates;
  const isFetcher = hookType === 3;
  const { force: forceRequest = falseValue, middleware = defaultMiddleware } = useHookConfig;
  const alovaInstance = getContext(methodInstance);
  const { id } = alovaInstance;
  const methodKey = getMethodInternalKey(methodInstance);
  const { abortLast = trueValue } = useHookConfig;
  hookInstance.m = methodInstance;
  return (async () => {
    let removeStates = noop;
    let saveStates = noop;
    let isNextCalled = falseValue;
    let responseHandlePromise = promiseResolve(undefinedValue);
    let offDownloadEvent = noop;
    let offUploadEvent = noop;
    const cachedResponse = await queryCache(methodInstance);
    let fromCache = () => !!cachedResponse;
    let controlledLoading = falseValue;
    if (!isFetcher) {
      saveStates = (frontStates2) => setStateCache(id, methodKey, frontStates2, hookInstance);
      saveStates({ ...frontStates, ...managedStates });
      removeStates = () => removeStateCache(id, methodKey);
    }
    const guardNext = (guardNextConfig) => {
      isNextCalled = trueValue;
      const { force: guardNextForceRequest = forceRequest, method: guardNextReplacingMethod = methodInstance } = guardNextConfig || {};
      const forceRequestFinally = sloughConfig(guardNextForceRequest, [
        newInstance(AlovaEventBase, methodInstance, sendCallingArgs)
      ]);
      const progressUpdater = (stage) => ({ loaded, total }) => {
        frontStates[stage].v = {
          loaded,
          total
        };
      };
      methodInstance = guardNextReplacingMethod;
      pushItem(hookInstance.sf, saveStates);
      pushItem(hookInstance.rf, removeStates);
      if (!controlledLoading) {
        loadingState.v = !!forceRequestFinally || !cachedResponse;
      }
      const { downloading: enableDownload, uploading: enableUpload } = hookInstance.ro.trackedKeys;
      offDownloadEvent = enableDownload ? methodInstance.onDownload(progressUpdater("downloading")) : offDownloadEvent;
      offUploadEvent = enableUpload ? methodInstance.onUpload(progressUpdater("uploading")) : offUploadEvent;
      responseHandlePromise = methodInstance.send(forceRequestFinally);
      fromCache = () => methodInstance.fromCache || falseValue;
      return responseHandlePromise;
    };
    const commonContext = {
      method: methodInstance,
      cachedResponse,
      config: useHookConfig,
      abort: () => methodInstance.abort()
    };
    const toUpdateResponse = () => hookType !== 2 || !abortLast || hookInstance.m === methodInstance;
    const middlewareCompletePromise = isFetcher ? middleware({
      ...commonContext,
      args: sendCallingArgs,
      fetch: (methodInstance2, ...args) => {
        assertMethod(currentHookAssert, methodInstance2);
        return useHookToSendRequest(hookInstance, methodInstance2, args);
      },
      proxyStates: omit(frontStates, "data"),
      controlFetching(control = trueValue) {
        controlledLoading = control;
      }
    }, guardNext) : middleware({
      ...commonContext,
      args: sendCallingArgs,
      send: (...args) => useHookToSendRequest(hookInstance, methodHandler, args),
      proxyStates: frontStates,
      controlLoading(control = trueValue) {
        controlledLoading = control;
      }
    }, guardNext);
    let finallyResponse = undefinedValue;
    const baseEvent = AlovaEventBase.spawn(methodInstance, sendCallingArgs);
    try {
      const middlewareReturnedData = await middlewareCompletePromise;
      const afterSuccess = (data) => {
        if (!isFetcher) {
          toUpdateResponse() && (dataState.v = data);
        } else if (hookInstance.c.updateState !== falseValue) {
          const cachedState = getStateCache(id, methodKey).s;
          cachedState && (cachedState.data.v = data);
        }
        if (toUpdateResponse()) {
          errorState.v = undefinedValue;
          !controlledLoading && (loadingState.v = falseValue);
          hookInstance.em.emit(KEY_SUCCESS, newInstance(AlovaSuccessEvent, baseEvent, data, fromCache()));
          hookInstance.em.emit(KEY_COMPLETE, newInstance(AlovaCompleteEvent, baseEvent, KEY_SUCCESS, data, fromCache(), undefinedValue));
        }
        return data;
      };
      finallyResponse = // 中间件中未返回数据或返回undefined时，去获取真实的响应数据
      // 否则使用返回数据并不再等待响应promise，此时也需要调用响应回调
      middlewareReturnedData !== undefinedValue ? afterSuccess(middlewareReturnedData) : isNextCalled ? (
        // 当middlewareCompletePromise为resolve时有两种可能
        // 1. 请求正常
        // 2. 请求错误，但错误被中间件函数捕获了，此时也将调用成功回调，即afterSuccess(undefinedValue)
        await promiseThen(responseHandlePromise, afterSuccess, () => afterSuccess(undefinedValue))
      ) : (
        // 如果isNextCalled未被调用，则不返回数据
        undefinedValue
      );
      !isNextCalled && !controlledLoading && (loadingState.v = falseValue);
    } catch (error) {
      if (toUpdateResponse()) {
        errorState.v = error;
        !controlledLoading && (loadingState.v = falseValue);
        hookInstance.em.emit(KEY_ERROR, newInstance(AlovaErrorEvent, baseEvent, error));
        hookInstance.em.emit(KEY_COMPLETE, newInstance(AlovaCompleteEvent, baseEvent, KEY_ERROR, undefinedValue, fromCache(), error));
      }
      throw error;
    }
    offDownloadEvent();
    offUploadEvent();
    return finallyResponse;
  })();
}
var refCurrent = (ref) => ref.current;
function createRequestState(hookType, methodHandler, useHookConfig, initialData, immediate = falseValue, watchingStates, debounceDelay = 0) {
  var _a;
  useHookConfig = { ...useHookConfig };
  const { middleware, __referingObj: referingObject = { trackedKeys: {}, bindError: falseValue } } = useHookConfig;
  let initialLoading = middleware ? falseValue : !!immediate;
  if (immediate && !middleware) {
    try {
      const methodInstance = getHandlerMethod(methodHandler, coreHookAssert(hookType));
      const alovaInstance = getContext(methodInstance);
      const l1CacheResult = alovaInstance.l1Cache.get(buildNamespacedCacheKey(alovaInstance.id, getMethodInternalKey(methodInstance)));
      let cachedResponse = undefinedValue;
      if (l1CacheResult && !instanceOf(l1CacheResult, PromiseCls)) {
        const [data2, expireTimestamp] = l1CacheResult;
        if (!expireTimestamp || expireTimestamp > getTime()) {
          cachedResponse = data2;
        }
      }
      const forceRequestFinally = sloughConfig((_a = useHookConfig.force) !== null && _a !== void 0 ? _a : falseValue);
      initialLoading = !!forceRequestFinally || !cachedResponse;
    } catch (error2) {
    }
  }
  const { create, effectRequest, ref, objectify, exposeProvider, transformState2Proxy } = statesHookHelper(promiseStatesHook(), referingObject);
  const progress = {
    total: 0,
    loaded: 0
  };
  const { managedStates = {} } = useHookConfig;
  const managedStatesProxy = mapObject(managedStates, (state, key) => transformState2Proxy(state, key));
  const data = create(isFn(initialData) ? initialData() : initialData, "data");
  const loading = create(initialLoading, "loading");
  const error = create(undefinedValue, "error");
  const downloading = create({ ...progress }, "downloading");
  const uploading = create({ ...progress }, "uploading");
  const frontStates = objectify([data, loading, error, downloading, uploading]);
  const eventManager = createEventManager();
  const hookInstance = refCurrent(ref(createHook(hookType, useHookConfig, eventManager, referingObject)));
  hookInstance.fs = frontStates;
  hookInstance.em = eventManager;
  hookInstance.c = useHookConfig;
  hookInstance.ms = managedStatesProxy;
  const hasWatchingStates = watchingStates !== undefinedValue;
  const handleRequest = (handler = methodHandler, sendCallingArgs) => useHookToSendRequest(hookInstance, handler, sendCallingArgs);
  const wrapEffectRequest = (ro = referingObject, handler) => promiseCatch(handleRequest(handler), (error2) => {
    if (!ro.bindError && !ro.trackedKeys.error) {
      throw error2;
    }
  });
  const debouncingSendHandler = ref(debounce((delay, ro, handler) => wrapEffectRequest(ro, handler), (changedIndex) => isNumber(changedIndex) ? isArray(debounceDelay) ? debounceDelay[changedIndex] : debounceDelay : 0));
  if (!globalConfigMap.ssr) {
    effectRequest({
      handler: (
        // watchingStates为数组时表示监听状态（包含空数组），为undefined时表示不监听状态
        hasWatchingStates ? (delay) => debouncingSendHandler.current(delay, referingObject, methodHandler) : () => wrapEffectRequest(referingObject)
      ),
      removeStates: () => forEach(hookInstance.rf, (fn) => fn()),
      saveStates: (states) => forEach(hookInstance.sf, (fn) => fn(states)),
      frontStates: { ...frontStates, ...managedStatesProxy },
      watchingStates,
      immediate: immediate !== null && immediate !== void 0 ? immediate : trueValue
    });
  }
  return exposeProvider({
    ...objectify([data, loading, error, downloading, uploading]),
    abort: () => hookInstance.m && hookInstance.m.abort(),
    /**
     * 通过执行该方法来手动发起请求
     * @param sendCallingArgs 调用send函数时传入的参数
     * @param methodInstance 方法对象
     * @param isFetcher 是否为isFetcher调用
     * @returns 请求promise
     */
    send: (sendCallingArgs, methodInstance) => handleRequest(methodInstance, sendCallingArgs),
    onSuccess(handler) {
      eventManager.on(KEY_SUCCESS, handler);
    },
    onError(handler) {
      referingObject.bindError = trueValue;
      eventManager.on(KEY_ERROR, handler);
    },
    onComplete(handler) {
      eventManager.on(KEY_COMPLETE, handler);
    }
  });
}
function useFetcher(config = {}) {
  const props = createRequestState(3, noop, config);
  const { send } = props;
  deleteAttr(props, "send");
  return objAssign(props, {
    /**
     * Fetch data
     * fetch will definitely send a request, and if the currently requested data has a corresponding management state, this state will be updated.
     * @param matcher Method object
     */
    fetch: (matcher, ...args) => {
      assertMethod(fetcherHookAssert, matcher);
      return send(args, matcher);
    }
  });
}
function useRequest(handler, config = {}) {
  const { immediate = trueValue, initialData } = config;
  const props = createRequestState(1, handler, config, initialData, !!immediate);
  const { send } = props;
  return objAssign(props, {
    send: (...args) => send(args)
  });
}
function useWatcher(handler, watchingStates, config = {}) {
  watcherHookAssert(watchingStates && len(watchingStates) > 0, "expected at least one watching state");
  const { immediate, debounce: debounce2 = 0, initialData } = config;
  const props = createRequestState(
    2,
    handler,
    config,
    initialData,
    !!immediate,
    // !!immediate means not send request immediately
    watchingStates,
    debounce2
  );
  const { send } = props;
  return objAssign(props, {
    send: (...args) => send(args)
  });
}
var assertSerialHandlers = (hookName, serialHandlers) => createAssert(hookName)(isArray(serialHandlers) && len(serialHandlers) > 0, "please use an array to represent serial requests");
var serialMiddleware = (serialHandlers, hookMiddleware, serialRequestMethods = []) => {
  serialHandlers.shift();
  return (ctx, next) => {
    hookMiddleware === null || hookMiddleware === void 0 ? void 0 : hookMiddleware(ctx, () => promiseResolve(undefinedValue));
    ctx.controlLoading();
    const loadingState = ctx.proxyStates.loading;
    loadingState.v = trueValue;
    let serialPromise = next();
    for (const handler of serialHandlers) {
      serialPromise = promiseThen(serialPromise, (value) => {
        const methodItem = handler(value, ...ctx.args);
        pushItem(serialRequestMethods, methodItem);
        return methodItem.send();
      });
    }
    return serialPromise.finally(() => {
      loadingState.v = falseValue;
    });
  };
};
var useSerialRequest = (serialHandlers, config = {}) => {
  assertSerialHandlers("useSerialRequest", serialHandlers);
  const { ref, __referingObj } = statesHookHelper(promiseStatesHook());
  const methods = ref([]).current;
  const exposures = useRequest(serialHandlers[0], {
    ...config,
    __referingObj,
    middleware: serialMiddleware(serialHandlers, config.middleware, methods)
  });
  exposures.onError = decorateEvent(exposures.onError, (handler, event) => {
    event.method = methods[len(methods) - 1];
    handler(event);
  });
  return exposures;
};
var useSerialWatcher = (serialHandlers, watchingStates, config = {}) => {
  assertSerialHandlers("useSerialWatcher", serialHandlers);
  const { ref, __referingObj } = statesHookHelper(promiseStatesHook());
  const methods = ref([]).current;
  const exposures = useWatcher(serialHandlers[0], watchingStates, {
    ...config,
    __referingObj,
    middleware: serialMiddleware(serialHandlers, config.middleware, methods)
  });
  exposures.onError = decorateEvent(exposures.onError, (handler, event) => {
    event.method = methods[len(methods) - 1];
    handler(event);
  });
  return exposures;
};
var STR_VALUE_OF = "valueOf";
var DEFAULT_QUEUE_NAME = "default";
var BEHAVIOR_SILENT = "silent";
var BEHAVIOR_QUEUE = "queue";
var BEHAVIOR_STATIC = "static";
var vDataIdCollectBasket;
var setVDataIdCollectBasket = (value) => {
  vDataIdCollectBasket = value;
};
var dependentAlovaInstance;
var setDependentAlova = (alovaInst) => {
  dependentAlovaInstance = alovaInst;
};
var customSerializers = {};
var setCustomSerializers = (serializers = {}) => {
  customSerializers = serializers;
};
var silentFactoryStatus = 0;
var setSilentFactoryStatus = (status) => {
  silentFactoryStatus = status;
};
var queueRequestWaitSetting = [];
var setQueueRequestWaitSetting = (requestWaitSetting = 0) => {
  queueRequestWaitSetting = isArray(requestWaitSetting) ? requestWaitSetting : [
    {
      queue: DEFAULT_QUEUE_NAME,
      wait: requestWaitSetting
    }
  ];
};
var BootEventKey = Symbol("GlobalSQBoot");
var BeforeEventKey = Symbol("GlobalSQBefore");
var SuccessEventKey = Symbol("GlobalSQSuccess");
var ErrorEventKey = Symbol("GlobalSQError");
var FailEventKey$1 = Symbol("GlobalSQFail");
var globalSQEventManager = createEventManager();
var silentAssert = createAssert("useSQRequest");
var AlovaSSEEvent = class extends AlovaEventBase {
  constructor(base, eventSource) {
    super(base.method, base.args);
    this.eventSource = eventSource;
  }
};
var AlovaSSEErrorEvent = class extends AlovaSSEEvent {
  constructor(base, error) {
    super(base, base.eventSource);
    this.error = error;
  }
};
var AlovaSSEMessageEvent = class extends AlovaSSEEvent {
  constructor(base, data) {
    super(base, base.eventSource);
    this.data = data;
  }
};
var SQEvent = class {
  constructor(behavior, method, silentMethod) {
    this.behavior = behavior;
    this.method = method;
    this.silentMethod = silentMethod;
  }
};
var GlobalSQEvent = class extends SQEvent {
  constructor(behavior, method, silentMethod, queueName, retryTimes) {
    super(behavior, method, silentMethod);
    this.queueName = queueName;
    this.retryTimes = retryTimes;
  }
};
var GlobalSQSuccessEvent = class extends GlobalSQEvent {
  constructor(behavior, method, silentMethod, queueName, retryTimes, data, vDataResponse) {
    super(behavior, method, silentMethod, queueName, retryTimes);
    this.data = data;
    this.vDataResponse = vDataResponse;
  }
};
var GlobalSQErrorEvent = class extends GlobalSQEvent {
  constructor(behavior, method, silentMethod, queueName, retryTimes, error, retryDelay) {
    super(behavior, method, silentMethod, queueName, retryTimes);
    this.error = error;
    this.retryDelay = retryDelay;
  }
};
var GlobalSQFailEvent = class extends GlobalSQEvent {
  constructor(behavior, method, silentMethod, queueName, retryTimes, error) {
    super(behavior, method, silentMethod, queueName, retryTimes);
    this.error = error;
  }
};
var ScopedSQEvent = class extends SQEvent {
  constructor(behavior, method, silentMethod, args) {
    super(behavior, method, silentMethod);
    this.args = args;
  }
};
var ScopedSQSuccessEvent = class extends ScopedSQEvent {
  constructor(behavior, method, silentMethod, args, data) {
    super(behavior, method, silentMethod, args);
    this.data = data;
  }
};
var ScopedSQErrorEvent = class extends ScopedSQEvent {
  constructor(behavior, method, silentMethod, args, error) {
    super(behavior, method, silentMethod, args);
    this.error = error;
  }
};
var ScopedSQRetryEvent = class extends ScopedSQEvent {
  constructor(behavior, method, silentMethod, args, retryTimes, retryDelay) {
    super(behavior, method, silentMethod, args);
    this.retryTimes = retryTimes;
    this.retryDelay = retryDelay;
  }
};
var ScopedSQCompleteEvent = class extends ScopedSQEvent {
  constructor(behavior, method, silentMethod, args, status, data, error) {
    super(behavior, method, silentMethod, args);
    this.status = status;
    this.data = data;
    this.error = error;
  }
};
var RetriableRetryEvent = class extends AlovaEventBase {
  constructor(base, retryTimes, retryDelay) {
    super(base.method, base.args);
    this.retryTimes = retryTimes;
    this.retryDelay = retryDelay;
  }
};
var RetriableFailEvent = class extends AlovaErrorEvent {
  constructor(base, error, retryTimes) {
    super(base, error);
    this.retryTimes = retryTimes;
  }
};
async function updateState(matcher, handleUpdate) {
  let updated = falseValue;
  if (matcher) {
    const { update } = promiseStatesHook();
    const methodKey = getMethodInternalKey(matcher);
    const { id } = getContext(matcher);
    const { s: frontStates, h: hookInstance } = getStateCache(id, methodKey);
    const updateStateCollection = isFn(handleUpdate) ? { data: handleUpdate } : handleUpdate;
    let updatedDataColumnData = undefinedValue;
    if (frontStates) {
      forEach(objectKeys(updateStateCollection), (stateName) => {
        coreAssert(stateName in frontStates, `state named \`${stateName}\` is not found`);
        const targetStateProxy = frontStates[stateName];
        let updatedData = updateStateCollection[stateName](targetStateProxy.v);
        updatedData = isArray(updatedData) ? [...updatedData] : isObject(updatedData) ? { ...updatedData } : updatedData;
        if (stateName === "data") {
          updatedDataColumnData = updatedData;
        }
        update(updatedData, frontStates[stateName].s, stateName, hookInstance.ro);
      });
      updated = trueValue;
    }
    if (updatedDataColumnData !== undefinedValue) {
      setCache(matcher, updatedDataColumnData);
    }
  }
  return updated;
}
var dateSerializer = {
  forward: (data) => instanceOf(data, Date) ? data.getTime() : undefinedValue,
  backward: (ts) => newInstance(Date, ts)
};
var regexpSerializer = {
  forward: (data) => instanceOf(data, RegExp) ? data.source : void 0,
  backward: (source) => newInstance(RegExp, source)
};
var createSerializerPerformer = (customSerializers2 = {}) => {
  const serializers = {
    date: dateSerializer,
    regexp: regexpSerializer,
    ...customSerializers2
  };
  const serialize = (payload) => {
    if (isObject(payload)) {
      payload = walkObject(isArray(payload) ? [...payload] : { ...payload }, (value) => {
        let finallyApplySerializerName = undefinedValue;
        const serializedValue = objectKeys(serializers).reduce((currentValue, serializerName) => {
          if (!finallyApplySerializerName) {
            const serializedValueItem = serializers[serializerName].forward(currentValue);
            if (serializedValueItem !== undefinedValue) {
              finallyApplySerializerName = serializerName;
              currentValue = serializedValueItem;
            }
          }
          return currentValue;
        }, value);
        const toStringTag = ObjectCls.prototype.toString.call(value);
        if (toStringTag === "[object Object]") {
          value = { ...value };
        } else if (isArray(value)) {
          value = [...value];
        }
        return finallyApplySerializerName !== undefinedValue ? [finallyApplySerializerName, serializedValue] : value;
      });
    }
    return payload;
  };
  const deserialize = (payload) => isObject(payload) ? walkObject(payload, (value) => {
    if (isArray(value) && len(value) === 2) {
      const foundSerializer = serializers[value[0]];
      value = foundSerializer ? foundSerializer.backward(value[1]) : value;
    }
    return value;
  }, falseValue) : payload;
  return {
    serialize,
    deserialize
  };
};
var symbolVDataId = Symbol("vdid");
var symbolOriginal = Symbol("original");
var regVDataId = /\[vd:([0-9a-z]+)\]/;
var vDataCollectUnified = (target) => {
  const vDataId = target === null || target === void 0 ? void 0 : target[symbolVDataId];
  vDataId && vDataIdCollectBasket && (vDataIdCollectBasket[vDataId] = undefinedValue);
};
var stringifyVData = (target, returnOriginalIfNotVData = trueValue) => {
  vDataCollectUnified(target);
  const vDataIdRaw = target === null || target === void 0 ? void 0 : target[symbolVDataId];
  const vDataId = vDataIdRaw ? `[vd:${vDataIdRaw}]` : undefinedValue;
  return vDataId || (returnOriginalIfNotVData ? target : undefinedValue);
};
function stringifyWithThis() {
  return stringifyVData(this);
}
var Null = function Null2() {
};
Null.prototype = ObjectCls.create(nullValue, {
  [STR_VALUE_OF]: valueObject(stringifyWithThis)
});
var Undefined = function Undefined2() {
};
Undefined.prototype = ObjectCls.create(nullValue, {
  [STR_VALUE_OF]: valueObject(stringifyWithThis)
});
var createVirtualResponse = (structure, vDataId = uuid()) => {
  const transform2VData = (value, vDataIdInner = uuid()) => {
    if (value === nullValue) {
      value = newInstance(Null);
    } else if (value === undefinedValue) {
      value = newInstance(Undefined);
    } else {
      const newValue = ObjectCls(value);
      defineProperty(newValue, STR_VALUE_OF, stringifyWithThis);
      defineProperty(newValue, symbolOriginal, value);
      value = newValue;
    }
    defineProperty(value, symbolVDataId, vDataIdInner);
    return value;
  };
  const virtualResponse = transform2VData(structure, vDataId);
  if (isPlainObject(virtualResponse) || isArray(virtualResponse)) {
    walkObject(virtualResponse, (value) => transform2VData(value));
  }
  return virtualResponse;
};
var dehydrateVDataUnified = (target, deepDehydrate = trueValue) => {
  const dehydrateItem = (value) => {
    vDataCollectUnified(value);
    if (value === null || value === void 0 ? void 0 : value[symbolVDataId]) {
      if (instanceOf(value, Undefined)) {
        value = undefinedValue;
      } else if (instanceOf(value, Null)) {
        value = nullValue;
      } else if (instanceOf(value, Number) || instanceOf(value, String) || instanceOf(value, Boolean)) {
        value = value[symbolOriginal];
      }
    }
    return value;
  };
  const newTarget = dehydrateItem(target);
  if (deepDehydrate && (isObject(newTarget) || isArray(newTarget))) {
    walkObject(newTarget, (value) => dehydrateItem(value));
  }
  return newTarget;
};
var dehydrateVData = (target) => dehydrateVDataUnified(target);
var vDataKey = "__$k";
var vDataValueKey = "__$v";
var getAlovaStorage = () => {
  silentAssert(!!dependentAlovaInstance, "alova instance is not found, Do you forget to set `alova` or call `bootSilentFactory`?");
  return dependentAlovaInstance.l2Cache;
};
var serializerPerformer = undefinedValue;
var silentMethodIdQueueMapStorageKey = "alova.SQ";
var silentMethodStorageKeyPrefix = "alova.SM.";
var storageSetItem = async (key, payload) => {
  const storage = getAlovaStorage();
  if (isObject(payload)) {
    payload = walkObject(isArray(payload) ? [...payload] : { ...payload }, (value, key2, parent) => {
      var _a;
      if (key2 === vDataValueKey && parent[vDataKey]) {
        return value;
      }
      if (key2 === "context" && ((_a = value === null || value === void 0 ? void 0 : value.constructor) === null || _a === void 0 ? void 0 : _a.name) === "Alova") {
        return undefinedValue;
      }
      const vDataId = value === null || value === void 0 ? void 0 : value[symbolVDataId];
      let primitiveValue = dehydrateVDataUnified(value, falseValue);
      const toStringTag = globalToString(primitiveValue);
      if (toStringTag === "[object Object]") {
        value = { ...value };
        primitiveValue = {};
      } else if (isArray(value)) {
        value = [...value];
        primitiveValue = [];
      }
      if (vDataId) {
        const valueWithVData = {
          [vDataKey]: vDataId,
          // 对于对象和数组来说，它内部的属性会全部通过`...value`放到外部，因此内部的不需要再进行遍历转换了
          // 因此将数组或对象置空，这样既避免了重复转换，又避免了污染原对象
          [vDataValueKey]: primitiveValue,
          ...value
        };
        if (instanceOf(value, String)) {
          for (let i = 0; i < len(value); i += 1) {
            valueWithVData === null || valueWithVData === void 0 ? true : delete valueWithVData[i];
          }
        }
        value = valueWithVData;
      }
      return value;
    });
  }
  serializerPerformer = serializerPerformer || createSerializerPerformer(customSerializers);
  await storage.set(key, serializerPerformer.serialize(payload));
};
var storageGetItem = async (key) => {
  const storagedResponse = await getAlovaStorage().get(key);
  serializerPerformer = serializerPerformer || createSerializerPerformer(customSerializers);
  return isObject(storagedResponse) ? walkObject(serializerPerformer.deserialize(storagedResponse), (value) => {
    if (isObject(value) && (value === null || value === void 0 ? void 0 : value[vDataKey])) {
      const vDataId = value[vDataKey];
      const vDataValue = createVirtualResponse(value[vDataValueKey], vDataId);
      forEach(objectKeys(value), (key2) => {
        if (!includes([vDataKey, vDataValueKey], key2)) {
          vDataValue[key2] = value[key2];
        }
      });
      value = vDataValue;
    }
    return value;
  }, falseValue) : storagedResponse;
};
var storageRemoveItem = async (key) => {
  await getAlovaStorage().remove(key);
};
var persistSilentMethod = (silentMethodInstance) => storageSetItem(silentMethodStorageKeyPrefix + silentMethodInstance.id, silentMethodInstance);
var push2PersistentSilentQueue = async (silentMethodInstance, queueName) => {
  await persistSilentMethod(silentMethodInstance);
  const silentMethodIdQueueMap = await storageGetItem(silentMethodIdQueueMapStorageKey) || {};
  const currentQueue = silentMethodIdQueueMap[queueName] = silentMethodIdQueueMap[queueName] || [];
  pushItem(currentQueue, silentMethodInstance.id);
  await storageSetItem(silentMethodIdQueueMapStorageKey, silentMethodIdQueueMap);
};
var spliceStorageSilentMethod = async (queueName, targetSilentMethodId, newSilentMethod) => {
  const silentMethodIdQueueMap = await storageGetItem(silentMethodIdQueueMapStorageKey) || {};
  const currentQueue = silentMethodIdQueueMap[queueName] || [];
  const index = currentQueue.findIndex((id) => id === targetSilentMethodId);
  if (index >= 0) {
    if (newSilentMethod) {
      splice(currentQueue, index, 1, newSilentMethod.id);
      await persistSilentMethod(newSilentMethod);
    } else {
      splice(currentQueue, index, 1);
    }
    await storageRemoveItem(silentMethodStorageKeyPrefix + targetSilentMethodId);
    len(currentQueue) <= 0 && delete silentMethodIdQueueMap[queueName];
    if (len(objectKeys(silentMethodIdQueueMap)) > 0) {
      await storageSetItem(silentMethodIdQueueMapStorageKey, silentMethodIdQueueMap);
    } else {
      await storageRemoveItem(silentMethodIdQueueMapStorageKey);
    }
  }
};
var silentQueueMap = {};
var merge2SilentQueueMap = (queueMap) => {
  forEach(objectKeys(queueMap), (targetQueueName) => {
    const currentQueue = silentQueueMap[targetQueueName] = silentQueueMap[targetQueueName] || [];
    pushItem(currentQueue, ...queueMap[targetQueueName]);
  });
};
var deepReplaceVData = (target, vDataResponse) => {
  const replaceVData = (value) => {
    const vData = stringifyVData(value);
    if (vData in vDataResponse) {
      return vDataResponse[vData];
    }
    if (isString(value)) {
      return value.replace(newInstance(RegExpCls, regVDataId.source, "g"), (mat) => mat in vDataResponse ? vDataResponse[mat] : mat);
    }
    return value;
  };
  if (isObject(target) && !stringifyVData(target, falseValue)) {
    walkObject(target, replaceVData);
  } else {
    target = replaceVData(target);
  }
  return target;
};
var updateQueueMethodEntities = (vDataResponse, targetQueue) => PromiseCls.all(mapItem(targetQueue, async (silentMethodItem) => {
  deepReplaceVData(silentMethodItem.entity, vDataResponse);
  silentMethodItem.cache && await persistSilentMethod(silentMethodItem);
}));
var replaceVirtualResponseWithResponse = (virtualResponse, response) => {
  let vDataResponse = {};
  const vDataId = stringifyVData(virtualResponse, falseValue);
  vDataId && (vDataResponse[vDataId] = response);
  if (isObject(virtualResponse)) {
    for (const i in virtualResponse) {
      vDataResponse = {
        ...vDataResponse,
        ...replaceVirtualResponseWithResponse(virtualResponse[i], response === null || response === void 0 ? void 0 : response[i])
      };
    }
  }
  return vDataResponse;
};
var setSilentMethodActive = (silentMethodInstance, active) => {
  if (active) {
    silentMethodInstance.active = active;
  } else {
    delete silentMethodInstance.active;
  }
};
var defaultBackoffDelay = 1e3;
var bootSilentQueue = (queue, queueName) => {
  const emitWithRequestDelay = (queueName2) => {
    const nextSilentMethod = queue[0];
    if (nextSilentMethod) {
      const targetSetting = queueRequestWaitSetting.find(({ queue: queue2 }) => instanceOf(queue2, RegExpCls) ? regexpTest(queue2, queueName2) : queue2 === queueName2);
      const callback = () => queue[0] && silentMethodRequest(queue[0]);
      const delay = (targetSetting === null || targetSetting === void 0 ? void 0 : targetSetting.wait) ? sloughConfig(targetSetting.wait, [nextSilentMethod, queueName2]) : 0;
      delay && delay > 0 ? setTimeoutFn(callback, delay) : callback();
    }
  };
  const silentMethodRequest = (silentMethodInstance, retryTimes = 0) => {
    setSilentMethodActive(silentMethodInstance, trueValue);
    const { cache, id, behavior, entity, retryError = /.*/, maxRetryTimes = 0, backoff = { delay: defaultBackoffDelay }, resolveHandler = noop, rejectHandler = noop, emitter: methodEmitter, handlerArgs = [], virtualResponse, force } = silentMethodInstance;
    globalSQEventManager.emit(BeforeEventKey, newInstance(GlobalSQEvent, behavior, entity, silentMethodInstance, queueName, retryTimes));
    promiseThen(entity.send(force), async (data) => {
      shift(queue);
      cache && await spliceStorageSilentMethod(queueName, id);
      resolveHandler(data);
      if (behavior === BEHAVIOR_SILENT) {
        const vDataResponse = replaceVirtualResponseWithResponse(virtualResponse, data);
        const { targetRefMethod, updateStates } = silentMethodInstance;
        if (instanceOf(targetRefMethod, Method) && updateStates && len(updateStates) > 0) {
          const updateStateCollection = {};
          forEach(updateStates, (stateName) => {
            updateStateCollection[stateName] = (dataRaw) => deepReplaceVData(dataRaw, vDataResponse);
          });
          const updated = updateState(targetRefMethod, updateStateCollection);
          if (!updated) {
            await setCache(targetRefMethod, (dataRaw) => deepReplaceVData(dataRaw, vDataResponse));
          }
        }
        await updateQueueMethodEntities(vDataResponse, queue);
        globalSQEventManager.emit(SuccessEventKey, newInstance(GlobalSQSuccessEvent, behavior, entity, silentMethodInstance, queueName, retryTimes, data, vDataResponse));
      }
      setSilentMethodActive(silentMethodInstance, falseValue);
      emitWithRequestDelay(queueName);
    }, (reason) => {
      if (behavior !== BEHAVIOR_SILENT) {
        shift(queue);
        rejectHandler(reason);
      } else {
        const runGlobalErrorEvent = (retryDelay) => globalSQEventManager.emit(ErrorEventKey, newInstance(GlobalSQErrorEvent, behavior, entity, silentMethodInstance, queueName, retryTimes, reason, retryDelay));
        const { name: errorName = "", message: errorMsg = "" } = reason || {};
        let regRetryErrorName;
        let regRetryErrorMsg;
        if (instanceOf(retryError, RegExp)) {
          regRetryErrorMsg = retryError;
        } else if (isObject(retryError)) {
          regRetryErrorName = retryError.name;
          regRetryErrorMsg = retryError.message;
        }
        const matchRetryError = regRetryErrorName && regexpTest(regRetryErrorName, errorName) || regRetryErrorMsg && regexpTest(regRetryErrorMsg, errorMsg);
        if (retryTimes < maxRetryTimes && matchRetryError) {
          const retryDelay = delayWithBackoff(backoff, retryTimes + 1);
          runGlobalErrorEvent(retryDelay);
          setTimeoutFn(
            () => {
              retryTimes += 1;
              silentMethodRequest(silentMethodInstance, retryTimes);
              methodEmitter.emit("retry", newInstance(ScopedSQRetryEvent, behavior, entity, silentMethodInstance, handlerArgs, retryTimes, retryDelay));
            },
            // 还有重试次数时使用timeout作为下次请求时间
            retryDelay
          );
        } else {
          setSilentFactoryStatus(2);
          runGlobalErrorEvent();
          methodEmitter.emit("fallback", newInstance(ScopedSQErrorEvent, behavior, entity, silentMethodInstance, handlerArgs, reason));
          globalSQEventManager.emit(FailEventKey$1, newInstance(GlobalSQFailEvent, behavior, entity, silentMethodInstance, queueName, retryTimes, reason));
        }
      }
      setSilentMethodActive(silentMethodInstance, falseValue);
    });
  };
  emitWithRequestDelay(queueName);
};
var pushNewSilentMethod2Queue = async (silentMethodInstance, cache, targetQueueName = DEFAULT_QUEUE_NAME, onBeforePush = () => []) => {
  silentMethodInstance.cache = cache;
  const currentQueue = silentQueueMap[targetQueueName] = silentQueueMap[targetQueueName] || [];
  const isNewQueue = len(currentQueue) <= 0;
  const beforePushReturns = await Promise.all(onBeforePush());
  const isPush2Queue = !beforePushReturns.some((returns) => returns === falseValue);
  if (isPush2Queue) {
    cache && await push2PersistentSilentQueue(silentMethodInstance, targetQueueName);
    pushItem(currentQueue, silentMethodInstance);
    isNewQueue && silentFactoryStatus === 1 && bootSilentQueue(currentQueue, targetQueueName);
  }
  return isPush2Queue;
};
var getBelongQueuePosition = (silentMethodInstance) => {
  let queue = undefinedValue;
  let queueName = "";
  let position = 0;
  for (const queueNameLoop in silentQueueMap) {
    position = silentQueueMap[queueNameLoop].indexOf(silentMethodInstance);
    if (position >= 0) {
      queue = silentQueueMap[queueNameLoop];
      queueName = queueNameLoop;
      break;
    }
  }
  return [queue, queueName, position];
};
var SilentMethod = class {
  constructor(entity, behavior, emitter, id = uuid(), force, retryError, maxRetryTimes, backoff, resolveHandler, rejectHandler, handlerArgs, vDatas) {
    const thisObj = this;
    thisObj.entity = entity;
    thisObj.behavior = behavior;
    thisObj.id = id;
    thisObj.emitter = emitter;
    thisObj.force = !!force;
    thisObj.retryError = retryError;
    thisObj.maxRetryTimes = maxRetryTimes;
    thisObj.backoff = backoff;
    thisObj.resolveHandler = resolveHandler;
    thisObj.rejectHandler = rejectHandler;
    thisObj.handlerArgs = handlerArgs;
    thisObj.vDatas = vDatas;
  }
  /**
   * 允许缓存时持久化更新当前实例
   */
  async save() {
    this.cache && await persistSilentMethod(this);
  }
  /**
   * 在队列中使用一个新的silentMethod实例替换当前实例
   * 如果有持久化缓存也将会更新缓存
   * @param newSilentMethod 新的silentMethod实例
   */
  async replace(newSilentMethod) {
    const targetSilentMethod = this;
    silentAssert(newSilentMethod.cache === targetSilentMethod.cache, "the cache of new silentMethod must equal with this silentMethod");
    const [queue, queueName, position] = getBelongQueuePosition(targetSilentMethod);
    if (queue) {
      splice(queue, position, 1, newSilentMethod);
      targetSilentMethod.cache && await spliceStorageSilentMethod(queueName, targetSilentMethod.id, newSilentMethod);
    }
  }
  /**
   * 移除当前实例，如果有持久化数据，也会同步移除
   */
  async remove() {
    const targetSilentMethod = this;
    const [queue, queueName, position] = getBelongQueuePosition(targetSilentMethod);
    if (queue) {
      splice(queue, position, 1);
      targetSilentMethod.cache && await spliceStorageSilentMethod(queueName, targetSilentMethod.id);
    }
  }
  /**
   * 设置延迟更新状态对应的method实例以及对应的状态名
   * 它将在此silentMethod响应后，找到对应的状态数据并将vData更新为实际数据
   *
   * @param method method实例
   * @param updateStateName 更新的状态名，默认为data，也可以设置多个
   */
  setUpdateState(method, updateStateName = "data") {
    if (method) {
      this.targetRefMethod = method;
      this.updateStates = isArray(updateStateName) ? updateStateName : [updateStateName];
    }
  }
};
var convertPayload2SilentMethod = (payload) => {
  const { id, behavior, entity, retryError, maxRetryTimes, backoff, resolveHandler, rejectHandler, handlerArgs, targetRefMethod, force } = payload;
  const deserializeMethod = (methodPayload) => {
    const { type, url, config, data } = methodPayload;
    return newInstance(Method, type, dependentAlovaInstance, url, config, data);
  };
  const silentMethodInstance = newInstance(SilentMethod, deserializeMethod(entity), behavior, createEventManager(), id, force, retryError, maxRetryTimes, backoff, resolveHandler, rejectHandler, handlerArgs);
  silentMethodInstance.cache = trueValue;
  if (targetRefMethod) {
    silentMethodInstance.targetRefMethod = deserializeMethod(targetRefMethod);
  }
  forEach(objectKeys(payload), (key) => {
    if (!includes([
      "id",
      "behavior",
      "emitter",
      "entity",
      "retryError",
      "maxRetryTimes",
      "backoff",
      "resolveHandler",
      "rejectHandler",
      "handlerArgs",
      "targetRefMethod",
      "force"
    ], key)) {
      silentMethodInstance[key] = payload[key];
    }
  });
  return silentMethodInstance;
};
var loadSilentQueueMapFromStorage = async () => {
  const silentMethodIdQueueMap = await storageGetItem(silentMethodIdQueueMapStorageKey) || {};
  const silentQueueMap2 = {};
  const readingPromises = [];
  forEach(objectKeys(silentMethodIdQueueMap), (queueName) => {
    const currentQueue = silentQueueMap2[queueName] = silentQueueMap2[queueName] || [];
    pushItem(readingPromises, ...mapItem(silentMethodIdQueueMap[queueName], async (silentMethodId) => {
      const serializedSilentMethodPayload = await storageGetItem(silentMethodStorageKeyPrefix + silentMethodId);
      serializedSilentMethodPayload && pushItem(currentQueue, convertPayload2SilentMethod(serializedSilentMethodPayload));
    }));
  });
  await PromiseCls.all(readingPromises);
  return silentQueueMap2;
};
var onSilentSubmitBoot = (handler) => globalSQEventManager.on(BootEventKey, handler);
var onSilentSubmitSuccess = (handler) => globalSQEventManager.on(SuccessEventKey, handler);
var onSilentSubmitError = (handler) => globalSQEventManager.on(ErrorEventKey, handler);
var onSilentSubmitFail = (handler) => globalSQEventManager.on(FailEventKey$1, handler);
var onBeforeSilentSubmit = (handler) => globalSQEventManager.on(BeforeEventKey, handler);
var bootSilentFactory = (options) => {
  if (silentFactoryStatus === 0) {
    const { alova, delay = 500 } = options;
    setDependentAlova(alova);
    setCustomSerializers(options.serializers);
    setQueueRequestWaitSetting(options.requestWait);
    setTimeoutFn(async () => {
      merge2SilentQueueMap(await loadSilentQueueMapFromStorage());
      forEach(objectKeys(silentQueueMap), (queueName) => {
        bootSilentQueue(silentQueueMap[queueName], queueName);
      });
      setSilentFactoryStatus(1);
      globalSQEventManager.emit(BootEventKey, undefinedValue);
    }, delay);
  }
};
var equals = (prevValue, nextValue) => {
  if (prevValue === nextValue) {
    return trueValue;
  }
  return stringifyVData(prevValue) === stringifyVData(nextValue);
};
var filterSilentMethods = async (methodNameMatcher, queueName = DEFAULT_QUEUE_NAME, filterActive = falseValue) => {
  const matchSilentMethods = (targetQueue = []) => targetQueue.filter((silentMethodItem) => {
    if (methodNameMatcher === undefinedValue) {
      return trueValue;
    }
    const name = getConfig(silentMethodItem.entity).name || "";
    const retain = instanceOf(methodNameMatcher, RegExp) ? regexpTest(methodNameMatcher, name) : name === methodNameMatcher;
    return retain && (filterActive ? silentMethodItem.active : trueValue);
  });
  return [
    ...matchSilentMethods(silentQueueMap[queueName]),
    // 如果当前未启动silentFactory，则还需要去持久化存储中匹配silentMethods
    ...silentFactoryStatus === 0 ? matchSilentMethods((await loadSilentQueueMapFromStorage())[queueName]) : []
  ];
};
var getSilentMethod = async (methodNameMatcher, queueName = DEFAULT_QUEUE_NAME, filterActive = falseValue) => (await filterSilentMethods(methodNameMatcher, queueName, filterActive))[0];
var isVData = (target) => !!stringifyVData(target, falseValue) || regexpTest(regVDataId, target);
var currentSilentMethod = undefinedValue;
var createSilentQueueMiddlewares = (handler, config) => {
  const { behavior = "queue", queue = DEFAULT_QUEUE_NAME, retryError, maxRetryTimes, backoff } = config || {};
  const eventEmitter = createEventManager();
  let handlerArgs;
  let behaviorFinally;
  let queueFinally = DEFAULT_QUEUE_NAME;
  let forceRequest = falseValue;
  let silentMethodInstance;
  const createMethod = (...args) => {
    silentAssert(isFn(handler), "method handler must be a function. eg. useSQRequest(() => method)");
    setVDataIdCollectBasket({});
    handlerArgs = args;
    return handler(...args);
  };
  const decorateRequestEvent = (requestExposure) => {
    requestExposure.onSuccess = decorateEvent(requestExposure.onSuccess, (handler2, event) => {
      currentSilentMethod = silentMethodInstance;
      handler2(newInstance(ScopedSQSuccessEvent, behaviorFinally, event.method, silentMethodInstance, event.args, event.data));
    });
    requestExposure.onError = decorateEvent(requestExposure.onError, (handler2, event) => {
      handler2(newInstance(ScopedSQErrorEvent, behaviorFinally, event.method, silentMethodInstance, event.args, event.error));
    });
    requestExposure.onComplete = decorateEvent(requestExposure.onComplete, (handler2, event) => {
      handler2(newInstance(ScopedSQCompleteEvent, behaviorFinally, event.method, silentMethodInstance, event.args, event.status, event.data, event.error));
    });
  };
  const middleware = ({ method, args, cachedResponse, proxyStates, config: config2 }, next) => {
    const { silentDefaultResponse, vDataCaptured, force = falseValue } = config2;
    const baseEvent = AlovaEventBase.spawn(method, args);
    behaviorFinally = sloughConfig(behavior, [baseEvent]);
    queueFinally = sloughConfig(queue, [baseEvent]);
    forceRequest = sloughConfig(force, [baseEvent]);
    const resetCollectBasket = () => {
      setVDataIdCollectBasket(handlerArgs = undefinedValue);
    };
    if (isFn(vDataCaptured)) {
      let hasVData = vDataIdCollectBasket && len(objectKeys(vDataIdCollectBasket)) > 0;
      if (!hasVData) {
        const { url, data } = method;
        const { params, headers } = getConfig(method);
        walkObject({ url, params, data, headers }, (value) => {
          if (!hasVData && (stringifyVData(value, falseValue) || regexpTest(regVDataId, value))) {
            hasVData = trueValue;
          }
          return value;
        });
      }
      const customResponse = hasVData ? vDataCaptured(method) : undefinedValue;
      if (customResponse !== undefinedValue) {
        resetCollectBasket();
        return promiseResolve(customResponse);
      }
    }
    if (behaviorFinally !== BEHAVIOR_STATIC) {
      const createSilentMethodPromise = () => {
        const queueResolvePromise = newInstance(PromiseCls, (resolveHandler, rejectHandler) => {
          silentMethodInstance = newInstance(SilentMethod, method, behaviorFinally, eventEmitter, undefinedValue, !!forceRequest, retryError, maxRetryTimes, backoff, resolveHandler, rejectHandler, handlerArgs, vDataIdCollectBasket && objectKeys(vDataIdCollectBasket));
          resetCollectBasket();
        });
        promiseThen(promiseResolve(undefinedValue), async () => {
          const createPushEvent = () => newInstance(ScopedSQEvent, behaviorFinally, method, silentMethodInstance, args);
          const isPushed = await pushNewSilentMethod2Queue(
            silentMethodInstance,
            // onFallback绑定了事件后，即使是silent行为模式也不再存储
            // onFallback会同步调用，因此需要异步判断是否存在fallbackHandlers
            len(eventEmitter.eventMap.fallback || []) <= 0 && behaviorFinally === BEHAVIOR_SILENT,
            queueFinally,
            // 执行放入队列前回调，如果返回false则阻止放入队列
            () => eventEmitter.emit("beforePushQueue", createPushEvent())
          );
          isPushed && eventEmitter.emit("pushedQueue", createPushEvent());
        });
        return queueResolvePromise;
      };
      if (behaviorFinally === BEHAVIOR_QUEUE) {
        const needSendRequest = forceRequest || !cachedResponse;
        if (needSendRequest) {
          proxyStates.loading.v = trueValue;
        }
        return needSendRequest ? createSilentMethodPromise() : promiseThen(promiseResolve(cachedResponse));
      }
      const silentMethodPromise = createSilentMethodPromise();
      const virtualResponse = silentMethodInstance.virtualResponse = createVirtualResponse(isFn(silentDefaultResponse) ? silentDefaultResponse() : undefinedValue);
      promiseThen(silentMethodPromise, (realResponse) => {
        proxyStates.data.v = realResponse;
      });
      return promiseResolve(virtualResponse);
    }
    resetCollectBasket();
    return next();
  };
  return {
    c: createMethod,
    m: middleware,
    d: decorateRequestEvent,
    // 事件绑定函数
    b: {
      /**
       * 绑定回退事件
       * @param handler 回退事件回调
       */
      onFallback: (handler2) => {
        eventEmitter.on("fallback", handler2);
      },
      /**
       * 绑定入队列前事件
       * @param handler 入队列前的事件回调
       */
      onBeforePushQueue: (handler2) => {
        eventEmitter.on("beforePushQueue", handler2);
      },
      /**
       * 绑定入队列后事件
       * @param handler 入队列后的事件回调
       */
      onPushedQueue: (handler2) => {
        eventEmitter.on("pushedQueue", handler2);
      },
      /**
       * 重试事件
       * @param handler 重试事件回调
       */
      onRetry: (handler2) => {
        eventEmitter.on("retry", handler2);
      }
    }
  };
};
var updateStateEffect = async (matcher, handleUpdate) => {
  if (currentSilentMethod) {
    currentSilentMethod.setUpdateState(matcher, isFn(updateState) ? undefinedValue : objectKeys(updateState));
    await currentSilentMethod.save();
  }
  return updateState(matcher, handleUpdate);
};
var actionsMap = {};
var isFrontMiddlewareContext = (context) => !!context.send;
var assert$2 = createAssert("subscriber");
var actionDelegationMiddleware = (id) => {
  const { ref } = statesHookHelper(promiseStatesHook());
  const delegated = ref(falseValue);
  return (context, next) => {
    if (!delegated.current) {
      const { abort, proxyStates, delegatingActions = {} } = context;
      const update = (newStates) => {
        for (const key in newStates) {
          proxyStates[key] && (proxyStates[key].v = newStates[key]);
        }
      };
      const handlersItems = actionsMap[id] = actionsMap[id] || [];
      handlersItems.push(isFrontMiddlewareContext(context) ? {
        ...delegatingActions,
        send: context.send,
        abort,
        update
      } : {
        ...delegatingActions,
        fetch: context.fetch,
        abort,
        update
      });
      delegated.current = trueValue;
    }
    return next();
  };
};
var accessAction = (id, onMatch, silent = false) => {
  const matched = [];
  if (typeof id === "symbol" || isString(id) || isNumber(id)) {
    actionsMap[id] && pushItem(matched, ...actionsMap[id]);
  } else if (instanceOf(id, RegExp)) {
    forEach(filterItem(objectKeys(actionsMap), (idItem) => id.test(idItem)), (idItem) => {
      pushItem(matched, ...actionsMap[idItem]);
    });
  }
  if (matched.length === 0 && !silent) {
    assert$2(false, `no handler can be matched by using \`${id.toString()}\``);
  }
  forEach(matched, onMatch);
};
var createSnapshotMethodsManager = (handler) => {
  let methodSnapshots = {};
  return {
    snapshots: () => methodSnapshots,
    save(methodInstance, force = falseValue) {
      const key = getMethodInternalKey(methodInstance);
      if (!methodSnapshots[key] || force) {
        methodSnapshots[key] = {
          entity: methodInstance
        };
      }
    },
    get: (entityOrPage) => methodSnapshots[getMethodInternalKey(instanceOf(entityOrPage, Method) ? entityOrPage : handler(entityOrPage))],
    remove(key) {
      if (key) {
        delete methodSnapshots[key];
      } else {
        methodSnapshots = {};
      }
    }
  };
};
var paginationAssert = createAssert("usePagination");
var indexAssert = (index, rawData) => paginationAssert(isNumber(index) && index < len(rawData), "index must be a number that less than list length");
var usePagination = (handler, config = {}) => {
  const { create, computed, ref, watch, exposeProvider, objectify, __referingObj: referingObject } = statesHookHelper(promiseStatesHook());
  const { preloadPreviousPage = trueValue, preloadNextPage = trueValue, total: totalGetter = (res) => res.total, data: dataGetter = (res) => res.data, append = falseValue, initialPage = 1, initialPageSize = 10, watchingStates = [], initialData, immediate = trueValue, middleware = noop, force = noop, ...others } = config;
  const handlerRef = ref(handler);
  const isReset = ref(falseValue);
  const page = create(initialPage, "page");
  const pageSize = create(initialPageSize, "pageSize");
  const data = create(initialData ? dataGetter(initialData) || [] : [], "data");
  const total = create(initialData ? totalGetter(initialData) : undefinedValue, "total");
  const { snapshots: methodSnapshots, get: getSnapshotMethods, save: saveSnapshot, remove: removeSnapshot } = ref(createSnapshotMethodsManager((page2) => handlerRef.current(page2, pageSize.v))).current;
  const listDataGetter = (rawData) => dataGetter(rawData) || rawData;
  const fetchStates = useFetcher({
    __referingObj: referingObject,
    updateState: falseValue,
    force: ({ args }) => args[0]
  });
  const { loading, fetch, abort: abortFetch, onSuccess: onFetchSuccess } = fetchStates;
  const fetchingRef = ref(loading);
  const getHandlerMethod3 = (refreshPage = page.v) => {
    const pageSizeVal = pageSize.v;
    const handlerMethod = handler(refreshPage, pageSizeVal);
    saveSnapshot(handlerMethod);
    return handlerMethod;
  };
  watch(watchingStates, () => {
    page.v = initialPage;
    isReset.current = trueValue;
  });
  const delegationActions = ref({});
  const pageCount = computed(() => {
    const totalVal = total.v;
    return totalVal !== undefinedValue ? Math.ceil(totalVal / pageSize.v) : undefinedValue;
  }, [pageSize, total], "pageCount");
  const createDelegationAction = (actionName) => (...args) => delegationActions.current[actionName](...args);
  const states = useWatcher(getHandlerMethod3, [...watchingStates, page.e, pageSize.e], {
    __referingObj: referingObject,
    immediate,
    initialData,
    managedStates: objectify([data, page, pageSize, total], "s"),
    middleware(ctx, next) {
      middleware({
        ...ctx,
        delegatingActions: {
          refresh: createDelegationAction("refresh"),
          insert: createDelegationAction("insert"),
          remove: createDelegationAction("remove"),
          replace: createDelegationAction("replace"),
          reload: createDelegationAction("reload"),
          getState: (stateKey) => {
            const states2 = {
              page,
              pageSize,
              data,
              pageCount,
              total,
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              isLastPage
            };
            return states2[stateKey].v;
          }
        }
      }, promiseResolve);
      return next();
    },
    force: (event) => event.args[1] || (isFn(force) ? force(event) : force),
    ...others
  });
  const { send } = states;
  const nestedData = states.__proxyState("data");
  const canPreload = async (payload) => {
    const { rawData = nestedData.v, preloadPage, fetchMethod, forceRequest = falseValue, isNextPage = falseValue } = payload;
    const { e: expireMilliseconds } = getLocalCacheConfigParam(fetchMethod);
    if (expireMilliseconds(MEMORY) <= getTime()) {
      return falseValue;
    }
    if (forceRequest) {
      return trueValue;
    }
    if (await queryCache(fetchMethod)) {
      return falseValue;
    }
    const pageCountVal = pageCount.v;
    const exceedPageCount = pageCountVal ? preloadPage > pageCountVal : isNextPage ? len(listDataGetter(rawData)) < pageSize.v : falseValue;
    return preloadPage > 0 && !exceedPageCount;
  };
  const fetchNextPage = async (rawData, force2 = falseValue) => {
    const nextPage = page.v + 1;
    const fetchMethod = getHandlerMethod3(nextPage);
    if (preloadNextPage && await canPreload({
      rawData,
      preloadPage: nextPage,
      fetchMethod,
      isNextPage: trueValue,
      forceRequest: force2
    })) {
      promiseCatch(fetch(fetchMethod, force2), noop);
    }
  };
  const fetchPreviousPage = async (rawData) => {
    const prevPage = page.v - 1;
    const fetchMethod = getHandlerMethod3(prevPage);
    if (preloadPreviousPage && await canPreload({
      rawData,
      preloadPage: prevPage,
      fetchMethod
    })) {
      promiseCatch(fetch(fetchMethod), noop);
    }
  };
  const isLastPage = computed(() => {
    const dataRaw = nestedData.v;
    if (!dataRaw) {
      return trueValue;
    }
    const statesDataVal = listDataGetter(dataRaw);
    const pageVal = page.v;
    const pageCountVal = pageCount.v;
    const dataLen = isArray(statesDataVal) ? len(statesDataVal) : 0;
    return pageCountVal ? pageVal >= pageCountVal : dataLen < pageSize.v;
  }, [page, pageCount, nestedData, pageSize], "isLastPage");
  const updateCurrentPageCache = async () => {
    const snapshotItem = getSnapshotMethods(page.v);
    if (snapshotItem) {
      await setCache(snapshotItem.entity, (rawData) => {
        if (rawData) {
          const cachedListData = listDataGetter(rawData) || [];
          splice(cachedListData, 0, len(cachedListData), ...data.v);
          return rawData;
        }
      });
    }
  };
  onFetchSuccess(({ method, data: rawData }) => {
    const snapshotItem = getSnapshotMethods(page.v);
    if (snapshotItem && getMethodInternalKey(snapshotItem.entity) === getMethodInternalKey(method)) {
      const listData = listDataGetter(rawData);
      if (append) {
        const dataRaw = data.v;
        const pageSizeVal = pageSize.v;
        const replaceNumber = len(dataRaw) % pageSizeVal;
        if (replaceNumber > 0) {
          const rawData2 = [...data.v];
          splice(rawData2, (page.v - 1) * pageSizeVal, replaceNumber, ...listData);
          data.v = rawData2;
        }
      } else {
        data.v = listData;
      }
    }
  });
  states.onSuccess(({ data: rawData, args: [refreshPage, isRefresh], method }) => {
    const { total: cachedTotal } = getSnapshotMethods(method) || {};
    const typedRawData = rawData;
    total.v = cachedTotal !== undefinedValue ? cachedTotal : totalGetter(typedRawData);
    if (!isRefresh) {
      fetchPreviousPage(typedRawData);
      fetchNextPage(typedRawData);
    }
    const pageSizeVal = pageSize.v;
    const listData = listDataGetter(typedRawData);
    paginationAssert(isArray(listData), "Got wrong array, did you return the correct array of list in `data` function");
    if (append) {
      if (isReset.current) {
        data.v = [];
      }
      if (refreshPage === undefinedValue) {
        data.v = [...data.v, ...listData];
      } else if (refreshPage) {
        const rawData2 = [...data.v];
        splice(rawData2, (refreshPage - 1) * pageSizeVal, pageSizeVal, ...listData);
        data.v = rawData2;
      }
    } else {
      data.v = listData;
    }
  });
  states.onComplete(() => {
    isReset.current = falseValue;
  });
  const getItemIndex = (item) => {
    const index = data.v.indexOf(item);
    paginationAssert(index >= 0, "item is not found in list");
    return index;
  };
  const { addQueue: add2AsyncQueue, onComplete: onAsyncQueueRunComplete } = ref(createAsyncQueue()).current;
  const refresh = (pageOrItemPage = page.v) => {
    let refreshPage = pageOrItemPage;
    if (append) {
      if (!isNumber(pageOrItemPage)) {
        const itemIndex = getItemIndex(pageOrItemPage);
        refreshPage = Math.floor(itemIndex / pageSize.v) + 1;
      }
      paginationAssert(refreshPage <= page.v, "refresh page can't greater than page");
      promiseCatch(send(refreshPage, trueValue), noop);
    } else {
      paginationAssert(isNumber(refreshPage), "unable to calculate refresh page by item in pagination mode");
      promiseCatch(refreshPage === page.v ? send(undefinedValue, trueValue) : fetch(handler(refreshPage, pageSize.v), trueValue), noop);
    }
  };
  const invalidatePaginationCache = async (all = falseValue) => {
    const pageVal = page.v;
    const snapshotObj = methodSnapshots();
    let snapshots = objectValues(snapshotObj);
    if (all) {
      removeSnapshot();
    } else {
      const excludeSnapshotKeys = mapItem(filterItem([getSnapshotMethods(pageVal - 1), getSnapshotMethods(pageVal), getSnapshotMethods(pageVal + 1)], Boolean), ({ entity }) => getMethodInternalKey(entity));
      snapshots = mapItem(filterItem(objectKeys(snapshotObj), (key) => !includes(excludeSnapshotKeys, key)), (key) => {
        const item = snapshotObj[key];
        delete snapshotObj[key];
        return item;
      });
    }
    await invalidateCache(mapItem(snapshots, ({ entity }) => entity));
  };
  const resetCache = async () => {
    fetchingRef.current && abortFetch();
    await invalidatePaginationCache();
    const snapshotItem = getSnapshotMethods(page.v + 1);
    if (snapshotItem) {
      const cachedListData = listDataGetter(await queryCache(snapshotItem.entity) || {}) || [];
      fetchNextPage(undefinedValue, len(cachedListData) < pageSize.v);
    }
  };
  const updateTotal = (offset) => {
    if (offset === 0) {
      return;
    }
    const totalVal = total.v;
    if (isNumber(totalVal)) {
      const offsetedTotal = Math.max(totalVal + offset, 0);
      total.v = offsetedTotal;
      const pageVal = page.v;
      forEach([getSnapshotMethods(pageVal - 1), getSnapshotMethods(pageVal), getSnapshotMethods(pageVal + 1)], (item) => {
        item && (item.total = offsetedTotal);
      });
    }
  };
  const insert = (item, position = 0) => {
    onAsyncQueueRunComplete(resetCache);
    return add2AsyncQueue(async () => {
      const index = isNumber(position) ? position : getItemIndex(position) + 1;
      let popItem = undefinedValue;
      const rawData = [...data.v];
      if (len(rawData) % pageSize.v === 0) {
        popItem = rawData.pop();
      }
      splice(rawData, index, 0, item);
      data.v = rawData;
      updateTotal(1);
      await updateCurrentPageCache();
      if (popItem) {
        const snapshotItem = getSnapshotMethods(page.v + 1);
        if (snapshotItem) {
          await setCache(snapshotItem.entity, (rawData2) => {
            if (rawData2) {
              const cachedListData = listDataGetter(rawData2) || [];
              cachedListData.unshift(popItem);
              cachedListData.pop();
              return rawData2;
            }
          });
        }
      }
    });
  };
  const remove = (...positions) => {
    onAsyncQueueRunComplete(resetCache);
    return add2AsyncQueue(async () => {
      const indexes = mapItem(positions, (position) => {
        const index = isNumber(position) ? position : getItemIndex(position);
        indexAssert(index, data.v);
        return index;
      });
      const pageVal = page.v;
      const nextPage = pageVal + 1;
      const snapshotItem = getSnapshotMethods(nextPage);
      const fillingItems = [];
      if (snapshotItem) {
        await setCache(snapshotItem.entity, (rawData) => {
          if (rawData) {
            const cachedListData = listDataGetter(rawData);
            if (isArray(cachedListData)) {
              pushItem(fillingItems, ...splice(cachedListData, 0, len(indexes)));
            }
            return rawData;
          }
        });
      }
      const isLastPageVal = isLastPage.v;
      const fillingItemsLen = len(fillingItems);
      if (fillingItemsLen > 0 || isLastPageVal) {
        const newListData = filterItem(data.v, (_, index) => !includes(indexes, index));
        if (!append && isLastPageVal && len(newListData) <= 0) {
          page.v = pageVal - 1;
        } else if (fillingItemsLen > 0) {
          pushItem(newListData, ...fillingItems);
        }
        data.v = newListData;
      } else if (fillingItemsLen <= 0 && !isLastPageVal) {
        refresh(pageVal);
      }
      updateTotal(-len(indexes));
      return updateCurrentPageCache();
    });
  };
  const replace = (item, position) => add2AsyncQueue(async () => {
    paginationAssert(position !== undefinedValue, "expect specify the replace position");
    const index = isNumber(position) ? position : getItemIndex(position);
    indexAssert(index, data.v);
    const rawData = [...data.v];
    splice(rawData, index, 1, item);
    data.v = rawData;
    await updateCurrentPageCache();
  });
  const reload = () => {
    promiseThen(invalidatePaginationCache(trueValue), () => {
      isReset.current = trueValue;
      page.v === initialPage ? promiseCatch(send(), noop) : page.v = initialPage;
    });
  };
  delegationActions.current = {
    refresh,
    insert,
    remove,
    replace,
    reload
  };
  return exposeProvider({
    ...states,
    ...objectify([data, page, pageCount, pageSize, total, isLastPage]),
    fetching: fetchStates.loading,
    onFetchSuccess: fetchStates.onSuccess,
    onFetchError: fetchStates.onError,
    onFetchComplete: fetchStates.onComplete,
    refresh,
    insert,
    remove,
    replace,
    reload
  });
};
function useSQRequest(handler, config = {}) {
  const { exposeProvider, __referingObj: referingObj } = statesHookHelper(promiseStatesHook());
  const { middleware = noop } = config;
  const { c: methodCreateHandler, m: silentMiddleware, b: binders, d: decorateEvent2 } = createSilentQueueMiddlewares(handler, config);
  const states = useRequest(methodCreateHandler, {
    ...config,
    __referingObj: referingObj,
    middleware: (ctx, next) => {
      const silentMidPromise = silentMiddleware(ctx, next);
      middleware(ctx, () => silentMidPromise);
      return silentMidPromise;
    }
  });
  decorateEvent2(states);
  return exposeProvider({
    ...states,
    ...binders
  });
}
var useAutoRequest = (handler, config = {}) => {
  let notifiable = trueValue;
  const { enableFocus = trueValue, enableVisibility = trueValue, enableNetwork = trueValue, pollingTime = 0, throttle = 1e3 } = config;
  const { onMounted, onUnmounted, __referingObj: referingObject } = statesHookHelper(promiseStatesHook());
  const states = useRequest(handler, {
    ...config,
    __referingObj: referingObject
  });
  const notify = () => {
    if (notifiable) {
      states.send();
      if (throttle > 0) {
        notifiable = falseValue;
        setTimeout(() => {
          notifiable = trueValue;
        }, throttle);
      }
    }
  };
  let offNetwork = noop;
  let offFocus = noop;
  let offVisiblity = noop;
  let offPolling = noop;
  onMounted(() => {
    if (!globalConfigMap.ssr) {
      offNetwork = enableNetwork ? useAutoRequest.onNetwork(notify, config) : offNetwork;
      offFocus = enableFocus ? useAutoRequest.onFocus(notify, config) : offFocus;
      offVisiblity = enableVisibility ? useAutoRequest.onVisibility(notify, config) : offVisiblity;
      offPolling = pollingTime > 0 ? useAutoRequest.onPolling(notify, config) : offPolling;
    }
  });
  onUnmounted(() => {
    offNetwork();
    offFocus();
    offVisiblity();
    offPolling();
  });
  return states;
};
var on = (type, handler) => {
  window.addEventListener(type, handler);
  return () => window.removeEventListener(type, handler);
};
useAutoRequest.onNetwork = (notify) => on("online", notify);
useAutoRequest.onFocus = (notify) => on("focus", notify);
useAutoRequest.onVisibility = (notify) => {
  const handle = () => document.visibilityState === "visible" && notify();
  return on("visibilitychange", handle);
};
useAutoRequest.onPolling = (notify, config) => {
  const timer = setInterval(notify, config.pollingTime);
  return () => clearInterval(timer);
};
var hookPrefix$1 = "useCaptcha";
var captchaAssert = createAssert(hookPrefix$1);
var useCaptcha = (handler, config = {}) => {
  const { initialCountdown, middleware } = config;
  captchaAssert(initialCountdown === undefinedValue || initialCountdown > 0, "initialCountdown must be greater than 0");
  const { create, ref, objectify, exposeProvider, __referingObj: referingObject } = statesHookHelper(promiseStatesHook());
  const countdown = create(0, "countdown");
  const requestReturned = useRequest(handler, {
    ...config,
    __referingObj: referingObject,
    immediate: falseValue,
    managedStates: objectify([countdown], "s"),
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    middleware: middleware ? (ctx, next) => middleware({ ...ctx, send }, next) : undefinedValue
  });
  const timer = ref(undefinedValue);
  const send = (...args) => newInstance(PromiseCls, (resolve, reject) => {
    if (countdown.v <= 0) {
      requestReturned.send(...args).then((result) => {
        countdown.v = config.initialCountdown || 60;
        timer.current = setInterval(() => {
          countdown.v -= 1;
          if (countdown.v <= 0) {
            clearInterval(timer.current);
          }
        }, 1e3);
        resolve(result);
      }).catch((reason) => reject(reason));
    } else {
      reject(newInstance(AlovaError, hookPrefix$1, "the countdown is not over yet"));
    }
  });
  return exposeProvider({
    ...requestReturned,
    send,
    ...objectify([countdown])
  });
};
var RestoreEventKey = Symbol("FormRestore");
var getStoragedKey = (methodInstance, id) => `alova/form-${id || getMethodInternalKey(methodInstance)}`;
var sharedStates = {};
var cloneFormData = (form) => {
  const shallowClone = (value) => isArray(value) ? [...value] : isPlainObject(value) ? { ...value } : value;
  return walkObject(shallowClone(form), shallowClone);
};
var useForm = (handler, config = {}) => {
  const typedSharedStates = sharedStates;
  const { id, initialForm, store, resetAfterSubmiting, immediate = falseValue, middleware } = config;
  promiseStatesHook();
  const { create: $, ref: useFlag$, onMounted: onMounted$, watch: watch$, objectify, exposeProvider, __referingObj: referingObject } = statesHookHelper(promiseStatesHook());
  const isStoreObject = isPlainObject(store);
  const enableStore = isStoreObject ? store.enable : store;
  const sharedState = id ? typedSharedStates[id] : undefinedValue;
  const form = $(cloneFormData(initialForm), "form");
  const methodHandler = handler;
  const eventManager = createEventManager();
  const initialMethodInstance = useFlag$(sloughConfig(methodHandler, [form.v]));
  const storageContext = getContext(initialMethodInstance.current).l2Cache;
  const storagedKey = getStoragedKey(initialMethodInstance.current, id);
  const reseting = useFlag$(falseValue);
  const serializerPerformer2 = useFlag$(createSerializerPerformer(isStoreObject ? store.serializers : undefinedValue));
  const isCreateShardState = useFlag$(false);
  const originalHookProvider = useRequest((...args) => methodHandler(form.v, ...args), {
    ...config,
    __referingObj: referingObject,
    // 中间件函数，也支持subscriberMiddleware
    middleware: middleware ? (ctx, next) => middleware({
      ...ctx,
      // eslint-disable-next-line
      delegatingActions: { updateForm, reset }
    }, next) : undefinedValue,
    // 1. 当需要持久化时，将在数据恢复后触发
    // 2. 当已有共享状态时，表示之前已有初始化（无论有无立即发起请求），后面的不再自动发起请求，这是为了兼容多表单立即发起请求时，重复发出请求的问题
    immediate: enableStore || sharedState ? falseValue : immediate
  });
  const reset = () => {
    reseting.current = trueValue;
    const clonedFormData = cloneFormData(initialForm);
    clonedFormData && (form.v = clonedFormData);
    enableStore && storageContext.remove(storagedKey);
  };
  const updateForm = (newForm) => {
    form.v = {
      ...form.v,
      ...newForm
    };
  };
  const hookProvider = exposeProvider({
    // 第一个参数固定为form数据
    ...originalHookProvider,
    ...objectify([form]),
    updateForm,
    reset,
    // 持久化数据恢复事件绑定
    onRestore(handler2) {
      eventManager.on(RestoreEventKey, handler2);
    }
  });
  if (id) {
    if (!sharedState) {
      isCreateShardState.current = trueValue;
    }
    if (isCreateShardState.current) {
      typedSharedStates[id] = {
        hookProvider,
        config
      };
    }
  }
  const { send, onSuccess } = hookProvider;
  onMounted$(() => {
    if (enableStore && !sharedState) {
      const storagedForm = serializerPerformer2.current.deserialize(storageContext.get(storagedKey));
      if (storagedForm) {
        form.v = storagedForm;
        eventManager.emit(RestoreEventKey, undefinedValue);
        enableStore && immediate && send();
      }
    }
  });
  watch$([form], () => {
    if (reseting.current || !enableStore) {
      reseting.current = falseValue;
      return;
    }
    storageContext.set(storagedKey, serializerPerformer2.current.serialize(form.v));
  });
  onSuccess(() => {
    resetAfterSubmiting && reset();
  });
  return sharedState && !isCreateShardState.current ? sharedState.hookProvider : hookProvider;
};
var RetryEventKey = Symbol("RetriableRetry");
var FailEventKey = Symbol("RetriableFail");
var hookPrefix = "useRetriableRequest";
var assert$1 = createAssert(hookPrefix);
var useRetriableRequest = (handler, config = {}) => {
  const { retry = 3, backoff = { delay: 1e3 }, middleware = noop } = config;
  const { ref: useFlag$, exposeProvider, __referingObj: referingObject } = statesHookHelper(promiseStatesHook());
  const eventManager = createEventManager();
  const retryTimes = useFlag$(0);
  const stopManuallyError = useFlag$(undefinedValue);
  const methodInstanceLastest = useFlag$(undefinedValue);
  const argsLatest = useFlag$(undefinedValue);
  const currentLoadingState = useFlag$(falseValue);
  const requesting = useFlag$(falseValue);
  const retryTimer = useFlag$(undefinedValue);
  const promiseObj = useFlag$(usePromise());
  const requestResolved = useFlag$(falseValue);
  const emitOnFail = (method, args, error) => {
    if (requestResolved.current) {
      return;
    }
    requestResolved.current = trueValue;
    setTimeoutFn(() => {
      eventManager.emit(FailEventKey, newInstance(RetriableFailEvent, AlovaEventBase.spawn(method, args), error, retryTimes.current));
      stopManuallyError.current = undefinedValue;
      retryTimes.current = 0;
    });
  };
  const nestedHookProvider = useRequest(handler, {
    ...config,
    __referingObj: referingObject,
    middleware(ctx, next) {
      middleware({
        ...ctx,
        delegatingActions: {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          stop
        }
      }, () => promiseResolve(undefinedValue));
      const { proxyStates, args, send, method, controlLoading } = ctx;
      const setLoading = (loading = falseValue) => {
        if (loading !== currentLoadingState.current) {
          proxyStates.loading.v = loading;
          currentLoadingState.current = loading;
        }
      };
      controlLoading();
      setLoading(trueValue);
      methodInstanceLastest.current = method;
      argsLatest.current = args;
      requesting.current = trueValue;
      if (retryTimes.current === 0) {
        requestResolved.current = falseValue;
      }
      return promiseThen(
        Promise.race([next(), promiseObj.current.promise]),
        // 请求成功时设置loading为false
        (val) => {
          requesting.current = falseValue;
          setLoading();
          return val;
        },
        // 请求失败时触发重试机制
        (error) => {
          if (!stopManuallyError.current && (isNumber(retry) ? retryTimes.current < retry : retry(error, ...args))) {
            retryTimes.current += 1;
            const retryDelay = delayWithBackoff(backoff, retryTimes.current);
            retryTimer.current = setTimeoutFn(() => {
              promiseCatch(send(...args), noop);
              eventManager.emit(RetryEventKey, newInstance(RetriableRetryEvent, AlovaEventBase.spawn(method, args), retryTimes.current, retryDelay));
            }, retryDelay);
          } else {
            setLoading();
            error = stopManuallyError.current || error;
            emitOnFail(method, args, error);
          }
          requesting.current = falseValue;
          return promiseReject(error);
        }
      );
    }
  });
  const stop = () => {
    assert$1(currentLoadingState.current, "there is no requests being retried");
    stopManuallyError.current = newInstance(AlovaError, hookPrefix, "stop retry manually");
    if (requesting.current) {
      nestedHookProvider.abort();
    } else {
      promiseObj.current.reject(stopManuallyError.current);
      setTimeout(() => {
        promiseObj.current = usePromise();
      });
      nestedHookProvider.update({ error: stopManuallyError.current, loading: falseValue });
      currentLoadingState.current = falseValue;
      clearTimeout(retryTimer.current);
      emitOnFail(methodInstanceLastest.current, argsLatest.current, stopManuallyError.current);
    }
  };
  const onRetry = (handler2) => {
    eventManager.on(RetryEventKey, (event) => handler2(event));
  };
  const onFail = (handler2) => {
    eventManager.on(FailEventKey, (event) => handler2(event));
  };
  return exposeProvider({
    ...nestedHookProvider,
    stop,
    onRetry,
    onFail
  });
};
var buildCompletedURL = (baseURL, url, params) => {
  baseURL = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
  url = url.match(/^(\/|https?:\/\/)/) ? url : `/${url}`;
  const completeURL = baseURL + url;
  const paramsStr = mapItem(filterItem(objectKeys(params), (key) => params[key] !== undefinedValue), (key) => `${key}=${params[key]}`).join("&");
  return paramsStr ? +completeURL.includes("?") ? `${completeURL}&${paramsStr}` : `${completeURL}?${paramsStr}` : completeURL;
};
var SSEOpenEventKey = Symbol("SSEOpen");
var SSEMessageEventKey = Symbol("SSEMessage");
var SSEErrorEventKey = Symbol("SSEError");
var assert = createAssert("useSSE");
var MessageType = {
  Open: "open",
  Error: "error",
  Message: "message"
};
var useSSE = (handler, config = {}) => {
  const {
    initialData,
    withCredentials,
    interceptByGlobalResponded = trueValue,
    /** abortLast = trueValue, */
    immediate = falseValue
  } = config;
  const abortLast = trueValue;
  let { memorize } = promiseStatesHook();
  memorize !== null && memorize !== void 0 ? memorize : memorize = $self;
  const { create, ref, onMounted, onUnmounted, objectify, exposeProvider } = statesHookHelper(promiseStatesHook());
  const usingArgs = ref([]);
  const eventSource = ref(undefinedValue);
  const sendPromiseObject = ref(undefinedValue);
  const data = create(initialData, "data");
  const readyState = create(2, "readyState");
  let methodInstance = getHandlerMethod2(handler);
  let responseUnified;
  const eventManager = createEventManager();
  const customEventMap = ref(/* @__PURE__ */ new Map());
  const onOpen = (handler2) => {
    eventManager.on(SSEOpenEventKey, handler2);
  };
  const onMessage = (handler2) => {
    eventManager.on(SSEMessageEventKey, handler2);
  };
  const onError = (handler2) => {
    eventManager.on(SSEErrorEventKey, handler2);
  };
  const responseSuccessHandler = ref($self);
  const responseErrorHandler = ref(throwFn);
  const responseCompleteHandler = ref(noop);
  const setResponseHandler = (instance) => {
    const { responded } = getOptions(instance);
    responseUnified = responded;
    if (isFn(responseUnified)) {
      responseSuccessHandler.current = responseUnified;
    } else if (responseUnified && isPlainObject(responseUnified)) {
      const { onSuccess: successHandler, onError: errorHandler, onComplete: completeHandler } = responseUnified;
      responseSuccessHandler.current = isFn(successHandler) ? successHandler : responseSuccessHandler.current;
      responseErrorHandler.current = isFn(errorHandler) ? errorHandler : responseErrorHandler.current;
      responseCompleteHandler.current = isFn(completeHandler) ? completeHandler : responseCompleteHandler.current;
    }
  };
  const handleResponseTask = async (handlerReturns) => {
    const { headers, transform: transformFn = $self } = getConfig(methodInstance);
    const returnsData = await handlerReturns;
    const transformedData = await transformFn(returnsData, headers || {});
    data.v = transformedData;
    hitCacheBySource(methodInstance);
    return transformedData;
  };
  const createSSEEvent = async (eventFrom, dataOrError) => {
    assert(!!eventSource.current, "EventSource is not initialized");
    const es = eventSource.current;
    const baseEvent = new AlovaSSEEvent(AlovaEventBase.spawn(methodInstance, usingArgs.current), es);
    if (eventFrom === MessageType.Open) {
      return Promise.resolve(baseEvent);
    }
    const globalSuccess = interceptByGlobalResponded ? responseSuccessHandler.current : $self;
    const globalError = interceptByGlobalResponded ? responseErrorHandler.current : throwFn;
    const globalFinally = interceptByGlobalResponded ? responseCompleteHandler.current : noop;
    const p = promiseFinally(
      promiseThen(dataOrError, (res) => handleResponseTask(globalSuccess(res, methodInstance)), (error) => handleResponseTask(globalError(error, methodInstance))),
      // finally
      () => {
        globalFinally(methodInstance);
      }
    );
    return promiseThen(
      p,
      // 得到处理好的数据（transform 之后的数据）
      (res) => new AlovaSSEMessageEvent(baseEvent, res),
      // 有错误
      (error) => new AlovaSSEErrorEvent(baseEvent, error)
    );
  };
  const sendSSEEvent = (callback) => (event) => {
    if (event.error === undefinedValue) {
      return callback(event);
    }
    return eventManager.emit(SSEErrorEventKey, event);
  };
  const onCustomEvent = (eventName, callbackHandler) => {
    var _a;
    const currentMap = customEventMap.current;
    if (!currentMap.has(eventName)) {
      const useCallbackObject = useCallback((callbacks) => {
        var _a2;
        if (callbacks.length === 0) {
          (_a2 = eventSource.current) === null || _a2 === void 0 ? void 0 : _a2.removeEventListener(eventName, useCallbackObject[1]);
          customEventMap.current.delete(eventName);
        }
      });
      const trigger = useCallbackObject[1];
      currentMap.set(eventName, useCallbackObject);
      (_a = eventSource.current) === null || _a === void 0 ? void 0 : _a.addEventListener(eventName, (event) => {
        promiseThen(createSSEEvent(eventName, Promise.resolve(event.data)), sendSSEEvent(trigger));
      });
    }
    const [onEvent] = currentMap.get(eventName);
    return onEvent(callbackHandler);
  };
  const offCustomEvent = () => {
    customEventMap.current.forEach(([_1, _2, offTrigger]) => {
      offTrigger();
    });
  };
  const esOpen = memorize(() => {
    var _a;
    readyState.v = 1;
    promiseThen(createSSEEvent(MessageType.Open, Promise.resolve()), (event) => eventManager.emit(SSEOpenEventKey, event));
    (_a = sendPromiseObject.current) === null || _a === void 0 ? void 0 : _a.resolve();
  });
  const esError = memorize((event) => {
    var _a, _b;
    readyState.v = 2;
    promiseThen(createSSEEvent(MessageType.Error, Promise.reject((_a = event === null || event === void 0 ? void 0 : event.message) !== null && _a !== void 0 ? _a : "SSE Error")), sendSSEEvent((event2) => eventManager.emit(SSEMessageEventKey, event2)));
    (_b = sendPromiseObject.current) === null || _b === void 0 ? void 0 : _b.resolve();
  });
  const esMessage = memorize((event) => {
    promiseThen(createSSEEvent(MessageType.Message, Promise.resolve(event.data)), sendSSEEvent((event2) => eventManager.emit(SSEMessageEventKey, event2)));
  });
  const close = () => {
    const es = eventSource.current;
    if (!es) {
      return;
    }
    if (sendPromiseObject.current) {
      sendPromiseObject.current.resolve();
    }
    es.close();
    es.removeEventListener(MessageType.Open, esOpen);
    es.removeEventListener(MessageType.Error, esError);
    es.removeEventListener(MessageType.Message, esMessage);
    readyState.v = 2;
    customEventMap.current.forEach(([_, eventTrigger], eventName) => {
      es.removeEventListener(eventName, eventTrigger);
    });
  };
  const connect = (...args) => {
    let es = eventSource.current;
    let promiseObj = sendPromiseObject.current;
    if (es && abortLast) {
      close();
    }
    if (!promiseObj) {
      promiseObj = sendPromiseObject.current = usePromise();
      promiseObj && promiseObj.promise.finally(() => {
        promiseObj = undefinedValue;
      });
    }
    usingArgs.current = args;
    methodInstance = getHandlerMethod2(handler, args);
    setResponseHandler(methodInstance);
    const { params } = getConfig(methodInstance);
    const { baseURL, url } = methodInstance;
    const fullURL = buildCompletedURL(baseURL, url, params);
    es = new EventSource(fullURL, { withCredentials });
    eventSource.current = es;
    readyState.v = 0;
    es.addEventListener(MessageType.Open, esOpen);
    es.addEventListener(MessageType.Error, esError);
    es.addEventListener(MessageType.Message, esMessage);
    customEventMap.current.forEach(([_, eventTrigger], eventName) => {
      es === null || es === void 0 ? void 0 : es.addEventListener(eventName, (event) => {
        promiseThen(createSSEEvent(eventName, Promise.resolve(event.data)), sendSSEEvent(eventTrigger));
      });
    });
    return promiseObj.promise;
  };
  onUnmounted(() => {
    close();
    eventManager.off(SSEOpenEventKey);
    eventManager.off(SSEMessageEventKey);
    eventManager.off(SSEErrorEventKey);
    offCustomEvent();
  });
  onMounted(() => {
    var _a;
    if (immediate) {
      connect();
      (_a = sendPromiseObject.current) === null || _a === void 0 ? void 0 : _a.promise.catch(() => {
      });
    }
  });
  return exposeProvider({
    send: connect,
    close,
    on: onCustomEvent,
    onMessage,
    onError,
    onOpen,
    eventSource,
    ...objectify([readyState, data])
  });
};
export {
  accessAction,
  actionDelegationMiddleware,
  bootSilentFactory,
  createClientTokenAuthentication,
  createServerTokenAuthentication,
  dehydrateVData,
  equals,
  filterSilentMethods,
  getSilentMethod,
  isVData,
  onBeforeSilentSubmit,
  onSilentSubmitBoot,
  onSilentSubmitError,
  onSilentSubmitFail,
  onSilentSubmitSuccess,
  silentQueueMap,
  stringifyVData,
  updateState,
  updateStateEffect,
  useAutoRequest,
  useCaptcha,
  useFetcher,
  useForm,
  usePagination,
  useRequest,
  useRetriableRequest,
  useSQRequest,
  useSSE,
  useSerialRequest,
  useSerialWatcher,
  useWatcher
};
//# sourceMappingURL=alova_client.js.map
