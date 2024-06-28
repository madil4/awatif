function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var t = arguments[e2];
      for (var r in t)
        ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
var DEFAULT_CONFIG = {
  // minimum relative difference between two compared values,
  // used by all comparison functions
  epsilon: 1e-12,
  // type of default matrix output. Choose 'matrix' (default) or 'array'
  matrix: "Matrix",
  // type of default number output. Choose 'number' (default) 'BigNumber', or 'Fraction
  number: "number",
  // number of significant digits in BigNumbers
  precision: 64,
  // predictable output type of functions. When true, output type depends only
  // on the input types. When false (default), output type can vary depending
  // on input values. For example `math.sqrt(-4)` returns `complex('2i')` when
  // predictable is false, and returns `NaN` when true.
  predictable: false,
  // random seed for seeded pseudo random number generation
  // null = randomly seed
  randomSeed: null
};
function isNumber(x) {
  return typeof x === "number";
}
function isBigNumber(x) {
  if (!x || typeof x !== "object" || typeof x.constructor !== "function") {
    return false;
  }
  if (x.isBigNumber === true && typeof x.constructor.prototype === "object" && x.constructor.prototype.isBigNumber === true) {
    return true;
  }
  if (typeof x.constructor.isDecimal === "function" && x.constructor.isDecimal(x) === true) {
    return true;
  }
  return false;
}
function isComplex(x) {
  return x && typeof x === "object" && Object.getPrototypeOf(x).isComplex === true || false;
}
function isFraction(x) {
  return x && typeof x === "object" && Object.getPrototypeOf(x).isFraction === true || false;
}
function isUnit(x) {
  return x && x.constructor.prototype.isUnit === true || false;
}
function isString(x) {
  return typeof x === "string";
}
var isArray = Array.isArray;
function isMatrix(x) {
  return x && x.constructor.prototype.isMatrix === true || false;
}
function isCollection(x) {
  return Array.isArray(x) || isMatrix(x);
}
function isDenseMatrix(x) {
  return x && x.isDenseMatrix && x.constructor.prototype.isMatrix === true || false;
}
function isSparseMatrix(x) {
  return x && x.isSparseMatrix && x.constructor.prototype.isMatrix === true || false;
}
function isRange(x) {
  return x && x.constructor.prototype.isRange === true || false;
}
function isIndex(x) {
  return x && x.constructor.prototype.isIndex === true || false;
}
function isBoolean(x) {
  return typeof x === "boolean";
}
function isResultSet(x) {
  return x && x.constructor.prototype.isResultSet === true || false;
}
function isHelp(x) {
  return x && x.constructor.prototype.isHelp === true || false;
}
function isFunction(x) {
  return typeof x === "function";
}
function isDate(x) {
  return x instanceof Date;
}
function isRegExp(x) {
  return x instanceof RegExp;
}
function isObject(x) {
  return !!(x && typeof x === "object" && x.constructor === Object && !isComplex(x) && !isFraction(x));
}
function isNull(x) {
  return x === null;
}
function isUndefined(x) {
  return x === void 0;
}
function isAccessorNode(x) {
  return x && x.isAccessorNode === true && x.constructor.prototype.isNode === true || false;
}
function isArrayNode(x) {
  return x && x.isArrayNode === true && x.constructor.prototype.isNode === true || false;
}
function isAssignmentNode(x) {
  return x && x.isAssignmentNode === true && x.constructor.prototype.isNode === true || false;
}
function isBlockNode(x) {
  return x && x.isBlockNode === true && x.constructor.prototype.isNode === true || false;
}
function isConditionalNode(x) {
  return x && x.isConditionalNode === true && x.constructor.prototype.isNode === true || false;
}
function isConstantNode(x) {
  return x && x.isConstantNode === true && x.constructor.prototype.isNode === true || false;
}
function rule2Node(node) {
  return isConstantNode(node) || isOperatorNode(node) && node.args.length === 1 && isConstantNode(node.args[0]) && "-+~".includes(node.op);
}
function isFunctionAssignmentNode(x) {
  return x && x.isFunctionAssignmentNode === true && x.constructor.prototype.isNode === true || false;
}
function isFunctionNode(x) {
  return x && x.isFunctionNode === true && x.constructor.prototype.isNode === true || false;
}
function isIndexNode(x) {
  return x && x.isIndexNode === true && x.constructor.prototype.isNode === true || false;
}
function isNode(x) {
  return x && x.isNode === true && x.constructor.prototype.isNode === true || false;
}
function isObjectNode(x) {
  return x && x.isObjectNode === true && x.constructor.prototype.isNode === true || false;
}
function isOperatorNode(x) {
  return x && x.isOperatorNode === true && x.constructor.prototype.isNode === true || false;
}
function isParenthesisNode(x) {
  return x && x.isParenthesisNode === true && x.constructor.prototype.isNode === true || false;
}
function isRangeNode(x) {
  return x && x.isRangeNode === true && x.constructor.prototype.isNode === true || false;
}
function isRelationalNode(x) {
  return x && x.isRelationalNode === true && x.constructor.prototype.isNode === true || false;
}
function isSymbolNode(x) {
  return x && x.isSymbolNode === true && x.constructor.prototype.isNode === true || false;
}
function isChain(x) {
  return x && x.constructor.prototype.isChain === true || false;
}
function typeOf$1(x) {
  var t = typeof x;
  if (t === "object") {
    if (x === null)
      return "null";
    if (isBigNumber(x))
      return "BigNumber";
    if (x.constructor && x.constructor.name)
      return x.constructor.name;
    return "Object";
  }
  return t;
}
function clone$3(x) {
  var type = typeof x;
  if (type === "number" || type === "string" || type === "boolean" || x === null || x === void 0) {
    return x;
  }
  if (typeof x.clone === "function") {
    return x.clone();
  }
  if (Array.isArray(x)) {
    return x.map(function(value) {
      return clone$3(value);
    });
  }
  if (x instanceof Date)
    return new Date(x.valueOf());
  if (isBigNumber(x))
    return x;
  if (isObject(x)) {
    return mapObject(x, clone$3);
  }
  throw new TypeError("Cannot clone: unknown type of value (value: ".concat(x, ")"));
}
function mapObject(object, callback) {
  var clone2 = {};
  for (var key in object) {
    if (hasOwnProperty(object, key)) {
      clone2[key] = callback(object[key]);
    }
  }
  return clone2;
}
function extend(a, b) {
  for (var prop in b) {
    if (hasOwnProperty(b, prop)) {
      a[prop] = b[prop];
    }
  }
  return a;
}
function deepStrictEqual(a, b) {
  var prop, i2, len;
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (i2 = 0, len = a.length; i2 < len; i2++) {
      if (!deepStrictEqual(a[i2], b[i2])) {
        return false;
      }
    }
    return true;
  } else if (typeof a === "function") {
    return a === b;
  } else if (a instanceof Object) {
    if (Array.isArray(b) || !(b instanceof Object)) {
      return false;
    }
    for (prop in a) {
      if (!(prop in b) || !deepStrictEqual(a[prop], b[prop])) {
        return false;
      }
    }
    for (prop in b) {
      if (!(prop in a)) {
        return false;
      }
    }
    return true;
  } else {
    return a === b;
  }
}
function lazy(object, prop, valueResolver) {
  var _uninitialized = true;
  var _value;
  Object.defineProperty(object, prop, {
    get: function get() {
      if (_uninitialized) {
        _value = valueResolver();
        _uninitialized = false;
      }
      return _value;
    },
    set: function set(value) {
      _value = value;
      _uninitialized = false;
    },
    configurable: true,
    enumerable: true
  });
}
function hasOwnProperty(object, property) {
  return object && Object.hasOwnProperty.call(object, property);
}
function pickShallow(object, properties) {
  var copy = {};
  for (var i2 = 0; i2 < properties.length; i2++) {
    var key = properties[i2];
    var value = object[key];
    if (value !== void 0) {
      copy[key] = value;
    }
  }
  return copy;
}
var MATRIX_OPTIONS = ["Matrix", "Array"];
var NUMBER_OPTIONS = ["number", "BigNumber", "Fraction"];
var config$1 = function config(options) {
  if (options) {
    throw new Error("The global config is readonly. \nPlease create a mathjs instance if you want to change the default configuration. \nExample:\n\n  import { create, all } from 'mathjs';\n  const mathjs = create(all);\n  mathjs.config({ number: 'BigNumber' });\n");
  }
  return Object.freeze(DEFAULT_CONFIG);
};
_extends(config$1, DEFAULT_CONFIG, {
  MATRIX_OPTIONS,
  NUMBER_OPTIONS
});
function ok() {
  return true;
}
function notOk() {
  return false;
}
function undef() {
  return void 0;
}
const NOT_TYPED_FUNCTION = "Argument is not a typed-function.";
function create() {
  function isPlainObject2(x) {
    return typeof x === "object" && x !== null && x.constructor === Object;
  }
  const _types = [{
    name: "number",
    test: function(x) {
      return typeof x === "number";
    }
  }, {
    name: "string",
    test: function(x) {
      return typeof x === "string";
    }
  }, {
    name: "boolean",
    test: function(x) {
      return typeof x === "boolean";
    }
  }, {
    name: "Function",
    test: function(x) {
      return typeof x === "function";
    }
  }, {
    name: "Array",
    test: Array.isArray
  }, {
    name: "Date",
    test: function(x) {
      return x instanceof Date;
    }
  }, {
    name: "RegExp",
    test: function(x) {
      return x instanceof RegExp;
    }
  }, {
    name: "Object",
    test: isPlainObject2
  }, {
    name: "null",
    test: function(x) {
      return x === null;
    }
  }, {
    name: "undefined",
    test: function(x) {
      return x === void 0;
    }
  }];
  const anyType = {
    name: "any",
    test: ok,
    isAny: true
  };
  let typeMap;
  let typeList;
  let nConversions = 0;
  let typed2 = {
    createCount: 0
  };
  function findType(typeName) {
    const type = typeMap.get(typeName);
    if (type) {
      return type;
    }
    let message = 'Unknown type "' + typeName + '"';
    const name2 = typeName.toLowerCase();
    let otherName;
    for (otherName of typeList) {
      if (otherName.toLowerCase() === name2) {
        message += '. Did you mean "' + otherName + '" ?';
        break;
      }
    }
    throw new TypeError(message);
  }
  function addTypes(types) {
    let beforeSpec = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "any";
    const beforeIndex = beforeSpec ? findType(beforeSpec).index : typeList.length;
    const newTypes = [];
    for (let i2 = 0; i2 < types.length; ++i2) {
      if (!types[i2] || typeof types[i2].name !== "string" || typeof types[i2].test !== "function") {
        throw new TypeError("Object with properties {name: string, test: function} expected");
      }
      const typeName = types[i2].name;
      if (typeMap.has(typeName)) {
        throw new TypeError('Duplicate type name "' + typeName + '"');
      }
      newTypes.push(typeName);
      typeMap.set(typeName, {
        name: typeName,
        test: types[i2].test,
        isAny: types[i2].isAny,
        index: beforeIndex + i2,
        conversionsTo: []
        // Newly added type can't have any conversions to it
      });
    }
    const affectedTypes = typeList.slice(beforeIndex);
    typeList = typeList.slice(0, beforeIndex).concat(newTypes).concat(affectedTypes);
    for (let i2 = beforeIndex + newTypes.length; i2 < typeList.length; ++i2) {
      typeMap.get(typeList[i2]).index = i2;
    }
  }
  function clear() {
    typeMap = /* @__PURE__ */ new Map();
    typeList = [];
    nConversions = 0;
    addTypes([anyType], false);
  }
  clear();
  addTypes(_types);
  function clearConversions() {
    let typeName;
    for (typeName of typeList) {
      typeMap.get(typeName).conversionsTo = [];
    }
    nConversions = 0;
  }
  function findTypeNames(value) {
    const matches = typeList.filter((name2) => {
      const type = typeMap.get(name2);
      return !type.isAny && type.test(value);
    });
    if (matches.length) {
      return matches;
    }
    return ["any"];
  }
  function isTypedFunction(entity) {
    return entity && typeof entity === "function" && "_typedFunctionData" in entity;
  }
  function findSignature(fn, signature, options) {
    if (!isTypedFunction(fn)) {
      throw new TypeError(NOT_TYPED_FUNCTION);
    }
    const exact = options && options.exact;
    const stringSignature = Array.isArray(signature) ? signature.join(",") : signature;
    const params = parseSignature(stringSignature);
    const canonicalSignature = stringifyParams(params);
    if (!exact || canonicalSignature in fn.signatures) {
      const match = fn._typedFunctionData.signatureMap.get(canonicalSignature);
      if (match) {
        return match;
      }
    }
    const nParams = params.length;
    let remainingSignatures;
    if (exact) {
      remainingSignatures = [];
      let name2;
      for (name2 in fn.signatures) {
        remainingSignatures.push(fn._typedFunctionData.signatureMap.get(name2));
      }
    } else {
      remainingSignatures = fn._typedFunctionData.signatures;
    }
    for (let i2 = 0; i2 < nParams; ++i2) {
      const want = params[i2];
      const filteredSignatures = [];
      let possibility;
      for (possibility of remainingSignatures) {
        const have = getParamAtIndex(possibility.params, i2);
        if (!have || want.restParam && !have.restParam) {
          continue;
        }
        if (!have.hasAny) {
          const haveTypes = paramTypeSet(have);
          if (want.types.some((wtype) => !haveTypes.has(wtype.name))) {
            continue;
          }
        }
        filteredSignatures.push(possibility);
      }
      remainingSignatures = filteredSignatures;
      if (remainingSignatures.length === 0)
        break;
    }
    let candidate;
    for (candidate of remainingSignatures) {
      if (candidate.params.length <= nParams) {
        return candidate;
      }
    }
    throw new TypeError("Signature not found (signature: " + (fn.name || "unnamed") + "(" + stringifyParams(params, ", ") + "))");
  }
  function find(fn, signature, options) {
    return findSignature(fn, signature, options).implementation;
  }
  function convert(value, typeName) {
    const type = findType(typeName);
    if (type.test(value)) {
      return value;
    }
    const conversions = type.conversionsTo;
    if (conversions.length === 0) {
      throw new Error("There are no conversions to " + typeName + " defined.");
    }
    for (let i2 = 0; i2 < conversions.length; i2++) {
      const fromType = findType(conversions[i2].from);
      if (fromType.test(value)) {
        return conversions[i2].convert(value);
      }
    }
    throw new Error("Cannot convert " + value + " to " + typeName);
  }
  function stringifyParams(params) {
    let separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ",";
    return params.map((p) => p.name).join(separator);
  }
  function parseParam(param) {
    const restParam = param.indexOf("...") === 0;
    const types = !restParam ? param : param.length > 3 ? param.slice(3) : "any";
    const typeDefs = types.split("|").map((s) => findType(s.trim()));
    let hasAny = false;
    let paramName = restParam ? "..." : "";
    const exactTypes = typeDefs.map(function(type) {
      hasAny = type.isAny || hasAny;
      paramName += type.name + "|";
      return {
        name: type.name,
        typeIndex: type.index,
        test: type.test,
        isAny: type.isAny,
        conversion: null,
        conversionIndex: -1
      };
    });
    return {
      types: exactTypes,
      name: paramName.slice(0, -1),
      // remove trailing '|' from above
      hasAny,
      hasConversion: false,
      restParam
    };
  }
  function expandParam(param) {
    const typeNames = param.types.map((t) => t.name);
    const matchingConversions = availableConversions(typeNames);
    let hasAny = param.hasAny;
    let newName = param.name;
    const convertibleTypes = matchingConversions.map(function(conversion) {
      const type = findType(conversion.from);
      hasAny = type.isAny || hasAny;
      newName += "|" + conversion.from;
      return {
        name: conversion.from,
        typeIndex: type.index,
        test: type.test,
        isAny: type.isAny,
        conversion,
        conversionIndex: conversion.index
      };
    });
    return {
      types: param.types.concat(convertibleTypes),
      name: newName,
      hasAny,
      hasConversion: convertibleTypes.length > 0,
      restParam: param.restParam
    };
  }
  function paramTypeSet(param) {
    if (!param.typeSet) {
      param.typeSet = /* @__PURE__ */ new Set();
      param.types.forEach((type) => param.typeSet.add(type.name));
    }
    return param.typeSet;
  }
  function parseSignature(rawSignature) {
    const params = [];
    if (typeof rawSignature !== "string") {
      throw new TypeError("Signatures must be strings");
    }
    const signature = rawSignature.trim();
    if (signature === "") {
      return params;
    }
    const rawParams = signature.split(",");
    for (let i2 = 0; i2 < rawParams.length; ++i2) {
      const parsedParam = parseParam(rawParams[i2].trim());
      if (parsedParam.restParam && i2 !== rawParams.length - 1) {
        throw new SyntaxError('Unexpected rest parameter "' + rawParams[i2] + '": only allowed for the last parameter');
      }
      if (parsedParam.types.length === 0) {
        return null;
      }
      params.push(parsedParam);
    }
    return params;
  }
  function hasRestParam(params) {
    const param = last(params);
    return param ? param.restParam : false;
  }
  function compileTest(param) {
    if (!param || param.types.length === 0) {
      return ok;
    } else if (param.types.length === 1) {
      return findType(param.types[0].name).test;
    } else if (param.types.length === 2) {
      const test0 = findType(param.types[0].name).test;
      const test1 = findType(param.types[1].name).test;
      return function or2(x) {
        return test0(x) || test1(x);
      };
    } else {
      const tests = param.types.map(function(type) {
        return findType(type.name).test;
      });
      return function or2(x) {
        for (let i2 = 0; i2 < tests.length; i2++) {
          if (tests[i2](x)) {
            return true;
          }
        }
        return false;
      };
    }
  }
  function compileTests(params) {
    let tests, test0, test1;
    if (hasRestParam(params)) {
      tests = initial(params).map(compileTest);
      const varIndex = tests.length;
      const lastTest = compileTest(last(params));
      const testRestParam = function(args) {
        for (let i2 = varIndex; i2 < args.length; i2++) {
          if (!lastTest(args[i2])) {
            return false;
          }
        }
        return true;
      };
      return function testArgs(args) {
        for (let i2 = 0; i2 < tests.length; i2++) {
          if (!tests[i2](args[i2])) {
            return false;
          }
        }
        return testRestParam(args) && args.length >= varIndex + 1;
      };
    } else {
      if (params.length === 0) {
        return function testArgs(args) {
          return args.length === 0;
        };
      } else if (params.length === 1) {
        test0 = compileTest(params[0]);
        return function testArgs(args) {
          return test0(args[0]) && args.length === 1;
        };
      } else if (params.length === 2) {
        test0 = compileTest(params[0]);
        test1 = compileTest(params[1]);
        return function testArgs(args) {
          return test0(args[0]) && test1(args[1]) && args.length === 2;
        };
      } else {
        tests = params.map(compileTest);
        return function testArgs(args) {
          for (let i2 = 0; i2 < tests.length; i2++) {
            if (!tests[i2](args[i2])) {
              return false;
            }
          }
          return args.length === tests.length;
        };
      }
    }
  }
  function getParamAtIndex(params, index2) {
    return index2 < params.length ? params[index2] : hasRestParam(params) ? last(params) : null;
  }
  function getTypeSetAtIndex(params, index2) {
    const param = getParamAtIndex(params, index2);
    if (!param) {
      return /* @__PURE__ */ new Set();
    }
    return paramTypeSet(param);
  }
  function isExactType(type) {
    return type.conversion === null || type.conversion === void 0;
  }
  function mergeExpectedParams(signatures, index2) {
    const typeSet = /* @__PURE__ */ new Set();
    signatures.forEach((signature) => {
      const paramSet = getTypeSetAtIndex(signature.params, index2);
      let name2;
      for (name2 of paramSet) {
        typeSet.add(name2);
      }
    });
    return typeSet.has("any") ? ["any"] : Array.from(typeSet);
  }
  function createError(name2, args, signatures) {
    let err, expected;
    const _name = name2 || "unnamed";
    let matchingSignatures = signatures;
    let index2;
    for (index2 = 0; index2 < args.length; index2++) {
      const nextMatchingDefs = [];
      matchingSignatures.forEach((signature) => {
        const param = getParamAtIndex(signature.params, index2);
        const test = compileTest(param);
        if ((index2 < signature.params.length || hasRestParam(signature.params)) && test(args[index2])) {
          nextMatchingDefs.push(signature);
        }
      });
      if (nextMatchingDefs.length === 0) {
        expected = mergeExpectedParams(matchingSignatures, index2);
        if (expected.length > 0) {
          const actualTypes = findTypeNames(args[index2]);
          err = new TypeError("Unexpected type of argument in function " + _name + " (expected: " + expected.join(" or ") + ", actual: " + actualTypes.join(" | ") + ", index: " + index2 + ")");
          err.data = {
            category: "wrongType",
            fn: _name,
            index: index2,
            actual: actualTypes,
            expected
          };
          return err;
        }
      } else {
        matchingSignatures = nextMatchingDefs;
      }
    }
    const lengths = matchingSignatures.map(function(signature) {
      return hasRestParam(signature.params) ? Infinity : signature.params.length;
    });
    if (args.length < Math.min.apply(null, lengths)) {
      expected = mergeExpectedParams(matchingSignatures, index2);
      err = new TypeError("Too few arguments in function " + _name + " (expected: " + expected.join(" or ") + ", index: " + args.length + ")");
      err.data = {
        category: "tooFewArgs",
        fn: _name,
        index: args.length,
        expected
      };
      return err;
    }
    const maxLength = Math.max.apply(null, lengths);
    if (args.length > maxLength) {
      err = new TypeError("Too many arguments in function " + _name + " (expected: " + maxLength + ", actual: " + args.length + ")");
      err.data = {
        category: "tooManyArgs",
        fn: _name,
        index: args.length,
        expectedLength: maxLength
      };
      return err;
    }
    const argTypes = [];
    for (let i2 = 0; i2 < args.length; ++i2) {
      argTypes.push(findTypeNames(args[i2]).join("|"));
    }
    err = new TypeError('Arguments of type "' + argTypes.join(", ") + '" do not match any of the defined signatures of function ' + _name + ".");
    err.data = {
      category: "mismatch",
      actual: argTypes
    };
    return err;
  }
  function getLowestTypeIndex(param) {
    let min2 = typeList.length + 1;
    for (let i2 = 0; i2 < param.types.length; i2++) {
      if (isExactType(param.types[i2])) {
        min2 = Math.min(min2, param.types[i2].typeIndex);
      }
    }
    return min2;
  }
  function getLowestConversionIndex(param) {
    let min2 = nConversions + 1;
    for (let i2 = 0; i2 < param.types.length; i2++) {
      if (!isExactType(param.types[i2])) {
        min2 = Math.min(min2, param.types[i2].conversionIndex);
      }
    }
    return min2;
  }
  function compareParams(param1, param2) {
    if (param1.hasAny) {
      if (!param2.hasAny) {
        return 1;
      }
    } else if (param2.hasAny) {
      return -1;
    }
    if (param1.restParam) {
      if (!param2.restParam) {
        return 1;
      }
    } else if (param2.restParam) {
      return -1;
    }
    if (param1.hasConversion) {
      if (!param2.hasConversion) {
        return 1;
      }
    } else if (param2.hasConversion) {
      return -1;
    }
    const typeDiff = getLowestTypeIndex(param1) - getLowestTypeIndex(param2);
    if (typeDiff < 0) {
      return -1;
    }
    if (typeDiff > 0) {
      return 1;
    }
    const convDiff = getLowestConversionIndex(param1) - getLowestConversionIndex(param2);
    if (convDiff < 0) {
      return -1;
    }
    if (convDiff > 0) {
      return 1;
    }
    return 0;
  }
  function compareSignatures(signature1, signature2) {
    const pars1 = signature1.params;
    const pars2 = signature2.params;
    const last1 = last(pars1);
    const last2 = last(pars2);
    const hasRest1 = hasRestParam(pars1);
    const hasRest2 = hasRestParam(pars2);
    if (hasRest1 && last1.hasAny) {
      if (!hasRest2 || !last2.hasAny) {
        return 1;
      }
    } else if (hasRest2 && last2.hasAny) {
      return -1;
    }
    let any1 = 0;
    let conv1 = 0;
    let par;
    for (par of pars1) {
      if (par.hasAny)
        ++any1;
      if (par.hasConversion)
        ++conv1;
    }
    let any2 = 0;
    let conv2 = 0;
    for (par of pars2) {
      if (par.hasAny)
        ++any2;
      if (par.hasConversion)
        ++conv2;
    }
    if (any1 !== any2) {
      return any1 - any2;
    }
    if (hasRest1 && last1.hasConversion) {
      if (!hasRest2 || !last2.hasConversion) {
        return 1;
      }
    } else if (hasRest2 && last2.hasConversion) {
      return -1;
    }
    if (conv1 !== conv2) {
      return conv1 - conv2;
    }
    if (hasRest1) {
      if (!hasRest2) {
        return 1;
      }
    } else if (hasRest2) {
      return -1;
    }
    const lengthCriterion = (pars1.length - pars2.length) * (hasRest1 ? -1 : 1);
    if (lengthCriterion !== 0) {
      return lengthCriterion;
    }
    const comparisons = [];
    let tc = 0;
    for (let i2 = 0; i2 < pars1.length; ++i2) {
      const thisComparison = compareParams(pars1[i2], pars2[i2]);
      comparisons.push(thisComparison);
      tc += thisComparison;
    }
    if (tc !== 0) {
      return tc;
    }
    let c;
    for (c of comparisons) {
      if (c !== 0) {
        return c;
      }
    }
    return 0;
  }
  function availableConversions(typeNames) {
    if (typeNames.length === 0) {
      return [];
    }
    const types = typeNames.map(findType);
    if (typeNames.length > 1) {
      types.sort((t1, t2) => t1.index - t2.index);
    }
    let matches = types[0].conversionsTo;
    if (typeNames.length === 1) {
      return matches;
    }
    matches = matches.concat([]);
    const knownTypes = new Set(typeNames);
    for (let i2 = 1; i2 < types.length; ++i2) {
      let newMatch;
      for (newMatch of types[i2].conversionsTo) {
        if (!knownTypes.has(newMatch.from)) {
          matches.push(newMatch);
          knownTypes.add(newMatch.from);
        }
      }
    }
    return matches;
  }
  function compileArgsPreprocessing(params, fn) {
    let fnConvert = fn;
    if (params.some((p) => p.hasConversion)) {
      const restParam = hasRestParam(params);
      const compiledConversions = params.map(compileArgConversion);
      fnConvert = function convertArgs() {
        const args = [];
        const last2 = restParam ? arguments.length - 1 : arguments.length;
        for (let i2 = 0; i2 < last2; i2++) {
          args[i2] = compiledConversions[i2](arguments[i2]);
        }
        if (restParam) {
          args[last2] = arguments[last2].map(compiledConversions[last2]);
        }
        return fn.apply(this, args);
      };
    }
    let fnPreprocess = fnConvert;
    if (hasRestParam(params)) {
      const offset = params.length - 1;
      fnPreprocess = function preprocessRestParams() {
        return fnConvert.apply(this, slice(arguments, 0, offset).concat([slice(arguments, offset)]));
      };
    }
    return fnPreprocess;
  }
  function compileArgConversion(param) {
    let test0, test1, conversion0, conversion1;
    const tests = [];
    const conversions = [];
    param.types.forEach(function(type) {
      if (type.conversion) {
        tests.push(findType(type.conversion.from).test);
        conversions.push(type.conversion.convert);
      }
    });
    switch (conversions.length) {
      case 0:
        return function convertArg(arg2) {
          return arg2;
        };
      case 1:
        test0 = tests[0];
        conversion0 = conversions[0];
        return function convertArg(arg2) {
          if (test0(arg2)) {
            return conversion0(arg2);
          }
          return arg2;
        };
      case 2:
        test0 = tests[0];
        test1 = tests[1];
        conversion0 = conversions[0];
        conversion1 = conversions[1];
        return function convertArg(arg2) {
          if (test0(arg2)) {
            return conversion0(arg2);
          }
          if (test1(arg2)) {
            return conversion1(arg2);
          }
          return arg2;
        };
      default:
        return function convertArg(arg2) {
          for (let i2 = 0; i2 < conversions.length; i2++) {
            if (tests[i2](arg2)) {
              return conversions[i2](arg2);
            }
          }
          return arg2;
        };
    }
  }
  function splitParams(params) {
    function _splitParams(params2, index2, paramsSoFar) {
      if (index2 < params2.length) {
        const param = params2[index2];
        let resultingParams = [];
        if (param.restParam) {
          const exactTypes = param.types.filter(isExactType);
          if (exactTypes.length < param.types.length) {
            resultingParams.push({
              types: exactTypes,
              name: "..." + exactTypes.map((t) => t.name).join("|"),
              hasAny: exactTypes.some((t) => t.isAny),
              hasConversion: false,
              restParam: true
            });
          }
          resultingParams.push(param);
        } else {
          resultingParams = param.types.map(function(type) {
            return {
              types: [type],
              name: type.name,
              hasAny: type.isAny,
              hasConversion: type.conversion,
              restParam: false
            };
          });
        }
        return flatMap(resultingParams, function(nextParam) {
          return _splitParams(params2, index2 + 1, paramsSoFar.concat([nextParam]));
        });
      } else {
        return [paramsSoFar];
      }
    }
    return _splitParams(params, 0, []);
  }
  function conflicting(params1, params2) {
    const ii = Math.max(params1.length, params2.length);
    for (let i2 = 0; i2 < ii; i2++) {
      const typeSet1 = getTypeSetAtIndex(params1, i2);
      const typeSet2 = getTypeSetAtIndex(params2, i2);
      let overlap = false;
      let name2;
      for (name2 of typeSet2) {
        if (typeSet1.has(name2)) {
          overlap = true;
          break;
        }
      }
      if (!overlap) {
        return false;
      }
    }
    const len1 = params1.length;
    const len2 = params2.length;
    const restParam1 = hasRestParam(params1);
    const restParam2 = hasRestParam(params2);
    return restParam1 ? restParam2 ? len1 === len2 : len2 >= len1 : restParam2 ? len1 >= len2 : len1 === len2;
  }
  function clearResolutions(functionList) {
    return functionList.map((fn) => {
      if (isReferToSelf(fn)) {
        return referToSelf(fn.referToSelf.callback);
      }
      if (isReferTo(fn)) {
        return makeReferTo(fn.referTo.references, fn.referTo.callback);
      }
      return fn;
    });
  }
  function collectResolutions(references, functionList, signatureMap) {
    const resolvedReferences = [];
    let reference;
    for (reference of references) {
      let resolution = signatureMap[reference];
      if (typeof resolution !== "number") {
        throw new TypeError('No definition for referenced signature "' + reference + '"');
      }
      resolution = functionList[resolution];
      if (typeof resolution !== "function") {
        return false;
      }
      resolvedReferences.push(resolution);
    }
    return resolvedReferences;
  }
  function resolveReferences(functionList, signatureMap, self2) {
    const resolvedFunctions = clearResolutions(functionList);
    const isResolved = new Array(resolvedFunctions.length).fill(false);
    let leftUnresolved = true;
    while (leftUnresolved) {
      leftUnresolved = false;
      let nothingResolved = true;
      for (let i2 = 0; i2 < resolvedFunctions.length; ++i2) {
        if (isResolved[i2])
          continue;
        const fn = resolvedFunctions[i2];
        if (isReferToSelf(fn)) {
          resolvedFunctions[i2] = fn.referToSelf.callback(self2);
          resolvedFunctions[i2].referToSelf = fn.referToSelf;
          isResolved[i2] = true;
          nothingResolved = false;
        } else if (isReferTo(fn)) {
          const resolvedReferences = collectResolutions(fn.referTo.references, resolvedFunctions, signatureMap);
          if (resolvedReferences) {
            resolvedFunctions[i2] = fn.referTo.callback.apply(this, resolvedReferences);
            resolvedFunctions[i2].referTo = fn.referTo;
            isResolved[i2] = true;
            nothingResolved = false;
          } else {
            leftUnresolved = true;
          }
        }
      }
      if (nothingResolved && leftUnresolved) {
        throw new SyntaxError("Circular reference detected in resolving typed.referTo");
      }
    }
    return resolvedFunctions;
  }
  function validateDeprecatedThis(signaturesMap) {
    const deprecatedThisRegex = /\bthis(\(|\.signatures\b)/;
    Object.keys(signaturesMap).forEach((signature) => {
      const fn = signaturesMap[signature];
      if (deprecatedThisRegex.test(fn.toString())) {
        throw new SyntaxError("Using `this` to self-reference a function is deprecated since typed-function@3. Use typed.referTo and typed.referToSelf instead.");
      }
    });
  }
  function createTypedFunction(name2, rawSignaturesMap) {
    typed2.createCount++;
    if (Object.keys(rawSignaturesMap).length === 0) {
      throw new SyntaxError("No signatures provided");
    }
    if (typed2.warnAgainstDeprecatedThis) {
      validateDeprecatedThis(rawSignaturesMap);
    }
    const parsedParams = [];
    const originalFunctions = [];
    const signaturesMap = {};
    const preliminarySignatures = [];
    let signature;
    for (signature in rawSignaturesMap) {
      if (!Object.prototype.hasOwnProperty.call(rawSignaturesMap, signature)) {
        continue;
      }
      const params = parseSignature(signature);
      if (!params)
        continue;
      parsedParams.forEach(function(pp) {
        if (conflicting(pp, params)) {
          throw new TypeError('Conflicting signatures "' + stringifyParams(pp) + '" and "' + stringifyParams(params) + '".');
        }
      });
      parsedParams.push(params);
      const functionIndex = originalFunctions.length;
      originalFunctions.push(rawSignaturesMap[signature]);
      const conversionParams = params.map(expandParam);
      let sp;
      for (sp of splitParams(conversionParams)) {
        const spName = stringifyParams(sp);
        preliminarySignatures.push({
          params: sp,
          name: spName,
          fn: functionIndex
        });
        if (sp.every((p) => !p.hasConversion)) {
          signaturesMap[spName] = functionIndex;
        }
      }
    }
    preliminarySignatures.sort(compareSignatures);
    const resolvedFunctions = resolveReferences(originalFunctions, signaturesMap, theTypedFn);
    let s;
    for (s in signaturesMap) {
      if (Object.prototype.hasOwnProperty.call(signaturesMap, s)) {
        signaturesMap[s] = resolvedFunctions[signaturesMap[s]];
      }
    }
    const signatures = [];
    const internalSignatureMap = /* @__PURE__ */ new Map();
    for (s of preliminarySignatures) {
      if (!internalSignatureMap.has(s.name)) {
        s.fn = resolvedFunctions[s.fn];
        signatures.push(s);
        internalSignatureMap.set(s.name, s);
      }
    }
    const ok0 = signatures[0] && signatures[0].params.length <= 2 && !hasRestParam(signatures[0].params);
    const ok1 = signatures[1] && signatures[1].params.length <= 2 && !hasRestParam(signatures[1].params);
    const ok2 = signatures[2] && signatures[2].params.length <= 2 && !hasRestParam(signatures[2].params);
    const ok3 = signatures[3] && signatures[3].params.length <= 2 && !hasRestParam(signatures[3].params);
    const ok4 = signatures[4] && signatures[4].params.length <= 2 && !hasRestParam(signatures[4].params);
    const ok5 = signatures[5] && signatures[5].params.length <= 2 && !hasRestParam(signatures[5].params);
    const allOk = ok0 && ok1 && ok2 && ok3 && ok4 && ok5;
    for (let i2 = 0; i2 < signatures.length; ++i2) {
      signatures[i2].test = compileTests(signatures[i2].params);
    }
    const test00 = ok0 ? compileTest(signatures[0].params[0]) : notOk;
    const test10 = ok1 ? compileTest(signatures[1].params[0]) : notOk;
    const test20 = ok2 ? compileTest(signatures[2].params[0]) : notOk;
    const test30 = ok3 ? compileTest(signatures[3].params[0]) : notOk;
    const test40 = ok4 ? compileTest(signatures[4].params[0]) : notOk;
    const test50 = ok5 ? compileTest(signatures[5].params[0]) : notOk;
    const test01 = ok0 ? compileTest(signatures[0].params[1]) : notOk;
    const test11 = ok1 ? compileTest(signatures[1].params[1]) : notOk;
    const test21 = ok2 ? compileTest(signatures[2].params[1]) : notOk;
    const test31 = ok3 ? compileTest(signatures[3].params[1]) : notOk;
    const test41 = ok4 ? compileTest(signatures[4].params[1]) : notOk;
    const test51 = ok5 ? compileTest(signatures[5].params[1]) : notOk;
    for (let i2 = 0; i2 < signatures.length; ++i2) {
      signatures[i2].implementation = compileArgsPreprocessing(signatures[i2].params, signatures[i2].fn);
    }
    const fn0 = ok0 ? signatures[0].implementation : undef;
    const fn1 = ok1 ? signatures[1].implementation : undef;
    const fn2 = ok2 ? signatures[2].implementation : undef;
    const fn3 = ok3 ? signatures[3].implementation : undef;
    const fn4 = ok4 ? signatures[4].implementation : undef;
    const fn5 = ok5 ? signatures[5].implementation : undef;
    const len0 = ok0 ? signatures[0].params.length : -1;
    const len1 = ok1 ? signatures[1].params.length : -1;
    const len2 = ok2 ? signatures[2].params.length : -1;
    const len3 = ok3 ? signatures[3].params.length : -1;
    const len4 = ok4 ? signatures[4].params.length : -1;
    const len5 = ok5 ? signatures[5].params.length : -1;
    const iStart = allOk ? 6 : 0;
    const iEnd = signatures.length;
    const tests = signatures.map((s2) => s2.test);
    const fns = signatures.map((s2) => s2.implementation);
    const generic = function generic2() {
      for (let i2 = iStart; i2 < iEnd; i2++) {
        if (tests[i2](arguments)) {
          return fns[i2].apply(this, arguments);
        }
      }
      return typed2.onMismatch(name2, arguments, signatures);
    };
    function theTypedFn(arg0, arg1) {
      if (arguments.length === len0 && test00(arg0) && test01(arg1)) {
        return fn0.apply(this, arguments);
      }
      if (arguments.length === len1 && test10(arg0) && test11(arg1)) {
        return fn1.apply(this, arguments);
      }
      if (arguments.length === len2 && test20(arg0) && test21(arg1)) {
        return fn2.apply(this, arguments);
      }
      if (arguments.length === len3 && test30(arg0) && test31(arg1)) {
        return fn3.apply(this, arguments);
      }
      if (arguments.length === len4 && test40(arg0) && test41(arg1)) {
        return fn4.apply(this, arguments);
      }
      if (arguments.length === len5 && test50(arg0) && test51(arg1)) {
        return fn5.apply(this, arguments);
      }
      return generic.apply(this, arguments);
    }
    try {
      Object.defineProperty(theTypedFn, "name", {
        value: name2
      });
    } catch (err) {
    }
    theTypedFn.signatures = signaturesMap;
    theTypedFn._typedFunctionData = {
      signatures,
      signatureMap: internalSignatureMap
    };
    return theTypedFn;
  }
  function _onMismatch(name2, args, signatures) {
    throw createError(name2, args, signatures);
  }
  function initial(arr) {
    return slice(arr, 0, arr.length - 1);
  }
  function last(arr) {
    return arr[arr.length - 1];
  }
  function slice(arr, start, end) {
    return Array.prototype.slice.call(arr, start, end);
  }
  function findInArray(arr, test) {
    for (let i2 = 0; i2 < arr.length; i2++) {
      if (test(arr[i2])) {
        return arr[i2];
      }
    }
    return void 0;
  }
  function flatMap(arr, callback) {
    return Array.prototype.concat.apply([], arr.map(callback));
  }
  function referTo() {
    const references = initial(arguments).map((s) => stringifyParams(parseSignature(s)));
    const callback = last(arguments);
    if (typeof callback !== "function") {
      throw new TypeError("Callback function expected as last argument");
    }
    return makeReferTo(references, callback);
  }
  function makeReferTo(references, callback) {
    return {
      referTo: {
        references,
        callback
      }
    };
  }
  function referToSelf(callback) {
    if (typeof callback !== "function") {
      throw new TypeError("Callback function expected as first argument");
    }
    return {
      referToSelf: {
        callback
      }
    };
  }
  function isReferTo(objectOrFn) {
    return objectOrFn && typeof objectOrFn.referTo === "object" && Array.isArray(objectOrFn.referTo.references) && typeof objectOrFn.referTo.callback === "function";
  }
  function isReferToSelf(objectOrFn) {
    return objectOrFn && typeof objectOrFn.referToSelf === "object" && typeof objectOrFn.referToSelf.callback === "function";
  }
  function checkName(nameSoFar, newName) {
    if (!nameSoFar) {
      return newName;
    }
    if (newName && newName !== nameSoFar) {
      const err = new Error("Function names do not match (expected: " + nameSoFar + ", actual: " + newName + ")");
      err.data = {
        actual: newName,
        expected: nameSoFar
      };
      throw err;
    }
    return nameSoFar;
  }
  function getObjectName(obj) {
    let name2;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && (isTypedFunction(obj[key]) || typeof obj[key].signature === "string")) {
        name2 = checkName(name2, obj[key].name);
      }
    }
    return name2;
  }
  function mergeSignatures(dest, source) {
    let key;
    for (key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (key in dest) {
          if (source[key] !== dest[key]) {
            const err = new Error('Signature "' + key + '" is defined twice');
            err.data = {
              signature: key,
              sourceFunction: source[key],
              destFunction: dest[key]
            };
            throw err;
          }
        }
        dest[key] = source[key];
      }
    }
  }
  const saveTyped = typed2;
  typed2 = function(maybeName) {
    const named = typeof maybeName === "string";
    const start = named ? 1 : 0;
    let name2 = named ? maybeName : "";
    const allSignatures = {};
    for (let i2 = start; i2 < arguments.length; ++i2) {
      const item = arguments[i2];
      let theseSignatures = {};
      let thisName;
      if (typeof item === "function") {
        thisName = item.name;
        if (typeof item.signature === "string") {
          theseSignatures[item.signature] = item;
        } else if (isTypedFunction(item)) {
          theseSignatures = item.signatures;
        }
      } else if (isPlainObject2(item)) {
        theseSignatures = item;
        if (!named) {
          thisName = getObjectName(item);
        }
      }
      if (Object.keys(theseSignatures).length === 0) {
        const err = new TypeError("Argument to 'typed' at index " + i2 + " is not a (typed) function, nor an object with signatures as keys and functions as values.");
        err.data = {
          index: i2,
          argument: item
        };
        throw err;
      }
      if (!named) {
        name2 = checkName(name2, thisName);
      }
      mergeSignatures(allSignatures, theseSignatures);
    }
    return createTypedFunction(name2 || "", allSignatures);
  };
  typed2.create = create;
  typed2.createCount = saveTyped.createCount;
  typed2.onMismatch = _onMismatch;
  typed2.throwMismatchError = _onMismatch;
  typed2.createError = createError;
  typed2.clear = clear;
  typed2.clearConversions = clearConversions;
  typed2.addTypes = addTypes;
  typed2._findType = findType;
  typed2.referTo = referTo;
  typed2.referToSelf = referToSelf;
  typed2.convert = convert;
  typed2.findSignature = findSignature;
  typed2.find = find;
  typed2.isTypedFunction = isTypedFunction;
  typed2.warnAgainstDeprecatedThis = true;
  typed2.addType = function(type, beforeObjectTest) {
    let before = "any";
    if (beforeObjectTest !== false && typeMap.has("Object")) {
      before = "Object";
    }
    typed2.addTypes([type], before);
  };
  function _validateConversion(conversion) {
    if (!conversion || typeof conversion.from !== "string" || typeof conversion.to !== "string" || typeof conversion.convert !== "function") {
      throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");
    }
    if (conversion.to === conversion.from) {
      throw new SyntaxError('Illegal to define conversion from "' + conversion.from + '" to itself.');
    }
  }
  typed2.addConversion = function(conversion) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      override: false
    };
    _validateConversion(conversion);
    const to2 = findType(conversion.to);
    const existing = to2.conversionsTo.find((other) => other.from === conversion.from);
    if (existing) {
      if (options && options.override) {
        typed2.removeConversion({
          from: existing.from,
          to: conversion.to,
          convert: existing.convert
        });
      } else {
        throw new Error('There is already a conversion from "' + conversion.from + '" to "' + to2.name + '"');
      }
    }
    to2.conversionsTo.push({
      from: conversion.from,
      convert: conversion.convert,
      index: nConversions++
    });
  };
  typed2.addConversions = function(conversions, options) {
    conversions.forEach((conversion) => typed2.addConversion(conversion, options));
  };
  typed2.removeConversion = function(conversion) {
    _validateConversion(conversion);
    const to2 = findType(conversion.to);
    const existingConversion = findInArray(to2.conversionsTo, (c) => c.from === conversion.from);
    if (!existingConversion) {
      throw new Error("Attempt to remove nonexistent conversion from " + conversion.from + " to " + conversion.to);
    }
    if (existingConversion.convert !== conversion.convert) {
      throw new Error("Conversion to remove does not match existing conversion");
    }
    const index2 = to2.conversionsTo.indexOf(existingConversion);
    to2.conversionsTo.splice(index2, 1);
  };
  typed2.resolve = function(tf, argList) {
    if (!isTypedFunction(tf)) {
      throw new TypeError(NOT_TYPED_FUNCTION);
    }
    const sigs = tf._typedFunctionData.signatures;
    for (let i2 = 0; i2 < sigs.length; ++i2) {
      if (sigs[i2].test(argList)) {
        return sigs[i2];
      }
    }
    return null;
  };
  return typed2;
}
const typedFunction = create();
function isInteger$1(value) {
  if (typeof value === "boolean") {
    return true;
  }
  return isFinite(value) ? value === Math.round(value) : false;
}
var sign$2 = Math.sign || function(x) {
  if (x > 0) {
    return 1;
  } else if (x < 0) {
    return -1;
  } else {
    return 0;
  }
};
var log2$2 = Math.log2 || function log2(x) {
  return Math.log(x) / Math.LN2;
};
var log10$2 = Math.log10 || function log10(x) {
  return Math.log(x) / Math.LN10;
};
var log1p$1 = Math.log1p || function(x) {
  return Math.log(x + 1);
};
var cbrt$2 = Math.cbrt || function cbrt(x) {
  if (x === 0) {
    return x;
  }
  var negate = x < 0;
  var result;
  if (negate) {
    x = -x;
  }
  if (isFinite(x)) {
    result = Math.exp(Math.log(x) / 3);
    result = (x / (result * result) + 2 * result) / 3;
  } else {
    result = x;
  }
  return negate ? -result : result;
};
var expm1$1 = Math.expm1 || function expm1(x) {
  return x >= 2e-4 || x <= -2e-4 ? Math.exp(x) - 1 : x + x * x / 2 + x * x * x / 6;
};
function formatNumberToBase(n, base, size2) {
  var prefixes = {
    2: "0b",
    8: "0o",
    16: "0x"
  };
  var prefix = prefixes[base];
  var suffix = "";
  if (size2) {
    if (size2 < 1) {
      throw new Error("size must be in greater than 0");
    }
    if (!isInteger$1(size2)) {
      throw new Error("size must be an integer");
    }
    if (n > 2 ** (size2 - 1) - 1 || n < -(2 ** (size2 - 1))) {
      throw new Error("Value must be in range [-2^".concat(size2 - 1, ", 2^").concat(size2 - 1, "-1]"));
    }
    if (!isInteger$1(n)) {
      throw new Error("Value must be an integer");
    }
    if (n < 0) {
      n = n + 2 ** size2;
    }
    suffix = "i".concat(size2);
  }
  var sign2 = "";
  if (n < 0) {
    n = -n;
    sign2 = "-";
  }
  return "".concat(sign2).concat(prefix).concat(n.toString(base)).concat(suffix);
}
function format$3(value, options) {
  if (typeof options === "function") {
    return options(value);
  }
  if (value === Infinity) {
    return "Infinity";
  } else if (value === -Infinity) {
    return "-Infinity";
  } else if (isNaN(value)) {
    return "NaN";
  }
  var {
    notation,
    precision,
    wordSize
  } = normalizeFormatOptions(options);
  switch (notation) {
    case "fixed":
      return toFixed$1(value, precision);
    case "exponential":
      return toExponential$1(value, precision);
    case "engineering":
      return toEngineering$1(value, precision);
    case "bin":
      return formatNumberToBase(value, 2, wordSize);
    case "oct":
      return formatNumberToBase(value, 8, wordSize);
    case "hex":
      return formatNumberToBase(value, 16, wordSize);
    case "auto":
      return toPrecision(value, precision, options).replace(/((\.\d*?)(0+))($|e)/, function() {
        var digits2 = arguments[2];
        var e2 = arguments[4];
        return digits2 !== "." ? digits2 + e2 : e2;
      });
    default:
      throw new Error('Unknown notation "' + notation + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function normalizeFormatOptions(options) {
  var notation = "auto";
  var precision;
  var wordSize;
  if (options !== void 0) {
    if (isNumber(options)) {
      precision = options;
    } else if (isBigNumber(options)) {
      precision = options.toNumber();
    } else if (isObject(options)) {
      if (options.precision !== void 0) {
        precision = _toNumberOrThrow(options.precision, () => {
          throw new Error('Option "precision" must be a number or BigNumber');
        });
      }
      if (options.wordSize !== void 0) {
        wordSize = _toNumberOrThrow(options.wordSize, () => {
          throw new Error('Option "wordSize" must be a number or BigNumber');
        });
      }
      if (options.notation) {
        notation = options.notation;
      }
    } else {
      throw new Error("Unsupported type of options, number, BigNumber, or object expected");
    }
  }
  return {
    notation,
    precision,
    wordSize
  };
}
function splitNumber(value) {
  var match = String(value).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
  if (!match) {
    throw new SyntaxError("Invalid number " + value);
  }
  var sign2 = match[1];
  var digits2 = match[2];
  var exponent = parseFloat(match[4] || "0");
  var dot2 = digits2.indexOf(".");
  exponent += dot2 !== -1 ? dot2 - 1 : digits2.length - 1;
  var coefficients = digits2.replace(".", "").replace(/^0*/, function(zeros2) {
    exponent -= zeros2.length;
    return "";
  }).replace(/0*$/, "").split("").map(function(d) {
    return parseInt(d);
  });
  if (coefficients.length === 0) {
    coefficients.push(0);
    exponent++;
  }
  return {
    sign: sign2,
    coefficients,
    exponent
  };
}
function toEngineering$1(value, precision) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }
  var split = splitNumber(value);
  var rounded = roundDigits(split, precision);
  var e2 = rounded.exponent;
  var c = rounded.coefficients;
  var newExp = e2 % 3 === 0 ? e2 : e2 < 0 ? e2 - 3 - e2 % 3 : e2 - e2 % 3;
  if (isNumber(precision)) {
    while (precision > c.length || e2 - newExp + 1 > c.length) {
      c.push(0);
    }
  } else {
    var missingZeros = Math.abs(e2 - newExp) - (c.length - 1);
    for (var i2 = 0; i2 < missingZeros; i2++) {
      c.push(0);
    }
  }
  var expDiff = Math.abs(e2 - newExp);
  var decimalIdx = 1;
  while (expDiff > 0) {
    decimalIdx++;
    expDiff--;
  }
  var decimals = c.slice(decimalIdx).join("");
  var decimalVal = isNumber(precision) && decimals.length || decimals.match(/[1-9]/) ? "." + decimals : "";
  var str = c.slice(0, decimalIdx).join("") + decimalVal + "e" + (e2 >= 0 ? "+" : "") + newExp.toString();
  return rounded.sign + str;
}
function toFixed$1(value, precision) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }
  var splitValue = splitNumber(value);
  var rounded = typeof precision === "number" ? roundDigits(splitValue, splitValue.exponent + 1 + precision) : splitValue;
  var c = rounded.coefficients;
  var p = rounded.exponent + 1;
  var pp = p + (precision || 0);
  if (c.length < pp) {
    c = c.concat(zeros$1(pp - c.length));
  }
  if (p < 0) {
    c = zeros$1(-p + 1).concat(c);
    p = 1;
  }
  if (p < c.length) {
    c.splice(p, 0, p === 0 ? "0." : ".");
  }
  return rounded.sign + c.join("");
}
function toExponential$1(value, precision) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }
  var split = splitNumber(value);
  var rounded = precision ? roundDigits(split, precision) : split;
  var c = rounded.coefficients;
  var e2 = rounded.exponent;
  if (c.length < precision) {
    c = c.concat(zeros$1(precision - c.length));
  }
  var first = c.shift();
  return rounded.sign + first + (c.length > 0 ? "." + c.join("") : "") + "e" + (e2 >= 0 ? "+" : "") + e2;
}
function toPrecision(value, precision, options) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }
  var lowerExp = _toNumberOrDefault$1(options === null || options === void 0 ? void 0 : options.lowerExp, -3);
  var upperExp = _toNumberOrDefault$1(options === null || options === void 0 ? void 0 : options.upperExp, 5);
  var split = splitNumber(value);
  var rounded = precision ? roundDigits(split, precision) : split;
  if (rounded.exponent < lowerExp || rounded.exponent >= upperExp) {
    return toExponential$1(value, precision);
  } else {
    var c = rounded.coefficients;
    var e2 = rounded.exponent;
    if (c.length < precision) {
      c = c.concat(zeros$1(precision - c.length));
    }
    c = c.concat(zeros$1(e2 - c.length + 1 + (c.length < precision ? precision - c.length : 0)));
    c = zeros$1(-e2).concat(c);
    var dot2 = e2 > 0 ? e2 : 0;
    if (dot2 < c.length - 1) {
      c.splice(dot2 + 1, 0, ".");
    }
    return rounded.sign + c.join("");
  }
}
function roundDigits(split, precision) {
  var rounded = {
    sign: split.sign,
    coefficients: split.coefficients,
    exponent: split.exponent
  };
  var c = rounded.coefficients;
  while (precision <= 0) {
    c.unshift(0);
    rounded.exponent++;
    precision++;
  }
  if (c.length > precision) {
    var removed = c.splice(precision, c.length - precision);
    if (removed[0] >= 5) {
      var i2 = precision - 1;
      c[i2]++;
      while (c[i2] === 10) {
        c.pop();
        if (i2 === 0) {
          c.unshift(0);
          rounded.exponent++;
          i2++;
        }
        i2--;
        c[i2]++;
      }
    }
  }
  return rounded;
}
function zeros$1(length) {
  var arr = [];
  for (var i2 = 0; i2 < length; i2++) {
    arr.push(0);
  }
  return arr;
}
function digits(value) {
  return value.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
}
var DBL_EPSILON = Number.EPSILON || 2220446049250313e-31;
function nearlyEqual$1(x, y, epsilon) {
  if (epsilon === null || epsilon === void 0) {
    return x === y;
  }
  if (x === y) {
    return true;
  }
  if (isNaN(x) || isNaN(y)) {
    return false;
  }
  if (isFinite(x) && isFinite(y)) {
    var diff2 = Math.abs(x - y);
    if (diff2 <= DBL_EPSILON) {
      return true;
    } else {
      return diff2 <= Math.max(Math.abs(x), Math.abs(y)) * epsilon;
    }
  }
  return false;
}
var acosh$2 = Math.acosh || function(x) {
  return Math.log(Math.sqrt(x * x - 1) + x);
};
var asinh$2 = Math.asinh || function(x) {
  return Math.log(Math.sqrt(x * x + 1) + x);
};
var atanh$2 = Math.atanh || function(x) {
  return Math.log((1 + x) / (1 - x)) / 2;
};
var cosh$2 = Math.cosh || function(x) {
  return (Math.exp(x) + Math.exp(-x)) / 2;
};
var sinh$2 = Math.sinh || function(x) {
  return (Math.exp(x) - Math.exp(-x)) / 2;
};
var tanh$2 = Math.tanh || function(x) {
  var e2 = Math.exp(2 * x);
  return (e2 - 1) / (e2 + 1);
};
function copysign(x, y) {
  var signx = true;
  var signy = y > 0 ? true : y < 0 ? false : 1 / y === Infinity;
  return signx ^ signy ? -x : x;
}
function _toNumberOrThrow(value, onError) {
  if (isNumber(value)) {
    return value;
  } else if (isBigNumber(value)) {
    return value.toNumber();
  } else {
    onError();
  }
}
function _toNumberOrDefault$1(value, defaultValue) {
  if (isNumber(value)) {
    return value;
  } else if (isBigNumber(value)) {
    return value.toNumber();
  } else {
    return defaultValue;
  }
}
function factory(name2, dependencies2, create2, meta) {
  function assertAndCreate(scope) {
    var deps = pickShallow(scope, dependencies2.map(stripOptionalNotation));
    assertDependencies(name2, dependencies2, scope);
    return create2(deps);
  }
  assertAndCreate.isFactory = true;
  assertAndCreate.fn = name2;
  assertAndCreate.dependencies = dependencies2.slice().sort();
  if (meta) {
    assertAndCreate.meta = meta;
  }
  return assertAndCreate;
}
function assertDependencies(name2, dependencies2, scope) {
  var allDefined = dependencies2.filter((dependency) => !isOptionalDependency(dependency)).every((dependency) => scope[dependency] !== void 0);
  if (!allDefined) {
    var missingDependencies = dependencies2.filter((dependency) => scope[dependency] === void 0);
    throw new Error('Cannot create function "'.concat(name2, '", ') + "some dependencies are missing: ".concat(missingDependencies.map((d) => '"'.concat(d, '"')).join(", "), "."));
  }
}
function isOptionalDependency(dependency) {
  return dependency && dependency[0] === "?";
}
function stripOptionalNotation(dependency) {
  return dependency && dependency[0] === "?" ? dependency.slice(1) : dependency;
}
function getSafeProperty(object, prop) {
  if (isPlainObject(object) && isSafeProperty(object, prop)) {
    return object[prop];
  }
  if (typeof object[prop] === "function" && isSafeMethod(object, prop)) {
    throw new Error('Cannot access method "' + prop + '" as a property');
  }
  throw new Error('No access to property "' + prop + '"');
}
function setSafeProperty(object, prop, value) {
  if (isPlainObject(object) && isSafeProperty(object, prop)) {
    object[prop] = value;
    return value;
  }
  throw new Error('No access to property "' + prop + '"');
}
function hasSafeProperty(object, prop) {
  return prop in object;
}
function isSafeProperty(object, prop) {
  if (!object || typeof object !== "object") {
    return false;
  }
  if (hasOwnProperty(safeNativeProperties, prop)) {
    return true;
  }
  if (prop in Object.prototype) {
    return false;
  }
  if (prop in Function.prototype) {
    return false;
  }
  return true;
}
function getSafeMethod(object, method) {
  if (!isSafeMethod(object, method)) {
    throw new Error('No access to method "' + method + '"');
  }
  return object[method];
}
function isSafeMethod(object, method) {
  if (object === null || object === void 0 || typeof object[method] !== "function") {
    return false;
  }
  if (hasOwnProperty(object, method) && Object.getPrototypeOf && method in Object.getPrototypeOf(object)) {
    return false;
  }
  if (hasOwnProperty(safeNativeMethods, method)) {
    return true;
  }
  if (method in Object.prototype) {
    return false;
  }
  if (method in Function.prototype) {
    return false;
  }
  return true;
}
function isPlainObject(object) {
  return typeof object === "object" && object && object.constructor === Object;
}
var safeNativeProperties = {
  length: true,
  name: true
};
var safeNativeMethods = {
  toString: true,
  valueOf: true,
  toLocaleString: true
};
class ObjectWrappingMap {
  constructor(object) {
    this.wrappedObject = object;
    this[Symbol.iterator] = this.entries;
  }
  keys() {
    return Object.keys(this.wrappedObject).values();
  }
  get(key) {
    return getSafeProperty(this.wrappedObject, key);
  }
  set(key, value) {
    setSafeProperty(this.wrappedObject, key, value);
    return this;
  }
  has(key) {
    return hasSafeProperty(this.wrappedObject, key);
  }
  entries() {
    return mapIterator(this.keys(), (key) => [key, this.get(key)]);
  }
  forEach(callback) {
    for (var key of this.keys()) {
      callback(this.get(key), key, this);
    }
  }
  delete(key) {
    delete this.wrappedObject[key];
  }
  clear() {
    for (var key of this.keys()) {
      this.delete(key);
    }
  }
  get size() {
    return Object.keys(this.wrappedObject).length;
  }
}
class PartitionedMap {
  /**
   * @param {Map} a
   * @param {Map} b
   * @param {Set} bKeys
   */
  constructor(a, b, bKeys) {
    this.a = a;
    this.b = b;
    this.bKeys = bKeys;
    this[Symbol.iterator] = this.entries;
  }
  get(key) {
    return this.bKeys.has(key) ? this.b.get(key) : this.a.get(key);
  }
  set(key, value) {
    if (this.bKeys.has(key)) {
      this.b.set(key, value);
    } else {
      this.a.set(key, value);
    }
    return this;
  }
  has(key) {
    return this.b.has(key) || this.a.has(key);
  }
  keys() {
    return (/* @__PURE__ */ new Set([...this.a.keys(), ...this.b.keys()]))[Symbol.iterator]();
  }
  entries() {
    return mapIterator(this.keys(), (key) => [key, this.get(key)]);
  }
  forEach(callback) {
    for (var key of this.keys()) {
      callback(this.get(key), key, this);
    }
  }
  delete(key) {
    return this.bKeys.has(key) ? this.b.delete(key) : this.a.delete(key);
  }
  clear() {
    this.a.clear();
    this.b.clear();
  }
  get size() {
    return [...this.keys()].length;
  }
}
function mapIterator(it, callback) {
  return {
    next: () => {
      var n = it.next();
      return n.done ? n : {
        value: callback(n.value),
        done: false
      };
    }
  };
}
function createEmptyMap() {
  return /* @__PURE__ */ new Map();
}
function createMap$1(mapOrObject) {
  if (!mapOrObject) {
    return createEmptyMap();
  }
  if (isMap(mapOrObject)) {
    return mapOrObject;
  }
  if (isObject(mapOrObject)) {
    return new ObjectWrappingMap(mapOrObject);
  }
  throw new Error("createMap can create maps from objects or Maps");
}
function toObject(map2) {
  if (map2 instanceof ObjectWrappingMap) {
    return map2.wrappedObject;
  }
  var object = {};
  for (var key of map2.keys()) {
    var value = map2.get(key);
    setSafeProperty(object, key, value);
  }
  return object;
}
function isMap(object) {
  if (!object) {
    return false;
  }
  return object instanceof Map || object instanceof ObjectWrappingMap || typeof object.set === "function" && typeof object.get === "function" && typeof object.keys === "function" && typeof object.has === "function";
}
var _createTyped2 = function _createTyped() {
  _createTyped2 = typedFunction.create;
  return typedFunction;
};
var dependencies$3Z = ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"];
var createTyped = /* @__PURE__ */ factory("typed", dependencies$3Z, function createTyped2(_ref) {
  var {
    BigNumber: BigNumber2,
    Complex: Complex2,
    DenseMatrix: DenseMatrix2,
    Fraction: Fraction2
  } = _ref;
  var typed2 = _createTyped2();
  typed2.clear();
  typed2.addTypes([
    {
      name: "number",
      test: isNumber
    },
    {
      name: "Complex",
      test: isComplex
    },
    {
      name: "BigNumber",
      test: isBigNumber
    },
    {
      name: "Fraction",
      test: isFraction
    },
    {
      name: "Unit",
      test: isUnit
    },
    // The following type matches a valid variable name, i.e., an alphanumeric
    // string starting with an alphabetic character. It is used (at least)
    // in the definition of the derivative() function, as the argument telling
    // what to differentiate over must (currently) be a variable.
    {
      name: "identifier",
      test: (s) => isString && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(s)
    },
    {
      name: "string",
      test: isString
    },
    {
      name: "Chain",
      test: isChain
    },
    {
      name: "Array",
      test: isArray
    },
    {
      name: "Matrix",
      test: isMatrix
    },
    {
      name: "DenseMatrix",
      test: isDenseMatrix
    },
    {
      name: "SparseMatrix",
      test: isSparseMatrix
    },
    {
      name: "Range",
      test: isRange
    },
    {
      name: "Index",
      test: isIndex
    },
    {
      name: "boolean",
      test: isBoolean
    },
    {
      name: "ResultSet",
      test: isResultSet
    },
    {
      name: "Help",
      test: isHelp
    },
    {
      name: "function",
      test: isFunction
    },
    {
      name: "Date",
      test: isDate
    },
    {
      name: "RegExp",
      test: isRegExp
    },
    {
      name: "null",
      test: isNull
    },
    {
      name: "undefined",
      test: isUndefined
    },
    {
      name: "AccessorNode",
      test: isAccessorNode
    },
    {
      name: "ArrayNode",
      test: isArrayNode
    },
    {
      name: "AssignmentNode",
      test: isAssignmentNode
    },
    {
      name: "BlockNode",
      test: isBlockNode
    },
    {
      name: "ConditionalNode",
      test: isConditionalNode
    },
    {
      name: "ConstantNode",
      test: isConstantNode
    },
    {
      name: "FunctionNode",
      test: isFunctionNode
    },
    {
      name: "FunctionAssignmentNode",
      test: isFunctionAssignmentNode
    },
    {
      name: "IndexNode",
      test: isIndexNode
    },
    {
      name: "Node",
      test: isNode
    },
    {
      name: "ObjectNode",
      test: isObjectNode
    },
    {
      name: "OperatorNode",
      test: isOperatorNode
    },
    {
      name: "ParenthesisNode",
      test: isParenthesisNode
    },
    {
      name: "RangeNode",
      test: isRangeNode
    },
    {
      name: "RelationalNode",
      test: isRelationalNode
    },
    {
      name: "SymbolNode",
      test: isSymbolNode
    },
    {
      name: "Map",
      test: isMap
    },
    {
      name: "Object",
      test: isObject
    }
    // order 'Object' last, it matches on other classes too
  ]);
  typed2.addConversions([{
    from: "number",
    to: "BigNumber",
    convert: function convert(x) {
      if (!BigNumber2) {
        throwNoBignumber(x);
      }
      if (digits(x) > 15) {
        throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + x + "). Use function bignumber(x) to convert to BigNumber.");
      }
      return new BigNumber2(x);
    }
  }, {
    from: "number",
    to: "Complex",
    convert: function convert(x) {
      if (!Complex2) {
        throwNoComplex(x);
      }
      return new Complex2(x, 0);
    }
  }, {
    from: "BigNumber",
    to: "Complex",
    convert: function convert(x) {
      if (!Complex2) {
        throwNoComplex(x);
      }
      return new Complex2(x.toNumber(), 0);
    }
  }, {
    from: "Fraction",
    to: "BigNumber",
    convert: function convert(x) {
      throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
    }
  }, {
    from: "Fraction",
    to: "Complex",
    convert: function convert(x) {
      if (!Complex2) {
        throwNoComplex(x);
      }
      return new Complex2(x.valueOf(), 0);
    }
  }, {
    from: "number",
    to: "Fraction",
    convert: function convert(x) {
      if (!Fraction2) {
        throwNoFraction(x);
      }
      var f = new Fraction2(x);
      if (f.valueOf() !== x) {
        throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + x + "). Use function fraction(x) to convert to Fraction.");
      }
      return f;
    }
  }, {
    // FIXME: add conversion from Fraction to number, for example for `sqrt(fraction(1,3))`
    //  from: 'Fraction',
    //  to: 'number',
    //  convert: function (x) {
    //    return x.valueOf()
    //  }
    // }, {
    from: "string",
    to: "number",
    convert: function convert(x) {
      var n = Number(x);
      if (isNaN(n)) {
        throw new Error('Cannot convert "' + x + '" to a number');
      }
      return n;
    }
  }, {
    from: "string",
    to: "BigNumber",
    convert: function convert(x) {
      if (!BigNumber2) {
        throwNoBignumber(x);
      }
      try {
        return new BigNumber2(x);
      } catch (err) {
        throw new Error('Cannot convert "' + x + '" to BigNumber');
      }
    }
  }, {
    from: "string",
    to: "Fraction",
    convert: function convert(x) {
      if (!Fraction2) {
        throwNoFraction(x);
      }
      try {
        return new Fraction2(x);
      } catch (err) {
        throw new Error('Cannot convert "' + x + '" to Fraction');
      }
    }
  }, {
    from: "string",
    to: "Complex",
    convert: function convert(x) {
      if (!Complex2) {
        throwNoComplex(x);
      }
      try {
        return new Complex2(x);
      } catch (err) {
        throw new Error('Cannot convert "' + x + '" to Complex');
      }
    }
  }, {
    from: "boolean",
    to: "number",
    convert: function convert(x) {
      return +x;
    }
  }, {
    from: "boolean",
    to: "BigNumber",
    convert: function convert(x) {
      if (!BigNumber2) {
        throwNoBignumber(x);
      }
      return new BigNumber2(+x);
    }
  }, {
    from: "boolean",
    to: "Fraction",
    convert: function convert(x) {
      if (!Fraction2) {
        throwNoFraction(x);
      }
      return new Fraction2(+x);
    }
  }, {
    from: "boolean",
    to: "string",
    convert: function convert(x) {
      return String(x);
    }
  }, {
    from: "Array",
    to: "Matrix",
    convert: function convert(array) {
      if (!DenseMatrix2) {
        throwNoMatrix();
      }
      return new DenseMatrix2(array);
    }
  }, {
    from: "Matrix",
    to: "Array",
    convert: function convert(matrix2) {
      return matrix2.valueOf();
    }
  }]);
  typed2.onMismatch = (name2, args, signatures) => {
    var usualError = typed2.createError(name2, args, signatures);
    if (["wrongType", "mismatch"].includes(usualError.data.category) && args.length === 1 && isCollection(args[0]) && // check if the function can be unary:
    signatures.some((sig) => !sig.params.includes(","))) {
      var err = new TypeError("Function '".concat(name2, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(name2, ")'."));
      err.data = usualError.data;
      throw err;
    }
    throw usualError;
  };
  typed2.onMismatch = (name2, args, signatures) => {
    var usualError = typed2.createError(name2, args, signatures);
    if (["wrongType", "mismatch"].includes(usualError.data.category) && args.length === 1 && isCollection(args[0]) && // check if the function can be unary:
    signatures.some((sig) => !sig.params.includes(","))) {
      var err = new TypeError("Function '".concat(name2, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(name2, ")'."));
      err.data = usualError.data;
      throw err;
    }
    throw usualError;
  };
  return typed2;
});
function throwNoBignumber(x) {
  throw new Error("Cannot convert value ".concat(x, " into a BigNumber: no class 'BigNumber' provided"));
}
function throwNoComplex(x) {
  throw new Error("Cannot convert value ".concat(x, " into a Complex number: no class 'Complex' provided"));
}
function throwNoMatrix() {
  throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
}
function throwNoFraction(x) {
  throw new Error("Cannot convert value ".concat(x, " into a Fraction, no class 'Fraction' provided."));
}
var name$3Z = "ResultSet";
var dependencies$3Y = [];
var createResultSet = /* @__PURE__ */ factory(name$3Z, dependencies$3Y, () => {
  function ResultSet2(entries) {
    if (!(this instanceof ResultSet2)) {
      throw new SyntaxError("Constructor must be called with the new operator");
    }
    this.entries = entries || [];
  }
  ResultSet2.prototype.type = "ResultSet";
  ResultSet2.prototype.isResultSet = true;
  ResultSet2.prototype.valueOf = function() {
    return this.entries;
  };
  ResultSet2.prototype.toString = function() {
    return "[" + this.entries.join(", ") + "]";
  };
  ResultSet2.prototype.toJSON = function() {
    return {
      mathjs: "ResultSet",
      entries: this.entries
    };
  };
  ResultSet2.fromJSON = function(json) {
    return new ResultSet2(json.entries);
  };
  return ResultSet2;
}, {
  isClass: true
});
/*!
 *  decimal.js v10.4.3
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
var EXP_LIMIT = 9e15, MAX_DIGITS = 1e9, NUMERALS = "0123456789abcdef", LN10$1 = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", DEFAULTS = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed at run-time using the `Decimal.config` method.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used when rounding to `precision`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The modulo mode used when calculating the modulus: a mod n.
  // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
  // The remainder (r) is calculated as: r = a - n * q.
  //
  // UP         0 The remainder is positive if the dividend is negative, else is negative.
  // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
  // FLOOR      3 The remainder has the same sign as the divisor (Python %).
  // HALF_EVEN  6 The IEEE 754 remainder function.
  // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
  //
  // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
  // division (9) are commonly used for the modulus operation. The other rounding modes can also
  // be used, but they may not give useful results.
  modulo: 1,
  // 0 to 9
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -EXP_LIMIT
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to EXP_LIMIT
  // The minimum exponent value, beneath which underflow to zero occurs.
  // JavaScript numbers: -324  (5e-324)
  minE: -EXP_LIMIT,
  // -1 to -EXP_LIMIT
  // The maximum exponent value, above which overflow to Infinity occurs.
  // JavaScript numbers: 308  (1.7976931348623157e+308)
  maxE: EXP_LIMIT,
  // 1 to EXP_LIMIT
  // Whether to use cryptographically-secure random number generation, if available.
  crypto: false
  // true/false
}, inexact, quadrant, external = true, decimalError = "[DecimalError] ", invalidArgument = decimalError + "Invalid argument: ", precisionLimitExceeded = decimalError + "Precision limit exceeded", cryptoUnavailable = decimalError + "crypto unavailable", tag = "[object Decimal]", mathfloor = Math.floor, mathpow = Math.pow, isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, BASE = 1e7, LOG_BASE = 7, MAX_SAFE_INTEGER = 9007199254740991, LN10_PRECISION = LN10$1.length - 1, PI_PRECISION = PI.length - 1, P$1 = { toStringTag: tag };
P$1.absoluteValue = P$1.abs = function() {
  var x = new this.constructor(this);
  if (x.s < 0)
    x.s = 1;
  return finalise(x);
};
P$1.ceil = function() {
  return finalise(new this.constructor(this), this.e + 1, 2);
};
P$1.clampedTo = P$1.clamp = function(min2, max2) {
  var k, x = this, Ctor = x.constructor;
  min2 = new Ctor(min2);
  max2 = new Ctor(max2);
  if (!min2.s || !max2.s)
    return new Ctor(NaN);
  if (min2.gt(max2))
    throw Error(invalidArgument + max2);
  k = x.cmp(min2);
  return k < 0 ? min2 : x.cmp(max2) > 0 ? max2 : new Ctor(x);
};
P$1.comparedTo = P$1.cmp = function(y) {
  var i2, j, xdL, ydL, x = this, xd = x.d, yd = (y = new x.constructor(y)).d, xs = x.s, ys = y.s;
  if (!xd || !yd) {
    return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
  }
  if (!xd[0] || !yd[0])
    return xd[0] ? xs : yd[0] ? -ys : 0;
  if (xs !== ys)
    return xs;
  if (x.e !== y.e)
    return x.e > y.e ^ xs < 0 ? 1 : -1;
  xdL = xd.length;
  ydL = yd.length;
  for (i2 = 0, j = xdL < ydL ? xdL : ydL; i2 < j; ++i2) {
    if (xd[i2] !== yd[i2])
      return xd[i2] > yd[i2] ^ xs < 0 ? 1 : -1;
  }
  return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
};
P$1.cosine = P$1.cos = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.d)
    return new Ctor(NaN);
  if (!x.d[0])
    return new Ctor(1);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;
  x = cosine(Ctor, toLessThanHalfPi(Ctor, x));
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
};
P$1.cubeRoot = P$1.cbrt = function() {
  var e2, m, n, r, rep, s, sd, t, t3, t3plusx, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero())
    return new Ctor(x);
  external = false;
  s = x.s * mathpow(x.s * x, 1 / 3);
  if (!s || Math.abs(s) == 1 / 0) {
    n = digitsToString(x.d);
    e2 = x.e;
    if (s = (e2 - n.length + 1) % 3)
      n += s == 1 || s == -2 ? "0" : "00";
    s = mathpow(n, 1 / 3);
    e2 = mathfloor((e2 + 1) / 3) - (e2 % 3 == (e2 < 0 ? -1 : 2));
    if (s == 1 / 0) {
      n = "5e" + e2;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf("e") + 1) + e2;
    }
    r = new Ctor(n);
    r.s = x.s;
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e2 = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    t3 = t.times(t).times(t);
    t3plusx = t3.plus(x);
    r = divide$1(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);
      if (n == "9999" || !rep && n == "4999") {
        if (!rep) {
          finalise(t, e2 + 1, 0);
          if (t.times(t).times(t).eq(x)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
          finalise(r, e2 + 1, 1);
          m = !r.times(r).times(r).eq(x);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e2, Ctor.rounding, m);
};
P$1.decimalPlaces = P$1.dp = function() {
  var w, d = this.d, n = NaN;
  if (d) {
    w = d.length - 1;
    n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;
    w = d[w];
    if (w)
      for (; w % 10 == 0; w /= 10)
        n--;
    if (n < 0)
      n = 0;
  }
  return n;
};
P$1.dividedBy = P$1.div = function(y) {
  return divide$1(this, new this.constructor(y));
};
P$1.dividedToIntegerBy = P$1.divToInt = function(y) {
  var x = this, Ctor = x.constructor;
  return finalise(divide$1(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
};
P$1.equals = P$1.eq = function(y) {
  return this.cmp(y) === 0;
};
P$1.floor = function() {
  return finalise(new this.constructor(this), this.e + 1, 3);
};
P$1.greaterThan = P$1.gt = function(y) {
  return this.cmp(y) > 0;
};
P$1.greaterThanOrEqualTo = P$1.gte = function(y) {
  var k = this.cmp(y);
  return k == 1 || k === 0;
};
P$1.hyperbolicCosine = P$1.cosh = function() {
  var k, n, pr, rm, len, x = this, Ctor = x.constructor, one = new Ctor(1);
  if (!x.isFinite())
    return new Ctor(x.s ? 1 / 0 : NaN);
  if (x.isZero())
    return one;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;
  if (len < 32) {
    k = Math.ceil(len / 3);
    n = (1 / tinyPow(4, k)).toString();
  } else {
    k = 16;
    n = "2.3283064365386962890625e-10";
  }
  x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);
  var cosh2_x, i2 = k, d8 = new Ctor(8);
  for (; i2--; ) {
    cosh2_x = x.times(x);
    x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
  }
  return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P$1.hyperbolicSine = P$1.sinh = function() {
  var k, pr, rm, len, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;
  if (len < 3) {
    x = taylorSeries(Ctor, 2, x, x, true);
  } else {
    k = 1.4 * Math.sqrt(len);
    k = k > 16 ? 16 : k | 0;
    x = x.times(1 / tinyPow(5, k));
    x = taylorSeries(Ctor, 2, x, x, true);
    var sinh2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
    for (; k--; ) {
      sinh2_x = x.times(x);
      x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
    }
  }
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(x, pr, rm, true);
};
P$1.hyperbolicTangent = P$1.tanh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(x.s);
  if (x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 7;
  Ctor.rounding = 1;
  return divide$1(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
};
P$1.inverseCosine = P$1.acos = function() {
  var halfPi, x = this, Ctor = x.constructor, k = x.abs().cmp(1), pr = Ctor.precision, rm = Ctor.rounding;
  if (k !== -1) {
    return k === 0 ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0) : new Ctor(NaN);
  }
  if (x.isZero())
    return getPi(Ctor, pr + 4, rm).times(0.5);
  Ctor.precision = pr + 6;
  Ctor.rounding = 1;
  x = x.asin();
  halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return halfPi.minus(x);
};
P$1.inverseHyperbolicCosine = P$1.acosh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (x.lte(1))
    return new Ctor(x.eq(1) ? 0 : NaN);
  if (!x.isFinite())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
  Ctor.rounding = 1;
  external = false;
  x = x.times(x).minus(1).sqrt().plus(x);
  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.ln();
};
P$1.inverseHyperbolicSine = P$1.asinh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
  Ctor.rounding = 1;
  external = false;
  x = x.times(x).plus(1).sqrt().plus(x);
  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.ln();
};
P$1.inverseHyperbolicTangent = P$1.atanh = function() {
  var pr, rm, wpr, xsd, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(NaN);
  if (x.e >= 0)
    return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  xsd = x.sd();
  if (Math.max(xsd, pr) < 2 * -x.e - 1)
    return finalise(new Ctor(x), pr, rm, true);
  Ctor.precision = wpr = xsd - x.e;
  x = divide$1(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);
  Ctor.precision = pr + 4;
  Ctor.rounding = 1;
  x = x.ln();
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.times(0.5);
};
P$1.inverseSine = P$1.asin = function() {
  var halfPi, k, pr, rm, x = this, Ctor = x.constructor;
  if (x.isZero())
    return new Ctor(x);
  k = x.abs().cmp(1);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (k !== -1) {
    if (k === 0) {
      halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
      halfPi.s = x.s;
      return halfPi;
    }
    return new Ctor(NaN);
  }
  Ctor.precision = pr + 6;
  Ctor.rounding = 1;
  x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.times(2);
};
P$1.inverseTangent = P$1.atan = function() {
  var i2, j, k, n, px, t, r, wpr, x2, x = this, Ctor = x.constructor, pr = Ctor.precision, rm = Ctor.rounding;
  if (!x.isFinite()) {
    if (!x.s)
      return new Ctor(NaN);
    if (pr + 4 <= PI_PRECISION) {
      r = getPi(Ctor, pr + 4, rm).times(0.5);
      r.s = x.s;
      return r;
    }
  } else if (x.isZero()) {
    return new Ctor(x);
  } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
    r = getPi(Ctor, pr + 4, rm).times(0.25);
    r.s = x.s;
    return r;
  }
  Ctor.precision = wpr = pr + 10;
  Ctor.rounding = 1;
  k = Math.min(28, wpr / LOG_BASE + 2 | 0);
  for (i2 = k; i2; --i2)
    x = x.div(x.times(x).plus(1).sqrt().plus(1));
  external = false;
  j = Math.ceil(wpr / LOG_BASE);
  n = 1;
  x2 = x.times(x);
  r = new Ctor(x);
  px = x;
  for (; i2 !== -1; ) {
    px = px.times(x2);
    t = r.minus(px.div(n += 2));
    px = px.times(x2);
    r = t.plus(px.div(n += 2));
    if (r.d[j] !== void 0)
      for (i2 = j; r.d[i2] === t.d[i2] && i2--; )
        ;
  }
  if (k)
    r = r.times(2 << k - 1);
  external = true;
  return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P$1.isFinite = function() {
  return !!this.d;
};
P$1.isInteger = P$1.isInt = function() {
  return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
};
P$1.isNaN = function() {
  return !this.s;
};
P$1.isNegative = P$1.isNeg = function() {
  return this.s < 0;
};
P$1.isPositive = P$1.isPos = function() {
  return this.s > 0;
};
P$1.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
P$1.lessThan = P$1.lt = function(y) {
  return this.cmp(y) < 0;
};
P$1.lessThanOrEqualTo = P$1.lte = function(y) {
  return this.cmp(y) < 1;
};
P$1.logarithm = P$1.log = function(base) {
  var isBase10, d, denominator, k, inf, num, sd, r, arg2 = this, Ctor = arg2.constructor, pr = Ctor.precision, rm = Ctor.rounding, guard = 5;
  if (base == null) {
    base = new Ctor(10);
    isBase10 = true;
  } else {
    base = new Ctor(base);
    d = base.d;
    if (base.s < 0 || !d || !d[0] || base.eq(1))
      return new Ctor(NaN);
    isBase10 = base.eq(10);
  }
  d = arg2.d;
  if (arg2.s < 0 || !d || !d[0] || arg2.eq(1)) {
    return new Ctor(d && !d[0] ? -1 / 0 : arg2.s != 1 ? NaN : d ? 0 : 1 / 0);
  }
  if (isBase10) {
    if (d.length > 1) {
      inf = true;
    } else {
      for (k = d[0]; k % 10 === 0; )
        k /= 10;
      inf = k !== 1;
    }
  }
  external = false;
  sd = pr + guard;
  num = naturalLogarithm(arg2, sd);
  denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
  r = divide$1(num, denominator, sd, 1);
  if (checkRoundingDigits(r.d, k = pr, rm)) {
    do {
      sd += 10;
      num = naturalLogarithm(arg2, sd);
      denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
      r = divide$1(num, denominator, sd, 1);
      if (!inf) {
        if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
          r = finalise(r, pr + 1, 0);
        }
        break;
      }
    } while (checkRoundingDigits(r.d, k += 10, rm));
  }
  external = true;
  return finalise(r, pr, rm);
};
P$1.minus = P$1.sub = function(y) {
  var d, e2, i2, j, k, len, pr, rm, xd, xe, xLTy, yd, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.d) {
    if (!x.s || !y.s)
      y = new Ctor(NaN);
    else if (x.d)
      y.s = -y.s;
    else
      y = new Ctor(y.d || x.s !== y.s ? x : NaN);
    return y;
  }
  if (x.s != y.s) {
    y.s = -y.s;
    return x.plus(y);
  }
  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (!xd[0] || !yd[0]) {
    if (yd[0])
      y.s = -y.s;
    else if (xd[0])
      y = new Ctor(x);
    else
      return new Ctor(rm === 3 ? -0 : 0);
    return external ? finalise(y, pr, rm) : y;
  }
  e2 = mathfloor(y.e / LOG_BASE);
  xe = mathfloor(x.e / LOG_BASE);
  xd = xd.slice();
  k = xe - e2;
  if (k) {
    xLTy = k < 0;
    if (xLTy) {
      d = xd;
      k = -k;
      len = yd.length;
    } else {
      d = yd;
      e2 = xe;
      len = xd.length;
    }
    i2 = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
    if (k > i2) {
      k = i2;
      d.length = 1;
    }
    d.reverse();
    for (i2 = k; i2--; )
      d.push(0);
    d.reverse();
  } else {
    i2 = xd.length;
    len = yd.length;
    xLTy = i2 < len;
    if (xLTy)
      len = i2;
    for (i2 = 0; i2 < len; i2++) {
      if (xd[i2] != yd[i2]) {
        xLTy = xd[i2] < yd[i2];
        break;
      }
    }
    k = 0;
  }
  if (xLTy) {
    d = xd;
    xd = yd;
    yd = d;
    y.s = -y.s;
  }
  len = xd.length;
  for (i2 = yd.length - len; i2 > 0; --i2)
    xd[len++] = 0;
  for (i2 = yd.length; i2 > k; ) {
    if (xd[--i2] < yd[i2]) {
      for (j = i2; j && xd[--j] === 0; )
        xd[j] = BASE - 1;
      --xd[j];
      xd[i2] += BASE;
    }
    xd[i2] -= yd[i2];
  }
  for (; xd[--len] === 0; )
    xd.pop();
  for (; xd[0] === 0; xd.shift())
    --e2;
  if (!xd[0])
    return new Ctor(rm === 3 ? -0 : 0);
  y.d = xd;
  y.e = getBase10Exponent(xd, e2);
  return external ? finalise(y, pr, rm) : y;
};
P$1.modulo = P$1.mod = function(y) {
  var q, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.s || y.d && !y.d[0])
    return new Ctor(NaN);
  if (!y.d || x.d && !x.d[0]) {
    return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
  }
  external = false;
  if (Ctor.modulo == 9) {
    q = divide$1(x, y.abs(), 0, 3, 1);
    q.s *= y.s;
  } else {
    q = divide$1(x, y, 0, Ctor.modulo, 1);
  }
  q = q.times(y);
  external = true;
  return x.minus(q);
};
P$1.naturalExponential = P$1.exp = function() {
  return naturalExponential(this);
};
P$1.naturalLogarithm = P$1.ln = function() {
  return naturalLogarithm(this);
};
P$1.negated = P$1.neg = function() {
  var x = new this.constructor(this);
  x.s = -x.s;
  return finalise(x);
};
P$1.plus = P$1.add = function(y) {
  var carry, d, e2, i2, k, len, pr, rm, xd, yd, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.d) {
    if (!x.s || !y.s)
      y = new Ctor(NaN);
    else if (!x.d)
      y = new Ctor(y.d || x.s === y.s ? x : NaN);
    return y;
  }
  if (x.s != y.s) {
    y.s = -y.s;
    return x.minus(y);
  }
  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (!xd[0] || !yd[0]) {
    if (!yd[0])
      y = new Ctor(x);
    return external ? finalise(y, pr, rm) : y;
  }
  k = mathfloor(x.e / LOG_BASE);
  e2 = mathfloor(y.e / LOG_BASE);
  xd = xd.slice();
  i2 = k - e2;
  if (i2) {
    if (i2 < 0) {
      d = xd;
      i2 = -i2;
      len = yd.length;
    } else {
      d = yd;
      e2 = k;
      len = xd.length;
    }
    k = Math.ceil(pr / LOG_BASE);
    len = k > len ? k + 1 : len + 1;
    if (i2 > len) {
      i2 = len;
      d.length = 1;
    }
    d.reverse();
    for (; i2--; )
      d.push(0);
    d.reverse();
  }
  len = xd.length;
  i2 = yd.length;
  if (len - i2 < 0) {
    i2 = len;
    d = yd;
    yd = xd;
    xd = d;
  }
  for (carry = 0; i2; ) {
    carry = (xd[--i2] = xd[i2] + yd[i2] + carry) / BASE | 0;
    xd[i2] %= BASE;
  }
  if (carry) {
    xd.unshift(carry);
    ++e2;
  }
  for (len = xd.length; xd[--len] == 0; )
    xd.pop();
  y.d = xd;
  y.e = getBase10Exponent(xd, e2);
  return external ? finalise(y, pr, rm) : y;
};
P$1.precision = P$1.sd = function(z) {
  var k, x = this;
  if (z !== void 0 && z !== !!z && z !== 1 && z !== 0)
    throw Error(invalidArgument + z);
  if (x.d) {
    k = getPrecision(x.d);
    if (z && x.e + 1 > k)
      k = x.e + 1;
  } else {
    k = NaN;
  }
  return k;
};
P$1.round = function() {
  var x = this, Ctor = x.constructor;
  return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
};
P$1.sine = P$1.sin = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(NaN);
  if (x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;
  x = sine(Ctor, toLessThanHalfPi(Ctor, x));
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
};
P$1.squareRoot = P$1.sqrt = function() {
  var m, n, sd, r, rep, t, x = this, d = x.d, e2 = x.e, s = x.s, Ctor = x.constructor;
  if (s !== 1 || !d || !d[0]) {
    return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
  }
  external = false;
  s = Math.sqrt(+x);
  if (s == 0 || s == 1 / 0) {
    n = digitsToString(d);
    if ((n.length + e2) % 2 == 0)
      n += "0";
    s = Math.sqrt(n);
    e2 = mathfloor((e2 + 1) / 2) - (e2 < 0 || e2 % 2);
    if (s == 1 / 0) {
      n = "5e" + e2;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf("e") + 1) + e2;
    }
    r = new Ctor(n);
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e2 = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    r = t.plus(divide$1(x, t, sd + 2, 1)).times(0.5);
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);
      if (n == "9999" || !rep && n == "4999") {
        if (!rep) {
          finalise(t, e2 + 1, 0);
          if (t.times(t).eq(x)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
          finalise(r, e2 + 1, 1);
          m = !r.times(r).eq(x);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e2, Ctor.rounding, m);
};
P$1.tangent = P$1.tan = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(NaN);
  if (x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 10;
  Ctor.rounding = 1;
  x = x.sin();
  x.s = 1;
  x = divide$1(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
};
P$1.times = P$1.mul = function(y) {
  var carry, e2, i2, k, r, rL, t, xdL, ydL, x = this, Ctor = x.constructor, xd = x.d, yd = (y = new Ctor(y)).d;
  y.s *= x.s;
  if (!xd || !xd[0] || !yd || !yd[0]) {
    return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd ? NaN : !xd || !yd ? y.s / 0 : y.s * 0);
  }
  e2 = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
  xdL = xd.length;
  ydL = yd.length;
  if (xdL < ydL) {
    r = xd;
    xd = yd;
    yd = r;
    rL = xdL;
    xdL = ydL;
    ydL = rL;
  }
  r = [];
  rL = xdL + ydL;
  for (i2 = rL; i2--; )
    r.push(0);
  for (i2 = ydL; --i2 >= 0; ) {
    carry = 0;
    for (k = xdL + i2; k > i2; ) {
      t = r[k] + yd[i2] * xd[k - i2 - 1] + carry;
      r[k--] = t % BASE | 0;
      carry = t / BASE | 0;
    }
    r[k] = (r[k] + carry) % BASE | 0;
  }
  for (; !r[--rL]; )
    r.pop();
  if (carry)
    ++e2;
  else
    r.shift();
  y.d = r;
  y.e = getBase10Exponent(r, e2);
  return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
};
P$1.toBinary = function(sd, rm) {
  return toStringBinary(this, 2, sd, rm);
};
P$1.toDecimalPlaces = P$1.toDP = function(dp, rm) {
  var x = this, Ctor = x.constructor;
  x = new Ctor(x);
  if (dp === void 0)
    return x;
  checkInt32(dp, 0, MAX_DIGITS);
  if (rm === void 0)
    rm = Ctor.rounding;
  else
    checkInt32(rm, 0, 8);
  return finalise(x, dp + x.e + 1, rm);
};
P$1.toExponential = function(dp, rm) {
  var str, x = this, Ctor = x.constructor;
  if (dp === void 0) {
    str = finiteToString(x, true);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
    x = finalise(new Ctor(x), dp + 1, rm);
    str = finiteToString(x, true, dp + 1);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P$1.toFixed = function(dp, rm) {
  var str, y, x = this, Ctor = x.constructor;
  if (dp === void 0) {
    str = finiteToString(x);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
    y = finalise(new Ctor(x), dp + x.e + 1, rm);
    str = finiteToString(y, false, dp + y.e + 1);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P$1.toFraction = function(maxD) {
  var d, d0, d1, d2, e2, k, n, n0, n12, pr, q, r, x = this, xd = x.d, Ctor = x.constructor;
  if (!xd)
    return new Ctor(x);
  n12 = d0 = new Ctor(1);
  d1 = n0 = new Ctor(0);
  d = new Ctor(d1);
  e2 = d.e = getPrecision(xd) - x.e - 1;
  k = e2 % LOG_BASE;
  d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);
  if (maxD == null) {
    maxD = e2 > 0 ? d : n12;
  } else {
    n = new Ctor(maxD);
    if (!n.isInt() || n.lt(n12))
      throw Error(invalidArgument + n);
    maxD = n.gt(d) ? e2 > 0 ? d : n12 : n;
  }
  external = false;
  n = new Ctor(digitsToString(xd));
  pr = Ctor.precision;
  Ctor.precision = e2 = xd.length * LOG_BASE * 2;
  for (; ; ) {
    q = divide$1(n, d, 0, 1, 1);
    d2 = d0.plus(q.times(d1));
    if (d2.cmp(maxD) == 1)
      break;
    d0 = d1;
    d1 = d2;
    d2 = n12;
    n12 = n0.plus(q.times(d2));
    n0 = d2;
    d2 = d;
    d = n.minus(q.times(d2));
    n = d2;
  }
  d2 = divide$1(maxD.minus(d0), d1, 0, 1, 1);
  n0 = n0.plus(d2.times(n12));
  d0 = d0.plus(d2.times(d1));
  n0.s = n12.s = x.s;
  r = divide$1(n12, d1, e2, 1).minus(x).abs().cmp(divide$1(n0, d0, e2, 1).minus(x).abs()) < 1 ? [n12, d1] : [n0, d0];
  Ctor.precision = pr;
  external = true;
  return r;
};
P$1.toHexadecimal = P$1.toHex = function(sd, rm) {
  return toStringBinary(this, 16, sd, rm);
};
P$1.toNearest = function(y, rm) {
  var x = this, Ctor = x.constructor;
  x = new Ctor(x);
  if (y == null) {
    if (!x.d)
      return x;
    y = new Ctor(1);
    rm = Ctor.rounding;
  } else {
    y = new Ctor(y);
    if (rm === void 0) {
      rm = Ctor.rounding;
    } else {
      checkInt32(rm, 0, 8);
    }
    if (!x.d)
      return y.s ? x : y;
    if (!y.d) {
      if (y.s)
        y.s = x.s;
      return y;
    }
  }
  if (y.d[0]) {
    external = false;
    x = divide$1(x, y, 0, rm, 1).times(y);
    external = true;
    finalise(x);
  } else {
    y.s = x.s;
    x = y;
  }
  return x;
};
P$1.toNumber = function() {
  return +this;
};
P$1.toOctal = function(sd, rm) {
  return toStringBinary(this, 8, sd, rm);
};
P$1.toPower = P$1.pow = function(y) {
  var e2, k, pr, r, rm, s, x = this, Ctor = x.constructor, yn = +(y = new Ctor(y));
  if (!x.d || !y.d || !x.d[0] || !y.d[0])
    return new Ctor(mathpow(+x, yn));
  x = new Ctor(x);
  if (x.eq(1))
    return x;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (y.eq(1))
    return finalise(x, pr, rm);
  e2 = mathfloor(y.e / LOG_BASE);
  if (e2 >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
    r = intPow(Ctor, x, k, pr);
    return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
  }
  s = x.s;
  if (s < 0) {
    if (e2 < y.d.length - 1)
      return new Ctor(NaN);
    if ((y.d[e2] & 1) == 0)
      s = 1;
    if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
      x.s = s;
      return x;
    }
  }
  k = mathpow(+x, yn);
  e2 = k == 0 || !isFinite(k) ? mathfloor(yn * (Math.log("0." + digitsToString(x.d)) / Math.LN10 + x.e + 1)) : new Ctor(k + "").e;
  if (e2 > Ctor.maxE + 1 || e2 < Ctor.minE - 1)
    return new Ctor(e2 > 0 ? s / 0 : 0);
  external = false;
  Ctor.rounding = x.s = 1;
  k = Math.min(12, (e2 + "").length);
  r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);
  if (r.d) {
    r = finalise(r, pr + 5, 1);
    if (checkRoundingDigits(r.d, pr, rm)) {
      e2 = pr + 10;
      r = finalise(naturalExponential(y.times(naturalLogarithm(x, e2 + k)), e2), e2 + 5, 1);
      if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
        r = finalise(r, pr + 1, 0);
      }
    }
  }
  r.s = s;
  external = true;
  Ctor.rounding = rm;
  return finalise(r, pr, rm);
};
P$1.toPrecision = function(sd, rm) {
  var str, x = this, Ctor = x.constructor;
  if (sd === void 0) {
    str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
    x = finalise(new Ctor(x), sd, rm);
    str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P$1.toSignificantDigits = P$1.toSD = function(sd, rm) {
  var x = this, Ctor = x.constructor;
  if (sd === void 0) {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
  }
  return finalise(new Ctor(x), sd, rm);
};
P$1.toString = function() {
  var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P$1.truncated = P$1.trunc = function() {
  return finalise(new this.constructor(this), this.e + 1, 1);
};
P$1.valueOf = P$1.toJSON = function() {
  var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  return x.isNeg() ? "-" + str : str;
};
function digitsToString(d) {
  var i2, k, ws, indexOfLastWord = d.length - 1, str = "", w = d[0];
  if (indexOfLastWord > 0) {
    str += w;
    for (i2 = 1; i2 < indexOfLastWord; i2++) {
      ws = d[i2] + "";
      k = LOG_BASE - ws.length;
      if (k)
        str += getZeroString(k);
      str += ws;
    }
    w = d[i2];
    ws = w + "";
    k = LOG_BASE - ws.length;
    if (k)
      str += getZeroString(k);
  } else if (w === 0) {
    return "0";
  }
  for (; w % 10 === 0; )
    w /= 10;
  return str + w;
}
function checkInt32(i2, min2, max2) {
  if (i2 !== ~~i2 || i2 < min2 || i2 > max2) {
    throw Error(invalidArgument + i2);
  }
}
function checkRoundingDigits(d, i2, rm, repeating) {
  var di, k, r, rd;
  for (k = d[0]; k >= 10; k /= 10)
    --i2;
  if (--i2 < 0) {
    i2 += LOG_BASE;
    di = 0;
  } else {
    di = Math.ceil((i2 + 1) / LOG_BASE);
    i2 %= LOG_BASE;
  }
  k = mathpow(10, LOG_BASE - i2);
  rd = d[di] % k | 0;
  if (repeating == null) {
    if (i2 < 3) {
      if (i2 == 0)
        rd = rd / 100 | 0;
      else if (i2 == 1)
        rd = rd / 10 | 0;
      r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 5e4 || rd == 0;
    } else {
      r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 100 | 0) == mathpow(10, i2 - 2) - 1 || (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
    }
  } else {
    if (i2 < 4) {
      if (i2 == 0)
        rd = rd / 1e3 | 0;
      else if (i2 == 1)
        rd = rd / 100 | 0;
      else if (i2 == 2)
        rd = rd / 10 | 0;
      r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
    } else {
      r = ((repeating || rm < 4) && rd + 1 == k || !repeating && rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 1e3 | 0) == mathpow(10, i2 - 3) - 1;
    }
  }
  return r;
}
function convertBase(str, baseIn, baseOut) {
  var j, arr = [0], arrL, i2 = 0, strL = str.length;
  for (; i2 < strL; ) {
    for (arrL = arr.length; arrL--; )
      arr[arrL] *= baseIn;
    arr[0] += NUMERALS.indexOf(str.charAt(i2++));
    for (j = 0; j < arr.length; j++) {
      if (arr[j] > baseOut - 1) {
        if (arr[j + 1] === void 0)
          arr[j + 1] = 0;
        arr[j + 1] += arr[j] / baseOut | 0;
        arr[j] %= baseOut;
      }
    }
  }
  return arr.reverse();
}
function cosine(Ctor, x) {
  var k, len, y;
  if (x.isZero())
    return x;
  len = x.d.length;
  if (len < 32) {
    k = Math.ceil(len / 3);
    y = (1 / tinyPow(4, k)).toString();
  } else {
    k = 16;
    y = "2.3283064365386962890625e-10";
  }
  Ctor.precision += k;
  x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));
  for (var i2 = k; i2--; ) {
    var cos2x = x.times(x);
    x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
  }
  Ctor.precision -= k;
  return x;
}
var divide$1 = /* @__PURE__ */ function() {
  function multiplyInteger(x, k, base) {
    var temp, carry = 0, i2 = x.length;
    for (x = x.slice(); i2--; ) {
      temp = x[i2] * k + carry;
      x[i2] = temp % base | 0;
      carry = temp / base | 0;
    }
    if (carry)
      x.unshift(carry);
    return x;
  }
  function compare2(a, b, aL, bL) {
    var i2, r;
    if (aL != bL) {
      r = aL > bL ? 1 : -1;
    } else {
      for (i2 = r = 0; i2 < aL; i2++) {
        if (a[i2] != b[i2]) {
          r = a[i2] > b[i2] ? 1 : -1;
          break;
        }
      }
    }
    return r;
  }
  function subtract2(a, b, aL, base) {
    var i2 = 0;
    for (; aL--; ) {
      a[aL] -= i2;
      i2 = a[aL] < b[aL] ? 1 : 0;
      a[aL] = i2 * base + a[aL] - b[aL];
    }
    for (; !a[0] && a.length > 1; )
      a.shift();
  }
  return function(x, y, pr, rm, dp, base) {
    var cmp, e2, i2, k, logBase, more, prod2, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz, Ctor = x.constructor, sign2 = x.s == y.s ? 1 : -1, xd = x.d, yd = y.d;
    if (!xd || !xd[0] || !yd || !yd[0]) {
      return new Ctor(
        // Return NaN if either NaN, or both Infinity or 0.
        !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN : (
          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
          xd && xd[0] == 0 || !yd ? sign2 * 0 : sign2 / 0
        )
      );
    }
    if (base) {
      logBase = 1;
      e2 = x.e - y.e;
    } else {
      base = BASE;
      logBase = LOG_BASE;
      e2 = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
    }
    yL = yd.length;
    xL = xd.length;
    q = new Ctor(sign2);
    qd = q.d = [];
    for (i2 = 0; yd[i2] == (xd[i2] || 0); i2++)
      ;
    if (yd[i2] > (xd[i2] || 0))
      e2--;
    if (pr == null) {
      sd = pr = Ctor.precision;
      rm = Ctor.rounding;
    } else if (dp) {
      sd = pr + (x.e - y.e) + 1;
    } else {
      sd = pr;
    }
    if (sd < 0) {
      qd.push(1);
      more = true;
    } else {
      sd = sd / logBase + 2 | 0;
      i2 = 0;
      if (yL == 1) {
        k = 0;
        yd = yd[0];
        sd++;
        for (; (i2 < xL || k) && sd--; i2++) {
          t = k * base + (xd[i2] || 0);
          qd[i2] = t / yd | 0;
          k = t % yd | 0;
        }
        more = k || i2 < xL;
      } else {
        k = base / (yd[0] + 1) | 0;
        if (k > 1) {
          yd = multiplyInteger(yd, k, base);
          xd = multiplyInteger(xd, k, base);
          yL = yd.length;
          xL = xd.length;
        }
        xi = yL;
        rem = xd.slice(0, yL);
        remL = rem.length;
        for (; remL < yL; )
          rem[remL++] = 0;
        yz = yd.slice();
        yz.unshift(0);
        yd0 = yd[0];
        if (yd[1] >= base / 2)
          ++yd0;
        do {
          k = 0;
          cmp = compare2(yd, rem, yL, remL);
          if (cmp < 0) {
            rem0 = rem[0];
            if (yL != remL)
              rem0 = rem0 * base + (rem[1] || 0);
            k = rem0 / yd0 | 0;
            if (k > 1) {
              if (k >= base)
                k = base - 1;
              prod2 = multiplyInteger(yd, k, base);
              prodL = prod2.length;
              remL = rem.length;
              cmp = compare2(prod2, rem, prodL, remL);
              if (cmp == 1) {
                k--;
                subtract2(prod2, yL < prodL ? yz : yd, prodL, base);
              }
            } else {
              if (k == 0)
                cmp = k = 1;
              prod2 = yd.slice();
            }
            prodL = prod2.length;
            if (prodL < remL)
              prod2.unshift(0);
            subtract2(rem, prod2, remL, base);
            if (cmp == -1) {
              remL = rem.length;
              cmp = compare2(yd, rem, yL, remL);
              if (cmp < 1) {
                k++;
                subtract2(rem, yL < remL ? yz : yd, remL, base);
              }
            }
            remL = rem.length;
          } else if (cmp === 0) {
            k++;
            rem = [0];
          }
          qd[i2++] = k;
          if (cmp && rem[0]) {
            rem[remL++] = xd[xi] || 0;
          } else {
            rem = [xd[xi]];
            remL = 1;
          }
        } while ((xi++ < xL || rem[0] !== void 0) && sd--);
        more = rem[0] !== void 0;
      }
      if (!qd[0])
        qd.shift();
    }
    if (logBase == 1) {
      q.e = e2;
      inexact = more;
    } else {
      for (i2 = 1, k = qd[0]; k >= 10; k /= 10)
        i2++;
      q.e = i2 + e2 * logBase - 1;
      finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
    }
    return q;
  };
}();
function finalise(x, sd, rm, isTruncated) {
  var digits2, i2, j, k, rd, roundUp, w, xd, xdi, Ctor = x.constructor;
  out:
    if (sd != null) {
      xd = x.d;
      if (!xd)
        return x;
      for (digits2 = 1, k = xd[0]; k >= 10; k /= 10)
        digits2++;
      i2 = sd - digits2;
      if (i2 < 0) {
        i2 += LOG_BASE;
        j = sd;
        w = xd[xdi = 0];
        rd = w / mathpow(10, digits2 - j - 1) % 10 | 0;
      } else {
        xdi = Math.ceil((i2 + 1) / LOG_BASE);
        k = xd.length;
        if (xdi >= k) {
          if (isTruncated) {
            for (; k++ <= xdi; )
              xd.push(0);
            w = rd = 0;
            digits2 = 1;
            i2 %= LOG_BASE;
            j = i2 - LOG_BASE + 1;
          } else {
            break out;
          }
        } else {
          w = k = xd[xdi];
          for (digits2 = 1; k >= 10; k /= 10)
            digits2++;
          i2 %= LOG_BASE;
          j = i2 - LOG_BASE + digits2;
          rd = j < 0 ? 0 : w / mathpow(10, digits2 - j - 1) % 10 | 0;
        }
      }
      isTruncated = isTruncated || sd < 0 || xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits2 - j - 1));
      roundUp = rm < 4 ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
      (i2 > 0 ? j > 0 ? w / mathpow(10, digits2 - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
      if (sd < 1 || !xd[0]) {
        xd.length = 0;
        if (roundUp) {
          sd -= x.e + 1;
          xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
          x.e = -sd || 0;
        } else {
          xd[0] = x.e = 0;
        }
        return x;
      }
      if (i2 == 0) {
        xd.length = xdi;
        k = 1;
        xdi--;
      } else {
        xd.length = xdi + 1;
        k = mathpow(10, LOG_BASE - i2);
        xd[xdi] = j > 0 ? (w / mathpow(10, digits2 - j) % mathpow(10, j) | 0) * k : 0;
      }
      if (roundUp) {
        for (; ; ) {
          if (xdi == 0) {
            for (i2 = 1, j = xd[0]; j >= 10; j /= 10)
              i2++;
            j = xd[0] += k;
            for (k = 1; j >= 10; j /= 10)
              k++;
            if (i2 != k) {
              x.e++;
              if (xd[0] == BASE)
                xd[0] = 1;
            }
            break;
          } else {
            xd[xdi] += k;
            if (xd[xdi] != BASE)
              break;
            xd[xdi--] = 0;
            k = 1;
          }
        }
      }
      for (i2 = xd.length; xd[--i2] === 0; )
        xd.pop();
    }
  if (external) {
    if (x.e > Ctor.maxE) {
      x.d = null;
      x.e = NaN;
    } else if (x.e < Ctor.minE) {
      x.e = 0;
      x.d = [0];
    }
  }
  return x;
}
function finiteToString(x, isExp, sd) {
  if (!x.isFinite())
    return nonFiniteToString(x);
  var k, e2 = x.e, str = digitsToString(x.d), len = str.length;
  if (isExp) {
    if (sd && (k = sd - len) > 0) {
      str = str.charAt(0) + "." + str.slice(1) + getZeroString(k);
    } else if (len > 1) {
      str = str.charAt(0) + "." + str.slice(1);
    }
    str = str + (x.e < 0 ? "e" : "e+") + x.e;
  } else if (e2 < 0) {
    str = "0." + getZeroString(-e2 - 1) + str;
    if (sd && (k = sd - len) > 0)
      str += getZeroString(k);
  } else if (e2 >= len) {
    str += getZeroString(e2 + 1 - len);
    if (sd && (k = sd - e2 - 1) > 0)
      str = str + "." + getZeroString(k);
  } else {
    if ((k = e2 + 1) < len)
      str = str.slice(0, k) + "." + str.slice(k);
    if (sd && (k = sd - len) > 0) {
      if (e2 + 1 === len)
        str += ".";
      str += getZeroString(k);
    }
  }
  return str;
}
function getBase10Exponent(digits2, e2) {
  var w = digits2[0];
  for (e2 *= LOG_BASE; w >= 10; w /= 10)
    e2++;
  return e2;
}
function getLn10(Ctor, sd, pr) {
  if (sd > LN10_PRECISION) {
    external = true;
    if (pr)
      Ctor.precision = pr;
    throw Error(precisionLimitExceeded);
  }
  return finalise(new Ctor(LN10$1), sd, 1, true);
}
function getPi(Ctor, sd, rm) {
  if (sd > PI_PRECISION)
    throw Error(precisionLimitExceeded);
  return finalise(new Ctor(PI), sd, rm, true);
}
function getPrecision(digits2) {
  var w = digits2.length - 1, len = w * LOG_BASE + 1;
  w = digits2[w];
  if (w) {
    for (; w % 10 == 0; w /= 10)
      len--;
    for (w = digits2[0]; w >= 10; w /= 10)
      len++;
  }
  return len;
}
function getZeroString(k) {
  var zs = "";
  for (; k--; )
    zs += "0";
  return zs;
}
function intPow(Ctor, x, n, pr) {
  var isTruncated, r = new Ctor(1), k = Math.ceil(pr / LOG_BASE + 4);
  external = false;
  for (; ; ) {
    if (n % 2) {
      r = r.times(x);
      if (truncate(r.d, k))
        isTruncated = true;
    }
    n = mathfloor(n / 2);
    if (n === 0) {
      n = r.d.length - 1;
      if (isTruncated && r.d[n] === 0)
        ++r.d[n];
      break;
    }
    x = x.times(x);
    truncate(x.d, k);
  }
  external = true;
  return r;
}
function isOdd(n) {
  return n.d[n.d.length - 1] & 1;
}
function maxOrMin(Ctor, args, ltgt) {
  var y, x = new Ctor(args[0]), i2 = 0;
  for (; ++i2 < args.length; ) {
    y = new Ctor(args[i2]);
    if (!y.s) {
      x = y;
      break;
    } else if (x[ltgt](y)) {
      x = y;
    }
  }
  return x;
}
function naturalExponential(x, sd) {
  var denominator, guard, j, pow2, sum2, t, wpr, rep = 0, i2 = 0, k = 0, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
  if (!x.d || !x.d[0] || x.e > 17) {
    return new Ctor(x.d ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0 : x.s ? x.s < 0 ? 0 : x : 0 / 0);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  t = new Ctor(0.03125);
  while (x.e > -2) {
    x = x.times(t);
    k += 5;
  }
  guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
  wpr += guard;
  denominator = pow2 = sum2 = new Ctor(1);
  Ctor.precision = wpr;
  for (; ; ) {
    pow2 = finalise(pow2.times(x), wpr, 1);
    denominator = denominator.times(++i2);
    t = sum2.plus(divide$1(pow2, denominator, wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      j = k;
      while (j--)
        sum2 = finalise(sum2.times(sum2), wpr, 1);
      if (sd == null) {
        if (rep < 3 && checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += 10;
          denominator = pow2 = t = new Ctor(1);
          i2 = 0;
          rep++;
        } else {
          return finalise(sum2, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum2;
      }
    }
    sum2 = t;
  }
}
function naturalLogarithm(y, sd) {
  var c, c0, denominator, e2, numerator, rep, sum2, t, wpr, x1, x2, n = 1, guard = 10, x = y, xd = x.d, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
  if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
    return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  Ctor.precision = wpr += guard;
  c = digitsToString(xd);
  c0 = c.charAt(0);
  if (Math.abs(e2 = x.e) < 15e14) {
    while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
      x = x.times(y);
      c = digitsToString(x.d);
      c0 = c.charAt(0);
      n++;
    }
    e2 = x.e;
    if (c0 > 1) {
      x = new Ctor("0." + c);
      e2++;
    } else {
      x = new Ctor(c0 + "." + c.slice(1));
    }
  } else {
    t = getLn10(Ctor, wpr + 2, pr).times(e2 + "");
    x = naturalLogarithm(new Ctor(c0 + "." + c.slice(1)), wpr - guard).plus(t);
    Ctor.precision = pr;
    return sd == null ? finalise(x, pr, rm, external = true) : x;
  }
  x1 = x;
  sum2 = numerator = x = divide$1(x.minus(1), x.plus(1), wpr, 1);
  x2 = finalise(x.times(x), wpr, 1);
  denominator = 3;
  for (; ; ) {
    numerator = finalise(numerator.times(x2), wpr, 1);
    t = sum2.plus(divide$1(numerator, new Ctor(denominator), wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      sum2 = sum2.times(2);
      if (e2 !== 0)
        sum2 = sum2.plus(getLn10(Ctor, wpr + 2, pr).times(e2 + ""));
      sum2 = divide$1(sum2, new Ctor(n), wpr, 1);
      if (sd == null) {
        if (checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += guard;
          t = numerator = x = divide$1(x1.minus(1), x1.plus(1), wpr, 1);
          x2 = finalise(x.times(x), wpr, 1);
          denominator = rep = 1;
        } else {
          return finalise(sum2, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum2;
      }
    }
    sum2 = t;
    denominator += 2;
  }
}
function nonFiniteToString(x) {
  return String(x.s * x.s / 0);
}
function parseDecimal(x, str) {
  var e2, i2, len;
  if ((e2 = str.indexOf(".")) > -1)
    str = str.replace(".", "");
  if ((i2 = str.search(/e/i)) > 0) {
    if (e2 < 0)
      e2 = i2;
    e2 += +str.slice(i2 + 1);
    str = str.substring(0, i2);
  } else if (e2 < 0) {
    e2 = str.length;
  }
  for (i2 = 0; str.charCodeAt(i2) === 48; i2++)
    ;
  for (len = str.length; str.charCodeAt(len - 1) === 48; --len)
    ;
  str = str.slice(i2, len);
  if (str) {
    len -= i2;
    x.e = e2 = e2 - i2 - 1;
    x.d = [];
    i2 = (e2 + 1) % LOG_BASE;
    if (e2 < 0)
      i2 += LOG_BASE;
    if (i2 < len) {
      if (i2)
        x.d.push(+str.slice(0, i2));
      for (len -= LOG_BASE; i2 < len; )
        x.d.push(+str.slice(i2, i2 += LOG_BASE));
      str = str.slice(i2);
      i2 = LOG_BASE - str.length;
    } else {
      i2 -= len;
    }
    for (; i2--; )
      str += "0";
    x.d.push(+str);
    if (external) {
      if (x.e > x.constructor.maxE) {
        x.d = null;
        x.e = NaN;
      } else if (x.e < x.constructor.minE) {
        x.e = 0;
        x.d = [0];
      }
    }
  } else {
    x.e = 0;
    x.d = [0];
  }
  return x;
}
function parseOther(x, str) {
  var base, Ctor, divisor, i2, isFloat, len, p, xd, xe;
  if (str.indexOf("_") > -1) {
    str = str.replace(/(\d)_(?=\d)/g, "$1");
    if (isDecimal.test(str))
      return parseDecimal(x, str);
  } else if (str === "Infinity" || str === "NaN") {
    if (!+str)
      x.s = NaN;
    x.e = NaN;
    x.d = null;
    return x;
  }
  if (isHex.test(str)) {
    base = 16;
    str = str.toLowerCase();
  } else if (isBinary.test(str)) {
    base = 2;
  } else if (isOctal.test(str)) {
    base = 8;
  } else {
    throw Error(invalidArgument + str);
  }
  i2 = str.search(/p/i);
  if (i2 > 0) {
    p = +str.slice(i2 + 1);
    str = str.substring(2, i2);
  } else {
    str = str.slice(2);
  }
  i2 = str.indexOf(".");
  isFloat = i2 >= 0;
  Ctor = x.constructor;
  if (isFloat) {
    str = str.replace(".", "");
    len = str.length;
    i2 = len - i2;
    divisor = intPow(Ctor, new Ctor(base), i2, i2 * 2);
  }
  xd = convertBase(str, base, BASE);
  xe = xd.length - 1;
  for (i2 = xe; xd[i2] === 0; --i2)
    xd.pop();
  if (i2 < 0)
    return new Ctor(x.s * 0);
  x.e = getBase10Exponent(xd, xe);
  x.d = xd;
  external = false;
  if (isFloat)
    x = divide$1(x, divisor, len * 4);
  if (p)
    x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal.pow(2, p));
  external = true;
  return x;
}
function sine(Ctor, x) {
  var k, len = x.d.length;
  if (len < 3) {
    return x.isZero() ? x : taylorSeries(Ctor, 2, x, x);
  }
  k = 1.4 * Math.sqrt(len);
  k = k > 16 ? 16 : k | 0;
  x = x.times(1 / tinyPow(5, k));
  x = taylorSeries(Ctor, 2, x, x);
  var sin2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
  for (; k--; ) {
    sin2_x = x.times(x);
    x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
  }
  return x;
}
function taylorSeries(Ctor, n, x, y, isHyperbolic) {
  var j, t, u, x2, pr = Ctor.precision, k = Math.ceil(pr / LOG_BASE);
  external = false;
  x2 = x.times(x);
  u = new Ctor(y);
  for (; ; ) {
    t = divide$1(u.times(x2), new Ctor(n++ * n++), pr, 1);
    u = isHyperbolic ? y.plus(t) : y.minus(t);
    y = divide$1(t.times(x2), new Ctor(n++ * n++), pr, 1);
    t = u.plus(y);
    if (t.d[k] !== void 0) {
      for (j = k; t.d[j] === u.d[j] && j--; )
        ;
      if (j == -1)
        break;
    }
    j = u;
    u = y;
    y = t;
    t = j;
  }
  external = true;
  t.d.length = k + 1;
  return t;
}
function tinyPow(b, e2) {
  var n = b;
  while (--e2)
    n *= b;
  return n;
}
function toLessThanHalfPi(Ctor, x) {
  var t, isNeg = x.s < 0, pi2 = getPi(Ctor, Ctor.precision, 1), halfPi = pi2.times(0.5);
  x = x.abs();
  if (x.lte(halfPi)) {
    quadrant = isNeg ? 4 : 1;
    return x;
  }
  t = x.divToInt(pi2);
  if (t.isZero()) {
    quadrant = isNeg ? 3 : 2;
  } else {
    x = x.minus(t.times(pi2));
    if (x.lte(halfPi)) {
      quadrant = isOdd(t) ? isNeg ? 2 : 3 : isNeg ? 4 : 1;
      return x;
    }
    quadrant = isOdd(t) ? isNeg ? 1 : 4 : isNeg ? 3 : 2;
  }
  return x.minus(pi2).abs();
}
function toStringBinary(x, baseOut, sd, rm) {
  var base, e2, i2, k, len, roundUp, str, xd, y, Ctor = x.constructor, isExp = sd !== void 0;
  if (isExp) {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0)
      rm = Ctor.rounding;
    else
      checkInt32(rm, 0, 8);
  } else {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  }
  if (!x.isFinite()) {
    str = nonFiniteToString(x);
  } else {
    str = finiteToString(x);
    i2 = str.indexOf(".");
    if (isExp) {
      base = 2;
      if (baseOut == 16) {
        sd = sd * 4 - 3;
      } else if (baseOut == 8) {
        sd = sd * 3 - 2;
      }
    } else {
      base = baseOut;
    }
    if (i2 >= 0) {
      str = str.replace(".", "");
      y = new Ctor(1);
      y.e = str.length - i2;
      y.d = convertBase(finiteToString(y), 10, base);
      y.e = y.d.length;
    }
    xd = convertBase(str, 10, base);
    e2 = len = xd.length;
    for (; xd[--len] == 0; )
      xd.pop();
    if (!xd[0]) {
      str = isExp ? "0p+0" : "0";
    } else {
      if (i2 < 0) {
        e2--;
      } else {
        x = new Ctor(x);
        x.d = xd;
        x.e = e2;
        x = divide$1(x, y, sd, rm, 0, base);
        xd = x.d;
        e2 = x.e;
        roundUp = inexact;
      }
      i2 = xd[sd];
      k = base / 2;
      roundUp = roundUp || xd[sd + 1] !== void 0;
      roundUp = rm < 4 ? (i2 !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2)) : i2 > k || i2 === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 || rm === (x.s < 0 ? 8 : 7));
      xd.length = sd;
      if (roundUp) {
        for (; ++xd[--sd] > base - 1; ) {
          xd[sd] = 0;
          if (!sd) {
            ++e2;
            xd.unshift(1);
          }
        }
      }
      for (len = xd.length; !xd[len - 1]; --len)
        ;
      for (i2 = 0, str = ""; i2 < len; i2++)
        str += NUMERALS.charAt(xd[i2]);
      if (isExp) {
        if (len > 1) {
          if (baseOut == 16 || baseOut == 8) {
            i2 = baseOut == 16 ? 4 : 3;
            for (--len; len % i2; len++)
              str += "0";
            xd = convertBase(str, base, baseOut);
            for (len = xd.length; !xd[len - 1]; --len)
              ;
            for (i2 = 1, str = "1."; i2 < len; i2++)
              str += NUMERALS.charAt(xd[i2]);
          } else {
            str = str.charAt(0) + "." + str.slice(1);
          }
        }
        str = str + (e2 < 0 ? "p" : "p+") + e2;
      } else if (e2 < 0) {
        for (; ++e2; )
          str = "0" + str;
        str = "0." + str;
      } else {
        if (++e2 > len)
          for (e2 -= len; e2--; )
            str += "0";
        else if (e2 < len)
          str = str.slice(0, e2) + "." + str.slice(e2);
      }
    }
    str = (baseOut == 16 ? "0x" : baseOut == 2 ? "0b" : baseOut == 8 ? "0o" : "") + str;
  }
  return x.s < 0 ? "-" + str : str;
}
function truncate(arr, len) {
  if (arr.length > len) {
    arr.length = len;
    return true;
  }
}
function abs$1(x) {
  return new this(x).abs();
}
function acos$1(x) {
  return new this(x).acos();
}
function acosh$1(x) {
  return new this(x).acosh();
}
function add$1(x, y) {
  return new this(x).plus(y);
}
function asin$1(x) {
  return new this(x).asin();
}
function asinh$1(x) {
  return new this(x).asinh();
}
function atan$1(x) {
  return new this(x).atan();
}
function atanh$1(x) {
  return new this(x).atanh();
}
function atan2$1(y, x) {
  y = new this(y);
  x = new this(x);
  var r, pr = this.precision, rm = this.rounding, wpr = pr + 4;
  if (!y.s || !x.s) {
    r = new this(NaN);
  } else if (!y.d && !x.d) {
    r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
    r.s = y.s;
  } else if (!x.d || y.isZero()) {
    r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
    r.s = y.s;
  } else if (!y.d || x.isZero()) {
    r = getPi(this, wpr, 1).times(0.5);
    r.s = y.s;
  } else if (x.s < 0) {
    this.precision = wpr;
    this.rounding = 1;
    r = this.atan(divide$1(y, x, wpr, 1));
    x = getPi(this, wpr, 1);
    this.precision = pr;
    this.rounding = rm;
    r = y.s < 0 ? r.minus(x) : r.plus(x);
  } else {
    r = this.atan(divide$1(y, x, wpr, 1));
  }
  return r;
}
function cbrt$1(x) {
  return new this(x).cbrt();
}
function ceil$1(x) {
  return finalise(x = new this(x), x.e + 1, 2);
}
function clamp(x, min2, max2) {
  return new this(x).clamp(min2, max2);
}
function config2(obj) {
  if (!obj || typeof obj !== "object")
    throw Error(decimalError + "Object expected");
  var i2, p, v, useDefaults = obj.defaults === true, ps = [
    "precision",
    1,
    MAX_DIGITS,
    "rounding",
    0,
    8,
    "toExpNeg",
    -EXP_LIMIT,
    0,
    "toExpPos",
    0,
    EXP_LIMIT,
    "maxE",
    0,
    EXP_LIMIT,
    "minE",
    -EXP_LIMIT,
    0,
    "modulo",
    0,
    9
  ];
  for (i2 = 0; i2 < ps.length; i2 += 3) {
    if (p = ps[i2], useDefaults)
      this[p] = DEFAULTS[p];
    if ((v = obj[p]) !== void 0) {
      if (mathfloor(v) === v && v >= ps[i2 + 1] && v <= ps[i2 + 2])
        this[p] = v;
      else
        throw Error(invalidArgument + p + ": " + v);
    }
  }
  if (p = "crypto", useDefaults)
    this[p] = DEFAULTS[p];
  if ((v = obj[p]) !== void 0) {
    if (v === true || v === false || v === 0 || v === 1) {
      if (v) {
        if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
          this[p] = true;
        } else {
          throw Error(cryptoUnavailable);
        }
      } else {
        this[p] = false;
      }
    } else {
      throw Error(invalidArgument + p + ": " + v);
    }
  }
  return this;
}
function cos$1(x) {
  return new this(x).cos();
}
function cosh$1(x) {
  return new this(x).cosh();
}
function clone$2(obj) {
  var i2, p, ps;
  function Decimal2(v) {
    var e2, i3, t, x = this;
    if (!(x instanceof Decimal2))
      return new Decimal2(v);
    x.constructor = Decimal2;
    if (isDecimalInstance(v)) {
      x.s = v.s;
      if (external) {
        if (!v.d || v.e > Decimal2.maxE) {
          x.e = NaN;
          x.d = null;
        } else if (v.e < Decimal2.minE) {
          x.e = 0;
          x.d = [0];
        } else {
          x.e = v.e;
          x.d = v.d.slice();
        }
      } else {
        x.e = v.e;
        x.d = v.d ? v.d.slice() : v.d;
      }
      return;
    }
    t = typeof v;
    if (t === "number") {
      if (v === 0) {
        x.s = 1 / v < 0 ? -1 : 1;
        x.e = 0;
        x.d = [0];
        return;
      }
      if (v < 0) {
        v = -v;
        x.s = -1;
      } else {
        x.s = 1;
      }
      if (v === ~~v && v < 1e7) {
        for (e2 = 0, i3 = v; i3 >= 10; i3 /= 10)
          e2++;
        if (external) {
          if (e2 > Decimal2.maxE) {
            x.e = NaN;
            x.d = null;
          } else if (e2 < Decimal2.minE) {
            x.e = 0;
            x.d = [0];
          } else {
            x.e = e2;
            x.d = [v];
          }
        } else {
          x.e = e2;
          x.d = [v];
        }
        return;
      } else if (v * 0 !== 0) {
        if (!v)
          x.s = NaN;
        x.e = NaN;
        x.d = null;
        return;
      }
      return parseDecimal(x, v.toString());
    } else if (t !== "string") {
      throw Error(invalidArgument + v);
    }
    if ((i3 = v.charCodeAt(0)) === 45) {
      v = v.slice(1);
      x.s = -1;
    } else {
      if (i3 === 43)
        v = v.slice(1);
      x.s = 1;
    }
    return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
  }
  Decimal2.prototype = P$1;
  Decimal2.ROUND_UP = 0;
  Decimal2.ROUND_DOWN = 1;
  Decimal2.ROUND_CEIL = 2;
  Decimal2.ROUND_FLOOR = 3;
  Decimal2.ROUND_HALF_UP = 4;
  Decimal2.ROUND_HALF_DOWN = 5;
  Decimal2.ROUND_HALF_EVEN = 6;
  Decimal2.ROUND_HALF_CEIL = 7;
  Decimal2.ROUND_HALF_FLOOR = 8;
  Decimal2.EUCLID = 9;
  Decimal2.config = Decimal2.set = config2;
  Decimal2.clone = clone$2;
  Decimal2.isDecimal = isDecimalInstance;
  Decimal2.abs = abs$1;
  Decimal2.acos = acos$1;
  Decimal2.acosh = acosh$1;
  Decimal2.add = add$1;
  Decimal2.asin = asin$1;
  Decimal2.asinh = asinh$1;
  Decimal2.atan = atan$1;
  Decimal2.atanh = atanh$1;
  Decimal2.atan2 = atan2$1;
  Decimal2.cbrt = cbrt$1;
  Decimal2.ceil = ceil$1;
  Decimal2.clamp = clamp;
  Decimal2.cos = cos$1;
  Decimal2.cosh = cosh$1;
  Decimal2.div = div;
  Decimal2.exp = exp$1;
  Decimal2.floor = floor$1;
  Decimal2.hypot = hypot$1;
  Decimal2.ln = ln;
  Decimal2.log = log$1;
  Decimal2.log10 = log10$1;
  Decimal2.log2 = log2$1;
  Decimal2.max = max$1;
  Decimal2.min = min$1;
  Decimal2.mod = mod$1;
  Decimal2.mul = mul;
  Decimal2.pow = pow$1;
  Decimal2.random = random$1;
  Decimal2.round = round$1;
  Decimal2.sign = sign$1;
  Decimal2.sin = sin$1;
  Decimal2.sinh = sinh$1;
  Decimal2.sqrt = sqrt$1;
  Decimal2.sub = sub;
  Decimal2.sum = sum$1;
  Decimal2.tan = tan$1;
  Decimal2.tanh = tanh$1;
  Decimal2.trunc = trunc;
  if (obj === void 0)
    obj = {};
  if (obj) {
    if (obj.defaults !== true) {
      ps = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"];
      for (i2 = 0; i2 < ps.length; )
        if (!obj.hasOwnProperty(p = ps[i2++]))
          obj[p] = this[p];
    }
  }
  Decimal2.config(obj);
  return Decimal2;
}
function div(x, y) {
  return new this(x).div(y);
}
function exp$1(x) {
  return new this(x).exp();
}
function floor$1(x) {
  return finalise(x = new this(x), x.e + 1, 3);
}
function hypot$1() {
  var i2, n, t = new this(0);
  external = false;
  for (i2 = 0; i2 < arguments.length; ) {
    n = new this(arguments[i2++]);
    if (!n.d) {
      if (n.s) {
        external = true;
        return new this(1 / 0);
      }
      t = n;
    } else if (t.d) {
      t = t.plus(n.times(n));
    }
  }
  external = true;
  return t.sqrt();
}
function isDecimalInstance(obj) {
  return obj instanceof Decimal || obj && obj.toStringTag === tag || false;
}
function ln(x) {
  return new this(x).ln();
}
function log$1(x, y) {
  return new this(x).log(y);
}
function log2$1(x) {
  return new this(x).log(2);
}
function log10$1(x) {
  return new this(x).log(10);
}
function max$1() {
  return maxOrMin(this, arguments, "lt");
}
function min$1() {
  return maxOrMin(this, arguments, "gt");
}
function mod$1(x, y) {
  return new this(x).mod(y);
}
function mul(x, y) {
  return new this(x).mul(y);
}
function pow$1(x, y) {
  return new this(x).pow(y);
}
function random$1(sd) {
  var d, e2, k, n, i2 = 0, r = new this(1), rd = [];
  if (sd === void 0)
    sd = this.precision;
  else
    checkInt32(sd, 1, MAX_DIGITS);
  k = Math.ceil(sd / LOG_BASE);
  if (!this.crypto) {
    for (; i2 < k; )
      rd[i2++] = Math.random() * 1e7 | 0;
  } else if (crypto.getRandomValues) {
    d = crypto.getRandomValues(new Uint32Array(k));
    for (; i2 < k; ) {
      n = d[i2];
      if (n >= 429e7) {
        d[i2] = crypto.getRandomValues(new Uint32Array(1))[0];
      } else {
        rd[i2++] = n % 1e7;
      }
    }
  } else if (crypto.randomBytes) {
    d = crypto.randomBytes(k *= 4);
    for (; i2 < k; ) {
      n = d[i2] + (d[i2 + 1] << 8) + (d[i2 + 2] << 16) + ((d[i2 + 3] & 127) << 24);
      if (n >= 214e7) {
        crypto.randomBytes(4).copy(d, i2);
      } else {
        rd.push(n % 1e7);
        i2 += 4;
      }
    }
    i2 = k / 4;
  } else {
    throw Error(cryptoUnavailable);
  }
  k = rd[--i2];
  sd %= LOG_BASE;
  if (k && sd) {
    n = mathpow(10, LOG_BASE - sd);
    rd[i2] = (k / n | 0) * n;
  }
  for (; rd[i2] === 0; i2--)
    rd.pop();
  if (i2 < 0) {
    e2 = 0;
    rd = [0];
  } else {
    e2 = -1;
    for (; rd[0] === 0; e2 -= LOG_BASE)
      rd.shift();
    for (k = 1, n = rd[0]; n >= 10; n /= 10)
      k++;
    if (k < LOG_BASE)
      e2 -= LOG_BASE - k;
  }
  r.e = e2;
  r.d = rd;
  return r;
}
function round$1(x) {
  return finalise(x = new this(x), x.e + 1, this.rounding);
}
function sign$1(x) {
  x = new this(x);
  return x.d ? x.d[0] ? x.s : 0 * x.s : x.s || NaN;
}
function sin$1(x) {
  return new this(x).sin();
}
function sinh$1(x) {
  return new this(x).sinh();
}
function sqrt$1(x) {
  return new this(x).sqrt();
}
function sub(x, y) {
  return new this(x).sub(y);
}
function sum$1() {
  var i2 = 0, args = arguments, x = new this(args[i2]);
  external = false;
  for (; x.s && ++i2 < args.length; )
    x = x.plus(args[i2]);
  external = true;
  return finalise(x, this.precision, this.rounding);
}
function tan$1(x) {
  return new this(x).tan();
}
function tanh$1(x) {
  return new this(x).tanh();
}
function trunc(x) {
  return finalise(x = new this(x), x.e + 1, 1);
}
P$1[Symbol.for("nodejs.util.inspect.custom")] = P$1.toString;
P$1[Symbol.toStringTag] = "Decimal";
var Decimal = P$1.constructor = clone$2(DEFAULTS);
LN10$1 = new Decimal(LN10$1);
PI = new Decimal(PI);
var name$3Y = "BigNumber";
var dependencies$3X = ["?on", "config"];
var createBigNumberClass = /* @__PURE__ */ factory(name$3Y, dependencies$3X, (_ref) => {
  var {
    on,
    config: config3
  } = _ref;
  var BigNumber2 = Decimal.clone({
    precision: config3.precision,
    modulo: Decimal.EUCLID
  });
  BigNumber2.prototype = Object.create(BigNumber2.prototype);
  BigNumber2.prototype.type = "BigNumber";
  BigNumber2.prototype.isBigNumber = true;
  BigNumber2.prototype.toJSON = function() {
    return {
      mathjs: "BigNumber",
      value: this.toString()
    };
  };
  BigNumber2.fromJSON = function(json) {
    return new BigNumber2(json.value);
  };
  if (on) {
    on("config", function(curr, prev) {
      if (curr.precision !== prev.precision) {
        BigNumber2.config({
          precision: curr.precision
        });
      }
    });
  }
  return BigNumber2;
}, {
  isClass: true
});
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else
    a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var complex$1 = { exports: {} };
/**
 * @license Complex.js v2.1.1 12/05/2020
 *
 * Copyright (c) 2020, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/
(function(module, exports) {
  (function(root) {
    var cosh2 = Math.cosh || function(x) {
      return Math.abs(x) < 1e-9 ? 1 - x : (Math.exp(x) + Math.exp(-x)) * 0.5;
    };
    var sinh2 = Math.sinh || function(x) {
      return Math.abs(x) < 1e-9 ? x : (Math.exp(x) - Math.exp(-x)) * 0.5;
    };
    var cosm1 = function(x) {
      var b = Math.PI / 4;
      if (-b > x || x > b) {
        return Math.cos(x) - 1;
      }
      var xx = x * x;
      return xx * (xx * (xx * (xx * (xx * (xx * (xx * (xx / 20922789888e3 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - 1 / 2);
    };
    var hypot2 = function(x, y) {
      var a = Math.abs(x);
      var b = Math.abs(y);
      if (a < 3e3 && b < 3e3) {
        return Math.sqrt(a * a + b * b);
      }
      if (a < b) {
        a = b;
        b = x / y;
      } else {
        b = y / x;
      }
      return a * Math.sqrt(1 + b * b);
    };
    var parser_exit = function() {
      throw SyntaxError("Invalid Param");
    };
    function logHypot(a, b) {
      var _a = Math.abs(a);
      var _b = Math.abs(b);
      if (a === 0) {
        return Math.log(_b);
      }
      if (b === 0) {
        return Math.log(_a);
      }
      if (_a < 3e3 && _b < 3e3) {
        return Math.log(a * a + b * b) * 0.5;
      }
      a = a / 2;
      b = b / 2;
      return 0.5 * Math.log(a * a + b * b) + Math.LN2;
    }
    var parse = function(a, b) {
      var z = { "re": 0, "im": 0 };
      if (a === void 0 || a === null) {
        z["re"] = z["im"] = 0;
      } else if (b !== void 0) {
        z["re"] = a;
        z["im"] = b;
      } else
        switch (typeof a) {
          case "object":
            if ("im" in a && "re" in a) {
              z["re"] = a["re"];
              z["im"] = a["im"];
            } else if ("abs" in a && "arg" in a) {
              if (!Number.isFinite(a["abs"]) && Number.isFinite(a["arg"])) {
                return Complex2["INFINITY"];
              }
              z["re"] = a["abs"] * Math.cos(a["arg"]);
              z["im"] = a["abs"] * Math.sin(a["arg"]);
            } else if ("r" in a && "phi" in a) {
              if (!Number.isFinite(a["r"]) && Number.isFinite(a["phi"])) {
                return Complex2["INFINITY"];
              }
              z["re"] = a["r"] * Math.cos(a["phi"]);
              z["im"] = a["r"] * Math.sin(a["phi"]);
            } else if (a.length === 2) {
              z["re"] = a[0];
              z["im"] = a[1];
            } else {
              parser_exit();
            }
            break;
          case "string":
            z["im"] = /* void */
            z["re"] = 0;
            var tokens = a.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
            var plus = 1;
            var minus = 0;
            if (tokens === null) {
              parser_exit();
            }
            for (var i2 = 0; i2 < tokens.length; i2++) {
              var c = tokens[i2];
              if (c === " " || c === "	" || c === "\n")
                ;
              else if (c === "+") {
                plus++;
              } else if (c === "-") {
                minus++;
              } else if (c === "i" || c === "I") {
                if (plus + minus === 0) {
                  parser_exit();
                }
                if (tokens[i2 + 1] !== " " && !isNaN(tokens[i2 + 1])) {
                  z["im"] += parseFloat((minus % 2 ? "-" : "") + tokens[i2 + 1]);
                  i2++;
                } else {
                  z["im"] += parseFloat((minus % 2 ? "-" : "") + "1");
                }
                plus = minus = 0;
              } else {
                if (plus + minus === 0 || isNaN(c)) {
                  parser_exit();
                }
                if (tokens[i2 + 1] === "i" || tokens[i2 + 1] === "I") {
                  z["im"] += parseFloat((minus % 2 ? "-" : "") + c);
                  i2++;
                } else {
                  z["re"] += parseFloat((minus % 2 ? "-" : "") + c);
                }
                plus = minus = 0;
              }
            }
            if (plus + minus > 0) {
              parser_exit();
            }
            break;
          case "number":
            z["im"] = 0;
            z["re"] = a;
            break;
          default:
            parser_exit();
        }
      if (isNaN(z["re"]) || isNaN(z["im"]))
        ;
      return z;
    };
    function Complex2(a, b) {
      if (!(this instanceof Complex2)) {
        return new Complex2(a, b);
      }
      var z = parse(a, b);
      this["re"] = z["re"];
      this["im"] = z["im"];
    }
    Complex2.prototype = {
      "re": 0,
      "im": 0,
      /**
       * Calculates the sign of a complex number, which is a normalized complex
       *
       * @returns {Complex}
       */
      "sign": function() {
        var abs2 = this["abs"]();
        return new Complex2(
          this["re"] / abs2,
          this["im"] / abs2
        );
      },
      /**
       * Adds two complex numbers
       *
       * @returns {Complex}
       */
      "add": function(a, b) {
        var z = new Complex2(a, b);
        if (this["isInfinite"]() && z["isInfinite"]()) {
          return Complex2["NAN"];
        }
        if (this["isInfinite"]() || z["isInfinite"]()) {
          return Complex2["INFINITY"];
        }
        return new Complex2(
          this["re"] + z["re"],
          this["im"] + z["im"]
        );
      },
      /**
       * Subtracts two complex numbers
       *
       * @returns {Complex}
       */
      "sub": function(a, b) {
        var z = new Complex2(a, b);
        if (this["isInfinite"]() && z["isInfinite"]()) {
          return Complex2["NAN"];
        }
        if (this["isInfinite"]() || z["isInfinite"]()) {
          return Complex2["INFINITY"];
        }
        return new Complex2(
          this["re"] - z["re"],
          this["im"] - z["im"]
        );
      },
      /**
       * Multiplies two complex numbers
       *
       * @returns {Complex}
       */
      "mul": function(a, b) {
        var z = new Complex2(a, b);
        if (this["isInfinite"]() && z["isZero"]() || this["isZero"]() && z["isInfinite"]()) {
          return Complex2["NAN"];
        }
        if (this["isInfinite"]() || z["isInfinite"]()) {
          return Complex2["INFINITY"];
        }
        if (z["im"] === 0 && this["im"] === 0) {
          return new Complex2(this["re"] * z["re"], 0);
        }
        return new Complex2(
          this["re"] * z["re"] - this["im"] * z["im"],
          this["re"] * z["im"] + this["im"] * z["re"]
        );
      },
      /**
       * Divides two complex numbers
       *
       * @returns {Complex}
       */
      "div": function(a, b) {
        var z = new Complex2(a, b);
        if (this["isZero"]() && z["isZero"]() || this["isInfinite"]() && z["isInfinite"]()) {
          return Complex2["NAN"];
        }
        if (this["isInfinite"]() || z["isZero"]()) {
          return Complex2["INFINITY"];
        }
        if (this["isZero"]() || z["isInfinite"]()) {
          return Complex2["ZERO"];
        }
        a = this["re"];
        b = this["im"];
        var c = z["re"];
        var d = z["im"];
        var t, x;
        if (0 === d) {
          return new Complex2(a / c, b / c);
        }
        if (Math.abs(c) < Math.abs(d)) {
          x = c / d;
          t = c * x + d;
          return new Complex2(
            (a * x + b) / t,
            (b * x - a) / t
          );
        } else {
          x = d / c;
          t = d * x + c;
          return new Complex2(
            (a + b * x) / t,
            (b - a * x) / t
          );
        }
      },
      /**
       * Calculate the power of two complex numbers
       *
       * @returns {Complex}
       */
      "pow": function(a, b) {
        var z = new Complex2(a, b);
        a = this["re"];
        b = this["im"];
        if (z["isZero"]()) {
          return Complex2["ONE"];
        }
        if (z["im"] === 0) {
          if (b === 0 && a > 0) {
            return new Complex2(Math.pow(a, z["re"]), 0);
          } else if (a === 0) {
            switch ((z["re"] % 4 + 4) % 4) {
              case 0:
                return new Complex2(Math.pow(b, z["re"]), 0);
              case 1:
                return new Complex2(0, Math.pow(b, z["re"]));
              case 2:
                return new Complex2(-Math.pow(b, z["re"]), 0);
              case 3:
                return new Complex2(0, -Math.pow(b, z["re"]));
            }
          }
        }
        if (a === 0 && b === 0 && z["re"] > 0 && z["im"] >= 0) {
          return Complex2["ZERO"];
        }
        var arg2 = Math.atan2(b, a);
        var loh = logHypot(a, b);
        a = Math.exp(z["re"] * loh - z["im"] * arg2);
        b = z["im"] * loh + z["re"] * arg2;
        return new Complex2(
          a * Math.cos(b),
          a * Math.sin(b)
        );
      },
      /**
       * Calculate the complex square root
       *
       * @returns {Complex}
       */
      "sqrt": function() {
        var a = this["re"];
        var b = this["im"];
        var r = this["abs"]();
        var re2, im2;
        if (a >= 0) {
          if (b === 0) {
            return new Complex2(Math.sqrt(a), 0);
          }
          re2 = 0.5 * Math.sqrt(2 * (r + a));
        } else {
          re2 = Math.abs(b) / Math.sqrt(2 * (r - a));
        }
        if (a <= 0) {
          im2 = 0.5 * Math.sqrt(2 * (r - a));
        } else {
          im2 = Math.abs(b) / Math.sqrt(2 * (r + a));
        }
        return new Complex2(re2, b < 0 ? -im2 : im2);
      },
      /**
       * Calculate the complex exponent
       *
       * @returns {Complex}
       */
      "exp": function() {
        var tmp = Math.exp(this["re"]);
        if (this["im"] === 0)
          ;
        return new Complex2(
          tmp * Math.cos(this["im"]),
          tmp * Math.sin(this["im"])
        );
      },
      /**
       * Calculate the complex exponent and subtracts one.
       *
       * This may be more accurate than `Complex(x).exp().sub(1)` if
       * `x` is small.
       *
       * @returns {Complex}
       */
      "expm1": function() {
        var a = this["re"];
        var b = this["im"];
        return new Complex2(
          Math.expm1(a) * Math.cos(b) + cosm1(b),
          Math.exp(a) * Math.sin(b)
        );
      },
      /**
       * Calculate the natural log
       *
       * @returns {Complex}
       */
      "log": function() {
        var a = this["re"];
        var b = this["im"];
        return new Complex2(
          logHypot(a, b),
          Math.atan2(b, a)
        );
      },
      /**
       * Calculate the magnitude of the complex number
       *
       * @returns {number}
       */
      "abs": function() {
        return hypot2(this["re"], this["im"]);
      },
      /**
       * Calculate the angle of the complex number
       *
       * @returns {number}
       */
      "arg": function() {
        return Math.atan2(this["im"], this["re"]);
      },
      /**
       * Calculate the sine of the complex number
       *
       * @returns {Complex}
       */
      "sin": function() {
        var a = this["re"];
        var b = this["im"];
        return new Complex2(
          Math.sin(a) * cosh2(b),
          Math.cos(a) * sinh2(b)
        );
      },
      /**
       * Calculate the cosine
       *
       * @returns {Complex}
       */
      "cos": function() {
        var a = this["re"];
        var b = this["im"];
        return new Complex2(
          Math.cos(a) * cosh2(b),
          -Math.sin(a) * sinh2(b)
        );
      },
      /**
       * Calculate the tangent
       *
       * @returns {Complex}
       */
      "tan": function() {
        var a = 2 * this["re"];
        var b = 2 * this["im"];
        var d = Math.cos(a) + cosh2(b);
        return new Complex2(
          Math.sin(a) / d,
          sinh2(b) / d
        );
      },
      /**
       * Calculate the cotangent
       *
       * @returns {Complex}
       */
      "cot": function() {
        var a = 2 * this["re"];
        var b = 2 * this["im"];
        var d = Math.cos(a) - cosh2(b);
        return new Complex2(
          -Math.sin(a) / d,
          sinh2(b) / d
        );
      },
      /**
       * Calculate the secant
       *
       * @returns {Complex}
       */
      "sec": function() {
        var a = this["re"];
        var b = this["im"];
        var d = 0.5 * cosh2(2 * b) + 0.5 * Math.cos(2 * a);
        return new Complex2(
          Math.cos(a) * cosh2(b) / d,
          Math.sin(a) * sinh2(b) / d
        );
      },
      /**
       * Calculate the cosecans
       *
       * @returns {Complex}
       */
      "csc": function() {
        var a = this["re"];
        var b = this["im"];
        var d = 0.5 * cosh2(2 * b) - 0.5 * Math.cos(2 * a);
        return new Complex2(
          Math.sin(a) * cosh2(b) / d,
          -Math.cos(a) * sinh2(b) / d
        );
      },
      /**
       * Calculate the complex arcus sinus
       *
       * @returns {Complex}
       */
      "asin": function() {
        var a = this["re"];
        var b = this["im"];
        var t1 = new Complex2(
          b * b - a * a + 1,
          -2 * a * b
        )["sqrt"]();
        var t2 = new Complex2(
          t1["re"] - b,
          t1["im"] + a
        )["log"]();
        return new Complex2(t2["im"], -t2["re"]);
      },
      /**
       * Calculate the complex arcus cosinus
       *
       * @returns {Complex}
       */
      "acos": function() {
        var a = this["re"];
        var b = this["im"];
        var t1 = new Complex2(
          b * b - a * a + 1,
          -2 * a * b
        )["sqrt"]();
        var t2 = new Complex2(
          t1["re"] - b,
          t1["im"] + a
        )["log"]();
        return new Complex2(Math.PI / 2 - t2["im"], t2["re"]);
      },
      /**
       * Calculate the complex arcus tangent
       *
       * @returns {Complex}
       */
      "atan": function() {
        var a = this["re"];
        var b = this["im"];
        if (a === 0) {
          if (b === 1) {
            return new Complex2(0, Infinity);
          }
          if (b === -1) {
            return new Complex2(0, -Infinity);
          }
        }
        var d = a * a + (1 - b) * (1 - b);
        var t1 = new Complex2(
          (1 - b * b - a * a) / d,
          -2 * a / d
        ).log();
        return new Complex2(-0.5 * t1["im"], 0.5 * t1["re"]);
      },
      /**
       * Calculate the complex arcus cotangent
       *
       * @returns {Complex}
       */
      "acot": function() {
        var a = this["re"];
        var b = this["im"];
        if (b === 0) {
          return new Complex2(Math.atan2(1, a), 0);
        }
        var d = a * a + b * b;
        return d !== 0 ? new Complex2(
          a / d,
          -b / d
        ).atan() : new Complex2(
          a !== 0 ? a / 0 : 0,
          b !== 0 ? -b / 0 : 0
        ).atan();
      },
      /**
       * Calculate the complex arcus secant
       *
       * @returns {Complex}
       */
      "asec": function() {
        var a = this["re"];
        var b = this["im"];
        if (a === 0 && b === 0) {
          return new Complex2(0, Infinity);
        }
        var d = a * a + b * b;
        return d !== 0 ? new Complex2(
          a / d,
          -b / d
        ).acos() : new Complex2(
          a !== 0 ? a / 0 : 0,
          b !== 0 ? -b / 0 : 0
        ).acos();
      },
      /**
       * Calculate the complex arcus cosecans
       *
       * @returns {Complex}
       */
      "acsc": function() {
        var a = this["re"];
        var b = this["im"];
        if (a === 0 && b === 0) {
          return new Complex2(Math.PI / 2, Infinity);
        }
        var d = a * a + b * b;
        return d !== 0 ? new Complex2(
          a / d,
          -b / d
        ).asin() : new Complex2(
          a !== 0 ? a / 0 : 0,
          b !== 0 ? -b / 0 : 0
        ).asin();
      },
      /**
       * Calculate the complex sinh
       *
       * @returns {Complex}
       */
      "sinh": function() {
        var a = this["re"];
        var b = this["im"];
        return new Complex2(
          sinh2(a) * Math.cos(b),
          cosh2(a) * Math.sin(b)
        );
      },
      /**
       * Calculate the complex cosh
       *
       * @returns {Complex}
       */
      "cosh": function() {
        var a = this["re"];
        var b = this["im"];
        return new Complex2(
          cosh2(a) * Math.cos(b),
          sinh2(a) * Math.sin(b)
        );
      },
      /**
       * Calculate the complex tanh
       *
       * @returns {Complex}
       */
      "tanh": function() {
        var a = 2 * this["re"];
        var b = 2 * this["im"];
        var d = cosh2(a) + Math.cos(b);
        return new Complex2(
          sinh2(a) / d,
          Math.sin(b) / d
        );
      },
      /**
       * Calculate the complex coth
       *
       * @returns {Complex}
       */
      "coth": function() {
        var a = 2 * this["re"];
        var b = 2 * this["im"];
        var d = cosh2(a) - Math.cos(b);
        return new Complex2(
          sinh2(a) / d,
          -Math.sin(b) / d
        );
      },
      /**
       * Calculate the complex coth
       *
       * @returns {Complex}
       */
      "csch": function() {
        var a = this["re"];
        var b = this["im"];
        var d = Math.cos(2 * b) - cosh2(2 * a);
        return new Complex2(
          -2 * sinh2(a) * Math.cos(b) / d,
          2 * cosh2(a) * Math.sin(b) / d
        );
      },
      /**
       * Calculate the complex sech
       *
       * @returns {Complex}
       */
      "sech": function() {
        var a = this["re"];
        var b = this["im"];
        var d = Math.cos(2 * b) + cosh2(2 * a);
        return new Complex2(
          2 * cosh2(a) * Math.cos(b) / d,
          -2 * sinh2(a) * Math.sin(b) / d
        );
      },
      /**
       * Calculate the complex asinh
       *
       * @returns {Complex}
       */
      "asinh": function() {
        var tmp = this["im"];
        this["im"] = -this["re"];
        this["re"] = tmp;
        var res = this["asin"]();
        this["re"] = -this["im"];
        this["im"] = tmp;
        tmp = res["re"];
        res["re"] = -res["im"];
        res["im"] = tmp;
        return res;
      },
      /**
       * Calculate the complex acosh
       *
       * @returns {Complex}
       */
      "acosh": function() {
        var res = this["acos"]();
        if (res["im"] <= 0) {
          var tmp = res["re"];
          res["re"] = -res["im"];
          res["im"] = tmp;
        } else {
          var tmp = res["im"];
          res["im"] = -res["re"];
          res["re"] = tmp;
        }
        return res;
      },
      /**
       * Calculate the complex atanh
       *
       * @returns {Complex}
       */
      "atanh": function() {
        var a = this["re"];
        var b = this["im"];
        var noIM = a > 1 && b === 0;
        var oneMinus = 1 - a;
        var onePlus = 1 + a;
        var d = oneMinus * oneMinus + b * b;
        var x = d !== 0 ? new Complex2(
          (onePlus * oneMinus - b * b) / d,
          (b * oneMinus + onePlus * b) / d
        ) : new Complex2(
          a !== -1 ? a / 0 : 0,
          b !== 0 ? b / 0 : 0
        );
        var temp = x["re"];
        x["re"] = logHypot(x["re"], x["im"]) / 2;
        x["im"] = Math.atan2(x["im"], temp) / 2;
        if (noIM) {
          x["im"] = -x["im"];
        }
        return x;
      },
      /**
       * Calculate the complex acoth
       *
       * @returns {Complex}
       */
      "acoth": function() {
        var a = this["re"];
        var b = this["im"];
        if (a === 0 && b === 0) {
          return new Complex2(0, Math.PI / 2);
        }
        var d = a * a + b * b;
        return d !== 0 ? new Complex2(
          a / d,
          -b / d
        ).atanh() : new Complex2(
          a !== 0 ? a / 0 : 0,
          b !== 0 ? -b / 0 : 0
        ).atanh();
      },
      /**
       * Calculate the complex acsch
       *
       * @returns {Complex}
       */
      "acsch": function() {
        var a = this["re"];
        var b = this["im"];
        if (b === 0) {
          return new Complex2(
            a !== 0 ? Math.log(a + Math.sqrt(a * a + 1)) : Infinity,
            0
          );
        }
        var d = a * a + b * b;
        return d !== 0 ? new Complex2(
          a / d,
          -b / d
        ).asinh() : new Complex2(
          a !== 0 ? a / 0 : 0,
          b !== 0 ? -b / 0 : 0
        ).asinh();
      },
      /**
       * Calculate the complex asech
       *
       * @returns {Complex}
       */
      "asech": function() {
        var a = this["re"];
        var b = this["im"];
        if (this["isZero"]()) {
          return Complex2["INFINITY"];
        }
        var d = a * a + b * b;
        return d !== 0 ? new Complex2(
          a / d,
          -b / d
        ).acosh() : new Complex2(
          a !== 0 ? a / 0 : 0,
          b !== 0 ? -b / 0 : 0
        ).acosh();
      },
      /**
       * Calculate the complex inverse 1/z
       *
       * @returns {Complex}
       */
      "inverse": function() {
        if (this["isZero"]()) {
          return Complex2["INFINITY"];
        }
        if (this["isInfinite"]()) {
          return Complex2["ZERO"];
        }
        var a = this["re"];
        var b = this["im"];
        var d = a * a + b * b;
        return new Complex2(a / d, -b / d);
      },
      /**
       * Returns the complex conjugate
       *
       * @returns {Complex}
       */
      "conjugate": function() {
        return new Complex2(this["re"], -this["im"]);
      },
      /**
       * Gets the negated complex number
       *
       * @returns {Complex}
       */
      "neg": function() {
        return new Complex2(-this["re"], -this["im"]);
      },
      /**
       * Ceils the actual complex number
       *
       * @returns {Complex}
       */
      "ceil": function(places) {
        places = Math.pow(10, places || 0);
        return new Complex2(
          Math.ceil(this["re"] * places) / places,
          Math.ceil(this["im"] * places) / places
        );
      },
      /**
       * Floors the actual complex number
       *
       * @returns {Complex}
       */
      "floor": function(places) {
        places = Math.pow(10, places || 0);
        return new Complex2(
          Math.floor(this["re"] * places) / places,
          Math.floor(this["im"] * places) / places
        );
      },
      /**
       * Ceils the actual complex number
       *
       * @returns {Complex}
       */
      "round": function(places) {
        places = Math.pow(10, places || 0);
        return new Complex2(
          Math.round(this["re"] * places) / places,
          Math.round(this["im"] * places) / places
        );
      },
      /**
       * Compares two complex numbers
       *
       * **Note:** new Complex(Infinity).equals(Infinity) === false
       *
       * @returns {boolean}
       */
      "equals": function(a, b) {
        var z = new Complex2(a, b);
        return Math.abs(z["re"] - this["re"]) <= Complex2["EPSILON"] && Math.abs(z["im"] - this["im"]) <= Complex2["EPSILON"];
      },
      /**
       * Clones the actual object
       *
       * @returns {Complex}
       */
      "clone": function() {
        return new Complex2(this["re"], this["im"]);
      },
      /**
       * Gets a string of the actual complex number
       *
       * @returns {string}
       */
      "toString": function() {
        var a = this["re"];
        var b = this["im"];
        var ret = "";
        if (this["isNaN"]()) {
          return "NaN";
        }
        if (this["isInfinite"]()) {
          return "Infinity";
        }
        if (Math.abs(a) < Complex2["EPSILON"]) {
          a = 0;
        }
        if (Math.abs(b) < Complex2["EPSILON"]) {
          b = 0;
        }
        if (b === 0) {
          return ret + a;
        }
        if (a !== 0) {
          ret += a;
          ret += " ";
          if (b < 0) {
            b = -b;
            ret += "-";
          } else {
            ret += "+";
          }
          ret += " ";
        } else if (b < 0) {
          b = -b;
          ret += "-";
        }
        if (1 !== b) {
          ret += b;
        }
        return ret + "i";
      },
      /**
       * Returns the actual number as a vector
       *
       * @returns {Array}
       */
      "toVector": function() {
        return [this["re"], this["im"]];
      },
      /**
       * Returns the actual real value of the current object
       *
       * @returns {number|null}
       */
      "valueOf": function() {
        if (this["im"] === 0) {
          return this["re"];
        }
        return null;
      },
      /**
       * Determines whether a complex number is not on the Riemann sphere.
       *
       * @returns {boolean}
       */
      "isNaN": function() {
        return isNaN(this["re"]) || isNaN(this["im"]);
      },
      /**
       * Determines whether or not a complex number is at the zero pole of the
       * Riemann sphere.
       *
       * @returns {boolean}
       */
      "isZero": function() {
        return this["im"] === 0 && this["re"] === 0;
      },
      /**
       * Determines whether a complex number is not at the infinity pole of the
       * Riemann sphere.
       *
       * @returns {boolean}
       */
      "isFinite": function() {
        return isFinite(this["re"]) && isFinite(this["im"]);
      },
      /**
       * Determines whether or not a complex number is at the infinity pole of the
       * Riemann sphere.
       *
       * @returns {boolean}
       */
      "isInfinite": function() {
        return !(this["isNaN"]() || this["isFinite"]());
      }
    };
    Complex2["ZERO"] = new Complex2(0, 0);
    Complex2["ONE"] = new Complex2(1, 0);
    Complex2["I"] = new Complex2(0, 1);
    Complex2["PI"] = new Complex2(Math.PI, 0);
    Complex2["E"] = new Complex2(Math.E, 0);
    Complex2["INFINITY"] = new Complex2(Infinity, Infinity);
    Complex2["NAN"] = new Complex2(NaN, NaN);
    Complex2["EPSILON"] = 1e-15;
    {
      Object.defineProperty(Complex2, "__esModule", { "value": true });
      Complex2["default"] = Complex2;
      Complex2["Complex"] = Complex2;
      module["exports"] = Complex2;
    }
  })();
})(complex$1);
var complexExports = complex$1.exports;
const Complex$1 = /* @__PURE__ */ getDefaultExportFromCjs(complexExports);
var name$3X = "Complex";
var dependencies$3W = [];
var createComplexClass = /* @__PURE__ */ factory(name$3X, dependencies$3W, () => {
  Object.defineProperty(Complex$1, "name", {
    value: "Complex"
  });
  Complex$1.prototype.constructor = Complex$1;
  Complex$1.prototype.type = "Complex";
  Complex$1.prototype.isComplex = true;
  Complex$1.prototype.toJSON = function() {
    return {
      mathjs: "Complex",
      re: this.re,
      im: this.im
    };
  };
  Complex$1.prototype.toPolar = function() {
    return {
      r: this.abs(),
      phi: this.arg()
    };
  };
  Complex$1.prototype.format = function(options) {
    var str = "";
    var im2 = this.im;
    var re2 = this.re;
    var strRe = format$3(this.re, options);
    var strIm = format$3(this.im, options);
    var precision = isNumber(options) ? options : options ? options.precision : null;
    if (precision !== null) {
      var epsilon = Math.pow(10, -precision);
      if (Math.abs(re2 / im2) < epsilon) {
        re2 = 0;
      }
      if (Math.abs(im2 / re2) < epsilon) {
        im2 = 0;
      }
    }
    if (im2 === 0) {
      str = strRe;
    } else if (re2 === 0) {
      if (im2 === 1) {
        str = "i";
      } else if (im2 === -1) {
        str = "-i";
      } else {
        str = strIm + "i";
      }
    } else {
      if (im2 < 0) {
        if (im2 === -1) {
          str = strRe + " - i";
        } else {
          str = strRe + " - " + strIm.substring(1) + "i";
        }
      } else {
        if (im2 === 1) {
          str = strRe + " + i";
        } else {
          str = strRe + " + " + strIm + "i";
        }
      }
    }
    return str;
  };
  Complex$1.fromPolar = function(args) {
    switch (arguments.length) {
      case 1: {
        var arg2 = arguments[0];
        if (typeof arg2 === "object") {
          return Complex$1(arg2);
        } else {
          throw new TypeError("Input has to be an object with r and phi keys.");
        }
      }
      case 2: {
        var r = arguments[0];
        var phi2 = arguments[1];
        if (isNumber(r)) {
          if (isUnit(phi2) && phi2.hasBase("ANGLE")) {
            phi2 = phi2.toNumber("rad");
          }
          if (isNumber(phi2)) {
            return new Complex$1({
              r,
              phi: phi2
            });
          }
          throw new TypeError("Phi is not a number nor an angle unit.");
        } else {
          throw new TypeError("Radius r is not a number.");
        }
      }
      default:
        throw new SyntaxError("Wrong number of arguments in function fromPolar");
    }
  };
  Complex$1.prototype.valueOf = Complex$1.prototype.toString;
  Complex$1.fromJSON = function(json) {
    return new Complex$1(json);
  };
  Complex$1.compare = function(a, b) {
    if (a.re > b.re) {
      return 1;
    }
    if (a.re < b.re) {
      return -1;
    }
    if (a.im > b.im) {
      return 1;
    }
    if (a.im < b.im) {
      return -1;
    }
    return 0;
  };
  return Complex$1;
}, {
  isClass: true
});
var fraction$1 = { exports: {} };
/**
 * @license Fraction.js v4.3.0 20/08/2023
 * https://www.xarg.org/2014/03/rational-numbers-in-javascript/
 *
 * Copyright (c) 2023, Robert Eisele (robert@raw.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/
(function(module, exports) {
  (function(root) {
    var MAX_CYCLE_LEN = 2e3;
    var P2 = {
      "s": 1,
      "n": 0,
      "d": 1
    };
    function assign(n, s) {
      if (isNaN(n = parseInt(n, 10))) {
        throw InvalidParameter();
      }
      return n * s;
    }
    function newFraction(n, d) {
      if (d === 0) {
        throw DivisionByZero();
      }
      var f = Object.create(Fraction2.prototype);
      f["s"] = n < 0 ? -1 : 1;
      n = n < 0 ? -n : n;
      var a = gcd2(n, d);
      f["n"] = n / a;
      f["d"] = d / a;
      return f;
    }
    function factorize(num) {
      var factors = {};
      var n = num;
      var i2 = 2;
      var s = 4;
      while (s <= n) {
        while (n % i2 === 0) {
          n /= i2;
          factors[i2] = (factors[i2] || 0) + 1;
        }
        s += 1 + 2 * i2++;
      }
      if (n !== num) {
        if (n > 1)
          factors[n] = (factors[n] || 0) + 1;
      } else {
        factors[num] = (factors[num] || 0) + 1;
      }
      return factors;
    }
    var parse = function(p1, p2) {
      var n = 0, d = 1, s = 1;
      var v = 0, w = 0, x = 0, y = 1, z = 1;
      var A = 0, B = 1;
      var C = 1, D = 1;
      var N = 1e7;
      var M;
      if (p1 === void 0 || p1 === null)
        ;
      else if (p2 !== void 0) {
        n = p1;
        d = p2;
        s = n * d;
        if (n % 1 !== 0 || d % 1 !== 0) {
          throw NonIntegerParameter();
        }
      } else
        switch (typeof p1) {
          case "object": {
            if ("d" in p1 && "n" in p1) {
              n = p1["n"];
              d = p1["d"];
              if ("s" in p1)
                n *= p1["s"];
            } else if (0 in p1) {
              n = p1[0];
              if (1 in p1)
                d = p1[1];
            } else {
              throw InvalidParameter();
            }
            s = n * d;
            break;
          }
          case "number": {
            if (p1 < 0) {
              s = p1;
              p1 = -p1;
            }
            if (p1 % 1 === 0) {
              n = p1;
            } else if (p1 > 0) {
              if (p1 >= 1) {
                z = Math.pow(10, Math.floor(1 + Math.log(p1) / Math.LN10));
                p1 /= z;
              }
              while (B <= N && D <= N) {
                M = (A + C) / (B + D);
                if (p1 === M) {
                  if (B + D <= N) {
                    n = A + C;
                    d = B + D;
                  } else if (D > B) {
                    n = C;
                    d = D;
                  } else {
                    n = A;
                    d = B;
                  }
                  break;
                } else {
                  if (p1 > M) {
                    A += C;
                    B += D;
                  } else {
                    C += A;
                    D += B;
                  }
                  if (B > N) {
                    n = C;
                    d = D;
                  } else {
                    n = A;
                    d = B;
                  }
                }
              }
              n *= z;
            } else if (isNaN(p1) || isNaN(p2)) {
              d = n = NaN;
            }
            break;
          }
          case "string": {
            B = p1.match(/\d+|./g);
            if (B === null)
              throw InvalidParameter();
            if (B[A] === "-") {
              s = -1;
              A++;
            } else if (B[A] === "+") {
              A++;
            }
            if (B.length === A + 1) {
              w = assign(B[A++], s);
            } else if (B[A + 1] === "." || B[A] === ".") {
              if (B[A] !== ".") {
                v = assign(B[A++], s);
              }
              A++;
              if (A + 1 === B.length || B[A + 1] === "(" && B[A + 3] === ")" || B[A + 1] === "'" && B[A + 3] === "'") {
                w = assign(B[A], s);
                y = Math.pow(10, B[A].length);
                A++;
              }
              if (B[A] === "(" && B[A + 2] === ")" || B[A] === "'" && B[A + 2] === "'") {
                x = assign(B[A + 1], s);
                z = Math.pow(10, B[A + 1].length) - 1;
                A += 3;
              }
            } else if (B[A + 1] === "/" || B[A + 1] === ":") {
              w = assign(B[A], s);
              y = assign(B[A + 2], 1);
              A += 3;
            } else if (B[A + 3] === "/" && B[A + 1] === " ") {
              v = assign(B[A], s);
              w = assign(B[A + 2], s);
              y = assign(B[A + 4], 1);
              A += 5;
            }
            if (B.length <= A) {
              d = y * z;
              s = /* void */
              n = x + d * v + z * w;
              break;
            }
          }
          default:
            throw InvalidParameter();
        }
      if (d === 0) {
        throw DivisionByZero();
      }
      P2["s"] = s < 0 ? -1 : 1;
      P2["n"] = Math.abs(n);
      P2["d"] = Math.abs(d);
    };
    function modpow(b, e2, m) {
      var r = 1;
      for (; e2 > 0; b = b * b % m, e2 >>= 1) {
        if (e2 & 1) {
          r = r * b % m;
        }
      }
      return r;
    }
    function cycleLen(n, d) {
      for (; d % 2 === 0; d /= 2) {
      }
      for (; d % 5 === 0; d /= 5) {
      }
      if (d === 1)
        return 0;
      var rem = 10 % d;
      var t = 1;
      for (; rem !== 1; t++) {
        rem = rem * 10 % d;
        if (t > MAX_CYCLE_LEN)
          return 0;
      }
      return t;
    }
    function cycleStart(n, d, len) {
      var rem1 = 1;
      var rem2 = modpow(10, len, d);
      for (var t = 0; t < 300; t++) {
        if (rem1 === rem2)
          return t;
        rem1 = rem1 * 10 % d;
        rem2 = rem2 * 10 % d;
      }
      return 0;
    }
    function gcd2(a, b) {
      if (!a)
        return b;
      if (!b)
        return a;
      while (1) {
        a %= b;
        if (!a)
          return b;
        b %= a;
        if (!b)
          return a;
      }
    }
    function Fraction2(a, b) {
      parse(a, b);
      if (this instanceof Fraction2) {
        a = gcd2(P2["d"], P2["n"]);
        this["s"] = P2["s"];
        this["n"] = P2["n"] / a;
        this["d"] = P2["d"] / a;
      } else {
        return newFraction(P2["s"] * P2["n"], P2["d"]);
      }
    }
    var DivisionByZero = function() {
      return new Error("Division by Zero");
    };
    var InvalidParameter = function() {
      return new Error("Invalid argument");
    };
    var NonIntegerParameter = function() {
      return new Error("Parameters must be integer");
    };
    Fraction2.prototype = {
      "s": 1,
      "n": 0,
      "d": 1,
      /**
       * Calculates the absolute value
       *
       * Ex: new Fraction(-4).abs() => 4
       **/
      "abs": function() {
        return newFraction(this["n"], this["d"]);
      },
      /**
       * Inverts the sign of the current fraction
       *
       * Ex: new Fraction(-4).neg() => 4
       **/
      "neg": function() {
        return newFraction(-this["s"] * this["n"], this["d"]);
      },
      /**
       * Adds two rational numbers
       *
       * Ex: new Fraction({n: 2, d: 3}).add("14.9") => 467 / 30
       **/
      "add": function(a, b) {
        parse(a, b);
        return newFraction(
          this["s"] * this["n"] * P2["d"] + P2["s"] * this["d"] * P2["n"],
          this["d"] * P2["d"]
        );
      },
      /**
       * Subtracts two rational numbers
       *
       * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30
       **/
      "sub": function(a, b) {
        parse(a, b);
        return newFraction(
          this["s"] * this["n"] * P2["d"] - P2["s"] * this["d"] * P2["n"],
          this["d"] * P2["d"]
        );
      },
      /**
       * Multiplies two rational numbers
       *
       * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111
       **/
      "mul": function(a, b) {
        parse(a, b);
        return newFraction(
          this["s"] * P2["s"] * this["n"] * P2["n"],
          this["d"] * P2["d"]
        );
      },
      /**
       * Divides two rational numbers
       *
       * Ex: new Fraction("-17.(345)").inverse().div(3)
       **/
      "div": function(a, b) {
        parse(a, b);
        return newFraction(
          this["s"] * P2["s"] * this["n"] * P2["d"],
          this["d"] * P2["n"]
        );
      },
      /**
       * Clones the actual object
       *
       * Ex: new Fraction("-17.(345)").clone()
       **/
      "clone": function() {
        return newFraction(this["s"] * this["n"], this["d"]);
      },
      /**
       * Calculates the modulo of two rational numbers - a more precise fmod
       *
       * Ex: new Fraction('4.(3)').mod([7, 8]) => (13/3) % (7/8) = (5/6)
       **/
      "mod": function(a, b) {
        if (isNaN(this["n"]) || isNaN(this["d"])) {
          return new Fraction2(NaN);
        }
        if (a === void 0) {
          return newFraction(this["s"] * this["n"] % this["d"], 1);
        }
        parse(a, b);
        if (0 === P2["n"] && 0 === this["d"]) {
          throw DivisionByZero();
        }
        return newFraction(
          this["s"] * (P2["d"] * this["n"]) % (P2["n"] * this["d"]),
          P2["d"] * this["d"]
        );
      },
      /**
       * Calculates the fractional gcd of two rational numbers
       *
       * Ex: new Fraction(5,8).gcd(3,7) => 1/56
       */
      "gcd": function(a, b) {
        parse(a, b);
        return newFraction(gcd2(P2["n"], this["n"]) * gcd2(P2["d"], this["d"]), P2["d"] * this["d"]);
      },
      /**
       * Calculates the fractional lcm of two rational numbers
       *
       * Ex: new Fraction(5,8).lcm(3,7) => 15
       */
      "lcm": function(a, b) {
        parse(a, b);
        if (P2["n"] === 0 && this["n"] === 0) {
          return newFraction(0, 1);
        }
        return newFraction(P2["n"] * this["n"], gcd2(P2["n"], this["n"]) * gcd2(P2["d"], this["d"]));
      },
      /**
       * Calculates the ceil of a rational number
       *
       * Ex: new Fraction('4.(3)').ceil() => (5 / 1)
       **/
      "ceil": function(places) {
        places = Math.pow(10, places || 0);
        if (isNaN(this["n"]) || isNaN(this["d"])) {
          return new Fraction2(NaN);
        }
        return newFraction(Math.ceil(places * this["s"] * this["n"] / this["d"]), places);
      },
      /**
       * Calculates the floor of a rational number
       *
       * Ex: new Fraction('4.(3)').floor() => (4 / 1)
       **/
      "floor": function(places) {
        places = Math.pow(10, places || 0);
        if (isNaN(this["n"]) || isNaN(this["d"])) {
          return new Fraction2(NaN);
        }
        return newFraction(Math.floor(places * this["s"] * this["n"] / this["d"]), places);
      },
      /**
       * Rounds a rational numbers
       *
       * Ex: new Fraction('4.(3)').round() => (4 / 1)
       **/
      "round": function(places) {
        places = Math.pow(10, places || 0);
        if (isNaN(this["n"]) || isNaN(this["d"])) {
          return new Fraction2(NaN);
        }
        return newFraction(Math.round(places * this["s"] * this["n"] / this["d"]), places);
      },
      /**
       * Gets the inverse of the fraction, means numerator and denominator are exchanged
       *
       * Ex: new Fraction([-3, 4]).inverse() => -4 / 3
       **/
      "inverse": function() {
        return newFraction(this["s"] * this["d"], this["n"]);
      },
      /**
       * Calculates the fraction to some rational exponent, if possible
       *
       * Ex: new Fraction(-1,2).pow(-3) => -8
       */
      "pow": function(a, b) {
        parse(a, b);
        if (P2["d"] === 1) {
          if (P2["s"] < 0) {
            return newFraction(Math.pow(this["s"] * this["d"], P2["n"]), Math.pow(this["n"], P2["n"]));
          } else {
            return newFraction(Math.pow(this["s"] * this["n"], P2["n"]), Math.pow(this["d"], P2["n"]));
          }
        }
        if (this["s"] < 0)
          return null;
        var N = factorize(this["n"]);
        var D = factorize(this["d"]);
        var n = 1;
        var d = 1;
        for (var k in N) {
          if (k === "1")
            continue;
          if (k === "0") {
            n = 0;
            break;
          }
          N[k] *= P2["n"];
          if (N[k] % P2["d"] === 0) {
            N[k] /= P2["d"];
          } else
            return null;
          n *= Math.pow(k, N[k]);
        }
        for (var k in D) {
          if (k === "1")
            continue;
          D[k] *= P2["n"];
          if (D[k] % P2["d"] === 0) {
            D[k] /= P2["d"];
          } else
            return null;
          d *= Math.pow(k, D[k]);
        }
        if (P2["s"] < 0) {
          return newFraction(d, n);
        }
        return newFraction(n, d);
      },
      /**
       * Check if two rational numbers are the same
       *
       * Ex: new Fraction(19.6).equals([98, 5]);
       **/
      "equals": function(a, b) {
        parse(a, b);
        return this["s"] * this["n"] * P2["d"] === P2["s"] * P2["n"] * this["d"];
      },
      /**
       * Check if two rational numbers are the same
       *
       * Ex: new Fraction(19.6).equals([98, 5]);
       **/
      "compare": function(a, b) {
        parse(a, b);
        var t = this["s"] * this["n"] * P2["d"] - P2["s"] * P2["n"] * this["d"];
        return (0 < t) - (t < 0);
      },
      "simplify": function(eps) {
        if (isNaN(this["n"]) || isNaN(this["d"])) {
          return this;
        }
        eps = eps || 1e-3;
        var thisABS = this["abs"]();
        var cont = thisABS["toContinued"]();
        for (var i2 = 1; i2 < cont.length; i2++) {
          var s = newFraction(cont[i2 - 1], 1);
          for (var k = i2 - 2; k >= 0; k--) {
            s = s["inverse"]()["add"](cont[k]);
          }
          if (Math.abs(s["sub"](thisABS).valueOf()) < eps) {
            return s["mul"](this["s"]);
          }
        }
        return this;
      },
      /**
       * Check if two rational numbers are divisible
       *
       * Ex: new Fraction(19.6).divisible(1.5);
       */
      "divisible": function(a, b) {
        parse(a, b);
        return !(!(P2["n"] * this["d"]) || this["n"] * P2["d"] % (P2["n"] * this["d"]));
      },
      /**
       * Returns a decimal representation of the fraction
       *
       * Ex: new Fraction("100.'91823'").valueOf() => 100.91823918239183
       **/
      "valueOf": function() {
        return this["s"] * this["n"] / this["d"];
      },
      /**
       * Returns a string-fraction representation of a Fraction object
       *
       * Ex: new Fraction("1.'3'").toFraction(true) => "4 1/3"
       **/
      "toFraction": function(excludeWhole) {
        var whole, str = "";
        var n = this["n"];
        var d = this["d"];
        if (this["s"] < 0) {
          str += "-";
        }
        if (d === 1) {
          str += n;
        } else {
          if (excludeWhole && (whole = Math.floor(n / d)) > 0) {
            str += whole;
            str += " ";
            n %= d;
          }
          str += n;
          str += "/";
          str += d;
        }
        return str;
      },
      /**
       * Returns a latex representation of a Fraction object
       *
       * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"
       **/
      "toLatex": function(excludeWhole) {
        var whole, str = "";
        var n = this["n"];
        var d = this["d"];
        if (this["s"] < 0) {
          str += "-";
        }
        if (d === 1) {
          str += n;
        } else {
          if (excludeWhole && (whole = Math.floor(n / d)) > 0) {
            str += whole;
            n %= d;
          }
          str += "\\frac{";
          str += n;
          str += "}{";
          str += d;
          str += "}";
        }
        return str;
      },
      /**
       * Returns an array of continued fraction elements
       *
       * Ex: new Fraction("7/8").toContinued() => [0,1,7]
       */
      "toContinued": function() {
        var t;
        var a = this["n"];
        var b = this["d"];
        var res = [];
        if (isNaN(a) || isNaN(b)) {
          return res;
        }
        do {
          res.push(Math.floor(a / b));
          t = a % b;
          a = b;
          b = t;
        } while (a !== 1);
        return res;
      },
      /**
       * Creates a string representation of a fraction with all digits
       *
       * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"
       **/
      "toString": function(dec) {
        var N = this["n"];
        var D = this["d"];
        if (isNaN(N) || isNaN(D)) {
          return "NaN";
        }
        dec = dec || 15;
        var cycLen = cycleLen(N, D);
        var cycOff = cycleStart(N, D, cycLen);
        var str = this["s"] < 0 ? "-" : "";
        str += N / D | 0;
        N %= D;
        N *= 10;
        if (N)
          str += ".";
        if (cycLen) {
          for (var i2 = cycOff; i2--; ) {
            str += N / D | 0;
            N %= D;
            N *= 10;
          }
          str += "(";
          for (var i2 = cycLen; i2--; ) {
            str += N / D | 0;
            N %= D;
            N *= 10;
          }
          str += ")";
        } else {
          for (var i2 = dec; N && i2--; ) {
            str += N / D | 0;
            N %= D;
            N *= 10;
          }
        }
        return str;
      }
    };
    {
      Object.defineProperty(Fraction2, "__esModule", { "value": true });
      Fraction2["default"] = Fraction2;
      Fraction2["Fraction"] = Fraction2;
      module["exports"] = Fraction2;
    }
  })();
})(fraction$1);
var fractionExports = fraction$1.exports;
const Fraction$1 = /* @__PURE__ */ getDefaultExportFromCjs(fractionExports);
var name$3W = "Fraction";
var dependencies$3V = [];
var createFractionClass = /* @__PURE__ */ factory(name$3W, dependencies$3V, () => {
  Object.defineProperty(Fraction$1, "name", {
    value: "Fraction"
  });
  Fraction$1.prototype.constructor = Fraction$1;
  Fraction$1.prototype.type = "Fraction";
  Fraction$1.prototype.isFraction = true;
  Fraction$1.prototype.toJSON = function() {
    return {
      mathjs: "Fraction",
      n: this.s * this.n,
      d: this.d
    };
  };
  Fraction$1.fromJSON = function(json) {
    return new Fraction$1(json);
  };
  return Fraction$1;
}, {
  isClass: true
});
var name$3V = "Range";
var dependencies$3U = [];
var createRangeClass = /* @__PURE__ */ factory(name$3V, dependencies$3U, () => {
  function Range2(start, end, step) {
    if (!(this instanceof Range2)) {
      throw new SyntaxError("Constructor must be called with the new operator");
    }
    var hasStart = start !== null && start !== void 0;
    var hasEnd = end !== null && end !== void 0;
    var hasStep = step !== null && step !== void 0;
    if (hasStart) {
      if (isBigNumber(start)) {
        start = start.toNumber();
      } else if (typeof start !== "number") {
        throw new TypeError("Parameter start must be a number");
      }
    }
    if (hasEnd) {
      if (isBigNumber(end)) {
        end = end.toNumber();
      } else if (typeof end !== "number") {
        throw new TypeError("Parameter end must be a number");
      }
    }
    if (hasStep) {
      if (isBigNumber(step)) {
        step = step.toNumber();
      } else if (typeof step !== "number") {
        throw new TypeError("Parameter step must be a number");
      }
    }
    this.start = hasStart ? parseFloat(start) : 0;
    this.end = hasEnd ? parseFloat(end) : 0;
    this.step = hasStep ? parseFloat(step) : 1;
  }
  Range2.prototype.type = "Range";
  Range2.prototype.isRange = true;
  Range2.parse = function(str) {
    if (typeof str !== "string") {
      return null;
    }
    var args = str.split(":");
    var nums = args.map(function(arg2) {
      return parseFloat(arg2);
    });
    var invalid = nums.some(function(num) {
      return isNaN(num);
    });
    if (invalid) {
      return null;
    }
    switch (nums.length) {
      case 2:
        return new Range2(nums[0], nums[1]);
      case 3:
        return new Range2(nums[0], nums[2], nums[1]);
      default:
        return null;
    }
  };
  Range2.prototype.clone = function() {
    return new Range2(this.start, this.end, this.step);
  };
  Range2.prototype.size = function() {
    var len = 0;
    var start = this.start;
    var step = this.step;
    var end = this.end;
    var diff2 = end - start;
    if (sign$2(step) === sign$2(diff2)) {
      len = Math.ceil(diff2 / step);
    } else if (diff2 === 0) {
      len = 0;
    }
    if (isNaN(len)) {
      len = 0;
    }
    return [len];
  };
  Range2.prototype.min = function() {
    var size2 = this.size()[0];
    if (size2 > 0) {
      if (this.step > 0) {
        return this.start;
      } else {
        return this.start + (size2 - 1) * this.step;
      }
    } else {
      return void 0;
    }
  };
  Range2.prototype.max = function() {
    var size2 = this.size()[0];
    if (size2 > 0) {
      if (this.step > 0) {
        return this.start + (size2 - 1) * this.step;
      } else {
        return this.start;
      }
    } else {
      return void 0;
    }
  };
  Range2.prototype.forEach = function(callback) {
    var x = this.start;
    var step = this.step;
    var end = this.end;
    var i2 = 0;
    if (step > 0) {
      while (x < end) {
        callback(x, [i2], this);
        x += step;
        i2++;
      }
    } else if (step < 0) {
      while (x > end) {
        callback(x, [i2], this);
        x += step;
        i2++;
      }
    }
  };
  Range2.prototype.map = function(callback) {
    var array = [];
    this.forEach(function(value, index2, obj) {
      array[index2[0]] = callback(value, index2, obj);
    });
    return array;
  };
  Range2.prototype.toArray = function() {
    var array = [];
    this.forEach(function(value, index2) {
      array[index2[0]] = value;
    });
    return array;
  };
  Range2.prototype.valueOf = function() {
    return this.toArray();
  };
  Range2.prototype.format = function(options) {
    var str = format$3(this.start, options);
    if (this.step !== 1) {
      str += ":" + format$3(this.step, options);
    }
    str += ":" + format$3(this.end, options);
    return str;
  };
  Range2.prototype.toString = function() {
    return this.format();
  };
  Range2.prototype.toJSON = function() {
    return {
      mathjs: "Range",
      start: this.start,
      end: this.end,
      step: this.step
    };
  };
  Range2.fromJSON = function(json) {
    return new Range2(json.start, json.end, json.step);
  };
  return Range2;
}, {
  isClass: true
});
var name$3U = "Matrix";
var dependencies$3T = [];
var createMatrixClass = /* @__PURE__ */ factory(name$3U, dependencies$3T, () => {
  function Matrix2() {
    if (!(this instanceof Matrix2)) {
      throw new SyntaxError("Constructor must be called with the new operator");
    }
  }
  Matrix2.prototype.type = "Matrix";
  Matrix2.prototype.isMatrix = true;
  Matrix2.prototype.storage = function() {
    throw new Error("Cannot invoke storage on a Matrix interface");
  };
  Matrix2.prototype.datatype = function() {
    throw new Error("Cannot invoke datatype on a Matrix interface");
  };
  Matrix2.prototype.create = function(data, datatype) {
    throw new Error("Cannot invoke create on a Matrix interface");
  };
  Matrix2.prototype.subset = function(index2, replacement, defaultValue) {
    throw new Error("Cannot invoke subset on a Matrix interface");
  };
  Matrix2.prototype.get = function(index2) {
    throw new Error("Cannot invoke get on a Matrix interface");
  };
  Matrix2.prototype.set = function(index2, value, defaultValue) {
    throw new Error("Cannot invoke set on a Matrix interface");
  };
  Matrix2.prototype.resize = function(size2, defaultValue) {
    throw new Error("Cannot invoke resize on a Matrix interface");
  };
  Matrix2.prototype.reshape = function(size2, defaultValue) {
    throw new Error("Cannot invoke reshape on a Matrix interface");
  };
  Matrix2.prototype.clone = function() {
    throw new Error("Cannot invoke clone on a Matrix interface");
  };
  Matrix2.prototype.size = function() {
    throw new Error("Cannot invoke size on a Matrix interface");
  };
  Matrix2.prototype.map = function(callback, skipZeros) {
    throw new Error("Cannot invoke map on a Matrix interface");
  };
  Matrix2.prototype.forEach = function(callback) {
    throw new Error("Cannot invoke forEach on a Matrix interface");
  };
  Matrix2.prototype[Symbol.iterator] = function() {
    throw new Error("Cannot iterate a Matrix interface");
  };
  Matrix2.prototype.toArray = function() {
    throw new Error("Cannot invoke toArray on a Matrix interface");
  };
  Matrix2.prototype.valueOf = function() {
    throw new Error("Cannot invoke valueOf on a Matrix interface");
  };
  Matrix2.prototype.format = function(options) {
    throw new Error("Cannot invoke format on a Matrix interface");
  };
  Matrix2.prototype.toString = function() {
    throw new Error("Cannot invoke toString on a Matrix interface");
  };
  return Matrix2;
}, {
  isClass: true
});
function formatBigNumberToBase(n, base, size2) {
  var BigNumberCtor = n.constructor;
  var big2 = new BigNumberCtor(2);
  var suffix = "";
  if (size2) {
    if (size2 < 1) {
      throw new Error("size must be in greater than 0");
    }
    if (!isInteger$1(size2)) {
      throw new Error("size must be an integer");
    }
    if (n.greaterThan(big2.pow(size2 - 1).sub(1)) || n.lessThan(big2.pow(size2 - 1).mul(-1))) {
      throw new Error("Value must be in range [-2^".concat(size2 - 1, ", 2^").concat(size2 - 1, "-1]"));
    }
    if (!n.isInteger()) {
      throw new Error("Value must be an integer");
    }
    if (n.lessThan(0)) {
      n = n.add(big2.pow(size2));
    }
    suffix = "i".concat(size2);
  }
  switch (base) {
    case 2:
      return "".concat(n.toBinary()).concat(suffix);
    case 8:
      return "".concat(n.toOctal()).concat(suffix);
    case 16:
      return "".concat(n.toHexadecimal()).concat(suffix);
    default:
      throw new Error("Base ".concat(base, " not supported "));
  }
}
function format$2(value, options) {
  if (typeof options === "function") {
    return options(value);
  }
  if (!value.isFinite()) {
    return value.isNaN() ? "NaN" : value.gt(0) ? "Infinity" : "-Infinity";
  }
  var {
    notation,
    precision,
    wordSize
  } = normalizeFormatOptions(options);
  switch (notation) {
    case "fixed":
      return toFixed(value, precision);
    case "exponential":
      return toExponential(value, precision);
    case "engineering":
      return toEngineering(value, precision);
    case "bin":
      return formatBigNumberToBase(value, 2, wordSize);
    case "oct":
      return formatBigNumberToBase(value, 8, wordSize);
    case "hex":
      return formatBigNumberToBase(value, 16, wordSize);
    case "auto": {
      var lowerExp = _toNumberOrDefault(options === null || options === void 0 ? void 0 : options.lowerExp, -3);
      var upperExp = _toNumberOrDefault(options === null || options === void 0 ? void 0 : options.upperExp, 5);
      if (value.isZero())
        return "0";
      var str;
      var rounded = value.toSignificantDigits(precision);
      var exp2 = rounded.e;
      if (exp2 >= lowerExp && exp2 < upperExp) {
        str = rounded.toFixed();
      } else {
        str = toExponential(value, precision);
      }
      return str.replace(/((\.\d*?)(0+))($|e)/, function() {
        var digits2 = arguments[2];
        var e2 = arguments[4];
        return digits2 !== "." ? digits2 + e2 : e2;
      });
    }
    default:
      throw new Error('Unknown notation "' + notation + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function toEngineering(value, precision) {
  var e2 = value.e;
  var newExp = e2 % 3 === 0 ? e2 : e2 < 0 ? e2 - 3 - e2 % 3 : e2 - e2 % 3;
  var valueWithoutExp = value.mul(Math.pow(10, -newExp));
  var valueStr = valueWithoutExp.toPrecision(precision);
  if (valueStr.includes("e")) {
    var BigNumber2 = value.constructor;
    valueStr = new BigNumber2(valueStr).toFixed();
  }
  return valueStr + "e" + (e2 >= 0 ? "+" : "") + newExp.toString();
}
function toExponential(value, precision) {
  if (precision !== void 0) {
    return value.toExponential(precision - 1);
  } else {
    return value.toExponential();
  }
}
function toFixed(value, precision) {
  return value.toFixed(precision);
}
function _toNumberOrDefault(value, defaultValue) {
  if (isNumber(value)) {
    return value;
  } else if (isBigNumber(value)) {
    return value.toNumber();
  } else {
    return defaultValue;
  }
}
function endsWith(text, search) {
  var start = text.length - search.length;
  var end = text.length;
  return text.substring(start, end) === search;
}
function format$1(value, options) {
  var result = _format(value, options);
  if (options && typeof options === "object" && "truncate" in options && result.length > options.truncate) {
    return result.substring(0, options.truncate - 3) + "...";
  }
  return result;
}
function _format(value, options) {
  if (typeof value === "number") {
    return format$3(value, options);
  }
  if (isBigNumber(value)) {
    return format$2(value, options);
  }
  if (looksLikeFraction(value)) {
    if (!options || options.fraction !== "decimal") {
      return value.s * value.n + "/" + value.d;
    } else {
      return value.toString();
    }
  }
  if (Array.isArray(value)) {
    return formatArray(value, options);
  }
  if (isString(value)) {
    return stringify(value);
  }
  if (typeof value === "function") {
    return value.syntax ? String(value.syntax) : "function";
  }
  if (value && typeof value === "object") {
    if (typeof value.format === "function") {
      return value.format(options);
    } else if (value && value.toString(options) !== {}.toString()) {
      return value.toString(options);
    } else {
      var entries = Object.keys(value).map((key) => {
        return stringify(key) + ": " + format$1(value[key], options);
      });
      return "{" + entries.join(", ") + "}";
    }
  }
  return String(value);
}
function stringify(value) {
  var text = String(value);
  var escaped = "";
  var i2 = 0;
  while (i2 < text.length) {
    var c = text.charAt(i2);
    escaped += c in controlCharacters ? controlCharacters[c] : c;
    i2++;
  }
  return '"' + escaped + '"';
}
var controlCharacters = {
  '"': '\\"',
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t"
};
function escape(value) {
  var text = String(value);
  text = text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return text;
}
function formatArray(array, options) {
  if (Array.isArray(array)) {
    var str = "[";
    var len = array.length;
    for (var i2 = 0; i2 < len; i2++) {
      if (i2 !== 0) {
        str += ", ";
      }
      str += formatArray(array[i2], options);
    }
    str += "]";
    return str;
  } else {
    return format$1(array, options);
  }
}
function looksLikeFraction(value) {
  return value && typeof value === "object" && typeof value.s === "number" && typeof value.n === "number" && typeof value.d === "number" || false;
}
function compareText$1(x, y) {
  if (!isString(x)) {
    throw new TypeError("Unexpected type of argument in function compareText (expected: string or Array or Matrix, actual: " + typeOf$1(x) + ", index: 0)");
  }
  if (!isString(y)) {
    throw new TypeError("Unexpected type of argument in function compareText (expected: string or Array or Matrix, actual: " + typeOf$1(y) + ", index: 1)");
  }
  return x === y ? 0 : x > y ? 1 : -1;
}
function DimensionError(actual, expected, relation) {
  if (!(this instanceof DimensionError)) {
    throw new SyntaxError("Constructor must be called with the new operator");
  }
  this.actual = actual;
  this.expected = expected;
  this.relation = relation;
  this.message = "Dimension mismatch (" + (Array.isArray(actual) ? "[" + actual.join(", ") + "]" : actual) + " " + (this.relation || "!=") + " " + (Array.isArray(expected) ? "[" + expected.join(", ") + "]" : expected) + ")";
  this.stack = new Error().stack;
}
DimensionError.prototype = new RangeError();
DimensionError.prototype.constructor = RangeError;
DimensionError.prototype.name = "DimensionError";
DimensionError.prototype.isDimensionError = true;
function IndexError(index2, min2, max2) {
  if (!(this instanceof IndexError)) {
    throw new SyntaxError("Constructor must be called with the new operator");
  }
  this.index = index2;
  if (arguments.length < 3) {
    this.min = 0;
    this.max = min2;
  } else {
    this.min = min2;
    this.max = max2;
  }
  if (this.min !== void 0 && this.index < this.min) {
    this.message = "Index out of range (" + this.index + " < " + this.min + ")";
  } else if (this.max !== void 0 && this.index >= this.max) {
    this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")";
  } else {
    this.message = "Index out of range (" + this.index + ")";
  }
  this.stack = new Error().stack;
}
IndexError.prototype = new RangeError();
IndexError.prototype.constructor = RangeError;
IndexError.prototype.name = "IndexError";
IndexError.prototype.isIndexError = true;
function arraySize(x) {
  var s = [];
  while (Array.isArray(x)) {
    s.push(x.length);
    x = x[0];
  }
  return s;
}
function _validate(array, size2, dim) {
  var i2;
  var len = array.length;
  if (len !== size2[dim]) {
    throw new DimensionError(len, size2[dim]);
  }
  if (dim < size2.length - 1) {
    var dimNext = dim + 1;
    for (i2 = 0; i2 < len; i2++) {
      var child = array[i2];
      if (!Array.isArray(child)) {
        throw new DimensionError(size2.length - 1, size2.length, "<");
      }
      _validate(array[i2], size2, dimNext);
    }
  } else {
    for (i2 = 0; i2 < len; i2++) {
      if (Array.isArray(array[i2])) {
        throw new DimensionError(size2.length + 1, size2.length, ">");
      }
    }
  }
}
function validate(array, size2) {
  var isScalar = size2.length === 0;
  if (isScalar) {
    if (Array.isArray(array)) {
      throw new DimensionError(array.length, 0);
    }
  } else {
    _validate(array, size2, 0);
  }
}
function validateIndexSourceSize(value, index2) {
  var valueSize = value.isMatrix ? value._size : arraySize(value);
  var sourceSize = index2._sourceSize;
  sourceSize.forEach((sourceDim, i2) => {
    if (sourceDim !== null && sourceDim !== valueSize[i2]) {
      throw new DimensionError(sourceDim, valueSize[i2]);
    }
  });
}
function validateIndex(index2, length) {
  if (index2 !== void 0) {
    if (!isNumber(index2) || !isInteger$1(index2)) {
      throw new TypeError("Index must be an integer (value: " + index2 + ")");
    }
    if (index2 < 0 || typeof length === "number" && index2 >= length) {
      throw new IndexError(index2, length);
    }
  }
}
function isEmptyIndex(index2) {
  for (var i2 = 0; i2 < index2._dimensions.length; ++i2) {
    var dimension = index2._dimensions[i2];
    if (dimension._data && isArray(dimension._data)) {
      if (dimension._size[0] === 0) {
        return true;
      }
    } else if (dimension.isRange) {
      if (dimension.start === dimension.end) {
        return true;
      }
    } else if (isString(dimension)) {
      if (dimension.length === 0) {
        return true;
      }
    }
  }
  return false;
}
function resize$1(array, size2, defaultValue) {
  if (!Array.isArray(size2)) {
    throw new TypeError("Array expected");
  }
  if (size2.length === 0) {
    throw new Error("Resizing to scalar is not supported");
  }
  size2.forEach(function(value) {
    if (!isNumber(value) || !isInteger$1(value) || value < 0) {
      throw new TypeError("Invalid size, must contain positive integers (size: " + format$1(size2) + ")");
    }
  });
  if (isNumber(array) || isBigNumber(array)) {
    array = [array];
  }
  var _defaultValue = defaultValue !== void 0 ? defaultValue : 0;
  _resize(array, size2, 0, _defaultValue);
  return array;
}
function _resize(array, size2, dim, defaultValue) {
  var i2;
  var elem;
  var oldLen = array.length;
  var newLen = size2[dim];
  var minLen = Math.min(oldLen, newLen);
  array.length = newLen;
  if (dim < size2.length - 1) {
    var dimNext = dim + 1;
    for (i2 = 0; i2 < minLen; i2++) {
      elem = array[i2];
      if (!Array.isArray(elem)) {
        elem = [elem];
        array[i2] = elem;
      }
      _resize(elem, size2, dimNext, defaultValue);
    }
    for (i2 = minLen; i2 < newLen; i2++) {
      elem = [];
      array[i2] = elem;
      _resize(elem, size2, dimNext, defaultValue);
    }
  } else {
    for (i2 = 0; i2 < minLen; i2++) {
      while (Array.isArray(array[i2])) {
        array[i2] = array[i2][0];
      }
    }
    for (i2 = minLen; i2 < newLen; i2++) {
      array[i2] = defaultValue;
    }
  }
}
function reshape$1(array, sizes) {
  var flatArray = flatten$1(array);
  var currentLength = flatArray.length;
  if (!Array.isArray(array) || !Array.isArray(sizes)) {
    throw new TypeError("Array expected");
  }
  if (sizes.length === 0) {
    throw new DimensionError(0, currentLength, "!=");
  }
  sizes = processSizesWildcard(sizes, currentLength);
  var newLength = product$1(sizes);
  if (currentLength !== newLength) {
    throw new DimensionError(newLength, currentLength, "!=");
  }
  try {
    return _reshape(flatArray, sizes);
  } catch (e2) {
    if (e2 instanceof DimensionError) {
      throw new DimensionError(newLength, currentLength, "!=");
    }
    throw e2;
  }
}
function processSizesWildcard(sizes, currentLength) {
  var newLength = product$1(sizes);
  var processedSizes = sizes.slice();
  var WILDCARD = -1;
  var wildCardIndex = sizes.indexOf(WILDCARD);
  var isMoreThanOneWildcard = sizes.indexOf(WILDCARD, wildCardIndex + 1) >= 0;
  if (isMoreThanOneWildcard) {
    throw new Error("More than one wildcard in sizes");
  }
  var hasWildcard = wildCardIndex >= 0;
  var canReplaceWildcard = currentLength % newLength === 0;
  if (hasWildcard) {
    if (canReplaceWildcard) {
      processedSizes[wildCardIndex] = -currentLength / newLength;
    } else {
      throw new Error("Could not replace wildcard, since " + currentLength + " is no multiple of " + -newLength);
    }
  }
  return processedSizes;
}
function product$1(array) {
  return array.reduce((prev, curr) => prev * curr, 1);
}
function _reshape(array, sizes) {
  var tmpArray = array;
  var tmpArray2;
  for (var sizeIndex = sizes.length - 1; sizeIndex > 0; sizeIndex--) {
    var size2 = sizes[sizeIndex];
    tmpArray2 = [];
    var length = tmpArray.length / size2;
    for (var i2 = 0; i2 < length; i2++) {
      tmpArray2.push(tmpArray.slice(i2 * size2, (i2 + 1) * size2));
    }
    tmpArray = tmpArray2;
  }
  return tmpArray;
}
function squeeze$1(array, size2) {
  var s = arraySize(array);
  while (Array.isArray(array) && array.length === 1) {
    array = array[0];
    s.shift();
  }
  var dims = s.length;
  while (s[dims - 1] === 1) {
    dims--;
  }
  if (dims < s.length) {
    array = _squeeze(array, dims, 0);
    s.length = dims;
  }
  return array;
}
function _squeeze(array, dims, dim) {
  var i2, ii;
  if (dim < dims) {
    var next = dim + 1;
    for (i2 = 0, ii = array.length; i2 < ii; i2++) {
      array[i2] = _squeeze(array[i2], dims, next);
    }
  } else {
    while (Array.isArray(array)) {
      array = array[0];
    }
  }
  return array;
}
function unsqueeze(array, dims, outer, size2) {
  var s = size2 || arraySize(array);
  if (outer) {
    for (var i2 = 0; i2 < outer; i2++) {
      array = [array];
      s.unshift(1);
    }
  }
  array = _unsqueeze(array, dims, 0);
  while (s.length < dims) {
    s.push(1);
  }
  return array;
}
function _unsqueeze(array, dims, dim) {
  var i2, ii;
  if (Array.isArray(array)) {
    var next = dim + 1;
    for (i2 = 0, ii = array.length; i2 < ii; i2++) {
      array[i2] = _unsqueeze(array[i2], dims, next);
    }
  } else {
    for (var d = dim; d < dims; d++) {
      array = [array];
    }
  }
  return array;
}
function flatten$1(array) {
  if (!Array.isArray(array)) {
    return array;
  }
  var flat = [];
  array.forEach(function callback(value) {
    if (Array.isArray(value)) {
      value.forEach(callback);
    } else {
      flat.push(value);
    }
  });
  return flat;
}
function map$1(array, callback) {
  return Array.prototype.map.call(array, callback);
}
function forEach$1(array, callback) {
  Array.prototype.forEach.call(array, callback);
}
function filter$1(array, callback) {
  if (arraySize(array).length !== 1) {
    throw new Error("Only one dimensional matrices supported");
  }
  return Array.prototype.filter.call(array, callback);
}
function filterRegExp(array, regexp) {
  if (arraySize(array).length !== 1) {
    throw new Error("Only one dimensional matrices supported");
  }
  return Array.prototype.filter.call(array, (entry) => regexp.test(entry));
}
function join(array, separator) {
  return Array.prototype.join.call(array, separator);
}
function identify(a) {
  if (!Array.isArray(a)) {
    throw new TypeError("Array input expected");
  }
  if (a.length === 0) {
    return a;
  }
  var b = [];
  var count2 = 0;
  b[0] = {
    value: a[0],
    identifier: 0
  };
  for (var i2 = 1; i2 < a.length; i2++) {
    if (a[i2] === a[i2 - 1]) {
      count2++;
    } else {
      count2 = 0;
    }
    b.push({
      value: a[i2],
      identifier: count2
    });
  }
  return b;
}
function generalize(a) {
  if (!Array.isArray(a)) {
    throw new TypeError("Array input expected");
  }
  if (a.length === 0) {
    return a;
  }
  var b = [];
  for (var i2 = 0; i2 < a.length; i2++) {
    b.push(a[i2].value);
  }
  return b;
}
function getArrayDataType(array, typeOf2) {
  var type;
  var length = 0;
  for (var i2 = 0; i2 < array.length; i2++) {
    var item = array[i2];
    var _isArray = Array.isArray(item);
    if (i2 === 0 && _isArray) {
      length = item.length;
    }
    if (_isArray && item.length !== length) {
      return void 0;
    }
    var itemType = _isArray ? getArrayDataType(item, typeOf2) : typeOf2(item);
    if (type === void 0) {
      type = itemType;
    } else if (type !== itemType) {
      return "mixed";
    } else
      ;
  }
  return type;
}
function concatRecursive(a, b, concatDim, dim) {
  if (dim < concatDim) {
    if (a.length !== b.length) {
      throw new DimensionError(a.length, b.length);
    }
    var c = [];
    for (var i2 = 0; i2 < a.length; i2++) {
      c[i2] = concatRecursive(a[i2], b[i2], concatDim, dim + 1);
    }
    return c;
  } else {
    return a.concat(b);
  }
}
function concat$1() {
  var arrays = Array.prototype.slice.call(arguments, 0, -1);
  var concatDim = Array.prototype.slice.call(arguments, -1);
  if (arrays.length === 1) {
    return arrays[0];
  }
  if (arrays.length > 1) {
    return arrays.slice(1).reduce(function(A, B) {
      return concatRecursive(A, B, concatDim, 0);
    }, arrays[0]);
  } else {
    throw new Error("Wrong number of arguments in function concat");
  }
}
function broadcastSizes() {
  for (var _len = arguments.length, sizes = new Array(_len), _key = 0; _key < _len; _key++) {
    sizes[_key] = arguments[_key];
  }
  var dimensions = sizes.map((s) => s.length);
  var N = Math.max(...dimensions);
  var sizeMax = new Array(N).fill(null);
  for (var i2 = 0; i2 < sizes.length; i2++) {
    var size2 = sizes[i2];
    var dim = dimensions[i2];
    for (var j = 0; j < dim; j++) {
      var n = N - dim + j;
      if (size2[j] > sizeMax[n]) {
        sizeMax[n] = size2[j];
      }
    }
  }
  for (var _i = 0; _i < sizes.length; _i++) {
    checkBroadcastingRules(sizes[_i], sizeMax);
  }
  return sizeMax;
}
function checkBroadcastingRules(size2, toSize) {
  var N = toSize.length;
  var dim = size2.length;
  for (var j = 0; j < dim; j++) {
    var n = N - dim + j;
    if (size2[j] < toSize[n] && size2[j] > 1 || size2[j] > toSize[n]) {
      throw new Error("shape missmatch: missmatch is found in arg with shape (".concat(size2, ") not possible to broadcast dimension ").concat(dim, " with size ").concat(size2[j], " to size ").concat(toSize[n]));
    }
  }
}
function broadcastTo(array, toSize) {
  var Asize = arraySize(array);
  if (deepStrictEqual(Asize, toSize)) {
    return array;
  }
  checkBroadcastingRules(Asize, toSize);
  var broadcastedSize = broadcastSizes(Asize, toSize);
  var N = broadcastedSize.length;
  var paddedSize = [...Array(N - Asize.length).fill(1), ...Asize];
  var A = clone$1(array);
  if (Asize.length < N) {
    A = reshape$1(A, paddedSize);
    Asize = arraySize(A);
  }
  for (var dim = 0; dim < N; dim++) {
    if (Asize[dim] < broadcastedSize[dim]) {
      A = stretch(A, broadcastedSize[dim], dim);
      Asize = arraySize(A);
    }
  }
  return A;
}
function stretch(arrayToStretch, sizeToStretch, dimToStretch) {
  return concat$1(...Array(sizeToStretch).fill(arrayToStretch), dimToStretch);
}
function clone$1(array) {
  return _extends([], array);
}
function lruQueue(limit) {
  var size2 = 0;
  var base = 1;
  var queue = /* @__PURE__ */ Object.create(null);
  var map2 = /* @__PURE__ */ Object.create(null);
  var index2 = 0;
  var del = function del2(id) {
    var oldIndex = map2[id];
    if (!oldIndex)
      return;
    delete queue[oldIndex];
    delete map2[id];
    --size2;
    if (base !== oldIndex)
      return;
    if (!size2) {
      index2 = 0;
      base = 1;
      return;
    }
    while (!Object.prototype.hasOwnProperty.call(queue, ++base)) {
    }
  };
  limit = Math.abs(limit);
  return {
    hit: function hit(id) {
      var oldIndex = map2[id];
      var nuIndex = ++index2;
      queue[nuIndex] = id;
      map2[id] = nuIndex;
      if (!oldIndex) {
        ++size2;
        if (size2 <= limit)
          return void 0;
        id = queue[base];
        del(id);
        return id;
      }
      delete queue[oldIndex];
      if (base !== oldIndex)
        return void 0;
      while (!Object.prototype.hasOwnProperty.call(queue, ++base)) {
      }
      return void 0;
    },
    delete: del,
    clear: function clear() {
      size2 = index2 = 0;
      base = 1;
      queue = /* @__PURE__ */ Object.create(null);
      map2 = /* @__PURE__ */ Object.create(null);
    }
  };
}
function memoize(fn) {
  var {
    hasher: hasher2,
    limit
  } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  limit = limit == null ? Number.POSITIVE_INFINITY : limit;
  hasher2 = hasher2 == null ? JSON.stringify : hasher2;
  return function memoize2() {
    if (typeof memoize2.cache !== "object") {
      memoize2.cache = {
        values: /* @__PURE__ */ new Map(),
        lru: lruQueue(limit || Number.POSITIVE_INFINITY)
      };
    }
    var args = [];
    for (var i2 = 0; i2 < arguments.length; i2++) {
      args[i2] = arguments[i2];
    }
    var hash = hasher2(args);
    if (memoize2.cache.values.has(hash)) {
      memoize2.cache.lru.hit(hash);
      return memoize2.cache.values.get(hash);
    }
    var newVal = fn.apply(fn, args);
    memoize2.cache.values.set(hash, newVal);
    memoize2.cache.values.delete(memoize2.cache.lru.hit(hash));
    return newVal;
  };
}
function maxArgumentCount(fn) {
  return Object.keys(fn.signatures || {}).reduce(function(args, signature) {
    var count2 = (signature.match(/,/g) || []).length + 1;
    return Math.max(args, count2);
  }, -1);
}
var name$3T = "DenseMatrix";
var dependencies$3S = ["Matrix"];
var createDenseMatrixClass = /* @__PURE__ */ factory(name$3T, dependencies$3S, (_ref) => {
  var {
    Matrix: Matrix2
  } = _ref;
  function DenseMatrix2(data, datatype) {
    if (!(this instanceof DenseMatrix2)) {
      throw new SyntaxError("Constructor must be called with the new operator");
    }
    if (datatype && !isString(datatype)) {
      throw new Error("Invalid datatype: " + datatype);
    }
    if (isMatrix(data)) {
      if (data.type === "DenseMatrix") {
        this._data = clone$3(data._data);
        this._size = clone$3(data._size);
        this._datatype = datatype || data._datatype;
      } else {
        this._data = data.toArray();
        this._size = data.size();
        this._datatype = datatype || data._datatype;
      }
    } else if (data && isArray(data.data) && isArray(data.size)) {
      this._data = data.data;
      this._size = data.size;
      validate(this._data, this._size);
      this._datatype = datatype || data.datatype;
    } else if (isArray(data)) {
      this._data = preprocess(data);
      this._size = arraySize(this._data);
      validate(this._data, this._size);
      this._datatype = datatype;
    } else if (data) {
      throw new TypeError("Unsupported type of data (" + typeOf$1(data) + ")");
    } else {
      this._data = [];
      this._size = [0];
      this._datatype = datatype;
    }
  }
  DenseMatrix2.prototype = new Matrix2();
  DenseMatrix2.prototype.createDenseMatrix = function(data, datatype) {
    return new DenseMatrix2(data, datatype);
  };
  Object.defineProperty(DenseMatrix2, "name", {
    value: "DenseMatrix"
  });
  DenseMatrix2.prototype.constructor = DenseMatrix2;
  DenseMatrix2.prototype.type = "DenseMatrix";
  DenseMatrix2.prototype.isDenseMatrix = true;
  DenseMatrix2.prototype.getDataType = function() {
    return getArrayDataType(this._data, typeOf$1);
  };
  DenseMatrix2.prototype.storage = function() {
    return "dense";
  };
  DenseMatrix2.prototype.datatype = function() {
    return this._datatype;
  };
  DenseMatrix2.prototype.create = function(data, datatype) {
    return new DenseMatrix2(data, datatype);
  };
  DenseMatrix2.prototype.subset = function(index2, replacement, defaultValue) {
    switch (arguments.length) {
      case 1:
        return _get(this, index2);
      case 2:
      case 3:
        return _set(this, index2, replacement, defaultValue);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  };
  DenseMatrix2.prototype.get = function(index2) {
    if (!isArray(index2)) {
      throw new TypeError("Array expected");
    }
    if (index2.length !== this._size.length) {
      throw new DimensionError(index2.length, this._size.length);
    }
    for (var x = 0; x < index2.length; x++) {
      validateIndex(index2[x], this._size[x]);
    }
    var data = this._data;
    for (var i2 = 0, ii = index2.length; i2 < ii; i2++) {
      var indexI = index2[i2];
      validateIndex(indexI, data.length);
      data = data[indexI];
    }
    return data;
  };
  DenseMatrix2.prototype.set = function(index2, value, defaultValue) {
    if (!isArray(index2)) {
      throw new TypeError("Array expected");
    }
    if (index2.length < this._size.length) {
      throw new DimensionError(index2.length, this._size.length, "<");
    }
    var i2, ii, indexI;
    var size2 = index2.map(function(i3) {
      return i3 + 1;
    });
    _fit(this, size2, defaultValue);
    var data = this._data;
    for (i2 = 0, ii = index2.length - 1; i2 < ii; i2++) {
      indexI = index2[i2];
      validateIndex(indexI, data.length);
      data = data[indexI];
    }
    indexI = index2[index2.length - 1];
    validateIndex(indexI, data.length);
    data[indexI] = value;
    return this;
  };
  function _get(matrix2, index2) {
    if (!isIndex(index2)) {
      throw new TypeError("Invalid index");
    }
    var isScalar = index2.isScalar();
    if (isScalar) {
      return matrix2.get(index2.min());
    } else {
      var size2 = index2.size();
      if (size2.length !== matrix2._size.length) {
        throw new DimensionError(size2.length, matrix2._size.length);
      }
      var min2 = index2.min();
      var max2 = index2.max();
      for (var i2 = 0, ii = matrix2._size.length; i2 < ii; i2++) {
        validateIndex(min2[i2], matrix2._size[i2]);
        validateIndex(max2[i2], matrix2._size[i2]);
      }
      return new DenseMatrix2(_getSubmatrix(matrix2._data, index2, size2.length, 0), matrix2._datatype);
    }
  }
  function _getSubmatrix(data, index2, dims, dim) {
    var last = dim === dims - 1;
    var range2 = index2.dimension(dim);
    if (last) {
      return range2.map(function(i2) {
        validateIndex(i2, data.length);
        return data[i2];
      }).valueOf();
    } else {
      return range2.map(function(i2) {
        validateIndex(i2, data.length);
        var child = data[i2];
        return _getSubmatrix(child, index2, dims, dim + 1);
      }).valueOf();
    }
  }
  function _set(matrix2, index2, submatrix, defaultValue) {
    if (!index2 || index2.isIndex !== true) {
      throw new TypeError("Invalid index");
    }
    var iSize = index2.size();
    var isScalar = index2.isScalar();
    var sSize;
    if (isMatrix(submatrix)) {
      sSize = submatrix.size();
      submatrix = submatrix.valueOf();
    } else {
      sSize = arraySize(submatrix);
    }
    if (isScalar) {
      if (sSize.length !== 0) {
        throw new TypeError("Scalar expected");
      }
      matrix2.set(index2.min(), submatrix, defaultValue);
    } else {
      if (!deepStrictEqual(sSize, iSize)) {
        try {
          if (sSize.length === 0) {
            submatrix = broadcastTo([submatrix], iSize);
          } else {
            submatrix = broadcastTo(submatrix, iSize);
          }
          sSize = arraySize(submatrix);
        } catch (_unused) {
        }
      }
      if (iSize.length < matrix2._size.length) {
        throw new DimensionError(iSize.length, matrix2._size.length, "<");
      }
      if (sSize.length < iSize.length) {
        var i2 = 0;
        var outer = 0;
        while (iSize[i2] === 1 && sSize[i2] === 1) {
          i2++;
        }
        while (iSize[i2] === 1) {
          outer++;
          i2++;
        }
        submatrix = unsqueeze(submatrix, iSize.length, outer, sSize);
      }
      if (!deepStrictEqual(iSize, sSize)) {
        throw new DimensionError(iSize, sSize, ">");
      }
      var size2 = index2.max().map(function(i3) {
        return i3 + 1;
      });
      _fit(matrix2, size2, defaultValue);
      var dims = iSize.length;
      var dim = 0;
      _setSubmatrix(matrix2._data, index2, submatrix, dims, dim);
    }
    return matrix2;
  }
  function _setSubmatrix(data, index2, submatrix, dims, dim) {
    var last = dim === dims - 1;
    var range2 = index2.dimension(dim);
    if (last) {
      range2.forEach(function(dataIndex, subIndex) {
        validateIndex(dataIndex);
        data[dataIndex] = submatrix[subIndex[0]];
      });
    } else {
      range2.forEach(function(dataIndex, subIndex) {
        validateIndex(dataIndex);
        _setSubmatrix(data[dataIndex], index2, submatrix[subIndex[0]], dims, dim + 1);
      });
    }
  }
  DenseMatrix2.prototype.resize = function(size2, defaultValue, copy) {
    if (!isCollection(size2)) {
      throw new TypeError("Array or Matrix expected");
    }
    var sizeArray = size2.valueOf().map((value) => {
      return Array.isArray(value) && value.length === 1 ? value[0] : value;
    });
    var m = copy ? this.clone() : this;
    return _resize2(m, sizeArray, defaultValue);
  };
  function _resize2(matrix2, size2, defaultValue) {
    if (size2.length === 0) {
      var v = matrix2._data;
      while (isArray(v)) {
        v = v[0];
      }
      return v;
    }
    matrix2._size = size2.slice(0);
    matrix2._data = resize$1(matrix2._data, matrix2._size, defaultValue);
    return matrix2;
  }
  DenseMatrix2.prototype.reshape = function(size2, copy) {
    var m = copy ? this.clone() : this;
    m._data = reshape$1(m._data, size2);
    var currentLength = m._size.reduce((length, size3) => length * size3);
    m._size = processSizesWildcard(size2, currentLength);
    return m;
  };
  function _fit(matrix2, size2, defaultValue) {
    var newSize = matrix2._size.slice(0);
    var changed = false;
    while (newSize.length < size2.length) {
      newSize.push(0);
      changed = true;
    }
    for (var i2 = 0, ii = size2.length; i2 < ii; i2++) {
      if (size2[i2] > newSize[i2]) {
        newSize[i2] = size2[i2];
        changed = true;
      }
    }
    if (changed) {
      _resize2(matrix2, newSize, defaultValue);
    }
  }
  DenseMatrix2.prototype.clone = function() {
    var m = new DenseMatrix2({
      data: clone$3(this._data),
      size: clone$3(this._size),
      datatype: this._datatype
    });
    return m;
  };
  DenseMatrix2.prototype.size = function() {
    return this._size.slice(0);
  };
  DenseMatrix2.prototype.map = function(callback) {
    var me = this;
    var args = maxArgumentCount(callback);
    var recurse = function recurse2(value, index2) {
      if (isArray(value)) {
        return value.map(function(child, i2) {
          return recurse2(child, index2.concat(i2));
        });
      } else {
        if (args === 1) {
          return callback(value);
        } else if (args === 2) {
          return callback(value, index2);
        } else {
          return callback(value, index2, me);
        }
      }
    };
    var data = recurse(this._data, []);
    var datatype = this._datatype !== void 0 ? getArrayDataType(data, typeOf$1) : void 0;
    return new DenseMatrix2(data, datatype);
  };
  DenseMatrix2.prototype.forEach = function(callback) {
    var me = this;
    var recurse = function recurse2(value, index2) {
      if (isArray(value)) {
        value.forEach(function(child, i2) {
          recurse2(child, index2.concat(i2));
        });
      } else {
        callback(value, index2, me);
      }
    };
    recurse(this._data, []);
  };
  DenseMatrix2.prototype[Symbol.iterator] = function* () {
    var recurse = function* recurse2(value, index2) {
      if (isArray(value)) {
        for (var i2 = 0; i2 < value.length; i2++) {
          yield* recurse2(value[i2], index2.concat(i2));
        }
      } else {
        yield {
          value,
          index: index2
        };
      }
    };
    yield* recurse(this._data, []);
  };
  DenseMatrix2.prototype.rows = function() {
    var result = [];
    var s = this.size();
    if (s.length !== 2) {
      throw new TypeError("Rows can only be returned for a 2D matrix.");
    }
    var data = this._data;
    for (var row2 of data) {
      result.push(new DenseMatrix2([row2], this._datatype));
    }
    return result;
  };
  DenseMatrix2.prototype.columns = function() {
    var _this = this;
    var result = [];
    var s = this.size();
    if (s.length !== 2) {
      throw new TypeError("Rows can only be returned for a 2D matrix.");
    }
    var data = this._data;
    var _loop = function _loop2(i3) {
      var col = data.map((row2) => [row2[i3]]);
      result.push(new DenseMatrix2(col, _this._datatype));
    };
    for (var i2 = 0; i2 < s[1]; i2++) {
      _loop(i2);
    }
    return result;
  };
  DenseMatrix2.prototype.toArray = function() {
    return clone$3(this._data);
  };
  DenseMatrix2.prototype.valueOf = function() {
    return this._data;
  };
  DenseMatrix2.prototype.format = function(options) {
    return format$1(this._data, options);
  };
  DenseMatrix2.prototype.toString = function() {
    return format$1(this._data);
  };
  DenseMatrix2.prototype.toJSON = function() {
    return {
      mathjs: "DenseMatrix",
      data: this._data,
      size: this._size,
      datatype: this._datatype
    };
  };
  DenseMatrix2.prototype.diagonal = function(k) {
    if (k) {
      if (isBigNumber(k)) {
        k = k.toNumber();
      }
      if (!isNumber(k) || !isInteger$1(k)) {
        throw new TypeError("The parameter k must be an integer number");
      }
    } else {
      k = 0;
    }
    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0;
    var rows = this._size[0];
    var columns = this._size[1];
    var n = Math.min(rows - kSub, columns - kSuper);
    var data = [];
    for (var i2 = 0; i2 < n; i2++) {
      data[i2] = this._data[i2 + kSub][i2 + kSuper];
    }
    return new DenseMatrix2({
      data,
      size: [n],
      datatype: this._datatype
    });
  };
  DenseMatrix2.diagonal = function(size2, value, k, defaultValue) {
    if (!isArray(size2)) {
      throw new TypeError("Array expected, size parameter");
    }
    if (size2.length !== 2) {
      throw new Error("Only two dimensions matrix are supported");
    }
    size2 = size2.map(function(s) {
      if (isBigNumber(s)) {
        s = s.toNumber();
      }
      if (!isNumber(s) || !isInteger$1(s) || s < 1) {
        throw new Error("Size values must be positive integers");
      }
      return s;
    });
    if (k) {
      if (isBigNumber(k)) {
        k = k.toNumber();
      }
      if (!isNumber(k) || !isInteger$1(k)) {
        throw new TypeError("The parameter k must be an integer number");
      }
    } else {
      k = 0;
    }
    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0;
    var rows = size2[0];
    var columns = size2[1];
    var n = Math.min(rows - kSub, columns - kSuper);
    var _value;
    if (isArray(value)) {
      if (value.length !== n) {
        throw new Error("Invalid value array length");
      }
      _value = function _value2(i2) {
        return value[i2];
      };
    } else if (isMatrix(value)) {
      var ms = value.size();
      if (ms.length !== 1 || ms[0] !== n) {
        throw new Error("Invalid matrix length");
      }
      _value = function _value2(i2) {
        return value.get([i2]);
      };
    } else {
      _value = function _value2() {
        return value;
      };
    }
    if (!defaultValue) {
      defaultValue = isBigNumber(_value(0)) ? _value(0).mul(0) : 0;
    }
    var data = [];
    if (size2.length > 0) {
      data = resize$1(data, size2, defaultValue);
      for (var d = 0; d < n; d++) {
        data[d + kSub][d + kSuper] = _value(d);
      }
    }
    return new DenseMatrix2({
      data,
      size: [rows, columns]
    });
  };
  DenseMatrix2.fromJSON = function(json) {
    return new DenseMatrix2(json);
  };
  DenseMatrix2.prototype.swapRows = function(i2, j) {
    if (!isNumber(i2) || !isInteger$1(i2) || !isNumber(j) || !isInteger$1(j)) {
      throw new Error("Row index must be positive integers");
    }
    if (this._size.length !== 2) {
      throw new Error("Only two dimensional matrix is supported");
    }
    validateIndex(i2, this._size[0]);
    validateIndex(j, this._size[0]);
    DenseMatrix2._swapRows(i2, j, this._data);
    return this;
  };
  DenseMatrix2._swapRows = function(i2, j, data) {
    var vi = data[i2];
    data[i2] = data[j];
    data[j] = vi;
  };
  function preprocess(data) {
    if (isMatrix(data)) {
      return preprocess(data.valueOf());
    }
    if (isArray(data)) {
      return data.map(preprocess);
    }
    return data;
  }
  return DenseMatrix2;
}, {
  isClass: true
});
var name$3S = "clone";
var dependencies$3R = ["typed"];
var createClone = /* @__PURE__ */ factory(name$3S, dependencies$3R, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$3S, {
    any: clone$3
  });
});
function _switch$1(mat) {
  var I = mat.length;
  var J = mat[0].length;
  var i2, j;
  var ret = [];
  for (j = 0; j < J; j++) {
    var tmp = [];
    for (i2 = 0; i2 < I; i2++) {
      tmp.push(mat[i2][j]);
    }
    ret.push(tmp);
  }
  return ret;
}
function containsCollections(array) {
  for (var i2 = 0; i2 < array.length; i2++) {
    if (isCollection(array[i2])) {
      return true;
    }
  }
  return false;
}
function deepForEach(array, callback) {
  if (isMatrix(array)) {
    array = array.valueOf();
  }
  for (var i2 = 0, ii = array.length; i2 < ii; i2++) {
    var value = array[i2];
    if (Array.isArray(value)) {
      deepForEach(value, callback);
    } else {
      callback(value);
    }
  }
}
function deepMap(array, callback, skipZeros) {
  if (array && typeof array.map === "function") {
    return array.map(function(x) {
      return deepMap(x, callback);
    });
  } else {
    return callback(array);
  }
}
function reduce(mat, dim, callback) {
  var size2 = Array.isArray(mat) ? arraySize(mat) : mat.size();
  if (dim < 0 || dim >= size2.length) {
    throw new IndexError(dim, size2.length);
  }
  if (isMatrix(mat)) {
    return mat.create(_reduce(mat.valueOf(), dim, callback));
  } else {
    return _reduce(mat, dim, callback);
  }
}
function _reduce(mat, dim, callback) {
  var i2, ret, val, tran;
  if (dim <= 0) {
    if (!Array.isArray(mat[0])) {
      val = mat[0];
      for (i2 = 1; i2 < mat.length; i2++) {
        val = callback(val, mat[i2]);
      }
      return val;
    } else {
      tran = _switch$1(mat);
      ret = [];
      for (i2 = 0; i2 < tran.length; i2++) {
        ret[i2] = _reduce(tran[i2], dim - 1, callback);
      }
      return ret;
    }
  } else {
    ret = [];
    for (i2 = 0; i2 < mat.length; i2++) {
      ret[i2] = _reduce(mat[i2], dim - 1, callback);
    }
    return ret;
  }
}
function scatter(a, j, w, x, u, mark, cindex, f, inverse, update, value) {
  var avalues = a._values;
  var aindex = a._index;
  var aptr = a._ptr;
  var k, k0, k1, i2;
  if (x) {
    for (k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
      i2 = aindex[k];
      if (w[i2] !== mark) {
        w[i2] = mark;
        cindex.push(i2);
        {
          x[i2] = avalues[k];
        }
      } else {
        x[i2] = f(x[i2], avalues[k]);
        u[i2] = mark;
      }
    }
  } else {
    for (k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
      i2 = aindex[k];
      if (w[i2] !== mark) {
        w[i2] = mark;
        cindex.push(i2);
      } else {
        u[i2] = mark;
      }
    }
  }
}
var name$3R = "isInteger";
var dependencies$3Q = ["typed"];
var createIsInteger = /* @__PURE__ */ factory(name$3R, dependencies$3Q, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$3R, {
    number: isInteger$1,
    // TODO: what to do with isInteger(add(0.1, 0.2))  ?
    BigNumber: function BigNumber2(x) {
      return x.isInt();
    },
    Fraction: function Fraction2(x) {
      return x.d === 1 && isFinite(x.n);
    },
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var n1$4 = "number";
var n2$2 = "number, number";
function absNumber(a) {
  return Math.abs(a);
}
absNumber.signature = n1$4;
function addNumber(a, b) {
  return a + b;
}
addNumber.signature = n2$2;
function subtractNumber(a, b) {
  return a - b;
}
subtractNumber.signature = n2$2;
function multiplyNumber(a, b) {
  return a * b;
}
multiplyNumber.signature = n2$2;
function unaryMinusNumber(x) {
  return -x;
}
unaryMinusNumber.signature = n1$4;
function unaryPlusNumber(x) {
  return x;
}
unaryPlusNumber.signature = n1$4;
function cbrtNumber(x) {
  return cbrt$2(x);
}
cbrtNumber.signature = n1$4;
function cubeNumber(x) {
  return x * x * x;
}
cubeNumber.signature = n1$4;
function expNumber(x) {
  return Math.exp(x);
}
expNumber.signature = n1$4;
function expm1Number(x) {
  return expm1$1(x);
}
expm1Number.signature = n1$4;
function lcmNumber(a, b) {
  if (!isInteger$1(a) || !isInteger$1(b)) {
    throw new Error("Parameters in function lcm must be integer numbers");
  }
  if (a === 0 || b === 0) {
    return 0;
  }
  var t;
  var prod2 = a * b;
  while (b !== 0) {
    t = b;
    b = a % t;
    a = t;
  }
  return Math.abs(prod2 / a);
}
lcmNumber.signature = n2$2;
function logNumber(x, y) {
  return Math.log(x);
}
function log10Number(x) {
  return log10$2(x);
}
log10Number.signature = n1$4;
function log2Number(x) {
  return log2$2(x);
}
log2Number.signature = n1$4;
function nthRootNumber(a) {
  var root = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
  var inv2 = root < 0;
  if (inv2) {
    root = -root;
  }
  if (root === 0) {
    throw new Error("Root must be non-zero");
  }
  if (a < 0 && Math.abs(root) % 2 !== 1) {
    throw new Error("Root must be odd when a is negative.");
  }
  if (a === 0) {
    return inv2 ? Infinity : 0;
  }
  if (!isFinite(a)) {
    return inv2 ? 0 : a;
  }
  var x = Math.pow(Math.abs(a), 1 / root);
  x = a < 0 ? -x : x;
  return inv2 ? 1 / x : x;
}
function signNumber(x) {
  return sign$2(x);
}
signNumber.signature = n1$4;
function squareNumber(x) {
  return x * x;
}
squareNumber.signature = n1$4;
function xgcdNumber(a, b) {
  var t;
  var q;
  var r;
  var x = 0;
  var lastx = 1;
  var y = 1;
  var lasty = 0;
  if (!isInteger$1(a) || !isInteger$1(b)) {
    throw new Error("Parameters in function xgcd must be integer numbers");
  }
  while (b) {
    q = Math.floor(a / b);
    r = a - q * b;
    t = x;
    x = lastx - q * x;
    lastx = t;
    t = y;
    y = lasty - q * y;
    lasty = t;
    a = b;
    b = r;
  }
  var res;
  if (a < 0) {
    res = [-a, -lastx, -lasty];
  } else {
    res = [a, a ? lastx : 0, lasty];
  }
  return res;
}
xgcdNumber.signature = n2$2;
function powNumber(x, y) {
  if (x * x < 1 && y === Infinity || x * x > 1 && y === -Infinity) {
    return 0;
  }
  return Math.pow(x, y);
}
powNumber.signature = n2$2;
function roundNumber(value) {
  var decimals = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  if (!isInteger$1(decimals) || decimals < 0 || decimals > 15) {
    throw new Error("Number of decimals in function round must be an integer from 0 to 15 inclusive");
  }
  return parseFloat(toFixed$1(value, decimals));
}
var n1$3 = "number";
var n2$1 = "number, number";
function bitAndNumber(x, y) {
  if (!isInteger$1(x) || !isInteger$1(y)) {
    throw new Error("Integers expected in function bitAnd");
  }
  return x & y;
}
bitAndNumber.signature = n2$1;
function bitNotNumber(x) {
  if (!isInteger$1(x)) {
    throw new Error("Integer expected in function bitNot");
  }
  return ~x;
}
bitNotNumber.signature = n1$3;
function bitOrNumber(x, y) {
  if (!isInteger$1(x) || !isInteger$1(y)) {
    throw new Error("Integers expected in function bitOr");
  }
  return x | y;
}
bitOrNumber.signature = n2$1;
function bitXorNumber(x, y) {
  if (!isInteger$1(x) || !isInteger$1(y)) {
    throw new Error("Integers expected in function bitXor");
  }
  return x ^ y;
}
bitXorNumber.signature = n2$1;
function leftShiftNumber(x, y) {
  if (!isInteger$1(x) || !isInteger$1(y)) {
    throw new Error("Integers expected in function leftShift");
  }
  return x << y;
}
leftShiftNumber.signature = n2$1;
function rightArithShiftNumber(x, y) {
  if (!isInteger$1(x) || !isInteger$1(y)) {
    throw new Error("Integers expected in function rightArithShift");
  }
  return x >> y;
}
rightArithShiftNumber.signature = n2$1;
function rightLogShiftNumber(x, y) {
  if (!isInteger$1(x) || !isInteger$1(y)) {
    throw new Error("Integers expected in function rightLogShift");
  }
  return x >>> y;
}
rightLogShiftNumber.signature = n2$1;
function product(i2, n) {
  if (n < i2) {
    return 1;
  }
  if (n === i2) {
    return n;
  }
  var half = n + i2 >> 1;
  return product(i2, half) * product(half + 1, n);
}
function combinationsNumber(n, k) {
  if (!isInteger$1(n) || n < 0) {
    throw new TypeError("Positive integer value expected in function combinations");
  }
  if (!isInteger$1(k) || k < 0) {
    throw new TypeError("Positive integer value expected in function combinations");
  }
  if (k > n) {
    throw new TypeError("k must be less than or equal to n");
  }
  var nMinusk = n - k;
  var answer = 1;
  var firstnumerator = k < nMinusk ? nMinusk + 1 : k + 1;
  var nextdivisor = 2;
  var lastdivisor = k < nMinusk ? k : nMinusk;
  for (var nextnumerator = firstnumerator; nextnumerator <= n; ++nextnumerator) {
    answer *= nextnumerator;
    while (nextdivisor <= lastdivisor && answer % nextdivisor === 0) {
      answer /= nextdivisor;
      ++nextdivisor;
    }
  }
  if (nextdivisor <= lastdivisor) {
    answer /= product(nextdivisor, lastdivisor);
  }
  return answer;
}
combinationsNumber.signature = "number, number";
var pi$1 = Math.PI;
var tau$1 = 2 * Math.PI;
var e$1 = Math.E;
var phi$1 = 1.618033988749895;
var n1$2 = "number";
var n2 = "number, number";
function notNumber(x) {
  return !x;
}
notNumber.signature = n1$2;
function orNumber(x, y) {
  return !!(x || y);
}
orNumber.signature = n2;
function xorNumber(x, y) {
  return !!x !== !!y;
}
xorNumber.signature = n2;
function andNumber(x, y) {
  return !!(x && y);
}
andNumber.signature = n2;
function gammaNumber(n) {
  var x;
  if (isInteger$1(n)) {
    if (n <= 0) {
      return isFinite(n) ? Infinity : NaN;
    }
    if (n > 171) {
      return Infinity;
    }
    return product(1, n - 1);
  }
  if (n < 0.5) {
    return Math.PI / (Math.sin(Math.PI * n) * gammaNumber(1 - n));
  }
  if (n >= 171.35) {
    return Infinity;
  }
  if (n > 85) {
    var twoN = n * n;
    var threeN = twoN * n;
    var fourN = threeN * n;
    var fiveN = fourN * n;
    return Math.sqrt(2 * Math.PI / n) * Math.pow(n / Math.E, n) * (1 + 1 / (12 * n) + 1 / (288 * twoN) - 139 / (51840 * threeN) - 571 / (2488320 * fourN) + 163879 / (209018880 * fiveN) + 5246819 / (75246796800 * fiveN * n));
  }
  --n;
  x = gammaP[0];
  for (var i2 = 1; i2 < gammaP.length; ++i2) {
    x += gammaP[i2] / (n + i2);
  }
  var t = n + gammaG + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
}
gammaNumber.signature = "number";
var gammaG = 4.7421875;
var gammaP = [0.9999999999999971, 57.15623566586292, -59.59796035547549, 14.136097974741746, -0.4919138160976202, 3399464998481189e-20, 4652362892704858e-20, -9837447530487956e-20, 1580887032249125e-19, -21026444172410488e-20, 21743961811521265e-20, -1643181065367639e-19, 8441822398385275e-20, -26190838401581408e-21, 36899182659531625e-22];
var lnSqrt2PI = 0.9189385332046728;
var lgammaG = 5;
var lgammaN = 7;
var lgammaSeries = [1.000000000190015, 76.18009172947146, -86.50532032941678, 24.01409824083091, -1.231739572450155, 0.001208650973866179, -5395239384953e-18];
function lgammaNumber(n) {
  if (n < 0)
    return NaN;
  if (n === 0)
    return Infinity;
  if (!isFinite(n))
    return n;
  if (n < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * n)) - lgammaNumber(1 - n);
  }
  n = n - 1;
  var base = n + lgammaG + 0.5;
  var sum2 = lgammaSeries[0];
  for (var i2 = lgammaN - 1; i2 >= 1; i2--) {
    sum2 += lgammaSeries[i2] / (n + i2);
  }
  return lnSqrt2PI + (n + 0.5) * Math.log(base) - base + Math.log(sum2);
}
lgammaNumber.signature = "number";
var n1$1 = "number";
function acoshNumber(x) {
  return acosh$2(x);
}
acoshNumber.signature = n1$1;
function acotNumber(x) {
  return Math.atan(1 / x);
}
acotNumber.signature = n1$1;
function acothNumber(x) {
  return isFinite(x) ? (Math.log((x + 1) / x) + Math.log(x / (x - 1))) / 2 : 0;
}
acothNumber.signature = n1$1;
function acscNumber(x) {
  return Math.asin(1 / x);
}
acscNumber.signature = n1$1;
function acschNumber(x) {
  var xInv = 1 / x;
  return Math.log(xInv + Math.sqrt(xInv * xInv + 1));
}
acschNumber.signature = n1$1;
function asecNumber(x) {
  return Math.acos(1 / x);
}
asecNumber.signature = n1$1;
function asechNumber(x) {
  var xInv = 1 / x;
  var ret = Math.sqrt(xInv * xInv - 1);
  return Math.log(ret + xInv);
}
asechNumber.signature = n1$1;
function asinhNumber(x) {
  return asinh$2(x);
}
asinhNumber.signature = n1$1;
function atanhNumber(x) {
  return atanh$2(x);
}
atanhNumber.signature = n1$1;
function cotNumber(x) {
  return 1 / Math.tan(x);
}
cotNumber.signature = n1$1;
function cothNumber(x) {
  var e2 = Math.exp(2 * x);
  return (e2 + 1) / (e2 - 1);
}
cothNumber.signature = n1$1;
function cscNumber(x) {
  return 1 / Math.sin(x);
}
cscNumber.signature = n1$1;
function cschNumber(x) {
  if (x === 0) {
    return Number.POSITIVE_INFINITY;
  } else {
    return Math.abs(2 / (Math.exp(x) - Math.exp(-x))) * sign$2(x);
  }
}
cschNumber.signature = n1$1;
function secNumber(x) {
  return 1 / Math.cos(x);
}
secNumber.signature = n1$1;
function sechNumber(x) {
  return 2 / (Math.exp(x) + Math.exp(-x));
}
sechNumber.signature = n1$1;
function sinhNumber(x) {
  return sinh$2(x);
}
sinhNumber.signature = n1$1;
var n1 = "number";
function isNegativeNumber(x) {
  return x < 0;
}
isNegativeNumber.signature = n1;
function isPositiveNumber(x) {
  return x > 0;
}
isPositiveNumber.signature = n1;
function isZeroNumber(x) {
  return x === 0;
}
isZeroNumber.signature = n1;
function isNaNNumber(x) {
  return Number.isNaN(x);
}
isNaNNumber.signature = n1;
var name$3Q = "isNegative";
var dependencies$3P = ["typed"];
var createIsNegative = /* @__PURE__ */ factory(name$3Q, dependencies$3P, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$3Q, {
    number: isNegativeNumber,
    BigNumber: function BigNumber2(x) {
      return x.isNeg() && !x.isZero() && !x.isNaN();
    },
    Fraction: function Fraction2(x) {
      return x.s < 0;
    },
    Unit: typed2.referToSelf((self2) => (x) => typed2.find(self2, x.valueType())(x.value)),
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var name$3P = "isNumeric";
var dependencies$3O = ["typed"];
var createIsNumeric = /* @__PURE__ */ factory(name$3P, dependencies$3O, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$3P, {
    "number | BigNumber | Fraction | boolean": () => true,
    "Complex | Unit | string | null | undefined | Node": () => false,
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var name$3O = "hasNumericValue";
var dependencies$3N = ["typed", "isNumeric"];
var createHasNumericValue = /* @__PURE__ */ factory(name$3O, dependencies$3N, (_ref) => {
  var {
    typed: typed2,
    isNumeric: isNumeric2
  } = _ref;
  return typed2(name$3O, {
    boolean: () => true,
    string: function string2(x) {
      return x.trim().length > 0 && !isNaN(Number(x));
    },
    any: function any(x) {
      return isNumeric2(x);
    }
  });
});
var name$3N = "isPositive";
var dependencies$3M = ["typed"];
var createIsPositive = /* @__PURE__ */ factory(name$3N, dependencies$3M, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$3N, {
    number: isPositiveNumber,
    BigNumber: function BigNumber2(x) {
      return !x.isNeg() && !x.isZero() && !x.isNaN();
    },
    Fraction: function Fraction2(x) {
      return x.s > 0 && x.n > 0;
    },
    Unit: typed2.referToSelf((self2) => (x) => typed2.find(self2, x.valueType())(x.value)),
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var name$3M = "isZero";
var dependencies$3L = ["typed"];
var createIsZero = /* @__PURE__ */ factory(name$3M, dependencies$3L, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$3M, {
    number: isZeroNumber,
    BigNumber: function BigNumber2(x) {
      return x.isZero();
    },
    Complex: function Complex2(x) {
      return x.re === 0 && x.im === 0;
    },
    Fraction: function Fraction2(x) {
      return x.d === 1 && x.n === 0;
    },
    Unit: typed2.referToSelf((self2) => (x) => typed2.find(self2, x.valueType())(x.value)),
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var name$3L = "isNaN";
var dependencies$3K = ["typed"];
var createIsNaN = /* @__PURE__ */ factory(name$3L, dependencies$3K, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$3L, {
    number: isNaNNumber,
    BigNumber: function BigNumber2(x) {
      return x.isNaN();
    },
    Fraction: function Fraction2(x) {
      return false;
    },
    Complex: function Complex2(x) {
      return x.isNaN();
    },
    Unit: function Unit2(x) {
      return Number.isNaN(x.value);
    },
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var name$3K = "typeOf";
var dependencies$3J = ["typed"];
var createTypeOf = /* @__PURE__ */ factory(name$3K, dependencies$3J, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$3K, {
    any: typeOf$1
  });
});
function nearlyEqual(x, y, epsilon) {
  if (epsilon === null || epsilon === void 0) {
    return x.eq(y);
  }
  if (x.eq(y)) {
    return true;
  }
  if (x.isNaN() || y.isNaN()) {
    return false;
  }
  if (x.isFinite() && y.isFinite()) {
    var diff2 = x.minus(y).abs();
    if (diff2.isZero()) {
      return true;
    } else {
      var max2 = x.constructor.max(x.abs(), y.abs());
      return diff2.lte(max2.times(epsilon));
    }
  }
  return false;
}
function complexEquals(x, y, epsilon) {
  return nearlyEqual$1(x.re, y.re, epsilon) && nearlyEqual$1(x.im, y.im, epsilon);
}
var createCompareUnits = /* @__PURE__ */ factory("compareUnits", ["typed"], (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return {
    "Unit, Unit": typed2.referToSelf((self2) => (x, y) => {
      if (!x.equalBase(y)) {
        throw new Error("Cannot compare units with different base");
      }
      return typed2.find(self2, [x.valueType(), y.valueType()])(x.value, y.value);
    })
  };
});
var name$3J = "equalScalar";
var dependencies$3I = ["typed", "config"];
var createEqualScalar = /* @__PURE__ */ factory(name$3J, dependencies$3I, (_ref) => {
  var {
    typed: typed2,
    config: config3
  } = _ref;
  var compareUnits = createCompareUnits({
    typed: typed2
  });
  return typed2(name$3J, {
    "boolean, boolean": function booleanBoolean(x, y) {
      return x === y;
    },
    "number, number": function numberNumber(x, y) {
      return nearlyEqual$1(x, y, config3.epsilon);
    },
    "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
      return x.eq(y) || nearlyEqual(x, y, config3.epsilon);
    },
    "Fraction, Fraction": function FractionFraction(x, y) {
      return x.equals(y);
    },
    "Complex, Complex": function ComplexComplex(x, y) {
      return complexEquals(x, y, config3.epsilon);
    }
  }, compareUnits);
});
factory(name$3J, ["typed", "config"], (_ref2) => {
  var {
    typed: typed2,
    config: config3
  } = _ref2;
  return typed2(name$3J, {
    "number, number": function numberNumber(x, y) {
      return nearlyEqual$1(x, y, config3.epsilon);
    }
  });
});
var name$3I = "SparseMatrix";
var dependencies$3H = ["typed", "equalScalar", "Matrix"];
var createSparseMatrixClass = /* @__PURE__ */ factory(name$3I, dependencies$3H, (_ref) => {
  var {
    typed: typed2,
    equalScalar: equalScalar2,
    Matrix: Matrix2
  } = _ref;
  function SparseMatrix2(data, datatype) {
    if (!(this instanceof SparseMatrix2)) {
      throw new SyntaxError("Constructor must be called with the new operator");
    }
    if (datatype && !isString(datatype)) {
      throw new Error("Invalid datatype: " + datatype);
    }
    if (isMatrix(data)) {
      _createFromMatrix(this, data, datatype);
    } else if (data && isArray(data.index) && isArray(data.ptr) && isArray(data.size)) {
      this._values = data.values;
      this._index = data.index;
      this._ptr = data.ptr;
      this._size = data.size;
      this._datatype = datatype || data.datatype;
    } else if (isArray(data)) {
      _createFromArray(this, data, datatype);
    } else if (data) {
      throw new TypeError("Unsupported type of data (" + typeOf$1(data) + ")");
    } else {
      this._values = [];
      this._index = [];
      this._ptr = [0];
      this._size = [0, 0];
      this._datatype = datatype;
    }
  }
  function _createFromMatrix(matrix2, source, datatype) {
    if (source.type === "SparseMatrix") {
      matrix2._values = source._values ? clone$3(source._values) : void 0;
      matrix2._index = clone$3(source._index);
      matrix2._ptr = clone$3(source._ptr);
      matrix2._size = clone$3(source._size);
      matrix2._datatype = datatype || source._datatype;
    } else {
      _createFromArray(matrix2, source.valueOf(), datatype || source._datatype);
    }
  }
  function _createFromArray(matrix2, data, datatype) {
    matrix2._values = [];
    matrix2._index = [];
    matrix2._ptr = [];
    matrix2._datatype = datatype;
    var rows = data.length;
    var columns = 0;
    var eq = equalScalar2;
    var zero = 0;
    if (isString(datatype)) {
      eq = typed2.find(equalScalar2, [datatype, datatype]) || equalScalar2;
      zero = typed2.convert(0, datatype);
    }
    if (rows > 0) {
      var j = 0;
      do {
        matrix2._ptr.push(matrix2._index.length);
        for (var i2 = 0; i2 < rows; i2++) {
          var row2 = data[i2];
          if (isArray(row2)) {
            if (j === 0 && columns < row2.length) {
              columns = row2.length;
            }
            if (j < row2.length) {
              var v = row2[j];
              if (!eq(v, zero)) {
                matrix2._values.push(v);
                matrix2._index.push(i2);
              }
            }
          } else {
            if (j === 0 && columns < 1) {
              columns = 1;
            }
            if (!eq(row2, zero)) {
              matrix2._values.push(row2);
              matrix2._index.push(i2);
            }
          }
        }
        j++;
      } while (j < columns);
    }
    matrix2._ptr.push(matrix2._index.length);
    matrix2._size = [rows, columns];
  }
  SparseMatrix2.prototype = new Matrix2();
  SparseMatrix2.prototype.createSparseMatrix = function(data, datatype) {
    return new SparseMatrix2(data, datatype);
  };
  Object.defineProperty(SparseMatrix2, "name", {
    value: "SparseMatrix"
  });
  SparseMatrix2.prototype.constructor = SparseMatrix2;
  SparseMatrix2.prototype.type = "SparseMatrix";
  SparseMatrix2.prototype.isSparseMatrix = true;
  SparseMatrix2.prototype.getDataType = function() {
    return getArrayDataType(this._values, typeOf$1);
  };
  SparseMatrix2.prototype.storage = function() {
    return "sparse";
  };
  SparseMatrix2.prototype.datatype = function() {
    return this._datatype;
  };
  SparseMatrix2.prototype.create = function(data, datatype) {
    return new SparseMatrix2(data, datatype);
  };
  SparseMatrix2.prototype.density = function() {
    var rows = this._size[0];
    var columns = this._size[1];
    return rows !== 0 && columns !== 0 ? this._index.length / (rows * columns) : 0;
  };
  SparseMatrix2.prototype.subset = function(index2, replacement, defaultValue) {
    if (!this._values) {
      throw new Error("Cannot invoke subset on a Pattern only matrix");
    }
    switch (arguments.length) {
      case 1:
        return _getsubset(this, index2);
      case 2:
      case 3:
        return _setsubset(this, index2, replacement, defaultValue);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  };
  function _getsubset(matrix2, idx) {
    if (!isIndex(idx)) {
      throw new TypeError("Invalid index");
    }
    var isScalar = idx.isScalar();
    if (isScalar) {
      return matrix2.get(idx.min());
    }
    var size2 = idx.size();
    if (size2.length !== matrix2._size.length) {
      throw new DimensionError(size2.length, matrix2._size.length);
    }
    var i2, ii, k, kk;
    var min2 = idx.min();
    var max2 = idx.max();
    for (i2 = 0, ii = matrix2._size.length; i2 < ii; i2++) {
      validateIndex(min2[i2], matrix2._size[i2]);
      validateIndex(max2[i2], matrix2._size[i2]);
    }
    var mvalues = matrix2._values;
    var mindex = matrix2._index;
    var mptr = matrix2._ptr;
    var rows = idx.dimension(0);
    var columns = idx.dimension(1);
    var w = [];
    var pv = [];
    rows.forEach(function(i3, r) {
      pv[i3] = r[0];
      w[i3] = true;
    });
    var values = mvalues ? [] : void 0;
    var index2 = [];
    var ptr = [];
    columns.forEach(function(j) {
      ptr.push(index2.length);
      for (k = mptr[j], kk = mptr[j + 1]; k < kk; k++) {
        i2 = mindex[k];
        if (w[i2] === true) {
          index2.push(pv[i2]);
          if (values) {
            values.push(mvalues[k]);
          }
        }
      }
    });
    ptr.push(index2.length);
    return new SparseMatrix2({
      values,
      index: index2,
      ptr,
      size: size2,
      datatype: matrix2._datatype
    });
  }
  function _setsubset(matrix2, index2, submatrix, defaultValue) {
    if (!index2 || index2.isIndex !== true) {
      throw new TypeError("Invalid index");
    }
    var iSize = index2.size();
    var isScalar = index2.isScalar();
    var sSize;
    if (isMatrix(submatrix)) {
      sSize = submatrix.size();
      submatrix = submatrix.toArray();
    } else {
      sSize = arraySize(submatrix);
    }
    if (isScalar) {
      if (sSize.length !== 0) {
        throw new TypeError("Scalar expected");
      }
      matrix2.set(index2.min(), submatrix, defaultValue);
    } else {
      if (iSize.length !== 1 && iSize.length !== 2) {
        throw new DimensionError(iSize.length, matrix2._size.length, "<");
      }
      if (sSize.length < iSize.length) {
        var i2 = 0;
        var outer = 0;
        while (iSize[i2] === 1 && sSize[i2] === 1) {
          i2++;
        }
        while (iSize[i2] === 1) {
          outer++;
          i2++;
        }
        submatrix = unsqueeze(submatrix, iSize.length, outer, sSize);
      }
      if (!deepStrictEqual(iSize, sSize)) {
        throw new DimensionError(iSize, sSize, ">");
      }
      if (iSize.length === 1) {
        var range2 = index2.dimension(0);
        range2.forEach(function(dataIndex, subIndex) {
          validateIndex(dataIndex);
          matrix2.set([dataIndex, 0], submatrix[subIndex[0]], defaultValue);
        });
      } else {
        var firstDimensionRange = index2.dimension(0);
        var secondDimensionRange = index2.dimension(1);
        firstDimensionRange.forEach(function(firstDataIndex, firstSubIndex) {
          validateIndex(firstDataIndex);
          secondDimensionRange.forEach(function(secondDataIndex, secondSubIndex) {
            validateIndex(secondDataIndex);
            matrix2.set([firstDataIndex, secondDataIndex], submatrix[firstSubIndex[0]][secondSubIndex[0]], defaultValue);
          });
        });
      }
    }
    return matrix2;
  }
  SparseMatrix2.prototype.get = function(index2) {
    if (!isArray(index2)) {
      throw new TypeError("Array expected");
    }
    if (index2.length !== this._size.length) {
      throw new DimensionError(index2.length, this._size.length);
    }
    if (!this._values) {
      throw new Error("Cannot invoke get on a Pattern only matrix");
    }
    var i2 = index2[0];
    var j = index2[1];
    validateIndex(i2, this._size[0]);
    validateIndex(j, this._size[1]);
    var k = _getValueIndex(i2, this._ptr[j], this._ptr[j + 1], this._index);
    if (k < this._ptr[j + 1] && this._index[k] === i2) {
      return this._values[k];
    }
    return 0;
  };
  SparseMatrix2.prototype.set = function(index2, v, defaultValue) {
    if (!isArray(index2)) {
      throw new TypeError("Array expected");
    }
    if (index2.length !== this._size.length) {
      throw new DimensionError(index2.length, this._size.length);
    }
    if (!this._values) {
      throw new Error("Cannot invoke set on a Pattern only matrix");
    }
    var i2 = index2[0];
    var j = index2[1];
    var rows = this._size[0];
    var columns = this._size[1];
    var eq = equalScalar2;
    var zero = 0;
    if (isString(this._datatype)) {
      eq = typed2.find(equalScalar2, [this._datatype, this._datatype]) || equalScalar2;
      zero = typed2.convert(0, this._datatype);
    }
    if (i2 > rows - 1 || j > columns - 1) {
      _resize2(this, Math.max(i2 + 1, rows), Math.max(j + 1, columns), defaultValue);
      rows = this._size[0];
      columns = this._size[1];
    }
    validateIndex(i2, rows);
    validateIndex(j, columns);
    var k = _getValueIndex(i2, this._ptr[j], this._ptr[j + 1], this._index);
    if (k < this._ptr[j + 1] && this._index[k] === i2) {
      if (!eq(v, zero)) {
        this._values[k] = v;
      } else {
        _remove(k, j, this._values, this._index, this._ptr);
      }
    } else {
      if (!eq(v, zero)) {
        _insert(k, i2, j, v, this._values, this._index, this._ptr);
      }
    }
    return this;
  };
  function _getValueIndex(i2, top, bottom, index2) {
    if (bottom - top === 0) {
      return bottom;
    }
    for (var r = top; r < bottom; r++) {
      if (index2[r] === i2) {
        return r;
      }
    }
    return top;
  }
  function _remove(k, j, values, index2, ptr) {
    values.splice(k, 1);
    index2.splice(k, 1);
    for (var x = j + 1; x < ptr.length; x++) {
      ptr[x]--;
    }
  }
  function _insert(k, i2, j, v, values, index2, ptr) {
    values.splice(k, 0, v);
    index2.splice(k, 0, i2);
    for (var x = j + 1; x < ptr.length; x++) {
      ptr[x]++;
    }
  }
  SparseMatrix2.prototype.resize = function(size2, defaultValue, copy) {
    if (!isCollection(size2)) {
      throw new TypeError("Array or Matrix expected");
    }
    var sizeArray = size2.valueOf().map((value) => {
      return Array.isArray(value) && value.length === 1 ? value[0] : value;
    });
    if (sizeArray.length !== 2) {
      throw new Error("Only two dimensions matrix are supported");
    }
    sizeArray.forEach(function(value) {
      if (!isNumber(value) || !isInteger$1(value) || value < 0) {
        throw new TypeError("Invalid size, must contain positive integers (size: " + format$1(sizeArray) + ")");
      }
    });
    var m = copy ? this.clone() : this;
    return _resize2(m, sizeArray[0], sizeArray[1], defaultValue);
  };
  function _resize2(matrix2, rows, columns, defaultValue) {
    var value = defaultValue || 0;
    var eq = equalScalar2;
    var zero = 0;
    if (isString(matrix2._datatype)) {
      eq = typed2.find(equalScalar2, [matrix2._datatype, matrix2._datatype]) || equalScalar2;
      zero = typed2.convert(0, matrix2._datatype);
      value = typed2.convert(value, matrix2._datatype);
    }
    var ins = !eq(value, zero);
    var r = matrix2._size[0];
    var c = matrix2._size[1];
    var i2, j, k;
    if (columns > c) {
      for (j = c; j < columns; j++) {
        matrix2._ptr[j] = matrix2._values.length;
        if (ins) {
          for (i2 = 0; i2 < r; i2++) {
            matrix2._values.push(value);
            matrix2._index.push(i2);
          }
        }
      }
      matrix2._ptr[columns] = matrix2._values.length;
    } else if (columns < c) {
      matrix2._ptr.splice(columns + 1, c - columns);
      matrix2._values.splice(matrix2._ptr[columns], matrix2._values.length);
      matrix2._index.splice(matrix2._ptr[columns], matrix2._index.length);
    }
    c = columns;
    if (rows > r) {
      if (ins) {
        var n = 0;
        for (j = 0; j < c; j++) {
          matrix2._ptr[j] = matrix2._ptr[j] + n;
          k = matrix2._ptr[j + 1] + n;
          var p = 0;
          for (i2 = r; i2 < rows; i2++, p++) {
            matrix2._values.splice(k + p, 0, value);
            matrix2._index.splice(k + p, 0, i2);
            n++;
          }
        }
        matrix2._ptr[c] = matrix2._values.length;
      }
    } else if (rows < r) {
      var d = 0;
      for (j = 0; j < c; j++) {
        matrix2._ptr[j] = matrix2._ptr[j] - d;
        var k0 = matrix2._ptr[j];
        var k1 = matrix2._ptr[j + 1] - d;
        for (k = k0; k < k1; k++) {
          i2 = matrix2._index[k];
          if (i2 > rows - 1) {
            matrix2._values.splice(k, 1);
            matrix2._index.splice(k, 1);
            d++;
          }
        }
      }
      matrix2._ptr[j] = matrix2._values.length;
    }
    matrix2._size[0] = rows;
    matrix2._size[1] = columns;
    return matrix2;
  }
  SparseMatrix2.prototype.reshape = function(sizes, copy) {
    if (!isArray(sizes)) {
      throw new TypeError("Array expected");
    }
    if (sizes.length !== 2) {
      throw new Error("Sparse matrices can only be reshaped in two dimensions");
    }
    sizes.forEach(function(value) {
      if (!isNumber(value) || !isInteger$1(value) || value <= -2 || value === 0) {
        throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + format$1(sizes) + ")");
      }
    });
    var currentLength = this._size[0] * this._size[1];
    sizes = processSizesWildcard(sizes, currentLength);
    var newLength = sizes[0] * sizes[1];
    if (currentLength !== newLength) {
      throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
    }
    var m = copy ? this.clone() : this;
    if (this._size[0] === sizes[0] && this._size[1] === sizes[1]) {
      return m;
    }
    var colIndex = [];
    for (var i2 = 0; i2 < m._ptr.length; i2++) {
      for (var j = 0; j < m._ptr[i2 + 1] - m._ptr[i2]; j++) {
        colIndex.push(i2);
      }
    }
    var values = m._values.slice();
    var rowIndex = m._index.slice();
    for (var _i = 0; _i < m._index.length; _i++) {
      var r1 = rowIndex[_i];
      var c1 = colIndex[_i];
      var flat = r1 * m._size[1] + c1;
      colIndex[_i] = flat % sizes[1];
      rowIndex[_i] = Math.floor(flat / sizes[1]);
    }
    m._values.length = 0;
    m._index.length = 0;
    m._ptr.length = sizes[1] + 1;
    m._size = sizes.slice();
    for (var _i2 = 0; _i2 < m._ptr.length; _i2++) {
      m._ptr[_i2] = 0;
    }
    for (var h = 0; h < values.length; h++) {
      var _i3 = rowIndex[h];
      var _j = colIndex[h];
      var v = values[h];
      var k = _getValueIndex(_i3, m._ptr[_j], m._ptr[_j + 1], m._index);
      _insert(k, _i3, _j, v, m._values, m._index, m._ptr);
    }
    return m;
  };
  SparseMatrix2.prototype.clone = function() {
    var m = new SparseMatrix2({
      values: this._values ? clone$3(this._values) : void 0,
      index: clone$3(this._index),
      ptr: clone$3(this._ptr),
      size: clone$3(this._size),
      datatype: this._datatype
    });
    return m;
  };
  SparseMatrix2.prototype.size = function() {
    return this._size.slice(0);
  };
  SparseMatrix2.prototype.map = function(callback, skipZeros) {
    if (!this._values) {
      throw new Error("Cannot invoke map on a Pattern only matrix");
    }
    var me = this;
    var rows = this._size[0];
    var columns = this._size[1];
    var args = maxArgumentCount(callback);
    var invoke = function invoke2(v, i2, j) {
      if (args === 1)
        return callback(v);
      if (args === 2)
        return callback(v, [i2, j]);
      return callback(v, [i2, j], me);
    };
    return _map2(this, 0, rows - 1, 0, columns - 1, invoke, skipZeros);
  };
  function _map2(matrix2, minRow, maxRow, minColumn, maxColumn, callback, skipZeros) {
    var values = [];
    var index2 = [];
    var ptr = [];
    var eq = equalScalar2;
    var zero = 0;
    if (isString(matrix2._datatype)) {
      eq = typed2.find(equalScalar2, [matrix2._datatype, matrix2._datatype]) || equalScalar2;
      zero = typed2.convert(0, matrix2._datatype);
    }
    var invoke = function invoke2(v, x, y) {
      v = callback(v, x, y);
      if (!eq(v, zero)) {
        values.push(v);
        index2.push(x);
      }
    };
    for (var j = minColumn; j <= maxColumn; j++) {
      ptr.push(values.length);
      var k0 = matrix2._ptr[j];
      var k1 = matrix2._ptr[j + 1];
      if (skipZeros) {
        for (var k = k0; k < k1; k++) {
          var i2 = matrix2._index[k];
          if (i2 >= minRow && i2 <= maxRow) {
            invoke(matrix2._values[k], i2 - minRow, j - minColumn);
          }
        }
      } else {
        var _values = {};
        for (var _k = k0; _k < k1; _k++) {
          var _i4 = matrix2._index[_k];
          _values[_i4] = matrix2._values[_k];
        }
        for (var _i5 = minRow; _i5 <= maxRow; _i5++) {
          var value = _i5 in _values ? _values[_i5] : 0;
          invoke(value, _i5 - minRow, j - minColumn);
        }
      }
    }
    ptr.push(values.length);
    return new SparseMatrix2({
      values,
      index: index2,
      ptr,
      size: [maxRow - minRow + 1, maxColumn - minColumn + 1]
    });
  }
  SparseMatrix2.prototype.forEach = function(callback, skipZeros) {
    if (!this._values) {
      throw new Error("Cannot invoke forEach on a Pattern only matrix");
    }
    var me = this;
    var rows = this._size[0];
    var columns = this._size[1];
    for (var j = 0; j < columns; j++) {
      var k0 = this._ptr[j];
      var k1 = this._ptr[j + 1];
      if (skipZeros) {
        for (var k = k0; k < k1; k++) {
          var i2 = this._index[k];
          callback(this._values[k], [i2, j], me);
        }
      } else {
        var values = {};
        for (var _k2 = k0; _k2 < k1; _k2++) {
          var _i6 = this._index[_k2];
          values[_i6] = this._values[_k2];
        }
        for (var _i7 = 0; _i7 < rows; _i7++) {
          var value = _i7 in values ? values[_i7] : 0;
          callback(value, [_i7, j], me);
        }
      }
    }
  };
  SparseMatrix2.prototype[Symbol.iterator] = function* () {
    if (!this._values) {
      throw new Error("Cannot iterate a Pattern only matrix");
    }
    var columns = this._size[1];
    for (var j = 0; j < columns; j++) {
      var k0 = this._ptr[j];
      var k1 = this._ptr[j + 1];
      for (var k = k0; k < k1; k++) {
        var i2 = this._index[k];
        yield {
          value: this._values[k],
          index: [i2, j]
        };
      }
    }
  };
  SparseMatrix2.prototype.toArray = function() {
    return _toArray(this._values, this._index, this._ptr, this._size, true);
  };
  SparseMatrix2.prototype.valueOf = function() {
    return _toArray(this._values, this._index, this._ptr, this._size, false);
  };
  function _toArray(values, index2, ptr, size2, copy) {
    var rows = size2[0];
    var columns = size2[1];
    var a = [];
    var i2, j;
    for (i2 = 0; i2 < rows; i2++) {
      a[i2] = [];
      for (j = 0; j < columns; j++) {
        a[i2][j] = 0;
      }
    }
    for (j = 0; j < columns; j++) {
      var k0 = ptr[j];
      var k1 = ptr[j + 1];
      for (var k = k0; k < k1; k++) {
        i2 = index2[k];
        a[i2][j] = values ? copy ? clone$3(values[k]) : values[k] : 1;
      }
    }
    return a;
  }
  SparseMatrix2.prototype.format = function(options) {
    var rows = this._size[0];
    var columns = this._size[1];
    var density = this.density();
    var str = "Sparse Matrix [" + format$1(rows, options) + " x " + format$1(columns, options) + "] density: " + format$1(density, options) + "\n";
    for (var j = 0; j < columns; j++) {
      var k0 = this._ptr[j];
      var k1 = this._ptr[j + 1];
      for (var k = k0; k < k1; k++) {
        var i2 = this._index[k];
        str += "\n    (" + format$1(i2, options) + ", " + format$1(j, options) + ") ==> " + (this._values ? format$1(this._values[k], options) : "X");
      }
    }
    return str;
  };
  SparseMatrix2.prototype.toString = function() {
    return format$1(this.toArray());
  };
  SparseMatrix2.prototype.toJSON = function() {
    return {
      mathjs: "SparseMatrix",
      values: this._values,
      index: this._index,
      ptr: this._ptr,
      size: this._size,
      datatype: this._datatype
    };
  };
  SparseMatrix2.prototype.diagonal = function(k) {
    if (k) {
      if (isBigNumber(k)) {
        k = k.toNumber();
      }
      if (!isNumber(k) || !isInteger$1(k)) {
        throw new TypeError("The parameter k must be an integer number");
      }
    } else {
      k = 0;
    }
    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0;
    var rows = this._size[0];
    var columns = this._size[1];
    var n = Math.min(rows - kSub, columns - kSuper);
    var values = [];
    var index2 = [];
    var ptr = [];
    ptr[0] = 0;
    for (var j = kSuper; j < columns && values.length < n; j++) {
      var k0 = this._ptr[j];
      var k1 = this._ptr[j + 1];
      for (var x = k0; x < k1; x++) {
        var i2 = this._index[x];
        if (i2 === j - kSuper + kSub) {
          values.push(this._values[x]);
          index2[values.length - 1] = i2 - kSub;
          break;
        }
      }
    }
    ptr.push(values.length);
    return new SparseMatrix2({
      values,
      index: index2,
      ptr,
      size: [n, 1]
    });
  };
  SparseMatrix2.fromJSON = function(json) {
    return new SparseMatrix2(json);
  };
  SparseMatrix2.diagonal = function(size2, value, k, defaultValue, datatype) {
    if (!isArray(size2)) {
      throw new TypeError("Array expected, size parameter");
    }
    if (size2.length !== 2) {
      throw new Error("Only two dimensions matrix are supported");
    }
    size2 = size2.map(function(s) {
      if (isBigNumber(s)) {
        s = s.toNumber();
      }
      if (!isNumber(s) || !isInteger$1(s) || s < 1) {
        throw new Error("Size values must be positive integers");
      }
      return s;
    });
    if (k) {
      if (isBigNumber(k)) {
        k = k.toNumber();
      }
      if (!isNumber(k) || !isInteger$1(k)) {
        throw new TypeError("The parameter k must be an integer number");
      }
    } else {
      k = 0;
    }
    var eq = equalScalar2;
    var zero = 0;
    if (isString(datatype)) {
      eq = typed2.find(equalScalar2, [datatype, datatype]) || equalScalar2;
      zero = typed2.convert(0, datatype);
    }
    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0;
    var rows = size2[0];
    var columns = size2[1];
    var n = Math.min(rows - kSub, columns - kSuper);
    var _value;
    if (isArray(value)) {
      if (value.length !== n) {
        throw new Error("Invalid value array length");
      }
      _value = function _value2(i3) {
        return value[i3];
      };
    } else if (isMatrix(value)) {
      var ms = value.size();
      if (ms.length !== 1 || ms[0] !== n) {
        throw new Error("Invalid matrix length");
      }
      _value = function _value2(i3) {
        return value.get([i3]);
      };
    } else {
      _value = function _value2() {
        return value;
      };
    }
    var values = [];
    var index2 = [];
    var ptr = [];
    for (var j = 0; j < columns; j++) {
      ptr.push(values.length);
      var i2 = j - kSuper;
      if (i2 >= 0 && i2 < n) {
        var v = _value(i2);
        if (!eq(v, zero)) {
          index2.push(i2 + kSub);
          values.push(v);
        }
      }
    }
    ptr.push(values.length);
    return new SparseMatrix2({
      values,
      index: index2,
      ptr,
      size: [rows, columns]
    });
  };
  SparseMatrix2.prototype.swapRows = function(i2, j) {
    if (!isNumber(i2) || !isInteger$1(i2) || !isNumber(j) || !isInteger$1(j)) {
      throw new Error("Row index must be positive integers");
    }
    if (this._size.length !== 2) {
      throw new Error("Only two dimensional matrix is supported");
    }
    validateIndex(i2, this._size[0]);
    validateIndex(j, this._size[0]);
    SparseMatrix2._swapRows(i2, j, this._size[1], this._values, this._index, this._ptr);
    return this;
  };
  SparseMatrix2._forEachRow = function(j, values, index2, ptr, callback) {
    var k0 = ptr[j];
    var k1 = ptr[j + 1];
    for (var k = k0; k < k1; k++) {
      callback(index2[k], values[k]);
    }
  };
  SparseMatrix2._swapRows = function(x, y, columns, values, index2, ptr) {
    for (var j = 0; j < columns; j++) {
      var k0 = ptr[j];
      var k1 = ptr[j + 1];
      var kx = _getValueIndex(x, k0, k1, index2);
      var ky = _getValueIndex(y, k0, k1, index2);
      if (kx < k1 && ky < k1 && index2[kx] === x && index2[ky] === y) {
        if (values) {
          var v = values[kx];
          values[kx] = values[ky];
          values[ky] = v;
        }
        continue;
      }
      if (kx < k1 && index2[kx] === x && (ky >= k1 || index2[ky] !== y)) {
        var vx = values ? values[kx] : void 0;
        index2.splice(ky, 0, y);
        if (values) {
          values.splice(ky, 0, vx);
        }
        index2.splice(ky <= kx ? kx + 1 : kx, 1);
        if (values) {
          values.splice(ky <= kx ? kx + 1 : kx, 1);
        }
        continue;
      }
      if (ky < k1 && index2[ky] === y && (kx >= k1 || index2[kx] !== x)) {
        var vy = values ? values[ky] : void 0;
        index2.splice(kx, 0, x);
        if (values) {
          values.splice(kx, 0, vy);
        }
        index2.splice(kx <= ky ? ky + 1 : ky, 1);
        if (values) {
          values.splice(kx <= ky ? ky + 1 : ky, 1);
        }
      }
    }
  };
  return SparseMatrix2;
}, {
  isClass: true
});
var name$3H = "number";
var dependencies$3G = ["typed"];
function getNonDecimalNumberParts(input) {
  var nonDecimalWithRadixMatch = input.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
  if (nonDecimalWithRadixMatch) {
    var radix = {
      "0b": 2,
      "0o": 8,
      "0x": 16
    }[nonDecimalWithRadixMatch[1]];
    var integerPart = nonDecimalWithRadixMatch[2];
    var fractionalPart = nonDecimalWithRadixMatch[3];
    return {
      input,
      radix,
      integerPart,
      fractionalPart
    };
  } else {
    return null;
  }
}
function makeNumberFromNonDecimalParts(parts) {
  var n = parseInt(parts.integerPart, parts.radix);
  var f = 0;
  for (var i2 = 0; i2 < parts.fractionalPart.length; i2++) {
    var digitValue = parseInt(parts.fractionalPart[i2], parts.radix);
    f += digitValue / Math.pow(parts.radix, i2 + 1);
  }
  var result = n + f;
  if (isNaN(result)) {
    throw new SyntaxError('String "' + parts.input + '" is not a valid number');
  }
  return result;
}
var createNumber = /* @__PURE__ */ factory(name$3H, dependencies$3G, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  var number2 = typed2("number", {
    "": function _() {
      return 0;
    },
    number: function number3(x) {
      return x;
    },
    string: function string2(x) {
      if (x === "NaN")
        return NaN;
      var nonDecimalNumberParts = getNonDecimalNumberParts(x);
      if (nonDecimalNumberParts) {
        return makeNumberFromNonDecimalParts(nonDecimalNumberParts);
      }
      var size2 = 0;
      var wordSizeSuffixMatch = x.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
      if (wordSizeSuffixMatch) {
        size2 = Number(wordSizeSuffixMatch[2]);
        x = wordSizeSuffixMatch[1];
      }
      var num = Number(x);
      if (isNaN(num)) {
        throw new SyntaxError('String "' + x + '" is not a valid number');
      }
      if (wordSizeSuffixMatch) {
        if (num > 2 ** size2 - 1) {
          throw new SyntaxError('String "'.concat(x, '" is out of range'));
        }
        if (num >= 2 ** (size2 - 1)) {
          num = num - 2 ** size2;
        }
      }
      return num;
    },
    BigNumber: function BigNumber2(x) {
      return x.toNumber();
    },
    Fraction: function Fraction2(x) {
      return x.valueOf();
    },
    Unit: typed2.referToSelf((self2) => (x) => {
      var clone2 = x.clone();
      clone2.value = self2(x.value);
      return clone2;
    }),
    null: function _null2(x) {
      return 0;
    },
    "Unit, string | Unit": function UnitStringUnit(unit2, valuelessUnit) {
      return unit2.toNumber(valuelessUnit);
    },
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
  number2.fromJSON = function(json) {
    return parseFloat(json.value);
  };
  return number2;
});
var name$3G = "string";
var dependencies$3F = ["typed"];
var createString = /* @__PURE__ */ factory(name$3G, dependencies$3F, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$3G, {
    "": function _() {
      return "";
    },
    number: format$3,
    null: function _null2(x) {
      return "null";
    },
    boolean: function boolean2(x) {
      return x + "";
    },
    string: function string2(x) {
      return x;
    },
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2)),
    any: function any(x) {
      return String(x);
    }
  });
});
var name$3F = "boolean";
var dependencies$3E = ["typed"];
var createBoolean = /* @__PURE__ */ factory(name$3F, dependencies$3E, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$3F, {
    "": function _() {
      return false;
    },
    boolean: function boolean2(x) {
      return x;
    },
    number: function number2(x) {
      return !!x;
    },
    null: function _null2(x) {
      return false;
    },
    BigNumber: function BigNumber2(x) {
      return !x.isZero();
    },
    string: function string2(x) {
      var lcase = x.toLowerCase();
      if (lcase === "true") {
        return true;
      } else if (lcase === "false") {
        return false;
      }
      var num = Number(x);
      if (x !== "" && !isNaN(num)) {
        return !!num;
      }
      throw new Error('Cannot convert "' + x + '" to a boolean');
    },
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var name$3E = "bignumber";
var dependencies$3D = ["typed", "BigNumber"];
var createBignumber = /* @__PURE__ */ factory(name$3E, dependencies$3D, (_ref) => {
  var {
    typed: typed2,
    BigNumber: BigNumber2
  } = _ref;
  return typed2("bignumber", {
    "": function _() {
      return new BigNumber2(0);
    },
    number: function number2(x) {
      return new BigNumber2(x + "");
    },
    string: function string2(x) {
      var wordSizeSuffixMatch = x.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
      if (wordSizeSuffixMatch) {
        var size2 = wordSizeSuffixMatch[2];
        var n = BigNumber2(wordSizeSuffixMatch[1]);
        var twoPowSize = new BigNumber2(2).pow(Number(size2));
        if (n.gt(twoPowSize.sub(1))) {
          throw new SyntaxError('String "'.concat(x, '" is out of range'));
        }
        var twoPowSizeSubOne = new BigNumber2(2).pow(Number(size2) - 1);
        if (n.gte(twoPowSizeSubOne)) {
          return n.sub(twoPowSize);
        } else {
          return n;
        }
      }
      return new BigNumber2(x);
    },
    BigNumber: function BigNumber3(x) {
      return x;
    },
    Unit: typed2.referToSelf((self2) => (x) => {
      var clone2 = x.clone();
      clone2.value = self2(x.value);
      return clone2;
    }),
    Fraction: function Fraction2(x) {
      return new BigNumber2(x.n).div(x.d).times(x.s);
    },
    null: function _null2(x) {
      return new BigNumber2(0);
    },
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var name$3D = "complex";
var dependencies$3C = ["typed", "Complex"];
var createComplex = /* @__PURE__ */ factory(name$3D, dependencies$3C, (_ref) => {
  var {
    typed: typed2,
    Complex: Complex2
  } = _ref;
  return typed2("complex", {
    "": function _() {
      return Complex2.ZERO;
    },
    number: function number2(x) {
      return new Complex2(x, 0);
    },
    "number, number": function numberNumber(re2, im2) {
      return new Complex2(re2, im2);
    },
    // TODO: this signature should be redundant
    "BigNumber, BigNumber": function BigNumberBigNumber(re2, im2) {
      return new Complex2(re2.toNumber(), im2.toNumber());
    },
    Fraction: function Fraction2(x) {
      return new Complex2(x.valueOf(), 0);
    },
    Complex: function Complex3(x) {
      return x.clone();
    },
    string: function string2(x) {
      return Complex2(x);
    },
    null: function _null2(x) {
      return Complex2(0);
    },
    Object: function Object2(x) {
      if ("re" in x && "im" in x) {
        return new Complex2(x.re, x.im);
      }
      if ("r" in x && "phi" in x || "abs" in x && "arg" in x) {
        return new Complex2(x);
      }
      throw new Error("Expected object with properties (re and im) or (r and phi) or (abs and arg)");
    },
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var name$3C = "fraction";
var dependencies$3B = ["typed", "Fraction"];
var createFraction = /* @__PURE__ */ factory(name$3C, dependencies$3B, (_ref) => {
  var {
    typed: typed2,
    Fraction: Fraction2
  } = _ref;
  return typed2("fraction", {
    number: function number2(x) {
      if (!isFinite(x) || isNaN(x)) {
        throw new Error(x + " cannot be represented as a fraction");
      }
      return new Fraction2(x);
    },
    string: function string2(x) {
      return new Fraction2(x);
    },
    "number, number": function numberNumber(numerator, denominator) {
      return new Fraction2(numerator, denominator);
    },
    null: function _null2(x) {
      return new Fraction2(0);
    },
    BigNumber: function BigNumber2(x) {
      return new Fraction2(x.toString());
    },
    Fraction: function Fraction3(x) {
      return x;
    },
    Unit: typed2.referToSelf((self2) => (x) => {
      var clone2 = x.clone();
      clone2.value = self2(x.value);
      return clone2;
    }),
    Object: function Object2(x) {
      return new Fraction2(x);
    },
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var name$3B = "matrix";
var dependencies$3A = ["typed", "Matrix", "DenseMatrix", "SparseMatrix"];
var createMatrix = /* @__PURE__ */ factory(name$3B, dependencies$3A, (_ref) => {
  var {
    typed: typed2,
    Matrix: Matrix2,
    DenseMatrix: DenseMatrix2,
    SparseMatrix: SparseMatrix2
  } = _ref;
  return typed2(name$3B, {
    "": function _() {
      return _create([]);
    },
    string: function string2(format2) {
      return _create([], format2);
    },
    "string, string": function stringString(format2, datatype) {
      return _create([], format2, datatype);
    },
    Array: function Array2(data) {
      return _create(data);
    },
    Matrix: function Matrix3(data) {
      return _create(data, data.storage());
    },
    "Array | Matrix, string": _create,
    "Array | Matrix, string, string": _create
  });
  function _create(data, format2, datatype) {
    if (format2 === "dense" || format2 === "default" || format2 === void 0) {
      return new DenseMatrix2(data, datatype);
    }
    if (format2 === "sparse") {
      return new SparseMatrix2(data, datatype);
    }
    throw new TypeError("Unknown matrix type " + JSON.stringify(format2) + ".");
  }
});
var name$3A = "matrixFromFunction";
var dependencies$3z = ["typed", "matrix", "isZero"];
var createMatrixFromFunction = /* @__PURE__ */ factory(name$3A, dependencies$3z, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    isZero: isZero2
  } = _ref;
  return typed2(name$3A, {
    "Array | Matrix, function, string, string": function ArrayMatrixFunctionStringString(size2, fn, format2, datatype) {
      return _create(size2, fn, format2, datatype);
    },
    "Array | Matrix, function, string": function ArrayMatrixFunctionString(size2, fn, format2) {
      return _create(size2, fn, format2);
    },
    "Matrix, function": function MatrixFunction(size2, fn) {
      return _create(size2, fn, "dense");
    },
    "Array, function": function ArrayFunction(size2, fn) {
      return _create(size2, fn, "dense").toArray();
    },
    "Array | Matrix, string, function": function ArrayMatrixStringFunction(size2, format2, fn) {
      return _create(size2, fn, format2);
    },
    "Array | Matrix, string, string, function": function ArrayMatrixStringStringFunction(size2, format2, datatype, fn) {
      return _create(size2, fn, format2, datatype);
    }
  });
  function _create(size2, fn, format2, datatype) {
    var m;
    if (datatype !== void 0) {
      m = matrix2(format2, datatype);
    } else {
      m = matrix2(format2);
    }
    m.resize(size2);
    m.forEach(function(_, index2) {
      var val = fn(index2);
      if (isZero2(val))
        return;
      m.set(index2, val);
    });
    return m;
  }
});
var name$3z = "matrixFromRows";
var dependencies$3y = ["typed", "matrix", "flatten", "size"];
var createMatrixFromRows = /* @__PURE__ */ factory(name$3z, dependencies$3y, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    flatten: flatten2,
    size: size2
  } = _ref;
  return typed2(name$3z, {
    "...Array": function Array2(arr) {
      return _createArray(arr);
    },
    "...Matrix": function Matrix2(arr) {
      return matrix2(_createArray(arr.map((m) => m.toArray())));
    }
    // TODO implement this properly for SparseMatrix
  });
  function _createArray(arr) {
    if (arr.length === 0)
      throw new TypeError("At least one row is needed to construct a matrix.");
    var N = checkVectorTypeAndReturnLength(arr[0]);
    var result = [];
    for (var row2 of arr) {
      var rowLength = checkVectorTypeAndReturnLength(row2);
      if (rowLength !== N) {
        throw new TypeError("The vectors had different length: " + (N | 0) + " ≠ " + (rowLength | 0));
      }
      result.push(flatten2(row2));
    }
    return result;
  }
  function checkVectorTypeAndReturnLength(vec) {
    var s = size2(vec);
    if (s.length === 1) {
      return s[0];
    } else if (s.length === 2) {
      if (s[0] === 1) {
        return s[1];
      } else if (s[1] === 1) {
        return s[0];
      } else {
        throw new TypeError("At least one of the arguments is not a vector.");
      }
    } else {
      throw new TypeError("Only one- or two-dimensional vectors are supported.");
    }
  }
});
var name$3y = "matrixFromColumns";
var dependencies$3x = ["typed", "matrix", "flatten", "size"];
var createMatrixFromColumns = /* @__PURE__ */ factory(name$3y, dependencies$3x, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    flatten: flatten2,
    size: size2
  } = _ref;
  return typed2(name$3y, {
    "...Array": function Array2(arr) {
      return _createArray(arr);
    },
    "...Matrix": function Matrix2(arr) {
      return matrix2(_createArray(arr.map((m) => m.toArray())));
    }
    // TODO implement this properly for SparseMatrix
  });
  function _createArray(arr) {
    if (arr.length === 0)
      throw new TypeError("At least one column is needed to construct a matrix.");
    var N = checkVectorTypeAndReturnLength(arr[0]);
    var result = [];
    for (var i2 = 0; i2 < N; i2++) {
      result[i2] = [];
    }
    for (var col of arr) {
      var colLength = checkVectorTypeAndReturnLength(col);
      if (colLength !== N) {
        throw new TypeError("The vectors had different length: " + (N | 0) + " ≠ " + (colLength | 0));
      }
      var f = flatten2(col);
      for (var _i = 0; _i < N; _i++) {
        result[_i].push(f[_i]);
      }
    }
    return result;
  }
  function checkVectorTypeAndReturnLength(vec) {
    var s = size2(vec);
    if (s.length === 1) {
      return s[0];
    } else if (s.length === 2) {
      if (s[0] === 1) {
        return s[1];
      } else if (s[1] === 1) {
        return s[0];
      } else {
        throw new TypeError("At least one of the arguments is not a vector.");
      }
    } else {
      throw new TypeError("Only one- or two-dimensional vectors are supported.");
    }
  }
});
var name$3x = "splitUnit";
var dependencies$3w = ["typed"];
var createSplitUnit = /* @__PURE__ */ factory(name$3x, dependencies$3w, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$3x, {
    "Unit, Array": function UnitArray(unit2, parts) {
      return unit2.splitUnit(parts);
    }
  });
});
var name$3w = "unaryMinus";
var dependencies$3v = ["typed"];
var createUnaryMinus = /* @__PURE__ */ factory(name$3w, dependencies$3v, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$3w, {
    number: unaryMinusNumber,
    "Complex | BigNumber | Fraction": (x) => x.neg(),
    Unit: typed2.referToSelf((self2) => (x) => {
      var res = x.clone();
      res.value = typed2.find(self2, res.valueType())(x.value);
      return res;
    }),
    // deep map collection, skip zeros since unaryMinus(0) = 0
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
    // TODO: add support for string
  });
});
var name$3v = "unaryPlus";
var dependencies$3u = ["typed", "config", "BigNumber"];
var createUnaryPlus = /* @__PURE__ */ factory(name$3v, dependencies$3u, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    BigNumber: BigNumber2
  } = _ref;
  return typed2(name$3v, {
    number: unaryPlusNumber,
    Complex: function Complex2(x) {
      return x;
    },
    BigNumber: function BigNumber3(x) {
      return x;
    },
    Fraction: function Fraction2(x) {
      return x;
    },
    Unit: function Unit2(x) {
      return x.clone();
    },
    // deep map collection, skip zeros since unaryPlus(0) = 0
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2)),
    "boolean | string": function booleanString(x) {
      return config3.number === "BigNumber" ? new BigNumber2(+x) : +x;
    }
  });
});
var name$3u = "abs";
var dependencies$3t = ["typed"];
var createAbs = /* @__PURE__ */ factory(name$3u, dependencies$3t, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$3u, {
    number: absNumber,
    "Complex | BigNumber | Fraction | Unit": (x) => x.abs(),
    // deep map collection, skip zeros since abs(0) = 0
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var name$3t = "apply";
var dependencies$3s = ["typed", "isInteger"];
var createApply = /* @__PURE__ */ factory(name$3t, dependencies$3s, (_ref) => {
  var {
    typed: typed2,
    isInteger: isInteger2
  } = _ref;
  return typed2(name$3t, {
    "Array | Matrix, number | BigNumber, function": function ArrayMatrixNumberBigNumberFunction(mat, dim, callback) {
      if (!isInteger2(dim)) {
        throw new TypeError("Integer number expected for dimension");
      }
      var size2 = Array.isArray(mat) ? arraySize(mat) : mat.size();
      if (dim < 0 || dim >= size2.length) {
        throw new IndexError(dim, size2.length);
      }
      if (isMatrix(mat)) {
        return mat.create(_apply(mat.valueOf(), dim, callback));
      } else {
        return _apply(mat, dim, callback);
      }
    }
  });
});
function _apply(mat, dim, callback) {
  var i2, ret, tran;
  if (dim <= 0) {
    if (!Array.isArray(mat[0])) {
      return callback(mat);
    } else {
      tran = _switch(mat);
      ret = [];
      for (i2 = 0; i2 < tran.length; i2++) {
        ret[i2] = _apply(tran[i2], dim - 1, callback);
      }
      return ret;
    }
  } else {
    ret = [];
    for (i2 = 0; i2 < mat.length; i2++) {
      ret[i2] = _apply(mat[i2], dim - 1, callback);
    }
    return ret;
  }
}
function _switch(mat) {
  var I = mat.length;
  var J = mat[0].length;
  var i2, j;
  var ret = [];
  for (j = 0; j < J; j++) {
    var tmp = [];
    for (i2 = 0; i2 < I; i2++) {
      tmp.push(mat[i2][j]);
    }
    ret.push(tmp);
  }
  return ret;
}
var name$3s = "addScalar";
var dependencies$3r = ["typed"];
var createAddScalar = /* @__PURE__ */ factory(name$3s, dependencies$3r, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$3s, {
    "number, number": addNumber,
    "Complex, Complex": function ComplexComplex(x, y) {
      return x.add(y);
    },
    "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
      return x.plus(y);
    },
    "Fraction, Fraction": function FractionFraction(x, y) {
      return x.add(y);
    },
    "Unit, Unit": typed2.referToSelf((self2) => (x, y) => {
      if (x.value === null || x.value === void 0) {
        throw new Error("Parameter x contains a unit with undefined value");
      }
      if (y.value === null || y.value === void 0) {
        throw new Error("Parameter y contains a unit with undefined value");
      }
      if (!x.equalBase(y))
        throw new Error("Units do not match");
      var res = x.clone();
      res.value = typed2.find(self2, [res.valueType(), y.valueType()])(res.value, y.value);
      res.fixPrefix = false;
      return res;
    })
  });
});
var name$3r = "subtractScalar";
var dependencies$3q = ["typed"];
var createSubtractScalar = /* @__PURE__ */ factory(name$3r, dependencies$3q, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$3r, {
    "number, number": subtractNumber,
    "Complex, Complex": function ComplexComplex(x, y) {
      return x.sub(y);
    },
    "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
      return x.minus(y);
    },
    "Fraction, Fraction": function FractionFraction(x, y) {
      return x.sub(y);
    },
    "Unit, Unit": typed2.referToSelf((self2) => (x, y) => {
      if (x.value === null || x.value === void 0) {
        throw new Error("Parameter x contains a unit with undefined value");
      }
      if (y.value === null || y.value === void 0) {
        throw new Error("Parameter y contains a unit with undefined value");
      }
      if (!x.equalBase(y))
        throw new Error("Units do not match");
      var res = x.clone();
      res.value = typed2.find(self2, [res.valueType(), y.valueType()])(res.value, y.value);
      res.fixPrefix = false;
      return res;
    })
  });
});
var name$3q = "cbrt";
var dependencies$3p = ["config", "typed", "isNegative", "unaryMinus", "matrix", "Complex", "BigNumber", "Fraction"];
var createCbrt = /* @__PURE__ */ factory(name$3q, dependencies$3p, (_ref) => {
  var {
    config: config3,
    typed: typed2,
    isNegative: isNegative2,
    unaryMinus: unaryMinus2,
    matrix: matrix2,
    Complex: Complex2,
    BigNumber: BigNumber2,
    Fraction: Fraction2
  } = _ref;
  return typed2(name$3q, {
    number: cbrtNumber,
    // note: signature 'number, boolean' is also supported,
    //       created by typed as it knows how to convert number to Complex
    Complex: _cbrtComplex,
    "Complex, boolean": _cbrtComplex,
    BigNumber: function BigNumber3(x) {
      return x.cbrt();
    },
    Unit: _cbrtUnit
  });
  function _cbrtComplex(x, allRoots) {
    var arg3 = x.arg() / 3;
    var abs2 = x.abs();
    var principal = new Complex2(cbrtNumber(abs2), 0).mul(new Complex2(0, arg3).exp());
    if (allRoots) {
      var all = [principal, new Complex2(cbrtNumber(abs2), 0).mul(new Complex2(0, arg3 + Math.PI * 2 / 3).exp()), new Complex2(cbrtNumber(abs2), 0).mul(new Complex2(0, arg3 - Math.PI * 2 / 3).exp())];
      return config3.matrix === "Array" ? all : matrix2(all);
    } else {
      return principal;
    }
  }
  function _cbrtUnit(x) {
    if (x.value && isComplex(x.value)) {
      var result = x.clone();
      result.value = 1;
      result = result.pow(1 / 3);
      result.value = _cbrtComplex(x.value);
      return result;
    } else {
      var negate = isNegative2(x.value);
      if (negate) {
        x.value = unaryMinus2(x.value);
      }
      var third;
      if (isBigNumber(x.value)) {
        third = new BigNumber2(1).div(3);
      } else if (isFraction(x.value)) {
        third = new Fraction2(1, 3);
      } else {
        third = 1 / 3;
      }
      var _result = x.pow(third);
      if (negate) {
        _result.value = unaryMinus2(_result.value);
      }
      return _result;
    }
  }
});
var name$3p = "matAlgo11xS0s";
var dependencies$3o = ["typed", "equalScalar"];
var createMatAlgo11xS0s = /* @__PURE__ */ factory(name$3p, dependencies$3o, (_ref) => {
  var {
    typed: typed2,
    equalScalar: equalScalar2
  } = _ref;
  return function matAlgo11xS0s(s, b, callback, inverse) {
    var avalues = s._values;
    var aindex = s._index;
    var aptr = s._ptr;
    var asize = s._size;
    var adt = s._datatype;
    if (!avalues) {
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    }
    var rows = asize[0];
    var columns = asize[1];
    var dt;
    var eq = equalScalar2;
    var zero = 0;
    var cf = callback;
    if (typeof adt === "string") {
      dt = adt;
      eq = typed2.find(equalScalar2, [dt, dt]);
      zero = typed2.convert(0, dt);
      b = typed2.convert(b, dt);
      cf = typed2.find(callback, [dt, dt]);
    }
    var cvalues = [];
    var cindex = [];
    var cptr = [];
    for (var j = 0; j < columns; j++) {
      cptr[j] = cindex.length;
      for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
        var i2 = aindex[k];
        var v = inverse ? cf(b, avalues[k]) : cf(avalues[k], b);
        if (!eq(v, zero)) {
          cindex.push(i2);
          cvalues.push(v);
        }
      }
    }
    cptr[columns] = cindex.length;
    return s.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [rows, columns],
      datatype: dt
    });
  };
});
var name$3o = "matAlgo12xSfs";
var dependencies$3n = ["typed", "DenseMatrix"];
var createMatAlgo12xSfs = /* @__PURE__ */ factory(name$3o, dependencies$3n, (_ref) => {
  var {
    typed: typed2,
    DenseMatrix: DenseMatrix2
  } = _ref;
  return function matAlgo12xSfs(s, b, callback, inverse) {
    var avalues = s._values;
    var aindex = s._index;
    var aptr = s._ptr;
    var asize = s._size;
    var adt = s._datatype;
    if (!avalues) {
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    }
    var rows = asize[0];
    var columns = asize[1];
    var dt;
    var cf = callback;
    if (typeof adt === "string") {
      dt = adt;
      b = typed2.convert(b, dt);
      cf = typed2.find(callback, [dt, dt]);
    }
    var cdata = [];
    var x = [];
    var w = [];
    for (var j = 0; j < columns; j++) {
      var mark = j + 1;
      for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
        var r = aindex[k];
        x[r] = avalues[k];
        w[r] = mark;
      }
      for (var i2 = 0; i2 < rows; i2++) {
        if (j === 0) {
          cdata[i2] = [];
        }
        if (w[i2] === mark) {
          cdata[i2][j] = inverse ? cf(b, x[i2]) : cf(x[i2], b);
        } else {
          cdata[i2][j] = inverse ? cf(b, 0) : cf(0, b);
        }
      }
    }
    return new DenseMatrix2({
      data: cdata,
      size: [rows, columns],
      datatype: dt
    });
  };
});
var name$3n = "matAlgo14xDs";
var dependencies$3m = ["typed"];
var createMatAlgo14xDs = /* @__PURE__ */ factory(name$3n, dependencies$3m, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return function matAlgo14xDs(a, b, callback, inverse) {
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype;
    var dt;
    var cf = callback;
    if (typeof adt === "string") {
      dt = adt;
      b = typed2.convert(b, dt);
      cf = typed2.find(callback, [dt, dt]);
    }
    var cdata = asize.length > 0 ? _iterate(cf, 0, asize, asize[0], adata, b, inverse) : [];
    return a.createDenseMatrix({
      data: cdata,
      size: clone$3(asize),
      datatype: dt
    });
  };
  function _iterate(f, level, s, n, av, bv, inverse) {
    var cv = [];
    if (level === s.length - 1) {
      for (var i2 = 0; i2 < n; i2++) {
        cv[i2] = inverse ? f(bv, av[i2]) : f(av[i2], bv);
      }
    } else {
      for (var j = 0; j < n; j++) {
        cv[j] = _iterate(f, level + 1, s, s[level + 1], av[j], bv, inverse);
      }
    }
    return cv;
  }
});
var name$3m = "ceil";
var dependencies$3l = ["typed", "config", "round", "matrix", "equalScalar", "zeros", "DenseMatrix"];
var createCeilNumber = /* @__PURE__ */ factory(name$3m, ["typed", "config", "round"], (_ref) => {
  var {
    typed: typed2,
    config: config3,
    round: round2
  } = _ref;
  return typed2(name$3m, {
    number: function number2(x) {
      if (nearlyEqual$1(x, round2(x), config3.epsilon)) {
        return round2(x);
      } else {
        return Math.ceil(x);
      }
    },
    "number, number": function numberNumber(x, n) {
      if (nearlyEqual$1(x, round2(x, n), config3.epsilon)) {
        return round2(x, n);
      } else {
        var [number2, exponent] = "".concat(x, "e").split("e");
        var result = Math.ceil(Number("".concat(number2, "e").concat(Number(exponent) + n)));
        [number2, exponent] = "".concat(result, "e").split("e");
        return Number("".concat(number2, "e").concat(Number(exponent) - n));
      }
    }
  });
});
var createCeil = /* @__PURE__ */ factory(name$3m, dependencies$3l, (_ref2) => {
  var {
    typed: typed2,
    config: config3,
    round: round2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    zeros: zeros2,
    DenseMatrix: DenseMatrix2
  } = _ref2;
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo14xDs = createMatAlgo14xDs({
    typed: typed2
  });
  var ceilNumber = createCeilNumber({
    typed: typed2,
    config: config3,
    round: round2
  });
  return typed2("ceil", {
    number: ceilNumber.signatures.number,
    "number,number": ceilNumber.signatures["number,number"],
    Complex: function Complex2(x) {
      return x.ceil();
    },
    "Complex, number": function ComplexNumber(x, n) {
      return x.ceil(n);
    },
    "Complex, BigNumber": function ComplexBigNumber(x, n) {
      return x.ceil(n.toNumber());
    },
    BigNumber: function BigNumber2(x) {
      if (nearlyEqual(x, round2(x), config3.epsilon)) {
        return round2(x);
      } else {
        return x.ceil();
      }
    },
    "BigNumber, BigNumber": function BigNumberBigNumber(x, n) {
      if (nearlyEqual(x, round2(x, n), config3.epsilon)) {
        return round2(x, n);
      } else {
        return x.toDecimalPlaces(n.toNumber(), Decimal.ROUND_CEIL);
      }
    },
    Fraction: function Fraction2(x) {
      return x.ceil();
    },
    "Fraction, number": function FractionNumber(x, n) {
      return x.ceil(n);
    },
    "Fraction, BigNumber": function FractionBigNumber(x, n) {
      return x.ceil(n.toNumber());
    },
    "Array | Matrix": typed2.referToSelf((self2) => (x) => {
      return deepMap(x, self2);
    }),
    "Array, number | BigNumber": typed2.referToSelf((self2) => (x, n) => {
      return deepMap(x, (i2) => self2(i2, n));
    }),
    "SparseMatrix, number | BigNumber": typed2.referToSelf((self2) => (x, y) => {
      return matAlgo11xS0s(x, y, self2, false);
    }),
    "DenseMatrix, number | BigNumber": typed2.referToSelf((self2) => (x, y) => {
      return matAlgo14xDs(x, y, self2, false);
    }),
    "number | Complex | Fraction | BigNumber, Array": typed2.referToSelf((self2) => (x, y) => {
      return matAlgo14xDs(matrix2(y), x, self2, true).valueOf();
    }),
    "number | Complex | Fraction | BigNumber, Matrix": typed2.referToSelf((self2) => (x, y) => {
      if (equalScalar2(x, 0))
        return zeros2(y.size(), y.storage());
      if (y.storage() === "dense") {
        return matAlgo14xDs(y, x, self2, true);
      }
      return matAlgo12xSfs(y, x, self2, true);
    })
  });
});
var name$3l = "cube";
var dependencies$3k = ["typed"];
var createCube = /* @__PURE__ */ factory(name$3l, dependencies$3k, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$3l, {
    number: cubeNumber,
    Complex: function Complex2(x) {
      return x.mul(x).mul(x);
    },
    BigNumber: function BigNumber2(x) {
      return x.times(x).times(x);
    },
    Fraction: function Fraction2(x) {
      return x.pow(3);
    },
    Unit: function Unit2(x) {
      return x.pow(3);
    }
  });
});
var name$3k = "exp";
var dependencies$3j = ["typed"];
var createExp = /* @__PURE__ */ factory(name$3k, dependencies$3j, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$3k, {
    number: expNumber,
    Complex: function Complex2(x) {
      return x.exp();
    },
    BigNumber: function BigNumber2(x) {
      return x.exp();
    }
  });
});
var name$3j = "expm1";
var dependencies$3i = ["typed", "Complex"];
var createExpm1 = /* @__PURE__ */ factory(name$3j, dependencies$3i, (_ref) => {
  var {
    typed: typed2,
    Complex: _Complex
  } = _ref;
  return typed2(name$3j, {
    number: expm1Number,
    Complex: function Complex2(x) {
      var r = Math.exp(x.re);
      return new _Complex(r * Math.cos(x.im) - 1, r * Math.sin(x.im));
    },
    BigNumber: function BigNumber2(x) {
      return x.exp().minus(1);
    }
  });
});
var name$3i = "fix";
var dependencies$3h = ["typed", "Complex", "matrix", "ceil", "floor", "equalScalar", "zeros", "DenseMatrix"];
var createFixNumber = /* @__PURE__ */ factory(name$3i, ["typed", "ceil", "floor"], (_ref) => {
  var {
    typed: typed2,
    ceil: ceil2,
    floor: floor2
  } = _ref;
  return typed2(name$3i, {
    number: function number2(x) {
      return x > 0 ? floor2(x) : ceil2(x);
    },
    "number, number": function numberNumber(x, n) {
      return x > 0 ? floor2(x, n) : ceil2(x, n);
    }
  });
});
var createFix = /* @__PURE__ */ factory(name$3i, dependencies$3h, (_ref2) => {
  var {
    typed: typed2,
    Complex: _Complex,
    matrix: matrix2,
    ceil: ceil2,
    floor: floor2,
    equalScalar: equalScalar2,
    zeros: zeros2,
    DenseMatrix: DenseMatrix2
  } = _ref2;
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo14xDs = createMatAlgo14xDs({
    typed: typed2
  });
  var fixNumber = createFixNumber({
    typed: typed2,
    ceil: ceil2,
    floor: floor2
  });
  return typed2("fix", {
    number: fixNumber.signatures.number,
    "number, number | BigNumber": fixNumber.signatures["number,number"],
    Complex: function Complex2(x) {
      return new _Complex(x.re > 0 ? Math.floor(x.re) : Math.ceil(x.re), x.im > 0 ? Math.floor(x.im) : Math.ceil(x.im));
    },
    "Complex, number": function ComplexNumber(x, n) {
      return new _Complex(x.re > 0 ? floor2(x.re, n) : ceil2(x.re, n), x.im > 0 ? floor2(x.im, n) : ceil2(x.im, n));
    },
    "Complex, BigNumber": function ComplexBigNumber(x, bn) {
      var n = bn.toNumber();
      return new _Complex(x.re > 0 ? floor2(x.re, n) : ceil2(x.re, n), x.im > 0 ? floor2(x.im, n) : ceil2(x.im, n));
    },
    BigNumber: function BigNumber2(x) {
      return x.isNegative() ? ceil2(x) : floor2(x);
    },
    "BigNumber, number | BigNumber": function BigNumberNumberBigNumber(x, n) {
      return x.isNegative() ? ceil2(x, n) : floor2(x, n);
    },
    Fraction: function Fraction2(x) {
      return x.s < 0 ? x.ceil() : x.floor();
    },
    "Fraction, number | BigNumber": function FractionNumberBigNumber(x, n) {
      return x.s < 0 ? ceil2(x, n) : floor2(x, n);
    },
    "Array | Matrix": typed2.referToSelf((self2) => (x) => {
      return deepMap(x, self2);
    }),
    "Array | Matrix, number | BigNumber": typed2.referToSelf((self2) => (x, n) => {
      return deepMap(x, (i2) => self2(i2, n));
    }),
    "number | Complex | Fraction | BigNumber, Array": typed2.referToSelf((self2) => (x, y) => {
      return matAlgo14xDs(matrix2(y), x, self2, true).valueOf();
    }),
    "number | Complex | Fraction | BigNumber, Matrix": typed2.referToSelf((self2) => (x, y) => {
      if (equalScalar2(x, 0))
        return zeros2(y.size(), y.storage());
      if (y.storage() === "dense") {
        return matAlgo14xDs(y, x, self2, true);
      }
      return matAlgo12xSfs(y, x, self2, true);
    })
  });
});
var name$3h = "floor";
var dependencies$3g = ["typed", "config", "round", "matrix", "equalScalar", "zeros", "DenseMatrix"];
var createFloorNumber = /* @__PURE__ */ factory(name$3h, ["typed", "config", "round"], (_ref) => {
  var {
    typed: typed2,
    config: config3,
    round: round2
  } = _ref;
  return typed2(name$3h, {
    number: function number2(x) {
      if (nearlyEqual$1(x, round2(x), config3.epsilon)) {
        return round2(x);
      } else {
        return Math.floor(x);
      }
    },
    "number, number": function numberNumber(x, n) {
      if (nearlyEqual$1(x, round2(x, n), config3.epsilon)) {
        return round2(x, n);
      } else {
        var [number2, exponent] = "".concat(x, "e").split("e");
        var result = Math.floor(Number("".concat(number2, "e").concat(Number(exponent) + n)));
        [number2, exponent] = "".concat(result, "e").split("e");
        return Number("".concat(number2, "e").concat(Number(exponent) - n));
      }
    }
  });
});
var createFloor = /* @__PURE__ */ factory(name$3h, dependencies$3g, (_ref2) => {
  var {
    typed: typed2,
    config: config3,
    round: round2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    zeros: zeros2,
    DenseMatrix: DenseMatrix2
  } = _ref2;
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo14xDs = createMatAlgo14xDs({
    typed: typed2
  });
  var floorNumber = createFloorNumber({
    typed: typed2,
    config: config3,
    round: round2
  });
  return typed2("floor", {
    number: floorNumber.signatures.number,
    "number,number": floorNumber.signatures["number,number"],
    Complex: function Complex2(x) {
      return x.floor();
    },
    "Complex, number": function ComplexNumber(x, n) {
      return x.floor(n);
    },
    "Complex, BigNumber": function ComplexBigNumber(x, n) {
      return x.floor(n.toNumber());
    },
    BigNumber: function BigNumber2(x) {
      if (nearlyEqual(x, round2(x), config3.epsilon)) {
        return round2(x);
      } else {
        return x.floor();
      }
    },
    "BigNumber, BigNumber": function BigNumberBigNumber(x, n) {
      if (nearlyEqual(x, round2(x, n), config3.epsilon)) {
        return round2(x, n);
      } else {
        return x.toDecimalPlaces(n.toNumber(), Decimal.ROUND_FLOOR);
      }
    },
    Fraction: function Fraction2(x) {
      return x.floor();
    },
    "Fraction, number": function FractionNumber(x, n) {
      return x.floor(n);
    },
    "Fraction, BigNumber": function FractionBigNumber(x, n) {
      return x.floor(n.toNumber());
    },
    "Array | Matrix": typed2.referToSelf((self2) => (x) => {
      return deepMap(x, self2);
    }),
    "Array, number | BigNumber": typed2.referToSelf((self2) => (x, n) => {
      return deepMap(x, (i2) => self2(i2, n));
    }),
    "SparseMatrix, number | BigNumber": typed2.referToSelf((self2) => (x, y) => {
      return matAlgo11xS0s(x, y, self2, false);
    }),
    "DenseMatrix, number | BigNumber": typed2.referToSelf((self2) => (x, y) => {
      return matAlgo14xDs(x, y, self2, false);
    }),
    "number | Complex | Fraction | BigNumber, Array": typed2.referToSelf((self2) => (x, y) => {
      return matAlgo14xDs(matrix2(y), x, self2, true).valueOf();
    }),
    "number | Complex | Fraction | BigNumber, Matrix": typed2.referToSelf((self2) => (x, y) => {
      if (equalScalar2(x, 0))
        return zeros2(y.size(), y.storage());
      if (y.storage() === "dense") {
        return matAlgo14xDs(y, x, self2, true);
      }
      return matAlgo12xSfs(y, x, self2, true);
    })
  });
});
var name$3g = "matAlgo02xDS0";
var dependencies$3f = ["typed", "equalScalar"];
var createMatAlgo02xDS0 = /* @__PURE__ */ factory(name$3g, dependencies$3f, (_ref) => {
  var {
    typed: typed2,
    equalScalar: equalScalar2
  } = _ref;
  return function matAlgo02xDS0(denseMatrix, sparseMatrix, callback, inverse) {
    var adata = denseMatrix._data;
    var asize = denseMatrix._size;
    var adt = denseMatrix._datatype || denseMatrix.getDataType();
    var bvalues = sparseMatrix._values;
    var bindex = sparseMatrix._index;
    var bptr = sparseMatrix._ptr;
    var bsize = sparseMatrix._size;
    var bdt = sparseMatrix._datatype || sparseMatrix._data === void 0 ? sparseMatrix._datatype : sparseMatrix.getDataType();
    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    }
    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
      throw new RangeError("Dimension mismatch. Matrix A (" + asize + ") must match Matrix B (" + bsize + ")");
    }
    if (!bvalues) {
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    }
    var rows = asize[0];
    var columns = asize[1];
    var dt;
    var eq = equalScalar2;
    var zero = 0;
    var cf = callback;
    if (typeof adt === "string" && adt === bdt && adt !== "mixed") {
      dt = adt;
      eq = typed2.find(equalScalar2, [dt, dt]);
      zero = typed2.convert(0, dt);
      cf = typed2.find(callback, [dt, dt]);
    }
    var cvalues = [];
    var cindex = [];
    var cptr = [];
    for (var j = 0; j < columns; j++) {
      cptr[j] = cindex.length;
      for (var k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
        var i2 = bindex[k];
        var cij = inverse ? cf(bvalues[k], adata[i2][j]) : cf(adata[i2][j], bvalues[k]);
        if (!eq(cij, zero)) {
          cindex.push(i2);
          cvalues.push(cij);
        }
      }
    }
    cptr[columns] = cindex.length;
    return sparseMatrix.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [rows, columns],
      datatype: adt === denseMatrix._datatype && bdt === sparseMatrix._datatype ? dt : void 0
    });
  };
});
var name$3f = "matAlgo03xDSf";
var dependencies$3e = ["typed"];
var createMatAlgo03xDSf = /* @__PURE__ */ factory(name$3f, dependencies$3e, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return function matAlgo03xDSf(denseMatrix, sparseMatrix, callback, inverse) {
    var adata = denseMatrix._data;
    var asize = denseMatrix._size;
    var adt = denseMatrix._datatype || denseMatrix.getDataType();
    var bvalues = sparseMatrix._values;
    var bindex = sparseMatrix._index;
    var bptr = sparseMatrix._ptr;
    var bsize = sparseMatrix._size;
    var bdt = sparseMatrix._datatype || sparseMatrix._data === void 0 ? sparseMatrix._datatype : sparseMatrix.getDataType();
    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    }
    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
      throw new RangeError("Dimension mismatch. Matrix A (" + asize + ") must match Matrix B (" + bsize + ")");
    }
    if (!bvalues) {
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    }
    var rows = asize[0];
    var columns = asize[1];
    var dt;
    var zero = 0;
    var cf = callback;
    if (typeof adt === "string" && adt === bdt && adt !== "mixed") {
      dt = adt;
      zero = typed2.convert(0, dt);
      cf = typed2.find(callback, [dt, dt]);
    }
    var cdata = [];
    for (var z = 0; z < rows; z++) {
      cdata[z] = [];
    }
    var x = [];
    var w = [];
    for (var j = 0; j < columns; j++) {
      var mark = j + 1;
      for (var k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
        var i2 = bindex[k];
        x[i2] = inverse ? cf(bvalues[k], adata[i2][j]) : cf(adata[i2][j], bvalues[k]);
        w[i2] = mark;
      }
      for (var y = 0; y < rows; y++) {
        if (w[y] === mark) {
          cdata[y][j] = x[y];
        } else {
          cdata[y][j] = inverse ? cf(zero, adata[y][j]) : cf(adata[y][j], zero);
        }
      }
    }
    return denseMatrix.createDenseMatrix({
      data: cdata,
      size: [rows, columns],
      datatype: adt === denseMatrix._datatype && bdt === sparseMatrix._datatype ? dt : void 0
    });
  };
});
var name$3e = "matAlgo05xSfSf";
var dependencies$3d = ["typed", "equalScalar"];
var createMatAlgo05xSfSf = /* @__PURE__ */ factory(name$3e, dependencies$3d, (_ref) => {
  var {
    typed: typed2,
    equalScalar: equalScalar2
  } = _ref;
  return function matAlgo05xSfSf(a, b, callback) {
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var asize = a._size;
    var adt = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var bsize = b._size;
    var bdt = b._datatype || b._data === void 0 ? b._datatype : b.getDataType();
    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    }
    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
      throw new RangeError("Dimension mismatch. Matrix A (" + asize + ") must match Matrix B (" + bsize + ")");
    }
    var rows = asize[0];
    var columns = asize[1];
    var dt;
    var eq = equalScalar2;
    var zero = 0;
    var cf = callback;
    if (typeof adt === "string" && adt === bdt && adt !== "mixed") {
      dt = adt;
      eq = typed2.find(equalScalar2, [dt, dt]);
      zero = typed2.convert(0, dt);
      cf = typed2.find(callback, [dt, dt]);
    }
    var cvalues = avalues && bvalues ? [] : void 0;
    var cindex = [];
    var cptr = [];
    var xa = cvalues ? [] : void 0;
    var xb = cvalues ? [] : void 0;
    var wa = [];
    var wb = [];
    var i2, j, k, k1;
    for (j = 0; j < columns; j++) {
      cptr[j] = cindex.length;
      var mark = j + 1;
      for (k = aptr[j], k1 = aptr[j + 1]; k < k1; k++) {
        i2 = aindex[k];
        cindex.push(i2);
        wa[i2] = mark;
        if (xa) {
          xa[i2] = avalues[k];
        }
      }
      for (k = bptr[j], k1 = bptr[j + 1]; k < k1; k++) {
        i2 = bindex[k];
        if (wa[i2] !== mark) {
          cindex.push(i2);
        }
        wb[i2] = mark;
        if (xb) {
          xb[i2] = bvalues[k];
        }
      }
      if (cvalues) {
        k = cptr[j];
        while (k < cindex.length) {
          i2 = cindex[k];
          var wai = wa[i2];
          var wbi = wb[i2];
          if (wai === mark || wbi === mark) {
            var va = wai === mark ? xa[i2] : zero;
            var vb = wbi === mark ? xb[i2] : zero;
            var vc = cf(va, vb);
            if (!eq(vc, zero)) {
              cvalues.push(vc);
              k++;
            } else {
              cindex.splice(k, 1);
            }
          }
        }
      }
    }
    cptr[columns] = cindex.length;
    return a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [rows, columns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
  };
});
var name$3d = "matAlgo13xDD";
var dependencies$3c = ["typed"];
var createMatAlgo13xDD = /* @__PURE__ */ factory(name$3d, dependencies$3c, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return function matAlgo13xDD(a, b, callback) {
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype;
    var bdata = b._data;
    var bsize = b._size;
    var bdt = b._datatype;
    var csize = [];
    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    }
    for (var s = 0; s < asize.length; s++) {
      if (asize[s] !== bsize[s]) {
        throw new RangeError("Dimension mismatch. Matrix A (" + asize + ") must match Matrix B (" + bsize + ")");
      }
      csize[s] = asize[s];
    }
    var dt;
    var cf = callback;
    if (typeof adt === "string" && adt === bdt) {
      dt = adt;
      cf = typed2.find(callback, [dt, dt]);
    }
    var cdata = csize.length > 0 ? _iterate(cf, 0, csize, csize[0], adata, bdata) : [];
    return a.createDenseMatrix({
      data: cdata,
      size: csize,
      datatype: dt
    });
  };
  function _iterate(f, level, s, n, av, bv) {
    var cv = [];
    if (level === s.length - 1) {
      for (var i2 = 0; i2 < n; i2++) {
        cv[i2] = f(av[i2], bv[i2]);
      }
    } else {
      for (var j = 0; j < n; j++) {
        cv[j] = _iterate(f, level + 1, s, s[level + 1], av[j], bv[j]);
      }
    }
    return cv;
  }
});
var name$3c = "broadcast";
var dependancies = ["concat"];
var createBroadcast = /* @__PURE__ */ factory(name$3c, dependancies, (_ref) => {
  var {
    concat: concat2
  } = _ref;
  return function(A, B) {
    var N = Math.max(A._size.length, B._size.length);
    if (A._size.length === B._size.length) {
      if (A._size.every((dim2, i2) => dim2 === B._size[i2])) {
        return [A, B];
      }
    }
    var sizeA = _padLeft(A._size, N, 0);
    var sizeB = _padLeft(B._size, N, 0);
    var sizeMax = [];
    for (var dim = 0; dim < N; dim++) {
      sizeMax[dim] = Math.max(sizeA[dim], sizeB[dim]);
    }
    checkBroadcastingRules(sizeA, sizeMax);
    checkBroadcastingRules(sizeB, sizeMax);
    var AA = A.clone();
    var BB = B.clone();
    if (AA._size.length < N) {
      AA.reshape(_padLeft(AA._size, N, 1));
    } else if (BB._size.length < N) {
      BB.reshape(_padLeft(BB._size, N, 1));
    }
    for (var _dim = 0; _dim < N; _dim++) {
      if (AA._size[_dim] < sizeMax[_dim]) {
        AA = _stretch(AA, sizeMax[_dim], _dim);
      }
      if (BB._size[_dim] < sizeMax[_dim]) {
        BB = _stretch(BB, sizeMax[_dim], _dim);
      }
    }
    return [AA, BB];
  };
  function _padLeft(shape, N, filler) {
    return [...Array(N - shape.length).fill(filler), ...shape];
  }
  function _stretch(arrayToStretch, sizeToStretch, dimToStretch) {
    return concat2(...Array(sizeToStretch).fill(arrayToStretch), dimToStretch);
  }
});
var name$3b = "matrixAlgorithmSuite";
var dependencies$3b = ["typed", "matrix", "concat"];
var createMatrixAlgorithmSuite = /* @__PURE__ */ factory(name$3b, dependencies$3b, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  } = _ref;
  var matAlgo13xDD = createMatAlgo13xDD({
    typed: typed2
  });
  var matAlgo14xDs = createMatAlgo14xDs({
    typed: typed2
  });
  var broadcast = createBroadcast({
    concat: concat2
  });
  return function matrixAlgorithmSuite(options) {
    var elop = options.elop;
    var SD = options.SD || options.DS;
    var matrixSignatures;
    if (elop) {
      matrixSignatures = {
        "DenseMatrix, DenseMatrix": (x, y) => matAlgo13xDD(...broadcast(x, y), elop),
        "Array, Array": (x, y) => matAlgo13xDD(...broadcast(matrix2(x), matrix2(y)), elop).valueOf(),
        "Array, DenseMatrix": (x, y) => matAlgo13xDD(...broadcast(matrix2(x), y), elop),
        "DenseMatrix, Array": (x, y) => matAlgo13xDD(...broadcast(x, matrix2(y)), elop)
      };
      if (options.SS) {
        matrixSignatures["SparseMatrix, SparseMatrix"] = (x, y) => options.SS(...broadcast(x, y), elop, false);
      }
      if (options.DS) {
        matrixSignatures["DenseMatrix, SparseMatrix"] = (x, y) => options.DS(...broadcast(x, y), elop, false);
        matrixSignatures["Array, SparseMatrix"] = (x, y) => options.DS(...broadcast(matrix2(x), y), elop, false);
      }
      if (SD) {
        matrixSignatures["SparseMatrix, DenseMatrix"] = (x, y) => SD(...broadcast(y, x), elop, true);
        matrixSignatures["SparseMatrix, Array"] = (x, y) => SD(...broadcast(matrix2(y), x), elop, true);
      }
    } else {
      matrixSignatures = {
        "DenseMatrix, DenseMatrix": typed2.referToSelf((self2) => (x, y) => {
          return matAlgo13xDD(...broadcast(x, y), self2);
        }),
        "Array, Array": typed2.referToSelf((self2) => (x, y) => {
          return matAlgo13xDD(...broadcast(matrix2(x), matrix2(y)), self2).valueOf();
        }),
        "Array, DenseMatrix": typed2.referToSelf((self2) => (x, y) => {
          return matAlgo13xDD(...broadcast(matrix2(x), y), self2);
        }),
        "DenseMatrix, Array": typed2.referToSelf((self2) => (x, y) => {
          return matAlgo13xDD(...broadcast(x, matrix2(y)), self2);
        })
      };
      if (options.SS) {
        matrixSignatures["SparseMatrix, SparseMatrix"] = typed2.referToSelf((self2) => (x, y) => {
          return options.SS(...broadcast(x, y), self2, false);
        });
      }
      if (options.DS) {
        matrixSignatures["DenseMatrix, SparseMatrix"] = typed2.referToSelf((self2) => (x, y) => {
          return options.DS(...broadcast(x, y), self2, false);
        });
        matrixSignatures["Array, SparseMatrix"] = typed2.referToSelf((self2) => (x, y) => {
          return options.DS(...broadcast(matrix2(x), y), self2, false);
        });
      }
      if (SD) {
        matrixSignatures["SparseMatrix, DenseMatrix"] = typed2.referToSelf((self2) => (x, y) => {
          return SD(...broadcast(y, x), self2, true);
        });
        matrixSignatures["SparseMatrix, Array"] = typed2.referToSelf((self2) => (x, y) => {
          return SD(...broadcast(matrix2(y), x), self2, true);
        });
      }
    }
    var scalar = options.scalar || "any";
    var Ds = options.Ds || options.Ss;
    if (Ds) {
      if (elop) {
        matrixSignatures["DenseMatrix," + scalar] = (x, y) => matAlgo14xDs(x, y, elop, false);
        matrixSignatures[scalar + ", DenseMatrix"] = (x, y) => matAlgo14xDs(y, x, elop, true);
        matrixSignatures["Array," + scalar] = (x, y) => matAlgo14xDs(matrix2(x), y, elop, false).valueOf();
        matrixSignatures[scalar + ", Array"] = (x, y) => matAlgo14xDs(matrix2(y), x, elop, true).valueOf();
      } else {
        matrixSignatures["DenseMatrix," + scalar] = typed2.referToSelf((self2) => (x, y) => {
          return matAlgo14xDs(x, y, self2, false);
        });
        matrixSignatures[scalar + ", DenseMatrix"] = typed2.referToSelf((self2) => (x, y) => {
          return matAlgo14xDs(y, x, self2, true);
        });
        matrixSignatures["Array," + scalar] = typed2.referToSelf((self2) => (x, y) => {
          return matAlgo14xDs(matrix2(x), y, self2, false).valueOf();
        });
        matrixSignatures[scalar + ", Array"] = typed2.referToSelf((self2) => (x, y) => {
          return matAlgo14xDs(matrix2(y), x, self2, true).valueOf();
        });
      }
    }
    var sS = options.sS !== void 0 ? options.sS : options.Ss;
    if (elop) {
      if (options.Ss) {
        matrixSignatures["SparseMatrix," + scalar] = (x, y) => options.Ss(x, y, elop, false);
      }
      if (sS) {
        matrixSignatures[scalar + ", SparseMatrix"] = (x, y) => sS(y, x, elop, true);
      }
    } else {
      if (options.Ss) {
        matrixSignatures["SparseMatrix," + scalar] = typed2.referToSelf((self2) => (x, y) => {
          return options.Ss(x, y, self2, false);
        });
      }
      if (sS) {
        matrixSignatures[scalar + ", SparseMatrix"] = typed2.referToSelf((self2) => (x, y) => {
          return sS(y, x, self2, true);
        });
      }
    }
    if (elop && elop.signatures) {
      extend(matrixSignatures, elop.signatures);
    }
    return matrixSignatures;
  };
});
var name$3a = "mod";
var dependencies$3a = ["typed", "config", "round", "matrix", "equalScalar", "zeros", "DenseMatrix", "concat"];
var createMod = /* @__PURE__ */ factory(name$3a, dependencies$3a, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    round: round2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    zeros: zeros2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var floor2 = createFloor({
    typed: typed2,
    config: config3,
    round: round2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    zeros: zeros2,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo02xDS0 = createMatAlgo02xDS0({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo03xDSf = createMatAlgo03xDSf({
    typed: typed2
  });
  var matAlgo05xSfSf = createMatAlgo05xSfSf({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  return typed2(name$3a, {
    "number, number": _modNumber,
    "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
      return y.isZero() ? x : x.sub(y.mul(floor2(x.div(y))));
    },
    "Fraction, Fraction": function FractionFraction(x, y) {
      return y.equals(0) ? x : x.sub(y.mul(floor2(x.div(y))));
    }
  }, matrixAlgorithmSuite({
    SS: matAlgo05xSfSf,
    DS: matAlgo03xDSf,
    SD: matAlgo02xDS0,
    Ss: matAlgo11xS0s,
    sS: matAlgo12xSfs
  }));
  function _modNumber(x, y) {
    return y === 0 ? x : x - y * floor2(x / y);
  }
});
var name$39 = "matAlgo01xDSid";
var dependencies$39 = ["typed"];
var createMatAlgo01xDSid = /* @__PURE__ */ factory(name$39, dependencies$39, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return function algorithm1(denseMatrix, sparseMatrix, callback, inverse) {
    var adata = denseMatrix._data;
    var asize = denseMatrix._size;
    var adt = denseMatrix._datatype || denseMatrix.getDataType();
    var bvalues = sparseMatrix._values;
    var bindex = sparseMatrix._index;
    var bptr = sparseMatrix._ptr;
    var bsize = sparseMatrix._size;
    var bdt = sparseMatrix._datatype || sparseMatrix._data === void 0 ? sparseMatrix._datatype : sparseMatrix.getDataType();
    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    }
    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
      throw new RangeError("Dimension mismatch. Matrix A (" + asize + ") must match Matrix B (" + bsize + ")");
    }
    if (!bvalues) {
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    }
    var rows = asize[0];
    var columns = asize[1];
    var dt = typeof adt === "string" && adt !== "mixed" && adt === bdt ? adt : void 0;
    var cf = dt ? typed2.find(callback, [dt, dt]) : callback;
    var i2, j;
    var cdata = [];
    for (i2 = 0; i2 < rows; i2++) {
      cdata[i2] = [];
    }
    var x = [];
    var w = [];
    for (j = 0; j < columns; j++) {
      var mark = j + 1;
      for (var k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
        i2 = bindex[k];
        x[i2] = inverse ? cf(bvalues[k], adata[i2][j]) : cf(adata[i2][j], bvalues[k]);
        w[i2] = mark;
      }
      for (i2 = 0; i2 < rows; i2++) {
        if (w[i2] === mark) {
          cdata[i2][j] = x[i2];
        } else {
          cdata[i2][j] = adata[i2][j];
        }
      }
    }
    return denseMatrix.createDenseMatrix({
      data: cdata,
      size: [rows, columns],
      datatype: adt === denseMatrix._datatype && bdt === sparseMatrix._datatype ? dt : void 0
    });
  };
});
var name$38 = "matAlgo04xSidSid";
var dependencies$38 = ["typed", "equalScalar"];
var createMatAlgo04xSidSid = /* @__PURE__ */ factory(name$38, dependencies$38, (_ref) => {
  var {
    typed: typed2,
    equalScalar: equalScalar2
  } = _ref;
  return function matAlgo04xSidSid(a, b, callback) {
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var asize = a._size;
    var adt = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var bsize = b._size;
    var bdt = b._datatype || b._data === void 0 ? b._datatype : b.getDataType();
    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    }
    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
      throw new RangeError("Dimension mismatch. Matrix A (" + asize + ") must match Matrix B (" + bsize + ")");
    }
    var rows = asize[0];
    var columns = asize[1];
    var dt;
    var eq = equalScalar2;
    var zero = 0;
    var cf = callback;
    if (typeof adt === "string" && adt === bdt && adt !== "mixed") {
      dt = adt;
      eq = typed2.find(equalScalar2, [dt, dt]);
      zero = typed2.convert(0, dt);
      cf = typed2.find(callback, [dt, dt]);
    }
    var cvalues = avalues && bvalues ? [] : void 0;
    var cindex = [];
    var cptr = [];
    var xa = avalues && bvalues ? [] : void 0;
    var xb = avalues && bvalues ? [] : void 0;
    var wa = [];
    var wb = [];
    var i2, j, k, k0, k1;
    for (j = 0; j < columns; j++) {
      cptr[j] = cindex.length;
      var mark = j + 1;
      for (k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
        i2 = aindex[k];
        cindex.push(i2);
        wa[i2] = mark;
        if (xa) {
          xa[i2] = avalues[k];
        }
      }
      for (k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
        i2 = bindex[k];
        if (wa[i2] === mark) {
          if (xa) {
            var v = cf(xa[i2], bvalues[k]);
            if (!eq(v, zero)) {
              xa[i2] = v;
            } else {
              wa[i2] = null;
            }
          }
        } else {
          cindex.push(i2);
          wb[i2] = mark;
          if (xb) {
            xb[i2] = bvalues[k];
          }
        }
      }
      if (xa && xb) {
        k = cptr[j];
        while (k < cindex.length) {
          i2 = cindex[k];
          if (wa[i2] === mark) {
            cvalues[k] = xa[i2];
            k++;
          } else if (wb[i2] === mark) {
            cvalues[k] = xb[i2];
            k++;
          } else {
            cindex.splice(k, 1);
          }
        }
      }
    }
    cptr[columns] = cindex.length;
    return a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [rows, columns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
  };
});
var name$37 = "matAlgo10xSids";
var dependencies$37 = ["typed", "DenseMatrix"];
var createMatAlgo10xSids = /* @__PURE__ */ factory(name$37, dependencies$37, (_ref) => {
  var {
    typed: typed2,
    DenseMatrix: DenseMatrix2
  } = _ref;
  return function matAlgo10xSids(s, b, callback, inverse) {
    var avalues = s._values;
    var aindex = s._index;
    var aptr = s._ptr;
    var asize = s._size;
    var adt = s._datatype;
    if (!avalues) {
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    }
    var rows = asize[0];
    var columns = asize[1];
    var dt;
    var cf = callback;
    if (typeof adt === "string") {
      dt = adt;
      b = typed2.convert(b, dt);
      cf = typed2.find(callback, [dt, dt]);
    }
    var cdata = [];
    var x = [];
    var w = [];
    for (var j = 0; j < columns; j++) {
      var mark = j + 1;
      for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
        var r = aindex[k];
        x[r] = avalues[k];
        w[r] = mark;
      }
      for (var i2 = 0; i2 < rows; i2++) {
        if (j === 0) {
          cdata[i2] = [];
        }
        if (w[i2] === mark) {
          cdata[i2][j] = inverse ? cf(b, x[i2]) : cf(x[i2], b);
        } else {
          cdata[i2][j] = b;
        }
      }
    }
    return new DenseMatrix2({
      data: cdata,
      size: [rows, columns],
      datatype: dt
    });
  };
});
function ArgumentsError(fn, count2, min2, max2) {
  if (!(this instanceof ArgumentsError)) {
    throw new SyntaxError("Constructor must be called with the new operator");
  }
  this.fn = fn;
  this.count = count2;
  this.min = min2;
  this.max = max2;
  this.message = "Wrong number of arguments in function " + fn + " (" + count2 + " provided, " + min2 + (max2 !== void 0 && max2 !== null ? "-" + max2 : "") + " expected)";
  this.stack = new Error().stack;
}
ArgumentsError.prototype = new Error();
ArgumentsError.prototype.constructor = Error;
ArgumentsError.prototype.name = "ArgumentsError";
ArgumentsError.prototype.isArgumentsError = true;
var name$36 = "gcd";
var dependencies$36 = ["typed", "config", "round", "matrix", "equalScalar", "zeros", "BigNumber", "DenseMatrix", "concat"];
var gcdTypes = "number | BigNumber | Fraction | Matrix | Array";
var gcdManyTypesSignature = "".concat(gcdTypes, ", ").concat(gcdTypes, ", ...").concat(gcdTypes);
function is1d(array) {
  return !array.some((element) => Array.isArray(element));
}
var createGcd = /* @__PURE__ */ factory(name$36, dependencies$36, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    config: config3,
    round: round2,
    equalScalar: equalScalar2,
    zeros: zeros2,
    BigNumber: BigNumber2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var mod2 = createMod({
    typed: typed2,
    config: config3,
    round: round2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    zeros: zeros2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  });
  var matAlgo01xDSid = createMatAlgo01xDSid({
    typed: typed2
  });
  var matAlgo04xSidSid = createMatAlgo04xSidSid({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo10xSids = createMatAlgo10xSids({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  return typed2(name$36, {
    "number, number": _gcdNumber,
    "BigNumber, BigNumber": _gcdBigNumber,
    "Fraction, Fraction": (x, y) => x.gcd(y)
  }, matrixAlgorithmSuite({
    SS: matAlgo04xSidSid,
    DS: matAlgo01xDSid,
    Ss: matAlgo10xSids
  }), {
    [gcdManyTypesSignature]: typed2.referToSelf((self2) => (a, b, args) => {
      var res = self2(a, b);
      for (var i2 = 0; i2 < args.length; i2++) {
        res = self2(res, args[i2]);
      }
      return res;
    }),
    Array: typed2.referToSelf((self2) => (array) => {
      if (array.length === 1 && Array.isArray(array[0]) && is1d(array[0])) {
        return self2(...array[0]);
      }
      if (is1d(array)) {
        return self2(...array);
      }
      throw new ArgumentsError("gcd() supports only 1d matrices!");
    }),
    Matrix: typed2.referToSelf((self2) => (matrix3) => {
      return self2(matrix3.toArray());
    })
  });
  function _gcdNumber(a, b) {
    if (!isInteger$1(a) || !isInteger$1(b)) {
      throw new Error("Parameters in function gcd must be integer numbers");
    }
    var r;
    while (b !== 0) {
      r = mod2(a, b);
      a = b;
      b = r;
    }
    return a < 0 ? -a : a;
  }
  function _gcdBigNumber(a, b) {
    if (!a.isInt() || !b.isInt()) {
      throw new Error("Parameters in function gcd must be integer numbers");
    }
    var zero = new BigNumber2(0);
    while (!b.isZero()) {
      var r = mod2(a, b);
      a = b;
      b = r;
    }
    return a.lt(zero) ? a.neg() : a;
  }
});
var name$35 = "matAlgo06xS0S0";
var dependencies$35 = ["typed", "equalScalar"];
var createMatAlgo06xS0S0 = /* @__PURE__ */ factory(name$35, dependencies$35, (_ref) => {
  var {
    typed: typed2,
    equalScalar: equalScalar2
  } = _ref;
  return function matAlgo06xS0S0(a, b, callback) {
    var avalues = a._values;
    var asize = a._size;
    var adt = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    var bvalues = b._values;
    var bsize = b._size;
    var bdt = b._datatype || b._data === void 0 ? b._datatype : b.getDataType();
    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    }
    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
      throw new RangeError("Dimension mismatch. Matrix A (" + asize + ") must match Matrix B (" + bsize + ")");
    }
    var rows = asize[0];
    var columns = asize[1];
    var dt;
    var eq = equalScalar2;
    var zero = 0;
    var cf = callback;
    if (typeof adt === "string" && adt === bdt && adt !== "mixed") {
      dt = adt;
      eq = typed2.find(equalScalar2, [dt, dt]);
      zero = typed2.convert(0, dt);
      cf = typed2.find(callback, [dt, dt]);
    }
    var cvalues = avalues && bvalues ? [] : void 0;
    var cindex = [];
    var cptr = [];
    var x = cvalues ? [] : void 0;
    var w = [];
    var u = [];
    for (var j = 0; j < columns; j++) {
      cptr[j] = cindex.length;
      var mark = j + 1;
      scatter(a, j, w, x, u, mark, cindex, cf);
      scatter(b, j, w, x, u, mark, cindex, cf);
      if (x) {
        var k = cptr[j];
        while (k < cindex.length) {
          var i2 = cindex[k];
          if (u[i2] === mark) {
            var v = x[i2];
            if (!eq(v, zero)) {
              cvalues.push(v);
              k++;
            } else {
              cindex.splice(k, 1);
            }
          } else {
            cindex.splice(k, 1);
          }
        }
      } else {
        var p = cptr[j];
        while (p < cindex.length) {
          var r = cindex[p];
          if (u[r] !== mark) {
            cindex.splice(p, 1);
          } else {
            p++;
          }
        }
      }
    }
    cptr[columns] = cindex.length;
    return a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [rows, columns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
  };
});
var name$34 = "lcm";
var dependencies$34 = ["typed", "matrix", "equalScalar", "concat"];
var createLcm = /* @__PURE__ */ factory(name$34, dependencies$34, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    concat: concat2
  } = _ref;
  var matAlgo02xDS0 = createMatAlgo02xDS0({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo06xS0S0 = createMatAlgo06xS0S0({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  var lcmTypes = "number | BigNumber | Fraction | Matrix | Array";
  var lcmManySignature = {};
  lcmManySignature["".concat(lcmTypes, ", ").concat(lcmTypes, ", ...").concat(lcmTypes)] = typed2.referToSelf((self2) => (a, b, args) => {
    var res = self2(a, b);
    for (var i2 = 0; i2 < args.length; i2++) {
      res = self2(res, args[i2]);
    }
    return res;
  });
  return typed2(name$34, {
    "number, number": lcmNumber,
    "BigNumber, BigNumber": _lcmBigNumber,
    "Fraction, Fraction": (x, y) => x.lcm(y)
  }, matrixAlgorithmSuite({
    SS: matAlgo06xS0S0,
    DS: matAlgo02xDS0,
    Ss: matAlgo11xS0s
  }), lcmManySignature);
  function _lcmBigNumber(a, b) {
    if (!a.isInt() || !b.isInt()) {
      throw new Error("Parameters in function lcm must be integer numbers");
    }
    if (a.isZero()) {
      return a;
    }
    if (b.isZero()) {
      return b;
    }
    var prod2 = a.times(b);
    while (!b.isZero()) {
      var t = b;
      b = a.mod(t);
      a = t;
    }
    return prod2.div(a).abs();
  }
});
var name$33 = "log10";
var dependencies$33 = ["typed", "config", "Complex"];
var createLog10 = /* @__PURE__ */ factory(name$33, dependencies$33, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    Complex: _Complex
  } = _ref;
  return typed2(name$33, {
    number: function number2(x) {
      if (x >= 0 || config3.predictable) {
        return log10Number(x);
      } else {
        return new _Complex(x, 0).log().div(Math.LN10);
      }
    },
    Complex: function Complex2(x) {
      return new _Complex(x).log().div(Math.LN10);
    },
    BigNumber: function BigNumber2(x) {
      if (!x.isNegative() || config3.predictable) {
        return x.log();
      } else {
        return new _Complex(x.toNumber(), 0).log().div(Math.LN10);
      }
    },
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var name$32 = "log2";
var dependencies$32 = ["typed", "config", "Complex"];
var createLog2 = /* @__PURE__ */ factory(name$32, dependencies$32, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    Complex: Complex2
  } = _ref;
  return typed2(name$32, {
    number: function number2(x) {
      if (x >= 0 || config3.predictable) {
        return log2Number(x);
      } else {
        return _log2Complex(new Complex2(x, 0));
      }
    },
    Complex: _log2Complex,
    BigNumber: function BigNumber2(x) {
      if (!x.isNegative() || config3.predictable) {
        return x.log(2);
      } else {
        return _log2Complex(new Complex2(x.toNumber(), 0));
      }
    },
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
  function _log2Complex(x) {
    var newX = Math.sqrt(x.re * x.re + x.im * x.im);
    return new Complex2(Math.log2 ? Math.log2(newX) : Math.log(newX) / Math.LN2, Math.atan2(x.im, x.re) / Math.LN2);
  }
});
var name$31 = "multiplyScalar";
var dependencies$31 = ["typed"];
var createMultiplyScalar = /* @__PURE__ */ factory(name$31, dependencies$31, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2("multiplyScalar", {
    "number, number": multiplyNumber,
    "Complex, Complex": function ComplexComplex(x, y) {
      return x.mul(y);
    },
    "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
      return x.times(y);
    },
    "Fraction, Fraction": function FractionFraction(x, y) {
      return x.mul(y);
    },
    "number | Fraction | BigNumber | Complex, Unit": (x, y) => y.multiply(x),
    "Unit, number | Fraction | BigNumber | Complex | Unit": (x, y) => x.multiply(y)
  });
});
var name$30 = "multiply";
var dependencies$30 = ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"];
var createMultiply = /* @__PURE__ */ factory(name$30, dependencies$30, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    addScalar: addScalar2,
    multiplyScalar: multiplyScalar2,
    equalScalar: equalScalar2,
    dot: dot2
  } = _ref;
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo14xDs = createMatAlgo14xDs({
    typed: typed2
  });
  function _validateMatrixDimensions(size1, size2) {
    switch (size1.length) {
      case 1:
        switch (size2.length) {
          case 1:
            if (size1[0] !== size2[0]) {
              throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
            }
            break;
          case 2:
            if (size1[0] !== size2[0]) {
              throw new RangeError("Dimension mismatch in multiplication. Vector length (" + size1[0] + ") must match Matrix rows (" + size2[0] + ")");
            }
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + size2.length + " dimensions)");
        }
        break;
      case 2:
        switch (size2.length) {
          case 1:
            if (size1[1] !== size2[0]) {
              throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + size1[1] + ") must match Vector length (" + size2[0] + ")");
            }
            break;
          case 2:
            if (size1[1] !== size2[0]) {
              throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + size1[1] + ") must match Matrix B rows (" + size2[0] + ")");
            }
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + size2.length + " dimensions)");
        }
        break;
      default:
        throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + size1.length + " dimensions)");
    }
  }
  function _multiplyVectorVector(a, b, n) {
    if (n === 0) {
      throw new Error("Cannot multiply two empty vectors");
    }
    return dot2(a, b);
  }
  function _multiplyVectorMatrix(a, b) {
    if (b.storage() !== "dense") {
      throw new Error("Support for SparseMatrix not implemented");
    }
    return _multiplyVectorDenseMatrix(a, b);
  }
  function _multiplyVectorDenseMatrix(a, b) {
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype || a.getDataType();
    var bdata = b._data;
    var bsize = b._size;
    var bdt = b._datatype || b.getDataType();
    var alength = asize[0];
    var bcolumns = bsize[1];
    var dt;
    var af = addScalar2;
    var mf = multiplyScalar2;
    if (adt && bdt && adt === bdt && typeof adt === "string" && adt !== "mixed") {
      dt = adt;
      af = typed2.find(addScalar2, [dt, dt]);
      mf = typed2.find(multiplyScalar2, [dt, dt]);
    }
    var c = [];
    for (var j = 0; j < bcolumns; j++) {
      var sum2 = mf(adata[0], bdata[0][j]);
      for (var i2 = 1; i2 < alength; i2++) {
        sum2 = af(sum2, mf(adata[i2], bdata[i2][j]));
      }
      c[j] = sum2;
    }
    return a.createDenseMatrix({
      data: c,
      size: [bcolumns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
  }
  var _multiplyMatrixVector = typed2("_multiplyMatrixVector", {
    "DenseMatrix, any": _multiplyDenseMatrixVector,
    "SparseMatrix, any": _multiplySparseMatrixVector
  });
  var _multiplyMatrixMatrix = typed2("_multiplyMatrixMatrix", {
    "DenseMatrix, DenseMatrix": _multiplyDenseMatrixDenseMatrix,
    "DenseMatrix, SparseMatrix": _multiplyDenseMatrixSparseMatrix,
    "SparseMatrix, DenseMatrix": _multiplySparseMatrixDenseMatrix,
    "SparseMatrix, SparseMatrix": _multiplySparseMatrixSparseMatrix
  });
  function _multiplyDenseMatrixVector(a, b) {
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype || a.getDataType();
    var bdata = b._data;
    var bdt = b._datatype || b.getDataType();
    var arows = asize[0];
    var acolumns = asize[1];
    var dt;
    var af = addScalar2;
    var mf = multiplyScalar2;
    if (adt && bdt && adt === bdt && typeof adt === "string" && adt !== "mixed") {
      dt = adt;
      af = typed2.find(addScalar2, [dt, dt]);
      mf = typed2.find(multiplyScalar2, [dt, dt]);
    }
    var c = [];
    for (var i2 = 0; i2 < arows; i2++) {
      var row2 = adata[i2];
      var sum2 = mf(row2[0], bdata[0]);
      for (var j = 1; j < acolumns; j++) {
        sum2 = af(sum2, mf(row2[j], bdata[j]));
      }
      c[i2] = sum2;
    }
    return a.createDenseMatrix({
      data: c,
      size: [arows],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
  }
  function _multiplyDenseMatrixDenseMatrix(a, b) {
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype || a.getDataType();
    var bdata = b._data;
    var bsize = b._size;
    var bdt = b._datatype || b.getDataType();
    var arows = asize[0];
    var acolumns = asize[1];
    var bcolumns = bsize[1];
    var dt;
    var af = addScalar2;
    var mf = multiplyScalar2;
    if (adt && bdt && adt === bdt && typeof adt === "string" && adt !== "mixed" && adt !== "mixed") {
      dt = adt;
      af = typed2.find(addScalar2, [dt, dt]);
      mf = typed2.find(multiplyScalar2, [dt, dt]);
    }
    var c = [];
    for (var i2 = 0; i2 < arows; i2++) {
      var row2 = adata[i2];
      c[i2] = [];
      for (var j = 0; j < bcolumns; j++) {
        var sum2 = mf(row2[0], bdata[0][j]);
        for (var x = 1; x < acolumns; x++) {
          sum2 = af(sum2, mf(row2[x], bdata[x][j]));
        }
        c[i2][j] = sum2;
      }
    }
    return a.createDenseMatrix({
      data: c,
      size: [arows, bcolumns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
  }
  function _multiplyDenseMatrixSparseMatrix(a, b) {
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype || a.getDataType();
    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var bsize = b._size;
    var bdt = b._datatype || b._data === void 0 ? b._datatype : b.getDataType();
    if (!bvalues) {
      throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
    }
    var arows = asize[0];
    var bcolumns = bsize[1];
    var dt;
    var af = addScalar2;
    var mf = multiplyScalar2;
    var eq = equalScalar2;
    var zero = 0;
    if (adt && bdt && adt === bdt && typeof adt === "string" && adt !== "mixed") {
      dt = adt;
      af = typed2.find(addScalar2, [dt, dt]);
      mf = typed2.find(multiplyScalar2, [dt, dt]);
      eq = typed2.find(equalScalar2, [dt, dt]);
      zero = typed2.convert(0, dt);
    }
    var cvalues = [];
    var cindex = [];
    var cptr = [];
    var c = b.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [arows, bcolumns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
    for (var jb = 0; jb < bcolumns; jb++) {
      cptr[jb] = cindex.length;
      var kb0 = bptr[jb];
      var kb1 = bptr[jb + 1];
      if (kb1 > kb0) {
        var last = 0;
        for (var i2 = 0; i2 < arows; i2++) {
          var mark = i2 + 1;
          var cij = void 0;
          for (var kb = kb0; kb < kb1; kb++) {
            var ib = bindex[kb];
            if (last !== mark) {
              cij = mf(adata[i2][ib], bvalues[kb]);
              last = mark;
            } else {
              cij = af(cij, mf(adata[i2][ib], bvalues[kb]));
            }
          }
          if (last === mark && !eq(cij, zero)) {
            cindex.push(i2);
            cvalues.push(cij);
          }
        }
      }
    }
    cptr[bcolumns] = cindex.length;
    return c;
  }
  function _multiplySparseMatrixVector(a, b) {
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var adt = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    if (!avalues) {
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    }
    var bdata = b._data;
    var bdt = b._datatype || b.getDataType();
    var arows = a._size[0];
    var brows = b._size[0];
    var cvalues = [];
    var cindex = [];
    var cptr = [];
    var dt;
    var af = addScalar2;
    var mf = multiplyScalar2;
    var eq = equalScalar2;
    var zero = 0;
    if (adt && bdt && adt === bdt && typeof adt === "string" && adt !== "mixed") {
      dt = adt;
      af = typed2.find(addScalar2, [dt, dt]);
      mf = typed2.find(multiplyScalar2, [dt, dt]);
      eq = typed2.find(equalScalar2, [dt, dt]);
      zero = typed2.convert(0, dt);
    }
    var x = [];
    var w = [];
    cptr[0] = 0;
    for (var ib = 0; ib < brows; ib++) {
      var vbi = bdata[ib];
      if (!eq(vbi, zero)) {
        for (var ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
          var ia = aindex[ka];
          if (!w[ia]) {
            w[ia] = true;
            cindex.push(ia);
            x[ia] = mf(vbi, avalues[ka]);
          } else {
            x[ia] = af(x[ia], mf(vbi, avalues[ka]));
          }
        }
      }
    }
    for (var p1 = cindex.length, p = 0; p < p1; p++) {
      var ic = cindex[p];
      cvalues[p] = x[ic];
    }
    cptr[1] = cindex.length;
    return a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [arows, 1],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
  }
  function _multiplySparseMatrixDenseMatrix(a, b) {
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var adt = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    if (!avalues) {
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    }
    var bdata = b._data;
    var bdt = b._datatype || b.getDataType();
    var arows = a._size[0];
    var brows = b._size[0];
    var bcolumns = b._size[1];
    var dt;
    var af = addScalar2;
    var mf = multiplyScalar2;
    var eq = equalScalar2;
    var zero = 0;
    if (adt && bdt && adt === bdt && typeof adt === "string" && adt !== "mixed") {
      dt = adt;
      af = typed2.find(addScalar2, [dt, dt]);
      mf = typed2.find(multiplyScalar2, [dt, dt]);
      eq = typed2.find(equalScalar2, [dt, dt]);
      zero = typed2.convert(0, dt);
    }
    var cvalues = [];
    var cindex = [];
    var cptr = [];
    var c = a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [arows, bcolumns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
    var x = [];
    var w = [];
    for (var jb = 0; jb < bcolumns; jb++) {
      cptr[jb] = cindex.length;
      var mark = jb + 1;
      for (var ib = 0; ib < brows; ib++) {
        var vbij = bdata[ib][jb];
        if (!eq(vbij, zero)) {
          for (var ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
            var ia = aindex[ka];
            if (w[ia] !== mark) {
              w[ia] = mark;
              cindex.push(ia);
              x[ia] = mf(vbij, avalues[ka]);
            } else {
              x[ia] = af(x[ia], mf(vbij, avalues[ka]));
            }
          }
        }
      }
      for (var p0 = cptr[jb], p1 = cindex.length, p = p0; p < p1; p++) {
        var ic = cindex[p];
        cvalues[p] = x[ic];
      }
    }
    cptr[bcolumns] = cindex.length;
    return c;
  }
  function _multiplySparseMatrixSparseMatrix(a, b) {
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var adt = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var bdt = b._datatype || b._data === void 0 ? b._datatype : b.getDataType();
    var arows = a._size[0];
    var bcolumns = b._size[1];
    var values = avalues && bvalues;
    var dt;
    var af = addScalar2;
    var mf = multiplyScalar2;
    if (adt && bdt && adt === bdt && typeof adt === "string" && adt !== "mixed") {
      dt = adt;
      af = typed2.find(addScalar2, [dt, dt]);
      mf = typed2.find(multiplyScalar2, [dt, dt]);
    }
    var cvalues = values ? [] : void 0;
    var cindex = [];
    var cptr = [];
    var c = a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [arows, bcolumns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
    var x = values ? [] : void 0;
    var w = [];
    var ka, ka0, ka1, kb, kb0, kb1, ia, ib;
    for (var jb = 0; jb < bcolumns; jb++) {
      cptr[jb] = cindex.length;
      var mark = jb + 1;
      for (kb0 = bptr[jb], kb1 = bptr[jb + 1], kb = kb0; kb < kb1; kb++) {
        ib = bindex[kb];
        if (values) {
          for (ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
            ia = aindex[ka];
            if (w[ia] !== mark) {
              w[ia] = mark;
              cindex.push(ia);
              x[ia] = mf(bvalues[kb], avalues[ka]);
            } else {
              x[ia] = af(x[ia], mf(bvalues[kb], avalues[ka]));
            }
          }
        } else {
          for (ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
            ia = aindex[ka];
            if (w[ia] !== mark) {
              w[ia] = mark;
              cindex.push(ia);
            }
          }
        }
      }
      if (values) {
        for (var p0 = cptr[jb], p1 = cindex.length, p = p0; p < p1; p++) {
          var ic = cindex[p];
          cvalues[p] = x[ic];
        }
      }
    }
    cptr[bcolumns] = cindex.length;
    return c;
  }
  return typed2(name$30, multiplyScalar2, {
    // we extend the signatures of multiplyScalar with signatures dealing with matrices
    "Array, Array": typed2.referTo("Matrix, Matrix", (selfMM) => (x, y) => {
      _validateMatrixDimensions(arraySize(x), arraySize(y));
      var m = selfMM(matrix2(x), matrix2(y));
      return isMatrix(m) ? m.valueOf() : m;
    }),
    "Matrix, Matrix": function MatrixMatrix(x, y) {
      var xsize = x.size();
      var ysize = y.size();
      _validateMatrixDimensions(xsize, ysize);
      if (xsize.length === 1) {
        if (ysize.length === 1) {
          return _multiplyVectorVector(x, y, xsize[0]);
        }
        return _multiplyVectorMatrix(x, y);
      }
      if (ysize.length === 1) {
        return _multiplyMatrixVector(x, y);
      }
      return _multiplyMatrixMatrix(x, y);
    },
    "Matrix, Array": typed2.referTo("Matrix,Matrix", (selfMM) => (x, y) => selfMM(x, matrix2(y))),
    "Array, Matrix": typed2.referToSelf((self2) => (x, y) => {
      return self2(matrix2(x, y.storage()), y);
    }),
    "SparseMatrix, any": function SparseMatrixAny(x, y) {
      return matAlgo11xS0s(x, y, multiplyScalar2, false);
    },
    "DenseMatrix, any": function DenseMatrixAny(x, y) {
      return matAlgo14xDs(x, y, multiplyScalar2, false);
    },
    "any, SparseMatrix": function anySparseMatrix(x, y) {
      return matAlgo11xS0s(y, x, multiplyScalar2, true);
    },
    "any, DenseMatrix": function anyDenseMatrix(x, y) {
      return matAlgo14xDs(y, x, multiplyScalar2, true);
    },
    "Array, any": function ArrayAny(x, y) {
      return matAlgo14xDs(matrix2(x), y, multiplyScalar2, false).valueOf();
    },
    "any, Array": function anyArray(x, y) {
      return matAlgo14xDs(matrix2(y), x, multiplyScalar2, true).valueOf();
    },
    "any, any": multiplyScalar2,
    "any, any, ...any": typed2.referToSelf((self2) => (x, y, rest) => {
      var result = self2(x, y);
      for (var i2 = 0; i2 < rest.length; i2++) {
        result = self2(result, rest[i2]);
      }
      return result;
    })
  });
});
var name$2$ = "nthRoot";
var dependencies$2$ = ["typed", "matrix", "equalScalar", "BigNumber", "concat"];
var createNthRoot = /* @__PURE__ */ factory(name$2$, dependencies$2$, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    BigNumber: _BigNumber,
    concat: concat2
  } = _ref;
  var matAlgo01xDSid = createMatAlgo01xDSid({
    typed: typed2
  });
  var matAlgo02xDS0 = createMatAlgo02xDS0({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo06xS0S0 = createMatAlgo06xS0S0({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  function complexErr() {
    throw new Error("Complex number not supported in function nthRoot. Use nthRoots instead.");
  }
  return typed2(name$2$, {
    number: nthRootNumber,
    "number, number": nthRootNumber,
    BigNumber: (x) => _bigNthRoot(x, new _BigNumber(2)),
    "BigNumber, BigNumber": _bigNthRoot,
    Complex: complexErr,
    "Complex, number": complexErr,
    Array: typed2.referTo("DenseMatrix,number", (selfDn) => (x) => selfDn(matrix2(x), 2).valueOf()),
    DenseMatrix: typed2.referTo("DenseMatrix,number", (selfDn) => (x) => selfDn(x, 2)),
    SparseMatrix: typed2.referTo("SparseMatrix,number", (selfSn) => (x) => selfSn(x, 2)),
    "SparseMatrix, SparseMatrix": typed2.referToSelf((self2) => (x, y) => {
      if (y.density() === 1) {
        return matAlgo06xS0S0(x, y, self2);
      } else {
        throw new Error("Root must be non-zero");
      }
    }),
    "DenseMatrix, SparseMatrix": typed2.referToSelf((self2) => (x, y) => {
      if (y.density() === 1) {
        return matAlgo01xDSid(x, y, self2, false);
      } else {
        throw new Error("Root must be non-zero");
      }
    }),
    "Array, SparseMatrix": typed2.referTo("DenseMatrix,SparseMatrix", (selfDS) => (x, y) => selfDS(matrix2(x), y)),
    "number | BigNumber, SparseMatrix": typed2.referToSelf((self2) => (x, y) => {
      if (y.density() === 1) {
        return matAlgo11xS0s(y, x, self2, true);
      } else {
        throw new Error("Root must be non-zero");
      }
    })
  }, matrixAlgorithmSuite({
    scalar: "number | BigNumber",
    SD: matAlgo02xDS0,
    Ss: matAlgo11xS0s,
    sS: false
  }));
  function _bigNthRoot(a, root) {
    var precision = _BigNumber.precision;
    var Big = _BigNumber.clone({
      precision: precision + 2
    });
    var zero = new _BigNumber(0);
    var one = new Big(1);
    var inv2 = root.isNegative();
    if (inv2) {
      root = root.neg();
    }
    if (root.isZero()) {
      throw new Error("Root must be non-zero");
    }
    if (a.isNegative() && !root.abs().mod(2).equals(1)) {
      throw new Error("Root must be odd when a is negative.");
    }
    if (a.isZero()) {
      return inv2 ? new Big(Infinity) : 0;
    }
    if (!a.isFinite()) {
      return inv2 ? zero : a;
    }
    var x = a.abs().pow(one.div(root));
    x = a.isNeg() ? x.neg() : x;
    return new _BigNumber((inv2 ? one.div(x) : x).toPrecision(precision));
  }
});
var name$2_ = "sign";
var dependencies$2_ = ["typed", "BigNumber", "Fraction", "complex"];
var createSign = /* @__PURE__ */ factory(name$2_, dependencies$2_, (_ref) => {
  var {
    typed: typed2,
    BigNumber: _BigNumber,
    complex: complex2,
    Fraction: _Fraction
  } = _ref;
  return typed2(name$2_, {
    number: signNumber,
    Complex: function Complex2(x) {
      return x.im === 0 ? complex2(signNumber(x.re)) : x.sign();
    },
    BigNumber: function BigNumber2(x) {
      return new _BigNumber(x.cmp(0));
    },
    Fraction: function Fraction2(x) {
      return new _Fraction(x.s, 1);
    },
    // deep map collection, skip zeros since sign(0) = 0
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2)),
    Unit: typed2.referToSelf((self2) => (x) => {
      if (!x._isDerived() && x.units[0].unit.offset !== 0) {
        throw new TypeError("sign is ambiguous for units with offset");
      }
      return typed2.find(self2, x.valueType())(x.value);
    })
  });
});
var name$2Z = "sqrt";
var dependencies$2Z = ["config", "typed", "Complex"];
var createSqrt = /* @__PURE__ */ factory(name$2Z, dependencies$2Z, (_ref) => {
  var {
    config: config3,
    typed: typed2,
    Complex: Complex2
  } = _ref;
  return typed2("sqrt", {
    number: _sqrtNumber,
    Complex: function Complex3(x) {
      return x.sqrt();
    },
    BigNumber: function BigNumber2(x) {
      if (!x.isNegative() || config3.predictable) {
        return x.sqrt();
      } else {
        return _sqrtNumber(x.toNumber());
      }
    },
    Unit: function Unit2(x) {
      return x.pow(0.5);
    }
  });
  function _sqrtNumber(x) {
    if (isNaN(x)) {
      return NaN;
    } else if (x >= 0 || config3.predictable) {
      return Math.sqrt(x);
    } else {
      return new Complex2(x, 0).sqrt();
    }
  }
});
var name$2Y = "square";
var dependencies$2Y = ["typed"];
var createSquare = /* @__PURE__ */ factory(name$2Y, dependencies$2Y, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$2Y, {
    number: squareNumber,
    Complex: function Complex2(x) {
      return x.mul(x);
    },
    BigNumber: function BigNumber2(x) {
      return x.times(x);
    },
    Fraction: function Fraction2(x) {
      return x.mul(x);
    },
    Unit: function Unit2(x) {
      return x.pow(2);
    }
  });
});
var name$2X = "subtract";
var dependencies$2X = ["typed", "matrix", "equalScalar", "subtractScalar", "unaryMinus", "DenseMatrix", "concat"];
var createSubtract = /* @__PURE__ */ factory(name$2X, dependencies$2X, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    subtractScalar: subtractScalar2,
    unaryMinus: unaryMinus2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var matAlgo01xDSid = createMatAlgo01xDSid({
    typed: typed2
  });
  var matAlgo03xDSf = createMatAlgo03xDSf({
    typed: typed2
  });
  var matAlgo05xSfSf = createMatAlgo05xSfSf({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo10xSids = createMatAlgo10xSids({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  return typed2(name$2X, {
    "any, any": subtractScalar2
  }, matrixAlgorithmSuite({
    elop: subtractScalar2,
    SS: matAlgo05xSfSf,
    DS: matAlgo01xDSid,
    SD: matAlgo03xDSf,
    Ss: matAlgo12xSfs,
    sS: matAlgo10xSids
  }));
});
var name$2W = "xgcd";
var dependencies$2W = ["typed", "config", "matrix", "BigNumber"];
var createXgcd = /* @__PURE__ */ factory(name$2W, dependencies$2W, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    matrix: matrix2,
    BigNumber: BigNumber2
  } = _ref;
  return typed2(name$2W, {
    "number, number": function numberNumber(a, b) {
      var res = xgcdNumber(a, b);
      return config3.matrix === "Array" ? res : matrix2(res);
    },
    "BigNumber, BigNumber": _xgcdBigNumber
    // TODO: implement support for Fraction
  });
  function _xgcdBigNumber(a, b) {
    var t;
    var q;
    var r;
    var zero = new BigNumber2(0);
    var one = new BigNumber2(1);
    var x = zero;
    var lastx = one;
    var y = one;
    var lasty = zero;
    if (!a.isInt() || !b.isInt()) {
      throw new Error("Parameters in function xgcd must be integer numbers");
    }
    while (!b.isZero()) {
      q = a.div(b).floor();
      r = a.mod(b);
      t = x;
      x = lastx.minus(q.times(x));
      lastx = t;
      t = y;
      y = lasty.minus(q.times(y));
      lasty = t;
      a = b;
      b = r;
    }
    var res;
    if (a.lt(zero)) {
      res = [a.neg(), lastx.neg(), lasty.neg()];
    } else {
      res = [a, !a.isZero() ? lastx : 0, lasty];
    }
    return config3.matrix === "Array" ? res : matrix2(res);
  }
});
var name$2V = "invmod";
var dependencies$2V = ["typed", "config", "BigNumber", "xgcd", "equal", "smaller", "mod", "add", "isInteger"];
var createInvmod = /* @__PURE__ */ factory(name$2V, dependencies$2V, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    BigNumber: BigNumber2,
    xgcd: xgcd2,
    equal: equal2,
    smaller: smaller2,
    mod: mod2,
    add: add2,
    isInteger: isInteger2
  } = _ref;
  return typed2(name$2V, {
    "number, number": invmod2,
    "BigNumber, BigNumber": invmod2
  });
  function invmod2(a, b) {
    if (!isInteger2(a) || !isInteger2(b))
      throw new Error("Parameters in function invmod must be integer numbers");
    a = mod2(a, b);
    if (equal2(b, 0))
      throw new Error("Divisor must be non zero");
    var res = xgcd2(a, b);
    res = res.valueOf();
    var [gcd2, inv2] = res;
    if (!equal2(gcd2, BigNumber2(1)))
      return NaN;
    inv2 = mod2(inv2, b);
    if (smaller2(inv2, BigNumber2(0)))
      inv2 = add2(inv2, b);
    return inv2;
  }
});
var name$2U = "matAlgo09xS0Sf";
var dependencies$2U = ["typed", "equalScalar"];
var createMatAlgo09xS0Sf = /* @__PURE__ */ factory(name$2U, dependencies$2U, (_ref) => {
  var {
    typed: typed2,
    equalScalar: equalScalar2
  } = _ref;
  return function matAlgo09xS0Sf(a, b, callback) {
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var asize = a._size;
    var adt = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var bsize = b._size;
    var bdt = b._datatype || b._data === void 0 ? b._datatype : b.getDataType();
    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    }
    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
      throw new RangeError("Dimension mismatch. Matrix A (" + asize + ") must match Matrix B (" + bsize + ")");
    }
    var rows = asize[0];
    var columns = asize[1];
    var dt;
    var eq = equalScalar2;
    var zero = 0;
    var cf = callback;
    if (typeof adt === "string" && adt === bdt && adt !== "mixed") {
      dt = adt;
      eq = typed2.find(equalScalar2, [dt, dt]);
      zero = typed2.convert(0, dt);
      cf = typed2.find(callback, [dt, dt]);
    }
    var cvalues = avalues && bvalues ? [] : void 0;
    var cindex = [];
    var cptr = [];
    var x = cvalues ? [] : void 0;
    var w = [];
    var i2, j, k, k0, k1;
    for (j = 0; j < columns; j++) {
      cptr[j] = cindex.length;
      var mark = j + 1;
      if (x) {
        for (k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
          i2 = bindex[k];
          w[i2] = mark;
          x[i2] = bvalues[k];
        }
      }
      for (k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
        i2 = aindex[k];
        if (x) {
          var vb = w[i2] === mark ? x[i2] : zero;
          var vc = cf(avalues[k], vb);
          if (!eq(vc, zero)) {
            cindex.push(i2);
            cvalues.push(vc);
          }
        } else {
          cindex.push(i2);
        }
      }
    }
    cptr[columns] = cindex.length;
    return a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [rows, columns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
  };
});
var name$2T = "dotMultiply";
var dependencies$2T = ["typed", "matrix", "equalScalar", "multiplyScalar", "concat"];
var createDotMultiply = /* @__PURE__ */ factory(name$2T, dependencies$2T, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    multiplyScalar: multiplyScalar2,
    concat: concat2
  } = _ref;
  var matAlgo02xDS0 = createMatAlgo02xDS0({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo09xS0Sf = createMatAlgo09xS0Sf({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  return typed2(name$2T, matrixAlgorithmSuite({
    elop: multiplyScalar2,
    SS: matAlgo09xS0Sf,
    DS: matAlgo02xDS0,
    Ss: matAlgo11xS0s
  }));
});
function bitAndBigNumber(x, y) {
  if (x.isFinite() && !x.isInteger() || y.isFinite() && !y.isInteger()) {
    throw new Error("Integers expected in function bitAnd");
  }
  var BigNumber2 = x.constructor;
  if (x.isNaN() || y.isNaN()) {
    return new BigNumber2(NaN);
  }
  if (x.isZero() || y.eq(-1) || x.eq(y)) {
    return x;
  }
  if (y.isZero() || x.eq(-1)) {
    return y;
  }
  if (!x.isFinite() || !y.isFinite()) {
    if (!x.isFinite() && !y.isFinite()) {
      if (x.isNegative() === y.isNegative()) {
        return x;
      }
      return new BigNumber2(0);
    }
    if (!x.isFinite()) {
      if (y.isNegative()) {
        return x;
      }
      if (x.isNegative()) {
        return new BigNumber2(0);
      }
      return y;
    }
    if (!y.isFinite()) {
      if (x.isNegative()) {
        return y;
      }
      if (y.isNegative()) {
        return new BigNumber2(0);
      }
      return x;
    }
  }
  return bitwise(x, y, function(a, b) {
    return a & b;
  });
}
function bitNotBigNumber(x) {
  if (x.isFinite() && !x.isInteger()) {
    throw new Error("Integer expected in function bitNot");
  }
  var BigNumber2 = x.constructor;
  var prevPrec = BigNumber2.precision;
  BigNumber2.config({
    precision: 1e9
  });
  var result = x.plus(new BigNumber2(1));
  result.s = -result.s || null;
  BigNumber2.config({
    precision: prevPrec
  });
  return result;
}
function bitOrBigNumber(x, y) {
  if (x.isFinite() && !x.isInteger() || y.isFinite() && !y.isInteger()) {
    throw new Error("Integers expected in function bitOr");
  }
  var BigNumber2 = x.constructor;
  if (x.isNaN() || y.isNaN()) {
    return new BigNumber2(NaN);
  }
  var negOne = new BigNumber2(-1);
  if (x.isZero() || y.eq(negOne) || x.eq(y)) {
    return y;
  }
  if (y.isZero() || x.eq(negOne)) {
    return x;
  }
  if (!x.isFinite() || !y.isFinite()) {
    if (!x.isFinite() && !x.isNegative() && y.isNegative() || x.isNegative() && !y.isNegative() && !y.isFinite()) {
      return negOne;
    }
    if (x.isNegative() && y.isNegative()) {
      return x.isFinite() ? x : y;
    }
    return x.isFinite() ? y : x;
  }
  return bitwise(x, y, function(a, b) {
    return a | b;
  });
}
function bitwise(x, y, func) {
  var BigNumber2 = x.constructor;
  var xBits, yBits;
  var xSign = +(x.s < 0);
  var ySign = +(y.s < 0);
  if (xSign) {
    xBits = decCoefficientToBinaryString(bitNotBigNumber(x));
    for (var i2 = 0; i2 < xBits.length; ++i2) {
      xBits[i2] ^= 1;
    }
  } else {
    xBits = decCoefficientToBinaryString(x);
  }
  if (ySign) {
    yBits = decCoefficientToBinaryString(bitNotBigNumber(y));
    for (var _i = 0; _i < yBits.length; ++_i) {
      yBits[_i] ^= 1;
    }
  } else {
    yBits = decCoefficientToBinaryString(y);
  }
  var minBits, maxBits, minSign;
  if (xBits.length <= yBits.length) {
    minBits = xBits;
    maxBits = yBits;
    minSign = xSign;
  } else {
    minBits = yBits;
    maxBits = xBits;
    minSign = ySign;
  }
  var shortLen = minBits.length;
  var longLen = maxBits.length;
  var expFuncVal = func(xSign, ySign) ^ 1;
  var outVal = new BigNumber2(expFuncVal ^ 1);
  var twoPower = new BigNumber2(1);
  var two = new BigNumber2(2);
  var prevPrec = BigNumber2.precision;
  BigNumber2.config({
    precision: 1e9
  });
  while (shortLen > 0) {
    if (func(minBits[--shortLen], maxBits[--longLen]) === expFuncVal) {
      outVal = outVal.plus(twoPower);
    }
    twoPower = twoPower.times(two);
  }
  while (longLen > 0) {
    if (func(minSign, maxBits[--longLen]) === expFuncVal) {
      outVal = outVal.plus(twoPower);
    }
    twoPower = twoPower.times(two);
  }
  BigNumber2.config({
    precision: prevPrec
  });
  if (expFuncVal === 0) {
    outVal.s = -outVal.s;
  }
  return outVal;
}
function decCoefficientToBinaryString(x) {
  var a = x.d;
  var r = a[0] + "";
  for (var i2 = 1; i2 < a.length; ++i2) {
    var s = a[i2] + "";
    for (var z = 7 - s.length; z--; ) {
      s = "0" + s;
    }
    r += s;
  }
  var j = r.length;
  while (r.charAt(j) === "0") {
    j--;
  }
  var xe = x.e;
  var str = r.slice(0, j + 1 || 1);
  var strL = str.length;
  if (xe > 0) {
    if (++xe > strL) {
      xe -= strL;
      while (xe--) {
        str += "0";
      }
    } else if (xe < strL) {
      str = str.slice(0, xe) + "." + str.slice(xe);
    }
  }
  var arr = [0];
  for (var _i2 = 0; _i2 < str.length; ) {
    var arrL = arr.length;
    while (arrL--) {
      arr[arrL] *= 10;
    }
    arr[0] += parseInt(str.charAt(_i2++));
    for (var _j = 0; _j < arr.length; ++_j) {
      if (arr[_j] > 1) {
        if (arr[_j + 1] === null || arr[_j + 1] === void 0) {
          arr[_j + 1] = 0;
        }
        arr[_j + 1] += arr[_j] >> 1;
        arr[_j] &= 1;
      }
    }
  }
  return arr.reverse();
}
function bitXor$1(x, y) {
  if (x.isFinite() && !x.isInteger() || y.isFinite() && !y.isInteger()) {
    throw new Error("Integers expected in function bitXor");
  }
  var BigNumber2 = x.constructor;
  if (x.isNaN() || y.isNaN()) {
    return new BigNumber2(NaN);
  }
  if (x.isZero()) {
    return y;
  }
  if (y.isZero()) {
    return x;
  }
  if (x.eq(y)) {
    return new BigNumber2(0);
  }
  var negOne = new BigNumber2(-1);
  if (x.eq(negOne)) {
    return bitNotBigNumber(y);
  }
  if (y.eq(negOne)) {
    return bitNotBigNumber(x);
  }
  if (!x.isFinite() || !y.isFinite()) {
    if (!x.isFinite() && !y.isFinite()) {
      return negOne;
    }
    return new BigNumber2(x.isNegative() === y.isNegative() ? Infinity : -Infinity);
  }
  return bitwise(x, y, function(a, b) {
    return a ^ b;
  });
}
function leftShiftBigNumber(x, y) {
  if (x.isFinite() && !x.isInteger() || y.isFinite() && !y.isInteger()) {
    throw new Error("Integers expected in function leftShift");
  }
  var BigNumber2 = x.constructor;
  if (x.isNaN() || y.isNaN() || y.isNegative() && !y.isZero()) {
    return new BigNumber2(NaN);
  }
  if (x.isZero() || y.isZero()) {
    return x;
  }
  if (!x.isFinite() && !y.isFinite()) {
    return new BigNumber2(NaN);
  }
  if (y.lt(55)) {
    return x.times(Math.pow(2, y.toNumber()) + "");
  }
  return x.times(new BigNumber2(2).pow(y));
}
function rightArithShiftBigNumber(x, y) {
  if (x.isFinite() && !x.isInteger() || y.isFinite() && !y.isInteger()) {
    throw new Error("Integers expected in function rightArithShift");
  }
  var BigNumber2 = x.constructor;
  if (x.isNaN() || y.isNaN() || y.isNegative() && !y.isZero()) {
    return new BigNumber2(NaN);
  }
  if (x.isZero() || y.isZero()) {
    return x;
  }
  if (!y.isFinite()) {
    if (x.isNegative()) {
      return new BigNumber2(-1);
    }
    if (!x.isFinite()) {
      return new BigNumber2(NaN);
    }
    return new BigNumber2(0);
  }
  if (y.lt(55)) {
    return x.div(Math.pow(2, y.toNumber()) + "").floor();
  }
  return x.div(new BigNumber2(2).pow(y)).floor();
}
var name$2S = "bitAnd";
var dependencies$2S = ["typed", "matrix", "equalScalar", "concat"];
var createBitAnd = /* @__PURE__ */ factory(name$2S, dependencies$2S, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    concat: concat2
  } = _ref;
  var matAlgo02xDS0 = createMatAlgo02xDS0({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo06xS0S0 = createMatAlgo06xS0S0({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  return typed2(name$2S, {
    "number, number": bitAndNumber,
    "BigNumber, BigNumber": bitAndBigNumber
  }, matrixAlgorithmSuite({
    SS: matAlgo06xS0S0,
    DS: matAlgo02xDS0,
    Ss: matAlgo11xS0s
  }));
});
var name$2R = "bitNot";
var dependencies$2R = ["typed"];
var createBitNot = /* @__PURE__ */ factory(name$2R, dependencies$2R, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$2R, {
    number: bitNotNumber,
    BigNumber: bitNotBigNumber,
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var name$2Q = "bitOr";
var dependencies$2Q = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat"];
var createBitOr = /* @__PURE__ */ factory(name$2Q, dependencies$2Q, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var matAlgo01xDSid = createMatAlgo01xDSid({
    typed: typed2
  });
  var matAlgo04xSidSid = createMatAlgo04xSidSid({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo10xSids = createMatAlgo10xSids({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  return typed2(name$2Q, {
    "number, number": bitOrNumber,
    "BigNumber, BigNumber": bitOrBigNumber
  }, matrixAlgorithmSuite({
    SS: matAlgo04xSidSid,
    DS: matAlgo01xDSid,
    Ss: matAlgo10xSids
  }));
});
var name$2P = "matAlgo07xSSf";
var dependencies$2P = ["typed", "DenseMatrix"];
var createMatAlgo07xSSf = /* @__PURE__ */ factory(name$2P, dependencies$2P, (_ref) => {
  var {
    typed: typed2,
    DenseMatrix: DenseMatrix2
  } = _ref;
  return function matAlgo07xSSf(a, b, callback) {
    var asize = a._size;
    var adt = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    var bsize = b._size;
    var bdt = b._datatype || b._data === void 0 ? b._datatype : b.getDataType();
    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    }
    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
      throw new RangeError("Dimension mismatch. Matrix A (" + asize + ") must match Matrix B (" + bsize + ")");
    }
    var rows = asize[0];
    var columns = asize[1];
    var dt;
    var zero = 0;
    var cf = callback;
    if (typeof adt === "string" && adt === bdt && adt !== "mixed") {
      dt = adt;
      zero = typed2.convert(0, dt);
      cf = typed2.find(callback, [dt, dt]);
    }
    var i2, j;
    var cdata = [];
    for (i2 = 0; i2 < rows; i2++) {
      cdata[i2] = [];
    }
    var xa = [];
    var xb = [];
    var wa = [];
    var wb = [];
    for (j = 0; j < columns; j++) {
      var mark = j + 1;
      _scatter(a, j, wa, xa, mark);
      _scatter(b, j, wb, xb, mark);
      for (i2 = 0; i2 < rows; i2++) {
        var va = wa[i2] === mark ? xa[i2] : zero;
        var vb = wb[i2] === mark ? xb[i2] : zero;
        cdata[i2][j] = cf(va, vb);
      }
    }
    return new DenseMatrix2({
      data: cdata,
      size: [rows, columns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
  };
  function _scatter(m, j, w, x, mark) {
    var values = m._values;
    var index2 = m._index;
    var ptr = m._ptr;
    for (var k = ptr[j], k1 = ptr[j + 1]; k < k1; k++) {
      var i2 = index2[k];
      w[i2] = mark;
      x[i2] = values[k];
    }
  }
});
var name$2O = "bitXor";
var dependencies$2O = ["typed", "matrix", "DenseMatrix", "concat"];
var createBitXor = /* @__PURE__ */ factory(name$2O, dependencies$2O, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var matAlgo03xDSf = createMatAlgo03xDSf({
    typed: typed2
  });
  var matAlgo07xSSf = createMatAlgo07xSSf({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  return typed2(name$2O, {
    "number, number": bitXorNumber,
    "BigNumber, BigNumber": bitXor$1
  }, matrixAlgorithmSuite({
    SS: matAlgo07xSSf,
    DS: matAlgo03xDSf,
    Ss: matAlgo12xSfs
  }));
});
var name$2N = "arg";
var dependencies$2N = ["typed"];
var createArg = /* @__PURE__ */ factory(name$2N, dependencies$2N, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$2N, {
    number: function number2(x) {
      return Math.atan2(0, x);
    },
    BigNumber: function BigNumber2(x) {
      return x.constructor.atan2(0, x);
    },
    Complex: function Complex2(x) {
      return x.arg();
    },
    // TODO: implement BigNumber support for function arg
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var name$2M = "conj";
var dependencies$2M = ["typed"];
var createConj = /* @__PURE__ */ factory(name$2M, dependencies$2M, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$2M, {
    "number | BigNumber | Fraction": (x) => x,
    Complex: (x) => x.conjugate(),
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var name$2L = "im";
var dependencies$2L = ["typed"];
var createIm = /* @__PURE__ */ factory(name$2L, dependencies$2L, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$2L, {
    number: () => 0,
    "BigNumber | Fraction": (x) => x.mul(0),
    Complex: (x) => x.im,
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var name$2K = "re";
var dependencies$2K = ["typed"];
var createRe = /* @__PURE__ */ factory(name$2K, dependencies$2K, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$2K, {
    "number | BigNumber | Fraction": (x) => x,
    Complex: (x) => x.re,
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var name$2J = "not";
var dependencies$2J = ["typed"];
var createNot = /* @__PURE__ */ factory(name$2J, dependencies$2J, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$2J, {
    "null | undefined": () => true,
    number: notNumber,
    Complex: function Complex2(x) {
      return x.re === 0 && x.im === 0;
    },
    BigNumber: function BigNumber2(x) {
      return x.isZero() || x.isNaN();
    },
    Unit: typed2.referToSelf((self2) => (x) => typed2.find(self2, x.valueType())(x.value)),
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var name$2I = "or";
var dependencies$2I = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat"];
var createOr = /* @__PURE__ */ factory(name$2I, dependencies$2I, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var matAlgo03xDSf = createMatAlgo03xDSf({
    typed: typed2
  });
  var matAlgo05xSfSf = createMatAlgo05xSfSf({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  return typed2(name$2I, {
    "number, number": orNumber,
    "Complex, Complex": function ComplexComplex(x, y) {
      return x.re !== 0 || x.im !== 0 || y.re !== 0 || y.im !== 0;
    },
    "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
      return !x.isZero() && !x.isNaN() || !y.isZero() && !y.isNaN();
    },
    "Unit, Unit": typed2.referToSelf((self2) => (x, y) => self2(x.value || 0, y.value || 0))
  }, matrixAlgorithmSuite({
    SS: matAlgo05xSfSf,
    DS: matAlgo03xDSf,
    Ss: matAlgo12xSfs
  }));
});
var name$2H = "xor";
var dependencies$2H = ["typed", "matrix", "DenseMatrix", "concat"];
var createXor = /* @__PURE__ */ factory(name$2H, dependencies$2H, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var matAlgo03xDSf = createMatAlgo03xDSf({
    typed: typed2
  });
  var matAlgo07xSSf = createMatAlgo07xSSf({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  return typed2(name$2H, {
    "number, number": xorNumber,
    "Complex, Complex": function ComplexComplex(x, y) {
      return (x.re !== 0 || x.im !== 0) !== (y.re !== 0 || y.im !== 0);
    },
    "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
      return (!x.isZero() && !x.isNaN()) !== (!y.isZero() && !y.isNaN());
    },
    "Unit, Unit": typed2.referToSelf((self2) => (x, y) => self2(x.value || 0, y.value || 0))
  }, matrixAlgorithmSuite({
    SS: matAlgo07xSSf,
    DS: matAlgo03xDSf,
    Ss: matAlgo12xSfs
  }));
});
var name$2G = "concat";
var dependencies$2G = ["typed", "matrix", "isInteger"];
var createConcat = /* @__PURE__ */ factory(name$2G, dependencies$2G, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    isInteger: isInteger2
  } = _ref;
  return typed2(name$2G, {
    // TODO: change signature to '...Array | Matrix, dim?' when supported
    "...Array | Matrix | number | BigNumber": function ArrayMatrixNumberBigNumber(args) {
      var i2;
      var len = args.length;
      var dim = -1;
      var prevDim;
      var asMatrix = false;
      var matrices = [];
      for (i2 = 0; i2 < len; i2++) {
        var arg2 = args[i2];
        if (isMatrix(arg2)) {
          asMatrix = true;
        }
        if (isNumber(arg2) || isBigNumber(arg2)) {
          if (i2 !== len - 1) {
            throw new Error("Dimension must be specified as last argument");
          }
          prevDim = dim;
          dim = arg2.valueOf();
          if (!isInteger2(dim)) {
            throw new TypeError("Integer number expected for dimension");
          }
          if (dim < 0 || i2 > 0 && dim > prevDim) {
            throw new IndexError(dim, prevDim + 1);
          }
        } else {
          var m = clone$3(arg2).valueOf();
          var size2 = arraySize(m);
          matrices[i2] = m;
          prevDim = dim;
          dim = size2.length - 1;
          if (i2 > 0 && dim !== prevDim) {
            throw new DimensionError(prevDim + 1, dim + 1);
          }
        }
      }
      if (matrices.length === 0) {
        throw new SyntaxError("At least one matrix expected");
      }
      var res = matrices.shift();
      while (matrices.length) {
        res = concat$1(res, matrices.shift(), dim);
      }
      return asMatrix ? matrix2(res) : res;
    },
    "...string": function string2(args) {
      return args.join("");
    }
  });
});
var name$2F = "column";
var dependencies$2F = ["typed", "Index", "matrix", "range"];
var createColumn = /* @__PURE__ */ factory(name$2F, dependencies$2F, (_ref) => {
  var {
    typed: typed2,
    Index: Index2,
    matrix: matrix2,
    range: range2
  } = _ref;
  return typed2(name$2F, {
    "Matrix, number": _column,
    "Array, number": function ArrayNumber(value, column2) {
      return _column(matrix2(clone$3(value)), column2).valueOf();
    }
  });
  function _column(value, column2) {
    if (value.size().length !== 2) {
      throw new Error("Only two dimensional matrix is supported");
    }
    validateIndex(column2, value.size()[1]);
    var rowRange = range2(0, value.size()[0]);
    var index2 = new Index2(rowRange, column2);
    var result = value.subset(index2);
    return isMatrix(result) ? result : matrix2([[result]]);
  }
});
var name$2E = "count";
var dependencies$2E = ["typed", "size", "prod"];
var createCount = /* @__PURE__ */ factory(name$2E, dependencies$2E, (_ref) => {
  var {
    typed: typed2,
    size: size2,
    prod: prod2
  } = _ref;
  return typed2(name$2E, {
    string: function string2(x) {
      return x.length;
    },
    "Matrix | Array": function MatrixArray(x) {
      return prod2(size2(x));
    }
  });
});
var name$2D = "cross";
var dependencies$2D = ["typed", "matrix", "subtract", "multiply"];
var createCross = /* @__PURE__ */ factory(name$2D, dependencies$2D, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    subtract: subtract2,
    multiply: multiply2
  } = _ref;
  return typed2(name$2D, {
    "Matrix, Matrix": function MatrixMatrix(x, y) {
      return matrix2(_cross(x.toArray(), y.toArray()));
    },
    "Matrix, Array": function MatrixArray(x, y) {
      return matrix2(_cross(x.toArray(), y));
    },
    "Array, Matrix": function ArrayMatrix(x, y) {
      return matrix2(_cross(x, y.toArray()));
    },
    "Array, Array": _cross
  });
  function _cross(x, y) {
    var highestDimension = Math.max(arraySize(x).length, arraySize(y).length);
    x = squeeze$1(x);
    y = squeeze$1(y);
    var xSize = arraySize(x);
    var ySize = arraySize(y);
    if (xSize.length !== 1 || ySize.length !== 1 || xSize[0] !== 3 || ySize[0] !== 3) {
      throw new RangeError("Vectors with length 3 expected (Size A = [" + xSize.join(", ") + "], B = [" + ySize.join(", ") + "])");
    }
    var product2 = [subtract2(multiply2(x[1], y[2]), multiply2(x[2], y[1])), subtract2(multiply2(x[2], y[0]), multiply2(x[0], y[2])), subtract2(multiply2(x[0], y[1]), multiply2(x[1], y[0]))];
    if (highestDimension > 1) {
      return [product2];
    } else {
      return product2;
    }
  }
});
var name$2C = "diag";
var dependencies$2C = ["typed", "matrix", "DenseMatrix", "SparseMatrix"];
var createDiag = /* @__PURE__ */ factory(name$2C, dependencies$2C, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    DenseMatrix: DenseMatrix2,
    SparseMatrix: SparseMatrix2
  } = _ref;
  return typed2(name$2C, {
    // FIXME: simplify this huge amount of signatures as soon as typed-function supports optional arguments
    Array: function Array2(x) {
      return _diag(x, 0, arraySize(x), null);
    },
    "Array, number": function ArrayNumber(x, k) {
      return _diag(x, k, arraySize(x), null);
    },
    "Array, BigNumber": function ArrayBigNumber(x, k) {
      return _diag(x, k.toNumber(), arraySize(x), null);
    },
    "Array, string": function ArrayString(x, format2) {
      return _diag(x, 0, arraySize(x), format2);
    },
    "Array, number, string": function ArrayNumberString(x, k, format2) {
      return _diag(x, k, arraySize(x), format2);
    },
    "Array, BigNumber, string": function ArrayBigNumberString(x, k, format2) {
      return _diag(x, k.toNumber(), arraySize(x), format2);
    },
    Matrix: function Matrix2(x) {
      return _diag(x, 0, x.size(), x.storage());
    },
    "Matrix, number": function MatrixNumber(x, k) {
      return _diag(x, k, x.size(), x.storage());
    },
    "Matrix, BigNumber": function MatrixBigNumber(x, k) {
      return _diag(x, k.toNumber(), x.size(), x.storage());
    },
    "Matrix, string": function MatrixString(x, format2) {
      return _diag(x, 0, x.size(), format2);
    },
    "Matrix, number, string": function MatrixNumberString(x, k, format2) {
      return _diag(x, k, x.size(), format2);
    },
    "Matrix, BigNumber, string": function MatrixBigNumberString(x, k, format2) {
      return _diag(x, k.toNumber(), x.size(), format2);
    }
  });
  function _diag(x, k, size2, format2) {
    if (!isInteger$1(k)) {
      throw new TypeError("Second parameter in function diag must be an integer");
    }
    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0;
    switch (size2.length) {
      case 1:
        return _createDiagonalMatrix(x, k, format2, size2[0], kSub, kSuper);
      case 2:
        return _getDiagonal(x, k, format2, size2, kSub, kSuper);
    }
    throw new RangeError("Matrix for function diag must be 2 dimensional");
  }
  function _createDiagonalMatrix(x, k, format2, l, kSub, kSuper) {
    var ms = [l + kSub, l + kSuper];
    if (format2 && format2 !== "sparse" && format2 !== "dense") {
      throw new TypeError("Unknown matrix type ".concat(format2, '"'));
    }
    var m = format2 === "sparse" ? SparseMatrix2.diagonal(ms, x, k) : DenseMatrix2.diagonal(ms, x, k);
    return format2 !== null ? m : m.valueOf();
  }
  function _getDiagonal(x, k, format2, s, kSub, kSuper) {
    if (isMatrix(x)) {
      var dm = x.diagonal(k);
      if (format2 !== null) {
        if (format2 !== dm.storage()) {
          return matrix2(dm, format2);
        }
        return dm;
      }
      return dm.valueOf();
    }
    var n = Math.min(s[0] - kSub, s[1] - kSuper);
    var vector = [];
    for (var i2 = 0; i2 < n; i2++) {
      vector[i2] = x[i2 + kSub][i2 + kSuper];
    }
    return format2 !== null ? matrix2(vector) : vector;
  }
});
function applyCallback(callback, value, index2, array, mappingFnName) {
  if (typedFunction.isTypedFunction(callback)) {
    var args3 = [value, index2, array];
    var signature3 = typedFunction.resolve(callback, args3);
    if (signature3) {
      return tryWithArgs(signature3.implementation, args3);
    }
    var args2 = [value, index2];
    var signature2 = typedFunction.resolve(callback, args2);
    if (signature2) {
      return tryWithArgs(signature2.implementation, args2);
    }
    var args1 = [value];
    var signature1 = typedFunction.resolve(callback, args1);
    if (signature1) {
      return tryWithArgs(signature1.implementation, args1);
    }
    return tryWithArgs(callback, args3);
  } else {
    return callback(value, index2, array);
  }
  function tryWithArgs(signature, args) {
    try {
      return signature.apply(signature, args);
    } catch (err) {
      var _err$data;
      if (err instanceof TypeError && ((_err$data = err.data) === null || _err$data === void 0 ? void 0 : _err$data.category) === "wrongType") {
        var argsDesc = [];
        argsDesc.push("value: ".concat(typeOf$1(value)));
        if (args.length >= 2) {
          argsDesc.push("index: ".concat(typeOf$1(index2)));
        }
        if (args.length >= 3) {
          argsDesc.push("array: ".concat(typeOf$1(array)));
        }
        throw new TypeError("Function ".concat(mappingFnName, " cannot apply callback arguments ") + "".concat(callback.name, "(").concat(argsDesc.join(", "), ") at index ").concat(JSON.stringify(index2)));
      } else {
        throw new TypeError("Function ".concat(mappingFnName, " cannot apply callback arguments ") + "to function ".concat(callback.name, ": ").concat(err.message));
      }
    }
  }
}
var name$2B = "filter";
var dependencies$2B = ["typed"];
var createFilter = /* @__PURE__ */ factory(name$2B, dependencies$2B, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2("filter", {
    "Array, function": _filterCallback,
    "Matrix, function": function MatrixFunction(x, test) {
      return x.create(_filterCallback(x.toArray(), test));
    },
    "Array, RegExp": filterRegExp,
    "Matrix, RegExp": function MatrixRegExp(x, test) {
      return x.create(filterRegExp(x.toArray(), test));
    }
  });
});
function _filterCallback(x, callback) {
  return filter$1(x, function(value, index2, array) {
    return applyCallback(callback, value, [index2], array, "filter");
  });
}
var name$2A = "flatten";
var dependencies$2A = ["typed", "matrix"];
var createFlatten = /* @__PURE__ */ factory(name$2A, dependencies$2A, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2
  } = _ref;
  return typed2(name$2A, {
    Array: function Array2(x) {
      return flatten$1(x);
    },
    Matrix: function Matrix2(x) {
      var flat = flatten$1(x.toArray());
      return matrix2(flat);
    }
  });
});
var name$2z = "forEach";
var dependencies$2z = ["typed"];
var createForEach = /* @__PURE__ */ factory(name$2z, dependencies$2z, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$2z, {
    "Array, function": _forEach,
    "Matrix, function": function MatrixFunction(x, callback) {
      x.forEach(callback);
    }
  });
});
function _forEach(array, callback) {
  var recurse = function recurse2(value, index2) {
    if (Array.isArray(value)) {
      forEach$1(value, function(child, i2) {
        recurse2(child, index2.concat(i2));
      });
    } else {
      return applyCallback(callback, value, index2, array, "forEach");
    }
  };
  recurse(array, []);
}
var name$2y = "getMatrixDataType";
var dependencies$2y = ["typed"];
var createGetMatrixDataType = /* @__PURE__ */ factory(name$2y, dependencies$2y, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$2y, {
    Array: function Array2(x) {
      return getArrayDataType(x, typeOf$1);
    },
    Matrix: function Matrix2(x) {
      return x.getDataType();
    }
  });
});
var name$2x = "identity";
var dependencies$2x = ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"];
var createIdentity = /* @__PURE__ */ factory(name$2x, dependencies$2x, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    matrix: matrix2,
    BigNumber: BigNumber2,
    DenseMatrix: DenseMatrix2,
    SparseMatrix: SparseMatrix2
  } = _ref;
  return typed2(name$2x, {
    "": function _() {
      return config3.matrix === "Matrix" ? matrix2([]) : [];
    },
    string: function string2(format2) {
      return matrix2(format2);
    },
    "number | BigNumber": function numberBigNumber(rows) {
      return _identity(rows, rows, config3.matrix === "Matrix" ? "dense" : void 0);
    },
    "number | BigNumber, string": function numberBigNumberString(rows, format2) {
      return _identity(rows, rows, format2);
    },
    "number | BigNumber, number | BigNumber": function numberBigNumberNumberBigNumber(rows, cols) {
      return _identity(rows, cols, config3.matrix === "Matrix" ? "dense" : void 0);
    },
    "number | BigNumber, number | BigNumber, string": function numberBigNumberNumberBigNumberString(rows, cols, format2) {
      return _identity(rows, cols, format2);
    },
    Array: function Array2(size2) {
      return _identityVector(size2);
    },
    "Array, string": function ArrayString(size2, format2) {
      return _identityVector(size2, format2);
    },
    Matrix: function Matrix2(size2) {
      return _identityVector(size2.valueOf(), size2.storage());
    },
    "Matrix, string": function MatrixString(size2, format2) {
      return _identityVector(size2.valueOf(), format2);
    }
  });
  function _identityVector(size2, format2) {
    switch (size2.length) {
      case 0:
        return format2 ? matrix2(format2) : [];
      case 1:
        return _identity(size2[0], size2[0], format2);
      case 2:
        return _identity(size2[0], size2[1], format2);
      default:
        throw new Error("Vector containing two values expected");
    }
  }
  function _identity(rows, cols, format2) {
    var Big = isBigNumber(rows) || isBigNumber(cols) ? BigNumber2 : null;
    if (isBigNumber(rows))
      rows = rows.toNumber();
    if (isBigNumber(cols))
      cols = cols.toNumber();
    if (!isInteger$1(rows) || rows < 1) {
      throw new Error("Parameters in function identity must be positive integers");
    }
    if (!isInteger$1(cols) || cols < 1) {
      throw new Error("Parameters in function identity must be positive integers");
    }
    var one = Big ? new BigNumber2(1) : 1;
    var defaultValue = Big ? new Big(0) : 0;
    var size2 = [rows, cols];
    if (format2) {
      if (format2 === "sparse") {
        return SparseMatrix2.diagonal(size2, one, 0, defaultValue);
      }
      if (format2 === "dense") {
        return DenseMatrix2.diagonal(size2, one, 0, defaultValue);
      }
      throw new TypeError('Unknown matrix type "'.concat(format2, '"'));
    }
    var res = resize$1([], size2, defaultValue);
    var minimum = rows < cols ? rows : cols;
    for (var d = 0; d < minimum; d++) {
      res[d][d] = one;
    }
    return res;
  }
});
var name$2w = "kron";
var dependencies$2w = ["typed", "matrix", "multiplyScalar"];
var createKron = /* @__PURE__ */ factory(name$2w, dependencies$2w, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    multiplyScalar: multiplyScalar2
  } = _ref;
  return typed2(name$2w, {
    "Matrix, Matrix": function MatrixMatrix(x, y) {
      return matrix2(_kron(x.toArray(), y.toArray()));
    },
    "Matrix, Array": function MatrixArray(x, y) {
      return matrix2(_kron(x.toArray(), y));
    },
    "Array, Matrix": function ArrayMatrix(x, y) {
      return matrix2(_kron(x, y.toArray()));
    },
    "Array, Array": _kron
  });
  function _kron(a, b) {
    if (arraySize(a).length === 1) {
      a = [a];
    }
    if (arraySize(b).length === 1) {
      b = [b];
    }
    if (arraySize(a).length > 2 || arraySize(b).length > 2) {
      throw new RangeError("Vectors with dimensions greater then 2 are not supported expected (Size x = " + JSON.stringify(a.length) + ", y = " + JSON.stringify(b.length) + ")");
    }
    var t = [];
    var r = [];
    return a.map(function(a2) {
      return b.map(function(b2) {
        r = [];
        t.push(r);
        return a2.map(function(y) {
          return b2.map(function(x) {
            return r.push(multiplyScalar2(y, x));
          });
        });
      });
    }) && t;
  }
});
var name$2v = "map";
var dependencies$2v = ["typed"];
var createMap = /* @__PURE__ */ factory(name$2v, dependencies$2v, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$2v, {
    "Array, function": _map,
    "Matrix, function": function MatrixFunction(x, callback) {
      return x.map(callback);
    }
  });
});
function _map(array, callback) {
  var recurse = function recurse2(value, index2) {
    if (Array.isArray(value)) {
      return value.map(function(child, i2) {
        return recurse2(child, index2.concat(i2));
      });
    } else {
      return applyCallback(callback, value, index2, array, "map");
    }
  };
  return recurse(array, []);
}
var name$2u = "diff";
var dependencies$2u = ["typed", "matrix", "subtract", "number"];
var createDiff = /* @__PURE__ */ factory(name$2u, dependencies$2u, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    subtract: subtract2,
    number: number2
  } = _ref;
  return typed2(name$2u, {
    "Array | Matrix": function ArrayMatrix(arr) {
      if (isMatrix(arr)) {
        return matrix2(_diff(arr.toArray()));
      } else {
        return _diff(arr);
      }
    },
    "Array | Matrix, number": function ArrayMatrixNumber(arr, dim) {
      if (!isInteger$1(dim))
        throw new RangeError("Dimension must be a whole number");
      if (isMatrix(arr)) {
        return matrix2(_recursive(arr.toArray(), dim));
      } else {
        return _recursive(arr, dim);
      }
    },
    "Array, BigNumber": typed2.referTo("Array,number", (selfAn) => (arr, dim) => selfAn(arr, number2(dim))),
    "Matrix, BigNumber": typed2.referTo("Matrix,number", (selfMn) => (arr, dim) => selfMn(arr, number2(dim)))
  });
  function _recursive(arr, dim) {
    if (isMatrix(arr)) {
      arr = arr.toArray();
    }
    if (!Array.isArray(arr)) {
      throw RangeError("Array/Matrix does not have that many dimensions");
    }
    if (dim > 0) {
      var result = [];
      arr.forEach((element) => {
        result.push(_recursive(element, dim - 1));
      });
      return result;
    } else if (dim === 0) {
      return _diff(arr);
    } else {
      throw RangeError("Cannot have negative dimension");
    }
  }
  function _diff(arr) {
    var result = [];
    var size2 = arr.length;
    for (var i2 = 1; i2 < size2; i2++) {
      result.push(_ElementDiff(arr[i2 - 1], arr[i2]));
    }
    return result;
  }
  function _ElementDiff(obj1, obj2) {
    if (isMatrix(obj1))
      obj1 = obj1.toArray();
    if (isMatrix(obj2))
      obj2 = obj2.toArray();
    var obj1IsArray = Array.isArray(obj1);
    var obj2IsArray = Array.isArray(obj2);
    if (obj1IsArray && obj2IsArray) {
      return _ArrayDiff(obj1, obj2);
    }
    if (!obj1IsArray && !obj2IsArray) {
      return subtract2(obj2, obj1);
    }
    throw TypeError("Cannot calculate difference between 1 array and 1 non-array");
  }
  function _ArrayDiff(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      throw RangeError("Not all sub-arrays have the same length");
    }
    var result = [];
    var size2 = arr1.length;
    for (var i2 = 0; i2 < size2; i2++) {
      result.push(_ElementDiff(arr1[i2], arr2[i2]));
    }
    return result;
  }
});
var name$2t = "ones";
var dependencies$2t = ["typed", "config", "matrix", "BigNumber"];
var createOnes = /* @__PURE__ */ factory(name$2t, dependencies$2t, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    matrix: matrix2,
    BigNumber: BigNumber2
  } = _ref;
  return typed2("ones", {
    "": function _() {
      return config3.matrix === "Array" ? _ones([]) : _ones([], "default");
    },
    // math.ones(m, n, p, ..., format)
    // TODO: more accurate signature '...number | BigNumber, string' as soon as typed-function supports this
    "...number | BigNumber | string": function numberBigNumberString(size2) {
      var last = size2[size2.length - 1];
      if (typeof last === "string") {
        var format2 = size2.pop();
        return _ones(size2, format2);
      } else if (config3.matrix === "Array") {
        return _ones(size2);
      } else {
        return _ones(size2, "default");
      }
    },
    Array: _ones,
    Matrix: function Matrix2(size2) {
      var format2 = size2.storage();
      return _ones(size2.valueOf(), format2);
    },
    "Array | Matrix, string": function ArrayMatrixString(size2, format2) {
      return _ones(size2.valueOf(), format2);
    }
  });
  function _ones(size2, format2) {
    var hasBigNumbers = _normalize(size2);
    var defaultValue = hasBigNumbers ? new BigNumber2(1) : 1;
    _validate2(size2);
    if (format2) {
      var m = matrix2(format2);
      if (size2.length > 0) {
        return m.resize(size2, defaultValue);
      }
      return m;
    } else {
      var arr = [];
      if (size2.length > 0) {
        return resize$1(arr, size2, defaultValue);
      }
      return arr;
    }
  }
  function _normalize(size2) {
    var hasBigNumbers = false;
    size2.forEach(function(value, index2, arr) {
      if (isBigNumber(value)) {
        hasBigNumbers = true;
        arr[index2] = value.toNumber();
      }
    });
    return hasBigNumbers;
  }
  function _validate2(size2) {
    size2.forEach(function(value) {
      if (typeof value !== "number" || !isInteger$1(value) || value < 0) {
        throw new Error("Parameters in function ones must be positive integers");
      }
    });
  }
});
function noBignumber() {
  throw new Error('No "bignumber" implementation available');
}
function noFraction() {
  throw new Error('No "fraction" implementation available');
}
function noMatrix() {
  throw new Error('No "matrix" implementation available');
}
var name$2s = "range";
var dependencies$2s = ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq", "add", "isPositive"];
var createRange = /* @__PURE__ */ factory(name$2s, dependencies$2s, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    matrix: matrix2,
    bignumber: bignumber2,
    smaller: smaller2,
    smallerEq: smallerEq2,
    larger: larger2,
    largerEq: largerEq2,
    add: add2,
    isPositive: isPositive2
  } = _ref;
  return typed2(name$2s, {
    // TODO: simplify signatures when typed-function supports default values and optional arguments
    // TODO: a number or boolean should not be converted to string here
    string: _strRange,
    "string, boolean": _strRange,
    "number, number": function numberNumber(start, end) {
      return _out(_range(start, end, 1, false));
    },
    "number, number, number": function numberNumberNumber(start, end, step) {
      return _out(_range(start, end, step, false));
    },
    "number, number, boolean": function numberNumberBoolean(start, end, includeEnd) {
      return _out(_range(start, end, 1, includeEnd));
    },
    "number, number, number, boolean": function numberNumberNumberBoolean(start, end, step, includeEnd) {
      return _out(_range(start, end, step, includeEnd));
    },
    "BigNumber, BigNumber": function BigNumberBigNumber(start, end) {
      var BigNumber2 = start.constructor;
      return _out(_range(start, end, new BigNumber2(1), false));
    },
    "BigNumber, BigNumber, BigNumber": function BigNumberBigNumberBigNumber(start, end, step) {
      return _out(_range(start, end, step, false));
    },
    "BigNumber, BigNumber, boolean": function BigNumberBigNumberBoolean(start, end, includeEnd) {
      var BigNumber2 = start.constructor;
      return _out(_range(start, end, new BigNumber2(1), includeEnd));
    },
    "BigNumber, BigNumber, BigNumber, boolean": function BigNumberBigNumberBigNumberBoolean(start, end, step, includeEnd) {
      return _out(_range(start, end, step, includeEnd));
    },
    "Unit, Unit, Unit": function UnitUnitUnit(start, end, step) {
      return _out(_range(start, end, step, false));
    },
    "Unit, Unit, Unit, boolean": function UnitUnitUnitBoolean(start, end, step, includeEnd) {
      return _out(_range(start, end, step, includeEnd));
    }
  });
  function _out(arr) {
    if (config3.matrix === "Matrix") {
      return matrix2 ? matrix2(arr) : noMatrix();
    }
    return arr;
  }
  function _strRange(str, includeEnd) {
    var r = _parse(str);
    if (!r) {
      throw new SyntaxError('String "' + str + '" is no valid range');
    }
    if (config3.number === "BigNumber") {
      if (bignumber2 === void 0) {
        noBignumber();
      }
      return _out(_range(bignumber2(r.start), bignumber2(r.end), bignumber2(r.step)));
    } else {
      return _out(_range(r.start, r.end, r.step, includeEnd));
    }
  }
  function _range(start, end, step, includeEnd) {
    var array = [];
    var ongoing = isPositive2(step) ? includeEnd ? smallerEq2 : smaller2 : includeEnd ? largerEq2 : larger2;
    var x = start;
    while (ongoing(x, end)) {
      array.push(x);
      x = add2(x, step);
    }
    return array;
  }
  function _parse(str) {
    var args = str.split(":");
    var nums = args.map(function(arg2) {
      return Number(arg2);
    });
    var invalid = nums.some(function(num) {
      return isNaN(num);
    });
    if (invalid) {
      return null;
    }
    switch (nums.length) {
      case 2:
        return {
          start: nums[0],
          end: nums[1],
          step: 1
        };
      case 3:
        return {
          start: nums[0],
          end: nums[2],
          step: nums[1]
        };
      default:
        return null;
    }
  }
});
var name$2r = "reshape";
var dependencies$2r = ["typed", "isInteger", "matrix"];
var createReshape = /* @__PURE__ */ factory(name$2r, dependencies$2r, (_ref) => {
  var {
    typed: typed2,
    isInteger: isInteger2
  } = _ref;
  return typed2(name$2r, {
    "Matrix, Array": function MatrixArray(x, sizes) {
      return x.reshape(sizes, true);
    },
    "Array, Array": function ArrayArray(x, sizes) {
      sizes.forEach(function(size2) {
        if (!isInteger2(size2)) {
          throw new TypeError("Invalid size for dimension: " + size2);
        }
      });
      return reshape$1(x, sizes);
    }
  });
});
var name$2q = "resize";
var dependencies$2q = ["config", "matrix"];
var createResize = /* @__PURE__ */ factory(name$2q, dependencies$2q, (_ref) => {
  var {
    config: config3,
    matrix: matrix2
  } = _ref;
  return function resize2(x, size2, defaultValue) {
    if (arguments.length !== 2 && arguments.length !== 3) {
      throw new ArgumentsError("resize", arguments.length, 2, 3);
    }
    if (isMatrix(size2)) {
      size2 = size2.valueOf();
    }
    if (isBigNumber(size2[0])) {
      size2 = size2.map(function(value) {
        return !isBigNumber(value) ? value : value.toNumber();
      });
    }
    if (isMatrix(x)) {
      return x.resize(size2, defaultValue, true);
    }
    if (typeof x === "string") {
      return _resizeString(x, size2, defaultValue);
    }
    var asMatrix = Array.isArray(x) ? false : config3.matrix !== "Array";
    if (size2.length === 0) {
      while (Array.isArray(x)) {
        x = x[0];
      }
      return clone$3(x);
    } else {
      if (!Array.isArray(x)) {
        x = [x];
      }
      x = clone$3(x);
      var res = resize$1(x, size2, defaultValue);
      return asMatrix ? matrix2(res) : res;
    }
  };
  function _resizeString(str, size2, defaultChar) {
    if (defaultChar !== void 0) {
      if (typeof defaultChar !== "string" || defaultChar.length !== 1) {
        throw new TypeError("Single character expected as defaultValue");
      }
    } else {
      defaultChar = " ";
    }
    if (size2.length !== 1) {
      throw new DimensionError(size2.length, 1);
    }
    var len = size2[0];
    if (typeof len !== "number" || !isInteger$1(len)) {
      throw new TypeError("Invalid size, must contain positive integers (size: " + format$1(size2) + ")");
    }
    if (str.length > len) {
      return str.substring(0, len);
    } else if (str.length < len) {
      var res = str;
      for (var i2 = 0, ii = len - str.length; i2 < ii; i2++) {
        res += defaultChar;
      }
      return res;
    } else {
      return str;
    }
  }
});
var name$2p = "rotate";
var dependencies$2p = ["typed", "multiply", "rotationMatrix"];
var createRotate = /* @__PURE__ */ factory(name$2p, dependencies$2p, (_ref) => {
  var {
    typed: typed2,
    multiply: multiply2,
    rotationMatrix: rotationMatrix2
  } = _ref;
  return typed2(name$2p, {
    "Array , number | BigNumber | Complex | Unit": function ArrayNumberBigNumberComplexUnit(w, theta) {
      _validateSize(w, 2);
      var matrixRes = multiply2(rotationMatrix2(theta), w);
      return matrixRes.toArray();
    },
    "Matrix , number | BigNumber | Complex | Unit": function MatrixNumberBigNumberComplexUnit(w, theta) {
      _validateSize(w, 2);
      return multiply2(rotationMatrix2(theta), w);
    },
    "Array, number | BigNumber | Complex | Unit, Array | Matrix": function ArrayNumberBigNumberComplexUnitArrayMatrix(w, theta, v) {
      _validateSize(w, 3);
      var matrixRes = multiply2(rotationMatrix2(theta, v), w);
      return matrixRes;
    },
    "Matrix, number | BigNumber | Complex | Unit, Array | Matrix": function MatrixNumberBigNumberComplexUnitArrayMatrix(w, theta, v) {
      _validateSize(w, 3);
      return multiply2(rotationMatrix2(theta, v), w);
    }
  });
  function _validateSize(v, expectedSize) {
    var actualSize = Array.isArray(v) ? arraySize(v) : v.size();
    if (actualSize.length > 2) {
      throw new RangeError("Vector must be of dimensions 1x".concat(expectedSize));
    }
    if (actualSize.length === 2 && actualSize[1] !== 1) {
      throw new RangeError("Vector must be of dimensions 1x".concat(expectedSize));
    }
    if (actualSize[0] !== expectedSize) {
      throw new RangeError("Vector must be of dimensions 1x".concat(expectedSize));
    }
  }
});
var name$2o = "rotationMatrix";
var dependencies$2o = ["typed", "config", "multiplyScalar", "addScalar", "unaryMinus", "norm", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix", "cos", "sin"];
var createRotationMatrix = /* @__PURE__ */ factory(name$2o, dependencies$2o, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    multiplyScalar: multiplyScalar2,
    addScalar: addScalar2,
    unaryMinus: unaryMinus2,
    norm: norm2,
    BigNumber: BigNumber2,
    matrix: matrix2,
    DenseMatrix: DenseMatrix2,
    SparseMatrix: SparseMatrix2,
    cos: cos2,
    sin: sin2
  } = _ref;
  return typed2(name$2o, {
    "": function _() {
      return config3.matrix === "Matrix" ? matrix2([]) : [];
    },
    string: function string2(format2) {
      return matrix2(format2);
    },
    "number | BigNumber | Complex | Unit": function numberBigNumberComplexUnit(theta) {
      return _rotationMatrix2x2(theta, config3.matrix === "Matrix" ? "dense" : void 0);
    },
    "number | BigNumber | Complex | Unit, string": function numberBigNumberComplexUnitString(theta, format2) {
      return _rotationMatrix2x2(theta, format2);
    },
    "number | BigNumber | Complex | Unit, Array": function numberBigNumberComplexUnitArray(theta, v) {
      var matrixV = matrix2(v);
      _validateVector(matrixV);
      return _rotationMatrix3x3(theta, matrixV, void 0);
    },
    "number | BigNumber | Complex | Unit, Matrix": function numberBigNumberComplexUnitMatrix(theta, v) {
      _validateVector(v);
      var storageType = v.storage() || (config3.matrix === "Matrix" ? "dense" : void 0);
      return _rotationMatrix3x3(theta, v, storageType);
    },
    "number | BigNumber | Complex | Unit, Array, string": function numberBigNumberComplexUnitArrayString(theta, v, format2) {
      var matrixV = matrix2(v);
      _validateVector(matrixV);
      return _rotationMatrix3x3(theta, matrixV, format2);
    },
    "number | BigNumber | Complex | Unit, Matrix, string": function numberBigNumberComplexUnitMatrixString(theta, v, format2) {
      _validateVector(v);
      return _rotationMatrix3x3(theta, v, format2);
    }
  });
  function _rotationMatrix2x2(theta, format2) {
    var Big = isBigNumber(theta);
    var minusOne = Big ? new BigNumber2(-1) : -1;
    var cosTheta = cos2(theta);
    var sinTheta = sin2(theta);
    var data = [[cosTheta, multiplyScalar2(minusOne, sinTheta)], [sinTheta, cosTheta]];
    return _convertToFormat(data, format2);
  }
  function _validateVector(v) {
    var size2 = v.size();
    if (size2.length < 1 || size2[0] !== 3) {
      throw new RangeError("Vector must be of dimensions 1x3");
    }
  }
  function _mul(array) {
    return array.reduce((p, curr) => multiplyScalar2(p, curr));
  }
  function _convertToFormat(data, format2) {
    if (format2) {
      if (format2 === "sparse") {
        return new SparseMatrix2(data);
      }
      if (format2 === "dense") {
        return new DenseMatrix2(data);
      }
      throw new TypeError('Unknown matrix type "'.concat(format2, '"'));
    }
    return data;
  }
  function _rotationMatrix3x3(theta, v, format2) {
    var normV = norm2(v);
    if (normV === 0) {
      throw new RangeError("Rotation around zero vector");
    }
    var Big = isBigNumber(theta) ? BigNumber2 : null;
    var one = Big ? new Big(1) : 1;
    var minusOne = Big ? new Big(-1) : -1;
    var vx = Big ? new Big(v.get([0]) / normV) : v.get([0]) / normV;
    var vy = Big ? new Big(v.get([1]) / normV) : v.get([1]) / normV;
    var vz = Big ? new Big(v.get([2]) / normV) : v.get([2]) / normV;
    var c = cos2(theta);
    var oneMinusC = addScalar2(one, unaryMinus2(c));
    var s = sin2(theta);
    var r11 = addScalar2(c, _mul([vx, vx, oneMinusC]));
    var r12 = addScalar2(_mul([vx, vy, oneMinusC]), _mul([minusOne, vz, s]));
    var r13 = addScalar2(_mul([vx, vz, oneMinusC]), _mul([vy, s]));
    var r21 = addScalar2(_mul([vx, vy, oneMinusC]), _mul([vz, s]));
    var r22 = addScalar2(c, _mul([vy, vy, oneMinusC]));
    var r23 = addScalar2(_mul([vy, vz, oneMinusC]), _mul([minusOne, vx, s]));
    var r31 = addScalar2(_mul([vx, vz, oneMinusC]), _mul([minusOne, vy, s]));
    var r32 = addScalar2(_mul([vy, vz, oneMinusC]), _mul([vx, s]));
    var r33 = addScalar2(c, _mul([vz, vz, oneMinusC]));
    var data = [[r11, r12, r13], [r21, r22, r23], [r31, r32, r33]];
    return _convertToFormat(data, format2);
  }
});
var name$2n = "row";
var dependencies$2n = ["typed", "Index", "matrix", "range"];
var createRow = /* @__PURE__ */ factory(name$2n, dependencies$2n, (_ref) => {
  var {
    typed: typed2,
    Index: Index2,
    matrix: matrix2,
    range: range2
  } = _ref;
  return typed2(name$2n, {
    "Matrix, number": _row,
    "Array, number": function ArrayNumber(value, row2) {
      return _row(matrix2(clone$3(value)), row2).valueOf();
    }
  });
  function _row(value, row2) {
    if (value.size().length !== 2) {
      throw new Error("Only two dimensional matrix is supported");
    }
    validateIndex(row2, value.size()[0]);
    var columnRange = range2(0, value.size()[1]);
    var index2 = new Index2(row2, columnRange);
    var result = value.subset(index2);
    return isMatrix(result) ? result : matrix2([[result]]);
  }
});
var name$2m = "size";
var dependencies$2m = ["typed", "config", "?matrix"];
var createSize = /* @__PURE__ */ factory(name$2m, dependencies$2m, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    matrix: matrix2
  } = _ref;
  return typed2(name$2m, {
    Matrix: function Matrix2(x) {
      return x.create(x.size());
    },
    Array: arraySize,
    string: function string2(x) {
      return config3.matrix === "Array" ? [x.length] : matrix2([x.length]);
    },
    "number | Complex | BigNumber | Unit | boolean | null": function numberComplexBigNumberUnitBooleanNull(x) {
      return config3.matrix === "Array" ? [] : matrix2 ? matrix2([]) : noMatrix();
    }
  });
});
var name$2l = "squeeze";
var dependencies$2l = ["typed", "matrix"];
var createSqueeze = /* @__PURE__ */ factory(name$2l, dependencies$2l, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2
  } = _ref;
  return typed2(name$2l, {
    Array: function Array2(x) {
      return squeeze$1(clone$3(x));
    },
    Matrix: function Matrix2(x) {
      var res = squeeze$1(x.toArray());
      return Array.isArray(res) ? matrix2(res) : res;
    },
    any: function any(x) {
      return clone$3(x);
    }
  });
});
var name$2k = "subset";
var dependencies$2k = ["typed", "matrix", "zeros", "add"];
var createSubset = /* @__PURE__ */ factory(name$2k, dependencies$2k, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    zeros: zeros2,
    add: add2
  } = _ref;
  return typed2(name$2k, {
    // get subset
    "Matrix, Index": function MatrixIndex(value, index2) {
      if (isEmptyIndex(index2)) {
        return matrix2();
      }
      validateIndexSourceSize(value, index2);
      return value.subset(index2);
    },
    "Array, Index": typed2.referTo("Matrix, Index", function(subsetRef) {
      return function(value, index2) {
        var subsetResult = subsetRef(matrix2(value), index2);
        return index2.isScalar() ? subsetResult : subsetResult.valueOf();
      };
    }),
    "Object, Index": _getObjectProperty,
    "string, Index": _getSubstring,
    // set subset
    "Matrix, Index, any, any": function MatrixIndexAnyAny(value, index2, replacement, defaultValue) {
      if (isEmptyIndex(index2)) {
        return value;
      }
      validateIndexSourceSize(value, index2);
      return value.clone().subset(index2, _broadcastReplacement(replacement, index2), defaultValue);
    },
    "Array, Index, any, any": typed2.referTo("Matrix, Index, any, any", function(subsetRef) {
      return function(value, index2, replacement, defaultValue) {
        var subsetResult = subsetRef(matrix2(value), index2, replacement, defaultValue);
        return subsetResult.isMatrix ? subsetResult.valueOf() : subsetResult;
      };
    }),
    "Array, Index, any": typed2.referTo("Matrix, Index, any, any", function(subsetRef) {
      return function(value, index2, replacement) {
        return subsetRef(matrix2(value), index2, replacement, void 0).valueOf();
      };
    }),
    "Matrix, Index, any": typed2.referTo("Matrix, Index, any, any", function(subsetRef) {
      return function(value, index2, replacement) {
        return subsetRef(value, index2, replacement, void 0);
      };
    }),
    "string, Index, string": _setSubstring,
    "string, Index, string, string": _setSubstring,
    "Object, Index, any": _setObjectProperty
  });
  function _broadcastReplacement(replacement, index2) {
    if (typeof replacement === "string") {
      throw new Error("can't boradcast a string");
    }
    if (index2._isScalar) {
      return replacement;
    }
    var indexSize = index2.size();
    if (indexSize.every((d) => d > 0)) {
      try {
        return add2(replacement, zeros2(indexSize));
      } catch (error) {
        return replacement;
      }
    } else {
      return replacement;
    }
  }
});
function _getSubstring(str, index2) {
  if (!isIndex(index2)) {
    throw new TypeError("Index expected");
  }
  if (isEmptyIndex(index2)) {
    return "";
  }
  validateIndexSourceSize(Array.from(str), index2);
  if (index2.size().length !== 1) {
    throw new DimensionError(index2.size().length, 1);
  }
  var strLen = str.length;
  validateIndex(index2.min()[0], strLen);
  validateIndex(index2.max()[0], strLen);
  var range2 = index2.dimension(0);
  var substr = "";
  range2.forEach(function(v) {
    substr += str.charAt(v);
  });
  return substr;
}
function _setSubstring(str, index2, replacement, defaultValue) {
  if (!index2 || index2.isIndex !== true) {
    throw new TypeError("Index expected");
  }
  if (isEmptyIndex(index2)) {
    return str;
  }
  validateIndexSourceSize(Array.from(str), index2);
  if (index2.size().length !== 1) {
    throw new DimensionError(index2.size().length, 1);
  }
  if (defaultValue !== void 0) {
    if (typeof defaultValue !== "string" || defaultValue.length !== 1) {
      throw new TypeError("Single character expected as defaultValue");
    }
  } else {
    defaultValue = " ";
  }
  var range2 = index2.dimension(0);
  var len = range2.size()[0];
  if (len !== replacement.length) {
    throw new DimensionError(range2.size()[0], replacement.length);
  }
  var strLen = str.length;
  validateIndex(index2.min()[0]);
  validateIndex(index2.max()[0]);
  var chars = [];
  for (var i2 = 0; i2 < strLen; i2++) {
    chars[i2] = str.charAt(i2);
  }
  range2.forEach(function(v, i3) {
    chars[v] = replacement.charAt(i3[0]);
  });
  if (chars.length > strLen) {
    for (var _i = strLen - 1, _len = chars.length; _i < _len; _i++) {
      if (!chars[_i]) {
        chars[_i] = defaultValue;
      }
    }
  }
  return chars.join("");
}
function _getObjectProperty(object, index2) {
  if (isEmptyIndex(index2)) {
    return void 0;
  }
  if (index2.size().length !== 1) {
    throw new DimensionError(index2.size(), 1);
  }
  var key = index2.dimension(0);
  if (typeof key !== "string") {
    throw new TypeError("String expected as index to retrieve an object property");
  }
  return getSafeProperty(object, key);
}
function _setObjectProperty(object, index2, replacement) {
  if (isEmptyIndex(index2)) {
    return object;
  }
  if (index2.size().length !== 1) {
    throw new DimensionError(index2.size(), 1);
  }
  var key = index2.dimension(0);
  if (typeof key !== "string") {
    throw new TypeError("String expected as index to retrieve an object property");
  }
  var updated = clone$3(object);
  setSafeProperty(updated, key, replacement);
  return updated;
}
var name$2j = "transpose";
var dependencies$2j = ["typed", "matrix"];
var createTranspose = /* @__PURE__ */ factory(name$2j, dependencies$2j, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2
  } = _ref;
  return typed2(name$2j, {
    Array: (x) => transposeMatrix(matrix2(x)).valueOf(),
    Matrix: transposeMatrix,
    any: clone$3
    // scalars
  });
  function transposeMatrix(x) {
    var size2 = x.size();
    var c;
    switch (size2.length) {
      case 1:
        c = x.clone();
        break;
      case 2:
        {
          var rows = size2[0];
          var columns = size2[1];
          if (columns === 0) {
            throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + format$1(size2) + ")");
          }
          switch (x.storage()) {
            case "dense":
              c = _denseTranspose(x, rows, columns);
              break;
            case "sparse":
              c = _sparseTranspose(x, rows, columns);
              break;
          }
        }
        break;
      default:
        throw new RangeError("Matrix must be a vector or two dimensional (size: " + format$1(size2) + ")");
    }
    return c;
  }
  function _denseTranspose(m, rows, columns) {
    var data = m._data;
    var transposed = [];
    var transposedRow;
    for (var j = 0; j < columns; j++) {
      transposedRow = transposed[j] = [];
      for (var i2 = 0; i2 < rows; i2++) {
        transposedRow[i2] = clone$3(data[i2][j]);
      }
    }
    return m.createDenseMatrix({
      data: transposed,
      size: [columns, rows],
      datatype: m._datatype
    });
  }
  function _sparseTranspose(m, rows, columns) {
    var values = m._values;
    var index2 = m._index;
    var ptr = m._ptr;
    var cvalues = values ? [] : void 0;
    var cindex = [];
    var cptr = [];
    var w = [];
    for (var x = 0; x < rows; x++) {
      w[x] = 0;
    }
    var p, l, j;
    for (p = 0, l = index2.length; p < l; p++) {
      w[index2[p]]++;
    }
    var sum2 = 0;
    for (var i2 = 0; i2 < rows; i2++) {
      cptr.push(sum2);
      sum2 += w[i2];
      w[i2] = cptr[i2];
    }
    cptr.push(sum2);
    for (j = 0; j < columns; j++) {
      for (var k0 = ptr[j], k1 = ptr[j + 1], k = k0; k < k1; k++) {
        var q = w[index2[k]]++;
        cindex[q] = j;
        if (values) {
          cvalues[q] = clone$3(values[k]);
        }
      }
    }
    return m.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [columns, rows],
      datatype: m._datatype
    });
  }
});
var name$2i = "ctranspose";
var dependencies$2i = ["typed", "transpose", "conj"];
var createCtranspose = /* @__PURE__ */ factory(name$2i, dependencies$2i, (_ref) => {
  var {
    typed: typed2,
    transpose: transpose2,
    conj: conj2
  } = _ref;
  return typed2(name$2i, {
    any: function any(x) {
      return conj2(transpose2(x));
    }
  });
});
var name$2h = "zeros";
var dependencies$2h = ["typed", "config", "matrix", "BigNumber"];
var createZeros = /* @__PURE__ */ factory(name$2h, dependencies$2h, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    matrix: matrix2,
    BigNumber: BigNumber2
  } = _ref;
  return typed2(name$2h, {
    "": function _() {
      return config3.matrix === "Array" ? _zeros([]) : _zeros([], "default");
    },
    // math.zeros(m, n, p, ..., format)
    // TODO: more accurate signature '...number | BigNumber, string' as soon as typed-function supports this
    "...number | BigNumber | string": function numberBigNumberString(size2) {
      var last = size2[size2.length - 1];
      if (typeof last === "string") {
        var format2 = size2.pop();
        return _zeros(size2, format2);
      } else if (config3.matrix === "Array") {
        return _zeros(size2);
      } else {
        return _zeros(size2, "default");
      }
    },
    Array: _zeros,
    Matrix: function Matrix2(size2) {
      var format2 = size2.storage();
      return _zeros(size2.valueOf(), format2);
    },
    "Array | Matrix, string": function ArrayMatrixString(size2, format2) {
      return _zeros(size2.valueOf(), format2);
    }
  });
  function _zeros(size2, format2) {
    var hasBigNumbers = _normalize(size2);
    var defaultValue = hasBigNumbers ? new BigNumber2(0) : 0;
    _validate2(size2);
    if (format2) {
      var m = matrix2(format2);
      if (size2.length > 0) {
        return m.resize(size2, defaultValue);
      }
      return m;
    } else {
      var arr = [];
      if (size2.length > 0) {
        return resize$1(arr, size2, defaultValue);
      }
      return arr;
    }
  }
  function _normalize(size2) {
    var hasBigNumbers = false;
    size2.forEach(function(value, index2, arr) {
      if (isBigNumber(value)) {
        hasBigNumbers = true;
        arr[index2] = value.toNumber();
      }
    });
    return hasBigNumbers;
  }
  function _validate2(size2) {
    size2.forEach(function(value) {
      if (typeof value !== "number" || !isInteger$1(value) || value < 0) {
        throw new Error("Parameters in function zeros must be positive integers");
      }
    });
  }
});
var name$2g = "fft";
var dependencies$2g = ["typed", "matrix", "addScalar", "multiplyScalar", "divideScalar", "exp", "tau", "i", "dotDivide", "conj", "pow", "ceil", "log2"];
var createFft = /* @__PURE__ */ factory(name$2g, dependencies$2g, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    addScalar: addScalar2,
    multiplyScalar: multiplyScalar2,
    divideScalar: divideScalar2,
    exp: exp2,
    tau: tau2,
    i: I,
    dotDivide: dotDivide2,
    conj: conj2,
    pow: pow2,
    ceil: ceil2,
    log2: log23
  } = _ref;
  return typed2(name$2g, {
    Array: _ndFft,
    Matrix: function Matrix2(matrix3) {
      return matrix3.create(_ndFft(matrix3.toArray()));
    }
  });
  function _ndFft(arr) {
    var size2 = arraySize(arr);
    if (size2.length === 1)
      return _fft(arr, size2[0]);
    return _1dFft(arr.map((slice) => _ndFft(slice, size2.slice(1))), 0);
  }
  function _1dFft(arr, dim) {
    var size2 = arraySize(arr);
    if (dim !== 0)
      return new Array(size2[0]).fill(0).map((_, i2) => _1dFft(arr[i2], dim - 1));
    if (size2.length === 1)
      return _fft(arr);
    function _transpose(arr2) {
      var size3 = arraySize(arr2);
      return new Array(size3[1]).fill(0).map((_, j) => new Array(size3[0]).fill(0).map((_2, i2) => arr2[i2][j]));
    }
    return _transpose(_1dFft(_transpose(arr), 1));
  }
  function _czt(arr) {
    var n = arr.length;
    var w = exp2(divideScalar2(multiplyScalar2(-1, multiplyScalar2(I, tau2)), n));
    var chirp = [];
    for (var i2 = 1 - n; i2 < n; i2++) {
      chirp.push(pow2(w, divideScalar2(pow2(i2, 2), 2)));
    }
    var N2 = pow2(2, ceil2(log23(n + n - 1)));
    var xp = [...new Array(n).fill(0).map((_, i3) => multiplyScalar2(arr[i3], chirp[n - 1 + i3])), ...new Array(N2 - n).fill(0)];
    var ichirp = [...new Array(n + n - 1).fill(0).map((_, i3) => divideScalar2(1, chirp[i3])), ...new Array(N2 - (n + n - 1)).fill(0)];
    var fftXp = _fft(xp);
    var fftIchirp = _fft(ichirp);
    var fftProduct = new Array(N2).fill(0).map((_, i3) => multiplyScalar2(fftXp[i3], fftIchirp[i3]));
    var ifftProduct = dotDivide2(conj2(_ndFft(conj2(fftProduct))), N2);
    var ret = [];
    for (var _i = n - 1; _i < n + n - 1; _i++) {
      ret.push(multiplyScalar2(ifftProduct[_i], chirp[_i]));
    }
    return ret;
  }
  function _fft(arr) {
    var len = arr.length;
    if (len === 1)
      return [arr[0]];
    if (len % 2 === 0) {
      var ret = [..._fft(arr.filter((_, i2) => i2 % 2 === 0)), ..._fft(arr.filter((_, i2) => i2 % 2 === 1))];
      for (var k = 0; k < len / 2; k++) {
        var p = ret[k];
        var q = multiplyScalar2(ret[k + len / 2], exp2(multiplyScalar2(multiplyScalar2(tau2, I), divideScalar2(-k, len))));
        ret[k] = addScalar2(p, q);
        ret[k + len / 2] = addScalar2(p, multiplyScalar2(-1, q));
      }
      return ret;
    } else {
      return _czt(arr);
    }
  }
});
var name$2f = "ifft";
var dependencies$2f = ["typed", "fft", "dotDivide", "conj"];
var createIfft = /* @__PURE__ */ factory(name$2f, dependencies$2f, (_ref) => {
  var {
    typed: typed2,
    fft: fft2,
    dotDivide: dotDivide2,
    conj: conj2
  } = _ref;
  return typed2(name$2f, {
    "Array | Matrix": function ArrayMatrix(arr) {
      var size2 = isMatrix(arr) ? arr.size() : arraySize(arr);
      return dotDivide2(conj2(fft2(conj2(arr))), size2.reduce((acc, curr) => acc * curr, 1));
    }
  });
});
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t)
    return t;
  var e2 = t[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i2 = e2.call(t, r || "default");
    if ("object" != _typeof(i2))
      return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function toPropertyKey(t) {
  var i2 = toPrimitive(t, "string");
  return "symbol" == _typeof(i2) ? i2 : i2 + "";
}
function _defineProperty(e2, r, t) {
  return (r = toPropertyKey(r)) in e2 ? Object.defineProperty(e2, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e2[r] = t, e2;
}
function ownKeys$1(e2, r) {
  var t = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e2);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e2, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e2) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty(e2, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e2, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e2;
}
var name$2e = "solveODE";
var dependencies$2e = ["typed", "add", "subtract", "multiply", "divide", "max", "map", "abs", "isPositive", "isNegative", "larger", "smaller", "matrix", "bignumber", "unaryMinus"];
var createSolveODE = /* @__PURE__ */ factory(name$2e, dependencies$2e, (_ref) => {
  var {
    typed: typed2,
    add: add2,
    subtract: subtract2,
    multiply: multiply2,
    divide: divide2,
    max: max2,
    map: map2,
    abs: abs2,
    isPositive: isPositive2,
    isNegative: isNegative2,
    larger: larger2,
    smaller: smaller2,
    matrix: matrix2,
    bignumber: bignumber2,
    unaryMinus: unaryMinus2
  } = _ref;
  function _rk(butcherTableau) {
    return function(f, tspan, y0, options) {
      var wrongTSpan = !(tspan.length === 2 && (tspan.every(isNumOrBig) || tspan.every(isUnit)));
      if (wrongTSpan) {
        throw new Error('"tspan" must be an Array of two numeric values or two units [tStart, tEnd]');
      }
      var t0 = tspan[0];
      var tf = tspan[1];
      var isForwards = larger2(tf, t0);
      var firstStep = options.firstStep;
      if (firstStep !== void 0 && !isPositive2(firstStep)) {
        throw new Error('"firstStep" must be positive');
      }
      var maxStep = options.maxStep;
      if (maxStep !== void 0 && !isPositive2(maxStep)) {
        throw new Error('"maxStep" must be positive');
      }
      var minStep = options.minStep;
      if (minStep && isNegative2(minStep)) {
        throw new Error('"minStep" must be positive or zero');
      }
      var timeVars = [t0, tf, firstStep, minStep, maxStep].filter((x) => x !== void 0);
      if (!(timeVars.every(isNumOrBig) || timeVars.every(isUnit))) {
        throw new Error('Inconsistent type of "t" dependant variables');
      }
      var steps = 1;
      var tol = options.tol ? options.tol : 1e-4;
      var minDelta = options.minDelta ? options.minDelta : 0.2;
      var maxDelta = options.maxDelta ? options.maxDelta : 5;
      var maxIter = options.maxIter ? options.maxIter : 1e4;
      var hasBigNumbers = [t0, tf, ...y0, maxStep, minStep].some(isBigNumber);
      var [a, c, b, bp] = hasBigNumbers ? [bignumber2(butcherTableau.a), bignumber2(butcherTableau.c), bignumber2(butcherTableau.b), bignumber2(butcherTableau.bp)] : [butcherTableau.a, butcherTableau.c, butcherTableau.b, butcherTableau.bp];
      var h = firstStep ? isForwards ? firstStep : unaryMinus2(firstStep) : divide2(subtract2(tf, t0), steps);
      var t = [t0];
      var y = [y0];
      var deltaB = subtract2(b, bp);
      var n = 0;
      var iter = 0;
      var ongoing = _createOngoing(isForwards);
      var trimStep = _createTrimStep(isForwards);
      while (ongoing(t[n], tf)) {
        var k = [];
        h = trimStep(t[n], tf, h);
        k.push(f(t[n], y[n]));
        for (var i2 = 1; i2 < c.length; ++i2) {
          k.push(f(add2(t[n], multiply2(c[i2], h)), add2(y[n], multiply2(h, a[i2], k))));
        }
        var TE = max2(abs2(map2(multiply2(deltaB, k), (X) => isUnit(X) ? X.value : X)));
        if (TE < tol && tol / TE > 1 / 4) {
          t.push(add2(t[n], h));
          y.push(add2(y[n], multiply2(h, b, k)));
          n++;
        }
        var delta = 0.84 * (tol / TE) ** (1 / 5);
        if (smaller2(delta, minDelta)) {
          delta = minDelta;
        } else if (larger2(delta, maxDelta)) {
          delta = maxDelta;
        }
        delta = hasBigNumbers ? bignumber2(delta) : delta;
        h = multiply2(h, delta);
        if (maxStep && larger2(abs2(h), maxStep)) {
          h = isForwards ? maxStep : unaryMinus2(maxStep);
        } else if (minStep && smaller2(abs2(h), minStep)) {
          h = isForwards ? minStep : unaryMinus2(minStep);
        }
        iter++;
        if (iter > maxIter) {
          throw new Error("Maximum number of iterations reached, try changing options");
        }
      }
      return {
        t,
        y
      };
    };
  }
  function _rk23(f, tspan, y0, options) {
    var a = [[], [1 / 2], [0, 3 / 4], [2 / 9, 1 / 3, 4 / 9]];
    var c = [null, 1 / 2, 3 / 4, 1];
    var b = [2 / 9, 1 / 3, 4 / 9, 0];
    var bp = [7 / 24, 1 / 4, 1 / 3, 1 / 8];
    var butcherTableau = {
      a,
      c,
      b,
      bp
    };
    return _rk(butcherTableau)(f, tspan, y0, options);
  }
  function _rk45(f, tspan, y0, options) {
    var a = [[], [1 / 5], [3 / 40, 9 / 40], [44 / 45, -56 / 15, 32 / 9], [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729], [9017 / 3168, -355 / 33, 46732 / 5247, 49 / 176, -5103 / 18656], [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84]];
    var c = [null, 1 / 5, 3 / 10, 4 / 5, 8 / 9, 1, 1];
    var b = [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84, 0];
    var bp = [5179 / 57600, 0, 7571 / 16695, 393 / 640, -92097 / 339200, 187 / 2100, 1 / 40];
    var butcherTableau = {
      a,
      c,
      b,
      bp
    };
    return _rk(butcherTableau)(f, tspan, y0, options);
  }
  function _solveODE(f, tspan, y0, opt) {
    var method = opt.method ? opt.method : "RK45";
    var methods = {
      RK23: _rk23,
      RK45: _rk45
    };
    if (method.toUpperCase() in methods) {
      var methodOptions = _objectSpread$1({}, opt);
      delete methodOptions.method;
      return methods[method.toUpperCase()](f, tspan, y0, methodOptions);
    } else {
      var methodsWithQuotes = Object.keys(methods).map((x) => '"'.concat(x, '"'));
      var availableMethodsString = "".concat(methodsWithQuotes.slice(0, -1).join(", "), " and ").concat(methodsWithQuotes.slice(-1));
      throw new Error('Unavailable method "'.concat(method, '". Available methods are ').concat(availableMethodsString));
    }
  }
  function _createOngoing(isForwards) {
    return isForwards ? smaller2 : larger2;
  }
  function _createTrimStep(isForwards) {
    var outOfBounds = isForwards ? larger2 : smaller2;
    return function(t, tf, h) {
      var next = add2(t, h);
      return outOfBounds(next, tf) ? subtract2(tf, t) : h;
    };
  }
  function isNumOrBig(x) {
    return isBigNumber(x) || isNumber(x);
  }
  function _matrixSolveODE(f, T, y0, options) {
    var sol = _solveODE(f, T.toArray(), y0.toArray(), options);
    return {
      t: matrix2(sol.t),
      y: matrix2(sol.y)
    };
  }
  return typed2("solveODE", {
    "function, Array, Array, Object": _solveODE,
    "function, Matrix, Matrix, Object": _matrixSolveODE,
    "function, Array, Array": (f, T, y0) => _solveODE(f, T, y0, {}),
    "function, Matrix, Matrix": (f, T, y0) => _matrixSolveODE(f, T, y0, {}),
    "function, Array, number | BigNumber | Unit": (f, T, y0) => {
      var sol = _solveODE(f, T, [y0], {});
      return {
        t: sol.t,
        y: sol.y.map((Y) => Y[0])
      };
    },
    "function, Matrix, number | BigNumber | Unit": (f, T, y0) => {
      var sol = _solveODE(f, T.toArray(), [y0], {});
      return {
        t: matrix2(sol.t),
        y: matrix2(sol.y.map((Y) => Y[0]))
      };
    },
    "function, Array, number | BigNumber | Unit, Object": (f, T, y0, options) => {
      var sol = _solveODE(f, T, [y0], options);
      return {
        t: sol.t,
        y: sol.y.map((Y) => Y[0])
      };
    },
    "function, Matrix, number | BigNumber | Unit, Object": (f, T, y0, options) => {
      var sol = _solveODE(f, T.toArray(), [y0], options);
      return {
        t: matrix2(sol.t),
        y: matrix2(sol.y.map((Y) => Y[0]))
      };
    }
  });
});
var name$2d = "erf";
var dependencies$2d = ["typed"];
var createErf = /* @__PURE__ */ factory(name$2d, dependencies$2d, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2("name", {
    number: function number2(x) {
      var y = Math.abs(x);
      if (y >= MAX_NUM) {
        return sign$2(x);
      }
      if (y <= THRESH) {
        return sign$2(x) * erf1(y);
      }
      if (y <= 4) {
        return sign$2(x) * (1 - erfc2(y));
      }
      return sign$2(x) * (1 - erfc3(y));
    },
    "Array | Matrix": typed2.referToSelf((self2) => (n) => deepMap(n, self2))
    // TODO: For complex numbers, use the approximation for the Faddeeva function
    //  from "More Efficient Computation of the Complex Error Function" (AMS)
  });
  function erf1(y) {
    var ysq = y * y;
    var xnum = P[0][4] * ysq;
    var xden = ysq;
    var i2;
    for (i2 = 0; i2 < 3; i2 += 1) {
      xnum = (xnum + P[0][i2]) * ysq;
      xden = (xden + Q[0][i2]) * ysq;
    }
    return y * (xnum + P[0][3]) / (xden + Q[0][3]);
  }
  function erfc2(y) {
    var xnum = P[1][8] * y;
    var xden = y;
    var i2;
    for (i2 = 0; i2 < 7; i2 += 1) {
      xnum = (xnum + P[1][i2]) * y;
      xden = (xden + Q[1][i2]) * y;
    }
    var result = (xnum + P[1][7]) / (xden + Q[1][7]);
    var ysq = parseInt(y * 16) / 16;
    var del = (y - ysq) * (y + ysq);
    return Math.exp(-ysq * ysq) * Math.exp(-del) * result;
  }
  function erfc3(y) {
    var ysq = 1 / (y * y);
    var xnum = P[2][5] * ysq;
    var xden = ysq;
    var i2;
    for (i2 = 0; i2 < 4; i2 += 1) {
      xnum = (xnum + P[2][i2]) * ysq;
      xden = (xden + Q[2][i2]) * ysq;
    }
    var result = ysq * (xnum + P[2][4]) / (xden + Q[2][4]);
    result = (SQRPI - result) / y;
    ysq = parseInt(y * 16) / 16;
    var del = (y - ysq) * (y + ysq);
    return Math.exp(-ysq * ysq) * Math.exp(-del) * result;
  }
});
var THRESH = 0.46875;
var SQRPI = 0.5641895835477563;
var P = [[3.1611237438705655, 113.86415415105016, 377.485237685302, 3209.3775891384694, 0.18577770618460315], [0.5641884969886701, 8.883149794388377, 66.11919063714163, 298.6351381974001, 881.952221241769, 1712.0476126340707, 2051.0783778260716, 1230.3393547979972, 21531153547440383e-24], [0.30532663496123236, 0.36034489994980445, 0.12578172611122926, 0.016083785148742275, 6587491615298378e-19, 0.016315387137302097]];
var Q = [[23.601290952344122, 244.02463793444417, 1282.6165260773723, 2844.236833439171], [15.744926110709835, 117.6939508913125, 537.1811018620099, 1621.3895745666903, 3290.7992357334597, 4362.619090143247, 3439.3676741437216, 1230.3393548037495], [2.568520192289822, 1.8729528499234604, 0.5279051029514285, 0.06051834131244132, 0.0023352049762686918]];
var MAX_NUM = Math.pow(2, 53);
var name$2c = "zeta";
var dependencies$2c = ["typed", "config", "multiply", "pow", "divide", "factorial", "equal", "smallerEq", "isNegative", "gamma", "sin", "subtract", "add", "?Complex", "?BigNumber", "pi"];
var createZeta = /* @__PURE__ */ factory(name$2c, dependencies$2c, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    multiply: multiply2,
    pow: pow2,
    divide: divide2,
    factorial: factorial2,
    equal: equal2,
    smallerEq: smallerEq2,
    isNegative: isNegative2,
    gamma: gamma2,
    sin: sin2,
    subtract: subtract2,
    add: add2,
    Complex: Complex2,
    BigNumber: _BigNumber,
    pi: pi2
  } = _ref;
  return typed2(name$2c, {
    number: (s) => zetaNumeric(s, (value) => value, () => 20),
    BigNumber: (s) => zetaNumeric(s, (value) => new _BigNumber(value), () => {
      return Math.abs(Math.log10(config3.epsilon));
    }),
    Complex: zetaComplex
  });
  function zetaNumeric(s, createValue, determineDigits) {
    if (equal2(s, 0)) {
      return createValue(-0.5);
    }
    if (equal2(s, 1)) {
      return createValue(NaN);
    }
    if (!isFinite(s)) {
      return isNegative2(s) ? createValue(NaN) : createValue(1);
    }
    return zeta2(s, createValue, determineDigits, (s2) => s2);
  }
  function zetaComplex(s) {
    if (s.re === 0 && s.im === 0) {
      return new Complex2(-0.5);
    }
    if (s.re === 1) {
      return new Complex2(NaN, NaN);
    }
    if (s.re === Infinity && s.im === 0) {
      return new Complex2(1);
    }
    if (s.im === Infinity || s.re === -Infinity) {
      return new Complex2(NaN, NaN);
    }
    return zeta2(s, (value) => value, (s2) => Math.round(1.3 * 15 + 0.9 * Math.abs(s2.im)), (s2) => s2.re);
  }
  function zeta2(s, createValue, determineDigits, getRe) {
    var n = determineDigits(s);
    if (getRe(s) > -(n - 1) / 2) {
      return f(s, createValue(n), createValue);
    } else {
      var c = multiply2(pow2(2, s), pow2(createValue(pi2), subtract2(s, 1)));
      c = multiply2(c, sin2(multiply2(divide2(createValue(pi2), 2), s)));
      c = multiply2(c, gamma2(subtract2(1, s)));
      return multiply2(c, zeta2(subtract2(1, s), createValue, determineDigits, getRe));
    }
  }
  function d(k, n) {
    var S = k;
    for (var j = k; smallerEq2(j, n); j = add2(j, 1)) {
      var factor = divide2(multiply2(factorial2(add2(n, subtract2(j, 1))), pow2(4, j)), multiply2(factorial2(subtract2(n, j)), factorial2(multiply2(2, j))));
      S = add2(S, factor);
    }
    return multiply2(n, S);
  }
  function f(s, n, createValue) {
    var c = divide2(1, multiply2(d(createValue(0), n), subtract2(1, pow2(2, subtract2(1, s)))));
    var S = createValue(0);
    for (var k = createValue(1); smallerEq2(k, n); k = add2(k, 1)) {
      S = add2(S, divide2(multiply2((-1) ** (k - 1), d(k, n)), pow2(k, s)));
    }
    return multiply2(c, S);
  }
});
var name$2b = "mode";
var dependencies$2b = ["typed", "isNaN", "isNumeric"];
var createMode = /* @__PURE__ */ factory(name$2b, dependencies$2b, (_ref) => {
  var {
    typed: typed2,
    isNaN: isNaN2,
    isNumeric: isNumeric2
  } = _ref;
  return typed2(name$2b, {
    "Array | Matrix": _mode,
    "...": function _(args) {
      return _mode(args);
    }
  });
  function _mode(values) {
    values = flatten$1(values.valueOf());
    var num = values.length;
    if (num === 0) {
      throw new Error("Cannot calculate mode of an empty array");
    }
    var count2 = {};
    var mode2 = [];
    var max2 = 0;
    for (var i2 = 0; i2 < values.length; i2++) {
      var value = values[i2];
      if (isNumeric2(value) && isNaN2(value)) {
        throw new Error("Cannot calculate mode of an array containing NaN values");
      }
      if (!(value in count2)) {
        count2[value] = 0;
      }
      count2[value]++;
      if (count2[value] === max2) {
        mode2.push(value);
      } else if (count2[value] > max2) {
        max2 = count2[value];
        mode2 = [value];
      }
    }
    return mode2;
  }
});
function improveErrorMessage(err, fnName, value) {
  var details;
  if (String(err).includes("Unexpected type")) {
    details = arguments.length > 2 ? " (type: " + typeOf$1(value) + ", value: " + JSON.stringify(value) + ")" : " (type: " + err.data.actual + ")";
    return new TypeError("Cannot calculate " + fnName + ", unexpected type of argument" + details);
  }
  if (String(err).includes("complex numbers")) {
    details = arguments.length > 2 ? " (type: " + typeOf$1(value) + ", value: " + JSON.stringify(value) + ")" : "";
    return new TypeError("Cannot calculate " + fnName + ", no ordering relation is defined for complex numbers" + details);
  }
  return err;
}
var name$2a = "prod";
var dependencies$2a = ["typed", "config", "multiplyScalar", "numeric"];
var createProd = /* @__PURE__ */ factory(name$2a, dependencies$2a, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    multiplyScalar: multiplyScalar2,
    numeric: numeric2
  } = _ref;
  return typed2(name$2a, {
    // prod([a, b, c, d, ...])
    "Array | Matrix": _prod,
    // prod([a, b, c, d, ...], dim)
    "Array | Matrix, number | BigNumber": function ArrayMatrixNumberBigNumber(array, dim) {
      throw new Error("prod(A, dim) is not yet supported");
    },
    // prod(a, b, c, d, ...)
    "...": function _(args) {
      return _prod(args);
    }
  });
  function _prod(array) {
    var prod2;
    deepForEach(array, function(value) {
      try {
        prod2 = prod2 === void 0 ? value : multiplyScalar2(prod2, value);
      } catch (err) {
        throw improveErrorMessage(err, "prod", value);
      }
    });
    if (typeof prod2 === "string") {
      prod2 = numeric2(prod2, config3.number);
    }
    if (prod2 === void 0) {
      throw new Error("Cannot calculate prod of an empty array");
    }
    return prod2;
  }
});
var name$29 = "format";
var dependencies$29 = ["typed"];
var createFormat = /* @__PURE__ */ factory(name$29, dependencies$29, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$29, {
    any: format$1,
    "any, Object | function | number | BigNumber": format$1
  });
});
var name$28 = "bin";
var dependencies$28 = ["typed", "format"];
var createBin = factory(name$28, dependencies$28, (_ref) => {
  var {
    typed: typed2,
    format: format2
  } = _ref;
  return typed2(name$28, {
    "number | BigNumber": function numberBigNumber(n) {
      return format2(n, {
        notation: "bin"
      });
    },
    "number | BigNumber, number | BigNumber": function numberBigNumberNumberBigNumber(n, wordSize) {
      return format2(n, {
        notation: "bin",
        wordSize
      });
    }
  });
});
var name$27 = "oct";
var dependencies$27 = ["typed", "format"];
var createOct = factory(name$27, dependencies$27, (_ref) => {
  var {
    typed: typed2,
    format: format2
  } = _ref;
  return typed2(name$27, {
    "number | BigNumber": function numberBigNumber(n) {
      return format2(n, {
        notation: "oct"
      });
    },
    "number | BigNumber, number | BigNumber": function numberBigNumberNumberBigNumber(n, wordSize) {
      return format2(n, {
        notation: "oct",
        wordSize
      });
    }
  });
});
var name$26 = "hex";
var dependencies$26 = ["typed", "format"];
var createHex = factory(name$26, dependencies$26, (_ref) => {
  var {
    typed: typed2,
    format: format2
  } = _ref;
  return typed2(name$26, {
    "number | BigNumber": function numberBigNumber(n) {
      return format2(n, {
        notation: "hex"
      });
    },
    "number | BigNumber, number | BigNumber": function numberBigNumberNumberBigNumber(n, wordSize) {
      return format2(n, {
        notation: "hex",
        wordSize
      });
    }
  });
});
var printTemplate = /\$([\w.]+)/g;
var name$25 = "print";
var dependencies$25 = ["typed"];
var createPrint = /* @__PURE__ */ factory(name$25, dependencies$25, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$25, {
    // note: Matrix will be converted automatically to an Array
    "string, Object | Array": _print,
    "string, Object | Array, number | Object": _print
  });
});
function _print(template, values, options) {
  return template.replace(printTemplate, function(original, key) {
    var keys = key.split(".");
    var value = values[keys.shift()];
    if (value !== void 0 && value.isMatrix) {
      value = value.toArray();
    }
    while (keys.length && value !== void 0) {
      var k = keys.shift();
      value = k ? value[k] : value + ".";
    }
    if (value !== void 0) {
      if (!isString(value)) {
        return format$1(value, options);
      } else {
        return value;
      }
    }
    return original;
  });
}
var name$24 = "to";
var dependencies$24 = ["typed", "matrix", "concat"];
var createTo = /* @__PURE__ */ factory(name$24, dependencies$24, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  } = _ref;
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  return typed2(name$24, {
    "Unit, Unit | string": (x, unit2) => x.to(unit2)
  }, matrixAlgorithmSuite({
    Ds: true
  }));
});
var name$23 = "isPrime";
var dependencies$23 = ["typed"];
var createIsPrime = /* @__PURE__ */ factory(name$23, dependencies$23, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$23, {
    number: function number2(x) {
      if (x * 0 !== 0) {
        return false;
      }
      if (x <= 3) {
        return x > 1;
      }
      if (x % 2 === 0 || x % 3 === 0) {
        return false;
      }
      for (var i2 = 5; i2 * i2 <= x; i2 += 6) {
        if (x % i2 === 0 || x % (i2 + 2) === 0) {
          return false;
        }
      }
      return true;
    },
    BigNumber: function BigNumber2(n) {
      if (n.toNumber() * 0 !== 0) {
        return false;
      }
      if (n.lte(3))
        return n.gt(1);
      if (n.mod(2).eq(0) || n.mod(3).eq(0))
        return false;
      if (n.lt(Math.pow(2, 32))) {
        var x = n.toNumber();
        for (var i2 = 5; i2 * i2 <= x; i2 += 6) {
          if (x % i2 === 0 || x % (i2 + 2) === 0) {
            return false;
          }
        }
        return true;
      }
      function modPow(base, exponent, modulus) {
        var accumulator = 1;
        while (!exponent.eq(0)) {
          if (exponent.mod(2).eq(0)) {
            exponent = exponent.div(2);
            base = base.mul(base).mod(modulus);
          } else {
            exponent = exponent.sub(1);
            accumulator = base.mul(accumulator).mod(modulus);
          }
        }
        return accumulator;
      }
      var Decimal2 = n.constructor.clone({
        precision: n.toFixed(0).length * 2
      });
      n = new Decimal2(n);
      var r = 0;
      var d = n.sub(1);
      while (d.mod(2).eq(0)) {
        d = d.div(2);
        r += 1;
      }
      var bases = null;
      if (n.lt("3317044064679887385961981")) {
        bases = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41].filter((x2) => x2 < n);
      } else {
        var max2 = Math.min(n.toNumber() - 2, Math.floor(2 * Math.pow(n.toFixed(0).length * Math.log(10), 2)));
        bases = [];
        for (var _i = 2; _i <= max2; _i += 1) {
          bases.push(max2);
        }
      }
      for (var _i2 = 0; _i2 < bases.length; _i2 += 1) {
        var a = bases[_i2];
        var adn = modPow(n.sub(n).add(a), d, n);
        if (!adn.eq(1)) {
          for (var _i3 = 0, _x = adn; !_x.eq(n.sub(1)); _i3 += 1, _x = _x.mul(_x).mod(n)) {
            if (_i3 === r - 1) {
              return false;
            }
          }
        }
      }
      return true;
    },
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var name$22 = "numeric";
var dependencies$22 = ["number", "?bignumber", "?fraction"];
var createNumeric = /* @__PURE__ */ factory(name$22, dependencies$22, (_ref) => {
  var {
    number: _number,
    bignumber: bignumber2,
    fraction: fraction2
  } = _ref;
  var validInputTypes = {
    string: true,
    number: true,
    BigNumber: true,
    Fraction: true
  };
  var validOutputTypes = {
    number: (x) => _number(x),
    BigNumber: bignumber2 ? (x) => bignumber2(x) : noBignumber,
    Fraction: fraction2 ? (x) => fraction2(x) : noFraction
  };
  return function numeric2(value) {
    var outputType = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number";
    var check = arguments.length > 2 ? arguments[2] : void 0;
    if (check !== void 0) {
      throw new SyntaxError("numeric() takes one or two arguments");
    }
    var inputType = typeOf$1(value);
    if (!(inputType in validInputTypes)) {
      throw new TypeError("Cannot convert " + value + ' of type "' + inputType + '"; valid input types are ' + Object.keys(validInputTypes).join(", "));
    }
    if (!(outputType in validOutputTypes)) {
      throw new TypeError("Cannot convert " + value + ' to type "' + outputType + '"; valid output types are ' + Object.keys(validOutputTypes).join(", "));
    }
    if (outputType === inputType) {
      return value;
    } else {
      return validOutputTypes[outputType](value);
    }
  };
});
var name$21 = "divideScalar";
var dependencies$21 = ["typed", "numeric"];
var createDivideScalar = /* @__PURE__ */ factory(name$21, dependencies$21, (_ref) => {
  var {
    typed: typed2,
    numeric: numeric2
  } = _ref;
  return typed2(name$21, {
    "number, number": function numberNumber(x, y) {
      return x / y;
    },
    "Complex, Complex": function ComplexComplex(x, y) {
      return x.div(y);
    },
    "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
      return x.div(y);
    },
    "Fraction, Fraction": function FractionFraction(x, y) {
      return x.div(y);
    },
    "Unit, number | Complex | Fraction | BigNumber | Unit": (x, y) => x.divide(y),
    "number | Fraction | Complex | BigNumber, Unit": (x, y) => y.divideInto(x)
  });
});
var name$20 = "pow";
var dependencies$20 = ["typed", "config", "identity", "multiply", "matrix", "inv", "fraction", "number", "Complex"];
var createPow = /* @__PURE__ */ factory(name$20, dependencies$20, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    identity: identity2,
    multiply: multiply2,
    matrix: matrix2,
    inv: inv2,
    number: number2,
    fraction: fraction2,
    Complex: Complex2
  } = _ref;
  return typed2(name$20, {
    "number, number": _pow,
    "Complex, Complex": function ComplexComplex(x, y) {
      return x.pow(y);
    },
    "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
      if (y.isInteger() || x >= 0 || config3.predictable) {
        return x.pow(y);
      } else {
        return new Complex2(x.toNumber(), 0).pow(y.toNumber(), 0);
      }
    },
    "Fraction, Fraction": function FractionFraction(x, y) {
      var result = x.pow(y);
      if (result != null) {
        return result;
      }
      if (config3.predictable) {
        throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
      } else {
        return _pow(x.valueOf(), y.valueOf());
      }
    },
    "Array, number": _powArray,
    "Array, BigNumber": function ArrayBigNumber(x, y) {
      return _powArray(x, y.toNumber());
    },
    "Matrix, number": _powMatrix,
    "Matrix, BigNumber": function MatrixBigNumber(x, y) {
      return _powMatrix(x, y.toNumber());
    },
    "Unit, number | BigNumber": function UnitNumberBigNumber(x, y) {
      return x.pow(y);
    }
  });
  function _pow(x, y) {
    if (config3.predictable && !isInteger$1(y) && x < 0) {
      try {
        var yFrac = fraction2(y);
        var yNum = number2(yFrac);
        if (y === yNum || Math.abs((y - yNum) / y) < 1e-14) {
          if (yFrac.d % 2 === 1) {
            return (yFrac.n % 2 === 0 ? 1 : -1) * Math.pow(-x, y);
          }
        }
      } catch (ex) {
      }
    }
    if (config3.predictable && (x < -1 && y === Infinity || x > -1 && x < 0 && y === -Infinity)) {
      return NaN;
    }
    if (isInteger$1(y) || x >= 0 || config3.predictable) {
      return powNumber(x, y);
    } else {
      if (x * x < 1 && y === Infinity || x * x > 1 && y === -Infinity) {
        return 0;
      }
      return new Complex2(x, 0).pow(y, 0);
    }
  }
  function _powArray(x, y) {
    if (!isInteger$1(y)) {
      throw new TypeError("For A^b, b must be an integer (value is " + y + ")");
    }
    var s = arraySize(x);
    if (s.length !== 2) {
      throw new Error("For A^b, A must be 2 dimensional (A has " + s.length + " dimensions)");
    }
    if (s[0] !== s[1]) {
      throw new Error("For A^b, A must be square (size is " + s[0] + "x" + s[1] + ")");
    }
    if (y < 0) {
      try {
        return _powArray(inv2(x), -y);
      } catch (error) {
        if (error.message === "Cannot calculate inverse, determinant is zero") {
          throw new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + y + ")");
        }
        throw error;
      }
    }
    var res = identity2(s[0]).valueOf();
    var px = x;
    while (y >= 1) {
      if ((y & 1) === 1) {
        res = multiply2(px, res);
      }
      y >>= 1;
      px = multiply2(px, px);
    }
    return res;
  }
  function _powMatrix(x, y) {
    return matrix2(_powArray(x.valueOf(), y));
  }
});
var NO_INT = "Number of decimals in function round must be an integer";
var name$1$ = "round";
var dependencies$1$ = ["typed", "config", "matrix", "equalScalar", "zeros", "BigNumber", "DenseMatrix"];
var createRound = /* @__PURE__ */ factory(name$1$, dependencies$1$, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    matrix: matrix2,
    equalScalar: equalScalar2,
    zeros: zeros2,
    BigNumber: _BigNumber,
    DenseMatrix: DenseMatrix2
  } = _ref;
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo14xDs = createMatAlgo14xDs({
    typed: typed2
  });
  function toExponent(epsilon) {
    return Math.abs(splitNumber(epsilon).exponent);
  }
  return typed2(name$1$, {
    number: function number2(x) {
      var xEpsilon = roundNumber(x, toExponent(config3.epsilon));
      var xSelected = nearlyEqual$1(x, xEpsilon, config3.epsilon) ? xEpsilon : x;
      return roundNumber(xSelected);
    },
    "number, number": function numberNumber(x, n) {
      var epsilonExponent = toExponent(config3.epsilon);
      if (n >= epsilonExponent) {
        return roundNumber(x, n);
      }
      var xEpsilon = roundNumber(x, epsilonExponent);
      var xSelected = nearlyEqual$1(x, xEpsilon, config3.epsilon) ? xEpsilon : x;
      return roundNumber(xSelected, n);
    },
    "number, BigNumber": function numberBigNumber(x, n) {
      if (!n.isInteger()) {
        throw new TypeError(NO_INT);
      }
      return new _BigNumber(x).toDecimalPlaces(n.toNumber());
    },
    Complex: function Complex2(x) {
      return x.round();
    },
    "Complex, number": function ComplexNumber(x, n) {
      if (n % 1) {
        throw new TypeError(NO_INT);
      }
      return x.round(n);
    },
    "Complex, BigNumber": function ComplexBigNumber(x, n) {
      if (!n.isInteger()) {
        throw new TypeError(NO_INT);
      }
      var _n = n.toNumber();
      return x.round(_n);
    },
    BigNumber: function BigNumber2(x) {
      var xEpsilon = new _BigNumber(x).toDecimalPlaces(toExponent(config3.epsilon));
      var xSelected = nearlyEqual(x, xEpsilon, config3.epsilon) ? xEpsilon : x;
      return xSelected.toDecimalPlaces(0);
    },
    "BigNumber, BigNumber": function BigNumberBigNumber(x, n) {
      if (!n.isInteger()) {
        throw new TypeError(NO_INT);
      }
      var epsilonExponent = toExponent(config3.epsilon);
      if (n >= epsilonExponent) {
        return x.toDecimalPlaces(n.toNumber());
      }
      var xEpsilon = x.toDecimalPlaces(epsilonExponent);
      var xSelected = nearlyEqual(x, xEpsilon, config3.epsilon) ? xEpsilon : x;
      return xSelected.toDecimalPlaces(n.toNumber());
    },
    Fraction: function Fraction2(x) {
      return x.round();
    },
    "Fraction, number": function FractionNumber(x, n) {
      if (n % 1) {
        throw new TypeError(NO_INT);
      }
      return x.round(n);
    },
    "Fraction, BigNumber": function FractionBigNumber(x, n) {
      if (!n.isInteger()) {
        throw new TypeError(NO_INT);
      }
      return x.round(n.toNumber());
    },
    "Unit, number, Unit": typed2.referToSelf((self2) => function(x, n, unit2) {
      var valueless = x.toNumeric(unit2);
      return unit2.multiply(self2(valueless, n));
    }),
    "Unit, BigNumber, Unit": typed2.referToSelf((self2) => (x, n, unit2) => self2(x, n.toNumber(), unit2)),
    "Unit, Unit": typed2.referToSelf((self2) => (x, unit2) => self2(x, 0, unit2)),
    "Array | Matrix, number, Unit": typed2.referToSelf((self2) => (x, n, unit2) => {
      return deepMap(x, (value) => self2(value, n, unit2));
    }),
    "Array | Matrix, BigNumber, Unit": typed2.referToSelf((self2) => (x, n, unit2) => self2(x, n.toNumber(), unit2)),
    "Array | Matrix, Unit": typed2.referToSelf((self2) => (x, unit2) => self2(x, 0, unit2)),
    "Array | Matrix": typed2.referToSelf((self2) => (x) => {
      return deepMap(x, self2);
    }),
    "SparseMatrix, number | BigNumber": typed2.referToSelf((self2) => (x, n) => {
      return matAlgo11xS0s(x, n, self2, false);
    }),
    "DenseMatrix, number | BigNumber": typed2.referToSelf((self2) => (x, n) => {
      return matAlgo14xDs(x, n, self2, false);
    }),
    "Array, number | BigNumber": typed2.referToSelf((self2) => (x, n) => {
      return matAlgo14xDs(matrix2(x), n, self2, false).valueOf();
    }),
    "number | Complex | BigNumber | Fraction, SparseMatrix": typed2.referToSelf((self2) => (x, n) => {
      if (equalScalar2(x, 0)) {
        return zeros2(n.size(), n.storage());
      }
      return matAlgo12xSfs(n, x, self2, true);
    }),
    "number | Complex | BigNumber | Fraction, DenseMatrix": typed2.referToSelf((self2) => (x, n) => {
      if (equalScalar2(x, 0)) {
        return zeros2(n.size(), n.storage());
      }
      return matAlgo14xDs(n, x, self2, true);
    }),
    "number | Complex | BigNumber | Fraction, Array": typed2.referToSelf((self2) => (x, n) => {
      return matAlgo14xDs(matrix2(n), x, self2, true).valueOf();
    })
  });
});
var name$1_ = "log";
var dependencies$1_ = ["config", "typed", "divideScalar", "Complex"];
var createLog = /* @__PURE__ */ factory(name$1_, dependencies$1_, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    divideScalar: divideScalar2,
    Complex: Complex2
  } = _ref;
  return typed2(name$1_, {
    number: function number2(x) {
      if (x >= 0 || config3.predictable) {
        return logNumber(x);
      } else {
        return new Complex2(x, 0).log();
      }
    },
    Complex: function Complex3(x) {
      return x.log();
    },
    BigNumber: function BigNumber2(x) {
      if (!x.isNegative() || config3.predictable) {
        return x.ln();
      } else {
        return new Complex2(x.toNumber(), 0).log();
      }
    },
    "any, any": typed2.referToSelf((self2) => (x, base) => {
      return divideScalar2(self2(x), self2(base));
    })
  });
});
var name$1Z = "log1p";
var dependencies$1Z = ["typed", "config", "divideScalar", "log", "Complex"];
var createLog1p = /* @__PURE__ */ factory(name$1Z, dependencies$1Z, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    divideScalar: divideScalar2,
    log: log3,
    Complex: Complex2
  } = _ref;
  return typed2(name$1Z, {
    number: function number2(x) {
      if (x >= -1 || config3.predictable) {
        return log1p$1(x);
      } else {
        return _log1pComplex(new Complex2(x, 0));
      }
    },
    Complex: _log1pComplex,
    BigNumber: function BigNumber2(x) {
      var y = x.plus(1);
      if (!y.isNegative() || config3.predictable) {
        return y.ln();
      } else {
        return _log1pComplex(new Complex2(x.toNumber(), 0));
      }
    },
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2)),
    "any, any": typed2.referToSelf((self2) => (x, base) => {
      return divideScalar2(self2(x), log3(base));
    })
  });
  function _log1pComplex(x) {
    var xRe1p = x.re + 1;
    return new Complex2(Math.log(Math.sqrt(xRe1p * xRe1p + x.im * x.im)), Math.atan2(x.im, xRe1p));
  }
});
var name$1Y = "nthRoots";
var dependencies$1Y = ["config", "typed", "divideScalar", "Complex"];
var createNthRoots = /* @__PURE__ */ factory(name$1Y, dependencies$1Y, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    divideScalar: divideScalar2,
    Complex: Complex2
  } = _ref;
  var _calculateExactResult = [function realPos(val) {
    return new Complex2(val, 0);
  }, function imagPos(val) {
    return new Complex2(0, val);
  }, function realNeg(val) {
    return new Complex2(-val, 0);
  }, function imagNeg(val) {
    return new Complex2(0, -val);
  }];
  function _nthComplexRoots(a, root) {
    if (root < 0)
      throw new Error("Root must be greater than zero");
    if (root === 0)
      throw new Error("Root must be non-zero");
    if (root % 1 !== 0)
      throw new Error("Root must be an integer");
    if (a === 0 || a.abs() === 0)
      return [new Complex2(0, 0)];
    var aIsNumeric = typeof a === "number";
    var offset;
    if (aIsNumeric || a.re === 0 || a.im === 0) {
      if (aIsNumeric) {
        offset = 2 * +(a < 0);
      } else if (a.im === 0) {
        offset = 2 * +(a.re < 0);
      } else {
        offset = 2 * +(a.im < 0) + 1;
      }
    }
    var arg2 = a.arg();
    var abs2 = a.abs();
    var roots = [];
    var r = Math.pow(abs2, 1 / root);
    for (var k = 0; k < root; k++) {
      var halfPiFactor = (offset + 4 * k) / root;
      if (halfPiFactor === Math.round(halfPiFactor)) {
        roots.push(_calculateExactResult[halfPiFactor % 4](r));
        continue;
      }
      roots.push(new Complex2({
        r,
        phi: (arg2 + 2 * Math.PI * k) / root
      }));
    }
    return roots;
  }
  return typed2(name$1Y, {
    Complex: function Complex3(x) {
      return _nthComplexRoots(x, 2);
    },
    "Complex, number": _nthComplexRoots
  });
});
var name$1X = "dotPow";
var dependencies$1X = ["typed", "equalScalar", "matrix", "pow", "DenseMatrix", "concat"];
var createDotPow = /* @__PURE__ */ factory(name$1X, dependencies$1X, (_ref) => {
  var {
    typed: typed2,
    equalScalar: equalScalar2,
    matrix: matrix2,
    pow: pow2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var matAlgo03xDSf = createMatAlgo03xDSf({
    typed: typed2
  });
  var matAlgo07xSSf = createMatAlgo07xSSf({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  var powScalarSignatures = {};
  for (var signature in pow2.signatures) {
    if (Object.prototype.hasOwnProperty.call(pow2.signatures, signature)) {
      if (!signature.includes("Matrix") && !signature.includes("Array")) {
        powScalarSignatures[signature] = pow2.signatures[signature];
      }
    }
  }
  var powScalar = typed2(powScalarSignatures);
  return typed2(name$1X, matrixAlgorithmSuite({
    elop: powScalar,
    SS: matAlgo07xSSf,
    DS: matAlgo03xDSf,
    Ss: matAlgo11xS0s,
    sS: matAlgo12xSfs
  }));
});
var name$1W = "dotDivide";
var dependencies$1W = ["typed", "matrix", "equalScalar", "divideScalar", "DenseMatrix", "concat"];
var createDotDivide = /* @__PURE__ */ factory(name$1W, dependencies$1W, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    divideScalar: divideScalar2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var matAlgo02xDS0 = createMatAlgo02xDS0({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo03xDSf = createMatAlgo03xDSf({
    typed: typed2
  });
  var matAlgo07xSSf = createMatAlgo07xSSf({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  return typed2(name$1W, matrixAlgorithmSuite({
    elop: divideScalar2,
    SS: matAlgo07xSSf,
    DS: matAlgo03xDSf,
    SD: matAlgo02xDS0,
    Ss: matAlgo11xS0s,
    sS: matAlgo12xSfs
  }));
});
function createSolveValidation(_ref) {
  var {
    DenseMatrix: DenseMatrix2
  } = _ref;
  return function solveValidation(m, b, copy) {
    var mSize = m.size();
    if (mSize.length !== 2) {
      throw new RangeError("Matrix must be two dimensional (size: " + format$1(mSize) + ")");
    }
    var rows = mSize[0];
    var columns = mSize[1];
    if (rows !== columns) {
      throw new RangeError("Matrix must be square (size: " + format$1(mSize) + ")");
    }
    var data = [];
    if (isMatrix(b)) {
      var bSize = b.size();
      var bdata = b._data;
      if (bSize.length === 1) {
        if (bSize[0] !== rows) {
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        }
        for (var i2 = 0; i2 < rows; i2++) {
          data[i2] = [bdata[i2]];
        }
        return new DenseMatrix2({
          data,
          size: [rows, 1],
          datatype: b._datatype
        });
      }
      if (bSize.length === 2) {
        if (bSize[0] !== rows || bSize[1] !== 1) {
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        }
        if (isDenseMatrix(b)) {
          if (copy) {
            data = [];
            for (var _i = 0; _i < rows; _i++) {
              data[_i] = [bdata[_i][0]];
            }
            return new DenseMatrix2({
              data,
              size: [rows, 1],
              datatype: b._datatype
            });
          }
          return b;
        }
        if (isSparseMatrix(b)) {
          for (var _i2 = 0; _i2 < rows; _i2++) {
            data[_i2] = [0];
          }
          var values = b._values;
          var index2 = b._index;
          var ptr = b._ptr;
          for (var k1 = ptr[1], k = ptr[0]; k < k1; k++) {
            var _i3 = index2[k];
            data[_i3][0] = values[k];
          }
          return new DenseMatrix2({
            data,
            size: [rows, 1],
            datatype: b._datatype
          });
        }
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
    if (isArray(b)) {
      var bsize = arraySize(b);
      if (bsize.length === 1) {
        if (bsize[0] !== rows) {
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        }
        for (var _i4 = 0; _i4 < rows; _i4++) {
          data[_i4] = [b[_i4]];
        }
        return new DenseMatrix2({
          data,
          size: [rows, 1]
        });
      }
      if (bsize.length === 2) {
        if (bsize[0] !== rows || bsize[1] !== 1) {
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        }
        for (var _i5 = 0; _i5 < rows; _i5++) {
          data[_i5] = [b[_i5][0]];
        }
        return new DenseMatrix2({
          data,
          size: [rows, 1]
        });
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
  };
}
var name$1V = "lsolve";
var dependencies$1V = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"];
var createLsolve = /* @__PURE__ */ factory(name$1V, dependencies$1V, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    divideScalar: divideScalar2,
    multiplyScalar: multiplyScalar2,
    subtractScalar: subtractScalar2,
    equalScalar: equalScalar2,
    DenseMatrix: DenseMatrix2
  } = _ref;
  var solveValidation = createSolveValidation({
    DenseMatrix: DenseMatrix2
  });
  return typed2(name$1V, {
    "SparseMatrix, Array | Matrix": function SparseMatrixArrayMatrix(m, b) {
      return _sparseForwardSubstitution(m, b);
    },
    "DenseMatrix, Array | Matrix": function DenseMatrixArrayMatrix(m, b) {
      return _denseForwardSubstitution(m, b);
    },
    "Array, Array | Matrix": function ArrayArrayMatrix(a, b) {
      var m = matrix2(a);
      var r = _denseForwardSubstitution(m, b);
      return r.valueOf();
    }
  });
  function _denseForwardSubstitution(m, b) {
    b = solveValidation(m, b, true);
    var bdata = b._data;
    var rows = m._size[0];
    var columns = m._size[1];
    var x = [];
    var mdata = m._data;
    for (var j = 0; j < columns; j++) {
      var bj = bdata[j][0] || 0;
      var xj = void 0;
      if (!equalScalar2(bj, 0)) {
        var vjj = mdata[j][j];
        if (equalScalar2(vjj, 0)) {
          throw new Error("Linear system cannot be solved since matrix is singular");
        }
        xj = divideScalar2(bj, vjj);
        for (var i2 = j + 1; i2 < rows; i2++) {
          bdata[i2] = [subtractScalar2(bdata[i2][0] || 0, multiplyScalar2(xj, mdata[i2][j]))];
        }
      } else {
        xj = 0;
      }
      x[j] = [xj];
    }
    return new DenseMatrix2({
      data: x,
      size: [rows, 1]
    });
  }
  function _sparseForwardSubstitution(m, b) {
    b = solveValidation(m, b, true);
    var bdata = b._data;
    var rows = m._size[0];
    var columns = m._size[1];
    var values = m._values;
    var index2 = m._index;
    var ptr = m._ptr;
    var x = [];
    for (var j = 0; j < columns; j++) {
      var bj = bdata[j][0] || 0;
      if (!equalScalar2(bj, 0)) {
        var vjj = 0;
        var jValues = [];
        var jIndices = [];
        var firstIndex = ptr[j];
        var lastIndex = ptr[j + 1];
        for (var k = firstIndex; k < lastIndex; k++) {
          var i2 = index2[k];
          if (i2 === j) {
            vjj = values[k];
          } else if (i2 > j) {
            jValues.push(values[k]);
            jIndices.push(i2);
          }
        }
        if (equalScalar2(vjj, 0)) {
          throw new Error("Linear system cannot be solved since matrix is singular");
        }
        var xj = divideScalar2(bj, vjj);
        for (var _k = 0, l = jIndices.length; _k < l; _k++) {
          var _i = jIndices[_k];
          bdata[_i] = [subtractScalar2(bdata[_i][0] || 0, multiplyScalar2(xj, jValues[_k]))];
        }
        x[j] = [xj];
      } else {
        x[j] = [0];
      }
    }
    return new DenseMatrix2({
      data: x,
      size: [rows, 1]
    });
  }
});
var name$1U = "usolve";
var dependencies$1U = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"];
var createUsolve = /* @__PURE__ */ factory(name$1U, dependencies$1U, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    divideScalar: divideScalar2,
    multiplyScalar: multiplyScalar2,
    subtractScalar: subtractScalar2,
    equalScalar: equalScalar2,
    DenseMatrix: DenseMatrix2
  } = _ref;
  var solveValidation = createSolveValidation({
    DenseMatrix: DenseMatrix2
  });
  return typed2(name$1U, {
    "SparseMatrix, Array | Matrix": function SparseMatrixArrayMatrix(m, b) {
      return _sparseBackwardSubstitution(m, b);
    },
    "DenseMatrix, Array | Matrix": function DenseMatrixArrayMatrix(m, b) {
      return _denseBackwardSubstitution(m, b);
    },
    "Array, Array | Matrix": function ArrayArrayMatrix(a, b) {
      var m = matrix2(a);
      var r = _denseBackwardSubstitution(m, b);
      return r.valueOf();
    }
  });
  function _denseBackwardSubstitution(m, b) {
    b = solveValidation(m, b, true);
    var bdata = b._data;
    var rows = m._size[0];
    var columns = m._size[1];
    var x = [];
    var mdata = m._data;
    for (var j = columns - 1; j >= 0; j--) {
      var bj = bdata[j][0] || 0;
      var xj = void 0;
      if (!equalScalar2(bj, 0)) {
        var vjj = mdata[j][j];
        if (equalScalar2(vjj, 0)) {
          throw new Error("Linear system cannot be solved since matrix is singular");
        }
        xj = divideScalar2(bj, vjj);
        for (var i2 = j - 1; i2 >= 0; i2--) {
          bdata[i2] = [subtractScalar2(bdata[i2][0] || 0, multiplyScalar2(xj, mdata[i2][j]))];
        }
      } else {
        xj = 0;
      }
      x[j] = [xj];
    }
    return new DenseMatrix2({
      data: x,
      size: [rows, 1]
    });
  }
  function _sparseBackwardSubstitution(m, b) {
    b = solveValidation(m, b, true);
    var bdata = b._data;
    var rows = m._size[0];
    var columns = m._size[1];
    var values = m._values;
    var index2 = m._index;
    var ptr = m._ptr;
    var x = [];
    for (var j = columns - 1; j >= 0; j--) {
      var bj = bdata[j][0] || 0;
      if (!equalScalar2(bj, 0)) {
        var vjj = 0;
        var jValues = [];
        var jIndices = [];
        var firstIndex = ptr[j];
        var lastIndex = ptr[j + 1];
        for (var k = lastIndex - 1; k >= firstIndex; k--) {
          var i2 = index2[k];
          if (i2 === j) {
            vjj = values[k];
          } else if (i2 < j) {
            jValues.push(values[k]);
            jIndices.push(i2);
          }
        }
        if (equalScalar2(vjj, 0)) {
          throw new Error("Linear system cannot be solved since matrix is singular");
        }
        var xj = divideScalar2(bj, vjj);
        for (var _k = 0, _lastIndex = jIndices.length; _k < _lastIndex; _k++) {
          var _i = jIndices[_k];
          bdata[_i] = [subtractScalar2(bdata[_i][0], multiplyScalar2(xj, jValues[_k]))];
        }
        x[j] = [xj];
      } else {
        x[j] = [0];
      }
    }
    return new DenseMatrix2({
      data: x,
      size: [rows, 1]
    });
  }
});
var name$1T = "lsolveAll";
var dependencies$1T = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"];
var createLsolveAll = /* @__PURE__ */ factory(name$1T, dependencies$1T, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    divideScalar: divideScalar2,
    multiplyScalar: multiplyScalar2,
    subtractScalar: subtractScalar2,
    equalScalar: equalScalar2,
    DenseMatrix: DenseMatrix2
  } = _ref;
  var solveValidation = createSolveValidation({
    DenseMatrix: DenseMatrix2
  });
  return typed2(name$1T, {
    "SparseMatrix, Array | Matrix": function SparseMatrixArrayMatrix(m, b) {
      return _sparseForwardSubstitution(m, b);
    },
    "DenseMatrix, Array | Matrix": function DenseMatrixArrayMatrix(m, b) {
      return _denseForwardSubstitution(m, b);
    },
    "Array, Array | Matrix": function ArrayArrayMatrix(a, b) {
      var m = matrix2(a);
      var R = _denseForwardSubstitution(m, b);
      return R.map((r) => r.valueOf());
    }
  });
  function _denseForwardSubstitution(m, b_) {
    var B = [solveValidation(m, b_, true)._data.map((e2) => e2[0])];
    var M = m._data;
    var rows = m._size[0];
    var columns = m._size[1];
    for (var i2 = 0; i2 < columns; i2++) {
      var L = B.length;
      for (var k = 0; k < L; k++) {
        var b = B[k];
        if (!equalScalar2(M[i2][i2], 0)) {
          b[i2] = divideScalar2(b[i2], M[i2][i2]);
          for (var j = i2 + 1; j < columns; j++) {
            b[j] = subtractScalar2(b[j], multiplyScalar2(b[i2], M[j][i2]));
          }
        } else if (!equalScalar2(b[i2], 0)) {
          if (k === 0) {
            return [];
          } else {
            B.splice(k, 1);
            k -= 1;
            L -= 1;
          }
        } else if (k === 0) {
          var bNew = [...b];
          bNew[i2] = 1;
          for (var _j = i2 + 1; _j < columns; _j++) {
            bNew[_j] = subtractScalar2(bNew[_j], M[_j][i2]);
          }
          B.push(bNew);
        }
      }
    }
    return B.map((x) => new DenseMatrix2({
      data: x.map((e2) => [e2]),
      size: [rows, 1]
    }));
  }
  function _sparseForwardSubstitution(m, b_) {
    var B = [solveValidation(m, b_, true)._data.map((e2) => e2[0])];
    var rows = m._size[0];
    var columns = m._size[1];
    var values = m._values;
    var index2 = m._index;
    var ptr = m._ptr;
    for (var i2 = 0; i2 < columns; i2++) {
      var L = B.length;
      for (var k = 0; k < L; k++) {
        var b = B[k];
        var iValues = [];
        var iIndices = [];
        var firstIndex = ptr[i2];
        var lastIndex = ptr[i2 + 1];
        var Mii = 0;
        for (var j = firstIndex; j < lastIndex; j++) {
          var J = index2[j];
          if (J === i2) {
            Mii = values[j];
          } else if (J > i2) {
            iValues.push(values[j]);
            iIndices.push(J);
          }
        }
        if (!equalScalar2(Mii, 0)) {
          b[i2] = divideScalar2(b[i2], Mii);
          for (var _j2 = 0, _lastIndex = iIndices.length; _j2 < _lastIndex; _j2++) {
            var _J = iIndices[_j2];
            b[_J] = subtractScalar2(b[_J], multiplyScalar2(b[i2], iValues[_j2]));
          }
        } else if (!equalScalar2(b[i2], 0)) {
          if (k === 0) {
            return [];
          } else {
            B.splice(k, 1);
            k -= 1;
            L -= 1;
          }
        } else if (k === 0) {
          var bNew = [...b];
          bNew[i2] = 1;
          for (var _j3 = 0, _lastIndex2 = iIndices.length; _j3 < _lastIndex2; _j3++) {
            var _J2 = iIndices[_j3];
            bNew[_J2] = subtractScalar2(bNew[_J2], iValues[_j3]);
          }
          B.push(bNew);
        }
      }
    }
    return B.map((x) => new DenseMatrix2({
      data: x.map((e2) => [e2]),
      size: [rows, 1]
    }));
  }
});
var name$1S = "usolveAll";
var dependencies$1S = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"];
var createUsolveAll = /* @__PURE__ */ factory(name$1S, dependencies$1S, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    divideScalar: divideScalar2,
    multiplyScalar: multiplyScalar2,
    subtractScalar: subtractScalar2,
    equalScalar: equalScalar2,
    DenseMatrix: DenseMatrix2
  } = _ref;
  var solveValidation = createSolveValidation({
    DenseMatrix: DenseMatrix2
  });
  return typed2(name$1S, {
    "SparseMatrix, Array | Matrix": function SparseMatrixArrayMatrix(m, b) {
      return _sparseBackwardSubstitution(m, b);
    },
    "DenseMatrix, Array | Matrix": function DenseMatrixArrayMatrix(m, b) {
      return _denseBackwardSubstitution(m, b);
    },
    "Array, Array | Matrix": function ArrayArrayMatrix(a, b) {
      var m = matrix2(a);
      var R = _denseBackwardSubstitution(m, b);
      return R.map((r) => r.valueOf());
    }
  });
  function _denseBackwardSubstitution(m, b_) {
    var B = [solveValidation(m, b_, true)._data.map((e2) => e2[0])];
    var M = m._data;
    var rows = m._size[0];
    var columns = m._size[1];
    for (var i2 = columns - 1; i2 >= 0; i2--) {
      var L = B.length;
      for (var k = 0; k < L; k++) {
        var b = B[k];
        if (!equalScalar2(M[i2][i2], 0)) {
          b[i2] = divideScalar2(b[i2], M[i2][i2]);
          for (var j = i2 - 1; j >= 0; j--) {
            b[j] = subtractScalar2(b[j], multiplyScalar2(b[i2], M[j][i2]));
          }
        } else if (!equalScalar2(b[i2], 0)) {
          if (k === 0) {
            return [];
          } else {
            B.splice(k, 1);
            k -= 1;
            L -= 1;
          }
        } else if (k === 0) {
          var bNew = [...b];
          bNew[i2] = 1;
          for (var _j = i2 - 1; _j >= 0; _j--) {
            bNew[_j] = subtractScalar2(bNew[_j], M[_j][i2]);
          }
          B.push(bNew);
        }
      }
    }
    return B.map((x) => new DenseMatrix2({
      data: x.map((e2) => [e2]),
      size: [rows, 1]
    }));
  }
  function _sparseBackwardSubstitution(m, b_) {
    var B = [solveValidation(m, b_, true)._data.map((e2) => e2[0])];
    var rows = m._size[0];
    var columns = m._size[1];
    var values = m._values;
    var index2 = m._index;
    var ptr = m._ptr;
    for (var i2 = columns - 1; i2 >= 0; i2--) {
      var L = B.length;
      for (var k = 0; k < L; k++) {
        var b = B[k];
        var iValues = [];
        var iIndices = [];
        var firstIndex = ptr[i2];
        var lastIndex = ptr[i2 + 1];
        var Mii = 0;
        for (var j = lastIndex - 1; j >= firstIndex; j--) {
          var J = index2[j];
          if (J === i2) {
            Mii = values[j];
          } else if (J < i2) {
            iValues.push(values[j]);
            iIndices.push(J);
          }
        }
        if (!equalScalar2(Mii, 0)) {
          b[i2] = divideScalar2(b[i2], Mii);
          for (var _j2 = 0, _lastIndex = iIndices.length; _j2 < _lastIndex; _j2++) {
            var _J = iIndices[_j2];
            b[_J] = subtractScalar2(b[_J], multiplyScalar2(b[i2], iValues[_j2]));
          }
        } else if (!equalScalar2(b[i2], 0)) {
          if (k === 0) {
            return [];
          } else {
            B.splice(k, 1);
            k -= 1;
            L -= 1;
          }
        } else if (k === 0) {
          var bNew = [...b];
          bNew[i2] = 1;
          for (var _j3 = 0, _lastIndex2 = iIndices.length; _j3 < _lastIndex2; _j3++) {
            var _J2 = iIndices[_j3];
            bNew[_J2] = subtractScalar2(bNew[_J2], iValues[_j3]);
          }
          B.push(bNew);
        }
      }
    }
    return B.map((x) => new DenseMatrix2({
      data: x.map((e2) => [e2]),
      size: [rows, 1]
    }));
  }
});
var name$1R = "matAlgo08xS0Sid";
var dependencies$1R = ["typed", "equalScalar"];
var createMatAlgo08xS0Sid = /* @__PURE__ */ factory(name$1R, dependencies$1R, (_ref) => {
  var {
    typed: typed2,
    equalScalar: equalScalar2
  } = _ref;
  return function matAlgo08xS0Sid(a, b, callback) {
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var asize = a._size;
    var adt = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var bsize = b._size;
    var bdt = b._datatype || b._data === void 0 ? b._datatype : b.getDataType();
    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    }
    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
      throw new RangeError("Dimension mismatch. Matrix A (" + asize + ") must match Matrix B (" + bsize + ")");
    }
    if (!avalues || !bvalues) {
      throw new Error("Cannot perform operation on Pattern Sparse Matrices");
    }
    var rows = asize[0];
    var columns = asize[1];
    var dt;
    var eq = equalScalar2;
    var zero = 0;
    var cf = callback;
    if (typeof adt === "string" && adt === bdt && adt !== "mixed") {
      dt = adt;
      eq = typed2.find(equalScalar2, [dt, dt]);
      zero = typed2.convert(0, dt);
      cf = typed2.find(callback, [dt, dt]);
    }
    var cvalues = [];
    var cindex = [];
    var cptr = [];
    var x = [];
    var w = [];
    var k, k0, k1, i2;
    for (var j = 0; j < columns; j++) {
      cptr[j] = cindex.length;
      var mark = j + 1;
      for (k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
        i2 = aindex[k];
        w[i2] = mark;
        x[i2] = avalues[k];
        cindex.push(i2);
      }
      for (k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
        i2 = bindex[k];
        if (w[i2] === mark) {
          x[i2] = cf(x[i2], bvalues[k]);
        }
      }
      k = cptr[j];
      while (k < cindex.length) {
        i2 = cindex[k];
        var v = x[i2];
        if (!eq(v, zero)) {
          cvalues.push(v);
          k++;
        } else {
          cindex.splice(k, 1);
        }
      }
    }
    cptr[columns] = cindex.length;
    return a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [rows, columns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
  };
});
var createUseMatrixForArrayScalar = /* @__PURE__ */ factory("useMatrixForArrayScalar", ["typed", "matrix"], (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2
  } = _ref;
  return {
    "Array, number": typed2.referTo("DenseMatrix, number", (selfDn) => (x, y) => selfDn(matrix2(x), y).valueOf()),
    "Array, BigNumber": typed2.referTo("DenseMatrix, BigNumber", (selfDB) => (x, y) => selfDB(matrix2(x), y).valueOf()),
    "number, Array": typed2.referTo("number, DenseMatrix", (selfnD) => (x, y) => selfnD(x, matrix2(y)).valueOf()),
    "BigNumber, Array": typed2.referTo("BigNumber, DenseMatrix", (selfBD) => (x, y) => selfBD(x, matrix2(y)).valueOf())
  };
});
var name$1Q = "leftShift";
var dependencies$1Q = ["typed", "matrix", "equalScalar", "zeros", "DenseMatrix", "concat"];
var createLeftShift = /* @__PURE__ */ factory(name$1Q, dependencies$1Q, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    zeros: zeros2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var matAlgo01xDSid = createMatAlgo01xDSid({
    typed: typed2
  });
  var matAlgo02xDS0 = createMatAlgo02xDS0({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo08xS0Sid = createMatAlgo08xS0Sid({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo10xSids = createMatAlgo10xSids({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo14xDs = createMatAlgo14xDs({
    typed: typed2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  var useMatrixForArrayScalar = createUseMatrixForArrayScalar({
    typed: typed2,
    matrix: matrix2
  });
  return typed2(name$1Q, {
    "number, number": leftShiftNumber,
    "BigNumber, BigNumber": leftShiftBigNumber,
    "SparseMatrix, number | BigNumber": typed2.referToSelf((self2) => (x, y) => {
      if (equalScalar2(y, 0)) {
        return x.clone();
      }
      return matAlgo11xS0s(x, y, self2, false);
    }),
    "DenseMatrix, number | BigNumber": typed2.referToSelf((self2) => (x, y) => {
      if (equalScalar2(y, 0)) {
        return x.clone();
      }
      return matAlgo14xDs(x, y, self2, false);
    }),
    "number | BigNumber, SparseMatrix": typed2.referToSelf((self2) => (x, y) => {
      if (equalScalar2(x, 0)) {
        return zeros2(y.size(), y.storage());
      }
      return matAlgo10xSids(y, x, self2, true);
    }),
    "number | BigNumber, DenseMatrix": typed2.referToSelf((self2) => (x, y) => {
      if (equalScalar2(x, 0)) {
        return zeros2(y.size(), y.storage());
      }
      return matAlgo14xDs(y, x, self2, true);
    })
  }, useMatrixForArrayScalar, matrixAlgorithmSuite({
    SS: matAlgo08xS0Sid,
    DS: matAlgo01xDSid,
    SD: matAlgo02xDS0
  }));
});
var name$1P = "rightArithShift";
var dependencies$1P = ["typed", "matrix", "equalScalar", "zeros", "DenseMatrix", "concat"];
var createRightArithShift = /* @__PURE__ */ factory(name$1P, dependencies$1P, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    zeros: zeros2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var matAlgo01xDSid = createMatAlgo01xDSid({
    typed: typed2
  });
  var matAlgo02xDS0 = createMatAlgo02xDS0({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo08xS0Sid = createMatAlgo08xS0Sid({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo10xSids = createMatAlgo10xSids({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo14xDs = createMatAlgo14xDs({
    typed: typed2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  var useMatrixForArrayScalar = createUseMatrixForArrayScalar({
    typed: typed2,
    matrix: matrix2
  });
  return typed2(name$1P, {
    "number, number": rightArithShiftNumber,
    "BigNumber, BigNumber": rightArithShiftBigNumber,
    "SparseMatrix, number | BigNumber": typed2.referToSelf((self2) => (x, y) => {
      if (equalScalar2(y, 0)) {
        return x.clone();
      }
      return matAlgo11xS0s(x, y, self2, false);
    }),
    "DenseMatrix, number | BigNumber": typed2.referToSelf((self2) => (x, y) => {
      if (equalScalar2(y, 0)) {
        return x.clone();
      }
      return matAlgo14xDs(x, y, self2, false);
    }),
    "number | BigNumber, SparseMatrix": typed2.referToSelf((self2) => (x, y) => {
      if (equalScalar2(x, 0)) {
        return zeros2(y.size(), y.storage());
      }
      return matAlgo10xSids(y, x, self2, true);
    }),
    "number | BigNumber, DenseMatrix": typed2.referToSelf((self2) => (x, y) => {
      if (equalScalar2(x, 0)) {
        return zeros2(y.size(), y.storage());
      }
      return matAlgo14xDs(y, x, self2, true);
    })
  }, useMatrixForArrayScalar, matrixAlgorithmSuite({
    SS: matAlgo08xS0Sid,
    DS: matAlgo01xDSid,
    SD: matAlgo02xDS0
  }));
});
var name$1O = "rightLogShift";
var dependencies$1O = ["typed", "matrix", "equalScalar", "zeros", "DenseMatrix", "concat"];
var createRightLogShift = /* @__PURE__ */ factory(name$1O, dependencies$1O, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    zeros: zeros2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var matAlgo01xDSid = createMatAlgo01xDSid({
    typed: typed2
  });
  var matAlgo02xDS0 = createMatAlgo02xDS0({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo08xS0Sid = createMatAlgo08xS0Sid({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo10xSids = createMatAlgo10xSids({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo14xDs = createMatAlgo14xDs({
    typed: typed2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  var useMatrixForArrayScalar = createUseMatrixForArrayScalar({
    typed: typed2,
    matrix: matrix2
  });
  return typed2(name$1O, {
    "number, number": rightLogShiftNumber,
    // 'BigNumber, BigNumber': ..., // TODO: implement BigNumber support for rightLogShift
    "SparseMatrix, number | BigNumber": typed2.referToSelf((self2) => (x, y) => {
      if (equalScalar2(y, 0)) {
        return x.clone();
      }
      return matAlgo11xS0s(x, y, self2, false);
    }),
    "DenseMatrix, number | BigNumber": typed2.referToSelf((self2) => (x, y) => {
      if (equalScalar2(y, 0)) {
        return x.clone();
      }
      return matAlgo14xDs(x, y, self2, false);
    }),
    "number | BigNumber, SparseMatrix": typed2.referToSelf((self2) => (x, y) => {
      if (equalScalar2(x, 0)) {
        return zeros2(y.size(), y.storage());
      }
      return matAlgo10xSids(y, x, self2, true);
    }),
    "number | BigNumber, DenseMatrix": typed2.referToSelf((self2) => (x, y) => {
      if (equalScalar2(x, 0)) {
        return zeros2(y.size(), y.storage());
      }
      return matAlgo14xDs(y, x, self2, true);
    })
  }, useMatrixForArrayScalar, matrixAlgorithmSuite({
    SS: matAlgo08xS0Sid,
    DS: matAlgo01xDSid,
    SD: matAlgo02xDS0
  }));
});
var name$1N = "and";
var dependencies$1N = ["typed", "matrix", "equalScalar", "zeros", "not", "concat"];
var createAnd = /* @__PURE__ */ factory(name$1N, dependencies$1N, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    zeros: zeros2,
    not: not2,
    concat: concat2
  } = _ref;
  var matAlgo02xDS0 = createMatAlgo02xDS0({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo06xS0S0 = createMatAlgo06xS0S0({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo14xDs = createMatAlgo14xDs({
    typed: typed2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  return typed2(name$1N, {
    "number, number": andNumber,
    "Complex, Complex": function ComplexComplex(x, y) {
      return (x.re !== 0 || x.im !== 0) && (y.re !== 0 || y.im !== 0);
    },
    "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
      return !x.isZero() && !y.isZero() && !x.isNaN() && !y.isNaN();
    },
    "Unit, Unit": typed2.referToSelf((self2) => (x, y) => self2(x.value || 0, y.value || 0)),
    "SparseMatrix, any": typed2.referToSelf((self2) => (x, y) => {
      if (not2(y)) {
        return zeros2(x.size(), x.storage());
      }
      return matAlgo11xS0s(x, y, self2, false);
    }),
    "DenseMatrix, any": typed2.referToSelf((self2) => (x, y) => {
      if (not2(y)) {
        return zeros2(x.size(), x.storage());
      }
      return matAlgo14xDs(x, y, self2, false);
    }),
    "any, SparseMatrix": typed2.referToSelf((self2) => (x, y) => {
      if (not2(x)) {
        return zeros2(x.size(), x.storage());
      }
      return matAlgo11xS0s(y, x, self2, true);
    }),
    "any, DenseMatrix": typed2.referToSelf((self2) => (x, y) => {
      if (not2(x)) {
        return zeros2(x.size(), x.storage());
      }
      return matAlgo14xDs(y, x, self2, true);
    }),
    "Array, any": typed2.referToSelf((self2) => (x, y) => {
      return self2(matrix2(x), y).valueOf();
    }),
    "any, Array": typed2.referToSelf((self2) => (x, y) => {
      return self2(x, matrix2(y)).valueOf();
    })
  }, matrixAlgorithmSuite({
    SS: matAlgo06xS0S0,
    DS: matAlgo02xDS0
  }));
});
var name$1M = "compare";
var dependencies$1M = ["typed", "config", "matrix", "equalScalar", "BigNumber", "Fraction", "DenseMatrix", "concat"];
var createCompare = /* @__PURE__ */ factory(name$1M, dependencies$1M, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    equalScalar: equalScalar2,
    matrix: matrix2,
    BigNumber: BigNumber2,
    Fraction: Fraction2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var matAlgo03xDSf = createMatAlgo03xDSf({
    typed: typed2
  });
  var matAlgo05xSfSf = createMatAlgo05xSfSf({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  var compareUnits = createCompareUnits({
    typed: typed2
  });
  return typed2(name$1M, createCompareNumber({
    typed: typed2,
    config: config3
  }), {
    "boolean, boolean": function booleanBoolean(x, y) {
      return x === y ? 0 : x > y ? 1 : -1;
    },
    "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
      return nearlyEqual(x, y, config3.epsilon) ? new BigNumber2(0) : new BigNumber2(x.cmp(y));
    },
    "Fraction, Fraction": function FractionFraction(x, y) {
      return new Fraction2(x.compare(y));
    },
    "Complex, Complex": function ComplexComplex() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, compareUnits, matrixAlgorithmSuite({
    SS: matAlgo05xSfSf,
    DS: matAlgo03xDSf,
    Ss: matAlgo12xSfs
  }));
});
var createCompareNumber = /* @__PURE__ */ factory(name$1M, ["typed", "config"], (_ref2) => {
  var {
    typed: typed2,
    config: config3
  } = _ref2;
  return typed2(name$1M, {
    "number, number": function numberNumber(x, y) {
      return nearlyEqual$1(x, y, config3.epsilon) ? 0 : x > y ? 1 : -1;
    }
  });
});
var naturalSort = function naturalSort2(a, b) {
  var re2 = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi, sre = /(^[ ]*|[ ]*$)/g, dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/, hre = /^0x[0-9a-f]+$/i, ore = /^0/, i2 = function(s) {
    return naturalSort2.insensitive && ("" + s).toLowerCase() || "" + s;
  }, x = i2(a).replace(sre, "") || "", y = i2(b).replace(sre, "") || "", xN = x.replace(re2, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"), yN = y.replace(re2, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"), xD = parseInt(x.match(hre), 16) || xN.length !== 1 && x.match(dre) && Date.parse(x), yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null, oFxNcL, oFyNcL;
  if (yD) {
    if (xD < yD) {
      return -1;
    } else if (xD > yD) {
      return 1;
    }
  }
  for (var cLoc = 0, numS = Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
    oFxNcL = !(xN[cLoc] || "").match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
    oFyNcL = !(yN[cLoc] || "").match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
    if (isNaN(oFxNcL) !== isNaN(oFyNcL)) {
      return isNaN(oFxNcL) ? 1 : -1;
    } else if (typeof oFxNcL !== typeof oFyNcL) {
      oFxNcL += "";
      oFyNcL += "";
    }
    if (oFxNcL < oFyNcL) {
      return -1;
    }
    if (oFxNcL > oFyNcL) {
      return 1;
    }
  }
  return 0;
};
const naturalSort$1 = /* @__PURE__ */ getDefaultExportFromCjs(naturalSort);
var name$1L = "compareNatural";
var dependencies$1L = ["typed", "compare"];
var createCompareNatural = /* @__PURE__ */ factory(name$1L, dependencies$1L, (_ref) => {
  var {
    typed: typed2,
    compare: compare2
  } = _ref;
  var compareBooleans = compare2.signatures["boolean,boolean"];
  return typed2(name$1L, {
    "any, any": _compareNatural
  });
  function _compareNatural(x, y) {
    var typeX = typeOf$1(x);
    var typeY = typeOf$1(y);
    var c;
    if ((typeX === "number" || typeX === "BigNumber" || typeX === "Fraction") && (typeY === "number" || typeY === "BigNumber" || typeY === "Fraction")) {
      c = compare2(x, y);
      if (c.toString() !== "0") {
        return c > 0 ? 1 : -1;
      } else {
        return naturalSort$1(typeX, typeY);
      }
    }
    var matTypes = ["Array", "DenseMatrix", "SparseMatrix"];
    if (matTypes.includes(typeX) || matTypes.includes(typeY)) {
      c = compareMatricesAndArrays(_compareNatural, x, y);
      if (c !== 0) {
        return c;
      } else {
        return naturalSort$1(typeX, typeY);
      }
    }
    if (typeX !== typeY) {
      return naturalSort$1(typeX, typeY);
    }
    if (typeX === "Complex") {
      return compareComplexNumbers(x, y);
    }
    if (typeX === "Unit") {
      if (x.equalBase(y)) {
        return _compareNatural(x.value, y.value);
      }
      return compareArrays(_compareNatural, x.formatUnits(), y.formatUnits());
    }
    if (typeX === "boolean") {
      return compareBooleans(x, y);
    }
    if (typeX === "string") {
      return naturalSort$1(x, y);
    }
    if (typeX === "Object") {
      return compareObjects(_compareNatural, x, y);
    }
    if (typeX === "null") {
      return 0;
    }
    if (typeX === "undefined") {
      return 0;
    }
    throw new TypeError('Unsupported type of value "' + typeX + '"');
  }
  function compareMatricesAndArrays(compareNatural2, x, y) {
    if (isSparseMatrix(x) && isSparseMatrix(y)) {
      return compareArrays(compareNatural2, x.toJSON().values, y.toJSON().values);
    }
    if (isSparseMatrix(x)) {
      return compareMatricesAndArrays(compareNatural2, x.toArray(), y);
    }
    if (isSparseMatrix(y)) {
      return compareMatricesAndArrays(compareNatural2, x, y.toArray());
    }
    if (isDenseMatrix(x)) {
      return compareMatricesAndArrays(compareNatural2, x.toJSON().data, y);
    }
    if (isDenseMatrix(y)) {
      return compareMatricesAndArrays(compareNatural2, x, y.toJSON().data);
    }
    if (!Array.isArray(x)) {
      return compareMatricesAndArrays(compareNatural2, [x], y);
    }
    if (!Array.isArray(y)) {
      return compareMatricesAndArrays(compareNatural2, x, [y]);
    }
    return compareArrays(compareNatural2, x, y);
  }
  function compareArrays(compareNatural2, x, y) {
    for (var i2 = 0, ii = Math.min(x.length, y.length); i2 < ii; i2++) {
      var v = compareNatural2(x[i2], y[i2]);
      if (v !== 0) {
        return v;
      }
    }
    if (x.length > y.length) {
      return 1;
    }
    if (x.length < y.length) {
      return -1;
    }
    return 0;
  }
  function compareObjects(compareNatural2, x, y) {
    var keysX = Object.keys(x);
    var keysY = Object.keys(y);
    keysX.sort(naturalSort$1);
    keysY.sort(naturalSort$1);
    var c = compareArrays(compareNatural2, keysX, keysY);
    if (c !== 0) {
      return c;
    }
    for (var i2 = 0; i2 < keysX.length; i2++) {
      var v = compareNatural2(x[keysX[i2]], y[keysY[i2]]);
      if (v !== 0) {
        return v;
      }
    }
    return 0;
  }
});
function compareComplexNumbers(x, y) {
  if (x.re > y.re) {
    return 1;
  }
  if (x.re < y.re) {
    return -1;
  }
  if (x.im > y.im) {
    return 1;
  }
  if (x.im < y.im) {
    return -1;
  }
  return 0;
}
var name$1K = "compareText";
var dependencies$1K = ["typed", "matrix", "concat"];
compareText$1.signature = "any, any";
var createCompareText = /* @__PURE__ */ factory(name$1K, dependencies$1K, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  } = _ref;
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  return typed2(name$1K, compareText$1, matrixAlgorithmSuite({
    elop: compareText$1,
    Ds: true
  }));
});
var name$1J = "equal";
var dependencies$1J = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat"];
var createEqual = /* @__PURE__ */ factory(name$1J, dependencies$1J, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var matAlgo03xDSf = createMatAlgo03xDSf({
    typed: typed2
  });
  var matAlgo07xSSf = createMatAlgo07xSSf({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  return typed2(name$1J, createEqualNumber({
    typed: typed2,
    equalScalar: equalScalar2
  }), matrixAlgorithmSuite({
    elop: equalScalar2,
    SS: matAlgo07xSSf,
    DS: matAlgo03xDSf,
    Ss: matAlgo12xSfs
  }));
});
var createEqualNumber = factory(name$1J, ["typed", "equalScalar"], (_ref2) => {
  var {
    typed: typed2,
    equalScalar: equalScalar2
  } = _ref2;
  return typed2(name$1J, {
    "any, any": function anyAny(x, y) {
      if (x === null) {
        return y === null;
      }
      if (y === null) {
        return x === null;
      }
      if (x === void 0) {
        return y === void 0;
      }
      if (y === void 0) {
        return x === void 0;
      }
      return equalScalar2(x, y);
    }
  });
});
var name$1I = "equalText";
var dependencies$1I = ["typed", "compareText", "isZero"];
var createEqualText = /* @__PURE__ */ factory(name$1I, dependencies$1I, (_ref) => {
  var {
    typed: typed2,
    compareText: compareText2,
    isZero: isZero2
  } = _ref;
  return typed2(name$1I, {
    "any, any": function anyAny(x, y) {
      return isZero2(compareText2(x, y));
    }
  });
});
var name$1H = "smaller";
var dependencies$1H = ["typed", "config", "matrix", "DenseMatrix", "concat"];
var createSmaller = /* @__PURE__ */ factory(name$1H, dependencies$1H, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    matrix: matrix2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var matAlgo03xDSf = createMatAlgo03xDSf({
    typed: typed2
  });
  var matAlgo07xSSf = createMatAlgo07xSSf({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  var compareUnits = createCompareUnits({
    typed: typed2
  });
  return typed2(name$1H, createSmallerNumber({
    typed: typed2,
    config: config3
  }), {
    "boolean, boolean": (x, y) => x < y,
    "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
      return x.lt(y) && !nearlyEqual(x, y, config3.epsilon);
    },
    "Fraction, Fraction": (x, y) => x.compare(y) === -1,
    "Complex, Complex": function ComplexComplex(x, y) {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, compareUnits, matrixAlgorithmSuite({
    SS: matAlgo07xSSf,
    DS: matAlgo03xDSf,
    Ss: matAlgo12xSfs
  }));
});
var createSmallerNumber = /* @__PURE__ */ factory(name$1H, ["typed", "config"], (_ref2) => {
  var {
    typed: typed2,
    config: config3
  } = _ref2;
  return typed2(name$1H, {
    "number, number": function numberNumber(x, y) {
      return x < y && !nearlyEqual$1(x, y, config3.epsilon);
    }
  });
});
var name$1G = "smallerEq";
var dependencies$1G = ["typed", "config", "matrix", "DenseMatrix", "concat"];
var createSmallerEq = /* @__PURE__ */ factory(name$1G, dependencies$1G, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    matrix: matrix2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var matAlgo03xDSf = createMatAlgo03xDSf({
    typed: typed2
  });
  var matAlgo07xSSf = createMatAlgo07xSSf({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  var compareUnits = createCompareUnits({
    typed: typed2
  });
  return typed2(name$1G, createSmallerEqNumber({
    typed: typed2,
    config: config3
  }), {
    "boolean, boolean": (x, y) => x <= y,
    "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
      return x.lte(y) || nearlyEqual(x, y, config3.epsilon);
    },
    "Fraction, Fraction": (x, y) => x.compare(y) !== 1,
    "Complex, Complex": function ComplexComplex() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, compareUnits, matrixAlgorithmSuite({
    SS: matAlgo07xSSf,
    DS: matAlgo03xDSf,
    Ss: matAlgo12xSfs
  }));
});
var createSmallerEqNumber = /* @__PURE__ */ factory(name$1G, ["typed", "config"], (_ref2) => {
  var {
    typed: typed2,
    config: config3
  } = _ref2;
  return typed2(name$1G, {
    "number, number": function numberNumber(x, y) {
      return x <= y || nearlyEqual$1(x, y, config3.epsilon);
    }
  });
});
var name$1F = "larger";
var dependencies$1F = ["typed", "config", "matrix", "DenseMatrix", "concat"];
var createLarger = /* @__PURE__ */ factory(name$1F, dependencies$1F, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    matrix: matrix2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var matAlgo03xDSf = createMatAlgo03xDSf({
    typed: typed2
  });
  var matAlgo07xSSf = createMatAlgo07xSSf({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  var compareUnits = createCompareUnits({
    typed: typed2
  });
  return typed2(name$1F, createLargerNumber({
    typed: typed2,
    config: config3
  }), {
    "boolean, boolean": (x, y) => x > y,
    "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
      return x.gt(y) && !nearlyEqual(x, y, config3.epsilon);
    },
    "Fraction, Fraction": (x, y) => x.compare(y) === 1,
    "Complex, Complex": function ComplexComplex() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, compareUnits, matrixAlgorithmSuite({
    SS: matAlgo07xSSf,
    DS: matAlgo03xDSf,
    Ss: matAlgo12xSfs
  }));
});
var createLargerNumber = /* @__PURE__ */ factory(name$1F, ["typed", "config"], (_ref2) => {
  var {
    typed: typed2,
    config: config3
  } = _ref2;
  return typed2(name$1F, {
    "number, number": function numberNumber(x, y) {
      return x > y && !nearlyEqual$1(x, y, config3.epsilon);
    }
  });
});
var name$1E = "largerEq";
var dependencies$1E = ["typed", "config", "matrix", "DenseMatrix", "concat"];
var createLargerEq = /* @__PURE__ */ factory(name$1E, dependencies$1E, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    matrix: matrix2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var matAlgo03xDSf = createMatAlgo03xDSf({
    typed: typed2
  });
  var matAlgo07xSSf = createMatAlgo07xSSf({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  var compareUnits = createCompareUnits({
    typed: typed2
  });
  return typed2(name$1E, createLargerEqNumber({
    typed: typed2,
    config: config3
  }), {
    "boolean, boolean": (x, y) => x >= y,
    "BigNumber, BigNumber": function BigNumberBigNumber(x, y) {
      return x.gte(y) || nearlyEqual(x, y, config3.epsilon);
    },
    "Fraction, Fraction": (x, y) => x.compare(y) !== -1,
    "Complex, Complex": function ComplexComplex() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, compareUnits, matrixAlgorithmSuite({
    SS: matAlgo07xSSf,
    DS: matAlgo03xDSf,
    Ss: matAlgo12xSfs
  }));
});
var createLargerEqNumber = /* @__PURE__ */ factory(name$1E, ["typed", "config"], (_ref2) => {
  var {
    typed: typed2,
    config: config3
  } = _ref2;
  return typed2(name$1E, {
    "number, number": function numberNumber(x, y) {
      return x >= y || nearlyEqual$1(x, y, config3.epsilon);
    }
  });
});
var name$1D = "deepEqual";
var dependencies$1D = ["typed", "equal"];
var createDeepEqual = /* @__PURE__ */ factory(name$1D, dependencies$1D, (_ref) => {
  var {
    typed: typed2,
    equal: equal2
  } = _ref;
  return typed2(name$1D, {
    "any, any": function anyAny(x, y) {
      return _deepEqual(x.valueOf(), y.valueOf());
    }
  });
  function _deepEqual(x, y) {
    if (Array.isArray(x)) {
      if (Array.isArray(y)) {
        var len = x.length;
        if (len !== y.length) {
          return false;
        }
        for (var i2 = 0; i2 < len; i2++) {
          if (!_deepEqual(x[i2], y[i2])) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    } else {
      if (Array.isArray(y)) {
        return false;
      } else {
        return equal2(x, y);
      }
    }
  }
});
var name$1C = "unequal";
var dependencies$1C = ["typed", "config", "equalScalar", "matrix", "DenseMatrix", "concat"];
var createUnequal = /* @__PURE__ */ factory(name$1C, dependencies$1C, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    equalScalar: equalScalar2,
    matrix: matrix2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var matAlgo03xDSf = createMatAlgo03xDSf({
    typed: typed2
  });
  var matAlgo07xSSf = createMatAlgo07xSSf({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  return typed2(name$1C, createUnequalNumber({
    typed: typed2,
    equalScalar: equalScalar2
  }), matrixAlgorithmSuite({
    elop: _unequal,
    SS: matAlgo07xSSf,
    DS: matAlgo03xDSf,
    Ss: matAlgo12xSfs
  }));
  function _unequal(x, y) {
    return !equalScalar2(x, y);
  }
});
var createUnequalNumber = factory(name$1C, ["typed", "equalScalar"], (_ref2) => {
  var {
    typed: typed2,
    equalScalar: equalScalar2
  } = _ref2;
  return typed2(name$1C, {
    "any, any": function anyAny(x, y) {
      if (x === null) {
        return y !== null;
      }
      if (y === null) {
        return x !== null;
      }
      if (x === void 0) {
        return y !== void 0;
      }
      if (y === void 0) {
        return x !== void 0;
      }
      return !equalScalar2(x, y);
    }
  });
});
var name$1B = "partitionSelect";
var dependencies$1B = ["typed", "isNumeric", "isNaN", "compare"];
var createPartitionSelect = /* @__PURE__ */ factory(name$1B, dependencies$1B, (_ref) => {
  var {
    typed: typed2,
    isNumeric: isNumeric2,
    isNaN: isNaN2,
    compare: compare2
  } = _ref;
  var asc = compare2;
  var desc = (a, b) => -compare2(a, b);
  return typed2(name$1B, {
    "Array | Matrix, number": function ArrayMatrixNumber(x, k) {
      return _partitionSelect(x, k, asc);
    },
    "Array | Matrix, number, string": function ArrayMatrixNumberString(x, k, compare3) {
      if (compare3 === "asc") {
        return _partitionSelect(x, k, asc);
      } else if (compare3 === "desc") {
        return _partitionSelect(x, k, desc);
      } else {
        throw new Error('Compare string must be "asc" or "desc"');
      }
    },
    "Array | Matrix, number, function": _partitionSelect
  });
  function _partitionSelect(x, k, compare3) {
    if (!isInteger$1(k) || k < 0) {
      throw new Error("k must be a non-negative integer");
    }
    if (isMatrix(x)) {
      var size2 = x.size();
      if (size2.length > 1) {
        throw new Error("Only one dimensional matrices supported");
      }
      return quickSelect(x.valueOf(), k, compare3);
    }
    if (Array.isArray(x)) {
      return quickSelect(x, k, compare3);
    }
  }
  function quickSelect(arr, k, compare3) {
    if (k >= arr.length) {
      throw new Error("k out of bounds");
    }
    for (var i2 = 0; i2 < arr.length; i2++) {
      if (isNumeric2(arr[i2]) && isNaN2(arr[i2])) {
        return arr[i2];
      }
    }
    var from = 0;
    var to2 = arr.length - 1;
    while (from < to2) {
      var r = from;
      var w = to2;
      var pivot = arr[Math.floor(Math.random() * (to2 - from + 1)) + from];
      while (r < w) {
        if (compare3(arr[r], pivot) >= 0) {
          var tmp = arr[w];
          arr[w] = arr[r];
          arr[r] = tmp;
          --w;
        } else {
          ++r;
        }
      }
      if (compare3(arr[r], pivot) > 0) {
        --r;
      }
      if (k <= r) {
        to2 = r;
      } else {
        from = r + 1;
      }
    }
    return arr[k];
  }
});
var name$1A = "sort";
var dependencies$1A = ["typed", "matrix", "compare", "compareNatural"];
var createSort = /* @__PURE__ */ factory(name$1A, dependencies$1A, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    compare: compare2,
    compareNatural: compareNatural2
  } = _ref;
  var compareAsc = compare2;
  var compareDesc = (a, b) => -compare2(a, b);
  return typed2(name$1A, {
    Array: function Array2(x) {
      _arrayIsVector(x);
      return x.sort(compareAsc);
    },
    Matrix: function Matrix2(x) {
      _matrixIsVector(x);
      return matrix2(x.toArray().sort(compareAsc), x.storage());
    },
    "Array, function": function ArrayFunction(x, _comparator2) {
      _arrayIsVector(x);
      return x.sort(_comparator2);
    },
    "Matrix, function": function MatrixFunction(x, _comparator2) {
      _matrixIsVector(x);
      return matrix2(x.toArray().sort(_comparator2), x.storage());
    },
    "Array, string": function ArrayString(x, order) {
      _arrayIsVector(x);
      return x.sort(_comparator(order));
    },
    "Matrix, string": function MatrixString(x, order) {
      _matrixIsVector(x);
      return matrix2(x.toArray().sort(_comparator(order)), x.storage());
    }
  });
  function _comparator(order) {
    if (order === "asc") {
      return compareAsc;
    } else if (order === "desc") {
      return compareDesc;
    } else if (order === "natural") {
      return compareNatural2;
    } else {
      throw new Error('String "asc", "desc", or "natural" expected');
    }
  }
  function _arrayIsVector(array) {
    if (arraySize(array).length !== 1) {
      throw new Error("One dimensional array expected");
    }
  }
  function _matrixIsVector(matrix3) {
    if (matrix3.size().length !== 1) {
      throw new Error("One dimensional matrix expected");
    }
  }
});
var name$1z = "max";
var dependencies$1z = ["typed", "config", "numeric", "larger"];
var createMax = /* @__PURE__ */ factory(name$1z, dependencies$1z, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    numeric: numeric2,
    larger: larger2
  } = _ref;
  return typed2(name$1z, {
    // max([a, b, c, d, ...])
    "Array | Matrix": _max,
    // max([a, b, c, d, ...], dim)
    "Array | Matrix, number | BigNumber": function ArrayMatrixNumberBigNumber(array, dim) {
      return reduce(array, dim.valueOf(), _largest);
    },
    // max(a, b, c, d, ...)
    "...": function _(args) {
      if (containsCollections(args)) {
        throw new TypeError("Scalar values expected in function max");
      }
      return _max(args);
    }
  });
  function _largest(x, y) {
    try {
      return larger2(x, y) ? x : y;
    } catch (err) {
      throw improveErrorMessage(err, "max", y);
    }
  }
  function _max(array) {
    var res;
    deepForEach(array, function(value) {
      try {
        if (isNaN(value) && typeof value === "number") {
          res = NaN;
        } else if (res === void 0 || larger2(value, res)) {
          res = value;
        }
      } catch (err) {
        throw improveErrorMessage(err, "max", value);
      }
    });
    if (res === void 0) {
      throw new Error("Cannot calculate max of an empty array");
    }
    if (typeof res === "string") {
      res = numeric2(res, config3.number);
    }
    return res;
  }
});
var name$1y = "min";
var dependencies$1y = ["typed", "config", "numeric", "smaller"];
var createMin = /* @__PURE__ */ factory(name$1y, dependencies$1y, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    numeric: numeric2,
    smaller: smaller2
  } = _ref;
  return typed2(name$1y, {
    // min([a, b, c, d, ...])
    "Array | Matrix": _min,
    // min([a, b, c, d, ...], dim)
    "Array | Matrix, number | BigNumber": function ArrayMatrixNumberBigNumber(array, dim) {
      return reduce(array, dim.valueOf(), _smallest);
    },
    // min(a, b, c, d, ...)
    "...": function _(args) {
      if (containsCollections(args)) {
        throw new TypeError("Scalar values expected in function min");
      }
      return _min(args);
    }
  });
  function _smallest(x, y) {
    try {
      return smaller2(x, y) ? x : y;
    } catch (err) {
      throw improveErrorMessage(err, "min", y);
    }
  }
  function _min(array) {
    var min2;
    deepForEach(array, function(value) {
      try {
        if (isNaN(value) && typeof value === "number") {
          min2 = NaN;
        } else if (min2 === void 0 || smaller2(value, min2)) {
          min2 = value;
        }
      } catch (err) {
        throw improveErrorMessage(err, "min", value);
      }
    });
    if (min2 === void 0) {
      throw new Error("Cannot calculate min of an empty array");
    }
    if (typeof min2 === "string") {
      min2 = numeric2(min2, config3.number);
    }
    return min2;
  }
});
var name$1x = "ImmutableDenseMatrix";
var dependencies$1x = ["smaller", "DenseMatrix"];
var createImmutableDenseMatrixClass = /* @__PURE__ */ factory(name$1x, dependencies$1x, (_ref) => {
  var {
    smaller: smaller2,
    DenseMatrix: DenseMatrix2
  } = _ref;
  function ImmutableDenseMatrix2(data, datatype) {
    if (!(this instanceof ImmutableDenseMatrix2)) {
      throw new SyntaxError("Constructor must be called with the new operator");
    }
    if (datatype && !isString(datatype)) {
      throw new Error("Invalid datatype: " + datatype);
    }
    if (isMatrix(data) || isArray(data)) {
      var matrix2 = new DenseMatrix2(data, datatype);
      this._data = matrix2._data;
      this._size = matrix2._size;
      this._datatype = matrix2._datatype;
      this._min = null;
      this._max = null;
    } else if (data && isArray(data.data) && isArray(data.size)) {
      this._data = data.data;
      this._size = data.size;
      this._datatype = data.datatype;
      this._min = typeof data.min !== "undefined" ? data.min : null;
      this._max = typeof data.max !== "undefined" ? data.max : null;
    } else if (data) {
      throw new TypeError("Unsupported type of data (" + typeOf$1(data) + ")");
    } else {
      this._data = [];
      this._size = [0];
      this._datatype = datatype;
      this._min = null;
      this._max = null;
    }
  }
  ImmutableDenseMatrix2.prototype = new DenseMatrix2();
  ImmutableDenseMatrix2.prototype.type = "ImmutableDenseMatrix";
  ImmutableDenseMatrix2.prototype.isImmutableDenseMatrix = true;
  ImmutableDenseMatrix2.prototype.subset = function(index2) {
    switch (arguments.length) {
      case 1: {
        var m = DenseMatrix2.prototype.subset.call(this, index2);
        if (isMatrix(m)) {
          return new ImmutableDenseMatrix2({
            data: m._data,
            size: m._size,
            datatype: m._datatype
          });
        }
        return m;
      }
      case 2:
      case 3:
        throw new Error("Cannot invoke set subset on an Immutable Matrix instance");
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  };
  ImmutableDenseMatrix2.prototype.set = function() {
    throw new Error("Cannot invoke set on an Immutable Matrix instance");
  };
  ImmutableDenseMatrix2.prototype.resize = function() {
    throw new Error("Cannot invoke resize on an Immutable Matrix instance");
  };
  ImmutableDenseMatrix2.prototype.reshape = function() {
    throw new Error("Cannot invoke reshape on an Immutable Matrix instance");
  };
  ImmutableDenseMatrix2.prototype.clone = function() {
    return new ImmutableDenseMatrix2({
      data: clone$3(this._data),
      size: clone$3(this._size),
      datatype: this._datatype
    });
  };
  ImmutableDenseMatrix2.prototype.toJSON = function() {
    return {
      mathjs: "ImmutableDenseMatrix",
      data: this._data,
      size: this._size,
      datatype: this._datatype
    };
  };
  ImmutableDenseMatrix2.fromJSON = function(json) {
    return new ImmutableDenseMatrix2(json);
  };
  ImmutableDenseMatrix2.prototype.swapRows = function() {
    throw new Error("Cannot invoke swapRows on an Immutable Matrix instance");
  };
  ImmutableDenseMatrix2.prototype.min = function() {
    if (this._min === null) {
      var m = null;
      this.forEach(function(v) {
        if (m === null || smaller2(v, m)) {
          m = v;
        }
      });
      this._min = m !== null ? m : void 0;
    }
    return this._min;
  };
  ImmutableDenseMatrix2.prototype.max = function() {
    if (this._max === null) {
      var m = null;
      this.forEach(function(v) {
        if (m === null || smaller2(m, v)) {
          m = v;
        }
      });
      this._max = m !== null ? m : void 0;
    }
    return this._max;
  };
  return ImmutableDenseMatrix2;
}, {
  isClass: true
});
var name$1w = "Index";
var dependencies$1w = ["ImmutableDenseMatrix", "getMatrixDataType"];
var createIndexClass = /* @__PURE__ */ factory(name$1w, dependencies$1w, (_ref) => {
  var {
    ImmutableDenseMatrix: ImmutableDenseMatrix2,
    getMatrixDataType: getMatrixDataType2
  } = _ref;
  function Index2(ranges) {
    if (!(this instanceof Index2)) {
      throw new SyntaxError("Constructor must be called with the new operator");
    }
    this._dimensions = [];
    this._sourceSize = [];
    this._isScalar = true;
    for (var i2 = 0, ii = arguments.length; i2 < ii; i2++) {
      var arg2 = arguments[i2];
      var argIsArray = isArray(arg2);
      var argIsMatrix = isMatrix(arg2);
      var sourceSize = null;
      if (isRange(arg2)) {
        this._dimensions.push(arg2);
        this._isScalar = false;
      } else if (argIsArray || argIsMatrix) {
        var m = void 0;
        if (getMatrixDataType2(arg2) === "boolean") {
          if (argIsArray)
            m = _createImmutableMatrix(_booleansArrayToNumbersForIndex(arg2).valueOf());
          if (argIsMatrix)
            m = _createImmutableMatrix(_booleansArrayToNumbersForIndex(arg2._data).valueOf());
          sourceSize = arg2.valueOf().length;
        } else {
          m = _createImmutableMatrix(arg2.valueOf());
        }
        this._dimensions.push(m);
        var size2 = m.size();
        if (size2.length !== 1 || size2[0] !== 1 || sourceSize !== null) {
          this._isScalar = false;
        }
      } else if (typeof arg2 === "number") {
        this._dimensions.push(_createImmutableMatrix([arg2]));
      } else if (typeof arg2 === "string") {
        this._dimensions.push(arg2);
      } else {
        throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");
      }
      this._sourceSize.push(sourceSize);
    }
  }
  Index2.prototype.type = "Index";
  Index2.prototype.isIndex = true;
  function _createImmutableMatrix(arg2) {
    for (var i2 = 0, l = arg2.length; i2 < l; i2++) {
      if (typeof arg2[i2] !== "number" || !isInteger$1(arg2[i2])) {
        throw new TypeError("Index parameters must be positive integer numbers");
      }
    }
    return new ImmutableDenseMatrix2(arg2);
  }
  Index2.prototype.clone = function() {
    var index2 = new Index2();
    index2._dimensions = clone$3(this._dimensions);
    index2._isScalar = this._isScalar;
    index2._sourceSize = this._sourceSize;
    return index2;
  };
  Index2.create = function(ranges) {
    var index2 = new Index2();
    Index2.apply(index2, ranges);
    return index2;
  };
  Index2.prototype.size = function() {
    var size2 = [];
    for (var i2 = 0, ii = this._dimensions.length; i2 < ii; i2++) {
      var d = this._dimensions[i2];
      size2[i2] = typeof d === "string" ? 1 : d.size()[0];
    }
    return size2;
  };
  Index2.prototype.max = function() {
    var values = [];
    for (var i2 = 0, ii = this._dimensions.length; i2 < ii; i2++) {
      var range2 = this._dimensions[i2];
      values[i2] = typeof range2 === "string" ? range2 : range2.max();
    }
    return values;
  };
  Index2.prototype.min = function() {
    var values = [];
    for (var i2 = 0, ii = this._dimensions.length; i2 < ii; i2++) {
      var range2 = this._dimensions[i2];
      values[i2] = typeof range2 === "string" ? range2 : range2.min();
    }
    return values;
  };
  Index2.prototype.forEach = function(callback) {
    for (var i2 = 0, ii = this._dimensions.length; i2 < ii; i2++) {
      callback(this._dimensions[i2], i2, this);
    }
  };
  Index2.prototype.dimension = function(dim) {
    return this._dimensions[dim] || null;
  };
  Index2.prototype.isObjectProperty = function() {
    return this._dimensions.length === 1 && typeof this._dimensions[0] === "string";
  };
  Index2.prototype.getObjectProperty = function() {
    return this.isObjectProperty() ? this._dimensions[0] : null;
  };
  Index2.prototype.isScalar = function() {
    return this._isScalar;
  };
  Index2.prototype.toArray = function() {
    var array = [];
    for (var i2 = 0, ii = this._dimensions.length; i2 < ii; i2++) {
      var dimension = this._dimensions[i2];
      array.push(typeof dimension === "string" ? dimension : dimension.toArray());
    }
    return array;
  };
  Index2.prototype.valueOf = Index2.prototype.toArray;
  Index2.prototype.toString = function() {
    var strings = [];
    for (var i2 = 0, ii = this._dimensions.length; i2 < ii; i2++) {
      var dimension = this._dimensions[i2];
      if (typeof dimension === "string") {
        strings.push(JSON.stringify(dimension));
      } else {
        strings.push(dimension.toString());
      }
    }
    return "[" + strings.join(", ") + "]";
  };
  Index2.prototype.toJSON = function() {
    return {
      mathjs: "Index",
      dimensions: this._dimensions
    };
  };
  Index2.fromJSON = function(json) {
    return Index2.create(json.dimensions);
  };
  return Index2;
}, {
  isClass: true
});
function _booleansArrayToNumbersForIndex(booleanArrayIndex) {
  var indexOfNumbers = [];
  booleanArrayIndex.forEach((bool, idx) => {
    if (bool) {
      indexOfNumbers.push(idx);
    }
  });
  return indexOfNumbers;
}
var name$1v = "FibonacciHeap";
var dependencies$1v = ["smaller", "larger"];
var createFibonacciHeapClass = /* @__PURE__ */ factory(name$1v, dependencies$1v, (_ref) => {
  var {
    smaller: smaller2,
    larger: larger2
  } = _ref;
  var oneOverLogPhi = 1 / Math.log((1 + Math.sqrt(5)) / 2);
  function FibonacciHeap2() {
    if (!(this instanceof FibonacciHeap2)) {
      throw new SyntaxError("Constructor must be called with the new operator");
    }
    this._minimum = null;
    this._size = 0;
  }
  FibonacciHeap2.prototype.type = "FibonacciHeap";
  FibonacciHeap2.prototype.isFibonacciHeap = true;
  FibonacciHeap2.prototype.insert = function(key, value) {
    var node = {
      key,
      value,
      degree: 0
    };
    if (this._minimum) {
      var minimum = this._minimum;
      node.left = minimum;
      node.right = minimum.right;
      minimum.right = node;
      node.right.left = node;
      if (smaller2(key, minimum.key)) {
        this._minimum = node;
      }
    } else {
      node.left = node;
      node.right = node;
      this._minimum = node;
    }
    this._size++;
    return node;
  };
  FibonacciHeap2.prototype.size = function() {
    return this._size;
  };
  FibonacciHeap2.prototype.clear = function() {
    this._minimum = null;
    this._size = 0;
  };
  FibonacciHeap2.prototype.isEmpty = function() {
    return this._size === 0;
  };
  FibonacciHeap2.prototype.extractMinimum = function() {
    var node = this._minimum;
    if (node === null) {
      return node;
    }
    var minimum = this._minimum;
    var numberOfChildren = node.degree;
    var x = node.child;
    while (numberOfChildren > 0) {
      var tempRight = x.right;
      x.left.right = x.right;
      x.right.left = x.left;
      x.left = minimum;
      x.right = minimum.right;
      minimum.right = x;
      x.right.left = x;
      x.parent = null;
      x = tempRight;
      numberOfChildren--;
    }
    node.left.right = node.right;
    node.right.left = node.left;
    if (node === node.right) {
      minimum = null;
    } else {
      minimum = node.right;
      minimum = _findMinimumNode(minimum, this._size);
    }
    this._size--;
    this._minimum = minimum;
    return node;
  };
  FibonacciHeap2.prototype.remove = function(node) {
    this._minimum = _decreaseKey(this._minimum, node, -1);
    this.extractMinimum();
  };
  function _decreaseKey(minimum, node, key) {
    node.key = key;
    var parent = node.parent;
    if (parent && smaller2(node.key, parent.key)) {
      _cut(minimum, node, parent);
      _cascadingCut(minimum, parent);
    }
    if (smaller2(node.key, minimum.key)) {
      minimum = node;
    }
    return minimum;
  }
  function _cut(minimum, node, parent) {
    node.left.right = node.right;
    node.right.left = node.left;
    parent.degree--;
    if (parent.child === node) {
      parent.child = node.right;
    }
    if (parent.degree === 0) {
      parent.child = null;
    }
    node.left = minimum;
    node.right = minimum.right;
    minimum.right = node;
    node.right.left = node;
    node.parent = null;
    node.mark = false;
  }
  function _cascadingCut(minimum, node) {
    var parent = node.parent;
    if (!parent) {
      return;
    }
    if (!node.mark) {
      node.mark = true;
    } else {
      _cut(minimum, node, parent);
      _cascadingCut(parent);
    }
  }
  var _linkNodes = function _linkNodes2(node, parent) {
    node.left.right = node.right;
    node.right.left = node.left;
    node.parent = parent;
    if (!parent.child) {
      parent.child = node;
      node.right = node;
      node.left = node;
    } else {
      node.left = parent.child;
      node.right = parent.child.right;
      parent.child.right = node;
      node.right.left = node;
    }
    parent.degree++;
    node.mark = false;
  };
  function _findMinimumNode(minimum, size2) {
    var arraySize2 = Math.floor(Math.log(size2) * oneOverLogPhi) + 1;
    var array = new Array(arraySize2);
    var numRoots = 0;
    var x = minimum;
    if (x) {
      numRoots++;
      x = x.right;
      while (x !== minimum) {
        numRoots++;
        x = x.right;
      }
    }
    var y;
    while (numRoots > 0) {
      var d = x.degree;
      var next = x.right;
      while (true) {
        y = array[d];
        if (!y) {
          break;
        }
        if (larger2(x.key, y.key)) {
          var temp = y;
          y = x;
          x = temp;
        }
        _linkNodes(y, x);
        array[d] = null;
        d++;
      }
      array[d] = x;
      x = next;
      numRoots--;
    }
    minimum = null;
    for (var i2 = 0; i2 < arraySize2; i2++) {
      y = array[i2];
      if (!y) {
        continue;
      }
      if (minimum) {
        y.left.right = y.right;
        y.right.left = y.left;
        y.left = minimum;
        y.right = minimum.right;
        minimum.right = y;
        y.right.left = y;
        if (smaller2(y.key, minimum.key)) {
          minimum = y;
        }
      } else {
        minimum = y;
      }
    }
    return minimum;
  }
  return FibonacciHeap2;
}, {
  isClass: true
});
var name$1u = "Spa";
var dependencies$1u = ["addScalar", "equalScalar", "FibonacciHeap"];
var createSpaClass = /* @__PURE__ */ factory(name$1u, dependencies$1u, (_ref) => {
  var {
    addScalar: addScalar2,
    equalScalar: equalScalar2,
    FibonacciHeap: FibonacciHeap2
  } = _ref;
  function Spa2() {
    if (!(this instanceof Spa2)) {
      throw new SyntaxError("Constructor must be called with the new operator");
    }
    this._values = [];
    this._heap = new FibonacciHeap2();
  }
  Spa2.prototype.type = "Spa";
  Spa2.prototype.isSpa = true;
  Spa2.prototype.set = function(i2, v) {
    if (!this._values[i2]) {
      var node = this._heap.insert(i2, v);
      this._values[i2] = node;
    } else {
      this._values[i2].value = v;
    }
  };
  Spa2.prototype.get = function(i2) {
    var node = this._values[i2];
    if (node) {
      return node.value;
    }
    return 0;
  };
  Spa2.prototype.accumulate = function(i2, v) {
    var node = this._values[i2];
    if (!node) {
      node = this._heap.insert(i2, v);
      this._values[i2] = node;
    } else {
      node.value = addScalar2(node.value, v);
    }
  };
  Spa2.prototype.forEach = function(from, to2, callback) {
    var heap = this._heap;
    var values = this._values;
    var nodes = [];
    var node = heap.extractMinimum();
    if (node) {
      nodes.push(node);
    }
    while (node && node.key <= to2) {
      if (node.key >= from) {
        if (!equalScalar2(node.value, 0)) {
          callback(node.key, node.value, this);
        }
      }
      node = heap.extractMinimum();
      if (node) {
        nodes.push(node);
      }
    }
    for (var i2 = 0; i2 < nodes.length; i2++) {
      var n = nodes[i2];
      node = heap.insert(n.key, n.value);
      values[node.key] = node;
    }
  };
  Spa2.prototype.swap = function(i2, j) {
    var nodei = this._values[i2];
    var nodej = this._values[j];
    if (!nodei && nodej) {
      nodei = this._heap.insert(i2, nodej.value);
      this._heap.remove(nodej);
      this._values[i2] = nodei;
      this._values[j] = void 0;
    } else if (nodei && !nodej) {
      nodej = this._heap.insert(j, nodei.value);
      this._heap.remove(nodei);
      this._values[j] = nodej;
      this._values[i2] = void 0;
    } else if (nodei && nodej) {
      var v = nodei.value;
      nodei.value = nodej.value;
      nodej.value = v;
    }
  };
  return Spa2;
}, {
  isClass: true
});
var createBigNumberE = memoize(function(BigNumber2) {
  return new BigNumber2(1).exp();
}, {
  hasher
});
var createBigNumberPhi = memoize(function(BigNumber2) {
  return new BigNumber2(1).plus(new BigNumber2(5).sqrt()).div(2);
}, {
  hasher
});
var createBigNumberPi = memoize(function(BigNumber2) {
  return BigNumber2.acos(-1);
}, {
  hasher
});
var createBigNumberTau = memoize(function(BigNumber2) {
  return createBigNumberPi(BigNumber2).times(2);
}, {
  hasher
});
function hasher(args) {
  return args[0].precision;
}
function ownKeys(e2, r) {
  var t = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e2);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e2, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e2) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e2, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e2, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e2;
}
var name$1t = "Unit";
var dependencies$1t = ["?on", "config", "addScalar", "subtractScalar", "multiplyScalar", "divideScalar", "pow", "abs", "fix", "round", "equal", "isNumeric", "format", "number", "Complex", "BigNumber", "Fraction"];
var createUnitClass = /* @__PURE__ */ factory(name$1t, dependencies$1t, (_ref) => {
  var {
    on,
    config: config3,
    addScalar: addScalar2,
    subtractScalar: subtractScalar2,
    multiplyScalar: multiplyScalar2,
    divideScalar: divideScalar2,
    pow: pow2,
    abs: abs2,
    fix: fix2,
    round: round2,
    equal: equal2,
    isNumeric: isNumeric2,
    format: format2,
    number: _number,
    Complex: Complex2,
    BigNumber: _BigNumber,
    Fraction: _Fraction
  } = _ref;
  var toNumber = _number;
  function Unit2(value, valuelessUnit) {
    if (!(this instanceof Unit2)) {
      throw new Error("Constructor must be called with the new operator");
    }
    if (!(value === null || value === void 0 || isNumeric2(value) || isComplex(value))) {
      throw new TypeError("First parameter in Unit constructor must be number, BigNumber, Fraction, Complex, or undefined");
    }
    this.fixPrefix = false;
    this.skipAutomaticSimplification = true;
    if (valuelessUnit === void 0) {
      this.units = [];
      this.dimensions = BASE_DIMENSIONS.map((x) => 0);
    } else if (typeof valuelessUnit === "string") {
      var u = Unit2.parse(valuelessUnit);
      this.units = u.units;
      this.dimensions = u.dimensions;
    } else if (isUnit(valuelessUnit) && valuelessUnit.value === null) {
      this.fixPrefix = valuelessUnit.fixPrefix;
      this.skipAutomaticSimplification = valuelessUnit.skipAutomaticSimplification;
      this.dimensions = valuelessUnit.dimensions.slice(0);
      this.units = valuelessUnit.units.map((u2) => _extends({}, u2));
    } else {
      throw new TypeError("Second parameter in Unit constructor must be a string or valueless Unit");
    }
    this.value = this._normalize(value);
  }
  Object.defineProperty(Unit2, "name", {
    value: "Unit"
  });
  Unit2.prototype.constructor = Unit2;
  Unit2.prototype.type = "Unit";
  Unit2.prototype.isUnit = true;
  var text, index2, c;
  function skipWhitespace() {
    while (c === " " || c === "	") {
      next();
    }
  }
  function isDigitDot(c2) {
    return c2 >= "0" && c2 <= "9" || c2 === ".";
  }
  function isDigit(c2) {
    return c2 >= "0" && c2 <= "9";
  }
  function next() {
    index2++;
    c = text.charAt(index2);
  }
  function revert(oldIndex) {
    index2 = oldIndex;
    c = text.charAt(index2);
  }
  function parseNumber() {
    var number2 = "";
    var oldIndex = index2;
    if (c === "+") {
      next();
    } else if (c === "-") {
      number2 += c;
      next();
    }
    if (!isDigitDot(c)) {
      revert(oldIndex);
      return null;
    }
    if (c === ".") {
      number2 += c;
      next();
      if (!isDigit(c)) {
        revert(oldIndex);
        return null;
      }
    } else {
      while (isDigit(c)) {
        number2 += c;
        next();
      }
      if (c === ".") {
        number2 += c;
        next();
      }
    }
    while (isDigit(c)) {
      number2 += c;
      next();
    }
    if (c === "E" || c === "e") {
      var tentativeNumber = "";
      var tentativeIndex = index2;
      tentativeNumber += c;
      next();
      if (c === "+" || c === "-") {
        tentativeNumber += c;
        next();
      }
      if (!isDigit(c)) {
        revert(tentativeIndex);
        return number2;
      }
      number2 = number2 + tentativeNumber;
      while (isDigit(c)) {
        number2 += c;
        next();
      }
    }
    return number2;
  }
  function parseUnit() {
    var unitName = "";
    while (isDigit(c) || Unit2.isValidAlpha(c)) {
      unitName += c;
      next();
    }
    var firstC = unitName.charAt(0);
    if (Unit2.isValidAlpha(firstC)) {
      return unitName;
    } else {
      return null;
    }
  }
  function parseCharacter(toFind) {
    if (c === toFind) {
      next();
      return toFind;
    } else {
      return null;
    }
  }
  Unit2.parse = function(str, options) {
    options = options || {};
    text = str;
    index2 = -1;
    c = "";
    if (typeof text !== "string") {
      throw new TypeError("Invalid argument in Unit.parse, string expected");
    }
    var unit3 = new Unit2();
    unit3.units = [];
    var powerMultiplierCurrent = 1;
    var expectingUnit = false;
    next();
    skipWhitespace();
    var valueStr = parseNumber();
    var value = null;
    if (valueStr) {
      if (config3.number === "BigNumber") {
        value = new _BigNumber(valueStr);
      } else if (config3.number === "Fraction") {
        try {
          value = new _Fraction(valueStr);
        } catch (err) {
          value = parseFloat(valueStr);
        }
      } else {
        value = parseFloat(valueStr);
      }
      skipWhitespace();
      if (parseCharacter("*")) {
        powerMultiplierCurrent = 1;
        expectingUnit = true;
      } else if (parseCharacter("/")) {
        powerMultiplierCurrent = -1;
        expectingUnit = true;
      }
    }
    var powerMultiplierStack = [];
    var powerMultiplierStackProduct = 1;
    while (true) {
      skipWhitespace();
      while (c === "(") {
        powerMultiplierStack.push(powerMultiplierCurrent);
        powerMultiplierStackProduct *= powerMultiplierCurrent;
        powerMultiplierCurrent = 1;
        next();
        skipWhitespace();
      }
      var uStr = void 0;
      if (c) {
        var oldC = c;
        uStr = parseUnit();
        if (uStr === null) {
          throw new SyntaxError('Unexpected "' + oldC + '" in "' + text + '" at index ' + index2.toString());
        }
      } else {
        break;
      }
      var res = _findUnit(uStr);
      if (res === null) {
        throw new SyntaxError('Unit "' + uStr + '" not found.');
      }
      var power = powerMultiplierCurrent * powerMultiplierStackProduct;
      skipWhitespace();
      if (parseCharacter("^")) {
        skipWhitespace();
        var p = parseNumber();
        if (p === null) {
          throw new SyntaxError('In "' + str + '", "^" must be followed by a floating-point number');
        }
        power *= p;
      }
      unit3.units.push({
        unit: res.unit,
        prefix: res.prefix,
        power
      });
      for (var i2 = 0; i2 < BASE_DIMENSIONS.length; i2++) {
        unit3.dimensions[i2] += (res.unit.dimensions[i2] || 0) * power;
      }
      skipWhitespace();
      while (c === ")") {
        if (powerMultiplierStack.length === 0) {
          throw new SyntaxError('Unmatched ")" in "' + text + '" at index ' + index2.toString());
        }
        powerMultiplierStackProduct /= powerMultiplierStack.pop();
        next();
        skipWhitespace();
      }
      expectingUnit = false;
      if (parseCharacter("*")) {
        powerMultiplierCurrent = 1;
        expectingUnit = true;
      } else if (parseCharacter("/")) {
        powerMultiplierCurrent = -1;
        expectingUnit = true;
      } else {
        powerMultiplierCurrent = 1;
      }
      if (res.unit.base) {
        var baseDim = res.unit.base.key;
        UNIT_SYSTEMS.auto[baseDim] = {
          unit: res.unit,
          prefix: res.prefix
        };
      }
    }
    skipWhitespace();
    if (c) {
      throw new SyntaxError('Could not parse: "' + str + '"');
    }
    if (expectingUnit) {
      throw new SyntaxError('Trailing characters: "' + str + '"');
    }
    if (powerMultiplierStack.length !== 0) {
      throw new SyntaxError('Unmatched "(" in "' + text + '"');
    }
    if (unit3.units.length === 0 && !options.allowNoUnits) {
      throw new SyntaxError('"' + str + '" contains no units');
    }
    unit3.value = value !== void 0 ? unit3._normalize(value) : null;
    return unit3;
  };
  Unit2.prototype.clone = function() {
    var unit3 = new Unit2();
    unit3.fixPrefix = this.fixPrefix;
    unit3.skipAutomaticSimplification = this.skipAutomaticSimplification;
    unit3.value = clone$3(this.value);
    unit3.dimensions = this.dimensions.slice(0);
    unit3.units = [];
    for (var i2 = 0; i2 < this.units.length; i2++) {
      unit3.units[i2] = {};
      for (var p in this.units[i2]) {
        if (hasOwnProperty(this.units[i2], p)) {
          unit3.units[i2][p] = this.units[i2][p];
        }
      }
    }
    return unit3;
  };
  Unit2.prototype.valueType = function() {
    return typeOf$1(this.value);
  };
  Unit2.prototype._isDerived = function() {
    if (this.units.length === 0) {
      return false;
    }
    return this.units.length > 1 || Math.abs(this.units[0].power - 1) > 1e-15;
  };
  Unit2.prototype._normalize = function(value) {
    if (value === null || value === void 0 || this.units.length === 0) {
      return value;
    }
    var res = value;
    var convert = Unit2._getNumberConverter(typeOf$1(value));
    for (var i2 = 0; i2 < this.units.length; i2++) {
      var unitValue = convert(this.units[i2].unit.value);
      var unitPrefixValue = convert(this.units[i2].prefix.value);
      var unitPower = convert(this.units[i2].power);
      res = multiplyScalar2(res, pow2(multiplyScalar2(unitValue, unitPrefixValue), unitPower));
    }
    return res;
  };
  Unit2.prototype._denormalize = function(value, prefixValue) {
    if (value === null || value === void 0 || this.units.length === 0) {
      return value;
    }
    var res = value;
    var convert = Unit2._getNumberConverter(typeOf$1(value));
    for (var i2 = 0; i2 < this.units.length; i2++) {
      var unitValue = convert(this.units[i2].unit.value);
      var unitPrefixValue = convert(this.units[i2].prefix.value);
      var unitPower = convert(this.units[i2].power);
      res = divideScalar2(res, pow2(multiplyScalar2(unitValue, unitPrefixValue), unitPower));
    }
    return res;
  };
  var _findUnit = memoize((str) => {
    if (hasOwnProperty(UNITS, str)) {
      var unit3 = UNITS[str];
      var prefix = unit3.prefixes[""];
      return {
        unit: unit3,
        prefix
      };
    }
    for (var _name in UNITS) {
      if (hasOwnProperty(UNITS, _name)) {
        if (endsWith(str, _name)) {
          var _unit = UNITS[_name];
          var prefixLen = str.length - _name.length;
          var prefixName = str.substring(0, prefixLen);
          var _prefix = hasOwnProperty(_unit.prefixes, prefixName) ? _unit.prefixes[prefixName] : void 0;
          if (_prefix !== void 0) {
            return {
              unit: _unit,
              prefix: _prefix
            };
          }
        }
      }
    }
    return null;
  }, {
    hasher: (args) => args[0],
    limit: 100
  });
  Unit2.isValuelessUnit = function(name2) {
    return _findUnit(name2) !== null;
  };
  Unit2.prototype.hasBase = function(base) {
    if (typeof base === "string") {
      base = BASE_UNITS[base];
    }
    if (!base) {
      return false;
    }
    for (var i2 = 0; i2 < BASE_DIMENSIONS.length; i2++) {
      if (Math.abs((this.dimensions[i2] || 0) - (base.dimensions[i2] || 0)) > 1e-12) {
        return false;
      }
    }
    return true;
  };
  Unit2.prototype.equalBase = function(other) {
    for (var i2 = 0; i2 < BASE_DIMENSIONS.length; i2++) {
      if (Math.abs((this.dimensions[i2] || 0) - (other.dimensions[i2] || 0)) > 1e-12) {
        return false;
      }
    }
    return true;
  };
  Unit2.prototype.equals = function(other) {
    return this.equalBase(other) && equal2(this.value, other.value);
  };
  Unit2.prototype.multiply = function(_other) {
    var res = this.clone();
    var other = isUnit(_other) ? _other : new Unit2(_other);
    for (var i2 = 0; i2 < BASE_DIMENSIONS.length; i2++) {
      res.dimensions[i2] = (this.dimensions[i2] || 0) + (other.dimensions[i2] || 0);
    }
    for (var _i = 0; _i < other.units.length; _i++) {
      var inverted = _objectSpread({}, other.units[_i]);
      res.units.push(inverted);
    }
    if (this.value !== null || other.value !== null) {
      var valThis = this.value === null ? this._normalize(1) : this.value;
      var valOther = other.value === null ? other._normalize(1) : other.value;
      res.value = multiplyScalar2(valThis, valOther);
    } else {
      res.value = null;
    }
    if (isUnit(_other)) {
      res.skipAutomaticSimplification = false;
    }
    return getNumericIfUnitless(res);
  };
  Unit2.prototype.divideInto = function(numerator) {
    return new Unit2(numerator).divide(this);
  };
  Unit2.prototype.divide = function(_other) {
    var res = this.clone();
    var other = isUnit(_other) ? _other : new Unit2(_other);
    for (var i2 = 0; i2 < BASE_DIMENSIONS.length; i2++) {
      res.dimensions[i2] = (this.dimensions[i2] || 0) - (other.dimensions[i2] || 0);
    }
    for (var _i2 = 0; _i2 < other.units.length; _i2++) {
      var inverted = _objectSpread(_objectSpread({}, other.units[_i2]), {}, {
        power: -other.units[_i2].power
      });
      res.units.push(inverted);
    }
    if (this.value !== null || other.value !== null) {
      var valThis = this.value === null ? this._normalize(1) : this.value;
      var valOther = other.value === null ? other._normalize(1) : other.value;
      res.value = divideScalar2(valThis, valOther);
    } else {
      res.value = null;
    }
    if (isUnit(_other)) {
      res.skipAutomaticSimplification = false;
    }
    return getNumericIfUnitless(res);
  };
  Unit2.prototype.pow = function(p) {
    var res = this.clone();
    for (var i2 = 0; i2 < BASE_DIMENSIONS.length; i2++) {
      res.dimensions[i2] = (this.dimensions[i2] || 0) * p;
    }
    for (var _i3 = 0; _i3 < res.units.length; _i3++) {
      res.units[_i3].power *= p;
    }
    if (res.value !== null) {
      res.value = pow2(res.value, p);
    } else {
      res.value = null;
    }
    res.skipAutomaticSimplification = false;
    return getNumericIfUnitless(res);
  };
  function getNumericIfUnitless(unit3) {
    if (unit3.equalBase(BASE_UNITS.NONE) && unit3.value !== null && !config3.predictable) {
      return unit3.value;
    } else {
      return unit3;
    }
  }
  Unit2.prototype.abs = function() {
    var ret = this.clone();
    if (ret.value !== null) {
      if (ret._isDerived() || ret.units.length === 0 || ret.units[0].unit.offset === 0) {
        ret.value = abs2(ret.value);
      } else {
        var convert = ret._numberConverter();
        var unitValue = convert(ret.units[0].unit.value);
        var nominalOffset = convert(ret.units[0].unit.offset);
        var unitOffset = multiplyScalar2(unitValue, nominalOffset);
        ret.value = subtractScalar2(abs2(addScalar2(ret.value, unitOffset)), unitOffset);
      }
    }
    for (var i2 in ret.units) {
      if (ret.units[i2].unit.name === "VA" || ret.units[i2].unit.name === "VAR") {
        ret.units[i2].unit = UNITS.W;
      }
    }
    return ret;
  };
  Unit2.prototype.to = function(valuelessUnit) {
    var value = this.value === null ? this._normalize(1) : this.value;
    var other;
    if (typeof valuelessUnit === "string") {
      other = Unit2.parse(valuelessUnit);
    } else if (isUnit(valuelessUnit)) {
      other = valuelessUnit.clone();
    } else {
      throw new Error("String or Unit expected as parameter");
    }
    if (!this.equalBase(other)) {
      throw new Error("Units do not match ('".concat(other.toString(), "' != '").concat(this.toString(), "')"));
    }
    if (other.value !== null) {
      throw new Error("Cannot convert to a unit with a value");
    }
    if (this.value === null || this._isDerived() || this.units.length === 0 || other.units.length === 0 || this.units[0].unit.offset === other.units[0].unit.offset) {
      other.value = clone$3(value);
    } else {
      var convert = Unit2._getNumberConverter(typeOf$1(value));
      var thisUnitValue = this.units[0].unit.value;
      var thisNominalOffset = this.units[0].unit.offset;
      var thisUnitOffset = multiplyScalar2(thisUnitValue, thisNominalOffset);
      var otherUnitValue = other.units[0].unit.value;
      var otherNominalOffset = other.units[0].unit.offset;
      var otherUnitOffset = multiplyScalar2(otherUnitValue, otherNominalOffset);
      other.value = addScalar2(value, convert(subtractScalar2(thisUnitOffset, otherUnitOffset)));
    }
    other.fixPrefix = true;
    other.skipAutomaticSimplification = true;
    return other;
  };
  Unit2.prototype.toNumber = function(valuelessUnit) {
    return toNumber(this.toNumeric(valuelessUnit));
  };
  Unit2.prototype.toNumeric = function(valuelessUnit) {
    var other;
    if (valuelessUnit) {
      other = this.to(valuelessUnit);
    } else {
      other = this.clone();
    }
    if (other._isDerived() || other.units.length === 0) {
      return other._denormalize(other.value);
    } else {
      return other._denormalize(other.value, other.units[0].prefix.value);
    }
  };
  Unit2.prototype.toString = function() {
    return this.format();
  };
  Unit2.prototype.toJSON = function() {
    return {
      mathjs: "Unit",
      value: this._denormalize(this.value),
      unit: this.units.length > 0 ? this.formatUnits() : null,
      fixPrefix: this.fixPrefix
    };
  };
  Unit2.fromJSON = function(json) {
    var _json$unit;
    var unit3 = new Unit2(json.value, (_json$unit = json.unit) !== null && _json$unit !== void 0 ? _json$unit : void 0);
    unit3.fixPrefix = json.fixPrefix || false;
    return unit3;
  };
  Unit2.prototype.valueOf = Unit2.prototype.toString;
  Unit2.prototype.simplify = function() {
    var ret = this.clone();
    var proposedUnitList = [];
    var matchingBase;
    for (var key2 in currentUnitSystem) {
      if (hasOwnProperty(currentUnitSystem, key2)) {
        if (ret.hasBase(BASE_UNITS[key2])) {
          matchingBase = key2;
          break;
        }
      }
    }
    if (matchingBase === "NONE") {
      ret.units = [];
    } else {
      var matchingUnit;
      if (matchingBase) {
        if (hasOwnProperty(currentUnitSystem, matchingBase)) {
          matchingUnit = currentUnitSystem[matchingBase];
        }
      }
      if (matchingUnit) {
        ret.units = [{
          unit: matchingUnit.unit,
          prefix: matchingUnit.prefix,
          power: 1
        }];
      } else {
        var missingBaseDim = false;
        for (var i2 = 0; i2 < BASE_DIMENSIONS.length; i2++) {
          var baseDim = BASE_DIMENSIONS[i2];
          if (Math.abs(ret.dimensions[i2] || 0) > 1e-12) {
            if (hasOwnProperty(currentUnitSystem, baseDim)) {
              proposedUnitList.push({
                unit: currentUnitSystem[baseDim].unit,
                prefix: currentUnitSystem[baseDim].prefix,
                power: ret.dimensions[i2] || 0
              });
            } else {
              missingBaseDim = true;
            }
          }
        }
        if (proposedUnitList.length < ret.units.length && !missingBaseDim) {
          ret.units = proposedUnitList;
        }
      }
    }
    return ret;
  };
  Unit2.prototype.toSI = function() {
    var ret = this.clone();
    var proposedUnitList = [];
    for (var i2 = 0; i2 < BASE_DIMENSIONS.length; i2++) {
      var baseDim = BASE_DIMENSIONS[i2];
      if (Math.abs(ret.dimensions[i2] || 0) > 1e-12) {
        if (hasOwnProperty(UNIT_SYSTEMS.si, baseDim)) {
          proposedUnitList.push({
            unit: UNIT_SYSTEMS.si[baseDim].unit,
            prefix: UNIT_SYSTEMS.si[baseDim].prefix,
            power: ret.dimensions[i2] || 0
          });
        } else {
          throw new Error("Cannot express custom unit " + baseDim + " in SI units");
        }
      }
    }
    ret.units = proposedUnitList;
    ret.fixPrefix = true;
    ret.skipAutomaticSimplification = true;
    if (this.value !== null) {
      ret.value = null;
      return this.to(ret);
    }
    return ret;
  };
  Unit2.prototype.formatUnits = function() {
    var strNum = "";
    var strDen = "";
    var nNum = 0;
    var nDen = 0;
    for (var i2 = 0; i2 < this.units.length; i2++) {
      if (this.units[i2].power > 0) {
        nNum++;
        strNum += " " + this.units[i2].prefix.name + this.units[i2].unit.name;
        if (Math.abs(this.units[i2].power - 1) > 1e-15) {
          strNum += "^" + this.units[i2].power;
        }
      } else if (this.units[i2].power < 0) {
        nDen++;
      }
    }
    if (nDen > 0) {
      for (var _i4 = 0; _i4 < this.units.length; _i4++) {
        if (this.units[_i4].power < 0) {
          if (nNum > 0) {
            strDen += " " + this.units[_i4].prefix.name + this.units[_i4].unit.name;
            if (Math.abs(this.units[_i4].power + 1) > 1e-15) {
              strDen += "^" + -this.units[_i4].power;
            }
          } else {
            strDen += " " + this.units[_i4].prefix.name + this.units[_i4].unit.name;
            strDen += "^" + this.units[_i4].power;
          }
        }
      }
    }
    strNum = strNum.substr(1);
    strDen = strDen.substr(1);
    if (nNum > 1 && nDen > 0) {
      strNum = "(" + strNum + ")";
    }
    if (nDen > 1 && nNum > 0) {
      strDen = "(" + strDen + ")";
    }
    var str = strNum;
    if (nNum > 0 && nDen > 0) {
      str += " / ";
    }
    str += strDen;
    return str;
  };
  Unit2.prototype.format = function(options) {
    var simp = this.skipAutomaticSimplification || this.value === null ? this.clone() : this.simplify();
    var isImaginary = false;
    if (typeof simp.value !== "undefined" && simp.value !== null && isComplex(simp.value)) {
      isImaginary = Math.abs(simp.value.re) < 1e-14;
    }
    for (var i2 in simp.units) {
      if (hasOwnProperty(simp.units, i2)) {
        if (simp.units[i2].unit) {
          if (simp.units[i2].unit.name === "VA" && isImaginary) {
            simp.units[i2].unit = UNITS.VAR;
          } else if (simp.units[i2].unit.name === "VAR" && !isImaginary) {
            simp.units[i2].unit = UNITS.VA;
          }
        }
      }
    }
    if (simp.units.length === 1 && !simp.fixPrefix) {
      if (Math.abs(simp.units[0].power - Math.round(simp.units[0].power)) < 1e-14) {
        simp.units[0].prefix = simp._bestPrefix();
      }
    }
    var value = simp._denormalize(simp.value);
    var str = simp.value !== null ? format2(value, options || {}) : "";
    var unitStr = simp.formatUnits();
    if (simp.value && isComplex(simp.value)) {
      str = "(" + str + ")";
    }
    if (unitStr.length > 0 && str.length > 0) {
      str += " ";
    }
    str += unitStr;
    return str;
  };
  Unit2.prototype._bestPrefix = function() {
    if (this.units.length !== 1) {
      throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");
    }
    if (Math.abs(this.units[0].power - Math.round(this.units[0].power)) >= 1e-14) {
      throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");
    }
    var absValue = this.value !== null ? abs2(this.value) : 0;
    var absUnitValue = abs2(this.units[0].unit.value);
    var bestPrefix = this.units[0].prefix;
    if (absValue === 0) {
      return bestPrefix;
    }
    var power = this.units[0].power;
    var bestDiff = Math.log(absValue / Math.pow(bestPrefix.value * absUnitValue, power)) / Math.LN10 - 1.2;
    if (bestDiff > -2.200001 && bestDiff < 1.800001)
      return bestPrefix;
    bestDiff = Math.abs(bestDiff);
    var prefixes = this.units[0].unit.prefixes;
    for (var p in prefixes) {
      if (hasOwnProperty(prefixes, p)) {
        var prefix = prefixes[p];
        if (prefix.scientific) {
          var diff2 = Math.abs(Math.log(absValue / Math.pow(prefix.value * absUnitValue, power)) / Math.LN10 - 1.2);
          if (diff2 < bestDiff || diff2 === bestDiff && prefix.name.length < bestPrefix.name.length) {
            bestPrefix = prefix;
            bestDiff = diff2;
          }
        }
      }
    }
    return bestPrefix;
  };
  Unit2.prototype.splitUnit = function(parts) {
    var x = this.clone();
    var ret = [];
    for (var i2 = 0; i2 < parts.length; i2++) {
      x = x.to(parts[i2]);
      if (i2 === parts.length - 1)
        break;
      var xNumeric = x.toNumeric();
      var xRounded = round2(xNumeric);
      var xFixed = void 0;
      var isNearlyEqual = equal2(xRounded, xNumeric);
      if (isNearlyEqual) {
        xFixed = xRounded;
      } else {
        xFixed = fix2(x.toNumeric());
      }
      var y = new Unit2(xFixed, parts[i2].toString());
      ret.push(y);
      x = subtractScalar2(x, y);
    }
    var testSum = 0;
    for (var _i5 = 0; _i5 < ret.length; _i5++) {
      testSum = addScalar2(testSum, ret[_i5].value);
    }
    if (equal2(testSum, this.value)) {
      x.value = 0;
    }
    ret.push(x);
    return ret;
  };
  var PREFIXES = {
    NONE: {
      "": {
        name: "",
        value: 1,
        scientific: true
      }
    },
    SHORT: {
      "": {
        name: "",
        value: 1,
        scientific: true
      },
      da: {
        name: "da",
        value: 10,
        scientific: false
      },
      h: {
        name: "h",
        value: 100,
        scientific: false
      },
      k: {
        name: "k",
        value: 1e3,
        scientific: true
      },
      M: {
        name: "M",
        value: 1e6,
        scientific: true
      },
      G: {
        name: "G",
        value: 1e9,
        scientific: true
      },
      T: {
        name: "T",
        value: 1e12,
        scientific: true
      },
      P: {
        name: "P",
        value: 1e15,
        scientific: true
      },
      E: {
        name: "E",
        value: 1e18,
        scientific: true
      },
      Z: {
        name: "Z",
        value: 1e21,
        scientific: true
      },
      Y: {
        name: "Y",
        value: 1e24,
        scientific: true
      },
      R: {
        name: "R",
        value: 1e27,
        scientific: true
      },
      Q: {
        name: "Q",
        value: 1e30,
        scientific: true
      },
      d: {
        name: "d",
        value: 0.1,
        scientific: false
      },
      c: {
        name: "c",
        value: 0.01,
        scientific: false
      },
      m: {
        name: "m",
        value: 1e-3,
        scientific: true
      },
      u: {
        name: "u",
        value: 1e-6,
        scientific: true
      },
      n: {
        name: "n",
        value: 1e-9,
        scientific: true
      },
      p: {
        name: "p",
        value: 1e-12,
        scientific: true
      },
      f: {
        name: "f",
        value: 1e-15,
        scientific: true
      },
      a: {
        name: "a",
        value: 1e-18,
        scientific: true
      },
      z: {
        name: "z",
        value: 1e-21,
        scientific: true
      },
      y: {
        name: "y",
        value: 1e-24,
        scientific: true
      },
      r: {
        name: "r",
        value: 1e-27,
        scientific: true
      },
      q: {
        name: "q",
        value: 1e-30,
        scientific: true
      }
    },
    LONG: {
      "": {
        name: "",
        value: 1,
        scientific: true
      },
      deca: {
        name: "deca",
        value: 10,
        scientific: false
      },
      hecto: {
        name: "hecto",
        value: 100,
        scientific: false
      },
      kilo: {
        name: "kilo",
        value: 1e3,
        scientific: true
      },
      mega: {
        name: "mega",
        value: 1e6,
        scientific: true
      },
      giga: {
        name: "giga",
        value: 1e9,
        scientific: true
      },
      tera: {
        name: "tera",
        value: 1e12,
        scientific: true
      },
      peta: {
        name: "peta",
        value: 1e15,
        scientific: true
      },
      exa: {
        name: "exa",
        value: 1e18,
        scientific: true
      },
      zetta: {
        name: "zetta",
        value: 1e21,
        scientific: true
      },
      yotta: {
        name: "yotta",
        value: 1e24,
        scientific: true
      },
      ronna: {
        name: "ronna",
        value: 1e27,
        scientific: true
      },
      quetta: {
        name: "quetta",
        value: 1e30,
        scientific: true
      },
      deci: {
        name: "deci",
        value: 0.1,
        scientific: false
      },
      centi: {
        name: "centi",
        value: 0.01,
        scientific: false
      },
      milli: {
        name: "milli",
        value: 1e-3,
        scientific: true
      },
      micro: {
        name: "micro",
        value: 1e-6,
        scientific: true
      },
      nano: {
        name: "nano",
        value: 1e-9,
        scientific: true
      },
      pico: {
        name: "pico",
        value: 1e-12,
        scientific: true
      },
      femto: {
        name: "femto",
        value: 1e-15,
        scientific: true
      },
      atto: {
        name: "atto",
        value: 1e-18,
        scientific: true
      },
      zepto: {
        name: "zepto",
        value: 1e-21,
        scientific: true
      },
      yocto: {
        name: "yocto",
        value: 1e-24,
        scientific: true
      },
      ronto: {
        name: "ronto",
        value: 1e-27,
        scientific: true
      },
      quecto: {
        name: "quecto",
        value: 1e-30,
        scientific: true
      }
    },
    SQUARED: {
      "": {
        name: "",
        value: 1,
        scientific: true
      },
      da: {
        name: "da",
        value: 100,
        scientific: false
      },
      h: {
        name: "h",
        value: 1e4,
        scientific: false
      },
      k: {
        name: "k",
        value: 1e6,
        scientific: true
      },
      M: {
        name: "M",
        value: 1e12,
        scientific: true
      },
      G: {
        name: "G",
        value: 1e18,
        scientific: true
      },
      T: {
        name: "T",
        value: 1e24,
        scientific: true
      },
      P: {
        name: "P",
        value: 1e30,
        scientific: true
      },
      E: {
        name: "E",
        value: 1e36,
        scientific: true
      },
      Z: {
        name: "Z",
        value: 1e42,
        scientific: true
      },
      Y: {
        name: "Y",
        value: 1e48,
        scientific: true
      },
      R: {
        name: "R",
        value: 1e54,
        scientific: true
      },
      Q: {
        name: "Q",
        value: 1e60,
        scientific: true
      },
      d: {
        name: "d",
        value: 0.01,
        scientific: false
      },
      c: {
        name: "c",
        value: 1e-4,
        scientific: false
      },
      m: {
        name: "m",
        value: 1e-6,
        scientific: true
      },
      u: {
        name: "u",
        value: 1e-12,
        scientific: true
      },
      n: {
        name: "n",
        value: 1e-18,
        scientific: true
      },
      p: {
        name: "p",
        value: 1e-24,
        scientific: true
      },
      f: {
        name: "f",
        value: 1e-30,
        scientific: true
      },
      a: {
        name: "a",
        value: 1e-36,
        scientific: true
      },
      z: {
        name: "z",
        value: 1e-42,
        scientific: true
      },
      y: {
        name: "y",
        value: 1e-48,
        scientific: true
      },
      r: {
        name: "r",
        value: 1e-54,
        scientific: true
      },
      q: {
        name: "q",
        value: 1e-60,
        scientific: true
      }
    },
    CUBIC: {
      "": {
        name: "",
        value: 1,
        scientific: true
      },
      da: {
        name: "da",
        value: 1e3,
        scientific: false
      },
      h: {
        name: "h",
        value: 1e6,
        scientific: false
      },
      k: {
        name: "k",
        value: 1e9,
        scientific: true
      },
      M: {
        name: "M",
        value: 1e18,
        scientific: true
      },
      G: {
        name: "G",
        value: 1e27,
        scientific: true
      },
      T: {
        name: "T",
        value: 1e36,
        scientific: true
      },
      P: {
        name: "P",
        value: 1e45,
        scientific: true
      },
      E: {
        name: "E",
        value: 1e54,
        scientific: true
      },
      Z: {
        name: "Z",
        value: 1e63,
        scientific: true
      },
      Y: {
        name: "Y",
        value: 1e72,
        scientific: true
      },
      R: {
        name: "R",
        value: 1e81,
        scientific: true
      },
      Q: {
        name: "Q",
        value: 1e90,
        scientific: true
      },
      d: {
        name: "d",
        value: 1e-3,
        scientific: false
      },
      c: {
        name: "c",
        value: 1e-6,
        scientific: false
      },
      m: {
        name: "m",
        value: 1e-9,
        scientific: true
      },
      u: {
        name: "u",
        value: 1e-18,
        scientific: true
      },
      n: {
        name: "n",
        value: 1e-27,
        scientific: true
      },
      p: {
        name: "p",
        value: 1e-36,
        scientific: true
      },
      f: {
        name: "f",
        value: 1e-45,
        scientific: true
      },
      a: {
        name: "a",
        value: 1e-54,
        scientific: true
      },
      z: {
        name: "z",
        value: 1e-63,
        scientific: true
      },
      y: {
        name: "y",
        value: 1e-72,
        scientific: true
      },
      r: {
        name: "r",
        value: 1e-81,
        scientific: true
      },
      q: {
        name: "q",
        value: 1e-90,
        scientific: true
      }
    },
    BINARY_SHORT_SI: {
      "": {
        name: "",
        value: 1,
        scientific: true
      },
      k: {
        name: "k",
        value: 1e3,
        scientific: true
      },
      M: {
        name: "M",
        value: 1e6,
        scientific: true
      },
      G: {
        name: "G",
        value: 1e9,
        scientific: true
      },
      T: {
        name: "T",
        value: 1e12,
        scientific: true
      },
      P: {
        name: "P",
        value: 1e15,
        scientific: true
      },
      E: {
        name: "E",
        value: 1e18,
        scientific: true
      },
      Z: {
        name: "Z",
        value: 1e21,
        scientific: true
      },
      Y: {
        name: "Y",
        value: 1e24,
        scientific: true
      }
    },
    BINARY_SHORT_IEC: {
      "": {
        name: "",
        value: 1,
        scientific: true
      },
      Ki: {
        name: "Ki",
        value: 1024,
        scientific: true
      },
      Mi: {
        name: "Mi",
        value: Math.pow(1024, 2),
        scientific: true
      },
      Gi: {
        name: "Gi",
        value: Math.pow(1024, 3),
        scientific: true
      },
      Ti: {
        name: "Ti",
        value: Math.pow(1024, 4),
        scientific: true
      },
      Pi: {
        name: "Pi",
        value: Math.pow(1024, 5),
        scientific: true
      },
      Ei: {
        name: "Ei",
        value: Math.pow(1024, 6),
        scientific: true
      },
      Zi: {
        name: "Zi",
        value: Math.pow(1024, 7),
        scientific: true
      },
      Yi: {
        name: "Yi",
        value: Math.pow(1024, 8),
        scientific: true
      }
    },
    BINARY_LONG_SI: {
      "": {
        name: "",
        value: 1,
        scientific: true
      },
      kilo: {
        name: "kilo",
        value: 1e3,
        scientific: true
      },
      mega: {
        name: "mega",
        value: 1e6,
        scientific: true
      },
      giga: {
        name: "giga",
        value: 1e9,
        scientific: true
      },
      tera: {
        name: "tera",
        value: 1e12,
        scientific: true
      },
      peta: {
        name: "peta",
        value: 1e15,
        scientific: true
      },
      exa: {
        name: "exa",
        value: 1e18,
        scientific: true
      },
      zetta: {
        name: "zetta",
        value: 1e21,
        scientific: true
      },
      yotta: {
        name: "yotta",
        value: 1e24,
        scientific: true
      }
    },
    BINARY_LONG_IEC: {
      "": {
        name: "",
        value: 1,
        scientific: true
      },
      kibi: {
        name: "kibi",
        value: 1024,
        scientific: true
      },
      mebi: {
        name: "mebi",
        value: Math.pow(1024, 2),
        scientific: true
      },
      gibi: {
        name: "gibi",
        value: Math.pow(1024, 3),
        scientific: true
      },
      tebi: {
        name: "tebi",
        value: Math.pow(1024, 4),
        scientific: true
      },
      pebi: {
        name: "pebi",
        value: Math.pow(1024, 5),
        scientific: true
      },
      exi: {
        name: "exi",
        value: Math.pow(1024, 6),
        scientific: true
      },
      zebi: {
        name: "zebi",
        value: Math.pow(1024, 7),
        scientific: true
      },
      yobi: {
        name: "yobi",
        value: Math.pow(1024, 8),
        scientific: true
      }
    },
    BTU: {
      "": {
        name: "",
        value: 1,
        scientific: true
      },
      MM: {
        name: "MM",
        value: 1e6,
        scientific: true
      }
    }
  };
  PREFIXES.SHORTLONG = _extends({}, PREFIXES.SHORT, PREFIXES.LONG);
  PREFIXES.BINARY_SHORT = _extends({}, PREFIXES.BINARY_SHORT_SI, PREFIXES.BINARY_SHORT_IEC);
  PREFIXES.BINARY_LONG = _extends({}, PREFIXES.BINARY_LONG_SI, PREFIXES.BINARY_LONG_IEC);
  var BASE_DIMENSIONS = ["MASS", "LENGTH", "TIME", "CURRENT", "TEMPERATURE", "LUMINOUS_INTENSITY", "AMOUNT_OF_SUBSTANCE", "ANGLE", "BIT"];
  var BASE_UNITS = {
    NONE: {
      dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    MASS: {
      dimensions: [1, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    LENGTH: {
      dimensions: [0, 1, 0, 0, 0, 0, 0, 0, 0]
    },
    TIME: {
      dimensions: [0, 0, 1, 0, 0, 0, 0, 0, 0]
    },
    CURRENT: {
      dimensions: [0, 0, 0, 1, 0, 0, 0, 0, 0]
    },
    TEMPERATURE: {
      dimensions: [0, 0, 0, 0, 1, 0, 0, 0, 0]
    },
    LUMINOUS_INTENSITY: {
      dimensions: [0, 0, 0, 0, 0, 1, 0, 0, 0]
    },
    AMOUNT_OF_SUBSTANCE: {
      dimensions: [0, 0, 0, 0, 0, 0, 1, 0, 0]
    },
    FORCE: {
      dimensions: [1, 1, -2, 0, 0, 0, 0, 0, 0]
    },
    SURFACE: {
      dimensions: [0, 2, 0, 0, 0, 0, 0, 0, 0]
    },
    VOLUME: {
      dimensions: [0, 3, 0, 0, 0, 0, 0, 0, 0]
    },
    ENERGY: {
      dimensions: [1, 2, -2, 0, 0, 0, 0, 0, 0]
    },
    POWER: {
      dimensions: [1, 2, -3, 0, 0, 0, 0, 0, 0]
    },
    PRESSURE: {
      dimensions: [1, -1, -2, 0, 0, 0, 0, 0, 0]
    },
    ELECTRIC_CHARGE: {
      dimensions: [0, 0, 1, 1, 0, 0, 0, 0, 0]
    },
    ELECTRIC_CAPACITANCE: {
      dimensions: [-1, -2, 4, 2, 0, 0, 0, 0, 0]
    },
    ELECTRIC_POTENTIAL: {
      dimensions: [1, 2, -3, -1, 0, 0, 0, 0, 0]
    },
    ELECTRIC_RESISTANCE: {
      dimensions: [1, 2, -3, -2, 0, 0, 0, 0, 0]
    },
    ELECTRIC_INDUCTANCE: {
      dimensions: [1, 2, -2, -2, 0, 0, 0, 0, 0]
    },
    ELECTRIC_CONDUCTANCE: {
      dimensions: [-1, -2, 3, 2, 0, 0, 0, 0, 0]
    },
    MAGNETIC_FLUX: {
      dimensions: [1, 2, -2, -1, 0, 0, 0, 0, 0]
    },
    MAGNETIC_FLUX_DENSITY: {
      dimensions: [1, 0, -2, -1, 0, 0, 0, 0, 0]
    },
    FREQUENCY: {
      dimensions: [0, 0, -1, 0, 0, 0, 0, 0, 0]
    },
    ANGLE: {
      dimensions: [0, 0, 0, 0, 0, 0, 0, 1, 0]
    },
    BIT: {
      dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 1]
    }
  };
  for (var key in BASE_UNITS) {
    if (hasOwnProperty(BASE_UNITS, key)) {
      BASE_UNITS[key].key = key;
    }
  }
  var BASE_UNIT_NONE = {};
  var UNIT_NONE = {
    name: "",
    base: BASE_UNIT_NONE,
    value: 1,
    offset: 0,
    dimensions: BASE_DIMENSIONS.map((x) => 0)
  };
  var UNITS = {
    // length
    meter: {
      name: "meter",
      base: BASE_UNITS.LENGTH,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 0
    },
    inch: {
      name: "inch",
      base: BASE_UNITS.LENGTH,
      prefixes: PREFIXES.NONE,
      value: 0.0254,
      offset: 0
    },
    foot: {
      name: "foot",
      base: BASE_UNITS.LENGTH,
      prefixes: PREFIXES.NONE,
      value: 0.3048,
      offset: 0
    },
    yard: {
      name: "yard",
      base: BASE_UNITS.LENGTH,
      prefixes: PREFIXES.NONE,
      value: 0.9144,
      offset: 0
    },
    mile: {
      name: "mile",
      base: BASE_UNITS.LENGTH,
      prefixes: PREFIXES.NONE,
      value: 1609.344,
      offset: 0
    },
    link: {
      name: "link",
      base: BASE_UNITS.LENGTH,
      prefixes: PREFIXES.NONE,
      value: 0.201168,
      offset: 0
    },
    rod: {
      name: "rod",
      base: BASE_UNITS.LENGTH,
      prefixes: PREFIXES.NONE,
      value: 5.0292,
      offset: 0
    },
    chain: {
      name: "chain",
      base: BASE_UNITS.LENGTH,
      prefixes: PREFIXES.NONE,
      value: 20.1168,
      offset: 0
    },
    angstrom: {
      name: "angstrom",
      base: BASE_UNITS.LENGTH,
      prefixes: PREFIXES.NONE,
      value: 1e-10,
      offset: 0
    },
    m: {
      name: "m",
      base: BASE_UNITS.LENGTH,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    in: {
      name: "in",
      base: BASE_UNITS.LENGTH,
      prefixes: PREFIXES.NONE,
      value: 0.0254,
      offset: 0
    },
    ft: {
      name: "ft",
      base: BASE_UNITS.LENGTH,
      prefixes: PREFIXES.NONE,
      value: 0.3048,
      offset: 0
    },
    yd: {
      name: "yd",
      base: BASE_UNITS.LENGTH,
      prefixes: PREFIXES.NONE,
      value: 0.9144,
      offset: 0
    },
    mi: {
      name: "mi",
      base: BASE_UNITS.LENGTH,
      prefixes: PREFIXES.NONE,
      value: 1609.344,
      offset: 0
    },
    li: {
      name: "li",
      base: BASE_UNITS.LENGTH,
      prefixes: PREFIXES.NONE,
      value: 0.201168,
      offset: 0
    },
    rd: {
      name: "rd",
      base: BASE_UNITS.LENGTH,
      prefixes: PREFIXES.NONE,
      value: 5.02921,
      offset: 0
    },
    ch: {
      name: "ch",
      base: BASE_UNITS.LENGTH,
      prefixes: PREFIXES.NONE,
      value: 20.1168,
      offset: 0
    },
    mil: {
      name: "mil",
      base: BASE_UNITS.LENGTH,
      prefixes: PREFIXES.NONE,
      value: 254e-7,
      offset: 0
    },
    // 1/1000 inch
    // Surface
    m2: {
      name: "m2",
      base: BASE_UNITS.SURFACE,
      prefixes: PREFIXES.SQUARED,
      value: 1,
      offset: 0
    },
    sqin: {
      name: "sqin",
      base: BASE_UNITS.SURFACE,
      prefixes: PREFIXES.NONE,
      value: 64516e-8,
      offset: 0
    },
    // 645.16 mm2
    sqft: {
      name: "sqft",
      base: BASE_UNITS.SURFACE,
      prefixes: PREFIXES.NONE,
      value: 0.09290304,
      offset: 0
    },
    // 0.09290304 m2
    sqyd: {
      name: "sqyd",
      base: BASE_UNITS.SURFACE,
      prefixes: PREFIXES.NONE,
      value: 0.83612736,
      offset: 0
    },
    // 0.83612736 m2
    sqmi: {
      name: "sqmi",
      base: BASE_UNITS.SURFACE,
      prefixes: PREFIXES.NONE,
      value: 2589988110336e-6,
      offset: 0
    },
    // 2.589988110336 km2
    sqrd: {
      name: "sqrd",
      base: BASE_UNITS.SURFACE,
      prefixes: PREFIXES.NONE,
      value: 25.29295,
      offset: 0
    },
    // 25.29295 m2
    sqch: {
      name: "sqch",
      base: BASE_UNITS.SURFACE,
      prefixes: PREFIXES.NONE,
      value: 404.6873,
      offset: 0
    },
    // 404.6873 m2
    sqmil: {
      name: "sqmil",
      base: BASE_UNITS.SURFACE,
      prefixes: PREFIXES.NONE,
      value: 64516e-14,
      offset: 0
    },
    // 6.4516 * 10^-10 m2
    acre: {
      name: "acre",
      base: BASE_UNITS.SURFACE,
      prefixes: PREFIXES.NONE,
      value: 4046.86,
      offset: 0
    },
    // 4046.86 m2
    hectare: {
      name: "hectare",
      base: BASE_UNITS.SURFACE,
      prefixes: PREFIXES.NONE,
      value: 1e4,
      offset: 0
    },
    // 10000 m2
    // Volume
    m3: {
      name: "m3",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.CUBIC,
      value: 1,
      offset: 0
    },
    L: {
      name: "L",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.SHORT,
      value: 1e-3,
      offset: 0
    },
    // litre
    l: {
      name: "l",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.SHORT,
      value: 1e-3,
      offset: 0
    },
    // litre
    litre: {
      name: "litre",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.LONG,
      value: 1e-3,
      offset: 0
    },
    cuin: {
      name: "cuin",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 16387064e-12,
      offset: 0
    },
    // 1.6387064e-5 m3
    cuft: {
      name: "cuft",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 0.028316846592,
      offset: 0
    },
    // 28.316 846 592 L
    cuyd: {
      name: "cuyd",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 0.764554857984,
      offset: 0
    },
    // 764.554 857 984 L
    teaspoon: {
      name: "teaspoon",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 5e-6,
      offset: 0
    },
    // 5 mL
    tablespoon: {
      name: "tablespoon",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 15e-6,
      offset: 0
    },
    // 15 mL
    // {name: 'cup', base: BASE_UNITS.VOLUME, prefixes: PREFIXES.NONE, value: 0.000240, offset: 0}, // 240 mL  // not possible, we have already another cup
    drop: {
      name: "drop",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 5e-8,
      offset: 0
    },
    // 0.05 mL = 5e-8 m3
    gtt: {
      name: "gtt",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 5e-8,
      offset: 0
    },
    // 0.05 mL = 5e-8 m3
    // Liquid volume
    minim: {
      name: "minim",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 6161152e-14,
      offset: 0
    },
    // 0.06161152 mL
    fluiddram: {
      name: "fluiddram",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 36966911e-13,
      offset: 0
    },
    // 3.696691 mL
    fluidounce: {
      name: "fluidounce",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 2957353e-11,
      offset: 0
    },
    // 29.57353 mL
    gill: {
      name: "gill",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 1182941e-10,
      offset: 0
    },
    // 118.2941 mL
    cc: {
      name: "cc",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 1e-6,
      offset: 0
    },
    // 1e-6 L
    cup: {
      name: "cup",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 2365882e-10,
      offset: 0
    },
    // 236.5882 mL
    pint: {
      name: "pint",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 4731765e-10,
      offset: 0
    },
    // 473.1765 mL
    quart: {
      name: "quart",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 9463529e-10,
      offset: 0
    },
    // 946.3529 mL
    gallon: {
      name: "gallon",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 3785412e-9,
      offset: 0
    },
    // 3.785412 L
    beerbarrel: {
      name: "beerbarrel",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 0.1173478,
      offset: 0
    },
    // 117.3478 L
    oilbarrel: {
      name: "oilbarrel",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 0.1589873,
      offset: 0
    },
    // 158.9873 L
    hogshead: {
      name: "hogshead",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 0.238481,
      offset: 0
    },
    // 238.4810 L
    // {name: 'min', base: BASE_UNITS.VOLUME, prefixes: PREFIXES.NONE, value: 0.00000006161152, offset: 0}, // 0.06161152 mL // min is already in use as minute
    fldr: {
      name: "fldr",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 36966911e-13,
      offset: 0
    },
    // 3.696691 mL
    floz: {
      name: "floz",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 2957353e-11,
      offset: 0
    },
    // 29.57353 mL
    gi: {
      name: "gi",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 1182941e-10,
      offset: 0
    },
    // 118.2941 mL
    cp: {
      name: "cp",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 2365882e-10,
      offset: 0
    },
    // 236.5882 mL
    pt: {
      name: "pt",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 4731765e-10,
      offset: 0
    },
    // 473.1765 mL
    qt: {
      name: "qt",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 9463529e-10,
      offset: 0
    },
    // 946.3529 mL
    gal: {
      name: "gal",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 3785412e-9,
      offset: 0
    },
    // 3.785412 L
    bbl: {
      name: "bbl",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 0.1173478,
      offset: 0
    },
    // 117.3478 L
    obl: {
      name: "obl",
      base: BASE_UNITS.VOLUME,
      prefixes: PREFIXES.NONE,
      value: 0.1589873,
      offset: 0
    },
    // 158.9873 L
    // {name: 'hogshead', base: BASE_UNITS.VOLUME, prefixes: PREFIXES.NONE, value: 0.2384810, offset: 0}, // 238.4810 L // TODO: hh?
    // Mass
    g: {
      name: "g",
      base: BASE_UNITS.MASS,
      prefixes: PREFIXES.SHORT,
      value: 1e-3,
      offset: 0
    },
    gram: {
      name: "gram",
      base: BASE_UNITS.MASS,
      prefixes: PREFIXES.LONG,
      value: 1e-3,
      offset: 0
    },
    ton: {
      name: "ton",
      base: BASE_UNITS.MASS,
      prefixes: PREFIXES.SHORT,
      value: 907.18474,
      offset: 0
    },
    t: {
      name: "t",
      base: BASE_UNITS.MASS,
      prefixes: PREFIXES.SHORT,
      value: 1e3,
      offset: 0
    },
    tonne: {
      name: "tonne",
      base: BASE_UNITS.MASS,
      prefixes: PREFIXES.LONG,
      value: 1e3,
      offset: 0
    },
    grain: {
      name: "grain",
      base: BASE_UNITS.MASS,
      prefixes: PREFIXES.NONE,
      value: 6479891e-11,
      offset: 0
    },
    dram: {
      name: "dram",
      base: BASE_UNITS.MASS,
      prefixes: PREFIXES.NONE,
      value: 0.0017718451953125,
      offset: 0
    },
    ounce: {
      name: "ounce",
      base: BASE_UNITS.MASS,
      prefixes: PREFIXES.NONE,
      value: 0.028349523125,
      offset: 0
    },
    poundmass: {
      name: "poundmass",
      base: BASE_UNITS.MASS,
      prefixes: PREFIXES.NONE,
      value: 0.45359237,
      offset: 0
    },
    hundredweight: {
      name: "hundredweight",
      base: BASE_UNITS.MASS,
      prefixes: PREFIXES.NONE,
      value: 45.359237,
      offset: 0
    },
    stick: {
      name: "stick",
      base: BASE_UNITS.MASS,
      prefixes: PREFIXES.NONE,
      value: 0.115,
      offset: 0
    },
    stone: {
      name: "stone",
      base: BASE_UNITS.MASS,
      prefixes: PREFIXES.NONE,
      value: 6.35029318,
      offset: 0
    },
    gr: {
      name: "gr",
      base: BASE_UNITS.MASS,
      prefixes: PREFIXES.NONE,
      value: 6479891e-11,
      offset: 0
    },
    dr: {
      name: "dr",
      base: BASE_UNITS.MASS,
      prefixes: PREFIXES.NONE,
      value: 0.0017718451953125,
      offset: 0
    },
    oz: {
      name: "oz",
      base: BASE_UNITS.MASS,
      prefixes: PREFIXES.NONE,
      value: 0.028349523125,
      offset: 0
    },
    lbm: {
      name: "lbm",
      base: BASE_UNITS.MASS,
      prefixes: PREFIXES.NONE,
      value: 0.45359237,
      offset: 0
    },
    cwt: {
      name: "cwt",
      base: BASE_UNITS.MASS,
      prefixes: PREFIXES.NONE,
      value: 45.359237,
      offset: 0
    },
    // Time
    s: {
      name: "s",
      base: BASE_UNITS.TIME,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    min: {
      name: "min",
      base: BASE_UNITS.TIME,
      prefixes: PREFIXES.NONE,
      value: 60,
      offset: 0
    },
    h: {
      name: "h",
      base: BASE_UNITS.TIME,
      prefixes: PREFIXES.NONE,
      value: 3600,
      offset: 0
    },
    second: {
      name: "second",
      base: BASE_UNITS.TIME,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 0
    },
    sec: {
      name: "sec",
      base: BASE_UNITS.TIME,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 0
    },
    minute: {
      name: "minute",
      base: BASE_UNITS.TIME,
      prefixes: PREFIXES.NONE,
      value: 60,
      offset: 0
    },
    hour: {
      name: "hour",
      base: BASE_UNITS.TIME,
      prefixes: PREFIXES.NONE,
      value: 3600,
      offset: 0
    },
    day: {
      name: "day",
      base: BASE_UNITS.TIME,
      prefixes: PREFIXES.NONE,
      value: 86400,
      offset: 0
    },
    week: {
      name: "week",
      base: BASE_UNITS.TIME,
      prefixes: PREFIXES.NONE,
      value: 7 * 86400,
      offset: 0
    },
    month: {
      name: "month",
      base: BASE_UNITS.TIME,
      prefixes: PREFIXES.NONE,
      value: 2629800,
      // 1/12th of Julian year
      offset: 0
    },
    year: {
      name: "year",
      base: BASE_UNITS.TIME,
      prefixes: PREFIXES.NONE,
      value: 31557600,
      // Julian year
      offset: 0
    },
    decade: {
      name: "decade",
      base: BASE_UNITS.TIME,
      prefixes: PREFIXES.NONE,
      value: 315576e3,
      // Julian decade
      offset: 0
    },
    century: {
      name: "century",
      base: BASE_UNITS.TIME,
      prefixes: PREFIXES.NONE,
      value: 315576e4,
      // Julian century
      offset: 0
    },
    millennium: {
      name: "millennium",
      base: BASE_UNITS.TIME,
      prefixes: PREFIXES.NONE,
      value: 315576e5,
      // Julian millennium
      offset: 0
    },
    // Frequency
    hertz: {
      name: "Hertz",
      base: BASE_UNITS.FREQUENCY,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 0,
      reciprocal: true
    },
    Hz: {
      name: "Hz",
      base: BASE_UNITS.FREQUENCY,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0,
      reciprocal: true
    },
    // Angle
    rad: {
      name: "rad",
      base: BASE_UNITS.ANGLE,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    radian: {
      name: "radian",
      base: BASE_UNITS.ANGLE,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 0
    },
    // deg = rad / (2*pi) * 360 = rad / 0.017453292519943295769236907684888
    deg: {
      name: "deg",
      base: BASE_UNITS.ANGLE,
      prefixes: PREFIXES.SHORT,
      value: null,
      // will be filled in by calculateAngleValues()
      offset: 0
    },
    degree: {
      name: "degree",
      base: BASE_UNITS.ANGLE,
      prefixes: PREFIXES.LONG,
      value: null,
      // will be filled in by calculateAngleValues()
      offset: 0
    },
    // grad = rad / (2*pi) * 400  = rad / 0.015707963267948966192313216916399
    grad: {
      name: "grad",
      base: BASE_UNITS.ANGLE,
      prefixes: PREFIXES.SHORT,
      value: null,
      // will be filled in by calculateAngleValues()
      offset: 0
    },
    gradian: {
      name: "gradian",
      base: BASE_UNITS.ANGLE,
      prefixes: PREFIXES.LONG,
      value: null,
      // will be filled in by calculateAngleValues()
      offset: 0
    },
    // cycle = rad / (2*pi) = rad / 6.2831853071795864769252867665793
    cycle: {
      name: "cycle",
      base: BASE_UNITS.ANGLE,
      prefixes: PREFIXES.NONE,
      value: null,
      // will be filled in by calculateAngleValues()
      offset: 0
    },
    // arcsec = rad / (3600 * (360 / 2 * pi)) = rad / 0.0000048481368110953599358991410235795
    arcsec: {
      name: "arcsec",
      base: BASE_UNITS.ANGLE,
      prefixes: PREFIXES.NONE,
      value: null,
      // will be filled in by calculateAngleValues()
      offset: 0
    },
    // arcmin = rad / (60 * (360 / 2 * pi)) = rad / 0.00029088820866572159615394846141477
    arcmin: {
      name: "arcmin",
      base: BASE_UNITS.ANGLE,
      prefixes: PREFIXES.NONE,
      value: null,
      // will be filled in by calculateAngleValues()
      offset: 0
    },
    // Electric current
    A: {
      name: "A",
      base: BASE_UNITS.CURRENT,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    ampere: {
      name: "ampere",
      base: BASE_UNITS.CURRENT,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 0
    },
    // Temperature
    // K(C) = °C + 273.15
    // K(F) = (°F + 459.67) * (5 / 9)
    // K(R) = °R * (5 / 9)
    K: {
      name: "K",
      base: BASE_UNITS.TEMPERATURE,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    degC: {
      name: "degC",
      base: BASE_UNITS.TEMPERATURE,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 273.15
    },
    degF: {
      name: "degF",
      base: BASE_UNITS.TEMPERATURE,
      prefixes: PREFIXES.SHORT,
      value: new _Fraction(5, 9),
      offset: 459.67
    },
    degR: {
      name: "degR",
      base: BASE_UNITS.TEMPERATURE,
      prefixes: PREFIXES.SHORT,
      value: new _Fraction(5, 9),
      offset: 0
    },
    kelvin: {
      name: "kelvin",
      base: BASE_UNITS.TEMPERATURE,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 0
    },
    celsius: {
      name: "celsius",
      base: BASE_UNITS.TEMPERATURE,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 273.15
    },
    fahrenheit: {
      name: "fahrenheit",
      base: BASE_UNITS.TEMPERATURE,
      prefixes: PREFIXES.LONG,
      value: new _Fraction(5, 9),
      offset: 459.67
    },
    rankine: {
      name: "rankine",
      base: BASE_UNITS.TEMPERATURE,
      prefixes: PREFIXES.LONG,
      value: new _Fraction(5, 9),
      offset: 0
    },
    // amount of substance
    mol: {
      name: "mol",
      base: BASE_UNITS.AMOUNT_OF_SUBSTANCE,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    mole: {
      name: "mole",
      base: BASE_UNITS.AMOUNT_OF_SUBSTANCE,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 0
    },
    // luminous intensity
    cd: {
      name: "cd",
      base: BASE_UNITS.LUMINOUS_INTENSITY,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    candela: {
      name: "candela",
      base: BASE_UNITS.LUMINOUS_INTENSITY,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 0
    },
    // TODO: units STERADIAN
    // {name: 'sr', base: BASE_UNITS.STERADIAN, prefixes: PREFIXES.NONE, value: 1, offset: 0},
    // {name: 'steradian', base: BASE_UNITS.STERADIAN, prefixes: PREFIXES.NONE, value: 1, offset: 0},
    // Force
    N: {
      name: "N",
      base: BASE_UNITS.FORCE,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    newton: {
      name: "newton",
      base: BASE_UNITS.FORCE,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 0
    },
    dyn: {
      name: "dyn",
      base: BASE_UNITS.FORCE,
      prefixes: PREFIXES.SHORT,
      value: 1e-5,
      offset: 0
    },
    dyne: {
      name: "dyne",
      base: BASE_UNITS.FORCE,
      prefixes: PREFIXES.LONG,
      value: 1e-5,
      offset: 0
    },
    lbf: {
      name: "lbf",
      base: BASE_UNITS.FORCE,
      prefixes: PREFIXES.NONE,
      value: 4.4482216152605,
      offset: 0
    },
    poundforce: {
      name: "poundforce",
      base: BASE_UNITS.FORCE,
      prefixes: PREFIXES.NONE,
      value: 4.4482216152605,
      offset: 0
    },
    kip: {
      name: "kip",
      base: BASE_UNITS.FORCE,
      prefixes: PREFIXES.LONG,
      value: 4448.2216,
      offset: 0
    },
    kilogramforce: {
      name: "kilogramforce",
      base: BASE_UNITS.FORCE,
      prefixes: PREFIXES.NONE,
      value: 9.80665,
      offset: 0
    },
    // Energy
    J: {
      name: "J",
      base: BASE_UNITS.ENERGY,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    joule: {
      name: "joule",
      base: BASE_UNITS.ENERGY,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 0
    },
    erg: {
      name: "erg",
      base: BASE_UNITS.ENERGY,
      prefixes: PREFIXES.SHORTLONG,
      // Both kiloerg and kerg are acceptable
      value: 1e-7,
      offset: 0
    },
    Wh: {
      name: "Wh",
      base: BASE_UNITS.ENERGY,
      prefixes: PREFIXES.SHORT,
      value: 3600,
      offset: 0
    },
    BTU: {
      name: "BTU",
      base: BASE_UNITS.ENERGY,
      prefixes: PREFIXES.BTU,
      value: 1055.05585262,
      offset: 0
    },
    eV: {
      name: "eV",
      base: BASE_UNITS.ENERGY,
      prefixes: PREFIXES.SHORT,
      value: 1602176565e-28,
      offset: 0
    },
    electronvolt: {
      name: "electronvolt",
      base: BASE_UNITS.ENERGY,
      prefixes: PREFIXES.LONG,
      value: 1602176565e-28,
      offset: 0
    },
    // Power
    W: {
      name: "W",
      base: BASE_UNITS.POWER,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    watt: {
      name: "watt",
      base: BASE_UNITS.POWER,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 0
    },
    hp: {
      name: "hp",
      base: BASE_UNITS.POWER,
      prefixes: PREFIXES.NONE,
      value: 745.6998715386,
      offset: 0
    },
    // Electrical power units
    VAR: {
      name: "VAR",
      base: BASE_UNITS.POWER,
      prefixes: PREFIXES.SHORT,
      value: Complex2.I,
      offset: 0
    },
    VA: {
      name: "VA",
      base: BASE_UNITS.POWER,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    // Pressure
    Pa: {
      name: "Pa",
      base: BASE_UNITS.PRESSURE,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    psi: {
      name: "psi",
      base: BASE_UNITS.PRESSURE,
      prefixes: PREFIXES.NONE,
      value: 6894.75729276459,
      offset: 0
    },
    atm: {
      name: "atm",
      base: BASE_UNITS.PRESSURE,
      prefixes: PREFIXES.NONE,
      value: 101325,
      offset: 0
    },
    bar: {
      name: "bar",
      base: BASE_UNITS.PRESSURE,
      prefixes: PREFIXES.SHORTLONG,
      value: 1e5,
      offset: 0
    },
    torr: {
      name: "torr",
      base: BASE_UNITS.PRESSURE,
      prefixes: PREFIXES.NONE,
      value: 133.322,
      offset: 0
    },
    mmHg: {
      name: "mmHg",
      base: BASE_UNITS.PRESSURE,
      prefixes: PREFIXES.NONE,
      value: 133.322,
      offset: 0
    },
    mmH2O: {
      name: "mmH2O",
      base: BASE_UNITS.PRESSURE,
      prefixes: PREFIXES.NONE,
      value: 9.80665,
      offset: 0
    },
    cmH2O: {
      name: "cmH2O",
      base: BASE_UNITS.PRESSURE,
      prefixes: PREFIXES.NONE,
      value: 98.0665,
      offset: 0
    },
    // Electric charge
    coulomb: {
      name: "coulomb",
      base: BASE_UNITS.ELECTRIC_CHARGE,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 0
    },
    C: {
      name: "C",
      base: BASE_UNITS.ELECTRIC_CHARGE,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    // Electric capacitance
    farad: {
      name: "farad",
      base: BASE_UNITS.ELECTRIC_CAPACITANCE,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 0
    },
    F: {
      name: "F",
      base: BASE_UNITS.ELECTRIC_CAPACITANCE,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    // Electric potential
    volt: {
      name: "volt",
      base: BASE_UNITS.ELECTRIC_POTENTIAL,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 0
    },
    V: {
      name: "V",
      base: BASE_UNITS.ELECTRIC_POTENTIAL,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    // Electric resistance
    ohm: {
      name: "ohm",
      base: BASE_UNITS.ELECTRIC_RESISTANCE,
      prefixes: PREFIXES.SHORTLONG,
      // Both Mohm and megaohm are acceptable
      value: 1,
      offset: 0
    },
    /*
     * Unicode breaks in browsers if charset is not specified
    Ω: {
      name: 'Ω',
      base: BASE_UNITS.ELECTRIC_RESISTANCE,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    */
    // Electric inductance
    henry: {
      name: "henry",
      base: BASE_UNITS.ELECTRIC_INDUCTANCE,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 0
    },
    H: {
      name: "H",
      base: BASE_UNITS.ELECTRIC_INDUCTANCE,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    // Electric conductance
    siemens: {
      name: "siemens",
      base: BASE_UNITS.ELECTRIC_CONDUCTANCE,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 0
    },
    S: {
      name: "S",
      base: BASE_UNITS.ELECTRIC_CONDUCTANCE,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    // Magnetic flux
    weber: {
      name: "weber",
      base: BASE_UNITS.MAGNETIC_FLUX,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 0
    },
    Wb: {
      name: "Wb",
      base: BASE_UNITS.MAGNETIC_FLUX,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    // Magnetic flux density
    tesla: {
      name: "tesla",
      base: BASE_UNITS.MAGNETIC_FLUX_DENSITY,
      prefixes: PREFIXES.LONG,
      value: 1,
      offset: 0
    },
    T: {
      name: "T",
      base: BASE_UNITS.MAGNETIC_FLUX_DENSITY,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    // Binary
    b: {
      name: "b",
      base: BASE_UNITS.BIT,
      prefixes: PREFIXES.BINARY_SHORT,
      value: 1,
      offset: 0
    },
    bits: {
      name: "bits",
      base: BASE_UNITS.BIT,
      prefixes: PREFIXES.BINARY_LONG,
      value: 1,
      offset: 0
    },
    B: {
      name: "B",
      base: BASE_UNITS.BIT,
      prefixes: PREFIXES.BINARY_SHORT,
      value: 8,
      offset: 0
    },
    bytes: {
      name: "bytes",
      base: BASE_UNITS.BIT,
      prefixes: PREFIXES.BINARY_LONG,
      value: 8,
      offset: 0
    }
  };
  var ALIASES = {
    meters: "meter",
    inches: "inch",
    feet: "foot",
    yards: "yard",
    miles: "mile",
    links: "link",
    rods: "rod",
    chains: "chain",
    angstroms: "angstrom",
    lt: "l",
    litres: "litre",
    liter: "litre",
    liters: "litre",
    teaspoons: "teaspoon",
    tablespoons: "tablespoon",
    minims: "minim",
    fluiddrams: "fluiddram",
    fluidounces: "fluidounce",
    gills: "gill",
    cups: "cup",
    pints: "pint",
    quarts: "quart",
    gallons: "gallon",
    beerbarrels: "beerbarrel",
    oilbarrels: "oilbarrel",
    hogsheads: "hogshead",
    gtts: "gtt",
    grams: "gram",
    tons: "ton",
    tonnes: "tonne",
    grains: "grain",
    drams: "dram",
    ounces: "ounce",
    poundmasses: "poundmass",
    hundredweights: "hundredweight",
    sticks: "stick",
    lb: "lbm",
    lbs: "lbm",
    kips: "kip",
    kgf: "kilogramforce",
    acres: "acre",
    hectares: "hectare",
    sqfeet: "sqft",
    sqyard: "sqyd",
    sqmile: "sqmi",
    sqmiles: "sqmi",
    mmhg: "mmHg",
    mmh2o: "mmH2O",
    cmh2o: "cmH2O",
    seconds: "second",
    secs: "second",
    minutes: "minute",
    mins: "minute",
    hours: "hour",
    hr: "hour",
    hrs: "hour",
    days: "day",
    weeks: "week",
    months: "month",
    years: "year",
    decades: "decade",
    centuries: "century",
    millennia: "millennium",
    hertz: "hertz",
    radians: "radian",
    degrees: "degree",
    gradians: "gradian",
    cycles: "cycle",
    arcsecond: "arcsec",
    arcseconds: "arcsec",
    arcminute: "arcmin",
    arcminutes: "arcmin",
    BTUs: "BTU",
    watts: "watt",
    joules: "joule",
    amperes: "ampere",
    amps: "ampere",
    amp: "ampere",
    coulombs: "coulomb",
    volts: "volt",
    ohms: "ohm",
    farads: "farad",
    webers: "weber",
    teslas: "tesla",
    electronvolts: "electronvolt",
    moles: "mole",
    bit: "bits",
    byte: "bytes"
  };
  function calculateAngleValues(config4) {
    if (config4.number === "BigNumber") {
      var pi2 = createBigNumberPi(_BigNumber);
      UNITS.rad.value = new _BigNumber(1);
      UNITS.deg.value = pi2.div(180);
      UNITS.grad.value = pi2.div(200);
      UNITS.cycle.value = pi2.times(2);
      UNITS.arcsec.value = pi2.div(648e3);
      UNITS.arcmin.value = pi2.div(10800);
    } else {
      UNITS.rad.value = 1;
      UNITS.deg.value = Math.PI / 180;
      UNITS.grad.value = Math.PI / 200;
      UNITS.cycle.value = Math.PI * 2;
      UNITS.arcsec.value = Math.PI / 648e3;
      UNITS.arcmin.value = Math.PI / 10800;
    }
    UNITS.radian.value = UNITS.rad.value;
    UNITS.degree.value = UNITS.deg.value;
    UNITS.gradian.value = UNITS.grad.value;
  }
  calculateAngleValues(config3);
  if (on) {
    on("config", function(curr, prev) {
      if (curr.number !== prev.number) {
        calculateAngleValues(curr);
      }
    });
  }
  var UNIT_SYSTEMS = {
    si: {
      // Base units
      NONE: {
        unit: UNIT_NONE,
        prefix: PREFIXES.NONE[""]
      },
      LENGTH: {
        unit: UNITS.m,
        prefix: PREFIXES.SHORT[""]
      },
      MASS: {
        unit: UNITS.g,
        prefix: PREFIXES.SHORT.k
      },
      TIME: {
        unit: UNITS.s,
        prefix: PREFIXES.SHORT[""]
      },
      CURRENT: {
        unit: UNITS.A,
        prefix: PREFIXES.SHORT[""]
      },
      TEMPERATURE: {
        unit: UNITS.K,
        prefix: PREFIXES.SHORT[""]
      },
      LUMINOUS_INTENSITY: {
        unit: UNITS.cd,
        prefix: PREFIXES.SHORT[""]
      },
      AMOUNT_OF_SUBSTANCE: {
        unit: UNITS.mol,
        prefix: PREFIXES.SHORT[""]
      },
      ANGLE: {
        unit: UNITS.rad,
        prefix: PREFIXES.SHORT[""]
      },
      BIT: {
        unit: UNITS.bits,
        prefix: PREFIXES.SHORT[""]
      },
      // Derived units
      FORCE: {
        unit: UNITS.N,
        prefix: PREFIXES.SHORT[""]
      },
      ENERGY: {
        unit: UNITS.J,
        prefix: PREFIXES.SHORT[""]
      },
      POWER: {
        unit: UNITS.W,
        prefix: PREFIXES.SHORT[""]
      },
      PRESSURE: {
        unit: UNITS.Pa,
        prefix: PREFIXES.SHORT[""]
      },
      ELECTRIC_CHARGE: {
        unit: UNITS.C,
        prefix: PREFIXES.SHORT[""]
      },
      ELECTRIC_CAPACITANCE: {
        unit: UNITS.F,
        prefix: PREFIXES.SHORT[""]
      },
      ELECTRIC_POTENTIAL: {
        unit: UNITS.V,
        prefix: PREFIXES.SHORT[""]
      },
      ELECTRIC_RESISTANCE: {
        unit: UNITS.ohm,
        prefix: PREFIXES.SHORT[""]
      },
      ELECTRIC_INDUCTANCE: {
        unit: UNITS.H,
        prefix: PREFIXES.SHORT[""]
      },
      ELECTRIC_CONDUCTANCE: {
        unit: UNITS.S,
        prefix: PREFIXES.SHORT[""]
      },
      MAGNETIC_FLUX: {
        unit: UNITS.Wb,
        prefix: PREFIXES.SHORT[""]
      },
      MAGNETIC_FLUX_DENSITY: {
        unit: UNITS.T,
        prefix: PREFIXES.SHORT[""]
      },
      FREQUENCY: {
        unit: UNITS.Hz,
        prefix: PREFIXES.SHORT[""]
      }
    }
  };
  UNIT_SYSTEMS.cgs = JSON.parse(JSON.stringify(UNIT_SYSTEMS.si));
  UNIT_SYSTEMS.cgs.LENGTH = {
    unit: UNITS.m,
    prefix: PREFIXES.SHORT.c
  };
  UNIT_SYSTEMS.cgs.MASS = {
    unit: UNITS.g,
    prefix: PREFIXES.SHORT[""]
  };
  UNIT_SYSTEMS.cgs.FORCE = {
    unit: UNITS.dyn,
    prefix: PREFIXES.SHORT[""]
  };
  UNIT_SYSTEMS.cgs.ENERGY = {
    unit: UNITS.erg,
    prefix: PREFIXES.NONE[""]
  };
  UNIT_SYSTEMS.us = JSON.parse(JSON.stringify(UNIT_SYSTEMS.si));
  UNIT_SYSTEMS.us.LENGTH = {
    unit: UNITS.ft,
    prefix: PREFIXES.NONE[""]
  };
  UNIT_SYSTEMS.us.MASS = {
    unit: UNITS.lbm,
    prefix: PREFIXES.NONE[""]
  };
  UNIT_SYSTEMS.us.TEMPERATURE = {
    unit: UNITS.degF,
    prefix: PREFIXES.NONE[""]
  };
  UNIT_SYSTEMS.us.FORCE = {
    unit: UNITS.lbf,
    prefix: PREFIXES.NONE[""]
  };
  UNIT_SYSTEMS.us.ENERGY = {
    unit: UNITS.BTU,
    prefix: PREFIXES.BTU[""]
  };
  UNIT_SYSTEMS.us.POWER = {
    unit: UNITS.hp,
    prefix: PREFIXES.NONE[""]
  };
  UNIT_SYSTEMS.us.PRESSURE = {
    unit: UNITS.psi,
    prefix: PREFIXES.NONE[""]
  };
  UNIT_SYSTEMS.auto = JSON.parse(JSON.stringify(UNIT_SYSTEMS.si));
  var currentUnitSystem = UNIT_SYSTEMS.auto;
  Unit2.setUnitSystem = function(name2) {
    if (hasOwnProperty(UNIT_SYSTEMS, name2)) {
      currentUnitSystem = UNIT_SYSTEMS[name2];
    } else {
      throw new Error("Unit system " + name2 + " does not exist. Choices are: " + Object.keys(UNIT_SYSTEMS).join(", "));
    }
  };
  Unit2.getUnitSystem = function() {
    for (var _key in UNIT_SYSTEMS) {
      if (hasOwnProperty(UNIT_SYSTEMS, _key)) {
        if (UNIT_SYSTEMS[_key] === currentUnitSystem) {
          return _key;
        }
      }
    }
  };
  Unit2.typeConverters = {
    BigNumber: function BigNumber2(x) {
      if (x !== null && x !== void 0 && x.isFraction)
        return new _BigNumber(x.n).div(x.d).times(x.s);
      return new _BigNumber(x + "");
    },
    Fraction: function Fraction2(x) {
      return new _Fraction(x);
    },
    Complex: function Complex3(x) {
      return x;
    },
    number: function number2(x) {
      if (x !== null && x !== void 0 && x.isFraction)
        return _number(x);
      return x;
    }
  };
  Unit2.prototype._numberConverter = function() {
    var convert = Unit2.typeConverters[this.valueType()];
    if (convert) {
      return convert;
    }
    throw new TypeError('Unsupported Unit value type "' + this.valueType() + '"');
  };
  Unit2._getNumberConverter = function(type) {
    if (!Unit2.typeConverters[type]) {
      throw new TypeError('Unsupported type "' + type + '"');
    }
    return Unit2.typeConverters[type];
  };
  for (var _key2 in UNITS) {
    if (hasOwnProperty(UNITS, _key2)) {
      var unit2 = UNITS[_key2];
      unit2.dimensions = unit2.base.dimensions;
    }
  }
  for (var _name2 in ALIASES) {
    if (hasOwnProperty(ALIASES, _name2)) {
      var _unit2 = UNITS[ALIASES[_name2]];
      var alias = {};
      for (var _key3 in _unit2) {
        if (hasOwnProperty(_unit2, _key3)) {
          alias[_key3] = _unit2[_key3];
        }
      }
      alias.name = _name2;
      UNITS[_name2] = alias;
    }
  }
  Unit2.isValidAlpha = function isValidAlpha(c2) {
    return /^[a-zA-Z]$/.test(c2);
  };
  function assertUnitNameIsValid(name2) {
    for (var i2 = 0; i2 < name2.length; i2++) {
      c = name2.charAt(i2);
      if (i2 === 0 && !Unit2.isValidAlpha(c)) {
        throw new Error('Invalid unit name (must begin with alpha character): "' + name2 + '"');
      }
      if (i2 > 0 && !(Unit2.isValidAlpha(c) || isDigit(c))) {
        throw new Error('Invalid unit name (only alphanumeric characters are allowed): "' + name2 + '"');
      }
    }
  }
  Unit2.createUnit = function(obj, options) {
    if (typeof obj !== "object") {
      throw new TypeError("createUnit expects first parameter to be of type 'Object'");
    }
    if (options && options.override) {
      for (var _key4 in obj) {
        if (hasOwnProperty(obj, _key4)) {
          Unit2.deleteUnit(_key4);
        }
        if (obj[_key4].aliases) {
          for (var i2 = 0; i2 < obj[_key4].aliases.length; i2++) {
            Unit2.deleteUnit(obj[_key4].aliases[i2]);
          }
        }
      }
    }
    var lastUnit;
    for (var _key5 in obj) {
      if (hasOwnProperty(obj, _key5)) {
        lastUnit = Unit2.createUnitSingle(_key5, obj[_key5]);
      }
    }
    return lastUnit;
  };
  Unit2.createUnitSingle = function(name2, obj) {
    if (typeof obj === "undefined" || obj === null) {
      obj = {};
    }
    if (typeof name2 !== "string") {
      throw new TypeError("createUnitSingle expects first parameter to be of type 'string'");
    }
    if (hasOwnProperty(UNITS, name2)) {
      throw new Error('Cannot create unit "' + name2 + '": a unit with that name already exists');
    }
    assertUnitNameIsValid(name2);
    var defUnit = null;
    var aliases = [];
    var offset = 0;
    var definition;
    var prefixes;
    var baseName;
    if (obj && obj.type === "Unit") {
      defUnit = obj.clone();
    } else if (typeof obj === "string") {
      if (obj !== "") {
        definition = obj;
      }
    } else if (typeof obj === "object") {
      definition = obj.definition;
      prefixes = obj.prefixes;
      offset = obj.offset;
      baseName = obj.baseName;
      if (obj.aliases) {
        aliases = obj.aliases.valueOf();
      }
    } else {
      throw new TypeError('Cannot create unit "' + name2 + '" from "' + obj.toString() + '": expecting "string" or "Unit" or "Object"');
    }
    if (aliases) {
      for (var i2 = 0; i2 < aliases.length; i2++) {
        if (hasOwnProperty(UNITS, aliases[i2])) {
          throw new Error('Cannot create alias "' + aliases[i2] + '": a unit with that name already exists');
        }
      }
    }
    if (definition && typeof definition === "string" && !defUnit) {
      try {
        defUnit = Unit2.parse(definition, {
          allowNoUnits: true
        });
      } catch (ex) {
        ex.message = 'Could not create unit "' + name2 + '" from "' + definition + '": ' + ex.message;
        throw ex;
      }
    } else if (definition && definition.type === "Unit") {
      defUnit = definition.clone();
    }
    aliases = aliases || [];
    offset = offset || 0;
    if (prefixes && prefixes.toUpperCase) {
      prefixes = PREFIXES[prefixes.toUpperCase()] || PREFIXES.NONE;
    } else {
      prefixes = PREFIXES.NONE;
    }
    var newUnit = {};
    if (!defUnit) {
      baseName = baseName || name2 + "_STUFF";
      if (BASE_DIMENSIONS.indexOf(baseName) >= 0) {
        throw new Error('Cannot create new base unit "' + name2 + '": a base unit with that name already exists (and cannot be overridden)');
      }
      BASE_DIMENSIONS.push(baseName);
      for (var b in BASE_UNITS) {
        if (hasOwnProperty(BASE_UNITS, b)) {
          BASE_UNITS[b].dimensions[BASE_DIMENSIONS.length - 1] = 0;
        }
      }
      var newBaseUnit = {
        dimensions: []
      };
      for (var _i6 = 0; _i6 < BASE_DIMENSIONS.length; _i6++) {
        newBaseUnit.dimensions[_i6] = 0;
      }
      newBaseUnit.dimensions[BASE_DIMENSIONS.length - 1] = 1;
      newBaseUnit.key = baseName;
      BASE_UNITS[baseName] = newBaseUnit;
      newUnit = {
        name: name2,
        value: 1,
        dimensions: BASE_UNITS[baseName].dimensions.slice(0),
        prefixes,
        offset,
        base: BASE_UNITS[baseName]
      };
      currentUnitSystem[baseName] = {
        unit: newUnit,
        prefix: PREFIXES.NONE[""]
      };
    } else {
      newUnit = {
        name: name2,
        value: defUnit.value,
        dimensions: defUnit.dimensions.slice(0),
        prefixes,
        offset
      };
      var anyMatch = false;
      for (var _i7 in BASE_UNITS) {
        if (hasOwnProperty(BASE_UNITS, _i7)) {
          var match = true;
          for (var j = 0; j < BASE_DIMENSIONS.length; j++) {
            if (Math.abs((newUnit.dimensions[j] || 0) - (BASE_UNITS[_i7].dimensions[j] || 0)) > 1e-12) {
              match = false;
              break;
            }
          }
          if (match) {
            anyMatch = true;
            newUnit.base = BASE_UNITS[_i7];
            break;
          }
        }
      }
      if (!anyMatch) {
        baseName = baseName || name2 + "_STUFF";
        var _newBaseUnit = {
          dimensions: defUnit.dimensions.slice(0)
        };
        _newBaseUnit.key = baseName;
        BASE_UNITS[baseName] = _newBaseUnit;
        currentUnitSystem[baseName] = {
          unit: newUnit,
          prefix: PREFIXES.NONE[""]
        };
        newUnit.base = BASE_UNITS[baseName];
      }
    }
    Unit2.UNITS[name2] = newUnit;
    for (var _i8 = 0; _i8 < aliases.length; _i8++) {
      var aliasName = aliases[_i8];
      var _alias = {};
      for (var _key6 in newUnit) {
        if (hasOwnProperty(newUnit, _key6)) {
          _alias[_key6] = newUnit[_key6];
        }
      }
      _alias.name = aliasName;
      Unit2.UNITS[aliasName] = _alias;
    }
    delete _findUnit.cache;
    return new Unit2(null, name2);
  };
  Unit2.deleteUnit = function(name2) {
    delete Unit2.UNITS[name2];
    delete _findUnit.cache;
  };
  Unit2.PREFIXES = PREFIXES;
  Unit2.BASE_DIMENSIONS = BASE_DIMENSIONS;
  Unit2.BASE_UNITS = BASE_UNITS;
  Unit2.UNIT_SYSTEMS = UNIT_SYSTEMS;
  Unit2.UNITS = UNITS;
  return Unit2;
}, {
  isClass: true
});
var name$1s = "unit";
var dependencies$1s = ["typed", "Unit"];
var createUnitFunction = /* @__PURE__ */ factory(name$1s, dependencies$1s, (_ref) => {
  var {
    typed: typed2,
    Unit: Unit2
  } = _ref;
  return typed2(name$1s, {
    Unit: function Unit3(x) {
      return x.clone();
    },
    string: function string2(x) {
      if (Unit2.isValuelessUnit(x)) {
        return new Unit2(null, x);
      }
      return Unit2.parse(x, {
        allowNoUnits: true
      });
    },
    "number | BigNumber | Fraction | Complex, string | Unit": function numberBigNumberFractionComplexStringUnit(value, unit2) {
      return new Unit2(value, unit2);
    },
    "number | BigNumber | Fraction": function numberBigNumberFraction(value) {
      return new Unit2(value);
    },
    "Array | Matrix": typed2.referToSelf((self2) => (x) => deepMap(x, self2))
  });
});
var name$1r = "sparse";
var dependencies$1r = ["typed", "SparseMatrix"];
var createSparse = /* @__PURE__ */ factory(name$1r, dependencies$1r, (_ref) => {
  var {
    typed: typed2,
    SparseMatrix: SparseMatrix2
  } = _ref;
  return typed2(name$1r, {
    "": function _() {
      return new SparseMatrix2([]);
    },
    string: function string2(datatype) {
      return new SparseMatrix2([], datatype);
    },
    "Array | Matrix": function ArrayMatrix(data) {
      return new SparseMatrix2(data);
    },
    "Array | Matrix, string": function ArrayMatrixString(data, datatype) {
      return new SparseMatrix2(data, datatype);
    }
  });
});
var name$1q = "createUnit";
var dependencies$1q = ["typed", "Unit"];
var createCreateUnit = /* @__PURE__ */ factory(name$1q, dependencies$1q, (_ref) => {
  var {
    typed: typed2,
    Unit: Unit2
  } = _ref;
  return typed2(name$1q, {
    // General function signature. First parameter is an object where each property is the definition of a new unit. The object keys are the unit names and the values are the definitions. The values can be objects, strings, or Units. If a property is an empty object or an empty string, a new base unit is created. The second parameter is the options.
    "Object, Object": function ObjectObject(obj, options) {
      return Unit2.createUnit(obj, options);
    },
    // Same as above but without the options.
    Object: function Object2(obj) {
      return Unit2.createUnit(obj, {});
    },
    // Shortcut method for creating one unit.
    "string, Unit | string | Object, Object": function stringUnitStringObjectObject(name2, def, options) {
      var obj = {};
      obj[name2] = def;
      return Unit2.createUnit(obj, options);
    },
    // Same as above but without the options.
    "string, Unit | string | Object": function stringUnitStringObject(name2, def) {
      var obj = {};
      obj[name2] = def;
      return Unit2.createUnit(obj, {});
    },
    // Without a definition, creates a base unit.
    string: function string2(name2) {
      var obj = {};
      obj[name2] = {};
      return Unit2.createUnit(obj, {});
    }
  });
});
var name$1p = "acos";
var dependencies$1p = ["typed", "config", "Complex"];
var createAcos = /* @__PURE__ */ factory(name$1p, dependencies$1p, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    Complex: Complex2
  } = _ref;
  return typed2(name$1p, {
    number: function number2(x) {
      if (x >= -1 && x <= 1 || config3.predictable) {
        return Math.acos(x);
      } else {
        return new Complex2(x, 0).acos();
      }
    },
    Complex: function Complex3(x) {
      return x.acos();
    },
    BigNumber: function BigNumber2(x) {
      return x.acos();
    }
  });
});
var name$1o = "acosh";
var dependencies$1o = ["typed", "config", "Complex"];
var createAcosh = /* @__PURE__ */ factory(name$1o, dependencies$1o, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    Complex: Complex2
  } = _ref;
  return typed2(name$1o, {
    number: function number2(x) {
      if (x >= 1 || config3.predictable) {
        return acoshNumber(x);
      }
      if (x <= -1) {
        return new Complex2(Math.log(Math.sqrt(x * x - 1) - x), Math.PI);
      }
      return new Complex2(x, 0).acosh();
    },
    Complex: function Complex3(x) {
      return x.acosh();
    },
    BigNumber: function BigNumber2(x) {
      return x.acosh();
    }
  });
});
var name$1n = "acot";
var dependencies$1n = ["typed", "BigNumber"];
var createAcot = /* @__PURE__ */ factory(name$1n, dependencies$1n, (_ref) => {
  var {
    typed: typed2,
    BigNumber: _BigNumber
  } = _ref;
  return typed2(name$1n, {
    number: acotNumber,
    Complex: function Complex2(x) {
      return x.acot();
    },
    BigNumber: function BigNumber2(x) {
      return new _BigNumber(1).div(x).atan();
    }
  });
});
var name$1m = "acoth";
var dependencies$1m = ["typed", "config", "Complex", "BigNumber"];
var createAcoth = /* @__PURE__ */ factory(name$1m, dependencies$1m, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    Complex: Complex2,
    BigNumber: _BigNumber
  } = _ref;
  return typed2(name$1m, {
    number: function number2(x) {
      if (x >= 1 || x <= -1 || config3.predictable) {
        return acothNumber(x);
      }
      return new Complex2(x, 0).acoth();
    },
    Complex: function Complex3(x) {
      return x.acoth();
    },
    BigNumber: function BigNumber2(x) {
      return new _BigNumber(1).div(x).atanh();
    }
  });
});
var name$1l = "acsc";
var dependencies$1l = ["typed", "config", "Complex", "BigNumber"];
var createAcsc = /* @__PURE__ */ factory(name$1l, dependencies$1l, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    Complex: Complex2,
    BigNumber: _BigNumber
  } = _ref;
  return typed2(name$1l, {
    number: function number2(x) {
      if (x <= -1 || x >= 1 || config3.predictable) {
        return acscNumber(x);
      }
      return new Complex2(x, 0).acsc();
    },
    Complex: function Complex3(x) {
      return x.acsc();
    },
    BigNumber: function BigNumber2(x) {
      return new _BigNumber(1).div(x).asin();
    }
  });
});
var name$1k = "acsch";
var dependencies$1k = ["typed", "BigNumber"];
var createAcsch = /* @__PURE__ */ factory(name$1k, dependencies$1k, (_ref) => {
  var {
    typed: typed2,
    BigNumber: _BigNumber
  } = _ref;
  return typed2(name$1k, {
    number: acschNumber,
    Complex: function Complex2(x) {
      return x.acsch();
    },
    BigNumber: function BigNumber2(x) {
      return new _BigNumber(1).div(x).asinh();
    }
  });
});
var name$1j = "asec";
var dependencies$1j = ["typed", "config", "Complex", "BigNumber"];
var createAsec = /* @__PURE__ */ factory(name$1j, dependencies$1j, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    Complex: Complex2,
    BigNumber: _BigNumber
  } = _ref;
  return typed2(name$1j, {
    number: function number2(x) {
      if (x <= -1 || x >= 1 || config3.predictable) {
        return asecNumber(x);
      }
      return new Complex2(x, 0).asec();
    },
    Complex: function Complex3(x) {
      return x.asec();
    },
    BigNumber: function BigNumber2(x) {
      return new _BigNumber(1).div(x).acos();
    }
  });
});
var name$1i = "asech";
var dependencies$1i = ["typed", "config", "Complex", "BigNumber"];
var createAsech = /* @__PURE__ */ factory(name$1i, dependencies$1i, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    Complex: Complex2,
    BigNumber: _BigNumber
  } = _ref;
  return typed2(name$1i, {
    number: function number2(x) {
      if (x <= 1 && x >= -1 || config3.predictable) {
        var xInv = 1 / x;
        if (xInv > 0 || config3.predictable) {
          return asechNumber(x);
        }
        var ret = Math.sqrt(xInv * xInv - 1);
        return new Complex2(Math.log(ret - xInv), Math.PI);
      }
      return new Complex2(x, 0).asech();
    },
    Complex: function Complex3(x) {
      return x.asech();
    },
    BigNumber: function BigNumber2(x) {
      return new _BigNumber(1).div(x).acosh();
    }
  });
});
var name$1h = "asin";
var dependencies$1h = ["typed", "config", "Complex"];
var createAsin = /* @__PURE__ */ factory(name$1h, dependencies$1h, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    Complex: Complex2
  } = _ref;
  return typed2(name$1h, {
    number: function number2(x) {
      if (x >= -1 && x <= 1 || config3.predictable) {
        return Math.asin(x);
      } else {
        return new Complex2(x, 0).asin();
      }
    },
    Complex: function Complex3(x) {
      return x.asin();
    },
    BigNumber: function BigNumber2(x) {
      return x.asin();
    }
  });
});
var name$1g = "asinh";
var dependencies$1g = ["typed"];
var createAsinh = /* @__PURE__ */ factory(name$1g, dependencies$1g, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2("asinh", {
    number: asinhNumber,
    Complex: function Complex2(x) {
      return x.asinh();
    },
    BigNumber: function BigNumber2(x) {
      return x.asinh();
    }
  });
});
var name$1f = "atan";
var dependencies$1f = ["typed"];
var createAtan = /* @__PURE__ */ factory(name$1f, dependencies$1f, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2("atan", {
    number: function number2(x) {
      return Math.atan(x);
    },
    Complex: function Complex2(x) {
      return x.atan();
    },
    BigNumber: function BigNumber2(x) {
      return x.atan();
    }
  });
});
var name$1e = "atan2";
var dependencies$1e = ["typed", "matrix", "equalScalar", "BigNumber", "DenseMatrix", "concat"];
var createAtan2 = /* @__PURE__ */ factory(name$1e, dependencies$1e, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    BigNumber: BigNumber2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var matAlgo02xDS0 = createMatAlgo02xDS0({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo03xDSf = createMatAlgo03xDSf({
    typed: typed2
  });
  var matAlgo09xS0Sf = createMatAlgo09xS0Sf({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  return typed2(name$1e, {
    "number, number": Math.atan2,
    // Complex numbers doesn't seem to have a reasonable implementation of
    // atan2(). Even Matlab removed the support, after they only calculated
    // the atan only on base of the real part of the numbers and ignored
    // the imaginary.
    "BigNumber, BigNumber": (y, x) => BigNumber2.atan2(y, x)
  }, matrixAlgorithmSuite({
    scalar: "number | BigNumber",
    SS: matAlgo09xS0Sf,
    DS: matAlgo03xDSf,
    SD: matAlgo02xDS0,
    Ss: matAlgo11xS0s,
    sS: matAlgo12xSfs
  }));
});
var name$1d = "atanh";
var dependencies$1d = ["typed", "config", "Complex"];
var createAtanh = /* @__PURE__ */ factory(name$1d, dependencies$1d, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    Complex: Complex2
  } = _ref;
  return typed2(name$1d, {
    number: function number2(x) {
      if (x <= 1 && x >= -1 || config3.predictable) {
        return atanhNumber(x);
      }
      return new Complex2(x, 0).atanh();
    },
    Complex: function Complex3(x) {
      return x.atanh();
    },
    BigNumber: function BigNumber2(x) {
      return x.atanh();
    }
  });
});
var createTrigUnit = /* @__PURE__ */ factory("trigUnit", ["typed"], (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return {
    Unit: typed2.referToSelf((self2) => (x) => {
      if (!x.hasBase(x.constructor.BASE_UNITS.ANGLE)) {
        throw new TypeError("Unit in function cot is no angle");
      }
      return typed2.find(self2, x.valueType())(x.value);
    })
  };
});
var name$1c = "cos";
var dependencies$1c = ["typed"];
var createCos = /* @__PURE__ */ factory(name$1c, dependencies$1c, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  var trigUnit = createTrigUnit({
    typed: typed2
  });
  return typed2(name$1c, {
    number: Math.cos,
    "Complex | BigNumber": (x) => x.cos()
  }, trigUnit);
});
var name$1b = "cosh";
var dependencies$1b = ["typed"];
var createCosh = /* @__PURE__ */ factory(name$1b, dependencies$1b, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$1b, {
    number: cosh$2,
    "Complex | BigNumber": (x) => x.cosh()
  });
});
var name$1a = "cot";
var dependencies$1a = ["typed", "BigNumber"];
var createCot = /* @__PURE__ */ factory(name$1a, dependencies$1a, (_ref) => {
  var {
    typed: typed2,
    BigNumber: _BigNumber
  } = _ref;
  var trigUnit = createTrigUnit({
    typed: typed2
  });
  return typed2(name$1a, {
    number: cotNumber,
    Complex: (x) => x.cot(),
    BigNumber: (x) => new _BigNumber(1).div(x.tan())
  }, trigUnit);
});
var name$19 = "coth";
var dependencies$19 = ["typed", "BigNumber"];
var createCoth = /* @__PURE__ */ factory(name$19, dependencies$19, (_ref) => {
  var {
    typed: typed2,
    BigNumber: _BigNumber
  } = _ref;
  return typed2(name$19, {
    number: cothNumber,
    Complex: (x) => x.coth(),
    BigNumber: (x) => new _BigNumber(1).div(x.tanh())
  });
});
var name$18 = "csc";
var dependencies$18 = ["typed", "BigNumber"];
var createCsc = /* @__PURE__ */ factory(name$18, dependencies$18, (_ref) => {
  var {
    typed: typed2,
    BigNumber: _BigNumber
  } = _ref;
  var trigUnit = createTrigUnit({
    typed: typed2
  });
  return typed2(name$18, {
    number: cscNumber,
    Complex: (x) => x.csc(),
    BigNumber: (x) => new _BigNumber(1).div(x.sin())
  }, trigUnit);
});
var name$17 = "csch";
var dependencies$17 = ["typed", "BigNumber"];
var createCsch = /* @__PURE__ */ factory(name$17, dependencies$17, (_ref) => {
  var {
    typed: typed2,
    BigNumber: _BigNumber
  } = _ref;
  return typed2(name$17, {
    number: cschNumber,
    Complex: (x) => x.csch(),
    BigNumber: (x) => new _BigNumber(1).div(x.sinh())
  });
});
var name$16 = "sec";
var dependencies$16 = ["typed", "BigNumber"];
var createSec = /* @__PURE__ */ factory(name$16, dependencies$16, (_ref) => {
  var {
    typed: typed2,
    BigNumber: _BigNumber
  } = _ref;
  var trigUnit = createTrigUnit({
    typed: typed2
  });
  return typed2(name$16, {
    number: secNumber,
    Complex: (x) => x.sec(),
    BigNumber: (x) => new _BigNumber(1).div(x.cos())
  }, trigUnit);
});
var name$15 = "sech";
var dependencies$15 = ["typed", "BigNumber"];
var createSech = /* @__PURE__ */ factory(name$15, dependencies$15, (_ref) => {
  var {
    typed: typed2,
    BigNumber: _BigNumber
  } = _ref;
  return typed2(name$15, {
    number: sechNumber,
    Complex: (x) => x.sech(),
    BigNumber: (x) => new _BigNumber(1).div(x.cosh())
  });
});
var name$14 = "sin";
var dependencies$14 = ["typed"];
var createSin = /* @__PURE__ */ factory(name$14, dependencies$14, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  var trigUnit = createTrigUnit({
    typed: typed2
  });
  return typed2(name$14, {
    number: Math.sin,
    "Complex | BigNumber": (x) => x.sin()
  }, trigUnit);
});
var name$13 = "sinh";
var dependencies$13 = ["typed"];
var createSinh = /* @__PURE__ */ factory(name$13, dependencies$13, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$13, {
    number: sinhNumber,
    "Complex | BigNumber": (x) => x.sinh()
  });
});
var name$12 = "tan";
var dependencies$12 = ["typed"];
var createTan = /* @__PURE__ */ factory(name$12, dependencies$12, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  var trigUnit = createTrigUnit({
    typed: typed2
  });
  return typed2(name$12, {
    number: Math.tan,
    "Complex | BigNumber": (x) => x.tan()
  }, trigUnit);
});
var name$11 = "tanh";
var dependencies$11 = ["typed"];
var createTanh = /* @__PURE__ */ factory(name$11, dependencies$11, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2("tanh", {
    number: tanh$2,
    "Complex | BigNumber": (x) => x.tanh()
  });
});
var name$10 = "setCartesian";
var dependencies$10 = ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"];
var createSetCartesian = /* @__PURE__ */ factory(name$10, dependencies$10, (_ref) => {
  var {
    typed: typed2,
    size: size2,
    subset: subset2,
    compareNatural: compareNatural2,
    Index: Index2,
    DenseMatrix: DenseMatrix2
  } = _ref;
  return typed2(name$10, {
    "Array | Matrix, Array | Matrix": function ArrayMatrixArrayMatrix(a1, a2) {
      var result = [];
      if (subset2(size2(a1), new Index2(0)) !== 0 && subset2(size2(a2), new Index2(0)) !== 0) {
        var b1 = flatten$1(Array.isArray(a1) ? a1 : a1.toArray()).sort(compareNatural2);
        var b2 = flatten$1(Array.isArray(a2) ? a2 : a2.toArray()).sort(compareNatural2);
        result = [];
        for (var i2 = 0; i2 < b1.length; i2++) {
          for (var j = 0; j < b2.length; j++) {
            result.push([b1[i2], b2[j]]);
          }
        }
      }
      if (Array.isArray(a1) && Array.isArray(a2)) {
        return result;
      }
      return new DenseMatrix2(result);
    }
  });
});
var name$$ = "setDifference";
var dependencies$$ = ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"];
var createSetDifference = /* @__PURE__ */ factory(name$$, dependencies$$, (_ref) => {
  var {
    typed: typed2,
    size: size2,
    subset: subset2,
    compareNatural: compareNatural2,
    Index: Index2,
    DenseMatrix: DenseMatrix2
  } = _ref;
  return typed2(name$$, {
    "Array | Matrix, Array | Matrix": function ArrayMatrixArrayMatrix(a1, a2) {
      var result;
      if (subset2(size2(a1), new Index2(0)) === 0) {
        result = [];
      } else if (subset2(size2(a2), new Index2(0)) === 0) {
        return flatten$1(a1.toArray());
      } else {
        var b1 = identify(flatten$1(Array.isArray(a1) ? a1 : a1.toArray()).sort(compareNatural2));
        var b2 = identify(flatten$1(Array.isArray(a2) ? a2 : a2.toArray()).sort(compareNatural2));
        result = [];
        var inb2;
        for (var i2 = 0; i2 < b1.length; i2++) {
          inb2 = false;
          for (var j = 0; j < b2.length; j++) {
            if (compareNatural2(b1[i2].value, b2[j].value) === 0 && b1[i2].identifier === b2[j].identifier) {
              inb2 = true;
              break;
            }
          }
          if (!inb2) {
            result.push(b1[i2]);
          }
        }
      }
      if (Array.isArray(a1) && Array.isArray(a2)) {
        return generalize(result);
      }
      return new DenseMatrix2(generalize(result));
    }
  });
});
var name$_ = "setDistinct";
var dependencies$_ = ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"];
var createSetDistinct = /* @__PURE__ */ factory(name$_, dependencies$_, (_ref) => {
  var {
    typed: typed2,
    size: size2,
    subset: subset2,
    compareNatural: compareNatural2,
    Index: Index2,
    DenseMatrix: DenseMatrix2
  } = _ref;
  return typed2(name$_, {
    "Array | Matrix": function ArrayMatrix(a) {
      var result;
      if (subset2(size2(a), new Index2(0)) === 0) {
        result = [];
      } else {
        var b = flatten$1(Array.isArray(a) ? a : a.toArray()).sort(compareNatural2);
        result = [];
        result.push(b[0]);
        for (var i2 = 1; i2 < b.length; i2++) {
          if (compareNatural2(b[i2], b[i2 - 1]) !== 0) {
            result.push(b[i2]);
          }
        }
      }
      if (Array.isArray(a)) {
        return result;
      }
      return new DenseMatrix2(result);
    }
  });
});
var name$Z = "setIntersect";
var dependencies$Z = ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"];
var createSetIntersect = /* @__PURE__ */ factory(name$Z, dependencies$Z, (_ref) => {
  var {
    typed: typed2,
    size: size2,
    subset: subset2,
    compareNatural: compareNatural2,
    Index: Index2,
    DenseMatrix: DenseMatrix2
  } = _ref;
  return typed2(name$Z, {
    "Array | Matrix, Array | Matrix": function ArrayMatrixArrayMatrix(a1, a2) {
      var result;
      if (subset2(size2(a1), new Index2(0)) === 0 || subset2(size2(a2), new Index2(0)) === 0) {
        result = [];
      } else {
        var b1 = identify(flatten$1(Array.isArray(a1) ? a1 : a1.toArray()).sort(compareNatural2));
        var b2 = identify(flatten$1(Array.isArray(a2) ? a2 : a2.toArray()).sort(compareNatural2));
        result = [];
        for (var i2 = 0; i2 < b1.length; i2++) {
          for (var j = 0; j < b2.length; j++) {
            if (compareNatural2(b1[i2].value, b2[j].value) === 0 && b1[i2].identifier === b2[j].identifier) {
              result.push(b1[i2]);
              break;
            }
          }
        }
      }
      if (Array.isArray(a1) && Array.isArray(a2)) {
        return generalize(result);
      }
      return new DenseMatrix2(generalize(result));
    }
  });
});
var name$Y = "setIsSubset";
var dependencies$Y = ["typed", "size", "subset", "compareNatural", "Index"];
var createSetIsSubset = /* @__PURE__ */ factory(name$Y, dependencies$Y, (_ref) => {
  var {
    typed: typed2,
    size: size2,
    subset: subset2,
    compareNatural: compareNatural2,
    Index: Index2
  } = _ref;
  return typed2(name$Y, {
    "Array | Matrix, Array | Matrix": function ArrayMatrixArrayMatrix(a1, a2) {
      if (subset2(size2(a1), new Index2(0)) === 0) {
        return true;
      } else if (subset2(size2(a2), new Index2(0)) === 0) {
        return false;
      }
      var b1 = identify(flatten$1(Array.isArray(a1) ? a1 : a1.toArray()).sort(compareNatural2));
      var b2 = identify(flatten$1(Array.isArray(a2) ? a2 : a2.toArray()).sort(compareNatural2));
      var inb2;
      for (var i2 = 0; i2 < b1.length; i2++) {
        inb2 = false;
        for (var j = 0; j < b2.length; j++) {
          if (compareNatural2(b1[i2].value, b2[j].value) === 0 && b1[i2].identifier === b2[j].identifier) {
            inb2 = true;
            break;
          }
        }
        if (inb2 === false) {
          return false;
        }
      }
      return true;
    }
  });
});
var name$X = "setMultiplicity";
var dependencies$X = ["typed", "size", "subset", "compareNatural", "Index"];
var createSetMultiplicity = /* @__PURE__ */ factory(name$X, dependencies$X, (_ref) => {
  var {
    typed: typed2,
    size: size2,
    subset: subset2,
    compareNatural: compareNatural2,
    Index: Index2
  } = _ref;
  return typed2(name$X, {
    "number | BigNumber | Fraction | Complex, Array | Matrix": function numberBigNumberFractionComplexArrayMatrix(e2, a) {
      if (subset2(size2(a), new Index2(0)) === 0) {
        return 0;
      }
      var b = flatten$1(Array.isArray(a) ? a : a.toArray());
      var count2 = 0;
      for (var i2 = 0; i2 < b.length; i2++) {
        if (compareNatural2(b[i2], e2) === 0) {
          count2++;
        }
      }
      return count2;
    }
  });
});
var name$W = "setPowerset";
var dependencies$W = ["typed", "size", "subset", "compareNatural", "Index"];
var createSetPowerset = /* @__PURE__ */ factory(name$W, dependencies$W, (_ref) => {
  var {
    typed: typed2,
    size: size2,
    subset: subset2,
    compareNatural: compareNatural2,
    Index: Index2
  } = _ref;
  return typed2(name$W, {
    "Array | Matrix": function ArrayMatrix(a) {
      if (subset2(size2(a), new Index2(0)) === 0) {
        return [];
      }
      var b = flatten$1(Array.isArray(a) ? a : a.toArray()).sort(compareNatural2);
      var result = [];
      var number2 = 0;
      while (number2.toString(2).length <= b.length) {
        result.push(_subset(b, number2.toString(2).split("").reverse()));
        number2++;
      }
      return _sort(result);
    }
  });
  function _subset(array, bitarray) {
    var result = [];
    for (var i2 = 0; i2 < bitarray.length; i2++) {
      if (bitarray[i2] === "1") {
        result.push(array[i2]);
      }
    }
    return result;
  }
  function _sort(array) {
    var temp = [];
    for (var i2 = array.length - 1; i2 > 0; i2--) {
      for (var j = 0; j < i2; j++) {
        if (array[j].length > array[j + 1].length) {
          temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
    return array;
  }
});
var name$V = "setSize";
var dependencies$V = ["typed", "compareNatural"];
var createSetSize = /* @__PURE__ */ factory(name$V, dependencies$V, (_ref) => {
  var {
    typed: typed2,
    compareNatural: compareNatural2
  } = _ref;
  return typed2(name$V, {
    "Array | Matrix": function ArrayMatrix(a) {
      return Array.isArray(a) ? flatten$1(a).length : flatten$1(a.toArray()).length;
    },
    "Array | Matrix, boolean": function ArrayMatrixBoolean(a, unique) {
      if (unique === false || a.length === 0) {
        return Array.isArray(a) ? flatten$1(a).length : flatten$1(a.toArray()).length;
      } else {
        var b = flatten$1(Array.isArray(a) ? a : a.toArray()).sort(compareNatural2);
        var count2 = 1;
        for (var i2 = 1; i2 < b.length; i2++) {
          if (compareNatural2(b[i2], b[i2 - 1]) !== 0) {
            count2++;
          }
        }
        return count2;
      }
    }
  });
});
var name$U = "setSymDifference";
var dependencies$U = ["typed", "size", "concat", "subset", "setDifference", "Index"];
var createSetSymDifference = /* @__PURE__ */ factory(name$U, dependencies$U, (_ref) => {
  var {
    typed: typed2,
    size: size2,
    concat: concat2,
    subset: subset2,
    setDifference: setDifference2,
    Index: Index2
  } = _ref;
  return typed2(name$U, {
    "Array | Matrix, Array | Matrix": function ArrayMatrixArrayMatrix(a1, a2) {
      if (subset2(size2(a1), new Index2(0)) === 0) {
        return flatten$1(a2);
      } else if (subset2(size2(a2), new Index2(0)) === 0) {
        return flatten$1(a1);
      }
      var b1 = flatten$1(a1);
      var b2 = flatten$1(a2);
      return concat2(setDifference2(b1, b2), setDifference2(b2, b1));
    }
  });
});
var name$T = "setUnion";
var dependencies$T = ["typed", "size", "concat", "subset", "setIntersect", "setSymDifference", "Index"];
var createSetUnion = /* @__PURE__ */ factory(name$T, dependencies$T, (_ref) => {
  var {
    typed: typed2,
    size: size2,
    concat: concat2,
    subset: subset2,
    setIntersect: setIntersect2,
    setSymDifference: setSymDifference2,
    Index: Index2
  } = _ref;
  return typed2(name$T, {
    "Array | Matrix, Array | Matrix": function ArrayMatrixArrayMatrix(a1, a2) {
      if (subset2(size2(a1), new Index2(0)) === 0) {
        return flatten$1(a2);
      } else if (subset2(size2(a2), new Index2(0)) === 0) {
        return flatten$1(a1);
      }
      var b1 = flatten$1(a1);
      var b2 = flatten$1(a2);
      return concat2(setSymDifference2(b1, b2), setIntersect2(b1, b2));
    }
  });
});
var name$S = "add";
var dependencies$S = ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix", "concat"];
var createAdd = /* @__PURE__ */ factory(name$S, dependencies$S, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    addScalar: addScalar2,
    equalScalar: equalScalar2,
    DenseMatrix: DenseMatrix2,
    SparseMatrix: SparseMatrix2,
    concat: concat2
  } = _ref;
  var matAlgo01xDSid = createMatAlgo01xDSid({
    typed: typed2
  });
  var matAlgo04xSidSid = createMatAlgo04xSidSid({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo10xSids = createMatAlgo10xSids({
    typed: typed2,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed2,
    matrix: matrix2,
    concat: concat2
  });
  return typed2(name$S, {
    "any, any": addScalar2,
    "any, any, ...any": typed2.referToSelf((self2) => (x, y, rest) => {
      var result = self2(x, y);
      for (var i2 = 0; i2 < rest.length; i2++) {
        result = self2(result, rest[i2]);
      }
      return result;
    })
  }, matrixAlgorithmSuite({
    elop: addScalar2,
    DS: matAlgo01xDSid,
    SS: matAlgo04xSidSid,
    Ss: matAlgo10xSids
  }));
});
var name$R = "hypot";
var dependencies$R = ["typed", "abs", "addScalar", "divideScalar", "multiplyScalar", "sqrt", "smaller", "isPositive"];
var createHypot = /* @__PURE__ */ factory(name$R, dependencies$R, (_ref) => {
  var {
    typed: typed2,
    abs: abs2,
    addScalar: addScalar2,
    divideScalar: divideScalar2,
    multiplyScalar: multiplyScalar2,
    sqrt: sqrt2,
    smaller: smaller2,
    isPositive: isPositive2
  } = _ref;
  return typed2(name$R, {
    "... number | BigNumber": _hypot,
    Array: _hypot,
    Matrix: (M) => _hypot(flatten$1(M.toArray()))
  });
  function _hypot(args) {
    var result = 0;
    var largest = 0;
    for (var i2 = 0; i2 < args.length; i2++) {
      if (isComplex(args[i2])) {
        throw new TypeError("Unexpected type of argument to hypot");
      }
      var value = abs2(args[i2]);
      if (smaller2(largest, value)) {
        result = multiplyScalar2(result, multiplyScalar2(divideScalar2(largest, value), divideScalar2(largest, value)));
        result = addScalar2(result, 1);
        largest = value;
      } else {
        result = addScalar2(result, isPositive2(value) ? multiplyScalar2(divideScalar2(value, largest), divideScalar2(value, largest)) : value);
      }
    }
    return multiplyScalar2(largest, sqrt2(result));
  }
});
var name$Q = "norm";
var dependencies$Q = ["typed", "abs", "add", "pow", "conj", "sqrt", "multiply", "equalScalar", "larger", "smaller", "matrix", "ctranspose", "eigs"];
var createNorm = /* @__PURE__ */ factory(name$Q, dependencies$Q, (_ref) => {
  var {
    typed: typed2,
    abs: abs2,
    add: add2,
    pow: pow2,
    conj: conj2,
    sqrt: sqrt2,
    multiply: multiply2,
    equalScalar: equalScalar2,
    larger: larger2,
    smaller: smaller2,
    matrix: matrix2,
    ctranspose: ctranspose2,
    eigs: eigs2
  } = _ref;
  return typed2(name$Q, {
    number: Math.abs,
    Complex: function Complex2(x) {
      return x.abs();
    },
    BigNumber: function BigNumber2(x) {
      return x.abs();
    },
    boolean: function boolean2(x) {
      return Math.abs(x);
    },
    Array: function Array2(x) {
      return _norm(matrix2(x), 2);
    },
    Matrix: function Matrix2(x) {
      return _norm(x, 2);
    },
    "Array, number | BigNumber | string": function ArrayNumberBigNumberString(x, p) {
      return _norm(matrix2(x), p);
    },
    "Matrix, number | BigNumber | string": function MatrixNumberBigNumberString(x, p) {
      return _norm(x, p);
    }
  });
  function _vectorNormPlusInfinity(x) {
    var pinf = 0;
    x.forEach(function(value) {
      var v = abs2(value);
      if (larger2(v, pinf)) {
        pinf = v;
      }
    }, true);
    return pinf;
  }
  function _vectorNormMinusInfinity(x) {
    var ninf;
    x.forEach(function(value) {
      var v = abs2(value);
      if (!ninf || smaller2(v, ninf)) {
        ninf = v;
      }
    }, true);
    return ninf || 0;
  }
  function _vectorNorm(x, p) {
    if (p === Number.POSITIVE_INFINITY || p === "inf") {
      return _vectorNormPlusInfinity(x);
    }
    if (p === Number.NEGATIVE_INFINITY || p === "-inf") {
      return _vectorNormMinusInfinity(x);
    }
    if (p === "fro") {
      return _norm(x, 2);
    }
    if (typeof p === "number" && !isNaN(p)) {
      if (!equalScalar2(p, 0)) {
        var n = 0;
        x.forEach(function(value) {
          n = add2(pow2(abs2(value), p), n);
        }, true);
        return pow2(n, 1 / p);
      }
      return Number.POSITIVE_INFINITY;
    }
    throw new Error("Unsupported parameter value");
  }
  function _matrixNormFrobenius(x) {
    var fro = 0;
    x.forEach(function(value, index2) {
      fro = add2(fro, multiply2(value, conj2(value)));
    });
    return abs2(sqrt2(fro));
  }
  function _matrixNormOne(x) {
    var c = [];
    var maxc = 0;
    x.forEach(function(value, index2) {
      var j = index2[1];
      var cj = add2(c[j] || 0, abs2(value));
      if (larger2(cj, maxc)) {
        maxc = cj;
      }
      c[j] = cj;
    }, true);
    return maxc;
  }
  function _matrixNormTwo(x) {
    var sizeX = x.size();
    if (sizeX[0] !== sizeX[1]) {
      throw new RangeError("Invalid matrix dimensions");
    }
    var tx = ctranspose2(x);
    var squaredX = multiply2(tx, x);
    var eigenVals = eigs2(squaredX).values.toArray();
    var rho = eigenVals[eigenVals.length - 1];
    return abs2(sqrt2(rho));
  }
  function _matrixNormInfinity(x) {
    var r = [];
    var maxr = 0;
    x.forEach(function(value, index2) {
      var i2 = index2[0];
      var ri = add2(r[i2] || 0, abs2(value));
      if (larger2(ri, maxr)) {
        maxr = ri;
      }
      r[i2] = ri;
    }, true);
    return maxr;
  }
  function _matrixNorm(x, p) {
    if (p === 1) {
      return _matrixNormOne(x);
    }
    if (p === Number.POSITIVE_INFINITY || p === "inf") {
      return _matrixNormInfinity(x);
    }
    if (p === "fro") {
      return _matrixNormFrobenius(x);
    }
    if (p === 2) {
      return _matrixNormTwo(x);
    }
    throw new Error("Unsupported parameter value " + p);
  }
  function _norm(x, p) {
    var sizeX = x.size();
    if (sizeX.length === 1) {
      return _vectorNorm(x, p);
    }
    if (sizeX.length === 2) {
      if (sizeX[0] && sizeX[1]) {
        return _matrixNorm(x, p);
      } else {
        throw new RangeError("Invalid matrix dimensions");
      }
    }
  }
});
var name$P = "dot";
var dependencies$P = ["typed", "addScalar", "multiplyScalar", "conj", "size"];
var createDot = /* @__PURE__ */ factory(name$P, dependencies$P, (_ref) => {
  var {
    typed: typed2,
    addScalar: addScalar2,
    multiplyScalar: multiplyScalar2,
    conj: conj2,
    size: size2
  } = _ref;
  return typed2(name$P, {
    "Array | DenseMatrix, Array | DenseMatrix": _denseDot,
    "SparseMatrix, SparseMatrix": _sparseDot
  });
  function _validateDim(x, y) {
    var xSize = _size(x);
    var ySize = _size(y);
    var xLen, yLen;
    if (xSize.length === 1) {
      xLen = xSize[0];
    } else if (xSize.length === 2 && xSize[1] === 1) {
      xLen = xSize[0];
    } else {
      throw new RangeError("Expected a column vector, instead got a matrix of size (" + xSize.join(", ") + ")");
    }
    if (ySize.length === 1) {
      yLen = ySize[0];
    } else if (ySize.length === 2 && ySize[1] === 1) {
      yLen = ySize[0];
    } else {
      throw new RangeError("Expected a column vector, instead got a matrix of size (" + ySize.join(", ") + ")");
    }
    if (xLen !== yLen)
      throw new RangeError("Vectors must have equal length (" + xLen + " != " + yLen + ")");
    if (xLen === 0)
      throw new RangeError("Cannot calculate the dot product of empty vectors");
    return xLen;
  }
  function _denseDot(a, b) {
    var N = _validateDim(a, b);
    var adata = isMatrix(a) ? a._data : a;
    var adt = isMatrix(a) ? a._datatype || a.getDataType() : void 0;
    var bdata = isMatrix(b) ? b._data : b;
    var bdt = isMatrix(b) ? b._datatype || b.getDataType() : void 0;
    var aIsColumn = _size(a).length === 2;
    var bIsColumn = _size(b).length === 2;
    var add2 = addScalar2;
    var mul2 = multiplyScalar2;
    if (adt && bdt && adt === bdt && typeof adt === "string" && adt !== "mixed") {
      var dt = adt;
      add2 = typed2.find(addScalar2, [dt, dt]);
      mul2 = typed2.find(multiplyScalar2, [dt, dt]);
    }
    if (!aIsColumn && !bIsColumn) {
      var c = mul2(conj2(adata[0]), bdata[0]);
      for (var i2 = 1; i2 < N; i2++) {
        c = add2(c, mul2(conj2(adata[i2]), bdata[i2]));
      }
      return c;
    }
    if (!aIsColumn && bIsColumn) {
      var _c = mul2(conj2(adata[0]), bdata[0][0]);
      for (var _i = 1; _i < N; _i++) {
        _c = add2(_c, mul2(conj2(adata[_i]), bdata[_i][0]));
      }
      return _c;
    }
    if (aIsColumn && !bIsColumn) {
      var _c2 = mul2(conj2(adata[0][0]), bdata[0]);
      for (var _i2 = 1; _i2 < N; _i2++) {
        _c2 = add2(_c2, mul2(conj2(adata[_i2][0]), bdata[_i2]));
      }
      return _c2;
    }
    if (aIsColumn && bIsColumn) {
      var _c3 = mul2(conj2(adata[0][0]), bdata[0][0]);
      for (var _i3 = 1; _i3 < N; _i3++) {
        _c3 = add2(_c3, mul2(conj2(adata[_i3][0]), bdata[_i3][0]));
      }
      return _c3;
    }
  }
  function _sparseDot(x, y) {
    _validateDim(x, y);
    var xindex = x._index;
    var xvalues = x._values;
    var yindex = y._index;
    var yvalues = y._values;
    var c = 0;
    var add2 = addScalar2;
    var mul2 = multiplyScalar2;
    var i2 = 0;
    var j = 0;
    while (i2 < xindex.length && j < yindex.length) {
      var I = xindex[i2];
      var J = yindex[j];
      if (I < J) {
        i2++;
        continue;
      }
      if (I > J) {
        j++;
        continue;
      }
      if (I === J) {
        c = add2(c, mul2(xvalues[i2], yvalues[j]));
        i2++;
        j++;
      }
    }
    return c;
  }
  function _size(x) {
    return isMatrix(x) ? x.size() : size2(x);
  }
});
var name$O = "trace";
var dependencies$O = ["typed", "matrix", "add"];
var createTrace = /* @__PURE__ */ factory(name$O, dependencies$O, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    add: add2
  } = _ref;
  return typed2("trace", {
    Array: function _arrayTrace(x) {
      return _denseTrace(matrix2(x));
    },
    SparseMatrix: _sparseTrace,
    DenseMatrix: _denseTrace,
    any: clone$3
  });
  function _denseTrace(m) {
    var size2 = m._size;
    var data = m._data;
    switch (size2.length) {
      case 1:
        if (size2[0] === 1) {
          return clone$3(data[0]);
        }
        throw new RangeError("Matrix must be square (size: " + format$1(size2) + ")");
      case 2: {
        var rows = size2[0];
        var cols = size2[1];
        if (rows === cols) {
          var sum2 = 0;
          for (var i2 = 0; i2 < rows; i2++) {
            sum2 = add2(sum2, data[i2][i2]);
          }
          return sum2;
        } else {
          throw new RangeError("Matrix must be square (size: " + format$1(size2) + ")");
        }
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + format$1(size2) + ")");
    }
  }
  function _sparseTrace(m) {
    var values = m._values;
    var index2 = m._index;
    var ptr = m._ptr;
    var size2 = m._size;
    var rows = size2[0];
    var columns = size2[1];
    if (rows === columns) {
      var sum2 = 0;
      if (values.length > 0) {
        for (var j = 0; j < columns; j++) {
          var k0 = ptr[j];
          var k1 = ptr[j + 1];
          for (var k = k0; k < k1; k++) {
            var i2 = index2[k];
            if (i2 === j) {
              sum2 = add2(sum2, values[k]);
              break;
            }
            if (i2 > j) {
              break;
            }
          }
        }
      }
      return sum2;
    }
    throw new RangeError("Matrix must be square (size: " + format$1(size2) + ")");
  }
});
var name$N = "index";
var dependencies$N = ["typed", "Index"];
var createIndex = /* @__PURE__ */ factory(name$N, dependencies$N, (_ref) => {
  var {
    typed: typed2,
    Index: Index2
  } = _ref;
  return typed2(name$N, {
    "...number | string | BigNumber | Range | Array | Matrix": function numberStringBigNumberRangeArrayMatrix(args) {
      var ranges = args.map(function(arg2) {
        if (isBigNumber(arg2)) {
          return arg2.toNumber();
        } else if (isArray(arg2) || isMatrix(arg2)) {
          return arg2.map(function(elem) {
            return isBigNumber(elem) ? elem.toNumber() : elem;
          });
        } else {
          return arg2;
        }
      });
      var res = new Index2();
      Index2.apply(res, ranges);
      return res;
    }
  });
});
var name$M = "lup";
var dependencies$M = ["typed", "matrix", "abs", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "larger", "equalScalar", "unaryMinus", "DenseMatrix", "SparseMatrix", "Spa"];
var createLup = /* @__PURE__ */ factory(name$M, dependencies$M, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    abs: abs2,
    addScalar: addScalar2,
    divideScalar: divideScalar2,
    multiplyScalar: multiplyScalar2,
    subtractScalar: subtractScalar2,
    larger: larger2,
    equalScalar: equalScalar2,
    unaryMinus: unaryMinus2,
    DenseMatrix: DenseMatrix2,
    SparseMatrix: SparseMatrix2,
    Spa: Spa2
  } = _ref;
  return typed2(name$M, {
    DenseMatrix: function DenseMatrix3(m) {
      return _denseLUP(m);
    },
    SparseMatrix: function SparseMatrix3(m) {
      return _sparseLUP(m);
    },
    Array: function Array2(a) {
      var m = matrix2(a);
      var r = _denseLUP(m);
      return {
        L: r.L.valueOf(),
        U: r.U.valueOf(),
        p: r.p
      };
    }
  });
  function _denseLUP(m) {
    var rows = m._size[0];
    var columns = m._size[1];
    var n = Math.min(rows, columns);
    var data = clone$3(m._data);
    var ldata = [];
    var lsize = [rows, n];
    var udata = [];
    var usize = [n, columns];
    var i2, j, k;
    var p = [];
    for (i2 = 0; i2 < rows; i2++) {
      p[i2] = i2;
    }
    for (j = 0; j < columns; j++) {
      if (j > 0) {
        for (i2 = 0; i2 < rows; i2++) {
          var min2 = Math.min(i2, j);
          var s = 0;
          for (k = 0; k < min2; k++) {
            s = addScalar2(s, multiplyScalar2(data[i2][k], data[k][j]));
          }
          data[i2][j] = subtractScalar2(data[i2][j], s);
        }
      }
      var pi2 = j;
      var pabsv = 0;
      var vjj = 0;
      for (i2 = j; i2 < rows; i2++) {
        var v = data[i2][j];
        var absv = abs2(v);
        if (larger2(absv, pabsv)) {
          pi2 = i2;
          pabsv = absv;
          vjj = v;
        }
      }
      if (j !== pi2) {
        p[j] = [p[pi2], p[pi2] = p[j]][0];
        DenseMatrix2._swapRows(j, pi2, data);
      }
      if (j < rows) {
        for (i2 = j + 1; i2 < rows; i2++) {
          var vij = data[i2][j];
          if (!equalScalar2(vij, 0)) {
            data[i2][j] = divideScalar2(data[i2][j], vjj);
          }
        }
      }
    }
    for (j = 0; j < columns; j++) {
      for (i2 = 0; i2 < rows; i2++) {
        if (j === 0) {
          if (i2 < columns) {
            udata[i2] = [];
          }
          ldata[i2] = [];
        }
        if (i2 < j) {
          if (i2 < columns) {
            udata[i2][j] = data[i2][j];
          }
          if (j < rows) {
            ldata[i2][j] = 0;
          }
          continue;
        }
        if (i2 === j) {
          if (i2 < columns) {
            udata[i2][j] = data[i2][j];
          }
          if (j < rows) {
            ldata[i2][j] = 1;
          }
          continue;
        }
        if (i2 < columns) {
          udata[i2][j] = 0;
        }
        if (j < rows) {
          ldata[i2][j] = data[i2][j];
        }
      }
    }
    var l = new DenseMatrix2({
      data: ldata,
      size: lsize
    });
    var u = new DenseMatrix2({
      data: udata,
      size: usize
    });
    var pv = [];
    for (i2 = 0, n = p.length; i2 < n; i2++) {
      pv[p[i2]] = i2;
    }
    return {
      L: l,
      U: u,
      p: pv,
      toString: function toString() {
        return "L: " + this.L.toString() + "\nU: " + this.U.toString() + "\nP: " + this.p;
      }
    };
  }
  function _sparseLUP(m) {
    var rows = m._size[0];
    var columns = m._size[1];
    var n = Math.min(rows, columns);
    var values = m._values;
    var index2 = m._index;
    var ptr = m._ptr;
    var lvalues = [];
    var lindex = [];
    var lptr = [];
    var lsize = [rows, n];
    var uvalues = [];
    var uindex = [];
    var uptr = [];
    var usize = [n, columns];
    var i2, j, k;
    var pvCo = [];
    var pvOc = [];
    for (i2 = 0; i2 < rows; i2++) {
      pvCo[i2] = i2;
      pvOc[i2] = i2;
    }
    var swapIndeces = function swapIndeces2(x, y) {
      var kx = pvOc[x];
      var ky = pvOc[y];
      pvCo[kx] = y;
      pvCo[ky] = x;
      pvOc[x] = ky;
      pvOc[y] = kx;
    };
    var _loop = function _loop2() {
      var spa = new Spa2();
      if (j < rows) {
        lptr.push(lvalues.length);
        lvalues.push(1);
        lindex.push(j);
      }
      uptr.push(uvalues.length);
      var k0 = ptr[j];
      var k1 = ptr[j + 1];
      for (k = k0; k < k1; k++) {
        i2 = index2[k];
        spa.set(pvCo[i2], values[k]);
      }
      if (j > 0) {
        spa.forEach(0, j - 1, function(k2, vkj) {
          SparseMatrix2._forEachRow(k2, lvalues, lindex, lptr, function(i3, vik) {
            if (i3 > k2) {
              spa.accumulate(i3, unaryMinus2(multiplyScalar2(vik, vkj)));
            }
          });
        });
      }
      var pi2 = j;
      var vjj = spa.get(j);
      var pabsv = abs2(vjj);
      spa.forEach(j + 1, rows - 1, function(x, v) {
        var absv = abs2(v);
        if (larger2(absv, pabsv)) {
          pi2 = x;
          pabsv = absv;
          vjj = v;
        }
      });
      if (j !== pi2) {
        SparseMatrix2._swapRows(j, pi2, lsize[1], lvalues, lindex, lptr);
        SparseMatrix2._swapRows(j, pi2, usize[1], uvalues, uindex, uptr);
        spa.swap(j, pi2);
        swapIndeces(j, pi2);
      }
      spa.forEach(0, rows - 1, function(x, v) {
        if (x <= j) {
          uvalues.push(v);
          uindex.push(x);
        } else {
          v = divideScalar2(v, vjj);
          if (!equalScalar2(v, 0)) {
            lvalues.push(v);
            lindex.push(x);
          }
        }
      });
    };
    for (j = 0; j < columns; j++) {
      _loop();
    }
    uptr.push(uvalues.length);
    lptr.push(lvalues.length);
    return {
      L: new SparseMatrix2({
        values: lvalues,
        index: lindex,
        ptr: lptr,
        size: lsize
      }),
      U: new SparseMatrix2({
        values: uvalues,
        index: uindex,
        ptr: uptr,
        size: usize
      }),
      p: pvCo,
      toString: function toString() {
        return "L: " + this.L.toString() + "\nU: " + this.U.toString() + "\nP: " + this.p;
      }
    };
  }
});
var name$L = "qr";
var dependencies$L = ["typed", "matrix", "zeros", "identity", "isZero", "equal", "sign", "sqrt", "conj", "unaryMinus", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "complex"];
var createQr = /* @__PURE__ */ factory(name$L, dependencies$L, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    zeros: zeros2,
    identity: identity2,
    isZero: isZero2,
    equal: equal2,
    sign: sign2,
    sqrt: sqrt2,
    conj: conj2,
    unaryMinus: unaryMinus2,
    addScalar: addScalar2,
    divideScalar: divideScalar2,
    multiplyScalar: multiplyScalar2,
    subtractScalar: subtractScalar2,
    complex: complex2
  } = _ref;
  return _extends(typed2(name$L, {
    DenseMatrix: function DenseMatrix2(m) {
      return _denseQR(m);
    },
    SparseMatrix: function SparseMatrix2(m) {
      return _sparseQR();
    },
    Array: function Array2(a) {
      var m = matrix2(a);
      var r = _denseQR(m);
      return {
        Q: r.Q.valueOf(),
        R: r.R.valueOf()
      };
    }
  }), {
    _denseQRimpl
  });
  function _denseQRimpl(m) {
    var rows = m._size[0];
    var cols = m._size[1];
    var Q2 = identity2([rows], "dense");
    var Qdata = Q2._data;
    var R = m.clone();
    var Rdata = R._data;
    var i2, j, k;
    var w = zeros2([rows], "");
    for (k = 0; k < Math.min(cols, rows); ++k) {
      var pivot = Rdata[k][k];
      var sgn = unaryMinus2(equal2(pivot, 0) ? 1 : sign2(pivot));
      var conjSgn = conj2(sgn);
      var alphaSquared = 0;
      for (i2 = k; i2 < rows; i2++) {
        alphaSquared = addScalar2(alphaSquared, multiplyScalar2(Rdata[i2][k], conj2(Rdata[i2][k])));
      }
      var alpha = multiplyScalar2(sgn, sqrt2(alphaSquared));
      if (!isZero2(alpha)) {
        var u1 = subtractScalar2(pivot, alpha);
        w[k] = 1;
        for (i2 = k + 1; i2 < rows; i2++) {
          w[i2] = divideScalar2(Rdata[i2][k], u1);
        }
        var tau2 = unaryMinus2(conj2(divideScalar2(u1, alpha)));
        var s = void 0;
        for (j = k; j < cols; j++) {
          s = 0;
          for (i2 = k; i2 < rows; i2++) {
            s = addScalar2(s, multiplyScalar2(conj2(w[i2]), Rdata[i2][j]));
          }
          s = multiplyScalar2(s, tau2);
          for (i2 = k; i2 < rows; i2++) {
            Rdata[i2][j] = multiplyScalar2(subtractScalar2(Rdata[i2][j], multiplyScalar2(w[i2], s)), conjSgn);
          }
        }
        for (i2 = 0; i2 < rows; i2++) {
          s = 0;
          for (j = k; j < rows; j++) {
            s = addScalar2(s, multiplyScalar2(Qdata[i2][j], w[j]));
          }
          s = multiplyScalar2(s, tau2);
          for (j = k; j < rows; ++j) {
            Qdata[i2][j] = divideScalar2(subtractScalar2(Qdata[i2][j], multiplyScalar2(s, conj2(w[j]))), conjSgn);
          }
        }
      }
    }
    return {
      Q: Q2,
      R,
      toString: function toString() {
        return "Q: " + this.Q.toString() + "\nR: " + this.R.toString();
      }
    };
  }
  function _denseQR(m) {
    var ret = _denseQRimpl(m);
    var Rdata = ret.R._data;
    if (m._data.length > 0) {
      var zero = Rdata[0][0].type === "Complex" ? complex2(0) : 0;
      for (var i2 = 0; i2 < Rdata.length; ++i2) {
        for (var j = 0; j < i2 && j < (Rdata[0] || []).length; ++j) {
          Rdata[i2][j] = zero;
        }
      }
    }
    return ret;
  }
  function _sparseQR(m) {
    throw new Error("qr not implemented for sparse matrices yet");
  }
});
function csPermute(a, pinv2, q, values) {
  a._values;
  var aindex = a._index;
  var aptr = a._ptr;
  var asize = a._size;
  var adt = a._datatype;
  var m = asize[0];
  var n = asize[1];
  var cvalues = null;
  var cindex = [];
  var cptr = [];
  var nz = 0;
  for (var k = 0; k < n; k++) {
    cptr[k] = nz;
    var j = q ? q[k] : k;
    for (var t0 = aptr[j], t1 = aptr[j + 1], t = t0; t < t1; t++) {
      var r = aindex[t];
      cindex[nz] = r;
      nz++;
    }
  }
  cptr[n] = nz;
  return a.createSparseMatrix({
    values: cvalues,
    index: cindex,
    ptr: cptr,
    size: [m, n],
    datatype: adt
  });
}
function csTdfs(j, k, w, head, next, post, stack) {
  var top = 0;
  w[stack] = j;
  while (top >= 0) {
    var p = w[stack + top];
    var i2 = w[head + p];
    if (i2 === -1) {
      top--;
      post[k++] = p;
    } else {
      w[head + p] = w[next + i2];
      ++top;
      w[stack + top] = i2;
    }
  }
  return k;
}
function csPost(parent, n) {
  if (!parent) {
    return null;
  }
  var k = 0;
  var j;
  var post = [];
  var w = [];
  var head = 0;
  var next = n;
  var stack = 2 * n;
  for (j = 0; j < n; j++) {
    w[head + j] = -1;
  }
  for (j = n - 1; j >= 0; j--) {
    if (parent[j] === -1) {
      continue;
    }
    w[next + j] = w[head + parent[j]];
    w[head + parent[j]] = j;
  }
  for (j = 0; j < n; j++) {
    if (parent[j] !== -1) {
      continue;
    }
    k = csTdfs(j, k, w, head, next, post, stack);
  }
  return post;
}
function csEtree(a, ata) {
  if (!a) {
    return null;
  }
  var aindex = a._index;
  var aptr = a._ptr;
  var asize = a._size;
  var m = asize[0];
  var n = asize[1];
  var parent = [];
  var w = [];
  var ancestor = 0;
  var prev = n;
  var i2, inext;
  {
    for (i2 = 0; i2 < m; i2++) {
      w[prev + i2] = -1;
    }
  }
  for (var k = 0; k < n; k++) {
    parent[k] = -1;
    w[ancestor + k] = -1;
    for (var p0 = aptr[k], p1 = aptr[k + 1], p = p0; p < p1; p++) {
      var r = aindex[p];
      i2 = w[prev + r];
      for (; i2 !== -1 && i2 < k; i2 = inext) {
        inext = w[ancestor + i2];
        w[ancestor + i2] = k;
        if (inext === -1) {
          parent[i2] = k;
        }
      }
      {
        w[prev + r] = k;
      }
    }
  }
  return parent;
}
function csFkeep(a, callback, other) {
  var avalues = a._values;
  var aindex = a._index;
  var aptr = a._ptr;
  var asize = a._size;
  var n = asize[1];
  var nz = 0;
  for (var j = 0; j < n; j++) {
    var p = aptr[j];
    aptr[j] = nz;
    for (; p < aptr[j + 1]; p++) {
      if (callback(aindex[p], j, avalues ? avalues[p] : 1, other)) {
        aindex[nz] = aindex[p];
        if (avalues) {
          avalues[nz] = avalues[p];
        }
        nz++;
      }
    }
  }
  aptr[n] = nz;
  aindex.splice(nz, aindex.length - nz);
  if (avalues) {
    avalues.splice(nz, avalues.length - nz);
  }
  return nz;
}
function csFlip(i2) {
  return -i2 - 2;
}
var name$K = "csAmd";
var dependencies$K = ["add", "multiply", "transpose"];
var createCsAmd = /* @__PURE__ */ factory(name$K, dependencies$K, (_ref) => {
  var {
    add: add2,
    multiply: multiply2,
    transpose: transpose2
  } = _ref;
  return function csAmd(order, a) {
    if (!a || order <= 0 || order > 3) {
      return null;
    }
    var asize = a._size;
    var m = asize[0];
    var n = asize[1];
    var lemax = 0;
    var dense = Math.max(16, 10 * Math.sqrt(n));
    dense = Math.min(n - 2, dense);
    var cm = _createTargetMatrix(order, a, m, n, dense);
    csFkeep(cm, _diag, null);
    var cindex = cm._index;
    var cptr = cm._ptr;
    var cnz = cptr[n];
    var P2 = [];
    var W = [];
    var len = 0;
    var nv = n + 1;
    var next = 2 * (n + 1);
    var head = 3 * (n + 1);
    var elen = 4 * (n + 1);
    var degree = 5 * (n + 1);
    var w = 6 * (n + 1);
    var hhead = 7 * (n + 1);
    var last = P2;
    var mark = _initializeQuotientGraph(n, cptr, W, len, head, last, next, hhead, nv, w, elen, degree);
    var nel = _initializeDegreeLists(n, cptr, W, degree, elen, w, dense, nv, head, last, next);
    var mindeg = 0;
    var i2, j, k, k1, k2, e2, pj, ln2, nvi, pk, eln, p1, p2, pn, h, d;
    while (nel < n) {
      for (k = -1; mindeg < n && (k = W[head + mindeg]) === -1; mindeg++)
        ;
      if (W[next + k] !== -1) {
        last[W[next + k]] = -1;
      }
      W[head + mindeg] = W[next + k];
      var elenk = W[elen + k];
      var nvk = W[nv + k];
      nel += nvk;
      var dk = 0;
      W[nv + k] = -nvk;
      var p = cptr[k];
      var pk1 = elenk === 0 ? p : cnz;
      var pk2 = pk1;
      for (k1 = 1; k1 <= elenk + 1; k1++) {
        if (k1 > elenk) {
          e2 = k;
          pj = p;
          ln2 = W[len + k] - elenk;
        } else {
          e2 = cindex[p++];
          pj = cptr[e2];
          ln2 = W[len + e2];
        }
        for (k2 = 1; k2 <= ln2; k2++) {
          i2 = cindex[pj++];
          if ((nvi = W[nv + i2]) <= 0) {
            continue;
          }
          dk += nvi;
          W[nv + i2] = -nvi;
          cindex[pk2++] = i2;
          if (W[next + i2] !== -1) {
            last[W[next + i2]] = last[i2];
          }
          if (last[i2] !== -1) {
            W[next + last[i2]] = W[next + i2];
          } else {
            W[head + W[degree + i2]] = W[next + i2];
          }
        }
        if (e2 !== k) {
          cptr[e2] = csFlip(k);
          W[w + e2] = 0;
        }
      }
      if (elenk !== 0) {
        cnz = pk2;
      }
      W[degree + k] = dk;
      cptr[k] = pk1;
      W[len + k] = pk2 - pk1;
      W[elen + k] = -2;
      mark = _wclear(mark, lemax, W, w, n);
      for (pk = pk1; pk < pk2; pk++) {
        i2 = cindex[pk];
        if ((eln = W[elen + i2]) <= 0) {
          continue;
        }
        nvi = -W[nv + i2];
        var wnvi = mark - nvi;
        for (p = cptr[i2], p1 = cptr[i2] + eln - 1; p <= p1; p++) {
          e2 = cindex[p];
          if (W[w + e2] >= mark) {
            W[w + e2] -= nvi;
          } else if (W[w + e2] !== 0) {
            W[w + e2] = W[degree + e2] + wnvi;
          }
        }
      }
      for (pk = pk1; pk < pk2; pk++) {
        i2 = cindex[pk];
        p1 = cptr[i2];
        p2 = p1 + W[elen + i2] - 1;
        pn = p1;
        for (h = 0, d = 0, p = p1; p <= p2; p++) {
          e2 = cindex[p];
          if (W[w + e2] !== 0) {
            var dext = W[w + e2] - mark;
            if (dext > 0) {
              d += dext;
              cindex[pn++] = e2;
              h += e2;
            } else {
              cptr[e2] = csFlip(k);
              W[w + e2] = 0;
            }
          }
        }
        W[elen + i2] = pn - p1 + 1;
        var p3 = pn;
        var p4 = p1 + W[len + i2];
        for (p = p2 + 1; p < p4; p++) {
          j = cindex[p];
          var nvj = W[nv + j];
          if (nvj <= 0) {
            continue;
          }
          d += nvj;
          cindex[pn++] = j;
          h += j;
        }
        if (d === 0) {
          cptr[i2] = csFlip(k);
          nvi = -W[nv + i2];
          dk -= nvi;
          nvk += nvi;
          nel += nvi;
          W[nv + i2] = 0;
          W[elen + i2] = -1;
        } else {
          W[degree + i2] = Math.min(W[degree + i2], d);
          cindex[pn] = cindex[p3];
          cindex[p3] = cindex[p1];
          cindex[p1] = k;
          W[len + i2] = pn - p1 + 1;
          h = (h < 0 ? -h : h) % n;
          W[next + i2] = W[hhead + h];
          W[hhead + h] = i2;
          last[i2] = h;
        }
      }
      W[degree + k] = dk;
      lemax = Math.max(lemax, dk);
      mark = _wclear(mark + lemax, lemax, W, w, n);
      for (pk = pk1; pk < pk2; pk++) {
        i2 = cindex[pk];
        if (W[nv + i2] >= 0) {
          continue;
        }
        h = last[i2];
        i2 = W[hhead + h];
        W[hhead + h] = -1;
        for (; i2 !== -1 && W[next + i2] !== -1; i2 = W[next + i2], mark++) {
          ln2 = W[len + i2];
          eln = W[elen + i2];
          for (p = cptr[i2] + 1; p <= cptr[i2] + ln2 - 1; p++) {
            W[w + cindex[p]] = mark;
          }
          var jlast = i2;
          for (j = W[next + i2]; j !== -1; ) {
            var ok2 = W[len + j] === ln2 && W[elen + j] === eln;
            for (p = cptr[j] + 1; ok2 && p <= cptr[j] + ln2 - 1; p++) {
              if (W[w + cindex[p]] !== mark) {
                ok2 = 0;
              }
            }
            if (ok2) {
              cptr[j] = csFlip(i2);
              W[nv + i2] += W[nv + j];
              W[nv + j] = 0;
              W[elen + j] = -1;
              j = W[next + j];
              W[next + jlast] = j;
            } else {
              jlast = j;
              j = W[next + j];
            }
          }
        }
      }
      for (p = pk1, pk = pk1; pk < pk2; pk++) {
        i2 = cindex[pk];
        if ((nvi = -W[nv + i2]) <= 0) {
          continue;
        }
        W[nv + i2] = nvi;
        d = W[degree + i2] + dk - nvi;
        d = Math.min(d, n - nel - nvi);
        if (W[head + d] !== -1) {
          last[W[head + d]] = i2;
        }
        W[next + i2] = W[head + d];
        last[i2] = -1;
        W[head + d] = i2;
        mindeg = Math.min(mindeg, d);
        W[degree + i2] = d;
        cindex[p++] = i2;
      }
      W[nv + k] = nvk;
      if ((W[len + k] = p - pk1) === 0) {
        cptr[k] = -1;
        W[w + k] = 0;
      }
      if (elenk !== 0) {
        cnz = p;
      }
    }
    for (i2 = 0; i2 < n; i2++) {
      cptr[i2] = csFlip(cptr[i2]);
    }
    for (j = 0; j <= n; j++) {
      W[head + j] = -1;
    }
    for (j = n; j >= 0; j--) {
      if (W[nv + j] > 0) {
        continue;
      }
      W[next + j] = W[head + cptr[j]];
      W[head + cptr[j]] = j;
    }
    for (e2 = n; e2 >= 0; e2--) {
      if (W[nv + e2] <= 0) {
        continue;
      }
      if (cptr[e2] !== -1) {
        W[next + e2] = W[head + cptr[e2]];
        W[head + cptr[e2]] = e2;
      }
    }
    for (k = 0, i2 = 0; i2 <= n; i2++) {
      if (cptr[i2] === -1) {
        k = csTdfs(i2, k, W, head, next, P2, w);
      }
    }
    P2.splice(P2.length - 1, 1);
    return P2;
  };
  function _createTargetMatrix(order, a, m, n, dense) {
    var at = transpose2(a);
    if (order === 1 && n === m) {
      return add2(a, at);
    }
    if (order === 2) {
      var tindex = at._index;
      var tptr = at._ptr;
      var p2 = 0;
      for (var j = 0; j < m; j++) {
        var p = tptr[j];
        tptr[j] = p2;
        if (tptr[j + 1] - p > dense) {
          continue;
        }
        for (var p1 = tptr[j + 1]; p < p1; p++) {
          tindex[p2++] = tindex[p];
        }
      }
      tptr[m] = p2;
      a = transpose2(at);
      return multiply2(at, a);
    }
    return multiply2(at, a);
  }
  function _initializeQuotientGraph(n, cptr, W, len, head, last, next, hhead, nv, w, elen, degree) {
    for (var k = 0; k < n; k++) {
      W[len + k] = cptr[k + 1] - cptr[k];
    }
    W[len + n] = 0;
    for (var i2 = 0; i2 <= n; i2++) {
      W[head + i2] = -1;
      last[i2] = -1;
      W[next + i2] = -1;
      W[hhead + i2] = -1;
      W[nv + i2] = 1;
      W[w + i2] = 1;
      W[elen + i2] = 0;
      W[degree + i2] = W[len + i2];
    }
    var mark = _wclear(0, 0, W, w, n);
    W[elen + n] = -2;
    cptr[n] = -1;
    W[w + n] = 0;
    return mark;
  }
  function _initializeDegreeLists(n, cptr, W, degree, elen, w, dense, nv, head, last, next) {
    var nel = 0;
    for (var i2 = 0; i2 < n; i2++) {
      var d = W[degree + i2];
      if (d === 0) {
        W[elen + i2] = -2;
        nel++;
        cptr[i2] = -1;
        W[w + i2] = 0;
      } else if (d > dense) {
        W[nv + i2] = 0;
        W[elen + i2] = -1;
        nel++;
        cptr[i2] = csFlip(n);
        W[nv + n]++;
      } else {
        var h = W[head + d];
        if (h !== -1) {
          last[h] = i2;
        }
        W[next + i2] = W[head + d];
        W[head + d] = i2;
      }
    }
    return nel;
  }
  function _wclear(mark, lemax, W, w, n) {
    if (mark < 2 || mark + lemax < 0) {
      for (var k = 0; k < n; k++) {
        if (W[w + k] !== 0) {
          W[w + k] = 1;
        }
      }
      mark = 2;
    }
    return mark;
  }
  function _diag(i2, j) {
    return i2 !== j;
  }
});
function csLeaf(i2, j, w, first, maxfirst, prevleaf, ancestor) {
  var s, sparent;
  var jleaf = 0;
  var q;
  if (i2 <= j || w[first + j] <= w[maxfirst + i2]) {
    return -1;
  }
  w[maxfirst + i2] = w[first + j];
  var jprev = w[prevleaf + i2];
  w[prevleaf + i2] = j;
  if (jprev === -1) {
    jleaf = 1;
    q = i2;
  } else {
    jleaf = 2;
    for (q = jprev; q !== w[ancestor + q]; q = w[ancestor + q])
      ;
    for (s = jprev; s !== q; s = sparent) {
      sparent = w[ancestor + s];
      w[ancestor + s] = q;
    }
  }
  return {
    jleaf,
    q
  };
}
var name$J = "csCounts";
var dependencies$J = ["transpose"];
var createCsCounts = /* @__PURE__ */ factory(name$J, dependencies$J, (_ref) => {
  var {
    transpose: transpose2
  } = _ref;
  return function(a, parent, post, ata) {
    if (!a || !parent || !post) {
      return null;
    }
    var asize = a._size;
    var m = asize[0];
    var n = asize[1];
    var i2, j, k, J, p, p0, p1;
    var s = 4 * n + (ata ? n + m + 1 : 0);
    var w = [];
    var ancestor = 0;
    var maxfirst = n;
    var prevleaf = 2 * n;
    var first = 3 * n;
    var head = 4 * n;
    var next = 5 * n + 1;
    for (k = 0; k < s; k++) {
      w[k] = -1;
    }
    var colcount = [];
    var at = transpose2(a);
    var tindex = at._index;
    var tptr = at._ptr;
    for (k = 0; k < n; k++) {
      j = post[k];
      colcount[j] = w[first + j] === -1 ? 1 : 0;
      for (; j !== -1 && w[first + j] === -1; j = parent[j]) {
        w[first + j] = k;
      }
    }
    if (ata) {
      for (k = 0; k < n; k++) {
        w[post[k]] = k;
      }
      for (i2 = 0; i2 < m; i2++) {
        for (k = n, p0 = tptr[i2], p1 = tptr[i2 + 1], p = p0; p < p1; p++) {
          k = Math.min(k, w[tindex[p]]);
        }
        w[next + i2] = w[head + k];
        w[head + k] = i2;
      }
    }
    for (i2 = 0; i2 < n; i2++) {
      w[ancestor + i2] = i2;
    }
    for (k = 0; k < n; k++) {
      j = post[k];
      if (parent[j] !== -1) {
        colcount[parent[j]]--;
      }
      for (J = ata ? w[head + k] : j; J !== -1; J = ata ? w[next + J] : -1) {
        for (p = tptr[J]; p < tptr[J + 1]; p++) {
          i2 = tindex[p];
          var r = csLeaf(i2, j, w, first, maxfirst, prevleaf, ancestor);
          if (r.jleaf >= 1) {
            colcount[j]++;
          }
          if (r.jleaf === 2) {
            colcount[r.q]--;
          }
        }
      }
      if (parent[j] !== -1) {
        w[ancestor + j] = parent[j];
      }
    }
    for (j = 0; j < n; j++) {
      if (parent[j] !== -1) {
        colcount[parent[j]] += colcount[j];
      }
    }
    return colcount;
  };
});
var name$I = "csSqr";
var dependencies$I = ["add", "multiply", "transpose"];
var createCsSqr = /* @__PURE__ */ factory(name$I, dependencies$I, (_ref) => {
  var {
    add: add2,
    multiply: multiply2,
    transpose: transpose2
  } = _ref;
  var csAmd = createCsAmd({
    add: add2,
    multiply: multiply2,
    transpose: transpose2
  });
  var csCounts = createCsCounts({
    transpose: transpose2
  });
  return function csSqr(order, a, qr2) {
    var aptr = a._ptr;
    var asize = a._size;
    var n = asize[1];
    var k;
    var s = {};
    s.q = csAmd(order, a);
    if (order && !s.q) {
      return null;
    }
    if (qr2) {
      var c = order ? csPermute(a, null, s.q) : a;
      s.parent = csEtree(c);
      var post = csPost(s.parent, n);
      s.cp = csCounts(c, s.parent, post, 1);
      if (c && s.parent && s.cp && _vcount(c, s)) {
        for (s.unz = 0, k = 0; k < n; k++) {
          s.unz += s.cp[k];
        }
      }
    } else {
      s.unz = 4 * aptr[n] + n;
      s.lnz = s.unz;
    }
    return s;
  };
  function _vcount(a, s) {
    var aptr = a._ptr;
    var aindex = a._index;
    var asize = a._size;
    var m = asize[0];
    var n = asize[1];
    s.pinv = [];
    s.leftmost = [];
    var parent = s.parent;
    var pinv2 = s.pinv;
    var leftmost = s.leftmost;
    var w = [];
    var next = 0;
    var head = m;
    var tail = m + n;
    var nque = m + 2 * n;
    var i2, k, p, p0, p1;
    for (k = 0; k < n; k++) {
      w[head + k] = -1;
      w[tail + k] = -1;
      w[nque + k] = 0;
    }
    for (i2 = 0; i2 < m; i2++) {
      leftmost[i2] = -1;
    }
    for (k = n - 1; k >= 0; k--) {
      for (p0 = aptr[k], p1 = aptr[k + 1], p = p0; p < p1; p++) {
        leftmost[aindex[p]] = k;
      }
    }
    for (i2 = m - 1; i2 >= 0; i2--) {
      pinv2[i2] = -1;
      k = leftmost[i2];
      if (k === -1) {
        continue;
      }
      if (w[nque + k]++ === 0) {
        w[tail + k] = i2;
      }
      w[next + i2] = w[head + k];
      w[head + k] = i2;
    }
    s.lnz = 0;
    s.m2 = m;
    for (k = 0; k < n; k++) {
      i2 = w[head + k];
      s.lnz++;
      if (i2 < 0) {
        i2 = s.m2++;
      }
      pinv2[i2] = k;
      if (--nque[k] <= 0) {
        continue;
      }
      s.lnz += w[nque + k];
      var pa = parent[k];
      if (pa !== -1) {
        if (w[nque + pa] === 0) {
          w[tail + pa] = w[tail + k];
        }
        w[next + w[tail + k]] = w[head + pa];
        w[head + pa] = w[next + i2];
        w[nque + pa] += w[nque + k];
      }
    }
    for (i2 = 0; i2 < m; i2++) {
      if (pinv2[i2] < 0) {
        pinv2[i2] = k++;
      }
    }
    return true;
  }
});
function csMarked(w, j) {
  return w[j] < 0;
}
function csMark(w, j) {
  w[j] = csFlip(w[j]);
}
function csUnflip(i2) {
  return i2 < 0 ? csFlip(i2) : i2;
}
function csDfs(j, g, top, xi, pinv2) {
  var index2 = g._index;
  var ptr = g._ptr;
  var size2 = g._size;
  var n = size2[1];
  var i2, p, p2;
  var head = 0;
  xi[0] = j;
  while (head >= 0) {
    j = xi[head];
    var jnew = pinv2 ? pinv2[j] : j;
    if (!csMarked(ptr, j)) {
      csMark(ptr, j);
      xi[n + head] = jnew < 0 ? 0 : csUnflip(ptr[jnew]);
    }
    var done = 1;
    for (p = xi[n + head], p2 = jnew < 0 ? 0 : csUnflip(ptr[jnew + 1]); p < p2; p++) {
      i2 = index2[p];
      if (csMarked(ptr, i2)) {
        continue;
      }
      xi[n + head] = p;
      xi[++head] = i2;
      done = 0;
      break;
    }
    if (done) {
      head--;
      xi[--top] = j;
    }
  }
  return top;
}
function csReach(g, b, k, xi, pinv2) {
  var gptr = g._ptr;
  var gsize = g._size;
  var bindex = b._index;
  var bptr = b._ptr;
  var n = gsize[1];
  var p, p0, p1;
  var top = n;
  for (p0 = bptr[k], p1 = bptr[k + 1], p = p0; p < p1; p++) {
    var i2 = bindex[p];
    if (!csMarked(gptr, i2)) {
      top = csDfs(i2, g, top, xi, pinv2);
    }
  }
  for (p = top; p < n; p++) {
    csMark(gptr, xi[p]);
  }
  return top;
}
var name$H = "csSpsolve";
var dependencies$H = ["divideScalar", "multiply", "subtract"];
var createCsSpsolve = /* @__PURE__ */ factory(name$H, dependencies$H, (_ref) => {
  var {
    divideScalar: divideScalar2,
    multiply: multiply2,
    subtract: subtract2
  } = _ref;
  return function csSpsolve(g, b, k, xi, x, pinv2, lo) {
    var gvalues = g._values;
    var gindex = g._index;
    var gptr = g._ptr;
    var gsize = g._size;
    var n = gsize[1];
    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var p, p0, p1, q;
    var top = csReach(g, b, k, xi, pinv2);
    for (p = top; p < n; p++) {
      x[xi[p]] = 0;
    }
    for (p0 = bptr[k], p1 = bptr[k + 1], p = p0; p < p1; p++) {
      x[bindex[p]] = bvalues[p];
    }
    for (var px = top; px < n; px++) {
      var j = xi[px];
      var J = pinv2 ? pinv2[j] : j;
      if (J < 0) {
        continue;
      }
      p0 = gptr[J];
      p1 = gptr[J + 1];
      x[j] = divideScalar2(x[j], gvalues[lo ? p0 : p1 - 1]);
      p = lo ? p0 + 1 : p0;
      q = lo ? p1 : p1 - 1;
      for (; p < q; p++) {
        var i2 = gindex[p];
        x[i2] = subtract2(x[i2], multiply2(gvalues[p], x[j]));
      }
    }
    return top;
  };
});
var name$G = "csLu";
var dependencies$G = ["abs", "divideScalar", "multiply", "subtract", "larger", "largerEq", "SparseMatrix"];
var createCsLu = /* @__PURE__ */ factory(name$G, dependencies$G, (_ref) => {
  var {
    abs: abs2,
    divideScalar: divideScalar2,
    multiply: multiply2,
    subtract: subtract2,
    larger: larger2,
    largerEq: largerEq2,
    SparseMatrix: SparseMatrix2
  } = _ref;
  var csSpsolve = createCsSpsolve({
    divideScalar: divideScalar2,
    multiply: multiply2,
    subtract: subtract2
  });
  return function csLu(m, s, tol) {
    if (!m) {
      return null;
    }
    var size2 = m._size;
    var n = size2[1];
    var q;
    var lnz = 100;
    var unz = 100;
    if (s) {
      q = s.q;
      lnz = s.lnz || lnz;
      unz = s.unz || unz;
    }
    var lvalues = [];
    var lindex = [];
    var lptr = [];
    var L = new SparseMatrix2({
      values: lvalues,
      index: lindex,
      ptr: lptr,
      size: [n, n]
    });
    var uvalues = [];
    var uindex = [];
    var uptr = [];
    var U = new SparseMatrix2({
      values: uvalues,
      index: uindex,
      ptr: uptr,
      size: [n, n]
    });
    var pinv2 = [];
    var i2, p;
    var x = [];
    var xi = [];
    for (i2 = 0; i2 < n; i2++) {
      x[i2] = 0;
      pinv2[i2] = -1;
      lptr[i2 + 1] = 0;
    }
    lnz = 0;
    unz = 0;
    for (var k = 0; k < n; k++) {
      lptr[k] = lnz;
      uptr[k] = unz;
      var col = q ? q[k] : k;
      var top = csSpsolve(L, m, col, xi, x, pinv2, 1);
      var ipiv = -1;
      var a = -1;
      for (p = top; p < n; p++) {
        i2 = xi[p];
        if (pinv2[i2] < 0) {
          var xabs = abs2(x[i2]);
          if (larger2(xabs, a)) {
            a = xabs;
            ipiv = i2;
          }
        } else {
          uindex[unz] = pinv2[i2];
          uvalues[unz++] = x[i2];
        }
      }
      if (ipiv === -1 || a <= 0) {
        return null;
      }
      if (pinv2[col] < 0 && largerEq2(abs2(x[col]), multiply2(a, tol))) {
        ipiv = col;
      }
      var pivot = x[ipiv];
      uindex[unz] = k;
      uvalues[unz++] = pivot;
      pinv2[ipiv] = k;
      lindex[lnz] = ipiv;
      lvalues[lnz++] = 1;
      for (p = top; p < n; p++) {
        i2 = xi[p];
        if (pinv2[i2] < 0) {
          lindex[lnz] = i2;
          lvalues[lnz++] = divideScalar2(x[i2], pivot);
        }
        x[i2] = 0;
      }
    }
    lptr[n] = lnz;
    uptr[n] = unz;
    for (p = 0; p < lnz; p++) {
      lindex[p] = pinv2[lindex[p]];
    }
    lvalues.splice(lnz, lvalues.length - lnz);
    lindex.splice(lnz, lindex.length - lnz);
    uvalues.splice(unz, uvalues.length - unz);
    uindex.splice(unz, uindex.length - unz);
    return {
      L,
      U,
      pinv: pinv2
    };
  };
});
var name$F = "slu";
var dependencies$F = ["typed", "abs", "add", "multiply", "transpose", "divideScalar", "subtract", "larger", "largerEq", "SparseMatrix"];
var createSlu = /* @__PURE__ */ factory(name$F, dependencies$F, (_ref) => {
  var {
    typed: typed2,
    abs: abs2,
    add: add2,
    multiply: multiply2,
    transpose: transpose2,
    divideScalar: divideScalar2,
    subtract: subtract2,
    larger: larger2,
    largerEq: largerEq2,
    SparseMatrix: SparseMatrix2
  } = _ref;
  var csSqr = createCsSqr({
    add: add2,
    multiply: multiply2,
    transpose: transpose2
  });
  var csLu = createCsLu({
    abs: abs2,
    divideScalar: divideScalar2,
    multiply: multiply2,
    subtract: subtract2,
    larger: larger2,
    largerEq: largerEq2,
    SparseMatrix: SparseMatrix2
  });
  return typed2(name$F, {
    "SparseMatrix, number, number": function SparseMatrixNumberNumber(a, order, threshold) {
      if (!isInteger$1(order) || order < 0 || order > 3) {
        throw new Error("Symbolic Ordering and Analysis order must be an integer number in the interval [0, 3]");
      }
      if (threshold < 0 || threshold > 1) {
        throw new Error("Partial pivoting threshold must be a number from 0 to 1");
      }
      var s = csSqr(order, a, false);
      var f = csLu(a, s, threshold);
      return {
        L: f.L,
        U: f.U,
        p: f.pinv,
        q: s.q,
        toString: function toString() {
          return "L: " + this.L.toString() + "\nU: " + this.U.toString() + "\np: " + this.p.toString() + (this.q ? "\nq: " + this.q.toString() : "") + "\n";
        }
      };
    }
  });
});
function csIpvec(p, b) {
  var k;
  var n = b.length;
  var x = [];
  if (p) {
    for (k = 0; k < n; k++) {
      x[p[k]] = b[k];
    }
  } else {
    for (k = 0; k < n; k++) {
      x[k] = b[k];
    }
  }
  return x;
}
var name$E = "lusolve";
var dependencies$E = ["typed", "matrix", "lup", "slu", "usolve", "lsolve", "DenseMatrix"];
var createLusolve = /* @__PURE__ */ factory(name$E, dependencies$E, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    lup: lup2,
    slu: slu2,
    usolve: usolve2,
    lsolve: lsolve2,
    DenseMatrix: DenseMatrix2
  } = _ref;
  var solveValidation = createSolveValidation({
    DenseMatrix: DenseMatrix2
  });
  return typed2(name$E, {
    "Array, Array | Matrix": function ArrayArrayMatrix(a, b) {
      a = matrix2(a);
      var d = lup2(a);
      var x = _lusolve(d.L, d.U, d.p, null, b);
      return x.valueOf();
    },
    "DenseMatrix, Array | Matrix": function DenseMatrixArrayMatrix(a, b) {
      var d = lup2(a);
      return _lusolve(d.L, d.U, d.p, null, b);
    },
    "SparseMatrix, Array | Matrix": function SparseMatrixArrayMatrix(a, b) {
      var d = lup2(a);
      return _lusolve(d.L, d.U, d.p, null, b);
    },
    "SparseMatrix, Array | Matrix, number, number": function SparseMatrixArrayMatrixNumberNumber(a, b, order, threshold) {
      var d = slu2(a, order, threshold);
      return _lusolve(d.L, d.U, d.p, d.q, b);
    },
    "Object, Array | Matrix": function ObjectArrayMatrix(d, b) {
      return _lusolve(d.L, d.U, d.p, d.q, b);
    }
  });
  function _toMatrix(a) {
    if (isMatrix(a)) {
      return a;
    }
    if (isArray(a)) {
      return matrix2(a);
    }
    throw new TypeError("Invalid Matrix LU decomposition");
  }
  function _lusolve(l, u, p, q, b) {
    l = _toMatrix(l);
    u = _toMatrix(u);
    if (p) {
      b = solveValidation(l, b, true);
      b._data = csIpvec(p, b._data);
    }
    var y = lsolve2(l, b);
    var x = usolve2(u, y);
    if (q) {
      x._data = csIpvec(q, x._data);
    }
    return x;
  }
});
var name$D = "polynomialRoot";
var dependencies$D = ["typed", "isZero", "equalScalar", "add", "subtract", "multiply", "divide", "sqrt", "unaryMinus", "cbrt", "typeOf", "im", "re"];
var createPolynomialRoot = /* @__PURE__ */ factory(name$D, dependencies$D, (_ref) => {
  var {
    typed: typed2,
    isZero: isZero2,
    equalScalar: equalScalar2,
    add: add2,
    subtract: subtract2,
    multiply: multiply2,
    divide: divide2,
    sqrt: sqrt2,
    unaryMinus: unaryMinus2,
    cbrt: cbrt3,
    typeOf: typeOf2,
    im: im2,
    re: re2
  } = _ref;
  return typed2(name$D, {
    "number|Complex, ...number|Complex": (constant, restCoeffs) => {
      var coeffs = [constant, ...restCoeffs];
      while (coeffs.length > 0 && isZero2(coeffs[coeffs.length - 1])) {
        coeffs.pop();
      }
      if (coeffs.length < 2) {
        throw new RangeError("Polynomial [".concat(constant, ", ").concat(restCoeffs, "] must have a non-zero non-constant coefficient"));
      }
      switch (coeffs.length) {
        case 2:
          return [unaryMinus2(divide2(coeffs[0], coeffs[1]))];
        case 3: {
          var [c, b, a] = coeffs;
          var denom = multiply2(2, a);
          var d1 = multiply2(b, b);
          var d2 = multiply2(4, a, c);
          if (equalScalar2(d1, d2))
            return [divide2(unaryMinus2(b), denom)];
          var discriminant = sqrt2(subtract2(d1, d2));
          return [divide2(subtract2(discriminant, b), denom), divide2(subtract2(unaryMinus2(discriminant), b), denom)];
        }
        case 4: {
          var [d, _c, _b, _a] = coeffs;
          var _denom = unaryMinus2(multiply2(3, _a));
          var D0_1 = multiply2(_b, _b);
          var D0_2 = multiply2(3, _a, _c);
          var D1_1 = add2(multiply2(2, _b, _b, _b), multiply2(27, _a, _a, d));
          var D1_2 = multiply2(9, _a, _b, _c);
          if (equalScalar2(D0_1, D0_2) && equalScalar2(D1_1, D1_2)) {
            return [divide2(_b, _denom)];
          }
          var Delta0 = subtract2(D0_1, D0_2);
          var Delta1 = subtract2(D1_1, D1_2);
          var discriminant1 = add2(multiply2(18, _a, _b, _c, d), multiply2(_b, _b, _c, _c));
          var discriminant2 = add2(multiply2(4, _b, _b, _b, d), multiply2(4, _a, _c, _c, _c), multiply2(27, _a, _a, d, d));
          if (equalScalar2(discriminant1, discriminant2)) {
            return [
              divide2(subtract2(multiply2(4, _a, _b, _c), add2(multiply2(9, _a, _a, d), multiply2(_b, _b, _b))), multiply2(_a, Delta0)),
              // simple root
              divide2(subtract2(multiply2(9, _a, d), multiply2(_b, _c)), multiply2(2, Delta0))
              // double root
            ];
          }
          var Ccubed;
          if (equalScalar2(D0_1, D0_2)) {
            Ccubed = Delta1;
          } else {
            Ccubed = divide2(add2(Delta1, sqrt2(subtract2(multiply2(Delta1, Delta1), multiply2(4, Delta0, Delta0, Delta0)))), 2);
          }
          var allRoots = true;
          var rawRoots = cbrt3(Ccubed, allRoots).toArray().map((C) => divide2(add2(_b, C, divide2(Delta0, C)), _denom));
          return rawRoots.map((r) => {
            if (typeOf2(r) === "Complex" && equalScalar2(re2(r), re2(r) + im2(r))) {
              return re2(r);
            }
            return r;
          });
        }
        default:
          throw new RangeError("only implemented for cubic or lower-order polynomials, not ".concat(coeffs));
      }
    }
  });
});
var name$C = "det";
var dependencies$C = ["typed", "matrix", "subtractScalar", "multiply", "divideScalar", "isZero", "unaryMinus"];
var createDet = /* @__PURE__ */ factory(name$C, dependencies$C, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    subtractScalar: subtractScalar2,
    multiply: multiply2,
    divideScalar: divideScalar2,
    isZero: isZero2,
    unaryMinus: unaryMinus2
  } = _ref;
  return typed2(name$C, {
    any: function any(x) {
      return clone$3(x);
    },
    "Array | Matrix": function det2(x) {
      var size2;
      if (isMatrix(x)) {
        size2 = x.size();
      } else if (Array.isArray(x)) {
        x = matrix2(x);
        size2 = x.size();
      } else {
        size2 = [];
      }
      switch (size2.length) {
        case 0:
          return clone$3(x);
        case 1:
          if (size2[0] === 1) {
            return clone$3(x.valueOf()[0]);
          }
          if (size2[0] === 0) {
            return 1;
          } else {
            throw new RangeError("Matrix must be square (size: " + format$1(size2) + ")");
          }
        case 2: {
          var rows = size2[0];
          var cols = size2[1];
          if (rows === cols) {
            return _det(x.clone().valueOf(), rows);
          }
          if (cols === 0) {
            return 1;
          } else {
            throw new RangeError("Matrix must be square (size: " + format$1(size2) + ")");
          }
        }
        default:
          throw new RangeError("Matrix must be two dimensional (size: " + format$1(size2) + ")");
      }
    }
  });
  function _det(matrix3, rows, cols) {
    if (rows === 1) {
      return clone$3(matrix3[0][0]);
    } else if (rows === 2) {
      return subtractScalar2(multiply2(matrix3[0][0], matrix3[1][1]), multiply2(matrix3[1][0], matrix3[0][1]));
    } else {
      var negated = false;
      var rowIndices = new Array(rows).fill(0).map((_, i3) => i3);
      for (var k = 0; k < rows; k++) {
        var k_ = rowIndices[k];
        if (isZero2(matrix3[k_][k])) {
          var _k = void 0;
          for (_k = k + 1; _k < rows; _k++) {
            if (!isZero2(matrix3[rowIndices[_k]][k])) {
              k_ = rowIndices[_k];
              rowIndices[_k] = rowIndices[k];
              rowIndices[k] = k_;
              negated = !negated;
              break;
            }
          }
          if (_k === rows)
            return matrix3[k_][k];
        }
        var piv = matrix3[k_][k];
        var piv_ = k === 0 ? 1 : matrix3[rowIndices[k - 1]][k - 1];
        for (var i2 = k + 1; i2 < rows; i2++) {
          var i_ = rowIndices[i2];
          for (var j = k + 1; j < rows; j++) {
            matrix3[i_][j] = divideScalar2(subtractScalar2(multiply2(matrix3[i_][j], piv), multiply2(matrix3[i_][k], matrix3[k_][j])), piv_);
          }
        }
      }
      var det2 = matrix3[rowIndices[rows - 1]][rows - 1];
      return negated ? unaryMinus2(det2) : det2;
    }
  }
});
var name$B = "inv";
var dependencies$B = ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"];
var createInv = /* @__PURE__ */ factory(name$B, dependencies$B, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    divideScalar: divideScalar2,
    addScalar: addScalar2,
    multiply: multiply2,
    unaryMinus: unaryMinus2,
    det: det2,
    identity: identity2,
    abs: abs2
  } = _ref;
  return typed2(name$B, {
    "Array | Matrix": function ArrayMatrix(x) {
      var size2 = isMatrix(x) ? x.size() : arraySize(x);
      switch (size2.length) {
        case 1:
          if (size2[0] === 1) {
            if (isMatrix(x)) {
              return matrix2([divideScalar2(1, x.valueOf()[0])]);
            } else {
              return [divideScalar2(1, x[0])];
            }
          } else {
            throw new RangeError("Matrix must be square (size: " + format$1(size2) + ")");
          }
        case 2: {
          var rows = size2[0];
          var cols = size2[1];
          if (rows === cols) {
            if (isMatrix(x)) {
              return matrix2(_inv(x.valueOf(), rows, cols), x.storage());
            } else {
              return _inv(x, rows, cols);
            }
          } else {
            throw new RangeError("Matrix must be square (size: " + format$1(size2) + ")");
          }
        }
        default:
          throw new RangeError("Matrix must be two dimensional (size: " + format$1(size2) + ")");
      }
    },
    any: function any(x) {
      return divideScalar2(1, x);
    }
  });
  function _inv(mat, rows, cols) {
    var r, s, f, value, temp;
    if (rows === 1) {
      value = mat[0][0];
      if (value === 0) {
        throw Error("Cannot calculate inverse, determinant is zero");
      }
      return [[divideScalar2(1, value)]];
    } else if (rows === 2) {
      var d = det2(mat);
      if (d === 0) {
        throw Error("Cannot calculate inverse, determinant is zero");
      }
      return [[divideScalar2(mat[1][1], d), divideScalar2(unaryMinus2(mat[0][1]), d)], [divideScalar2(unaryMinus2(mat[1][0]), d), divideScalar2(mat[0][0], d)]];
    } else {
      var A = mat.concat();
      for (r = 0; r < rows; r++) {
        A[r] = A[r].concat();
      }
      var B = identity2(rows).valueOf();
      for (var c = 0; c < cols; c++) {
        var ABig = abs2(A[c][c]);
        var rBig = c;
        r = c + 1;
        while (r < rows) {
          if (abs2(A[r][c]) > ABig) {
            ABig = abs2(A[r][c]);
            rBig = r;
          }
          r++;
        }
        if (ABig === 0) {
          throw Error("Cannot calculate inverse, determinant is zero");
        }
        r = rBig;
        if (r !== c) {
          temp = A[c];
          A[c] = A[r];
          A[r] = temp;
          temp = B[c];
          B[c] = B[r];
          B[r] = temp;
        }
        var Ac = A[c];
        var Bc = B[c];
        for (r = 0; r < rows; r++) {
          var Ar = A[r];
          var Br = B[r];
          if (r !== c) {
            if (Ar[c] !== 0) {
              f = divideScalar2(unaryMinus2(Ar[c]), Ac[c]);
              for (s = c; s < cols; s++) {
                Ar[s] = addScalar2(Ar[s], multiply2(f, Ac[s]));
              }
              for (s = 0; s < cols; s++) {
                Br[s] = addScalar2(Br[s], multiply2(f, Bc[s]));
              }
            }
          } else {
            f = Ac[c];
            for (s = c; s < cols; s++) {
              Ar[s] = divideScalar2(Ar[s], f);
            }
            for (s = 0; s < cols; s++) {
              Br[s] = divideScalar2(Br[s], f);
            }
          }
        }
      }
      return B;
    }
  }
});
var name$A = "pinv";
var dependencies$A = ["typed", "matrix", "inv", "deepEqual", "equal", "dotDivide", "dot", "ctranspose", "divideScalar", "multiply", "add", "Complex"];
var createPinv = /* @__PURE__ */ factory(name$A, dependencies$A, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    inv: inv2,
    deepEqual: deepEqual2,
    equal: equal2,
    dotDivide: dotDivide2,
    dot: dot2,
    ctranspose: ctranspose2,
    divideScalar: divideScalar2,
    multiply: multiply2,
    add: add2,
    Complex: Complex2
  } = _ref;
  return typed2(name$A, {
    "Array | Matrix": function ArrayMatrix(x) {
      var size2 = isMatrix(x) ? x.size() : arraySize(x);
      switch (size2.length) {
        case 1:
          if (_isZeros(x))
            return ctranspose2(x);
          if (size2[0] === 1) {
            return inv2(x);
          } else {
            return dotDivide2(ctranspose2(x), dot2(x, x));
          }
        case 2: {
          if (_isZeros(x))
            return ctranspose2(x);
          var rows = size2[0];
          var cols = size2[1];
          if (rows === cols) {
            try {
              return inv2(x);
            } catch (err) {
              if (err instanceof Error && err.message.match(/Cannot calculate inverse, determinant is zero/))
                ;
              else {
                throw err;
              }
            }
          }
          if (isMatrix(x)) {
            return matrix2(_pinv(x.valueOf(), rows, cols), x.storage());
          } else {
            return _pinv(x, rows, cols);
          }
        }
        default:
          throw new RangeError("Matrix must be two dimensional (size: " + format$1(size2) + ")");
      }
    },
    any: function any(x) {
      if (equal2(x, 0))
        return clone$3(x);
      return divideScalar2(1, x);
    }
  });
  function _pinv(mat, rows, cols) {
    var {
      C,
      F
    } = _rankFact(mat, rows, cols);
    var Cpinv = multiply2(inv2(multiply2(ctranspose2(C), C)), ctranspose2(C));
    var Fpinv = multiply2(ctranspose2(F), inv2(multiply2(F, ctranspose2(F))));
    return multiply2(Fpinv, Cpinv);
  }
  function _rref(mat, rows, cols) {
    var M = clone$3(mat);
    var lead = 0;
    for (var r = 0; r < rows; r++) {
      if (cols <= lead) {
        return M;
      }
      var i2 = r;
      while (_isZero(M[i2][lead])) {
        i2++;
        if (rows === i2) {
          i2 = r;
          lead++;
          if (cols === lead) {
            return M;
          }
        }
      }
      [M[i2], M[r]] = [M[r], M[i2]];
      var val = M[r][lead];
      for (var j = 0; j < cols; j++) {
        M[r][j] = dotDivide2(M[r][j], val);
      }
      for (var _i = 0; _i < rows; _i++) {
        if (_i === r)
          continue;
        val = M[_i][lead];
        for (var _j = 0; _j < cols; _j++) {
          M[_i][_j] = add2(M[_i][_j], multiply2(-1, multiply2(val, M[r][_j])));
        }
      }
      lead++;
    }
    return M;
  }
  function _rankFact(mat, rows, cols) {
    var rref = _rref(mat, rows, cols);
    var C = mat.map((_, i2) => _.filter((_2, j) => j < rows && !_isZero(dot2(rref[j], rref[j]))));
    var F = rref.filter((_, i2) => !_isZero(dot2(rref[i2], rref[i2])));
    return {
      C,
      F
    };
  }
  function _isZero(x) {
    return equal2(add2(x, Complex2(1, 1)), add2(0, Complex2(1, 1)));
  }
  function _isZeros(arr) {
    return deepEqual2(add2(arr, Complex2(1, 1)), add2(multiply2(arr, 0), Complex2(1, 1)));
  }
});
function createComplexEigs(_ref) {
  var {
    addScalar: addScalar2,
    subtract: subtract2,
    flatten: flatten2,
    multiply: multiply2,
    multiplyScalar: multiplyScalar2,
    divideScalar: divideScalar2,
    sqrt: sqrt2,
    abs: abs2,
    bignumber: bignumber2,
    diag: diag2,
    size: size2,
    reshape: reshape2,
    inv: inv2,
    qr: qr2,
    usolve: usolve2,
    usolveAll: usolveAll2,
    equal: equal2,
    complex: complex2,
    larger: larger2,
    smaller: smaller2,
    matrixFromColumns: matrixFromColumns2,
    dot: dot2
  } = _ref;
  function complexEigs(arr, N, prec, type) {
    var findVectors = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true;
    var R = balance(arr, N, prec, type, findVectors);
    reduceToHessenberg(arr, N, prec, type, findVectors, R);
    var {
      values,
      C
    } = iterateUntilTriangular(arr, N, prec, type, findVectors);
    if (findVectors) {
      var eigenvectors = findEigenvectors(arr, N, C, R, values, prec, type);
      return {
        values,
        eigenvectors
      };
    }
    return {
      values
    };
  }
  function balance(arr, N, prec, type, findVectors) {
    var big = type === "BigNumber";
    var cplx = type === "Complex";
    var realzero = big ? bignumber2(0) : 0;
    var one = big ? bignumber2(1) : cplx ? complex2(1) : 1;
    var realone = big ? bignumber2(1) : 1;
    var radix = big ? bignumber2(10) : 2;
    var radixSq = multiplyScalar2(radix, radix);
    var Rdiag;
    if (findVectors) {
      Rdiag = Array(N).fill(one);
    }
    var last = false;
    while (!last) {
      last = true;
      for (var i2 = 0; i2 < N; i2++) {
        var colNorm = realzero;
        var rowNorm = realzero;
        for (var j = 0; j < N; j++) {
          if (i2 === j)
            continue;
          colNorm = addScalar2(colNorm, abs2(arr[j][i2]));
          rowNorm = addScalar2(rowNorm, abs2(arr[i2][j]));
        }
        if (!equal2(colNorm, 0) && !equal2(rowNorm, 0)) {
          var f = realone;
          var c = colNorm;
          var rowDivRadix = divideScalar2(rowNorm, radix);
          var rowMulRadix = multiplyScalar2(rowNorm, radix);
          while (smaller2(c, rowDivRadix)) {
            c = multiplyScalar2(c, radixSq);
            f = multiplyScalar2(f, radix);
          }
          while (larger2(c, rowMulRadix)) {
            c = divideScalar2(c, radixSq);
            f = divideScalar2(f, radix);
          }
          var condition = smaller2(divideScalar2(addScalar2(c, rowNorm), f), multiplyScalar2(addScalar2(colNorm, rowNorm), 0.95));
          if (condition) {
            last = false;
            var g = divideScalar2(1, f);
            for (var _j = 0; _j < N; _j++) {
              if (i2 === _j) {
                continue;
              }
              arr[i2][_j] = multiplyScalar2(arr[i2][_j], g);
              arr[_j][i2] = multiplyScalar2(arr[_j][i2], f);
            }
            if (findVectors) {
              Rdiag[i2] = multiplyScalar2(Rdiag[i2], g);
            }
          }
        }
      }
    }
    return findVectors ? diag2(Rdiag) : null;
  }
  function reduceToHessenberg(arr, N, prec, type, findVectors, R) {
    var big = type === "BigNumber";
    var cplx = type === "Complex";
    var zero = big ? bignumber2(0) : cplx ? complex2(0) : 0;
    if (big) {
      prec = bignumber2(prec);
    }
    for (var i2 = 0; i2 < N - 2; i2++) {
      var maxIndex = 0;
      var max2 = zero;
      for (var j = i2 + 1; j < N; j++) {
        var el = arr[j][i2];
        if (smaller2(abs2(max2), abs2(el))) {
          max2 = el;
          maxIndex = j;
        }
      }
      if (smaller2(abs2(max2), prec)) {
        continue;
      }
      if (maxIndex !== i2 + 1) {
        var tmp1 = arr[maxIndex];
        arr[maxIndex] = arr[i2 + 1];
        arr[i2 + 1] = tmp1;
        for (var _j2 = 0; _j2 < N; _j2++) {
          var tmp2 = arr[_j2][maxIndex];
          arr[_j2][maxIndex] = arr[_j2][i2 + 1];
          arr[_j2][i2 + 1] = tmp2;
        }
        if (findVectors) {
          var tmp3 = R[maxIndex];
          R[maxIndex] = R[i2 + 1];
          R[i2 + 1] = tmp3;
        }
      }
      for (var _j3 = i2 + 2; _j3 < N; _j3++) {
        var n = divideScalar2(arr[_j3][i2], max2);
        if (n === 0) {
          continue;
        }
        for (var k = 0; k < N; k++) {
          arr[_j3][k] = subtract2(arr[_j3][k], multiplyScalar2(n, arr[i2 + 1][k]));
        }
        for (var _k = 0; _k < N; _k++) {
          arr[_k][i2 + 1] = addScalar2(arr[_k][i2 + 1], multiplyScalar2(n, arr[_k][_j3]));
        }
        if (findVectors) {
          for (var _k2 = 0; _k2 < N; _k2++) {
            R[_j3][_k2] = subtract2(R[_j3][_k2], multiplyScalar2(n, R[i2 + 1][_k2]));
          }
        }
      }
    }
    return R;
  }
  function iterateUntilTriangular(A, N, prec, type, findVectors) {
    var big = type === "BigNumber";
    var cplx = type === "Complex";
    var one = big ? bignumber2(1) : cplx ? complex2(1) : 1;
    if (big) {
      prec = bignumber2(prec);
    }
    var arr = clone$3(A);
    var lambdas = [];
    var n = N;
    var Sdiag = [];
    var Qtotal = findVectors ? diag2(Array(N).fill(one)) : void 0;
    var Qpartial = findVectors ? diag2(Array(n).fill(one)) : void 0;
    var lastConvergenceBefore = 0;
    while (lastConvergenceBefore <= 100) {
      lastConvergenceBefore += 1;
      var k = arr[n - 1][n - 1];
      for (var i2 = 0; i2 < n; i2++) {
        arr[i2][i2] = subtract2(arr[i2][i2], k);
      }
      var {
        Q: Q2,
        R
      } = qr2(arr);
      arr = multiply2(R, Q2);
      for (var _i = 0; _i < n; _i++) {
        arr[_i][_i] = addScalar2(arr[_i][_i], k);
      }
      if (findVectors) {
        Qpartial = multiply2(Qpartial, Q2);
      }
      if (n === 1 || smaller2(abs2(arr[n - 1][n - 2]), prec)) {
        lastConvergenceBefore = 0;
        lambdas.push(arr[n - 1][n - 1]);
        if (findVectors) {
          Sdiag.unshift([[1]]);
          inflateMatrix(Qpartial, N);
          Qtotal = multiply2(Qtotal, Qpartial);
          if (n > 1) {
            Qpartial = diag2(Array(n - 1).fill(one));
          }
        }
        n -= 1;
        arr.pop();
        for (var _i2 = 0; _i2 < n; _i2++) {
          arr[_i2].pop();
        }
      } else if (n === 2 || smaller2(abs2(arr[n - 2][n - 3]), prec)) {
        lastConvergenceBefore = 0;
        var ll = eigenvalues2x2(arr[n - 2][n - 2], arr[n - 2][n - 1], arr[n - 1][n - 2], arr[n - 1][n - 1]);
        lambdas.push(...ll);
        if (findVectors) {
          Sdiag.unshift(jordanBase2x2(arr[n - 2][n - 2], arr[n - 2][n - 1], arr[n - 1][n - 2], arr[n - 1][n - 1], ll[0], ll[1], prec, type));
          inflateMatrix(Qpartial, N);
          Qtotal = multiply2(Qtotal, Qpartial);
          if (n > 2) {
            Qpartial = diag2(Array(n - 2).fill(one));
          }
        }
        n -= 2;
        arr.pop();
        arr.pop();
        for (var _i3 = 0; _i3 < n; _i3++) {
          arr[_i3].pop();
          arr[_i3].pop();
        }
      }
      if (n === 0) {
        break;
      }
    }
    lambdas.sort((a, b) => +subtract2(abs2(a), abs2(b)));
    if (lastConvergenceBefore > 100) {
      var err = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + lambdas.join(", "));
      err.values = lambdas;
      err.vectors = [];
      throw err;
    }
    var C = findVectors ? multiply2(Qtotal, blockDiag(Sdiag, N)) : void 0;
    return {
      values: lambdas,
      C
    };
  }
  function findEigenvectors(A, N, C, R, values, prec, type) {
    var Cinv = inv2(C);
    var U = multiply2(Cinv, A, C);
    var big = type === "BigNumber";
    var cplx = type === "Complex";
    var zero = big ? bignumber2(0) : cplx ? complex2(0) : 0;
    var one = big ? bignumber2(1) : cplx ? complex2(1) : 1;
    var uniqueValues = [];
    var multiplicities = [];
    for (var lambda of values) {
      var i2 = indexOf(uniqueValues, lambda, equal2);
      if (i2 === -1) {
        uniqueValues.push(lambda);
        multiplicities.push(1);
      } else {
        multiplicities[i2] += 1;
      }
    }
    var vectors = [];
    var len = uniqueValues.length;
    var b = Array(N).fill(zero);
    var E = diag2(Array(N).fill(one));
    var _loop = function _loop2() {
      var lambda2 = uniqueValues[_i4];
      var S = subtract2(U, multiply2(lambda2, E));
      var solutions = usolveAll2(S, b);
      solutions.shift();
      while (solutions.length < multiplicities[_i4]) {
        var approxVec = inverseIterate(S, N, solutions, prec, type);
        if (approxVec === null) {
          break;
        }
        solutions.push(approxVec);
      }
      var correction = multiply2(inv2(R), C);
      solutions = solutions.map((v) => multiply2(correction, v));
      vectors.push(...solutions.map((v) => ({
        value: lambda2,
        vector: flatten2(v)
      })));
    };
    for (var _i4 = 0; _i4 < len; _i4++) {
      _loop();
    }
    return vectors;
  }
  function eigenvalues2x2(a, b, c, d) {
    var trA = addScalar2(a, d);
    var detA = subtract2(multiplyScalar2(a, d), multiplyScalar2(b, c));
    var x = multiplyScalar2(trA, 0.5);
    var y = multiplyScalar2(sqrt2(subtract2(multiplyScalar2(trA, trA), multiplyScalar2(4, detA))), 0.5);
    return [addScalar2(x, y), subtract2(x, y)];
  }
  function jordanBase2x2(a, b, c, d, l1, l2, prec, type) {
    var big = type === "BigNumber";
    var cplx = type === "Complex";
    var zero = big ? bignumber2(0) : cplx ? complex2(0) : 0;
    var one = big ? bignumber2(1) : cplx ? complex2(1) : 1;
    if (smaller2(abs2(c), prec)) {
      return [[one, zero], [zero, one]];
    }
    if (larger2(abs2(subtract2(l1, l2)), prec)) {
      return [[subtract2(l1, d), subtract2(l2, d)], [c, c]];
    }
    var na = subtract2(a, l1);
    var nd = subtract2(d, l1);
    if (smaller2(abs2(b), prec) && smaller2(abs2(nd), prec)) {
      return [[na, one], [c, zero]];
    } else {
      return [[b, zero], [nd, one]];
    }
  }
  function inflateMatrix(arr, N) {
    for (var i2 = 0; i2 < arr.length; i2++) {
      arr[i2].push(...Array(N - arr[i2].length).fill(0));
    }
    for (var _i5 = arr.length; _i5 < N; _i5++) {
      arr.push(Array(N).fill(0));
      arr[_i5][_i5] = 1;
    }
    return arr;
  }
  function blockDiag(arr, N) {
    var M = [];
    for (var i2 = 0; i2 < N; i2++) {
      M[i2] = Array(N).fill(0);
    }
    var I = 0;
    for (var sub2 of arr) {
      var n = sub2.length;
      for (var _i6 = 0; _i6 < n; _i6++) {
        for (var j = 0; j < n; j++) {
          M[I + _i6][I + j] = sub2[_i6][j];
        }
      }
      I += n;
    }
    return M;
  }
  function indexOf(arr, el, fn) {
    for (var i2 = 0; i2 < arr.length; i2++) {
      if (fn(arr[i2], el)) {
        return i2;
      }
    }
    return -1;
  }
  function inverseIterate(A, N, orthog, prec, type) {
    var largeNum = type === "BigNumber" ? bignumber2(1e3) : 1e3;
    var b;
    var i2 = 0;
    for (; i2 < 5; ++i2) {
      b = randomOrthogonalVector(N, orthog, type);
      try {
        b = usolve2(A, b);
      } catch (_unused) {
        continue;
      }
      if (larger2(norm2(b), largeNum)) {
        break;
      }
    }
    if (i2 >= 5) {
      return null;
    }
    i2 = 0;
    while (true) {
      var c = usolve2(A, b);
      if (smaller2(norm2(orthogonalComplement(b, [c])), prec)) {
        break;
      }
      if (++i2 >= 10) {
        return null;
      }
      b = normalize(c);
    }
    return b;
  }
  function randomOrthogonalVector(N, orthog, type) {
    var big = type === "BigNumber";
    var cplx = type === "Complex";
    var v = Array(N).fill(0).map((_) => 2 * Math.random() - 1);
    if (big) {
      v = v.map((n) => bignumber2(n));
    }
    if (cplx) {
      v = v.map((n) => complex2(n));
    }
    v = orthogonalComplement(v, orthog);
    return normalize(v, type);
  }
  function orthogonalComplement(v, orthog) {
    var vectorShape = size2(v);
    for (var w of orthog) {
      w = reshape2(w, vectorShape);
      v = subtract2(v, multiply2(divideScalar2(dot2(w, v), dot2(w, w)), w));
    }
    return v;
  }
  function norm2(v) {
    return abs2(sqrt2(dot2(v, v)));
  }
  function normalize(v, type) {
    var big = type === "BigNumber";
    var cplx = type === "Complex";
    var one = big ? bignumber2(1) : cplx ? complex2(1) : 1;
    return multiply2(divideScalar2(one, norm2(v)), v);
  }
  return complexEigs;
}
function createRealSymmetric(_ref) {
  var {
    config: config3,
    addScalar: addScalar2,
    subtract: subtract2,
    abs: abs2,
    atan: atan3,
    cos: cos2,
    sin: sin2,
    multiplyScalar: multiplyScalar2,
    inv: inv2,
    bignumber: bignumber2,
    multiply: multiply2,
    add: add2
  } = _ref;
  function main(arr, N) {
    var prec = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : config3.epsilon;
    var type = arguments.length > 3 ? arguments[3] : void 0;
    var computeVectors = arguments.length > 4 ? arguments[4] : void 0;
    if (type === "number") {
      return diag2(arr, prec, computeVectors);
    }
    if (type === "BigNumber") {
      return diagBig(arr, prec, computeVectors);
    }
    throw TypeError("Unsupported data type: " + type);
  }
  function diag2(x, precision, computeVectors) {
    var N = x.length;
    var e0 = Math.abs(precision / N);
    var psi;
    var Sij;
    if (computeVectors) {
      Sij = new Array(N);
      for (var i2 = 0; i2 < N; i2++) {
        Sij[i2] = Array(N).fill(0);
        Sij[i2][i2] = 1;
      }
    }
    var Vab = getAij(x);
    while (Math.abs(Vab[1]) >= Math.abs(e0)) {
      var _i = Vab[0][0];
      var j = Vab[0][1];
      psi = getTheta(x[_i][_i], x[j][j], x[_i][j]);
      x = x1(x, psi, _i, j);
      if (computeVectors)
        Sij = Sij1(Sij, psi, _i, j);
      Vab = getAij(x);
    }
    var Ei = Array(N).fill(0);
    for (var _i2 = 0; _i2 < N; _i2++) {
      Ei[_i2] = x[_i2][_i2];
    }
    return sorting(clone$3(Ei), Sij, computeVectors);
  }
  function diagBig(x, precision, computeVectors) {
    var N = x.length;
    var e0 = abs2(precision / N);
    var psi;
    var Sij;
    if (computeVectors) {
      Sij = new Array(N);
      for (var i2 = 0; i2 < N; i2++) {
        Sij[i2] = Array(N).fill(0);
        Sij[i2][i2] = 1;
      }
    }
    var Vab = getAijBig(x);
    while (abs2(Vab[1]) >= abs2(e0)) {
      var _i3 = Vab[0][0];
      var j = Vab[0][1];
      psi = getThetaBig(x[_i3][_i3], x[j][j], x[_i3][j]);
      x = x1Big(x, psi, _i3, j);
      if (computeVectors)
        Sij = Sij1Big(Sij, psi, _i3, j);
      Vab = getAijBig(x);
    }
    var Ei = Array(N).fill(0);
    for (var _i4 = 0; _i4 < N; _i4++) {
      Ei[_i4] = x[_i4][_i4];
    }
    return sorting(clone$3(Ei), Sij, computeVectors);
  }
  function getTheta(aii, ajj, aij) {
    var denom = ajj - aii;
    if (Math.abs(denom) <= config3.epsilon) {
      return Math.PI / 4;
    } else {
      return 0.5 * Math.atan(2 * aij / (ajj - aii));
    }
  }
  function getThetaBig(aii, ajj, aij) {
    var denom = subtract2(ajj, aii);
    if (abs2(denom) <= config3.epsilon) {
      return bignumber2(-1).acos().div(4);
    } else {
      return multiplyScalar2(0.5, atan3(multiply2(2, aij, inv2(denom))));
    }
  }
  function Sij1(Sij, theta, i2, j) {
    var N = Sij.length;
    var c = Math.cos(theta);
    var s = Math.sin(theta);
    var Ski = Array(N).fill(0);
    var Skj = Array(N).fill(0);
    for (var k = 0; k < N; k++) {
      Ski[k] = c * Sij[k][i2] - s * Sij[k][j];
      Skj[k] = s * Sij[k][i2] + c * Sij[k][j];
    }
    for (var _k = 0; _k < N; _k++) {
      Sij[_k][i2] = Ski[_k];
      Sij[_k][j] = Skj[_k];
    }
    return Sij;
  }
  function Sij1Big(Sij, theta, i2, j) {
    var N = Sij.length;
    var c = cos2(theta);
    var s = sin2(theta);
    var Ski = Array(N).fill(bignumber2(0));
    var Skj = Array(N).fill(bignumber2(0));
    for (var k = 0; k < N; k++) {
      Ski[k] = subtract2(multiplyScalar2(c, Sij[k][i2]), multiplyScalar2(s, Sij[k][j]));
      Skj[k] = addScalar2(multiplyScalar2(s, Sij[k][i2]), multiplyScalar2(c, Sij[k][j]));
    }
    for (var _k2 = 0; _k2 < N; _k2++) {
      Sij[_k2][i2] = Ski[_k2];
      Sij[_k2][j] = Skj[_k2];
    }
    return Sij;
  }
  function x1Big(Hij, theta, i2, j) {
    var N = Hij.length;
    var c = bignumber2(cos2(theta));
    var s = bignumber2(sin2(theta));
    var c2 = multiplyScalar2(c, c);
    var s2 = multiplyScalar2(s, s);
    var Aki = Array(N).fill(bignumber2(0));
    var Akj = Array(N).fill(bignumber2(0));
    var csHij = multiply2(bignumber2(2), c, s, Hij[i2][j]);
    var Aii = addScalar2(subtract2(multiplyScalar2(c2, Hij[i2][i2]), csHij), multiplyScalar2(s2, Hij[j][j]));
    var Ajj = add2(multiplyScalar2(s2, Hij[i2][i2]), csHij, multiplyScalar2(c2, Hij[j][j]));
    for (var k = 0; k < N; k++) {
      Aki[k] = subtract2(multiplyScalar2(c, Hij[i2][k]), multiplyScalar2(s, Hij[j][k]));
      Akj[k] = addScalar2(multiplyScalar2(s, Hij[i2][k]), multiplyScalar2(c, Hij[j][k]));
    }
    Hij[i2][i2] = Aii;
    Hij[j][j] = Ajj;
    Hij[i2][j] = bignumber2(0);
    Hij[j][i2] = bignumber2(0);
    for (var _k3 = 0; _k3 < N; _k3++) {
      if (_k3 !== i2 && _k3 !== j) {
        Hij[i2][_k3] = Aki[_k3];
        Hij[_k3][i2] = Aki[_k3];
        Hij[j][_k3] = Akj[_k3];
        Hij[_k3][j] = Akj[_k3];
      }
    }
    return Hij;
  }
  function x1(Hij, theta, i2, j) {
    var N = Hij.length;
    var c = Math.cos(theta);
    var s = Math.sin(theta);
    var c2 = c * c;
    var s2 = s * s;
    var Aki = Array(N).fill(0);
    var Akj = Array(N).fill(0);
    var Aii = c2 * Hij[i2][i2] - 2 * c * s * Hij[i2][j] + s2 * Hij[j][j];
    var Ajj = s2 * Hij[i2][i2] + 2 * c * s * Hij[i2][j] + c2 * Hij[j][j];
    for (var k = 0; k < N; k++) {
      Aki[k] = c * Hij[i2][k] - s * Hij[j][k];
      Akj[k] = s * Hij[i2][k] + c * Hij[j][k];
    }
    Hij[i2][i2] = Aii;
    Hij[j][j] = Ajj;
    Hij[i2][j] = 0;
    Hij[j][i2] = 0;
    for (var _k4 = 0; _k4 < N; _k4++) {
      if (_k4 !== i2 && _k4 !== j) {
        Hij[i2][_k4] = Aki[_k4];
        Hij[_k4][i2] = Aki[_k4];
        Hij[j][_k4] = Akj[_k4];
        Hij[_k4][j] = Akj[_k4];
      }
    }
    return Hij;
  }
  function getAij(Mij) {
    var N = Mij.length;
    var maxMij = 0;
    var maxIJ = [0, 1];
    for (var i2 = 0; i2 < N; i2++) {
      for (var j = i2 + 1; j < N; j++) {
        if (Math.abs(maxMij) < Math.abs(Mij[i2][j])) {
          maxMij = Math.abs(Mij[i2][j]);
          maxIJ = [i2, j];
        }
      }
    }
    return [maxIJ, maxMij];
  }
  function getAijBig(Mij) {
    var N = Mij.length;
    var maxMij = 0;
    var maxIJ = [0, 1];
    for (var i2 = 0; i2 < N; i2++) {
      for (var j = i2 + 1; j < N; j++) {
        if (abs2(maxMij) < abs2(Mij[i2][j])) {
          maxMij = abs2(Mij[i2][j]);
          maxIJ = [i2, j];
        }
      }
    }
    return [maxIJ, maxMij];
  }
  function sorting(E, S, computeVectors) {
    var N = E.length;
    var values = Array(N);
    var vecs;
    if (computeVectors) {
      vecs = Array(N);
      for (var k = 0; k < N; k++) {
        vecs[k] = Array(N);
      }
    }
    for (var i2 = 0; i2 < N; i2++) {
      var minID = 0;
      var minE = E[0];
      for (var j = 0; j < E.length; j++) {
        if (abs2(E[j]) < abs2(minE)) {
          minID = j;
          minE = E[minID];
        }
      }
      values[i2] = E.splice(minID, 1)[0];
      if (computeVectors) {
        for (var _k5 = 0; _k5 < N; _k5++) {
          vecs[i2][_k5] = S[_k5][minID];
          S[_k5].splice(minID, 1);
        }
      }
    }
    if (!computeVectors)
      return {
        values
      };
    var eigenvectors = vecs.map((vector, i3) => ({
      value: values[i3],
      vector
    }));
    return {
      values,
      eigenvectors
    };
  }
  return main;
}
var name$z = "eigs";
var dependencies$z = ["config", "typed", "matrix", "addScalar", "equal", "subtract", "abs", "atan", "cos", "sin", "multiplyScalar", "divideScalar", "inv", "bignumber", "multiply", "add", "larger", "column", "flatten", "number", "complex", "sqrt", "diag", "size", "reshape", "qr", "usolve", "usolveAll", "im", "re", "smaller", "matrixFromColumns", "dot"];
var createEigs = /* @__PURE__ */ factory(name$z, dependencies$z, (_ref) => {
  var {
    config: config3,
    typed: typed2,
    matrix: matrix2,
    addScalar: addScalar2,
    subtract: subtract2,
    equal: equal2,
    abs: abs2,
    atan: atan3,
    cos: cos2,
    sin: sin2,
    multiplyScalar: multiplyScalar2,
    divideScalar: divideScalar2,
    inv: inv2,
    bignumber: bignumber2,
    multiply: multiply2,
    add: add2,
    larger: larger2,
    column: column2,
    flatten: flatten2,
    number: number2,
    complex: complex2,
    sqrt: sqrt2,
    diag: diag2,
    size: size2,
    reshape: reshape2,
    qr: qr2,
    usolve: usolve2,
    usolveAll: usolveAll2,
    im: im2,
    re: re2,
    smaller: smaller2,
    matrixFromColumns: matrixFromColumns2,
    dot: dot2
  } = _ref;
  var doRealSymmetric = createRealSymmetric({
    config: config3,
    addScalar: addScalar2,
    subtract: subtract2,
    column: column2,
    flatten: flatten2,
    equal: equal2,
    abs: abs2,
    atan: atan3,
    cos: cos2,
    sin: sin2,
    multiplyScalar: multiplyScalar2,
    inv: inv2,
    bignumber: bignumber2,
    complex: complex2,
    multiply: multiply2,
    add: add2
  });
  var doComplexEigs = createComplexEigs({
    config: config3,
    addScalar: addScalar2,
    subtract: subtract2,
    multiply: multiply2,
    multiplyScalar: multiplyScalar2,
    flatten: flatten2,
    divideScalar: divideScalar2,
    sqrt: sqrt2,
    abs: abs2,
    bignumber: bignumber2,
    diag: diag2,
    size: size2,
    reshape: reshape2,
    qr: qr2,
    inv: inv2,
    usolve: usolve2,
    usolveAll: usolveAll2,
    equal: equal2,
    complex: complex2,
    larger: larger2,
    smaller: smaller2,
    matrixFromColumns: matrixFromColumns2,
    dot: dot2
  });
  return typed2("eigs", {
    // The conversion to matrix in the first two implementations,
    // just to convert back to an array right away in
    // computeValuesAndVectors, is unfortunate, and should perhaps be
    // streamlined. It is done because the Matrix object carries some
    // type information about its entries, and so constructing the matrix
    // is a roundabout way of doing type detection.
    Array: function Array2(x) {
      return doEigs(matrix2(x));
    },
    "Array, number|BigNumber": function ArrayNumberBigNumber(x, prec) {
      return doEigs(matrix2(x), {
        precision: prec
      });
    },
    "Array, Object"(x, opts) {
      return doEigs(matrix2(x), opts);
    },
    Matrix: function Matrix2(mat) {
      return doEigs(mat, {
        matricize: true
      });
    },
    "Matrix, number|BigNumber": function MatrixNumberBigNumber(mat, prec) {
      return doEigs(mat, {
        precision: prec,
        matricize: true
      });
    },
    "Matrix, Object": function MatrixObject(mat, opts) {
      var useOpts = {
        matricize: true
      };
      _extends(useOpts, opts);
      return doEigs(mat, useOpts);
    }
  });
  function doEigs(mat) {
    var _opts$precision;
    var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var computeVectors = "eigenvectors" in opts ? opts.eigenvectors : true;
    var prec = (_opts$precision = opts.precision) !== null && _opts$precision !== void 0 ? _opts$precision : config3.epsilon;
    var result = computeValuesAndVectors(mat, prec, computeVectors);
    if (opts.matricize) {
      result.values = matrix2(result.values);
      if (computeVectors) {
        result.eigenvectors = result.eigenvectors.map((_ref2) => {
          var {
            value,
            vector
          } = _ref2;
          return {
            value,
            vector: matrix2(vector)
          };
        });
      }
    }
    if (computeVectors) {
      Object.defineProperty(result, "vectors", {
        enumerable: false,
        // to make sure that the eigenvectors can still be
        // converted to string.
        get: () => {
          throw new Error("eigs(M).vectors replaced with eigs(M).eigenvectors");
        }
      });
    }
    return result;
  }
  function computeValuesAndVectors(mat, prec, computeVectors) {
    var arr = mat.toArray();
    var asize = mat.size();
    if (asize.length !== 2 || asize[0] !== asize[1]) {
      throw new RangeError("Matrix must be square (size: ".concat(format$1(asize), ")"));
    }
    var N = asize[0];
    if (isReal(arr, N, prec)) {
      coerceReal(arr, N);
      if (isSymmetric(arr, N, prec)) {
        var _type = coerceTypes(mat, arr, N);
        return doRealSymmetric(arr, N, prec, _type, computeVectors);
      }
    }
    var type = coerceTypes(mat, arr, N);
    return doComplexEigs(arr, N, prec, type, computeVectors);
  }
  function isSymmetric(arr, N, prec) {
    for (var i2 = 0; i2 < N; i2++) {
      for (var j = i2; j < N; j++) {
        if (larger2(bignumber2(abs2(subtract2(arr[i2][j], arr[j][i2]))), prec)) {
          return false;
        }
      }
    }
    return true;
  }
  function isReal(arr, N, prec) {
    for (var i2 = 0; i2 < N; i2++) {
      for (var j = 0; j < N; j++) {
        if (larger2(bignumber2(abs2(im2(arr[i2][j]))), prec)) {
          return false;
        }
      }
    }
    return true;
  }
  function coerceReal(arr, N) {
    for (var i2 = 0; i2 < N; i2++) {
      for (var j = 0; j < N; j++) {
        arr[i2][j] = re2(arr[i2][j]);
      }
    }
  }
  function coerceTypes(mat, arr, N) {
    var type = mat.datatype();
    if (type === "number" || type === "BigNumber" || type === "Complex") {
      return type;
    }
    var hasNumber = false;
    var hasBig = false;
    var hasComplex = false;
    for (var i2 = 0; i2 < N; i2++) {
      for (var j = 0; j < N; j++) {
        var el = arr[i2][j];
        if (isNumber(el) || isFraction(el)) {
          hasNumber = true;
        } else if (isBigNumber(el)) {
          hasBig = true;
        } else if (isComplex(el)) {
          hasComplex = true;
        } else {
          throw TypeError("Unsupported type in Matrix: " + typeOf$1(el));
        }
      }
    }
    if (hasBig && hasComplex) {
      console.warn("Complex BigNumbers not supported, this operation will lose precission.");
    }
    if (hasComplex) {
      for (var _i = 0; _i < N; _i++) {
        for (var _j = 0; _j < N; _j++) {
          arr[_i][_j] = complex2(arr[_i][_j]);
        }
      }
      return "Complex";
    }
    if (hasBig) {
      for (var _i2 = 0; _i2 < N; _i2++) {
        for (var _j2 = 0; _j2 < N; _j2++) {
          arr[_i2][_j2] = bignumber2(arr[_i2][_j2]);
        }
      }
      return "BigNumber";
    }
    if (hasNumber) {
      for (var _i3 = 0; _i3 < N; _i3++) {
        for (var _j3 = 0; _j3 < N; _j3++) {
          arr[_i3][_j3] = number2(arr[_i3][_j3]);
        }
      }
      return "number";
    } else {
      throw TypeError("Matrix contains unsupported types only.");
    }
  }
});
var name$y = "expm";
var dependencies$y = ["typed", "abs", "add", "identity", "inv", "multiply"];
var createExpm = /* @__PURE__ */ factory(name$y, dependencies$y, (_ref) => {
  var {
    typed: typed2,
    abs: abs2,
    add: add2,
    identity: identity2,
    inv: inv2,
    multiply: multiply2
  } = _ref;
  return typed2(name$y, {
    Matrix: function Matrix2(A) {
      var size2 = A.size();
      if (size2.length !== 2 || size2[0] !== size2[1]) {
        throw new RangeError("Matrix must be square (size: " + format$1(size2) + ")");
      }
      var n = size2[0];
      var eps = 1e-15;
      var infNorm = infinityNorm(A);
      var params = findParams(infNorm, eps);
      var q = params.q;
      var j = params.j;
      var Apos = multiply2(A, Math.pow(2, -j));
      var N = identity2(n);
      var D = identity2(n);
      var factor = 1;
      var AposToI = Apos;
      var alternate = -1;
      for (var i2 = 1; i2 <= q; i2++) {
        if (i2 > 1) {
          AposToI = multiply2(AposToI, Apos);
          alternate = -alternate;
        }
        factor = factor * (q - i2 + 1) / ((2 * q - i2 + 1) * i2);
        N = add2(N, multiply2(factor, AposToI));
        D = add2(D, multiply2(factor * alternate, AposToI));
      }
      var R = multiply2(inv2(D), N);
      for (var _i = 0; _i < j; _i++) {
        R = multiply2(R, R);
      }
      return isSparseMatrix(A) ? A.createSparseMatrix(R) : R;
    }
  });
  function infinityNorm(A) {
    var n = A.size()[0];
    var infNorm = 0;
    for (var i2 = 0; i2 < n; i2++) {
      var rowSum = 0;
      for (var j = 0; j < n; j++) {
        rowSum += abs2(A.get([i2, j]));
      }
      infNorm = Math.max(rowSum, infNorm);
    }
    return infNorm;
  }
  function findParams(infNorm, eps) {
    var maxSearchSize = 30;
    for (var k = 0; k < maxSearchSize; k++) {
      for (var q = 0; q <= k; q++) {
        var j = k - q;
        if (errorEstimate(infNorm, q, j) < eps) {
          return {
            q,
            j
          };
        }
      }
    }
    throw new Error("Could not find acceptable parameters to compute the matrix exponential (try increasing maxSearchSize in expm.js)");
  }
  function errorEstimate(infNorm, q, j) {
    var qfac = 1;
    for (var i2 = 2; i2 <= q; i2++) {
      qfac *= i2;
    }
    var twoqfac = qfac;
    for (var _i2 = q + 1; _i2 <= 2 * q; _i2++) {
      twoqfac *= _i2;
    }
    var twoqp1fac = twoqfac * (2 * q + 1);
    return 8 * Math.pow(infNorm / Math.pow(2, j), 2 * q) * qfac * qfac / (twoqfac * twoqp1fac);
  }
});
var name$x = "sqrtm";
var dependencies$x = ["typed", "abs", "add", "multiply", "map", "sqrt", "subtract", "inv", "size", "max", "identity"];
var createSqrtm = /* @__PURE__ */ factory(name$x, dependencies$x, (_ref) => {
  var {
    typed: typed2,
    abs: abs2,
    add: add2,
    multiply: multiply2,
    map: map2,
    sqrt: sqrt2,
    subtract: subtract2,
    inv: inv2,
    size: size2,
    max: max2,
    identity: identity2
  } = _ref;
  var _maxIterations = 1e3;
  var _tolerance = 1e-6;
  function _denmanBeavers(A) {
    var error;
    var iterations = 0;
    var Y = A;
    var Z = identity2(size2(A));
    do {
      var Yk = Y;
      Y = multiply2(0.5, add2(Yk, inv2(Z)));
      Z = multiply2(0.5, add2(Z, inv2(Yk)));
      error = max2(abs2(subtract2(Y, Yk)));
      if (error > _tolerance && ++iterations > _maxIterations) {
        throw new Error("computing square root of matrix: iterative method could not converge");
      }
    } while (error > _tolerance);
    return Y;
  }
  return typed2(name$x, {
    "Array | Matrix": function ArrayMatrix(A) {
      var size3 = isMatrix(A) ? A.size() : arraySize(A);
      switch (size3.length) {
        case 1:
          if (size3[0] === 1) {
            return map2(A, sqrt2);
          } else {
            throw new RangeError("Matrix must be square (size: " + format$1(size3) + ")");
          }
        case 2: {
          var rows = size3[0];
          var cols = size3[1];
          if (rows === cols) {
            return _denmanBeavers(A);
          } else {
            throw new RangeError("Matrix must be square (size: " + format$1(size3) + ")");
          }
        }
        default:
          throw new RangeError("Matrix must be at most two dimensional (size: " + format$1(size3) + ")");
      }
    }
  });
});
var name$w = "sylvester";
var dependencies$w = ["typed", "schur", "matrixFromColumns", "matrix", "multiply", "range", "concat", "transpose", "index", "subset", "add", "subtract", "identity", "lusolve", "abs"];
var createSylvester = /* @__PURE__ */ factory(name$w, dependencies$w, (_ref) => {
  var {
    typed: typed2,
    schur: schur2,
    matrixFromColumns: matrixFromColumns2,
    matrix: matrix2,
    multiply: multiply2,
    range: range2,
    concat: concat2,
    transpose: transpose2,
    index: index2,
    subset: subset2,
    add: add2,
    subtract: subtract2,
    identity: identity2,
    lusolve: lusolve2,
    abs: abs2
  } = _ref;
  return typed2(name$w, {
    "Matrix, Matrix, Matrix": _sylvester,
    "Array, Matrix, Matrix": function ArrayMatrixMatrix(A, B, C) {
      return _sylvester(matrix2(A), B, C);
    },
    "Array, Array, Matrix": function ArrayArrayMatrix(A, B, C) {
      return _sylvester(matrix2(A), matrix2(B), C);
    },
    "Array, Matrix, Array": function ArrayMatrixArray(A, B, C) {
      return _sylvester(matrix2(A), B, matrix2(C));
    },
    "Matrix, Array, Matrix": function MatrixArrayMatrix(A, B, C) {
      return _sylvester(A, matrix2(B), C);
    },
    "Matrix, Array, Array": function MatrixArrayArray(A, B, C) {
      return _sylvester(A, matrix2(B), matrix2(C));
    },
    "Matrix, Matrix, Array": function MatrixMatrixArray(A, B, C) {
      return _sylvester(A, B, matrix2(C));
    },
    "Array, Array, Array": function ArrayArrayArray(A, B, C) {
      return _sylvester(matrix2(A), matrix2(B), matrix2(C)).toArray();
    }
  });
  function _sylvester(A, B, C) {
    var n = B.size()[0];
    var m = A.size()[0];
    var sA = schur2(A);
    var F = sA.T;
    var U = sA.U;
    var sB = schur2(multiply2(-1, B));
    var G = sB.T;
    var V = sB.U;
    var D = multiply2(multiply2(transpose2(U), C), V);
    var all = range2(0, m);
    var y = [];
    var hc = (a, b) => concat2(a, b, 1);
    var vc = (a, b) => concat2(a, b, 0);
    for (var k = 0; k < n; k++) {
      if (k < n - 1 && abs2(subset2(G, index2(k + 1, k))) > 1e-5) {
        var RHS = vc(subset2(D, index2(all, k)), subset2(D, index2(all, k + 1)));
        for (var j = 0; j < k; j++) {
          RHS = add2(RHS, vc(multiply2(y[j], subset2(G, index2(j, k))), multiply2(y[j], subset2(G, index2(j, k + 1)))));
        }
        var gkk = multiply2(identity2(m), multiply2(-1, subset2(G, index2(k, k))));
        var gmk = multiply2(identity2(m), multiply2(-1, subset2(G, index2(k + 1, k))));
        var gkm = multiply2(identity2(m), multiply2(-1, subset2(G, index2(k, k + 1))));
        var gmm = multiply2(identity2(m), multiply2(-1, subset2(G, index2(k + 1, k + 1))));
        var LHS = vc(hc(add2(F, gkk), gmk), hc(gkm, add2(F, gmm)));
        var yAux = lusolve2(LHS, RHS);
        y[k] = yAux.subset(index2(range2(0, m), 0));
        y[k + 1] = yAux.subset(index2(range2(m, 2 * m), 0));
        k++;
      } else {
        var _RHS = subset2(D, index2(all, k));
        for (var _j = 0; _j < k; _j++) {
          _RHS = add2(_RHS, multiply2(y[_j], subset2(G, index2(_j, k))));
        }
        var _gkk = subset2(G, index2(k, k));
        var _LHS = subtract2(F, multiply2(_gkk, identity2(m)));
        y[k] = lusolve2(_LHS, _RHS);
      }
    }
    var Y = matrix2(matrixFromColumns2(...y));
    var X = multiply2(U, multiply2(Y, transpose2(V)));
    return X;
  }
});
var name$v = "schur";
var dependencies$v = ["typed", "matrix", "identity", "multiply", "qr", "norm", "subtract"];
var createSchur = /* @__PURE__ */ factory(name$v, dependencies$v, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    identity: identity2,
    multiply: multiply2,
    qr: qr2,
    norm: norm2,
    subtract: subtract2
  } = _ref;
  return typed2(name$v, {
    Array: function Array2(X) {
      var r = _schur(matrix2(X));
      return {
        U: r.U.valueOf(),
        T: r.T.valueOf()
      };
    },
    Matrix: function Matrix2(X) {
      return _schur(X);
    }
  });
  function _schur(X) {
    var n = X.size()[0];
    var A = X;
    var U = identity2(n);
    var k = 0;
    var A0;
    do {
      A0 = A;
      var QR = qr2(A);
      var Q2 = QR.Q;
      var R = QR.R;
      A = multiply2(R, Q2);
      U = multiply2(U, Q2);
      if (k++ > 100) {
        break;
      }
    } while (norm2(subtract2(A, A0)) > 1e-4);
    return {
      U,
      T: A
    };
  }
});
var name$u = "lyap";
var dependencies$u = ["typed", "matrix", "sylvester", "multiply", "transpose"];
var createLyap = /* @__PURE__ */ factory(name$u, dependencies$u, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    sylvester: sylvester2,
    multiply: multiply2,
    transpose: transpose2
  } = _ref;
  return typed2(name$u, {
    "Matrix, Matrix": function MatrixMatrix(A, Q2) {
      return sylvester2(A, transpose2(A), multiply2(-1, Q2));
    },
    "Array, Matrix": function ArrayMatrix(A, Q2) {
      return sylvester2(matrix2(A), transpose2(matrix2(A)), multiply2(-1, Q2));
    },
    "Matrix, Array": function MatrixArray(A, Q2) {
      return sylvester2(A, transpose2(matrix2(A)), matrix2(multiply2(-1, Q2)));
    },
    "Array, Array": function ArrayArray(A, Q2) {
      return sylvester2(matrix2(A), transpose2(matrix2(A)), matrix2(multiply2(-1, Q2))).toArray();
    }
  });
});
var name$t = "divide";
var dependencies$t = ["typed", "matrix", "multiply", "equalScalar", "divideScalar", "inv"];
var createDivide = /* @__PURE__ */ factory(name$t, dependencies$t, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    multiply: multiply2,
    equalScalar: equalScalar2,
    divideScalar: divideScalar2,
    inv: inv2
  } = _ref;
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed: typed2,
    equalScalar: equalScalar2
  });
  var matAlgo14xDs = createMatAlgo14xDs({
    typed: typed2
  });
  return typed2("divide", extend({
    // we extend the signatures of divideScalar with signatures dealing with matrices
    "Array | Matrix, Array | Matrix": function ArrayMatrixArrayMatrix(x, y) {
      return multiply2(x, inv2(y));
    },
    "DenseMatrix, any": function DenseMatrixAny(x, y) {
      return matAlgo14xDs(x, y, divideScalar2, false);
    },
    "SparseMatrix, any": function SparseMatrixAny(x, y) {
      return matAlgo11xS0s(x, y, divideScalar2, false);
    },
    "Array, any": function ArrayAny(x, y) {
      return matAlgo14xDs(matrix2(x), y, divideScalar2, false).valueOf();
    },
    "any, Array | Matrix": function anyArrayMatrix(x, y) {
      return multiply2(x, inv2(y));
    }
  }, divideScalar2.signatures));
});
var name$s = "distance";
var dependencies$s = ["typed", "addScalar", "subtractScalar", "divideScalar", "multiplyScalar", "deepEqual", "sqrt", "abs"];
var createDistance = /* @__PURE__ */ factory(name$s, dependencies$s, (_ref) => {
  var {
    typed: typed2,
    addScalar: addScalar2,
    subtractScalar: subtractScalar2,
    multiplyScalar: multiplyScalar2,
    divideScalar: divideScalar2,
    deepEqual: deepEqual2,
    sqrt: sqrt2,
    abs: abs2
  } = _ref;
  return typed2(name$s, {
    "Array, Array, Array": function ArrayArrayArray(x, y, z) {
      if (x.length === 2 && y.length === 2 && z.length === 2) {
        if (!_2d(x)) {
          throw new TypeError("Array with 2 numbers or BigNumbers expected for first argument");
        }
        if (!_2d(y)) {
          throw new TypeError("Array with 2 numbers or BigNumbers expected for second argument");
        }
        if (!_2d(z)) {
          throw new TypeError("Array with 2 numbers or BigNumbers expected for third argument");
        }
        if (deepEqual2(y, z)) {
          throw new TypeError("LinePoint1 should not be same with LinePoint2");
        }
        var xCoeff = subtractScalar2(z[1], y[1]);
        var yCoeff = subtractScalar2(y[0], z[0]);
        var constant = subtractScalar2(multiplyScalar2(z[0], y[1]), multiplyScalar2(y[0], z[1]));
        return _distancePointLine2D(x[0], x[1], xCoeff, yCoeff, constant);
      } else {
        throw new TypeError("Invalid Arguments: Try again");
      }
    },
    "Object, Object, Object": function ObjectObjectObject(x, y, z) {
      if (Object.keys(x).length === 2 && Object.keys(y).length === 2 && Object.keys(z).length === 2) {
        if (!_2d(x)) {
          throw new TypeError("Values of pointX and pointY should be numbers or BigNumbers");
        }
        if (!_2d(y)) {
          throw new TypeError("Values of lineOnePtX and lineOnePtY should be numbers or BigNumbers");
        }
        if (!_2d(z)) {
          throw new TypeError("Values of lineTwoPtX and lineTwoPtY should be numbers or BigNumbers");
        }
        if (deepEqual2(_objectToArray(y), _objectToArray(z))) {
          throw new TypeError("LinePoint1 should not be same with LinePoint2");
        }
        if ("pointX" in x && "pointY" in x && "lineOnePtX" in y && "lineOnePtY" in y && "lineTwoPtX" in z && "lineTwoPtY" in z) {
          var xCoeff = subtractScalar2(z.lineTwoPtY, y.lineOnePtY);
          var yCoeff = subtractScalar2(y.lineOnePtX, z.lineTwoPtX);
          var constant = subtractScalar2(multiplyScalar2(z.lineTwoPtX, y.lineOnePtY), multiplyScalar2(y.lineOnePtX, z.lineTwoPtY));
          return _distancePointLine2D(x.pointX, x.pointY, xCoeff, yCoeff, constant);
        } else {
          throw new TypeError("Key names do not match");
        }
      } else {
        throw new TypeError("Invalid Arguments: Try again");
      }
    },
    "Array, Array": function ArrayArray(x, y) {
      if (x.length === 2 && y.length === 3) {
        if (!_2d(x)) {
          throw new TypeError("Array with 2 numbers or BigNumbers expected for first argument");
        }
        if (!_3d(y)) {
          throw new TypeError("Array with 3 numbers or BigNumbers expected for second argument");
        }
        return _distancePointLine2D(x[0], x[1], y[0], y[1], y[2]);
      } else if (x.length === 3 && y.length === 6) {
        if (!_3d(x)) {
          throw new TypeError("Array with 3 numbers or BigNumbers expected for first argument");
        }
        if (!_parametricLine(y)) {
          throw new TypeError("Array with 6 numbers or BigNumbers expected for second argument");
        }
        return _distancePointLine3D(x[0], x[1], x[2], y[0], y[1], y[2], y[3], y[4], y[5]);
      } else if (x.length === y.length && x.length > 0) {
        if (!_containsOnlyNumbers(x)) {
          throw new TypeError("All values of an array should be numbers or BigNumbers");
        }
        if (!_containsOnlyNumbers(y)) {
          throw new TypeError("All values of an array should be numbers or BigNumbers");
        }
        return _euclideanDistance(x, y);
      } else {
        throw new TypeError("Invalid Arguments: Try again");
      }
    },
    "Object, Object": function ObjectObject(x, y) {
      if (Object.keys(x).length === 2 && Object.keys(y).length === 3) {
        if (!_2d(x)) {
          throw new TypeError("Values of pointX and pointY should be numbers or BigNumbers");
        }
        if (!_3d(y)) {
          throw new TypeError("Values of xCoeffLine, yCoeffLine and constant should be numbers or BigNumbers");
        }
        if ("pointX" in x && "pointY" in x && "xCoeffLine" in y && "yCoeffLine" in y && "constant" in y) {
          return _distancePointLine2D(x.pointX, x.pointY, y.xCoeffLine, y.yCoeffLine, y.constant);
        } else {
          throw new TypeError("Key names do not match");
        }
      } else if (Object.keys(x).length === 3 && Object.keys(y).length === 6) {
        if (!_3d(x)) {
          throw new TypeError("Values of pointX, pointY and pointZ should be numbers or BigNumbers");
        }
        if (!_parametricLine(y)) {
          throw new TypeError("Values of x0, y0, z0, a, b and c should be numbers or BigNumbers");
        }
        if ("pointX" in x && "pointY" in x && "x0" in y && "y0" in y && "z0" in y && "a" in y && "b" in y && "c" in y) {
          return _distancePointLine3D(x.pointX, x.pointY, x.pointZ, y.x0, y.y0, y.z0, y.a, y.b, y.c);
        } else {
          throw new TypeError("Key names do not match");
        }
      } else if (Object.keys(x).length === 2 && Object.keys(y).length === 2) {
        if (!_2d(x)) {
          throw new TypeError("Values of pointOneX and pointOneY should be numbers or BigNumbers");
        }
        if (!_2d(y)) {
          throw new TypeError("Values of pointTwoX and pointTwoY should be numbers or BigNumbers");
        }
        if ("pointOneX" in x && "pointOneY" in x && "pointTwoX" in y && "pointTwoY" in y) {
          return _euclideanDistance([x.pointOneX, x.pointOneY], [y.pointTwoX, y.pointTwoY]);
        } else {
          throw new TypeError("Key names do not match");
        }
      } else if (Object.keys(x).length === 3 && Object.keys(y).length === 3) {
        if (!_3d(x)) {
          throw new TypeError("Values of pointOneX, pointOneY and pointOneZ should be numbers or BigNumbers");
        }
        if (!_3d(y)) {
          throw new TypeError("Values of pointTwoX, pointTwoY and pointTwoZ should be numbers or BigNumbers");
        }
        if ("pointOneX" in x && "pointOneY" in x && "pointOneZ" in x && "pointTwoX" in y && "pointTwoY" in y && "pointTwoZ" in y) {
          return _euclideanDistance([x.pointOneX, x.pointOneY, x.pointOneZ], [y.pointTwoX, y.pointTwoY, y.pointTwoZ]);
        } else {
          throw new TypeError("Key names do not match");
        }
      } else {
        throw new TypeError("Invalid Arguments: Try again");
      }
    },
    Array: function Array2(arr) {
      if (!_pairwise(arr)) {
        throw new TypeError("Incorrect array format entered for pairwise distance calculation");
      }
      return _distancePairwise(arr);
    }
  });
  function _isNumber(a) {
    return typeof a === "number" || isBigNumber(a);
  }
  function _2d(a) {
    if (a.constructor !== Array) {
      a = _objectToArray(a);
    }
    return _isNumber(a[0]) && _isNumber(a[1]);
  }
  function _3d(a) {
    if (a.constructor !== Array) {
      a = _objectToArray(a);
    }
    return _isNumber(a[0]) && _isNumber(a[1]) && _isNumber(a[2]);
  }
  function _containsOnlyNumbers(a) {
    if (!Array.isArray(a)) {
      a = _objectToArray(a);
    }
    return a.every(_isNumber);
  }
  function _parametricLine(a) {
    if (a.constructor !== Array) {
      a = _objectToArray(a);
    }
    return _isNumber(a[0]) && _isNumber(a[1]) && _isNumber(a[2]) && _isNumber(a[3]) && _isNumber(a[4]) && _isNumber(a[5]);
  }
  function _objectToArray(o) {
    var keys = Object.keys(o);
    var a = [];
    for (var i2 = 0; i2 < keys.length; i2++) {
      a.push(o[keys[i2]]);
    }
    return a;
  }
  function _pairwise(a) {
    if (a[0].length === 2 && _isNumber(a[0][0]) && _isNumber(a[0][1])) {
      if (a.some((aI) => aI.length !== 2 || !_isNumber(aI[0]) || !_isNumber(aI[1]))) {
        return false;
      }
    } else if (a[0].length === 3 && _isNumber(a[0][0]) && _isNumber(a[0][1]) && _isNumber(a[0][2])) {
      if (a.some((aI) => aI.length !== 3 || !_isNumber(aI[0]) || !_isNumber(aI[1]) || !_isNumber(aI[2]))) {
        return false;
      }
    } else {
      return false;
    }
    return true;
  }
  function _distancePointLine2D(x, y, a, b, c) {
    var num = abs2(addScalar2(addScalar2(multiplyScalar2(a, x), multiplyScalar2(b, y)), c));
    var den = sqrt2(addScalar2(multiplyScalar2(a, a), multiplyScalar2(b, b)));
    return divideScalar2(num, den);
  }
  function _distancePointLine3D(x, y, z, x0, y0, z0, a, b, c) {
    var num = [subtractScalar2(multiplyScalar2(subtractScalar2(y0, y), c), multiplyScalar2(subtractScalar2(z0, z), b)), subtractScalar2(multiplyScalar2(subtractScalar2(z0, z), a), multiplyScalar2(subtractScalar2(x0, x), c)), subtractScalar2(multiplyScalar2(subtractScalar2(x0, x), b), multiplyScalar2(subtractScalar2(y0, y), a))];
    num = sqrt2(addScalar2(addScalar2(multiplyScalar2(num[0], num[0]), multiplyScalar2(num[1], num[1])), multiplyScalar2(num[2], num[2])));
    var den = sqrt2(addScalar2(addScalar2(multiplyScalar2(a, a), multiplyScalar2(b, b)), multiplyScalar2(c, c)));
    return divideScalar2(num, den);
  }
  function _euclideanDistance(x, y) {
    var vectorSize = x.length;
    var result = 0;
    var diff2 = 0;
    for (var i2 = 0; i2 < vectorSize; i2++) {
      diff2 = subtractScalar2(x[i2], y[i2]);
      result = addScalar2(multiplyScalar2(diff2, diff2), result);
    }
    return sqrt2(result);
  }
  function _distancePairwise(a) {
    var result = [];
    var pointA = [];
    var pointB = [];
    for (var i2 = 0; i2 < a.length - 1; i2++) {
      for (var j = i2 + 1; j < a.length; j++) {
        if (a[0].length === 2) {
          pointA = [a[i2][0], a[i2][1]];
          pointB = [a[j][0], a[j][1]];
        } else if (a[0].length === 3) {
          pointA = [a[i2][0], a[i2][1], a[i2][2]];
          pointB = [a[j][0], a[j][1], a[j][2]];
        }
        result.push(_euclideanDistance(pointA, pointB));
      }
    }
    return result;
  }
});
var name$r = "intersect";
var dependencies$r = ["typed", "config", "abs", "add", "addScalar", "matrix", "multiply", "multiplyScalar", "divideScalar", "subtract", "smaller", "equalScalar", "flatten", "isZero", "isNumeric"];
var createIntersect = /* @__PURE__ */ factory(name$r, dependencies$r, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    abs: abs2,
    add: add2,
    addScalar: addScalar2,
    matrix: matrix2,
    multiply: multiply2,
    multiplyScalar: multiplyScalar2,
    divideScalar: divideScalar2,
    subtract: subtract2,
    smaller: smaller2,
    equalScalar: equalScalar2,
    flatten: flatten2,
    isZero: isZero2,
    isNumeric: isNumeric2
  } = _ref;
  return typed2("intersect", {
    "Array, Array, Array": _AAA,
    "Array, Array, Array, Array": _AAAA,
    "Matrix, Matrix, Matrix": function MatrixMatrixMatrix(x, y, plane) {
      var arr = _AAA(x.valueOf(), y.valueOf(), plane.valueOf());
      return arr === null ? null : matrix2(arr);
    },
    "Matrix, Matrix, Matrix, Matrix": function MatrixMatrixMatrixMatrix(w, x, y, z) {
      var arr = _AAAA(w.valueOf(), x.valueOf(), y.valueOf(), z.valueOf());
      return arr === null ? null : matrix2(arr);
    }
  });
  function _AAA(x, y, plane) {
    x = _coerceArr(x);
    y = _coerceArr(y);
    plane = _coerceArr(plane);
    if (!_3d(x)) {
      throw new TypeError("Array with 3 numbers or BigNumbers expected for first argument");
    }
    if (!_3d(y)) {
      throw new TypeError("Array with 3 numbers or BigNumbers expected for second argument");
    }
    if (!_4d(plane)) {
      throw new TypeError("Array with 4 numbers expected as third argument");
    }
    return _intersectLinePlane(x[0], x[1], x[2], y[0], y[1], y[2], plane[0], plane[1], plane[2], plane[3]);
  }
  function _AAAA(w, x, y, z) {
    w = _coerceArr(w);
    x = _coerceArr(x);
    y = _coerceArr(y);
    z = _coerceArr(z);
    if (w.length === 2) {
      if (!_2d(w)) {
        throw new TypeError("Array with 2 numbers or BigNumbers expected for first argument");
      }
      if (!_2d(x)) {
        throw new TypeError("Array with 2 numbers or BigNumbers expected for second argument");
      }
      if (!_2d(y)) {
        throw new TypeError("Array with 2 numbers or BigNumbers expected for third argument");
      }
      if (!_2d(z)) {
        throw new TypeError("Array with 2 numbers or BigNumbers expected for fourth argument");
      }
      return _intersect2d(w, x, y, z);
    } else if (w.length === 3) {
      if (!_3d(w)) {
        throw new TypeError("Array with 3 numbers or BigNumbers expected for first argument");
      }
      if (!_3d(x)) {
        throw new TypeError("Array with 3 numbers or BigNumbers expected for second argument");
      }
      if (!_3d(y)) {
        throw new TypeError("Array with 3 numbers or BigNumbers expected for third argument");
      }
      if (!_3d(z)) {
        throw new TypeError("Array with 3 numbers or BigNumbers expected for fourth argument");
      }
      return _intersect3d(w[0], w[1], w[2], x[0], x[1], x[2], y[0], y[1], y[2], z[0], z[1], z[2]);
    } else {
      throw new TypeError("Arrays with two or thee dimensional points expected");
    }
  }
  function _coerceArr(arr) {
    if (arr.length === 1)
      return arr[0];
    if (arr.length > 1 && Array.isArray(arr[0])) {
      if (arr.every((el) => Array.isArray(el) && el.length === 1))
        return flatten2(arr);
    }
    return arr;
  }
  function _2d(x) {
    return x.length === 2 && isNumeric2(x[0]) && isNumeric2(x[1]);
  }
  function _3d(x) {
    return x.length === 3 && isNumeric2(x[0]) && isNumeric2(x[1]) && isNumeric2(x[2]);
  }
  function _4d(x) {
    return x.length === 4 && isNumeric2(x[0]) && isNumeric2(x[1]) && isNumeric2(x[2]) && isNumeric2(x[3]);
  }
  function _intersect2d(p1a, p1b, p2a, p2b) {
    var o1 = p1a;
    var o2 = p2a;
    var d1 = subtract2(o1, p1b);
    var d2 = subtract2(o2, p2b);
    var det2 = subtract2(multiplyScalar2(d1[0], d2[1]), multiplyScalar2(d2[0], d1[1]));
    if (isZero2(det2))
      return null;
    if (smaller2(abs2(det2), config3.epsilon)) {
      return null;
    }
    var d20o11 = multiplyScalar2(d2[0], o1[1]);
    var d21o10 = multiplyScalar2(d2[1], o1[0]);
    var d20o21 = multiplyScalar2(d2[0], o2[1]);
    var d21o20 = multiplyScalar2(d2[1], o2[0]);
    var t = divideScalar2(addScalar2(subtract2(subtract2(d20o11, d21o10), d20o21), d21o20), det2);
    return add2(multiply2(d1, t), o1);
  }
  function _intersect3dHelper(a, b, c, d, e2, f, g, h, i2, j, k, l) {
    var add1 = multiplyScalar2(subtract2(a, b), subtract2(c, d));
    var add22 = multiplyScalar2(subtract2(e2, f), subtract2(g, h));
    var add3 = multiplyScalar2(subtract2(i2, j), subtract2(k, l));
    return addScalar2(addScalar2(add1, add22), add3);
  }
  function _intersect3d(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4) {
    var d1343 = _intersect3dHelper(x1, x3, x4, x3, y1, y3, y4, y3, z1, z3, z4, z3);
    var d4321 = _intersect3dHelper(x4, x3, x2, x1, y4, y3, y2, y1, z4, z3, z2, z1);
    var d1321 = _intersect3dHelper(x1, x3, x2, x1, y1, y3, y2, y1, z1, z3, z2, z1);
    var d4343 = _intersect3dHelper(x4, x3, x4, x3, y4, y3, y4, y3, z4, z3, z4, z3);
    var d2121 = _intersect3dHelper(x2, x1, x2, x1, y2, y1, y2, y1, z2, z1, z2, z1);
    var numerator = subtract2(multiplyScalar2(d1343, d4321), multiplyScalar2(d1321, d4343));
    var denominator = subtract2(multiplyScalar2(d2121, d4343), multiplyScalar2(d4321, d4321));
    if (isZero2(denominator))
      return null;
    var ta = divideScalar2(numerator, denominator);
    var tb = divideScalar2(addScalar2(d1343, multiplyScalar2(ta, d4321)), d4343);
    var pax = addScalar2(x1, multiplyScalar2(ta, subtract2(x2, x1)));
    var pay = addScalar2(y1, multiplyScalar2(ta, subtract2(y2, y1)));
    var paz = addScalar2(z1, multiplyScalar2(ta, subtract2(z2, z1)));
    var pbx = addScalar2(x3, multiplyScalar2(tb, subtract2(x4, x3)));
    var pby = addScalar2(y3, multiplyScalar2(tb, subtract2(y4, y3)));
    var pbz = addScalar2(z3, multiplyScalar2(tb, subtract2(z4, z3)));
    if (equalScalar2(pax, pbx) && equalScalar2(pay, pby) && equalScalar2(paz, pbz)) {
      return [pax, pay, paz];
    } else {
      return null;
    }
  }
  function _intersectLinePlane(x1, y1, z1, x2, y2, z2, x, y, z, c) {
    var x1x = multiplyScalar2(x1, x);
    var x2x = multiplyScalar2(x2, x);
    var y1y = multiplyScalar2(y1, y);
    var y2y = multiplyScalar2(y2, y);
    var z1z = multiplyScalar2(z1, z);
    var z2z = multiplyScalar2(z2, z);
    var numerator = subtract2(subtract2(subtract2(c, x1x), y1y), z1z);
    var denominator = subtract2(subtract2(subtract2(addScalar2(addScalar2(x2x, y2y), z2z), x1x), y1y), z1z);
    var t = divideScalar2(numerator, denominator);
    var px = addScalar2(x1, multiplyScalar2(t, subtract2(x2, x1)));
    var py = addScalar2(y1, multiplyScalar2(t, subtract2(y2, y1)));
    var pz = addScalar2(z1, multiplyScalar2(t, subtract2(z2, z1)));
    return [px, py, pz];
  }
});
var name$q = "sum";
var dependencies$q = ["typed", "config", "add", "numeric"];
var createSum = /* @__PURE__ */ factory(name$q, dependencies$q, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    add: add2,
    numeric: numeric2
  } = _ref;
  return typed2(name$q, {
    // sum([a, b, c, d, ...])
    "Array | Matrix": _sum,
    // sum([a, b, c, d, ...], dim)
    "Array | Matrix, number | BigNumber": _nsumDim,
    // sum(a, b, c, d, ...)
    "...": function _(args) {
      if (containsCollections(args)) {
        throw new TypeError("Scalar values expected in function sum");
      }
      return _sum(args);
    }
  });
  function _sum(array) {
    var sum2;
    deepForEach(array, function(value) {
      try {
        sum2 = sum2 === void 0 ? value : add2(sum2, value);
      } catch (err) {
        throw improveErrorMessage(err, "sum", value);
      }
    });
    if (sum2 === void 0) {
      sum2 = numeric2(0, config3.number);
    }
    if (typeof sum2 === "string") {
      sum2 = numeric2(sum2, config3.number);
    }
    return sum2;
  }
  function _nsumDim(array, dim) {
    try {
      var sum2 = reduce(array, dim, add2);
      return sum2;
    } catch (err) {
      throw improveErrorMessage(err, "sum");
    }
  }
});
var name$p = "cumsum";
var dependencies$p = ["typed", "add", "unaryPlus"];
var createCumSum = /* @__PURE__ */ factory(name$p, dependencies$p, (_ref) => {
  var {
    typed: typed2,
    add: add2,
    unaryPlus: unaryPlus2
  } = _ref;
  return typed2(name$p, {
    // sum([a, b, c, d, ...])
    Array: _cumsum,
    Matrix: function Matrix2(matrix2) {
      return matrix2.create(_cumsum(matrix2.valueOf()));
    },
    // sum([a, b, c, d, ...], dim)
    "Array, number | BigNumber": _ncumSumDim,
    "Matrix, number | BigNumber": function MatrixNumberBigNumber(matrix2, dim) {
      return matrix2.create(_ncumSumDim(matrix2.valueOf(), dim));
    },
    // cumsum(a, b, c, d, ...)
    "...": function _(args) {
      if (containsCollections(args)) {
        throw new TypeError("All values expected to be scalar in function cumsum");
      }
      return _cumsum(args);
    }
  });
  function _cumsum(array) {
    try {
      return _cumsummap(array);
    } catch (err) {
      throw improveErrorMessage(err, name$p);
    }
  }
  function _cumsummap(array) {
    if (array.length === 0) {
      return [];
    }
    var sums = [unaryPlus2(array[0])];
    for (var i2 = 1; i2 < array.length; ++i2) {
      sums.push(add2(sums[i2 - 1], array[i2]));
    }
    return sums;
  }
  function _ncumSumDim(array, dim) {
    var size2 = arraySize(array);
    if (dim < 0 || dim >= size2.length) {
      throw new IndexError(dim, size2.length);
    }
    try {
      return _cumsumDimensional(array, dim);
    } catch (err) {
      throw improveErrorMessage(err, name$p);
    }
  }
  function _cumsumDimensional(mat, dim) {
    var i2, ret, tran;
    if (dim <= 0) {
      var initialValue = mat[0][0];
      if (!Array.isArray(initialValue)) {
        return _cumsummap(mat);
      } else {
        tran = _switch$1(mat);
        ret = [];
        for (i2 = 0; i2 < tran.length; i2++) {
          ret[i2] = _cumsumDimensional(tran[i2], dim - 1);
        }
        return ret;
      }
    } else {
      ret = [];
      for (i2 = 0; i2 < mat.length; i2++) {
        ret[i2] = _cumsumDimensional(mat[i2], dim - 1);
      }
      return ret;
    }
  }
});
var name$o = "mean";
var dependencies$o = ["typed", "add", "divide"];
var createMean = /* @__PURE__ */ factory(name$o, dependencies$o, (_ref) => {
  var {
    typed: typed2,
    add: add2,
    divide: divide2
  } = _ref;
  return typed2(name$o, {
    // mean([a, b, c, d, ...])
    "Array | Matrix": _mean,
    // mean([a, b, c, d, ...], dim)
    "Array | Matrix, number | BigNumber": _nmeanDim,
    // mean(a, b, c, d, ...)
    "...": function _(args) {
      if (containsCollections(args)) {
        throw new TypeError("Scalar values expected in function mean");
      }
      return _mean(args);
    }
  });
  function _nmeanDim(array, dim) {
    try {
      var sum2 = reduce(array, dim, add2);
      var s = Array.isArray(array) ? arraySize(array) : array.size();
      return divide2(sum2, s[dim]);
    } catch (err) {
      throw improveErrorMessage(err, "mean");
    }
  }
  function _mean(array) {
    var sum2;
    var num = 0;
    deepForEach(array, function(value) {
      try {
        sum2 = sum2 === void 0 ? value : add2(sum2, value);
        num++;
      } catch (err) {
        throw improveErrorMessage(err, "mean", value);
      }
    });
    if (num === 0) {
      throw new Error("Cannot calculate the mean of an empty array");
    }
    return divide2(sum2, num);
  }
});
var name$n = "median";
var dependencies$n = ["typed", "add", "divide", "compare", "partitionSelect"];
var createMedian = /* @__PURE__ */ factory(name$n, dependencies$n, (_ref) => {
  var {
    typed: typed2,
    add: add2,
    divide: divide2,
    compare: compare2,
    partitionSelect: partitionSelect2
  } = _ref;
  function _median(array) {
    try {
      array = flatten$1(array.valueOf());
      var num = array.length;
      if (num === 0) {
        throw new Error("Cannot calculate median of an empty array");
      }
      if (num % 2 === 0) {
        var mid = num / 2 - 1;
        var right = partitionSelect2(array, mid + 1);
        var left = array[mid];
        for (var i2 = 0; i2 < mid; ++i2) {
          if (compare2(array[i2], left) > 0) {
            left = array[i2];
          }
        }
        return middle2(left, right);
      } else {
        var m = partitionSelect2(array, (num - 1) / 2);
        return middle(m);
      }
    } catch (err) {
      throw improveErrorMessage(err, "median");
    }
  }
  var middle = typed2({
    "number | BigNumber | Complex | Unit": function numberBigNumberComplexUnit(value) {
      return value;
    }
  });
  var middle2 = typed2({
    "number | BigNumber | Complex | Unit, number | BigNumber | Complex | Unit": function numberBigNumberComplexUnitNumberBigNumberComplexUnit(left, right) {
      return divide2(add2(left, right), 2);
    }
  });
  return typed2(name$n, {
    // median([a, b, c, d, ...])
    "Array | Matrix": _median,
    // median([a, b, c, d, ...], dim)
    "Array | Matrix, number | BigNumber": function ArrayMatrixNumberBigNumber(array, dim) {
      throw new Error("median(A, dim) is not yet supported");
    },
    // median(a, b, c, d, ...)
    "...": function _(args) {
      if (containsCollections(args)) {
        throw new TypeError("Scalar values expected in function median");
      }
      return _median(args);
    }
  });
});
var name$m = "mad";
var dependencies$m = ["typed", "abs", "map", "median", "subtract"];
var createMad = /* @__PURE__ */ factory(name$m, dependencies$m, (_ref) => {
  var {
    typed: typed2,
    abs: abs2,
    map: map2,
    median: median2,
    subtract: subtract2
  } = _ref;
  return typed2(name$m, {
    // mad([a, b, c, d, ...])
    "Array | Matrix": _mad,
    // mad(a, b, c, d, ...)
    "...": function _(args) {
      return _mad(args);
    }
  });
  function _mad(array) {
    array = flatten$1(array.valueOf());
    if (array.length === 0) {
      throw new Error("Cannot calculate median absolute deviation (mad) of an empty array");
    }
    try {
      var med = median2(array);
      return median2(map2(array, function(value) {
        return abs2(subtract2(value, med));
      }));
    } catch (err) {
      if (err instanceof TypeError && err.message.includes("median")) {
        throw new TypeError(err.message.replace("median", "mad"));
      } else {
        throw improveErrorMessage(err, "mad");
      }
    }
  }
});
var DEFAULT_NORMALIZATION = "unbiased";
var name$l = "variance";
var dependencies$l = ["typed", "add", "subtract", "multiply", "divide", "apply", "isNaN"];
var createVariance = /* @__PURE__ */ factory(name$l, dependencies$l, (_ref) => {
  var {
    typed: typed2,
    add: add2,
    subtract: subtract2,
    multiply: multiply2,
    divide: divide2,
    apply: apply2,
    isNaN: isNaN2
  } = _ref;
  return typed2(name$l, {
    // variance([a, b, c, d, ...])
    "Array | Matrix": function ArrayMatrix(array) {
      return _var(array, DEFAULT_NORMALIZATION);
    },
    // variance([a, b, c, d, ...], normalization)
    "Array | Matrix, string": _var,
    // variance([a, b, c, c, ...], dim)
    "Array | Matrix, number | BigNumber": function ArrayMatrixNumberBigNumber(array, dim) {
      return _varDim(array, dim, DEFAULT_NORMALIZATION);
    },
    // variance([a, b, c, c, ...], dim, normalization)
    "Array | Matrix, number | BigNumber, string": _varDim,
    // variance(a, b, c, d, ...)
    "...": function _(args) {
      return _var(args, DEFAULT_NORMALIZATION);
    }
  });
  function _var(array, normalization) {
    var sum2;
    var num = 0;
    if (array.length === 0) {
      throw new SyntaxError("Function variance requires one or more parameters (0 provided)");
    }
    deepForEach(array, function(value) {
      try {
        sum2 = sum2 === void 0 ? value : add2(sum2, value);
        num++;
      } catch (err) {
        throw improveErrorMessage(err, "variance", value);
      }
    });
    if (num === 0)
      throw new Error("Cannot calculate variance of an empty array");
    var mean2 = divide2(sum2, num);
    sum2 = void 0;
    deepForEach(array, function(value) {
      var diff2 = subtract2(value, mean2);
      sum2 = sum2 === void 0 ? multiply2(diff2, diff2) : add2(sum2, multiply2(diff2, diff2));
    });
    if (isNaN2(sum2)) {
      return sum2;
    }
    switch (normalization) {
      case "uncorrected":
        return divide2(sum2, num);
      case "biased":
        return divide2(sum2, num + 1);
      case "unbiased": {
        var zero = isBigNumber(sum2) ? sum2.mul(0) : 0;
        return num === 1 ? zero : divide2(sum2, num - 1);
      }
      default:
        throw new Error('Unknown normalization "' + normalization + '". Choose "unbiased" (default), "uncorrected", or "biased".');
    }
  }
  function _varDim(array, dim, normalization) {
    try {
      if (array.length === 0) {
        throw new SyntaxError("Function variance requires one or more parameters (0 provided)");
      }
      return apply2(array, dim, (x) => _var(x, normalization));
    } catch (err) {
      throw improveErrorMessage(err, "variance");
    }
  }
});
var name$k = "quantileSeq";
var dependencies$k = ["typed", "?bignumber", "add", "subtract", "divide", "multiply", "partitionSelect", "compare", "isInteger", "smaller", "smallerEq", "larger"];
var createQuantileSeq = /* @__PURE__ */ factory(name$k, dependencies$k, (_ref) => {
  var {
    typed: typed2,
    bignumber: bignumber2,
    add: add2,
    subtract: subtract2,
    divide: divide2,
    multiply: multiply2,
    partitionSelect: partitionSelect2,
    compare: compare2,
    isInteger: isInteger2,
    smaller: smaller2,
    smallerEq: smallerEq2,
    larger: larger2
  } = _ref;
  var apply2 = createApply({
    typed: typed2,
    isInteger: isInteger2
  });
  return typed2(name$k, {
    "Array | Matrix, number | BigNumber": (data, p) => _quantileSeqProbNumber(data, p, false),
    "Array | Matrix, number | BigNumber, number": (data, prob, dim) => _quantileSeqDim(data, prob, false, dim, _quantileSeqProbNumber),
    "Array | Matrix, number | BigNumber, boolean": _quantileSeqProbNumber,
    "Array | Matrix, number | BigNumber, boolean, number": (data, prob, sorted, dim) => _quantileSeqDim(data, prob, sorted, dim, _quantileSeqProbNumber),
    "Array | Matrix, Array | Matrix": (data, p) => _quantileSeqProbCollection(data, p, false),
    "Array | Matrix, Array | Matrix, number": (data, prob, dim) => _quantileSeqDim(data, prob, false, dim, _quantileSeqProbCollection),
    "Array | Matrix, Array | Matrix, boolean": _quantileSeqProbCollection,
    "Array | Matrix, Array | Matrix, boolean, number": (data, prob, sorted, dim) => _quantileSeqDim(data, prob, sorted, dim, _quantileSeqProbCollection)
  });
  function _quantileSeqDim(data, prob, sorted, dim, fn) {
    return apply2(data, dim, (x) => fn(x, prob, sorted));
  }
  function _quantileSeqProbNumber(data, probOrN, sorted) {
    var probArr;
    var dataArr = data.valueOf();
    if (smaller2(probOrN, 0)) {
      throw new Error("N/prob must be non-negative");
    }
    if (smallerEq2(probOrN, 1)) {
      return isNumber(probOrN) ? _quantileSeq(dataArr, probOrN, sorted) : bignumber2(_quantileSeq(dataArr, probOrN, sorted));
    }
    if (larger2(probOrN, 1)) {
      if (!isInteger2(probOrN)) {
        throw new Error("N must be a positive integer");
      }
      if (larger2(probOrN, 4294967295)) {
        throw new Error("N must be less than or equal to 2^32-1, as that is the maximum length of an Array");
      }
      var nPlusOne = add2(probOrN, 1);
      probArr = [];
      for (var i2 = 0; smaller2(i2, probOrN); i2++) {
        var prob = divide2(i2 + 1, nPlusOne);
        probArr.push(_quantileSeq(dataArr, prob, sorted));
      }
      return isNumber(probOrN) ? probArr : bignumber2(probArr);
    }
  }
  function _quantileSeqProbCollection(data, probOrN, sorted) {
    var dataArr = data.valueOf();
    var probOrNArr = probOrN.valueOf();
    var probArr = [];
    for (var i2 = 0; i2 < probOrNArr.length; ++i2) {
      probArr.push(_quantileSeq(dataArr, probOrNArr[i2], sorted));
    }
    return probArr;
  }
  function _quantileSeq(array, prob, sorted) {
    var flat = flatten$1(array);
    var len = flat.length;
    if (len === 0) {
      throw new Error("Cannot calculate quantile of an empty sequence");
    }
    var index2 = isNumber(prob) ? prob * (len - 1) : prob.times(len - 1);
    var integerPart = isNumber(prob) ? Math.floor(index2) : index2.floor().toNumber();
    var fracPart = isNumber(prob) ? index2 % 1 : index2.minus(integerPart);
    if (isInteger2(index2)) {
      return sorted ? flat[index2] : partitionSelect2(flat, isNumber(prob) ? index2 : index2.valueOf());
    }
    var left;
    var right;
    if (sorted) {
      left = flat[integerPart];
      right = flat[integerPart + 1];
    } else {
      right = partitionSelect2(flat, integerPart + 1);
      left = flat[integerPart];
      for (var i2 = 0; i2 < integerPart; ++i2) {
        if (compare2(flat[i2], left) > 0) {
          left = flat[i2];
        }
      }
    }
    return add2(multiply2(left, subtract2(1, fracPart)), multiply2(right, fracPart));
  }
});
var name$j = "std";
var dependencies$j = ["typed", "map", "sqrt", "variance"];
var createStd = /* @__PURE__ */ factory(name$j, dependencies$j, (_ref) => {
  var {
    typed: typed2,
    map: map2,
    sqrt: sqrt2,
    variance: variance2
  } = _ref;
  return typed2(name$j, {
    // std([a, b, c, d, ...])
    "Array | Matrix": _std,
    // std([a, b, c, d, ...], normalization)
    "Array | Matrix, string": _std,
    // std([a, b, c, c, ...], dim)
    "Array | Matrix, number | BigNumber": _std,
    // std([a, b, c, c, ...], dim, normalization)
    "Array | Matrix, number | BigNumber, string": _std,
    // std(a, b, c, d, ...)
    "...": function _(args) {
      return _std(args);
    }
  });
  function _std(array, normalization) {
    if (array.length === 0) {
      throw new SyntaxError("Function std requires one or more parameters (0 provided)");
    }
    try {
      var v = variance2.apply(null, arguments);
      if (isCollection(v)) {
        return map2(v, sqrt2);
      } else {
        return sqrt2(v);
      }
    } catch (err) {
      if (err instanceof TypeError && err.message.includes(" variance")) {
        throw new TypeError(err.message.replace(" variance", " std"));
      } else {
        throw err;
      }
    }
  }
});
var name$i = "corr";
var dependencies$i = ["typed", "matrix", "mean", "sqrt", "sum", "add", "subtract", "multiply", "pow", "divide"];
var createCorr = /* @__PURE__ */ factory(name$i, dependencies$i, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    sqrt: sqrt2,
    sum: sum2,
    add: add2,
    subtract: subtract2,
    multiply: multiply2,
    pow: pow2,
    divide: divide2
  } = _ref;
  return typed2(name$i, {
    "Array, Array": function ArrayArray(A, B) {
      return _corr(A, B);
    },
    "Matrix, Matrix": function MatrixMatrix(A, B) {
      var res = _corr(A.toArray(), B.toArray());
      return Array.isArray(res) ? matrix2(res) : res;
    }
  });
  function _corr(A, B) {
    var correlations = [];
    if (Array.isArray(A[0]) && Array.isArray(B[0])) {
      if (A.length !== B.length) {
        throw new SyntaxError("Dimension mismatch. Array A and B must have the same length.");
      }
      for (var i2 = 0; i2 < A.length; i2++) {
        if (A[i2].length !== B[i2].length) {
          throw new SyntaxError("Dimension mismatch. Array A and B must have the same number of elements.");
        }
        correlations.push(correlation(A[i2], B[i2]));
      }
      return correlations;
    } else {
      if (A.length !== B.length) {
        throw new SyntaxError("Dimension mismatch. Array A and B must have the same number of elements.");
      }
      return correlation(A, B);
    }
  }
  function correlation(A, B) {
    var n = A.length;
    var sumX = sum2(A);
    var sumY = sum2(B);
    var sumXY = A.reduce((acc, x, index2) => add2(acc, multiply2(x, B[index2])), 0);
    var sumXSquare = sum2(A.map((x) => pow2(x, 2)));
    var sumYSquare = sum2(B.map((y) => pow2(y, 2)));
    var numerator = subtract2(multiply2(n, sumXY), multiply2(sumX, sumY));
    var denominator = sqrt2(multiply2(subtract2(multiply2(n, sumXSquare), pow2(sumX, 2)), subtract2(multiply2(n, sumYSquare), pow2(sumY, 2))));
    return divide2(numerator, denominator);
  }
});
var name$h = "combinations";
var dependencies$h = ["typed"];
var createCombinations = /* @__PURE__ */ factory(name$h, dependencies$h, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$h, {
    "number, number": combinationsNumber,
    "BigNumber, BigNumber": function BigNumberBigNumber(n, k) {
      var BigNumber2 = n.constructor;
      var result, i2;
      var nMinusk = n.minus(k);
      var one = new BigNumber2(1);
      if (!isPositiveInteger$2(n) || !isPositiveInteger$2(k)) {
        throw new TypeError("Positive integer value expected in function combinations");
      }
      if (k.gt(n)) {
        throw new TypeError("k must be less than n in function combinations");
      }
      result = one;
      if (k.lt(nMinusk)) {
        for (i2 = one; i2.lte(nMinusk); i2 = i2.plus(one)) {
          result = result.times(k.plus(i2)).dividedBy(i2);
        }
      } else {
        for (i2 = one; i2.lte(k); i2 = i2.plus(one)) {
          result = result.times(nMinusk.plus(i2)).dividedBy(i2);
        }
      }
      return result;
    }
    // TODO: implement support for collection in combinations
  });
});
function isPositiveInteger$2(n) {
  return n.isInteger() && n.gte(0);
}
var name$g = "combinationsWithRep";
var dependencies$g = ["typed"];
var createCombinationsWithRep = /* @__PURE__ */ factory(name$g, dependencies$g, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$g, {
    "number, number": function numberNumber(n, k) {
      if (!isInteger$1(n) || n < 0) {
        throw new TypeError("Positive integer value expected in function combinationsWithRep");
      }
      if (!isInteger$1(k) || k < 0) {
        throw new TypeError("Positive integer value expected in function combinationsWithRep");
      }
      if (n < 1) {
        throw new TypeError("k must be less than or equal to n + k - 1");
      }
      if (k < n - 1) {
        var _prodrange = product(n, n + k - 1);
        return _prodrange / product(1, k);
      }
      var prodrange = product(k + 1, n + k - 1);
      return prodrange / product(1, n - 1);
    },
    "BigNumber, BigNumber": function BigNumberBigNumber(n, k) {
      var BigNumber2 = n.constructor;
      var result, i2;
      var one = new BigNumber2(1);
      var nMinusOne = n.minus(one);
      if (!isPositiveInteger$1(n) || !isPositiveInteger$1(k)) {
        throw new TypeError("Positive integer value expected in function combinationsWithRep");
      }
      if (n.lt(one)) {
        throw new TypeError("k must be less than or equal to n + k - 1 in function combinationsWithRep");
      }
      result = one;
      if (k.lt(nMinusOne)) {
        for (i2 = one; i2.lte(nMinusOne); i2 = i2.plus(one)) {
          result = result.times(k.plus(i2)).dividedBy(i2);
        }
      } else {
        for (i2 = one; i2.lte(k); i2 = i2.plus(one)) {
          result = result.times(nMinusOne.plus(i2)).dividedBy(i2);
        }
      }
      return result;
    }
  });
});
function isPositiveInteger$1(n) {
  return n.isInteger() && n.gte(0);
}
var name$f = "gamma";
var dependencies$f = ["typed", "config", "multiplyScalar", "pow", "BigNumber", "Complex"];
var createGamma = /* @__PURE__ */ factory(name$f, dependencies$f, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    multiplyScalar: multiplyScalar2,
    pow: pow2,
    BigNumber: _BigNumber,
    Complex: Complex2
  } = _ref;
  function gammaComplex(n) {
    if (n.im === 0) {
      return gammaNumber(n.re);
    }
    if (n.re < 0.5) {
      var _t = new Complex2(1 - n.re, -n.im);
      var r = new Complex2(Math.PI * n.re, Math.PI * n.im);
      return new Complex2(Math.PI).div(r.sin()).div(gammaComplex(_t));
    }
    n = new Complex2(n.re - 1, n.im);
    var x = new Complex2(gammaP[0], 0);
    for (var i2 = 1; i2 < gammaP.length; ++i2) {
      var gammaPval = new Complex2(gammaP[i2], 0);
      x = x.add(gammaPval.div(n.add(i2)));
    }
    var t = new Complex2(n.re + gammaG + 0.5, n.im);
    var twoPiSqrt = Math.sqrt(2 * Math.PI);
    var tpow = t.pow(n.add(0.5));
    var expt = t.neg().exp();
    return x.mul(twoPiSqrt).mul(tpow).mul(expt);
  }
  return typed2(name$f, {
    number: gammaNumber,
    Complex: gammaComplex,
    BigNumber: function BigNumber2(n) {
      if (n.isInteger()) {
        return n.isNegative() || n.isZero() ? new _BigNumber(Infinity) : bigFactorial(n.minus(1));
      }
      if (!n.isFinite()) {
        return new _BigNumber(n.isNegative() ? NaN : Infinity);
      }
      throw new Error("Integer BigNumber expected");
    }
  });
  function bigFactorial(n) {
    if (n < 8) {
      return new _BigNumber([1, 1, 2, 6, 24, 120, 720, 5040][n]);
    }
    var precision = config3.precision + (Math.log(n.toNumber()) | 0);
    var Big = _BigNumber.clone({
      precision
    });
    if (n % 2 === 1) {
      return n.times(bigFactorial(new _BigNumber(n - 1)));
    }
    var p = n;
    var prod2 = new Big(n);
    var sum2 = n.toNumber();
    while (p > 2) {
      p -= 2;
      sum2 += p;
      prod2 = prod2.times(sum2);
    }
    return new _BigNumber(prod2.toPrecision(_BigNumber.precision));
  }
});
var name$e = "lgamma";
var dependencies$e = ["Complex", "typed"];
var createLgamma = /* @__PURE__ */ factory(name$e, dependencies$e, (_ref) => {
  var {
    Complex: Complex2,
    typed: typed2
  } = _ref;
  var SMALL_RE = 7;
  var SMALL_IM = 7;
  var coeffs = [-0.029550653594771242, 0.00641025641025641, -0.0019175269175269176, 8417508417508417e-19, -5952380952380953e-19, 7936507936507937e-19, -0.002777777777777778, 0.08333333333333333];
  return typed2(name$e, {
    number: lgammaNumber,
    Complex: lgammaComplex,
    BigNumber: function BigNumber2() {
      throw new Error("mathjs doesn't yet provide an implementation of the algorithm lgamma for BigNumber");
    }
  });
  function lgammaComplex(n) {
    var TWOPI = 6.283185307179586;
    var LOGPI = 1.1447298858494002;
    var REFLECTION = 0.1;
    if (n.isNaN()) {
      return new Complex2(NaN, NaN);
    } else if (n.im === 0) {
      return new Complex2(lgammaNumber(n.re), 0);
    } else if (n.re >= SMALL_RE || Math.abs(n.im) >= SMALL_IM) {
      return lgammaStirling(n);
    } else if (n.re <= REFLECTION) {
      var tmp = copysign(TWOPI, n.im) * Math.floor(0.5 * n.re + 0.25);
      var a = n.mul(Math.PI).sin().log();
      var b = lgammaComplex(new Complex2(1 - n.re, -n.im));
      return new Complex2(LOGPI, tmp).sub(a).sub(b);
    } else if (n.im >= 0) {
      return lgammaRecurrence(n);
    } else {
      return lgammaRecurrence(n.conjugate()).conjugate();
    }
  }
  function lgammaStirling(z) {
    var leftPart = z.sub(0.5).mul(z.log()).sub(z).add(lnSqrt2PI);
    var rz = new Complex2(1, 0).div(z);
    var rzz = rz.div(z);
    var a = coeffs[0];
    var b = coeffs[1];
    var r = 2 * rzz.re;
    var s = rzz.re * rzz.re + rzz.im * rzz.im;
    for (var i2 = 2; i2 < 8; i2++) {
      var tmp = b;
      b = -s * a + coeffs[i2];
      a = r * a + tmp;
    }
    var rightPart = rz.mul(rzz.mul(a).add(b));
    return leftPart.add(rightPart);
  }
  function lgammaRecurrence(z) {
    var signflips = 0;
    var sb = 0;
    var shiftprod = z;
    z = z.add(1);
    while (z.re <= SMALL_RE) {
      shiftprod = shiftprod.mul(z);
      var nsb = shiftprod.im < 0 ? 1 : 0;
      if (nsb !== 0 && sb === 0)
        signflips++;
      sb = nsb;
      z = z.add(1);
    }
    return lgammaStirling(z).sub(shiftprod.log()).sub(new Complex2(0, signflips * 2 * Math.PI * 1));
  }
});
var name$d = "factorial";
var dependencies$d = ["typed", "gamma"];
var createFactorial = /* @__PURE__ */ factory(name$d, dependencies$d, (_ref) => {
  var {
    typed: typed2,
    gamma: gamma2
  } = _ref;
  return typed2(name$d, {
    number: function number2(n) {
      if (n < 0) {
        throw new Error("Value must be non-negative");
      }
      return gamma2(n + 1);
    },
    BigNumber: function BigNumber2(n) {
      if (n.isNegative()) {
        throw new Error("Value must be non-negative");
      }
      return gamma2(n.plus(1));
    },
    "Array | Matrix": typed2.referToSelf((self2) => (n) => deepMap(n, self2))
  });
});
var name$c = "kldivergence";
var dependencies$c = ["typed", "matrix", "divide", "sum", "multiply", "map", "dotDivide", "log", "isNumeric"];
var createKldivergence = /* @__PURE__ */ factory(name$c, dependencies$c, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    divide: divide2,
    sum: sum2,
    multiply: multiply2,
    map: map2,
    dotDivide: dotDivide2,
    log: log3,
    isNumeric: isNumeric2
  } = _ref;
  return typed2(name$c, {
    "Array, Array": function ArrayArray(q, p) {
      return _kldiv(matrix2(q), matrix2(p));
    },
    "Matrix, Array": function MatrixArray(q, p) {
      return _kldiv(q, matrix2(p));
    },
    "Array, Matrix": function ArrayMatrix(q, p) {
      return _kldiv(matrix2(q), p);
    },
    "Matrix, Matrix": function MatrixMatrix(q, p) {
      return _kldiv(q, p);
    }
  });
  function _kldiv(q, p) {
    var plength = p.size().length;
    var qlength = q.size().length;
    if (plength > 1) {
      throw new Error("first object must be one dimensional");
    }
    if (qlength > 1) {
      throw new Error("second object must be one dimensional");
    }
    if (plength !== qlength) {
      throw new Error("Length of two vectors must be equal");
    }
    var sumq = sum2(q);
    if (sumq === 0) {
      throw new Error("Sum of elements in first object must be non zero");
    }
    var sump = sum2(p);
    if (sump === 0) {
      throw new Error("Sum of elements in second object must be non zero");
    }
    var qnorm = divide2(q, sum2(q));
    var pnorm = divide2(p, sum2(p));
    var result = sum2(multiply2(qnorm, map2(dotDivide2(qnorm, pnorm), (x) => log3(x))));
    if (isNumeric2(result)) {
      return result;
    } else {
      return Number.NaN;
    }
  }
});
var name$b = "multinomial";
var dependencies$b = ["typed", "add", "divide", "multiply", "factorial", "isInteger", "isPositive"];
var createMultinomial = /* @__PURE__ */ factory(name$b, dependencies$b, (_ref) => {
  var {
    typed: typed2,
    add: add2,
    divide: divide2,
    multiply: multiply2,
    factorial: factorial2,
    isInteger: isInteger2,
    isPositive: isPositive2
  } = _ref;
  return typed2(name$b, {
    "Array | Matrix": function ArrayMatrix(a) {
      var sum2 = 0;
      var denom = 1;
      deepForEach(a, function(ai) {
        if (!isInteger2(ai) || !isPositive2(ai)) {
          throw new TypeError("Positive integer value expected in function multinomial");
        }
        sum2 = add2(sum2, ai);
        denom = multiply2(denom, factorial2(ai));
      });
      return divide2(factorial2(sum2), denom);
    }
  });
});
var name$a = "permutations";
var dependencies$a = ["typed", "factorial"];
var createPermutations = /* @__PURE__ */ factory(name$a, dependencies$a, (_ref) => {
  var {
    typed: typed2,
    factorial: factorial2
  } = _ref;
  return typed2(name$a, {
    "number | BigNumber": factorial2,
    "number, number": function numberNumber(n, k) {
      if (!isInteger$1(n) || n < 0) {
        throw new TypeError("Positive integer value expected in function permutations");
      }
      if (!isInteger$1(k) || k < 0) {
        throw new TypeError("Positive integer value expected in function permutations");
      }
      if (k > n) {
        throw new TypeError("second argument k must be less than or equal to first argument n");
      }
      return product(n - k + 1, n);
    },
    "BigNumber, BigNumber": function BigNumberBigNumber(n, k) {
      var result, i2;
      if (!isPositiveInteger(n) || !isPositiveInteger(k)) {
        throw new TypeError("Positive integer value expected in function permutations");
      }
      if (k.gt(n)) {
        throw new TypeError("second argument k must be less than or equal to first argument n");
      }
      var one = n.mul(0).add(1);
      result = one;
      for (i2 = n.minus(k).plus(1); i2.lte(n); i2 = i2.plus(1)) {
        result = result.times(i2);
      }
      return result;
    }
    // TODO: implement support for collection in permutations
  });
});
function isPositiveInteger(n) {
  return n.isInteger() && n.gte(0);
}
var alea$1 = { exports: {} };
alea$1.exports;
(function(module) {
  (function(global2, module2, define) {
    function Alea(seed) {
      var me = this, mash = Mash();
      me.next = function() {
        var t = 2091639 * me.s0 + me.c * 23283064365386963e-26;
        me.s0 = me.s1;
        me.s1 = me.s2;
        return me.s2 = t - (me.c = t | 0);
      };
      me.c = 1;
      me.s0 = mash(" ");
      me.s1 = mash(" ");
      me.s2 = mash(" ");
      me.s0 -= mash(seed);
      if (me.s0 < 0) {
        me.s0 += 1;
      }
      me.s1 -= mash(seed);
      if (me.s1 < 0) {
        me.s1 += 1;
      }
      me.s2 -= mash(seed);
      if (me.s2 < 0) {
        me.s2 += 1;
      }
      mash = null;
    }
    function copy(f, t) {
      t.c = f.c;
      t.s0 = f.s0;
      t.s1 = f.s1;
      t.s2 = f.s2;
      return t;
    }
    function impl(seed, opts) {
      var xg = new Alea(seed), state = opts && opts.state, prng = xg.next;
      prng.int32 = function() {
        return xg.next() * 4294967296 | 0;
      };
      prng.double = function() {
        return prng() + (prng() * 2097152 | 0) * 11102230246251565e-32;
      };
      prng.quick = prng;
      if (state) {
        if (typeof state == "object")
          copy(state, xg);
        prng.state = function() {
          return copy(xg, {});
        };
      }
      return prng;
    }
    function Mash() {
      var n = 4022871197;
      var mash = function(data) {
        data = String(data);
        for (var i2 = 0; i2 < data.length; i2++) {
          n += data.charCodeAt(i2);
          var h = 0.02519603282416938 * n;
          n = h >>> 0;
          h -= n;
          h *= n;
          n = h >>> 0;
          h -= n;
          n += h * 4294967296;
        }
        return (n >>> 0) * 23283064365386963e-26;
      };
      return mash;
    }
    if (module2 && module2.exports) {
      module2.exports = impl;
    } else {
      this.alea = impl;
    }
  })(
    commonjsGlobal,
    module
  );
})(alea$1);
var aleaExports = alea$1.exports;
var xor128$1 = { exports: {} };
xor128$1.exports;
(function(module) {
  (function(global2, module2, define) {
    function XorGen(seed) {
      var me = this, strseed = "";
      me.x = 0;
      me.y = 0;
      me.z = 0;
      me.w = 0;
      me.next = function() {
        var t = me.x ^ me.x << 11;
        me.x = me.y;
        me.y = me.z;
        me.z = me.w;
        return me.w ^= me.w >>> 19 ^ t ^ t >>> 8;
      };
      if (seed === (seed | 0)) {
        me.x = seed;
      } else {
        strseed += seed;
      }
      for (var k = 0; k < strseed.length + 64; k++) {
        me.x ^= strseed.charCodeAt(k) | 0;
        me.next();
      }
    }
    function copy(f, t) {
      t.x = f.x;
      t.y = f.y;
      t.z = f.z;
      t.w = f.w;
      return t;
    }
    function impl(seed, opts) {
      var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
        return (xg.next() >>> 0) / 4294967296;
      };
      prng.double = function() {
        do {
          var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng.int32 = xg.next;
      prng.quick = prng;
      if (state) {
        if (typeof state == "object")
          copy(state, xg);
        prng.state = function() {
          return copy(xg, {});
        };
      }
      return prng;
    }
    if (module2 && module2.exports) {
      module2.exports = impl;
    } else {
      this.xor128 = impl;
    }
  })(
    commonjsGlobal,
    module
  );
})(xor128$1);
var xor128Exports = xor128$1.exports;
var xorwow$1 = { exports: {} };
xorwow$1.exports;
(function(module) {
  (function(global2, module2, define) {
    function XorGen(seed) {
      var me = this, strseed = "";
      me.next = function() {
        var t = me.x ^ me.x >>> 2;
        me.x = me.y;
        me.y = me.z;
        me.z = me.w;
        me.w = me.v;
        return (me.d = me.d + 362437 | 0) + (me.v = me.v ^ me.v << 4 ^ (t ^ t << 1)) | 0;
      };
      me.x = 0;
      me.y = 0;
      me.z = 0;
      me.w = 0;
      me.v = 0;
      if (seed === (seed | 0)) {
        me.x = seed;
      } else {
        strseed += seed;
      }
      for (var k = 0; k < strseed.length + 64; k++) {
        me.x ^= strseed.charCodeAt(k) | 0;
        if (k == strseed.length) {
          me.d = me.x << 10 ^ me.x >>> 4;
        }
        me.next();
      }
    }
    function copy(f, t) {
      t.x = f.x;
      t.y = f.y;
      t.z = f.z;
      t.w = f.w;
      t.v = f.v;
      t.d = f.d;
      return t;
    }
    function impl(seed, opts) {
      var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
        return (xg.next() >>> 0) / 4294967296;
      };
      prng.double = function() {
        do {
          var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng.int32 = xg.next;
      prng.quick = prng;
      if (state) {
        if (typeof state == "object")
          copy(state, xg);
        prng.state = function() {
          return copy(xg, {});
        };
      }
      return prng;
    }
    if (module2 && module2.exports) {
      module2.exports = impl;
    } else {
      this.xorwow = impl;
    }
  })(
    commonjsGlobal,
    module
  );
})(xorwow$1);
var xorwowExports = xorwow$1.exports;
var xorshift7$1 = { exports: {} };
xorshift7$1.exports;
(function(module) {
  (function(global2, module2, define) {
    function XorGen(seed) {
      var me = this;
      me.next = function() {
        var X = me.x, i2 = me.i, t, v;
        t = X[i2];
        t ^= t >>> 7;
        v = t ^ t << 24;
        t = X[i2 + 1 & 7];
        v ^= t ^ t >>> 10;
        t = X[i2 + 3 & 7];
        v ^= t ^ t >>> 3;
        t = X[i2 + 4 & 7];
        v ^= t ^ t << 7;
        t = X[i2 + 7 & 7];
        t = t ^ t << 13;
        v ^= t ^ t << 9;
        X[i2] = v;
        me.i = i2 + 1 & 7;
        return v;
      };
      function init(me2, seed2) {
        var j, X = [];
        if (seed2 === (seed2 | 0)) {
          X[0] = seed2;
        } else {
          seed2 = "" + seed2;
          for (j = 0; j < seed2.length; ++j) {
            X[j & 7] = X[j & 7] << 15 ^ seed2.charCodeAt(j) + X[j + 1 & 7] << 13;
          }
        }
        while (X.length < 8)
          X.push(0);
        for (j = 0; j < 8 && X[j] === 0; ++j)
          ;
        if (j == 8)
          X[7] = -1;
        else
          X[j];
        me2.x = X;
        me2.i = 0;
        for (j = 256; j > 0; --j) {
          me2.next();
        }
      }
      init(me, seed);
    }
    function copy(f, t) {
      t.x = f.x.slice();
      t.i = f.i;
      return t;
    }
    function impl(seed, opts) {
      if (seed == null)
        seed = +/* @__PURE__ */ new Date();
      var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
        return (xg.next() >>> 0) / 4294967296;
      };
      prng.double = function() {
        do {
          var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng.int32 = xg.next;
      prng.quick = prng;
      if (state) {
        if (state.x)
          copy(state, xg);
        prng.state = function() {
          return copy(xg, {});
        };
      }
      return prng;
    }
    if (module2 && module2.exports) {
      module2.exports = impl;
    } else {
      this.xorshift7 = impl;
    }
  })(
    commonjsGlobal,
    module
  );
})(xorshift7$1);
var xorshift7Exports = xorshift7$1.exports;
var xor4096$1 = { exports: {} };
xor4096$1.exports;
(function(module) {
  (function(global2, module2, define) {
    function XorGen(seed) {
      var me = this;
      me.next = function() {
        var w = me.w, X = me.X, i2 = me.i, t, v;
        me.w = w = w + 1640531527 | 0;
        v = X[i2 + 34 & 127];
        t = X[i2 = i2 + 1 & 127];
        v ^= v << 13;
        t ^= t << 17;
        v ^= v >>> 15;
        t ^= t >>> 12;
        v = X[i2] = v ^ t;
        me.i = i2;
        return v + (w ^ w >>> 16) | 0;
      };
      function init(me2, seed2) {
        var t, v, i2, j, w, X = [], limit = 128;
        if (seed2 === (seed2 | 0)) {
          v = seed2;
          seed2 = null;
        } else {
          seed2 = seed2 + "\0";
          v = 0;
          limit = Math.max(limit, seed2.length);
        }
        for (i2 = 0, j = -32; j < limit; ++j) {
          if (seed2)
            v ^= seed2.charCodeAt((j + 32) % seed2.length);
          if (j === 0)
            w = v;
          v ^= v << 10;
          v ^= v >>> 15;
          v ^= v << 4;
          v ^= v >>> 13;
          if (j >= 0) {
            w = w + 1640531527 | 0;
            t = X[j & 127] ^= v + w;
            i2 = 0 == t ? i2 + 1 : 0;
          }
        }
        if (i2 >= 128) {
          X[(seed2 && seed2.length || 0) & 127] = -1;
        }
        i2 = 127;
        for (j = 4 * 128; j > 0; --j) {
          v = X[i2 + 34 & 127];
          t = X[i2 = i2 + 1 & 127];
          v ^= v << 13;
          t ^= t << 17;
          v ^= v >>> 15;
          t ^= t >>> 12;
          X[i2] = v ^ t;
        }
        me2.w = w;
        me2.X = X;
        me2.i = i2;
      }
      init(me, seed);
    }
    function copy(f, t) {
      t.i = f.i;
      t.w = f.w;
      t.X = f.X.slice();
      return t;
    }
    function impl(seed, opts) {
      if (seed == null)
        seed = +/* @__PURE__ */ new Date();
      var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
        return (xg.next() >>> 0) / 4294967296;
      };
      prng.double = function() {
        do {
          var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng.int32 = xg.next;
      prng.quick = prng;
      if (state) {
        if (state.X)
          copy(state, xg);
        prng.state = function() {
          return copy(xg, {});
        };
      }
      return prng;
    }
    if (module2 && module2.exports) {
      module2.exports = impl;
    } else {
      this.xor4096 = impl;
    }
  })(
    commonjsGlobal,
    // window object or global
    module
  );
})(xor4096$1);
var xor4096Exports = xor4096$1.exports;
var tychei$1 = { exports: {} };
tychei$1.exports;
(function(module) {
  (function(global2, module2, define) {
    function XorGen(seed) {
      var me = this, strseed = "";
      me.next = function() {
        var b = me.b, c = me.c, d = me.d, a = me.a;
        b = b << 25 ^ b >>> 7 ^ c;
        c = c - d | 0;
        d = d << 24 ^ d >>> 8 ^ a;
        a = a - b | 0;
        me.b = b = b << 20 ^ b >>> 12 ^ c;
        me.c = c = c - d | 0;
        me.d = d << 16 ^ c >>> 16 ^ a;
        return me.a = a - b | 0;
      };
      me.a = 0;
      me.b = 0;
      me.c = 2654435769 | 0;
      me.d = 1367130551;
      if (seed === Math.floor(seed)) {
        me.a = seed / 4294967296 | 0;
        me.b = seed | 0;
      } else {
        strseed += seed;
      }
      for (var k = 0; k < strseed.length + 20; k++) {
        me.b ^= strseed.charCodeAt(k) | 0;
        me.next();
      }
    }
    function copy(f, t) {
      t.a = f.a;
      t.b = f.b;
      t.c = f.c;
      t.d = f.d;
      return t;
    }
    function impl(seed, opts) {
      var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
        return (xg.next() >>> 0) / 4294967296;
      };
      prng.double = function() {
        do {
          var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 4294967296, result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng.int32 = xg.next;
      prng.quick = prng;
      if (state) {
        if (typeof state == "object")
          copy(state, xg);
        prng.state = function() {
          return copy(xg, {});
        };
      }
      return prng;
    }
    if (module2 && module2.exports) {
      module2.exports = impl;
    } else {
      this.tychei = impl;
    }
  })(
    commonjsGlobal,
    module
  );
})(tychei$1);
var tycheiExports = tychei$1.exports;
var seedrandom$2 = { exports: {} };
const __viteBrowserExternal = {};
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
(function(module) {
  (function(global2, pool, math) {
    var width = 256, chunks = 6, digits2 = 52, rngname = "random", startdenom = math.pow(width, chunks), significance = math.pow(2, digits2), overflow = significance * 2, mask = width - 1, nodecrypto;
    function seedrandom2(seed, options, callback) {
      var key = [];
      options = options == true ? { entropy: true } : options || {};
      var shortseed = mixkey(flatten2(
        options.entropy ? [seed, tostring(pool)] : seed == null ? autoseed() : seed,
        3
      ), key);
      var arc4 = new ARC4(key);
      var prng = function() {
        var n = arc4.g(chunks), d = startdenom, x = 0;
        while (n < significance) {
          n = (n + x) * width;
          d *= width;
          x = arc4.g(1);
        }
        while (n >= overflow) {
          n /= 2;
          d /= 2;
          x >>>= 1;
        }
        return (n + x) / d;
      };
      prng.int32 = function() {
        return arc4.g(4) | 0;
      };
      prng.quick = function() {
        return arc4.g(4) / 4294967296;
      };
      prng.double = prng;
      mixkey(tostring(arc4.S), pool);
      return (options.pass || callback || function(prng2, seed2, is_math_call, state) {
        if (state) {
          if (state.S) {
            copy(state, arc4);
          }
          prng2.state = function() {
            return copy(arc4, {});
          };
        }
        if (is_math_call) {
          math[rngname] = prng2;
          return seed2;
        } else
          return prng2;
      })(
        prng,
        shortseed,
        "global" in options ? options.global : this == math,
        options.state
      );
    }
    function ARC4(key) {
      var t, keylen = key.length, me = this, i2 = 0, j = me.i = me.j = 0, s = me.S = [];
      if (!keylen) {
        key = [keylen++];
      }
      while (i2 < width) {
        s[i2] = i2++;
      }
      for (i2 = 0; i2 < width; i2++) {
        s[i2] = s[j = mask & j + key[i2 % keylen] + (t = s[i2])];
        s[j] = t;
      }
      (me.g = function(count2) {
        var t2, r = 0, i3 = me.i, j2 = me.j, s2 = me.S;
        while (count2--) {
          t2 = s2[i3 = mask & i3 + 1];
          r = r * width + s2[mask & (s2[i3] = s2[j2 = mask & j2 + t2]) + (s2[j2] = t2)];
        }
        me.i = i3;
        me.j = j2;
        return r;
      })(width);
    }
    function copy(f, t) {
      t.i = f.i;
      t.j = f.j;
      t.S = f.S.slice();
      return t;
    }
    function flatten2(obj, depth) {
      var result = [], typ = typeof obj, prop;
      if (depth && typ == "object") {
        for (prop in obj) {
          try {
            result.push(flatten2(obj[prop], depth - 1));
          } catch (e2) {
          }
        }
      }
      return result.length ? result : typ == "string" ? obj : obj + "\0";
    }
    function mixkey(seed, key) {
      var stringseed = seed + "", smear, j = 0;
      while (j < stringseed.length) {
        key[mask & j] = mask & (smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++);
      }
      return tostring(key);
    }
    function autoseed() {
      try {
        var out;
        if (nodecrypto && (out = nodecrypto.randomBytes)) {
          out = out(width);
        } else {
          out = new Uint8Array(width);
          (global2.crypto || global2.msCrypto).getRandomValues(out);
        }
        return tostring(out);
      } catch (e2) {
        var browser = global2.navigator, plugins = browser && browser.plugins;
        return [+/* @__PURE__ */ new Date(), global2, plugins, global2.screen, tostring(pool)];
      }
    }
    function tostring(a) {
      return String.fromCharCode.apply(0, a);
    }
    mixkey(math.random(), pool);
    if (module.exports) {
      module.exports = seedrandom2;
      try {
        nodecrypto = require$$0;
      } catch (ex) {
      }
    } else {
      math["seed" + rngname] = seedrandom2;
    }
  })(
    // global: `self` in browsers (including strict mode and web workers),
    // otherwise `this` in Node and other environments
    typeof self !== "undefined" ? self : commonjsGlobal,
    [],
    // pool: entropy pool starts empty
    Math
    // math: package containing random, pow, and seedrandom
  );
})(seedrandom$2);
var seedrandomExports = seedrandom$2.exports;
var alea = aleaExports;
var xor128 = xor128Exports;
var xorwow = xorwowExports;
var xorshift7 = xorshift7Exports;
var xor4096 = xor4096Exports;
var tychei = tycheiExports;
var sr = seedrandomExports;
sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;
var seedrandom = sr;
const seedrandom$1 = /* @__PURE__ */ getDefaultExportFromCjs(seedrandom);
var singletonRandom = /* @__PURE__ */ seedrandom$1(Date.now());
function createRng(randomSeed) {
  var random2;
  function setSeed(seed) {
    random2 = seed === null ? singletonRandom : seedrandom$1(String(seed));
  }
  setSeed(randomSeed);
  function rng() {
    return random2();
  }
  return rng;
}
var name$9 = "pickRandom";
var dependencies$9 = ["typed", "config", "?on"];
var createPickRandom = /* @__PURE__ */ factory(name$9, dependencies$9, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    on
  } = _ref;
  var rng = createRng(config3.randomSeed);
  if (on) {
    on("config", function(curr, prev) {
      if (curr.randomSeed !== prev.randomSeed) {
        rng = createRng(curr.randomSeed);
      }
    });
  }
  return typed2(name$9, {
    "Array | Matrix": function ArrayMatrix(possibles) {
      return _pickRandom(possibles, {});
    },
    "Array | Matrix, Object": function ArrayMatrixObject(possibles, options) {
      return _pickRandom(possibles, options);
    },
    "Array | Matrix, number": function ArrayMatrixNumber(possibles, number2) {
      return _pickRandom(possibles, {
        number: number2
      });
    },
    "Array | Matrix, Array | Matrix": function ArrayMatrixArrayMatrix(possibles, weights) {
      return _pickRandom(possibles, {
        weights
      });
    },
    "Array | Matrix, Array | Matrix, number": function ArrayMatrixArrayMatrixNumber(possibles, weights, number2) {
      return _pickRandom(possibles, {
        number: number2,
        weights
      });
    },
    "Array | Matrix, number, Array | Matrix": function ArrayMatrixNumberArrayMatrix(possibles, number2, weights) {
      return _pickRandom(possibles, {
        number: number2,
        weights
      });
    }
  });
  function _pickRandom(possibles, _ref2) {
    var {
      number: number2,
      weights,
      elementWise = true
    } = _ref2;
    var single = typeof number2 === "undefined";
    if (single) {
      number2 = 1;
    }
    var createMatrix2 = isMatrix(possibles) ? possibles.create : isMatrix(weights) ? weights.create : null;
    possibles = possibles.valueOf();
    if (weights) {
      weights = weights.valueOf();
    }
    if (elementWise === true) {
      possibles = flatten$1(possibles);
      weights = flatten$1(weights);
    }
    var totalWeights = 0;
    if (typeof weights !== "undefined") {
      if (weights.length !== possibles.length) {
        throw new Error("Weights must have the same length as possibles");
      }
      for (var i2 = 0, len = weights.length; i2 < len; i2++) {
        if (!isNumber(weights[i2]) || weights[i2] < 0) {
          throw new Error("Weights must be an array of positive numbers");
        }
        totalWeights += weights[i2];
      }
    }
    var length = possibles.length;
    var result = [];
    var pick;
    while (result.length < number2) {
      if (typeof weights === "undefined") {
        pick = possibles[Math.floor(rng() * length)];
      } else {
        var randKey = rng() * totalWeights;
        for (var _i = 0, _len = possibles.length; _i < _len; _i++) {
          randKey -= weights[_i];
          if (randKey < 0) {
            pick = possibles[_i];
            break;
          }
        }
      }
      result.push(pick);
    }
    return single ? result[0] : createMatrix2 ? createMatrix2(result) : result;
  }
});
function randomMatrix(size2, random2) {
  var data = [];
  size2 = size2.slice(0);
  if (size2.length > 1) {
    for (var i2 = 0, length = size2.shift(); i2 < length; i2++) {
      data.push(randomMatrix(size2, random2));
    }
  } else {
    for (var _i = 0, _length = size2.shift(); _i < _length; _i++) {
      data.push(random2());
    }
  }
  return data;
}
var name$8 = "random";
var dependencies$8 = ["typed", "config", "?on"];
var createRandom = /* @__PURE__ */ factory(name$8, dependencies$8, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    on
  } = _ref;
  var rng = createRng(config3.randomSeed);
  if (on) {
    on("config", function(curr, prev) {
      if (curr.randomSeed !== prev.randomSeed) {
        rng = createRng(curr.randomSeed);
      }
    });
  }
  return typed2(name$8, {
    "": () => _random(0, 1),
    number: (max2) => _random(0, max2),
    "number, number": (min2, max2) => _random(min2, max2),
    "Array | Matrix": (size2) => _randomMatrix(size2, 0, 1),
    "Array | Matrix, number": (size2, max2) => _randomMatrix(size2, 0, max2),
    "Array | Matrix, number, number": (size2, min2, max2) => _randomMatrix(size2, min2, max2)
  });
  function _randomMatrix(size2, min2, max2) {
    var res = randomMatrix(size2.valueOf(), () => _random(min2, max2));
    return isMatrix(size2) ? size2.create(res) : res;
  }
  function _random(min2, max2) {
    return min2 + rng() * (max2 - min2);
  }
});
var name$7 = "randomInt";
var dependencies$7 = ["typed", "config", "?on"];
var createRandomInt = /* @__PURE__ */ factory(name$7, dependencies$7, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    on
  } = _ref;
  var rng = createRng(config3.randomSeed);
  if (on) {
    on("config", function(curr, prev) {
      if (curr.randomSeed !== prev.randomSeed) {
        rng = createRng(curr.randomSeed);
      }
    });
  }
  return typed2(name$7, {
    "": () => _randomInt(0, 1),
    number: (max2) => _randomInt(0, max2),
    "number, number": (min2, max2) => _randomInt(min2, max2),
    "Array | Matrix": (size2) => _randomIntMatrix(size2, 0, 1),
    "Array | Matrix, number": (size2, max2) => _randomIntMatrix(size2, 0, max2),
    "Array | Matrix, number, number": (size2, min2, max2) => _randomIntMatrix(size2, min2, max2)
  });
  function _randomIntMatrix(size2, min2, max2) {
    var res = randomMatrix(size2.valueOf(), () => _randomInt(min2, max2));
    return isMatrix(size2) ? size2.create(res) : res;
  }
  function _randomInt(min2, max2) {
    return Math.floor(min2 + rng() * (max2 - min2));
  }
});
var name$6 = "stirlingS2";
var dependencies$6 = ["typed", "addScalar", "subtractScalar", "multiplyScalar", "divideScalar", "pow", "factorial", "combinations", "isNegative", "isInteger", "number", "?bignumber", "larger"];
var createStirlingS2 = /* @__PURE__ */ factory(name$6, dependencies$6, (_ref) => {
  var {
    typed: typed2,
    addScalar: addScalar2,
    subtractScalar: subtractScalar2,
    multiplyScalar: multiplyScalar2,
    divideScalar: divideScalar2,
    pow: pow2,
    factorial: factorial2,
    combinations: combinations2,
    isNegative: isNegative2,
    isInteger: isInteger2,
    number: number2,
    bignumber: bignumber2,
    larger: larger2
  } = _ref;
  var smallCache = [];
  var bigCache = [];
  return typed2(name$6, {
    "number | BigNumber, number | BigNumber": function numberBigNumberNumberBigNumber(n, k) {
      if (!isInteger2(n) || isNegative2(n) || !isInteger2(k) || isNegative2(k)) {
        throw new TypeError("Non-negative integer value expected in function stirlingS2");
      } else if (larger2(k, n)) {
        throw new TypeError("k must be less than or equal to n in function stirlingS2");
      }
      var big = !(isNumber(n) && isNumber(k));
      var cache = big ? bigCache : smallCache;
      var make = big ? bignumber2 : number2;
      var nn = number2(n);
      var nk = number2(k);
      if (cache[nn] && cache[nn].length > nk) {
        return cache[nn][nk];
      }
      for (var m = 0; m <= nn; ++m) {
        if (!cache[m]) {
          cache[m] = [m === 0 ? make(1) : make(0)];
        }
        if (m === 0)
          continue;
        var row2 = cache[m];
        var prev = cache[m - 1];
        for (var i2 = row2.length; i2 <= m && i2 <= nk; ++i2) {
          if (i2 === m) {
            row2[i2] = 1;
          } else {
            row2[i2] = addScalar2(multiplyScalar2(make(i2), prev[i2]), prev[i2 - 1]);
          }
        }
      }
      return cache[nn][nk];
    }
  });
});
var name$5 = "bellNumbers";
var dependencies$5 = ["typed", "addScalar", "isNegative", "isInteger", "stirlingS2"];
var createBellNumbers = /* @__PURE__ */ factory(name$5, dependencies$5, (_ref) => {
  var {
    typed: typed2,
    addScalar: addScalar2,
    isNegative: isNegative2,
    isInteger: isInteger2,
    stirlingS2: stirlingS22
  } = _ref;
  return typed2(name$5, {
    "number | BigNumber": function numberBigNumber(n) {
      if (!isInteger2(n) || isNegative2(n)) {
        throw new TypeError("Non-negative integer value expected in function bellNumbers");
      }
      var result = 0;
      for (var i2 = 0; i2 <= n; i2++) {
        result = addScalar2(result, stirlingS22(n, i2));
      }
      return result;
    }
  });
});
var name$4 = "catalan";
var dependencies$4 = ["typed", "addScalar", "divideScalar", "multiplyScalar", "combinations", "isNegative", "isInteger"];
var createCatalan = /* @__PURE__ */ factory(name$4, dependencies$4, (_ref) => {
  var {
    typed: typed2,
    addScalar: addScalar2,
    divideScalar: divideScalar2,
    multiplyScalar: multiplyScalar2,
    combinations: combinations2,
    isNegative: isNegative2,
    isInteger: isInteger2
  } = _ref;
  return typed2(name$4, {
    "number | BigNumber": function numberBigNumber(n) {
      if (!isInteger2(n) || isNegative2(n)) {
        throw new TypeError("Non-negative integer value expected in function catalan");
      }
      return divideScalar2(combinations2(multiplyScalar2(n, 2), n), addScalar2(n, 1));
    }
  });
});
var name$3 = "composition";
var dependencies$3 = ["typed", "addScalar", "combinations", "isNegative", "isPositive", "isInteger", "larger"];
var createComposition = /* @__PURE__ */ factory(name$3, dependencies$3, (_ref) => {
  var {
    typed: typed2,
    addScalar: addScalar2,
    combinations: combinations2,
    isPositive: isPositive2,
    isNegative: isNegative2,
    isInteger: isInteger2,
    larger: larger2
  } = _ref;
  return typed2(name$3, {
    "number | BigNumber, number | BigNumber": function numberBigNumberNumberBigNumber(n, k) {
      if (!isInteger2(n) || !isPositive2(n) || !isInteger2(k) || !isPositive2(k)) {
        throw new TypeError("Positive integer value expected in function composition");
      } else if (larger2(k, n)) {
        throw new TypeError("k must be less than or equal to n in function composition");
      }
      return combinations2(addScalar2(n, -1), addScalar2(k, -1));
    }
  });
});
var name$2 = "zpk2tf";
var dependencies$2 = ["typed", "add", "multiply", "Complex", "number"];
var createZpk2tf = /* @__PURE__ */ factory(name$2, dependencies$2, (_ref) => {
  var {
    typed: typed2,
    add: add2,
    multiply: multiply2,
    Complex: Complex2,
    number: number2
  } = _ref;
  return typed2(name$2, {
    "Array,Array,number": function ArrayArrayNumber(z, p, k) {
      return _zpk2tf(z, p, k);
    },
    "Array,Array": function ArrayArray(z, p) {
      return _zpk2tf(z, p, 1);
    },
    "Matrix,Matrix,number": function MatrixMatrixNumber(z, p, k) {
      return _zpk2tf(z.valueOf(), p.valueOf(), k);
    },
    "Matrix,Matrix": function MatrixMatrix(z, p) {
      return _zpk2tf(z.valueOf(), p.valueOf(), 1);
    }
  });
  function _zpk2tf(z, p, k) {
    if (z.some((el) => el.type === "BigNumber")) {
      z = z.map((el) => number2(el));
    }
    if (p.some((el) => el.type === "BigNumber")) {
      p = p.map((el) => number2(el));
    }
    var num = [Complex2(1, 0)];
    var den = [Complex2(1, 0)];
    for (var i2 = 0; i2 < z.length; i2++) {
      var zero = z[i2];
      if (typeof zero === "number")
        zero = Complex2(zero, 0);
      num = _multiply(num, [Complex2(1, 0), Complex2(-zero.re, -zero.im)]);
    }
    for (var _i = 0; _i < p.length; _i++) {
      var pole = p[_i];
      if (typeof pole === "number")
        pole = Complex2(pole, 0);
      den = _multiply(den, [Complex2(1, 0), Complex2(-pole.re, -pole.im)]);
    }
    for (var _i2 = 0; _i2 < num.length; _i2++) {
      num[_i2] = multiply2(num[_i2], k);
    }
    return [num, den];
  }
  function _multiply(a, b) {
    var c = [];
    for (var i2 = 0; i2 < a.length + b.length - 1; i2++) {
      c[i2] = Complex2(0, 0);
      for (var j = 0; j < a.length; j++) {
        if (i2 - j >= 0 && i2 - j < b.length) {
          c[i2] = add2(c[i2], multiply2(a[j], b[i2 - j]));
        }
      }
    }
    return c;
  }
});
var name$1 = "freqz";
var dependencies$1 = ["typed", "add", "multiply", "Complex", "divide", "matrix"];
var createFreqz = /* @__PURE__ */ factory(name$1, dependencies$1, (_ref) => {
  var {
    typed: typed2,
    add: add2,
    multiply: multiply2,
    Complex: Complex2,
    divide: divide2,
    matrix: matrix2
  } = _ref;
  return typed2(name$1, {
    "Array, Array": function ArrayArray(b, a) {
      var w = createBins(512);
      return _freqz(b, a, w);
    },
    "Array, Array, Array": function ArrayArrayArray(b, a, w) {
      return _freqz(b, a, w);
    },
    "Array, Array, number": function ArrayArrayNumber(b, a, w) {
      if (w < 0) {
        throw new Error("w must be a positive number");
      }
      var w2 = createBins(w);
      return _freqz(b, a, w2);
    },
    "Matrix, Matrix": function MatrixMatrix(b, a) {
      var _w = createBins(512);
      var {
        w,
        h
      } = _freqz(b.valueOf(), a.valueOf(), _w);
      return {
        w: matrix2(w),
        h: matrix2(h)
      };
    },
    "Matrix, Matrix, Matrix": function MatrixMatrixMatrix(b, a, w) {
      var {
        h
      } = _freqz(b.valueOf(), a.valueOf(), w.valueOf());
      return {
        h: matrix2(h),
        w: matrix2(w)
      };
    },
    "Matrix, Matrix, number": function MatrixMatrixNumber(b, a, w) {
      if (w < 0) {
        throw new Error("w must be a positive number");
      }
      var _w = createBins(w);
      var {
        h
      } = _freqz(b.valueOf(), a.valueOf(), _w);
      return {
        h: matrix2(h),
        w: matrix2(_w)
      };
    }
  });
  function _freqz(b, a, w) {
    var num = [];
    var den = [];
    for (var i2 = 0; i2 < w.length; i2++) {
      var sumNum = Complex2(0, 0);
      var sumDen = Complex2(0, 0);
      for (var j = 0; j < b.length; j++) {
        sumNum = add2(sumNum, multiply2(b[j], Complex2(Math.cos(-j * w[i2]), Math.sin(-j * w[i2]))));
      }
      for (var _j = 0; _j < a.length; _j++) {
        sumDen = add2(sumDen, multiply2(a[_j], Complex2(Math.cos(-_j * w[i2]), Math.sin(-_j * w[i2]))));
      }
      num.push(sumNum);
      den.push(sumDen);
    }
    var h = [];
    for (var _i = 0; _i < num.length; _i++) {
      h.push(divide2(num[_i], den[_i]));
    }
    return {
      h,
      w
    };
  }
  function createBins(n) {
    var bins = [];
    for (var i2 = 0; i2 < n; i2++) {
      bins.push(i2 / n * Math.PI);
    }
    return bins;
  }
});
var name = "replacer";
var dependencies = [];
var createReplacer = /* @__PURE__ */ factory(name, dependencies, () => {
  return function replacer2(key, value) {
    if (typeof value === "number" && (!isFinite(value) || isNaN(value))) {
      return {
        mathjs: "number",
        value: String(value)
      };
    }
    return value;
  };
});
var version$1 = "12.4.3";
var createTrue = /* @__PURE__ */ factory("true", [], () => true);
var createFalse = /* @__PURE__ */ factory("false", [], () => false);
var createNull = /* @__PURE__ */ factory("null", [], () => null);
var createInfinity = /* @__PURE__ */ recreateFactory("Infinity", ["config", "?BigNumber"], (_ref) => {
  var {
    config: config3,
    BigNumber: BigNumber2
  } = _ref;
  return config3.number === "BigNumber" ? new BigNumber2(Infinity) : Infinity;
});
var createNaN = /* @__PURE__ */ recreateFactory("NaN", ["config", "?BigNumber"], (_ref2) => {
  var {
    config: config3,
    BigNumber: BigNumber2
  } = _ref2;
  return config3.number === "BigNumber" ? new BigNumber2(NaN) : NaN;
});
var createPi = /* @__PURE__ */ recreateFactory("pi", ["config", "?BigNumber"], (_ref3) => {
  var {
    config: config3,
    BigNumber: BigNumber2
  } = _ref3;
  return config3.number === "BigNumber" ? createBigNumberPi(BigNumber2) : pi$1;
});
var createTau = /* @__PURE__ */ recreateFactory("tau", ["config", "?BigNumber"], (_ref4) => {
  var {
    config: config3,
    BigNumber: BigNumber2
  } = _ref4;
  return config3.number === "BigNumber" ? createBigNumberTau(BigNumber2) : tau$1;
});
var createE = /* @__PURE__ */ recreateFactory("e", ["config", "?BigNumber"], (_ref5) => {
  var {
    config: config3,
    BigNumber: BigNumber2
  } = _ref5;
  return config3.number === "BigNumber" ? createBigNumberE(BigNumber2) : e$1;
});
var createPhi = /* @__PURE__ */ recreateFactory("phi", ["config", "?BigNumber"], (_ref6) => {
  var {
    config: config3,
    BigNumber: BigNumber2
  } = _ref6;
  return config3.number === "BigNumber" ? createBigNumberPhi(BigNumber2) : phi$1;
});
var createLN2 = /* @__PURE__ */ recreateFactory("LN2", ["config", "?BigNumber"], (_ref7) => {
  var {
    config: config3,
    BigNumber: BigNumber2
  } = _ref7;
  return config3.number === "BigNumber" ? new BigNumber2(2).ln() : Math.LN2;
});
var createLN10 = /* @__PURE__ */ recreateFactory("LN10", ["config", "?BigNumber"], (_ref8) => {
  var {
    config: config3,
    BigNumber: BigNumber2
  } = _ref8;
  return config3.number === "BigNumber" ? new BigNumber2(10).ln() : Math.LN10;
});
var createLOG2E = /* @__PURE__ */ recreateFactory("LOG2E", ["config", "?BigNumber"], (_ref9) => {
  var {
    config: config3,
    BigNumber: BigNumber2
  } = _ref9;
  return config3.number === "BigNumber" ? new BigNumber2(1).div(new BigNumber2(2).ln()) : Math.LOG2E;
});
var createLOG10E = /* @__PURE__ */ recreateFactory("LOG10E", ["config", "?BigNumber"], (_ref10) => {
  var {
    config: config3,
    BigNumber: BigNumber2
  } = _ref10;
  return config3.number === "BigNumber" ? new BigNumber2(1).div(new BigNumber2(10).ln()) : Math.LOG10E;
});
var createSQRT1_2 = /* @__PURE__ */ recreateFactory(
  // eslint-disable-line camelcase
  "SQRT1_2",
  ["config", "?BigNumber"],
  (_ref11) => {
    var {
      config: config3,
      BigNumber: BigNumber2
    } = _ref11;
    return config3.number === "BigNumber" ? new BigNumber2("0.5").sqrt() : Math.SQRT1_2;
  }
);
var createSQRT2 = /* @__PURE__ */ recreateFactory("SQRT2", ["config", "?BigNumber"], (_ref12) => {
  var {
    config: config3,
    BigNumber: BigNumber2
  } = _ref12;
  return config3.number === "BigNumber" ? new BigNumber2(2).sqrt() : Math.SQRT2;
});
var createI = /* @__PURE__ */ recreateFactory("i", ["Complex"], (_ref13) => {
  var {
    Complex: Complex2
  } = _ref13;
  return Complex2.I;
});
var createVersion = /* @__PURE__ */ factory("version", [], () => version$1);
function recreateFactory(name2, dependencies2, create2) {
  return factory(name2, dependencies2, create2, {
    recreateOnConfigChange: true
  });
}
var createSpeedOfLight = /* @__PURE__ */ unitFactory("speedOfLight", "299792458", "m s^-1");
var createGravitationConstant = /* @__PURE__ */ unitFactory("gravitationConstant", "6.67430e-11", "m^3 kg^-1 s^-2");
var createPlanckConstant = /* @__PURE__ */ unitFactory("planckConstant", "6.62607015e-34", "J s");
var createReducedPlanckConstant = /* @__PURE__ */ unitFactory("reducedPlanckConstant", "1.0545718176461565e-34", "J s");
var createMagneticConstant = /* @__PURE__ */ unitFactory("magneticConstant", "1.25663706212e-6", "N A^-2");
var createElectricConstant = /* @__PURE__ */ unitFactory("electricConstant", "8.8541878128e-12", "F m^-1");
var createVacuumImpedance = /* @__PURE__ */ unitFactory("vacuumImpedance", "376.730313667", "ohm");
var createCoulomb = /* @__PURE__ */ unitFactory("coulomb", "8.987551792261171e9", "N m^2 C^-2");
var createElementaryCharge = /* @__PURE__ */ unitFactory("elementaryCharge", "1.602176634e-19", "C");
var createBohrMagneton = /* @__PURE__ */ unitFactory("bohrMagneton", "9.2740100783e-24", "J T^-1");
var createConductanceQuantum = /* @__PURE__ */ unitFactory("conductanceQuantum", "7.748091729863649e-5", "S");
var createInverseConductanceQuantum = /* @__PURE__ */ unitFactory("inverseConductanceQuantum", "12906.403729652257", "ohm");
var createMagneticFluxQuantum = /* @__PURE__ */ unitFactory("magneticFluxQuantum", "2.0678338484619295e-15", "Wb");
var createNuclearMagneton = /* @__PURE__ */ unitFactory("nuclearMagneton", "5.0507837461e-27", "J T^-1");
var createKlitzing = /* @__PURE__ */ unitFactory("klitzing", "25812.807459304513", "ohm");
var createBohrRadius = /* @__PURE__ */ unitFactory("bohrRadius", "5.29177210903e-11", "m");
var createClassicalElectronRadius = /* @__PURE__ */ unitFactory("classicalElectronRadius", "2.8179403262e-15", "m");
var createElectronMass = /* @__PURE__ */ unitFactory("electronMass", "9.1093837015e-31", "kg");
var createFermiCoupling = /* @__PURE__ */ unitFactory("fermiCoupling", "1.1663787e-5", "GeV^-2");
var createFineStructure = numberFactory("fineStructure", 0.0072973525693);
var createHartreeEnergy = /* @__PURE__ */ unitFactory("hartreeEnergy", "4.3597447222071e-18", "J");
var createProtonMass = /* @__PURE__ */ unitFactory("protonMass", "1.67262192369e-27", "kg");
var createDeuteronMass = /* @__PURE__ */ unitFactory("deuteronMass", "3.3435830926e-27", "kg");
var createNeutronMass = /* @__PURE__ */ unitFactory("neutronMass", "1.6749271613e-27", "kg");
var createQuantumOfCirculation = /* @__PURE__ */ unitFactory("quantumOfCirculation", "3.6369475516e-4", "m^2 s^-1");
var createRydberg = /* @__PURE__ */ unitFactory("rydberg", "10973731.568160", "m^-1");
var createThomsonCrossSection = /* @__PURE__ */ unitFactory("thomsonCrossSection", "6.6524587321e-29", "m^2");
var createWeakMixingAngle = numberFactory("weakMixingAngle", 0.2229);
var createEfimovFactor = numberFactory("efimovFactor", 22.7);
var createAtomicMass = /* @__PURE__ */ unitFactory("atomicMass", "1.66053906660e-27", "kg");
var createAvogadro = /* @__PURE__ */ unitFactory("avogadro", "6.02214076e23", "mol^-1");
var createBoltzmann = /* @__PURE__ */ unitFactory("boltzmann", "1.380649e-23", "J K^-1");
var createFaraday = /* @__PURE__ */ unitFactory("faraday", "96485.33212331001", "C mol^-1");
var createFirstRadiation = /* @__PURE__ */ unitFactory("firstRadiation", "3.7417718521927573e-16", "W m^2");
var createLoschmidt = /* @__PURE__ */ unitFactory("loschmidt", "2.686780111798444e25", "m^-3");
var createGasConstant = /* @__PURE__ */ unitFactory("gasConstant", "8.31446261815324", "J K^-1 mol^-1");
var createMolarPlanckConstant = /* @__PURE__ */ unitFactory("molarPlanckConstant", "3.990312712893431e-10", "J s mol^-1");
var createMolarVolume = /* @__PURE__ */ unitFactory("molarVolume", "0.022413969545014137", "m^3 mol^-1");
var createSackurTetrode = numberFactory("sackurTetrode", -1.16487052358);
var createSecondRadiation = /* @__PURE__ */ unitFactory("secondRadiation", "0.014387768775039337", "m K");
var createStefanBoltzmann = /* @__PURE__ */ unitFactory("stefanBoltzmann", "5.67037441918443e-8", "W m^-2 K^-4");
var createWienDisplacement = /* @__PURE__ */ unitFactory("wienDisplacement", "2.897771955e-3", "m K");
var createMolarMass = /* @__PURE__ */ unitFactory("molarMass", "0.99999999965e-3", "kg mol^-1");
var createMolarMassC12 = /* @__PURE__ */ unitFactory("molarMassC12", "11.9999999958e-3", "kg mol^-1");
var createGravity = /* @__PURE__ */ unitFactory("gravity", "9.80665", "m s^-2");
var createPlanckLength = /* @__PURE__ */ unitFactory("planckLength", "1.616255e-35", "m");
var createPlanckMass = /* @__PURE__ */ unitFactory("planckMass", "2.176435e-8", "kg");
var createPlanckTime = /* @__PURE__ */ unitFactory("planckTime", "5.391245e-44", "s");
var createPlanckCharge = /* @__PURE__ */ unitFactory("planckCharge", "1.87554603778e-18", "C");
var createPlanckTemperature = /* @__PURE__ */ unitFactory("planckTemperature", "1.416785e+32", "K");
function unitFactory(name2, valueStr, unitStr) {
  var dependencies2 = ["config", "Unit", "BigNumber"];
  return factory(name2, dependencies2, (_ref) => {
    var {
      config: config3,
      Unit: Unit2,
      BigNumber: BigNumber2
    } = _ref;
    var value = config3.number === "BigNumber" ? new BigNumber2(valueStr) : parseFloat(valueStr);
    var unit2 = new Unit2(value, unitStr);
    unit2.fixPrefix = true;
    return unit2;
  });
}
function numberFactory(name2, value) {
  var dependencies2 = ["config", "BigNumber"];
  return factory(name2, dependencies2, (_ref2) => {
    var {
      config: config3,
      BigNumber: BigNumber2
    } = _ref2;
    return config3.number === "BigNumber" ? new BigNumber2(value) : value;
  });
}
var BigNumber = /* @__PURE__ */ createBigNumberClass({
  config: config$1
});
var Complex = /* @__PURE__ */ createComplexClass({});
var e = /* @__PURE__ */ createE({
  BigNumber,
  config: config$1
});
var _false = /* @__PURE__ */ createFalse({});
var fineStructure = /* @__PURE__ */ createFineStructure({
  BigNumber,
  config: config$1
});
var Fraction = /* @__PURE__ */ createFractionClass({});
var i = /* @__PURE__ */ createI({
  Complex
});
var _Infinity = /* @__PURE__ */ createInfinity({
  BigNumber,
  config: config$1
});
var LN10 = /* @__PURE__ */ createLN10({
  BigNumber,
  config: config$1
});
var LOG10E = /* @__PURE__ */ createLOG10E({
  BigNumber,
  config: config$1
});
var Matrix = /* @__PURE__ */ createMatrixClass({});
var _NaN = /* @__PURE__ */ createNaN({
  BigNumber,
  config: config$1
});
var _null = /* @__PURE__ */ createNull({});
var phi = /* @__PURE__ */ createPhi({
  BigNumber,
  config: config$1
});
var Range = /* @__PURE__ */ createRangeClass({});
var ResultSet = /* @__PURE__ */ createResultSet({});
var SQRT1_2 = /* @__PURE__ */ createSQRT1_2({
  BigNumber,
  config: config$1
});
var sackurTetrode = /* @__PURE__ */ createSackurTetrode({
  BigNumber,
  config: config$1
});
var tau = /* @__PURE__ */ createTau({
  BigNumber,
  config: config$1
});
var _true = /* @__PURE__ */ createTrue({});
var version = /* @__PURE__ */ createVersion({});
var DenseMatrix = /* @__PURE__ */ createDenseMatrixClass({
  Matrix
});
var efimovFactor = /* @__PURE__ */ createEfimovFactor({
  BigNumber,
  config: config$1
});
var LN2 = /* @__PURE__ */ createLN2({
  BigNumber,
  config: config$1
});
var pi = /* @__PURE__ */ createPi({
  BigNumber,
  config: config$1
});
var replacer = /* @__PURE__ */ createReplacer({});
var SQRT2 = /* @__PURE__ */ createSQRT2({
  BigNumber,
  config: config$1
});
var typed = /* @__PURE__ */ createTyped({
  BigNumber,
  Complex,
  DenseMatrix,
  Fraction
});
var unaryPlus = /* @__PURE__ */ createUnaryPlus({
  BigNumber,
  config: config$1,
  typed
});
var weakMixingAngle = /* @__PURE__ */ createWeakMixingAngle({
  BigNumber,
  config: config$1
});
var abs = /* @__PURE__ */ createAbs({
  typed
});
var acos = /* @__PURE__ */ createAcos({
  Complex,
  config: config$1,
  typed
});
var acot = /* @__PURE__ */ createAcot({
  BigNumber,
  typed
});
var acsc = /* @__PURE__ */ createAcsc({
  BigNumber,
  Complex,
  config: config$1,
  typed
});
var addScalar = /* @__PURE__ */ createAddScalar({
  typed
});
var arg = /* @__PURE__ */ createArg({
  typed
});
var asech = /* @__PURE__ */ createAsech({
  BigNumber,
  Complex,
  config: config$1,
  typed
});
var asinh = /* @__PURE__ */ createAsinh({
  typed
});
var atan = /* @__PURE__ */ createAtan({
  typed
});
var atanh = /* @__PURE__ */ createAtanh({
  Complex,
  config: config$1,
  typed
});
var bignumber = /* @__PURE__ */ createBignumber({
  BigNumber,
  typed
});
var bitNot = /* @__PURE__ */ createBitNot({
  typed
});
var boolean = /* @__PURE__ */ createBoolean({
  typed
});
var clone = /* @__PURE__ */ createClone({
  typed
});
var combinations = /* @__PURE__ */ createCombinations({
  typed
});
var complex = /* @__PURE__ */ createComplex({
  Complex,
  typed
});
var conj = /* @__PURE__ */ createConj({
  typed
});
var cos = /* @__PURE__ */ createCos({
  typed
});
var cot = /* @__PURE__ */ createCot({
  BigNumber,
  typed
});
var csc = /* @__PURE__ */ createCsc({
  BigNumber,
  typed
});
var cube = /* @__PURE__ */ createCube({
  typed
});
var equalScalar = /* @__PURE__ */ createEqualScalar({
  config: config$1,
  typed
});
var erf = /* @__PURE__ */ createErf({
  typed
});
var exp = /* @__PURE__ */ createExp({
  typed
});
var expm12 = /* @__PURE__ */ createExpm1({
  Complex,
  typed
});
var filter = /* @__PURE__ */ createFilter({
  typed
});
var forEach = /* @__PURE__ */ createForEach({
  typed
});
var format = /* @__PURE__ */ createFormat({
  typed
});
var getMatrixDataType = /* @__PURE__ */ createGetMatrixDataType({
  typed
});
var hex = /* @__PURE__ */ createHex({
  format,
  typed
});
var im = /* @__PURE__ */ createIm({
  typed
});
var isInteger = /* @__PURE__ */ createIsInteger({
  typed
});
var isNegative = /* @__PURE__ */ createIsNegative({
  typed
});
var isPositive = /* @__PURE__ */ createIsPositive({
  typed
});
var isZero = /* @__PURE__ */ createIsZero({
  typed
});
var LOG2E = /* @__PURE__ */ createLOG2E({
  BigNumber,
  config: config$1
});
var lgamma = /* @__PURE__ */ createLgamma({
  Complex,
  typed
});
var log102 = /* @__PURE__ */ createLog10({
  Complex,
  config: config$1,
  typed
});
var log22 = /* @__PURE__ */ createLog2({
  Complex,
  config: config$1,
  typed
});
var map = /* @__PURE__ */ createMap({
  typed
});
var multiplyScalar = /* @__PURE__ */ createMultiplyScalar({
  typed
});
var not = /* @__PURE__ */ createNot({
  typed
});
var number = /* @__PURE__ */ createNumber({
  typed
});
var oct = /* @__PURE__ */ createOct({
  format,
  typed
});
var pickRandom = /* @__PURE__ */ createPickRandom({
  config: config$1,
  typed
});
var print = /* @__PURE__ */ createPrint({
  typed
});
var random = /* @__PURE__ */ createRandom({
  config: config$1,
  typed
});
var re = /* @__PURE__ */ createRe({
  typed
});
var sec = /* @__PURE__ */ createSec({
  BigNumber,
  typed
});
var sign = /* @__PURE__ */ createSign({
  BigNumber,
  Fraction,
  complex,
  typed
});
var sin = /* @__PURE__ */ createSin({
  typed
});
var SparseMatrix = /* @__PURE__ */ createSparseMatrixClass({
  Matrix,
  equalScalar,
  typed
});
var splitUnit = /* @__PURE__ */ createSplitUnit({
  typed
});
var square = /* @__PURE__ */ createSquare({
  typed
});
var string = /* @__PURE__ */ createString({
  typed
});
var subtractScalar = /* @__PURE__ */ createSubtractScalar({
  typed
});
var tan = /* @__PURE__ */ createTan({
  typed
});
var typeOf = /* @__PURE__ */ createTypeOf({
  typed
});
var acosh = /* @__PURE__ */ createAcosh({
  Complex,
  config: config$1,
  typed
});
var acsch = /* @__PURE__ */ createAcsch({
  BigNumber,
  typed
});
var apply = /* @__PURE__ */ createApply({
  isInteger,
  typed
});
var asec = /* @__PURE__ */ createAsec({
  BigNumber,
  Complex,
  config: config$1,
  typed
});
var bin = /* @__PURE__ */ createBin({
  format,
  typed
});
var combinationsWithRep = /* @__PURE__ */ createCombinationsWithRep({
  typed
});
var cosh = /* @__PURE__ */ createCosh({
  typed
});
var csch = /* @__PURE__ */ createCsch({
  BigNumber,
  typed
});
var isNaN$1 = /* @__PURE__ */ createIsNaN({
  typed
});
var isPrime = /* @__PURE__ */ createIsPrime({
  typed
});
var randomInt = /* @__PURE__ */ createRandomInt({
  config: config$1,
  typed
});
var sech = /* @__PURE__ */ createSech({
  BigNumber,
  typed
});
var sinh = /* @__PURE__ */ createSinh({
  typed
});
var sparse = /* @__PURE__ */ createSparse({
  SparseMatrix,
  typed
});
var sqrt = /* @__PURE__ */ createSqrt({
  Complex,
  config: config$1,
  typed
});
var tanh = /* @__PURE__ */ createTanh({
  typed
});
var unaryMinus = /* @__PURE__ */ createUnaryMinus({
  typed
});
var acoth = /* @__PURE__ */ createAcoth({
  BigNumber,
  Complex,
  config: config$1,
  typed
});
var coth = /* @__PURE__ */ createCoth({
  BigNumber,
  typed
});
var fraction = /* @__PURE__ */ createFraction({
  Fraction,
  typed
});
var isNumeric = /* @__PURE__ */ createIsNumeric({
  typed
});
var matrix = /* @__PURE__ */ createMatrix({
  DenseMatrix,
  Matrix,
  SparseMatrix,
  typed
});
var matrixFromFunction = /* @__PURE__ */ createMatrixFromFunction({
  isZero,
  matrix,
  typed
});
var mode = /* @__PURE__ */ createMode({
  isNaN: isNaN$1,
  isNumeric,
  typed
});
var numeric = /* @__PURE__ */ createNumeric({
  bignumber,
  fraction,
  number
});
var prod = /* @__PURE__ */ createProd({
  config: config$1,
  multiplyScalar,
  numeric,
  typed
});
var reshape = /* @__PURE__ */ createReshape({
  isInteger,
  matrix,
  typed
});
var size = /* @__PURE__ */ createSize({
  matrix,
  config: config$1,
  typed
});
var squeeze = /* @__PURE__ */ createSqueeze({
  matrix,
  typed
});
var transpose = /* @__PURE__ */ createTranspose({
  matrix,
  typed
});
var xgcd = /* @__PURE__ */ createXgcd({
  BigNumber,
  config: config$1,
  matrix,
  typed
});
var zeros = /* @__PURE__ */ createZeros({
  BigNumber,
  config: config$1,
  matrix,
  typed
});
var asin = /* @__PURE__ */ createAsin({
  Complex,
  config: config$1,
  typed
});
var cbrt2 = /* @__PURE__ */ createCbrt({
  BigNumber,
  Complex,
  Fraction,
  config: config$1,
  isNegative,
  matrix,
  typed,
  unaryMinus
});
var concat = /* @__PURE__ */ createConcat({
  isInteger,
  matrix,
  typed
});
var count = /* @__PURE__ */ createCount({
  prod,
  size,
  typed
});
var ctranspose = /* @__PURE__ */ createCtranspose({
  conj,
  transpose,
  typed
});
var diag = /* @__PURE__ */ createDiag({
  DenseMatrix,
  SparseMatrix,
  matrix,
  typed
});
var divideScalar = /* @__PURE__ */ createDivideScalar({
  numeric,
  typed
});
var dotDivide = /* @__PURE__ */ createDotDivide({
  DenseMatrix,
  concat,
  divideScalar,
  equalScalar,
  matrix,
  typed
});
var equal = /* @__PURE__ */ createEqual({
  DenseMatrix,
  concat,
  equalScalar,
  matrix,
  typed
});
var flatten = /* @__PURE__ */ createFlatten({
  matrix,
  typed
});
var hasNumericValue = /* @__PURE__ */ createHasNumericValue({
  isNumeric,
  typed
});
var identity = /* @__PURE__ */ createIdentity({
  BigNumber,
  DenseMatrix,
  SparseMatrix,
  config: config$1,
  matrix,
  typed
});
var kron = /* @__PURE__ */ createKron({
  matrix,
  multiplyScalar,
  typed
});
var largerEq = /* @__PURE__ */ createLargerEq({
  DenseMatrix,
  concat,
  config: config$1,
  matrix,
  typed
});
var leftShift = /* @__PURE__ */ createLeftShift({
  DenseMatrix,
  concat,
  equalScalar,
  matrix,
  typed,
  zeros
});
var lsolve = /* @__PURE__ */ createLsolve({
  DenseMatrix,
  divideScalar,
  equalScalar,
  matrix,
  multiplyScalar,
  subtractScalar,
  typed
});
var matrixFromColumns = /* @__PURE__ */ createMatrixFromColumns({
  flatten,
  matrix,
  size,
  typed
});
var nthRoot = /* @__PURE__ */ createNthRoot({
  BigNumber,
  concat,
  equalScalar,
  matrix,
  typed
});
var ones = /* @__PURE__ */ createOnes({
  BigNumber,
  config: config$1,
  matrix,
  typed
});
var qr = /* @__PURE__ */ createQr({
  addScalar,
  complex,
  conj,
  divideScalar,
  equal,
  identity,
  isZero,
  matrix,
  multiplyScalar,
  sign,
  sqrt,
  subtractScalar,
  typed,
  unaryMinus,
  zeros
});
var resize = /* @__PURE__ */ createResize({
  config: config$1,
  matrix
});
var rightArithShift = /* @__PURE__ */ createRightArithShift({
  DenseMatrix,
  concat,
  equalScalar,
  matrix,
  typed,
  zeros
});
var round = /* @__PURE__ */ createRound({
  BigNumber,
  DenseMatrix,
  config: config$1,
  equalScalar,
  matrix,
  typed,
  zeros
});
var smaller = /* @__PURE__ */ createSmaller({
  DenseMatrix,
  concat,
  config: config$1,
  matrix,
  typed
});
var subtract = /* @__PURE__ */ createSubtract({
  DenseMatrix,
  concat,
  equalScalar,
  matrix,
  subtractScalar,
  typed,
  unaryMinus
});
var to = /* @__PURE__ */ createTo({
  concat,
  matrix,
  typed
});
var unequal = /* @__PURE__ */ createUnequal({
  DenseMatrix,
  concat,
  config: config$1,
  equalScalar,
  matrix,
  typed
});
var usolve = /* @__PURE__ */ createUsolve({
  DenseMatrix,
  divideScalar,
  equalScalar,
  matrix,
  multiplyScalar,
  subtractScalar,
  typed
});
var xor = /* @__PURE__ */ createXor({
  DenseMatrix,
  concat,
  matrix,
  typed
});
var add = /* @__PURE__ */ createAdd({
  DenseMatrix,
  SparseMatrix,
  addScalar,
  concat,
  equalScalar,
  matrix,
  typed
});
var atan2 = /* @__PURE__ */ createAtan2({
  BigNumber,
  DenseMatrix,
  concat,
  equalScalar,
  matrix,
  typed
});
var bitAnd = /* @__PURE__ */ createBitAnd({
  concat,
  equalScalar,
  matrix,
  typed
});
var bitOr = /* @__PURE__ */ createBitOr({
  DenseMatrix,
  concat,
  equalScalar,
  matrix,
  typed
});
var bitXor = /* @__PURE__ */ createBitXor({
  DenseMatrix,
  concat,
  matrix,
  typed
});
var catalan = /* @__PURE__ */ createCatalan({
  addScalar,
  combinations,
  divideScalar,
  isInteger,
  isNegative,
  multiplyScalar,
  typed
});
var compare = /* @__PURE__ */ createCompare({
  BigNumber,
  DenseMatrix,
  Fraction,
  concat,
  config: config$1,
  equalScalar,
  matrix,
  typed
});
var compareText = /* @__PURE__ */ createCompareText({
  concat,
  matrix,
  typed
});
var cumsum = /* @__PURE__ */ createCumSum({
  add,
  typed,
  unaryPlus
});
var deepEqual = /* @__PURE__ */ createDeepEqual({
  equal,
  typed
});
var diff = /* @__PURE__ */ createDiff({
  matrix,
  number,
  subtract,
  typed
});
var distance = /* @__PURE__ */ createDistance({
  abs,
  addScalar,
  deepEqual,
  divideScalar,
  multiplyScalar,
  sqrt,
  subtractScalar,
  typed
});
var dot = /* @__PURE__ */ createDot({
  addScalar,
  conj,
  multiplyScalar,
  size,
  typed
});
var equalText = /* @__PURE__ */ createEqualText({
  compareText,
  isZero,
  typed
});
var floor = /* @__PURE__ */ createFloor({
  DenseMatrix,
  config: config$1,
  equalScalar,
  matrix,
  round,
  typed,
  zeros
});
var gcd = /* @__PURE__ */ createGcd({
  BigNumber,
  DenseMatrix,
  concat,
  config: config$1,
  equalScalar,
  matrix,
  round,
  typed,
  zeros
});
var hypot = /* @__PURE__ */ createHypot({
  abs,
  addScalar,
  divideScalar,
  isPositive,
  multiplyScalar,
  smaller,
  sqrt,
  typed
});
var ImmutableDenseMatrix = /* @__PURE__ */ createImmutableDenseMatrixClass({
  DenseMatrix,
  smaller
});
var Index = /* @__PURE__ */ createIndexClass({
  ImmutableDenseMatrix,
  getMatrixDataType
});
var larger = /* @__PURE__ */ createLarger({
  DenseMatrix,
  concat,
  config: config$1,
  matrix,
  typed
});
var log = /* @__PURE__ */ createLog({
  Complex,
  config: config$1,
  divideScalar,
  typed
});
var lsolveAll = /* @__PURE__ */ createLsolveAll({
  DenseMatrix,
  divideScalar,
  equalScalar,
  matrix,
  multiplyScalar,
  subtractScalar,
  typed
});
var matrixFromRows = /* @__PURE__ */ createMatrixFromRows({
  flatten,
  matrix,
  size,
  typed
});
var min = /* @__PURE__ */ createMin({
  config: config$1,
  numeric,
  smaller,
  typed
});
var mod = /* @__PURE__ */ createMod({
  DenseMatrix,
  concat,
  config: config$1,
  equalScalar,
  matrix,
  round,
  typed,
  zeros
});
var multiply = /* @__PURE__ */ createMultiply({
  addScalar,
  dot,
  equalScalar,
  matrix,
  multiplyScalar,
  typed
});
var nthRoots = /* @__PURE__ */ createNthRoots({
  Complex,
  config: config$1,
  divideScalar,
  typed
});
var or = /* @__PURE__ */ createOr({
  DenseMatrix,
  concat,
  equalScalar,
  matrix,
  typed
});
var partitionSelect = /* @__PURE__ */ createPartitionSelect({
  compare,
  isNaN: isNaN$1,
  isNumeric,
  typed
});
var rightLogShift = /* @__PURE__ */ createRightLogShift({
  DenseMatrix,
  concat,
  equalScalar,
  matrix,
  typed,
  zeros
});
var slu = /* @__PURE__ */ createSlu({
  SparseMatrix,
  abs,
  add,
  divideScalar,
  larger,
  largerEq,
  multiply,
  subtract,
  transpose,
  typed
});
var subset = /* @__PURE__ */ createSubset({
  add,
  matrix,
  typed,
  zeros
});
var sum = /* @__PURE__ */ createSum({
  add,
  config: config$1,
  numeric,
  typed
});
var trace = /* @__PURE__ */ createTrace({
  add,
  matrix,
  typed
});
var usolveAll = /* @__PURE__ */ createUsolveAll({
  DenseMatrix,
  divideScalar,
  equalScalar,
  matrix,
  multiplyScalar,
  subtractScalar,
  typed
});
var zpk2tf = /* @__PURE__ */ createZpk2tf({
  Complex,
  add,
  multiply,
  number,
  typed
});
var ceil = /* @__PURE__ */ createCeil({
  DenseMatrix,
  config: config$1,
  equalScalar,
  matrix,
  round,
  typed,
  zeros
});
var compareNatural = /* @__PURE__ */ createCompareNatural({
  compare,
  typed
});
var composition = /* @__PURE__ */ createComposition({
  addScalar,
  combinations,
  isInteger,
  isNegative,
  isPositive,
  larger,
  typed
});
var cross = /* @__PURE__ */ createCross({
  matrix,
  multiply,
  subtract,
  typed
});
var det = /* @__PURE__ */ createDet({
  divideScalar,
  isZero,
  matrix,
  multiply,
  subtractScalar,
  typed,
  unaryMinus
});
var dotMultiply = /* @__PURE__ */ createDotMultiply({
  concat,
  equalScalar,
  matrix,
  multiplyScalar,
  typed
});
var FibonacciHeap = /* @__PURE__ */ createFibonacciHeapClass({
  larger,
  smaller
});
var fix = /* @__PURE__ */ createFix({
  Complex,
  DenseMatrix,
  ceil,
  equalScalar,
  floor,
  matrix,
  typed,
  zeros
});
var index = /* @__PURE__ */ createIndex({
  Index,
  typed
});
var intersect = /* @__PURE__ */ createIntersect({
  abs,
  add,
  addScalar,
  config: config$1,
  divideScalar,
  equalScalar,
  flatten,
  isNumeric,
  isZero,
  matrix,
  multiply,
  multiplyScalar,
  smaller,
  subtract,
  typed
});
var invmod = /* @__PURE__ */ createInvmod({
  BigNumber,
  add,
  config: config$1,
  equal,
  isInteger,
  mod,
  smaller,
  typed,
  xgcd
});
var lcm = /* @__PURE__ */ createLcm({
  concat,
  equalScalar,
  matrix,
  typed
});
var log1p = /* @__PURE__ */ createLog1p({
  Complex,
  config: config$1,
  divideScalar,
  log,
  typed
});
var max = /* @__PURE__ */ createMax({
  config: config$1,
  larger,
  numeric,
  typed
});
var setCartesian = /* @__PURE__ */ createSetCartesian({
  DenseMatrix,
  Index,
  compareNatural,
  size,
  subset,
  typed
});
var setDistinct = /* @__PURE__ */ createSetDistinct({
  DenseMatrix,
  Index,
  compareNatural,
  size,
  subset,
  typed
});
var setIsSubset = /* @__PURE__ */ createSetIsSubset({
  Index,
  compareNatural,
  size,
  subset,
  typed
});
var setPowerset = /* @__PURE__ */ createSetPowerset({
  Index,
  compareNatural,
  size,
  subset,
  typed
});
var smallerEq = /* @__PURE__ */ createSmallerEq({
  DenseMatrix,
  concat,
  config: config$1,
  matrix,
  typed
});
var sort = /* @__PURE__ */ createSort({
  compare,
  compareNatural,
  matrix,
  typed
});
var and = /* @__PURE__ */ createAnd({
  concat,
  equalScalar,
  matrix,
  not,
  typed,
  zeros
});
var range = /* @__PURE__ */ createRange({
  bignumber,
  matrix,
  add,
  config: config$1,
  isPositive,
  larger,
  largerEq,
  smaller,
  smallerEq,
  typed
});
var row = /* @__PURE__ */ createRow({
  Index,
  matrix,
  range,
  typed
});
var setDifference = /* @__PURE__ */ createSetDifference({
  DenseMatrix,
  Index,
  compareNatural,
  size,
  subset,
  typed
});
var setMultiplicity = /* @__PURE__ */ createSetMultiplicity({
  Index,
  compareNatural,
  size,
  subset,
  typed
});
var setSymDifference = /* @__PURE__ */ createSetSymDifference({
  Index,
  concat,
  setDifference,
  size,
  subset,
  typed
});
var Spa = /* @__PURE__ */ createSpaClass({
  FibonacciHeap,
  addScalar,
  equalScalar
});
var column = /* @__PURE__ */ createColumn({
  Index,
  matrix,
  range,
  typed
});
var inv = /* @__PURE__ */ createInv({
  abs,
  addScalar,
  det,
  divideScalar,
  identity,
  matrix,
  multiply,
  typed,
  unaryMinus
});
var lup = /* @__PURE__ */ createLup({
  DenseMatrix,
  Spa,
  SparseMatrix,
  abs,
  addScalar,
  divideScalar,
  equalScalar,
  larger,
  matrix,
  multiplyScalar,
  subtractScalar,
  typed,
  unaryMinus
});
var pinv = /* @__PURE__ */ createPinv({
  Complex,
  add,
  ctranspose,
  deepEqual,
  divideScalar,
  dot,
  dotDivide,
  equal,
  inv,
  matrix,
  multiply,
  typed
});
var pow = /* @__PURE__ */ createPow({
  Complex,
  config: config$1,
  fraction,
  identity,
  inv,
  matrix,
  multiply,
  number,
  typed
});
var setIntersect = /* @__PURE__ */ createSetIntersect({
  DenseMatrix,
  Index,
  compareNatural,
  size,
  subset,
  typed
});
var setUnion = /* @__PURE__ */ createSetUnion({
  Index,
  concat,
  setIntersect,
  setSymDifference,
  size,
  subset,
  typed
});
var sqrtm = /* @__PURE__ */ createSqrtm({
  abs,
  add,
  identity,
  inv,
  map,
  max,
  multiply,
  size,
  sqrt,
  subtract,
  typed
});
var Unit = /* @__PURE__ */ createUnitClass({
  BigNumber,
  Complex,
  Fraction,
  abs,
  addScalar,
  config: config$1,
  divideScalar,
  equal,
  fix,
  format,
  isNumeric,
  multiplyScalar,
  number,
  pow,
  round,
  subtractScalar
});
var vacuumImpedance = /* @__PURE__ */ createVacuumImpedance({
  BigNumber,
  Unit,
  config: config$1
});
var wienDisplacement = /* @__PURE__ */ createWienDisplacement({
  BigNumber,
  Unit,
  config: config$1
});
var atomicMass = /* @__PURE__ */ createAtomicMass({
  BigNumber,
  Unit,
  config: config$1
});
var bohrMagneton = /* @__PURE__ */ createBohrMagneton({
  BigNumber,
  Unit,
  config: config$1
});
var boltzmann = /* @__PURE__ */ createBoltzmann({
  BigNumber,
  Unit,
  config: config$1
});
var conductanceQuantum = /* @__PURE__ */ createConductanceQuantum({
  BigNumber,
  Unit,
  config: config$1
});
var coulomb = /* @__PURE__ */ createCoulomb({
  BigNumber,
  Unit,
  config: config$1
});
var deuteronMass = /* @__PURE__ */ createDeuteronMass({
  BigNumber,
  Unit,
  config: config$1
});
var dotPow = /* @__PURE__ */ createDotPow({
  DenseMatrix,
  concat,
  equalScalar,
  matrix,
  pow,
  typed
});
var electricConstant = /* @__PURE__ */ createElectricConstant({
  BigNumber,
  Unit,
  config: config$1
});
var elementaryCharge = /* @__PURE__ */ createElementaryCharge({
  BigNumber,
  Unit,
  config: config$1
});
var expm = /* @__PURE__ */ createExpm({
  abs,
  add,
  identity,
  inv,
  multiply,
  typed
});
var faraday = /* @__PURE__ */ createFaraday({
  BigNumber,
  Unit,
  config: config$1
});
var fft = /* @__PURE__ */ createFft({
  addScalar,
  ceil,
  conj,
  divideScalar,
  dotDivide,
  exp,
  i,
  log2: log22,
  matrix,
  multiplyScalar,
  pow,
  tau,
  typed
});
var gamma = /* @__PURE__ */ createGamma({
  BigNumber,
  Complex,
  config: config$1,
  multiplyScalar,
  pow,
  typed
});
var gravitationConstant = /* @__PURE__ */ createGravitationConstant({
  BigNumber,
  Unit,
  config: config$1
});
var hartreeEnergy = /* @__PURE__ */ createHartreeEnergy({
  BigNumber,
  Unit,
  config: config$1
});
var ifft = /* @__PURE__ */ createIfft({
  conj,
  dotDivide,
  fft,
  typed
});
var klitzing = /* @__PURE__ */ createKlitzing({
  BigNumber,
  Unit,
  config: config$1
});
var loschmidt = /* @__PURE__ */ createLoschmidt({
  BigNumber,
  Unit,
  config: config$1
});
var magneticConstant = /* @__PURE__ */ createMagneticConstant({
  BigNumber,
  Unit,
  config: config$1
});
var molarMass = /* @__PURE__ */ createMolarMass({
  BigNumber,
  Unit,
  config: config$1
});
var molarPlanckConstant = /* @__PURE__ */ createMolarPlanckConstant({
  BigNumber,
  Unit,
  config: config$1
});
var neutronMass = /* @__PURE__ */ createNeutronMass({
  BigNumber,
  Unit,
  config: config$1
});
var nuclearMagneton = /* @__PURE__ */ createNuclearMagneton({
  BigNumber,
  Unit,
  config: config$1
});
var planckCharge = /* @__PURE__ */ createPlanckCharge({
  BigNumber,
  Unit,
  config: config$1
});
var planckLength = /* @__PURE__ */ createPlanckLength({
  BigNumber,
  Unit,
  config: config$1
});
var planckTemperature = /* @__PURE__ */ createPlanckTemperature({
  BigNumber,
  Unit,
  config: config$1
});
var protonMass = /* @__PURE__ */ createProtonMass({
  BigNumber,
  Unit,
  config: config$1
});
var quantumOfCirculation = /* @__PURE__ */ createQuantumOfCirculation({
  BigNumber,
  Unit,
  config: config$1
});
var reducedPlanckConstant = /* @__PURE__ */ createReducedPlanckConstant({
  BigNumber,
  Unit,
  config: config$1
});
var rydberg = /* @__PURE__ */ createRydberg({
  BigNumber,
  Unit,
  config: config$1
});
var secondRadiation = /* @__PURE__ */ createSecondRadiation({
  BigNumber,
  Unit,
  config: config$1
});
var speedOfLight = /* @__PURE__ */ createSpeedOfLight({
  BigNumber,
  Unit,
  config: config$1
});
var stefanBoltzmann = /* @__PURE__ */ createStefanBoltzmann({
  BigNumber,
  Unit,
  config: config$1
});
var thomsonCrossSection = /* @__PURE__ */ createThomsonCrossSection({
  BigNumber,
  Unit,
  config: config$1
});
var avogadro = /* @__PURE__ */ createAvogadro({
  BigNumber,
  Unit,
  config: config$1
});
var bohrRadius = /* @__PURE__ */ createBohrRadius({
  BigNumber,
  Unit,
  config: config$1
});
var createUnit = /* @__PURE__ */ createCreateUnit({
  Unit,
  typed
});
var divide = /* @__PURE__ */ createDivide({
  divideScalar,
  equalScalar,
  inv,
  matrix,
  multiply,
  typed
});
var electronMass = /* @__PURE__ */ createElectronMass({
  BigNumber,
  Unit,
  config: config$1
});
var factorial = /* @__PURE__ */ createFactorial({
  gamma,
  typed
});
var firstRadiation = /* @__PURE__ */ createFirstRadiation({
  BigNumber,
  Unit,
  config: config$1
});
var gravity = /* @__PURE__ */ createGravity({
  BigNumber,
  Unit,
  config: config$1
});
var inverseConductanceQuantum = /* @__PURE__ */ createInverseConductanceQuantum({
  BigNumber,
  Unit,
  config: config$1
});
var lusolve = /* @__PURE__ */ createLusolve({
  DenseMatrix,
  lsolve,
  lup,
  matrix,
  slu,
  typed,
  usolve
});
var magneticFluxQuantum = /* @__PURE__ */ createMagneticFluxQuantum({
  BigNumber,
  Unit,
  config: config$1
});
var molarMassC12 = /* @__PURE__ */ createMolarMassC12({
  BigNumber,
  Unit,
  config: config$1
});
var multinomial = /* @__PURE__ */ createMultinomial({
  add,
  divide,
  factorial,
  isInteger,
  isPositive,
  multiply,
  typed
});
var permutations = /* @__PURE__ */ createPermutations({
  factorial,
  typed
});
var planckMass = /* @__PURE__ */ createPlanckMass({
  BigNumber,
  Unit,
  config: config$1
});
var polynomialRoot = /* @__PURE__ */ createPolynomialRoot({
  add,
  cbrt: cbrt2,
  divide,
  equalScalar,
  im,
  isZero,
  multiply,
  re,
  sqrt,
  subtract,
  typeOf,
  typed,
  unaryMinus
});
var setSize = /* @__PURE__ */ createSetSize({
  compareNatural,
  typed
});
var solveODE = /* @__PURE__ */ createSolveODE({
  abs,
  add,
  bignumber,
  divide,
  isNegative,
  isPositive,
  larger,
  map,
  matrix,
  max,
  multiply,
  smaller,
  subtract,
  typed,
  unaryMinus
});
var stirlingS2 = /* @__PURE__ */ createStirlingS2({
  bignumber,
  addScalar,
  combinations,
  divideScalar,
  factorial,
  isInteger,
  isNegative,
  larger,
  multiplyScalar,
  number,
  pow,
  subtractScalar,
  typed
});
var unit = /* @__PURE__ */ createUnitFunction({
  Unit,
  typed
});
var bellNumbers = /* @__PURE__ */ createBellNumbers({
  addScalar,
  isInteger,
  isNegative,
  stirlingS2,
  typed
});
var eigs = /* @__PURE__ */ createEigs({
  abs,
  add,
  addScalar,
  atan,
  bignumber,
  column,
  complex,
  config: config$1,
  cos,
  diag,
  divideScalar,
  dot,
  equal,
  flatten,
  im,
  inv,
  larger,
  matrix,
  matrixFromColumns,
  multiply,
  multiplyScalar,
  number,
  qr,
  re,
  reshape,
  sin,
  size,
  smaller,
  sqrt,
  subtract,
  typed,
  usolve,
  usolveAll
});
var fermiCoupling = /* @__PURE__ */ createFermiCoupling({
  BigNumber,
  Unit,
  config: config$1
});
var gasConstant = /* @__PURE__ */ createGasConstant({
  BigNumber,
  Unit,
  config: config$1
});
var kldivergence = /* @__PURE__ */ createKldivergence({
  divide,
  dotDivide,
  isNumeric,
  log,
  map,
  matrix,
  multiply,
  sum,
  typed
});
var mean = /* @__PURE__ */ createMean({
  add,
  divide,
  typed
});
var molarVolume = /* @__PURE__ */ createMolarVolume({
  BigNumber,
  Unit,
  config: config$1
});
var planckConstant = /* @__PURE__ */ createPlanckConstant({
  BigNumber,
  Unit,
  config: config$1
});
var quantileSeq = /* @__PURE__ */ createQuantileSeq({
  bignumber,
  add,
  compare,
  divide,
  isInteger,
  larger,
  multiply,
  partitionSelect,
  smaller,
  smallerEq,
  subtract,
  typed
});
var variance = /* @__PURE__ */ createVariance({
  add,
  apply,
  divide,
  isNaN: isNaN$1,
  multiply,
  subtract,
  typed
});
var classicalElectronRadius = /* @__PURE__ */ createClassicalElectronRadius({
  BigNumber,
  Unit,
  config: config$1
});
var median = /* @__PURE__ */ createMedian({
  add,
  compare,
  divide,
  partitionSelect,
  typed
});
var corr = /* @__PURE__ */ createCorr({
  add,
  divide,
  matrix,
  mean,
  multiply,
  pow,
  sqrt,
  subtract,
  sum,
  typed
});
var freqz = /* @__PURE__ */ createFreqz({
  Complex,
  add,
  divide,
  matrix,
  multiply,
  typed
});
var mad = /* @__PURE__ */ createMad({
  abs,
  map,
  median,
  subtract,
  typed
});
var std = /* @__PURE__ */ createStd({
  map,
  sqrt,
  typed,
  variance
});
var zeta = /* @__PURE__ */ createZeta({
  BigNumber,
  Complex,
  add,
  config: config$1,
  divide,
  equal,
  factorial,
  gamma,
  isNegative,
  multiply,
  pi,
  pow,
  sin,
  smallerEq,
  subtract,
  typed
});
var norm = /* @__PURE__ */ createNorm({
  abs,
  add,
  conj,
  ctranspose,
  eigs,
  equalScalar,
  larger,
  matrix,
  multiply,
  pow,
  smaller,
  sqrt,
  typed
});
var rotationMatrix = /* @__PURE__ */ createRotationMatrix({
  BigNumber,
  DenseMatrix,
  SparseMatrix,
  addScalar,
  config: config$1,
  cos,
  matrix,
  multiplyScalar,
  norm,
  sin,
  typed,
  unaryMinus
});
var planckTime = /* @__PURE__ */ createPlanckTime({
  BigNumber,
  Unit,
  config: config$1
});
var schur = /* @__PURE__ */ createSchur({
  identity,
  matrix,
  multiply,
  norm,
  qr,
  subtract,
  typed
});
var rotate = /* @__PURE__ */ createRotate({
  multiply,
  rotationMatrix,
  typed
});
var sylvester = /* @__PURE__ */ createSylvester({
  abs,
  add,
  concat,
  identity,
  index,
  lusolve,
  matrix,
  matrixFromColumns,
  multiply,
  range,
  schur,
  subset,
  subtract,
  transpose,
  typed
});
var lyap = /* @__PURE__ */ createLyap({
  matrix,
  multiply,
  sylvester,
  transpose,
  typed
});
export {
  filterRegExp as $,
  isMatrix as A,
  isArray as B,
  isString as C,
  stringify as D,
  isSafeMethod as E,
  isOperatorNode as F,
  getSafeMethod as G,
  isFunctionAssignmentNode as H,
  IndexError as I,
  deepMap as J,
  _extends as K,
  createEmptyMap as L,
  toObject as M,
  isHelp as N,
  ObjectWrappingMap as O,
  PartitionedMap as P,
  clone$3 as Q,
  isChain as R,
  lazy as S,
  noBignumber as T,
  noFraction as U,
  isFraction as V,
  isInteger$1 as W,
  createApply as X,
  isNumber as Y,
  createColumn as Z,
  _defineProperty as _,
  isIndexNode as a,
  acos as a$,
  filter$1 as a0,
  applyCallback as a1,
  isRange as a2,
  isCollection as a3,
  createMax as a4,
  createMean as a5,
  createMin as a6,
  createRange as a7,
  createRow as a8,
  createSubset as a9,
  isZero as aA,
  multiply as aB,
  pow as aC,
  subtract as aD,
  e as aE,
  _false as aF,
  fineStructure as aG,
  i as aH,
  _Infinity as aI,
  LN10 as aJ,
  LOG10E as aK,
  _NaN as aL,
  _null as aM,
  phi as aN,
  SQRT1_2 as aO,
  sackurTetrode as aP,
  tau as aQ,
  _true as aR,
  version as aS,
  efimovFactor as aT,
  LN2 as aU,
  pi as aV,
  replacer as aW,
  SQRT2 as aX,
  unaryPlus as aY,
  weakMixingAngle as aZ,
  abs as a_,
  createConcat as aa,
  createDiff as ab,
  createStd as ac,
  createSum as ad,
  createQuantileSeq as ae,
  createCumSum as af,
  createVariance as ag,
  createPrint as ah,
  printTemplate as ai,
  createAnd as aj,
  createOr as ak,
  createBitAnd as al,
  createBitOr as am,
  ResultSet as an,
  typed as ao,
  size as ap,
  subset as aq,
  matrix as ar,
  Unit as as,
  config$1 as at,
  numeric as au,
  bignumber as av,
  fraction as aw,
  add as ax,
  divide as ay,
  equal as az,
  isAccessorNode as b,
  randomInt as b$,
  acot as b0,
  acsc as b1,
  addScalar as b2,
  arg as b3,
  asech as b4,
  asinh as b5,
  atan as b6,
  atanh as b7,
  bitNot as b8,
  boolean as b9,
  multiplyScalar as bA,
  not as bB,
  number as bC,
  oct as bD,
  pickRandom as bE,
  print as bF,
  random as bG,
  re as bH,
  sec as bI,
  sign as bJ,
  sin as bK,
  splitUnit as bL,
  square as bM,
  string as bN,
  subtractScalar as bO,
  tan as bP,
  typeOf as bQ,
  acosh as bR,
  acsch as bS,
  apply as bT,
  asec as bU,
  bin as bV,
  combinationsWithRep as bW,
  cosh as bX,
  csch as bY,
  isNaN$1 as bZ,
  isPrime as b_,
  clone as ba,
  combinations as bb,
  complex as bc,
  conj as bd,
  cos as be,
  cot as bf,
  csc as bg,
  cube as bh,
  equalScalar as bi,
  erf as bj,
  exp as bk,
  expm12 as bl,
  filter as bm,
  forEach as bn,
  format as bo,
  getMatrixDataType as bp,
  hex as bq,
  im as br,
  isInteger as bs,
  isNegative as bt,
  isPositive as bu,
  LOG2E as bv,
  lgamma as bw,
  log102 as bx,
  log22 as by,
  map as bz,
  createMap$1 as c,
  matrixFromRows as c$,
  sech as c0,
  sinh as c1,
  sparse as c2,
  sqrt as c3,
  tanh as c4,
  unaryMinus as c5,
  acoth as c6,
  coth as c7,
  isNumeric as c8,
  matrixFromFunction as c9,
  resize as cA,
  rightArithShift as cB,
  round as cC,
  smaller as cD,
  to as cE,
  unequal as cF,
  usolve as cG,
  xor as cH,
  atan2 as cI,
  bitAnd as cJ,
  bitOr as cK,
  bitXor as cL,
  catalan as cM,
  compare as cN,
  compareText as cO,
  cumsum as cP,
  deepEqual as cQ,
  diff as cR,
  distance as cS,
  dot as cT,
  equalText as cU,
  floor as cV,
  gcd as cW,
  hypot as cX,
  larger as cY,
  log as cZ,
  lsolveAll as c_,
  mode as ca,
  prod as cb,
  reshape as cc,
  squeeze as cd,
  transpose as ce,
  xgcd as cf,
  zeros as cg,
  asin as ch,
  cbrt2 as ci,
  concat as cj,
  count as ck,
  ctranspose as cl,
  diag as cm,
  divideScalar as cn,
  dotDivide as co,
  flatten as cp,
  hasNumericValue as cq,
  identity as cr,
  kron as cs,
  largerEq as ct,
  leftShift as cu,
  lsolve as cv,
  matrixFromColumns as cw,
  nthRoot as cx,
  ones as cy,
  qr as cz,
  deepStrictEqual as d,
  loschmidt as d$,
  min as d0,
  mod as d1,
  nthRoots as d2,
  or as d3,
  partitionSelect as d4,
  rightLogShift as d5,
  slu as d6,
  sum as d7,
  trace as d8,
  usolveAll as d9,
  setSymDifference as dA,
  column as dB,
  inv as dC,
  lup as dD,
  pinv as dE,
  setIntersect as dF,
  setUnion as dG,
  sqrtm as dH,
  vacuumImpedance as dI,
  wienDisplacement as dJ,
  atomicMass as dK,
  bohrMagneton as dL,
  boltzmann as dM,
  conductanceQuantum as dN,
  coulomb as dO,
  deuteronMass as dP,
  dotPow as dQ,
  electricConstant as dR,
  elementaryCharge as dS,
  expm as dT,
  faraday as dU,
  fft as dV,
  gamma as dW,
  gravitationConstant as dX,
  hartreeEnergy as dY,
  ifft as dZ,
  klitzing as d_,
  zpk2tf as da,
  ceil as db,
  compareNatural as dc,
  composition as dd,
  cross as de,
  det as df,
  dotMultiply as dg,
  fix as dh,
  index as di,
  intersect as dj,
  invmod as dk,
  lcm as dl,
  log1p as dm,
  max as dn,
  setCartesian as dp,
  setDistinct as dq,
  setIsSubset as dr,
  setPowerset as ds,
  smallerEq as dt,
  sort as du,
  and as dv,
  range as dw,
  row as dx,
  setDifference as dy,
  setMultiplicity as dz,
  isArrayNode as e,
  Fraction as e$,
  magneticConstant as e0,
  molarMass as e1,
  molarPlanckConstant as e2,
  neutronMass as e3,
  nuclearMagneton as e4,
  planckCharge as e5,
  planckLength as e6,
  planckTemperature as e7,
  protonMass as e8,
  quantumOfCirculation as e9,
  eigs as eA,
  fermiCoupling as eB,
  gasConstant as eC,
  kldivergence as eD,
  mean as eE,
  molarVolume as eF,
  planckConstant as eG,
  quantileSeq as eH,
  variance as eI,
  classicalElectronRadius as eJ,
  median as eK,
  corr as eL,
  freqz as eM,
  mad as eN,
  std as eO,
  zeta as eP,
  norm as eQ,
  rotationMatrix as eR,
  planckTime as eS,
  schur as eT,
  rotate as eU,
  sylvester as eV,
  lyap as eW,
  DenseMatrix as eX,
  Index as eY,
  BigNumber as eZ,
  Complex as e_,
  reducedPlanckConstant as ea,
  rydberg as eb,
  secondRadiation as ec,
  speedOfLight as ed,
  stefanBoltzmann as ee,
  thomsonCrossSection as ef,
  avogadro as eg,
  bohrRadius as eh,
  createUnit as ei,
  electronMass as ej,
  factorial as ek,
  firstRadiation as el,
  gravity as em,
  inverseConductanceQuantum as en,
  lusolve as eo,
  magneticFluxQuantum as ep,
  molarMassC12 as eq,
  multinomial as er,
  permutations as es,
  planckMass as et,
  polynomialRoot as eu,
  setSize as ev,
  solveODE as ew,
  stirlingS2 as ex,
  unit as ey,
  bellNumbers as ez,
  factory as f,
  Matrix as f0,
  Range as f1,
  SparseMatrix as f2,
  ImmutableDenseMatrix as f3,
  FibonacciHeap as f4,
  Spa as f5,
  getSafeProperty as g,
  isConstantNode as h,
  isNode as i,
  isFunctionNode as j,
  isObjectNode as k,
  isParenthesisNode as l,
  isSymbolNode as m,
  map$1 as n,
  hasOwnProperty as o,
  forEach$1 as p,
  isBigNumber as q,
  rule2Node as r,
  setSafeProperty as s,
  isComplex as t,
  isUnit as u,
  typeOf$1 as v,
  getDefaultExportFromCjs as w,
  format$1 as x,
  join as y,
  escape as z
};
