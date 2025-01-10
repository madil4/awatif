import{v as M,a as Ke}from"./styles-DSkAmlHx.js";import{p as Ze}from"./parameters-Di11Wjw9.js";import{a as je,g as et}from"./_commonjsHelpers-C932wzq6.js";const tt={},rt=Object.freeze(Object.defineProperty({__proto__:null,default:tt},Symbol.toStringTag,{value:"Module"})),ee=je(rt);var ye={exports:{}};(function(s,e){var o=function(){var i=typeof document<"u"&&document.currentScript?document.currentScript.src:void 0;return typeof __filename<"u"&&(i=i||__filename),function(r){r=r||{};var r=typeof r<"u"?r:{},_,I;r.ready=new Promise(function(t,n){_=t,I=n});var w={},P;for(P in r)r.hasOwnProperty(P)&&(w[P]=r[P]);var O=function(t,n){throw n},N=!1,y=!1,h=!1,d=!1;N=typeof window=="object",y=typeof importScripts=="function",h=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string",d=!N&&!h&&!y;var g="";function T(t){return r.locateFile?r.locateFile(t,g):g+t}var R,E,H,B;h?(y?g=ee.dirname(g)+"/":g=__dirname+"/",R=function(n,a){return H||(H=ee),B||(B=ee),n=B.normalize(n),H.readFileSync(n,a?null:"utf8")},E=function(n){var a=R(n,!0);return a.buffer||(a=new Uint8Array(a)),te(a.buffer),a},process.argv.length>1&&process.argv[1].replace(/\\/g,"/"),process.argv.slice(2),process.on("uncaughtException",function(t){if(!(t instanceof he))throw t}),process.on("unhandledRejection",L),O=function(t){process.exit(t)},r.inspect=function(){return"[Emscripten Module object]"}):d?(typeof read<"u"&&(R=function(n){return read(n)}),E=function(n){var a;return typeof readbuffer=="function"?new Uint8Array(readbuffer(n)):(a=read(n,"binary"),te(typeof a=="object"),a)},typeof scriptArgs<"u"&&scriptArgs,typeof quit=="function"&&(O=function(t){quit(t)}),typeof print<"u"&&(typeof console>"u"&&(console={}),console.log=print,console.warn=console.error=typeof printErr<"u"?printErr:print)):(N||y)&&(y?g=self.location.href:document.currentScript&&(g=document.currentScript.src),i&&(g=i),g.indexOf("blob:")!==0?g=g.substr(0,g.lastIndexOf("/")+1):g="",R=function(n){var a=new XMLHttpRequest;return a.open("GET",n,!1),a.send(null),a.responseText},y&&(E=function(n){var a=new XMLHttpRequest;return a.open("GET",n,!1),a.responseType="arraybuffer",a.send(null),new Uint8Array(a.response)}));var Te=r.print||console.log.bind(console),C=r.printErr||console.warn.bind(console);for(P in w)w.hasOwnProperty(P)&&(r[P]=w[P]);w=null,r.arguments&&r.arguments,r.thisProgram&&r.thisProgram,r.quit&&(O=r.quit);var W;r.wasmBinary&&(W=r.wasmBinary);var X;r.noExitRuntime&&(X=r.noExitRuntime),typeof WebAssembly!="object"&&L("no native wasm support detected");var D,J,K=!1;function te(t,n){t||L("Assertion failed: "+n)}var re=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0;function ne(t,n,a){for(var m=n+a,b=n;t[b]&&!(b>=m);)++b;if(b-n>16&&t.subarray&&re)return re.decode(t.subarray(n,b));for(var p="";n<b;){var u=t[n++];if(!(u&128)){p+=String.fromCharCode(u);continue}var f=t[n++]&63;if((u&224)==192){p+=String.fromCharCode((u&31)<<6|f);continue}var S=t[n++]&63;if((u&240)==224?u=(u&15)<<12|f<<6|S:u=(u&7)<<18|f<<12|S<<6|t[n++]&63,u<65536)p+=String.fromCharCode(u);else{var me=u-65536;p+=String.fromCharCode(55296|me>>10,56320|me&1023)}}return p}function Re(t,n){return t?ne(k,t,n):""}function Se(t,n,a,m){if(!(m>0))return 0;for(var b=a,p=a+m-1,u=0;u<t.length;++u){var f=t.charCodeAt(u);if(f>=55296&&f<=57343){var S=t.charCodeAt(++u);f=65536+((f&1023)<<10)|S&1023}if(f<=127){if(a>=p)break;n[a++]=f}else if(f<=2047){if(a+1>=p)break;n[a++]=192|f>>6,n[a++]=128|f&63}else if(f<=65535){if(a+2>=p)break;n[a++]=224|f>>12,n[a++]=128|f>>6&63,n[a++]=128|f&63}else{if(a+3>=p)break;n[a++]=240|f>>18,n[a++]=128|f>>12&63,n[a++]=128|f>>6&63,n[a++]=128|f&63}}return n[a]=0,a-b}function Pe(t,n,a){return Se(t,k,n,a)}function Fe(t){for(var n=0,a=0;a<t.length;++a){var m=t.charCodeAt(a);m>=55296&&m<=57343&&(m=65536+((m&1023)<<10)|t.charCodeAt(++a)&1023),m<=127?++n:m<=2047?n+=2:m<=65535?n+=3:n+=4}return n}var ie=65536,Y,k,U;function Me(t){Y=t,r.HEAP8=new Int8Array(t),r.HEAP16=new Int16Array(t),r.HEAP32=U=new Int32Array(t),r.HEAPU8=k=new Uint8Array(t),r.HEAPU16=new Uint16Array(t),r.HEAPU32=new Uint32Array(t),r.HEAPF32=new Float32Array(t),r.HEAPF64=new Float64Array(t)}var Z=r.INITIAL_MEMORY||16777216;r.wasmMemory?D=r.wasmMemory:D=new WebAssembly.Memory({initial:Z/ie,maximum:Z/ie}),D&&(Y=D.buffer),Z=Y.byteLength,Me(Y);var se=[],ae=[],Ie=[],oe=[];function Oe(){if(r.preRun)for(typeof r.preRun=="function"&&(r.preRun=[r.preRun]);r.preRun.length;)$e(r.preRun.shift());x(se)}function Ne(){x(ae)}function Be(){x(Ie)}function Ue(){if(r.postRun)for(typeof r.postRun=="function"&&(r.postRun=[r.postRun]);r.postRun.length;)He(r.postRun.shift());x(oe)}function $e(t){se.unshift(t)}function He(t){oe.unshift(t)}var $=0,z=null;function Ce(t){$++,r.monitorRunDependencies&&r.monitorRunDependencies($)}function Le(t){if($--,r.monitorRunDependencies&&r.monitorRunDependencies($),$==0&&z){var n=z;z=null,n()}}r.preloadedImages={},r.preloadedAudios={};function L(t){r.onAbort&&r.onAbort(t),t+="",C(t),K=!0,t="abort("+t+"). Build with -s ASSERTIONS=1 for more info.";var n=new WebAssembly.RuntimeError(t);throw I(n),n}function fe(t,n){return String.prototype.startsWith?t.startsWith(n):t.indexOf(n)===0}var qe="data:application/octet-stream;base64,";function ue(t){return fe(t,qe)}var We="file://";function le(t){return fe(t,We)}var F="triangle.out.wasm";ue(F)||(F=T(F));function ce(){try{if(W)return new Uint8Array(W);if(E)return E(F);throw"both async and sync fetching of the wasm failed"}catch(t){L(t)}}function De(){return!W&&(N||y)&&typeof fetch=="function"&&!le(F)?fetch(F,{credentials:"same-origin"}).then(function(t){if(!t.ok)throw"failed to load wasm binary file at '"+F+"'";return t.arrayBuffer()}).catch(function(){return ce()}):Promise.resolve().then(ce)}function ke(){var t={a:Xe};function n(u,f){var S=u.exports;r.asm=S,J=r.asm.g,Le()}Ce();function a(u){n(u.instance)}function m(u){return De().then(function(f){return WebAssembly.instantiate(f,t)}).then(u,function(f){C("failed to asynchronously prepare wasm: "+f),L(f)})}function b(){if(!W&&typeof WebAssembly.instantiateStreaming=="function"&&!ue(F)&&!le(F)&&typeof fetch=="function")fetch(F,{credentials:"same-origin"}).then(function(u){var f=WebAssembly.instantiateStreaming(u,t);return f.then(a,function(S){return C("wasm streaming compile failed: "+S),C("falling back to ArrayBuffer instantiation"),m(a)})});else return m(a)}if(r.instantiateWasm)try{var p=r.instantiateWasm(t,n);return p}catch(u){return C("Module.instantiateWasm callback failed with error: "+u),!1}return b(),{}}function x(t){for(;t.length>0;){var n=t.shift();if(typeof n=="function"){n(r);continue}var a=n.func;typeof a=="number"?n.arg===void 0?J.get(a)():J.get(a)(n.arg):a(n.arg===void 0?null:n.arg)}}function ze(t,n,a){k.copyWithin(t,n,n+a)}function Ge(t){L("OOM")}function Ye(t){Ge()}function xe(t){Je(t)}var V={mappings:{},buffers:[null,[],[]],printChar:function(t,n){var a=V.buffers[t];n===0||n===10?((t===1?Te:C)(ne(a,0)),a.length=0):a.push(n)},varargs:void 0,get:function(){V.varargs+=4;var t=U[V.varargs-4>>2];return t},getStr:function(t){var n=Re(t);return n},get64:function(t,n){return t}};function Ve(t,n,a,m){for(var b=0,p=0;p<a;p++){for(var u=U[n+p*8>>2],f=U[n+(p*8+4)>>2],S=0;S<f;S++)V.printChar(t,k[u+S]);b+=f}return U[m>>2]=b,0}function Qe(t){var n=Date.now();return U[t>>2]=n/1e3|0,U[t+4>>2]=n%1e3*1e3|0,0}ae.push({func:function(){ge()}});var Xe={d:ze,e:Ye,f:xe,c:Ve,b:Qe,a:D};ke();var ge=r.___wasm_call_ctors=function(){return(ge=r.___wasm_call_ctors=r.asm.h).apply(null,arguments)};r._malloc=function(){return(r._malloc=r.asm.i).apply(null,arguments)},r._free=function(){return(r._free=r.asm.j).apply(null,arguments)},r._triangulate=function(){return(r._triangulate=r.asm.k).apply(null,arguments)},r.stringToUTF8=Pe,r.lengthBytesUTF8=Fe;var Q;function he(t){this.name="ExitStatus",this.message="Program terminated with exit("+t+")",this.status=t}z=function t(){Q||j(),Q||(z=t)};function j(t){if($>0||(Oe(),$>0))return;function n(){Q||(Q=!0,r.calledRun=!0,!K&&(Ne(),Be(),_(r),r.onRuntimeInitialized&&r.onRuntimeInitialized(),Ue()))}r.setStatus?(r.setStatus("Running..."),setTimeout(function(){setTimeout(function(){r.setStatus("")},1),n()},1)):n()}r.run=j;function Je(t,n){X||(r.onExit&&r.onExit(t),K=!0),O(t,new he(t))}if(r.preInit)for(typeof r.preInit=="function"&&(r.preInit=[r.preInit]);r.preInit.length>0;)r.preInit.pop()();return X=!0,j(),r.ready}}();s.exports=o})(ye);var nt=ye.exports;const it=nt;let c={};const st=s=>{const e=c.lengthBytesUTF8(s)+1,o=c._malloc(e);return c.stringToUTF8(s,o,e),o},A=(s,e=Int32Array)=>{if(!s||!s.length)return null;const o=at(s,e),i=c._malloc(o.length*o.BYTES_PER_ELEMENT),l=i/o.BYTES_PER_ELEMENT,r=ve(e);return c[r].subarray(l,l+o.length).set(o),i},v=(s,e,o=Int32Array)=>{if(!s)return null;const i=s/o.BYTES_PER_ELEMENT,l=ve(o);return c[l].subarray(i,i+e)},ve=s=>{switch(s){case Float64Array:return"HEAPF64";case Int32Array:return"HEAP32";default:return"HEAP8"}},at=(s,e)=>s.constructor==e?s:new e(s),_e=(s,e,o=null)=>{if(typeof s=="string")return s;(typeof s!="object"||!s)&&(s={});let i="";return s.pslg!==!1&&(i=`${i}p`),i=`${i}z`,o!==null&&(i=`${i}v`),s.quiet!==!1&&(i=`${i}Q`),s.refine===!0&&(i=`${i}r`),s.regionAttr===!0&&(i=`${i}A`),s.convexHull===!0&&(i=`${i}c`),s.ccdt===!0&&(i=`${i}D`),s.jettison===!0&&(i=`${i}j`),s.edges===!0&&(i=`${i}e`),s.neighbors===!0&&(i=`${i}n`),s.quadratic===!0&&(i=`${i}o2`),s.bndMarkers===!1&&(i=`${i}B`),s.holes===!1&&(i=`${i}O`),typeof s.steiner=="number"&&(i=`${i}S${s.steiner}`),typeof s.quality=="number"?i=`${i}q${s.quality}`:s.quality===!0&&(i=`${i}q`),typeof s.area=="number"?i=`${i}a${s.area}`:s.area===!0&&(i=`${i}a`),s.quiet===!1&&console.log("Switches:",i),i};class G{static get LENGTH(){return 23}constructor(e={}){this.ptr=c._malloc(G.LENGTH*Int32Array.BYTES_PER_ELEMENT),this.arr=v(this.ptr,G.LENGTH),this.arr.set(new Int32Array(G.LENGTH));for(const o in e)o in this&&(this[o]=e[o])}destroy(e){c._free(this.arr[0]),c._free(this.arr[1]),c._free(this.arr[2]),c._free(this.arr[5]),c._free(this.arr[6]),c._free(this.arr[7]),c._free(this.arr[8]),c._free(this.arr[12]),c._free(this.arr[13]),c._free(this.arr[19]),c._free(this.arr[20]),c._free(this.arr[21]),c._free(this.ptr),e&&(c._free(this.arr[15]),c._free(this.arr[17]))}set pointlist(e){this.arr[0]=A(e,Float64Array),this.arr[3]=e?~~(e.length*.5):0}set pointattributelist(e){this.arr[1]=A(e,Float64Array),this.arr[4]=e?~~(e.length/this.numberofpoints):0}set pointmarkerlist(e){this.arr[2]=A(e)}set numberofpoints(e){}set numberofpointattributes(e){}set trianglelist(e){this.arr[5]=A(e),this.arr[9]=e?~~(e.length/3):0}set triangleattributelist(e){this.arr[6]=A(e,Float64Array),this.arr[11]=e?~~(e.length/this.numberoftriangles):0}set trianglearealist(e){this.arr[7]=A(e,Float64Array)}set neighborlist(e){this.arr[8]=A(e)}set numberoftriangles(e){}set numberofcorners(e){}set numberoftriangleattributes(e){}set segmentlist(e){this.arr[12]=A(e),this.arr[14]=e?~~(e.length*.5):0}set segmentmarkerlist(e){this.arr[13]=A(e)}set numberofsegments(e){}set holelist(e){this.arr[15]=A(e,Float64Array),this.arr[16]=e?~~(e.length*.5):0}set numberofholes(e){}set regionlist(e){this.arr[17]=A(e,Float64Array),this.arr[18]=e?~~(e.length*.25):0}set numberofregions(e){}set edgelist(e){this.arr[19]=A(e),this.arr[22]=e?~~(e.length*.5):0}set edgemarkerlist(e){this.arr[20]=A(e)}set normlist(e){this.arr[21]=A(e,Float64Array)}set numberofedges(e){}get pointlist(){return v(this.arr[0],this.numberofpoints*2,Float64Array)}get pointattributelist(){return v(this.arr[1],this.numberofpointattributes*this.numberofpoints,Float64Array)}get pointmarkerlist(){return v(this.arr[2],this.numberofpoints)}get numberofpoints(){return this.arr[3]}get numberofpointattributes(){return this.arr[4]}get trianglelist(){return v(this.arr[5],this.numberoftriangles*this.numberofcorners)}get triangleattributelist(){return v(this.arr[6],this.numberoftriangleattributes*this.numberoftriangles,Float64Array)}get trianglearealist(){return v(this.arr[7],this.numberoftriangles,Float64Array)}get neighborlist(){return v(this.arr[8],this.numberoftriangles*3)}get numberoftriangles(){return this.arr[9]}get numberofcorners(){return this.arr[10]}get numberoftriangleattributes(){return this.arr[11]}get segmentlist(){return v(this.arr[12],this.numberofsegments*2)}get segmentmarkerlist(){return v(this.arr[13],this.numberofsegments)}get numberofsegments(){return this.arr[14]}get holelist(){return v(this.arr[15],this.numberofholes*2,Float64Array)}get numberofholes(){return this.arr[16]}get regionlist(){return v(this.arr[17],this.numberofregions*4,Float64Array)}get numberofregions(){return this.arr[18]}get edgelist(){return v(this.arr[19],this.numberofedges*2)}get edgemarkerlist(){return v(this.arr[20],this.numberofedges)}get normlist(){return v(this.arr[21],this.numberofedges*2,Float64Array)}get numberofedges(){return this.arr[22]}}const ot=s=>new Promise((e,o)=>{it({locateFile:(i,l)=>s||l+i}).then(i=>{c=i,e()})}),ft=(s,e,o,i=null)=>{const l=_e(s,e,i),r=st(l),_=i?i.ptr:null;c._triangulate(r,e.ptr,o.ptr,_),c._free(r)},ut=s=>new G(s),lt=(s,e)=>{s.destroy(e)};var ct={init:ot,triangulate:ft,makeIO:ut,freeIO:lt,getSwitchesStr:_e};const q=et(ct),gt=""+new URL("triangle-CCJHBrBP.wasm",import.meta.url).href;function ht({faces:s,points:e,subdivisions:o=1}){for(let i=0;i<o;i++){const l=[...e],r=new Map,_=mt(s),I=new Map,w=new Map;_.forEach((y,h)=>{const d=[];s.forEach((g,T)=>{de(y,g)&&d.push(T)}),w.set(h,d)});const P=new Map,O=new Map;e.forEach((y,h)=>{const d=[];_.forEach((T,R)=>{T.includes(h)&&d.push(R)}),P.set(h,d);const g=new Set;d.forEach(T=>{var R;(R=w.get(T))==null||R.forEach(E=>{g.add(E)})}),O.set(h,Array.from(g))}),s.forEach((y,h)=>{const d=y.map(T=>e[T]),g=pe(d);e.push(g),r.set(h,e.length-1)}),_.forEach((y,h)=>{const d=y.map(E=>e[E]);(w.get(h)??[]).map(E=>r.get(E)??-1).map(E=>e[E]);const R=pe([...d]);e.push(R),I.set(h,e.length-1)});const N=[];l.forEach((y,h)=>{var d;(d=O.get(h))==null||d.forEach(g=>{const T=r.get(g)??-1,H=(P.get(h)??[]).filter(B=>de(_[B],s[g])).map(B=>I.get(B)??-1);N.push([h,H[0],T,H[1]])})}),s=N}return{faces:s,points:e}}function pe(s){const e=s.reduce((i,l)=>[i[0]+l[0],i[1]+l[1]],[0,0]),o=s.length;return[e[0]/o,e[1]/o]}function mt(s){const e=new Set;return s.forEach(o=>{for(let i=0;i<o.length;i++){const l=o[i],r=o[(i+1)%o.length],_=l<r?`${l},${r}`:`${r},${l}`;e.add(_)}}),Array.from(e).map(o=>o.split(",").map(Number))}function de(s,e){const[o,i]=s;for(let l=0;l<e.length;l++)if(e[l]===o&&e[(l+1)%e.length]===i||e[l]===i&&e[(l+1)%e.length]===o)return!0;return!1}const Ee=M.state(!1);q.init(gt).then(()=>Ee.val=!0);function pt({points:s,polygon:e}){const o=M.state([]),i=M.state([]);return M.derive(()=>{if(!Ee.val)return;const l=q.makeIO({pointlist:s.val.flat(),segmentlist:dt(e.val)}),r=q.makeIO();q.triangulate("pzQOS300q30a3",l,r);const{points:_,faces:I}=ht({points:yt(r),faces:vt(r),subdivisions:0});o.val=_.map(w=>[w[0],0,w[1]]),i.val=I,q.freeIO(l,!0),q.freeIO(r)}),{nodes:o,elements:i}}function dt(s){const e=[];for(let o=0;o<s.length;o+=1)e.push(s[o],s[(o+1)%s.length]);return e}function yt(s){const e=[],o=s.pointlist;for(let i=0;i<o.length;i+=2)e.push([o[i],o[i+1]]);return e}function vt(s){const e=[],o=s.trianglelist;for(let i=0;i<o.length;i+=3)e.push([o[i],o[i+1],o[i+2]]);return e}const Ae={boundary:{value:M.state(5),min:1,max:10,step:.1,label:"Boundary point"}},be=M.state([]),we=M.state([]);M.derive(()=>{const s=M.state([[0,0],[5,0],[Ae.boundary.value.val,3],[8,7],[15,5],[15,0],[20,0],[20,10],[0,10],[0,0]]),e=M.state([0,1,2,3,4,5,6,7,8]),{nodes:o,elements:i}=pt({points:s,polygon:e});be.val=o.val,we.val=i.val});document.body.append(Ze(Ae),Ke({structure:{nodes:be,elements:we}}));