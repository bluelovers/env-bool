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
export function envVal(val: undefined | 'undefined'): undefined
export function envVal(val: null | 'null'): null
export function envVal(val: boolean): boolean
export function envVal(val: 'no' | 'off' | 'false' | 'disabled'): false
export function envVal(val: 'yes' | 'on' | 'true' | 'enabled'): true
export function envVal(val: '1' | 1): 1
export function envVal(val: '0' | 0): 0
export function envVal(val: number): number
export function envVal(val: string): string | number
export function envVal<T>(val: T): T
export function envVal(val: unknown)
{
	/**
	 * 取得值的類型
	 * Get the type of value
	 */
	const t = typeof val;
	/**
	 * 轉換為小寫並去除首尾空白
	 * Convert to lowercase and trim whitespace
	 */
	const s = String(val).toLowerCase().trim();

	/**
	 * 處理布林值：直接回傳
	 * Handle boolean: return directly
	 */
	if (t === 'boolean')
	{
		return val;
	}
	/**
	 * 處理 undefined 值
	 * Handle undefined value
	 */
	else if (t === 'undefined' || s === 'undefined')
	{
		return void(0);
	}
	/**
	 * 處理 null 值
	 * Handle null value
	 */
	else if (val === null || s === 'null')
	{
		return null;
	}
	/**
	 * 處理數字：直接回傳
	 * Handle number: return directly
	 */
	else if (t === 'number')
	{
		return val;
	}

	/**
	 * 處理字串類型的環境變數值
	 * Handle string type environment variable values
	 */
	if (t === 'string')
	{
		/**
		 * '1' 轉換為數字 1
		 * '1' converts to number 1
		 */
		if (s === '1')
		{
			return 1;
		}
		/**
		 * '0' 轉換為數字 0
		 * '0' converts to number 0
		 */
		else if (s === '0')
		{
			return 0;
		}
		/**
		 * 空字串回傳空字串
		 * Empty string returns empty string
		 */
		else if (val === '')
		{
			return '';
		}
		/**
		 * 僅有空白字元，回傳原始值
		 * Only whitespace, return original value
		 */
		else if (s === '')
		{
			return val;
		}
		/**
		 * 處理肯定布林值關鍵字（yes/on/true/enabled）
		 * Handle positive boolean keywords (yes/on/true/enabled)
		 */
		else if (/^(?:yes|on|true|enabled)$/i.test(s))
		{
			return true;
		}
		/**
		 * 處理否定布林值關鍵字（no/off/false/disabled）
		 * Handle negative boolean keywords (no/off/false/disabled)
		 */
		else if (/^(?:no|off|false|disabled)$/i.test(s))
		{
			return false;
		}

		/**
		 * 檢查是否為有效的十進位整數或浮點數
		 * Check if it's a valid decimal integer or floating point number
		 *
		 * 支援格式：正數、負數、浮點數（如 99、-1、99.9）
		 * Support format: positive, negative, floating point (e.g., 99, -1, 99.9)
		 */
		if (/^\-?[1-9]\d*(?:\.\d+)?$/i.test(s))
		{
			let n = Number(s);
			/**
			 * 若轉換失敗則回傳原始字串
			 * Return original string if conversion fails
			 */
			return Number.isNaN(n) ? val : n;
		}
	}

	/**
	 * 若不符合任何轉換規則，回傳原始值
	 * If no conversion rules match, return original value
	 */
	return val
}

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
export function envBool(val: undefined | 'undefined'): undefined
export function envBool(val: null | 'null'): null
export function envBool(val: boolean): boolean
export function envBool(val: 'no' | 'off' | 'false' | 'disabled'): false
export function envBool(val: 'yes' | 'on' | 'true' | 'enabled'): true
export function envBool(val: '1' | 1): 1
export function envBool(val: '0' | 0): 0
export function envBool(val: number): number
export function envBool<T>(val: T, mode2: true): number | boolean
export function envBool<T>(val: T, mode2?: boolean): T | number | boolean
export function envBool(val: unknown, mode2: boolean = true)
{
	/**
	 * 先使用 envVal 進行基本類型轉換
	 * First use envVal for basic type conversion
	 */
	let v = envVal(val);

	/**
	 * 嚴格布林模式（mode2 = true）
	 * Strict boolean mode (mode2 = true)
	 *
	 * 只允許回傳數字或布林類型，若不符合則回傳 false
	 * Only allow returning number or boolean type, otherwise return false
	 */
	if (mode2)
	{
		let t = typeof v;

		return (
			t === 'number'
			|| t === 'boolean'
		) ? v : false;
	}

	/**
	 * 寬鬆模式（mode2 = false）
	 * Loose mode (mode2 = false)
	 *
	 * 若值為字串類型則回傳 false，否則回傳原值
	 * If value is string type return false, otherwise return original value
	 */
	return typeof v === 'string' ? false : v;
}

export default envBool;

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
export function envBool2<T>(val: T): boolean
{
	/**
	 * 先使用 envBool 進行基本類型轉換
	 * First use envBool for basic type conversion
	 */
	const v = envBool(val, true);
	const t = typeof v;

	/**
	 * 只有當 envBool 回傳真正的布林值 true 時才回傳 true
	 * Only return true when envBool returns actual boolean true
	 *
	 * 對於非預期值（如數字、Symbol、物件等）全部回傳 false
	 * For unexpected values (like numbers, symbols, objects, etc.) all return false
	 *
	 * 這確保了 envBool2 只會對有效的布林字串（true/yes/on/enabled）回傳 true
	 * This ensures envBool2 only returns true for valid boolean strings (true/yes/on/enabled)
	 */
	return (
		t === 'number'
		|| t === 'boolean'
	) ? !!v : false;
}
