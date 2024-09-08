import {
  Fragment,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createVNode,
  defineComponent,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onMounted,
  openBlock,
  reactive,
  ref,
  renderList,
  toDisplayString,
  toRaw,
  toRefs,
  unref,
  vShow,
  watch,
  withDirectives
} from "./chunk-4ROYU34L.js";
import "./chunk-G3PMV62Z.js";

// node_modules/go-captcha-vue/dist/go-captcha-vue.es.js
var le = () => ({
  width: 300,
  height: 220,
  thumbWidth: 150,
  thumbHeight: 40,
  verticalPadding: 16,
  horizontalPadding: 12,
  showTheme: true,
  title: "请在下图依次点击",
  buttonText: "确认"
});
var fe = createBaseVNode("path", { d: `M100.1,189.9C100.1,189.9,100,189.9,100.1,189.9c-49.7,0-90-40.4-90-89.9c0-49.6,40.4-89.9,89.9-89.9
		c49.6,0,89.9,40.4,89.9,89.9c0,18.2-5.4,35.7-15.6,50.7c-1.5,2.1-3.6,3.4-6.1,3.9c-2.5,0.4-5-0.1-7-1.6c-4.2-3-5.3-8.6-2.4-12.9
		c8.1-11.9,12.4-25.7,12.4-40.1c0-39.2-31.9-71.1-71.1-71.1c-39.2,0-71.1,31.9-71.1,71.1c0,39.2,31.9,71.1,71.1,71.1
		c7.7,0,15.3-1.2,22.6-3.6c2.4-0.8,4.9-0.6,7.2,0.5c2.2,1.1,3.9,3.1,4.7,5.5c1.6,4.9-1,10.2-5.9,11.9
		C119.3,188.4,109.8,189.9,100.1,189.9z M73,136.4C73,136.4,73,136.4,73,136.4c-2.5,0-4.9-1-6.7-2.8c-3.7-3.7-3.7-9.6,0-13.3
		L86.7,100L66.4,79.7c-3.7-3.7-3.7-9.6,0-13.3c3.7-3.7,9.6-3.7,13.3,0L100,86.7l20.3-20.3c1.8-1.8,4.1-2.8,6.7-2.8c0,0,0,0,0,0
		c2.5,0,4.9,1,6.7,2.8c1.8,1.8,2.8,4.1,2.8,6.7c0,2.5-1,4.9-2.8,6.7L113.3,100l20.3,20.3c3.7,3.7,3.7,9.6,0,13.3
		c-3.7,3.7-9.6,3.7-13.3,0L100,113.3l-20.3,20.3C77.9,135.4,75.5,136.4,73,136.4z` }, null, -1);
var pe = [
  fe
];
var Z = defineComponent({
  __name: "close-icon",
  emits: ["click"],
  setup(l, { emit: t }) {
    const n = t;
    function s(e) {
      n("click", e);
    }
    return (e, a) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 200 200",
      width: "20",
      height: "20"
    }, e.$attrs, { onClick: s }), pe, 16));
  }
});
var me = createBaseVNode("path", { d: `M135,149.9c-10.7,7.6-23.2,11.4-36,11.2c-1.7,0-3.4-0.1-5-0.3c-0.7-0.1-1.4-0.2-2-0.3c-1.3-0.2-2.6-0.4-3.9-0.6
	c-0.8-0.2-1.6-0.4-2.3-0.5c-1.2-0.3-2.5-0.6-3.7-1c-0.6-0.2-1.2-0.4-1.7-0.6c-1.4-0.5-2.8-1-4.2-1.5c-0.3-0.1-0.6-0.3-0.9-0.4
	c-1.6-0.7-3.2-1.4-4.7-2.3c-0.1,0-0.1-0.1-0.2-0.1c-5.1-2.9-9.8-6.4-14-10.6c-0.1-0.1-0.1-0.1-0.2-0.2c-1.3-1.3-2.5-2.7-3.7-4.1
	c-0.2-0.3-0.5-0.6-0.7-0.9c-8.4-10.6-13.5-24.1-13.5-38.8h14.3c0.4,0,0.7-0.2,0.9-0.5c0.2-0.3,0.2-0.8,0-1.1L29.5,60.9
	c-0.2-0.3-0.5-0.5-0.9-0.5c-0.4,0-0.7,0.2-0.9,0.5L3.8,97.3c-0.2,0.3-0.2,0.7,0,1.1c0.2,0.3,0.5,0.5,0.9,0.5h14.3
	c0,17.2,5.3,33.2,14.3,46.4c0.1,0.2,0.2,0.4,0.3,0.6c0.9,1.4,2,2.6,3,3.9c0.4,0.5,0.7,1,1.1,1.5c1.5,1.8,3,3.5,4.6,5.2
	c0.2,0.2,0.3,0.3,0.5,0.5c5.4,5.5,11.5,10.1,18.2,13.8c0.2,0.1,0.3,0.2,0.5,0.3c1.9,1,3.9,2,5.9,2.9c0.5,0.2,1,0.5,1.5,0.7
	c1.7,0.7,3.5,1.3,5.2,1.9c0.8,0.3,1.7,0.6,2.5,0.8c1.5,0.5,3.1,0.8,4.7,1.2c1.1,0.2,2.1,0.5,3.2,0.7c0.4,0.1,0.9,0.2,1.3,0.3
	c1.5,0.3,3,0.4,4.5,0.6c0.5,0.1,1.1,0.2,1.6,0.2c2.7,0.3,5.4,0.4,8.1,0.4c16.4,0,32.5-5.1,46.2-14.8c4.4-3.1,5.5-9.2,2.4-13.7
	C145.5,147.8,139.4,146.7,135,149.9 M180.6,98.9c0-17.2-5.3-33.1-14.2-46.3c-0.1-0.2-0.2-0.5-0.4-0.7c-1.1-1.6-2.3-3.1-3.5-4.6
	c-0.1-0.2-0.3-0.4-0.4-0.6c-8.2-10.1-18.5-17.9-30.2-23c-0.3-0.1-0.6-0.3-1-0.4c-1.9-0.8-3.8-1.5-5.7-2.1c-0.7-0.2-1.4-0.5-2.1-0.7
	c-1.7-0.5-3.4-0.9-5.1-1.3c-0.9-0.2-1.9-0.5-2.8-0.7c-0.5-0.1-0.9-0.2-1.4-0.3c-1.3-0.2-2.6-0.3-3.8-0.5c-0.9-0.1-1.8-0.3-2.6-0.3
	c-2.1-0.2-4.3-0.3-6.4-0.3c-0.4,0-0.8-0.1-1.2-0.1c-0.1,0-0.1,0-0.2,0c-16.4,0-32.4,5-46.2,14.8C49,35,48,41.1,51,45.6
	c3.1,4.4,9.1,5.5,13.5,2.4c10.6-7.5,23-11.3,35.7-11.2c1.8,0,3.6,0.1,5.4,0.3c0.6,0.1,1.1,0.1,1.6,0.2c1.5,0.2,2.9,0.4,4.3,0.7
	c0.6,0.1,1.3,0.3,1.9,0.4c1.4,0.3,2.8,0.7,4.2,1.1c0.4,0.1,0.9,0.3,1.3,0.4c1.6,0.5,3.1,1.1,4.6,1.7c0.2,0.1,0.3,0.1,0.5,0.2
	c9,3.9,17,10,23.2,17.6c0,0,0.1,0.1,0.1,0.2c8.7,10.7,14,24.5,14,39.4H147c-0.4,0-0.7,0.2-0.9,0.5c-0.2,0.3-0.2,0.8,0,1.1l24,36.4
	c0.2,0.3,0.5,0.5,0.9,0.5c0.4,0,0.7-0.2,0.9-0.5l23.9-36.4c0.2-0.3,0.2-0.7,0-1.1c-0.2-0.3-0.5-0.5-0.9-0.5L180.6,98.9L180.6,98.9
	L180.6,98.9z` }, null, -1);
