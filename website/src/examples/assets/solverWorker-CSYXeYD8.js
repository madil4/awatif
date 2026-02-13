(async ()=>{
    const Sn = Math.PI / 180, Ji = new WeakMap;
    function Vu(e) {
        const r = Ji.get(e);
        if (r) return r;
        if (!e.layers.length) throw new Error("CLT layup must contain at least one layer.");
        const t = {
            r33: 1,
            r66: 1,
            r77: 1,
            r88: 1,
            ...e.options
        }, n = e.layers.reduce((p, g)=>p + g.thickness, 0), i = Zu(e.layers, n, t.noGlueAtNarrowSide), a = wn(3, 3), o = wn(3, 3), u = wn(3, 3);
        for (const p of i){
            const g = p.zTop - p.zBot;
            Kt(a, p.qLocal, g), t.shearCoupling ? (Kt(o, p.qLocal, .5 * (p.zTop ** 2 - p.zBot ** 2)), Kt(u, p.qLocal, (p.zTop ** 3 - p.zBot ** 3) / 3)) : Kt(u, p.qLocal, p.layer.thickness ** 3 / 12);
        }
        t.shearCoupling || Ju(o);
        let c = wn(2, 2), s, l, v;
        if (t.shearCoupling) {
            const p = Qu(a);
            v = p / Sn;
            const g = i.map((D)=>{
                const b = p - D.layer.thetaDeg * Sn, E = _o(wo(D.layer, t.noGlueAtNarrowSide), b), M = Ao(Eo(D.layer), b);
                return {
                    zBot: D.zBot,
                    zTop: D.zTop,
                    q11: E[0][0],
                    q22: E[1][1],
                    q55: M[0][0],
                    q44: M[1][1]
                };
            });
            s = Ki(g.map((D)=>({
                    zBot: D.zBot,
                    zTop: D.zTop,
                    qn: D.q11,
                    qs: D.q55
                }))), l = Ki(g.map((D)=>({
                    zBot: D.zBot,
                    zTop: D.zTop,
                    qn: D.q22,
                    qs: D.q44
                })));
            const d = s * g.reduce((D, b)=>D + b.q55 * (b.zTop - b.zBot), 0), y = l * g.reduce((D, b)=>D + b.q44 * (b.zTop - b.zBot), 0);
            c = Yu([
                [
                    d,
                    0
                ],
                [
                    0,
                    y
                ]
            ], p);
        } else {
            for (const p of i)Kt(c, p.qShearLocal, p.zTop - p.zBot);
            Xu(c, 5 / 6);
        }
        a[2][2] *= t.r66, u[2][2] *= t.r33, c[0][0] *= t.r77, c[1][1] *= t.r88;
        const h = {
            t: n,
            A: a,
            B: o,
            D: u,
            S: c,
            rho13: s,
            rho23: l,
            alphaDeg: v
        };
        return Ji.set(e, h), h;
    }
    function Zu(e, r, t) {
        let n = r / 2;
        const i = [];
        for (const a of e){
            const o = n - a.thickness, u = wo(a, t), c = _o(u, a.thetaDeg * Sn), s = Ao(Eo(a), a.thetaDeg * Sn);
            i.push({
                layer: a,
                zTop: n,
                zBot: o,
                qLocal: c,
                qShearLocal: s
            }), n = o;
        }
        return i;
    }
    function wo(e, r) {
        const t = e.Ex, n = r ? 0 : e.Ey, i = e.nuXY, a = t === 0 ? 0 : i * n / t, o = 1 - i * a, u = t / o, c = n / o, s = i * n / o, l = e.Gxy;
        return [
            [
                u,
                s,
                0
            ],
            [
                s,
                c,
                0
            ],
            [
                0,
                0,
                l
            ]
        ];
    }
    function Eo(e) {
        return [
            [
                e.Gxz,
                0
            ],
            [
                0,
                e.Gyz
            ]
        ];
    }
    function _o(e, r) {
        const t = Math.cos(r), n = Math.sin(r), i = e[0][0], a = e[1][1], o = e[0][1], u = e[2][2], c = t * t, s = n * n, l = c * t, v = s * n, h = c * c, p = s * s, g = i * h + 2 * (o + 2 * u) * c * s + a * p, d = i * p + 2 * (o + 2 * u) * c * s + a * h, y = (i + a - 4 * u) * c * s + o * (h + p), D = (i - o - 2 * u) * l * n - (a - o - 2 * u) * t * v, b = (i - o - 2 * u) * t * v - (a - o - 2 * u) * l * n, E = (i + a - 2 * o - 2 * u) * c * s + u * (h + p);
        return [
            [
                g,
                y,
                D
            ],
            [
                y,
                d,
                b
            ],
            [
                D,
                b,
                E
            ]
        ];
    }
    function Ao(e, r) {
        const t = Math.cos(r), n = Math.sin(r), i = [
            [
                t,
                n
            ],
            [
                -n,
                t
            ]
        ];
        return Mn(Mn(i, e), Fo(i));
    }
    function Yu(e, r) {
        const t = Math.cos(r), n = Math.sin(r), i = [
            [
                t,
                -n
            ],
            [
                n,
                t
            ]
        ];
        return Mn(Mn(i, e), Fo(i));
    }
    function Qu(e) {
        const r = e[0][0], t = e[1][1], n = e[0][1], i = e[2][2], a = e[0][2], o = e[1][2], c = 1e-12 * Math.max(1, Math.abs(r), Math.abs(t), Math.abs(n), Math.abs(i));
        if (Math.abs(a) <= c && Math.abs(o) <= c) return r >= t ? 0 : Math.PI / 2;
        const s = (p)=>{
            const g = Math.cos(p), d = Math.sin(p), y = g * g, D = d * d, b = y * g, E = D * d, M = y * y, F = D * D;
            return M * r + F * t + y * D * (2 * n + 4 * i) + 4 * b * d * a + 4 * g * E * o;
        };
        let l = 0, v = Number.NEGATIVE_INFINITY;
        const h = Math.PI / 7200;
        for(let p = 0; p < Math.PI; p += h){
            const g = s(p);
            g > v && (v = g, l = p);
        }
        return l;
    }
    function Ki(e) {
        const r = [
            ...e
        ].sort((v, h)=>v.zBot - h.zBot), t = 1e-12;
        let n = 0, i = 0;
        for (const v of r)n += v.qn * .5 * (v.zTop ** 2 - v.zBot ** 2), i += v.qn * (v.zTop - v.zBot);
        const a = i === 0 ? 0 : n / i;
        let o = 0;
        for (const v of r)o += v.qn * ((v.zTop - a) ** 3 - (v.zBot - a) ** 3) / 3;
        let u = 0, c = 0, s = 0;
        for (const v of r){
            const { zBot: h, zTop: p, qn: g, qs: d } = v;
            u += d * (p - h);
            const y = s + .5 * g * (h - a) ** 2, D = -.5 * g, b = g * a, E = y - .5 * g * a ** 2, M = (w)=>D ** 2 * w ** 5 / 5 + 2 * D * b * w ** 4 / 4 + (2 * D * E + b ** 2) * w ** 3 / 3 + 2 * b * E * w ** 2 / 2 + E ** 2 * w;
            c += (M(p) - M(h)) / Math.max(d, t), s = s - .5 * g * ((p - a) ** 2 - (h - a) ** 2);
        }
        const l = Math.max(u * c, t);
        return o * o / l;
    }
    function Mn(e, r) {
        return [
            [
                e[0][0] * r[0][0] + e[0][1] * r[1][0],
                e[0][0] * r[0][1] + e[0][1] * r[1][1]
            ],
            [
                e[1][0] * r[0][0] + e[1][1] * r[1][0],
                e[1][0] * r[0][1] + e[1][1] * r[1][1]
            ]
        ];
    }
    function Fo(e) {
        return [
            [
                e[0][0],
                e[1][0]
            ],
            [
                e[0][1],
                e[1][1]
            ]
        ];
    }
    function wn(e, r) {
        return Array.from({
            length: e
        }, ()=>Array(r).fill(0));
    }
    function Kt(e, r, t) {
        for(let n = 0; n < e.length; n++)for(let i = 0; i < e[0].length; i++)e[n][i] += r[n][i] * t;
    }
    function Xu(e, r) {
        for(let t = 0; t < e.length; t++)for(let n = 0; n < e[0].length; n++)e[t][n] *= r;
    }
    function Ju(e) {
        for(let r = 0; r < e.length; r++)for(let t = 0; t < e[0].length; t++)e[r][t] = 0;
    }
    function Lt() {
        return Lt = Object.assign ? Object.assign.bind() : function(e) {
            for(var r = 1; r < arguments.length; r++){
                var t = arguments[r];
                for(var n in t)({}).hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }
            return e;
        }, Lt.apply(null, arguments);
    }
    var bo = {
        relTol: 1e-12,
        absTol: 1e-15,
        matrix: "Matrix",
        number: "number",
        numberFallback: "number",
        precision: 64,
        predictable: !1,
        randomSeed: null
    };
    function Co(e, r) {
        if (Nn(e, r)) return e[r];
        throw typeof e[r] == "function" && Ku(e, r) ? new Error('Cannot access method "' + r + '" as a property') : new Error('No access to property "' + r + '"');
    }
    function So(e, r, t) {
        if (Nn(e, r)) return e[r] = t, t;
        throw new Error('No access to property "' + r + '"');
    }
    function Nn(e, r) {
        return !ju(e) && !Array.isArray(e) ? !1 : nn(es, r) ? !0 : !(r in Object.prototype || r in Function.prototype);
    }
    function Ku(e, r) {
        return e == null || typeof e[r] != "function" || nn(e, r) && Object.getPrototypeOf && r in Object.getPrototypeOf(e) ? !1 : nn(rs, r) ? !0 : !(r in Object.prototype || r in Function.prototype);
    }
    function ju(e) {
        return typeof e == "object" && e && e.constructor === Object;
    }
    var es = {
        length: !0,
        name: !0
    }, rs = {
        toString: !0,
        valueOf: !0,
        toLocaleString: !0
    };
    class ts {
        constructor(r){
            this.wrappedObject = r, this[Symbol.iterator] = this.entries;
        }
        keys() {
            return Object.keys(this.wrappedObject).filter((r)=>this.has(r)).values();
        }
        get(r) {
            return Co(this.wrappedObject, r);
        }
        set(r, t) {
            return So(this.wrappedObject, r, t), this;
        }
        has(r) {
            return Nn(this.wrappedObject, r) && r in this.wrappedObject;
        }
        entries() {
            return ns(this.keys(), (r)=>[
                    r,
                    this.get(r)
                ]);
        }
        forEach(r) {
            for (var t of this.keys())r(this.get(t), t, this);
        }
        delete(r) {
            Nn(this.wrappedObject, r) && delete this.wrappedObject[r];
        }
        clear() {
            for (var r of this.keys())this.delete(r);
        }
        get size() {
            return Object.keys(this.wrappedObject).length;
        }
    }
    function ns(e, r) {
        return {
            next: ()=>{
                var t = e.next();
                return t.done ? t : {
                    value: r(t.value),
                    done: !1
                };
            }
        };
    }
    function ir(e) {
        return typeof e == "number";
    }
    function cr(e) {
        return !e || typeof e != "object" || typeof e.constructor != "function" ? !1 : e.isBigNumber === !0 && typeof e.constructor.prototype == "object" && e.constructor.prototype.isBigNumber === !0 || typeof e.constructor.isDecimal == "function" && e.constructor.isDecimal(e) === !0;
    }
    function is(e) {
        return typeof e == "bigint";
    }
    function xi(e) {
        return e && typeof e == "object" && Object.getPrototypeOf(e).isComplex === !0 || !1;
    }
    function Ti(e) {
        return e && typeof e == "object" && Object.getPrototypeOf(e).isFraction === !0 || !1;
    }
    function Mo(e) {
        return e && e.constructor.prototype.isUnit === !0 || !1;
    }
    function Wr(e) {
        return typeof e == "string";
    }
    var nr = Array.isArray;
    function Ke(e) {
        return e && e.constructor.prototype.isMatrix === !0 || !1;
    }
    function Bn(e) {
        return Array.isArray(e) || Ke(e);
    }
    function No(e) {
        return e && e.isDenseMatrix && e.constructor.prototype.isMatrix === !0 || !1;
    }
    function Bo(e) {
        return e && e.isSparseMatrix && e.constructor.prototype.isMatrix === !0 || !1;
    }
    function xo(e) {
        return e && e.constructor.prototype.isRange === !0 || !1;
    }
    function Gn(e) {
        return e && e.constructor.prototype.isIndex === !0 || !1;
    }
    function as(e) {
        return typeof e == "boolean";
    }
    function os(e) {
        return e && e.constructor.prototype.isResultSet === !0 || !1;
    }
    function us(e) {
        return e && e.constructor.prototype.isHelp === !0 || !1;
    }
    function ss(e) {
        return typeof e == "function";
    }
    function fs(e) {
        return e instanceof Date;
    }
    function cs(e) {
        return e instanceof RegExp;
    }
    function Pi(e) {
        return !!(e && typeof e == "object" && e.constructor === Object && !xi(e) && !Ti(e));
    }
    function ls(e) {
        return e ? e instanceof Map || e instanceof ts || typeof e.set == "function" && typeof e.get == "function" && typeof e.keys == "function" && typeof e.has == "function" : !1;
    }
    function vs(e) {
        return e === null;
    }
    function ds(e) {
        return e === void 0;
    }
    function hs(e) {
        return e && e.isAccessorNode === !0 && e.constructor.prototype.isNode === !0 || !1;
    }
    function ps(e) {
        return e && e.isArrayNode === !0 && e.constructor.prototype.isNode === !0 || !1;
    }
    function ms(e) {
        return e && e.isAssignmentNode === !0 && e.constructor.prototype.isNode === !0 || !1;
    }
    function gs(e) {
        return e && e.isBlockNode === !0 && e.constructor.prototype.isNode === !0 || !1;
    }
    function Ds(e) {
        return e && e.isConditionalNode === !0 && e.constructor.prototype.isNode === !0 || !1;
    }
    function ys(e) {
        return e && e.isConstantNode === !0 && e.constructor.prototype.isNode === !0 || !1;
    }
    function ws(e) {
        return e && e.isFunctionAssignmentNode === !0 && e.constructor.prototype.isNode === !0 || !1;
    }
    function Es(e) {
        return e && e.isFunctionNode === !0 && e.constructor.prototype.isNode === !0 || !1;
    }
    function _s(e) {
        return e && e.isIndexNode === !0 && e.constructor.prototype.isNode === !0 || !1;
    }
    function As(e) {
        return e && e.isNode === !0 && e.constructor.prototype.isNode === !0 || !1;
    }
    function Fs(e) {
        return e && e.isObjectNode === !0 && e.constructor.prototype.isNode === !0 || !1;
    }
    function bs(e) {
        return e && e.isOperatorNode === !0 && e.constructor.prototype.isNode === !0 || !1;
    }
    function Cs(e) {
        return e && e.isParenthesisNode === !0 && e.constructor.prototype.isNode === !0 || !1;
    }
    function Ss(e) {
        return e && e.isRangeNode === !0 && e.constructor.prototype.isNode === !0 || !1;
    }
    function Ms(e) {
        return e && e.isRelationalNode === !0 && e.constructor.prototype.isNode === !0 || !1;
    }
    function Ns(e) {
        return e && e.isSymbolNode === !0 && e.constructor.prototype.isNode === !0 || !1;
    }
    function Bs(e) {
        return e && e.constructor.prototype.isChain === !0 || !1;
    }
    function Kr(e) {
        var r = typeof e;
        return r === "object" ? e === null ? "null" : cr(e) ? "BigNumber" : e.constructor && e.constructor.name ? e.constructor.name : "Object" : r;
    }
    function We(e) {
        var r = typeof e;
        if (r === "number" || r === "bigint" || r === "string" || r === "boolean" || e === null || e === void 0) return e;
        if (typeof e.clone == "function") return e.clone();
        if (Array.isArray(e)) return e.map(function(t) {
            return We(t);
        });
        if (e instanceof Date) return new Date(e.valueOf());
        if (cr(e)) return e;
        if (Pi(e)) return xs(e, We);
        if (r === "function") return e;
        throw new TypeError("Cannot clone: unknown type of value (value: ".concat(e, ")"));
    }
    function xs(e, r) {
        var t = {};
        for(var n in e)nn(e, n) && (t[n] = r(e[n]));
        return t;
    }
    function Ts(e, r) {
        for(var t in r)nn(r, t) && (e[t] = r[t]);
        return e;
    }
    function yt(e, r) {
        var t, n, i;
        if (Array.isArray(e)) {
            if (!Array.isArray(r) || e.length !== r.length) return !1;
            for(n = 0, i = e.length; n < i; n++)if (!yt(e[n], r[n])) return !1;
            return !0;
        } else {
            if (typeof e == "function") return e === r;
            if (e instanceof Object) {
                if (Array.isArray(r) || !(r instanceof Object)) return !1;
                for(t in e)if (!(t in r) || !yt(e[t], r[t])) return !1;
                for(t in r)if (!(t in e)) return !1;
                return !0;
            } else return e === r;
        }
    }
    function nn(e, r) {
        return e && Object.hasOwnProperty.call(e, r);
    }
    function Ps(e, r) {
        for(var t = {}, n = 0; n < r.length; n++){
            var i = r[n], a = e[i];
            a !== void 0 && (t[i] = a);
        }
        return t;
    }
    var zs = [
        "Matrix",
        "Array"
    ], Os = [
        "number",
        "BigNumber",
        "Fraction"
    ], Nr = function(r) {
        if (r) throw new Error(`The global config is readonly. 
Please create a mathjs instance if you want to change the default configuration. 
Example:

  import { create, all } from 'mathjs';
  const mathjs = create(all);
  mathjs.config({ number: 'BigNumber' });
`);
        return Object.freeze(bo);
    };
    Lt(Nr, bo, {
        MATRIX_OPTIONS: zs,
        NUMBER_OPTIONS: Os
    });
    function ji() {
        return !0;
    }
    function qr() {
        return !1;
    }
    function Pt() {}
    const ea = "Argument is not a typed-function.";
    function To() {
        function e(P) {
            return typeof P == "object" && P !== null && P.constructor === Object;
        }
        const r = [
            {
                name: "number",
                test: function(P) {
                    return typeof P == "number";
                }
            },
            {
                name: "string",
                test: function(P) {
                    return typeof P == "string";
                }
            },
            {
                name: "boolean",
                test: function(P) {
                    return typeof P == "boolean";
                }
            },
            {
                name: "Function",
                test: function(P) {
                    return typeof P == "function";
                }
            },
            {
                name: "Array",
                test: Array.isArray
            },
            {
                name: "Date",
                test: function(P) {
                    return P instanceof Date;
                }
            },
            {
                name: "RegExp",
                test: function(P) {
                    return P instanceof RegExp;
                }
            },
            {
                name: "Object",
                test: e
            },
            {
                name: "null",
                test: function(P) {
                    return P === null;
                }
            },
            {
                name: "undefined",
                test: function(P) {
                    return P === void 0;
                }
            }
        ], t = {
            name: "any",
            test: ji,
            isAny: !0
        };
        let n, i, a = 0, o = {
            createCount: 0
        };
        function u(P) {
            const U = n.get(P);
            if (U) return U;
            let W = 'Unknown type "' + P + '"';
            const ee = P.toLowerCase();
            let ce;
            for (ce of i)if (ce.toLowerCase() === ee) {
                W += '. Did you mean "' + ce + '" ?';
                break;
            }
            throw new TypeError(W);
        }
        function c(P) {
            let U = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "any";
            const W = U ? u(U).index : i.length, ee = [];
            for(let ue = 0; ue < P.length; ++ue){
                if (!P[ue] || typeof P[ue].name != "string" || typeof P[ue].test != "function") throw new TypeError("Object with properties {name: string, test: function} expected");
                const me = P[ue].name;
                if (n.has(me)) throw new TypeError('Duplicate type name "' + me + '"');
                ee.push(me), n.set(me, {
                    name: me,
                    test: P[ue].test,
                    isAny: P[ue].isAny,
                    index: W + ue,
                    conversionsTo: []
                });
            }
            const ce = i.slice(W);
            i = i.slice(0, W).concat(ee).concat(ce);
            for(let ue = W + ee.length; ue < i.length; ++ue)n.get(i[ue]).index = ue;
        }
        function s() {
            n = new Map, i = [], a = 0, c([
                t
            ], !1);
        }
        s(), c(r);
        function l() {
            let P;
            for (P of i)n.get(P).conversionsTo = [];
            a = 0;
        }
        function v(P) {
            const U = i.filter((W)=>{
                const ee = n.get(W);
                return !ee.isAny && ee.test(P);
            });
            return U.length ? U : [
                "any"
            ];
        }
        function h(P) {
            return P && typeof P == "function" && "_typedFunctionData" in P;
        }
        function p(P, U, W) {
            if (!h(P)) throw new TypeError(ea);
            const ee = W && W.exact, ce = Array.isArray(U) ? U.join(",") : U, ue = M(ce), me = y(ue);
            if (!ee || me in P.signatures) {
                const Ue = P._typedFunctionData.signatureMap.get(me);
                if (Ue) return Ue;
            }
            const ie = ue.length;
            let oe;
            if (ee) {
                oe = [];
                let Ue;
                for(Ue in P.signatures)oe.push(P._typedFunctionData.signatureMap.get(Ue));
            } else oe = P._typedFunctionData.signatures;
            for(let Ue = 0; Ue < ie; ++Ue){
                const He = ue[Ue], je = [];
                let lr;
                for (lr of oe){
                    const rr = S(lr.params, Ue);
                    if (!(!rr || He.restParam && !rr.restParam)) {
                        if (!rr.hasAny) {
                            const dr = E(rr);
                            if (He.types.some((hr)=>!dr.has(hr.name))) continue;
                        }
                        je.push(lr);
                    }
                }
                if (oe = je, oe.length === 0) break;
            }
            let de;
            for (de of oe)if (de.params.length <= ie) return de;
            throw new TypeError("Signature not found (signature: " + (P.name || "unnamed") + "(" + y(ue, ", ") + "))");
        }
        function g(P, U, W) {
            return p(P, U, W).implementation;
        }
        function d(P, U) {
            const W = u(U);
            if (W.test(P)) return P;
            const ee = W.conversionsTo;
            if (ee.length === 0) throw new Error("There are no conversions to " + U + " defined.");
            for(let ce = 0; ce < ee.length; ce++)if (u(ee[ce].from).test(P)) return ee[ce].convert(P);
            throw new Error("Cannot convert " + P + " to " + U);
        }
        function y(P) {
            let U = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ",";
            return P.map((W)=>W.name).join(U);
        }
        function D(P) {
            const U = P.indexOf("...") === 0, ee = (U ? P.length > 3 ? P.slice(3) : "any" : P).split("|").map((ie)=>u(ie.trim()));
            let ce = !1, ue = U ? "..." : "";
            return {
                types: ee.map(function(ie) {
                    return ce = ie.isAny || ce, ue += ie.name + "|", {
                        name: ie.name,
                        typeIndex: ie.index,
                        test: ie.test,
                        isAny: ie.isAny,
                        conversion: null,
                        conversionIndex: -1
                    };
                }),
                name: ue.slice(0, -1),
                hasAny: ce,
                hasConversion: !1,
                restParam: U
            };
        }
        function b(P) {
            const U = P.types.map((me)=>me.name), W = G(U);
            let ee = P.hasAny, ce = P.name;
            const ue = W.map(function(me) {
                const ie = u(me.from);
                return ee = ie.isAny || ee, ce += "|" + me.from, {
                    name: me.from,
                    typeIndex: ie.index,
                    test: ie.test,
                    isAny: ie.isAny,
                    conversion: me,
                    conversionIndex: me.index
                };
            });
            return {
                types: P.types.concat(ue),
                name: ce,
                hasAny: ee,
                hasConversion: ue.length > 0,
                restParam: P.restParam
            };
        }
        function E(P) {
            return P.typeSet || (P.typeSet = new Set, P.types.forEach((U)=>P.typeSet.add(U.name))), P.typeSet;
        }
        function M(P) {
            const U = [];
            if (typeof P != "string") throw new TypeError("Signatures must be strings");
            const W = P.trim();
            if (W === "") return U;
            const ee = W.split(",");
            for(let ce = 0; ce < ee.length; ++ce){
                const ue = D(ee[ce].trim());
                if (ue.restParam && ce !== ee.length - 1) throw new SyntaxError('Unexpected rest parameter "' + ee[ce] + '": only allowed for the last parameter');
                if (ue.types.length === 0) return null;
                U.push(ue);
            }
            return U;
        }
        function F(P) {
            const U = fe(P);
            return U ? U.restParam : !1;
        }
        function w(P) {
            if (!P || P.types.length === 0) return ji;
            if (P.types.length === 1) return u(P.types[0].name).test;
            if (P.types.length === 2) {
                const U = u(P.types[0].name).test, W = u(P.types[1].name).test;
                return function(ce) {
                    return U(ce) || W(ce);
                };
            } else {
                const U = P.types.map(function(W) {
                    return u(W.name).test;
                });
                return function(ee) {
                    for(let ce = 0; ce < U.length; ce++)if (U[ce](ee)) return !0;
                    return !1;
                };
            }
        }
        function N(P) {
            let U, W, ee;
            if (F(P)) {
                U = K(P).map(w);
                const ce = U.length, ue = w(fe(P)), me = function(ie) {
                    for(let oe = ce; oe < ie.length; oe++)if (!ue(ie[oe])) return !1;
                    return !0;
                };
                return function(oe) {
                    for(let de = 0; de < U.length; de++)if (!U[de](oe[de])) return !1;
                    return me(oe) && oe.length >= ce + 1;
                };
            } else return P.length === 0 ? function(ue) {
                return ue.length === 0;
            } : P.length === 1 ? (W = w(P[0]), function(ue) {
                return W(ue[0]) && ue.length === 1;
            }) : P.length === 2 ? (W = w(P[0]), ee = w(P[1]), function(ue) {
                return W(ue[0]) && ee(ue[1]) && ue.length === 2;
            }) : (U = P.map(w), function(ue) {
                for(let me = 0; me < U.length; me++)if (!U[me](ue[me])) return !1;
                return ue.length === U.length;
            });
        }
        function S(P, U) {
            return U < P.length ? P[U] : F(P) ? fe(P) : null;
        }
        function _(P, U) {
            const W = S(P, U);
            return W ? E(W) : new Set;
        }
        function x(P) {
            return P.conversion === null || P.conversion === void 0;
        }
        function T(P, U) {
            const W = new Set;
            return P.forEach((ee)=>{
                const ce = _(ee.params, U);
                let ue;
                for (ue of ce)W.add(ue);
            }), W.has("any") ? [
                "any"
            ] : Array.from(W);
        }
        function z(P, U, W) {
            let ee, ce;
            const ue = P || "unnamed";
            let me = W, ie;
            for(ie = 0; ie < U.length; ie++){
                const He = [];
                if (me.forEach((je)=>{
                    const lr = S(je.params, ie), rr = w(lr);
                    (ie < je.params.length || F(je.params)) && rr(U[ie]) && He.push(je);
                }), He.length === 0) {
                    if (ce = T(me, ie), ce.length > 0) {
                        const je = v(U[ie]);
                        return ee = new TypeError("Unexpected type of argument in function " + ue + " (expected: " + ce.join(" or ") + ", actual: " + je.join(" | ") + ", index: " + ie + ")"), ee.data = {
                            category: "wrongType",
                            fn: ue,
                            index: ie,
                            actual: je,
                            expected: ce
                        }, ee;
                    }
                } else me = He;
            }
            const oe = me.map(function(He) {
                return F(He.params) ? 1 / 0 : He.params.length;
            });
            if (U.length < Math.min.apply(null, oe)) return ce = T(me, ie), ee = new TypeError("Too few arguments in function " + ue + " (expected: " + ce.join(" or ") + ", index: " + U.length + ")"), ee.data = {
                category: "tooFewArgs",
                fn: ue,
                index: U.length,
                expected: ce
            }, ee;
            const de = Math.max.apply(null, oe);
            if (U.length > de) return ee = new TypeError("Too many arguments in function " + ue + " (expected: " + de + ", actual: " + U.length + ")"), ee.data = {
                category: "tooManyArgs",
                fn: ue,
                index: U.length,
                expectedLength: de
            }, ee;
            const Ue = [];
            for(let He = 0; He < U.length; ++He)Ue.push(v(U[He]).join("|"));
            return ee = new TypeError('Arguments of type "' + Ue.join(", ") + '" do not match any of the defined signatures of function ' + ue + "."), ee.data = {
                category: "mismatch",
                actual: Ue
            }, ee;
        }
        function q(P) {
            let U = i.length + 1;
            for(let W = 0; W < P.types.length; W++)x(P.types[W]) && (U = Math.min(U, P.types[W].typeIndex));
            return U;
        }
        function $(P) {
            let U = a + 1;
            for(let W = 0; W < P.types.length; W++)x(P.types[W]) || (U = Math.min(U, P.types[W].conversionIndex));
            return U;
        }
        function k(P, U) {
            if (P.hasAny) {
                if (!U.hasAny) return 1;
            } else if (U.hasAny) return -1;
            if (P.restParam) {
                if (!U.restParam) return 1;
            } else if (U.restParam) return -1;
            if (P.hasConversion) {
                if (!U.hasConversion) return 1;
            } else if (U.hasConversion) return -1;
            const W = q(P) - q(U);
            if (W < 0) return -1;
            if (W > 0) return 1;
            const ee = $(P) - $(U);
            return ee < 0 ? -1 : ee > 0 ? 1 : 0;
        }
        function L(P, U) {
            const W = P.params, ee = U.params, ce = fe(W), ue = fe(ee), me = F(W), ie = F(ee);
            if (me && ce.hasAny) {
                if (!ie || !ue.hasAny) return 1;
            } else if (ie && ue.hasAny) return -1;
            let oe = 0, de = 0, Ue;
            for (Ue of W)Ue.hasAny && ++oe, Ue.hasConversion && ++de;
            let He = 0, je = 0;
            for (Ue of ee)Ue.hasAny && ++He, Ue.hasConversion && ++je;
            if (oe !== He) return oe - He;
            if (me && ce.hasConversion) {
                if (!ie || !ue.hasConversion) return 1;
            } else if (ie && ue.hasConversion) return -1;
            if (de !== je) return de - je;
            if (me) {
                if (!ie) return 1;
            } else if (ie) return -1;
            const lr = (W.length - ee.length) * (me ? -1 : 1);
            if (lr !== 0) return lr;
            const rr = [];
            let dr = 0;
            for(let mr = 0; mr < W.length; ++mr){
                const wr = k(W[mr], ee[mr]);
                rr.push(wr), dr += wr;
            }
            if (dr !== 0) return dr;
            let hr;
            for (hr of rr)if (hr !== 0) return hr;
            return 0;
        }
        function G(P) {
            if (P.length === 0) return [];
            const U = P.map(u);
            P.length > 1 && U.sort((ce, ue)=>ce.index - ue.index);
            let W = U[0].conversionsTo;
            if (P.length === 1) return W;
            W = W.concat([]);
            const ee = new Set(P);
            for(let ce = 1; ce < U.length; ++ce){
                let ue;
                for (ue of U[ce].conversionsTo)ee.has(ue.from) || (W.push(ue), ee.add(ue.from));
            }
            return W;
        }
        function R(P, U) {
            let W = U;
            if (P.some((ce)=>ce.hasConversion)) {
                const ce = F(P), ue = P.map(I);
                W = function() {
                    const ie = [], oe = ce ? arguments.length - 1 : arguments.length;
                    for(let de = 0; de < oe; de++)ie[de] = ue[de](arguments[de]);
                    return ce && (ie[oe] = arguments[oe].map(ue[oe])), U.apply(this, ie);
                };
            }
            let ee = W;
            if (F(P)) {
                const ce = P.length - 1;
                ee = function() {
                    return W.apply(this, ae(arguments, 0, ce).concat([
                        ae(arguments, ce)
                    ]));
                };
            }
            return ee;
        }
        function I(P) {
            let U, W, ee, ce;
            const ue = [], me = [];
            switch(P.types.forEach(function(ie) {
                ie.conversion && (ue.push(u(ie.conversion.from).test), me.push(ie.conversion.convert));
            }), me.length){
                case 0:
                    return function(oe) {
                        return oe;
                    };
                case 1:
                    return U = ue[0], ee = me[0], function(oe) {
                        return U(oe) ? ee(oe) : oe;
                    };
                case 2:
                    return U = ue[0], W = ue[1], ee = me[0], ce = me[1], function(oe) {
                        return U(oe) ? ee(oe) : W(oe) ? ce(oe) : oe;
                    };
                default:
                    return function(oe) {
                        for(let de = 0; de < me.length; de++)if (ue[de](oe)) return me[de](oe);
                        return oe;
                    };
            }
        }
        function Z(P) {
            function U(W, ee, ce) {
                if (ee < W.length) {
                    const ue = W[ee];
                    let me = [];
                    if (ue.restParam) {
                        const ie = ue.types.filter(x);
                        ie.length < ue.types.length && me.push({
                            types: ie,
                            name: "..." + ie.map((oe)=>oe.name).join("|"),
                            hasAny: ie.some((oe)=>oe.isAny),
                            hasConversion: !1,
                            restParam: !0
                        }), me.push(ue);
                    } else me = ue.types.map(function(ie) {
                        return {
                            types: [
                                ie
                            ],
                            name: ie.name,
                            hasAny: ie.isAny,
                            hasConversion: ie.conversion,
                            restParam: !1
                        };
                    });
                    return le(me, function(ie) {
                        return U(W, ee + 1, ce.concat([
                            ie
                        ]));
                    });
                } else return [
                    ce
                ];
            }
            return U(P, 0, []);
        }
        function te(P, U) {
            const W = Math.max(P.length, U.length);
            for(let ie = 0; ie < W; ie++){
                const oe = _(P, ie), de = _(U, ie);
                let Ue = !1, He;
                for (He of de)if (oe.has(He)) {
                    Ue = !0;
                    break;
                }
                if (!Ue) return !1;
            }
            const ee = P.length, ce = U.length, ue = F(P), me = F(U);
            return ue ? me ? ee === ce : ce >= ee : me ? ee >= ce : ee === ce;
        }
        function Q(P) {
            return P.map((U)=>Me(U) ? Fe(U.referToSelf.callback) : be(U) ? De(U.referTo.references, U.referTo.callback) : U);
        }
        function H(P, U, W) {
            const ee = [];
            let ce;
            for (ce of P){
                let ue = W[ce];
                if (typeof ue != "number") throw new TypeError('No definition for referenced signature "' + ce + '"');
                if (ue = U[ue], typeof ue != "function") return !1;
                ee.push(ue);
            }
            return ee;
        }
        function Y(P, U, W) {
            const ee = Q(P), ce = new Array(ee.length).fill(!1);
            let ue = !0;
            for(; ue;){
                ue = !1;
                let me = !0;
                for(let ie = 0; ie < ee.length; ++ie){
                    if (ce[ie]) continue;
                    const oe = ee[ie];
                    if (Me(oe)) ee[ie] = oe.referToSelf.callback(W), ee[ie].referToSelf = oe.referToSelf, ce[ie] = !0, me = !1;
                    else if (be(oe)) {
                        const de = H(oe.referTo.references, ee, U);
                        de ? (ee[ie] = oe.referTo.callback.apply(this, de), ee[ie].referTo = oe.referTo, ce[ie] = !0, me = !1) : ue = !0;
                    }
                }
                if (me && ue) throw new SyntaxError("Circular reference detected in resolving typed.referTo");
            }
            return ee;
        }
        function re(P) {
            const U = /\bthis(\(|\.signatures\b)/;
            Object.keys(P).forEach((W)=>{
                const ee = P[W];
                if (U.test(ee.toString())) throw new SyntaxError("Using `this` to self-reference a function is deprecated since typed-function@3. Use typed.referTo and typed.referToSelf instead.");
            });
        }
        function j(P, U) {
            if (o.createCount++, Object.keys(U).length === 0) throw new SyntaxError("No signatures provided");
            o.warnAgainstDeprecatedThis && re(U);
            const W = [], ee = [], ce = {}, ue = [];
            let me;
            for(me in U){
                if (!Object.prototype.hasOwnProperty.call(U, me)) continue;
                const Qe = M(me);
                if (!Qe) continue;
                W.forEach(function(ht) {
                    if (te(ht, Qe)) throw new TypeError('Conflicting signatures "' + y(ht) + '" and "' + y(Qe) + '".');
                }), W.push(Qe);
                const Cr = ee.length;
                ee.push(U[me]);
                const Dn = Qe.map(b);
                let Bt;
                for (Bt of Z(Dn)){
                    const ht = y(Bt);
                    ue.push({
                        params: Bt,
                        name: ht,
                        fn: Cr
                    }), Bt.every((ui)=>!ui.hasConversion) && (ce[ht] = Cr);
                }
            }
            ue.sort(L);
            const ie = Y(ee, ce, xr);
            let oe;
            for(oe in ce)Object.prototype.hasOwnProperty.call(ce, oe) && (ce[oe] = ie[ce[oe]]);
            const de = [], Ue = new Map;
            for (oe of ue)Ue.has(oe.name) || (oe.fn = ie[oe.fn], de.push(oe), Ue.set(oe.name, oe));
            const He = de[0] && de[0].params.length <= 2 && !F(de[0].params), je = de[1] && de[1].params.length <= 2 && !F(de[1].params), lr = de[2] && de[2].params.length <= 2 && !F(de[2].params), rr = de[3] && de[3].params.length <= 2 && !F(de[3].params), dr = de[4] && de[4].params.length <= 2 && !F(de[4].params), hr = de[5] && de[5].params.length <= 2 && !F(de[5].params), mr = He && je && lr && rr && dr && hr;
            for(let Qe = 0; Qe < de.length; ++Qe)de[Qe].test = N(de[Qe].params);
            const wr = He ? w(de[0].params[0]) : qr, Br = je ? w(de[1].params[0]) : qr, vt = lr ? w(de[2].params[0]) : qr, Vt = rr ? w(de[3].params[0]) : qr, ur = dr ? w(de[4].params[0]) : qr, sr = hr ? w(de[5].params[0]) : qr, et = He ? w(de[0].params[1]) : qr, Fr = je ? w(de[1].params[1]) : qr, br = lr ? w(de[2].params[1]) : qr, Oe = rr ? w(de[3].params[1]) : qr, Or = dr ? w(de[4].params[1]) : qr, Ye = hr ? w(de[5].params[1]) : qr;
            for(let Qe = 0; Qe < de.length; ++Qe)de[Qe].implementation = R(de[Qe].params, de[Qe].fn);
            const $r = He ? de[0].implementation : Pt, Zt = je ? de[1].implementation : Pt, Yt = lr ? de[2].implementation : Pt, ri = rr ? de[3].implementation : Pt, nt = dr ? de[4].implementation : Pt, mn = hr ? de[5].implementation : Pt, Re = He ? de[0].params.length : -1, ti = je ? de[1].params.length : -1, Qt = lr ? de[2].params.length : -1, ni = rr ? de[3].params.length : -1, gn = dr ? de[4].params.length : -1, ii = hr ? de[5].params.length : -1, ai = mr ? 6 : 0, oi = de.length, it = de.map((Qe)=>Qe.test), At = de.map((Qe)=>Qe.implementation), dt = function() {
                for(let Cr = ai; Cr < oi; Cr++)if (it[Cr](arguments)) return At[Cr].apply(this, arguments);
                return o.onMismatch(P, arguments, de);
            };
            function xr(Qe, Cr) {
                return arguments.length === Re && wr(Qe) && et(Cr) ? $r.apply(this, arguments) : arguments.length === ti && Br(Qe) && Fr(Cr) ? Zt.apply(this, arguments) : arguments.length === Qt && vt(Qe) && br(Cr) ? Yt.apply(this, arguments) : arguments.length === ni && Vt(Qe) && Oe(Cr) ? ri.apply(this, arguments) : arguments.length === gn && ur(Qe) && Or(Cr) ? nt.apply(this, arguments) : arguments.length === ii && sr(Qe) && Ye(Cr) ? mn.apply(this, arguments) : dt.apply(this, arguments);
            }
            try {
                Object.defineProperty(xr, "name", {
                    value: P
                });
            } catch  {}
            return xr.signatures = ce, xr._typedFunctionData = {
                signatures: de,
                signatureMap: Ue
            }, xr;
        }
        function X(P, U, W) {
            throw z(P, U, W);
        }
        function K(P) {
            return ae(P, 0, P.length - 1);
        }
        function fe(P) {
            return P[P.length - 1];
        }
        function ae(P, U, W) {
            return Array.prototype.slice.call(P, U, W);
        }
        function pe(P, U) {
            for(let W = 0; W < P.length; W++)if (U(P[W])) return P[W];
        }
        function le(P, U) {
            return Array.prototype.concat.apply([], P.map(U));
        }
        function ye() {
            const P = K(arguments).map((W)=>y(M(W))), U = fe(arguments);
            if (typeof U != "function") throw new TypeError("Callback function expected as last argument");
            return De(P, U);
        }
        function De(P, U) {
            return {
                referTo: {
                    references: P,
                    callback: U
                }
            };
        }
        function Fe(P) {
            if (typeof P != "function") throw new TypeError("Callback function expected as first argument");
            return {
                referToSelf: {
                    callback: P
                }
            };
        }
        function be(P) {
            return P && typeof P.referTo == "object" && Array.isArray(P.referTo.references) && typeof P.referTo.callback == "function";
        }
        function Me(P) {
            return P && typeof P.referToSelf == "object" && typeof P.referToSelf.callback == "function";
        }
        function Ee(P, U) {
            if (!P) return U;
            if (U && U !== P) {
                const W = new Error("Function names do not match (expected: " + P + ", actual: " + U + ")");
                throw W.data = {
                    actual: U,
                    expected: P
                }, W;
            }
            return P;
        }
        function ze(P) {
            let U;
            for(const W in P)Object.prototype.hasOwnProperty.call(P, W) && (h(P[W]) || typeof P[W].signature == "string") && (U = Ee(U, P[W].name));
            return U;
        }
        function Be(P, U) {
            let W;
            for(W in U)if (Object.prototype.hasOwnProperty.call(U, W)) {
                if (W in P && U[W] !== P[W]) {
                    const ee = new Error('Signature "' + W + '" is defined twice');
                    throw ee.data = {
                        signature: W,
                        sourceFunction: U[W],
                        destFunction: P[W]
                    }, ee;
                }
                P[W] = U[W];
            }
        }
        const Ie = o;
        o = function(P) {
            const U = typeof P == "string", W = U ? 1 : 0;
            let ee = U ? P : "";
            const ce = {};
            for(let ue = W; ue < arguments.length; ++ue){
                const me = arguments[ue];
                let ie = {}, oe;
                if (typeof me == "function" ? (oe = me.name, typeof me.signature == "string" ? ie[me.signature] = me : h(me) && (ie = me.signatures)) : e(me) && (ie = me, U || (oe = ze(me))), Object.keys(ie).length === 0) {
                    const de = new TypeError("Argument to 'typed' at index " + ue + " is not a (typed) function, nor an object with signatures as keys and functions as values.");
                    throw de.data = {
                        index: ue,
                        argument: me
                    }, de;
                }
                U || (ee = Ee(ee, oe)), Be(ce, ie);
            }
            return j(ee || "", ce);
        }, o.create = To, o.createCount = Ie.createCount, o.onMismatch = X, o.throwMismatchError = X, o.createError = z, o.clear = s, o.clearConversions = l, o.addTypes = c, o._findType = u, o.referTo = ye, o.referToSelf = Fe, o.convert = d, o.findSignature = p, o.find = g, o.isTypedFunction = h, o.warnAgainstDeprecatedThis = !0, o.addType = function(P, U) {
            let W = "any";
            U !== !1 && n.has("Object") && (W = "Object"), o.addTypes([
                P
            ], W);
        };
        function er(P) {
            if (!P || typeof P.from != "string" || typeof P.to != "string" || typeof P.convert != "function") throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");
            if (P.to === P.from) throw new SyntaxError('Illegal to define conversion from "' + P.from + '" to itself.');
        }
        return o.addConversion = function(P) {
            let U = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                override: !1
            };
            er(P);
            const W = u(P.to), ee = W.conversionsTo.find((ce)=>ce.from === P.from);
            if (ee) if (U && U.override) o.removeConversion({
                from: ee.from,
                to: P.to,
                convert: ee.convert
            });
            else throw new Error('There is already a conversion from "' + P.from + '" to "' + W.name + '"');
            W.conversionsTo.push({
                from: P.from,
                convert: P.convert,
                index: a++
            });
        }, o.addConversions = function(P, U) {
            P.forEach((W)=>o.addConversion(W, U));
        }, o.removeConversion = function(P) {
            er(P);
            const U = u(P.to), W = pe(U.conversionsTo, (ce)=>ce.from === P.from);
            if (!W) throw new Error("Attempt to remove nonexistent conversion from " + P.from + " to " + P.to);
            if (W.convert !== P.convert) throw new Error("Conversion to remove does not match existing conversion");
            const ee = U.conversionsTo.indexOf(W);
            U.conversionsTo.splice(ee, 1);
        }, o.resolve = function(P, U) {
            if (!h(P)) throw new TypeError(ea);
            const W = P._typedFunctionData.signatures;
            for(let ee = 0; ee < W.length; ++ee)if (W[ee].test(U)) return W[ee];
            return null;
        }, o;
    }
    var xn = To();
    function he(e, r, t, n) {
        function i(a) {
            var o = Ps(a, r.map(Ls));
            return Is(e, r, a), t(o);
        }
        return i.isFactory = !0, i.fn = e, i.dependencies = r.slice().sort(), n && (i.meta = n), i;
    }
    function Is(e, r, t) {
        var n = r.filter((a)=>!Rs(a)).every((a)=>t[a] !== void 0);
        if (!n) {
            var i = r.filter((a)=>t[a] === void 0);
            throw new Error('Cannot create function "'.concat(e, '", ') + "some dependencies are missing: ".concat(i.map((a)=>'"'.concat(a, '"')).join(", "), "."));
        }
    }
    function Rs(e) {
        return e && e[0] === "?";
    }
    function Ls(e) {
        return e && e[0] === "?" ? e.slice(1) : e;
    }
    function ar(e) {
        return typeof e == "boolean" ? !0 : isFinite(e) ? e === Math.round(e) : !1;
    }
    var Us = Math.sign || function(e) {
        return e > 0 ? 1 : e < 0 ? -1 : 0;
    };
    function ci(e, r, t) {
        var n = {
            2: "0b",
            8: "0o",
            16: "0x"
        }, i = n[r], a = "";
        if (t) {
            if (t < 1) throw new Error("size must be in greater than 0");
            if (!ar(t)) throw new Error("size must be an integer");
            if (e > 2 ** (t - 1) - 1 || e < -(2 ** (t - 1))) throw new Error("Value must be in range [-2^".concat(t - 1, ", 2^").concat(t - 1, "-1]"));
            if (!ar(e)) throw new Error("Value must be an integer");
            e < 0 && (e = e + 2 ** t), a = "i".concat(t);
        }
        var o = "";
        return e < 0 && (e = -e, o = "-"), "".concat(o).concat(i).concat(e.toString(r)).concat(a);
    }
    function gi(e, r) {
        if (typeof r == "function") return r(e);
        if (e === 1 / 0) return "Infinity";
        if (e === -1 / 0) return "-Infinity";
        if (isNaN(e)) return "NaN";
        var { notation: t, precision: n, wordSize: i } = Po(r);
        switch(t){
            case "fixed":
                return qs(e, n);
            case "exponential":
                return zo(e, n);
            case "engineering":
                return $s(e, n);
            case "bin":
                return ci(e, 2, i);
            case "oct":
                return ci(e, 8, i);
            case "hex":
                return ci(e, 16, i);
            case "auto":
                return ks(e, n, r).replace(/((\.\d*?)(0+))($|e)/, function() {
                    var a = arguments[2], o = arguments[4];
                    return a !== "." ? a + o : o;
                });
            default:
                throw new Error('Unknown notation "' + t + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
        }
    }
    function Po(e) {
        var r = "auto", t, n;
        if (e !== void 0) if (ir(e)) t = e;
        else if (cr(e)) t = e.toNumber();
        else if (Pi(e)) e.precision !== void 0 && (t = ra(e.precision, ()=>{
            throw new Error('Option "precision" must be a number or BigNumber');
        })), e.wordSize !== void 0 && (n = ra(e.wordSize, ()=>{
            throw new Error('Option "wordSize" must be a number or BigNumber');
        })), e.notation && (r = e.notation);
        else throw new Error("Unsupported type of options, number, BigNumber, or object expected");
        return {
            notation: r,
            precision: t,
            wordSize: n
        };
    }
    function Wn(e) {
        var r = String(e).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
        if (!r) throw new SyntaxError("Invalid number " + e);
        var t = r[1], n = r[2], i = parseFloat(r[4] || "0"), a = n.indexOf(".");
        i += a !== -1 ? a - 1 : n.length - 1;
        var o = n.replace(".", "").replace(/^0*/, function(u) {
            return i -= u.length, "";
        }).replace(/0*$/, "").split("").map(function(u) {
            return parseInt(u);
        });
        return o.length === 0 && (o.push(0), i++), {
            sign: t,
            coefficients: o,
            exponent: i
        };
    }
    function $s(e, r) {
        if (isNaN(e) || !isFinite(e)) return String(e);
        var t = Wn(e), n = Vn(t, r), i = n.exponent, a = n.coefficients, o = i % 3 === 0 ? i : i < 0 ? i - 3 - i % 3 : i - i % 3;
        if (ir(r)) for(; r > a.length || i - o + 1 > a.length;)a.push(0);
        else for(var u = Math.abs(i - o) - (a.length - 1), c = 0; c < u; c++)a.push(0);
        for(var s = Math.abs(i - o), l = 1; s > 0;)l++, s--;
        var v = a.slice(l).join(""), h = ir(r) && v.length || v.match(/[1-9]/) ? "." + v : "", p = a.slice(0, l).join("") + h + "e" + (i >= 0 ? "+" : "") + o.toString();
        return n.sign + p;
    }
    function qs(e, r) {
        if (isNaN(e) || !isFinite(e)) return String(e);
        var t = Wn(e), n = typeof r == "number" ? Vn(t, t.exponent + 1 + r) : t, i = n.coefficients, a = n.exponent + 1, o = a + (r || 0);
        return i.length < o && (i = i.concat(Rt(o - i.length))), a < 0 && (i = Rt(-a + 1).concat(i), a = 1), a < i.length && i.splice(a, 0, a === 0 ? "0." : "."), n.sign + i.join("");
    }
    function zo(e, r) {
        if (isNaN(e) || !isFinite(e)) return String(e);
        var t = Wn(e), n = r ? Vn(t, r) : t, i = n.coefficients, a = n.exponent;
        i.length < r && (i = i.concat(Rt(r - i.length)));
        var o = i.shift();
        return n.sign + o + (i.length > 0 ? "." + i.join("") : "") + "e" + (a >= 0 ? "+" : "") + a;
    }
    function ks(e, r, t) {
        if (isNaN(e) || !isFinite(e)) return String(e);
        var n = ta(t?.lowerExp, -3), i = ta(t?.upperExp, 5), a = Wn(e), o = r ? Vn(a, r) : a;
        if (o.exponent < n || o.exponent >= i) return zo(e, r);
        var u = o.coefficients, c = o.exponent;
        u.length < r && (u = u.concat(Rt(r - u.length))), u = u.concat(Rt(c - u.length + 1 + (u.length < r ? r - u.length : 0))), u = Rt(-c).concat(u);
        var s = c > 0 ? c : 0;
        return s < u.length - 1 && u.splice(s + 1, 0, "."), o.sign + u.join("");
    }
    function Vn(e, r) {
        for(var t = {
            sign: e.sign,
            coefficients: e.coefficients,
            exponent: e.exponent
        }, n = t.coefficients; r <= 0;)n.unshift(0), t.exponent++, r++;
        if (n.length > r) {
            var i = n.splice(r, n.length - r);
            if (i[0] >= 5) {
                var a = r - 1;
                for(n[a]++; n[a] === 10;)n.pop(), a === 0 && (n.unshift(0), t.exponent++, a++), a--, n[a]++;
            }
        }
        return t;
    }
    function Rt(e) {
        for(var r = [], t = 0; t < e; t++)r.push(0);
        return r;
    }
    function Hs(e) {
        return e.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
    }
    function ft(e, r) {
        var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-8, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
        if (t <= 0) throw new Error("Relative tolerance must be greater than 0");
        if (n < 0) throw new Error("Absolute tolerance must be at least 0");
        return isNaN(e) || isNaN(r) ? !1 : !isFinite(e) || !isFinite(r) ? e === r : e === r ? !0 : Math.abs(e - r) <= Math.max(t * Math.max(Math.abs(e), Math.abs(r)), n);
    }
    function ra(e, r) {
        if (ir(e)) return e;
        if (cr(e)) return e.toNumber();
        r();
    }
    function ta(e, r) {
        return ir(e) ? e : cr(e) ? e.toNumber() : r;
    }
    var Oo = function() {
        return Oo = xn.create, xn;
    }, Gs = [
        "?BigNumber",
        "?Complex",
        "?DenseMatrix",
        "?Fraction"
    ], Ws = he("typed", Gs, function(r) {
        var { BigNumber: t, Complex: n, DenseMatrix: i, Fraction: a } = r, o = Oo();
        return o.clear(), o.addTypes([
            {
                name: "number",
                test: ir
            },
            {
                name: "Complex",
                test: xi
            },
            {
                name: "BigNumber",
                test: cr
            },
            {
                name: "bigint",
                test: is
            },
            {
                name: "Fraction",
                test: Ti
            },
            {
                name: "Unit",
                test: Mo
            },
            {
                name: "identifier",
                test: (u)=>Wr && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(u)
            },
            {
                name: "string",
                test: Wr
            },
            {
                name: "Chain",
                test: Bs
            },
            {
                name: "Array",
                test: nr
            },
            {
                name: "Matrix",
                test: Ke
            },
            {
                name: "DenseMatrix",
                test: No
            },
            {
                name: "SparseMatrix",
                test: Bo
            },
            {
                name: "Range",
                test: xo
            },
            {
                name: "Index",
                test: Gn
            },
            {
                name: "boolean",
                test: as
            },
            {
                name: "ResultSet",
                test: os
            },
            {
                name: "Help",
                test: us
            },
            {
                name: "function",
                test: ss
            },
            {
                name: "Date",
                test: fs
            },
            {
                name: "RegExp",
                test: cs
            },
            {
                name: "null",
                test: vs
            },
            {
                name: "undefined",
                test: ds
            },
            {
                name: "AccessorNode",
                test: hs
            },
            {
                name: "ArrayNode",
                test: ps
            },
            {
                name: "AssignmentNode",
                test: ms
            },
            {
                name: "BlockNode",
                test: gs
            },
            {
                name: "ConditionalNode",
                test: Ds
            },
            {
                name: "ConstantNode",
                test: ys
            },
            {
                name: "FunctionNode",
                test: Es
            },
            {
                name: "FunctionAssignmentNode",
                test: ws
            },
            {
                name: "IndexNode",
                test: _s
            },
            {
                name: "Node",
                test: As
            },
            {
                name: "ObjectNode",
                test: Fs
            },
            {
                name: "OperatorNode",
                test: bs
            },
            {
                name: "ParenthesisNode",
                test: Cs
            },
            {
                name: "RangeNode",
                test: Ss
            },
            {
                name: "RelationalNode",
                test: Ms
            },
            {
                name: "SymbolNode",
                test: Ns
            },
            {
                name: "Map",
                test: ls
            },
            {
                name: "Object",
                test: Pi
            }
        ]), o.addConversions([
            {
                from: "number",
                to: "BigNumber",
                convert: function(c) {
                    if (t || En(c), Hs(c) > 15) throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + c + "). Use function bignumber(x) to convert to BigNumber.");
                    return new t(c);
                }
            },
            {
                from: "number",
                to: "Complex",
                convert: function(c) {
                    return n || _n(c), new n(c, 0);
                }
            },
            {
                from: "BigNumber",
                to: "Complex",
                convert: function(c) {
                    return n || _n(c), new n(c.toNumber(), 0);
                }
            },
            {
                from: "bigint",
                to: "number",
                convert: function(c) {
                    if (c > Number.MAX_SAFE_INTEGER) throw new TypeError("Cannot implicitly convert bigint to number: value exceeds the max safe integer value (value: " + c + ")");
                    return Number(c);
                }
            },
            {
                from: "bigint",
                to: "BigNumber",
                convert: function(c) {
                    return t || En(c), new t(c.toString());
                }
            },
            {
                from: "bigint",
                to: "Fraction",
                convert: function(c) {
                    return a || An(c), new a(c);
                }
            },
            {
                from: "Fraction",
                to: "BigNumber",
                convert: function(c) {
                    throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
                }
            },
            {
                from: "Fraction",
                to: "Complex",
                convert: function(c) {
                    return n || _n(c), new n(c.valueOf(), 0);
                }
            },
            {
                from: "number",
                to: "Fraction",
                convert: function(c) {
                    a || An(c);
                    var s = new a(c);
                    if (s.valueOf() !== c) throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + c + "). Use function fraction(x) to convert to Fraction.");
                    return s;
                }
            },
            {
                from: "string",
                to: "number",
                convert: function(c) {
                    var s = Number(c);
                    if (isNaN(s)) throw new Error('Cannot convert "' + c + '" to a number');
                    return s;
                }
            },
            {
                from: "string",
                to: "BigNumber",
                convert: function(c) {
                    t || En(c);
                    try {
                        return new t(c);
                    } catch  {
                        throw new Error('Cannot convert "' + c + '" to BigNumber');
                    }
                }
            },
            {
                from: "string",
                to: "bigint",
                convert: function(c) {
                    try {
                        return BigInt(c);
                    } catch  {
                        throw new Error('Cannot convert "' + c + '" to BigInt');
                    }
                }
            },
            {
                from: "string",
                to: "Fraction",
                convert: function(c) {
                    a || An(c);
                    try {
                        return new a(c);
                    } catch  {
                        throw new Error('Cannot convert "' + c + '" to Fraction');
                    }
                }
            },
            {
                from: "string",
                to: "Complex",
                convert: function(c) {
                    n || _n(c);
                    try {
                        return new n(c);
                    } catch  {
                        throw new Error('Cannot convert "' + c + '" to Complex');
                    }
                }
            },
            {
                from: "boolean",
                to: "number",
                convert: function(c) {
                    return +c;
                }
            },
            {
                from: "boolean",
                to: "BigNumber",
                convert: function(c) {
                    return t || En(c), new t(+c);
                }
            },
            {
                from: "boolean",
                to: "bigint",
                convert: function(c) {
                    return BigInt(+c);
                }
            },
            {
                from: "boolean",
                to: "Fraction",
                convert: function(c) {
                    return a || An(c), new a(+c);
                }
            },
            {
                from: "boolean",
                to: "string",
                convert: function(c) {
                    return String(c);
                }
            },
            {
                from: "Array",
                to: "Matrix",
                convert: function(c) {
                    return i || Vs(), new i(c);
                }
            },
            {
                from: "Matrix",
                to: "Array",
                convert: function(c) {
                    return c.valueOf();
                }
            }
        ]), o.onMismatch = (u, c, s)=>{
            var l = o.createError(u, c, s);
            if ([
                "wrongType",
                "mismatch"
            ].includes(l.data.category) && c.length === 1 && Bn(c[0]) && s.some((h)=>!h.params.includes(","))) {
                var v = new TypeError("Function '".concat(u, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(u, ")'."));
                throw v.data = l.data, v;
            }
            throw l;
        }, o.onMismatch = (u, c, s)=>{
            var l = o.createError(u, c, s);
            if ([
                "wrongType",
                "mismatch"
            ].includes(l.data.category) && c.length === 1 && Bn(c[0]) && s.some((h)=>!h.params.includes(","))) {
                var v = new TypeError("Function '".concat(u, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(u, ")'."));
                throw v.data = l.data, v;
            }
            throw l;
        }, o;
    });
    function En(e) {
        throw new Error("Cannot convert value ".concat(e, " into a BigNumber: no class 'BigNumber' provided"));
    }
    function _n(e) {
        throw new Error("Cannot convert value ".concat(e, " into a Complex number: no class 'Complex' provided"));
    }
    function Vs() {
        throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
    }
    function An(e) {
        throw new Error("Cannot convert value ".concat(e, " into a Fraction, no class 'Fraction' provided."));
    }
    var Di = 9e15, Et = 1e9, yi = "0123456789abcdef", Tn = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", Pn = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", wi = {
        precision: 20,
        rounding: 4,
        modulo: 1,
        toExpNeg: -7,
        toExpPos: 21,
        minE: -9e15,
        maxE: Di,
        crypto: !1
    }, Io, st, Pe = !0, Zn = "[DecimalError] ", wt = Zn + "Invalid argument: ", Ro = Zn + "Precision limit exceeded", Lo = Zn + "crypto unavailable", Uo = "[object Decimal]", Mr = Math.floor, gr = Math.pow, Zs = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, Ys = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, Qs = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, $o = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, jr = 1e7, Ne = 7, Xs = 9007199254740991, Js = Tn.length - 1, Ei = Pn.length - 1, ve = {
        toStringTag: Uo
    };
    ve.absoluteValue = ve.abs = function() {
        var e = new this.constructor(this);
        return e.s < 0 && (e.s = 1), Se(e);
    };
    ve.ceil = function() {
        return Se(new this.constructor(this), this.e + 1, 2);
    };
    ve.clampedTo = ve.clamp = function(e, r) {
        var t, n = this, i = n.constructor;
        if (e = new i(e), r = new i(r), !e.s || !r.s) return new i(NaN);
        if (e.gt(r)) throw Error(wt + r);
        return t = n.cmp(e), t < 0 ? e : n.cmp(r) > 0 ? r : new i(n);
    };
    ve.comparedTo = ve.cmp = function(e) {
        var r, t, n, i, a = this, o = a.d, u = (e = new a.constructor(e)).d, c = a.s, s = e.s;
        if (!o || !u) return !c || !s ? NaN : c !== s ? c : o === u ? 0 : !o ^ c < 0 ? 1 : -1;
        if (!o[0] || !u[0]) return o[0] ? c : u[0] ? -s : 0;
        if (c !== s) return c;
        if (a.e !== e.e) return a.e > e.e ^ c < 0 ? 1 : -1;
        for(n = o.length, i = u.length, r = 0, t = n < i ? n : i; r < t; ++r)if (o[r] !== u[r]) return o[r] > u[r] ^ c < 0 ? 1 : -1;
        return n === i ? 0 : n > i ^ c < 0 ? 1 : -1;
    };
    ve.cosine = ve.cos = function() {
        var e, r, t = this, n = t.constructor;
        return t.d ? t.d[0] ? (e = n.precision, r = n.rounding, n.precision = e + Math.max(t.e, t.sd()) + Ne, n.rounding = 1, t = Ks(n, Wo(n, t)), n.precision = e, n.rounding = r, Se(st == 2 || st == 3 ? t.neg() : t, e, r, !0)) : new n(1) : new n(NaN);
    };
    ve.cubeRoot = ve.cbrt = function() {
        var e, r, t, n, i, a, o, u, c, s, l = this, v = l.constructor;
        if (!l.isFinite() || l.isZero()) return new v(l);
        for(Pe = !1, a = l.s * gr(l.s * l, 1 / 3), !a || Math.abs(a) == 1 / 0 ? (t = _r(l.d), e = l.e, (a = (e - t.length + 1) % 3) && (t += a == 1 || a == -2 ? "0" : "00"), a = gr(t, 1 / 3), e = Mr((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), a == 1 / 0 ? t = "5e" + e : (t = a.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new v(t), n.s = l.s) : n = new v(a.toString()), o = (e = v.precision) + 3;;)if (u = n, c = u.times(u).times(u), s = c.plus(l), n = or(s.plus(l).times(u), s.plus(c), o + 2, 1), _r(u.d).slice(0, o) === (t = _r(n.d)).slice(0, o)) if (t = t.slice(o - 3, o + 1), t == "9999" || !i && t == "4999") {
            if (!i && (Se(u, e + 1, 0), u.times(u).times(u).eq(l))) {
                n = u;
                break;
            }
            o += 4, i = 1;
        } else {
            (!+t || !+t.slice(1) && t.charAt(0) == "5") && (Se(n, e + 1, 1), r = !n.times(n).times(n).eq(l));
            break;
        }
        return Pe = !0, Se(n, e, v.rounding, r);
    };
    ve.decimalPlaces = ve.dp = function() {
        var e, r = this.d, t = NaN;
        if (r) {
            if (e = r.length - 1, t = (e - Mr(this.e / Ne)) * Ne, e = r[e], e) for(; e % 10 == 0; e /= 10)t--;
            t < 0 && (t = 0);
        }
        return t;
    };
    ve.dividedBy = ve.div = function(e) {
        return or(this, new this.constructor(e));
    };
    ve.dividedToIntegerBy = ve.divToInt = function(e) {
        var r = this, t = r.constructor;
        return Se(or(r, new t(e), 0, 1, 1), t.precision, t.rounding);
    };
    ve.equals = ve.eq = function(e) {
        return this.cmp(e) === 0;
    };
    ve.floor = function() {
        return Se(new this.constructor(this), this.e + 1, 3);
    };
    ve.greaterThan = ve.gt = function(e) {
        return this.cmp(e) > 0;
    };
    ve.greaterThanOrEqualTo = ve.gte = function(e) {
        var r = this.cmp(e);
        return r == 1 || r === 0;
    };
    ve.hyperbolicCosine = ve.cosh = function() {
        var e, r, t, n, i, a = this, o = a.constructor, u = new o(1);
        if (!a.isFinite()) return new o(a.s ? 1 / 0 : NaN);
        if (a.isZero()) return u;
        t = o.precision, n = o.rounding, o.precision = t + Math.max(a.e, a.sd()) + 4, o.rounding = 1, i = a.d.length, i < 32 ? (e = Math.ceil(i / 3), r = (1 / Qn(4, e)).toString()) : (e = 16, r = "2.3283064365386962890625e-10"), a = Ut(o, 1, a.times(r), new o(1), !0);
        for(var c, s = e, l = new o(8); s--;)c = a.times(a), a = u.minus(c.times(l.minus(c.times(l))));
        return Se(a, o.precision = t, o.rounding = n, !0);
    };
    ve.hyperbolicSine = ve.sinh = function() {
        var e, r, t, n, i = this, a = i.constructor;
        if (!i.isFinite() || i.isZero()) return new a(i);
        if (r = a.precision, t = a.rounding, a.precision = r + Math.max(i.e, i.sd()) + 4, a.rounding = 1, n = i.d.length, n < 3) i = Ut(a, 2, i, i, !0);
        else {
            e = 1.4 * Math.sqrt(n), e = e > 16 ? 16 : e | 0, i = i.times(1 / Qn(5, e)), i = Ut(a, 2, i, i, !0);
            for(var o, u = new a(5), c = new a(16), s = new a(20); e--;)o = i.times(i), i = i.times(u.plus(o.times(c.times(o).plus(s))));
        }
        return a.precision = r, a.rounding = t, Se(i, r, t, !0);
    };
    ve.hyperbolicTangent = ve.tanh = function() {
        var e, r, t = this, n = t.constructor;
        return t.isFinite() ? t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + 7, n.rounding = 1, or(t.sinh(), t.cosh(), n.precision = e, n.rounding = r)) : new n(t.s);
    };
    ve.inverseCosine = ve.acos = function() {
        var e, r = this, t = r.constructor, n = r.abs().cmp(1), i = t.precision, a = t.rounding;
        return n !== -1 ? n === 0 ? r.isNeg() ? Jr(t, i, a) : new t(0) : new t(NaN) : r.isZero() ? Jr(t, i + 4, a).times(.5) : (t.precision = i + 6, t.rounding = 1, r = r.asin(), e = Jr(t, i + 4, a).times(.5), t.precision = i, t.rounding = a, e.minus(r));
    };
    ve.inverseHyperbolicCosine = ve.acosh = function() {
        var e, r, t = this, n = t.constructor;
        return t.lte(1) ? new n(t.eq(1) ? 0 : NaN) : t.isFinite() ? (e = n.precision, r = n.rounding, n.precision = e + Math.max(Math.abs(t.e), t.sd()) + 4, n.rounding = 1, Pe = !1, t = t.times(t).minus(1).sqrt().plus(t), Pe = !0, n.precision = e, n.rounding = r, t.ln()) : new n(t);
    };
    ve.inverseHyperbolicSine = ve.asinh = function() {
        var e, r, t = this, n = t.constructor;
        return !t.isFinite() || t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + 2 * Math.max(Math.abs(t.e), t.sd()) + 6, n.rounding = 1, Pe = !1, t = t.times(t).plus(1).sqrt().plus(t), Pe = !0, n.precision = e, n.rounding = r, t.ln());
    };
    ve.inverseHyperbolicTangent = ve.atanh = function() {
        var e, r, t, n, i = this, a = i.constructor;
        return i.isFinite() ? i.e >= 0 ? new a(i.abs().eq(1) ? i.s / 0 : i.isZero() ? i : NaN) : (e = a.precision, r = a.rounding, n = i.sd(), Math.max(n, e) < 2 * -i.e - 1 ? Se(new a(i), e, r, !0) : (a.precision = t = n - i.e, i = or(i.plus(1), new a(1).minus(i), t + e, 1), a.precision = e + 4, a.rounding = 1, i = i.ln(), a.precision = e, a.rounding = r, i.times(.5))) : new a(NaN);
    };
    ve.inverseSine = ve.asin = function() {
        var e, r, t, n, i = this, a = i.constructor;
        return i.isZero() ? new a(i) : (r = i.abs().cmp(1), t = a.precision, n = a.rounding, r !== -1 ? r === 0 ? (e = Jr(a, t + 4, n).times(.5), e.s = i.s, e) : new a(NaN) : (a.precision = t + 6, a.rounding = 1, i = i.div(new a(1).minus(i.times(i)).sqrt().plus(1)).atan(), a.precision = t, a.rounding = n, i.times(2)));
    };
    ve.inverseTangent = ve.atan = function() {
        var e, r, t, n, i, a, o, u, c, s = this, l = s.constructor, v = l.precision, h = l.rounding;
        if (s.isFinite()) {
            if (s.isZero()) return new l(s);
            if (s.abs().eq(1) && v + 4 <= Ei) return o = Jr(l, v + 4, h).times(.25), o.s = s.s, o;
        } else {
            if (!s.s) return new l(NaN);
            if (v + 4 <= Ei) return o = Jr(l, v + 4, h).times(.5), o.s = s.s, o;
        }
        for(l.precision = u = v + 10, l.rounding = 1, t = Math.min(28, u / Ne + 2 | 0), e = t; e; --e)s = s.div(s.times(s).plus(1).sqrt().plus(1));
        for(Pe = !1, r = Math.ceil(u / Ne), n = 1, c = s.times(s), o = new l(s), i = s; e !== -1;)if (i = i.times(c), a = o.minus(i.div(n += 2)), i = i.times(c), o = a.plus(i.div(n += 2)), o.d[r] !== void 0) for(e = r; o.d[e] === a.d[e] && e--;);
        return t && (o = o.times(2 << t - 1)), Pe = !0, Se(o, l.precision = v, l.rounding = h, !0);
    };
    ve.isFinite = function() {
        return !!this.d;
    };
    ve.isInteger = ve.isInt = function() {
        return !!this.d && Mr(this.e / Ne) > this.d.length - 2;
    };
    ve.isNaN = function() {
        return !this.s;
    };
    ve.isNegative = ve.isNeg = function() {
        return this.s < 0;
    };
    ve.isPositive = ve.isPos = function() {
        return this.s > 0;
    };
    ve.isZero = function() {
        return !!this.d && this.d[0] === 0;
    };
    ve.lessThan = ve.lt = function(e) {
        return this.cmp(e) < 0;
    };
    ve.lessThanOrEqualTo = ve.lte = function(e) {
        return this.cmp(e) < 1;
    };
    ve.logarithm = ve.log = function(e) {
        var r, t, n, i, a, o, u, c, s = this, l = s.constructor, v = l.precision, h = l.rounding, p = 5;
        if (e == null) e = new l(10), r = !0;
        else {
            if (e = new l(e), t = e.d, e.s < 0 || !t || !t[0] || e.eq(1)) return new l(NaN);
            r = e.eq(10);
        }
        if (t = s.d, s.s < 0 || !t || !t[0] || s.eq(1)) return new l(t && !t[0] ? -1 / 0 : s.s != 1 ? NaN : t ? 0 : 1 / 0);
        if (r) if (t.length > 1) a = !0;
        else {
            for(i = t[0]; i % 10 === 0;)i /= 10;
            a = i !== 1;
        }
        if (Pe = !1, u = v + p, o = Dt(s, u), n = r ? zn(l, u + 10) : Dt(e, u), c = or(o, n, u, 1), an(c.d, i = v, h)) do if (u += 10, o = Dt(s, u), n = r ? zn(l, u + 10) : Dt(e, u), c = or(o, n, u, 1), !a) {
            +_r(c.d).slice(i + 1, i + 15) + 1 == 1e14 && (c = Se(c, v + 1, 0));
            break;
        }
        while (an(c.d, i += 10, h));
        return Pe = !0, Se(c, v, h);
    };
    ve.minus = ve.sub = function(e) {
        var r, t, n, i, a, o, u, c, s, l, v, h, p = this, g = p.constructor;
        if (e = new g(e), !p.d || !e.d) return !p.s || !e.s ? e = new g(NaN) : p.d ? e.s = -e.s : e = new g(e.d || p.s !== e.s ? p : NaN), e;
        if (p.s != e.s) return e.s = -e.s, p.plus(e);
        if (s = p.d, h = e.d, u = g.precision, c = g.rounding, !s[0] || !h[0]) {
            if (h[0]) e.s = -e.s;
            else if (s[0]) e = new g(p);
            else return new g(c === 3 ? -0 : 0);
            return Pe ? Se(e, u, c) : e;
        }
        if (t = Mr(e.e / Ne), l = Mr(p.e / Ne), s = s.slice(), a = l - t, a) {
            for(v = a < 0, v ? (r = s, a = -a, o = h.length) : (r = h, t = l, o = s.length), n = Math.max(Math.ceil(u / Ne), o) + 2, a > n && (a = n, r.length = 1), r.reverse(), n = a; n--;)r.push(0);
            r.reverse();
        } else {
            for(n = s.length, o = h.length, v = n < o, v && (o = n), n = 0; n < o; n++)if (s[n] != h[n]) {
                v = s[n] < h[n];
                break;
            }
            a = 0;
        }
        for(v && (r = s, s = h, h = r, e.s = -e.s), o = s.length, n = h.length - o; n > 0; --n)s[o++] = 0;
        for(n = h.length; n > a;){
            if (s[--n] < h[n]) {
                for(i = n; i && s[--i] === 0;)s[i] = jr - 1;
                --s[i], s[n] += jr;
            }
            s[n] -= h[n];
        }
        for(; s[--o] === 0;)s.pop();
        for(; s[0] === 0; s.shift())--t;
        return s[0] ? (e.d = s, e.e = Yn(s, t), Pe ? Se(e, u, c) : e) : new g(c === 3 ? -0 : 0);
    };
    ve.modulo = ve.mod = function(e) {
        var r, t = this, n = t.constructor;
        return e = new n(e), !t.d || !e.s || e.d && !e.d[0] ? new n(NaN) : !e.d || t.d && !t.d[0] ? Se(new n(t), n.precision, n.rounding) : (Pe = !1, n.modulo == 9 ? (r = or(t, e.abs(), 0, 3, 1), r.s *= e.s) : r = or(t, e, 0, n.modulo, 1), r = r.times(e), Pe = !0, t.minus(r));
    };
    ve.naturalExponential = ve.exp = function() {
        return _i(this);
    };
    ve.naturalLogarithm = ve.ln = function() {
        return Dt(this);
    };
    ve.negated = ve.neg = function() {
        var e = new this.constructor(this);
        return e.s = -e.s, Se(e);
    };
    ve.plus = ve.add = function(e) {
        var r, t, n, i, a, o, u, c, s, l, v = this, h = v.constructor;
        if (e = new h(e), !v.d || !e.d) return !v.s || !e.s ? e = new h(NaN) : v.d || (e = new h(e.d || v.s === e.s ? v : NaN)), e;
        if (v.s != e.s) return e.s = -e.s, v.minus(e);
        if (s = v.d, l = e.d, u = h.precision, c = h.rounding, !s[0] || !l[0]) return l[0] || (e = new h(v)), Pe ? Se(e, u, c) : e;
        if (a = Mr(v.e / Ne), n = Mr(e.e / Ne), s = s.slice(), i = a - n, i) {
            for(i < 0 ? (t = s, i = -i, o = l.length) : (t = l, n = a, o = s.length), a = Math.ceil(u / Ne), o = a > o ? a + 1 : o + 1, i > o && (i = o, t.length = 1), t.reverse(); i--;)t.push(0);
            t.reverse();
        }
        for(o = s.length, i = l.length, o - i < 0 && (i = o, t = l, l = s, s = t), r = 0; i;)r = (s[--i] = s[i] + l[i] + r) / jr | 0, s[i] %= jr;
        for(r && (s.unshift(r), ++n), o = s.length; s[--o] == 0;)s.pop();
        return e.d = s, e.e = Yn(s, n), Pe ? Se(e, u, c) : e;
    };
    ve.precision = ve.sd = function(e) {
        var r, t = this;
        if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(wt + e);
        return t.d ? (r = qo(t.d), e && t.e + 1 > r && (r = t.e + 1)) : r = NaN, r;
    };
    ve.round = function() {
        var e = this, r = e.constructor;
        return Se(new r(e), e.e + 1, r.rounding);
    };
    ve.sine = ve.sin = function() {
        var e, r, t = this, n = t.constructor;
        return t.isFinite() ? t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + Math.max(t.e, t.sd()) + Ne, n.rounding = 1, t = ef(n, Wo(n, t)), n.precision = e, n.rounding = r, Se(st > 2 ? t.neg() : t, e, r, !0)) : new n(NaN);
    };
    ve.squareRoot = ve.sqrt = function() {
        var e, r, t, n, i, a, o = this, u = o.d, c = o.e, s = o.s, l = o.constructor;
        if (s !== 1 || !u || !u[0]) return new l(!s || s < 0 && (!u || u[0]) ? NaN : u ? o : 1 / 0);
        for(Pe = !1, s = Math.sqrt(+o), s == 0 || s == 1 / 0 ? (r = _r(u), (r.length + c) % 2 == 0 && (r += "0"), s = Math.sqrt(r), c = Mr((c + 1) / 2) - (c < 0 || c % 2), s == 1 / 0 ? r = "5e" + c : (r = s.toExponential(), r = r.slice(0, r.indexOf("e") + 1) + c), n = new l(r)) : n = new l(s.toString()), t = (c = l.precision) + 3;;)if (a = n, n = a.plus(or(o, a, t + 2, 1)).times(.5), _r(a.d).slice(0, t) === (r = _r(n.d)).slice(0, t)) if (r = r.slice(t - 3, t + 1), r == "9999" || !i && r == "4999") {
            if (!i && (Se(a, c + 1, 0), a.times(a).eq(o))) {
                n = a;
                break;
            }
            t += 4, i = 1;
        } else {
            (!+r || !+r.slice(1) && r.charAt(0) == "5") && (Se(n, c + 1, 1), e = !n.times(n).eq(o));
            break;
        }
        return Pe = !0, Se(n, c, l.rounding, e);
    };
    ve.tangent = ve.tan = function() {
        var e, r, t = this, n = t.constructor;
        return t.isFinite() ? t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + 10, n.rounding = 1, t = t.sin(), t.s = 1, t = or(t, new n(1).minus(t.times(t)).sqrt(), e + 10, 0), n.precision = e, n.rounding = r, Se(st == 2 || st == 4 ? t.neg() : t, e, r, !0)) : new n(NaN);
    };
    ve.times = ve.mul = function(e) {
        var r, t, n, i, a, o, u, c, s, l = this, v = l.constructor, h = l.d, p = (e = new v(e)).d;
        if (e.s *= l.s, !h || !h[0] || !p || !p[0]) return new v(!e.s || h && !h[0] && !p || p && !p[0] && !h ? NaN : !h || !p ? e.s / 0 : e.s * 0);
        for(t = Mr(l.e / Ne) + Mr(e.e / Ne), c = h.length, s = p.length, c < s && (a = h, h = p, p = a, o = c, c = s, s = o), a = [], o = c + s, n = o; n--;)a.push(0);
        for(n = s; --n >= 0;){
            for(r = 0, i = c + n; i > n;)u = a[i] + p[n] * h[i - n - 1] + r, a[i--] = u % jr | 0, r = u / jr | 0;
            a[i] = (a[i] + r) % jr | 0;
        }
        for(; !a[--o];)a.pop();
        return r ? ++t : a.shift(), e.d = a, e.e = Yn(a, t), Pe ? Se(e, v.precision, v.rounding) : e;
    };
    ve.toBinary = function(e, r) {
        return zi(this, 2, e, r);
    };
    ve.toDecimalPlaces = ve.toDP = function(e, r) {
        var t = this, n = t.constructor;
        return t = new n(t), e === void 0 ? t : (zr(e, 0, Et), r === void 0 ? r = n.rounding : zr(r, 0, 8), Se(t, e + t.e + 1, r));
    };
    ve.toExponential = function(e, r) {
        var t, n = this, i = n.constructor;
        return e === void 0 ? t = tt(n, !0) : (zr(e, 0, Et), r === void 0 ? r = i.rounding : zr(r, 0, 8), n = Se(new i(n), e + 1, r), t = tt(n, !0, e + 1)), n.isNeg() && !n.isZero() ? "-" + t : t;
    };
    ve.toFixed = function(e, r) {
        var t, n, i = this, a = i.constructor;
        return e === void 0 ? t = tt(i) : (zr(e, 0, Et), r === void 0 ? r = a.rounding : zr(r, 0, 8), n = Se(new a(i), e + i.e + 1, r), t = tt(n, !1, e + n.e + 1)), i.isNeg() && !i.isZero() ? "-" + t : t;
    };
    ve.toFraction = function(e) {
        var r, t, n, i, a, o, u, c, s, l, v, h, p = this, g = p.d, d = p.constructor;
        if (!g) return new d(p);
        if (s = t = new d(1), n = c = new d(0), r = new d(n), a = r.e = qo(g) - p.e - 1, o = a % Ne, r.d[0] = gr(10, o < 0 ? Ne + o : o), e == null) e = a > 0 ? r : s;
        else {
            if (u = new d(e), !u.isInt() || u.lt(s)) throw Error(wt + u);
            e = u.gt(r) ? a > 0 ? r : s : u;
        }
        for(Pe = !1, u = new d(_r(g)), l = d.precision, d.precision = a = g.length * Ne * 2; v = or(u, r, 0, 1, 1), i = t.plus(v.times(n)), i.cmp(e) != 1;)t = n, n = i, i = s, s = c.plus(v.times(i)), c = i, i = r, r = u.minus(v.times(i)), u = i;
        return i = or(e.minus(t), n, 0, 1, 1), c = c.plus(i.times(s)), t = t.plus(i.times(n)), c.s = s.s = p.s, h = or(s, n, a, 1).minus(p).abs().cmp(or(c, t, a, 1).minus(p).abs()) < 1 ? [
            s,
            n
        ] : [
            c,
            t
        ], d.precision = l, Pe = !0, h;
    };
    ve.toHexadecimal = ve.toHex = function(e, r) {
        return zi(this, 16, e, r);
    };
    ve.toNearest = function(e, r) {
        var t = this, n = t.constructor;
        if (t = new n(t), e == null) {
            if (!t.d) return t;
            e = new n(1), r = n.rounding;
        } else {
            if (e = new n(e), r === void 0 ? r = n.rounding : zr(r, 0, 8), !t.d) return e.s ? t : e;
            if (!e.d) return e.s && (e.s = t.s), e;
        }
        return e.d[0] ? (Pe = !1, t = or(t, e, 0, r, 1).times(e), Pe = !0, Se(t)) : (e.s = t.s, t = e), t;
    };
    ve.toNumber = function() {
        return +this;
    };
    ve.toOctal = function(e, r) {
        return zi(this, 8, e, r);
    };
    ve.toPower = ve.pow = function(e) {
        var r, t, n, i, a, o, u = this, c = u.constructor, s = +(e = new c(e));
        if (!u.d || !e.d || !u.d[0] || !e.d[0]) return new c(gr(+u, s));
        if (u = new c(u), u.eq(1)) return u;
        if (n = c.precision, a = c.rounding, e.eq(1)) return Se(u, n, a);
        if (r = Mr(e.e / Ne), r >= e.d.length - 1 && (t = s < 0 ? -s : s) <= Xs) return i = ko(c, u, t, n), e.s < 0 ? new c(1).div(i) : Se(i, n, a);
        if (o = u.s, o < 0) {
            if (r < e.d.length - 1) return new c(NaN);
            if (e.d[r] & 1 || (o = 1), u.e == 0 && u.d[0] == 1 && u.d.length == 1) return u.s = o, u;
        }
        return t = gr(+u, s), r = t == 0 || !isFinite(t) ? Mr(s * (Math.log("0." + _r(u.d)) / Math.LN10 + u.e + 1)) : new c(t + "").e, r > c.maxE + 1 || r < c.minE - 1 ? new c(r > 0 ? o / 0 : 0) : (Pe = !1, c.rounding = u.s = 1, t = Math.min(12, (r + "").length), i = _i(e.times(Dt(u, n + t)), n), i.d && (i = Se(i, n + 5, 1), an(i.d, n, a) && (r = n + 10, i = Se(_i(e.times(Dt(u, r + t)), r), r + 5, 1), +_r(i.d).slice(n + 1, n + 15) + 1 == 1e14 && (i = Se(i, n + 1, 0)))), i.s = o, Pe = !0, c.rounding = a, Se(i, n, a));
    };
    ve.toPrecision = function(e, r) {
        var t, n = this, i = n.constructor;
        return e === void 0 ? t = tt(n, n.e <= i.toExpNeg || n.e >= i.toExpPos) : (zr(e, 1, Et), r === void 0 ? r = i.rounding : zr(r, 0, 8), n = Se(new i(n), e, r), t = tt(n, e <= n.e || n.e <= i.toExpNeg, e)), n.isNeg() && !n.isZero() ? "-" + t : t;
    };
    ve.toSignificantDigits = ve.toSD = function(e, r) {
        var t = this, n = t.constructor;
        return e === void 0 ? (e = n.precision, r = n.rounding) : (zr(e, 1, Et), r === void 0 ? r = n.rounding : zr(r, 0, 8)), Se(new n(t), e, r);
    };
    ve.toString = function() {
        var e = this, r = e.constructor, t = tt(e, e.e <= r.toExpNeg || e.e >= r.toExpPos);
        return e.isNeg() && !e.isZero() ? "-" + t : t;
    };
    ve.truncated = ve.trunc = function() {
        return Se(new this.constructor(this), this.e + 1, 1);
    };
    ve.valueOf = ve.toJSON = function() {
        var e = this, r = e.constructor, t = tt(e, e.e <= r.toExpNeg || e.e >= r.toExpPos);
        return e.isNeg() ? "-" + t : t;
    };
    function _r(e) {
        var r, t, n, i = e.length - 1, a = "", o = e[0];
        if (i > 0) {
            for(a += o, r = 1; r < i; r++)n = e[r] + "", t = Ne - n.length, t && (a += mt(t)), a += n;
            o = e[r], n = o + "", t = Ne - n.length, t && (a += mt(t));
        } else if (o === 0) return "0";
        for(; o % 10 === 0;)o /= 10;
        return a + o;
    }
    function zr(e, r, t) {
        if (e !== ~~e || e < r || e > t) throw Error(wt + e);
    }
    function an(e, r, t, n) {
        var i, a, o, u;
        for(a = e[0]; a >= 10; a /= 10)--r;
        return --r < 0 ? (r += Ne, i = 0) : (i = Math.ceil((r + 1) / Ne), r %= Ne), a = gr(10, Ne - r), u = e[i] % a | 0, n == null ? r < 3 ? (r == 0 ? u = u / 100 | 0 : r == 1 && (u = u / 10 | 0), o = t < 4 && u == 99999 || t > 3 && u == 49999 || u == 5e4 || u == 0) : o = (t < 4 && u + 1 == a || t > 3 && u + 1 == a / 2) && (e[i + 1] / a / 100 | 0) == gr(10, r - 2) - 1 || (u == a / 2 || u == 0) && (e[i + 1] / a / 100 | 0) == 0 : r < 4 ? (r == 0 ? u = u / 1e3 | 0 : r == 1 ? u = u / 100 | 0 : r == 2 && (u = u / 10 | 0), o = (n || t < 4) && u == 9999 || !n && t > 3 && u == 4999) : o = ((n || t < 4) && u + 1 == a || !n && t > 3 && u + 1 == a / 2) && (e[i + 1] / a / 1e3 | 0) == gr(10, r - 3) - 1, o;
    }
    function bn(e, r, t) {
        for(var n, i = [
            0
        ], a, o = 0, u = e.length; o < u;){
            for(a = i.length; a--;)i[a] *= r;
            for(i[0] += yi.indexOf(e.charAt(o++)), n = 0; n < i.length; n++)i[n] > t - 1 && (i[n + 1] === void 0 && (i[n + 1] = 0), i[n + 1] += i[n] / t | 0, i[n] %= t);
        }
        return i.reverse();
    }
    function Ks(e, r) {
        var t, n, i;
        if (r.isZero()) return r;
        n = r.d.length, n < 32 ? (t = Math.ceil(n / 3), i = (1 / Qn(4, t)).toString()) : (t = 16, i = "2.3283064365386962890625e-10"), e.precision += t, r = Ut(e, 1, r.times(i), new e(1));
        for(var a = t; a--;){
            var o = r.times(r);
            r = o.times(o).minus(o).times(8).plus(1);
        }
        return e.precision -= t, r;
    }
    var or = function() {
        function e(n, i, a) {
            var o, u = 0, c = n.length;
            for(n = n.slice(); c--;)o = n[c] * i + u, n[c] = o % a | 0, u = o / a | 0;
            return u && n.unshift(u), n;
        }
        function r(n, i, a, o) {
            var u, c;
            if (a != o) c = a > o ? 1 : -1;
            else for(u = c = 0; u < a; u++)if (n[u] != i[u]) {
                c = n[u] > i[u] ? 1 : -1;
                break;
            }
            return c;
        }
        function t(n, i, a, o) {
            for(var u = 0; a--;)n[a] -= u, u = n[a] < i[a] ? 1 : 0, n[a] = u * o + n[a] - i[a];
            for(; !n[0] && n.length > 1;)n.shift();
        }
        return function(n, i, a, o, u, c) {
            var s, l, v, h, p, g, d, y, D, b, E, M, F, w, N, S, _, x, T, z, q = n.constructor, $ = n.s == i.s ? 1 : -1, k = n.d, L = i.d;
            if (!k || !k[0] || !L || !L[0]) return new q(!n.s || !i.s || (k ? L && k[0] == L[0] : !L) ? NaN : k && k[0] == 0 || !L ? $ * 0 : $ / 0);
            for(c ? (p = 1, l = n.e - i.e) : (c = jr, p = Ne, l = Mr(n.e / p) - Mr(i.e / p)), T = L.length, _ = k.length, D = new q($), b = D.d = [], v = 0; L[v] == (k[v] || 0); v++);
            if (L[v] > (k[v] || 0) && l--, a == null ? (w = a = q.precision, o = q.rounding) : u ? w = a + (n.e - i.e) + 1 : w = a, w < 0) b.push(1), g = !0;
            else {
                if (w = w / p + 2 | 0, v = 0, T == 1) {
                    for(h = 0, L = L[0], w++; (v < _ || h) && w--; v++)N = h * c + (k[v] || 0), b[v] = N / L | 0, h = N % L | 0;
                    g = h || v < _;
                } else {
                    for(h = c / (L[0] + 1) | 0, h > 1 && (L = e(L, h, c), k = e(k, h, c), T = L.length, _ = k.length), S = T, E = k.slice(0, T), M = E.length; M < T;)E[M++] = 0;
                    z = L.slice(), z.unshift(0), x = L[0], L[1] >= c / 2 && ++x;
                    do h = 0, s = r(L, E, T, M), s < 0 ? (F = E[0], T != M && (F = F * c + (E[1] || 0)), h = F / x | 0, h > 1 ? (h >= c && (h = c - 1), d = e(L, h, c), y = d.length, M = E.length, s = r(d, E, y, M), s == 1 && (h--, t(d, T < y ? z : L, y, c))) : (h == 0 && (s = h = 1), d = L.slice()), y = d.length, y < M && d.unshift(0), t(E, d, M, c), s == -1 && (M = E.length, s = r(L, E, T, M), s < 1 && (h++, t(E, T < M ? z : L, M, c))), M = E.length) : s === 0 && (h++, E = [
                        0
                    ]), b[v++] = h, s && E[0] ? E[M++] = k[S] || 0 : (E = [
                        k[S]
                    ], M = 1);
                    while ((S++ < _ || E[0] !== void 0) && w--);
                    g = E[0] !== void 0;
                }
                b[0] || b.shift();
            }
            if (p == 1) D.e = l, Io = g;
            else {
                for(v = 1, h = b[0]; h >= 10; h /= 10)v++;
                D.e = v + l * p - 1, Se(D, u ? a + D.e + 1 : a, o, g);
            }
            return D;
        };
    }();
    function Se(e, r, t, n) {
        var i, a, o, u, c, s, l, v, h, p = e.constructor;
        e: if (r != null) {
            if (v = e.d, !v) return e;
            for(i = 1, u = v[0]; u >= 10; u /= 10)i++;
            if (a = r - i, a < 0) a += Ne, o = r, l = v[h = 0], c = l / gr(10, i - o - 1) % 10 | 0;
            else if (h = Math.ceil((a + 1) / Ne), u = v.length, h >= u) if (n) {
                for(; u++ <= h;)v.push(0);
                l = c = 0, i = 1, a %= Ne, o = a - Ne + 1;
            } else break e;
            else {
                for(l = u = v[h], i = 1; u >= 10; u /= 10)i++;
                a %= Ne, o = a - Ne + i, c = o < 0 ? 0 : l / gr(10, i - o - 1) % 10 | 0;
            }
            if (n = n || r < 0 || v[h + 1] !== void 0 || (o < 0 ? l : l % gr(10, i - o - 1)), s = t < 4 ? (c || n) && (t == 0 || t == (e.s < 0 ? 3 : 2)) : c > 5 || c == 5 && (t == 4 || n || t == 6 && (a > 0 ? o > 0 ? l / gr(10, i - o) : 0 : v[h - 1]) % 10 & 1 || t == (e.s < 0 ? 8 : 7)), r < 1 || !v[0]) return v.length = 0, s ? (r -= e.e + 1, v[0] = gr(10, (Ne - r % Ne) % Ne), e.e = -r || 0) : v[0] = e.e = 0, e;
            if (a == 0 ? (v.length = h, u = 1, h--) : (v.length = h + 1, u = gr(10, Ne - a), v[h] = o > 0 ? (l / gr(10, i - o) % gr(10, o) | 0) * u : 0), s) for(;;)if (h == 0) {
                for(a = 1, o = v[0]; o >= 10; o /= 10)a++;
                for(o = v[0] += u, u = 1; o >= 10; o /= 10)u++;
                a != u && (e.e++, v[0] == jr && (v[0] = 1));
                break;
            } else {
                if (v[h] += u, v[h] != jr) break;
                v[h--] = 0, u = 1;
            }
            for(a = v.length; v[--a] === 0;)v.pop();
        }
        return Pe && (e.e > p.maxE ? (e.d = null, e.e = NaN) : e.e < p.minE && (e.e = 0, e.d = [
            0
        ])), e;
    }
    function tt(e, r, t) {
        if (!e.isFinite()) return Go(e);
        var n, i = e.e, a = _r(e.d), o = a.length;
        return r ? (t && (n = t - o) > 0 ? a = a.charAt(0) + "." + a.slice(1) + mt(n) : o > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (e.e < 0 ? "e" : "e+") + e.e) : i < 0 ? (a = "0." + mt(-i - 1) + a, t && (n = t - o) > 0 && (a += mt(n))) : i >= o ? (a += mt(i + 1 - o), t && (n = t - i - 1) > 0 && (a = a + "." + mt(n))) : ((n = i + 1) < o && (a = a.slice(0, n) + "." + a.slice(n)), t && (n = t - o) > 0 && (i + 1 === o && (a += "."), a += mt(n))), a;
    }
    function Yn(e, r) {
        var t = e[0];
        for(r *= Ne; t >= 10; t /= 10)r++;
        return r;
    }
    function zn(e, r, t) {
        if (r > Js) throw Pe = !0, t && (e.precision = t), Error(Ro);
        return Se(new e(Tn), r, 1, !0);
    }
    function Jr(e, r, t) {
        if (r > Ei) throw Error(Ro);
        return Se(new e(Pn), r, t, !0);
    }
    function qo(e) {
        var r = e.length - 1, t = r * Ne + 1;
        if (r = e[r], r) {
            for(; r % 10 == 0; r /= 10)t--;
            for(r = e[0]; r >= 10; r /= 10)t++;
        }
        return t;
    }
    function mt(e) {
        for(var r = ""; e--;)r += "0";
        return r;
    }
    function ko(e, r, t, n) {
        var i, a = new e(1), o = Math.ceil(n / Ne + 4);
        for(Pe = !1;;){
            if (t % 2 && (a = a.times(r), ia(a.d, o) && (i = !0)), t = Mr(t / 2), t === 0) {
                t = a.d.length - 1, i && a.d[t] === 0 && ++a.d[t];
                break;
            }
            r = r.times(r), ia(r.d, o);
        }
        return Pe = !0, a;
    }
    function na(e) {
        return e.d[e.d.length - 1] & 1;
    }
    function Ho(e, r, t) {
        for(var n, i = new e(r[0]), a = 0; ++a < r.length;)if (n = new e(r[a]), n.s) i[t](n) && (i = n);
        else {
            i = n;
            break;
        }
        return i;
    }
    function _i(e, r) {
        var t, n, i, a, o, u, c, s = 0, l = 0, v = 0, h = e.constructor, p = h.rounding, g = h.precision;
        if (!e.d || !e.d[0] || e.e > 17) return new h(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
        for(r == null ? (Pe = !1, c = g) : c = r, u = new h(.03125); e.e > -2;)e = e.times(u), v += 5;
        for(n = Math.log(gr(2, v)) / Math.LN10 * 2 + 5 | 0, c += n, t = a = o = new h(1), h.precision = c;;){
            if (a = Se(a.times(e), c, 1), t = t.times(++l), u = o.plus(or(a, t, c, 1)), _r(u.d).slice(0, c) === _r(o.d).slice(0, c)) {
                for(i = v; i--;)o = Se(o.times(o), c, 1);
                if (r == null) if (s < 3 && an(o.d, c - n, p, s)) h.precision = c += 10, t = a = u = new h(1), l = 0, s++;
                else return Se(o, h.precision = g, p, Pe = !0);
                else return h.precision = g, o;
            }
            o = u;
        }
    }
    function Dt(e, r) {
        var t, n, i, a, o, u, c, s, l, v, h, p = 1, g = 10, d = e, y = d.d, D = d.constructor, b = D.rounding, E = D.precision;
        if (d.s < 0 || !y || !y[0] || !d.e && y[0] == 1 && y.length == 1) return new D(y && !y[0] ? -1 / 0 : d.s != 1 ? NaN : y ? 0 : d);
        if (r == null ? (Pe = !1, l = E) : l = r, D.precision = l += g, t = _r(y), n = t.charAt(0), Math.abs(a = d.e) < 15e14) {
            for(; n < 7 && n != 1 || n == 1 && t.charAt(1) > 3;)d = d.times(e), t = _r(d.d), n = t.charAt(0), p++;
            a = d.e, n > 1 ? (d = new D("0." + t), a++) : d = new D(n + "." + t.slice(1));
        } else return s = zn(D, l + 2, E).times(a + ""), d = Dt(new D(n + "." + t.slice(1)), l - g).plus(s), D.precision = E, r == null ? Se(d, E, b, Pe = !0) : d;
        for(v = d, c = o = d = or(d.minus(1), d.plus(1), l, 1), h = Se(d.times(d), l, 1), i = 3;;){
            if (o = Se(o.times(h), l, 1), s = c.plus(or(o, new D(i), l, 1)), _r(s.d).slice(0, l) === _r(c.d).slice(0, l)) if (c = c.times(2), a !== 0 && (c = c.plus(zn(D, l + 2, E).times(a + ""))), c = or(c, new D(p), l, 1), r == null) if (an(c.d, l - g, b, u)) D.precision = l += g, s = o = d = or(v.minus(1), v.plus(1), l, 1), h = Se(d.times(d), l, 1), i = u = 1;
            else return Se(c, D.precision = E, b, Pe = !0);
            else return D.precision = E, c;
            c = s, i += 2;
        }
    }
    function Go(e) {
        return String(e.s * e.s / 0);
    }
    function Ai(e, r) {
        var t, n, i;
        for((t = r.indexOf(".")) > -1 && (r = r.replace(".", "")), (n = r.search(/e/i)) > 0 ? (t < 0 && (t = n), t += +r.slice(n + 1), r = r.substring(0, n)) : t < 0 && (t = r.length), n = 0; r.charCodeAt(n) === 48; n++);
        for(i = r.length; r.charCodeAt(i - 1) === 48; --i);
        if (r = r.slice(n, i), r) {
            if (i -= n, e.e = t = t - n - 1, e.d = [], n = (t + 1) % Ne, t < 0 && (n += Ne), n < i) {
                for(n && e.d.push(+r.slice(0, n)), i -= Ne; n < i;)e.d.push(+r.slice(n, n += Ne));
                r = r.slice(n), n = Ne - r.length;
            } else n -= i;
            for(; n--;)r += "0";
            e.d.push(+r), Pe && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [
                0
            ]));
        } else e.e = 0, e.d = [
            0
        ];
        return e;
    }
    function js(e, r) {
        var t, n, i, a, o, u, c, s, l;
        if (r.indexOf("_") > -1) {
            if (r = r.replace(/(\d)_(?=\d)/g, "$1"), $o.test(r)) return Ai(e, r);
        } else if (r === "Infinity" || r === "NaN") return +r || (e.s = NaN), e.e = NaN, e.d = null, e;
        if (Ys.test(r)) t = 16, r = r.toLowerCase();
        else if (Zs.test(r)) t = 2;
        else if (Qs.test(r)) t = 8;
        else throw Error(wt + r);
        for(a = r.search(/p/i), a > 0 ? (c = +r.slice(a + 1), r = r.substring(2, a)) : r = r.slice(2), a = r.indexOf("."), o = a >= 0, n = e.constructor, o && (r = r.replace(".", ""), u = r.length, a = u - a, i = ko(n, new n(t), a, a * 2)), s = bn(r, t, jr), l = s.length - 1, a = l; s[a] === 0; --a)s.pop();
        return a < 0 ? new n(e.s * 0) : (e.e = Yn(s, l), e.d = s, Pe = !1, o && (e = or(e, i, u * 4)), c && (e = e.times(Math.abs(c) < 54 ? gr(2, c) : $t.pow(2, c))), Pe = !0, e);
    }
    function ef(e, r) {
        var t, n = r.d.length;
        if (n < 3) return r.isZero() ? r : Ut(e, 2, r, r);
        t = 1.4 * Math.sqrt(n), t = t > 16 ? 16 : t | 0, r = r.times(1 / Qn(5, t)), r = Ut(e, 2, r, r);
        for(var i, a = new e(5), o = new e(16), u = new e(20); t--;)i = r.times(r), r = r.times(a.plus(i.times(o.times(i).minus(u))));
        return r;
    }
    function Ut(e, r, t, n, i) {
        var a, o, u, c, s = e.precision, l = Math.ceil(s / Ne);
        for(Pe = !1, c = t.times(t), u = new e(n);;){
            if (o = or(u.times(c), new e(r++ * r++), s, 1), u = i ? n.plus(o) : n.minus(o), n = or(o.times(c), new e(r++ * r++), s, 1), o = u.plus(n), o.d[l] !== void 0) {
                for(a = l; o.d[a] === u.d[a] && a--;);
                if (a == -1) break;
            }
            a = u, u = n, n = o, o = a;
        }
        return Pe = !0, o.d.length = l + 1, o;
    }
    function Qn(e, r) {
        for(var t = e; --r;)t *= e;
        return t;
    }
    function Wo(e, r) {
        var t, n = r.s < 0, i = Jr(e, e.precision, 1), a = i.times(.5);
        if (r = r.abs(), r.lte(a)) return st = n ? 4 : 1, r;
        if (t = r.divToInt(i), t.isZero()) st = n ? 3 : 2;
        else {
            if (r = r.minus(t.times(i)), r.lte(a)) return st = na(t) ? n ? 2 : 3 : n ? 4 : 1, r;
            st = na(t) ? n ? 1 : 4 : n ? 3 : 2;
        }
        return r.minus(i).abs();
    }
    function zi(e, r, t, n) {
        var i, a, o, u, c, s, l, v, h, p = e.constructor, g = t !== void 0;
        if (g ? (zr(t, 1, Et), n === void 0 ? n = p.rounding : zr(n, 0, 8)) : (t = p.precision, n = p.rounding), !e.isFinite()) l = Go(e);
        else {
            for(l = tt(e), o = l.indexOf("."), g ? (i = 2, r == 16 ? t = t * 4 - 3 : r == 8 && (t = t * 3 - 2)) : i = r, o >= 0 && (l = l.replace(".", ""), h = new p(1), h.e = l.length - o, h.d = bn(tt(h), 10, i), h.e = h.d.length), v = bn(l, 10, i), a = c = v.length; v[--c] == 0;)v.pop();
            if (!v[0]) l = g ? "0p+0" : "0";
            else {
                if (o < 0 ? a-- : (e = new p(e), e.d = v, e.e = a, e = or(e, h, t, n, 0, i), v = e.d, a = e.e, s = Io), o = v[t], u = i / 2, s = s || v[t + 1] !== void 0, s = n < 4 ? (o !== void 0 || s) && (n === 0 || n === (e.s < 0 ? 3 : 2)) : o > u || o === u && (n === 4 || s || n === 6 && v[t - 1] & 1 || n === (e.s < 0 ? 8 : 7)), v.length = t, s) for(; ++v[--t] > i - 1;)v[t] = 0, t || (++a, v.unshift(1));
                for(c = v.length; !v[c - 1]; --c);
                for(o = 0, l = ""; o < c; o++)l += yi.charAt(v[o]);
                if (g) {
                    if (c > 1) if (r == 16 || r == 8) {
                        for(o = r == 16 ? 4 : 3, --c; c % o; c++)l += "0";
                        for(v = bn(l, i, r), c = v.length; !v[c - 1]; --c);
                        for(o = 1, l = "1."; o < c; o++)l += yi.charAt(v[o]);
                    } else l = l.charAt(0) + "." + l.slice(1);
                    l = l + (a < 0 ? "p" : "p+") + a;
                } else if (a < 0) {
                    for(; ++a;)l = "0" + l;
                    l = "0." + l;
                } else if (++a > c) for(a -= c; a--;)l += "0";
                else a < c && (l = l.slice(0, a) + "." + l.slice(a));
            }
            l = (r == 16 ? "0x" : r == 2 ? "0b" : r == 8 ? "0o" : "") + l;
        }
        return e.s < 0 ? "-" + l : l;
    }
    function ia(e, r) {
        if (e.length > r) return e.length = r, !0;
    }
    function rf(e) {
        return new this(e).abs();
    }
    function tf(e) {
        return new this(e).acos();
    }
    function nf(e) {
        return new this(e).acosh();
    }
    function af(e, r) {
        return new this(e).plus(r);
    }
    function of(e) {
        return new this(e).asin();
    }
    function uf(e) {
        return new this(e).asinh();
    }
    function sf(e) {
        return new this(e).atan();
    }
    function ff(e) {
        return new this(e).atanh();
    }
    function cf(e, r) {
        e = new this(e), r = new this(r);
        var t, n = this.precision, i = this.rounding, a = n + 4;
        return !e.s || !r.s ? t = new this(NaN) : !e.d && !r.d ? (t = Jr(this, a, 1).times(r.s > 0 ? .25 : .75), t.s = e.s) : !r.d || e.isZero() ? (t = r.s < 0 ? Jr(this, n, i) : new this(0), t.s = e.s) : !e.d || r.isZero() ? (t = Jr(this, a, 1).times(.5), t.s = e.s) : r.s < 0 ? (this.precision = a, this.rounding = 1, t = this.atan(or(e, r, a, 1)), r = Jr(this, a, 1), this.precision = n, this.rounding = i, t = e.s < 0 ? t.minus(r) : t.plus(r)) : t = this.atan(or(e, r, a, 1)), t;
    }
    function lf(e) {
        return new this(e).cbrt();
    }
    function vf(e) {
        return Se(e = new this(e), e.e + 1, 2);
    }
    function df(e, r, t) {
        return new this(e).clamp(r, t);
    }
    function hf(e) {
        if (!e || typeof e != "object") throw Error(Zn + "Object expected");
        var r, t, n, i = e.defaults === !0, a = [
            "precision",
            1,
            Et,
            "rounding",
            0,
            8,
            "toExpNeg",
            -9e15,
            0,
            "toExpPos",
            0,
            Di,
            "maxE",
            0,
            Di,
            "minE",
            -9e15,
            0,
            "modulo",
            0,
            9
        ];
        for(r = 0; r < a.length; r += 3)if (t = a[r], i && (this[t] = wi[t]), (n = e[t]) !== void 0) if (Mr(n) === n && n >= a[r + 1] && n <= a[r + 2]) this[t] = n;
        else throw Error(wt + t + ": " + n);
        if (t = "crypto", i && (this[t] = wi[t]), (n = e[t]) !== void 0) if (n === !0 || n === !1 || n === 0 || n === 1) if (n) if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes)) this[t] = !0;
        else throw Error(Lo);
        else this[t] = !1;
        else throw Error(wt + t + ": " + n);
        return this;
    }
    function pf(e) {
        return new this(e).cos();
    }
    function mf(e) {
        return new this(e).cosh();
    }
    function Vo(e) {
        var r, t, n;
        function i(a) {
            var o, u, c, s = this;
            if (!(s instanceof i)) return new i(a);
            if (s.constructor = i, aa(a)) {
                s.s = a.s, Pe ? !a.d || a.e > i.maxE ? (s.e = NaN, s.d = null) : a.e < i.minE ? (s.e = 0, s.d = [
                    0
                ]) : (s.e = a.e, s.d = a.d.slice()) : (s.e = a.e, s.d = a.d ? a.d.slice() : a.d);
                return;
            }
            if (c = typeof a, c === "number") {
                if (a === 0) {
                    s.s = 1 / a < 0 ? -1 : 1, s.e = 0, s.d = [
                        0
                    ];
                    return;
                }
                if (a < 0 ? (a = -a, s.s = -1) : s.s = 1, a === ~~a && a < 1e7) {
                    for(o = 0, u = a; u >= 10; u /= 10)o++;
                    Pe ? o > i.maxE ? (s.e = NaN, s.d = null) : o < i.minE ? (s.e = 0, s.d = [
                        0
                    ]) : (s.e = o, s.d = [
                        a
                    ]) : (s.e = o, s.d = [
                        a
                    ]);
                    return;
                } else if (a * 0 !== 0) {
                    a || (s.s = NaN), s.e = NaN, s.d = null;
                    return;
                }
                return Ai(s, a.toString());
            } else if (c !== "string") throw Error(wt + a);
            return (u = a.charCodeAt(0)) === 45 ? (a = a.slice(1), s.s = -1) : (u === 43 && (a = a.slice(1)), s.s = 1), $o.test(a) ? Ai(s, a) : js(s, a);
        }
        if (i.prototype = ve, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.EUCLID = 9, i.config = i.set = hf, i.clone = Vo, i.isDecimal = aa, i.abs = rf, i.acos = tf, i.acosh = nf, i.add = af, i.asin = of, i.asinh = uf, i.atan = sf, i.atanh = ff, i.atan2 = cf, i.cbrt = lf, i.ceil = vf, i.clamp = df, i.cos = pf, i.cosh = mf, i.div = gf, i.exp = Df, i.floor = yf, i.hypot = wf, i.ln = Ef, i.log = _f, i.log10 = Ff, i.log2 = Af, i.max = bf, i.min = Cf, i.mod = Sf, i.mul = Mf, i.pow = Nf, i.random = Bf, i.round = xf, i.sign = Tf, i.sin = Pf, i.sinh = zf, i.sqrt = Of, i.sub = If, i.sum = Rf, i.tan = Lf, i.tanh = Uf, i.trunc = $f, e === void 0 && (e = {}), e && e.defaults !== !0) for(n = [
            "precision",
            "rounding",
            "toExpNeg",
            "toExpPos",
            "maxE",
            "minE",
            "modulo",
            "crypto"
        ], r = 0; r < n.length;)e.hasOwnProperty(t = n[r++]) || (e[t] = this[t]);
        return i.config(e), i;
    }
    function gf(e, r) {
        return new this(e).div(r);
    }
    function Df(e) {
        return new this(e).exp();
    }
    function yf(e) {
        return Se(e = new this(e), e.e + 1, 3);
    }
    function wf() {
        var e, r, t = new this(0);
        for(Pe = !1, e = 0; e < arguments.length;)if (r = new this(arguments[e++]), r.d) t.d && (t = t.plus(r.times(r)));
        else {
            if (r.s) return Pe = !0, new this(1 / 0);
            t = r;
        }
        return Pe = !0, t.sqrt();
    }
    function aa(e) {
        return e instanceof $t || e && e.toStringTag === Uo || !1;
    }
    function Ef(e) {
        return new this(e).ln();
    }
    function _f(e, r) {
        return new this(e).log(r);
    }
    function Af(e) {
        return new this(e).log(2);
    }
    function Ff(e) {
        return new this(e).log(10);
    }
    function bf() {
        return Ho(this, arguments, "lt");
    }
    function Cf() {
        return Ho(this, arguments, "gt");
    }
    function Sf(e, r) {
        return new this(e).mod(r);
    }
    function Mf(e, r) {
        return new this(e).mul(r);
    }
    function Nf(e, r) {
        return new this(e).pow(r);
    }
    function Bf(e) {
        var r, t, n, i, a = 0, o = new this(1), u = [];
        if (e === void 0 ? e = this.precision : zr(e, 1, Et), n = Math.ceil(e / Ne), this.crypto) if (crypto.getRandomValues) for(r = crypto.getRandomValues(new Uint32Array(n)); a < n;)i = r[a], i >= 429e7 ? r[a] = crypto.getRandomValues(new Uint32Array(1))[0] : u[a++] = i % 1e7;
        else if (crypto.randomBytes) {
            for(r = crypto.randomBytes(n *= 4); a < n;)i = r[a] + (r[a + 1] << 8) + (r[a + 2] << 16) + ((r[a + 3] & 127) << 24), i >= 214e7 ? crypto.randomBytes(4).copy(r, a) : (u.push(i % 1e7), a += 4);
            a = n / 4;
        } else throw Error(Lo);
        else for(; a < n;)u[a++] = Math.random() * 1e7 | 0;
        for(n = u[--a], e %= Ne, n && e && (i = gr(10, Ne - e), u[a] = (n / i | 0) * i); u[a] === 0; a--)u.pop();
        if (a < 0) t = 0, u = [
            0
        ];
        else {
            for(t = -1; u[0] === 0; t -= Ne)u.shift();
            for(n = 1, i = u[0]; i >= 10; i /= 10)n++;
            n < Ne && (t -= Ne - n);
        }
        return o.e = t, o.d = u, o;
    }
    function xf(e) {
        return Se(e = new this(e), e.e + 1, this.rounding);
    }
    function Tf(e) {
        return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
    }
    function Pf(e) {
        return new this(e).sin();
    }
    function zf(e) {
        return new this(e).sinh();
    }
    function Of(e) {
        return new this(e).sqrt();
    }
    function If(e, r) {
        return new this(e).sub(r);
    }
    function Rf() {
        var e = 0, r = arguments, t = new this(r[e]);
        for(Pe = !1; t.s && ++e < r.length;)t = t.plus(r[e]);
        return Pe = !0, Se(t, this.precision, this.rounding);
    }
    function Lf(e) {
        return new this(e).tan();
    }
    function Uf(e) {
        return new this(e).tanh();
    }
    function $f(e) {
        return Se(e = new this(e), e.e + 1, 1);
    }
    ve[Symbol.for("nodejs.util.inspect.custom")] = ve.toString;
    ve[Symbol.toStringTag] = "Decimal";
    var $t = ve.constructor = Vo(wi);
    Tn = new $t(Tn);
    Pn = new $t(Pn);
    var qf = "BigNumber", kf = [
        "?on",
        "config"
    ], Hf = he(qf, kf, (e)=>{
        var { on: r, config: t } = e, n = $t.clone({
            precision: t.precision,
            modulo: $t.EUCLID
        });
        return n.prototype = Object.create(n.prototype), n.prototype.type = "BigNumber", n.prototype.isBigNumber = !0, n.prototype.toJSON = function() {
            return {
                mathjs: "BigNumber",
                value: this.toString()
            };
        }, n.fromJSON = function(i) {
            return new n(i.value);
        }, r && r("config", function(i, a) {
            i.precision !== a.precision && n.config({
                precision: i.precision
            });
        }), n;
    }, {
        isClass: !0
    });
    const Sr = Math.cosh || function(e) {
        return Math.abs(e) < 1e-9 ? 1 - e : (Math.exp(e) + Math.exp(-e)) * .5;
    }, kr = Math.sinh || function(e) {
        return Math.abs(e) < 1e-9 ? e : (Math.exp(e) - Math.exp(-e)) * .5;
    }, Gf = function(e) {
        const r = Math.PI / 4;
        if (-r > e || e > r) return Math.cos(e) - 1;
        const t = e * e;
        return t * (t * (t * (t * (t * (t * (t * (t / 20922789888e3 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - 1 / 2);
    }, li = function(e, r) {
        return e = Math.abs(e), r = Math.abs(r), e < r && ([e, r] = [
            r,
            e
        ]), e < 1e8 ? Math.sqrt(e * e + r * r) : (r /= e, e * Math.sqrt(1 + r * r));
    }, zt = function() {
        throw SyntaxError("Invalid Param");
    };
    function vi(e, r) {
        const t = Math.abs(e), n = Math.abs(r);
        return e === 0 ? Math.log(n) : r === 0 ? Math.log(t) : t < 3e3 && n < 3e3 ? Math.log(e * e + r * r) * .5 : (e = e * .5, r = r * .5, .5 * Math.log(e * e + r * r) + Math.LN2);
    }
    const Wf = {
        re: 0,
        im: 0
    }, Ft = function(e, r) {
        const t = Wf;
        if (e == null) t.re = t.im = 0;
        else if (r !== void 0) t.re = e, t.im = r;
        else switch(typeof e){
            case "object":
                if ("im" in e && "re" in e) t.re = e.re, t.im = e.im;
                else if ("abs" in e && "arg" in e) {
                    if (!isFinite(e.abs) && isFinite(e.arg)) return se.INFINITY;
                    t.re = e.abs * Math.cos(e.arg), t.im = e.abs * Math.sin(e.arg);
                } else if ("r" in e && "phi" in e) {
                    if (!isFinite(e.r) && isFinite(e.phi)) return se.INFINITY;
                    t.re = e.r * Math.cos(e.phi), t.im = e.r * Math.sin(e.phi);
                } else e.length === 2 ? (t.re = e[0], t.im = e[1]) : zt();
                break;
            case "string":
                t.im = t.re = 0;
                const n = e.replace(/_/g, "").match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
                let i = 1, a = 0;
                n === null && zt();
                for(let o = 0; o < n.length; o++){
                    const u = n[o];
                    u === " " || u === "	" || u === `
` || (u === "+" ? i++ : u === "-" ? a++ : u === "i" || u === "I" ? (i + a === 0 && zt(), n[o + 1] !== " " && !isNaN(n[o + 1]) ? (t.im += parseFloat((a % 2 ? "-" : "") + n[o + 1]), o++) : t.im += parseFloat((a % 2 ? "-" : "") + "1"), i = a = 0) : ((i + a === 0 || isNaN(u)) && zt(), n[o + 1] === "i" || n[o + 1] === "I" ? (t.im += parseFloat((a % 2 ? "-" : "") + u), o++) : t.re += parseFloat((a % 2 ? "-" : "") + u), i = a = 0));
                }
                i + a > 0 && zt();
                break;
            case "number":
                t.im = 0, t.re = e;
                break;
            default:
                zt();
        }
        return isNaN(t.re) || isNaN(t.im), t;
    };
    function se(e, r) {
        if (!(this instanceof se)) return new se(e, r);
        const t = Ft(e, r);
        this.re = t.re, this.im = t.im;
    }
    se.prototype = {
        re: 0,
        im: 0,
        sign: function() {
            const e = li(this.re, this.im);
            return new se(this.re / e, this.im / e);
        },
        add: function(e, r) {
            const t = Ft(e, r), n = this.isInfinite(), i = !(isFinite(t.re) && isFinite(t.im));
            return n || i ? n && i ? se.NAN : se.INFINITY : new se(this.re + t.re, this.im + t.im);
        },
        sub: function(e, r) {
            const t = Ft(e, r), n = this.isInfinite(), i = !(isFinite(t.re) && isFinite(t.im));
            return n || i ? n && i ? se.NAN : se.INFINITY : new se(this.re - t.re, this.im - t.im);
        },
        mul: function(e, r) {
            const t = Ft(e, r), n = this.isInfinite(), i = !(isFinite(t.re) && isFinite(t.im)), a = this.re === 0 && this.im === 0, o = t.re === 0 && t.im === 0;
            return n && o || i && a ? se.NAN : n || i ? se.INFINITY : t.im === 0 && this.im === 0 ? new se(this.re * t.re, 0) : new se(this.re * t.re - this.im * t.im, this.re * t.im + this.im * t.re);
        },
        div: function(e, r) {
            const t = Ft(e, r), n = this.isInfinite(), i = !(isFinite(t.re) && isFinite(t.im)), a = this.re === 0 && this.im === 0, o = t.re === 0 && t.im === 0;
            if (a && o || n && i) return se.NAN;
            if (o || n) return se.INFINITY;
            if (a || i) return se.ZERO;
            if (t.im === 0) return new se(this.re / t.re, this.im / t.re);
            if (Math.abs(t.re) < Math.abs(t.im)) {
                const u = t.re / t.im, c = t.re * u + t.im;
                return new se((this.re * u + this.im) / c, (this.im * u - this.re) / c);
            } else {
                const u = t.im / t.re, c = t.im * u + t.re;
                return new se((this.re + this.im * u) / c, (this.im - this.re * u) / c);
            }
        },
        pow: function(e, r) {
            const t = Ft(e, r), n = this.re === 0 && this.im === 0;
            if (t.re === 0 && t.im === 0) return se.ONE;
            if (t.im === 0) {
                if (this.im === 0 && this.re > 0) return new se(Math.pow(this.re, t.re), 0);
                if (this.re === 0) switch((t.re % 4 + 4) % 4){
                    case 0:
                        return new se(Math.pow(this.im, t.re), 0);
                    case 1:
                        return new se(0, Math.pow(this.im, t.re));
                    case 2:
                        return new se(-Math.pow(this.im, t.re), 0);
                    case 3:
                        return new se(0, -Math.pow(this.im, t.re));
                }
            }
            if (n && t.re > 0) return se.ZERO;
            const a = Math.atan2(this.im, this.re), o = vi(this.re, this.im);
            let u = Math.exp(t.re * o - t.im * a), c = t.im * o + t.re * a;
            return new se(u * Math.cos(c), u * Math.sin(c));
        },
        sqrt: function() {
            const e = this.re, r = this.im;
            if (r === 0) return e >= 0 ? new se(Math.sqrt(e), 0) : new se(0, Math.sqrt(-e));
            const t = li(e, r);
            let n = Math.sqrt(.5 * (t + Math.abs(e))), i = Math.abs(r) / (2 * n);
            return e >= 0 ? new se(n, r < 0 ? -i : i) : new se(i, r < 0 ? -n : n);
        },
        exp: function() {
            const e = Math.exp(this.re);
            return this.im === 0 ? new se(e, 0) : new se(e * Math.cos(this.im), e * Math.sin(this.im));
        },
        expm1: function() {
            const e = this.re, r = this.im;
            return new se(Math.expm1(e) * Math.cos(r) + Gf(r), Math.exp(e) * Math.sin(r));
        },
        log: function() {
            const e = this.re, r = this.im;
            return r === 0 && e > 0 ? new se(Math.log(e), 0) : new se(vi(e, r), Math.atan2(r, e));
        },
        abs: function() {
            return li(this.re, this.im);
        },
        arg: function() {
            return Math.atan2(this.im, this.re);
        },
        sin: function() {
            const e = this.re, r = this.im;
            return new se(Math.sin(e) * Sr(r), Math.cos(e) * kr(r));
        },
        cos: function() {
            const e = this.re, r = this.im;
            return new se(Math.cos(e) * Sr(r), -Math.sin(e) * kr(r));
        },
        tan: function() {
            const e = 2 * this.re, r = 2 * this.im, t = Math.cos(e) + Sr(r);
            return new se(Math.sin(e) / t, kr(r) / t);
        },
        cot: function() {
            const e = 2 * this.re, r = 2 * this.im, t = Math.cos(e) - Sr(r);
            return new se(-Math.sin(e) / t, kr(r) / t);
        },
        sec: function() {
            const e = this.re, r = this.im, t = .5 * Sr(2 * r) + .5 * Math.cos(2 * e);
            return new se(Math.cos(e) * Sr(r) / t, Math.sin(e) * kr(r) / t);
        },
        csc: function() {
            const e = this.re, r = this.im, t = .5 * Sr(2 * r) - .5 * Math.cos(2 * e);
            return new se(Math.sin(e) * Sr(r) / t, -Math.cos(e) * kr(r) / t);
        },
        asin: function() {
            const e = this.re, r = this.im, t = new se(r * r - e * e + 1, -2 * e * r).sqrt(), n = new se(t.re - r, t.im + e).log();
            return new se(n.im, -n.re);
        },
        acos: function() {
            const e = this.re, r = this.im, t = new se(r * r - e * e + 1, -2 * e * r).sqrt(), n = new se(t.re - r, t.im + e).log();
            return new se(Math.PI / 2 - n.im, n.re);
        },
        atan: function() {
            const e = this.re, r = this.im;
            if (e === 0) {
                if (r === 1) return new se(0, 1 / 0);
                if (r === -1) return new se(0, -1 / 0);
            }
            const t = e * e + (1 - r) * (1 - r), n = new se((1 - r * r - e * e) / t, -2 * e / t).log();
            return new se(-.5 * n.im, .5 * n.re);
        },
        acot: function() {
            const e = this.re, r = this.im;
            if (r === 0) return new se(Math.atan2(1, e), 0);
            const t = e * e + r * r;
            return t !== 0 ? new se(e / t, -r / t).atan() : new se(e !== 0 ? e / 0 : 0, r !== 0 ? -r / 0 : 0).atan();
        },
        asec: function() {
            const e = this.re, r = this.im;
            if (e === 0 && r === 0) return new se(0, 1 / 0);
            const t = e * e + r * r;
            return t !== 0 ? new se(e / t, -r / t).acos() : new se(e !== 0 ? e / 0 : 0, r !== 0 ? -r / 0 : 0).acos();
        },
        acsc: function() {
            const e = this.re, r = this.im;
            if (e === 0 && r === 0) return new se(Math.PI / 2, 1 / 0);
            const t = e * e + r * r;
            return t !== 0 ? new se(e / t, -r / t).asin() : new se(e !== 0 ? e / 0 : 0, r !== 0 ? -r / 0 : 0).asin();
        },
        sinh: function() {
            const e = this.re, r = this.im;
            return new se(kr(e) * Math.cos(r), Sr(e) * Math.sin(r));
        },
        cosh: function() {
            const e = this.re, r = this.im;
            return new se(Sr(e) * Math.cos(r), kr(e) * Math.sin(r));
        },
        tanh: function() {
            const e = 2 * this.re, r = 2 * this.im, t = Sr(e) + Math.cos(r);
            return new se(kr(e) / t, Math.sin(r) / t);
        },
        coth: function() {
            const e = 2 * this.re, r = 2 * this.im, t = Sr(e) - Math.cos(r);
            return new se(kr(e) / t, -Math.sin(r) / t);
        },
        csch: function() {
            const e = this.re, r = this.im, t = Math.cos(2 * r) - Sr(2 * e);
            return new se(-2 * kr(e) * Math.cos(r) / t, 2 * Sr(e) * Math.sin(r) / t);
        },
        sech: function() {
            const e = this.re, r = this.im, t = Math.cos(2 * r) + Sr(2 * e);
            return new se(2 * Sr(e) * Math.cos(r) / t, -2 * kr(e) * Math.sin(r) / t);
        },
        asinh: function() {
            let e = this.im;
            this.im = -this.re, this.re = e;
            const r = this.asin();
            return this.re = -this.im, this.im = e, e = r.re, r.re = -r.im, r.im = e, r;
        },
        acosh: function() {
            const e = this.acos();
            if (e.im <= 0) {
                const r = e.re;
                e.re = -e.im, e.im = r;
            } else {
                const r = e.im;
                e.im = -e.re, e.re = r;
            }
            return e;
        },
        atanh: function() {
            const e = this.re, r = this.im, t = e > 1 && r === 0, n = 1 - e, i = 1 + e, a = n * n + r * r, o = a !== 0 ? new se((i * n - r * r) / a, (r * n + i * r) / a) : new se(e !== -1 ? e / 0 : 0, r !== 0 ? r / 0 : 0), u = o.re;
            return o.re = vi(o.re, o.im) / 2, o.im = Math.atan2(o.im, u) / 2, t && (o.im = -o.im), o;
        },
        acoth: function() {
            const e = this.re, r = this.im;
            if (e === 0 && r === 0) return new se(0, Math.PI / 2);
            const t = e * e + r * r;
            return t !== 0 ? new se(e / t, -r / t).atanh() : new se(e !== 0 ? e / 0 : 0, r !== 0 ? -r / 0 : 0).atanh();
        },
        acsch: function() {
            const e = this.re, r = this.im;
            if (r === 0) return new se(e !== 0 ? Math.log(e + Math.sqrt(e * e + 1)) : 1 / 0, 0);
            const t = e * e + r * r;
            return t !== 0 ? new se(e / t, -r / t).asinh() : new se(e !== 0 ? e / 0 : 0, r !== 0 ? -r / 0 : 0).asinh();
        },
        asech: function() {
            const e = this.re, r = this.im;
            if (this.isZero()) return se.INFINITY;
            const t = e * e + r * r;
            return t !== 0 ? new se(e / t, -r / t).acosh() : new se(e !== 0 ? e / 0 : 0, r !== 0 ? -r / 0 : 0).acosh();
        },
        inverse: function() {
            if (this.isZero()) return se.INFINITY;
            if (this.isInfinite()) return se.ZERO;
            const e = this.re, r = this.im, t = e * e + r * r;
            return new se(e / t, -r / t);
        },
        conjugate: function() {
            return new se(this.re, -this.im);
        },
        neg: function() {
            return new se(-this.re, -this.im);
        },
        ceil: function(e) {
            return e = Math.pow(10, e || 0), new se(Math.ceil(this.re * e) / e, Math.ceil(this.im * e) / e);
        },
        floor: function(e) {
            return e = Math.pow(10, e || 0), new se(Math.floor(this.re * e) / e, Math.floor(this.im * e) / e);
        },
        round: function(e) {
            return e = Math.pow(10, e || 0), new se(Math.round(this.re * e) / e, Math.round(this.im * e) / e);
        },
        equals: function(e, r) {
            const t = Ft(e, r);
            return Math.abs(t.re - this.re) <= se.EPSILON && Math.abs(t.im - this.im) <= se.EPSILON;
        },
        clone: function() {
            return new se(this.re, this.im);
        },
        toString: function() {
            let e = this.re, r = this.im, t = "";
            return this.isNaN() ? "NaN" : this.isInfinite() ? "Infinity" : (Math.abs(e) < se.EPSILON && (e = 0), Math.abs(r) < se.EPSILON && (r = 0), r === 0 ? t + e : (e !== 0 ? (t += e, t += " ", r < 0 ? (r = -r, t += "-") : t += "+", t += " ") : r < 0 && (r = -r, t += "-"), r !== 1 && (t += r), t + "i"));
        },
        toVector: function() {
            return [
                this.re,
                this.im
            ];
        },
        valueOf: function() {
            return this.im === 0 ? this.re : null;
        },
        isNaN: function() {
            return isNaN(this.re) || isNaN(this.im);
        },
        isZero: function() {
            return this.im === 0 && this.re === 0;
        },
        isFinite: function() {
            return isFinite(this.re) && isFinite(this.im);
        },
        isInfinite: function() {
            return !this.isFinite();
        }
    };
    se.ZERO = new se(0, 0);
    se.ONE = new se(1, 0);
    se.I = new se(0, 1);
    se.PI = new se(Math.PI, 0);
    se.E = new se(Math.E, 0);
    se.INFINITY = new se(1 / 0, 1 / 0);
    se.NAN = new se(NaN, NaN);
    se.EPSILON = 1e-15;
    var Vf = "Complex", Zf = [], Yf = he(Vf, Zf, ()=>(Object.defineProperty(se, "name", {
            value: "Complex"
        }), se.prototype.constructor = se, se.prototype.type = "Complex", se.prototype.isComplex = !0, se.prototype.toJSON = function() {
            return {
                mathjs: "Complex",
                re: this.re,
                im: this.im
            };
        }, se.prototype.toPolar = function() {
            return {
                r: this.abs(),
                phi: this.arg()
            };
        }, se.prototype.format = function(e) {
            var r = "", t = this.im, n = this.re, i = gi(this.re, e), a = gi(this.im, e), o = ir(e) ? e : e ? e.precision : null;
            if (o !== null) {
                var u = Math.pow(10, -o);
                Math.abs(n / t) < u && (n = 0), Math.abs(t / n) < u && (t = 0);
            }
            return t === 0 ? r = i : n === 0 ? t === 1 ? r = "i" : t === -1 ? r = "-i" : r = a + "i" : t < 0 ? t === -1 ? r = i + " - i" : r = i + " - " + a.substring(1) + "i" : t === 1 ? r = i + " + i" : r = i + " + " + a + "i", r;
        }, se.fromPolar = function(e) {
            switch(arguments.length){
                case 1:
                    {
                        var r = arguments[0];
                        if (typeof r == "object") return se(r);
                        throw new TypeError("Input has to be an object with r and phi keys.");
                    }
                case 2:
                    {
                        var t = arguments[0], n = arguments[1];
                        if (ir(t)) {
                            if (Mo(n) && n.hasBase("ANGLE") && (n = n.toNumber("rad")), ir(n)) return new se({
                                r: t,
                                phi: n
                            });
                            throw new TypeError("Phi is not a number nor an angle unit.");
                        } else throw new TypeError("Radius r is not a number.");
                    }
                default:
                    throw new SyntaxError("Wrong number of arguments in function fromPolar");
            }
        }, se.prototype.valueOf = se.prototype.toString, se.fromJSON = function(e) {
            return new se(e);
        }, se.compare = function(e, r) {
            return e.re > r.re ? 1 : e.re < r.re ? -1 : e.im > r.im ? 1 : e.im < r.im ? -1 : 0;
        }, se), {
        isClass: !0
    });
    typeof BigInt > "u" && (BigInt = function(e) {
        if (isNaN(e)) throw new Error("");
        return e;
    });
    const Ce = BigInt(0), Le = BigInt(1), on = BigInt(2), Fi = BigInt(5), Pr = BigInt(10), Qf = 2e3, we = {
        s: Le,
        n: Ce,
        d: Le
    };
    function at(e, r) {
        try {
            e = BigInt(e);
        } catch  {
            throw pt();
        }
        return e * r;
    }
    function Qr(e) {
        return typeof e == "bigint" ? e : Math.floor(e);
    }
    function vr(e, r) {
        if (r === Ce) throw Oi();
        const t = Object.create(Hr.prototype);
        t.s = e < Ce ? -Le : Le, e = e < Ce ? -e : e;
        const n = bt(e, r);
        return t.n = e / n, t.d = r / n, t;
    }
    function Ot(e) {
        const r = {};
        let t = e, n = on, i = Fi - Le;
        for(; i <= t;){
            for(; t % n === Ce;)t /= n, r[n] = (r[n] || Ce) + Le;
            i += Le + on * n++;
        }
        return t !== e ? t > 1 && (r[t] = (r[t] || Ce) + Le) : r[e] = (r[e] || Ce) + Le, r;
    }
    const yr = function(e, r) {
        let t = Ce, n = Le, i = Le;
        if (e != null) if (r !== void 0) {
            if (typeof e == "bigint") t = e;
            else {
                if (isNaN(e)) throw pt();
                if (e % 1 !== 0) throw oa();
                t = BigInt(e);
            }
            if (typeof r == "bigint") n = r;
            else {
                if (isNaN(r)) throw pt();
                if (r % 1 !== 0) throw oa();
                n = BigInt(r);
            }
            i = t * n;
        } else if (typeof e == "object") {
            if ("d" in e && "n" in e) t = BigInt(e.n), n = BigInt(e.d), "s" in e && (t *= BigInt(e.s));
            else if (0 in e) t = BigInt(e[0]), 1 in e && (n = BigInt(e[1]));
            else if (typeof e == "bigint") t = e;
            else throw pt();
            i = t * n;
        } else if (typeof e == "number") {
            if (isNaN(e)) throw pt();
            if (e < 0 && (i = -Le, e = -e), e % 1 === 0) t = BigInt(e);
            else {
                let a = 1, o = 0, u = 1, c = 1, s = 1, l = 1e7;
                for(e >= 1 && (a = 10 ** Math.floor(1 + Math.log10(e)), e /= a); u <= l && s <= l;){
                    let v = (o + c) / (u + s);
                    if (e === v) {
                        u + s <= l ? (t = o + c, n = u + s) : s > u ? (t = c, n = s) : (t = o, n = u);
                        break;
                    } else e > v ? (o += c, u += s) : (c += o, s += u), u > l ? (t = c, n = s) : (t = o, n = u);
                }
                t = BigInt(t) * BigInt(a), n = BigInt(n);
            }
        } else if (typeof e == "string") {
            let a = 0, o = Ce, u = Ce, c = Ce, s = Le, l = Le, v = e.replace(/_/g, "").match(/\d+|./g);
            if (v === null) throw pt();
            if (v[a] === "-" ? (i = -Le, a++) : v[a] === "+" && a++, v.length === a + 1 ? u = at(v[a++], i) : v[a + 1] === "." || v[a] === "." ? (v[a] !== "." && (o = at(v[a++], i)), a++, (a + 1 === v.length || v[a + 1] === "(" && v[a + 3] === ")" || v[a + 1] === "'" && v[a + 3] === "'") && (u = at(v[a], i), s = Pr ** BigInt(v[a].length), a++), (v[a] === "(" && v[a + 2] === ")" || v[a] === "'" && v[a + 2] === "'") && (c = at(v[a + 1], i), l = Pr ** BigInt(v[a + 1].length) - Le, a += 3)) : v[a + 1] === "/" || v[a + 1] === ":" ? (u = at(v[a], i), s = at(v[a + 2], Le), a += 3) : v[a + 3] === "/" && v[a + 1] === " " && (o = at(v[a], i), u = at(v[a + 2], i), s = at(v[a + 4], Le), a += 5), v.length <= a) n = s * l, i = t = c + n * o + l * u;
            else throw pt();
        } else if (typeof e == "bigint") t = e, i = e, n = Le;
        else throw pt();
        if (n === Ce) throw Oi();
        we.s = i < Ce ? -Le : Le, we.n = t < Ce ? -t : t, we.d = n < Ce ? -n : n;
    };
    function Xf(e, r, t) {
        let n = Le;
        for(; r > Ce; e = e * e % t, r >>= Le)r & Le && (n = n * e % t);
        return n;
    }
    function Jf(e, r) {
        for(; r % on === Ce; r /= on);
        for(; r % Fi === Ce; r /= Fi);
        if (r === Le) return Ce;
        let t = Pr % r, n = 1;
        for(; t !== Le; n++)if (t = t * Pr % r, n > Qf) return Ce;
        return BigInt(n);
    }
    function Kf(e, r, t) {
        let n = Le, i = Xf(Pr, t, r);
        for(let a = 0; a < 300; a++){
            if (n === i) return BigInt(a);
            n = n * Pr % r, i = i * Pr % r;
        }
        return 0;
    }
    function bt(e, r) {
        if (!e) return r;
        if (!r) return e;
        for(;;){
            if (e %= r, !e) return r;
            if (r %= e, !r) return e;
        }
    }
    function Hr(e, r) {
        if (yr(e, r), this instanceof Hr) e = bt(we.d, we.n), this.s = we.s, this.n = we.n / e, this.d = we.d / e;
        else return vr(we.s * we.n, we.d);
    }
    var Oi = function() {
        return new Error("Division by Zero");
    }, pt = function() {
        return new Error("Invalid argument");
    }, oa = function() {
        return new Error("Parameters must be integer");
    };
    Hr.prototype = {
        s: Le,
        n: Ce,
        d: Le,
        abs: function() {
            return vr(this.n, this.d);
        },
        neg: function() {
            return vr(-this.s * this.n, this.d);
        },
        add: function(e, r) {
            return yr(e, r), vr(this.s * this.n * we.d + we.s * this.d * we.n, this.d * we.d);
        },
        sub: function(e, r) {
            return yr(e, r), vr(this.s * this.n * we.d - we.s * this.d * we.n, this.d * we.d);
        },
        mul: function(e, r) {
            return yr(e, r), vr(this.s * we.s * this.n * we.n, this.d * we.d);
        },
        div: function(e, r) {
            return yr(e, r), vr(this.s * we.s * this.n * we.d, this.d * we.n);
        },
        clone: function() {
            return vr(this.s * this.n, this.d);
        },
        mod: function(e, r) {
            if (e === void 0) return vr(this.s * this.n % this.d, Le);
            if (yr(e, r), Ce === we.n * this.d) throw Oi();
            return vr(this.s * (we.d * this.n) % (we.n * this.d), we.d * this.d);
        },
        gcd: function(e, r) {
            return yr(e, r), vr(bt(we.n, this.n) * bt(we.d, this.d), we.d * this.d);
        },
        lcm: function(e, r) {
            return yr(e, r), we.n === Ce && this.n === Ce ? vr(Ce, Le) : vr(we.n * this.n, bt(we.n, this.n) * bt(we.d, this.d));
        },
        inverse: function() {
            return vr(this.s * this.d, this.n);
        },
        pow: function(e, r) {
            if (yr(e, r), we.d === Le) return we.s < Ce ? vr((this.s * this.d) ** we.n, this.n ** we.n) : vr((this.s * this.n) ** we.n, this.d ** we.n);
            if (this.s < Ce) return null;
            let t = Ot(this.n), n = Ot(this.d), i = Le, a = Le;
            for(let o in t)if (o !== "1") {
                if (o === "0") {
                    i = Ce;
                    break;
                }
                if (t[o] *= we.n, t[o] % we.d === Ce) t[o] /= we.d;
                else return null;
                i *= BigInt(o) ** t[o];
            }
            for(let o in n)if (o !== "1") {
                if (n[o] *= we.n, n[o] % we.d === Ce) n[o] /= we.d;
                else return null;
                a *= BigInt(o) ** n[o];
            }
            return we.s < Ce ? vr(a, i) : vr(i, a);
        },
        log: function(e, r) {
            if (yr(e, r), this.s <= Ce || we.s <= Ce) return null;
            const t = {}, n = Ot(we.n), i = Ot(we.d), a = Ot(this.n), o = Ot(this.d);
            for(const s in i)n[s] = (n[s] || Ce) - i[s];
            for(const s in o)a[s] = (a[s] || Ce) - o[s];
            for(const s in n)s !== "1" && (t[s] = !0);
            for(const s in a)s !== "1" && (t[s] = !0);
            let u = null, c = null;
            for(const s in t){
                const l = n[s] || Ce, v = a[s] || Ce;
                if (l === Ce) {
                    if (v !== Ce) return null;
                    continue;
                }
                let h = v, p = l;
                const g = bt(h, p);
                if (h /= g, p /= g, u === null && c === null) u = h, c = p;
                else if (h * c !== u * p) return null;
            }
            return u !== null && c !== null ? vr(u, c) : null;
        },
        equals: function(e, r) {
            return yr(e, r), this.s * this.n * we.d === we.s * we.n * this.d;
        },
        lt: function(e, r) {
            return yr(e, r), this.s * this.n * we.d < we.s * we.n * this.d;
        },
        lte: function(e, r) {
            return yr(e, r), this.s * this.n * we.d <= we.s * we.n * this.d;
        },
        gt: function(e, r) {
            return yr(e, r), this.s * this.n * we.d > we.s * we.n * this.d;
        },
        gte: function(e, r) {
            return yr(e, r), this.s * this.n * we.d >= we.s * we.n * this.d;
        },
        compare: function(e, r) {
            yr(e, r);
            let t = this.s * this.n * we.d - we.s * we.n * this.d;
            return (Ce < t) - (t < Ce);
        },
        ceil: function(e) {
            return e = Pr ** BigInt(e || 0), vr(Qr(this.s * e * this.n / this.d) + (e * this.n % this.d > Ce && this.s >= Ce ? Le : Ce), e);
        },
        floor: function(e) {
            return e = Pr ** BigInt(e || 0), vr(Qr(this.s * e * this.n / this.d) - (e * this.n % this.d > Ce && this.s < Ce ? Le : Ce), e);
        },
        round: function(e) {
            return e = Pr ** BigInt(e || 0), vr(Qr(this.s * e * this.n / this.d) + this.s * ((this.s >= Ce ? Le : Ce) + on * (e * this.n % this.d) > this.d ? Le : Ce), e);
        },
        roundTo: function(e, r) {
            yr(e, r);
            const t = this.n * we.d, n = this.d * we.n, i = t % n;
            let a = Qr(t / n);
            return i + i >= n && a++, vr(this.s * a * we.n, we.d);
        },
        divisible: function(e, r) {
            return yr(e, r), !(!(we.n * this.d) || this.n * we.d % (we.n * this.d));
        },
        valueOf: function() {
            return Number(this.s * this.n) / Number(this.d);
        },
        toString: function(e) {
            let r = this.n, t = this.d;
            e = e || 15;
            let n = Jf(r, t), i = Kf(r, t, n), a = this.s < Ce ? "-" : "";
            if (a += Qr(r / t), r %= t, r *= Pr, r && (a += "."), n) {
                for(let o = i; o--;)a += Qr(r / t), r %= t, r *= Pr;
                a += "(";
                for(let o = n; o--;)a += Qr(r / t), r %= t, r *= Pr;
                a += ")";
            } else for(let o = e; r && o--;)a += Qr(r / t), r %= t, r *= Pr;
            return a;
        },
        toFraction: function(e) {
            let r = this.n, t = this.d, n = this.s < Ce ? "-" : "";
            if (t === Le) n += r;
            else {
                let i = Qr(r / t);
                e && i > Ce && (n += i, n += " ", r %= t), n += r, n += "/", n += t;
            }
            return n;
        },
        toLatex: function(e) {
            let r = this.n, t = this.d, n = this.s < Ce ? "-" : "";
            if (t === Le) n += r;
            else {
                let i = Qr(r / t);
                e && i > Ce && (n += i, r %= t), n += "\\frac{", n += r, n += "}{", n += t, n += "}";
            }
            return n;
        },
        toContinued: function() {
            let e = this.n, r = this.d, t = [];
            do {
                t.push(Qr(e / r));
                let n = e % r;
                e = r, r = n;
            }while (e !== Le);
            return t;
        },
        simplify: function(e) {
            const r = BigInt(1 / (e || .001) | 0), t = this.abs(), n = t.toContinued();
            for(let i = 1; i < n.length; i++){
                let a = vr(n[i - 1], Le);
                for(let u = i - 2; u >= 0; u--)a = a.inverse().add(n[u]);
                let o = a.sub(t);
                if (o.n * r < o.d) return a.mul(this.s);
            }
            return this;
        }
    };
    var jf = "Fraction", ec = [], rc = he(jf, ec, ()=>(Object.defineProperty(Hr, "name", {
            value: "Fraction"
        }), Hr.prototype.constructor = Hr, Hr.prototype.type = "Fraction", Hr.prototype.isFraction = !0, Hr.prototype.toJSON = function() {
            return {
                mathjs: "Fraction",
                n: String(this.s * this.n),
                d: String(this.d)
            };
        }, Hr.fromJSON = function(e) {
            return new Hr(e);
        }, Hr), {
        isClass: !0
    }), tc = "Matrix", nc = [], ic = he(tc, nc, ()=>{
        function e() {
            if (!(this instanceof e)) throw new SyntaxError("Constructor must be called with the new operator");
        }
        return e.prototype.type = "Matrix", e.prototype.isMatrix = !0, e.prototype.storage = function() {
            throw new Error("Cannot invoke storage on a Matrix interface");
        }, e.prototype.datatype = function() {
            throw new Error("Cannot invoke datatype on a Matrix interface");
        }, e.prototype.create = function(r, t) {
            throw new Error("Cannot invoke create on a Matrix interface");
        }, e.prototype.subset = function(r, t, n) {
            throw new Error("Cannot invoke subset on a Matrix interface");
        }, e.prototype.get = function(r) {
            throw new Error("Cannot invoke get on a Matrix interface");
        }, e.prototype.set = function(r, t, n) {
            throw new Error("Cannot invoke set on a Matrix interface");
        }, e.prototype.resize = function(r, t) {
            throw new Error("Cannot invoke resize on a Matrix interface");
        }, e.prototype.reshape = function(r, t) {
            throw new Error("Cannot invoke reshape on a Matrix interface");
        }, e.prototype.clone = function() {
            throw new Error("Cannot invoke clone on a Matrix interface");
        }, e.prototype.size = function() {
            throw new Error("Cannot invoke size on a Matrix interface");
        }, e.prototype.map = function(r, t) {
            throw new Error("Cannot invoke map on a Matrix interface");
        }, e.prototype.forEach = function(r) {
            throw new Error("Cannot invoke forEach on a Matrix interface");
        }, e.prototype[Symbol.iterator] = function() {
            throw new Error("Cannot iterate a Matrix interface");
        }, e.prototype.toArray = function() {
            throw new Error("Cannot invoke toArray on a Matrix interface");
        }, e.prototype.valueOf = function() {
            throw new Error("Cannot invoke valueOf on a Matrix interface");
        }, e.prototype.format = function(r) {
            throw new Error("Cannot invoke format on a Matrix interface");
        }, e.prototype.toString = function() {
            throw new Error("Cannot invoke toString on a Matrix interface");
        }, e;
    }, {
        isClass: !0
    });
    function di(e, r, t) {
        var n = e.constructor, i = new n(2), a = "";
        if (t) {
            if (t < 1) throw new Error("size must be in greater than 0");
            if (!ar(t)) throw new Error("size must be an integer");
            if (e.greaterThan(i.pow(t - 1).sub(1)) || e.lessThan(i.pow(t - 1).mul(-1))) throw new Error("Value must be in range [-2^".concat(t - 1, ", 2^").concat(t - 1, "-1]"));
            if (!e.isInteger()) throw new Error("Value must be an integer");
            e.lessThan(0) && (e = e.add(i.pow(t))), a = "i".concat(t);
        }
        switch(r){
            case 2:
                return "".concat(e.toBinary()).concat(a);
            case 8:
                return "".concat(e.toOctal()).concat(a);
            case 16:
                return "".concat(e.toHexadecimal()).concat(a);
            default:
                throw new Error("Base ".concat(r, " not supported "));
        }
    }
    function ac(e, r) {
        if (typeof r == "function") return r(e);
        if (!e.isFinite()) return e.isNaN() ? "NaN" : e.gt(0) ? "Infinity" : "-Infinity";
        var { notation: t, precision: n, wordSize: i } = Po(r);
        switch(t){
            case "fixed":
                return uc(e, n);
            case "exponential":
                return ua(e, n);
            case "engineering":
                return oc(e, n);
            case "bin":
                return di(e, 2, i);
            case "oct":
                return di(e, 8, i);
            case "hex":
                return di(e, 16, i);
            case "auto":
                {
                    var a = sa(r?.lowerExp, -3), o = sa(r?.upperExp, 5);
                    if (e.isZero()) return "0";
                    var u, c = e.toSignificantDigits(n), s = c.e;
                    return s >= a && s < o ? u = c.toFixed() : u = ua(e, n), u.replace(/((\.\d*?)(0+))($|e)/, function() {
                        var l = arguments[2], v = arguments[4];
                        return l !== "." ? l + v : v;
                    });
                }
            default:
                throw new Error('Unknown notation "' + t + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
        }
    }
    function oc(e, r) {
        var t = e.e, n = t % 3 === 0 ? t : t < 0 ? t - 3 - t % 3 : t - t % 3, i = e.mul(Math.pow(10, -n)), a = i.toPrecision(r);
        if (a.includes("e")) {
            var o = e.constructor;
            a = new o(a).toFixed();
        }
        return a + "e" + (t >= 0 ? "+" : "") + n.toString();
    }
    function ua(e, r) {
        return r !== void 0 ? e.toExponential(r - 1) : e.toExponential();
    }
    function uc(e, r) {
        return e.toFixed(r);
    }
    function sa(e, r) {
        return ir(e) ? e : cr(e) ? e.toNumber() : r;
    }
    function fr(e, r) {
        var t = sc(e, r);
        return r && typeof r == "object" && "truncate" in r && t.length > r.truncate ? t.substring(0, r.truncate - 3) + "..." : t;
    }
    function sc(e, r) {
        if (typeof e == "number") return gi(e, r);
        if (cr(e)) return ac(e, r);
        if (fc(e)) return !r || r.fraction !== "decimal" ? "".concat(e.s * e.n, "/").concat(e.d) : e.toString();
        if (Array.isArray(e)) return Zo(e, r);
        if (Wr(e)) return fa(e);
        if (typeof e == "function") return e.syntax ? String(e.syntax) : "function";
        if (e && typeof e == "object") {
            if (typeof e.format == "function") return e.format(r);
            if (e && e.toString(r) !== {}.toString()) return e.toString(r);
            var t = Object.keys(e).map((n)=>fa(n) + ": " + fr(e[n], r));
            return "{" + t.join(", ") + "}";
        }
        return String(e);
    }
    function fa(e) {
        for(var r = String(e), t = "", n = 0; n < r.length;){
            var i = r.charAt(n);
            t += i in ca ? ca[i] : i, n++;
        }
        return '"' + t + '"';
    }
    var ca = {
        '"': '\\"',
        "\\": "\\\\",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "	": "\\t"
    };
    function Zo(e, r) {
        if (Array.isArray(e)) {
            for(var t = "[", n = e.length, i = 0; i < n; i++)i !== 0 && (t += ", "), t += Zo(e[i], r);
            return t += "]", t;
        } else return fr(e, r);
    }
    function fc(e) {
        return e && typeof e == "object" && typeof e.s == "bigint" && typeof e.n == "bigint" && typeof e.d == "bigint" || !1;
    }
    function ke(e, r, t) {
        if (!(this instanceof ke)) throw new SyntaxError("Constructor must be called with the new operator");
        this.actual = e, this.expected = r, this.relation = t, this.message = "Dimension mismatch (" + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + " " + (this.relation || "!=") + " " + (Array.isArray(r) ? "[" + r.join(", ") + "]" : r) + ")", this.stack = new Error().stack;
    }
    ke.prototype = new RangeError;
    ke.prototype.constructor = RangeError;
    ke.prototype.name = "DimensionError";
    ke.prototype.isDimensionError = !0;
    function Ct(e, r, t) {
        if (!(this instanceof Ct)) throw new SyntaxError("Constructor must be called with the new operator");
        this.index = e, arguments.length < 3 ? (this.min = 0, this.max = r) : (this.min = r, this.max = t), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
    }
    Ct.prototype = new RangeError;
    Ct.prototype.constructor = RangeError;
    Ct.prototype.name = "IndexError";
    Ct.prototype.isIndexError = !0;
    function Ze(e) {
        for(var r = []; Array.isArray(e);)r.push(e.length), e = e[0];
        return r;
    }
    function Yo(e, r, t) {
        var n, i = e.length;
        if (i !== r[t]) throw new ke(i, r[t]);
        if (t < r.length - 1) {
            var a = t + 1;
            for(n = 0; n < i; n++){
                var o = e[n];
                if (!Array.isArray(o)) throw new ke(r.length - 1, r.length, "<");
                Yo(e[n], r, a);
            }
        } else for(n = 0; n < i; n++)if (Array.isArray(e[n])) throw new ke(r.length + 1, r.length, ">");
    }
    function la(e, r) {
        var t = r.length === 0;
        if (t) {
            if (Array.isArray(e)) throw new ke(e.length, 0);
        } else Yo(e, r, 0);
    }
    function On(e, r) {
        var t = e.isMatrix ? e._size : Ze(e), n = r._sourceSize;
        n.forEach((i, a)=>{
            if (i !== null && i !== t[a]) throw new ke(i, t[a]);
        });
    }
    function tr(e, r) {
        if (e !== void 0) {
            if (!ir(e) || !ar(e)) throw new TypeError("Index must be an integer (value: " + e + ")");
            if (e < 0 || typeof r == "number" && e >= r) throw new Ct(e, r);
        }
    }
    function qt(e) {
        for(var r = 0; r < e._dimensions.length; ++r){
            var t = e._dimensions[r];
            if (t._data && nr(t._data)) {
                if (t._size[0] === 0) return !0;
            } else if (t.isRange) {
                if (t.start === t.end) return !0;
            } else if (Wr(t) && t.length === 0) return !0;
        }
        return !1;
    }
    function In(e, r, t) {
        if (!Array.isArray(r)) throw new TypeError("Array expected");
        if (r.length === 0) throw new Error("Resizing to scalar is not supported");
        r.forEach(function(i) {
            if (!ir(i) || !ar(i) || i < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + fr(r) + ")");
        }), (ir(e) || cr(e)) && (e = [
            e
        ]);
        var n = t !== void 0 ? t : 0;
        return bi(e, r, 0, n), e;
    }
    function bi(e, r, t, n) {
        var i, a, o = e.length, u = r[t], c = Math.min(o, u);
        if (e.length = u, t < r.length - 1) {
            var s = t + 1;
            for(i = 0; i < c; i++)a = e[i], Array.isArray(a) || (a = [
                a
            ], e[i] = a), bi(a, r, s, n);
            for(i = c; i < u; i++)a = [], e[i] = a, bi(a, r, s, n);
        } else {
            for(i = 0; i < c; i++)for(; Array.isArray(e[i]);)e[i] = e[i][0];
            for(i = c; i < u; i++)e[i] = n;
        }
    }
    function Ii(e, r) {
        var t = Ci(e, !0), n = t.length;
        if (!Array.isArray(e) || !Array.isArray(r)) throw new TypeError("Array expected");
        if (r.length === 0) throw new ke(0, n, "!=");
        r = Ri(r, n);
        var i = Qo(r);
        if (n !== i) throw new ke(i, n, "!=");
        try {
            return cc(t, r);
        } catch (a) {
            throw a instanceof ke ? new ke(i, n, "!=") : a;
        }
    }
    function Ri(e, r) {
        var t = Qo(e), n = e.slice(), i = -1, a = e.indexOf(i), o = e.indexOf(i, a + 1) >= 0;
        if (o) throw new Error("More than one wildcard in sizes");
        var u = a >= 0, c = r % t === 0;
        if (u) if (c) n[a] = -r / t;
        else throw new Error("Could not replace wildcard, since " + r + " is no multiple of " + -t);
        return n;
    }
    function Qo(e) {
        return e.reduce((r, t)=>r * t, 1);
    }
    function cc(e, r) {
        for(var t = e, n, i = r.length - 1; i > 0; i--){
            var a = r[i];
            n = [];
            for(var o = t.length / a, u = 0; u < o; u++)n.push(t.slice(u * a, (u + 1) * a));
            t = n;
        }
        return t;
    }
    function va(e, r) {
        for(var t = Ze(e); Array.isArray(e) && e.length === 1;)e = e[0], t.shift();
        for(var n = t.length; t[n - 1] === 1;)n--;
        return n < t.length && (e = Xo(e, n, 0), t.length = n), e;
    }
    function Xo(e, r, t) {
        var n, i;
        if (t < r) {
            var a = t + 1;
            for(n = 0, i = e.length; n < i; n++)e[n] = Xo(e[n], r, a);
        } else for(; Array.isArray(e);)e = e[0];
        return e;
    }
    function Jo(e, r, t, n) {
        var i = n || Ze(e);
        if (t) for(var a = 0; a < t; a++)e = [
            e
        ], i.unshift(1);
        for(e = Ko(e, r, 0); i.length < r;)i.push(1);
        return e;
    }
    function Ko(e, r, t) {
        var n, i;
        if (Array.isArray(e)) {
            var a = t + 1;
            for(n = 0, i = e.length; n < i; n++)e[n] = Ko(e[n], r, a);
        } else for(var o = t; o < r; o++)e = [
            e
        ];
        return e;
    }
    function Ci(e) {
        var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
        if (!Array.isArray(e)) return e;
        if (typeof r != "boolean") throw new TypeError("Boolean expected for second argument of flatten");
        var t = [];
        return r ? i(e) : n(e), t;
        function n(a) {
            for(var o = 0; o < a.length; o++){
                var u = a[o];
                Array.isArray(u) ? n(u) : t.push(u);
            }
        }
        function i(a) {
            if (Array.isArray(a[0])) for(var o = 0; o < a.length; o++)i(a[o]);
            else for(var u = 0; u < a.length; u++)t.push(a[u]);
        }
    }
    function Xn(e, r) {
        for(var t, n = 0, i = 0; i < e.length; i++){
            var a = e[i], o = Array.isArray(a);
            if (i === 0 && o && (n = a.length), o && a.length !== n) return;
            var u = o ? Xn(a, r) : r(a);
            if (t === void 0) t = u;
            else if (t !== u) return "mixed";
        }
        return t;
    }
    function jo(e, r, t, n) {
        if (n < t) {
            if (e.length !== r.length) throw new ke(e.length, r.length);
            for(var i = [], a = 0; a < e.length; a++)i[a] = jo(e[a], r[a], t, n + 1);
            return i;
        } else return e.concat(r);
    }
    function eu() {
        var e = Array.prototype.slice.call(arguments, 0, -1), r = Array.prototype.slice.call(arguments, -1);
        if (e.length === 1) return e[0];
        if (e.length > 1) return e.slice(1).reduce(function(t, n) {
            return jo(t, n, r, 0);
        }, e[0]);
        throw new Error("Wrong number of arguments in function concat");
    }
    function ru() {
        for(var e = arguments.length, r = new Array(e), t = 0; t < e; t++)r[t] = arguments[t];
        for(var n = r.map((h)=>h.length), i = Math.max(...n), a = new Array(i).fill(null), o = 0; o < r.length; o++)for(var u = r[o], c = n[o], s = 0; s < c; s++){
            var l = i - c + s;
            u[s] > a[l] && (a[l] = u[s]);
        }
        for(var v = 0; v < r.length; v++)tu(r[v], a);
        return a;
    }
    function tu(e, r) {
        for(var t = r.length, n = e.length, i = 0; i < n; i++){
            var a = t - n + i;
            if (e[i] < r[a] && e[i] > 1 || e[i] > r[a]) throw new Error("shape mismatch: mismatch is found in arg with shape (".concat(e, ") not possible to broadcast dimension ").concat(n, " with size ").concat(e[i], " to size ").concat(r[a]));
        }
    }
    function Si(e, r) {
        var t = Ze(e);
        if (yt(t, r)) return e;
        tu(t, r);
        var n = ru(t, r), i = n.length, a = [
            ...Array(i - t.length).fill(1),
            ...t
        ], o = vc(e);
        t.length < i && (o = Ii(o, a), t = Ze(o));
        for(var u = 0; u < i; u++)t[u] < n[u] && (o = lc(o, n[u], u), t = Ze(o));
        return o;
    }
    function lc(e, r, t) {
        return eu(...Array(r).fill(e), t);
    }
    function nu(e, r) {
        if (!Array.isArray(e)) throw new Error("Array expected");
        var t = Ze(e);
        if (r.length !== t.length) throw new ke(r.length, t.length);
        for(var n = 0; n < r.length; n++)tr(r[n], t[n]);
        return r.reduce((i, a)=>i[a], e);
    }
    function da(e, r) {
        var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
        if (e.length === 0) return [];
        if (t) return a(e);
        var n = [];
        return i(e, 0);
        function i(o, u) {
            if (Array.isArray(o)) {
                for(var c = o.length, s = Array(c), l = 0; l < c; l++)n[u] = l, s[l] = i(o[l], u + 1);
                return s;
            } else return r(o, n.slice(0, u), e);
        }
        function a(o) {
            if (Array.isArray(o)) {
                for(var u = o.length, c = Array(u), s = 0; s < u; s++)c[s] = a(o[s]);
                return c;
            } else return r(o);
        }
    }
    function vc(e) {
        return Lt([], e);
    }
    function Rn(e, r, t) {
        var n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
        if (xn.isTypedFunction(e)) {
            var i;
            if (n) i = 1;
            else {
                var a = (r.isMatrix ? r.size() : Ze(r)).map(()=>0), o = r.isMatrix ? r.get(a) : nu(r, a);
                i = pc(e, o, a, r);
            }
            var u;
            if (r.isMatrix && r.dataType !== "mixed" && r.dataType !== void 0) {
                var c = dc(e, i);
                u = c !== void 0 ? c : e;
            } else u = e;
            return i >= 1 && i <= 3 ? {
                isUnary: i === 1,
                fn: function() {
                    for(var l = arguments.length, v = new Array(l), h = 0; h < l; h++)v[h] = arguments[h];
                    return ha(u, v.slice(0, i), t, e.name);
                }
            } : {
                isUnary: !1,
                fn: function() {
                    for(var l = arguments.length, v = new Array(l), h = 0; h < l; h++)v[h] = arguments[h];
                    return ha(u, v, t, e.name);
                }
            };
        }
        return n === void 0 ? {
            isUnary: hc(e),
            fn: e
        } : {
            isUnary: n,
            fn: e
        };
    }
    function dc(e, r) {
        var t = [];
        if (Object.entries(e.signatures).forEach((n)=>{
            var [i, a] = n;
            i.split(",").length === r && t.push(a);
        }), t.length === 1) return t[0];
    }
    function hc(e) {
        if (e.length !== 1) return !1;
        var r = e.toString();
        if (/arguments/.test(r)) return !1;
        var t = r.match(/\(.*?\)/);
        return !/\.\.\./.test(t);
    }
    function pc(e, r, t, n) {
        for(var i = [
            r,
            t,
            n
        ], a = 3; a > 0; a--){
            var o = i.slice(0, a);
            if (xn.resolve(e, o) !== null) return a;
        }
    }
    function ha(e, r, t, n) {
        try {
            return e(...r);
        } catch (i) {
            mc(i, r, t, n);
        }
    }
    function mc(e, r, t, n) {
        var i;
        if (e instanceof TypeError && ((i = e.data) === null || i === void 0 ? void 0 : i.category) === "wrongType") {
            var a = [];
            throw a.push("value: ".concat(Kr(r[0]))), r.length >= 2 && a.push("index: ".concat(Kr(r[1]))), r.length >= 3 && a.push("array: ".concat(Kr(r[2]))), new TypeError("Function ".concat(t, " cannot apply callback arguments ") + "".concat(n, "(").concat(a.join(", "), ") at index ").concat(JSON.stringify(r[1])));
        } else throw new TypeError("Function ".concat(t, " cannot apply callback arguments ") + "to function ".concat(n, ": ").concat(e.message));
    }
    var gc = "DenseMatrix", Dc = [
        "Matrix"
    ], yc = he(gc, Dc, (e)=>{
        var { Matrix: r } = e;
        function t(l, v) {
            if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");
            if (v && !Wr(v)) throw new Error("Invalid datatype: " + v);
            if (Ke(l)) l.type === "DenseMatrix" ? (this._data = We(l._data), this._size = We(l._size), this._datatype = v || l._datatype) : (this._data = l.toArray(), this._size = l.size(), this._datatype = v || l._datatype);
            else if (l && nr(l.data) && nr(l.size)) this._data = l.data, this._size = l.size, la(this._data, this._size), this._datatype = v || l.datatype;
            else if (nr(l)) this._data = s(l), this._size = Ze(this._data), la(this._data, this._size), this._datatype = v;
            else {
                if (l) throw new TypeError("Unsupported type of data (" + Kr(l) + ")");
                this._data = [], this._size = [
                    0
                ], this._datatype = v;
            }
        }
        t.prototype = new r, t.prototype.createDenseMatrix = function(l, v) {
            return new t(l, v);
        }, Object.defineProperty(t, "name", {
            value: "DenseMatrix"
        }), t.prototype.constructor = t, t.prototype.type = "DenseMatrix", t.prototype.isDenseMatrix = !0, t.prototype.getDataType = function() {
            return Xn(this._data, Kr);
        }, t.prototype.storage = function() {
            return "dense";
        }, t.prototype.datatype = function() {
            return this._datatype;
        }, t.prototype.create = function(l, v) {
            return new t(l, v);
        }, t.prototype.subset = function(l, v, h) {
            switch(arguments.length){
                case 1:
                    return n(this, l);
                case 2:
                case 3:
                    return a(this, l, v, h);
                default:
                    throw new SyntaxError("Wrong number of arguments");
            }
        }, t.prototype.get = function(l) {
            return nu(this._data, l);
        }, t.prototype.set = function(l, v, h) {
            if (!nr(l)) throw new TypeError("Array expected");
            if (l.length < this._size.length) throw new ke(l.length, this._size.length, "<");
            var p, g, d, y = l.map(function(b) {
                return b + 1;
            });
            c(this, y, h);
            var D = this._data;
            for(p = 0, g = l.length - 1; p < g; p++)d = l[p], tr(d, D.length), D = D[d];
            return d = l[l.length - 1], tr(d, D.length), D[d] = v, this;
        };
        function n(l, v) {
            if (!Gn(v)) throw new TypeError("Invalid index");
            var h = v.isScalar();
            if (h) return l.get(v.min());
            var p = v.size();
            if (p.length !== l._size.length) throw new ke(p.length, l._size.length);
            for(var g = v.min(), d = v.max(), y = 0, D = l._size.length; y < D; y++)tr(g[y], l._size[y]), tr(d[y], l._size[y]);
            return new t(i(l._data, v, p.length, 0), l._datatype);
        }
        function i(l, v, h, p) {
            var g = p === h - 1, d = v.dimension(p);
            return g ? d.map(function(y) {
                return tr(y, l.length), l[y];
            }).valueOf() : d.map(function(y) {
                tr(y, l.length);
                var D = l[y];
                return i(D, v, h, p + 1);
            }).valueOf();
        }
        function a(l, v, h, p) {
            if (!v || v.isIndex !== !0) throw new TypeError("Invalid index");
            var g = v.size(), d = v.isScalar(), y;
            if (Ke(h) ? (y = h.size(), h = h.valueOf()) : y = Ze(h), d) {
                if (y.length !== 0) throw new TypeError("Scalar expected");
                l.set(v.min(), h, p);
            } else {
                if (!yt(y, g)) try {
                    y.length === 0 ? h = Si([
                        h
                    ], g) : h = Si(h, g), y = Ze(h);
                } catch  {}
                if (g.length < l._size.length) throw new ke(g.length, l._size.length, "<");
                if (y.length < g.length) {
                    for(var D = 0, b = 0; g[D] === 1 && y[D] === 1;)D++;
                    for(; g[D] === 1;)b++, D++;
                    h = Jo(h, g.length, b, y);
                }
                if (!yt(g, y)) throw new ke(g, y, ">");
                var E = v.max().map(function(w) {
                    return w + 1;
                });
                c(l, E, p);
                var M = g.length, F = 0;
                o(l._data, v, h, M, F);
            }
            return l;
        }
        function o(l, v, h, p, g) {
            var d = g === p - 1, y = v.dimension(g);
            d ? y.forEach(function(D, b) {
                tr(D), l[D] = h[b[0]];
            }) : y.forEach(function(D, b) {
                tr(D), o(l[D], v, h[b[0]], p, g + 1);
            });
        }
        t.prototype.resize = function(l, v, h) {
            if (!Bn(l)) throw new TypeError("Array or Matrix expected");
            var p = l.valueOf().map((d)=>Array.isArray(d) && d.length === 1 ? d[0] : d), g = h ? this.clone() : this;
            return u(g, p, v);
        };
        function u(l, v, h) {
            if (v.length === 0) {
                for(var p = l._data; nr(p);)p = p[0];
                return p;
            }
            return l._size = v.slice(0), l._data = In(l._data, l._size, h), l;
        }
        t.prototype.reshape = function(l, v) {
            var h = v ? this.clone() : this;
            h._data = Ii(h._data, l);
            var p = h._size.reduce((g, d)=>g * d);
            return h._size = Ri(l, p), h;
        };
        function c(l, v, h) {
            for(var p = l._size.slice(0), g = !1; p.length < v.length;)p.push(0), g = !0;
            for(var d = 0, y = v.length; d < y; d++)v[d] > p[d] && (p[d] = v[d], g = !0);
            g && u(l, p, h);
        }
        t.prototype.clone = function() {
            var l = new t({
                data: We(this._data),
                size: We(this._size),
                datatype: this._datatype
            });
            return l;
        }, t.prototype.size = function() {
            return this._size.slice(0);
        }, t.prototype._forEach = function(l) {
            var v = l.length === 2, h = this._size.length - 1;
            if (h < 0) return;
            if (v) {
                y(this._data);
                return;
            }
            if (h === 0) {
                for(var p = 0; p < this._data.length; p++)l(this._data, p, [
                    p
                ]);
                return;
            }
            var g = new Array(h + 1);
            d(this._data);
            function d(D) {
                var b = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
                if (b < h) for(var E = 0; E < D.length; E++)g[b] = E, d(D[E], b + 1);
                else for(var M = 0; M < D.length; M++)g[b] = M, l(D, M, g.slice());
            }
            function y(D) {
                var b = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
                if (b < h) for(var E = 0; E < D.length; E++)y(D[E], b + 1);
                else for(var M = 0; M < D.length; M++)l(D, M);
            }
        }, t.prototype.map = function(l) {
            var v = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, h = this, p = new t(h), g = Rn(l, h._data, "map", v), d = v || g.isUnary ? (y, D)=>{
                y[D] = g.fn(y[D]);
            } : (y, D, b)=>{
                y[D] = g.fn(y[D], b, h);
            };
            return p._forEach(d), p;
        }, t.prototype.forEach = function(l) {
            var v = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, h = this, p = Rn(l, h._data, "map", v), g = v || p.isUnary ? (d, y)=>{
                p.fn(d[y]);
            } : (d, y, D)=>{
                p.fn(d[y], D, h);
            };
            h._forEach(g);
        }, t.prototype[Symbol.iterator] = function*() {
            var l = this._size.length - 1;
            if (!(l < 0)) {
                if (l === 0) {
                    for(var v = 0; v < this._data.length; v++)yield {
                        value: this._data[v],
                        index: [
                            v
                        ]
                    };
                    return;
                }
                var h = [], p = function*(d, y) {
                    if (y < l) for(var D = 0; D < d.length; D++)h[y] = D, yield* p(d[D], y + 1);
                    else for(var b = 0; b < d.length; b++)h[y] = b, yield {
                        value: d[b],
                        index: h.slice()
                    };
                };
                yield* p(this._data, 0);
            }
        }, t.prototype.rows = function() {
            var l = [], v = this.size();
            if (v.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
            var h = this._data;
            for (var p of h)l.push(new t([
                p
            ], this._datatype));
            return l;
        }, t.prototype.columns = function() {
            var l = this, v = [], h = this.size();
            if (h.length !== 2) throw new TypeError("Rows can only be returned for a 2D matrix.");
            for(var p = this._data, g = function(D) {
                var b = p.map((E)=>[
                        E[D]
                    ]);
                v.push(new t(b, l._datatype));
            }, d = 0; d < h[1]; d++)g(d);
            return v;
        }, t.prototype.toArray = function() {
            return We(this._data);
        }, t.prototype.valueOf = function() {
            return this._data;
        }, t.prototype.format = function(l) {
            return fr(this._data, l);
        }, t.prototype.toString = function() {
            return fr(this._data);
        }, t.prototype.toJSON = function() {
            return {
                mathjs: "DenseMatrix",
                data: this._data,
                size: this._size,
                datatype: this._datatype
            };
        }, t.prototype.diagonal = function(l) {
            if (l) {
                if (cr(l) && (l = l.toNumber()), !ir(l) || !ar(l)) throw new TypeError("The parameter k must be an integer number");
            } else l = 0;
            for(var v = l > 0 ? l : 0, h = l < 0 ? -l : 0, p = this._size[0], g = this._size[1], d = Math.min(p - h, g - v), y = [], D = 0; D < d; D++)y[D] = this._data[D + h][D + v];
            return new t({
                data: y,
                size: [
                    d
                ],
                datatype: this._datatype
            });
        }, t.diagonal = function(l, v, h, p) {
            if (!nr(l)) throw new TypeError("Array expected, size parameter");
            if (l.length !== 2) throw new Error("Only two dimensions matrix are supported");
            if (l = l.map(function(N) {
                if (cr(N) && (N = N.toNumber()), !ir(N) || !ar(N) || N < 1) throw new Error("Size values must be positive integers");
                return N;
            }), h) {
                if (cr(h) && (h = h.toNumber()), !ir(h) || !ar(h)) throw new TypeError("The parameter k must be an integer number");
            } else h = 0;
            var g = h > 0 ? h : 0, d = h < 0 ? -h : 0, y = l[0], D = l[1], b = Math.min(y - d, D - g), E;
            if (nr(v)) {
                if (v.length !== b) throw new Error("Invalid value array length");
                E = function(S) {
                    return v[S];
                };
            } else if (Ke(v)) {
                var M = v.size();
                if (M.length !== 1 || M[0] !== b) throw new Error("Invalid matrix length");
                E = function(S) {
                    return v.get([
                        S
                    ]);
                };
            } else E = function() {
                return v;
            };
            p || (p = cr(E(0)) ? E(0).mul(0) : 0);
            var F = [];
            if (l.length > 0) {
                F = In(F, l, p);
                for(var w = 0; w < b; w++)F[w + d][w + g] = E(w);
            }
            return new t({
                data: F,
                size: [
                    y,
                    D
                ]
            });
        }, t.fromJSON = function(l) {
            return new t(l);
        }, t.prototype.swapRows = function(l, v) {
            if (!ir(l) || !ar(l) || !ir(v) || !ar(v)) throw new Error("Row index must be positive integers");
            if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
            return tr(l, this._size[0]), tr(v, this._size[0]), t._swapRows(l, v, this._data), this;
        }, t._swapRows = function(l, v, h) {
            var p = h[l];
            h[l] = h[v], h[v] = p;
        };
        function s(l) {
            return Ke(l) ? s(l.valueOf()) : nr(l) ? l.map(s) : l;
        }
        return t;
    }, {
        isClass: !0
    });
    function Ur(e, r, t) {
        if (!t) return Ke(e) ? e.map((i)=>r(i), !1, !0) : da(e, r, !0);
        var n = (i)=>i === 0 ? i : r(i);
        return Ke(e) ? e.map((i)=>n(i), !1, !0) : da(e, n, !0);
    }
    var pa = "isInteger", wc = [
        "typed"
    ], Ec = he(pa, wc, (e)=>{
        var { typed: r } = e;
        return r(pa, {
            number: ar,
            BigNumber: function(n) {
                return n.isInt();
            },
            bigint: function(n) {
                return !0;
            },
            Fraction: function(n) {
                return n.d === 1n;
            },
            "Array | Matrix": r.referToSelf((t)=>(n)=>Ur(n, t))
        });
    }), Li = "number", Jn = "number, number";
    function iu(e) {
        return Math.abs(e);
    }
    iu.signature = Li;
    function au(e, r) {
        return e + r;
    }
    au.signature = Jn;
    function ou(e, r) {
        return e - r;
    }
    ou.signature = Jn;
    function uu(e, r) {
        return e * r;
    }
    uu.signature = Jn;
    function su(e) {
        return -e;
    }
    su.signature = Li;
    function Mi(e) {
        return Us(e);
    }
    Mi.signature = Li;
    function fu(e, r) {
        return e * e < 1 && r === 1 / 0 || e * e > 1 && r === -1 / 0 ? 0 : Math.pow(e, r);
    }
    fu.signature = Jn;
    var _c = "number";
    function cu(e) {
        return e > 0;
    }
    cu.signature = _c;
    function kt(e, r) {
        var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-9, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
        if (t <= 0) throw new Error("Relative tolerance must be greater than 0");
        if (n < 0) throw new Error("Absolute tolerance must be at least 0");
        return e.isNaN() || r.isNaN() ? !1 : !e.isFinite() || !r.isFinite() ? e.eq(r) : e.eq(r) ? !0 : e.minus(r).abs().lte(e.constructor.max(e.constructor.max(e.abs(), r.abs()).mul(t), n));
    }
    var ma = "isPositive", Ac = [
        "typed",
        "config"
    ], Fc = he(ma, Ac, (e)=>{
        var { typed: r, config: t } = e;
        return r(ma, {
            number: (n)=>ft(n, 0, t.relTol, t.absTol) ? !1 : cu(n),
            BigNumber: (n)=>kt(n, new n.constructor(0), t.relTol, t.absTol) ? !1 : !n.isNeg() && !n.isZero() && !n.isNaN(),
            bigint: (n)=>n > 0n,
            Fraction: (n)=>n.s > 0n && n.n > 0n,
            Unit: r.referToSelf((n)=>(i)=>r.find(n, i.valueType())(i.value)),
            "Array | Matrix": r.referToSelf((n)=>(i)=>Ur(i, n))
        });
    }), ga = "isZero", bc = [
        "typed",
        "equalScalar"
    ], Cc = he(ga, bc, (e)=>{
        var { typed: r, equalScalar: t } = e;
        return r(ga, {
            "number | BigNumber | Complex | Fraction": (n)=>t(n, 0),
            bigint: (n)=>n === 0n,
            Unit: r.referToSelf((n)=>(i)=>r.find(n, i.valueType())(i.value)),
            "Array | Matrix": r.referToSelf((n)=>(i)=>Ur(i, n))
        });
    });
    function Sc(e, r, t, n) {
        return ft(e.re, r.re, t, n) && ft(e.im, r.im, t, n);
    }
    var un = he("compareUnits", [
        "typed"
    ], (e)=>{
        var { typed: r } = e;
        return {
            "Unit, Unit": r.referToSelf((t)=>(n, i)=>{
                    if (!n.equalBase(i)) throw new Error("Cannot compare units with different base");
                    return r.find(t, [
                        n.valueType(),
                        i.valueType()
                    ])(n.value, i.value);
                })
        };
    }), Ln = "equalScalar", Mc = [
        "typed",
        "config"
    ], Nc = he(Ln, Mc, (e)=>{
        var { typed: r, config: t } = e, n = un({
            typed: r
        });
        return r(Ln, {
            "boolean, boolean": function(a, o) {
                return a === o;
            },
            "number, number": function(a, o) {
                return ft(a, o, t.relTol, t.absTol);
            },
            "BigNumber, BigNumber": function(a, o) {
                return a.eq(o) || kt(a, o, t.relTol, t.absTol);
            },
            "bigint, bigint": function(a, o) {
                return a === o;
            },
            "Fraction, Fraction": function(a, o) {
                return a.equals(o);
            },
            "Complex, Complex": function(a, o) {
                return Sc(a, o, t.relTol, t.absTol);
            }
        }, n);
    });
    he(Ln, [
        "typed",
        "config"
    ], (e)=>{
        var { typed: r, config: t } = e;
        return r(Ln, {
            "number, number": function(i, a) {
                return ft(i, a, t.relTol, t.absTol);
            }
        });
    });
    var Bc = "SparseMatrix", xc = [
        "typed",
        "equalScalar",
        "Matrix"
    ], Tc = he(Bc, xc, (e)=>{
        var { typed: r, equalScalar: t, Matrix: n } = e;
        function i(d, y) {
            if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator");
            if (y && !Wr(y)) throw new Error("Invalid datatype: " + y);
            if (Ke(d)) a(this, d, y);
            else if (d && nr(d.index) && nr(d.ptr) && nr(d.size)) this._values = d.values, this._index = d.index, this._ptr = d.ptr, this._size = d.size, this._datatype = y || d.datatype;
            else if (nr(d)) o(this, d, y);
            else {
                if (d) throw new TypeError("Unsupported type of data (" + Kr(d) + ")");
                this._values = [], this._index = [], this._ptr = [
                    0
                ], this._size = [
                    0,
                    0
                ], this._datatype = y;
            }
        }
        function a(d, y, D) {
            y.type === "SparseMatrix" ? (d._values = y._values ? We(y._values) : void 0, d._index = We(y._index), d._ptr = We(y._ptr), d._size = We(y._size), d._datatype = D || y._datatype) : o(d, y.valueOf(), D || y._datatype);
        }
        function o(d, y, D) {
            d._values = [], d._index = [], d._ptr = [], d._datatype = D;
            var b = y.length, E = 0, M = t, F = 0;
            if (Wr(D) && (M = r.find(t, [
                D,
                D
            ]) || t, F = r.convert(0, D)), b > 0) {
                var w = 0;
                do {
                    d._ptr.push(d._index.length);
                    for(var N = 0; N < b; N++){
                        var S = y[N];
                        if (nr(S)) {
                            if (w === 0 && E < S.length && (E = S.length), w < S.length) {
                                var _ = S[w];
                                M(_, F) || (d._values.push(_), d._index.push(N));
                            }
                        } else w === 0 && E < 1 && (E = 1), M(S, F) || (d._values.push(S), d._index.push(N));
                    }
                    w++;
                }while (w < E);
            }
            d._ptr.push(d._index.length), d._size = [
                b,
                E
            ];
        }
        i.prototype = new n, i.prototype.createSparseMatrix = function(d, y) {
            return new i(d, y);
        }, Object.defineProperty(i, "name", {
            value: "SparseMatrix"
        }), i.prototype.constructor = i, i.prototype.type = "SparseMatrix", i.prototype.isSparseMatrix = !0, i.prototype.getDataType = function() {
            return Xn(this._values, Kr);
        }, i.prototype.storage = function() {
            return "sparse";
        }, i.prototype.datatype = function() {
            return this._datatype;
        }, i.prototype.create = function(d, y) {
            return new i(d, y);
        }, i.prototype.density = function() {
            var d = this._size[0], y = this._size[1];
            return d !== 0 && y !== 0 ? this._index.length / (d * y) : 0;
        }, i.prototype.subset = function(d, y, D) {
            if (!this._values) throw new Error("Cannot invoke subset on a Pattern only matrix");
            switch(arguments.length){
                case 1:
                    return u(this, d);
                case 2:
                case 3:
                    return c(this, d, y, D);
                default:
                    throw new SyntaxError("Wrong number of arguments");
            }
        };
        function u(d, y) {
            if (!Gn(y)) throw new TypeError("Invalid index");
            var D = y.isScalar();
            if (D) return d.get(y.min());
            var b = y.size();
            if (b.length !== d._size.length) throw new ke(b.length, d._size.length);
            var E, M, F, w, N = y.min(), S = y.max();
            for(E = 0, M = d._size.length; E < M; E++)tr(N[E], d._size[E]), tr(S[E], d._size[E]);
            var _ = d._values, x = d._index, T = d._ptr, z = y.dimension(0), q = y.dimension(1), $ = [], k = [];
            z.forEach(function(I, Z) {
                k[I] = Z[0], $[I] = !0;
            });
            var L = _ ? [] : void 0, G = [], R = [];
            return q.forEach(function(I) {
                for(R.push(G.length), F = T[I], w = T[I + 1]; F < w; F++)E = x[F], $[E] === !0 && (G.push(k[E]), L && L.push(_[F]));
            }), R.push(G.length), new i({
                values: L,
                index: G,
                ptr: R,
                size: b,
                datatype: d._datatype
            });
        }
        function c(d, y, D, b) {
            if (!y || y.isIndex !== !0) throw new TypeError("Invalid index");
            var E = y.size(), M = y.isScalar(), F;
            if (Ke(D) ? (F = D.size(), D = D.toArray()) : F = Ze(D), M) {
                if (F.length !== 0) throw new TypeError("Scalar expected");
                d.set(y.min(), D, b);
            } else {
                if (E.length !== 1 && E.length !== 2) throw new ke(E.length, d._size.length, "<");
                if (F.length < E.length) {
                    for(var w = 0, N = 0; E[w] === 1 && F[w] === 1;)w++;
                    for(; E[w] === 1;)N++, w++;
                    D = Jo(D, E.length, N, F);
                }
                if (!yt(E, F)) throw new ke(E, F, ">");
                if (E.length === 1) {
                    var S = y.dimension(0);
                    S.forEach(function(T, z) {
                        tr(T), d.set([
                            T,
                            0
                        ], D[z[0]], b);
                    });
                } else {
                    var _ = y.dimension(0), x = y.dimension(1);
                    _.forEach(function(T, z) {
                        tr(T), x.forEach(function(q, $) {
                            tr(q), d.set([
                                T,
                                q
                            ], D[z[0]][$[0]], b);
                        });
                    });
                }
            }
            return d;
        }
        i.prototype.get = function(d) {
            if (!nr(d)) throw new TypeError("Array expected");
            if (d.length !== this._size.length) throw new ke(d.length, this._size.length);
            if (!this._values) throw new Error("Cannot invoke get on a Pattern only matrix");
            var y = d[0], D = d[1];
            tr(y, this._size[0]), tr(D, this._size[1]);
            var b = s(y, this._ptr[D], this._ptr[D + 1], this._index);
            return b < this._ptr[D + 1] && this._index[b] === y ? this._values[b] : 0;
        }, i.prototype.set = function(d, y, D) {
            if (!nr(d)) throw new TypeError("Array expected");
            if (d.length !== this._size.length) throw new ke(d.length, this._size.length);
            if (!this._values) throw new Error("Cannot invoke set on a Pattern only matrix");
            var b = d[0], E = d[1], M = this._size[0], F = this._size[1], w = t, N = 0;
            Wr(this._datatype) && (w = r.find(t, [
                this._datatype,
                this._datatype
            ]) || t, N = r.convert(0, this._datatype)), (b > M - 1 || E > F - 1) && (h(this, Math.max(b + 1, M), Math.max(E + 1, F), D), M = this._size[0], F = this._size[1]), tr(b, M), tr(E, F);
            var S = s(b, this._ptr[E], this._ptr[E + 1], this._index);
            return S < this._ptr[E + 1] && this._index[S] === b ? w(y, N) ? l(S, E, this._values, this._index, this._ptr) : this._values[S] = y : w(y, N) || v(S, b, E, y, this._values, this._index, this._ptr), this;
        };
        function s(d, y, D, b) {
            if (D - y === 0) return D;
            for(var E = y; E < D; E++)if (b[E] === d) return E;
            return y;
        }
        function l(d, y, D, b, E) {
            D.splice(d, 1), b.splice(d, 1);
            for(var M = y + 1; M < E.length; M++)E[M]--;
        }
        function v(d, y, D, b, E, M, F) {
            E.splice(d, 0, b), M.splice(d, 0, y);
            for(var w = D + 1; w < F.length; w++)F[w]++;
        }
        i.prototype.resize = function(d, y, D) {
            if (!Bn(d)) throw new TypeError("Array or Matrix expected");
            var b = d.valueOf().map((M)=>Array.isArray(M) && M.length === 1 ? M[0] : M);
            if (b.length !== 2) throw new Error("Only two dimensions matrix are supported");
            b.forEach(function(M) {
                if (!ir(M) || !ar(M) || M < 0) throw new TypeError("Invalid size, must contain positive integers (size: " + fr(b) + ")");
            });
            var E = D ? this.clone() : this;
            return h(E, b[0], b[1], y);
        };
        function h(d, y, D, b) {
            var E = b || 0, M = t, F = 0;
            Wr(d._datatype) && (M = r.find(t, [
                d._datatype,
                d._datatype
            ]) || t, F = r.convert(0, d._datatype), E = r.convert(E, d._datatype));
            var w = !M(E, F), N = d._size[0], S = d._size[1], _, x, T;
            if (D > S) {
                for(x = S; x < D; x++)if (d._ptr[x] = d._values.length, w) for(_ = 0; _ < N; _++)d._values.push(E), d._index.push(_);
                d._ptr[D] = d._values.length;
            } else D < S && (d._ptr.splice(D + 1, S - D), d._values.splice(d._ptr[D], d._values.length), d._index.splice(d._ptr[D], d._index.length));
            if (S = D, y > N) {
                if (w) {
                    var z = 0;
                    for(x = 0; x < S; x++){
                        d._ptr[x] = d._ptr[x] + z, T = d._ptr[x + 1] + z;
                        var q = 0;
                        for(_ = N; _ < y; _++, q++)d._values.splice(T + q, 0, E), d._index.splice(T + q, 0, _), z++;
                    }
                    d._ptr[S] = d._values.length;
                }
            } else if (y < N) {
                var $ = 0;
                for(x = 0; x < S; x++){
                    d._ptr[x] = d._ptr[x] - $;
                    var k = d._ptr[x], L = d._ptr[x + 1] - $;
                    for(T = k; T < L; T++)_ = d._index[T], _ > y - 1 && (d._values.splice(T, 1), d._index.splice(T, 1), $++);
                }
                d._ptr[x] = d._values.length;
            }
            return d._size[0] = y, d._size[1] = D, d;
        }
        i.prototype.reshape = function(d, y) {
            if (!nr(d)) throw new TypeError("Array expected");
            if (d.length !== 2) throw new Error("Sparse matrices can only be reshaped in two dimensions");
            d.forEach(function(I) {
                if (!ir(I) || !ar(I) || I <= -2 || I === 0) throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + fr(d) + ")");
            });
            var D = this._size[0] * this._size[1];
            d = Ri(d, D);
            var b = d[0] * d[1];
            if (D !== b) throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
            var E = y ? this.clone() : this;
            if (this._size[0] === d[0] && this._size[1] === d[1]) return E;
            for(var M = [], F = 0; F < E._ptr.length; F++)for(var w = 0; w < E._ptr[F + 1] - E._ptr[F]; w++)M.push(F);
            for(var N = E._values.slice(), S = E._index.slice(), _ = 0; _ < E._index.length; _++){
                var x = S[_], T = M[_], z = x * E._size[1] + T;
                M[_] = z % d[1], S[_] = Math.floor(z / d[1]);
            }
            E._values.length = 0, E._index.length = 0, E._ptr.length = d[1] + 1, E._size = d.slice();
            for(var q = 0; q < E._ptr.length; q++)E._ptr[q] = 0;
            for(var $ = 0; $ < N.length; $++){
                var k = S[$], L = M[$], G = N[$], R = s(k, E._ptr[L], E._ptr[L + 1], E._index);
                v(R, k, L, G, E._values, E._index, E._ptr);
            }
            return E;
        }, i.prototype.clone = function() {
            var d = new i({
                values: this._values ? We(this._values) : void 0,
                index: We(this._index),
                ptr: We(this._ptr),
                size: We(this._size),
                datatype: this._datatype
            });
            return d;
        }, i.prototype.size = function() {
            return this._size.slice(0);
        }, i.prototype.map = function(d, y) {
            if (!this._values) throw new Error("Cannot invoke map on a Pattern only matrix");
            var D = this, b = this._size[0], E = this._size[1], M = Rn(d, D, "map"), F = function(N, S, _) {
                return M.fn(N, [
                    S,
                    _
                ], D);
            };
            return p(this, 0, b - 1, 0, E - 1, F, y);
        };
        function p(d, y, D, b, E, M, F) {
            var w = [], N = [], S = [], _ = t, x = 0;
            Wr(d._datatype) && (_ = r.find(t, [
                d._datatype,
                d._datatype
            ]) || t, x = r.convert(0, d._datatype));
            for(var T = function(H, Y, re) {
                var j = M(H, Y, re);
                _(j, x) || (w.push(j), N.push(Y));
            }, z = b; z <= E; z++){
                S.push(w.length);
                var q = d._ptr[z], $ = d._ptr[z + 1];
                if (F) for(var k = q; k < $; k++){
                    var L = d._index[k];
                    L >= y && L <= D && T(d._values[k], L - y, z - b);
                }
                else {
                    for(var G = {}, R = q; R < $; R++){
                        var I = d._index[R];
                        G[I] = d._values[R];
                    }
                    for(var Z = y; Z <= D; Z++){
                        var te = Z in G ? G[Z] : 0;
                        T(te, Z - y, z - b);
                    }
                }
            }
            return S.push(w.length), new i({
                values: w,
                index: N,
                ptr: S,
                size: [
                    D - y + 1,
                    E - b + 1
                ]
            });
        }
        i.prototype.forEach = function(d, y) {
            if (!this._values) throw new Error("Cannot invoke forEach on a Pattern only matrix");
            for(var D = this, b = this._size[0], E = this._size[1], M = Rn(d, D, "forEach"), F = 0; F < E; F++){
                var w = this._ptr[F], N = this._ptr[F + 1];
                if (y) for(var S = w; S < N; S++){
                    var _ = this._index[S];
                    M.fn(this._values[S], [
                        _,
                        F
                    ], D);
                }
                else {
                    for(var x = {}, T = w; T < N; T++){
                        var z = this._index[T];
                        x[z] = this._values[T];
                    }
                    for(var q = 0; q < b; q++){
                        var $ = q in x ? x[q] : 0;
                        M.fn($, [
                            q,
                            F
                        ], D);
                    }
                }
            }
        }, i.prototype[Symbol.iterator] = function*() {
            if (!this._values) throw new Error("Cannot iterate a Pattern only matrix");
            for(var d = this._size[1], y = 0; y < d; y++)for(var D = this._ptr[y], b = this._ptr[y + 1], E = D; E < b; E++){
                var M = this._index[E];
                yield {
                    value: this._values[E],
                    index: [
                        M,
                        y
                    ]
                };
            }
        }, i.prototype.toArray = function() {
            return g(this._values, this._index, this._ptr, this._size, !0);
        }, i.prototype.valueOf = function() {
            return g(this._values, this._index, this._ptr, this._size, !1);
        };
        function g(d, y, D, b, E) {
            var M = b[0], F = b[1], w = [], N, S;
            for(N = 0; N < M; N++)for(w[N] = [], S = 0; S < F; S++)w[N][S] = 0;
            for(S = 0; S < F; S++)for(var _ = D[S], x = D[S + 1], T = _; T < x; T++)N = y[T], w[N][S] = d ? E ? We(d[T]) : d[T] : 1;
            return w;
        }
        return i.prototype.format = function(d) {
            for(var y = this._size[0], D = this._size[1], b = this.density(), E = "Sparse Matrix [" + fr(y, d) + " x " + fr(D, d) + "] density: " + fr(b, d) + `
`, M = 0; M < D; M++)for(var F = this._ptr[M], w = this._ptr[M + 1], N = F; N < w; N++){
                var S = this._index[N];
                E += `
    (` + fr(S, d) + ", " + fr(M, d) + ") ==> " + (this._values ? fr(this._values[N], d) : "X");
            }
            return E;
        }, i.prototype.toString = function() {
            return fr(this.toArray());
        }, i.prototype.toJSON = function() {
            return {
                mathjs: "SparseMatrix",
                values: this._values,
                index: this._index,
                ptr: this._ptr,
                size: this._size,
                datatype: this._datatype
            };
        }, i.prototype.diagonal = function(d) {
            if (d) {
                if (cr(d) && (d = d.toNumber()), !ir(d) || !ar(d)) throw new TypeError("The parameter k must be an integer number");
            } else d = 0;
            var y = d > 0 ? d : 0, D = d < 0 ? -d : 0, b = this._size[0], E = this._size[1], M = Math.min(b - D, E - y), F = [], w = [], N = [];
            N[0] = 0;
            for(var S = y; S < E && F.length < M; S++)for(var _ = this._ptr[S], x = this._ptr[S + 1], T = _; T < x; T++){
                var z = this._index[T];
                if (z === S - y + D) {
                    F.push(this._values[T]), w[F.length - 1] = z - D;
                    break;
                }
            }
            return N.push(F.length), new i({
                values: F,
                index: w,
                ptr: N,
                size: [
                    M,
                    1
                ]
            });
        }, i.fromJSON = function(d) {
            return new i(d);
        }, i.diagonal = function(d, y, D, b, E) {
            if (!nr(d)) throw new TypeError("Array expected, size parameter");
            if (d.length !== 2) throw new Error("Only two dimensions matrix are supported");
            if (d = d.map(function(I) {
                if (cr(I) && (I = I.toNumber()), !ir(I) || !ar(I) || I < 1) throw new Error("Size values must be positive integers");
                return I;
            }), D) {
                if (cr(D) && (D = D.toNumber()), !ir(D) || !ar(D)) throw new TypeError("The parameter k must be an integer number");
            } else D = 0;
            var M = t, F = 0;
            Wr(E) && (M = r.find(t, [
                E,
                E
            ]) || t, F = r.convert(0, E));
            var w = D > 0 ? D : 0, N = D < 0 ? -D : 0, S = d[0], _ = d[1], x = Math.min(S - N, _ - w), T;
            if (nr(y)) {
                if (y.length !== x) throw new Error("Invalid value array length");
                T = function(Z) {
                    return y[Z];
                };
            } else if (Ke(y)) {
                var z = y.size();
                if (z.length !== 1 || z[0] !== x) throw new Error("Invalid matrix length");
                T = function(Z) {
                    return y.get([
                        Z
                    ]);
                };
            } else T = function() {
                return y;
            };
            for(var q = [], $ = [], k = [], L = 0; L < _; L++){
                k.push(q.length);
                var G = L - w;
                if (G >= 0 && G < x) {
                    var R = T(G);
                    M(R, F) || ($.push(G + N), q.push(R));
                }
            }
            return k.push(q.length), new i({
                values: q,
                index: $,
                ptr: k,
                size: [
                    S,
                    _
                ]
            });
        }, i.prototype.swapRows = function(d, y) {
            if (!ir(d) || !ar(d) || !ir(y) || !ar(y)) throw new Error("Row index must be positive integers");
            if (this._size.length !== 2) throw new Error("Only two dimensional matrix is supported");
            return tr(d, this._size[0]), tr(y, this._size[0]), i._swapRows(d, y, this._size[1], this._values, this._index, this._ptr), this;
        }, i._forEachRow = function(d, y, D, b, E) {
            for(var M = b[d], F = b[d + 1], w = M; w < F; w++)E(D[w], y[w]);
        }, i._swapRows = function(d, y, D, b, E, M) {
            for(var F = 0; F < D; F++){
                var w = M[F], N = M[F + 1], S = s(d, w, N, E), _ = s(y, w, N, E);
                if (S < N && _ < N && E[S] === d && E[_] === y) {
                    if (b) {
                        var x = b[S];
                        b[S] = b[_], b[_] = x;
                    }
                    continue;
                }
                if (S < N && E[S] === d && (_ >= N || E[_] !== y)) {
                    var T = b ? b[S] : void 0;
                    E.splice(_, 0, y), b && b.splice(_, 0, T), E.splice(_ <= S ? S + 1 : S, 1), b && b.splice(_ <= S ? S + 1 : S, 1);
                    continue;
                }
                if (_ < N && E[_] === y && (S >= N || E[S] !== d)) {
                    var z = b ? b[_] : void 0;
                    E.splice(S, 0, d), b && b.splice(S, 0, z), E.splice(S <= _ ? _ + 1 : _, 1), b && b.splice(S <= _ ? _ + 1 : _, 1);
                }
            }
        }, i;
    }, {
        isClass: !0
    }), Pc = "number", zc = [
        "typed"
    ];
    function Oc(e) {
        var r = e.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
        if (r) {
            var t = {
                "0b": 2,
                "0o": 8,
                "0x": 16
            }[r[1]], n = r[2], i = r[3];
            return {
                input: e,
                radix: t,
                integerPart: n,
                fractionalPart: i
            };
        } else return null;
    }
    function Ic(e) {
        for(var r = parseInt(e.integerPart, e.radix), t = 0, n = 0; n < e.fractionalPart.length; n++){
            var i = parseInt(e.fractionalPart[n], e.radix);
            t += i / Math.pow(e.radix, n + 1);
        }
        var a = r + t;
        if (isNaN(a)) throw new SyntaxError('String "' + e.input + '" is not a valid number');
        return a;
    }
    var Rc = he(Pc, zc, (e)=>{
        var { typed: r } = e, t = r("number", {
            "": function() {
                return 0;
            },
            number: function(i) {
                return i;
            },
            string: function(i) {
                if (i === "NaN") return NaN;
                var a = Oc(i);
                if (a) return Ic(a);
                var o = 0, u = i.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
                u && (o = Number(u[2]), i = u[1]);
                var c = Number(i);
                if (isNaN(c)) throw new SyntaxError('String "' + i + '" is not a valid number');
                if (u) {
                    if (c > 2 ** o - 1) throw new SyntaxError('String "'.concat(i, '" is out of range'));
                    c >= 2 ** (o - 1) && (c = c - 2 ** o);
                }
                return c;
            },
            BigNumber: function(i) {
                return i.toNumber();
            },
            bigint: function(i) {
                return Number(i);
            },
            Fraction: function(i) {
                return i.valueOf();
            },
            Unit: r.referToSelf((n)=>(i)=>{
                    var a = i.clone();
                    return a.value = n(i.value), a;
                }),
            null: function(i) {
                return 0;
            },
            "Unit, string | Unit": function(i, a) {
                return i.toNumber(a);
            },
            "Array | Matrix": r.referToSelf((n)=>(i)=>Ur(i, n))
        });
        return t.fromJSON = function(n) {
            return parseFloat(n.value);
        }, t;
    }), Lc = "bignumber", Uc = [
        "typed",
        "BigNumber"
    ], $c = he(Lc, Uc, (e)=>{
        var { typed: r, BigNumber: t } = e;
        return r("bignumber", {
            "": function() {
                return new t(0);
            },
            number: function(i) {
                return new t(i + "");
            },
            string: function(i) {
                var a = i.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
                if (a) {
                    var o = a[2], u = t(a[1]), c = new t(2).pow(Number(o));
                    if (u.gt(c.sub(1))) throw new SyntaxError('String "'.concat(i, '" is out of range'));
                    var s = new t(2).pow(Number(o) - 1);
                    return u.gte(s) ? u.sub(c) : u;
                }
                return new t(i);
            },
            BigNumber: function(i) {
                return i;
            },
            bigint: function(i) {
                return new t(i.toString());
            },
            Unit: r.referToSelf((n)=>(i)=>{
                    var a = i.clone();
                    return a.value = n(i.value), a;
                }),
            Fraction: function(i) {
                return new t(String(i.n)).div(String(i.d)).times(String(i.s));
            },
            null: function(i) {
                return new t(0);
            },
            "Array | Matrix": r.referToSelf((n)=>(i)=>Ur(i, n))
        });
    }), qc = "complex", kc = [
        "typed",
        "Complex"
    ], Hc = he(qc, kc, (e)=>{
        var { typed: r, Complex: t } = e;
        return r("complex", {
            "": function() {
                return t.ZERO;
            },
            number: function(i) {
                return new t(i, 0);
            },
            "number, number": function(i, a) {
                return new t(i, a);
            },
            "BigNumber, BigNumber": function(i, a) {
                return new t(i.toNumber(), a.toNumber());
            },
            Fraction: function(i) {
                return new t(i.valueOf(), 0);
            },
            Complex: function(i) {
                return i.clone();
            },
            string: function(i) {
                return t(i);
            },
            null: function(i) {
                return t(0);
            },
            Object: function(i) {
                if ("re" in i && "im" in i) return new t(i.re, i.im);
                if ("r" in i && "phi" in i || "abs" in i && "arg" in i) return new t(i);
                throw new Error("Expected object with properties (re and im) or (r and phi) or (abs and arg)");
            },
            "Array | Matrix": r.referToSelf((n)=>(i)=>Ur(i, n))
        });
    }), Gc = "fraction", Wc = [
        "typed",
        "Fraction"
    ], Vc = he(Gc, Wc, (e)=>{
        var { typed: r, Fraction: t } = e;
        return r("fraction", {
            number: function(i) {
                if (!isFinite(i) || isNaN(i)) throw new Error(i + " cannot be represented as a fraction");
                return new t(i);
            },
            string: function(i) {
                return new t(i);
            },
            "number, number": function(i, a) {
                return new t(i, a);
            },
            "bigint, bigint": function(i, a) {
                return new t(i, a);
            },
            null: function(i) {
                return new t(0);
            },
            BigNumber: function(i) {
                return new t(i.toString());
            },
            bigint: function(i) {
                return new t(i.toString());
            },
            Fraction: function(i) {
                return i;
            },
            Unit: r.referToSelf((n)=>(i)=>{
                    var a = i.clone();
                    return a.value = n(i.value), a;
                }),
            Object: function(i) {
                return new t(i);
            },
            "Array | Matrix": r.referToSelf((n)=>(i)=>Ur(i, n))
        });
    }), Da = "matrix", Zc = [
        "typed",
        "Matrix",
        "DenseMatrix",
        "SparseMatrix"
    ], Yc = he(Da, Zc, (e)=>{
        var { typed: r, Matrix: t, DenseMatrix: n, SparseMatrix: i } = e;
        return r(Da, {
            "": function() {
                return a([]);
            },
            string: function(u) {
                return a([], u);
            },
            "string, string": function(u, c) {
                return a([], u, c);
            },
            Array: function(u) {
                return a(u);
            },
            Matrix: function(u) {
                return a(u, u.storage());
            },
            "Array | Matrix, string": a,
            "Array | Matrix, string, string": a
        });
        function a(o, u, c) {
            if (u === "dense" || u === "default" || u === void 0) return new n(o, c);
            if (u === "sparse") return new i(o, c);
            throw new TypeError("Unknown matrix type " + JSON.stringify(u) + ".");
        }
    }), ya = "matrixFromColumns", Qc = [
        "typed",
        "matrix",
        "flatten",
        "size"
    ], Xc = he(ya, Qc, (e)=>{
        var { typed: r, matrix: t, flatten: n, size: i } = e;
        return r(ya, {
            "...Array": function(c) {
                return a(c);
            },
            "...Matrix": function(c) {
                return t(a(c.map((s)=>s.toArray())));
            }
        });
        function a(u) {
            if (u.length === 0) throw new TypeError("At least one column is needed to construct a matrix.");
            for(var c = o(u[0]), s = [], l = 0; l < c; l++)s[l] = [];
            for (var v of u){
                var h = o(v);
                if (h !== c) throw new TypeError("The vectors had different length: " + (c | 0) + " ≠ " + (h | 0));
                for(var p = n(v), g = 0; g < c; g++)s[g].push(p[g]);
            }
            return s;
        }
        function o(u) {
            var c = i(u);
            if (c.length === 1) return c[0];
            if (c.length === 2) {
                if (c[0] === 1) return c[1];
                if (c[1] === 1) return c[0];
                throw new TypeError("At least one of the arguments is not a vector.");
            } else throw new TypeError("Only one- or two-dimensional vectors are supported.");
        }
    }), wa = "unaryMinus", Jc = [
        "typed"
    ], Kc = he(wa, Jc, (e)=>{
        var { typed: r } = e;
        return r(wa, {
            number: su,
            "Complex | BigNumber | Fraction": (t)=>t.neg(),
            bigint: (t)=>-t,
            Unit: r.referToSelf((t)=>(n)=>{
                    var i = n.clone();
                    return i.value = r.find(t, i.valueType())(n.value), i;
                }),
            "Array | Matrix": r.referToSelf((t)=>(n)=>Ur(n, t, !0))
        });
    }), Ea = "abs", jc = [
        "typed"
    ], el = he(Ea, jc, (e)=>{
        var { typed: r } = e;
        return r(Ea, {
            number: iu,
            "Complex | BigNumber | Fraction | Unit": (t)=>t.abs(),
            bigint: (t)=>t < 0n ? -t : t,
            "Array | Matrix": r.referToSelf((t)=>(n)=>Ur(n, t, !0))
        });
    }), _a = "addScalar", rl = [
        "typed"
    ], tl = he(_a, rl, (e)=>{
        var { typed: r } = e;
        return r(_a, {
            "number, number": au,
            "Complex, Complex": function(n, i) {
                return n.add(i);
            },
            "BigNumber, BigNumber": function(n, i) {
                return n.plus(i);
            },
            "bigint, bigint": function(n, i) {
                return n + i;
            },
            "Fraction, Fraction": function(n, i) {
                return n.add(i);
            },
            "Unit, Unit": r.referToSelf((t)=>(n, i)=>{
                    if (n.value === null || n.value === void 0) throw new Error("Parameter x contains a unit with undefined value");
                    if (i.value === null || i.value === void 0) throw new Error("Parameter y contains a unit with undefined value");
                    if (!n.equalBase(i)) throw new Error("Units do not match");
                    var a = n.clone();
                    return a.value = r.find(t, [
                        a.valueType(),
                        i.valueType()
                    ])(a.value, i.value), a.fixPrefix = !1, a;
                })
        });
    }), Aa = "subtractScalar", nl = [
        "typed"
    ], il = he(Aa, nl, (e)=>{
        var { typed: r } = e;
        return r(Aa, {
            "number, number": ou,
            "Complex, Complex": function(n, i) {
                return n.sub(i);
            },
            "BigNumber, BigNumber": function(n, i) {
                return n.minus(i);
            },
            "bigint, bigint": function(n, i) {
                return n - i;
            },
            "Fraction, Fraction": function(n, i) {
                return n.sub(i);
            },
            "Unit, Unit": r.referToSelf((t)=>(n, i)=>{
                    if (n.value === null || n.value === void 0) throw new Error("Parameter x contains a unit with undefined value");
                    if (i.value === null || i.value === void 0) throw new Error("Parameter y contains a unit with undefined value");
                    if (!n.equalBase(i)) throw new Error("Units do not match");
                    var a = n.clone();
                    return a.value = r.find(t, [
                        a.valueType(),
                        i.valueType()
                    ])(a.value, i.value), a.fixPrefix = !1, a;
                })
        });
    }), al = "matAlgo11xS0s", ol = [
        "typed",
        "equalScalar"
    ], ul = he(al, ol, (e)=>{
        var { typed: r, equalScalar: t } = e;
        return function(i, a, o, u) {
            var c = i._values, s = i._index, l = i._ptr, v = i._size, h = i._datatype;
            if (!c) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
            var p = v[0], g = v[1], d, y = t, D = 0, b = o;
            typeof h == "string" && (d = h, y = r.find(t, [
                d,
                d
            ]), D = r.convert(0, d), a = r.convert(a, d), b = r.find(o, [
                d,
                d
            ]));
            for(var E = [], M = [], F = [], w = 0; w < g; w++){
                F[w] = M.length;
                for(var N = l[w], S = l[w + 1], _ = N; _ < S; _++){
                    var x = s[_], T = u ? b(a, c[_]) : b(c[_], a);
                    y(T, D) || (M.push(x), E.push(T));
                }
            }
            return F[g] = M.length, i.createSparseMatrix({
                values: E,
                index: M,
                ptr: F,
                size: [
                    p,
                    g
                ],
                datatype: d
            });
        };
    }), sl = "matAlgo12xSfs", fl = [
        "typed",
        "DenseMatrix"
    ], Ht = he(sl, fl, (e)=>{
        var { typed: r, DenseMatrix: t } = e;
        return function(i, a, o, u) {
            var c = i._values, s = i._index, l = i._ptr, v = i._size, h = i._datatype;
            if (!c) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
            var p = v[0], g = v[1], d, y = o;
            typeof h == "string" && (d = h, a = r.convert(a, d), y = r.find(o, [
                d,
                d
            ]));
            for(var D = [], b = [], E = [], M = 0; M < g; M++){
                for(var F = M + 1, w = l[M], N = l[M + 1], S = w; S < N; S++){
                    var _ = s[S];
                    b[_] = c[S], E[_] = F;
                }
                for(var x = 0; x < p; x++)M === 0 && (D[x] = []), E[x] === F ? D[x][M] = u ? y(a, b[x]) : y(b[x], a) : D[x][M] = u ? y(a, 0) : y(0, a);
            }
            return new t({
                data: D,
                size: [
                    p,
                    g
                ],
                datatype: d
            });
        };
    }), cl = "matAlgo14xDs", ll = [
        "typed"
    ], lu = he(cl, ll, (e)=>{
        var { typed: r } = e;
        return function(i, a, o, u) {
            var c = i._data, s = i._size, l = i._datatype, v, h = o;
            typeof l == "string" && (v = l, a = r.convert(a, v), h = r.find(o, [
                v,
                v
            ]));
            var p = s.length > 0 ? t(h, 0, s, s[0], c, a, u) : [];
            return i.createDenseMatrix({
                data: p,
                size: We(s),
                datatype: v
            });
        };
        function t(n, i, a, o, u, c, s) {
            var l = [];
            if (i === a.length - 1) for(var v = 0; v < o; v++)l[v] = s ? n(c, u[v]) : n(u[v], c);
            else for(var h = 0; h < o; h++)l[h] = t(n, i + 1, a, a[i + 1], u[h], c, s);
            return l;
        }
    }), vl = "matAlgo03xDSf", dl = [
        "typed"
    ], Gt = he(vl, dl, (e)=>{
        var { typed: r } = e;
        return function(n, i, a, o) {
            var u = n._data, c = n._size, s = n._datatype || n.getDataType(), l = i._values, v = i._index, h = i._ptr, p = i._size, g = i._datatype || i._data === void 0 ? i._datatype : i.getDataType();
            if (c.length !== p.length) throw new ke(c.length, p.length);
            if (c[0] !== p[0] || c[1] !== p[1]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + p + ")");
            if (!l) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
            var d = c[0], y = c[1], D, b = 0, E = a;
            typeof s == "string" && s === g && s !== "mixed" && (D = s, b = r.convert(0, D), E = r.find(a, [
                D,
                D
            ]));
            for(var M = [], F = 0; F < d; F++)M[F] = [];
            for(var w = [], N = [], S = 0; S < y; S++){
                for(var _ = S + 1, x = h[S], T = h[S + 1], z = x; z < T; z++){
                    var q = v[z];
                    w[q] = o ? E(l[z], u[q][S]) : E(u[q][S], l[z]), N[q] = _;
                }
                for(var $ = 0; $ < d; $++)N[$] === _ ? M[$][S] = w[$] : M[$][S] = o ? E(b, u[$][S]) : E(u[$][S], b);
            }
            return n.createDenseMatrix({
                data: M,
                size: [
                    d,
                    y
                ],
                datatype: s === n._datatype && g === i._datatype ? D : void 0
            });
        };
    }), hl = "matAlgo05xSfSf", pl = [
        "typed",
        "equalScalar"
    ], ml = he(hl, pl, (e)=>{
        var { typed: r, equalScalar: t } = e;
        return function(i, a, o) {
            var u = i._values, c = i._index, s = i._ptr, l = i._size, v = i._datatype || i._data === void 0 ? i._datatype : i.getDataType(), h = a._values, p = a._index, g = a._ptr, d = a._size, y = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
            if (l.length !== d.length) throw new ke(l.length, d.length);
            if (l[0] !== d[0] || l[1] !== d[1]) throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + d + ")");
            var D = l[0], b = l[1], E, M = t, F = 0, w = o;
            typeof v == "string" && v === y && v !== "mixed" && (E = v, M = r.find(t, [
                E,
                E
            ]), F = r.convert(0, E), w = r.find(o, [
                E,
                E
            ]));
            var N = u && h ? [] : void 0, S = [], _ = [], x = N ? [] : void 0, T = N ? [] : void 0, z = [], q = [], $, k, L, G;
            for(k = 0; k < b; k++){
                _[k] = S.length;
                var R = k + 1;
                for(L = s[k], G = s[k + 1]; L < G; L++)$ = c[L], S.push($), z[$] = R, x && (x[$] = u[L]);
                for(L = g[k], G = g[k + 1]; L < G; L++)$ = p[L], z[$] !== R && S.push($), q[$] = R, T && (T[$] = h[L]);
                if (N) for(L = _[k]; L < S.length;){
                    $ = S[L];
                    var I = z[$], Z = q[$];
                    if (I === R || Z === R) {
                        var te = I === R ? x[$] : F, Q = Z === R ? T[$] : F, H = w(te, Q);
                        M(H, F) ? S.splice(L, 1) : (N.push(H), L++);
                    }
                }
            }
            return _[b] = S.length, i.createSparseMatrix({
                values: N,
                index: S,
                ptr: _,
                size: [
                    D,
                    b
                ],
                datatype: v === i._datatype && y === a._datatype ? E : void 0
            });
        };
    }), gl = "matAlgo13xDD", Dl = [
        "typed"
    ], yl = he(gl, Dl, (e)=>{
        var { typed: r } = e;
        return function(i, a, o) {
            var u = i._data, c = i._size, s = i._datatype, l = a._data, v = a._size, h = a._datatype, p = [];
            if (c.length !== v.length) throw new ke(c.length, v.length);
            for(var g = 0; g < c.length; g++){
                if (c[g] !== v[g]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + v + ")");
                p[g] = c[g];
            }
            var d, y = o;
            typeof s == "string" && s === h && (d = s, y = r.find(o, [
                d,
                d
            ]));
            var D = p.length > 0 ? t(y, 0, p, p[0], u, l) : [];
            return i.createDenseMatrix({
                data: D,
                size: p,
                datatype: d
            });
        };
        function t(n, i, a, o, u, c) {
            var s = [];
            if (i === a.length - 1) for(var l = 0; l < o; l++)s[l] = n(u[l], c[l]);
            else for(var v = 0; v < o; v++)s[v] = t(n, i + 1, a, a[i + 1], u[v], c[v]);
            return s;
        }
    });
    function Dr(e, r) {
        if (yt(e.size(), r.size())) return [
            e,
            r
        ];
        var t = ru(e.size(), r.size());
        return [
            e,
            r
        ].map((n)=>wl(n, t));
    }
    function wl(e, r) {
        return yt(e.size(), r) ? e : e.create(Si(e.valueOf(), r), e.datatype());
    }
    var El = "matrixAlgorithmSuite", _l = [
        "typed",
        "matrix"
    ], St = he(El, _l, (e)=>{
        var { typed: r, matrix: t } = e, n = yl({
            typed: r
        }), i = lu({
            typed: r
        });
        return function(o) {
            var u = o.elop, c = o.SD || o.DS, s;
            u ? (s = {
                "DenseMatrix, DenseMatrix": (p, g)=>n(...Dr(p, g), u),
                "Array, Array": (p, g)=>n(...Dr(t(p), t(g)), u).valueOf(),
                "Array, DenseMatrix": (p, g)=>n(...Dr(t(p), g), u),
                "DenseMatrix, Array": (p, g)=>n(...Dr(p, t(g)), u)
            }, o.SS && (s["SparseMatrix, SparseMatrix"] = (p, g)=>o.SS(...Dr(p, g), u, !1)), o.DS && (s["DenseMatrix, SparseMatrix"] = (p, g)=>o.DS(...Dr(p, g), u, !1), s["Array, SparseMatrix"] = (p, g)=>o.DS(...Dr(t(p), g), u, !1)), c && (s["SparseMatrix, DenseMatrix"] = (p, g)=>c(...Dr(g, p), u, !0), s["SparseMatrix, Array"] = (p, g)=>c(...Dr(t(g), p), u, !0))) : (s = {
                "DenseMatrix, DenseMatrix": r.referToSelf((p)=>(g, d)=>n(...Dr(g, d), p)),
                "Array, Array": r.referToSelf((p)=>(g, d)=>n(...Dr(t(g), t(d)), p).valueOf()),
                "Array, DenseMatrix": r.referToSelf((p)=>(g, d)=>n(...Dr(t(g), d), p)),
                "DenseMatrix, Array": r.referToSelf((p)=>(g, d)=>n(...Dr(g, t(d)), p))
            }, o.SS && (s["SparseMatrix, SparseMatrix"] = r.referToSelf((p)=>(g, d)=>o.SS(...Dr(g, d), p, !1))), o.DS && (s["DenseMatrix, SparseMatrix"] = r.referToSelf((p)=>(g, d)=>o.DS(...Dr(g, d), p, !1)), s["Array, SparseMatrix"] = r.referToSelf((p)=>(g, d)=>o.DS(...Dr(t(g), d), p, !1))), c && (s["SparseMatrix, DenseMatrix"] = r.referToSelf((p)=>(g, d)=>c(...Dr(d, g), p, !0)), s["SparseMatrix, Array"] = r.referToSelf((p)=>(g, d)=>c(...Dr(t(d), g), p, !0))));
            var l = o.scalar || "any", v = o.Ds || o.Ss;
            v && (u ? (s["DenseMatrix," + l] = (p, g)=>i(p, g, u, !1), s[l + ", DenseMatrix"] = (p, g)=>i(g, p, u, !0), s["Array," + l] = (p, g)=>i(t(p), g, u, !1).valueOf(), s[l + ", Array"] = (p, g)=>i(t(g), p, u, !0).valueOf()) : (s["DenseMatrix," + l] = r.referToSelf((p)=>(g, d)=>i(g, d, p, !1)), s[l + ", DenseMatrix"] = r.referToSelf((p)=>(g, d)=>i(d, g, p, !0)), s["Array," + l] = r.referToSelf((p)=>(g, d)=>i(t(g), d, p, !1).valueOf()), s[l + ", Array"] = r.referToSelf((p)=>(g, d)=>i(t(d), g, p, !0).valueOf())));
            var h = o.sS !== void 0 ? o.sS : o.Ss;
            return u ? (o.Ss && (s["SparseMatrix," + l] = (p, g)=>o.Ss(p, g, u, !1)), h && (s[l + ", SparseMatrix"] = (p, g)=>h(g, p, u, !0))) : (o.Ss && (s["SparseMatrix," + l] = r.referToSelf((p)=>(g, d)=>o.Ss(g, d, p, !1))), h && (s[l + ", SparseMatrix"] = r.referToSelf((p)=>(g, d)=>h(d, g, p, !0)))), u && u.signatures && Ts(s, u.signatures), s;
        };
    }), Al = "matAlgo01xDSid", Fl = [
        "typed"
    ], vu = he(Al, Fl, (e)=>{
        var { typed: r } = e;
        return function(n, i, a, o) {
            var u = n._data, c = n._size, s = n._datatype || n.getDataType(), l = i._values, v = i._index, h = i._ptr, p = i._size, g = i._datatype || i._data === void 0 ? i._datatype : i.getDataType();
            if (c.length !== p.length) throw new ke(c.length, p.length);
            if (c[0] !== p[0] || c[1] !== p[1]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + p + ")");
            if (!l) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
            var d = c[0], y = c[1], D = typeof s == "string" && s !== "mixed" && s === g ? s : void 0, b = D ? r.find(a, [
                D,
                D
            ]) : a, E, M, F = [];
            for(E = 0; E < d; E++)F[E] = [];
            var w = [], N = [];
            for(M = 0; M < y; M++){
                for(var S = M + 1, _ = h[M], x = h[M + 1], T = _; T < x; T++)E = v[T], w[E] = o ? b(l[T], u[E][M]) : b(u[E][M], l[T]), N[E] = S;
                for(E = 0; E < d; E++)N[E] === S ? F[E][M] = w[E] : F[E][M] = u[E][M];
            }
            return n.createDenseMatrix({
                data: F,
                size: [
                    d,
                    y
                ],
                datatype: s === n._datatype && g === i._datatype ? D : void 0
            });
        };
    }), bl = "matAlgo04xSidSid", Cl = [
        "typed",
        "equalScalar"
    ], Sl = he(bl, Cl, (e)=>{
        var { typed: r, equalScalar: t } = e;
        return function(i, a, o) {
            var u = i._values, c = i._index, s = i._ptr, l = i._size, v = i._datatype || i._data === void 0 ? i._datatype : i.getDataType(), h = a._values, p = a._index, g = a._ptr, d = a._size, y = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
            if (l.length !== d.length) throw new ke(l.length, d.length);
            if (l[0] !== d[0] || l[1] !== d[1]) throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + d + ")");
            var D = l[0], b = l[1], E, M = t, F = 0, w = o;
            typeof v == "string" && v === y && v !== "mixed" && (E = v, M = r.find(t, [
                E,
                E
            ]), F = r.convert(0, E), w = r.find(o, [
                E,
                E
            ]));
            var N = u && h ? [] : void 0, S = [], _ = [], x = u && h ? [] : void 0, T = u && h ? [] : void 0, z = [], q = [], $, k, L, G, R;
            for(k = 0; k < b; k++){
                _[k] = S.length;
                var I = k + 1;
                for(G = s[k], R = s[k + 1], L = G; L < R; L++)$ = c[L], S.push($), z[$] = I, x && (x[$] = u[L]);
                for(G = g[k], R = g[k + 1], L = G; L < R; L++)if ($ = p[L], z[$] === I) {
                    if (x) {
                        var Z = w(x[$], h[L]);
                        M(Z, F) ? z[$] = null : x[$] = Z;
                    }
                } else S.push($), q[$] = I, T && (T[$] = h[L]);
                if (x && T) for(L = _[k]; L < S.length;)$ = S[L], z[$] === I ? (N[L] = x[$], L++) : q[$] === I ? (N[L] = T[$], L++) : S.splice(L, 1);
            }
            return _[b] = S.length, i.createSparseMatrix({
                values: N,
                index: S,
                ptr: _,
                size: [
                    D,
                    b
                ],
                datatype: v === i._datatype && y === a._datatype ? E : void 0
            });
        };
    }), Ml = "matAlgo10xSids", Nl = [
        "typed",
        "DenseMatrix"
    ], du = he(Ml, Nl, (e)=>{
        var { typed: r, DenseMatrix: t } = e;
        return function(i, a, o, u) {
            var c = i._values, s = i._index, l = i._ptr, v = i._size, h = i._datatype;
            if (!c) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
            var p = v[0], g = v[1], d, y = o;
            typeof h == "string" && (d = h, a = r.convert(a, d), y = r.find(o, [
                d,
                d
            ]));
            for(var D = [], b = [], E = [], M = 0; M < g; M++){
                for(var F = M + 1, w = l[M], N = l[M + 1], S = w; S < N; S++){
                    var _ = s[S];
                    b[_] = c[S], E[_] = F;
                }
                for(var x = 0; x < p; x++)M === 0 && (D[x] = []), E[x] === F ? D[x][M] = u ? y(a, b[x]) : y(b[x], a) : D[x][M] = a;
            }
            return new t({
                data: D,
                size: [
                    p,
                    g
                ],
                datatype: d
            });
        };
    }), Bl = "multiplyScalar", xl = [
        "typed"
    ], Tl = he(Bl, xl, (e)=>{
        var { typed: r } = e;
        return r("multiplyScalar", {
            "number, number": uu,
            "Complex, Complex": function(n, i) {
                return n.mul(i);
            },
            "BigNumber, BigNumber": function(n, i) {
                return n.times(i);
            },
            "bigint, bigint": function(n, i) {
                return n * i;
            },
            "Fraction, Fraction": function(n, i) {
                return n.mul(i);
            },
            "number | Fraction | BigNumber | Complex, Unit": (t, n)=>n.multiply(t),
            "Unit, number | Fraction | BigNumber | Complex | Unit": (t, n)=>t.multiply(n)
        });
    }), Fa = "multiply", Pl = [
        "typed",
        "matrix",
        "addScalar",
        "multiplyScalar",
        "equalScalar",
        "dot"
    ], zl = he(Fa, Pl, (e)=>{
        var { typed: r, matrix: t, addScalar: n, multiplyScalar: i, equalScalar: a, dot: o } = e, u = ul({
            typed: r,
            equalScalar: a
        }), c = lu({
            typed: r
        });
        function s(F, w) {
            switch(F.length){
                case 1:
                    switch(w.length){
                        case 1:
                            if (F[0] !== w[0]) throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
                            break;
                        case 2:
                            if (F[0] !== w[0]) throw new RangeError("Dimension mismatch in multiplication. Vector length (" + F[0] + ") must match Matrix rows (" + w[0] + ")");
                            break;
                        default:
                            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + w.length + " dimensions)");
                    }
                    break;
                case 2:
                    switch(w.length){
                        case 1:
                            if (F[1] !== w[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + F[1] + ") must match Vector length (" + w[0] + ")");
                            break;
                        case 2:
                            if (F[1] !== w[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + F[1] + ") must match Matrix B rows (" + w[0] + ")");
                            break;
                        default:
                            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + w.length + " dimensions)");
                    }
                    break;
                default:
                    throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + F.length + " dimensions)");
            }
        }
        function l(F, w, N) {
            if (N === 0) throw new Error("Cannot multiply two empty vectors");
            return o(F, w);
        }
        function v(F, w) {
            if (w.storage() !== "dense") throw new Error("Support for SparseMatrix not implemented");
            return h(F, w);
        }
        function h(F, w) {
            var N = F._data, S = F._size, _ = F._datatype || F.getDataType(), x = w._data, T = w._size, z = w._datatype || w.getDataType(), q = S[0], $ = T[1], k, L = n, G = i;
            _ && z && _ === z && typeof _ == "string" && _ !== "mixed" && (k = _, L = r.find(n, [
                k,
                k
            ]), G = r.find(i, [
                k,
                k
            ]));
            for(var R = [], I = 0; I < $; I++){
                for(var Z = G(N[0], x[0][I]), te = 1; te < q; te++)Z = L(Z, G(N[te], x[te][I]));
                R[I] = Z;
            }
            return F.createDenseMatrix({
                data: R,
                size: [
                    $
                ],
                datatype: _ === F._datatype && z === w._datatype ? k : void 0
            });
        }
        var p = r("_multiplyMatrixVector", {
            "DenseMatrix, any": d,
            "SparseMatrix, any": b
        }), g = r("_multiplyMatrixMatrix", {
            "DenseMatrix, DenseMatrix": y,
            "DenseMatrix, SparseMatrix": D,
            "SparseMatrix, DenseMatrix": E,
            "SparseMatrix, SparseMatrix": M
        });
        function d(F, w) {
            var N = F._data, S = F._size, _ = F._datatype || F.getDataType(), x = w._data, T = w._datatype || w.getDataType(), z = S[0], q = S[1], $, k = n, L = i;
            _ && T && _ === T && typeof _ == "string" && _ !== "mixed" && ($ = _, k = r.find(n, [
                $,
                $
            ]), L = r.find(i, [
                $,
                $
            ]));
            for(var G = [], R = 0; R < z; R++){
                for(var I = N[R], Z = L(I[0], x[0]), te = 1; te < q; te++)Z = k(Z, L(I[te], x[te]));
                G[R] = Z;
            }
            return F.createDenseMatrix({
                data: G,
                size: [
                    z
                ],
                datatype: _ === F._datatype && T === w._datatype ? $ : void 0
            });
        }
        function y(F, w) {
            var N = F._data, S = F._size, _ = F._datatype || F.getDataType(), x = w._data, T = w._size, z = w._datatype || w.getDataType(), q = S[0], $ = S[1], k = T[1], L, G = n, R = i;
            _ && z && _ === z && typeof _ == "string" && _ !== "mixed" && _ !== "mixed" && (L = _, G = r.find(n, [
                L,
                L
            ]), R = r.find(i, [
                L,
                L
            ]));
            for(var I = [], Z = 0; Z < q; Z++){
                var te = N[Z];
                I[Z] = [];
                for(var Q = 0; Q < k; Q++){
                    for(var H = R(te[0], x[0][Q]), Y = 1; Y < $; Y++)H = G(H, R(te[Y], x[Y][Q]));
                    I[Z][Q] = H;
                }
            }
            return F.createDenseMatrix({
                data: I,
                size: [
                    q,
                    k
                ],
                datatype: _ === F._datatype && z === w._datatype ? L : void 0
            });
        }
        function D(F, w) {
            var N = F._data, S = F._size, _ = F._datatype || F.getDataType(), x = w._values, T = w._index, z = w._ptr, q = w._size, $ = w._datatype || w._data === void 0 ? w._datatype : w.getDataType();
            if (!x) throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
            var k = S[0], L = q[1], G, R = n, I = i, Z = a, te = 0;
            _ && $ && _ === $ && typeof _ == "string" && _ !== "mixed" && (G = _, R = r.find(n, [
                G,
                G
            ]), I = r.find(i, [
                G,
                G
            ]), Z = r.find(a, [
                G,
                G
            ]), te = r.convert(0, G));
            for(var Q = [], H = [], Y = [], re = w.createSparseMatrix({
                values: Q,
                index: H,
                ptr: Y,
                size: [
                    k,
                    L
                ],
                datatype: _ === F._datatype && $ === w._datatype ? G : void 0
            }), j = 0; j < L; j++){
                Y[j] = H.length;
                var X = z[j], K = z[j + 1];
                if (K > X) for(var fe = 0, ae = 0; ae < k; ae++){
                    for(var pe = ae + 1, le = void 0, ye = X; ye < K; ye++){
                        var De = T[ye];
                        fe !== pe ? (le = I(N[ae][De], x[ye]), fe = pe) : le = R(le, I(N[ae][De], x[ye]));
                    }
                    fe === pe && !Z(le, te) && (H.push(ae), Q.push(le));
                }
            }
            return Y[L] = H.length, re;
        }
        function b(F, w) {
            var N = F._values, S = F._index, _ = F._ptr, x = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
            if (!N) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
            var T = w._data, z = w._datatype || w.getDataType(), q = F._size[0], $ = w._size[0], k = [], L = [], G = [], R, I = n, Z = i, te = a, Q = 0;
            x && z && x === z && typeof x == "string" && x !== "mixed" && (R = x, I = r.find(n, [
                R,
                R
            ]), Z = r.find(i, [
                R,
                R
            ]), te = r.find(a, [
                R,
                R
            ]), Q = r.convert(0, R));
            var H = [], Y = [];
            G[0] = 0;
            for(var re = 0; re < $; re++){
                var j = T[re];
                if (!te(j, Q)) for(var X = _[re], K = _[re + 1], fe = X; fe < K; fe++){
                    var ae = S[fe];
                    Y[ae] ? H[ae] = I(H[ae], Z(j, N[fe])) : (Y[ae] = !0, L.push(ae), H[ae] = Z(j, N[fe]));
                }
            }
            for(var pe = L.length, le = 0; le < pe; le++){
                var ye = L[le];
                k[le] = H[ye];
            }
            return G[1] = L.length, F.createSparseMatrix({
                values: k,
                index: L,
                ptr: G,
                size: [
                    q,
                    1
                ],
                datatype: x === F._datatype && z === w._datatype ? R : void 0
            });
        }
        function E(F, w) {
            var N = F._values, S = F._index, _ = F._ptr, x = F._datatype || F._data === void 0 ? F._datatype : F.getDataType();
            if (!N) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
            var T = w._data, z = w._datatype || w.getDataType(), q = F._size[0], $ = w._size[0], k = w._size[1], L, G = n, R = i, I = a, Z = 0;
            x && z && x === z && typeof x == "string" && x !== "mixed" && (L = x, G = r.find(n, [
                L,
                L
            ]), R = r.find(i, [
                L,
                L
            ]), I = r.find(a, [
                L,
                L
            ]), Z = r.convert(0, L));
            for(var te = [], Q = [], H = [], Y = F.createSparseMatrix({
                values: te,
                index: Q,
                ptr: H,
                size: [
                    q,
                    k
                ],
                datatype: x === F._datatype && z === w._datatype ? L : void 0
            }), re = [], j = [], X = 0; X < k; X++){
                H[X] = Q.length;
                for(var K = X + 1, fe = 0; fe < $; fe++){
                    var ae = T[fe][X];
                    if (!I(ae, Z)) for(var pe = _[fe], le = _[fe + 1], ye = pe; ye < le; ye++){
                        var De = S[ye];
                        j[De] !== K ? (j[De] = K, Q.push(De), re[De] = R(ae, N[ye])) : re[De] = G(re[De], R(ae, N[ye]));
                    }
                }
                for(var Fe = H[X], be = Q.length, Me = Fe; Me < be; Me++){
                    var Ee = Q[Me];
                    te[Me] = re[Ee];
                }
            }
            return H[k] = Q.length, Y;
        }
        function M(F, w) {
            var N = F._values, S = F._index, _ = F._ptr, x = F._datatype || F._data === void 0 ? F._datatype : F.getDataType(), T = w._values, z = w._index, q = w._ptr, $ = w._datatype || w._data === void 0 ? w._datatype : w.getDataType(), k = F._size[0], L = w._size[1], G = N && T, R, I = n, Z = i;
            x && $ && x === $ && typeof x == "string" && x !== "mixed" && (R = x, I = r.find(n, [
                R,
                R
            ]), Z = r.find(i, [
                R,
                R
            ]));
            for(var te = G ? [] : void 0, Q = [], H = [], Y = F.createSparseMatrix({
                values: te,
                index: Q,
                ptr: H,
                size: [
                    k,
                    L
                ],
                datatype: x === F._datatype && $ === w._datatype ? R : void 0
            }), re = G ? [] : void 0, j = [], X, K, fe, ae, pe, le, ye, De, Fe = 0; Fe < L; Fe++){
                H[Fe] = Q.length;
                var be = Fe + 1;
                for(pe = q[Fe], le = q[Fe + 1], ae = pe; ae < le; ae++)if (De = z[ae], G) for(K = _[De], fe = _[De + 1], X = K; X < fe; X++)ye = S[X], j[ye] !== be ? (j[ye] = be, Q.push(ye), re[ye] = Z(T[ae], N[X])) : re[ye] = I(re[ye], Z(T[ae], N[X]));
                else for(K = _[De], fe = _[De + 1], X = K; X < fe; X++)ye = S[X], j[ye] !== be && (j[ye] = be, Q.push(ye));
                if (G) for(var Me = H[Fe], Ee = Q.length, ze = Me; ze < Ee; ze++){
                    var Be = Q[ze];
                    te[ze] = re[Be];
                }
            }
            return H[L] = Q.length, Y;
        }
        return r(Fa, i, {
            "Array, Array": r.referTo("Matrix, Matrix", (F)=>(w, N)=>{
                    s(Ze(w), Ze(N));
                    var S = F(t(w), t(N));
                    return Ke(S) ? S.valueOf() : S;
                }),
            "Matrix, Matrix": function(w, N) {
                var S = w.size(), _ = N.size();
                return s(S, _), S.length === 1 ? _.length === 1 ? l(w, N, S[0]) : v(w, N) : _.length === 1 ? p(w, N) : g(w, N);
            },
            "Matrix, Array": r.referTo("Matrix,Matrix", (F)=>(w, N)=>F(w, t(N))),
            "Array, Matrix": r.referToSelf((F)=>(w, N)=>F(t(w, N.storage()), N)),
            "SparseMatrix, any": function(w, N) {
                return u(w, N, i, !1);
            },
            "DenseMatrix, any": function(w, N) {
                return c(w, N, i, !1);
            },
            "any, SparseMatrix": function(w, N) {
                return u(N, w, i, !0);
            },
            "any, DenseMatrix": function(w, N) {
                return c(N, w, i, !0);
            },
            "Array, any": function(w, N) {
                return c(t(w), N, i, !1).valueOf();
            },
            "any, Array": function(w, N) {
                return c(t(N), w, i, !0).valueOf();
            },
            "any, any": i,
            "any, any, ...any": r.referToSelf((F)=>(w, N, S)=>{
                    for(var _ = F(w, N), x = 0; x < S.length; x++)_ = F(_, S[x]);
                    return _;
                })
        });
    }), ba = "sign", Ol = [
        "typed",
        "BigNumber",
        "Fraction",
        "complex"
    ], Il = he(ba, Ol, (e)=>{
        var { typed: r, BigNumber: t, complex: n, Fraction: i } = e;
        return r(ba, {
            number: Mi,
            Complex: function(o) {
                return o.im === 0 ? n(Mi(o.re)) : o.sign();
            },
            BigNumber: function(o) {
                return new t(o.cmp(0));
            },
            bigint: function(o) {
                return o > 0n ? 1n : o < 0n ? -1n : 0n;
            },
            Fraction: function(o) {
                return new i(o.s);
            },
            "Array | Matrix": r.referToSelf((a)=>(o)=>Ur(o, a, !0)),
            Unit: r.referToSelf((a)=>(o)=>{
                    if (!o._isDerived() && o.units[0].unit.offset !== 0) throw new TypeError("sign is ambiguous for units with offset");
                    return r.find(a, o.valueType())(o.value);
                })
        });
    }), Rl = "sqrt", Ll = [
        "config",
        "typed",
        "Complex"
    ], Ul = he(Rl, Ll, (e)=>{
        var { config: r, typed: t, Complex: n } = e;
        return t("sqrt", {
            number: i,
            Complex: function(o) {
                return o.sqrt();
            },
            BigNumber: function(o) {
                return !o.isNegative() || r.predictable ? o.sqrt() : i(o.toNumber());
            },
            Unit: function(o) {
                return o.pow(.5);
            }
        });
        function i(a) {
            return isNaN(a) ? NaN : a >= 0 || r.predictable ? Math.sqrt(a) : new n(a, 0).sqrt();
        }
    }), Ca = "subtract", $l = [
        "typed",
        "matrix",
        "equalScalar",
        "subtractScalar",
        "unaryMinus",
        "DenseMatrix",
        "concat"
    ], ql = he(Ca, $l, (e)=>{
        var { typed: r, matrix: t, equalScalar: n, subtractScalar: i, unaryMinus: a, DenseMatrix: o, concat: u } = e, c = vu({
            typed: r
        }), s = Gt({
            typed: r
        }), l = ml({
            typed: r,
            equalScalar: n
        }), v = du({
            typed: r,
            DenseMatrix: o
        }), h = Ht({
            typed: r,
            DenseMatrix: o
        }), p = St({
            typed: r,
            matrix: t,
            concat: u
        });
        return r(Ca, {
            "any, any": i
        }, p({
            elop: i,
            SS: l,
            DS: c,
            SD: s,
            Ss: h,
            sS: v
        }));
    }), kl = "matAlgo07xSSf", Hl = [
        "typed",
        "SparseMatrix"
    ], sn = he(kl, Hl, (e)=>{
        var { typed: r, SparseMatrix: t } = e;
        return function(a, o, u) {
            var c = a._size, s = a._datatype || a._data === void 0 ? a._datatype : a.getDataType(), l = o._size, v = o._datatype || o._data === void 0 ? o._datatype : o.getDataType();
            if (c.length !== l.length) throw new ke(c.length, l.length);
            if (c[0] !== l[0] || c[1] !== l[1]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + l + ")");
            var h = c[0], p = c[1], g, d = 0, y = u;
            typeof s == "string" && s === v && s !== "mixed" && (g = s, d = r.convert(0, g), y = r.find(u, [
                g,
                g
            ]));
            for(var D = [], b = [], E = new Array(p + 1).fill(0), M = [], F = [], w = [], N = [], S = 0; S < p; S++){
                var _ = S + 1, x = 0;
                n(a, S, w, M, _), n(o, S, N, F, _);
                for(var T = 0; T < h; T++){
                    var z = w[T] === _ ? M[T] : d, q = N[T] === _ ? F[T] : d, $ = y(z, q);
                    $ !== 0 && $ !== !1 && (b.push(T), D.push($), x++);
                }
                E[S + 1] = E[S] + x;
            }
            return new t({
                values: D,
                index: b,
                ptr: E,
                size: [
                    h,
                    p
                ],
                datatype: s === a._datatype && v === o._datatype ? g : void 0
            });
        };
        function n(i, a, o, u, c) {
            for(var s = i._values, l = i._index, v = i._ptr, h = v[a], p = v[a + 1]; h < p; h++){
                var g = l[h];
                o[g] = c, u[g] = s[h];
            }
        }
    }), Sa = "conj", Gl = [
        "typed"
    ], Wl = he(Sa, Gl, (e)=>{
        var { typed: r } = e;
        return r(Sa, {
            "number | BigNumber | Fraction": (t)=>t,
            Complex: (t)=>t.conjugate(),
            "Array | Matrix": r.referToSelf((t)=>(n)=>Ur(n, t))
        });
    }), Ma = "im", Vl = [
        "typed"
    ], Zl = he(Ma, Vl, (e)=>{
        var { typed: r } = e;
        return r(Ma, {
            number: ()=>0,
            "BigNumber | Fraction": (t)=>t.mul(0),
            Complex: (t)=>t.im,
            "Array | Matrix": r.referToSelf((t)=>(n)=>Ur(n, t))
        });
    }), Na = "re", Yl = [
        "typed"
    ], Ql = he(Na, Yl, (e)=>{
        var { typed: r } = e;
        return r(Na, {
            "number | BigNumber | Fraction": (t)=>t,
            Complex: (t)=>t.re,
            "Array | Matrix": r.referToSelf((t)=>(n)=>Ur(n, t))
        });
    }), Ba = "concat", Xl = [
        "typed",
        "matrix",
        "isInteger"
    ], Jl = he(Ba, Xl, (e)=>{
        var { typed: r, matrix: t, isInteger: n } = e;
        return r(Ba, {
            "...Array | Matrix | number | BigNumber": function(a) {
                var o, u = a.length, c = -1, s, l = !1, v = [];
                for(o = 0; o < u; o++){
                    var h = a[o];
                    if (Ke(h) && (l = !0), ir(h) || cr(h)) {
                        if (o !== u - 1) throw new Error("Dimension must be specified as last argument");
                        if (s = c, c = h.valueOf(), !n(c)) throw new TypeError("Integer number expected for dimension");
                        if (c < 0 || o > 0 && c > s) throw new Ct(c, s + 1);
                    } else {
                        var p = We(h).valueOf(), g = Ze(p);
                        if (v[o] = p, s = c, c = g.length - 1, o > 0 && c !== s) throw new ke(s + 1, c + 1);
                    }
                }
                if (v.length === 0) throw new SyntaxError("At least one matrix expected");
                for(var d = v.shift(); v.length;)d = eu(d, v.shift(), c);
                return l ? t(d) : d;
            },
            "...string": function(a) {
                return a.join("");
            }
        });
    }), xa = "column", Kl = [
        "typed",
        "Index",
        "matrix",
        "range"
    ], jl = he(xa, Kl, (e)=>{
        var { typed: r, Index: t, matrix: n, range: i } = e;
        return r(xa, {
            "Matrix, number": a,
            "Array, number": function(u, c) {
                return a(n(We(u)), c).valueOf();
            }
        });
        function a(o, u) {
            if (o.size().length !== 2) throw new Error("Only two dimensional matrix is supported");
            tr(u, o.size()[1]);
            var c = i(0, o.size()[0]), s = new t(c, u), l = o.subset(s);
            return Ke(l) ? l : n([
                [
                    l
                ]
            ]);
        }
    }), Ta = "cross", e0 = [
        "typed",
        "matrix",
        "subtract",
        "multiply"
    ], r0 = he(Ta, e0, (e)=>{
        var { typed: r, matrix: t, subtract: n, multiply: i } = e;
        return r(Ta, {
            "Matrix, Matrix": function(u, c) {
                return t(a(u.toArray(), c.toArray()));
            },
            "Matrix, Array": function(u, c) {
                return t(a(u.toArray(), c));
            },
            "Array, Matrix": function(u, c) {
                return t(a(u, c.toArray()));
            },
            "Array, Array": a
        });
        function a(o, u) {
            var c = Math.max(Ze(o).length, Ze(u).length);
            o = va(o), u = va(u);
            var s = Ze(o), l = Ze(u);
            if (s.length !== 1 || l.length !== 1 || s[0] !== 3 || l[0] !== 3) throw new RangeError("Vectors with length 3 expected (Size A = [" + s.join(", ") + "], B = [" + l.join(", ") + "])");
            var v = [
                n(i(o[1], u[2]), i(o[2], u[1])),
                n(i(o[2], u[0]), i(o[0], u[2])),
                n(i(o[0], u[1]), i(o[1], u[0]))
            ];
            return c > 1 ? [
                v
            ] : v;
        }
    }), Pa = "diag", t0 = [
        "typed",
        "matrix",
        "DenseMatrix",
        "SparseMatrix"
    ], n0 = he(Pa, t0, (e)=>{
        var { typed: r, matrix: t, DenseMatrix: n, SparseMatrix: i } = e;
        return r(Pa, {
            Array: function(s) {
                return a(s, 0, Ze(s), null);
            },
            "Array, number": function(s, l) {
                return a(s, l, Ze(s), null);
            },
            "Array, BigNumber": function(s, l) {
                return a(s, l.toNumber(), Ze(s), null);
            },
            "Array, string": function(s, l) {
                return a(s, 0, Ze(s), l);
            },
            "Array, number, string": function(s, l, v) {
                return a(s, l, Ze(s), v);
            },
            "Array, BigNumber, string": function(s, l, v) {
                return a(s, l.toNumber(), Ze(s), v);
            },
            Matrix: function(s) {
                return a(s, 0, s.size(), s.storage());
            },
            "Matrix, number": function(s, l) {
                return a(s, l, s.size(), s.storage());
            },
            "Matrix, BigNumber": function(s, l) {
                return a(s, l.toNumber(), s.size(), s.storage());
            },
            "Matrix, string": function(s, l) {
                return a(s, 0, s.size(), l);
            },
            "Matrix, number, string": function(s, l, v) {
                return a(s, l, s.size(), v);
            },
            "Matrix, BigNumber, string": function(s, l, v) {
                return a(s, l.toNumber(), s.size(), v);
            }
        });
        function a(c, s, l, v) {
            if (!ar(s)) throw new TypeError("Second parameter in function diag must be an integer");
            var h = s > 0 ? s : 0, p = s < 0 ? -s : 0;
            switch(l.length){
                case 1:
                    return o(c, s, v, l[0], p, h);
                case 2:
                    return u(c, s, v, l, p, h);
            }
            throw new RangeError("Matrix for function diag must be 2 dimensional");
        }
        function o(c, s, l, v, h, p) {
            var g = [
                v + h,
                v + p
            ];
            if (l && l !== "sparse" && l !== "dense") throw new TypeError("Unknown matrix type ".concat(l, '"'));
            var d = l === "sparse" ? i.diagonal(g, c, s) : n.diagonal(g, c, s);
            return l !== null ? d : d.valueOf();
        }
        function u(c, s, l, v, h, p) {
            if (Ke(c)) {
                var g = c.diagonal(s);
                return l !== null ? l !== g.storage() ? t(g, l) : g : g.valueOf();
            }
            for(var d = Math.min(v[0] - h, v[1] - p), y = [], D = 0; D < d; D++)y[D] = c[D + h][D + p];
            return l !== null ? t(y) : y;
        }
    }), za = "flatten", i0 = [
        "typed"
    ], a0 = he(za, i0, (e)=>{
        var { typed: r } = e;
        return r(za, {
            Array: function(n) {
                return Ci(n);
            },
            Matrix: function(n) {
                return n.create(Ci(n.valueOf(), !0), n.datatype());
            }
        });
    }), Oa = "getMatrixDataType", o0 = [
        "typed"
    ], u0 = he(Oa, o0, (e)=>{
        var { typed: r } = e;
        return r(Oa, {
            Array: function(n) {
                return Xn(n, Kr);
            },
            Matrix: function(n) {
                return n.getDataType();
            }
        });
    }), Ia = "identity", s0 = [
        "typed",
        "config",
        "matrix",
        "BigNumber",
        "DenseMatrix",
        "SparseMatrix"
    ], f0 = he(Ia, s0, (e)=>{
        var { typed: r, config: t, matrix: n, BigNumber: i, DenseMatrix: a, SparseMatrix: o } = e;
        return r(Ia, {
            "": function() {
                return t.matrix === "Matrix" ? n([]) : [];
            },
            string: function(l) {
                return n(l);
            },
            "number | BigNumber": function(l) {
                return c(l, l, t.matrix === "Matrix" ? "dense" : void 0);
            },
            "number | BigNumber, string": function(l, v) {
                return c(l, l, v);
            },
            "number | BigNumber, number | BigNumber": function(l, v) {
                return c(l, v, t.matrix === "Matrix" ? "dense" : void 0);
            },
            "number | BigNumber, number | BigNumber, string": function(l, v, h) {
                return c(l, v, h);
            },
            Array: function(l) {
                return u(l);
            },
            "Array, string": function(l, v) {
                return u(l, v);
            },
            Matrix: function(l) {
                return u(l.valueOf(), l.storage());
            },
            "Matrix, string": function(l, v) {
                return u(l.valueOf(), v);
            }
        });
        function u(s, l) {
            switch(s.length){
                case 0:
                    return l ? n(l) : [];
                case 1:
                    return c(s[0], s[0], l);
                case 2:
                    return c(s[0], s[1], l);
                default:
                    throw new Error("Vector containing two values expected");
            }
        }
        function c(s, l, v) {
            var h = cr(s) || cr(l) ? i : null;
            if (cr(s) && (s = s.toNumber()), cr(l) && (l = l.toNumber()), !ar(s) || s < 1) throw new Error("Parameters in function identity must be positive integers");
            if (!ar(l) || l < 1) throw new Error("Parameters in function identity must be positive integers");
            var p = h ? new i(1) : 1, g = h ? new h(0) : 0, d = [
                s,
                l
            ];
            if (v) {
                if (v === "sparse") return o.diagonal(d, p, 0, g);
                if (v === "dense") return a.diagonal(d, p, 0, g);
                throw new TypeError('Unknown matrix type "'.concat(v, '"'));
            }
            for(var y = In([], d, g), D = s < l ? s : l, b = 0; b < D; b++)y[b][b] = p;
            return y;
        }
    }), Ra = "kron", c0 = [
        "typed",
        "matrix",
        "multiplyScalar"
    ], l0 = he(Ra, c0, (e)=>{
        var { typed: r, matrix: t, multiplyScalar: n } = e;
        return r(Ra, {
            "Matrix, Matrix": function(o, u) {
                return t(i(o.toArray(), u.toArray()));
            },
            "Matrix, Array": function(o, u) {
                return t(i(o.toArray(), u));
            },
            "Array, Matrix": function(o, u) {
                return t(i(o, u.toArray()));
            },
            "Array, Array": i
        });
        function i(a, o) {
            if (Ze(a).length === 1 && (a = [
                a
            ]), Ze(o).length === 1 && (o = [
                o
            ]), Ze(a).length > 2 || Ze(o).length > 2) throw new RangeError("Vectors with dimensions greater then 2 are not supported expected (Size x = " + JSON.stringify(a.length) + ", y = " + JSON.stringify(o.length) + ")");
            var u = [], c = [];
            return a.map(function(s) {
                return o.map(function(l) {
                    return c = [], u.push(c), s.map(function(v) {
                        return l.map(function(h) {
                            return c.push(n(v, h));
                        });
                    });
                });
            }) && u;
        }
    });
    function hu() {
        throw new Error('No "bignumber" implementation available');
    }
    function v0() {
        throw new Error('No "fraction" implementation available');
    }
    function pu() {
        throw new Error('No "matrix" implementation available');
    }
    var La = "range", d0 = [
        "typed",
        "config",
        "?matrix",
        "?bignumber",
        "smaller",
        "smallerEq",
        "larger",
        "largerEq",
        "add",
        "isPositive"
    ], h0 = he(La, d0, (e)=>{
        var { typed: r, config: t, matrix: n, bignumber: i, smaller: a, smallerEq: o, larger: u, largerEq: c, add: s, isPositive: l } = e;
        return r(La, {
            string: h,
            "string, boolean": h,
            number: function(y) {
                throw new TypeError("Too few arguments to function range(): ".concat(y));
            },
            boolean: function(y) {
                throw new TypeError("Unexpected type of argument 1 to function range(): ".concat(y, ", number|bigint|BigNumber|Fraction"));
            },
            "number, number": function(y, D) {
                return v(p(y, D, 1, !1));
            },
            "number, number, number": function(y, D, b) {
                return v(p(y, D, b, !1));
            },
            "number, number, boolean": function(y, D, b) {
                return v(p(y, D, 1, b));
            },
            "number, number, number, boolean": function(y, D, b, E) {
                return v(p(y, D, b, E));
            },
            "bigint, bigint|number": function(y, D) {
                return v(p(y, D, 1n, !1));
            },
            "number, bigint": function(y, D) {
                return v(p(BigInt(y), D, 1n, !1));
            },
            "bigint, bigint|number, bigint|number": function(y, D, b) {
                return v(p(y, D, BigInt(b), !1));
            },
            "number, bigint, bigint|number": function(y, D, b) {
                return v(p(BigInt(y), D, BigInt(b), !1));
            },
            "bigint, bigint|number, boolean": function(y, D, b) {
                return v(p(y, D, 1n, b));
            },
            "number, bigint, boolean": function(y, D, b) {
                return v(p(BigInt(y), D, 1n, b));
            },
            "bigint, bigint|number, bigint|number, boolean": function(y, D, b, E) {
                return v(p(y, D, BigInt(b), E));
            },
            "number, bigint, bigint|number, boolean": function(y, D, b, E) {
                return v(p(BigInt(y), D, BigInt(b), E));
            },
            "BigNumber, BigNumber": function(y, D) {
                var b = y.constructor;
                return v(p(y, D, new b(1), !1));
            },
            "BigNumber, BigNumber, BigNumber": function(y, D, b) {
                return v(p(y, D, b, !1));
            },
            "BigNumber, BigNumber, boolean": function(y, D, b) {
                var E = y.constructor;
                return v(p(y, D, new E(1), b));
            },
            "BigNumber, BigNumber, BigNumber, boolean": function(y, D, b, E) {
                return v(p(y, D, b, E));
            },
            "Fraction, Fraction": function(y, D) {
                return v(p(y, D, 1, !1));
            },
            "Fraction, Fraction, Fraction": function(y, D, b) {
                return v(p(y, D, b, !1));
            },
            "Fraction, Fraction, boolean": function(y, D, b) {
                return v(p(y, D, 1, b));
            },
            "Fraction, Fraction, Fraction, boolean": function(y, D, b, E) {
                return v(p(y, D, b, E));
            },
            "Unit, Unit, Unit": function(y, D, b) {
                return v(p(y, D, b, !1));
            },
            "Unit, Unit, Unit, boolean": function(y, D, b, E) {
                return v(p(y, D, b, E));
            }
        });
        function v(d) {
            return t.matrix === "Matrix" ? n ? n(d) : pu() : d;
        }
        function h(d, y) {
            var D = g(d);
            if (!D) throw new SyntaxError('String "' + d + '" is no valid range');
            return t.number === "BigNumber" ? (i === void 0 && hu(), v(p(i(D.start), i(D.end), i(D.step)))) : v(p(D.start, D.end, D.step, y));
        }
        function p(d, y, D, b) {
            for(var E = [], M = l(D) ? b ? o : a : b ? c : u, F = d; M(F, y);)E.push(F), F = s(F, D);
            return E;
        }
        function g(d) {
            var y = d.split(":"), D = y.map(function(E) {
                return Number(E);
            }), b = D.some(function(E) {
                return isNaN(E);
            });
            if (b) return null;
            switch(D.length){
                case 2:
                    return {
                        start: D[0],
                        end: D[1],
                        step: 1
                    };
                case 3:
                    return {
                        start: D[0],
                        end: D[2],
                        step: D[1]
                    };
                default:
                    return null;
            }
        }
    }), Ua = "reshape", p0 = [
        "typed",
        "isInteger",
        "matrix"
    ], m0 = he(Ua, p0, (e)=>{
        var { typed: r, isInteger: t } = e;
        return r(Ua, {
            "Matrix, Array": function(i, a) {
                return i.reshape(a, !0);
            },
            "Array, Array": function(i, a) {
                return a.forEach(function(o) {
                    if (!t(o)) throw new TypeError("Invalid size for dimension: " + o);
                }), Ii(i, a);
            }
        });
    }), $a = "size", g0 = [
        "typed",
        "config",
        "?matrix"
    ], D0 = he($a, g0, (e)=>{
        var { typed: r, config: t, matrix: n } = e;
        return r($a, {
            Matrix: function(a) {
                return a.create(a.size(), "number");
            },
            Array: Ze,
            string: function(a) {
                return t.matrix === "Array" ? [
                    a.length
                ] : n([
                    a.length
                ], "dense", "number");
            },
            "number | Complex | BigNumber | Unit | boolean | null": function(a) {
                return t.matrix === "Array" ? [] : n ? n([], "dense", "number") : pu();
            }
        });
    }), qa = "subset", y0 = [
        "typed",
        "matrix",
        "zeros",
        "add"
    ], w0 = he(qa, y0, (e)=>{
        var { typed: r, matrix: t, zeros: n, add: i } = e;
        return r(qa, {
            "Matrix, Index": function(u, c) {
                return qt(c) ? t() : (On(u, c), u.subset(c));
            },
            "Array, Index": r.referTo("Matrix, Index", function(o) {
                return function(u, c) {
                    var s = o(t(u), c);
                    return c.isScalar() ? s : s.valueOf();
                };
            }),
            "Object, Index": _0,
            "string, Index": E0,
            "Matrix, Index, any, any": function(u, c, s, l) {
                return qt(c) ? u : (On(u, c), u.clone().subset(c, a(s, c), l));
            },
            "Array, Index, any, any": r.referTo("Matrix, Index, any, any", function(o) {
                return function(u, c, s, l) {
                    var v = o(t(u), c, s, l);
                    return v.isMatrix ? v.valueOf() : v;
                };
            }),
            "Array, Index, any": r.referTo("Matrix, Index, any, any", function(o) {
                return function(u, c, s) {
                    return o(t(u), c, s, void 0).valueOf();
                };
            }),
            "Matrix, Index, any": r.referTo("Matrix, Index, any, any", function(o) {
                return function(u, c, s) {
                    return o(u, c, s, void 0);
                };
            }),
            "string, Index, string": ka,
            "string, Index, string, string": ka,
            "Object, Index, any": A0
        });
        function a(o, u) {
            if (typeof o == "string") throw new Error("can't boradcast a string");
            if (u._isScalar) return o;
            var c = u.size();
            if (c.every((s)=>s > 0)) try {
                return i(o, n(c));
            } catch  {
                return o;
            }
            else return o;
        }
    });
    function E0(e, r) {
        if (!Gn(r)) throw new TypeError("Index expected");
        if (qt(r)) return "";
        if (On(Array.from(e), r), r.size().length !== 1) throw new ke(r.size().length, 1);
        var t = e.length;
        tr(r.min()[0], t), tr(r.max()[0], t);
        var n = r.dimension(0), i = "";
        return n.forEach(function(a) {
            i += e.charAt(a);
        }), i;
    }
    function ka(e, r, t, n) {
        if (!r || r.isIndex !== !0) throw new TypeError("Index expected");
        if (qt(r)) return e;
        if (On(Array.from(e), r), r.size().length !== 1) throw new ke(r.size().length, 1);
        if (n !== void 0) {
            if (typeof n != "string" || n.length !== 1) throw new TypeError("Single character expected as defaultValue");
        } else n = " ";
        var i = r.dimension(0), a = i.size()[0];
        if (a !== t.length) throw new ke(i.size()[0], t.length);
        var o = e.length;
        tr(r.min()[0]), tr(r.max()[0]);
        for(var u = [], c = 0; c < o; c++)u[c] = e.charAt(c);
        if (i.forEach(function(v, h) {
            u[v] = t.charAt(h[0]);
        }), u.length > o) for(var s = o - 1, l = u.length; s < l; s++)u[s] || (u[s] = n);
        return u.join("");
    }
    function _0(e, r) {
        if (!qt(r)) {
            if (r.size().length !== 1) throw new ke(r.size(), 1);
            var t = r.dimension(0);
            if (typeof t != "string") throw new TypeError("String expected as index to retrieve an object property");
            return Co(e, t);
        }
    }
    function A0(e, r, t) {
        if (qt(r)) return e;
        if (r.size().length !== 1) throw new ke(r.size(), 1);
        var n = r.dimension(0);
        if (typeof n != "string") throw new TypeError("String expected as index to retrieve an object property");
        var i = We(e);
        return So(i, n, t), i;
    }
    var Ha = "transpose", F0 = [
        "typed",
        "matrix"
    ], b0 = he(Ha, F0, (e)=>{
        var { typed: r, matrix: t } = e;
        return r(Ha, {
            Array: (o)=>n(t(o)).valueOf(),
            Matrix: n,
            any: We
        });
        function n(o) {
            var u = o.size(), c;
            switch(u.length){
                case 1:
                    c = o.clone();
                    break;
                case 2:
                    {
                        var s = u[0], l = u[1];
                        if (l === 0) throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + fr(u) + ")");
                        switch(o.storage()){
                            case "dense":
                                c = i(o, s, l);
                                break;
                            case "sparse":
                                c = a(o, s, l);
                                break;
                        }
                    }
                    break;
                default:
                    throw new RangeError("Matrix must be a vector or two dimensional (size: " + fr(u) + ")");
            }
            return c;
        }
        function i(o, u, c) {
            for(var s = o._data, l = [], v, h = 0; h < c; h++){
                v = l[h] = [];
                for(var p = 0; p < u; p++)v[p] = We(s[p][h]);
            }
            return o.createDenseMatrix({
                data: l,
                size: [
                    c,
                    u
                ],
                datatype: o._datatype
            });
        }
        function a(o, u, c) {
            for(var s = o._values, l = o._index, v = o._ptr, h = s ? [] : void 0, p = [], g = [], d = [], y = 0; y < u; y++)d[y] = 0;
            var D, b, E;
            for(D = 0, b = l.length; D < b; D++)d[l[D]]++;
            for(var M = 0, F = 0; F < u; F++)g.push(M), M += d[F], d[F] = g[F];
            for(g.push(M), E = 0; E < c; E++)for(var w = v[E], N = v[E + 1], S = w; S < N; S++){
                var _ = d[l[S]]++;
                p[_] = E, s && (h[_] = We(s[S]));
            }
            return o.createSparseMatrix({
                values: h,
                index: p,
                ptr: g,
                size: [
                    c,
                    u
                ],
                datatype: o._datatype
            });
        }
    }), Ga = "ctranspose", C0 = [
        "typed",
        "transpose",
        "conj"
    ], S0 = he(Ga, C0, (e)=>{
        var { typed: r, transpose: t, conj: n } = e;
        return r(Ga, {
            any: function(a) {
                return n(t(a));
            }
        });
    }), Wa = "zeros", M0 = [
        "typed",
        "config",
        "matrix",
        "BigNumber"
    ], N0 = he(Wa, M0, (e)=>{
        var { typed: r, config: t, matrix: n, BigNumber: i } = e;
        return r(Wa, {
            "": function() {
                return t.matrix === "Array" ? a([]) : a([], "default");
            },
            "...number | BigNumber | string": function(s) {
                var l = s[s.length - 1];
                if (typeof l == "string") {
                    var v = s.pop();
                    return a(s, v);
                } else return t.matrix === "Array" ? a(s) : a(s, "default");
            },
            Array: a,
            Matrix: function(s) {
                var l = s.storage();
                return a(s.valueOf(), l);
            },
            "Array | Matrix, string": function(s, l) {
                return a(s.valueOf(), l);
            }
        });
        function a(c, s) {
            var l = o(c), v = l ? new i(0) : 0;
            if (u(c), s) {
                var h = n(s);
                return c.length > 0 ? h.resize(c, v) : h;
            } else {
                var p = [];
                return c.length > 0 ? In(p, c, v) : p;
            }
        }
        function o(c) {
            var s = !1;
            return c.forEach(function(l, v, h) {
                cr(l) && (s = !0, h[v] = l.toNumber());
            }), s;
        }
        function u(c) {
            c.forEach(function(s) {
                if (typeof s != "number" || !ar(s) || s < 0) throw new Error("Parameters in function zeros must be positive integers");
            });
        }
    }), B0 = "numeric", x0 = [
        "number",
        "?bignumber",
        "?fraction"
    ], T0 = he(B0, x0, (e)=>{
        var { number: r, bignumber: t, fraction: n } = e, i = {
            string: !0,
            number: !0,
            BigNumber: !0,
            Fraction: !0
        }, a = {
            number: (o)=>r(o),
            BigNumber: t ? (o)=>t(o) : hu,
            bigint: (o)=>BigInt(o),
            Fraction: n ? (o)=>n(o) : v0
        };
        return function(u) {
            var c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", s = arguments.length > 2 ? arguments[2] : void 0;
            if (s !== void 0) throw new SyntaxError("numeric() takes one or two arguments");
            var l = Kr(u);
            if (!(l in i)) throw new TypeError("Cannot convert " + u + ' of type "' + l + '"; valid input types are ' + Object.keys(i).join(", "));
            if (!(c in a)) throw new TypeError("Cannot convert " + u + ' to type "' + c + '"; valid output types are ' + Object.keys(a).join(", "));
            return c === l ? u : a[c](u);
        };
    }), Va = "divideScalar", P0 = [
        "typed",
        "numeric"
    ], z0 = he(Va, P0, (e)=>{
        var { typed: r, numeric: t } = e;
        return r(Va, {
            "number, number": function(i, a) {
                return i / a;
            },
            "Complex, Complex": function(i, a) {
                return i.div(a);
            },
            "BigNumber, BigNumber": function(i, a) {
                return i.div(a);
            },
            "bigint, bigint": function(i, a) {
                return i / a;
            },
            "Fraction, Fraction": function(i, a) {
                return i.div(a);
            },
            "Unit, number | Complex | Fraction | BigNumber | Unit": (n, i)=>n.divide(i),
            "number | Fraction | Complex | BigNumber, Unit": (n, i)=>i.divideInto(n)
        });
    }), Za = "pow", O0 = [
        "typed",
        "config",
        "identity",
        "multiply",
        "matrix",
        "inv",
        "fraction",
        "number",
        "Complex"
    ], I0 = he(Za, O0, (e)=>{
        var { typed: r, config: t, identity: n, multiply: i, matrix: a, inv: o, number: u, fraction: c, Complex: s } = e;
        return r(Za, {
            "number, number": l,
            "Complex, Complex": function(g, d) {
                return g.pow(d);
            },
            "BigNumber, BigNumber": function(g, d) {
                return d.isInteger() || g >= 0 || t.predictable ? g.pow(d) : new s(g.toNumber(), 0).pow(d.toNumber(), 0);
            },
            "bigint, bigint": (p, g)=>p ** g,
            "Fraction, Fraction": function(g, d) {
                var y = g.pow(d);
                if (y != null) return y;
                if (t.predictable) throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
                return l(g.valueOf(), d.valueOf());
            },
            "Array, number": v,
            "Array, BigNumber": function(g, d) {
                return v(g, d.toNumber());
            },
            "Matrix, number": h,
            "Matrix, BigNumber": function(g, d) {
                return h(g, d.toNumber());
            },
            "Unit, number | BigNumber": function(g, d) {
                return g.pow(d);
            }
        });
        function l(p, g) {
            if (t.predictable && !ar(g) && p < 0) try {
                var d = c(g), y = u(d);
                if ((g === y || Math.abs((g - y) / g) < 1e-14) && d.d % 2n === 1n) return (d.n % 2n === 0n ? 1 : -1) * Math.pow(-p, g);
            } catch  {}
            return t.predictable && (p < -1 && g === 1 / 0 || p > -1 && p < 0 && g === -1 / 0) ? NaN : ar(g) || p >= 0 || t.predictable ? fu(p, g) : p * p < 1 && g === 1 / 0 || p * p > 1 && g === -1 / 0 ? 0 : new s(p, 0).pow(g, 0);
        }
        function v(p, g) {
            if (!ar(g)) throw new TypeError("For A^b, b must be an integer (value is " + g + ")");
            var d = Ze(p);
            if (d.length !== 2) throw new Error("For A^b, A must be 2 dimensional (A has " + d.length + " dimensions)");
            if (d[0] !== d[1]) throw new Error("For A^b, A must be square (size is " + d[0] + "x" + d[1] + ")");
            if (g < 0) try {
                return v(o(p), -g);
            } catch (b) {
                throw b.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + g + ")") : b;
            }
            for(var y = n(d[0]).valueOf(), D = p; g >= 1;)(g & 1) === 1 && (y = i(D, y)), g >>= 1, D = i(D, D);
            return y;
        }
        function h(p, g) {
            return a(v(p.valueOf(), g));
        }
    });
    function Kn(e) {
        var { DenseMatrix: r } = e;
        return function(n, i, a) {
            var o = n.size();
            if (o.length !== 2) throw new RangeError("Matrix must be two dimensional (size: " + fr(o) + ")");
            var u = o[0], c = o[1];
            if (u !== c) throw new RangeError("Matrix must be square (size: " + fr(o) + ")");
            var s = [];
            if (Ke(i)) {
                var l = i.size(), v = i._data;
                if (l.length === 1) {
                    if (l[0] !== u) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
                    for(var h = 0; h < u; h++)s[h] = [
                        v[h]
                    ];
                    return new r({
                        data: s,
                        size: [
                            u,
                            1
                        ],
                        datatype: i._datatype
                    });
                }
                if (l.length === 2) {
                    if (l[0] !== u || l[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
                    if (No(i)) {
                        if (a) {
                            s = [];
                            for(var p = 0; p < u; p++)s[p] = [
                                v[p][0]
                            ];
                            return new r({
                                data: s,
                                size: [
                                    u,
                                    1
                                ],
                                datatype: i._datatype
                            });
                        }
                        return i;
                    }
                    if (Bo(i)) {
                        for(var g = 0; g < u; g++)s[g] = [
                            0
                        ];
                        for(var d = i._values, y = i._index, D = i._ptr, b = D[1], E = D[0]; E < b; E++){
                            var M = y[E];
                            s[M][0] = d[E];
                        }
                        return new r({
                            data: s,
                            size: [
                                u,
                                1
                            ],
                            datatype: i._datatype
                        });
                    }
                }
                throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
            }
            if (nr(i)) {
                var F = Ze(i);
                if (F.length === 1) {
                    if (F[0] !== u) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
                    for(var w = 0; w < u; w++)s[w] = [
                        i[w]
                    ];
                    return new r({
                        data: s,
                        size: [
                            u,
                            1
                        ]
                    });
                }
                if (F.length === 2) {
                    if (F[0] !== u || F[1] !== 1) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
                    for(var N = 0; N < u; N++)s[N] = [
                        i[N][0]
                    ];
                    return new r({
                        data: s,
                        size: [
                            u,
                            1
                        ]
                    });
                }
                throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
            }
        };
    }
    var Ya = "lsolve", R0 = [
        "typed",
        "matrix",
        "divideScalar",
        "multiplyScalar",
        "subtractScalar",
        "equalScalar",
        "DenseMatrix"
    ], L0 = he(Ya, R0, (e)=>{
        var { typed: r, matrix: t, divideScalar: n, multiplyScalar: i, subtractScalar: a, equalScalar: o, DenseMatrix: u } = e, c = Kn({
            DenseMatrix: u
        });
        return r(Ya, {
            "SparseMatrix, Array | Matrix": function(h, p) {
                return l(h, p);
            },
            "DenseMatrix, Array | Matrix": function(h, p) {
                return s(h, p);
            },
            "Array, Array | Matrix": function(h, p) {
                var g = t(h), d = s(g, p);
                return d.valueOf();
            }
        });
        function s(v, h) {
            h = c(v, h, !0);
            for(var p = h._data, g = v._size[0], d = v._size[1], y = [], D = v._data, b = 0; b < d; b++){
                var E = p[b][0] || 0, M = void 0;
                if (o(E, 0)) M = 0;
                else {
                    var F = D[b][b];
                    if (o(F, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
                    M = n(E, F);
                    for(var w = b + 1; w < g; w++)p[w] = [
                        a(p[w][0] || 0, i(M, D[w][b]))
                    ];
                }
                y[b] = [
                    M
                ];
            }
            return new u({
                data: y,
                size: [
                    g,
                    1
                ]
            });
        }
        function l(v, h) {
            h = c(v, h, !0);
            for(var p = h._data, g = v._size[0], d = v._size[1], y = v._values, D = v._index, b = v._ptr, E = [], M = 0; M < d; M++){
                var F = p[M][0] || 0;
                if (o(F, 0)) E[M] = [
                    0
                ];
                else {
                    for(var w = 0, N = [], S = [], _ = b[M], x = b[M + 1], T = _; T < x; T++){
                        var z = D[T];
                        z === M ? w = y[T] : z > M && (N.push(y[T]), S.push(z));
                    }
                    if (o(w, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
                    for(var q = n(F, w), $ = 0, k = S.length; $ < k; $++){
                        var L = S[$];
                        p[L] = [
                            a(p[L][0] || 0, i(q, N[$]))
                        ];
                    }
                    E[M] = [
                        q
                    ];
                }
            }
            return new u({
                data: E,
                size: [
                    g,
                    1
                ]
            });
        }
    }), Qa = "usolve", U0 = [
        "typed",
        "matrix",
        "divideScalar",
        "multiplyScalar",
        "subtractScalar",
        "equalScalar",
        "DenseMatrix"
    ], $0 = he(Qa, U0, (e)=>{
        var { typed: r, matrix: t, divideScalar: n, multiplyScalar: i, subtractScalar: a, equalScalar: o, DenseMatrix: u } = e, c = Kn({
            DenseMatrix: u
        });
        return r(Qa, {
            "SparseMatrix, Array | Matrix": function(h, p) {
                return l(h, p);
            },
            "DenseMatrix, Array | Matrix": function(h, p) {
                return s(h, p);
            },
            "Array, Array | Matrix": function(h, p) {
                var g = t(h), d = s(g, p);
                return d.valueOf();
            }
        });
        function s(v, h) {
            h = c(v, h, !0);
            for(var p = h._data, g = v._size[0], d = v._size[1], y = [], D = v._data, b = d - 1; b >= 0; b--){
                var E = p[b][0] || 0, M = void 0;
                if (o(E, 0)) M = 0;
                else {
                    var F = D[b][b];
                    if (o(F, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
                    M = n(E, F);
                    for(var w = b - 1; w >= 0; w--)p[w] = [
                        a(p[w][0] || 0, i(M, D[w][b]))
                    ];
                }
                y[b] = [
                    M
                ];
            }
            return new u({
                data: y,
                size: [
                    g,
                    1
                ]
            });
        }
        function l(v, h) {
            h = c(v, h, !0);
            for(var p = h._data, g = v._size[0], d = v._size[1], y = v._values, D = v._index, b = v._ptr, E = [], M = d - 1; M >= 0; M--){
                var F = p[M][0] || 0;
                if (o(F, 0)) E[M] = [
                    0
                ];
                else {
                    for(var w = 0, N = [], S = [], _ = b[M], x = b[M + 1], T = x - 1; T >= _; T--){
                        var z = D[T];
                        z === M ? w = y[T] : z < M && (N.push(y[T]), S.push(z));
                    }
                    if (o(w, 0)) throw new Error("Linear system cannot be solved since matrix is singular");
                    for(var q = n(F, w), $ = 0, k = S.length; $ < k; $++){
                        var L = S[$];
                        p[L] = [
                            a(p[L][0], i(q, N[$]))
                        ];
                    }
                    E[M] = [
                        q
                    ];
                }
            }
            return new u({
                data: E,
                size: [
                    g,
                    1
                ]
            });
        }
    }), Xa = "usolveAll", q0 = [
        "typed",
        "matrix",
        "divideScalar",
        "multiplyScalar",
        "subtractScalar",
        "equalScalar",
        "DenseMatrix"
    ], k0 = he(Xa, q0, (e)=>{
        var { typed: r, matrix: t, divideScalar: n, multiplyScalar: i, subtractScalar: a, equalScalar: o, DenseMatrix: u } = e, c = Kn({
            DenseMatrix: u
        });
        return r(Xa, {
            "SparseMatrix, Array | Matrix": function(h, p) {
                return l(h, p);
            },
            "DenseMatrix, Array | Matrix": function(h, p) {
                return s(h, p);
            },
            "Array, Array | Matrix": function(h, p) {
                var g = t(h), d = s(g, p);
                return d.map((y)=>y.valueOf());
            }
        });
        function s(v, h) {
            for(var p = [
                c(v, h, !0)._data.map((S)=>S[0])
            ], g = v._data, d = v._size[0], y = v._size[1], D = y - 1; D >= 0; D--)for(var b = p.length, E = 0; E < b; E++){
                var M = p[E];
                if (o(g[D][D], 0)) if (o(M[D], 0)) {
                    if (E === 0) {
                        var w = [
                            ...M
                        ];
                        w[D] = 1;
                        for(var N = D - 1; N >= 0; N--)w[N] = a(w[N], g[N][D]);
                        p.push(w);
                    }
                } else {
                    if (E === 0) return [];
                    p.splice(E, 1), E -= 1, b -= 1;
                }
                else {
                    M[D] = n(M[D], g[D][D]);
                    for(var F = D - 1; F >= 0; F--)M[F] = a(M[F], i(M[D], g[F][D]));
                }
            }
            return p.map((S)=>new u({
                    data: S.map((_)=>[
                            _
                        ]),
                    size: [
                        d,
                        1
                    ]
                }));
        }
        function l(v, h) {
            for(var p = [
                c(v, h, !0)._data.map((te)=>te[0])
            ], g = v._size[0], d = v._size[1], y = v._values, D = v._index, b = v._ptr, E = d - 1; E >= 0; E--)for(var M = p.length, F = 0; F < M; F++){
                for(var w = p[F], N = [], S = [], _ = b[E], x = b[E + 1], T = 0, z = x - 1; z >= _; z--){
                    var q = D[z];
                    q === E ? T = y[z] : q < E && (N.push(y[z]), S.push(q));
                }
                if (o(T, 0)) if (o(w[E], 0)) {
                    if (F === 0) {
                        var G = [
                            ...w
                        ];
                        G[E] = 1;
                        for(var R = 0, I = S.length; R < I; R++){
                            var Z = S[R];
                            G[Z] = a(G[Z], N[R]);
                        }
                        p.push(G);
                    }
                } else {
                    if (F === 0) return [];
                    p.splice(F, 1), F -= 1, M -= 1;
                }
                else {
                    w[E] = n(w[E], T);
                    for(var $ = 0, k = S.length; $ < k; $++){
                        var L = S[$];
                        w[L] = a(w[L], i(w[E], N[$]));
                    }
                }
            }
            return p.map((te)=>new u({
                    data: te.map((Q)=>[
                            Q
                        ]),
                    size: [
                        g,
                        1
                    ]
                }));
        }
    }), Un = "equal", H0 = [
        "typed",
        "matrix",
        "equalScalar",
        "DenseMatrix",
        "concat",
        "SparseMatrix"
    ], G0 = he(Un, H0, (e)=>{
        var { typed: r, matrix: t, equalScalar: n, DenseMatrix: i, concat: a, SparseMatrix: o } = e, u = Gt({
            typed: r
        }), c = sn({
            typed: r,
            SparseMatrix: o
        }), s = Ht({
            typed: r,
            DenseMatrix: i
        }), l = St({
            typed: r,
            matrix: t,
            concat: a
        });
        return r(Un, W0({
            typed: r,
            equalScalar: n
        }), l({
            elop: n,
            SS: c,
            DS: u,
            Ss: s
        }));
    }), W0 = he(Un, [
        "typed",
        "equalScalar"
    ], (e)=>{
        var { typed: r, equalScalar: t } = e;
        return r(Un, {
            "any, any": function(i, a) {
                return i === null ? a === null : a === null ? i === null : i === void 0 ? a === void 0 : a === void 0 ? i === void 0 : t(i, a);
            }
        });
    }), $n = "smaller", V0 = [
        "typed",
        "config",
        "bignumber",
        "matrix",
        "DenseMatrix",
        "concat",
        "SparseMatrix"
    ], Z0 = he($n, V0, (e)=>{
        var { typed: r, config: t, bignumber: n, matrix: i, DenseMatrix: a, concat: o, SparseMatrix: u } = e, c = Gt({
            typed: r
        }), s = sn({
            typed: r,
            SparseMatrix: u
        }), l = Ht({
            typed: r,
            DenseMatrix: a
        }), v = St({
            typed: r,
            matrix: i,
            concat: o
        }), h = un({
            typed: r
        });
        function p(g, d) {
            return g.lt(d) && !kt(g, d, t.relTol, t.absTol);
        }
        return r($n, Y0({
            typed: r,
            config: t
        }), {
            "boolean, boolean": (g, d)=>g < d,
            "BigNumber, BigNumber": p,
            "bigint, bigint": (g, d)=>g < d,
            "Fraction, Fraction": (g, d)=>g.compare(d) === -1,
            "Fraction, BigNumber": function(d, y) {
                return p(n(d), y);
            },
            "BigNumber, Fraction": function(d, y) {
                return p(d, n(y));
            },
            "Complex, Complex": function(d, y) {
                throw new TypeError("No ordering relation is defined for complex numbers");
            }
        }, h, v({
            SS: s,
            DS: c,
            Ss: l
        }));
    }), Y0 = he($n, [
        "typed",
        "config"
    ], (e)=>{
        var { typed: r, config: t } = e;
        return r($n, {
            "number, number": function(i, a) {
                return i < a && !ft(i, a, t.relTol, t.absTol);
            }
        });
    }), qn = "smallerEq", Q0 = [
        "typed",
        "config",
        "matrix",
        "DenseMatrix",
        "concat",
        "SparseMatrix"
    ], X0 = he(qn, Q0, (e)=>{
        var { typed: r, config: t, matrix: n, DenseMatrix: i, concat: a, SparseMatrix: o } = e, u = Gt({
            typed: r
        }), c = sn({
            typed: r,
            SparseMatrix: o
        }), s = Ht({
            typed: r,
            DenseMatrix: i
        }), l = St({
            typed: r,
            matrix: n,
            concat: a
        }), v = un({
            typed: r
        });
        return r(qn, J0({
            typed: r,
            config: t
        }), {
            "boolean, boolean": (h, p)=>h <= p,
            "BigNumber, BigNumber": function(p, g) {
                return p.lte(g) || kt(p, g, t.relTol, t.absTol);
            },
            "bigint, bigint": (h, p)=>h <= p,
            "Fraction, Fraction": (h, p)=>h.compare(p) !== 1,
            "Complex, Complex": function() {
                throw new TypeError("No ordering relation is defined for complex numbers");
            }
        }, v, l({
            SS: c,
            DS: u,
            Ss: s
        }));
    }), J0 = he(qn, [
        "typed",
        "config"
    ], (e)=>{
        var { typed: r, config: t } = e;
        return r(qn, {
            "number, number": function(i, a) {
                return i <= a || ft(i, a, t.relTol, t.absTol);
            }
        });
    }), kn = "larger", K0 = [
        "typed",
        "config",
        "bignumber",
        "matrix",
        "DenseMatrix",
        "concat",
        "SparseMatrix"
    ], j0 = he(kn, K0, (e)=>{
        var { typed: r, config: t, bignumber: n, matrix: i, DenseMatrix: a, concat: o, SparseMatrix: u } = e, c = Gt({
            typed: r
        }), s = sn({
            typed: r,
            SparseMatrix: u
        }), l = Ht({
            typed: r,
            DenseMatrix: a
        }), v = St({
            typed: r,
            matrix: i,
            concat: o
        }), h = un({
            typed: r
        });
        function p(g, d) {
            return g.gt(d) && !kt(g, d, t.relTol, t.absTol);
        }
        return r(kn, ev({
            typed: r,
            config: t
        }), {
            "boolean, boolean": (g, d)=>g > d,
            "BigNumber, BigNumber": p,
            "bigint, bigint": (g, d)=>g > d,
            "Fraction, Fraction": (g, d)=>g.compare(d) === 1,
            "Fraction, BigNumber": function(d, y) {
                return p(n(d), y);
            },
            "BigNumber, Fraction": function(d, y) {
                return p(d, n(y));
            },
            "Complex, Complex": function() {
                throw new TypeError("No ordering relation is defined for complex numbers");
            }
        }, h, v({
            SS: s,
            DS: c,
            Ss: l
        }));
    }), ev = he(kn, [
        "typed",
        "config"
    ], (e)=>{
        var { typed: r, config: t } = e;
        return r(kn, {
            "number, number": function(i, a) {
                return i > a && !ft(i, a, t.relTol, t.absTol);
            }
        });
    }), Hn = "largerEq", rv = [
        "typed",
        "config",
        "matrix",
        "DenseMatrix",
        "concat",
        "SparseMatrix"
    ], tv = he(Hn, rv, (e)=>{
        var { typed: r, config: t, matrix: n, DenseMatrix: i, concat: a, SparseMatrix: o } = e, u = Gt({
            typed: r
        }), c = sn({
            typed: r,
            SparseMatrix: o
        }), s = Ht({
            typed: r,
            DenseMatrix: i
        }), l = St({
            typed: r,
            matrix: n,
            concat: a
        }), v = un({
            typed: r
        });
        return r(Hn, nv({
            typed: r,
            config: t
        }), {
            "boolean, boolean": (h, p)=>h >= p,
            "BigNumber, BigNumber": function(p, g) {
                return p.gte(g) || kt(p, g, t.relTol, t.absTol);
            },
            "bigint, bigint": function(p, g) {
                return p >= g;
            },
            "Fraction, Fraction": (h, p)=>h.compare(p) !== -1,
            "Complex, Complex": function() {
                throw new TypeError("No ordering relation is defined for complex numbers");
            }
        }, v, l({
            SS: c,
            DS: u,
            Ss: s
        }));
    }), nv = he(Hn, [
        "typed",
        "config"
    ], (e)=>{
        var { typed: r, config: t } = e;
        return r(Hn, {
            "number, number": function(i, a) {
                return i >= a || ft(i, a, t.relTol, t.absTol);
            }
        });
    }), iv = "ImmutableDenseMatrix", av = [
        "smaller",
        "DenseMatrix"
    ], ov = he(iv, av, (e)=>{
        var { smaller: r, DenseMatrix: t } = e;
        function n(i, a) {
            if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
            if (a && !Wr(a)) throw new Error("Invalid datatype: " + a);
            if (Ke(i) || nr(i)) {
                var o = new t(i, a);
                this._data = o._data, this._size = o._size, this._datatype = o._datatype, this._min = null, this._max = null;
            } else if (i && nr(i.data) && nr(i.size)) this._data = i.data, this._size = i.size, this._datatype = i.datatype, this._min = typeof i.min < "u" ? i.min : null, this._max = typeof i.max < "u" ? i.max : null;
            else {
                if (i) throw new TypeError("Unsupported type of data (" + Kr(i) + ")");
                this._data = [], this._size = [
                    0
                ], this._datatype = a, this._min = null, this._max = null;
            }
        }
        return n.prototype = new t, n.prototype.type = "ImmutableDenseMatrix", n.prototype.isImmutableDenseMatrix = !0, n.prototype.subset = function(i) {
            switch(arguments.length){
                case 1:
                    {
                        var a = t.prototype.subset.call(this, i);
                        return Ke(a) ? new n({
                            data: a._data,
                            size: a._size,
                            datatype: a._datatype
                        }) : a;
                    }
                case 2:
                case 3:
                    throw new Error("Cannot invoke set subset on an Immutable Matrix instance");
                default:
                    throw new SyntaxError("Wrong number of arguments");
            }
        }, n.prototype.set = function() {
            throw new Error("Cannot invoke set on an Immutable Matrix instance");
        }, n.prototype.resize = function() {
            throw new Error("Cannot invoke resize on an Immutable Matrix instance");
        }, n.prototype.reshape = function() {
            throw new Error("Cannot invoke reshape on an Immutable Matrix instance");
        }, n.prototype.clone = function() {
            return new n({
                data: We(this._data),
                size: We(this._size),
                datatype: this._datatype
            });
        }, n.prototype.toJSON = function() {
            return {
                mathjs: "ImmutableDenseMatrix",
                data: this._data,
                size: this._size,
                datatype: this._datatype
            };
        }, n.fromJSON = function(i) {
            return new n(i);
        }, n.prototype.swapRows = function() {
            throw new Error("Cannot invoke swapRows on an Immutable Matrix instance");
        }, n.prototype.min = function() {
            if (this._min === null) {
                var i = null;
                this.forEach(function(a) {
                    (i === null || r(a, i)) && (i = a);
                }), this._min = i !== null ? i : void 0;
            }
            return this._min;
        }, n.prototype.max = function() {
            if (this._max === null) {
                var i = null;
                this.forEach(function(a) {
                    (i === null || r(i, a)) && (i = a);
                }), this._max = i !== null ? i : void 0;
            }
            return this._max;
        }, n;
    }, {
        isClass: !0
    }), uv = "Index", sv = [
        "ImmutableDenseMatrix",
        "getMatrixDataType"
    ], fv = he(uv, sv, (e)=>{
        var { ImmutableDenseMatrix: r, getMatrixDataType: t } = e;
        function n(a) {
            if (!(this instanceof n)) throw new SyntaxError("Constructor must be called with the new operator");
            this._dimensions = [], this._sourceSize = [], this._isScalar = !0;
            for(var o = 0, u = arguments.length; o < u; o++){
                var c = arguments[o], s = nr(c), l = Ke(c), v = typeof c, h = null;
                if (xo(c)) this._dimensions.push(c), this._isScalar = !1;
                else if (s || l) {
                    var p = void 0;
                    t(c) === "boolean" ? (s && (p = i(Ja(c).valueOf())), l && (p = i(Ja(c._data).valueOf())), h = c.valueOf().length) : p = i(c.valueOf()), this._dimensions.push(p);
                    var g = p.size();
                    (g.length !== 1 || g[0] !== 1 || h !== null) && (this._isScalar = !1);
                } else if (v === "number") this._dimensions.push(i([
                    c
                ]));
                else if (v === "bigint") this._dimensions.push(i([
                    Number(c)
                ]));
                else if (v === "string") this._dimensions.push(c);
                else throw new TypeError("Dimension must be an Array, Matrix, number, bigint, string, or Range");
                this._sourceSize.push(h);
            }
        }
        n.prototype.type = "Index", n.prototype.isIndex = !0;
        function i(a) {
            for(var o = 0, u = a.length; o < u; o++)if (typeof a[o] != "number" || !ar(a[o])) throw new TypeError("Index parameters must be positive integer numbers");
            return new r(a);
        }
        return n.prototype.clone = function() {
            var a = new n;
            return a._dimensions = We(this._dimensions), a._isScalar = this._isScalar, a._sourceSize = this._sourceSize, a;
        }, n.create = function(a) {
            var o = new n;
            return n.apply(o, a), o;
        }, n.prototype.size = function() {
            for(var a = [], o = 0, u = this._dimensions.length; o < u; o++){
                var c = this._dimensions[o];
                a[o] = typeof c == "string" ? 1 : c.size()[0];
            }
            return a;
        }, n.prototype.max = function() {
            for(var a = [], o = 0, u = this._dimensions.length; o < u; o++){
                var c = this._dimensions[o];
                a[o] = typeof c == "string" ? c : c.max();
            }
            return a;
        }, n.prototype.min = function() {
            for(var a = [], o = 0, u = this._dimensions.length; o < u; o++){
                var c = this._dimensions[o];
                a[o] = typeof c == "string" ? c : c.min();
            }
            return a;
        }, n.prototype.forEach = function(a) {
            for(var o = 0, u = this._dimensions.length; o < u; o++)a(this._dimensions[o], o, this);
        }, n.prototype.dimension = function(a) {
            return typeof a != "number" ? null : this._dimensions[a] || null;
        }, n.prototype.isObjectProperty = function() {
            return this._dimensions.length === 1 && typeof this._dimensions[0] == "string";
        }, n.prototype.getObjectProperty = function() {
            return this.isObjectProperty() ? this._dimensions[0] : null;
        }, n.prototype.isScalar = function() {
            return this._isScalar;
        }, n.prototype.toArray = function() {
            for(var a = [], o = 0, u = this._dimensions.length; o < u; o++){
                var c = this._dimensions[o];
                a.push(typeof c == "string" ? c : c.toArray());
            }
            return a;
        }, n.prototype.valueOf = n.prototype.toArray, n.prototype.toString = function() {
            for(var a = [], o = 0, u = this._dimensions.length; o < u; o++){
                var c = this._dimensions[o];
                typeof c == "string" ? a.push(JSON.stringify(c)) : a.push(c.toString());
            }
            return "[" + a.join(", ") + "]";
        }, n.prototype.toJSON = function() {
            return {
                mathjs: "Index",
                dimensions: this._dimensions
            };
        }, n.fromJSON = function(a) {
            return n.create(a.dimensions);
        }, n;
    }, {
        isClass: !0
    });
    function Ja(e) {
        var r = [];
        return e.forEach((t, n)=>{
            t && r.push(n);
        }), r;
    }
    var cv = "FibonacciHeap", lv = [
        "smaller",
        "larger"
    ], vv = he(cv, lv, (e)=>{
        var { smaller: r, larger: t } = e, n = 1 / Math.log((1 + Math.sqrt(5)) / 2);
        function i() {
            if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator");
            this._minimum = null, this._size = 0;
        }
        i.prototype.type = "FibonacciHeap", i.prototype.isFibonacciHeap = !0, i.prototype.insert = function(l, v) {
            var h = {
                key: l,
                value: v,
                degree: 0
            };
            if (this._minimum) {
                var p = this._minimum;
                h.left = p, h.right = p.right, p.right = h, h.right.left = h, r(l, p.key) && (this._minimum = h);
            } else h.left = h, h.right = h, this._minimum = h;
            return this._size++, h;
        }, i.prototype.size = function() {
            return this._size;
        }, i.prototype.clear = function() {
            this._minimum = null, this._size = 0;
        }, i.prototype.isEmpty = function() {
            return this._size === 0;
        }, i.prototype.extractMinimum = function() {
            var l = this._minimum;
            if (l === null) return l;
            for(var v = this._minimum, h = l.degree, p = l.child; h > 0;){
                var g = p.right;
                p.left.right = p.right, p.right.left = p.left, p.left = v, p.right = v.right, v.right = p, p.right.left = p, p.parent = null, p = g, h--;
            }
            return l.left.right = l.right, l.right.left = l.left, l === l.right ? v = null : (v = l.right, v = s(v, this._size)), this._size--, this._minimum = v, l;
        }, i.prototype.remove = function(l) {
            this._minimum = a(this._minimum, l, -1), this.extractMinimum();
        };
        function a(l, v, h) {
            v.key = h;
            var p = v.parent;
            return p && r(v.key, p.key) && (o(l, v, p), u(l, p)), r(v.key, l.key) && (l = v), l;
        }
        function o(l, v, h) {
            v.left.right = v.right, v.right.left = v.left, h.degree--, h.child === v && (h.child = v.right), h.degree === 0 && (h.child = null), v.left = l, v.right = l.right, l.right = v, v.right.left = v, v.parent = null, v.mark = !1;
        }
        function u(l, v) {
            var h = v.parent;
            h && (v.mark ? (o(l, v, h), u(h)) : v.mark = !0);
        }
        var c = function(v, h) {
            v.left.right = v.right, v.right.left = v.left, v.parent = h, h.child ? (v.left = h.child, v.right = h.child.right, h.child.right = v, v.right.left = v) : (h.child = v, v.right = v, v.left = v), h.degree++, v.mark = !1;
        };
        function s(l, v) {
            var h = Math.floor(Math.log(v) * n) + 1, p = new Array(h), g = 0, d = l;
            if (d) for(g++, d = d.right; d !== l;)g++, d = d.right;
            for(var y; g > 0;){
                for(var D = d.degree, b = d.right; y = p[D], !!y;){
                    if (t(d.key, y.key)) {
                        var E = y;
                        y = d, d = E;
                    }
                    c(y, d), p[D] = null, D++;
                }
                p[D] = d, d = b, g--;
            }
            l = null;
            for(var M = 0; M < h; M++)y = p[M], y && (l ? (y.left.right = y.right, y.right.left = y.left, y.left = l, y.right = l.right, l.right = y, y.right.left = y, r(y.key, l.key) && (l = y)) : l = y);
            return l;
        }
        return i;
    }, {
        isClass: !0
    }), dv = "Spa", hv = [
        "addScalar",
        "equalScalar",
        "FibonacciHeap"
    ], pv = he(dv, hv, (e)=>{
        var { addScalar: r, equalScalar: t, FibonacciHeap: n } = e;
        function i() {
            if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator");
            this._values = [], this._heap = new n;
        }
        return i.prototype.type = "Spa", i.prototype.isSpa = !0, i.prototype.set = function(a, o) {
            if (this._values[a]) this._values[a].value = o;
            else {
                var u = this._heap.insert(a, o);
                this._values[a] = u;
            }
        }, i.prototype.get = function(a) {
            var o = this._values[a];
            return o ? o.value : 0;
        }, i.prototype.accumulate = function(a, o) {
            var u = this._values[a];
            u ? u.value = r(u.value, o) : (u = this._heap.insert(a, o), this._values[a] = u);
        }, i.prototype.forEach = function(a, o, u) {
            var c = this._heap, s = this._values, l = [], v = c.extractMinimum();
            for(v && l.push(v); v && v.key <= o;)v.key >= a && (t(v.value, 0) || u(v.key, v.value, this)), v = c.extractMinimum(), v && l.push(v);
            for(var h = 0; h < l.length; h++){
                var p = l[h];
                v = c.insert(p.key, p.value), s[v.key] = v;
            }
        }, i.prototype.swap = function(a, o) {
            var u = this._values[a], c = this._values[o];
            if (!u && c) u = this._heap.insert(a, c.value), this._heap.remove(c), this._values[a] = u, this._values[o] = void 0;
            else if (u && !c) c = this._heap.insert(o, u.value), this._heap.remove(u), this._values[o] = c, this._values[a] = void 0;
            else if (u && c) {
                var s = u.value;
                u.value = c.value, c.value = s;
            }
        }, i;
    }, {
        isClass: !0
    }), Ka = "sparse", mv = [
        "typed",
        "SparseMatrix"
    ], gv = he(Ka, mv, (e)=>{
        var { typed: r, SparseMatrix: t } = e;
        return r(Ka, {
            "": function() {
                return new t([]);
            },
            string: function(i) {
                return new t([], i);
            },
            "Array | Matrix": function(i) {
                return new t(i);
            },
            "Array | Matrix, string": function(i, a) {
                return new t(i, a);
            }
        });
    }), Dv = "atan", yv = [
        "typed"
    ], wv = he(Dv, yv, (e)=>{
        var { typed: r } = e;
        return r("atan", {
            number: function(n) {
                return Math.atan(n);
            },
            Complex: function(n) {
                return n.atan();
            },
            BigNumber: function(n) {
                return n.atan();
            }
        });
    }), mu = he("trigUnit", [
        "typed"
    ], (e)=>{
        var { typed: r } = e;
        return {
            Unit: r.referToSelf((t)=>(n)=>{
                    if (!n.hasBase(n.constructor.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cot is no angle");
                    return r.find(t, n.valueType())(n.value);
                })
        };
    }), ja = "cos", Ev = [
        "typed"
    ], _v = he(ja, Ev, (e)=>{
        var { typed: r } = e, t = mu({
            typed: r
        });
        return r(ja, {
            number: Math.cos,
            "Complex | BigNumber": (n)=>n.cos()
        }, t);
    }), eo = "sin", Av = [
        "typed"
    ], Fv = he(eo, Av, (e)=>{
        var { typed: r } = e, t = mu({
            typed: r
        });
        return r(eo, {
            number: Math.sin,
            "Complex | BigNumber": (n)=>n.sin()
        }, t);
    }), ro = "add", bv = [
        "typed",
        "matrix",
        "addScalar",
        "equalScalar",
        "DenseMatrix",
        "SparseMatrix",
        "concat"
    ], Cv = he(ro, bv, (e)=>{
        var { typed: r, matrix: t, addScalar: n, equalScalar: i, DenseMatrix: a, SparseMatrix: o, concat: u } = e, c = vu({
            typed: r
        }), s = Sl({
            typed: r,
            equalScalar: i
        }), l = du({
            typed: r,
            DenseMatrix: a
        }), v = St({
            typed: r,
            matrix: t,
            concat: u
        });
        return r(ro, {
            "any, any": n,
            "any, any, ...any": r.referToSelf((h)=>(p, g, d)=>{
                    for(var y = h(p, g), D = 0; D < d.length; D++)y = h(y, d[D]);
                    return y;
                })
        }, v({
            elop: n,
            DS: c,
            SS: s,
            Ss: l
        }));
    }), to = "norm", Sv = [
        "typed",
        "abs",
        "add",
        "pow",
        "conj",
        "sqrt",
        "multiply",
        "equalScalar",
        "larger",
        "smaller",
        "matrix",
        "ctranspose",
        "eigs"
    ], Mv = he(to, Sv, (e)=>{
        var { typed: r, abs: t, add: n, pow: i, conj: a, sqrt: o, multiply: u, equalScalar: c, larger: s, smaller: l, matrix: v, ctranspose: h, eigs: p } = e;
        return r(to, {
            number: Math.abs,
            Complex: function(S) {
                return S.abs();
            },
            BigNumber: function(S) {
                return S.abs();
            },
            boolean: function(S) {
                return Math.abs(S);
            },
            Array: function(S) {
                return w(v(S), 2);
            },
            Matrix: function(S) {
                return w(S, 2);
            },
            "Array, number | BigNumber | string": function(S, _) {
                return w(v(S), _);
            },
            "Matrix, number | BigNumber | string": function(S, _) {
                return w(S, _);
            }
        });
        function g(N) {
            var S = 0;
            return N.forEach(function(_) {
                var x = t(_);
                s(x, S) && (S = x);
            }, !0), S;
        }
        function d(N) {
            var S;
            return N.forEach(function(_) {
                var x = t(_);
                (!S || l(x, S)) && (S = x);
            }, !0), S || 0;
        }
        function y(N, S) {
            if (S === Number.POSITIVE_INFINITY || S === "inf") return g(N);
            if (S === Number.NEGATIVE_INFINITY || S === "-inf") return d(N);
            if (S === "fro") return w(N, 2);
            if (typeof S == "number" && !isNaN(S)) {
                if (!c(S, 0)) {
                    var _ = 0;
                    return N.forEach(function(x) {
                        _ = n(i(t(x), S), _);
                    }, !0), i(_, 1 / S);
                }
                return Number.POSITIVE_INFINITY;
            }
            throw new Error("Unsupported parameter value");
        }
        function D(N) {
            var S = 0;
            return N.forEach(function(_, x) {
                S = n(S, u(_, a(_)));
            }), t(o(S));
        }
        function b(N) {
            var S = [], _ = 0;
            return N.forEach(function(x, T) {
                var z = T[1], q = n(S[z] || 0, t(x));
                s(q, _) && (_ = q), S[z] = q;
            }, !0), _;
        }
        function E(N) {
            var S = N.size();
            if (S[0] !== S[1]) throw new RangeError("Invalid matrix dimensions");
            var _ = h(N), x = u(_, N), T = p(x).values.toArray(), z = T[T.length - 1];
            return t(o(z));
        }
        function M(N) {
            var S = [], _ = 0;
            return N.forEach(function(x, T) {
                var z = T[0], q = n(S[z] || 0, t(x));
                s(q, _) && (_ = q), S[z] = q;
            }, !0), _;
        }
        function F(N, S) {
            if (S === 1) return b(N);
            if (S === Number.POSITIVE_INFINITY || S === "inf") return M(N);
            if (S === "fro") return D(N);
            if (S === 2) return E(N);
            throw new Error("Unsupported parameter value " + S);
        }
        function w(N, S) {
            var _ = N.size();
            if (_.length === 1) return y(N, S);
            if (_.length === 2) {
                if (_[0] && _[1]) return F(N, S);
                throw new RangeError("Invalid matrix dimensions");
            }
        }
    }), no = "dot", Nv = [
        "typed",
        "addScalar",
        "multiplyScalar",
        "conj",
        "size"
    ], Bv = he(no, Nv, (e)=>{
        var { typed: r, addScalar: t, multiplyScalar: n, conj: i, size: a } = e;
        return r(no, {
            "Array | DenseMatrix, Array | DenseMatrix": u,
            "SparseMatrix, SparseMatrix": c
        });
        function o(l, v) {
            var h = s(l), p = s(v), g, d;
            if (h.length === 1) g = h[0];
            else if (h.length === 2 && h[1] === 1) g = h[0];
            else throw new RangeError("Expected a column vector, instead got a matrix of size (" + h.join(", ") + ")");
            if (p.length === 1) d = p[0];
            else if (p.length === 2 && p[1] === 1) d = p[0];
            else throw new RangeError("Expected a column vector, instead got a matrix of size (" + p.join(", ") + ")");
            if (g !== d) throw new RangeError("Vectors must have equal length (" + g + " != " + d + ")");
            if (g === 0) throw new RangeError("Cannot calculate the dot product of empty vectors");
            return g;
        }
        function u(l, v) {
            var h = o(l, v), p = Ke(l) ? l._data : l, g = Ke(l) ? l._datatype || l.getDataType() : void 0, d = Ke(v) ? v._data : v, y = Ke(v) ? v._datatype || v.getDataType() : void 0, D = s(l).length === 2, b = s(v).length === 2, E = t, M = n;
            if (g && y && g === y && typeof g == "string" && g !== "mixed") {
                var F = g;
                E = r.find(t, [
                    F,
                    F
                ]), M = r.find(n, [
                    F,
                    F
                ]);
            }
            if (!D && !b) {
                for(var w = M(i(p[0]), d[0]), N = 1; N < h; N++)w = E(w, M(i(p[N]), d[N]));
                return w;
            }
            if (!D && b) {
                for(var S = M(i(p[0]), d[0][0]), _ = 1; _ < h; _++)S = E(S, M(i(p[_]), d[_][0]));
                return S;
            }
            if (D && !b) {
                for(var x = M(i(p[0][0]), d[0]), T = 1; T < h; T++)x = E(x, M(i(p[T][0]), d[T]));
                return x;
            }
            if (D && b) {
                for(var z = M(i(p[0][0]), d[0][0]), q = 1; q < h; q++)z = E(z, M(i(p[q][0]), d[q][0]));
                return z;
            }
        }
        function c(l, v) {
            o(l, v);
            for(var h = l._index, p = l._values, g = v._index, d = v._values, y = 0, D = t, b = n, E = 0, M = 0; E < h.length && M < g.length;){
                var F = h[E], w = g[M];
                if (F < w) {
                    E++;
                    continue;
                }
                if (F > w) {
                    M++;
                    continue;
                }
                F === w && (y = D(y, b(p[E], d[M])), E++, M++);
            }
            return y;
        }
        function s(l) {
            return Ke(l) ? l.size() : a(l);
        }
    }), io = "index", xv = [
        "typed",
        "Index"
    ], Tv = he(io, xv, (e)=>{
        var { typed: r, Index: t } = e;
        return r(io, {
            "...number | string | BigNumber | Range | Array | Matrix": function(i) {
                var a = i.map(function(u) {
                    return cr(u) ? u.toNumber() : nr(u) || Ke(u) ? u.map(function(c) {
                        return cr(c) ? c.toNumber() : c;
                    }) : u;
                }), o = new t;
                return t.apply(o, a), o;
            }
        });
    }), ao = "lup", Pv = [
        "typed",
        "matrix",
        "abs",
        "addScalar",
        "divideScalar",
        "multiplyScalar",
        "subtractScalar",
        "larger",
        "equalScalar",
        "unaryMinus",
        "DenseMatrix",
        "SparseMatrix",
        "Spa"
    ], zv = he(ao, Pv, (e)=>{
        var { typed: r, matrix: t, abs: n, addScalar: i, divideScalar: a, multiplyScalar: o, subtractScalar: u, larger: c, equalScalar: s, unaryMinus: l, DenseMatrix: v, SparseMatrix: h, Spa: p } = e;
        return r(ao, {
            DenseMatrix: function(D) {
                return g(D);
            },
            SparseMatrix: function(D) {
                return d(D);
            },
            Array: function(D) {
                var b = t(D), E = g(b);
                return {
                    L: E.L.valueOf(),
                    U: E.U.valueOf(),
                    p: E.p
                };
            }
        });
        function g(y) {
            var D = y._size[0], b = y._size[1], E = Math.min(D, b), M = We(y._data), F = [], w = [
                D,
                E
            ], N = [], S = [
                E,
                b
            ], _, x, T, z = [];
            for(_ = 0; _ < D; _++)z[_] = _;
            for(x = 0; x < b; x++){
                if (x > 0) for(_ = 0; _ < D; _++){
                    var q = Math.min(_, x), $ = 0;
                    for(T = 0; T < q; T++)$ = i($, o(M[_][T], M[T][x]));
                    M[_][x] = u(M[_][x], $);
                }
                var k = x, L = 0, G = 0;
                for(_ = x; _ < D; _++){
                    var R = M[_][x], I = n(R);
                    c(I, L) && (k = _, L = I, G = R);
                }
                if (x !== k && (z[x] = [
                    z[k],
                    z[k] = z[x]
                ][0], v._swapRows(x, k, M)), x < D) for(_ = x + 1; _ < D; _++){
                    var Z = M[_][x];
                    s(Z, 0) || (M[_][x] = a(M[_][x], G));
                }
            }
            for(x = 0; x < b; x++)for(_ = 0; _ < D; _++){
                if (x === 0 && (_ < b && (N[_] = []), F[_] = []), _ < x) {
                    _ < b && (N[_][x] = M[_][x]), x < D && (F[_][x] = 0);
                    continue;
                }
                if (_ === x) {
                    _ < b && (N[_][x] = M[_][x]), x < D && (F[_][x] = 1);
                    continue;
                }
                _ < b && (N[_][x] = 0), x < D && (F[_][x] = M[_][x]);
            }
            var te = new v({
                data: F,
                size: w
            }), Q = new v({
                data: N,
                size: S
            }), H = [];
            for(_ = 0, E = z.length; _ < E; _++)H[z[_]] = _;
            return {
                L: te,
                U: Q,
                p: H,
                toString: function() {
                    return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
                }
            };
        }
        function d(y) {
            var D = y._size[0], b = y._size[1], E = Math.min(D, b), M = y._values, F = y._index, w = y._ptr, N = [], S = [], _ = [], x = [
                D,
                E
            ], T = [], z = [], q = [], $ = [
                E,
                b
            ], k, L, G, R = [], I = [];
            for(k = 0; k < D; k++)R[k] = k, I[k] = k;
            var Z = function(H, Y) {
                var re = I[H], j = I[Y];
                R[re] = Y, R[j] = H, I[H] = j, I[Y] = re;
            }, te = function() {
                var H = new p;
                L < D && (_.push(N.length), N.push(1), S.push(L)), q.push(T.length);
                var Y = w[L], re = w[L + 1];
                for(G = Y; G < re; G++)k = F[G], H.set(R[k], M[G]);
                L > 0 && H.forEach(0, L - 1, function(fe, ae) {
                    h._forEachRow(fe, N, S, _, function(pe, le) {
                        pe > fe && H.accumulate(pe, l(o(le, ae)));
                    });
                });
                var j = L, X = H.get(L), K = n(X);
                H.forEach(L + 1, D - 1, function(fe, ae) {
                    var pe = n(ae);
                    c(pe, K) && (j = fe, K = pe, X = ae);
                }), L !== j && (h._swapRows(L, j, x[1], N, S, _), h._swapRows(L, j, $[1], T, z, q), H.swap(L, j), Z(L, j)), H.forEach(0, D - 1, function(fe, ae) {
                    fe <= L ? (T.push(ae), z.push(fe)) : (ae = a(ae, X), s(ae, 0) || (N.push(ae), S.push(fe)));
                });
            };
            for(L = 0; L < b; L++)te();
            return q.push(T.length), _.push(N.length), {
                L: new h({
                    values: N,
                    index: S,
                    ptr: _,
                    size: x
                }),
                U: new h({
                    values: T,
                    index: z,
                    ptr: q,
                    size: $
                }),
                p: R,
                toString: function() {
                    return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
                }
            };
        }
    }), oo = "qr", Ov = [
        "typed",
        "matrix",
        "zeros",
        "identity",
        "isZero",
        "equal",
        "sign",
        "sqrt",
        "conj",
        "unaryMinus",
        "addScalar",
        "divideScalar",
        "multiplyScalar",
        "subtractScalar",
        "complex"
    ], Iv = he(oo, Ov, (e)=>{
        var { typed: r, matrix: t, zeros: n, identity: i, isZero: a, equal: o, sign: u, sqrt: c, conj: s, unaryMinus: l, addScalar: v, divideScalar: h, multiplyScalar: p, subtractScalar: g, complex: d } = e;
        return Lt(r(oo, {
            DenseMatrix: function(M) {
                return D(M);
            },
            SparseMatrix: function(M) {
                return b();
            },
            Array: function(M) {
                var F = t(M), w = D(F);
                return {
                    Q: w.Q.valueOf(),
                    R: w.R.valueOf()
                };
            }
        }), {
            _denseQRimpl: y
        });
        function y(E) {
            var M = E._size[0], F = E._size[1], w = i([
                M
            ], "dense"), N = w._data, S = E.clone(), _ = S._data, x, T, z, q = n([
                M
            ], "");
            for(z = 0; z < Math.min(F, M); ++z){
                var $ = _[z][z], k = l(o($, 0) ? 1 : u($)), L = s(k), G = 0;
                for(x = z; x < M; x++)G = v(G, p(_[x][z], s(_[x][z])));
                var R = p(k, c(G));
                if (!a(R)) {
                    var I = g($, R);
                    for(q[z] = 1, x = z + 1; x < M; x++)q[x] = h(_[x][z], I);
                    var Z = l(s(h(I, R))), te = void 0;
                    for(T = z; T < F; T++){
                        for(te = 0, x = z; x < M; x++)te = v(te, p(s(q[x]), _[x][T]));
                        for(te = p(te, Z), x = z; x < M; x++)_[x][T] = p(g(_[x][T], p(q[x], te)), L);
                    }
                    for(x = 0; x < M; x++){
                        for(te = 0, T = z; T < M; T++)te = v(te, p(N[x][T], q[T]));
                        for(te = p(te, Z), T = z; T < M; ++T)N[x][T] = h(g(N[x][T], p(te, s(q[T]))), L);
                    }
                }
            }
            return {
                Q: w,
                R: S,
                toString: function() {
                    return "Q: " + this.Q.toString() + `
R: ` + this.R.toString();
                }
            };
        }
        function D(E) {
            var M = y(E), F = M.R._data;
            if (E._data.length > 0) for(var w = F[0][0].type === "Complex" ? d(0) : 0, N = 0; N < F.length; ++N)for(var S = 0; S < N && S < (F[0] || []).length; ++S)F[N][S] = w;
            return M;
        }
        function b(E) {
            throw new Error("qr not implemented for sparse matrices yet");
        }
    });
    function Rv(e, r, t, n) {
        e._values;
        for(var i = e._index, a = e._ptr, o = e._size, u = e._datatype, c = o[0], s = o[1], l = null, v = [], h = [], p = 0, g = 0; g < s; g++){
            h[g] = p;
            for(var d = t ? t[g] : g, y = a[d], D = a[d + 1], b = y; b < D; b++){
                var E = i[b];
                v[p] = E, p++;
            }
        }
        return h[s] = p, e.createSparseMatrix({
            values: l,
            index: v,
            ptr: h,
            size: [
                c,
                s
            ],
            datatype: u
        });
    }
    function gu(e, r, t, n, i, a, o) {
        var u = 0;
        for(t[o] = e; u >= 0;){
            var c = t[o + u], s = t[n + c];
            s === -1 ? (u--, a[r++] = c) : (t[n + c] = t[i + s], ++u, t[o + u] = s);
        }
        return r;
    }
    function Lv(e, r) {
        if (!e) return null;
        var t = 0, n, i = [], a = [], o = 0, u = r, c = 2 * r;
        for(n = 0; n < r; n++)a[o + n] = -1;
        for(n = r - 1; n >= 0; n--)e[n] !== -1 && (a[u + n] = a[o + e[n]], a[o + e[n]] = n);
        for(n = 0; n < r; n++)e[n] === -1 && (t = gu(n, t, a, o, u, i, c));
        return i;
    }
    function Uv(e, r) {
        if (!e) return null;
        var t = e._index, n = e._ptr, i = e._size, a = i[0], o = i[1], u = [], c = [], s = 0, l = o, v, h;
        for(v = 0; v < a; v++)c[l + v] = -1;
        for(var p = 0; p < o; p++){
            u[p] = -1, c[s + p] = -1;
            for(var g = n[p], d = n[p + 1], y = g; y < d; y++){
                var D = t[y];
                for(v = c[l + D]; v !== -1 && v < p; v = h)h = c[s + v], c[s + v] = p, h === -1 && (u[v] = p);
                c[l + D] = p;
            }
        }
        return u;
    }
    function $v(e, r, t) {
        for(var n = e._values, i = e._index, a = e._ptr, o = e._size, u = o[1], c = 0, s = 0; s < u; s++){
            var l = a[s];
            for(a[s] = c; l < a[s + 1]; l++)r(i[l], s, n ? n[l] : 1, t) && (i[c] = i[l], n && (n[c] = n[l]), c++);
        }
        return a[u] = c, i.splice(c, i.length - c), n && n.splice(c, n.length - c), c;
    }
    function gt(e) {
        return -e - 2;
    }
    var qv = "csAmd", kv = [
        "add",
        "multiply",
        "transpose"
    ], Hv = he(qv, kv, (e)=>{
        var { add: r, multiply: t, transpose: n } = e;
        return function(l, v) {
            if (!v || l <= 0 || l > 3) return null;
            var h = v._size, p = h[0], g = h[1], d = 0, y = Math.max(16, 10 * Math.sqrt(g));
            y = Math.min(g - 2, y);
            var D = i(l, v, p, g, y);
            $v(D, c, null);
            for(var b = D._index, E = D._ptr, M = E[g], F = [], w = [], N = 0, S = g + 1, _ = 2 * (g + 1), x = 3 * (g + 1), T = 4 * (g + 1), z = 5 * (g + 1), q = 6 * (g + 1), $ = 7 * (g + 1), k = F, L = a(g, E, w, N, x, k, _, $, S, q, T, z), G = o(g, E, w, z, T, q, y, S, x, k, _), R = 0, I, Z, te, Q, H, Y, re, j, X, K, fe, ae, pe, le, ye, De; G < g;){
                for(te = -1; R < g && (te = w[x + R]) === -1; R++);
                w[_ + te] !== -1 && (k[w[_ + te]] = -1), w[x + R] = w[_ + te];
                var Fe = w[T + te], be = w[S + te];
                G += be;
                var Me = 0;
                w[S + te] = -be;
                var Ee = E[te], ze = Fe === 0 ? Ee : M, Be = ze;
                for(Q = 1; Q <= Fe + 1; Q++){
                    for(Q > Fe ? (Y = te, re = Ee, j = w[N + te] - Fe) : (Y = b[Ee++], re = E[Y], j = w[N + Y]), H = 1; H <= j; H++)I = b[re++], !((X = w[S + I]) <= 0) && (Me += X, w[S + I] = -X, b[Be++] = I, w[_ + I] !== -1 && (k[w[_ + I]] = k[I]), k[I] !== -1 ? w[_ + k[I]] = w[_ + I] : w[x + w[z + I]] = w[_ + I]);
                    Y !== te && (E[Y] = gt(te), w[q + Y] = 0);
                }
                for(Fe !== 0 && (M = Be), w[z + te] = Me, E[te] = ze, w[N + te] = Be - ze, w[T + te] = -2, L = u(L, d, w, q, g), K = ze; K < Be; K++)if (I = b[K], !((fe = w[T + I]) <= 0)) {
                    X = -w[S + I];
                    var Ie = L - X;
                    for(Ee = E[I], ae = E[I] + fe - 1; Ee <= ae; Ee++)Y = b[Ee], w[q + Y] >= L ? w[q + Y] -= X : w[q + Y] !== 0 && (w[q + Y] = w[z + Y] + Ie);
                }
                for(K = ze; K < Be; K++){
                    for(I = b[K], ae = E[I], pe = ae + w[T + I] - 1, le = ae, ye = 0, De = 0, Ee = ae; Ee <= pe; Ee++)if (Y = b[Ee], w[q + Y] !== 0) {
                        var er = w[q + Y] - L;
                        er > 0 ? (De += er, b[le++] = Y, ye += Y) : (E[Y] = gt(te), w[q + Y] = 0);
                    }
                    w[T + I] = le - ae + 1;
                    var P = le, U = ae + w[N + I];
                    for(Ee = pe + 1; Ee < U; Ee++){
                        Z = b[Ee];
                        var W = w[S + Z];
                        W <= 0 || (De += W, b[le++] = Z, ye += Z);
                    }
                    De === 0 ? (E[I] = gt(te), X = -w[S + I], Me -= X, be += X, G += X, w[S + I] = 0, w[T + I] = -1) : (w[z + I] = Math.min(w[z + I], De), b[le] = b[P], b[P] = b[ae], b[ae] = te, w[N + I] = le - ae + 1, ye = (ye < 0 ? -ye : ye) % g, w[_ + I] = w[$ + ye], w[$ + ye] = I, k[I] = ye);
                }
                for(w[z + te] = Me, d = Math.max(d, Me), L = u(L + d, d, w, q, g), K = ze; K < Be; K++)if (I = b[K], !(w[S + I] >= 0)) for(ye = k[I], I = w[$ + ye], w[$ + ye] = -1; I !== -1 && w[_ + I] !== -1; I = w[_ + I], L++){
                    for(j = w[N + I], fe = w[T + I], Ee = E[I] + 1; Ee <= E[I] + j - 1; Ee++)w[q + b[Ee]] = L;
                    var ee = I;
                    for(Z = w[_ + I]; Z !== -1;){
                        var ce = w[N + Z] === j && w[T + Z] === fe;
                        for(Ee = E[Z] + 1; ce && Ee <= E[Z] + j - 1; Ee++)w[q + b[Ee]] !== L && (ce = 0);
                        ce ? (E[Z] = gt(I), w[S + I] += w[S + Z], w[S + Z] = 0, w[T + Z] = -1, Z = w[_ + Z], w[_ + ee] = Z) : (ee = Z, Z = w[_ + Z]);
                    }
                }
                for(Ee = ze, K = ze; K < Be; K++)I = b[K], !((X = -w[S + I]) <= 0) && (w[S + I] = X, De = w[z + I] + Me - X, De = Math.min(De, g - G - X), w[x + De] !== -1 && (k[w[x + De]] = I), w[_ + I] = w[x + De], k[I] = -1, w[x + De] = I, R = Math.min(R, De), w[z + I] = De, b[Ee++] = I);
                w[S + te] = be, (w[N + te] = Ee - ze) === 0 && (E[te] = -1, w[q + te] = 0), Fe !== 0 && (M = Ee);
            }
            for(I = 0; I < g; I++)E[I] = gt(E[I]);
            for(Z = 0; Z <= g; Z++)w[x + Z] = -1;
            for(Z = g; Z >= 0; Z--)w[S + Z] > 0 || (w[_ + Z] = w[x + E[Z]], w[x + E[Z]] = Z);
            for(Y = g; Y >= 0; Y--)w[S + Y] <= 0 || E[Y] !== -1 && (w[_ + Y] = w[x + E[Y]], w[x + E[Y]] = Y);
            for(te = 0, I = 0; I <= g; I++)E[I] === -1 && (te = gu(I, te, w, x, _, F, q));
            return F.splice(F.length - 1, 1), F;
        };
        function i(s, l, v, h, p) {
            var g = n(l);
            if (s === 1 && h === v) return r(l, g);
            if (s === 2) {
                for(var d = g._index, y = g._ptr, D = 0, b = 0; b < v; b++){
                    var E = y[b];
                    if (y[b] = D, !(y[b + 1] - E > p)) for(var M = y[b + 1]; E < M; E++)d[D++] = d[E];
                }
                return y[v] = D, l = n(g), t(g, l);
            }
            return t(g, l);
        }
        function a(s, l, v, h, p, g, d, y, D, b, E, M) {
            for(var F = 0; F < s; F++)v[h + F] = l[F + 1] - l[F];
            v[h + s] = 0;
            for(var w = 0; w <= s; w++)v[p + w] = -1, g[w] = -1, v[d + w] = -1, v[y + w] = -1, v[D + w] = 1, v[b + w] = 1, v[E + w] = 0, v[M + w] = v[h + w];
            var N = u(0, 0, v, b, s);
            return v[E + s] = -2, l[s] = -1, v[b + s] = 0, N;
        }
        function o(s, l, v, h, p, g, d, y, D, b, E) {
            for(var M = 0, F = 0; F < s; F++){
                var w = v[h + F];
                if (w === 0) v[p + F] = -2, M++, l[F] = -1, v[g + F] = 0;
                else if (w > d) v[y + F] = 0, v[p + F] = -1, M++, l[F] = gt(s), v[y + s]++;
                else {
                    var N = v[D + w];
                    N !== -1 && (b[N] = F), v[E + F] = v[D + w], v[D + w] = F;
                }
            }
            return M;
        }
        function u(s, l, v, h, p) {
            if (s < 2 || s + l < 0) {
                for(var g = 0; g < p; g++)v[h + g] !== 0 && (v[h + g] = 1);
                s = 2;
            }
            return s;
        }
        function c(s, l) {
            return s !== l;
        }
    });
    function Gv(e, r, t, n, i, a, o) {
        var u, c, s = 0, l;
        if (e <= r || t[n + r] <= t[i + e]) return -1;
        t[i + e] = t[n + r];
        var v = t[a + e];
        if (t[a + e] = r, v === -1) s = 1, l = e;
        else {
            for(s = 2, l = v; l !== t[o + l]; l = t[o + l]);
            for(u = v; u !== l; u = c)c = t[o + u], t[o + u] = l;
        }
        return {
            jleaf: s,
            q: l
        };
    }
    var Wv = "csCounts", Vv = [
        "transpose"
    ], Zv = he(Wv, Vv, (e)=>{
        var { transpose: r } = e;
        return function(t, n, i, a) {
            if (!t || !n || !i) return null;
            var o = t._size, u = o[0], c = o[1], s, l, v, h, p, g, d, y = 4 * c + (a ? c + u + 1 : 0), D = [], b = 0, E = c, M = 2 * c, F = 3 * c, w = 4 * c, N = 5 * c + 1;
            for(v = 0; v < y; v++)D[v] = -1;
            var S = [], _ = r(t), x = _._index, T = _._ptr;
            for(v = 0; v < c; v++)for(l = i[v], S[l] = D[F + l] === -1 ? 1 : 0; l !== -1 && D[F + l] === -1; l = n[l])D[F + l] = v;
            if (a) {
                for(v = 0; v < c; v++)D[i[v]] = v;
                for(s = 0; s < u; s++){
                    for(v = c, g = T[s], d = T[s + 1], p = g; p < d; p++)v = Math.min(v, D[x[p]]);
                    D[N + s] = D[w + v], D[w + v] = s;
                }
            }
            for(s = 0; s < c; s++)D[b + s] = s;
            for(v = 0; v < c; v++){
                for(l = i[v], n[l] !== -1 && S[n[l]]--, h = a ? D[w + v] : l; h !== -1; h = a ? D[N + h] : -1)for(p = T[h]; p < T[h + 1]; p++){
                    s = x[p];
                    var z = Gv(s, l, D, F, E, M, b);
                    z.jleaf >= 1 && S[l]++, z.jleaf === 2 && S[z.q]--;
                }
                n[l] !== -1 && (D[b + l] = n[l]);
            }
            for(l = 0; l < c; l++)n[l] !== -1 && (S[n[l]] += S[l]);
            return S;
        };
    }), Yv = "csSqr", Qv = [
        "add",
        "multiply",
        "transpose"
    ], Xv = he(Yv, Qv, (e)=>{
        var { add: r, multiply: t, transpose: n } = e, i = Hv({
            add: r,
            multiply: t,
            transpose: n
        }), a = Zv({
            transpose: n
        });
        return function(c, s, l) {
            var v = s._ptr, h = s._size, p = h[1], g, d = {};
            if (d.q = i(c, s), c && !d.q) return null;
            if (l) {
                var y = c ? Rv(s, null, d.q) : s;
                d.parent = Uv(y);
                var D = Lv(d.parent, p);
                if (d.cp = a(y, d.parent, D, 1), y && d.parent && d.cp && o(y, d)) for(d.unz = 0, g = 0; g < p; g++)d.unz += d.cp[g];
            } else d.unz = 4 * v[p] + p, d.lnz = d.unz;
            return d;
        };
        function o(u, c) {
            var s = u._ptr, l = u._index, v = u._size, h = v[0], p = v[1];
            c.pinv = [], c.leftmost = [];
            var g = c.parent, d = c.pinv, y = c.leftmost, D = [], b = 0, E = h, M = h + p, F = h + 2 * p, w, N, S, _, x;
            for(N = 0; N < p; N++)D[E + N] = -1, D[M + N] = -1, D[F + N] = 0;
            for(w = 0; w < h; w++)y[w] = -1;
            for(N = p - 1; N >= 0; N--)for(_ = s[N], x = s[N + 1], S = _; S < x; S++)y[l[S]] = N;
            for(w = h - 1; w >= 0; w--)d[w] = -1, N = y[w], N !== -1 && (D[F + N]++ === 0 && (D[M + N] = w), D[b + w] = D[E + N], D[E + N] = w);
            for(c.lnz = 0, c.m2 = h, N = 0; N < p; N++)if (w = D[E + N], c.lnz++, w < 0 && (w = c.m2++), d[w] = N, !(--F[N] <= 0)) {
                c.lnz += D[F + N];
                var T = g[N];
                T !== -1 && (D[F + T] === 0 && (D[M + T] = D[M + N]), D[b + D[M + N]] = D[E + T], D[E + T] = D[b + w], D[F + T] += D[F + N]);
            }
            for(w = 0; w < h; w++)d[w] < 0 && (d[w] = N++);
            return !0;
        }
    });
    function Ni(e, r) {
        return e[r] < 0;
    }
    function Du(e, r) {
        e[r] = gt(e[r]);
    }
    function uo(e) {
        return e < 0 ? gt(e) : e;
    }
    function Jv(e, r, t, n, i) {
        var a = r._index, o = r._ptr, u = r._size, c = u[1], s, l, v, h = 0;
        for(n[0] = e; h >= 0;){
            e = n[h];
            var p = i ? i[e] : e;
            Ni(o, e) || (Du(o, e), n[c + h] = p < 0 ? 0 : uo(o[p]));
            var g = 1;
            for(l = n[c + h], v = p < 0 ? 0 : uo(o[p + 1]); l < v; l++)if (s = a[l], !Ni(o, s)) {
                n[c + h] = l, n[++h] = s, g = 0;
                break;
            }
            g && (h--, n[--t] = e);
        }
        return t;
    }
    function Kv(e, r, t, n, i) {
        var a = e._ptr, o = e._size, u = r._index, c = r._ptr, s = o[1], l, v, h, p = s;
        for(v = c[t], h = c[t + 1], l = v; l < h; l++){
            var g = u[l];
            Ni(a, g) || (p = Jv(g, e, p, n, i));
        }
        for(l = p; l < s; l++)Du(a, n[l]);
        return p;
    }
    var jv = "csSpsolve", ed = [
        "divideScalar",
        "multiply",
        "subtract"
    ], rd = he(jv, ed, (e)=>{
        var { divideScalar: r, multiply: t, subtract: n } = e;
        return function(a, o, u, c, s, l, v) {
            var h = a._values, p = a._index, g = a._ptr, d = a._size, y = d[1], D = o._values, b = o._index, E = o._ptr, M, F, w, N, S = Kv(a, o, u, c, l);
            for(M = S; M < y; M++)s[c[M]] = 0;
            for(F = E[u], w = E[u + 1], M = F; M < w; M++)s[b[M]] = D[M];
            for(var _ = S; _ < y; _++){
                var x = c[_], T = l ? l[x] : x;
                if (!(T < 0)) for(F = g[T], w = g[T + 1], s[x] = r(s[x], h[v ? F : w - 1]), M = v ? F + 1 : F, N = v ? w : w - 1; M < N; M++){
                    var z = p[M];
                    s[z] = n(s[z], t(h[M], s[x]));
                }
            }
            return S;
        };
    }), td = "csLu", nd = [
        "abs",
        "divideScalar",
        "multiply",
        "subtract",
        "larger",
        "largerEq",
        "SparseMatrix"
    ], id = he(td, nd, (e)=>{
        var { abs: r, divideScalar: t, multiply: n, subtract: i, larger: a, largerEq: o, SparseMatrix: u } = e, c = rd({
            divideScalar: t,
            multiply: n,
            subtract: i
        });
        return function(l, v, h) {
            if (!l) return null;
            var p = l._size, g = p[1], d, y = 100, D = 100;
            v && (d = v.q, y = v.lnz || y, D = v.unz || D);
            var b = [], E = [], M = [], F = new u({
                values: b,
                index: E,
                ptr: M,
                size: [
                    g,
                    g
                ]
            }), w = [], N = [], S = [], _ = new u({
                values: w,
                index: N,
                ptr: S,
                size: [
                    g,
                    g
                ]
            }), x = [], T, z, q = [], $ = [];
            for(T = 0; T < g; T++)q[T] = 0, x[T] = -1, M[T + 1] = 0;
            y = 0, D = 0;
            for(var k = 0; k < g; k++){
                M[k] = y, S[k] = D;
                var L = d ? d[k] : k, G = c(F, l, L, $, q, x, 1), R = -1, I = -1;
                for(z = G; z < g; z++)if (T = $[z], x[T] < 0) {
                    var Z = r(q[T]);
                    a(Z, I) && (I = Z, R = T);
                } else N[D] = x[T], w[D++] = q[T];
                if (R === -1 || I <= 0) return null;
                x[L] < 0 && o(r(q[L]), n(I, h)) && (R = L);
                var te = q[R];
                for(N[D] = k, w[D++] = te, x[R] = k, E[y] = R, b[y++] = 1, z = G; z < g; z++)T = $[z], x[T] < 0 && (E[y] = T, b[y++] = t(q[T], te)), q[T] = 0;
            }
            for(M[g] = y, S[g] = D, z = 0; z < y; z++)E[z] = x[E[z]];
            return b.splice(y, b.length - y), E.splice(y, E.length - y), w.splice(D, w.length - D), N.splice(D, N.length - D), {
                L: F,
                U: _,
                pinv: x
            };
        };
    }), so = "slu", ad = [
        "typed",
        "abs",
        "add",
        "multiply",
        "transpose",
        "divideScalar",
        "subtract",
        "larger",
        "largerEq",
        "SparseMatrix"
    ], od = he(so, ad, (e)=>{
        var { typed: r, abs: t, add: n, multiply: i, transpose: a, divideScalar: o, subtract: u, larger: c, largerEq: s, SparseMatrix: l } = e, v = Xv({
            add: n,
            multiply: i,
            transpose: a
        }), h = id({
            abs: t,
            divideScalar: o,
            multiply: i,
            subtract: u,
            larger: c,
            largerEq: s,
            SparseMatrix: l
        });
        return r(so, {
            "SparseMatrix, number, number": function(g, d, y) {
                if (!ar(d) || d < 0 || d > 3) throw new Error("Symbolic Ordering and Analysis order must be an integer number in the interval [0, 3]");
                if (y < 0 || y > 1) throw new Error("Partial pivoting threshold must be a number from 0 to 1");
                var D = v(d, g, !1), b = h(g, D, y);
                return {
                    L: b.L,
                    U: b.U,
                    p: b.pinv,
                    q: D.q,
                    toString: function() {
                        return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
p: ` + this.p.toString() + (this.q ? `
q: ` + this.q.toString() : "") + `
`;
                    }
                };
            }
        });
    });
    function fo(e, r) {
        var t, n = r.length, i = [];
        if (e) for(t = 0; t < n; t++)i[e[t]] = r[t];
        else for(t = 0; t < n; t++)i[t] = r[t];
        return i;
    }
    var co = "lusolve", ud = [
        "typed",
        "matrix",
        "lup",
        "slu",
        "usolve",
        "lsolve",
        "DenseMatrix"
    ], sd = he(co, ud, (e)=>{
        var { typed: r, matrix: t, lup: n, slu: i, usolve: a, lsolve: o, DenseMatrix: u } = e, c = Kn({
            DenseMatrix: u
        });
        return r(co, {
            "Array, Array | Matrix": function(h, p) {
                h = t(h);
                var g = n(h), d = l(g.L, g.U, g.p, null, p);
                return d.valueOf();
            },
            "DenseMatrix, Array | Matrix": function(h, p) {
                var g = n(h);
                return l(g.L, g.U, g.p, null, p);
            },
            "SparseMatrix, Array | Matrix": function(h, p) {
                var g = n(h);
                return l(g.L, g.U, g.p, null, p);
            },
            "SparseMatrix, Array | Matrix, number, number": function(h, p, g, d) {
                var y = i(h, g, d);
                return l(y.L, y.U, y.p, y.q, p);
            },
            "Object, Array | Matrix": function(h, p) {
                return l(h.L, h.U, h.p, h.q, p);
            }
        });
        function s(v) {
            if (Ke(v)) return v;
            if (nr(v)) return t(v);
            throw new TypeError("Invalid Matrix LU decomposition");
        }
        function l(v, h, p, g, d) {
            v = s(v), h = s(h), p && (d = c(v, d, !0), d._data = fo(p, d._data));
            var y = o(v, d), D = a(h, y);
            return g && (D._data = fo(g, D._data)), D;
        }
    }), lo = "det", fd = [
        "typed",
        "matrix",
        "subtractScalar",
        "multiply",
        "divideScalar",
        "isZero",
        "unaryMinus"
    ], cd = he(lo, fd, (e)=>{
        var { typed: r, matrix: t, subtractScalar: n, multiply: i, divideScalar: a, isZero: o, unaryMinus: u } = e;
        return r(lo, {
            any: function(l) {
                return We(l);
            },
            "Array | Matrix": function(l) {
                var v;
                switch(Ke(l) ? v = l.size() : Array.isArray(l) ? (l = t(l), v = l.size()) : v = [], v.length){
                    case 0:
                        return We(l);
                    case 1:
                        if (v[0] === 1) return We(l.valueOf()[0]);
                        if (v[0] === 0) return 1;
                        throw new RangeError("Matrix must be square (size: " + fr(v) + ")");
                    case 2:
                        {
                            var h = v[0], p = v[1];
                            if (h === p) return c(l.clone().valueOf(), h);
                            if (p === 0) return 1;
                            throw new RangeError("Matrix must be square (size: " + fr(v) + ")");
                        }
                    default:
                        throw new RangeError("Matrix must be two dimensional (size: " + fr(v) + ")");
                }
            }
        });
        function c(s, l, v) {
            if (l === 1) return We(s[0][0]);
            if (l === 2) return n(i(s[0][0], s[1][1]), i(s[1][0], s[0][1]));
            for(var h = !1, p = new Array(l).fill(0).map((N, S)=>S), g = 0; g < l; g++){
                var d = p[g];
                if (o(s[d][g])) {
                    var y = void 0;
                    for(y = g + 1; y < l; y++)if (!o(s[p[y]][g])) {
                        d = p[y], p[y] = p[g], p[g] = d, h = !h;
                        break;
                    }
                    if (y === l) return s[d][g];
                }
                for(var D = s[d][g], b = g === 0 ? 1 : s[p[g - 1]][g - 1], E = g + 1; E < l; E++)for(var M = p[E], F = g + 1; F < l; F++)s[M][F] = a(n(i(s[M][F], D), i(s[M][g], s[d][F])), b);
            }
            var w = s[p[l - 1]][l - 1];
            return h ? u(w) : w;
        }
    }), vo = "inv", ld = [
        "typed",
        "matrix",
        "divideScalar",
        "addScalar",
        "multiply",
        "unaryMinus",
        "det",
        "identity",
        "abs"
    ], vd = he(vo, ld, (e)=>{
        var { typed: r, matrix: t, divideScalar: n, addScalar: i, multiply: a, unaryMinus: o, det: u, identity: c, abs: s } = e;
        return r(vo, {
            "Array | Matrix": function(h) {
                var p = Ke(h) ? h.size() : Ze(h);
                switch(p.length){
                    case 1:
                        if (p[0] === 1) return Ke(h) ? t([
                            n(1, h.valueOf()[0])
                        ]) : [
                            n(1, h[0])
                        ];
                        throw new RangeError("Matrix must be square (size: " + fr(p) + ")");
                    case 2:
                        {
                            var g = p[0], d = p[1];
                            if (g === d) return Ke(h) ? t(l(h.valueOf(), g, d), h.storage()) : l(h, g, d);
                            throw new RangeError("Matrix must be square (size: " + fr(p) + ")");
                        }
                    default:
                        throw new RangeError("Matrix must be two dimensional (size: " + fr(p) + ")");
                }
            },
            any: function(h) {
                return n(1, h);
            }
        });
        function l(v, h, p) {
            var g, d, y, D, b;
            if (h === 1) {
                if (D = v[0][0], D === 0) throw Error("Cannot calculate inverse, determinant is zero");
                return [
                    [
                        n(1, D)
                    ]
                ];
            } else if (h === 2) {
                var E = u(v);
                if (E === 0) throw Error("Cannot calculate inverse, determinant is zero");
                return [
                    [
                        n(v[1][1], E),
                        n(o(v[0][1]), E)
                    ],
                    [
                        n(o(v[1][0]), E),
                        n(v[0][0], E)
                    ]
                ];
            } else {
                var M = v.concat();
                for(g = 0; g < h; g++)M[g] = M[g].concat();
                for(var F = c(h).valueOf(), w = 0; w < p; w++){
                    var N = s(M[w][w]), S = w;
                    for(g = w + 1; g < h;)s(M[g][w]) > N && (N = s(M[g][w]), S = g), g++;
                    if (N === 0) throw Error("Cannot calculate inverse, determinant is zero");
                    g = S, g !== w && (b = M[w], M[w] = M[g], M[g] = b, b = F[w], F[w] = F[g], F[g] = b);
                    var _ = M[w], x = F[w];
                    for(g = 0; g < h; g++){
                        var T = M[g], z = F[g];
                        if (g !== w) {
                            if (T[w] !== 0) {
                                for(y = n(o(T[w]), _[w]), d = w; d < p; d++)T[d] = i(T[d], a(y, _[d]));
                                for(d = 0; d < p; d++)z[d] = i(z[d], a(y, x[d]));
                            }
                        } else {
                            for(y = _[w], d = w; d < p; d++)T[d] = n(T[d], y);
                            for(d = 0; d < p; d++)z[d] = n(z[d], y);
                        }
                    }
                }
                return F;
            }
        }
    });
    function dd(e) {
        var { addScalar: r, subtract: t, flatten: n, multiply: i, multiplyScalar: a, divideScalar: o, sqrt: u, abs: c, bignumber: s, diag: l, size: v, reshape: h, inv: p, qr: g, usolve: d, usolveAll: y, equal: D, complex: b, larger: E, smaller: M, matrixFromColumns: F, dot: w } = e;
        function N(Q, H, Y, re) {
            var j = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, X = S(Q, H, Y, re, j);
            _(Q, H, Y, re, j, X);
            var { values: K, C: fe } = x(Q, H, Y, re, j);
            if (j) {
                var ae = T(Q, H, fe, X, K, Y, re);
                return {
                    values: K,
                    eigenvectors: ae
                };
            }
            return {
                values: K
            };
        }
        function S(Q, H, Y, re, j) {
            var X = re === "BigNumber", K = re === "Complex", fe = X ? s(0) : 0, ae = X ? s(1) : K ? b(1) : 1, pe = X ? s(1) : 1, le = X ? s(10) : 2, ye = a(le, le), De;
            j && (De = Array(H).fill(ae));
            for(var Fe = !1; !Fe;){
                Fe = !0;
                for(var be = 0; be < H; be++){
                    for(var Me = fe, Ee = fe, ze = 0; ze < H; ze++)be !== ze && (Me = r(Me, c(Q[ze][be])), Ee = r(Ee, c(Q[be][ze])));
                    if (!D(Me, 0) && !D(Ee, 0)) {
                        for(var Be = pe, Ie = Me, er = o(Ee, le), P = a(Ee, le); M(Ie, er);)Ie = a(Ie, ye), Be = a(Be, le);
                        for(; E(Ie, P);)Ie = o(Ie, ye), Be = o(Be, le);
                        var U = M(o(r(Ie, Ee), Be), a(r(Me, Ee), .95));
                        if (U) {
                            Fe = !1;
                            for(var W = o(1, Be), ee = 0; ee < H; ee++)be !== ee && (Q[be][ee] = a(Q[be][ee], W), Q[ee][be] = a(Q[ee][be], Be));
                            j && (De[be] = a(De[be], W));
                        }
                    }
                }
            }
            return j ? l(De) : null;
        }
        function _(Q, H, Y, re, j, X) {
            var K = re === "BigNumber", fe = re === "Complex", ae = K ? s(0) : fe ? b(0) : 0;
            K && (Y = s(Y));
            for(var pe = 0; pe < H - 2; pe++){
                for(var le = 0, ye = ae, De = pe + 1; De < H; De++){
                    var Fe = Q[De][pe];
                    M(c(ye), c(Fe)) && (ye = Fe, le = De);
                }
                if (!M(c(ye), Y)) {
                    if (le !== pe + 1) {
                        var be = Q[le];
                        Q[le] = Q[pe + 1], Q[pe + 1] = be;
                        for(var Me = 0; Me < H; Me++){
                            var Ee = Q[Me][le];
                            Q[Me][le] = Q[Me][pe + 1], Q[Me][pe + 1] = Ee;
                        }
                        if (j) {
                            var ze = X[le];
                            X[le] = X[pe + 1], X[pe + 1] = ze;
                        }
                    }
                    for(var Be = pe + 2; Be < H; Be++){
                        var Ie = o(Q[Be][pe], ye);
                        if (Ie !== 0) {
                            for(var er = 0; er < H; er++)Q[Be][er] = t(Q[Be][er], a(Ie, Q[pe + 1][er]));
                            for(var P = 0; P < H; P++)Q[P][pe + 1] = r(Q[P][pe + 1], a(Ie, Q[P][Be]));
                            if (j) for(var U = 0; U < H; U++)X[Be][U] = t(X[Be][U], a(Ie, X[pe + 1][U]));
                        }
                    }
                }
            }
            return X;
        }
        function x(Q, H, Y, re, j) {
            var X = re === "BigNumber", K = re === "Complex", fe = X ? s(1) : K ? b(1) : 1;
            X && (Y = s(Y));
            for(var ae = We(Q), pe = [], le = H, ye = [], De = j ? l(Array(H).fill(fe)) : void 0, Fe = j ? l(Array(le).fill(fe)) : void 0, be = 0; be <= 100;){
                be += 1;
                for(var Me = ae[le - 1][le - 1], Ee = 0; Ee < le; Ee++)ae[Ee][Ee] = t(ae[Ee][Ee], Me);
                var { Q: ze, R: Be } = g(ae);
                ae = i(Be, ze);
                for(var Ie = 0; Ie < le; Ie++)ae[Ie][Ie] = r(ae[Ie][Ie], Me);
                if (j && (Fe = i(Fe, ze)), le === 1 || M(c(ae[le - 1][le - 2]), Y)) {
                    be = 0, pe.push(ae[le - 1][le - 1]), j && (ye.unshift([
                        [
                            1
                        ]
                    ]), $(Fe, H), De = i(De, Fe), le > 1 && (Fe = l(Array(le - 1).fill(fe)))), le -= 1, ae.pop();
                    for(var er = 0; er < le; er++)ae[er].pop();
                } else if (le === 2 || M(c(ae[le - 2][le - 3]), Y)) {
                    be = 0;
                    var P = z(ae[le - 2][le - 2], ae[le - 2][le - 1], ae[le - 1][le - 2], ae[le - 1][le - 1]);
                    pe.push(...P), j && (ye.unshift(q(ae[le - 2][le - 2], ae[le - 2][le - 1], ae[le - 1][le - 2], ae[le - 1][le - 1], P[0], P[1], Y, re)), $(Fe, H), De = i(De, Fe), le > 2 && (Fe = l(Array(le - 2).fill(fe)))), le -= 2, ae.pop(), ae.pop();
                    for(var U = 0; U < le; U++)ae[U].pop(), ae[U].pop();
                }
                if (le === 0) break;
            }
            if (pe.sort((ce, ue)=>+t(c(ce), c(ue))), be > 100) {
                var W = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + pe.join(", "));
                throw W.values = pe, W.vectors = [], W;
            }
            var ee = j ? i(De, k(ye, H)) : void 0;
            return {
                values: pe,
                C: ee
            };
        }
        function T(Q, H, Y, re, j, X, K) {
            var fe = p(Y), ae = i(fe, Q, Y), pe = K === "BigNumber", le = K === "Complex", ye = pe ? s(0) : le ? b(0) : 0, De = pe ? s(1) : le ? b(1) : 1, Fe = [], be = [];
            for (var Me of j){
                var Ee = L(Fe, Me, D);
                Ee === -1 ? (Fe.push(Me), be.push(1)) : be[Ee] += 1;
            }
            for(var ze = [], Be = Fe.length, Ie = Array(H).fill(ye), er = l(Array(H).fill(De)), P = function() {
                var ee = Fe[U], ce = t(ae, i(ee, er)), ue = y(ce, Ie);
                for(ue.shift(); ue.length < be[U];){
                    var me = G(ce, H, ue, X, K);
                    if (me === null) break;
                    ue.push(me);
                }
                var ie = i(p(re), Y);
                ue = ue.map((oe)=>i(ie, oe)), ze.push(...ue.map((oe)=>({
                        value: ee,
                        vector: n(oe)
                    })));
            }, U = 0; U < Be; U++)P();
            return ze;
        }
        function z(Q, H, Y, re) {
            var j = r(Q, re), X = t(a(Q, re), a(H, Y)), K = a(j, .5), fe = a(u(t(a(j, j), a(4, X))), .5);
            return [
                r(K, fe),
                t(K, fe)
            ];
        }
        function q(Q, H, Y, re, j, X, K, fe) {
            var ae = fe === "BigNumber", pe = fe === "Complex", le = ae ? s(0) : pe ? b(0) : 0, ye = ae ? s(1) : pe ? b(1) : 1;
            if (M(c(Y), K)) return [
                [
                    ye,
                    le
                ],
                [
                    le,
                    ye
                ]
            ];
            if (E(c(t(j, X)), K)) return [
                [
                    t(j, re),
                    t(X, re)
                ],
                [
                    Y,
                    Y
                ]
            ];
            var De = t(Q, j), Fe = t(re, j);
            return M(c(H), K) && M(c(Fe), K) ? [
                [
                    De,
                    ye
                ],
                [
                    Y,
                    le
                ]
            ] : [
                [
                    H,
                    le
                ],
                [
                    Fe,
                    ye
                ]
            ];
        }
        function $(Q, H) {
            for(var Y = 0; Y < Q.length; Y++)Q[Y].push(...Array(H - Q[Y].length).fill(0));
            for(var re = Q.length; re < H; re++)Q.push(Array(H).fill(0)), Q[re][re] = 1;
            return Q;
        }
        function k(Q, H) {
            for(var Y = [], re = 0; re < H; re++)Y[re] = Array(H).fill(0);
            var j = 0;
            for (var X of Q){
                for(var K = X.length, fe = 0; fe < K; fe++)for(var ae = 0; ae < K; ae++)Y[j + fe][j + ae] = X[fe][ae];
                j += K;
            }
            return Y;
        }
        function L(Q, H, Y) {
            for(var re = 0; re < Q.length; re++)if (Y(Q[re], H)) return re;
            return -1;
        }
        function G(Q, H, Y, re, j) {
            for(var X = j === "BigNumber" ? s(1e3) : 1e3, K, fe = 0; fe < 5; ++fe){
                K = R(H, Y, j);
                try {
                    K = d(Q, K);
                } catch  {
                    continue;
                }
                if (E(Z(K), X)) break;
            }
            if (fe >= 5) return null;
            for(fe = 0;;){
                var ae = d(Q, K);
                if (M(Z(I(K, [
                    ae
                ])), re)) break;
                if (++fe >= 10) return null;
                K = te(ae);
            }
            return K;
        }
        function R(Q, H, Y) {
            var re = Y === "BigNumber", j = Y === "Complex", X = Array(Q).fill(0).map((K)=>2 * Math.random() - 1);
            return re && (X = X.map((K)=>s(K))), j && (X = X.map((K)=>b(K))), X = I(X, H), te(X, Y);
        }
        function I(Q, H) {
            var Y = v(Q);
            for (var re of H)re = h(re, Y), Q = t(Q, i(o(w(re, Q), w(re, re)), re));
            return Q;
        }
        function Z(Q) {
            return c(u(w(Q, Q)));
        }
        function te(Q, H) {
            var Y = H === "BigNumber", re = H === "Complex", j = Y ? s(1) : re ? b(1) : 1;
            return i(o(j, Z(Q)), Q);
        }
        return N;
    }
    function hd(e) {
        var { config: r, addScalar: t, subtract: n, abs: i, atan: a, cos: o, sin: u, multiplyScalar: c, inv: s, bignumber: l, multiply: v, add: h } = e;
        function p(_, x) {
            var T = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : r.relTol, z = arguments.length > 3 ? arguments[3] : void 0, q = arguments.length > 4 ? arguments[4] : void 0;
            if (z === "number") return g(_, T, q);
            if (z === "BigNumber") return d(_, T, q);
            throw TypeError("Unsupported data type: " + z);
        }
        function g(_, x, T) {
            var z = _.length, q = Math.abs(x / z), $, k;
            if (T) {
                k = new Array(z);
                for(var L = 0; L < z; L++)k[L] = Array(z).fill(0), k[L][L] = 1;
            }
            for(var G = w(_); Math.abs(G[1]) >= Math.abs(q);){
                var R = G[0][0], I = G[0][1];
                $ = y(_[R][R], _[I][I], _[R][I]), _ = F(_, $, R, I), T && (k = b(k, $, R, I)), G = w(_);
            }
            for(var Z = Array(z).fill(0), te = 0; te < z; te++)Z[te] = _[te][te];
            return S(We(Z), k, T);
        }
        function d(_, x, T) {
            var z = _.length, q = i(x / z), $, k;
            if (T) {
                k = new Array(z);
                for(var L = 0; L < z; L++)k[L] = Array(z).fill(0), k[L][L] = 1;
            }
            for(var G = N(_); i(G[1]) >= i(q);){
                var R = G[0][0], I = G[0][1];
                $ = D(_[R][R], _[I][I], _[R][I]), _ = M(_, $, R, I), T && (k = E(k, $, R, I)), G = N(_);
            }
            for(var Z = Array(z).fill(0), te = 0; te < z; te++)Z[te] = _[te][te];
            return S(We(Z), k, T);
        }
        function y(_, x, T) {
            var z = x - _;
            return Math.abs(z) <= r.relTol ? Math.PI / 4 : .5 * Math.atan(2 * T / (x - _));
        }
        function D(_, x, T) {
            var z = n(x, _);
            return i(z) <= r.relTol ? l(-1).acos().div(4) : c(.5, a(v(2, T, s(z))));
        }
        function b(_, x, T, z) {
            for(var q = _.length, $ = Math.cos(x), k = Math.sin(x), L = Array(q).fill(0), G = Array(q).fill(0), R = 0; R < q; R++)L[R] = $ * _[R][T] - k * _[R][z], G[R] = k * _[R][T] + $ * _[R][z];
            for(var I = 0; I < q; I++)_[I][T] = L[I], _[I][z] = G[I];
            return _;
        }
        function E(_, x, T, z) {
            for(var q = _.length, $ = o(x), k = u(x), L = Array(q).fill(l(0)), G = Array(q).fill(l(0)), R = 0; R < q; R++)L[R] = n(c($, _[R][T]), c(k, _[R][z])), G[R] = t(c(k, _[R][T]), c($, _[R][z]));
            for(var I = 0; I < q; I++)_[I][T] = L[I], _[I][z] = G[I];
            return _;
        }
        function M(_, x, T, z) {
            for(var q = _.length, $ = l(o(x)), k = l(u(x)), L = c($, $), G = c(k, k), R = Array(q).fill(l(0)), I = Array(q).fill(l(0)), Z = v(l(2), $, k, _[T][z]), te = t(n(c(L, _[T][T]), Z), c(G, _[z][z])), Q = h(c(G, _[T][T]), Z, c(L, _[z][z])), H = 0; H < q; H++)R[H] = n(c($, _[T][H]), c(k, _[z][H])), I[H] = t(c(k, _[T][H]), c($, _[z][H]));
            _[T][T] = te, _[z][z] = Q, _[T][z] = l(0), _[z][T] = l(0);
            for(var Y = 0; Y < q; Y++)Y !== T && Y !== z && (_[T][Y] = R[Y], _[Y][T] = R[Y], _[z][Y] = I[Y], _[Y][z] = I[Y]);
            return _;
        }
        function F(_, x, T, z) {
            for(var q = _.length, $ = Math.cos(x), k = Math.sin(x), L = $ * $, G = k * k, R = Array(q).fill(0), I = Array(q).fill(0), Z = L * _[T][T] - 2 * $ * k * _[T][z] + G * _[z][z], te = G * _[T][T] + 2 * $ * k * _[T][z] + L * _[z][z], Q = 0; Q < q; Q++)R[Q] = $ * _[T][Q] - k * _[z][Q], I[Q] = k * _[T][Q] + $ * _[z][Q];
            _[T][T] = Z, _[z][z] = te, _[T][z] = 0, _[z][T] = 0;
            for(var H = 0; H < q; H++)H !== T && H !== z && (_[T][H] = R[H], _[H][T] = R[H], _[z][H] = I[H], _[H][z] = I[H]);
            return _;
        }
        function w(_) {
            for(var x = _.length, T = 0, z = [
                0,
                1
            ], q = 0; q < x; q++)for(var $ = q + 1; $ < x; $++)Math.abs(T) < Math.abs(_[q][$]) && (T = Math.abs(_[q][$]), z = [
                q,
                $
            ]);
            return [
                z,
                T
            ];
        }
        function N(_) {
            for(var x = _.length, T = 0, z = [
                0,
                1
            ], q = 0; q < x; q++)for(var $ = q + 1; $ < x; $++)i(T) < i(_[q][$]) && (T = i(_[q][$]), z = [
                q,
                $
            ]);
            return [
                z,
                T
            ];
        }
        function S(_, x, T) {
            var z = _.length, q = Array(z), $;
            if (T) {
                $ = Array(z);
                for(var k = 0; k < z; k++)$[k] = Array(z);
            }
            for(var L = 0; L < z; L++){
                for(var G = 0, R = _[0], I = 0; I < _.length; I++)i(_[I]) < i(R) && (G = I, R = _[G]);
                if (q[L] = _.splice(G, 1)[0], T) for(var Z = 0; Z < z; Z++)$[L][Z] = x[Z][G], x[Z].splice(G, 1);
            }
            if (!T) return {
                values: q
            };
            var te = $.map((Q, H)=>({
                    value: q[H],
                    vector: Q
                }));
            return {
                values: q,
                eigenvectors: te
            };
        }
        return p;
    }
    var pd = "eigs", md = [
        "config",
        "typed",
        "matrix",
        "addScalar",
        "equal",
        "subtract",
        "abs",
        "atan",
        "cos",
        "sin",
        "multiplyScalar",
        "divideScalar",
        "inv",
        "bignumber",
        "multiply",
        "add",
        "larger",
        "column",
        "flatten",
        "number",
        "complex",
        "sqrt",
        "diag",
        "size",
        "reshape",
        "qr",
        "usolve",
        "usolveAll",
        "im",
        "re",
        "smaller",
        "matrixFromColumns",
        "dot"
    ], gd = he(pd, md, (e)=>{
        var { config: r, typed: t, matrix: n, addScalar: i, subtract: a, equal: o, abs: u, atan: c, cos: s, sin: l, multiplyScalar: v, divideScalar: h, inv: p, bignumber: g, multiply: d, add: y, larger: D, column: b, flatten: E, number: M, complex: F, sqrt: w, diag: N, size: S, reshape: _, qr: x, usolve: T, usolveAll: z, im: q, re: $, smaller: k, matrixFromColumns: L, dot: G } = e, R = hd({
            config: r,
            addScalar: i,
            subtract: a,
            abs: u,
            atan: c,
            cos: s,
            sin: l,
            multiplyScalar: v,
            inv: p,
            bignumber: g,
            multiply: d,
            add: y
        }), I = dd({
            addScalar: i,
            subtract: a,
            multiply: d,
            multiplyScalar: v,
            flatten: E,
            divideScalar: h,
            sqrt: w,
            abs: u,
            bignumber: g,
            diag: N,
            size: S,
            reshape: _,
            qr: x,
            inv: p,
            usolve: T,
            usolveAll: z,
            equal: o,
            complex: F,
            larger: D,
            smaller: k,
            matrixFromColumns: L,
            dot: G
        });
        return t("eigs", {
            Array: function(X) {
                return Z(n(X));
            },
            "Array, number|BigNumber": function(X, K) {
                return Z(n(X), {
                    precision: K
                });
            },
            "Array, Object" (j, X) {
                return Z(n(j), X);
            },
            Matrix: function(X) {
                return Z(X, {
                    matricize: !0
                });
            },
            "Matrix, number|BigNumber": function(X, K) {
                return Z(X, {
                    precision: K,
                    matricize: !0
                });
            },
            "Matrix, Object": function(X, K) {
                var fe = {
                    matricize: !0
                };
                return Lt(fe, K), Z(X, fe);
            }
        });
        function Z(j) {
            var X, K = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, fe = "eigenvectors" in K ? K.eigenvectors : !0, ae = (X = K.precision) !== null && X !== void 0 ? X : r.relTol, pe = te(j, ae, fe);
            return K.matricize && (pe.values = n(pe.values), fe && (pe.eigenvectors = pe.eigenvectors.map((le)=>{
                var { value: ye, vector: De } = le;
                return {
                    value: ye,
                    vector: n(De)
                };
            }))), fe && Object.defineProperty(pe, "vectors", {
                enumerable: !1,
                get: ()=>{
                    throw new Error("eigs(M).vectors replaced with eigs(M).eigenvectors");
                }
            }), pe;
        }
        function te(j, X, K) {
            var fe = j.toArray(), ae = j.size();
            if (ae.length !== 2 || ae[0] !== ae[1]) throw new RangeError("Matrix must be square (size: ".concat(fr(ae), ")"));
            var pe = ae[0];
            if (H(fe, pe, X) && (Y(fe, pe), Q(fe, pe, X))) {
                var le = re(j, fe, pe);
                return R(fe, pe, X, le, K);
            }
            var ye = re(j, fe, pe);
            return I(fe, pe, X, ye, K);
        }
        function Q(j, X, K) {
            for(var fe = 0; fe < X; fe++)for(var ae = fe; ae < X; ae++)if (D(g(u(a(j[fe][ae], j[ae][fe]))), K)) return !1;
            return !0;
        }
        function H(j, X, K) {
            for(var fe = 0; fe < X; fe++)for(var ae = 0; ae < X; ae++)if (D(g(u(q(j[fe][ae]))), K)) return !1;
            return !0;
        }
        function Y(j, X) {
            for(var K = 0; K < X; K++)for(var fe = 0; fe < X; fe++)j[K][fe] = $(j[K][fe]);
        }
        function re(j, X, K) {
            var fe = j.datatype();
            if (fe === "number" || fe === "BigNumber" || fe === "Complex") return fe;
            for(var ae = !1, pe = !1, le = !1, ye = 0; ye < K; ye++)for(var De = 0; De < K; De++){
                var Fe = X[ye][De];
                if (ir(Fe) || Ti(Fe)) ae = !0;
                else if (cr(Fe)) pe = !0;
                else if (xi(Fe)) le = !0;
                else throw TypeError("Unsupported type in Matrix: " + Kr(Fe));
            }
            if (pe && le && console.warn("Complex BigNumbers not supported, this operation will lose precission."), le) {
                for(var be = 0; be < K; be++)for(var Me = 0; Me < K; Me++)X[be][Me] = F(X[be][Me]);
                return "Complex";
            }
            if (pe) {
                for(var Ee = 0; Ee < K; Ee++)for(var ze = 0; ze < K; ze++)X[Ee][ze] = g(X[Ee][ze]);
                return "BigNumber";
            }
            if (ae) {
                for(var Be = 0; Be < K; Be++)for(var Ie = 0; Ie < K; Ie++)X[Be][Ie] = M(X[Be][Ie]);
                return "number";
            } else throw TypeError("Matrix contains unsupported types only.");
        }
    }), Dd = Object.freeze({
        __proto__: null
    }), fn = Hf({
        config: Nr
    }), jn = Yf({}), Ui = rc({}), $i = ic({}), Ar = yc({
        Matrix: $i
    }), Ae = Ws({
        BigNumber: fn,
        Complex: jn,
        DenseMatrix: Ar,
        Fraction: Ui
    }), cn = el({
        typed: Ae
    }), _t = tl({
        typed: Ae
    }), yd = wv({
        typed: Ae
    }), qi = Hc({
        Complex: jn,
        typed: Ae
    }), ei = Wl({
        typed: Ae
    }), wd = _v({
        typed: Ae
    }), Vr = Nc({
        config: Nr,
        typed: Ae
    }), ki = a0({
        typed: Ae
    }), Ed = u0({
        typed: Ae
    }), _d = Zl({
        typed: Ae
    }), yu = Ec({
        typed: Ae
    }), Ad = Fc({
        config: Nr,
        typed: Ae
    }), wu = Cc({
        equalScalar: Vr,
        typed: Ae
    }), ct = Tl({
        typed: Ae
    }), Hi = Rc({
        typed: Ae
    }), Fd = Ql({
        typed: Ae
    }), bd = Il({
        BigNumber: fn,
        Fraction: Ui,
        complex: qi,
        typed: Ae
    }), Cd = Fv({
        typed: Ae
    }), Zr = Tc({
        Matrix: $i,
        equalScalar: Vr,
        typed: Ae
    }), Mt = il({
        typed: Ae
    }), ln = $c({
        BigNumber: fn,
        typed: Ae
    }), _e = Yc({
        DenseMatrix: Ar,
        Matrix: $i,
        SparseMatrix: Zr,
        typed: Ae
    }), Sd = m0({
        isInteger: yu,
        matrix: _e,
        typed: Ae
    }), Md = gv({
        SparseMatrix: Zr,
        typed: Ae
    }), Gi = Ul({
        Complex: jn,
        config: Nr,
        typed: Ae
    }), Xr = b0({
        matrix: _e,
        typed: Ae
    }), Je = N0({
        BigNumber: fn,
        config: Nr,
        matrix: _e,
        typed: Ae
    }), Nt = Jl({
        isInteger: yu,
        matrix: _e,
        typed: Ae
    }), Nd = S0({
        conj: ei,
        transpose: Xr,
        typed: Ae
    }), Bd = n0({
        DenseMatrix: Ar,
        SparseMatrix: Zr,
        matrix: _e,
        typed: Ae
    }), Eu = G0({
        DenseMatrix: Ar,
        SparseMatrix: Zr,
        concat: Nt,
        equalScalar: Vr,
        matrix: _e,
        typed: Ae
    }), _u = Vc({
        Fraction: Ui,
        typed: Ae
    }), vn = f0({
        BigNumber: fn,
        DenseMatrix: Ar,
        SparseMatrix: Zr,
        config: Nr,
        matrix: _e,
        typed: Ae
    }), xd = l0({
        matrix: _e,
        multiplyScalar: ct,
        typed: Ae
    }), Au = tv({
        DenseMatrix: Ar,
        SparseMatrix: Zr,
        concat: Nt,
        config: Nr,
        matrix: _e,
        typed: Ae
    }), Td = T0({
        bignumber: ln,
        fraction: _u,
        number: Hi
    }), Wi = D0({
        matrix: _e,
        config: Nr,
        typed: Ae
    }), dn = Z0({
        DenseMatrix: Ar,
        SparseMatrix: Zr,
        bignumber: ln,
        concat: Nt,
        config: Nr,
        matrix: _e,
        typed: Ae
    }), hn = Kc({
        typed: Ae
    }), Gr = Cv({
        DenseMatrix: Ar,
        SparseMatrix: Zr,
        addScalar: _t,
        concat: Nt,
        equalScalar: Vr,
        matrix: _e,
        typed: Ae
    }), lt = z0({
        numeric: Td,
        typed: Ae
    }), Pd = ov({
        DenseMatrix: Ar,
        smaller: dn
    }), Fu = fv({
        ImmutableDenseMatrix: Pd,
        getMatrixDataType: Ed
    }), Wt = j0({
        DenseMatrix: Ar,
        SparseMatrix: Zr,
        bignumber: ln,
        concat: Nt,
        config: Nr,
        matrix: _e,
        typed: Ae
    }), zd = L0({
        DenseMatrix: Ar,
        divideScalar: lt,
        equalScalar: Vr,
        matrix: _e,
        multiplyScalar: ct,
        subtractScalar: Mt,
        typed: Ae
    }), Od = Xc({
        flatten: ki,
        matrix: _e,
        size: Wi,
        typed: Ae
    }), Id = Iv({
        addScalar: _t,
        complex: qi,
        conj: ei,
        divideScalar: lt,
        equal: Eu,
        identity: vn,
        isZero: wu,
        matrix: _e,
        multiplyScalar: ct,
        sign: bd,
        sqrt: Gi,
        subtractScalar: Mt,
        typed: Ae,
        unaryMinus: hn,
        zeros: Je
    }), Rd = X0({
        DenseMatrix: Ar,
        SparseMatrix: Zr,
        concat: Nt,
        config: Nr,
        matrix: _e,
        typed: Ae
    }), hi = w0({
        add: Gr,
        matrix: _e,
        typed: Ae,
        zeros: Je
    }), pn = ql({
        DenseMatrix: Ar,
        concat: Nt,
        equalScalar: Vr,
        matrix: _e,
        subtractScalar: Mt,
        typed: Ae,
        unaryMinus: hn
    }), bu = $0({
        DenseMatrix: Ar,
        divideScalar: lt,
        equalScalar: Vr,
        matrix: _e,
        multiplyScalar: ct,
        subtractScalar: Mt,
        typed: Ae
    }), rn = Bv({
        addScalar: _t,
        conj: ei,
        multiplyScalar: ct,
        size: Wi,
        typed: Ae
    }), Ld = vv({
        larger: Wt,
        smaller: dn
    }), pi = Tv({
        Index: Fu,
        typed: Ae
    }), Ge = zl({
        addScalar: _t,
        dot: rn,
        equalScalar: Vr,
        matrix: _e,
        multiplyScalar: ct,
        typed: Ae
    }), Ud = h0({
        bignumber: ln,
        matrix: _e,
        add: Gr,
        config: Nr,
        isPositive: Ad,
        larger: Wt,
        largerEq: Au,
        smaller: dn,
        smallerEq: Rd,
        typed: Ae
    }), $d = od({
        SparseMatrix: Zr,
        abs: cn,
        add: Gr,
        divideScalar: lt,
        larger: Wt,
        largerEq: Au,
        multiply: Ge,
        subtract: pn,
        transpose: Xr,
        typed: Ae
    }), qd = k0({
        DenseMatrix: Ar,
        divideScalar: lt,
        equalScalar: Vr,
        matrix: _e,
        multiplyScalar: ct,
        subtractScalar: Mt,
        typed: Ae
    }), kd = jl({
        Index: Fu,
        matrix: _e,
        range: Ud,
        typed: Ae
    }), ho = r0({
        matrix: _e,
        multiply: Ge,
        subtract: pn,
        typed: Ae
    }), Hd = cd({
        divideScalar: lt,
        isZero: wu,
        matrix: _e,
        multiply: Ge,
        subtractScalar: Mt,
        typed: Ae,
        unaryMinus: hn
    }), Cu = vd({
        abs: cn,
        addScalar: _t,
        det: Hd,
        divideScalar: lt,
        identity: vn,
        matrix: _e,
        multiply: Ge,
        typed: Ae,
        unaryMinus: hn
    }), Gd = I0({
        Complex: jn,
        config: Nr,
        fraction: _u,
        identity: vn,
        inv: Cu,
        matrix: _e,
        multiply: Ge,
        number: Hi,
        typed: Ae
    }), Wd = pv({
        FibonacciHeap: Ld,
        addScalar: _t,
        equalScalar: Vr
    }), Su = zv({
        DenseMatrix: Ar,
        Spa: Wd,
        SparseMatrix: Zr,
        abs: cn,
        addScalar: _t,
        divideScalar: lt,
        equalScalar: Vr,
        larger: Wt,
        matrix: _e,
        multiplyScalar: ct,
        subtractScalar: Mt,
        typed: Ae,
        unaryMinus: hn
    }), Vd = gd({
        abs: cn,
        add: Gr,
        addScalar: _t,
        atan: yd,
        bignumber: ln,
        column: kd,
        complex: qi,
        config: Nr,
        cos: wd,
        diag: Bd,
        divideScalar: lt,
        dot: rn,
        equal: Eu,
        flatten: ki,
        im: _d,
        inv: Cu,
        larger: Wt,
        matrix: _e,
        matrixFromColumns: Od,
        multiply: Ge,
        multiplyScalar: ct,
        number: Hi,
        qr: Id,
        re: Fd,
        reshape: Sd,
        sin: Cd,
        size: Wi,
        smaller: dn,
        sqrt: Gi,
        subtract: pn,
        typed: Ae,
        usolve: bu,
        usolveAll: qd
    }), Zd = sd({
        DenseMatrix: Ar,
        lsolve: zd,
        lup: Su,
        matrix: _e,
        slu: $d,
        typed: Ae,
        usolve: bu
    }), tn = Mv({
        abs: cn,
        add: Gr,
        conj: ei,
        ctranspose: Nd,
        eigs: Vd,
        equalScalar: Vr,
        larger: Wt,
        matrix: _e,
        multiply: Ge,
        pow: Gd,
        smaller: dn,
        sqrt: Gi,
        typed: Ae
    });
    function Yd(e) {
        if (e.length === 2) return Qd(e);
        if (e.length === 3) return Xd(e);
    }
    function Qd(e) {
        const r = pn(e[1], e[0]), t = tn(r), n = rn(r, [
            1,
            0,
            0
        ]) / t, i = rn(r, [
            0,
            1,
            0
        ]) / t, a = rn(r, [
            0,
            0,
            1
        ]) / t, o = Math.sqrt(n ** 2 + i ** 2);
        let u = [
            [
                n,
                i,
                a
            ],
            [
                -i / o,
                n / o,
                0
            ],
            [
                -n * a / o,
                -i * a / o,
                o
            ]
        ];
        return a === 1 && (u = [
            [
                0,
                0,
                1
            ],
            [
                0,
                1,
                0
            ],
            [
                -1,
                0,
                0
            ]
        ]), a === -1 && (u = [
            [
                0,
                0,
                -1
            ],
            [
                0,
                1,
                0
            ],
            [
                1,
                0,
                0
            ]
        ]), xd(vn(4), u).toArray();
    }
    function Xd(e) {
        const a = [
            e[0],
            e[1],
            e[2]
        ], o = Je(3, 3).toArray();
        for(let F = 0; F < 3; F++)for(let w = 0; w < 3; w++)o[F][w] = a[w][F];
        const u = [
            -1,
            1,
            0
        ], c = [
            -1,
            0,
            1
        ], s = Je(3, 2).toArray();
        for(let F = 0; F < 3; F++)for(let w = 0; w < 3; w++)s[F][0] += o[F][w] * u[w], s[F][1] += o[F][w] * c[w];
        const l = s.map((F)=>F[0]), v = s.map((F)=>F[1]);
        let h = ho(l, v), p = tn(h);
        if (p === 0) return console.warn("Degenerate triangle: nodes are collinear or coincident."), Je(18, 18).toArray();
        h = h.map((F)=>F / p);
        const g = [
            ...h
        ], d = vn(3).toArray(), y = h[0];
        let D;
        if (Math.abs(y) > 1 - 1e-10) {
            const F = h[2];
            D = d.map((w, N)=>w[2] - F * h[N]);
        } else D = d.map((F, w)=>F[0] - y * h[w]);
        if (p = tn(D), p === 0) return console.warn("Degenerate local X-axis detected."), Je(18, 18).toArray();
        D = D.map((F)=>F / p);
        let b = ho(g, D);
        if (p = tn(b), p === 0) return console.warn("Degenerate local Y-axis detected."), Je(18, 18).toArray();
        b = b.map((F)=>F / p);
        const E = [
            D,
            b,
            g
        ], M = Je(18, 18).toArray();
        for(let F = 0; F < 3; F++){
            const w = F * 6, N = w + 3;
            for(let S = 0; S < 3; S++)for(let _ = 0; _ < 3; _++)M[w + S][w + _] = E[S][_], M[N + S][N + _] = E[S][_];
        }
        return M;
    }
    const po = new WeakMap;
    function Jd(e, r, t) {
        if (e.length === 2) return Kd(e, r, t);
        if (e.length === 3) return jd(e, r, t);
    }
    function Kd(e, r, t) {
        const n = r?.momentsOfInertiaZ?.get(t) ?? 0, i = r?.momentsOfInertiaY?.get(t) ?? 0, a = r?.elasticities?.get(t) ?? 0, o = r?.areas?.get(t) ?? 0, u = r?.shearModuli?.get(t) ?? 0, c = r?.torsionalConstants?.get(t) ?? 0, s = tn(pn(e[0], e[1])), l = a * o / s, v = a * n / s ** 3, h = a * i / s ** 3, p = u * c / s;
        return [
            [
                l,
                0,
                0,
                0,
                0,
                0,
                -l,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                12 * v,
                0,
                0,
                0,
                6 * s * v,
                0,
                -12 * v,
                0,
                0,
                0,
                6 * s * v
            ],
            [
                0,
                0,
                12 * h,
                0,
                -6 * s * h,
                0,
                0,
                0,
                -12 * h,
                0,
                -6 * s * h,
                0
            ],
            [
                0,
                0,
                0,
                p,
                0,
                0,
                0,
                0,
                0,
                -p,
                0,
                0
            ],
            [
                0,
                0,
                -6 * s * h,
                0,
                4 * h * s ** 2,
                0,
                0,
                0,
                6 * s * h,
                0,
                2 * h * s ** 2,
                0
            ],
            [
                0,
                6 * s * v,
                0,
                0,
                0,
                4 * v * s ** 2,
                0,
                -6 * s * v,
                0,
                0,
                0,
                2 * v * s ** 2
            ],
            [
                -l,
                0,
                0,
                0,
                0,
                0,
                l,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                -12 * v,
                0,
                0,
                0,
                -6 * v * s,
                0,
                12 * v,
                0,
                0,
                0,
                -6 * v * s
            ],
            [
                0,
                0,
                -12 * h,
                0,
                6 * s * h,
                0,
                0,
                0,
                12 * h,
                0,
                6 * s * h,
                0
            ],
            [
                0,
                0,
                0,
                -p,
                0,
                0,
                0,
                0,
                0,
                p,
                0,
                0
            ],
            [
                0,
                0,
                -6 * s * h,
                0,
                2 * h * s ** 2,
                0,
                0,
                0,
                6 * s * h,
                0,
                4 * h * s ** 2,
                0
            ],
            [
                0,
                6 * s * v,
                0,
                0,
                0,
                2 * v * s ** 2,
                0,
                -6 * s * v,
                0,
                0,
                0,
                4 * v * s ** 2
            ]
        ];
    }
    function jd(e, r, t) {
        const n = r.cltLayups?.get(t), i = r.elasticities?.get(t) ?? 0, a = r.elasticitiesOrthogonal?.get(t) ?? 0, o = r.poissonsRatios?.get(t) ?? 0, u = r.shearModuli?.get(t) ?? 0;
        let c = r.thicknesses?.get(t) ?? 0, s, l, v;
        if (n) {
            const G = rh(n);
            c = G.t, s = G.bendingStiffnessMatrix, l = G.shearStiffnessMatrix, v = G.inPlaneConstitutiveMatrix;
        } else {
            const G = a > 0;
            s = G ? T(i, a, u, o, c) : _(i, o, c), l = G ? z(u, c) : x(i, o, c), v = G ? ah(i, a, u, o) : ih(i, o);
        }
        const h = eh(e), p = h[1][0] - h[0][0], g = h[2][0] - h[0][0], d = h[0][1] - h[1][1], y = h[2][1] - h[0][1], D = .5 * (p * y - g * -d);
        if (Math.abs(D) < 1e-12) return console.warn("Degenerate triangle (zero area) detected in getLocalStiffnessMatrixShell. Returning zero matrix."), Je(18, 18).toArray();
        const b = q(h), E = k(h), M = L(h, v, c), F = Ge(Ge(Xr(b), l), b), w = Ge(Ge(Xr(E), s), E), N = Je(18, 18).toArray(), S = Ge(Gr(F, w), D);
        nh(N, M);
        for(let G = 0; G < 18; G++)for(let R = 0; R < 18; R++)N[G][R] = (N[G][R] ?? 0) + S.get([
            G,
            R
        ]);
        return N;
        function _(G, R, I) {
            const Z = G / (1 - R * R), te = _e([
                [
                    Z,
                    Z * R,
                    0
                ],
                [
                    Z * R,
                    Z,
                    0
                ],
                [
                    0,
                    0,
                    Z * (1 - R) / 2
                ]
            ]);
            return Ge(I ** 3 / 12, te);
        }
        function x(G, R, I) {
            const Z = .8333333333333334, te = G / (2 * (1 + R)), Q = Z * te * I;
            return _e([
                [
                    Q,
                    0
                ],
                [
                    0,
                    Q
                ]
            ]);
        }
        function T(G, R, I, Z, te) {
            const Q = R * Z / G, H = 1 - Z * Q, Y = G / H, re = R / H, j = Z * R / H, K = _e([
                [
                    Y,
                    j,
                    0
                ],
                [
                    j,
                    re,
                    0
                ],
                [
                    0,
                    0,
                    I
                ]
            ]);
            return Ge(te ** 3 / 12, K);
        }
        function z(G, R) {
            const Z = .8333333333333334 * G * R;
            return _e([
                [
                    Z,
                    0
                ],
                [
                    0,
                    Z
                ]
            ]);
        }
        function q(G) {
            const R = Je(2, 18).toArray(), [I, Z] = G[0], [te, Q] = G[1], [H, Y] = G[2], re = .5 * ((te - I) * (Y - Z) - (H - I) * -(Z - Q)), j = (I + te + H) / 3, X = (Z + Q + Y) / 3, K = [
                j,
                I,
                te
            ], fe = [
                X,
                Z,
                Q
            ], ae = [
                j,
                te,
                H
            ], pe = [
                X,
                Q,
                Y
            ], le = [
                j,
                H,
                I
            ], ye = [
                X,
                Y,
                Z
            ], De = 1 / 3, [Fe, be, Me, Ee] = $(K, fe), [ze, Be, Ie, er] = $(ae, pe), [P, U, W, ee] = $(le, ye), ce = Je(2, 18).toArray(), ue = Je(2, 18).toArray(), me = Je(2, 18).toArray();
            for(let ie = 0; ie < 2; ie++)for(let oe = 0; oe < 6; oe++)ce[ie][oe] = De * Fe[ie][oe] + be[ie][oe], ce[ie][oe + 6] = De * Fe[ie][oe] + Me[ie][oe], ce[ie][oe + 12] = De * Fe[ie][oe], ue[ie][oe] = De * ze[ie][oe], ue[ie][oe + 6] = De * ze[ie][oe] + Be[ie][oe], ue[ie][oe + 12] = De * ze[ie][oe] + Ie[ie][oe], me[ie][oe] = De * P[ie][oe] + W[ie][oe], me[ie][oe + 6] = De * P[ie][oe], me[ie][oe + 12] = De * P[ie][oe] + U[ie][oe];
            for(let ie = 0; ie < 2; ie++)for(let oe = 0; oe < 18; oe++)ce[ie][oe] *= Ee, ue[ie][oe] *= er, me[ie][oe] *= ee, R[ie][oe] = (ce[ie][oe] + ue[ie][oe] + me[ie][oe]) / re;
            return R;
        }
        function $(G, R) {
            const I = Je(2, 6).toArray(), Z = Je(2, 6).toArray(), te = Je(2, 6).toArray(), Q = G[1] - G[0], H = G[0] - G[2], Y = R[2] - R[0], re = R[0] - R[1], j = G[2] - G[1], X = R[1] - R[2], K = .5 * (Q * Y - H * re), fe = .5 * re * H, ae = .5 * Y * Q, pe = .5 * Q * H, le = .5 * re * Y;
            return I[0][2] = .5 * j / K, I[0][3] = -.5, I[1][2] = .5 * X / K, I[1][4] = .5, Z[0][2] = .5 * H / K, Z[0][3] = .5 * fe / K, Z[0][4] = .5 * pe / K, Z[1][2] = .5 * Y / K, Z[1][3] = .5 * le / K, Z[1][4] = .5 * ae / K, te[0][2] = .5 * Q / K, te[0][3] = -.5 * ae / K, te[0][4] = -.5 * pe / K, te[1][2] = .5 * re / K, te[1][3] = -.5 * le / K, te[1][4] = -.5 * fe / K, [
                I,
                Z,
                te,
                K
            ];
        }
        function k(G) {
            const R = Je(3, 18).toArray(), [I, Z] = G[0], [te, Q] = G[1], [H, Y] = G[2], re = te - I, j = H - I, X = H - te, K = Q - Y, fe = Y - Z, ae = Z - Q, pe = .5 * (re * fe - j * -ae), le = K / (2 * pe), ye = X / (2 * pe), De = fe / (2 * pe), Fe = -j / (2 * pe), be = ae / (2 * pe), Me = re / (2 * pe);
            return R[0][4] = le, R[0][10] = De, R[0][16] = be, R[1][3] = -ye, R[1][9] = -Fe, R[1][15] = -Me, R[2][3] = -le, R[2][4] = ye, R[2][9] = -De, R[2][10] = Fe, R[2][15] = -be, R[2][16] = Me, R;
        }
        function L(G, R, I) {
            let Z = Je(9, 9).toArray(), te = Je(9, 9).toArray(), Q = Je(9, 9).toArray(), H = Je(9, 3).toArray(), Y = Je(3, 9).toArray(), re = Je(3, 3).toArray(), j = Je(3, 3).toArray(), X = Je(3, 3).toArray(), K = Je(3, 3).toArray(), fe = Je(3, 3).toArray(), ae = Je(3, 3).toArray(), pe = Je(3, 3).toArray(), le = Je(3, 3).toArray();
            const ye = 1 / 8, De = ye / 6, Fe = ye ** 2 / 4, be = 1, Me = 2, Ee = 1, ze = 0, Be = 1, Ie = -1, er = -1, P = -1, U = -2, W = G[0][0], ee = G[0][1], ce = G[1][0], ue = G[1][1], me = G[2][0], ie = G[2][1], oe = W - ce, de = ce - me, Ue = me - W, He = ee - ue, je = ue - ie, lr = ie - ee, rr = -oe, dr = -de, hr = -Ue, mr = -He, wr = -je, Br = -lr, vt = .5 * (rr * lr - Ue * -He), Vt = 2 * vt, ur = 4 * vt, sr = .5 * I, et = vt * I, Fr = rr ** 2 + mr ** 2, br = dr ** 2 + wr ** 2, Oe = hr ** 2 + Br ** 2;
            H[0][0] = sr * je, H[0][2] = sr * dr, H[1][1] = sr * dr, H[1][2] = sr * je, H[2][0] = sr * je * (Br - mr) * De, H[2][1] = sr * dr * (Ue - oe) * De, H[2][2] = sr * (Ue * Br - oe * mr) * 2 * De, H[3][0] = sr * lr, H[3][2] = sr * hr, H[4][1] = sr * hr, H[4][2] = sr * lr, H[5][0] = sr * lr * (mr - wr) * De, H[5][1] = sr * hr * (oe - de) * De, H[5][2] = sr * (oe * mr - de * wr) * 2 * De, H[6][0] = sr * He, H[6][2] = sr * rr, H[7][1] = sr * rr, H[7][2] = sr * He, H[8][0] = sr * He * (wr - Br) * De, H[8][1] = sr * rr * (de - Ue) * De, H[8][2] = sr * (de * wr - Ue * Br) * 2 * De, Q = Ge(Ge(_e(H), R), Xr(_e(H))).toArray(), Q = Ge(_e(Q), 1 / et).toArray(), Y[0][0] = dr / ur, Y[0][1] = wr / ur, Y[0][2] = 1, Y[0][3] = hr / ur, Y[0][4] = Br / ur, Y[0][6] = rr / ur, Y[0][7] = mr / ur, Y[1][0] = dr / ur, Y[1][1] = wr / ur, Y[1][3] = hr / ur, Y[1][4] = Br / ur, Y[1][5] = 1, Y[1][6] = rr / ur, Y[1][7] = mr / ur, Y[2][0] = dr / ur, Y[2][1] = wr / ur, Y[2][3] = hr / ur, Y[2][4] = Br / ur, Y[2][6] = rr / ur, Y[2][7] = mr / ur, Y[2][8] = 1;
            const Or = 1 / (vt * ur);
            re[0][0] = Or * je * Br * Fr, re[0][1] = Or * lr * mr * br, re[0][2] = Or * He * wr * Oe, re[1][0] = Or * de * hr * Fr, re[1][1] = Or * Ue * rr * br, re[1][2] = Or * oe * dr * Oe, re[2][0] = Or * (je * Ue + dr * Br) * Fr, re[2][1] = Or * (lr * oe + hr * mr) * br, re[2][2] = Or * (He * de + rr * wr) * Oe;
            const Ye = Vt / 3;
            j[0][0] = Ye * be / Fr, j[0][1] = Ye * Me / Fr, j[0][2] = Ye * Ee / Fr, j[1][0] = Ye * ze / br, j[1][1] = Ye * Be / br, j[1][2] = Ye * Ie / br, j[2][0] = Ye * er / Oe, j[2][1] = Ye * P / Oe, j[2][2] = Ye * U / Oe, X[0][0] = Ye * U / Fr, X[0][1] = Ye * er / Fr, X[0][2] = Ye * P / Fr, X[1][0] = Ye * Ee / br, X[1][1] = Ye * be / br, X[1][2] = Ye * Me / br, X[2][0] = Ye * Ie / Oe, X[2][1] = Ye * ze / Oe, X[2][2] = Ye * Be / Oe, K[0][0] = Ye * Be / Fr, K[0][1] = Ye * Ie / Fr, K[0][2] = Ye * ze / Fr, K[1][0] = Ye * P / br, K[1][1] = Ye * U / br, K[1][2] = Ye * er / br, K[2][0] = Ye * Me / Oe, K[2][1] = Ye * Ee / Oe, K[2][2] = Ye * be / Oe, fe = Ge(Gr(_e(j), _e(X)), .5).toArray(), ae = Ge(Gr(_e(X), _e(K)), .5).toArray(), pe = Ge(Gr(_e(K), _e(j)), .5).toArray();
            const $r = Ge(Ge(Xr(_e(re)), R), _e(re));
            return le = Gr(Gr(Ge(Ge(Xr(_e(fe)), $r), _e(fe)), Ge(Ge(Xr(_e(ae)), $r), _e(ae))), Ge(Ge(Xr(_e(pe)), $r), _e(pe))).toArray(), le = Ge(_e(le), 3 / 4 * Fe * et).toArray(), te = Ge(Ge(Xr(_e(Y)), _e(le)), _e(Y)).toArray(), Z = Gr(_e(Q), _e(te)).toArray(), Z;
        }
    }
    function eh(e) {
        const [r, t, n] = e, i = [
            t[0] - r[0],
            t[1] - r[1],
            t[2] - r[2]
        ], a = [
            n[0] - r[0],
            n[1] - r[1],
            n[2] - r[2]
        ], o = mo(i, a), u = mi(o);
        if (u < 1e-12) return [
            [
                0,
                0
            ],
            [
                0,
                0
            ],
            [
                0,
                0
            ]
        ];
        const c = jt(o, 1 / u), s = [
            1,
            0,
            0
        ], l = [
            0,
            0,
            1
        ], v = en(c, s);
        let h = Math.abs(v) > 1 - 1e-10 ? go(l, jt(c, en(c, l))) : go(s, jt(c, v));
        const p = mi(h);
        if (p < 1e-12) return [
            [
                0,
                0
            ],
            [
                0,
                0
            ],
            [
                0,
                0
            ]
        ];
        h = jt(h, 1 / p);
        let g = mo(c, h);
        const d = mi(g);
        return d < 1e-12 ? [
            [
                0,
                0
            ],
            [
                0,
                0
            ],
            [
                0,
                0
            ]
        ] : (g = jt(g, 1 / d), e.map((y)=>{
            const D = [
                y[0] - r[0],
                y[1] - r[1],
                y[2] - r[2]
            ];
            return [
                en(D, h),
                en(D, g)
            ];
        }));
    }
    function en(e, r) {
        return e[0] * r[0] + e[1] * r[1] + e[2] * r[2];
    }
    function mo(e, r) {
        return [
            e[1] * r[2] - e[2] * r[1],
            e[2] * r[0] - e[0] * r[2],
            e[0] * r[1] - e[1] * r[0]
        ];
    }
    function mi(e) {
        return Math.sqrt(en(e, e));
    }
    function jt(e, r) {
        return [
            e[0] * r,
            e[1] * r,
            e[2] * r
        ];
    }
    function go(e, r) {
        return [
            e[0] - r[0],
            e[1] - r[1],
            e[2] - r[2]
        ];
    }
    function rh(e) {
        const r = po.get(e);
        if (r) return r;
        const t = Vu(e);
        th(e, t.B, t.A, t.t);
        const n = {
            t: t.t,
            bendingStiffnessMatrix: _e(t.D),
            shearStiffnessMatrix: _e(t.S),
            inPlaneConstitutiveMatrix: Ge(_e(t.A), 1 / t.t)
        };
        return po.set(e, n), n;
    }
    function th(e, r, t, n) {
        if (!(e.options.strictSymmetryForElement ?? !0)) return;
        const a = e.options.symmetryTolerance ?? 1e-6, o = Do(r), u = Math.max(1e-12, Do(t) * n);
        if (o / u > a) throw new Error("Unsymmetric laminate requires A–B–D coupling; not supported yet.");
    }
    function nh(e, r) {
        const t = [
            [
                0,
                1,
                5
            ],
            [
                6,
                7,
                11
            ],
            [
                12,
                13,
                17
            ]
        ];
        for(let n = 0; n < 3; n++)for(let i = 0; i < 3; i++){
            const a = t[n][i];
            for(let o = 0; o < 3; o++)for(let u = 0; u < 3; u++){
                const c = t[o][u];
                e[a][c] += r[n * 3 + i][o * 3 + u];
            }
        }
    }
    function Do(e) {
        let r = 0;
        for(let t = 0; t < e.length; t++)for(let n = 0; n < e[0].length; n++)r += e[t][n] ** 2;
        return Math.sqrt(r);
    }
    function ih(e, r) {
        const t = e / (1 - r * r);
        return _e([
            [
                t,
                t * r,
                0
            ],
            [
                t * r,
                t,
                0
            ],
            [
                0,
                0,
                t * (1 - r) / 2
            ]
        ]);
    }
    function ah(e, r, t, n) {
        const i = r * n / e, a = 1 - n * i, o = e / a, u = r / a, c = n * r / a;
        return _e([
            [
                o,
                c,
                0
            ],
            [
                c,
                u,
                0
            ],
            [
                0,
                0,
                t
            ]
        ]);
    }
    async function oh(e = {}) {
        var r;
        (function() {
            function f(ge) {
                ge = ge.split("-")[0];
                for(var xe = ge.split(".").slice(0, 3); xe.length < 3;)xe.push("00");
                return xe = xe.map((Ve, Xe, Te)=>Ve.padStart(2, "0")), xe.join("");
            }
            var m = (ge)=>[
                    ge / 1e4 | 0,
                    (ge / 100 | 0) % 100,
                    ge % 100
                ].join("."), A = 2147483647, B = typeof process < "u" && process.versions?.node ? f(process.versions.node) : A;
            if (B < 16e4) throw new Error(`This emscripten-generated code requires node v${m(16e4)} (detected v${m(B)})`);
            var O = typeof navigator < "u" && navigator.userAgent;
            if (O) {
                var V = O.includes("Safari/") && !O.includes("Chrome/") && O.match(/Version\/(\d+\.?\d*\.?\d*)/) ? f(O.match(/Version\/(\d+\.?\d*\.?\d*)/)[1]) : A;
                if (V < 15e4) throw new Error(`This emscripten-generated code requires Safari v${m(15e4)} (detected v${V})`);
                var J = O.match(/Firefox\/(\d+(?:\.\d+)?)/) ? parseFloat(O.match(/Firefox\/(\d+(?:\.\d+)?)/)[1]) : A;
                if (J < 79) throw new Error(`This emscripten-generated code requires Firefox v79 (detected v${J})`);
                var ne = O.match(/Chrome\/(\d+(?:\.\d+)?)/) ? parseFloat(O.match(/Chrome\/(\d+(?:\.\d+)?)/)[1]) : A;
                if (ne < 85) throw new Error(`This emscripten-generated code requires Chrome v85 (detected v${ne})`);
            }
        })();
        var t = e, n = !!globalThis.window, i = !!globalThis.WorkerGlobalScope, a = globalThis.process?.versions?.node && globalThis.process?.type != "renderer", o = !n && !a && !i;
        if (a) {
            const { createRequire: f } = await Promise.resolve().then(function() {
                return Dd;
            });
            var u = f(import.meta.url);
        }
        var c = "./this.program", s = import.meta.url, l = "";
        function v(f) {
            return t.locateFile ? t.locateFile(f, l) : l + f;
        }
        var h, p;
        if (a) {
            if (!(globalThis.process?.versions?.node && globalThis.process?.type != "renderer")) throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
            var g = u("node:fs");
            s.startsWith("file:") && (l = u("node:path").dirname(u("node:url").fileURLToPath(s)) + "/"), p = (m)=>{
                m = M(m) ? new URL(m) : m;
                var A = g.readFileSync(m);
                return E(Buffer.isBuffer(A)), A;
            }, h = async (m, A = !0)=>{
                m = M(m) ? new URL(m) : m;
                var B = g.readFileSync(m, A ? void 0 : "utf8");
                return E(A ? Buffer.isBuffer(B) : typeof B == "string"), B;
            }, process.argv.length > 1 && (c = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2);
        } else if (!o) if (n || i) {
            try {
                l = new URL(".", s).href;
            } catch  {}
            if (!(globalThis.window || globalThis.WorkerGlobalScope)) throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
            i && (p = (f)=>{
                var m = new XMLHttpRequest;
                return m.open("GET", f, !1), m.responseType = "arraybuffer", m.send(null), new Uint8Array(m.response);
            }), h = async (f)=>{
                if (M(f)) return new Promise((A, B)=>{
                    var O = new XMLHttpRequest;
                    O.open("GET", f, !0), O.responseType = "arraybuffer", O.onload = ()=>{
                        if (O.status == 200 || O.status == 0 && O.response) {
                            A(O.response);
                            return;
                        }
                        B(O.status);
                    }, O.onerror = B, O.send(null);
                });
                var m = await fetch(f, {
                    credentials: "same-origin"
                });
                if (m.ok) return m.arrayBuffer();
                throw new Error(m.status + " : " + m.url);
            };
        } else throw new Error("environment detection error");
        var d = console.log.bind(console), y = console.error.bind(console);
        E(!o, "shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");
        var D;
        globalThis.WebAssembly || y("no native wasm support detected");
        var b = !1;
        function E(f, m) {
            f || re("Assertion failed" + (m ? ": " + m : ""));
        }
        var M = (f)=>f.startsWith("file://");
        function F() {
            var f = si();
            E((f & 3) == 0), f == 0 && (f += 4), R[f >> 2] = 34821223, R[f + 4 >> 2] = 2310721022, R[0] = 1668509029;
        }
        function w() {
            if (!b) {
                var f = si();
                f == 0 && (f += 4);
                var m = R[f >> 2], A = R[f + 4 >> 2];
                (m != 34821223 || A != 2310721022) && re(`Stack overflow! Stack cookie has been overwritten at ${Be(f)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${Be(A)} ${Be(m)}`), R[0] != 1668509029 && re("Runtime error: The application has corrupted its heap memory area (address zero)!");
            }
        }
        (()=>{
            var f = new Int16Array(1), m = new Int8Array(f.buffer);
            f[0] = 25459, (m[0] !== 115 || m[1] !== 99) && re("Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)");
        })();
        function N(f) {
            Object.getOwnPropertyDescriptor(t, f) || Object.defineProperty(t, f, {
                configurable: !0,
                set () {
                    re(`Attempt to set \`Module.${f}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`);
                }
            });
        }
        function S(f) {
            return ()=>E(!1, `call to '${f}' via reference taken before Wasm module initialization`);
        }
        function _(f) {
            Object.getOwnPropertyDescriptor(t, f) && re(`\`Module.${f}\` was supplied but \`${f}\` not included in INCOMING_MODULE_JS_API`);
        }
        function x(f) {
            return f === "FS_createPath" || f === "FS_createDataFile" || f === "FS_createPreloadedFile" || f === "FS_preloadFile" || f === "FS_unlink" || f === "addRunDependency" || f === "FS_createLazyFile" || f === "FS_createDevice" || f === "removeRunDependency";
        }
        function T(f) {
            z(f);
        }
        function z(f) {
            Object.getOwnPropertyDescriptor(t, f) || Object.defineProperty(t, f, {
                configurable: !0,
                get () {
                    var m = `'${f}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
                    x(f) && (m += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"), re(m);
                }
            });
        }
        var q, $, k, L, G, R, I, Z = !1;
        function te() {
            var f = yn.buffer;
            k = new Int8Array(f), t.HEAPU8 = L = new Uint8Array(f), G = new Int32Array(f), t.HEAPU32 = R = new Uint32Array(f), t.HEAPF64 = new Float64Array(f), I = new BigInt64Array(f), new BigUint64Array(f);
        }
        E(globalThis.Int32Array && globalThis.Float64Array && Int32Array.prototype.subarray && Int32Array.prototype.set, "JS engine does not provide full typed array support");
        function Q() {
            if (t.preRun) for(typeof t.preRun == "function" && (t.preRun = [
                t.preRun
            ]); t.preRun.length;)ze(t.preRun.shift());
            N("preRun"), Fe(Ee);
        }
        function H() {
            E(!Z), Z = !0, w(), !t.noFSInit && !C.initialized && C.init(), xt.__wasm_call_ctors(), C.ignorePermissions = !1;
        }
        function Y() {
            if (w(), t.postRun) for(typeof t.postRun == "function" && (t.postRun = [
                t.postRun
            ]); t.postRun.length;)Me(t.postRun.shift());
            N("postRun"), Fe(be);
        }
        function re(f) {
            t.onAbort?.(f), f = "Aborted(" + f + ")", y(f), b = !0;
            var m = new WebAssembly.RuntimeError(f);
            throw $?.(m), m;
        }
        function j(f, m) {
            return (...A)=>{
                E(Z, `native function \`${f}\` called before runtime initialization`);
                var B = xt[f];
                return E(B, `exported native function \`${f}\` not found`), E(A.length <= m, `native function \`${f}\` called with ${A.length} args but expects ${m}`), B(...A);
            };
        }
        var X;
        function K() {
            return t.locateFile ? v("deform.wasm") : new URL("" + new URL("deform-8pxBPo8Q.wasm", import.meta.url).href, import.meta.url).href;
        }
        function fe(f) {
            if (f == X && D) return new Uint8Array(D);
            if (p) return p(f);
            throw "both async and sync fetching of the wasm failed";
        }
        async function ae(f) {
            if (!D) try {
                var m = await h(f);
                return new Uint8Array(m);
            } catch  {}
            return fe(f);
        }
        async function pe(f, m) {
            try {
                var A = await ae(f), B = await WebAssembly.instantiate(A, m);
                return B;
            } catch (O) {
                y(`failed to asynchronously prepare wasm: ${O}`), M(f) && y(`warning: Loading from a file URI (${f}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`), re(O);
            }
        }
        async function le(f, m, A) {
            if (!f && !M(m) && !a) try {
                var B = fetch(m, {
                    credentials: "same-origin"
                }), O = await WebAssembly.instantiateStreaming(B, A);
                return O;
            } catch (V) {
                y(`wasm streaming compile failed: ${V}`), y("falling back to ArrayBuffer instantiation");
            }
            return pe(m, A);
        }
        function ye() {
            var f = {
                env: Qi,
                wasi_snapshot_preview1: Qi
            };
            return f;
        }
        async function De() {
            function f(J, ne) {
                return xt = J.exports, Gu(xt), te(), xt;
            }
            var m = t;
            function A(J) {
                return E(t === m, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"), m = null, f(J.instance);
            }
            var B = ye();
            if (t.instantiateWasm) return new Promise((J, ne)=>{
                try {
                    t.instantiateWasm(B, (ge, xe)=>{
                        J(f(ge, xe));
                    });
                } catch (ge) {
                    y(`Module.instantiateWasm callback failed with error: ${ge}`), ne(ge);
                }
            });
            X ??= K();
            var O = await le(D, X, B), V = A(O);
            return V;
        }
        var Fe = (f)=>{
            for(; f.length > 0;)f.shift()(t);
        }, be = [], Me = (f)=>be.push(f), Ee = [], ze = (f)=>Ee.push(f), Be = (f)=>(E(typeof f == "number", `ptrToString expects a number, got ${typeof f}`), f >>>= 0, "0x" + f.toString(16).padStart(8, "0")), Ie = (f)=>{
            Ie.shown ||= {}, Ie.shown[f] || (Ie.shown[f] = 1, a && (f = "warning: " + f), y(f));
        }, er = globalThis.TextDecoder && new TextDecoder, P = (f, m, A, B)=>{
            for(var O = m + A; f[m] && !(m >= O);)++m;
            return m;
        }, U = (f, m = 0, A, B)=>{
            var O = P(f, m, A);
            if (O - m > 16 && f.buffer && er) return er.decode(f.subarray(m, O));
            for(var V = ""; m < O;){
                var J = f[m++];
                if (!(J & 128)) {
                    V += String.fromCharCode(J);
                    continue;
                }
                var ne = f[m++] & 63;
                if ((J & 224) == 192) {
                    V += String.fromCharCode((J & 31) << 6 | ne);
                    continue;
                }
                var ge = f[m++] & 63;
                if ((J & 240) == 224 ? J = (J & 15) << 12 | ne << 6 | ge : ((J & 248) != 240 && Ie("Invalid UTF-8 leading byte " + Be(J) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"), J = (J & 7) << 18 | ne << 12 | ge << 6 | f[m++] & 63), J < 65536) V += String.fromCharCode(J);
                else {
                    var xe = J - 65536;
                    V += String.fromCharCode(55296 | xe >> 10, 56320 | xe & 1023);
                }
            }
            return V;
        }, W = (f, m, A)=>(E(typeof f == "number", `UTF8ToString expects a number (got ${typeof f})`), f ? U(L, f, m) : ""), ee = (f, m, A, B)=>re(`Assertion failed: ${W(f)}, at: ` + [
                m ? W(m) : "unknown filename",
                A,
                B ? W(B) : "unknown function"
            ]);
        class ce {
            constructor(m){
                this.excPtr = m, this.ptr = m - 24;
            }
            set_type(m) {
                R[this.ptr + 4 >> 2] = m;
            }
            get_type() {
                return R[this.ptr + 4 >> 2];
            }
            set_destructor(m) {
                R[this.ptr + 8 >> 2] = m;
            }
            get_destructor() {
                return R[this.ptr + 8 >> 2];
            }
            set_caught(m) {
                m = m ? 1 : 0, k[this.ptr + 12] = m;
            }
            get_caught() {
                return k[this.ptr + 12] != 0;
            }
            set_rethrown(m) {
                m = m ? 1 : 0, k[this.ptr + 13] = m;
            }
            get_rethrown() {
                return k[this.ptr + 13] != 0;
            }
            init(m, A) {
                this.set_adjusted_ptr(0), this.set_type(m), this.set_destructor(A);
            }
            set_adjusted_ptr(m) {
                R[this.ptr + 16 >> 2] = m;
            }
            get_adjusted_ptr() {
                return R[this.ptr + 16 >> 2];
            }
        }
        var ue = (f, m, A)=>{
            var B = new ce(f);
            B.init(m, A), E(!1, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
        }, me = ()=>re("native code called abort()"), ie = (f, m, A, B)=>{
            if (E(typeof f == "string", `stringToUTF8Array expects a string (got ${typeof f})`), !(B > 0)) return 0;
            for(var O = A, V = A + B - 1, J = 0; J < f.length; ++J){
                var ne = f.codePointAt(J);
                if (ne <= 127) {
                    if (A >= V) break;
                    m[A++] = ne;
                } else if (ne <= 2047) {
                    if (A + 1 >= V) break;
                    m[A++] = 192 | ne >> 6, m[A++] = 128 | ne & 63;
                } else if (ne <= 65535) {
                    if (A + 2 >= V) break;
                    m[A++] = 224 | ne >> 12, m[A++] = 128 | ne >> 6 & 63, m[A++] = 128 | ne & 63;
                } else {
                    if (A + 3 >= V) break;
                    ne > 1114111 && Ie("Invalid Unicode code point " + Be(ne) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF)."), m[A++] = 240 | ne >> 18, m[A++] = 128 | ne >> 12 & 63, m[A++] = 128 | ne >> 6 & 63, m[A++] = 128 | ne & 63, J++;
                }
            }
            return m[A] = 0, A - O;
        }, oe = (f, m, A)=>(E(typeof A == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"), ie(f, L, m, A)), de = (f)=>{
            for(var m = 0, A = 0; A < f.length; ++A){
                var B = f.charCodeAt(A);
                B <= 127 ? m++ : B <= 2047 ? m += 2 : B >= 55296 && B <= 57343 ? (m += 4, ++A) : m += 3;
            }
            return m;
        }, Ue = (f, m, A, B)=>{
            var O = new Date().getFullYear(), V = new Date(O, 0, 1), J = new Date(O, 6, 1), ne = V.getTimezoneOffset(), ge = J.getTimezoneOffset(), xe = Math.max(ne, ge);
            R[f >> 2] = xe * 60, G[m >> 2] = +(ne != ge);
            var Ve = ($e)=>{
                var pr = $e >= 0 ? "-" : "+", Ir = Math.abs($e), Rr = String(Math.floor(Ir / 60)).padStart(2, "0"), Tr = String(Ir % 60).padStart(2, "0");
                return `UTC${pr}${Rr}${Tr}`;
            }, Xe = Ve(ne), Te = Ve(ge);
            E(Xe), E(Te), E(de(Xe) <= 16, `timezone name truncated to fit in TZNAME_MAX (${Xe})`), E(de(Te) <= 16, `timezone name truncated to fit in TZNAME_MAX (${Te})`), ge < ne ? (oe(Xe, A, 17), oe(Te, B, 17)) : (oe(Xe, B, 17), oe(Te, A, 17));
        }, He = ()=>performance.now(), je = ()=>Date.now(), lr = (f)=>f >= 0 && f <= 3, rr = 9007199254740992, dr = -9007199254740992, hr = (f)=>f < dr || f > rr ? NaN : Number(f);
        function mr(f, m, A) {
            if (!lr(f)) return 28;
            var B;
            f === 0 ? B = je() : B = He();
            var O = Math.round(B * 1e3 * 1e3);
            return I[A >> 3] = BigInt(O), 0;
        }
        var wr = ()=>2147483648, Br = (f, m)=>(E(m, "alignment argument is required"), Math.ceil(f / m) * m), vt = (f)=>{
            var m = yn.buffer.byteLength, A = (f - m + 65535) / 65536 | 0;
            try {
                return yn.grow(A), te(), 1;
            } catch (B) {
                y(`growMemory: Attempted to grow heap from ${m} bytes to ${f} bytes, but got error: ${B}`);
            }
        }, Vt = (f)=>{
            var m = L.length;
            f >>>= 0, E(f > m);
            var A = wr();
            if (f > A) return y(`Cannot enlarge memory, requested ${f} bytes, but the limit is ${A} bytes!`), !1;
            for(var B = 1; B <= 4; B *= 2){
                var O = m * (1 + .2 / B);
                O = Math.min(O, f + 100663296);
                var V = Math.min(A, Br(Math.max(f, O), 65536)), J = vt(V);
                if (J) return !0;
            }
            return y(`Failed to grow the heap from ${m} bytes to ${V} bytes, not enough memory!`), !1;
        }, ur = {}, sr = ()=>c || "./this.program", et = ()=>{
            if (!et.strings) {
                var f = (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8", m = {
                    USER: "web_user",
                    LOGNAME: "web_user",
                    PATH: "/",
                    PWD: "/",
                    HOME: "/home/web_user",
                    LANG: f,
                    _: sr()
                };
                for(var A in ur)ur[A] === void 0 ? delete m[A] : m[A] = ur[A];
                var B = [];
                for(var A in m)B.push(`${A}=${m[A]}`);
                et.strings = B;
            }
            return et.strings;
        }, Fr = (f, m)=>{
            var A = 0, B = 0;
            for (var O of et()){
                var V = m + A;
                R[f + B >> 2] = V, A += oe(O, V, 1 / 0) + 1, B += 4;
            }
            return 0;
        }, br = (f, m)=>{
            var A = et();
            R[f >> 2] = A.length;
            var B = 0;
            for (var O of A)B += de(O) + 1;
            return R[m >> 2] = B, 0;
        }, Oe = {
            isAbs: (f)=>f.charAt(0) === "/",
            splitPath: (f)=>{
                var m = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
                return m.exec(f).slice(1);
            },
            normalizeArray: (f, m)=>{
                for(var A = 0, B = f.length - 1; B >= 0; B--){
                    var O = f[B];
                    O === "." ? f.splice(B, 1) : O === ".." ? (f.splice(B, 1), A++) : A && (f.splice(B, 1), A--);
                }
                if (m) for(; A; A--)f.unshift("..");
                return f;
            },
            normalize: (f)=>{
                var m = Oe.isAbs(f), A = f.slice(-1) === "/";
                return f = Oe.normalizeArray(f.split("/").filter((B)=>!!B), !m).join("/"), !f && !m && (f = "."), f && A && (f += "/"), (m ? "/" : "") + f;
            },
            dirname: (f)=>{
                var m = Oe.splitPath(f), A = m[0], B = m[1];
                return !A && !B ? "." : (B && (B = B.slice(0, -1)), A + B);
            },
            basename: (f)=>f && f.match(/([^\/]+|\/)\/*$/)[1],
            join: (...f)=>Oe.normalize(f.join("/")),
            join2: (f, m)=>Oe.normalize(f + "/" + m)
        }, Or = ()=>{
            if (a) {
                var f = u("node:crypto");
                return (m)=>f.randomFillSync(m);
            }
            return (m)=>crypto.getRandomValues(m);
        }, Ye = (f)=>{
            (Ye = Or())(f);
        }, $r = {
            resolve: (...f)=>{
                for(var m = "", A = !1, B = f.length - 1; B >= -1 && !A; B--){
                    var O = B >= 0 ? f[B] : C.cwd();
                    if (typeof O != "string") throw new TypeError("Arguments to path.resolve must be strings");
                    if (!O) return "";
                    m = O + "/" + m, A = Oe.isAbs(O);
                }
                return m = Oe.normalizeArray(m.split("/").filter((V)=>!!V), !A).join("/"), (A ? "/" : "") + m || ".";
            },
            relative: (f, m)=>{
                f = $r.resolve(f).slice(1), m = $r.resolve(m).slice(1);
                function A(xe) {
                    for(var Ve = 0; Ve < xe.length && xe[Ve] === ""; Ve++);
                    for(var Xe = xe.length - 1; Xe >= 0 && xe[Xe] === ""; Xe--);
                    return Ve > Xe ? [] : xe.slice(Ve, Xe - Ve + 1);
                }
                for(var B = A(f.split("/")), O = A(m.split("/")), V = Math.min(B.length, O.length), J = V, ne = 0; ne < V; ne++)if (B[ne] !== O[ne]) {
                    J = ne;
                    break;
                }
                for(var ge = [], ne = J; ne < B.length; ne++)ge.push("..");
                return ge = ge.concat(O.slice(J)), ge.join("/");
            }
        }, Zt = [], Yt = (f, m, A)=>{
            var B = de(f) + 1, O = new Array(B), V = ie(f, O, 0, O.length);
            return O.length = V, O;
        }, ri = ()=>{
            if (!Zt.length) {
                var f = null;
                if (a) {
                    var m = 256, A = Buffer.alloc(m), B = 0, O = process.stdin.fd;
                    try {
                        B = g.readSync(O, A, 0, m);
                    } catch (V) {
                        if (V.toString().includes("EOF")) B = 0;
                        else throw V;
                    }
                    B > 0 && (f = A.slice(0, B).toString("utf-8"));
                } else globalThis.window?.prompt && (f = window.prompt("Input: "), f !== null && (f += `
`));
                if (!f) return null;
                Zt = Yt(f);
            }
            return Zt.shift();
        }, nt = {
            ttys: [],
            init () {},
            shutdown () {},
            register (f, m) {
                nt.ttys[f] = {
                    input: [],
                    output: [],
                    ops: m
                }, C.registerDevice(f, nt.stream_ops);
            },
            stream_ops: {
                open (f) {
                    var m = nt.ttys[f.node.rdev];
                    if (!m) throw new C.ErrnoError(43);
                    f.tty = m, f.seekable = !1;
                },
                close (f) {
                    f.tty.ops.fsync(f.tty);
                },
                fsync (f) {
                    f.tty.ops.fsync(f.tty);
                },
                read (f, m, A, B, O) {
                    if (!f.tty || !f.tty.ops.get_char) throw new C.ErrnoError(60);
                    for(var V = 0, J = 0; J < B; J++){
                        var ne;
                        try {
                            ne = f.tty.ops.get_char(f.tty);
                        } catch  {
                            throw new C.ErrnoError(29);
                        }
                        if (ne === void 0 && V === 0) throw new C.ErrnoError(6);
                        if (ne == null) break;
                        V++, m[A + J] = ne;
                    }
                    return V && (f.node.atime = Date.now()), V;
                },
                write (f, m, A, B, O) {
                    if (!f.tty || !f.tty.ops.put_char) throw new C.ErrnoError(60);
                    try {
                        for(var V = 0; V < B; V++)f.tty.ops.put_char(f.tty, m[A + V]);
                    } catch  {
                        throw new C.ErrnoError(29);
                    }
                    return B && (f.node.mtime = f.node.ctime = Date.now()), V;
                }
            },
            default_tty_ops: {
                get_char (f) {
                    return ri();
                },
                put_char (f, m) {
                    m === null || m === 10 ? (d(U(f.output)), f.output = []) : m != 0 && f.output.push(m);
                },
                fsync (f) {
                    f.output?.length > 0 && (d(U(f.output)), f.output = []);
                },
                ioctl_tcgets (f) {
                    return {
                        c_iflag: 25856,
                        c_oflag: 5,
                        c_cflag: 191,
                        c_lflag: 35387,
                        c_cc: [
                            3,
                            28,
                            127,
                            21,
                            4,
                            0,
                            1,
                            0,
                            17,
                            19,
                            26,
                            0,
                            18,
                            15,
                            23,
                            22,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0
                        ]
                    };
                },
                ioctl_tcsets (f, m, A) {
                    return 0;
                },
                ioctl_tiocgwinsz (f) {
                    return [
                        24,
                        80
                    ];
                }
            },
            default_tty1_ops: {
                put_char (f, m) {
                    m === null || m === 10 ? (y(U(f.output)), f.output = []) : m != 0 && f.output.push(m);
                },
                fsync (f) {
                    f.output?.length > 0 && (y(U(f.output)), f.output = []);
                }
            }
        }, mn = (f)=>{
            re("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported");
        }, Re = {
            ops_table: null,
            mount (f) {
                return Re.createNode(null, "/", 16895, 0);
            },
            createNode (f, m, A, B) {
                if (C.isBlkdev(A) || C.isFIFO(A)) throw new C.ErrnoError(63);
                Re.ops_table ||= {
                    dir: {
                        node: {
                            getattr: Re.node_ops.getattr,
                            setattr: Re.node_ops.setattr,
                            lookup: Re.node_ops.lookup,
                            mknod: Re.node_ops.mknod,
                            rename: Re.node_ops.rename,
                            unlink: Re.node_ops.unlink,
                            rmdir: Re.node_ops.rmdir,
                            readdir: Re.node_ops.readdir,
                            symlink: Re.node_ops.symlink
                        },
                        stream: {
                            llseek: Re.stream_ops.llseek
                        }
                    },
                    file: {
                        node: {
                            getattr: Re.node_ops.getattr,
                            setattr: Re.node_ops.setattr
                        },
                        stream: {
                            llseek: Re.stream_ops.llseek,
                            read: Re.stream_ops.read,
                            write: Re.stream_ops.write,
                            mmap: Re.stream_ops.mmap,
                            msync: Re.stream_ops.msync
                        }
                    },
                    link: {
                        node: {
                            getattr: Re.node_ops.getattr,
                            setattr: Re.node_ops.setattr,
                            readlink: Re.node_ops.readlink
                        },
                        stream: {}
                    },
                    chrdev: {
                        node: {
                            getattr: Re.node_ops.getattr,
                            setattr: Re.node_ops.setattr
                        },
                        stream: C.chrdev_stream_ops
                    }
                };
                var O = C.createNode(f, m, A, B);
                return C.isDir(O.mode) ? (O.node_ops = Re.ops_table.dir.node, O.stream_ops = Re.ops_table.dir.stream, O.contents = {}) : C.isFile(O.mode) ? (O.node_ops = Re.ops_table.file.node, O.stream_ops = Re.ops_table.file.stream, O.usedBytes = 0, O.contents = null) : C.isLink(O.mode) ? (O.node_ops = Re.ops_table.link.node, O.stream_ops = Re.ops_table.link.stream) : C.isChrdev(O.mode) && (O.node_ops = Re.ops_table.chrdev.node, O.stream_ops = Re.ops_table.chrdev.stream), O.atime = O.mtime = O.ctime = Date.now(), f && (f.contents[m] = O, f.atime = f.mtime = f.ctime = O.atime), O;
            },
            getFileDataAsTypedArray (f) {
                return f.contents ? f.contents.subarray ? f.contents.subarray(0, f.usedBytes) : new Uint8Array(f.contents) : new Uint8Array(0);
            },
            expandFileStorage (f, m) {
                var A = f.contents ? f.contents.length : 0;
                if (!(A >= m)) {
                    var B = 1024 * 1024;
                    m = Math.max(m, A * (A < B ? 2 : 1.125) >>> 0), A != 0 && (m = Math.max(m, 256));
                    var O = f.contents;
                    f.contents = new Uint8Array(m), f.usedBytes > 0 && f.contents.set(O.subarray(0, f.usedBytes), 0);
                }
            },
            resizeFileStorage (f, m) {
                if (f.usedBytes != m) if (m == 0) f.contents = null, f.usedBytes = 0;
                else {
                    var A = f.contents;
                    f.contents = new Uint8Array(m), A && f.contents.set(A.subarray(0, Math.min(m, f.usedBytes))), f.usedBytes = m;
                }
            },
            node_ops: {
                getattr (f) {
                    var m = {};
                    return m.dev = C.isChrdev(f.mode) ? f.id : 1, m.ino = f.id, m.mode = f.mode, m.nlink = 1, m.uid = 0, m.gid = 0, m.rdev = f.rdev, C.isDir(f.mode) ? m.size = 4096 : C.isFile(f.mode) ? m.size = f.usedBytes : C.isLink(f.mode) ? m.size = f.link.length : m.size = 0, m.atime = new Date(f.atime), m.mtime = new Date(f.mtime), m.ctime = new Date(f.ctime), m.blksize = 4096, m.blocks = Math.ceil(m.size / m.blksize), m;
                },
                setattr (f, m) {
                    for (const A of [
                        "mode",
                        "atime",
                        "mtime",
                        "ctime"
                    ])m[A] != null && (f[A] = m[A]);
                    m.size !== void 0 && Re.resizeFileStorage(f, m.size);
                },
                lookup (f, m) {
                    throw new C.ErrnoError(44);
                },
                mknod (f, m, A, B) {
                    return Re.createNode(f, m, A, B);
                },
                rename (f, m, A) {
                    var B;
                    try {
                        B = C.lookupNode(m, A);
                    } catch  {}
                    if (B) {
                        if (C.isDir(f.mode)) for(var O in B.contents)throw new C.ErrnoError(55);
                        C.hashRemoveNode(B);
                    }
                    delete f.parent.contents[f.name], m.contents[A] = f, f.name = A, m.ctime = m.mtime = f.parent.ctime = f.parent.mtime = Date.now();
                },
                unlink (f, m) {
                    delete f.contents[m], f.ctime = f.mtime = Date.now();
                },
                rmdir (f, m) {
                    var A = C.lookupNode(f, m);
                    for(var B in A.contents)throw new C.ErrnoError(55);
                    delete f.contents[m], f.ctime = f.mtime = Date.now();
                },
                readdir (f) {
                    return [
                        ".",
                        "..",
                        ...Object.keys(f.contents)
                    ];
                },
                symlink (f, m, A) {
                    var B = Re.createNode(f, m, 41471, 0);
                    return B.link = A, B;
                },
                readlink (f) {
                    if (!C.isLink(f.mode)) throw new C.ErrnoError(28);
                    return f.link;
                }
            },
            stream_ops: {
                read (f, m, A, B, O) {
                    var V = f.node.contents;
                    if (O >= f.node.usedBytes) return 0;
                    var J = Math.min(f.node.usedBytes - O, B);
                    if (E(J >= 0), J > 8 && V.subarray) m.set(V.subarray(O, O + J), A);
                    else for(var ne = 0; ne < J; ne++)m[A + ne] = V[O + ne];
                    return J;
                },
                write (f, m, A, B, O, V) {
                    if (E(!(m instanceof ArrayBuffer)), m.buffer === k.buffer && (V = !1), !B) return 0;
                    var J = f.node;
                    if (J.mtime = J.ctime = Date.now(), m.subarray && (!J.contents || J.contents.subarray)) {
                        if (V) return E(O === 0, "canOwn must imply no weird position inside the file"), J.contents = m.subarray(A, A + B), J.usedBytes = B, B;
                        if (J.usedBytes === 0 && O === 0) return J.contents = m.slice(A, A + B), J.usedBytes = B, B;
                        if (O + B <= J.usedBytes) return J.contents.set(m.subarray(A, A + B), O), B;
                    }
                    if (Re.expandFileStorage(J, O + B), J.contents.subarray && m.subarray) J.contents.set(m.subarray(A, A + B), O);
                    else for(var ne = 0; ne < B; ne++)J.contents[O + ne] = m[A + ne];
                    return J.usedBytes = Math.max(J.usedBytes, O + B), B;
                },
                llseek (f, m, A) {
                    var B = m;
                    if (A === 1 ? B += f.position : A === 2 && C.isFile(f.node.mode) && (B += f.node.usedBytes), B < 0) throw new C.ErrnoError(28);
                    return B;
                },
                mmap (f, m, A, B, O) {
                    if (!C.isFile(f.node.mode)) throw new C.ErrnoError(43);
                    var V, J, ne = f.node.contents;
                    if (!(O & 2) && ne && ne.buffer === k.buffer) J = !1, V = ne.byteOffset;
                    else {
                        if (J = !0, V = mn(), !V) throw new C.ErrnoError(48);
                        ne && ((A > 0 || A + m < ne.length) && (ne.subarray ? ne = ne.subarray(A, A + m) : ne = Array.prototype.slice.call(ne, A, A + m)), k.set(ne, V));
                    }
                    return {
                        ptr: V,
                        allocated: J
                    };
                },
                msync (f, m, A, B, O) {
                    return Re.stream_ops.write(f, m, 0, B, A, !1), 0;
                }
            }
        }, ti = (f)=>{
            var m = {
                r: 0,
                "r+": 2,
                w: 577,
                "w+": 578,
                a: 1089,
                "a+": 1090
            }, A = m[f];
            if (typeof A > "u") throw new Error(`Unknown file open mode: ${f}`);
            return A;
        }, Qt = (f, m)=>{
            var A = 0;
            return f && (A |= 365), m && (A |= 146), A;
        }, ni = (f)=>W(Zi(f)), gn = {
            EPERM: 63,
            ENOENT: 44,
            ESRCH: 71,
            EINTR: 27,
            EIO: 29,
            ENXIO: 60,
            E2BIG: 1,
            ENOEXEC: 45,
            EBADF: 8,
            ECHILD: 12,
            EAGAIN: 6,
            EWOULDBLOCK: 6,
            ENOMEM: 48,
            EACCES: 2,
            EFAULT: 21,
            ENOTBLK: 105,
            EBUSY: 10,
            EEXIST: 20,
            EXDEV: 75,
            ENODEV: 43,
            ENOTDIR: 54,
            EISDIR: 31,
            EINVAL: 28,
            ENFILE: 41,
            EMFILE: 33,
            ENOTTY: 59,
            ETXTBSY: 74,
            EFBIG: 22,
            ENOSPC: 51,
            ESPIPE: 70,
            EROFS: 69,
            EMLINK: 34,
            EPIPE: 64,
            EDOM: 18,
            ERANGE: 68,
            ENOMSG: 49,
            EIDRM: 24,
            ECHRNG: 106,
            EL2NSYNC: 156,
            EL3HLT: 107,
            EL3RST: 108,
            ELNRNG: 109,
            EUNATCH: 110,
            ENOCSI: 111,
            EL2HLT: 112,
            EDEADLK: 16,
            ENOLCK: 46,
            EBADE: 113,
            EBADR: 114,
            EXFULL: 115,
            ENOANO: 104,
            EBADRQC: 103,
            EBADSLT: 102,
            EDEADLOCK: 16,
            EBFONT: 101,
            ENOSTR: 100,
            ENODATA: 116,
            ETIME: 117,
            ENOSR: 118,
            ENONET: 119,
            ENOPKG: 120,
            EREMOTE: 121,
            ENOLINK: 47,
            EADV: 122,
            ESRMNT: 123,
            ECOMM: 124,
            EPROTO: 65,
            EMULTIHOP: 36,
            EDOTDOT: 125,
            EBADMSG: 9,
            ENOTUNIQ: 126,
            EBADFD: 127,
            EREMCHG: 128,
            ELIBACC: 129,
            ELIBBAD: 130,
            ELIBSCN: 131,
            ELIBMAX: 132,
            ELIBEXEC: 133,
            ENOSYS: 52,
            ENOTEMPTY: 55,
            ENAMETOOLONG: 37,
            ELOOP: 32,
            EOPNOTSUPP: 138,
            EPFNOSUPPORT: 139,
            ECONNRESET: 15,
            ENOBUFS: 42,
            EAFNOSUPPORT: 5,
            EPROTOTYPE: 67,
            ENOTSOCK: 57,
            ENOPROTOOPT: 50,
            ESHUTDOWN: 140,
            ECONNREFUSED: 14,
            EADDRINUSE: 3,
            ECONNABORTED: 13,
            ENETUNREACH: 40,
            ENETDOWN: 38,
            ETIMEDOUT: 73,
            EHOSTDOWN: 142,
            EHOSTUNREACH: 23,
            EINPROGRESS: 26,
            EALREADY: 7,
            EDESTADDRREQ: 17,
            EMSGSIZE: 35,
            EPROTONOSUPPORT: 66,
            ESOCKTNOSUPPORT: 137,
            EADDRNOTAVAIL: 4,
            ENETRESET: 39,
            EISCONN: 30,
            ENOTCONN: 53,
            ETOOMANYREFS: 141,
            EUSERS: 136,
            EDQUOT: 19,
            ESTALE: 72,
            ENOTSUP: 138,
            ENOMEDIUM: 148,
            EILSEQ: 25,
            EOVERFLOW: 61,
            ECANCELED: 11,
            ENOTRECOVERABLE: 56,
            EOWNERDEAD: 62,
            ESTRPIPE: 135
        }, ii = async (f)=>{
            var m = await h(f);
            return E(m, `Loading data file "${f}" failed (no arrayBuffer).`), new Uint8Array(m);
        }, ai = (...f)=>C.createDataFile(...f), oi = (f)=>{
            for(var m = f;;){
                if (!dt[f]) return f;
                f = m + Math.random();
            }
        }, it = 0, At = null, dt = {}, xr = null, Qe = (f)=>{
            if (it--, t.monitorRunDependencies?.(it), E(f, "removeRunDependency requires an ID"), E(dt[f]), delete dt[f], it == 0 && (xr !== null && (clearInterval(xr), xr = null), At)) {
                var m = At;
                At = null, m();
            }
        }, Cr = (f)=>{
            it++, t.monitorRunDependencies?.(it), E(f, "addRunDependency requires an ID"), E(!dt[f]), dt[f] = 1, xr === null && globalThis.setInterval && (xr = setInterval(()=>{
                if (b) {
                    clearInterval(xr), xr = null;
                    return;
                }
                var m = !1;
                for(var A in dt)m || (m = !0, y("still waiting on run dependencies:")), y(`dependency: ${A}`);
                m && y("(end of list)");
            }, 1e4), xr.unref?.());
        }, Dn = [], Bt = async (f, m)=>{
            typeof Browser < "u" && Browser.init();
            for (var A of Dn)if (A.canHandle(m)) return E(A.handle.constructor.name === "AsyncFunction", "Filesystem plugin handlers must be async functions (See #24914)"), A.handle(f, m);
            return f;
        }, ht = async (f, m, A, B, O, V, J, ne)=>{
            var ge = m ? $r.resolve(Oe.join2(f, m)) : f, xe = oi(`cp ${ge}`);
            Cr(xe);
            try {
                var Ve = A;
                typeof A == "string" && (Ve = await ii(A)), Ve = await Bt(Ve, ge), ne?.(), V || ai(f, m, Ve, B, O, J);
            } finally{
                Qe(xe);
            }
        }, ui = (f, m, A, B, O, V, J, ne, ge, xe)=>{
            ht(f, m, A, B, O, ne, ge, xe).then(V).catch(J);
        }, C = {
            root: null,
            mounts: [],
            devices: {},
            streams: [],
            nextInode: 1,
            nameTable: null,
            currentPath: "/",
            initialized: !1,
            ignorePermissions: !0,
            filesystems: null,
            syncFSRequests: 0,
            readFiles: {},
            ErrnoError: class extends Error {
                name = "ErrnoError";
                constructor(f){
                    super(Z ? ni(f) : ""), this.errno = f;
                    for(var m in gn)if (gn[m] === f) {
                        this.code = m;
                        break;
                    }
                }
            },
            FSStream: class {
                shared = {};
                get object() {
                    return this.node;
                }
                set object(f) {
                    this.node = f;
                }
                get isRead() {
                    return (this.flags & 2097155) !== 1;
                }
                get isWrite() {
                    return (this.flags & 2097155) !== 0;
                }
                get isAppend() {
                    return this.flags & 1024;
                }
                get flags() {
                    return this.shared.flags;
                }
                set flags(f) {
                    this.shared.flags = f;
                }
                get position() {
                    return this.shared.position;
                }
                set position(f) {
                    this.shared.position = f;
                }
            },
            FSNode: class {
                node_ops = {};
                stream_ops = {};
                readMode = 365;
                writeMode = 146;
                mounted = null;
                constructor(f, m, A, B){
                    f || (f = this), this.parent = f, this.mount = f.mount, this.id = C.nextInode++, this.name = m, this.mode = A, this.rdev = B, this.atime = this.mtime = this.ctime = Date.now();
                }
                get read() {
                    return (this.mode & this.readMode) === this.readMode;
                }
                set read(f) {
                    f ? this.mode |= this.readMode : this.mode &= ~this.readMode;
                }
                get write() {
                    return (this.mode & this.writeMode) === this.writeMode;
                }
                set write(f) {
                    f ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
                }
                get isFolder() {
                    return C.isDir(this.mode);
                }
                get isDevice() {
                    return C.isChrdev(this.mode);
                }
            },
            lookupPath (f, m = {}) {
                if (!f) throw new C.ErrnoError(44);
                m.follow_mount ??= !0, Oe.isAbs(f) || (f = C.cwd() + "/" + f);
                e: for(var A = 0; A < 40; A++){
                    for(var B = f.split("/").filter((xe)=>!!xe), O = C.root, V = "/", J = 0; J < B.length; J++){
                        var ne = J === B.length - 1;
                        if (ne && m.parent) break;
                        if (B[J] !== ".") {
                            if (B[J] === "..") {
                                if (V = Oe.dirname(V), C.isRoot(O)) {
                                    f = V + "/" + B.slice(J + 1).join("/"), A--;
                                    continue e;
                                } else O = O.parent;
                                continue;
                            }
                            V = Oe.join2(V, B[J]);
                            try {
                                O = C.lookupNode(O, B[J]);
                            } catch (xe) {
                                if (xe?.errno === 44 && ne && m.noent_okay) return {
                                    path: V
                                };
                                throw xe;
                            }
                            if (C.isMountpoint(O) && (!ne || m.follow_mount) && (O = O.mounted.root), C.isLink(O.mode) && (!ne || m.follow)) {
                                if (!O.node_ops.readlink) throw new C.ErrnoError(52);
                                var ge = O.node_ops.readlink(O);
                                Oe.isAbs(ge) || (ge = Oe.dirname(V) + "/" + ge), f = ge + "/" + B.slice(J + 1).join("/");
                                continue e;
                            }
                        }
                    }
                    return {
                        path: V,
                        node: O
                    };
                }
                throw new C.ErrnoError(32);
            },
            getPath (f) {
                for(var m;;){
                    if (C.isRoot(f)) {
                        var A = f.mount.mountpoint;
                        return m ? A[A.length - 1] !== "/" ? `${A}/${m}` : A + m : A;
                    }
                    m = m ? `${f.name}/${m}` : f.name, f = f.parent;
                }
            },
            hashName (f, m) {
                for(var A = 0, B = 0; B < m.length; B++)A = (A << 5) - A + m.charCodeAt(B) | 0;
                return (f + A >>> 0) % C.nameTable.length;
            },
            hashAddNode (f) {
                var m = C.hashName(f.parent.id, f.name);
                f.name_next = C.nameTable[m], C.nameTable[m] = f;
            },
            hashRemoveNode (f) {
                var m = C.hashName(f.parent.id, f.name);
                if (C.nameTable[m] === f) C.nameTable[m] = f.name_next;
                else for(var A = C.nameTable[m]; A;){
                    if (A.name_next === f) {
                        A.name_next = f.name_next;
                        break;
                    }
                    A = A.name_next;
                }
            },
            lookupNode (f, m) {
                var A = C.mayLookup(f);
                if (A) throw new C.ErrnoError(A);
                for(var B = C.hashName(f.id, m), O = C.nameTable[B]; O; O = O.name_next){
                    var V = O.name;
                    if (O.parent.id === f.id && V === m) return O;
                }
                return C.lookup(f, m);
            },
            createNode (f, m, A, B) {
                E(typeof f == "object");
                var O = new C.FSNode(f, m, A, B);
                return C.hashAddNode(O), O;
            },
            destroyNode (f) {
                C.hashRemoveNode(f);
            },
            isRoot (f) {
                return f === f.parent;
            },
            isMountpoint (f) {
                return !!f.mounted;
            },
            isFile (f) {
                return (f & 61440) === 32768;
            },
            isDir (f) {
                return (f & 61440) === 16384;
            },
            isLink (f) {
                return (f & 61440) === 40960;
            },
            isChrdev (f) {
                return (f & 61440) === 8192;
            },
            isBlkdev (f) {
                return (f & 61440) === 24576;
            },
            isFIFO (f) {
                return (f & 61440) === 4096;
            },
            isSocket (f) {
                return (f & 49152) === 49152;
            },
            flagsToPermissionString (f) {
                var m = [
                    "r",
                    "w",
                    "rw"
                ][f & 3];
                return f & 512 && (m += "w"), m;
            },
            nodePermissions (f, m) {
                return C.ignorePermissions ? 0 : m.includes("r") && !(f.mode & 292) || m.includes("w") && !(f.mode & 146) || m.includes("x") && !(f.mode & 73) ? 2 : 0;
            },
            mayLookup (f) {
                if (!C.isDir(f.mode)) return 54;
                var m = C.nodePermissions(f, "x");
                return m || (f.node_ops.lookup ? 0 : 2);
            },
            mayCreate (f, m) {
                if (!C.isDir(f.mode)) return 54;
                try {
                    var A = C.lookupNode(f, m);
                    return 20;
                } catch  {}
                return C.nodePermissions(f, "wx");
            },
            mayDelete (f, m, A) {
                var B;
                try {
                    B = C.lookupNode(f, m);
                } catch (V) {
                    return V.errno;
                }
                var O = C.nodePermissions(f, "wx");
                if (O) return O;
                if (A) {
                    if (!C.isDir(B.mode)) return 54;
                    if (C.isRoot(B) || C.getPath(B) === C.cwd()) return 10;
                } else if (C.isDir(B.mode)) return 31;
                return 0;
            },
            mayOpen (f, m) {
                return f ? C.isLink(f.mode) ? 32 : C.isDir(f.mode) && (C.flagsToPermissionString(m) !== "r" || m & 576) ? 31 : C.nodePermissions(f, C.flagsToPermissionString(m)) : 44;
            },
            checkOpExists (f, m) {
                if (!f) throw new C.ErrnoError(m);
                return f;
            },
            MAX_OPEN_FDS: 4096,
            nextfd () {
                for(var f = 0; f <= C.MAX_OPEN_FDS; f++)if (!C.streams[f]) return f;
                throw new C.ErrnoError(33);
            },
            getStreamChecked (f) {
                var m = C.getStream(f);
                if (!m) throw new C.ErrnoError(8);
                return m;
            },
            getStream: (f)=>C.streams[f],
            createStream (f, m = -1) {
                return E(m >= -1), f = Object.assign(new C.FSStream, f), m == -1 && (m = C.nextfd()), f.fd = m, C.streams[m] = f, f;
            },
            closeStream (f) {
                C.streams[f] = null;
            },
            dupStream (f, m = -1) {
                var A = C.createStream(f, m);
                return A.stream_ops?.dup?.(A), A;
            },
            doSetAttr (f, m, A) {
                var B = f?.stream_ops.setattr, O = B ? f : m;
                B ??= m.node_ops.setattr, C.checkOpExists(B, 63), B(O, A);
            },
            chrdev_stream_ops: {
                open (f) {
                    var m = C.getDevice(f.node.rdev);
                    f.stream_ops = m.stream_ops, f.stream_ops.open?.(f);
                },
                llseek () {
                    throw new C.ErrnoError(70);
                }
            },
            major: (f)=>f >> 8,
            minor: (f)=>f & 255,
            makedev: (f, m)=>f << 8 | m,
            registerDevice (f, m) {
                C.devices[f] = {
                    stream_ops: m
                };
            },
            getDevice: (f)=>C.devices[f],
            getMounts (f) {
                for(var m = [], A = [
                    f
                ]; A.length;){
                    var B = A.pop();
                    m.push(B), A.push(...B.mounts);
                }
                return m;
            },
            syncfs (f, m) {
                typeof f == "function" && (m = f, f = !1), C.syncFSRequests++, C.syncFSRequests > 1 && y(`warning: ${C.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
                var A = C.getMounts(C.root.mount), B = 0;
                function O(ne) {
                    return E(C.syncFSRequests > 0), C.syncFSRequests--, m(ne);
                }
                function V(ne) {
                    if (ne) return V.errored ? void 0 : (V.errored = !0, O(ne));
                    ++B >= A.length && O(null);
                }
                for (var J of A)J.type.syncfs ? J.type.syncfs(J, f, V) : V(null);
            },
            mount (f, m, A) {
                if (typeof f == "string") throw f;
                var B = A === "/", O = !A, V;
                if (B && C.root) throw new C.ErrnoError(10);
                if (!B && !O) {
                    var J = C.lookupPath(A, {
                        follow_mount: !1
                    });
                    if (A = J.path, V = J.node, C.isMountpoint(V)) throw new C.ErrnoError(10);
                    if (!C.isDir(V.mode)) throw new C.ErrnoError(54);
                }
                var ne = {
                    type: f,
                    opts: m,
                    mountpoint: A,
                    mounts: []
                }, ge = f.mount(ne);
                return ge.mount = ne, ne.root = ge, B ? C.root = ge : V && (V.mounted = ne, V.mount && V.mount.mounts.push(ne)), ge;
            },
            unmount (f) {
                var m = C.lookupPath(f, {
                    follow_mount: !1
                });
                if (!C.isMountpoint(m.node)) throw new C.ErrnoError(28);
                var A = m.node, B = A.mounted, O = C.getMounts(B);
                for (var [V, J] of Object.entries(C.nameTable))for(; J;){
                    var ne = J.name_next;
                    O.includes(J.mount) && C.destroyNode(J), J = ne;
                }
                A.mounted = null;
                var ge = A.mount.mounts.indexOf(B);
                E(ge !== -1), A.mount.mounts.splice(ge, 1);
            },
            lookup (f, m) {
                return f.node_ops.lookup(f, m);
            },
            mknod (f, m, A) {
                var B = C.lookupPath(f, {
                    parent: !0
                }), O = B.node, V = Oe.basename(f);
                if (!V) throw new C.ErrnoError(28);
                if (V === "." || V === "..") throw new C.ErrnoError(20);
                var J = C.mayCreate(O, V);
                if (J) throw new C.ErrnoError(J);
                if (!O.node_ops.mknod) throw new C.ErrnoError(63);
                return O.node_ops.mknod(O, V, m, A);
            },
            statfs (f) {
                return C.statfsNode(C.lookupPath(f, {
                    follow: !0
                }).node);
            },
            statfsStream (f) {
                return C.statfsNode(f.node);
            },
            statfsNode (f) {
                var m = {
                    bsize: 4096,
                    frsize: 4096,
                    blocks: 1e6,
                    bfree: 5e5,
                    bavail: 5e5,
                    files: C.nextInode,
                    ffree: C.nextInode - 1,
                    fsid: 42,
                    flags: 2,
                    namelen: 255
                };
                return f.node_ops.statfs && Object.assign(m, f.node_ops.statfs(f.mount.opts.root)), m;
            },
            create (f, m = 438) {
                return m &= 4095, m |= 32768, C.mknod(f, m, 0);
            },
            mkdir (f, m = 511) {
                return m &= 1023, m |= 16384, C.mknod(f, m, 0);
            },
            mkdirTree (f, m) {
                var A = f.split("/"), B = "";
                for (var O of A)if (O) {
                    (B || Oe.isAbs(f)) && (B += "/"), B += O;
                    try {
                        C.mkdir(B, m);
                    } catch (V) {
                        if (V.errno != 20) throw V;
                    }
                }
            },
            mkdev (f, m, A) {
                return typeof A > "u" && (A = m, m = 438), m |= 8192, C.mknod(f, m, A);
            },
            symlink (f, m) {
                if (!$r.resolve(f)) throw new C.ErrnoError(44);
                var A = C.lookupPath(m, {
                    parent: !0
                }), B = A.node;
                if (!B) throw new C.ErrnoError(44);
                var O = Oe.basename(m), V = C.mayCreate(B, O);
                if (V) throw new C.ErrnoError(V);
                if (!B.node_ops.symlink) throw new C.ErrnoError(63);
                return B.node_ops.symlink(B, O, f);
            },
            rename (f, m) {
                var A = Oe.dirname(f), B = Oe.dirname(m), O = Oe.basename(f), V = Oe.basename(m), J, ne, ge;
                if (J = C.lookupPath(f, {
                    parent: !0
                }), ne = J.node, J = C.lookupPath(m, {
                    parent: !0
                }), ge = J.node, !ne || !ge) throw new C.ErrnoError(44);
                if (ne.mount !== ge.mount) throw new C.ErrnoError(75);
                var xe = C.lookupNode(ne, O), Ve = $r.relative(f, B);
                if (Ve.charAt(0) !== ".") throw new C.ErrnoError(28);
                if (Ve = $r.relative(m, A), Ve.charAt(0) !== ".") throw new C.ErrnoError(55);
                var Xe;
                try {
                    Xe = C.lookupNode(ge, V);
                } catch  {}
                if (xe !== Xe) {
                    var Te = C.isDir(xe.mode), $e = C.mayDelete(ne, O, Te);
                    if ($e) throw new C.ErrnoError($e);
                    if ($e = Xe ? C.mayDelete(ge, V, Te) : C.mayCreate(ge, V), $e) throw new C.ErrnoError($e);
                    if (!ne.node_ops.rename) throw new C.ErrnoError(63);
                    if (C.isMountpoint(xe) || Xe && C.isMountpoint(Xe)) throw new C.ErrnoError(10);
                    if (ge !== ne && ($e = C.nodePermissions(ne, "w"), $e)) throw new C.ErrnoError($e);
                    C.hashRemoveNode(xe);
                    try {
                        ne.node_ops.rename(xe, ge, V), xe.parent = ge;
                    } catch (pr) {
                        throw pr;
                    } finally{
                        C.hashAddNode(xe);
                    }
                }
            },
            rmdir (f) {
                var m = C.lookupPath(f, {
                    parent: !0
                }), A = m.node, B = Oe.basename(f), O = C.lookupNode(A, B), V = C.mayDelete(A, B, !0);
                if (V) throw new C.ErrnoError(V);
                if (!A.node_ops.rmdir) throw new C.ErrnoError(63);
                if (C.isMountpoint(O)) throw new C.ErrnoError(10);
                A.node_ops.rmdir(A, B), C.destroyNode(O);
            },
            readdir (f) {
                var m = C.lookupPath(f, {
                    follow: !0
                }), A = m.node, B = C.checkOpExists(A.node_ops.readdir, 54);
                return B(A);
            },
            unlink (f) {
                var m = C.lookupPath(f, {
                    parent: !0
                }), A = m.node;
                if (!A) throw new C.ErrnoError(44);
                var B = Oe.basename(f), O = C.lookupNode(A, B), V = C.mayDelete(A, B, !1);
                if (V) throw new C.ErrnoError(V);
                if (!A.node_ops.unlink) throw new C.ErrnoError(63);
                if (C.isMountpoint(O)) throw new C.ErrnoError(10);
                A.node_ops.unlink(A, B), C.destroyNode(O);
            },
            readlink (f) {
                var m = C.lookupPath(f), A = m.node;
                if (!A) throw new C.ErrnoError(44);
                if (!A.node_ops.readlink) throw new C.ErrnoError(28);
                return A.node_ops.readlink(A);
            },
            stat (f, m) {
                var A = C.lookupPath(f, {
                    follow: !m
                }), B = A.node, O = C.checkOpExists(B.node_ops.getattr, 63);
                return O(B);
            },
            fstat (f) {
                var m = C.getStreamChecked(f), A = m.node, B = m.stream_ops.getattr, O = B ? m : A;
                return B ??= A.node_ops.getattr, C.checkOpExists(B, 63), B(O);
            },
            lstat (f) {
                return C.stat(f, !0);
            },
            doChmod (f, m, A, B) {
                C.doSetAttr(f, m, {
                    mode: A & 4095 | m.mode & -4096,
                    ctime: Date.now(),
                    dontFollow: B
                });
            },
            chmod (f, m, A) {
                var B;
                if (typeof f == "string") {
                    var O = C.lookupPath(f, {
                        follow: !A
                    });
                    B = O.node;
                } else B = f;
                C.doChmod(null, B, m, A);
            },
            lchmod (f, m) {
                C.chmod(f, m, !0);
            },
            fchmod (f, m) {
                var A = C.getStreamChecked(f);
                C.doChmod(A, A.node, m, !1);
            },
            doChown (f, m, A) {
                C.doSetAttr(f, m, {
                    timestamp: Date.now(),
                    dontFollow: A
                });
            },
            chown (f, m, A, B) {
                var O;
                if (typeof f == "string") {
                    var V = C.lookupPath(f, {
                        follow: !B
                    });
                    O = V.node;
                } else O = f;
                C.doChown(null, O, B);
            },
            lchown (f, m, A) {
                C.chown(f, m, A, !0);
            },
            fchown (f, m, A) {
                var B = C.getStreamChecked(f);
                C.doChown(B, B.node, !1);
            },
            doTruncate (f, m, A) {
                if (C.isDir(m.mode)) throw new C.ErrnoError(31);
                if (!C.isFile(m.mode)) throw new C.ErrnoError(28);
                var B = C.nodePermissions(m, "w");
                if (B) throw new C.ErrnoError(B);
                C.doSetAttr(f, m, {
                    size: A,
                    timestamp: Date.now()
                });
            },
            truncate (f, m) {
                if (m < 0) throw new C.ErrnoError(28);
                var A;
                if (typeof f == "string") {
                    var B = C.lookupPath(f, {
                        follow: !0
                    });
                    A = B.node;
                } else A = f;
                C.doTruncate(null, A, m);
            },
            ftruncate (f, m) {
                var A = C.getStreamChecked(f);
                if (m < 0 || !(A.flags & 2097155)) throw new C.ErrnoError(28);
                C.doTruncate(A, A.node, m);
            },
            utime (f, m, A) {
                var B = C.lookupPath(f, {
                    follow: !0
                }), O = B.node, V = C.checkOpExists(O.node_ops.setattr, 63);
                V(O, {
                    atime: m,
                    mtime: A
                });
            },
            open (f, m, A = 438) {
                if (f === "") throw new C.ErrnoError(44);
                m = typeof m == "string" ? ti(m) : m, m & 64 ? A = A & 4095 | 32768 : A = 0;
                var B, O;
                if (typeof f == "object") B = f;
                else {
                    O = f.endsWith("/");
                    var V = C.lookupPath(f, {
                        follow: !(m & 131072),
                        noent_okay: !0
                    });
                    B = V.node, f = V.path;
                }
                var J = !1;
                if (m & 64) if (B) {
                    if (m & 128) throw new C.ErrnoError(20);
                } else {
                    if (O) throw new C.ErrnoError(31);
                    B = C.mknod(f, A | 511, 0), J = !0;
                }
                if (!B) throw new C.ErrnoError(44);
                if (C.isChrdev(B.mode) && (m &= -513), m & 65536 && !C.isDir(B.mode)) throw new C.ErrnoError(54);
                if (!J) {
                    var ne = C.mayOpen(B, m);
                    if (ne) throw new C.ErrnoError(ne);
                }
                m & 512 && !J && C.truncate(B, 0), m &= -131713;
                var ge = C.createStream({
                    node: B,
                    path: C.getPath(B),
                    flags: m,
                    seekable: !0,
                    position: 0,
                    stream_ops: B.stream_ops,
                    ungotten: [],
                    error: !1
                });
                return ge.stream_ops.open && ge.stream_ops.open(ge), J && C.chmod(B, A & 511), t.logReadFiles && !(m & 1) && (f in C.readFiles || (C.readFiles[f] = 1)), ge;
            },
            close (f) {
                if (C.isClosed(f)) throw new C.ErrnoError(8);
                f.getdents && (f.getdents = null);
                try {
                    f.stream_ops.close && f.stream_ops.close(f);
                } catch (m) {
                    throw m;
                } finally{
                    C.closeStream(f.fd);
                }
                f.fd = null;
            },
            isClosed (f) {
                return f.fd === null;
            },
            llseek (f, m, A) {
                if (C.isClosed(f)) throw new C.ErrnoError(8);
                if (!f.seekable || !f.stream_ops.llseek) throw new C.ErrnoError(70);
                if (A != 0 && A != 1 && A != 2) throw new C.ErrnoError(28);
                return f.position = f.stream_ops.llseek(f, m, A), f.ungotten = [], f.position;
            },
            read (f, m, A, B, O) {
                if (E(A >= 0), B < 0 || O < 0) throw new C.ErrnoError(28);
                if (C.isClosed(f)) throw new C.ErrnoError(8);
                if ((f.flags & 2097155) === 1) throw new C.ErrnoError(8);
                if (C.isDir(f.node.mode)) throw new C.ErrnoError(31);
                if (!f.stream_ops.read) throw new C.ErrnoError(28);
                var V = typeof O < "u";
                if (!V) O = f.position;
                else if (!f.seekable) throw new C.ErrnoError(70);
                var J = f.stream_ops.read(f, m, A, B, O);
                return V || (f.position += J), J;
            },
            write (f, m, A, B, O, V) {
                if (E(A >= 0), B < 0 || O < 0) throw new C.ErrnoError(28);
                if (C.isClosed(f)) throw new C.ErrnoError(8);
                if (!(f.flags & 2097155)) throw new C.ErrnoError(8);
                if (C.isDir(f.node.mode)) throw new C.ErrnoError(31);
                if (!f.stream_ops.write) throw new C.ErrnoError(28);
                f.seekable && f.flags & 1024 && C.llseek(f, 0, 2);
                var J = typeof O < "u";
                if (!J) O = f.position;
                else if (!f.seekable) throw new C.ErrnoError(70);
                var ne = f.stream_ops.write(f, m, A, B, O, V);
                return J || (f.position += ne), ne;
            },
            mmap (f, m, A, B, O) {
                if (B & 2 && !(O & 2) && (f.flags & 2097155) !== 2) throw new C.ErrnoError(2);
                if ((f.flags & 2097155) === 1) throw new C.ErrnoError(2);
                if (!f.stream_ops.mmap) throw new C.ErrnoError(43);
                if (!m) throw new C.ErrnoError(28);
                return f.stream_ops.mmap(f, m, A, B, O);
            },
            msync (f, m, A, B, O) {
                return E(A >= 0), f.stream_ops.msync ? f.stream_ops.msync(f, m, A, B, O) : 0;
            },
            ioctl (f, m, A) {
                if (!f.stream_ops.ioctl) throw new C.ErrnoError(59);
                return f.stream_ops.ioctl(f, m, A);
            },
            readFile (f, m = {}) {
                m.flags = m.flags || 0, m.encoding = m.encoding || "binary", m.encoding !== "utf8" && m.encoding !== "binary" && re(`Invalid encoding type "${m.encoding}"`);
                var A = C.open(f, m.flags), B = C.stat(f), O = B.size, V = new Uint8Array(O);
                return C.read(A, V, 0, O, 0), m.encoding === "utf8" && (V = U(V)), C.close(A), V;
            },
            writeFile (f, m, A = {}) {
                A.flags = A.flags || 577;
                var B = C.open(f, A.flags, A.mode);
                typeof m == "string" && (m = new Uint8Array(Yt(m))), ArrayBuffer.isView(m) ? C.write(B, m, 0, m.byteLength, void 0, A.canOwn) : re("Unsupported data type"), C.close(B);
            },
            cwd: ()=>C.currentPath,
            chdir (f) {
                var m = C.lookupPath(f, {
                    follow: !0
                });
                if (m.node === null) throw new C.ErrnoError(44);
                if (!C.isDir(m.node.mode)) throw new C.ErrnoError(54);
                var A = C.nodePermissions(m.node, "x");
                if (A) throw new C.ErrnoError(A);
                C.currentPath = m.path;
            },
            createDefaultDirectories () {
                C.mkdir("/tmp"), C.mkdir("/home"), C.mkdir("/home/web_user");
            },
            createDefaultDevices () {
                C.mkdir("/dev"), C.registerDevice(C.makedev(1, 3), {
                    read: ()=>0,
                    write: (B, O, V, J, ne)=>J,
                    llseek: ()=>0
                }), C.mkdev("/dev/null", C.makedev(1, 3)), nt.register(C.makedev(5, 0), nt.default_tty_ops), nt.register(C.makedev(6, 0), nt.default_tty1_ops), C.mkdev("/dev/tty", C.makedev(5, 0)), C.mkdev("/dev/tty1", C.makedev(6, 0));
                var f = new Uint8Array(1024), m = 0, A = ()=>(m === 0 && (Ye(f), m = f.byteLength), f[--m]);
                C.createDevice("/dev", "random", A), C.createDevice("/dev", "urandom", A), C.mkdir("/dev/shm"), C.mkdir("/dev/shm/tmp");
            },
            createSpecialDirectories () {
                C.mkdir("/proc");
                var f = C.mkdir("/proc/self");
                C.mkdir("/proc/self/fd"), C.mount({
                    mount () {
                        var m = C.createNode(f, "fd", 16895, 73);
                        return m.stream_ops = {
                            llseek: Re.stream_ops.llseek
                        }, m.node_ops = {
                            lookup (A, B) {
                                var O = +B, V = C.getStreamChecked(O), J = {
                                    parent: null,
                                    mount: {
                                        mountpoint: "fake"
                                    },
                                    node_ops: {
                                        readlink: ()=>V.path
                                    },
                                    id: O + 1
                                };
                                return J.parent = J, J;
                            },
                            readdir () {
                                return Array.from(C.streams.entries()).filter(([A, B])=>B).map(([A, B])=>A.toString());
                            }
                        }, m;
                    }
                }, {}, "/proc/self/fd");
            },
            createStandardStreams (f, m, A) {
                f ? C.createDevice("/dev", "stdin", f) : C.symlink("/dev/tty", "/dev/stdin"), m ? C.createDevice("/dev", "stdout", null, m) : C.symlink("/dev/tty", "/dev/stdout"), A ? C.createDevice("/dev", "stderr", null, A) : C.symlink("/dev/tty1", "/dev/stderr");
                var B = C.open("/dev/stdin", 0), O = C.open("/dev/stdout", 1), V = C.open("/dev/stderr", 1);
                E(B.fd === 0, `invalid handle for stdin (${B.fd})`), E(O.fd === 1, `invalid handle for stdout (${O.fd})`), E(V.fd === 2, `invalid handle for stderr (${V.fd})`);
            },
            staticInit () {
                C.nameTable = new Array(4096), C.mount(Re, {}, "/"), C.createDefaultDirectories(), C.createDefaultDevices(), C.createSpecialDirectories(), C.filesystems = {
                    MEMFS: Re
                };
            },
            init (f, m, A) {
                E(!C.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)"), C.initialized = !0, f ??= t.stdin, m ??= t.stdout, A ??= t.stderr, C.createStandardStreams(f, m, A);
            },
            quit () {
                C.initialized = !1, Vi(0);
                for (var f of C.streams)f && C.close(f);
            },
            findObject (f, m) {
                var A = C.analyzePath(f, m);
                return A.exists ? A.object : null;
            },
            analyzePath (f, m) {
                try {
                    var A = C.lookupPath(f, {
                        follow: !m
                    });
                    f = A.path;
                } catch  {}
                var B = {
                    isRoot: !1,
                    exists: !1,
                    error: 0,
                    name: null,
                    path: null,
                    object: null,
                    parentExists: !1,
                    parentPath: null,
                    parentObject: null
                };
                try {
                    var A = C.lookupPath(f, {
                        parent: !0
                    });
                    B.parentExists = !0, B.parentPath = A.path, B.parentObject = A.node, B.name = Oe.basename(f), A = C.lookupPath(f, {
                        follow: !m
                    }), B.exists = !0, B.path = A.path, B.object = A.node, B.name = A.node.name, B.isRoot = A.path === "/";
                } catch (O) {
                    B.error = O.errno;
                }
                return B;
            },
            createPath (f, m, A, B) {
                f = typeof f == "string" ? f : C.getPath(f);
                for(var O = m.split("/").reverse(); O.length;){
                    var V = O.pop();
                    if (V) {
                        var J = Oe.join2(f, V);
                        try {
                            C.mkdir(J);
                        } catch (ne) {
                            if (ne.errno != 20) throw ne;
                        }
                        f = J;
                    }
                }
                return J;
            },
            createFile (f, m, A, B, O) {
                var V = Oe.join2(typeof f == "string" ? f : C.getPath(f), m), J = Qt(B, O);
                return C.create(V, J);
            },
            createDataFile (f, m, A, B, O, V) {
                var J = m;
                f && (f = typeof f == "string" ? f : C.getPath(f), J = m ? Oe.join2(f, m) : f);
                var ne = Qt(B, O), ge = C.create(J, ne);
                if (A) {
                    if (typeof A == "string") {
                        for(var xe = new Array(A.length), Ve = 0, Xe = A.length; Ve < Xe; ++Ve)xe[Ve] = A.charCodeAt(Ve);
                        A = xe;
                    }
                    C.chmod(ge, ne | 146);
                    var Te = C.open(ge, 577);
                    C.write(Te, A, 0, A.length, 0, V), C.close(Te), C.chmod(ge, ne);
                }
            },
            createDevice (f, m, A, B) {
                var O = Oe.join2(typeof f == "string" ? f : C.getPath(f), m), V = Qt(!!A, !!B);
                C.createDevice.major ??= 64;
                var J = C.makedev(C.createDevice.major++, 0);
                return C.registerDevice(J, {
                    open (ne) {
                        ne.seekable = !1;
                    },
                    close (ne) {
                        B?.buffer?.length && B(10);
                    },
                    read (ne, ge, xe, Ve, Xe) {
                        for(var Te = 0, $e = 0; $e < Ve; $e++){
                            var pr;
                            try {
                                pr = A();
                            } catch  {
                                throw new C.ErrnoError(29);
                            }
                            if (pr === void 0 && Te === 0) throw new C.ErrnoError(6);
                            if (pr == null) break;
                            Te++, ge[xe + $e] = pr;
                        }
                        return Te && (ne.node.atime = Date.now()), Te;
                    },
                    write (ne, ge, xe, Ve, Xe) {
                        for(var Te = 0; Te < Ve; Te++)try {
                            B(ge[xe + Te]);
                        } catch  {
                            throw new C.ErrnoError(29);
                        }
                        return Ve && (ne.node.mtime = ne.node.ctime = Date.now()), Te;
                    }
                }), C.mkdev(O, V, J);
            },
            forceLoadFile (f) {
                if (f.isDevice || f.isFolder || f.link || f.contents) return !0;
                if (globalThis.XMLHttpRequest) re("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
                else try {
                    f.contents = p(f.url);
                } catch  {
                    throw new C.ErrnoError(29);
                }
            },
            createLazyFile (f, m, A, B, O) {
                class V {
                    lengthKnown = !1;
                    chunks = [];
                    get(Te) {
                        if (!(Te > this.length - 1 || Te < 0)) {
                            var $e = Te % this.chunkSize, pr = Te / this.chunkSize | 0;
                            return this.getter(pr)[$e];
                        }
                    }
                    setDataGetter(Te) {
                        this.getter = Te;
                    }
                    cacheLength() {
                        var Te = new XMLHttpRequest;
                        Te.open("HEAD", A, !1), Te.send(null), Te.status >= 200 && Te.status < 300 || Te.status === 304 || re("Couldn't load " + A + ". Status: " + Te.status);
                        var $e = Number(Te.getResponseHeader("Content-length")), pr, Ir = (pr = Te.getResponseHeader("Accept-Ranges")) && pr === "bytes", Rr = (pr = Te.getResponseHeader("Content-Encoding")) && pr === "gzip", Tr = 1024 * 1024;
                        Ir || (Tr = $e);
                        var Yr = (rt, Tt)=>{
                            rt > Tt && re("invalid range (" + rt + ", " + Tt + ") or no bytes requested!"), Tt > $e - 1 && re("only " + $e + " bytes available! programmer error!");
                            var Er = new XMLHttpRequest;
                            return Er.open("GET", A, !1), $e !== Tr && Er.setRequestHeader("Range", "bytes=" + rt + "-" + Tt), Er.responseType = "arraybuffer", Er.overrideMimeType && Er.overrideMimeType("text/plain; charset=x-user-defined"), Er.send(null), Er.status >= 200 && Er.status < 300 || Er.status === 304 || re("Couldn't load " + A + ". Status: " + Er.status), Er.response !== void 0 ? new Uint8Array(Er.response || []) : Yt(Er.responseText || "");
                        }, Jt = this;
                        Jt.setDataGetter((rt)=>{
                            var Tt = rt * Tr, Er = (rt + 1) * Tr - 1;
                            return Er = Math.min(Er, $e - 1), typeof Jt.chunks[rt] > "u" && (Jt.chunks[rt] = Yr(Tt, Er)), typeof Jt.chunks[rt] > "u" && re("doXHR failed!"), Jt.chunks[rt];
                        }), (Rr || !$e) && (Tr = $e = 1, $e = this.getter(0).length, Tr = $e, d("LazyFiles on gzip forces download of the whole file when length is accessed")), this._length = $e, this._chunkSize = Tr, this.lengthKnown = !0;
                    }
                    get length() {
                        return this.lengthKnown || this.cacheLength(), this._length;
                    }
                    get chunkSize() {
                        return this.lengthKnown || this.cacheLength(), this._chunkSize;
                    }
                }
                if (globalThis.XMLHttpRequest) {
                    i || re("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");
                    var J = new V, ne = {
                        isDevice: !1,
                        contents: J
                    };
                } else var ne = {
                    isDevice: !1,
                    url: A
                };
                var ge = C.createFile(f, m, ne, B, O);
                ne.contents ? ge.contents = ne.contents : ne.url && (ge.contents = null, ge.url = ne.url), Object.defineProperties(ge, {
                    usedBytes: {
                        get: function() {
                            return this.contents.length;
                        }
                    }
                });
                var xe = {};
                for (const [Xe, Te] of Object.entries(ge.stream_ops))xe[Xe] = (...$e)=>(C.forceLoadFile(ge), Te(...$e));
                function Ve(Xe, Te, $e, pr, Ir) {
                    var Rr = Xe.node.contents;
                    if (Ir >= Rr.length) return 0;
                    var Tr = Math.min(Rr.length - Ir, pr);
                    if (E(Tr >= 0), Rr.slice) for(var Yr = 0; Yr < Tr; Yr++)Te[$e + Yr] = Rr[Ir + Yr];
                    else for(var Yr = 0; Yr < Tr; Yr++)Te[$e + Yr] = Rr.get(Ir + Yr);
                    return Tr;
                }
                return xe.read = (Xe, Te, $e, pr, Ir)=>(C.forceLoadFile(ge), Ve(Xe, Te, $e, pr, Ir)), xe.mmap = (Xe, Te, $e, pr, Ir)=>{
                    C.forceLoadFile(ge);
                    var Rr = mn();
                    if (!Rr) throw new C.ErrnoError(48);
                    return Ve(Xe, k, Rr, Te, $e), {
                        ptr: Rr,
                        allocated: !0
                    };
                }, ge.stream_ops = xe, ge;
            },
            absolutePath () {
                re("FS.absolutePath has been removed; use PATH_FS.resolve instead");
            },
            createFolder () {
                re("FS.createFolder has been removed; use FS.mkdir instead");
            },
            createLink () {
                re("FS.createLink has been removed; use FS.symlink instead");
            },
            joinPath () {
                re("FS.joinPath has been removed; use PATH.join instead");
            },
            mmapAlloc () {
                re("FS.mmapAlloc has been replaced by the top level function mmapAlloc");
            },
            standardizePath () {
                re("FS.standardizePath has been removed; use PATH.normalize instead");
            }
        }, Xt = {
            calculateAt (f, m, A) {
                if (Oe.isAbs(m)) return m;
                var B;
                if (f === -100) B = C.cwd();
                else {
                    var O = Xt.getStreamFromFD(f);
                    B = O.path;
                }
                if (m.length == 0) {
                    if (!A) throw new C.ErrnoError(44);
                    return B;
                }
                return B + "/" + m;
            },
            writeStat (f, m) {
                R[f >> 2] = m.dev, R[f + 4 >> 2] = m.mode, R[f + 8 >> 2] = m.nlink, R[f + 12 >> 2] = m.uid, R[f + 16 >> 2] = m.gid, R[f + 20 >> 2] = m.rdev, I[f + 24 >> 3] = BigInt(m.size), G[f + 32 >> 2] = 4096, G[f + 36 >> 2] = m.blocks;
                var A = m.atime.getTime(), B = m.mtime.getTime(), O = m.ctime.getTime();
                return I[f + 40 >> 3] = BigInt(Math.floor(A / 1e3)), R[f + 48 >> 2] = A % 1e3 * 1e3 * 1e3, I[f + 56 >> 3] = BigInt(Math.floor(B / 1e3)), R[f + 64 >> 2] = B % 1e3 * 1e3 * 1e3, I[f + 72 >> 3] = BigInt(Math.floor(O / 1e3)), R[f + 80 >> 2] = O % 1e3 * 1e3 * 1e3, I[f + 88 >> 3] = BigInt(m.ino), 0;
            },
            writeStatFs (f, m) {
                R[f + 4 >> 2] = m.bsize, R[f + 60 >> 2] = m.bsize, I[f + 8 >> 3] = BigInt(m.blocks), I[f + 16 >> 3] = BigInt(m.bfree), I[f + 24 >> 3] = BigInt(m.bavail), I[f + 32 >> 3] = BigInt(m.files), I[f + 40 >> 3] = BigInt(m.ffree), R[f + 48 >> 2] = m.fsid, R[f + 64 >> 2] = m.flags, R[f + 56 >> 2] = m.namelen;
            },
            doMsync (f, m, A, B, O) {
                if (!C.isFile(m.node.mode)) throw new C.ErrnoError(43);
                if (B & 2) return 0;
                var V = L.slice(f, f + A);
                C.msync(m, V, O, A, B);
            },
            getStreamFromFD (f) {
                var m = C.getStreamChecked(f);
                return m;
            },
            varargs: void 0,
            getStr (f) {
                var m = W(f);
                return m;
            }
        };
        function Ou(f) {
            try {
                var m = Xt.getStreamFromFD(f);
                return C.close(m), 0;
            } catch (A) {
                if (typeof C > "u" || A.name !== "ErrnoError") throw A;
                return A.errno;
            }
        }
        var Iu = (f, m, A, B)=>{
            for(var O = 0, V = 0; V < A; V++){
                var J = R[m >> 2], ne = R[m + 4 >> 2];
                m += 8;
                var ge = C.read(f, k, J, ne, B);
                if (ge < 0) return -1;
                if (O += ge, ge < ne) break;
            }
            return O;
        };
        function Ru(f, m, A, B) {
            try {
                var O = Xt.getStreamFromFD(f), V = Iu(O, m, A);
                return R[B >> 2] = V, 0;
            } catch (J) {
                if (typeof C > "u" || J.name !== "ErrnoError") throw J;
                return J.errno;
            }
        }
        function Lu(f, m, A, B) {
            m = hr(m);
            try {
                if (isNaN(m)) return 61;
                var O = Xt.getStreamFromFD(f);
                return C.llseek(O, m, A), I[B >> 3] = BigInt(O.position), O.getdents && m === 0 && A === 0 && (O.getdents = null), 0;
            } catch (V) {
                if (typeof C > "u" || V.name !== "ErrnoError") throw V;
                return V.errno;
            }
        }
        var Uu = (f, m, A, B)=>{
            for(var O = 0, V = 0; V < A; V++){
                var J = R[m >> 2], ne = R[m + 4 >> 2];
                m += 8;
                var ge = C.write(f, k, J, ne, B);
                if (ge < 0) return -1;
                if (O += ge, ge < ne) break;
            }
            return O;
        };
        function $u(f, m, A, B) {
            try {
                var O = Xt.getStreamFromFD(f), V = Uu(O, m, A);
                return R[B >> 2] = V, 0;
            } catch (J) {
                if (typeof C > "u" || J.name !== "ErrnoError") throw J;
                return J.errno;
            }
        }
        C.createPreloadedFile = ui, C.preloadFile = ht, C.staticInit();
        {
            if (t.noExitRuntime && t.noExitRuntime, t.preloadPlugins && (Dn = t.preloadPlugins), t.print && (d = t.print), t.printErr && (y = t.printErr), t.wasmBinary && (D = t.wasmBinary), Hu(), t.arguments && t.arguments, t.thisProgram && (c = t.thisProgram), E(typeof t.memoryInitializerPrefixURL > "u", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"), E(typeof t.pthreadMainPrefixURL > "u", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"), E(typeof t.cdInitializerPrefixURL > "u", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"), E(typeof t.filePackagePrefixURL > "u", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead"), E(typeof t.read > "u", "Module.read option was removed"), E(typeof t.readAsync > "u", "Module.readAsync option was removed (modify readAsync in JS)"), E(typeof t.readBinary > "u", "Module.readBinary option was removed (modify readBinary in JS)"), E(typeof t.setWindowTitle > "u", "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)"), E(typeof t.TOTAL_MEMORY > "u", "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY"), E(typeof t.ENVIRONMENT > "u", "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)"), E(typeof t.STACK_SIZE > "u", "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time"), E(typeof t.wasmMemory > "u", "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally"), E(typeof t.INITIAL_MEMORY > "u", "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically"), t.preInit) for(typeof t.preInit == "function" && (t.preInit = [
                t.preInit
            ]); t.preInit.length > 0;)t.preInit.shift()();
            N("preInit");
        }
        var qu = [
            "writeI53ToI64",
            "writeI53ToI64Clamped",
            "writeI53ToI64Signaling",
            "writeI53ToU64Clamped",
            "writeI53ToU64Signaling",
            "readI53FromI64",
            "readI53FromU64",
            "convertI32PairToI53",
            "convertI32PairToI53Checked",
            "convertU32PairToI53",
            "stackAlloc",
            "getTempRet0",
            "setTempRet0",
            "createNamedFunction",
            "zeroMemory",
            "exitJS",
            "withStackSave",
            "inetPton4",
            "inetNtop4",
            "inetPton6",
            "inetNtop6",
            "readSockaddr",
            "writeSockaddr",
            "readEmAsmArgs",
            "jstoi_q",
            "autoResumeAudioContext",
            "getDynCaller",
            "dynCall",
            "handleException",
            "keepRuntimeAlive",
            "runtimeKeepalivePush",
            "runtimeKeepalivePop",
            "callUserCallback",
            "maybeExit",
            "asmjsMangle",
            "HandleAllocator",
            "addOnInit",
            "addOnPostCtor",
            "addOnPreMain",
            "addOnExit",
            "STACK_SIZE",
            "STACK_ALIGN",
            "POINTER_SIZE",
            "ASSERTIONS",
            "ccall",
            "cwrap",
            "convertJsFunctionToWasm",
            "getEmptyTableSlot",
            "updateTableMap",
            "getFunctionAddress",
            "addFunction",
            "removeFunction",
            "intArrayToString",
            "AsciiToString",
            "stringToAscii",
            "UTF16ToString",
            "stringToUTF16",
            "lengthBytesUTF16",
            "UTF32ToString",
            "stringToUTF32",
            "lengthBytesUTF32",
            "stringToNewUTF8",
            "stringToUTF8OnStack",
            "writeArrayToMemory",
            "registerKeyEventCallback",
            "maybeCStringToJsString",
            "findEventTarget",
            "getBoundingClientRect",
            "fillMouseEventData",
            "registerMouseEventCallback",
            "registerWheelEventCallback",
            "registerUiEventCallback",
            "registerFocusEventCallback",
            "fillDeviceOrientationEventData",
            "registerDeviceOrientationEventCallback",
            "fillDeviceMotionEventData",
            "registerDeviceMotionEventCallback",
            "screenOrientation",
            "fillOrientationChangeEventData",
            "registerOrientationChangeEventCallback",
            "fillFullscreenChangeEventData",
            "registerFullscreenChangeEventCallback",
            "JSEvents_requestFullscreen",
            "JSEvents_resizeCanvasForFullscreen",
            "registerRestoreOldStyle",
            "hideEverythingExceptGivenElement",
            "restoreHiddenElements",
            "setLetterbox",
            "softFullscreenResizeWebGLRenderTarget",
            "doRequestFullscreen",
            "fillPointerlockChangeEventData",
            "registerPointerlockChangeEventCallback",
            "registerPointerlockErrorEventCallback",
            "requestPointerLock",
            "fillVisibilityChangeEventData",
            "registerVisibilityChangeEventCallback",
            "registerTouchEventCallback",
            "fillGamepadEventData",
            "registerGamepadEventCallback",
            "registerBeforeUnloadEventCallback",
            "fillBatteryEventData",
            "registerBatteryEventCallback",
            "setCanvasElementSize",
            "getCanvasElementSize",
            "jsStackTrace",
            "getCallstack",
            "convertPCtoSourceLocation",
            "wasiRightsToMuslOFlags",
            "wasiOFlagsToMuslOFlags",
            "safeSetTimeout",
            "setImmediateWrapped",
            "safeRequestAnimationFrame",
            "clearImmediateWrapped",
            "registerPostMainLoop",
            "registerPreMainLoop",
            "getPromise",
            "makePromise",
            "idsToPromises",
            "makePromiseCallback",
            "findMatchingCatch",
            "Browser_asyncPrepareDataCounter",
            "isLeapYear",
            "ydayFromDate",
            "arraySum",
            "addDays",
            "getSocketFromFD",
            "getSocketAddress",
            "FS_mkdirTree",
            "_setNetworkCallback",
            "heapObjectForWebGLType",
            "toTypedArrayIndex",
            "webgl_enable_ANGLE_instanced_arrays",
            "webgl_enable_OES_vertex_array_object",
            "webgl_enable_WEBGL_draw_buffers",
            "webgl_enable_WEBGL_multi_draw",
            "webgl_enable_EXT_polygon_offset_clamp",
            "webgl_enable_EXT_clip_control",
            "webgl_enable_WEBGL_polygon_mode",
            "emscriptenWebGLGet",
            "computeUnpackAlignedImageSize",
            "colorChannelsInGlTextureFormat",
            "emscriptenWebGLGetTexPixelData",
            "emscriptenWebGLGetUniform",
            "webglGetUniformLocation",
            "webglPrepareUniformLocationsBeforeFirstUse",
            "webglGetLeftBracePos",
            "emscriptenWebGLGetVertexAttrib",
            "__glGetActiveAttribOrUniform",
            "writeGLArray",
            "registerWebGlEventCallback",
            "runAndAbortIfError",
            "ALLOC_NORMAL",
            "ALLOC_STACK",
            "allocate",
            "writeStringToMemory",
            "writeAsciiToMemory",
            "allocateUTF8",
            "allocateUTF8OnStack",
            "demangle",
            "stackTrace",
            "getNativeTypeSize"
        ];
        qu.forEach(T);
        var ku = [
            "run",
            "out",
            "err",
            "callMain",
            "abort",
            "wasmExports",
            "HEAPF32",
            "HEAP8",
            "HEAP16",
            "HEAPU16",
            "HEAP32",
            "HEAP64",
            "HEAPU64",
            "writeStackCookie",
            "checkStackCookie",
            "INT53_MAX",
            "INT53_MIN",
            "bigintToI53Checked",
            "stackSave",
            "stackRestore",
            "ptrToString",
            "getHeapMax",
            "growMemory",
            "ENV",
            "ERRNO_CODES",
            "strError",
            "DNS",
            "Protocols",
            "Sockets",
            "timers",
            "warnOnce",
            "readEmAsmArgsArray",
            "getExecutableName",
            "asyncLoad",
            "alignMemory",
            "mmapAlloc",
            "wasmTable",
            "wasmMemory",
            "getUniqueRunDependency",
            "noExitRuntime",
            "addRunDependency",
            "removeRunDependency",
            "addOnPreRun",
            "addOnPostRun",
            "freeTableIndexes",
            "functionsInTableMap",
            "setValue",
            "getValue",
            "PATH",
            "PATH_FS",
            "UTF8Decoder",
            "UTF8ArrayToString",
            "UTF8ToString",
            "stringToUTF8Array",
            "stringToUTF8",
            "lengthBytesUTF8",
            "intArrayFromString",
            "UTF16Decoder",
            "JSEvents",
            "specialHTMLTargets",
            "findCanvasEventTarget",
            "currentFullscreenStrategy",
            "restoreOldWindowedStyle",
            "UNWIND_CACHE",
            "ExitStatus",
            "getEnvStrings",
            "checkWasiClock",
            "doReadv",
            "doWritev",
            "initRandomFill",
            "randomFill",
            "emSetImmediate",
            "emClearImmediate_deps",
            "emClearImmediate",
            "promiseMap",
            "uncaughtExceptionCount",
            "exceptionLast",
            "exceptionCaught",
            "ExceptionInfo",
            "Browser",
            "requestFullscreen",
            "requestFullScreen",
            "setCanvasSize",
            "getUserMedia",
            "createContext",
            "getPreloadedImageData__data",
            "wget",
            "MONTH_DAYS_REGULAR",
            "MONTH_DAYS_LEAP",
            "MONTH_DAYS_REGULAR_CUMULATIVE",
            "MONTH_DAYS_LEAP_CUMULATIVE",
            "SYSCALLS",
            "preloadPlugins",
            "FS_createPreloadedFile",
            "FS_preloadFile",
            "FS_modeStringToFlags",
            "FS_getMode",
            "FS_stdin_getChar_buffer",
            "FS_stdin_getChar",
            "FS_unlink",
            "FS_createPath",
            "FS_createDevice",
            "FS_readFile",
            "FS",
            "FS_root",
            "FS_mounts",
            "FS_devices",
            "FS_streams",
            "FS_nextInode",
            "FS_nameTable",
            "FS_currentPath",
            "FS_initialized",
            "FS_ignorePermissions",
            "FS_filesystems",
            "FS_syncFSRequests",
            "FS_readFiles",
            "FS_lookupPath",
            "FS_getPath",
            "FS_hashName",
            "FS_hashAddNode",
            "FS_hashRemoveNode",
            "FS_lookupNode",
            "FS_createNode",
            "FS_destroyNode",
            "FS_isRoot",
            "FS_isMountpoint",
            "FS_isFile",
            "FS_isDir",
            "FS_isLink",
            "FS_isChrdev",
            "FS_isBlkdev",
            "FS_isFIFO",
            "FS_isSocket",
            "FS_flagsToPermissionString",
            "FS_nodePermissions",
            "FS_mayLookup",
            "FS_mayCreate",
            "FS_mayDelete",
            "FS_mayOpen",
            "FS_checkOpExists",
            "FS_nextfd",
            "FS_getStreamChecked",
            "FS_getStream",
            "FS_createStream",
            "FS_closeStream",
            "FS_dupStream",
            "FS_doSetAttr",
            "FS_chrdev_stream_ops",
            "FS_major",
            "FS_minor",
            "FS_makedev",
            "FS_registerDevice",
            "FS_getDevice",
            "FS_getMounts",
            "FS_syncfs",
            "FS_mount",
            "FS_unmount",
            "FS_lookup",
            "FS_mknod",
            "FS_statfs",
            "FS_statfsStream",
            "FS_statfsNode",
            "FS_create",
            "FS_mkdir",
            "FS_mkdev",
            "FS_symlink",
            "FS_rename",
            "FS_rmdir",
            "FS_readdir",
            "FS_readlink",
            "FS_stat",
            "FS_fstat",
            "FS_lstat",
            "FS_doChmod",
            "FS_chmod",
            "FS_lchmod",
            "FS_fchmod",
            "FS_doChown",
            "FS_chown",
            "FS_lchown",
            "FS_fchown",
            "FS_doTruncate",
            "FS_truncate",
            "FS_ftruncate",
            "FS_utime",
            "FS_open",
            "FS_close",
            "FS_isClosed",
            "FS_llseek",
            "FS_read",
            "FS_write",
            "FS_mmap",
            "FS_msync",
            "FS_ioctl",
            "FS_writeFile",
            "FS_cwd",
            "FS_chdir",
            "FS_createDefaultDirectories",
            "FS_createDefaultDevices",
            "FS_createSpecialDirectories",
            "FS_createStandardStreams",
            "FS_staticInit",
            "FS_init",
            "FS_quit",
            "FS_findObject",
            "FS_analyzePath",
            "FS_createFile",
            "FS_createDataFile",
            "FS_forceLoadFile",
            "FS_createLazyFile",
            "FS_absolutePath",
            "FS_createFolder",
            "FS_createLink",
            "FS_joinPath",
            "FS_mmapAlloc",
            "FS_standardizePath",
            "MEMFS",
            "TTY",
            "PIPEFS",
            "SOCKFS",
            "tempFixedLengthArray",
            "miniTempWebGLFloatBuffers",
            "miniTempWebGLIntBuffers",
            "GL",
            "AL",
            "GLUT",
            "EGL",
            "GLEW",
            "IDBStore",
            "SDL",
            "SDL_gfx",
            "print",
            "printErr",
            "jstoi_s"
        ];
        ku.forEach(z);
        function Hu() {
            _("fetchSettings");
        }
        t._deform = S("_deform"), t._free = S("_free"), t._malloc = S("_malloc"), t._create_cached_solver = S("_create_cached_solver"), t._solve_cached_solver = S("_solve_cached_solver"), t._free_cached_solver = S("_free_cached_solver");
        var Vi = S("_fflush"), Zi = S("_strerror"), si = S("_emscripten_stack_get_end"), Yi = S("_emscripten_stack_init"), yn = S("wasmMemory");
        function Gu(f) {
            E(typeof f.deform < "u", "missing Wasm export: deform"), E(typeof f.free < "u", "missing Wasm export: free"), E(typeof f.malloc < "u", "missing Wasm export: malloc"), E(typeof f.create_cached_solver < "u", "missing Wasm export: create_cached_solver"), E(typeof f.solve_cached_solver < "u", "missing Wasm export: solve_cached_solver"), E(typeof f.free_cached_solver < "u", "missing Wasm export: free_cached_solver"), E(typeof f.fflush < "u", "missing Wasm export: fflush"), E(typeof f.strerror < "u", "missing Wasm export: strerror"), E(typeof f.emscripten_stack_get_end < "u", "missing Wasm export: emscripten_stack_get_end"), E(typeof f.emscripten_stack_get_base < "u", "missing Wasm export: emscripten_stack_get_base"), E(typeof f.emscripten_stack_init < "u", "missing Wasm export: emscripten_stack_init"), E(typeof f.emscripten_stack_get_free < "u", "missing Wasm export: emscripten_stack_get_free"), E(typeof f._emscripten_stack_restore < "u", "missing Wasm export: _emscripten_stack_restore"), E(typeof f._emscripten_stack_alloc < "u", "missing Wasm export: _emscripten_stack_alloc"), E(typeof f.emscripten_stack_get_current < "u", "missing Wasm export: emscripten_stack_get_current"), E(typeof f.memory < "u", "missing Wasm export: memory"), E(typeof f.__indirect_function_table < "u", "missing Wasm export: __indirect_function_table"), t._deform = j("deform", 49), t._free = j("free", 1), t._malloc = j("malloc", 1), t._create_cached_solver = j("create_cached_solver", 45), t._solve_cached_solver = j("solve_cached_solver", 9), t._free_cached_solver = j("free_cached_solver", 1), Vi = j("fflush", 1), Zi = j("strerror", 1), si = f.emscripten_stack_get_end, f.emscripten_stack_get_base, Yi = f.emscripten_stack_init, f.emscripten_stack_get_free, f._emscripten_stack_restore, f._emscripten_stack_alloc, f.emscripten_stack_get_current, yn = f.memory, f.__indirect_function_table;
        }
        var Qi = {
            __assert_fail: ee,
            __cxa_throw: ue,
            _abort_js: me,
            _tzset_js: Ue,
            clock_time_get: mr,
            emscripten_resize_heap: Vt,
            environ_get: Fr,
            environ_sizes_get: br,
            fd_close: Ou,
            fd_read: Ru,
            fd_seek: Lu,
            fd_write: $u
        }, Xi;
        function Wu() {
            Yi(), F();
        }
        function fi() {
            if (it > 0) {
                At = fi;
                return;
            }
            if (Wu(), Q(), it > 0) {
                At = fi;
                return;
            }
            function f() {
                E(!Xi), Xi = !0, t.calledRun = !0, !b && (H(), q?.(t), t.onRuntimeInitialized?.(), N("onRuntimeInitialized"), E(!t._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'), Y());
            }
            t.setStatus ? (t.setStatus("Running..."), setTimeout(()=>{
                setTimeout(()=>t.setStatus(""), 1), f();
            }, 1)) : f(), w();
        }
        var xt;
        xt = await De(), fi(), Z ? r = t : r = new Promise((f, m)=>{
            q = f, $ = m;
        });
        for (const f of Object.keys(t))f in e || Object.defineProperty(e, f, {
            configurable: !0,
            get () {
                re(`Access to module property ('${f}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`);
            }
        });
        return r;
    }
    const qe = await oh();
    function uh(e, r, t, n, i) {
        if (e.length === 0) return;
        const a = [], o = Mu(e, r, a), u = Nu(t.supports, a), c = Bu(t.loads, a), s = xu(n, a), l = Tu(n.cltLayups, a), v = Pu(a), h = qe._deform;
        h(o.nodesPtr, e.length, o.elementsPtr, o.elementIndicesLength, o.elementSizesPtr, r.length, u.keysPtr, u.valuesPtr, u.size, c.keysPtr, c.valuesPtr, c.size, s.elasticities.keysPtr, s.elasticities.valuesPtr, s.elasticities.size, s.areas.keysPtr, s.areas.valuesPtr, s.areas.size, s.moiZ.keysPtr, s.moiZ.valuesPtr, s.moiZ.size, s.moiY.keysPtr, s.moiY.valuesPtr, s.moiY.size, s.shearMod.keysPtr, s.shearMod.valuesPtr, s.shearMod.size, s.torsion.keysPtr, s.torsion.valuesPtr, s.torsion.size, s.thickness.keysPtr, s.thickness.valuesPtr, s.thickness.size, s.poisson.keysPtr, s.poisson.valuesPtr, s.poisson.size, s.elasticitiesOrthogonal.keysPtr, s.elasticitiesOrthogonal.valuesPtr, s.elasticitiesOrthogonal.size, l.keysPtr, l.layerCountsPtr, l.optionsPtr, l.layersFlatPtr, l.size, 0, v.deformationsDataPtrOutPtr, v.deformationsSizeOutPtr, v.reactionsDataPtrOutPtr, v.reactionsSizeOutPtr);
        const p = zu(v);
        return p.deformationsDataPtr && a.push(p.deformationsDataPtr), p.reactionsDataPtr && a.push(p.reactionsDataPtr), Cn(a), {
            deformations: p.deformations,
            reactions: p.reactions
        };
    }
    function sh(e, r, t, n) {
        if (e.length === 0 || r.length === 0) throw new Error("createCachedDeformSolverCpp requires non-empty nodes/elements");
        const i = [], a = Mu(e, r, i), o = Nu(t, i), u = xu(n, i), c = Tu(n.cltLayups, i), s = qe._malloc(4);
        i.push(s);
        const l = qe._malloc(4);
        i.push(l);
        const v = qe._malloc(4);
        i.push(v);
        const h = qe._malloc(8);
        i.push(h);
        const p = qe._create_cached_solver, g = p(a.nodesPtr, e.length, a.elementsPtr, a.elementIndicesLength, a.elementSizesPtr, r.length, o.keysPtr, o.valuesPtr, o.size, u.elasticities.keysPtr, u.elasticities.valuesPtr, u.elasticities.size, u.areas.keysPtr, u.areas.valuesPtr, u.areas.size, u.moiZ.keysPtr, u.moiZ.valuesPtr, u.moiZ.size, u.moiY.keysPtr, u.moiY.valuesPtr, u.moiY.size, u.shearMod.keysPtr, u.shearMod.valuesPtr, u.shearMod.size, u.torsion.keysPtr, u.torsion.valuesPtr, u.torsion.size, u.thickness.keysPtr, u.thickness.valuesPtr, u.thickness.size, u.poisson.keysPtr, u.poisson.valuesPtr, u.poisson.size, u.elasticitiesOrthogonal.keysPtr, u.elasticitiesOrthogonal.valuesPtr, u.elasticitiesOrthogonal.size, c.keysPtr, c.layerCountsPtr, c.optionsPtr, c.layersFlatPtr, c.size, s, l, v, h), d = qe.HEAPU32[s / 4], y = qe.HEAPU32[l / 4], D = qe.HEAPU32[v / 4], b = qe.HEAPF64[h / 8];
        if (Cn(i), !g || !d) throw new Error("create_cached_solver failed");
        const E = qe._solve_cached_solver, M = qe._free_cached_solver;
        let F = !1;
        return {
            dof: y,
            freeDof: D,
            setupTimeMs: b,
            solve: (S = new Map, _ = {})=>{
                if (F) throw new Error("Cached C++ solver was already disposed");
                const x = [], T = Bu(S, x), z = Pu(x);
                E(d, T.keysPtr, T.valuesPtr, T.size, _.includeReactions ? 1 : 0, z.deformationsDataPtrOutPtr, z.deformationsSizeOutPtr, z.reactionsDataPtrOutPtr, z.reactionsSizeOutPtr);
                const q = zu(z);
                if (!q.deformations.size) throw Cn(x), new Error("solve_cached_solver returned empty deformation map");
                return q.deformationsDataPtr && x.push(q.deformationsDataPtr), q.reactionsDataPtr && x.push(q.reactionsDataPtr), Cn(x), {
                    deformations: q.deformations,
                    reactions: q.reactions
                };
            },
            dispose: ()=>{
                F || (F = !0, M(d));
            }
        };
    }
    function Mu(e, r, t) {
        const n = Lr(e.flat(), Float64Array, qe.HEAPF64);
        t.push(n);
        const i = r.flat(), a = Lr(i, Uint32Array, qe.HEAPU32);
        t.push(a);
        const o = r.map((c)=>c.length), u = Lr(o, Uint32Array, qe.HEAPU32);
        return t.push(u), {
            nodesPtr: n,
            elementsPtr: a,
            elementIndicesLength: i.length,
            elementSizesPtr: u
        };
    }
    function Nu(e, r) {
        const t = e ? Array.from(e.keys()) : [], n = e ? Array.from(e.values()).flat().map((o)=>o ? 1 : 0) : [], i = Lr(t, Uint32Array, qe.HEAPU32);
        r.push(i);
        const a = Lr(n, Uint8Array, qe.HEAPU8);
        return r.push(a), {
            keysPtr: i,
            valuesPtr: a,
            size: t.length
        };
    }
    function Bu(e, r) {
        const t = e ? Array.from(e.keys()) : [], n = e ? Array.from(e.values()).flat() : [], i = Lr(t, Uint32Array, qe.HEAPU32);
        r.push(i);
        const a = Lr(n, Float64Array, qe.HEAPF64);
        return r.push(a), {
            keysPtr: i,
            valuesPtr: a,
            size: t.length
        };
    }
    function ot(e, r) {
        const t = e ? Array.from(e.keys()) : [], n = e ? Array.from(e.values()) : [], i = Lr(t, Uint32Array, qe.HEAPU32);
        r.push(i);
        const a = Lr(n, Float64Array, qe.HEAPF64);
        return r.push(a), {
            keysPtr: i,
            valuesPtr: a,
            size: t.length
        };
    }
    function xu(e, r) {
        return {
            elasticities: ot(e.elasticities, r),
            elasticitiesOrthogonal: ot(e.elasticitiesOrthogonal, r),
            areas: ot(e.areas, r),
            moiZ: ot(e.momentsOfInertiaZ, r),
            moiY: ot(e.momentsOfInertiaY, r),
            shearMod: ot(e.shearModuli, r),
            torsion: ot(e.torsionalConstants, r),
            thickness: ot(e.thicknesses, r),
            poisson: ot(e.poissonsRatios, r)
        };
    }
    function Tu(e, r) {
        const t = e ? Array.from(e.entries()) : [], n = [], i = [], a = [], o = [];
        for (const [v, h] of t){
            n.push(v), i.push(h.layers.length), a.push(h.options.shearCoupling ? 1 : 0, h.options.noGlueAtNarrowSide ? 1 : 0, h.options.strictSymmetryForElement ?? !0 ? 1 : 0, h.options.symmetryTolerance ?? 1e-6, h.options.r33 ?? 1, h.options.r66 ?? 1, h.options.r77 ?? 1, h.options.r88 ?? 1);
            for (const p of h.layers)o.push(p.thickness, p.thetaDeg, p.Ex, p.Ey, p.nuXY, p.Gxy, p.Gxz, p.Gyz);
        }
        const u = Lr(n, Uint32Array, qe.HEAPU32);
        r.push(u);
        const c = Lr(i, Uint32Array, qe.HEAPU32);
        r.push(c);
        const s = Lr(a, Float64Array, qe.HEAPF64);
        r.push(s);
        const l = Lr(o, Float64Array, qe.HEAPF64);
        return r.push(l), {
            keysPtr: u,
            layerCountsPtr: c,
            optionsPtr: s,
            layersFlatPtr: l,
            size: t.length
        };
    }
    function Pu(e) {
        const r = qe._malloc(4);
        e.push(r);
        const t = qe._malloc(4);
        e.push(t);
        const n = qe._malloc(4);
        e.push(n);
        const i = qe._malloc(4);
        return e.push(i), {
            deformationsDataPtrOutPtr: r,
            deformationsSizeOutPtr: t,
            reactionsDataPtrOutPtr: n,
            reactionsSizeOutPtr: i
        };
    }
    function zu(e) {
        const r = qe.HEAPU32[e.deformationsDataPtrOutPtr / 4], t = qe.HEAPU32[e.deformationsSizeOutPtr / 4], n = qe.HEAPU32[e.reactionsDataPtrOutPtr / 4], i = qe.HEAPU32[e.reactionsSizeOutPtr / 4], a = new Float64Array(qe.HEAPF64.buffer, r, t), o = new Float64Array(qe.HEAPF64.buffer, n, i), u = new Map;
        for(let s = 0; s < t; s += 7){
            const l = a[s];
            u.set(l, Array.from(a.slice(s + 1, s + 7)));
        }
        const c = new Map;
        for(let s = 0; s < i; s += 7){
            const l = o[s];
            c.set(l, Array.from(o.slice(s + 1, s + 7)));
        }
        return {
            deformationsDataPtr: r,
            reactionsDataPtr: n,
            deformations: u,
            reactions: c
        };
    }
    function Cn(e) {
        e.forEach((r)=>qe._free(r));
    }
    function Lr(e, r, t) {
        const n = new r(e), i = qe._malloc(n.length * n.BYTES_PER_ELEMENT);
        return t.set(n, i / n.BYTES_PER_ELEMENT), i;
    }
    function fh(e, r, t, n) {
        let i = Array(n).fill(0).map(()=>Array(n).fill(0));
        return r.forEach((a, o)=>{
            const u = a.map((v)=>e[v]), c = Jd(u, t, o), s = Yd(u), l = Ge(Xr(s), Ge(c, s));
            i = ch(i, l, a);
        }), i;
    }
    function ch(e, r, t) {
        const n = t.length === 3, i = 6 * t[0], a = 6 * t[1], o = n ? 6 * t[2] : void 0;
        for(let u = 0; u < 6; u++)for(let c = 0; c < 6; c++)e[i + u][i + c] += r[u][c], e[a + u][i + c] += r[u + 6][c], n && (e[o + u][i + c] += r[u + 12][c]), e[i + u][a + c] += r[u][c + 6], e[a + u][a + c] += r[u + 6][c + 6], n && (e[o + u][a + c] += r[u + 12][c + 6]), n && (e[i + u][o + c] += r[u][c + 12], e[a + u][o + c] += r[u + 6][c + 12], e[o + u][o + c] += r[u + 12][c + 12]);
        return e;
    }
    function yo(e, r, t, n) {
        if (e.length === 0 || r.length === 0) throw new Error("createCachedDeformSolver requires non-empty nodes/elements");
        if (typeof window < "u" || typeof self < "u" && typeof self.importScripts == "function") try {
            return sh(e, r, t, n);
        } catch (a) {
            console.warn("Falling back to JS cached solver", a);
        }
        return lh(e, r, t, n);
    }
    function lh(e, r, t, n) {
        const i = e.length * 6, a = dh(t, i), o = Array.from(t?.keys?.() ?? []), u = performance.now(), c = fh(e, r, n, i), s = hi(c, pi(a, a)), l = Su(Md(s)), v = performance.now() - u;
        return {
            dof: i,
            freeDof: a.length,
            setupTimeMs: v,
            solve: (h = new Map, p = {})=>{
                const g = hh(h, i), d = hi(g, pi(a)), y = Zd(l, d), D = hi(Array(i).fill(0), pi(a), ki(y)), b = vh(e.length, D);
                if (!(p.includeReactions ?? !1) || o.length === 0) return {
                    deformations: b,
                    reactions: new Map
                };
                const M = new Map;
                return o.forEach((F)=>{
                    M.set(F, [
                        It(c[F * 6], D),
                        It(c[F * 6 + 1], D),
                        It(c[F * 6 + 2], D),
                        It(c[F * 6 + 3], D),
                        It(c[F * 6 + 4], D),
                        It(c[F * 6 + 5], D)
                    ]);
                }), {
                    deformations: b,
                    reactions: M
                };
            },
            dispose: ()=>{}
        };
    }
    function vh(e, r) {
        const t = new Map;
        for(let n = 0; n < e; n++)t.set(n, [
            r[n * 6],
            r[n * 6 + 1],
            r[n * 6 + 2],
            r[n * 6 + 3],
            r[n * 6 + 4],
            r[n * 6 + 5]
        ]);
        return t;
    }
    function It(e, r) {
        let t = 0;
        for(let n = 0; n < e.length; n++)t += e[n] * r[n];
        return t;
    }
    function dh(e, r) {
        const t = Array(r).fill(!1);
        return e?.forEach((n, i)=>{
            n[0] && (t[i * 6] = !0), n[1] && (t[i * 6 + 1] = !0), n[2] && (t[i * 6 + 2] = !0), n[3] && (t[i * 6 + 3] = !0), n[4] && (t[i * 6 + 4] = !0), n[5] && (t[i * 6 + 5] = !0);
        }), Array(r).fill(0).map((n, i)=>i).filter((n)=>!t[n]);
    }
    function hh(e, r) {
        const t = Array(r).fill(0);
        return e?.forEach((n, i)=>{
            t[i * 6] = n[0], t[i * 6 + 1] = n[1], t[i * 6 + 2] = n[2], t[i * 6 + 3] = n[3], t[i * 6 + 4] = n[4], t[i * 6 + 5] = n[5];
        }), t;
    }
    const Fn = self;
    let ut = null;
    Fn.onmessage = (e)=>{
        const r = e.data;
        if (r.type === "reset") {
            Bi();
            return;
        }
        const { requestId: t, cacheKey: n, loads: i, topology: a } = r;
        try {
            ph(n, a);
            const o = performance.now(), u = ut.solver.solve(i, {
                includeReactions: !1
            }), c = performance.now() - o, s = {
                type: "solved",
                requestId: t,
                deformOutputs: u,
                solveMs: c
            };
            Fn.postMessage(s);
            return;
        } catch (o) {
            try {
                const u = a ?? ut?.topology;
                if (!u) throw o;
                const c = {
                    supports: u.supports,
                    loads: i
                }, s = performance.now(), l = uh(u.nodes, u.elements, c, u.elementInputs, {
                    includeReactions: !1
                }), v = performance.now() - s, h = {
                    type: "solved",
                    requestId: t,
                    deformOutputs: l,
                    solveMs: v
                };
                Fn.postMessage(h);
                return;
            } catch (u) {
                const c = {
                    type: "failed",
                    requestId: t,
                    error: u instanceof Error ? u.message : "Unknown solver worker failure"
                };
                Fn.postMessage(c);
            }
        }
    };
    function ph(e, r) {
        if (ut && ut.key === e) return r ? (Bi(), ut = {
            key: e,
            topology: r,
            solver: yo(r.nodes, r.elements, r.supports, r.elementInputs)
        }, r) : ut.topology;
        if (!r) throw new Error("Missing topology payload for solver initialization");
        return Bi(), ut = {
            key: e,
            topology: r,
            solver: yo(r.nodes, r.elements, r.supports, r.elementInputs)
        }, r;
    }
    function Bi() {
        ut?.solver.dispose?.(), ut = null;
    }
})();
