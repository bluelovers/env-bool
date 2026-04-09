"use strict";

function envVal(e) {
  const n = typeof e, t = String(e).toLowerCase().trim();
  if ("boolean" === n) return e;
  if ("undefined" !== n && "undefined" !== t) {
    if (null === e || "null" === t) return null;
    if ("number" === n) return e;
    if ("string" === n) {
      if ("1" === t) return 1;
      if ("0" === t) return 0;
      if ("" === e) return "";
      if ("" === t) return e;
      if (/^(?:yes|on|true|enabled)$/i.test(t)) return !0;
      if (/^(?:no|off|false|disabled)$/i.test(t)) return !1;
      if (/^\-?[1-9]\d*(?:\.\d+)?$/i.test(t)) {
        let n = Number(t);
        return Number.isNaN(n) ? e : n;
      }
    }
    return e;
  }
}

function envBool(e, n = !0) {
  let t = envVal(e);
  if (n) {
    let e = typeof t;
    return ("number" === e || "boolean" === e) && t;
  }
  return "string" != typeof t && t;
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.default = envBool, exports.envBool = envBool, exports.envBool2 = function envBool2(e) {
  const n = envBool(e, !0), t = typeof n;
  return ("number" === t || "boolean" === t) && !!n;
}, exports.envVal = envVal;
//# sourceMappingURL=index.cjs.production.min.cjs.map
