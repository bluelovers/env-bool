# env-bool

將環境變數值轉換為 JavaScript 類型值 (Convert env var value to JS type, support boolean conversion)

## 安裝 (Installation)

```bash
# 使用 yarn / Using yarn
yarn add env-bool

# 使用 pnpm / Using pnpm
pnpm add env-bool

# 使用 npm / Using npm
npm install env-bool
```

## 使用 (Usage)

```ts
import envBool, { envVal, envBool2 } from 'env-bool';
```

## 說明 (Description)

此函式庫提供三個主要函數：

- **`envVal(val)`** - 將環境變數值轉換為 JavaScript 類型值
- **`envBool(val, mode2?)`** - 將環境變數值轉換為 JavaScript 類型值（支援布林轉換模式）
- **`envBool2(val)`** - 將環境變數值轉換為真正的 JavaScript 布林值（只對有效布林字串回傳 true）

> 預設 mode2 = true

### mode2 參數說明

當 `mode2 = true` 時，`envBool` 只會回傳數字或布林值；若不符合則回傳 `false`。

當 `mode2 = false` 時，`envBool` 會回傳轉換後的值。

## 類型轉換範例 (Type Conversion Examples)

```ts
// 數字字串 / Number strings
envVal('1')    // => 1
envVal('0')    // => 0
envVal('99')   // => 99
envVal('99.9') // => 99.9

// 布林值字串 / Boolean strings
envVal('true')    // => true
envVal('false')   // => false
envVal('yes')     // => true
envVal('no')      // => false
envVal('on')      // => true
envVal('off')     // => false
envVal('enabled') // => true
envVal('disabled') // => false

// 大小寫不敏感 / Case insensitive
envVal('TRUE')   // => true
envVal('FALSE')  // => false
envVal('YES')    // => true
envVal('NO')     // => false
envVal('ON')     // => true
envVal('OFF')    // => false

// null 和 undefined / null and undefined
envVal(null)       // => null
envVal('null')     // => null
envVal(undefined)  // => undefined
envVal('undefined') // => undefined

// 空字串和空白字元 / Empty string and whitespace
envVal('')     // => ''
envVal(' ')    // => ' '
envVal('\t')   // => '\t'
envVal('\n')   // => '\n'

// 非數字字串 / Non-numeric strings
envVal('a')        // => 'a'
envVal('099')      // => '099' (非有效十進位數)
envVal('0x11')     // => '0x11' (非十進位)
envVal('0b11')     // => '0b11' (非十進位)
envVal('100a')     // => '100a' (包含字母)

// envBool with mode2 = true (default)
envBool('1')        // => 1
envBool('true')     // => true
envBool('yes')      // => true
envBool('a')        // => false (非數字/布林)
envBool(null)       // => false
envBool(undefined)  // => false

// envBool with mode2 = false
envBool('1', false)       // => 1
envBool('true', false)    // => true
envBool('yes', false)      // => true
envBool('a', false)       // => 'a'
envBool(null, false)      // => null
envBool(undefined, false) // => undefined
```

## API

### envVal(val)

將環境變數值轉換為 JavaScript 類型值。

**參數：**
- `val` - 環境變數值

**回傳值：**
- 轉換後的 JavaScript 值（number | boolean | string | null | undefined）

### envBool(val, mode2?)

將環境變數值轉換為 JavaScript 類型值，支援布林轉換模式。

**參數：**
- `val` - 環境變數值
- `mode2` - 是否啟用嚴格布林模式（預設 `true`）

**回傳值：**
- `mode2 = true`: 若值為數字或布林則回傳，否則回傳 `false`
- `mode2 = false`: 回傳轉換後的值

### envBool2(val)

將環境變數值轉換為真正的 JavaScript 布林值。

**與 envBool 的差異：**
- `envBool('1', true)` 回傳 `1`（數字）
- `envBool2('1')` 使用 `!!` 雙重否定將數字轉為布林：`!!1` = `true`

**envBool2 使用 `!!` 雙重否定將結果轉為布林值：**
- 數字會根據 truthy/falsy 轉換（0 為 false，非 0 為 true）

**參數：**
- `val` - 環境變數值

**回傳值：**
- `true` - 當值為 truthy（數字非 0、true、'true'、'yes'、'on'、'enabled' 等）
- `false` - 當值為 falsy（0、false、'false'、'no'、'off'、null、undefined、''、{}、[] 等）

**範例：**
```ts
// 數字字串 - 使用 !! 轉換
envBool2('1')       // => true (!!1 === true)
envBool2('0')       // => false (!!0 === false)
envBool2(99)        // => true (!!99 === true)
envBool2(0)         // => false (!!0 === false)

// 布林值字串
envBool2('true')    // => true
envBool2('false')   // => false
envBool2('yes')     // => true
envBool2('no')      // => false
envBool2('on')      // => true
envBool2('off')     // => false
envBool2('enabled') // => true
envBool2('disabled') // => false

// 其他類型
envBool2(null)      // => false
envBool2(undefined) // => false
envBool2({})        // => false
envBool2([])        // => false
envBool2('')        // => false

// 特殊數值
envBool2(-1)        // => true (!!-1 === true)
envBool2(Infinity)  // => true (!!Infinity === true)
envBool2(NaN)       // => false (!!NaN === false)
```

## 測試結果範例 (Test Results)

```
  test\index.test.ts
    '1'
      √ envBool: 1, mode2 = false
      √ envVal: 1
      √ envBool: 1, mode2 = true
    '0'
      √ envBool: 0, mode2 = false
      √ envVal: 0
      √ envBool: 0, mode2 = true
    true
      √ envBool: true, mode2 = false
      √ envVal: true
      √ envBool: true, mode2 = true
    false
      √ envBool: false, mode2 = false
      √ envVal: false
      √ envBool: false, mode2 = true
    'yes'
      √ envBool: true, mode2 = false
      √ envVal: true
      √ envBool: true, mode2 = true
    'no'
      √ envBool: false, mode2 = false
      √ envVal: false
      √ envBool: false, mode2 = true
    'on'
      √ envBool: true, mode2 = false
      √ envVal: true
      √ envBool: true, mode2 = true
    'off'
      √ envBool: false, mode2 = false
      √ envVal: false
      √ envBool: false, mode2 = true
    'enabled'
      √ envBool: true, mode2 = false
      √ envVal: true
      √ envBool: true, mode2 = true
    'disabled'
      √ envBool: false, mode2 = false
      √ envVal: false
      √ envBool: false, mode2 = true
    '99'
      √ envBool: 99, mode2 = false
      √ envVal: 99
      √ envBool: 99, mode2 = true
    '99.9'
      √ envBool: 99.9, mode2 = false
      √ envVal: 99.9
      √ envBool: 99.9, mode2 = true
```

## 授權 (License)

ISC