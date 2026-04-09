'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function envVal(val) {
  const t = typeof val;
  const s = String(val).toLowerCase().trim();
  if (t === 'boolean') {
    return val;
  } else if (t === 'undefined' || s === 'undefined') {
    return void 0;
  } else if (val === null || s === 'null') {
    return null;
  } else if (t === 'number') {
    return val;
  }
  if (t === 'string') {
    if (s === '1') {
      return 1;
    } else if (s === '0') {
      return 0;
    } else if (val === '') {
      return '';
    } else if (s === '') {
      return val;
    } else if (/^(?:yes|on|true|enabled)$/i.test(s)) {
      return true;
    } else if (/^(?:no|off|false|disabled)$/i.test(s)) {
      return false;
    }
    if (/^\-?[1-9]\d*(?:\.\d+)?$/i.test(s)) {
      let n = Number(s);
      return Number.isNaN(n) ? val : n;
    }
  }
  return val;
}
function envBool(val, mode2 = true) {
  let v = envVal(val);
  if (mode2) {
    let t = typeof v;
    return t === 'number' || t === 'boolean' ? v : false;
  }
  return typeof v === 'string' ? false : v;
}
/**
 * 將環境變數值轉換為真正的 JavaScript 布林值
 * Convert environment variable value to true JavaScript boolean value
 *
 * envBool(xxx, true) 可能回傳數字（如 1、0）或布林值（true、false）
 * 當需要確保回傳值一定是 JavaScript 原生布林類型時使用 envBool2
 * envBool(xxx, true) may return numbers (e.g., 1, 0) or booleans (true, false)
 * Use envBool2 when you need to ensure the return value is always a native JavaScript boolean type
 *
 * envBool2 使用 !! 雙重否定將結果轉為布林值
 * 數字會根據 truthy/falsy 轉換（0 為 false，非 0 為 true）
 * envBool2 uses !! double negation to convert result to boolean
 * Numbers are converted based on truthy/falsy (0 is false, non-zero is true)
 *
 * @param val - 環境變數值 / Environment variable value
 * @returns 真正的 JavaScript 布林值（true 或 false）/ True JavaScript boolean value (true or false)
 *
 * @example
 * ```typescript
 * // envBool 會回傳數字時 / envBool returns number
 * envBool('1')        // => 1 (number)
 * envBool('0')        // => 0 (number)
 * envBool(99)         // => 99 (number)
 *
 * // envBool2 使用 !! 轉為布林 / envBool2 uses !! to convert to boolean
 * envBool2('1')       // => true (!!1 === true)
 * envBool2('0')       // => false (!!0 === false)
 * envBool2(99)        // => true (!!99 === true)
 * envBool2(0)         // => false (!!0 === false)
 *
 * // 布林值字串 / Boolean strings
 * envBool2('true')    // => true
 * envBool2('false')   // => false
 * envBool2('yes')     // => true
 * envBool2('no')      // => false
 * envBool2('on')      // => true
 * envBool2('off')     // => false
 * envBool2('enabled') // => true
 * envBool2('disabled') // => false
 *
 * // 非有效布林/數字回傳 false / Non-valid boolean/number returns false
 * envBool2('a')       // => false
 * envBool2(null)      // => false
 * envBool2(undefined) // => false
 * envBool2({})        // => false
 * envBool2([])        // => false
 *
 * // 特殊數值 / Special values
 * envBool2(-1)        // => true (!!-1 === true)
 * envBool2(Infinity)  // => true (!!Infinity === true)
 * envBool2(NaN)       // => false (!!NaN === false)
 * ```
 */
function envBool2(val) {
  const v = envBool(val, true);
  const t = typeof v;
  return t === 'number' || t === 'boolean' ? !!v : false;
}

exports.default = envBool;
exports.envBool = envBool;
exports.envBool2 = envBool2;
exports.envVal = envVal;
//# sourceMappingURL=index.cjs.development.cjs.map