var _e = [
  me
];
var R = defineComponent({
  __name: "refresh-icon",
  emits: ["click"],
  setup(l, { emit: t }) {
    const n = t;
    function s(e) {
      n("click", e);
    }
    return (e, a) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 200 200",
      width: "20",
      height: "20"
    }, e.$attrs, { onClick: s }), _e, 16));
  }
});
var we = createBaseVNode("circle", {
  cx: "50",
  cy: "36.8101",
  r: "10"
}, [
  createBaseVNode("animate", {
    attributeName: "cy",
    dur: "1s",
    repeatCount: "indefinite",
    calcMode: "spline",
    keySplines: "0.45 0 0.9 0.55;0 0.45 0.55 0.9",
    keyTimes: "0;0.5;1",
    values: "23;77;23"
  })
], -1);
var be = [
  we
];
var ee = defineComponent({
  __name: "loading-icon",
  emits: ["click"],
  setup(l, { emit: t }) {
    const n = t;
    function s(e) {
      n("click", e);
    }
    return (e, a) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 100 100",
      preserveAspectRatio: "xMidYMid",
      width: "84",
      height: "84"
    }, e.$attrs, { onClick: s }), be, 16));
  }
});
function xe(l) {
  let t = 0, n = 0;
  if (l.getBoundingClientRect) {
    const s = l.getBoundingClientRect(), e = document.documentElement;
    t = s.left + Math.max(e.scrollLeft, document.body.scrollLeft) - e.clientLeft, n = s.top + Math.max(e.scrollTop, document.body.scrollTop) - e.clientTop;
  } else
    for (; l !== document.body; )
      t += l.offsetLeft, n += l.offsetTop, l = l.offsetParent;
  return {
    domX: t,
    domY: n
  };
}
function se(l, t) {
  let n = t.relatedTarget;
  try {
    for (; n && n !== l; )
      n = n.parentNode;
  } catch (s) {
    console.warn(s);
  }
  return n !== l;
}
function Ee(l, t) {
  const n = reactive({ list: [] });
  return {
    dots: n,
    clickEvent: (o) => {
      const E = o.currentTarget, u = xe(E), g = o.pageX || o.clientX, r = o.pageY || o.clientY, h = u.domX, _ = u.domY, w = g - h, v = r - _, f = parseInt(w.toString()), k = parseInt(v.toString()), $ = /* @__PURE__ */ new Date(), S = n.list.length, y = n.list;
      return y.push({ key: $.getTime(), index: S + 1, x: f, y: k }), n.list = y, t.click && t.click(f, k), o.cancelBubble = true, o.preventDefault(), false;
    },
    confirmEvent: (o) => (t.confirm && t.confirm(toRaw(n.list), () => {
      n.list = [];
    }), o.cancelBubble = true, o.preventDefault(), false),
    closeEvent: (o) => (t.close && t.close(), n.list = [], o.cancelBubble = true, o.preventDefault(), false),
    refreshEvent: (o) => (t.refresh && t.refresh(), n.list = [], o.cancelBubble = true, o.preventDefault(), false)
  };
}
var ke = { class: "gc-header" };
var ye = ["src"];
var Le = { class: "gc-loading" };
var $e = ["src"];
var Ce = { class: "gc-dots" };
var Te = { class: "gc-footer" };
var Pe = { class: "gc-icon-block gc-icon-block2" };
var ze = { class: "gc-button-block" };
var G = defineComponent({
  __name: "index",
  props: {
    config: { default: le },
    events: { default: () => ({}) },
    data: { default: () => ({}) }
  },
  setup(l) {
    const t = l, { data: n, events: s } = t, e = ref({
      ...le(),
      ...t.config
    });
    watch(() => t.config, () => {
      e.value = {
        ...e.value,
        ...t.config
      };
    });
    const a = Ee(n, s), d = e.value.horizontalPadding || 0, o = e.value.verticalPadding || 0, E = (e.value.width || 0) + d * 2 + (e.value.showTheme ? 2 : 0), u = a.dots, g = computed(() => ({
      width: E + "px",
      paddingLeft: d + "px",
      paddingRight: d + "px",
      paddingTop: o + "px",
      paddingBottom: o + "px"
    })), r = computed(() => ({
      width: e.value.thumbWidth + "px",
      height: e.value.thumbHeight + "px"
    })), h = computed(() => ({
      width: e.value.width + "px",
      height: e.value.height + "px"
    }));
    return (_, w) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(`go-captcha gc-wrapper ${e.value.showTheme ? "gc-theme" : ""}`),
      style: normalizeStyle(g.value)
    }, [
      createBaseVNode("div", ke, [
        createBaseVNode("span", null, toDisplayString(e.value.title), 1),
        withDirectives(createBaseVNode("img", {
          style: normalizeStyle(r.value),
          src: unref(n).thumb,
          alt: "..."
        }, null, 12, ye), [
          [vShow, unref(n).thumb !== ""]
        ])
      ]),
      createBaseVNode("div", {
        class: "gc-body",
        style: normalizeStyle(h.value)
      }, [
        createBaseVNode("div", Le, [
          createVNode(ee)
        ]),
        withDirectives(createBaseVNode("img", {
          style: normalizeStyle(h.value),
          class: "gc-picture",
          src: unref(n).image,
          alt: "...",
          onClick: w[0] || (w[0] = //@ts-ignore
          (...v) => unref(a).clickEvent && unref(a).clickEvent(...v))
        }, null, 12, $e), [
          [vShow, unref(n).image !== ""]
        ]),
        createBaseVNode("div", Ce, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(u).list, (v) => (openBlock(), createElementBlock("div", {
            class: "gc-dot",
            key: `${v.key + "-" + v.index}`,
            style: normalizeStyle({
              top: v.y - 11 + "px",
              left: v.x - 11 + "px"
            })
          }, toDisplayString(v.index), 5))), 128))
        ])
      ], 4),
      createBaseVNode("div", Te, [
        createBaseVNode("div", Pe, [
          createVNode(Z, {
            width: 22,
            height: 22,
            onClick: unref(a).closeEvent
          }, null, 8, ["onClick"]),
          createVNode(R, {
            width: 22,
            height: 22,
            onClick: unref(a).refreshEvent
          }, null, 8, ["onClick"])
        ]),
        createBaseVNode("div", ze, [
          createBaseVNode("button", {
            onClick: w[1] || (w[1] = //@ts-ignore
            (...v) => unref(a).confirmEvent && unref(a).confirmEvent(...v))
          }, toDisplayString(e.value.buttonText), 1)
        ])
      ])
    ], 6));
  }
});
G.name = "gocaptcha-click";
G.install = function(l) {
  l.component("gocaptcha-click", G);
};
var oe = () => ({
  width: 300,
  height: 220,
  thumbWidth: 150,
  thumbHeight: 40,
  verticalPadding: 16,
  horizontalPadding: 12,
  showTheme: true,
  title: "请拖动滑块完成拼图"
});
var Xe = createBaseVNode("path", { d: `M131.6,116.3c0,0-75.6,0-109.7,0c-9.1,0-16.2-7.4-16.2-16.2c0-9.1,7.4-16.2,16.2-16.2c28.7,0,109.7,0,109.7,0
	s-5.4-5.4-30.4-30.7c-6.4-6.4-6.4-16.7,0-23.1s16.7-6.4,23.1,0l58.4,58.4c6.4,6.4,6.4,16.7,0,23.1c0,0-32.9,32.9-57.9,57.9
	c-6.4,6.4-16.7,6.4-23.1,0c-6.4-6.4-6.4-16.7,0-23.1C121.8,126.2,131.6,116.3,131.6,116.3z` }, null, -1);
