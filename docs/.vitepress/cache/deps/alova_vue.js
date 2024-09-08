import {
  createSyncOnceRunner,
  forEach,
  setTimeoutFn,
  trueValue
} from "./chunk-4HOVM5XU.js";
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  ref,
  watch
} from "./chunk-4ROYU34L.js";
import "./chunk-G3PMV62Z.js";

// node_modules/alova/dist/stateshook/vue.esm.js
var vue = {
  name: "Vue",
  create: (data) => ref(data),
  dehydrate: (state) => state.value,
  update: (newVal, state) => {
    state.value = newVal;
  },
  effectRequest({ handler, removeStates, immediate, watchingStates }) {
    if (getCurrentInstance()) {
      onUnmounted(removeStates);
      onMounted(() => immediate && handler());
    } else {
      setTimeoutFn(() => {
        immediate && handler();
      });
    }
    const syncRunner = createSyncOnceRunner();
    forEach(watchingStates || [], (state, i) => {
      watch(state, () => {
        syncRunner(() => {
          handler(i);
        });
      }, { deep: trueValue });
    });
  },
  computed: (getter) => computed(getter),
  watch: (states, callback) => {
    watch(states, callback, {
      deep: trueValue
    });
  },
  onMounted: (callback) => {
    if (getCurrentInstance()) {
      onMounted(callback);
    } else {
      setTimeoutFn(callback, 10);
    }
  },
  onUnmounted: (callback) => {
    getCurrentInstance() && onUnmounted(callback);
  }
};
export {
  vue as default
};
//# sourceMappingURL=alova_vue.js.map
