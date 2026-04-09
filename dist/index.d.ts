/**
 * Created by user on 2018/6/29/029.
 */
/**
 * 將環境變數值轉換為 JavaScript 類型值
 * Convert environment variable value to JavaScript type value
 *
 * 檢查環境變數值是否為布林值或其他類型
 * Check if env value is boolean or others
 *
 * @param val - 環境變數值 / Environment variable value
 * @returns 轉換後的 JavaScript 值 / Converted JavaScript value
 *
 * @example
 * ```typescript
 * // 數字字串 / Number strings
 * envVal('1')    // => 1
 * envVal('0')    // => 0
 * envVal('99')   // => 99
 * envVal('99.9') // => 99.9
 *
 * // 布林值字串 / Boolean strings
 * envVal('true')    // => true
 * envVal('false')   // => false
 * envVal('yes')     // => true
 * envVal('no')      // => false
 * envVal('on')      // => true
 * envVal('off')     // => false
 * envVal('enabled') // => true
 * envVal('disabled') // => false
 *
 * // 大小寫不敏感 / Case insensitive
 * envVal('TRUE')   // => true
 * envVal('FALSE')  // => false
 *
 * // null 和 undefined / null and undefined
 * envVal(null)       // => null
 * envVal('null')     // => null
 * envVal(undefined)  // => undefined
 * envVal('undefined') // => undefined
 *
 * // 空字串和空白字元 / Empty string and whitespace
 * envVal('')     // => ''
 * envVal(' ')    // => ' '
 * envVal('\t')   // => '\t'
 *
 * // 非數字字串回傳原始值 / Non-numeric strings return original
 * envVal('a')      // => 'a'
 * envVal('099')    // => '099' (非有效十進位數)
 * envVal('0x11')   // => '0x11' (非十進位)
 * ```
 */
export declare function envVal(val: undefined | "undefined"): undefined;
export declare function envVal(val: null | "null"): null;
export declare function envVal(val: boolean): boolean;
export declare function envVal(val: "no" | "off" | "false" | "disabled"): false;
export declare function envVal(val: "yes" | "on" | "true" | "enabled"): true;
export declare function envVal(val: "1" | 1): 1;
export declare function envVal(val: "0" | 0): 0;
export declare function envVal(val: number): number;
export declare function envVal(val: string): string | number;
export declare function envVal<T>(val: T): T;
/**
 * 將環境變數值轉換為 JavaScript 類型值（支援布林轉換模式）
 * Convert environment variable value to JavaScript type value (with boolean conversion mode)
 *
 * 當 mode2 為 true 時，envBool 只會回傳數字、布林值或 null
 * When mode2 is true, envBool will only return number, boolean or null
 *
 * @param val - 環境變數值 / Environment variable value
 * @param mode2 - 是否啟用嚴格布林模式（預設 true）/ Whether to enable strict boolean mode (default true)
 * @returns 轉換後的 JavaScript 值 / Converted JavaScript value
 *
 * @example
 * ```typescript
 * // mode2 = true (預設) / mode2 = true (default)
 * envBool('1')        // => 1
 * envBool('true')     // => true
 * envBool('yes')      // => true
 * envBool('on')       // => true
 * envBool('enabled')  // => true
 *
 * // 非數字/布林值回傳 false / Non-numeric/boolean returns false
 * envBool('a')         // => false
 * envBool('hello')     // => false
 * envBool(null)        // => false
 * envBool(undefined)   // => false
 * envBool({})          // => false
 * envBool([])          // => false
 *
 * // mode2 = false
 * envBool('1', false)       // => 1
 * envBool('true', false)    // => true
 * envBool('yes', false)     // => true
 * envBool('a', false)       // => 'a'
 * envBool(null, false)      // => null
 * envBool(undefined, false) // => undefined
 *
 * // 數字直接回傳 / Number returns directly
 * envBool(99)         // => 99
 * envBool(99.9)       // => 99.9
 * envBool(-1)         // => -1
 *
 * // 特殊數字字串 / Special number strings
 * envBool('99')       // => 99
 * envBool('99.9')     // => 99.9
 * envBool('-1')       // => -1
 * envBool('099')      // => '099' (非有效十進位數，回傳 false when mode2=true)
 * ```
 */
export declare function envBool(val: undefined | "undefined"): undefined;
export declare function envBool(val: null | "null"): null;
export declare function envBool(val: boolean): boolean;
export declare function envBool(val: "no" | "off" | "false" | "disabled"): false;
export declare function envBool(val: "yes" | "on" | "true" | "enabled"): true;
export declare function envBool(val: "1" | 1): 1;
export declare function envBool(val: "0" | 0): 0;
export declare function envBool(val: number): number;
export declare function envBool<T>(val: T, mode2: true): number | boolean;
export declare function envBool<T>(val: T, mode2?: boolean): T | number | boolean;

export {
	envBool as default,
};

export {};