var De = [
  Xe
];
var ue = defineComponent({
  __name: "arrows-icon",
  emits: ["click"],
  setup(l, { emit: t }) {
    const n = t;
    function s(e) {
      n("click", e);
    }
    return (e, a) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 200 200",
      width: "20",
      height: "20"
    }, e.$attrs, { onClick: s }), De, 16));
  }
});
function Me(l, t, n, s, e, a) {
  const d = reactive({ dragLeft: 0, thumbLeft: l.thumbX || 0 }), o = () => {
    d.dragLeft = 0, d.thumbLeft = 0;
  };
  return {
    state: d,
    dragEvent: (r) => {
      const h = r.touches && r.touches[0], _ = e.value.offsetLeft, w = n.value.offsetWidth, v = e.value.offsetWidth, f = w - v, k = l.thumbX || 0, $ = s.value.offsetWidth, S = v - $, y = (f - k + S) / f;
      let x = false, B = 0, T = 0;
      h ? B = h.pageX - _ : B = r.clientX - _;
      const W = (p) => {
        x = true;
        const N = p.touches && p.touches[0];
        let L = 0;
        if (N ? L = N.pageX - B : L = p.clientX - B, L >= f) {
          d.dragLeft = f;
          return;
        }
        if (L <= 0) {
          d.dragLeft = 0;
          return;
        }
        d.dragLeft = L, T = k + L * y, d.thumbLeft = T, t.move && t.move(T, l.thumbY || 0), p.cancelBubble = true, p.preventDefault();
      }, X = (p) => {
        se(a.value, p) && x && (a.value.removeEventListener("mousemove", W, false), a.value.removeEventListener("touchmove", W, { passive: false }), a.value.removeEventListener("mouseup", X, false), a.value.removeEventListener("mouseout", X, false), a.value.removeEventListener("touchend", X, false), x = false, t.confirm && t.confirm({ x: parseInt(T.toString()), y: l.thumbY || 0 }, () => {
          o();
        }), p.cancelBubble = true, p.preventDefault());
      };
      a.value.addEventListener("mousemove", W, false), a.value.addEventListener("touchmove", W, { passive: false }), a.value.addEventListener("mouseup", X, false), a.value.addEventListener("mouseout", X, false), a.value.addEventListener("touchend", X, false);
    },
    closeEvent: (r) => (t && t.close && t.close(), o(), r.cancelBubble = true, r.preventDefault(), false),
    refreshEvent: (r) => (t && t.refresh && t.refresh(), o(), r.cancelBubble = true, r.preventDefault(), false)
  };
}
var Se = { class: "gc-header" };
var Be = { class: "gc-icon-block" };
var We = { class: "gc-loading" };
var Ye = ["src"];
var He = ["src"];
var Fe = { class: "gc-footer" };
var Ae = createBaseVNode("div", { class: "gc-drag-line" }, null, -1);
var J = defineComponent({
  __name: "index",
  props: {
    config: { default: oe },
    events: { default: () => ({}) },
    data: { default: () => ({}) }
  },
  setup(l) {
    const t = l, { data: n, events: s } = t, e = ref({
      ...oe(),
      ...t.config
    });
    watch(() => t.config, () => {
      e.value = {
        ...e.value,
        ...t.config
      };
    });
    const a = ref(null), d = ref(null), o = ref(null), E = ref(null), u = Me(n, s, d, E, o, a), g = e.value.horizontalPadding || 0, r = e.value.verticalPadding || 0, h = (e.value.width || 0) + g * 2 + (e.value.showTheme ? 2 : 0), _ = computed(() => ({
      width: h + "px",
      paddingLeft: g + "px",
      paddingRight: g + "px",
      paddingTop: r + "px",
      paddingBottom: r + "px"
    })), w = computed(() => ({
      width: n.thumbWidth + "px",
      height: n.thumbHeight + "px",
      top: n.thumbY + "px",
      left: u.state.thumbLeft + "px"
    })), v = computed(() => ({
      width: e.value.width + "px",
      height: e.value.height + "px"
    }));
    return onMounted(async () => {
      await nextTick(), o.value && o.value.addEventListener("dragstart", (f) => f.preventDefault());
    }), (f, k) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(`go-captcha gc-wrapper ${e.value.showTheme ? "gc-theme" : ""}`),
      style: normalizeStyle(_.value)
    }, [
      createBaseVNode("div", Se, [
        createBaseVNode("span", null, toDisplayString(e.value.title), 1),
        createBaseVNode("div", Be, [
          createVNode(Z, {
            width: 22,
            height: 22,
            onClick: unref(u).closeEvent
          }, null, 8, ["onClick"]),
          createVNode(R, {
            width: 22,
            height: 22,
            onClick: unref(u).refreshEvent
          }, null, 8, ["onClick"])
        ])
      ]),
      createBaseVNode("div", {
        class: "gc-body",
        ref_key: "containerRef",
        ref: d,
        style: normalizeStyle(v.value)
      }, [
        createBaseVNode("div", We, [
          createVNode(ee)
        ]),
        withDirectives(createBaseVNode("img", {
          class: "gc-picture",
          style: normalizeStyle(v.value),
          src: unref(n).image,
          alt: "..."
        }, null, 12, Ye), [
          [vShow, unref(n).image !== ""]
        ]),
        createBaseVNode("div", {
          class: "gc-tile",
          ref_key: "tileRef",
          ref: E,
          style: normalizeStyle(w.value)
        }, [
          withDirectives(createBaseVNode("img", {
            src: unref(n).thumb,
            alt: "..."
          }, null, 8, He), [
            [vShow, unref(n).thumb !== ""]
          ])
        ], 4)
      ], 4),
      createBaseVNode("div", Fe, [
        createBaseVNode("div", {
          class: "gc-drag-slide-bar",
          ref_key: "dragBarRef",
          ref: a,
          onMousedown: k[1] || (k[1] = //@ts-ignore
          (...$) => unref(u).dragEvent && unref(u).dragEvent(...$))
        }, [
          Ae,
          createBaseVNode("div", {
            class: "gc-drag-block",
            ref_key: "dragBlockRef",
            ref: o,
            onTouchstart: k[0] || (k[0] = //@ts-ignore
            (...$) => unref(u).dragEvent && unref(u).dragEvent(...$)),
            style: normalizeStyle({ left: unref(u).state.dragLeft + "px" })
          }, [
            createVNode(ue)
          ], 36)
        ], 544)
      ])
    ], 6));
  }
});
J.name = "gocaptcha-slide";
J.install = function(l) {
  l.component("gocaptcha-slide", J);
};
var ie = () => ({
  width: 300,
  height: 220,
  verticalPadding: 16,
  horizontalPadding: 12,
  showTheme: true,
  title: "请拖拽贴图完成拼图"
});
function Ve(l, t, n, s) {
  const e = reactive({ x: l.thumbX || 0, y: l.thumbY || 0 }), a = () => {
    e.x = l.thumbX || 0, e.y = l.thumbY || 0;
  };
  return {
    state: e,
    dragEvent: (u) => {
      const g = u.touches && u.touches[0], r = s.value.offsetLeft, h = s.value.offsetTop, _ = n.value.offsetWidth, w = n.value.offsetHeight, v = s.value.offsetWidth, f = s.value.offsetHeight, k = _ - v, $ = w - f;
      let S = false, y = 0, x = 0, B = 0, T = 0;
      g ? (y = g.pageX - r, x = g.pageY - h) : (y = u.clientX - r, x = u.clientY - h);
      const W = (p) => {
        S = true;
        const N = p.touches && p.touches[0];
        let L = 0, Y = 0;
        N ? (L = N.pageX - y, Y = N.pageY - x) : (L = p.clientX - y, Y = p.clientY - x), L <= 0 && (L = 0), Y <= 0 && (Y = 0), L >= k && (L = k), Y >= $ && (Y = $), e.x = L, e.y = Y, B = L, T = Y, t.move && t.move(L, Y), p.cancelBubble = true, p.preventDefault();
      }, X = (p) => {
        se(n.value, p) && S && (S = false, n.value.removeEventListener("mousemove", W, false), n.value.removeEventListener("touchmove", W, { passive: false }), n.value.removeEventListener("mouseup", X, false), n.value.removeEventListener("mouseout", X, false), n.value.removeEventListener("touchend", X, false), t.confirm && t.confirm({ x: B, y: T }, () => {
          a();
        }), p.cancelBubble = true, p.preventDefault());
      };
      n.value.addEventListener("mousemove", W, false), n.value.addEventListener("touchmove", W, { passive: false }), n.value.addEventListener("mouseup", X, false), n.value.addEventListener("mouseout", X, false), n.value.addEventListener("touchend", X, false);
    },
    closeEvent: (u) => (t && t.close && t.close(), a(), u.cancelBubble = true, u.preventDefault(), false),
    refreshEvent: (u) => (t && t.refresh && t.refresh(), a(), u.cancelBubble = true, u.preventDefault(), false)
  };
}
var Ne = { class: "gc-header gc-header2" };
var Ie = { class: "gc-loading" };
var je = ["src"];
var qe = ["src"];
var Ge = { class: "gc-footer" };
var Je = { class: "gc-icon-block" };
var K = defineComponent({
  __name: "index",
  props: {
    config: { default: ie },
    events: { default: () => ({}) },
    data: { default: () => ({}) }
  },
  setup(l) {
    const t = l, { data: n, events: s } = t, e = ref({
      ...ie(),
      ...t.config
    });
    watch(() => t.config, () => {
      e.value = {
        ...e.value,
        ...t.config
      };
    });
    const a = ref(null), d = ref(null), o = Ve(n, s, a, d), E = e.value.horizontalPadding || 0, u = e.value.verticalPadding || 0;
    let g = (e.value.width || 0) + E * 2 + (e.value.showTheme ? 2 : 0);
    const r = computed(() => ({
      width: g + "px",
      paddingLeft: E + "px",
      paddingRight: E + "px",
      paddingTop: u + "px",
      paddingBottom: u + "px"
    })), h = computed(() => ({
      width: n.thumbWidth + "px",
      height: n.thumbHeight + "px",
      top: o.state.y + "px",
      left: o.state.x + "px"
    })), _ = computed(() => ({
      width: e.value.width + "px",
      height: e.value.height + "px"
    }));
    return onMounted(async () => {
      await nextTick(), d.value && d.value.addEventListener("dragstart", (w) => w.preventDefault());
    }), (w, v) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(`go-captcha gc-wrapper ${e.value.showTheme ? "gc-theme" : ""}`),
      style: normalizeStyle(r.value)
    }, [
      createBaseVNode("div", Ne, [
        createBaseVNode("span", null, toDisplayString(e.value.title), 1)
      ]),
      createBaseVNode("div", {
        class: "gc-body",
        ref_key: "containerRef",
        ref: a,
        style: normalizeStyle(_.value)
      }, [
        createBaseVNode("div", Ie, [
          createVNode(ee)
        ]),
        withDirectives(createBaseVNode("img", {
          class: "gc-picture",
          style: normalizeStyle(_.value),
          src: unref(n).image,
          alt: "..."
        }, null, 12, je), [
          [vShow, unref(n).image !== ""]
        ]),
        createBaseVNode("div", {
          class: "gc-tile",
          ref_key: "tileRef",
          ref: d,
          style: normalizeStyle(h.value),
          onMousedown: v[0] || (v[0] = //@ts-ignore
          (...f) => unref(o).dragEvent && unref(o).dragEvent(...f)),
          onTouchstart: v[1] || (v[1] = //@ts-ignore
          (...f) => unref(o).dragEvent && unref(o).dragEvent(...f))
        }, [
          withDirectives(createBaseVNode("img", {
            src: unref(n).thumb,
            alt: "..."
          }, null, 8, qe), [
            [vShow, unref(n).thumb !== ""]
          ])
        ], 36)
      ], 4),
      createBaseVNode("div", Ge, [
        createBaseVNode("div", Je, [
          createVNode(Z, {
            width: 22,
            height: 22,
            onClick: unref(o).closeEvent
          }, null, 8, ["onClick"]),
          createVNode(R, {
            width: 22,
            height: 22,
            onClick: unref(o).refreshEvent
          }, null, 8, ["onClick"])
        ])
      ])
    ], 6));
  }
});
K.name = "gocaptcha-slide-region";
K.install = function(l) {
  l.component("gocaptcha-slide-region", K);
};
var te = () => ({
  width: 300,
  height: 220,
  size: 220,
  verticalPadding: 16,
  horizontalPadding: 12,
  showTheme: true,
  title: "请拖动滑块完成拼图"
});
function Ke(l, t, n, s) {
  const e = reactive({ dragLeft: 0, thumbAngle: l.angle || 0 }), a = () => {
    e.dragLeft = 0, e.thumbAngle = 0;
  };
  return {
    state: e,
    dragEvent: (u) => {
      const g = u.touches && u.touches[0], r = n.value.offsetLeft, h = s.value.offsetWidth, _ = n.value.offsetWidth, w = h - _, v = 360 / w;
      let f = 0, k = false, $ = 0;
      g ? $ = g.pageX - r : $ = u.clientX - r;
      const S = (x) => {
        k = true;
        const B = x.touches && x.touches[0];
        let T = 0;
        if (B ? T = B.pageX - $ : T = x.clientX - $, T >= w) {
          e.dragLeft = w;
          return;
        }
        if (T <= 0) {
          e.dragLeft = 0;
          return;
        }
        e.dragLeft = T, f = T * v, e.thumbAngle = f, t.rotate && t.rotate(f), x.cancelBubble = true, x.preventDefault();
      }, y = (x) => {
        se(s.value, x) && k && (s.value.removeEventListener("mousemove", S, false), s.value.removeEventListener("touchmove", S, { passive: false }), s.value.removeEventListener("mouseup", y, false), s.value.removeEventListener("mouseout", y, false), s.value.removeEventListener("touchend", y, false), k = false, t.confirm && t.confirm(parseInt(f.toString()), () => {
          a();
        }), x.cancelBubble = true, x.preventDefault());
      };
      s.value.addEventListener("mousemove", S, false), s.value.addEventListener("touchmove", S, { passive: false }), s.value.addEventListener("mouseup", y, false), s.value.addEventListener("mouseout", y, false), s.value.addEventListener("touchend", y, false);
    },
    closeEvent: (u) => (t && t.close && t.close(), a(), u.cancelBubble = true, u.preventDefault(), false),
    refreshEvent: (u) => (t && t.refresh && t.refresh(), a(), u.cancelBubble = true, u.preventDefault(), false)
  };
}
var Oe = { class: "gc-header" };
var Qe = { class: "gc-icon-block" };
var Ue = { class: "gc-loading" };
var Ze = ["src"];
var Re = createBaseVNode("div", { class: "gc-round" }, null, -1);
var et = { class: "gc-thumb gc-rotate-thumb" };
var tt = ["src"];
var nt = { class: "gc-footer" };
var ct = createBaseVNode("div", { class: "gc-drag-line" }, null, -1);
var O = defineComponent({
  __name: "index",
  props: {
    config: { default: te },
    events: { default: () => ({}) },
    data: { default: () => ({}) }
  },
  setup(l) {
    const t = l, { data: n, events: s } = t, e = ref({
      ...te(),
      ...t.config
    });
    watch(() => t.config, () => {
      e.value = {
        ...e.value,
        ...t.config
      };
    });
    const a = ref(null), d = ref(null), o = Ke(n, s, d, a), E = computed(() => {
      const r = e.value.horizontalPadding || 0, h = e.value.verticalPadding || 0;
      return {
        width: (e.value.width || 0) + r * 2 + (e.value.showTheme ? 2 : 0) + "px",
        paddingLeft: r + "px",
        paddingRight: r + "px",
        paddingTop: h + "px",
        paddingBottom: h + "px"
      };
    }), u = computed(() => ({
      transform: `rotate(${o.state.thumbAngle}deg)`
    })), g = computed(() => {
      var h;
      const r = (((h = e.value) == null ? void 0 : h.size) || 0) > 0 ? e.value.size : te().size;
      return {
        width: r + "px",
        height: r + "px"
      };
    });
    return onMounted(async () => {
      await nextTick(), d.value && d.value.addEventListener("dragstart", (r) => r.preventDefault());
    }), (r, h) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(`go-captcha gc-wrapper ${e.value.showTheme ? "gc-theme" : ""}`),
      style: normalizeStyle(E.value)
    }, [
      createBaseVNode("div", Oe, [
        createBaseVNode("span", null, toDisplayString(e.value.title), 1),
        createBaseVNode("div", Qe, [
          createVNode(Z, {
            width: 22,
            height: 22,
            onClick: unref(o).closeEvent
          }, null, 8, ["onClick"]),
          createVNode(R, {
            width: 22,
            height: 22,
            onClick: unref(o).refreshEvent
          }, null, 8, ["onClick"])
        ])
      ]),
      createBaseVNode("div", {
        class: "gc-body gc-rotate-body",
        ref: "containerRef",
        style: normalizeStyle(g.value)
      }, [
        createBaseVNode("div", Ue, [
          createVNode(ee)
        ]),
        createBaseVNode("div", {
          class: "gc-picture gc-rotate-picture",
          style: normalizeStyle(g.value)
        }, [
          withDirectives(createBaseVNode("img", {
            src: unref(n).image,
            alt: "..."
          }, null, 8, Ze), [
            [vShow, unref(n).image !== ""]
          ]),
          Re
        ], 4),
        createBaseVNode("div", et, [
          createBaseVNode("div", {
            class: "gc-rotate-thumb-block",
            style: normalizeStyle(u.value)
          }, [
            withDirectives(createBaseVNode("img", {
              src: unref(n).thumb,
              alt: "..."
            }, null, 8, tt), [
              [vShow, unref(n).thumb !== ""]
            ])
          ], 4)
        ])
      ], 4),
      createBaseVNode("div", nt, [
        createBaseVNode("div", {
          class: "gc-drag-slide-bar",
          ref_key: "dragBarRef",
          ref: a,
          onMousedown: h[1] || (h[1] = //@ts-ignore
          (..._) => unref(o).dragEvent && unref(o).dragEvent(..._))
        }, [
          ct,
          createBaseVNode("div", {
            class: "gc-drag-block",
            ref_key: "dragBlockRef",
            ref: d,
            onTouchstart: h[0] || (h[0] = //@ts-ignore
            (..._) => unref(o).dragEvent && unref(o).dragEvent(..._)),
            style: normalizeStyle({ left: unref(o).state.dragLeft + "px" })
          }, [
            createVNode(ue)
          ], 36)
        ], 544)
      ])
    ], 6));
  }
});
O.name = "gocaptcha-rotate";
O.install = function(l) {
  l.component("gocaptcha-rotate", O);
};
var st = createBaseVNode("circle", {
  fill: "#3E7CFF",
  cx: "100",
  cy: "100",
  r: "96.3"
}, null, -1);
var lt = createBaseVNode("path", {
  fill: "#FFFFFF",
  d: `M140.8,64.4l-39.6-11.9h-2.4L59.2,64.4c-1.6,0.8-2.8,2.4-2.8,4v24.1c0,25.3,15.8,45.9,42.3,54.6
	c0.4,0,0.8,0.4,1.2,0.4c0.4,0,0.8,0,1.2-0.4c26.5-8.7,42.3-28.9,42.3-54.6V68.3C143.5,66.8,142.3,65.2,140.8,64.4z`
}, null, -1);
var ot = [
  st,
  lt
];
var it = defineComponent({
  __name: "btn-default-icon",
  emits: ["click"],
  setup(l, { emit: t }) {
    const n = t;
    function s(e) {
      n("click", e);
    }
    return (e, a) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 200 200",
      width: "20",
      height: "20"
    }, e.$attrs, { onClick: s }), ot, 16));
  }
});
var at = createBaseVNode("path", {
  fill: "#FFA000",
  d: `M184,26.6L102.4,2.1h-4.9L16,26.6c-3.3,1.6-5.7,4.9-5.7,8.2v49.8c0,52.2,32.6,94.7,87.3,112.6
	c0.8,0,1.6,0.8,2.4,0.8s1.6,0,2.4-0.8c54.7-18,87.3-59.6,87.3-112.6V34.7C189.8,31.5,187.3,28.2,184,26.6z M107.3,109.1
	c-0.5,5.4-3.9,7.9-7.3,7.9c-2.5,0,0,0,0,0c-3.2-0.6-5.7-2-6.8-7.4l-4.4-50.9c0-5.1,6.2-9.7,11.5-9.7c5.3,0,11,4.7,11,9.9
	L107.3,109.1z M109.3,133.3c0,5.1-4.2,9.3-9.3,9.3c-5.1,0-9.3-4.2-9.3-9.3c0-5.1,4.2-9.3,9.3-9.3C105.1,124,109.3,128.1,109.3,133.3
	z`
}, null, -1);
var ut = [
  at
];
var rt = defineComponent({
  __name: "btn-warn-icon",
  emits: ["click"],
  setup(l, { emit: t }) {
    const n = t;
    function s(e) {
      n("click", e);
    }
    return (e, a) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 200 200",
      width: "20",
      height: "20"
    }, e.$attrs, { onClick: s }), ut, 16));
  }
});
var dt = createBaseVNode("path", {
  fill: "#ED4630",
  d: `M184,26.6L102.4,2.1h-4.9L16,26.6c-3.3,1.6-5.7,4.9-5.7,8.2v49.8c0,52.2,32.6,94.7,87.3,112.6
	c0.8,0,1.6,0.8,2.4,0.8s1.6,0,2.4-0.8c54.7-18,87.3-59.6,87.3-112.6V34.7C189.8,31.5,187.3,28.2,184,26.6z M134.5,123.1
	c3.1,3.1,3.1,8.2,0,11.3c-1.6,1.6-3.6,2.3-5.7,2.3s-4.1-0.8-5.7-2.3L100,111.3l-23.1,23.1c-1.6,1.6-3.6,2.3-5.7,2.3
	c-2,0-4.1-0.8-5.7-2.3c-3.1-3.1-3.1-8.2,0-11.3L88.7,100L65.5,76.9c-3.1-3.1-3.1-8.2,0-11.3c3.1-3.1,8.2-3.1,11.3,0L100,88.7
	l23.1-23.1c3.1-3.1,8.2-3.1,11.3,0c3.1,3.1,3.1,8.2,0,11.3L111.3,100L134.5,123.1z`
}, null, -1);
var ht = [
  dt
];
var vt = defineComponent({
  __name: "btn-error-icon",
  emits: ["click"],
  setup(l, { emit: t }) {
    const n = t;
    function s(e) {
      n("click", e);
    }
    return (e, a) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 200 200",
      width: "20",
      height: "20"
    }, e.$attrs, { onClick: s }), ht, 16));
  }
});
var gt = createBaseVNode("path", {
  fill: "#5EAA2F",
  d: `M183.3,27.2L102.4,2.9h-4.9L16.7,27.2C13.4,28.8,11,32,11,35.3v49.4c0,51.8,32.4,93.9,86.6,111.7
	c0.8,0,1.6,0.8,2.4,0.8c0.8,0,1.6,0,2.4-0.8c54.2-17.8,86.6-59.1,86.6-111.7V35.3C189,32,186.6,28.8,183.3,27.2z M146.1,81.4
	l-48.5,48.5c-1.6,1.6-3.2,2.4-5.7,2.4c-2.4,0-4-0.8-5.7-2.4L62,105.7c-3.2-3.2-3.2-8.1,0-11.3c3.2-3.2,8.1-3.2,11.3,0l18.6,18.6
	l42.9-42.9c3.2-3.2,8.1-3.2,11.3,0C149.4,73.3,149.4,78.2,146.1,81.4L146.1,81.4z`
}, null, -1);
var ft = [
  gt
];
var pt = defineComponent({
  __name: "btn-success-icon",
  emits: ["click"],
  setup(l, { emit: t }) {
    const n = t;
    function s(e) {
      n("click", e);
    }
    return (e, a) => (openBlock(), createElementBlock("svg", mergeProps({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 200 200",
      width: "20",
      height: "20"
    }, e.$attrs, { onClick: s }), ft, 16));
  }
});
var ae = () => ({
  width: 330,
  height: 44,
  verticalPadding: 12,
  horizontalPadding: 16
});
var Q = defineComponent({
  __name: "index",
  props: {
    config: { default: ae },
    clickEvent: {},
    disabled: { type: Boolean, default: false },
    type: { default: "default" },
    title: { default: "点击按键进行验证" }
  },
  emits: ["click-event"],
  setup(l, { emit: t }) {
    const n = l, { type: s, title: e, disabled: a } = toRefs(n), d = ref({
      ...ae(),
      ...n.config
    });
    watch(() => n.config, () => {
      d.value = {
        ...d.value,
        ...n.config
      };
    });
    const o = computed(() => ["go-captcha", "gc-btn-block", `gc-${s.value}`, a.value ? "gc-disabled" : ""]), E = computed(() => ({
      width: d.value.width + "px",
      height: d.value.height + "px",
      paddingLeft: d.value.horizontalPadding + "px",
      paddingRight: d.value.horizontalPadding + "px",
      paddingTop: d.value.verticalPadding + "px",
      paddingBottom: d.value.verticalPadding + "px"
    })), u = t;
    function g(r) {
      u("click-event", r);
    }
    return (r, h) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(o.value),
      style: normalizeStyle(E.value),
      onClick: g
    }, [
      createBaseVNode("div", {
        class: normalizeClass(unref(s) === "default" ? "gc-ripple" : "")
      }, [
        unref(s) === "default" ? (openBlock(), createBlock(it, { key: 0 })) : unref(s) === "warn" ? (openBlock(), createBlock(rt, { key: 1 })) : unref(s) === "error" ? (openBlock(), createBlock(vt, { key: 2 })) : unref(s) === "success" ? (openBlock(), createBlock(pt, { key: 3 })) : createCommentVNode("", true)
      ], 2),
      createBaseVNode("span", null, toDisplayString(unref(e)), 1)
    ], 6));
  }
});
Q.name = "gocaptcha-button";
Q.install = function(l) {
  l.component("gocaptcha-button", Q);
};
var _t = (l) => {
  l.installed || (l.installed = true, [G, J, K, O, Q].map((t) => l.use(t)));
};
export {
  Q as Button,
  G as Click,
  O as Rotate,
  J as Slide,
  K as SlideRegion,
  _t as default
};
//# sourceMappingURL=go-captcha-vue.js.map
