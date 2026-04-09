/**
 * Created by user on 2018/6/29/029.
 */

import { envVal, envBool2 } from '../src/index';
import { inspect } from 'util';

// @ts-ignore
describe(`test`, () =>
{

	const tests: [any, ReturnType<typeof envVal>, boolean][] = [
		// 數字字串 - 使用 !! 轉換，1 為 truthy 轉 true，0 為 falsy 轉 false
		['1', 1, true],
		['0', 0, false],
		[1, 1, true],
		[0, 0, false],

		[null, null, false],
		['null', null, false],

		[undefined, undefined, false],
		['undefined', undefined, false],
		[void(0), undefined, false],

		// 布林值
		[true, true, true],
		['true', true, true],

		[false, false, false],
		['false', false, false],

		['yes', true, true],
		['no', false, false],

		['on', true, true],
		['off', false, false],

		['enabled', true, true],
		['disabled', false, false],

		['NULL', null, false],
		['UNDEFINED', undefined, false],
		['TRUE', true, true],
		['FALSE', false, false],
		['YES', true, true],
		['NO', false, false],
		['ON', true, true],
		['OFF', false, false],
		['ENABLED', true, true],
		['DISABLED', false, false],

		['', '', false],
		['\t', '\t', false],
		[' ', ' ', false],
		['\n', '\n', false],

		['a', 'a', false],

		['099', '099', false],
		['99', 99, true],

		['099.9', '099.9', false],
		['99.9', 99.9, true],

		[-1, -1, true],
		['-1', -1, true],

		[-1.1, -1.1, true],
		['-1.1', -1.1, true],

		['0x11', '0x11', false],
		['0b11', '0b11', false],
		['0o11', '0o11', false],
		['100a', '100a', false],

		['\u0001', '\u0001', false],

		[{}, {}, false],
		[[], [], false],
	];

	tests.forEach(function ([input, expectedVal, expectedEnvBool2])
	{
		describe(`${inspect(input)}`, () =>
		{
			it(`envVal: ${inspect(expectedVal)}`, function ()
			{
				let actual = envVal(input);
				expect(actual).toStrictEqual(expectedVal);
			});

			it(`envBool2: ${inspect(expectedEnvBool2)}`, function ()
			{
				let actual = envBool2(input);
				expect(typeof actual).toBe('boolean');
				expect(actual).toBe(expectedEnvBool2);
			});
		});
	});

	/**
	 * 非預期值的測試
	 * Tests for unexpected values
	 */
	const unexpectedValueTests: [any, boolean][] = [
		// Symbol - 回傳 false
		[Symbol('test'), false],
		[Symbol.iterator, false],
		[Symbol.for('global'), false],

		// BigInt - 回傳 false（envBool 回傳原始值，不是 number/boolean）
		[BigInt(123), false],
		[BigInt(0), false],
		[BigInt(-1), false],
		[BigInt('123'), false],

		// Function - 回傳 false
		[function () { }, false],
		[() => { }, false],
		[async function () { }, false],

		// Promise - 回傳 false
		[Promise.resolve(1), false],
		[new Promise(() => { }), false],

		// Proxy / Object - 回傳 false
		[new Proxy({}, {}), false],
		[new Date(), false],
		[/regex/, false],
		[new Error('test'), false],
		[new TypeError('test'), false],

		// Map / Set - 回傳 false
		[new Map(), false],
		[new Set(), false],
		[new Map([['key', 'value']]), false],
		[new Set([1, 2, 3]), false],

		// WeakMap / WeakSet - 回傳 false
		[new WeakMap(), false],
		[new WeakSet(), false],

		// TypedArray - 回傳 false
		[new Uint8Array([1, 2, 3]), false],
		[new Int16Array(5), false],
		[new Float32Array([1.1]), false],

		// ArrayBuffer - 回傳 false
		[new ArrayBuffer(8), false],

		// 特殊數值
		[NaN, false],
		[Infinity, true],
		[-Infinity, true],
		[Number.MAX_VALUE, true],
		[Number.MIN_VALUE, true],

		// 巢狀結構 - 回傳 false
		[{ a: { b: { c: 1 } } }, false],
		[[[1, 2], [3, 4]], false],
		[{ arr: [1, 2, 3] }, false],
		[[{ a: 1 }], false],

		// 混合結構 - 回傳 false
		[new Map([['a', [1, 2]]]), false],
		[{ map: new Map() }, false],
		[{ set: new Set() }, false],

		// Class 實例 - 回傳 false
		[class Foo { }, false],
		[(class Bar { x = 1; }).prototype, false],
		[{ constructor: function() { this.x = 1; } }, false],

		// JSON 特殊值 - 回傳 false
		[JSON.parse('{"a":1}'), false],
		[JSON.parse('{"a":[1,2,3]}'), false],
		[JSON.parse('[]'), false],
		[JSON.parse('{}'), false],

		// 嵌套布林字串 - 回傳 false
		[['true', 'false'], false],
		[{ key: 'true' }, false],
		[{ key: 'yes' }, false],
	];

	unexpectedValueTests.forEach(function ([input, expectedEnvBool2])
	{
		describe(`非預期值 / Unexpected: ${inspect(input)}`, () =>
		{
			it(`envBool2: ${inspect(expectedEnvBool2)}`, function ()
			{
				let actual = envBool2(input);
				expect(typeof actual).toBe('boolean');
				expect(actual).toBe(expectedEnvBool2);
			});
		});
	});
});