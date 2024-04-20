var Dp=Object.defineProperty;var Ip=(i,t,e)=>t in i?Dp(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var te=(i,t,e)=>(Ip(i,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();let qn=Object.getPrototypeOf,vo,Qe,bi,wu={isConnected:1},Np=1e3,Rs,jl={},Up=qn(wu),Mu=qn(qn),Su=(i,t,e,n)=>(i??(setTimeout(e,n),new Set)).add(t),Eu=(i,t,e)=>{let n=Qe;Qe=t;try{return i(e)}catch(r){return console.error(r),e}finally{Qe=n}},_o=i=>i.filter(t=>{var e;return(e=t._dom)==null?void 0:e.isConnected}),Tu=i=>Rs=Su(Rs,i,()=>{for(let t of Rs)t._bindings=_o(t._bindings),t._listeners=_o(t._listeners);Rs=null},Np),go={get val(){var i;return(i=Qe==null?void 0:Qe._getters)==null||i.add(this),this._val},get oldVal(){var i;return(i=Qe==null?void 0:Qe._getters)==null||i.add(this),this._oldVal},set val(i){var t;if((t=Qe==null?void 0:Qe._setters)==null||t.add(this),i!==this._val){this._val=i;let e=[...this._listeners=_o(this._listeners)];for(let n of e)cl(n.f,n.s,n._dom),n._dom=null;this._bindings.length?vo=Su(vo,this,Fp):this._oldVal=i}}},Au=i=>({__proto__:go,_val:i,_oldVal:i,_bindings:[],_listeners:[]}),Qr=(i,t)=>{let e={_getters:new Set,_setters:new Set},n={f:i},r=bi;bi=[];let s=Eu(i,e,t);s=(s??document).nodeType?s:new Text(s);for(let o of e._getters)e._setters.has(o)||(Tu(o),o._bindings.push(n));for(let o of bi)o._dom=s;return bi=r,n._dom=s},cl=(i,t=Au(),e)=>{let n={_getters:new Set,_setters:new Set},r={f:i,s:t};r._dom=e??(bi==null?void 0:bi.push(r))??wu,t.val=Eu(i,n,t._val);for(let s of n._getters)n._setters.has(s)||(Tu(s),s._listeners.push(r));return t},Cu=(i,...t)=>{for(let e of t.flat(1/0)){let n=qn(e??0),r=n===go?Qr(()=>e.val):n===Mu?Qr(e):e;r!=null&&i.append(r)}return i},Pu=(i,t,...e)=>{var o;let[n,...r]=qn(e[0]??0)===Up?e:[{},...e],s=i?document.createElementNS(i,t):document.createElement(t);for(let[a,l]of Object.entries(n)){let c=_=>_?Object.getOwnPropertyDescriptor(_,a)??c(qn(_)):null,h=t+","+a,u=jl[h]??(jl[h]=((o=c(qn(s)))==null?void 0:o.set)??0),d=a.startsWith("on")?(_,g)=>{let f=a.slice(2);s.removeEventListener(f,g),s.addEventListener(f,_)}:u?u.bind(s):s.setAttribute.bind(s,a),p=qn(l??0);a.startsWith("on")||p===Mu&&(l=cl(l),p=go),p===go?Qr(()=>(d(l.val,l._oldVal),s)):d(l)}return Cu(s,...r)},Zl=i=>({get:(t,e)=>Pu.bind(null,i,e)}),Op=new Proxy(i=>new Proxy(Pu,Zl(i)),Zl()),Ru=(i,t)=>t?t!==i&&i.replaceWith(t):i.remove(),Fp=()=>{let i=[...vo].filter(t=>t._val!==t._oldVal);vo=null;for(let t of new Set(i.flatMap(e=>e._bindings=_o(e._bindings))))Ru(t._dom,Qr(t.f,t._dom)),t._dom=null;for(let t of i)t._oldVal=t._val},Bp=(i,t)=>Ru(i,Qr(t,i));const xt={add:Cu,tags:Op,state:Au,derive:cl,hydrate:Bp};/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const hl="163",Bi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ki={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},kp=0,Jl=1,Vp=2,Lu=1,zp=2,Tn=3,ni=0,Ve=1,$e=2,Zn=0,ur=1,Ql=2,tc=3,ec=4,Hp=5,gi=100,Gp=101,Wp=102,Xp=103,$p=104,Yp=200,qp=201,Kp=202,jp=203,Wa=204,Xa=205,Zp=206,Jp=207,Qp=208,tf=209,ef=210,nf=211,rf=212,sf=213,of=214,af=0,lf=1,cf=2,xo=3,hf=4,uf=5,df=6,pf=7,Du=0,ff=1,mf=2,Jn=0,vf=1,_f=2,gf=3,xf=4,bf=5,yf=6,wf=7,Iu=300,gr=301,xr=302,$a=303,Ya=304,No=306,qa=1e3,yi=1001,Ka=1002,en=1003,Mf=1004,Ls=1005,an=1006,Ko=1007,wi=1008,Qn=1009,Sf=1010,Ef=1011,Nu=1012,Uu=1013,br=1014,Kn=1015,bo=1016,Ou=1017,Fu=1018,ms=1020,Tf=35902,Af=1021,Cf=1022,pn=1023,Pf=1024,Rf=1025,dr=1026,ts=1027,Lf=1028,Bu=1029,Df=1030,ku=1031,Vu=1033,jo=33776,Zo=33777,Jo=33778,Qo=33779,nc=35840,ic=35841,rc=35842,sc=35843,zu=36196,oc=37492,ac=37496,lc=37808,cc=37809,hc=37810,uc=37811,dc=37812,pc=37813,fc=37814,mc=37815,vc=37816,_c=37817,gc=37818,xc=37819,bc=37820,yc=37821,ta=36492,wc=36494,Mc=36495,If=36283,Sc=36284,Ec=36285,Tc=36286,Nf=3200,Uf=3201,Of=0,Ff=1,$n="",un="srgb",oi="srgb-linear",ul="display-p3",Uo="display-p3-linear",yo="linear",ee="srgb",wo="rec709",Mo="p3",Vi=7680,Ac=519,Bf=512,kf=513,Vf=514,Hu=515,zf=516,Hf=517,Gf=518,Wf=519,ja=35044,Cc="300 es",An=2e3,So=2001;class Ii{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const Pe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Pc=1234567;const Xr=Math.PI/180,es=180/Math.PI;function mn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pe[i&255]+Pe[i>>8&255]+Pe[i>>16&255]+Pe[i>>24&255]+"-"+Pe[t&255]+Pe[t>>8&255]+"-"+Pe[t>>16&15|64]+Pe[t>>24&255]+"-"+Pe[e&63|128]+Pe[e>>8&255]+"-"+Pe[e>>16&255]+Pe[e>>24&255]+Pe[n&255]+Pe[n>>8&255]+Pe[n>>16&255]+Pe[n>>24&255]).toLowerCase()}function Ee(i,t,e){return Math.max(t,Math.min(e,i))}function dl(i,t){return(i%t+t)%t}function Xf(i,t,e,n,r){return n+(i-t)*(r-n)/(e-t)}function $f(i,t,e){return i!==t?(e-i)/(t-i):0}function $r(i,t,e){return(1-e)*i+e*t}function Yf(i,t,e,n){return $r(i,t,1-Math.exp(-e*n))}function qf(i,t=1){return t-Math.abs(dl(i,t*2)-t)}function Kf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function jf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Zf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Jf(i,t){return i+Math.random()*(t-i)}function Qf(i){return i*(.5-Math.random())}function tm(i){i!==void 0&&(Pc=i);let t=Pc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function em(i){return i*Xr}function nm(i){return i*es}function im(i){return(i&i-1)===0&&i!==0}function rm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function sm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function om(i,t,e,n,r){const s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+n)/2),h=o((t+n)/2),u=s((t-n)/2),d=o((t-n)/2),p=s((n-t)/2),_=o((n-t)/2);switch(r){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*_,l*p,a*c);break;case"YXY":i.set(l*p,a*h,l*_,a*c);break;case"ZYZ":i.set(l*_,l*p,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ln(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function jt(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const am={DEG2RAD:Xr,RAD2DEG:es,generateUUID:mn,clamp:Ee,euclideanModulo:dl,mapLinear:Xf,inverseLerp:$f,lerp:$r,damp:Yf,pingpong:qf,smoothstep:Kf,smootherstep:jf,randInt:Zf,randFloat:Jf,randFloatSpread:Qf,seededRandom:tm,degToRad:em,radToDeg:nm,isPowerOfTwo:im,ceilPowerOfTwo:rm,floorPowerOfTwo:sm,setQuaternionFromProperEuler:om,normalize:jt,denormalize:ln};class it{constructor(t=0,e=0){it.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*r+t.x,this.y=s*r+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Et{constructor(t,e,n,r,s,o,a,l,c){Et.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,l,c)}set(t,e,n,r,s,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=r,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],_=n[8],g=r[0],f=r[3],m=r[6],T=r[1],x=r[4],S=r[7],D=r[2],P=r[5],C=r[8];return s[0]=o*g+a*T+l*D,s[3]=o*f+a*x+l*P,s[6]=o*m+a*S+l*C,s[1]=c*g+h*T+u*D,s[4]=c*f+h*x+u*P,s[7]=c*m+h*S+u*C,s[2]=d*g+p*T+_*D,s[5]=d*f+p*x+_*P,s[8]=d*m+p*S+_*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*s*h+n*a*l+r*s*c-r*o*l}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*s,p=c*s-o*l,_=e*u+n*d+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return t[0]=u*g,t[1]=(r*c-h*n)*g,t[2]=(a*n-r*o)*g,t[3]=d*g,t[4]=(h*e-r*l)*g,t[5]=(r*s-a*e)*g,t[6]=p*g,t[7]=(n*l-c*e)*g,t[8]=(o*e-n*s)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ea.makeScale(t,e)),this}rotate(t){return this.premultiply(ea.makeRotation(-t)),this}translate(t,e){return this.premultiply(ea.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ea=new Et;function Gu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Eo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function lm(){const i=Eo("canvas");return i.style.display="block",i}const Rc={};function Wu(i){i in Rc||(Rc[i]=!0,console.warn(i))}const Lc=new Et().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Dc=new Et().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ds={[oi]:{transfer:yo,primaries:wo,toReference:i=>i,fromReference:i=>i},[un]:{transfer:ee,primaries:wo,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Uo]:{transfer:yo,primaries:Mo,toReference:i=>i.applyMatrix3(Dc),fromReference:i=>i.applyMatrix3(Lc)},[ul]:{transfer:ee,primaries:Mo,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Dc),fromReference:i=>i.applyMatrix3(Lc).convertLinearToSRGB()}},cm=new Set([oi,Uo]),Jt={enabled:!0,_workingColorSpace:oi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!cm.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=Ds[t].toReference,r=Ds[e].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Ds[i].primaries},getTransfer:function(i){return i===$n?yo:Ds[i].transfer}};function pr(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function na(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let zi;class hm{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{zi===void 0&&(zi=Eo("canvas")),zi.width=t.width,zi.height=t.height;const n=zi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=zi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Eo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=pr(s[o]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(pr(e[n]/255)*255):e[n]=pr(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let um=0;class Xu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:um++}),this.uuid=mn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(ia(r[o].image)):s.push(ia(r[o]))}else s=ia(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function ia(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?hm.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let dm=0;class Ue extends Ii{constructor(t=Ue.DEFAULT_IMAGE,e=Ue.DEFAULT_MAPPING,n=yi,r=yi,s=an,o=wi,a=pn,l=Qn,c=Ue.DEFAULT_ANISOTROPY,h=$n){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dm++}),this.uuid=mn(),this.name="",this.source=new Xu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Iu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case qa:t.x=t.x-Math.floor(t.x);break;case yi:t.x=t.x<0?0:1;break;case Ka:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case qa:t.y=t.y-Math.floor(t.y);break;case yi:t.y=t.y<0?0:1;break;case Ka:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ue.DEFAULT_IMAGE=null;Ue.DEFAULT_MAPPING=Iu;Ue.DEFAULT_ANISOTROPY=1;class Ae{constructor(t=0,e=0,n=0,r=1){Ae.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*r+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],_=l[9],g=l[2],f=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-g)<.01&&Math.abs(_-f)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+g)<.1&&Math.abs(_+f)<.1&&Math.abs(c+p+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,S=(p+1)/2,D=(m+1)/2,P=(h+d)/4,C=(u+g)/4,U=(_+f)/4;return x>S&&x>D?x<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(x),r=P/n,s=C/n):S>D?S<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),n=P/r,s=U/r):D<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(D),n=C/s,r=U/s),this.set(n,r,s,e),this}let T=Math.sqrt((f-_)*(f-_)+(u-g)*(u-g)+(d-h)*(d-h));return Math.abs(T)<.001&&(T=1),this.x=(f-_)/T,this.y=(u-g)/T,this.z=(d-h)/T,this.w=Math.acos((c+p+m-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pm extends Ii{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ae(0,0,t,e),this.scissorTest=!1,this.viewport=new Ae(0,0,t,e);const r={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const s=new Ue(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,r=t.textures.length;n<r;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Xu(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ti extends pm{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class $u extends Ue{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=en,this.minFilter=en,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fm extends Ue{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=en,this.minFilter=en,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ai{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,o,a){let l=n[r+0],c=n[r+1],h=n[r+2],u=n[r+3];const d=s[o+0],p=s[o+1],_=s[o+2],g=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=_,t[e+3]=g;return}if(u!==g||l!==d||c!==p||h!==_){let f=1-a;const m=l*d+c*p+h*_+u*g,T=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const D=Math.sqrt(x),P=Math.atan2(D,m*T);f=Math.sin(f*P)/D,a=Math.sin(a*P)/D}const S=a*T;if(l=l*f+d*S,c=c*f+p*S,h=h*f+_*S,u=u*f+g*S,f===1-a){const D=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=D,c*=D,h*=D,u*=D}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],h=n[r+3],u=s[o],d=s[o+1],p=s[o+2],_=s[o+3];return t[e]=a*_+h*u+l*p-c*d,t[e+1]=l*_+h*d+c*u-a*p,t[e+2]=c*_+h*p+a*d-l*u,t[e+3]=h*_-a*u-l*d-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(r/2),u=a(s/2),d=l(n/2),p=l(r/2),_=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*p*_,this._y=c*p*u-d*h*_,this._z=c*h*_+d*p*u,this._w=c*h*u-d*p*_;break;case"YXZ":this._x=d*h*u+c*p*_,this._y=c*p*u-d*h*_,this._z=c*h*_-d*p*u,this._w=c*h*u+d*p*_;break;case"ZXY":this._x=d*h*u-c*p*_,this._y=c*p*u+d*h*_,this._z=c*h*_+d*p*u,this._w=c*h*u-d*p*_;break;case"ZYX":this._x=d*h*u-c*p*_,this._y=c*p*u+d*h*_,this._z=c*h*_-d*p*u,this._w=c*h*u+d*p*_;break;case"YZX":this._x=d*h*u+c*p*_,this._y=c*p*u+d*h*_,this._z=c*h*_-d*p*u,this._w=c*h*u-d*p*_;break;case"XZY":this._x=d*h*u-c*p*_,this._y=c*p*u-d*h*_,this._z=c*h*_+d*p*u,this._w=c*h*u+d*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(n>a&&n>u){const p=2*Math.sqrt(1+n-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>u){const p=2*Math.sqrt(1+a-n-u);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-n-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ee(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-r*a,this._w=o*h-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*r+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=r*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(t=0,e=0,n=0){A.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ic.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ic.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*n),h=2*(a*e-s*r),u=2*(s*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-s*u,this.z=r+l*u+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ra.copy(this).projectOnVector(t),this.sub(ra)}reflect(t){return this.sub(ra.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ra=new A,Ic=new Ai;class vs{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(rn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(rn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=rn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,rn):rn.fromBufferAttribute(s,o),rn.applyMatrix4(t.matrixWorld),this.expandByPoint(rn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Is.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Is.copy(n.boundingBox)),Is.applyMatrix4(t.matrixWorld),this.union(Is)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,rn),rn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Lr),Ns.subVectors(this.max,Lr),Hi.subVectors(t.a,Lr),Gi.subVectors(t.b,Lr),Wi.subVectors(t.c,Lr),On.subVectors(Gi,Hi),Fn.subVectors(Wi,Gi),ci.subVectors(Hi,Wi);let e=[0,-On.z,On.y,0,-Fn.z,Fn.y,0,-ci.z,ci.y,On.z,0,-On.x,Fn.z,0,-Fn.x,ci.z,0,-ci.x,-On.y,On.x,0,-Fn.y,Fn.x,0,-ci.y,ci.x,0];return!sa(e,Hi,Gi,Wi,Ns)||(e=[1,0,0,0,1,0,0,0,1],!sa(e,Hi,Gi,Wi,Ns))?!1:(Us.crossVectors(On,Fn),e=[Us.x,Us.y,Us.z],sa(e,Hi,Gi,Wi,Ns))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,rn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(rn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(bn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const bn=[new A,new A,new A,new A,new A,new A,new A,new A],rn=new A,Is=new vs,Hi=new A,Gi=new A,Wi=new A,On=new A,Fn=new A,ci=new A,Lr=new A,Ns=new A,Us=new A,hi=new A;function sa(i,t,e,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){hi.fromArray(i,s);const a=r.x*Math.abs(hi.x)+r.y*Math.abs(hi.y)+r.z*Math.abs(hi.z),l=t.dot(hi),c=e.dot(hi),h=n.dot(hi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const mm=new vs,Dr=new A,oa=new A;class _s{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):mm.setFromPoints(t).getCenter(n);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Dr.subVectors(t,this.center);const e=Dr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(Dr,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(oa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Dr.copy(t.center).add(oa)),this.expandByPoint(Dr.copy(t.center).sub(oa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const yn=new A,aa=new A,Os=new A,Bn=new A,la=new A,Fs=new A,ca=new A;class Oo{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,yn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=yn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(yn.copy(this.origin).addScaledVector(this.direction,e),yn.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){aa.copy(t).add(e).multiplyScalar(.5),Os.copy(e).sub(t).normalize(),Bn.copy(this.origin).sub(aa);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Os),a=Bn.dot(this.direction),l=-Bn.dot(Os),c=Bn.lengthSq(),h=Math.abs(1-o*o);let u,d,p,_;if(h>0)if(u=o*l-a,d=o*a-l,_=s*h,u>=0)if(d>=-_)if(d<=_){const g=1/h;u*=g,d*=g,p=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d<=-_?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c):d<=_?(u=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(aa).addScaledVector(Os,d),p}intersectSphere(t,e){yn.subVectors(t.center,this.origin);const n=yn.dot(this.direction),r=yn.dot(yn)-n*n,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,r=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,r=(t.min.x-d.x)*c),h>=0?(s=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,yn)!==null}intersectTriangle(t,e,n,r,s){la.subVectors(e,t),Fs.subVectors(n,t),ca.crossVectors(la,Fs);let o=this.direction.dot(ca),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Bn.subVectors(this.origin,t);const l=a*this.direction.dot(Fs.crossVectors(Bn,Fs));if(l<0)return null;const c=a*this.direction.dot(la.cross(Bn));if(c<0||l+c>o)return null;const h=-a*Bn.dot(ca);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class re{constructor(t,e,n,r,s,o,a,l,c,h,u,d,p,_,g,f){re.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,l,c,h,u,d,p,_,g,f)}set(t,e,n,r,s,o,a,l,c,h,u,d,p,_,g,f){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=r,m[1]=s,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=p,m[7]=_,m[11]=g,m[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new re().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/Xi.setFromMatrixColumn(t,0).length(),s=1/Xi.setFromMatrixColumn(t,1).length(),o=1/Xi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=o*h,p=o*u,_=a*h,g=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+_*c,e[5]=d-g*c,e[9]=-a*l,e[2]=g-d*c,e[6]=_+p*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,p=l*u,_=c*h,g=c*u;e[0]=d+g*a,e[4]=_*a-p,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-_,e[6]=g+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,p=l*u,_=c*h,g=c*u;e[0]=d-g*a,e[4]=-o*u,e[8]=_+p*a,e[1]=p+_*a,e[5]=o*h,e[9]=g-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,p=o*u,_=a*h,g=a*u;e[0]=l*h,e[4]=_*c-p,e[8]=d*c+g,e[1]=l*u,e[5]=g*c+d,e[9]=p*c-_,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,p=o*c,_=a*l,g=a*c;e[0]=l*h,e[4]=g-d*u,e[8]=_*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*u+_,e[10]=d-g*u}else if(t.order==="XZY"){const d=o*l,p=o*c,_=a*l,g=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+g,e[5]=o*h,e[9]=p*u-_,e[2]=_*u-p,e[6]=a*h,e[10]=g*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(vm,t,_m)}lookAt(t,e,n){const r=this.elements;return We.subVectors(t,e),We.lengthSq()===0&&(We.z=1),We.normalize(),kn.crossVectors(n,We),kn.lengthSq()===0&&(Math.abs(n.z)===1?We.x+=1e-4:We.z+=1e-4,We.normalize(),kn.crossVectors(n,We)),kn.normalize(),Bs.crossVectors(We,kn),r[0]=kn.x,r[4]=Bs.x,r[8]=We.x,r[1]=kn.y,r[5]=Bs.y,r[9]=We.y,r[2]=kn.z,r[6]=Bs.z,r[10]=We.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],_=n[2],g=n[6],f=n[10],m=n[14],T=n[3],x=n[7],S=n[11],D=n[15],P=r[0],C=r[4],U=r[8],M=r[12],y=r[1],I=r[5],z=r[9],R=r[13],H=r[2],$=r[6],q=r[10],rt=r[14],G=r[3],Q=r[7],J=r[11],pt=r[15];return s[0]=o*P+a*y+l*H+c*G,s[4]=o*C+a*I+l*$+c*Q,s[8]=o*U+a*z+l*q+c*J,s[12]=o*M+a*R+l*rt+c*pt,s[1]=h*P+u*y+d*H+p*G,s[5]=h*C+u*I+d*$+p*Q,s[9]=h*U+u*z+d*q+p*J,s[13]=h*M+u*R+d*rt+p*pt,s[2]=_*P+g*y+f*H+m*G,s[6]=_*C+g*I+f*$+m*Q,s[10]=_*U+g*z+f*q+m*J,s[14]=_*M+g*R+f*rt+m*pt,s[3]=T*P+x*y+S*H+D*G,s[7]=T*C+x*I+S*$+D*Q,s[11]=T*U+x*z+S*q+D*J,s[15]=T*M+x*R+S*rt+D*pt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],p=t[14],_=t[3],g=t[7],f=t[11],m=t[15];return _*(+s*l*u-r*c*u-s*a*d+n*c*d+r*a*p-n*l*p)+g*(+e*l*p-e*c*d+s*o*d-r*o*p+r*c*h-s*l*h)+f*(+e*c*u-e*a*p-s*o*u+n*o*p+s*a*h-n*c*h)+m*(-r*a*h-e*l*u+e*a*d+r*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],_=t[12],g=t[13],f=t[14],m=t[15],T=u*f*c-g*d*c+g*l*p-a*f*p-u*l*m+a*d*m,x=_*d*c-h*f*c-_*l*p+o*f*p+h*l*m-o*d*m,S=h*g*c-_*u*c+_*a*p-o*g*p-h*a*m+o*u*m,D=_*u*l-h*g*l-_*a*d+o*g*d+h*a*f-o*u*f,P=e*T+n*x+r*S+s*D;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/P;return t[0]=T*C,t[1]=(g*d*s-u*f*s-g*r*p+n*f*p+u*r*m-n*d*m)*C,t[2]=(a*f*s-g*l*s+g*r*c-n*f*c-a*r*m+n*l*m)*C,t[3]=(u*l*s-a*d*s-u*r*c+n*d*c+a*r*p-n*l*p)*C,t[4]=x*C,t[5]=(h*f*s-_*d*s+_*r*p-e*f*p-h*r*m+e*d*m)*C,t[6]=(_*l*s-o*f*s-_*r*c+e*f*c+o*r*m-e*l*m)*C,t[7]=(o*d*s-h*l*s+h*r*c-e*d*c-o*r*p+e*l*p)*C,t[8]=S*C,t[9]=(_*u*s-h*g*s-_*n*p+e*g*p+h*n*m-e*u*m)*C,t[10]=(o*g*s-_*a*s+_*n*c-e*g*c-o*n*m+e*a*m)*C,t[11]=(h*a*s-o*u*s-h*n*c+e*u*c+o*n*p-e*a*p)*C,t[12]=D*C,t[13]=(h*g*r-_*u*r+_*n*d-e*g*d-h*n*f+e*u*f)*C,t[14]=(_*a*r-o*g*r-_*n*l+e*g*l+o*n*f-e*a*f)*C,t[15]=(o*u*r-h*a*r+h*n*l-e*u*l-o*n*d+e*a*d)*C,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+n,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,o){return this.set(1,n,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,d=s*c,p=s*h,_=s*u,g=o*h,f=o*u,m=a*u,T=l*c,x=l*h,S=l*u,D=n.x,P=n.y,C=n.z;return r[0]=(1-(g+m))*D,r[1]=(p+S)*D,r[2]=(_-x)*D,r[3]=0,r[4]=(p-S)*P,r[5]=(1-(d+m))*P,r[6]=(f+T)*P,r[7]=0,r[8]=(_+x)*C,r[9]=(f-T)*C,r[10]=(1-(d+g))*C,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=Xi.set(r[0],r[1],r[2]).length();const o=Xi.set(r[4],r[5],r[6]).length(),a=Xi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],sn.copy(this);const c=1/s,h=1/o,u=1/a;return sn.elements[0]*=c,sn.elements[1]*=c,sn.elements[2]*=c,sn.elements[4]*=h,sn.elements[5]*=h,sn.elements[6]*=h,sn.elements[8]*=u,sn.elements[9]*=u,sn.elements[10]*=u,e.setFromRotationMatrix(sn),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,r,s,o,a=An){const l=this.elements,c=2*s/(e-t),h=2*s/(n-r),u=(e+t)/(e-t),d=(n+r)/(n-r);let p,_;if(a===An)p=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===So)p=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,o,a=An){const l=this.elements,c=1/(e-t),h=1/(n-r),u=1/(o-s),d=(e+t)*c,p=(n+r)*h;let _,g;if(a===An)_=(o+s)*u,g=-2*u;else if(a===So)_=s*u,g=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Xi=new A,sn=new re,vm=new A(0,0,0),_m=new A(1,1,1),kn=new A,Bs=new A,We=new A,Nc=new re,Uc=new Ai;class Rn{constructor(t=0,e=0,n=0,r=Rn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],u=r[2],d=r[6],p=r[10];switch(e){case"XYZ":this._y=Math.asin(Ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ee(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ee(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ee(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Nc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Nc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Uc.setFromEuler(this),this.setFromQuaternion(Uc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Rn.DEFAULT_ORDER="XYZ";class Yu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let gm=0;const Oc=new A,$i=new Ai,wn=new re,ks=new A,Ir=new A,xm=new A,bm=new Ai,Fc=new A(1,0,0),Bc=new A(0,1,0),kc=new A(0,0,1),Vc={type:"added"},ym={type:"removed"},Yi={type:"childadded",child:null},ha={type:"childremoved",child:null};class Te extends Ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=mn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Te.DEFAULT_UP.clone();const t=new A,e=new Rn,n=new Ai,r=new A(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new re},normalMatrix:{value:new Et}}),this.matrix=new re,this.matrixWorld=new re,this.matrixAutoUpdate=Te.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.multiply($i),this}rotateOnWorldAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.premultiply($i),this}rotateX(t){return this.rotateOnAxis(Fc,t)}rotateY(t){return this.rotateOnAxis(Bc,t)}rotateZ(t){return this.rotateOnAxis(kc,t)}translateOnAxis(t,e){return Oc.copy(t).applyQuaternion(this.quaternion),this.position.add(Oc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Fc,t)}translateY(t){return this.translateOnAxis(Bc,t)}translateZ(t){return this.translateOnAxis(kc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(wn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ks.copy(t):ks.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wn.lookAt(Ir,ks,this.up):wn.lookAt(ks,Ir,this.up),this.quaternion.setFromRotationMatrix(wn),r&&(wn.extractRotation(r.matrixWorld),$i.setFromRotationMatrix(wn),this.quaternion.premultiply($i.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Vc),Yi.child=t,this.dispatchEvent(Yi),Yi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ym),ha.child=t,this.dispatchEvent(ha),ha.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),wn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),wn.multiply(t.parent.matrixWorld)),t.applyMatrix4(wn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Vc),Yi.child=t,this.dispatchEvent(Yi),Yi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,t,xm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,bm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++){const s=e[n];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),p=o(t.animations),_=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=r,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}Te.DEFAULT_UP=new A(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const on=new A,Mn=new A,ua=new A,Sn=new A,qi=new A,Ki=new A,zc=new A,da=new A,pa=new A,fa=new A;class cn{constructor(t=new A,e=new A,n=new A){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),on.subVectors(t,e),r.cross(on);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){on.subVectors(r,e),Mn.subVectors(n,e),ua.subVectors(t,e);const o=on.dot(on),a=on.dot(Mn),l=on.dot(ua),c=Mn.dot(Mn),h=Mn.dot(ua),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,p=(c*l-a*h)*d,_=(o*h-a*l)*d;return s.set(1-p-_,_,p)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,Sn)===null?!1:Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getInterpolation(t,e,n,r,s,o,a,l){return this.getBarycoord(t,e,n,r,Sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Sn.x),l.addScaledVector(o,Sn.y),l.addScaledVector(a,Sn.z),l)}static isFrontFacing(t,e,n,r){return on.subVectors(n,e),Mn.subVectors(t,e),on.cross(Mn).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return on.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),on.cross(Mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return cn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return cn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return cn.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return cn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return cn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let o,a;qi.subVectors(r,n),Ki.subVectors(s,n),da.subVectors(t,n);const l=qi.dot(da),c=Ki.dot(da);if(l<=0&&c<=0)return e.copy(n);pa.subVectors(t,r);const h=qi.dot(pa),u=Ki.dot(pa);if(h>=0&&u<=h)return e.copy(r);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(qi,o);fa.subVectors(t,s);const p=qi.dot(fa),_=Ki.dot(fa);if(_>=0&&p<=_)return e.copy(s);const g=p*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),e.copy(n).addScaledVector(Ki,a);const f=h*_-p*u;if(f<=0&&u-h>=0&&p-_>=0)return zc.subVectors(s,r),a=(u-h)/(u-h+(p-_)),e.copy(r).addScaledVector(zc,a);const m=1/(f+g+d);return o=g*m,a=d*m,e.copy(n).addScaledVector(qi,o).addScaledVector(Ki,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const qu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vn={h:0,s:0,l:0},Vs={h:0,s:0,l:0};function ma(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Ht{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=un){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Jt.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=Jt.workingColorSpace){if(t=dl(t,1),e=Ee(e,0,1),n=Ee(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=ma(o,s,t+1/3),this.g=ma(o,s,t),this.b=ma(o,s,t-1/3)}return Jt.toWorkingColorSpace(this,r),this}setStyle(t,e=un){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=un){const n=qu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=pr(t.r),this.g=pr(t.g),this.b=pr(t.b),this}copyLinearToSRGB(t){return this.r=na(t.r),this.g=na(t.g),this.b=na(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=un){return Jt.fromWorkingColorSpace(Re.copy(this),t),Math.round(Ee(Re.r*255,0,255))*65536+Math.round(Ee(Re.g*255,0,255))*256+Math.round(Ee(Re.b*255,0,255))}getHexString(t=un){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.fromWorkingColorSpace(Re.copy(this),e);const n=Re.r,r=Re.g,s=Re.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-n)/u+2;break;case s:l=(n-r)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.fromWorkingColorSpace(Re.copy(this),e),t.r=Re.r,t.g=Re.g,t.b=Re.b,t}getStyle(t=un){Jt.fromWorkingColorSpace(Re.copy(this),t);const e=Re.r,n=Re.g,r=Re.b;return t!==un?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(Vn),this.setHSL(Vn.h+t,Vn.s+e,Vn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Vn),t.getHSL(Vs);const n=$r(Vn.h,Vs.h,e),r=$r(Vn.s,Vs.s,e),s=$r(Vn.l,Vs.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Re=new Ht;Ht.NAMES=qu;let wm=0;class Ni extends Ii{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wm++}),this.uuid=mn(),this.name="",this.type="Material",this.blending=ur,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wa,this.blendDst=Xa,this.blendEquation=gi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=xo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ac,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vi,this.stencilZFail=Vi,this.stencilZPass=Vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ur&&(n.blending=this.blending),this.side!==ni&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Wa&&(n.blendSrc=this.blendSrc),this.blendDst!==Xa&&(n.blendDst=this.blendDst),this.blendEquation!==gi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==xo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ac&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class ti extends Ni{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Rn,this.combine=Du,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ve=new A,zs=new it;class hn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ja,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Kn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Wu("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)zs.fromBufferAttribute(this,e),zs.applyMatrix3(t),this.setXY(e,zs.x,zs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=jt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ln(e,this.array)),e}setX(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ln(e,this.array)),e}setY(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ln(e,this.array)),e}setZ(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ln(e,this.array)),e}setW(t,e){return this.normalized&&(e=jt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array),r=jt(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array),r=jt(r,this.array),s=jt(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ja&&(t.usage=this.usage),t}}class Ku extends hn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ju extends hn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ue extends hn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Mm=0;const Ze=new re,va=new Te,ji=new A,Xe=new vs,Nr=new vs,Se=new A;class pe extends Ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Mm++}),this.uuid=mn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Gu(t)?ju:Ku)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Et().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ze.makeRotationFromQuaternion(t),this.applyMatrix4(Ze),this}rotateX(t){return Ze.makeRotationX(t),this.applyMatrix4(Ze),this}rotateY(t){return Ze.makeRotationY(t),this.applyMatrix4(Ze),this}rotateZ(t){return Ze.makeRotationZ(t),this.applyMatrix4(Ze),this}translate(t,e,n){return Ze.makeTranslation(t,e,n),this.applyMatrix4(Ze),this}scale(t,e,n){return Ze.makeScale(t,e,n),this.applyMatrix4(Ze),this}lookAt(t){return va.lookAt(t),va.updateMatrix(),this.applyMatrix4(va.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ji).negate(),this.translate(ji.x,ji.y,ji.z),this}setFromPoints(t){const e=[];for(let n=0,r=t.length;n<r;n++){const s=t[n];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new ue(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];Xe.setFromBufferAttribute(s),this.morphTargetsRelative?(Se.addVectors(this.boundingBox.min,Xe.min),this.boundingBox.expandByPoint(Se),Se.addVectors(this.boundingBox.max,Xe.max),this.boundingBox.expandByPoint(Se)):(this.boundingBox.expandByPoint(Xe.min),this.boundingBox.expandByPoint(Xe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _s);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){const n=this.boundingSphere.center;if(Xe.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Nr.setFromBufferAttribute(a),this.morphTargetsRelative?(Se.addVectors(Xe.min,Nr.min),Xe.expandByPoint(Se),Se.addVectors(Xe.max,Nr.max),Xe.expandByPoint(Se)):(Xe.expandByPoint(Nr.min),Xe.expandByPoint(Nr.max))}Xe.getCenter(n);let r=0;for(let s=0,o=t.count;s<o;s++)Se.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(Se));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Se.fromBufferAttribute(a,c),l&&(ji.fromBufferAttribute(t,c),Se.add(ji)),r=Math.max(r,n.distanceToSquared(Se))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let U=0;U<n.count;U++)a[U]=new A,l[U]=new A;const c=new A,h=new A,u=new A,d=new it,p=new it,_=new it,g=new A,f=new A;function m(U,M,y){c.fromBufferAttribute(n,U),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,y),d.fromBufferAttribute(s,U),p.fromBufferAttribute(s,M),_.fromBufferAttribute(s,y),h.sub(c),u.sub(c),p.sub(d),_.sub(d);const I=1/(p.x*_.y-_.x*p.y);isFinite(I)&&(g.copy(h).multiplyScalar(_.y).addScaledVector(u,-p.y).multiplyScalar(I),f.copy(u).multiplyScalar(p.x).addScaledVector(h,-_.x).multiplyScalar(I),a[U].add(g),a[M].add(g),a[y].add(g),l[U].add(f),l[M].add(f),l[y].add(f))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let U=0,M=T.length;U<M;++U){const y=T[U],I=y.start,z=y.count;for(let R=I,H=I+z;R<H;R+=3)m(t.getX(R+0),t.getX(R+1),t.getX(R+2))}const x=new A,S=new A,D=new A,P=new A;function C(U){D.fromBufferAttribute(r,U),P.copy(D);const M=a[U];x.copy(M),x.sub(D.multiplyScalar(D.dot(M))).normalize(),S.crossVectors(P,M);const I=S.dot(l[U])<0?-1:1;o.setXYZW(U,x.x,x.y,x.z,I)}for(let U=0,M=T.length;U<M;++U){const y=T[U],I=y.start,z=y.count;for(let R=I,H=I+z;R<H;R+=3)C(t.getX(R+0)),C(t.getX(R+1)),C(t.getX(R+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new hn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const r=new A,s=new A,o=new A,a=new A,l=new A,c=new A,h=new A,u=new A;if(t)for(let d=0,p=t.count;d<p;d+=3){const _=t.getX(d+0),g=t.getX(d+1),f=t.getX(d+2);r.fromBufferAttribute(e,_),s.fromBufferAttribute(e,g),o.fromBufferAttribute(e,f),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,f),a.add(h),l.add(h),c.add(h),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let d=0,p=e.count;d<p;d+=3)r.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Se.fromBufferAttribute(t,e),Se.normalize(),t.setXYZ(e,Se.x,Se.y,Se.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let p=0,_=0;for(let g=0,f=l.length;g<f;g++){a.isInterleavedBufferAttribute?p=l[g]*a.data.stride+a.offset:p=l[g]*h;for(let m=0;m<h;m++)d[_++]=c[p++]}return new hn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new pe,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],p=t(d,n);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(r[l]=h,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const r=t.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Hc=new re,ui=new Oo,Hs=new _s,Gc=new A,Zi=new A,Ji=new A,Qi=new A,_a=new A,Gs=new A,Ws=new it,Xs=new it,$s=new it,Wc=new A,Xc=new A,$c=new A,Ys=new A,qs=new A;class Ie extends Te{constructor(t=new pe,e=new ti){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){Gs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(_a.fromBufferAttribute(u,t),o?Gs.addScaledVector(_a,h):Gs.addScaledVector(_a.sub(e),h))}e.add(Gs)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Hs.copy(n.boundingSphere),Hs.applyMatrix4(s),ui.copy(t.ray).recast(t.near),!(Hs.containsPoint(ui.origin)===!1&&(ui.intersectSphere(Hs,Gc)===null||ui.origin.distanceToSquared(Gc)>(t.far-t.near)**2))&&(Hc.copy(s).invert(),ui.copy(t.ray).applyMatrix4(Hc),!(n.boundingBox!==null&&ui.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ui)))}_computeIntersections(t,e,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=d.length;_<g;_++){const f=d[_],m=o[f.materialIndex],T=Math.max(f.start,p.start),x=Math.min(a.count,Math.min(f.start+f.count,p.start+p.count));for(let S=T,D=x;S<D;S+=3){const P=a.getX(S),C=a.getX(S+1),U=a.getX(S+2);r=Ks(this,m,t,n,c,h,u,P,C,U),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=f.materialIndex,e.push(r))}}else{const _=Math.max(0,p.start),g=Math.min(a.count,p.start+p.count);for(let f=_,m=g;f<m;f+=3){const T=a.getX(f),x=a.getX(f+1),S=a.getX(f+2);r=Ks(this,o,t,n,c,h,u,T,x,S),r&&(r.faceIndex=Math.floor(f/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=d.length;_<g;_++){const f=d[_],m=o[f.materialIndex],T=Math.max(f.start,p.start),x=Math.min(l.count,Math.min(f.start+f.count,p.start+p.count));for(let S=T,D=x;S<D;S+=3){const P=S,C=S+1,U=S+2;r=Ks(this,m,t,n,c,h,u,P,C,U),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=f.materialIndex,e.push(r))}}else{const _=Math.max(0,p.start),g=Math.min(l.count,p.start+p.count);for(let f=_,m=g;f<m;f+=3){const T=f,x=f+1,S=f+2;r=Ks(this,o,t,n,c,h,u,T,x,S),r&&(r.faceIndex=Math.floor(f/3),e.push(r))}}}}function Sm(i,t,e,n,r,s,o,a){let l;if(t.side===Ve?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,t.side===ni,a),l===null)return null;qs.copy(a),qs.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(qs);return c<e.near||c>e.far?null:{distance:c,point:qs.clone(),object:i}}function Ks(i,t,e,n,r,s,o,a,l,c){i.getVertexPosition(a,Zi),i.getVertexPosition(l,Ji),i.getVertexPosition(c,Qi);const h=Sm(i,t,e,n,Zi,Ji,Qi,Ys);if(h){r&&(Ws.fromBufferAttribute(r,a),Xs.fromBufferAttribute(r,l),$s.fromBufferAttribute(r,c),h.uv=cn.getInterpolation(Ys,Zi,Ji,Qi,Ws,Xs,$s,new it)),s&&(Ws.fromBufferAttribute(s,a),Xs.fromBufferAttribute(s,l),$s.fromBufferAttribute(s,c),h.uv1=cn.getInterpolation(Ys,Zi,Ji,Qi,Ws,Xs,$s,new it)),o&&(Wc.fromBufferAttribute(o,a),Xc.fromBufferAttribute(o,l),$c.fromBufferAttribute(o,c),h.normal=cn.getInterpolation(Ys,Zi,Ji,Qi,Wc,Xc,$c,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new A,materialIndex:0};cn.getNormal(Zi,Ji,Qi,u.normal),h.face=u}return h}class Sr extends pe{constructor(t=1,e=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,p=0;_("z","y","x",-1,-1,n,e,t,o,s,0),_("z","y","x",1,-1,n,e,-t,o,s,1),_("x","z","y",1,1,t,n,e,r,o,2),_("x","z","y",1,-1,t,n,-e,r,o,3),_("x","y","z",1,-1,t,e,n,r,s,4),_("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new ue(c,3)),this.setAttribute("normal",new ue(h,3)),this.setAttribute("uv",new ue(u,2));function _(g,f,m,T,x,S,D,P,C,U,M){const y=S/C,I=D/U,z=S/2,R=D/2,H=P/2,$=C+1,q=U+1;let rt=0,G=0;const Q=new A;for(let J=0;J<q;J++){const pt=J*I-R;for(let Ut=0;Ut<$;Ut++){const Kt=Ut*y-z;Q[g]=Kt*T,Q[f]=pt*x,Q[m]=H,c.push(Q.x,Q.y,Q.z),Q[g]=0,Q[f]=0,Q[m]=P>0?1:-1,h.push(Q.x,Q.y,Q.z),u.push(Ut/C),u.push(1-J/U),rt+=1}}for(let J=0;J<U;J++)for(let pt=0;pt<C;pt++){const Ut=d+pt+$*J,Kt=d+pt+$*(J+1),W=d+(pt+1)+$*(J+1),tt=d+(pt+1)+$*J;l.push(Ut,Kt,tt),l.push(Kt,W,tt),G+=6}a.addGroup(p,G,M),p+=G,d+=rt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Sr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function yr(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function De(i){const t={};for(let e=0;e<i.length;e++){const n=yr(i[e]);for(const r in n)t[r]=n[r]}return t}function Em(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Zu(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const Tm={clone:yr,merge:De};var Am=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ii extends Ni{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Am,this.fragmentShader=Cm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=yr(t.uniforms),this.uniformsGroups=Em(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Ju extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new re,this.projectionMatrix=new re,this.projectionMatrixInverse=new re,this.coordinateSystem=An}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const zn=new A,Yc=new it,qc=new it;class tn extends Ju{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=es*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Xr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return es*2*Math.atan(Math.tan(Xr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(zn.x,zn.y).multiplyScalar(-t/zn.z),zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(zn.x,zn.y).multiplyScalar(-t/zn.z)}getViewSize(t,e){return this.getViewBounds(t,Yc,qc),e.subVectors(qc,Yc)}setViewOffset(t,e,n,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Xr*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const tr=-90,er=1;class Pm extends Te{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new tn(tr,er,t,e);r.layers=this.layers,this.add(r);const s=new tn(tr,er,t,e);s.layers=this.layers,this.add(s);const o=new tn(tr,er,t,e);o.layers=this.layers,this.add(o);const a=new tn(tr,er,t,e);a.layers=this.layers,this.add(a);const l=new tn(tr,er,t,e);l.layers=this.layers,this.add(l);const c=new tn(tr,er,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===An)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===So)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,o),t.setRenderTarget(n,2,r),t.render(e,a),t.setRenderTarget(n,3,r),t.render(e,l),t.setRenderTarget(n,4,r),t.render(e,c),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,r),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Qu extends Ue{constructor(t,e,n,r,s,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:gr,super(t,e,n,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Rm extends Ti{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new Qu(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:an}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Sr(5,5,5),s=new ii({name:"CubemapFromEquirect",uniforms:yr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ve,blending:Zn});s.uniforms.tEquirect.value=e;const o=new Ie(r,s),a=e.minFilter;return e.minFilter===wi&&(e.minFilter=an),new Pm(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,r){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,r);t.setRenderTarget(s)}}const ga=new A,Lm=new A,Dm=new Et;class Xn{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=ga.subVectors(n,e).cross(Lm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ga),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Dm.getNormalMatrix(t),r=this.coplanarPoint(ga).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const di=new _s,js=new A;class td{constructor(t=new Xn,e=new Xn,n=new Xn,r=new Xn,s=new Xn,o=new Xn){this.planes=[t,e,n,r,s,o]}set(t,e,n,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=An){const n=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],h=r[5],u=r[6],d=r[7],p=r[8],_=r[9],g=r[10],f=r[11],m=r[12],T=r[13],x=r[14],S=r[15];if(n[0].setComponents(l-s,d-c,f-p,S-m).normalize(),n[1].setComponents(l+s,d+c,f+p,S+m).normalize(),n[2].setComponents(l+o,d+h,f+_,S+T).normalize(),n[3].setComponents(l-o,d-h,f-_,S-T).normalize(),n[4].setComponents(l-a,d-u,f-g,S-x).normalize(),e===An)n[5].setComponents(l+a,d+u,f+g,S+x).normalize();else if(e===So)n[5].setComponents(a,u,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),di.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),di.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(di)}intersectsSprite(t){return di.center.set(0,0,0),di.radius=.7071067811865476,di.applyMatrix4(t.matrixWorld),this.intersectsSphere(di)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(js.x=r.normal.x>0?t.max.x:t.min.x,js.y=r.normal.y>0?t.max.y:t.min.y,js.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(js)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ed(){let i=null,t=!1,e=null,n=null;function r(s,o){e(s,o),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function Im(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l._updateRange,d=l.updateRanges;if(i.bindBuffer(c,a),u.count===-1&&d.length===0&&i.bufferSubData(c,0,h),d.length!==0){for(let p=0,_=d.length;p<_;p++){const g=d[p];i.bufferSubData(c,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}u.count!==-1&&(i.bufferSubData(c,u.offset*h.BYTES_PER_ELEMENT,h,u.offset,u.count),u.count=-1),l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class Fo extends pe{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(r),c=a+1,h=l+1,u=t/a,d=e/l,p=[],_=[],g=[],f=[];for(let m=0;m<h;m++){const T=m*d-o;for(let x=0;x<c;x++){const S=x*u-s;_.push(S,-T,0),g.push(0,0,1),f.push(x/a),f.push(1-m/l)}}for(let m=0;m<l;m++)for(let T=0;T<a;T++){const x=T+c*m,S=T+c*(m+1),D=T+1+c*(m+1),P=T+1+c*m;p.push(x,S,P),p.push(S,D,P)}this.setIndex(p),this.setAttribute("position",new ue(_,3)),this.setAttribute("normal",new ue(g,3)),this.setAttribute("uv",new ue(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fo(t.width,t.height,t.widthSegments,t.heightSegments)}}var Nm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Um=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Om=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Fm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,km=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,zm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Hm=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Gm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Wm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$m=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ym=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,qm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Km=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,jm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,tv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ev=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,nv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,iv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,rv=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,sv=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ov=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,av=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hv="gl_FragColor = linearToOutputTexel( gl_FragColor );",uv=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,dv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,pv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,fv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,mv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_v=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,gv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,wv=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Mv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ev=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Av=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Cv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Pv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Lv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Iv=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Nv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Uv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ov=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fv=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bv=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Wv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$v=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Yv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Kv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,jv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Zv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Jv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Qv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,t_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,e_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,n_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,i_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,r_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,s_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,o_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,a_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,l_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,c_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,h_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,u_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,d_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,p_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,f_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,m_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,v_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,__=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,g_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,x_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,b_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,y_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,w_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,M_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,S_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,E_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,T_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,A_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	float startCompression = 0.8 - 0.04;
	float desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min(color.r, min(color.g, color.b));
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max(color.r, max(color.g, color.b));
	if (peak < startCompression) return color;
	float d = 1. - startCompression;
	float newPeak = 1. - d * d / (peak + d - startCompression);
	color *= newPeak / peak;
	float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
	return mix(color, newPeak * vec3(1, 1, 1), g);
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,C_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,P_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,R_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,L_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,D_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,I_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const N_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,U_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,F_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,B_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,k_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,z_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,H_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,G_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,W_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,X_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Y_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,q_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,K_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,j_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Z_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Q_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,eg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ng=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ig=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,sg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,og=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ag=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,cg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ug=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,dg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Dt={alphahash_fragment:Nm,alphahash_pars_fragment:Um,alphamap_fragment:Om,alphamap_pars_fragment:Fm,alphatest_fragment:Bm,alphatest_pars_fragment:km,aomap_fragment:Vm,aomap_pars_fragment:zm,batching_pars_vertex:Hm,batching_vertex:Gm,begin_vertex:Wm,beginnormal_vertex:Xm,bsdfs:$m,iridescence_fragment:Ym,bumpmap_pars_fragment:qm,clipping_planes_fragment:Km,clipping_planes_pars_fragment:jm,clipping_planes_pars_vertex:Zm,clipping_planes_vertex:Jm,color_fragment:Qm,color_pars_fragment:tv,color_pars_vertex:ev,color_vertex:nv,common:iv,cube_uv_reflection_fragment:rv,defaultnormal_vertex:sv,displacementmap_pars_vertex:ov,displacementmap_vertex:av,emissivemap_fragment:lv,emissivemap_pars_fragment:cv,colorspace_fragment:hv,colorspace_pars_fragment:uv,envmap_fragment:dv,envmap_common_pars_fragment:pv,envmap_pars_fragment:fv,envmap_pars_vertex:mv,envmap_physical_pars_fragment:Av,envmap_vertex:vv,fog_vertex:_v,fog_pars_vertex:gv,fog_fragment:xv,fog_pars_fragment:bv,gradientmap_pars_fragment:yv,lightmap_fragment:wv,lightmap_pars_fragment:Mv,lights_lambert_fragment:Sv,lights_lambert_pars_fragment:Ev,lights_pars_begin:Tv,lights_toon_fragment:Cv,lights_toon_pars_fragment:Pv,lights_phong_fragment:Rv,lights_phong_pars_fragment:Lv,lights_physical_fragment:Dv,lights_physical_pars_fragment:Iv,lights_fragment_begin:Nv,lights_fragment_maps:Uv,lights_fragment_end:Ov,logdepthbuf_fragment:Fv,logdepthbuf_pars_fragment:Bv,logdepthbuf_pars_vertex:kv,logdepthbuf_vertex:Vv,map_fragment:zv,map_pars_fragment:Hv,map_particle_fragment:Gv,map_particle_pars_fragment:Wv,metalnessmap_fragment:Xv,metalnessmap_pars_fragment:$v,morphinstance_vertex:Yv,morphcolor_vertex:qv,morphnormal_vertex:Kv,morphtarget_pars_vertex:jv,morphtarget_vertex:Zv,normal_fragment_begin:Jv,normal_fragment_maps:Qv,normal_pars_fragment:t_,normal_pars_vertex:e_,normal_vertex:n_,normalmap_pars_fragment:i_,clearcoat_normal_fragment_begin:r_,clearcoat_normal_fragment_maps:s_,clearcoat_pars_fragment:o_,iridescence_pars_fragment:a_,opaque_fragment:l_,packing:c_,premultiplied_alpha_fragment:h_,project_vertex:u_,dithering_fragment:d_,dithering_pars_fragment:p_,roughnessmap_fragment:f_,roughnessmap_pars_fragment:m_,shadowmap_pars_fragment:v_,shadowmap_pars_vertex:__,shadowmap_vertex:g_,shadowmask_pars_fragment:x_,skinbase_vertex:b_,skinning_pars_vertex:y_,skinning_vertex:w_,skinnormal_vertex:M_,specularmap_fragment:S_,specularmap_pars_fragment:E_,tonemapping_fragment:T_,tonemapping_pars_fragment:A_,transmission_fragment:C_,transmission_pars_fragment:P_,uv_pars_fragment:R_,uv_pars_vertex:L_,uv_vertex:D_,worldpos_vertex:I_,background_vert:N_,background_frag:U_,backgroundCube_vert:O_,backgroundCube_frag:F_,cube_vert:B_,cube_frag:k_,depth_vert:V_,depth_frag:z_,distanceRGBA_vert:H_,distanceRGBA_frag:G_,equirect_vert:W_,equirect_frag:X_,linedashed_vert:$_,linedashed_frag:Y_,meshbasic_vert:q_,meshbasic_frag:K_,meshlambert_vert:j_,meshlambert_frag:Z_,meshmatcap_vert:J_,meshmatcap_frag:Q_,meshnormal_vert:tg,meshnormal_frag:eg,meshphong_vert:ng,meshphong_frag:ig,meshphysical_vert:rg,meshphysical_frag:sg,meshtoon_vert:og,meshtoon_frag:ag,points_vert:lg,points_frag:cg,shadow_vert:hg,shadow_frag:ug,sprite_vert:dg,sprite_frag:pg},st={common:{diffuse:{value:new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Et},alphaMap:{value:null},alphaMapTransform:{value:new Et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Et}},envmap:{envMap:{value:null},envMapRotation:{value:new Et},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Et},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Et},alphaTest:{value:0},uvTransform:{value:new Et}},sprite:{diffuse:{value:new Ht(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Et},alphaMap:{value:null},alphaMapTransform:{value:new Et},alphaTest:{value:0}}},dn={basic:{uniforms:De([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.fog]),vertexShader:Dt.meshbasic_vert,fragmentShader:Dt.meshbasic_frag},lambert:{uniforms:De([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Ht(0)}}]),vertexShader:Dt.meshlambert_vert,fragmentShader:Dt.meshlambert_frag},phong:{uniforms:De([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Ht(0)},specular:{value:new Ht(1118481)},shininess:{value:30}}]),vertexShader:Dt.meshphong_vert,fragmentShader:Dt.meshphong_frag},standard:{uniforms:De([st.common,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.roughnessmap,st.metalnessmap,st.fog,st.lights,{emissive:{value:new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Dt.meshphysical_vert,fragmentShader:Dt.meshphysical_frag},toon:{uniforms:De([st.common,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.gradientmap,st.fog,st.lights,{emissive:{value:new Ht(0)}}]),vertexShader:Dt.meshtoon_vert,fragmentShader:Dt.meshtoon_frag},matcap:{uniforms:De([st.common,st.bumpmap,st.normalmap,st.displacementmap,st.fog,{matcap:{value:null}}]),vertexShader:Dt.meshmatcap_vert,fragmentShader:Dt.meshmatcap_frag},points:{uniforms:De([st.points,st.fog]),vertexShader:Dt.points_vert,fragmentShader:Dt.points_frag},dashed:{uniforms:De([st.common,st.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Dt.linedashed_vert,fragmentShader:Dt.linedashed_frag},depth:{uniforms:De([st.common,st.displacementmap]),vertexShader:Dt.depth_vert,fragmentShader:Dt.depth_frag},normal:{uniforms:De([st.common,st.bumpmap,st.normalmap,st.displacementmap,{opacity:{value:1}}]),vertexShader:Dt.meshnormal_vert,fragmentShader:Dt.meshnormal_frag},sprite:{uniforms:De([st.sprite,st.fog]),vertexShader:Dt.sprite_vert,fragmentShader:Dt.sprite_frag},background:{uniforms:{uvTransform:{value:new Et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Dt.background_vert,fragmentShader:Dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Et}},vertexShader:Dt.backgroundCube_vert,fragmentShader:Dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Dt.cube_vert,fragmentShader:Dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Dt.equirect_vert,fragmentShader:Dt.equirect_frag},distanceRGBA:{uniforms:De([st.common,st.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Dt.distanceRGBA_vert,fragmentShader:Dt.distanceRGBA_frag},shadow:{uniforms:De([st.lights,st.fog,{color:{value:new Ht(0)},opacity:{value:1}}]),vertexShader:Dt.shadow_vert,fragmentShader:Dt.shadow_frag}};dn.physical={uniforms:De([dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Et},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Et},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Et},sheen:{value:0},sheenColor:{value:new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Et},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Et},attenuationDistance:{value:0},attenuationColor:{value:new Ht(0)},specularColor:{value:new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Et},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Et}}]),vertexShader:Dt.meshphysical_vert,fragmentShader:Dt.meshphysical_frag};const Zs={r:0,b:0,g:0},pi=new Rn,fg=new re;function mg(i,t,e,n,r,s,o){const a=new Ht(0);let l=s===!0?0:1,c,h,u=null,d=0,p=null;function _(f,m){let T=!1,x=m.isScene===!0?m.background:null;x&&x.isTexture&&(x=(m.backgroundBlurriness>0?e:t).get(x)),x===null?g(a,l):x&&x.isColor&&(g(x,1),T=!0);const S=i.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,o):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||T)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===No)?(h===void 0&&(h=new Ie(new Sr(1,1,1),new ii({name:"BackgroundCubeMaterial",uniforms:yr(dn.backgroundCube.uniforms),vertexShader:dn.backgroundCube.vertexShader,fragmentShader:dn.backgroundCube.fragmentShader,side:Ve,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(D,P,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),pi.copy(m.backgroundRotation),pi.x*=-1,pi.y*=-1,pi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(pi.y*=-1,pi.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(fg.makeRotationFromEuler(pi)),h.material.toneMapped=Jt.getTransfer(x.colorSpace)!==ee,(u!==x||d!==x.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,p=i.toneMapping),h.layers.enableAll(),f.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Ie(new Fo(2,2),new ii({name:"BackgroundMaterial",uniforms:yr(dn.background.uniforms),vertexShader:dn.background.vertexShader,fragmentShader:dn.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=Jt.getTransfer(x.colorSpace)!==ee,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,p=i.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))}function g(f,m){f.getRGB(Zs,Zu(i)),n.buffers.color.setClear(Zs.r,Zs.g,Zs.b,m,o)}return{getClearColor:function(){return a},setClearColor:function(f,m=1){a.set(f),l=m,g(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(f){l=f,g(a,l)},render:_}}function vg(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null);let s=r,o=!1;function a(y,I,z,R,H){let $=!1;const q=u(R,z,I);s!==q&&(s=q,c(s.object)),$=p(y,R,z,H),$&&_(y,R,z,H),H!==null&&t.update(H,i.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,S(y,I,z,R),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,I,z){const R=z.wireframe===!0;let H=n[y.id];H===void 0&&(H={},n[y.id]=H);let $=H[I.id];$===void 0&&($={},H[I.id]=$);let q=$[R];return q===void 0&&(q=d(l()),$[R]=q),q}function d(y){const I=[],z=[],R=[];for(let H=0;H<e;H++)I[H]=0,z[H]=0,R[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:z,attributeDivisors:R,object:y,attributes:{},index:null}}function p(y,I,z,R){const H=s.attributes,$=I.attributes;let q=0;const rt=z.getAttributes();for(const G in rt)if(rt[G].location>=0){const J=H[G];let pt=$[G];if(pt===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(pt=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(pt=y.instanceColor)),J===void 0||J.attribute!==pt||pt&&J.data!==pt.data)return!0;q++}return s.attributesNum!==q||s.index!==R}function _(y,I,z,R){const H={},$=I.attributes;let q=0;const rt=z.getAttributes();for(const G in rt)if(rt[G].location>=0){let J=$[G];J===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(J=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(J=y.instanceColor));const pt={};pt.attribute=J,J&&J.data&&(pt.data=J.data),H[G]=pt,q++}s.attributes=H,s.attributesNum=q,s.index=R}function g(){const y=s.newAttributes;for(let I=0,z=y.length;I<z;I++)y[I]=0}function f(y){m(y,0)}function m(y,I){const z=s.newAttributes,R=s.enabledAttributes,H=s.attributeDivisors;z[y]=1,R[y]===0&&(i.enableVertexAttribArray(y),R[y]=1),H[y]!==I&&(i.vertexAttribDivisor(y,I),H[y]=I)}function T(){const y=s.newAttributes,I=s.enabledAttributes;for(let z=0,R=I.length;z<R;z++)I[z]!==y[z]&&(i.disableVertexAttribArray(z),I[z]=0)}function x(y,I,z,R,H,$,q){q===!0?i.vertexAttribIPointer(y,I,z,H,$):i.vertexAttribPointer(y,I,z,R,H,$)}function S(y,I,z,R){g();const H=R.attributes,$=z.getAttributes(),q=I.defaultAttributeValues;for(const rt in $){const G=$[rt];if(G.location>=0){let Q=H[rt];if(Q===void 0&&(rt==="instanceMatrix"&&y.instanceMatrix&&(Q=y.instanceMatrix),rt==="instanceColor"&&y.instanceColor&&(Q=y.instanceColor)),Q!==void 0){const J=Q.normalized,pt=Q.itemSize,Ut=t.get(Q);if(Ut===void 0)continue;const Kt=Ut.buffer,W=Ut.type,tt=Ut.bytesPerElement,ht=W===i.INT||W===i.UNSIGNED_INT||Q.gpuType===Uu;if(Q.isInterleavedBufferAttribute){const at=Q.data,Tt=at.stride,Ct=Q.offset;if(at.isInstancedInterleavedBuffer){for(let Ft=0;Ft<G.locationSize;Ft++)m(G.location+Ft,at.meshPerAttribute);y.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let Ft=0;Ft<G.locationSize;Ft++)f(G.location+Ft);i.bindBuffer(i.ARRAY_BUFFER,Kt);for(let Ft=0;Ft<G.locationSize;Ft++)x(G.location+Ft,pt/G.locationSize,W,J,Tt*tt,(Ct+pt/G.locationSize*Ft)*tt,ht)}else{if(Q.isInstancedBufferAttribute){for(let at=0;at<G.locationSize;at++)m(G.location+at,Q.meshPerAttribute);y.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let at=0;at<G.locationSize;at++)f(G.location+at);i.bindBuffer(i.ARRAY_BUFFER,Kt);for(let at=0;at<G.locationSize;at++)x(G.location+at,pt/G.locationSize,W,J,pt*tt,pt/G.locationSize*at*tt,ht)}}else if(q!==void 0){const J=q[rt];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(G.location,J);break;case 3:i.vertexAttrib3fv(G.location,J);break;case 4:i.vertexAttrib4fv(G.location,J);break;default:i.vertexAttrib1fv(G.location,J)}}}}T()}function D(){U();for(const y in n){const I=n[y];for(const z in I){const R=I[z];for(const H in R)h(R[H].object),delete R[H];delete I[z]}delete n[y]}}function P(y){if(n[y.id]===void 0)return;const I=n[y.id];for(const z in I){const R=I[z];for(const H in R)h(R[H].object),delete R[H];delete I[z]}delete n[y.id]}function C(y){for(const I in n){const z=n[I];if(z[y.id]===void 0)continue;const R=z[y.id];for(const H in R)h(R[H].object),delete R[H];delete z[y.id]}}function U(){M(),o=!0,s!==r&&(s=r,c(s.object))}function M(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:U,resetDefaultState:M,dispose:D,releaseStatesOfGeometry:P,releaseStatesOfProgram:C,initAttributes:g,enableAttribute:f,disableUnusedAttributes:T}}function _g(i,t,e){let n;function r(l){n=l}function s(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;const u=t.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<h;d++)this.render(l[d],c[d]);else{u.multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let p=0;p<h;p++)d+=c[p];e.update(d,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function gg(i,t,e){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const x=t.get("EXT_texture_filter_anisotropic");n=i.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(x){if(x==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=e.precision!==void 0?e.precision:"highp";const a=s(o);a!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",a,"instead."),o=a);const l=e.logarithmicDepthBuffer===!0,c=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),h=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),u=i.getParameter(i.MAX_TEXTURE_SIZE),d=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),g=i.getParameter(i.MAX_VARYING_VECTORS),f=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),m=h>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:l,maxTextures:c,maxVertexTextures:h,maxTextureSize:u,maxCubemapSize:d,maxAttributes:p,maxVertexUniforms:_,maxVaryings:g,maxFragmentUniforms:f,vertexTextures:m,maxSamples:T}}function xg(i){const t=this;let e=null,n=0,r=!1,s=!1;const o=new Xn,a=new Et,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||n!==0||r;return r=d,n=u.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){const _=u.clippingPlanes,g=u.clipIntersection,f=u.clipShadows,m=i.get(u);if(!r||_===null||_.length===0||s&&!f)s?h(null):c();else{const T=s?0:n,x=T*4;let S=m.clippingState||null;l.value=S,S=h(_,d,x,p);for(let D=0;D!==x;++D)S[D]=e[D];m.clippingState=S,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,p,_){const g=u!==null?u.length:0;let f=null;if(g!==0){if(f=l.value,_!==!0||f===null){const m=p+g*4,T=d.matrixWorldInverse;a.getNormalMatrix(T),(f===null||f.length<m)&&(f=new Float32Array(m));for(let x=0,S=p;x!==g;++x,S+=4)o.copy(u[x]).applyMatrix4(T,a),o.normal.toArray(f,S),f[S+3]=o.constant}l.value=f,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,f}}function bg(i){let t=new WeakMap;function e(o,a){return a===$a?o.mapping=gr:a===Ya&&(o.mapping=xr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===$a||a===Ya)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Rm(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class yg extends Ju{constructor(t=-1,e=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const cr=4,Kc=[.125,.215,.35,.446,.526,.582],xi=20,xa=new yg,jc=new Ht;let ba=null,ya=0,wa=0,Ma=!1;const _i=(1+Math.sqrt(5))/2,nr=1/_i,Zc=[new A(1,1,1),new A(-1,1,1),new A(1,1,-1),new A(-1,1,-1),new A(0,_i,nr),new A(0,_i,-nr),new A(nr,0,_i),new A(-nr,0,_i),new A(_i,nr,0),new A(-_i,nr,0)];class Jc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){ba=this._renderer.getRenderTarget(),ya=this._renderer.getActiveCubeFace(),wa=this._renderer.getActiveMipmapLevel(),Ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=eh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=th(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ba,ya,wa),this._renderer.xr.enabled=Ma,t.scissorTest=!1,Js(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===gr||t.mapping===xr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ba=this._renderer.getRenderTarget(),ya=this._renderer.getActiveCubeFace(),wa=this._renderer.getActiveMipmapLevel(),Ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:an,minFilter:an,generateMipmaps:!1,type:bo,format:pn,colorSpace:oi,depthBuffer:!1},r=Qc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Qc(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wg(s)),this._blurMaterial=Mg(s,t,e)}return r}_compileMaterial(t){const e=new Ie(this._lodPlanes[0],t);this._renderer.compile(e,xa)}_sceneToCubeUV(t,e,n,r){const a=new tn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(jc),h.toneMapping=Jn,h.autoClear=!1;const p=new ti({name:"PMREM.Background",side:Ve,depthWrite:!1,depthTest:!1}),_=new Ie(new Sr,p);let g=!1;const f=t.background;f?f.isColor&&(p.color.copy(f),t.background=null,g=!0):(p.color.copy(jc),g=!0);for(let m=0;m<6;m++){const T=m%3;T===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):T===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const x=this._cubeSize;Js(r,T*x,m>2?x:0,x,x),h.setRenderTarget(r),g&&h.render(_,a),h.render(t,a)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=f}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===gr||t.mapping===xr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=eh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=th());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Ie(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Js(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,xa)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Zc[(r-1)%Zc.length];this._blur(t,r-1,r,s,o)}e.autoClear=n}_blur(t,e,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,r,"latitudinal",s),this._halfBlur(o,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Ie(this._lodPlanes[r],c),d=c.uniforms,p=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*xi-1),g=s/_,f=isFinite(s)?1+Math.floor(h*g):xi;f>xi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${xi}`);const m=[];let T=0;for(let C=0;C<xi;++C){const U=C/g,M=Math.exp(-U*U/2);m.push(M),C===0?T+=M:C<f&&(T+=2*M)}for(let C=0;C<m.length;C++)m[C]=m[C]/T;d.envMap.value=t.texture,d.samples.value=f,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=_,d.mipInt.value=x-n;const S=this._sizeLods[r],D=3*S*(r>x-cr?r-x+cr:0),P=4*(this._cubeSize-S);Js(e,D,P,3*S,2*S),l.setRenderTarget(e),l.render(u,xa)}}function wg(i){const t=[],e=[],n=[];let r=i;const s=i-cr+1+Kc.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>i-cr?l=Kc[o-i+cr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,_=6,g=3,f=2,m=1,T=new Float32Array(g*_*p),x=new Float32Array(f*_*p),S=new Float32Array(m*_*p);for(let P=0;P<p;P++){const C=P%3*2/3-1,U=P>2?0:-1,M=[C,U,0,C+2/3,U,0,C+2/3,U+1,0,C,U,0,C+2/3,U+1,0,C,U+1,0];T.set(M,g*_*P),x.set(d,f*_*P);const y=[P,P,P,P,P,P];S.set(y,m*_*P)}const D=new pe;D.setAttribute("position",new hn(T,g)),D.setAttribute("uv",new hn(x,f)),D.setAttribute("faceIndex",new hn(S,m)),t.push(D),r>cr&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Qc(i,t,e){const n=new Ti(i,t,e);return n.texture.mapping=No,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Js(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function Mg(i,t,e){const n=new Float32Array(xi),r=new A(0,1,0);return new ii({name:"SphericalGaussianBlur",defines:{n:xi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:pl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function th(){return new ii({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function eh(){return new ii({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function pl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Sg(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===$a||l===Ya,h=l===gr||l===xr;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Jc(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return c&&p&&p.height>0||h&&p&&r(p)?(e===null&&(e=new Jc(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function r(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Eg(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Tg(i,t,e,n){const r={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const _ in d.attributes)t.remove(d.attributes[_]);for(const _ in d.morphAttributes){const g=d.morphAttributes[_];for(let f=0,m=g.length;f<m;f++)t.remove(g[f])}d.removeEventListener("dispose",o),delete r[d.id];const p=s.get(d);p&&(t.remove(p),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const _ in d)t.update(d[_],i.ARRAY_BUFFER);const p=u.morphAttributes;for(const _ in p){const g=p[_];for(let f=0,m=g.length;f<m;f++)t.update(g[f],i.ARRAY_BUFFER)}}function c(u){const d=[],p=u.index,_=u.attributes.position;let g=0;if(p!==null){const T=p.array;g=p.version;for(let x=0,S=T.length;x<S;x+=3){const D=T[x+0],P=T[x+1],C=T[x+2];d.push(D,P,P,C,C,D)}}else if(_!==void 0){const T=_.array;g=_.version;for(let x=0,S=T.length/3-1;x<S;x+=3){const D=x+0,P=x+1,C=x+2;d.push(D,P,P,C,C,D)}}else return;const f=new(Gu(d)?ju:Ku)(d,1);f.version=g;const m=s.get(u);m&&t.remove(m),s.set(u,f)}function h(u){const d=s.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Ag(i,t,e){let n;function r(u){n=u}let s,o;function a(u){s=u.type,o=u.bytesPerElement}function l(u,d){i.drawElements(n,d,s,u*o),e.update(d,n,1)}function c(u,d,p){p!==0&&(i.drawElementsInstanced(n,d,s,u*o,p),e.update(d,n,p))}function h(u,d,p){if(p===0)return;const _=t.get("WEBGL_multi_draw");if(_===null)for(let g=0;g<p;g++)this.render(u[g]/o,d[g]);else{_.multiDrawElementsWEBGL(n,d,0,s,u,0,p);let g=0;for(let f=0;f<p;f++)g+=d[f];e.update(g,n,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Cg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(s/3);break;case i.LINES:e.lines+=a*(s/2);break;case i.LINE_STRIP:e.lines+=a*(s-1);break;case i.LINE_LOOP:e.lines+=a*s;break;case i.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function Pg(i,t,e){const n=new WeakMap,r=new Ae;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let M=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",M)};d!==void 0&&d.texture.dispose();const p=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],T=a.morphAttributes.color||[];let x=0;p===!0&&(x=1),_===!0&&(x=2),g===!0&&(x=3);let S=a.attributes.position.count*x,D=1;S>t.maxTextureSize&&(D=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);const P=new Float32Array(S*D*4*u),C=new $u(P,S,D,u);C.type=Kn,C.needsUpdate=!0;const U=x*4;for(let y=0;y<u;y++){const I=f[y],z=m[y],R=T[y],H=S*D*4*y;for(let $=0;$<I.count;$++){const q=$*U;p===!0&&(r.fromBufferAttribute(I,$),P[H+q+0]=r.x,P[H+q+1]=r.y,P[H+q+2]=r.z,P[H+q+3]=0),_===!0&&(r.fromBufferAttribute(z,$),P[H+q+4]=r.x,P[H+q+5]=r.y,P[H+q+6]=r.z,P[H+q+7]=0),g===!0&&(r.fromBufferAttribute(R,$),P[H+q+8]=r.x,P[H+q+9]=r.y,P[H+q+10]=r.z,P[H+q+11]=R.itemSize===4?r.w:1)}}d={count:u,texture:C,size:new it(S,D)},n.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];const _=a.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function Rg(i,t,e,n){let r=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(r.get(u)!==c&&(t.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return u}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class nd extends Ue{constructor(t,e,n,r,s,o,a,l,c,h){if(h=h!==void 0?h:dr,h!==dr&&h!==ts)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===dr&&(n=br),n===void 0&&h===ts&&(n=ms),super(null,r,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:en,this.minFilter=l!==void 0?l:en,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const id=new Ue,rd=new nd(1,1);rd.compareFunction=Hu;const sd=new $u,od=new fm,ad=new Qu,nh=[],ih=[],rh=new Float32Array(16),sh=new Float32Array(9),oh=new Float32Array(4);function Er(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=nh[r];if(s===void 0&&(s=new Float32Array(r),nh[r]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(s,a)}return s}function be(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ye(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Bo(i,t){let e=ih[t];e===void 0&&(e=new Int32Array(t),ih[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Lg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Dg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2fv(this.addr,t),ye(e,t)}}function Ig(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(be(e,t))return;i.uniform3fv(this.addr,t),ye(e,t)}}function Ng(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4fv(this.addr,t),ye(e,t)}}function Ug(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(be(e,n))return;oh.set(n),i.uniformMatrix2fv(this.addr,!1,oh),ye(e,n)}}function Og(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(be(e,n))return;sh.set(n),i.uniformMatrix3fv(this.addr,!1,sh),ye(e,n)}}function Fg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(be(e,n))return;rh.set(n),i.uniformMatrix4fv(this.addr,!1,rh),ye(e,n)}}function Bg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function kg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2iv(this.addr,t),ye(e,t)}}function Vg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3iv(this.addr,t),ye(e,t)}}function zg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4iv(this.addr,t),ye(e,t)}}function Hg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Gg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2uiv(this.addr,t),ye(e,t)}}function Wg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3uiv(this.addr,t),ye(e,t)}}function Xg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4uiv(this.addr,t),ye(e,t)}}function $g(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const s=this.type===i.SAMPLER_2D_SHADOW?rd:id;e.setTexture2D(t||s,r)}function Yg(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||od,r)}function qg(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||ad,r)}function Kg(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||sd,r)}function jg(i){switch(i){case 5126:return Lg;case 35664:return Dg;case 35665:return Ig;case 35666:return Ng;case 35674:return Ug;case 35675:return Og;case 35676:return Fg;case 5124:case 35670:return Bg;case 35667:case 35671:return kg;case 35668:case 35672:return Vg;case 35669:case 35673:return zg;case 5125:return Hg;case 36294:return Gg;case 36295:return Wg;case 36296:return Xg;case 35678:case 36198:case 36298:case 36306:case 35682:return $g;case 35679:case 36299:case 36307:return Yg;case 35680:case 36300:case 36308:case 36293:return qg;case 36289:case 36303:case 36311:case 36292:return Kg}}function Zg(i,t){i.uniform1fv(this.addr,t)}function Jg(i,t){const e=Er(t,this.size,2);i.uniform2fv(this.addr,e)}function Qg(i,t){const e=Er(t,this.size,3);i.uniform3fv(this.addr,e)}function t0(i,t){const e=Er(t,this.size,4);i.uniform4fv(this.addr,e)}function e0(i,t){const e=Er(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function n0(i,t){const e=Er(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function i0(i,t){const e=Er(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function r0(i,t){i.uniform1iv(this.addr,t)}function s0(i,t){i.uniform2iv(this.addr,t)}function o0(i,t){i.uniform3iv(this.addr,t)}function a0(i,t){i.uniform4iv(this.addr,t)}function l0(i,t){i.uniform1uiv(this.addr,t)}function c0(i,t){i.uniform2uiv(this.addr,t)}function h0(i,t){i.uniform3uiv(this.addr,t)}function u0(i,t){i.uniform4uiv(this.addr,t)}function d0(i,t,e){const n=this.cache,r=t.length,s=Bo(e,r);be(n,s)||(i.uniform1iv(this.addr,s),ye(n,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||id,s[o])}function p0(i,t,e){const n=this.cache,r=t.length,s=Bo(e,r);be(n,s)||(i.uniform1iv(this.addr,s),ye(n,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||od,s[o])}function f0(i,t,e){const n=this.cache,r=t.length,s=Bo(e,r);be(n,s)||(i.uniform1iv(this.addr,s),ye(n,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||ad,s[o])}function m0(i,t,e){const n=this.cache,r=t.length,s=Bo(e,r);be(n,s)||(i.uniform1iv(this.addr,s),ye(n,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||sd,s[o])}function v0(i){switch(i){case 5126:return Zg;case 35664:return Jg;case 35665:return Qg;case 35666:return t0;case 35674:return e0;case 35675:return n0;case 35676:return i0;case 5124:case 35670:return r0;case 35667:case 35671:return s0;case 35668:case 35672:return o0;case 35669:case 35673:return a0;case 5125:return l0;case 36294:return c0;case 36295:return h0;case 36296:return u0;case 35678:case 36198:case 36298:case 36306:case 35682:return d0;case 35679:case 36299:case 36307:return p0;case 35680:case 36300:case 36308:case 36293:return f0;case 36289:case 36303:case 36311:case 36292:return m0}}class _0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=jg(e.type)}}class g0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=v0(e.type)}}class x0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],n)}}}const Sa=/(\w+)(\])?(\[|\.)?/g;function ah(i,t){i.seq.push(t),i.map[t.id]=t}function b0(i,t,e){const n=i.name,r=n.length;for(Sa.lastIndex=0;;){const s=Sa.exec(n),o=Sa.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){ah(e,c===void 0?new _0(a,i,t):new g0(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new x0(a),ah(e,u)),e=u}}}class po{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);b0(s,o,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&n.push(o)}return n}}function lh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const y0=37297;let w0=0;function M0(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function S0(i){const t=Jt.getPrimaries(Jt.workingColorSpace),e=Jt.getPrimaries(i);let n;switch(t===e?n="":t===Mo&&e===wo?n="LinearDisplayP3ToLinearSRGB":t===wo&&e===Mo&&(n="LinearSRGBToLinearDisplayP3"),i){case oi:case Uo:return[n,"LinearTransferOETF"];case un:case ul:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function ch(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=i.getShaderInfoLog(t).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+M0(i.getShaderSource(t),o)}else return r}function E0(i,t){const e=S0(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function T0(i,t){let e;switch(t){case vf:e="Linear";break;case _f:e="Reinhard";break;case gf:e="OptimizedCineon";break;case xf:e="ACESFilmic";break;case yf:e="AgX";break;case wf:e="Neutral";break;case bf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function A0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Wr).join(`
`)}function C0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function P0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Wr(i){return i!==""}function hh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function uh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const R0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Za(i){return i.replace(R0,D0)}const L0=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function D0(i,t){let e=Dt[t];if(e===void 0){const n=L0.get(t);if(n!==void 0)e=Dt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Za(e)}const I0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dh(i){return i.replace(I0,N0)}function N0(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ph(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function U0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Lu?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===zp?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Tn&&(t="SHADOWMAP_TYPE_VSM"),t}function O0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case gr:case xr:t="ENVMAP_TYPE_CUBE";break;case No:t="ENVMAP_TYPE_CUBE_UV";break}return t}function F0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case xr:t="ENVMAP_MODE_REFRACTION";break}return t}function B0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Du:t="ENVMAP_BLENDING_MULTIPLY";break;case ff:t="ENVMAP_BLENDING_MIX";break;case mf:t="ENVMAP_BLENDING_ADD";break}return t}function k0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function V0(i,t,e,n){const r=i.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=U0(e),c=O0(e),h=F0(e),u=B0(e),d=k0(e),p=A0(e),_=C0(s),g=r.createProgram();let f,m,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Wr).join(`
`),f.length>0&&(f+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Wr).join(`
`),m.length>0&&(m+=`
`)):(f=[ph(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Wr).join(`
`),m=[ph(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Jn?"#define TONE_MAPPING":"",e.toneMapping!==Jn?Dt.tonemapping_pars_fragment:"",e.toneMapping!==Jn?T0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Dt.colorspace_pars_fragment,E0("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Wr).join(`
`)),o=Za(o),o=hh(o,e),o=uh(o,e),a=Za(a),a=hh(a,e),a=uh(a,e),o=dh(o),a=dh(a),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,f=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,m=["#define varying in",e.glslVersion===Cc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Cc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=T+f+o,S=T+m+a,D=lh(r,r.VERTEX_SHADER,x),P=lh(r,r.FRAGMENT_SHADER,S);r.attachShader(g,D),r.attachShader(g,P),e.index0AttributeName!==void 0?r.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function C(I){if(i.debug.checkShaderErrors){const z=r.getProgramInfoLog(g).trim(),R=r.getShaderInfoLog(D).trim(),H=r.getShaderInfoLog(P).trim();let $=!0,q=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,g,D,P);else{const rt=ch(r,D,"vertex"),G=ch(r,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+z+`
`+rt+`
`+G)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(R===""||H==="")&&(q=!1);q&&(I.diagnostics={runnable:$,programLog:z,vertexShader:{log:R,prefix:f},fragmentShader:{log:H,prefix:m}})}r.deleteShader(D),r.deleteShader(P),U=new po(r,g),M=P0(r,g)}let U;this.getUniforms=function(){return U===void 0&&C(this),U};let M;this.getAttributes=function(){return M===void 0&&C(this),M};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(g,y0)),y},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=w0++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=D,this.fragmentShader=P,this}let z0=0;class H0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new G0(t),e.set(t,n)),n}}class G0{constructor(t){this.id=z0++,this.code=t,this.usedTimes=0}}function W0(i,t,e,n,r,s,o){const a=new Yu,l=new H0,c=new Set,h=[],u=r.logarithmicDepthBuffer,d=r.vertexTextures;let p=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return c.add(M),M===0?"uv":`uv${M}`}function f(M,y,I,z,R){const H=z.fog,$=R.geometry,q=M.isMeshStandardMaterial?z.environment:null,rt=(M.isMeshStandardMaterial?e:t).get(M.envMap||q),G=rt&&rt.mapping===No?rt.image.height:null,Q=_[M.type];M.precision!==null&&(p=r.getMaxPrecision(M.precision),p!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",p,"instead."));const J=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,pt=J!==void 0?J.length:0;let Ut=0;$.morphAttributes.position!==void 0&&(Ut=1),$.morphAttributes.normal!==void 0&&(Ut=2),$.morphAttributes.color!==void 0&&(Ut=3);let Kt,W,tt,ht;if(Q){const we=dn[Q];Kt=we.vertexShader,W=we.fragmentShader}else Kt=M.vertexShader,W=M.fragmentShader,l.update(M),tt=l.getVertexShaderID(M),ht=l.getFragmentShaderID(M);const at=i.getRenderTarget(),Tt=R.isInstancedMesh===!0,Ct=R.isBatchedMesh===!0,Ft=!!M.map,N=!!M.matcap,Nt=!!rt,yt=!!M.aoMap,ce=!!M.lightMap,wt=!!M.bumpMap,Yt=!!M.normalMap,E=!!M.displacementMap,b=!!M.emissiveMap,V=!!M.metalnessMap,Y=!!M.roughnessMap,K=M.anisotropy>0,j=M.clearcoat>0,_t=M.iridescence>0,Z=M.sheen>0,vt=M.transmission>0,gt=K&&!!M.anisotropyMap,nt=j&&!!M.clearcoatMap,lt=j&&!!M.clearcoatNormalMap,Mt=j&&!!M.clearcoatRoughnessMap,ut=_t&&!!M.iridescenceMap,dt=_t&&!!M.iridescenceThicknessMap,Bt=Z&&!!M.sheenColorMap,kt=Z&&!!M.sheenRoughnessMap,Xt=!!M.specularMap,zt=!!M.specularColorMap,$t=!!M.specularIntensityMap,ft=vt&&!!M.transmissionMap,v=vt&&!!M.thicknessMap,O=!!M.gradientMap,X=!!M.alphaMap,et=M.alphaTest>0,ct=!!M.alphaHash,Vt=!!M.extensions;let Ot=Jn;M.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(Ot=i.toneMapping);const ne={shaderID:Q,shaderType:M.type,shaderName:M.name,vertexShader:Kt,fragmentShader:W,defines:M.defines,customVertexShaderID:tt,customFragmentShaderID:ht,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:p,batching:Ct,instancing:Tt,instancingColor:Tt&&R.instanceColor!==null,instancingMorph:Tt&&R.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:at===null?i.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:oi,alphaToCoverage:!!M.alphaToCoverage,map:Ft,matcap:N,envMap:Nt,envMapMode:Nt&&rt.mapping,envMapCubeUVHeight:G,aoMap:yt,lightMap:ce,bumpMap:wt,normalMap:Yt,displacementMap:d&&E,emissiveMap:b,normalMapObjectSpace:Yt&&M.normalMapType===Ff,normalMapTangentSpace:Yt&&M.normalMapType===Of,metalnessMap:V,roughnessMap:Y,anisotropy:K,anisotropyMap:gt,clearcoat:j,clearcoatMap:nt,clearcoatNormalMap:lt,clearcoatRoughnessMap:Mt,iridescence:_t,iridescenceMap:ut,iridescenceThicknessMap:dt,sheen:Z,sheenColorMap:Bt,sheenRoughnessMap:kt,specularMap:Xt,specularColorMap:zt,specularIntensityMap:$t,transmission:vt,transmissionMap:ft,thicknessMap:v,gradientMap:O,opaque:M.transparent===!1&&M.blending===ur&&M.alphaToCoverage===!1,alphaMap:X,alphaTest:et,alphaHash:ct,combine:M.combine,mapUv:Ft&&g(M.map.channel),aoMapUv:yt&&g(M.aoMap.channel),lightMapUv:ce&&g(M.lightMap.channel),bumpMapUv:wt&&g(M.bumpMap.channel),normalMapUv:Yt&&g(M.normalMap.channel),displacementMapUv:E&&g(M.displacementMap.channel),emissiveMapUv:b&&g(M.emissiveMap.channel),metalnessMapUv:V&&g(M.metalnessMap.channel),roughnessMapUv:Y&&g(M.roughnessMap.channel),anisotropyMapUv:gt&&g(M.anisotropyMap.channel),clearcoatMapUv:nt&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:lt&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Mt&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ut&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:dt&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:Bt&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:kt&&g(M.sheenRoughnessMap.channel),specularMapUv:Xt&&g(M.specularMap.channel),specularColorMapUv:zt&&g(M.specularColorMap.channel),specularIntensityMapUv:$t&&g(M.specularIntensityMap.channel),transmissionMapUv:ft&&g(M.transmissionMap.channel),thicknessMapUv:v&&g(M.thicknessMap.channel),alphaMapUv:X&&g(M.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Yt||K),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:R.isPoints===!0&&!!$.attributes.uv&&(Ft||X),fog:!!H,useFog:M.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:R.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:pt,morphTextureStride:Ut,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ot,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Ft&&M.map.isVideoTexture===!0&&Jt.getTransfer(M.map.colorSpace)===ee,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===$e,flipSided:M.side===Ve,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Vt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:Vt&&M.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return ne.vertexUv1s=c.has(1),ne.vertexUv2s=c.has(2),ne.vertexUv3s=c.has(3),c.clear(),ne}function m(M){const y=[];if(M.shaderID?y.push(M.shaderID):(y.push(M.customVertexShaderID),y.push(M.customFragmentShaderID)),M.defines!==void 0)for(const I in M.defines)y.push(I),y.push(M.defines[I]);return M.isRawShaderMaterial===!1&&(T(y,M),x(y,M),y.push(i.outputColorSpace)),y.push(M.customProgramCacheKey),y.join()}function T(M,y){M.push(y.precision),M.push(y.outputColorSpace),M.push(y.envMapMode),M.push(y.envMapCubeUVHeight),M.push(y.mapUv),M.push(y.alphaMapUv),M.push(y.lightMapUv),M.push(y.aoMapUv),M.push(y.bumpMapUv),M.push(y.normalMapUv),M.push(y.displacementMapUv),M.push(y.emissiveMapUv),M.push(y.metalnessMapUv),M.push(y.roughnessMapUv),M.push(y.anisotropyMapUv),M.push(y.clearcoatMapUv),M.push(y.clearcoatNormalMapUv),M.push(y.clearcoatRoughnessMapUv),M.push(y.iridescenceMapUv),M.push(y.iridescenceThicknessMapUv),M.push(y.sheenColorMapUv),M.push(y.sheenRoughnessMapUv),M.push(y.specularMapUv),M.push(y.specularColorMapUv),M.push(y.specularIntensityMapUv),M.push(y.transmissionMapUv),M.push(y.thicknessMapUv),M.push(y.combine),M.push(y.fogExp2),M.push(y.sizeAttenuation),M.push(y.morphTargetsCount),M.push(y.morphAttributeCount),M.push(y.numDirLights),M.push(y.numPointLights),M.push(y.numSpotLights),M.push(y.numSpotLightMaps),M.push(y.numHemiLights),M.push(y.numRectAreaLights),M.push(y.numDirLightShadows),M.push(y.numPointLightShadows),M.push(y.numSpotLightShadows),M.push(y.numSpotLightShadowsWithMaps),M.push(y.numLightProbes),M.push(y.shadowMapType),M.push(y.toneMapping),M.push(y.numClippingPlanes),M.push(y.numClipIntersection),M.push(y.depthPacking)}function x(M,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),M.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.skinning&&a.enable(4),y.morphTargets&&a.enable(5),y.morphNormals&&a.enable(6),y.morphColors&&a.enable(7),y.premultipliedAlpha&&a.enable(8),y.shadowMapEnabled&&a.enable(9),y.useLegacyLights&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.alphaToCoverage&&a.enable(20),M.push(a.mask)}function S(M){const y=_[M.type];let I;if(y){const z=dn[y];I=Tm.clone(z.uniforms)}else I=M.uniforms;return I}function D(M,y){let I;for(let z=0,R=h.length;z<R;z++){const H=h[z];if(H.cacheKey===y){I=H,++I.usedTimes;break}}return I===void 0&&(I=new V0(i,y,M,s),h.push(I)),I}function P(M){if(--M.usedTimes===0){const y=h.indexOf(M);h[y]=h[h.length-1],h.pop(),M.destroy()}}function C(M){l.remove(M)}function U(){l.dispose()}return{getParameters:f,getProgramCacheKey:m,getUniforms:S,acquireProgram:D,releaseProgram:P,releaseShaderCache:C,programs:h,dispose:U}}function X0(){let i=new WeakMap;function t(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function e(s){i.delete(s)}function n(s,o,a){i.get(s)[o]=a}function r(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:r}}function $0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function fh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function mh(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function o(u,d,p,_,g,f){let m=i[t];return m===void 0?(m={id:u.id,object:u,geometry:d,material:p,groupOrder:_,renderOrder:u.renderOrder,z:g,group:f},i[t]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=p,m.groupOrder=_,m.renderOrder=u.renderOrder,m.z=g,m.group=f),t++,m}function a(u,d,p,_,g,f){const m=o(u,d,p,_,g,f);p.transmission>0?n.push(m):p.transparent===!0?r.push(m):e.push(m)}function l(u,d,p,_,g,f){const m=o(u,d,p,_,g,f);p.transmission>0?n.unshift(m):p.transparent===!0?r.unshift(m):e.unshift(m)}function c(u,d){e.length>1&&e.sort(u||$0),n.length>1&&n.sort(d||fh),r.length>1&&r.sort(d||fh)}function h(){for(let u=t,d=i.length;u<d;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:h,sort:c}}function Y0(){let i=new WeakMap;function t(n,r){const s=i.get(n);let o;return s===void 0?(o=new mh,i.set(n,[o])):r>=s.length?(o=new mh,s.push(o)):o=s[r],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function q0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new A,color:new Ht};break;case"SpotLight":e={position:new A,direction:new A,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new Ht,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new Ht,groundColor:new Ht};break;case"RectAreaLight":e={color:new Ht,position:new A,halfWidth:new A,halfHeight:new A};break}return i[t.id]=e,e}}}function K0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let j0=0;function Z0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function J0(i){const t=new q0,e=K0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new A);const r=new A,s=new re,o=new re;function a(c,h){let u=0,d=0,p=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let _=0,g=0,f=0,m=0,T=0,x=0,S=0,D=0,P=0,C=0,U=0;c.sort(Z0);const M=h===!0?Math.PI:1;for(let I=0,z=c.length;I<z;I++){const R=c[I],H=R.color,$=R.intensity,q=R.distance,rt=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=H.r*$*M,d+=H.g*$*M,p+=H.b*$*M;else if(R.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(R.sh.coefficients[G],$);U++}else if(R.isDirectionalLight){const G=t.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity*M),R.castShadow){const Q=R.shadow,J=e.get(R);J.shadowBias=Q.bias,J.shadowNormalBias=Q.normalBias,J.shadowRadius=Q.radius,J.shadowMapSize=Q.mapSize,n.directionalShadow[_]=J,n.directionalShadowMap[_]=rt,n.directionalShadowMatrix[_]=R.shadow.matrix,x++}n.directional[_]=G,_++}else if(R.isSpotLight){const G=t.get(R);G.position.setFromMatrixPosition(R.matrixWorld),G.color.copy(H).multiplyScalar($*M),G.distance=q,G.coneCos=Math.cos(R.angle),G.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),G.decay=R.decay,n.spot[f]=G;const Q=R.shadow;if(R.map&&(n.spotLightMap[P]=R.map,P++,Q.updateMatrices(R),R.castShadow&&C++),n.spotLightMatrix[f]=Q.matrix,R.castShadow){const J=e.get(R);J.shadowBias=Q.bias,J.shadowNormalBias=Q.normalBias,J.shadowRadius=Q.radius,J.shadowMapSize=Q.mapSize,n.spotShadow[f]=J,n.spotShadowMap[f]=rt,D++}f++}else if(R.isRectAreaLight){const G=t.get(R);G.color.copy(H).multiplyScalar($),G.halfWidth.set(R.width*.5,0,0),G.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=G,m++}else if(R.isPointLight){const G=t.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity*M),G.distance=R.distance,G.decay=R.decay,R.castShadow){const Q=R.shadow,J=e.get(R);J.shadowBias=Q.bias,J.shadowNormalBias=Q.normalBias,J.shadowRadius=Q.radius,J.shadowMapSize=Q.mapSize,J.shadowCameraNear=Q.camera.near,J.shadowCameraFar=Q.camera.far,n.pointShadow[g]=J,n.pointShadowMap[g]=rt,n.pointShadowMatrix[g]=R.shadow.matrix,S++}n.point[g]=G,g++}else if(R.isHemisphereLight){const G=t.get(R);G.skyColor.copy(R.color).multiplyScalar($*M),G.groundColor.copy(R.groundColor).multiplyScalar($*M),n.hemi[T]=G,T++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=st.LTC_FLOAT_1,n.rectAreaLTC2=st.LTC_FLOAT_2):(n.rectAreaLTC1=st.LTC_HALF_1,n.rectAreaLTC2=st.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=p;const y=n.hash;(y.directionalLength!==_||y.pointLength!==g||y.spotLength!==f||y.rectAreaLength!==m||y.hemiLength!==T||y.numDirectionalShadows!==x||y.numPointShadows!==S||y.numSpotShadows!==D||y.numSpotMaps!==P||y.numLightProbes!==U)&&(n.directional.length=_,n.spot.length=f,n.rectArea.length=m,n.point.length=g,n.hemi.length=T,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=D,n.spotShadowMap.length=D,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=D+P-C,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=U,y.directionalLength=_,y.pointLength=g,y.spotLength=f,y.rectAreaLength=m,y.hemiLength=T,y.numDirectionalShadows=x,y.numPointShadows=S,y.numSpotShadows=D,y.numSpotMaps=P,y.numLightProbes=U,n.version=j0++)}function l(c,h){let u=0,d=0,p=0,_=0,g=0;const f=h.matrixWorldInverse;for(let m=0,T=c.length;m<T;m++){const x=c[m];if(x.isDirectionalLight){const S=n.directional[u];S.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(f),u++}else if(x.isSpotLight){const S=n.spot[p];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(f),S.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(f),p++}else if(x.isRectAreaLight){const S=n.rectArea[_];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(f),o.identity(),s.copy(x.matrixWorld),s.premultiply(f),o.extractRotation(s),S.halfWidth.set(x.width*.5,0,0),S.halfHeight.set(0,x.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),_++}else if(x.isPointLight){const S=n.point[d];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(f),d++}else if(x.isHemisphereLight){const S=n.hemi[g];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(f),g++}}}return{setup:a,setupView:l,state:n}}function vh(i){const t=new J0(i),e=[],n=[];function r(){e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(h){t.setup(e,h)}function l(h){t.setupView(e,h)}return{init:r,state:{lightsArray:e,shadowsArray:n,lights:t,transmissionRenderTarget:null},setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Q0(i){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new vh(i),t.set(r,[a])):s>=o.length?(a=new vh(i),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class tx extends Ni{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Nf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ex extends Ni{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const nx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ix=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function rx(i,t,e){let n=new td;const r=new it,s=new it,o=new Ae,a=new tx({depthPacking:Uf}),l=new ex,c={},h=e.maxTextureSize,u={[ni]:Ve,[Ve]:ni,[$e]:$e},d=new ii({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:nx,fragmentShader:ix}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const _=new pe;_.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Ie(_,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lu;let m=this.type;this.render=function(P,C,U){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||P.length===0)return;const M=i.getRenderTarget(),y=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),z=i.state;z.setBlending(Zn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const R=m!==Tn&&this.type===Tn,H=m===Tn&&this.type!==Tn;for(let $=0,q=P.length;$<q;$++){const rt=P[$],G=rt.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",rt,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;r.copy(G.mapSize);const Q=G.getFrameExtents();if(r.multiply(Q),s.copy(G.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/Q.x),r.x=s.x*Q.x,G.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/Q.y),r.y=s.y*Q.y,G.mapSize.y=s.y)),G.map===null||R===!0||H===!0){const pt=this.type!==Tn?{minFilter:en,magFilter:en}:{};G.map!==null&&G.map.dispose(),G.map=new Ti(r.x,r.y,pt),G.map.texture.name=rt.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const J=G.getViewportCount();for(let pt=0;pt<J;pt++){const Ut=G.getViewport(pt);o.set(s.x*Ut.x,s.y*Ut.y,s.x*Ut.z,s.y*Ut.w),z.viewport(o),G.updateMatrices(rt,pt),n=G.getFrustum(),S(C,U,G.camera,rt,this.type)}G.isPointLightShadow!==!0&&this.type===Tn&&T(G,U),G.needsUpdate=!1}m=this.type,f.needsUpdate=!1,i.setRenderTarget(M,y,I)};function T(P,C){const U=t.update(g);d.defines.VSM_SAMPLES!==P.blurSamples&&(d.defines.VSM_SAMPLES=P.blurSamples,p.defines.VSM_SAMPLES=P.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Ti(r.x,r.y)),d.uniforms.shadow_pass.value=P.map.texture,d.uniforms.resolution.value=P.mapSize,d.uniforms.radius.value=P.radius,i.setRenderTarget(P.mapPass),i.clear(),i.renderBufferDirect(C,null,U,d,g,null),p.uniforms.shadow_pass.value=P.mapPass.texture,p.uniforms.resolution.value=P.mapSize,p.uniforms.radius.value=P.radius,i.setRenderTarget(P.map),i.clear(),i.renderBufferDirect(C,null,U,p,g,null)}function x(P,C,U,M){let y=null;const I=U.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(I!==void 0)y=I;else if(y=U.isPointLight===!0?l:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const z=y.uuid,R=C.uuid;let H=c[z];H===void 0&&(H={},c[z]=H);let $=H[R];$===void 0&&($=y.clone(),H[R]=$,C.addEventListener("dispose",D)),y=$}if(y.visible=C.visible,y.wireframe=C.wireframe,M===Tn?y.side=C.shadowSide!==null?C.shadowSide:C.side:y.side=C.shadowSide!==null?C.shadowSide:u[C.side],y.alphaMap=C.alphaMap,y.alphaTest=C.alphaTest,y.map=C.map,y.clipShadows=C.clipShadows,y.clippingPlanes=C.clippingPlanes,y.clipIntersection=C.clipIntersection,y.displacementMap=C.displacementMap,y.displacementScale=C.displacementScale,y.displacementBias=C.displacementBias,y.wireframeLinewidth=C.wireframeLinewidth,y.linewidth=C.linewidth,U.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const z=i.properties.get(y);z.light=U}return y}function S(P,C,U,M,y){if(P.visible===!1)return;if(P.layers.test(C.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&y===Tn)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,P.matrixWorld);const R=t.update(P),H=P.material;if(Array.isArray(H)){const $=R.groups;for(let q=0,rt=$.length;q<rt;q++){const G=$[q],Q=H[G.materialIndex];if(Q&&Q.visible){const J=x(P,Q,M,y);P.onBeforeShadow(i,P,C,U,R,J,G),i.renderBufferDirect(U,null,R,J,P,G),P.onAfterShadow(i,P,C,U,R,J,G)}}}else if(H.visible){const $=x(P,H,M,y);P.onBeforeShadow(i,P,C,U,R,$,null),i.renderBufferDirect(U,null,R,$,P,null),P.onAfterShadow(i,P,C,U,R,$,null)}}const z=P.children;for(let R=0,H=z.length;R<H;R++)S(z[R],C,U,M,y)}function D(P){P.target.removeEventListener("dispose",D);for(const U in c){const M=c[U],y=P.target.uuid;y in M&&(M[y].dispose(),delete M[y])}}}function sx(i){function t(){let v=!1;const O=new Ae;let X=null;const et=new Ae(0,0,0,0);return{setMask:function(ct){X!==ct&&!v&&(i.colorMask(ct,ct,ct,ct),X=ct)},setLocked:function(ct){v=ct},setClear:function(ct,Vt,Ot,ne,we){we===!0&&(ct*=ne,Vt*=ne,Ot*=ne),O.set(ct,Vt,Ot,ne),et.equals(O)===!1&&(i.clearColor(ct,Vt,Ot,ne),et.copy(O))},reset:function(){v=!1,X=null,et.set(-1,0,0,0)}}}function e(){let v=!1,O=null,X=null,et=null;return{setTest:function(ct){ct?ht(i.DEPTH_TEST):at(i.DEPTH_TEST)},setMask:function(ct){O!==ct&&!v&&(i.depthMask(ct),O=ct)},setFunc:function(ct){if(X!==ct){switch(ct){case af:i.depthFunc(i.NEVER);break;case lf:i.depthFunc(i.ALWAYS);break;case cf:i.depthFunc(i.LESS);break;case xo:i.depthFunc(i.LEQUAL);break;case hf:i.depthFunc(i.EQUAL);break;case uf:i.depthFunc(i.GEQUAL);break;case df:i.depthFunc(i.GREATER);break;case pf:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}X=ct}},setLocked:function(ct){v=ct},setClear:function(ct){et!==ct&&(i.clearDepth(ct),et=ct)},reset:function(){v=!1,O=null,X=null,et=null}}}function n(){let v=!1,O=null,X=null,et=null,ct=null,Vt=null,Ot=null,ne=null,we=null;return{setTest:function(Zt){v||(Zt?ht(i.STENCIL_TEST):at(i.STENCIL_TEST))},setMask:function(Zt){O!==Zt&&!v&&(i.stencilMask(Zt),O=Zt)},setFunc:function(Zt,fe,me){(X!==Zt||et!==fe||ct!==me)&&(i.stencilFunc(Zt,fe,me),X=Zt,et=fe,ct=me)},setOp:function(Zt,fe,me){(Vt!==Zt||Ot!==fe||ne!==me)&&(i.stencilOp(Zt,fe,me),Vt=Zt,Ot=fe,ne=me)},setLocked:function(Zt){v=Zt},setClear:function(Zt){we!==Zt&&(i.clearStencil(Zt),we=Zt)},reset:function(){v=!1,O=null,X=null,et=null,ct=null,Vt=null,Ot=null,ne=null,we=null}}}const r=new t,s=new e,o=new n,a=new WeakMap,l=new WeakMap;let c={},h={},u=new WeakMap,d=[],p=null,_=!1,g=null,f=null,m=null,T=null,x=null,S=null,D=null,P=new Ht(0,0,0),C=0,U=!1,M=null,y=null,I=null,z=null,R=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,q=0;const rt=i.getParameter(i.VERSION);rt.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(rt)[1]),$=q>=1):rt.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(rt)[1]),$=q>=2);let G=null,Q={};const J=i.getParameter(i.SCISSOR_BOX),pt=i.getParameter(i.VIEWPORT),Ut=new Ae().fromArray(J),Kt=new Ae().fromArray(pt);function W(v,O,X,et){const ct=new Uint8Array(4),Vt=i.createTexture();i.bindTexture(v,Vt),i.texParameteri(v,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(v,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ot=0;Ot<X;Ot++)v===i.TEXTURE_3D||v===i.TEXTURE_2D_ARRAY?i.texImage3D(O,0,i.RGBA,1,1,et,0,i.RGBA,i.UNSIGNED_BYTE,ct):i.texImage2D(O+Ot,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ct);return Vt}const tt={};tt[i.TEXTURE_2D]=W(i.TEXTURE_2D,i.TEXTURE_2D,1),tt[i.TEXTURE_CUBE_MAP]=W(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),tt[i.TEXTURE_2D_ARRAY]=W(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),tt[i.TEXTURE_3D]=W(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ht(i.DEPTH_TEST),s.setFunc(xo),wt(!1),Yt(Jl),ht(i.CULL_FACE),yt(Zn);function ht(v){c[v]!==!0&&(i.enable(v),c[v]=!0)}function at(v){c[v]!==!1&&(i.disable(v),c[v]=!1)}function Tt(v,O){return h[v]!==O?(i.bindFramebuffer(v,O),h[v]=O,v===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=O),v===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=O),!0):!1}function Ct(v,O){let X=d,et=!1;if(v){X=u.get(O),X===void 0&&(X=[],u.set(O,X));const ct=v.textures;if(X.length!==ct.length||X[0]!==i.COLOR_ATTACHMENT0){for(let Vt=0,Ot=ct.length;Vt<Ot;Vt++)X[Vt]=i.COLOR_ATTACHMENT0+Vt;X.length=ct.length,et=!0}}else X[0]!==i.BACK&&(X[0]=i.BACK,et=!0);et&&i.drawBuffers(X)}function Ft(v){return p!==v?(i.useProgram(v),p=v,!0):!1}const N={[gi]:i.FUNC_ADD,[Gp]:i.FUNC_SUBTRACT,[Wp]:i.FUNC_REVERSE_SUBTRACT};N[Xp]=i.MIN,N[$p]=i.MAX;const Nt={[Yp]:i.ZERO,[qp]:i.ONE,[Kp]:i.SRC_COLOR,[Wa]:i.SRC_ALPHA,[ef]:i.SRC_ALPHA_SATURATE,[Qp]:i.DST_COLOR,[Zp]:i.DST_ALPHA,[jp]:i.ONE_MINUS_SRC_COLOR,[Xa]:i.ONE_MINUS_SRC_ALPHA,[tf]:i.ONE_MINUS_DST_COLOR,[Jp]:i.ONE_MINUS_DST_ALPHA,[nf]:i.CONSTANT_COLOR,[rf]:i.ONE_MINUS_CONSTANT_COLOR,[sf]:i.CONSTANT_ALPHA,[of]:i.ONE_MINUS_CONSTANT_ALPHA};function yt(v,O,X,et,ct,Vt,Ot,ne,we,Zt){if(v===Zn){_===!0&&(at(i.BLEND),_=!1);return}if(_===!1&&(ht(i.BLEND),_=!0),v!==Hp){if(v!==g||Zt!==U){if((f!==gi||x!==gi)&&(i.blendEquation(i.FUNC_ADD),f=gi,x=gi),Zt)switch(v){case ur:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ql:i.blendFunc(i.ONE,i.ONE);break;case tc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ec:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",v);break}else switch(v){case ur:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ql:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case tc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ec:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",v);break}m=null,T=null,S=null,D=null,P.set(0,0,0),C=0,g=v,U=Zt}return}ct=ct||O,Vt=Vt||X,Ot=Ot||et,(O!==f||ct!==x)&&(i.blendEquationSeparate(N[O],N[ct]),f=O,x=ct),(X!==m||et!==T||Vt!==S||Ot!==D)&&(i.blendFuncSeparate(Nt[X],Nt[et],Nt[Vt],Nt[Ot]),m=X,T=et,S=Vt,D=Ot),(ne.equals(P)===!1||we!==C)&&(i.blendColor(ne.r,ne.g,ne.b,we),P.copy(ne),C=we),g=v,U=!1}function ce(v,O){v.side===$e?at(i.CULL_FACE):ht(i.CULL_FACE);let X=v.side===Ve;O&&(X=!X),wt(X),v.blending===ur&&v.transparent===!1?yt(Zn):yt(v.blending,v.blendEquation,v.blendSrc,v.blendDst,v.blendEquationAlpha,v.blendSrcAlpha,v.blendDstAlpha,v.blendColor,v.blendAlpha,v.premultipliedAlpha),s.setFunc(v.depthFunc),s.setTest(v.depthTest),s.setMask(v.depthWrite),r.setMask(v.colorWrite);const et=v.stencilWrite;o.setTest(et),et&&(o.setMask(v.stencilWriteMask),o.setFunc(v.stencilFunc,v.stencilRef,v.stencilFuncMask),o.setOp(v.stencilFail,v.stencilZFail,v.stencilZPass)),b(v.polygonOffset,v.polygonOffsetFactor,v.polygonOffsetUnits),v.alphaToCoverage===!0?ht(i.SAMPLE_ALPHA_TO_COVERAGE):at(i.SAMPLE_ALPHA_TO_COVERAGE)}function wt(v){M!==v&&(v?i.frontFace(i.CW):i.frontFace(i.CCW),M=v)}function Yt(v){v!==kp?(ht(i.CULL_FACE),v!==y&&(v===Jl?i.cullFace(i.BACK):v===Vp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):at(i.CULL_FACE),y=v}function E(v){v!==I&&($&&i.lineWidth(v),I=v)}function b(v,O,X){v?(ht(i.POLYGON_OFFSET_FILL),(z!==O||R!==X)&&(i.polygonOffset(O,X),z=O,R=X)):at(i.POLYGON_OFFSET_FILL)}function V(v){v?ht(i.SCISSOR_TEST):at(i.SCISSOR_TEST)}function Y(v){v===void 0&&(v=i.TEXTURE0+H-1),G!==v&&(i.activeTexture(v),G=v)}function K(v,O,X){X===void 0&&(G===null?X=i.TEXTURE0+H-1:X=G);let et=Q[X];et===void 0&&(et={type:void 0,texture:void 0},Q[X]=et),(et.type!==v||et.texture!==O)&&(G!==X&&(i.activeTexture(X),G=X),i.bindTexture(v,O||tt[v]),et.type=v,et.texture=O)}function j(){const v=Q[G];v!==void 0&&v.type!==void 0&&(i.bindTexture(v.type,null),v.type=void 0,v.texture=void 0)}function _t(){try{i.compressedTexImage2D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Z(){try{i.compressedTexImage3D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function vt(){try{i.texSubImage2D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function gt(){try{i.texSubImage3D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function nt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function lt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Mt(){try{i.texStorage2D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function ut(){try{i.texStorage3D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function dt(){try{i.texImage2D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Bt(){try{i.texImage3D.apply(i,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function kt(v){Ut.equals(v)===!1&&(i.scissor(v.x,v.y,v.z,v.w),Ut.copy(v))}function Xt(v){Kt.equals(v)===!1&&(i.viewport(v.x,v.y,v.z,v.w),Kt.copy(v))}function zt(v,O){let X=l.get(O);X===void 0&&(X=new WeakMap,l.set(O,X));let et=X.get(v);et===void 0&&(et=i.getUniformBlockIndex(O,v.name),X.set(v,et))}function $t(v,O){const et=l.get(O).get(v);a.get(O)!==et&&(i.uniformBlockBinding(O,et,v.__bindingPointIndex),a.set(O,et))}function ft(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},G=null,Q={},h={},u=new WeakMap,d=[],p=null,_=!1,g=null,f=null,m=null,T=null,x=null,S=null,D=null,P=new Ht(0,0,0),C=0,U=!1,M=null,y=null,I=null,z=null,R=null,Ut.set(0,0,i.canvas.width,i.canvas.height),Kt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:ht,disable:at,bindFramebuffer:Tt,drawBuffers:Ct,useProgram:Ft,setBlending:yt,setMaterial:ce,setFlipSided:wt,setCullFace:Yt,setLineWidth:E,setPolygonOffset:b,setScissorTest:V,activeTexture:Y,bindTexture:K,unbindTexture:j,compressedTexImage2D:_t,compressedTexImage3D:Z,texImage2D:dt,texImage3D:Bt,updateUBOMapping:zt,uniformBlockBinding:$t,texStorage2D:Mt,texStorage3D:ut,texSubImage2D:vt,texSubImage3D:gt,compressedTexSubImage2D:nt,compressedTexSubImage3D:lt,scissor:kt,viewport:Xt,reset:ft}}function ox(i,t,e,n,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new it,h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(E,b){return p?new OffscreenCanvas(E,b):Eo("canvas")}function g(E,b,V){let Y=1;const K=Yt(E);if((K.width>V||K.height>V)&&(Y=V/Math.max(K.width,K.height)),Y<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const j=Math.floor(Y*K.width),_t=Math.floor(Y*K.height);u===void 0&&(u=_(j,_t));const Z=b?_(j,_t):u;return Z.width=j,Z.height=_t,Z.getContext("2d").drawImage(E,0,0,j,_t),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+j+"x"+_t+")."),Z}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),E;return E}function f(E){return E.generateMipmaps&&E.minFilter!==en&&E.minFilter!==an}function m(E){i.generateMipmap(E)}function T(E,b,V,Y,K=!1){if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let j=b;if(b===i.RED&&(V===i.FLOAT&&(j=i.R32F),V===i.HALF_FLOAT&&(j=i.R16F),V===i.UNSIGNED_BYTE&&(j=i.R8)),b===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(j=i.R8UI),V===i.UNSIGNED_SHORT&&(j=i.R16UI),V===i.UNSIGNED_INT&&(j=i.R32UI),V===i.BYTE&&(j=i.R8I),V===i.SHORT&&(j=i.R16I),V===i.INT&&(j=i.R32I)),b===i.RG&&(V===i.FLOAT&&(j=i.RG32F),V===i.HALF_FLOAT&&(j=i.RG16F),V===i.UNSIGNED_BYTE&&(j=i.RG8)),b===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(j=i.RG8UI),V===i.UNSIGNED_SHORT&&(j=i.RG16UI),V===i.UNSIGNED_INT&&(j=i.RG32UI),V===i.BYTE&&(j=i.RG8I),V===i.SHORT&&(j=i.RG16I),V===i.INT&&(j=i.RG32I)),b===i.RGB&&V===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),b===i.RGBA){const _t=K?yo:Jt.getTransfer(Y);V===i.FLOAT&&(j=i.RGBA32F),V===i.HALF_FLOAT&&(j=i.RGBA16F),V===i.UNSIGNED_BYTE&&(j=_t===ee?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function x(E,b){return f(E)===!0||E.isFramebufferTexture&&E.minFilter!==en&&E.minFilter!==an?Math.log2(Math.max(b.width,b.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?b.mipmaps.length:1}function S(E){const b=E.target;b.removeEventListener("dispose",S),P(b),b.isVideoTexture&&h.delete(b)}function D(E){const b=E.target;b.removeEventListener("dispose",D),U(b)}function P(E){const b=n.get(E);if(b.__webglInit===void 0)return;const V=E.source,Y=d.get(V);if(Y){const K=Y[b.__cacheKey];K.usedTimes--,K.usedTimes===0&&C(E),Object.keys(Y).length===0&&d.delete(V)}n.remove(E)}function C(E){const b=n.get(E);i.deleteTexture(b.__webglTexture);const V=E.source,Y=d.get(V);delete Y[b.__cacheKey],o.memory.textures--}function U(E){const b=n.get(E);if(E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(b.__webglFramebuffer[Y]))for(let K=0;K<b.__webglFramebuffer[Y].length;K++)i.deleteFramebuffer(b.__webglFramebuffer[Y][K]);else i.deleteFramebuffer(b.__webglFramebuffer[Y]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[Y])}else{if(Array.isArray(b.__webglFramebuffer))for(let Y=0;Y<b.__webglFramebuffer.length;Y++)i.deleteFramebuffer(b.__webglFramebuffer[Y]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let Y=0;Y<b.__webglColorRenderbuffer.length;Y++)b.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[Y]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const V=E.textures;for(let Y=0,K=V.length;Y<K;Y++){const j=n.get(V[Y]);j.__webglTexture&&(i.deleteTexture(j.__webglTexture),o.memory.textures--),n.remove(V[Y])}n.remove(E)}let M=0;function y(){M=0}function I(){const E=M;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),M+=1,E}function z(E){const b=[];return b.push(E.wrapS),b.push(E.wrapT),b.push(E.wrapR||0),b.push(E.magFilter),b.push(E.minFilter),b.push(E.anisotropy),b.push(E.internalFormat),b.push(E.format),b.push(E.type),b.push(E.generateMipmaps),b.push(E.premultiplyAlpha),b.push(E.flipY),b.push(E.unpackAlignment),b.push(E.colorSpace),b.join()}function R(E,b){const V=n.get(E);if(E.isVideoTexture&&ce(E),E.isRenderTargetTexture===!1&&E.version>0&&V.__version!==E.version){const Y=E.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ut(V,E,b);return}}e.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+b)}function H(E,b){const V=n.get(E);if(E.version>0&&V.__version!==E.version){Ut(V,E,b);return}e.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+b)}function $(E,b){const V=n.get(E);if(E.version>0&&V.__version!==E.version){Ut(V,E,b);return}e.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+b)}function q(E,b){const V=n.get(E);if(E.version>0&&V.__version!==E.version){Kt(V,E,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+b)}const rt={[qa]:i.REPEAT,[yi]:i.CLAMP_TO_EDGE,[Ka]:i.MIRRORED_REPEAT},G={[en]:i.NEAREST,[Mf]:i.NEAREST_MIPMAP_NEAREST,[Ls]:i.NEAREST_MIPMAP_LINEAR,[an]:i.LINEAR,[Ko]:i.LINEAR_MIPMAP_NEAREST,[wi]:i.LINEAR_MIPMAP_LINEAR},Q={[Bf]:i.NEVER,[Wf]:i.ALWAYS,[kf]:i.LESS,[Hu]:i.LEQUAL,[Vf]:i.EQUAL,[Gf]:i.GEQUAL,[zf]:i.GREATER,[Hf]:i.NOTEQUAL};function J(E,b){if(b.type===Kn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===an||b.magFilter===Ko||b.magFilter===Ls||b.magFilter===wi||b.minFilter===an||b.minFilter===Ko||b.minFilter===Ls||b.minFilter===wi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,rt[b.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,rt[b.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,rt[b.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,G[b.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,G[b.minFilter]),b.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,Q[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===en||b.minFilter!==Ls&&b.minFilter!==wi||b.type===Kn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");i.texParameterf(E,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function pt(E,b){let V=!1;E.__webglInit===void 0&&(E.__webglInit=!0,b.addEventListener("dispose",S));const Y=b.source;let K=d.get(Y);K===void 0&&(K={},d.set(Y,K));const j=z(b);if(j!==E.__cacheKey){K[j]===void 0&&(K[j]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),K[j].usedTimes++;const _t=K[E.__cacheKey];_t!==void 0&&(K[E.__cacheKey].usedTimes--,_t.usedTimes===0&&C(b)),E.__cacheKey=j,E.__webglTexture=K[j].texture}return V}function Ut(E,b,V){let Y=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(Y=i.TEXTURE_3D);const K=pt(E,b),j=b.source;e.bindTexture(Y,E.__webglTexture,i.TEXTURE0+V);const _t=n.get(j);if(j.version!==_t.__version||K===!0){e.activeTexture(i.TEXTURE0+V);const Z=Jt.getPrimaries(Jt.workingColorSpace),vt=b.colorSpace===$n?null:Jt.getPrimaries(b.colorSpace),gt=b.colorSpace===$n||Z===vt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);let nt=g(b.image,!1,r.maxTextureSize);nt=wt(b,nt);const lt=s.convert(b.format,b.colorSpace),Mt=s.convert(b.type);let ut=T(b.internalFormat,lt,Mt,b.colorSpace,b.isVideoTexture);J(Y,b);let dt;const Bt=b.mipmaps,kt=b.isVideoTexture!==!0&&ut!==zu,Xt=_t.__version===void 0||K===!0,zt=j.dataReady,$t=x(b,nt);if(b.isDepthTexture)ut=i.DEPTH_COMPONENT16,b.type===Kn?ut=i.DEPTH_COMPONENT32F:b.type===br?ut=i.DEPTH_COMPONENT24:b.type===ms&&(ut=i.DEPTH24_STENCIL8),Xt&&(kt?e.texStorage2D(i.TEXTURE_2D,1,ut,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,ut,nt.width,nt.height,0,lt,Mt,null));else if(b.isDataTexture)if(Bt.length>0){kt&&Xt&&e.texStorage2D(i.TEXTURE_2D,$t,ut,Bt[0].width,Bt[0].height);for(let ft=0,v=Bt.length;ft<v;ft++)dt=Bt[ft],kt?zt&&e.texSubImage2D(i.TEXTURE_2D,ft,0,0,dt.width,dt.height,lt,Mt,dt.data):e.texImage2D(i.TEXTURE_2D,ft,ut,dt.width,dt.height,0,lt,Mt,dt.data);b.generateMipmaps=!1}else kt?(Xt&&e.texStorage2D(i.TEXTURE_2D,$t,ut,nt.width,nt.height),zt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,nt.width,nt.height,lt,Mt,nt.data)):e.texImage2D(i.TEXTURE_2D,0,ut,nt.width,nt.height,0,lt,Mt,nt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){kt&&Xt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,$t,ut,Bt[0].width,Bt[0].height,nt.depth);for(let ft=0,v=Bt.length;ft<v;ft++)dt=Bt[ft],b.format!==pn?lt!==null?kt?zt&&e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ft,0,0,0,dt.width,dt.height,nt.depth,lt,dt.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ft,ut,dt.width,dt.height,nt.depth,0,dt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):kt?zt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ft,0,0,0,dt.width,dt.height,nt.depth,lt,Mt,dt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ft,ut,dt.width,dt.height,nt.depth,0,lt,Mt,dt.data)}else{kt&&Xt&&e.texStorage2D(i.TEXTURE_2D,$t,ut,Bt[0].width,Bt[0].height);for(let ft=0,v=Bt.length;ft<v;ft++)dt=Bt[ft],b.format!==pn?lt!==null?kt?zt&&e.compressedTexSubImage2D(i.TEXTURE_2D,ft,0,0,dt.width,dt.height,lt,dt.data):e.compressedTexImage2D(i.TEXTURE_2D,ft,ut,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):kt?zt&&e.texSubImage2D(i.TEXTURE_2D,ft,0,0,dt.width,dt.height,lt,Mt,dt.data):e.texImage2D(i.TEXTURE_2D,ft,ut,dt.width,dt.height,0,lt,Mt,dt.data)}else if(b.isDataArrayTexture)kt?(Xt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,$t,ut,nt.width,nt.height,nt.depth),zt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,lt,Mt,nt.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,ut,nt.width,nt.height,nt.depth,0,lt,Mt,nt.data);else if(b.isData3DTexture)kt?(Xt&&e.texStorage3D(i.TEXTURE_3D,$t,ut,nt.width,nt.height,nt.depth),zt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,lt,Mt,nt.data)):e.texImage3D(i.TEXTURE_3D,0,ut,nt.width,nt.height,nt.depth,0,lt,Mt,nt.data);else if(b.isFramebufferTexture){if(Xt)if(kt)e.texStorage2D(i.TEXTURE_2D,$t,ut,nt.width,nt.height);else{let ft=nt.width,v=nt.height;for(let O=0;O<$t;O++)e.texImage2D(i.TEXTURE_2D,O,ut,ft,v,0,lt,Mt,null),ft>>=1,v>>=1}}else if(Bt.length>0){if(kt&&Xt){const ft=Yt(Bt[0]);e.texStorage2D(i.TEXTURE_2D,$t,ut,ft.width,ft.height)}for(let ft=0,v=Bt.length;ft<v;ft++)dt=Bt[ft],kt?zt&&e.texSubImage2D(i.TEXTURE_2D,ft,0,0,lt,Mt,dt):e.texImage2D(i.TEXTURE_2D,ft,ut,lt,Mt,dt);b.generateMipmaps=!1}else if(kt){if(Xt){const ft=Yt(nt);e.texStorage2D(i.TEXTURE_2D,$t,ut,ft.width,ft.height)}zt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt,Mt,nt)}else e.texImage2D(i.TEXTURE_2D,0,ut,lt,Mt,nt);f(b)&&m(Y),_t.__version=j.version,b.onUpdate&&b.onUpdate(b)}E.__version=b.version}function Kt(E,b,V){if(b.image.length!==6)return;const Y=pt(E,b),K=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+V);const j=n.get(K);if(K.version!==j.__version||Y===!0){e.activeTexture(i.TEXTURE0+V);const _t=Jt.getPrimaries(Jt.workingColorSpace),Z=b.colorSpace===$n?null:Jt.getPrimaries(b.colorSpace),vt=b.colorSpace===$n||_t===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);const gt=b.isCompressedTexture||b.image[0].isCompressedTexture,nt=b.image[0]&&b.image[0].isDataTexture,lt=[];for(let v=0;v<6;v++)!gt&&!nt?lt[v]=g(b.image[v],!0,r.maxCubemapSize):lt[v]=nt?b.image[v].image:b.image[v],lt[v]=wt(b,lt[v]);const Mt=lt[0],ut=s.convert(b.format,b.colorSpace),dt=s.convert(b.type),Bt=T(b.internalFormat,ut,dt,b.colorSpace),kt=b.isVideoTexture!==!0,Xt=j.__version===void 0||Y===!0,zt=K.dataReady;let $t=x(b,Mt);J(i.TEXTURE_CUBE_MAP,b);let ft;if(gt){kt&&Xt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,$t,Bt,Mt.width,Mt.height);for(let v=0;v<6;v++){ft=lt[v].mipmaps;for(let O=0;O<ft.length;O++){const X=ft[O];b.format!==pn?ut!==null?kt?zt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+v,O,0,0,X.width,X.height,ut,X.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+v,O,Bt,X.width,X.height,0,X.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):kt?zt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+v,O,0,0,X.width,X.height,ut,dt,X.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+v,O,Bt,X.width,X.height,0,ut,dt,X.data)}}}else{if(ft=b.mipmaps,kt&&Xt){ft.length>0&&$t++;const v=Yt(lt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,$t,Bt,v.width,v.height)}for(let v=0;v<6;v++)if(nt){kt?zt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+v,0,0,0,lt[v].width,lt[v].height,ut,dt,lt[v].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+v,0,Bt,lt[v].width,lt[v].height,0,ut,dt,lt[v].data);for(let O=0;O<ft.length;O++){const et=ft[O].image[v].image;kt?zt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+v,O+1,0,0,et.width,et.height,ut,dt,et.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+v,O+1,Bt,et.width,et.height,0,ut,dt,et.data)}}else{kt?zt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+v,0,0,0,ut,dt,lt[v]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+v,0,Bt,ut,dt,lt[v]);for(let O=0;O<ft.length;O++){const X=ft[O];kt?zt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+v,O+1,0,0,ut,dt,X.image[v]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+v,O+1,Bt,ut,dt,X.image[v])}}}f(b)&&m(i.TEXTURE_CUBE_MAP),j.__version=K.version,b.onUpdate&&b.onUpdate(b)}E.__version=b.version}function W(E,b,V,Y,K,j){const _t=s.convert(V.format,V.colorSpace),Z=s.convert(V.type),vt=T(V.internalFormat,_t,Z,V.colorSpace);if(!n.get(b).__hasExternalTextures){const nt=Math.max(1,b.width>>j),lt=Math.max(1,b.height>>j);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,j,vt,nt,lt,b.depth,0,_t,Z,null):e.texImage2D(K,j,vt,nt,lt,0,_t,Z,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),yt(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,K,n.get(V).__webglTexture,0,Nt(b)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,K,n.get(V).__webglTexture,j),e.bindFramebuffer(i.FRAMEBUFFER,null)}function tt(E,b,V){if(i.bindRenderbuffer(i.RENDERBUFFER,E),b.depthBuffer&&!b.stencilBuffer){let Y=i.DEPTH_COMPONENT24;if(V||yt(b)){const K=b.depthTexture;K&&K.isDepthTexture&&(K.type===Kn?Y=i.DEPTH_COMPONENT32F:K.type===br&&(Y=i.DEPTH_COMPONENT24));const j=Nt(b);yt(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,j,Y,b.width,b.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,j,Y,b.width,b.height)}else i.renderbufferStorage(i.RENDERBUFFER,Y,b.width,b.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,E)}else if(b.depthBuffer&&b.stencilBuffer){const Y=Nt(b);V&&yt(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Y,i.DEPTH24_STENCIL8,b.width,b.height):yt(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Y,i.DEPTH24_STENCIL8,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,E)}else{const Y=b.textures;for(let K=0;K<Y.length;K++){const j=Y[K],_t=s.convert(j.format,j.colorSpace),Z=s.convert(j.type),vt=T(j.internalFormat,_t,Z,j.colorSpace),gt=Nt(b);V&&yt(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,gt,vt,b.width,b.height):yt(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,gt,vt,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,vt,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ht(E,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),R(b.depthTexture,0);const Y=n.get(b.depthTexture).__webglTexture,K=Nt(b);if(b.depthTexture.format===dr)yt(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Y,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Y,0);else if(b.depthTexture.format===ts)yt(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Y,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function at(E){const b=n.get(E),V=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!b.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");ht(b.__webglFramebuffer,E)}else if(V){b.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[Y]),b.__webglDepthbuffer[Y]=i.createRenderbuffer(),tt(b.__webglDepthbuffer[Y],E,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer=i.createRenderbuffer(),tt(b.__webglDepthbuffer,E,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function Tt(E,b,V){const Y=n.get(E);b!==void 0&&W(Y.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&at(E)}function Ct(E){const b=E.texture,V=n.get(E),Y=n.get(b);E.addEventListener("dispose",D);const K=E.textures,j=E.isWebGLCubeRenderTarget===!0,_t=K.length>1;if(_t||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=b.version,o.memory.textures++),j){V.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer[Z]=[];for(let vt=0;vt<b.mipmaps.length;vt++)V.__webglFramebuffer[Z][vt]=i.createFramebuffer()}else V.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer=[];for(let Z=0;Z<b.mipmaps.length;Z++)V.__webglFramebuffer[Z]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(_t)for(let Z=0,vt=K.length;Z<vt;Z++){const gt=n.get(K[Z]);gt.__webglTexture===void 0&&(gt.__webglTexture=i.createTexture(),o.memory.textures++)}if(E.samples>0&&yt(E)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let Z=0;Z<K.length;Z++){const vt=K[Z];V.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[Z]);const gt=s.convert(vt.format,vt.colorSpace),nt=s.convert(vt.type),lt=T(vt.internalFormat,gt,nt,vt.colorSpace,E.isXRRenderTarget===!0),Mt=Nt(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt,lt,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,V.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),tt(V.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),J(i.TEXTURE_CUBE_MAP,b);for(let Z=0;Z<6;Z++)if(b.mipmaps&&b.mipmaps.length>0)for(let vt=0;vt<b.mipmaps.length;vt++)W(V.__webglFramebuffer[Z][vt],E,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,vt);else W(V.__webglFramebuffer[Z],E,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);f(b)&&m(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(_t){for(let Z=0,vt=K.length;Z<vt;Z++){const gt=K[Z],nt=n.get(gt);e.bindTexture(i.TEXTURE_2D,nt.__webglTexture),J(i.TEXTURE_2D,gt),W(V.__webglFramebuffer,E,gt,i.COLOR_ATTACHMENT0+Z,i.TEXTURE_2D,0),f(gt)&&m(i.TEXTURE_2D)}e.unbindTexture()}else{let Z=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(Z=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Z,Y.__webglTexture),J(Z,b),b.mipmaps&&b.mipmaps.length>0)for(let vt=0;vt<b.mipmaps.length;vt++)W(V.__webglFramebuffer[vt],E,b,i.COLOR_ATTACHMENT0,Z,vt);else W(V.__webglFramebuffer,E,b,i.COLOR_ATTACHMENT0,Z,0);f(b)&&m(Z),e.unbindTexture()}E.depthBuffer&&at(E)}function Ft(E){const b=E.textures;for(let V=0,Y=b.length;V<Y;V++){const K=b[V];if(f(K)){const j=E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,_t=n.get(K).__webglTexture;e.bindTexture(j,_t),m(j),e.unbindTexture()}}}function N(E){if(E.samples>0&&yt(E)===!1){const b=E.textures,V=E.width,Y=E.height;let K=i.COLOR_BUFFER_BIT;const j=[],_t=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=n.get(E),vt=b.length>1;if(vt)for(let gt=0;gt<b.length;gt++)e.bindFramebuffer(i.FRAMEBUFFER,Z.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Z.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Z.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Z.__webglFramebuffer);for(let gt=0;gt<b.length;gt++){j.push(i.COLOR_ATTACHMENT0+gt),E.depthBuffer&&j.push(_t);const nt=Z.__ignoreDepthValues!==void 0?Z.__ignoreDepthValues:!1;if(nt===!1&&(E.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&Z.__isTransmissionRenderTarget!==!0&&(K|=i.STENCIL_BUFFER_BIT)),vt&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Z.__webglColorRenderbuffer[gt]),nt===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[_t]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_t])),vt){const lt=n.get(b[gt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,lt,0)}i.blitFramebuffer(0,0,V,Y,0,0,V,Y,K,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,j)}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),vt)for(let gt=0;gt<b.length;gt++){e.bindFramebuffer(i.FRAMEBUFFER,Z.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,Z.__webglColorRenderbuffer[gt]);const nt=n.get(b[gt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Z.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,nt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Z.__webglMultisampledFramebuffer)}}function Nt(E){return Math.min(r.maxSamples,E.samples)}function yt(E){const b=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ce(E){const b=o.render.frame;h.get(E)!==b&&(h.set(E,b),E.update())}function wt(E,b){const V=E.colorSpace,Y=E.format,K=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||V!==oi&&V!==$n&&(Jt.getTransfer(V)===ee?(Y!==pn||K!==Qn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),b}function Yt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=y,this.setTexture2D=R,this.setTexture2DArray=H,this.setTexture3D=$,this.setTextureCube=q,this.rebindTextures=Tt,this.setupRenderTarget=Ct,this.updateRenderTargetMipmap=Ft,this.updateMultisampleRenderTarget=N,this.setupDepthRenderbuffer=at,this.setupFrameBufferTexture=W,this.useMultisampledRTT=yt}function ax(i,t){function e(n,r=$n){let s;const o=Jt.getTransfer(r);if(n===Qn)return i.UNSIGNED_BYTE;if(n===Ou)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Fu)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Tf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Sf)return i.BYTE;if(n===Ef)return i.SHORT;if(n===Nu)return i.UNSIGNED_SHORT;if(n===Uu)return i.INT;if(n===br)return i.UNSIGNED_INT;if(n===Kn)return i.FLOAT;if(n===bo)return i.HALF_FLOAT;if(n===Af)return i.ALPHA;if(n===Cf)return i.RGB;if(n===pn)return i.RGBA;if(n===Pf)return i.LUMINANCE;if(n===Rf)return i.LUMINANCE_ALPHA;if(n===dr)return i.DEPTH_COMPONENT;if(n===ts)return i.DEPTH_STENCIL;if(n===Lf)return i.RED;if(n===Bu)return i.RED_INTEGER;if(n===Df)return i.RG;if(n===ku)return i.RG_INTEGER;if(n===Vu)return i.RGBA_INTEGER;if(n===jo||n===Zo||n===Jo||n===Qo)if(o===ee)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===jo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Zo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Jo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Qo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===jo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Zo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Jo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Qo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===nc||n===ic||n===rc||n===sc)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===nc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ic)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===rc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===sc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===zu)return s=t.get("WEBGL_compressed_texture_etc1"),s!==null?s.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===oc||n===ac)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===oc)return o===ee?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===ac)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===lc||n===cc||n===hc||n===uc||n===dc||n===pc||n===fc||n===mc||n===vc||n===_c||n===gc||n===xc||n===bc||n===yc)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===lc)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===cc)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===hc)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===uc)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===dc)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===pc)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===fc)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===mc)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===vc)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_c)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===gc)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===xc)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===bc)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===yc)return o===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ta||n===wc||n===Mc)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===ta)return o===ee?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===wc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Mc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===If||n===Sc||n===Ec||n===Tc)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===ta)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Sc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ec)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Tc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ms?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class lx extends tn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ne extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}}const cx={type:"move"};class Ea{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ne,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ne,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ne,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const g of t.hand.values()){const f=e.getJointPose(g,n),m=this._getHandJoint(c,g);f!==null&&(m.matrix.fromArray(f.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=f.radius),m.visible=f!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,_=.005;c.inputState.pinching&&d>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(cx)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ne;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const hx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ux=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class dx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const r=new Ue,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}render(t,e){if(this.texture!==null){if(this.mesh===null){const n=e.cameras[0].viewport,r=new ii({vertexShader:hx,fragmentShader:ux,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ie(new Fo(20,20),r)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}}class px extends Ii{constructor(t,e){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,_=null;const g=new dx,f=e.getContextAttributes();let m=null,T=null;const x=[],S=[],D=new it;let P=null;const C=new tn;C.layers.enable(1),C.viewport=new Ae;const U=new tn;U.layers.enable(2),U.viewport=new Ae;const M=[C,U],y=new lx;y.layers.enable(1),y.layers.enable(2);let I=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let tt=x[W];return tt===void 0&&(tt=new Ea,x[W]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(W){let tt=x[W];return tt===void 0&&(tt=new Ea,x[W]=tt),tt.getGripSpace()},this.getHand=function(W){let tt=x[W];return tt===void 0&&(tt=new Ea,x[W]=tt),tt.getHandSpace()};function R(W){const tt=S.indexOf(W.inputSource);if(tt===-1)return;const ht=x[tt];ht!==void 0&&(ht.update(W.inputSource,W.frame,c||o),ht.dispatchEvent({type:W.type,data:W.inputSource}))}function H(){r.removeEventListener("select",R),r.removeEventListener("selectstart",R),r.removeEventListener("selectend",R),r.removeEventListener("squeeze",R),r.removeEventListener("squeezestart",R),r.removeEventListener("squeezeend",R),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",$);for(let W=0;W<x.length;W++){const tt=S[W];tt!==null&&(S[W]=null,x[W].disconnect(tt))}I=null,z=null,g.reset(),t.setRenderTarget(m),p=null,d=null,u=null,r=null,T=null,Kt.stop(),n.isPresenting=!1,t.setPixelRatio(P),t.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(m=t.getRenderTarget(),r.addEventListener("select",R),r.addEventListener("selectstart",R),r.addEventListener("selectend",R),r.addEventListener("squeeze",R),r.addEventListener("squeezestart",R),r.addEventListener("squeezeend",R),r.addEventListener("end",H),r.addEventListener("inputsourceschange",$),f.xrCompatible!==!0&&await e.makeXRCompatible(),P=t.getPixelRatio(),t.getSize(D),r.renderState.layers===void 0){const tt={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,e,tt),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),T=new Ti(p.framebufferWidth,p.framebufferHeight,{format:pn,type:Qn,colorSpace:t.outputColorSpace,stencilBuffer:f.stencil})}else{let tt=null,ht=null,at=null;f.depth&&(at=f.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=f.stencil?ts:dr,ht=f.stencil?ms:br);const Tt={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:s};u=new XRWebGLBinding(r,e),d=u.createProjectionLayer(Tt),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),T=new Ti(d.textureWidth,d.textureHeight,{format:pn,type:Qn,depthTexture:new nd(d.textureWidth,d.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:f.stencil,colorSpace:t.outputColorSpace,samples:f.antialias?4:0});const Ct=t.properties.get(T);Ct.__ignoreDepthValues=d.ignoreDepthValues}T.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Kt.setContext(r),Kt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function $(W){for(let tt=0;tt<W.removed.length;tt++){const ht=W.removed[tt],at=S.indexOf(ht);at>=0&&(S[at]=null,x[at].disconnect(ht))}for(let tt=0;tt<W.added.length;tt++){const ht=W.added[tt];let at=S.indexOf(ht);if(at===-1){for(let Ct=0;Ct<x.length;Ct++)if(Ct>=S.length){S.push(ht),at=Ct;break}else if(S[Ct]===null){S[Ct]=ht,at=Ct;break}if(at===-1)break}const Tt=x[at];Tt&&Tt.connect(ht)}}const q=new A,rt=new A;function G(W,tt,ht){q.setFromMatrixPosition(tt.matrixWorld),rt.setFromMatrixPosition(ht.matrixWorld);const at=q.distanceTo(rt),Tt=tt.projectionMatrix.elements,Ct=ht.projectionMatrix.elements,Ft=Tt[14]/(Tt[10]-1),N=Tt[14]/(Tt[10]+1),Nt=(Tt[9]+1)/Tt[5],yt=(Tt[9]-1)/Tt[5],ce=(Tt[8]-1)/Tt[0],wt=(Ct[8]+1)/Ct[0],Yt=Ft*ce,E=Ft*wt,b=at/(-ce+wt),V=b*-ce;tt.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(V),W.translateZ(b),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const Y=Ft+b,K=N+b,j=Yt-V,_t=E+(at-V),Z=Nt*N/K*Y,vt=yt*N/K*Y;W.projectionMatrix.makePerspective(j,_t,Z,vt,Y,K),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function Q(W,tt){tt===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(tt.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;g.texture!==null&&(W.near=g.depthNear,W.far=g.depthFar),y.near=U.near=C.near=W.near,y.far=U.far=C.far=W.far,(I!==y.near||z!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),I=y.near,z=y.far,C.near=I,C.far=z,U.near=I,U.far=z,C.updateProjectionMatrix(),U.updateProjectionMatrix(),W.updateProjectionMatrix());const tt=W.parent,ht=y.cameras;Q(y,tt);for(let at=0;at<ht.length;at++)Q(ht[at],tt);ht.length===2?G(y,C,U):y.projectionMatrix.copy(C.projectionMatrix),J(W,y,tt)};function J(W,tt,ht){ht===null?W.matrix.copy(tt.matrixWorld):(W.matrix.copy(ht.matrixWorld),W.matrix.invert(),W.matrix.multiply(tt.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(tt.projectionMatrix),W.projectionMatrixInverse.copy(tt.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=es*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(W){l=W,d!==null&&(d.fixedFoveation=W),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=W)},this.hasDepthSensing=function(){return g.texture!==null};let pt=null;function Ut(W,tt){if(h=tt.getViewerPose(c||o),_=tt,h!==null){const ht=h.views;p!==null&&(t.setRenderTargetFramebuffer(T,p.framebuffer),t.setRenderTarget(T));let at=!1;ht.length!==y.cameras.length&&(y.cameras.length=0,at=!0);for(let Ct=0;Ct<ht.length;Ct++){const Ft=ht[Ct];let N=null;if(p!==null)N=p.getViewport(Ft);else{const yt=u.getViewSubImage(d,Ft);N=yt.viewport,Ct===0&&(t.setRenderTargetTextures(T,yt.colorTexture,d.ignoreDepthValues?void 0:yt.depthStencilTexture),t.setRenderTarget(T))}let Nt=M[Ct];Nt===void 0&&(Nt=new tn,Nt.layers.enable(Ct),Nt.viewport=new Ae,M[Ct]=Nt),Nt.matrix.fromArray(Ft.transform.matrix),Nt.matrix.decompose(Nt.position,Nt.quaternion,Nt.scale),Nt.projectionMatrix.fromArray(Ft.projectionMatrix),Nt.projectionMatrixInverse.copy(Nt.projectionMatrix).invert(),Nt.viewport.set(N.x,N.y,N.width,N.height),Ct===0&&(y.matrix.copy(Nt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),at===!0&&y.cameras.push(Nt)}const Tt=r.enabledFeatures;if(Tt&&Tt.includes("depth-sensing")){const Ct=u.getDepthInformation(ht[0]);Ct&&Ct.isValid&&Ct.texture&&g.init(t,Ct,r.renderState)}}for(let ht=0;ht<x.length;ht++){const at=S[ht],Tt=x[ht];at!==null&&Tt!==void 0&&Tt.update(at,tt,c||o)}g.render(t,y),pt&&pt(W,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),_=null}const Kt=new ed;Kt.setAnimationLoop(Ut),this.setAnimationLoop=function(W){pt=W},this.dispose=function(){}}}const fi=new Rn,fx=new re;function mx(i,t){function e(f,m){f.matrixAutoUpdate===!0&&f.updateMatrix(),m.value.copy(f.matrix)}function n(f,m){m.color.getRGB(f.fogColor.value,Zu(i)),m.isFog?(f.fogNear.value=m.near,f.fogFar.value=m.far):m.isFogExp2&&(f.fogDensity.value=m.density)}function r(f,m,T,x,S){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(f,m):m.isMeshToonMaterial?(s(f,m),u(f,m)):m.isMeshPhongMaterial?(s(f,m),h(f,m)):m.isMeshStandardMaterial?(s(f,m),d(f,m),m.isMeshPhysicalMaterial&&p(f,m,S)):m.isMeshMatcapMaterial?(s(f,m),_(f,m)):m.isMeshDepthMaterial?s(f,m):m.isMeshDistanceMaterial?(s(f,m),g(f,m)):m.isMeshNormalMaterial?s(f,m):m.isLineBasicMaterial?(o(f,m),m.isLineDashedMaterial&&a(f,m)):m.isPointsMaterial?l(f,m,T,x):m.isSpriteMaterial?c(f,m):m.isShadowMaterial?(f.color.value.copy(m.color),f.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(f,m){f.opacity.value=m.opacity,m.color&&f.diffuse.value.copy(m.color),m.emissive&&f.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(f.map.value=m.map,e(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,e(m.alphaMap,f.alphaMapTransform)),m.bumpMap&&(f.bumpMap.value=m.bumpMap,e(m.bumpMap,f.bumpMapTransform),f.bumpScale.value=m.bumpScale,m.side===Ve&&(f.bumpScale.value*=-1)),m.normalMap&&(f.normalMap.value=m.normalMap,e(m.normalMap,f.normalMapTransform),f.normalScale.value.copy(m.normalScale),m.side===Ve&&f.normalScale.value.negate()),m.displacementMap&&(f.displacementMap.value=m.displacementMap,e(m.displacementMap,f.displacementMapTransform),f.displacementScale.value=m.displacementScale,f.displacementBias.value=m.displacementBias),m.emissiveMap&&(f.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,f.emissiveMapTransform)),m.specularMap&&(f.specularMap.value=m.specularMap,e(m.specularMap,f.specularMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest);const T=t.get(m),x=T.envMap,S=T.envMapRotation;if(x&&(f.envMap.value=x,fi.copy(S),fi.x*=-1,fi.y*=-1,fi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(fi.y*=-1,fi.z*=-1),f.envMapRotation.value.setFromMatrix4(fx.makeRotationFromEuler(fi)),f.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=m.reflectivity,f.ior.value=m.ior,f.refractionRatio.value=m.refractionRatio),m.lightMap){f.lightMap.value=m.lightMap;const D=i._useLegacyLights===!0?Math.PI:1;f.lightMapIntensity.value=m.lightMapIntensity*D,e(m.lightMap,f.lightMapTransform)}m.aoMap&&(f.aoMap.value=m.aoMap,f.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,f.aoMapTransform))}function o(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,m.map&&(f.map.value=m.map,e(m.map,f.mapTransform))}function a(f,m){f.dashSize.value=m.dashSize,f.totalSize.value=m.dashSize+m.gapSize,f.scale.value=m.scale}function l(f,m,T,x){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.size.value=m.size*T,f.scale.value=x*.5,m.map&&(f.map.value=m.map,e(m.map,f.uvTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,e(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function c(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.rotation.value=m.rotation,m.map&&(f.map.value=m.map,e(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,e(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function h(f,m){f.specular.value.copy(m.specular),f.shininess.value=Math.max(m.shininess,1e-4)}function u(f,m){m.gradientMap&&(f.gradientMap.value=m.gradientMap)}function d(f,m){f.metalness.value=m.metalness,m.metalnessMap&&(f.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,f.metalnessMapTransform)),f.roughness.value=m.roughness,m.roughnessMap&&(f.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,f.roughnessMapTransform)),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)}function p(f,m,T){f.ior.value=m.ior,m.sheen>0&&(f.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),f.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(f.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,f.sheenColorMapTransform)),m.sheenRoughnessMap&&(f.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,f.sheenRoughnessMapTransform))),m.clearcoat>0&&(f.clearcoat.value=m.clearcoat,f.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(f.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,f.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(f.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ve&&f.clearcoatNormalScale.value.negate())),m.iridescence>0&&(f.iridescence.value=m.iridescence,f.iridescenceIOR.value=m.iridescenceIOR,f.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(f.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,f.iridescenceMapTransform)),m.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),m.transmission>0&&(f.transmission.value=m.transmission,f.transmissionSamplerMap.value=T.texture,f.transmissionSamplerSize.value.set(T.width,T.height),m.transmissionMap&&(f.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,f.transmissionMapTransform)),f.thickness.value=m.thickness,m.thicknessMap&&(f.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=m.attenuationDistance,f.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(f.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(f.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=m.specularIntensity,f.specularColor.value.copy(m.specularColor),m.specularColorMap&&(f.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,f.specularColorMapTransform)),m.specularIntensityMap&&(f.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,f.specularIntensityMapTransform))}function _(f,m){m.matcap&&(f.matcap.value=m.matcap)}function g(f,m){const T=t.get(m).light;f.referencePosition.value.setFromMatrixPosition(T.matrixWorld),f.nearDistance.value=T.shadow.camera.near,f.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function vx(i,t,e,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,x){const S=x.program;n.uniformBlockBinding(T,S)}function c(T,x){let S=r[T.id];S===void 0&&(_(T),S=h(T),r[T.id]=S,T.addEventListener("dispose",f));const D=x.program;n.updateUBOMapping(T,D);const P=t.render.frame;s[T.id]!==P&&(d(T),s[T.id]=P)}function h(T){const x=u();T.__bindingPointIndex=x;const S=i.createBuffer(),D=T.__size,P=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,D,P),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,S),S}function u(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){const x=r[T.id],S=T.uniforms,D=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let P=0,C=S.length;P<C;P++){const U=Array.isArray(S[P])?S[P]:[S[P]];for(let M=0,y=U.length;M<y;M++){const I=U[M];if(p(I,P,M,D)===!0){const z=I.__offset,R=Array.isArray(I.value)?I.value:[I.value];let H=0;for(let $=0;$<R.length;$++){const q=R[$],rt=g(q);typeof q=="number"||typeof q=="boolean"?(I.__data[0]=q,i.bufferSubData(i.UNIFORM_BUFFER,z+H,I.__data)):q.isMatrix3?(I.__data[0]=q.elements[0],I.__data[1]=q.elements[1],I.__data[2]=q.elements[2],I.__data[3]=0,I.__data[4]=q.elements[3],I.__data[5]=q.elements[4],I.__data[6]=q.elements[5],I.__data[7]=0,I.__data[8]=q.elements[6],I.__data[9]=q.elements[7],I.__data[10]=q.elements[8],I.__data[11]=0):(q.toArray(I.__data,H),H+=rt.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(T,x,S,D){const P=T.value,C=x+"_"+S;if(D[C]===void 0)return typeof P=="number"||typeof P=="boolean"?D[C]=P:D[C]=P.clone(),!0;{const U=D[C];if(typeof P=="number"||typeof P=="boolean"){if(U!==P)return D[C]=P,!0}else if(U.equals(P)===!1)return U.copy(P),!0}return!1}function _(T){const x=T.uniforms;let S=0;const D=16;for(let C=0,U=x.length;C<U;C++){const M=Array.isArray(x[C])?x[C]:[x[C]];for(let y=0,I=M.length;y<I;y++){const z=M[y],R=Array.isArray(z.value)?z.value:[z.value];for(let H=0,$=R.length;H<$;H++){const q=R[H],rt=g(q),G=S%D;G!==0&&D-G<rt.boundary&&(S+=D-G),z.__data=new Float32Array(rt.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=S,S+=rt.storage}}}const P=S%D;return P>0&&(S+=D-P),T.__size=S,T.__cache={},this}function g(T){const x={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(x.boundary=4,x.storage=4):T.isVector2?(x.boundary=8,x.storage=8):T.isVector3||T.isColor?(x.boundary=16,x.storage=12):T.isVector4?(x.boundary=16,x.storage=16):T.isMatrix3?(x.boundary=48,x.storage=48):T.isMatrix4?(x.boundary=64,x.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),x}function f(T){const x=T.target;x.removeEventListener("dispose",f);const S=o.indexOf(x.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function m(){for(const T in r)i.deleteBuffer(r[T]);o=[],r={},s={}}return{bind:l,update:c,dispose:m}}class _x{constructor(t={}){const{canvas:e=lm(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const p=new Uint32Array(4),_=new Int32Array(4);let g=null,f=null;const m=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=un,this._useLegacyLights=!1,this.toneMapping=Jn,this.toneMappingExposure=1;const x=this;let S=!1,D=0,P=0,C=null,U=-1,M=null;const y=new Ae,I=new Ae;let z=null;const R=new Ht(0);let H=0,$=e.width,q=e.height,rt=1,G=null,Q=null;const J=new Ae(0,0,$,q),pt=new Ae(0,0,$,q);let Ut=!1;const Kt=new td;let W=!1,tt=!1;const ht=new re,at=new it,Tt=new A,Ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ft(){return C===null?rt:1}let N=n;function Nt(w,L){const B=e.getContext(w,L);return B!==null?B:null}try{const w={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${hl}`),e.addEventListener("webglcontextlost",O,!1),e.addEventListener("webglcontextrestored",X,!1),e.addEventListener("webglcontextcreationerror",et,!1),N===null){const L="webgl2";if(N=Nt(L,w),N===null)throw Nt(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let yt,ce,wt,Yt,E,b,V,Y,K,j,_t,Z,vt,gt,nt,lt,Mt,ut,dt,Bt,kt,Xt,zt,$t;function ft(){yt=new Eg(N),yt.init(),ce=new gg(N,yt,t),Xt=new ax(N,yt),wt=new sx(N),Yt=new Cg(N),E=new X0,b=new ox(N,yt,wt,E,ce,Xt,Yt),V=new bg(x),Y=new Sg(x),K=new Im(N),zt=new vg(N,K),j=new Tg(N,K,Yt,zt),_t=new Rg(N,j,K,Yt),dt=new Pg(N,ce,b),lt=new xg(E),Z=new W0(x,V,Y,yt,ce,zt,lt),vt=new mx(x,E),gt=new Y0,nt=new Q0(yt),ut=new mg(x,V,Y,wt,_t,d,l),Mt=new rx(x,_t,ce),$t=new vx(N,Yt,ce,wt),Bt=new _g(N,yt,Yt),kt=new Ag(N,yt,Yt),Yt.programs=Z.programs,x.capabilities=ce,x.extensions=yt,x.properties=E,x.renderLists=gt,x.shadowMap=Mt,x.state=wt,x.info=Yt}ft();const v=new px(x,N);this.xr=v,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const w=yt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=yt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return rt},this.setPixelRatio=function(w){w!==void 0&&(rt=w,this.setSize($,q,!1))},this.getSize=function(w){return w.set($,q)},this.setSize=function(w,L,B=!0){if(v.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=w,q=L,e.width=Math.floor(w*rt),e.height=Math.floor(L*rt),B===!0&&(e.style.width=w+"px",e.style.height=L+"px"),this.setViewport(0,0,w,L)},this.getDrawingBufferSize=function(w){return w.set($*rt,q*rt).floor()},this.setDrawingBufferSize=function(w,L,B){$=w,q=L,rt=B,e.width=Math.floor(w*B),e.height=Math.floor(L*B),this.setViewport(0,0,w,L)},this.getCurrentViewport=function(w){return w.copy(y)},this.getViewport=function(w){return w.copy(J)},this.setViewport=function(w,L,B,k){w.isVector4?J.set(w.x,w.y,w.z,w.w):J.set(w,L,B,k),wt.viewport(y.copy(J).multiplyScalar(rt).round())},this.getScissor=function(w){return w.copy(pt)},this.setScissor=function(w,L,B,k){w.isVector4?pt.set(w.x,w.y,w.z,w.w):pt.set(w,L,B,k),wt.scissor(I.copy(pt).multiplyScalar(rt).round())},this.getScissorTest=function(){return Ut},this.setScissorTest=function(w){wt.setScissorTest(Ut=w)},this.setOpaqueSort=function(w){G=w},this.setTransparentSort=function(w){Q=w},this.getClearColor=function(w){return w.copy(ut.getClearColor())},this.setClearColor=function(){ut.setClearColor.apply(ut,arguments)},this.getClearAlpha=function(){return ut.getClearAlpha()},this.setClearAlpha=function(){ut.setClearAlpha.apply(ut,arguments)},this.clear=function(w=!0,L=!0,B=!0){let k=0;if(w){let F=!1;if(C!==null){const ot=C.texture.format;F=ot===Vu||ot===ku||ot===Bu}if(F){const ot=C.texture.type,mt=ot===Qn||ot===br||ot===Nu||ot===ms||ot===Ou||ot===Fu,bt=ut.getClearColor(),St=ut.getClearAlpha(),Pt=bt.r,At=bt.g,Rt=bt.b;mt?(p[0]=Pt,p[1]=At,p[2]=Rt,p[3]=St,N.clearBufferuiv(N.COLOR,0,p)):(_[0]=Pt,_[1]=At,_[2]=Rt,_[3]=St,N.clearBufferiv(N.COLOR,0,_))}else k|=N.COLOR_BUFFER_BIT}L&&(k|=N.DEPTH_BUFFER_BIT),B&&(k|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",O,!1),e.removeEventListener("webglcontextrestored",X,!1),e.removeEventListener("webglcontextcreationerror",et,!1),gt.dispose(),nt.dispose(),E.dispose(),V.dispose(),Y.dispose(),_t.dispose(),zt.dispose(),$t.dispose(),Z.dispose(),v.dispose(),v.removeEventListener("sessionstart",fe),v.removeEventListener("sessionend",me),He.stop()};function O(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function X(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const w=Yt.autoReset,L=Mt.enabled,B=Mt.autoUpdate,k=Mt.needsUpdate,F=Mt.type;ft(),Yt.autoReset=w,Mt.enabled=L,Mt.autoUpdate=B,Mt.needsUpdate=k,Mt.type=F}function et(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ct(w){const L=w.target;L.removeEventListener("dispose",ct),Vt(L)}function Vt(w){Ot(w),E.remove(w)}function Ot(w){const L=E.get(w).programs;L!==void 0&&(L.forEach(function(B){Z.releaseProgram(B)}),w.isShaderMaterial&&Z.releaseShaderCache(w))}this.renderBufferDirect=function(w,L,B,k,F,ot){L===null&&(L=Ct);const mt=F.isMesh&&F.matrixWorld.determinant()<0,bt=Cp(w,L,B,k,F);wt.setMaterial(k,mt);let St=B.index,Pt=1;if(k.wireframe===!0){if(St=j.getWireframeAttribute(B),St===void 0)return;Pt=2}const At=B.drawRange,Rt=B.attributes.position;let de=At.start*Pt,Ge=(At.start+At.count)*Pt;ot!==null&&(de=Math.max(de,ot.start*Pt),Ge=Math.min(Ge,(ot.start+ot.count)*Pt)),St!==null?(de=Math.max(de,0),Ge=Math.min(Ge,St.count)):Rt!=null&&(de=Math.max(de,0),Ge=Math.min(Ge,Rt.count));const Me=Ge-de;if(Me<0||Me===1/0)return;zt.setup(F,k,bt,B,St);let xn,oe=Bt;if(St!==null&&(xn=K.get(St),oe=kt,oe.setIndex(xn)),F.isMesh)k.wireframe===!0?(wt.setLineWidth(k.wireframeLinewidth*Ft()),oe.setMode(N.LINES)):oe.setMode(N.TRIANGLES);else if(F.isLine){let Lt=k.linewidth;Lt===void 0&&(Lt=1),wt.setLineWidth(Lt*Ft()),F.isLineSegments?oe.setMode(N.LINES):F.isLineLoop?oe.setMode(N.LINE_LOOP):oe.setMode(N.LINE_STRIP)}else F.isPoints?oe.setMode(N.POINTS):F.isSprite&&oe.setMode(N.TRIANGLES);if(F.isBatchedMesh)oe.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else if(F.isInstancedMesh)oe.renderInstances(de,Me,F.count);else if(B.isInstancedBufferGeometry){const Lt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Xo=Math.min(B.instanceCount,Lt);oe.renderInstances(de,Me,Xo)}else oe.render(de,Me)};function ne(w,L,B){w.transparent===!0&&w.side===$e&&w.forceSinglePass===!1?(w.side=Ve,w.needsUpdate=!0,Ps(w,L,B),w.side=ni,w.needsUpdate=!0,Ps(w,L,B),w.side=$e):Ps(w,L,B)}this.compile=function(w,L,B=null){B===null&&(B=w),f=nt.get(B),f.init(),T.push(f),B.traverseVisible(function(F){F.isLight&&F.layers.test(L.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),w!==B&&w.traverseVisible(function(F){F.isLight&&F.layers.test(L.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),f.setupLights(x._useLegacyLights);const k=new Set;return w.traverse(function(F){const ot=F.material;if(ot)if(Array.isArray(ot))for(let mt=0;mt<ot.length;mt++){const bt=ot[mt];ne(bt,B,F),k.add(bt)}else ne(ot,B,F),k.add(ot)}),T.pop(),f=null,k},this.compileAsync=function(w,L,B=null){const k=this.compile(w,L,B);return new Promise(F=>{function ot(){if(k.forEach(function(mt){E.get(mt).currentProgram.isReady()&&k.delete(mt)}),k.size===0){F(w);return}setTimeout(ot,10)}yt.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let we=null;function Zt(w){we&&we(w)}function fe(){He.stop()}function me(){He.start()}const He=new ed;He.setAnimationLoop(Zt),typeof self<"u"&&He.setContext(self),this.setAnimationLoop=function(w){we=w,v.setAnimationLoop(w),w===null?He.stop():He.start()},v.addEventListener("sessionstart",fe),v.addEventListener("sessionend",me),this.render=function(w,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),v.enabled===!0&&v.isPresenting===!0&&(v.cameraAutoUpdate===!0&&v.updateCamera(L),L=v.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,L,C),f=nt.get(w,T.length),f.init(),T.push(f),ht.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),Kt.setFromProjectionMatrix(ht),tt=this.localClippingEnabled,W=lt.init(this.clippingPlanes,tt),g=gt.get(w,m.length),g.init(),m.push(g),Ke(w,L,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(G,Q),this.info.render.frame++,W===!0&&lt.beginShadows();const B=f.state.shadowsArray;if(Mt.render(B,w,L),W===!0&&lt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(v.enabled===!1||v.isPresenting===!1||v.hasDepthSensing()===!1)&&ut.render(g,w),f.setupLights(x._useLegacyLights),L.isArrayCamera){const k=L.cameras;for(let F=0,ot=k.length;F<ot;F++){const mt=k[F];Nn(g,w,mt,mt.viewport)}}else Nn(g,w,L);C!==null&&(b.updateMultisampleRenderTarget(C),b.updateRenderTargetMipmap(C)),w.isScene===!0&&w.onAfterRender(x,w,L),zt.resetDefaultState(),U=-1,M=null,T.pop(),T.length>0?f=T[T.length-1]:f=null,m.pop(),m.length>0?g=m[m.length-1]:g=null};function Ke(w,L,B,k){if(w.visible===!1)return;if(w.layers.test(L.layers)){if(w.isGroup)B=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(L);else if(w.isLight)f.pushLight(w),w.castShadow&&f.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Kt.intersectsSprite(w)){k&&Tt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ht);const mt=_t.update(w),bt=w.material;bt.visible&&g.push(w,mt,bt,B,Tt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Kt.intersectsObject(w))){const mt=_t.update(w),bt=w.material;if(k&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Tt.copy(w.boundingSphere.center)):(mt.boundingSphere===null&&mt.computeBoundingSphere(),Tt.copy(mt.boundingSphere.center)),Tt.applyMatrix4(w.matrixWorld).applyMatrix4(ht)),Array.isArray(bt)){const St=mt.groups;for(let Pt=0,At=St.length;Pt<At;Pt++){const Rt=St[Pt],de=bt[Rt.materialIndex];de&&de.visible&&g.push(w,mt,de,B,Tt.z,Rt)}}else bt.visible&&g.push(w,mt,bt,B,Tt.z,null)}}const ot=w.children;for(let mt=0,bt=ot.length;mt<bt;mt++)Ke(ot[mt],L,B,k)}function Nn(w,L,B,k){const F=w.opaque,ot=w.transmissive,mt=w.transparent;f.setupLightsView(B),W===!0&&lt.setGlobalState(x.clippingPlanes,B),ot.length>0&&Fi(F,ot,L,B),k&&wt.viewport(y.copy(k)),F.length>0&&ai(F,L,B),ot.length>0&&ai(ot,L,B),mt.length>0&&ai(mt,L,B),wt.buffers.depth.setTest(!0),wt.buffers.depth.setMask(!0),wt.buffers.color.setMask(!0),wt.setPolygonOffset(!1)}function Fi(w,L,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;if(f.state.transmissionRenderTarget===null){f.state.transmissionRenderTarget=new Ti(1,1,{generateMipmaps:!0,type:yt.has("EXT_color_buffer_half_float")||yt.has("EXT_color_buffer_float")?bo:Qn,minFilter:wi,samples:4,stencilBuffer:s});const Pt=E.get(f.state.transmissionRenderTarget);Pt.__isTransmissionRenderTarget=!0}const ot=f.state.transmissionRenderTarget;x.getDrawingBufferSize(at),ot.setSize(at.x,at.y);const mt=x.getRenderTarget();x.setRenderTarget(ot),x.getClearColor(R),H=x.getClearAlpha(),H<1&&x.setClearColor(16777215,.5),x.clear();const bt=x.toneMapping;x.toneMapping=Jn,ai(w,B,k),b.updateMultisampleRenderTarget(ot),b.updateRenderTargetMipmap(ot);let St=!1;for(let Pt=0,At=L.length;Pt<At;Pt++){const Rt=L[Pt],de=Rt.object,Ge=Rt.geometry,Me=Rt.material,xn=Rt.group;if(Me.side===$e&&de.layers.test(k.layers)){const oe=Me.side;Me.side=Ve,Me.needsUpdate=!0,Xl(de,B,k,Ge,Me,xn),Me.side=oe,Me.needsUpdate=!0,St=!0}}St===!0&&(b.updateMultisampleRenderTarget(ot),b.updateRenderTargetMipmap(ot)),x.setRenderTarget(mt),x.setClearColor(R,H),x.toneMapping=bt}function ai(w,L,B){const k=L.isScene===!0?L.overrideMaterial:null;for(let F=0,ot=w.length;F<ot;F++){const mt=w[F],bt=mt.object,St=mt.geometry,Pt=k===null?mt.material:k,At=mt.group;bt.layers.test(B.layers)&&Xl(bt,L,B,St,Pt,At)}}function Xl(w,L,B,k,F,ot){w.onBeforeRender(x,L,B,k,F,ot),w.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),F.onBeforeRender(x,L,B,k,w,ot),F.transparent===!0&&F.side===$e&&F.forceSinglePass===!1?(F.side=Ve,F.needsUpdate=!0,x.renderBufferDirect(B,L,k,F,w,ot),F.side=ni,F.needsUpdate=!0,x.renderBufferDirect(B,L,k,F,w,ot),F.side=$e):x.renderBufferDirect(B,L,k,F,w,ot),w.onAfterRender(x,L,B,k,F,ot)}function Ps(w,L,B){L.isScene!==!0&&(L=Ct);const k=E.get(w),F=f.state.lights,ot=f.state.shadowsArray,mt=F.state.version,bt=Z.getParameters(w,F.state,ot,L,B),St=Z.getProgramCacheKey(bt);let Pt=k.programs;k.environment=w.isMeshStandardMaterial?L.environment:null,k.fog=L.fog,k.envMap=(w.isMeshStandardMaterial?Y:V).get(w.envMap||k.environment),k.envMapRotation=k.environment!==null&&w.envMap===null?L.environmentRotation:w.envMapRotation,Pt===void 0&&(w.addEventListener("dispose",ct),Pt=new Map,k.programs=Pt);let At=Pt.get(St);if(At!==void 0){if(k.currentProgram===At&&k.lightsStateVersion===mt)return Yl(w,bt),At}else bt.uniforms=Z.getUniforms(w),w.onBuild(B,bt,x),w.onBeforeCompile(bt,x),At=Z.acquireProgram(bt,St),Pt.set(St,At),k.uniforms=bt.uniforms;const Rt=k.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Rt.clippingPlanes=lt.uniform),Yl(w,bt),k.needsLights=Rp(w),k.lightsStateVersion=mt,k.needsLights&&(Rt.ambientLightColor.value=F.state.ambient,Rt.lightProbe.value=F.state.probe,Rt.directionalLights.value=F.state.directional,Rt.directionalLightShadows.value=F.state.directionalShadow,Rt.spotLights.value=F.state.spot,Rt.spotLightShadows.value=F.state.spotShadow,Rt.rectAreaLights.value=F.state.rectArea,Rt.ltc_1.value=F.state.rectAreaLTC1,Rt.ltc_2.value=F.state.rectAreaLTC2,Rt.pointLights.value=F.state.point,Rt.pointLightShadows.value=F.state.pointShadow,Rt.hemisphereLights.value=F.state.hemi,Rt.directionalShadowMap.value=F.state.directionalShadowMap,Rt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Rt.spotShadowMap.value=F.state.spotShadowMap,Rt.spotLightMatrix.value=F.state.spotLightMatrix,Rt.spotLightMap.value=F.state.spotLightMap,Rt.pointShadowMap.value=F.state.pointShadowMap,Rt.pointShadowMatrix.value=F.state.pointShadowMatrix),k.currentProgram=At,k.uniformsList=null,At}function $l(w){if(w.uniformsList===null){const L=w.currentProgram.getUniforms();w.uniformsList=po.seqWithValue(L.seq,w.uniforms)}return w.uniformsList}function Yl(w,L){const B=E.get(w);B.outputColorSpace=L.outputColorSpace,B.batching=L.batching,B.instancing=L.instancing,B.instancingColor=L.instancingColor,B.instancingMorph=L.instancingMorph,B.skinning=L.skinning,B.morphTargets=L.morphTargets,B.morphNormals=L.morphNormals,B.morphColors=L.morphColors,B.morphTargetsCount=L.morphTargetsCount,B.numClippingPlanes=L.numClippingPlanes,B.numIntersection=L.numClipIntersection,B.vertexAlphas=L.vertexAlphas,B.vertexTangents=L.vertexTangents,B.toneMapping=L.toneMapping}function Cp(w,L,B,k,F){L.isScene!==!0&&(L=Ct),b.resetTextureUnits();const ot=L.fog,mt=k.isMeshStandardMaterial?L.environment:null,bt=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:oi,St=(k.isMeshStandardMaterial?Y:V).get(k.envMap||mt),Pt=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,At=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Rt=!!B.morphAttributes.position,de=!!B.morphAttributes.normal,Ge=!!B.morphAttributes.color;let Me=Jn;k.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Me=x.toneMapping);const xn=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,oe=xn!==void 0?xn.length:0,Lt=E.get(k),Xo=f.state.lights;if(W===!0&&(tt===!0||w!==M)){const je=w===M&&k.id===U;lt.setState(k,w,je)}let ie=!1;k.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==Xo.state.version||Lt.outputColorSpace!==bt||F.isBatchedMesh&&Lt.batching===!1||!F.isBatchedMesh&&Lt.batching===!0||F.isInstancedMesh&&Lt.instancing===!1||!F.isInstancedMesh&&Lt.instancing===!0||F.isSkinnedMesh&&Lt.skinning===!1||!F.isSkinnedMesh&&Lt.skinning===!0||F.isInstancedMesh&&Lt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Lt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Lt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Lt.instancingMorph===!1&&F.morphTexture!==null||Lt.envMap!==St||k.fog===!0&&Lt.fog!==ot||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==lt.numPlanes||Lt.numIntersection!==lt.numIntersection)||Lt.vertexAlphas!==Pt||Lt.vertexTangents!==At||Lt.morphTargets!==Rt||Lt.morphNormals!==de||Lt.morphColors!==Ge||Lt.toneMapping!==Me||Lt.morphTargetsCount!==oe)&&(ie=!0):(ie=!0,Lt.__version=k.version);let li=Lt.currentProgram;ie===!0&&(li=Ps(k,L,F));let ql=!1,Rr=!1,$o=!1;const Ce=li.getUniforms(),Un=Lt.uniforms;if(wt.useProgram(li.program)&&(ql=!0,Rr=!0,$o=!0),k.id!==U&&(U=k.id,Rr=!0),ql||M!==w){Ce.setValue(N,"projectionMatrix",w.projectionMatrix),Ce.setValue(N,"viewMatrix",w.matrixWorldInverse);const je=Ce.map.cameraPosition;je!==void 0&&je.setValue(N,Tt.setFromMatrixPosition(w.matrixWorld)),ce.logarithmicDepthBuffer&&Ce.setValue(N,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&Ce.setValue(N,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,Rr=!0,$o=!0)}if(F.isSkinnedMesh){Ce.setOptional(N,F,"bindMatrix"),Ce.setOptional(N,F,"bindMatrixInverse");const je=F.skeleton;je&&(je.boneTexture===null&&je.computeBoneTexture(),Ce.setValue(N,"boneTexture",je.boneTexture,b))}F.isBatchedMesh&&(Ce.setOptional(N,F,"batchingTexture"),Ce.setValue(N,"batchingTexture",F._matricesTexture,b));const Yo=B.morphAttributes;if((Yo.position!==void 0||Yo.normal!==void 0||Yo.color!==void 0)&&dt.update(F,B,li),(Rr||Lt.receiveShadow!==F.receiveShadow)&&(Lt.receiveShadow=F.receiveShadow,Ce.setValue(N,"receiveShadow",F.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(Un.envMap.value=St,Un.flipEnvMap.value=St.isCubeTexture&&St.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&L.environment!==null&&(Un.envMapIntensity.value=L.environmentIntensity),Rr&&(Ce.setValue(N,"toneMappingExposure",x.toneMappingExposure),Lt.needsLights&&Pp(Un,$o),ot&&k.fog===!0&&vt.refreshFogUniforms(Un,ot),vt.refreshMaterialUniforms(Un,k,rt,q,f.state.transmissionRenderTarget),po.upload(N,$l(Lt),Un,b)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(po.upload(N,$l(Lt),Un,b),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&Ce.setValue(N,"center",F.center),Ce.setValue(N,"modelViewMatrix",F.modelViewMatrix),Ce.setValue(N,"normalMatrix",F.normalMatrix),Ce.setValue(N,"modelMatrix",F.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const je=k.uniformsGroups;for(let qo=0,Lp=je.length;qo<Lp;qo++){const Kl=je[qo];$t.update(Kl,li),$t.bind(Kl,li)}}return li}function Pp(w,L){w.ambientLightColor.needsUpdate=L,w.lightProbe.needsUpdate=L,w.directionalLights.needsUpdate=L,w.directionalLightShadows.needsUpdate=L,w.pointLights.needsUpdate=L,w.pointLightShadows.needsUpdate=L,w.spotLights.needsUpdate=L,w.spotLightShadows.needsUpdate=L,w.rectAreaLights.needsUpdate=L,w.hemisphereLights.needsUpdate=L}function Rp(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(w,L,B){E.get(w.texture).__webglTexture=L,E.get(w.depthTexture).__webglTexture=B;const k=E.get(w);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=B===void 0,k.__autoAllocateDepthBuffer||yt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,L){const B=E.get(w);B.__webglFramebuffer=L,B.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(w,L=0,B=0){C=w,D=L,P=B;let k=!0,F=null,ot=!1,mt=!1;if(w){const St=E.get(w);St.__useDefaultFramebuffer!==void 0?(wt.bindFramebuffer(N.FRAMEBUFFER,null),k=!1):St.__webglFramebuffer===void 0?b.setupRenderTarget(w):St.__hasExternalTextures&&b.rebindTextures(w,E.get(w.texture).__webglTexture,E.get(w.depthTexture).__webglTexture);const Pt=w.texture;(Pt.isData3DTexture||Pt.isDataArrayTexture||Pt.isCompressedArrayTexture)&&(mt=!0);const At=E.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(At[L])?F=At[L][B]:F=At[L],ot=!0):w.samples>0&&b.useMultisampledRTT(w)===!1?F=E.get(w).__webglMultisampledFramebuffer:Array.isArray(At)?F=At[B]:F=At,y.copy(w.viewport),I.copy(w.scissor),z=w.scissorTest}else y.copy(J).multiplyScalar(rt).floor(),I.copy(pt).multiplyScalar(rt).floor(),z=Ut;if(wt.bindFramebuffer(N.FRAMEBUFFER,F)&&k&&wt.drawBuffers(w,F),wt.viewport(y),wt.scissor(I),wt.setScissorTest(z),ot){const St=E.get(w.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+L,St.__webglTexture,B)}else if(mt){const St=E.get(w.texture),Pt=L||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,St.__webglTexture,B||0,Pt)}U=-1},this.readRenderTargetPixels=function(w,L,B,k,F,ot,mt){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let bt=E.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&mt!==void 0&&(bt=bt[mt]),bt){wt.bindFramebuffer(N.FRAMEBUFFER,bt);try{const St=w.texture,Pt=St.format,At=St.type;if(Pt!==pn&&Xt.convert(Pt)!==N.getParameter(N.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Rt=At===bo&&(yt.has("EXT_color_buffer_half_float")||yt.has("EXT_color_buffer_float"));if(At!==Qn&&Xt.convert(At)!==N.getParameter(N.IMPLEMENTATION_COLOR_READ_TYPE)&&At!==Kn&&!Rt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=w.width-k&&B>=0&&B<=w.height-F&&N.readPixels(L,B,k,F,Xt.convert(Pt),Xt.convert(At),ot)}finally{const St=C!==null?E.get(C).__webglFramebuffer:null;wt.bindFramebuffer(N.FRAMEBUFFER,St)}}},this.copyFramebufferToTexture=function(w,L,B=0){const k=Math.pow(2,-B),F=Math.floor(L.image.width*k),ot=Math.floor(L.image.height*k);b.setTexture2D(L,0),N.copyTexSubImage2D(N.TEXTURE_2D,B,0,0,w.x,w.y,F,ot),wt.unbindTexture()},this.copyTextureToTexture=function(w,L,B,k=0){const F=L.image.width,ot=L.image.height,mt=Xt.convert(B.format),bt=Xt.convert(B.type);b.setTexture2D(B,0),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,B.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,B.unpackAlignment),L.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,k,w.x,w.y,F,ot,mt,bt,L.image.data):L.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,k,w.x,w.y,L.mipmaps[0].width,L.mipmaps[0].height,mt,L.mipmaps[0].data):N.texSubImage2D(N.TEXTURE_2D,k,w.x,w.y,mt,bt,L.image),k===0&&B.generateMipmaps&&N.generateMipmap(N.TEXTURE_2D),wt.unbindTexture()},this.copyTextureToTexture3D=function(w,L,B,k,F=0){const ot=Math.round(w.max.x-w.min.x),mt=Math.round(w.max.y-w.min.y),bt=w.max.z-w.min.z+1,St=Xt.convert(k.format),Pt=Xt.convert(k.type);let At;if(k.isData3DTexture)b.setTexture3D(k,0),At=N.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)b.setTexture2DArray(k,0),At=N.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,k.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,k.unpackAlignment);const Rt=N.getParameter(N.UNPACK_ROW_LENGTH),de=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Ge=N.getParameter(N.UNPACK_SKIP_PIXELS),Me=N.getParameter(N.UNPACK_SKIP_ROWS),xn=N.getParameter(N.UNPACK_SKIP_IMAGES),oe=B.isCompressedTexture?B.mipmaps[F]:B.image;N.pixelStorei(N.UNPACK_ROW_LENGTH,oe.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,oe.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,w.min.x),N.pixelStorei(N.UNPACK_SKIP_ROWS,w.min.y),N.pixelStorei(N.UNPACK_SKIP_IMAGES,w.min.z),B.isDataTexture||B.isData3DTexture?N.texSubImage3D(At,F,L.x,L.y,L.z,ot,mt,bt,St,Pt,oe.data):k.isCompressedArrayTexture?N.compressedTexSubImage3D(At,F,L.x,L.y,L.z,ot,mt,bt,St,oe.data):N.texSubImage3D(At,F,L.x,L.y,L.z,ot,mt,bt,St,Pt,oe),N.pixelStorei(N.UNPACK_ROW_LENGTH,Rt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,de),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ge),N.pixelStorei(N.UNPACK_SKIP_ROWS,Me),N.pixelStorei(N.UNPACK_SKIP_IMAGES,xn),F===0&&k.generateMipmaps&&N.generateMipmap(At),wt.unbindTexture()},this.initTexture=function(w){w.isCubeTexture?b.setTextureCube(w,0):w.isData3DTexture?b.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?b.setTexture2DArray(w,0):b.setTexture2D(w,0),wt.unbindTexture()},this.resetState=function(){D=0,P=0,C=null,wt.reset(),zt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return An}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===ul?"display-p3":"srgb",e.unpackColorSpace=Jt.workingColorSpace===Uo?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class gx extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Rn,this.environmentIntensity=1,this.environmentRotation=new Rn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class xx{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ja,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=mn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Wu("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let r=0,s=this.stride;r<s;r++)this.array[t+r]=e.array[n+r];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=mn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Le=new A;class To{constructor(t,e,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix4(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyNormalMatrix(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.transformDirection(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=jt(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=jt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=ln(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=ln(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=ln(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=ln(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array),r=jt(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=jt(e,this.array),n=jt(n,this.array),r=jt(r,this.array),s=jt(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=r,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return new hn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new To(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const r=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class bx extends Ni{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ht(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ir;const Ur=new A,rr=new A,sr=new A,or=new it,Or=new it,ld=new re,Qs=new A,Fr=new A,to=new A,_h=new it,Ta=new it,gh=new it;class yx extends Te{constructor(t=new bx){if(super(),this.isSprite=!0,this.type="Sprite",ir===void 0){ir=new pe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new xx(e,5);ir.setIndex([0,1,2,0,2,3]),ir.setAttribute("position",new To(n,3,0,!1)),ir.setAttribute("uv",new To(n,2,3,!1))}this.geometry=ir,this.material=t,this.center=new it(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),rr.setFromMatrixScale(this.matrixWorld),ld.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),sr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&rr.multiplyScalar(-sr.z);const n=this.material.rotation;let r,s;n!==0&&(s=Math.cos(n),r=Math.sin(n));const o=this.center;eo(Qs.set(-.5,-.5,0),sr,o,rr,r,s),eo(Fr.set(.5,-.5,0),sr,o,rr,r,s),eo(to.set(.5,.5,0),sr,o,rr,r,s),_h.set(0,0),Ta.set(1,0),gh.set(1,1);let a=t.ray.intersectTriangle(Qs,Fr,to,!1,Ur);if(a===null&&(eo(Fr.set(-.5,.5,0),sr,o,rr,r,s),Ta.set(0,1),a=t.ray.intersectTriangle(Qs,to,Fr,!1,Ur),a===null))return;const l=t.ray.origin.distanceTo(Ur);l<t.near||l>t.far||e.push({distance:l,point:Ur.clone(),uv:cn.getInterpolation(Ur,Qs,Fr,to,_h,Ta,gh,new it),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function eo(i,t,e,n,r,s){or.subVectors(i,e).addScalar(.5).multiply(n),r!==void 0?(Or.x=s*or.x-r*or.y,Or.y=r*or.x+s*or.y):Or.copy(or),i.copy(t),i.x+=Or.x,i.y+=Or.y,i.applyMatrix4(ld)}class ri extends Ni{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const xh=new A,bh=new A,yh=new re,Aa=new Oo,no=new _s;class fr extends Te{constructor(t=new pe,e=new ri){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let r=1,s=e.count;r<s;r++)xh.fromBufferAttribute(e,r-1),bh.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=xh.distanceTo(bh);t.setAttribute("lineDistance",new ue(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),no.copy(n.boundingSphere),no.applyMatrix4(r),no.radius+=s,t.ray.intersectsSphere(no)===!1)return;yh.copy(r).invert(),Aa.copy(t.ray).applyMatrix4(yh);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new A,h=new A,u=new A,d=new A,p=this.isLineSegments?2:1,_=n.index,f=n.attributes.position;if(_!==null){const m=Math.max(0,o.start),T=Math.min(_.count,o.start+o.count);for(let x=m,S=T-1;x<S;x+=p){const D=_.getX(x),P=_.getX(x+1);if(c.fromBufferAttribute(f,D),h.fromBufferAttribute(f,P),Aa.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const U=t.ray.origin.distanceTo(d);U<t.near||U>t.far||e.push({distance:U,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const m=Math.max(0,o.start),T=Math.min(f.count,o.start+o.count);for(let x=m,S=T-1;x<S;x+=p){if(c.fromBufferAttribute(f,x),h.fromBufferAttribute(f,x+1),Aa.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const P=t.ray.origin.distanceTo(d);P<t.near||P>t.far||e.push({distance:P,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const wh=new A,Mh=new A;class fl extends fr{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let r=0,s=e.count;r<s;r+=2)wh.fromBufferAttribute(e,r),Mh.fromBufferAttribute(e,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+wh.distanceTo(Mh);t.setAttribute("lineDistance",new ue(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class cd extends Ni{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ht(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Sh=new re,Ja=new Oo,io=new _s,ro=new A;class wx extends Te{constructor(t=new pe,e=new cd){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),io.copy(n.boundingSphere),io.applyMatrix4(r),io.radius+=s,t.ray.intersectsSphere(io)===!1)return;Sh.copy(r).invert(),Ja.copy(t.ray).applyMatrix4(Sh);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let _=d,g=p;_<g;_++){const f=c.getX(_);ro.fromBufferAttribute(u,f),Eh(ro,f,l,r,t,e,this)}}else{const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let _=d,g=p;_<g;_++)ro.fromBufferAttribute(u,_),Eh(ro,_,l,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Eh(i,t,e,n,r,s,o){const a=Ja.distanceSqToPoint(i);if(a<e){const l=new A;Ja.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,object:o})}}class gn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,r=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(r),e.push(s),r=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let r=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=n[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===o)return r/(s-1);const h=n[r],d=n[r+1]-h,p=(o-h)/d;return(r+p)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=e||(o.isVector2?new it:new A);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new A,r=[],s=[],o=[],a=new A,l=new re;for(let p=0;p<=t;p++){const _=p/t;r[p]=this.getTangentAt(_,new A)}s[0]=new A,o[0]=new A;let c=Number.MAX_VALUE;const h=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=t;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const _=Math.acos(Ee(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,_))}o[p].crossVectors(r[p],s[p])}if(e===!0){let p=Math.acos(Ee(s[0].dot(s[t]),-1,1));p/=t,r[0].dot(a.crossVectors(s[0],s[t]))>0&&(p=-p);for(let _=1;_<=t;_++)s[_].applyMatrix4(l.makeRotationAxis(r[_],p*_)),o[_].crossVectors(r[_],s[_])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ml extends gn{constructor(t=0,e=0,n=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new it){const n=e,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*h-p*u+this.aX,c=d*u+p*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Mx extends ml{constructor(t,e,n,r,s,o){super(t,e,n,n,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function vl(){let i=0,t=0,e=0,n=0;function r(s,o,a,l){i=s,t=a,e=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let d=(o-s)/c-(a-s)/(c+h)+(a-o)/h,p=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,p*=h,r(o,a,d,p)},calc:function(s){const o=s*s,a=o*s;return i+t*s+e*o+n*a}}}const so=new A,Ca=new vl,Pa=new vl,Ra=new vl;class Sx extends gn{constructor(t=[],e=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=r}getPoint(t,e=new A){const n=e,r=this.points,s=r.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=r[(a-1)%s]:(so.subVectors(r[0],r[1]).add(r[0]),c=so);const u=r[a%s],d=r[(a+1)%s];if(this.closed||a+2<s?h=r[(a+2)%s]:(so.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=so),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(u),p),g=Math.pow(u.distanceToSquared(d),p),f=Math.pow(d.distanceToSquared(h),p);g<1e-4&&(g=1),_<1e-4&&(_=g),f<1e-4&&(f=g),Ca.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,_,g,f),Pa.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,_,g,f),Ra.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,_,g,f)}else this.curveType==="catmullrom"&&(Ca.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Pa.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Ra.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Ca.calc(l),Pa.calc(l),Ra.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new A().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Th(i,t,e,n,r){const s=(n-t)*.5,o=(r-e)*.5,a=i*i,l=i*a;return(2*e-2*n+s+o)*l+(-3*e+3*n-2*s-o)*a+s*i+e}function Ex(i,t){const e=1-i;return e*e*t}function Tx(i,t){return 2*(1-i)*i*t}function Ax(i,t){return i*i*t}function Yr(i,t,e,n){return Ex(i,t)+Tx(i,e)+Ax(i,n)}function Cx(i,t){const e=1-i;return e*e*e*t}function Px(i,t){const e=1-i;return 3*e*e*i*t}function Rx(i,t){return 3*(1-i)*i*i*t}function Lx(i,t){return i*i*i*t}function qr(i,t,e,n,r){return Cx(i,t)+Px(i,e)+Rx(i,n)+Lx(i,r)}class hd extends gn{constructor(t=new it,e=new it,n=new it,r=new it){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new it){const n=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(qr(t,r.x,s.x,o.x,a.x),qr(t,r.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Dx extends gn{constructor(t=new A,e=new A,n=new A,r=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new A){const n=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(qr(t,r.x,s.x,o.x,a.x),qr(t,r.y,s.y,o.y,a.y),qr(t,r.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ud extends gn{constructor(t=new it,e=new it){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new it){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new it){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ix extends gn{constructor(t=new A,e=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new A){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new A){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class dd extends gn{constructor(t=new it,e=new it,n=new it){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new it){const n=e,r=this.v0,s=this.v1,o=this.v2;return n.set(Yr(t,r.x,s.x,o.x),Yr(t,r.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Nx extends gn{constructor(t=new A,e=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new A){const n=e,r=this.v0,s=this.v1,o=this.v2;return n.set(Yr(t,r.x,s.x,o.x),Yr(t,r.y,s.y,o.y),Yr(t,r.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class pd extends gn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new it){const n=e,r=this.points,s=(r.length-1)*t,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],h=r[o>r.length-2?r.length-1:o+1],u=r[o>r.length-3?r.length-1:o+2];return n.set(Th(a,l.x,c.x,h.x,u.x),Th(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new it().fromArray(r))}return this}}var Ah=Object.freeze({__proto__:null,ArcCurve:Mx,CatmullRomCurve3:Sx,CubicBezierCurve:hd,CubicBezierCurve3:Dx,EllipseCurve:ml,LineCurve:ud,LineCurve3:Ix,QuadraticBezierCurve:dd,QuadraticBezierCurve3:Nx,SplineCurve:pd});class Ux extends gn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ah[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const o=r[s]-n,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,r=this.curves.length;n<r;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(new Ah[r.type]().fromJSON(r))}return this}}class Ch extends Ux{constructor(t){super(),this.type="Path",this.currentPoint=new it,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new ud(this.currentPoint.clone(),new it(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,r){const s=new dd(this.currentPoint.clone(),new it(t,e),new it(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(t,e,n,r,s,o){const a=new hd(this.currentPoint.clone(),new it(t,e),new it(n,r),new it(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new pd(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,r,s,o),this}absarc(t,e,n,r,s,o){return this.absellipse(t,e,n,n,r,s,o),this}ellipse(t,e,n,r,s,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,r,s,o,a,l),this}absellipse(t,e,n,r,s,o,a,l){const c=new ml(t,e,n,r,s,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class _l extends pe{constructor(t=1,e=1,n=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const h=[],u=[],d=[],p=[];let _=0;const g=[],f=n/2;let m=0;T(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new ue(u,3)),this.setAttribute("normal",new ue(d,3)),this.setAttribute("uv",new ue(p,2));function T(){const S=new A,D=new A;let P=0;const C=(e-t)/n;for(let U=0;U<=s;U++){const M=[],y=U/s,I=y*(e-t)+t;for(let z=0;z<=r;z++){const R=z/r,H=R*l+a,$=Math.sin(H),q=Math.cos(H);D.x=I*$,D.y=-y*n+f,D.z=I*q,u.push(D.x,D.y,D.z),S.set($,C,q).normalize(),d.push(S.x,S.y,S.z),p.push(R,1-y),M.push(_++)}g.push(M)}for(let U=0;U<r;U++)for(let M=0;M<s;M++){const y=g[M][U],I=g[M+1][U],z=g[M+1][U+1],R=g[M][U+1];h.push(y,I,R),h.push(I,z,R),P+=6}c.addGroup(m,P,0),m+=P}function x(S){const D=_,P=new it,C=new A;let U=0;const M=S===!0?t:e,y=S===!0?1:-1;for(let z=1;z<=r;z++)u.push(0,f*y,0),d.push(0,y,0),p.push(.5,.5),_++;const I=_;for(let z=0;z<=r;z++){const H=z/r*l+a,$=Math.cos(H),q=Math.sin(H);C.x=M*q,C.y=f*y,C.z=M*$,u.push(C.x,C.y,C.z),d.push(0,y,0),P.x=$*.5+.5,P.y=q*.5*y+.5,p.push(P.x,P.y),_++}for(let z=0;z<r;z++){const R=D+z,H=I+z;S===!0?h.push(H,H+1,R):h.push(H+1,H,R),U+=3}c.addGroup(m,U,S===!0?1:2),m+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _l(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Kr extends Ch{constructor(t){super(t),this.uuid=mn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,r=this.holes.length;n<r;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(new Ch().fromJSON(r))}return this}}const Ox={triangulate:function(i,t,e=2){const n=t&&t.length,r=n?t[0]*e:i.length;let s=fd(i,0,r,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,h,u,d,p;if(n&&(s=zx(i,t,s,e)),i.length>80*e){a=c=i[0],l=h=i[1];for(let _=e;_<r;_+=e)u=i[_],d=i[_+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);p=Math.max(c-a,h-l),p=p!==0?32767/p:0}return ns(s,o,e,a,l,p,0),o}};function fd(i,t,e,n,r){let s,o;if(r===Jx(i,t,e,n)>0)for(s=t;s<e;s+=n)o=Ph(s,i[s],i[s+1],o);else for(s=e-n;s>=t;s-=n)o=Ph(s,i[s],i[s+1],o);return o&&ko(o,o.next)&&(rs(o),o=o.next),o}function Ci(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(ko(e,e.next)||ae(e.prev,e,e.next)===0)){if(rs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ns(i,t,e,n,r,s,o){if(!i)return;!o&&s&&$x(i,n,r,s);let a=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,s?Bx(i,n,r,s):Fx(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),rs(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=kx(Ci(i),t,e),ns(i,t,e,n,r,s,2)):o===2&&Vx(i,t,e,n,r,s):ns(Ci(i),t,e,n,r,s,1);break}}}function Fx(i){const t=i.prev,e=i,n=i.next;if(ae(t,e,n)>=0)return!1;const r=t.x,s=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=r<s?r<o?r:o:s<o?s:o,u=a<l?a<c?a:c:l<c?l:c,d=r>s?r>o?r:o:s>o?s:o,p=a>l?a>c?a:c:l>c?l:c;let _=n.next;for(;_!==t;){if(_.x>=h&&_.x<=d&&_.y>=u&&_.y<=p&&hr(r,a,s,l,o,c,_.x,_.y)&&ae(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function Bx(i,t,e,n){const r=i.prev,s=i,o=i.next;if(ae(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,h=r.y,u=s.y,d=o.y,p=a<l?a<c?a:c:l<c?l:c,_=h<u?h<d?h:d:u<d?u:d,g=a>l?a>c?a:c:l>c?l:c,f=h>u?h>d?h:d:u>d?u:d,m=Qa(p,_,t,e,n),T=Qa(g,f,t,e,n);let x=i.prevZ,S=i.nextZ;for(;x&&x.z>=m&&S&&S.z<=T;){if(x.x>=p&&x.x<=g&&x.y>=_&&x.y<=f&&x!==r&&x!==o&&hr(a,h,l,u,c,d,x.x,x.y)&&ae(x.prev,x,x.next)>=0||(x=x.prevZ,S.x>=p&&S.x<=g&&S.y>=_&&S.y<=f&&S!==r&&S!==o&&hr(a,h,l,u,c,d,S.x,S.y)&&ae(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;x&&x.z>=m;){if(x.x>=p&&x.x<=g&&x.y>=_&&x.y<=f&&x!==r&&x!==o&&hr(a,h,l,u,c,d,x.x,x.y)&&ae(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;S&&S.z<=T;){if(S.x>=p&&S.x<=g&&S.y>=_&&S.y<=f&&S!==r&&S!==o&&hr(a,h,l,u,c,d,S.x,S.y)&&ae(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function kx(i,t,e){let n=i;do{const r=n.prev,s=n.next.next;!ko(r,s)&&md(r,n,n.next,s)&&is(r,s)&&is(s,r)&&(t.push(r.i/e|0),t.push(n.i/e|0),t.push(s.i/e|0),rs(n),rs(n.next),n=i=s),n=n.next}while(n!==i);return Ci(n)}function Vx(i,t,e,n,r,s){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Kx(o,a)){let l=vd(o,a);o=Ci(o,o.next),l=Ci(l,l.next),ns(o,t,e,n,r,s,0),ns(l,t,e,n,r,s,0);return}a=a.next}o=o.next}while(o!==i)}function zx(i,t,e,n){const r=[];let s,o,a,l,c;for(s=0,o=t.length;s<o;s++)a=t[s]*n,l=s<o-1?t[s+1]*n:i.length,c=fd(i,a,l,n,!1),c===c.next&&(c.steiner=!0),r.push(qx(c));for(r.sort(Hx),s=0;s<r.length;s++)e=Gx(r[s],e);return e}function Hx(i,t){return i.x-t.x}function Gx(i,t){const e=Wx(i,t);if(!e)return t;const n=vd(e,i);return Ci(n,n.next),Ci(e,e.next)}function Wx(i,t){let e=t,n=-1/0,r;const s=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=s&&d>n&&(n=d,r=e.x<e.next.x?e:e.next,d===s))return r}e=e.next}while(e!==t);if(!r)return null;const a=r,l=r.x,c=r.y;let h=1/0,u;e=r;do s>=e.x&&e.x>=l&&s!==e.x&&hr(o<c?s:n,o,l,c,o<c?n:s,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(s-e.x),is(e,i)&&(u<h||u===h&&(e.x>r.x||e.x===r.x&&Xx(r,e)))&&(r=e,h=u)),e=e.next;while(e!==a);return r}function Xx(i,t){return ae(i.prev,i,t.prev)<0&&ae(t.next,i,i.next)<0}function $x(i,t,e,n){let r=i;do r.z===0&&(r.z=Qa(r.x,r.y,t,e,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,Yx(r)}function Yx(i){let t,e,n,r,s,o,a,l,c=1;do{for(e=i,i=null,s=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(r=e,e=e.nextZ,a--):(r=n,n=n.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;e=n}s.nextZ=null,c*=2}while(o>1);return i}function Qa(i,t,e,n,r){return i=(i-e)*r|0,t=(t-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function qx(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function hr(i,t,e,n,r,s,o,a){return(r-o)*(t-a)>=(i-o)*(s-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(r-o)*(n-a)}function Kx(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!jx(i,t)&&(is(i,t)&&is(t,i)&&Zx(i,t)&&(ae(i.prev,i,t.prev)||ae(i,t.prev,t))||ko(i,t)&&ae(i.prev,i,i.next)>0&&ae(t.prev,t,t.next)>0)}function ae(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function ko(i,t){return i.x===t.x&&i.y===t.y}function md(i,t,e,n){const r=ao(ae(i,t,e)),s=ao(ae(i,t,n)),o=ao(ae(e,n,i)),a=ao(ae(e,n,t));return!!(r!==s&&o!==a||r===0&&oo(i,e,t)||s===0&&oo(i,n,t)||o===0&&oo(e,i,n)||a===0&&oo(e,t,n))}function oo(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function ao(i){return i>0?1:i<0?-1:0}function jx(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&md(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function is(i,t){return ae(i.prev,i,i.next)<0?ae(i,t,i.next)>=0&&ae(i,i.prev,t)>=0:ae(i,t,i.prev)<0||ae(i,i.next,t)<0}function Zx(i,t){let e=i,n=!1;const r=(i.x+t.x)/2,s=(i.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&r<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function vd(i,t){const e=new tl(i.i,i.x,i.y),n=new tl(t.i,t.x,t.y),r=i.next,s=t.prev;return i.next=t,t.prev=i,e.next=r,r.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function Ph(i,t,e,n){const r=new tl(i,t,e);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function rs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function tl(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Jx(i,t,e,n){let r=0;for(let s=t,o=e-n;s<e;s+=n)r+=(i[o]-i[s])*(i[s+1]+i[o+1]),o=s;return r}class jr{static area(t){const e=t.length;let n=0;for(let r=e-1,s=0;s<e;r=s++)n+=t[r].x*t[s].y-t[s].x*t[r].y;return n*.5}static isClockWise(t){return jr.area(t)<0}static triangulateShape(t,e){const n=[],r=[],s=[];Rh(t),Lh(n,t);let o=t.length;e.forEach(Rh);for(let l=0;l<e.length;l++)r.push(o),o+=e[l].length,Lh(n,e[l]);const a=Ox.triangulate(n,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Rh(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Lh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class mr extends pe{constructor(t=new Kr([new it(0,.5),new it(-.5,-.5),new it(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],r=[],s=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new ue(r,3)),this.setAttribute("normal",new ue(s,3)),this.setAttribute("uv",new ue(o,2));function c(h){const u=r.length/3,d=h.extractPoints(e);let p=d.shape;const _=d.holes;jr.isClockWise(p)===!1&&(p=p.reverse());for(let f=0,m=_.length;f<m;f++){const T=_[f];jr.isClockWise(T)===!0&&(_[f]=T.reverse())}const g=jr.triangulateShape(p,_);for(let f=0,m=_.length;f<m;f++){const T=_[f];p=p.concat(T)}for(let f=0,m=p.length;f<m;f++){const T=p[f];r.push(T.x,T.y,0),s.push(0,0,1),o.push(T.x,T.y)}for(let f=0,m=g.length;f<m;f++){const T=g[f],x=T[0]+u,S=T[1]+u,D=T[2]+u;n.push(x,S,D),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Qx(e,t)}static fromJSON(t,e){const n=[];for(let r=0,s=t.shapes.length;r<s;r++){const o=e[t.shapes[r]];n.push(o)}return new mr(n,t.curveSegments)}}function Qx(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const r=i[e];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t}class Dh{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ee(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class tb extends fl{constructor(t=10,e=10,n=4473924,r=8947848){n=new Ht(n),r=new Ht(r);const s=e/2,o=t/e,a=t/2,l=[],c=[];for(let d=0,p=0,_=-a;d<=e;d++,_+=o){l.push(-a,0,_,a,0,_),l.push(_,0,-a,_,0,a);const g=d===s?n:r;g.toArray(c,p),p+=3,g.toArray(c,p),p+=3,g.toArray(c,p),p+=3,g.toArray(c,p),p+=3}const h=new pe;h.setAttribute("position",new ue(l,3)),h.setAttribute("color",new ue(c,3));const u=new ri({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const Ih=new A;let lo,La;class Si extends Te{constructor(t=new A(0,0,1),e=new A(0,0,0),n=1,r=16776960,s=n*.2,o=s*.2){super(),this.type="ArrowHelper",lo===void 0&&(lo=new pe,lo.setAttribute("position",new ue([0,0,0,0,1,0],3)),La=new _l(0,.5,1,5,1),La.translate(0,-.5,0)),this.position.copy(e),this.line=new fr(lo,new ri({color:r,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Ie(La,new ti({color:r,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(n,s,o)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{Ih.set(t.z,0,-t.x).normalize();const e=Math.acos(t.y);this.quaternion.setFromAxisAngle(Ih,e)}}setLength(t,e=t*.2,n=e*.2){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(n,e,n),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:hl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=hl);const Nh={type:"change"},Da={type:"start"},Uh={type:"end"},co=new Oo,Oh=new Xn,eb=Math.cos(70*am.DEG2RAD);class nb extends Ii{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new A,this.cursor=new A,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Bi.ROTATE,MIDDLE:Bi.DOLLY,RIGHT:Bi.PAN},this.touches={ONE:ki.ROTATE,TWO:ki.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(v){v.addEventListener("keydown",lt),this._domElementKeyEvents=v},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",lt),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Nh),n.update(),s=r.NONE},this.update=function(){const v=new A,O=new Ai().setFromUnitVectors(t.up,new A(0,1,0)),X=O.clone().invert(),et=new A,ct=new Ai,Vt=new A,Ot=2*Math.PI;return function(we=null){const Zt=n.object.position;v.copy(Zt).sub(n.target),v.applyQuaternion(O),a.setFromVector3(v),n.autoRotate&&s===r.NONE&&z(y(we)),n.enableDamping?(a.theta+=l.theta*n.dampingFactor,a.phi+=l.phi*n.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let fe=n.minAzimuthAngle,me=n.maxAzimuthAngle;isFinite(fe)&&isFinite(me)&&(fe<-Math.PI?fe+=Ot:fe>Math.PI&&(fe-=Ot),me<-Math.PI?me+=Ot:me>Math.PI&&(me-=Ot),fe<=me?a.theta=Math.max(fe,Math.min(me,a.theta)):a.theta=a.theta>(fe+me)/2?Math.max(fe,a.theta):Math.min(me,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let He=!1;if(n.zoomToCursor&&P||n.object.isOrthographicCamera)a.radius=J(a.radius);else{const Ke=a.radius;a.radius=J(a.radius*c),He=Ke!=a.radius}if(v.setFromSpherical(a),v.applyQuaternion(X),Zt.copy(n.target).add(v),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),h.set(0,0,0)),n.zoomToCursor&&P){let Ke=null;if(n.object.isPerspectiveCamera){const Nn=v.length();Ke=J(Nn*c);const Fi=Nn-Ke;n.object.position.addScaledVector(S,Fi),n.object.updateMatrixWorld(),He=!!Fi}else if(n.object.isOrthographicCamera){const Nn=new A(D.x,D.y,0);Nn.unproject(n.object);const Fi=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),He=Fi!==n.object.zoom;const ai=new A(D.x,D.y,0);ai.unproject(n.object),n.object.position.sub(ai).add(Nn),n.object.updateMatrixWorld(),Ke=v.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;Ke!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(Ke).add(n.object.position):(co.origin.copy(n.object.position),co.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(co.direction))<eb?t.lookAt(n.target):(Oh.setFromNormalAndCoplanarPoint(n.object.up,n.target),co.intersectPlane(Oh,n.target))))}else if(n.object.isOrthographicCamera){const Ke=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),Ke!==n.object.zoom&&(n.object.updateProjectionMatrix(),He=!0)}return c=1,P=!1,He||et.distanceToSquared(n.object.position)>o||8*(1-ct.dot(n.object.quaternion))>o||Vt.distanceToSquared(n.target)>o?(n.dispatchEvent(Nh),et.copy(n.object.position),ct.copy(n.object.quaternion),Vt.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",dt),n.domElement.removeEventListener("pointerdown",V),n.domElement.removeEventListener("pointercancel",K),n.domElement.removeEventListener("wheel",Z),n.domElement.removeEventListener("pointermove",Y),n.domElement.removeEventListener("pointerup",K),n.domElement.getRootNode().removeEventListener("keydown",gt,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",lt),n._domElementKeyEvents=null)};const n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const o=1e-6,a=new Dh,l=new Dh;let c=1;const h=new A,u=new it,d=new it,p=new it,_=new it,g=new it,f=new it,m=new it,T=new it,x=new it,S=new A,D=new it;let P=!1;const C=[],U={};let M=!1;function y(v){return v!==null?2*Math.PI/60*n.autoRotateSpeed*v:2*Math.PI/60/60*n.autoRotateSpeed}function I(v){const O=Math.abs(v*.01);return Math.pow(.95,n.zoomSpeed*O)}function z(v){l.theta-=v}function R(v){l.phi-=v}const H=function(){const v=new A;return function(X,et){v.setFromMatrixColumn(et,0),v.multiplyScalar(-X),h.add(v)}}(),$=function(){const v=new A;return function(X,et){n.screenSpacePanning===!0?v.setFromMatrixColumn(et,1):(v.setFromMatrixColumn(et,0),v.crossVectors(n.object.up,v)),v.multiplyScalar(X),h.add(v)}}(),q=function(){const v=new A;return function(X,et){const ct=n.domElement;if(n.object.isPerspectiveCamera){const Vt=n.object.position;v.copy(Vt).sub(n.target);let Ot=v.length();Ot*=Math.tan(n.object.fov/2*Math.PI/180),H(2*X*Ot/ct.clientHeight,n.object.matrix),$(2*et*Ot/ct.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(H(X*(n.object.right-n.object.left)/n.object.zoom/ct.clientWidth,n.object.matrix),$(et*(n.object.top-n.object.bottom)/n.object.zoom/ct.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function rt(v){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=v:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function G(v){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=v:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Q(v,O){if(!n.zoomToCursor)return;P=!0;const X=n.domElement.getBoundingClientRect(),et=v-X.left,ct=O-X.top,Vt=X.width,Ot=X.height;D.x=et/Vt*2-1,D.y=-(ct/Ot)*2+1,S.set(D.x,D.y,1).unproject(n.object).sub(n.object.position).normalize()}function J(v){return Math.max(n.minDistance,Math.min(n.maxDistance,v))}function pt(v){u.set(v.clientX,v.clientY)}function Ut(v){Q(v.clientX,v.clientX),m.set(v.clientX,v.clientY)}function Kt(v){_.set(v.clientX,v.clientY)}function W(v){d.set(v.clientX,v.clientY),p.subVectors(d,u).multiplyScalar(n.rotateSpeed);const O=n.domElement;z(2*Math.PI*p.x/O.clientHeight),R(2*Math.PI*p.y/O.clientHeight),u.copy(d),n.update()}function tt(v){T.set(v.clientX,v.clientY),x.subVectors(T,m),x.y>0?rt(I(x.y)):x.y<0&&G(I(x.y)),m.copy(T),n.update()}function ht(v){g.set(v.clientX,v.clientY),f.subVectors(g,_).multiplyScalar(n.panSpeed),q(f.x,f.y),_.copy(g),n.update()}function at(v){Q(v.clientX,v.clientY),v.deltaY<0?G(I(v.deltaY)):v.deltaY>0&&rt(I(v.deltaY)),n.update()}function Tt(v){let O=!1;switch(v.code){case n.keys.UP:v.ctrlKey||v.metaKey||v.shiftKey?R(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):q(0,n.keyPanSpeed),O=!0;break;case n.keys.BOTTOM:v.ctrlKey||v.metaKey||v.shiftKey?R(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):q(0,-n.keyPanSpeed),O=!0;break;case n.keys.LEFT:v.ctrlKey||v.metaKey||v.shiftKey?z(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):q(n.keyPanSpeed,0),O=!0;break;case n.keys.RIGHT:v.ctrlKey||v.metaKey||v.shiftKey?z(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):q(-n.keyPanSpeed,0),O=!0;break}O&&(v.preventDefault(),n.update())}function Ct(v){if(C.length===1)u.set(v.pageX,v.pageY);else{const O=$t(v),X=.5*(v.pageX+O.x),et=.5*(v.pageY+O.y);u.set(X,et)}}function Ft(v){if(C.length===1)_.set(v.pageX,v.pageY);else{const O=$t(v),X=.5*(v.pageX+O.x),et=.5*(v.pageY+O.y);_.set(X,et)}}function N(v){const O=$t(v),X=v.pageX-O.x,et=v.pageY-O.y,ct=Math.sqrt(X*X+et*et);m.set(0,ct)}function Nt(v){n.enableZoom&&N(v),n.enablePan&&Ft(v)}function yt(v){n.enableZoom&&N(v),n.enableRotate&&Ct(v)}function ce(v){if(C.length==1)d.set(v.pageX,v.pageY);else{const X=$t(v),et=.5*(v.pageX+X.x),ct=.5*(v.pageY+X.y);d.set(et,ct)}p.subVectors(d,u).multiplyScalar(n.rotateSpeed);const O=n.domElement;z(2*Math.PI*p.x/O.clientHeight),R(2*Math.PI*p.y/O.clientHeight),u.copy(d)}function wt(v){if(C.length===1)g.set(v.pageX,v.pageY);else{const O=$t(v),X=.5*(v.pageX+O.x),et=.5*(v.pageY+O.y);g.set(X,et)}f.subVectors(g,_).multiplyScalar(n.panSpeed),q(f.x,f.y),_.copy(g)}function Yt(v){const O=$t(v),X=v.pageX-O.x,et=v.pageY-O.y,ct=Math.sqrt(X*X+et*et);T.set(0,ct),x.set(0,Math.pow(T.y/m.y,n.zoomSpeed)),rt(x.y),m.copy(T);const Vt=(v.pageX+O.x)*.5,Ot=(v.pageY+O.y)*.5;Q(Vt,Ot)}function E(v){n.enableZoom&&Yt(v),n.enablePan&&wt(v)}function b(v){n.enableZoom&&Yt(v),n.enableRotate&&ce(v)}function V(v){n.enabled!==!1&&(C.length===0&&(n.domElement.setPointerCapture(v.pointerId),n.domElement.addEventListener("pointermove",Y),n.domElement.addEventListener("pointerup",K)),!Xt(v)&&(Bt(v),v.pointerType==="touch"?Mt(v):j(v)))}function Y(v){n.enabled!==!1&&(v.pointerType==="touch"?ut(v):_t(v))}function K(v){switch(kt(v),C.length){case 0:n.domElement.releasePointerCapture(v.pointerId),n.domElement.removeEventListener("pointermove",Y),n.domElement.removeEventListener("pointerup",K),n.dispatchEvent(Uh),s=r.NONE;break;case 1:const O=C[0],X=U[O];Mt({pointerId:O,pageX:X.x,pageY:X.y});break}}function j(v){let O;switch(v.button){case 0:O=n.mouseButtons.LEFT;break;case 1:O=n.mouseButtons.MIDDLE;break;case 2:O=n.mouseButtons.RIGHT;break;default:O=-1}switch(O){case Bi.DOLLY:if(n.enableZoom===!1)return;Ut(v),s=r.DOLLY;break;case Bi.ROTATE:if(v.ctrlKey||v.metaKey||v.shiftKey){if(n.enablePan===!1)return;Kt(v),s=r.PAN}else{if(n.enableRotate===!1)return;pt(v),s=r.ROTATE}break;case Bi.PAN:if(v.ctrlKey||v.metaKey||v.shiftKey){if(n.enableRotate===!1)return;pt(v),s=r.ROTATE}else{if(n.enablePan===!1)return;Kt(v),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(Da)}function _t(v){switch(s){case r.ROTATE:if(n.enableRotate===!1)return;W(v);break;case r.DOLLY:if(n.enableZoom===!1)return;tt(v);break;case r.PAN:if(n.enablePan===!1)return;ht(v);break}}function Z(v){n.enabled===!1||n.enableZoom===!1||s!==r.NONE||(v.preventDefault(),n.dispatchEvent(Da),at(vt(v)),n.dispatchEvent(Uh))}function vt(v){const O=v.deltaMode,X={clientX:v.clientX,clientY:v.clientY,deltaY:v.deltaY};switch(O){case 1:X.deltaY*=16;break;case 2:X.deltaY*=100;break}return v.ctrlKey&&!M&&(X.deltaY*=10),X}function gt(v){v.key==="Control"&&(M=!0,n.domElement.getRootNode().addEventListener("keyup",nt,{passive:!0,capture:!0}))}function nt(v){v.key==="Control"&&(M=!1,n.domElement.getRootNode().removeEventListener("keyup",nt,{passive:!0,capture:!0}))}function lt(v){n.enabled===!1||n.enablePan===!1||Tt(v)}function Mt(v){switch(zt(v),C.length){case 1:switch(n.touches.ONE){case ki.ROTATE:if(n.enableRotate===!1)return;Ct(v),s=r.TOUCH_ROTATE;break;case ki.PAN:if(n.enablePan===!1)return;Ft(v),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(n.touches.TWO){case ki.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Nt(v),s=r.TOUCH_DOLLY_PAN;break;case ki.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;yt(v),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&n.dispatchEvent(Da)}function ut(v){switch(zt(v),s){case r.TOUCH_ROTATE:if(n.enableRotate===!1)return;ce(v),n.update();break;case r.TOUCH_PAN:if(n.enablePan===!1)return;wt(v),n.update();break;case r.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;E(v),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;b(v),n.update();break;default:s=r.NONE}}function dt(v){n.enabled!==!1&&v.preventDefault()}function Bt(v){C.push(v.pointerId)}function kt(v){delete U[v.pointerId];for(let O=0;O<C.length;O++)if(C[O]==v.pointerId){C.splice(O,1);return}}function Xt(v){for(let O=0;O<C.length;O++)if(C[O]==v.pointerId)return!0;return!1}function zt(v){let O=U[v.pointerId];O===void 0&&(O=new it,U[v.pointerId]=O),O.set(v.pageX,v.pageY)}function $t(v){const O=v.pointerId===C[0]?C[1]:C[0];return U[O]}n.domElement.addEventListener("contextmenu",dt),n.domElement.addEventListener("pointerdown",V),n.domElement.addEventListener("pointercancel",K),n.domElement.addEventListener("wheel",Z,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",gt,{passive:!0,capture:!0}),this.update()}}function ib(i,t,e){const n=new wx(new pe,new cd),r=.05*t.gridSize.val*.5;return n.frustumCulled=!1,xt.derive(()=>{n.visible=t.nodes.val,t.nodes.val&&n.geometry.setAttribute("position",new ue(i.val.flat(),3))}),xt.derive(()=>{t.nodes.val&&(n.material.size=r*e.val)}),n}function rb(i,t,e){const n=new fl(new pe,new ri);let r=i.val;return n.frustumCulled=!1,n.material.depthTest=!1,xt.derive(()=>r=i.val),xt.derive(()=>{if(e.deformedShape.val,n.visible=e.elements.val,!e.elements.val)return;const s=t.val.elements.map(o=>[...r[o[0]],...r[o[1]]]).flat();n.geometry.setAttribute("position",new ue(s,3))}),n}function sb(i){const t=new tb(i,20,4210752,4210752);return t.position.set(.5*i,.5*i,0),t.rotateX(Math.PI/2),t}function ob(i,t,e,n){const r=new Ne,s=new Sr(.5,.5,.5),o=new ti({color:10166822}),a=.05*e.gridSize.val*.6;let l=n.val,c=i.val;return xt.derive(()=>c=i.val),xt.derive(()=>{e.deformedShape.val,r.visible=e.supports.val,e.supports.val&&(r.clear(),t.val.analysisInputs.supports.forEach((h,u)=>{const d=new Ie(s,o);d.position.set(...c[u]);const p=a*l;d.scale.set(p,p,p),r.add(d)}))}),xt.derive(()=>{if(!e.supports.val)return;const h=a*n.val;r.children.forEach(u=>u.scale.set(h,h,h)),l=n.val}),r}function ab(i,t,e,n){const r=new Ne,s=.05*e.gridSize.val;let o=n.val,a=i.val;return xt.derive(()=>a=i.val),xt.derive(()=>{e.deformedShape.val,r.visible=e.loads.val,e.loads.val&&(r.children.forEach(l=>l.dispose()),r.clear(),t.val.analysisInputs.loads.forEach((l,c)=>{const h=new Si(new A(...l).normalize(),new A(...a[c]),1,15637248,.3,.3),u=s*o;h.scale.set(u,u,u),r.add(h)}))}),xt.derive(()=>{if(!e.loads.val)return;const l=s*n.val;r.children.forEach(c=>c.scale.set(l,l,l)),o=n.val}),r}let Be=class extends yx{constructor(e,n,r){super();te(this,"fontHeightPx");const s=30;this.fontHeightPx=s*devicePixelRatio,this.material.map=lb(e,this.fontHeightPx,n,r),this.material.depthTest=!1,this.renderOrder=99,this.scale.set(this.material.map.image.width/this.fontHeightPx,1,1)}updateScale(e){var n,r;this.scale.set(((r=(n=this.material)==null?void 0:n.map)==null?void 0:r.image.width)/this.fontHeightPx*e,e,1)}dispose(){var e;this.geometry.dispose(),(e=this.material.map)==null||e.dispose(),this.material.dispose()}};function lb(i,t,e,n){const r=document.createElement("canvas"),s=r.getContext("2d");if(s){s.font=`${t}px Arial`,r.width=s.measureText(i).width,r.height=t,n!="transparent"&&(s.fillStyle=n??"#0d0d0d"),s.fillRect(0,0,r.width,r.height),s.textAlign="center",s.textBaseline="middle",s.fillStyle=e??"#bbbcc4";const a=.9;s.font=`${t*a}px Arial`;const l=.08*r.height;s.fillText(i,r.width/2,r.height/2+l)}const o=new Ue(r);return o.needsUpdate=!0,o}function cb(i,t,e){const n=new Ne,r=.05*t.gridSize.val*.6;let s=e.val;return xt.derive(()=>{n.visible=t.nodesIndexes.val,t.nodesIndexes.val&&(n.children.forEach(o=>o.dispose()),n.clear(),i.val.forEach((o,a)=>{const l=new Be(`${a}`);l.position.set(...o),l.updateScale(r*s),n.add(l)}))}),xt.derive(()=>{t.nodesIndexes.val&&(n.children.forEach(o=>o.updateScale(r*e.val)),s=e.val)}),n}function _d(i,t){return i==null?void 0:i.map((e,n)=>(e+t[n])*.5)}function hb(i,t,e,n){const r=new Ne,s=.05*e.gridSize.val*.6;let o=n.val,a=i.val;return xt.derive(()=>a=i.val),xt.derive(()=>{e.deformedShape.val,r.visible=e.elementsIndexes.val,e.elementsIndexes.val&&(r.children.forEach(l=>l.dispose()),r.clear(),t.val.elements.forEach((l,c)=>{const h=new Be(`${c}`,void 0,"#001219");h.position.set(..._d(a[l[0]],a[l[1]])),h.updateScale(s*o),r.add(h)}))}),xt.derive(()=>{e.elementsIndexes.val&&(r.children.forEach(l=>l.updateScale(s*n.val)),o=n.val)}),r}function ub(i){const t=new Ne,e=.05*i*1,n=new Be("X","red","transparent"),r=new Be("Y","green","transparent"),s=new Be("Z","blue","transparent"),o=new Si(new A(1,0,0),new A(0,0,0),1,6710886,.2,.2),a=new Si(new A(0,1,0),new A(0,0,0),1,6710886,.2,.2),l=new Si(new A(0,0,1),new A(0,0,0),1,6710886,.2,.2);return n.position.set(1.3*e,0,0),r.position.set(0,1.3*e,0),s.position.set(0,0,1.3*e),n.updateScale(.4*e),r.updateScale(.4*e),s.updateScale(.4*e),o.scale.set(e,e,e),a.scale.set(e,e,e),l.scale.set(e,e,e),t.add(o,a,l,n,r,s),t}function gd(i,t){const e=new A(...i),r=new A(...t).clone().sub(e),s=r.length(),o=r.dot(new A(1,0,0))/s,a=r.dot(new A(0,1,0))/s,l=r.dot(new A(0,0,1))/s,c=Math.sqrt(o**2+a**2);let h=new Et().fromArray([[o,a,l],[-a/c,o/c,0],[-o*l/c,-a*l/c,c]].flat());return l===1&&(h=new Et().fromArray([[0,0,1],[0,1,0],[-1,0,0]].flat())),l===-1&&(h=new Et().fromArray([[0,0,-1],[0,1,0],[1,0,0]].flat())),new re().setFromMatrix3(h)}function el(i,t){return i==null?void 0:i.map((e,n)=>(9*e+t[n])/10)}function db(i,t,e,n){const r=new Ne,s=new pe,o=new ri({vertexColors:!0}),a=.05*e.gridSize.val*.75;let l=n.val,c=i.val;xt.derive(()=>c=i.val);const h=[0,0,0],u=[1,0,0],d=[0,1,0],p=[0,0,1];s.setAttribute("position",new ue([...h,...u,...h,...d,...h,...p],3));const _=[255,0,0],g=[0,255,0],f=[0,0,255];return s.setAttribute("color",new ue([..._,..._,...g,...g,...f,...f],3)),xt.derive(()=>{e.deformedShape.val,r.visible=e.orientations.val,e.orientations.val&&(r.clear(),t.val.elements.forEach(m=>{const T=new fl(s,o),x=c[m[0]],S=c[m[1]];T.position.set(...el(x,S)),T.rotation.setFromRotationMatrix(gd(x,S));const D=a*l;T.scale.set(D,D,D),r.add(T)}))}),xt.derive(()=>{if(!e.orientations.val)return;const m=a*n.val;r.children.forEach(T=>T.scale.set(m,m,m)),l=n.val}),r}class ho extends Ne{constructor(e,n,r,s,o,a,l){super();te(this,"lines");te(this,"mesh");te(this,"text");te(this,"textPosition");te(this,"normalizedResult");const c=new Kr().moveTo(0,0).lineTo(0,a[0]).lineTo(r,a[0]).lineTo(r,0).lineTo(0,0),h=c.getPoints(),u=new pe().setFromPoints(h);this.lines=new fr(u,new ri({color:"white"})),this.lines.position.set(...e),this.lines.rotation.setFromRotationMatrix(s),l&&this.lines.rotateX(Math.PI/2),this.add(this.lines);const d=new mr(c),p=new ti({color:a[0]>0?24435:11411474,side:$e});this.mesh=new Ie(d,p),this.mesh.position.set(...e),this.mesh.rotation.setFromRotationMatrix(s),l&&this.mesh.rotateX(Math.PI/2),this.add(this.mesh),this.text=new Be(`${o[0].toFixed(4)}`),this.normalizedResult=a,this.textPosition=_d(e,n),this.text.position.set(...this.textPosition),this.text.rotation.setFromRotationMatrix(s),this.add(this.text)}updateScale(e){this.lines.scale.set(1,e*2,1),this.mesh.scale.set(1,e*2,1),this.text.updateScale(e*.6),this.text.position.set(...this.textPosition),this.text.translateZ(this.normalizedResult[0]*2.5*e)}dispose(){this.lines.geometry.dispose(),this.lines.material.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.text.dispose()}}class Fh extends Ne{constructor(e,n,r,s,o,a,l){super();te(this,"lines");te(this,"lines2");te(this,"mesh");te(this,"mesh2");te(this,"text");te(this,"text2");te(this,"textPosition");te(this,"text2Position");te(this,"normalizedResult");const c=o[0]*r/(o[0]+o[1]),h=o[0]*o[1]>0;if(this.text=new Be(`${o[0].toFixed(4)}`),this.text2=new Be(`${-o[1].toFixed(4)}`),this.normalizedResult=a,this.textPosition=el(e,n),this.text2Position=el(n,e),this.text.position.set(...this.textPosition),this.text2.position.set(...this.text2Position),this.text.rotation.setFromRotationMatrix(s),this.text2.rotation.setFromRotationMatrix(s),this.add(this.text,this.text2),h){const u=new Kr().moveTo(0,0).lineTo(0,a[0]).lineTo(c,0).lineTo(0,0),d=new Kr().moveTo(c,0).lineTo(r,-a[1]).lineTo(r,0).lineTo(c,0),p=u.getPoints(),_=d.getPoints(),g=new pe().setFromPoints(p),f=new pe().setFromPoints(_),m=new ri({color:"white"});this.lines=new fr(g,m),this.lines2=new fr(f,m),this.lines.position.set(...e),this.lines2.position.set(...e),this.lines.rotation.setFromRotationMatrix(s),this.lines2.rotation.setFromRotationMatrix(s),l&&this.lines.rotateX(Math.PI/2),l&&this.lines2.rotateX(Math.PI/2),this.add(this.lines,this.lines2);const T=new mr(u),x=new mr(d),S=new ti({color:a[0]>0?24435:11411474,side:$e}),D=new ti({color:-a[1]>0?24435:11411474,side:$e});this.mesh=new Ie(T,S),this.mesh2=new Ie(x,D),this.mesh.position.set(...e),this.mesh2.position.set(...e),this.mesh.rotation.setFromRotationMatrix(s),this.mesh2.rotation.setFromRotationMatrix(s),l&&this.mesh.rotateX(Math.PI/2),l&&this.mesh2.rotateX(Math.PI/2),this.add(this.mesh,this.mesh2)}else{const u=new Kr().moveTo(0,0).lineTo(0,a[0]).lineTo(r,-a[1]).lineTo(r,0).lineTo(0,0),d=u.getPoints(),p=new pe().setFromPoints(d);this.lines=new fr(p,new ri({color:"white"})),this.lines.position.set(...e),this.lines.rotation.setFromRotationMatrix(s),l&&this.lines.rotateX(Math.PI/2),this.add(this.lines);const _=new mr(u),g=new ti({color:a[0]>0?24435:11411474,side:$e});this.mesh=new Ie(_,g),this.mesh.position.set(...e),this.mesh.rotation.setFromRotationMatrix(s),l&&this.mesh.rotateX(Math.PI/2),this.add(this.mesh)}}updateScale(e){var n,r;this.lines.scale.set(1,e*2,1),(n=this.lines2)==null||n.scale.set(1,e*2,1),this.mesh.scale.set(1,e*2,1),(r=this.mesh2)==null||r.scale.set(1,e*2,1),this.text.updateScale(e*.6),this.text2.updateScale(e*.6),this.text.position.set(...this.textPosition),this.text2.position.set(...this.text2Position),this.text.translateZ(this.normalizedResult[0]*2.5*e),this.text2.translateZ(-this.normalizedResult[1]*2.5*e)}dispose(){var e,n,r,s,o,a;this.lines.geometry.dispose(),(e=this.lines2)==null||e.geometry.dispose(),this.lines.material.dispose(),(r=(n=this.lines2)==null?void 0:n.material)==null||r.dispose(),this.mesh.geometry.dispose(),(s=this.mesh2)==null||s.geometry.dispose(),this.mesh.material.dispose(),(a=(o=this.mesh2)==null?void 0:o.material)==null||a.dispose(),this.text.dispose(),this.text2.dispose()}}var xd=(i=>(i.normal="normal",i.shearY="shearY",i.shearZ="shearZ",i.torsion="torsion",i.bendingY="bendingY",i.bendingZ="bendingZ",i))(xd||{});function pb(i,t,e,n){const r=new Ne,s=.05*e.gridSize.val,o={normal:ho,shearY:ho,shearZ:ho,torsion:ho,bendingY:Fh,bendingZ:Fh};let a=n.val,l=i.val;return xt.derive(()=>l=i.val),xt.derive(()=>{if(e.deformedShape.val,r.visible=e.elementResults.val!="none",e.elementResults.val=="none")return;const c=xd[e.elementResults.val];r.children.forEach(h=>h.dispose()),r.clear(),t.val.analysisOutputs[c].forEach((h,u)=>{const d=t.val.elements[u],p=l[d[0]],_=l[d[1]],g=new A(..._).distanceTo(new A(...p)),f=Math.max(...[...t.val.analysisOutputs[c].values()].flat().map(S=>Math.abs(S??0))),m=h==null?void 0:h.map(S=>S/(f===0?1:f)),T=gd(p,_),x=new o[c](p,_,g,T,h??[0,0],m??[0,0],!!["normal","shearZ","torsion","bendingY"].includes(c));x.updateScale(s*a),r.add(x)})}),xt.derive(()=>{e.elementResults.val!="none"&&(r.children.forEach(c=>c.updateScale(s*n.val)),a=n.val)}),r}class fb extends Ne{constructor(e,n,r){super();te(this,"xArrow");te(this,"yArrow");te(this,"zArrow");te(this,"xText1");te(this,"xText2");te(this,"yText1");te(this,"yText2");te(this,"zText1");te(this,"zText2");const s=n===gl.reaction;r[0]&&(this.xText1=new Be(`${s?"Fx":"Dx"}: `+r[0].toFixed(4))),r[3]&&(this.xText2=new Be(`${s?"Mx":"Rx"}: `+r[3].toFixed(4))),r[1]&&(this.yText1=new Be(`${s?"Fy":"Dy"}: `+r[1].toFixed(4))),r[4]&&(this.yText2=new Be(`${s?"My":"Ry"}: `+r[4].toFixed(4))),r[2]&&(this.zText1=new Be(`${s?"Fz":"Dz"}: `+r[2].toFixed(4))),r[5]&&(this.zText2=new Be(`${s?"Mz":"Rz"}: `+r[5].toFixed(4))),(r[0]||r[3])&&(this.xArrow=new Si(new A(1,0,0),new A(0,0,0),1,15637248,.3,.3)),(r[1]||r[4])&&(this.yArrow=new Si(new A(0,1,0),new A(0,0,0),1,15637248,.3,.3)),(r[2]||r[5])&&(this.zArrow=new Si(new A(0,0,1),new A(0,0,0),1,15637248,.3,.3)),this.position.set(...e),this.xArrow&&this.add(this.xArrow),this.yArrow&&this.add(this.yArrow),this.zArrow&&this.add(this.zArrow),this.xText1&&this.add(this.xText1),this.xText2&&this.add(this.xText2),this.yText1&&this.add(this.yText1),this.yText2&&this.add(this.yText2),this.zText1&&this.add(this.zText1),this.zText2&&this.add(this.zText2)}updateScale(e){var n,r,s,o,a,l,c,h,u,d,p,_,g,f,m;(n=this.xArrow)==null||n.scale.set(e,e,e),(r=this.yArrow)==null||r.scale.set(e,e,e),(s=this.zArrow)==null||s.scale.set(e,e,e),(o=this.xText1)==null||o.position.set(1.3*e,0,0),(a=this.xText2)==null||a.position.set(1.3*e,0,.5*e),(l=this.yText1)==null||l.position.set(0,1.3*e,0),(c=this.yText2)==null||c.position.set(0,1.3*e,.5*e),(h=this.zText1)==null||h.position.set(0,0,1.3*e),(u=this.zText2)==null||u.position.set(0,0,1.3*e+.5*e),(d=this.xText1)==null||d.updateScale(.4*e),(p=this.xText2)==null||p.updateScale(.4*e),(_=this.yText1)==null||_.updateScale(.4*e),(g=this.yText2)==null||g.updateScale(.4*e),(f=this.zText1)==null||f.updateScale(.4*e),(m=this.zText2)==null||m.updateScale(.4*e)}dispose(){var e,n,r,s,o,a,l,c,h;(e=this.xArrow)==null||e.dispose(),(n=this.yArrow)==null||n.dispose(),(r=this.zArrow)==null||r.dispose(),(s=this.xText1)==null||s.dispose(),(o=this.xText2)==null||o.dispose(),(a=this.yText1)==null||a.dispose(),(l=this.yText2)==null||l.dispose(),(c=this.zText1)==null||c.dispose(),(h=this.zText2)==null||h.dispose()}}var gl=(i=>(i.deformation="deformation",i.reaction="reaction",i))(gl||{});function mb(i,t,e,n){const r=new Ne,s=.05*e.gridSize.val;let o=n.val,a=i.val;return xt.derive(()=>a=i.val),xt.derive(()=>{if(e.deformedShape.val,r.visible=e.nodeResults.val!="none",e.nodeResults.val=="none")return;r.children.forEach(c=>c.dispose()),r.clear();const l=gl[e.nodeResults.val];t.val.analysisOutputs[l].forEach((c,h)=>{const u=new fb(a[h],l,c);u.updateScale(s*o),r.add(u)})}),xt.derive(()=>{e.nodeResults.val!="none"&&(r.children.forEach(l=>l.updateScale(s*n.val)),o=n.val)}),r}function vb(i,t){Te.DEFAULT_UP=new A(0,0,1);const e=new gx,n=new tn(45,window.innerWidth/window.innerHeight,.1,2*1e6),r=new _x({antialias:!0}),s=new nb(n,r.domElement),o=t.gridSize.val,a=xt.derive(()=>t.displayScale.val===0?1:t.displayScale.val>0?t.displayScale.val:-1/t.displayScale.val),l=xt.derive(()=>t.deformedShape.val?i.val.nodes.map((h,u)=>{const d=i.val.analysisOutputs.deformation.get(u)??[0,0,0];return h.map((p,_)=>p+d[_])}):i.val.nodes);e.add(sb(o),ub(o),ib(l,t,a),rb(l,i,t),cb(l,t,a),hb(l,i,t,a),ob(l,i,t,a),ab(l,i,t,a),db(l,i,t,a),pb(l,i,t,a),mb(l,i,t,a)),r.setPixelRatio(window.devicePixelRatio),r.setClearColor(0,1),r.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(r.domElement),document.body.style.margin="0";const c=o*.5+o*.5/Math.tan(45*.5);n.position.set(.5*o,.8*-c,.5*o),s.target.set(.5*o,.5*o,0),s.minDistance=1,s.maxDistance=c*1.5,s.zoomSpeed=10,s.update(),window.addEventListener("resize",()=>{n.aspect=window.innerWidth/window.innerHeight,n.updateProjectionMatrix(),r.setSize(window.innerWidth,window.innerHeight),r.render(e,n)}),s.addEventListener("change",()=>{r.render(e,n)}),xt.derive(()=>{i.val,t.displayScale.val,t.nodes.val,t.elements.val,t.nodesIndexes.val,t.elementsIndexes.val,t.orientations.val,t.supports.val,t.loads.val,t.deformedShape.val,t.elementResults.val,t.nodeResults.val,setTimeout(()=>r.render(e,n))})}/*! Tweakpane 4.0.3 (c) 2016 cocopon, licensed under the MIT license. */function Qt(i){return i==null}function xl(i){return i!==null&&typeof i=="object"}function nl(i){return i!==null&&typeof i=="object"}function _b(i,t){if(i.length!==t.length)return!1;for(let e=0;e<i.length;e++)if(i[e]!==t[e])return!1;return!0}function Pi(i,t){return Array.from(new Set([...Object.keys(i),...Object.keys(t)])).reduce((n,r)=>{const s=i[r],o=t[r];return nl(s)&&nl(o)?Object.assign(Object.assign({},n),{[r]:Pi(s,o)}):Object.assign(Object.assign({},n),{[r]:r in t?o:s})},{})}function bl(i){return xl(i)?"target"in i:!1}const gb={alreadydisposed:()=>"View has been already disposed",invalidparams:i=>`Invalid parameters for '${i.name}'`,nomatchingcontroller:i=>`No matching controller for '${i.key}'`,nomatchingview:i=>`No matching view for '${JSON.stringify(i.params)}'`,notbindable:()=>"Value is not bindable",notcompatible:i=>`Not compatible with  plugin '${i.id}'`,propertynotfound:i=>`Property '${i.name}' not found`,shouldneverhappen:()=>"This error should never happen"};class he{static alreadyDisposed(){return new he({type:"alreadydisposed"})}static notBindable(){return new he({type:"notbindable"})}static notCompatible(t,e){return new he({type:"notcompatible",context:{id:`${t}.${e}`}})}static propertyNotFound(t){return new he({type:"propertynotfound",context:{name:t}})}static shouldNeverHappen(){return new he({type:"shouldneverhappen"})}constructor(t){var e;this.message=(e=gb[t.type](t.context))!==null&&e!==void 0?e:"Unexpected error",this.name=this.constructor.name,this.stack=new Error(this.message).stack,this.type=t.type}toString(){return this.message}}class Ao{constructor(t,e){this.obj_=t,this.key=e}static isBindable(t){return!(t===null||typeof t!="object"&&typeof t!="function")}read(){return this.obj_[this.key]}write(t){this.obj_[this.key]=t}writeProperty(t,e){const n=this.read();if(!Ao.isBindable(n))throw he.notBindable();if(!(t in n))throw he.propertyNotFound(t);n[t]=e}}class ge{constructor(){this.observers_={}}on(t,e,n){var r;let s=this.observers_[t];return s||(s=this.observers_[t]=[]),s.push({handler:e,key:(r=n==null?void 0:n.key)!==null&&r!==void 0?r:e}),this}off(t,e){const n=this.observers_[t];return n&&(this.observers_[t]=n.filter(r=>r.key!==e)),this}emit(t,e){const n=this.observers_[t];n&&n.forEach(r=>{r.handler(e)})}}class xb{constructor(t,e){var n;this.constraint_=e==null?void 0:e.constraint,this.equals_=(n=e==null?void 0:e.equals)!==null&&n!==void 0?n:(r,s)=>r===s,this.emitter=new ge,this.rawValue_=t}get constraint(){return this.constraint_}get rawValue(){return this.rawValue_}set rawValue(t){this.setRawValue(t,{forceEmit:!1,last:!0})}setRawValue(t,e){const n=e??{forceEmit:!1,last:!0},r=this.constraint_?this.constraint_.constrain(t):t,s=this.rawValue_;this.equals_(s,r)&&!n.forceEmit||(this.emitter.emit("beforechange",{sender:this}),this.rawValue_=r,this.emitter.emit("change",{options:n,previousRawValue:s,rawValue:r,sender:this}))}}class bb{constructor(t){this.emitter=new ge,this.value_=t}get rawValue(){return this.value_}set rawValue(t){this.setRawValue(t,{forceEmit:!1,last:!0})}setRawValue(t,e){const n=e??{forceEmit:!1,last:!0},r=this.value_;r===t&&!n.forceEmit||(this.emitter.emit("beforechange",{sender:this}),this.value_=t,this.emitter.emit("change",{options:n,previousRawValue:r,rawValue:this.value_,sender:this}))}}class yb{constructor(t){this.emitter=new ge,this.onValueBeforeChange_=this.onValueBeforeChange_.bind(this),this.onValueChange_=this.onValueChange_.bind(this),this.value_=t,this.value_.emitter.on("beforechange",this.onValueBeforeChange_),this.value_.emitter.on("change",this.onValueChange_)}get rawValue(){return this.value_.rawValue}onValueBeforeChange_(t){this.emitter.emit("beforechange",Object.assign(Object.assign({},t),{sender:this}))}onValueChange_(t){this.emitter.emit("change",Object.assign(Object.assign({},t),{sender:this}))}}function se(i,t){const e=t==null?void 0:t.constraint,n=t==null?void 0:t.equals;return!e&&!n?new bb(i):new xb(i,t)}function wb(i){return[new yb(i),(t,e)=>{i.setRawValue(t,e)}]}class It{constructor(t){this.emitter=new ge,this.valMap_=t;for(const e in this.valMap_)this.valMap_[e].emitter.on("change",()=>{this.emitter.emit("change",{key:e,sender:this})})}static createCore(t){return Object.keys(t).reduce((n,r)=>Object.assign(n,{[r]:se(t[r])}),{})}static fromObject(t){const e=this.createCore(t);return new It(e)}get(t){return this.valMap_[t].rawValue}set(t,e){this.valMap_[t].rawValue=e}value(t){return this.valMap_[t]}}class gs{constructor(t){this.values=It.fromObject({max:t.max,min:t.min})}constrain(t){const e=this.values.get("max"),n=this.values.get("min");return Math.min(Math.max(t,n),e)}}class Mb{constructor(t){this.values=It.fromObject({max:t.max,min:t.min})}constrain(t){const e=this.values.get("max"),n=this.values.get("min");let r=t;return Qt(n)||(r=Math.max(r,n)),Qt(e)||(r=Math.min(r,e)),r}}class Sb{constructor(t,e=0){this.step=t,this.origin=e}constrain(t){const e=this.origin%this.step,n=Math.round((t-e)/this.step);return e+n*this.step}}class Eb{constructor(t){this.text=t}evaluate(){return Number(this.text)}toString(){return this.text}}const Tb={"**":(i,t)=>Math.pow(i,t),"*":(i,t)=>i*t,"/":(i,t)=>i/t,"%":(i,t)=>i%t,"+":(i,t)=>i+t,"-":(i,t)=>i-t,"<<":(i,t)=>i<<t,">>":(i,t)=>i>>t,">>>":(i,t)=>i>>>t,"&":(i,t)=>i&t,"^":(i,t)=>i^t,"|":(i,t)=>i|t};class Ab{constructor(t,e,n){this.left=e,this.operator=t,this.right=n}evaluate(){const t=Tb[this.operator];if(!t)throw new Error(`unexpected binary operator: '${this.operator}`);return t(this.left.evaluate(),this.right.evaluate())}toString(){return["b(",this.left.toString(),this.operator,this.right.toString(),")"].join(" ")}}const Cb={"+":i=>i,"-":i=>-i,"~":i=>~i};class Pb{constructor(t,e){this.operator=t,this.expression=e}evaluate(){const t=Cb[this.operator];if(!t)throw new Error(`unexpected unary operator: '${this.operator}`);return t(this.expression.evaluate())}toString(){return["u(",this.operator,this.expression.toString(),")"].join(" ")}}function yl(i){return(t,e)=>{for(let n=0;n<i.length;n++){const r=i[n](t,e);if(r!=="")return r}return""}}function ss(i,t){var e;const n=i.substr(t).match(/^\s+/);return(e=n&&n[0])!==null&&e!==void 0?e:""}function Rb(i,t){const e=i.substr(t,1);return e.match(/^[1-9]$/)?e:""}function os(i,t){var e;const n=i.substr(t).match(/^[0-9]+/);return(e=n&&n[0])!==null&&e!==void 0?e:""}function Lb(i,t){const e=os(i,t);if(e!=="")return e;const n=i.substr(t,1);if(t+=1,n!=="-"&&n!=="+")return"";const r=os(i,t);return r===""?"":n+r}function wl(i,t){const e=i.substr(t,1);if(t+=1,e.toLowerCase()!=="e")return"";const n=Lb(i,t);return n===""?"":e+n}function bd(i,t){const e=i.substr(t,1);if(e==="0")return e;const n=Rb(i,t);return t+=n.length,n===""?"":n+os(i,t)}function Db(i,t){const e=bd(i,t);if(t+=e.length,e==="")return"";const n=i.substr(t,1);if(t+=n.length,n!==".")return"";const r=os(i,t);return t+=r.length,e+n+r+wl(i,t)}function Ib(i,t){const e=i.substr(t,1);if(t+=e.length,e!==".")return"";const n=os(i,t);return t+=n.length,n===""?"":e+n+wl(i,t)}function Nb(i,t){const e=bd(i,t);return t+=e.length,e===""?"":e+wl(i,t)}const Ub=yl([Db,Ib,Nb]);function Ob(i,t){var e;const n=i.substr(t).match(/^[01]+/);return(e=n&&n[0])!==null&&e!==void 0?e:""}function Fb(i,t){const e=i.substr(t,2);if(t+=e.length,e.toLowerCase()!=="0b")return"";const n=Ob(i,t);return n===""?"":e+n}function Bb(i,t){var e;const n=i.substr(t).match(/^[0-7]+/);return(e=n&&n[0])!==null&&e!==void 0?e:""}function kb(i,t){const e=i.substr(t,2);if(t+=e.length,e.toLowerCase()!=="0o")return"";const n=Bb(i,t);return n===""?"":e+n}function Vb(i,t){var e;const n=i.substr(t).match(/^[0-9a-f]+/i);return(e=n&&n[0])!==null&&e!==void 0?e:""}function zb(i,t){const e=i.substr(t,2);if(t+=e.length,e.toLowerCase()!=="0x")return"";const n=Vb(i,t);return n===""?"":e+n}const Hb=yl([Fb,kb,zb]),Gb=yl([Hb,Ub]);function Wb(i,t){const e=Gb(i,t);return t+=e.length,e===""?null:{evaluable:new Eb(e),cursor:t}}function Xb(i,t){const e=i.substr(t,1);if(t+=e.length,e!=="(")return null;const n=wd(i,t);if(!n)return null;t=n.cursor,t+=ss(i,t).length;const r=i.substr(t,1);return t+=r.length,r!==")"?null:{evaluable:n.evaluable,cursor:t}}function $b(i,t){var e;return(e=Wb(i,t))!==null&&e!==void 0?e:Xb(i,t)}function yd(i,t){const e=$b(i,t);if(e)return e;const n=i.substr(t,1);if(t+=n.length,n!=="+"&&n!=="-"&&n!=="~")return null;const r=yd(i,t);return r?(t=r.cursor,{cursor:t,evaluable:new Pb(n,r.evaluable)}):null}function Yb(i,t,e){e+=ss(t,e).length;const n=i.filter(r=>t.startsWith(r,e))[0];return n?(e+=n.length,e+=ss(t,e).length,{cursor:e,operator:n}):null}function qb(i,t){return(e,n)=>{const r=i(e,n);if(!r)return null;n=r.cursor;let s=r.evaluable;for(;;){const o=Yb(t,e,n);if(!o)break;n=o.cursor;const a=i(e,n);if(!a)return null;n=a.cursor,s=new Ab(o.operator,s,a.evaluable)}return s?{cursor:n,evaluable:s}:null}}const Kb=[["**"],["*","/","%"],["+","-"],["<<",">>>",">>"],["&"],["^"],["|"]].reduce((i,t)=>qb(i,t),yd);function wd(i,t){return t+=ss(i,t).length,Kb(i,t)}function jb(i){const t=wd(i,0);return!t||t.cursor+ss(i,t.cursor).length!==i.length?null:t.evaluable}function Ln(i){var t;const e=jb(i);return(t=e==null?void 0:e.evaluate())!==null&&t!==void 0?t:null}function Md(i){if(typeof i=="number")return i;if(typeof i=="string"){const t=Ln(i);if(!Qt(t))return t}return 0}function Zb(i){return String(i)}function ze(i){return t=>t.toFixed(Math.max(Math.min(i,20),0))}function qt(i,t,e,n,r){const s=(i-t)/(e-t);return n+s*(r-n)}function Bh(i){return String(i.toFixed(10)).split(".")[1].replace(/0+$/,"").length}function xe(i,t,e){return Math.min(Math.max(i,t),e)}function Sd(i,t){return(i%t+t)%t}function Jb(i,t){return Qt(i.step)?Math.max(Bh(t),2):Bh(i.step)}function Ed(i){var t;return(t=i.step)!==null&&t!==void 0?t:1}function Td(i,t){var e;const n=Math.abs((e=i.step)!==null&&e!==void 0?e:t);return n===0?.1:Math.pow(10,Math.floor(Math.log10(n))-1)}function Ad(i,t){return Qt(i.step)?null:new Sb(i.step,t)}function Cd(i){return!Qt(i.max)&&!Qt(i.min)?new gs({max:i.max,min:i.min}):!Qt(i.max)||!Qt(i.min)?new Mb({max:i.max,min:i.min}):null}function Pd(i,t){var e,n,r;return{formatter:(e=i.format)!==null&&e!==void 0?e:ze(Jb(i,t)),keyScale:(n=i.keyScale)!==null&&n!==void 0?n:Ed(i),pointerScale:(r=i.pointerScale)!==null&&r!==void 0?r:Td(i,t)}}function Rd(i){return{format:i.optional.function,keyScale:i.optional.number,max:i.optional.number,min:i.optional.number,pointerScale:i.optional.number,step:i.optional.number}}function Ml(i){return{constraint:i.constraint,textProps:It.fromObject(Pd(i.params,i.initialValue))}}class Ui{constructor(t){this.controller=t}get element(){return this.controller.view.element}get disabled(){return this.controller.viewProps.get("disabled")}set disabled(t){this.controller.viewProps.set("disabled",t)}get hidden(){return this.controller.viewProps.get("hidden")}set hidden(t){this.controller.viewProps.set("hidden",t)}dispose(){this.controller.viewProps.set("disposed",!0)}importState(t){return this.controller.importState(t)}exportState(){return this.controller.exportState()}}class Vo{constructor(t){this.target=t}}class xs extends Vo{constructor(t,e,n){super(t),this.value=e,this.last=n??!0}}class Qb extends Vo{constructor(t,e){super(t),this.expanded=e}}class ty extends Vo{constructor(t,e){super(t),this.index=e}}class ey extends Vo{constructor(t,e){super(t),this.native=e}}class as extends Ui{constructor(t){super(t),this.onValueChange_=this.onValueChange_.bind(this),this.emitter_=new ge,this.controller.value.emitter.on("change",this.onValueChange_)}get label(){return this.controller.labelController.props.get("label")}set label(t){this.controller.labelController.props.set("label",t)}get key(){return this.controller.value.binding.target.key}get tag(){return this.controller.tag}set tag(t){this.controller.tag=t}on(t,e){const n=e.bind(this);return this.emitter_.on(t,r=>{n(r)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}refresh(){this.controller.value.fetch()}onValueChange_(t){const e=this.controller.value;this.emitter_.emit("change",new xs(this,e.binding.target.read(),t.options.last))}}class ny{constructor(t,e){this.onValueBeforeChange_=this.onValueBeforeChange_.bind(this),this.onValueChange_=this.onValueChange_.bind(this),this.binding=e,this.value_=t,this.value_.emitter.on("beforechange",this.onValueBeforeChange_),this.value_.emitter.on("change",this.onValueChange_),this.emitter=new ge}get rawValue(){return this.value_.rawValue}set rawValue(t){this.value_.rawValue=t}setRawValue(t,e){this.value_.setRawValue(t,e)}fetch(){this.value_.rawValue=this.binding.read()}push(){this.binding.write(this.value_.rawValue)}onValueBeforeChange_(t){this.emitter.emit("beforechange",Object.assign(Object.assign({},t),{sender:this}))}onValueChange_(t){this.push(),this.emitter.emit("change",Object.assign(Object.assign({},t),{sender:this}))}}function iy(i){if(!("binding"in i))return!1;const t=i.binding;return bl(t)&&"read"in t&&"write"in t}function ry(i,t){const n=Object.keys(t).reduce((r,s)=>{if(r===void 0)return;const o=t[s],a=o(i[s]);return a.succeeded?Object.assign(Object.assign({},r),{[s]:a.value}):void 0},{});return n}function sy(i,t){return i.reduce((e,n)=>{if(e===void 0)return;const r=t(n);if(!(!r.succeeded||r.value===void 0))return[...e,r.value]},[])}function oy(i){return i===null?!1:typeof i=="object"}function En(i){return t=>e=>{if(!t&&e===void 0)return{succeeded:!1,value:void 0};if(t&&e===void 0)return{succeeded:!0,value:void 0};const n=i(e);return n!==void 0?{succeeded:!0,value:n}:{succeeded:!1,value:void 0}}}function kh(i){return{custom:t=>En(t)(i),boolean:En(t=>typeof t=="boolean"?t:void 0)(i),number:En(t=>typeof t=="number"?t:void 0)(i),string:En(t=>typeof t=="string"?t:void 0)(i),function:En(t=>typeof t=="function"?t:void 0)(i),constant:t=>En(e=>e===t?t:void 0)(i),raw:En(t=>t)(i),object:t=>En(e=>{if(oy(e))return ry(e,t)})(i),array:t=>En(e=>{if(Array.isArray(e))return sy(e,t)})(i)}}const il={optional:kh(!0),required:kh(!1)};function le(i,t){const e=t(il),n=il.required.object(e)(i);return n.succeeded?n.value:void 0}function Ye(i,t,e,n){if(t&&!t(i))return!1;const r=le(i,e);return r?n(r):!1}function qe(i,t){var e;return Pi((e=i==null?void 0:i())!==null&&e!==void 0?e:{},t)}function Ei(i){return"value"in i}function Ld(i){if(!xl(i)||!("binding"in i))return!1;const t=i.binding;return bl(t)}const fn="http://www.w3.org/2000/svg";function Co(i){i.offsetHeight}function ay(i,t){const e=i.style.transition;i.style.transition="none",t(),i.style.transition=e}function Sl(i){return i.ontouchstart!==void 0}function ly(){return globalThis}function cy(){return ly().document}function hy(i){const t=i.ownerDocument.defaultView;return t&&"document"in t?i.getContext("2d",{willReadFrequently:!0}):null}const uy={check:'<path d="M2 8l4 4l8 -8"/>',dropdown:'<path d="M5 7h6l-3 3 z"/>',p2dpad:'<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'};function zo(i,t){const e=i.createElementNS(fn,"svg");return e.innerHTML=uy[t],e}function Dd(i,t,e){i.insertBefore(t,i.children[e])}function El(i){i.parentElement&&i.parentElement.removeChild(i)}function Id(i){for(;i.children.length>0;)i.removeChild(i.children[0])}function dy(i){for(;i.childNodes.length>0;)i.removeChild(i.childNodes[0])}function Nd(i){return i.relatedTarget?i.relatedTarget:"explicitOriginalTarget"in i?i.explicitOriginalTarget:null}function Pn(i,t){i.emitter.on("change",e=>{t(e.rawValue)}),t(i.rawValue)}function vn(i,t,e){Pn(i.value(t),e)}const py="tp";function Gt(i){return(e,n)=>[py,"-",i,"v",e?`_${e}`:"",n?`-${n}`:""].join("")}const Br=Gt("lbl");function fy(i,t){const e=i.createDocumentFragment();return t.split(`
`).map(r=>i.createTextNode(r)).forEach((r,s)=>{s>0&&e.appendChild(i.createElement("br")),e.appendChild(r)}),e}class Ud{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(Br()),e.viewProps.bindClassModifiers(this.element);const n=t.createElement("div");n.classList.add(Br("l")),vn(e.props,"label",s=>{Qt(s)?this.element.classList.add(Br(void 0,"nol")):(this.element.classList.remove(Br(void 0,"nol")),dy(n),n.appendChild(fy(t,s)))}),this.element.appendChild(n),this.labelElement=n;const r=t.createElement("div");r.classList.add(Br("v")),this.element.appendChild(r),this.valueElement=r}}class Od{constructor(t,e){this.props=e.props,this.valueController=e.valueController,this.viewProps=e.valueController.viewProps,this.view=new Ud(t,{props:e.props,viewProps:this.viewProps}),this.view.valueElement.appendChild(this.valueController.view.element)}importProps(t){return Ye(t,null,e=>({label:e.optional.string}),e=>(this.props.set("label",e.label),!0))}exportProps(){return qe(null,{label:this.props.get("label")})}}function my(){return["veryfirst","first","last","verylast"]}const Vh=Gt(""),zh={veryfirst:"vfst",first:"fst",last:"lst",verylast:"vlst"};class Ho{constructor(t){this.parent_=null,this.blade=t.blade,this.view=t.view,this.viewProps=t.viewProps;const e=this.view.element;this.blade.value("positions").emitter.on("change",()=>{my().forEach(n=>{e.classList.remove(Vh(void 0,zh[n]))}),this.blade.get("positions").forEach(n=>{e.classList.add(Vh(void 0,zh[n]))})}),this.viewProps.handleDispose(()=>{El(e)})}get parent(){return this.parent_}set parent(t){this.parent_=t,this.viewProps.set("parent",this.parent_?this.parent_.viewProps:null)}importState(t){return Ye(t,null,e=>({disabled:e.required.boolean,hidden:e.required.boolean}),e=>(this.viewProps.importState(e),!0))}exportState(){return qe(null,Object.assign({},this.viewProps.exportState()))}}class Ri extends Ho{constructor(t,e){if(e.value!==e.valueController.value)throw he.shouldNeverHappen();const n=e.valueController.viewProps,r=new Od(t,{blade:e.blade,props:e.props,valueController:e.valueController});super(Object.assign(Object.assign({},e),{view:new Ud(t,{props:e.props,viewProps:n}),viewProps:n})),this.labelController=r,this.value=e.value,this.valueController=e.valueController,this.view.valueElement.appendChild(this.valueController.view.element)}importState(t){return Ye(t,e=>{var n,r,s;return super.importState(e)&&this.labelController.importProps(e)&&((s=(r=(n=this.valueController).importProps)===null||r===void 0?void 0:r.call(n,t))!==null&&s!==void 0?s:!0)},e=>({value:e.optional.raw}),e=>(e.value&&(this.value.rawValue=e.value),!0))}exportState(){var t,e,n;return qe(()=>super.exportState(),Object.assign(Object.assign({value:this.value.rawValue},this.labelController.exportProps()),(n=(e=(t=this.valueController).exportProps)===null||e===void 0?void 0:e.call(t))!==null&&n!==void 0?n:{}))}}function Hh(i){const t=Object.assign({},i);return delete t.value,t}class Fd extends Ri{constructor(t,e){super(t,e),this.tag=e.tag}importState(t){return Ye(t,e=>super.importState(Hh(t)),e=>({tag:e.optional.string}),e=>(this.tag=e.tag,!0))}exportState(){return qe(()=>Hh(super.exportState()),{binding:{key:this.value.binding.target.key,value:this.value.binding.target.read()},tag:this.tag})}}function vy(i){return Ei(i)&&Ld(i.value)}class _y extends Fd{importState(t){return Ye(t,e=>super.importState(e),e=>({binding:e.required.object({value:e.required.raw})}),e=>(this.value.binding.inject(e.binding.value),this.value.fetch(),!0))}}function gy(i){return Ei(i)&&iy(i.value)}function Bd(i,t){for(;i.length<t;)i.push(void 0)}function xy(i){const t=[];return Bd(t,i),t}function by(i){const t=i.indexOf(void 0);return t<0?i:i.slice(0,t)}function yy(i,t){const e=[...by(i),t];return e.length>i.length?e.splice(0,e.length-i.length):Bd(e,i.length),e}class wy{constructor(t){this.emitter=new ge,this.onTick_=this.onTick_.bind(this),this.onValueBeforeChange_=this.onValueBeforeChange_.bind(this),this.onValueChange_=this.onValueChange_.bind(this),this.binding=t.binding,this.value_=se(xy(t.bufferSize)),this.value_.emitter.on("beforechange",this.onValueBeforeChange_),this.value_.emitter.on("change",this.onValueChange_),this.ticker=t.ticker,this.ticker.emitter.on("tick",this.onTick_),this.fetch()}get rawValue(){return this.value_.rawValue}set rawValue(t){this.value_.rawValue=t}setRawValue(t,e){this.value_.setRawValue(t,e)}fetch(){this.value_.rawValue=yy(this.value_.rawValue,this.binding.read())}onTick_(){this.fetch()}onValueBeforeChange_(t){this.emitter.emit("beforechange",Object.assign(Object.assign({},t),{sender:this}))}onValueChange_(t){this.emitter.emit("change",Object.assign(Object.assign({},t),{sender:this}))}}function My(i){if(!("binding"in i))return!1;const t=i.binding;return bl(t)&&"read"in t&&!("write"in t)}class Sy extends Fd{exportState(){return qe(()=>super.exportState(),{binding:{readonly:!0}})}}function Ey(i){return Ei(i)&&My(i.value)}class Ty extends Ui{get label(){return this.controller.labelController.props.get("label")}set label(t){this.controller.labelController.props.set("label",t)}get title(){var t;return(t=this.controller.buttonController.props.get("title"))!==null&&t!==void 0?t:""}set title(t){this.controller.buttonController.props.set("title",t)}on(t,e){const n=e.bind(this);return this.controller.buttonController.emitter.on(t,s=>{n(new ey(this,s.nativeEvent))}),this}off(t,e){return this.controller.buttonController.emitter.off(t,e),this}}function Ay(i,t,e){e?i.classList.add(t):i.classList.remove(t)}function Tr(i,t){return e=>{Ay(i,t,e)}}function Tl(i,t){Pn(i,e=>{t.textContent=e??""})}const Ia=Gt("btn");class Cy{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(Ia()),e.viewProps.bindClassModifiers(this.element);const n=t.createElement("button");n.classList.add(Ia("b")),e.viewProps.bindDisabled(n),this.element.appendChild(n),this.buttonElement=n;const r=t.createElement("div");r.classList.add(Ia("t")),Tl(e.props.value("title"),r),this.buttonElement.appendChild(r)}}class Py{constructor(t,e){this.emitter=new ge,this.onClick_=this.onClick_.bind(this),this.props=e.props,this.viewProps=e.viewProps,this.view=new Cy(t,{props:this.props,viewProps:this.viewProps}),this.view.buttonElement.addEventListener("click",this.onClick_)}importProps(t){return Ye(t,null,e=>({title:e.optional.string}),e=>(this.props.set("title",e.title),!0))}exportProps(){return qe(null,{title:this.props.get("title")})}onClick_(t){this.emitter.emit("click",{nativeEvent:t,sender:this})}}class Gh extends Ho{constructor(t,e){const n=new Py(t,{props:e.buttonProps,viewProps:e.viewProps}),r=new Od(t,{blade:e.blade,props:e.labelProps,valueController:n});super({blade:e.blade,view:r.view,viewProps:e.viewProps}),this.buttonController=n,this.labelController=r}importState(t){return Ye(t,e=>super.importState(e)&&this.buttonController.importProps(e)&&this.labelController.importProps(e),()=>({}),()=>!0)}exportState(){return qe(()=>super.exportState(),Object.assign(Object.assign({},this.buttonController.exportProps()),this.labelController.exportProps()))}}class kd{constructor(t){const[e,n]=t.split("-"),r=e.split(".");this.major=parseInt(r[0],10),this.minor=parseInt(r[1],10),this.patch=parseInt(r[2],10),this.prerelease=n??null}toString(){const t=[this.major,this.minor,this.patch].join(".");return this.prerelease!==null?[t,this.prerelease].join("-"):t}}const Ar=new kd("2.0.3");function Fe(i){return Object.assign({core:Ar},i)}const Ry=Fe({id:"button",type:"blade",accept(i){const t=le(i,e=>({title:e.required.string,view:e.required.constant("button"),label:e.optional.string}));return t?{params:t}:null},controller(i){return new Gh(i.document,{blade:i.blade,buttonProps:It.fromObject({title:i.params.title}),labelProps:It.fromObject({label:i.params.label}),viewProps:i.viewProps})},api(i){return i.controller instanceof Gh?new Ty(i.controller):null}});function Ly(i,t){return i.addBlade(Object.assign(Object.assign({},t),{view:"button"}))}function Dy(i,t){return i.addBlade(Object.assign(Object.assign({},t),{view:"folder"}))}function Iy(i,t){return i.addBlade(Object.assign(Object.assign({},t),{view:"tab"}))}function Ny(i){return xl(i)?"refresh"in i&&typeof i.refresh=="function":!1}function Uy(i,t){if(!Ao.isBindable(i))throw he.notBindable();return new Ao(i,t)}class Oy{constructor(t,e){this.onRackValueChange_=this.onRackValueChange_.bind(this),this.controller_=t,this.emitter_=new ge,this.pool_=e,this.controller_.rack.emitter.on("valuechange",this.onRackValueChange_)}get children(){return this.controller_.rack.children.map(t=>this.pool_.createApi(t))}addBinding(t,e,n){const r=n??{},s=this.controller_.element.ownerDocument,o=this.pool_.createBinding(s,Uy(t,e),r),a=this.pool_.createBindingApi(o);return this.add(a,r.index)}addFolder(t){return Dy(this,t)}addButton(t){return Ly(this,t)}addTab(t){return Iy(this,t)}add(t,e){const n=t.controller;return this.controller_.rack.add(n,e),t}remove(t){this.controller_.rack.remove(t.controller)}addBlade(t){const e=this.controller_.element.ownerDocument,n=this.pool_.createBlade(e,t),r=this.pool_.createApi(n);return this.add(r,t.index)}on(t,e){const n=e.bind(this);return this.emitter_.on(t,r=>{n(r)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}refresh(){this.children.forEach(t=>{Ny(t)&&t.refresh()})}onRackValueChange_(t){const e=t.bladeController,n=this.pool_.createApi(e),r=Ld(e.value)?e.value.binding:null;this.emitter_.emit("change",new xs(n,r?r.target.read():e.value.rawValue,t.options.last))}}class Al extends Ui{constructor(t,e){super(t),this.rackApi_=new Oy(t.rackController,e)}refresh(){this.rackApi_.refresh()}}class Cl extends Ho{constructor(t){super({blade:t.blade,view:t.view,viewProps:t.rackController.viewProps}),this.rackController=t.rackController}importState(t){return Ye(t,e=>super.importState(e),e=>({children:e.required.array(e.required.raw)}),e=>this.rackController.rack.children.every((n,r)=>n.importState(e.children[r])))}exportState(){return qe(()=>super.exportState(),{children:this.rackController.rack.children.map(t=>t.exportState())})}}function rl(i){return"rackController"in i}class Fy{constructor(t){this.emitter=new ge,this.items_=[],this.cache_=new Set,this.onSubListAdd_=this.onSubListAdd_.bind(this),this.onSubListRemove_=this.onSubListRemove_.bind(this),this.extract_=t}get items(){return this.items_}allItems(){return Array.from(this.cache_)}find(t){for(const e of this.allItems())if(t(e))return e;return null}includes(t){return this.cache_.has(t)}add(t,e){if(this.includes(t))throw he.shouldNeverHappen();const n=e!==void 0?e:this.items_.length;this.items_.splice(n,0,t),this.cache_.add(t);const r=this.extract_(t);r&&(r.emitter.on("add",this.onSubListAdd_),r.emitter.on("remove",this.onSubListRemove_),r.allItems().forEach(s=>{this.cache_.add(s)})),this.emitter.emit("add",{index:n,item:t,root:this,target:this})}remove(t){const e=this.items_.indexOf(t);if(e<0)return;this.items_.splice(e,1),this.cache_.delete(t);const n=this.extract_(t);n&&(n.allItems().forEach(r=>{this.cache_.delete(r)}),n.emitter.off("add",this.onSubListAdd_),n.emitter.off("remove",this.onSubListRemove_)),this.emitter.emit("remove",{index:e,item:t,root:this,target:this})}onSubListAdd_(t){this.cache_.add(t.item),this.emitter.emit("add",{index:t.index,item:t.item,root:this,target:t.target})}onSubListRemove_(t){this.cache_.delete(t.item),this.emitter.emit("remove",{index:t.index,item:t.item,root:this,target:t.target})}}function By(i,t){for(let e=0;e<i.length;e++){const n=i[e];if(Ei(n)&&n.value===t)return n}return null}function ky(i){return rl(i)?i.rackController.rack.bcSet_:null}class Vy{constructor(t){var e,n;this.emitter=new ge,this.onBladePositionsChange_=this.onBladePositionsChange_.bind(this),this.onSetAdd_=this.onSetAdd_.bind(this),this.onSetRemove_=this.onSetRemove_.bind(this),this.onChildDispose_=this.onChildDispose_.bind(this),this.onChildPositionsChange_=this.onChildPositionsChange_.bind(this),this.onChildValueChange_=this.onChildValueChange_.bind(this),this.onChildViewPropsChange_=this.onChildViewPropsChange_.bind(this),this.onRackLayout_=this.onRackLayout_.bind(this),this.onRackValueChange_=this.onRackValueChange_.bind(this),this.blade_=(e=t.blade)!==null&&e!==void 0?e:null,(n=this.blade_)===null||n===void 0||n.value("positions").emitter.on("change",this.onBladePositionsChange_),this.viewProps=t.viewProps,this.bcSet_=new Fy(ky),this.bcSet_.emitter.on("add",this.onSetAdd_),this.bcSet_.emitter.on("remove",this.onSetRemove_)}get children(){return this.bcSet_.items}add(t,e){var n;(n=t.parent)===null||n===void 0||n.remove(t),t.parent=this,this.bcSet_.add(t,e)}remove(t){t.parent=null,this.bcSet_.remove(t)}find(t){return this.bcSet_.allItems().filter(t)}onSetAdd_(t){this.updatePositions_();const e=t.target===t.root;if(this.emitter.emit("add",{bladeController:t.item,index:t.index,root:e,sender:this}),!e)return;const n=t.item;if(n.viewProps.emitter.on("change",this.onChildViewPropsChange_),n.blade.value("positions").emitter.on("change",this.onChildPositionsChange_),n.viewProps.handleDispose(this.onChildDispose_),Ei(n))n.value.emitter.on("change",this.onChildValueChange_);else if(rl(n)){const r=n.rackController.rack;if(r){const s=r.emitter;s.on("layout",this.onRackLayout_),s.on("valuechange",this.onRackValueChange_)}}}onSetRemove_(t){this.updatePositions_();const e=t.target===t.root;if(this.emitter.emit("remove",{bladeController:t.item,root:e,sender:this}),!e)return;const n=t.item;if(Ei(n))n.value.emitter.off("change",this.onChildValueChange_);else if(rl(n)){const r=n.rackController.rack;if(r){const s=r.emitter;s.off("layout",this.onRackLayout_),s.off("valuechange",this.onRackValueChange_)}}}updatePositions_(){const t=this.bcSet_.items.filter(r=>!r.viewProps.get("hidden")),e=t[0],n=t[t.length-1];this.bcSet_.items.forEach(r=>{const s=[];r===e&&(s.push("first"),(!this.blade_||this.blade_.get("positions").includes("veryfirst"))&&s.push("veryfirst")),r===n&&(s.push("last"),(!this.blade_||this.blade_.get("positions").includes("verylast"))&&s.push("verylast")),r.blade.set("positions",s)})}onChildPositionsChange_(){this.updatePositions_(),this.emitter.emit("layout",{sender:this})}onChildViewPropsChange_(t){this.updatePositions_(),this.emitter.emit("layout",{sender:this})}onChildDispose_(){this.bcSet_.items.filter(e=>e.viewProps.get("disposed")).forEach(e=>{this.bcSet_.remove(e)})}onChildValueChange_(t){const e=By(this.find(Ei),t.sender);if(!e)throw he.alreadyDisposed();this.emitter.emit("valuechange",{bladeController:e,options:t.options,sender:this})}onRackLayout_(t){this.updatePositions_(),this.emitter.emit("layout",{sender:this})}onRackValueChange_(t){this.emitter.emit("valuechange",{bladeController:t.bladeController,options:t.options,sender:this})}onBladePositionsChange_(){this.updatePositions_()}}class Pl{constructor(t){this.onRackAdd_=this.onRackAdd_.bind(this),this.onRackRemove_=this.onRackRemove_.bind(this),this.element=t.element,this.viewProps=t.viewProps;const e=new Vy({blade:t.root?void 0:t.blade,viewProps:t.viewProps});e.emitter.on("add",this.onRackAdd_),e.emitter.on("remove",this.onRackRemove_),this.rack=e,this.viewProps.handleDispose(()=>{for(let n=this.rack.children.length-1;n>=0;n--)this.rack.children[n].viewProps.set("disposed",!0)})}onRackAdd_(t){t.root&&Dd(this.element,t.bladeController.view.element,t.index)}onRackRemove_(t){t.root&&El(t.bladeController.view.element)}}function Cr(){return new It({positions:se([],{equals:_b})})}class bs extends It{constructor(t){super(t)}static create(t){const e={completed:!0,expanded:t,expandedHeight:null,shouldFixHeight:!1,temporaryExpanded:null},n=It.createCore(e);return new bs(n)}get styleExpanded(){var t;return(t=this.get("temporaryExpanded"))!==null&&t!==void 0?t:this.get("expanded")}get styleHeight(){if(!this.styleExpanded)return"0";const t=this.get("expandedHeight");return this.get("shouldFixHeight")&&!Qt(t)?`${t}px`:"auto"}bindExpandedClass(t,e){const n=()=>{this.styleExpanded?t.classList.add(e):t.classList.remove(e)};vn(this,"expanded",n),vn(this,"temporaryExpanded",n)}cleanUpTransition(){this.set("shouldFixHeight",!1),this.set("expandedHeight",null),this.set("completed",!0)}}function zy(i,t){let e=0;return ay(t,()=>{i.set("expandedHeight",null),i.set("temporaryExpanded",!0),Co(t),e=t.clientHeight,i.set("temporaryExpanded",null),Co(t)}),e}function Wh(i,t){t.style.height=i.styleHeight}function Rl(i,t){i.value("expanded").emitter.on("beforechange",()=>{if(i.set("completed",!1),Qt(i.get("expandedHeight"))){const e=zy(i,t);e>0&&i.set("expandedHeight",e)}i.set("shouldFixHeight",!0),Co(t)}),i.emitter.on("change",()=>{Wh(i,t)}),Wh(i,t),t.addEventListener("transitionend",e=>{e.propertyName==="height"&&i.cleanUpTransition()})}class Vd extends Al{constructor(t,e){super(t,e),this.emitter_=new ge,this.controller.foldable.value("expanded").emitter.on("change",n=>{this.emitter_.emit("fold",new Qb(this,n.sender.rawValue))}),this.rackApi_.on("change",n=>{this.emitter_.emit("change",n)})}get expanded(){return this.controller.foldable.get("expanded")}set expanded(t){this.controller.foldable.set("expanded",t)}get title(){return this.controller.props.get("title")}set title(t){this.controller.props.set("title",t)}get children(){return this.rackApi_.children}addBinding(t,e,n){return this.rackApi_.addBinding(t,e,n)}addFolder(t){return this.rackApi_.addFolder(t)}addButton(t){return this.rackApi_.addButton(t)}addTab(t){return this.rackApi_.addTab(t)}add(t,e){return this.rackApi_.add(t,e)}remove(t){this.rackApi_.remove(t)}addBlade(t){return this.rackApi_.addBlade(t)}on(t,e){const n=e.bind(this);return this.emitter_.on(t,r=>{n(r)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}}const zd=Gt("cnt");class Hy{constructor(t,e){var n;this.className_=Gt((n=e.viewName)!==null&&n!==void 0?n:"fld"),this.element=t.createElement("div"),this.element.classList.add(this.className_(),zd()),e.viewProps.bindClassModifiers(this.element),this.foldable_=e.foldable,this.foldable_.bindExpandedClass(this.element,this.className_(void 0,"expanded")),vn(this.foldable_,"completed",Tr(this.element,this.className_(void 0,"cpl")));const r=t.createElement("button");r.classList.add(this.className_("b")),vn(e.props,"title",c=>{Qt(c)?this.element.classList.add(this.className_(void 0,"not")):this.element.classList.remove(this.className_(void 0,"not"))}),e.viewProps.bindDisabled(r),this.element.appendChild(r),this.buttonElement=r;const s=t.createElement("div");s.classList.add(this.className_("i")),this.element.appendChild(s);const o=t.createElement("div");o.classList.add(this.className_("t")),Tl(e.props.value("title"),o),this.buttonElement.appendChild(o),this.titleElement=o;const a=t.createElement("div");a.classList.add(this.className_("m")),this.buttonElement.appendChild(a);const l=t.createElement("div");l.classList.add(this.className_("c")),this.element.appendChild(l),this.containerElement=l}}class sl extends Cl{constructor(t,e){var n;const r=bs.create((n=e.expanded)!==null&&n!==void 0?n:!0),s=new Hy(t,{foldable:r,props:e.props,viewName:e.root?"rot":void 0,viewProps:e.viewProps});super(Object.assign(Object.assign({},e),{rackController:new Pl({blade:e.blade,element:s.containerElement,root:e.root,viewProps:e.viewProps}),view:s})),this.onTitleClick_=this.onTitleClick_.bind(this),this.props=e.props,this.foldable=r,Rl(this.foldable,this.view.containerElement),this.rackController.rack.emitter.on("add",()=>{this.foldable.cleanUpTransition()}),this.rackController.rack.emitter.on("remove",()=>{this.foldable.cleanUpTransition()}),this.view.buttonElement.addEventListener("click",this.onTitleClick_)}get document(){return this.view.element.ownerDocument}importState(t){return Ye(t,e=>super.importState(e),e=>({expanded:e.required.boolean,title:e.optional.string}),e=>(this.foldable.set("expanded",e.expanded),this.props.set("title",e.title),!0))}exportState(){return qe(()=>super.exportState(),{expanded:this.foldable.get("expanded"),title:this.props.get("title")})}onTitleClick_(){this.foldable.set("expanded",!this.foldable.get("expanded"))}}const Gy=Fe({id:"folder",type:"blade",accept(i){const t=le(i,e=>({title:e.required.string,view:e.required.constant("folder"),expanded:e.optional.boolean}));return t?{params:t}:null},controller(i){return new sl(i.document,{blade:i.blade,expanded:i.params.expanded,props:It.fromObject({title:i.params.title}),viewProps:i.viewProps})},api(i){return i.controller instanceof sl?new Vd(i.controller,i.pool):null}}),Wy=Gt("");function Xh(i,t){return Tr(i,Wy(void 0,t))}class In extends It{constructor(t){var e;super(t),this.onDisabledChange_=this.onDisabledChange_.bind(this),this.onParentChange_=this.onParentChange_.bind(this),this.onParentGlobalDisabledChange_=this.onParentGlobalDisabledChange_.bind(this),[this.globalDisabled_,this.setGlobalDisabled_]=wb(se(this.getGlobalDisabled_())),this.value("disabled").emitter.on("change",this.onDisabledChange_),this.value("parent").emitter.on("change",this.onParentChange_),(e=this.get("parent"))===null||e===void 0||e.globalDisabled.emitter.on("change",this.onParentGlobalDisabledChange_)}static create(t){var e,n,r;const s=t??{};return new In(It.createCore({disabled:(e=s.disabled)!==null&&e!==void 0?e:!1,disposed:!1,hidden:(n=s.hidden)!==null&&n!==void 0?n:!1,parent:(r=s.parent)!==null&&r!==void 0?r:null}))}get globalDisabled(){return this.globalDisabled_}bindClassModifiers(t){Pn(this.globalDisabled_,Xh(t,"disabled")),vn(this,"hidden",Xh(t,"hidden"))}bindDisabled(t){Pn(this.globalDisabled_,e=>{t.disabled=e})}bindTabIndex(t){Pn(this.globalDisabled_,e=>{t.tabIndex=e?-1:0})}handleDispose(t){this.value("disposed").emitter.on("change",e=>{e&&t()})}importState(t){this.set("disabled",t.disabled),this.set("hidden",t.hidden)}exportState(){return{disabled:this.get("disabled"),hidden:this.get("hidden")}}getGlobalDisabled_(){const t=this.get("parent");return(t?t.globalDisabled.rawValue:!1)||this.get("disabled")}updateGlobalDisabled_(){this.setGlobalDisabled_(this.getGlobalDisabled_())}onDisabledChange_(){this.updateGlobalDisabled_()}onParentGlobalDisabledChange_(){this.updateGlobalDisabled_()}onParentChange_(t){var e;const n=t.previousRawValue;n==null||n.globalDisabled.emitter.off("change",this.onParentGlobalDisabledChange_),(e=this.get("parent"))===null||e===void 0||e.globalDisabled.emitter.on("change",this.onParentGlobalDisabledChange_),this.updateGlobalDisabled_()}}const $h=Gt("tbp");class Xy{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add($h()),e.viewProps.bindClassModifiers(this.element);const n=t.createElement("div");n.classList.add($h("c")),this.element.appendChild(n),this.containerElement=n}}const kr=Gt("tbi");class $y{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(kr()),e.viewProps.bindClassModifiers(this.element),vn(e.props,"selected",s=>{s?this.element.classList.add(kr(void 0,"sel")):this.element.classList.remove(kr(void 0,"sel"))});const n=t.createElement("button");n.classList.add(kr("b")),e.viewProps.bindDisabled(n),this.element.appendChild(n),this.buttonElement=n;const r=t.createElement("div");r.classList.add(kr("t")),Tl(e.props.value("title"),r),this.buttonElement.appendChild(r),this.titleElement=r}}class Yy{constructor(t,e){this.emitter=new ge,this.onClick_=this.onClick_.bind(this),this.props=e.props,this.viewProps=e.viewProps,this.view=new $y(t,{props:e.props,viewProps:e.viewProps}),this.view.buttonElement.addEventListener("click",this.onClick_)}onClick_(){this.emitter.emit("click",{sender:this})}}class ol extends Cl{constructor(t,e){const n=new Xy(t,{viewProps:e.viewProps});super(Object.assign(Object.assign({},e),{rackController:new Pl({blade:e.blade,element:n.containerElement,viewProps:e.viewProps}),view:n})),this.onItemClick_=this.onItemClick_.bind(this),this.ic_=new Yy(t,{props:e.itemProps,viewProps:In.create()}),this.ic_.emitter.on("click",this.onItemClick_),this.props=e.props,vn(this.props,"selected",r=>{this.itemController.props.set("selected",r),this.viewProps.set("hidden",!r)})}get itemController(){return this.ic_}importState(t){return Ye(t,e=>super.importState(e),e=>({selected:e.required.boolean,title:e.required.string}),e=>(this.ic_.props.set("selected",e.selected),this.ic_.props.set("title",e.title),!0))}exportState(){return qe(()=>super.exportState(),{selected:this.ic_.props.get("selected"),title:this.ic_.props.get("title")})}onItemClick_(){this.props.set("selected",!0)}}class qy extends Al{constructor(t,e){super(t,e),this.emitter_=new ge,this.onSelect_=this.onSelect_.bind(this),this.pool_=e,this.rackApi_.on("change",n=>{this.emitter_.emit("change",n)}),this.controller.tab.selectedIndex.emitter.on("change",this.onSelect_)}get pages(){return this.rackApi_.children}addPage(t){const e=this.controller.view.element.ownerDocument,n=new ol(e,{blade:Cr(),itemProps:It.fromObject({selected:!1,title:t.title}),props:It.fromObject({selected:!1}),viewProps:In.create()}),r=this.pool_.createApi(n);return this.rackApi_.add(r,t.index)}removePage(t){this.rackApi_.remove(this.rackApi_.children[t])}on(t,e){const n=e.bind(this);return this.emitter_.on(t,r=>{n(r)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}onSelect_(t){this.emitter_.emit("select",new ty(this,t.rawValue))}}class Ky extends Al{get title(){var t;return(t=this.controller.itemController.props.get("title"))!==null&&t!==void 0?t:""}set title(t){this.controller.itemController.props.set("title",t)}get selected(){return this.controller.props.get("selected")}set selected(t){this.controller.props.set("selected",t)}get children(){return this.rackApi_.children}addButton(t){return this.rackApi_.addButton(t)}addFolder(t){return this.rackApi_.addFolder(t)}addTab(t){return this.rackApi_.addTab(t)}add(t,e){this.rackApi_.add(t,e)}remove(t){this.rackApi_.remove(t)}addBinding(t,e,n){return this.rackApi_.addBinding(t,e,n)}addBlade(t){return this.rackApi_.addBlade(t)}}const Yh=-1;class jy{constructor(){this.onItemSelectedChange_=this.onItemSelectedChange_.bind(this),this.empty=se(!0),this.selectedIndex=se(Yh),this.items_=[]}add(t,e){const n=e??this.items_.length;this.items_.splice(n,0,t),t.emitter.on("change",this.onItemSelectedChange_),this.keepSelection_()}remove(t){const e=this.items_.indexOf(t);e<0||(this.items_.splice(e,1),t.emitter.off("change",this.onItemSelectedChange_),this.keepSelection_())}keepSelection_(){if(this.items_.length===0){this.selectedIndex.rawValue=Yh,this.empty.rawValue=!0;return}const t=this.items_.findIndex(e=>e.rawValue);t<0?(this.items_.forEach((e,n)=>{e.rawValue=n===0}),this.selectedIndex.rawValue=0):(this.items_.forEach((e,n)=>{e.rawValue=n===t}),this.selectedIndex.rawValue=t),this.empty.rawValue=!1}onItemSelectedChange_(t){if(t.rawValue){const e=this.items_.findIndex(n=>n===t.sender);this.items_.forEach((n,r)=>{n.rawValue=r===e}),this.selectedIndex.rawValue=e}else this.keepSelection_()}}const Vr=Gt("tab");class Zy{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(Vr(),zd()),e.viewProps.bindClassModifiers(this.element),Pn(e.empty,Tr(this.element,Vr(void 0,"nop")));const n=t.createElement("div");n.classList.add(Vr("t")),this.element.appendChild(n),this.itemsElement=n;const r=t.createElement("div");r.classList.add(Vr("i")),this.element.appendChild(r);const s=t.createElement("div");s.classList.add(Vr("c")),this.element.appendChild(s),this.contentsElement=s}}class qh extends Cl{constructor(t,e){const n=new jy,r=new Zy(t,{empty:n.empty,viewProps:e.viewProps});super({blade:e.blade,rackController:new Pl({blade:e.blade,element:r.contentsElement,viewProps:e.viewProps}),view:r}),this.onRackAdd_=this.onRackAdd_.bind(this),this.onRackRemove_=this.onRackRemove_.bind(this);const s=this.rackController.rack;s.emitter.on("add",this.onRackAdd_),s.emitter.on("remove",this.onRackRemove_),this.tab=n}add(t,e){this.rackController.rack.add(t,e)}remove(t){this.rackController.rack.remove(this.rackController.rack.children[t])}onRackAdd_(t){if(!t.root)return;const e=t.bladeController;Dd(this.view.itemsElement,e.itemController.view.element,t.index),e.itemController.viewProps.set("parent",this.viewProps),this.tab.add(e.props.value("selected"))}onRackRemove_(t){if(!t.root)return;const e=t.bladeController;El(e.itemController.view.element),e.itemController.viewProps.set("parent",null),this.tab.remove(e.props.value("selected"))}}const Hd=Fe({id:"tab",type:"blade",accept(i){const t=le(i,e=>({pages:e.required.array(e.required.object({title:e.required.string})),view:e.required.constant("tab")}));return!t||t.pages.length===0?null:{params:t}},controller(i){const t=new qh(i.document,{blade:i.blade,viewProps:i.viewProps});return i.params.pages.forEach(e=>{const n=new ol(i.document,{blade:Cr(),itemProps:It.fromObject({selected:!1,title:e.title}),props:It.fromObject({selected:!1}),viewProps:In.create()});t.add(n)}),t},api(i){return i.controller instanceof qh?new qy(i.controller,i.pool):i.controller instanceof ol?new Ky(i.controller,i.pool):null}});function Jy(i,t){const e=i.accept(t.params);if(!e)return null;const n=le(t.params,r=>({disabled:r.optional.boolean,hidden:r.optional.boolean}));return i.controller({blade:Cr(),document:t.document,params:Object.assign(Object.assign({},e.params),{disabled:n==null?void 0:n.disabled,hidden:n==null?void 0:n.hidden}),viewProps:In.create({disabled:n==null?void 0:n.disabled,hidden:n==null?void 0:n.hidden})})}class Ll extends as{get options(){return this.controller.valueController.props.get("options")}set options(t){this.controller.valueController.props.set("options",t)}}class Qy{constructor(){this.disabled=!1,this.emitter=new ge}dispose(){}tick(){this.disabled||this.emitter.emit("tick",{sender:this})}}class tw{constructor(t,e){this.disabled_=!1,this.timerId_=null,this.onTick_=this.onTick_.bind(this),this.doc_=t,this.emitter=new ge,this.interval_=e,this.setTimer_()}get disabled(){return this.disabled_}set disabled(t){this.disabled_=t,this.disabled_?this.clearTimer_():this.setTimer_()}dispose(){this.clearTimer_()}clearTimer_(){if(this.timerId_===null)return;const t=this.doc_.defaultView;t&&t.clearInterval(this.timerId_),this.timerId_=null}setTimer_(){if(this.clearTimer_(),this.interval_<=0)return;const t=this.doc_.defaultView;t&&(this.timerId_=t.setInterval(this.onTick_,this.interval_))}onTick_(){this.disabled_||this.emitter.emit("tick",{sender:this})}}class ys{constructor(t){this.constraints=t}constrain(t){return this.constraints.reduce((e,n)=>n.constrain(e),t)}}function Po(i,t){if(i instanceof t)return i;if(i instanceof ys){const e=i.constraints.reduce((n,r)=>n||(r instanceof t?r:null),null);if(e)return e}return null}class ws{constructor(t){this.values=It.fromObject({options:t})}constrain(t){const e=this.values.get("options");return e.length===0||e.filter(r=>r.value===t).length>0?t:e[0].value}}function Ms(i){var t;const e=il;if(Array.isArray(i))return(t=le({items:i},n=>({items:n.required.array(n.required.object({text:n.required.string,value:n.required.raw}))})))===null||t===void 0?void 0:t.items;if(typeof i=="object")return e.required.raw(i).value}function Dl(i){if(Array.isArray(i))return i;const t=[];return Object.keys(i).forEach(e=>{t.push({text:e,value:i[e]})}),t}function Il(i){return Qt(i)?null:new ws(Dl(i))}const Na=Gt("lst");class ew{constructor(t,e){this.onValueChange_=this.onValueChange_.bind(this),this.props_=e.props,this.element=t.createElement("div"),this.element.classList.add(Na()),e.viewProps.bindClassModifiers(this.element);const n=t.createElement("select");n.classList.add(Na("s")),e.viewProps.bindDisabled(n),this.element.appendChild(n),this.selectElement=n;const r=t.createElement("div");r.classList.add(Na("m")),r.appendChild(zo(t,"dropdown")),this.element.appendChild(r),e.value.emitter.on("change",this.onValueChange_),this.value_=e.value,vn(this.props_,"options",s=>{Id(this.selectElement),s.forEach(o=>{const a=t.createElement("option");a.textContent=o.text,this.selectElement.appendChild(a)}),this.update_()})}update_(){const t=this.props_.get("options").map(e=>e.value);this.selectElement.selectedIndex=t.indexOf(this.value_.rawValue)}onValueChange_(){this.update_()}}class si{constructor(t,e){this.onSelectChange_=this.onSelectChange_.bind(this),this.props=e.props,this.value=e.value,this.viewProps=e.viewProps,this.view=new ew(t,{props:this.props,value:this.value,viewProps:this.viewProps}),this.view.selectElement.addEventListener("change",this.onSelectChange_)}onSelectChange_(t){const e=t.currentTarget;this.value.rawValue=this.props.get("options")[e.selectedIndex].value}importProps(t){return Ye(t,null,e=>({options:e.required.custom(Ms)}),e=>(this.props.set("options",Dl(e.options)),!0))}exportProps(){return qe(null,{options:this.props.get("options")})}}const Kh=Gt("pop");class nw{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(Kh()),e.viewProps.bindClassModifiers(this.element),Pn(e.shows,Tr(this.element,Kh(void 0,"v")))}}class Gd{constructor(t,e){this.shows=se(!1),this.viewProps=e.viewProps,this.view=new nw(t,{shows:this.shows,viewProps:this.viewProps})}}const jh=Gt("txt");class iw{constructor(t,e){this.onChange_=this.onChange_.bind(this),this.element=t.createElement("div"),this.element.classList.add(jh()),e.viewProps.bindClassModifiers(this.element),this.props_=e.props,this.props_.emitter.on("change",this.onChange_);const n=t.createElement("input");n.classList.add(jh("i")),n.type="text",e.viewProps.bindDisabled(n),this.element.appendChild(n),this.inputElement=n,e.value.emitter.on("change",this.onChange_),this.value_=e.value,this.refresh()}refresh(){const t=this.props_.get("formatter");this.inputElement.value=t(this.value_.rawValue)}onChange_(){this.refresh()}}class ls{constructor(t,e){this.onInputChange_=this.onInputChange_.bind(this),this.parser_=e.parser,this.props=e.props,this.value=e.value,this.viewProps=e.viewProps,this.view=new iw(t,{props:e.props,value:this.value,viewProps:this.viewProps}),this.view.inputElement.addEventListener("change",this.onInputChange_)}onInputChange_(t){const n=t.currentTarget.value,r=this.parser_(n);Qt(r)||(this.value.rawValue=r),this.view.refresh()}}function rw(i){return String(i)}function Wd(i){return i==="false"?!1:!!i}function Zh(i){return rw(i)}function sw(i){return t=>i.reduce((e,n)=>e!==null?e:n(t),null)}const ow=ze(0);function Ro(i){return ow(i)+"%"}function Xd(i){return String(i)}function al(i){return i}function Pr({primary:i,secondary:t,forward:e,backward:n}){let r=!1;function s(o){r||(r=!0,o(),r=!1)}i.emitter.on("change",o=>{s(()=>{t.setRawValue(e(i.rawValue,t.rawValue),o.options)})}),t.emitter.on("change",o=>{s(()=>{i.setRawValue(n(i.rawValue,t.rawValue),o.options)}),s(()=>{t.setRawValue(e(i.rawValue,t.rawValue),o.options)})}),s(()=>{t.setRawValue(e(i.rawValue,t.rawValue),{forceEmit:!1,last:!0})})}function ke(i,t){const e=i*(t.altKey?.1:1)*(t.shiftKey?10:1);return t.upKey?+e:t.downKey?-e:0}function cs(i){return{altKey:i.altKey,downKey:i.key==="ArrowDown",shiftKey:i.shiftKey,upKey:i.key==="ArrowUp"}}function Dn(i){return{altKey:i.altKey,downKey:i.key==="ArrowLeft",shiftKey:i.shiftKey,upKey:i.key==="ArrowRight"}}function aw(i){return i==="ArrowUp"||i==="ArrowDown"}function $d(i){return aw(i)||i==="ArrowLeft"||i==="ArrowRight"}function Ua(i,t){var e,n;const r=t.ownerDocument.defaultView,s=t.getBoundingClientRect();return{x:i.pageX-(((e=r&&r.scrollX)!==null&&e!==void 0?e:0)+s.left),y:i.pageY-(((n=r&&r.scrollY)!==null&&n!==void 0?n:0)+s.top)}}class Oi{constructor(t){this.lastTouch_=null,this.onDocumentMouseMove_=this.onDocumentMouseMove_.bind(this),this.onDocumentMouseUp_=this.onDocumentMouseUp_.bind(this),this.onMouseDown_=this.onMouseDown_.bind(this),this.onTouchEnd_=this.onTouchEnd_.bind(this),this.onTouchMove_=this.onTouchMove_.bind(this),this.onTouchStart_=this.onTouchStart_.bind(this),this.elem_=t,this.emitter=new ge,t.addEventListener("touchstart",this.onTouchStart_,{passive:!1}),t.addEventListener("touchmove",this.onTouchMove_,{passive:!0}),t.addEventListener("touchend",this.onTouchEnd_),t.addEventListener("mousedown",this.onMouseDown_)}computePosition_(t){const e=this.elem_.getBoundingClientRect();return{bounds:{width:e.width,height:e.height},point:t?{x:t.x,y:t.y}:null}}onMouseDown_(t){var e;t.preventDefault(),(e=t.currentTarget)===null||e===void 0||e.focus();const n=this.elem_.ownerDocument;n.addEventListener("mousemove",this.onDocumentMouseMove_),n.addEventListener("mouseup",this.onDocumentMouseUp_),this.emitter.emit("down",{altKey:t.altKey,data:this.computePosition_(Ua(t,this.elem_)),sender:this,shiftKey:t.shiftKey})}onDocumentMouseMove_(t){this.emitter.emit("move",{altKey:t.altKey,data:this.computePosition_(Ua(t,this.elem_)),sender:this,shiftKey:t.shiftKey})}onDocumentMouseUp_(t){const e=this.elem_.ownerDocument;e.removeEventListener("mousemove",this.onDocumentMouseMove_),e.removeEventListener("mouseup",this.onDocumentMouseUp_),this.emitter.emit("up",{altKey:t.altKey,data:this.computePosition_(Ua(t,this.elem_)),sender:this,shiftKey:t.shiftKey})}onTouchStart_(t){t.preventDefault();const e=t.targetTouches.item(0),n=this.elem_.getBoundingClientRect();this.emitter.emit("down",{altKey:t.altKey,data:this.computePosition_(e?{x:e.clientX-n.left,y:e.clientY-n.top}:void 0),sender:this,shiftKey:t.shiftKey}),this.lastTouch_=e}onTouchMove_(t){const e=t.targetTouches.item(0),n=this.elem_.getBoundingClientRect();this.emitter.emit("move",{altKey:t.altKey,data:this.computePosition_(e?{x:e.clientX-n.left,y:e.clientY-n.top}:void 0),sender:this,shiftKey:t.shiftKey}),this.lastTouch_=e}onTouchEnd_(t){var e;const n=(e=t.targetTouches.item(0))!==null&&e!==void 0?e:this.lastTouch_,r=this.elem_.getBoundingClientRect();this.emitter.emit("up",{altKey:t.altKey,data:this.computePosition_(n?{x:n.clientX-r.left,y:n.clientY-r.top}:void 0),sender:this,shiftKey:t.shiftKey})}}const Je=Gt("txt");class lw{constructor(t,e){this.onChange_=this.onChange_.bind(this),this.props_=e.props,this.props_.emitter.on("change",this.onChange_),this.element=t.createElement("div"),this.element.classList.add(Je(),Je(void 0,"num")),e.arrayPosition&&this.element.classList.add(Je(void 0,e.arrayPosition)),e.viewProps.bindClassModifiers(this.element);const n=t.createElement("input");n.classList.add(Je("i")),n.type="text",e.viewProps.bindDisabled(n),this.element.appendChild(n),this.inputElement=n,this.onDraggingChange_=this.onDraggingChange_.bind(this),this.dragging_=e.dragging,this.dragging_.emitter.on("change",this.onDraggingChange_),this.element.classList.add(Je()),this.inputElement.classList.add(Je("i"));const r=t.createElement("div");r.classList.add(Je("k")),this.element.appendChild(r),this.knobElement=r;const s=t.createElementNS(fn,"svg");s.classList.add(Je("g")),this.knobElement.appendChild(s);const o=t.createElementNS(fn,"path");o.classList.add(Je("gb")),s.appendChild(o),this.guideBodyElem_=o;const a=t.createElementNS(fn,"path");a.classList.add(Je("gh")),s.appendChild(a),this.guideHeadElem_=a;const l=t.createElement("div");l.classList.add(Gt("tt")()),this.knobElement.appendChild(l),this.tooltipElem_=l,e.value.emitter.on("change",this.onChange_),this.value=e.value,this.refresh()}onDraggingChange_(t){if(t.rawValue===null){this.element.classList.remove(Je(void 0,"drg"));return}this.element.classList.add(Je(void 0,"drg"));const e=t.rawValue/this.props_.get("pointerScale"),n=e+(e>0?-1:e<0?1:0),r=xe(-n,-4,4);this.guideHeadElem_.setAttributeNS(null,"d",[`M ${n+r},0 L${n},4 L${n+r},8`,`M ${e},-1 L${e},9`].join(" ")),this.guideBodyElem_.setAttributeNS(null,"d",`M 0,4 L${e},4`);const s=this.props_.get("formatter");this.tooltipElem_.textContent=s(this.value.rawValue),this.tooltipElem_.style.left=`${e}px`}refresh(){const t=this.props_.get("formatter");this.inputElement.value=t(this.value.rawValue)}onChange_(){this.refresh()}}class Ss{constructor(t,e){var n;this.originRawValue_=0,this.onInputChange_=this.onInputChange_.bind(this),this.onInputKeyDown_=this.onInputKeyDown_.bind(this),this.onInputKeyUp_=this.onInputKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.parser_=e.parser,this.props=e.props,this.sliderProps_=(n=e.sliderProps)!==null&&n!==void 0?n:null,this.value=e.value,this.viewProps=e.viewProps,this.dragging_=se(null),this.view=new lw(t,{arrayPosition:e.arrayPosition,dragging:this.dragging_,props:this.props,value:this.value,viewProps:this.viewProps}),this.view.inputElement.addEventListener("change",this.onInputChange_),this.view.inputElement.addEventListener("keydown",this.onInputKeyDown_),this.view.inputElement.addEventListener("keyup",this.onInputKeyUp_);const r=new Oi(this.view.knobElement);r.emitter.on("down",this.onPointerDown_),r.emitter.on("move",this.onPointerMove_),r.emitter.on("up",this.onPointerUp_)}constrainValue_(t){var e,n;const r=(e=this.sliderProps_)===null||e===void 0?void 0:e.get("min"),s=(n=this.sliderProps_)===null||n===void 0?void 0:n.get("max");let o=t;return r!==void 0&&(o=Math.max(o,r)),s!==void 0&&(o=Math.min(o,s)),o}onInputChange_(t){const n=t.currentTarget.value,r=this.parser_(n);Qt(r)||(this.value.rawValue=this.constrainValue_(r)),this.view.refresh()}onInputKeyDown_(t){const e=ke(this.props.get("keyScale"),cs(t));e!==0&&this.value.setRawValue(this.constrainValue_(this.value.rawValue+e),{forceEmit:!1,last:!1})}onInputKeyUp_(t){ke(this.props.get("keyScale"),cs(t))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}onPointerDown_(){this.originRawValue_=this.value.rawValue,this.dragging_.rawValue=0}computeDraggingValue_(t){if(!t.point)return null;const e=t.point.x-t.bounds.width/2;return this.constrainValue_(this.originRawValue_+e*this.props.get("pointerScale"))}onPointerMove_(t){const e=this.computeDraggingValue_(t.data);e!==null&&(this.value.setRawValue(e,{forceEmit:!1,last:!1}),this.dragging_.rawValue=this.value.rawValue-this.originRawValue_)}onPointerUp_(t){const e=this.computeDraggingValue_(t.data);e!==null&&(this.value.setRawValue(e,{forceEmit:!0,last:!0}),this.dragging_.rawValue=null)}}const Oa=Gt("sld");class cw{constructor(t,e){this.onChange_=this.onChange_.bind(this),this.props_=e.props,this.props_.emitter.on("change",this.onChange_),this.element=t.createElement("div"),this.element.classList.add(Oa()),e.viewProps.bindClassModifiers(this.element);const n=t.createElement("div");n.classList.add(Oa("t")),e.viewProps.bindTabIndex(n),this.element.appendChild(n),this.trackElement=n;const r=t.createElement("div");r.classList.add(Oa("k")),this.trackElement.appendChild(r),this.knobElement=r,e.value.emitter.on("change",this.onChange_),this.value=e.value,this.update_()}update_(){const t=xe(qt(this.value.rawValue,this.props_.get("min"),this.props_.get("max"),0,100),0,100);this.knobElement.style.width=`${t}%`}onChange_(){this.update_()}}class hw{constructor(t,e){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDownOrMove_=this.onPointerDownOrMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.props=e.props,this.view=new cw(t,{props:this.props,value:this.value,viewProps:this.viewProps}),this.ptHandler_=new Oi(this.view.trackElement),this.ptHandler_.emitter.on("down",this.onPointerDownOrMove_),this.ptHandler_.emitter.on("move",this.onPointerDownOrMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.trackElement.addEventListener("keydown",this.onKeyDown_),this.view.trackElement.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(t,e){t.point&&this.value.setRawValue(qt(xe(t.point.x,0,t.bounds.width),0,t.bounds.width,this.props.get("min"),this.props.get("max")),e)}onPointerDownOrMove_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerUp_(t){this.handlePointerEvent_(t.data,{forceEmit:!0,last:!0})}onKeyDown_(t){const e=ke(this.props.get("keyScale"),Dn(t));e!==0&&this.value.setRawValue(this.value.rawValue+e,{forceEmit:!1,last:!1})}onKeyUp_(t){ke(this.props.get("keyScale"),Dn(t))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}const Fa=Gt("sldtxt");class uw{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(Fa());const n=t.createElement("div");n.classList.add(Fa("s")),this.sliderView_=e.sliderView,n.appendChild(this.sliderView_.element),this.element.appendChild(n);const r=t.createElement("div");r.classList.add(Fa("t")),this.textView_=e.textView,r.appendChild(this.textView_.element),this.element.appendChild(r)}}class Lo{constructor(t,e){this.value=e.value,this.viewProps=e.viewProps,this.sliderC_=new hw(t,{props:e.sliderProps,value:e.value,viewProps:this.viewProps}),this.textC_=new Ss(t,{parser:e.parser,props:e.textProps,sliderProps:e.sliderProps,value:e.value,viewProps:e.viewProps}),this.view=new uw(t,{sliderView:this.sliderC_.view,textView:this.textC_.view})}get sliderController(){return this.sliderC_}get textController(){return this.textC_}importProps(t){return Ye(t,null,e=>({max:e.required.number,min:e.required.number}),e=>{const n=this.sliderC_.props;return n.set("max",e.max),n.set("min",e.min),!0})}exportProps(){const t=this.sliderC_.props;return qe(null,{max:t.get("max"),min:t.get("min")})}}function Yd(i){return{sliderProps:new It({keyScale:i.keyScale,max:i.max,min:i.min}),textProps:new It({formatter:se(i.formatter),keyScale:i.keyScale,pointerScale:se(i.pointerScale)})}}const dw={containerUnitSize:"cnt-usz"};function qd(i){return`--${dw[i]}`}function hs(i){return Rd(i)}function jn(i){if(nl(i))return le(i,hs)}function Cn(i,t){if(!i)return;const e=[],n=Ad(i,t);n&&e.push(n);const r=Cd(i);return r&&e.push(r),new ys(e)}function pw(i){return i?i.major===Ar.major:!1}function Kd(i){if(i==="inline"||i==="popup")return i}function Es(i,t){i.write(t)}const uo=Gt("ckb");class fw{constructor(t,e){this.onValueChange_=this.onValueChange_.bind(this),this.element=t.createElement("div"),this.element.classList.add(uo()),e.viewProps.bindClassModifiers(this.element);const n=t.createElement("label");n.classList.add(uo("l")),this.element.appendChild(n),this.labelElement=n;const r=t.createElement("input");r.classList.add(uo("i")),r.type="checkbox",this.labelElement.appendChild(r),this.inputElement=r,e.viewProps.bindDisabled(this.inputElement);const s=t.createElement("div");s.classList.add(uo("w")),this.labelElement.appendChild(s);const o=zo(t,"check");s.appendChild(o),e.value.emitter.on("change",this.onValueChange_),this.value=e.value,this.update_()}update_(){this.inputElement.checked=this.value.rawValue}onValueChange_(){this.update_()}}class mw{constructor(t,e){this.onInputChange_=this.onInputChange_.bind(this),this.onLabelMouseDown_=this.onLabelMouseDown_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.view=new fw(t,{value:this.value,viewProps:this.viewProps}),this.view.inputElement.addEventListener("change",this.onInputChange_),this.view.labelElement.addEventListener("mousedown",this.onLabelMouseDown_)}onInputChange_(t){const e=t.currentTarget;this.value.rawValue=e.checked,t.preventDefault(),t.stopPropagation()}onLabelMouseDown_(t){t.preventDefault()}}function vw(i){const t=[],e=Il(i.options);return e&&t.push(e),new ys(t)}const _w=Fe({id:"input-bool",type:"input",accept:(i,t)=>{if(typeof i!="boolean")return null;const e=le(t,n=>({options:n.optional.custom(Ms),readonly:n.optional.constant(!1)}));return e?{initialValue:i,params:e}:null},binding:{reader:i=>Wd,constraint:i=>vw(i.params),writer:i=>Es},controller:i=>{const t=i.document,e=i.value,n=i.constraint,r=n&&Po(n,ws);return r?new si(t,{props:new It({options:r.values.value("options")}),value:e,viewProps:i.viewProps}):new mw(t,{value:e,viewProps:i.viewProps})},api(i){return typeof i.controller.value.rawValue!="boolean"?null:i.controller.valueController instanceof si?new Ll(i.controller):null}}),mi=Gt("col");class gw{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(mi()),e.foldable.bindExpandedClass(this.element,mi(void 0,"expanded")),vn(e.foldable,"completed",Tr(this.element,mi(void 0,"cpl")));const n=t.createElement("div");n.classList.add(mi("h")),this.element.appendChild(n);const r=t.createElement("div");r.classList.add(mi("s")),n.appendChild(r),this.swatchElement=r;const s=t.createElement("div");if(s.classList.add(mi("t")),n.appendChild(s),this.textElement=s,e.pickerLayout==="inline"){const o=t.createElement("div");o.classList.add(mi("p")),this.element.appendChild(o),this.pickerElement=o}else this.pickerElement=null}}function xw(i,t,e){const n=xe(i/255,0,1),r=xe(t/255,0,1),s=xe(e/255,0,1),o=Math.max(n,r,s),a=Math.min(n,r,s),l=o-a;let c=0,h=0;const u=(a+o)/2;return l!==0&&(h=l/(1-Math.abs(o+a-1)),n===o?c=(r-s)/l:r===o?c=2+(s-n)/l:c=4+(n-r)/l,c=c/6+(c<0?1:0)),[c*360,h*100,u*100]}function bw(i,t,e){const n=(i%360+360)%360,r=xe(t/100,0,1),s=xe(e/100,0,1),o=(1-Math.abs(2*s-1))*r,a=o*(1-Math.abs(n/60%2-1)),l=s-o/2;let c,h,u;return n>=0&&n<60?[c,h,u]=[o,a,0]:n>=60&&n<120?[c,h,u]=[a,o,0]:n>=120&&n<180?[c,h,u]=[0,o,a]:n>=180&&n<240?[c,h,u]=[0,a,o]:n>=240&&n<300?[c,h,u]=[a,0,o]:[c,h,u]=[o,0,a],[(c+l)*255,(h+l)*255,(u+l)*255]}function yw(i,t,e){const n=xe(i/255,0,1),r=xe(t/255,0,1),s=xe(e/255,0,1),o=Math.max(n,r,s),a=Math.min(n,r,s),l=o-a;let c;l===0?c=0:o===n?c=60*(((r-s)/l%6+6)%6):o===r?c=60*((s-n)/l+2):c=60*((n-r)/l+4);const h=o===0?0:l/o,u=o;return[c,h*100,u*100]}function jd(i,t,e){const n=Sd(i,360),r=xe(t/100,0,1),s=xe(e/100,0,1),o=s*r,a=o*(1-Math.abs(n/60%2-1)),l=s-o;let c,h,u;return n>=0&&n<60?[c,h,u]=[o,a,0]:n>=60&&n<120?[c,h,u]=[a,o,0]:n>=120&&n<180?[c,h,u]=[0,o,a]:n>=180&&n<240?[c,h,u]=[0,a,o]:n>=240&&n<300?[c,h,u]=[a,0,o]:[c,h,u]=[o,0,a],[(c+l)*255,(h+l)*255,(u+l)*255]}function ww(i,t,e){const n=e+t*(100-Math.abs(2*e-100))/200;return[i,n!==0?t*(100-Math.abs(2*e-100))/n:0,e+t*(100-Math.abs(2*e-100))/(2*100)]}function Mw(i,t,e){const n=100-Math.abs(e*(200-t)/100-100);return[i,n!==0?t*e/n:0,e*(200-t)/(2*100)]}function _n(i){return[i[0],i[1],i[2]]}function Go(i,t){return[i[0],i[1],i[2],t]}const Sw={hsl:{hsl:(i,t,e)=>[i,t,e],hsv:ww,rgb:bw},hsv:{hsl:Mw,hsv:(i,t,e)=>[i,t,e],rgb:jd},rgb:{hsl:xw,hsv:yw,rgb:(i,t,e)=>[i,t,e]}};function wr(i,t){return[t==="float"?1:i==="rgb"?255:360,t==="float"?1:i==="rgb"?255:100,t==="float"?1:i==="rgb"?255:100]}function Ew(i,t){return i===t?t:Sd(i,t)}function Zd(i,t,e){var n;const r=wr(t,e);return[t==="rgb"?xe(i[0],0,r[0]):Ew(i[0],r[0]),xe(i[1],0,r[1]),xe(i[2],0,r[2]),xe((n=i[3])!==null&&n!==void 0?n:1,0,1)]}function Jh(i,t,e,n){const r=wr(t,e),s=wr(t,n);return i.map((o,a)=>o/r[a]*s[a])}function Jd(i,t,e){const n=Jh(i,t.mode,t.type,"int"),r=Sw[t.mode][e.mode](...n);return Jh(r,e.mode,"int",e.type)}class Wt{static black(){return new Wt([0,0,0],"rgb")}constructor(t,e){this.type="int",this.mode=e,this.comps_=Zd(t,e,this.type)}getComponents(t){return Go(Jd(_n(this.comps_),{mode:this.mode,type:this.type},{mode:t??this.mode,type:this.type}),this.comps_[3])}toRgbaObject(){const t=this.getComponents("rgb");return{r:t[0],g:t[1],b:t[2],a:t[3]}}}const Hn=Gt("colp");class Tw{constructor(t,e){this.alphaViews_=null,this.element=t.createElement("div"),this.element.classList.add(Hn()),e.viewProps.bindClassModifiers(this.element);const n=t.createElement("div");n.classList.add(Hn("hsv"));const r=t.createElement("div");r.classList.add(Hn("sv")),this.svPaletteView_=e.svPaletteView,r.appendChild(this.svPaletteView_.element),n.appendChild(r);const s=t.createElement("div");s.classList.add(Hn("h")),this.hPaletteView_=e.hPaletteView,s.appendChild(this.hPaletteView_.element),n.appendChild(s),this.element.appendChild(n);const o=t.createElement("div");if(o.classList.add(Hn("rgb")),this.textsView_=e.textsView,o.appendChild(this.textsView_.element),this.element.appendChild(o),e.alphaViews){this.alphaViews_={palette:e.alphaViews.palette,text:e.alphaViews.text};const a=t.createElement("div");a.classList.add(Hn("a"));const l=t.createElement("div");l.classList.add(Hn("ap")),l.appendChild(this.alphaViews_.palette.element),a.appendChild(l);const c=t.createElement("div");c.classList.add(Hn("at")),c.appendChild(this.alphaViews_.text.element),a.appendChild(c),this.element.appendChild(a)}}get allFocusableElements(){const t=[this.svPaletteView_.element,this.hPaletteView_.element,this.textsView_.modeSelectElement,...this.textsView_.inputViews.map(e=>e.inputElement)];return this.alphaViews_&&t.push(this.alphaViews_.palette.element,this.alphaViews_.text.inputElement),t}}function Aw(i){return i==="int"?"int":i==="float"?"float":void 0}function Nl(i){return le(i,t=>({color:t.optional.object({alpha:t.optional.boolean,type:t.optional.custom(Aw)}),expanded:t.optional.boolean,picker:t.optional.custom(Kd),readonly:t.optional.constant(!1)}))}function Li(i){return i?.1:1}function Qd(i){var t;return(t=i.color)===null||t===void 0?void 0:t.type}class Ul{constructor(t,e){this.type="float",this.mode=e,this.comps_=Zd(t,e,this.type)}getComponents(t){return Go(Jd(_n(this.comps_),{mode:this.mode,type:this.type},{mode:t??this.mode,type:this.type}),this.comps_[3])}toRgbaObject(){const t=this.getComponents("rgb");return{r:t[0],g:t[1],b:t[2],a:t[3]}}}const Cw={int:(i,t)=>new Wt(i,t),float:(i,t)=>new Ul(i,t)};function Ol(i,t,e){return Cw[e](i,t)}function Pw(i){return i.type==="float"}function Rw(i){return i.type==="int"}function Lw(i){const t=i.getComponents(),e=wr(i.mode,"int");return new Wt([Math.round(qt(t[0],0,1,0,e[0])),Math.round(qt(t[1],0,1,0,e[1])),Math.round(qt(t[2],0,1,0,e[2])),t[3]],i.mode)}function Dw(i){const t=i.getComponents(),e=wr(i.mode,"int");return new Ul([qt(t[0],0,e[0],0,1),qt(t[1],0,e[1],0,1),qt(t[2],0,e[2],0,1),t[3]],i.mode)}function Oe(i,t){if(i.type===t)return i;if(Rw(i)&&t==="float")return Dw(i);if(Pw(i)&&t==="int")return Lw(i);throw he.shouldNeverHappen()}function Iw(i,t){return i.alpha===t.alpha&&i.mode===t.mode&&i.notation===t.notation&&i.type===t.type}function nn(i,t){const e=i.match(/^(.+)%$/);return Math.min(e?parseFloat(e[1])*.01*t:parseFloat(i),t)}const Nw={deg:i=>i,grad:i=>i*360/400,rad:i=>i*360/(2*Math.PI),turn:i=>i*360};function tp(i){const t=i.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);if(!t)return parseFloat(i);const e=parseFloat(t[1]),n=t[2];return Nw[n](e)}function ep(i){const t=i.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;const e=[nn(t[1],255),nn(t[2],255),nn(t[3],255)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])?null:e}function Uw(i){const t=ep(i);return t?new Wt(t,"rgb"):null}function np(i){const t=i.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;const e=[nn(t[1],255),nn(t[2],255),nn(t[3],255),nn(t[4],1)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])||isNaN(e[3])?null:e}function Ow(i){const t=np(i);return t?new Wt(t,"rgb"):null}function ip(i){const t=i.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;const e=[tp(t[1]),nn(t[2],100),nn(t[3],100)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])?null:e}function Fw(i){const t=ip(i);return t?new Wt(t,"hsl"):null}function rp(i){const t=i.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;const e=[tp(t[1]),nn(t[2],100),nn(t[3],100),nn(t[4],1)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])||isNaN(e[3])?null:e}function Bw(i){const t=rp(i);return t?new Wt(t,"hsl"):null}function sp(i){const t=i.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);if(t)return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)];const e=i.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);return e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]:null}function kw(i){const t=sp(i);return t?new Wt(t,"rgb"):null}function op(i){const t=i.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);if(t)return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16),qt(parseInt(t[4]+t[4],16),0,255,0,1)];const e=i.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);return e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16),qt(parseInt(e[4],16),0,255,0,1)]:null}function Vw(i){const t=op(i);return t?new Wt(t,"rgb"):null}function ap(i){const t=i.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);if(!t)return null;const e=[parseFloat(t[1]),parseFloat(t[2]),parseFloat(t[3])];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])?null:e}function Qh(i){return t=>{const e=ap(t);return e?Ol(e,"rgb",i):null}}function lp(i){const t=i.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*a\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);if(!t)return null;const e=[parseFloat(t[1]),parseFloat(t[2]),parseFloat(t[3]),parseFloat(t[4])];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])||isNaN(e[3])?null:e}function tu(i){return t=>{const e=lp(t);return e?Ol(e,"rgb",i):null}}const zw=[{parser:sp,result:{alpha:!1,mode:"rgb",notation:"hex"}},{parser:op,result:{alpha:!0,mode:"rgb",notation:"hex"}},{parser:ep,result:{alpha:!1,mode:"rgb",notation:"func"}},{parser:np,result:{alpha:!0,mode:"rgb",notation:"func"}},{parser:ip,result:{alpha:!1,mode:"hsl",notation:"func"}},{parser:rp,result:{alpha:!0,mode:"hsl",notation:"func"}},{parser:ap,result:{alpha:!1,mode:"rgb",notation:"object"}},{parser:lp,result:{alpha:!0,mode:"rgb",notation:"object"}}];function Hw(i){return zw.reduce((t,{parser:e,result:n})=>t||(e(i)?n:null),null)}function Gw(i,t="int"){const e=Hw(i);return e?e.notation==="hex"&&t!=="float"?Object.assign(Object.assign({},e),{type:"int"}):e.notation==="func"?Object.assign(Object.assign({},e),{type:t}):null:null}function Ts(i){const t=[kw,Vw,Uw,Ow,Fw,Bw];i==="int"&&t.push(Qh("int"),tu("int")),i==="float"&&t.push(Qh("float"),tu("float"));const e=sw(t);return n=>{const r=e(n);return r?Oe(r,i):null}}function Ww(i){const t=Ts("int");if(typeof i!="string")return Wt.black();const e=t(i);return e??Wt.black()}function cp(i){const t=xe(Math.floor(i),0,255).toString(16);return t.length===1?`0${t}`:t}function Fl(i,t="#"){const e=_n(i.getComponents("rgb")).map(cp).join("");return`${t}${e}`}function Bl(i,t="#"){const e=i.getComponents("rgb"),n=[e[0],e[1],e[2],e[3]*255].map(cp).join("");return`${t}${n}`}function hp(i){const t=ze(0),e=Oe(i,"int");return`rgb(${_n(e.getComponents("rgb")).map(r=>t(r)).join(", ")})`}function fo(i){const t=ze(2),e=ze(0);return`rgba(${Oe(i,"int").getComponents("rgb").map((s,o)=>(o===3?t:e)(s)).join(", ")})`}function Xw(i){const t=[ze(0),Ro,Ro],e=Oe(i,"int");return`hsl(${_n(e.getComponents("hsl")).map((r,s)=>t[s](r)).join(", ")})`}function $w(i){const t=[ze(0),Ro,Ro,ze(2)];return`hsla(${Oe(i,"int").getComponents("hsl").map((r,s)=>t[s](r)).join(", ")})`}function up(i,t){const e=ze(t==="float"?2:0),n=["r","g","b"],r=Oe(i,t);return`{${_n(r.getComponents("rgb")).map((o,a)=>`${n[a]}: ${e(o)}`).join(", ")}}`}function Yw(i){return t=>up(t,i)}function dp(i,t){const e=ze(2),n=ze(t==="float"?2:0),r=["r","g","b","a"];return`{${Oe(i,t).getComponents("rgb").map((a,l)=>{const c=l===3?e:n;return`${r[l]}: ${c(a)}`}).join(", ")}}`}function qw(i){return t=>dp(t,i)}const Kw=[{format:{alpha:!1,mode:"rgb",notation:"hex",type:"int"},stringifier:Fl},{format:{alpha:!0,mode:"rgb",notation:"hex",type:"int"},stringifier:Bl},{format:{alpha:!1,mode:"rgb",notation:"func",type:"int"},stringifier:hp},{format:{alpha:!0,mode:"rgb",notation:"func",type:"int"},stringifier:fo},{format:{alpha:!1,mode:"hsl",notation:"func",type:"int"},stringifier:Xw},{format:{alpha:!0,mode:"hsl",notation:"func",type:"int"},stringifier:$w},...["int","float"].reduce((i,t)=>[...i,{format:{alpha:!1,mode:"rgb",notation:"object",type:t},stringifier:Yw(t)},{format:{alpha:!0,mode:"rgb",notation:"object",type:t},stringifier:qw(t)}],[])];function pp(i){return Kw.reduce((t,e)=>t||(Iw(e.format,i)?e.stringifier:null),null)}const zr=Gt("apl");class jw{constructor(t,e){this.onValueChange_=this.onValueChange_.bind(this),this.value=e.value,this.value.emitter.on("change",this.onValueChange_),this.element=t.createElement("div"),this.element.classList.add(zr()),e.viewProps.bindClassModifiers(this.element),e.viewProps.bindTabIndex(this.element);const n=t.createElement("div");n.classList.add(zr("b")),this.element.appendChild(n);const r=t.createElement("div");r.classList.add(zr("c")),n.appendChild(r),this.colorElem_=r;const s=t.createElement("div");s.classList.add(zr("m")),this.element.appendChild(s),this.markerElem_=s;const o=t.createElement("div");o.classList.add(zr("p")),this.markerElem_.appendChild(o),this.previewElem_=o,this.update_()}update_(){const t=this.value.rawValue,e=t.getComponents("rgb"),n=new Wt([e[0],e[1],e[2],0],"rgb"),r=new Wt([e[0],e[1],e[2],255],"rgb"),s=["to right",fo(n),fo(r)];this.colorElem_.style.background=`linear-gradient(${s.join(",")})`,this.previewElem_.style.backgroundColor=fo(t);const o=qt(e[3],0,1,0,100);this.markerElem_.style.left=`${o}%`}onValueChange_(){this.update_()}}class Zw{constructor(t,e){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.view=new jw(t,{value:this.value,viewProps:this.viewProps}),this.ptHandler_=new Oi(this.view.element),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.element.addEventListener("keydown",this.onKeyDown_),this.view.element.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(t,e){if(!t.point)return;const n=t.point.x/t.bounds.width,r=this.value.rawValue,[s,o,a]=r.getComponents("hsv");this.value.setRawValue(new Wt([s,o,a,n],"hsv"),e)}onPointerDown_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerMove_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerUp_(t){this.handlePointerEvent_(t.data,{forceEmit:!0,last:!0})}onKeyDown_(t){const e=ke(Li(!0),Dn(t));if(e===0)return;const n=this.value.rawValue,[r,s,o,a]=n.getComponents("hsv");this.value.setRawValue(new Wt([r,s,o,a+e],"hsv"),{forceEmit:!1,last:!1})}onKeyUp_(t){ke(Li(!0),Dn(t))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}const ar=Gt("coltxt");function Jw(i){const t=i.createElement("select"),e=[{text:"RGB",value:"rgb"},{text:"HSL",value:"hsl"},{text:"HSV",value:"hsv"},{text:"HEX",value:"hex"}];return t.appendChild(e.reduce((n,r)=>{const s=i.createElement("option");return s.textContent=r.text,s.value=r.value,n.appendChild(s),n},i.createDocumentFragment())),t}class Qw{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(ar()),e.viewProps.bindClassModifiers(this.element);const n=t.createElement("div");n.classList.add(ar("m")),this.modeElem_=Jw(t),this.modeElem_.classList.add(ar("ms")),n.appendChild(this.modeSelectElement),e.viewProps.bindDisabled(this.modeElem_);const r=t.createElement("div");r.classList.add(ar("mm")),r.appendChild(zo(t,"dropdown")),n.appendChild(r),this.element.appendChild(n);const s=t.createElement("div");s.classList.add(ar("w")),this.element.appendChild(s),this.inputsElem_=s,this.inputViews_=e.inputViews,this.applyInputViews_(),Pn(e.mode,o=>{this.modeElem_.value=o})}get modeSelectElement(){return this.modeElem_}get inputViews(){return this.inputViews_}set inputViews(t){this.inputViews_=t,this.applyInputViews_()}applyInputViews_(){Id(this.inputsElem_);const t=this.element.ownerDocument;this.inputViews_.forEach(e=>{const n=t.createElement("div");n.classList.add(ar("c")),n.appendChild(e.element),this.inputsElem_.appendChild(n)})}}function tM(i){return ze(i==="float"?2:0)}function eM(i,t,e){const n=wr(i,t)[e];return new gs({min:0,max:n})}function nM(i,t,e){return new Ss(i,{arrayPosition:e===0?"fst":e===2?"lst":"mid",parser:t.parser,props:It.fromObject({formatter:tM(t.colorType),keyScale:Li(!1),pointerScale:t.colorType==="float"?.01:1}),value:se(0,{constraint:eM(t.colorMode,t.colorType,e)}),viewProps:t.viewProps})}function iM(i,t){const e={colorMode:t.colorMode,colorType:t.colorType,parser:Ln,viewProps:t.viewProps};return[0,1,2].map(n=>{const r=nM(i,e,n);return Pr({primary:t.value,secondary:r.value,forward(s){return Oe(s,t.colorType).getComponents(t.colorMode)[n]},backward(s,o){const a=t.colorMode,c=Oe(s,t.colorType).getComponents(a);c[n]=o;const h=Ol(Go(_n(c),c[3]),a,t.colorType);return Oe(h,"int")}}),r})}function rM(i,t){const e=new ls(i,{parser:Ts("int"),props:It.fromObject({formatter:Fl}),value:se(Wt.black()),viewProps:t.viewProps});return Pr({primary:t.value,secondary:e.value,forward:n=>new Wt(_n(n.getComponents()),n.mode),backward:(n,r)=>new Wt(Go(_n(r.getComponents(n.mode)),n.getComponents()[3]),n.mode)}),[e]}function sM(i){return i!=="hex"}class oM{constructor(t,e){this.onModeSelectChange_=this.onModeSelectChange_.bind(this),this.colorType_=e.colorType,this.value=e.value,this.viewProps=e.viewProps,this.colorMode=se(this.value.rawValue.mode),this.ccs_=this.createComponentControllers_(t),this.view=new Qw(t,{mode:this.colorMode,inputViews:[this.ccs_[0].view,this.ccs_[1].view,this.ccs_[2].view],viewProps:this.viewProps}),this.view.modeSelectElement.addEventListener("change",this.onModeSelectChange_)}createComponentControllers_(t){const e=this.colorMode.rawValue;return sM(e)?iM(t,{colorMode:e,colorType:this.colorType_,value:this.value,viewProps:this.viewProps}):rM(t,{value:this.value,viewProps:this.viewProps})}onModeSelectChange_(t){const e=t.currentTarget;this.colorMode.rawValue=e.value,this.ccs_=this.createComponentControllers_(this.view.element.ownerDocument),this.view.inputViews=this.ccs_.map(n=>n.view)}}const Ba=Gt("hpl");class aM{constructor(t,e){this.onValueChange_=this.onValueChange_.bind(this),this.value=e.value,this.value.emitter.on("change",this.onValueChange_),this.element=t.createElement("div"),this.element.classList.add(Ba()),e.viewProps.bindClassModifiers(this.element),e.viewProps.bindTabIndex(this.element);const n=t.createElement("div");n.classList.add(Ba("c")),this.element.appendChild(n);const r=t.createElement("div");r.classList.add(Ba("m")),this.element.appendChild(r),this.markerElem_=r,this.update_()}update_(){const t=this.value.rawValue,[e]=t.getComponents("hsv");this.markerElem_.style.backgroundColor=hp(new Wt([e,100,100],"hsv"));const n=qt(e,0,360,0,100);this.markerElem_.style.left=`${n}%`}onValueChange_(){this.update_()}}class lM{constructor(t,e){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.view=new aM(t,{value:this.value,viewProps:this.viewProps}),this.ptHandler_=new Oi(this.view.element),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.element.addEventListener("keydown",this.onKeyDown_),this.view.element.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(t,e){if(!t.point)return;const n=qt(xe(t.point.x,0,t.bounds.width),0,t.bounds.width,0,360),r=this.value.rawValue,[,s,o,a]=r.getComponents("hsv");this.value.setRawValue(new Wt([n,s,o,a],"hsv"),e)}onPointerDown_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerMove_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerUp_(t){this.handlePointerEvent_(t.data,{forceEmit:!0,last:!0})}onKeyDown_(t){const e=ke(Li(!1),Dn(t));if(e===0)return;const n=this.value.rawValue,[r,s,o,a]=n.getComponents("hsv");this.value.setRawValue(new Wt([r+e,s,o,a],"hsv"),{forceEmit:!1,last:!1})}onKeyUp_(t){ke(Li(!1),Dn(t))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}const ka=Gt("svp"),eu=64;class cM{constructor(t,e){this.onValueChange_=this.onValueChange_.bind(this),this.value=e.value,this.value.emitter.on("change",this.onValueChange_),this.element=t.createElement("div"),this.element.classList.add(ka()),e.viewProps.bindClassModifiers(this.element),e.viewProps.bindTabIndex(this.element);const n=t.createElement("canvas");n.height=eu,n.width=eu,n.classList.add(ka("c")),this.element.appendChild(n),this.canvasElement=n;const r=t.createElement("div");r.classList.add(ka("m")),this.element.appendChild(r),this.markerElem_=r,this.update_()}update_(){const t=hy(this.canvasElement);if(!t)return;const n=this.value.rawValue.getComponents("hsv"),r=this.canvasElement.width,s=this.canvasElement.height,o=t.getImageData(0,0,r,s),a=o.data;for(let h=0;h<s;h++)for(let u=0;u<r;u++){const d=qt(u,0,r,0,100),p=qt(h,0,s,100,0),_=jd(n[0],d,p),g=(h*r+u)*4;a[g]=_[0],a[g+1]=_[1],a[g+2]=_[2],a[g+3]=255}t.putImageData(o,0,0);const l=qt(n[1],0,100,0,100);this.markerElem_.style.left=`${l}%`;const c=qt(n[2],0,100,100,0);this.markerElem_.style.top=`${c}%`}onValueChange_(){this.update_()}}class hM{constructor(t,e){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.view=new cM(t,{value:this.value,viewProps:this.viewProps}),this.ptHandler_=new Oi(this.view.element),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.element.addEventListener("keydown",this.onKeyDown_),this.view.element.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(t,e){if(!t.point)return;const n=qt(t.point.x,0,t.bounds.width,0,100),r=qt(t.point.y,0,t.bounds.height,100,0),[s,,,o]=this.value.rawValue.getComponents("hsv");this.value.setRawValue(new Wt([s,n,r,o],"hsv"),e)}onPointerDown_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerMove_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerUp_(t){this.handlePointerEvent_(t.data,{forceEmit:!0,last:!0})}onKeyDown_(t){$d(t.key)&&t.preventDefault();const[e,n,r,s]=this.value.rawValue.getComponents("hsv"),o=Li(!1),a=ke(o,Dn(t)),l=ke(o,cs(t));a===0&&l===0||this.value.setRawValue(new Wt([e,n+a,r+l,s],"hsv"),{forceEmit:!1,last:!1})}onKeyUp_(t){const e=Li(!1),n=ke(e,Dn(t)),r=ke(e,cs(t));n===0&&r===0||this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}class uM{constructor(t,e){this.value=e.value,this.viewProps=e.viewProps,this.hPaletteC_=new lM(t,{value:this.value,viewProps:this.viewProps}),this.svPaletteC_=new hM(t,{value:this.value,viewProps:this.viewProps}),this.alphaIcs_=e.supportsAlpha?{palette:new Zw(t,{value:this.value,viewProps:this.viewProps}),text:new Ss(t,{parser:Ln,props:It.fromObject({pointerScale:.01,keyScale:.1,formatter:ze(2)}),value:se(0,{constraint:new gs({min:0,max:1})}),viewProps:this.viewProps})}:null,this.alphaIcs_&&Pr({primary:this.value,secondary:this.alphaIcs_.text.value,forward:n=>n.getComponents()[3],backward:(n,r)=>{const s=n.getComponents();return s[3]=r,new Wt(s,n.mode)}}),this.textsC_=new oM(t,{colorType:e.colorType,value:this.value,viewProps:this.viewProps}),this.view=new Tw(t,{alphaViews:this.alphaIcs_?{palette:this.alphaIcs_.palette.view,text:this.alphaIcs_.text.view}:null,hPaletteView:this.hPaletteC_.view,supportsAlpha:e.supportsAlpha,svPaletteView:this.svPaletteC_.view,textsView:this.textsC_.view,viewProps:this.viewProps})}get textsController(){return this.textsC_}}const Va=Gt("colsw");class dM{constructor(t,e){this.onValueChange_=this.onValueChange_.bind(this),e.value.emitter.on("change",this.onValueChange_),this.value=e.value,this.element=t.createElement("div"),this.element.classList.add(Va()),e.viewProps.bindClassModifiers(this.element);const n=t.createElement("div");n.classList.add(Va("sw")),this.element.appendChild(n),this.swatchElem_=n;const r=t.createElement("button");r.classList.add(Va("b")),e.viewProps.bindDisabled(r),this.element.appendChild(r),this.buttonElement=r,this.update_()}update_(){const t=this.value.rawValue;this.swatchElem_.style.backgroundColor=Bl(t)}onValueChange_(){this.update_()}}class pM{constructor(t,e){this.value=e.value,this.viewProps=e.viewProps,this.view=new dM(t,{value:this.value,viewProps:this.viewProps})}}class kl{constructor(t,e){this.onButtonBlur_=this.onButtonBlur_.bind(this),this.onButtonClick_=this.onButtonClick_.bind(this),this.onPopupChildBlur_=this.onPopupChildBlur_.bind(this),this.onPopupChildKeydown_=this.onPopupChildKeydown_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.foldable_=bs.create(e.expanded),this.swatchC_=new pM(t,{value:this.value,viewProps:this.viewProps});const n=this.swatchC_.view.buttonElement;n.addEventListener("blur",this.onButtonBlur_),n.addEventListener("click",this.onButtonClick_),this.textC_=new ls(t,{parser:e.parser,props:It.fromObject({formatter:e.formatter}),value:this.value,viewProps:this.viewProps}),this.view=new gw(t,{foldable:this.foldable_,pickerLayout:e.pickerLayout}),this.view.swatchElement.appendChild(this.swatchC_.view.element),this.view.textElement.appendChild(this.textC_.view.element),this.popC_=e.pickerLayout==="popup"?new Gd(t,{viewProps:this.viewProps}):null;const r=new uM(t,{colorType:e.colorType,supportsAlpha:e.supportsAlpha,value:this.value,viewProps:this.viewProps});r.view.allFocusableElements.forEach(s=>{s.addEventListener("blur",this.onPopupChildBlur_),s.addEventListener("keydown",this.onPopupChildKeydown_)}),this.pickerC_=r,this.popC_?(this.view.element.appendChild(this.popC_.view.element),this.popC_.view.element.appendChild(r.view.element),Pr({primary:this.foldable_.value("expanded"),secondary:this.popC_.shows,forward:s=>s,backward:(s,o)=>o})):this.view.pickerElement&&(this.view.pickerElement.appendChild(this.pickerC_.view.element),Rl(this.foldable_,this.view.pickerElement))}get textController(){return this.textC_}onButtonBlur_(t){if(!this.popC_)return;const e=this.view.element,n=t.relatedTarget;(!n||!e.contains(n))&&(this.popC_.shows.rawValue=!1)}onButtonClick_(){this.foldable_.set("expanded",!this.foldable_.get("expanded")),this.foldable_.get("expanded")&&this.pickerC_.view.allFocusableElements[0].focus()}onPopupChildBlur_(t){if(!this.popC_)return;const e=this.popC_.view.element,n=Nd(t);n&&e.contains(n)||n&&n===this.swatchC_.view.buttonElement&&!Sl(e.ownerDocument)||(this.popC_.shows.rawValue=!1)}onPopupChildKeydown_(t){this.popC_?t.key==="Escape"&&(this.popC_.shows.rawValue=!1):this.view.pickerElement&&t.key==="Escape"&&this.swatchC_.view.buttonElement.focus()}}function fM(i){return _n(i.getComponents("rgb")).reduce((t,e)=>t<<8|Math.floor(e)&255,0)}function mM(i){return i.getComponents("rgb").reduce((t,e,n)=>{const r=Math.floor(n===3?e*255:e)&255;return t<<8|r},0)>>>0}function vM(i){return new Wt([i>>16&255,i>>8&255,i&255],"rgb")}function _M(i){return new Wt([i>>24&255,i>>16&255,i>>8&255,qt(i&255,0,255,0,1)],"rgb")}function gM(i){return typeof i!="number"?Wt.black():vM(i)}function xM(i){return typeof i!="number"?Wt.black():_M(i)}function mo(i,t){return typeof i!="object"||Qt(i)?!1:t in i&&typeof i[t]=="number"}function fp(i){return mo(i,"r")&&mo(i,"g")&&mo(i,"b")}function mp(i){return fp(i)&&mo(i,"a")}function vp(i){return fp(i)}function Vl(i,t){if(i.mode!==t.mode||i.type!==t.type)return!1;const e=i.getComponents(),n=t.getComponents();for(let r=0;r<e.length;r++)if(e[r]!==n[r])return!1;return!0}function nu(i){return"a"in i?[i.r,i.g,i.b,i.a]:[i.r,i.g,i.b]}function bM(i){const t=pp(i);return t?(e,n)=>{Es(e,t(n))}:null}function yM(i){const t=i?mM:fM;return(e,n)=>{Es(e,t(n))}}function wM(i,t,e){const r=Oe(t,e).toRgbaObject();i.writeProperty("r",r.r),i.writeProperty("g",r.g),i.writeProperty("b",r.b),i.writeProperty("a",r.a)}function MM(i,t,e){const r=Oe(t,e).toRgbaObject();i.writeProperty("r",r.r),i.writeProperty("g",r.g),i.writeProperty("b",r.b)}function SM(i,t){return(e,n)=>{i?wM(e,n,t):MM(e,n,t)}}function EM(i){var t;return!!(!((t=i==null?void 0:i.color)===null||t===void 0)&&t.alpha)}function TM(i){return i?t=>Bl(t,"0x"):t=>Fl(t,"0x")}function AM(i){return"color"in i||i.view==="color"}const CM=Fe({id:"input-color-number",type:"input",accept:(i,t)=>{if(typeof i!="number"||!AM(t))return null;const e=Nl(t);return e?{initialValue:i,params:Object.assign(Object.assign({},e),{supportsAlpha:EM(t)})}:null},binding:{reader:i=>i.params.supportsAlpha?xM:gM,equals:Vl,writer:i=>yM(i.params.supportsAlpha)},controller:i=>{var t,e;return new kl(i.document,{colorType:"int",expanded:(t=i.params.expanded)!==null&&t!==void 0?t:!1,formatter:TM(i.params.supportsAlpha),parser:Ts("int"),pickerLayout:(e=i.params.picker)!==null&&e!==void 0?e:"popup",supportsAlpha:i.params.supportsAlpha,value:i.value,viewProps:i.viewProps})}});function PM(i,t){if(!vp(i))return Oe(Wt.black(),t);if(t==="int"){const e=nu(i);return new Wt(e,"rgb")}if(t==="float"){const e=nu(i);return new Ul(e,"rgb")}return Oe(Wt.black(),"int")}function RM(i){return mp(i)}function LM(i){return t=>{const e=PM(t,i);return Oe(e,"int")}}function DM(i,t){return e=>i?dp(e,t):up(e,t)}const IM=Fe({id:"input-color-object",type:"input",accept:(i,t)=>{var e;if(!vp(i))return null;const n=Nl(t);return n?{initialValue:i,params:Object.assign(Object.assign({},n),{colorType:(e=Qd(t))!==null&&e!==void 0?e:"int"})}:null},binding:{reader:i=>LM(i.params.colorType),equals:Vl,writer:i=>SM(RM(i.initialValue),i.params.colorType)},controller:i=>{var t,e;const n=mp(i.initialValue);return new kl(i.document,{colorType:i.params.colorType,expanded:(t=i.params.expanded)!==null&&t!==void 0?t:!1,formatter:DM(n,i.params.colorType),parser:Ts("int"),pickerLayout:(e=i.params.picker)!==null&&e!==void 0?e:"popup",supportsAlpha:n,value:i.value,viewProps:i.viewProps})}}),NM=Fe({id:"input-color-string",type:"input",accept:(i,t)=>{if(typeof i!="string"||t.view==="text")return null;const e=Gw(i,Qd(t));if(!e)return null;const n=pp(e);if(!n)return null;const r=Nl(t);return r?{initialValue:i,params:Object.assign(Object.assign({},r),{format:e,stringifier:n})}:null},binding:{reader:()=>Ww,equals:Vl,writer:i=>{const t=bM(i.params.format);if(!t)throw he.notBindable();return t}},controller:i=>{var t,e;return new kl(i.document,{colorType:i.params.format.type,expanded:(t=i.params.expanded)!==null&&t!==void 0?t:!1,formatter:i.params.stringifier,parser:Ts("int"),pickerLayout:(e=i.params.picker)!==null&&e!==void 0?e:"popup",supportsAlpha:i.params.format.alpha,value:i.value,viewProps:i.viewProps})}});class zl{constructor(t){this.components=t.components,this.asm_=t.assembly}constrain(t){const e=this.asm_.toComponents(t).map((n,r)=>{var s,o;return(o=(s=this.components[r])===null||s===void 0?void 0:s.constrain(n))!==null&&o!==void 0?o:n});return this.asm_.fromComponents(e)}}const iu=Gt("pndtxt");class UM{constructor(t,e){this.textViews=e.textViews,this.element=t.createElement("div"),this.element.classList.add(iu()),this.textViews.forEach(n=>{const r=t.createElement("div");r.classList.add(iu("a")),r.appendChild(n.element),this.element.appendChild(r)})}}function OM(i,t,e){return new Ss(i,{arrayPosition:e===0?"fst":e===t.axes.length-1?"lst":"mid",parser:t.parser,props:t.axes[e].textProps,value:se(0,{constraint:t.axes[e].constraint}),viewProps:t.viewProps})}class Hl{constructor(t,e){this.value=e.value,this.viewProps=e.viewProps,this.acs_=e.axes.map((n,r)=>OM(t,e,r)),this.acs_.forEach((n,r)=>{Pr({primary:this.value,secondary:n.value,forward:s=>e.assembly.toComponents(s)[r],backward:(s,o)=>{const a=e.assembly.toComponents(s);return a[r]=o,e.assembly.fromComponents(a)}})}),this.view=new UM(t,{textViews:this.acs_.map(n=>n.view)})}get textControllers(){return this.acs_}}class FM extends as{get max(){return this.controller.valueController.sliderController.props.get("max")}set max(t){this.controller.valueController.sliderController.props.set("max",t)}get min(){return this.controller.valueController.sliderController.props.get("min")}set min(t){this.controller.valueController.sliderController.props.set("min",t)}}function BM(i,t){const e=[],n=Ad(i,t);n&&e.push(n);const r=Cd(i);r&&e.push(r);const s=Il(i.options);return s&&e.push(s),new ys(e)}const kM=Fe({id:"input-number",type:"input",accept:(i,t)=>{if(typeof i!="number")return null;const e=le(t,n=>Object.assign(Object.assign({},Rd(n)),{options:n.optional.custom(Ms),readonly:n.optional.constant(!1)}));return e?{initialValue:i,params:e}:null},binding:{reader:i=>Md,constraint:i=>BM(i.params,i.initialValue),writer:i=>Es},controller:i=>{const t=i.value,e=i.constraint,n=e&&Po(e,ws);if(n)return new si(i.document,{props:new It({options:n.values.value("options")}),value:t,viewProps:i.viewProps});const r=Pd(i.params,t.rawValue),s=e&&Po(e,gs);return s?new Lo(i.document,Object.assign(Object.assign({},Yd(Object.assign(Object.assign({},r),{keyScale:se(r.keyScale),max:s.values.value("max"),min:s.values.value("min")}))),{parser:Ln,value:t,viewProps:i.viewProps})):new Ss(i.document,{parser:Ln,props:It.fromObject(r),value:t,viewProps:i.viewProps})},api(i){return typeof i.controller.value.rawValue!="number"?null:i.controller.valueController instanceof Lo?new FM(i.controller):i.controller.valueController instanceof si?new Ll(i.controller):null}});class ei{constructor(t=0,e=0){this.x=t,this.y=e}getComponents(){return[this.x,this.y]}static isObject(t){if(Qt(t))return!1;const e=t.x,n=t.y;return!(typeof e!="number"||typeof n!="number")}static equals(t,e){return t.x===e.x&&t.y===e.y}toObject(){return{x:this.x,y:this.y}}}const _p={toComponents:i=>i.getComponents(),fromComponents:i=>new ei(...i)},lr=Gt("p2d");class VM{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(lr()),e.viewProps.bindClassModifiers(this.element),Pn(e.expanded,Tr(this.element,lr(void 0,"expanded")));const n=t.createElement("div");n.classList.add(lr("h")),this.element.appendChild(n);const r=t.createElement("button");r.classList.add(lr("b")),r.appendChild(zo(t,"p2dpad")),e.viewProps.bindDisabled(r),n.appendChild(r),this.buttonElement=r;const s=t.createElement("div");if(s.classList.add(lr("t")),n.appendChild(s),this.textElement=s,e.pickerLayout==="inline"){const o=t.createElement("div");o.classList.add(lr("p")),this.element.appendChild(o),this.pickerElement=o}else this.pickerElement=null}}const Gn=Gt("p2dp");class zM{constructor(t,e){this.onFoldableChange_=this.onFoldableChange_.bind(this),this.onPropsChange_=this.onPropsChange_.bind(this),this.onValueChange_=this.onValueChange_.bind(this),this.props_=e.props,this.props_.emitter.on("change",this.onPropsChange_),this.element=t.createElement("div"),this.element.classList.add(Gn()),e.layout==="popup"&&this.element.classList.add(Gn(void 0,"p")),e.viewProps.bindClassModifiers(this.element);const n=t.createElement("div");n.classList.add(Gn("p")),e.viewProps.bindTabIndex(n),this.element.appendChild(n),this.padElement=n;const r=t.createElementNS(fn,"svg");r.classList.add(Gn("g")),this.padElement.appendChild(r),this.svgElem_=r;const s=t.createElementNS(fn,"line");s.classList.add(Gn("ax")),s.setAttributeNS(null,"x1","0"),s.setAttributeNS(null,"y1","50%"),s.setAttributeNS(null,"x2","100%"),s.setAttributeNS(null,"y2","50%"),this.svgElem_.appendChild(s);const o=t.createElementNS(fn,"line");o.classList.add(Gn("ax")),o.setAttributeNS(null,"x1","50%"),o.setAttributeNS(null,"y1","0"),o.setAttributeNS(null,"x2","50%"),o.setAttributeNS(null,"y2","100%"),this.svgElem_.appendChild(o);const a=t.createElementNS(fn,"line");a.classList.add(Gn("l")),a.setAttributeNS(null,"x1","50%"),a.setAttributeNS(null,"y1","50%"),this.svgElem_.appendChild(a),this.lineElem_=a;const l=t.createElement("div");l.classList.add(Gn("m")),this.padElement.appendChild(l),this.markerElem_=l,e.value.emitter.on("change",this.onValueChange_),this.value=e.value,this.update_()}get allFocusableElements(){return[this.padElement]}update_(){const[t,e]=this.value.rawValue.getComponents(),n=this.props_.get("max"),r=qt(t,-n,+n,0,100),s=qt(e,-n,+n,0,100),o=this.props_.get("invertsY")?100-s:s;this.lineElem_.setAttributeNS(null,"x2",`${r}%`),this.lineElem_.setAttributeNS(null,"y2",`${o}%`),this.markerElem_.style.left=`${r}%`,this.markerElem_.style.top=`${o}%`}onValueChange_(){this.update_()}onPropsChange_(){this.update_()}onFoldableChange_(){this.update_()}}function ru(i,t,e){return[ke(t[0],Dn(i)),ke(t[1],cs(i))*(e?1:-1)]}class HM{constructor(t,e){this.onPadKeyDown_=this.onPadKeyDown_.bind(this),this.onPadKeyUp_=this.onPadKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.props=e.props,this.value=e.value,this.viewProps=e.viewProps,this.view=new zM(t,{layout:e.layout,props:this.props,value:this.value,viewProps:this.viewProps}),this.ptHandler_=new Oi(this.view.padElement),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.padElement.addEventListener("keydown",this.onPadKeyDown_),this.view.padElement.addEventListener("keyup",this.onPadKeyUp_)}handlePointerEvent_(t,e){if(!t.point)return;const n=this.props.get("max"),r=qt(t.point.x,0,t.bounds.width,-n,+n),s=qt(this.props.get("invertsY")?t.bounds.height-t.point.y:t.point.y,0,t.bounds.height,-n,+n);this.value.setRawValue(new ei(r,s),e)}onPointerDown_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerMove_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerUp_(t){this.handlePointerEvent_(t.data,{forceEmit:!0,last:!0})}onPadKeyDown_(t){$d(t.key)&&t.preventDefault();const[e,n]=ru(t,[this.props.get("xKeyScale"),this.props.get("yKeyScale")],this.props.get("invertsY"));e===0&&n===0||this.value.setRawValue(new ei(this.value.rawValue.x+e,this.value.rawValue.y+n),{forceEmit:!1,last:!1})}onPadKeyUp_(t){const[e,n]=ru(t,[this.props.get("xKeyScale"),this.props.get("yKeyScale")],this.props.get("invertsY"));e===0&&n===0||this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}class GM{constructor(t,e){var n,r;this.onPopupChildBlur_=this.onPopupChildBlur_.bind(this),this.onPopupChildKeydown_=this.onPopupChildKeydown_.bind(this),this.onPadButtonBlur_=this.onPadButtonBlur_.bind(this),this.onPadButtonClick_=this.onPadButtonClick_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.foldable_=bs.create(e.expanded),this.popC_=e.pickerLayout==="popup"?new Gd(t,{viewProps:this.viewProps}):null;const s=new HM(t,{layout:e.pickerLayout,props:new It({invertsY:se(e.invertsY),max:se(e.max),xKeyScale:e.axes[0].textProps.value("keyScale"),yKeyScale:e.axes[1].textProps.value("keyScale")}),value:this.value,viewProps:this.viewProps});s.view.allFocusableElements.forEach(o=>{o.addEventListener("blur",this.onPopupChildBlur_),o.addEventListener("keydown",this.onPopupChildKeydown_)}),this.pickerC_=s,this.textC_=new Hl(t,{assembly:_p,axes:e.axes,parser:e.parser,value:this.value,viewProps:this.viewProps}),this.view=new VM(t,{expanded:this.foldable_.value("expanded"),pickerLayout:e.pickerLayout,viewProps:this.viewProps}),this.view.textElement.appendChild(this.textC_.view.element),(n=this.view.buttonElement)===null||n===void 0||n.addEventListener("blur",this.onPadButtonBlur_),(r=this.view.buttonElement)===null||r===void 0||r.addEventListener("click",this.onPadButtonClick_),this.popC_?(this.view.element.appendChild(this.popC_.view.element),this.popC_.view.element.appendChild(this.pickerC_.view.element),Pr({primary:this.foldable_.value("expanded"),secondary:this.popC_.shows,forward:o=>o,backward:(o,a)=>a})):this.view.pickerElement&&(this.view.pickerElement.appendChild(this.pickerC_.view.element),Rl(this.foldable_,this.view.pickerElement))}get textController(){return this.textC_}onPadButtonBlur_(t){if(!this.popC_)return;const e=this.view.element,n=t.relatedTarget;(!n||!e.contains(n))&&(this.popC_.shows.rawValue=!1)}onPadButtonClick_(){this.foldable_.set("expanded",!this.foldable_.get("expanded")),this.foldable_.get("expanded")&&this.pickerC_.view.allFocusableElements[0].focus()}onPopupChildBlur_(t){if(!this.popC_)return;const e=this.popC_.view.element,n=Nd(t);n&&e.contains(n)||n&&n===this.view.buttonElement&&!Sl(e.ownerDocument)||(this.popC_.shows.rawValue=!1)}onPopupChildKeydown_(t){this.popC_?t.key==="Escape"&&(this.popC_.shows.rawValue=!1):this.view.pickerElement&&t.key==="Escape"&&this.view.buttonElement.focus()}}function WM(i){return ei.isObject(i)?new ei(i.x,i.y):new ei}function XM(i,t){i.writeProperty("x",t.x),i.writeProperty("y",t.y)}function $M(i,t){return new zl({assembly:_p,components:[Cn(Object.assign(Object.assign({},i),i.x),t.x),Cn(Object.assign(Object.assign({},i),i.y),t.y)]})}function su(i,t){var e,n;if(!Qt(i.min)||!Qt(i.max))return Math.max(Math.abs((e=i.min)!==null&&e!==void 0?e:0),Math.abs((n=i.max)!==null&&n!==void 0?n:0));const r=Ed(i);return Math.max(Math.abs(r)*10,Math.abs(t)*10)}function YM(i,t){var e,n;const r=su(Pi(i,(e=i.x)!==null&&e!==void 0?e:{}),t.x),s=su(Pi(i,(n=i.y)!==null&&n!==void 0?n:{}),t.y);return Math.max(r,s)}function qM(i){if(!("y"in i))return!1;const t=i.y;return t&&"inverted"in t?!!t.inverted:!1}const KM=Fe({id:"input-point2d",type:"input",accept:(i,t)=>{if(!ei.isObject(i))return null;const e=le(t,n=>Object.assign(Object.assign({},hs(n)),{expanded:n.optional.boolean,picker:n.optional.custom(Kd),readonly:n.optional.constant(!1),x:n.optional.custom(jn),y:n.optional.object(Object.assign(Object.assign({},hs(n)),{inverted:n.optional.boolean}))}));return e?{initialValue:i,params:e}:null},binding:{reader:()=>WM,constraint:i=>$M(i.params,i.initialValue),equals:ei.equals,writer:()=>XM},controller:i=>{var t,e;const n=i.document,r=i.value,s=i.constraint,o=[i.params.x,i.params.y];return new GM(n,{axes:r.rawValue.getComponents().map((a,l)=>{var c;return Ml({constraint:s.components[l],initialValue:a,params:Pi(i.params,(c=o[l])!==null&&c!==void 0?c:{})})}),expanded:(t=i.params.expanded)!==null&&t!==void 0?t:!1,invertsY:qM(i.params),max:YM(i.params,r.rawValue),parser:Ln,pickerLayout:(e=i.params.picker)!==null&&e!==void 0?e:"popup",value:r,viewProps:i.viewProps})}});class vr{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}getComponents(){return[this.x,this.y,this.z]}static isObject(t){if(Qt(t))return!1;const e=t.x,n=t.y,r=t.z;return!(typeof e!="number"||typeof n!="number"||typeof r!="number")}static equals(t,e){return t.x===e.x&&t.y===e.y&&t.z===e.z}toObject(){return{x:this.x,y:this.y,z:this.z}}}const gp={toComponents:i=>i.getComponents(),fromComponents:i=>new vr(...i)};function jM(i){return vr.isObject(i)?new vr(i.x,i.y,i.z):new vr}function ZM(i,t){i.writeProperty("x",t.x),i.writeProperty("y",t.y),i.writeProperty("z",t.z)}function JM(i,t){return new zl({assembly:gp,components:[Cn(Object.assign(Object.assign({},i),i.x),t.x),Cn(Object.assign(Object.assign({},i),i.y),t.y),Cn(Object.assign(Object.assign({},i),i.z),t.z)]})}const QM=Fe({id:"input-point3d",type:"input",accept:(i,t)=>{if(!vr.isObject(i))return null;const e=le(t,n=>Object.assign(Object.assign({},hs(n)),{readonly:n.optional.constant(!1),x:n.optional.custom(jn),y:n.optional.custom(jn),z:n.optional.custom(jn)}));return e?{initialValue:i,params:e}:null},binding:{reader:i=>jM,constraint:i=>JM(i.params,i.initialValue),equals:vr.equals,writer:i=>ZM},controller:i=>{const t=i.value,e=i.constraint,n=[i.params.x,i.params.y,i.params.z];return new Hl(i.document,{assembly:gp,axes:t.rawValue.getComponents().map((r,s)=>{var o;return Ml({constraint:e.components[s],initialValue:r,params:Pi(i.params,(o=n[s])!==null&&o!==void 0?o:{})})}),parser:Ln,value:t,viewProps:i.viewProps})}});class _r{constructor(t=0,e=0,n=0,r=0){this.x=t,this.y=e,this.z=n,this.w=r}getComponents(){return[this.x,this.y,this.z,this.w]}static isObject(t){if(Qt(t))return!1;const e=t.x,n=t.y,r=t.z,s=t.w;return!(typeof e!="number"||typeof n!="number"||typeof r!="number"||typeof s!="number")}static equals(t,e){return t.x===e.x&&t.y===e.y&&t.z===e.z&&t.w===e.w}toObject(){return{x:this.x,y:this.y,z:this.z,w:this.w}}}const xp={toComponents:i=>i.getComponents(),fromComponents:i=>new _r(...i)};function tS(i){return _r.isObject(i)?new _r(i.x,i.y,i.z,i.w):new _r}function eS(i,t){i.writeProperty("x",t.x),i.writeProperty("y",t.y),i.writeProperty("z",t.z),i.writeProperty("w",t.w)}function nS(i,t){return new zl({assembly:xp,components:[Cn(Object.assign(Object.assign({},i),i.x),t.x),Cn(Object.assign(Object.assign({},i),i.y),t.y),Cn(Object.assign(Object.assign({},i),i.z),t.z),Cn(Object.assign(Object.assign({},i),i.w),t.w)]})}const iS=Fe({id:"input-point4d",type:"input",accept:(i,t)=>{if(!_r.isObject(i))return null;const e=le(t,n=>Object.assign(Object.assign({},hs(n)),{readonly:n.optional.constant(!1),w:n.optional.custom(jn),x:n.optional.custom(jn),y:n.optional.custom(jn),z:n.optional.custom(jn)}));return e?{initialValue:i,params:e}:null},binding:{reader:i=>tS,constraint:i=>nS(i.params,i.initialValue),equals:_r.equals,writer:i=>eS},controller:i=>{const t=i.value,e=i.constraint,n=[i.params.x,i.params.y,i.params.z,i.params.w];return new Hl(i.document,{assembly:xp,axes:t.rawValue.getComponents().map((r,s)=>{var o;return Ml({constraint:e.components[s],initialValue:r,params:Pi(i.params,(o=n[s])!==null&&o!==void 0?o:{})})}),parser:Ln,value:t,viewProps:i.viewProps})}});function rS(i){const t=[],e=Il(i.options);return e&&t.push(e),new ys(t)}const sS=Fe({id:"input-string",type:"input",accept:(i,t)=>{if(typeof i!="string")return null;const e=le(t,n=>({readonly:n.optional.constant(!1),options:n.optional.custom(Ms)}));return e?{initialValue:i,params:e}:null},binding:{reader:i=>Xd,constraint:i=>rS(i.params),writer:i=>Es},controller:i=>{const t=i.document,e=i.value,n=i.constraint,r=n&&Po(n,ws);return r?new si(t,{props:new It({options:r.values.value("options")}),value:e,viewProps:i.viewProps}):new ls(t,{parser:s=>s,props:It.fromObject({formatter:al}),value:e,viewProps:i.viewProps})},api(i){return typeof i.controller.value.rawValue!="string"?null:i.controller.valueController instanceof si?new Ll(i.controller):null}}),As={monitor:{defaultInterval:200,defaultRows:3}},ou=Gt("mll");class oS{constructor(t,e){this.onValueUpdate_=this.onValueUpdate_.bind(this),this.formatter_=e.formatter,this.element=t.createElement("div"),this.element.classList.add(ou()),e.viewProps.bindClassModifiers(this.element);const n=t.createElement("textarea");n.classList.add(ou("i")),n.style.height=`calc(var(${qd("containerUnitSize")}) * ${e.rows})`,n.readOnly=!0,e.viewProps.bindDisabled(n),this.element.appendChild(n),this.textareaElem_=n,e.value.emitter.on("change",this.onValueUpdate_),this.value=e.value,this.update_()}update_(){const t=this.textareaElem_,e=t.scrollTop===t.scrollHeight-t.clientHeight,n=[];this.value.rawValue.forEach(r=>{r!==void 0&&n.push(this.formatter_(r))}),t.textContent=n.join(`
`),e&&(t.scrollTop=t.scrollHeight)}onValueUpdate_(){this.update_()}}class Gl{constructor(t,e){this.value=e.value,this.viewProps=e.viewProps,this.view=new oS(t,{formatter:e.formatter,rows:e.rows,value:this.value,viewProps:this.viewProps})}}const au=Gt("sgl");class aS{constructor(t,e){this.onValueUpdate_=this.onValueUpdate_.bind(this),this.formatter_=e.formatter,this.element=t.createElement("div"),this.element.classList.add(au()),e.viewProps.bindClassModifiers(this.element);const n=t.createElement("input");n.classList.add(au("i")),n.readOnly=!0,n.type="text",e.viewProps.bindDisabled(n),this.element.appendChild(n),this.inputElement=n,e.value.emitter.on("change",this.onValueUpdate_),this.value=e.value,this.update_()}update_(){const t=this.value.rawValue,e=t[t.length-1];this.inputElement.value=e!==void 0?this.formatter_(e):""}onValueUpdate_(){this.update_()}}class Wl{constructor(t,e){this.value=e.value,this.viewProps=e.viewProps,this.view=new aS(t,{formatter:e.formatter,value:this.value,viewProps:this.viewProps})}}const lS=Fe({id:"monitor-bool",type:"monitor",accept:(i,t)=>{if(typeof i!="boolean")return null;const e=le(t,n=>({readonly:n.required.constant(!0),rows:n.optional.number}));return e?{initialValue:i,params:e}:null},binding:{reader:i=>Wd},controller:i=>{var t;return i.value.rawValue.length===1?new Wl(i.document,{formatter:Zh,value:i.value,viewProps:i.viewProps}):new Gl(i.document,{formatter:Zh,rows:(t=i.params.rows)!==null&&t!==void 0?t:As.monitor.defaultRows,value:i.value,viewProps:i.viewProps})}});class cS extends as{get max(){return this.controller.valueController.props.get("max")}set max(t){this.controller.valueController.props.set("max",t)}get min(){return this.controller.valueController.props.get("min")}set min(t){this.controller.valueController.props.set("min",t)}}const Wn=Gt("grl");class hS{constructor(t,e){this.onCursorChange_=this.onCursorChange_.bind(this),this.onValueUpdate_=this.onValueUpdate_.bind(this),this.element=t.createElement("div"),this.element.classList.add(Wn()),e.viewProps.bindClassModifiers(this.element),this.formatter_=e.formatter,this.props_=e.props,this.cursor_=e.cursor,this.cursor_.emitter.on("change",this.onCursorChange_);const n=t.createElementNS(fn,"svg");n.classList.add(Wn("g")),n.style.height=`calc(var(${qd("containerUnitSize")}) * ${e.rows})`,this.element.appendChild(n),this.svgElem_=n;const r=t.createElementNS(fn,"polyline");this.svgElem_.appendChild(r),this.lineElem_=r;const s=t.createElement("div");s.classList.add(Wn("t"),Gt("tt")()),this.element.appendChild(s),this.tooltipElem_=s,e.value.emitter.on("change",this.onValueUpdate_),this.value=e.value,this.update_()}get graphElement(){return this.svgElem_}update_(){const{clientWidth:t,clientHeight:e}=this.element,n=this.value.rawValue.length-1,r=this.props_.get("min"),s=this.props_.get("max"),o=[];this.value.rawValue.forEach((u,d)=>{if(u===void 0)return;const p=qt(d,0,n,0,t),_=qt(u,r,s,e,0);o.push([p,_].join(","))}),this.lineElem_.setAttributeNS(null,"points",o.join(" "));const a=this.tooltipElem_,l=this.value.rawValue[this.cursor_.rawValue];if(l===void 0){a.classList.remove(Wn("t","a"));return}const c=qt(this.cursor_.rawValue,0,n,0,t),h=qt(l,r,s,e,0);a.style.left=`${c}px`,a.style.top=`${h}px`,a.textContent=`${this.formatter_(l)}`,a.classList.contains(Wn("t","a"))||(a.classList.add(Wn("t","a"),Wn("t","in")),Co(a),a.classList.remove(Wn("t","in")))}onValueUpdate_(){this.update_()}onCursorChange_(){this.update_()}}class bp{constructor(t,e){if(this.onGraphMouseMove_=this.onGraphMouseMove_.bind(this),this.onGraphMouseLeave_=this.onGraphMouseLeave_.bind(this),this.onGraphPointerDown_=this.onGraphPointerDown_.bind(this),this.onGraphPointerMove_=this.onGraphPointerMove_.bind(this),this.onGraphPointerUp_=this.onGraphPointerUp_.bind(this),this.props=e.props,this.value=e.value,this.viewProps=e.viewProps,this.cursor_=se(-1),this.view=new hS(t,{cursor:this.cursor_,formatter:e.formatter,rows:e.rows,props:this.props,value:this.value,viewProps:this.viewProps}),!Sl(t))this.view.element.addEventListener("mousemove",this.onGraphMouseMove_),this.view.element.addEventListener("mouseleave",this.onGraphMouseLeave_);else{const n=new Oi(this.view.element);n.emitter.on("down",this.onGraphPointerDown_),n.emitter.on("move",this.onGraphPointerMove_),n.emitter.on("up",this.onGraphPointerUp_)}}importProps(t){return Ye(t,null,e=>({max:e.required.number,min:e.required.number}),e=>(this.props.set("max",e.max),this.props.set("min",e.min),!0))}exportProps(){return qe(null,{max:this.props.get("max"),min:this.props.get("min")})}onGraphMouseLeave_(){this.cursor_.rawValue=-1}onGraphMouseMove_(t){const{clientWidth:e}=this.view.element;this.cursor_.rawValue=Math.floor(qt(t.offsetX,0,e,0,this.value.rawValue.length))}onGraphPointerDown_(t){this.onGraphPointerMove_(t)}onGraphPointerMove_(t){if(!t.data.point){this.cursor_.rawValue=-1;return}this.cursor_.rawValue=Math.floor(qt(t.data.point.x,0,t.data.bounds.width,0,this.value.rawValue.length))}onGraphPointerUp_(){this.cursor_.rawValue=-1}}function ll(i){return Qt(i.format)?ze(2):i.format}function uS(i){var t;return i.value.rawValue.length===1?new Wl(i.document,{formatter:ll(i.params),value:i.value,viewProps:i.viewProps}):new Gl(i.document,{formatter:ll(i.params),rows:(t=i.params.rows)!==null&&t!==void 0?t:As.monitor.defaultRows,value:i.value,viewProps:i.viewProps})}function dS(i){var t,e,n;return new bp(i.document,{formatter:ll(i.params),rows:(t=i.params.rows)!==null&&t!==void 0?t:As.monitor.defaultRows,props:It.fromObject({max:(e=i.params.max)!==null&&e!==void 0?e:100,min:(n=i.params.min)!==null&&n!==void 0?n:0}),value:i.value,viewProps:i.viewProps})}function lu(i){return i.view==="graph"}const pS=Fe({id:"monitor-number",type:"monitor",accept:(i,t)=>{if(typeof i!="number")return null;const e=le(t,n=>({format:n.optional.function,max:n.optional.number,min:n.optional.number,readonly:n.required.constant(!0),rows:n.optional.number,view:n.optional.string}));return e?{initialValue:i,params:e}:null},binding:{defaultBufferSize:i=>lu(i)?64:1,reader:i=>Md},controller:i=>lu(i.params)?dS(i):uS(i),api:i=>i.controller.valueController instanceof bp?new cS(i.controller):null}),fS=Fe({id:"monitor-string",type:"monitor",accept:(i,t)=>{if(typeof i!="string")return null;const e=le(t,n=>({multiline:n.optional.boolean,readonly:n.required.constant(!0),rows:n.optional.number}));return e?{initialValue:i,params:e}:null},binding:{reader:i=>Xd},controller:i=>{var t;const e=i.value;return e.rawValue.length>1||i.params.multiline?new Gl(i.document,{formatter:al,rows:(t=i.params.rows)!==null&&t!==void 0?t:As.monitor.defaultRows,value:e,viewProps:i.viewProps}):new Wl(i.document,{formatter:al,value:e,viewProps:i.viewProps})}});class mS{constructor(){this.map_=new Map}get(t){var e;return(e=this.map_.get(t))!==null&&e!==void 0?e:null}has(t){return this.map_.has(t)}add(t,e){return this.map_.set(t,e),t.viewProps.handleDispose(()=>{this.map_.delete(t)}),e}}class vS{constructor(t){this.target=t.target,this.reader_=t.reader,this.writer_=t.writer}read(){return this.reader_(this.target.read())}write(t){this.writer_(this.target,t)}inject(t){this.write(this.reader_(t))}}function _S(i,t){var e;const n=i.accept(t.target.read(),t.params);if(Qt(n))return null;const r={target:t.target,initialValue:n.initialValue,params:n.params},s=le(t.params,u=>({disabled:u.optional.boolean,hidden:u.optional.boolean,label:u.optional.string,tag:u.optional.string})),o=i.binding.reader(r),a=i.binding.constraint?i.binding.constraint(r):void 0,l=new vS({reader:o,target:t.target,writer:i.binding.writer(r)}),c=new ny(se(o(n.initialValue),{constraint:a,equals:i.binding.equals}),l),h=i.controller({constraint:a,document:t.document,initialValue:n.initialValue,params:n.params,value:c,viewProps:In.create({disabled:s==null?void 0:s.disabled,hidden:s==null?void 0:s.hidden})});return new _y(t.document,{blade:Cr(),props:It.fromObject({label:"label"in t.params?(e=s==null?void 0:s.label)!==null&&e!==void 0?e:null:t.target.key}),tag:s==null?void 0:s.tag,value:c,valueController:h})}class gS{constructor(t){this.target=t.target,this.reader_=t.reader}read(){return this.reader_(this.target.read())}}function xS(i,t){return t===0?new Qy:new tw(i,t??As.monitor.defaultInterval)}function bS(i,t){var e,n,r;const s=i.accept(t.target.read(),t.params);if(Qt(s))return null;const o={target:t.target,initialValue:s.initialValue,params:s.params},a=le(t.params,d=>({bufferSize:d.optional.number,disabled:d.optional.boolean,hidden:d.optional.boolean,interval:d.optional.number,label:d.optional.string})),l=i.binding.reader(o),c=(n=(e=a==null?void 0:a.bufferSize)!==null&&e!==void 0?e:i.binding.defaultBufferSize&&i.binding.defaultBufferSize(s.params))!==null&&n!==void 0?n:1,h=new wy({binding:new gS({reader:l,target:t.target}),bufferSize:c,ticker:xS(t.document,a==null?void 0:a.interval)}),u=i.controller({document:t.document,params:s.params,value:h,viewProps:In.create({disabled:a==null?void 0:a.disabled,hidden:a==null?void 0:a.hidden})});return u.viewProps.bindDisabled(h.ticker),u.viewProps.handleDispose(()=>{h.ticker.dispose()}),new Sy(t.document,{blade:Cr(),props:It.fromObject({label:"label"in t.params?(r=a==null?void 0:a.label)!==null&&r!==void 0?r:null:t.target.key}),value:h,valueController:u})}class yS{constructor(t){this.pluginsMap_={blades:[],inputs:[],monitors:[]},this.apiCache_=t}getAll(){return[...this.pluginsMap_.blades,...this.pluginsMap_.inputs,...this.pluginsMap_.monitors]}register(t,e){if(!pw(e.core))throw he.notCompatible(t,e.id);e.type==="blade"?this.pluginsMap_.blades.unshift(e):e.type==="input"?this.pluginsMap_.inputs.unshift(e):e.type==="monitor"&&this.pluginsMap_.monitors.unshift(e)}createInput_(t,e,n){return this.pluginsMap_.inputs.reduce((r,s)=>r??_S(s,{document:t,target:e,params:n}),null)}createMonitor_(t,e,n){return this.pluginsMap_.monitors.reduce((r,s)=>r??bS(s,{document:t,params:n,target:e}),null)}createBinding(t,e,n){const r=e.read();if(Qt(r))throw new he({context:{key:e.key},type:"nomatchingcontroller"});const s=this.createInput_(t,e,n);if(s)return s;const o=this.createMonitor_(t,e,n);if(o)return o;throw new he({context:{key:e.key},type:"nomatchingcontroller"})}createBlade(t,e){const n=this.pluginsMap_.blades.reduce((r,s)=>r??Jy(s,{document:t,params:e}),null);if(!n)throw new he({type:"nomatchingview",context:{params:e}});return n}createInputBindingApi_(t){const e=this.pluginsMap_.inputs.reduce((n,r)=>{var s,o;return n||((o=(s=r.api)===null||s===void 0?void 0:s.call(r,{controller:t}))!==null&&o!==void 0?o:null)},null);return this.apiCache_.add(t,e??new as(t))}createMonitorBindingApi_(t){const e=this.pluginsMap_.monitors.reduce((n,r)=>{var s,o;return n||((o=(s=r.api)===null||s===void 0?void 0:s.call(r,{controller:t}))!==null&&o!==void 0?o:null)},null);return this.apiCache_.add(t,e??new as(t))}createBindingApi(t){if(this.apiCache_.has(t))return this.apiCache_.get(t);if(gy(t))return this.createInputBindingApi_(t);if(Ey(t))return this.createMonitorBindingApi_(t);throw he.shouldNeverHappen()}createApi(t){if(this.apiCache_.has(t))return this.apiCache_.get(t);if(vy(t))return this.createBindingApi(t);const e=this.pluginsMap_.blades.reduce((n,r)=>n??r.api({controller:t,pool:this}),null);if(!e)throw he.shouldNeverHappen();return this.apiCache_.add(t,e)}}const wS=new mS;function MS(){const i=new yS(wS);return[KM,QM,iS,sS,kM,NM,IM,CM,_w,lS,fS,pS,Ry,Gy,Hd].forEach(t=>{i.register("core",t)}),i}class SS extends Ui{constructor(t){super(t),this.emitter_=new ge,this.controller.value.emitter.on("change",e=>{this.emitter_.emit("change",new xs(this,e.rawValue))})}get label(){return this.controller.labelController.props.get("label")}set label(t){this.controller.labelController.props.set("label",t)}get options(){return this.controller.valueController.props.get("options")}set options(t){this.controller.valueController.props.set("options",t)}get value(){return this.controller.value.rawValue}set value(t){this.controller.value.rawValue=t}on(t,e){const n=e.bind(this);return this.emitter_.on(t,r=>{n(r)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}}class ES extends Ui{}class TS extends Ui{constructor(t){super(t),this.emitter_=new ge,this.controller.value.emitter.on("change",e=>{this.emitter_.emit("change",new xs(this,e.rawValue))})}get label(){return this.controller.labelController.props.get("label")}set label(t){this.controller.labelController.props.set("label",t)}get max(){return this.controller.valueController.sliderController.props.get("max")}set max(t){this.controller.valueController.sliderController.props.set("max",t)}get min(){return this.controller.valueController.sliderController.props.get("min")}set min(t){this.controller.valueController.sliderController.props.set("min",t)}get value(){return this.controller.value.rawValue}set value(t){this.controller.value.rawValue=t}on(t,e){const n=e.bind(this);return this.emitter_.on(t,r=>{n(r)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}}class AS extends Ui{constructor(t){super(t),this.emitter_=new ge,this.controller.value.emitter.on("change",e=>{this.emitter_.emit("change",new xs(this,e.rawValue))})}get label(){return this.controller.labelController.props.get("label")}set label(t){this.controller.labelController.props.set("label",t)}get formatter(){return this.controller.valueController.props.get("formatter")}set formatter(t){this.controller.valueController.props.set("formatter",t)}get value(){return this.controller.value.rawValue}set value(t){this.controller.value.rawValue=t}on(t,e){const n=e.bind(this);return this.emitter_.on(t,r=>{n(r)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}}const CS=function(){return{id:"list",type:"blade",core:Ar,accept(i){const t=le(i,e=>({options:e.required.custom(Ms),value:e.required.raw,view:e.required.constant("list"),label:e.optional.string}));return t?{params:t}:null},controller(i){const t=new ws(Dl(i.params.options)),e=se(i.params.value,{constraint:t}),n=new si(i.document,{props:new It({options:t.values.value("options")}),value:e,viewProps:i.viewProps});return new Ri(i.document,{blade:i.blade,props:It.fromObject({label:i.params.label}),value:e,valueController:n})},api(i){return!(i.controller instanceof Ri)||!(i.controller.valueController instanceof si)?null:new SS(i.controller)}}}();class PS extends Vd{constructor(t,e){super(t,e)}get element(){return this.controller.view.element}}class RS extends sl{constructor(t,e){super(t,{expanded:e.expanded,blade:e.blade,props:e.props,root:!0,viewProps:e.viewProps})}}const cu=Gt("spr");class LS{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(cu()),e.viewProps.bindClassModifiers(this.element);const n=t.createElement("hr");n.classList.add(cu("r")),this.element.appendChild(n)}}class hu extends Ho{constructor(t,e){super(Object.assign(Object.assign({},e),{view:new LS(t,{viewProps:e.viewProps})}))}}const DS={id:"separator",type:"blade",core:Ar,accept(i){const t=le(i,e=>({view:e.required.constant("separator")}));return t?{params:t}:null},controller(i){return new hu(i.document,{blade:i.blade,viewProps:i.viewProps})},api(i){return i.controller instanceof hu?new ES(i.controller):null}},IS={id:"slider",type:"blade",core:Ar,accept(i){const t=le(i,e=>({max:e.required.number,min:e.required.number,view:e.required.constant("slider"),format:e.optional.function,label:e.optional.string,value:e.optional.number}));return t?{params:t}:null},controller(i){var t,e;const n=(t=i.params.value)!==null&&t!==void 0?t:0,r=new gs({max:i.params.max,min:i.params.min}),s=se(n,{constraint:r}),o=new Lo(i.document,Object.assign(Object.assign({},Yd({formatter:(e=i.params.format)!==null&&e!==void 0?e:Zb,keyScale:se(1),max:r.values.value("max"),min:r.values.value("min"),pointerScale:Td(i.params,n)})),{parser:Ln,value:s,viewProps:i.viewProps}));return new Ri(i.document,{blade:i.blade,props:It.fromObject({label:i.params.label}),value:s,valueController:o})},api(i){return!(i.controller instanceof Ri)||!(i.controller.valueController instanceof Lo)?null:new TS(i.controller)}},NS=function(){return{id:"text",type:"blade",core:Ar,accept(i){const t=le(i,e=>({parse:e.required.function,value:e.required.raw,view:e.required.constant("text"),format:e.optional.function,label:e.optional.string}));return t?{params:t}:null},controller(i){var t;const e=se(i.params.value),n=new ls(i.document,{parser:i.params.parse,props:It.fromObject({formatter:(t=i.params.format)!==null&&t!==void 0?t:r=>String(r)}),value:e,viewProps:i.viewProps});return new Ri(i.document,{blade:i.blade,props:It.fromObject({label:i.params.label}),value:e,valueController:n})},api(i){return!(i.controller instanceof Ri)||!(i.controller.valueController instanceof ls)?null:new AS(i.controller)}}}();function US(i){const t=i.createElement("div");return t.classList.add(Gt("dfw")()),i.body&&i.body.appendChild(t),t}function OS(i,t,e){if(i.querySelector(`style[data-tp-style=${t}]`))return;const n=i.createElement("style");n.dataset.tpStyle=t,n.textContent=e,i.head.appendChild(n)}class yp extends PS{constructor(t){var e,n;const r=t??{},s=(e=r.document)!==null&&e!==void 0?e:cy(),o=MS(),a=new RS(s,{expanded:r.expanded,blade:Cr(),props:It.fromObject({title:r.title}),viewProps:In.create()});super(a,o),this.pool_=o,this.containerElem_=(n=r.container)!==null&&n!==void 0?n:US(s),this.containerElem_.appendChild(this.element),this.doc_=s,this.usesDefaultWrapper_=!r.container,this.setUpDefaultPlugins_()}get document(){if(!this.doc_)throw he.alreadyDisposed();return this.doc_}dispose(){const t=this.containerElem_;if(!t)throw he.alreadyDisposed();if(this.usesDefaultWrapper_){const e=t.parentElement;e&&e.removeChild(t)}this.containerElem_=null,this.doc_=null,super.dispose()}registerPlugin(t){t.css&&OS(this.document,`plugin-${t.id}`,t.css),("plugin"in t?[t.plugin]:"plugins"in t?t.plugins:[]).forEach(n=>{this.pool_.register(t.id,n)})}setUpDefaultPlugins_(){this.registerPlugin({id:"default",css:'.tp-tbiv_b,.tp-coltxtv_ms,.tp-colswv_b,.tp-ckbv_i,.tp-sglv_i,.tp-mllv_i,.tp-grlv_g,.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw,.tp-rotv_b,.tp-fldv_b,.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{background-color:var(--btn-bg);border-radius:var(--bld-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--cnt-usz);line-height:var(--cnt-usz);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-p2dv_b:hover,.tp-btnv_b:hover,.tp-lstv_s:hover{background-color:var(--btn-bg-h)}.tp-p2dv_b:focus,.tp-btnv_b:focus,.tp-lstv_s:focus{background-color:var(--btn-bg-f)}.tp-p2dv_b:active,.tp-btnv_b:active,.tp-lstv_s:active{background-color:var(--btn-bg-a)}.tp-p2dv_b:disabled,.tp-btnv_b:disabled,.tp-lstv_s:disabled{opacity:.5}.tp-rotv_c>.tp-cntv.tp-v-lst,.tp-tbpv_c>.tp-cntv.tp-v-lst,.tp-fldv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1*var(--cnt-vp))}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tbpv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tbpv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-rotv_c>*:not(.tp-v-fst),.tp-tbpv_c>*:not(.tp-v-fst),.tp-fldv_c>*:not(.tp-v-fst){margin-top:var(--cnt-usp)}.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-tbpv_c>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst),.tp-tbpv_c>.tp-cntv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-vp)}.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tbpv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tbpv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-vp)}.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tbpv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tbpv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-tbpv_c>.tp-cntv,.tp-fldv_c>.tp-cntv{margin-left:4px}.tp-tbpv_c>.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--bld-br);border-bottom-left-radius:var(--bld-br)}.tp-tbpv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-tbpv_c .tp-fldv>.tp-fldv_c,.tp-fldv_c .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--bld-br)}.tp-tbpv_c>.tp-cntv+.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-cntv+.tp-fldv>.tp-fldv_b{border-top-left-radius:0}.tp-tbpv_c>.tp-cntv+.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-cntv+.tp-tabv>.tp-tabv_t{border-top-left-radius:0}.tp-tbpv_c>.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-tabv>.tp-tabv_t{border-top-left-radius:var(--bld-br)}.tp-tbpv_c .tp-tabv>.tp-tabv_c,.tp-fldv_c .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--bld-br)}.tp-rotv_b,.tp-fldv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--cnt-usz) + 4px);line-height:calc(var(--cnt-usz) + 4px);overflow:hidden;padding-left:var(--cnt-hp);padding-right:calc(4px + var(--cnt-usz) + var(--cnt-hp));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-rotv_b:hover,.tp-fldv_b:hover{background-color:var(--cnt-bg-h)}.tp-rotv_b:focus,.tp-fldv_b:focus{background-color:var(--cnt-bg-f)}.tp-rotv_b:active,.tp-fldv_b:active{background-color:var(--cnt-bg-a)}.tp-rotv_b:disabled,.tp-fldv_b:disabled{opacity:.5}.tp-rotv_m,.tp-fldv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:"";display:block;height:6px;right:calc(var(--cnt-hp) + (var(--cnt-usz) + 4px - 6px)/2 - 2px);margin:auto;opacity:.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-rotv.tp-rotv-expanded .tp-rotv_m,.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m{transform:none}.tp-rotv_c,.tp-fldv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c,.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c{display:none}.tp-rotv.tp-rotv-expanded .tp-rotv_c,.tp-fldv.tp-fldv-expanded>.tp-fldv_c{opacity:1;padding-bottom:var(--cnt-vp);padding-top:var(--cnt-vp);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw{background-color:var(--in-bg);border-radius:var(--bld-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--cnt-usz);line-height:var(--cnt-usz);min-width:0;width:100%}.tp-txtv_i:hover,.tp-p2dpv_p:hover,.tp-colswv_sw:hover{background-color:var(--in-bg-h)}.tp-txtv_i:focus,.tp-p2dpv_p:focus,.tp-colswv_sw:focus{background-color:var(--in-bg-f)}.tp-txtv_i:active,.tp-p2dpv_p:active,.tp-colswv_sw:active{background-color:var(--in-bg-a)}.tp-txtv_i:disabled,.tp-p2dpv_p:disabled,.tp-colswv_sw:disabled{opacity:.5}.tp-lstv,.tp-coltxtv_m{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m,.tp-coltxtv_mm{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-lstv_m svg,.tp-coltxtv_mm svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-lstv_m svg path,.tp-coltxtv_mm svg path{fill:currentColor}.tp-sglv_i,.tp-mllv_i,.tp-grlv_g{background-color:var(--mo-bg);border-radius:var(--bld-br);box-sizing:border-box;color:var(--mo-fg);height:var(--cnt-usz);scrollbar-color:currentColor rgba(0,0,0,0);scrollbar-width:thin;width:100%}.tp-sglv_i::-webkit-scrollbar,.tp-mllv_i::-webkit-scrollbar,.tp-grlv_g::-webkit-scrollbar{height:8px;width:8px}.tp-sglv_i::-webkit-scrollbar-corner,.tp-mllv_i::-webkit-scrollbar-corner,.tp-grlv_g::-webkit-scrollbar-corner{background-color:rgba(0,0,0,0)}.tp-sglv_i::-webkit-scrollbar-thumb,.tp-mllv_i::-webkit-scrollbar-thumb,.tp-grlv_g::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:currentColor;border:rgba(0,0,0,0) solid 2px;border-radius:4px}.tp-pndtxtv,.tp-coltxtv_w{display:flex}.tp-pndtxtv_a,.tp-coltxtv_c{width:100%}.tp-pndtxtv_a+.tp-pndtxtv_a,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-coltxtv_c{margin-left:2px}.tp-rotv{--bs-bg: var(--tp-base-background-color, hsl(230, 7%, 17%));--bs-br: var(--tp-base-border-radius, 6px);--bs-ff: var(--tp-base-font-family, Roboto Mono, Source Code Pro, Menlo, Courier, monospace);--bs-sh: var(--tp-base-shadow-color, rgba(0, 0, 0, 0.2));--bld-br: var(--tp-blade-border-radius, 2px);--bld-hp: var(--tp-blade-horizontal-padding, 4px);--bld-vw: var(--tp-blade-value-width, 160px);--btn-bg: var(--tp-button-background-color, hsl(230, 7%, 70%));--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, hsl(230, 7%, 17%));--cnt-bg: var(--tp-container-background-color, rgba(187, 188, 196, 0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187, 188, 196, 0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187, 188, 196, 0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187, 188, 196, 0.15));--cnt-fg: var(--tp-container-foreground-color, hsl(230, 7%, 75%));--cnt-hp: var(--tp-container-horizontal-padding, 4px);--cnt-vp: var(--tp-container-vertical-padding, 4px);--cnt-usp: var(--tp-container-unit-spacing, 4px);--cnt-usz: var(--tp-container-unit-size, 20px);--in-bg: var(--tp-input-background-color, rgba(187, 188, 196, 0.1));--in-bg-a: var(--tp-input-background-color-active, rgba(187, 188, 196, 0.25));--in-bg-f: var(--tp-input-background-color-focus, rgba(187, 188, 196, 0.2));--in-bg-h: var(--tp-input-background-color-hover, rgba(187, 188, 196, 0.15));--in-fg: var(--tp-input-foreground-color, hsl(230, 7%, 75%));--lbl-fg: var(--tp-label-foreground-color, rgba(187, 188, 196, 0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0, 0, 0, 0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187, 188, 196, 0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(187, 188, 196, 0.1))}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--bld-br);cursor:pointer;display:block;height:var(--cnt-usz);position:relative;width:var(--cnt-usz)}.tp-ckbv_w svg{bottom:0;display:block;height:16px;left:0;margin:auto;opacity:0;position:absolute;right:0;top:0;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--cnt-usz)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-expanded.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--cnt-usp);opacity:1}.tp-colv .tp-popv{left:calc(-1*var(--cnt-hp));right:calc(-1*var(--cnt-hp));top:var(--cnt-usz)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--cnt-usp)}.tp-colpv_rgb{display:flex;margin-top:var(--cnt-usp);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-vp);padding-top:calc(var(--cnt-vp) + 2px);position:relative}.tp-colpv_a::before{background-color:var(--grv-fg);content:"";height:2px;left:calc(-1*var(--cnt-hp));position:absolute;right:calc(-1*var(--cnt-hp));top:0}.tp-colpv.tp-v-disabled .tp-colpv_a::before{opacity:.5}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--bld-br);outline:none;overflow:hidden;position:relative}.tp-svpv.tp-v-disabled{opacity:.5}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--cnt-usz)*4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0, 0, 0, 0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--cnt-usz);outline:none;position:relative}.tp-hplv.tp-v-disabled{opacity:.5}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--bld-br);border:rgba(255,255,255,.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--cnt-usz);outline:none;position:relative;width:100%}.tp-aplv.tp-v-disabled{opacity:.5}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--bld-br);box-shadow:0 0 2px rgba(0,0,0,.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--bld-br);border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--bld-br);overflow:hidden}.tp-colswv.tp-v-disabled{opacity:.5}.tp-colswv_sw{border-radius:0}.tp-colswv_b{cursor:pointer;display:block;height:var(--cnt-usz);left:0;position:absolute;top:0;width:var(--cnt-usz)}.tp-colswv_b:focus::after{border:rgba(255,255,255,.75) solid 2px;border-radius:var(--bld-br);bottom:0;content:"";display:block;left:0;position:absolute;right:0;top:0}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--bld-br);color:var(--lbl-fg);cursor:pointer;height:var(--cnt-usz);line-height:var(--cnt-usz);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv.tp-v-disabled .tp-coltxtv_mm{opacity:.5}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv{position:relative}.tp-fldv_t{padding-left:4px}.tp-fldv_b:disabled .tp-fldv_m{display:none}.tp-fldv_c{padding-left:4px}.tp-fldv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--cnt-usz) + 4px);width:max(var(--bs-br),4px)}.tp-fldv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-fldv_b:hover+.tp-fldv_i{color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_i{color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_i{color:var(--cnt-bg-a)}.tp-fldv.tp-v-disabled>.tp-fldv_i{opacity:.5}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--cnt-usz)*3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left .05s,top .05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-hp);padding-right:var(--cnt-hp)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:var(--bld-vw)}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 var(--bld-hp);width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding-left:var(--bld-hp);padding-right:var(--bld-hp)}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:.5}.tp-mllv_i{display:block;height:calc(var(--cnt-usz)*3);line-height:var(--cnt-usz);padding-left:var(--bld-hp);padding-right:var(--bld-hp);resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--cnt-usz);margin-right:4px;position:relative;width:var(--cnt-usz)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--cnt-usp);opacity:1}.tp-p2dv .tp-popv{left:calc(-1*var(--cnt-hp));right:calc(-1*var(--cnt-hp));top:var(--cnt-usz)}.tp-p2dpv{padding-left:calc(var(--cnt-usz) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv.tp-v-disabled .tp-p2dpv_p{opacity:.5}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:var(--bld-vw);padding:var(--cnt-vp) var(--cnt-hp);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sldv.tp-v-disabled{opacity:.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--cnt-usz);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin:auto;position:absolute;right:0;top:0}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin-bottom:auto;margin-top:auto;position:absolute;right:0;top:0}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--bld-br);bottom:0;content:"";display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv{position:relative}.tp-tabv_t{align-items:flex-end;color:var(--cnt-bg);display:flex;overflow:hidden;position:relative}.tp-tabv_t:hover{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus){color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active){color:var(--cnt-bg-a)}.tp-tabv_t::before{background-color:currentColor;bottom:0;content:"";height:2px;left:0;pointer-events:none;position:absolute;right:0}.tp-tabv.tp-v-disabled .tp-tabv_t::before{opacity:.5}.tp-tabv.tp-tabv-nop .tp-tabv_t{height:calc(var(--cnt-usz) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_t::before{background-color:var(--cnt-bg);bottom:0;content:"";height:2px;left:0;position:absolute;right:0}.tp-tabv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--cnt-usz) + 4px);width:max(var(--bs-br),4px)}.tp-tabv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-tabv_t:hover+.tp-tabv_i{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus)+.tp-tabv_i{color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active)+.tp-tabv_i{color:var(--cnt-bg-a)}.tp-tabv.tp-v-disabled>.tp-tabv_i{opacity:.5}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv.tp-v-disabled::before{opacity:.5}.tp-tbiv_b{display:block;padding-left:calc(var(--cnt-hp) + 4px);padding-right:calc(var(--cnt-hp) + 4px);position:relative;width:100%}.tp-tbiv_b:disabled{opacity:.5}.tp-tbiv_b::before{background-color:var(--cnt-bg);bottom:2px;content:"";left:0;pointer-events:none;position:absolute;right:0;top:0}.tp-tbiv_b:hover::before{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus::before{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active::before{background-color:var(--cnt-bg-a)}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--cnt-usz) + 4px);line-height:calc(var(--cnt-usz) + 4px);opacity:.5;overflow:hidden;position:relative;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-tbpv_c{padding-bottom:var(--cnt-vp);padding-left:4px;padding-top:var(--cnt-vp)}.tp-txtv{position:relative}.tp-txtv_i{padding-left:var(--bld-hp);padding-right:var(--bld-hp)}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:.3}.tp-txtv_k{cursor:pointer;height:100%;left:calc(var(--bld-hp) - 5px);position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";height:calc(var(--cnt-usz) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:.1;position:absolute;top:0;transition:border-radius .1s,height .1s,transform .1s,width .1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--bld-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0);border-style:solid;border-width:2px;box-sizing:border-box;content:"";font-size:.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--bs-ff);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(4px + var(--cnt-usz) + var(--cnt-hp));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0;transition-delay:0s;transition-duration:0s}.tp-rotv.tp-rotv-not>.tp-rotv_b{display:none}.tp-rotv_b:disabled .tp-rotv_m{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst.tp-fldv-expanded>.tp-fldv_b{transition-delay:0s;transition-duration:0s}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1*var(--cnt-vp))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1*var(--cnt-vp))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_t{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sprv.tp-v-disabled .tp-sprv_r{opacity:.5}',plugins:[CS,DS,IS,Hd,NS]})}}new kd("4.0.3");function FS(i,t){const e=new yp({title:"Parameters"}),n=BS(i),r=e.element.parentElement,s=new Map;r&&(r.style.top="inherit",r.style.bottom="0px",r.style.width="300px"),s.set("root",e),Object.entries(i).forEach(([o,a])=>{var l;a.folder&&!s.get(a.folder)&&s.set(a.folder,e.addFolder({title:a.folder})),(l=s.get(a.folder??"root"))==null||l.addBinding(n,o,{min:a.min||0,max:a.max||50,step:a.step||.5,label:a.label||o})}),e.on("change",o=>t==null?void 0:t(o))}const BS=i=>Object.entries(i).reduce((t,[e,n])=>(t[e]=n.value,t),{});function kS(i,t){const{button:e,div:n,input:r}=xt.tags,s=xt.state(0),o=xt.state(!1),a=30,l=t.dynamicSettings.val.timeStep,c=Math.floor(1/l/a),h=i.val.analysisOutputs.position.size-1,u=()=>n({class:"slidecontainer"},r({type:"range",min:"0",max:h,value:"0",class:"slider",id:"playerBar",oninput:_=>{s.val=Number(_.target.value),o.val=!1}})),d=()=>n({class:"player-button",onclick:()=>o.val=!o.val},e({role:"play",class:()=>o.val?"play hidden":"play"}),e({role:"pause",class:()=>o.val?"pause":"pause hidden"})),p=()=>n({class:"player"},d(),u());xt.add(document.body,p()),xt.derive(()=>{let _=structuredClone(i.val);_.nodes=i.val.analysisOutputs.position.get(s.val)??[],i.val=_}),setInterval(()=>{if(o.val){const _=document.getElementById("playerBar"),g=Math.min(h,s.val+c);g===h&&(o.val=!1),_.value=g.toString(),s.val=g}},1e3/a)}function VS(i){const t=new yp({title:"Settings",expanded:!1}),e=t.element.parentElement;e&&(e.style.top="0px",e.style.bottom="inherit",e.style.left="8px",e.style.width="300px"),t.addBinding(i.displayScale,"val",{label:"Display scale",min:-10,max:10,step:1}),t.addBinding(i.nodes,"val",{label:"Nodes"}),t.addBinding(i.elements,"val",{label:"Elements"}),t.addBinding(i.nodesIndexes,"val",{label:"Nodes indexes"}),t.addBinding(i.elementsIndexes,"val",{label:"Elements indexes"}),t.addBinding(i.orientations,"val",{label:"Orientations"}),t.addBinding(i.supports,"val",{label:"Supports"}),t.addBinding(i.loads,"val",{label:"Loads"}),t.addBinding(i.deformedShape,"val",{label:"Deformed shape"}),t.addBinding(i.elementResults,"val",{options:{none:"none",normal:"normal",shearY:"shearY",shearZ:"shearZ",torsion:"torsion",bendingY:"bendingY",bendingZ:"bendingZ"},label:"Element results"}),t.addBinding(i.nodeResults,"val",{options:{none:"none",deformation:"deformation",reaction:"reaction"},label:"Node results"})}function zS(i){const t={elasticities:new Map,areas:new Map,loads:new Map,supports:new Map,momentOfInertiaZs:new Map,momentOfInertiaYs:new Map,shearModuluses:new Map,torsionalConstants:new Map,distributedLoads:new Map};return i.forEach(e=>{"area"in e&&t.areas.set(e.element,e.area),"elasticity"in e&&t.elasticities.set(e.element,e.elasticity),"load"in e&&t.loads.set(e.node,e.load),"support"in e&&t.supports.set(e.node,e.support),"momentOfInertiaZ"in e&&t.momentOfInertiaZs.set(e.element,e.momentOfInertiaZ),"momentOfInertiaY"in e&&t.momentOfInertiaYs.set(e.element,e.momentOfInertiaY),"torsionalConstant"in e&&t.torsionalConstants.set(e.element,e.torsionalConstant),"shearModulus"in e&&t.shearModuluses.set(e.element,e.shearModulus),"distributedLoad"in e&&t.distributedLoads.set(e.element,e.distributedLoad)}),t}function HS(i){var e;const t={normal:new Map,shearY:new Map,shearZ:new Map,torsion:new Map,bendingY:new Map,bendingZ:new Map,deformation:new Map,position:new Map,reaction:new Map};return(e=i.default)==null||e.forEach(n=>{"normal"in n&&t.normal.set(n.element,n.normal),"shearY"in n&&t.shearY.set(n.element,n.shearY),"shearZ"in n&&t.shearZ.set(n.element,n.shearZ),"torsion"in n&&t.torsion.set(n.element,n.torsion),"bendingY"in n&&t.bendingY.set(n.element,n.bendingY),"bendingZ"in n&&t.bendingZ.set(n.element,n.bendingZ),"deformation"in n&&t.deformation.set(n.node,n.deformation),"reaction"in n&&t.reaction.set(n.node,n.reaction)}),Object.entries(i).forEach(([n,r])=>{if(!isNaN(Number(n))){const s=Number(n);let o=new Map;r.forEach(l=>{"position"in l&&o.set(l.node,l.position)});let a=[];for(let l=0;l<r.length;l++)a.push(o.get(l));t.position.set(s,a)}}),t}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zr=globalThis,Do=Zr.trustedTypes,uu=Do?Do.createPolicy("lit-html",{createHTML:i=>i}):void 0,wp="$lit$",Yn=`lit$${Math.random().toFixed(9).slice(2)}$`,Mp="?"+Yn,GS=`<${Mp}>`,Di=document,us=()=>Di.createComment(""),ds=i=>i===null||typeof i!="object"&&typeof i!="function",Sp=Array.isArray,WS=i=>Sp(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",za=`[ 	
\f\r]`,Hr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,du=/-->/g,pu=/>/g,vi=RegExp(`>|${za}(?:([^\\s"'>=/]+)(${za}*=${za}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),fu=/'/g,mu=/"/g,Ep=/^(?:script|style|textarea|title)$/i,XS=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),Gr=XS(1),ps=Symbol.for("lit-noChange"),_e=Symbol.for("lit-nothing"),vu=new WeakMap,Mi=Di.createTreeWalker(Di,129);function Tp(i,t){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return uu!==void 0?uu.createHTML(t):t}const $S=(i,t)=>{const e=i.length-1,n=[];let r,s=t===2?"<svg>":"",o=Hr;for(let a=0;a<e;a++){const l=i[a];let c,h,u=-1,d=0;for(;d<l.length&&(o.lastIndex=d,h=o.exec(l),h!==null);)d=o.lastIndex,o===Hr?h[1]==="!--"?o=du:h[1]!==void 0?o=pu:h[2]!==void 0?(Ep.test(h[2])&&(r=RegExp("</"+h[2],"g")),o=vi):h[3]!==void 0&&(o=vi):o===vi?h[0]===">"?(o=r??Hr,u=-1):h[1]===void 0?u=-2:(u=o.lastIndex-h[2].length,c=h[1],o=h[3]===void 0?vi:h[3]==='"'?mu:fu):o===mu||o===fu?o=vi:o===du||o===pu?o=Hr:(o=vi,r=void 0);const p=o===vi&&i[a+1].startsWith("/>")?" ":"";s+=o===Hr?l+GS:u>=0?(n.push(c),l.slice(0,u)+wp+l.slice(u)+Yn+p):l+Yn+(u===-2?a:p)}return[Tp(i,s+(i[e]||"<?>")+(t===2?"</svg>":"")),n]};class fs{constructor({strings:t,_$litType$:e},n){let r;this.parts=[];let s=0,o=0;const a=t.length-1,l=this.parts,[c,h]=$S(t,e);if(this.el=fs.createElement(c,n),Mi.currentNode=this.el.content,e===2){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(r=Mi.nextNode())!==null&&l.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(const u of r.getAttributeNames())if(u.endsWith(wp)){const d=h[o++],p=r.getAttribute(u).split(Yn),_=/([.?@])?(.*)/.exec(d);l.push({type:1,index:s,name:_[2],strings:p,ctor:_[1]==="."?qS:_[1]==="?"?KS:_[1]==="@"?jS:Wo}),r.removeAttribute(u)}else u.startsWith(Yn)&&(l.push({type:6,index:s}),r.removeAttribute(u));if(Ep.test(r.tagName)){const u=r.textContent.split(Yn),d=u.length-1;if(d>0){r.textContent=Do?Do.emptyScript:"";for(let p=0;p<d;p++)r.append(u[p],us()),Mi.nextNode(),l.push({type:2,index:++s});r.append(u[d],us())}}}else if(r.nodeType===8)if(r.data===Mp)l.push({type:2,index:s});else{let u=-1;for(;(u=r.data.indexOf(Yn,u+1))!==-1;)l.push({type:7,index:s}),u+=Yn.length-1}s++}}static createElement(t,e){const n=Di.createElement("template");return n.innerHTML=t,n}}function Mr(i,t,e=i,n){var o,a;if(t===ps)return t;let r=n!==void 0?(o=e._$Co)==null?void 0:o[n]:e._$Cl;const s=ds(t)?void 0:t._$litDirective$;return(r==null?void 0:r.constructor)!==s&&((a=r==null?void 0:r._$AO)==null||a.call(r,!1),s===void 0?r=void 0:(r=new s(i),r._$AT(i,e,n)),n!==void 0?(e._$Co??(e._$Co=[]))[n]=r:e._$Cl=r),r!==void 0&&(t=Mr(i,r._$AS(i,t.values),r,n)),t}class YS{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:n}=this._$AD,r=((t==null?void 0:t.creationScope)??Di).importNode(e,!0);Mi.currentNode=r;let s=Mi.nextNode(),o=0,a=0,l=n[0];for(;l!==void 0;){if(o===l.index){let c;l.type===2?c=new Cs(s,s.nextSibling,this,t):l.type===1?c=new l.ctor(s,l.name,l.strings,this,t):l.type===6&&(c=new ZS(s,this,t)),this._$AV.push(c),l=n[++a]}o!==(l==null?void 0:l.index)&&(s=Mi.nextNode(),o++)}return Mi.currentNode=Di,r}p(t){let e=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}}class Cs{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,n,r){this.type=2,this._$AH=_e,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Mr(this,t,e),ds(t)?t===_e||t==null||t===""?(this._$AH!==_e&&this._$AR(),this._$AH=_e):t!==this._$AH&&t!==ps&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):WS(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==_e&&ds(this._$AH)?this._$AA.nextSibling.data=t:this.T(Di.createTextNode(t)),this._$AH=t}$(t){var s;const{values:e,_$litType$:n}=t,r=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=fs.createElement(Tp(n.h,n.h[0]),this.options)),n);if(((s=this._$AH)==null?void 0:s._$AD)===r)this._$AH.p(e);else{const o=new YS(r,this),a=o.u(this.options);o.p(e),this.T(a),this._$AH=o}}_$AC(t){let e=vu.get(t.strings);return e===void 0&&vu.set(t.strings,e=new fs(t)),e}k(t){Sp(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let n,r=0;for(const s of t)r===e.length?e.push(n=new Cs(this.S(us()),this.S(us()),this,this.options)):n=e[r],n._$AI(s),r++;r<e.length&&(this._$AR(n&&n._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var n;for((n=this._$AP)==null?void 0:n.call(this,!1,!0,e);t&&t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Wo{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,n,r,s){this.type=1,this._$AH=_e,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=_e}_$AI(t,e=this,n,r){const s=this.strings;let o=!1;if(s===void 0)t=Mr(this,t,e,0),o=!ds(t)||t!==this._$AH&&t!==ps,o&&(this._$AH=t);else{const a=t;let l,c;for(t=s[0],l=0;l<s.length-1;l++)c=Mr(this,a[n+l],e,l),c===ps&&(c=this._$AH[l]),o||(o=!ds(c)||c!==this._$AH[l]),c===_e?t=_e:t!==_e&&(t+=(c??"")+s[l+1]),this._$AH[l]=c}o&&!r&&this.j(t)}j(t){t===_e?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class qS extends Wo{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===_e?void 0:t}}class KS extends Wo{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==_e)}}class jS extends Wo{constructor(t,e,n,r,s){super(t,e,n,r,s),this.type=5}_$AI(t,e=this){if((t=Mr(this,t,e,0)??_e)===ps)return;const n=this._$AH,r=t===_e&&n!==_e||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,s=t!==_e&&(n===_e||r);r&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class ZS{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Mr(this,t)}}const Ha=Zr.litHtmlPolyfillSupport;Ha==null||Ha(fs,Cs),(Zr.litHtmlVersions??(Zr.litHtmlVersions=[])).push("3.1.3");const _u=(i,t,e)=>{const n=(e==null?void 0:e.renderBefore)??t;let r=n._$litPart$;if(r===void 0){const s=(e==null?void 0:e.renderBefore)??null;n._$litPart$=r=new Cs(t.insertBefore(us(),s),s,void 0,e??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const JS=i=>i.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const QS={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},tE=i=>(...t)=>({_$litDirective$:i,values:t});class eE{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,n){this._$Ct=t,this._$AM=e,this._$Ci=n}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jr=(i,t)=>{var n;const e=i._$AN;if(e===void 0)return!1;for(const r of e)(n=r._$AO)==null||n.call(r,t,!1),Jr(r,t);return!0},Io=i=>{let t,e;do{if((t=i._$AM)===void 0)break;e=t._$AN,e.delete(i),i=t}while((e==null?void 0:e.size)===0)},Ap=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),rE(t)}};function nE(i){this._$AN!==void 0?(Io(this),this._$AM=i,Ap(this)):this._$AM=i}function iE(i,t=!1,e=0){const n=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(t)if(Array.isArray(n))for(let s=e;s<n.length;s++)Jr(n[s],!1),Io(n[s]);else n!=null&&(Jr(n,!1),Io(n));else Jr(this,i)}const rE=i=>{i.type==QS.CHILD&&(i._$AP??(i._$AP=iE),i._$AQ??(i._$AQ=nE))};class sE extends eE{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,n){super._$AT(t,e,n),Ap(this),this.isConnected=t._$AU}_$AO(t,e=!0){var n,r;t!==this.isConnected&&(this.isConnected=t,t?(n=this.reconnected)==null||n.call(this):(r=this.disconnected)==null||r.call(this)),e&&(Jr(this,t),Io(this))}setValue(t){if(JS(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gu=()=>new oE;class oE{}const Ga=new WeakMap,xu=tE(class extends sE{render(i){return _e}update(i,[t]){var n;const e=t!==this.Y;return e&&this.Y!==void 0&&this.rt(void 0),(e||this.lt!==this.ct)&&(this.Y=t,this.ht=(n=i.options)==null?void 0:n.host,this.rt(this.ct=i.element)),_e}rt(i){if(typeof this.Y=="function"){const t=this.ht??globalThis;let e=Ga.get(t);e===void 0&&(e=new WeakMap,Ga.set(t,e)),e.get(this.Y)!==void 0&&this.Y.call(this.ht,void 0),e.set(this.Y,i),i!==void 0&&this.Y.call(this.ht,i)}else this.Y.value=i}get lt(){var i,t;return typeof this.Y=="function"?(i=Ga.get(this.ht??globalThis))==null?void 0:i.get(this.Y):(t=this.Y)==null?void 0:t.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),aE=(i,t)=>{let e=xt.state(0),n=gu(),r=gu();const s=new Map;i.forEach(d=>{t.val.designInputs.forEach(p=>{d.name.slice(0,-6)in p&&s.set(p.element,d)})});const o=Gr`<div class="topBar">
    <a @click=${h} href="#report">Report</a>
  </div>`,a=Gr` <select @change=${u}>
    ${Array.from(s.keys()).map(d=>Gr`<option value="${d}">element ${d}</option>`)}
  </select>`,l=Gr`<dialog ref=${xu(n)}>
    <div class="dialog-header">
      <span class="close" @click=${c}>&times;</span>
      ${a}
    </div>
    <div class="dialog-body" ref=${xu(r)} />
  </dialog>`;_u(Gr`${o}${l}`,document.body);function c(){var d;(d=n.value)==null||d.close()}function h(){var d;(d=n.value)==null||d.show()}function u(d){e.val=Number(d.target.value)}xt.derive(()=>{r.value&&_u(s.get(e.val)(t.val.designInputs.get(e.val),t.val.designOutputs.get(e.val)),r.value)})};function bu(i){const t=new Map;return i.forEach(e=>t.set(e.element,e)),t}function hE({parameters:i,onParameterChange:t,settings:e,reports:n}){const r=t==null?void 0:t(i??{}),s=xt.state(yu(r)),o={gridSize:xt.state((e==null?void 0:e.gridSize)??20),displayScale:xt.state((e==null?void 0:e.displayScale)??1),nodes:xt.state((e==null?void 0:e.nodes)??!0),elements:xt.state((e==null?void 0:e.elements)??!0),nodesIndexes:xt.state((e==null?void 0:e.nodesIndexes)??!1),elementsIndexes:xt.state((e==null?void 0:e.elementsIndexes)??!1),orientations:xt.state((e==null?void 0:e.orientations)??!1),supports:xt.state((e==null?void 0:e.supports)??!0),loads:xt.state((e==null?void 0:e.loads)??!0),deformedShape:xt.state((e==null?void 0:e.deformedShape)??!1),elementResults:xt.state((e==null?void 0:e.elementResults)??"none"),nodeResults:xt.state((e==null?void 0:e.nodeResults)??"none"),dynamic:xt.state((e==null?void 0:e.dynamic)??!1),dynamicSettings:xt.state((e==null?void 0:e.dynamicSettings)??{time:1,timeStep:1})};vb(s,o),VS(o),e!=null&&e.dynamic&&kS(s,o),n!=null&&n.length&&aE(n,s),i&&t&&FS(i,a=>{i[a.target.key].value=a.value,s.val=yu(t(i))})}const yu=i=>({nodes:(i==null?void 0:i.nodes)??[],elements:(i==null?void 0:i.elements)??[],analysisInputs:zS((i==null?void 0:i.analysisInputs)??[]),analysisOutputs:HS((i==null?void 0:i.analysisOutputs)??{default:[]}),designInputs:bu((i==null?void 0:i.designInputs)??[]),designOutputs:bu((i==null?void 0:i.designOutputs)??[])});export{hE as a,gd as g};
