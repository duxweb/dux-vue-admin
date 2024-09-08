import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  isProxy,
  isRef,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs,
  unref,
  watch
} from "./chunk-4ROYU34L.js";
import "./chunk-G3PMV62Z.js";

// node_modules/vue-draggable-plus/dist/vue-draggable-plus.js
var rn = Object.defineProperty;
var Ne = Object.getOwnPropertySymbols;
var vt = Object.prototype.hasOwnProperty;
var bt = Object.prototype.propertyIsEnumerable;
var mt = (t, e, n) => e in t ? rn(t, e, { enumerable: true, configurable: true, writable: true, value: n }) : t[e] = n;
var ue = (t, e) => {
  for (var n in e || (e = {}))
    vt.call(e, n) && mt(t, n, e[n]);
  if (Ne)
    for (var n of Ne(e))
      bt.call(e, n) && mt(t, n, e[n]);
  return t;
};
var Ve = (t, e) => {
  var n = {};
  for (var o in t)
    vt.call(t, o) && e.indexOf(o) < 0 && (n[o] = t[o]);
  if (t != null && Ne)
    for (var o of Ne(t))
      e.indexOf(o) < 0 && bt.call(t, o) && (n[o] = t[o]);
  return n;
};
var Bt = "[vue-draggable-plus]: ";
function gn(t) {
  console.warn(Bt + t);
}
function mn(t) {
  console.error(Bt + t);
}
function wt(t, e, n) {
  return n >= 0 && n < t.length && t.splice(n, 0, t.splice(e, 1)[0]), t;
}
function vn(t) {
  return t.replace(/-(\w)/g, (e, n) => n ? n.toUpperCase() : "");
}
function bn(t) {
  return Object.keys(t).reduce((e, n) => (typeof t[n] != "undefined" && (e[vn(n)] = t[n]), e), {});
}
function Et(t, e) {
  return Array.isArray(t) && t.splice(e, 1), t;
}
function St(t, e, n) {
  return Array.isArray(t) && t.splice(e, 0, n), t;
}
function yn(t) {
  return typeof t == "undefined";
}
function wn(t) {
  return typeof t == "string";
}
function Dt(t, e, n) {
  const o = t.children[n];
  t.insertBefore(e, o);
}
function qe(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function En(t, e = document) {
  var o;
  let n = null;
  return typeof (e == null ? void 0 : e.querySelector) == "function" ? n = (o = e == null ? void 0 : e.querySelector) == null ? void 0 : o.call(e, t) : n = document.querySelector(t), n || gn(`Element not found: ${t}`), n;
}
function Sn(t, e, n = null) {
  return function(...o) {
    return t.apply(n, o), e.apply(n, o);
  };
}
function Dn(t, e) {
  const n = ue({}, t);
  return Object.keys(e).forEach((o) => {
    n[o] ? n[o] = Sn(t[o], e[o]) : n[o] = e[o];
  }), n;
}
function _n(t) {
  return t instanceof HTMLElement;
}
function _t(t, e) {
  Object.keys(t).forEach((n) => {
    e(n, t[n]);
  });
}
function Tn(t) {
  return t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && // uppercase letter
  (t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97);
}
var Cn = Object.assign;
function Tt(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    e && (o = o.filter(function(r) {
      return Object.getOwnPropertyDescriptor(t, r).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function te(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Tt(Object(n), true).forEach(function(o) {
      On(t, o, n[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Tt(Object(n)).forEach(function(o) {
      Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
    });
  }
  return t;
}
function Xe(t) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Xe = function(e) {
    return typeof e;
  } : Xe = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Xe(t);
}
function On(t, e, n) {
  return e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: true,
    configurable: true,
    writable: true
  }) : t[e] = n, t;
}
function oe() {
  return oe = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var o in n)
        Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
    }
    return t;
  }, oe.apply(this, arguments);
}
function In(t, e) {
  if (t == null)
    return {};
  var n = {}, o = Object.keys(t), r, i;
  for (i = 0; i < o.length; i++)
    r = o[i], !(e.indexOf(r) >= 0) && (n[r] = t[r]);
  return n;
}
function An(t, e) {
  if (t == null)
    return {};
  var n = In(t, e), o, r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (r = 0; r < i.length; r++)
      o = i[r], !(e.indexOf(o) >= 0) && Object.prototype.propertyIsEnumerable.call(t, o) && (n[o] = t[o]);
  }
  return n;
}
var xn = "1.15.2";
function ne(t) {
  if (typeof window != "undefined" && window.navigator)
    return !!navigator.userAgent.match(t);
}
var re = ne(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var Ie = ne(/Edge/i);
var Ct = ne(/firefox/i);
var De = ne(/safari/i) && !ne(/chrome/i) && !ne(/android/i);
var kt = ne(/iP(ad|od|hone)/i);
var Ht = ne(/chrome/i) && ne(/android/i);
var Lt = {
  capture: false,
  passive: false
};
function S(t, e, n) {
  t.addEventListener(e, n, !re && Lt);
}
function E(t, e, n) {
  t.removeEventListener(e, n, !re && Lt);
}
function Le(t, e) {
  if (e) {
    if (e[0] === ">" && (e = e.substring(1)), t)
      try {
        if (t.matches)
          return t.matches(e);
        if (t.msMatchesSelector)
          return t.msMatchesSelector(e);
        if (t.webkitMatchesSelector)
          return t.webkitMatchesSelector(e);
      } catch (n) {
        return false;
      }
    return false;
  }
}
function Nn(t) {
  return t.host && t !== document && t.host.nodeType ? t.host : t.parentNode;
}
function J(t, e, n, o) {
  if (t) {
    n = n || document;
    do {
      if (e != null && (e[0] === ">" ? t.parentNode === n && Le(t, e) : Le(t, e)) || o && t === n)
        return t;
      if (t === n)
        break;
    } while (t = Nn(t));
  }
  return null;
}
var Ot = /\s+/g;
function j(t, e, n) {
  if (t && e)
    if (t.classList)
      t.classList[n ? "add" : "remove"](e);
    else {
      var o = (" " + t.className + " ").replace(Ot, " ").replace(" " + e + " ", " ");
      t.className = (o + (n ? " " + e : "")).replace(Ot, " ");
    }
}
function h2(t, e, n) {
  var o = t && t.style;
  if (o) {
    if (n === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "") : t.currentStyle && (n = t.currentStyle), e === void 0 ? n : n[e];
    !(e in o) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), o[e] = n + (typeof n == "string" ? "" : "px");
  }
}
function ve(t, e) {
  var n = "";
  if (typeof t == "string")
    n = t;
  else
    do {
      var o = h2(t, "transform");
      o && o !== "none" && (n = o + " " + n);
    } while (!e && (t = t.parentNode));
  var r = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return r && new r(n);
}
function Wt(t, e, n) {
  if (t) {
    var o = t.getElementsByTagName(e), r = 0, i = o.length;
    if (n)
      for (; r < i; r++)
        n(o[r], r);
    return o;
  }
  return [];
}
function ee() {
  var t = document.scrollingElement;
  return t || document.documentElement;
}
function x(t, e, n, o, r) {
  if (!(!t.getBoundingClientRect && t !== window)) {
    var i, a, l, s, u, d, f;
    if (t !== window && t.parentNode && t !== ee() ? (i = t.getBoundingClientRect(), a = i.top, l = i.left, s = i.bottom, u = i.right, d = i.height, f = i.width) : (a = 0, l = 0, s = window.innerHeight, u = window.innerWidth, d = window.innerHeight, f = window.innerWidth), (e || n) && t !== window && (r = r || t.parentNode, !re))
      do
        if (r && r.getBoundingClientRect && (h2(r, "transform") !== "none" || n && h2(r, "position") !== "static")) {
          var m = r.getBoundingClientRect();
          a -= m.top + parseInt(h2(r, "border-top-width")), l -= m.left + parseInt(h2(r, "border-left-width")), s = a + i.height, u = l + i.width;
          break;
        }
      while (r = r.parentNode);
    if (o && t !== window) {
      var y = ve(r || t), b = y && y.a, w = y && y.d;
      y && (a /= w, l /= b, f /= b, d /= w, s = a + d, u = l + f);
    }
    return {
      top: a,
      left: l,
      bottom: s,
      right: u,
      width: f,
      height: d
    };
  }
}
function It(t, e, n) {
  for (var o = le(t, true), r = x(t)[e]; o; ) {
    var i = x(o)[n], a = void 0;
    if (a = r >= i, !a)
      return o;
    if (o === ee())
      break;
    o = le(o, false);
  }
  return false;
}
function be(t, e, n, o) {
  for (var r = 0, i = 0, a = t.children; i < a.length; ) {
    if (a[i].style.display !== "none" && a[i] !== p.ghost && (o || a[i] !== p.dragged) && J(a[i], n.draggable, t, false)) {
      if (r === e)
        return a[i];
      r++;
    }
    i++;
  }
  return null;
}
function dt(t, e) {
  for (var n = t.lastElementChild; n && (n === p.ghost || h2(n, "display") === "none" || e && !Le(n, e)); )
    n = n.previousElementSibling;
  return n || null;
}
function q(t, e) {
  var n = 0;
  if (!t || !t.parentNode)
    return -1;
  for (; t = t.previousElementSibling; )
    t.nodeName.toUpperCase() !== "TEMPLATE" && t !== p.clone && (!e || Le(t, e)) && n++;
  return n;
}
function At(t) {
  var e = 0, n = 0, o = ee();
  if (t)
    do {
      var r = ve(t), i = r.a, a = r.d;
      e += t.scrollLeft * i, n += t.scrollTop * a;
    } while (t !== o && (t = t.parentNode));
  return [e, n];
}
function Pn(t, e) {
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      for (var o in e)
        if (e.hasOwnProperty(o) && e[o] === t[n][o])
          return Number(n);
    }
  return -1;
}
function le(t, e) {
  if (!t || !t.getBoundingClientRect)
    return ee();
  var n = t, o = false;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var r = h2(n);
      if (n.clientWidth < n.scrollWidth && (r.overflowX == "auto" || r.overflowX == "scroll") || n.clientHeight < n.scrollHeight && (r.overflowY == "auto" || r.overflowY == "scroll")) {
        if (!n.getBoundingClientRect || n === document.body)
          return ee();
        if (o || e)
          return n;
        o = true;
      }
    }
  while (n = n.parentNode);
  return ee();
}
function Mn(t, e) {
  if (t && e)
    for (var n in e)
      e.hasOwnProperty(n) && (t[n] = e[n]);
  return t;
}
function Ke(t, e) {
  return Math.round(t.top) === Math.round(e.top) && Math.round(t.left) === Math.round(e.left) && Math.round(t.height) === Math.round(e.height) && Math.round(t.width) === Math.round(e.width);
}
var _e;
function Gt(t, e) {
  return function() {
    if (!_e) {
      var n = arguments, o = this;
      n.length === 1 ? t.call(o, n[0]) : t.apply(o, n), _e = setTimeout(function() {
        _e = void 0;
      }, e);
    }
  };
}
function Fn() {
  clearTimeout(_e), _e = void 0;
}
function jt(t, e, n) {
  t.scrollLeft += e, t.scrollTop += n;
}
function zt(t) {
  var e = window.Polymer, n = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(t).cloneNode(true) : n ? n(t).clone(true)[0] : t.cloneNode(true);
}
function Ut(t, e, n) {
  var o = {};
  return Array.from(t.children).forEach(function(r) {
    var i, a, l, s;
    if (!(!J(r, e.draggable, t, false) || r.animated || r === n)) {
      var u = x(r);
      o.left = Math.min((i = o.left) !== null && i !== void 0 ? i : 1 / 0, u.left), o.top = Math.min((a = o.top) !== null && a !== void 0 ? a : 1 / 0, u.top), o.right = Math.max((l = o.right) !== null && l !== void 0 ? l : -1 / 0, u.right), o.bottom = Math.max((s = o.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom);
    }
  }), o.width = o.right - o.left, o.height = o.bottom - o.top, o.x = o.left, o.y = o.top, o;
}
var U = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function Rn() {
  var t = [], e;
  return {
    captureAnimationState: function() {
      if (t = [], !!this.options.animation) {
        var o = [].slice.call(this.el.children);
        o.forEach(function(r) {
          if (!(h2(r, "display") === "none" || r === p.ghost)) {
            t.push({
              target: r,
              rect: x(r)
            });
            var i = te({}, t[t.length - 1].rect);
            if (r.thisAnimationDuration) {
              var a = ve(r, true);
              a && (i.top -= a.f, i.left -= a.e);
            }
            r.fromRect = i;
          }
        });
      }
    },
    addAnimationState: function(o) {
      t.push(o);
    },
    removeAnimationState: function(o) {
      t.splice(Pn(t, {
        target: o
      }), 1);
    },
    animateAll: function(o) {
      var r = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof o == "function" && o();
        return;
      }
      var i = false, a = 0;
      t.forEach(function(l) {
        var s = 0, u = l.target, d = u.fromRect, f = x(u), m = u.prevFromRect, y = u.prevToRect, b = l.rect, w = ve(u, true);
        w && (f.top -= w.f, f.left -= w.e), u.toRect = f, u.thisAnimationDuration && Ke(m, f) && !Ke(d, f) && // Make sure animatingRect is on line between toRect & fromRect
        (b.top - f.top) / (b.left - f.left) === (d.top - f.top) / (d.left - f.left) && (s = Yn(b, m, y, r.options)), Ke(f, d) || (u.prevFromRect = d, u.prevToRect = f, s || (s = r.options.animation), r.animate(u, b, f, s)), s && (i = true, a = Math.max(a, s), clearTimeout(u.animationResetTimer), u.animationResetTimer = setTimeout(function() {
          u.animationTime = 0, u.prevFromRect = null, u.fromRect = null, u.prevToRect = null, u.thisAnimationDuration = null;
        }, s), u.thisAnimationDuration = s);
      }), clearTimeout(e), i ? e = setTimeout(function() {
        typeof o == "function" && o();
      }, a) : typeof o == "function" && o(), t = [];
    },
    animate: function(o, r, i, a) {
      if (a) {
        h2(o, "transition", ""), h2(o, "transform", "");
        var l = ve(this.el), s = l && l.a, u = l && l.d, d = (r.left - i.left) / (s || 1), f = (r.top - i.top) / (u || 1);
        o.animatingX = !!d, o.animatingY = !!f, h2(o, "transform", "translate3d(" + d + "px," + f + "px,0)"), this.forRepaintDummy = Xn(o), h2(o, "transition", "transform " + a + "ms" + (this.options.easing ? " " + this.options.easing : "")), h2(o, "transform", "translate3d(0,0,0)"), typeof o.animated == "number" && clearTimeout(o.animated), o.animated = setTimeout(function() {
          h2(o, "transition", ""), h2(o, "transform", ""), o.animated = false, o.animatingX = false, o.animatingY = false;
        }, a);
      }
    }
  };
}
function Xn(t) {
  return t.offsetWidth;
}
function Yn(t, e, n, o) {
  return Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) / Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2)) * o.animation;
}
var he = [];
var Je = {
  initializeByDefault: true
};
var Ae = {
  mount: function(e) {
    for (var n in Je)
      Je.hasOwnProperty(n) && !(n in e) && (e[n] = Je[n]);
    he.forEach(function(o) {
      if (o.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), he.push(e);
  },
  pluginEvent: function(e, n, o) {
    var r = this;
    this.eventCanceled = false, o.cancel = function() {
      r.eventCanceled = true;
    };
    var i = e + "Global";
    he.forEach(function(a) {
      n[a.pluginName] && (n[a.pluginName][i] && n[a.pluginName][i](te({
        sortable: n
      }, o)), n.options[a.pluginName] && n[a.pluginName][e] && n[a.pluginName][e](te({
        sortable: n
      }, o)));
    });
  },
  initializePlugins: function(e, n, o, r) {
    he.forEach(function(l) {
      var s = l.pluginName;
      if (!(!e.options[s] && !l.initializeByDefault)) {
        var u = new l(e, n, e.options);
        u.sortable = e, u.options = e.options, e[s] = u, oe(o, u.defaults);
      }
    });
    for (var i in e.options)
      if (e.options.hasOwnProperty(i)) {
        var a = this.modifyOption(e, i, e.options[i]);
        typeof a != "undefined" && (e.options[i] = a);
      }
  },
  getEventProperties: function(e, n) {
    var o = {};
    return he.forEach(function(r) {
      typeof r.eventProperties == "function" && oe(o, r.eventProperties.call(n[r.pluginName], e));
    }), o;
  },
  modifyOption: function(e, n, o) {
    var r;
    return he.forEach(function(i) {
      e[i.pluginName] && i.optionListeners && typeof i.optionListeners[n] == "function" && (r = i.optionListeners[n].call(e[i.pluginName], o));
    }), r;
  }
};
function Bn(t) {
  var e = t.sortable, n = t.rootEl, o = t.name, r = t.targetEl, i = t.cloneEl, a = t.toEl, l = t.fromEl, s = t.oldIndex, u = t.newIndex, d = t.oldDraggableIndex, f = t.newDraggableIndex, m = t.originalEvent, y = t.putSortable, b = t.extraEventProperties;
  if (e = e || n && n[U], !!e) {
    var w, F = e.options, X = "on" + o.charAt(0).toUpperCase() + o.substr(1);
    window.CustomEvent && !re && !Ie ? w = new CustomEvent(o, {
      bubbles: true,
      cancelable: true
    }) : (w = document.createEvent("Event"), w.initEvent(o, true, true)), w.to = a || n, w.from = l || n, w.item = r || n, w.clone = i, w.oldIndex = s, w.newIndex = u, w.oldDraggableIndex = d, w.newDraggableIndex = f, w.originalEvent = m, w.pullMode = y ? y.lastPutMode : void 0;
    var _ = te(te({}, b), Ae.getEventProperties(o, e));
    for (var H in _)
      w[H] = _[H];
    n && n.dispatchEvent(w), F[X] && F[X].call(e, w);
  }
}
var kn = ["evt"];
var k = function(e, n) {
  var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = o.evt, i = An(o, kn);
  Ae.pluginEvent.bind(p)(e, n, te({
    dragEl: c,
    parentEl: I,
    ghostEl: g,
    rootEl: C,
    nextEl: de,
    lastDownEl: Ye,
    cloneEl: O,
    cloneHidden: ae,
    dragStarted: we,
    putSortable: M,
    activeSortable: p.active,
    originalEvent: r,
    oldIndex: me,
    oldDraggableIndex: Te,
    newIndex: z,
    newDraggableIndex: ie,
    hideGhostForTarget: Kt,
    unhideGhostForTarget: Jt,
    cloneNowHidden: function() {
      ae = true;
    },
    cloneNowShown: function() {
      ae = false;
    },
    dispatchSortableEvent: function(l) {
      B({
        sortable: n,
        name: l,
        originalEvent: r
      });
    }
  }, i));
};
function B(t) {
  Bn(te({
    putSortable: M,
    cloneEl: O,
    targetEl: c,
    rootEl: C,
    oldIndex: me,
    oldDraggableIndex: Te,
    newIndex: z,
    newDraggableIndex: ie
  }, t));
}
var c;
var I;
var g;
var C;
var de;
var Ye;
var O;
var ae;
var me;
var z;
var Te;
var ie;
var Pe;
var M;
var ge = false;
var We = false;
var Ge = [];
var ce;
var K;
var Ze;
var Qe;
var xt;
var Nt;
var we;
var pe;
var Ce;
var Oe = false;
var Me = false;
var Be;
var R;
var et = [];
var at = false;
var je = [];
var Ue = typeof document != "undefined";
var Fe = kt;
var Pt = Ie || re ? "cssFloat" : "float";
var Hn = Ue && !Ht && !kt && "draggable" in document.createElement("div");
var Vt = function() {
  if (Ue) {
    if (re)
      return false;
    var t = document.createElement("x");
    return t.style.cssText = "pointer-events:auto", t.style.pointerEvents === "auto";
  }
}();
var $t = function(e, n) {
  var o = h2(e), r = parseInt(o.width) - parseInt(o.paddingLeft) - parseInt(o.paddingRight) - parseInt(o.borderLeftWidth) - parseInt(o.borderRightWidth), i = be(e, 0, n), a = be(e, 1, n), l = i && h2(i), s = a && h2(a), u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + x(i).width, d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + x(a).width;
  if (o.display === "flex")
    return o.flexDirection === "column" || o.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (o.display === "grid")
    return o.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (i && l.float && l.float !== "none") {
    var f = l.float === "left" ? "left" : "right";
    return a && (s.clear === "both" || s.clear === f) ? "vertical" : "horizontal";
  }
  return i && (l.display === "block" || l.display === "flex" || l.display === "table" || l.display === "grid" || u >= r && o[Pt] === "none" || a && o[Pt] === "none" && u + d > r) ? "vertical" : "horizontal";
};
var Ln = function(e, n, o) {
  var r = o ? e.left : e.top, i = o ? e.right : e.bottom, a = o ? e.width : e.height, l = o ? n.left : n.top, s = o ? n.right : n.bottom, u = o ? n.width : n.height;
  return r === l || i === s || r + a / 2 === l + u / 2;
};
var Wn = function(e, n) {
  var o;
  return Ge.some(function(r) {
    var i = r[U].options.emptyInsertThreshold;
    if (!(!i || dt(r))) {
      var a = x(r), l = e >= a.left - i && e <= a.right + i, s = n >= a.top - i && n <= a.bottom + i;
      if (l && s)
        return o = r;
    }
  }), o;
};
var qt = function(e) {
  function n(i, a) {
    return function(l, s, u, d) {
      var f = l.options.group.name && s.options.group.name && l.options.group.name === s.options.group.name;
      if (i == null && (a || f))
        return true;
      if (i == null || i === false)
        return false;
      if (a && i === "clone")
        return i;
      if (typeof i == "function")
        return n(i(l, s, u, d), a)(l, s, u, d);
      var m = (a ? l : s).options.group.name;
      return i === true || typeof i == "string" && i === m || i.join && i.indexOf(m) > -1;
    };
  }
  var o = {}, r = e.group;
  (!r || Xe(r) != "object") && (r = {
    name: r
  }), o.name = r.name, o.checkPull = n(r.pull, true), o.checkPut = n(r.put), o.revertClone = r.revertClone, e.group = o;
};
var Kt = function() {
  !Vt && g && h2(g, "display", "none");
};
var Jt = function() {
  !Vt && g && h2(g, "display", "");
};
Ue && !Ht && document.addEventListener("click", function(t) {
  if (We)
    return t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), We = false, false;
}, true);
var fe = function(e) {
  if (c) {
    e = e.touches ? e.touches[0] : e;
    var n = Wn(e.clientX, e.clientY);
    if (n) {
      var o = {};
      for (var r in e)
        e.hasOwnProperty(r) && (o[r] = e[r]);
      o.target = o.rootEl = n, o.preventDefault = void 0, o.stopPropagation = void 0, n[U]._onDragOver(o);
    }
  }
};
var Gn = function(e) {
  c && c.parentNode[U]._isOutsideThisEl(e.target);
};
function p(t, e) {
  if (!(t && t.nodeType && t.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));
  this.el = t, this.options = e = oe({}, e), t[U] = this;
  var n = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(t.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: false,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: true,
    direction: function() {
      return $t(t, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function(a, l) {
      a.setData("Text", l.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: p.supportPointer !== false && "PointerEvent" in window && !De,
    emptyInsertThreshold: 5
  };
  Ae.initializePlugins(this, t, n);
  for (var o in n)
    !(o in e) && (e[o] = n[o]);
  qt(e);
  for (var r in this)
    r.charAt(0) === "_" && typeof this[r] == "function" && (this[r] = this[r].bind(this));
  this.nativeDraggable = e.forceFallback ? false : Hn, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? S(t, "pointerdown", this._onTapStart) : (S(t, "mousedown", this._onTapStart), S(t, "touchstart", this._onTapStart)), this.nativeDraggable && (S(t, "dragover", this), S(t, "dragenter", this)), Ge.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), oe(this, Rn());
}
p.prototype = /** @lends Sortable.prototype */
{
  constructor: p,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (pe = null);
  },
  _getDirection: function(e, n) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, n, c) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var n = this, o = this.el, r = this.options, i = r.preventOnFilter, a = e.type, l = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, s = (l || e).target, u = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || s, d = r.filter;
      if (Jn(o), !c && !(/mousedown|pointerdown/.test(a) && e.button !== 0 || r.disabled) && !u.isContentEditable && !(!this.nativeDraggable && De && s && s.tagName.toUpperCase() === "SELECT") && (s = J(s, r.draggable, o, false), !(s && s.animated) && Ye !== s)) {
        if (me = q(s), Te = q(s, r.draggable), typeof d == "function") {
          if (d.call(this, e, s, this)) {
            B({
              sortable: n,
              rootEl: u,
              name: "filter",
              targetEl: s,
              toEl: o,
              fromEl: o
            }), k("filter", n, {
              evt: e
            }), i && e.cancelable && e.preventDefault();
            return;
          }
        } else if (d && (d = d.split(",").some(function(f) {
          if (f = J(u, f.trim(), o, false), f)
            return B({
              sortable: n,
              rootEl: f,
              name: "filter",
              targetEl: s,
              fromEl: o,
              toEl: o
            }), k("filter", n, {
              evt: e
            }), true;
        }), d)) {
          i && e.cancelable && e.preventDefault();
          return;
        }
        r.handle && !J(u, r.handle, o, false) || this._prepareDragStart(e, l, s);
      }
    }
  },
  _prepareDragStart: function(e, n, o) {
    var r = this, i = r.el, a = r.options, l = i.ownerDocument, s;
    if (o && !c && o.parentNode === i) {
      var u = x(o);
      if (C = i, c = o, I = c.parentNode, de = c.nextSibling, Ye = o, Pe = a.group, p.dragged = c, ce = {
        target: c,
        clientX: (n || e).clientX,
        clientY: (n || e).clientY
      }, xt = ce.clientX - u.left, Nt = ce.clientY - u.top, this._lastX = (n || e).clientX, this._lastY = (n || e).clientY, c.style["will-change"] = "all", s = function() {
        if (k("delayEnded", r, {
          evt: e
        }), p.eventCanceled) {
          r._onDrop();
          return;
        }
        r._disableDelayedDragEvents(), !Ct && r.nativeDraggable && (c.draggable = true), r._triggerDragStart(e, n), B({
          sortable: r,
          name: "choose",
          originalEvent: e
        }), j(c, a.chosenClass, true);
      }, a.ignore.split(",").forEach(function(d) {
        Wt(c, d.trim(), tt);
      }), S(l, "dragover", fe), S(l, "mousemove", fe), S(l, "touchmove", fe), S(l, "mouseup", r._onDrop), S(l, "touchend", r._onDrop), S(l, "touchcancel", r._onDrop), Ct && this.nativeDraggable && (this.options.touchStartThreshold = 4, c.draggable = true), k("delayStart", this, {
        evt: e
      }), a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Ie || re))) {
        if (p.eventCanceled) {
          this._onDrop();
          return;
        }
        S(l, "mouseup", r._disableDelayedDrag), S(l, "touchend", r._disableDelayedDrag), S(l, "touchcancel", r._disableDelayedDrag), S(l, "mousemove", r._delayedDragTouchMoveHandler), S(l, "touchmove", r._delayedDragTouchMoveHandler), a.supportPointer && S(l, "pointermove", r._delayedDragTouchMoveHandler), r._dragStartTimer = setTimeout(s, a.delay);
      } else
        s();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var n = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    c && tt(c), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    E(e, "mouseup", this._disableDelayedDrag), E(e, "touchend", this._disableDelayedDrag), E(e, "touchcancel", this._disableDelayedDrag), E(e, "mousemove", this._delayedDragTouchMoveHandler), E(e, "touchmove", this._delayedDragTouchMoveHandler), E(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, n) {
    n = n || e.pointerType == "touch" && e, !this.nativeDraggable || n ? this.options.supportPointer ? S(document, "pointermove", this._onTouchMove) : n ? S(document, "touchmove", this._onTouchMove) : S(document, "mousemove", this._onTouchMove) : (S(c, "dragend", this), S(C, "dragstart", this._onDragStart));
    try {
      document.selection ? ke(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch (o) {
    }
  },
  _dragStarted: function(e, n) {
    if (ge = false, C && c) {
      k("dragStarted", this, {
        evt: n
      }), this.nativeDraggable && S(document, "dragover", Gn);
      var o = this.options;
      !e && j(c, o.dragClass, false), j(c, o.ghostClass, true), p.active = this, e && this._appendGhost(), B({
        sortable: this,
        name: "start",
        originalEvent: n
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (K) {
      this._lastX = K.clientX, this._lastY = K.clientY, Kt();
      for (var e = document.elementFromPoint(K.clientX, K.clientY), n = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(K.clientX, K.clientY), e !== n); )
        n = e;
      if (c.parentNode[U]._isOutsideThisEl(e), n)
        do {
          if (n[U]) {
            var o = void 0;
            if (o = n[U]._onDragOver({
              clientX: K.clientX,
              clientY: K.clientY,
              target: e,
              rootEl: n
            }), o && !this.options.dragoverBubble)
              break;
          }
          e = n;
        } while (n = n.parentNode);
      Jt();
    }
  },
  _onTouchMove: function(e) {
    if (ce) {
      var n = this.options, o = n.fallbackTolerance, r = n.fallbackOffset, i = e.touches ? e.touches[0] : e, a = g && ve(g, true), l = g && a && a.a, s = g && a && a.d, u = Fe && R && At(R), d = (i.clientX - ce.clientX + r.x) / (l || 1) + (u ? u[0] - et[0] : 0) / (l || 1), f = (i.clientY - ce.clientY + r.y) / (s || 1) + (u ? u[1] - et[1] : 0) / (s || 1);
      if (!p.active && !ge) {
        if (o && Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < o)
          return;
        this._onDragStart(e, true);
      }
      if (g) {
        a ? (a.e += d - (Ze || 0), a.f += f - (Qe || 0)) : a = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: d,
          f
        };
        var m = "matrix(".concat(a.a, ",").concat(a.b, ",").concat(a.c, ",").concat(a.d, ",").concat(a.e, ",").concat(a.f, ")");
        h2(g, "webkitTransform", m), h2(g, "mozTransform", m), h2(g, "msTransform", m), h2(g, "transform", m), Ze = d, Qe = f, K = i;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!g) {
      var e = this.options.fallbackOnBody ? document.body : C, n = x(c, true, Fe, true, e), o = this.options;
      if (Fe) {
        for (R = e; h2(R, "position") === "static" && h2(R, "transform") === "none" && R !== document; )
          R = R.parentNode;
        R !== document.body && R !== document.documentElement ? (R === document && (R = ee()), n.top += R.scrollTop, n.left += R.scrollLeft) : R = ee(), et = At(R);
      }
      g = c.cloneNode(true), j(g, o.ghostClass, false), j(g, o.fallbackClass, true), j(g, o.dragClass, true), h2(g, "transition", ""), h2(g, "transform", ""), h2(g, "box-sizing", "border-box"), h2(g, "margin", 0), h2(g, "top", n.top), h2(g, "left", n.left), h2(g, "width", n.width), h2(g, "height", n.height), h2(g, "opacity", "0.8"), h2(g, "position", Fe ? "absolute" : "fixed"), h2(g, "zIndex", "100000"), h2(g, "pointerEvents", "none"), p.ghost = g, e.appendChild(g), h2(g, "transform-origin", xt / parseInt(g.style.width) * 100 + "% " + Nt / parseInt(g.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, n) {
    var o = this, r = e.dataTransfer, i = o.options;
    if (k("dragStart", this, {
      evt: e
    }), p.eventCanceled) {
      this._onDrop();
      return;
    }
    k("setupClone", this), p.eventCanceled || (O = zt(c), O.removeAttribute("id"), O.draggable = false, O.style["will-change"] = "", this._hideClone(), j(O, this.options.chosenClass, false), p.clone = O), o.cloneId = ke(function() {
      k("clone", o), !p.eventCanceled && (o.options.removeCloneOnHide || C.insertBefore(O, c), o._hideClone(), B({
        sortable: o,
        name: "clone"
      }));
    }), !n && j(c, i.dragClass, true), n ? (We = true, o._loopId = setInterval(o._emulateDragOver, 50)) : (E(document, "mouseup", o._onDrop), E(document, "touchend", o._onDrop), E(document, "touchcancel", o._onDrop), r && (r.effectAllowed = "move", i.setData && i.setData.call(o, r, c)), S(document, "drop", o), h2(c, "transform", "translateZ(0)")), ge = true, o._dragStartId = ke(o._dragStarted.bind(o, n, e)), S(document, "selectstart", o), we = true, De && h2(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var n = this.el, o = e.target, r, i, a, l = this.options, s = l.group, u = p.active, d = Pe === s, f = l.sort, m = M || u, y, b = this, w = false;
    if (at)
      return;
    function F(ye, nn) {
      k(ye, b, te({
        evt: e,
        isOwner: d,
        axis: y ? "vertical" : "horizontal",
        revert: a,
        dragRect: r,
        targetRect: i,
        canSort: f,
        fromSortable: m,
        target: o,
        completed: _,
        onMove: function(gt, on) {
          return Re(C, n, c, r, gt, x(gt), e, on);
        },
        changed: H
      }, nn));
    }
    function X() {
      F("dragOverAnimationCapture"), b.captureAnimationState(), b !== m && m.captureAnimationState();
    }
    function _(ye) {
      return F("dragOverCompleted", {
        insertion: ye
      }), ye && (d ? u._hideClone() : u._showClone(b), b !== m && (j(c, M ? M.options.ghostClass : u.options.ghostClass, false), j(c, l.ghostClass, true)), M !== b && b !== p.active ? M = b : b === p.active && M && (M = null), m === b && (b._ignoreWhileAnimating = o), b.animateAll(function() {
        F("dragOverAnimationComplete"), b._ignoreWhileAnimating = null;
      }), b !== m && (m.animateAll(), m._ignoreWhileAnimating = null)), (o === c && !c.animated || o === n && !o.animated) && (pe = null), !l.dragoverBubble && !e.rootEl && o !== document && (c.parentNode[U]._isOutsideThisEl(e.target), !ye && fe(e)), !l.dragoverBubble && e.stopPropagation && e.stopPropagation(), w = true;
    }
    function H() {
      z = q(c), ie = q(c, l.draggable), B({
        sortable: b,
        name: "change",
        toEl: n,
        newIndex: z,
        newDraggableIndex: ie,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), o = J(o, l.draggable, n, true), F("dragOver"), p.eventCanceled)
      return w;
    if (c.contains(e.target) || o.animated && o.animatingX && o.animatingY || b._ignoreWhileAnimating === o)
      return _(false);
    if (We = false, u && !l.disabled && (d ? f || (a = I !== C) : M === this || (this.lastPutMode = Pe.checkPull(this, u, c, e)) && s.checkPut(this, u, c, e))) {
      if (y = this._getDirection(e, o) === "vertical", r = x(c), F("dragOverValid"), p.eventCanceled)
        return w;
      if (a)
        return I = C, X(), this._hideClone(), F("revert"), p.eventCanceled || (de ? C.insertBefore(c, de) : C.appendChild(c)), _(true);
      var Y = dt(n, l.draggable);
      if (!Y || Vn(e, y, this) && !Y.animated) {
        if (Y === c)
          return _(false);
        if (Y && n === e.target && (o = Y), o && (i = x(o)), Re(C, n, c, r, o, i, e, !!o) !== false)
          return X(), Y && Y.nextSibling ? n.insertBefore(c, Y.nextSibling) : n.appendChild(c), I = n, H(), _(true);
      } else if (Y && Un(e, y, this)) {
        var Z = be(n, 0, l, true);
        if (Z === c)
          return _(false);
        if (o = Z, i = x(o), Re(C, n, c, r, o, i, e, false) !== false)
          return X(), n.insertBefore(c, Z), I = n, H(), _(true);
      } else if (o.parentNode === n) {
        i = x(o);
        var L = 0, v, T = c.parentNode !== n, D = !Ln(c.animated && c.toRect || r, o.animated && o.toRect || i, y), N = y ? "top" : "left", P = It(o, "top", "top") || It(c, "top", "top"), V = P ? P.scrollTop : void 0;
        pe !== o && (v = i[N], Oe = false, Me = !D && l.invertSwap || T), L = $n(e, o, i, y, D ? 1 : l.swapThreshold, l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold, Me, pe === o);
        var W;
        if (L !== 0) {
          var $ = q(c);
          do
            $ -= L, W = I.children[$];
          while (W && (h2(W, "display") === "none" || W === g));
        }
        if (L === 0 || W === o)
          return _(false);
        pe = o, Ce = L;
        var se = o.nextElementSibling, Q = false;
        Q = L === 1;
        var xe = Re(C, n, c, r, o, i, e, Q);
        if (xe !== false)
          return (xe === 1 || xe === -1) && (Q = xe === 1), at = true, setTimeout(zn, 30), X(), Q && !se ? n.appendChild(c) : o.parentNode.insertBefore(c, Q ? se : o), P && jt(P, 0, V - P.scrollTop), I = c.parentNode, v !== void 0 && !Me && (Be = Math.abs(v - x(o)[N])), H(), _(true);
      }
      if (n.contains(c))
        return _(false);
    }
    return false;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    E(document, "mousemove", this._onTouchMove), E(document, "touchmove", this._onTouchMove), E(document, "pointermove", this._onTouchMove), E(document, "dragover", fe), E(document, "mousemove", fe), E(document, "touchmove", fe);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    E(e, "mouseup", this._onDrop), E(e, "touchend", this._onDrop), E(e, "pointerup", this._onDrop), E(e, "touchcancel", this._onDrop), E(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var n = this.el, o = this.options;
    if (z = q(c), ie = q(c, o.draggable), k("drop", this, {
      evt: e
    }), I = c && c.parentNode, z = q(c), ie = q(c, o.draggable), p.eventCanceled) {
      this._nulling();
      return;
    }
    ge = false, Me = false, Oe = false, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), lt(this.cloneId), lt(this._dragStartId), this.nativeDraggable && (E(document, "drop", this), E(n, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), De && h2(document.body, "user-select", ""), h2(c, "transform", ""), e && (we && (e.cancelable && e.preventDefault(), !o.dropBubble && e.stopPropagation()), g && g.parentNode && g.parentNode.removeChild(g), (C === I || M && M.lastPutMode !== "clone") && O && O.parentNode && O.parentNode.removeChild(O), c && (this.nativeDraggable && E(c, "dragend", this), tt(c), c.style["will-change"] = "", we && !ge && j(c, M ? M.options.ghostClass : this.options.ghostClass, false), j(c, this.options.chosenClass, false), B({
      sortable: this,
      name: "unchoose",
      toEl: I,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), C !== I ? (z >= 0 && (B({
      rootEl: I,
      name: "add",
      toEl: I,
      fromEl: C,
      originalEvent: e
    }), B({
      sortable: this,
      name: "remove",
      toEl: I,
      originalEvent: e
    }), B({
      rootEl: I,
      name: "sort",
      toEl: I,
      fromEl: C,
      originalEvent: e
    }), B({
      sortable: this,
      name: "sort",
      toEl: I,
      originalEvent: e
    })), M && M.save()) : z !== me && z >= 0 && (B({
      sortable: this,
      name: "update",
      toEl: I,
      originalEvent: e
    }), B({
      sortable: this,
      name: "sort",
      toEl: I,
      originalEvent: e
    })), p.active && ((z == null || z === -1) && (z = me, ie = Te), B({
      sortable: this,
      name: "end",
      toEl: I,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    k("nulling", this), C = c = I = g = de = O = Ye = ae = ce = K = we = z = ie = me = Te = pe = Ce = M = Pe = p.dragged = p.ghost = p.clone = p.active = null, je.forEach(function(e) {
      e.checked = true;
    }), je.length = Ze = Qe = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        c && (this._onDragOver(e), jn(e));
        break;
      case "selectstart":
        e.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var e = [], n, o = this.el.children, r = 0, i = o.length, a = this.options; r < i; r++)
      n = o[r], J(n, a.draggable, this.el, false) && e.push(n.getAttribute(a.dataIdAttr) || Kn(n));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, n) {
    var o = {}, r = this.el;
    this.toArray().forEach(function(i, a) {
      var l = r.children[a];
      J(l, this.options.draggable, r, false) && (o[i] = l);
    }, this), n && this.captureAnimationState(), e.forEach(function(i) {
      o[i] && (r.removeChild(o[i]), r.appendChild(o[i]));
    }), n && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var e = this.options.store;
    e && e.set && e.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(e, n) {
    return J(e, n || this.options.draggable, this.el, false);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(e, n) {
    var o = this.options;
    if (n === void 0)
      return o[e];
    var r = Ae.modifyOption(this, e, n);
    typeof r != "undefined" ? o[e] = r : o[e] = n, e === "group" && qt(o);
  },
  /**
   * Destroy
   */
  destroy: function() {
    k("destroy", this);
    var e = this.el;
    e[U] = null, E(e, "mousedown", this._onTapStart), E(e, "touchstart", this._onTapStart), E(e, "pointerdown", this._onTapStart), this.nativeDraggable && (E(e, "dragover", this), E(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(n) {
      n.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), Ge.splice(Ge.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!ae) {
      if (k("hideClone", this), p.eventCanceled)
        return;
      h2(O, "display", "none"), this.options.removeCloneOnHide && O.parentNode && O.parentNode.removeChild(O), ae = true;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (ae) {
      if (k("showClone", this), p.eventCanceled)
        return;
      c.parentNode == C && !this.options.group.revertClone ? C.insertBefore(O, c) : de ? C.insertBefore(O, de) : C.appendChild(O), this.options.group.revertClone && this.animate(c, O), h2(O, "display", ""), ae = false;
    }
  }
};
function jn(t) {
  t.dataTransfer && (t.dataTransfer.dropEffect = "move"), t.cancelable && t.preventDefault();
}
function Re(t, e, n, o, r, i, a, l) {
  var s, u = t[U], d = u.options.onMove, f;
  return window.CustomEvent && !re && !Ie ? s = new CustomEvent("move", {
    bubbles: true,
    cancelable: true
  }) : (s = document.createEvent("Event"), s.initEvent("move", true, true)), s.to = e, s.from = t, s.dragged = n, s.draggedRect = o, s.related = r || e, s.relatedRect = i || x(e), s.willInsertAfter = l, s.originalEvent = a, t.dispatchEvent(s), d && (f = d.call(u, s, a)), f;
}
function tt(t) {
  t.draggable = false;
}
function zn() {
  at = false;
}
function Un(t, e, n) {
  var o = x(be(n.el, 0, n.options, true)), r = Ut(n.el, n.options, g), i = 10;
  return e ? t.clientX < r.left - i || t.clientY < o.top && t.clientX < o.right : t.clientY < r.top - i || t.clientY < o.bottom && t.clientX < o.left;
}
function Vn(t, e, n) {
  var o = x(dt(n.el, n.options.draggable)), r = Ut(n.el, n.options, g), i = 10;
  return e ? t.clientX > r.right + i || t.clientY > o.bottom && t.clientX > o.left : t.clientY > r.bottom + i || t.clientX > o.right && t.clientY > o.top;
}
function $n(t, e, n, o, r, i, a, l) {
  var s = o ? t.clientY : t.clientX, u = o ? n.height : n.width, d = o ? n.top : n.left, f = o ? n.bottom : n.right, m = false;
  if (!a) {
    if (l && Be < u * r) {
      if (!Oe && (Ce === 1 ? s > d + u * i / 2 : s < f - u * i / 2) && (Oe = true), Oe)
        m = true;
      else if (Ce === 1 ? s < d + Be : s > f - Be)
        return -Ce;
    } else if (s > d + u * (1 - r) / 2 && s < f - u * (1 - r) / 2)
      return qn(e);
  }
  return m = m || a, m && (s < d + u * i / 2 || s > f - u * i / 2) ? s > d + u / 2 ? 1 : -1 : 0;
}
function qn(t) {
  return q(c) < q(t) ? 1 : -1;
}
function Kn(t) {
  for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, o = 0; n--; )
    o += e.charCodeAt(n);
  return o.toString(36);
}
function Jn(t) {
  je.length = 0;
  for (var e = t.getElementsByTagName("input"), n = e.length; n--; ) {
    var o = e[n];
    o.checked && je.push(o);
  }
}
function ke(t) {
  return setTimeout(t, 0);
}
function lt(t) {
  return clearTimeout(t);
}
Ue && S(document, "touchmove", function(t) {
  (p.active || ge) && t.cancelable && t.preventDefault();
});
p.utils = {
  on: S,
  off: E,
  css: h2,
  find: Wt,
  is: function(e, n) {
    return !!J(e, n, e, false);
  },
  extend: Mn,
  throttle: Gt,
  closest: J,
  toggleClass: j,
  clone: zt,
  index: q,
  nextTick: ke,
  cancelNextTick: lt,
  detectDirection: $t,
  getChild: be
};
p.get = function(t) {
  return t[U];
};
p.mount = function() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(o) {
    if (!o.prototype || !o.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(o));
    o.utils && (p.utils = te(te({}, p.utils), o.utils)), Ae.mount(o);
  });
};
p.create = function(t, e) {
  return new p(t, e);
};
p.version = xn;
var A = [];
var Ee;
var st;
var ut = false;
var nt;
var ot;
var ze;
var Se;
function Zn() {
  function t() {
    this.defaults = {
      scroll: true,
      forceAutoScrollFallback: false,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true
    };
    for (var e in this)
      e.charAt(0) === "_" && typeof this[e] == "function" && (this[e] = this[e].bind(this));
  }
  return t.prototype = {
    dragStarted: function(n) {
      var o = n.originalEvent;
      this.sortable.nativeDraggable ? S(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? S(document, "pointermove", this._handleFallbackAutoScroll) : o.touches ? S(document, "touchmove", this._handleFallbackAutoScroll) : S(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(n) {
      var o = n.originalEvent;
      !this.options.dragOverBubble && !o.rootEl && this._handleAutoScroll(o);
    },
    drop: function() {
      this.sortable.nativeDraggable ? E(document, "dragover", this._handleAutoScroll) : (E(document, "pointermove", this._handleFallbackAutoScroll), E(document, "touchmove", this._handleFallbackAutoScroll), E(document, "mousemove", this._handleFallbackAutoScroll)), Mt(), He(), Fn();
    },
    nulling: function() {
      ze = st = Ee = ut = Se = nt = ot = null, A.length = 0;
    },
    _handleFallbackAutoScroll: function(n) {
      this._handleAutoScroll(n, true);
    },
    _handleAutoScroll: function(n, o) {
      var r = this, i = (n.touches ? n.touches[0] : n).clientX, a = (n.touches ? n.touches[0] : n).clientY, l = document.elementFromPoint(i, a);
      if (ze = n, o || this.options.forceAutoScrollFallback || Ie || re || De) {
        rt(n, this.options, l, o);
        var s = le(l, true);
        ut && (!Se || i !== nt || a !== ot) && (Se && Mt(), Se = setInterval(function() {
          var u = le(document.elementFromPoint(i, a), true);
          u !== s && (s = u, He()), rt(n, r.options, u, o);
        }, 10), nt = i, ot = a);
      } else {
        if (!this.options.bubbleScroll || le(l, true) === ee()) {
          He();
          return;
        }
        rt(n, this.options, le(l, false), false);
      }
    }
  }, oe(t, {
    pluginName: "scroll",
    initializeByDefault: true
  });
}
function He() {
  A.forEach(function(t) {
    clearInterval(t.pid);
  }), A = [];
}
function Mt() {
  clearInterval(Se);
}
var rt = Gt(function(t, e, n, o) {
  if (e.scroll) {
    var r = (t.touches ? t.touches[0] : t).clientX, i = (t.touches ? t.touches[0] : t).clientY, a = e.scrollSensitivity, l = e.scrollSpeed, s = ee(), u = false, d;
    st !== n && (st = n, He(), Ee = e.scroll, d = e.scrollFn, Ee === true && (Ee = le(n, true)));
    var f = 0, m = Ee;
    do {
      var y = m, b = x(y), w = b.top, F = b.bottom, X = b.left, _ = b.right, H = b.width, Y = b.height, Z = void 0, L = void 0, v = y.scrollWidth, T = y.scrollHeight, D = h2(y), N = y.scrollLeft, P = y.scrollTop;
      y === s ? (Z = H < v && (D.overflowX === "auto" || D.overflowX === "scroll" || D.overflowX === "visible"), L = Y < T && (D.overflowY === "auto" || D.overflowY === "scroll" || D.overflowY === "visible")) : (Z = H < v && (D.overflowX === "auto" || D.overflowX === "scroll"), L = Y < T && (D.overflowY === "auto" || D.overflowY === "scroll"));
      var V = Z && (Math.abs(_ - r) <= a && N + H < v) - (Math.abs(X - r) <= a && !!N), W = L && (Math.abs(F - i) <= a && P + Y < T) - (Math.abs(w - i) <= a && !!P);
      if (!A[f])
        for (var $ = 0; $ <= f; $++)
          A[$] || (A[$] = {});
      (A[f].vx != V || A[f].vy != W || A[f].el !== y) && (A[f].el = y, A[f].vx = V, A[f].vy = W, clearInterval(A[f].pid), (V != 0 || W != 0) && (u = true, A[f].pid = setInterval((function() {
        o && this.layer === 0 && p.active._onTouchMove(ze);
        var se = A[this.layer].vy ? A[this.layer].vy * l : 0, Q = A[this.layer].vx ? A[this.layer].vx * l : 0;
        typeof d == "function" && d.call(p.dragged.parentNode[U], Q, se, t, ze, A[this.layer].el) !== "continue" || jt(A[this.layer].el, Q, se);
      }).bind({
        layer: f
      }), 24))), f++;
    } while (e.bubbleScroll && m !== s && (m = le(m, false)));
    ut = u;
  }
}, 30);
var Zt = function(e) {
  var n = e.originalEvent, o = e.putSortable, r = e.dragEl, i = e.activeSortable, a = e.dispatchSortableEvent, l = e.hideGhostForTarget, s = e.unhideGhostForTarget;
  if (n) {
    var u = o || i;
    l();
    var d = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n, f = document.elementFromPoint(d.clientX, d.clientY);
    s(), u && !u.el.contains(f) && (a("spill"), this.onSpill({
      dragEl: r,
      putSortable: o
    }));
  }
};
function ht() {
}
ht.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var n = e.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function(e) {
    var n = e.dragEl, o = e.putSortable;
    this.sortable.captureAnimationState(), o && o.captureAnimationState();
    var r = be(this.sortable.el, this.startIndex, this.options);
    r ? this.sortable.el.insertBefore(n, r) : this.sortable.el.appendChild(n), this.sortable.animateAll(), o && o.animateAll();
  },
  drop: Zt
};
oe(ht, {
  pluginName: "revertOnSpill"
});
function pt() {
}
pt.prototype = {
  onSpill: function(e) {
    var n = e.dragEl, o = e.putSortable, r = o || this.sortable;
    r.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), r.animateAll();
  },
  drop: Zt
};
oe(pt, {
  pluginName: "removeOnSpill"
});
p.mount(new Zn());
p.mount(pt, ht);
function Qn(t) {
  return t == null ? t : JSON.parse(JSON.stringify(t));
}
function eo(t) {
  getCurrentInstance() && onUnmounted(t);
}
function to(t) {
  getCurrentInstance() ? onMounted(t) : nextTick(t);
}
var Qt = null;
var en = null;
function Ft(t = null, e = null) {
  Qt = t, en = e;
}
function no() {
  return {
    data: Qt,
    clonedData: en
  };
}
var Rt = Symbol("cloneElement");
function tn(...t) {
  var Z, L;
  const e = (Z = getCurrentInstance()) == null ? void 0 : Z.proxy, n = t[0];
  let [, o, r] = t;
  Array.isArray(unref(o)) || (r = o, o = null);
  let i = null;
  const {
    immediate: a = true,
    clone: l = Qn,
    customUpdate: s
  } = (L = unref(r)) != null ? L : {};
  function u(v) {
    var N;
    const T = unref((N = unref(o)) == null ? void 0 : N[v.oldIndex]), D = l(T);
    Ft(T, D), v.item[Rt] = D;
  }
  function d(v) {
    const T = v.item[Rt];
    if (!yn(T)) {
      if (qe(v.item), isRef(o)) {
        const D = [...unref(o)];
        o.value = St(D, v.newDraggableIndex, T);
        return;
      }
      St(unref(o), v.newDraggableIndex, T);
    }
  }
  function f(v) {
    const { from: T, item: D, oldIndex: N, oldDraggableIndex: P, pullMode: V, clone: W } = v;
    if (Dt(T, D, N), V === "clone") {
      qe(W);
      return;
    }
    if (isRef(o)) {
      const $ = [...unref(o)];
      o.value = Et($, P);
      return;
    }
    Et(unref(o), P);
  }
  function m(v) {
    if (s) {
      s(v);
      return;
    }
    const { from: T, item: D, oldIndex: N, newIndex: P } = v;
    if (qe(D), Dt(T, D, N), isRef(o)) {
      const V = [...unref(o)];
      o.value = wt(V, N, P);
      return;
    }
    wt(unref(o), N, P);
  }
  function y() {
    nextTick(() => {
      Ft();
    });
  }
  const b = {
    onUpdate: m,
    onStart: u,
    onAdd: d,
    onRemove: f,
    onEnd: y
  };
  function w(v) {
    const T = unref(n);
    return v || (v = wn(T) ? En(T, e == null ? void 0 : e.$el) : T), v && !_n(v) && (v = v.$el), v || mn("Root element not found"), v;
  }
  function F() {
    var N;
    const P = (N = unref(r)) != null ? N : {}, { immediate: v, clone: T } = P, D = Ve(P, ["immediate", "clone"]);
    return _t(D, (V, W) => {
      Tn(V) && (D[V] = ($, ...se) => {
        const Q = no();
        return Cn($, Q), W($, ...se);
      });
    }), Dn(
      o === null ? {} : b,
      D
    );
  }
  const X = (v) => {
    v = w(v), i && _.destroy(), i = new p(v, F());
  };
  watch(
    () => r,
    () => {
      i && _t(F(), (v, T) => {
        i == null || i.option(v, T);
      });
    },
    { deep: true }
  );
  const _ = {
    option: (v, T) => i == null ? void 0 : i.option(v, T),
    destroy: () => {
      i == null || i.destroy(), i = null;
    },
    save: () => i == null ? void 0 : i.save(),
    toArray: () => i == null ? void 0 : i.toArray(),
    closest: (...v) => i == null ? void 0 : i.closest(...v)
  }, H = () => _ == null ? void 0 : _.option("disabled", true), Y = () => _ == null ? void 0 : _.option("disabled", false);
  return to(() => {
    a && X();
  }), eo(_.destroy), ue({ start: X, pause: H, resume: Y }, _);
}
var ct = [
  "update",
  "start",
  "add",
  "remove",
  "choose",
  "unchoose",
  "end",
  "sort",
  "filter",
  "clone",
  "move",
  "change"
];
var oo = [
  "clone",
  "animation",
  "ghostClass",
  "group",
  "sort",
  "disabled",
  "store",
  "handle",
  "draggable",
  "swapThreshold",
  "invertSwap",
  "invertedSwapThreshold",
  "removeCloneOnHide",
  "direction",
  "chosenClass",
  "dragClass",
  "ignore",
  "filter",
  "preventOnFilter",
  "easing",
  "setData",
  "dropBubble",
  "dragoverBubble",
  "dataIdAttr",
  "delay",
  "delayOnTouchOnly",
  "touchStartThreshold",
  "forceFallback",
  "fallbackClass",
  "fallbackOnBody",
  "fallbackTolerance",
  "fallbackOffset",
  "supportPointer",
  "emptyInsertThreshold",
  "scroll",
  "forceAutoScrollFallback",
  "scrollSensitivity",
  "scrollSpeed",
  "bubbleScroll",
  "modelValue",
  "tag",
  "target",
  "customUpdate",
  ...ct.map((t) => `on${t.replace(/^\S/, (e) => e.toUpperCase())}`)
];
var lo = defineComponent({
  name: "VueDraggable",
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  props: oo,
  emits: ["update:modelValue", ...ct],
  setup(t, { slots: e, emit: n, expose: o, attrs: r }) {
    const i = ct.reduce((d, f) => {
      const m = `on${f.replace(/^\S/, (y) => y.toUpperCase())}`;
      return d[m] = (...y) => n(f, ...y), d;
    }, {}), a = computed(() => {
      const y = toRefs(t), { modelValue: d } = y, f = Ve(y, ["modelValue"]), m = Object.entries(f).reduce((b, [w, F]) => {
        const X = unref(F);
        return X !== void 0 && (b[w] = X), b;
      }, {});
      return ue(ue({}, i), bn(ue(ue({}, r), m)));
    }), l = computed({
      get: () => t.modelValue,
      set: (d) => n("update:modelValue", d)
    }), s = ref(), u = reactive(
      tn(t.target || s, l, a)
    );
    return o(u), () => {
      var d;
      return h(t.tag || "div", { ref: s }, (d = e == null ? void 0 : e.default) == null ? void 0 : d.call(e, u));
    };
  }
});
var Xt = {
  mounted: "mounted",
  unmounted: "unmounted"
};
var it = /* @__PURE__ */ new WeakMap();
var so = {
  [Xt.mounted](t, e) {
    const n = isProxy(e.value) ? [e.value] : e.value, o = tn(t, ...n);
    it.set(t, o.destroy);
  },
  [Xt.unmounted](t) {
    var e;
    (e = it.get(t)) == null || e(), it.delete(t);
  }
};
export {
  lo as VueDraggable,
  tn as useDraggable,
  so as vDraggable
};
/*! Bundled license information:

vue-draggable-plus/dist/vue-draggable-plus.js:
  (**!
   * Sortable 1.15.2
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   *)
*/
//# sourceMappingURL=vue-draggable-plus.js.map
