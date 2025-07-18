var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
let nt;
let __tla = (async () => {
  const Qr = "modulepreload", et = function(z, L) {
    return new URL(z, L).href;
  }, nr = {}, rt = function(L, F, d) {
    let _ = Promise.resolve();
    if (F && F.length > 0) {
      const U = document.getElementsByTagName("link"), D = document.querySelector("meta[property=csp-nonce]"), Y = (D == null ? void 0 : D.nonce) || (D == null ? void 0 : D.getAttribute("nonce"));
      _ = Promise.allSettled(F.map((P) => {
        if (P = et(P, d), P in nr) return;
        nr[P] = true;
        const H = P.endsWith(".css"), q = H ? '[rel="stylesheet"]' : "";
        if (!!d) for (let V = U.length - 1; V >= 0; V--) {
          const j = U[V];
          if (j.href === P && (!H || j.rel === "stylesheet")) return;
        }
        else if (document.querySelector(`link[href="${P}"]${q}`)) return;
        const S = document.createElement("link");
        if (S.rel = H ? "stylesheet" : Qr, H || (S.as = "script"), S.crossOrigin = "", S.href = P, Y && S.setAttribute("nonce", Y), document.head.appendChild(S), H) return new Promise((V, j) => {
          S.addEventListener("load", V), S.addEventListener("error", () => j(new Error(`Unable to preload CSS for ${P}`)));
        });
      }));
    }
    function X(U) {
      const D = new Event("vite:preloadError", {
        cancelable: true
      });
      if (D.payload = U, window.dispatchEvent(D), !D.defaultPrevented) throw U;
    }
    return _.then((U) => {
      for (const D of U || []) D.status === "rejected" && X(D.reason);
      return L().catch(X);
    });
  };
  var tt = (() => {
    var z = import.meta.url;
    return async function(L = {}) {
      var F, d = L, _, X, U = new Promise((e, r) => {
        _ = e, X = r;
      }), D = typeof window == "object", Y = typeof WorkerGlobalScope < "u", P = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && process.type != "renderer", H = !D && !P && !Y;
      if (P) {
        const { createRequire: e } = await rt(() => import("./__vite-browser-external-D7Ct-6yo.js").then((r) => r._), [], import.meta.url);
        var q = e(import.meta.url);
      }
      var se = "./this.program", S = "";
      function V(e) {
        return d.locateFile ? d.locateFile(e, S) : S + e;
      }
      var j, re;
      if (P) {
        if (typeof process > "u" || !process.release || process.release.name !== "node") throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
        var ye = process.versions.node, M = ye.split(".").slice(0, 3);
        if (M = M[0] * 1e4 + M[1] * 100 + M[2].split("-")[0] * 1, M < 16e4) throw new Error("This emscripten-generated code requires node v16.0.0 (detected v" + ye + ")");
        var le = q("fs"), ge = q("path");
        import.meta.url.startsWith("data:") || (S = ge.dirname(q("url").fileURLToPath(import.meta.url)) + "/"), re = (e) => {
          e = ie(e) ? new URL(e) : e;
          var r = le.readFileSync(e);
          return f(Buffer.isBuffer(r)), r;
        }, j = async (e, r = true) => {
          e = ie(e) ? new URL(e) : e;
          var t = le.readFileSync(e, r ? void 0 : "utf8");
          return f(r ? Buffer.isBuffer(t) : typeof t == "string"), t;
        }, process.argv.length > 1 && (se = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2);
      } else if (H) {
        if (typeof process == "object" && typeof q == "function" || typeof window == "object" || typeof WorkerGlobalScope < "u") throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
      } else if (D || Y) {
        if (Y ? S = self.location.href : typeof document < "u" && document.currentScript && (S = document.currentScript.src), z && (S = z), S.startsWith("blob:") ? S = "" : S = S.slice(0, S.replace(/[?#].*/, "").lastIndexOf("/") + 1), !(typeof window == "object" || typeof WorkerGlobalScope < "u")) throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
        Y && (re = (e) => {
          var r = new XMLHttpRequest();
          return r.open("GET", e, false), r.responseType = "arraybuffer", r.send(null), new Uint8Array(r.response);
        }), j = async (e) => {
          if (ie(e)) return new Promise((t, o) => {
            var i = new XMLHttpRequest();
            i.open("GET", e, true), i.responseType = "arraybuffer", i.onload = () => {
              if (i.status == 200 || i.status == 0 && i.response) {
                t(i.response);
                return;
              }
              o(i.status);
            }, i.onerror = o, i.send(null);
          });
          var r = await fetch(e, {
            credentials: "same-origin"
          });
          if (r.ok) return r.arrayBuffer();
          throw new Error(r.status + " : " + r.url);
        };
      } else throw new Error("environment detection error");
      var te = console.log.bind(console), b = console.error.bind(console);
      f(!H, "shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.");
      var J;
      typeof WebAssembly != "object" && b("no native wasm support detected");
      var Z, ne = false;
      function f(e, r) {
        e || N("Assertion failed" + (r ? ": " + r : ""));
      }
      var C, Q, T, p, G, oe = false, ie = (e) => e.startsWith("file://");
      function _e() {
        var e = rr();
        f((e & 3) == 0), e == 0 && (e += 4), p[e >> 2] = 34821223, p[e + 4 >> 2] = 2310721022, p[0] = 1668509029;
      }
      function ve() {
        if (!ne) {
          var e = rr();
          e == 0 && (e += 4);
          var r = p[e >> 2], t = p[e + 4 >> 2];
          (r != 34821223 || t != 2310721022) && N(`Stack overflow! Stack cookie has been overwritten at ${Fe(e)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${Fe(t)} ${Fe(r)}`), p[0] != 1668509029 && N("Runtime error: The application has corrupted its heap memory area (address zero)!");
        }
      }
      (() => {
        var e = new Int16Array(1), r = new Int8Array(e.buffer);
        if (e[0] = 25459, r[0] !== 115 || r[1] !== 99) throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
      })();
      function de(e) {
        Object.getOwnPropertyDescriptor(d, e) || Object.defineProperty(d, e, {
          configurable: true,
          set() {
            N(`Attempt to set \`Module.${e}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`);
          }
        });
      }
      function Le(e) {
        Object.getOwnPropertyDescriptor(d, e) && N(`\`Module.${e}\` was supplied but \`${e}\` not included in INCOMING_MODULE_JS_API`);
      }
      function ke(e) {
        return e === "FS_createPath" || e === "FS_createDataFile" || e === "FS_createPreloadedFile" || e === "FS_unlink" || e === "addRunDependency" || e === "FS_createLazyFile" || e === "FS_createDevice" || e === "removeRunDependency";
      }
      function be(e, r) {
        typeof globalThis < "u" && !Object.getOwnPropertyDescriptor(globalThis, e) && Object.defineProperty(globalThis, e, {
          configurable: true,
          get() {
            r();
          }
        });
      }
      function k(e, r) {
        be(e, () => {
          ue(`\`${e}\` is not longer defined by emscripten. ${r}`);
        });
      }
      k("buffer", "Please use HEAP8.buffer or wasmMemory.buffer"), k("asm", "Please use wasmExports instead");
      function ae(e) {
        be(e, () => {
          var r = `\`${e}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`, t = e;
          t.startsWith("_") || (t = "$" + e), r += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${t}')`, ke(e) && (r += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"), ue(r);
        }), Ie(e);
      }
      function Ie(e) {
        Object.getOwnPropertyDescriptor(d, e) || Object.defineProperty(d, e, {
          configurable: true,
          get() {
            var r = `'${e}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
            ke(e) && (r += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"), N(r);
          }
        });
      }
      function Se() {
        var e = Z.buffer;
        C = new Int8Array(e), d.HEAPU8 = Q = new Uint8Array(e), T = new Int32Array(e), d.HEAPU32 = p = new Uint32Array(e), d.HEAPF64 = new Float64Array(e), G = new BigInt64Array(e), new BigUint64Array(e);
      }
      f(typeof Int32Array < "u" && typeof Float64Array < "u" && Int32Array.prototype.subarray != null && Int32Array.prototype.set != null, "JS engine does not provide full typed array support");
      function Ue() {
        if (d.preRun) for (typeof d.preRun == "function" && (d.preRun = [
          d.preRun
        ]); d.preRun.length; ) hr(d.preRun.shift());
        de("preRun"), $e(Ve);
      }
      function or() {
        f(!oe), oe = true, ve(), !d.noFSInit && !n.initialized && n.init(), B.__wasm_call_ctors(), n.ignorePermissions = false;
      }
      function ir() {
        if (ve(), d.postRun) for (typeof d.postRun == "function" && (d.postRun = [
          d.postRun
        ]); d.postRun.length; ) vr(d.postRun.shift());
        de("postRun"), $e(Ye);
      }
      var ce = 0, Te = null, he = {}, fe = null;
      function ar(e) {
        for (var r = e; ; ) {
          if (!he[e]) return e;
          e = r + Math.random();
        }
      }
      function We(e) {
        var _a;
        ce++, (_a = d.monitorRunDependencies) == null ? void 0 : _a.call(d, ce), e ? (f(!he[e]), he[e] = 1, fe === null && typeof setInterval < "u" && (fe = setInterval(() => {
          if (ne) {
            clearInterval(fe), fe = null;
            return;
          }
          var r = false;
          for (var t in he) r || (r = true, b("still waiting on run dependencies:")), b(`dependency: ${t}`);
          r && b("(end of list)");
        }, 1e4))) : b("warning: run dependency added without ID");
      }
      function Be(e) {
        var _a;
        if (ce--, (_a = d.monitorRunDependencies) == null ? void 0 : _a.call(d, ce), e ? (f(he[e]), delete he[e]) : b("warning: run dependency removed without ID"), ce == 0 && (fe !== null && (clearInterval(fe), fe = null), Te)) {
          var r = Te;
          Te = null, r();
        }
      }
      function N(e) {
        var _a;
        (_a = d.onAbort) == null ? void 0 : _a.call(d, e), e = "Aborted(" + e + ")", b(e), ne = true;
        var r = new WebAssembly.RuntimeError(e);
        throw X(r), r;
      }
      function Ae(e, r) {
        return (...t) => {
          f(oe, `native function \`${e}\` called before runtime initialization`);
          var o = B[e];
          return f(o, `exported native function \`${e}\` not found`), f(t.length <= r, `native function \`${e}\` called with ${t.length} args but expects ${r}`), o(...t);
        };
      }
      var Pe;
      function sr() {
        return d.locateFile ? V("deform.wasm") : new URL("" + new URL("deform-Clgyi9fe.wasm", import.meta.url).href, import.meta.url).href;
      }
      function lr(e) {
        if (e == Pe && J) return new Uint8Array(J);
        if (re) return re(e);
        throw "both async and sync fetching of the wasm failed";
      }
      async function dr(e) {
        if (!J) try {
          var r = await j(e);
          return new Uint8Array(r);
        } catch {
        }
        return lr(e);
      }
      async function cr(e, r) {
        try {
          var t = await dr(e), o = await WebAssembly.instantiate(t, r);
          return o;
        } catch (i) {
          b(`failed to asynchronously prepare wasm: ${i}`), ie(Pe) && b(`warning: Loading from a file URI (${Pe}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`), N(i);
        }
      }
      async function fr(e, r, t) {
        if (!e && typeof WebAssembly.instantiateStreaming == "function" && !ie(r) && !P) try {
          var o = fetch(r, {
            credentials: "same-origin"
          }), i = await WebAssembly.instantiateStreaming(o, t);
          return i;
        } catch (a) {
          b(`wasm streaming compile failed: ${a}`), b("falling back to ArrayBuffer instantiation");
        }
        return cr(r, t);
      }
      function ur() {
        return {
          env: er,
          wasi_snapshot_preview1: er
        };
      }
      async function mr() {
        function e(s, l) {
          return B = s.exports, Z = B.memory, f(Z, "memory not found in wasm exports"), Se(), Be("wasm-instantiate"), B;
        }
        We("wasm-instantiate");
        var r = d;
        function t(s) {
          return f(d === r, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"), r = null, e(s.instance);
        }
        var o = ur();
        if (d.instantiateWasm) return new Promise((s, l) => {
          try {
            d.instantiateWasm(o, (c, v) => {
              s(e(c, v));
            });
          } catch (c) {
            b(`Module.instantiateWasm callback failed with error: ${c}`), l(c);
          }
        });
        Pe ?? (Pe = sr());
        try {
          var i = await fr(J, Pe, o), a = t(i);
          return a;
        } catch (s) {
          return X(s), Promise.reject(s);
        }
      }
      var $e = (e) => {
        for (; e.length > 0; ) e.shift()(d);
      }, Ye = [], vr = (e) => Ye.push(e), Ve = [], hr = (e) => Ve.push(e), Fe = (e) => (f(typeof e == "number"), e >>>= 0, "0x" + e.toString(16).padStart(8, "0")), ue = (e) => {
        ue.shown || (ue.shown = {}), ue.shown[e] || (ue.shown[e] = 1, P && (e = "warning: " + e), b(e));
      }, Ke = typeof TextDecoder < "u" ? new TextDecoder() : void 0, Ee = (e, r = 0, t = NaN) => {
        for (var o = r + t, i = r; e[i] && !(i >= o); ) ++i;
        if (i - r > 16 && e.buffer && Ke) return Ke.decode(e.subarray(r, i));
        for (var a = ""; r < i; ) {
          var s = e[r++];
          if (!(s & 128)) {
            a += String.fromCharCode(s);
            continue;
          }
          var l = e[r++] & 63;
          if ((s & 224) == 192) {
            a += String.fromCharCode((s & 31) << 6 | l);
            continue;
          }
          var c = e[r++] & 63;
          if ((s & 240) == 224 ? s = (s & 15) << 12 | l << 6 | c : ((s & 248) != 240 && ue("Invalid UTF-8 leading byte " + Fe(s) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"), s = (s & 7) << 18 | l << 12 | c << 6 | e[r++] & 63), s < 65536) a += String.fromCharCode(s);
          else {
            var v = s - 65536;
            a += String.fromCharCode(55296 | v >> 10, 56320 | v & 1023);
          }
        }
        return a;
      }, Ne = (e, r) => (f(typeof e == "number", `UTF8ToString expects a number (got ${typeof e})`), e ? Ee(Q, e, r) : ""), Er = (e, r, t, o) => N(`Assertion failed: ${Ne(e)}, at: ` + [
        r ? Ne(r) : "unknown filename",
        t,
        o ? Ne(o) : "unknown function"
      ]);
      class pr {
        constructor(r) {
          this.excPtr = r, this.ptr = r - 24;
        }
        set_type(r) {
          p[this.ptr + 4 >> 2] = r;
        }
        get_type() {
          return p[this.ptr + 4 >> 2];
        }
        set_destructor(r) {
          p[this.ptr + 8 >> 2] = r;
        }
        get_destructor() {
          return p[this.ptr + 8 >> 2];
        }
        set_caught(r) {
          r = r ? 1 : 0, C[this.ptr + 12] = r;
        }
        get_caught() {
          return C[this.ptr + 12] != 0;
        }
        set_rethrown(r) {
          r = r ? 1 : 0, C[this.ptr + 13] = r;
        }
        get_rethrown() {
          return C[this.ptr + 13] != 0;
        }
        init(r, t) {
          this.set_adjusted_ptr(0), this.set_type(r), this.set_destructor(t);
        }
        set_adjusted_ptr(r) {
          p[this.ptr + 16 >> 2] = r;
        }
        get_adjusted_ptr() {
          return p[this.ptr + 16 >> 2];
        }
      }
      var wr = (e, r, t) => {
        var o = new pr(e);
        o.init(r, t), f(false, "Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.");
      }, yr = () => N("native code called abort()"), xe = (e, r, t, o) => {
        if (f(typeof e == "string", `stringToUTF8Array expects a string (got ${typeof e})`), !(o > 0)) return 0;
        for (var i = t, a = t + o - 1, s = 0; s < e.length; ++s) {
          var l = e.charCodeAt(s);
          if (l >= 55296 && l <= 57343) {
            var c = e.charCodeAt(++s);
            l = 65536 + ((l & 1023) << 10) | c & 1023;
          }
          if (l <= 127) {
            if (t >= a) break;
            r[t++] = l;
          } else if (l <= 2047) {
            if (t + 1 >= a) break;
            r[t++] = 192 | l >> 6, r[t++] = 128 | l & 63;
          } else if (l <= 65535) {
            if (t + 2 >= a) break;
            r[t++] = 224 | l >> 12, r[t++] = 128 | l >> 6 & 63, r[t++] = 128 | l & 63;
          } else {
            if (t + 3 >= a) break;
            l > 1114111 && ue("Invalid Unicode code point " + Fe(l) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF)."), r[t++] = 240 | l >> 18, r[t++] = 128 | l >> 12 & 63, r[t++] = 128 | l >> 6 & 63, r[t++] = 128 | l & 63;
          }
        }
        return r[t] = 0, t - i;
      }, Oe = (e, r, t) => (f(typeof t == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"), xe(e, Q, r, t)), Re = (e) => {
        for (var r = 0, t = 0; t < e.length; ++t) {
          var o = e.charCodeAt(t);
          o <= 127 ? r++ : o <= 2047 ? r += 2 : o >= 55296 && o <= 57343 ? (r += 4, ++t) : r += 3;
        }
        return r;
      }, gr = (e, r, t, o) => {
        var i = (/* @__PURE__ */ new Date()).getFullYear(), a = new Date(i, 0, 1), s = new Date(i, 6, 1), l = a.getTimezoneOffset(), c = s.getTimezoneOffset(), v = Math.max(l, c);
        p[e >> 2] = v * 60, T[r >> 2] = +(l != c);
        var y = (u) => {
          var h = u >= 0 ? "-" : "+", O = Math.abs(u), W = String(Math.floor(O / 60)).padStart(2, "0"), I = String(O % 60).padStart(2, "0");
          return `UTC${h}${W}${I}`;
        }, g = y(l), E = y(c);
        f(g), f(E), f(Re(g) <= 16, `timezone name truncated to fit in TZNAME_MAX (${g})`), f(Re(E) <= 16, `timezone name truncated to fit in TZNAME_MAX (${E})`), c < l ? (Oe(g, t, 17), Oe(E, o, 17)) : (Oe(g, o, 17), Oe(E, t, 17));
      }, _r = () => 2147483648, kr = (e, r) => (f(r, "alignment argument is required"), Math.ceil(e / r) * r), br = (e) => {
        var r = Z.buffer, t = (e - r.byteLength + 65535) / 65536 | 0;
        try {
          return Z.grow(t), Se(), 1;
        } catch (o) {
          b(`growMemory: Attempted to grow heap from ${r.byteLength} bytes to ${e} bytes, but got error: ${o}`);
        }
      }, Sr = (e) => {
        var r = Q.length;
        e >>>= 0, f(e > r);
        var t = _r();
        if (e > t) return b(`Cannot enlarge memory, requested ${e} bytes, but the limit is ${t} bytes!`), false;
        for (var o = 1; o <= 4; o *= 2) {
          var i = r * (1 + 0.2 / o);
          i = Math.min(i, e + 100663296);
          var a = Math.min(t, kr(Math.max(e, i), 65536)), s = br(a);
          if (s) return true;
        }
        return b(`Failed to grow the heap from ${r} bytes to ${a} bytes, not enough memory!`), false;
      }, ze = {}, Tr = () => se || "./this.program", De = () => {
        if (!De.strings) {
          var e = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", r = {
            USER: "web_user",
            LOGNAME: "web_user",
            PATH: "/",
            PWD: "/",
            HOME: "/home/web_user",
            LANG: e,
            _: Tr()
          };
          for (var t in ze) ze[t] === void 0 ? delete r[t] : r[t] = ze[t];
          var o = [];
          for (var t in r) o.push(`${t}=${r[t]}`);
          De.strings = o;
        }
        return De.strings;
      }, Ar = (e, r) => {
        var t = 0, o = 0;
        for (var i of De()) {
          var a = r + t;
          p[e + o >> 2] = a, t += Oe(i, a, 1 / 0) + 1, o += 4;
        }
        return 0;
      }, Pr = (e, r) => {
        var t = De();
        p[e >> 2] = t.length;
        var o = 0;
        for (var i of t) o += Re(i) + 1;
        return p[r >> 2] = o, 0;
      }, w = {
        isAbs: (e) => e.charAt(0) === "/",
        splitPath: (e) => {
          var r = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
          return r.exec(e).slice(1);
        },
        normalizeArray: (e, r) => {
          for (var t = 0, o = e.length - 1; o >= 0; o--) {
            var i = e[o];
            i === "." ? e.splice(o, 1) : i === ".." ? (e.splice(o, 1), t++) : t && (e.splice(o, 1), t--);
          }
          if (r) for (; t; t--) e.unshift("..");
          return e;
        },
        normalize: (e) => {
          var r = w.isAbs(e), t = e.slice(-1) === "/";
          return e = w.normalizeArray(e.split("/").filter((o) => !!o), !r).join("/"), !e && !r && (e = "."), e && t && (e += "/"), (r ? "/" : "") + e;
        },
        dirname: (e) => {
          var r = w.splitPath(e), t = r[0], o = r[1];
          return !t && !o ? "." : (o && (o = o.slice(0, -1)), t + o);
        },
        basename: (e) => e && e.match(/([^\/]+|\/)\/*$/)[1],
        join: (...e) => w.normalize(e.join("/")),
        join2: (e, r) => w.normalize(e + "/" + r)
      }, Fr = () => {
        if (P) {
          var e = q("crypto");
          return (r) => e.randomFillSync(r);
        }
        return (r) => crypto.getRandomValues(r);
      }, Xe = (e) => {
        (Xe = Fr())(e);
      }, pe = {
        resolve: (...e) => {
          for (var r = "", t = false, o = e.length - 1; o >= -1 && !t; o--) {
            var i = o >= 0 ? e[o] : n.cwd();
            if (typeof i != "string") throw new TypeError("Arguments to path.resolve must be strings");
            if (!i) return "";
            r = i + "/" + r, t = w.isAbs(i);
          }
          return r = w.normalizeArray(r.split("/").filter((a) => !!a), !t).join("/"), (t ? "/" : "") + r || ".";
        },
        relative: (e, r) => {
          e = pe.resolve(e).slice(1), r = pe.resolve(r).slice(1);
          function t(v) {
            for (var y = 0; y < v.length && v[y] === ""; y++) ;
            for (var g = v.length - 1; g >= 0 && v[g] === ""; g--) ;
            return y > g ? [] : v.slice(y, g - y + 1);
          }
          for (var o = t(e.split("/")), i = t(r.split("/")), a = Math.min(o.length, i.length), s = a, l = 0; l < a; l++) if (o[l] !== i[l]) {
            s = l;
            break;
          }
          for (var c = [], l = s; l < o.length; l++) c.push("..");
          return c = c.concat(i.slice(s)), c.join("/");
        }
      }, He = [], qe = (e, r, t) => {
        var o = Re(e) + 1, i = new Array(o), a = xe(e, i, 0, i.length);
        return i.length = a, i;
      }, Nr = () => {
        if (!He.length) {
          var e = null;
          if (P) {
            var r = 256, t = Buffer.alloc(r), o = 0, i = process.stdin.fd;
            try {
              o = le.readSync(i, t, 0, r);
            } catch (a) {
              if (a.toString().includes("EOF")) o = 0;
              else throw a;
            }
            o > 0 && (e = t.slice(0, o).toString("utf-8"));
          } else typeof window < "u" && typeof window.prompt == "function" && (e = window.prompt("Input: "), e !== null && (e += `
`));
          if (!e) return null;
          He = qe(e);
        }
        return He.shift();
      }, me = {
        ttys: [],
        init() {
        },
        shutdown() {
        },
        register(e, r) {
          me.ttys[e] = {
            input: [],
            output: [],
            ops: r
          }, n.registerDevice(e, me.stream_ops);
        },
        stream_ops: {
          open(e) {
            var r = me.ttys[e.node.rdev];
            if (!r) throw new n.ErrnoError(43);
            e.tty = r, e.seekable = false;
          },
          close(e) {
            e.tty.ops.fsync(e.tty);
          },
          fsync(e) {
            e.tty.ops.fsync(e.tty);
          },
          read(e, r, t, o, i) {
            if (!e.tty || !e.tty.ops.get_char) throw new n.ErrnoError(60);
            for (var a = 0, s = 0; s < o; s++) {
              var l;
              try {
                l = e.tty.ops.get_char(e.tty);
              } catch {
                throw new n.ErrnoError(29);
              }
              if (l === void 0 && a === 0) throw new n.ErrnoError(6);
              if (l == null) break;
              a++, r[t + s] = l;
            }
            return a && (e.node.atime = Date.now()), a;
          },
          write(e, r, t, o, i) {
            if (!e.tty || !e.tty.ops.put_char) throw new n.ErrnoError(60);
            try {
              for (var a = 0; a < o; a++) e.tty.ops.put_char(e.tty, r[t + a]);
            } catch {
              throw new n.ErrnoError(29);
            }
            return o && (e.node.mtime = e.node.ctime = Date.now()), a;
          }
        },
        default_tty_ops: {
          get_char(e) {
            return Nr();
          },
          put_char(e, r) {
            r === null || r === 10 ? (te(Ee(e.output)), e.output = []) : r != 0 && e.output.push(r);
          },
          fsync(e) {
            var _a;
            ((_a = e.output) == null ? void 0 : _a.length) > 0 && (te(Ee(e.output)), e.output = []);
          },
          ioctl_tcgets(e) {
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
          ioctl_tcsets(e, r, t) {
            return 0;
          },
          ioctl_tiocgwinsz(e) {
            return [
              24,
              80
            ];
          }
        },
        default_tty1_ops: {
          put_char(e, r) {
            r === null || r === 10 ? (b(Ee(e.output)), e.output = []) : r != 0 && e.output.push(r);
          },
          fsync(e) {
            var _a;
            ((_a = e.output) == null ? void 0 : _a.length) > 0 && (b(Ee(e.output)), e.output = []);
          }
        }
      }, Je = (e) => {
        N("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported");
      }, m = {
        ops_table: null,
        mount(e) {
          return m.createNode(null, "/", 16895, 0);
        },
        createNode(e, r, t, o) {
          if (n.isBlkdev(t) || n.isFIFO(t)) throw new n.ErrnoError(63);
          m.ops_table || (m.ops_table = {
            dir: {
              node: {
                getattr: m.node_ops.getattr,
                setattr: m.node_ops.setattr,
                lookup: m.node_ops.lookup,
                mknod: m.node_ops.mknod,
                rename: m.node_ops.rename,
                unlink: m.node_ops.unlink,
                rmdir: m.node_ops.rmdir,
                readdir: m.node_ops.readdir,
                symlink: m.node_ops.symlink
              },
              stream: {
                llseek: m.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: m.node_ops.getattr,
                setattr: m.node_ops.setattr
              },
              stream: {
                llseek: m.stream_ops.llseek,
                read: m.stream_ops.read,
                write: m.stream_ops.write,
                mmap: m.stream_ops.mmap,
                msync: m.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: m.node_ops.getattr,
                setattr: m.node_ops.setattr,
                readlink: m.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: m.node_ops.getattr,
                setattr: m.node_ops.setattr
              },
              stream: n.chrdev_stream_ops
            }
          });
          var i = n.createNode(e, r, t, o);
          return n.isDir(i.mode) ? (i.node_ops = m.ops_table.dir.node, i.stream_ops = m.ops_table.dir.stream, i.contents = {}) : n.isFile(i.mode) ? (i.node_ops = m.ops_table.file.node, i.stream_ops = m.ops_table.file.stream, i.usedBytes = 0, i.contents = null) : n.isLink(i.mode) ? (i.node_ops = m.ops_table.link.node, i.stream_ops = m.ops_table.link.stream) : n.isChrdev(i.mode) && (i.node_ops = m.ops_table.chrdev.node, i.stream_ops = m.ops_table.chrdev.stream), i.atime = i.mtime = i.ctime = Date.now(), e && (e.contents[r] = i, e.atime = e.mtime = e.ctime = i.atime), i;
        },
        getFileDataAsTypedArray(e) {
          return e.contents ? e.contents.subarray ? e.contents.subarray(0, e.usedBytes) : new Uint8Array(e.contents) : new Uint8Array(0);
        },
        expandFileStorage(e, r) {
          var t = e.contents ? e.contents.length : 0;
          if (!(t >= r)) {
            var o = 1024 * 1024;
            r = Math.max(r, t * (t < o ? 2 : 1.125) >>> 0), t != 0 && (r = Math.max(r, 256));
            var i = e.contents;
            e.contents = new Uint8Array(r), e.usedBytes > 0 && e.contents.set(i.subarray(0, e.usedBytes), 0);
          }
        },
        resizeFileStorage(e, r) {
          if (e.usedBytes != r) if (r == 0) e.contents = null, e.usedBytes = 0;
          else {
            var t = e.contents;
            e.contents = new Uint8Array(r), t && e.contents.set(t.subarray(0, Math.min(r, e.usedBytes))), e.usedBytes = r;
          }
        },
        node_ops: {
          getattr(e) {
            var r = {};
            return r.dev = n.isChrdev(e.mode) ? e.id : 1, r.ino = e.id, r.mode = e.mode, r.nlink = 1, r.uid = 0, r.gid = 0, r.rdev = e.rdev, n.isDir(e.mode) ? r.size = 4096 : n.isFile(e.mode) ? r.size = e.usedBytes : n.isLink(e.mode) ? r.size = e.link.length : r.size = 0, r.atime = new Date(e.atime), r.mtime = new Date(e.mtime), r.ctime = new Date(e.ctime), r.blksize = 4096, r.blocks = Math.ceil(r.size / r.blksize), r;
          },
          setattr(e, r) {
            for (const t of [
              "mode",
              "atime",
              "mtime",
              "ctime"
            ]) r[t] != null && (e[t] = r[t]);
            r.size !== void 0 && m.resizeFileStorage(e, r.size);
          },
          lookup(e, r) {
            throw new n.ErrnoError(44);
          },
          mknod(e, r, t, o) {
            return m.createNode(e, r, t, o);
          },
          rename(e, r, t) {
            var o;
            try {
              o = n.lookupNode(r, t);
            } catch {
            }
            if (o) {
              if (n.isDir(e.mode)) for (var i in o.contents) throw new n.ErrnoError(55);
              n.hashRemoveNode(o);
            }
            delete e.parent.contents[e.name], r.contents[t] = e, e.name = t, r.ctime = r.mtime = e.parent.ctime = e.parent.mtime = Date.now();
          },
          unlink(e, r) {
            delete e.contents[r], e.ctime = e.mtime = Date.now();
          },
          rmdir(e, r) {
            var t = n.lookupNode(e, r);
            for (var o in t.contents) throw new n.ErrnoError(55);
            delete e.contents[r], e.ctime = e.mtime = Date.now();
          },
          readdir(e) {
            return [
              ".",
              "..",
              ...Object.keys(e.contents)
            ];
          },
          symlink(e, r, t) {
            var o = m.createNode(e, r, 41471, 0);
            return o.link = t, o;
          },
          readlink(e) {
            if (!n.isLink(e.mode)) throw new n.ErrnoError(28);
            return e.link;
          }
        },
        stream_ops: {
          read(e, r, t, o, i) {
            var a = e.node.contents;
            if (i >= e.node.usedBytes) return 0;
            var s = Math.min(e.node.usedBytes - i, o);
            if (f(s >= 0), s > 8 && a.subarray) r.set(a.subarray(i, i + s), t);
            else for (var l = 0; l < s; l++) r[t + l] = a[i + l];
            return s;
          },
          write(e, r, t, o, i, a) {
            if (f(!(r instanceof ArrayBuffer)), r.buffer === C.buffer && (a = false), !o) return 0;
            var s = e.node;
            if (s.mtime = s.ctime = Date.now(), r.subarray && (!s.contents || s.contents.subarray)) {
              if (a) return f(i === 0, "canOwn must imply no weird position inside the file"), s.contents = r.subarray(t, t + o), s.usedBytes = o, o;
              if (s.usedBytes === 0 && i === 0) return s.contents = r.slice(t, t + o), s.usedBytes = o, o;
              if (i + o <= s.usedBytes) return s.contents.set(r.subarray(t, t + o), i), o;
            }
            if (m.expandFileStorage(s, i + o), s.contents.subarray && r.subarray) s.contents.set(r.subarray(t, t + o), i);
            else for (var l = 0; l < o; l++) s.contents[i + l] = r[t + l];
            return s.usedBytes = Math.max(s.usedBytes, i + o), o;
          },
          llseek(e, r, t) {
            var o = r;
            if (t === 1 ? o += e.position : t === 2 && n.isFile(e.node.mode) && (o += e.node.usedBytes), o < 0) throw new n.ErrnoError(28);
            return o;
          },
          mmap(e, r, t, o, i) {
            if (!n.isFile(e.node.mode)) throw new n.ErrnoError(43);
            var a, s, l = e.node.contents;
            if (!(i & 2) && l && l.buffer === C.buffer) s = false, a = l.byteOffset;
            else {
              if (s = true, a = Je(), !a) throw new n.ErrnoError(48);
              l && ((t > 0 || t + r < l.length) && (l.subarray ? l = l.subarray(t, t + r) : l = Array.prototype.slice.call(l, t, t + r)), C.set(l, a));
            }
            return {
              ptr: a,
              allocated: s
            };
          },
          msync(e, r, t, o, i) {
            return m.stream_ops.write(e, r, 0, o, t, false), 0;
          }
        }
      }, Or = async (e) => {
        var r = await j(e);
        return f(r, `Loading data file "${e}" failed (no arrayBuffer).`), new Uint8Array(r);
      }, Rr = (e, r, t, o, i, a) => {
        n.createDataFile(e, r, t, o, i, a);
      }, Ze = [], Dr = (e, r, t, o) => {
        typeof Browser < "u" && Browser.init();
        var i = false;
        return Ze.forEach((a) => {
          i || a.canHandle(r) && (a.handle(e, r, t, o), i = true);
        }), i;
      }, Mr = (e, r, t, o, i, a, s, l, c, v) => {
        var y = r ? pe.resolve(w.join2(e, r)) : e, g = ar(`cp ${y}`);
        function E(u) {
          function h(O) {
            v == null ? void 0 : v(), l || Rr(e, r, O, o, i, c), a == null ? void 0 : a(), Be(g);
          }
          Dr(u, y, h, () => {
            s == null ? void 0 : s(), Be(g);
          }) || h(u);
        }
        We(g), typeof t == "string" ? Or(t).then(E, s) : E(t);
      }, Cr = (e) => {
        var r = {
          r: 0,
          "r+": 2,
          w: 577,
          "w+": 578,
          a: 1089,
          "a+": 1090
        }, t = r[e];
        if (typeof t > "u") throw new Error(`Unknown file open mode: ${e}`);
        return t;
      }, je = (e, r) => {
        var t = 0;
        return e && (t |= 365), r && (t |= 146), t;
      }, Lr = (e) => Ne(Xr(e)), Qe = {
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
      }, n = {
        root: null,
        mounts: [],
        devices: {},
        streams: [],
        nextInode: 1,
        nameTable: null,
        currentPath: "/",
        initialized: false,
        ignorePermissions: true,
        filesystems: null,
        syncFSRequests: 0,
        readFiles: {},
        ErrnoError: class extends Error {
          constructor(e) {
            super(oe ? Lr(e) : "");
            __publicField(this, "name", "ErrnoError");
            this.errno = e;
            for (var r in Qe) if (Qe[r] === e) {
              this.code = r;
              break;
            }
          }
        },
        FSStream: class {
          constructor() {
            __publicField(this, "shared", {});
          }
          get object() {
            return this.node;
          }
          set object(e) {
            this.node = e;
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
          set flags(e) {
            this.shared.flags = e;
          }
          get position() {
            return this.shared.position;
          }
          set position(e) {
            this.shared.position = e;
          }
        },
        FSNode: class {
          constructor(e, r, t, o) {
            __publicField(this, "node_ops", {});
            __publicField(this, "stream_ops", {});
            __publicField(this, "readMode", 365);
            __publicField(this, "writeMode", 146);
            __publicField(this, "mounted", null);
            e || (e = this), this.parent = e, this.mount = e.mount, this.id = n.nextInode++, this.name = r, this.mode = t, this.rdev = o, this.atime = this.mtime = this.ctime = Date.now();
          }
          get read() {
            return (this.mode & this.readMode) === this.readMode;
          }
          set read(e) {
            e ? this.mode |= this.readMode : this.mode &= ~this.readMode;
          }
          get write() {
            return (this.mode & this.writeMode) === this.writeMode;
          }
          set write(e) {
            e ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
          }
          get isFolder() {
            return n.isDir(this.mode);
          }
          get isDevice() {
            return n.isChrdev(this.mode);
          }
        },
        lookupPath(e, r = {}) {
          if (!e) throw new n.ErrnoError(44);
          r.follow_mount ?? (r.follow_mount = true), w.isAbs(e) || (e = n.cwd() + "/" + e);
          e: for (var t = 0; t < 40; t++) {
            for (var o = e.split("/").filter((v) => !!v), i = n.root, a = "/", s = 0; s < o.length; s++) {
              var l = s === o.length - 1;
              if (l && r.parent) break;
              if (o[s] !== ".") {
                if (o[s] === "..") {
                  if (a = w.dirname(a), n.isRoot(i)) {
                    e = a + "/" + o.slice(s + 1).join("/");
                    continue e;
                  } else i = i.parent;
                  continue;
                }
                a = w.join2(a, o[s]);
                try {
                  i = n.lookupNode(i, o[s]);
                } catch (v) {
                  if ((v == null ? void 0 : v.errno) === 44 && l && r.noent_okay) return {
                    path: a
                  };
                  throw v;
                }
                if (n.isMountpoint(i) && (!l || r.follow_mount) && (i = i.mounted.root), n.isLink(i.mode) && (!l || r.follow)) {
                  if (!i.node_ops.readlink) throw new n.ErrnoError(52);
                  var c = i.node_ops.readlink(i);
                  w.isAbs(c) || (c = w.dirname(a) + "/" + c), e = c + "/" + o.slice(s + 1).join("/");
                  continue e;
                }
              }
            }
            return {
              path: a,
              node: i
            };
          }
          throw new n.ErrnoError(32);
        },
        getPath(e) {
          for (var r; ; ) {
            if (n.isRoot(e)) {
              var t = e.mount.mountpoint;
              return r ? t[t.length - 1] !== "/" ? `${t}/${r}` : t + r : t;
            }
            r = r ? `${e.name}/${r}` : e.name, e = e.parent;
          }
        },
        hashName(e, r) {
          for (var t = 0, o = 0; o < r.length; o++) t = (t << 5) - t + r.charCodeAt(o) | 0;
          return (e + t >>> 0) % n.nameTable.length;
        },
        hashAddNode(e) {
          var r = n.hashName(e.parent.id, e.name);
          e.name_next = n.nameTable[r], n.nameTable[r] = e;
        },
        hashRemoveNode(e) {
          var r = n.hashName(e.parent.id, e.name);
          if (n.nameTable[r] === e) n.nameTable[r] = e.name_next;
          else for (var t = n.nameTable[r]; t; ) {
            if (t.name_next === e) {
              t.name_next = e.name_next;
              break;
            }
            t = t.name_next;
          }
        },
        lookupNode(e, r) {
          var t = n.mayLookup(e);
          if (t) throw new n.ErrnoError(t);
          for (var o = n.hashName(e.id, r), i = n.nameTable[o]; i; i = i.name_next) {
            var a = i.name;
            if (i.parent.id === e.id && a === r) return i;
          }
          return n.lookup(e, r);
        },
        createNode(e, r, t, o) {
          f(typeof e == "object");
          var i = new n.FSNode(e, r, t, o);
          return n.hashAddNode(i), i;
        },
        destroyNode(e) {
          n.hashRemoveNode(e);
        },
        isRoot(e) {
          return e === e.parent;
        },
        isMountpoint(e) {
          return !!e.mounted;
        },
        isFile(e) {
          return (e & 61440) === 32768;
        },
        isDir(e) {
          return (e & 61440) === 16384;
        },
        isLink(e) {
          return (e & 61440) === 40960;
        },
        isChrdev(e) {
          return (e & 61440) === 8192;
        },
        isBlkdev(e) {
          return (e & 61440) === 24576;
        },
        isFIFO(e) {
          return (e & 61440) === 4096;
        },
        isSocket(e) {
          return (e & 49152) === 49152;
        },
        flagsToPermissionString(e) {
          var r = [
            "r",
            "w",
            "rw"
          ][e & 3];
          return e & 512 && (r += "w"), r;
        },
        nodePermissions(e, r) {
          return n.ignorePermissions ? 0 : r.includes("r") && !(e.mode & 292) || r.includes("w") && !(e.mode & 146) || r.includes("x") && !(e.mode & 73) ? 2 : 0;
        },
        mayLookup(e) {
          if (!n.isDir(e.mode)) return 54;
          var r = n.nodePermissions(e, "x");
          return r || (e.node_ops.lookup ? 0 : 2);
        },
        mayCreate(e, r) {
          if (!n.isDir(e.mode)) return 54;
          try {
            var t = n.lookupNode(e, r);
            return 20;
          } catch {
          }
          return n.nodePermissions(e, "wx");
        },
        mayDelete(e, r, t) {
          var o;
          try {
            o = n.lookupNode(e, r);
          } catch (a) {
            return a.errno;
          }
          var i = n.nodePermissions(e, "wx");
          if (i) return i;
          if (t) {
            if (!n.isDir(o.mode)) return 54;
            if (n.isRoot(o) || n.getPath(o) === n.cwd()) return 10;
          } else if (n.isDir(o.mode)) return 31;
          return 0;
        },
        mayOpen(e, r) {
          return e ? n.isLink(e.mode) ? 32 : n.isDir(e.mode) && (n.flagsToPermissionString(r) !== "r" || r & 576) ? 31 : n.nodePermissions(e, n.flagsToPermissionString(r)) : 44;
        },
        checkOpExists(e, r) {
          if (!e) throw new n.ErrnoError(r);
          return e;
        },
        MAX_OPEN_FDS: 4096,
        nextfd() {
          for (var e = 0; e <= n.MAX_OPEN_FDS; e++) if (!n.streams[e]) return e;
          throw new n.ErrnoError(33);
        },
        getStreamChecked(e) {
          var r = n.getStream(e);
          if (!r) throw new n.ErrnoError(8);
          return r;
        },
        getStream: (e) => n.streams[e],
        createStream(e, r = -1) {
          return f(r >= -1), e = Object.assign(new n.FSStream(), e), r == -1 && (r = n.nextfd()), e.fd = r, n.streams[r] = e, e;
        },
        closeStream(e) {
          n.streams[e] = null;
        },
        dupStream(e, r = -1) {
          var _a, _b;
          var t = n.createStream(e, r);
          return (_b = (_a = t.stream_ops) == null ? void 0 : _a.dup) == null ? void 0 : _b.call(_a, t), t;
        },
        doSetAttr(e, r, t) {
          var o = e == null ? void 0 : e.stream_ops.setattr, i = o ? e : r;
          o ?? (o = r.node_ops.setattr), n.checkOpExists(o, 63), o(i, t);
        },
        chrdev_stream_ops: {
          open(e) {
            var _a, _b;
            var r = n.getDevice(e.node.rdev);
            e.stream_ops = r.stream_ops, (_b = (_a = e.stream_ops).open) == null ? void 0 : _b.call(_a, e);
          },
          llseek() {
            throw new n.ErrnoError(70);
          }
        },
        major: (e) => e >> 8,
        minor: (e) => e & 255,
        makedev: (e, r) => e << 8 | r,
        registerDevice(e, r) {
          n.devices[e] = {
            stream_ops: r
          };
        },
        getDevice: (e) => n.devices[e],
        getMounts(e) {
          for (var r = [], t = [
            e
          ]; t.length; ) {
            var o = t.pop();
            r.push(o), t.push(...o.mounts);
          }
          return r;
        },
        syncfs(e, r) {
          typeof e == "function" && (r = e, e = false), n.syncFSRequests++, n.syncFSRequests > 1 && b(`warning: ${n.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
          var t = n.getMounts(n.root.mount), o = 0;
          function i(s) {
            return f(n.syncFSRequests > 0), n.syncFSRequests--, r(s);
          }
          function a(s) {
            if (s) return a.errored ? void 0 : (a.errored = true, i(s));
            ++o >= t.length && i(null);
          }
          t.forEach((s) => {
            if (!s.type.syncfs) return a(null);
            s.type.syncfs(s, e, a);
          });
        },
        mount(e, r, t) {
          if (typeof e == "string") throw e;
          var o = t === "/", i = !t, a;
          if (o && n.root) throw new n.ErrnoError(10);
          if (!o && !i) {
            var s = n.lookupPath(t, {
              follow_mount: false
            });
            if (t = s.path, a = s.node, n.isMountpoint(a)) throw new n.ErrnoError(10);
            if (!n.isDir(a.mode)) throw new n.ErrnoError(54);
          }
          var l = {
            type: e,
            opts: r,
            mountpoint: t,
            mounts: []
          }, c = e.mount(l);
          return c.mount = l, l.root = c, o ? n.root = c : a && (a.mounted = l, a.mount && a.mount.mounts.push(l)), c;
        },
        unmount(e) {
          var r = n.lookupPath(e, {
            follow_mount: false
          });
          if (!n.isMountpoint(r.node)) throw new n.ErrnoError(28);
          var t = r.node, o = t.mounted, i = n.getMounts(o);
          Object.keys(n.nameTable).forEach((s) => {
            for (var l = n.nameTable[s]; l; ) {
              var c = l.name_next;
              i.includes(l.mount) && n.destroyNode(l), l = c;
            }
          }), t.mounted = null;
          var a = t.mount.mounts.indexOf(o);
          f(a !== -1), t.mount.mounts.splice(a, 1);
        },
        lookup(e, r) {
          return e.node_ops.lookup(e, r);
        },
        mknod(e, r, t) {
          var o = n.lookupPath(e, {
            parent: true
          }), i = o.node, a = w.basename(e);
          if (!a) throw new n.ErrnoError(28);
          if (a === "." || a === "..") throw new n.ErrnoError(20);
          var s = n.mayCreate(i, a);
          if (s) throw new n.ErrnoError(s);
          if (!i.node_ops.mknod) throw new n.ErrnoError(63);
          return i.node_ops.mknod(i, a, r, t);
        },
        statfs(e) {
          return n.statfsNode(n.lookupPath(e, {
            follow: true
          }).node);
        },
        statfsStream(e) {
          return n.statfsNode(e.node);
        },
        statfsNode(e) {
          var r = {
            bsize: 4096,
            frsize: 4096,
            blocks: 1e6,
            bfree: 5e5,
            bavail: 5e5,
            files: n.nextInode,
            ffree: n.nextInode - 1,
            fsid: 42,
            flags: 2,
            namelen: 255
          };
          return e.node_ops.statfs && Object.assign(r, e.node_ops.statfs(e.mount.opts.root)), r;
        },
        create(e, r = 438) {
          return r &= 4095, r |= 32768, n.mknod(e, r, 0);
        },
        mkdir(e, r = 511) {
          return r &= 1023, r |= 16384, n.mknod(e, r, 0);
        },
        mkdirTree(e, r) {
          var t = e.split("/"), o = "";
          for (var i of t) if (i) {
            (o || w.isAbs(e)) && (o += "/"), o += i;
            try {
              n.mkdir(o, r);
            } catch (a) {
              if (a.errno != 20) throw a;
            }
          }
        },
        mkdev(e, r, t) {
          return typeof t > "u" && (t = r, r = 438), r |= 8192, n.mknod(e, r, t);
        },
        symlink(e, r) {
          if (!pe.resolve(e)) throw new n.ErrnoError(44);
          var t = n.lookupPath(r, {
            parent: true
          }), o = t.node;
          if (!o) throw new n.ErrnoError(44);
          var i = w.basename(r), a = n.mayCreate(o, i);
          if (a) throw new n.ErrnoError(a);
          if (!o.node_ops.symlink) throw new n.ErrnoError(63);
          return o.node_ops.symlink(o, i, e);
        },
        rename(e, r) {
          var t = w.dirname(e), o = w.dirname(r), i = w.basename(e), a = w.basename(r), s, l, c;
          if (s = n.lookupPath(e, {
            parent: true
          }), l = s.node, s = n.lookupPath(r, {
            parent: true
          }), c = s.node, !l || !c) throw new n.ErrnoError(44);
          if (l.mount !== c.mount) throw new n.ErrnoError(75);
          var v = n.lookupNode(l, i), y = pe.relative(e, o);
          if (y.charAt(0) !== ".") throw new n.ErrnoError(28);
          if (y = pe.relative(r, t), y.charAt(0) !== ".") throw new n.ErrnoError(55);
          var g;
          try {
            g = n.lookupNode(c, a);
          } catch {
          }
          if (v !== g) {
            var E = n.isDir(v.mode), u = n.mayDelete(l, i, E);
            if (u) throw new n.ErrnoError(u);
            if (u = g ? n.mayDelete(c, a, E) : n.mayCreate(c, a), u) throw new n.ErrnoError(u);
            if (!l.node_ops.rename) throw new n.ErrnoError(63);
            if (n.isMountpoint(v) || g && n.isMountpoint(g)) throw new n.ErrnoError(10);
            if (c !== l && (u = n.nodePermissions(l, "w"), u)) throw new n.ErrnoError(u);
            n.hashRemoveNode(v);
            try {
              l.node_ops.rename(v, c, a), v.parent = c;
            } catch (h) {
              throw h;
            } finally {
              n.hashAddNode(v);
            }
          }
        },
        rmdir(e) {
          var r = n.lookupPath(e, {
            parent: true
          }), t = r.node, o = w.basename(e), i = n.lookupNode(t, o), a = n.mayDelete(t, o, true);
          if (a) throw new n.ErrnoError(a);
          if (!t.node_ops.rmdir) throw new n.ErrnoError(63);
          if (n.isMountpoint(i)) throw new n.ErrnoError(10);
          t.node_ops.rmdir(t, o), n.destroyNode(i);
        },
        readdir(e) {
          var r = n.lookupPath(e, {
            follow: true
          }), t = r.node, o = n.checkOpExists(t.node_ops.readdir, 54);
          return o(t);
        },
        unlink(e) {
          var r = n.lookupPath(e, {
            parent: true
          }), t = r.node;
          if (!t) throw new n.ErrnoError(44);
          var o = w.basename(e), i = n.lookupNode(t, o), a = n.mayDelete(t, o, false);
          if (a) throw new n.ErrnoError(a);
          if (!t.node_ops.unlink) throw new n.ErrnoError(63);
          if (n.isMountpoint(i)) throw new n.ErrnoError(10);
          t.node_ops.unlink(t, o), n.destroyNode(i);
        },
        readlink(e) {
          var r = n.lookupPath(e), t = r.node;
          if (!t) throw new n.ErrnoError(44);
          if (!t.node_ops.readlink) throw new n.ErrnoError(28);
          return t.node_ops.readlink(t);
        },
        stat(e, r) {
          var t = n.lookupPath(e, {
            follow: !r
          }), o = t.node, i = n.checkOpExists(o.node_ops.getattr, 63);
          return i(o);
        },
        fstat(e) {
          var r = n.getStreamChecked(e), t = r.node, o = r.stream_ops.getattr, i = o ? r : t;
          return o ?? (o = t.node_ops.getattr), n.checkOpExists(o, 63), o(i);
        },
        lstat(e) {
          return n.stat(e, true);
        },
        doChmod(e, r, t, o) {
          n.doSetAttr(e, r, {
            mode: t & 4095 | r.mode & -4096,
            ctime: Date.now(),
            dontFollow: o
          });
        },
        chmod(e, r, t) {
          var o;
          if (typeof e == "string") {
            var i = n.lookupPath(e, {
              follow: !t
            });
            o = i.node;
          } else o = e;
          n.doChmod(null, o, r, t);
        },
        lchmod(e, r) {
          n.chmod(e, r, true);
        },
        fchmod(e, r) {
          var t = n.getStreamChecked(e);
          n.doChmod(t, t.node, r, false);
        },
        doChown(e, r, t) {
          n.doSetAttr(e, r, {
            timestamp: Date.now(),
            dontFollow: t
          });
        },
        chown(e, r, t, o) {
          var i;
          if (typeof e == "string") {
            var a = n.lookupPath(e, {
              follow: !o
            });
            i = a.node;
          } else i = e;
          n.doChown(null, i, o);
        },
        lchown(e, r, t) {
          n.chown(e, r, t, true);
        },
        fchown(e, r, t) {
          var o = n.getStreamChecked(e);
          n.doChown(o, o.node, false);
        },
        doTruncate(e, r, t) {
          if (n.isDir(r.mode)) throw new n.ErrnoError(31);
          if (!n.isFile(r.mode)) throw new n.ErrnoError(28);
          var o = n.nodePermissions(r, "w");
          if (o) throw new n.ErrnoError(o);
          n.doSetAttr(e, r, {
            size: t,
            timestamp: Date.now()
          });
        },
        truncate(e, r) {
          if (r < 0) throw new n.ErrnoError(28);
          var t;
          if (typeof e == "string") {
            var o = n.lookupPath(e, {
              follow: true
            });
            t = o.node;
          } else t = e;
          n.doTruncate(null, t, r);
        },
        ftruncate(e, r) {
          var t = n.getStreamChecked(e);
          if (r < 0 || !(t.flags & 2097155)) throw new n.ErrnoError(28);
          n.doTruncate(t, t.node, r);
        },
        utime(e, r, t) {
          var o = n.lookupPath(e, {
            follow: true
          }), i = o.node, a = n.checkOpExists(i.node_ops.setattr, 63);
          a(i, {
            atime: r,
            mtime: t
          });
        },
        open(e, r, t = 438) {
          if (e === "") throw new n.ErrnoError(44);
          r = typeof r == "string" ? Cr(r) : r, r & 64 ? t = t & 4095 | 32768 : t = 0;
          var o, i;
          if (typeof e == "object") o = e;
          else {
            i = e.endsWith("/");
            var a = n.lookupPath(e, {
              follow: !(r & 131072),
              noent_okay: true
            });
            o = a.node, e = a.path;
          }
          var s = false;
          if (r & 64) if (o) {
            if (r & 128) throw new n.ErrnoError(20);
          } else {
            if (i) throw new n.ErrnoError(31);
            o = n.mknod(e, t | 511, 0), s = true;
          }
          if (!o) throw new n.ErrnoError(44);
          if (n.isChrdev(o.mode) && (r &= -513), r & 65536 && !n.isDir(o.mode)) throw new n.ErrnoError(54);
          if (!s) {
            var l = n.mayOpen(o, r);
            if (l) throw new n.ErrnoError(l);
          }
          r & 512 && !s && n.truncate(o, 0), r &= -131713;
          var c = n.createStream({
            node: o,
            path: n.getPath(o),
            flags: r,
            seekable: true,
            position: 0,
            stream_ops: o.stream_ops,
            ungotten: [],
            error: false
          });
          return c.stream_ops.open && c.stream_ops.open(c), s && n.chmod(o, t & 511), d.logReadFiles && !(r & 1) && (e in n.readFiles || (n.readFiles[e] = 1)), c;
        },
        close(e) {
          if (n.isClosed(e)) throw new n.ErrnoError(8);
          e.getdents && (e.getdents = null);
          try {
            e.stream_ops.close && e.stream_ops.close(e);
          } catch (r) {
            throw r;
          } finally {
            n.closeStream(e.fd);
          }
          e.fd = null;
        },
        isClosed(e) {
          return e.fd === null;
        },
        llseek(e, r, t) {
          if (n.isClosed(e)) throw new n.ErrnoError(8);
          if (!e.seekable || !e.stream_ops.llseek) throw new n.ErrnoError(70);
          if (t != 0 && t != 1 && t != 2) throw new n.ErrnoError(28);
          return e.position = e.stream_ops.llseek(e, r, t), e.ungotten = [], e.position;
        },
        read(e, r, t, o, i) {
          if (f(t >= 0), o < 0 || i < 0) throw new n.ErrnoError(28);
          if (n.isClosed(e)) throw new n.ErrnoError(8);
          if ((e.flags & 2097155) === 1) throw new n.ErrnoError(8);
          if (n.isDir(e.node.mode)) throw new n.ErrnoError(31);
          if (!e.stream_ops.read) throw new n.ErrnoError(28);
          var a = typeof i < "u";
          if (!a) i = e.position;
          else if (!e.seekable) throw new n.ErrnoError(70);
          var s = e.stream_ops.read(e, r, t, o, i);
          return a || (e.position += s), s;
        },
        write(e, r, t, o, i, a) {
          if (f(t >= 0), o < 0 || i < 0) throw new n.ErrnoError(28);
          if (n.isClosed(e)) throw new n.ErrnoError(8);
          if (!(e.flags & 2097155)) throw new n.ErrnoError(8);
          if (n.isDir(e.node.mode)) throw new n.ErrnoError(31);
          if (!e.stream_ops.write) throw new n.ErrnoError(28);
          e.seekable && e.flags & 1024 && n.llseek(e, 0, 2);
          var s = typeof i < "u";
          if (!s) i = e.position;
          else if (!e.seekable) throw new n.ErrnoError(70);
          var l = e.stream_ops.write(e, r, t, o, i, a);
          return s || (e.position += l), l;
        },
        mmap(e, r, t, o, i) {
          if (o & 2 && !(i & 2) && (e.flags & 2097155) !== 2) throw new n.ErrnoError(2);
          if ((e.flags & 2097155) === 1) throw new n.ErrnoError(2);
          if (!e.stream_ops.mmap) throw new n.ErrnoError(43);
          if (!r) throw new n.ErrnoError(28);
          return e.stream_ops.mmap(e, r, t, o, i);
        },
        msync(e, r, t, o, i) {
          return f(t >= 0), e.stream_ops.msync ? e.stream_ops.msync(e, r, t, o, i) : 0;
        },
        ioctl(e, r, t) {
          if (!e.stream_ops.ioctl) throw new n.ErrnoError(59);
          return e.stream_ops.ioctl(e, r, t);
        },
        readFile(e, r = {}) {
          if (r.flags = r.flags || 0, r.encoding = r.encoding || "binary", r.encoding !== "utf8" && r.encoding !== "binary") throw new Error(`Invalid encoding type "${r.encoding}"`);
          var t, o = n.open(e, r.flags), i = n.stat(e), a = i.size, s = new Uint8Array(a);
          return n.read(o, s, 0, a, 0), r.encoding === "utf8" ? t = Ee(s) : r.encoding === "binary" && (t = s), n.close(o), t;
        },
        writeFile(e, r, t = {}) {
          t.flags = t.flags || 577;
          var o = n.open(e, t.flags, t.mode);
          if (typeof r == "string") {
            var i = new Uint8Array(Re(r) + 1), a = xe(r, i, 0, i.length);
            n.write(o, i, 0, a, void 0, t.canOwn);
          } else if (ArrayBuffer.isView(r)) n.write(o, r, 0, r.byteLength, void 0, t.canOwn);
          else throw new Error("Unsupported data type");
          n.close(o);
        },
        cwd: () => n.currentPath,
        chdir(e) {
          var r = n.lookupPath(e, {
            follow: true
          });
          if (r.node === null) throw new n.ErrnoError(44);
          if (!n.isDir(r.node.mode)) throw new n.ErrnoError(54);
          var t = n.nodePermissions(r.node, "x");
          if (t) throw new n.ErrnoError(t);
          n.currentPath = r.path;
        },
        createDefaultDirectories() {
          n.mkdir("/tmp"), n.mkdir("/home"), n.mkdir("/home/web_user");
        },
        createDefaultDevices() {
          n.mkdir("/dev"), n.registerDevice(n.makedev(1, 3), {
            read: () => 0,
            write: (o, i, a, s, l) => s,
            llseek: () => 0
          }), n.mkdev("/dev/null", n.makedev(1, 3)), me.register(n.makedev(5, 0), me.default_tty_ops), me.register(n.makedev(6, 0), me.default_tty1_ops), n.mkdev("/dev/tty", n.makedev(5, 0)), n.mkdev("/dev/tty1", n.makedev(6, 0));
          var e = new Uint8Array(1024), r = 0, t = () => (r === 0 && (Xe(e), r = e.byteLength), e[--r]);
          n.createDevice("/dev", "random", t), n.createDevice("/dev", "urandom", t), n.mkdir("/dev/shm"), n.mkdir("/dev/shm/tmp");
        },
        createSpecialDirectories() {
          n.mkdir("/proc");
          var e = n.mkdir("/proc/self");
          n.mkdir("/proc/self/fd"), n.mount({
            mount() {
              var r = n.createNode(e, "fd", 16895, 73);
              return r.stream_ops = {
                llseek: m.stream_ops.llseek
              }, r.node_ops = {
                lookup(t, o) {
                  var i = +o, a = n.getStreamChecked(i), s = {
                    parent: null,
                    mount: {
                      mountpoint: "fake"
                    },
                    node_ops: {
                      readlink: () => a.path
                    },
                    id: i + 1
                  };
                  return s.parent = s, s;
                },
                readdir() {
                  return Array.from(n.streams.entries()).filter(([t, o]) => o).map(([t, o]) => t.toString());
                }
              }, r;
            }
          }, {}, "/proc/self/fd");
        },
        createStandardStreams(e, r, t) {
          e ? n.createDevice("/dev", "stdin", e) : n.symlink("/dev/tty", "/dev/stdin"), r ? n.createDevice("/dev", "stdout", null, r) : n.symlink("/dev/tty", "/dev/stdout"), t ? n.createDevice("/dev", "stderr", null, t) : n.symlink("/dev/tty1", "/dev/stderr");
          var o = n.open("/dev/stdin", 0), i = n.open("/dev/stdout", 1), a = n.open("/dev/stderr", 1);
          f(o.fd === 0, `invalid handle for stdin (${o.fd})`), f(i.fd === 1, `invalid handle for stdout (${i.fd})`), f(a.fd === 2, `invalid handle for stderr (${a.fd})`);
        },
        staticInit() {
          n.nameTable = new Array(4096), n.mount(m, {}, "/"), n.createDefaultDirectories(), n.createDefaultDevices(), n.createSpecialDirectories(), n.filesystems = {
            MEMFS: m
          };
        },
        init(e, r, t) {
          f(!n.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)"), n.initialized = true, e ?? (e = d.stdin), r ?? (r = d.stdout), t ?? (t = d.stderr), n.createStandardStreams(e, r, t);
        },
        quit() {
          n.initialized = false, Kr(0);
          for (var e of n.streams) e && n.close(e);
        },
        findObject(e, r) {
          var t = n.analyzePath(e, r);
          return t.exists ? t.object : null;
        },
        analyzePath(e, r) {
          try {
            var t = n.lookupPath(e, {
              follow: !r
            });
            e = t.path;
          } catch {
          }
          var o = {
            isRoot: false,
            exists: false,
            error: 0,
            name: null,
            path: null,
            object: null,
            parentExists: false,
            parentPath: null,
            parentObject: null
          };
          try {
            var t = n.lookupPath(e, {
              parent: true
            });
            o.parentExists = true, o.parentPath = t.path, o.parentObject = t.node, o.name = w.basename(e), t = n.lookupPath(e, {
              follow: !r
            }), o.exists = true, o.path = t.path, o.object = t.node, o.name = t.node.name, o.isRoot = t.path === "/";
          } catch (i) {
            o.error = i.errno;
          }
          return o;
        },
        createPath(e, r, t, o) {
          e = typeof e == "string" ? e : n.getPath(e);
          for (var i = r.split("/").reverse(); i.length; ) {
            var a = i.pop();
            if (a) {
              var s = w.join2(e, a);
              try {
                n.mkdir(s);
              } catch (l) {
                if (l.errno != 20) throw l;
              }
              e = s;
            }
          }
          return s;
        },
        createFile(e, r, t, o, i) {
          var a = w.join2(typeof e == "string" ? e : n.getPath(e), r), s = je(o, i);
          return n.create(a, s);
        },
        createDataFile(e, r, t, o, i, a) {
          var s = r;
          e && (e = typeof e == "string" ? e : n.getPath(e), s = r ? w.join2(e, r) : e);
          var l = je(o, i), c = n.create(s, l);
          if (t) {
            if (typeof t == "string") {
              for (var v = new Array(t.length), y = 0, g = t.length; y < g; ++y) v[y] = t.charCodeAt(y);
              t = v;
            }
            n.chmod(c, l | 146);
            var E = n.open(c, 577);
            n.write(E, t, 0, t.length, 0, a), n.close(E), n.chmod(c, l);
          }
        },
        createDevice(e, r, t, o) {
          var _a;
          var i = w.join2(typeof e == "string" ? e : n.getPath(e), r), a = je(!!t, !!o);
          (_a = n.createDevice).major ?? (_a.major = 64);
          var s = n.makedev(n.createDevice.major++, 0);
          return n.registerDevice(s, {
            open(l) {
              l.seekable = false;
            },
            close(l) {
              var _a2;
              ((_a2 = o == null ? void 0 : o.buffer) == null ? void 0 : _a2.length) && o(10);
            },
            read(l, c, v, y, g) {
              for (var E = 0, u = 0; u < y; u++) {
                var h;
                try {
                  h = t();
                } catch {
                  throw new n.ErrnoError(29);
                }
                if (h === void 0 && E === 0) throw new n.ErrnoError(6);
                if (h == null) break;
                E++, c[v + u] = h;
              }
              return E && (l.node.atime = Date.now()), E;
            },
            write(l, c, v, y, g) {
              for (var E = 0; E < y; E++) try {
                o(c[v + E]);
              } catch {
                throw new n.ErrnoError(29);
              }
              return y && (l.node.mtime = l.node.ctime = Date.now()), E;
            }
          }), n.mkdev(i, a, s);
        },
        forceLoadFile(e) {
          if (e.isDevice || e.isFolder || e.link || e.contents) return true;
          if (typeof XMLHttpRequest < "u") throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
          try {
            e.contents = re(e.url), e.usedBytes = e.contents.length;
          } catch {
            throw new n.ErrnoError(29);
          }
        },
        createLazyFile(e, r, t, o, i) {
          class a {
            constructor() {
              __publicField(this, "lengthKnown", false);
              __publicField(this, "chunks", []);
            }
            get(u) {
              if (!(u > this.length - 1 || u < 0)) {
                var h = u % this.chunkSize, O = u / this.chunkSize | 0;
                return this.getter(O)[h];
              }
            }
            setDataGetter(u) {
              this.getter = u;
            }
            cacheLength() {
              var u = new XMLHttpRequest();
              if (u.open("HEAD", t, false), u.send(null), !(u.status >= 200 && u.status < 300 || u.status === 304)) throw new Error("Couldn't load " + t + ". Status: " + u.status);
              var h = Number(u.getResponseHeader("Content-length")), O, W = (O = u.getResponseHeader("Accept-Ranges")) && O === "bytes", I = (O = u.getResponseHeader("Content-Encoding")) && O === "gzip", x = 1024 * 1024;
              W || (x = h);
              var $ = (K, we) => {
                if (K > we) throw new Error("invalid range (" + K + ", " + we + ") or no bytes requested!");
                if (we > h - 1) throw new Error("only " + h + " bytes available! programmer error!");
                var R = new XMLHttpRequest();
                if (R.open("GET", t, false), h !== x && R.setRequestHeader("Range", "bytes=" + K + "-" + we), R.responseType = "arraybuffer", R.overrideMimeType && R.overrideMimeType("text/plain; charset=x-user-defined"), R.send(null), !(R.status >= 200 && R.status < 300 || R.status === 304)) throw new Error("Couldn't load " + t + ". Status: " + R.status);
                return R.response !== void 0 ? new Uint8Array(R.response || []) : qe(R.responseText || "");
              }, Ce = this;
              Ce.setDataGetter((K) => {
                var we = K * x, R = (K + 1) * x - 1;
                if (R = Math.min(R, h - 1), typeof Ce.chunks[K] > "u" && (Ce.chunks[K] = $(we, R)), typeof Ce.chunks[K] > "u") throw new Error("doXHR failed!");
                return Ce.chunks[K];
              }), (I || !h) && (x = h = 1, h = this.getter(0).length, x = h, te("LazyFiles on gzip forces download of the whole file when length is accessed")), this._length = h, this._chunkSize = x, this.lengthKnown = true;
            }
            get length() {
              return this.lengthKnown || this.cacheLength(), this._length;
            }
            get chunkSize() {
              return this.lengthKnown || this.cacheLength(), this._chunkSize;
            }
          }
          if (typeof XMLHttpRequest < "u") {
            if (!Y) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
            var s = new a(), l = {
              isDevice: false,
              contents: s
            };
          } else var l = {
            isDevice: false,
            url: t
          };
          var c = n.createFile(e, r, l, o, i);
          l.contents ? c.contents = l.contents : l.url && (c.contents = null, c.url = l.url), Object.defineProperties(c, {
            usedBytes: {
              get: function() {
                return this.contents.length;
              }
            }
          });
          var v = {}, y = Object.keys(c.stream_ops);
          y.forEach((E) => {
            var u = c.stream_ops[E];
            v[E] = (...h) => (n.forceLoadFile(c), u(...h));
          });
          function g(E, u, h, O, W) {
            var I = E.node.contents;
            if (W >= I.length) return 0;
            var x = Math.min(I.length - W, O);
            if (f(x >= 0), I.slice) for (var $ = 0; $ < x; $++) u[h + $] = I[W + $];
            else for (var $ = 0; $ < x; $++) u[h + $] = I.get(W + $);
            return x;
          }
          return v.read = (E, u, h, O, W) => (n.forceLoadFile(c), g(E, u, h, O, W)), v.mmap = (E, u, h, O, W) => {
            n.forceLoadFile(c);
            var I = Je();
            if (!I) throw new n.ErrnoError(48);
            return g(E, C, I, u, h), {
              ptr: I,
              allocated: true
            };
          }, c.stream_ops = v, c;
        },
        absolutePath() {
          N("FS.absolutePath has been removed; use PATH_FS.resolve instead");
        },
        createFolder() {
          N("FS.createFolder has been removed; use FS.mkdir instead");
        },
        createLink() {
          N("FS.createLink has been removed; use FS.symlink instead");
        },
        joinPath() {
          N("FS.joinPath has been removed; use PATH.join instead");
        },
        mmapAlloc() {
          N("FS.mmapAlloc has been replaced by the top level function mmapAlloc");
        },
        standardizePath() {
          N("FS.standardizePath has been removed; use PATH.normalize instead");
        }
      }, Me = {
        DEFAULT_POLLMASK: 5,
        calculateAt(e, r, t) {
          if (w.isAbs(r)) return r;
          var o;
          if (e === -100) o = n.cwd();
          else {
            var i = Me.getStreamFromFD(e);
            o = i.path;
          }
          if (r.length == 0) {
            if (!t) throw new n.ErrnoError(44);
            return o;
          }
          return o + "/" + r;
        },
        writeStat(e, r) {
          T[e >> 2] = r.dev, T[e + 4 >> 2] = r.mode, p[e + 8 >> 2] = r.nlink, T[e + 12 >> 2] = r.uid, T[e + 16 >> 2] = r.gid, T[e + 20 >> 2] = r.rdev, G[e + 24 >> 3] = BigInt(r.size), T[e + 32 >> 2] = 4096, T[e + 36 >> 2] = r.blocks;
          var t = r.atime.getTime(), o = r.mtime.getTime(), i = r.ctime.getTime();
          return G[e + 40 >> 3] = BigInt(Math.floor(t / 1e3)), p[e + 48 >> 2] = t % 1e3 * 1e3 * 1e3, G[e + 56 >> 3] = BigInt(Math.floor(o / 1e3)), p[e + 64 >> 2] = o % 1e3 * 1e3 * 1e3, G[e + 72 >> 3] = BigInt(Math.floor(i / 1e3)), p[e + 80 >> 2] = i % 1e3 * 1e3 * 1e3, G[e + 88 >> 3] = BigInt(r.ino), 0;
        },
        writeStatFs(e, r) {
          T[e + 4 >> 2] = r.bsize, T[e + 40 >> 2] = r.bsize, T[e + 8 >> 2] = r.blocks, T[e + 12 >> 2] = r.bfree, T[e + 16 >> 2] = r.bavail, T[e + 20 >> 2] = r.files, T[e + 24 >> 2] = r.ffree, T[e + 28 >> 2] = r.fsid, T[e + 44 >> 2] = r.flags, T[e + 36 >> 2] = r.namelen;
        },
        doMsync(e, r, t, o, i) {
          if (!n.isFile(r.node.mode)) throw new n.ErrnoError(43);
          if (o & 2) return 0;
          var a = Q.slice(e, e + t);
          n.msync(r, a, i, t, o);
        },
        getStreamFromFD(e) {
          var r = n.getStreamChecked(e);
          return r;
        },
        varargs: void 0,
        getStr(e) {
          var r = Ne(e);
          return r;
        }
      };
      function Ir(e) {
        try {
          var r = Me.getStreamFromFD(e);
          return n.close(r), 0;
        } catch (t) {
          if (typeof n > "u" || t.name !== "ErrnoError") throw t;
          return t.errno;
        }
      }
      var Ur = (e, r, t, o) => {
        for (var i = 0, a = 0; a < t; a++) {
          var s = p[r >> 2], l = p[r + 4 >> 2];
          r += 8;
          var c = n.read(e, C, s, l, o);
          if (c < 0) return -1;
          if (i += c, c < l) break;
        }
        return i;
      };
      function Br(e, r, t, o) {
        try {
          var i = Me.getStreamFromFD(e), a = Ur(i, r, t);
          return p[o >> 2] = a, 0;
        } catch (s) {
          if (typeof n > "u" || s.name !== "ErrnoError") throw s;
          return s.errno;
        }
      }
      var xr = 9007199254740992, zr = -9007199254740992, Hr = (e) => e < zr || e > xr ? NaN : Number(e);
      function jr(e, r, t, o) {
        r = Hr(r);
        try {
          if (isNaN(r)) return 61;
          var i = Me.getStreamFromFD(e);
          return n.llseek(i, r, t), G[o >> 3] = BigInt(i.position), i.getdents && r === 0 && t === 0 && (i.getdents = null), 0;
        } catch (a) {
          if (typeof n > "u" || a.name !== "ErrnoError") throw a;
          return a.errno;
        }
      }
      var Gr = (e, r, t, o) => {
        for (var i = 0, a = 0; a < t; a++) {
          var s = p[r >> 2], l = p[r + 4 >> 2];
          r += 8;
          var c = n.write(e, C, s, l, o);
          if (c < 0) return -1;
          if (i += c, c < l) break;
        }
        return i;
      };
      function Wr(e, r, t, o) {
        try {
          var i = Me.getStreamFromFD(e), a = Gr(i, r, t);
          return p[o >> 2] = a, 0;
        } catch (s) {
          if (typeof n > "u" || s.name !== "ErrnoError") throw s;
          return s.errno;
        }
      }
      n.createPreloadedFile = Mr, n.staticInit(), d.noExitRuntime && d.noExitRuntime, d.preloadPlugins && (Ze = d.preloadPlugins), d.print && (te = d.print), d.printErr && (b = d.printErr), d.wasmBinary && (J = d.wasmBinary), Vr(), d.arguments && d.arguments, d.thisProgram && (se = d.thisProgram), f(typeof d.memoryInitializerPrefixURL > "u", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"), f(typeof d.pthreadMainPrefixURL > "u", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"), f(typeof d.cdInitializerPrefixURL > "u", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"), f(typeof d.filePackagePrefixURL > "u", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead"), f(typeof d.read > "u", "Module.read option was removed"), f(typeof d.readAsync > "u", "Module.readAsync option was removed (modify readAsync in JS)"), f(typeof d.readBinary > "u", "Module.readBinary option was removed (modify readBinary in JS)"), f(typeof d.setWindowTitle > "u", "Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)"), f(typeof d.TOTAL_MEMORY > "u", "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY"), f(typeof d.ENVIRONMENT > "u", "Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)"), f(typeof d.STACK_SIZE > "u", "STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time"), f(typeof d.wasmMemory > "u", "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally"), f(typeof d.INITIAL_MEMORY > "u", "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
      var $r = [
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
        "zeroMemory",
        "exitJS",
        "inetPton4",
        "inetNtop4",
        "inetPton6",
        "inetNtop6",
        "readSockaddr",
        "writeSockaddr",
        "emscriptenLog",
        "readEmAsmArgs",
        "jstoi_q",
        "listenOnce",
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
        "getNativeTypeSize",
        "addOnInit",
        "addOnPostCtor",
        "addOnPreMain",
        "addOnExit",
        "STACK_SIZE",
        "STACK_ALIGN",
        "POINTER_SIZE",
        "ASSERTIONS",
        "getCFunc",
        "ccall",
        "cwrap",
        "uleb128Encode",
        "sigToWasmTypes",
        "generateFuncType",
        "convertJsFunctionToWasm",
        "getEmptyTableSlot",
        "updateTableMap",
        "getFunctionAddress",
        "addFunction",
        "removeFunction",
        "reallyNegative",
        "unSign",
        "strLen",
        "reSign",
        "formatString",
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
        "battery",
        "registerBatteryEventCallback",
        "setCanvasElementSize",
        "getCanvasElementSize",
        "jsStackTrace",
        "getCallstack",
        "convertPCtoSourceLocation",
        "checkWasiClock",
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
        "FS_unlink",
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
        "demangle",
        "stackTrace"
      ];
      $r.forEach(ae);
      var Yr = [
        "run",
        "addRunDependency",
        "removeRunDependency",
        "out",
        "err",
        "callMain",
        "abort",
        "wasmMemory",
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
        "jstoi_s",
        "getExecutableName",
        "asyncLoad",
        "alignMemory",
        "mmapAlloc",
        "wasmTable",
        "noExitRuntime",
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
        "getPreloadedImageData__data",
        "wget",
        "MONTH_DAYS_REGULAR",
        "MONTH_DAYS_LEAP",
        "MONTH_DAYS_REGULAR_CUMULATIVE",
        "MONTH_DAYS_LEAP_CUMULATIVE",
        "SYSCALLS",
        "preloadPlugins",
        "FS_createPreloadedFile",
        "FS_modeStringToFlags",
        "FS_getMode",
        "FS_stdin_getChar_buffer",
        "FS_stdin_getChar",
        "FS_createPath",
        "FS_createDevice",
        "FS_readFile",
        "FS",
        "FS_createDataFile",
        "FS_createLazyFile",
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
        "allocateUTF8",
        "allocateUTF8OnStack",
        "print",
        "printErr"
      ];
      Yr.forEach(Ie);
      function Vr() {
        Le("fetchSettings");
      }
      var er = {
        __assert_fail: Er,
        __cxa_throw: wr,
        _abort_js: yr,
        _tzset_js: gr,
        emscripten_resize_heap: Sr,
        environ_get: Ar,
        environ_sizes_get: Pr,
        fd_close: Ir,
        fd_read: Br,
        fd_seek: jr,
        fd_write: Wr
      }, B = await mr();
      d._deform = Ae("deform", 43), d._malloc = Ae("malloc", 1), d._free = Ae("free", 1);
      var Kr = Ae("fflush", 1), Xr = Ae("strerror", 1), rr = B.emscripten_stack_get_end;
      B.emscripten_stack_get_base;
      var qr = B.emscripten_stack_init;
      B.emscripten_stack_get_free, B._emscripten_stack_restore, B._emscripten_stack_alloc, B.emscripten_stack_get_current;
      var tr;
      function Jr() {
        qr(), _e();
      }
      function Ge() {
        if (ce > 0) {
          Te = Ge;
          return;
        }
        if (Jr(), Ue(), ce > 0) {
          Te = Ge;
          return;
        }
        function e() {
          var _a;
          f(!tr), tr = true, d.calledRun = true, !ne && (or(), _(d), (_a = d.onRuntimeInitialized) == null ? void 0 : _a.call(d), de("onRuntimeInitialized"), f(!d._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]'), ir());
        }
        d.setStatus ? (d.setStatus("Running..."), setTimeout(() => {
          setTimeout(() => d.setStatus(""), 1), e();
        }, 1)) : e(), ve();
      }
      function Zr() {
        if (d.preInit) for (typeof d.preInit == "function" && (d.preInit = [
          d.preInit
        ]); d.preInit.length > 0; ) d.preInit.shift()();
        de("preInit");
      }
      Zr(), Ge(), F = U;
      for (const e of Object.keys(d)) e in L || Object.defineProperty(L, e, {
        configurable: true,
        get() {
          N(`Access to module property ('${e}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`);
        }
      });
      return F;
    };
  })();
  const A = await tt();
  nt = function(z, L, F, d) {
    if (z.length === 0) return;
    const _ = [], X = ee(z.flat(), Float64Array, A.HEAPF64);
    _.push(X);
    const U = L.flat(), D = ee(U, Uint32Array, A.HEAPU32);
    _.push(D);
    const Y = L.map((k) => k.length), P = ee(Y, Uint32Array, A.HEAPU32);
    _.push(P);
    const H = F.supports ? Array.from(F.supports.keys()) : [], q = F.supports ? Array.from(F.supports.values()).flat().map((k) => k ? 1 : 0) : [], se = ee(H, Uint32Array, A.HEAPU32);
    _.push(se);
    const S = ee(q, Uint8Array, A.HEAPU8);
    _.push(S);
    const V = F.loads ? Array.from(F.loads.keys()) : [], j = F.loads ? Array.from(F.loads.values()).flat() : [], re = ee(V, Uint32Array, A.HEAPU32);
    _.push(re);
    const ye = ee(j, Float64Array, A.HEAPF64);
    _.push(ye);
    const M = (k) => {
      const ae = k ? Array.from(k.keys()) : [], Ie = k ? Array.from(k.values()) : [], Se = ee(ae, Uint32Array, A.HEAPU32);
      _.push(Se);
      const Ue = ee(Ie, Float64Array, A.HEAPF64);
      return _.push(Ue), {
        keysPtr: Se,
        valuesPtr: Ue,
        size: ae.length
      };
    }, le = M(d.elasticities), ge = M(d.elasticitiesOrthogonal), te = M(d.areas), b = M(d.momentsOfInertiaZ), J = M(d.momentsOfInertiaY), Z = M(d.shearModuli), ne = M(d.torsionalConstants), f = M(d.thicknesses), C = M(d.poissonsRatios), Q = A._malloc(4);
    _.push(Q);
    const T = A._malloc(4);
    _.push(T);
    const p = A._malloc(4);
    _.push(p);
    const G = A._malloc(4);
    _.push(G), A._deform(X, z.length, D, U.length, P, L.length, se, S, H.length, re, ye, V.length, le.keysPtr, le.valuesPtr, le.size, te.keysPtr, te.valuesPtr, te.size, b.keysPtr, b.valuesPtr, b.size, J.keysPtr, J.valuesPtr, J.size, Z.keysPtr, Z.valuesPtr, Z.size, ne.keysPtr, ne.valuesPtr, ne.size, f.keysPtr, f.valuesPtr, f.size, C.keysPtr, C.valuesPtr, C.size, ge.keysPtr, ge.valuesPtr, ge.size, Q, T, p, G);
    const oe = A.HEAPU32[Q / 4], ie = A.HEAPU32[T / 4], _e = A.HEAPU32[p / 4], ve = A.HEAPU32[G / 4], de = new Float64Array(A.HEAPF64.buffer, oe, ie), Le = new Float64Array(A.HEAPF64.buffer, _e, ve), ke = /* @__PURE__ */ new Map();
    for (let k = 0; k < ie; k += 7) {
      const ae = de[k];
      ke.set(ae, Array.from(de.slice(k + 1, k + 7)));
    }
    const be = /* @__PURE__ */ new Map();
    for (let k = 0; k < ve; k += 7) {
      const ae = Le[k];
      be.set(ae, Array.from(Le.slice(k + 1, k + 7)));
    }
    return oe && _.push(oe), _e && _.push(_e), _.forEach((k) => A._free(k)), {
      deformations: ke,
      reactions: be
    };
  };
  function ee(z, L, F) {
    const d = new L(z), _ = A._malloc(d.length * d.BYTES_PER_ELEMENT);
    return F.set(d, _ / d.BYTES_PER_ELEMENT), _;
  }
})();
export {
  __tla,
  nt as d
};
