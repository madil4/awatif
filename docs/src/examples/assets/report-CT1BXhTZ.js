import{a as k}from"./app-BPsrtgRK.js";import{a as V}from"./BHUODB6U-C5Zks2c4.js";function F(r,t,e,s,i,o){const n=[];return o.forEach($=>{i.forEach(h=>{if($.name in h){const a=h.element,c=e.find(A=>A.element==a),l=s.default.find(A=>A.element==a);c&&l&&n.push($(c,l,h))}})}),n}const Z=(r,t,e)=>{var s;return{element:e.element,frameTimberDesign:{utilizationFactor:((s=t.normal)==null?void 0:s[0])||0,forReport:r.area||0}}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const y=globalThis,N=y.trustedTypes,I=N?N.createPolicy("lit-html",{createHTML:r=>r}):void 0,z="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,B="?"+_,q=`<${B}>`,g=document,C=()=>g.createComment(""),x=r=>r===null||typeof r!="object"&&typeof r!="function",L=Array.isArray,G=r=>L(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",E=`[ 	
\f\r]`,v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,P=/>/g,d=RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,U=/"/g,W=/^(?:script|style|textarea|title)$/i,J=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),K=J(1),H=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),O=new WeakMap,m=g.createTreeWalker(g,129);function j(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return I!==void 0?I.createHTML(t):t}const Q=(r,t)=>{const e=r.length-1,s=[];let i,o=t===2?"<svg>":"",n=v;for(let $=0;$<e;$++){const h=r[$];let a,c,l=-1,A=0;for(;A<h.length&&(n.lastIndex=A,c=n.exec(h),c!==null);)A=n.lastIndex,n===v?c[1]==="!--"?n=D:c[1]!==void 0?n=P:c[2]!==void 0?(W.test(c[2])&&(i=RegExp("</"+c[2],"g")),n=d):c[3]!==void 0&&(n=d):n===d?c[0]===">"?(n=i??v,l=-1):c[1]===void 0?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=c[3]===void 0?d:c[3]==='"'?U:R):n===U||n===R?n=d:n===D||n===P?n=v:(n=d,i=void 0);const p=n===d&&r[$+1].startsWith("/>")?" ":"";o+=n===v?h+q:l>=0?(s.push(a),h.slice(0,l)+z+h.slice(l)+_+p):h+_+(l===-2?$:p)}return[j(r,o+(r[e]||"<?>")+(t===2?"</svg>":"")),s]};class T{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const $=t.length-1,h=this.parts,[a,c]=Q(t,e);if(this.el=T.createElement(a,s),m.currentNode=this.el.content,e===2){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=m.nextNode())!==null&&h.length<$;){if(i.nodeType===1){if(i.hasAttributes())for(const l of i.getAttributeNames())if(l.endsWith(z)){const A=c[n++],p=i.getAttribute(l).split(_),b=/([.?@])?(.*)/.exec(A);h.push({type:1,index:o,name:b[2],strings:p,ctor:b[1]==="."?Y:b[1]==="?"?tt:b[1]==="@"?et:M}),i.removeAttribute(l)}else l.startsWith(_)&&(h.push({type:6,index:o}),i.removeAttribute(l));if(W.test(i.tagName)){const l=i.textContent.split(_),A=l.length-1;if(A>0){i.textContent=N?N.emptyScript:"";for(let p=0;p<A;p++)i.append(l[p],C()),m.nextNode(),h.push({type:2,index:++o});i.append(l[A],C())}}}else if(i.nodeType===8)if(i.data===B)h.push({type:2,index:o});else{let l=-1;for(;(l=i.data.indexOf(_,l+1))!==-1;)h.push({type:7,index:o}),l+=_.length-1}o++}}static createElement(t,e){const s=g.createElement("template");return s.innerHTML=t,s}}function f(r,t,e=r,s){var n,$;if(t===H)return t;let i=s!==void 0?(n=e._$Co)==null?void 0:n[s]:e._$Cl;const o=x(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==o&&(($=i==null?void 0:i._$AO)==null||$.call(i,!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=f(r,i._$AS(r,t.values),i,s)),t}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??g).importNode(e,!0);m.currentNode=i;let o=m.nextNode(),n=0,$=0,h=s[0];for(;h!==void 0;){if(n===h.index){let a;h.type===2?a=new S(o,o.nextSibling,this,t):h.type===1?a=new h.ctor(o,h.name,h.strings,this,t):h.type===6&&(a=new st(o,this,t)),this._$AV.push(a),h=s[++$]}n!==(h==null?void 0:h.index)&&(o=m.nextNode(),n++)}return m.currentNode=g,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class S{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=f(this,t,e),x(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==H&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):G(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==u&&x(this._$AH)?this._$AA.nextSibling.data=t:this.T(g.createTextNode(t)),this._$AH=t}$(t){var o;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=T.createElement(j(s.h,s.h[0]),this.options)),s);if(((o=this._$AH)==null?void 0:o._$AD)===i)this._$AH.p(e);else{const n=new X(i,this),$=n.u(this.options);n.p(e),this.T($),this._$AH=n}}_$AC(t){let e=O.get(t.strings);return e===void 0&&O.set(t.strings,e=new T(t)),e}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new S(this.S(C()),this.S(C()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class M{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(o===void 0)t=f(this,t,e,0),n=!x(t)||t!==this._$AH&&t!==H,n&&(this._$AH=t);else{const $=t;let h,a;for(t=o[0],h=0;h<o.length-1;h++)a=f(this,$[s+h],e,h),a===H&&(a=this._$AH[h]),n||(n=!x(a)||a!==this._$AH[h]),a===u?t=u:t!==u&&(t+=(a??"")+o[h+1]),this._$AH[h]=a}n&&!i&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Y extends M{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}}class tt extends M{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}}class et extends M{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=f(this,t,e,0)??u)===H)return;const s=this._$AH,i=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==u&&(s===u||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){f(this,t)}}const w=y.litHtmlPolyfillSupport;w==null||w(T,S),(y.litHtmlVersions??(y.litHtmlVersions=[])).push("3.1.3");function it(r,t){return K`<ul>
    <li>Here are the result:</li>
    <li>${r.frameTimberDesign.strength}</li>
    <li>${t.frameTimberDesign.utilizationFactor}</li>
  </ul>`}const nt={xPosition:{value:12,min:1,max:20},zPosition:{value:0,min:1,max:10}};function rt(r){const t=[[5,0,0],[r.xPosition.value,0,r.zPosition.value],[5,0,8]],e=[[0,1],[1,2]],s=[{node:0,support:[!0,!0,!0]},{node:2,support:[!0,!0,!0]},{node:1,load:[0,0,-10]},{element:0,area:1.2,elasticity:200},{element:1,area:1.2,elasticity:200}],i=[{element:0,frameTimberDesign:{strength:10}},{element:1,frameTimberDesign:{strength:10}}],o=V(t,e,s),n=F(t,e,s,o,i,[Z]);return{nodes:t,elements:e,analysisInputs:s,analysisOutputs:o,designInputs:i,designOutputs:n}}k({parameters:nt,onParameterChange:rt,reports:[it]});