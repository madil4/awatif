var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
let Sr;
let __tla = (async () => {
  const kr = "modulepreload", _r = function(H, j) {
    return new URL(H, j).href;
  }, We = {}, Pr = function(j, S, f) {
    let y = Promise.resolve();
    if (S && S.length > 0) {
      const U = document.getElementsByTagName("link"), R = document.querySelector("meta[property=csp-nonce]"), G = (R == null ? void 0 : R.nonce) || (R == null ? void 0 : R.getAttribute("nonce"));
      y = Promise.allSettled(S.map((b) => {
        if (b = _r(b, f), b in We) return;
        We[b] = true;
        const z = b.endsWith(".css"), ne = z ? '[rel="stylesheet"]' : "";
        if (!!f) for (let C = U.length - 1; C >= 0; C--) {
          const O = U[C];
          if (O.href === b && (!z || O.rel === "stylesheet")) return;
        }
        else if (document.querySelector(`link[href="${b}"]${ne}`)) return;
        const M = document.createElement("link");
        if (M.rel = z ? "stylesheet" : kr, z || (M.as = "script"), M.crossOrigin = "", M.href = b, G && M.setAttribute("nonce", G), document.head.appendChild(M), z) return new Promise((C, O) => {
          M.addEventListener("load", C), M.addEventListener("error", () => O(new Error(`Unable to preload CSS for ${b}`)));
        });
      }));
    }
    function V(U) {
      const R = new Event("vite:preloadError", {
        cancelable: true
      });
      if (R.payload = U, window.dispatchEvent(R), !R.defaultPrevented) throw U;
    }
    return y.then((U) => {
      for (const R of U || []) R.status === "rejected" && V(R.reason);
      return j().catch(V);
    });
  };
  var br = (() => {
    var H = import.meta.url;
    return async function(j = {}) {
      var S, f = j, y, V, U = new Promise((e, r) => {
        y = e, V = r;
      }), R = typeof window == "object", G = typeof WorkerGlobalScope < "u", b = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && process.type != "renderer";
      if (b) {
        const { createRequire: e } = await Pr(() => import("./__vite-browser-external-D7Ct-6yo.js").then((r) => r._), [], import.meta.url);
        var z = e(import.meta.url);
      }
      var ne = "./this.program", F = "";
      function M(e) {
        return f.locateFile ? f.locateFile(e, F) : F + e;
      }
      var C, O;
      if (b) {
        var ie = z("fs"), _e = z("path");
        import.meta.url.startsWith("data:") || (F = _e.dirname(z("url").fileURLToPath(import.meta.url)) + "/"), O = (e) => {
          e = Q(e) ? new URL(e) : e;
          var r = ie.readFileSync(e);
          return r;
        }, C = async (e, r = true) => {
          e = Q(e) ? new URL(e) : e;
          var t = ie.readFileSync(e, r ? void 0 : "utf8");
          return t;
        }, process.argv.length > 1 && (ne = process.argv[1].replace(/\\/g, "/")), process.argv.slice(2);
      } else (R || G) && (G ? F = self.location.href : typeof document < "u" && document.currentScript && (F = document.currentScript.src), H && (F = H), F.startsWith("blob:") ? F = "" : F = F.slice(0, F.replace(/[?#].*/, "").lastIndexOf("/") + 1), G && (O = (e) => {
        var r = new XMLHttpRequest();
        return r.open("GET", e, false), r.responseType = "arraybuffer", r.send(null), new Uint8Array(r.response);
      }), C = async (e) => {
        if (Q(e)) return new Promise((t, o) => {
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
      });
      var N = console.log.bind(console), L = console.error.bind(console), K, se, ae = false, T, Y, _, E, x, Q = (e) => e.startsWith("file://");
      function me() {
        var e = se.buffer;
        T = new Int8Array(e), f.HEAPU8 = Y = new Uint8Array(e), _ = new Int32Array(e), f.HEAPU32 = E = new Uint32Array(e), f.HEAPF64 = new Float64Array(e), x = new BigInt64Array(e), new BigUint64Array(e);
      }
      function ve() {
        if (f.preRun) for (typeof f.preRun == "function" && (f.preRun = [
          f.preRun
        ]); f.preRun.length; ) Xe(f.preRun.shift());
        Ce(Ue);
      }
      function he() {
        !f.noFSInit && !n.initialized && n.init(), te.m(), n.ignorePermissions = false;
      }
      function we() {
        if (f.postRun) for (typeof f.postRun == "function" && (f.postRun = [
          f.postRun
        ]); f.postRun.length; ) qe(f.postRun.shift());
        Ce(Be);
      }
      var q = 0, Z = null;
      function pe(e) {
        var _a;
        q++, (_a = f.monitorRunDependencies) == null ? void 0 : _a.call(f, q);
      }
      function le(e) {
        var _a;
        if (q--, (_a = f.monitorRunDependencies) == null ? void 0 : _a.call(f, q), q == 0 && Z) {
          var r = Z;
          Z = null, r();
        }
      }
      function ee(e) {
        var _a;
        (_a = f.onAbort) == null ? void 0 : _a.call(f, e), e = "Aborted(" + e + ")", L(e), ae = true, e += ". Build with -sASSERTIONS for more info.";
        var r = new WebAssembly.RuntimeError(e);
        throw V(r), r;
      }
      var fe;
      function Pe() {
        return f.locateFile ? M("deform.wasm") : new URL("" + new URL("deform-CtTsy8qx.wasm", import.meta.url).href, import.meta.url).href;
      }
      function g(e) {
        if (e == fe && K) return new Uint8Array(K);
        if (O) return O(e);
        throw "both async and sync fetching of the wasm failed";
      }
      async function re(e) {
        if (!K) try {
          var r = await C(e);
          return new Uint8Array(r);
        } catch {
        }
        return g(e);
      }
      async function Fe(e, r) {
        try {
          var t = await re(e), o = await WebAssembly.instantiate(t, r);
          return o;
        } catch (i) {
          L(`failed to asynchronously prepare wasm: ${i}`), ee(i);
        }
      }
      async function be(e, r, t) {
        if (!e && typeof WebAssembly.instantiateStreaming == "function" && !Q(r) && !b) try {
          var o = fetch(r, {
            credentials: "same-origin"
          }), i = await WebAssembly.instantiateStreaming(o, t);
          return i;
        } catch (s) {
          L(`wasm streaming compile failed: ${s}`), L("falling back to ArrayBuffer instantiation");
        }
        return Fe(r, t);
      }
      function Se() {
        return {
          a: Er
        };
      }
      async function $e() {
        function e(s, a) {
          return te = s.exports, se = te.l, me(), le(), te;
        }
        pe();
        function r(s) {
          return e(s.instance);
        }
        var t = Se();
        if (f.instantiateWasm) return new Promise((s, a) => {
          f.instantiateWasm(t, (l, d) => {
            s(e(l));
          });
        });
        fe ?? (fe = Pe());
        try {
          var o = await be(K, fe, t), i = r(o);
          return i;
        } catch (s) {
          return V(s), Promise.reject(s);
        }
      }
      var Ce = (e) => {
        for (; e.length > 0; ) e.shift()(f);
      }, Be = [], qe = (e) => Be.push(e), Ue = [], Xe = (e) => Ue.push(e), Oe = typeof TextDecoder < "u" ? new TextDecoder() : void 0, de = (e, r = 0, t = NaN) => {
        for (var o = r + t, i = r; e[i] && !(i >= o); ) ++i;
        if (i - r > 16 && e.buffer && Oe) return Oe.decode(e.subarray(r, i));
        for (var s = ""; r < i; ) {
          var a = e[r++];
          if (!(a & 128)) {
            s += String.fromCharCode(a);
            continue;
          }
          var l = e[r++] & 63;
          if ((a & 224) == 192) {
            s += String.fromCharCode((a & 31) << 6 | l);
            continue;
          }
          var d = e[r++] & 63;
          if ((a & 240) == 224 ? a = (a & 15) << 12 | l << 6 | d : a = (a & 7) << 18 | l << 12 | d << 6 | e[r++] & 63, a < 65536) s += String.fromCharCode(a);
          else {
            var m = a - 65536;
            s += String.fromCharCode(55296 | m >> 10, 56320 | m & 1023);
          }
        }
        return s;
      }, Ae = (e, r) => e ? de(Y, e, r) : "", Ve = (e, r, t, o) => ee(`Assertion failed: ${Ae(e)}, at: ` + [
        r ? Ae(r) : "unknown filename",
        t,
        o ? Ae(o) : "unknown function"
      ]);
      class Ge {
        constructor(r) {
          this.excPtr = r, this.ptr = r - 24;
        }
        set_type(r) {
          E[this.ptr + 4 >> 2] = r;
        }
        get_type() {
          return E[this.ptr + 4 >> 2];
        }
        set_destructor(r) {
          E[this.ptr + 8 >> 2] = r;
        }
        get_destructor() {
          return E[this.ptr + 8 >> 2];
        }
        set_caught(r) {
          r = r ? 1 : 0, T[this.ptr + 12] = r;
        }
        get_caught() {
          return T[this.ptr + 12] != 0;
        }
        set_rethrown(r) {
          r = r ? 1 : 0, T[this.ptr + 13] = r;
        }
        get_rethrown() {
          return T[this.ptr + 13] != 0;
        }
        init(r, t) {
          this.set_adjusted_ptr(0), this.set_type(r), this.set_destructor(t);
        }
        set_adjusted_ptr(r) {
          E[this.ptr + 16 >> 2] = r;
        }
        get_adjusted_ptr() {
          return E[this.ptr + 16 >> 2];
        }
      }
      var Le = 0, Ke = (e, r, t) => {
        var o = new Ge(e);
        throw o.init(r, t), Le = e, Le;
      }, Ye = () => ee(""), De = (e, r, t, o) => {
        if (!(o > 0)) return 0;
        for (var i = t, s = t + o - 1, a = 0; a < e.length; ++a) {
          var l = e.charCodeAt(a);
          if (l >= 55296 && l <= 57343) {
            var d = e.charCodeAt(++a);
            l = 65536 + ((l & 1023) << 10) | d & 1023;
          }
          if (l <= 127) {
            if (t >= s) break;
            r[t++] = l;
          } else if (l <= 2047) {
            if (t + 1 >= s) break;
            r[t++] = 192 | l >> 6, r[t++] = 128 | l & 63;
          } else if (l <= 65535) {
            if (t + 2 >= s) break;
            r[t++] = 224 | l >> 12, r[t++] = 128 | l >> 6 & 63, r[t++] = 128 | l & 63;
          } else {
            if (t + 3 >= s) break;
            r[t++] = 240 | l >> 18, r[t++] = 128 | l >> 12 & 63, r[t++] = 128 | l >> 6 & 63, r[t++] = 128 | l & 63;
          }
        }
        return r[t] = 0, t - i;
      }, ye = (e, r, t) => De(e, Y, r, t), Ze = (e, r, t, o) => {
        var i = (/* @__PURE__ */ new Date()).getFullYear(), s = new Date(i, 0, 1), a = new Date(i, 6, 1), l = s.getTimezoneOffset(), d = a.getTimezoneOffset(), m = Math.max(l, d);
        E[e >> 2] = m * 60, _[r >> 2] = +(l != d);
        var p = (u) => {
          var v = u >= 0 ? "-" : "+", D = Math.abs(u), I = String(Math.floor(D / 60)).padStart(2, "0"), B = String(D % 60).padStart(2, "0");
          return `UTC${v}${I}${B}`;
        }, k = p(l), h = p(d);
        d < l ? (ye(k, t, 17), ye(h, o, 17)) : (ye(k, o, 17), ye(h, t, 17));
      }, Je = (e) => {
        ee("OOM");
      }, Qe = (e) => {
        Y.length, Je();
      }, Re = {}, er = () => ne || "./this.program", Ee = () => {
        if (!Ee.strings) {
          var e = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", r = {
            USER: "web_user",
            LOGNAME: "web_user",
            PATH: "/",
            PWD: "/",
            HOME: "/home/web_user",
            LANG: e,
            _: er()
          };
          for (var t in Re) Re[t] === void 0 ? delete r[t] : r[t] = Re[t];
          var o = [];
          for (var t in r) o.push(`${t}=${r[t]}`);
          Ee.strings = o;
        }
        return Ee.strings;
      }, rr = (e, r) => {
        var t = 0, o = 0;
        for (var i of Ee()) {
          var s = r + t;
          E[e + o >> 2] = s, t += ye(i, s, 1 / 0) + 1, o += 4;
        }
        return 0;
      }, Ne = (e) => {
        for (var r = 0, t = 0; t < e.length; ++t) {
          var o = e.charCodeAt(t);
          o <= 127 ? r++ : o <= 2047 ? r += 2 : o >= 55296 && o <= 57343 ? (r += 4, ++t) : r += 3;
        }
        return r;
      }, tr = (e, r) => {
        var t = Ee();
        E[e >> 2] = t.length;
        var o = 0;
        for (var i of t) o += Ne(i) + 1;
        return E[r >> 2] = o, 0;
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
      }, nr = () => {
        if (b) {
          var e = z("crypto");
          return (r) => e.randomFillSync(r);
        }
        return (r) => crypto.getRandomValues(r);
      }, He = (e) => {
        (He = nr())(e);
      }, ue = {
        resolve: (...e) => {
          for (var r = "", t = false, o = e.length - 1; o >= -1 && !t; o--) {
            var i = o >= 0 ? e[o] : n.cwd();
            if (typeof i != "string") throw new TypeError("Arguments to path.resolve must be strings");
            if (!i) return "";
            r = i + "/" + r, t = w.isAbs(i);
          }
          return r = w.normalizeArray(r.split("/").filter((s) => !!s), !t).join("/"), (t ? "/" : "") + r || ".";
        },
        relative: (e, r) => {
          e = ue.resolve(e).slice(1), r = ue.resolve(r).slice(1);
          function t(m) {
            for (var p = 0; p < m.length && m[p] === ""; p++) ;
            for (var k = m.length - 1; k >= 0 && m[k] === ""; k--) ;
            return p > k ? [] : m.slice(p, k - p + 1);
          }
          for (var o = t(e.split("/")), i = t(r.split("/")), s = Math.min(o.length, i.length), a = s, l = 0; l < s; l++) if (o[l] !== i[l]) {
            a = l;
            break;
          }
          for (var d = [], l = a; l < o.length; l++) d.push("..");
          return d = d.concat(i.slice(a)), d.join("/");
        }
      }, Te = [], je = (e, r, t) => {
        var o = Ne(e) + 1, i = new Array(o), s = De(e, i, 0, i.length);
        return i.length = s, i;
      }, or = () => {
        if (!Te.length) {
          var e = null;
          if (b) {
            var r = 256, t = Buffer.alloc(r), o = 0, i = process.stdin.fd;
            try {
              o = ie.readSync(i, t, 0, r);
            } catch (s) {
              if (s.toString().includes("EOF")) o = 0;
              else throw s;
            }
            o > 0 && (e = t.slice(0, o).toString("utf-8"));
          } else typeof window < "u" && typeof window.prompt == "function" && (e = window.prompt("Input: "), e !== null && (e += `
`));
          if (!e) return null;
          Te = je(e);
        }
        return Te.shift();
      }, oe = {
        ttys: [],
        init() {
        },
        shutdown() {
        },
        register(e, r) {
          oe.ttys[e] = {
            input: [],
            output: [],
            ops: r
          }, n.registerDevice(e, oe.stream_ops);
        },
        stream_ops: {
          open(e) {
            var r = oe.ttys[e.node.rdev];
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
            for (var s = 0, a = 0; a < o; a++) {
              var l;
              try {
                l = e.tty.ops.get_char(e.tty);
              } catch {
                throw new n.ErrnoError(29);
              }
              if (l === void 0 && s === 0) throw new n.ErrnoError(6);
              if (l == null) break;
              s++, r[t + a] = l;
            }
            return s && (e.node.atime = Date.now()), s;
          },
          write(e, r, t, o, i) {
            if (!e.tty || !e.tty.ops.put_char) throw new n.ErrnoError(60);
            try {
              for (var s = 0; s < o; s++) e.tty.ops.put_char(e.tty, r[t + s]);
            } catch {
              throw new n.ErrnoError(29);
            }
            return o && (e.node.mtime = e.node.ctime = Date.now()), s;
          }
        },
        default_tty_ops: {
          get_char(e) {
            return or();
          },
          put_char(e, r) {
            r === null || r === 10 ? (N(de(e.output)), e.output = []) : r != 0 && e.output.push(r);
          },
          fsync(e) {
            var _a;
            ((_a = e.output) == null ? void 0 : _a.length) > 0 && (N(de(e.output)), e.output = []);
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
            r === null || r === 10 ? (L(de(e.output)), e.output = []) : r != 0 && e.output.push(r);
          },
          fsync(e) {
            var _a;
            ((_a = e.output) == null ? void 0 : _a.length) > 0 && (L(de(e.output)), e.output = []);
          }
        }
      }, xe = (e) => {
        ee();
      }, c = {
        ops_table: null,
        mount(e) {
          return c.createNode(null, "/", 16895, 0);
        },
        createNode(e, r, t, o) {
          if (n.isBlkdev(t) || n.isFIFO(t)) throw new n.ErrnoError(63);
          c.ops_table || (c.ops_table = {
            dir: {
              node: {
                getattr: c.node_ops.getattr,
                setattr: c.node_ops.setattr,
                lookup: c.node_ops.lookup,
                mknod: c.node_ops.mknod,
                rename: c.node_ops.rename,
                unlink: c.node_ops.unlink,
                rmdir: c.node_ops.rmdir,
                readdir: c.node_ops.readdir,
                symlink: c.node_ops.symlink
              },
              stream: {
                llseek: c.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: c.node_ops.getattr,
                setattr: c.node_ops.setattr
              },
              stream: {
                llseek: c.stream_ops.llseek,
                read: c.stream_ops.read,
                write: c.stream_ops.write,
                mmap: c.stream_ops.mmap,
                msync: c.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: c.node_ops.getattr,
                setattr: c.node_ops.setattr,
                readlink: c.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: c.node_ops.getattr,
                setattr: c.node_ops.setattr
              },
              stream: n.chrdev_stream_ops
            }
          });
          var i = n.createNode(e, r, t, o);
          return n.isDir(i.mode) ? (i.node_ops = c.ops_table.dir.node, i.stream_ops = c.ops_table.dir.stream, i.contents = {}) : n.isFile(i.mode) ? (i.node_ops = c.ops_table.file.node, i.stream_ops = c.ops_table.file.stream, i.usedBytes = 0, i.contents = null) : n.isLink(i.mode) ? (i.node_ops = c.ops_table.link.node, i.stream_ops = c.ops_table.link.stream) : n.isChrdev(i.mode) && (i.node_ops = c.ops_table.chrdev.node, i.stream_ops = c.ops_table.chrdev.stream), i.atime = i.mtime = i.ctime = Date.now(), e && (e.contents[r] = i, e.atime = e.mtime = e.ctime = i.atime), i;
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
            r.size !== void 0 && c.resizeFileStorage(e, r.size);
          },
          lookup(e, r) {
            throw c.doesNotExistError;
          },
          mknod(e, r, t, o) {
            return c.createNode(e, r, t, o);
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
            var o = c.createNode(e, r, 41471, 0);
            return o.link = t, o;
          },
          readlink(e) {
            if (!n.isLink(e.mode)) throw new n.ErrnoError(28);
            return e.link;
          }
        },
        stream_ops: {
          read(e, r, t, o, i) {
            var s = e.node.contents;
            if (i >= e.node.usedBytes) return 0;
            var a = Math.min(e.node.usedBytes - i, o);
            if (a > 8 && s.subarray) r.set(s.subarray(i, i + a), t);
            else for (var l = 0; l < a; l++) r[t + l] = s[i + l];
            return a;
          },
          write(e, r, t, o, i, s) {
            if (!o) return 0;
            var a = e.node;
            if (a.mtime = a.ctime = Date.now(), r.subarray && (!a.contents || a.contents.subarray)) {
              if (s) return a.contents = r.subarray(t, t + o), a.usedBytes = o, o;
              if (a.usedBytes === 0 && i === 0) return a.contents = r.slice(t, t + o), a.usedBytes = o, o;
              if (i + o <= a.usedBytes) return a.contents.set(r.subarray(t, t + o), i), o;
            }
            if (c.expandFileStorage(a, i + o), a.contents.subarray && r.subarray) a.contents.set(r.subarray(t, t + o), i);
            else for (var l = 0; l < o; l++) a.contents[i + l] = r[t + l];
            return a.usedBytes = Math.max(a.usedBytes, i + o), o;
          },
          llseek(e, r, t) {
            var o = r;
            if (t === 1 ? o += e.position : t === 2 && n.isFile(e.node.mode) && (o += e.node.usedBytes), o < 0) throw new n.ErrnoError(28);
            return o;
          },
          mmap(e, r, t, o, i) {
            if (!n.isFile(e.node.mode)) throw new n.ErrnoError(43);
            var s, a, l = e.node.contents;
            if (!(i & 2) && l && l.buffer === T.buffer) a = false, s = l.byteOffset;
            else {
              if (a = true, s = xe(), !s) throw new n.ErrnoError(48);
              l && ((t > 0 || t + r < l.length) && (l.subarray ? l = l.subarray(t, t + r) : l = Array.prototype.slice.call(l, t, t + r)), T.set(l, s));
            }
            return {
              ptr: s,
              allocated: a
            };
          },
          msync(e, r, t, o, i) {
            return c.stream_ops.write(e, r, 0, o, t, false), 0;
          }
        }
      }, ir = async (e) => {
        var r = await C(e);
        return new Uint8Array(r);
      }, sr = (e, r, t, o, i, s) => {
        n.createDataFile(e, r, t, o, i, s);
      }, Ie = [], ar = (e, r, t, o) => {
        typeof Browser < "u" && Browser.init();
        var i = false;
        return Ie.forEach((s) => {
          i || s.canHandle(r) && (s.handle(e, r, t, o), i = true);
        }), i;
      }, lr = (e, r, t, o, i, s, a, l, d, m) => {
        var p = r ? ue.resolve(w.join2(e, r)) : e;
        function k(h) {
          function u(v) {
            m == null ? void 0 : m(), l || sr(e, r, v, o, i, d), s == null ? void 0 : s(), le();
          }
          ar(h, p, u, () => {
            a == null ? void 0 : a(), le();
          }) || u(h);
        }
        pe(), typeof t == "string" ? ir(t).then(k, a) : k(t);
      }, fr = (e) => {
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
      }, ze = (e, r) => {
        var t = 0;
        return e && (t |= 365), r && (t |= 146), t;
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
        ErrnoError: class {
          constructor(e) {
            __publicField(this, "name", "ErrnoError");
            this.errno = e;
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
            for (var o = e.split("/").filter((m) => !!m), i = n.root, s = "/", a = 0; a < o.length; a++) {
              var l = a === o.length - 1;
              if (l && r.parent) break;
              if (o[a] !== ".") {
                if (o[a] === "..") {
                  if (s = w.dirname(s), n.isRoot(i)) {
                    e = s + "/" + o.slice(a + 1).join("/");
                    continue e;
                  } else i = i.parent;
                  continue;
                }
                s = w.join2(s, o[a]);
                try {
                  i = n.lookupNode(i, o[a]);
                } catch (m) {
                  if ((m == null ? void 0 : m.errno) === 44 && l && r.noent_okay) return {
                    path: s
                  };
                  throw m;
                }
                if (n.isMountpoint(i) && (!l || r.follow_mount) && (i = i.mounted.root), n.isLink(i.mode) && (!l || r.follow)) {
                  if (!i.node_ops.readlink) throw new n.ErrnoError(52);
                  var d = i.node_ops.readlink(i);
                  w.isAbs(d) || (d = w.dirname(s) + "/" + d), e = d + "/" + o.slice(a + 1).join("/");
                  continue e;
                }
              }
            }
            return {
              path: s,
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
            var s = i.name;
            if (i.parent.id === e.id && s === r) return i;
          }
          return n.lookup(e, r);
        },
        createNode(e, r, t, o) {
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
          } catch (s) {
            return s.errno;
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
          return e = Object.assign(new n.FSStream(), e), r == -1 && (r = n.nextfd()), e.fd = r, n.streams[r] = e, e;
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
          typeof e == "function" && (r = e, e = false), n.syncFSRequests++, n.syncFSRequests > 1 && L(`warning: ${n.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
          var t = n.getMounts(n.root.mount), o = 0;
          function i(a) {
            return n.syncFSRequests--, r(a);
          }
          function s(a) {
            if (a) return s.errored ? void 0 : (s.errored = true, i(a));
            ++o >= t.length && i(null);
          }
          t.forEach((a) => {
            if (!a.type.syncfs) return s(null);
            a.type.syncfs(a, e, s);
          });
        },
        mount(e, r, t) {
          var o = t === "/", i = !t, s;
          if (o && n.root) throw new n.ErrnoError(10);
          if (!o && !i) {
            var a = n.lookupPath(t, {
              follow_mount: false
            });
            if (t = a.path, s = a.node, n.isMountpoint(s)) throw new n.ErrnoError(10);
            if (!n.isDir(s.mode)) throw new n.ErrnoError(54);
          }
          var l = {
            type: e,
            opts: r,
            mountpoint: t,
            mounts: []
          }, d = e.mount(l);
          return d.mount = l, l.root = d, o ? n.root = d : s && (s.mounted = l, s.mount && s.mount.mounts.push(l)), d;
        },
        unmount(e) {
          var r = n.lookupPath(e, {
            follow_mount: false
          });
          if (!n.isMountpoint(r.node)) throw new n.ErrnoError(28);
          var t = r.node, o = t.mounted, i = n.getMounts(o);
          Object.keys(n.nameTable).forEach((a) => {
            for (var l = n.nameTable[a]; l; ) {
              var d = l.name_next;
              i.includes(l.mount) && n.destroyNode(l), l = d;
            }
          }), t.mounted = null;
          var s = t.mount.mounts.indexOf(o);
          t.mount.mounts.splice(s, 1);
        },
        lookup(e, r) {
          return e.node_ops.lookup(e, r);
        },
        mknod(e, r, t) {
          var o = n.lookupPath(e, {
            parent: true
          }), i = o.node, s = w.basename(e);
          if (!s) throw new n.ErrnoError(28);
          if (s === "." || s === "..") throw new n.ErrnoError(20);
          var a = n.mayCreate(i, s);
          if (a) throw new n.ErrnoError(a);
          if (!i.node_ops.mknod) throw new n.ErrnoError(63);
          return i.node_ops.mknod(i, s, r, t);
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
            } catch (s) {
              if (s.errno != 20) throw s;
            }
          }
        },
        mkdev(e, r, t) {
          return typeof t > "u" && (t = r, r = 438), r |= 8192, n.mknod(e, r, t);
        },
        symlink(e, r) {
          if (!ue.resolve(e)) throw new n.ErrnoError(44);
          var t = n.lookupPath(r, {
            parent: true
          }), o = t.node;
          if (!o) throw new n.ErrnoError(44);
          var i = w.basename(r), s = n.mayCreate(o, i);
          if (s) throw new n.ErrnoError(s);
          if (!o.node_ops.symlink) throw new n.ErrnoError(63);
          return o.node_ops.symlink(o, i, e);
        },
        rename(e, r) {
          var t = w.dirname(e), o = w.dirname(r), i = w.basename(e), s = w.basename(r), a, l, d;
          if (a = n.lookupPath(e, {
            parent: true
          }), l = a.node, a = n.lookupPath(r, {
            parent: true
          }), d = a.node, !l || !d) throw new n.ErrnoError(44);
          if (l.mount !== d.mount) throw new n.ErrnoError(75);
          var m = n.lookupNode(l, i), p = ue.relative(e, o);
          if (p.charAt(0) !== ".") throw new n.ErrnoError(28);
          if (p = ue.relative(r, t), p.charAt(0) !== ".") throw new n.ErrnoError(55);
          var k;
          try {
            k = n.lookupNode(d, s);
          } catch {
          }
          if (m !== k) {
            var h = n.isDir(m.mode), u = n.mayDelete(l, i, h);
            if (u) throw new n.ErrnoError(u);
            if (u = k ? n.mayDelete(d, s, h) : n.mayCreate(d, s), u) throw new n.ErrnoError(u);
            if (!l.node_ops.rename) throw new n.ErrnoError(63);
            if (n.isMountpoint(m) || k && n.isMountpoint(k)) throw new n.ErrnoError(10);
            if (d !== l && (u = n.nodePermissions(l, "w"), u)) throw new n.ErrnoError(u);
            n.hashRemoveNode(m);
            try {
              l.node_ops.rename(m, d, s), m.parent = d;
            } catch (v) {
              throw v;
            } finally {
              n.hashAddNode(m);
            }
          }
        },
        rmdir(e) {
          var r = n.lookupPath(e, {
            parent: true
          }), t = r.node, o = w.basename(e), i = n.lookupNode(t, o), s = n.mayDelete(t, o, true);
          if (s) throw new n.ErrnoError(s);
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
          var o = w.basename(e), i = n.lookupNode(t, o), s = n.mayDelete(t, o, false);
          if (s) throw new n.ErrnoError(s);
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
            var s = n.lookupPath(e, {
              follow: !o
            });
            i = s.node;
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
          }), i = o.node, s = n.checkOpExists(i.node_ops.setattr, 63);
          s(i, {
            atime: r,
            mtime: t
          });
        },
        open(e, r, t = 438) {
          if (e === "") throw new n.ErrnoError(44);
          r = typeof r == "string" ? fr(r) : r, r & 64 ? t = t & 4095 | 32768 : t = 0;
          var o, i;
          if (typeof e == "object") o = e;
          else {
            i = e.endsWith("/");
            var s = n.lookupPath(e, {
              follow: !(r & 131072),
              noent_okay: true
            });
            o = s.node, e = s.path;
          }
          var a = false;
          if (r & 64) if (o) {
            if (r & 128) throw new n.ErrnoError(20);
          } else {
            if (i) throw new n.ErrnoError(31);
            o = n.mknod(e, t | 511, 0), a = true;
          }
          if (!o) throw new n.ErrnoError(44);
          if (n.isChrdev(o.mode) && (r &= -513), r & 65536 && !n.isDir(o.mode)) throw new n.ErrnoError(54);
          if (!a) {
            var l = n.mayOpen(o, r);
            if (l) throw new n.ErrnoError(l);
          }
          r & 512 && !a && n.truncate(o, 0), r &= -131713;
          var d = n.createStream({
            node: o,
            path: n.getPath(o),
            flags: r,
            seekable: true,
            position: 0,
            stream_ops: o.stream_ops,
            ungotten: [],
            error: false
          });
          return d.stream_ops.open && d.stream_ops.open(d), a && n.chmod(o, t & 511), f.logReadFiles && !(r & 1) && (e in n.readFiles || (n.readFiles[e] = 1)), d;
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
          if (o < 0 || i < 0) throw new n.ErrnoError(28);
          if (n.isClosed(e)) throw new n.ErrnoError(8);
          if ((e.flags & 2097155) === 1) throw new n.ErrnoError(8);
          if (n.isDir(e.node.mode)) throw new n.ErrnoError(31);
          if (!e.stream_ops.read) throw new n.ErrnoError(28);
          var s = typeof i < "u";
          if (!s) i = e.position;
          else if (!e.seekable) throw new n.ErrnoError(70);
          var a = e.stream_ops.read(e, r, t, o, i);
          return s || (e.position += a), a;
        },
        write(e, r, t, o, i, s) {
          if (o < 0 || i < 0) throw new n.ErrnoError(28);
          if (n.isClosed(e)) throw new n.ErrnoError(8);
          if (!(e.flags & 2097155)) throw new n.ErrnoError(8);
          if (n.isDir(e.node.mode)) throw new n.ErrnoError(31);
          if (!e.stream_ops.write) throw new n.ErrnoError(28);
          e.seekable && e.flags & 1024 && n.llseek(e, 0, 2);
          var a = typeof i < "u";
          if (!a) i = e.position;
          else if (!e.seekable) throw new n.ErrnoError(70);
          var l = e.stream_ops.write(e, r, t, o, i, s);
          return a || (e.position += l), l;
        },
        mmap(e, r, t, o, i) {
          if (o & 2 && !(i & 2) && (e.flags & 2097155) !== 2) throw new n.ErrnoError(2);
          if ((e.flags & 2097155) === 1) throw new n.ErrnoError(2);
          if (!e.stream_ops.mmap) throw new n.ErrnoError(43);
          if (!r) throw new n.ErrnoError(28);
          return e.stream_ops.mmap(e, r, t, o, i);
        },
        msync(e, r, t, o, i) {
          return e.stream_ops.msync ? e.stream_ops.msync(e, r, t, o, i) : 0;
        },
        ioctl(e, r, t) {
          if (!e.stream_ops.ioctl) throw new n.ErrnoError(59);
          return e.stream_ops.ioctl(e, r, t);
        },
        readFile(e, r = {}) {
          if (r.flags = r.flags || 0, r.encoding = r.encoding || "binary", r.encoding !== "utf8" && r.encoding !== "binary") throw new Error(`Invalid encoding type "${r.encoding}"`);
          var t, o = n.open(e, r.flags), i = n.stat(e), s = i.size, a = new Uint8Array(s);
          return n.read(o, a, 0, s, 0), r.encoding === "utf8" ? t = de(a) : r.encoding === "binary" && (t = a), n.close(o), t;
        },
        writeFile(e, r, t = {}) {
          t.flags = t.flags || 577;
          var o = n.open(e, t.flags, t.mode);
          if (typeof r == "string") {
            var i = new Uint8Array(Ne(r) + 1), s = De(r, i, 0, i.length);
            n.write(o, i, 0, s, void 0, t.canOwn);
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
            write: (o, i, s, a, l) => a,
            llseek: () => 0
          }), n.mkdev("/dev/null", n.makedev(1, 3)), oe.register(n.makedev(5, 0), oe.default_tty_ops), oe.register(n.makedev(6, 0), oe.default_tty1_ops), n.mkdev("/dev/tty", n.makedev(5, 0)), n.mkdev("/dev/tty1", n.makedev(6, 0));
          var e = new Uint8Array(1024), r = 0, t = () => (r === 0 && (He(e), r = e.byteLength), e[--r]);
          n.createDevice("/dev", "random", t), n.createDevice("/dev", "urandom", t), n.mkdir("/dev/shm"), n.mkdir("/dev/shm/tmp");
        },
        createSpecialDirectories() {
          n.mkdir("/proc");
          var e = n.mkdir("/proc/self");
          n.mkdir("/proc/self/fd"), n.mount({
            mount() {
              var r = n.createNode(e, "fd", 16895, 73);
              return r.stream_ops = {
                llseek: c.stream_ops.llseek
              }, r.node_ops = {
                lookup(t, o) {
                  var i = +o, s = n.getStreamChecked(i), a = {
                    parent: null,
                    mount: {
                      mountpoint: "fake"
                    },
                    node_ops: {
                      readlink: () => s.path
                    },
                    id: i + 1
                  };
                  return a.parent = a, a;
                },
                readdir() {
                  return Array.from(n.streams.entries()).filter(([t, o]) => o).map(([t, o]) => t.toString());
                }
              }, r;
            }
          }, {}, "/proc/self/fd");
        },
        createStandardStreams(e, r, t) {
          e ? n.createDevice("/dev", "stdin", e) : n.symlink("/dev/tty", "/dev/stdin"), r ? n.createDevice("/dev", "stdout", null, r) : n.symlink("/dev/tty", "/dev/stdout"), t ? n.createDevice("/dev", "stderr", null, t) : n.symlink("/dev/tty1", "/dev/stderr"), n.open("/dev/stdin", 0), n.open("/dev/stdout", 1), n.open("/dev/stderr", 1);
        },
        staticInit() {
          n.nameTable = new Array(4096), n.mount(c, {}, "/"), n.createDefaultDirectories(), n.createDefaultDevices(), n.createSpecialDirectories(), n.filesystems = {
            MEMFS: c
          };
        },
        init(e, r, t) {
          n.initialized = true, e ?? (e = f.stdin), r ?? (r = f.stdout), t ?? (t = f.stderr), n.createStandardStreams(e, r, t);
        },
        quit() {
          n.initialized = false;
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
            var s = i.pop();
            if (s) {
              var a = w.join2(e, s);
              try {
                n.mkdir(a);
              } catch (l) {
                if (l.errno != 20) throw l;
              }
              e = a;
            }
          }
          return a;
        },
        createFile(e, r, t, o, i) {
          var s = w.join2(typeof e == "string" ? e : n.getPath(e), r), a = ze(o, i);
          return n.create(s, a);
        },
        createDataFile(e, r, t, o, i, s) {
          var a = r;
          e && (e = typeof e == "string" ? e : n.getPath(e), a = r ? w.join2(e, r) : e);
          var l = ze(o, i), d = n.create(a, l);
          if (t) {
            if (typeof t == "string") {
              for (var m = new Array(t.length), p = 0, k = t.length; p < k; ++p) m[p] = t.charCodeAt(p);
              t = m;
            }
            n.chmod(d, l | 146);
            var h = n.open(d, 577);
            n.write(h, t, 0, t.length, 0, s), n.close(h), n.chmod(d, l);
          }
        },
        createDevice(e, r, t, o) {
          var _a;
          var i = w.join2(typeof e == "string" ? e : n.getPath(e), r), s = ze(!!t, !!o);
          (_a = n.createDevice).major ?? (_a.major = 64);
          var a = n.makedev(n.createDevice.major++, 0);
          return n.registerDevice(a, {
            open(l) {
              l.seekable = false;
            },
            close(l) {
              var _a2;
              ((_a2 = o == null ? void 0 : o.buffer) == null ? void 0 : _a2.length) && o(10);
            },
            read(l, d, m, p, k) {
              for (var h = 0, u = 0; u < p; u++) {
                var v;
                try {
                  v = t();
                } catch {
                  throw new n.ErrnoError(29);
                }
                if (v === void 0 && h === 0) throw new n.ErrnoError(6);
                if (v == null) break;
                h++, d[m + u] = v;
              }
              return h && (l.node.atime = Date.now()), h;
            },
            write(l, d, m, p, k) {
              for (var h = 0; h < p; h++) try {
                o(d[m + h]);
              } catch {
                throw new n.ErrnoError(29);
              }
              return p && (l.node.mtime = l.node.ctime = Date.now()), h;
            }
          }), n.mkdev(i, s, a);
        },
        forceLoadFile(e) {
          if (e.isDevice || e.isFolder || e.link || e.contents) return true;
          if (typeof XMLHttpRequest < "u") throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
          try {
            e.contents = O(e.url), e.usedBytes = e.contents.length;
          } catch {
            throw new n.ErrnoError(29);
          }
        },
        createLazyFile(e, r, t, o, i) {
          class s {
            constructor() {
              __publicField(this, "lengthKnown", false);
              __publicField(this, "chunks", []);
            }
            get(u) {
              if (!(u > this.length - 1 || u < 0)) {
                var v = u % this.chunkSize, D = u / this.chunkSize | 0;
                return this.getter(D)[v];
              }
            }
            setDataGetter(u) {
              this.getter = u;
            }
            cacheLength() {
              var u = new XMLHttpRequest();
              if (u.open("HEAD", t, false), u.send(null), !(u.status >= 200 && u.status < 300 || u.status === 304)) throw new Error("Couldn't load " + t + ". Status: " + u.status);
              var v = Number(u.getResponseHeader("Content-length")), D, I = (D = u.getResponseHeader("Accept-Ranges")) && D === "bytes", B = (D = u.getResponseHeader("Content-Encoding")) && D === "gzip", W = 1024 * 1024;
              I || (W = v);
              var $ = (X, ce) => {
                if (X > ce) throw new Error("invalid range (" + X + ", " + ce + ") or no bytes requested!");
                if (ce > v - 1) throw new Error("only " + v + " bytes available! programmer error!");
                var A = new XMLHttpRequest();
                if (A.open("GET", t, false), v !== W && A.setRequestHeader("Range", "bytes=" + X + "-" + ce), A.responseType = "arraybuffer", A.overrideMimeType && A.overrideMimeType("text/plain; charset=x-user-defined"), A.send(null), !(A.status >= 200 && A.status < 300 || A.status === 304)) throw new Error("Couldn't load " + t + ". Status: " + A.status);
                return A.response !== void 0 ? new Uint8Array(A.response || []) : je(A.responseText || "");
              }, ke = this;
              ke.setDataGetter((X) => {
                var ce = X * W, A = (X + 1) * W - 1;
                if (A = Math.min(A, v - 1), typeof ke.chunks[X] > "u" && (ke.chunks[X] = $(ce, A)), typeof ke.chunks[X] > "u") throw new Error("doXHR failed!");
                return ke.chunks[X];
              }), (B || !v) && (W = v = 1, v = this.getter(0).length, W = v, N("LazyFiles on gzip forces download of the whole file when length is accessed")), this._length = v, this._chunkSize = W, this.lengthKnown = true;
            }
            get length() {
              return this.lengthKnown || this.cacheLength(), this._length;
            }
            get chunkSize() {
              return this.lengthKnown || this.cacheLength(), this._chunkSize;
            }
          }
          if (typeof XMLHttpRequest < "u") {
            if (!G) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
            var a = new s(), l = {
              isDevice: false,
              contents: a
            };
          } else var l = {
            isDevice: false,
            url: t
          };
          var d = n.createFile(e, r, l, o, i);
          l.contents ? d.contents = l.contents : l.url && (d.contents = null, d.url = l.url), Object.defineProperties(d, {
            usedBytes: {
              get: function() {
                return this.contents.length;
              }
            }
          });
          var m = {}, p = Object.keys(d.stream_ops);
          p.forEach((h) => {
            var u = d.stream_ops[h];
            m[h] = (...v) => (n.forceLoadFile(d), u(...v));
          });
          function k(h, u, v, D, I) {
            var B = h.node.contents;
            if (I >= B.length) return 0;
            var W = Math.min(B.length - I, D);
            if (B.slice) for (var $ = 0; $ < W; $++) u[v + $] = B[I + $];
            else for (var $ = 0; $ < W; $++) u[v + $] = B.get(I + $);
            return W;
          }
          return m.read = (h, u, v, D, I) => (n.forceLoadFile(d), k(h, u, v, D, I)), m.mmap = (h, u, v, D, I) => {
            n.forceLoadFile(d);
            var B = xe();
            if (!B) throw new n.ErrnoError(48);
            return k(h, T, B, u, v), {
              ptr: B,
              allocated: true
            };
          }, d.stream_ops = m, d;
        }
      }, ge = {
        DEFAULT_POLLMASK: 5,
        calculateAt(e, r, t) {
          if (w.isAbs(r)) return r;
          var o;
          if (e === -100) o = n.cwd();
          else {
            var i = ge.getStreamFromFD(e);
            o = i.path;
          }
          if (r.length == 0) {
            if (!t) throw new n.ErrnoError(44);
            return o;
          }
          return o + "/" + r;
        },
        writeStat(e, r) {
          _[e >> 2] = r.dev, _[e + 4 >> 2] = r.mode, E[e + 8 >> 2] = r.nlink, _[e + 12 >> 2] = r.uid, _[e + 16 >> 2] = r.gid, _[e + 20 >> 2] = r.rdev, x[e + 24 >> 3] = BigInt(r.size), _[e + 32 >> 2] = 4096, _[e + 36 >> 2] = r.blocks;
          var t = r.atime.getTime(), o = r.mtime.getTime(), i = r.ctime.getTime();
          return x[e + 40 >> 3] = BigInt(Math.floor(t / 1e3)), E[e + 48 >> 2] = t % 1e3 * 1e3 * 1e3, x[e + 56 >> 3] = BigInt(Math.floor(o / 1e3)), E[e + 64 >> 2] = o % 1e3 * 1e3 * 1e3, x[e + 72 >> 3] = BigInt(Math.floor(i / 1e3)), E[e + 80 >> 2] = i % 1e3 * 1e3 * 1e3, x[e + 88 >> 3] = BigInt(r.ino), 0;
        },
        writeStatFs(e, r) {
          _[e + 4 >> 2] = r.bsize, _[e + 40 >> 2] = r.bsize, _[e + 8 >> 2] = r.blocks, _[e + 12 >> 2] = r.bfree, _[e + 16 >> 2] = r.bavail, _[e + 20 >> 2] = r.files, _[e + 24 >> 2] = r.ffree, _[e + 28 >> 2] = r.fsid, _[e + 44 >> 2] = r.flags, _[e + 36 >> 2] = r.namelen;
        },
        doMsync(e, r, t, o, i) {
          if (!n.isFile(r.node.mode)) throw new n.ErrnoError(43);
          if (o & 2) return 0;
          var s = Y.slice(e, e + t);
          n.msync(r, s, i, t, o);
        },
        getStreamFromFD(e) {
          var r = n.getStreamChecked(e);
          return r;
        },
        varargs: void 0,
        getStr(e) {
          var r = Ae(e);
          return r;
        }
      };
      function dr(e) {
        try {
          var r = ge.getStreamFromFD(e);
          return n.close(r), 0;
        } catch (t) {
          if (typeof n > "u" || t.name !== "ErrnoError") throw t;
          return t.errno;
        }
      }
      var ur = (e, r, t, o) => {
        for (var i = 0, s = 0; s < t; s++) {
          var a = E[r >> 2], l = E[r + 4 >> 2];
          r += 8;
          var d = n.read(e, T, a, l, o);
          if (d < 0) return -1;
          if (i += d, d < l) break;
        }
        return i;
      };
      function cr(e, r, t, o) {
        try {
          var i = ge.getStreamFromFD(e), s = ur(i, r, t);
          return E[o >> 2] = s, 0;
        } catch (a) {
          if (typeof n > "u" || a.name !== "ErrnoError") throw a;
          return a.errno;
        }
      }
      var mr = 9007199254740992, vr = -9007199254740992, hr = (e) => e < vr || e > mr ? NaN : Number(e);
      function wr(e, r, t, o) {
        r = hr(r);
        try {
          if (isNaN(r)) return 61;
          var i = ge.getStreamFromFD(e);
          return n.llseek(i, r, t), x[o >> 3] = BigInt(i.position), i.getdents && r === 0 && t === 0 && (i.getdents = null), 0;
        } catch (s) {
          if (typeof n > "u" || s.name !== "ErrnoError") throw s;
          return s.errno;
        }
      }
      var pr = (e, r, t, o) => {
        for (var i = 0, s = 0; s < t; s++) {
          var a = E[r >> 2], l = E[r + 4 >> 2];
          r += 8;
          var d = n.write(e, T, a, l, o);
          if (d < 0) return -1;
          if (i += d, d < l) break;
        }
        return i;
      };
      function yr(e, r, t, o) {
        try {
          var i = ge.getStreamFromFD(e), s = pr(i, r, t);
          return E[o >> 2] = s, 0;
        } catch (a) {
          if (typeof n > "u" || a.name !== "ErrnoError") throw a;
          return a.errno;
        }
      }
      n.createPreloadedFile = lr, n.staticInit(), c.doesNotExistError = new n.ErrnoError(44), c.doesNotExistError.stack = "<generic error, no stack>", f.noExitRuntime && f.noExitRuntime, f.preloadPlugins && (Ie = f.preloadPlugins), f.print && (N = f.print), f.printErr && (L = f.printErr), f.wasmBinary && (K = f.wasmBinary), f.arguments && f.arguments, f.thisProgram && (ne = f.thisProgram);
      var Er = {
        a: Ve,
        b: Ke,
        f: Ye,
        k: Ze,
        j: Qe,
        d: rr,
        e: tr,
        g: dr,
        h: cr,
        i: wr,
        c: yr
      }, te = await $e();
      te.m, f._deform = te.n, f._malloc = te.o, f._free = te.q;
      function Me() {
        if (q > 0) {
          Z = Me;
          return;
        }
        if (ve(), q > 0) {
          Z = Me;
          return;
        }
        function e() {
          var _a;
          f.calledRun = true, !ae && (he(), y(f), (_a = f.onRuntimeInitialized) == null ? void 0 : _a.call(f), we());
        }
        f.setStatus ? (f.setStatus("Running..."), setTimeout(() => {
          setTimeout(() => f.setStatus(""), 1), e();
        }, 1)) : e();
      }
      function gr() {
        if (f.preInit) for (typeof f.preInit == "function" && (f.preInit = [
          f.preInit
        ]); f.preInit.length > 0; ) f.preInit.shift()();
      }
      return gr(), Me(), S = U, S;
    };
  })();
  const P = await br();
  Sr = function(H, j, S, f) {
    if (H.length === 0) return;
    const y = [], V = J(H.flat(), Float64Array, P.HEAPF64);
    y.push(V);
    const U = j.flat(), R = J(U, Uint32Array, P.HEAPU32);
    y.push(R);
    const G = j.map((g) => g.length), b = J(G, Uint32Array, P.HEAPU32);
    y.push(b);
    const z = S.supports ? Array.from(S.supports.keys()) : [], ne = S.supports ? Array.from(S.supports.values()).flat().map((g) => g ? 1 : 0) : [], F = J(z, Uint32Array, P.HEAPU32);
    y.push(F);
    const M = J(ne, Uint8Array, P.HEAPU8);
    y.push(M);
    const C = S.loads ? Array.from(S.loads.keys()) : [], O = S.loads ? Array.from(S.loads.values()).flat() : [], ie = J(C, Uint32Array, P.HEAPU32);
    y.push(ie);
    const _e = J(O, Float64Array, P.HEAPF64);
    y.push(_e);
    const N = (g) => {
      const re = g ? Array.from(g.keys()) : [], Fe = g ? Array.from(g.values()) : [], be = J(re, Uint32Array, P.HEAPU32);
      y.push(be);
      const Se = J(Fe, Float64Array, P.HEAPF64);
      return y.push(Se), {
        keysPtr: be,
        valuesPtr: Se,
        size: re.length
      };
    }, L = N(f.elasticities), K = N(f.elasticitiesOrthogonal), se = N(f.areas), ae = N(f.momentsOfInertiaZ), T = N(f.momentsOfInertiaY), Y = N(f.shearModuli), _ = N(f.torsionalConstants), E = N(f.thicknesses), x = N(f.poissonsRatios), Q = P._malloc(4);
    y.push(Q);
    const me = P._malloc(4);
    y.push(me);
    const ve = P._malloc(4);
    y.push(ve);
    const he = P._malloc(4);
    y.push(he), P._deform(V, H.length, R, U.length, b, j.length, F, M, z.length, ie, _e, C.length, L.keysPtr, L.valuesPtr, L.size, se.keysPtr, se.valuesPtr, se.size, ae.keysPtr, ae.valuesPtr, ae.size, T.keysPtr, T.valuesPtr, T.size, Y.keysPtr, Y.valuesPtr, Y.size, _.keysPtr, _.valuesPtr, _.size, E.keysPtr, E.valuesPtr, E.size, x.keysPtr, x.valuesPtr, x.size, K.keysPtr, K.valuesPtr, K.size, Q, me, ve, he);
    const we = P.HEAPU32[Q / 4], q = P.HEAPU32[me / 4], Z = P.HEAPU32[ve / 4], pe = P.HEAPU32[he / 4], le = new Float64Array(P.HEAPF64.buffer, we, q), ee = new Float64Array(P.HEAPF64.buffer, Z, pe), fe = /* @__PURE__ */ new Map();
    for (let g = 0; g < q; g += 7) {
      const re = le[g];
      fe.set(re, Array.from(le.slice(g + 1, g + 7)));
    }
    const Pe = /* @__PURE__ */ new Map();
    for (let g = 0; g < pe; g += 7) {
      const re = ee[g];
      Pe.set(re, Array.from(ee.slice(g + 1, g + 7)));
    }
    return we && y.push(we), Z && y.push(Z), y.forEach((g) => P._free(g)), {
      deformations: fe,
      reactions: Pe
    };
  };
  function J(H, j, S) {
    const f = new j(H), y = P._malloc(f.length * f.BYTES_PER_ELEMENT);
    return S.set(f, y / f.BYTES_PER_ELEMENT), y;
  }
})();
export {
  __tla,
  Sr as d
};
