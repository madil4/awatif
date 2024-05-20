import { a as getDefaultExportFromCjs } from "./_commonjsHelpers-Dm6U3U_N.js";
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
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
function typeOf(x) {
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
function clone$2(x) {
  var type = typeof x;
  if (type === "number" || type === "string" || type === "boolean" || x === null || x === void 0) {
    return x;
  }
  if (typeof x.clone === "function") {
    return x.clone();
  }
  if (Array.isArray(x)) {
    return x.map(function(value) {
      return clone$2(value);
    });
  }
  if (x instanceof Date)
    return new Date(x.valueOf());
  if (isBigNumber(x))
    return x;
  if (isObject(x)) {
    return mapObject(x, clone$2);
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
  var prop, i, len;
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (i = 0, len = a.length; i < len; i++) {
      if (!deepStrictEqual(a[i], b[i])) {
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
function hasOwnProperty(object, property) {
  return object && Object.hasOwnProperty.call(object, property);
}
function pickShallow(object, properties) {
  var copy = {};
  for (var i = 0; i < properties.length; i++) {
    var key = properties[i];
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
    for (let i = 0; i < types.length; ++i) {
      if (!types[i] || typeof types[i].name !== "string" || typeof types[i].test !== "function") {
        throw new TypeError("Object with properties {name: string, test: function} expected");
      }
      const typeName = types[i].name;
      if (typeMap.has(typeName)) {
        throw new TypeError('Duplicate type name "' + typeName + '"');
      }
      newTypes.push(typeName);
      typeMap.set(typeName, {
        name: typeName,
        test: types[i].test,
        isAny: types[i].isAny,
        index: beforeIndex + i,
        conversionsTo: []
        // Newly added type can't have any conversions to it
      });
    }
    const affectedTypes = typeList.slice(beforeIndex);
    typeList = typeList.slice(0, beforeIndex).concat(newTypes).concat(affectedTypes);
    for (let i = beforeIndex + newTypes.length; i < typeList.length; ++i) {
      typeMap.get(typeList[i]).index = i;
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
    for (let i = 0; i < nParams; ++i) {
      const want = params[i];
      const filteredSignatures = [];
      let possibility;
      for (possibility of remainingSignatures) {
        const have = getParamAtIndex(possibility.params, i);
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
    for (let i = 0; i < conversions.length; i++) {
      const fromType = findType(conversions[i].from);
      if (fromType.test(value)) {
        return conversions[i].convert(value);
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
    for (let i = 0; i < rawParams.length; ++i) {
      const parsedParam = parseParam(rawParams[i].trim());
      if (parsedParam.restParam && i !== rawParams.length - 1) {
        throw new SyntaxError('Unexpected rest parameter "' + rawParams[i] + '": only allowed for the last parameter');
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
      return function or(x) {
        return test0(x) || test1(x);
      };
    } else {
      const tests = param.types.map(function(type) {
        return findType(type.name).test;
      });
      return function or(x) {
        for (let i = 0; i < tests.length; i++) {
          if (tests[i](x)) {
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
        for (let i = varIndex; i < args.length; i++) {
          if (!lastTest(args[i])) {
            return false;
          }
        }
        return true;
      };
      return function testArgs(args) {
        for (let i = 0; i < tests.length; i++) {
          if (!tests[i](args[i])) {
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
          for (let i = 0; i < tests.length; i++) {
            if (!tests[i](args[i])) {
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
    for (let i = 0; i < args.length; ++i) {
      argTypes.push(findTypeNames(args[i]).join("|"));
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
    for (let i = 0; i < param.types.length; i++) {
      if (isExactType(param.types[i])) {
        min2 = Math.min(min2, param.types[i].typeIndex);
      }
    }
    return min2;
  }
  function getLowestConversionIndex(param) {
    let min2 = nConversions + 1;
    for (let i = 0; i < param.types.length; i++) {
      if (!isExactType(param.types[i])) {
        min2 = Math.min(min2, param.types[i].conversionIndex);
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
    for (let i = 0; i < pars1.length; ++i) {
      const thisComparison = compareParams(pars1[i], pars2[i]);
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
    for (let i = 1; i < types.length; ++i) {
      let newMatch;
      for (newMatch of types[i].conversionsTo) {
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
        for (let i = 0; i < last2; i++) {
          args[i] = compiledConversions[i](arguments[i]);
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
        return function convertArg(arg) {
          return arg;
        };
      case 1:
        test0 = tests[0];
        conversion0 = conversions[0];
        return function convertArg(arg) {
          if (test0(arg)) {
            return conversion0(arg);
          }
          return arg;
        };
      case 2:
        test0 = tests[0];
        test1 = tests[1];
        conversion0 = conversions[0];
        conversion1 = conversions[1];
        return function convertArg(arg) {
          if (test0(arg)) {
            return conversion0(arg);
          }
          if (test1(arg)) {
            return conversion1(arg);
          }
          return arg;
        };
      default:
        return function convertArg(arg) {
          for (let i = 0; i < conversions.length; i++) {
            if (tests[i](arg)) {
              return conversions[i](arg);
            }
          }
          return arg;
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
    for (let i = 0; i < ii; i++) {
      const typeSet1 = getTypeSetAtIndex(params1, i);
      const typeSet2 = getTypeSetAtIndex(params2, i);
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
  function resolveReferences(functionList, signatureMap, self) {
    const resolvedFunctions = clearResolutions(functionList);
    const isResolved = new Array(resolvedFunctions.length).fill(false);
    let leftUnresolved = true;
    while (leftUnresolved) {
      leftUnresolved = false;
      let nothingResolved = true;
      for (let i = 0; i < resolvedFunctions.length; ++i) {
        if (isResolved[i])
          continue;
        const fn = resolvedFunctions[i];
        if (isReferToSelf(fn)) {
          resolvedFunctions[i] = fn.referToSelf.callback(self);
          resolvedFunctions[i].referToSelf = fn.referToSelf;
          isResolved[i] = true;
          nothingResolved = false;
        } else if (isReferTo(fn)) {
          const resolvedReferences = collectResolutions(fn.referTo.references, resolvedFunctions, signatureMap);
          if (resolvedReferences) {
            resolvedFunctions[i] = fn.referTo.callback.apply(this, resolvedReferences);
            resolvedFunctions[i].referTo = fn.referTo;
            isResolved[i] = true;
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
    for (let i = 0; i < signatures.length; ++i) {
      signatures[i].test = compileTests(signatures[i].params);
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
    for (let i = 0; i < signatures.length; ++i) {
      signatures[i].implementation = compileArgsPreprocessing(signatures[i].params, signatures[i].fn);
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
      for (let i = iStart; i < iEnd; i++) {
        if (tests[i](arguments)) {
          return fns[i].apply(this, arguments);
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
    for (let i = 0; i < arr.length; i++) {
      if (test(arr[i])) {
        return arr[i];
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
    for (let i = start; i < arguments.length; ++i) {
      const item = arguments[i];
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
        const err = new TypeError("Argument to 'typed' at index " + i + " is not a (typed) function, nor an object with signatures as keys and functions as values.");
        err.data = {
          index: i,
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
    _validateConversion(conversion);
    const to = findType(conversion.to);
    if (to.conversionsTo.every(function(other) {
      return other.from !== conversion.from;
    })) {
      to.conversionsTo.push({
        from: conversion.from,
        convert: conversion.convert,
        index: nConversions++
      });
    } else {
      throw new Error('There is already a conversion from "' + conversion.from + '" to "' + to.name + '"');
    }
  };
  typed2.addConversions = function(conversions) {
    conversions.forEach(typed2.addConversion);
  };
  typed2.removeConversion = function(conversion) {
    _validateConversion(conversion);
    const to = findType(conversion.to);
    const existingConversion = findInArray(to.conversionsTo, (c) => c.from === conversion.from);
    if (!existingConversion) {
      throw new Error("Attempt to remove nonexistent conversion from " + conversion.from + " to " + conversion.to);
    }
    if (existingConversion.convert !== conversion.convert) {
      throw new Error("Conversion to remove does not match existing conversion");
    }
    const index2 = to.conversionsTo.indexOf(existingConversion);
    to.conversionsTo.splice(index2, 1);
  };
  typed2.resolve = function(tf, argList) {
    if (!isTypedFunction(tf)) {
      throw new TypeError(NOT_TYPED_FUNCTION);
    }
    const sigs = tf._typedFunctionData.signatures;
    for (let i = 0; i < sigs.length; ++i) {
      if (sigs[i].test(argList)) {
        return sigs[i];
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
function format$2(value, options) {
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
        var e = arguments[4];
        return digits2 !== "." ? digits2 + e : e;
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
  var e = rounded.exponent;
  var c = rounded.coefficients;
  var newExp = e % 3 === 0 ? e : e < 0 ? e - 3 - e % 3 : e - e % 3;
  if (isNumber(precision)) {
    while (precision > c.length || e - newExp + 1 > c.length) {
      c.push(0);
    }
  } else {
    var missingZeros = Math.abs(e - newExp) - (c.length - 1);
    for (var i = 0; i < missingZeros; i++) {
      c.push(0);
    }
  }
  var expDiff = Math.abs(e - newExp);
  var decimalIdx = 1;
  while (expDiff > 0) {
    decimalIdx++;
    expDiff--;
  }
  var decimals = c.slice(decimalIdx).join("");
  var decimalVal = isNumber(precision) && decimals.length || decimals.match(/[1-9]/) ? "." + decimals : "";
  var str = c.slice(0, decimalIdx).join("") + decimalVal + "e" + (e >= 0 ? "+" : "") + newExp.toString();
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
  var e = rounded.exponent;
  if (c.length < precision) {
    c = c.concat(zeros$1(precision - c.length));
  }
  var first = c.shift();
  return rounded.sign + first + (c.length > 0 ? "." + c.join("") : "") + "e" + (e >= 0 ? "+" : "") + e;
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
    var e = rounded.exponent;
    if (c.length < precision) {
      c = c.concat(zeros$1(precision - c.length));
    }
    c = c.concat(zeros$1(e - c.length + 1 + (c.length < precision ? precision - c.length : 0)));
    c = zeros$1(-e).concat(c);
    var dot2 = e > 0 ? e : 0;
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
      var i = precision - 1;
      c[i]++;
      while (c[i] === 10) {
        c.pop();
        if (i === 0) {
          c.unshift(0);
          rounded.exponent++;
          i++;
        }
        i--;
        c[i]++;
      }
    }
  }
  return rounded;
}
function zeros$1(length) {
  var arr = [];
  for (var i = 0; i < length; i++) {
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
    var diff = Math.abs(x - y);
    if (diff <= DBL_EPSILON) {
      return true;
    } else {
      return diff <= Math.max(Math.abs(x), Math.abs(y)) * epsilon;
    }
  }
  return false;
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
function format$1(value, options) {
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
        var e = arguments[4];
        return digits2 !== "." ? digits2 + e : e;
      });
    }
    default:
      throw new Error('Unknown notation "' + notation + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function toEngineering(value, precision) {
  var e = value.e;
  var newExp = e % 3 === 0 ? e : e < 0 ? e - 3 - e % 3 : e - e % 3;
  var valueWithoutExp = value.mul(Math.pow(10, -newExp));
  var valueStr = valueWithoutExp.toPrecision(precision);
  if (valueStr.indexOf("e") !== -1) {
    var BigNumber2 = value.constructor;
    valueStr = new BigNumber2(valueStr).toFixed();
  }
  return valueStr + "e" + (e >= 0 ? "+" : "") + newExp.toString();
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
function format(value, options) {
  var result = _format(value, options);
  if (options && typeof options === "object" && "truncate" in options && result.length > options.truncate) {
    return result.substring(0, options.truncate - 3) + "...";
  }
  return result;
}
function _format(value, options) {
  if (typeof value === "number") {
    return format$2(value, options);
  }
  if (isBigNumber(value)) {
    return format$1(value, options);
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
        return stringify(key) + ": " + format(value[key], options);
      });
      return "{" + entries.join(", ") + "}";
    }
  }
  return String(value);
}
function stringify(value) {
  var text = String(value);
  var escaped = "";
  var i = 0;
  while (i < text.length) {
    var c = text.charAt(i);
    escaped += c in controlCharacters ? controlCharacters[c] : c;
    i++;
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
function formatArray(array, options) {
  if (Array.isArray(array)) {
    var str = "[";
    var len = array.length;
    for (var i = 0; i < len; i++) {
      if (i !== 0) {
        str += ", ";
      }
      str += formatArray(array[i], options);
    }
    str += "]";
    return str;
  } else {
    return format(array, options);
  }
}
function looksLikeFraction(value) {
  return value && typeof value === "object" && typeof value.s === "number" && typeof value.n === "number" && typeof value.d === "number" || false;
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
  var i;
  var len = array.length;
  if (len !== size2[dim]) {
    throw new DimensionError(len, size2[dim]);
  }
  if (dim < size2.length - 1) {
    var dimNext = dim + 1;
    for (i = 0; i < len; i++) {
      var child = array[i];
      if (!Array.isArray(child)) {
        throw new DimensionError(size2.length - 1, size2.length, "<");
      }
      _validate(array[i], size2, dimNext);
    }
  } else {
    for (i = 0; i < len; i++) {
      if (Array.isArray(array[i])) {
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
  sourceSize.forEach((sourceDim, i) => {
    if (sourceDim !== null && sourceDim !== valueSize[i]) {
      throw new DimensionError(sourceDim, valueSize[i]);
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
  for (var i = 0; i < index2._dimensions.length; ++i) {
    var dimension = index2._dimensions[i];
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
function resize(array, size2, defaultValue) {
  if (!Array.isArray(size2)) {
    throw new TypeError("Array expected");
  }
  if (size2.length === 0) {
    throw new Error("Resizing to scalar is not supported");
  }
  size2.forEach(function(value) {
    if (!isNumber(value) || !isInteger$1(value) || value < 0) {
      throw new TypeError("Invalid size, must contain positive integers (size: " + format(size2) + ")");
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
  var i;
  var elem;
  var oldLen = array.length;
  var newLen = size2[dim];
  var minLen = Math.min(oldLen, newLen);
  array.length = newLen;
  if (dim < size2.length - 1) {
    var dimNext = dim + 1;
    for (i = 0; i < minLen; i++) {
      elem = array[i];
      if (!Array.isArray(elem)) {
        elem = [elem];
        array[i] = elem;
      }
      _resize(elem, size2, dimNext, defaultValue);
    }
    for (i = minLen; i < newLen; i++) {
      elem = [];
      array[i] = elem;
      _resize(elem, size2, dimNext, defaultValue);
    }
  } else {
    for (i = 0; i < minLen; i++) {
      while (Array.isArray(array[i])) {
        array[i] = array[i][0];
      }
    }
    for (i = minLen; i < newLen; i++) {
      array[i] = defaultValue;
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
  var newLength = product(sizes);
  if (currentLength !== newLength) {
    throw new DimensionError(newLength, currentLength, "!=");
  }
  try {
    return _reshape(flatArray, sizes);
  } catch (e) {
    if (e instanceof DimensionError) {
      throw new DimensionError(newLength, currentLength, "!=");
    }
    throw e;
  }
}
function processSizesWildcard(sizes, currentLength) {
  var newLength = product(sizes);
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
function product(array) {
  return array.reduce((prev, curr) => prev * curr, 1);
}
function _reshape(array, sizes) {
  var tmpArray = array;
  var tmpArray2;
  for (var sizeIndex = sizes.length - 1; sizeIndex > 0; sizeIndex--) {
    var size2 = sizes[sizeIndex];
    tmpArray2 = [];
    var length = tmpArray.length / size2;
    for (var i = 0; i < length; i++) {
      tmpArray2.push(tmpArray.slice(i * size2, (i + 1) * size2));
    }
    tmpArray = tmpArray2;
  }
  return tmpArray;
}
function unsqueeze(array, dims, outer, size2) {
  var s = size2 || arraySize(array);
  if (outer) {
    for (var i = 0; i < outer; i++) {
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
  var i, ii;
  if (Array.isArray(array)) {
    var next = dim + 1;
    for (i = 0, ii = array.length; i < ii; i++) {
      array[i] = _unsqueeze(array[i], dims, next);
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
function identify(a) {
  if (!Array.isArray(a)) {
    throw new TypeError("Array input expected");
  }
  if (a.length === 0) {
    return a;
  }
  var b = [];
  var count = 0;
  b[0] = {
    value: a[0],
    identifier: 0
  };
  for (var i = 1; i < a.length; i++) {
    if (a[i] === a[i - 1]) {
      count++;
    } else {
      count = 0;
    }
    b.push({
      value: a[i],
      identifier: count
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
  for (var i = 0; i < a.length; i++) {
    b.push(a[i].value);
  }
  return b;
}
function getArrayDataType(array, typeOf2) {
  var type;
  var length = 0;
  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    var _isArray = Array.isArray(item);
    if (i === 0 && _isArray) {
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
    for (var i = 0; i < a.length; i++) {
      c[i] = concatRecursive(a[i], b[i], concatDim, dim + 1);
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
  for (var i = 0; i < sizes.length; i++) {
    var size2 = sizes[i];
    var dim = dimensions[i];
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
var dependencies$1q = ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"];
var createTyped = /* @__PURE__ */ factory("typed", dependencies$1q, function createTyped2(_ref) {
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
/*!
 *  decimal.js v10.4.3
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
var EXP_LIMIT = 9e15, MAX_DIGITS = 1e9, NUMERALS = "0123456789abcdef", LN10 = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", DEFAULTS = {
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
}, inexact, quadrant, external = true, decimalError = "[DecimalError] ", invalidArgument = decimalError + "Invalid argument: ", precisionLimitExceeded = decimalError + "Precision limit exceeded", cryptoUnavailable = decimalError + "crypto unavailable", tag = "[object Decimal]", mathfloor = Math.floor, mathpow = Math.pow, isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, BASE = 1e7, LOG_BASE = 7, MAX_SAFE_INTEGER = 9007199254740991, LN10_PRECISION = LN10.length - 1, PI_PRECISION = PI.length - 1, P = { toStringTag: tag };
P.absoluteValue = P.abs = function() {
  var x = new this.constructor(this);
  if (x.s < 0)
    x.s = 1;
  return finalise(x);
};
P.ceil = function() {
  return finalise(new this.constructor(this), this.e + 1, 2);
};
P.clampedTo = P.clamp = function(min2, max2) {
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
P.comparedTo = P.cmp = function(y) {
  var i, j, xdL, ydL, x = this, xd = x.d, yd = (y = new x.constructor(y)).d, xs = x.s, ys = y.s;
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
  for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
    if (xd[i] !== yd[i])
      return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
  }
  return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
};
P.cosine = P.cos = function() {
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
P.cubeRoot = P.cbrt = function() {
  var e, m, n, r, rep, s, sd, t, t3, t3plusx, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero())
    return new Ctor(x);
  external = false;
  s = x.s * mathpow(x.s * x, 1 / 3);
  if (!s || Math.abs(s) == 1 / 0) {
    n = digitsToString(x.d);
    e = x.e;
    if (s = (e - n.length + 1) % 3)
      n += s == 1 || s == -2 ? "0" : "00";
    s = mathpow(n, 1 / 3);
    e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));
    if (s == 1 / 0) {
      n = "5e" + e;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf("e") + 1) + e;
    }
    r = new Ctor(n);
    r.s = x.s;
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    t3 = t.times(t).times(t);
    t3plusx = t3.plus(x);
    r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);
      if (n == "9999" || !rep && n == "4999") {
        if (!rep) {
          finalise(t, e + 1, 0);
          if (t.times(t).times(t).eq(x)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
          finalise(r, e + 1, 1);
          m = !r.times(r).times(r).eq(x);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e, Ctor.rounding, m);
};
P.decimalPlaces = P.dp = function() {
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
P.dividedBy = P.div = function(y) {
  return divide(this, new this.constructor(y));
};
P.dividedToIntegerBy = P.divToInt = function(y) {
  var x = this, Ctor = x.constructor;
  return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
};
P.equals = P.eq = function(y) {
  return this.cmp(y) === 0;
};
P.floor = function() {
  return finalise(new this.constructor(this), this.e + 1, 3);
};
P.greaterThan = P.gt = function(y) {
  return this.cmp(y) > 0;
};
P.greaterThanOrEqualTo = P.gte = function(y) {
  var k = this.cmp(y);
  return k == 1 || k === 0;
};
P.hyperbolicCosine = P.cosh = function() {
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
  var cosh2_x, i = k, d8 = new Ctor(8);
  for (; i--; ) {
    cosh2_x = x.times(x);
    x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
  }
  return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P.hyperbolicSine = P.sinh = function() {
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
P.hyperbolicTangent = P.tanh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite())
    return new Ctor(x.s);
  if (x.isZero())
    return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 7;
  Ctor.rounding = 1;
  return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
};
P.inverseCosine = P.acos = function() {
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
P.inverseHyperbolicCosine = P.acosh = function() {
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
P.inverseHyperbolicSine = P.asinh = function() {
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
P.inverseHyperbolicTangent = P.atanh = function() {
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
  x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);
  Ctor.precision = pr + 4;
  Ctor.rounding = 1;
  x = x.ln();
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.times(0.5);
};
P.inverseSine = P.asin = function() {
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
P.inverseTangent = P.atan = function() {
  var i, j, k, n, px, t, r, wpr, x2, x = this, Ctor = x.constructor, pr = Ctor.precision, rm = Ctor.rounding;
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
  for (i = k; i; --i)
    x = x.div(x.times(x).plus(1).sqrt().plus(1));
  external = false;
  j = Math.ceil(wpr / LOG_BASE);
  n = 1;
  x2 = x.times(x);
  r = new Ctor(x);
  px = x;
  for (; i !== -1; ) {
    px = px.times(x2);
    t = r.minus(px.div(n += 2));
    px = px.times(x2);
    r = t.plus(px.div(n += 2));
    if (r.d[j] !== void 0)
      for (i = j; r.d[i] === t.d[i] && i--; )
        ;
  }
  if (k)
    r = r.times(2 << k - 1);
  external = true;
  return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P.isFinite = function() {
  return !!this.d;
};
P.isInteger = P.isInt = function() {
  return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
};
P.isNaN = function() {
  return !this.s;
};
P.isNegative = P.isNeg = function() {
  return this.s < 0;
};
P.isPositive = P.isPos = function() {
  return this.s > 0;
};
P.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
P.lessThan = P.lt = function(y) {
  return this.cmp(y) < 0;
};
P.lessThanOrEqualTo = P.lte = function(y) {
  return this.cmp(y) < 1;
};
P.logarithm = P.log = function(base) {
  var isBase10, d, denominator, k, inf, num, sd, r, arg = this, Ctor = arg.constructor, pr = Ctor.precision, rm = Ctor.rounding, guard = 5;
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
  d = arg.d;
  if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
    return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
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
  num = naturalLogarithm(arg, sd);
  denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
  r = divide(num, denominator, sd, 1);
  if (checkRoundingDigits(r.d, k = pr, rm)) {
    do {
      sd += 10;
      num = naturalLogarithm(arg, sd);
      denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
      r = divide(num, denominator, sd, 1);
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
P.minus = P.sub = function(y) {
  var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd, x = this, Ctor = x.constructor;
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
  e = mathfloor(y.e / LOG_BASE);
  xe = mathfloor(x.e / LOG_BASE);
  xd = xd.slice();
  k = xe - e;
  if (k) {
    xLTy = k < 0;
    if (xLTy) {
      d = xd;
      k = -k;
      len = yd.length;
    } else {
      d = yd;
      e = xe;
      len = xd.length;
    }
    i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
    if (k > i) {
      k = i;
      d.length = 1;
    }
    d.reverse();
    for (i = k; i--; )
      d.push(0);
    d.reverse();
  } else {
    i = xd.length;
    len = yd.length;
    xLTy = i < len;
    if (xLTy)
      len = i;
    for (i = 0; i < len; i++) {
      if (xd[i] != yd[i]) {
        xLTy = xd[i] < yd[i];
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
  for (i = yd.length - len; i > 0; --i)
    xd[len++] = 0;
  for (i = yd.length; i > k; ) {
    if (xd[--i] < yd[i]) {
      for (j = i; j && xd[--j] === 0; )
        xd[j] = BASE - 1;
      --xd[j];
      xd[i] += BASE;
    }
    xd[i] -= yd[i];
  }
  for (; xd[--len] === 0; )
    xd.pop();
  for (; xd[0] === 0; xd.shift())
    --e;
  if (!xd[0])
    return new Ctor(rm === 3 ? -0 : 0);
  y.d = xd;
  y.e = getBase10Exponent(xd, e);
  return external ? finalise(y, pr, rm) : y;
};
P.modulo = P.mod = function(y) {
  var q, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.s || y.d && !y.d[0])
    return new Ctor(NaN);
  if (!y.d || x.d && !x.d[0]) {
    return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
  }
  external = false;
  if (Ctor.modulo == 9) {
    q = divide(x, y.abs(), 0, 3, 1);
    q.s *= y.s;
  } else {
    q = divide(x, y, 0, Ctor.modulo, 1);
  }
  q = q.times(y);
  external = true;
  return x.minus(q);
};
P.naturalExponential = P.exp = function() {
  return naturalExponential(this);
};
P.naturalLogarithm = P.ln = function() {
  return naturalLogarithm(this);
};
P.negated = P.neg = function() {
  var x = new this.constructor(this);
  x.s = -x.s;
  return finalise(x);
};
P.plus = P.add = function(y) {
  var carry, d, e, i, k, len, pr, rm, xd, yd, x = this, Ctor = x.constructor;
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
  e = mathfloor(y.e / LOG_BASE);
  xd = xd.slice();
  i = k - e;
  if (i) {
    if (i < 0) {
      d = xd;
      i = -i;
      len = yd.length;
    } else {
      d = yd;
      e = k;
      len = xd.length;
    }
    k = Math.ceil(pr / LOG_BASE);
    len = k > len ? k + 1 : len + 1;
    if (i > len) {
      i = len;
      d.length = 1;
    }
    d.reverse();
    for (; i--; )
      d.push(0);
    d.reverse();
  }
  len = xd.length;
  i = yd.length;
  if (len - i < 0) {
    i = len;
    d = yd;
    yd = xd;
    xd = d;
  }
  for (carry = 0; i; ) {
    carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
    xd[i] %= BASE;
  }
  if (carry) {
    xd.unshift(carry);
    ++e;
  }
  for (len = xd.length; xd[--len] == 0; )
    xd.pop();
  y.d = xd;
  y.e = getBase10Exponent(xd, e);
  return external ? finalise(y, pr, rm) : y;
};
P.precision = P.sd = function(z) {
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
P.round = function() {
  var x = this, Ctor = x.constructor;
  return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
};
P.sine = P.sin = function() {
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
P.squareRoot = P.sqrt = function() {
  var m, n, sd, r, rep, t, x = this, d = x.d, e = x.e, s = x.s, Ctor = x.constructor;
  if (s !== 1 || !d || !d[0]) {
    return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
  }
  external = false;
  s = Math.sqrt(+x);
  if (s == 0 || s == 1 / 0) {
    n = digitsToString(d);
    if ((n.length + e) % 2 == 0)
      n += "0";
    s = Math.sqrt(n);
    e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
    if (s == 1 / 0) {
      n = "5e" + e;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf("e") + 1) + e;
    }
    r = new Ctor(n);
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);
      if (n == "9999" || !rep && n == "4999") {
        if (!rep) {
          finalise(t, e + 1, 0);
          if (t.times(t).eq(x)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
          finalise(r, e + 1, 1);
          m = !r.times(r).eq(x);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e, Ctor.rounding, m);
};
P.tangent = P.tan = function() {
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
  x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
};
P.times = P.mul = function(y) {
  var carry, e, i, k, r, rL, t, xdL, ydL, x = this, Ctor = x.constructor, xd = x.d, yd = (y = new Ctor(y)).d;
  y.s *= x.s;
  if (!xd || !xd[0] || !yd || !yd[0]) {
    return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd ? NaN : !xd || !yd ? y.s / 0 : y.s * 0);
  }
  e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
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
  for (i = rL; i--; )
    r.push(0);
  for (i = ydL; --i >= 0; ) {
    carry = 0;
    for (k = xdL + i; k > i; ) {
      t = r[k] + yd[i] * xd[k - i - 1] + carry;
      r[k--] = t % BASE | 0;
      carry = t / BASE | 0;
    }
    r[k] = (r[k] + carry) % BASE | 0;
  }
  for (; !r[--rL]; )
    r.pop();
  if (carry)
    ++e;
  else
    r.shift();
  y.d = r;
  y.e = getBase10Exponent(r, e);
  return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
};
P.toBinary = function(sd, rm) {
  return toStringBinary(this, 2, sd, rm);
};
P.toDecimalPlaces = P.toDP = function(dp, rm) {
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
P.toExponential = function(dp, rm) {
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
P.toFixed = function(dp, rm) {
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
P.toFraction = function(maxD) {
  var d, d0, d1, d2, e, k, n, n0, n12, pr, q, r, x = this, xd = x.d, Ctor = x.constructor;
  if (!xd)
    return new Ctor(x);
  n12 = d0 = new Ctor(1);
  d1 = n0 = new Ctor(0);
  d = new Ctor(d1);
  e = d.e = getPrecision(xd) - x.e - 1;
  k = e % LOG_BASE;
  d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);
  if (maxD == null) {
    maxD = e > 0 ? d : n12;
  } else {
    n = new Ctor(maxD);
    if (!n.isInt() || n.lt(n12))
      throw Error(invalidArgument + n);
    maxD = n.gt(d) ? e > 0 ? d : n12 : n;
  }
  external = false;
  n = new Ctor(digitsToString(xd));
  pr = Ctor.precision;
  Ctor.precision = e = xd.length * LOG_BASE * 2;
  for (; ; ) {
    q = divide(n, d, 0, 1, 1);
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
  d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
  n0 = n0.plus(d2.times(n12));
  d0 = d0.plus(d2.times(d1));
  n0.s = n12.s = x.s;
  r = divide(n12, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1 ? [n12, d1] : [n0, d0];
  Ctor.precision = pr;
  external = true;
  return r;
};
P.toHexadecimal = P.toHex = function(sd, rm) {
  return toStringBinary(this, 16, sd, rm);
};
P.toNearest = function(y, rm) {
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
    x = divide(x, y, 0, rm, 1).times(y);
    external = true;
    finalise(x);
  } else {
    y.s = x.s;
    x = y;
  }
  return x;
};
P.toNumber = function() {
  return +this;
};
P.toOctal = function(sd, rm) {
  return toStringBinary(this, 8, sd, rm);
};
P.toPower = P.pow = function(y) {
  var e, k, pr, r, rm, s, x = this, Ctor = x.constructor, yn = +(y = new Ctor(y));
  if (!x.d || !y.d || !x.d[0] || !y.d[0])
    return new Ctor(mathpow(+x, yn));
  x = new Ctor(x);
  if (x.eq(1))
    return x;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (y.eq(1))
    return finalise(x, pr, rm);
  e = mathfloor(y.e / LOG_BASE);
  if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
    r = intPow(Ctor, x, k, pr);
    return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
  }
  s = x.s;
  if (s < 0) {
    if (e < y.d.length - 1)
      return new Ctor(NaN);
    if ((y.d[e] & 1) == 0)
      s = 1;
    if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
      x.s = s;
      return x;
    }
  }
  k = mathpow(+x, yn);
  e = k == 0 || !isFinite(k) ? mathfloor(yn * (Math.log("0." + digitsToString(x.d)) / Math.LN10 + x.e + 1)) : new Ctor(k + "").e;
  if (e > Ctor.maxE + 1 || e < Ctor.minE - 1)
    return new Ctor(e > 0 ? s / 0 : 0);
  external = false;
  Ctor.rounding = x.s = 1;
  k = Math.min(12, (e + "").length);
  r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);
  if (r.d) {
    r = finalise(r, pr + 5, 1);
    if (checkRoundingDigits(r.d, pr, rm)) {
      e = pr + 10;
      r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);
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
P.toPrecision = function(sd, rm) {
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
P.toSignificantDigits = P.toSD = function(sd, rm) {
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
P.toString = function() {
  var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.truncated = P.trunc = function() {
  return finalise(new this.constructor(this), this.e + 1, 1);
};
P.valueOf = P.toJSON = function() {
  var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  return x.isNeg() ? "-" + str : str;
};
function digitsToString(d) {
  var i, k, ws, indexOfLastWord = d.length - 1, str = "", w = d[0];
  if (indexOfLastWord > 0) {
    str += w;
    for (i = 1; i < indexOfLastWord; i++) {
      ws = d[i] + "";
      k = LOG_BASE - ws.length;
      if (k)
        str += getZeroString(k);
      str += ws;
    }
    w = d[i];
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
function checkInt32(i, min2, max2) {
  if (i !== ~~i || i < min2 || i > max2) {
    throw Error(invalidArgument + i);
  }
}
function checkRoundingDigits(d, i, rm, repeating) {
  var di, k, r, rd;
  for (k = d[0]; k >= 10; k /= 10)
    --i;
  if (--i < 0) {
    i += LOG_BASE;
    di = 0;
  } else {
    di = Math.ceil((i + 1) / LOG_BASE);
    i %= LOG_BASE;
  }
  k = mathpow(10, LOG_BASE - i);
  rd = d[di] % k | 0;
  if (repeating == null) {
    if (i < 3) {
      if (i == 0)
        rd = rd / 100 | 0;
      else if (i == 1)
        rd = rd / 10 | 0;
      r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 5e4 || rd == 0;
    } else {
      r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 || (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
    }
  } else {
    if (i < 4) {
      if (i == 0)
        rd = rd / 1e3 | 0;
      else if (i == 1)
        rd = rd / 100 | 0;
      else if (i == 2)
        rd = rd / 10 | 0;
      r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
    } else {
      r = ((repeating || rm < 4) && rd + 1 == k || !repeating && rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 1e3 | 0) == mathpow(10, i - 3) - 1;
    }
  }
  return r;
}
function convertBase(str, baseIn, baseOut) {
  var j, arr = [0], arrL, i = 0, strL = str.length;
  for (; i < strL; ) {
    for (arrL = arr.length; arrL--; )
      arr[arrL] *= baseIn;
    arr[0] += NUMERALS.indexOf(str.charAt(i++));
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
  for (var i = k; i--; ) {
    var cos2x = x.times(x);
    x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
  }
  Ctor.precision -= k;
  return x;
}
var divide = /* @__PURE__ */ function() {
  function multiplyInteger(x, k, base) {
    var temp, carry = 0, i = x.length;
    for (x = x.slice(); i--; ) {
      temp = x[i] * k + carry;
      x[i] = temp % base | 0;
      carry = temp / base | 0;
    }
    if (carry)
      x.unshift(carry);
    return x;
  }
  function compare2(a, b, aL, bL) {
    var i, r;
    if (aL != bL) {
      r = aL > bL ? 1 : -1;
    } else {
      for (i = r = 0; i < aL; i++) {
        if (a[i] != b[i]) {
          r = a[i] > b[i] ? 1 : -1;
          break;
        }
      }
    }
    return r;
  }
  function subtract2(a, b, aL, base) {
    var i = 0;
    for (; aL--; ) {
      a[aL] -= i;
      i = a[aL] < b[aL] ? 1 : 0;
      a[aL] = i * base + a[aL] - b[aL];
    }
    for (; !a[0] && a.length > 1; )
      a.shift();
  }
  return function(x, y, pr, rm, dp, base) {
    var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz, Ctor = x.constructor, sign2 = x.s == y.s ? 1 : -1, xd = x.d, yd = y.d;
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
      e = x.e - y.e;
    } else {
      base = BASE;
      logBase = LOG_BASE;
      e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
    }
    yL = yd.length;
    xL = xd.length;
    q = new Ctor(sign2);
    qd = q.d = [];
    for (i = 0; yd[i] == (xd[i] || 0); i++)
      ;
    if (yd[i] > (xd[i] || 0))
      e--;
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
      i = 0;
      if (yL == 1) {
        k = 0;
        yd = yd[0];
        sd++;
        for (; (i < xL || k) && sd--; i++) {
          t = k * base + (xd[i] || 0);
          qd[i] = t / yd | 0;
          k = t % yd | 0;
        }
        more = k || i < xL;
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
              prod = multiplyInteger(yd, k, base);
              prodL = prod.length;
              remL = rem.length;
              cmp = compare2(prod, rem, prodL, remL);
              if (cmp == 1) {
                k--;
                subtract2(prod, yL < prodL ? yz : yd, prodL, base);
              }
            } else {
              if (k == 0)
                cmp = k = 1;
              prod = yd.slice();
            }
            prodL = prod.length;
            if (prodL < remL)
              prod.unshift(0);
            subtract2(rem, prod, remL, base);
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
          qd[i++] = k;
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
      q.e = e;
      inexact = more;
    } else {
      for (i = 1, k = qd[0]; k >= 10; k /= 10)
        i++;
      q.e = i + e * logBase - 1;
      finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
    }
    return q;
  };
}();
function finalise(x, sd, rm, isTruncated) {
  var digits2, i, j, k, rd, roundUp, w, xd, xdi, Ctor = x.constructor;
  out:
    if (sd != null) {
      xd = x.d;
      if (!xd)
        return x;
      for (digits2 = 1, k = xd[0]; k >= 10; k /= 10)
        digits2++;
      i = sd - digits2;
      if (i < 0) {
        i += LOG_BASE;
        j = sd;
        w = xd[xdi = 0];
        rd = w / mathpow(10, digits2 - j - 1) % 10 | 0;
      } else {
        xdi = Math.ceil((i + 1) / LOG_BASE);
        k = xd.length;
        if (xdi >= k) {
          if (isTruncated) {
            for (; k++ <= xdi; )
              xd.push(0);
            w = rd = 0;
            digits2 = 1;
            i %= LOG_BASE;
            j = i - LOG_BASE + 1;
          } else {
            break out;
          }
        } else {
          w = k = xd[xdi];
          for (digits2 = 1; k >= 10; k /= 10)
            digits2++;
          i %= LOG_BASE;
          j = i - LOG_BASE + digits2;
          rd = j < 0 ? 0 : w / mathpow(10, digits2 - j - 1) % 10 | 0;
        }
      }
      isTruncated = isTruncated || sd < 0 || xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits2 - j - 1));
      roundUp = rm < 4 ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
      (i > 0 ? j > 0 ? w / mathpow(10, digits2 - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
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
      if (i == 0) {
        xd.length = xdi;
        k = 1;
        xdi--;
      } else {
        xd.length = xdi + 1;
        k = mathpow(10, LOG_BASE - i);
        xd[xdi] = j > 0 ? (w / mathpow(10, digits2 - j) % mathpow(10, j) | 0) * k : 0;
      }
      if (roundUp) {
        for (; ; ) {
          if (xdi == 0) {
            for (i = 1, j = xd[0]; j >= 10; j /= 10)
              i++;
            j = xd[0] += k;
            for (k = 1; j >= 10; j /= 10)
              k++;
            if (i != k) {
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
      for (i = xd.length; xd[--i] === 0; )
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
  var k, e = x.e, str = digitsToString(x.d), len = str.length;
  if (isExp) {
    if (sd && (k = sd - len) > 0) {
      str = str.charAt(0) + "." + str.slice(1) + getZeroString(k);
    } else if (len > 1) {
      str = str.charAt(0) + "." + str.slice(1);
    }
    str = str + (x.e < 0 ? "e" : "e+") + x.e;
  } else if (e < 0) {
    str = "0." + getZeroString(-e - 1) + str;
    if (sd && (k = sd - len) > 0)
      str += getZeroString(k);
  } else if (e >= len) {
    str += getZeroString(e + 1 - len);
    if (sd && (k = sd - e - 1) > 0)
      str = str + "." + getZeroString(k);
  } else {
    if ((k = e + 1) < len)
      str = str.slice(0, k) + "." + str.slice(k);
    if (sd && (k = sd - len) > 0) {
      if (e + 1 === len)
        str += ".";
      str += getZeroString(k);
    }
  }
  return str;
}
function getBase10Exponent(digits2, e) {
  var w = digits2[0];
  for (e *= LOG_BASE; w >= 10; w /= 10)
    e++;
  return e;
}
function getLn10(Ctor, sd, pr) {
  if (sd > LN10_PRECISION) {
    external = true;
    if (pr)
      Ctor.precision = pr;
    throw Error(precisionLimitExceeded);
  }
  return finalise(new Ctor(LN10), sd, 1, true);
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
  var y, x = new Ctor(args[0]), i = 0;
  for (; ++i < args.length; ) {
    y = new Ctor(args[i]);
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
  var denominator, guard, j, pow2, sum2, t, wpr, rep = 0, i = 0, k = 0, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
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
    denominator = denominator.times(++i);
    t = sum2.plus(divide(pow2, denominator, wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      j = k;
      while (j--)
        sum2 = finalise(sum2.times(sum2), wpr, 1);
      if (sd == null) {
        if (rep < 3 && checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += 10;
          denominator = pow2 = t = new Ctor(1);
          i = 0;
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
  var c, c0, denominator, e, numerator, rep, sum2, t, wpr, x1, x2, n = 1, guard = 10, x = y, xd = x.d, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
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
  if (Math.abs(e = x.e) < 15e14) {
    while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
      x = x.times(y);
      c = digitsToString(x.d);
      c0 = c.charAt(0);
      n++;
    }
    e = x.e;
    if (c0 > 1) {
      x = new Ctor("0." + c);
      e++;
    } else {
      x = new Ctor(c0 + "." + c.slice(1));
    }
  } else {
    t = getLn10(Ctor, wpr + 2, pr).times(e + "");
    x = naturalLogarithm(new Ctor(c0 + "." + c.slice(1)), wpr - guard).plus(t);
    Ctor.precision = pr;
    return sd == null ? finalise(x, pr, rm, external = true) : x;
  }
  x1 = x;
  sum2 = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
  x2 = finalise(x.times(x), wpr, 1);
  denominator = 3;
  for (; ; ) {
    numerator = finalise(numerator.times(x2), wpr, 1);
    t = sum2.plus(divide(numerator, new Ctor(denominator), wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      sum2 = sum2.times(2);
      if (e !== 0)
        sum2 = sum2.plus(getLn10(Ctor, wpr + 2, pr).times(e + ""));
      sum2 = divide(sum2, new Ctor(n), wpr, 1);
      if (sd == null) {
        if (checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += guard;
          t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
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
  var e, i, len;
  if ((e = str.indexOf(".")) > -1)
    str = str.replace(".", "");
  if ((i = str.search(/e/i)) > 0) {
    if (e < 0)
      e = i;
    e += +str.slice(i + 1);
    str = str.substring(0, i);
  } else if (e < 0) {
    e = str.length;
  }
  for (i = 0; str.charCodeAt(i) === 48; i++)
    ;
  for (len = str.length; str.charCodeAt(len - 1) === 48; --len)
    ;
  str = str.slice(i, len);
  if (str) {
    len -= i;
    x.e = e = e - i - 1;
    x.d = [];
    i = (e + 1) % LOG_BASE;
    if (e < 0)
      i += LOG_BASE;
    if (i < len) {
      if (i)
        x.d.push(+str.slice(0, i));
      for (len -= LOG_BASE; i < len; )
        x.d.push(+str.slice(i, i += LOG_BASE));
      str = str.slice(i);
      i = LOG_BASE - str.length;
    } else {
      i -= len;
    }
    for (; i--; )
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
  var base, Ctor, divisor, i, isFloat, len, p, xd, xe;
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
  i = str.search(/p/i);
  if (i > 0) {
    p = +str.slice(i + 1);
    str = str.substring(2, i);
  } else {
    str = str.slice(2);
  }
  i = str.indexOf(".");
  isFloat = i >= 0;
  Ctor = x.constructor;
  if (isFloat) {
    str = str.replace(".", "");
    len = str.length;
    i = len - i;
    divisor = intPow(Ctor, new Ctor(base), i, i * 2);
  }
  xd = convertBase(str, base, BASE);
  xe = xd.length - 1;
  for (i = xe; xd[i] === 0; --i)
    xd.pop();
  if (i < 0)
    return new Ctor(x.s * 0);
  x.e = getBase10Exponent(xd, xe);
  x.d = xd;
  external = false;
  if (isFloat)
    x = divide(x, divisor, len * 4);
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
    t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
    u = isHyperbolic ? y.plus(t) : y.minus(t);
    y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
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
function tinyPow(b, e) {
  var n = b;
  while (--e)
    n *= b;
  return n;
}
function toLessThanHalfPi(Ctor, x) {
  var t, isNeg = x.s < 0, pi = getPi(Ctor, Ctor.precision, 1), halfPi = pi.times(0.5);
  x = x.abs();
  if (x.lte(halfPi)) {
    quadrant = isNeg ? 4 : 1;
    return x;
  }
  t = x.divToInt(pi);
  if (t.isZero()) {
    quadrant = isNeg ? 3 : 2;
  } else {
    x = x.minus(t.times(pi));
    if (x.lte(halfPi)) {
      quadrant = isOdd(t) ? isNeg ? 2 : 3 : isNeg ? 4 : 1;
      return x;
    }
    quadrant = isOdd(t) ? isNeg ? 1 : 4 : isNeg ? 3 : 2;
  }
  return x.minus(pi).abs();
}
function toStringBinary(x, baseOut, sd, rm) {
  var base, e, i, k, len, roundUp, str, xd, y, Ctor = x.constructor, isExp = sd !== void 0;
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
    i = str.indexOf(".");
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
    if (i >= 0) {
      str = str.replace(".", "");
      y = new Ctor(1);
      y.e = str.length - i;
      y.d = convertBase(finiteToString(y), 10, base);
      y.e = y.d.length;
    }
    xd = convertBase(str, 10, base);
    e = len = xd.length;
    for (; xd[--len] == 0; )
      xd.pop();
    if (!xd[0]) {
      str = isExp ? "0p+0" : "0";
    } else {
      if (i < 0) {
        e--;
      } else {
        x = new Ctor(x);
        x.d = xd;
        x.e = e;
        x = divide(x, y, sd, rm, 0, base);
        xd = x.d;
        e = x.e;
        roundUp = inexact;
      }
      i = xd[sd];
      k = base / 2;
      roundUp = roundUp || xd[sd + 1] !== void 0;
      roundUp = rm < 4 ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2)) : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 || rm === (x.s < 0 ? 8 : 7));
      xd.length = sd;
      if (roundUp) {
        for (; ++xd[--sd] > base - 1; ) {
          xd[sd] = 0;
          if (!sd) {
            ++e;
            xd.unshift(1);
          }
        }
      }
      for (len = xd.length; !xd[len - 1]; --len)
        ;
      for (i = 0, str = ""; i < len; i++)
        str += NUMERALS.charAt(xd[i]);
      if (isExp) {
        if (len > 1) {
          if (baseOut == 16 || baseOut == 8) {
            i = baseOut == 16 ? 4 : 3;
            for (--len; len % i; len++)
              str += "0";
            xd = convertBase(str, base, baseOut);
            for (len = xd.length; !xd[len - 1]; --len)
              ;
            for (i = 1, str = "1."; i < len; i++)
              str += NUMERALS.charAt(xd[i]);
          } else {
            str = str.charAt(0) + "." + str.slice(1);
          }
        }
        str = str + (e < 0 ? "p" : "p+") + e;
      } else if (e < 0) {
        for (; ++e; )
          str = "0" + str;
        str = "0." + str;
      } else {
        if (++e > len)
          for (e -= len; e--; )
            str += "0";
        else if (e < len)
          str = str.slice(0, e) + "." + str.slice(e);
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
function acos(x) {
  return new this(x).acos();
}
function acosh(x) {
  return new this(x).acosh();
}
function add$1(x, y) {
  return new this(x).plus(y);
}
function asin(x) {
  return new this(x).asin();
}
function asinh(x) {
  return new this(x).asinh();
}
function atan$1(x) {
  return new this(x).atan();
}
function atanh(x) {
  return new this(x).atanh();
}
function atan2(y, x) {
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
    r = this.atan(divide(y, x, wpr, 1));
    x = getPi(this, wpr, 1);
    this.precision = pr;
    this.rounding = rm;
    r = y.s < 0 ? r.minus(x) : r.plus(x);
  } else {
    r = this.atan(divide(y, x, wpr, 1));
  }
  return r;
}
function cbrt(x) {
  return new this(x).cbrt();
}
function ceil(x) {
  return finalise(x = new this(x), x.e + 1, 2);
}
function clamp(x, min2, max2) {
  return new this(x).clamp(min2, max2);
}
function config2(obj) {
  if (!obj || typeof obj !== "object")
    throw Error(decimalError + "Object expected");
  var i, p, v, useDefaults = obj.defaults === true, ps = [
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
  for (i = 0; i < ps.length; i += 3) {
    if (p = ps[i], useDefaults)
      this[p] = DEFAULTS[p];
    if ((v = obj[p]) !== void 0) {
      if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2])
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
function cosh(x) {
  return new this(x).cosh();
}
function clone(obj) {
  var i, p, ps;
  function Decimal2(v) {
    var e, i2, t, x = this;
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
        for (e = 0, i2 = v; i2 >= 10; i2 /= 10)
          e++;
        if (external) {
          if (e > Decimal2.maxE) {
            x.e = NaN;
            x.d = null;
          } else if (e < Decimal2.minE) {
            x.e = 0;
            x.d = [0];
          } else {
            x.e = e;
            x.d = [v];
          }
        } else {
          x.e = e;
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
    if ((i2 = v.charCodeAt(0)) === 45) {
      v = v.slice(1);
      x.s = -1;
    } else {
      if (i2 === 43)
        v = v.slice(1);
      x.s = 1;
    }
    return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
  }
  Decimal2.prototype = P;
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
  Decimal2.clone = clone;
  Decimal2.isDecimal = isDecimalInstance;
  Decimal2.abs = abs$1;
  Decimal2.acos = acos;
  Decimal2.acosh = acosh;
  Decimal2.add = add$1;
  Decimal2.asin = asin;
  Decimal2.asinh = asinh;
  Decimal2.atan = atan$1;
  Decimal2.atanh = atanh;
  Decimal2.atan2 = atan2;
  Decimal2.cbrt = cbrt;
  Decimal2.ceil = ceil;
  Decimal2.clamp = clamp;
  Decimal2.cos = cos$1;
  Decimal2.cosh = cosh;
  Decimal2.div = div;
  Decimal2.exp = exp;
  Decimal2.floor = floor;
  Decimal2.hypot = hypot;
  Decimal2.ln = ln;
  Decimal2.log = log;
  Decimal2.log10 = log10;
  Decimal2.log2 = log2;
  Decimal2.max = max;
  Decimal2.min = min;
  Decimal2.mod = mod;
  Decimal2.mul = mul;
  Decimal2.pow = pow$1;
  Decimal2.random = random;
  Decimal2.round = round;
  Decimal2.sign = sign$1;
  Decimal2.sin = sin$1;
  Decimal2.sinh = sinh;
  Decimal2.sqrt = sqrt$1;
  Decimal2.sub = sub;
  Decimal2.sum = sum;
  Decimal2.tan = tan;
  Decimal2.tanh = tanh;
  Decimal2.trunc = trunc;
  if (obj === void 0)
    obj = {};
  if (obj) {
    if (obj.defaults !== true) {
      ps = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"];
      for (i = 0; i < ps.length; )
        if (!obj.hasOwnProperty(p = ps[i++]))
          obj[p] = this[p];
    }
  }
  Decimal2.config(obj);
  return Decimal2;
}
function div(x, y) {
  return new this(x).div(y);
}
function exp(x) {
  return new this(x).exp();
}
function floor(x) {
  return finalise(x = new this(x), x.e + 1, 3);
}
function hypot() {
  var i, n, t = new this(0);
  external = false;
  for (i = 0; i < arguments.length; ) {
    n = new this(arguments[i++]);
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
function log(x, y) {
  return new this(x).log(y);
}
function log2(x) {
  return new this(x).log(2);
}
function log10(x) {
  return new this(x).log(10);
}
function max() {
  return maxOrMin(this, arguments, "lt");
}
function min() {
  return maxOrMin(this, arguments, "gt");
}
function mod(x, y) {
  return new this(x).mod(y);
}
function mul(x, y) {
  return new this(x).mul(y);
}
function pow$1(x, y) {
  return new this(x).pow(y);
}
function random(sd) {
  var d, e, k, n, i = 0, r = new this(1), rd = [];
  if (sd === void 0)
    sd = this.precision;
  else
    checkInt32(sd, 1, MAX_DIGITS);
  k = Math.ceil(sd / LOG_BASE);
  if (!this.crypto) {
    for (; i < k; )
      rd[i++] = Math.random() * 1e7 | 0;
  } else if (crypto.getRandomValues) {
    d = crypto.getRandomValues(new Uint32Array(k));
    for (; i < k; ) {
      n = d[i];
      if (n >= 429e7) {
        d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
      } else {
        rd[i++] = n % 1e7;
      }
    }
  } else if (crypto.randomBytes) {
    d = crypto.randomBytes(k *= 4);
    for (; i < k; ) {
      n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 127) << 24);
      if (n >= 214e7) {
        crypto.randomBytes(4).copy(d, i);
      } else {
        rd.push(n % 1e7);
        i += 4;
      }
    }
    i = k / 4;
  } else {
    throw Error(cryptoUnavailable);
  }
  k = rd[--i];
  sd %= LOG_BASE;
  if (k && sd) {
    n = mathpow(10, LOG_BASE - sd);
    rd[i] = (k / n | 0) * n;
  }
  for (; rd[i] === 0; i--)
    rd.pop();
  if (i < 0) {
    e = 0;
    rd = [0];
  } else {
    e = -1;
    for (; rd[0] === 0; e -= LOG_BASE)
      rd.shift();
    for (k = 1, n = rd[0]; n >= 10; n /= 10)
      k++;
    if (k < LOG_BASE)
      e -= LOG_BASE - k;
  }
  r.e = e;
  r.d = rd;
  return r;
}
function round(x) {
  return finalise(x = new this(x), x.e + 1, this.rounding);
}
function sign$1(x) {
  x = new this(x);
  return x.d ? x.d[0] ? x.s : 0 * x.s : x.s || NaN;
}
function sin$1(x) {
  return new this(x).sin();
}
function sinh(x) {
  return new this(x).sinh();
}
function sqrt$1(x) {
  return new this(x).sqrt();
}
function sub(x, y) {
  return new this(x).sub(y);
}
function sum() {
  var i = 0, args = arguments, x = new this(args[i]);
  external = false;
  for (; x.s && ++i < args.length; )
    x = x.plus(args[i]);
  external = true;
  return finalise(x, this.precision, this.rounding);
}
function tan(x) {
  return new this(x).tan();
}
function tanh(x) {
  return new this(x).tanh();
}
function trunc(x) {
  return finalise(x = new this(x), x.e + 1, 1);
}
P[Symbol.for("nodejs.util.inspect.custom")] = P.toString;
P[Symbol.toStringTag] = "Decimal";
var Decimal = P.constructor = clone(DEFAULTS);
LN10 = new Decimal(LN10);
PI = new Decimal(PI);
var name$1q = "BigNumber";
var dependencies$1p = ["?on", "config"];
var createBigNumberClass = /* @__PURE__ */ factory(name$1q, dependencies$1p, (_ref) => {
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
            for (var i = 0; i < tokens.length; i++) {
              var c = tokens[i];
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
                if (tokens[i + 1] !== " " && !isNaN(tokens[i + 1])) {
                  z["im"] += parseFloat((minus % 2 ? "-" : "") + tokens[i + 1]);
                  i++;
                } else {
                  z["im"] += parseFloat((minus % 2 ? "-" : "") + "1");
                }
                plus = minus = 0;
              } else {
                if (plus + minus === 0 || isNaN(c)) {
                  parser_exit();
                }
                if (tokens[i + 1] === "i" || tokens[i + 1] === "I") {
                  z["im"] += parseFloat((minus % 2 ? "-" : "") + c);
                  i++;
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
        var arg = Math.atan2(b, a);
        var loh = logHypot(a, b);
        a = Math.exp(z["re"] * loh - z["im"] * arg);
        b = z["im"] * loh + z["re"] * arg;
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
var name$1p = "Complex";
var dependencies$1o = [];
var createComplexClass = /* @__PURE__ */ factory(name$1p, dependencies$1o, () => {
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
    var strRe = format$2(this.re, options);
    var strIm = format$2(this.im, options);
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
        var arg = arguments[0];
        if (typeof arg === "object") {
          return Complex$1(arg);
        } else {
          throw new TypeError("Input has to be an object with r and phi keys.");
        }
      }
      case 2: {
        var r = arguments[0];
        var phi = arguments[1];
        if (isNumber(r)) {
          if (isUnit(phi) && phi.hasBase("ANGLE")) {
            phi = phi.toNumber("rad");
          }
          if (isNumber(phi)) {
            return new Complex$1({
              r,
              phi
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
      var a = gcd(n, d);
      f["n"] = n / a;
      f["d"] = d / a;
      return f;
    }
    function factorize(num) {
      var factors = {};
      var n = num;
      var i = 2;
      var s = 4;
      while (s <= n) {
        while (n % i === 0) {
          n /= i;
          factors[i] = (factors[i] || 0) + 1;
        }
        s += 1 + 2 * i++;
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
    function modpow(b, e, m) {
      var r = 1;
      for (; e > 0; b = b * b % m, e >>= 1) {
        if (e & 1) {
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
    function gcd(a, b) {
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
        a = gcd(P2["d"], P2["n"]);
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
        return newFraction(gcd(P2["n"], this["n"]) * gcd(P2["d"], this["d"]), P2["d"] * this["d"]);
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
        return newFraction(P2["n"] * this["n"], gcd(P2["n"], this["n"]) * gcd(P2["d"], this["d"]));
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
        for (var i = 1; i < cont.length; i++) {
          var s = newFraction(cont[i - 1], 1);
          for (var k = i - 2; k >= 0; k--) {
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
          for (var i = cycOff; i--; ) {
            str += N / D | 0;
            N %= D;
            N *= 10;
          }
          str += "(";
          for (var i = cycLen; i--; ) {
            str += N / D | 0;
            N %= D;
            N *= 10;
          }
          str += ")";
        } else {
          for (var i = dec; N && i--; ) {
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
var name$1o = "Fraction";
var dependencies$1n = [];
var createFractionClass = /* @__PURE__ */ factory(name$1o, dependencies$1n, () => {
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
var name$1n = "Matrix";
var dependencies$1m = [];
var createMatrixClass = /* @__PURE__ */ factory(name$1n, dependencies$1m, () => {
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
function maxArgumentCount(fn) {
  return Object.keys(fn.signatures || {}).reduce(function(args, signature) {
    var count = (signature.match(/,/g) || []).length + 1;
    return Math.max(args, count);
  }, -1);
}
var name$1m = "DenseMatrix";
var dependencies$1l = ["Matrix"];
var createDenseMatrixClass = /* @__PURE__ */ factory(name$1m, dependencies$1l, (_ref) => {
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
        this._data = clone$2(data._data);
        this._size = clone$2(data._size);
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
      throw new TypeError("Unsupported type of data (" + typeOf(data) + ")");
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
    return getArrayDataType(this._data, typeOf);
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
    for (var i = 0, ii = index2.length; i < ii; i++) {
      var indexI = index2[i];
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
    var i, ii, indexI;
    var size2 = index2.map(function(i2) {
      return i2 + 1;
    });
    _fit(this, size2, defaultValue);
    var data = this._data;
    for (i = 0, ii = index2.length - 1; i < ii; i++) {
      indexI = index2[i];
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
      for (var i = 0, ii = matrix2._size.length; i < ii; i++) {
        validateIndex(min2[i], matrix2._size[i]);
        validateIndex(max2[i], matrix2._size[i]);
      }
      return new DenseMatrix2(_getSubmatrix(matrix2._data, index2, size2.length, 0), matrix2._datatype);
    }
  }
  function _getSubmatrix(data, index2, dims, dim) {
    var last = dim === dims - 1;
    var range2 = index2.dimension(dim);
    if (last) {
      return range2.map(function(i) {
        validateIndex(i, data.length);
        return data[i];
      }).valueOf();
    } else {
      return range2.map(function(i) {
        validateIndex(i, data.length);
        var child = data[i];
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
        var i = 0;
        var outer = 0;
        while (iSize[i] === 1 && sSize[i] === 1) {
          i++;
        }
        while (iSize[i] === 1) {
          outer++;
          i++;
        }
        submatrix = unsqueeze(submatrix, iSize.length, outer, sSize);
      }
      if (!deepStrictEqual(iSize, sSize)) {
        throw new DimensionError(iSize, sSize, ">");
      }
      var size2 = index2.max().map(function(i2) {
        return i2 + 1;
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
    matrix2._data = resize(matrix2._data, matrix2._size, defaultValue);
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
    for (var i = 0, ii = size2.length; i < ii; i++) {
      if (size2[i] > newSize[i]) {
        newSize[i] = size2[i];
        changed = true;
      }
    }
    if (changed) {
      _resize2(matrix2, newSize, defaultValue);
    }
  }
  DenseMatrix2.prototype.clone = function() {
    var m = new DenseMatrix2({
      data: clone$2(this._data),
      size: clone$2(this._size),
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
        return value.map(function(child, i) {
          return recurse2(child, index2.concat(i));
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
    var datatype = this._datatype !== void 0 ? getArrayDataType(data, typeOf) : void 0;
    return new DenseMatrix2(data, datatype);
  };
  DenseMatrix2.prototype.forEach = function(callback) {
    var me = this;
    var recurse = function recurse2(value, index2) {
      if (isArray(value)) {
        value.forEach(function(child, i) {
          recurse2(child, index2.concat(i));
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
        for (var i = 0; i < value.length; i++) {
          yield* recurse2(value[i], index2.concat(i));
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
    for (var row of data) {
      result.push(new DenseMatrix2([row], this._datatype));
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
    var _loop = function _loop2(i2) {
      var col = data.map((row) => [row[i2]]);
      result.push(new DenseMatrix2(col, _this._datatype));
    };
    for (var i = 0; i < s[1]; i++) {
      _loop(i);
    }
    return result;
  };
  DenseMatrix2.prototype.toArray = function() {
    return clone$2(this._data);
  };
  DenseMatrix2.prototype.valueOf = function() {
    return this._data;
  };
  DenseMatrix2.prototype.format = function(options) {
    return format(this._data, options);
  };
  DenseMatrix2.prototype.toString = function() {
    return format(this._data);
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
    for (var i = 0; i < n; i++) {
      data[i] = this._data[i + kSub][i + kSuper];
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
      _value = function _value2(i) {
        return value[i];
      };
    } else if (isMatrix(value)) {
      var ms = value.size();
      if (ms.length !== 1 || ms[0] !== n) {
        throw new Error("Invalid matrix length");
      }
      _value = function _value2(i) {
        return value.get([i]);
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
      data = resize(data, size2, defaultValue);
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
  DenseMatrix2.prototype.swapRows = function(i, j) {
    if (!isNumber(i) || !isInteger$1(i) || !isNumber(j) || !isInteger$1(j)) {
      throw new Error("Row index must be positive integers");
    }
    if (this._size.length !== 2) {
      throw new Error("Only two dimensional matrix is supported");
    }
    validateIndex(i, this._size[0]);
    validateIndex(j, this._size[0]);
    DenseMatrix2._swapRows(i, j, this._data);
    return this;
  };
  DenseMatrix2._swapRows = function(i, j, data) {
    var vi = data[i];
    data[i] = data[j];
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
function deepMap(array, callback, skipZeros) {
  if (array && typeof array.map === "function") {
    return array.map(function(x) {
      return deepMap(x, callback);
    });
  } else {
    return callback(array);
  }
}
var name$1l = "isInteger";
var dependencies$1k = ["typed"];
var createIsInteger = /* @__PURE__ */ factory(name$1l, dependencies$1k, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$1l, {
    number: isInteger$1,
    // TODO: what to do with isInteger(add(0.1, 0.2))  ?
    BigNumber: function BigNumber2(x) {
      return x.isInt();
    },
    Fraction: function Fraction2(x) {
      return x.d === 1 && isFinite(x.n);
    },
    "Array | Matrix": typed2.referToSelf((self) => (x) => deepMap(x, self))
  });
});
var n1$1 = "number";
var n2 = "number, number";
function absNumber(a) {
  return Math.abs(a);
}
absNumber.signature = n1$1;
function addNumber(a, b) {
  return a + b;
}
addNumber.signature = n2;
function subtractNumber(a, b) {
  return a - b;
}
subtractNumber.signature = n2;
function multiplyNumber(a, b) {
  return a * b;
}
multiplyNumber.signature = n2;
function unaryMinusNumber(x) {
  return -x;
}
unaryMinusNumber.signature = n1$1;
function signNumber(x) {
  return sign$2(x);
}
signNumber.signature = n1$1;
function powNumber(x, y) {
  if (x * x < 1 && y === Infinity || x * x > 1 && y === -Infinity) {
    return 0;
  }
  return Math.pow(x, y);
}
powNumber.signature = n2;
var n1 = "number";
function isPositiveNumber(x) {
  return x > 0;
}
isPositiveNumber.signature = n1;
function isZeroNumber(x) {
  return x === 0;
}
isZeroNumber.signature = n1;
var name$1k = "isPositive";
var dependencies$1j = ["typed"];
var createIsPositive = /* @__PURE__ */ factory(name$1k, dependencies$1j, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$1k, {
    number: isPositiveNumber,
    BigNumber: function BigNumber2(x) {
      return !x.isNeg() && !x.isZero() && !x.isNaN();
    },
    Fraction: function Fraction2(x) {
      return x.s > 0 && x.n > 0;
    },
    Unit: typed2.referToSelf((self) => (x) => typed2.find(self, x.valueType())(x.value)),
    "Array | Matrix": typed2.referToSelf((self) => (x) => deepMap(x, self))
  });
});
var name$1j = "isZero";
var dependencies$1i = ["typed"];
var createIsZero = /* @__PURE__ */ factory(name$1j, dependencies$1i, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$1j, {
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
    Unit: typed2.referToSelf((self) => (x) => typed2.find(self, x.valueType())(x.value)),
    "Array | Matrix": typed2.referToSelf((self) => (x) => deepMap(x, self))
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
    var diff = x.minus(y).abs();
    if (diff.isZero()) {
      return true;
    } else {
      var max2 = x.constructor.max(x.abs(), y.abs());
      return diff.lte(max2.times(epsilon));
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
    "Unit, Unit": typed2.referToSelf((self) => (x, y) => {
      if (!x.equalBase(y)) {
        throw new Error("Cannot compare units with different base");
      }
      return typed2.find(self, [x.valueType(), y.valueType()])(x.value, y.value);
    })
  };
});
var name$1i = "equalScalar";
var dependencies$1h = ["typed", "config"];
var createEqualScalar = /* @__PURE__ */ factory(name$1i, dependencies$1h, (_ref) => {
  var {
    typed: typed2,
    config: config3
  } = _ref;
  var compareUnits = createCompareUnits({
    typed: typed2
  });
  return typed2(name$1i, {
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
factory(name$1i, ["typed", "config"], (_ref2) => {
  var {
    typed: typed2,
    config: config3
  } = _ref2;
  return typed2(name$1i, {
    "number, number": function numberNumber(x, y) {
      return nearlyEqual$1(x, y, config3.epsilon);
    }
  });
});
var name$1h = "SparseMatrix";
var dependencies$1g = ["typed", "equalScalar", "Matrix"];
var createSparseMatrixClass = /* @__PURE__ */ factory(name$1h, dependencies$1g, (_ref) => {
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
      throw new TypeError("Unsupported type of data (" + typeOf(data) + ")");
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
      matrix2._values = source._values ? clone$2(source._values) : void 0;
      matrix2._index = clone$2(source._index);
      matrix2._ptr = clone$2(source._ptr);
      matrix2._size = clone$2(source._size);
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
        for (var i = 0; i < rows; i++) {
          var row = data[i];
          if (isArray(row)) {
            if (j === 0 && columns < row.length) {
              columns = row.length;
            }
            if (j < row.length) {
              var v = row[j];
              if (!eq(v, zero)) {
                matrix2._values.push(v);
                matrix2._index.push(i);
              }
            }
          } else {
            if (j === 0 && columns < 1) {
              columns = 1;
            }
            if (!eq(row, zero)) {
              matrix2._values.push(row);
              matrix2._index.push(i);
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
    return getArrayDataType(this._values, typeOf);
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
    var i, ii, k, kk;
    var min2 = idx.min();
    var max2 = idx.max();
    for (i = 0, ii = matrix2._size.length; i < ii; i++) {
      validateIndex(min2[i], matrix2._size[i]);
      validateIndex(max2[i], matrix2._size[i]);
    }
    var mvalues = matrix2._values;
    var mindex = matrix2._index;
    var mptr = matrix2._ptr;
    var rows = idx.dimension(0);
    var columns = idx.dimension(1);
    var w = [];
    var pv = [];
    rows.forEach(function(i2, r) {
      pv[i2] = r[0];
      w[i2] = true;
    });
    var values = mvalues ? [] : void 0;
    var index2 = [];
    var ptr = [];
    columns.forEach(function(j) {
      ptr.push(index2.length);
      for (k = mptr[j], kk = mptr[j + 1]; k < kk; k++) {
        i = mindex[k];
        if (w[i] === true) {
          index2.push(pv[i]);
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
        var i = 0;
        var outer = 0;
        while (iSize[i] === 1 && sSize[i] === 1) {
          i++;
        }
        while (iSize[i] === 1) {
          outer++;
          i++;
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
    var i = index2[0];
    var j = index2[1];
    validateIndex(i, this._size[0]);
    validateIndex(j, this._size[1]);
    var k = _getValueIndex(i, this._ptr[j], this._ptr[j + 1], this._index);
    if (k < this._ptr[j + 1] && this._index[k] === i) {
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
    var i = index2[0];
    var j = index2[1];
    var rows = this._size[0];
    var columns = this._size[1];
    var eq = equalScalar2;
    var zero = 0;
    if (isString(this._datatype)) {
      eq = typed2.find(equalScalar2, [this._datatype, this._datatype]) || equalScalar2;
      zero = typed2.convert(0, this._datatype);
    }
    if (i > rows - 1 || j > columns - 1) {
      _resize2(this, Math.max(i + 1, rows), Math.max(j + 1, columns), defaultValue);
      rows = this._size[0];
      columns = this._size[1];
    }
    validateIndex(i, rows);
    validateIndex(j, columns);
    var k = _getValueIndex(i, this._ptr[j], this._ptr[j + 1], this._index);
    if (k < this._ptr[j + 1] && this._index[k] === i) {
      if (!eq(v, zero)) {
        this._values[k] = v;
      } else {
        _remove(k, j, this._values, this._index, this._ptr);
      }
    } else {
      if (!eq(v, zero)) {
        _insert(k, i, j, v, this._values, this._index, this._ptr);
      }
    }
    return this;
  };
  function _getValueIndex(i, top, bottom, index2) {
    if (bottom - top === 0) {
      return bottom;
    }
    for (var r = top; r < bottom; r++) {
      if (index2[r] === i) {
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
  function _insert(k, i, j, v, values, index2, ptr) {
    values.splice(k, 0, v);
    index2.splice(k, 0, i);
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
        throw new TypeError("Invalid size, must contain positive integers (size: " + format(sizeArray) + ")");
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
    var i, j, k;
    if (columns > c) {
      for (j = c; j < columns; j++) {
        matrix2._ptr[j] = matrix2._values.length;
        if (ins) {
          for (i = 0; i < r; i++) {
            matrix2._values.push(value);
            matrix2._index.push(i);
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
          for (i = r; i < rows; i++, p++) {
            matrix2._values.splice(k + p, 0, value);
            matrix2._index.splice(k + p, 0, i);
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
          i = matrix2._index[k];
          if (i > rows - 1) {
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
        throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + format(sizes) + ")");
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
    for (var i = 0; i < m._ptr.length; i++) {
      for (var j = 0; j < m._ptr[i + 1] - m._ptr[i]; j++) {
        colIndex.push(i);
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
      values: this._values ? clone$2(this._values) : void 0,
      index: clone$2(this._index),
      ptr: clone$2(this._ptr),
      size: clone$2(this._size),
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
    var invoke = function invoke2(v, i, j) {
      if (args === 1)
        return callback(v);
      if (args === 2)
        return callback(v, [i, j]);
      return callback(v, [i, j], me);
    };
    return _map(this, 0, rows - 1, 0, columns - 1, invoke, skipZeros);
  };
  function _map(matrix2, minRow, maxRow, minColumn, maxColumn, callback, skipZeros) {
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
          var i = matrix2._index[k];
          if (i >= minRow && i <= maxRow) {
            invoke(matrix2._values[k], i - minRow, j - minColumn);
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
          var i = this._index[k];
          callback(this._values[k], [i, j], me);
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
        var i = this._index[k];
        yield {
          value: this._values[k],
          index: [i, j]
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
    var i, j;
    for (i = 0; i < rows; i++) {
      a[i] = [];
      for (j = 0; j < columns; j++) {
        a[i][j] = 0;
      }
    }
    for (j = 0; j < columns; j++) {
      var k0 = ptr[j];
      var k1 = ptr[j + 1];
      for (var k = k0; k < k1; k++) {
        i = index2[k];
        a[i][j] = values ? copy ? clone$2(values[k]) : values[k] : 1;
      }
    }
    return a;
  }
  SparseMatrix2.prototype.format = function(options) {
    var rows = this._size[0];
    var columns = this._size[1];
    var density = this.density();
    var str = "Sparse Matrix [" + format(rows, options) + " x " + format(columns, options) + "] density: " + format(density, options) + "\n";
    for (var j = 0; j < columns; j++) {
      var k0 = this._ptr[j];
      var k1 = this._ptr[j + 1];
      for (var k = k0; k < k1; k++) {
        var i = this._index[k];
        str += "\n    (" + format(i, options) + ", " + format(j, options) + ") ==> " + (this._values ? format(this._values[k], options) : "X");
      }
    }
    return str;
  };
  SparseMatrix2.prototype.toString = function() {
    return format(this.toArray());
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
        var i = this._index[x];
        if (i === j - kSuper + kSub) {
          values.push(this._values[x]);
          index2[values.length - 1] = i - kSub;
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
    var values = [];
    var index2 = [];
    var ptr = [];
    for (var j = 0; j < columns; j++) {
      ptr.push(values.length);
      var i = j - kSuper;
      if (i >= 0 && i < n) {
        var v = _value(i);
        if (!eq(v, zero)) {
          index2.push(i + kSub);
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
  SparseMatrix2.prototype.swapRows = function(i, j) {
    if (!isNumber(i) || !isInteger$1(i) || !isNumber(j) || !isInteger$1(j)) {
      throw new Error("Row index must be positive integers");
    }
    if (this._size.length !== 2) {
      throw new Error("Only two dimensional matrix is supported");
    }
    validateIndex(i, this._size[0]);
    validateIndex(j, this._size[0]);
    SparseMatrix2._swapRows(i, j, this._size[1], this._values, this._index, this._ptr);
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
var name$1g = "number";
var dependencies$1f = ["typed"];
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
  for (var i = 0; i < parts.fractionalPart.length; i++) {
    var digitValue = parseInt(parts.fractionalPart[i], parts.radix);
    f += digitValue / Math.pow(parts.radix, i + 1);
  }
  var result = n + f;
  if (isNaN(result)) {
    throw new SyntaxError('String "' + parts.input + '" is not a valid number');
  }
  return result;
}
var createNumber = /* @__PURE__ */ factory(name$1g, dependencies$1f, (_ref) => {
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
    string: function string(x) {
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
    Unit: typed2.referToSelf((self) => (x) => {
      var clone2 = x.clone();
      clone2.value = self(x.value);
      return clone2;
    }),
    null: function _null(x) {
      return 0;
    },
    "Unit, string | Unit": function UnitStringUnit(unit, valuelessUnit) {
      return unit.toNumber(valuelessUnit);
    },
    "Array | Matrix": typed2.referToSelf((self) => (x) => deepMap(x, self))
  });
  number2.fromJSON = function(json) {
    return parseFloat(json.value);
  };
  return number2;
});
var name$1f = "bignumber";
var dependencies$1e = ["typed", "BigNumber"];
var createBignumber = /* @__PURE__ */ factory(name$1f, dependencies$1e, (_ref) => {
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
    string: function string(x) {
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
    Unit: typed2.referToSelf((self) => (x) => {
      var clone2 = x.clone();
      clone2.value = self(x.value);
      return clone2;
    }),
    Fraction: function Fraction2(x) {
      return new BigNumber2(x.n).div(x.d).times(x.s);
    },
    null: function _null(x) {
      return new BigNumber2(0);
    },
    "Array | Matrix": typed2.referToSelf((self) => (x) => deepMap(x, self))
  });
});
var name$1e = "complex";
var dependencies$1d = ["typed", "Complex"];
var createComplex = /* @__PURE__ */ factory(name$1e, dependencies$1d, (_ref) => {
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
    string: function string(x) {
      return Complex2(x);
    },
    null: function _null(x) {
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
    "Array | Matrix": typed2.referToSelf((self) => (x) => deepMap(x, self))
  });
});
var name$1d = "fraction";
var dependencies$1c = ["typed", "Fraction"];
var createFraction = /* @__PURE__ */ factory(name$1d, dependencies$1c, (_ref) => {
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
    string: function string(x) {
      return new Fraction2(x);
    },
    "number, number": function numberNumber(numerator, denominator) {
      return new Fraction2(numerator, denominator);
    },
    null: function _null(x) {
      return new Fraction2(0);
    },
    BigNumber: function BigNumber2(x) {
      return new Fraction2(x.toString());
    },
    Fraction: function Fraction3(x) {
      return x;
    },
    Unit: typed2.referToSelf((self) => (x) => {
      var clone2 = x.clone();
      clone2.value = self(x.value);
      return clone2;
    }),
    Object: function Object2(x) {
      return new Fraction2(x);
    },
    "Array | Matrix": typed2.referToSelf((self) => (x) => deepMap(x, self))
  });
});
var name$1c = "matrix";
var dependencies$1b = ["typed", "Matrix", "DenseMatrix", "SparseMatrix"];
var createMatrix = /* @__PURE__ */ factory(name$1c, dependencies$1b, (_ref) => {
  var {
    typed: typed2,
    Matrix: Matrix2,
    DenseMatrix: DenseMatrix2,
    SparseMatrix: SparseMatrix2
  } = _ref;
  return typed2(name$1c, {
    "": function _() {
      return _create([]);
    },
    string: function string(format2) {
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
var name$1b = "matrixFromColumns";
var dependencies$1a = ["typed", "matrix", "flatten", "size"];
var createMatrixFromColumns = /* @__PURE__ */ factory(name$1b, dependencies$1a, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    flatten: flatten2,
    size: size2
  } = _ref;
  return typed2(name$1b, {
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
    for (var i = 0; i < N; i++) {
      result[i] = [];
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
var name$1a = "unaryMinus";
var dependencies$19 = ["typed"];
var createUnaryMinus = /* @__PURE__ */ factory(name$1a, dependencies$19, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$1a, {
    number: unaryMinusNumber,
    "Complex | BigNumber | Fraction": (x) => x.neg(),
    Unit: typed2.referToSelf((self) => (x) => {
      var res = x.clone();
      res.value = typed2.find(self, res.valueType())(x.value);
      return res;
    }),
    // deep map collection, skip zeros since unaryMinus(0) = 0
    "Array | Matrix": typed2.referToSelf((self) => (x) => deepMap(x, self))
    // TODO: add support for string
  });
});
var name$19 = "abs";
var dependencies$18 = ["typed"];
var createAbs = /* @__PURE__ */ factory(name$19, dependencies$18, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$19, {
    number: absNumber,
    "Complex | BigNumber | Fraction | Unit": (x) => x.abs(),
    // deep map collection, skip zeros since abs(0) = 0
    "Array | Matrix": typed2.referToSelf((self) => (x) => deepMap(x, self))
  });
});
var name$18 = "addScalar";
var dependencies$17 = ["typed"];
var createAddScalar = /* @__PURE__ */ factory(name$18, dependencies$17, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$18, {
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
    "Unit, Unit": typed2.referToSelf((self) => (x, y) => {
      if (x.value === null || x.value === void 0) {
        throw new Error("Parameter x contains a unit with undefined value");
      }
      if (y.value === null || y.value === void 0) {
        throw new Error("Parameter y contains a unit with undefined value");
      }
      if (!x.equalBase(y))
        throw new Error("Units do not match");
      var res = x.clone();
      res.value = typed2.find(self, [res.valueType(), y.valueType()])(res.value, y.value);
      res.fixPrefix = false;
      return res;
    })
  });
});
var name$17 = "subtractScalar";
var dependencies$16 = ["typed"];
var createSubtractScalar = /* @__PURE__ */ factory(name$17, dependencies$16, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$17, {
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
    "Unit, Unit": typed2.referToSelf((self) => (x, y) => {
      if (x.value === null || x.value === void 0) {
        throw new Error("Parameter x contains a unit with undefined value");
      }
      if (y.value === null || y.value === void 0) {
        throw new Error("Parameter y contains a unit with undefined value");
      }
      if (!x.equalBase(y))
        throw new Error("Units do not match");
      var res = x.clone();
      res.value = typed2.find(self, [res.valueType(), y.valueType()])(res.value, y.value);
      res.fixPrefix = false;
      return res;
    })
  });
});
var name$16 = "matAlgo11xS0s";
var dependencies$15 = ["typed", "equalScalar"];
var createMatAlgo11xS0s = /* @__PURE__ */ factory(name$16, dependencies$15, (_ref) => {
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
        var i = aindex[k];
        var v = inverse ? cf(b, avalues[k]) : cf(avalues[k], b);
        if (!eq(v, zero)) {
          cindex.push(i);
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
var name$15 = "matAlgo12xSfs";
var dependencies$14 = ["typed", "DenseMatrix"];
var createMatAlgo12xSfs = /* @__PURE__ */ factory(name$15, dependencies$14, (_ref) => {
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
      for (var i = 0; i < rows; i++) {
        if (j === 0) {
          cdata[i] = [];
        }
        if (w[i] === mark) {
          cdata[i][j] = inverse ? cf(b, x[i]) : cf(x[i], b);
        } else {
          cdata[i][j] = inverse ? cf(b, 0) : cf(0, b);
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
var name$14 = "matAlgo14xDs";
var dependencies$13 = ["typed"];
var createMatAlgo14xDs = /* @__PURE__ */ factory(name$14, dependencies$13, (_ref) => {
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
      size: clone$2(asize),
      datatype: dt
    });
  };
  function _iterate(f, level, s, n, av, bv, inverse) {
    var cv = [];
    if (level === s.length - 1) {
      for (var i = 0; i < n; i++) {
        cv[i] = inverse ? f(bv, av[i]) : f(av[i], bv);
      }
    } else {
      for (var j = 0; j < n; j++) {
        cv[j] = _iterate(f, level + 1, s, s[level + 1], av[j], bv, inverse);
      }
    }
    return cv;
  }
});
var name$13 = "matAlgo03xDSf";
var dependencies$12 = ["typed"];
var createMatAlgo03xDSf = /* @__PURE__ */ factory(name$13, dependencies$12, (_ref) => {
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
        var i = bindex[k];
        x[i] = inverse ? cf(bvalues[k], adata[i][j]) : cf(adata[i][j], bvalues[k]);
        w[i] = mark;
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
var name$12 = "matAlgo05xSfSf";
var dependencies$11 = ["typed", "equalScalar"];
var createMatAlgo05xSfSf = /* @__PURE__ */ factory(name$12, dependencies$11, (_ref) => {
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
    var i, j, k, k1;
    for (j = 0; j < columns; j++) {
      cptr[j] = cindex.length;
      var mark = j + 1;
      for (k = aptr[j], k1 = aptr[j + 1]; k < k1; k++) {
        i = aindex[k];
        cindex.push(i);
        wa[i] = mark;
        if (xa) {
          xa[i] = avalues[k];
        }
      }
      for (k = bptr[j], k1 = bptr[j + 1]; k < k1; k++) {
        i = bindex[k];
        if (wa[i] !== mark) {
          cindex.push(i);
        }
        wb[i] = mark;
        if (xb) {
          xb[i] = bvalues[k];
        }
      }
      if (cvalues) {
        k = cptr[j];
        while (k < cindex.length) {
          i = cindex[k];
          var wai = wa[i];
          var wbi = wb[i];
          if (wai === mark || wbi === mark) {
            var va = wai === mark ? xa[i] : zero;
            var vb = wbi === mark ? xb[i] : zero;
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
var name$11 = "matAlgo13xDD";
var dependencies$10 = ["typed"];
var createMatAlgo13xDD = /* @__PURE__ */ factory(name$11, dependencies$10, (_ref) => {
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
      for (var i = 0; i < n; i++) {
        cv[i] = f(av[i], bv[i]);
      }
    } else {
      for (var j = 0; j < n; j++) {
        cv[j] = _iterate(f, level + 1, s, s[level + 1], av[j], bv[j]);
      }
    }
    return cv;
  }
});
var name$10 = "broadcast";
var dependancies = ["concat"];
var createBroadcast = /* @__PURE__ */ factory(name$10, dependancies, (_ref) => {
  var {
    concat: concat2
  } = _ref;
  return function(A, B) {
    var N = Math.max(A._size.length, B._size.length);
    if (A._size.length === B._size.length) {
      if (A._size.every((dim2, i) => dim2 === B._size[i])) {
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
var name$$ = "matrixAlgorithmSuite";
var dependencies$$ = ["typed", "matrix", "concat"];
var createMatrixAlgorithmSuite = /* @__PURE__ */ factory(name$$, dependencies$$, (_ref) => {
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
        "DenseMatrix, DenseMatrix": typed2.referToSelf((self) => (x, y) => {
          return matAlgo13xDD(...broadcast(x, y), self);
        }),
        "Array, Array": typed2.referToSelf((self) => (x, y) => {
          return matAlgo13xDD(...broadcast(matrix2(x), matrix2(y)), self).valueOf();
        }),
        "Array, DenseMatrix": typed2.referToSelf((self) => (x, y) => {
          return matAlgo13xDD(...broadcast(matrix2(x), y), self);
        }),
        "DenseMatrix, Array": typed2.referToSelf((self) => (x, y) => {
          return matAlgo13xDD(...broadcast(x, matrix2(y)), self);
        })
      };
      if (options.SS) {
        matrixSignatures["SparseMatrix, SparseMatrix"] = typed2.referToSelf((self) => (x, y) => {
          return options.SS(...broadcast(x, y), self, false);
        });
      }
      if (options.DS) {
        matrixSignatures["DenseMatrix, SparseMatrix"] = typed2.referToSelf((self) => (x, y) => {
          return options.DS(...broadcast(x, y), self, false);
        });
        matrixSignatures["Array, SparseMatrix"] = typed2.referToSelf((self) => (x, y) => {
          return options.DS(...broadcast(matrix2(x), y), self, false);
        });
      }
      if (SD) {
        matrixSignatures["SparseMatrix, DenseMatrix"] = typed2.referToSelf((self) => (x, y) => {
          return SD(...broadcast(y, x), self, true);
        });
        matrixSignatures["SparseMatrix, Array"] = typed2.referToSelf((self) => (x, y) => {
          return SD(...broadcast(matrix2(y), x), self, true);
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
        matrixSignatures["DenseMatrix," + scalar] = typed2.referToSelf((self) => (x, y) => {
          return matAlgo14xDs(x, y, self, false);
        });
        matrixSignatures[scalar + ", DenseMatrix"] = typed2.referToSelf((self) => (x, y) => {
          return matAlgo14xDs(y, x, self, true);
        });
        matrixSignatures["Array," + scalar] = typed2.referToSelf((self) => (x, y) => {
          return matAlgo14xDs(matrix2(x), y, self, false).valueOf();
        });
        matrixSignatures[scalar + ", Array"] = typed2.referToSelf((self) => (x, y) => {
          return matAlgo14xDs(matrix2(y), x, self, true).valueOf();
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
        matrixSignatures["SparseMatrix," + scalar] = typed2.referToSelf((self) => (x, y) => {
          return options.Ss(x, y, self, false);
        });
      }
      if (sS) {
        matrixSignatures[scalar + ", SparseMatrix"] = typed2.referToSelf((self) => (x, y) => {
          return sS(y, x, self, true);
        });
      }
    }
    if (elop && elop.signatures) {
      extend(matrixSignatures, elop.signatures);
    }
    return matrixSignatures;
  };
});
var name$_ = "matAlgo01xDSid";
var dependencies$_ = ["typed"];
var createMatAlgo01xDSid = /* @__PURE__ */ factory(name$_, dependencies$_, (_ref) => {
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
    var i, j;
    var cdata = [];
    for (i = 0; i < rows; i++) {
      cdata[i] = [];
    }
    var x = [];
    var w = [];
    for (j = 0; j < columns; j++) {
      var mark = j + 1;
      for (var k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
        i = bindex[k];
        x[i] = inverse ? cf(bvalues[k], adata[i][j]) : cf(adata[i][j], bvalues[k]);
        w[i] = mark;
      }
      for (i = 0; i < rows; i++) {
        if (w[i] === mark) {
          cdata[i][j] = x[i];
        } else {
          cdata[i][j] = adata[i][j];
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
var name$Z = "matAlgo04xSidSid";
var dependencies$Z = ["typed", "equalScalar"];
var createMatAlgo04xSidSid = /* @__PURE__ */ factory(name$Z, dependencies$Z, (_ref) => {
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
    var i, j, k, k0, k1;
    for (j = 0; j < columns; j++) {
      cptr[j] = cindex.length;
      var mark = j + 1;
      for (k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
        i = aindex[k];
        cindex.push(i);
        wa[i] = mark;
        if (xa) {
          xa[i] = avalues[k];
        }
      }
      for (k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
        i = bindex[k];
        if (wa[i] === mark) {
          if (xa) {
            var v = cf(xa[i], bvalues[k]);
            if (!eq(v, zero)) {
              xa[i] = v;
            } else {
              wa[i] = null;
            }
          }
        } else {
          cindex.push(i);
          wb[i] = mark;
          if (xb) {
            xb[i] = bvalues[k];
          }
        }
      }
      if (xa && xb) {
        k = cptr[j];
        while (k < cindex.length) {
          i = cindex[k];
          if (wa[i] === mark) {
            cvalues[k] = xa[i];
            k++;
          } else if (wb[i] === mark) {
            cvalues[k] = xb[i];
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
var name$Y = "matAlgo10xSids";
var dependencies$Y = ["typed", "DenseMatrix"];
var createMatAlgo10xSids = /* @__PURE__ */ factory(name$Y, dependencies$Y, (_ref) => {
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
      for (var i = 0; i < rows; i++) {
        if (j === 0) {
          cdata[i] = [];
        }
        if (w[i] === mark) {
          cdata[i][j] = inverse ? cf(b, x[i]) : cf(x[i], b);
        } else {
          cdata[i][j] = b;
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
var name$X = "multiplyScalar";
var dependencies$X = ["typed"];
var createMultiplyScalar = /* @__PURE__ */ factory(name$X, dependencies$X, (_ref) => {
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
var name$W = "multiply";
var dependencies$W = ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"];
var createMultiply = /* @__PURE__ */ factory(name$W, dependencies$W, (_ref) => {
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
      for (var i = 1; i < alength; i++) {
        sum2 = af(sum2, mf(adata[i], bdata[i][j]));
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
    for (var i = 0; i < arows; i++) {
      var row = adata[i];
      var sum2 = mf(row[0], bdata[0]);
      for (var j = 1; j < acolumns; j++) {
        sum2 = af(sum2, mf(row[j], bdata[j]));
      }
      c[i] = sum2;
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
    for (var i = 0; i < arows; i++) {
      var row = adata[i];
      c[i] = [];
      for (var j = 0; j < bcolumns; j++) {
        var sum2 = mf(row[0], bdata[0][j]);
        for (var x = 1; x < acolumns; x++) {
          sum2 = af(sum2, mf(row[x], bdata[x][j]));
        }
        c[i][j] = sum2;
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
        for (var i = 0; i < arows; i++) {
          var mark = i + 1;
          var cij = void 0;
          for (var kb = kb0; kb < kb1; kb++) {
            var ib = bindex[kb];
            if (last !== mark) {
              cij = mf(adata[i][ib], bvalues[kb]);
              last = mark;
            } else {
              cij = af(cij, mf(adata[i][ib], bvalues[kb]));
            }
          }
          if (last === mark && !eq(cij, zero)) {
            cindex.push(i);
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
  return typed2(name$W, multiplyScalar2, {
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
    "Array, Matrix": typed2.referToSelf((self) => (x, y) => {
      return self(matrix2(x, y.storage()), y);
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
    "any, any, ...any": typed2.referToSelf((self) => (x, y, rest) => {
      var result = self(x, y);
      for (var i = 0; i < rest.length; i++) {
        result = self(result, rest[i]);
      }
      return result;
    })
  });
});
var name$V = "sign";
var dependencies$V = ["typed", "BigNumber", "Fraction", "complex"];
var createSign = /* @__PURE__ */ factory(name$V, dependencies$V, (_ref) => {
  var {
    typed: typed2,
    BigNumber: _BigNumber,
    complex: complex2,
    Fraction: _Fraction
  } = _ref;
  return typed2(name$V, {
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
    "Array | Matrix": typed2.referToSelf((self) => (x) => deepMap(x, self)),
    Unit: typed2.referToSelf((self) => (x) => {
      if (!x._isDerived() && x.units[0].unit.offset !== 0) {
        throw new TypeError("sign is ambiguous for units with offset");
      }
      return typed2.find(self, x.valueType())(x.value);
    })
  });
});
var name$U = "sqrt";
var dependencies$U = ["config", "typed", "Complex"];
var createSqrt = /* @__PURE__ */ factory(name$U, dependencies$U, (_ref) => {
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
    Unit: function Unit(x) {
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
var name$T = "subtract";
var dependencies$T = ["typed", "matrix", "equalScalar", "subtractScalar", "unaryMinus", "DenseMatrix", "concat"];
var createSubtract = /* @__PURE__ */ factory(name$T, dependencies$T, (_ref) => {
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
  return typed2(name$T, {
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
var name$S = "matAlgo07xSSf";
var dependencies$S = ["typed", "DenseMatrix"];
var createMatAlgo07xSSf = /* @__PURE__ */ factory(name$S, dependencies$S, (_ref) => {
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
    var i, j;
    var cdata = [];
    for (i = 0; i < rows; i++) {
      cdata[i] = [];
    }
    var xa = [];
    var xb = [];
    var wa = [];
    var wb = [];
    for (j = 0; j < columns; j++) {
      var mark = j + 1;
      _scatter(a, j, wa, xa, mark);
      _scatter(b, j, wb, xb, mark);
      for (i = 0; i < rows; i++) {
        var va = wa[i] === mark ? xa[i] : zero;
        var vb = wb[i] === mark ? xb[i] : zero;
        cdata[i][j] = cf(va, vb);
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
      var i = index2[k];
      w[i] = mark;
      x[i] = values[k];
    }
  }
});
var name$R = "conj";
var dependencies$R = ["typed"];
var createConj = /* @__PURE__ */ factory(name$R, dependencies$R, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$R, {
    "number | BigNumber | Fraction": (x) => x,
    Complex: (x) => x.conjugate(),
    "Array | Matrix": typed2.referToSelf((self) => (x) => deepMap(x, self))
  });
});
var name$Q = "im";
var dependencies$Q = ["typed"];
var createIm = /* @__PURE__ */ factory(name$Q, dependencies$Q, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$Q, {
    number: () => 0,
    "BigNumber | Fraction": (x) => x.mul(0),
    Complex: (x) => x.im,
    "Array | Matrix": typed2.referToSelf((self) => (x) => deepMap(x, self))
  });
});
var name$P = "re";
var dependencies$P = ["typed"];
var createRe = /* @__PURE__ */ factory(name$P, dependencies$P, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$P, {
    "number | BigNumber | Fraction": (x) => x,
    Complex: (x) => x.re,
    "Array | Matrix": typed2.referToSelf((self) => (x) => deepMap(x, self))
  });
});
var name$O = "concat";
var dependencies$O = ["typed", "matrix", "isInteger"];
var createConcat = /* @__PURE__ */ factory(name$O, dependencies$O, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    isInteger: isInteger2
  } = _ref;
  return typed2(name$O, {
    // TODO: change signature to '...Array | Matrix, dim?' when supported
    "...Array | Matrix | number | BigNumber": function ArrayMatrixNumberBigNumber(args) {
      var i;
      var len = args.length;
      var dim = -1;
      var prevDim;
      var asMatrix = false;
      var matrices = [];
      for (i = 0; i < len; i++) {
        var arg = args[i];
        if (isMatrix(arg)) {
          asMatrix = true;
        }
        if (isNumber(arg) || isBigNumber(arg)) {
          if (i !== len - 1) {
            throw new Error("Dimension must be specified as last argument");
          }
          prevDim = dim;
          dim = arg.valueOf();
          if (!isInteger2(dim)) {
            throw new TypeError("Integer number expected for dimension");
          }
          if (dim < 0 || i > 0 && dim > prevDim) {
            throw new IndexError(dim, prevDim + 1);
          }
        } else {
          var m = clone$2(arg).valueOf();
          var size2 = arraySize(m);
          matrices[i] = m;
          prevDim = dim;
          dim = size2.length - 1;
          if (i > 0 && dim !== prevDim) {
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
    "...string": function string(args) {
      return args.join("");
    }
  });
});
var name$N = "column";
var dependencies$N = ["typed", "Index", "matrix", "range"];
var createColumn = /* @__PURE__ */ factory(name$N, dependencies$N, (_ref) => {
  var {
    typed: typed2,
    Index: Index2,
    matrix: matrix2,
    range: range2
  } = _ref;
  return typed2(name$N, {
    "Matrix, number": _column,
    "Array, number": function ArrayNumber(value, column2) {
      return _column(matrix2(clone$2(value)), column2).valueOf();
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
var name$M = "diag";
var dependencies$M = ["typed", "matrix", "DenseMatrix", "SparseMatrix"];
var createDiag = /* @__PURE__ */ factory(name$M, dependencies$M, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    DenseMatrix: DenseMatrix2,
    SparseMatrix: SparseMatrix2
  } = _ref;
  return typed2(name$M, {
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
    for (var i = 0; i < n; i++) {
      vector[i] = x[i + kSub][i + kSuper];
    }
    return format2 !== null ? matrix2(vector) : vector;
  }
});
var name$L = "flatten";
var dependencies$L = ["typed", "matrix"];
var createFlatten = /* @__PURE__ */ factory(name$L, dependencies$L, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2
  } = _ref;
  return typed2(name$L, {
    Array: function Array2(x) {
      return flatten$1(x);
    },
    Matrix: function Matrix2(x) {
      var flat = flatten$1(x.toArray());
      return matrix2(flat);
    }
  });
});
var name$K = "getMatrixDataType";
var dependencies$K = ["typed"];
var createGetMatrixDataType = /* @__PURE__ */ factory(name$K, dependencies$K, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return typed2(name$K, {
    Array: function Array2(x) {
      return getArrayDataType(x, typeOf);
    },
    Matrix: function Matrix2(x) {
      return x.getDataType();
    }
  });
});
var name$J = "identity";
var dependencies$J = ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"];
var createIdentity = /* @__PURE__ */ factory(name$J, dependencies$J, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    matrix: matrix2,
    BigNumber: BigNumber2,
    DenseMatrix: DenseMatrix2,
    SparseMatrix: SparseMatrix2
  } = _ref;
  return typed2(name$J, {
    "": function _() {
      return config3.matrix === "Matrix" ? matrix2([]) : [];
    },
    string: function string(format2) {
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
    var res = resize([], size2, defaultValue);
    var minimum = rows < cols ? rows : cols;
    for (var d = 0; d < minimum; d++) {
      res[d][d] = one;
    }
    return res;
  }
});
var name$I = "kron";
var dependencies$I = ["typed", "matrix", "multiplyScalar"];
var createKron = /* @__PURE__ */ factory(name$I, dependencies$I, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    multiplyScalar: multiplyScalar2
  } = _ref;
  return typed2(name$I, {
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
function noBignumber() {
  throw new Error('No "bignumber" implementation available');
}
function noFraction() {
  throw new Error('No "fraction" implementation available');
}
function noMatrix() {
  throw new Error('No "matrix" implementation available');
}
var name$H = "range";
var dependencies$H = ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq", "add", "isPositive"];
var createRange = /* @__PURE__ */ factory(name$H, dependencies$H, (_ref) => {
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
  return typed2(name$H, {
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
    var nums = args.map(function(arg) {
      return Number(arg);
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
var name$G = "reshape";
var dependencies$G = ["typed", "isInteger", "matrix"];
var createReshape = /* @__PURE__ */ factory(name$G, dependencies$G, (_ref) => {
  var {
    typed: typed2,
    isInteger: isInteger2
  } = _ref;
  return typed2(name$G, {
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
var name$F = "size";
var dependencies$F = ["typed", "config", "?matrix"];
var createSize = /* @__PURE__ */ factory(name$F, dependencies$F, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    matrix: matrix2
  } = _ref;
  return typed2(name$F, {
    Matrix: function Matrix2(x) {
      return x.create(x.size());
    },
    Array: arraySize,
    string: function string(x) {
      return config3.matrix === "Array" ? [x.length] : matrix2([x.length]);
    },
    "number | Complex | BigNumber | Unit | boolean | null": function numberComplexBigNumberUnitBooleanNull(x) {
      return config3.matrix === "Array" ? [] : matrix2 ? matrix2([]) : noMatrix();
    }
  });
});
var name$E = "subset";
var dependencies$E = ["typed", "matrix", "zeros", "add"];
var createSubset = /* @__PURE__ */ factory(name$E, dependencies$E, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    zeros: zeros2,
    add: add2
  } = _ref;
  return typed2(name$E, {
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
  for (var i = 0; i < strLen; i++) {
    chars[i] = str.charAt(i);
  }
  range2.forEach(function(v, i2) {
    chars[v] = replacement.charAt(i2[0]);
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
  var updated = clone$2(object);
  setSafeProperty(updated, key, replacement);
  return updated;
}
var name$D = "transpose";
var dependencies$D = ["typed", "matrix"];
var createTranspose = /* @__PURE__ */ factory(name$D, dependencies$D, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2
  } = _ref;
  return typed2(name$D, {
    Array: (x) => transposeMatrix(matrix2(x)).valueOf(),
    Matrix: transposeMatrix,
    any: clone$2
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
            throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + format(size2) + ")");
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
        throw new RangeError("Matrix must be a vector or two dimensional (size: " + format(size2) + ")");
    }
    return c;
  }
  function _denseTranspose(m, rows, columns) {
    var data = m._data;
    var transposed = [];
    var transposedRow;
    for (var j = 0; j < columns; j++) {
      transposedRow = transposed[j] = [];
      for (var i = 0; i < rows; i++) {
        transposedRow[i] = clone$2(data[i][j]);
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
    for (var i = 0; i < rows; i++) {
      cptr.push(sum2);
      sum2 += w[i];
      w[i] = cptr[i];
    }
    cptr.push(sum2);
    for (j = 0; j < columns; j++) {
      for (var k0 = ptr[j], k1 = ptr[j + 1], k = k0; k < k1; k++) {
        var q = w[index2[k]]++;
        cindex[q] = j;
        if (values) {
          cvalues[q] = clone$2(values[k]);
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
var name$C = "ctranspose";
var dependencies$C = ["typed", "transpose", "conj"];
var createCtranspose = /* @__PURE__ */ factory(name$C, dependencies$C, (_ref) => {
  var {
    typed: typed2,
    transpose: transpose2,
    conj: conj2
  } = _ref;
  return typed2(name$C, {
    any: function any(x) {
      return conj2(transpose2(x));
    }
  });
});
var name$B = "zeros";
var dependencies$B = ["typed", "config", "matrix", "BigNumber"];
var createZeros = /* @__PURE__ */ factory(name$B, dependencies$B, (_ref) => {
  var {
    typed: typed2,
    config: config3,
    matrix: matrix2,
    BigNumber: BigNumber2
  } = _ref;
  return typed2(name$B, {
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
        return resize(arr, size2, defaultValue);
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
var name$A = "numeric";
var dependencies$A = ["number", "?bignumber", "?fraction"];
var createNumeric = /* @__PURE__ */ factory(name$A, dependencies$A, (_ref) => {
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
    var inputType = typeOf(value);
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
var name$z = "divideScalar";
var dependencies$z = ["typed", "numeric"];
var createDivideScalar = /* @__PURE__ */ factory(name$z, dependencies$z, (_ref) => {
  var {
    typed: typed2,
    numeric: numeric2
  } = _ref;
  return typed2(name$z, {
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
var name$y = "pow";
var dependencies$y = ["typed", "config", "identity", "multiply", "matrix", "inv", "fraction", "number", "Complex"];
var createPow = /* @__PURE__ */ factory(name$y, dependencies$y, (_ref) => {
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
  return typed2(name$y, {
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
function createSolveValidation(_ref) {
  var {
    DenseMatrix: DenseMatrix2
  } = _ref;
  return function solveValidation(m, b, copy) {
    var mSize = m.size();
    if (mSize.length !== 2) {
      throw new RangeError("Matrix must be two dimensional (size: " + format(mSize) + ")");
    }
    var rows = mSize[0];
    var columns = mSize[1];
    if (rows !== columns) {
      throw new RangeError("Matrix must be square (size: " + format(mSize) + ")");
    }
    var data = [];
    if (isMatrix(b)) {
      var bSize = b.size();
      var bdata = b._data;
      if (bSize.length === 1) {
        if (bSize[0] !== rows) {
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        }
        for (var i = 0; i < rows; i++) {
          data[i] = [bdata[i]];
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
var name$x = "lsolve";
var dependencies$x = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"];
var createLsolve = /* @__PURE__ */ factory(name$x, dependencies$x, (_ref) => {
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
  return typed2(name$x, {
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
        for (var i = j + 1; i < rows; i++) {
          bdata[i] = [subtractScalar2(bdata[i][0] || 0, multiplyScalar2(xj, mdata[i][j]))];
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
          var i = index2[k];
          if (i === j) {
            vjj = values[k];
          } else if (i > j) {
            jValues.push(values[k]);
            jIndices.push(i);
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
var name$w = "usolve";
var dependencies$w = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"];
var createUsolve = /* @__PURE__ */ factory(name$w, dependencies$w, (_ref) => {
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
  return typed2(name$w, {
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
        for (var i = j - 1; i >= 0; i--) {
          bdata[i] = [subtractScalar2(bdata[i][0] || 0, multiplyScalar2(xj, mdata[i][j]))];
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
          var i = index2[k];
          if (i === j) {
            vjj = values[k];
          } else if (i < j) {
            jValues.push(values[k]);
            jIndices.push(i);
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
var name$v = "usolveAll";
var dependencies$v = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"];
var createUsolveAll = /* @__PURE__ */ factory(name$v, dependencies$v, (_ref) => {
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
  return typed2(name$v, {
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
    var B = [solveValidation(m, b_, true)._data.map((e) => e[0])];
    var M = m._data;
    var rows = m._size[0];
    var columns = m._size[1];
    for (var i = columns - 1; i >= 0; i--) {
      var L = B.length;
      for (var k = 0; k < L; k++) {
        var b = B[k];
        if (!equalScalar2(M[i][i], 0)) {
          b[i] = divideScalar2(b[i], M[i][i]);
          for (var j = i - 1; j >= 0; j--) {
            b[j] = subtractScalar2(b[j], multiplyScalar2(b[i], M[j][i]));
          }
        } else if (!equalScalar2(b[i], 0)) {
          if (k === 0) {
            return [];
          } else {
            B.splice(k, 1);
            k -= 1;
            L -= 1;
          }
        } else if (k === 0) {
          var bNew = [...b];
          bNew[i] = 1;
          for (var _j = i - 1; _j >= 0; _j--) {
            bNew[_j] = subtractScalar2(bNew[_j], M[_j][i]);
          }
          B.push(bNew);
        }
      }
    }
    return B.map((x) => new DenseMatrix2({
      data: x.map((e) => [e]),
      size: [rows, 1]
    }));
  }
  function _sparseBackwardSubstitution(m, b_) {
    var B = [solveValidation(m, b_, true)._data.map((e) => e[0])];
    var rows = m._size[0];
    var columns = m._size[1];
    var values = m._values;
    var index2 = m._index;
    var ptr = m._ptr;
    for (var i = columns - 1; i >= 0; i--) {
      var L = B.length;
      for (var k = 0; k < L; k++) {
        var b = B[k];
        var iValues = [];
        var iIndices = [];
        var firstIndex = ptr[i];
        var lastIndex = ptr[i + 1];
        var Mii = 0;
        for (var j = lastIndex - 1; j >= firstIndex; j--) {
          var J = index2[j];
          if (J === i) {
            Mii = values[j];
          } else if (J < i) {
            iValues.push(values[j]);
            iIndices.push(J);
          }
        }
        if (!equalScalar2(Mii, 0)) {
          b[i] = divideScalar2(b[i], Mii);
          for (var _j2 = 0, _lastIndex = iIndices.length; _j2 < _lastIndex; _j2++) {
            var _J = iIndices[_j2];
            b[_J] = subtractScalar2(b[_J], multiplyScalar2(b[i], iValues[_j2]));
          }
        } else if (!equalScalar2(b[i], 0)) {
          if (k === 0) {
            return [];
          } else {
            B.splice(k, 1);
            k -= 1;
            L -= 1;
          }
        } else if (k === 0) {
          var bNew = [...b];
          bNew[i] = 1;
          for (var _j3 = 0, _lastIndex2 = iIndices.length; _j3 < _lastIndex2; _j3++) {
            var _J2 = iIndices[_j3];
            bNew[_J2] = subtractScalar2(bNew[_J2], iValues[_j3]);
          }
          B.push(bNew);
        }
      }
    }
    return B.map((x) => new DenseMatrix2({
      data: x.map((e) => [e]),
      size: [rows, 1]
    }));
  }
});
var name$u = "compare";
var dependencies$u = ["typed", "config", "matrix", "equalScalar", "BigNumber", "Fraction", "DenseMatrix", "concat"];
var createCompare = /* @__PURE__ */ factory(name$u, dependencies$u, (_ref) => {
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
  return typed2(name$u, createCompareNumber({
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
var createCompareNumber = /* @__PURE__ */ factory(name$u, ["typed", "config"], (_ref2) => {
  var {
    typed: typed2,
    config: config3
  } = _ref2;
  return typed2(name$u, {
    "number, number": function numberNumber(x, y) {
      return nearlyEqual$1(x, y, config3.epsilon) ? 0 : x > y ? 1 : -1;
    }
  });
});
var naturalSort = function naturalSort2(a, b) {
  var re2 = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi, sre = /(^[ ]*|[ ]*$)/g, dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/, hre = /^0x[0-9a-f]+$/i, ore = /^0/, i = function(s) {
    return naturalSort2.insensitive && ("" + s).toLowerCase() || "" + s;
  }, x = i(a).replace(sre, "") || "", y = i(b).replace(sre, "") || "", xN = x.replace(re2, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"), yN = y.replace(re2, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"), xD = parseInt(x.match(hre), 16) || xN.length !== 1 && x.match(dre) && Date.parse(x), yD = parseInt(y.match(hre), 16) || xD && y.match(dre) && Date.parse(y) || null, oFxNcL, oFyNcL;
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
var name$t = "compareNatural";
var dependencies$t = ["typed", "compare"];
var createCompareNatural = /* @__PURE__ */ factory(name$t, dependencies$t, (_ref) => {
  var {
    typed: typed2,
    compare: compare2
  } = _ref;
  var compareBooleans = compare2.signatures["boolean,boolean"];
  return typed2(name$t, {
    "any, any": _compareNatural
  });
  function _compareNatural(x, y) {
    var typeX = typeOf(x);
    var typeY = typeOf(y);
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
    for (var i = 0, ii = Math.min(x.length, y.length); i < ii; i++) {
      var v = compareNatural2(x[i], y[i]);
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
    for (var i = 0; i < keysX.length; i++) {
      var v = compareNatural2(x[keysX[i]], y[keysY[i]]);
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
var name$s = "equal";
var dependencies$s = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat"];
var createEqual = /* @__PURE__ */ factory(name$s, dependencies$s, (_ref) => {
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
  return typed2(name$s, createEqualNumber({
    typed: typed2,
    equalScalar: equalScalar2
  }), matrixAlgorithmSuite({
    elop: equalScalar2,
    SS: matAlgo07xSSf,
    DS: matAlgo03xDSf,
    Ss: matAlgo12xSfs
  }));
});
var createEqualNumber = factory(name$s, ["typed", "equalScalar"], (_ref2) => {
  var {
    typed: typed2,
    equalScalar: equalScalar2
  } = _ref2;
  return typed2(name$s, {
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
var name$r = "smaller";
var dependencies$r = ["typed", "config", "matrix", "DenseMatrix", "concat"];
var createSmaller = /* @__PURE__ */ factory(name$r, dependencies$r, (_ref) => {
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
  return typed2(name$r, createSmallerNumber({
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
var createSmallerNumber = /* @__PURE__ */ factory(name$r, ["typed", "config"], (_ref2) => {
  var {
    typed: typed2,
    config: config3
  } = _ref2;
  return typed2(name$r, {
    "number, number": function numberNumber(x, y) {
      return x < y && !nearlyEqual$1(x, y, config3.epsilon);
    }
  });
});
var name$q = "smallerEq";
var dependencies$q = ["typed", "config", "matrix", "DenseMatrix", "concat"];
var createSmallerEq = /* @__PURE__ */ factory(name$q, dependencies$q, (_ref) => {
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
  return typed2(name$q, createSmallerEqNumber({
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
var createSmallerEqNumber = /* @__PURE__ */ factory(name$q, ["typed", "config"], (_ref2) => {
  var {
    typed: typed2,
    config: config3
  } = _ref2;
  return typed2(name$q, {
    "number, number": function numberNumber(x, y) {
      return x <= y || nearlyEqual$1(x, y, config3.epsilon);
    }
  });
});
var name$p = "larger";
var dependencies$p = ["typed", "config", "matrix", "DenseMatrix", "concat"];
var createLarger = /* @__PURE__ */ factory(name$p, dependencies$p, (_ref) => {
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
  return typed2(name$p, createLargerNumber({
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
var createLargerNumber = /* @__PURE__ */ factory(name$p, ["typed", "config"], (_ref2) => {
  var {
    typed: typed2,
    config: config3
  } = _ref2;
  return typed2(name$p, {
    "number, number": function numberNumber(x, y) {
      return x > y && !nearlyEqual$1(x, y, config3.epsilon);
    }
  });
});
var name$o = "largerEq";
var dependencies$o = ["typed", "config", "matrix", "DenseMatrix", "concat"];
var createLargerEq = /* @__PURE__ */ factory(name$o, dependencies$o, (_ref) => {
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
  return typed2(name$o, createLargerEqNumber({
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
var createLargerEqNumber = /* @__PURE__ */ factory(name$o, ["typed", "config"], (_ref2) => {
  var {
    typed: typed2,
    config: config3
  } = _ref2;
  return typed2(name$o, {
    "number, number": function numberNumber(x, y) {
      return x >= y || nearlyEqual$1(x, y, config3.epsilon);
    }
  });
});
var name$n = "ImmutableDenseMatrix";
var dependencies$n = ["smaller", "DenseMatrix"];
var createImmutableDenseMatrixClass = /* @__PURE__ */ factory(name$n, dependencies$n, (_ref) => {
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
      throw new TypeError("Unsupported type of data (" + typeOf(data) + ")");
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
      data: clone$2(this._data),
      size: clone$2(this._size),
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
var name$m = "Index";
var dependencies$m = ["ImmutableDenseMatrix", "getMatrixDataType"];
var createIndexClass = /* @__PURE__ */ factory(name$m, dependencies$m, (_ref) => {
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
    for (var i = 0, ii = arguments.length; i < ii; i++) {
      var arg = arguments[i];
      var argIsArray = isArray(arg);
      var argIsMatrix = isMatrix(arg);
      var sourceSize = null;
      if (isRange(arg)) {
        this._dimensions.push(arg);
        this._isScalar = false;
      } else if (argIsArray || argIsMatrix) {
        var m = void 0;
        if (getMatrixDataType2(arg) === "boolean") {
          if (argIsArray)
            m = _createImmutableMatrix(_booleansArrayToNumbersForIndex(arg).valueOf());
          if (argIsMatrix)
            m = _createImmutableMatrix(_booleansArrayToNumbersForIndex(arg._data).valueOf());
          sourceSize = arg.valueOf().length;
        } else {
          m = _createImmutableMatrix(arg.valueOf());
        }
        this._dimensions.push(m);
        var size2 = m.size();
        if (size2.length !== 1 || size2[0] !== 1 || sourceSize !== null) {
          this._isScalar = false;
        }
      } else if (typeof arg === "number") {
        this._dimensions.push(_createImmutableMatrix([arg]));
      } else if (typeof arg === "string") {
        this._dimensions.push(arg);
      } else {
        throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");
      }
      this._sourceSize.push(sourceSize);
    }
  }
  Index2.prototype.type = "Index";
  Index2.prototype.isIndex = true;
  function _createImmutableMatrix(arg) {
    for (var i = 0, l = arg.length; i < l; i++) {
      if (typeof arg[i] !== "number" || !isInteger$1(arg[i])) {
        throw new TypeError("Index parameters must be positive integer numbers");
      }
    }
    return new ImmutableDenseMatrix2(arg);
  }
  Index2.prototype.clone = function() {
    var index2 = new Index2();
    index2._dimensions = clone$2(this._dimensions);
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
    for (var i = 0, ii = this._dimensions.length; i < ii; i++) {
      var d = this._dimensions[i];
      size2[i] = typeof d === "string" ? 1 : d.size()[0];
    }
    return size2;
  };
  Index2.prototype.max = function() {
    var values = [];
    for (var i = 0, ii = this._dimensions.length; i < ii; i++) {
      var range2 = this._dimensions[i];
      values[i] = typeof range2 === "string" ? range2 : range2.max();
    }
    return values;
  };
  Index2.prototype.min = function() {
    var values = [];
    for (var i = 0, ii = this._dimensions.length; i < ii; i++) {
      var range2 = this._dimensions[i];
      values[i] = typeof range2 === "string" ? range2 : range2.min();
    }
    return values;
  };
  Index2.prototype.forEach = function(callback) {
    for (var i = 0, ii = this._dimensions.length; i < ii; i++) {
      callback(this._dimensions[i], i, this);
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
    for (var i = 0, ii = this._dimensions.length; i < ii; i++) {
      var dimension = this._dimensions[i];
      array.push(typeof dimension === "string" ? dimension : dimension.toArray());
    }
    return array;
  };
  Index2.prototype.valueOf = Index2.prototype.toArray;
  Index2.prototype.toString = function() {
    var strings = [];
    for (var i = 0, ii = this._dimensions.length; i < ii; i++) {
      var dimension = this._dimensions[i];
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
var name$l = "FibonacciHeap";
var dependencies$l = ["smaller", "larger"];
var createFibonacciHeapClass = /* @__PURE__ */ factory(name$l, dependencies$l, (_ref) => {
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
    for (var i = 0; i < arraySize2; i++) {
      y = array[i];
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
var name$k = "Spa";
var dependencies$k = ["addScalar", "equalScalar", "FibonacciHeap"];
var createSpaClass = /* @__PURE__ */ factory(name$k, dependencies$k, (_ref) => {
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
  Spa2.prototype.set = function(i, v) {
    if (!this._values[i]) {
      var node = this._heap.insert(i, v);
      this._values[i] = node;
    } else {
      this._values[i].value = v;
    }
  };
  Spa2.prototype.get = function(i) {
    var node = this._values[i];
    if (node) {
      return node.value;
    }
    return 0;
  };
  Spa2.prototype.accumulate = function(i, v) {
    var node = this._values[i];
    if (!node) {
      node = this._heap.insert(i, v);
      this._values[i] = node;
    } else {
      node.value = addScalar2(node.value, v);
    }
  };
  Spa2.prototype.forEach = function(from, to, callback) {
    var heap = this._heap;
    var values = this._values;
    var nodes = [];
    var node = heap.extractMinimum();
    if (node) {
      nodes.push(node);
    }
    while (node && node.key <= to) {
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
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      node = heap.insert(n.key, n.value);
      values[node.key] = node;
    }
  };
  Spa2.prototype.swap = function(i, j) {
    var nodei = this._values[i];
    var nodej = this._values[j];
    if (!nodei && nodej) {
      nodei = this._heap.insert(i, nodej.value);
      this._heap.remove(nodej);
      this._values[i] = nodei;
      this._values[j] = void 0;
    } else if (nodei && !nodej) {
      nodej = this._heap.insert(j, nodei.value);
      this._heap.remove(nodei);
      this._values[j] = nodej;
      this._values[i] = void 0;
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
var name$j = "atan";
var dependencies$j = ["typed"];
var createAtan = /* @__PURE__ */ factory(name$j, dependencies$j, (_ref) => {
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
var createTrigUnit = /* @__PURE__ */ factory("trigUnit", ["typed"], (_ref) => {
  var {
    typed: typed2
  } = _ref;
  return {
    Unit: typed2.referToSelf((self) => (x) => {
      if (!x.hasBase(x.constructor.BASE_UNITS.ANGLE)) {
        throw new TypeError("Unit in function cot is no angle");
      }
      return typed2.find(self, x.valueType())(x.value);
    })
  };
});
var name$i = "cos";
var dependencies$i = ["typed"];
var createCos = /* @__PURE__ */ factory(name$i, dependencies$i, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  var trigUnit = createTrigUnit({
    typed: typed2
  });
  return typed2(name$i, {
    number: Math.cos,
    "Complex | BigNumber": (x) => x.cos()
  }, trigUnit);
});
var name$h = "sin";
var dependencies$h = ["typed"];
var createSin = /* @__PURE__ */ factory(name$h, dependencies$h, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  var trigUnit = createTrigUnit({
    typed: typed2
  });
  return typed2(name$h, {
    number: Math.sin,
    "Complex | BigNumber": (x) => x.sin()
  }, trigUnit);
});
var name$g = "setDifference";
var dependencies$g = ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"];
var createSetDifference = /* @__PURE__ */ factory(name$g, dependencies$g, (_ref) => {
  var {
    typed: typed2,
    size: size2,
    subset: subset2,
    compareNatural: compareNatural2,
    Index: Index2,
    DenseMatrix: DenseMatrix2
  } = _ref;
  return typed2(name$g, {
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
        for (var i = 0; i < b1.length; i++) {
          inb2 = false;
          for (var j = 0; j < b2.length; j++) {
            if (compareNatural2(b1[i].value, b2[j].value) === 0 && b1[i].identifier === b2[j].identifier) {
              inb2 = true;
              break;
            }
          }
          if (!inb2) {
            result.push(b1[i]);
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
var name$f = "add";
var dependencies$f = ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix", "concat"];
var createAdd = /* @__PURE__ */ factory(name$f, dependencies$f, (_ref) => {
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
  return typed2(name$f, {
    "any, any": addScalar2,
    "any, any, ...any": typed2.referToSelf((self) => (x, y, rest) => {
      var result = self(x, y);
      for (var i = 0; i < rest.length; i++) {
        result = self(result, rest[i]);
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
var name$e = "norm";
var dependencies$e = ["typed", "abs", "add", "pow", "conj", "sqrt", "multiply", "equalScalar", "larger", "smaller", "matrix", "ctranspose", "eigs"];
var createNorm = /* @__PURE__ */ factory(name$e, dependencies$e, (_ref) => {
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
  return typed2(name$e, {
    number: Math.abs,
    Complex: function Complex2(x) {
      return x.abs();
    },
    BigNumber: function BigNumber2(x) {
      return x.abs();
    },
    boolean: function boolean(x) {
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
      var i = index2[0];
      var ri = add2(r[i] || 0, abs2(value));
      if (larger2(ri, maxr)) {
        maxr = ri;
      }
      r[i] = ri;
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
var name$d = "dot";
var dependencies$d = ["typed", "addScalar", "multiplyScalar", "conj", "size"];
var createDot = /* @__PURE__ */ factory(name$d, dependencies$d, (_ref) => {
  var {
    typed: typed2,
    addScalar: addScalar2,
    multiplyScalar: multiplyScalar2,
    conj: conj2,
    size: size2
  } = _ref;
  return typed2(name$d, {
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
      for (var i = 1; i < N; i++) {
        c = add2(c, mul2(conj2(adata[i]), bdata[i]));
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
    var i = 0;
    var j = 0;
    while (i < xindex.length && j < yindex.length) {
      var I = xindex[i];
      var J = yindex[j];
      if (I < J) {
        i++;
        continue;
      }
      if (I > J) {
        j++;
        continue;
      }
      if (I === J) {
        c = add2(c, mul2(xvalues[i], yvalues[j]));
        i++;
        j++;
      }
    }
    return c;
  }
  function _size(x) {
    return isMatrix(x) ? x.size() : size2(x);
  }
});
var name$c = "index";
var dependencies$c = ["typed", "Index"];
var createIndex = /* @__PURE__ */ factory(name$c, dependencies$c, (_ref) => {
  var {
    typed: typed2,
    Index: Index2
  } = _ref;
  return typed2(name$c, {
    "...number | string | BigNumber | Range | Array | Matrix": function numberStringBigNumberRangeArrayMatrix(args) {
      var ranges = args.map(function(arg) {
        if (isBigNumber(arg)) {
          return arg.toNumber();
        } else if (isArray(arg) || isMatrix(arg)) {
          return arg.map(function(elem) {
            return isBigNumber(elem) ? elem.toNumber() : elem;
          });
        } else {
          return arg;
        }
      });
      var res = new Index2();
      Index2.apply(res, ranges);
      return res;
    }
  });
});
var name$b = "lup";
var dependencies$b = ["typed", "matrix", "abs", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "larger", "equalScalar", "unaryMinus", "DenseMatrix", "SparseMatrix", "Spa"];
var createLup = /* @__PURE__ */ factory(name$b, dependencies$b, (_ref) => {
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
  return typed2(name$b, {
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
    var data = clone$2(m._data);
    var ldata = [];
    var lsize = [rows, n];
    var udata = [];
    var usize = [n, columns];
    var i, j, k;
    var p = [];
    for (i = 0; i < rows; i++) {
      p[i] = i;
    }
    for (j = 0; j < columns; j++) {
      if (j > 0) {
        for (i = 0; i < rows; i++) {
          var min2 = Math.min(i, j);
          var s = 0;
          for (k = 0; k < min2; k++) {
            s = addScalar2(s, multiplyScalar2(data[i][k], data[k][j]));
          }
          data[i][j] = subtractScalar2(data[i][j], s);
        }
      }
      var pi = j;
      var pabsv = 0;
      var vjj = 0;
      for (i = j; i < rows; i++) {
        var v = data[i][j];
        var absv = abs2(v);
        if (larger2(absv, pabsv)) {
          pi = i;
          pabsv = absv;
          vjj = v;
        }
      }
      if (j !== pi) {
        p[j] = [p[pi], p[pi] = p[j]][0];
        DenseMatrix2._swapRows(j, pi, data);
      }
      if (j < rows) {
        for (i = j + 1; i < rows; i++) {
          var vij = data[i][j];
          if (!equalScalar2(vij, 0)) {
            data[i][j] = divideScalar2(data[i][j], vjj);
          }
        }
      }
    }
    for (j = 0; j < columns; j++) {
      for (i = 0; i < rows; i++) {
        if (j === 0) {
          if (i < columns) {
            udata[i] = [];
          }
          ldata[i] = [];
        }
        if (i < j) {
          if (i < columns) {
            udata[i][j] = data[i][j];
          }
          if (j < rows) {
            ldata[i][j] = 0;
          }
          continue;
        }
        if (i === j) {
          if (i < columns) {
            udata[i][j] = data[i][j];
          }
          if (j < rows) {
            ldata[i][j] = 1;
          }
          continue;
        }
        if (i < columns) {
          udata[i][j] = 0;
        }
        if (j < rows) {
          ldata[i][j] = data[i][j];
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
    for (i = 0, n = p.length; i < n; i++) {
      pv[p[i]] = i;
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
    var i, j, k;
    var pvCo = [];
    var pvOc = [];
    for (i = 0; i < rows; i++) {
      pvCo[i] = i;
      pvOc[i] = i;
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
        i = index2[k];
        spa.set(pvCo[i], values[k]);
      }
      if (j > 0) {
        spa.forEach(0, j - 1, function(k2, vkj) {
          SparseMatrix2._forEachRow(k2, lvalues, lindex, lptr, function(i2, vik) {
            if (i2 > k2) {
              spa.accumulate(i2, unaryMinus2(multiplyScalar2(vik, vkj)));
            }
          });
        });
      }
      var pi = j;
      var vjj = spa.get(j);
      var pabsv = abs2(vjj);
      spa.forEach(j + 1, rows - 1, function(x, v) {
        var absv = abs2(v);
        if (larger2(absv, pabsv)) {
          pi = x;
          pabsv = absv;
          vjj = v;
        }
      });
      if (j !== pi) {
        SparseMatrix2._swapRows(j, pi, lsize[1], lvalues, lindex, lptr);
        SparseMatrix2._swapRows(j, pi, usize[1], uvalues, uindex, uptr);
        spa.swap(j, pi);
        swapIndeces(j, pi);
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
var name$a = "qr";
var dependencies$a = ["typed", "matrix", "zeros", "identity", "isZero", "equal", "sign", "sqrt", "conj", "unaryMinus", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "complex"];
var createQr = /* @__PURE__ */ factory(name$a, dependencies$a, (_ref) => {
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
  return _extends(typed2(name$a, {
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
    var Q = identity2([rows], "dense");
    var Qdata = Q._data;
    var R = m.clone();
    var Rdata = R._data;
    var i, j, k;
    var w = zeros2([rows], "");
    for (k = 0; k < Math.min(cols, rows); ++k) {
      var pivot = Rdata[k][k];
      var sgn = unaryMinus2(equal2(pivot, 0) ? 1 : sign2(pivot));
      var conjSgn = conj2(sgn);
      var alphaSquared = 0;
      for (i = k; i < rows; i++) {
        alphaSquared = addScalar2(alphaSquared, multiplyScalar2(Rdata[i][k], conj2(Rdata[i][k])));
      }
      var alpha = multiplyScalar2(sgn, sqrt2(alphaSquared));
      if (!isZero2(alpha)) {
        var u1 = subtractScalar2(pivot, alpha);
        w[k] = 1;
        for (i = k + 1; i < rows; i++) {
          w[i] = divideScalar2(Rdata[i][k], u1);
        }
        var tau = unaryMinus2(conj2(divideScalar2(u1, alpha)));
        var s = void 0;
        for (j = k; j < cols; j++) {
          s = 0;
          for (i = k; i < rows; i++) {
            s = addScalar2(s, multiplyScalar2(conj2(w[i]), Rdata[i][j]));
          }
          s = multiplyScalar2(s, tau);
          for (i = k; i < rows; i++) {
            Rdata[i][j] = multiplyScalar2(subtractScalar2(Rdata[i][j], multiplyScalar2(w[i], s)), conjSgn);
          }
        }
        for (i = 0; i < rows; i++) {
          s = 0;
          for (j = k; j < rows; j++) {
            s = addScalar2(s, multiplyScalar2(Qdata[i][j], w[j]));
          }
          s = multiplyScalar2(s, tau);
          for (j = k; j < rows; ++j) {
            Qdata[i][j] = divideScalar2(subtractScalar2(Qdata[i][j], multiplyScalar2(s, conj2(w[j]))), conjSgn);
          }
        }
      }
    }
    return {
      Q,
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
      for (var i = 0; i < Rdata.length; ++i) {
        for (var j = 0; j < i && j < (Rdata[0] || []).length; ++j) {
          Rdata[i][j] = zero;
        }
      }
    }
    return ret;
  }
  function _sparseQR(m) {
    throw new Error("qr not implemented for sparse matrices yet");
  }
});
function csPermute(a, pinv, q, values) {
  var avalues = a._values;
  var aindex = a._index;
  var aptr = a._ptr;
  var asize = a._size;
  var adt = a._datatype;
  var m = asize[0];
  var n = asize[1];
  var cvalues = values && a._values ? [] : null;
  var cindex = [];
  var cptr = [];
  var nz = 0;
  for (var k = 0; k < n; k++) {
    cptr[k] = nz;
    var j = q ? q[k] : k;
    for (var t0 = aptr[j], t1 = aptr[j + 1], t = t0; t < t1; t++) {
      var r = pinv ? pinv[aindex[t]] : aindex[t];
      cindex[nz] = r;
      if (cvalues) {
        cvalues[nz] = avalues[t];
      }
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
    var i = w[head + p];
    if (i === -1) {
      top--;
      post[k++] = p;
    } else {
      w[head + p] = w[next + i];
      ++top;
      w[stack + top] = i;
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
  var i, inext;
  if (ata) {
    for (i = 0; i < m; i++) {
      w[prev + i] = -1;
    }
  }
  for (var k = 0; k < n; k++) {
    parent[k] = -1;
    w[ancestor + k] = -1;
    for (var p0 = aptr[k], p1 = aptr[k + 1], p = p0; p < p1; p++) {
      var r = aindex[p];
      i = ata ? w[prev + r] : r;
      for (; i !== -1 && i < k; i = inext) {
        inext = w[ancestor + i];
        w[ancestor + i] = k;
        if (inext === -1) {
          parent[i] = k;
        }
      }
      if (ata) {
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
function csFlip(i) {
  return -i - 2;
}
var name$9 = "csAmd";
var dependencies$9 = ["add", "multiply", "transpose"];
var createCsAmd = /* @__PURE__ */ factory(name$9, dependencies$9, (_ref) => {
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
    var i, j, k, k1, k2, e, pj, ln2, nvi, pk, eln, p1, p2, pn, h, d;
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
          e = k;
          pj = p;
          ln2 = W[len + k] - elenk;
        } else {
          e = cindex[p++];
          pj = cptr[e];
          ln2 = W[len + e];
        }
        for (k2 = 1; k2 <= ln2; k2++) {
          i = cindex[pj++];
          if ((nvi = W[nv + i]) <= 0) {
            continue;
          }
          dk += nvi;
          W[nv + i] = -nvi;
          cindex[pk2++] = i;
          if (W[next + i] !== -1) {
            last[W[next + i]] = last[i];
          }
          if (last[i] !== -1) {
            W[next + last[i]] = W[next + i];
          } else {
            W[head + W[degree + i]] = W[next + i];
          }
        }
        if (e !== k) {
          cptr[e] = csFlip(k);
          W[w + e] = 0;
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
        i = cindex[pk];
        if ((eln = W[elen + i]) <= 0) {
          continue;
        }
        nvi = -W[nv + i];
        var wnvi = mark - nvi;
        for (p = cptr[i], p1 = cptr[i] + eln - 1; p <= p1; p++) {
          e = cindex[p];
          if (W[w + e] >= mark) {
            W[w + e] -= nvi;
          } else if (W[w + e] !== 0) {
            W[w + e] = W[degree + e] + wnvi;
          }
        }
      }
      for (pk = pk1; pk < pk2; pk++) {
        i = cindex[pk];
        p1 = cptr[i];
        p2 = p1 + W[elen + i] - 1;
        pn = p1;
        for (h = 0, d = 0, p = p1; p <= p2; p++) {
          e = cindex[p];
          if (W[w + e] !== 0) {
            var dext = W[w + e] - mark;
            if (dext > 0) {
              d += dext;
              cindex[pn++] = e;
              h += e;
            } else {
              cptr[e] = csFlip(k);
              W[w + e] = 0;
            }
          }
        }
        W[elen + i] = pn - p1 + 1;
        var p3 = pn;
        var p4 = p1 + W[len + i];
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
          cptr[i] = csFlip(k);
          nvi = -W[nv + i];
          dk -= nvi;
          nvk += nvi;
          nel += nvi;
          W[nv + i] = 0;
          W[elen + i] = -1;
        } else {
          W[degree + i] = Math.min(W[degree + i], d);
          cindex[pn] = cindex[p3];
          cindex[p3] = cindex[p1];
          cindex[p1] = k;
          W[len + i] = pn - p1 + 1;
          h = (h < 0 ? -h : h) % n;
          W[next + i] = W[hhead + h];
          W[hhead + h] = i;
          last[i] = h;
        }
      }
      W[degree + k] = dk;
      lemax = Math.max(lemax, dk);
      mark = _wclear(mark + lemax, lemax, W, w, n);
      for (pk = pk1; pk < pk2; pk++) {
        i = cindex[pk];
        if (W[nv + i] >= 0) {
          continue;
        }
        h = last[i];
        i = W[hhead + h];
        W[hhead + h] = -1;
        for (; i !== -1 && W[next + i] !== -1; i = W[next + i], mark++) {
          ln2 = W[len + i];
          eln = W[elen + i];
          for (p = cptr[i] + 1; p <= cptr[i] + ln2 - 1; p++) {
            W[w + cindex[p]] = mark;
          }
          var jlast = i;
          for (j = W[next + i]; j !== -1; ) {
            var ok2 = W[len + j] === ln2 && W[elen + j] === eln;
            for (p = cptr[j] + 1; ok2 && p <= cptr[j] + ln2 - 1; p++) {
              if (W[w + cindex[p]] !== mark) {
                ok2 = 0;
              }
            }
            if (ok2) {
              cptr[j] = csFlip(i);
              W[nv + i] += W[nv + j];
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
        i = cindex[pk];
        if ((nvi = -W[nv + i]) <= 0) {
          continue;
        }
        W[nv + i] = nvi;
        d = W[degree + i] + dk - nvi;
        d = Math.min(d, n - nel - nvi);
        if (W[head + d] !== -1) {
          last[W[head + d]] = i;
        }
        W[next + i] = W[head + d];
        last[i] = -1;
        W[head + d] = i;
        mindeg = Math.min(mindeg, d);
        W[degree + i] = d;
        cindex[p++] = i;
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
    for (i = 0; i < n; i++) {
      cptr[i] = csFlip(cptr[i]);
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
    for (e = n; e >= 0; e--) {
      if (W[nv + e] <= 0) {
        continue;
      }
      if (cptr[e] !== -1) {
        W[next + e] = W[head + cptr[e]];
        W[head + cptr[e]] = e;
      }
    }
    for (k = 0, i = 0; i <= n; i++) {
      if (cptr[i] === -1) {
        k = csTdfs(i, k, W, head, next, P2, w);
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
    for (var i = 0; i <= n; i++) {
      W[head + i] = -1;
      last[i] = -1;
      W[next + i] = -1;
      W[hhead + i] = -1;
      W[nv + i] = 1;
      W[w + i] = 1;
      W[elen + i] = 0;
      W[degree + i] = W[len + i];
    }
    var mark = _wclear(0, 0, W, w, n);
    W[elen + n] = -2;
    cptr[n] = -1;
    W[w + n] = 0;
    return mark;
  }
  function _initializeDegreeLists(n, cptr, W, degree, elen, w, dense, nv, head, last, next) {
    var nel = 0;
    for (var i = 0; i < n; i++) {
      var d = W[degree + i];
      if (d === 0) {
        W[elen + i] = -2;
        nel++;
        cptr[i] = -1;
        W[w + i] = 0;
      } else if (d > dense) {
        W[nv + i] = 0;
        W[elen + i] = -1;
        nel++;
        cptr[i] = csFlip(n);
        W[nv + n]++;
      } else {
        var h = W[head + d];
        if (h !== -1) {
          last[h] = i;
        }
        W[next + i] = W[head + d];
        W[head + d] = i;
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
  function _diag(i, j) {
    return i !== j;
  }
});
function csLeaf(i, j, w, first, maxfirst, prevleaf, ancestor) {
  var s, sparent;
  var jleaf = 0;
  var q;
  if (i <= j || w[first + j] <= w[maxfirst + i]) {
    return -1;
  }
  w[maxfirst + i] = w[first + j];
  var jprev = w[prevleaf + i];
  w[prevleaf + i] = j;
  if (jprev === -1) {
    jleaf = 1;
    q = i;
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
var name$8 = "csCounts";
var dependencies$8 = ["transpose"];
var createCsCounts = /* @__PURE__ */ factory(name$8, dependencies$8, (_ref) => {
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
    var i, j, k, J, p, p0, p1;
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
      for (i = 0; i < m; i++) {
        for (k = n, p0 = tptr[i], p1 = tptr[i + 1], p = p0; p < p1; p++) {
          k = Math.min(k, w[tindex[p]]);
        }
        w[next + i] = w[head + k];
        w[head + k] = i;
      }
    }
    for (i = 0; i < n; i++) {
      w[ancestor + i] = i;
    }
    for (k = 0; k < n; k++) {
      j = post[k];
      if (parent[j] !== -1) {
        colcount[parent[j]]--;
      }
      for (J = ata ? w[head + k] : j; J !== -1; J = ata ? w[next + J] : -1) {
        for (p = tptr[J]; p < tptr[J + 1]; p++) {
          i = tindex[p];
          var r = csLeaf(i, j, w, first, maxfirst, prevleaf, ancestor);
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
var name$7 = "csSqr";
var dependencies$7 = ["add", "multiply", "transpose"];
var createCsSqr = /* @__PURE__ */ factory(name$7, dependencies$7, (_ref) => {
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
      var c = order ? csPermute(a, null, s.q, 0) : a;
      s.parent = csEtree(c, 1);
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
    var pinv = s.pinv;
    var leftmost = s.leftmost;
    var w = [];
    var next = 0;
    var head = m;
    var tail = m + n;
    var nque = m + 2 * n;
    var i, k, p, p0, p1;
    for (k = 0; k < n; k++) {
      w[head + k] = -1;
      w[tail + k] = -1;
      w[nque + k] = 0;
    }
    for (i = 0; i < m; i++) {
      leftmost[i] = -1;
    }
    for (k = n - 1; k >= 0; k--) {
      for (p0 = aptr[k], p1 = aptr[k + 1], p = p0; p < p1; p++) {
        leftmost[aindex[p]] = k;
      }
    }
    for (i = m - 1; i >= 0; i--) {
      pinv[i] = -1;
      k = leftmost[i];
      if (k === -1) {
        continue;
      }
      if (w[nque + k]++ === 0) {
        w[tail + k] = i;
      }
      w[next + i] = w[head + k];
      w[head + k] = i;
    }
    s.lnz = 0;
    s.m2 = m;
    for (k = 0; k < n; k++) {
      i = w[head + k];
      s.lnz++;
      if (i < 0) {
        i = s.m2++;
      }
      pinv[i] = k;
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
        w[head + pa] = w[next + i];
        w[nque + pa] += w[nque + k];
      }
    }
    for (i = 0; i < m; i++) {
      if (pinv[i] < 0) {
        pinv[i] = k++;
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
function csUnflip(i) {
  return i < 0 ? csFlip(i) : i;
}
function csDfs(j, g, top, xi, pinv) {
  var index2 = g._index;
  var ptr = g._ptr;
  var size2 = g._size;
  var n = size2[1];
  var i, p, p2;
  var head = 0;
  xi[0] = j;
  while (head >= 0) {
    j = xi[head];
    var jnew = pinv ? pinv[j] : j;
    if (!csMarked(ptr, j)) {
      csMark(ptr, j);
      xi[n + head] = jnew < 0 ? 0 : csUnflip(ptr[jnew]);
    }
    var done = 1;
    for (p = xi[n + head], p2 = jnew < 0 ? 0 : csUnflip(ptr[jnew + 1]); p < p2; p++) {
      i = index2[p];
      if (csMarked(ptr, i)) {
        continue;
      }
      xi[n + head] = p;
      xi[++head] = i;
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
function csReach(g, b, k, xi, pinv) {
  var gptr = g._ptr;
  var gsize = g._size;
  var bindex = b._index;
  var bptr = b._ptr;
  var n = gsize[1];
  var p, p0, p1;
  var top = n;
  for (p0 = bptr[k], p1 = bptr[k + 1], p = p0; p < p1; p++) {
    var i = bindex[p];
    if (!csMarked(gptr, i)) {
      top = csDfs(i, g, top, xi, pinv);
    }
  }
  for (p = top; p < n; p++) {
    csMark(gptr, xi[p]);
  }
  return top;
}
var name$6 = "csSpsolve";
var dependencies$6 = ["divideScalar", "multiply", "subtract"];
var createCsSpsolve = /* @__PURE__ */ factory(name$6, dependencies$6, (_ref) => {
  var {
    divideScalar: divideScalar2,
    multiply: multiply2,
    subtract: subtract2
  } = _ref;
  return function csSpsolve(g, b, k, xi, x, pinv, lo) {
    var gvalues = g._values;
    var gindex = g._index;
    var gptr = g._ptr;
    var gsize = g._size;
    var n = gsize[1];
    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var p, p0, p1, q;
    var top = csReach(g, b, k, xi, pinv);
    for (p = top; p < n; p++) {
      x[xi[p]] = 0;
    }
    for (p0 = bptr[k], p1 = bptr[k + 1], p = p0; p < p1; p++) {
      x[bindex[p]] = bvalues[p];
    }
    for (var px = top; px < n; px++) {
      var j = xi[px];
      var J = pinv ? pinv[j] : j;
      if (J < 0) {
        continue;
      }
      p0 = gptr[J];
      p1 = gptr[J + 1];
      x[j] = divideScalar2(x[j], gvalues[lo ? p0 : p1 - 1]);
      p = lo ? p0 + 1 : p0;
      q = lo ? p1 : p1 - 1;
      for (; p < q; p++) {
        var i = gindex[p];
        x[i] = subtract2(x[i], multiply2(gvalues[p], x[j]));
      }
    }
    return top;
  };
});
var name$5 = "csLu";
var dependencies$5 = ["abs", "divideScalar", "multiply", "subtract", "larger", "largerEq", "SparseMatrix"];
var createCsLu = /* @__PURE__ */ factory(name$5, dependencies$5, (_ref) => {
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
    var pinv = [];
    var i, p;
    var x = [];
    var xi = [];
    for (i = 0; i < n; i++) {
      x[i] = 0;
      pinv[i] = -1;
      lptr[i + 1] = 0;
    }
    lnz = 0;
    unz = 0;
    for (var k = 0; k < n; k++) {
      lptr[k] = lnz;
      uptr[k] = unz;
      var col = q ? q[k] : k;
      var top = csSpsolve(L, m, col, xi, x, pinv, 1);
      var ipiv = -1;
      var a = -1;
      for (p = top; p < n; p++) {
        i = xi[p];
        if (pinv[i] < 0) {
          var xabs = abs2(x[i]);
          if (larger2(xabs, a)) {
            a = xabs;
            ipiv = i;
          }
        } else {
          uindex[unz] = pinv[i];
          uvalues[unz++] = x[i];
        }
      }
      if (ipiv === -1 || a <= 0) {
        return null;
      }
      if (pinv[col] < 0 && largerEq2(abs2(x[col]), multiply2(a, tol))) {
        ipiv = col;
      }
      var pivot = x[ipiv];
      uindex[unz] = k;
      uvalues[unz++] = pivot;
      pinv[ipiv] = k;
      lindex[lnz] = ipiv;
      lvalues[lnz++] = 1;
      for (p = top; p < n; p++) {
        i = xi[p];
        if (pinv[i] < 0) {
          lindex[lnz] = i;
          lvalues[lnz++] = divideScalar2(x[i], pivot);
        }
        x[i] = 0;
      }
    }
    lptr[n] = lnz;
    uptr[n] = unz;
    for (p = 0; p < lnz; p++) {
      lindex[p] = pinv[lindex[p]];
    }
    lvalues.splice(lnz, lvalues.length - lnz);
    lindex.splice(lnz, lindex.length - lnz);
    uvalues.splice(unz, uvalues.length - unz);
    uindex.splice(unz, uindex.length - unz);
    return {
      L,
      U,
      pinv
    };
  };
});
var name$4 = "slu";
var dependencies$4 = ["typed", "abs", "add", "multiply", "transpose", "divideScalar", "subtract", "larger", "largerEq", "SparseMatrix"];
var createSlu = /* @__PURE__ */ factory(name$4, dependencies$4, (_ref) => {
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
  return typed2(name$4, {
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
var name$3 = "lusolve";
var dependencies$3 = ["typed", "matrix", "lup", "slu", "usolve", "lsolve", "DenseMatrix"];
var createLusolve = /* @__PURE__ */ factory(name$3, dependencies$3, (_ref) => {
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
  return typed2(name$3, {
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
var name$2 = "det";
var dependencies$2 = ["typed", "matrix", "subtractScalar", "multiply", "divideScalar", "isZero", "unaryMinus"];
var createDet = /* @__PURE__ */ factory(name$2, dependencies$2, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    subtractScalar: subtractScalar2,
    multiply: multiply2,
    divideScalar: divideScalar2,
    isZero: isZero2,
    unaryMinus: unaryMinus2
  } = _ref;
  return typed2(name$2, {
    any: function any(x) {
      return clone$2(x);
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
          return clone$2(x);
        case 1:
          if (size2[0] === 1) {
            return clone$2(x.valueOf()[0]);
          }
          if (size2[0] === 0) {
            return 1;
          } else {
            throw new RangeError("Matrix must be square (size: " + format(size2) + ")");
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
            throw new RangeError("Matrix must be square (size: " + format(size2) + ")");
          }
        }
        default:
          throw new RangeError("Matrix must be two dimensional (size: " + format(size2) + ")");
      }
    }
  });
  function _det(matrix3, rows, cols) {
    if (rows === 1) {
      return clone$2(matrix3[0][0]);
    } else if (rows === 2) {
      return subtractScalar2(multiply2(matrix3[0][0], matrix3[1][1]), multiply2(matrix3[1][0], matrix3[0][1]));
    } else {
      var negated = false;
      var rowIndices = new Array(rows).fill(0).map((_, i2) => i2);
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
        for (var i = k + 1; i < rows; i++) {
          var i_ = rowIndices[i];
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
var name$1 = "inv";
var dependencies$1 = ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"];
var createInv = /* @__PURE__ */ factory(name$1, dependencies$1, (_ref) => {
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
  return typed2(name$1, {
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
            throw new RangeError("Matrix must be square (size: " + format(size2) + ")");
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
            throw new RangeError("Matrix must be square (size: " + format(size2) + ")");
          }
        }
        default:
          throw new RangeError("Matrix must be two dimensional (size: " + format(size2) + ")");
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
      for (var i = 0; i < N; i++) {
        var colNorm = realzero;
        var rowNorm = realzero;
        for (var j = 0; j < N; j++) {
          if (i === j)
            continue;
          colNorm = addScalar2(colNorm, abs2(arr[j][i]));
          rowNorm = addScalar2(rowNorm, abs2(arr[i][j]));
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
              if (i === _j) {
                continue;
              }
              arr[i][_j] = multiplyScalar2(arr[i][_j], g);
              arr[_j][i] = multiplyScalar2(arr[_j][i], f);
            }
            if (findVectors) {
              Rdiag[i] = multiplyScalar2(Rdiag[i], g);
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
    for (var i = 0; i < N - 2; i++) {
      var maxIndex = 0;
      var max2 = zero;
      for (var j = i + 1; j < N; j++) {
        var el = arr[j][i];
        if (smaller2(abs2(max2), abs2(el))) {
          max2 = el;
          maxIndex = j;
        }
      }
      if (smaller2(abs2(max2), prec)) {
        continue;
      }
      if (maxIndex !== i + 1) {
        var tmp1 = arr[maxIndex];
        arr[maxIndex] = arr[i + 1];
        arr[i + 1] = tmp1;
        for (var _j2 = 0; _j2 < N; _j2++) {
          var tmp2 = arr[_j2][maxIndex];
          arr[_j2][maxIndex] = arr[_j2][i + 1];
          arr[_j2][i + 1] = tmp2;
        }
        if (findVectors) {
          var tmp3 = R[maxIndex];
          R[maxIndex] = R[i + 1];
          R[i + 1] = tmp3;
        }
      }
      for (var _j3 = i + 2; _j3 < N; _j3++) {
        var n = divideScalar2(arr[_j3][i], max2);
        if (n === 0) {
          continue;
        }
        for (var k = 0; k < N; k++) {
          arr[_j3][k] = subtract2(arr[_j3][k], multiplyScalar2(n, arr[i + 1][k]));
        }
        for (var _k = 0; _k < N; _k++) {
          arr[_k][i + 1] = addScalar2(arr[_k][i + 1], multiplyScalar2(n, arr[_k][_j3]));
        }
        if (findVectors) {
          for (var _k2 = 0; _k2 < N; _k2++) {
            R[_j3][_k2] = subtract2(R[_j3][_k2], multiplyScalar2(n, R[i + 1][_k2]));
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
    var arr = clone$2(A);
    var lambdas = [];
    var n = N;
    var Sdiag = [];
    var Qtotal = findVectors ? diag2(Array(N).fill(one)) : void 0;
    var Qpartial = findVectors ? diag2(Array(n).fill(one)) : void 0;
    var lastConvergenceBefore = 0;
    while (lastConvergenceBefore <= 100) {
      lastConvergenceBefore += 1;
      var k = arr[n - 1][n - 1];
      for (var i = 0; i < n; i++) {
        arr[i][i] = subtract2(arr[i][i], k);
      }
      var {
        Q,
        R
      } = qr2(arr);
      arr = multiply2(R, Q);
      for (var _i = 0; _i < n; _i++) {
        arr[_i][_i] = addScalar2(arr[_i][_i], k);
      }
      if (findVectors) {
        Qpartial = multiply2(Qpartial, Q);
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
      var i = indexOf(uniqueValues, lambda, equal2);
      if (i === -1) {
        uniqueValues.push(lambda);
        multiplicities.push(1);
      } else {
        multiplicities[i] += 1;
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
    for (var i = 0; i < arr.length; i++) {
      arr[i].push(...Array(N - arr[i].length).fill(0));
    }
    for (var _i5 = arr.length; _i5 < N; _i5++) {
      arr.push(Array(N).fill(0));
      arr[_i5][_i5] = 1;
    }
    return arr;
  }
  function blockDiag(arr, N) {
    var M = [];
    for (var i = 0; i < N; i++) {
      M[i] = Array(N).fill(0);
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
    for (var i = 0; i < arr.length; i++) {
      if (fn(arr[i], el)) {
        return i;
      }
    }
    return -1;
  }
  function inverseIterate(A, N, orthog, prec, type) {
    var largeNum = type === "BigNumber" ? bignumber2(1e3) : 1e3;
    var b;
    var i = 0;
    for (; i < 5; ++i) {
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
    if (i >= 5) {
      return null;
    }
    i = 0;
    while (true) {
      var c = usolve2(A, b);
      if (smaller2(norm2(orthogonalComplement(b, [c])), prec)) {
        break;
      }
      if (++i >= 10) {
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
      for (var i = 0; i < N; i++) {
        Sij[i] = Array(N).fill(0);
        Sij[i][i] = 1;
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
    return sorting(clone$2(Ei), Sij, computeVectors);
  }
  function diagBig(x, precision, computeVectors) {
    var N = x.length;
    var e0 = abs2(precision / N);
    var psi;
    var Sij;
    if (computeVectors) {
      Sij = new Array(N);
      for (var i = 0; i < N; i++) {
        Sij[i] = Array(N).fill(0);
        Sij[i][i] = 1;
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
    return sorting(clone$2(Ei), Sij, computeVectors);
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
  function Sij1(Sij, theta, i, j) {
    var N = Sij.length;
    var c = Math.cos(theta);
    var s = Math.sin(theta);
    var Ski = Array(N).fill(0);
    var Skj = Array(N).fill(0);
    for (var k = 0; k < N; k++) {
      Ski[k] = c * Sij[k][i] - s * Sij[k][j];
      Skj[k] = s * Sij[k][i] + c * Sij[k][j];
    }
    for (var _k = 0; _k < N; _k++) {
      Sij[_k][i] = Ski[_k];
      Sij[_k][j] = Skj[_k];
    }
    return Sij;
  }
  function Sij1Big(Sij, theta, i, j) {
    var N = Sij.length;
    var c = cos2(theta);
    var s = sin2(theta);
    var Ski = Array(N).fill(bignumber2(0));
    var Skj = Array(N).fill(bignumber2(0));
    for (var k = 0; k < N; k++) {
      Ski[k] = subtract2(multiplyScalar2(c, Sij[k][i]), multiplyScalar2(s, Sij[k][j]));
      Skj[k] = addScalar2(multiplyScalar2(s, Sij[k][i]), multiplyScalar2(c, Sij[k][j]));
    }
    for (var _k2 = 0; _k2 < N; _k2++) {
      Sij[_k2][i] = Ski[_k2];
      Sij[_k2][j] = Skj[_k2];
    }
    return Sij;
  }
  function x1Big(Hij, theta, i, j) {
    var N = Hij.length;
    var c = bignumber2(cos2(theta));
    var s = bignumber2(sin2(theta));
    var c2 = multiplyScalar2(c, c);
    var s2 = multiplyScalar2(s, s);
    var Aki = Array(N).fill(bignumber2(0));
    var Akj = Array(N).fill(bignumber2(0));
    var csHij = multiply2(bignumber2(2), c, s, Hij[i][j]);
    var Aii = addScalar2(subtract2(multiplyScalar2(c2, Hij[i][i]), csHij), multiplyScalar2(s2, Hij[j][j]));
    var Ajj = add2(multiplyScalar2(s2, Hij[i][i]), csHij, multiplyScalar2(c2, Hij[j][j]));
    for (var k = 0; k < N; k++) {
      Aki[k] = subtract2(multiplyScalar2(c, Hij[i][k]), multiplyScalar2(s, Hij[j][k]));
      Akj[k] = addScalar2(multiplyScalar2(s, Hij[i][k]), multiplyScalar2(c, Hij[j][k]));
    }
    Hij[i][i] = Aii;
    Hij[j][j] = Ajj;
    Hij[i][j] = bignumber2(0);
    Hij[j][i] = bignumber2(0);
    for (var _k3 = 0; _k3 < N; _k3++) {
      if (_k3 !== i && _k3 !== j) {
        Hij[i][_k3] = Aki[_k3];
        Hij[_k3][i] = Aki[_k3];
        Hij[j][_k3] = Akj[_k3];
        Hij[_k3][j] = Akj[_k3];
      }
    }
    return Hij;
  }
  function x1(Hij, theta, i, j) {
    var N = Hij.length;
    var c = Math.cos(theta);
    var s = Math.sin(theta);
    var c2 = c * c;
    var s2 = s * s;
    var Aki = Array(N).fill(0);
    var Akj = Array(N).fill(0);
    var Aii = c2 * Hij[i][i] - 2 * c * s * Hij[i][j] + s2 * Hij[j][j];
    var Ajj = s2 * Hij[i][i] + 2 * c * s * Hij[i][j] + c2 * Hij[j][j];
    for (var k = 0; k < N; k++) {
      Aki[k] = c * Hij[i][k] - s * Hij[j][k];
      Akj[k] = s * Hij[i][k] + c * Hij[j][k];
    }
    Hij[i][i] = Aii;
    Hij[j][j] = Ajj;
    Hij[i][j] = 0;
    Hij[j][i] = 0;
    for (var _k4 = 0; _k4 < N; _k4++) {
      if (_k4 !== i && _k4 !== j) {
        Hij[i][_k4] = Aki[_k4];
        Hij[_k4][i] = Aki[_k4];
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
    for (var i = 0; i < N; i++) {
      for (var j = i + 1; j < N; j++) {
        if (Math.abs(maxMij) < Math.abs(Mij[i][j])) {
          maxMij = Math.abs(Mij[i][j]);
          maxIJ = [i, j];
        }
      }
    }
    return [maxIJ, maxMij];
  }
  function getAijBig(Mij) {
    var N = Mij.length;
    var maxMij = 0;
    var maxIJ = [0, 1];
    for (var i = 0; i < N; i++) {
      for (var j = i + 1; j < N; j++) {
        if (abs2(maxMij) < abs2(Mij[i][j])) {
          maxMij = abs2(Mij[i][j]);
          maxIJ = [i, j];
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
    for (var i = 0; i < N; i++) {
      var minID = 0;
      var minE = E[0];
      for (var j = 0; j < E.length; j++) {
        if (abs2(E[j]) < abs2(minE)) {
          minID = j;
          minE = E[minID];
        }
      }
      values[i] = E.splice(minID, 1)[0];
      if (computeVectors) {
        for (var _k5 = 0; _k5 < N; _k5++) {
          vecs[i][_k5] = S[_k5][minID];
          S[_k5].splice(minID, 1);
        }
      }
    }
    if (!computeVectors)
      return {
        values
      };
    var eigenvectors = vecs.map((vector, i2) => ({
      value: values[i2],
      vector
    }));
    return {
      values,
      eigenvectors
    };
  }
  return main;
}
var name = "eigs";
var dependencies = ["config", "typed", "matrix", "addScalar", "equal", "subtract", "abs", "atan", "cos", "sin", "multiplyScalar", "divideScalar", "inv", "bignumber", "multiply", "add", "larger", "column", "flatten", "number", "complex", "sqrt", "diag", "size", "reshape", "qr", "usolve", "usolveAll", "im", "re", "smaller", "matrixFromColumns", "dot"];
var createEigs = /* @__PURE__ */ factory(name, dependencies, (_ref) => {
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
      throw new RangeError("Matrix must be square (size: ".concat(format(asize), ")"));
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
    for (var i = 0; i < N; i++) {
      for (var j = i; j < N; j++) {
        if (larger2(bignumber2(abs2(subtract2(arr[i][j], arr[j][i]))), prec)) {
          return false;
        }
      }
    }
    return true;
  }
  function isReal(arr, N, prec) {
    for (var i = 0; i < N; i++) {
      for (var j = 0; j < N; j++) {
        if (larger2(bignumber2(abs2(im2(arr[i][j]))), prec)) {
          return false;
        }
      }
    }
    return true;
  }
  function coerceReal(arr, N) {
    for (var i = 0; i < N; i++) {
      for (var j = 0; j < N; j++) {
        arr[i][j] = re2(arr[i][j]);
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
    for (var i = 0; i < N; i++) {
      for (var j = 0; j < N; j++) {
        var el = arr[i][j];
        if (isNumber(el) || isFraction(el)) {
          hasNumber = true;
        } else if (isBigNumber(el)) {
          hasBig = true;
        } else if (isComplex(el)) {
          hasComplex = true;
        } else {
          throw TypeError("Unsupported type in Matrix: " + typeOf(el));
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
var BigNumber = /* @__PURE__ */ createBigNumberClass({
  config: config$1
});
var Complex = /* @__PURE__ */ createComplexClass({});
var Fraction = /* @__PURE__ */ createFractionClass({});
var Matrix = /* @__PURE__ */ createMatrixClass({});
var DenseMatrix = /* @__PURE__ */ createDenseMatrixClass({
  Matrix
});
var typed = /* @__PURE__ */ createTyped({
  BigNumber,
  Complex,
  DenseMatrix,
  Fraction
});
var abs = /* @__PURE__ */ createAbs({
  typed
});
var addScalar = /* @__PURE__ */ createAddScalar({
  typed
});
var atan = /* @__PURE__ */ createAtan({
  typed
});
var bignumber = /* @__PURE__ */ createBignumber({
  BigNumber,
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
var equalScalar = /* @__PURE__ */ createEqualScalar({
  config: config$1,
  typed
});
var getMatrixDataType = /* @__PURE__ */ createGetMatrixDataType({
  typed
});
var im = /* @__PURE__ */ createIm({
  typed
});
var isInteger = /* @__PURE__ */ createIsInteger({
  typed
});
var isPositive = /* @__PURE__ */ createIsPositive({
  typed
});
var isZero = /* @__PURE__ */ createIsZero({
  typed
});
var multiplyScalar = /* @__PURE__ */ createMultiplyScalar({
  typed
});
var number = /* @__PURE__ */ createNumber({
  typed
});
var re = /* @__PURE__ */ createRe({
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
var subtractScalar = /* @__PURE__ */ createSubtractScalar({
  typed
});
var sqrt = /* @__PURE__ */ createSqrt({
  Complex,
  config: config$1,
  typed
});
var unaryMinus = /* @__PURE__ */ createUnaryMinus({
  typed
});
var fraction = /* @__PURE__ */ createFraction({
  Fraction,
  typed
});
var matrix = /* @__PURE__ */ createMatrix({
  DenseMatrix,
  Matrix,
  SparseMatrix,
  typed
});
var numeric = /* @__PURE__ */ createNumeric({
  bignumber,
  fraction,
  number
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
var transpose = /* @__PURE__ */ createTranspose({
  matrix,
  typed
});
var zeros = /* @__PURE__ */ createZeros({
  BigNumber,
  config: config$1,
  matrix,
  typed
});
var concat = /* @__PURE__ */ createConcat({
  isInteger,
  matrix,
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
var usolve = /* @__PURE__ */ createUsolve({
  DenseMatrix,
  divideScalar,
  equalScalar,
  matrix,
  multiplyScalar,
  subtractScalar,
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
var dot = /* @__PURE__ */ createDot({
  addScalar,
  conj,
  multiplyScalar,
  size,
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
var multiply = /* @__PURE__ */ createMultiply({
  addScalar,
  dot,
  equalScalar,
  matrix,
  multiplyScalar,
  typed
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
var usolveAll = /* @__PURE__ */ createUsolveAll({
  DenseMatrix,
  divideScalar,
  equalScalar,
  matrix,
  multiplyScalar,
  subtractScalar,
  typed
});
var compareNatural = /* @__PURE__ */ createCompareNatural({
  compare,
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
var FibonacciHeap = /* @__PURE__ */ createFibonacciHeapClass({
  larger,
  smaller
});
var index = /* @__PURE__ */ createIndex({
  Index,
  typed
});
var smallerEq = /* @__PURE__ */ createSmallerEq({
  DenseMatrix,
  concat,
  config: config$1,
  matrix,
  typed
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
var setDifference = /* @__PURE__ */ createSetDifference({
  DenseMatrix,
  Index,
  compareNatural,
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
var lusolve = /* @__PURE__ */ createLusolve({
  DenseMatrix,
  lsolve,
  lup,
  matrix,
  slu,
  typed,
  usolve
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
var AnalysisType = /* @__PURE__ */ ((AnalysisType2) => {
  AnalysisType2[AnalysisType2["Bar"] = 0] = "Bar";
  AnalysisType2[AnalysisType2["Beam"] = 1] = "Beam";
  return AnalysisType2;
})(AnalysisType || {});
function processAnalysisInputs(analysisInputs) {
  const pai = {
    analysisType: 1,
    // not because it is mostly used but it is processed first below
    elasticities: /* @__PURE__ */ new Map(),
    areas: /* @__PURE__ */ new Map(),
    loads: /* @__PURE__ */ new Map(),
    supports: /* @__PURE__ */ new Map(),
    momentOfInertiaZs: /* @__PURE__ */ new Map(),
    momentOfInertiaYs: /* @__PURE__ */ new Map(),
    shearModuluses: /* @__PURE__ */ new Map(),
    torsionalConstants: /* @__PURE__ */ new Map(),
    distributedLoads: /* @__PURE__ */ new Map()
  };
  analysisInputs.forEach((input) => {
    var _a;
    if ("area" in input)
      pai.areas.set(input.element, input.area);
    if ("elasticity" in input)
      pai.elasticities.set(input.element, input.elasticity);
    if ("load" in input)
      pai.loads.set(input.node, input.load);
    if ("support" in input)
      pai.supports.set(input.node, input.support);
    if (((_a = pai.supports.values().next().value) == null ? void 0 : _a.length) === 3)
      pai.analysisType = 0;
    if (pai.analysisType === 1) {
      if ("momentOfInertiaZ" in input)
        pai.momentOfInertiaZs.set(input.element, input.momentOfInertiaZ);
      if ("momentOfInertiaY" in input)
        pai.momentOfInertiaYs.set(input.element, input.momentOfInertiaY);
      if ("torsionalConstant" in input)
        pai.torsionalConstants.set(input.element, input.torsionalConstant);
      if ("shearModulus" in input)
        pai.shearModuluses.set(input.element, input.shearModulus);
      if ("distributedLoad" in input)
        pai.distributedLoads.set(input.element, input.distributedLoad);
    }
  });
  return pai;
}
function bar$3(element) {
  const node0Range = [element[0] * 3, element[0] * 3 + 1, element[0] * 3 + 2];
  const node1Range = [element[1] * 3, element[1] * 3 + 1, element[1] * 3 + 2];
  return [...node0Range, ...node1Range];
}
function beam$3(element) {
  const node1Range = [
    element[0] * 6,
    element[0] * 6 + 1,
    element[0] * 6 + 2,
    element[0] * 6 + 3,
    element[0] * 6 + 4,
    element[0] * 6 + 5
  ];
  const node2Range = [
    element[1] * 6,
    element[1] * 6 + 1,
    element[1] * 6 + 2,
    element[1] * 6 + 3,
    element[1] * 6 + 4,
    element[1] * 6 + 5
  ];
  return [...node1Range, ...node2Range];
}
const getElementNodesIndices = {
  [AnalysisType.Bar]: bar$3,
  [AnalysisType.Beam]: beam$3
};
const getEquivalentDistributedLoad = (wY, wZ, L) => [
  0,
  wY * L / 2,
  wZ * L / 2,
  0,
  -wZ * L ** 2 / 12,
  wY * L ** 2 / 12,
  0,
  wY * L / 2,
  wZ * L / 2,
  0,
  wZ * L ** 2 / 12,
  -wY * L ** 2 / 12
];
function bar$2(supports, dof) {
  let supportsInd = [];
  supports.forEach((support, index2) => {
    if (support[0])
      supportsInd.push(index2 * 3);
    if (support[1])
      supportsInd.push(index2 * 3 + 1);
    if (support[2])
      supportsInd.push(index2 * 3 + 2);
  });
  return setDifference(range(0, dof), supportsInd);
}
function beam$2(supports, dof) {
  let supportsInd = [];
  supports.forEach((support, index2) => {
    if (support[0])
      supportsInd.push(index2 * 6);
    if (support[1])
      supportsInd.push(index2 * 6 + 1);
    if (support[2])
      supportsInd.push(index2 * 6 + 2);
    if (support[3])
      supportsInd.push(index2 * 6 + 3);
    if (support[4])
      supportsInd.push(index2 * 6 + 4);
    if (support[5])
      supportsInd.push(index2 * 6 + 5);
  });
  return setDifference(range(0, dof), supportsInd);
}
const getFreeIndices = {
  [AnalysisType.Bar]: bar$2,
  [AnalysisType.Beam]: beam$2
};
function bar$1(pa, index2, L) {
  const A = pa.areas.get(index2) || 0;
  const E = pa.elasticities.get(index2) || 0;
  let kLocal = matrix([
    [1, -1],
    [-1, 1]
  ]);
  return multiply(kLocal, E * A / L);
}
function beam$1(pa, index2, L) {
  const Iz = pa.momentOfInertiaZs.get(index2) || 0;
  const Iy = pa.momentOfInertiaYs.get(index2) || 0;
  const E = pa.elasticities.get(index2) || 0;
  const A = pa.areas.get(index2) || 0;
  const G = pa.shearModuluses.get(index2) || 0;
  const J = pa.torsionalConstants.get(index2) || 0;
  const EA = E * A / L;
  const EIz = E * Iz / L ** 3;
  const EIy = E * Iy / L ** 3;
  const GJ = G * J / L;
  return matrix([
    [EA, 0, 0, 0, 0, 0, -EA, 0, 0, 0, 0, 0],
    [0, 12 * EIz, 0, 0, 0, 6 * L * EIz, 0, -12 * EIz, 0, 0, 0, 6 * L * EIz],
    [0, 0, 12 * EIy, 0, -6 * L * EIy, 0, 0, 0, -12 * EIy, 0, -6 * L * EIy, 0],
    [0, 0, 0, GJ, 0, 0, 0, 0, 0, -GJ, 0, 0],
    [
      0,
      0,
      -6 * L * EIy,
      0,
      4 * EIy * L ** 2,
      0,
      0,
      0,
      6 * L * EIy,
      0,
      2 * EIy * L ** 2,
      0
    ],
    [
      0,
      6 * L * EIz,
      0,
      0,
      0,
      4 * EIz * L ** 2,
      0,
      -6 * L * EIz,
      0,
      0,
      0,
      2 * EIz * L ** 2
    ],
    [-EA, 0, 0, 0, 0, 0, EA, 0, 0, 0, 0, 0],
    [0, -12 * EIz, 0, 0, 0, -6 * EIz * L, 0, 12 * EIz, 0, 0, 0, -6 * EIz * L],
    [0, 0, -12 * EIy, 0, 6 * L * EIy, 0, 0, 0, 12 * EIy, 0, 6 * L * EIy, 0],
    [0, 0, 0, -GJ, 0, 0, 0, 0, 0, GJ, 0, 0],
    [
      0,
      0,
      -6 * L * EIy,
      0,
      2 * EIy * L ** 2,
      0,
      0,
      0,
      6 * L * EIy,
      0,
      4 * EIy * L ** 2,
      0
    ],
    [
      0,
      6 * L * EIz,
      0,
      0,
      0,
      2 * EIz * L ** 2,
      0,
      -6 * L * EIz,
      0,
      0,
      0,
      4 * EIz * L ** 2
    ]
  ]);
}
const getStiffnessMatrix = {
  [AnalysisType.Bar]: bar$1,
  [AnalysisType.Beam]: beam$1
};
function bar(node0, node1) {
  const vector = subtract(node1, node0);
  const length = norm(vector);
  const cosX = dot(vector, matrix([1, 0, 0])) / length;
  const cosY = dot(vector, matrix([0, 1, 0])) / length;
  const cosZ = dot(vector, matrix([0, 0, 1])) / length;
  return matrix([
    [cosX, cosY, cosZ, 0, 0, 0],
    [0, 0, 0, cosX, cosY, cosZ]
  ]);
}
function beam(node0, node1) {
  const vector = subtract(node1, node0);
  const length = norm(vector);
  const l = dot(vector, matrix([1, 0, 0])) / length;
  const m = dot(vector, matrix([0, 1, 0])) / length;
  const n = dot(vector, matrix([0, 0, 1])) / length;
  const D = Math.sqrt(l ** 2 + m ** 2);
  let lambda = matrix([
    [l, m, n],
    [-m / D, l / D, 0],
    [-l * n / D, -m * n / D, D]
  ]);
  if (n === 1) {
    lambda = matrix([
      [0, 0, 1],
      [0, 1, 0],
      [-1, 0, 0]
    ]);
  }
  if (n === -1) {
    lambda = matrix([
      [0, 0, -1],
      [0, 1, 0],
      [1, 0, 0]
    ]);
  }
  return kron(identity(4), lambda);
}
const getTransformationMatrix = {
  [AnalysisType.Bar]: bar,
  [AnalysisType.Beam]: beam
};
function deform(nodes, elements, pa) {
  const dof = nodes.length * (pa.analysisType === AnalysisType.Bar ? 3 : 6);
  let kGlobalAssembly = zeros(dof, dof);
  elements.forEach((element, index$1) => {
    const node0 = nodes[element[0]];
    const node1 = nodes[element[1]];
    const L = norm(subtract(node1, node0));
    const kLocal = getStiffnessMatrix[pa.analysisType](pa, index$1, L);
    const T = getTransformationMatrix[pa.analysisType](node0, node1);
    const kGlobal = multiply(
      transpose(T),
      multiply(kLocal, T)
    );
    const elementInd = getElementNodesIndices[pa.analysisType](element);
    const KCurrent = subset(
      kGlobalAssembly,
      index(elementInd, elementInd)
    );
    kGlobalAssembly = subset(
      kGlobalAssembly,
      index(elementInd, elementInd),
      add(KCurrent, kGlobal)
    );
  });
  let f = zeros([dof]);
  pa.loads.forEach((force, index$1) => {
    const nodeInd = {
      0: [index$1 * 3, index$1 * 3 + 1, index$1 * 3 + 2],
      1: [
        index$1 * 6,
        index$1 * 6 + 1,
        index$1 * 6 + 2,
        index$1 * 6 + 3,
        index$1 * 6 + 4,
        index$1 * 6 + 5
      ]
    };
    const current = subset(f, index(nodeInd[pa.analysisType]));
    f = subset(
      f,
      index(nodeInd[pa.analysisType]),
      add(current, force)
    );
  });
  pa.distributedLoads.forEach(([wY, wZ], index$1) => {
    const element = elements[index$1];
    const node0 = nodes[element[0]];
    const node1 = nodes[element[1]];
    const L = norm(subtract(node1, node0));
    const ind = index(getElementNodesIndices[pa.analysisType](element));
    const current = subset(f, ind);
    const load = getEquivalentDistributedLoad(wY, wZ, L);
    f = subset(f, ind, add(current, load));
  });
  const freeInd = getFreeIndices[pa.analysisType](pa.supports, dof);
  const fFree = subset(f, index(freeInd));
  const kFree = subset(kGlobalAssembly, index(freeInd, freeInd));
  const dxFree = lusolve(kFree, fFree);
  const dx = subset(
    zeros(dof),
    index(freeInd),
    flatten(dxFree)
  );
  let forces = multiply(kGlobalAssembly, dx);
  pa.distributedLoads.forEach(([wY, wZ], index$1) => {
    const element = elements[index$1];
    const node0 = nodes[element[0]];
    const node1 = nodes[element[1]];
    const L = norm(subtract(node1, node0));
    const ind = index(getElementNodesIndices[pa.analysisType](element));
    const current = subset(forces, ind);
    const load = getEquivalentDistributedLoad(wY, wZ, L);
    forces = subset(forces, ind, subtract(current, load));
  });
  return {
    deformations: dx.toArray(),
    forces: forces.toArray()
  };
}
function analyze(nodes, elements, analysisInputs) {
  const pai = processAnalysisInputs(analysisInputs);
  const { deformations, forces } = deform(nodes, elements, pai);
  const analysisOutputs = [];
  nodes.forEach((_, index2) => {
    const deformation = {
      0: [
        deformations[index2 * 3],
        deformations[index2 * 3 + 1],
        deformations[index2 * 3 + 2]
      ],
      1: [
        deformations[index2 * 6],
        deformations[index2 * 6 + 1],
        deformations[index2 * 6 + 2],
        deformations[index2 * 6 + 3],
        deformations[index2 * 6 + 4],
        deformations[index2 * 6 + 5]
      ]
    };
    analysisOutputs.push({
      node: index2,
      deformation: deformation[pai.analysisType]
    });
    const reaction = {
      0: [
        forces[index2 * 3],
        forces[index2 * 3 + 1],
        forces[index2 * 3 + 2]
      ],
      1: [
        forces[index2 * 6],
        forces[index2 * 6 + 1],
        forces[index2 * 6 + 2],
        forces[index2 * 6 + 3],
        forces[index2 * 6 + 4],
        forces[index2 * 6 + 5]
      ]
    };
    if (pai.supports.get(index2)) {
      analysisOutputs.push({
        node: index2,
        reaction: reaction[pai.analysisType]
      });
    }
  });
  elements.forEach((element, index$1) => {
    const node0 = nodes[element[0]];
    const node1 = nodes[element[1]];
    const L = norm(subtract(node1, node0));
    const dxGlobal = subset(
      deformations,
      index(getElementNodesIndices[pai.analysisType](element))
    );
    const T = getTransformationMatrix[pai.analysisType](node0, node1);
    const dxLocal = multiply(T, dxGlobal);
    const kLocal = getStiffnessMatrix[pai.analysisType](pai, index$1, L);
    let fLocal = multiply(kLocal, dxLocal).toArray();
    if (pai.distributedLoads.get(index$1)) {
      const [wY, wZ] = pai.distributedLoads.get(index$1) || [0, 0];
      const load = getEquivalentDistributedLoad(wY, wZ, L);
      fLocal = subtract(fLocal, load);
    }
    const analysisOutput = {
      0: {
        element: index$1,
        normal: [-fLocal[0], -fLocal[0]]
      },
      // sign flips according to Logan's book,
      1: {
        element: index$1,
        normal: [fLocal[0], fLocal[6]],
        shearY: [fLocal[1], fLocal[7]],
        shearZ: [fLocal[2], fLocal[8]],
        torsion: [fLocal[3], fLocal[9]],
        bendingY: [fLocal[4], fLocal[10]],
        bendingZ: [fLocal[5], fLocal[11]]
      }
    };
    analysisOutputs.push(analysisOutput[pai.analysisType]);
  });
  return { default: analysisOutputs };
}
export {
  analyze as a
};
