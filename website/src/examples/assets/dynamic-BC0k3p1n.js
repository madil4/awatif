import { g as getTransformationMatrix, a as app } from "./app-DFn3ZYI3.js";
import { f as factory, i as isNode, d as deepStrictEqual, c as createMap, I as IndexError, g as getSafeProperty, _ as _defineProperty, a as isIndexNode, b as isAccessorNode, e as isArrayNode, h as isConstantNode, j as isFunctionNode, k as isObjectNode, l as isParenthesisNode, m as isSymbolNode, n as map, s as setSafeProperty, r as rule2Node, o as hasOwnProperty, p as forEach, q as isBigNumber, t as isComplex, u as isUnit, v as typeOf, w as getDefaultExportFromCjs, x as format, y as join, z as escape, A as isMatrix, B as isArray, C as isString, D as stringify, P as PartitionedMap, O as ObjectWrappingMap, E as isSafeMethod, F as isOperatorNode, G as getSafeMethod, H as isFunctionAssignmentNode, J as deepMap, K as _extends$1, L as createEmptyMap, M as toObject, N as isHelp, Q as clone, R as isChain, S as lazy, T as noBignumber, U as noFraction, V as isFraction, W as isInteger, X as createApply, Y as isNumber, Z as createColumn, $ as filterRegExp, a0 as filter, a1 as applyCallback, a2 as isRange, a3 as isCollection, a4 as createMax, a5 as createMean, a6 as createMin, a7 as createRange, a8 as createRow, a9 as createSubset, aa as createConcat, ab as createDiff, ac as createStd, ad as createSum, ae as createQuantileSeq, af as createCumSum, ag as createVariance, ah as createPrint, ai as printTemplate, aj as createAnd, ak as createOr, al as createBitAnd, am as createBitOr, an as ResultSet, ao as typed, ap as size, aq as subset, ar as matrix, as as Unit, at as config, au as numeric, av as bignumber, aw as fraction, ax as add, ay as divide, az as equal, aA as isZero, aB as multiply, aC as pow, aD as subtract, aE as e, aF as _false, aG as fineStructure, aH as i, aI as _Infinity, aJ as LN10, aK as LOG10E, aL as _NaN, aM as _null, aN as phi, aO as SQRT1_2, aP as sackurTetrode, aQ as tau, aR as _true, aS as version, aT as efimovFactor, aU as LN2, aV as pi, aW as replacer, aX as SQRT2, aY as unaryPlus, aZ as weakMixingAngle, a_ as abs, a$ as acos, b0 as acot, b1 as acsc, b2 as addScalar, b3 as arg, b4 as asech, b5 as asinh, b6 as atan, b7 as atanh, b8 as bitNot, b9 as boolean, ba as clone$1, bb as combinations, bc as complex, bd as conj, be as cos, bf as cot, bg as csc, bh as cube, bi as equalScalar, bj as erf, bk as exp, bl as expm1, bm as filter$1, bn as forEach$1, bo as format$1, bp as getMatrixDataType, bq as hex, br as im, bs as isInteger$1, bt as isNegative, bu as isPositive, bv as LOG2E, bw as lgamma, bx as log10, by as log2, bz as map$1, bA as multiplyScalar, bB as not, bC as number, bD as oct, bE as pickRandom, bF as print, bG as random, bH as re, bI as sec, bJ as sign, bK as sin, bL as splitUnit, bM as square, bN as string, bO as subtractScalar, bP as tan, bQ as typeOf$1, bR as acosh, bS as acsch, bT as apply, bU as asec, bV as bin, bW as combinationsWithRep, bX as cosh, bY as csch, bZ as isNaN$1, b_ as isPrime, b$ as randomInt, c0 as sech, c1 as sinh, c2 as sparse, c3 as sqrt, c4 as tanh, c5 as unaryMinus, c6 as acoth, c7 as coth, c8 as isNumeric, c9 as matrixFromFunction, ca as mode, cb as prod, cc as reshape, cd as squeeze, ce as transpose, cf as xgcd, cg as zeros, ch as asin, ci as cbrt, cj as concat, ck as count, cl as ctranspose, cm as diag, cn as divideScalar, co as dotDivide, cp as flatten, cq as hasNumericValue, cr as identity, cs as kron, ct as largerEq, cu as leftShift, cv as lsolve, cw as matrixFromColumns, cx as nthRoot, cy as ones, cz as qr, cA as resize, cB as rightArithShift, cC as round, cD as smaller, cE as to, cF as unequal, cG as usolve, cH as xor, cI as atan2, cJ as bitAnd, cK as bitOr, cL as bitXor, cM as catalan, cN as compare, cO as compareText, cP as cumsum, cQ as deepEqual, cR as diff, cS as distance, cT as dot, cU as equalText, cV as floor, cW as gcd, cX as hypot, cY as larger, cZ as log, c_ as lsolveAll, c$ as matrixFromRows, d0 as min, d1 as mod, d2 as nthRoots, d3 as or, d4 as partitionSelect, d5 as rightLogShift, d6 as slu, d7 as sum, d8 as trace, d9 as usolveAll, da as zpk2tf, db as ceil, dc as compareNatural, dd as composition, de as cross, df as det, dg as dotMultiply, dh as fix, di as index, dj as intersect, dk as invmod, dl as lcm, dm as log1p, dn as max, dp as setCartesian, dq as setDistinct, dr as setIsSubset, ds as setPowerset, dt as smallerEq, du as sort, dv as and, dw as range, dx as row, dy as setDifference, dz as setMultiplicity, dA as setSymDifference, dB as column, dC as inv, dD as lup, dE as pinv, dF as setIntersect, dG as setUnion, dH as sqrtm, dI as vacuumImpedance, dJ as wienDisplacement, dK as atomicMass, dL as bohrMagneton, dM as boltzmann, dN as conductanceQuantum, dO as coulomb, dP as deuteronMass, dQ as dotPow, dR as electricConstant, dS as elementaryCharge, dT as expm, dU as faraday, dV as fft, dW as gamma, dX as gravitationConstant, dY as hartreeEnergy, dZ as ifft, d_ as klitzing, d$ as loschmidt, e0 as magneticConstant, e1 as molarMass, e2 as molarPlanckConstant, e3 as neutronMass, e4 as nuclearMagneton, e5 as planckCharge, e6 as planckLength, e7 as planckTemperature, e8 as protonMass, e9 as quantumOfCirculation, ea as reducedPlanckConstant, eb as rydberg, ec as secondRadiation, ed as speedOfLight, ee as stefanBoltzmann, ef as thomsonCrossSection, eg as avogadro, eh as bohrRadius, ei as createUnit, ej as electronMass, ek as factorial, el as firstRadiation, em as gravity, en as inverseConductanceQuantum, eo as lusolve, ep as magneticFluxQuantum, eq as molarMassC12, er as multinomial, es as permutations, et as planckMass, eu as polynomialRoot, ev as setSize, ew as solveODE, ex as stirlingS2, ey as unit, ez as bellNumbers, eA as eigs, eB as fermiCoupling, eC as gasConstant, eD as kldivergence, eE as mean, eF as molarVolume, eG as planckConstant, eH as quantileSeq, eI as variance, eJ as classicalElectronRadius, eK as median, eL as corr, eM as freqz, eN as mad, eO as std, eP as zeta, eQ as norm, eR as rotationMatrix, eS as planckTime, eT as schur, eU as rotate, eV as sylvester, eW as lyap, eX as DenseMatrix, eY as Index, eZ as BigNumber, e_ as Complex, e$ as Fraction, f0 as Matrix, f1 as Range, f2 as SparseMatrix, f3 as ImmutableDenseMatrix, f4 as FibonacciHeap, f5 as Spa } from "./pureFunctionsAny.generated-DNSg1shC.js";
var keywords = /* @__PURE__ */ new Set(["end"]);
var name$W = "Node";
var dependencies$W = ["mathWithTransform"];
var createNode = /* @__PURE__ */ factory(name$W, dependencies$W, (_ref) => {
  var {
    mathWithTransform: mathWithTransform2
  } = _ref;
  function _validateScope(scope) {
    for (var symbol of [...keywords]) {
      if (scope.has(symbol)) {
        throw new Error('Scope contains an illegal symbol, "' + symbol + '" is a reserved keyword');
      }
    }
  }
  class Node2 {
    get type() {
      return "Node";
    }
    get isNode() {
      return true;
    }
    /**
     * Evaluate the node
     * @param {Object} [scope]  Scope to read/write variables
     * @return {*}              Returns the result
     */
    evaluate(scope) {
      return this.compile().evaluate(scope);
    }
    /**
     * Compile the node into an optimized, evauatable JavaScript function
     * @return {{evaluate: function([Object])}} object
     *                Returns an object with a function 'evaluate',
     *                which can be invoked as expr.evaluate([scope: Object]),
     *                where scope is an optional object with
     *                variables.
     */
    compile() {
      var expr = this._compile(mathWithTransform2, {});
      var args = {};
      var context = null;
      function evaluate2(scope) {
        var s = createMap(scope);
        _validateScope(s);
        return expr(s, args, context);
      }
      return {
        evaluate: evaluate2
      };
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(math2, argNames) {
      throw new Error("Method _compile must be implemented by type " + this.type);
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(callback) {
      throw new Error("Cannot run forEach on a Node interface");
    }
    /**
     * Create a new Node whose children are the results of calling the
     * provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {OperatorNode} Returns a transformed copy of the node
     */
    map(callback) {
      throw new Error("Cannot run map on a Node interface");
    }
    /**
     * Validate whether an object is a Node, for use with map
     * @param {Node} node
     * @returns {Node} Returns the input if it's a node, else throws an Error
     * @protected
     */
    _ifNode(node) {
      if (!isNode(node)) {
        throw new TypeError("Callback function must return a Node");
      }
      return node;
    }
    /**
     * Recursively traverse all nodes in a node tree. Executes given callback for
     * this node and each of its child nodes.
     * @param {function(node: Node, path: string, parent: Node)} callback
     *          A callback called for every node in the node tree.
     */
    traverse(callback) {
      callback(this, null, null);
      function _traverse(node, callback2) {
        node.forEach(function(child, path, parent) {
          callback2(child, path, parent);
          _traverse(child, callback2);
        });
      }
      _traverse(this, callback);
    }
    /**
     * Recursively transform a node tree via a transform function.
     *
     * For example, to replace all nodes of type SymbolNode having name 'x' with
     * a ConstantNode with value 2:
     *
     *     const res = Node.transform(function (node, path, parent) {
     *       if (node && node.isSymbolNode) && (node.name === 'x')) {
     *         return new ConstantNode(2)
     *       }
     *       else {
     *         return node
     *       }
     *     })
     *
     * @param {function(node: Node, path: string, parent: Node) : Node} callback
     *          A mapping function accepting a node, and returning
     *          a replacement for the node or the original node. The "signature"
     *          of the callback must be:
     *          callback(node: Node, index: string, parent: Node) : Node
     * @return {Node} Returns the original node or its replacement
     */
    transform(callback) {
      function _transform(child, path, parent) {
        var replacement = callback(child, path, parent);
        if (replacement !== child) {
          return replacement;
        }
        return child.map(_transform);
      }
      return _transform(this, null, null);
    }
    /**
     * Find any node in the node tree matching given filter function. For
     * example, to find all nodes of type SymbolNode having name 'x':
     *
     *     const results = Node.filter(function (node) {
     *       return (node && node.isSymbolNode) && (node.name === 'x')
     *     })
     *
     * @param {function(node: Node, path: string, parent: Node) : Node} callback
     *            A test function returning true when a node matches, and false
     *            otherwise. Function signature:
     *            callback(node: Node, index: string, parent: Node) : boolean
     * @return {Node[]} nodes
     *            An array with nodes matching given filter criteria
     */
    filter(callback) {
      var nodes2 = [];
      this.traverse(function(node, path, parent) {
        if (callback(node, path, parent)) {
          nodes2.push(node);
        }
      });
      return nodes2;
    }
    /**
     * Create a shallow clone of this node
     * @return {Node}
     */
    clone() {
      throw new Error("Cannot clone a Node interface");
    }
    /**
     * Create a deep clone of this node
     * @return {Node}
     */
    cloneDeep() {
      return this.map(function(node) {
        return node.cloneDeep();
      });
    }
    /**
     * Deep compare this node with another node.
     * @param {Node} other
     * @return {boolean} Returns true when both nodes are of the same type and
     *                   contain the same values (as do their childs)
     */
    equals(other) {
      return other ? this.type === other.type && deepStrictEqual(this, other) : false;
    }
    /**
     * Get string representation. (wrapper function)
     *
     * This function can get an object of the following form:
     * {
     *    handler: //This can be a callback function of the form
     *             // "function callback(node, options)"or
     *             // a map that maps function names (used in FunctionNodes)
     *             // to callbacks
     *    parenthesis: "keep" //the parenthesis option (This is optional)
     * }
     *
     * @param {Object} [options]
     * @return {string}
     */
    toString(options) {
      var customString = this._getCustomString(options);
      if (typeof customString !== "undefined") {
        return customString;
      }
      return this._toString(options);
    }
    /**
     * Internal function to generate the string output.
     * This has to be implemented by every Node
     *
     * @throws {Error}
     */
    _toString() {
      throw new Error("_toString not implemented for " + this.type);
    }
    /**
     * Get a JSON representation of the node
     * Both .toJSON() and the static .fromJSON(json) should be implemented by all
     * implementations of Node
     * @returns {Object}
     */
    toJSON() {
      throw new Error("Cannot serialize object: toJSON not implemented by " + this.type);
    }
    /**
     * Get HTML representation. (wrapper function)
     *
     * This function can get an object of the following form:
     * {
     *    handler: //This can be a callback function of the form
     *             // "function callback(node, options)" or
     *             // a map that maps function names (used in FunctionNodes)
     *             // to callbacks
     *    parenthesis: "keep" //the parenthesis option (This is optional)
     * }
     *
     * @param {Object} [options]
     * @return {string}
     */
    toHTML(options) {
      var customString = this._getCustomString(options);
      if (typeof customString !== "undefined") {
        return customString;
      }
      return this._toHTML(options);
    }
    /**
     * Internal function to generate the HTML output.
     * This has to be implemented by every Node
     *
     * @throws {Error}
     */
    _toHTML() {
      throw new Error("_toHTML not implemented for " + this.type);
    }
    /**
     * Get LaTeX representation. (wrapper function)
     *
     * This function can get an object of the following form:
     * {
     *    handler: //This can be a callback function of the form
     *             // "function callback(node, options)"or
     *             // a map that maps function names (used in FunctionNodes)
     *             // to callbacks
     *    parenthesis: "keep" //the parenthesis option (This is optional)
     * }
     *
     * @param {Object} [options]
     * @return {string}
     */
    toTex(options) {
      var customString = this._getCustomString(options);
      if (typeof customString !== "undefined") {
        return customString;
      }
      return this._toTex(options);
    }
    /**
     * Internal function to generate the LaTeX output.
     * This has to be implemented by every Node
     *
     * @param {Object} [options]
     * @throws {Error}
     */
    _toTex(options) {
      throw new Error("_toTex not implemented for " + this.type);
    }
    /**
     * Helper used by `to...` functions.
     */
    _getCustomString(options) {
      if (options && typeof options === "object") {
        switch (typeof options.handler) {
          case "object":
          case "undefined":
            return;
          case "function":
            return options.handler(this, options);
          default:
            throw new TypeError("Object or function expected as callback");
        }
      }
    }
    /**
     * Get identifier.
     * @return {string}
     */
    getIdentifier() {
      return this.type;
    }
    /**
     * Get the content of the current Node.
     * @return {Node} node
     **/
    getContent() {
      return this;
    }
  }
  return Node2;
}, {
  isClass: true,
  isNode: true
});
function errorTransform(err) {
  if (err && err.isIndexError) {
    return new IndexError(err.index + 1, err.min + 1, err.max !== void 0 ? err.max + 1 : void 0);
  }
  return err;
}
function accessFactory(_ref) {
  var {
    subset: subset2
  } = _ref;
  return function access(object, index2) {
    try {
      if (Array.isArray(object)) {
        return subset2(object, index2);
      } else if (object && typeof object.subset === "function") {
        return object.subset(index2);
      } else if (typeof object === "string") {
        return subset2(object, index2);
      } else if (typeof object === "object") {
        if (!index2.isObjectProperty()) {
          throw new TypeError("Cannot apply a numeric index as object property");
        }
        return getSafeProperty(object, index2.getObjectProperty());
      } else {
        throw new TypeError("Cannot apply index: unsupported type of object");
      }
    } catch (err) {
      throw errorTransform(err);
    }
  };
}
var name$V = "AccessorNode";
var dependencies$V = ["subset", "Node"];
var createAccessorNode = /* @__PURE__ */ factory(name$V, dependencies$V, (_ref) => {
  var {
    subset: subset2,
    Node: Node2
  } = _ref;
  var access = accessFactory({
    subset: subset2
  });
  function needParenthesis(node) {
    return !(isAccessorNode(node) || isArrayNode(node) || isConstantNode(node) || isFunctionNode(node) || isObjectNode(node) || isParenthesisNode(node) || isSymbolNode(node));
  }
  class AccessorNode2 extends Node2 {
    /**
     * @constructor AccessorNode
     * @extends {Node}
     * Access an object property or get a matrix subset
     *
     * @param {Node} object                 The object from which to retrieve
     *                                      a property or subset.
     * @param {IndexNode} index             IndexNode containing ranges
     */
    constructor(object, index2) {
      super();
      if (!isNode(object)) {
        throw new TypeError('Node expected for parameter "object"');
      }
      if (!isIndexNode(index2)) {
        throw new TypeError('IndexNode expected for parameter "index"');
      }
      this.object = object;
      this.index = index2;
    }
    // readonly property name
    get name() {
      if (this.index) {
        return this.index.isObjectProperty() ? this.index.getObjectProperty() : "";
      } else {
        return this.object.name || "";
      }
    }
    get type() {
      return name$V;
    }
    get isAccessorNode() {
      return true;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(math2, argNames) {
      var evalObject = this.object._compile(math2, argNames);
      var evalIndex = this.index._compile(math2, argNames);
      if (this.index.isObjectProperty()) {
        var prop = this.index.getObjectProperty();
        return function evalAccessorNode(scope, args, context) {
          return getSafeProperty(evalObject(scope, args, context), prop);
        };
      } else {
        return function evalAccessorNode(scope, args, context) {
          var object = evalObject(scope, args, context);
          var index2 = evalIndex(scope, args, object);
          return access(object, index2);
        };
      }
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(callback) {
      callback(this.object, "object", this);
      callback(this.index, "index", this);
    }
    /**
     * Create a new AccessorNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {AccessorNode} Returns a transformed copy of the node
     */
    map(callback) {
      return new AccessorNode2(this._ifNode(callback(this.object, "object", this)), this._ifNode(callback(this.index, "index", this)));
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {AccessorNode}
     */
    clone() {
      return new AccessorNode2(this.object, this.index);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string}
     */
    _toString(options) {
      var object = this.object.toString(options);
      if (needParenthesis(this.object)) {
        object = "(" + object + ")";
      }
      return object + this.index.toString(options);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string}
     */
    _toHTML(options) {
      var object = this.object.toHTML(options);
      if (needParenthesis(this.object)) {
        object = '<span class="math-parenthesis math-round-parenthesis">(</span>' + object + '<span class="math-parenthesis math-round-parenthesis">)</span>';
      }
      return object + this.index.toHTML(options);
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string}
     */
    _toTex(options) {
      var object = this.object.toTex(options);
      if (needParenthesis(this.object)) {
        object = "\\left(' + object + '\\right)";
      }
      return object + this.index.toTex(options);
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: name$V,
        object: this.object,
        index: this.index
      };
    }
    /**
     * Instantiate an AccessorNode from its JSON representation
     * @param {Object} json
     *     An object structured like
     *     `{"mathjs": "AccessorNode", object: ..., index: ...}`,
     *     where mathjs is optional
     * @returns {AccessorNode}
     */
    static fromJSON(json) {
      return new AccessorNode2(json.object, json.index);
    }
  }
  _defineProperty(AccessorNode2, "name", name$V);
  return AccessorNode2;
}, {
  isClass: true,
  isNode: true
});
var name$U = "ArrayNode";
var dependencies$U = ["Node"];
var createArrayNode = /* @__PURE__ */ factory(name$U, dependencies$U, (_ref) => {
  var {
    Node: Node2
  } = _ref;
  class ArrayNode2 extends Node2 {
    /**
     * @constructor ArrayNode
     * @extends {Node}
     * Holds an 1-dimensional array with items
     * @param {Node[]} [items]   1 dimensional array with items
     */
    constructor(items) {
      super();
      this.items = items || [];
      if (!Array.isArray(this.items) || !this.items.every(isNode)) {
        throw new TypeError("Array containing Nodes expected");
      }
    }
    get type() {
      return name$U;
    }
    get isArrayNode() {
      return true;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(math2, argNames) {
      var evalItems = map(this.items, function(item) {
        return item._compile(math2, argNames);
      });
      var asMatrix = math2.config.matrix !== "Array";
      if (asMatrix) {
        var matrix2 = math2.matrix;
        return function evalArrayNode(scope, args, context) {
          return matrix2(map(evalItems, function(evalItem) {
            return evalItem(scope, args, context);
          }));
        };
      } else {
        return function evalArrayNode(scope, args, context) {
          return map(evalItems, function(evalItem) {
            return evalItem(scope, args, context);
          });
        };
      }
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(callback) {
      for (var i2 = 0; i2 < this.items.length; i2++) {
        var node = this.items[i2];
        callback(node, "items[" + i2 + "]", this);
      }
    }
    /**
     * Create a new ArrayNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {ArrayNode} Returns a transformed copy of the node
     */
    map(callback) {
      var items = [];
      for (var i2 = 0; i2 < this.items.length; i2++) {
        items[i2] = this._ifNode(callback(this.items[i2], "items[" + i2 + "]", this));
      }
      return new ArrayNode2(items);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {ArrayNode}
     */
    clone() {
      return new ArrayNode2(this.items.slice(0));
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toString(options) {
      var items = this.items.map(function(node) {
        return node.toString(options);
      });
      return "[" + items.join(", ") + "]";
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: name$U,
        items: this.items
      };
    }
    /**
     * Instantiate an ArrayNode from its JSON representation
     * @param {Object} json  An object structured like
     *                       `{"mathjs": "ArrayNode", items: [...]}`,
     *                       where mathjs is optional
     * @returns {ArrayNode}
     */
    static fromJSON(json) {
      return new ArrayNode2(json.items);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toHTML(options) {
      var items = this.items.map(function(node) {
        return node.toHTML(options);
      });
      return '<span class="math-parenthesis math-square-parenthesis">[</span>' + items.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-square-parenthesis">]</span>';
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(options) {
      function itemsToTex(items, nested) {
        var mixedItems = items.some(isArrayNode) && !items.every(isArrayNode);
        var itemsFormRow = nested || mixedItems;
        var itemSep = itemsFormRow ? "&" : "\\\\";
        var itemsTex = items.map(function(node) {
          if (node.items) {
            return itemsToTex(node.items, !nested);
          } else {
            return node.toTex(options);
          }
        }).join(itemSep);
        return mixedItems || !itemsFormRow || itemsFormRow && !nested ? "\\begin{bmatrix}" + itemsTex + "\\end{bmatrix}" : itemsTex;
      }
      return itemsToTex(this.items, false);
    }
  }
  _defineProperty(ArrayNode2, "name", name$U);
  return ArrayNode2;
}, {
  isClass: true,
  isNode: true
});
function assignFactory(_ref) {
  var {
    subset: subset2,
    matrix: matrix2
  } = _ref;
  return function assign(object, index2, value) {
    try {
      if (Array.isArray(object)) {
        var result = matrix2(object).subset(index2, value).valueOf();
        result.forEach((item, index3) => {
          object[index3] = item;
        });
        return object;
      } else if (object && typeof object.subset === "function") {
        return object.subset(index2, value);
      } else if (typeof object === "string") {
        return subset2(object, index2, value);
      } else if (typeof object === "object") {
        if (!index2.isObjectProperty()) {
          throw TypeError("Cannot apply a numeric index as object property");
        }
        setSafeProperty(object, index2.getObjectProperty(), value);
        return object;
      } else {
        throw new TypeError("Cannot apply index: unsupported type of object");
      }
    } catch (err) {
      throw errorTransform(err);
    }
  };
}
var properties = [{
  // assignment
  AssignmentNode: {},
  FunctionAssignmentNode: {}
}, {
  // conditional expression
  ConditionalNode: {
    latexLeftParens: false,
    latexRightParens: false,
    latexParens: false
    // conditionals don't need parentheses in LaTeX because
    // they are 2 dimensional
  }
}, {
  // logical or
  "OperatorNode:or": {
    op: "or",
    associativity: "left",
    associativeWith: []
  }
}, {
  // logical xor
  "OperatorNode:xor": {
    op: "xor",
    associativity: "left",
    associativeWith: []
  }
}, {
  // logical and
  "OperatorNode:and": {
    op: "and",
    associativity: "left",
    associativeWith: []
  }
}, {
  // bitwise or
  "OperatorNode:bitOr": {
    op: "|",
    associativity: "left",
    associativeWith: []
  }
}, {
  // bitwise xor
  "OperatorNode:bitXor": {
    op: "^|",
    associativity: "left",
    associativeWith: []
  }
}, {
  // bitwise and
  "OperatorNode:bitAnd": {
    op: "&",
    associativity: "left",
    associativeWith: []
  }
}, {
  // relational operators
  "OperatorNode:equal": {
    op: "==",
    associativity: "left",
    associativeWith: []
  },
  "OperatorNode:unequal": {
    op: "!=",
    associativity: "left",
    associativeWith: []
  },
  "OperatorNode:smaller": {
    op: "<",
    associativity: "left",
    associativeWith: []
  },
  "OperatorNode:larger": {
    op: ">",
    associativity: "left",
    associativeWith: []
  },
  "OperatorNode:smallerEq": {
    op: "<=",
    associativity: "left",
    associativeWith: []
  },
  "OperatorNode:largerEq": {
    op: ">=",
    associativity: "left",
    associativeWith: []
  },
  RelationalNode: {
    associativity: "left",
    associativeWith: []
  }
}, {
  // bitshift operators
  "OperatorNode:leftShift": {
    op: "<<",
    associativity: "left",
    associativeWith: []
  },
  "OperatorNode:rightArithShift": {
    op: ">>",
    associativity: "left",
    associativeWith: []
  },
  "OperatorNode:rightLogShift": {
    op: ">>>",
    associativity: "left",
    associativeWith: []
  }
}, {
  // unit conversion
  "OperatorNode:to": {
    op: "to",
    associativity: "left",
    associativeWith: []
  }
}, {
  // range
  RangeNode: {}
}, {
  // addition, subtraction
  "OperatorNode:add": {
    op: "+",
    associativity: "left",
    associativeWith: ["OperatorNode:add", "OperatorNode:subtract"]
  },
  "OperatorNode:subtract": {
    op: "-",
    associativity: "left",
    associativeWith: []
  }
}, {
  // multiply, divide, modulus
  "OperatorNode:multiply": {
    op: "*",
    associativity: "left",
    associativeWith: ["OperatorNode:multiply", "OperatorNode:divide", "Operator:dotMultiply", "Operator:dotDivide"]
  },
  "OperatorNode:divide": {
    op: "/",
    associativity: "left",
    associativeWith: [],
    latexLeftParens: false,
    latexRightParens: false,
    latexParens: false
    // fractions don't require parentheses because
    // they're 2 dimensional, so parens aren't needed
    // in LaTeX
  },
  "OperatorNode:dotMultiply": {
    op: ".*",
    associativity: "left",
    associativeWith: ["OperatorNode:multiply", "OperatorNode:divide", "OperatorNode:dotMultiply", "OperatorNode:doDivide"]
  },
  "OperatorNode:dotDivide": {
    op: "./",
    associativity: "left",
    associativeWith: []
  },
  "OperatorNode:mod": {
    op: "mod",
    associativity: "left",
    associativeWith: []
  }
}, {
  // Repeat multiplication for implicit multiplication
  "OperatorNode:multiply": {
    associativity: "left",
    associativeWith: ["OperatorNode:multiply", "OperatorNode:divide", "Operator:dotMultiply", "Operator:dotDivide"]
  }
}, {
  // unary prefix operators
  "OperatorNode:unaryPlus": {
    op: "+",
    associativity: "right"
  },
  "OperatorNode:unaryMinus": {
    op: "-",
    associativity: "right"
  },
  "OperatorNode:bitNot": {
    op: "~",
    associativity: "right"
  },
  "OperatorNode:not": {
    op: "not",
    associativity: "right"
  }
}, {
  // exponentiation
  "OperatorNode:pow": {
    op: "^",
    associativity: "right",
    associativeWith: [],
    latexRightParens: false
    // the exponent doesn't need parentheses in
    // LaTeX because it's 2 dimensional
    // (it's on top)
  },
  "OperatorNode:dotPow": {
    op: ".^",
    associativity: "right",
    associativeWith: []
  }
}, {
  // factorial
  "OperatorNode:factorial": {
    op: "!",
    associativity: "left"
  }
}, {
  // matrix transpose
  "OperatorNode:ctranspose": {
    op: "'",
    associativity: "left"
  }
}];
function unwrapParen(_node, parenthesis) {
  if (!parenthesis || parenthesis !== "auto")
    return _node;
  var node = _node;
  while (isParenthesisNode(node))
    node = node.content;
  return node;
}
function getPrecedence(_node, parenthesis, implicit, parent) {
  var node = _node;
  if (parenthesis !== "keep") {
    node = _node.getContent();
  }
  var identifier = node.getIdentifier();
  var precedence = null;
  for (var i2 = 0; i2 < properties.length; i2++) {
    if (identifier in properties[i2]) {
      precedence = i2;
      break;
    }
  }
  if (identifier === "OperatorNode:multiply" && node.implicit && implicit !== "show") {
    var leftArg = unwrapParen(node.args[0], parenthesis);
    if (!(isConstantNode(leftArg) && parent && parent.getIdentifier() === "OperatorNode:divide" && rule2Node(unwrapParen(parent.args[0], parenthesis))) && !(leftArg.getIdentifier() === "OperatorNode:divide" && rule2Node(unwrapParen(leftArg.args[0], parenthesis)) && isConstantNode(unwrapParen(leftArg.args[1])))) {
      precedence += 1;
    }
  }
  return precedence;
}
function getAssociativity(_node, parenthesis) {
  var node = _node;
  if (parenthesis !== "keep") {
    node = _node.getContent();
  }
  var identifier = node.getIdentifier();
  var index2 = getPrecedence(node, parenthesis);
  if (index2 === null) {
    return null;
  }
  var property = properties[index2][identifier];
  if (hasOwnProperty(property, "associativity")) {
    if (property.associativity === "left") {
      return "left";
    }
    if (property.associativity === "right") {
      return "right";
    }
    throw Error("'" + identifier + "' has the invalid associativity '" + property.associativity + "'.");
  }
  return null;
}
function isAssociativeWith(nodeA, nodeB, parenthesis) {
  var a = parenthesis !== "keep" ? nodeA.getContent() : nodeA;
  var b = parenthesis !== "keep" ? nodeA.getContent() : nodeB;
  var identifierA = a.getIdentifier();
  var identifierB = b.getIdentifier();
  var index2 = getPrecedence(a, parenthesis);
  if (index2 === null) {
    return null;
  }
  var property = properties[index2][identifierA];
  if (hasOwnProperty(property, "associativeWith") && property.associativeWith instanceof Array) {
    for (var i2 = 0; i2 < property.associativeWith.length; i2++) {
      if (property.associativeWith[i2] === identifierB) {
        return true;
      }
    }
    return false;
  }
  return null;
}
function getOperator(fn) {
  var identifier = "OperatorNode:" + fn;
  for (var group of properties) {
    if (identifier in group) {
      return group[identifier].op;
    }
  }
  return null;
}
var name$T = "AssignmentNode";
var dependencies$T = [
  "subset",
  "?matrix",
  // FIXME: should not be needed at all, should be handled by subset
  "Node"
];
var createAssignmentNode = /* @__PURE__ */ factory(name$T, dependencies$T, (_ref) => {
  var {
    subset: subset2,
    matrix: matrix2,
    Node: Node2
  } = _ref;
  var access = accessFactory({
    subset: subset2
  });
  var assign = assignFactory({
    subset: subset2,
    matrix: matrix2
  });
  function needParenthesis(node, parenthesis, implicit) {
    if (!parenthesis) {
      parenthesis = "keep";
    }
    var precedence = getPrecedence(node, parenthesis, implicit);
    var exprPrecedence = getPrecedence(node.value, parenthesis, implicit);
    return parenthesis === "all" || exprPrecedence !== null && exprPrecedence <= precedence;
  }
  class AssignmentNode2 extends Node2 {
    /**
     * @constructor AssignmentNode
     * @extends {Node}
     *
     * Define a symbol, like `a=3.2`, update a property like `a.b=3.2`, or
     * replace a subset of a matrix like `A[2,2]=42`.
     *
     * Syntax:
     *
     *     new AssignmentNode(symbol, value)
     *     new AssignmentNode(object, index, value)
     *
     * Usage:
     *
     *    new AssignmentNode(new SymbolNode('a'), new ConstantNode(2))  // a=2
     *    new AssignmentNode(new SymbolNode('a'),
     *                       new IndexNode('b'),
     *                       new ConstantNode(2))   // a.b=2
     *    new AssignmentNode(new SymbolNode('a'),
     *                       new IndexNode(1, 2),
     *                       new ConstantNode(3))  // a[1,2]=3
     *
     * @param {SymbolNode | AccessorNode} object
     *     Object on which to assign a value
     * @param {IndexNode} [index=null]
     *     Index, property name or matrix index. Optional. If not provided
     *     and `object` is a SymbolNode, the property is assigned to the
     *     global scope.
     * @param {Node} value
     *     The value to be assigned
     */
    constructor(object, index2, value) {
      super();
      this.object = object;
      this.index = value ? index2 : null;
      this.value = value || index2;
      if (!isSymbolNode(object) && !isAccessorNode(object)) {
        throw new TypeError('SymbolNode or AccessorNode expected as "object"');
      }
      if (isSymbolNode(object) && object.name === "end") {
        throw new Error('Cannot assign to symbol "end"');
      }
      if (this.index && !isIndexNode(this.index)) {
        throw new TypeError('IndexNode expected as "index"');
      }
      if (!isNode(this.value)) {
        throw new TypeError('Node expected as "value"');
      }
    }
    // class name for typing purposes:
    // readonly property name
    get name() {
      if (this.index) {
        return this.index.isObjectProperty() ? this.index.getObjectProperty() : "";
      } else {
        return this.object.name || "";
      }
    }
    get type() {
      return name$T;
    }
    get isAssignmentNode() {
      return true;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(math2, argNames) {
      var evalObject = this.object._compile(math2, argNames);
      var evalIndex = this.index ? this.index._compile(math2, argNames) : null;
      var evalValue = this.value._compile(math2, argNames);
      var name2 = this.object.name;
      if (!this.index) {
        if (!isSymbolNode(this.object)) {
          throw new TypeError("SymbolNode expected as object");
        }
        return function evalAssignmentNode(scope, args, context) {
          var value = evalValue(scope, args, context);
          scope.set(name2, value);
          return value;
        };
      } else if (this.index.isObjectProperty()) {
        var prop = this.index.getObjectProperty();
        return function evalAssignmentNode(scope, args, context) {
          var object = evalObject(scope, args, context);
          var value = evalValue(scope, args, context);
          setSafeProperty(object, prop, value);
          return value;
        };
      } else if (isSymbolNode(this.object)) {
        return function evalAssignmentNode(scope, args, context) {
          var childObject = evalObject(scope, args, context);
          var value = evalValue(scope, args, context);
          var index2 = evalIndex(scope, args, childObject);
          scope.set(name2, assign(childObject, index2, value));
          return value;
        };
      } else {
        var evalParentObject = this.object.object._compile(math2, argNames);
        if (this.object.index.isObjectProperty()) {
          var parentProp = this.object.index.getObjectProperty();
          return function evalAssignmentNode(scope, args, context) {
            var parent = evalParentObject(scope, args, context);
            var childObject = getSafeProperty(parent, parentProp);
            var index2 = evalIndex(scope, args, childObject);
            var value = evalValue(scope, args, context);
            setSafeProperty(parent, parentProp, assign(childObject, index2, value));
            return value;
          };
        } else {
          var evalParentIndex = this.object.index._compile(math2, argNames);
          return function evalAssignmentNode(scope, args, context) {
            var parent = evalParentObject(scope, args, context);
            var parentIndex = evalParentIndex(scope, args, parent);
            var childObject = access(parent, parentIndex);
            var index2 = evalIndex(scope, args, childObject);
            var value = evalValue(scope, args, context);
            assign(parent, parentIndex, assign(childObject, index2, value));
            return value;
          };
        }
      }
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(callback) {
      callback(this.object, "object", this);
      if (this.index) {
        callback(this.index, "index", this);
      }
      callback(this.value, "value", this);
    }
    /**
     * Create a new AssignmentNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {AssignmentNode} Returns a transformed copy of the node
     */
    map(callback) {
      var object = this._ifNode(callback(this.object, "object", this));
      var index2 = this.index ? this._ifNode(callback(this.index, "index", this)) : null;
      var value = this._ifNode(callback(this.value, "value", this));
      return new AssignmentNode2(object, index2, value);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {AssignmentNode}
     */
    clone() {
      return new AssignmentNode2(this.object, this.index, this.value);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string}
     */
    _toString(options) {
      var object = this.object.toString(options);
      var index2 = this.index ? this.index.toString(options) : "";
      var value = this.value.toString(options);
      if (needParenthesis(this, options && options.parenthesis, options && options.implicit)) {
        value = "(" + value + ")";
      }
      return object + index2 + " = " + value;
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: name$T,
        object: this.object,
        index: this.index,
        value: this.value
      };
    }
    /**
     * Instantiate an AssignmentNode from its JSON representation
     * @param {Object} json
     *     An object structured like
     *     `{"mathjs": "AssignmentNode", object: ..., index: ..., value: ...}`,
     *     where mathjs is optional
     * @returns {AssignmentNode}
     */
    static fromJSON(json) {
      return new AssignmentNode2(json.object, json.index, json.value);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string}
     */
    _toHTML(options) {
      var object = this.object.toHTML(options);
      var index2 = this.index ? this.index.toHTML(options) : "";
      var value = this.value.toHTML(options);
      if (needParenthesis(this, options && options.parenthesis, options && options.implicit)) {
        value = '<span class="math-paranthesis math-round-parenthesis">(</span>' + value + '<span class="math-paranthesis math-round-parenthesis">)</span>';
      }
      return object + index2 + '<span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>' + value;
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string}
     */
    _toTex(options) {
      var object = this.object.toTex(options);
      var index2 = this.index ? this.index.toTex(options) : "";
      var value = this.value.toTex(options);
      if (needParenthesis(this, options && options.parenthesis, options && options.implicit)) {
        value = "\\left(".concat(value, "\\right)");
      }
      return object + index2 + "=" + value;
    }
  }
  _defineProperty(AssignmentNode2, "name", name$T);
  return AssignmentNode2;
}, {
  isClass: true,
  isNode: true
});
var name$S = "BlockNode";
var dependencies$S = ["ResultSet", "Node"];
var createBlockNode = /* @__PURE__ */ factory(name$S, dependencies$S, (_ref) => {
  var {
    ResultSet: ResultSet2,
    Node: Node2
  } = _ref;
  class BlockNode2 extends Node2 {
    /**
     * @constructor BlockNode
     * @extends {Node}
     * Holds a set with blocks
     * @param {Array.<{node: Node} | {node: Node, visible: boolean}>} blocks
     *            An array with blocks, where a block is constructed as an
     *            Object with properties block, which is a Node, and visible,
     *            which is a boolean. The property visible is optional and
     *            is true by default
     */
    constructor(blocks) {
      super();
      if (!Array.isArray(blocks))
        throw new Error("Array expected");
      this.blocks = blocks.map(function(block) {
        var node = block && block.node;
        var visible = block && block.visible !== void 0 ? block.visible : true;
        if (!isNode(node))
          throw new TypeError('Property "node" must be a Node');
        if (typeof visible !== "boolean") {
          throw new TypeError('Property "visible" must be a boolean');
        }
        return {
          node,
          visible
        };
      });
    }
    get type() {
      return name$S;
    }
    get isBlockNode() {
      return true;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(math2, argNames) {
      var evalBlocks = map(this.blocks, function(block) {
        return {
          evaluate: block.node._compile(math2, argNames),
          visible: block.visible
        };
      });
      return function evalBlockNodes(scope, args, context) {
        var results = [];
        forEach(evalBlocks, function evalBlockNode(block) {
          var result = block.evaluate(scope, args, context);
          if (block.visible) {
            results.push(result);
          }
        });
        return new ResultSet2(results);
      };
    }
    /**
     * Execute a callback for each of the child blocks of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(callback) {
      for (var i2 = 0; i2 < this.blocks.length; i2++) {
        callback(this.blocks[i2].node, "blocks[" + i2 + "].node", this);
      }
    }
    /**
     * Create a new BlockNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {BlockNode} Returns a transformed copy of the node
     */
    map(callback) {
      var blocks = [];
      for (var i2 = 0; i2 < this.blocks.length; i2++) {
        var block = this.blocks[i2];
        var node = this._ifNode(callback(block.node, "blocks[" + i2 + "].node", this));
        blocks[i2] = {
          node,
          visible: block.visible
        };
      }
      return new BlockNode2(blocks);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {BlockNode}
     */
    clone() {
      var blocks = this.blocks.map(function(block) {
        return {
          node: block.node,
          visible: block.visible
        };
      });
      return new BlockNode2(blocks);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toString(options) {
      return this.blocks.map(function(param) {
        return param.node.toString(options) + (param.visible ? "" : ";");
      }).join("\n");
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: name$S,
        blocks: this.blocks
      };
    }
    /**
     * Instantiate an BlockNode from its JSON representation
     * @param {Object} json
     *     An object structured like
     *     `{"mathjs": "BlockNode", blocks: [{node: ..., visible: false}, ...]}`,
     *     where mathjs is optional
     * @returns {BlockNode}
     */
    static fromJSON(json) {
      return new BlockNode2(json.blocks);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toHTML(options) {
      return this.blocks.map(function(param) {
        return param.node.toHTML(options) + (param.visible ? "" : '<span class="math-separator">;</span>');
      }).join('<span class="math-separator"><br /></span>');
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(options) {
      return this.blocks.map(function(param) {
        return param.node.toTex(options) + (param.visible ? "" : ";");
      }).join("\\;\\;\n");
    }
  }
  _defineProperty(BlockNode2, "name", name$S);
  return BlockNode2;
}, {
  isClass: true,
  isNode: true
});
var name$R = "ConditionalNode";
var dependencies$R = ["Node"];
var createConditionalNode = /* @__PURE__ */ factory(name$R, dependencies$R, (_ref) => {
  var {
    Node: Node2
  } = _ref;
  function testCondition(condition) {
    if (typeof condition === "number" || typeof condition === "boolean" || typeof condition === "string") {
      return !!condition;
    }
    if (condition) {
      if (isBigNumber(condition)) {
        return !condition.isZero();
      }
      if (isComplex(condition)) {
        return !!(condition.re || condition.im);
      }
      if (isUnit(condition)) {
        return !!condition.value;
      }
    }
    if (condition === null || condition === void 0) {
      return false;
    }
    throw new TypeError('Unsupported type of condition "' + typeOf(condition) + '"');
  }
  class ConditionalNode2 extends Node2 {
    /**
     * A lazy evaluating conditional operator: 'condition ? trueExpr : falseExpr'
     *
     * @param {Node} condition   Condition, must result in a boolean
     * @param {Node} trueExpr    Expression evaluated when condition is true
     * @param {Node} falseExpr   Expression evaluated when condition is true
     *
     * @constructor ConditionalNode
     * @extends {Node}
     */
    constructor(condition, trueExpr, falseExpr) {
      super();
      if (!isNode(condition)) {
        throw new TypeError("Parameter condition must be a Node");
      }
      if (!isNode(trueExpr)) {
        throw new TypeError("Parameter trueExpr must be a Node");
      }
      if (!isNode(falseExpr)) {
        throw new TypeError("Parameter falseExpr must be a Node");
      }
      this.condition = condition;
      this.trueExpr = trueExpr;
      this.falseExpr = falseExpr;
    }
    get type() {
      return name$R;
    }
    get isConditionalNode() {
      return true;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(math2, argNames) {
      var evalCondition = this.condition._compile(math2, argNames);
      var evalTrueExpr = this.trueExpr._compile(math2, argNames);
      var evalFalseExpr = this.falseExpr._compile(math2, argNames);
      return function evalConditionalNode(scope, args, context) {
        return testCondition(evalCondition(scope, args, context)) ? evalTrueExpr(scope, args, context) : evalFalseExpr(scope, args, context);
      };
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(callback) {
      callback(this.condition, "condition", this);
      callback(this.trueExpr, "trueExpr", this);
      callback(this.falseExpr, "falseExpr", this);
    }
    /**
     * Create a new ConditionalNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {ConditionalNode} Returns a transformed copy of the node
     */
    map(callback) {
      return new ConditionalNode2(this._ifNode(callback(this.condition, "condition", this)), this._ifNode(callback(this.trueExpr, "trueExpr", this)), this._ifNode(callback(this.falseExpr, "falseExpr", this)));
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {ConditionalNode}
     */
    clone() {
      return new ConditionalNode2(this.condition, this.trueExpr, this.falseExpr);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     */
    _toString(options) {
      var parenthesis = options && options.parenthesis ? options.parenthesis : "keep";
      var precedence = getPrecedence(this, parenthesis, options && options.implicit);
      var condition = this.condition.toString(options);
      var conditionPrecedence = getPrecedence(this.condition, parenthesis, options && options.implicit);
      if (parenthesis === "all" || this.condition.type === "OperatorNode" || conditionPrecedence !== null && conditionPrecedence <= precedence) {
        condition = "(" + condition + ")";
      }
      var trueExpr = this.trueExpr.toString(options);
      var truePrecedence = getPrecedence(this.trueExpr, parenthesis, options && options.implicit);
      if (parenthesis === "all" || this.trueExpr.type === "OperatorNode" || truePrecedence !== null && truePrecedence <= precedence) {
        trueExpr = "(" + trueExpr + ")";
      }
      var falseExpr = this.falseExpr.toString(options);
      var falsePrecedence = getPrecedence(this.falseExpr, parenthesis, options && options.implicit);
      if (parenthesis === "all" || this.falseExpr.type === "OperatorNode" || falsePrecedence !== null && falsePrecedence <= precedence) {
        falseExpr = "(" + falseExpr + ")";
      }
      return condition + " ? " + trueExpr + " : " + falseExpr;
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: name$R,
        condition: this.condition,
        trueExpr: this.trueExpr,
        falseExpr: this.falseExpr
      };
    }
    /**
     * Instantiate an ConditionalNode from its JSON representation
     * @param {Object} json
     *     An object structured like
     *     ```
     *     {"mathjs": "ConditionalNode",
     *      "condition": ...,
     *      "trueExpr": ...,
     *      "falseExpr": ...}
     *     ```
     *     where mathjs is optional
     * @returns {ConditionalNode}
     */
    static fromJSON(json) {
      return new ConditionalNode2(json.condition, json.trueExpr, json.falseExpr);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     */
    _toHTML(options) {
      var parenthesis = options && options.parenthesis ? options.parenthesis : "keep";
      var precedence = getPrecedence(this, parenthesis, options && options.implicit);
      var condition = this.condition.toHTML(options);
      var conditionPrecedence = getPrecedence(this.condition, parenthesis, options && options.implicit);
      if (parenthesis === "all" || this.condition.type === "OperatorNode" || conditionPrecedence !== null && conditionPrecedence <= precedence) {
        condition = '<span class="math-parenthesis math-round-parenthesis">(</span>' + condition + '<span class="math-parenthesis math-round-parenthesis">)</span>';
      }
      var trueExpr = this.trueExpr.toHTML(options);
      var truePrecedence = getPrecedence(this.trueExpr, parenthesis, options && options.implicit);
      if (parenthesis === "all" || this.trueExpr.type === "OperatorNode" || truePrecedence !== null && truePrecedence <= precedence) {
        trueExpr = '<span class="math-parenthesis math-round-parenthesis">(</span>' + trueExpr + '<span class="math-parenthesis math-round-parenthesis">)</span>';
      }
      var falseExpr = this.falseExpr.toHTML(options);
      var falsePrecedence = getPrecedence(this.falseExpr, parenthesis, options && options.implicit);
      if (parenthesis === "all" || this.falseExpr.type === "OperatorNode" || falsePrecedence !== null && falsePrecedence <= precedence) {
        falseExpr = '<span class="math-parenthesis math-round-parenthesis">(</span>' + falseExpr + '<span class="math-parenthesis math-round-parenthesis">)</span>';
      }
      return condition + '<span class="math-operator math-conditional-operator">?</span>' + trueExpr + '<span class="math-operator math-conditional-operator">:</span>' + falseExpr;
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(options) {
      return "\\begin{cases} {" + this.trueExpr.toTex(options) + "}, &\\quad{\\text{if }\\;" + this.condition.toTex(options) + "}\\\\{" + this.falseExpr.toTex(options) + "}, &\\quad{\\text{otherwise}}\\end{cases}";
    }
  }
  _defineProperty(ConditionalNode2, "name", name$R);
  return ConditionalNode2;
}, {
  isClass: true,
  isNode: true
});
var _extends = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var defaultEscapes = {
  "{": "\\{",
  "}": "\\}",
  "\\": "\\textbackslash{}",
  "#": "\\#",
  $: "\\$",
  "%": "\\%",
  "&": "\\&",
  "^": "\\textasciicircum{}",
  _: "\\_",
  "~": "\\textasciitilde{}"
};
var formatEscapes = {
  "–": "\\--",
  "—": "\\---",
  " ": "~",
  "	": "\\qquad{}",
  "\r\n": "\\newline{}",
  "\n": "\\newline{}"
};
var defaultEscapeMapFn = function defaultEscapeMapFn2(defaultEscapes2, formatEscapes2) {
  return _extends({}, defaultEscapes2, formatEscapes2);
};
var dist = function(str) {
  var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$preserveFormatti = _ref.preserveFormatting, preserveFormatting = _ref$preserveFormatti === void 0 ? false : _ref$preserveFormatti, _ref$escapeMapFn = _ref.escapeMapFn, escapeMapFn = _ref$escapeMapFn === void 0 ? defaultEscapeMapFn : _ref$escapeMapFn;
  var runningStr = String(str);
  var result = "";
  var escapes = escapeMapFn(_extends({}, defaultEscapes), preserveFormatting ? _extends({}, formatEscapes) : {});
  var escapeKeys = Object.keys(escapes);
  var _loop = function _loop2() {
    var specialCharFound = false;
    escapeKeys.forEach(function(key, index2) {
      if (specialCharFound) {
        return;
      }
      if (runningStr.length >= key.length && runningStr.slice(0, key.length) === key) {
        result += escapes[escapeKeys[index2]];
        runningStr = runningStr.slice(key.length, runningStr.length);
        specialCharFound = true;
      }
    });
    if (!specialCharFound) {
      result += runningStr.slice(0, 1);
      runningStr = runningStr.slice(1, runningStr.length);
    }
  };
  while (runningStr) {
    _loop();
  }
  return result;
};
const escapeLatexLib = /* @__PURE__ */ getDefaultExportFromCjs(dist);
var latexSymbols = {
  // GREEK LETTERS
  Alpha: "A",
  alpha: "\\alpha",
  Beta: "B",
  beta: "\\beta",
  Gamma: "\\Gamma",
  gamma: "\\gamma",
  Delta: "\\Delta",
  delta: "\\delta",
  Epsilon: "E",
  epsilon: "\\epsilon",
  varepsilon: "\\varepsilon",
  Zeta: "Z",
  zeta: "\\zeta",
  Eta: "H",
  eta: "\\eta",
  Theta: "\\Theta",
  theta: "\\theta",
  vartheta: "\\vartheta",
  Iota: "I",
  iota: "\\iota",
  Kappa: "K",
  kappa: "\\kappa",
  varkappa: "\\varkappa",
  Lambda: "\\Lambda",
  lambda: "\\lambda",
  Mu: "M",
  mu: "\\mu",
  Nu: "N",
  nu: "\\nu",
  Xi: "\\Xi",
  xi: "\\xi",
  Omicron: "O",
  omicron: "o",
  Pi: "\\Pi",
  pi: "\\pi",
  varpi: "\\varpi",
  Rho: "P",
  rho: "\\rho",
  varrho: "\\varrho",
  Sigma: "\\Sigma",
  sigma: "\\sigma",
  varsigma: "\\varsigma",
  Tau: "T",
  tau: "\\tau",
  Upsilon: "\\Upsilon",
  upsilon: "\\upsilon",
  Phi: "\\Phi",
  phi: "\\phi",
  varphi: "\\varphi",
  Chi: "X",
  chi: "\\chi",
  Psi: "\\Psi",
  psi: "\\psi",
  Omega: "\\Omega",
  omega: "\\omega",
  // logic
  true: "\\mathrm{True}",
  false: "\\mathrm{False}",
  // other
  i: "i",
  // TODO use \i ??
  inf: "\\infty",
  Inf: "\\infty",
  infinity: "\\infty",
  Infinity: "\\infty",
  oo: "\\infty",
  lim: "\\lim",
  undefined: "\\mathbf{?}"
};
var latexOperators = {
  transpose: "^\\top",
  ctranspose: "^H",
  factorial: "!",
  pow: "^",
  dotPow: ".^\\wedge",
  // TODO find ideal solution
  unaryPlus: "+",
  unaryMinus: "-",
  bitNot: "\\~",
  // TODO find ideal solution
  not: "\\neg",
  multiply: "\\cdot",
  divide: "\\frac",
  // TODO how to handle that properly?
  dotMultiply: ".\\cdot",
  // TODO find ideal solution
  dotDivide: ".:",
  // TODO find ideal solution
  mod: "\\mod",
  add: "+",
  subtract: "-",
  to: "\\rightarrow",
  leftShift: "<<",
  rightArithShift: ">>",
  rightLogShift: ">>>",
  equal: "=",
  unequal: "\\neq",
  smaller: "<",
  larger: ">",
  smallerEq: "\\leq",
  largerEq: "\\geq",
  bitAnd: "\\&",
  bitXor: "\\underline{|}",
  bitOr: "|",
  and: "\\wedge",
  xor: "\\veebar",
  or: "\\vee"
};
var latexFunctions = {
  // arithmetic
  abs: {
    1: "\\left|${args[0]}\\right|"
  },
  add: {
    2: "\\left(${args[0]}".concat(latexOperators.add, "${args[1]}\\right)")
  },
  cbrt: {
    1: "\\sqrt[3]{${args[0]}}"
  },
  ceil: {
    1: "\\left\\lceil${args[0]}\\right\\rceil"
  },
  cube: {
    1: "\\left(${args[0]}\\right)^3"
  },
  divide: {
    2: "\\frac{${args[0]}}{${args[1]}}"
  },
  dotDivide: {
    2: "\\left(${args[0]}".concat(latexOperators.dotDivide, "${args[1]}\\right)")
  },
  dotMultiply: {
    2: "\\left(${args[0]}".concat(latexOperators.dotMultiply, "${args[1]}\\right)")
  },
  dotPow: {
    2: "\\left(${args[0]}".concat(latexOperators.dotPow, "${args[1]}\\right)")
  },
  exp: {
    1: "\\exp\\left(${args[0]}\\right)"
  },
  expm1: "\\left(e".concat(latexOperators.pow, "{${args[0]}}-1\\right)"),
  fix: {
    1: "\\mathrm{${name}}\\left(${args[0]}\\right)"
  },
  floor: {
    1: "\\left\\lfloor${args[0]}\\right\\rfloor"
  },
  gcd: "\\gcd\\left(${args}\\right)",
  hypot: "\\hypot\\left(${args}\\right)",
  log: {
    1: "\\ln\\left(${args[0]}\\right)",
    2: "\\log_{${args[1]}}\\left(${args[0]}\\right)"
  },
  log10: {
    1: "\\log_{10}\\left(${args[0]}\\right)"
  },
  log1p: {
    1: "\\ln\\left(${args[0]}+1\\right)",
    2: "\\log_{${args[1]}}\\left(${args[0]}+1\\right)"
  },
  log2: "\\log_{2}\\left(${args[0]}\\right)",
  mod: {
    2: "\\left(${args[0]}".concat(latexOperators.mod, "${args[1]}\\right)")
  },
  multiply: {
    2: "\\left(${args[0]}".concat(latexOperators.multiply, "${args[1]}\\right)")
  },
  norm: {
    1: "\\left\\|${args[0]}\\right\\|",
    2: void 0
    // use default template
  },
  nthRoot: {
    2: "\\sqrt[${args[1]}]{${args[0]}}"
  },
  nthRoots: {
    2: "\\{y : $y^{args[1]} = {${args[0]}}\\}"
  },
  pow: {
    2: "\\left(${args[0]}\\right)".concat(latexOperators.pow, "{${args[1]}}")
  },
  round: {
    1: "\\left\\lfloor${args[0]}\\right\\rceil",
    2: void 0
    // use default template
  },
  sign: {
    1: "\\mathrm{${name}}\\left(${args[0]}\\right)"
  },
  sqrt: {
    1: "\\sqrt{${args[0]}}"
  },
  square: {
    1: "\\left(${args[0]}\\right)^2"
  },
  subtract: {
    2: "\\left(${args[0]}".concat(latexOperators.subtract, "${args[1]}\\right)")
  },
  unaryMinus: {
    1: "".concat(latexOperators.unaryMinus, "\\left(${args[0]}\\right)")
  },
  unaryPlus: {
    1: "".concat(latexOperators.unaryPlus, "\\left(${args[0]}\\right)")
  },
  // bitwise
  bitAnd: {
    2: "\\left(${args[0]}".concat(latexOperators.bitAnd, "${args[1]}\\right)")
  },
  bitNot: {
    1: latexOperators.bitNot + "\\left(${args[0]}\\right)"
  },
  bitOr: {
    2: "\\left(${args[0]}".concat(latexOperators.bitOr, "${args[1]}\\right)")
  },
  bitXor: {
    2: "\\left(${args[0]}".concat(latexOperators.bitXor, "${args[1]}\\right)")
  },
  leftShift: {
    2: "\\left(${args[0]}".concat(latexOperators.leftShift, "${args[1]}\\right)")
  },
  rightArithShift: {
    2: "\\left(${args[0]}".concat(latexOperators.rightArithShift, "${args[1]}\\right)")
  },
  rightLogShift: {
    2: "\\left(${args[0]}".concat(latexOperators.rightLogShift, "${args[1]}\\right)")
  },
  // combinatorics
  bellNumbers: {
    1: "\\mathrm{B}_{${args[0]}}"
  },
  catalan: {
    1: "\\mathrm{C}_{${args[0]}}"
  },
  stirlingS2: {
    2: "\\mathrm{S}\\left(${args}\\right)"
  },
  // complex
  arg: {
    1: "\\arg\\left(${args[0]}\\right)"
  },
  conj: {
    1: "\\left(${args[0]}\\right)^*"
  },
  im: {
    1: "\\Im\\left\\lbrace${args[0]}\\right\\rbrace"
  },
  re: {
    1: "\\Re\\left\\lbrace${args[0]}\\right\\rbrace"
  },
  // logical
  and: {
    2: "\\left(${args[0]}".concat(latexOperators.and, "${args[1]}\\right)")
  },
  not: {
    1: latexOperators.not + "\\left(${args[0]}\\right)"
  },
  or: {
    2: "\\left(${args[0]}".concat(latexOperators.or, "${args[1]}\\right)")
  },
  xor: {
    2: "\\left(${args[0]}".concat(latexOperators.xor, "${args[1]}\\right)")
  },
  // matrix
  cross: {
    2: "\\left(${args[0]}\\right)\\times\\left(${args[1]}\\right)"
  },
  ctranspose: {
    1: "\\left(${args[0]}\\right)".concat(latexOperators.ctranspose)
  },
  det: {
    1: "\\det\\left(${args[0]}\\right)"
  },
  dot: {
    2: "\\left(${args[0]}\\cdot${args[1]}\\right)"
  },
  expm: {
    1: "\\exp\\left(${args[0]}\\right)"
  },
  inv: {
    1: "\\left(${args[0]}\\right)^{-1}"
  },
  pinv: {
    1: "\\left(${args[0]}\\right)^{+}"
  },
  sqrtm: {
    1: "{${args[0]}}".concat(latexOperators.pow, "{\\frac{1}{2}}")
  },
  trace: {
    1: "\\mathrm{tr}\\left(${args[0]}\\right)"
  },
  transpose: {
    1: "\\left(${args[0]}\\right)".concat(latexOperators.transpose)
  },
  // probability
  combinations: {
    2: "\\binom{${args[0]}}{${args[1]}}"
  },
  combinationsWithRep: {
    2: "\\left(\\!\\!{\\binom{${args[0]}}{${args[1]}}}\\!\\!\\right)"
  },
  factorial: {
    1: "\\left(${args[0]}\\right)".concat(latexOperators.factorial)
  },
  gamma: {
    1: "\\Gamma\\left(${args[0]}\\right)"
  },
  lgamma: {
    1: "\\ln\\Gamma\\left(${args[0]}\\right)"
  },
  // relational
  equal: {
    2: "\\left(${args[0]}".concat(latexOperators.equal, "${args[1]}\\right)")
  },
  larger: {
    2: "\\left(${args[0]}".concat(latexOperators.larger, "${args[1]}\\right)")
  },
  largerEq: {
    2: "\\left(${args[0]}".concat(latexOperators.largerEq, "${args[1]}\\right)")
  },
  smaller: {
    2: "\\left(${args[0]}".concat(latexOperators.smaller, "${args[1]}\\right)")
  },
  smallerEq: {
    2: "\\left(${args[0]}".concat(latexOperators.smallerEq, "${args[1]}\\right)")
  },
  unequal: {
    2: "\\left(${args[0]}".concat(latexOperators.unequal, "${args[1]}\\right)")
  },
  // special
  erf: {
    1: "erf\\left(${args[0]}\\right)"
  },
  // statistics
  max: "\\max\\left(${args}\\right)",
  min: "\\min\\left(${args}\\right)",
  variance: "\\mathrm{Var}\\left(${args}\\right)",
  // trigonometry
  acos: {
    1: "\\cos^{-1}\\left(${args[0]}\\right)"
  },
  acosh: {
    1: "\\cosh^{-1}\\left(${args[0]}\\right)"
  },
  acot: {
    1: "\\cot^{-1}\\left(${args[0]}\\right)"
  },
  acoth: {
    1: "\\coth^{-1}\\left(${args[0]}\\right)"
  },
  acsc: {
    1: "\\csc^{-1}\\left(${args[0]}\\right)"
  },
  acsch: {
    1: "\\mathrm{csch}^{-1}\\left(${args[0]}\\right)"
  },
  asec: {
    1: "\\sec^{-1}\\left(${args[0]}\\right)"
  },
  asech: {
    1: "\\mathrm{sech}^{-1}\\left(${args[0]}\\right)"
  },
  asin: {
    1: "\\sin^{-1}\\left(${args[0]}\\right)"
  },
  asinh: {
    1: "\\sinh^{-1}\\left(${args[0]}\\right)"
  },
  atan: {
    1: "\\tan^{-1}\\left(${args[0]}\\right)"
  },
  atan2: {
    2: "\\mathrm{atan2}\\left(${args}\\right)"
  },
  atanh: {
    1: "\\tanh^{-1}\\left(${args[0]}\\right)"
  },
  cos: {
    1: "\\cos\\left(${args[0]}\\right)"
  },
  cosh: {
    1: "\\cosh\\left(${args[0]}\\right)"
  },
  cot: {
    1: "\\cot\\left(${args[0]}\\right)"
  },
  coth: {
    1: "\\coth\\left(${args[0]}\\right)"
  },
  csc: {
    1: "\\csc\\left(${args[0]}\\right)"
  },
  csch: {
    1: "\\mathrm{csch}\\left(${args[0]}\\right)"
  },
  sec: {
    1: "\\sec\\left(${args[0]}\\right)"
  },
  sech: {
    1: "\\mathrm{sech}\\left(${args[0]}\\right)"
  },
  sin: {
    1: "\\sin\\left(${args[0]}\\right)"
  },
  sinh: {
    1: "\\sinh\\left(${args[0]}\\right)"
  },
  tan: {
    1: "\\tan\\left(${args[0]}\\right)"
  },
  tanh: {
    1: "\\tanh\\left(${args[0]}\\right)"
  },
  // unit
  to: {
    2: "\\left(${args[0]}".concat(latexOperators.to, "${args[1]}\\right)")
  },
  // utils
  numeric: function numeric2(node, options) {
    return node.args[0].toTex();
  },
  // type
  number: {
    0: "0",
    1: "\\left(${args[0]}\\right)",
    2: "\\left(\\left(${args[0]}\\right)${args[1]}\\right)"
  },
  string: {
    0: '\\mathtt{""}',
    1: "\\mathrm{string}\\left(${args[0]}\\right)"
  },
  bignumber: {
    0: "0",
    1: "\\left(${args[0]}\\right)"
  },
  complex: {
    0: "0",
    1: "\\left(${args[0]}\\right)",
    2: "\\left(\\left(${args[0]}\\right)+".concat(latexSymbols.i, "\\cdot\\left(${args[1]}\\right)\\right)")
  },
  matrix: {
    0: "\\begin{bmatrix}\\end{bmatrix}",
    1: "\\left(${args[0]}\\right)",
    2: "\\left(${args[0]}\\right)"
  },
  sparse: {
    0: "\\begin{bsparse}\\end{bsparse}",
    1: "\\left(${args[0]}\\right)"
  },
  unit: {
    1: "\\left(${args[0]}\\right)",
    2: "\\left(\\left(${args[0]}\\right)${args[1]}\\right)"
  }
};
var defaultTemplate = "\\mathrm{${name}}\\left(${args}\\right)";
var latexUnits = {
  deg: "^\\circ"
};
function escapeLatex(string2) {
  return escapeLatexLib(string2, {
    preserveFormatting: true
  });
}
function toSymbol(name2, isUnit2) {
  isUnit2 = typeof isUnit2 === "undefined" ? false : isUnit2;
  if (isUnit2) {
    if (hasOwnProperty(latexUnits, name2)) {
      return latexUnits[name2];
    }
    return "\\mathrm{" + escapeLatex(name2) + "}";
  }
  if (hasOwnProperty(latexSymbols, name2)) {
    return latexSymbols[name2];
  }
  return escapeLatex(name2);
}
var name$Q = "ConstantNode";
var dependencies$Q = ["Node"];
var createConstantNode = /* @__PURE__ */ factory(name$Q, dependencies$Q, (_ref) => {
  var {
    Node: Node2
  } = _ref;
  class ConstantNode2 extends Node2 {
    /**
     * A ConstantNode holds a constant value like a number or string.
     *
     * Usage:
     *
     *     new ConstantNode(2.3)
     *     new ConstantNode('hello')
     *
     * @param {*} value    Value can be any type (number, BigNumber, string, ...)
     * @constructor ConstantNode
     * @extends {Node}
     */
    constructor(value) {
      super();
      this.value = value;
    }
    get type() {
      return name$Q;
    }
    get isConstantNode() {
      return true;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(math2, argNames) {
      var value = this.value;
      return function evalConstantNode() {
        return value;
      };
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(callback) {
    }
    /**
     * Create a new ConstantNode with children produced by the given callback.
     * Trivial because there are no children.
     * @param {function(child: Node, path: string, parent: Node) : Node} callback
     * @returns {ConstantNode} Returns a clone of the node
     */
    map(callback) {
      return this.clone();
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {ConstantNode}
     */
    clone() {
      return new ConstantNode2(this.value);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     */
    _toString(options) {
      return format(this.value, options);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     */
    _toHTML(options) {
      var value = this._toString(options);
      switch (typeOf(this.value)) {
        case "number":
        case "BigNumber":
        case "Fraction":
          return '<span class="math-number">' + value + "</span>";
        case "string":
          return '<span class="math-string">' + value + "</span>";
        case "boolean":
          return '<span class="math-boolean">' + value + "</span>";
        case "null":
          return '<span class="math-null-symbol">' + value + "</span>";
        case "undefined":
          return '<span class="math-undefined">' + value + "</span>";
        default:
          return '<span class="math-symbol">' + value + "</span>";
      }
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: name$Q,
        value: this.value
      };
    }
    /**
     * Instantiate a ConstantNode from its JSON representation
     * @param {Object} json  An object structured like
     *                       `{"mathjs": "SymbolNode", value: 2.3}`,
     *                       where mathjs is optional
     * @returns {ConstantNode}
     */
    static fromJSON(json) {
      return new ConstantNode2(json.value);
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(options) {
      var value = this._toString(options);
      var type = typeOf(this.value);
      switch (type) {
        case "string":
          return "\\mathtt{" + escapeLatex(value) + "}";
        case "number":
        case "BigNumber": {
          var finite = type === "BigNumber" ? this.value.isFinite() : isFinite(this.value);
          if (!finite) {
            return this.value.valueOf() < 0 ? "-\\infty" : "\\infty";
          }
          var index2 = value.toLowerCase().indexOf("e");
          if (index2 !== -1) {
            return value.substring(0, index2) + "\\cdot10^{" + value.substring(index2 + 1) + "}";
          }
          return value;
        }
        case "Fraction":
          return this.value.toLatex();
        default:
          return value;
      }
    }
  }
  _defineProperty(ConstantNode2, "name", name$Q);
  return ConstantNode2;
}, {
  isClass: true,
  isNode: true
});
var name$P = "FunctionAssignmentNode";
var dependencies$P = ["typed", "Node"];
var createFunctionAssignmentNode = /* @__PURE__ */ factory(name$P, dependencies$P, (_ref) => {
  var {
    typed: typed2,
    Node: Node2
  } = _ref;
  function needParenthesis(node, parenthesis, implicit) {
    var precedence = getPrecedence(node, parenthesis, implicit);
    var exprPrecedence = getPrecedence(node.expr, parenthesis, implicit);
    return parenthesis === "all" || exprPrecedence !== null && exprPrecedence <= precedence;
  }
  class FunctionAssignmentNode2 extends Node2 {
    /**
     * @constructor FunctionAssignmentNode
     * @extends {Node}
     * Function assignment
     *
     * @param {string} name           Function name
     * @param {string[] | Array.<{name: string, type: string}>} params
     *                                Array with function parameter names, or an
     *                                array with objects containing the name
     *                                and type of the parameter
     * @param {Node} expr             The function expression
     */
    constructor(name2, params, expr) {
      super();
      if (typeof name2 !== "string") {
        throw new TypeError('String expected for parameter "name"');
      }
      if (!Array.isArray(params)) {
        throw new TypeError('Array containing strings or objects expected for parameter "params"');
      }
      if (!isNode(expr)) {
        throw new TypeError('Node expected for parameter "expr"');
      }
      if (keywords.has(name2)) {
        throw new Error('Illegal function name, "' + name2 + '" is a reserved keyword');
      }
      var paramNames = /* @__PURE__ */ new Set();
      for (var param of params) {
        var _name = typeof param === "string" ? param : param.name;
        if (paramNames.has(_name)) {
          throw new Error('Duplicate parameter name "'.concat(_name, '"'));
        } else {
          paramNames.add(_name);
        }
      }
      this.name = name2;
      this.params = params.map(function(param2) {
        return param2 && param2.name || param2;
      });
      this.types = params.map(function(param2) {
        return param2 && param2.type || "any";
      });
      this.expr = expr;
    }
    get type() {
      return name$P;
    }
    get isFunctionAssignmentNode() {
      return true;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(math2, argNames) {
      var childArgNames = Object.create(argNames);
      forEach(this.params, function(param) {
        childArgNames[param] = true;
      });
      var evalExpr = this.expr._compile(math2, childArgNames);
      var name2 = this.name;
      var params = this.params;
      var signature = join(this.types, ",");
      var syntax = name2 + "(" + join(this.params, ", ") + ")";
      return function evalFunctionAssignmentNode(scope, args, context) {
        var signatures = {};
        signatures[signature] = function() {
          var childArgs = Object.create(args);
          for (var i2 = 0; i2 < params.length; i2++) {
            childArgs[params[i2]] = arguments[i2];
          }
          return evalExpr(scope, childArgs, context);
        };
        var fn = typed2(name2, signatures);
        fn.syntax = syntax;
        scope.set(name2, fn);
        return fn;
      };
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(callback) {
      callback(this.expr, "expr", this);
    }
    /**
     * Create a new FunctionAssignmentNode whose children are the results of
     * calling the provided callback function for each child of the original
     * node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {FunctionAssignmentNode} Returns a transformed copy of the node
     */
    map(callback) {
      var expr = this._ifNode(callback(this.expr, "expr", this));
      return new FunctionAssignmentNode2(this.name, this.params.slice(0), expr);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {FunctionAssignmentNode}
     */
    clone() {
      return new FunctionAssignmentNode2(this.name, this.params.slice(0), this.expr);
    }
    /**
     * get string representation
     * @param {Object} options
     * @return {string} str
     */
    _toString(options) {
      var parenthesis = options && options.parenthesis ? options.parenthesis : "keep";
      var expr = this.expr.toString(options);
      if (needParenthesis(this, parenthesis, options && options.implicit)) {
        expr = "(" + expr + ")";
      }
      return this.name + "(" + this.params.join(", ") + ") = " + expr;
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      var types = this.types;
      return {
        mathjs: name$P,
        name: this.name,
        params: this.params.map(function(param, index2) {
          return {
            name: param,
            type: types[index2]
          };
        }),
        expr: this.expr
      };
    }
    /**
     * Instantiate an FunctionAssignmentNode from its JSON representation
     * @param {Object} json
     *     An object structured like
     *     ```
     *     {"mathjs": "FunctionAssignmentNode",
     *      name: ..., params: ..., expr: ...}
     *     ```
     *     where mathjs is optional
     * @returns {FunctionAssignmentNode}
     */
    static fromJSON(json) {
      return new FunctionAssignmentNode2(json.name, json.params, json.expr);
    }
    /**
     * get HTML representation
     * @param {Object} options
     * @return {string} str
     */
    _toHTML(options) {
      var parenthesis = options && options.parenthesis ? options.parenthesis : "keep";
      var params = [];
      for (var i2 = 0; i2 < this.params.length; i2++) {
        params.push('<span class="math-symbol math-parameter">' + escape(this.params[i2]) + "</span>");
      }
      var expr = this.expr.toHTML(options);
      if (needParenthesis(this, parenthesis, options && options.implicit)) {
        expr = '<span class="math-parenthesis math-round-parenthesis">(</span>' + expr + '<span class="math-parenthesis math-round-parenthesis">)</span>';
      }
      return '<span class="math-function">' + escape(this.name) + '</span><span class="math-parenthesis math-round-parenthesis">(</span>' + params.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-round-parenthesis">)</span><span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>' + expr;
    }
    /**
     * get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(options) {
      var parenthesis = options && options.parenthesis ? options.parenthesis : "keep";
      var expr = this.expr.toTex(options);
      if (needParenthesis(this, parenthesis, options && options.implicit)) {
        expr = "\\left(".concat(expr, "\\right)");
      }
      return "\\mathrm{" + this.name + "}\\left(" + this.params.map(toSymbol).join(",") + "\\right)=" + expr;
    }
  }
  _defineProperty(FunctionAssignmentNode2, "name", name$P);
  return FunctionAssignmentNode2;
}, {
  isClass: true,
  isNode: true
});
var name$O = "IndexNode";
var dependencies$O = ["Node", "size"];
var createIndexNode = /* @__PURE__ */ factory(name$O, dependencies$O, (_ref) => {
  var {
    Node: Node2,
    size: size2
  } = _ref;
  class IndexNode2 extends Node2 {
    /**
     * @constructor IndexNode
     * @extends Node
     *
     * Describes a subset of a matrix or an object property.
     * Cannot be used on its own, needs to be used within an AccessorNode or
     * AssignmentNode.
     *
     * @param {Node[]} dimensions
     * @param {boolean} [dotNotation=false]
     *     Optional property describing whether this index was written using dot
     *     notation like `a.b`, or using bracket notation like `a["b"]`
     *     (which is the default). This property is used for string conversion.
     */
    constructor(dimensions, dotNotation) {
      super();
      this.dimensions = dimensions;
      this.dotNotation = dotNotation || false;
      if (!Array.isArray(dimensions) || !dimensions.every(isNode)) {
        throw new TypeError('Array containing Nodes expected for parameter "dimensions"');
      }
      if (this.dotNotation && !this.isObjectProperty()) {
        throw new Error("dotNotation only applicable for object properties");
      }
    }
    get type() {
      return name$O;
    }
    get isIndexNode() {
      return true;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(math2, argNames) {
      var evalDimensions = map(this.dimensions, function(dimension, i2) {
        var needsEnd = dimension.filter((node) => node.isSymbolNode && node.name === "end").length > 0;
        if (needsEnd) {
          var childArgNames = Object.create(argNames);
          childArgNames.end = true;
          var _evalDimension = dimension._compile(math2, childArgNames);
          return function evalDimension(scope, args, context) {
            if (!isMatrix(context) && !isArray(context) && !isString(context)) {
              throw new TypeError('Cannot resolve "end": context must be a Matrix, Array, or string but is ' + typeOf(context));
            }
            var s = size2(context).valueOf();
            var childArgs = Object.create(args);
            childArgs.end = s[i2];
            return _evalDimension(scope, childArgs, context);
          };
        } else {
          return dimension._compile(math2, argNames);
        }
      });
      var index2 = getSafeProperty(math2, "index");
      return function evalIndexNode(scope, args, context) {
        var dimensions = map(evalDimensions, function(evalDimension) {
          return evalDimension(scope, args, context);
        });
        return index2(...dimensions);
      };
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(callback) {
      for (var i2 = 0; i2 < this.dimensions.length; i2++) {
        callback(this.dimensions[i2], "dimensions[" + i2 + "]", this);
      }
    }
    /**
     * Create a new IndexNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {IndexNode} Returns a transformed copy of the node
     */
    map(callback) {
      var dimensions = [];
      for (var i2 = 0; i2 < this.dimensions.length; i2++) {
        dimensions[i2] = this._ifNode(callback(this.dimensions[i2], "dimensions[" + i2 + "]", this));
      }
      return new IndexNode2(dimensions, this.dotNotation);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {IndexNode}
     */
    clone() {
      return new IndexNode2(this.dimensions.slice(0), this.dotNotation);
    }
    /**
     * Test whether this IndexNode contains a single property name
     * @return {boolean}
     */
    isObjectProperty() {
      return this.dimensions.length === 1 && isConstantNode(this.dimensions[0]) && typeof this.dimensions[0].value === "string";
    }
    /**
     * Returns the property name if IndexNode contains a property.
     * If not, returns null.
     * @return {string | null}
     */
    getObjectProperty() {
      return this.isObjectProperty() ? this.dimensions[0].value : null;
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     */
    _toString(options) {
      return this.dotNotation ? "." + this.getObjectProperty() : "[" + this.dimensions.join(", ") + "]";
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: name$O,
        dimensions: this.dimensions,
        dotNotation: this.dotNotation
      };
    }
    /**
     * Instantiate an IndexNode from its JSON representation
     * @param {Object} json
     *     An object structured like
     *     `{"mathjs": "IndexNode", dimensions: [...], dotNotation: false}`,
     *     where mathjs is optional
     * @returns {IndexNode}
     */
    static fromJSON(json) {
      return new IndexNode2(json.dimensions, json.dotNotation);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     */
    _toHTML(options) {
      var dimensions = [];
      for (var i2 = 0; i2 < this.dimensions.length; i2++) {
        dimensions[i2] = this.dimensions[i2].toHTML();
      }
      if (this.dotNotation) {
        return '<span class="math-operator math-accessor-operator">.</span><span class="math-symbol math-property">' + escape(this.getObjectProperty()) + "</span>";
      } else {
        return '<span class="math-parenthesis math-square-parenthesis">[</span>' + dimensions.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-square-parenthesis">]</span>';
      }
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(options) {
      var dimensions = this.dimensions.map(function(range2) {
        return range2.toTex(options);
      });
      return this.dotNotation ? "." + this.getObjectProperty() : "_{" + dimensions.join(",") + "}";
    }
  }
  _defineProperty(IndexNode2, "name", name$O);
  return IndexNode2;
}, {
  isClass: true,
  isNode: true
});
var name$N = "ObjectNode";
var dependencies$N = ["Node"];
var createObjectNode = /* @__PURE__ */ factory(name$N, dependencies$N, (_ref) => {
  var {
    Node: Node2
  } = _ref;
  class ObjectNode2 extends Node2 {
    /**
     * @constructor ObjectNode
     * @extends {Node}
     * Holds an object with keys/values
     * @param {Object.<string, Node>} [properties]   object with key/value pairs
     */
    constructor(properties2) {
      super();
      this.properties = properties2 || {};
      if (properties2) {
        if (!(typeof properties2 === "object") || !Object.keys(properties2).every(function(key) {
          return isNode(properties2[key]);
        })) {
          throw new TypeError("Object containing Nodes expected");
        }
      }
    }
    get type() {
      return name$N;
    }
    get isObjectNode() {
      return true;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(math2, argNames) {
      var evalEntries = {};
      for (var key in this.properties) {
        if (hasOwnProperty(this.properties, key)) {
          var stringifiedKey = stringify(key);
          var parsedKey = JSON.parse(stringifiedKey);
          var prop = getSafeProperty(this.properties, key);
          evalEntries[parsedKey] = prop._compile(math2, argNames);
        }
      }
      return function evalObjectNode(scope, args, context) {
        var obj = {};
        for (var _key in evalEntries) {
          if (hasOwnProperty(evalEntries, _key)) {
            obj[_key] = evalEntries[_key](scope, args, context);
          }
        }
        return obj;
      };
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(callback) {
      for (var key in this.properties) {
        if (hasOwnProperty(this.properties, key)) {
          callback(this.properties[key], "properties[" + stringify(key) + "]", this);
        }
      }
    }
    /**
     * Create a new ObjectNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {ObjectNode} Returns a transformed copy of the node
     */
    map(callback) {
      var properties2 = {};
      for (var key in this.properties) {
        if (hasOwnProperty(this.properties, key)) {
          properties2[key] = this._ifNode(callback(this.properties[key], "properties[" + stringify(key) + "]", this));
        }
      }
      return new ObjectNode2(properties2);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {ObjectNode}
     */
    clone() {
      var properties2 = {};
      for (var key in this.properties) {
        if (hasOwnProperty(this.properties, key)) {
          properties2[key] = this.properties[key];
        }
      }
      return new ObjectNode2(properties2);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toString(options) {
      var entries = [];
      for (var key in this.properties) {
        if (hasOwnProperty(this.properties, key)) {
          entries.push(stringify(key) + ": " + this.properties[key].toString(options));
        }
      }
      return "{" + entries.join(", ") + "}";
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: name$N,
        properties: this.properties
      };
    }
    /**
     * Instantiate an OperatorNode from its JSON representation
     * @param {Object} json  An object structured like
     *                       `{"mathjs": "ObjectNode", "properties": {...}}`,
     *                       where mathjs is optional
     * @returns {ObjectNode}
     */
    static fromJSON(json) {
      return new ObjectNode2(json.properties);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toHTML(options) {
      var entries = [];
      for (var key in this.properties) {
        if (hasOwnProperty(this.properties, key)) {
          entries.push('<span class="math-symbol math-property">' + escape(key) + '</span><span class="math-operator math-assignment-operator math-property-assignment-operator math-binary-operator">:</span>' + this.properties[key].toHTML(options));
        }
      }
      return '<span class="math-parenthesis math-curly-parenthesis">{</span>' + entries.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-curly-parenthesis">}</span>';
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(options) {
      var entries = [];
      for (var key in this.properties) {
        if (hasOwnProperty(this.properties, key)) {
          entries.push("\\mathbf{" + key + ":} & " + this.properties[key].toTex(options) + "\\\\");
        }
      }
      var tex = "\\left\\{\\begin{array}{ll}" + entries.join("\n") + "\\end{array}\\right\\}";
      return tex;
    }
  }
  _defineProperty(ObjectNode2, "name", name$N);
  return ObjectNode2;
}, {
  isClass: true,
  isNode: true
});
function createSubScope(parentScope, args) {
  return new PartitionedMap(parentScope, new ObjectWrappingMap(args), new Set(Object.keys(args)));
}
var name$M = "OperatorNode";
var dependencies$M = ["Node"];
var createOperatorNode = /* @__PURE__ */ factory(name$M, dependencies$M, (_ref) => {
  var {
    Node: Node2
  } = _ref;
  function startsWithConstant(expr, parenthesis) {
    var curNode = expr;
    if (parenthesis === "auto") {
      while (isParenthesisNode(curNode))
        curNode = curNode.content;
    }
    if (isConstantNode(curNode))
      return true;
    if (isOperatorNode(curNode)) {
      return startsWithConstant(curNode.args[0], parenthesis);
    }
    return false;
  }
  function calculateNecessaryParentheses(root, parenthesis, implicit, args, latex) {
    var precedence = getPrecedence(root, parenthesis, implicit);
    var associativity = getAssociativity(root, parenthesis);
    if (parenthesis === "all" || args.length > 2 && root.getIdentifier() !== "OperatorNode:add" && root.getIdentifier() !== "OperatorNode:multiply") {
      return args.map(function(arg2) {
        switch (arg2.getContent().type) {
          case "ArrayNode":
          case "ConstantNode":
          case "SymbolNode":
          case "ParenthesisNode":
            return false;
          default:
            return true;
        }
      });
    }
    var result;
    switch (args.length) {
      case 0:
        result = [];
        break;
      case 1:
        {
          var operandPrecedence = getPrecedence(args[0], parenthesis, implicit, root);
          if (latex && operandPrecedence !== null) {
            var operandIdentifier;
            var rootIdentifier;
            if (parenthesis === "keep") {
              operandIdentifier = args[0].getIdentifier();
              rootIdentifier = root.getIdentifier();
            } else {
              operandIdentifier = args[0].getContent().getIdentifier();
              rootIdentifier = root.getContent().getIdentifier();
            }
            if (properties[precedence][rootIdentifier].latexLeftParens === false) {
              result = [false];
              break;
            }
            if (properties[operandPrecedence][operandIdentifier].latexParens === false) {
              result = [false];
              break;
            }
          }
          if (operandPrecedence === null) {
            result = [false];
            break;
          }
          if (operandPrecedence <= precedence) {
            result = [true];
            break;
          }
          result = [false];
        }
        break;
      case 2:
        {
          var lhsParens;
          var lhsPrecedence = getPrecedence(args[0], parenthesis, implicit, root);
          var assocWithLhs = isAssociativeWith(root, args[0], parenthesis);
          if (lhsPrecedence === null) {
            lhsParens = false;
          } else if (lhsPrecedence === precedence && associativity === "right" && !assocWithLhs) {
            lhsParens = true;
          } else if (lhsPrecedence < precedence) {
            lhsParens = true;
          } else {
            lhsParens = false;
          }
          var rhsParens;
          var rhsPrecedence = getPrecedence(args[1], parenthesis, implicit, root);
          var assocWithRhs = isAssociativeWith(root, args[1], parenthesis);
          if (rhsPrecedence === null) {
            rhsParens = false;
          } else if (rhsPrecedence === precedence && associativity === "left" && !assocWithRhs) {
            rhsParens = true;
          } else if (rhsPrecedence < precedence) {
            rhsParens = true;
          } else {
            rhsParens = false;
          }
          if (latex) {
            var _rootIdentifier;
            var lhsIdentifier;
            var rhsIdentifier;
            if (parenthesis === "keep") {
              _rootIdentifier = root.getIdentifier();
              lhsIdentifier = root.args[0].getIdentifier();
              rhsIdentifier = root.args[1].getIdentifier();
            } else {
              _rootIdentifier = root.getContent().getIdentifier();
              lhsIdentifier = root.args[0].getContent().getIdentifier();
              rhsIdentifier = root.args[1].getContent().getIdentifier();
            }
            if (lhsPrecedence !== null) {
              if (properties[precedence][_rootIdentifier].latexLeftParens === false) {
                lhsParens = false;
              }
              if (properties[lhsPrecedence][lhsIdentifier].latexParens === false) {
                lhsParens = false;
              }
            }
            if (rhsPrecedence !== null) {
              if (properties[precedence][_rootIdentifier].latexRightParens === false) {
                rhsParens = false;
              }
              if (properties[rhsPrecedence][rhsIdentifier].latexParens === false) {
                rhsParens = false;
              }
            }
          }
          result = [lhsParens, rhsParens];
        }
        break;
      default:
        if (root.getIdentifier() === "OperatorNode:add" || root.getIdentifier() === "OperatorNode:multiply") {
          result = args.map(function(arg2) {
            var argPrecedence = getPrecedence(arg2, parenthesis, implicit, root);
            var assocWithArg = isAssociativeWith(root, arg2, parenthesis);
            var argAssociativity = getAssociativity(arg2, parenthesis);
            if (argPrecedence === null) {
              return false;
            } else if (precedence === argPrecedence && associativity === argAssociativity && !assocWithArg) {
              return true;
            } else if (argPrecedence < precedence) {
              return true;
            }
            return false;
          });
        }
        break;
    }
    if (args.length >= 2 && root.getIdentifier() === "OperatorNode:multiply" && root.implicit && parenthesis !== "all" && implicit === "hide") {
      for (var i2 = 1; i2 < result.length; ++i2) {
        if (startsWithConstant(args[i2], parenthesis) && !result[i2 - 1] && (parenthesis !== "keep" || !isParenthesisNode(args[i2 - 1]))) {
          result[i2] = true;
        }
      }
    }
    return result;
  }
  class OperatorNode2 extends Node2 {
    /**
     * @constructor OperatorNode
     * @extends {Node}
     * An operator with two arguments, like 2+3
     *
     * @param {string} op           Operator name, for example '+'
     * @param {string} fn           Function name, for example 'add'
     * @param {Node[]} args         Operator arguments
     * @param {boolean} [implicit]  Is this an implicit multiplication?
     * @param {boolean} [isPercentage] Is this an percentage Operation?
     */
    constructor(op, fn, args, implicit, isPercentage) {
      super();
      if (typeof op !== "string") {
        throw new TypeError('string expected for parameter "op"');
      }
      if (typeof fn !== "string") {
        throw new TypeError('string expected for parameter "fn"');
      }
      if (!Array.isArray(args) || !args.every(isNode)) {
        throw new TypeError('Array containing Nodes expected for parameter "args"');
      }
      this.implicit = implicit === true;
      this.isPercentage = isPercentage === true;
      this.op = op;
      this.fn = fn;
      this.args = args || [];
    }
    get type() {
      return name$M;
    }
    get isOperatorNode() {
      return true;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(math2, argNames) {
      if (typeof this.fn !== "string" || !isSafeMethod(math2, this.fn)) {
        if (!math2[this.fn]) {
          throw new Error("Function " + this.fn + ' missing in provided namespace "math"');
        } else {
          throw new Error('No access to function "' + this.fn + '"');
        }
      }
      var fn = getSafeProperty(math2, this.fn);
      var evalArgs = map(this.args, function(arg2) {
        return arg2._compile(math2, argNames);
      });
      if (typeof fn === "function" && fn.rawArgs === true) {
        var rawArgs = this.args;
        return function evalOperatorNode(scope, args, context) {
          return fn(rawArgs, math2, createSubScope(scope, args));
        };
      } else if (evalArgs.length === 1) {
        var evalArg0 = evalArgs[0];
        return function evalOperatorNode(scope, args, context) {
          return fn(evalArg0(scope, args, context));
        };
      } else if (evalArgs.length === 2) {
        var _evalArg = evalArgs[0];
        var evalArg1 = evalArgs[1];
        return function evalOperatorNode(scope, args, context) {
          return fn(_evalArg(scope, args, context), evalArg1(scope, args, context));
        };
      } else {
        return function evalOperatorNode(scope, args, context) {
          return fn.apply(null, map(evalArgs, function(evalArg) {
            return evalArg(scope, args, context);
          }));
        };
      }
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(callback) {
      for (var i2 = 0; i2 < this.args.length; i2++) {
        callback(this.args[i2], "args[" + i2 + "]", this);
      }
    }
    /**
     * Create a new OperatorNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {OperatorNode} Returns a transformed copy of the node
     */
    map(callback) {
      var args = [];
      for (var i2 = 0; i2 < this.args.length; i2++) {
        args[i2] = this._ifNode(callback(this.args[i2], "args[" + i2 + "]", this));
      }
      return new OperatorNode2(this.op, this.fn, args, this.implicit, this.isPercentage);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {OperatorNode}
     */
    clone() {
      return new OperatorNode2(this.op, this.fn, this.args.slice(0), this.implicit, this.isPercentage);
    }
    /**
     * Check whether this is an unary OperatorNode:
     * has exactly one argument, like `-a`.
     * @return {boolean}
     *     Returns true when an unary operator node, false otherwise.
     */
    isUnary() {
      return this.args.length === 1;
    }
    /**
     * Check whether this is a binary OperatorNode:
     * has exactly two arguments, like `a + b`.
     * @return {boolean}
     *     Returns true when a binary operator node, false otherwise.
     */
    isBinary() {
      return this.args.length === 2;
    }
    /**
     * Get string representation.
     * @param {Object} options
     * @return {string} str
     */
    _toString(options) {
      var parenthesis = options && options.parenthesis ? options.parenthesis : "keep";
      var implicit = options && options.implicit ? options.implicit : "hide";
      var args = this.args;
      var parens = calculateNecessaryParentheses(this, parenthesis, implicit, args, false);
      if (args.length === 1) {
        var assoc = getAssociativity(this, parenthesis);
        var operand = args[0].toString(options);
        if (parens[0]) {
          operand = "(" + operand + ")";
        }
        var opIsNamed = /[a-zA-Z]+/.test(this.op);
        if (assoc === "right") {
          return this.op + (opIsNamed ? " " : "") + operand;
        } else if (assoc === "left") {
          return operand + (opIsNamed ? " " : "") + this.op;
        }
        return operand + this.op;
      } else if (args.length === 2) {
        var lhs = args[0].toString(options);
        var rhs = args[1].toString(options);
        if (parens[0]) {
          lhs = "(" + lhs + ")";
        }
        if (parens[1]) {
          rhs = "(" + rhs + ")";
        }
        if (this.implicit && this.getIdentifier() === "OperatorNode:multiply" && implicit === "hide") {
          return lhs + " " + rhs;
        }
        return lhs + " " + this.op + " " + rhs;
      } else if (args.length > 2 && (this.getIdentifier() === "OperatorNode:add" || this.getIdentifier() === "OperatorNode:multiply")) {
        var stringifiedArgs = args.map(function(arg2, index2) {
          arg2 = arg2.toString(options);
          if (parens[index2]) {
            arg2 = "(" + arg2 + ")";
          }
          return arg2;
        });
        if (this.implicit && this.getIdentifier() === "OperatorNode:multiply" && implicit === "hide") {
          return stringifiedArgs.join(" ");
        }
        return stringifiedArgs.join(" " + this.op + " ");
      } else {
        return this.fn + "(" + this.args.join(", ") + ")";
      }
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: name$M,
        op: this.op,
        fn: this.fn,
        args: this.args,
        implicit: this.implicit,
        isPercentage: this.isPercentage
      };
    }
    /**
     * Instantiate an OperatorNode from its JSON representation
     * @param {Object} json
     *     An object structured like
     *     ```
     *     {"mathjs": "OperatorNode",
     *      "op": "+", "fn": "add", "args": [...],
     *      "implicit": false,
     *      "isPercentage":false}
     *     ```
     *     where mathjs is optional
     * @returns {OperatorNode}
     */
    static fromJSON(json) {
      return new OperatorNode2(json.op, json.fn, json.args, json.implicit, json.isPercentage);
    }
    /**
     * Get HTML representation.
     * @param {Object} options
     * @return {string} str
     */
    _toHTML(options) {
      var parenthesis = options && options.parenthesis ? options.parenthesis : "keep";
      var implicit = options && options.implicit ? options.implicit : "hide";
      var args = this.args;
      var parens = calculateNecessaryParentheses(this, parenthesis, implicit, args, false);
      if (args.length === 1) {
        var assoc = getAssociativity(this, parenthesis);
        var operand = args[0].toHTML(options);
        if (parens[0]) {
          operand = '<span class="math-parenthesis math-round-parenthesis">(</span>' + operand + '<span class="math-parenthesis math-round-parenthesis">)</span>';
        }
        if (assoc === "right") {
          return '<span class="math-operator math-unary-operator math-lefthand-unary-operator">' + escape(this.op) + "</span>" + operand;
        } else {
          return operand + '<span class="math-operator math-unary-operator math-righthand-unary-operator">' + escape(this.op) + "</span>";
        }
      } else if (args.length === 2) {
        var lhs = args[0].toHTML(options);
        var rhs = args[1].toHTML(options);
        if (parens[0]) {
          lhs = '<span class="math-parenthesis math-round-parenthesis">(</span>' + lhs + '<span class="math-parenthesis math-round-parenthesis">)</span>';
        }
        if (parens[1]) {
          rhs = '<span class="math-parenthesis math-round-parenthesis">(</span>' + rhs + '<span class="math-parenthesis math-round-parenthesis">)</span>';
        }
        if (this.implicit && this.getIdentifier() === "OperatorNode:multiply" && implicit === "hide") {
          return lhs + '<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>' + rhs;
        }
        return lhs + '<span class="math-operator math-binary-operator math-explicit-binary-operator">' + escape(this.op) + "</span>" + rhs;
      } else {
        var stringifiedArgs = args.map(function(arg2, index2) {
          arg2 = arg2.toHTML(options);
          if (parens[index2]) {
            arg2 = '<span class="math-parenthesis math-round-parenthesis">(</span>' + arg2 + '<span class="math-parenthesis math-round-parenthesis">)</span>';
          }
          return arg2;
        });
        if (args.length > 2 && (this.getIdentifier() === "OperatorNode:add" || this.getIdentifier() === "OperatorNode:multiply")) {
          if (this.implicit && this.getIdentifier() === "OperatorNode:multiply" && implicit === "hide") {
            return stringifiedArgs.join('<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>');
          }
          return stringifiedArgs.join('<span class="math-operator math-binary-operator math-explicit-binary-operator">' + escape(this.op) + "</span>");
        } else {
          return '<span class="math-function">' + escape(this.fn) + '</span><span class="math-paranthesis math-round-parenthesis">(</span>' + stringifiedArgs.join('<span class="math-separator">,</span>') + '<span class="math-paranthesis math-round-parenthesis">)</span>';
        }
      }
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(options) {
      var parenthesis = options && options.parenthesis ? options.parenthesis : "keep";
      var implicit = options && options.implicit ? options.implicit : "hide";
      var args = this.args;
      var parens = calculateNecessaryParentheses(this, parenthesis, implicit, args, true);
      var op = latexOperators[this.fn];
      op = typeof op === "undefined" ? this.op : op;
      if (args.length === 1) {
        var assoc = getAssociativity(this, parenthesis);
        var operand = args[0].toTex(options);
        if (parens[0]) {
          operand = "\\left(".concat(operand, "\\right)");
        }
        if (assoc === "right") {
          return op + operand;
        } else if (assoc === "left") {
          return operand + op;
        }
        return operand + op;
      } else if (args.length === 2) {
        var lhs = args[0];
        var lhsTex = lhs.toTex(options);
        if (parens[0]) {
          lhsTex = "\\left(".concat(lhsTex, "\\right)");
        }
        var rhs = args[1];
        var rhsTex = rhs.toTex(options);
        if (parens[1]) {
          rhsTex = "\\left(".concat(rhsTex, "\\right)");
        }
        var lhsIdentifier;
        if (parenthesis === "keep") {
          lhsIdentifier = lhs.getIdentifier();
        } else {
          lhsIdentifier = lhs.getContent().getIdentifier();
        }
        switch (this.getIdentifier()) {
          case "OperatorNode:divide":
            return op + "{" + lhsTex + "}{" + rhsTex + "}";
          case "OperatorNode:pow":
            lhsTex = "{" + lhsTex + "}";
            rhsTex = "{" + rhsTex + "}";
            switch (lhsIdentifier) {
              case "ConditionalNode":
              case "OperatorNode:divide":
                lhsTex = "\\left(".concat(lhsTex, "\\right)");
            }
            break;
          case "OperatorNode:multiply":
            if (this.implicit && implicit === "hide") {
              return lhsTex + "~" + rhsTex;
            }
        }
        return lhsTex + op + rhsTex;
      } else if (args.length > 2 && (this.getIdentifier() === "OperatorNode:add" || this.getIdentifier() === "OperatorNode:multiply")) {
        var texifiedArgs = args.map(function(arg2, index2) {
          arg2 = arg2.toTex(options);
          if (parens[index2]) {
            arg2 = "\\left(".concat(arg2, "\\right)");
          }
          return arg2;
        });
        if (this.getIdentifier() === "OperatorNode:multiply" && this.implicit && implicit === "hide") {
          return texifiedArgs.join("~");
        }
        return texifiedArgs.join(op);
      } else {
        return "\\mathrm{" + this.fn + "}\\left(" + args.map(function(arg2) {
          return arg2.toTex(options);
        }).join(",") + "\\right)";
      }
    }
    /**
     * Get identifier.
     * @return {string}
     */
    getIdentifier() {
      return this.type + ":" + this.fn;
    }
  }
  _defineProperty(OperatorNode2, "name", name$M);
  return OperatorNode2;
}, {
  isClass: true,
  isNode: true
});
var name$L = "ParenthesisNode";
var dependencies$L = ["Node"];
var createParenthesisNode = /* @__PURE__ */ factory(name$L, dependencies$L, (_ref) => {
  var {
    Node: Node2
  } = _ref;
  class ParenthesisNode2 extends Node2 {
    /**
     * @constructor ParenthesisNode
     * @extends {Node}
     * A parenthesis node describes manual parenthesis from the user input
     * @param {Node} content
     * @extends {Node}
     */
    constructor(content) {
      super();
      if (!isNode(content)) {
        throw new TypeError('Node expected for parameter "content"');
      }
      this.content = content;
    }
    get type() {
      return name$L;
    }
    get isParenthesisNode() {
      return true;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(math2, argNames) {
      return this.content._compile(math2, argNames);
    }
    /**
     * Get the content of the current Node.
     * @return {Node} content
     * @override
     **/
    getContent() {
      return this.content.getContent();
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(callback) {
      callback(this.content, "content", this);
    }
    /**
     * Create a new ParenthesisNode whose child is the result of calling
     * the provided callback function on the child of this node.
     * @param {function(child: Node, path: string, parent: Node) : Node} callback
     * @returns {ParenthesisNode} Returns a clone of the node
     */
    map(callback) {
      var content = callback(this.content, "content", this);
      return new ParenthesisNode2(content);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {ParenthesisNode}
     */
    clone() {
      return new ParenthesisNode2(this.content);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toString(options) {
      if (!options || options && !options.parenthesis || options && options.parenthesis === "keep") {
        return "(" + this.content.toString(options) + ")";
      }
      return this.content.toString(options);
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: name$L,
        content: this.content
      };
    }
    /**
     * Instantiate an ParenthesisNode from its JSON representation
     * @param {Object} json  An object structured like
     *                       `{"mathjs": "ParenthesisNode", "content": ...}`,
     *                       where mathjs is optional
     * @returns {ParenthesisNode}
     */
    static fromJSON(json) {
      return new ParenthesisNode2(json.content);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toHTML(options) {
      if (!options || options && !options.parenthesis || options && options.parenthesis === "keep") {
        return '<span class="math-parenthesis math-round-parenthesis">(</span>' + this.content.toHTML(options) + '<span class="math-parenthesis math-round-parenthesis">)</span>';
      }
      return this.content.toHTML(options);
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toTex(options) {
      if (!options || options && !options.parenthesis || options && options.parenthesis === "keep") {
        return "\\left(".concat(this.content.toTex(options), "\\right)");
      }
      return this.content.toTex(options);
    }
  }
  _defineProperty(ParenthesisNode2, "name", name$L);
  return ParenthesisNode2;
}, {
  isClass: true,
  isNode: true
});
var name$K = "RangeNode";
var dependencies$K = ["Node"];
var createRangeNode = /* @__PURE__ */ factory(name$K, dependencies$K, (_ref) => {
  var {
    Node: Node2
  } = _ref;
  function calculateNecessaryParentheses(node, parenthesis, implicit) {
    var precedence = getPrecedence(node, parenthesis, implicit);
    var parens = {};
    var startPrecedence = getPrecedence(node.start, parenthesis, implicit);
    parens.start = startPrecedence !== null && startPrecedence <= precedence || parenthesis === "all";
    if (node.step) {
      var stepPrecedence = getPrecedence(node.step, parenthesis, implicit);
      parens.step = stepPrecedence !== null && stepPrecedence <= precedence || parenthesis === "all";
    }
    var endPrecedence = getPrecedence(node.end, parenthesis, implicit);
    parens.end = endPrecedence !== null && endPrecedence <= precedence || parenthesis === "all";
    return parens;
  }
  class RangeNode2 extends Node2 {
    /**
     * @constructor RangeNode
     * @extends {Node}
     * create a range
     * @param {Node} start  included lower-bound
     * @param {Node} end    included upper-bound
     * @param {Node} [step] optional step
     */
    constructor(start, end, step) {
      super();
      if (!isNode(start))
        throw new TypeError("Node expected");
      if (!isNode(end))
        throw new TypeError("Node expected");
      if (step && !isNode(step))
        throw new TypeError("Node expected");
      if (arguments.length > 3)
        throw new Error("Too many arguments");
      this.start = start;
      this.end = end;
      this.step = step || null;
    }
    get type() {
      return name$K;
    }
    get isRangeNode() {
      return true;
    }
    /**
     * Check whether the RangeNode needs the `end` symbol to be defined.
     * This end is the size of the Matrix in current dimension.
     * @return {boolean}
     */
    needsEnd() {
      var endSymbols = this.filter(function(node) {
        return isSymbolNode(node) && node.name === "end";
      });
      return endSymbols.length > 0;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(math2, argNames) {
      var range2 = math2.range;
      var evalStart = this.start._compile(math2, argNames);
      var evalEnd = this.end._compile(math2, argNames);
      if (this.step) {
        var evalStep = this.step._compile(math2, argNames);
        return function evalRangeNode(scope, args, context) {
          return range2(evalStart(scope, args, context), evalEnd(scope, args, context), evalStep(scope, args, context));
        };
      } else {
        return function evalRangeNode(scope, args, context) {
          return range2(evalStart(scope, args, context), evalEnd(scope, args, context));
        };
      }
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(callback) {
      callback(this.start, "start", this);
      callback(this.end, "end", this);
      if (this.step) {
        callback(this.step, "step", this);
      }
    }
    /**
     * Create a new RangeNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {RangeNode} Returns a transformed copy of the node
     */
    map(callback) {
      return new RangeNode2(this._ifNode(callback(this.start, "start", this)), this._ifNode(callback(this.end, "end", this)), this.step && this._ifNode(callback(this.step, "step", this)));
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {RangeNode}
     */
    clone() {
      return new RangeNode2(this.start, this.end, this.step && this.step);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     */
    _toString(options) {
      var parenthesis = options && options.parenthesis ? options.parenthesis : "keep";
      var parens = calculateNecessaryParentheses(this, parenthesis, options && options.implicit);
      var str;
      var start = this.start.toString(options);
      if (parens.start) {
        start = "(" + start + ")";
      }
      str = start;
      if (this.step) {
        var step = this.step.toString(options);
        if (parens.step) {
          step = "(" + step + ")";
        }
        str += ":" + step;
      }
      var end = this.end.toString(options);
      if (parens.end) {
        end = "(" + end + ")";
      }
      str += ":" + end;
      return str;
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: name$K,
        start: this.start,
        end: this.end,
        step: this.step
      };
    }
    /**
     * Instantiate an RangeNode from its JSON representation
     * @param {Object} json
     *     An object structured like
     *     `{"mathjs": "RangeNode", "start": ..., "end": ..., "step": ...}`,
     *     where mathjs is optional
     * @returns {RangeNode}
     */
    static fromJSON(json) {
      return new RangeNode2(json.start, json.end, json.step);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     */
    _toHTML(options) {
      var parenthesis = options && options.parenthesis ? options.parenthesis : "keep";
      var parens = calculateNecessaryParentheses(this, parenthesis, options && options.implicit);
      var str;
      var start = this.start.toHTML(options);
      if (parens.start) {
        start = '<span class="math-parenthesis math-round-parenthesis">(</span>' + start + '<span class="math-parenthesis math-round-parenthesis">)</span>';
      }
      str = start;
      if (this.step) {
        var step = this.step.toHTML(options);
        if (parens.step) {
          step = '<span class="math-parenthesis math-round-parenthesis">(</span>' + step + '<span class="math-parenthesis math-round-parenthesis">)</span>';
        }
        str += '<span class="math-operator math-range-operator">:</span>' + step;
      }
      var end = this.end.toHTML(options);
      if (parens.end) {
        end = '<span class="math-parenthesis math-round-parenthesis">(</span>' + end + '<span class="math-parenthesis math-round-parenthesis">)</span>';
      }
      str += '<span class="math-operator math-range-operator">:</span>' + end;
      return str;
    }
    /**
     * Get LaTeX representation
     * @params {Object} options
     * @return {string} str
     */
    _toTex(options) {
      var parenthesis = options && options.parenthesis ? options.parenthesis : "keep";
      var parens = calculateNecessaryParentheses(this, parenthesis, options && options.implicit);
      var str = this.start.toTex(options);
      if (parens.start) {
        str = "\\left(".concat(str, "\\right)");
      }
      if (this.step) {
        var step = this.step.toTex(options);
        if (parens.step) {
          step = "\\left(".concat(step, "\\right)");
        }
        str += ":" + step;
      }
      var end = this.end.toTex(options);
      if (parens.end) {
        end = "\\left(".concat(end, "\\right)");
      }
      str += ":" + end;
      return str;
    }
  }
  _defineProperty(RangeNode2, "name", name$K);
  return RangeNode2;
}, {
  isClass: true,
  isNode: true
});
var name$J = "RelationalNode";
var dependencies$J = ["Node"];
var createRelationalNode = /* @__PURE__ */ factory(name$J, dependencies$J, (_ref) => {
  var {
    Node: Node2
  } = _ref;
  var operatorMap = {
    equal: "==",
    unequal: "!=",
    smaller: "<",
    larger: ">",
    smallerEq: "<=",
    largerEq: ">="
  };
  class RelationalNode2 extends Node2 {
    /**
     * A node representing a chained conditional expression, such as 'x > y > z'
     *
     * @param {String[]} conditionals
     *     An array of conditional operators used to compare the parameters
     * @param {Node[]} params
     *     The parameters that will be compared
     *
     * @constructor RelationalNode
     * @extends {Node}
     */
    constructor(conditionals, params) {
      super();
      if (!Array.isArray(conditionals)) {
        throw new TypeError("Parameter conditionals must be an array");
      }
      if (!Array.isArray(params)) {
        throw new TypeError("Parameter params must be an array");
      }
      if (conditionals.length !== params.length - 1) {
        throw new TypeError("Parameter params must contain exactly one more element than parameter conditionals");
      }
      this.conditionals = conditionals;
      this.params = params;
    }
    get type() {
      return name$J;
    }
    get isRelationalNode() {
      return true;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(math2, argNames) {
      var self = this;
      var compiled = this.params.map((p) => p._compile(math2, argNames));
      return function evalRelationalNode(scope, args, context) {
        var evalLhs;
        var evalRhs = compiled[0](scope, args, context);
        for (var i2 = 0; i2 < self.conditionals.length; i2++) {
          evalLhs = evalRhs;
          evalRhs = compiled[i2 + 1](scope, args, context);
          var condFn = getSafeProperty(math2, self.conditionals[i2]);
          if (!condFn(evalLhs, evalRhs)) {
            return false;
          }
        }
        return true;
      };
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(callback) {
      this.params.forEach((n, i2) => callback(n, "params[" + i2 + "]", this), this);
    }
    /**
     * Create a new RelationalNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {RelationalNode} Returns a transformed copy of the node
     */
    map(callback) {
      return new RelationalNode2(this.conditionals.slice(), this.params.map((n, i2) => this._ifNode(callback(n, "params[" + i2 + "]", this)), this));
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {RelationalNode}
     */
    clone() {
      return new RelationalNode2(this.conditionals, this.params);
    }
    /**
     * Get string representation.
     * @param {Object} options
     * @return {string} str
     */
    _toString(options) {
      var parenthesis = options && options.parenthesis ? options.parenthesis : "keep";
      var precedence = getPrecedence(this, parenthesis, options && options.implicit);
      var paramStrings = this.params.map(function(p, index2) {
        var paramPrecedence = getPrecedence(p, parenthesis, options && options.implicit);
        return parenthesis === "all" || paramPrecedence !== null && paramPrecedence <= precedence ? "(" + p.toString(options) + ")" : p.toString(options);
      });
      var ret = paramStrings[0];
      for (var i2 = 0; i2 < this.conditionals.length; i2++) {
        ret += " " + operatorMap[this.conditionals[i2]];
        ret += " " + paramStrings[i2 + 1];
      }
      return ret;
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: name$J,
        conditionals: this.conditionals,
        params: this.params
      };
    }
    /**
     * Instantiate a RelationalNode from its JSON representation
     * @param {Object} json
     *     An object structured like
     *     `{"mathjs": "RelationalNode", "conditionals": ..., "params": ...}`,
     *     where mathjs is optional
     * @returns {RelationalNode}
     */
    static fromJSON(json) {
      return new RelationalNode2(json.conditionals, json.params);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     */
    _toHTML(options) {
      var parenthesis = options && options.parenthesis ? options.parenthesis : "keep";
      var precedence = getPrecedence(this, parenthesis, options && options.implicit);
      var paramStrings = this.params.map(function(p, index2) {
        var paramPrecedence = getPrecedence(p, parenthesis, options && options.implicit);
        return parenthesis === "all" || paramPrecedence !== null && paramPrecedence <= precedence ? '<span class="math-parenthesis math-round-parenthesis">(</span>' + p.toHTML(options) + '<span class="math-parenthesis math-round-parenthesis">)</span>' : p.toHTML(options);
      });
      var ret = paramStrings[0];
      for (var i2 = 0; i2 < this.conditionals.length; i2++) {
        ret += '<span class="math-operator math-binary-operator math-explicit-binary-operator">' + escape(operatorMap[this.conditionals[i2]]) + "</span>" + paramStrings[i2 + 1];
      }
      return ret;
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(options) {
      var parenthesis = options && options.parenthesis ? options.parenthesis : "keep";
      var precedence = getPrecedence(this, parenthesis, options && options.implicit);
      var paramStrings = this.params.map(function(p, index2) {
        var paramPrecedence = getPrecedence(p, parenthesis, options && options.implicit);
        return parenthesis === "all" || paramPrecedence !== null && paramPrecedence <= precedence ? "\\left(" + p.toTex(options) + "\right)" : p.toTex(options);
      });
      var ret = paramStrings[0];
      for (var i2 = 0; i2 < this.conditionals.length; i2++) {
        ret += latexOperators[this.conditionals[i2]] + paramStrings[i2 + 1];
      }
      return ret;
    }
  }
  _defineProperty(RelationalNode2, "name", name$J);
  return RelationalNode2;
}, {
  isClass: true,
  isNode: true
});
var name$I = "SymbolNode";
var dependencies$I = ["math", "?Unit", "Node"];
var createSymbolNode = /* @__PURE__ */ factory(name$I, dependencies$I, (_ref) => {
  var {
    math: math2,
    Unit: Unit2,
    Node: Node2
  } = _ref;
  function isValuelessUnit(name2) {
    return Unit2 ? Unit2.isValuelessUnit(name2) : false;
  }
  class SymbolNode2 extends Node2 {
    /**
     * @constructor SymbolNode
     * @extends {Node}
     * A symbol node can hold and resolve a symbol
     * @param {string} name
     * @extends {Node}
     */
    constructor(name2) {
      super();
      if (typeof name2 !== "string") {
        throw new TypeError('String expected for parameter "name"');
      }
      this.name = name2;
    }
    get type() {
      return "SymbolNode";
    }
    get isSymbolNode() {
      return true;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(math3, argNames) {
      var name2 = this.name;
      if (argNames[name2] === true) {
        return function(scope, args, context) {
          return getSafeProperty(args, name2);
        };
      } else if (name2 in math3) {
        return function(scope, args, context) {
          return scope.has(name2) ? scope.get(name2) : getSafeProperty(math3, name2);
        };
      } else {
        var isUnit2 = isValuelessUnit(name2);
        return function(scope, args, context) {
          return scope.has(name2) ? scope.get(name2) : isUnit2 ? new Unit2(null, name2) : SymbolNode2.onUndefinedSymbol(name2);
        };
      }
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(callback) {
    }
    /**
     * Create a new SymbolNode with children produced by the given callback.
     * Trivial since a SymbolNode has no children
     * @param {function(child: Node, path: string, parent: Node) : Node} callback
     * @returns {SymbolNode} Returns a clone of the node
     */
    map(callback) {
      return this.clone();
    }
    /**
     * Throws an error 'Undefined symbol {name}'
     * @param {string} name
     */
    static onUndefinedSymbol(name2) {
      throw new Error("Undefined symbol " + name2);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {SymbolNode}
     */
    clone() {
      return new SymbolNode2(this.name);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toString(options) {
      return this.name;
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toHTML(options) {
      var name2 = escape(this.name);
      if (name2 === "true" || name2 === "false") {
        return '<span class="math-symbol math-boolean">' + name2 + "</span>";
      } else if (name2 === "i") {
        return '<span class="math-symbol math-imaginary-symbol">' + name2 + "</span>";
      } else if (name2 === "Infinity") {
        return '<span class="math-symbol math-infinity-symbol">' + name2 + "</span>";
      } else if (name2 === "NaN") {
        return '<span class="math-symbol math-nan-symbol">' + name2 + "</span>";
      } else if (name2 === "null") {
        return '<span class="math-symbol math-null-symbol">' + name2 + "</span>";
      } else if (name2 === "undefined") {
        return '<span class="math-symbol math-undefined-symbol">' + name2 + "</span>";
      }
      return '<span class="math-symbol">' + name2 + "</span>";
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: "SymbolNode",
        name: this.name
      };
    }
    /**
     * Instantiate a SymbolNode from its JSON representation
     * @param {Object} json  An object structured like
     *                       `{"mathjs": "SymbolNode", name: "x"}`,
     *                       where mathjs is optional
     * @returns {SymbolNode}
     */
    static fromJSON(json) {
      return new SymbolNode2(json.name);
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toTex(options) {
      var isUnit2 = false;
      if (typeof math2[this.name] === "undefined" && isValuelessUnit(this.name)) {
        isUnit2 = true;
      }
      var symbol = toSymbol(this.name, isUnit2);
      if (symbol[0] === "\\") {
        return symbol;
      }
      return " " + symbol;
    }
  }
  return SymbolNode2;
}, {
  isClass: true,
  isNode: true
});
var name$H = "FunctionNode";
var dependencies$H = ["math", "Node", "SymbolNode"];
var createFunctionNode = /* @__PURE__ */ factory(name$H, dependencies$H, (_ref) => {
  var _FunctionNode;
  var {
    math: math2,
    Node: Node2,
    SymbolNode: SymbolNode2
  } = _ref;
  var strin = (entity) => format(entity, {
    truncate: 78
  });
  function expandTemplate(template, node, options) {
    var latex = "";
    var regex = /\$(?:\{([a-z_][a-z_0-9]*)(?:\[([0-9]+)\])?\}|\$)/gi;
    var inputPos = 0;
    var match;
    while ((match = regex.exec(template)) !== null) {
      latex += template.substring(inputPos, match.index);
      inputPos = match.index;
      if (match[0] === "$$") {
        latex += "$";
        inputPos++;
      } else {
        inputPos += match[0].length;
        var property = node[match[1]];
        if (!property) {
          throw new ReferenceError("Template: Property " + match[1] + " does not exist.");
        }
        if (match[2] === void 0) {
          switch (typeof property) {
            case "string":
              latex += property;
              break;
            case "object":
              if (isNode(property)) {
                latex += property.toTex(options);
              } else if (Array.isArray(property)) {
                latex += property.map(function(arg2, index2) {
                  if (isNode(arg2)) {
                    return arg2.toTex(options);
                  }
                  throw new TypeError("Template: " + match[1] + "[" + index2 + "] is not a Node.");
                }).join(",");
              } else {
                throw new TypeError("Template: " + match[1] + " has to be a Node, String or array of Nodes");
              }
              break;
            default:
              throw new TypeError("Template: " + match[1] + " has to be a Node, String or array of Nodes");
          }
        } else {
          if (isNode(property[match[2]] && property[match[2]])) {
            latex += property[match[2]].toTex(options);
          } else {
            throw new TypeError("Template: " + match[1] + "[" + match[2] + "] is not a Node.");
          }
        }
      }
    }
    latex += template.slice(inputPos);
    return latex;
  }
  class FunctionNode2 extends Node2 {
    /**
     * @constructor FunctionNode
     * @extends {./Node}
     * invoke a list with arguments on a node
     * @param {./Node | string} fn
     *     Item resolving to a function on which to invoke
     *     the arguments, typically a SymboNode or AccessorNode
     * @param {./Node[]} args
     */
    constructor(fn, args) {
      super();
      if (typeof fn === "string") {
        fn = new SymbolNode2(fn);
      }
      if (!isNode(fn))
        throw new TypeError('Node expected as parameter "fn"');
      if (!Array.isArray(args) || !args.every(isNode)) {
        throw new TypeError('Array containing Nodes expected for parameter "args"');
      }
      this.fn = fn;
      this.args = args || [];
    }
    // readonly property name
    get name() {
      return this.fn.name || "";
    }
    get type() {
      return name$H;
    }
    get isFunctionNode() {
      return true;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(math3, argNames) {
      var evalArgs = this.args.map((arg2) => arg2._compile(math3, argNames));
      if (isSymbolNode(this.fn)) {
        var _name = this.fn.name;
        if (!argNames[_name]) {
          var fn = _name in math3 ? getSafeProperty(math3, _name) : void 0;
          var isRaw = typeof fn === "function" && fn.rawArgs === true;
          var resolveFn = (scope) => {
            var value;
            if (scope.has(_name)) {
              value = scope.get(_name);
            } else if (_name in math3) {
              value = getSafeProperty(math3, _name);
            } else {
              return FunctionNode2.onUndefinedFunction(_name);
            }
            if (typeof value === "function") {
              return value;
            }
            throw new TypeError("'".concat(_name, "' is not a function; its value is:\n  ").concat(strin(value)));
          };
          if (isRaw) {
            var rawArgs = this.args;
            return function evalFunctionNode(scope, args, context) {
              var fn2 = resolveFn(scope);
              return fn2(rawArgs, math3, createSubScope(scope, args));
            };
          } else {
            switch (evalArgs.length) {
              case 0:
                return function evalFunctionNode(scope, args, context) {
                  var fn2 = resolveFn(scope);
                  return fn2();
                };
              case 1:
                return function evalFunctionNode(scope, args, context) {
                  var fn2 = resolveFn(scope);
                  var evalArg0 = evalArgs[0];
                  return fn2(evalArg0(scope, args, context));
                };
              case 2:
                return function evalFunctionNode(scope, args, context) {
                  var fn2 = resolveFn(scope);
                  var evalArg0 = evalArgs[0];
                  var evalArg1 = evalArgs[1];
                  return fn2(evalArg0(scope, args, context), evalArg1(scope, args, context));
                };
              default:
                return function evalFunctionNode(scope, args, context) {
                  var fn2 = resolveFn(scope);
                  var values = evalArgs.map((evalArg) => evalArg(scope, args, context));
                  return fn2(...values);
                };
            }
          }
        } else {
          var _rawArgs = this.args;
          return function evalFunctionNode(scope, args, context) {
            var fn2 = getSafeProperty(args, _name);
            if (typeof fn2 !== "function") {
              throw new TypeError("Argument '".concat(_name, "' was not a function; received: ").concat(strin(fn2)));
            }
            if (fn2.rawArgs) {
              return fn2(_rawArgs, math3, createSubScope(scope, args));
            } else {
              var values = evalArgs.map((evalArg) => evalArg(scope, args, context));
              return fn2.apply(fn2, values);
            }
          };
        }
      } else if (isAccessorNode(this.fn) && isIndexNode(this.fn.index) && this.fn.index.isObjectProperty()) {
        var evalObject = this.fn.object._compile(math3, argNames);
        var prop = this.fn.index.getObjectProperty();
        var _rawArgs2 = this.args;
        return function evalFunctionNode(scope, args, context) {
          var object = evalObject(scope, args, context);
          var fn2 = getSafeMethod(object, prop);
          if (fn2 !== null && fn2 !== void 0 && fn2.rawArgs) {
            return fn2(_rawArgs2, math3, createSubScope(scope, args));
          } else {
            var values = evalArgs.map((evalArg) => evalArg(scope, args, context));
            return fn2.apply(object, values);
          }
        };
      } else {
        var fnExpr = this.fn.toString();
        var evalFn = this.fn._compile(math3, argNames);
        var _rawArgs3 = this.args;
        return function evalFunctionNode(scope, args, context) {
          var fn2 = evalFn(scope, args, context);
          if (typeof fn2 !== "function") {
            throw new TypeError("Expression '".concat(fnExpr, "' did not evaluate to a function; value is:") + "\n  ".concat(strin(fn2)));
          }
          if (fn2.rawArgs) {
            return fn2(_rawArgs3, math3, createSubScope(scope, args));
          } else {
            var values = evalArgs.map((evalArg) => evalArg(scope, args, context));
            return fn2.apply(fn2, values);
          }
        };
      }
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(callback) {
      callback(this.fn, "fn", this);
      for (var i2 = 0; i2 < this.args.length; i2++) {
        callback(this.args[i2], "args[" + i2 + "]", this);
      }
    }
    /**
     * Create a new FunctionNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {FunctionNode} Returns a transformed copy of the node
     */
    map(callback) {
      var fn = this._ifNode(callback(this.fn, "fn", this));
      var args = [];
      for (var i2 = 0; i2 < this.args.length; i2++) {
        args[i2] = this._ifNode(callback(this.args[i2], "args[" + i2 + "]", this));
      }
      return new FunctionNode2(fn, args);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {FunctionNode}
     */
    clone() {
      return new FunctionNode2(this.fn, this.args.slice(0));
    }
    /**
     * Throws an error 'Undefined function {name}'
     * @param {string} name
     */
    /**
     * Get string representation. (wrapper function)
     * This overrides parts of Node's toString function.
     * If callback is an object containing callbacks, it
     * calls the correct callback for the current node,
     * otherwise it falls back to calling Node's toString
     * function.
     *
     * @param {Object} options
     * @return {string} str
     * @override
     */
    toString(options) {
      var customString;
      var name2 = this.fn.toString(options);
      if (options && typeof options.handler === "object" && hasOwnProperty(options.handler, name2)) {
        customString = options.handler[name2](this, options);
      }
      if (typeof customString !== "undefined") {
        return customString;
      }
      return super.toString(options);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     */
    _toString(options) {
      var args = this.args.map(function(arg2) {
        return arg2.toString(options);
      });
      var fn = isFunctionAssignmentNode(this.fn) ? "(" + this.fn.toString(options) + ")" : this.fn.toString(options);
      return fn + "(" + args.join(", ") + ")";
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: name$H,
        fn: this.fn,
        args: this.args
      };
    }
    /**
     * Instantiate an AssignmentNode from its JSON representation
     * @param {Object} json  An object structured like
     *                       `{"mathjs": "FunctionNode", fn: ..., args: ...}`,
     *                       where mathjs is optional
     * @returns {FunctionNode}
     */
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     */
    _toHTML(options) {
      var args = this.args.map(function(arg2) {
        return arg2.toHTML(options);
      });
      return '<span class="math-function">' + escape(this.fn) + '</span><span class="math-paranthesis math-round-parenthesis">(</span>' + args.join('<span class="math-separator">,</span>') + '<span class="math-paranthesis math-round-parenthesis">)</span>';
    }
    /**
     * Get LaTeX representation. (wrapper function)
     * This overrides parts of Node's toTex function.
     * If callback is an object containing callbacks, it
     * calls the correct callback for the current node,
     * otherwise it falls back to calling Node's toTex
     * function.
     *
     * @param {Object} options
     * @return {string}
     */
    toTex(options) {
      var customTex;
      if (options && typeof options.handler === "object" && hasOwnProperty(options.handler, this.name)) {
        customTex = options.handler[this.name](this, options);
      }
      if (typeof customTex !== "undefined") {
        return customTex;
      }
      return super.toTex(options);
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(options) {
      var args = this.args.map(function(arg2) {
        return arg2.toTex(options);
      });
      var latexConverter;
      if (latexFunctions[this.name]) {
        latexConverter = latexFunctions[this.name];
      }
      if (math2[this.name] && (typeof math2[this.name].toTex === "function" || typeof math2[this.name].toTex === "object" || typeof math2[this.name].toTex === "string")) {
        latexConverter = math2[this.name].toTex;
      }
      var customToTex;
      switch (typeof latexConverter) {
        case "function":
          customToTex = latexConverter(this, options);
          break;
        case "string":
          customToTex = expandTemplate(latexConverter, this, options);
          break;
        case "object":
          switch (typeof latexConverter[args.length]) {
            case "function":
              customToTex = latexConverter[args.length](this, options);
              break;
            case "string":
              customToTex = expandTemplate(latexConverter[args.length], this, options);
              break;
          }
      }
      if (typeof customToTex !== "undefined") {
        return customToTex;
      }
      return expandTemplate(defaultTemplate, this, options);
    }
    /**
     * Get identifier.
     * @return {string}
     */
    getIdentifier() {
      return this.type + ":" + this.name;
    }
  }
  _FunctionNode = FunctionNode2;
  _defineProperty(FunctionNode2, "name", name$H);
  _defineProperty(FunctionNode2, "onUndefinedFunction", function(name2) {
    throw new Error("Undefined function " + name2);
  });
  _defineProperty(FunctionNode2, "fromJSON", function(json) {
    return new _FunctionNode(json.fn, json.args);
  });
  return FunctionNode2;
}, {
  isClass: true,
  isNode: true
});
var name$G = "parse";
var dependencies$G = ["typed", "numeric", "config", "AccessorNode", "ArrayNode", "AssignmentNode", "BlockNode", "ConditionalNode", "ConstantNode", "FunctionAssignmentNode", "FunctionNode", "IndexNode", "ObjectNode", "OperatorNode", "ParenthesisNode", "RangeNode", "RelationalNode", "SymbolNode"];
var createParse = /* @__PURE__ */ factory(name$G, dependencies$G, (_ref) => {
  var {
    typed: typed2,
    numeric: numeric3,
    config: config2,
    AccessorNode: AccessorNode2,
    ArrayNode: ArrayNode2,
    AssignmentNode: AssignmentNode2,
    BlockNode: BlockNode2,
    ConditionalNode: ConditionalNode2,
    ConstantNode: ConstantNode2,
    FunctionAssignmentNode: FunctionAssignmentNode2,
    FunctionNode: FunctionNode2,
    IndexNode: IndexNode2,
    ObjectNode: ObjectNode2,
    OperatorNode: OperatorNode2,
    ParenthesisNode: ParenthesisNode2,
    RangeNode: RangeNode2,
    RelationalNode: RelationalNode2,
    SymbolNode: SymbolNode2
  } = _ref;
  var parse2 = typed2(name$G, {
    string: function string2(expression) {
      return parseStart(expression, {});
    },
    "Array | Matrix": function ArrayMatrix(expressions) {
      return parseMultiple(expressions, {});
    },
    "string, Object": function stringObject(expression, options) {
      var extraNodes = options.nodes !== void 0 ? options.nodes : {};
      return parseStart(expression, extraNodes);
    },
    "Array | Matrix, Object": parseMultiple
  });
  function parseMultiple(expressions) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var extraNodes = options.nodes !== void 0 ? options.nodes : {};
    return deepMap(expressions, function(elem) {
      if (typeof elem !== "string")
        throw new TypeError("String expected");
      return parseStart(elem, extraNodes);
    });
  }
  var TOKENTYPE = {
    NULL: 0,
    DELIMITER: 1,
    NUMBER: 2,
    SYMBOL: 3,
    UNKNOWN: 4
  };
  var DELIMITERS = {
    ",": true,
    "(": true,
    ")": true,
    "[": true,
    "]": true,
    "{": true,
    "}": true,
    '"': true,
    "'": true,
    ";": true,
    "+": true,
    "-": true,
    "*": true,
    ".*": true,
    "/": true,
    "./": true,
    "%": true,
    "^": true,
    ".^": true,
    "~": true,
    "!": true,
    "&": true,
    "|": true,
    "^|": true,
    "=": true,
    ":": true,
    "?": true,
    "==": true,
    "!=": true,
    "<": true,
    ">": true,
    "<=": true,
    ">=": true,
    "<<": true,
    ">>": true,
    ">>>": true
  };
  var NAMED_DELIMITERS = {
    mod: true,
    to: true,
    in: true,
    and: true,
    xor: true,
    or: true,
    not: true
  };
  var CONSTANTS = {
    true: true,
    false: false,
    null: null,
    undefined: void 0
  };
  var NUMERIC_CONSTANTS = ["NaN", "Infinity"];
  var ESCAPE_CHARACTERS = {
    '"': '"',
    "'": "'",
    "\\": "\\",
    "/": "/",
    b: "\b",
    f: "\f",
    n: "\n",
    r: "\r",
    t: "	"
    // note that \u is handled separately in parseStringToken()
  };
  function initialState() {
    return {
      extraNodes: {},
      // current extra nodes, must be careful not to mutate
      expression: "",
      // current expression
      comment: "",
      // last parsed comment
      index: 0,
      // current index in expr
      token: "",
      // current token
      tokenType: TOKENTYPE.NULL,
      // type of the token
      nestingLevel: 0,
      // level of nesting inside parameters, used to ignore newline characters
      conditionalLevel: null
      // when a conditional is being parsed, the level of the conditional is stored here
    };
  }
  function currentString(state, length) {
    return state.expression.substr(state.index, length);
  }
  function currentCharacter(state) {
    return currentString(state, 1);
  }
  function next(state) {
    state.index++;
  }
  function prevCharacter(state) {
    return state.expression.charAt(state.index - 1);
  }
  function nextCharacter(state) {
    return state.expression.charAt(state.index + 1);
  }
  function getToken(state) {
    state.tokenType = TOKENTYPE.NULL;
    state.token = "";
    state.comment = "";
    while (true) {
      if (currentCharacter(state) === "#") {
        while (currentCharacter(state) !== "\n" && currentCharacter(state) !== "") {
          state.comment += currentCharacter(state);
          next(state);
        }
      }
      if (parse2.isWhitespace(currentCharacter(state), state.nestingLevel)) {
        next(state);
      } else {
        break;
      }
    }
    if (currentCharacter(state) === "") {
      state.tokenType = TOKENTYPE.DELIMITER;
      return;
    }
    if (currentCharacter(state) === "\n" && !state.nestingLevel) {
      state.tokenType = TOKENTYPE.DELIMITER;
      state.token = currentCharacter(state);
      next(state);
      return;
    }
    var c1 = currentCharacter(state);
    var c2 = currentString(state, 2);
    var c3 = currentString(state, 3);
    if (c3.length === 3 && DELIMITERS[c3]) {
      state.tokenType = TOKENTYPE.DELIMITER;
      state.token = c3;
      next(state);
      next(state);
      next(state);
      return;
    }
    if (c2.length === 2 && DELIMITERS[c2]) {
      state.tokenType = TOKENTYPE.DELIMITER;
      state.token = c2;
      next(state);
      next(state);
      return;
    }
    if (DELIMITERS[c1]) {
      state.tokenType = TOKENTYPE.DELIMITER;
      state.token = c1;
      next(state);
      return;
    }
    if (parse2.isDigitDot(c1)) {
      state.tokenType = TOKENTYPE.NUMBER;
      var _c = currentString(state, 2);
      if (_c === "0b" || _c === "0o" || _c === "0x") {
        state.token += currentCharacter(state);
        next(state);
        state.token += currentCharacter(state);
        next(state);
        while (parse2.isHexDigit(currentCharacter(state))) {
          state.token += currentCharacter(state);
          next(state);
        }
        if (currentCharacter(state) === ".") {
          state.token += ".";
          next(state);
          while (parse2.isHexDigit(currentCharacter(state))) {
            state.token += currentCharacter(state);
            next(state);
          }
        } else if (currentCharacter(state) === "i") {
          state.token += "i";
          next(state);
          while (parse2.isDigit(currentCharacter(state))) {
            state.token += currentCharacter(state);
            next(state);
          }
        }
        return;
      }
      if (currentCharacter(state) === ".") {
        state.token += currentCharacter(state);
        next(state);
        if (!parse2.isDigit(currentCharacter(state))) {
          state.tokenType = TOKENTYPE.DELIMITER;
          return;
        }
      } else {
        while (parse2.isDigit(currentCharacter(state))) {
          state.token += currentCharacter(state);
          next(state);
        }
        if (parse2.isDecimalMark(currentCharacter(state), nextCharacter(state))) {
          state.token += currentCharacter(state);
          next(state);
        }
      }
      while (parse2.isDigit(currentCharacter(state))) {
        state.token += currentCharacter(state);
        next(state);
      }
      if (currentCharacter(state) === "E" || currentCharacter(state) === "e") {
        if (parse2.isDigit(nextCharacter(state)) || nextCharacter(state) === "-" || nextCharacter(state) === "+") {
          state.token += currentCharacter(state);
          next(state);
          if (currentCharacter(state) === "+" || currentCharacter(state) === "-") {
            state.token += currentCharacter(state);
            next(state);
          }
          if (!parse2.isDigit(currentCharacter(state))) {
            throw createSyntaxError(state, 'Digit expected, got "' + currentCharacter(state) + '"');
          }
          while (parse2.isDigit(currentCharacter(state))) {
            state.token += currentCharacter(state);
            next(state);
          }
          if (parse2.isDecimalMark(currentCharacter(state), nextCharacter(state))) {
            throw createSyntaxError(state, 'Digit expected, got "' + currentCharacter(state) + '"');
          }
        } else if (nextCharacter(state) === ".") {
          next(state);
          throw createSyntaxError(state, 'Digit expected, got "' + currentCharacter(state) + '"');
        }
      }
      return;
    }
    if (parse2.isAlpha(currentCharacter(state), prevCharacter(state), nextCharacter(state))) {
      while (parse2.isAlpha(currentCharacter(state), prevCharacter(state), nextCharacter(state)) || parse2.isDigit(currentCharacter(state))) {
        state.token += currentCharacter(state);
        next(state);
      }
      if (hasOwnProperty(NAMED_DELIMITERS, state.token)) {
        state.tokenType = TOKENTYPE.DELIMITER;
      } else {
        state.tokenType = TOKENTYPE.SYMBOL;
      }
      return;
    }
    state.tokenType = TOKENTYPE.UNKNOWN;
    while (currentCharacter(state) !== "") {
      state.token += currentCharacter(state);
      next(state);
    }
    throw createSyntaxError(state, 'Syntax error in part "' + state.token + '"');
  }
  function getTokenSkipNewline(state) {
    do {
      getToken(state);
    } while (state.token === "\n");
  }
  function openParams(state) {
    state.nestingLevel++;
  }
  function closeParams(state) {
    state.nestingLevel--;
  }
  parse2.isAlpha = function isAlpha(c, cPrev, cNext) {
    return parse2.isValidLatinOrGreek(c) || parse2.isValidMathSymbol(c, cNext) || parse2.isValidMathSymbol(cPrev, c);
  };
  parse2.isValidLatinOrGreek = function isValidLatinOrGreek(c) {
    return /^[a-zA-Z_$\u00C0-\u02AF\u0370-\u03FF\u2100-\u214F]$/.test(c);
  };
  parse2.isValidMathSymbol = function isValidMathSymbol(high, low) {
    return /^[\uD835]$/.test(high) && /^[\uDC00-\uDFFF]$/.test(low) && /^[^\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]$/.test(low);
  };
  parse2.isWhitespace = function isWhitespace(c, nestingLevel) {
    return c === " " || c === "	" || c === "\n" && nestingLevel > 0;
  };
  parse2.isDecimalMark = function isDecimalMark(c, cNext) {
    return c === "." && cNext !== "/" && cNext !== "*" && cNext !== "^";
  };
  parse2.isDigitDot = function isDigitDot(c) {
    return c >= "0" && c <= "9" || c === ".";
  };
  parse2.isDigit = function isDigit(c) {
    return c >= "0" && c <= "9";
  };
  parse2.isHexDigit = function isHexDigit(c) {
    return c >= "0" && c <= "9" || c >= "a" && c <= "f" || c >= "A" && c <= "F";
  };
  function parseStart(expression, extraNodes) {
    var state = initialState();
    _extends$1(state, {
      expression,
      extraNodes
    });
    getToken(state);
    var node = parseBlock(state);
    if (state.token !== "") {
      if (state.tokenType === TOKENTYPE.DELIMITER) {
        throw createError(state, "Unexpected operator " + state.token);
      } else {
        throw createSyntaxError(state, 'Unexpected part "' + state.token + '"');
      }
    }
    return node;
  }
  function parseBlock(state) {
    var node;
    var blocks = [];
    var visible;
    if (state.token !== "" && state.token !== "\n" && state.token !== ";") {
      node = parseAssignment(state);
      if (state.comment) {
        node.comment = state.comment;
      }
    }
    while (state.token === "\n" || state.token === ";") {
      if (blocks.length === 0 && node) {
        visible = state.token !== ";";
        blocks.push({
          node,
          visible
        });
      }
      getToken(state);
      if (state.token !== "\n" && state.token !== ";" && state.token !== "") {
        node = parseAssignment(state);
        if (state.comment) {
          node.comment = state.comment;
        }
        visible = state.token !== ";";
        blocks.push({
          node,
          visible
        });
      }
    }
    if (blocks.length > 0) {
      return new BlockNode2(blocks);
    } else {
      if (!node) {
        node = new ConstantNode2(void 0);
        if (state.comment) {
          node.comment = state.comment;
        }
      }
      return node;
    }
  }
  function parseAssignment(state) {
    var name2, args, value, valid;
    var node = parseConditional(state);
    if (state.token === "=") {
      if (isSymbolNode(node)) {
        name2 = node.name;
        getTokenSkipNewline(state);
        value = parseAssignment(state);
        return new AssignmentNode2(new SymbolNode2(name2), value);
      } else if (isAccessorNode(node)) {
        getTokenSkipNewline(state);
        value = parseAssignment(state);
        return new AssignmentNode2(node.object, node.index, value);
      } else if (isFunctionNode(node) && isSymbolNode(node.fn)) {
        valid = true;
        args = [];
        name2 = node.name;
        node.args.forEach(function(arg2, index2) {
          if (isSymbolNode(arg2)) {
            args[index2] = arg2.name;
          } else {
            valid = false;
          }
        });
        if (valid) {
          getTokenSkipNewline(state);
          value = parseAssignment(state);
          return new FunctionAssignmentNode2(name2, args, value);
        }
      }
      throw createSyntaxError(state, "Invalid left hand side of assignment operator =");
    }
    return node;
  }
  function parseConditional(state) {
    var node = parseLogicalOr(state);
    while (state.token === "?") {
      var prev = state.conditionalLevel;
      state.conditionalLevel = state.nestingLevel;
      getTokenSkipNewline(state);
      var condition = node;
      var trueExpr = parseAssignment(state);
      if (state.token !== ":")
        throw createSyntaxError(state, "False part of conditional expression expected");
      state.conditionalLevel = null;
      getTokenSkipNewline(state);
      var falseExpr = parseAssignment(state);
      node = new ConditionalNode2(condition, trueExpr, falseExpr);
      state.conditionalLevel = prev;
    }
    return node;
  }
  function parseLogicalOr(state) {
    var node = parseLogicalXor(state);
    while (state.token === "or") {
      getTokenSkipNewline(state);
      node = new OperatorNode2("or", "or", [node, parseLogicalXor(state)]);
    }
    return node;
  }
  function parseLogicalXor(state) {
    var node = parseLogicalAnd(state);
    while (state.token === "xor") {
      getTokenSkipNewline(state);
      node = new OperatorNode2("xor", "xor", [node, parseLogicalAnd(state)]);
    }
    return node;
  }
  function parseLogicalAnd(state) {
    var node = parseBitwiseOr(state);
    while (state.token === "and") {
      getTokenSkipNewline(state);
      node = new OperatorNode2("and", "and", [node, parseBitwiseOr(state)]);
    }
    return node;
  }
  function parseBitwiseOr(state) {
    var node = parseBitwiseXor(state);
    while (state.token === "|") {
      getTokenSkipNewline(state);
      node = new OperatorNode2("|", "bitOr", [node, parseBitwiseXor(state)]);
    }
    return node;
  }
  function parseBitwiseXor(state) {
    var node = parseBitwiseAnd(state);
    while (state.token === "^|") {
      getTokenSkipNewline(state);
      node = new OperatorNode2("^|", "bitXor", [node, parseBitwiseAnd(state)]);
    }
    return node;
  }
  function parseBitwiseAnd(state) {
    var node = parseRelational(state);
    while (state.token === "&") {
      getTokenSkipNewline(state);
      node = new OperatorNode2("&", "bitAnd", [node, parseRelational(state)]);
    }
    return node;
  }
  function parseRelational(state) {
    var params = [parseShift(state)];
    var conditionals = [];
    var operators = {
      "==": "equal",
      "!=": "unequal",
      "<": "smaller",
      ">": "larger",
      "<=": "smallerEq",
      ">=": "largerEq"
    };
    while (hasOwnProperty(operators, state.token)) {
      var cond = {
        name: state.token,
        fn: operators[state.token]
      };
      conditionals.push(cond);
      getTokenSkipNewline(state);
      params.push(parseShift(state));
    }
    if (params.length === 1) {
      return params[0];
    } else if (params.length === 2) {
      return new OperatorNode2(conditionals[0].name, conditionals[0].fn, params);
    } else {
      return new RelationalNode2(conditionals.map((c) => c.fn), params);
    }
  }
  function parseShift(state) {
    var node, name2, fn, params;
    node = parseConversion(state);
    var operators = {
      "<<": "leftShift",
      ">>": "rightArithShift",
      ">>>": "rightLogShift"
    };
    while (hasOwnProperty(operators, state.token)) {
      name2 = state.token;
      fn = operators[name2];
      getTokenSkipNewline(state);
      params = [node, parseConversion(state)];
      node = new OperatorNode2(name2, fn, params);
    }
    return node;
  }
  function parseConversion(state) {
    var node, name2, fn, params;
    node = parseRange(state);
    var operators = {
      to: "to",
      in: "to"
      // alias of 'to'
    };
    while (hasOwnProperty(operators, state.token)) {
      name2 = state.token;
      fn = operators[name2];
      getTokenSkipNewline(state);
      if (name2 === "in" && state.token === "") {
        node = new OperatorNode2("*", "multiply", [node, new SymbolNode2("in")], true);
      } else {
        params = [node, parseRange(state)];
        node = new OperatorNode2(name2, fn, params);
      }
    }
    return node;
  }
  function parseRange(state) {
    var node;
    var params = [];
    if (state.token === ":") {
      node = new ConstantNode2(1);
    } else {
      node = parseAddSubtract(state);
    }
    if (state.token === ":" && state.conditionalLevel !== state.nestingLevel) {
      params.push(node);
      while (state.token === ":" && params.length < 3) {
        getTokenSkipNewline(state);
        if (state.token === ")" || state.token === "]" || state.token === "," || state.token === "") {
          params.push(new SymbolNode2("end"));
        } else {
          params.push(parseAddSubtract(state));
        }
      }
      if (params.length === 3) {
        node = new RangeNode2(params[0], params[2], params[1]);
      } else {
        node = new RangeNode2(params[0], params[1]);
      }
    }
    return node;
  }
  function parseAddSubtract(state) {
    var node, name2, fn, params;
    node = parseMultiplyDivide(state);
    var operators = {
      "+": "add",
      "-": "subtract"
    };
    while (hasOwnProperty(operators, state.token)) {
      name2 = state.token;
      fn = operators[name2];
      getTokenSkipNewline(state);
      var rightNode = parseMultiplyDivide(state);
      if (rightNode.isPercentage) {
        params = [node, new OperatorNode2("*", "multiply", [node, rightNode])];
      } else {
        params = [node, rightNode];
      }
      node = new OperatorNode2(name2, fn, params);
    }
    return node;
  }
  function parseMultiplyDivide(state) {
    var node, last, name2, fn;
    node = parseImplicitMultiplication(state);
    last = node;
    var operators = {
      "*": "multiply",
      ".*": "dotMultiply",
      "/": "divide",
      "./": "dotDivide"
    };
    while (true) {
      if (hasOwnProperty(operators, state.token)) {
        name2 = state.token;
        fn = operators[name2];
        getTokenSkipNewline(state);
        last = parseImplicitMultiplication(state);
        node = new OperatorNode2(name2, fn, [node, last]);
      } else {
        break;
      }
    }
    return node;
  }
  function parseImplicitMultiplication(state) {
    var node, last;
    node = parseRule2(state);
    last = node;
    while (true) {
      if (state.tokenType === TOKENTYPE.SYMBOL || state.token === "in" && isConstantNode(node) || state.tokenType === TOKENTYPE.NUMBER && !isConstantNode(last) && (!isOperatorNode(last) || last.op === "!") || state.token === "(") {
        last = parseRule2(state);
        node = new OperatorNode2(
          "*",
          "multiply",
          [node, last],
          true
          /* implicit */
        );
      } else {
        break;
      }
    }
    return node;
  }
  function parseRule2(state) {
    var node = parseModulusPercentage(state);
    var last = node;
    var tokenStates = [];
    while (true) {
      if (state.token === "/" && rule2Node(last)) {
        tokenStates.push(_extends$1({}, state));
        getTokenSkipNewline(state);
        if (state.tokenType === TOKENTYPE.NUMBER) {
          tokenStates.push(_extends$1({}, state));
          getTokenSkipNewline(state);
          if (state.tokenType === TOKENTYPE.SYMBOL || state.token === "(") {
            _extends$1(state, tokenStates.pop());
            tokenStates.pop();
            last = parseModulusPercentage(state);
            node = new OperatorNode2("/", "divide", [node, last]);
          } else {
            tokenStates.pop();
            _extends$1(state, tokenStates.pop());
            break;
          }
        } else {
          _extends$1(state, tokenStates.pop());
          break;
        }
      } else {
        break;
      }
    }
    return node;
  }
  function parseModulusPercentage(state) {
    var node, name2, fn, params;
    node = parseUnary(state);
    var operators = {
      "%": "mod",
      mod: "mod"
    };
    while (hasOwnProperty(operators, state.token)) {
      name2 = state.token;
      fn = operators[name2];
      getTokenSkipNewline(state);
      if (name2 === "%" && state.tokenType === TOKENTYPE.DELIMITER && state.token !== "(") {
        node = new OperatorNode2("/", "divide", [node, new ConstantNode2(100)], false, true);
      } else {
        params = [node, parseUnary(state)];
        node = new OperatorNode2(name2, fn, params);
      }
    }
    return node;
  }
  function parseUnary(state) {
    var name2, params, fn;
    var operators = {
      "-": "unaryMinus",
      "+": "unaryPlus",
      "~": "bitNot",
      not: "not"
    };
    if (hasOwnProperty(operators, state.token)) {
      fn = operators[state.token];
      name2 = state.token;
      getTokenSkipNewline(state);
      params = [parseUnary(state)];
      return new OperatorNode2(name2, fn, params);
    }
    return parsePow(state);
  }
  function parsePow(state) {
    var node, name2, fn, params;
    node = parseLeftHandOperators(state);
    if (state.token === "^" || state.token === ".^") {
      name2 = state.token;
      fn = name2 === "^" ? "pow" : "dotPow";
      getTokenSkipNewline(state);
      params = [node, parseUnary(state)];
      node = new OperatorNode2(name2, fn, params);
    }
    return node;
  }
  function parseLeftHandOperators(state) {
    var node, name2, fn, params;
    node = parseCustomNodes(state);
    var operators = {
      "!": "factorial",
      "'": "ctranspose"
    };
    while (hasOwnProperty(operators, state.token)) {
      name2 = state.token;
      fn = operators[name2];
      getToken(state);
      params = [node];
      node = new OperatorNode2(name2, fn, params);
      node = parseAccessors(state, node);
    }
    return node;
  }
  function parseCustomNodes(state) {
    var params = [];
    if (state.tokenType === TOKENTYPE.SYMBOL && hasOwnProperty(state.extraNodes, state.token)) {
      var CustomNode = state.extraNodes[state.token];
      getToken(state);
      if (state.token === "(") {
        params = [];
        openParams(state);
        getToken(state);
        if (state.token !== ")") {
          params.push(parseAssignment(state));
          while (state.token === ",") {
            getToken(state);
            params.push(parseAssignment(state));
          }
        }
        if (state.token !== ")") {
          throw createSyntaxError(state, "Parenthesis ) expected");
        }
        closeParams(state);
        getToken(state);
      }
      return new CustomNode(params);
    }
    return parseSymbol(state);
  }
  function parseSymbol(state) {
    var node, name2;
    if (state.tokenType === TOKENTYPE.SYMBOL || state.tokenType === TOKENTYPE.DELIMITER && state.token in NAMED_DELIMITERS) {
      name2 = state.token;
      getToken(state);
      if (hasOwnProperty(CONSTANTS, name2)) {
        node = new ConstantNode2(CONSTANTS[name2]);
      } else if (NUMERIC_CONSTANTS.includes(name2)) {
        node = new ConstantNode2(numeric3(name2, "number"));
      } else {
        node = new SymbolNode2(name2);
      }
      node = parseAccessors(state, node);
      return node;
    }
    return parseString(state);
  }
  function parseAccessors(state, node, types) {
    var params;
    while ((state.token === "(" || state.token === "[" || state.token === ".") && !types) {
      params = [];
      if (state.token === "(") {
        if (isSymbolNode(node) || isAccessorNode(node)) {
          openParams(state);
          getToken(state);
          if (state.token !== ")") {
            params.push(parseAssignment(state));
            while (state.token === ",") {
              getToken(state);
              params.push(parseAssignment(state));
            }
          }
          if (state.token !== ")") {
            throw createSyntaxError(state, "Parenthesis ) expected");
          }
          closeParams(state);
          getToken(state);
          node = new FunctionNode2(node, params);
        } else {
          return node;
        }
      } else if (state.token === "[") {
        openParams(state);
        getToken(state);
        if (state.token !== "]") {
          params.push(parseAssignment(state));
          while (state.token === ",") {
            getToken(state);
            params.push(parseAssignment(state));
          }
        }
        if (state.token !== "]") {
          throw createSyntaxError(state, "Parenthesis ] expected");
        }
        closeParams(state);
        getToken(state);
        node = new AccessorNode2(node, new IndexNode2(params));
      } else {
        getToken(state);
        var isPropertyName = state.tokenType === TOKENTYPE.SYMBOL || state.tokenType === TOKENTYPE.DELIMITER && state.token in NAMED_DELIMITERS;
        if (!isPropertyName) {
          throw createSyntaxError(state, "Property name expected after dot");
        }
        params.push(new ConstantNode2(state.token));
        getToken(state);
        var dotNotation = true;
        node = new AccessorNode2(node, new IndexNode2(params, dotNotation));
      }
    }
    return node;
  }
  function parseString(state) {
    var node, str;
    if (state.token === '"' || state.token === "'") {
      str = parseStringToken(state, state.token);
      node = new ConstantNode2(str);
      node = parseAccessors(state, node);
      return node;
    }
    return parseMatrix(state);
  }
  function parseStringToken(state, quote) {
    var str = "";
    while (currentCharacter(state) !== "" && currentCharacter(state) !== quote) {
      if (currentCharacter(state) === "\\") {
        next(state);
        var char = currentCharacter(state);
        var escapeChar = ESCAPE_CHARACTERS[char];
        if (escapeChar !== void 0) {
          str += escapeChar;
          state.index += 1;
        } else if (char === "u") {
          var unicode = state.expression.slice(state.index + 1, state.index + 5);
          if (/^[0-9A-Fa-f]{4}$/.test(unicode)) {
            str += String.fromCharCode(parseInt(unicode, 16));
            state.index += 5;
          } else {
            throw createSyntaxError(state, "Invalid unicode character \\u".concat(unicode));
          }
        } else {
          throw createSyntaxError(state, "Bad escape character \\".concat(char));
        }
      } else {
        str += currentCharacter(state);
        next(state);
      }
    }
    getToken(state);
    if (state.token !== quote) {
      throw createSyntaxError(state, "End of string ".concat(quote, " expected"));
    }
    getToken(state);
    return str;
  }
  function parseMatrix(state) {
    var array, params, rows, cols;
    if (state.token === "[") {
      openParams(state);
      getToken(state);
      if (state.token !== "]") {
        var row2 = parseRow(state);
        if (state.token === ";") {
          rows = 1;
          params = [row2];
          while (state.token === ";") {
            getToken(state);
            if (state.token !== "]") {
              params[rows] = parseRow(state);
              rows++;
            }
          }
          if (state.token !== "]") {
            throw createSyntaxError(state, "End of matrix ] expected");
          }
          closeParams(state);
          getToken(state);
          cols = params[0].items.length;
          for (var r = 1; r < rows; r++) {
            if (params[r].items.length !== cols) {
              throw createError(state, "Column dimensions mismatch (" + params[r].items.length + " !== " + cols + ")");
            }
          }
          array = new ArrayNode2(params);
        } else {
          if (state.token !== "]") {
            throw createSyntaxError(state, "End of matrix ] expected");
          }
          closeParams(state);
          getToken(state);
          array = row2;
        }
      } else {
        closeParams(state);
        getToken(state);
        array = new ArrayNode2([]);
      }
      return parseAccessors(state, array);
    }
    return parseObject(state);
  }
  function parseRow(state) {
    var params = [parseAssignment(state)];
    var len = 1;
    while (state.token === ",") {
      getToken(state);
      if (state.token !== "]" && state.token !== ";") {
        params[len] = parseAssignment(state);
        len++;
      }
    }
    return new ArrayNode2(params);
  }
  function parseObject(state) {
    if (state.token === "{") {
      openParams(state);
      var key;
      var properties2 = {};
      do {
        getToken(state);
        if (state.token !== "}") {
          if (state.token === '"' || state.token === "'") {
            key = parseStringToken(state, state.token);
          } else if (state.tokenType === TOKENTYPE.SYMBOL || state.tokenType === TOKENTYPE.DELIMITER && state.token in NAMED_DELIMITERS) {
            key = state.token;
            getToken(state);
          } else {
            throw createSyntaxError(state, "Symbol or string expected as object key");
          }
          if (state.token !== ":") {
            throw createSyntaxError(state, "Colon : expected after object key");
          }
          getToken(state);
          properties2[key] = parseAssignment(state);
        }
      } while (state.token === ",");
      if (state.token !== "}") {
        throw createSyntaxError(state, "Comma , or bracket } expected after object value");
      }
      closeParams(state);
      getToken(state);
      var node = new ObjectNode2(properties2);
      node = parseAccessors(state, node);
      return node;
    }
    return parseNumber(state);
  }
  function parseNumber(state) {
    var numberStr;
    if (state.tokenType === TOKENTYPE.NUMBER) {
      numberStr = state.token;
      getToken(state);
      return new ConstantNode2(numeric3(numberStr, config2.number));
    }
    return parseParentheses(state);
  }
  function parseParentheses(state) {
    var node;
    if (state.token === "(") {
      openParams(state);
      getToken(state);
      node = parseAssignment(state);
      if (state.token !== ")") {
        throw createSyntaxError(state, "Parenthesis ) expected");
      }
      closeParams(state);
      getToken(state);
      node = new ParenthesisNode2(node);
      node = parseAccessors(state, node);
      return node;
    }
    return parseEnd(state);
  }
  function parseEnd(state) {
    if (state.token === "") {
      throw createSyntaxError(state, "Unexpected end of expression");
    } else {
      throw createSyntaxError(state, "Value expected");
    }
  }
  function col(state) {
    return state.index - state.token.length + 1;
  }
  function createSyntaxError(state, message) {
    var c = col(state);
    var error = new SyntaxError(message + " (char " + c + ")");
    error.char = c;
    return error;
  }
  function createError(state, message) {
    var c = col(state);
    var error = new SyntaxError(message + " (char " + c + ")");
    error.char = c;
    return error;
  }
  typed2.addConversion({
    from: "string",
    to: "Node",
    convert: parse2
  });
  return parse2;
});
var name$F = "compile";
var dependencies$F = ["typed", "parse"];
var createCompile = /* @__PURE__ */ factory(name$F, dependencies$F, (_ref) => {
  var {
    typed: typed2,
    parse: parse2
  } = _ref;
  return typed2(name$F, {
    string: function string2(expr) {
      return parse2(expr).compile();
    },
    "Array | Matrix": function ArrayMatrix(expr) {
      return deepMap(expr, function(entry) {
        return parse2(entry).compile();
      });
    }
  });
});
var name$E = "evaluate";
var dependencies$E = ["typed", "parse"];
var createEvaluate = /* @__PURE__ */ factory(name$E, dependencies$E, (_ref) => {
  var {
    typed: typed2,
    parse: parse2
  } = _ref;
  return typed2(name$E, {
    string: function string2(expr) {
      var scope = createEmptyMap();
      return parse2(expr).compile().evaluate(scope);
    },
    "string, Map | Object": function stringMapObject(expr, scope) {
      return parse2(expr).compile().evaluate(scope);
    },
    "Array | Matrix": function ArrayMatrix(expr) {
      var scope = createEmptyMap();
      return deepMap(expr, function(entry) {
        return parse2(entry).compile().evaluate(scope);
      });
    },
    "Array | Matrix, Map | Object": function ArrayMatrixMapObject(expr, scope) {
      return deepMap(expr, function(entry) {
        return parse2(entry).compile().evaluate(scope);
      });
    }
  });
});
var name$D = "Parser";
var dependencies$D = ["evaluate"];
var createParserClass = /* @__PURE__ */ factory(name$D, dependencies$D, (_ref) => {
  var {
    evaluate: evaluate2
  } = _ref;
  function Parser2() {
    if (!(this instanceof Parser2)) {
      throw new SyntaxError("Constructor must be called with the new operator");
    }
    Object.defineProperty(this, "scope", {
      value: createEmptyMap(),
      writable: false
    });
  }
  Parser2.prototype.type = "Parser";
  Parser2.prototype.isParser = true;
  Parser2.prototype.evaluate = function(expr) {
    return evaluate2(expr, this.scope);
  };
  Parser2.prototype.get = function(name2) {
    if (this.scope.has(name2)) {
      return this.scope.get(name2);
    }
  };
  Parser2.prototype.getAll = function() {
    return toObject(this.scope);
  };
  Parser2.prototype.getAllAsMap = function() {
    return this.scope;
  };
  Parser2.prototype.set = function(name2, value) {
    this.scope.set(name2, value);
    return value;
  };
  Parser2.prototype.remove = function(name2) {
    this.scope.delete(name2);
  };
  Parser2.prototype.clear = function() {
    this.scope.clear();
  };
  return Parser2;
}, {
  isClass: true
});
var name$C = "parser";
var dependencies$C = ["typed", "Parser"];
var createParser = /* @__PURE__ */ factory(name$C, dependencies$C, (_ref) => {
  var {
    typed: typed2,
    Parser: Parser2
  } = _ref;
  return typed2(name$C, {
    "": function _() {
      return new Parser2();
    }
  });
});
var name$B = "Help";
var dependencies$B = ["evaluate"];
var createHelpClass = /* @__PURE__ */ factory(name$B, dependencies$B, (_ref) => {
  var {
    evaluate: evaluate2
  } = _ref;
  function Help2(doc) {
    if (!(this instanceof Help2)) {
      throw new SyntaxError("Constructor must be called with the new operator");
    }
    if (!doc)
      throw new Error('Argument "doc" missing');
    this.doc = doc;
  }
  Help2.prototype.type = "Help";
  Help2.prototype.isHelp = true;
  Help2.prototype.toString = function() {
    var doc = this.doc || {};
    var desc = "\n";
    if (doc.name) {
      desc += "Name: " + doc.name + "\n\n";
    }
    if (doc.category) {
      desc += "Category: " + doc.category + "\n\n";
    }
    if (doc.description) {
      desc += "Description:\n    " + doc.description + "\n\n";
    }
    if (doc.syntax) {
      desc += "Syntax:\n    " + doc.syntax.join("\n    ") + "\n\n";
    }
    if (doc.examples) {
      desc += "Examples:\n";
      var configChanged = false;
      var originalConfig = evaluate2("config()");
      var scope = {
        config: (newConfig) => {
          configChanged = true;
          return evaluate2("config(newConfig)", {
            newConfig
          });
        }
      };
      for (var i2 = 0; i2 < doc.examples.length; i2++) {
        var expr = doc.examples[i2];
        desc += "    " + expr + "\n";
        var res = void 0;
        try {
          res = evaluate2(expr, scope);
        } catch (e2) {
          res = e2;
        }
        if (res !== void 0 && !isHelp(res)) {
          desc += "        " + format(res, {
            precision: 14
          }) + "\n";
        }
      }
      desc += "\n";
      if (configChanged) {
        evaluate2("config(originalConfig)", {
          originalConfig
        });
      }
    }
    if (doc.mayThrow && doc.mayThrow.length) {
      desc += "Throws: " + doc.mayThrow.join(", ") + "\n\n";
    }
    if (doc.seealso && doc.seealso.length) {
      desc += "See also: " + doc.seealso.join(", ") + "\n";
    }
    return desc;
  };
  Help2.prototype.toJSON = function() {
    var obj = clone(this.doc);
    obj.mathjs = "Help";
    return obj;
  };
  Help2.fromJSON = function(json) {
    var doc = {};
    Object.keys(json).filter((prop) => prop !== "mathjs").forEach((prop) => {
      doc[prop] = json[prop];
    });
    return new Help2(doc);
  };
  Help2.prototype.valueOf = Help2.prototype.toString;
  return Help2;
}, {
  isClass: true
});
var name$A = "Chain";
var dependencies$A = ["?on", "math", "typed"];
var createChainClass = /* @__PURE__ */ factory(name$A, dependencies$A, (_ref) => {
  var {
    on,
    math: math2,
    typed: typed2
  } = _ref;
  function Chain2(value) {
    if (!(this instanceof Chain2)) {
      throw new SyntaxError("Constructor must be called with the new operator");
    }
    if (isChain(value)) {
      this.value = value.value;
    } else {
      this.value = value;
    }
  }
  Chain2.prototype.type = "Chain";
  Chain2.prototype.isChain = true;
  Chain2.prototype.done = function() {
    return this.value;
  };
  Chain2.prototype.valueOf = function() {
    return this.value;
  };
  Chain2.prototype.toString = function() {
    return format(this.value);
  };
  Chain2.prototype.toJSON = function() {
    return {
      mathjs: "Chain",
      value: this.value
    };
  };
  Chain2.fromJSON = function(json) {
    return new Chain2(json.value);
  };
  function createProxy(name2, fn) {
    if (typeof fn === "function") {
      Chain2.prototype[name2] = chainify(fn);
    }
  }
  function createLazyProxy(name2, resolver) {
    lazy(Chain2.prototype, name2, function outerResolver() {
      var fn = resolver();
      if (typeof fn === "function") {
        return chainify(fn);
      }
      return void 0;
    });
  }
  function chainify(fn) {
    return function() {
      if (arguments.length === 0) {
        return new Chain2(fn(this.value));
      }
      var args = [this.value];
      for (var i2 = 0; i2 < arguments.length; i2++) {
        args[i2 + 1] = arguments[i2];
      }
      if (typed2.isTypedFunction(fn)) {
        var sigObject = typed2.resolve(fn, args);
        if (sigObject.params.length === 1) {
          throw new Error("chain function " + fn.name + " cannot match rest parameter between chain value and additional arguments.");
        }
        return new Chain2(sigObject.implementation.apply(fn, args));
      }
      return new Chain2(fn.apply(fn, args));
    };
  }
  Chain2.createProxy = function(arg0, arg1) {
    if (typeof arg0 === "string") {
      createProxy(arg0, arg1);
    } else {
      var _loop = function _loop2(_name2) {
        if (hasOwnProperty(arg0, _name2) && excludedNames[_name2] === void 0) {
          createLazyProxy(_name2, () => arg0[_name2]);
        }
      };
      for (var _name in arg0) {
        _loop(_name);
      }
    }
  };
  var excludedNames = {
    expression: true,
    docs: true,
    type: true,
    classes: true,
    json: true,
    error: true,
    isChain: true
    // conflicts with the property isChain of a Chain instance
  };
  Chain2.createProxy(math2);
  if (on) {
    on("import", function(name2, resolver, path) {
      if (!path) {
        createLazyProxy(name2, resolver);
      }
    });
  }
  return Chain2;
}, {
  isClass: true
});
var eDocs = {
  name: "e",
  category: "Constants",
  syntax: ["e"],
  description: "Euler's number, the base of the natural logarithm. Approximately equal to 2.71828",
  examples: ["e", "e ^ 2", "exp(2)", "log(e)"],
  seealso: ["exp"]
};
var falseDocs = {
  name: "false",
  category: "Constants",
  syntax: ["false"],
  description: "Boolean value false",
  examples: ["false"],
  seealso: ["true"]
};
var iDocs = {
  name: "i",
  category: "Constants",
  syntax: ["i"],
  description: "Imaginary unit, defined as i*i=-1. A complex number is described as a + b*i, where a is the real part, and b is the imaginary part.",
  examples: ["i", "i * i", "sqrt(-1)"],
  seealso: []
};
var InfinityDocs = {
  name: "Infinity",
  category: "Constants",
  syntax: ["Infinity"],
  description: "Infinity, a number which is larger than the maximum number that can be handled by a floating point number.",
  examples: ["Infinity", "1 / 0"],
  seealso: []
};
var LN10Docs = {
  name: "LN10",
  category: "Constants",
  syntax: ["LN10"],
  description: "Returns the natural logarithm of 10, approximately equal to 2.302",
  examples: ["LN10", "log(10)"],
  seealso: []
};
var LN2Docs = {
  name: "LN2",
  category: "Constants",
  syntax: ["LN2"],
  description: "Returns the natural logarithm of 2, approximately equal to 0.693",
  examples: ["LN2", "log(2)"],
  seealso: []
};
var LOG10EDocs = {
  name: "LOG10E",
  category: "Constants",
  syntax: ["LOG10E"],
  description: "Returns the base-10 logarithm of E, approximately equal to 0.434",
  examples: ["LOG10E", "log(e, 10)"],
  seealso: []
};
var LOG2EDocs = {
  name: "LOG2E",
  category: "Constants",
  syntax: ["LOG2E"],
  description: "Returns the base-2 logarithm of E, approximately equal to 1.442",
  examples: ["LOG2E", "log(e, 2)"],
  seealso: []
};
var NaNDocs = {
  name: "NaN",
  category: "Constants",
  syntax: ["NaN"],
  description: "Not a number",
  examples: ["NaN", "0 / 0"],
  seealso: []
};
var nullDocs = {
  name: "null",
  category: "Constants",
  syntax: ["null"],
  description: "Value null",
  examples: ["null"],
  seealso: ["true", "false"]
};
var phiDocs = {
  name: "phi",
  category: "Constants",
  syntax: ["phi"],
  description: "Phi is the golden ratio. Two quantities are in the golden ratio if their ratio is the same as the ratio of their sum to the larger of the two quantities. Phi is defined as `(1 + sqrt(5)) / 2` and is approximately 1.618034...",
  examples: ["phi"],
  seealso: []
};
var piDocs = {
  name: "pi",
  category: "Constants",
  syntax: ["pi"],
  description: "The number pi is a mathematical constant that is the ratio of a circle's circumference to its diameter, and is approximately equal to 3.14159",
  examples: ["pi", "sin(pi/2)"],
  seealso: ["tau"]
};
var SQRT12Docs = {
  name: "SQRT1_2",
  category: "Constants",
  syntax: ["SQRT1_2"],
  description: "Returns the square root of 1/2, approximately equal to 0.707",
  examples: ["SQRT1_2", "sqrt(1/2)"],
  seealso: []
};
var SQRT2Docs = {
  name: "SQRT2",
  category: "Constants",
  syntax: ["SQRT2"],
  description: "Returns the square root of 2, approximately equal to 1.414",
  examples: ["SQRT2", "sqrt(2)"],
  seealso: []
};
var tauDocs = {
  name: "tau",
  category: "Constants",
  syntax: ["tau"],
  description: "Tau is the ratio constant of a circle's circumference to radius, equal to 2 * pi, approximately 6.2832.",
  examples: ["tau", "2 * pi"],
  seealso: ["pi"]
};
var trueDocs = {
  name: "true",
  category: "Constants",
  syntax: ["true"],
  description: "Boolean value true",
  examples: ["true"],
  seealso: ["false"]
};
var versionDocs = {
  name: "version",
  category: "Constants",
  syntax: ["version"],
  description: "A string with the version number of math.js",
  examples: ["version"],
  seealso: []
};
var bignumberDocs = {
  name: "bignumber",
  category: "Construction",
  syntax: ["bignumber(x)"],
  description: "Create a big number from a number or string.",
  examples: ["0.1 + 0.2", "bignumber(0.1) + bignumber(0.2)", 'bignumber("7.2")', 'bignumber("7.2e500")', "bignumber([0.1, 0.2, 0.3])"],
  seealso: ["boolean", "complex", "fraction", "index", "matrix", "string", "unit"]
};
var booleanDocs = {
  name: "boolean",
  category: "Construction",
  syntax: ["x", "boolean(x)"],
  description: "Convert a string or number into a boolean.",
  examples: ["boolean(0)", "boolean(1)", "boolean(3)", 'boolean("true")', 'boolean("false")', "boolean([1, 0, 1, 1])"],
  seealso: ["bignumber", "complex", "index", "matrix", "number", "string", "unit"]
};
var complexDocs = {
  name: "complex",
  category: "Construction",
  syntax: ["complex()", "complex(re, im)", "complex(string)"],
  description: "Create a complex number.",
  examples: ["complex()", "complex(2, 3)", 'complex("7 - 2i")'],
  seealso: ["bignumber", "boolean", "index", "matrix", "number", "string", "unit"]
};
var createUnitDocs = {
  name: "createUnit",
  category: "Construction",
  syntax: ["createUnit(definitions)", "createUnit(name, definition)"],
  description: "Create a user-defined unit and register it with the Unit type.",
  examples: ['createUnit("foo")', 'createUnit("knot", {definition: "0.514444444 m/s", aliases: ["knots", "kt", "kts"]})', 'createUnit("mph", "1 mile/hour")'],
  seealso: ["unit", "splitUnit"]
};
var fractionDocs = {
  name: "fraction",
  category: "Construction",
  syntax: ["fraction(num)", "fraction(matrix)", "fraction(num,den)", "fraction({n: num, d: den})"],
  description: "Create a fraction from a number or from integer numerator and denominator.",
  examples: ["fraction(0.125)", "fraction(1, 3) + fraction(2, 5)", "fraction({n: 333, d: 53})", "fraction([sqrt(9), sqrt(10), sqrt(11)])"],
  seealso: ["bignumber", "boolean", "complex", "index", "matrix", "string", "unit"]
};
var indexDocs = {
  name: "index",
  category: "Construction",
  syntax: ["[start]", "[start:end]", "[start:step:end]", "[start1, start 2, ...]", "[start1:end1, start2:end2, ...]", "[start1:step1:end1, start2:step2:end2, ...]"],
  description: "Create an index to get or replace a subset of a matrix",
  examples: ["A = [1, 2, 3; 4, 5, 6]", "A[1, :]", "A[1, 2] = 50", "A[1:2, 1:2] = 1", "B = [1, 2, 3]", "B[B>1 and B<3]"],
  seealso: ["bignumber", "boolean", "complex", "matrix,", "number", "range", "string", "unit"]
};
var matrixDocs = {
  name: "matrix",
  category: "Construction",
  syntax: ["[]", "[a1, b1, ...; a2, b2, ...]", "matrix()", 'matrix("dense")', "matrix([...])"],
  description: "Create a matrix.",
  examples: ["[]", "[1, 2, 3]", "[1, 2, 3; 4, 5, 6]", "matrix()", "matrix([3, 4])", 'matrix([3, 4; 5, 6], "sparse")', 'matrix([3, 4; 5, 6], "sparse", "number")'],
  seealso: ["bignumber", "boolean", "complex", "index", "number", "string", "unit", "sparse"]
};
var numberDocs = {
  name: "number",
  category: "Construction",
  syntax: ["x", "number(x)", "number(unit, valuelessUnit)"],
  description: "Create a number or convert a string or boolean into a number.",
  examples: ["2", "2e3", "4.05", "number(2)", 'number("7.2")', "number(true)", "number([true, false, true, true])", 'number(unit("52cm"), "m")'],
  seealso: ["bignumber", "boolean", "complex", "fraction", "index", "matrix", "string", "unit"]
};
var sparseDocs = {
  name: "sparse",
  category: "Construction",
  syntax: ["sparse()", "sparse([a1, b1, ...; a1, b2, ...])", 'sparse([a1, b1, ...; a1, b2, ...], "number")'],
  description: "Create a sparse matrix.",
  examples: ["sparse()", "sparse([3, 4; 5, 6])", 'sparse([3, 0; 5, 0], "number")'],
  seealso: ["bignumber", "boolean", "complex", "index", "number", "string", "unit", "matrix"]
};
var splitUnitDocs = {
  name: "splitUnit",
  category: "Construction",
  syntax: ["splitUnit(unit: Unit, parts: Unit[])"],
  description: "Split a unit in an array of units whose sum is equal to the original unit.",
  examples: ['splitUnit(1 m, ["feet", "inch"])'],
  seealso: ["unit", "createUnit"]
};
var stringDocs = {
  name: "string",
  category: "Construction",
  syntax: ['"text"', "string(x)"],
  description: "Create a string or convert a value to a string",
  examples: ['"Hello World!"', "string(4.2)", "string(3 + 2i)"],
  seealso: ["bignumber", "boolean", "complex", "index", "matrix", "number", "unit"]
};
var unitDocs = {
  name: "unit",
  category: "Construction",
  syntax: ["value unit", "unit(value, unit)", "unit(string)"],
  description: "Create a unit.",
  examples: ["5.5 mm", "3 inch", 'unit(7.1, "kilogram")', 'unit("23 deg")'],
  seealso: ["bignumber", "boolean", "complex", "index", "matrix", "number", "string"]
};
var configDocs = {
  name: "config",
  category: "Core",
  syntax: ["config()", "config(options)"],
  description: "Get configuration or change configuration.",
  examples: ["config()", "1/3 + 1/4", 'config({number: "Fraction"})', "1/3 + 1/4"],
  seealso: []
};
var importDocs = {
  name: "import",
  category: "Core",
  syntax: ["import(functions)", "import(functions, options)"],
  description: "Import functions or constants from an object.",
  examples: ["import({myFn: f(x)=x^2, myConstant: 32 })", "myFn(2)", "myConstant"],
  seealso: []
};
var typedDocs = {
  name: "typed",
  category: "Core",
  syntax: ["typed(signatures)", "typed(name, signatures)"],
  description: "Create a typed function.",
  examples: ['double = typed({ "number": f(x)=x+x, "string": f(x)=concat(x,x) })', "double(2)", 'double("hello")'],
  seealso: []
};
var derivativeDocs = {
  name: "derivative",
  category: "Algebra",
  syntax: ["derivative(expr, variable)", "derivative(expr, variable, {simplify: boolean})"],
  description: "Takes the derivative of an expression expressed in parser Nodes. The derivative will be taken over the supplied variable in the second parameter. If there are multiple variables in the expression, it will return a partial derivative.",
  examples: ['derivative("2x^3", "x")', 'derivative("2x^3", "x", {simplify: false})', 'derivative("2x^2 + 3x + 4", "x")', 'derivative("sin(2x)", "x")', 'f = parse("x^2 + x")', 'x = parse("x")', "df = derivative(f, x)", "df.evaluate({x: 3})"],
  seealso: ["simplify", "parse", "evaluate"]
};
var leafCountDocs = {
  name: "leafCount",
  category: "Algebra",
  syntax: ["leafCount(expr)"],
  description: "Computes the number of leaves in the parse tree of the given expression",
  examples: ['leafCount("e^(i*pi)-1")', 'leafCount(parse("{a: 22/7, b: 10^(1/2)}"))'],
  seealso: ["simplify"]
};
var lsolveDocs = {
  name: "lsolve",
  category: "Algebra",
  syntax: ["x=lsolve(L, b)"],
  description: "Finds one solution of the linear system L * x = b where L is an [n x n] lower triangular matrix and b is a [n] column vector.",
  examples: ["a = [-2, 3; 2, 1]", "b = [11, 9]", "x = lsolve(a, b)"],
  seealso: ["lsolveAll", "lup", "lusolve", "usolve", "matrix", "sparse"]
};
var lsolveAllDocs = {
  name: "lsolveAll",
  category: "Algebra",
  syntax: ["x=lsolveAll(L, b)"],
  description: "Finds all solutions of the linear system L * x = b where L is an [n x n] lower triangular matrix and b is a [n] column vector.",
  examples: ["a = [-2, 3; 2, 1]", "b = [11, 9]", "x = lsolve(a, b)"],
  seealso: ["lsolve", "lup", "lusolve", "usolve", "matrix", "sparse"]
};
var lupDocs = {
  name: "lup",
  category: "Algebra",
  syntax: ["lup(m)"],
  description: "Calculate the Matrix LU decomposition with partial pivoting. Matrix A is decomposed in three matrices (L, U, P) where P * A = L * U",
  examples: ["lup([[2, 1], [1, 4]])", "lup(matrix([[2, 1], [1, 4]]))", "lup(sparse([[2, 1], [1, 4]]))"],
  seealso: ["lusolve", "lsolve", "usolve", "matrix", "sparse", "slu", "qr"]
};
var lusolveDocs = {
  name: "lusolve",
  category: "Algebra",
  syntax: ["x=lusolve(A, b)", "x=lusolve(lu, b)"],
  description: "Solves the linear system A * x = b where A is an [n x n] matrix and b is a [n] column vector.",
  examples: ["a = [-2, 3; 2, 1]", "b = [11, 9]", "x = lusolve(a, b)"],
  seealso: ["lup", "slu", "lsolve", "usolve", "matrix", "sparse"]
};
var polynomialRootDocs = {
  name: "polynomialRoot",
  category: "Algebra",
  syntax: ["x=polynomialRoot(-6, 3)", "x=polynomialRoot(4, -4, 1)", "x=polynomialRoot(-8, 12, -6, 1)"],
  description: "Finds the roots of a univariate polynomial given by its coefficients starting from constant, linear, and so on, increasing in degree.",
  examples: ["a = polynomialRoot(-6, 11, -6, 1)"],
  seealso: ["cbrt", "sqrt"]
};
var qrDocs = {
  name: "qr",
  category: "Algebra",
  syntax: ["qr(A)"],
  description: "Calculates the Matrix QR decomposition. Matrix `A` is decomposed in two matrices (`Q`, `R`) where `Q` is an orthogonal matrix and `R` is an upper triangular matrix.",
  examples: ["qr([[1, -1,  4], [1,  4, -2], [1,  4,  2], [1,  -1, 0]])"],
  seealso: ["lup", "slu", "matrix"]
};
var rationalizeDocs = {
  name: "rationalize",
  category: "Algebra",
  syntax: ["rationalize(expr)", "rationalize(expr, scope)", "rationalize(expr, scope, detailed)"],
  description: "Transform a rationalizable expression in a rational fraction. If rational fraction is one variable polynomial then converts the numerator and denominator in canonical form, with decreasing exponents, returning the coefficients of numerator.",
  examples: ['rationalize("2x/y - y/(x+1)")', 'rationalize("2x/y - y/(x+1)", true)'],
  seealso: ["simplify"]
};
var resolveDocs = {
  name: "resolve",
  category: "Algebra",
  syntax: ["resolve(node, scope)"],
  description: "Recursively substitute variables in an expression tree.",
  examples: ['resolve(parse("1 + x"), { x: 7 })', 'resolve(parse("size(text)"), { text: "Hello World" })', 'resolve(parse("x + y"), { x: parse("3z") })', 'resolve(parse("3x"), { x: parse("y+z"), z: parse("w^y") })'],
  seealso: ["simplify", "evaluate"],
  mayThrow: ["ReferenceError"]
};
var simplifyDocs = {
  name: "simplify",
  category: "Algebra",
  syntax: ["simplify(expr)", "simplify(expr, rules)"],
  description: "Simplify an expression tree.",
  examples: ['simplify("3 + 2 / 4")', 'simplify("2x + x")', 'f = parse("x * (x + 2 + x)")', "simplified = simplify(f)", "simplified.evaluate({x: 2})"],
  seealso: ["simplifyCore", "derivative", "evaluate", "parse", "rationalize", "resolve"]
};
var simplifyConstantDocs = {
  name: "simplifyConstant",
  category: "Algebra",
  syntax: ["simplifyConstant(expr)", "simplifyConstant(expr, options)"],
  description: "Replace constant subexpressions of node with their values.",
  examples: ['simplifyConstant("(3-3)*x")', 'simplifyConstant(parse("z-cos(tau/8)"))'],
  seealso: ["simplify", "simplifyCore", "evaluate"]
};
var simplifyCoreDocs = {
  name: "simplifyCore",
  category: "Algebra",
  syntax: ["simplifyCore(node)"],
  description: "Perform simple one-pass simplifications on an expression tree.",
  examples: ['simplifyCore(parse("0*x"))', 'simplifyCore(parse("(x+0)*2"))'],
  seealso: ["simplify", "simplifyConstant", "evaluate"]
};
var sluDocs = {
  name: "slu",
  category: "Algebra",
  syntax: ["slu(A, order, threshold)"],
  description: "Calculate the Matrix LU decomposition with full pivoting. Matrix A is decomposed in two matrices (L, U) and two permutation vectors (pinv, q) where P * A * Q = L * U",
  examples: ["slu(sparse([4.5, 0, 3.2, 0; 3.1, 2.9, 0, 0.9; 0, 1.7, 3, 0; 3.5, 0.4, 0, 1]), 1, 0.001)"],
  seealso: ["lusolve", "lsolve", "usolve", "matrix", "sparse", "lup", "qr"]
};
var symbolicEqualDocs = {
  name: "symbolicEqual",
  category: "Algebra",
  syntax: ["symbolicEqual(expr1, expr2)", "symbolicEqual(expr1, expr2, options)"],
  description: "Returns true if the difference of the expressions simplifies to 0",
  examples: ['symbolicEqual("x*y","y*x")', 'symbolicEqual("abs(x^2)", "x^2")', 'symbolicEqual("abs(x)", "x", {context: {abs: {trivial: true}}})'],
  seealso: ["simplify", "evaluate"]
};
var usolveDocs = {
  name: "usolve",
  category: "Algebra",
  syntax: ["x=usolve(U, b)"],
  description: "Finds one solution of the linear system U * x = b where U is an [n x n] upper triangular matrix and b is a [n] column vector.",
  examples: ["x=usolve(sparse([1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1]), [1; 2; 3; 4])"],
  seealso: ["usolveAll", "lup", "lusolve", "lsolve", "matrix", "sparse"]
};
var usolveAllDocs = {
  name: "usolveAll",
  category: "Algebra",
  syntax: ["x=usolve(U, b)"],
  description: "Finds all solutions of the linear system U * x = b where U is an [n x n] upper triangular matrix and b is a [n] column vector.",
  examples: ["x=usolve(sparse([1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1]), [1; 2; 3; 4])"],
  seealso: ["usolve", "lup", "lusolve", "lsolve", "matrix", "sparse"]
};
var absDocs = {
  name: "abs",
  category: "Arithmetic",
  syntax: ["abs(x)"],
  description: "Compute the absolute value.",
  examples: ["abs(3.5)", "abs(-4.2)"],
  seealso: ["sign"]
};
var addDocs = {
  name: "add",
  category: "Operators",
  syntax: ["x + y", "add(x, y)"],
  description: "Add two values.",
  examples: ["a = 2.1 + 3.6", "a - 3.6", "3 + 2i", "3 cm + 2 inch", '"2.3" + "4"'],
  seealso: ["subtract"]
};
var cbrtDocs = {
  name: "cbrt",
  category: "Arithmetic",
  syntax: ["cbrt(x)", "cbrt(x, allRoots)"],
  description: "Compute the cubic root value. If x = y * y * y, then y is the cubic root of x. When `x` is a number or complex number, an optional second argument `allRoots` can be provided to return all three cubic roots. If not provided, the principal root is returned",
  examples: ["cbrt(64)", "cube(4)", "cbrt(-8)", "cbrt(2 + 3i)", "cbrt(8i)", "cbrt(8i, true)", "cbrt(27 m^3)"],
  seealso: ["square", "sqrt", "cube", "multiply"]
};
var ceilDocs = {
  name: "ceil",
  category: "Arithmetic",
  syntax: ["ceil(x)"],
  description: "Round a value towards plus infinity. If x is complex, both real and imaginary part are rounded towards plus infinity.",
  examples: ["ceil(3.2)", "ceil(3.8)", "ceil(-4.2)"],
  seealso: ["floor", "fix", "round"]
};
var cubeDocs = {
  name: "cube",
  category: "Arithmetic",
  syntax: ["cube(x)"],
  description: "Compute the cube of a value. The cube of x is x * x * x.",
  examples: ["cube(2)", "2^3", "2 * 2 * 2"],
  seealso: ["multiply", "square", "pow"]
};
var divideDocs = {
  name: "divide",
  category: "Operators",
  syntax: ["x / y", "divide(x, y)"],
  description: "Divide two values.",
  examples: ["a = 2 / 3", "a * 3", "4.5 / 2", "3 + 4 / 2", "(3 + 4) / 2", "18 km / 4.5"],
  seealso: ["multiply"]
};
var dotDivideDocs = {
  name: "dotDivide",
  category: "Operators",
  syntax: ["x ./ y", "dotDivide(x, y)"],
  description: "Divide two values element wise.",
  examples: ["a = [1, 2, 3; 4, 5, 6]", "b = [2, 1, 1; 3, 2, 5]", "a ./ b"],
  seealso: ["multiply", "dotMultiply", "divide"]
};
var dotMultiplyDocs = {
  name: "dotMultiply",
  category: "Operators",
  syntax: ["x .* y", "dotMultiply(x, y)"],
  description: "Multiply two values element wise.",
  examples: ["a = [1, 2, 3; 4, 5, 6]", "b = [2, 1, 1; 3, 2, 5]", "a .* b"],
  seealso: ["multiply", "divide", "dotDivide"]
};
var dotPowDocs = {
  name: "dotPow",
  category: "Operators",
  syntax: ["x .^ y", "dotPow(x, y)"],
  description: "Calculates the power of x to y element wise.",
  examples: ["a = [1, 2, 3; 4, 5, 6]", "a .^ 2"],
  seealso: ["pow"]
};
var expDocs = {
  name: "exp",
  category: "Arithmetic",
  syntax: ["exp(x)"],
  description: "Calculate the exponent of a value.",
  examples: ["exp(1.3)", "e ^ 1.3", "log(exp(1.3))", "x = 2.4", "(exp(i*x) == cos(x) + i*sin(x))   # Euler's formula"],
  seealso: ["expm", "expm1", "pow", "log"]
};
var expmDocs = {
  name: "expm",
  category: "Arithmetic",
  syntax: ["exp(x)"],
  description: "Compute the matrix exponential, expm(A) = e^A. The matrix must be square. Not to be confused with exp(a), which performs element-wise exponentiation.",
  examples: ["expm([[0,2],[0,0]])"],
  seealso: ["exp"]
};
var expm1Docs = {
  name: "expm1",
  category: "Arithmetic",
  syntax: ["expm1(x)"],
  description: "Calculate the value of subtracting 1 from the exponential value.",
  examples: ["expm1(2)", "pow(e, 2) - 1", "log(expm1(2) + 1)"],
  seealso: ["exp", "pow", "log"]
};
var fixDocs = {
  name: "fix",
  category: "Arithmetic",
  syntax: ["fix(x)"],
  description: "Round a value towards zero. If x is complex, both real and imaginary part are rounded towards zero.",
  examples: ["fix(3.2)", "fix(3.8)", "fix(-4.2)", "fix(-4.8)"],
  seealso: ["ceil", "floor", "round"]
};
var floorDocs = {
  name: "floor",
  category: "Arithmetic",
  syntax: ["floor(x)"],
  description: "Round a value towards minus infinity.If x is complex, both real and imaginary part are rounded towards minus infinity.",
  examples: ["floor(3.2)", "floor(3.8)", "floor(-4.2)"],
  seealso: ["ceil", "fix", "round"]
};
var gcdDocs = {
  name: "gcd",
  category: "Arithmetic",
  syntax: ["gcd(a, b)", "gcd(a, b, c, ...)"],
  description: "Compute the greatest common divisor.",
  examples: ["gcd(8, 12)", "gcd(-4, 6)", "gcd(25, 15, -10)"],
  seealso: ["lcm", "xgcd"]
};
var hypotDocs = {
  name: "hypot",
  category: "Arithmetic",
  syntax: ["hypot(a, b, c, ...)", "hypot([a, b, c, ...])"],
  description: "Calculate the hypotenusa of a list with values. ",
  examples: ["hypot(3, 4)", "sqrt(3^2 + 4^2)", "hypot(-2)", "hypot([3, 4, 5])"],
  seealso: ["abs", "norm"]
};
var invmodDocs = {
  name: "invmod",
  category: "Arithmetic",
  syntax: ["invmod(a, b)"],
  description: "Calculate the (modular) multiplicative inverse of a modulo b. Solution to the equation ax ≣ 1 (mod b)",
  examples: ["invmod(8, 12)", "invmod(7, 13)", "invmod(15151, 15122)"],
  seealso: ["gcd", "xgcd"]
};
var lcmDocs = {
  name: "lcm",
  category: "Arithmetic",
  syntax: ["lcm(x, y)"],
  description: "Compute the least common multiple.",
  examples: ["lcm(4, 6)", "lcm(6, 21)", "lcm(6, 21, 5)"],
  seealso: ["gcd"]
};
var logDocs = {
  name: "log",
  category: "Arithmetic",
  syntax: ["log(x)", "log(x, base)"],
  description: "Compute the logarithm of a value. If no base is provided, the natural logarithm of x is calculated. If base if provided, the logarithm is calculated for the specified base. log(x, base) is defined as log(x) / log(base).",
  examples: ["log(3.5)", "a = log(2.4)", "exp(a)", "10 ^ 4", "log(10000, 10)", "log(10000) / log(10)", "b = log(1024, 2)", "2 ^ b"],
  seealso: ["exp", "log1p", "log2", "log10"]
};
var log10Docs = {
  name: "log10",
  category: "Arithmetic",
  syntax: ["log10(x)"],
  description: "Compute the 10-base logarithm of a value.",
  examples: ["log10(0.00001)", "log10(10000)", "10 ^ 4", "log(10000) / log(10)", "log(10000, 10)"],
  seealso: ["exp", "log"]
};
var log1pDocs = {
  name: "log1p",
  category: "Arithmetic",
  syntax: ["log1p(x)", "log1p(x, base)"],
  description: "Calculate the logarithm of a `value+1`",
  examples: ["log1p(2.5)", "exp(log1p(1.4))", "pow(10, 4)", "log1p(9999, 10)", "log1p(9999) / log(10)"],
  seealso: ["exp", "log", "log2", "log10"]
};
var log2Docs = {
  name: "log2",
  category: "Arithmetic",
  syntax: ["log2(x)"],
  description: "Calculate the 2-base of a value. This is the same as calculating `log(x, 2)`.",
  examples: ["log2(0.03125)", "log2(16)", "log2(16) / log2(2)", "pow(2, 4)"],
  seealso: ["exp", "log1p", "log", "log10"]
};
var modDocs = {
  name: "mod",
  category: "Operators",
  syntax: ["x % y", "x mod y", "mod(x, y)"],
  description: "Calculates the modulus, the remainder of an integer division.",
  examples: ["7 % 3", "11 % 2", "10 mod 4", "isOdd(x) = x % 2", "isOdd(2)", "isOdd(3)"],
  seealso: ["divide"]
};
var multiplyDocs = {
  name: "multiply",
  category: "Operators",
  syntax: ["x * y", "multiply(x, y)"],
  description: "multiply two values.",
  examples: ["a = 2.1 * 3.4", "a / 3.4", "2 * 3 + 4", "2 * (3 + 4)", "3 * 2.1 km"],
  seealso: ["divide"]
};
var normDocs = {
  name: "norm",
  category: "Arithmetic",
  syntax: ["norm(x)", "norm(x, p)"],
  description: "Calculate the norm of a number, vector or matrix.",
  examples: ["abs(-3.5)", "norm(-3.5)", "norm(3 - 4i)", "norm([1, 2, -3], Infinity)", "norm([1, 2, -3], -Infinity)", "norm([3, 4], 2)", "norm([[1, 2], [3, 4]], 1)", 'norm([[1, 2], [3, 4]], "inf")', 'norm([[1, 2], [3, 4]], "fro")']
};
var nthRootDocs = {
  name: "nthRoot",
  category: "Arithmetic",
  syntax: ["nthRoot(a)", "nthRoot(a, root)"],
  description: 'Calculate the nth root of a value. The principal nth root of a positive real number A, is the positive real solution of the equation "x^root = A".',
  examples: ["4 ^ 3", "nthRoot(64, 3)", "nthRoot(9, 2)", "sqrt(9)"],
  seealso: ["nthRoots", "pow", "sqrt"]
};
var nthRootsDocs = {
  name: "nthRoots",
  category: "Arithmetic",
  syntax: ["nthRoots(A)", "nthRoots(A, root)"],
  description: 'Calculate the nth roots of a value. An nth root of a positive real number A, is a positive real solution of the equation "x^root = A". This function returns an array of complex values.',
  examples: ["nthRoots(1)", "nthRoots(1, 3)"],
  seealso: ["sqrt", "pow", "nthRoot"]
};
var powDocs = {
  name: "pow",
  category: "Operators",
  syntax: ["x ^ y", "pow(x, y)"],
  description: "Calculates the power of x to y, x^y.",
  examples: ["2^3", "2*2*2", "1 + e ^ (pi * i)", "pow([[1, 2], [4, 3]], 2)", "pow([[1, 2], [4, 3]], -1)"],
  seealso: ["multiply", "nthRoot", "nthRoots", "sqrt"]
};
var roundDocs = {
  name: "round",
  category: "Arithmetic",
  syntax: ["round(x)", "round(x, n)", "round(unit, valuelessUnit)", "round(unit, n, valuelessUnit)"],
  description: "round a value towards the nearest integer.If x is complex, both real and imaginary part are rounded towards the nearest integer. When n is specified, the value is rounded to n decimals.",
  examples: ["round(3.2)", "round(3.8)", "round(-4.2)", "round(-4.8)", "round(pi, 3)", "round(123.45678, 2)", "round(3.241cm, 2, cm)", "round([3.2, 3.8, -4.7])"],
  seealso: ["ceil", "floor", "fix"]
};
var signDocs = {
  name: "sign",
  category: "Arithmetic",
  syntax: ["sign(x)"],
  description: "Compute the sign of a value. The sign of a value x is 1 when x>1, -1 when x<0, and 0 when x=0.",
  examples: ["sign(3.5)", "sign(-4.2)", "sign(0)"],
  seealso: ["abs"]
};
var sqrtDocs = {
  name: "sqrt",
  category: "Arithmetic",
  syntax: ["sqrt(x)"],
  description: "Compute the square root value. If x = y * y, then y is the square root of x.",
  examples: ["sqrt(25)", "5 * 5", "sqrt(-1)"],
  seealso: ["square", "sqrtm", "multiply", "nthRoot", "nthRoots", "pow"]
};
var sqrtmDocs = {
  name: "sqrtm",
  category: "Arithmetic",
  syntax: ["sqrtm(x)"],
  description: "Calculate the principal square root of a square matrix. The principal square root matrix `X` of another matrix `A` is such that `X * X = A`.",
  examples: ["sqrtm([[33, 24], [48, 57]])"],
  seealso: ["sqrt", "abs", "square", "multiply"]
};
var sylvesterDocs = {
  name: "sylvester",
  category: "Algebra",
  syntax: ["sylvester(A,B,C)"],
  description: "Solves the real-valued Sylvester equation AX+XB=C for X",
  examples: ["sylvester([[-1, -2], [1, 1]], [[-2, 1], [-1, 2]], [[-3, 2], [3, 0]])", "A = [[-1, -2], [1, 1]]; B = [[2, -1], [1, -2]]; C = [[-3, 2], [3, 0]]", "sylvester(A, B, C)"],
  seealso: ["schur", "lyap"]
};
var schurDocs = {
  name: "schur",
  category: "Algebra",
  syntax: ["schur(A)"],
  description: "Performs a real Schur decomposition of the real matrix A = UTU'",
  examples: ["schur([[1, 0], [-4, 3]])", "A = [[1, 0], [-4, 3]]", "schur(A)"],
  seealso: ["lyap", "sylvester"]
};
var lyapDocs = {
  name: "lyap",
  category: "Algebra",
  syntax: ["lyap(A,Q)"],
  description: "Solves the Continuous-time Lyapunov equation AP+PA'+Q=0 for P",
  examples: ["lyap([[-2, 0], [1, -4]], [[3, 1], [1, 3]])", "A = [[-2, 0], [1, -4]]", "Q = [[3, 1], [1, 3]]", "lyap(A,Q)"],
  seealso: ["schur", "sylvester"]
};
var squareDocs = {
  name: "square",
  category: "Arithmetic",
  syntax: ["square(x)"],
  description: "Compute the square of a value. The square of x is x * x.",
  examples: ["square(3)", "sqrt(9)", "3^2", "3 * 3"],
  seealso: ["multiply", "pow", "sqrt", "cube"]
};
var subtractDocs = {
  name: "subtract",
  category: "Operators",
  syntax: ["x - y", "subtract(x, y)"],
  description: "subtract two values.",
  examples: ["a = 5.3 - 2", "a + 2", "2/3 - 1/6", "2 * 3 - 3", "2.1 km - 500m"],
  seealso: ["add"]
};
var unaryMinusDocs = {
  name: "unaryMinus",
  category: "Operators",
  syntax: ["-x", "unaryMinus(x)"],
  description: "Inverse the sign of a value. Converts booleans and strings to numbers.",
  examples: ["-4.5", "-(-5.6)", '-"22"'],
  seealso: ["add", "subtract", "unaryPlus"]
};
var unaryPlusDocs = {
  name: "unaryPlus",
  category: "Operators",
  syntax: ["+x", "unaryPlus(x)"],
  description: "Converts booleans and strings to numbers.",
  examples: ["+true", '+"2"'],
  seealso: ["add", "subtract", "unaryMinus"]
};
var xgcdDocs = {
  name: "xgcd",
  category: "Arithmetic",
  syntax: ["xgcd(a, b)"],
  description: "Calculate the extended greatest common divisor for two values. The result is an array [d, x, y] with 3 entries, where d is the greatest common divisor, and d = x * a + y * b.",
  examples: ["xgcd(8, 12)", "gcd(8, 12)", "xgcd(36163, 21199)"],
  seealso: ["gcd", "lcm"]
};
var bitAndDocs = {
  name: "bitAnd",
  category: "Bitwise",
  syntax: ["x & y", "bitAnd(x, y)"],
  description: "Bitwise AND operation. Performs the logical AND operation on each pair of the corresponding bits of the two given values by multiplying them. If both bits in the compared position are 1, the bit in the resulting binary representation is 1, otherwise, the result is 0",
  examples: ["5 & 3", "bitAnd(53, 131)", "[1, 12, 31] & 42"],
  seealso: ["bitNot", "bitOr", "bitXor", "leftShift", "rightArithShift", "rightLogShift"]
};
var bitNotDocs = {
  name: "bitNot",
  category: "Bitwise",
  syntax: ["~x", "bitNot(x)"],
  description: "Bitwise NOT operation. Performs a logical negation on each bit of the given value. Bits that are 0 become 1, and those that are 1 become 0.",
  examples: ["~1", "~2", "bitNot([2, -3, 4])"],
  seealso: ["bitAnd", "bitOr", "bitXor", "leftShift", "rightArithShift", "rightLogShift"]
};
var bitOrDocs = {
  name: "bitOr",
  category: "Bitwise",
  syntax: ["x | y", "bitOr(x, y)"],
  description: "Bitwise OR operation. Performs the logical inclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if the first bit is 1 or the second bit is 1 or both bits are 1, otherwise, the result is 0.",
  examples: ["5 | 3", "bitOr([1, 2, 3], 4)"],
  seealso: ["bitAnd", "bitNot", "bitXor", "leftShift", "rightArithShift", "rightLogShift"]
};
var bitXorDocs = {
  name: "bitXor",
  category: "Bitwise",
  syntax: ["bitXor(x, y)"],
  description: "Bitwise XOR operation, exclusive OR. Performs the logical exclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if only the first bit is 1 or only the second bit is 1, but will be 0 if both are 0 or both are 1.",
  examples: ["bitOr(1, 2)", "bitXor([2, 3, 4], 4)"],
  seealso: ["bitAnd", "bitNot", "bitOr", "leftShift", "rightArithShift", "rightLogShift"]
};
var leftShiftDocs = {
  name: "leftShift",
  category: "Bitwise",
  syntax: ["x << y", "leftShift(x, y)"],
  description: "Bitwise left logical shift of a value x by y number of bits.",
  examples: ["4 << 1", "8 >> 1"],
  seealso: ["bitAnd", "bitNot", "bitOr", "bitXor", "rightArithShift", "rightLogShift"]
};
var rightArithShiftDocs = {
  name: "rightArithShift",
  category: "Bitwise",
  syntax: ["x >> y", "rightArithShift(x, y)"],
  description: "Bitwise right arithmetic shift of a value x by y number of bits.",
  examples: ["8 >> 1", "4 << 1", "-12 >> 2"],
  seealso: ["bitAnd", "bitNot", "bitOr", "bitXor", "leftShift", "rightLogShift"]
};
var rightLogShiftDocs = {
  name: "rightLogShift",
  category: "Bitwise",
  syntax: ["x >>> y", "rightLogShift(x, y)"],
  description: "Bitwise right logical shift of a value x by y number of bits.",
  examples: ["8 >>> 1", "4 << 1", "-12 >>> 2"],
  seealso: ["bitAnd", "bitNot", "bitOr", "bitXor", "leftShift", "rightArithShift"]
};
var bellNumbersDocs = {
  name: "bellNumbers",
  category: "Combinatorics",
  syntax: ["bellNumbers(n)"],
  description: "The Bell Numbers count the number of partitions of a set. A partition is a pairwise disjoint subset of S whose union is S. `bellNumbers` only takes integer arguments. The following condition must be enforced: n >= 0.",
  examples: ["bellNumbers(3)", "bellNumbers(8)"],
  seealso: ["stirlingS2"]
};
var catalanDocs = {
  name: "catalan",
  category: "Combinatorics",
  syntax: ["catalan(n)"],
  description: "The Catalan Numbers enumerate combinatorial structures of many different types. catalan only takes integer arguments. The following condition must be enforced: n >= 0.",
  examples: ["catalan(3)", "catalan(8)"],
  seealso: ["bellNumbers"]
};
var compositionDocs = {
  name: "composition",
  category: "Combinatorics",
  syntax: ["composition(n, k)"],
  description: "The composition counts of n into k parts. composition only takes integer arguments. The following condition must be enforced: k <= n.",
  examples: ["composition(5, 3)"],
  seealso: ["combinations"]
};
var stirlingS2Docs = {
  name: "stirlingS2",
  category: "Combinatorics",
  syntax: ["stirlingS2(n, k)"],
  description: "he Stirling numbers of the second kind, counts the number of ways to partition a set of n labelled objects into k nonempty unlabelled subsets. `stirlingS2` only takes integer arguments. The following condition must be enforced: k <= n. If n = k or k = 1, then s(n,k) = 1.",
  examples: ["stirlingS2(5, 3)"],
  seealso: ["bellNumbers"]
};
var argDocs = {
  name: "arg",
  category: "Complex",
  syntax: ["arg(x)"],
  description: "Compute the argument of a complex value. If x = a+bi, the argument is computed as atan2(b, a).",
  examples: ["arg(2 + 2i)", "atan2(3, 2)", "arg(2 + 3i)"],
  seealso: ["re", "im", "conj", "abs"]
};
var conjDocs = {
  name: "conj",
  category: "Complex",
  syntax: ["conj(x)"],
  description: "Compute the complex conjugate of a complex value. If x = a+bi, the complex conjugate is a-bi.",
  examples: ["conj(2 + 3i)", "conj(2 - 3i)", "conj(-5.2i)"],
  seealso: ["re", "im", "abs", "arg"]
};
var imDocs = {
  name: "im",
  category: "Complex",
  syntax: ["im(x)"],
  description: "Get the imaginary part of a complex number.",
  examples: ["im(2 + 3i)", "re(2 + 3i)", "im(-5.2i)", "im(2.4)"],
  seealso: ["re", "conj", "abs", "arg"]
};
var reDocs = {
  name: "re",
  category: "Complex",
  syntax: ["re(x)"],
  description: "Get the real part of a complex number.",
  examples: ["re(2 + 3i)", "im(2 + 3i)", "re(-5.2i)", "re(2.4)"],
  seealso: ["im", "conj", "abs", "arg"]
};
var evaluateDocs = {
  name: "evaluate",
  category: "Expression",
  syntax: ["evaluate(expression)", "evaluate(expression, scope)", "evaluate([expr1, expr2, expr3, ...])", "evaluate([expr1, expr2, expr3, ...], scope)"],
  description: "Evaluate an expression or an array with expressions.",
  examples: ['evaluate("2 + 3")', 'evaluate("sqrt(16)")', 'evaluate("2 inch to cm")', 'evaluate("sin(x * pi)", { "x": 1/2 })', 'evaluate(["width=2", "height=4","width*height"])'],
  seealso: []
};
var helpDocs = {
  name: "help",
  category: "Expression",
  syntax: ["help(object)", "help(string)"],
  description: "Display documentation on a function or data type.",
  examples: ["help(sqrt)", 'help("complex")'],
  seealso: []
};
var distanceDocs = {
  name: "distance",
  category: "Geometry",
  syntax: ["distance([x1, y1], [x2, y2])", "distance([[x1, y1], [x2, y2]])"],
  description: "Calculates the Euclidean distance between two points.",
  examples: ["distance([0,0], [4,4])", "distance([[0,0], [4,4]])"],
  seealso: []
};
var intersectDocs = {
  name: "intersect",
  category: "Geometry",
  syntax: ["intersect(expr1, expr2, expr3, expr4)", "intersect(expr1, expr2, expr3)"],
  description: "Computes the intersection point of lines and/or planes.",
  examples: ["intersect([0, 0], [10, 10], [10, 0], [0, 10])", "intersect([1, 0, 1],  [4, -2, 2], [1, 1, 1, 6])"],
  seealso: []
};
var andDocs = {
  name: "and",
  category: "Logical",
  syntax: ["x and y", "and(x, y)"],
  description: "Logical and. Test whether two values are both defined with a nonzero/nonempty value.",
  examples: ["true and false", "true and true", "2 and 4"],
  seealso: ["not", "or", "xor"]
};
var notDocs = {
  name: "not",
  category: "Logical",
  syntax: ["not x", "not(x)"],
  description: "Logical not. Flips the boolean value of given argument.",
  examples: ["not true", "not false", "not 2", "not 0"],
  seealso: ["and", "or", "xor"]
};
var orDocs = {
  name: "or",
  category: "Logical",
  syntax: ["x or y", "or(x, y)"],
  description: "Logical or. Test if at least one value is defined with a nonzero/nonempty value.",
  examples: ["true or false", "false or false", "0 or 4"],
  seealso: ["not", "and", "xor"]
};
var xorDocs = {
  name: "xor",
  category: "Logical",
  syntax: ["x xor y", "xor(x, y)"],
  description: "Logical exclusive or, xor. Test whether one and only one value is defined with a nonzero/nonempty value.",
  examples: ["true xor false", "false xor false", "true xor true", "0 xor 4"],
  seealso: ["not", "and", "or"]
};
var columnDocs = {
  name: "column",
  category: "Matrix",
  syntax: ["column(x, index)"],
  description: "Return a column from a matrix or array.",
  examples: ["A = [[1, 2], [3, 4]]", "column(A, 1)", "column(A, 2)"],
  seealso: ["row", "matrixFromColumns"]
};
var concatDocs = {
  name: "concat",
  category: "Matrix",
  syntax: ["concat(A, B, C, ...)", "concat(A, B, C, ..., dim)"],
  description: "Concatenate matrices. By default, the matrices are concatenated by the last dimension. The dimension on which to concatenate can be provided as last argument.",
  examples: ["A = [1, 2; 5, 6]", "B = [3, 4; 7, 8]", "concat(A, B)", "concat(A, B, 1)", "concat(A, B, 2)"],
  seealso: ["det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
};
var countDocs = {
  name: "count",
  category: "Matrix",
  syntax: ["count(x)"],
  description: "Count the number of elements of a matrix, array or string.",
  examples: ["a = [1, 2; 3, 4; 5, 6]", "count(a)", "size(a)", 'count("hello world")'],
  seealso: ["size"]
};
var crossDocs = {
  name: "cross",
  category: "Matrix",
  syntax: ["cross(A, B)"],
  description: "Calculate the cross product for two vectors in three dimensional space.",
  examples: ["cross([1, 1, 0],  [0, 1, 1])", "cross([3, -3, 1], [4, 9, 2])", "cross([2, 3, 4],  [5, 6, 7])"],
  seealso: ["multiply", "dot"]
};
var ctransposeDocs = {
  name: "ctranspose",
  category: "Matrix",
  syntax: ["x'", "ctranspose(x)"],
  description: "Complex Conjugate and Transpose a matrix",
  examples: ["a = [1, 2, 3; 4, 5, 6]", "a'", "ctranspose(a)"],
  seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "zeros"]
};
var detDocs = {
  name: "det",
  category: "Matrix",
  syntax: ["det(x)"],
  description: "Calculate the determinant of a matrix",
  examples: ["det([1, 2; 3, 4])", "det([-2, 2, 3; -1, 1, 3; 2, 0, -1])"],
  seealso: ["concat", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
};
var diagDocs = {
  name: "diag",
  category: "Matrix",
  syntax: ["diag(x)", "diag(x, k)"],
  description: "Create a diagonal matrix or retrieve the diagonal of a matrix. When x is a vector, a matrix with the vector values on the diagonal will be returned. When x is a matrix, a vector with the diagonal values of the matrix is returned. When k is provided, the k-th diagonal will be filled in or retrieved, if k is positive, the values are placed on the super diagonal. When k is negative, the values are placed on the sub diagonal.",
  examples: ["diag(1:3)", "diag(1:3, 1)", "a = [1, 2, 3; 4, 5, 6; 7, 8, 9]", "diag(a)"],
  seealso: ["concat", "det", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
};
var diffDocs = {
  name: "diff",
  category: "Matrix",
  syntax: ["diff(arr)", "diff(arr, dim)"],
  description: ["Create a new matrix or array with the difference of the passed matrix or array.", "Dim parameter is optional and used to indicant the dimension of the array/matrix to apply the difference", "If no dimension parameter is passed it is assumed as dimension 0", "Dimension is zero-based in javascript and one-based in the parser", "Arrays must be 'rectangular' meaning arrays like [1, 2]", "If something is passed as a matrix it will be returned as a matrix but other than that all matrices are converted to arrays"],
  examples: ["A = [1, 2, 4, 7, 0]", "diff(A)", "diff(A, 1)", "B = [[1, 2], [3, 4]]", "diff(B)", "diff(B, 1)", "diff(B, 2)", "diff(B, bignumber(2))", "diff([[1, 2], matrix([3, 4])], 2)"],
  seealso: ["subtract", "partitionSelect"]
};
var dotDocs = {
  name: "dot",
  category: "Matrix",
  syntax: ["dot(A, B)", "A * B"],
  description: "Calculate the dot product of two vectors. The dot product of A = [a1, a2, a3, ..., an] and B = [b1, b2, b3, ..., bn] is defined as dot(A, B) = a1 * b1 + a2 * b2 + a3 * b3 + ... + an * bn",
  examples: ["dot([2, 4, 1], [2, 2, 3])", "[2, 4, 1] * [2, 2, 3]"],
  seealso: ["multiply", "cross"]
};
var eigsDocs = {
  name: "eigs",
  category: "Matrix",
  syntax: ["eigs(x)"],
  description: "Calculate the eigenvalues and optionally eigenvectors of a square matrix",
  examples: ["eigs([[5, 2.3], [2.3, 1]])", "eigs([[1, 2, 3], [4, 5, 6], [7, 8, 9]], { precision: 1e-6, eigenvectors: false })"],
  seealso: ["inv"]
};
var filterDocs = {
  name: "filter",
  category: "Matrix",
  syntax: ["filter(x, test)"],
  description: "Filter items in a matrix.",
  examples: ["isPositive(x) = x > 0", "filter([6, -2, -1, 4, 3], isPositive)", "filter([6, -2, 0, 1, 0], x != 0)"],
  seealso: ["sort", "map", "forEach"]
};
var flattenDocs = {
  name: "flatten",
  category: "Matrix",
  syntax: ["flatten(x)"],
  description: "Flatten a multi dimensional matrix into a single dimensional matrix.",
  examples: ["a = [1, 2, 3; 4, 5, 6]", "size(a)", "b = flatten(a)", "size(b)"],
  seealso: ["concat", "resize", "size", "squeeze"]
};
var forEachDocs = {
  name: "forEach",
  category: "Matrix",
  syntax: ["forEach(x, callback)"],
  description: "Iterates over all elements of a matrix/array, and executes the given callback function.",
  examples: ["numberOfPets = {}", "addPet(n) = numberOfPets[n] = (numberOfPets[n] ? numberOfPets[n]:0 ) + 1;", 'forEach(["Dog","Cat","Cat"], addPet)', "numberOfPets"],
  seealso: ["map", "sort", "filter"]
};
var getMatrixDataTypeDocs = {
  name: "getMatrixDataType",
  category: "Matrix",
  syntax: ["getMatrixDataType(x)"],
  description: 'Find the data type of all elements in a matrix or array, for example "number" if all items are a number and "Complex" if all values are complex numbers. If a matrix contains more than one data type, it will return "mixed".',
  examples: ["getMatrixDataType([1, 2, 3])", "getMatrixDataType([[5 cm], [2 inch]])", 'getMatrixDataType([1, "text"])', "getMatrixDataType([1, bignumber(4)])"],
  seealso: ["matrix", "sparse", "typeOf"]
};
var identityDocs = {
  name: "identity",
  category: "Matrix",
  syntax: ["identity(n)", "identity(m, n)", "identity([m, n])"],
  description: "Returns the identity matrix with size m-by-n. The matrix has ones on the diagonal and zeros elsewhere.",
  examples: ["identity(3)", "identity(3, 5)", "a = [1, 2, 3; 4, 5, 6]", "identity(size(a))"],
  seealso: ["concat", "det", "diag", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
};
var invDocs = {
  name: "inv",
  category: "Matrix",
  syntax: ["inv(x)"],
  description: "Calculate the inverse of a matrix",
  examples: ["inv([1, 2; 3, 4])", "inv(4)", "1 / 4"],
  seealso: ["concat", "det", "diag", "identity", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
};
var pinvDocs = {
  name: "pinv",
  category: "Matrix",
  syntax: ["pinv(x)"],
  description: "Calculate the Moore–Penrose inverse of a matrix",
  examples: ["pinv([1, 2; 3, 4])", "pinv([[1, 0], [0, 1], [0, 1]])", "pinv(4)"],
  seealso: ["inv"]
};
var kronDocs = {
  name: "kron",
  category: "Matrix",
  syntax: ["kron(x, y)"],
  description: "Calculates the kronecker product of 2 matrices or vectors.",
  examples: ["kron([[1, 0], [0, 1]], [[1, 2], [3, 4]])", "kron([1,1], [2,3,4])"],
  seealso: ["multiply", "dot", "cross"]
};
var mapDocs = {
  name: "map",
  category: "Matrix",
  syntax: ["map(x, callback)"],
  description: "Create a new matrix or array with the results of the callback function executed on each entry of the matrix/array.",
  examples: ["map([1, 2, 3], square)"],
  seealso: ["filter", "forEach"]
};
var matrixFromColumnsDocs = {
  name: "matrixFromColumns",
  category: "Matrix",
  syntax: ["matrixFromColumns(...arr)", "matrixFromColumns(row1, row2)", "matrixFromColumns(row1, row2, row3)"],
  description: "Create a dense matrix from vectors as individual columns.",
  examples: ["matrixFromColumns([1, 2, 3], [[4],[5],[6]])"],
  seealso: ["matrix", "matrixFromRows", "matrixFromFunction", "zeros"]
};
var matrixFromFunctionDocs = {
  name: "matrixFromFunction",
  category: "Matrix",
  syntax: ["matrixFromFunction(size, fn)", "matrixFromFunction(size, fn, format)", "matrixFromFunction(size, fn, format, datatype)", "matrixFromFunction(size, format, fn)", "matrixFromFunction(size, format, datatype, fn)"],
  description: "Create a matrix by evaluating a generating function at each index.",
  examples: ["f(I) = I[1] - I[2]", "matrixFromFunction([3,3], f)", "g(I) = I[1] - I[2] == 1 ? 4 : 0", 'matrixFromFunction([100, 100], "sparse", g)', "matrixFromFunction([5], random)"],
  seealso: ["matrix", "matrixFromRows", "matrixFromColumns", "zeros"]
};
var matrixFromRowsDocs = {
  name: "matrixFromRows",
  category: "Matrix",
  syntax: ["matrixFromRows(...arr)", "matrixFromRows(row1, row2)", "matrixFromRows(row1, row2, row3)"],
  description: "Create a dense matrix from vectors as individual rows.",
  examples: ["matrixFromRows([1, 2, 3], [[4],[5],[6]])"],
  seealso: ["matrix", "matrixFromColumns", "matrixFromFunction", "zeros"]
};
var onesDocs = {
  name: "ones",
  category: "Matrix",
  syntax: ["ones(m)", "ones(m, n)", "ones(m, n, p, ...)", "ones([m])", "ones([m, n])", "ones([m, n, p, ...])"],
  description: "Create a matrix containing ones.",
  examples: ["ones(3)", "ones(3, 5)", "ones([2,3]) * 4.5", "a = [1, 2, 3; 4, 5, 6]", "ones(size(a))"],
  seealso: ["concat", "det", "diag", "identity", "inv", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
};
var partitionSelectDocs = {
  name: "partitionSelect",
  category: "Matrix",
  syntax: ["partitionSelect(x, k)", "partitionSelect(x, k, compare)"],
  description: "Partition-based selection of an array or 1D matrix. Will find the kth smallest value, and mutates the input array. Uses Quickselect.",
  examples: ["partitionSelect([5, 10, 1], 2)", 'partitionSelect(["C", "B", "A", "D"], 1, compareText)', "arr = [5, 2, 1]", "partitionSelect(arr, 0) # returns 1, arr is now: [1, 2, 5]", "arr", "partitionSelect(arr, 1, 'desc') # returns 2, arr is now: [5, 2, 1]", "arr"],
  seealso: ["sort"]
};
var rangeDocs = {
  name: "range",
  category: "Type",
  syntax: ["start:end", "start:step:end", "range(start, end)", "range(start, end, step)", "range(string)"],
  description: "Create a range. Lower bound of the range is included, upper bound is excluded.",
  examples: ["1:5", "3:-1:-3", "range(3, 7)", "range(0, 12, 2)", 'range("4:10")', "range(1m, 1m, 3m)", "a = [1, 2, 3, 4; 5, 6, 7, 8]", "a[1:2, 1:2]"],
  seealso: ["concat", "det", "diag", "identity", "inv", "ones", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
};
var reshapeDocs = {
  name: "reshape",
  category: "Matrix",
  syntax: ["reshape(x, sizes)"],
  description: "Reshape a multi dimensional array to fit the specified dimensions.",
  examples: ["reshape([1, 2, 3, 4, 5, 6], [2, 3])", "reshape([[1, 2], [3, 4]], [1, 4])", "reshape([[1, 2], [3, 4]], [4])", "reshape([1, 2, 3, 4], [-1, 2])"],
  seealso: ["size", "squeeze", "resize"]
};
var resizeDocs = {
  name: "resize",
  category: "Matrix",
  syntax: ["resize(x, size)", "resize(x, size, defaultValue)"],
  description: "Resize a matrix.",
  examples: ["resize([1,2,3,4,5], [3])", "resize([1,2,3], [5])", "resize([1,2,3], [5], -1)", "resize(2, [2, 3])", 'resize("hello", [8], "!")'],
  seealso: ["size", "subset", "squeeze", "reshape"]
};
var rotateDocs = {
  name: "rotate",
  category: "Matrix",
  syntax: ["rotate(w, theta)", "rotate(w, theta, v)"],
  description: "Returns a 2-D rotation matrix (2x2) for a given angle (in radians). Returns a 2-D rotation matrix (3x3) of a given angle (in radians) around given axis.",
  examples: ["rotate([1, 0], pi / 2)", 'rotate(matrix([1, 0]), unit("35deg"))', 'rotate([1, 0, 0], unit("90deg"), [0, 0, 1])', 'rotate(matrix([1, 0, 0]), unit("90deg"), matrix([0, 0, 1]))'],
  seealso: ["matrix", "rotationMatrix"]
};
var rotationMatrixDocs = {
  name: "rotationMatrix",
  category: "Matrix",
  syntax: ["rotationMatrix(theta)", "rotationMatrix(theta, v)", "rotationMatrix(theta, v, format)"],
  description: "Returns a 2-D rotation matrix (2x2) for a given angle (in radians). Returns a 2-D rotation matrix (3x3) of a given angle (in radians) around given axis.",
  examples: ["rotationMatrix(pi / 2)", 'rotationMatrix(unit("45deg"), [0, 0, 1])', 'rotationMatrix(1, matrix([0, 0, 1]), "sparse")'],
  seealso: ["cos", "sin"]
};
var rowDocs = {
  name: "row",
  category: "Matrix",
  syntax: ["row(x, index)"],
  description: "Return a row from a matrix or array.",
  examples: ["A = [[1, 2], [3, 4]]", "row(A, 1)", "row(A, 2)"],
  seealso: ["column", "matrixFromRows"]
};
var sizeDocs = {
  name: "size",
  category: "Matrix",
  syntax: ["size(x)"],
  description: "Calculate the size of a matrix.",
  examples: ["size(2.3)", 'size("hello world")', "a = [1, 2; 3, 4; 5, 6]", "size(a)", "size(1:6)"],
  seealso: ["concat", "count", "det", "diag", "identity", "inv", "ones", "range", "squeeze", "subset", "trace", "transpose", "zeros"]
};
var sortDocs = {
  name: "sort",
  category: "Matrix",
  syntax: ["sort(x)", "sort(x, compare)"],
  description: 'Sort the items in a matrix. Compare can be a string "asc", "desc", "natural", or a custom sort function.',
  examples: ["sort([5, 10, 1])", 'sort(["C", "B", "A", "D"], "natural")', "sortByLength(a, b) = size(a)[1] - size(b)[1]", 'sort(["Langdon", "Tom", "Sara"], sortByLength)', 'sort(["10", "1", "2"], "natural")'],
  seealso: ["map", "filter", "forEach"]
};
var squeezeDocs = {
  name: "squeeze",
  category: "Matrix",
  syntax: ["squeeze(x)"],
  description: "Remove inner and outer singleton dimensions from a matrix.",
  examples: ["a = zeros(3,2,1)", "size(squeeze(a))", "b = zeros(1,1,3)", "size(squeeze(b))"],
  seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "subset", "trace", "transpose", "zeros"]
};
var subsetDocs = {
  name: "subset",
  category: "Matrix",
  syntax: ["value(index)", "value(index) = replacement", "subset(value, [index])", "subset(value, [index], replacement)"],
  description: "Get or set a subset of the entries of a matrix or characters of a string. Indexes are one-based. There should be one index specification for each dimension of the target. Each specification can be a single index, a list of indices, or a range in colon notation `l:u`. In a range, both the lower bound l and upper bound u are included; and if a bound is omitted it defaults to the most extreme valid value. The cartesian product of the indices specified in each dimension determines the target of the operation.",
  examples: ["d = [1, 2; 3, 4]", "e = []", "e[1, 1:2] = [5, 6]", "e[2, :] = [7, 8]", "f = d * e", "f[2, 1]", "f[:, 1]", "f[[1,2], [1,3]] = [9, 10; 11, 12]", "f"],
  seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "trace", "transpose", "zeros"]
};
var traceDocs = {
  name: "trace",
  category: "Matrix",
  syntax: ["trace(A)"],
  description: "Calculate the trace of a matrix: the sum of the elements on the main diagonal of a square matrix.",
  examples: ["A = [1, 2, 3; -1, 2, 3; 2, 0, 3]", "trace(A)"],
  seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "transpose", "zeros"]
};
var transposeDocs = {
  name: "transpose",
  category: "Matrix",
  syntax: ["x'", "transpose(x)"],
  description: "Transpose a matrix",
  examples: ["a = [1, 2, 3; 4, 5, 6]", "a'", "transpose(a)"],
  seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "zeros"]
};
var zerosDocs = {
  name: "zeros",
  category: "Matrix",
  syntax: ["zeros(m)", "zeros(m, n)", "zeros(m, n, p, ...)", "zeros([m])", "zeros([m, n])", "zeros([m, n, p, ...])"],
  description: "Create a matrix containing zeros.",
  examples: ["zeros(3)", "zeros(3, 5)", "a = [1, 2, 3; 4, 5, 6]", "zeros(size(a))"],
  seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose"]
};
var fftDocs = {
  name: "fft",
  category: "Matrix",
  syntax: ["fft(x)"],
  description: "Calculate N-dimensional fourier transform",
  examples: ["fft([[1, 0], [1, 0]])"],
  seealso: ["ifft"]
};
var ifftDocs = {
  name: "ifft",
  category: "Matrix",
  syntax: ["ifft(x)"],
  description: "Calculate N-dimensional inverse fourier transform",
  examples: ["ifft([[2, 2], [0, 0]])"],
  seealso: ["fft"]
};
var combinationsDocs = {
  name: "combinations",
  category: "Probability",
  syntax: ["combinations(n, k)"],
  description: "Compute the number of combinations of n items taken k at a time",
  examples: ["combinations(7, 5)"],
  seealso: ["combinationsWithRep", "permutations", "factorial"]
};
var combinationsWithRepDocs = {
  name: "combinationsWithRep",
  category: "Probability",
  syntax: ["combinationsWithRep(n, k)"],
  description: "Compute the number of combinations of n items taken k at a time with replacements.",
  examples: ["combinationsWithRep(7, 5)"],
  seealso: ["combinations", "permutations", "factorial"]
};
var factorialDocs = {
  name: "factorial",
  category: "Probability",
  syntax: ["n!", "factorial(n)"],
  description: "Compute the factorial of a value",
  examples: ["5!", "5 * 4 * 3 * 2 * 1", "3!"],
  seealso: ["combinations", "combinationsWithRep", "permutations", "gamma"]
};
var gammaDocs = {
  name: "gamma",
  category: "Probability",
  syntax: ["gamma(n)"],
  description: "Compute the gamma function. For small values, the Lanczos approximation is used, and for large values the extended Stirling approximation.",
  examples: ["gamma(4)", "3!", "gamma(1/2)", "sqrt(pi)"],
  seealso: ["factorial"]
};
var lgammaDocs = {
  name: "lgamma",
  category: "Probability",
  syntax: ["lgamma(n)"],
  description: "Logarithm of the gamma function for real, positive numbers and complex numbers, using Lanczos approximation for numbers and Stirling series for complex numbers.",
  examples: ["lgamma(4)", "lgamma(1/2)", "lgamma(i)", "lgamma(complex(1.1, 2))"],
  seealso: ["gamma"]
};
var kldivergenceDocs = {
  name: "kldivergence",
  category: "Probability",
  syntax: ["kldivergence(x, y)"],
  description: "Calculate the Kullback-Leibler (KL) divergence  between two distributions.",
  examples: ["kldivergence([0.7,0.5,0.4], [0.2,0.9,0.5])"],
  seealso: []
};
var multinomialDocs = {
  name: "multinomial",
  category: "Probability",
  syntax: ["multinomial(A)"],
  description: "Multinomial Coefficients compute the number of ways of picking a1, a2, ..., ai unordered outcomes from `n` possibilities. multinomial takes one array of integers as an argument. The following condition must be enforced: every ai > 0.",
  examples: ["multinomial([1, 2, 1])"],
  seealso: ["combinations", "factorial"]
};
var permutationsDocs = {
  name: "permutations",
  category: "Probability",
  syntax: ["permutations(n)", "permutations(n, k)"],
  description: "Compute the number of permutations of n items taken k at a time",
  examples: ["permutations(5)", "permutations(5, 3)"],
  seealso: ["combinations", "combinationsWithRep", "factorial"]
};
var pickRandomDocs = {
  name: "pickRandom",
  category: "Probability",
  syntax: ["pickRandom(array)", "pickRandom(array, number)", "pickRandom(array, weights)", "pickRandom(array, number, weights)", "pickRandom(array, weights, number)"],
  description: "Pick a random entry from a given array.",
  examples: ["pickRandom(0:10)", "pickRandom([1, 3, 1, 6])", "pickRandom([1, 3, 1, 6], 2)", "pickRandom([1, 3, 1, 6], [2, 3, 2, 1])", "pickRandom([1, 3, 1, 6], 2, [2, 3, 2, 1])", "pickRandom([1, 3, 1, 6], [2, 3, 2, 1], 2)"],
  seealso: ["random", "randomInt"]
};
var randomDocs = {
  name: "random",
  category: "Probability",
  syntax: ["random()", "random(max)", "random(min, max)", "random(size)", "random(size, max)", "random(size, min, max)"],
  description: "Return a random number.",
  examples: ["random()", "random(10, 20)", "random([2, 3])"],
  seealso: ["pickRandom", "randomInt"]
};
var randomIntDocs = {
  name: "randomInt",
  category: "Probability",
  syntax: ["randomInt(max)", "randomInt(min, max)", "randomInt(size)", "randomInt(size, max)", "randomInt(size, min, max)"],
  description: "Return a random integer number",
  examples: ["randomInt(10, 20)", "randomInt([2, 3], 10)"],
  seealso: ["pickRandom", "random"]
};
var compareDocs = {
  name: "compare",
  category: "Relational",
  syntax: ["compare(x, y)"],
  description: "Compare two values. Returns 1 when x > y, -1 when x < y, and 0 when x == y.",
  examples: ["compare(2, 3)", "compare(3, 2)", "compare(2, 2)", "compare(5cm, 40mm)", "compare(2, [1, 2, 3])"],
  seealso: ["equal", "unequal", "smaller", "smallerEq", "largerEq", "compareNatural", "compareText"]
};
var compareNaturalDocs = {
  name: "compareNatural",
  category: "Relational",
  syntax: ["compareNatural(x, y)"],
  description: "Compare two values of any type in a deterministic, natural way. Returns 1 when x > y, -1 when x < y, and 0 when x == y.",
  examples: ["compareNatural(2, 3)", "compareNatural(3, 2)", "compareNatural(2, 2)", "compareNatural(5cm, 40mm)", 'compareNatural("2", "10")', "compareNatural(2 + 3i, 2 + 4i)", "compareNatural([1, 2, 4], [1, 2, 3])", "compareNatural([1, 5], [1, 2, 3])", "compareNatural([1, 2], [1, 2])", "compareNatural({a: 2}, {a: 4})"],
  seealso: ["equal", "unequal", "smaller", "smallerEq", "largerEq", "compare", "compareText"]
};
var compareTextDocs = {
  name: "compareText",
  category: "Relational",
  syntax: ["compareText(x, y)"],
  description: "Compare two strings lexically. Comparison is case sensitive. Returns 1 when x > y, -1 when x < y, and 0 when x == y.",
  examples: ['compareText("B", "A")', 'compareText("A", "B")', 'compareText("A", "A")', 'compareText("2", "10")', 'compare("2", "10")', "compare(2, 10)", 'compareNatural("2", "10")', 'compareText("B", ["A", "B", "C"])'],
  seealso: ["compare", "compareNatural"]
};
var deepEqualDocs = {
  name: "deepEqual",
  category: "Relational",
  syntax: ["deepEqual(x, y)"],
  description: "Check equality of two matrices element wise. Returns true if the size of both matrices is equal and when and each of the elements are equal.",
  examples: ["deepEqual([1,3,4], [1,3,4])", "deepEqual([1,3,4], [1,3])"],
  seealso: ["equal", "unequal", "smaller", "larger", "smallerEq", "largerEq", "compare"]
};
var equalDocs = {
  name: "equal",
  category: "Relational",
  syntax: ["x == y", "equal(x, y)"],
  description: "Check equality of two values. Returns true if the values are equal, and false if not.",
  examples: ["2+2 == 3", "2+2 == 4", "a = 3.2", "b = 6-2.8", "a == b", "50cm == 0.5m"],
  seealso: ["unequal", "smaller", "larger", "smallerEq", "largerEq", "compare", "deepEqual", "equalText"]
};
var equalTextDocs = {
  name: "equalText",
  category: "Relational",
  syntax: ["equalText(x, y)"],
  description: "Check equality of two strings. Comparison is case sensitive. Returns true if the values are equal, and false if not.",
  examples: ['equalText("Hello", "Hello")', 'equalText("a", "A")', 'equal("2e3", "2000")', 'equalText("2e3", "2000")', 'equalText("B", ["A", "B", "C"])'],
  seealso: ["compare", "compareNatural", "compareText", "equal"]
};
var largerDocs = {
  name: "larger",
  category: "Relational",
  syntax: ["x > y", "larger(x, y)"],
  description: "Check if value x is larger than y. Returns true if x is larger than y, and false if not.",
  examples: ["2 > 3", "5 > 2*2", "a = 3.3", "b = 6-2.8", "(a > b)", "(b < a)", "5 cm > 2 inch"],
  seealso: ["equal", "unequal", "smaller", "smallerEq", "largerEq", "compare"]
};
var largerEqDocs = {
  name: "largerEq",
  category: "Relational",
  syntax: ["x >= y", "largerEq(x, y)"],
  description: "Check if value x is larger or equal to y. Returns true if x is larger or equal to y, and false if not.",
  examples: ["2 >= 1+1", "2 > 1+1", "a = 3.2", "b = 6-2.8", "(a >= b)"],
  seealso: ["equal", "unequal", "smallerEq", "smaller", "compare"]
};
var smallerDocs = {
  name: "smaller",
  category: "Relational",
  syntax: ["x < y", "smaller(x, y)"],
  description: "Check if value x is smaller than value y. Returns true if x is smaller than y, and false if not.",
  examples: ["2 < 3", "5 < 2*2", "a = 3.3", "b = 6-2.8", "(a < b)", "5 cm < 2 inch"],
  seealso: ["equal", "unequal", "larger", "smallerEq", "largerEq", "compare"]
};
var smallerEqDocs = {
  name: "smallerEq",
  category: "Relational",
  syntax: ["x <= y", "smallerEq(x, y)"],
  description: "Check if value x is smaller or equal to value y. Returns true if x is smaller than y, and false if not.",
  examples: ["2 <= 1+1", "2 < 1+1", "a = 3.2", "b = 6-2.8", "(a <= b)"],
  seealso: ["equal", "unequal", "larger", "smaller", "largerEq", "compare"]
};
var unequalDocs = {
  name: "unequal",
  category: "Relational",
  syntax: ["x != y", "unequal(x, y)"],
  description: "Check unequality of two values. Returns true if the values are unequal, and false if they are equal.",
  examples: ["2+2 != 3", "2+2 != 4", "a = 3.2", "b = 6-2.8", "a != b", "50cm != 0.5m", "5 cm != 2 inch"],
  seealso: ["equal", "smaller", "larger", "smallerEq", "largerEq", "compare", "deepEqual"]
};
var setCartesianDocs = {
  name: "setCartesian",
  category: "Set",
  syntax: ["setCartesian(set1, set2)"],
  description: "Create the cartesian product of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays and the values will be sorted in ascending order before the operation.",
  examples: ["setCartesian([1, 2], [3, 4])"],
  seealso: ["setUnion", "setIntersect", "setDifference", "setPowerset"]
};
var setDifferenceDocs = {
  name: "setDifference",
  category: "Set",
  syntax: ["setDifference(set1, set2)"],
  description: "Create the difference of two (multi)sets: every element of set1, that is not the element of set2. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",
  examples: ["setDifference([1, 2, 3, 4], [3, 4, 5, 6])", "setDifference([[1, 2], [3, 4]], [[3, 4], [5, 6]])"],
  seealso: ["setUnion", "setIntersect", "setSymDifference"]
};
var setDistinctDocs = {
  name: "setDistinct",
  category: "Set",
  syntax: ["setDistinct(set)"],
  description: "Collect the distinct elements of a multiset. A multi-dimension array will be converted to a single-dimension array before the operation.",
  examples: ["setDistinct([1, 1, 1, 2, 2, 3])"],
  seealso: ["setMultiplicity"]
};
var setIntersectDocs = {
  name: "setIntersect",
  category: "Set",
  syntax: ["setIntersect(set1, set2)"],
  description: "Create the intersection of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",
  examples: ["setIntersect([1, 2, 3, 4], [3, 4, 5, 6])", "setIntersect([[1, 2], [3, 4]], [[3, 4], [5, 6]])"],
  seealso: ["setUnion", "setDifference"]
};
var setIsSubsetDocs = {
  name: "setIsSubset",
  category: "Set",
  syntax: ["setIsSubset(set1, set2)"],
  description: "Check whether a (multi)set is a subset of another (multi)set: every element of set1 is the element of set2. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",
  examples: ["setIsSubset([1, 2], [3, 4, 5, 6])", "setIsSubset([3, 4], [3, 4, 5, 6])"],
  seealso: ["setUnion", "setIntersect", "setDifference"]
};
var setMultiplicityDocs = {
  name: "setMultiplicity",
  category: "Set",
  syntax: ["setMultiplicity(element, set)"],
  description: "Count the multiplicity of an element in a multiset. A multi-dimension array will be converted to a single-dimension array before the operation.",
  examples: ["setMultiplicity(1, [1, 2, 2, 4])", "setMultiplicity(2, [1, 2, 2, 4])"],
  seealso: ["setDistinct", "setSize"]
};
var setPowersetDocs = {
  name: "setPowerset",
  category: "Set",
  syntax: ["setPowerset(set)"],
  description: "Create the powerset of a (multi)set: the powerset contains very possible subsets of a (multi)set. A multi-dimension array will be converted to a single-dimension array before the operation.",
  examples: ["setPowerset([1, 2, 3])"],
  seealso: ["setCartesian"]
};
var setSizeDocs = {
  name: "setSize",
  category: "Set",
  syntax: ["setSize(set)", "setSize(set, unique)"],
  description: 'Count the number of elements of a (multi)set. When the second parameter "unique" is true, count only the unique values. A multi-dimension array will be converted to a single-dimension array before the operation.',
  examples: ["setSize([1, 2, 2, 4])", "setSize([1, 2, 2, 4], true)"],
  seealso: ["setUnion", "setIntersect", "setDifference"]
};
var setSymDifferenceDocs = {
  name: "setSymDifference",
  category: "Set",
  syntax: ["setSymDifference(set1, set2)"],
  description: "Create the symmetric difference of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",
  examples: ["setSymDifference([1, 2, 3, 4], [3, 4, 5, 6])", "setSymDifference([[1, 2], [3, 4]], [[3, 4], [5, 6]])"],
  seealso: ["setUnion", "setIntersect", "setDifference"]
};
var setUnionDocs = {
  name: "setUnion",
  category: "Set",
  syntax: ["setUnion(set1, set2)"],
  description: "Create the union of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",
  examples: ["setUnion([1, 2, 3, 4], [3, 4, 5, 6])", "setUnion([[1, 2], [3, 4]], [[3, 4], [5, 6]])"],
  seealso: ["setIntersect", "setDifference"]
};
var zpk2tfDocs = {
  name: "zpk2tf",
  category: "Signal",
  syntax: ["zpk2tf(z, p, k)"],
  description: "Compute the transfer function of a zero-pole-gain model.",
  examples: ["zpk2tf([1, 2], [-1, -2], 1)", "zpk2tf([1, 2], [-1, -2])", "zpk2tf([1 - 3i, 2 + 2i], [-1, -2])"],
  seealso: []
};
var freqzDocs = {
  name: "freqz",
  category: "Signal",
  syntax: ["freqz(b, a)", "freqz(b, a, w)"],
  description: "Calculates the frequency response of a filter given its numerator and denominator coefficients.",
  examples: ["freqz([1, 2], [1, 2, 3])", "freqz([1, 2], [1, 2, 3], [0, 1])", "freqz([1, 2], [1, 2, 3], 512)"],
  seealso: []
};
var erfDocs = {
  name: "erf",
  category: "Special",
  syntax: ["erf(x)"],
  description: "Compute the erf function of a value using a rational Chebyshev approximations for different intervals of x",
  examples: ["erf(0.2)", "erf(-0.5)", "erf(4)"],
  seealso: []
};
var zetaDocs = {
  name: "zeta",
  category: "Special",
  syntax: ["zeta(s)"],
  description: "Compute the Riemann Zeta Function using an infinite series and Riemanns Functional Equation for the entire complex plane",
  examples: ["zeta(0.2)", "zeta(-0.5)", "zeta(4)"],
  seealso: []
};
var madDocs = {
  name: "mad",
  category: "Statistics",
  syntax: ["mad(a, b, c, ...)", "mad(A)"],
  description: "Compute the median absolute deviation of a matrix or a list with values. The median absolute deviation is defined as the median of the absolute deviations from the median.",
  examples: ["mad(10, 20, 30)", "mad([1, 2, 3])"],
  seealso: ["mean", "median", "std", "abs"]
};
var maxDocs = {
  name: "max",
  category: "Statistics",
  syntax: ["max(a, b, c, ...)", "max(A)", "max(A, dimension)"],
  description: "Compute the maximum value of a list of values.",
  examples: ["max(2, 3, 4, 1)", "max([2, 3, 4, 1])", "max([2, 5; 4, 3])", "max([2, 5; 4, 3], 1)", "max([2, 5; 4, 3], 2)", "max(2.7, 7.1, -4.5, 2.0, 4.1)", "min(2.7, 7.1, -4.5, 2.0, 4.1)"],
  seealso: ["mean", "median", "min", "prod", "std", "sum", "variance"]
};
var meanDocs = {
  name: "mean",
  category: "Statistics",
  syntax: ["mean(a, b, c, ...)", "mean(A)", "mean(A, dimension)"],
  description: "Compute the arithmetic mean of a list of values.",
  examples: ["mean(2, 3, 4, 1)", "mean([2, 3, 4, 1])", "mean([2, 5; 4, 3])", "mean([2, 5; 4, 3], 1)", "mean([2, 5; 4, 3], 2)", "mean([1.0, 2.7, 3.2, 4.0])"],
  seealso: ["max", "median", "min", "prod", "std", "sum", "variance"]
};
var medianDocs = {
  name: "median",
  category: "Statistics",
  syntax: ["median(a, b, c, ...)", "median(A)"],
  description: "Compute the median of all values. The values are sorted and the middle value is returned. In case of an even number of values, the average of the two middle values is returned.",
  examples: ["median(5, 2, 7)", "median([3, -1, 5, 7])"],
  seealso: ["max", "mean", "min", "prod", "std", "sum", "variance", "quantileSeq"]
};
var minDocs = {
  name: "min",
  category: "Statistics",
  syntax: ["min(a, b, c, ...)", "min(A)", "min(A, dimension)"],
  description: "Compute the minimum value of a list of values.",
  examples: ["min(2, 3, 4, 1)", "min([2, 3, 4, 1])", "min([2, 5; 4, 3])", "min([2, 5; 4, 3], 1)", "min([2, 5; 4, 3], 2)", "min(2.7, 7.1, -4.5, 2.0, 4.1)", "max(2.7, 7.1, -4.5, 2.0, 4.1)"],
  seealso: ["max", "mean", "median", "prod", "std", "sum", "variance"]
};
var modeDocs = {
  name: "mode",
  category: "Statistics",
  syntax: ["mode(a, b, c, ...)", "mode(A)", "mode(A, a, b, B, c, ...)"],
  description: "Computes the mode of all values as an array. In case mode being more than one, multiple values are returned in an array.",
  examples: ["mode(2, 1, 4, 3, 1)", "mode([1, 2.7, 3.2, 4, 2.7])", "mode(1, 4, 6, 1, 6)"],
  seealso: ["max", "mean", "min", "median", "prod", "std", "sum", "variance"]
};
var prodDocs = {
  name: "prod",
  category: "Statistics",
  syntax: ["prod(a, b, c, ...)", "prod(A)"],
  description: "Compute the product of all values.",
  examples: ["prod(2, 3, 4)", "prod([2, 3, 4])", "prod([2, 5; 4, 3])"],
  seealso: ["max", "mean", "min", "median", "min", "std", "sum", "variance"]
};
var quantileSeqDocs = {
  name: "quantileSeq",
  category: "Statistics",
  syntax: ["quantileSeq(A, prob[, sorted])", "quantileSeq(A, [prob1, prob2, ...][, sorted])", "quantileSeq(A, N[, sorted])"],
  description: "Compute the prob order quantile of a matrix or a list with values. The sequence is sorted and the middle value is returned. Supported types of sequence values are: Number, BigNumber, Unit Supported types of probablity are: Number, BigNumber. \n\nIn case of a (multi dimensional) array or matrix, the prob order quantile of all elements will be calculated.",
  examples: ["quantileSeq([3, -1, 5, 7], 0.5)", "quantileSeq([3, -1, 5, 7], [1/3, 2/3])", "quantileSeq([3, -1, 5, 7], 2)", "quantileSeq([-1, 3, 5, 7], 0.5, true)"],
  seealso: ["mean", "median", "min", "max", "prod", "std", "sum", "variance"]
};
var stdDocs = {
  name: "std",
  category: "Statistics",
  syntax: ["std(a, b, c, ...)", "std(A)", "std(A, dimension)", "std(A, normalization)", "std(A, dimension, normalization)"],
  description: 'Compute the standard deviation of all values, defined as std(A) = sqrt(variance(A)). Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',
  examples: ["std(2, 4, 6)", "std([2, 4, 6, 8])", 'std([2, 4, 6, 8], "uncorrected")', 'std([2, 4, 6, 8], "biased")', "std([1, 2, 3; 4, 5, 6])"],
  seealso: ["max", "mean", "min", "median", "prod", "sum", "variance"]
};
var cumSumDocs = {
  name: "cumsum",
  category: "Statistics",
  syntax: ["cumsum(a, b, c, ...)", "cumsum(A)"],
  description: "Compute the cumulative sum of all values.",
  examples: ["cumsum(2, 3, 4, 1)", "cumsum([2, 3, 4, 1])", "cumsum([1, 2; 3, 4])", "cumsum([1, 2; 3, 4], 1)", "cumsum([1, 2; 3, 4], 2)"],
  seealso: ["max", "mean", "median", "min", "prod", "std", "sum", "variance"]
};
var sumDocs = {
  name: "sum",
  category: "Statistics",
  syntax: ["sum(a, b, c, ...)", "sum(A)", "sum(A, dimension)"],
  description: "Compute the sum of all values.",
  examples: ["sum(2, 3, 4, 1)", "sum([2, 3, 4, 1])", "sum([2, 5; 4, 3])"],
  seealso: ["max", "mean", "median", "min", "prod", "std", "sum", "variance"]
};
var varianceDocs = {
  name: "variance",
  category: "Statistics",
  syntax: ["variance(a, b, c, ...)", "variance(A)", "variance(A, dimension)", "variance(A, normalization)", "variance(A, dimension, normalization)"],
  description: 'Compute the variance of all values. Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',
  examples: ["variance(2, 4, 6)", "variance([2, 4, 6, 8])", 'variance([2, 4, 6, 8], "uncorrected")', 'variance([2, 4, 6, 8], "biased")', "variance([1, 2, 3; 4, 5, 6])"],
  seealso: ["max", "mean", "min", "median", "min", "prod", "std", "sum"]
};
var corrDocs = {
  name: "corr",
  category: "Statistics",
  syntax: ["corr(A,B)"],
  description: "Compute the correlation coefficient of a two list with values, For matrices, the matrix correlation coefficient is calculated.",
  examples: ["corr([2, 4, 6, 8],[1, 2, 3, 6])", "corr(matrix([[1, 2.2, 3, 4.8, 5], [1, 2, 3, 4, 5]]), matrix([[4, 5.3, 6.6, 7, 8], [1, 2, 3, 4, 5]]))"],
  seealso: ["max", "mean", "min", "median", "min", "prod", "std", "sum"]
};
var acosDocs = {
  name: "acos",
  category: "Trigonometry",
  syntax: ["acos(x)"],
  description: "Compute the inverse cosine of a value in radians.",
  examples: ["acos(0.5)", "acos(cos(2.3))"],
  seealso: ["cos", "atan", "asin"]
};
var acoshDocs = {
  name: "acosh",
  category: "Trigonometry",
  syntax: ["acosh(x)"],
  description: "Calculate the hyperbolic arccos of a value, defined as `acosh(x) = ln(sqrt(x^2 - 1) + x)`.",
  examples: ["acosh(1.5)"],
  seealso: ["cosh", "asinh", "atanh"]
};
var acotDocs = {
  name: "acot",
  category: "Trigonometry",
  syntax: ["acot(x)"],
  description: "Calculate the inverse cotangent of a value.",
  examples: ["acot(0.5)", "acot(cot(0.5))", "acot(2)"],
  seealso: ["cot", "atan"]
};
var acothDocs = {
  name: "acoth",
  category: "Trigonometry",
  syntax: ["acoth(x)"],
  description: "Calculate the hyperbolic arccotangent of a value, defined as `acoth(x) = (ln((x+1)/x) + ln(x/(x-1))) / 2`.",
  examples: ["acoth(2)", "acoth(0.5)"],
  seealso: ["acsch", "asech"]
};
var acscDocs = {
  name: "acsc",
  category: "Trigonometry",
  syntax: ["acsc(x)"],
  description: "Calculate the inverse cotangent of a value.",
  examples: ["acsc(2)", "acsc(csc(0.5))", "acsc(0.5)"],
  seealso: ["csc", "asin", "asec"]
};
var acschDocs = {
  name: "acsch",
  category: "Trigonometry",
  syntax: ["acsch(x)"],
  description: "Calculate the hyperbolic arccosecant of a value, defined as `acsch(x) = ln(1/x + sqrt(1/x^2 + 1))`.",
  examples: ["acsch(0.5)"],
  seealso: ["asech", "acoth"]
};
var asecDocs = {
  name: "asec",
  category: "Trigonometry",
  syntax: ["asec(x)"],
  description: "Calculate the inverse secant of a value.",
  examples: ["asec(0.5)", "asec(sec(0.5))", "asec(2)"],
  seealso: ["acos", "acot", "acsc"]
};
var asechDocs = {
  name: "asech",
  category: "Trigonometry",
  syntax: ["asech(x)"],
  description: "Calculate the inverse secant of a value.",
  examples: ["asech(0.5)"],
  seealso: ["acsch", "acoth"]
};
var asinDocs = {
  name: "asin",
  category: "Trigonometry",
  syntax: ["asin(x)"],
  description: "Compute the inverse sine of a value in radians.",
  examples: ["asin(0.5)", "asin(sin(0.5))"],
  seealso: ["sin", "acos", "atan"]
};
var asinhDocs = {
  name: "asinh",
  category: "Trigonometry",
  syntax: ["asinh(x)"],
  description: "Calculate the hyperbolic arcsine of a value, defined as `asinh(x) = ln(x + sqrt(x^2 + 1))`.",
  examples: ["asinh(0.5)"],
  seealso: ["acosh", "atanh"]
};
var atanDocs = {
  name: "atan",
  category: "Trigonometry",
  syntax: ["atan(x)"],
  description: "Compute the inverse tangent of a value in radians.",
  examples: ["atan(0.5)", "atan(tan(0.5))"],
  seealso: ["tan", "acos", "asin"]
};
var atan2Docs = {
  name: "atan2",
  category: "Trigonometry",
  syntax: ["atan2(y, x)"],
  description: "Computes the principal value of the arc tangent of y/x in radians.",
  examples: ["atan2(2, 2) / pi", "angle = 60 deg in rad", "x = cos(angle)", "y = sin(angle)", "atan2(y, x)"],
  seealso: ["sin", "cos", "tan"]
};
var atanhDocs = {
  name: "atanh",
  category: "Trigonometry",
  syntax: ["atanh(x)"],
  description: "Calculate the hyperbolic arctangent of a value, defined as `atanh(x) = ln((1 + x)/(1 - x)) / 2`.",
  examples: ["atanh(0.5)"],
  seealso: ["acosh", "asinh"]
};
var cosDocs = {
  name: "cos",
  category: "Trigonometry",
  syntax: ["cos(x)"],
  description: "Compute the cosine of x in radians.",
  examples: ["cos(2)", "cos(pi / 4) ^ 2", "cos(180 deg)", "cos(60 deg)", "sin(0.2)^2 + cos(0.2)^2"],
  seealso: ["acos", "sin", "tan"]
};
var coshDocs = {
  name: "cosh",
  category: "Trigonometry",
  syntax: ["cosh(x)"],
  description: "Compute the hyperbolic cosine of x in radians.",
  examples: ["cosh(0.5)"],
  seealso: ["sinh", "tanh", "coth"]
};
var cotDocs = {
  name: "cot",
  category: "Trigonometry",
  syntax: ["cot(x)"],
  description: "Compute the cotangent of x in radians. Defined as 1/tan(x)",
  examples: ["cot(2)", "1 / tan(2)"],
  seealso: ["sec", "csc", "tan"]
};
var cothDocs = {
  name: "coth",
  category: "Trigonometry",
  syntax: ["coth(x)"],
  description: "Compute the hyperbolic cotangent of x in radians.",
  examples: ["coth(2)", "1 / tanh(2)"],
  seealso: ["sech", "csch", "tanh"]
};
var cscDocs = {
  name: "csc",
  category: "Trigonometry",
  syntax: ["csc(x)"],
  description: "Compute the cosecant of x in radians. Defined as 1/sin(x)",
  examples: ["csc(2)", "1 / sin(2)"],
  seealso: ["sec", "cot", "sin"]
};
var cschDocs = {
  name: "csch",
  category: "Trigonometry",
  syntax: ["csch(x)"],
  description: "Compute the hyperbolic cosecant of x in radians. Defined as 1/sinh(x)",
  examples: ["csch(2)", "1 / sinh(2)"],
  seealso: ["sech", "coth", "sinh"]
};
var secDocs = {
  name: "sec",
  category: "Trigonometry",
  syntax: ["sec(x)"],
  description: "Compute the secant of x in radians. Defined as 1/cos(x)",
  examples: ["sec(2)", "1 / cos(2)"],
  seealso: ["cot", "csc", "cos"]
};
var sechDocs = {
  name: "sech",
  category: "Trigonometry",
  syntax: ["sech(x)"],
  description: "Compute the hyperbolic secant of x in radians. Defined as 1/cosh(x)",
  examples: ["sech(2)", "1 / cosh(2)"],
  seealso: ["coth", "csch", "cosh"]
};
var sinDocs = {
  name: "sin",
  category: "Trigonometry",
  syntax: ["sin(x)"],
  description: "Compute the sine of x in radians.",
  examples: ["sin(2)", "sin(pi / 4) ^ 2", "sin(90 deg)", "sin(30 deg)", "sin(0.2)^2 + cos(0.2)^2"],
  seealso: ["asin", "cos", "tan"]
};
var sinhDocs = {
  name: "sinh",
  category: "Trigonometry",
  syntax: ["sinh(x)"],
  description: "Compute the hyperbolic sine of x in radians.",
  examples: ["sinh(0.5)"],
  seealso: ["cosh", "tanh"]
};
var tanDocs = {
  name: "tan",
  category: "Trigonometry",
  syntax: ["tan(x)"],
  description: "Compute the tangent of x in radians.",
  examples: ["tan(0.5)", "sin(0.5) / cos(0.5)", "tan(pi / 4)", "tan(45 deg)"],
  seealso: ["atan", "sin", "cos"]
};
var tanhDocs = {
  name: "tanh",
  category: "Trigonometry",
  syntax: ["tanh(x)"],
  description: "Compute the hyperbolic tangent of x in radians.",
  examples: ["tanh(0.5)", "sinh(0.5) / cosh(0.5)"],
  seealso: ["sinh", "cosh"]
};
var toDocs = {
  name: "to",
  category: "Units",
  syntax: ["x to unit", "to(x, unit)"],
  description: "Change the unit of a value.",
  examples: ["5 inch to cm", "3.2kg to g", "16 bytes in bits"],
  seealso: []
};
var binDocs = {
  name: "bin",
  category: "Utils",
  syntax: ["bin(value)"],
  description: "Format a number as binary",
  examples: ["bin(2)"],
  seealso: ["oct", "hex"]
};
var cloneDocs = {
  name: "clone",
  category: "Utils",
  syntax: ["clone(x)"],
  description: "Clone a variable. Creates a copy of primitive variables,and a deep copy of matrices",
  examples: ["clone(3.5)", "clone(2 - 4i)", "clone(45 deg)", "clone([1, 2; 3, 4])", 'clone("hello world")'],
  seealso: []
};
var formatDocs = {
  name: "format",
  category: "Utils",
  syntax: ["format(value)", "format(value, precision)"],
  description: "Format a value of any type as string.",
  examples: ["format(2.3)", "format(3 - 4i)", "format([])", "format(pi, 3)"],
  seealso: ["print"]
};
var hasNumericValueDocs = {
  name: "hasNumericValue",
  category: "Utils",
  syntax: ["hasNumericValue(x)"],
  description: "Test whether a value is an numeric value. In case of a string, true is returned if the string contains a numeric value.",
  examples: ["hasNumericValue(2)", 'hasNumericValue("2")', 'isNumeric("2")', "hasNumericValue(0)", "hasNumericValue(bignumber(500))", "hasNumericValue(fraction(0.125))", "hasNumericValue(2 + 3i)", 'hasNumericValue([2.3, "foo", false])'],
  seealso: ["isInteger", "isZero", "isNegative", "isPositive", "isNaN", "isNumeric"]
};
var hexDocs = {
  name: "hex",
  category: "Utils",
  syntax: ["hex(value)"],
  description: "Format a number as hexadecimal",
  examples: ["hex(240)"],
  seealso: ["bin", "oct"]
};
var isIntegerDocs = {
  name: "isInteger",
  category: "Utils",
  syntax: ["isInteger(x)"],
  description: "Test whether a value is an integer number.",
  examples: ["isInteger(2)", "isInteger(3.5)", "isInteger([3, 0.5, -2])"],
  seealso: ["isNegative", "isNumeric", "isPositive", "isZero"]
};
var isNaNDocs = {
  name: "isNaN",
  category: "Utils",
  syntax: ["isNaN(x)"],
  description: "Test whether a value is NaN (not a number)",
  examples: ["isNaN(2)", "isNaN(0 / 0)", "isNaN(NaN)", "isNaN(Infinity)"],
  seealso: ["isNegative", "isNumeric", "isPositive", "isZero"]
};
var isNegativeDocs = {
  name: "isNegative",
  category: "Utils",
  syntax: ["isNegative(x)"],
  description: "Test whether a value is negative: smaller than zero.",
  examples: ["isNegative(2)", "isNegative(0)", "isNegative(-4)", "isNegative([3, 0.5, -2])"],
  seealso: ["isInteger", "isNumeric", "isPositive", "isZero"]
};
var isNumericDocs = {
  name: "isNumeric",
  category: "Utils",
  syntax: ["isNumeric(x)"],
  description: "Test whether a value is a numeric value. Returns true when the input is a number, BigNumber, Fraction, or boolean.",
  examples: ["isNumeric(2)", 'isNumeric("2")', 'hasNumericValue("2")', "isNumeric(0)", "isNumeric(bignumber(500))", "isNumeric(fraction(0.125))", "isNumeric(2 + 3i)", 'isNumeric([2.3, "foo", false])'],
  seealso: ["isInteger", "isZero", "isNegative", "isPositive", "isNaN", "hasNumericValue"]
};
var isPositiveDocs = {
  name: "isPositive",
  category: "Utils",
  syntax: ["isPositive(x)"],
  description: "Test whether a value is positive: larger than zero.",
  examples: ["isPositive(2)", "isPositive(0)", "isPositive(-4)", "isPositive([3, 0.5, -2])"],
  seealso: ["isInteger", "isNumeric", "isNegative", "isZero"]
};
var isPrimeDocs = {
  name: "isPrime",
  category: "Utils",
  syntax: ["isPrime(x)"],
  description: "Test whether a value is prime: has no divisors other than itself and one.",
  examples: ["isPrime(3)", "isPrime(-2)", "isPrime([2, 17, 100])"],
  seealso: ["isInteger", "isNumeric", "isNegative", "isZero"]
};
var isZeroDocs = {
  name: "isZero",
  category: "Utils",
  syntax: ["isZero(x)"],
  description: "Test whether a value is zero.",
  examples: ["isZero(2)", "isZero(0)", "isZero(-4)", "isZero([3, 0, -2, 0])"],
  seealso: ["isInteger", "isNumeric", "isNegative", "isPositive"]
};
var numericDocs = {
  name: "numeric",
  category: "Utils",
  syntax: ["numeric(x)"],
  description: "Convert a numeric input to a specific numeric type: number, BigNumber, or Fraction.",
  examples: ['numeric("4")', 'numeric("4", "number")', 'numeric("4", "BigNumber")', 'numeric("4", "Fraction")', 'numeric(4, "Fraction")', 'numeric(fraction(2, 5), "number")'],
  seealso: ["number", "fraction", "bignumber", "string", "format"]
};
var octDocs = {
  name: "oct",
  category: "Utils",
  syntax: ["oct(value)"],
  description: "Format a number as octal",
  examples: ["oct(56)"],
  seealso: ["bin", "hex"]
};
var printDocs = {
  name: "print",
  category: "Utils",
  syntax: ["print(template, values)", "print(template, values, precision)"],
  description: "Interpolate values into a string template.",
  examples: ['print("Lucy is $age years old", {age: 5})', 'print("The value of pi is $pi", {pi: pi}, 3)', 'print("Hello, $user.name!", {user: {name: "John"}})', 'print("Values: $1, $2, $3", [6, 9, 4])'],
  seealso: ["format"]
};
var typeOfDocs = {
  name: "typeOf",
  category: "Utils",
  syntax: ["typeOf(x)"],
  description: "Get the type of a variable.",
  examples: ["typeOf(3.5)", "typeOf(2 - 4i)", "typeOf(45 deg)", 'typeOf("hello world")'],
  seealso: ["getMatrixDataType"]
};
var solveODEDocs = {
  name: "solveODE",
  category: "Numeric",
  syntax: ["solveODE(func, tspan, y0)", "solveODE(func, tspan, y0, options)"],
  description: "Numerical Integration of Ordinary Differential Equations.",
  examples: ["f(t,y) = y", "tspan = [0, 4]", "solveODE(f, tspan, 1)", "solveODE(f, tspan, [1, 2])", 'solveODE(f, tspan, 1, { method:"RK23", maxStep:0.1 })'],
  seealso: ["derivative", "simplifyCore"]
};
var embeddedDocs = {
  // construction functions
  bignumber: bignumberDocs,
  boolean: booleanDocs,
  complex: complexDocs,
  createUnit: createUnitDocs,
  fraction: fractionDocs,
  index: indexDocs,
  matrix: matrixDocs,
  number: numberDocs,
  sparse: sparseDocs,
  splitUnit: splitUnitDocs,
  string: stringDocs,
  unit: unitDocs,
  // constants
  e: eDocs,
  E: eDocs,
  false: falseDocs,
  i: iDocs,
  Infinity: InfinityDocs,
  LN2: LN2Docs,
  LN10: LN10Docs,
  LOG2E: LOG2EDocs,
  LOG10E: LOG10EDocs,
  NaN: NaNDocs,
  null: nullDocs,
  pi: piDocs,
  PI: piDocs,
  phi: phiDocs,
  SQRT1_2: SQRT12Docs,
  SQRT2: SQRT2Docs,
  tau: tauDocs,
  true: trueDocs,
  version: versionDocs,
  // physical constants
  // TODO: more detailed docs for physical constants
  speedOfLight: {
    description: "Speed of light in vacuum",
    examples: ["speedOfLight"]
  },
  gravitationConstant: {
    description: "Newtonian constant of gravitation",
    examples: ["gravitationConstant"]
  },
  planckConstant: {
    description: "Planck constant",
    examples: ["planckConstant"]
  },
  reducedPlanckConstant: {
    description: "Reduced Planck constant",
    examples: ["reducedPlanckConstant"]
  },
  magneticConstant: {
    description: "Magnetic constant (vacuum permeability)",
    examples: ["magneticConstant"]
  },
  electricConstant: {
    description: "Electric constant (vacuum permeability)",
    examples: ["electricConstant"]
  },
  vacuumImpedance: {
    description: "Characteristic impedance of vacuum",
    examples: ["vacuumImpedance"]
  },
  coulomb: {
    description: "Coulomb's constant",
    examples: ["coulomb"]
  },
  elementaryCharge: {
    description: "Elementary charge",
    examples: ["elementaryCharge"]
  },
  bohrMagneton: {
    description: "Borh magneton",
    examples: ["bohrMagneton"]
  },
  conductanceQuantum: {
    description: "Conductance quantum",
    examples: ["conductanceQuantum"]
  },
  inverseConductanceQuantum: {
    description: "Inverse conductance quantum",
    examples: ["inverseConductanceQuantum"]
  },
  // josephson: {description: 'Josephson constant', examples: ['josephson']},
  magneticFluxQuantum: {
    description: "Magnetic flux quantum",
    examples: ["magneticFluxQuantum"]
  },
  nuclearMagneton: {
    description: "Nuclear magneton",
    examples: ["nuclearMagneton"]
  },
  klitzing: {
    description: "Von Klitzing constant",
    examples: ["klitzing"]
  },
  bohrRadius: {
    description: "Borh radius",
    examples: ["bohrRadius"]
  },
  classicalElectronRadius: {
    description: "Classical electron radius",
    examples: ["classicalElectronRadius"]
  },
  electronMass: {
    description: "Electron mass",
    examples: ["electronMass"]
  },
  fermiCoupling: {
    description: "Fermi coupling constant",
    examples: ["fermiCoupling"]
  },
  fineStructure: {
    description: "Fine-structure constant",
    examples: ["fineStructure"]
  },
  hartreeEnergy: {
    description: "Hartree energy",
    examples: ["hartreeEnergy"]
  },
  protonMass: {
    description: "Proton mass",
    examples: ["protonMass"]
  },
  deuteronMass: {
    description: "Deuteron Mass",
    examples: ["deuteronMass"]
  },
  neutronMass: {
    description: "Neutron mass",
    examples: ["neutronMass"]
  },
  quantumOfCirculation: {
    description: "Quantum of circulation",
    examples: ["quantumOfCirculation"]
  },
  rydberg: {
    description: "Rydberg constant",
    examples: ["rydberg"]
  },
  thomsonCrossSection: {
    description: "Thomson cross section",
    examples: ["thomsonCrossSection"]
  },
  weakMixingAngle: {
    description: "Weak mixing angle",
    examples: ["weakMixingAngle"]
  },
  efimovFactor: {
    description: "Efimov factor",
    examples: ["efimovFactor"]
  },
  atomicMass: {
    description: "Atomic mass constant",
    examples: ["atomicMass"]
  },
  avogadro: {
    description: "Avogadro's number",
    examples: ["avogadro"]
  },
  boltzmann: {
    description: "Boltzmann constant",
    examples: ["boltzmann"]
  },
  faraday: {
    description: "Faraday constant",
    examples: ["faraday"]
  },
  firstRadiation: {
    description: "First radiation constant",
    examples: ["firstRadiation"]
  },
  loschmidt: {
    description: "Loschmidt constant at T=273.15 K and p=101.325 kPa",
    examples: ["loschmidt"]
  },
  gasConstant: {
    description: "Gas constant",
    examples: ["gasConstant"]
  },
  molarPlanckConstant: {
    description: "Molar Planck constant",
    examples: ["molarPlanckConstant"]
  },
  molarVolume: {
    description: "Molar volume of an ideal gas at T=273.15 K and p=101.325 kPa",
    examples: ["molarVolume"]
  },
  sackurTetrode: {
    description: "Sackur-Tetrode constant at T=1 K and p=101.325 kPa",
    examples: ["sackurTetrode"]
  },
  secondRadiation: {
    description: "Second radiation constant",
    examples: ["secondRadiation"]
  },
  stefanBoltzmann: {
    description: "Stefan-Boltzmann constant",
    examples: ["stefanBoltzmann"]
  },
  wienDisplacement: {
    description: "Wien displacement law constant",
    examples: ["wienDisplacement"]
  },
  // spectralRadiance: {description: 'First radiation constant for spectral radiance', examples: ['spectralRadiance']},
  molarMass: {
    description: "Molar mass constant",
    examples: ["molarMass"]
  },
  molarMassC12: {
    description: "Molar mass constant of carbon-12",
    examples: ["molarMassC12"]
  },
  gravity: {
    description: "Standard acceleration of gravity (standard acceleration of free-fall on Earth)",
    examples: ["gravity"]
  },
  planckLength: {
    description: "Planck length",
    examples: ["planckLength"]
  },
  planckMass: {
    description: "Planck mass",
    examples: ["planckMass"]
  },
  planckTime: {
    description: "Planck time",
    examples: ["planckTime"]
  },
  planckCharge: {
    description: "Planck charge",
    examples: ["planckCharge"]
  },
  planckTemperature: {
    description: "Planck temperature",
    examples: ["planckTemperature"]
  },
  // functions - algebra
  derivative: derivativeDocs,
  lsolve: lsolveDocs,
  lsolveAll: lsolveAllDocs,
  lup: lupDocs,
  lusolve: lusolveDocs,
  leafCount: leafCountDocs,
  polynomialRoot: polynomialRootDocs,
  resolve: resolveDocs,
  simplify: simplifyDocs,
  simplifyConstant: simplifyConstantDocs,
  simplifyCore: simplifyCoreDocs,
  symbolicEqual: symbolicEqualDocs,
  rationalize: rationalizeDocs,
  slu: sluDocs,
  usolve: usolveDocs,
  usolveAll: usolveAllDocs,
  qr: qrDocs,
  // functions - arithmetic
  abs: absDocs,
  add: addDocs,
  cbrt: cbrtDocs,
  ceil: ceilDocs,
  cube: cubeDocs,
  divide: divideDocs,
  dotDivide: dotDivideDocs,
  dotMultiply: dotMultiplyDocs,
  dotPow: dotPowDocs,
  exp: expDocs,
  expm: expmDocs,
  expm1: expm1Docs,
  fix: fixDocs,
  floor: floorDocs,
  gcd: gcdDocs,
  hypot: hypotDocs,
  lcm: lcmDocs,
  log: logDocs,
  log2: log2Docs,
  log1p: log1pDocs,
  log10: log10Docs,
  mod: modDocs,
  multiply: multiplyDocs,
  norm: normDocs,
  nthRoot: nthRootDocs,
  nthRoots: nthRootsDocs,
  pow: powDocs,
  round: roundDocs,
  sign: signDocs,
  sqrt: sqrtDocs,
  sqrtm: sqrtmDocs,
  square: squareDocs,
  subtract: subtractDocs,
  unaryMinus: unaryMinusDocs,
  unaryPlus: unaryPlusDocs,
  xgcd: xgcdDocs,
  invmod: invmodDocs,
  // functions - bitwise
  bitAnd: bitAndDocs,
  bitNot: bitNotDocs,
  bitOr: bitOrDocs,
  bitXor: bitXorDocs,
  leftShift: leftShiftDocs,
  rightArithShift: rightArithShiftDocs,
  rightLogShift: rightLogShiftDocs,
  // functions - combinatorics
  bellNumbers: bellNumbersDocs,
  catalan: catalanDocs,
  composition: compositionDocs,
  stirlingS2: stirlingS2Docs,
  // functions - core
  config: configDocs,
  import: importDocs,
  typed: typedDocs,
  // functions - complex
  arg: argDocs,
  conj: conjDocs,
  re: reDocs,
  im: imDocs,
  // functions - expression
  evaluate: evaluateDocs,
  help: helpDocs,
  // functions - geometry
  distance: distanceDocs,
  intersect: intersectDocs,
  // functions - logical
  and: andDocs,
  not: notDocs,
  or: orDocs,
  xor: xorDocs,
  // functions - matrix
  concat: concatDocs,
  count: countDocs,
  cross: crossDocs,
  column: columnDocs,
  ctranspose: ctransposeDocs,
  det: detDocs,
  diag: diagDocs,
  diff: diffDocs,
  dot: dotDocs,
  getMatrixDataType: getMatrixDataTypeDocs,
  identity: identityDocs,
  filter: filterDocs,
  flatten: flattenDocs,
  forEach: forEachDocs,
  inv: invDocs,
  pinv: pinvDocs,
  eigs: eigsDocs,
  kron: kronDocs,
  matrixFromFunction: matrixFromFunctionDocs,
  matrixFromRows: matrixFromRowsDocs,
  matrixFromColumns: matrixFromColumnsDocs,
  map: mapDocs,
  ones: onesDocs,
  partitionSelect: partitionSelectDocs,
  range: rangeDocs,
  resize: resizeDocs,
  reshape: reshapeDocs,
  rotate: rotateDocs,
  rotationMatrix: rotationMatrixDocs,
  row: rowDocs,
  size: sizeDocs,
  sort: sortDocs,
  squeeze: squeezeDocs,
  subset: subsetDocs,
  trace: traceDocs,
  transpose: transposeDocs,
  zeros: zerosDocs,
  fft: fftDocs,
  ifft: ifftDocs,
  sylvester: sylvesterDocs,
  schur: schurDocs,
  lyap: lyapDocs,
  // functions - numeric
  solveODE: solveODEDocs,
  // functions - probability
  combinations: combinationsDocs,
  combinationsWithRep: combinationsWithRepDocs,
  // distribution: distributionDocs,
  factorial: factorialDocs,
  gamma: gammaDocs,
  kldivergence: kldivergenceDocs,
  lgamma: lgammaDocs,
  multinomial: multinomialDocs,
  permutations: permutationsDocs,
  pickRandom: pickRandomDocs,
  random: randomDocs,
  randomInt: randomIntDocs,
  // functions - relational
  compare: compareDocs,
  compareNatural: compareNaturalDocs,
  compareText: compareTextDocs,
  deepEqual: deepEqualDocs,
  equal: equalDocs,
  equalText: equalTextDocs,
  larger: largerDocs,
  largerEq: largerEqDocs,
  smaller: smallerDocs,
  smallerEq: smallerEqDocs,
  unequal: unequalDocs,
  // functions - set
  setCartesian: setCartesianDocs,
  setDifference: setDifferenceDocs,
  setDistinct: setDistinctDocs,
  setIntersect: setIntersectDocs,
  setIsSubset: setIsSubsetDocs,
  setMultiplicity: setMultiplicityDocs,
  setPowerset: setPowersetDocs,
  setSize: setSizeDocs,
  setSymDifference: setSymDifferenceDocs,
  setUnion: setUnionDocs,
  // functions - signal
  zpk2tf: zpk2tfDocs,
  freqz: freqzDocs,
  // functions - special
  erf: erfDocs,
  zeta: zetaDocs,
  // functions - statistics
  cumsum: cumSumDocs,
  mad: madDocs,
  max: maxDocs,
  mean: meanDocs,
  median: medianDocs,
  min: minDocs,
  mode: modeDocs,
  prod: prodDocs,
  quantileSeq: quantileSeqDocs,
  std: stdDocs,
  sum: sumDocs,
  variance: varianceDocs,
  corr: corrDocs,
  // functions - trigonometry
  acos: acosDocs,
  acosh: acoshDocs,
  acot: acotDocs,
  acoth: acothDocs,
  acsc: acscDocs,
  acsch: acschDocs,
  asec: asecDocs,
  asech: asechDocs,
  asin: asinDocs,
  asinh: asinhDocs,
  atan: atanDocs,
  atanh: atanhDocs,
  atan2: atan2Docs,
  cos: cosDocs,
  cosh: coshDocs,
  cot: cotDocs,
  coth: cothDocs,
  csc: cscDocs,
  csch: cschDocs,
  sec: secDocs,
  sech: sechDocs,
  sin: sinDocs,
  sinh: sinhDocs,
  tan: tanDocs,
  tanh: tanhDocs,
  // functions - units
  to: toDocs,
  // functions - utils
  clone: cloneDocs,
  format: formatDocs,
  bin: binDocs,
  oct: octDocs,
  hex: hexDocs,
  isNaN: isNaNDocs,
  isInteger: isIntegerDocs,
  isNegative: isNegativeDocs,
  isNumeric: isNumericDocs,
  hasNumericValue: hasNumericValueDocs,
  isPositive: isPositiveDocs,
  isPrime: isPrimeDocs,
  isZero: isZeroDocs,
  print: printDocs,
  typeOf: typeOfDocs,
  numeric: numericDocs
};
var name$z = "help";
var dependencies$z = ["typed", "mathWithTransform", "Help"];
var createHelp = /* @__PURE__ */ factory(name$z, dependencies$z, (_ref) => {
  var {
    typed: typed2,
    mathWithTransform: mathWithTransform2,
    Help: Help2
  } = _ref;
  return typed2(name$z, {
    any: function any(search) {
      var prop;
      var searchName = search;
      if (typeof search !== "string") {
        for (prop in mathWithTransform2) {
          if (hasOwnProperty(mathWithTransform2, prop) && search === mathWithTransform2[prop]) {
            searchName = prop;
            break;
          }
        }
      }
      var doc = getSafeProperty(embeddedDocs, searchName);
      if (!doc) {
        var searchText = typeof searchName === "function" ? searchName.name : searchName;
        throw new Error('No documentation found on "' + searchText + '"');
      }
      return new Help2(doc);
    }
  });
});
var name$y = "chain";
var dependencies$y = ["typed", "Chain"];
var createChain = /* @__PURE__ */ factory(name$y, dependencies$y, (_ref) => {
  var {
    typed: typed2,
    Chain: Chain2
  } = _ref;
  return typed2(name$y, {
    "": function _() {
      return new Chain2();
    },
    any: function any(value) {
      return new Chain2(value);
    }
  });
});
var name$x = "leafCount";
var dependencies$x = ["parse", "typed"];
var createLeafCount = /* @__PURE__ */ factory(name$x, dependencies$x, (_ref) => {
  var {
    parse: parse2,
    typed: typed2
  } = _ref;
  function countLeaves(node) {
    var count2 = 0;
    node.forEach((n) => {
      count2 += countLeaves(n);
    });
    return count2 || 1;
  }
  return typed2(name$x, {
    Node: function Node2(expr) {
      return countLeaves(expr);
    }
  });
});
function isNumericNode(x) {
  return isConstantNode(x) || isOperatorNode(x) && x.isUnary() && isConstantNode(x.args[0]);
}
function isConstantExpression(x) {
  if (isConstantNode(x)) {
    return true;
  }
  if ((isFunctionNode(x) || isOperatorNode(x)) && x.args.every(isConstantExpression)) {
    return true;
  }
  if (isParenthesisNode(x) && isConstantExpression(x.content)) {
    return true;
  }
  return false;
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
var name$w = "simplifyUtil";
var dependencies$w = ["FunctionNode", "OperatorNode", "SymbolNode"];
var createUtil = /* @__PURE__ */ factory(name$w, dependencies$w, (_ref) => {
  var {
    FunctionNode: FunctionNode2,
    OperatorNode: OperatorNode2,
    SymbolNode: SymbolNode2
  } = _ref;
  var T = true;
  var F2 = false;
  var defaultName = "defaultF";
  var defaultContext = {
    /*      */
    add: {
      trivial: T,
      total: T,
      commutative: T,
      associative: T
    },
    /**/
    unaryPlus: {
      trivial: T,
      total: T,
      commutative: T,
      associative: T
    },
    /* */
    subtract: {
      trivial: F2,
      total: T,
      commutative: F2,
      associative: F2
    },
    /* */
    multiply: {
      trivial: T,
      total: T,
      commutative: T,
      associative: T
    },
    /*   */
    divide: {
      trivial: F2,
      total: T,
      commutative: F2,
      associative: F2
    },
    /*    */
    paren: {
      trivial: T,
      total: T,
      commutative: T,
      associative: F2
    },
    /* */
    defaultF: {
      trivial: F2,
      total: T,
      commutative: F2,
      associative: F2
    }
  };
  var realContext = {
    divide: {
      total: F2
    },
    log: {
      total: F2
    }
  };
  var positiveContext = {
    subtract: {
      total: F2
    },
    abs: {
      trivial: T
    },
    log: {
      total: T
    }
  };
  function hasProperty(nodeOrName, property) {
    var context = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultContext;
    var name2 = defaultName;
    if (typeof nodeOrName === "string") {
      name2 = nodeOrName;
    } else if (isOperatorNode(nodeOrName)) {
      name2 = nodeOrName.fn.toString();
    } else if (isFunctionNode(nodeOrName)) {
      name2 = nodeOrName.name;
    } else if (isParenthesisNode(nodeOrName)) {
      name2 = "paren";
    }
    if (hasOwnProperty(context, name2)) {
      var properties2 = context[name2];
      if (hasOwnProperty(properties2, property)) {
        return properties2[property];
      }
      if (hasOwnProperty(defaultContext, name2)) {
        return defaultContext[name2][property];
      }
    }
    if (hasOwnProperty(context, defaultName)) {
      var _properties = context[defaultName];
      if (hasOwnProperty(_properties, property)) {
        return _properties[property];
      }
      return defaultContext[defaultName][property];
    }
    if (hasOwnProperty(defaultContext, name2)) {
      var _properties2 = defaultContext[name2];
      if (hasOwnProperty(_properties2, property)) {
        return _properties2[property];
      }
    }
    return defaultContext[defaultName][property];
  }
  function isCommutative(node) {
    var context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultContext;
    return hasProperty(node, "commutative", context);
  }
  function isAssociative(node) {
    var context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultContext;
    return hasProperty(node, "associative", context);
  }
  function mergeContext(primary, secondary) {
    var merged = _objectSpread({}, primary);
    for (var prop in secondary) {
      if (hasOwnProperty(primary, prop)) {
        merged[prop] = _objectSpread(_objectSpread({}, secondary[prop]), primary[prop]);
      } else {
        merged[prop] = secondary[prop];
      }
    }
    return merged;
  }
  function flatten2(node, context) {
    if (!node.args || node.args.length === 0) {
      return node;
    }
    node.args = allChildren(node, context);
    for (var i2 = 0; i2 < node.args.length; i2++) {
      flatten2(node.args[i2], context);
    }
  }
  function allChildren(node, context) {
    var op;
    var children = [];
    var findChildren = function findChildren2(node2) {
      for (var i2 = 0; i2 < node2.args.length; i2++) {
        var child = node2.args[i2];
        if (isOperatorNode(child) && op === child.op) {
          findChildren2(child);
        } else {
          children.push(child);
        }
      }
    };
    if (isAssociative(node, context)) {
      op = node.op;
      findChildren(node);
      return children;
    } else {
      return node.args;
    }
  }
  function unflattenr(node, context) {
    if (!node.args || node.args.length === 0) {
      return;
    }
    var makeNode = createMakeNodeFunction(node);
    var l = node.args.length;
    for (var i2 = 0; i2 < l; i2++) {
      unflattenr(node.args[i2], context);
    }
    if (l > 2 && isAssociative(node, context)) {
      var curnode = node.args.pop();
      while (node.args.length > 0) {
        curnode = makeNode([node.args.pop(), curnode]);
      }
      node.args = curnode.args;
    }
  }
  function unflattenl(node, context) {
    if (!node.args || node.args.length === 0) {
      return;
    }
    var makeNode = createMakeNodeFunction(node);
    var l = node.args.length;
    for (var i2 = 0; i2 < l; i2++) {
      unflattenl(node.args[i2], context);
    }
    if (l > 2 && isAssociative(node, context)) {
      var curnode = node.args.shift();
      while (node.args.length > 0) {
        curnode = makeNode([curnode, node.args.shift()]);
      }
      node.args = curnode.args;
    }
  }
  function createMakeNodeFunction(node) {
    if (isOperatorNode(node)) {
      return function(args) {
        try {
          return new OperatorNode2(node.op, node.fn, args, node.implicit);
        } catch (err) {
          console.error(err);
          return [];
        }
      };
    } else {
      return function(args) {
        return new FunctionNode2(new SymbolNode2(node.name), args);
      };
    }
  }
  return {
    createMakeNodeFunction,
    hasProperty,
    isCommutative,
    isAssociative,
    mergeContext,
    flatten: flatten2,
    allChildren,
    unflattenr,
    unflattenl,
    defaultContext,
    realContext,
    positiveContext
  };
});
var name$v = "simplify";
var dependencies$v = ["config", "typed", "parse", "add", "subtract", "multiply", "divide", "pow", "isZero", "equal", "resolve", "simplifyConstant", "simplifyCore", "?fraction", "?bignumber", "mathWithTransform", "matrix", "AccessorNode", "ArrayNode", "ConstantNode", "FunctionNode", "IndexNode", "ObjectNode", "OperatorNode", "ParenthesisNode", "SymbolNode"];
var createSimplify = /* @__PURE__ */ factory(name$v, dependencies$v, (_ref) => {
  var {
    config: config2,
    typed: typed2,
    parse: parse2,
    add: add2,
    subtract: subtract2,
    multiply: multiply2,
    divide: divide2,
    pow: pow2,
    isZero: isZero2,
    equal: equal2,
    resolve: resolve2,
    simplifyConstant: simplifyConstant2,
    simplifyCore: simplifyCore2,
    fraction: fraction2,
    bignumber: bignumber2,
    mathWithTransform: mathWithTransform2,
    matrix: matrix2,
    AccessorNode: AccessorNode2,
    ArrayNode: ArrayNode2,
    ConstantNode: ConstantNode2,
    FunctionNode: FunctionNode2,
    IndexNode: IndexNode2,
    ObjectNode: ObjectNode2,
    OperatorNode: OperatorNode2,
    ParenthesisNode: ParenthesisNode2,
    SymbolNode: SymbolNode2
  } = _ref;
  var {
    hasProperty,
    isCommutative,
    isAssociative,
    mergeContext,
    flatten: flatten2,
    unflattenr,
    unflattenl,
    createMakeNodeFunction,
    defaultContext,
    realContext,
    positiveContext
  } = createUtil({
    FunctionNode: FunctionNode2,
    OperatorNode: OperatorNode2,
    SymbolNode: SymbolNode2
  });
  typed2.addConversion({
    from: "Object",
    to: "Map",
    convert: createMap
  });
  var simplify2 = typed2("simplify", {
    Node: _simplify,
    "Node, Map": (expr, scope) => _simplify(expr, false, scope),
    "Node, Map, Object": (expr, scope, options) => _simplify(expr, false, scope, options),
    "Node, Array": _simplify,
    "Node, Array, Map": _simplify,
    "Node, Array, Map, Object": _simplify
  });
  typed2.removeConversion({
    from: "Object",
    to: "Map",
    convert: createMap
  });
  simplify2.defaultContext = defaultContext;
  simplify2.realContext = realContext;
  simplify2.positiveContext = positiveContext;
  function removeParens(node) {
    return node.transform(function(node2, path, parent) {
      return isParenthesisNode(node2) ? removeParens(node2.content) : node2;
    });
  }
  var SUPPORTED_CONSTANTS = {
    true: true,
    false: true,
    e: true,
    i: true,
    Infinity: true,
    LN2: true,
    LN10: true,
    LOG2E: true,
    LOG10E: true,
    NaN: true,
    phi: true,
    pi: true,
    SQRT1_2: true,
    SQRT2: true,
    tau: true
    // null: false,
    // undefined: false,
    // version: false,
  };
  simplify2.rules = [
    simplifyCore2,
    // { l: 'n+0', r: 'n' },     // simplifyCore
    // { l: 'n^0', r: '1' },     // simplifyCore
    // { l: '0*n', r: '0' },     // simplifyCore
    // { l: 'n/n', r: '1'},      // simplifyCore
    // { l: 'n^1', r: 'n' },     // simplifyCore
    // { l: '+n1', r:'n1' },     // simplifyCore
    // { l: 'n--n1', r:'n+n1' }, // simplifyCore
    {
      l: "log(e)",
      r: "1"
    },
    // temporary rules
    // Note initially we tend constants to the right because like-term
    // collection prefers the left, and we would rather collect nonconstants
    {
      s: "n-n1 -> n+-n1",
      // temporarily replace 'subtract' so we can further flatten the 'add' operator
      assuming: {
        subtract: {
          total: true
        }
      }
    },
    {
      s: "n-n -> 0",
      // partial alternative when we can't always subtract
      assuming: {
        subtract: {
          total: false
        }
      }
    },
    {
      s: "-(cl*v) -> v * (-cl)",
      // make non-constant terms positive
      assuming: {
        multiply: {
          commutative: true
        },
        subtract: {
          total: true
        }
      }
    },
    {
      s: "-(cl*v) -> (-cl) * v",
      // non-commutative version, part 1
      assuming: {
        multiply: {
          commutative: false
        },
        subtract: {
          total: true
        }
      }
    },
    {
      s: "-(v*cl) -> v * (-cl)",
      // non-commutative version, part 2
      assuming: {
        multiply: {
          commutative: false
        },
        subtract: {
          total: true
        }
      }
    },
    {
      l: "-(n1/n2)",
      r: "-n1/n2"
    },
    {
      l: "-v",
      r: "v * (-1)"
    },
    // finish making non-constant terms positive
    {
      l: "(n1 + n2)*(-1)",
      r: "n1*(-1) + n2*(-1)",
      repeat: true
    },
    // expand negations to achieve as much sign cancellation as possible
    {
      l: "n/n1^n2",
      r: "n*n1^-n2"
    },
    // temporarily replace 'divide' so we can further flatten the 'multiply' operator
    {
      l: "n/n1",
      r: "n*n1^-1"
    },
    {
      s: "(n1*n2)^n3 -> n1^n3 * n2^n3",
      assuming: {
        multiply: {
          commutative: true
        }
      }
    },
    {
      s: "(n1*n2)^(-1) -> n2^(-1) * n1^(-1)",
      assuming: {
        multiply: {
          commutative: false
        }
      }
    },
    // expand nested exponentiation
    {
      s: "(n ^ n1) ^ n2 -> n ^ (n1 * n2)",
      assuming: {
        divide: {
          total: true
        }
      }
      // 1/(1/n) = n needs 1/n to exist
    },
    // collect like factors; into a sum, only do this for nonconstants
    {
      l: " vd   * ( vd   * n1 + n2)",
      r: "vd^2       * n1 +  vd   * n2"
    },
    {
      s: " vd   * (vd^n4 * n1 + n2)   ->  vd^(1+n4)  * n1 +  vd   * n2",
      assuming: {
        divide: {
          total: true
        }
      }
      // v*1/v = v^(1+-1) needs 1/v
    },
    {
      s: "vd^n3 * ( vd   * n1 + n2)   ->  vd^(n3+1)  * n1 + vd^n3 * n2",
      assuming: {
        divide: {
          total: true
        }
      }
    },
    {
      s: "vd^n3 * (vd^n4 * n1 + n2)   ->  vd^(n3+n4) * n1 + vd^n3 * n2",
      assuming: {
        divide: {
          total: true
        }
      }
    },
    {
      l: "n*n",
      r: "n^2"
    },
    {
      s: "n * n^n1 -> n^(n1+1)",
      assuming: {
        divide: {
          total: true
        }
      }
      // n*1/n = n^(-1+1) needs 1/n
    },
    {
      s: "n^n1 * n^n2 -> n^(n1+n2)",
      assuming: {
        divide: {
          total: true
        }
      }
      // ditto for n^2*1/n^2
    },
    // Unfortunately, to deal with more complicated cancellations, it
    // becomes necessary to simplify constants twice per pass. It's not
    // terribly expensive compared to matching rules, so this should not
    // pose a performance problem.
    simplifyConstant2,
    // First: before collecting like terms
    // collect like terms
    {
      s: "n+n -> 2*n",
      assuming: {
        add: {
          total: true
        }
      }
      // 2 = 1 + 1 needs to exist
    },
    {
      l: "n+-n",
      r: "0"
    },
    {
      l: "vd*n + vd",
      r: "vd*(n+1)"
    },
    // NOTE: leftmost position is special:
    {
      l: "n3*n1 + n3*n2",
      r: "n3*(n1+n2)"
    },
    // All sub-monomials tried there.
    {
      l: "n3^(-n4)*n1 +   n3  * n2",
      r: "n3^(-n4)*(n1 + n3^(n4+1) *n2)"
    },
    {
      l: "n3^(-n4)*n1 + n3^n5 * n2",
      r: "n3^(-n4)*(n1 + n3^(n4+n5)*n2)"
    },
    // noncommutative additional cases (term collection & factoring)
    {
      s: "n*vd + vd -> (n+1)*vd",
      assuming: {
        multiply: {
          commutative: false
        }
      }
    },
    {
      s: "vd + n*vd -> (1+n)*vd",
      assuming: {
        multiply: {
          commutative: false
        }
      }
    },
    {
      s: "n1*n3 + n2*n3 -> (n1+n2)*n3",
      assuming: {
        multiply: {
          commutative: false
        }
      }
    },
    {
      s: "n^n1 * n -> n^(n1+1)",
      assuming: {
        divide: {
          total: true
        },
        multiply: {
          commutative: false
        }
      }
    },
    {
      s: "n1*n3^(-n4) + n2 * n3    -> (n1 + n2*n3^(n4 +  1))*n3^(-n4)",
      assuming: {
        multiply: {
          commutative: false
        }
      }
    },
    {
      s: "n1*n3^(-n4) + n2 * n3^n5 -> (n1 + n2*n3^(n4 + n5))*n3^(-n4)",
      assuming: {
        multiply: {
          commutative: false
        }
      }
    },
    {
      l: "n*cd + cd",
      r: "(n+1)*cd"
    },
    {
      s: "cd*n + cd -> cd*(n+1)",
      assuming: {
        multiply: {
          commutative: false
        }
      }
    },
    {
      s: "cd + cd*n -> cd*(1+n)",
      assuming: {
        multiply: {
          commutative: false
        }
      }
    },
    simplifyConstant2,
    // Second: before returning expressions to "standard form"
    // make factors positive (and undo 'make non-constant terms positive')
    {
      s: "(-n)*n1 -> -(n*n1)",
      assuming: {
        subtract: {
          total: true
        }
      }
    },
    {
      s: "n1*(-n) -> -(n1*n)",
      // in case * non-commutative
      assuming: {
        subtract: {
          total: true
        },
        multiply: {
          commutative: false
        }
      }
    },
    // final ordering of constants
    {
      s: "ce+ve -> ve+ce",
      assuming: {
        add: {
          commutative: true
        }
      },
      imposeContext: {
        add: {
          commutative: false
        }
      }
    },
    {
      s: "vd*cd -> cd*vd",
      assuming: {
        multiply: {
          commutative: true
        }
      },
      imposeContext: {
        multiply: {
          commutative: false
        }
      }
    },
    // undo temporary rules
    // { l: '(-1) * n', r: '-n' }, // #811 added test which proved this is redundant
    {
      l: "n+-n1",
      r: "n-n1"
    },
    // undo replace 'subtract'
    {
      l: "n+-(n1)",
      r: "n-(n1)"
    },
    {
      s: "n*(n1^-1) -> n/n1",
      // undo replace 'divide'; for * commutative
      assuming: {
        multiply: {
          commutative: true
        }
      }
      // o.w. / not conventional
    },
    {
      s: "n*n1^-n2 -> n/n1^n2",
      assuming: {
        multiply: {
          commutative: true
        }
      }
      // o.w. / not conventional
    },
    {
      s: "n^-1 -> 1/n",
      assuming: {
        multiply: {
          commutative: true
        }
      }
      // o.w. / not conventional
    },
    {
      l: "n^1",
      r: "n"
    },
    // can be produced by power cancellation
    {
      s: "n*(n1/n2) -> (n*n1)/n2",
      // '*' before '/'
      assuming: {
        multiply: {
          associative: true
        }
      }
    },
    {
      s: "n-(n1+n2) -> n-n1-n2",
      // '-' before '+'
      assuming: {
        addition: {
          associative: true,
          commutative: true
        }
      }
    },
    // { l: '(n1/n2)/n3', r: 'n1/(n2*n3)' },
    // { l: '(n*n1)/(n*n2)', r: 'n1/n2' },
    // simplifyConstant can leave an extra factor of 1, which can always
    // be eliminated, since the identity always commutes
    {
      l: "1*n",
      r: "n",
      imposeContext: {
        multiply: {
          commutative: true
        }
      }
    },
    {
      s: "n1/(n2/n3) -> (n1*n3)/n2",
      assuming: {
        multiply: {
          associative: true
        }
      }
    },
    {
      l: "n1/(-n2)",
      r: "-n1/n2"
    }
  ];
  function _canonicalizeRule(ruleObject, context) {
    var newRule = {};
    if (ruleObject.s) {
      var lr = ruleObject.s.split("->");
      if (lr.length === 2) {
        newRule.l = lr[0];
        newRule.r = lr[1];
      } else {
        throw SyntaxError("Could not parse rule: " + ruleObject.s);
      }
    } else {
      newRule.l = ruleObject.l;
      newRule.r = ruleObject.r;
    }
    newRule.l = removeParens(parse2(newRule.l));
    newRule.r = removeParens(parse2(newRule.r));
    for (var prop of ["imposeContext", "repeat", "assuming"]) {
      if (prop in ruleObject) {
        newRule[prop] = ruleObject[prop];
      }
    }
    if (ruleObject.evaluate) {
      newRule.evaluate = parse2(ruleObject.evaluate);
    }
    if (isAssociative(newRule.l, context)) {
      var nonCommutative = !isCommutative(newRule.l, context);
      var leftExpandsym;
      if (nonCommutative)
        leftExpandsym = _getExpandPlaceholderSymbol();
      var makeNode = createMakeNodeFunction(newRule.l);
      var expandsym = _getExpandPlaceholderSymbol();
      newRule.expanded = {};
      newRule.expanded.l = makeNode([newRule.l, expandsym]);
      flatten2(newRule.expanded.l, context);
      unflattenr(newRule.expanded.l, context);
      newRule.expanded.r = makeNode([newRule.r, expandsym]);
      if (nonCommutative) {
        newRule.expandedNC1 = {};
        newRule.expandedNC1.l = makeNode([leftExpandsym, newRule.l]);
        newRule.expandedNC1.r = makeNode([leftExpandsym, newRule.r]);
        newRule.expandedNC2 = {};
        newRule.expandedNC2.l = makeNode([leftExpandsym, newRule.expanded.l]);
        newRule.expandedNC2.r = makeNode([leftExpandsym, newRule.expanded.r]);
      }
    }
    return newRule;
  }
  function _buildRules(rules, context) {
    var ruleSet = [];
    for (var i2 = 0; i2 < rules.length; i2++) {
      var rule = rules[i2];
      var newRule = void 0;
      var ruleType = typeof rule;
      switch (ruleType) {
        case "string":
          rule = {
            s: rule
          };
        case "object":
          newRule = _canonicalizeRule(rule, context);
          break;
        case "function":
          newRule = rule;
          break;
        default:
          throw TypeError("Unsupported type of rule: " + ruleType);
      }
      ruleSet.push(newRule);
    }
    return ruleSet;
  }
  var _lastsym = 0;
  function _getExpandPlaceholderSymbol() {
    return new SymbolNode2("_p" + _lastsym++);
  }
  function _simplify(expr, rules) {
    var scope = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : createEmptyMap();
    var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    var debug = options.consoleDebug;
    rules = _buildRules(rules || simplify2.rules, options.context);
    var res = resolve2(expr, scope);
    res = removeParens(res);
    var visited = {};
    var str = res.toString({
      parenthesis: "all"
    });
    while (!visited[str]) {
      visited[str] = true;
      _lastsym = 0;
      var laststr = str;
      if (debug)
        console.log("Working on: ", str);
      for (var i2 = 0; i2 < rules.length; i2++) {
        var rulestr = "";
        if (typeof rules[i2] === "function") {
          res = rules[i2](res, options);
          if (debug)
            rulestr = rules[i2].name;
        } else {
          flatten2(res, options.context);
          res = applyRule(res, rules[i2], options.context);
          if (debug) {
            rulestr = "".concat(rules[i2].l.toString(), " -> ").concat(rules[i2].r.toString());
          }
        }
        if (debug) {
          var newstr = res.toString({
            parenthesis: "all"
          });
          if (newstr !== laststr) {
            console.log("Applying", rulestr, "produced", newstr);
            laststr = newstr;
          }
        }
        unflattenl(res, options.context);
      }
      str = res.toString({
        parenthesis: "all"
      });
    }
    return res;
  }
  function mapRule(nodes2, rule, context) {
    var resNodes = nodes2;
    if (nodes2) {
      for (var i2 = 0; i2 < nodes2.length; ++i2) {
        var newNode = applyRule(nodes2[i2], rule, context);
        if (newNode !== nodes2[i2]) {
          if (resNodes === nodes2) {
            resNodes = nodes2.slice();
          }
          resNodes[i2] = newNode;
        }
      }
    }
    return resNodes;
  }
  function applyRule(node, rule, context) {
    if (rule.assuming) {
      for (var symbol in rule.assuming) {
        for (var property in rule.assuming[symbol]) {
          if (hasProperty(symbol, property, context) !== rule.assuming[symbol][property]) {
            return node;
          }
        }
      }
    }
    var mergedContext = mergeContext(rule.imposeContext, context);
    var res = node;
    if (res instanceof OperatorNode2 || res instanceof FunctionNode2) {
      var newArgs = mapRule(res.args, rule, context);
      if (newArgs !== res.args) {
        res = res.clone();
        res.args = newArgs;
      }
    } else if (res instanceof ParenthesisNode2) {
      if (res.content) {
        var newContent = applyRule(res.content, rule, context);
        if (newContent !== res.content) {
          res = new ParenthesisNode2(newContent);
        }
      }
    } else if (res instanceof ArrayNode2) {
      var newItems = mapRule(res.items, rule, context);
      if (newItems !== res.items) {
        res = new ArrayNode2(newItems);
      }
    } else if (res instanceof AccessorNode2) {
      var newObj = res.object;
      if (res.object) {
        newObj = applyRule(res.object, rule, context);
      }
      var newIndex = res.index;
      if (res.index) {
        newIndex = applyRule(res.index, rule, context);
      }
      if (newObj !== res.object || newIndex !== res.index) {
        res = new AccessorNode2(newObj, newIndex);
      }
    } else if (res instanceof IndexNode2) {
      var newDims = mapRule(res.dimensions, rule, context);
      if (newDims !== res.dimensions) {
        res = new IndexNode2(newDims);
      }
    } else if (res instanceof ObjectNode2) {
      var changed = false;
      var newProps = {};
      for (var prop in res.properties) {
        newProps[prop] = applyRule(res.properties[prop], rule, context);
        if (newProps[prop] !== res.properties[prop]) {
          changed = true;
        }
      }
      if (changed) {
        res = new ObjectNode2(newProps);
      }
    }
    var repl = rule.r;
    var matches = _ruleMatch(rule.l, res, mergedContext)[0];
    if (!matches && rule.expanded) {
      repl = rule.expanded.r;
      matches = _ruleMatch(rule.expanded.l, res, mergedContext)[0];
    }
    if (!matches && rule.expandedNC1) {
      repl = rule.expandedNC1.r;
      matches = _ruleMatch(rule.expandedNC1.l, res, mergedContext)[0];
      if (!matches) {
        repl = rule.expandedNC2.r;
        matches = _ruleMatch(rule.expandedNC2.l, res, mergedContext)[0];
      }
    }
    if (matches) {
      var implicit = res.implicit;
      res = repl.clone();
      if (implicit && "implicit" in repl) {
        res.implicit = true;
      }
      res = res.transform(function(node2) {
        if (node2.isSymbolNode && hasOwnProperty(matches.placeholders, node2.name)) {
          return matches.placeholders[node2.name].clone();
        } else {
          return node2;
        }
      });
    }
    if (rule.repeat && res !== node) {
      res = applyRule(res, rule, context);
    }
    return res;
  }
  function getSplits(node, context) {
    var res = [];
    var right, rightArgs;
    var makeNode = createMakeNodeFunction(node);
    if (isCommutative(node, context)) {
      for (var i2 = 0; i2 < node.args.length; i2++) {
        rightArgs = node.args.slice(0);
        rightArgs.splice(i2, 1);
        right = rightArgs.length === 1 ? rightArgs[0] : makeNode(rightArgs);
        res.push(makeNode([node.args[i2], right]));
      }
    } else {
      for (var _i = 1; _i < node.args.length; _i++) {
        var left = node.args[0];
        if (_i > 1) {
          left = makeNode(node.args.slice(0, _i));
        }
        rightArgs = node.args.slice(_i);
        right = rightArgs.length === 1 ? rightArgs[0] : makeNode(rightArgs);
        res.push(makeNode([left, right]));
      }
    }
    return res;
  }
  function mergeMatch(match1, match2) {
    var res = {
      placeholders: {}
    };
    if (!match1.placeholders && !match2.placeholders) {
      return res;
    } else if (!match1.placeholders) {
      return match2;
    } else if (!match2.placeholders) {
      return match1;
    }
    for (var key in match1.placeholders) {
      if (hasOwnProperty(match1.placeholders, key)) {
        res.placeholders[key] = match1.placeholders[key];
        if (hasOwnProperty(match2.placeholders, key)) {
          if (!_exactMatch(match1.placeholders[key], match2.placeholders[key])) {
            return null;
          }
        }
      }
    }
    for (var _key in match2.placeholders) {
      if (hasOwnProperty(match2.placeholders, _key)) {
        res.placeholders[_key] = match2.placeholders[_key];
      }
    }
    return res;
  }
  function combineChildMatches(list1, list2) {
    var res = [];
    if (list1.length === 0 || list2.length === 0) {
      return res;
    }
    var merged;
    for (var i1 = 0; i1 < list1.length; i1++) {
      for (var i2 = 0; i2 < list2.length; i2++) {
        merged = mergeMatch(list1[i1], list2[i2]);
        if (merged) {
          res.push(merged);
        }
      }
    }
    return res;
  }
  function mergeChildMatches(childMatches) {
    if (childMatches.length === 0) {
      return childMatches;
    }
    var sets = childMatches.reduce(combineChildMatches);
    var uniqueSets = [];
    var unique = {};
    for (var i2 = 0; i2 < sets.length; i2++) {
      var s = JSON.stringify(sets[i2]);
      if (!unique[s]) {
        unique[s] = true;
        uniqueSets.push(sets[i2]);
      }
    }
    return uniqueSets;
  }
  function _ruleMatch(rule, node, context, isSplit) {
    var res = [{
      placeholders: {}
    }];
    if (rule instanceof OperatorNode2 && node instanceof OperatorNode2 || rule instanceof FunctionNode2 && node instanceof FunctionNode2) {
      if (rule instanceof OperatorNode2) {
        if (rule.op !== node.op || rule.fn !== node.fn) {
          return [];
        }
      } else if (rule instanceof FunctionNode2) {
        if (rule.name !== node.name) {
          return [];
        }
      }
      if (node.args.length === 1 && rule.args.length === 1 || !isAssociative(node, context) && node.args.length === rule.args.length || isSplit) {
        var childMatches = [];
        for (var i2 = 0; i2 < rule.args.length; i2++) {
          var childMatch = _ruleMatch(rule.args[i2], node.args[i2], context);
          if (childMatch.length === 0) {
            break;
          }
          childMatches.push(childMatch);
        }
        if (childMatches.length !== rule.args.length) {
          if (!isCommutative(node, context) || // exact match in order needed
          rule.args.length === 1) {
            return [];
          }
          if (rule.args.length > 2) {
            throw new Error("permuting >2 commutative non-associative rule arguments not yet implemented");
          }
          var leftMatch = _ruleMatch(rule.args[0], node.args[1], context);
          if (leftMatch.length === 0) {
            return [];
          }
          var rightMatch = _ruleMatch(rule.args[1], node.args[0], context);
          if (rightMatch.length === 0) {
            return [];
          }
          childMatches = [leftMatch, rightMatch];
        }
        res = mergeChildMatches(childMatches);
      } else if (node.args.length >= 2 && rule.args.length === 2) {
        var splits = getSplits(node, context);
        var splitMatches = [];
        for (var _i2 = 0; _i2 < splits.length; _i2++) {
          var matchSet = _ruleMatch(rule, splits[_i2], context, true);
          splitMatches = splitMatches.concat(matchSet);
        }
        return splitMatches;
      } else if (rule.args.length > 2) {
        throw Error("Unexpected non-binary associative function: " + rule.toString());
      } else {
        return [];
      }
    } else if (rule instanceof SymbolNode2) {
      if (rule.name.length === 0) {
        throw new Error("Symbol in rule has 0 length...!?");
      }
      if (SUPPORTED_CONSTANTS[rule.name]) {
        if (rule.name !== node.name) {
          return [];
        }
      } else {
        switch (rule.name[1] >= "a" && rule.name[1] <= "z" ? rule.name.substring(0, 2) : rule.name[0]) {
          case "n":
          case "_p":
            res[0].placeholders[rule.name] = node;
            break;
          case "c":
          case "cl":
            if (isConstantNode(node)) {
              res[0].placeholders[rule.name] = node;
            } else {
              return [];
            }
            break;
          case "v":
            if (!isConstantNode(node)) {
              res[0].placeholders[rule.name] = node;
            } else {
              return [];
            }
            break;
          case "vl":
            if (isSymbolNode(node)) {
              res[0].placeholders[rule.name] = node;
            } else {
              return [];
            }
            break;
          case "cd":
            if (isNumericNode(node)) {
              res[0].placeholders[rule.name] = node;
            } else {
              return [];
            }
            break;
          case "vd":
            if (!isNumericNode(node)) {
              res[0].placeholders[rule.name] = node;
            } else {
              return [];
            }
            break;
          case "ce":
            if (isConstantExpression(node)) {
              res[0].placeholders[rule.name] = node;
            } else {
              return [];
            }
            break;
          case "ve":
            if (!isConstantExpression(node)) {
              res[0].placeholders[rule.name] = node;
            } else {
              return [];
            }
            break;
          default:
            throw new Error("Invalid symbol in rule: " + rule.name);
        }
      }
    } else if (rule instanceof ConstantNode2) {
      if (!equal2(rule.value, node.value)) {
        return [];
      }
    } else {
      return [];
    }
    return res;
  }
  function _exactMatch(p, q) {
    if (p instanceof ConstantNode2 && q instanceof ConstantNode2) {
      if (!equal2(p.value, q.value)) {
        return false;
      }
    } else if (p instanceof SymbolNode2 && q instanceof SymbolNode2) {
      if (p.name !== q.name) {
        return false;
      }
    } else if (p instanceof OperatorNode2 && q instanceof OperatorNode2 || p instanceof FunctionNode2 && q instanceof FunctionNode2) {
      if (p instanceof OperatorNode2) {
        if (p.op !== q.op || p.fn !== q.fn) {
          return false;
        }
      } else if (p instanceof FunctionNode2) {
        if (p.name !== q.name) {
          return false;
        }
      }
      if (p.args.length !== q.args.length) {
        return false;
      }
      for (var i2 = 0; i2 < p.args.length; i2++) {
        if (!_exactMatch(p.args[i2], q.args[i2])) {
          return false;
        }
      }
    } else {
      return false;
    }
    return true;
  }
  return simplify2;
});
var name$u = "simplifyConstant";
var dependencies$u = ["typed", "config", "mathWithTransform", "matrix", "?fraction", "?bignumber", "AccessorNode", "ArrayNode", "ConstantNode", "FunctionNode", "IndexNode", "ObjectNode", "OperatorNode", "SymbolNode"];
var createSimplifyConstant = /* @__PURE__ */ factory(name$u, dependencies$u, (_ref) => {
  var {
    typed: typed2,
    config: config2,
    mathWithTransform: mathWithTransform2,
    matrix: matrix2,
    fraction: fraction2,
    bignumber: bignumber2,
    AccessorNode: AccessorNode2,
    ArrayNode: ArrayNode2,
    ConstantNode: ConstantNode2,
    FunctionNode: FunctionNode2,
    IndexNode: IndexNode2,
    ObjectNode: ObjectNode2,
    OperatorNode: OperatorNode2,
    SymbolNode: SymbolNode2
  } = _ref;
  var {
    isCommutative,
    isAssociative,
    allChildren,
    createMakeNodeFunction
  } = createUtil({
    FunctionNode: FunctionNode2,
    OperatorNode: OperatorNode2,
    SymbolNode: SymbolNode2
  });
  var simplifyConstant2 = typed2("simplifyConstant", {
    Node: (node) => _ensureNode(foldFraction(node, {})),
    "Node, Object": function NodeObject(expr, options) {
      return _ensureNode(foldFraction(expr, options));
    }
  });
  function _removeFractions(thing) {
    if (isFraction(thing)) {
      return thing.valueOf();
    }
    if (thing instanceof Array) {
      return thing.map(_removeFractions);
    }
    if (isMatrix(thing)) {
      return matrix2(_removeFractions(thing.valueOf()));
    }
    return thing;
  }
  function _eval(fnname, args, options) {
    try {
      return mathWithTransform2[fnname].apply(null, args);
    } catch (ignore) {
      args = args.map(_removeFractions);
      return _toNumber(mathWithTransform2[fnname].apply(null, args), options);
    }
  }
  var _toNode = typed2({
    Fraction: _fractionToNode,
    number: function number2(n) {
      if (n < 0) {
        return unaryMinusNode(new ConstantNode2(-n));
      }
      return new ConstantNode2(n);
    },
    BigNumber: function BigNumber2(n) {
      if (n < 0) {
        return unaryMinusNode(new ConstantNode2(-n));
      }
      return new ConstantNode2(n);
    },
    Complex: function Complex2(s) {
      throw new Error("Cannot convert Complex number to Node");
    },
    string: function string2(s) {
      return new ConstantNode2(s);
    },
    Matrix: function Matrix2(m) {
      return new ArrayNode2(m.valueOf().map((e2) => _toNode(e2)));
    }
  });
  function _ensureNode(thing) {
    if (isNode(thing)) {
      return thing;
    }
    return _toNode(thing);
  }
  function _exactFraction(n, options) {
    var exactFractions = options && options.exactFractions !== false;
    if (exactFractions && isFinite(n) && fraction2) {
      var f = fraction2(n);
      var fractionsLimit = options && typeof options.fractionsLimit === "number" ? options.fractionsLimit : Infinity;
      if (f.valueOf() === n && f.n < fractionsLimit && f.d < fractionsLimit) {
        return f;
      }
    }
    return n;
  }
  var _toNumber = typed2({
    "string, Object": function stringObject(s, options) {
      if (config2.number === "BigNumber") {
        if (bignumber2 === void 0) {
          noBignumber();
        }
        return bignumber2(s);
      } else if (config2.number === "Fraction") {
        if (fraction2 === void 0) {
          noFraction();
        }
        return fraction2(s);
      } else {
        var n = parseFloat(s);
        return _exactFraction(n, options);
      }
    },
    "Fraction, Object": function FractionObject(s, options) {
      return s;
    },
    // we don't need options here
    "BigNumber, Object": function BigNumberObject(s, options) {
      return s;
    },
    // we don't need options here
    "number, Object": function numberObject(s, options) {
      return _exactFraction(s, options);
    },
    "Complex, Object": function ComplexObject(s, options) {
      if (s.im !== 0) {
        return s;
      }
      return _exactFraction(s.re, options);
    },
    "Matrix, Object": function MatrixObject(s, options) {
      return matrix2(_exactFraction(s.valueOf()));
    },
    "Array, Object": function ArrayObject(s, options) {
      return s.map(_exactFraction);
    }
  });
  function unaryMinusNode(n) {
    return new OperatorNode2("-", "unaryMinus", [n]);
  }
  function _fractionToNode(f) {
    var n;
    var vn = f.s * f.n;
    if (vn < 0) {
      n = new OperatorNode2("-", "unaryMinus", [new ConstantNode2(-vn)]);
    } else {
      n = new ConstantNode2(vn);
    }
    if (f.d === 1) {
      return n;
    }
    return new OperatorNode2("/", "divide", [n, new ConstantNode2(f.d)]);
  }
  function _foldAccessor(obj, index2, options) {
    if (!isIndexNode(index2)) {
      return new AccessorNode2(_ensureNode(obj), _ensureNode(index2));
    }
    if (isArrayNode(obj) || isMatrix(obj)) {
      var remainingDims = Array.from(index2.dimensions);
      while (remainingDims.length > 0) {
        if (isConstantNode(remainingDims[0]) && typeof remainingDims[0].value !== "string") {
          var first = _toNumber(remainingDims.shift().value, options);
          if (isArrayNode(obj)) {
            obj = obj.items[first - 1];
          } else {
            obj = obj.valueOf()[first - 1];
            if (obj instanceof Array) {
              obj = matrix2(obj);
            }
          }
        } else if (remainingDims.length > 1 && isConstantNode(remainingDims[1]) && typeof remainingDims[1].value !== "string") {
          var second = _toNumber(remainingDims[1].value, options);
          var tryItems = [];
          var fromItems = isArrayNode(obj) ? obj.items : obj.valueOf();
          for (var item of fromItems) {
            if (isArrayNode(item)) {
              tryItems.push(item.items[second - 1]);
            } else if (isMatrix(obj)) {
              tryItems.push(item[second - 1]);
            } else {
              break;
            }
          }
          if (tryItems.length === fromItems.length) {
            if (isArrayNode(obj)) {
              obj = new ArrayNode2(tryItems);
            } else {
              obj = matrix2(tryItems);
            }
            remainingDims.splice(1, 1);
          } else {
            break;
          }
        } else {
          break;
        }
      }
      if (remainingDims.length === index2.dimensions.length) {
        return new AccessorNode2(_ensureNode(obj), index2);
      }
      if (remainingDims.length > 0) {
        index2 = new IndexNode2(remainingDims);
        return new AccessorNode2(_ensureNode(obj), index2);
      }
      return obj;
    }
    if (isObjectNode(obj) && index2.dimensions.length === 1 && isConstantNode(index2.dimensions[0])) {
      var key = index2.dimensions[0].value;
      if (key in obj.properties) {
        return obj.properties[key];
      }
      return new ConstantNode2();
    }
    return new AccessorNode2(_ensureNode(obj), index2);
  }
  function foldOp(fn, args, makeNode, options) {
    var first = args.shift();
    var reduction = args.reduce((sofar, next) => {
      if (!isNode(next)) {
        var last = sofar.pop();
        if (isNode(last)) {
          return [last, next];
        }
        try {
          sofar.push(_eval(fn, [last, next], options));
          return sofar;
        } catch (ignoreandcontinue) {
          sofar.push(last);
        }
      }
      sofar.push(_ensureNode(sofar.pop()));
      var newtree = sofar.length === 1 ? sofar[0] : makeNode(sofar);
      return [makeNode([newtree, _ensureNode(next)])];
    }, [first]);
    if (reduction.length === 1) {
      return reduction[0];
    }
    return makeNode([reduction[0], _toNode(reduction[1])]);
  }
  function foldFraction(node, options) {
    switch (node.type) {
      case "SymbolNode":
        return node;
      case "ConstantNode":
        switch (typeof node.value) {
          case "number":
            return _toNumber(node.value, options);
          case "string":
            return node.value;
          default:
            if (!isNaN(node.value))
              return _toNumber(node.value, options);
        }
        return node;
      case "FunctionNode":
        if (mathWithTransform2[node.name] && mathWithTransform2[node.name].rawArgs) {
          return node;
        }
        {
          var operatorFunctions = ["add", "multiply"];
          if (!operatorFunctions.includes(node.name)) {
            var args = node.args.map((arg2) => foldFraction(arg2, options));
            if (!args.some(isNode)) {
              try {
                return _eval(node.name, args, options);
              } catch (ignoreandcontinue) {
              }
            }
            if (node.name === "size" && args.length === 1 && isArrayNode(args[0])) {
              var sz = [];
              var section = args[0];
              while (isArrayNode(section)) {
                sz.push(section.items.length);
                section = section.items[0];
              }
              return matrix2(sz);
            }
            return new FunctionNode2(node.name, args.map(_ensureNode));
          }
        }
      case "OperatorNode": {
        var fn = node.fn.toString();
        var _args;
        var res;
        var makeNode = createMakeNodeFunction(node);
        if (isOperatorNode(node) && node.isUnary()) {
          _args = [foldFraction(node.args[0], options)];
          if (!isNode(_args[0])) {
            res = _eval(fn, _args, options);
          } else {
            res = makeNode(_args);
          }
        } else if (isAssociative(node, options.context)) {
          _args = allChildren(node, options.context);
          _args = _args.map((arg2) => foldFraction(arg2, options));
          if (isCommutative(fn, options.context)) {
            var consts = [];
            var vars = [];
            for (var i2 = 0; i2 < _args.length; i2++) {
              if (!isNode(_args[i2])) {
                consts.push(_args[i2]);
              } else {
                vars.push(_args[i2]);
              }
            }
            if (consts.length > 1) {
              res = foldOp(fn, consts, makeNode, options);
              vars.unshift(res);
              res = foldOp(fn, vars, makeNode, options);
            } else {
              res = foldOp(fn, _args, makeNode, options);
            }
          } else {
            res = foldOp(fn, _args, makeNode, options);
          }
        } else {
          _args = node.args.map((arg2) => foldFraction(arg2, options));
          res = foldOp(fn, _args, makeNode, options);
        }
        return res;
      }
      case "ParenthesisNode":
        return foldFraction(node.content, options);
      case "AccessorNode":
        return _foldAccessor(foldFraction(node.object, options), foldFraction(node.index, options), options);
      case "ArrayNode": {
        var foldItems = node.items.map((item) => foldFraction(item, options));
        if (foldItems.some(isNode)) {
          return new ArrayNode2(foldItems.map(_ensureNode));
        }
        return matrix2(foldItems);
      }
      case "IndexNode": {
        return new IndexNode2(node.dimensions.map((n) => simplifyConstant2(n, options)));
      }
      case "ObjectNode": {
        var foldProps = {};
        for (var prop in node.properties) {
          foldProps[prop] = simplifyConstant2(node.properties[prop], options);
        }
        return new ObjectNode2(foldProps);
      }
      case "AssignmentNode":
      case "BlockNode":
      case "FunctionAssignmentNode":
      case "RangeNode":
      case "ConditionalNode":
      default:
        throw new Error("Unimplemented node type in simplifyConstant: ".concat(node.type));
    }
  }
  return simplifyConstant2;
});
var name$t = "simplifyCore";
var dependencies$t = ["typed", "parse", "equal", "isZero", "add", "subtract", "multiply", "divide", "pow", "AccessorNode", "ArrayNode", "ConstantNode", "FunctionNode", "IndexNode", "ObjectNode", "OperatorNode", "ParenthesisNode", "SymbolNode"];
var createSimplifyCore = /* @__PURE__ */ factory(name$t, dependencies$t, (_ref) => {
  var {
    typed: typed2,
    parse: parse2,
    equal: equal2,
    isZero: isZero2,
    add: add2,
    subtract: subtract2,
    multiply: multiply2,
    divide: divide2,
    pow: pow2,
    AccessorNode: AccessorNode2,
    ArrayNode: ArrayNode2,
    ConstantNode: ConstantNode2,
    FunctionNode: FunctionNode2,
    IndexNode: IndexNode2,
    ObjectNode: ObjectNode2,
    OperatorNode: OperatorNode2,
    ParenthesisNode: ParenthesisNode2,
    SymbolNode: SymbolNode2
  } = _ref;
  var node0 = new ConstantNode2(0);
  var node1 = new ConstantNode2(1);
  var nodeT = new ConstantNode2(true);
  var nodeF = new ConstantNode2(false);
  function isAlwaysBoolean(node) {
    return isOperatorNode(node) && ["and", "not", "or"].includes(node.op);
  }
  var {
    hasProperty,
    isCommutative
  } = createUtil({
    FunctionNode: FunctionNode2,
    OperatorNode: OperatorNode2,
    SymbolNode: SymbolNode2
  });
  function _simplifyCore(nodeToSimplify) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var context = options ? options.context : void 0;
    if (hasProperty(nodeToSimplify, "trivial", context)) {
      if (isFunctionNode(nodeToSimplify) && nodeToSimplify.args.length === 1) {
        return _simplifyCore(nodeToSimplify.args[0], options);
      }
      var simpChild = false;
      var childCount = 0;
      nodeToSimplify.forEach((c) => {
        ++childCount;
        if (childCount === 1) {
          simpChild = _simplifyCore(c, options);
        }
      });
      if (childCount === 1) {
        return simpChild;
      }
    }
    var node = nodeToSimplify;
    if (isFunctionNode(node)) {
      var op = getOperator(node.name);
      if (op) {
        if (node.args.length > 2 && hasProperty(node, "associative", context)) {
          while (node.args.length > 2) {
            var last = node.args.pop();
            var seclast = node.args.pop();
            node.args.push(new OperatorNode2(op, node.name, [last, seclast]));
          }
        }
        node = new OperatorNode2(op, node.name, node.args);
      } else {
        return new FunctionNode2(_simplifyCore(node.fn), node.args.map((n) => _simplifyCore(n, options)));
      }
    }
    if (isOperatorNode(node) && node.isUnary()) {
      var a0 = _simplifyCore(node.args[0], options);
      if (node.op === "~") {
        if (isOperatorNode(a0) && a0.isUnary() && a0.op === "~") {
          return a0.args[0];
        }
      }
      if (node.op === "not") {
        if (isOperatorNode(a0) && a0.isUnary() && a0.op === "not") {
          if (isAlwaysBoolean(a0.args[0])) {
            return a0.args[0];
          }
        }
      }
      var finish = true;
      if (node.op === "-") {
        if (isOperatorNode(a0)) {
          if (a0.isBinary() && a0.fn === "subtract") {
            node = new OperatorNode2("-", "subtract", [a0.args[1], a0.args[0]]);
            finish = false;
          }
          if (a0.isUnary() && a0.op === "-") {
            return a0.args[0];
          }
        }
      }
      if (finish)
        return new OperatorNode2(node.op, node.fn, [a0]);
    }
    if (isOperatorNode(node) && node.isBinary()) {
      var _a = _simplifyCore(node.args[0], options);
      var a1 = _simplifyCore(node.args[1], options);
      if (node.op === "+") {
        if (isConstantNode(_a) && isZero2(_a.value)) {
          return a1;
        }
        if (isConstantNode(a1) && isZero2(a1.value)) {
          return _a;
        }
        if (isOperatorNode(a1) && a1.isUnary() && a1.op === "-") {
          a1 = a1.args[0];
          node = new OperatorNode2("-", "subtract", [_a, a1]);
        }
      }
      if (node.op === "-") {
        if (isOperatorNode(a1) && a1.isUnary() && a1.op === "-") {
          return _simplifyCore(new OperatorNode2("+", "add", [_a, a1.args[0]]), options);
        }
        if (isConstantNode(_a) && isZero2(_a.value)) {
          return _simplifyCore(new OperatorNode2("-", "unaryMinus", [a1]));
        }
        if (isConstantNode(a1) && isZero2(a1.value)) {
          return _a;
        }
        return new OperatorNode2(node.op, node.fn, [_a, a1]);
      }
      if (node.op === "*") {
        if (isConstantNode(_a)) {
          if (isZero2(_a.value)) {
            return node0;
          } else if (equal2(_a.value, 1)) {
            return a1;
          }
        }
        if (isConstantNode(a1)) {
          if (isZero2(a1.value)) {
            return node0;
          } else if (equal2(a1.value, 1)) {
            return _a;
          }
          if (isCommutative(node, context)) {
            return new OperatorNode2(node.op, node.fn, [a1, _a], node.implicit);
          }
        }
        return new OperatorNode2(node.op, node.fn, [_a, a1], node.implicit);
      }
      if (node.op === "/") {
        if (isConstantNode(_a) && isZero2(_a.value)) {
          return node0;
        }
        if (isConstantNode(a1) && equal2(a1.value, 1)) {
          return _a;
        }
        return new OperatorNode2(node.op, node.fn, [_a, a1]);
      }
      if (node.op === "^") {
        if (isConstantNode(a1)) {
          if (isZero2(a1.value)) {
            return node1;
          } else if (equal2(a1.value, 1)) {
            return _a;
          }
        }
      }
      if (node.op === "and") {
        if (isConstantNode(_a)) {
          if (_a.value) {
            if (isAlwaysBoolean(a1))
              return a1;
            if (isConstantNode(a1)) {
              return a1.value ? nodeT : nodeF;
            }
          } else {
            return nodeF;
          }
        }
        if (isConstantNode(a1)) {
          if (a1.value) {
            if (isAlwaysBoolean(_a))
              return _a;
          } else {
            return nodeF;
          }
        }
      }
      if (node.op === "or") {
        if (isConstantNode(_a)) {
          if (_a.value) {
            return nodeT;
          } else {
            if (isAlwaysBoolean(a1))
              return a1;
          }
        }
        if (isConstantNode(a1)) {
          if (a1.value) {
            return nodeT;
          } else {
            if (isAlwaysBoolean(_a))
              return _a;
          }
        }
      }
      return new OperatorNode2(node.op, node.fn, [_a, a1]);
    }
    if (isOperatorNode(node)) {
      return new OperatorNode2(node.op, node.fn, node.args.map((a) => _simplifyCore(a, options)));
    }
    if (isArrayNode(node)) {
      return new ArrayNode2(node.items.map((n) => _simplifyCore(n, options)));
    }
    if (isAccessorNode(node)) {
      return new AccessorNode2(_simplifyCore(node.object, options), _simplifyCore(node.index, options));
    }
    if (isIndexNode(node)) {
      return new IndexNode2(node.dimensions.map((n) => _simplifyCore(n, options)));
    }
    if (isObjectNode(node)) {
      var newProps = {};
      for (var prop in node.properties) {
        newProps[prop] = _simplifyCore(node.properties[prop], options);
      }
      return new ObjectNode2(newProps);
    }
    return node;
  }
  return typed2(name$t, {
    Node: _simplifyCore,
    "Node,Object": _simplifyCore
  });
});
var name$s = "resolve";
var dependencies$s = ["typed", "parse", "ConstantNode", "FunctionNode", "OperatorNode", "ParenthesisNode"];
var createResolve = /* @__PURE__ */ factory(name$s, dependencies$s, (_ref) => {
  var {
    typed: typed2,
    parse: parse2,
    ConstantNode: ConstantNode2,
    FunctionNode: FunctionNode2,
    OperatorNode: OperatorNode2,
    ParenthesisNode: ParenthesisNode2
  } = _ref;
  function _resolve(node, scope) {
    var within = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : /* @__PURE__ */ new Set();
    if (!scope) {
      return node;
    }
    if (isSymbolNode(node)) {
      if (within.has(node.name)) {
        var variables = Array.from(within).join(", ");
        throw new ReferenceError("recursive loop of variable definitions among {".concat(variables, "}"));
      }
      var value = scope.get(node.name);
      if (isNode(value)) {
        var nextWithin = new Set(within);
        nextWithin.add(node.name);
        return _resolve(value, scope, nextWithin);
      } else if (typeof value === "number") {
        return parse2(String(value));
      } else if (value !== void 0) {
        return new ConstantNode2(value);
      } else {
        return node;
      }
    } else if (isOperatorNode(node)) {
      var args = node.args.map(function(arg2) {
        return _resolve(arg2, scope, within);
      });
      return new OperatorNode2(node.op, node.fn, args, node.implicit);
    } else if (isParenthesisNode(node)) {
      return new ParenthesisNode2(_resolve(node.content, scope, within));
    } else if (isFunctionNode(node)) {
      var _args = node.args.map(function(arg2) {
        return _resolve(arg2, scope, within);
      });
      return new FunctionNode2(node.name, _args);
    }
    return node.map((child) => _resolve(child, scope, within));
  }
  return typed2("resolve", {
    Node: _resolve,
    "Node, Map | null | undefined": _resolve,
    "Node, Object": (n, scope) => _resolve(n, createMap(scope)),
    // For arrays and matrices, we map `self` rather than `_resolve`
    // because resolve is fairly expensive anyway, and this way
    // we get nice error messages if one entry in the array has wrong type.
    "Array | Matrix": typed2.referToSelf((self) => (A) => A.map((n) => self(n))),
    "Array | Matrix, null | undefined": typed2.referToSelf((self) => (A) => A.map((n) => self(n))),
    "Array, Object": typed2.referTo("Array,Map", (selfAM) => (A, scope) => selfAM(A, createMap(scope))),
    "Matrix, Object": typed2.referTo("Matrix,Map", (selfMM) => (A, scope) => selfMM(A, createMap(scope))),
    "Array | Matrix, Map": typed2.referToSelf((self) => (A, scope) => A.map((n) => self(n, scope)))
  });
});
var name$r = "symbolicEqual";
var dependencies$r = ["parse", "simplify", "typed", "OperatorNode"];
var createSymbolicEqual = /* @__PURE__ */ factory(name$r, dependencies$r, (_ref) => {
  var {
    parse: parse2,
    simplify: simplify2,
    typed: typed2,
    OperatorNode: OperatorNode2
  } = _ref;
  function _symbolicEqual(e1, e2) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var diff2 = new OperatorNode2("-", "subtract", [e1, e2]);
    var simplified = simplify2(diff2, {}, options);
    return isConstantNode(simplified) && !simplified.value;
  }
  return typed2(name$r, {
    "Node, Node": _symbolicEqual,
    "Node, Node, Object": _symbolicEqual
  });
});
var name$q = "derivative";
var dependencies$q = ["typed", "config", "parse", "simplify", "equal", "isZero", "numeric", "ConstantNode", "FunctionNode", "OperatorNode", "ParenthesisNode", "SymbolNode"];
var createDerivative = /* @__PURE__ */ factory(name$q, dependencies$q, (_ref) => {
  var {
    typed: typed2,
    config: config2,
    parse: parse2,
    simplify: simplify2,
    equal: equal2,
    isZero: isZero2,
    numeric: numeric3,
    ConstantNode: ConstantNode2,
    FunctionNode: FunctionNode2,
    OperatorNode: OperatorNode2,
    ParenthesisNode: ParenthesisNode2,
    SymbolNode: SymbolNode2
  } = _ref;
  function plainDerivative(expr, variable) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
      simplify: true
    };
    var constNodes = {};
    constTag(constNodes, expr, variable.name);
    var res = _derivative(expr, constNodes);
    return options.simplify ? simplify2(res) : res;
  }
  typed2.addConversion({
    from: "identifier",
    to: "SymbolNode",
    convert: parse2
  });
  var derivative2 = typed2(name$q, {
    "Node, SymbolNode": plainDerivative,
    "Node, SymbolNode, Object": plainDerivative
    /* TODO: implement and test syntax with order of derivatives -> implement as an option {order: number}
    'Node, SymbolNode, ConstantNode': function (expr, variable, {order}) {
      let res = expr
      for (let i = 0; i < order; i++) {
        let constNodes = {}
        constTag(constNodes, expr, variable.name)
        res = _derivative(res, constNodes)
      }
      return res
    }
    */
  });
  typed2.removeConversion({
    from: "identifier",
    to: "SymbolNode",
    convert: parse2
  });
  derivative2._simplify = true;
  derivative2.toTex = function(deriv) {
    return _derivTex.apply(null, deriv.args);
  };
  var _derivTex = typed2("_derivTex", {
    "Node, SymbolNode": function NodeSymbolNode(expr, x) {
      if (isConstantNode(expr) && typeOf(expr.value) === "string") {
        return _derivTex(parse2(expr.value).toString(), x.toString(), 1);
      } else {
        return _derivTex(expr.toTex(), x.toString(), 1);
      }
    },
    "Node, ConstantNode": function NodeConstantNode(expr, x) {
      if (typeOf(x.value) === "string") {
        return _derivTex(expr, parse2(x.value));
      } else {
        throw new Error("The second parameter to 'derivative' is a non-string constant");
      }
    },
    "Node, SymbolNode, ConstantNode": function NodeSymbolNodeConstantNode(expr, x, order) {
      return _derivTex(expr.toString(), x.name, order.value);
    },
    "string, string, number": function stringStringNumber(expr, x, order) {
      var d;
      if (order === 1) {
        d = "{d\\over d" + x + "}";
      } else {
        d = "{d^{" + order + "}\\over d" + x + "^{" + order + "}}";
      }
      return d + "\\left[".concat(expr, "\\right]");
    }
  });
  var constTag = typed2("constTag", {
    "Object, ConstantNode, string": function ObjectConstantNodeString(constNodes, node) {
      constNodes[node] = true;
      return true;
    },
    "Object, SymbolNode, string": function ObjectSymbolNodeString(constNodes, node, varName) {
      if (node.name !== varName) {
        constNodes[node] = true;
        return true;
      }
      return false;
    },
    "Object, ParenthesisNode, string": function ObjectParenthesisNodeString(constNodes, node, varName) {
      return constTag(constNodes, node.content, varName);
    },
    "Object, FunctionAssignmentNode, string": function ObjectFunctionAssignmentNodeString(constNodes, node, varName) {
      if (!node.params.includes(varName)) {
        constNodes[node] = true;
        return true;
      }
      return constTag(constNodes, node.expr, varName);
    },
    "Object, FunctionNode | OperatorNode, string": function ObjectFunctionNodeOperatorNodeString(constNodes, node, varName) {
      if (node.args.length > 0) {
        var isConst = constTag(constNodes, node.args[0], varName);
        for (var i2 = 1; i2 < node.args.length; ++i2) {
          isConst = constTag(constNodes, node.args[i2], varName) && isConst;
        }
        if (isConst) {
          constNodes[node] = true;
          return true;
        }
      }
      return false;
    }
  });
  var _derivative = typed2("_derivative", {
    "ConstantNode, Object": function ConstantNodeObject(node) {
      return createConstantNode2(0);
    },
    "SymbolNode, Object": function SymbolNodeObject(node, constNodes) {
      if (constNodes[node] !== void 0) {
        return createConstantNode2(0);
      }
      return createConstantNode2(1);
    },
    "ParenthesisNode, Object": function ParenthesisNodeObject(node, constNodes) {
      return new ParenthesisNode2(_derivative(node.content, constNodes));
    },
    "FunctionAssignmentNode, Object": function FunctionAssignmentNodeObject(node, constNodes) {
      if (constNodes[node] !== void 0) {
        return createConstantNode2(0);
      }
      return _derivative(node.expr, constNodes);
    },
    "FunctionNode, Object": function FunctionNodeObject(node, constNodes) {
      if (constNodes[node] !== void 0) {
        return createConstantNode2(0);
      }
      var arg0 = node.args[0];
      var arg1;
      var div = false;
      var negative = false;
      var funcDerivative;
      switch (node.name) {
        case "cbrt":
          div = true;
          funcDerivative = new OperatorNode2("*", "multiply", [createConstantNode2(3), new OperatorNode2("^", "pow", [arg0, new OperatorNode2("/", "divide", [createConstantNode2(2), createConstantNode2(3)])])]);
          break;
        case "sqrt":
        case "nthRoot":
          if (node.args.length === 1) {
            div = true;
            funcDerivative = new OperatorNode2("*", "multiply", [createConstantNode2(2), new FunctionNode2("sqrt", [arg0])]);
          } else if (node.args.length === 2) {
            arg1 = new OperatorNode2("/", "divide", [createConstantNode2(1), node.args[1]]);
            constNodes[arg1] = constNodes[node.args[1]];
            return _derivative(new OperatorNode2("^", "pow", [arg0, arg1]), constNodes);
          }
          break;
        case "log10":
          arg1 = createConstantNode2(10);
        case "log":
          if (!arg1 && node.args.length === 1) {
            funcDerivative = arg0.clone();
            div = true;
          } else if (node.args.length === 1 && arg1 || node.args.length === 2 && constNodes[node.args[1]] !== void 0) {
            funcDerivative = new OperatorNode2("*", "multiply", [arg0.clone(), new FunctionNode2("log", [arg1 || node.args[1]])]);
            div = true;
          } else if (node.args.length === 2) {
            return _derivative(new OperatorNode2("/", "divide", [new FunctionNode2("log", [arg0]), new FunctionNode2("log", [node.args[1]])]), constNodes);
          }
          break;
        case "pow":
          if (node.args.length === 2) {
            constNodes[arg1] = constNodes[node.args[1]];
            return _derivative(new OperatorNode2("^", "pow", [arg0, node.args[1]]), constNodes);
          }
          break;
        case "exp":
          funcDerivative = new FunctionNode2("exp", [arg0.clone()]);
          break;
        case "sin":
          funcDerivative = new FunctionNode2("cos", [arg0.clone()]);
          break;
        case "cos":
          funcDerivative = new OperatorNode2("-", "unaryMinus", [new FunctionNode2("sin", [arg0.clone()])]);
          break;
        case "tan":
          funcDerivative = new OperatorNode2("^", "pow", [new FunctionNode2("sec", [arg0.clone()]), createConstantNode2(2)]);
          break;
        case "sec":
          funcDerivative = new OperatorNode2("*", "multiply", [node, new FunctionNode2("tan", [arg0.clone()])]);
          break;
        case "csc":
          negative = true;
          funcDerivative = new OperatorNode2("*", "multiply", [node, new FunctionNode2("cot", [arg0.clone()])]);
          break;
        case "cot":
          negative = true;
          funcDerivative = new OperatorNode2("^", "pow", [new FunctionNode2("csc", [arg0.clone()]), createConstantNode2(2)]);
          break;
        case "asin":
          div = true;
          funcDerivative = new FunctionNode2("sqrt", [new OperatorNode2("-", "subtract", [createConstantNode2(1), new OperatorNode2("^", "pow", [arg0.clone(), createConstantNode2(2)])])]);
          break;
        case "acos":
          div = true;
          negative = true;
          funcDerivative = new FunctionNode2("sqrt", [new OperatorNode2("-", "subtract", [createConstantNode2(1), new OperatorNode2("^", "pow", [arg0.clone(), createConstantNode2(2)])])]);
          break;
        case "atan":
          div = true;
          funcDerivative = new OperatorNode2("+", "add", [new OperatorNode2("^", "pow", [arg0.clone(), createConstantNode2(2)]), createConstantNode2(1)]);
          break;
        case "asec":
          div = true;
          funcDerivative = new OperatorNode2("*", "multiply", [new FunctionNode2("abs", [arg0.clone()]), new FunctionNode2("sqrt", [new OperatorNode2("-", "subtract", [new OperatorNode2("^", "pow", [arg0.clone(), createConstantNode2(2)]), createConstantNode2(1)])])]);
          break;
        case "acsc":
          div = true;
          negative = true;
          funcDerivative = new OperatorNode2("*", "multiply", [new FunctionNode2("abs", [arg0.clone()]), new FunctionNode2("sqrt", [new OperatorNode2("-", "subtract", [new OperatorNode2("^", "pow", [arg0.clone(), createConstantNode2(2)]), createConstantNode2(1)])])]);
          break;
        case "acot":
          div = true;
          negative = true;
          funcDerivative = new OperatorNode2("+", "add", [new OperatorNode2("^", "pow", [arg0.clone(), createConstantNode2(2)]), createConstantNode2(1)]);
          break;
        case "sinh":
          funcDerivative = new FunctionNode2("cosh", [arg0.clone()]);
          break;
        case "cosh":
          funcDerivative = new FunctionNode2("sinh", [arg0.clone()]);
          break;
        case "tanh":
          funcDerivative = new OperatorNode2("^", "pow", [new FunctionNode2("sech", [arg0.clone()]), createConstantNode2(2)]);
          break;
        case "sech":
          negative = true;
          funcDerivative = new OperatorNode2("*", "multiply", [node, new FunctionNode2("tanh", [arg0.clone()])]);
          break;
        case "csch":
          negative = true;
          funcDerivative = new OperatorNode2("*", "multiply", [node, new FunctionNode2("coth", [arg0.clone()])]);
          break;
        case "coth":
          negative = true;
          funcDerivative = new OperatorNode2("^", "pow", [new FunctionNode2("csch", [arg0.clone()]), createConstantNode2(2)]);
          break;
        case "asinh":
          div = true;
          funcDerivative = new FunctionNode2("sqrt", [new OperatorNode2("+", "add", [new OperatorNode2("^", "pow", [arg0.clone(), createConstantNode2(2)]), createConstantNode2(1)])]);
          break;
        case "acosh":
          div = true;
          funcDerivative = new FunctionNode2("sqrt", [new OperatorNode2("-", "subtract", [new OperatorNode2("^", "pow", [arg0.clone(), createConstantNode2(2)]), createConstantNode2(1)])]);
          break;
        case "atanh":
          div = true;
          funcDerivative = new OperatorNode2("-", "subtract", [createConstantNode2(1), new OperatorNode2("^", "pow", [arg0.clone(), createConstantNode2(2)])]);
          break;
        case "asech":
          div = true;
          negative = true;
          funcDerivative = new OperatorNode2("*", "multiply", [arg0.clone(), new FunctionNode2("sqrt", [new OperatorNode2("-", "subtract", [createConstantNode2(1), new OperatorNode2("^", "pow", [arg0.clone(), createConstantNode2(2)])])])]);
          break;
        case "acsch":
          div = true;
          negative = true;
          funcDerivative = new OperatorNode2("*", "multiply", [new FunctionNode2("abs", [arg0.clone()]), new FunctionNode2("sqrt", [new OperatorNode2("+", "add", [new OperatorNode2("^", "pow", [arg0.clone(), createConstantNode2(2)]), createConstantNode2(1)])])]);
          break;
        case "acoth":
          div = true;
          negative = true;
          funcDerivative = new OperatorNode2("-", "subtract", [createConstantNode2(1), new OperatorNode2("^", "pow", [arg0.clone(), createConstantNode2(2)])]);
          break;
        case "abs":
          funcDerivative = new OperatorNode2("/", "divide", [new FunctionNode2(new SymbolNode2("abs"), [arg0.clone()]), arg0.clone()]);
          break;
        case "gamma":
        default:
          throw new Error('Cannot process function "' + node.name + '" in derivative: the function is not supported, undefined, or the number of arguments passed to it are not supported');
      }
      var op, func;
      if (div) {
        op = "/";
        func = "divide";
      } else {
        op = "*";
        func = "multiply";
      }
      var chainDerivative = _derivative(arg0, constNodes);
      if (negative) {
        chainDerivative = new OperatorNode2("-", "unaryMinus", [chainDerivative]);
      }
      return new OperatorNode2(op, func, [chainDerivative, funcDerivative]);
    },
    "OperatorNode, Object": function OperatorNodeObject(node, constNodes) {
      if (constNodes[node] !== void 0) {
        return createConstantNode2(0);
      }
      if (node.op === "+") {
        return new OperatorNode2(node.op, node.fn, node.args.map(function(arg2) {
          return _derivative(arg2, constNodes);
        }));
      }
      if (node.op === "-") {
        if (node.isUnary()) {
          return new OperatorNode2(node.op, node.fn, [_derivative(node.args[0], constNodes)]);
        }
        if (node.isBinary()) {
          return new OperatorNode2(node.op, node.fn, [_derivative(node.args[0], constNodes), _derivative(node.args[1], constNodes)]);
        }
      }
      if (node.op === "*") {
        var constantTerms = node.args.filter(function(arg2) {
          return constNodes[arg2] !== void 0;
        });
        if (constantTerms.length > 0) {
          var nonConstantTerms = node.args.filter(function(arg2) {
            return constNodes[arg2] === void 0;
          });
          var nonConstantNode = nonConstantTerms.length === 1 ? nonConstantTerms[0] : new OperatorNode2("*", "multiply", nonConstantTerms);
          var newArgs = constantTerms.concat(_derivative(nonConstantNode, constNodes));
          return new OperatorNode2("*", "multiply", newArgs);
        }
        return new OperatorNode2("+", "add", node.args.map(function(argOuter) {
          return new OperatorNode2("*", "multiply", node.args.map(function(argInner) {
            return argInner === argOuter ? _derivative(argInner, constNodes) : argInner.clone();
          }));
        }));
      }
      if (node.op === "/" && node.isBinary()) {
        var arg0 = node.args[0];
        var arg1 = node.args[1];
        if (constNodes[arg1] !== void 0) {
          return new OperatorNode2("/", "divide", [_derivative(arg0, constNodes), arg1]);
        }
        if (constNodes[arg0] !== void 0) {
          return new OperatorNode2("*", "multiply", [new OperatorNode2("-", "unaryMinus", [arg0]), new OperatorNode2("/", "divide", [_derivative(arg1, constNodes), new OperatorNode2("^", "pow", [arg1.clone(), createConstantNode2(2)])])]);
        }
        return new OperatorNode2("/", "divide", [new OperatorNode2("-", "subtract", [new OperatorNode2("*", "multiply", [_derivative(arg0, constNodes), arg1.clone()]), new OperatorNode2("*", "multiply", [arg0.clone(), _derivative(arg1, constNodes)])]), new OperatorNode2("^", "pow", [arg1.clone(), createConstantNode2(2)])]);
      }
      if (node.op === "^" && node.isBinary()) {
        var _arg = node.args[0];
        var _arg2 = node.args[1];
        if (constNodes[_arg] !== void 0) {
          if (isConstantNode(_arg) && (isZero2(_arg.value) || equal2(_arg.value, 1))) {
            return createConstantNode2(0);
          }
          return new OperatorNode2("*", "multiply", [node, new OperatorNode2("*", "multiply", [new FunctionNode2("log", [_arg.clone()]), _derivative(_arg2.clone(), constNodes)])]);
        }
        if (constNodes[_arg2] !== void 0) {
          if (isConstantNode(_arg2)) {
            if (isZero2(_arg2.value)) {
              return createConstantNode2(0);
            }
            if (equal2(_arg2.value, 1)) {
              return _derivative(_arg, constNodes);
            }
          }
          var powMinusOne = new OperatorNode2("^", "pow", [_arg.clone(), new OperatorNode2("-", "subtract", [_arg2, createConstantNode2(1)])]);
          return new OperatorNode2("*", "multiply", [_arg2.clone(), new OperatorNode2("*", "multiply", [_derivative(_arg, constNodes), powMinusOne])]);
        }
        return new OperatorNode2("*", "multiply", [new OperatorNode2("^", "pow", [_arg.clone(), _arg2.clone()]), new OperatorNode2("+", "add", [new OperatorNode2("*", "multiply", [_derivative(_arg, constNodes), new OperatorNode2("/", "divide", [_arg2.clone(), _arg.clone()])]), new OperatorNode2("*", "multiply", [_derivative(_arg2, constNodes), new FunctionNode2("log", [_arg.clone()])])])]);
      }
      throw new Error('Cannot process operator "' + node.op + '" in derivative: the operator is not supported, undefined, or the number of arguments passed to it are not supported');
    }
  });
  function createConstantNode2(value, valueType) {
    return new ConstantNode2(numeric3(value, config2.number));
  }
  return derivative2;
});
var name$p = "rationalize";
var dependencies$p = ["config", "typed", "equal", "isZero", "add", "subtract", "multiply", "divide", "pow", "parse", "simplifyConstant", "simplifyCore", "simplify", "?bignumber", "?fraction", "mathWithTransform", "matrix", "AccessorNode", "ArrayNode", "ConstantNode", "FunctionNode", "IndexNode", "ObjectNode", "OperatorNode", "SymbolNode", "ParenthesisNode"];
var createRationalize = /* @__PURE__ */ factory(name$p, dependencies$p, (_ref) => {
  var {
    config: config2,
    typed: typed2,
    equal: equal2,
    isZero: isZero2,
    add: add2,
    subtract: subtract2,
    multiply: multiply2,
    divide: divide2,
    pow: pow2,
    parse: parse2,
    simplifyConstant: simplifyConstant2,
    simplifyCore: simplifyCore2,
    simplify: simplify2,
    fraction: fraction2,
    bignumber: bignumber2,
    mathWithTransform: mathWithTransform2,
    matrix: matrix2,
    AccessorNode: AccessorNode2,
    ArrayNode: ArrayNode2,
    ConstantNode: ConstantNode2,
    FunctionNode: FunctionNode2,
    IndexNode: IndexNode2,
    ObjectNode: ObjectNode2,
    OperatorNode: OperatorNode2,
    SymbolNode: SymbolNode2,
    ParenthesisNode: ParenthesisNode2
  } = _ref;
  function _rationalize(expr) {
    var scope = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var detailed = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    var setRules = rulesRationalize();
    var polyRet = polynomial(expr, scope, true, setRules.firstRules);
    var nVars = polyRet.variables.length;
    var noExactFractions = {
      exactFractions: false
    };
    var withExactFractions = {
      exactFractions: true
    };
    expr = polyRet.expression;
    if (nVars >= 1) {
      expr = expandPower(expr);
      var sBefore;
      var rules;
      var eDistrDiv = true;
      var redoInic = false;
      expr = simplify2(expr, setRules.firstRules, {}, noExactFractions);
      var s;
      while (true) {
        rules = eDistrDiv ? setRules.distrDivRules : setRules.sucDivRules;
        expr = simplify2(expr, rules, {}, withExactFractions);
        eDistrDiv = !eDistrDiv;
        s = expr.toString();
        if (s === sBefore) {
          break;
        }
        redoInic = true;
        sBefore = s;
      }
      if (redoInic) {
        expr = simplify2(expr, setRules.firstRulesAgain, {}, noExactFractions);
      }
      expr = simplify2(expr, setRules.finalRules, {}, noExactFractions);
    }
    var coefficients = [];
    var retRationalize = {};
    if (expr.type === "OperatorNode" && expr.isBinary() && expr.op === "/") {
      if (nVars === 1) {
        expr.args[0] = polyToCanonical(expr.args[0], coefficients);
        expr.args[1] = polyToCanonical(expr.args[1]);
      }
      if (detailed) {
        retRationalize.numerator = expr.args[0];
        retRationalize.denominator = expr.args[1];
      }
    } else {
      if (nVars === 1) {
        expr = polyToCanonical(expr, coefficients);
      }
      if (detailed) {
        retRationalize.numerator = expr;
        retRationalize.denominator = null;
      }
    }
    if (!detailed)
      return expr;
    retRationalize.coefficients = coefficients;
    retRationalize.variables = polyRet.variables;
    retRationalize.expression = expr;
    return retRationalize;
  }
  return typed2(name$p, {
    Node: _rationalize,
    "Node, boolean": (expr, detailed) => _rationalize(expr, {}, detailed),
    "Node, Object": _rationalize,
    "Node, Object, boolean": _rationalize
  });
  function polynomial(expr, scope, extended, rules) {
    var variables = [];
    var node = simplify2(expr, rules, scope, {
      exactFractions: false
    });
    extended = !!extended;
    var oper = "+-*" + (extended ? "/" : "");
    recPoly(node);
    var retFunc = {};
    retFunc.expression = node;
    retFunc.variables = variables;
    return retFunc;
    function recPoly(node2) {
      var tp = node2.type;
      if (tp === "FunctionNode") {
        throw new Error("There is an unsolved function call");
      } else if (tp === "OperatorNode") {
        if (node2.op === "^") {
          if (node2.args[1].type !== "ConstantNode" || !isInteger(parseFloat(node2.args[1].value))) {
            throw new Error("There is a non-integer exponent");
          } else {
            recPoly(node2.args[0]);
          }
        } else {
          if (!oper.includes(node2.op)) {
            throw new Error("Operator " + node2.op + " invalid in polynomial expression");
          }
          for (var i2 = 0; i2 < node2.args.length; i2++) {
            recPoly(node2.args[i2]);
          }
        }
      } else if (tp === "SymbolNode") {
        var _name = node2.name;
        var pos = variables.indexOf(_name);
        if (pos === -1) {
          variables.push(_name);
        }
      } else if (tp === "ParenthesisNode") {
        recPoly(node2.content);
      } else if (tp !== "ConstantNode") {
        throw new Error("type " + tp + " is not allowed in polynomial expression");
      }
    }
  }
  function rulesRationalize() {
    var oldRules = [
      simplifyCore2,
      // sCore
      {
        l: "n+n",
        r: "2*n"
      },
      {
        l: "n+-n",
        r: "0"
      },
      simplifyConstant2,
      // sConstant
      {
        l: "n*(n1^-1)",
        r: "n/n1"
      },
      {
        l: "n*n1^-n2",
        r: "n/n1^n2"
      },
      {
        l: "n1^-1",
        r: "1/n1"
      },
      {
        l: "n*(n1/n2)",
        r: "(n*n1)/n2"
      },
      {
        l: "1*n",
        r: "n"
      }
    ];
    var rulesFirst = [
      {
        l: "(-n1)/(-n2)",
        r: "n1/n2"
      },
      // Unary division
      {
        l: "(-n1)*(-n2)",
        r: "n1*n2"
      },
      // Unary multiplication
      {
        l: "n1--n2",
        r: "n1+n2"
      },
      // '--' elimination
      {
        l: "n1-n2",
        r: "n1+(-n2)"
      },
      // Subtraction turn into add with un�ry minus
      {
        l: "(n1+n2)*n3",
        r: "(n1*n3 + n2*n3)"
      },
      // Distributive 1
      {
        l: "n1*(n2+n3)",
        r: "(n1*n2+n1*n3)"
      },
      // Distributive 2
      {
        l: "c1*n + c2*n",
        r: "(c1+c2)*n"
      },
      // Joining constants
      {
        l: "c1*n + n",
        r: "(c1+1)*n"
      },
      // Joining constants
      {
        l: "c1*n - c2*n",
        r: "(c1-c2)*n"
      },
      // Joining constants
      {
        l: "c1*n - n",
        r: "(c1-1)*n"
      },
      // Joining constants
      {
        l: "v/c",
        r: "(1/c)*v"
      },
      // variable/constant (new!)
      {
        l: "v/-c",
        r: "-(1/c)*v"
      },
      // variable/constant (new!)
      {
        l: "-v*-c",
        r: "c*v"
      },
      // Inversion constant and variable 1
      {
        l: "-v*c",
        r: "-c*v"
      },
      // Inversion constant and variable 2
      {
        l: "v*-c",
        r: "-c*v"
      },
      // Inversion constant and variable 3
      {
        l: "v*c",
        r: "c*v"
      },
      // Inversion constant and variable 4
      {
        l: "-(-n1*n2)",
        r: "(n1*n2)"
      },
      // Unary propagation
      {
        l: "-(n1*n2)",
        r: "(-n1*n2)"
      },
      // Unary propagation
      {
        l: "-(-n1+n2)",
        r: "(n1-n2)"
      },
      // Unary propagation
      {
        l: "-(n1+n2)",
        r: "(-n1-n2)"
      },
      // Unary propagation
      {
        l: "(n1^n2)^n3",
        r: "(n1^(n2*n3))"
      },
      // Power to Power
      {
        l: "-(-n1/n2)",
        r: "(n1/n2)"
      },
      // Division and Unary
      {
        l: "-(n1/n2)",
        r: "(-n1/n2)"
      }
    ];
    var rulesDistrDiv = [
      {
        l: "(n1/n2 + n3/n4)",
        r: "((n1*n4 + n3*n2)/(n2*n4))"
      },
      // Sum of fractions
      {
        l: "(n1/n2 + n3)",
        r: "((n1 + n3*n2)/n2)"
      },
      // Sum fraction with number 1
      {
        l: "(n1 + n2/n3)",
        r: "((n1*n3 + n2)/n3)"
      }
    ];
    var rulesSucDiv = [
      {
        l: "(n1/(n2/n3))",
        r: "((n1*n3)/n2)"
      },
      // Division simplification
      {
        l: "(n1/n2/n3)",
        r: "(n1/(n2*n3))"
      }
    ];
    var setRules = {};
    setRules.firstRules = oldRules.concat(rulesFirst, rulesSucDiv);
    setRules.distrDivRules = rulesDistrDiv;
    setRules.sucDivRules = rulesSucDiv;
    setRules.firstRulesAgain = oldRules.concat(rulesFirst);
    setRules.finalRules = [
      simplifyCore2,
      // simplify.rules[0]
      {
        l: "n*-n",
        r: "-n^2"
      },
      // Joining multiply with power 1
      {
        l: "n*n",
        r: "n^2"
      },
      // Joining multiply with power 2
      simplifyConstant2,
      // simplify.rules[14] old 3rd index in oldRules
      {
        l: "n*-n^n1",
        r: "-n^(n1+1)"
      },
      // Joining multiply with power 3
      {
        l: "n*n^n1",
        r: "n^(n1+1)"
      },
      // Joining multiply with power 4
      {
        l: "n^n1*-n^n2",
        r: "-n^(n1+n2)"
      },
      // Joining multiply with power 5
      {
        l: "n^n1*n^n2",
        r: "n^(n1+n2)"
      },
      // Joining multiply with power 6
      {
        l: "n^n1*-n",
        r: "-n^(n1+1)"
      },
      // Joining multiply with power 7
      {
        l: "n^n1*n",
        r: "n^(n1+1)"
      },
      // Joining multiply with power 8
      {
        l: "n^n1/-n",
        r: "-n^(n1-1)"
      },
      // Joining multiply with power 8
      {
        l: "n^n1/n",
        r: "n^(n1-1)"
      },
      // Joining division with power 1
      {
        l: "n/-n^n1",
        r: "-n^(1-n1)"
      },
      // Joining division with power 2
      {
        l: "n/n^n1",
        r: "n^(1-n1)"
      },
      // Joining division with power 3
      {
        l: "n^n1/-n^n2",
        r: "n^(n1-n2)"
      },
      // Joining division with power 4
      {
        l: "n^n1/n^n2",
        r: "n^(n1-n2)"
      },
      // Joining division with power 5
      {
        l: "n1+(-n2*n3)",
        r: "n1-n2*n3"
      },
      // Solving useless parenthesis 1
      {
        l: "v*(-c)",
        r: "-c*v"
      },
      // Solving useless unary 2
      {
        l: "n1+-n2",
        r: "n1-n2"
      },
      // Solving +- together (new!)
      {
        l: "v*c",
        r: "c*v"
      },
      // inversion constant with variable
      {
        l: "(n1^n2)^n3",
        r: "(n1^(n2*n3))"
      }
      // Power to Power
    ];
    return setRules;
  }
  function expandPower(node, parent, indParent) {
    var tp = node.type;
    var internal = arguments.length > 1;
    if (tp === "OperatorNode" && node.isBinary()) {
      var does = false;
      var val;
      if (node.op === "^") {
        if ((node.args[0].type === "ParenthesisNode" || node.args[0].type === "OperatorNode") && node.args[1].type === "ConstantNode") {
          val = parseFloat(node.args[1].value);
          does = val >= 2 && isInteger(val);
        }
      }
      if (does) {
        if (val > 2) {
          var nEsqTopo = node.args[0];
          var nDirTopo = new OperatorNode2("^", "pow", [node.args[0].cloneDeep(), new ConstantNode2(val - 1)]);
          node = new OperatorNode2("*", "multiply", [nEsqTopo, nDirTopo]);
        } else {
          node = new OperatorNode2("*", "multiply", [node.args[0], node.args[0].cloneDeep()]);
        }
        if (internal) {
          if (indParent === "content") {
            parent.content = node;
          } else {
            parent.args[indParent] = node;
          }
        }
      }
    }
    if (tp === "ParenthesisNode") {
      expandPower(node.content, node, "content");
    } else if (tp !== "ConstantNode" && tp !== "SymbolNode") {
      for (var i2 = 0; i2 < node.args.length; i2++) {
        expandPower(node.args[i2], node, i2);
      }
    }
    if (!internal) {
      return node;
    }
  }
  function polyToCanonical(node, coefficients) {
    if (coefficients === void 0) {
      coefficients = [];
    }
    coefficients[0] = 0;
    var o = {};
    o.cte = 1;
    o.oper = "+";
    o.fire = "";
    var maxExpo = 0;
    var varname = "";
    recurPol(node, null, o);
    maxExpo = coefficients.length - 1;
    var first = true;
    var no;
    for (var i2 = maxExpo; i2 >= 0; i2--) {
      if (coefficients[i2] === 0)
        continue;
      var n1 = new ConstantNode2(first ? coefficients[i2] : Math.abs(coefficients[i2]));
      var op = coefficients[i2] < 0 ? "-" : "+";
      if (i2 > 0) {
        var n2 = new SymbolNode2(varname);
        if (i2 > 1) {
          var n3 = new ConstantNode2(i2);
          n2 = new OperatorNode2("^", "pow", [n2, n3]);
        }
        if (coefficients[i2] === -1 && first) {
          n1 = new OperatorNode2("-", "unaryMinus", [n2]);
        } else if (Math.abs(coefficients[i2]) === 1) {
          n1 = n2;
        } else {
          n1 = new OperatorNode2("*", "multiply", [n1, n2]);
        }
      }
      if (first) {
        no = n1;
      } else if (op === "+") {
        no = new OperatorNode2("+", "add", [no, n1]);
      } else {
        no = new OperatorNode2("-", "subtract", [no, n1]);
      }
      first = false;
    }
    if (first) {
      return new ConstantNode2(0);
    } else {
      return no;
    }
    function recurPol(node2, noPai, o2) {
      var tp = node2.type;
      if (tp === "FunctionNode") {
        throw new Error("There is an unsolved function call");
      } else if (tp === "OperatorNode") {
        if (!"+-*^".includes(node2.op))
          throw new Error("Operator " + node2.op + " invalid");
        if (noPai !== null) {
          if ((node2.fn === "unaryMinus" || node2.fn === "pow") && noPai.fn !== "add" && noPai.fn !== "subtract" && noPai.fn !== "multiply") {
            throw new Error("Invalid " + node2.op + " placing");
          }
          if ((node2.fn === "subtract" || node2.fn === "add" || node2.fn === "multiply") && noPai.fn !== "add" && noPai.fn !== "subtract") {
            throw new Error("Invalid " + node2.op + " placing");
          }
          if ((node2.fn === "subtract" || node2.fn === "add" || node2.fn === "unaryMinus") && o2.noFil !== 0) {
            throw new Error("Invalid " + node2.op + " placing");
          }
        }
        if (node2.op === "^" || node2.op === "*") {
          o2.fire = node2.op;
        }
        for (var _i = 0; _i < node2.args.length; _i++) {
          if (node2.fn === "unaryMinus")
            o2.oper = "-";
          if (node2.op === "+" || node2.fn === "subtract") {
            o2.fire = "";
            o2.cte = 1;
            o2.oper = _i === 0 ? "+" : node2.op;
          }
          o2.noFil = _i;
          recurPol(node2.args[_i], node2, o2);
        }
      } else if (tp === "SymbolNode") {
        if (node2.name !== varname && varname !== "") {
          throw new Error("There is more than one variable");
        }
        varname = node2.name;
        if (noPai === null) {
          coefficients[1] = 1;
          return;
        }
        if (noPai.op === "^" && o2.noFil !== 0) {
          throw new Error("In power the variable should be the first parameter");
        }
        if (noPai.op === "*" && o2.noFil !== 1) {
          throw new Error("In multiply the variable should be the second parameter");
        }
        if (o2.fire === "" || o2.fire === "*") {
          if (maxExpo < 1)
            coefficients[1] = 0;
          coefficients[1] += o2.cte * (o2.oper === "+" ? 1 : -1);
          maxExpo = Math.max(1, maxExpo);
        }
      } else if (tp === "ConstantNode") {
        var valor = parseFloat(node2.value);
        if (noPai === null) {
          coefficients[0] = valor;
          return;
        }
        if (noPai.op === "^") {
          if (o2.noFil !== 1)
            throw new Error("Constant cannot be powered");
          if (!isInteger(valor) || valor <= 0) {
            throw new Error("Non-integer exponent is not allowed");
          }
          for (var _i2 = maxExpo + 1; _i2 < valor; _i2++)
            coefficients[_i2] = 0;
          if (valor > maxExpo)
            coefficients[valor] = 0;
          coefficients[valor] += o2.cte * (o2.oper === "+" ? 1 : -1);
          maxExpo = Math.max(valor, maxExpo);
          return;
        }
        o2.cte = valor;
        if (o2.fire === "") {
          coefficients[0] += o2.cte * (o2.oper === "+" ? 1 : -1);
        }
      } else {
        throw new Error("Type " + tp + " is not allowed");
      }
    }
  }
});
var name$o = "reviver";
var dependencies$o = ["classes"];
var createReviver = /* @__PURE__ */ factory(name$o, dependencies$o, (_ref) => {
  var {
    classes: classes2
  } = _ref;
  return function reviver2(key, value) {
    var constructor = classes2[value && value.mathjs];
    if (constructor && typeof constructor.fromJSON === "function") {
      return constructor.fromJSON(value);
    }
    return value;
  };
});
var name$n = "apply";
var dependencies$n = ["typed", "isInteger"];
var createApplyTransform = /* @__PURE__ */ factory(name$n, dependencies$n, (_ref) => {
  var {
    typed: typed2,
    isInteger: isInteger2
  } = _ref;
  var apply2 = createApply({
    typed: typed2,
    isInteger: isInteger2
  });
  return typed2("apply", {
    "...any": function any(args) {
      var dim = args[1];
      if (isNumber(dim)) {
        args[1] = dim - 1;
      } else if (isBigNumber(dim)) {
        args[1] = dim.minus(1);
      }
      try {
        return apply2.apply(null, args);
      } catch (err) {
        throw errorTransform(err);
      }
    }
  });
}, {
  isTransformFunction: true
});
var name$m = "column";
var dependencies$m = ["typed", "Index", "matrix", "range"];
var createColumnTransform = /* @__PURE__ */ factory(name$m, dependencies$m, (_ref) => {
  var {
    typed: typed2,
    Index: Index2,
    matrix: matrix2,
    range: range2
  } = _ref;
  var column2 = createColumn({
    typed: typed2,
    Index: Index2,
    matrix: matrix2,
    range: range2
  });
  return typed2("column", {
    "...any": function any(args) {
      var lastIndex = args.length - 1;
      var last = args[lastIndex];
      if (isNumber(last)) {
        args[lastIndex] = last - 1;
      }
      try {
        return column2.apply(null, args);
      } catch (err) {
        throw errorTransform(err);
      }
    }
  });
}, {
  isTransformFunction: true
});
function compileInlineExpression(expression, math2, scope) {
  var symbol = expression.filter(function(node) {
    return isSymbolNode(node) && !(node.name in math2) && !scope.has(node.name);
  })[0];
  if (!symbol) {
    throw new Error('No undefined variable found in inline expression "' + expression + '"');
  }
  var name2 = symbol.name;
  var argsScope = /* @__PURE__ */ new Map();
  var subScope = new PartitionedMap(scope, argsScope, /* @__PURE__ */ new Set([name2]));
  var eq = expression.compile();
  return function inlineExpression(x) {
    argsScope.set(name2, x);
    return eq.evaluate(subScope);
  };
}
var name$l = "filter";
var dependencies$l = ["typed"];
var createFilterTransform = /* @__PURE__ */ factory(name$l, dependencies$l, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  function filterTransform(args, math2, scope) {
    var x, callback;
    if (args[0]) {
      x = args[0].compile().evaluate(scope);
    }
    if (args[1]) {
      if (isSymbolNode(args[1]) || isFunctionAssignmentNode(args[1])) {
        callback = args[1].compile().evaluate(scope);
      } else {
        callback = compileInlineExpression(args[1], math2, scope);
      }
    }
    return filter2(x, callback);
  }
  filterTransform.rawArgs = true;
  var filter2 = typed2("filter", {
    "Array, function": _filter,
    "Matrix, function": function MatrixFunction(x, test) {
      return x.create(_filter(x.toArray(), test));
    },
    "Array, RegExp": filterRegExp,
    "Matrix, RegExp": function MatrixRegExp(x, test) {
      return x.create(filterRegExp(x.toArray(), test));
    }
  });
  return filterTransform;
}, {
  isTransformFunction: true
});
function _filter(x, callback) {
  return filter(x, function(value, index2, array) {
    return applyCallback(callback, value, [index2 + 1], array, "filter");
  });
}
var name$k = "forEach";
var dependencies$k = ["typed"];
var createForEachTransform = /* @__PURE__ */ factory(name$k, dependencies$k, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  function forEachTransform(args, math2, scope) {
    var x, callback;
    if (args[0]) {
      x = args[0].compile().evaluate(scope);
    }
    if (args[1]) {
      if (isSymbolNode(args[1]) || isFunctionAssignmentNode(args[1])) {
        callback = args[1].compile().evaluate(scope);
      } else {
        callback = compileInlineExpression(args[1], math2, scope);
      }
    }
    return _forEach(x, callback);
  }
  forEachTransform.rawArgs = true;
  var _forEach = typed2("forEach", {
    "Array | Matrix, function": function ArrayMatrixFunction(array, callback) {
      var recurse = function recurse2(value, index2) {
        if (Array.isArray(value)) {
          forEach(value, function(child, i2) {
            recurse2(child, index2.concat(i2 + 1));
          });
        } else {
          return applyCallback(callback, value, index2, array, "forEach");
        }
      };
      recurse(array.valueOf(), []);
    }
  });
  return forEachTransform;
}, {
  isTransformFunction: true
});
var name$j = "index";
var dependencies$j = ["Index", "getMatrixDataType"];
var createIndexTransform = /* @__PURE__ */ factory(name$j, dependencies$j, (_ref) => {
  var {
    Index: Index2,
    getMatrixDataType: getMatrixDataType2
  } = _ref;
  return function indexTransform() {
    var args = [];
    for (var i2 = 0, ii = arguments.length; i2 < ii; i2++) {
      var arg2 = arguments[i2];
      if (isRange(arg2)) {
        arg2.start--;
        arg2.end -= arg2.step > 0 ? 0 : 2;
      } else if (arg2 && arg2.isSet === true) {
        arg2 = arg2.map(function(v) {
          return v - 1;
        });
      } else if (isArray(arg2) || isMatrix(arg2)) {
        if (getMatrixDataType2(arg2) !== "boolean") {
          arg2 = arg2.map(function(v) {
            return v - 1;
          });
        }
      } else if (isNumber(arg2)) {
        arg2--;
      } else if (isBigNumber(arg2)) {
        arg2 = arg2.toNumber() - 1;
      } else if (typeof arg2 === "string")
        ;
      else {
        throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");
      }
      args[i2] = arg2;
    }
    var res = new Index2();
    Index2.apply(res, args);
    return res;
  };
}, {
  isTransformFunction: true
});
var name$i = "map";
var dependencies$i = ["typed"];
var createMapTransform = /* @__PURE__ */ factory(name$i, dependencies$i, (_ref) => {
  var {
    typed: typed2
  } = _ref;
  function mapTransform(args, math2, scope) {
    var x, callback;
    if (args[0]) {
      x = args[0].compile().evaluate(scope);
    }
    if (args[1]) {
      if (isSymbolNode(args[1]) || isFunctionAssignmentNode(args[1])) {
        callback = args[1].compile().evaluate(scope);
      } else {
        callback = compileInlineExpression(args[1], math2, scope);
      }
    }
    return map2(x, callback);
  }
  mapTransform.rawArgs = true;
  var map2 = typed2("map", {
    "Array, function": function ArrayFunction(x, callback) {
      return _map(x, callback, x);
    },
    "Matrix, function": function MatrixFunction(x, callback) {
      return x.create(_map(x.valueOf(), callback, x));
    }
  });
  return mapTransform;
}, {
  isTransformFunction: true
});
function _map(array, callback, orig) {
  function recurse(value, index2) {
    if (Array.isArray(value)) {
      return map(value, function(child, i2) {
        return recurse(child, index2.concat(i2 + 1));
      });
    } else {
      return applyCallback(callback, value, index2, orig, "map");
    }
  }
  return recurse(array, []);
}
function lastDimToZeroBase(args) {
  if (args.length === 2 && isCollection(args[0])) {
    args = args.slice();
    var dim = args[1];
    if (isNumber(dim)) {
      args[1] = dim - 1;
    } else if (isBigNumber(dim)) {
      args[1] = dim.minus(1);
    }
  }
  return args;
}
var name$h = "max";
var dependencies$h = ["typed", "config", "numeric", "larger"];
var createMaxTransform = /* @__PURE__ */ factory(name$h, dependencies$h, (_ref) => {
  var {
    typed: typed2,
    config: config2,
    numeric: numeric3,
    larger: larger2
  } = _ref;
  var max2 = createMax({
    typed: typed2,
    config: config2,
    numeric: numeric3,
    larger: larger2
  });
  return typed2("max", {
    "...any": function any(args) {
      args = lastDimToZeroBase(args);
      try {
        return max2.apply(null, args);
      } catch (err) {
        throw errorTransform(err);
      }
    }
  });
}, {
  isTransformFunction: true
});
var name$g = "mean";
var dependencies$g = ["typed", "add", "divide"];
var createMeanTransform = /* @__PURE__ */ factory(name$g, dependencies$g, (_ref) => {
  var {
    typed: typed2,
    add: add2,
    divide: divide2
  } = _ref;
  var mean2 = createMean({
    typed: typed2,
    add: add2,
    divide: divide2
  });
  return typed2("mean", {
    "...any": function any(args) {
      args = lastDimToZeroBase(args);
      try {
        return mean2.apply(null, args);
      } catch (err) {
        throw errorTransform(err);
      }
    }
  });
}, {
  isTransformFunction: true
});
var name$f = "min";
var dependencies$f = ["typed", "config", "numeric", "smaller"];
var createMinTransform = /* @__PURE__ */ factory(name$f, dependencies$f, (_ref) => {
  var {
    typed: typed2,
    config: config2,
    numeric: numeric3,
    smaller: smaller2
  } = _ref;
  var min2 = createMin({
    typed: typed2,
    config: config2,
    numeric: numeric3,
    smaller: smaller2
  });
  return typed2("min", {
    "...any": function any(args) {
      args = lastDimToZeroBase(args);
      try {
        return min2.apply(null, args);
      } catch (err) {
        throw errorTransform(err);
      }
    }
  });
}, {
  isTransformFunction: true
});
var name$e = "range";
var dependencies$e = ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq", "add", "isPositive"];
var createRangeTransform = /* @__PURE__ */ factory(name$e, dependencies$e, (_ref) => {
  var {
    typed: typed2,
    config: config2,
    matrix: matrix2,
    bignumber: bignumber2,
    smaller: smaller2,
    smallerEq: smallerEq2,
    larger: larger2,
    largerEq: largerEq2,
    add: add2,
    isPositive: isPositive2
  } = _ref;
  var range2 = createRange({
    typed: typed2,
    config: config2,
    matrix: matrix2,
    bignumber: bignumber2,
    smaller: smaller2,
    smallerEq: smallerEq2,
    larger: larger2,
    largerEq: largerEq2,
    add: add2,
    isPositive: isPositive2
  });
  return typed2("range", {
    "...any": function any(args) {
      var lastIndex = args.length - 1;
      var last = args[lastIndex];
      if (typeof last !== "boolean") {
        args.push(true);
      }
      return range2.apply(null, args);
    }
  });
}, {
  isTransformFunction: true
});
var name$d = "row";
var dependencies$d = ["typed", "Index", "matrix", "range"];
var createRowTransform = /* @__PURE__ */ factory(name$d, dependencies$d, (_ref) => {
  var {
    typed: typed2,
    Index: Index2,
    matrix: matrix2,
    range: range2
  } = _ref;
  var row2 = createRow({
    typed: typed2,
    Index: Index2,
    matrix: matrix2,
    range: range2
  });
  return typed2("row", {
    "...any": function any(args) {
      var lastIndex = args.length - 1;
      var last = args[lastIndex];
      if (isNumber(last)) {
        args[lastIndex] = last - 1;
      }
      try {
        return row2.apply(null, args);
      } catch (err) {
        throw errorTransform(err);
      }
    }
  });
}, {
  isTransformFunction: true
});
var name$c = "subset";
var dependencies$c = ["typed", "matrix", "zeros", "add"];
var createSubsetTransform = /* @__PURE__ */ factory(name$c, dependencies$c, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    zeros: zeros2,
    add: add2
  } = _ref;
  var subset2 = createSubset({
    typed: typed2,
    matrix: matrix2,
    zeros: zeros2,
    add: add2
  });
  return typed2("subset", {
    "...any": function any(args) {
      try {
        return subset2.apply(null, args);
      } catch (err) {
        throw errorTransform(err);
      }
    }
  });
}, {
  isTransformFunction: true
});
var name$b = "concat";
var dependencies$b = ["typed", "matrix", "isInteger"];
var createConcatTransform = /* @__PURE__ */ factory(name$b, dependencies$b, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    isInteger: isInteger2
  } = _ref;
  var concat2 = createConcat({
    typed: typed2,
    matrix: matrix2,
    isInteger: isInteger2
  });
  return typed2("concat", {
    "...any": function any(args) {
      var lastIndex = args.length - 1;
      var last = args[lastIndex];
      if (isNumber(last)) {
        args[lastIndex] = last - 1;
      } else if (isBigNumber(last)) {
        args[lastIndex] = last.minus(1);
      }
      try {
        return concat2.apply(null, args);
      } catch (err) {
        throw errorTransform(err);
      }
    }
  });
}, {
  isTransformFunction: true
});
var name$a = "diff";
var dependencies$a = ["typed", "matrix", "subtract", "number", "bignumber"];
var createDiffTransform = /* @__PURE__ */ factory(name$a, dependencies$a, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    subtract: subtract2,
    number: number2,
    bignumber: bignumber2
  } = _ref;
  var diff2 = createDiff({
    typed: typed2,
    matrix: matrix2,
    subtract: subtract2,
    number: number2,
    bignumber: bignumber2
  });
  return typed2(name$a, {
    "...any": function any(args) {
      args = lastDimToZeroBase(args);
      try {
        return diff2.apply(null, args);
      } catch (err) {
        throw errorTransform(err);
      }
    }
  });
}, {
  isTransformFunction: true
});
var name$9 = "std";
var dependencies$9 = ["typed", "map", "sqrt", "variance"];
var createStdTransform = /* @__PURE__ */ factory(name$9, dependencies$9, (_ref) => {
  var {
    typed: typed2,
    map: map2,
    sqrt: sqrt2,
    variance: variance2
  } = _ref;
  var std2 = createStd({
    typed: typed2,
    map: map2,
    sqrt: sqrt2,
    variance: variance2
  });
  return typed2("std", {
    "...any": function any(args) {
      args = lastDimToZeroBase(args);
      try {
        return std2.apply(null, args);
      } catch (err) {
        throw errorTransform(err);
      }
    }
  });
}, {
  isTransformFunction: true
});
var name$8 = "sum";
var dependencies$8 = ["typed", "config", "add", "numeric"];
var createSumTransform = /* @__PURE__ */ factory(name$8, dependencies$8, (_ref) => {
  var {
    typed: typed2,
    config: config2,
    add: add2,
    numeric: numeric3
  } = _ref;
  var sum2 = createSum({
    typed: typed2,
    config: config2,
    add: add2,
    numeric: numeric3
  });
  return typed2(name$8, {
    "...any": function any(args) {
      args = lastDimToZeroBase(args);
      try {
        return sum2.apply(null, args);
      } catch (err) {
        throw errorTransform(err);
      }
    }
  });
}, {
  isTransformFunction: true
});
var name$7 = "quantileSeq";
var dependencies$7 = ["typed", "bignumber", "add", "subtract", "divide", "multiply", "partitionSelect", "compare", "isInteger", "smaller", "smallerEq", "larger"];
var createQuantileSeqTransform = /* @__PURE__ */ factory(name$7, dependencies$7, (_ref) => {
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
  var quantileSeq2 = createQuantileSeq({
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
  });
  return typed2("quantileSeq", {
    "Array | Matrix, number | BigNumber": quantileSeq2,
    "Array | Matrix, number | BigNumber, number": (arr, prob, dim) => quantileSeq2(arr, prob, dimToZeroBase(dim)),
    "Array | Matrix, number | BigNumber, boolean": quantileSeq2,
    "Array | Matrix, number | BigNumber, boolean, number": (arr, prob, sorted, dim) => quantileSeq2(arr, prob, sorted, dimToZeroBase(dim)),
    "Array | Matrix, Array | Matrix": quantileSeq2,
    "Array | Matrix, Array | Matrix, number": (data, prob, dim) => quantileSeq2(data, prob, dimToZeroBase(dim)),
    "Array | Matrix, Array | Matrix, boolean": quantileSeq2,
    "Array | Matrix, Array | Matrix, boolean, number": (data, prob, sorted, dim) => quantileSeq2(data, prob, sorted, dimToZeroBase(dim))
  });
  function dimToZeroBase(dim) {
    return lastDimToZeroBase([[], dim])[1];
  }
}, {
  isTransformFunction: true
});
var name$6 = "cumsum";
var dependencies$6 = ["typed", "add", "unaryPlus"];
var createCumSumTransform = /* @__PURE__ */ factory(name$6, dependencies$6, (_ref) => {
  var {
    typed: typed2,
    add: add2,
    unaryPlus: unaryPlus2
  } = _ref;
  var cumsum2 = createCumSum({
    typed: typed2,
    add: add2,
    unaryPlus: unaryPlus2
  });
  return typed2(name$6, {
    "...any": function any(args) {
      if (args.length === 2 && isCollection(args[0])) {
        var dim = args[1];
        if (isNumber(dim)) {
          args[1] = dim - 1;
        } else if (isBigNumber(dim)) {
          args[1] = dim.minus(1);
        }
      }
      try {
        return cumsum2.apply(null, args);
      } catch (err) {
        throw errorTransform(err);
      }
    }
  });
}, {
  isTransformFunction: true
});
var name$5 = "variance";
var dependencies$5 = ["typed", "add", "subtract", "multiply", "divide", "apply", "isNaN"];
var createVarianceTransform = /* @__PURE__ */ factory(name$5, dependencies$5, (_ref) => {
  var {
    typed: typed2,
    add: add2,
    subtract: subtract2,
    multiply: multiply2,
    divide: divide2,
    apply: apply2,
    isNaN: isNaN2
  } = _ref;
  var variance2 = createVariance({
    typed: typed2,
    add: add2,
    subtract: subtract2,
    multiply: multiply2,
    divide: divide2,
    apply: apply2,
    isNaN: isNaN2
  });
  return typed2(name$5, {
    "...any": function any(args) {
      args = lastDimToZeroBase(args);
      try {
        return variance2.apply(null, args);
      } catch (err) {
        throw errorTransform(err);
      }
    }
  });
}, {
  isTransformFunction: true
});
var name$4 = "print";
var dependencies$4 = ["typed", "matrix", "zeros", "add"];
var createPrintTransform = /* @__PURE__ */ factory(name$4, dependencies$4, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    zeros: zeros2,
    add: add2
  } = _ref;
  var print2 = createPrint({
    typed: typed2,
    matrix: matrix2,
    zeros: zeros2,
    add: add2
  });
  return typed2(name$4, {
    "string, Object | Array": function stringObjectArray(template, values) {
      return print2(_convertTemplateToZeroBasedIndex(template), values);
    },
    "string, Object | Array, number | Object": function stringObjectArrayNumberObject(template, values, options) {
      return print2(_convertTemplateToZeroBasedIndex(template), values, options);
    }
  });
  function _convertTemplateToZeroBasedIndex(template) {
    return template.replace(printTemplate, (x) => {
      var parts = x.slice(1).split(".");
      var result = parts.map(function(part) {
        if (!isNaN(part) && part.length > 0) {
          return parseInt(part) - 1;
        } else {
          return part;
        }
      });
      return "$" + result.join(".");
    });
  }
}, {
  isTransformFunction: true
});
var name$3 = "and";
var dependencies$3 = ["typed", "matrix", "zeros", "add", "equalScalar", "not", "concat"];
var createAndTransform = /* @__PURE__ */ factory(name$3, dependencies$3, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    zeros: zeros2,
    not: not2,
    concat: concat2
  } = _ref;
  var and2 = createAnd({
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    zeros: zeros2,
    not: not2,
    concat: concat2
  });
  function andTransform(args, math2, scope) {
    var condition1 = args[0].compile().evaluate(scope);
    if (!isCollection(condition1) && !and2(condition1, true)) {
      return false;
    }
    var condition2 = args[1].compile().evaluate(scope);
    return and2(condition1, condition2);
  }
  andTransform.rawArgs = true;
  return andTransform;
}, {
  isTransformFunction: true
});
var name$2 = "or";
var dependencies$2 = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat"];
var createOrTransform = /* @__PURE__ */ factory(name$2, dependencies$2, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var or2 = createOr({
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  });
  function orTransform(args, math2, scope) {
    var condition1 = args[0].compile().evaluate(scope);
    if (!isCollection(condition1) && or2(condition1, false)) {
      return true;
    }
    var condition2 = args[1].compile().evaluate(scope);
    return or2(condition1, condition2);
  }
  orTransform.rawArgs = true;
  return orTransform;
}, {
  isTransformFunction: true
});
var name$1 = "bitAnd";
var dependencies$1 = ["typed", "matrix", "zeros", "add", "equalScalar", "not", "concat"];
var createBitAndTransform = /* @__PURE__ */ factory(name$1, dependencies$1, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    zeros: zeros2,
    not: not2,
    concat: concat2
  } = _ref;
  var bitAnd2 = createBitAnd({
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    zeros: zeros2,
    not: not2,
    concat: concat2
  });
  function bitAndTransform(args, math2, scope) {
    var condition1 = args[0].compile().evaluate(scope);
    if (!isCollection(condition1)) {
      if (isNaN(condition1)) {
        return NaN;
      }
      if (condition1 === 0 || condition1 === false) {
        return 0;
      }
    }
    var condition2 = args[1].compile().evaluate(scope);
    return bitAnd2(condition1, condition2);
  }
  bitAndTransform.rawArgs = true;
  return bitAndTransform;
}, {
  isTransformFunction: true
});
var name = "bitOr";
var dependencies = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat"];
var createBitOrTransform = /* @__PURE__ */ factory(name, dependencies, (_ref) => {
  var {
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  } = _ref;
  var bitOr2 = createBitOr({
    typed: typed2,
    matrix: matrix2,
    equalScalar: equalScalar2,
    DenseMatrix: DenseMatrix2,
    concat: concat2
  });
  function bitOrTransform(args, math2, scope) {
    var condition1 = args[0].compile().evaluate(scope);
    if (!isCollection(condition1)) {
      if (isNaN(condition1)) {
        return NaN;
      }
      if (condition1 === -1) {
        return -1;
      }
      if (condition1 === true) {
        return 1;
      }
    }
    var condition2 = args[1].compile().evaluate(scope);
    return bitOr2(condition1, condition2);
  }
  bitOrTransform.rawArgs = true;
  return bitOrTransform;
}, {
  isTransformFunction: true
});
var math = {};
var mathWithTransform = {};
var classes = {};
var Node = createNode({
  mathWithTransform
});
var ObjectNode = createObjectNode({
  Node
});
var OperatorNode = createOperatorNode({
  Node
});
var ParenthesisNode = createParenthesisNode({
  Node
});
var RelationalNode = createRelationalNode({
  Node
});
var ArrayNode = createArrayNode({
  Node
});
var BlockNode = createBlockNode({
  Node,
  ResultSet
});
var ConditionalNode = createConditionalNode({
  Node
});
var ConstantNode = createConstantNode({
  Node
});
var RangeNode = createRangeNode({
  Node
});
var reviver = createReviver({
  classes
});
var Chain = createChainClass({
  math,
  typed
});
var FunctionAssignmentNode = createFunctionAssignmentNode({
  Node,
  typed
});
var chain = createChain({
  Chain,
  typed
});
var IndexNode = createIndexNode({
  Node,
  size
});
var AccessorNode = createAccessorNode({
  Node,
  subset
});
var AssignmentNode = createAssignmentNode({
  matrix,
  Node,
  subset
});
var SymbolNode = createSymbolNode({
  Unit,
  Node,
  math
});
var FunctionNode = createFunctionNode({
  Node,
  SymbolNode,
  math
});
var parse = createParse({
  AccessorNode,
  ArrayNode,
  AssignmentNode,
  BlockNode,
  ConditionalNode,
  ConstantNode,
  FunctionAssignmentNode,
  FunctionNode,
  IndexNode,
  ObjectNode,
  OperatorNode,
  ParenthesisNode,
  RangeNode,
  RelationalNode,
  SymbolNode,
  config,
  numeric,
  typed
});
var resolve = createResolve({
  ConstantNode,
  FunctionNode,
  OperatorNode,
  ParenthesisNode,
  parse,
  typed
});
var simplifyConstant = createSimplifyConstant({
  bignumber,
  fraction,
  AccessorNode,
  ArrayNode,
  ConstantNode,
  FunctionNode,
  IndexNode,
  ObjectNode,
  OperatorNode,
  SymbolNode,
  config,
  mathWithTransform,
  matrix,
  typed
});
var compile = createCompile({
  parse,
  typed
});
var simplifyCore = createSimplifyCore({
  AccessorNode,
  ArrayNode,
  ConstantNode,
  FunctionNode,
  IndexNode,
  ObjectNode,
  OperatorNode,
  ParenthesisNode,
  SymbolNode,
  add,
  divide,
  equal,
  isZero,
  multiply,
  parse,
  pow,
  subtract,
  typed
});
var evaluate = createEvaluate({
  parse,
  typed
});
var Help = createHelpClass({
  evaluate
});
var Parser = createParserClass({
  evaluate
});
var simplify = createSimplify({
  bignumber,
  fraction,
  AccessorNode,
  ArrayNode,
  ConstantNode,
  FunctionNode,
  IndexNode,
  ObjectNode,
  OperatorNode,
  ParenthesisNode,
  SymbolNode,
  add,
  config,
  divide,
  equal,
  isZero,
  mathWithTransform,
  matrix,
  multiply,
  parse,
  pow,
  resolve,
  simplifyConstant,
  simplifyCore,
  subtract,
  typed
});
var symbolicEqual = createSymbolicEqual({
  OperatorNode,
  parse,
  simplify,
  typed
});
var leafCount = createLeafCount({
  parse,
  typed
});
var parser = createParser({
  Parser,
  typed
});
var rationalize = createRationalize({
  bignumber,
  fraction,
  AccessorNode,
  ArrayNode,
  ConstantNode,
  FunctionNode,
  IndexNode,
  ObjectNode,
  OperatorNode,
  ParenthesisNode,
  SymbolNode,
  add,
  config,
  divide,
  equal,
  isZero,
  mathWithTransform,
  matrix,
  multiply,
  parse,
  pow,
  simplify,
  simplifyConstant,
  simplifyCore,
  subtract,
  typed
});
var derivative = createDerivative({
  ConstantNode,
  FunctionNode,
  OperatorNode,
  ParenthesisNode,
  SymbolNode,
  config,
  equal,
  isZero,
  numeric,
  parse,
  simplify,
  typed
});
var help = createHelp({
  Help,
  mathWithTransform,
  typed
});
_extends$1(math, {
  e,
  false: _false,
  fineStructure,
  i,
  Infinity: _Infinity,
  LN10,
  LOG10E,
  NaN: _NaN,
  null: _null,
  phi,
  SQRT1_2,
  sackurTetrode,
  tau,
  true: _true,
  "E": e,
  version,
  efimovFactor,
  LN2,
  pi,
  replacer,
  reviver,
  SQRT2,
  typed,
  unaryPlus,
  "PI": pi,
  weakMixingAngle,
  abs,
  acos,
  acot,
  acsc,
  addScalar,
  arg,
  asech,
  asinh,
  atan,
  atanh,
  bignumber,
  bitNot,
  boolean,
  clone: clone$1,
  combinations,
  complex,
  conj,
  cos,
  cot,
  csc,
  cube,
  equalScalar,
  erf,
  exp,
  expm1,
  filter: filter$1,
  forEach: forEach$1,
  format: format$1,
  getMatrixDataType,
  hex,
  im,
  isInteger: isInteger$1,
  isNegative,
  isPositive,
  isZero,
  LOG2E,
  lgamma,
  log10,
  log2,
  map: map$1,
  multiplyScalar,
  not,
  number,
  oct,
  pickRandom,
  print,
  random,
  re,
  sec,
  sign,
  sin,
  splitUnit,
  square,
  string,
  subtractScalar,
  tan,
  typeOf: typeOf$1,
  acosh,
  acsch,
  apply,
  asec,
  bin,
  chain,
  combinationsWithRep,
  cosh,
  csch,
  isNaN: isNaN$1,
  isPrime,
  randomInt,
  sech,
  sinh,
  sparse,
  sqrt,
  tanh,
  unaryMinus,
  acoth,
  coth,
  fraction,
  isNumeric,
  matrix,
  matrixFromFunction,
  mode,
  numeric,
  prod,
  reshape,
  size,
  squeeze,
  transpose,
  xgcd,
  zeros,
  asin,
  cbrt,
  concat,
  count,
  ctranspose,
  diag,
  divideScalar,
  dotDivide,
  equal,
  flatten,
  hasNumericValue,
  identity,
  kron,
  largerEq,
  leftShift,
  lsolve,
  matrixFromColumns,
  nthRoot,
  ones,
  qr,
  resize,
  rightArithShift,
  round,
  smaller,
  subtract,
  to,
  unequal,
  usolve,
  xor,
  add,
  atan2,
  bitAnd,
  bitOr,
  bitXor,
  catalan,
  compare,
  compareText,
  cumsum,
  deepEqual,
  diff,
  distance,
  dot,
  equalText,
  floor,
  gcd,
  hypot,
  larger,
  log,
  lsolveAll,
  matrixFromRows,
  min,
  mod,
  multiply,
  nthRoots,
  or,
  partitionSelect,
  rightLogShift,
  slu,
  subset,
  sum,
  trace,
  usolveAll,
  zpk2tf,
  ceil,
  compareNatural,
  composition,
  cross,
  det,
  dotMultiply,
  fix,
  index,
  intersect,
  invmod,
  lcm,
  log1p,
  max,
  setCartesian,
  setDistinct,
  setIsSubset,
  setPowerset,
  smallerEq,
  sort,
  and,
  range,
  row,
  setDifference,
  setMultiplicity,
  setSymDifference,
  column,
  inv,
  lup,
  pinv,
  pow,
  setIntersect,
  setUnion,
  sqrtm,
  vacuumImpedance,
  wienDisplacement,
  atomicMass,
  bohrMagneton,
  boltzmann,
  conductanceQuantum,
  coulomb,
  deuteronMass,
  dotPow,
  electricConstant,
  elementaryCharge,
  expm,
  faraday,
  fft,
  gamma,
  gravitationConstant,
  hartreeEnergy,
  ifft,
  klitzing,
  loschmidt,
  magneticConstant,
  molarMass,
  molarPlanckConstant,
  neutronMass,
  nuclearMagneton,
  planckCharge,
  planckLength,
  planckTemperature,
  protonMass,
  quantumOfCirculation,
  reducedPlanckConstant,
  rydberg,
  secondRadiation,
  speedOfLight,
  stefanBoltzmann,
  thomsonCrossSection,
  avogadro,
  bohrRadius,
  createUnit,
  divide,
  electronMass,
  factorial,
  firstRadiation,
  gravity,
  inverseConductanceQuantum,
  lusolve,
  magneticFluxQuantum,
  molarMassC12,
  multinomial,
  parse,
  permutations,
  planckMass,
  polynomialRoot,
  resolve,
  setSize,
  simplifyConstant,
  solveODE,
  stirlingS2,
  unit,
  bellNumbers,
  compile,
  eigs,
  fermiCoupling,
  gasConstant,
  kldivergence,
  mean,
  molarVolume,
  planckConstant,
  quantileSeq,
  simplifyCore,
  variance,
  classicalElectronRadius,
  evaluate,
  median,
  simplify,
  symbolicEqual,
  corr,
  freqz,
  leafCount,
  mad,
  parser,
  rationalize,
  std,
  zeta,
  derivative,
  norm,
  rotationMatrix,
  help,
  planckTime,
  schur,
  rotate,
  sylvester,
  lyap,
  config
});
_extends$1(mathWithTransform, math, {
  filter: createFilterTransform({
    typed
  }),
  forEach: createForEachTransform({
    typed
  }),
  map: createMapTransform({
    typed
  }),
  apply: createApplyTransform({
    isInteger: isInteger$1,
    typed
  }),
  or: createOrTransform({
    DenseMatrix,
    concat,
    equalScalar,
    matrix,
    typed
  }),
  and: createAndTransform({
    add,
    concat,
    equalScalar,
    matrix,
    not,
    typed,
    zeros
  }),
  concat: createConcatTransform({
    isInteger: isInteger$1,
    matrix,
    typed
  }),
  max: createMaxTransform({
    config,
    larger,
    numeric,
    typed
  }),
  print: createPrintTransform({
    add,
    matrix,
    typed,
    zeros
  }),
  bitAnd: createBitAndTransform({
    add,
    concat,
    equalScalar,
    matrix,
    not,
    typed,
    zeros
  }),
  diff: createDiffTransform({
    bignumber,
    matrix,
    number,
    subtract,
    typed
  }),
  min: createMinTransform({
    config,
    numeric,
    smaller,
    typed
  }),
  subset: createSubsetTransform({
    add,
    matrix,
    typed,
    zeros
  }),
  bitOr: createBitOrTransform({
    DenseMatrix,
    concat,
    equalScalar,
    matrix,
    typed
  }),
  cumsum: createCumSumTransform({
    add,
    typed,
    unaryPlus
  }),
  index: createIndexTransform({
    Index,
    getMatrixDataType
  }),
  sum: createSumTransform({
    add,
    config,
    numeric,
    typed
  }),
  range: createRangeTransform({
    bignumber,
    matrix,
    add,
    config,
    isPositive,
    larger,
    largerEq,
    smaller,
    smallerEq,
    typed
  }),
  row: createRowTransform({
    Index,
    matrix,
    range,
    typed
  }),
  column: createColumnTransform({
    Index,
    matrix,
    range,
    typed
  }),
  mean: createMeanTransform({
    add,
    divide,
    typed
  }),
  quantileSeq: createQuantileSeqTransform({
    add,
    bignumber,
    compare,
    divide,
    isInteger: isInteger$1,
    larger,
    multiply,
    partitionSelect,
    smaller,
    smallerEq,
    subtract,
    typed
  }),
  variance: createVarianceTransform({
    add,
    apply,
    divide,
    isNaN: isNaN$1,
    multiply,
    subtract,
    typed
  }),
  std: createStdTransform({
    map: map$1,
    sqrt,
    typed,
    variance
  })
});
_extends$1(classes, {
  BigNumber,
  Complex,
  Fraction,
  Matrix,
  Node,
  ObjectNode,
  OperatorNode,
  ParenthesisNode,
  Range,
  RelationalNode,
  ResultSet,
  ArrayNode,
  BlockNode,
  ConditionalNode,
  ConstantNode,
  DenseMatrix,
  RangeNode,
  Chain,
  FunctionAssignmentNode,
  SparseMatrix,
  IndexNode,
  ImmutableDenseMatrix,
  Index,
  AccessorNode,
  AssignmentNode,
  FibonacciHeap,
  Spa,
  Unit,
  SymbolNode,
  FunctionNode,
  Help,
  Parser
});
Chain.createProxy(math);
function analyzeDynamically(nodes2, elements2, analysisInputs2, { time: t, timeStep: dt }) {
  const analysisOutputs2 = {};
  const numSteps = floor(t / dt);
  let x = nodes2.flat();
  let v = Array(x.length).fill(0);
  let m = nodes2.map((_, nid) => {
    const massAnalysisInput = analysisInputs2.find(
      (a) => "mass" in a && "node" in a && a.node === nid
    );
    return (massAnalysisInput == null ? void 0 : massAnalysisInput.mass) ?? [0, 0, 0];
  }).flat();
  for (let step = 0; step < numSteps; step++) {
    let xn = x;
    let y = chain(x).add(multiply(v, dt)).done();
    x = add(
      y,
      chain(F(x, nodes2, elements2, analysisInputs2)).dotDivide(m).multiply(dt ** 2).done()
    );
    v = chain(x).subtract(xn).divide(dt).done();
    analysisInputs2.forEach((a) => {
      if ("node" in a && "support" in a) {
        const nid = a.node;
        a.support.forEach((s, i2) => {
          if (s)
            x[i2 + nid] = 0;
        });
      }
    });
    let output = [];
    const dofs = getDOFs(nodes2);
    nodes2.forEach((_, nid) => {
      const currPosition = subset(
        x,
        index(dofs[nid])
      );
      output.push({
        node: nid,
        position: currPosition
      });
    });
    analysisOutputs2[step] = output;
  }
  return analysisOutputs2;
}
function F(x, nodes2, elements2, analysisInputs2) {
  let f = Array(x.length).fill(0);
  let f_ext = Array(x.length).fill(0);
  analysisInputs2.forEach((item) => {
    if ("load" in item) {
      item.load.forEach((loadValue, index2) => {
        const position = item.node * item.load.length + index2;
        f_ext[position] += (f_ext[position] || 0) + loadValue;
      });
    }
  });
  f = add(f, f_ext);
  elements2.forEach((e2, eid) => {
    const dofs = getDOFs(nodes2);
    const n1_dof = dofs[e2[0]];
    const n2_dof = dofs[e2[1]];
    const x_n1 = subset(x, index(n1_dof));
    const x_n2 = subset(x, index(n2_dof));
    const T = findT3D(x_n1, x_n2);
    const Ti = findT3D(nodes2[e2[0]], nodes2[e2[1]]);
    const r = norm(subtract(nodes2[e2[1]], nodes2[e2[0]]));
    const d1 = multiply(T, x_n1)[0] - multiply(Ti, nodes2[e2[0]])[0];
    const d2 = multiply(T, x_n2)[0] - multiply(Ti, nodes2[e2[1]])[0];
    const property = analysisInputs2.find(
      (analysisInput) => "element" in analysisInput && "elasticity" in analysisInput && analysisInput.element === eid
    );
    const k = property == null ? void 0 : property.elasticity;
    const f1 = k * (d2 - d1) / r;
    const f_element = multiply(transpose(T), [f1, 0, 0]);
    n1_dof.forEach((dof, j) => f[dof] += f_element[j]);
    n2_dof.forEach((dof, j) => f[dof] -= f_element[j]);
  });
  return f;
}
function findT3D(x1, x2) {
  const transformVec = getTransformationMatrix(x1, x2).elements;
  return [
    [transformVec[0], transformVec[1], transformVec[2]],
    [transformVec[4], transformVec[5], transformVec[6]],
    [transformVec[8], transformVec[9], transformVec[10]]
  ];
}
function getDOFs(nodes2) {
  let dofs = {};
  nodes2.forEach((node, nid) => {
    dofs[nid] = node.map((_, i2) => i2 + node.length * nid);
  });
  return dofs;
}
const nodes = [
  [0, 0, 0],
  [2, 0, 0],
  [4, 0, 0]
];
const elements = [
  [0, 1],
  [1, 2]
];
const analysisInputs = [
  {
    node: 0,
    support: [true, true, true]
  },
  {
    node: 1,
    load: [0, 0, -2 * 9.81]
    // gravity force computed for masses of 2 and acceleration of 9.81 m/s^2
  },
  {
    node: 2,
    load: [0, 0, -4 * 9.81]
    // gravity force computed for masses of 2 and acceleration of 9.81 m/s^2
  },
  {
    node: 1,
    mass: [2, 2, 2]
  },
  {
    node: 2,
    mass: [4, 4, 4]
  },
  {
    element: 0,
    elasticity: 1e5
  },
  {
    element: 1,
    elasticity: 1e5
  }
];
const dynamicSettings = {
  time: 10,
  timeStep: 1e-3
};
const analysisOutputs = analyzeDynamically(
  nodes,
  elements,
  analysisInputs,
  dynamicSettings
);
app({
  onParameterChange: () => ({
    nodes,
    elements,
    analysisInputs,
    analysisOutputs
  }),
  settings: {
    gridSize: 10,
    dynamic: true,
    loads: false,
    dynamicSettings
  }
});
