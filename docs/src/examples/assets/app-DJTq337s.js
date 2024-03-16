var np=Object.defineProperty;var ip=(n,t,e)=>t in n?np(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var re=(n,t,e)=>(ip(n,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();let Yn=Object.getPrototypeOf,eo,en,xi,Zu={isConnected:1},rp=1e3,_s,Il={},sp=Yn(Zu),Ju=Yn(Yn),Qu=(n,t,e,i)=>(n??(setTimeout(e,i),new Set)).add(t),th=(n,t,e)=>{let i=en;en=t;try{return n(e)}catch(r){return console.error(r),e}finally{en=i}},no=n=>n.filter(t=>{var e;return(e=t._dom)==null?void 0:e.isConnected}),eh=n=>_s=Qu(_s,n,()=>{for(let t of _s)t._bindings=no(t._bindings),t._listeners=no(t._listeners);_s=null},rp),io={get val(){var n;return(n=en==null?void 0:en._getters)==null||n.add(this),this._val},get oldVal(){var n;return(n=en==null?void 0:en._getters)==null||n.add(this),this._oldVal},set val(n){var t;if((t=en==null?void 0:en._setters)==null||t.add(this),n!==this._val){this._val=n;let e=[...this._listeners=no(this._listeners)];for(let i of e)Xa(i.f,i.s,i._dom),i._dom=null;this._bindings.length?eo=Qu(eo,this,ap):this._oldVal=n}}},nh=n=>({__proto__:io,_val:n,_oldVal:n,_bindings:[],_listeners:[]}),Wr=(n,t)=>{let e={_getters:new Set,_setters:new Set},i={f:n},r=xi;xi=[];let s=th(n,e,t);s=(s??document).nodeType?s:new Text(s);for(let o of e._getters)e._setters.has(o)||(eh(o),o._bindings.push(i));for(let o of xi)o._dom=s;return xi=r,i._dom=s},Xa=(n,t=nh(),e)=>{let i={_getters:new Set,_setters:new Set},r={f:n,s:t};r._dom=e??(xi==null?void 0:xi.push(r))??Zu,t.val=th(n,i,t._val);for(let s of i._getters)i._setters.has(s)||(eh(s),s._listeners.push(r));return t},ih=(n,...t)=>{for(let e of t.flat(1/0)){let i=Yn(e??0),r=i===io?Wr(()=>e.val):i===Ju?Wr(e):e;r!=null&&n.append(r)}return n},rh=(n,t,...e)=>{var o;let[i,...r]=Yn(e[0]??0)===sp?e:[{},...e],s=n?document.createElementNS(n,t):document.createElement(t);for(let[a,l]of Object.entries(i)){let c=v=>v?Object.getOwnPropertyDescriptor(v,a)??c(Yn(v)):null,u=t+","+a,h=Il[u]??(Il[u]=((o=c(Yn(s)))==null?void 0:o.set)??0),d=a.startsWith("on")?(v,x)=>{let f=a.slice(2);s.removeEventListener(f,x),s.addEventListener(f,v)}:h?h.bind(s):s.setAttribute.bind(s,a),m=Yn(l??0);a.startsWith("on")||m===Ju&&(l=Xa(l),m=io),m===io?Wr(()=>(d(l.val,l._oldVal),s)):d(l)}return ih(s,...r)},Ul=n=>({get:(t,e)=>rh.bind(null,n,e)}),op=new Proxy(n=>new Proxy(rh,Ul(n)),Ul()),sh=(n,t)=>t?t!==n&&n.replaceWith(t):n.remove(),ap=()=>{let n=[...eo].filter(t=>t._val!==t._oldVal);eo=null;for(let t of new Set(n.flatMap(e=>e._bindings=no(e._bindings))))sh(t._dom,Wr(t.f,t._dom)),t._dom=null;for(let t of n)t._oldVal=t._val},lp=(n,t)=>sh(n,Wr(t,n));const kt={add:ih,tags:op,state:nh,derive:Xa,hydrate:lp};/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qa="162",Ni={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Oi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},cp=0,Nl=1,up=2,oh=1,hp=2,Cn=3,ei=0,We=1,Ke=2,$n=0,lr=1,Ol=2,Fl=3,Bl=4,dp=5,_i=100,pp=101,fp=102,kl=103,Vl=104,mp=200,vp=201,_p=202,gp=203,Ma=204,Sa=205,xp=206,bp=207,wp=208,yp=209,Ep=210,Mp=211,Sp=212,Tp=213,Cp=214,Ap=0,Pp=1,Rp=2,ro=3,Lp=4,Dp=5,Ip=6,Up=7,ah=0,Np=1,Op=2,Zn=0,Fp=1,Bp=2,kp=3,Vp=4,zp=5,Hp=6,Gp=7,lh=300,fr=301,mr=302,Ta=303,Ca=304,go=306,Aa=1e3,ln=1001,Pa=1002,Ne=1003,zl=1004,Tr=1005,ze=1006,Do=1007,bi=1008,Jn=1009,Wp=1010,Xp=1011,Ya=1012,ch=1013,jn=1014,An=1015,Xr=1016,uh=1017,hh=1018,wi=1020,qp=1021,cn=1023,Yp=1024,jp=1025,yi=1026,vr=1027,Kp=1028,dh=1029,$p=1030,ph=1031,fh=1033,Io=33776,Uo=33777,No=33778,Oo=33779,Hl=35840,Gl=35841,Wl=35842,Xl=35843,mh=36196,ql=37492,Yl=37496,jl=37808,Kl=37809,$l=37810,Zl=37811,Jl=37812,Ql=37813,tc=37814,ec=37815,nc=37816,ic=37817,rc=37818,sc=37819,oc=37820,ac=37821,Fo=36492,lc=36494,cc=36495,Zp=36283,uc=36284,hc=36285,dc=36286,Jp=3200,Qp=3201,tf=0,ef=1,qn="",pn="srgb",si="srgb-linear",ja="display-p3",xo="display-p3-linear",so="linear",se="srgb",oo="rec709",ao="p3",Fi=7680,pc=519,nf=512,rf=513,sf=514,vh=515,of=516,af=517,lf=518,cf=519,Ra=35044,fc="300 es",La=1035,Pn=2e3,lo=2001;class Li{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let mc=1234567;const Br=Math.PI/180,qr=180/Math.PI;function vn(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]).toLowerCase()}function Te(n,t,e){return Math.max(t,Math.min(e,n))}function Ka(n,t){return(n%t+t)%t}function uf(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function hf(n,t,e){return n!==t?(e-n)/(t-n):0}function kr(n,t,e){return(1-e)*n+e*t}function df(n,t,e,i){return kr(n,t,1-Math.exp(-e*i))}function pf(n,t=1){return t-Math.abs(Ka(n,t*2)-t)}function ff(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function mf(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function vf(n,t){return n+Math.floor(Math.random()*(t-n+1))}function _f(n,t){return n+Math.random()*(t-n)}function gf(n){return n*(.5-Math.random())}function xf(n){n!==void 0&&(mc=n);let t=mc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function bf(n){return n*Br}function wf(n){return n*qr}function Da(n){return(n&n-1)===0&&n!==0}function yf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function co(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Ef(n,t,e,i,r){const s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+i)/2),u=o((t+i)/2),h=s((t-i)/2),d=o((t-i)/2),m=s((i-t)/2),v=o((i-t)/2);switch(r){case"XYX":n.set(a*u,l*h,l*d,a*c);break;case"YZY":n.set(l*d,a*u,l*h,a*c);break;case"ZXZ":n.set(l*h,l*d,a*u,a*c);break;case"XZX":n.set(a*u,l*v,l*m,a*c);break;case"YXY":n.set(l*m,a*u,l*v,a*c);break;case"ZYZ":n.set(l*v,l*m,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function un(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Jt(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Mf={DEG2RAD:Br,RAD2DEG:qr,generateUUID:vn,clamp:Te,euclideanModulo:Ka,mapLinear:uf,inverseLerp:hf,lerp:kr,damp:df,pingpong:pf,smoothstep:ff,smootherstep:mf,randInt:vf,randFloat:_f,randFloatSpread:gf,seededRandom:xf,degToRad:bf,radToDeg:wf,isPowerOfTwo:Da,ceilPowerOfTwo:yf,floorPowerOfTwo:co,setQuaternionFromProperEuler:Ef,normalize:Jt,denormalize:un};class lt{constructor(t=0,e=0){lt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Lt{constructor(t,e,i,r,s,o,a,l,c){Lt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c)}set(t,e,i,r,s,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=e,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],d=i[2],m=i[5],v=i[8],x=r[0],f=r[3],p=r[6],E=r[1],_=r[4],M=r[7],D=r[2],R=r[5],C=r[8];return s[0]=o*x+a*E+l*D,s[3]=o*f+a*_+l*R,s[6]=o*p+a*M+l*C,s[1]=c*x+u*E+h*D,s[4]=c*f+u*_+h*R,s[7]=c*p+u*M+h*C,s[2]=d*x+m*E+v*D,s[5]=d*f+m*_+v*R,s[8]=d*p+m*M+v*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,d=a*l-u*s,m=c*s-o*l,v=e*h+i*d+r*m;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/v;return t[0]=h*x,t[1]=(r*c-u*i)*x,t[2]=(a*i-r*o)*x,t[3]=d*x,t[4]=(u*e-r*l)*x,t[5]=(r*s-a*e)*x,t[6]=m*x,t[7]=(i*l-c*e)*x,t[8]=(o*e-i*s)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Bo.makeScale(t,e)),this}rotate(t){return this.premultiply(Bo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Bo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Bo=new Lt;function _h(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function uo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Sf(){const n=uo("canvas");return n.style.display="block",n}const vc={};function gh(n){n in vc||(vc[n]=!0,console.warn(n))}const _c=new Lt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),gc=new Lt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),gs={[si]:{transfer:so,primaries:oo,toReference:n=>n,fromReference:n=>n},[pn]:{transfer:se,primaries:oo,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[xo]:{transfer:so,primaries:ao,toReference:n=>n.applyMatrix3(gc),fromReference:n=>n.applyMatrix3(_c)},[ja]:{transfer:se,primaries:ao,toReference:n=>n.convertSRGBToLinear().applyMatrix3(gc),fromReference:n=>n.applyMatrix3(_c).convertLinearToSRGB()}},Tf=new Set([si,xo]),Qt={enabled:!0,_workingColorSpace:si,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Tf.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;const i=gs[t].toReference,r=gs[e].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return gs[n].primaries},getTransfer:function(n){return n===qn?so:gs[n].transfer}};function cr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ko(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Bi;class xh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Bi===void 0&&(Bi=uo("canvas")),Bi.width=t.width,Bi.height=t.height;const i=Bi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Bi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=uo("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=cr(s[o]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(cr(e[i]/255)*255):e[i]=cr(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Cf=0;class bh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=vn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Vo(r[o].image)):s.push(Vo(r[o]))}else s=Vo(r);i.url=s}return e||(t.images[this.uuid]=i),i}}function Vo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?xh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Af=0;class Be extends Li{constructor(t=Be.DEFAULT_IMAGE,e=Be.DEFAULT_MAPPING,i=ln,r=ln,s=ze,o=bi,a=cn,l=Jn,c=Be.DEFAULT_ANISOTROPY,u=qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Af++}),this.uuid=vn(),this.name="",this.source=new bh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new lt(0,0),this.repeat=new lt(1,1),this.center=new lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Lt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==lh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Aa:t.x=t.x-Math.floor(t.x);break;case ln:t.x=t.x<0?0:1;break;case Pa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Aa:t.y=t.y-Math.floor(t.y);break;case ln:t.y=t.y<0?0:1;break;case Pa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}}Be.DEFAULT_IMAGE=null;Be.DEFAULT_MAPPING=lh;Be.DEFAULT_ANISOTROPY=1;class Ae{constructor(t=0,e=0,i=0,r=1){Ae.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,s;const l=t.elements,c=l[0],u=l[4],h=l[8],d=l[1],m=l[5],v=l[9],x=l[2],f=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(v-f)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(v+f)<.1&&Math.abs(c+m+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(c+1)/2,M=(m+1)/2,D=(p+1)/2,R=(u+d)/4,C=(h+x)/4,O=(v+f)/4;return _>M&&_>D?_<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(_),r=R/i,s=C/i):M>D?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=R/r,s=O/r):D<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(D),i=C/s,r=O/s),this.set(i,r,s,e),this}let E=Math.sqrt((f-v)*(f-v)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(E)<.001&&(E=1),this.x=(f-v)/E,this.y=(h-x)/E,this.z=(d-u)/E,this.w=Math.acos((c+m+p-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Pf extends Li{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ae(0,0,t,e),this.scissorTest=!1,this.viewport=new Ae(0,0,t,e);const r={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ze,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},i);const s=new Be(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new bh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Si extends Pf{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class wh extends Be{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Ne,this.minFilter=Ne,this.wrapR=ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rf extends Be{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=Ne,this.minFilter=Ne,this.wrapR=ln,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ti{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3];const d=s[o+0],m=s[o+1],v=s[o+2],x=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=d,t[e+1]=m,t[e+2]=v,t[e+3]=x;return}if(h!==x||l!==d||c!==m||u!==v){let f=1-a;const p=l*d+c*m+u*v+h*x,E=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const D=Math.sqrt(_),R=Math.atan2(D,p*E);f=Math.sin(f*R)/D,a=Math.sin(a*R)/D}const M=a*E;if(l=l*f+d*M,c=c*f+m*M,u=u*f+v*M,h=h*f+x*M,f===1-a){const D=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=D,c*=D,u*=D,h*=D}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[o],d=s[o+1],m=s[o+2],v=s[o+3];return t[e]=a*v+u*h+l*m-c*d,t[e+1]=l*v+u*d+c*h-a*m,t[e+2]=c*v+u*m+a*d-l*h,t[e+3]=u*v-a*h-l*d-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),h=a(s/2),d=l(i/2),m=l(r/2),v=l(s/2);switch(o){case"XYZ":this._x=d*u*h+c*m*v,this._y=c*m*h-d*u*v,this._z=c*u*v+d*m*h,this._w=c*u*h-d*m*v;break;case"YXZ":this._x=d*u*h+c*m*v,this._y=c*m*h-d*u*v,this._z=c*u*v-d*m*h,this._w=c*u*h+d*m*v;break;case"ZXY":this._x=d*u*h-c*m*v,this._y=c*m*h+d*u*v,this._z=c*u*v+d*m*h,this._w=c*u*h-d*m*v;break;case"ZYX":this._x=d*u*h-c*m*v,this._y=c*m*h+d*u*v,this._z=c*u*v-d*m*h,this._w=c*u*h+d*m*v;break;case"YZX":this._x=d*u*h+c*m*v,this._y=c*m*h+d*u*v,this._z=c*u*v-d*m*h,this._w=c*u*h-d*m*v;break;case"XZY":this._x=d*u*h-c*m*v,this._y=c*m*h-d*u*v,this._z=c*u*v+d*m*h,this._w=c*u*h+d*m*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],d=i+a+h;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(u-l)*m,this._y=(s-c)*m,this._z=(o-r)*m}else if(i>a&&i>h){const m=2*Math.sqrt(1+i-a-h);this._w=(u-l)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(s+c)/m}else if(a>h){const m=2*Math.sqrt(1+a-i-h);this._w=(s-c)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+h-i-a);this._w=(o-r)/m,this._x=(s+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Te(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-e;return this._w=m*o+e*this._w,this._x=m*i+e*this._x,this._y=m*r+e*this._y,this._z=m*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,d=Math.sin(e*u)/c;return this._w=o*h+this._w*d,this._x=i*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(t=0,e=0,i=0){A.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(xc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(xc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*r,this.y=s[1]*e+s[4]*i+s[7]*r,this.z=s[2]*e+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*i),u=2*(a*e-s*r),h=2*(s*i-o*e);return this.x=e+l*c+o*h-a*u,this.y=i+l*u+a*c-s*h,this.z=r+l*h+s*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*r,this.y=s[1]*e+s[5]*i+s[9]*r,this.z=s[2]*e+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return zo.copy(this).projectOnVector(t),this.sub(zo)}reflect(t){return this.sub(zo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zo=new A,xc=new Ti;class ns{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(sn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(sn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=sn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,sn):sn.fromBufferAttribute(s,o),sn.applyMatrix4(t.matrixWorld),this.expandByPoint(sn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),xs.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),xs.copy(i.boundingBox)),xs.applyMatrix4(t.matrixWorld),this.union(xs)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,sn),sn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Cr),bs.subVectors(this.max,Cr),ki.subVectors(t.a,Cr),Vi.subVectors(t.b,Cr),zi.subVectors(t.c,Cr),On.subVectors(Vi,ki),Fn.subVectors(zi,Vi),ci.subVectors(ki,zi);let e=[0,-On.z,On.y,0,-Fn.z,Fn.y,0,-ci.z,ci.y,On.z,0,-On.x,Fn.z,0,-Fn.x,ci.z,0,-ci.x,-On.y,On.x,0,-Fn.y,Fn.x,0,-ci.y,ci.x,0];return!Ho(e,ki,Vi,zi,bs)||(e=[1,0,0,0,1,0,0,0,1],!Ho(e,ki,Vi,zi,bs))?!1:(ws.crossVectors(On,Fn),e=[ws.x,ws.y,ws.z],Ho(e,ki,Vi,zi,bs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,sn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(sn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(wn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const wn=[new A,new A,new A,new A,new A,new A,new A,new A],sn=new A,xs=new ns,ki=new A,Vi=new A,zi=new A,On=new A,Fn=new A,ci=new A,Cr=new A,bs=new A,ws=new A,ui=new A;function Ho(n,t,e,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){ui.fromArray(n,s);const a=r.x*Math.abs(ui.x)+r.y*Math.abs(ui.y)+r.z*Math.abs(ui.z),l=t.dot(ui),c=e.dot(ui),u=i.dot(ui);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Lf=new ns,Ar=new A,Go=new A;class is{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Lf.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ar.subVectors(t,this.center);const e=Ar.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(Ar,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Go.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ar.copy(t.center).add(Go)),this.expandByPoint(Ar.copy(t.center).sub(Go))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const yn=new A,Wo=new A,ys=new A,Bn=new A,Xo=new A,Es=new A,qo=new A;class bo{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,yn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=yn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(yn.copy(this.origin).addScaledVector(this.direction,e),yn.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){Wo.copy(t).add(e).multiplyScalar(.5),ys.copy(e).sub(t).normalize(),Bn.copy(this.origin).sub(Wo);const s=t.distanceTo(e)*.5,o=-this.direction.dot(ys),a=Bn.dot(this.direction),l=-Bn.dot(ys),c=Bn.lengthSq(),u=Math.abs(1-o*o);let h,d,m,v;if(u>0)if(h=o*l-a,d=o*a-l,v=s*u,h>=0)if(d>=-v)if(d<=v){const x=1/u;h*=x,d*=x,m=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=s,h=Math.max(0,-(o*d+a)),m=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(o*d+a)),m=-h*h+d*(d+2*l)+c;else d<=-v?(h=Math.max(0,-(-o*s+a)),d=h>0?-s:Math.min(Math.max(-s,-l),s),m=-h*h+d*(d+2*l)+c):d<=v?(h=0,d=Math.min(Math.max(-s,-l),s),m=d*(d+2*l)+c):(h=Math.max(0,-(o*s+a)),d=h>0?s:Math.min(Math.max(-s,-l),s),m=-h*h+d*(d+2*l)+c);else d=o>0?-s:s,h=Math.max(0,-(o*d+a)),m=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Wo).addScaledVector(ys,d),m}intersectSphere(t,e){yn.subVectors(t.center,this.origin);const i=yn.dot(this.direction),r=yn.dot(yn)-i*i,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(t.min.x-d.x)*c,r=(t.max.x-d.x)*c):(i=(t.max.x-d.x)*c,r=(t.min.x-d.x)*c),u>=0?(s=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(s=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(t.min.z-d.z)*h,l=(t.max.z-d.z)*h):(a=(t.max.z-d.z)*h,l=(t.min.z-d.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,yn)!==null}intersectTriangle(t,e,i,r,s){Xo.subVectors(e,t),Es.subVectors(i,t),qo.crossVectors(Xo,Es);let o=this.direction.dot(qo),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Bn.subVectors(this.origin,t);const l=a*this.direction.dot(Es.crossVectors(Bn,Es));if(l<0)return null;const c=a*this.direction.dot(Xo.cross(Bn));if(c<0||l+c>o)return null;const u=-a*Bn.dot(qo);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ae{constructor(t,e,i,r,s,o,a,l,c,u,h,d,m,v,x,f){ae.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,s,o,a,l,c,u,h,d,m,v,x,f)}set(t,e,i,r,s,o,a,l,c,u,h,d,m,v,x,f){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=m,p[7]=v,p[11]=x,p[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ae().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/Hi.setFromMatrixColumn(t,0).length(),s=1/Hi.setFromMatrixColumn(t,1).length(),o=1/Hi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const d=o*u,m=o*h,v=a*u,x=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=m+v*c,e[5]=d-x*c,e[9]=-a*l,e[2]=x-d*c,e[6]=v+m*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*u,m=l*h,v=c*u,x=c*h;e[0]=d+x*a,e[4]=v*a-m,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=m*a-v,e[6]=x+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*u,m=l*h,v=c*u,x=c*h;e[0]=d-x*a,e[4]=-o*h,e[8]=v+m*a,e[1]=m+v*a,e[5]=o*u,e[9]=x-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*u,m=o*h,v=a*u,x=a*h;e[0]=l*u,e[4]=v*c-m,e[8]=d*c+x,e[1]=l*h,e[5]=x*c+d,e[9]=m*c-v,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,m=o*c,v=a*l,x=a*c;e[0]=l*u,e[4]=x-d*h,e[8]=v*h+m,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=m*h+v,e[10]=d-x*h}else if(t.order==="XZY"){const d=o*l,m=o*c,v=a*l,x=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=d*h+x,e[5]=o*u,e[9]=m*h-v,e[2]=v*h-m,e[6]=a*u,e[10]=x*h+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Df,t,If)}lookAt(t,e,i){const r=this.elements;return Ye.subVectors(t,e),Ye.lengthSq()===0&&(Ye.z=1),Ye.normalize(),kn.crossVectors(i,Ye),kn.lengthSq()===0&&(Math.abs(i.z)===1?Ye.x+=1e-4:Ye.z+=1e-4,Ye.normalize(),kn.crossVectors(i,Ye)),kn.normalize(),Ms.crossVectors(Ye,kn),r[0]=kn.x,r[4]=Ms.x,r[8]=Ye.x,r[1]=kn.y,r[5]=Ms.y,r[9]=Ye.y,r[2]=kn.z,r[6]=Ms.z,r[10]=Ye.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],d=i[9],m=i[13],v=i[2],x=i[6],f=i[10],p=i[14],E=i[3],_=i[7],M=i[11],D=i[15],R=r[0],C=r[4],O=r[8],K=r[12],b=r[1],T=r[5],$=r[9],Z=r[13],L=r[2],G=r[6],V=r[10],Y=r[14],W=r[3],X=r[7],it=r[11],st=r[15];return s[0]=o*R+a*b+l*L+c*W,s[4]=o*C+a*T+l*G+c*X,s[8]=o*O+a*$+l*V+c*it,s[12]=o*K+a*Z+l*Y+c*st,s[1]=u*R+h*b+d*L+m*W,s[5]=u*C+h*T+d*G+m*X,s[9]=u*O+h*$+d*V+m*it,s[13]=u*K+h*Z+d*Y+m*st,s[2]=v*R+x*b+f*L+p*W,s[6]=v*C+x*T+f*G+p*X,s[10]=v*O+x*$+f*V+p*it,s[14]=v*K+x*Z+f*Y+p*st,s[3]=E*R+_*b+M*L+D*W,s[7]=E*C+_*T+M*G+D*X,s[11]=E*O+_*$+M*V+D*it,s[15]=E*K+_*Z+M*Y+D*st,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],d=t[10],m=t[14],v=t[3],x=t[7],f=t[11],p=t[15];return v*(+s*l*h-r*c*h-s*a*d+i*c*d+r*a*m-i*l*m)+x*(+e*l*m-e*c*d+s*o*d-r*o*m+r*c*u-s*l*u)+f*(+e*c*h-e*a*m-s*o*h+i*o*m+s*a*u-i*c*u)+p*(-r*a*u-e*l*h+e*a*d+r*o*h-i*o*d+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],d=t[10],m=t[11],v=t[12],x=t[13],f=t[14],p=t[15],E=h*f*c-x*d*c+x*l*m-a*f*m-h*l*p+a*d*p,_=v*d*c-u*f*c-v*l*m+o*f*m+u*l*p-o*d*p,M=u*x*c-v*h*c+v*a*m-o*x*m-u*a*p+o*h*p,D=v*h*l-u*x*l-v*a*d+o*x*d+u*a*f-o*h*f,R=e*E+i*_+r*M+s*D;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/R;return t[0]=E*C,t[1]=(x*d*s-h*f*s-x*r*m+i*f*m+h*r*p-i*d*p)*C,t[2]=(a*f*s-x*l*s+x*r*c-i*f*c-a*r*p+i*l*p)*C,t[3]=(h*l*s-a*d*s-h*r*c+i*d*c+a*r*m-i*l*m)*C,t[4]=_*C,t[5]=(u*f*s-v*d*s+v*r*m-e*f*m-u*r*p+e*d*p)*C,t[6]=(v*l*s-o*f*s-v*r*c+e*f*c+o*r*p-e*l*p)*C,t[7]=(o*d*s-u*l*s+u*r*c-e*d*c-o*r*m+e*l*m)*C,t[8]=M*C,t[9]=(v*h*s-u*x*s-v*i*m+e*x*m+u*i*p-e*h*p)*C,t[10]=(o*x*s-v*a*s+v*i*c-e*x*c-o*i*p+e*a*p)*C,t[11]=(u*a*s-o*h*s-u*i*c+e*h*c+o*i*m-e*a*m)*C,t[12]=D*C,t[13]=(u*x*r-v*h*r+v*i*d-e*x*d-u*i*f+e*h*f)*C,t[14]=(v*a*r-o*x*r-v*i*l+e*x*l+o*i*f-e*a*f)*C,t[15]=(o*h*r-u*a*r+u*i*l-e*h*l-o*i*d+e*a*d)*C,this}scale(t){const e=this.elements,i=t.x,r=t.y,s=t.z;return e[0]*=i,e[4]*=r,e[8]*=s,e[1]*=i,e[5]*=r,e[9]*=s,e[2]*=i,e[6]*=r,e[10]*=s,e[3]*=i,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),s=1-i,o=t.x,a=t.y,l=t.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,s,o){return this.set(1,i,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,u=o+o,h=a+a,d=s*c,m=s*u,v=s*h,x=o*u,f=o*h,p=a*h,E=l*c,_=l*u,M=l*h,D=i.x,R=i.y,C=i.z;return r[0]=(1-(x+p))*D,r[1]=(m+M)*D,r[2]=(v-_)*D,r[3]=0,r[4]=(m-M)*R,r[5]=(1-(d+p))*R,r[6]=(f+E)*R,r[7]=0,r[8]=(v+_)*C,r[9]=(f-E)*C,r[10]=(1-(d+x))*C,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let s=Hi.set(r[0],r[1],r[2]).length();const o=Hi.set(r[4],r[5],r[6]).length(),a=Hi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],on.copy(this);const c=1/s,u=1/o,h=1/a;return on.elements[0]*=c,on.elements[1]*=c,on.elements[2]*=c,on.elements[4]*=u,on.elements[5]*=u,on.elements[6]*=u,on.elements[8]*=h,on.elements[9]*=h,on.elements[10]*=h,e.setFromRotationMatrix(on),i.x=s,i.y=o,i.z=a,this}makePerspective(t,e,i,r,s,o,a=Pn){const l=this.elements,c=2*s/(e-t),u=2*s/(i-r),h=(e+t)/(e-t),d=(i+r)/(i-r);let m,v;if(a===Pn)m=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===lo)m=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,r,s,o,a=Pn){const l=this.elements,c=1/(e-t),u=1/(i-r),h=1/(o-s),d=(e+t)*c,m=(i+r)*u;let v,x;if(a===Pn)v=(o+s)*h,x=-2*h;else if(a===lo)v=s*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=x,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Hi=new A,on=new ae,Df=new A(0,0,0),If=new A(1,1,1),kn=new A,Ms=new A,Ye=new A,bc=new ae,wc=new Ti;class Dn{constructor(t=0,e=0,i=0,r=Dn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],m=r[10];switch(e){case"XYZ":this._y=Math.asin(Te(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Te(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Te(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Te(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Te(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return bc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(bc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return wc.setFromEuler(this),this.setFromQuaternion(wc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Dn.DEFAULT_ORDER="XYZ";class yh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Uf=0;const yc=new A,Gi=new Ti,En=new ae,Ss=new A,Pr=new A,Nf=new A,Of=new Ti,Ec=new A(1,0,0),Mc=new A(0,1,0),Sc=new A(0,0,1),Ff={type:"added"},Bf={type:"removed"},Yo={type:"childadded",child:null},jo={type:"childremoved",child:null};class Ce extends Li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Uf++}),this.uuid=vn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ce.DEFAULT_UP.clone();const t=new A,e=new Dn,i=new Ti,r=new A(1,1,1);function s(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ae},normalMatrix:{value:new Lt}}),this.matrix=new ae,this.matrixWorld=new ae,this.matrixAutoUpdate=Ce.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Gi.setFromAxisAngle(t,e),this.quaternion.multiply(Gi),this}rotateOnWorldAxis(t,e){return Gi.setFromAxisAngle(t,e),this.quaternion.premultiply(Gi),this}rotateX(t){return this.rotateOnAxis(Ec,t)}rotateY(t){return this.rotateOnAxis(Mc,t)}rotateZ(t){return this.rotateOnAxis(Sc,t)}translateOnAxis(t,e){return yc.copy(t).applyQuaternion(this.quaternion),this.position.add(yc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ec,t)}translateY(t){return this.translateOnAxis(Mc,t)}translateZ(t){return this.translateOnAxis(Sc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(En.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Ss.copy(t):Ss.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Pr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?En.lookAt(Pr,Ss,this.up):En.lookAt(Ss,Pr,this.up),this.quaternion.setFromRotationMatrix(En),r&&(En.extractRotation(r.matrixWorld),Gi.setFromRotationMatrix(En),this.quaternion.premultiply(Gi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Ff),Yo.child=t,this.dispatchEvent(Yo),Yo.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Bf),jo.child=t,this.dispatchEvent(jo),jo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),En.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),En.multiply(t.parent.matrixWorld)),t.applyMatrix4(En),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pr,t,Nf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pr,Of,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++){const s=e[i];(s.matrixWorldAutoUpdate===!0||t===!0)&&s.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),d=o(t.skeletons),m=o(t.animations),v=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),m.length>0&&(i.animations=m),v.length>0&&(i.nodes=v)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}Ce.DEFAULT_UP=new A(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const an=new A,Mn=new A,Ko=new A,Sn=new A,Wi=new A,Xi=new A,Tc=new A,$o=new A,Zo=new A,Jo=new A;class hn{constructor(t=new A,e=new A,i=new A){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),an.subVectors(t,e),r.cross(an);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,i,r,s){an.subVectors(r,e),Mn.subVectors(i,e),Ko.subVectors(t,e);const o=an.dot(an),a=an.dot(Mn),l=an.dot(Ko),c=Mn.dot(Mn),u=Mn.dot(Ko),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const d=1/h,m=(c*l-a*u)*d,v=(o*u-a*l)*d;return s.set(1-m-v,v,m)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,Sn)===null?!1:Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getInterpolation(t,e,i,r,s,o,a,l){return this.getBarycoord(t,e,i,r,Sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Sn.x),l.addScaledVector(o,Sn.y),l.addScaledVector(a,Sn.z),l)}static isFrontFacing(t,e,i,r){return an.subVectors(i,e),Mn.subVectors(t,e),an.cross(Mn).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return an.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),an.cross(Mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return hn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,s){return hn.getInterpolation(t,this.a,this.b,this.c,e,i,r,s)}containsPoint(t){return hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,s=this.c;let o,a;Wi.subVectors(r,i),Xi.subVectors(s,i),$o.subVectors(t,i);const l=Wi.dot($o),c=Xi.dot($o);if(l<=0&&c<=0)return e.copy(i);Zo.subVectors(t,r);const u=Wi.dot(Zo),h=Xi.dot(Zo);if(u>=0&&h<=u)return e.copy(r);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(Wi,o);Jo.subVectors(t,s);const m=Wi.dot(Jo),v=Xi.dot(Jo);if(v>=0&&m<=v)return e.copy(s);const x=m*c-l*v;if(x<=0&&c>=0&&v<=0)return a=c/(c-v),e.copy(i).addScaledVector(Xi,a);const f=u*v-m*h;if(f<=0&&h-u>=0&&m-v>=0)return Tc.subVectors(s,r),a=(h-u)/(h-u+(m-v)),e.copy(r).addScaledVector(Tc,a);const p=1/(f+x+d);return o=x*p,a=d*p,e.copy(i).addScaledVector(Wi,o).addScaledVector(Xi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Eh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vn={h:0,s:0,l:0},Ts={h:0,s:0,l:0};function Qo(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Xt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=pn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,r=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Qt.toWorkingColorSpace(this,r),this}setHSL(t,e,i,r=Qt.workingColorSpace){if(t=Ka(t,1),e=Te(e,0,1),i=Te(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,o=2*i-s;this.r=Qo(o,s,t+1/3),this.g=Qo(o,s,t),this.b=Qo(o,s,t-1/3)}return Qt.toWorkingColorSpace(this,r),this}setStyle(t,e=pn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=pn){const i=Eh[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=cr(t.r),this.g=cr(t.g),this.b=cr(t.b),this}copyLinearToSRGB(t){return this.r=ko(t.r),this.g=ko(t.g),this.b=ko(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=pn){return Qt.fromWorkingColorSpace(De.copy(this),t),Math.round(Te(De.r*255,0,255))*65536+Math.round(Te(De.g*255,0,255))*256+Math.round(Te(De.b*255,0,255))}getHexString(t=pn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.fromWorkingColorSpace(De.copy(this),e);const i=De.r,r=De.g,s=De.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=Qt.workingColorSpace){return Qt.fromWorkingColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=pn){Qt.fromWorkingColorSpace(De.copy(this),t);const e=De.r,i=De.g,r=De.b;return t!==pn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(Vn),this.setHSL(Vn.h+t,Vn.s+e,Vn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Vn),t.getHSL(Ts);const i=kr(Vn.h,Ts.h,e),r=kr(Vn.s,Ts.s,e),s=kr(Vn.l,Ts.l,e);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*r,this.g=s[1]*e+s[4]*i+s[7]*r,this.b=s[2]*e+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const De=new Xt;Xt.NAMES=Eh;let kf=0;class Di extends Li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:kf++}),this.uuid=vn(),this.name="",this.type="Material",this.blending=lr,this.side=ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ma,this.blendDst=Sa,this.blendEquation=_i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xt(0,0,0),this.blendAlpha=0,this.depthFunc=ro,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fi,this.stencilZFail=Fi,this.stencilZPass=Fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==lr&&(i.blending=this.blending),this.side!==ei&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ma&&(i.blendSrc=this.blendSrc),this.blendDst!==Sa&&(i.blendDst=this.blendDst),this.blendEquation!==_i&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ro&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==pc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Fi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Fi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Qn extends Di{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Dn,this.combine=ah,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ge=new A,Cs=new lt;class dn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Ra,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=An,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return gh("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Cs.fromBufferAttribute(this,e),Cs.applyMatrix3(t),this.setXY(e,Cs.x,Cs.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix3(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix4(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ge.fromBufferAttribute(this,e),ge.applyNormalMatrix(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ge.fromBufferAttribute(this,e),ge.transformDirection(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=un(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Jt(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=un(e,this.array)),e}setX(t,e){return this.normalized&&(e=Jt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=un(e,this.array)),e}setY(t,e){return this.normalized&&(e=Jt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=un(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Jt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=un(e,this.array)),e}setW(t,e){return this.normalized&&(e=Jt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Jt(e,this.array),i=Jt(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=Jt(e,this.array),i=Jt(i,this.array),r=Jt(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t*=this.itemSize,this.normalized&&(e=Jt(e,this.array),i=Jt(i,this.array),r=Jt(r,this.array),s=Jt(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ra&&(t.usage=this.usage),t}}class Mh extends dn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Sh extends dn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class me extends dn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Vf=0;const Qe=new ae,ta=new Ce,qi=new A,je=new ns,Rr=new ns,Se=new A;class _e extends Li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=vn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(_h(t)?Sh:Mh)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Lt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Qe.makeRotationFromQuaternion(t),this.applyMatrix4(Qe),this}rotateX(t){return Qe.makeRotationX(t),this.applyMatrix4(Qe),this}rotateY(t){return Qe.makeRotationY(t),this.applyMatrix4(Qe),this}rotateZ(t){return Qe.makeRotationZ(t),this.applyMatrix4(Qe),this}translate(t,e,i){return Qe.makeTranslation(t,e,i),this.applyMatrix4(Qe),this}scale(t,e,i){return Qe.makeScale(t,e,i),this.applyMatrix4(Qe),this}lookAt(t){return ta.lookAt(t),ta.updateMatrix(),this.applyMatrix4(ta.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qi).negate(),this.translate(qi.x,qi.y,qi.z),this}setFromPoints(t){const e=[];for(let i=0,r=t.length;i<r;i++){const s=t[i];e.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new me(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ns);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const s=e[i];je.setFromBufferAttribute(s),this.morphTargetsRelative?(Se.addVectors(this.boundingBox.min,je.min),this.boundingBox.expandByPoint(Se),Se.addVectors(this.boundingBox.max,je.max),this.boundingBox.expandByPoint(Se)):(this.boundingBox.expandByPoint(je.min),this.boundingBox.expandByPoint(je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new is);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){const i=this.boundingSphere.center;if(je.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];Rr.setFromBufferAttribute(a),this.morphTargetsRelative?(Se.addVectors(je.min,Rr.min),je.expandByPoint(Se),Se.addVectors(je.max,Rr.max),je.expandByPoint(Se)):(je.expandByPoint(Rr.min),je.expandByPoint(Rr.max))}je.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)Se.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(Se));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Se.fromBufferAttribute(a,c),l&&(qi.fromBufferAttribute(t,c),Se.add(qi)),r=Math.max(r,i.distanceToSquared(Se))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new dn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let O=0;O<i.count;O++)a[O]=new A,l[O]=new A;const c=new A,u=new A,h=new A,d=new lt,m=new lt,v=new lt,x=new A,f=new A;function p(O,K,b){c.fromBufferAttribute(i,O),u.fromBufferAttribute(i,K),h.fromBufferAttribute(i,b),d.fromBufferAttribute(s,O),m.fromBufferAttribute(s,K),v.fromBufferAttribute(s,b),u.sub(c),h.sub(c),m.sub(d),v.sub(d);const T=1/(m.x*v.y-v.x*m.y);isFinite(T)&&(x.copy(u).multiplyScalar(v.y).addScaledVector(h,-m.y).multiplyScalar(T),f.copy(h).multiplyScalar(m.x).addScaledVector(u,-v.x).multiplyScalar(T),a[O].add(x),a[K].add(x),a[b].add(x),l[O].add(f),l[K].add(f),l[b].add(f))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let O=0,K=E.length;O<K;++O){const b=E[O],T=b.start,$=b.count;for(let Z=T,L=T+$;Z<L;Z+=3)p(t.getX(Z+0),t.getX(Z+1),t.getX(Z+2))}const _=new A,M=new A,D=new A,R=new A;function C(O){D.fromBufferAttribute(r,O),R.copy(D);const K=a[O];_.copy(K),_.sub(D.multiplyScalar(D.dot(K))).normalize(),M.crossVectors(R,K);const T=M.dot(l[O])<0?-1:1;o.setXYZW(O,_.x,_.y,_.z,T)}for(let O=0,K=E.length;O<K;++O){const b=E[O],T=b.start,$=b.count;for(let Z=T,L=T+$;Z<L;Z+=3)C(t.getX(Z+0)),C(t.getX(Z+1)),C(t.getX(Z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new dn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,m=i.count;d<m;d++)i.setXYZ(d,0,0,0);const r=new A,s=new A,o=new A,a=new A,l=new A,c=new A,u=new A,h=new A;if(t)for(let d=0,m=t.count;d<m;d+=3){const v=t.getX(d+0),x=t.getX(d+1),f=t.getX(d+2);r.fromBufferAttribute(e,v),s.fromBufferAttribute(e,x),o.fromBufferAttribute(e,f),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(i,v),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,f),a.add(u),l.add(u),c.add(u),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(f,c.x,c.y,c.z)}else for(let d=0,m=e.count;d<m;d+=3)r.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Se.fromBufferAttribute(t,e),Se.normalize(),t.setXYZ(e,Se.x,Se.y,Se.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,d=new c.constructor(l.length*u);let m=0,v=0;for(let x=0,f=l.length;x<f;x++){a.isInterleavedBufferAttribute?m=l[x]*a.data.stride+a.offset:m=l[x]*u;for(let p=0;p<u;p++)d[v++]=c[m++]}return new dn(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new _e,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,i);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const d=c[u],m=t(d,i);l.push(m)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const m=c[h];u.push(m.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const r=t.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,m=h.length;d<m;d++)u.push(h[d].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Cc=new ae,hi=new bo,As=new is,Ac=new A,Yi=new A,ji=new A,Ki=new A,ea=new A,Ps=new A,Rs=new lt,Ls=new lt,Ds=new lt,Pc=new A,Rc=new A,Lc=new A,Is=new A,Us=new A;class Oe extends Ce{constructor(t=new _e,e=new Qn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){Ps.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(ea.fromBufferAttribute(h,t),o?Ps.addScaledVector(ea,u):Ps.addScaledVector(ea.sub(e),u))}e.add(Ps)}return e}raycast(t,e){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),As.copy(i.boundingSphere),As.applyMatrix4(s),hi.copy(t.ray).recast(t.near),!(As.containsPoint(hi.origin)===!1&&(hi.intersectSphere(As,Ac)===null||hi.origin.distanceToSquared(Ac)>(t.far-t.near)**2))&&(Cc.copy(s).invert(),hi.copy(t.ray).applyMatrix4(Cc),!(i.boundingBox!==null&&hi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,hi)))}_computeIntersections(t,e,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,m=s.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,x=d.length;v<x;v++){const f=d[v],p=o[f.materialIndex],E=Math.max(f.start,m.start),_=Math.min(a.count,Math.min(f.start+f.count,m.start+m.count));for(let M=E,D=_;M<D;M+=3){const R=a.getX(M),C=a.getX(M+1),O=a.getX(M+2);r=Ns(this,p,t,i,c,u,h,R,C,O),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=f.materialIndex,e.push(r))}}else{const v=Math.max(0,m.start),x=Math.min(a.count,m.start+m.count);for(let f=v,p=x;f<p;f+=3){const E=a.getX(f),_=a.getX(f+1),M=a.getX(f+2);r=Ns(this,o,t,i,c,u,h,E,_,M),r&&(r.faceIndex=Math.floor(f/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,x=d.length;v<x;v++){const f=d[v],p=o[f.materialIndex],E=Math.max(f.start,m.start),_=Math.min(l.count,Math.min(f.start+f.count,m.start+m.count));for(let M=E,D=_;M<D;M+=3){const R=M,C=M+1,O=M+2;r=Ns(this,p,t,i,c,u,h,R,C,O),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=f.materialIndex,e.push(r))}}else{const v=Math.max(0,m.start),x=Math.min(l.count,m.start+m.count);for(let f=v,p=x;f<p;f+=3){const E=f,_=f+1,M=f+2;r=Ns(this,o,t,i,c,u,h,E,_,M),r&&(r.faceIndex=Math.floor(f/3),e.push(r))}}}}function zf(n,t,e,i,r,s,o,a){let l;if(t.side===We?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,t.side===ei,a),l===null)return null;Us.copy(a),Us.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Us);return c<e.near||c>e.far?null:{distance:c,point:Us.clone(),object:n}}function Ns(n,t,e,i,r,s,o,a,l,c){n.getVertexPosition(a,Yi),n.getVertexPosition(l,ji),n.getVertexPosition(c,Ki);const u=zf(n,t,e,i,Yi,ji,Ki,Is);if(u){r&&(Rs.fromBufferAttribute(r,a),Ls.fromBufferAttribute(r,l),Ds.fromBufferAttribute(r,c),u.uv=hn.getInterpolation(Is,Yi,ji,Ki,Rs,Ls,Ds,new lt)),s&&(Rs.fromBufferAttribute(s,a),Ls.fromBufferAttribute(s,l),Ds.fromBufferAttribute(s,c),u.uv1=hn.getInterpolation(Is,Yi,ji,Ki,Rs,Ls,Ds,new lt)),o&&(Pc.fromBufferAttribute(o,a),Rc.fromBufferAttribute(o,l),Lc.fromBufferAttribute(o,c),u.normal=hn.getInterpolation(Is,Yi,ji,Ki,Pc,Rc,Lc,new A),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new A,materialIndex:0};hn.getNormal(Yi,ji,Ki,h.normal),u.face=h}return u}class xr extends _e{constructor(t=1,e=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let d=0,m=0;v("z","y","x",-1,-1,i,e,t,o,s,0),v("z","y","x",1,-1,i,e,-t,o,s,1),v("x","z","y",1,1,t,i,e,r,o,2),v("x","z","y",1,-1,t,i,-e,r,o,3),v("x","y","z",1,-1,t,e,i,r,s,4),v("x","y","z",-1,-1,t,e,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new me(c,3)),this.setAttribute("normal",new me(u,3)),this.setAttribute("uv",new me(h,2));function v(x,f,p,E,_,M,D,R,C,O,K){const b=M/C,T=D/O,$=M/2,Z=D/2,L=R/2,G=C+1,V=O+1;let Y=0,W=0;const X=new A;for(let it=0;it<V;it++){const st=it*T-Z;for(let pt=0;pt<G;pt++){const At=pt*b-$;X[x]=At*E,X[f]=st*_,X[p]=L,c.push(X.x,X.y,X.z),X[x]=0,X[f]=0,X[p]=R>0?1:-1,u.push(X.x,X.y,X.z),h.push(pt/C),h.push(1-it/O),Y+=1}}for(let it=0;it<O;it++)for(let st=0;st<C;st++){const pt=d+st+G*it,At=d+st+G*(it+1),z=d+(st+1)+G*(it+1),tt=d+(st+1)+G*it;l.push(pt,At,tt),l.push(At,z,tt),W+=6}a.addGroup(m,W,K),m+=W,d+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function _r(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function Ue(n){const t={};for(let e=0;e<n.length;e++){const i=_r(n[e]);for(const r in i)t[r]=i[r]}return t}function Hf(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Th(n){return n.getRenderTarget()===null?n.outputColorSpace:Qt.workingColorSpace}const Gf={clone:_r,merge:Ue};var Wf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ni extends Di{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wf,this.fragmentShader=Xf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=_r(t.uniforms),this.uniformsGroups=Hf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Ch extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ae,this.projectionMatrix=new ae,this.projectionMatrixInverse=new ae,this.coordinateSystem=Pn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const zn=new A,Dc=new lt,Ic=new lt;class nn extends Ch{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=qr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Br*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return qr*2*Math.atan(Math.tan(Br*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(zn.x,zn.y).multiplyScalar(-t/zn.z),zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(zn.x,zn.y).multiplyScalar(-t/zn.z)}getViewSize(t,e){return this.getViewBounds(t,Dc,Ic),e.subVectors(Ic,Dc)}setViewOffset(t,e,i,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Br*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const $i=-90,Zi=1;class qf extends Ce{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new nn($i,Zi,t,e);r.layers=this.layers,this.add(r);const s=new nn($i,Zi,t,e);s.layers=this.layers,this.add(s);const o=new nn($i,Zi,t,e);o.layers=this.layers,this.add(o);const a=new nn($i,Zi,t,e);a.layers=this.layers,this.add(a);const l=new nn($i,Zi,t,e);l.layers=this.layers,this.add(l);const c=new nn($i,Zi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===Pn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===lo)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=t.getRenderTarget(),d=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,s),t.setRenderTarget(i,1,r),t.render(e,o),t.setRenderTarget(i,2,r),t.render(e,a),t.setRenderTarget(i,3,r),t.render(e,l),t.setRenderTarget(i,4,r),t.render(e,c),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,r),t.render(e,u),t.setRenderTarget(h,d,m),t.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class Ah extends Be{constructor(t,e,i,r,s,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:fr,super(t,e,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Yf extends Si{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Ah(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:ze}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new xr(5,5,5),s=new ni({name:"CubemapFromEquirect",uniforms:_r(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:We,blending:$n});s.uniforms.tEquirect.value=e;const o=new Oe(r,s),a=e.minFilter;return e.minFilter===bi&&(e.minFilter=ze),new qf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,r){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,r);t.setRenderTarget(s)}}const na=new A,jf=new A,Kf=new Lt;class Xn{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=na.subVectors(i,e).cross(jf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(na),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Kf.getNormalMatrix(t),r=this.coplanarPoint(na).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const di=new is,Os=new A;class Ph{constructor(t=new Xn,e=new Xn,i=new Xn,r=new Xn,s=new Xn,o=new Xn){this.planes=[t,e,i,r,s,o]}set(t,e,i,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Pn){const i=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],h=r[6],d=r[7],m=r[8],v=r[9],x=r[10],f=r[11],p=r[12],E=r[13],_=r[14],M=r[15];if(i[0].setComponents(l-s,d-c,f-m,M-p).normalize(),i[1].setComponents(l+s,d+c,f+m,M+p).normalize(),i[2].setComponents(l+o,d+u,f+v,M+E).normalize(),i[3].setComponents(l-o,d-u,f-v,M-E).normalize(),i[4].setComponents(l-a,d-h,f-x,M-_).normalize(),e===Pn)i[5].setComponents(l+a,d+h,f+x,M+_).normalize();else if(e===lo)i[5].setComponents(a,h,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),di.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),di.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(di)}intersectsSprite(t){return di.center.set(0,0,0),di.radius=.7071067811865476,di.applyMatrix4(t.matrixWorld),this.intersectsSphere(di)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(Os.x=r.normal.x>0?t.max.x:t.min.x,Os.y=r.normal.y>0?t.max.y:t.min.y,Os.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Os)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Rh(){let n=null,t=!1,e=null,i=null;function r(s,o){e(s,o),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){n=s}}}function $f(n,t){const e=t.isWebGL2,i=new WeakMap;function r(c,u){const h=c.array,d=c.usage,m=h.byteLength,v=n.createBuffer();n.bindBuffer(u,v),n.bufferData(u,h,d),c.onUploadCallback();let x;if(h instanceof Float32Array)x=n.FLOAT;else if(h instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)x=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=n.UNSIGNED_SHORT;else if(h instanceof Int16Array)x=n.SHORT;else if(h instanceof Uint32Array)x=n.UNSIGNED_INT;else if(h instanceof Int32Array)x=n.INT;else if(h instanceof Int8Array)x=n.BYTE;else if(h instanceof Uint8Array)x=n.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)x=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:v,type:x,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:m}}function s(c,u,h){const d=u.array,m=u._updateRange,v=u.updateRanges;if(n.bindBuffer(h,c),m.count===-1&&v.length===0&&n.bufferSubData(h,0,d),v.length!==0){for(let x=0,f=v.length;x<f;x++){const p=v[x];e?n.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):n.bufferSubData(h,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}m.count!==-1&&(e?n.bufferSubData(h,m.offset*d.BYTES_PER_ELEMENT,d,m.offset,m.count):n.bufferSubData(h,m.offset*d.BYTES_PER_ELEMENT,d.subarray(m.offset,m.offset+m.count)),m.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(n.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const d=i.get(c);(!d||d.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);if(h===void 0)i.set(c,r(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(h.buffer,c,u),h.version=c.version}}return{get:o,remove:a,update:l}}class wo extends _e{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,h=t/a,d=e/l,m=[],v=[],x=[],f=[];for(let p=0;p<u;p++){const E=p*d-o;for(let _=0;_<c;_++){const M=_*h-s;v.push(M,-E,0),x.push(0,0,1),f.push(_/a),f.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<a;E++){const _=E+c*p,M=E+c*(p+1),D=E+1+c*(p+1),R=E+1+c*p;m.push(_,M,R),m.push(M,D,R)}this.setIndex(m),this.setAttribute("position",new me(v,3)),this.setAttribute("normal",new me(x,3)),this.setAttribute("uv",new me(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wo(t.width,t.height,t.widthSegments,t.heightSegments)}}var Zf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Jf=`#ifdef USE_ALPHAHASH
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
#endif`,Qf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,tm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,em=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,nm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,im=`#ifdef USE_AOMAP
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
#endif`,rm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sm=`#ifdef USE_BATCHING
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
#endif`,om=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,am=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,lm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,um=`#ifdef USE_IRIDESCENCE
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
#endif`,hm=`#ifdef USE_BUMPMAP
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
#endif`,dm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,pm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,mm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,_m=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,xm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,bm=`#define PI 3.141592653589793
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
} // validated`,wm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ym=`vec3 transformedNormal = objectNormal;
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
#endif`,Em=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Tm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Cm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Am=`
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
}`,Pm=`#ifdef USE_ENVMAP
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
#endif`,Rm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Lm=`#ifdef USE_ENVMAP
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
#endif`,Dm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Im=`#ifdef USE_ENVMAP
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
#endif`,Um=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Nm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Om=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Fm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Bm=`#ifdef USE_GRADIENTMAP
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
}`,km=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Vm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Hm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gm=`uniform bool receiveShadow;
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
#endif`,Wm=`#ifdef USE_ENVMAP
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
#endif`,Xm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ym=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Km=`PhysicalMaterial material;
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
#endif`,$m=`struct PhysicalMaterial {
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
}`,Zm=`
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
#endif`,Jm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Qm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ev=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,iv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,rv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ov=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,av=`#if defined( USE_POINTS_UV )
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
#endif`,lv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,hv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,dv=`#ifdef USE_MORPHNORMALS
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
#endif`,pv=`#ifdef USE_MORPHTARGETS
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
#endif`,fv=`#ifdef USE_MORPHTARGETS
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
#endif`,mv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,vv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,_v=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bv=`#ifdef USE_NORMALMAP
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
#endif`,wv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ev=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Mv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Sv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Tv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Cv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Av=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Pv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Lv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Dv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Iv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
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
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Uv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Nv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ov=`float getShadowMask() {
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
}`,Fv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Bv=`#ifdef USE_SKINNING
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
#endif`,kv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vv=`#ifdef USE_SKINNING
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
#endif`,zv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Wv=`#ifndef saturate
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
	return mix(color, vec3(1, 1, 1), g);
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Xv=`#ifdef USE_TRANSMISSION
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
#endif`,qv=`#ifdef USE_TRANSMISSION
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
#endif`,Yv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$v=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Zv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Jv=`uniform sampler2D t2D;
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
}`,Qv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,t_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,e_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,n_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,i_=`#include <common>
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
}`,r_=`#if DEPTH_PACKING == 3200
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
}`,s_=`#define DISTANCE
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
}`,o_=`#define DISTANCE
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
}`,a_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,l_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,c_=`uniform float scale;
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
}`,u_=`uniform vec3 diffuse;
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
}`,h_=`#include <common>
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
}`,d_=`uniform vec3 diffuse;
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
}`,p_=`#define LAMBERT
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
}`,f_=`#define LAMBERT
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
}`,m_=`#define MATCAP
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
}`,v_=`#define MATCAP
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
}`,__=`#define NORMAL
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
}`,g_=`#define NORMAL
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
}`,x_=`#define PHONG
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
}`,b_=`#define PHONG
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
}`,w_=`#define STANDARD
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
}`,y_=`#define STANDARD
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
}`,E_=`#define TOON
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
}`,M_=`#define TOON
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
}`,S_=`uniform float size;
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
}`,T_=`uniform vec3 diffuse;
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
}`,C_=`#include <common>
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
}`,A_=`uniform vec3 color;
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
}`,P_=`uniform float rotation;
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
}`,R_=`uniform vec3 diffuse;
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
}`,Bt={alphahash_fragment:Zf,alphahash_pars_fragment:Jf,alphamap_fragment:Qf,alphamap_pars_fragment:tm,alphatest_fragment:em,alphatest_pars_fragment:nm,aomap_fragment:im,aomap_pars_fragment:rm,batching_pars_vertex:sm,batching_vertex:om,begin_vertex:am,beginnormal_vertex:lm,bsdfs:cm,iridescence_fragment:um,bumpmap_pars_fragment:hm,clipping_planes_fragment:dm,clipping_planes_pars_fragment:pm,clipping_planes_pars_vertex:fm,clipping_planes_vertex:mm,color_fragment:vm,color_pars_fragment:_m,color_pars_vertex:gm,color_vertex:xm,common:bm,cube_uv_reflection_fragment:wm,defaultnormal_vertex:ym,displacementmap_pars_vertex:Em,displacementmap_vertex:Mm,emissivemap_fragment:Sm,emissivemap_pars_fragment:Tm,colorspace_fragment:Cm,colorspace_pars_fragment:Am,envmap_fragment:Pm,envmap_common_pars_fragment:Rm,envmap_pars_fragment:Lm,envmap_pars_vertex:Dm,envmap_physical_pars_fragment:Wm,envmap_vertex:Im,fog_vertex:Um,fog_pars_vertex:Nm,fog_fragment:Om,fog_pars_fragment:Fm,gradientmap_pars_fragment:Bm,lightmap_fragment:km,lightmap_pars_fragment:Vm,lights_lambert_fragment:zm,lights_lambert_pars_fragment:Hm,lights_pars_begin:Gm,lights_toon_fragment:Xm,lights_toon_pars_fragment:qm,lights_phong_fragment:Ym,lights_phong_pars_fragment:jm,lights_physical_fragment:Km,lights_physical_pars_fragment:$m,lights_fragment_begin:Zm,lights_fragment_maps:Jm,lights_fragment_end:Qm,logdepthbuf_fragment:tv,logdepthbuf_pars_fragment:ev,logdepthbuf_pars_vertex:nv,logdepthbuf_vertex:iv,map_fragment:rv,map_pars_fragment:sv,map_particle_fragment:ov,map_particle_pars_fragment:av,metalnessmap_fragment:lv,metalnessmap_pars_fragment:cv,morphinstance_vertex:uv,morphcolor_vertex:hv,morphnormal_vertex:dv,morphtarget_pars_vertex:pv,morphtarget_vertex:fv,normal_fragment_begin:mv,normal_fragment_maps:vv,normal_pars_fragment:_v,normal_pars_vertex:gv,normal_vertex:xv,normalmap_pars_fragment:bv,clearcoat_normal_fragment_begin:wv,clearcoat_normal_fragment_maps:yv,clearcoat_pars_fragment:Ev,iridescence_pars_fragment:Mv,opaque_fragment:Sv,packing:Tv,premultiplied_alpha_fragment:Cv,project_vertex:Av,dithering_fragment:Pv,dithering_pars_fragment:Rv,roughnessmap_fragment:Lv,roughnessmap_pars_fragment:Dv,shadowmap_pars_fragment:Iv,shadowmap_pars_vertex:Uv,shadowmap_vertex:Nv,shadowmask_pars_fragment:Ov,skinbase_vertex:Fv,skinning_pars_vertex:Bv,skinning_vertex:kv,skinnormal_vertex:Vv,specularmap_fragment:zv,specularmap_pars_fragment:Hv,tonemapping_fragment:Gv,tonemapping_pars_fragment:Wv,transmission_fragment:Xv,transmission_pars_fragment:qv,uv_pars_fragment:Yv,uv_pars_vertex:jv,uv_vertex:Kv,worldpos_vertex:$v,background_vert:Zv,background_frag:Jv,backgroundCube_vert:Qv,backgroundCube_frag:t_,cube_vert:e_,cube_frag:n_,depth_vert:i_,depth_frag:r_,distanceRGBA_vert:s_,distanceRGBA_frag:o_,equirect_vert:a_,equirect_frag:l_,linedashed_vert:c_,linedashed_frag:u_,meshbasic_vert:h_,meshbasic_frag:d_,meshlambert_vert:p_,meshlambert_frag:f_,meshmatcap_vert:m_,meshmatcap_frag:v_,meshnormal_vert:__,meshnormal_frag:g_,meshphong_vert:x_,meshphong_frag:b_,meshphysical_vert:w_,meshphysical_frag:y_,meshtoon_vert:E_,meshtoon_frag:M_,points_vert:S_,points_frag:T_,shadow_vert:C_,shadow_frag:A_,sprite_vert:P_,sprite_frag:R_},at={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Lt}},envmap:{envMap:{value:null},envMapRotation:{value:new Lt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Lt},normalScale:{value:new lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0},uvTransform:{value:new Lt}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}}},fn={basic:{uniforms:Ue([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Bt.meshbasic_vert,fragmentShader:Bt.meshbasic_frag},lambert:{uniforms:Ue([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Bt.meshlambert_vert,fragmentShader:Bt.meshlambert_frag},phong:{uniforms:Ue([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30}}]),vertexShader:Bt.meshphong_vert,fragmentShader:Bt.meshphong_frag},standard:{uniforms:Ue([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag},toon:{uniforms:Ue([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Xt(0)}}]),vertexShader:Bt.meshtoon_vert,fragmentShader:Bt.meshtoon_frag},matcap:{uniforms:Ue([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Bt.meshmatcap_vert,fragmentShader:Bt.meshmatcap_frag},points:{uniforms:Ue([at.points,at.fog]),vertexShader:Bt.points_vert,fragmentShader:Bt.points_frag},dashed:{uniforms:Ue([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Bt.linedashed_vert,fragmentShader:Bt.linedashed_frag},depth:{uniforms:Ue([at.common,at.displacementmap]),vertexShader:Bt.depth_vert,fragmentShader:Bt.depth_frag},normal:{uniforms:Ue([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Bt.meshnormal_vert,fragmentShader:Bt.meshnormal_frag},sprite:{uniforms:Ue([at.sprite,at.fog]),vertexShader:Bt.sprite_vert,fragmentShader:Bt.sprite_frag},background:{uniforms:{uvTransform:{value:new Lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Bt.background_vert,fragmentShader:Bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Lt}},vertexShader:Bt.backgroundCube_vert,fragmentShader:Bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Bt.cube_vert,fragmentShader:Bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Bt.equirect_vert,fragmentShader:Bt.equirect_frag},distanceRGBA:{uniforms:Ue([at.common,at.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Bt.distanceRGBA_vert,fragmentShader:Bt.distanceRGBA_frag},shadow:{uniforms:Ue([at.lights,at.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:Bt.shadow_vert,fragmentShader:Bt.shadow_frag}};fn.physical={uniforms:Ue([fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Lt},clearcoatNormalScale:{value:new lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Lt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Lt},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Lt},transmissionSamplerSize:{value:new lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Lt},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Lt},anisotropyVector:{value:new lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Lt}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag};const Fs={r:0,b:0,g:0},pi=new Dn,L_=new ae;function D_(n,t,e,i,r,s,o){const a=new Xt(0);let l=s===!0?0:1,c,u,h=null,d=0,m=null;function v(f,p){let E=!1,_=p.isScene===!0?p.background:null;_&&_.isTexture&&(_=(p.backgroundBlurriness>0?e:t).get(_)),_===null?x(a,l):_&&_.isColor&&(x(_,1),E=!0);const M=n.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||E)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),_&&(_.isCubeTexture||_.mapping===go)?(u===void 0&&(u=new Oe(new xr(1,1,1),new ni({name:"BackgroundCubeMaterial",uniforms:_r(fn.backgroundCube.uniforms),vertexShader:fn.backgroundCube.vertexShader,fragmentShader:fn.backgroundCube.fragmentShader,side:We,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(D,R,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),pi.copy(p.backgroundRotation),pi.x*=-1,pi.y*=-1,pi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(pi.y*=-1,pi.z*=-1),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(L_.makeRotationFromEuler(pi)),u.material.toneMapped=Qt.getTransfer(_.colorSpace)!==se,(h!==_||d!==_.version||m!==n.toneMapping)&&(u.material.needsUpdate=!0,h=_,d=_.version,m=n.toneMapping),u.layers.enableAll(),f.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Oe(new wo(2,2),new ni({name:"BackgroundMaterial",uniforms:_r(fn.background.uniforms),vertexShader:fn.background.vertexShader,fragmentShader:fn.background.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=Qt.getTransfer(_.colorSpace)!==se,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,h=_,d=_.version,m=n.toneMapping),c.layers.enableAll(),f.unshift(c,c.geometry,c.material,0,0,null))}function x(f,p){f.getRGB(Fs,Th(n)),i.buffers.color.setClear(Fs.r,Fs.g,Fs.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(f,p=1){a.set(f),l=p,x(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(f){l=f,x(a,l)},render:v}}function I_(n,t,e,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:t.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},l=f(null);let c=l,u=!1;function h(L,G,V,Y,W){let X=!1;if(o){const it=x(Y,V,G);c!==it&&(c=it,m(c.object)),X=p(L,Y,V,W),X&&E(L,Y,V,W)}else{const it=G.wireframe===!0;(c.geometry!==Y.id||c.program!==V.id||c.wireframe!==it)&&(c.geometry=Y.id,c.program=V.id,c.wireframe=it,X=!0)}W!==null&&e.update(W,n.ELEMENT_ARRAY_BUFFER),(X||u)&&(u=!1,O(L,G,V,Y),W!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function d(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function m(L){return i.isWebGL2?n.bindVertexArray(L):s.bindVertexArrayOES(L)}function v(L){return i.isWebGL2?n.deleteVertexArray(L):s.deleteVertexArrayOES(L)}function x(L,G,V){const Y=V.wireframe===!0;let W=a[L.id];W===void 0&&(W={},a[L.id]=W);let X=W[G.id];X===void 0&&(X={},W[G.id]=X);let it=X[Y];return it===void 0&&(it=f(d()),X[Y]=it),it}function f(L){const G=[],V=[],Y=[];for(let W=0;W<r;W++)G[W]=0,V[W]=0,Y[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:V,attributeDivisors:Y,object:L,attributes:{},index:null}}function p(L,G,V,Y){const W=c.attributes,X=G.attributes;let it=0;const st=V.getAttributes();for(const pt in st)if(st[pt].location>=0){const z=W[pt];let tt=X[pt];if(tt===void 0&&(pt==="instanceMatrix"&&L.instanceMatrix&&(tt=L.instanceMatrix),pt==="instanceColor"&&L.instanceColor&&(tt=L.instanceColor)),z===void 0||z.attribute!==tt||tt&&z.data!==tt.data)return!0;it++}return c.attributesNum!==it||c.index!==Y}function E(L,G,V,Y){const W={},X=G.attributes;let it=0;const st=V.getAttributes();for(const pt in st)if(st[pt].location>=0){let z=X[pt];z===void 0&&(pt==="instanceMatrix"&&L.instanceMatrix&&(z=L.instanceMatrix),pt==="instanceColor"&&L.instanceColor&&(z=L.instanceColor));const tt={};tt.attribute=z,z&&z.data&&(tt.data=z.data),W[pt]=tt,it++}c.attributes=W,c.attributesNum=it,c.index=Y}function _(){const L=c.newAttributes;for(let G=0,V=L.length;G<V;G++)L[G]=0}function M(L){D(L,0)}function D(L,G){const V=c.newAttributes,Y=c.enabledAttributes,W=c.attributeDivisors;V[L]=1,Y[L]===0&&(n.enableVertexAttribArray(L),Y[L]=1),W[L]!==G&&((i.isWebGL2?n:t.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,G),W[L]=G)}function R(){const L=c.newAttributes,G=c.enabledAttributes;for(let V=0,Y=G.length;V<Y;V++)G[V]!==L[V]&&(n.disableVertexAttribArray(V),G[V]=0)}function C(L,G,V,Y,W,X,it){it===!0?n.vertexAttribIPointer(L,G,V,W,X):n.vertexAttribPointer(L,G,V,Y,W,X)}function O(L,G,V,Y){if(i.isWebGL2===!1&&(L.isInstancedMesh||Y.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;_();const W=Y.attributes,X=V.getAttributes(),it=G.defaultAttributeValues;for(const st in X){const pt=X[st];if(pt.location>=0){let At=W[st];if(At===void 0&&(st==="instanceMatrix"&&L.instanceMatrix&&(At=L.instanceMatrix),st==="instanceColor"&&L.instanceColor&&(At=L.instanceColor)),At!==void 0){const z=At.normalized,tt=At.itemSize,dt=e.get(At);if(dt===void 0)continue;const Tt=dt.buffer,xt=dt.type,ft=dt.bytesPerElement,Yt=i.isWebGL2===!0&&(xt===n.INT||xt===n.UNSIGNED_INT||At.gpuType===ch);if(At.isInterleavedBufferAttribute){const St=At.data,U=St.stride,be=At.offset;if(St.isInstancedInterleavedBuffer){for(let wt=0;wt<pt.locationSize;wt++)D(pt.location+wt,St.meshPerAttribute);L.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let wt=0;wt<pt.locationSize;wt++)M(pt.location+wt);n.bindBuffer(n.ARRAY_BUFFER,Tt);for(let wt=0;wt<pt.locationSize;wt++)C(pt.location+wt,tt/pt.locationSize,xt,z,U*ft,(be+tt/pt.locationSize*wt)*ft,Yt)}else{if(At.isInstancedBufferAttribute){for(let St=0;St<pt.locationSize;St++)D(pt.location+St,At.meshPerAttribute);L.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=At.meshPerAttribute*At.count)}else for(let St=0;St<pt.locationSize;St++)M(pt.location+St);n.bindBuffer(n.ARRAY_BUFFER,Tt);for(let St=0;St<pt.locationSize;St++)C(pt.location+St,tt/pt.locationSize,xt,z,tt*ft,tt/pt.locationSize*St*ft,Yt)}}else if(it!==void 0){const z=it[st];if(z!==void 0)switch(z.length){case 2:n.vertexAttrib2fv(pt.location,z);break;case 3:n.vertexAttrib3fv(pt.location,z);break;case 4:n.vertexAttrib4fv(pt.location,z);break;default:n.vertexAttrib1fv(pt.location,z)}}}}R()}function K(){$();for(const L in a){const G=a[L];for(const V in G){const Y=G[V];for(const W in Y)v(Y[W].object),delete Y[W];delete G[V]}delete a[L]}}function b(L){if(a[L.id]===void 0)return;const G=a[L.id];for(const V in G){const Y=G[V];for(const W in Y)v(Y[W].object),delete Y[W];delete G[V]}delete a[L.id]}function T(L){for(const G in a){const V=a[G];if(V[L.id]===void 0)continue;const Y=V[L.id];for(const W in Y)v(Y[W].object),delete Y[W];delete V[L.id]}}function $(){Z(),u=!0,c!==l&&(c=l,m(c.object))}function Z(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:$,resetDefaultState:Z,dispose:K,releaseStatesOfGeometry:b,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:M,disableUnusedAttributes:R}}function U_(n,t,e,i){const r=i.isWebGL2;let s;function o(u){s=u}function a(u,h){n.drawArrays(s,u,h),e.update(h,s,1)}function l(u,h,d){if(d===0)return;let m,v;if(r)m=n,v="drawArraysInstanced";else if(m=t.get("ANGLE_instanced_arrays"),v="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[v](s,u,h,d),e.update(h,s,d)}function c(u,h,d){if(d===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let v=0;v<d;v++)this.render(u[v],h[v]);else{m.multiDrawArraysWEBGL(s,u,0,h,0,d);let v=0;for(let x=0;x<d;x++)v+=h[x];e.update(v,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function N_(n,t,e){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");i=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let a=e.precision!==void 0?e.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||t.has("WEBGL_draw_buffers"),u=e.logarithmicDepthBuffer===!0,h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_TEXTURE_SIZE),v=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),x=n.getParameter(n.MAX_VERTEX_ATTRIBS),f=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),p=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),_=d>0,M=o||t.has("OES_texture_float"),D=_&&M,R=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:d,maxTextureSize:m,maxCubemapSize:v,maxAttributes:x,maxVertexUniforms:f,maxVaryings:p,maxFragmentUniforms:E,vertexTextures:_,floatFragmentTextures:M,floatVertexTextures:D,maxSamples:R}}function O_(n){const t=this;let e=null,i=0,r=!1,s=!1;const o=new Xn,a=new Lt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const m=h.length!==0||d||i!==0||r;return r=d,i=h.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){e=u(h,d,0)},this.setState=function(h,d,m){const v=h.clippingPlanes,x=h.clipIntersection,f=h.clipShadows,p=n.get(h);if(!r||v===null||v.length===0||s&&!f)s?u(null):c();else{const E=s?0:i,_=E*4;let M=p.clippingState||null;l.value=M,M=u(v,d,_,m);for(let D=0;D!==_;++D)M[D]=e[D];p.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,d,m,v){const x=h!==null?h.length:0;let f=null;if(x!==0){if(f=l.value,v!==!0||f===null){const p=m+x*4,E=d.matrixWorldInverse;a.getNormalMatrix(E),(f===null||f.length<p)&&(f=new Float32Array(p));for(let _=0,M=m;_!==x;++_,M+=4)o.copy(h[_]).applyMatrix4(E,a),o.normal.toArray(f,M),f[M+3]=o.constant}l.value=f,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,f}}function F_(n){let t=new WeakMap;function e(o,a){return a===Ta?o.mapping=fr:a===Ca&&(o.mapping=mr),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ta||a===Ca)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Yf(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}class B_ extends Ch{constructor(t=-1,e=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,o=i+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const sr=4,Uc=[.125,.215,.35,.446,.526,.582],gi=20,ia=new B_,Nc=new Xt;let ra=null,sa=0,oa=0;const vi=(1+Math.sqrt(5))/2,Ji=1/vi,Oc=[new A(1,1,1),new A(-1,1,1),new A(1,1,-1),new A(-1,1,-1),new A(0,vi,Ji),new A(0,vi,-Ji),new A(Ji,0,vi),new A(-Ji,0,vi),new A(vi,Ji,0),new A(-vi,Ji,0)];class Fc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100){ra=this._renderer.getRenderTarget(),sa=this._renderer.getActiveCubeFace(),oa=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,i,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ra,sa,oa),t.scissorTest=!1,Bs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===fr||t.mapping===mr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ra=this._renderer.getRenderTarget(),sa=this._renderer.getActiveCubeFace(),oa=this._renderer.getActiveMipmapLevel();const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ze,minFilter:ze,generateMipmaps:!1,type:Xr,format:cn,colorSpace:si,depthBuffer:!1},r=Bc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bc(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=k_(s)),this._blurMaterial=V_(s,t,e)}return r}_compileMaterial(t){const e=new Oe(this._lodPlanes[0],t);this._renderer.compile(e,ia)}_sceneToCubeUV(t,e,i,r){const a=new nn(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(Nc),u.toneMapping=Zn,u.autoClear=!1;const m=new Qn({name:"PMREM.Background",side:We,depthWrite:!1,depthTest:!1}),v=new Oe(new xr,m);let x=!1;const f=t.background;f?f.isColor&&(m.color.copy(f),t.background=null,x=!0):(m.color.copy(Nc),x=!0);for(let p=0;p<6;p++){const E=p%3;E===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):E===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const _=this._cubeSize;Bs(r,E*_,p>2?_:0,_,_),u.setRenderTarget(r),x&&u.render(v,a),u.render(t,a)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=d,u.autoClear=h,t.background=f}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===fr||t.mapping===mr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kc());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Oe(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Bs(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,ia)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Oc[(r-1)%Oc.length];this._blur(t,r-1,r,s,o)}e.autoClear=i}_blur(t,e,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,r,"latitudinal",s),this._halfBlur(o,t,i,i,r,"longitudinal",s)}_halfBlur(t,e,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Oe(this._lodPlanes[r],c),d=c.uniforms,m=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*gi-1),x=s/v,f=isFinite(s)?1+Math.floor(u*x):gi;f>gi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${gi}`);const p=[];let E=0;for(let C=0;C<gi;++C){const O=C/x,K=Math.exp(-O*O/2);p.push(K),C===0?E+=K:C<f&&(E+=2*K)}for(let C=0;C<p.length;C++)p[C]=p[C]/E;d.envMap.value=t.texture,d.samples.value=f,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:_}=this;d.dTheta.value=v,d.mipInt.value=_-i;const M=this._sizeLods[r],D=3*M*(r>_-sr?r-_+sr:0),R=4*(this._cubeSize-M);Bs(e,D,R,3*M,2*M),l.setRenderTarget(e),l.render(h,ia)}}function k_(n){const t=[],e=[],i=[];let r=n;const s=n-sr+1+Uc.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>n-sr?l=Uc[o-n+sr-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],m=6,v=6,x=3,f=2,p=1,E=new Float32Array(x*v*m),_=new Float32Array(f*v*m),M=new Float32Array(p*v*m);for(let R=0;R<m;R++){const C=R%3*2/3-1,O=R>2?0:-1,K=[C,O,0,C+2/3,O,0,C+2/3,O+1,0,C,O,0,C+2/3,O+1,0,C,O+1,0];E.set(K,x*v*R),_.set(d,f*v*R);const b=[R,R,R,R,R,R];M.set(b,p*v*R)}const D=new _e;D.setAttribute("position",new dn(E,x)),D.setAttribute("uv",new dn(_,f)),D.setAttribute("faceIndex",new dn(M,p)),t.push(D),r>sr&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Bc(n,t,e){const i=new Si(n,t,e);return i.texture.mapping=go,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Bs(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function V_(n,t,e){const i=new Float32Array(gi),r=new A(0,1,0);return new ni({name:"SphericalGaussianBlur",defines:{n:gi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:$a(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function kc(){return new ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$a(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Vc(){return new ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function $a(){return`

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
	`}function z_(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ta||l===Ca,u=l===fr||l===mr;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let h=t.get(a);return e===null&&(e=new Fc(n)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),t.set(a,h),h.texture}else{if(t.has(a))return t.get(a).texture;{const h=a.image;if(c&&h&&h.height>0||u&&h&&r(h)){e===null&&(e=new Fc(n));const d=c?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,d),a.addEventListener("dispose",s),d.texture}else return null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function H_(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(i){i.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(i){const r=e(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function G_(n,t,e,i){const r={},s=new WeakMap;function o(h){const d=h.target;d.index!==null&&t.remove(d.index);for(const v in d.attributes)t.remove(d.attributes[v]);for(const v in d.morphAttributes){const x=d.morphAttributes[v];for(let f=0,p=x.length;f<p;f++)t.remove(x[f])}d.removeEventListener("dispose",o),delete r[d.id];const m=s.get(d);m&&(t.remove(m),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(h,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,e.memory.geometries++),d}function l(h){const d=h.attributes;for(const v in d)t.update(d[v],n.ARRAY_BUFFER);const m=h.morphAttributes;for(const v in m){const x=m[v];for(let f=0,p=x.length;f<p;f++)t.update(x[f],n.ARRAY_BUFFER)}}function c(h){const d=[],m=h.index,v=h.attributes.position;let x=0;if(m!==null){const E=m.array;x=m.version;for(let _=0,M=E.length;_<M;_+=3){const D=E[_+0],R=E[_+1],C=E[_+2];d.push(D,R,R,C,C,D)}}else if(v!==void 0){const E=v.array;x=v.version;for(let _=0,M=E.length/3-1;_<M;_+=3){const D=_+0,R=_+1,C=_+2;d.push(D,R,R,C,C,D)}}else return;const f=new(_h(d)?Sh:Mh)(d,1);f.version=x;const p=s.get(h);p&&t.remove(p),s.set(h,f)}function u(h){const d=s.get(h);if(d){const m=h.index;m!==null&&d.version<m.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function W_(n,t,e,i){const r=i.isWebGL2;let s;function o(m){s=m}let a,l;function c(m){a=m.type,l=m.bytesPerElement}function u(m,v){n.drawElements(s,v,a,m*l),e.update(v,s,1)}function h(m,v,x){if(x===0)return;let f,p;if(r)f=n,p="drawElementsInstanced";else if(f=t.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",f===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[p](s,v,a,m*l,x),e.update(v,s,x)}function d(m,v,x){if(x===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<x;p++)this.render(m[p]/l,v[p]);else{f.multiDrawElementsWEBGL(s,v,0,a,m,0,x);let p=0;for(let E=0;E<x;E++)p+=v[E];e.update(p,s,1)}}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=d}function X_(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(s/3);break;case n.LINES:e.lines+=a*(s/2);break;case n.LINE_STRIP:e.lines+=a*(s-1);break;case n.LINE_LOOP:e.lines+=a*s;break;case n.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function q_(n,t){return n[0]-t[0]}function Y_(n,t){return Math.abs(t[1])-Math.abs(n[1])}function j_(n,t,e){const i={},r=new Float32Array(8),s=new WeakMap,o=new Ae,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,h){const d=c.morphTargetInfluences;if(t.isWebGL2===!0){const m=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,v=m!==void 0?m.length:0;let x=s.get(u);if(x===void 0||x.count!==v){let $=function(){b.dispose(),s.delete(u),u.removeEventListener("dispose",$)};x!==void 0&&x.texture.dispose();const f=u.morphAttributes.position!==void 0,p=u.morphAttributes.normal!==void 0,E=u.morphAttributes.color!==void 0,_=u.morphAttributes.position||[],M=u.morphAttributes.normal||[],D=u.morphAttributes.color||[];let R=0;f===!0&&(R=1),p===!0&&(R=2),E===!0&&(R=3);let C=u.attributes.position.count*R,O=1;C>t.maxTextureSize&&(O=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const K=new Float32Array(C*O*4*v),b=new wh(K,C,O,v);b.type=An,b.needsUpdate=!0;const T=R*4;for(let Z=0;Z<v;Z++){const L=_[Z],G=M[Z],V=D[Z],Y=C*O*4*Z;for(let W=0;W<L.count;W++){const X=W*T;f===!0&&(o.fromBufferAttribute(L,W),K[Y+X+0]=o.x,K[Y+X+1]=o.y,K[Y+X+2]=o.z,K[Y+X+3]=0),p===!0&&(o.fromBufferAttribute(G,W),K[Y+X+4]=o.x,K[Y+X+5]=o.y,K[Y+X+6]=o.z,K[Y+X+7]=0),E===!0&&(o.fromBufferAttribute(V,W),K[Y+X+8]=o.x,K[Y+X+9]=o.y,K[Y+X+10]=o.z,K[Y+X+11]=V.itemSize===4?o.w:1)}}x={count:v,texture:b,size:new lt(C,O)},s.set(u,x),u.addEventListener("dispose",$)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)h.getUniforms().setValue(n,"morphTexture",c.morphTexture,e);else{let f=0;for(let E=0;E<d.length;E++)f+=d[E];const p=u.morphTargetsRelative?1:1-f;h.getUniforms().setValue(n,"morphTargetBaseInfluence",p),h.getUniforms().setValue(n,"morphTargetInfluences",d)}h.getUniforms().setValue(n,"morphTargetsTexture",x.texture,e),h.getUniforms().setValue(n,"morphTargetsTextureSize",x.size)}else{const m=d===void 0?0:d.length;let v=i[u.id];if(v===void 0||v.length!==m){v=[];for(let _=0;_<m;_++)v[_]=[_,0];i[u.id]=v}for(let _=0;_<m;_++){const M=v[_];M[0]=_,M[1]=d[_]}v.sort(Y_);for(let _=0;_<8;_++)_<m&&v[_][1]?(a[_][0]=v[_][0],a[_][1]=v[_][1]):(a[_][0]=Number.MAX_SAFE_INTEGER,a[_][1]=0);a.sort(q_);const x=u.morphAttributes.position,f=u.morphAttributes.normal;let p=0;for(let _=0;_<8;_++){const M=a[_],D=M[0],R=M[1];D!==Number.MAX_SAFE_INTEGER&&R?(x&&u.getAttribute("morphTarget"+_)!==x[D]&&u.setAttribute("morphTarget"+_,x[D]),f&&u.getAttribute("morphNormal"+_)!==f[D]&&u.setAttribute("morphNormal"+_,f[D]),r[_]=R,p+=R):(x&&u.hasAttribute("morphTarget"+_)===!0&&u.deleteAttribute("morphTarget"+_),f&&u.hasAttribute("morphNormal"+_)===!0&&u.deleteAttribute("morphNormal"+_),r[_]=0)}const E=u.morphTargetsRelative?1:1-p;h.getUniforms().setValue(n,"morphTargetBaseInfluence",E),h.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:l}}function K_(n,t,e,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,h=t.get(l,u);if(r.get(h)!==c&&(t.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class Lh extends Be{constructor(t,e,i,r,s,o,a,l,c,u){if(u=u!==void 0?u:yi,u!==yi&&u!==vr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===yi&&(i=jn),i===void 0&&u===vr&&(i=wi),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Ne,this.minFilter=l!==void 0?l:Ne,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Dh=new Be,Ih=new Lh(1,1);Ih.compareFunction=vh;const Uh=new wh,Nh=new Rf,Oh=new Ah,zc=[],Hc=[],Gc=new Float32Array(16),Wc=new Float32Array(9),Xc=new Float32Array(4);function br(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let s=zc[r];if(s===void 0&&(s=new Float32Array(r),zc[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(s,a)}return s}function ye(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ee(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function yo(n,t){let e=Hc[t];e===void 0&&(e=new Int32Array(t),Hc[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function $_(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Z_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;n.uniform2fv(this.addr,t),Ee(e,t)}}function J_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ye(e,t))return;n.uniform3fv(this.addr,t),Ee(e,t)}}function Q_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;n.uniform4fv(this.addr,t),Ee(e,t)}}function tg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ye(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(ye(e,i))return;Xc.set(i),n.uniformMatrix2fv(this.addr,!1,Xc),Ee(e,i)}}function eg(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ye(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(ye(e,i))return;Wc.set(i),n.uniformMatrix3fv(this.addr,!1,Wc),Ee(e,i)}}function ng(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ye(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(ye(e,i))return;Gc.set(i),n.uniformMatrix4fv(this.addr,!1,Gc),Ee(e,i)}}function ig(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function rg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;n.uniform2iv(this.addr,t),Ee(e,t)}}function sg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;n.uniform3iv(this.addr,t),Ee(e,t)}}function og(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;n.uniform4iv(this.addr,t),Ee(e,t)}}function ag(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function lg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;n.uniform2uiv(this.addr,t),Ee(e,t)}}function cg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;n.uniform3uiv(this.addr,t),Ee(e,t)}}function ug(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;n.uniform4uiv(this.addr,t),Ee(e,t)}}function hg(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?Ih:Dh;e.setTexture2D(t||s,r)}function dg(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||Nh,r)}function pg(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||Oh,r)}function fg(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||Uh,r)}function mg(n){switch(n){case 5126:return $_;case 35664:return Z_;case 35665:return J_;case 35666:return Q_;case 35674:return tg;case 35675:return eg;case 35676:return ng;case 5124:case 35670:return ig;case 35667:case 35671:return rg;case 35668:case 35672:return sg;case 35669:case 35673:return og;case 5125:return ag;case 36294:return lg;case 36295:return cg;case 36296:return ug;case 35678:case 36198:case 36298:case 36306:case 35682:return hg;case 35679:case 36299:case 36307:return dg;case 35680:case 36300:case 36308:case 36293:return pg;case 36289:case 36303:case 36311:case 36292:return fg}}function vg(n,t){n.uniform1fv(this.addr,t)}function _g(n,t){const e=br(t,this.size,2);n.uniform2fv(this.addr,e)}function gg(n,t){const e=br(t,this.size,3);n.uniform3fv(this.addr,e)}function xg(n,t){const e=br(t,this.size,4);n.uniform4fv(this.addr,e)}function bg(n,t){const e=br(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function wg(n,t){const e=br(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function yg(n,t){const e=br(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Eg(n,t){n.uniform1iv(this.addr,t)}function Mg(n,t){n.uniform2iv(this.addr,t)}function Sg(n,t){n.uniform3iv(this.addr,t)}function Tg(n,t){n.uniform4iv(this.addr,t)}function Cg(n,t){n.uniform1uiv(this.addr,t)}function Ag(n,t){n.uniform2uiv(this.addr,t)}function Pg(n,t){n.uniform3uiv(this.addr,t)}function Rg(n,t){n.uniform4uiv(this.addr,t)}function Lg(n,t,e){const i=this.cache,r=t.length,s=yo(e,r);ye(i,s)||(n.uniform1iv(this.addr,s),Ee(i,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||Dh,s[o])}function Dg(n,t,e){const i=this.cache,r=t.length,s=yo(e,r);ye(i,s)||(n.uniform1iv(this.addr,s),Ee(i,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||Nh,s[o])}function Ig(n,t,e){const i=this.cache,r=t.length,s=yo(e,r);ye(i,s)||(n.uniform1iv(this.addr,s),Ee(i,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||Oh,s[o])}function Ug(n,t,e){const i=this.cache,r=t.length,s=yo(e,r);ye(i,s)||(n.uniform1iv(this.addr,s),Ee(i,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||Uh,s[o])}function Ng(n){switch(n){case 5126:return vg;case 35664:return _g;case 35665:return gg;case 35666:return xg;case 35674:return bg;case 35675:return wg;case 35676:return yg;case 5124:case 35670:return Eg;case 35667:case 35671:return Mg;case 35668:case 35672:return Sg;case 35669:case 35673:return Tg;case 5125:return Cg;case 36294:return Ag;case 36295:return Pg;case 36296:return Rg;case 35678:case 36198:case 36298:case 36306:case 35682:return Lg;case 35679:case 36299:case 36307:return Dg;case 35680:case 36300:case 36308:case 36293:return Ig;case 36289:case 36303:case 36311:case 36292:return Ug}}class Og{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=mg(e.type)}}class Fg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Ng(e.type)}}class Bg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],i)}}}const aa=/(\w+)(\])?(\[|\.)?/g;function qc(n,t){n.seq.push(t),n.map[t.id]=t}function kg(n,t,e){const i=n.name,r=i.length;for(aa.lastIndex=0;;){const s=aa.exec(i),o=aa.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){qc(e,c===void 0?new Og(a,n,t):new Fg(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new Bg(a),qc(e,h)),e=h}}}class Js{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);kg(s,o,this)}}setValue(t,e,i,r){const s=this.map[e];s!==void 0&&s.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&i.push(o)}return i}}function Yc(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Vg=37297;let zg=0;function Hg(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}function Gg(n){const t=Qt.getPrimaries(Qt.workingColorSpace),e=Qt.getPrimaries(n);let i;switch(t===e?i="":t===ao&&e===oo?i="LinearDisplayP3ToLinearSRGB":t===oo&&e===ao&&(i="LinearSRGBToLinearDisplayP3"),n){case si:case xo:return[i,"LinearTransferOETF"];case pn:case ja:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function jc(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+Hg(n.getShaderSource(t),o)}else return r}function Wg(n,t){const e=Gg(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Xg(n,t){let e;switch(t){case Fp:e="Linear";break;case Bp:e="Reinhard";break;case kp:e="OptimizedCineon";break;case Vp:e="ACESFilmic";break;case Hp:e="AgX";break;case Gp:e="Neutral";break;case zp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function qg(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.alphaToCoverage||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(or).join(`
`)}function Yg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(or).join(`
`)}function jg(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Kg(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(t,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function or(n){return n!==""}function Kc(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function $c(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const $g=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ia(n){return n.replace($g,Jg)}const Zg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Jg(n,t){let e=Bt[t];if(e===void 0){const i=Zg.get(t);if(i!==void 0)e=Bt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ia(e)}const Qg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zc(n){return n.replace(Qg,t0)}function t0(n,t,e,i){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Jc(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	`;return n.isWebGL2&&(t+=`precision ${n.precision} sampler3D;
		precision ${n.precision} sampler2DArray;
		precision ${n.precision} sampler2DShadow;
		precision ${n.precision} samplerCubeShadow;
		precision ${n.precision} sampler2DArrayShadow;
		precision ${n.precision} isampler2D;
		precision ${n.precision} isampler3D;
		precision ${n.precision} isamplerCube;
		precision ${n.precision} isampler2DArray;
		precision ${n.precision} usampler2D;
		precision ${n.precision} usampler3D;
		precision ${n.precision} usamplerCube;
		precision ${n.precision} usampler2DArray;
		`),n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function e0(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===oh?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===hp?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Cn&&(t="SHADOWMAP_TYPE_VSM"),t}function n0(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case fr:case mr:t="ENVMAP_TYPE_CUBE";break;case go:t="ENVMAP_TYPE_CUBE_UV";break}return t}function i0(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case mr:t="ENVMAP_MODE_REFRACTION";break}return t}function r0(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ah:t="ENVMAP_BLENDING_MULTIPLY";break;case Np:t="ENVMAP_BLENDING_MIX";break;case Op:t="ENVMAP_BLENDING_ADD";break}return t}function s0(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function o0(n,t,e,i){const r=n.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=e0(e),c=n0(e),u=i0(e),h=r0(e),d=s0(e),m=e.isWebGL2?"":qg(e),v=Yg(e),x=jg(s),f=r.createProgram();let p,E,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(or).join(`
`),p.length>0&&(p+=`
`),E=[m,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(or).join(`
`),E.length>0&&(E+=`
`)):(p=[Jc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(or).join(`
`),E=[m,Jc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Zn?"#define TONE_MAPPING":"",e.toneMapping!==Zn?Bt.tonemapping_pars_fragment:"",e.toneMapping!==Zn?Xg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Bt.colorspace_pars_fragment,Wg("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(or).join(`
`)),o=Ia(o),o=Kc(o,e),o=$c(o,e),a=Ia(a),a=Kc(a,e),a=$c(a,e),o=Zc(o),a=Zc(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[v,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,E=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===fc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===fc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+E);const M=_+p+o,D=_+E+a,R=Yc(r,r.VERTEX_SHADER,M),C=Yc(r,r.FRAGMENT_SHADER,D);r.attachShader(f,R),r.attachShader(f,C),e.index0AttributeName!==void 0?r.bindAttribLocation(f,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(f,0,"position"),r.linkProgram(f);function O($){if(n.debug.checkShaderErrors){const Z=r.getProgramInfoLog(f).trim(),L=r.getShaderInfoLog(R).trim(),G=r.getShaderInfoLog(C).trim();let V=!0,Y=!0;if(r.getProgramParameter(f,r.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,f,R,C);else{const W=jc(r,R,"vertex"),X=jc(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(f,r.VALIDATE_STATUS)+`

Material Name: `+$.name+`
Material Type: `+$.type+`

Program Info Log: `+Z+`
`+W+`
`+X)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(L===""||G==="")&&(Y=!1);Y&&($.diagnostics={runnable:V,programLog:Z,vertexShader:{log:L,prefix:p},fragmentShader:{log:G,prefix:E}})}r.deleteShader(R),r.deleteShader(C),K=new Js(r,f),b=Kg(r,f)}let K;this.getUniforms=function(){return K===void 0&&O(this),K};let b;this.getAttributes=function(){return b===void 0&&O(this),b};let T=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=r.getProgramParameter(f,Vg)),T},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(f),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=zg++,this.cacheKey=t,this.usedTimes=1,this.program=f,this.vertexShader=R,this.fragmentShader=C,this}let a0=0;class l0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new c0(t),e.set(t,i)),i}}class c0{constructor(t){this.id=a0++,this.code=t,this.usedTimes=0}}function u0(n,t,e,i,r,s,o){const a=new yh,l=new l0,c=new Set,u=[],h=r.isWebGL2,d=r.logarithmicDepthBuffer,m=r.vertexTextures;let v=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(b){return c.add(b),b===0?"uv":`uv${b}`}function p(b,T,$,Z,L){const G=Z.fog,V=L.geometry,Y=b.isMeshStandardMaterial?Z.environment:null,W=(b.isMeshStandardMaterial?e:t).get(b.envMap||Y),X=W&&W.mapping===go?W.image.height:null,it=x[b.type];b.precision!==null&&(v=r.getMaxPrecision(b.precision),v!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",v,"instead."));const st=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,pt=st!==void 0?st.length:0;let At=0;V.morphAttributes.position!==void 0&&(At=1),V.morphAttributes.normal!==void 0&&(At=2),V.morphAttributes.color!==void 0&&(At=3);let z,tt,dt,Tt;if(it){const Zt=fn[it];z=Zt.vertexShader,tt=Zt.fragmentShader}else z=b.vertexShader,tt=b.fragmentShader,l.update(b),dt=l.getVertexShaderID(b),Tt=l.getFragmentShaderID(b);const xt=n.getRenderTarget(),ft=L.isInstancedMesh===!0,Yt=L.isBatchedMesh===!0,St=!!b.map,U=!!b.matcap,be=!!W,wt=!!b.aoMap,It=!!b.lightMap,yt=!!b.bumpMap,Wt=!!b.normalMap,Ut=!!b.displacementMap,Ot=!!b.emissiveMap,ne=!!b.metalnessMap,y=!!b.roughnessMap,g=b.anisotropy>0,H=b.clearcoat>0,q=b.iridescence>0,et=b.sheen>0,J=b.transmission>0,Pt=g&&!!b.anisotropyMap,Et=H&&!!b.clearcoatMap,ot=H&&!!b.clearcoatNormalMap,ct=H&&!!b.clearcoatRoughnessMap,Rt=q&&!!b.iridescenceMap,rt=q&&!!b.iridescenceThicknessMap,de=et&&!!b.sheenColorMap,Vt=et&&!!b.sheenRoughnessMap,bt=!!b.specularMap,mt=!!b.specularColorMap,_t=!!b.specularIntensityMap,S=J&&!!b.transmissionMap,j=J&&!!b.thicknessMap,vt=!!b.gradientMap,P=!!b.alphaMap,nt=b.alphaTest>0,N=!!b.alphaHash,Q=!!b.extensions;let ut=Zn;b.toneMapped&&(xt===null||xt.isXRRenderTarget===!0)&&(ut=n.toneMapping);const Gt={isWebGL2:h,shaderID:it,shaderType:b.type,shaderName:b.name,vertexShader:z,fragmentShader:tt,defines:b.defines,customVertexShaderID:dt,customFragmentShaderID:Tt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:v,batching:Yt,instancing:ft,instancingColor:ft&&L.instanceColor!==null,instancingMorph:ft&&L.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:xt===null?n.outputColorSpace:xt.isXRRenderTarget===!0?xt.texture.colorSpace:si,alphaToCoverage:!!b.alphaToCoverage,map:St,matcap:U,envMap:be,envMapMode:be&&W.mapping,envMapCubeUVHeight:X,aoMap:wt,lightMap:It,bumpMap:yt,normalMap:Wt,displacementMap:m&&Ut,emissiveMap:Ot,normalMapObjectSpace:Wt&&b.normalMapType===ef,normalMapTangentSpace:Wt&&b.normalMapType===tf,metalnessMap:ne,roughnessMap:y,anisotropy:g,anisotropyMap:Pt,clearcoat:H,clearcoatMap:Et,clearcoatNormalMap:ot,clearcoatRoughnessMap:ct,iridescence:q,iridescenceMap:Rt,iridescenceThicknessMap:rt,sheen:et,sheenColorMap:de,sheenRoughnessMap:Vt,specularMap:bt,specularColorMap:mt,specularIntensityMap:_t,transmission:J,transmissionMap:S,thicknessMap:j,gradientMap:vt,opaque:b.transparent===!1&&b.blending===lr&&b.alphaToCoverage===!1,alphaMap:P,alphaTest:nt,alphaHash:N,combine:b.combine,mapUv:St&&f(b.map.channel),aoMapUv:wt&&f(b.aoMap.channel),lightMapUv:It&&f(b.lightMap.channel),bumpMapUv:yt&&f(b.bumpMap.channel),normalMapUv:Wt&&f(b.normalMap.channel),displacementMapUv:Ut&&f(b.displacementMap.channel),emissiveMapUv:Ot&&f(b.emissiveMap.channel),metalnessMapUv:ne&&f(b.metalnessMap.channel),roughnessMapUv:y&&f(b.roughnessMap.channel),anisotropyMapUv:Pt&&f(b.anisotropyMap.channel),clearcoatMapUv:Et&&f(b.clearcoatMap.channel),clearcoatNormalMapUv:ot&&f(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ct&&f(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&f(b.iridescenceMap.channel),iridescenceThicknessMapUv:rt&&f(b.iridescenceThicknessMap.channel),sheenColorMapUv:de&&f(b.sheenColorMap.channel),sheenRoughnessMapUv:Vt&&f(b.sheenRoughnessMap.channel),specularMapUv:bt&&f(b.specularMap.channel),specularColorMapUv:mt&&f(b.specularColorMap.channel),specularIntensityMapUv:_t&&f(b.specularIntensityMap.channel),transmissionMapUv:S&&f(b.transmissionMap.channel),thicknessMapUv:j&&f(b.thicknessMap.channel),alphaMapUv:P&&f(b.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Wt||g),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!V.attributes.uv&&(St||P),fog:!!G,useFog:b.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:L.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:pt,morphTextureStride:At,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&$.length>0,shadowMapType:n.shadowMap.type,toneMapping:ut,useLegacyLights:n._useLegacyLights,decodeVideoTexture:St&&b.map.isVideoTexture===!0&&Qt.getTransfer(b.map.colorSpace)===se,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ke,flipSided:b.side===We,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionDerivatives:Q&&b.extensions.derivatives===!0,extensionFragDepth:Q&&b.extensions.fragDepth===!0,extensionDrawBuffers:Q&&b.extensions.drawBuffers===!0,extensionShaderTextureLOD:Q&&b.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Q&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:Q&&b.extensions.multiDraw===!0&&i.has("WEBGL_multi_draw"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Gt.vertexUv1s=c.has(1),Gt.vertexUv2s=c.has(2),Gt.vertexUv3s=c.has(3),c.clear(),Gt}function E(b){const T=[];if(b.shaderID?T.push(b.shaderID):(T.push(b.customVertexShaderID),T.push(b.customFragmentShaderID)),b.defines!==void 0)for(const $ in b.defines)T.push($),T.push(b.defines[$]);return b.isRawShaderMaterial===!1&&(_(T,b),M(T,b),T.push(n.outputColorSpace)),T.push(b.customProgramCacheKey),T.join()}function _(b,T){b.push(T.precision),b.push(T.outputColorSpace),b.push(T.envMapMode),b.push(T.envMapCubeUVHeight),b.push(T.mapUv),b.push(T.alphaMapUv),b.push(T.lightMapUv),b.push(T.aoMapUv),b.push(T.bumpMapUv),b.push(T.normalMapUv),b.push(T.displacementMapUv),b.push(T.emissiveMapUv),b.push(T.metalnessMapUv),b.push(T.roughnessMapUv),b.push(T.anisotropyMapUv),b.push(T.clearcoatMapUv),b.push(T.clearcoatNormalMapUv),b.push(T.clearcoatRoughnessMapUv),b.push(T.iridescenceMapUv),b.push(T.iridescenceThicknessMapUv),b.push(T.sheenColorMapUv),b.push(T.sheenRoughnessMapUv),b.push(T.specularMapUv),b.push(T.specularColorMapUv),b.push(T.specularIntensityMapUv),b.push(T.transmissionMapUv),b.push(T.thicknessMapUv),b.push(T.combine),b.push(T.fogExp2),b.push(T.sizeAttenuation),b.push(T.morphTargetsCount),b.push(T.morphAttributeCount),b.push(T.numDirLights),b.push(T.numPointLights),b.push(T.numSpotLights),b.push(T.numSpotLightMaps),b.push(T.numHemiLights),b.push(T.numRectAreaLights),b.push(T.numDirLightShadows),b.push(T.numPointLightShadows),b.push(T.numSpotLightShadows),b.push(T.numSpotLightShadowsWithMaps),b.push(T.numLightProbes),b.push(T.shadowMapType),b.push(T.toneMapping),b.push(T.numClippingPlanes),b.push(T.numClipIntersection),b.push(T.depthPacking)}function M(b,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.instancingMorph&&a.enable(4),T.matcap&&a.enable(5),T.envMap&&a.enable(6),T.normalMapObjectSpace&&a.enable(7),T.normalMapTangentSpace&&a.enable(8),T.clearcoat&&a.enable(9),T.iridescence&&a.enable(10),T.alphaTest&&a.enable(11),T.vertexColors&&a.enable(12),T.vertexAlphas&&a.enable(13),T.vertexUv1s&&a.enable(14),T.vertexUv2s&&a.enable(15),T.vertexUv3s&&a.enable(16),T.vertexTangents&&a.enable(17),T.anisotropy&&a.enable(18),T.alphaHash&&a.enable(19),T.batching&&a.enable(20),b.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.alphaToCoverage&&a.enable(20),b.push(a.mask)}function D(b){const T=x[b.type];let $;if(T){const Z=fn[T];$=Gf.clone(Z.uniforms)}else $=b.uniforms;return $}function R(b,T){let $;for(let Z=0,L=u.length;Z<L;Z++){const G=u[Z];if(G.cacheKey===T){$=G,++$.usedTimes;break}}return $===void 0&&($=new o0(n,T,b,s),u.push($)),$}function C(b){if(--b.usedTimes===0){const T=u.indexOf(b);u[T]=u[u.length-1],u.pop(),b.destroy()}}function O(b){l.remove(b)}function K(){l.dispose()}return{getParameters:p,getProgramCacheKey:E,getUniforms:D,acquireProgram:R,releaseProgram:C,releaseShaderCache:O,programs:u,dispose:K}}function h0(){let n=new WeakMap;function t(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function e(s){n.delete(s)}function i(s,o,a){n.get(s)[o]=a}function r(){n=new WeakMap}return{get:t,remove:e,update:i,dispose:r}}function d0(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Qc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function tu(){const n=[];let t=0;const e=[],i=[],r=[];function s(){t=0,e.length=0,i.length=0,r.length=0}function o(h,d,m,v,x,f){let p=n[t];return p===void 0?(p={id:h.id,object:h,geometry:d,material:m,groupOrder:v,renderOrder:h.renderOrder,z:x,group:f},n[t]=p):(p.id=h.id,p.object=h,p.geometry=d,p.material=m,p.groupOrder=v,p.renderOrder=h.renderOrder,p.z=x,p.group=f),t++,p}function a(h,d,m,v,x,f){const p=o(h,d,m,v,x,f);m.transmission>0?i.push(p):m.transparent===!0?r.push(p):e.push(p)}function l(h,d,m,v,x,f){const p=o(h,d,m,v,x,f);m.transmission>0?i.unshift(p):m.transparent===!0?r.unshift(p):e.unshift(p)}function c(h,d){e.length>1&&e.sort(h||d0),i.length>1&&i.sort(d||Qc),r.length>1&&r.sort(d||Qc)}function u(){for(let h=t,d=n.length;h<d;h++){const m=n[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function p0(){let n=new WeakMap;function t(i,r){const s=n.get(i);let o;return s===void 0?(o=new tu,n.set(i,[o])):r>=s.length?(o=new tu,s.push(o)):o=s[r],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function f0(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new A,color:new Xt};break;case"SpotLight":e={position:new A,direction:new A,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":e={color:new Xt,position:new A,halfWidth:new A,halfHeight:new A};break}return n[t.id]=e,e}}}function m0(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let v0=0;function _0(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function g0(n,t){const e=new f0,i=m0(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new A);const s=new A,o=new ae,a=new ae;function l(u,h){let d=0,m=0,v=0;for(let $=0;$<9;$++)r.probe[$].set(0,0,0);let x=0,f=0,p=0,E=0,_=0,M=0,D=0,R=0,C=0,O=0,K=0;u.sort(_0);const b=h===!0?Math.PI:1;for(let $=0,Z=u.length;$<Z;$++){const L=u[$],G=L.color,V=L.intensity,Y=L.distance,W=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)d+=G.r*V*b,m+=G.g*V*b,v+=G.b*V*b;else if(L.isLightProbe){for(let X=0;X<9;X++)r.probe[X].addScaledVector(L.sh.coefficients[X],V);K++}else if(L.isDirectionalLight){const X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity*b),L.castShadow){const it=L.shadow,st=i.get(L);st.shadowBias=it.bias,st.shadowNormalBias=it.normalBias,st.shadowRadius=it.radius,st.shadowMapSize=it.mapSize,r.directionalShadow[x]=st,r.directionalShadowMap[x]=W,r.directionalShadowMatrix[x]=L.shadow.matrix,M++}r.directional[x]=X,x++}else if(L.isSpotLight){const X=e.get(L);X.position.setFromMatrixPosition(L.matrixWorld),X.color.copy(G).multiplyScalar(V*b),X.distance=Y,X.coneCos=Math.cos(L.angle),X.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),X.decay=L.decay,r.spot[p]=X;const it=L.shadow;if(L.map&&(r.spotLightMap[C]=L.map,C++,it.updateMatrices(L),L.castShadow&&O++),r.spotLightMatrix[p]=it.matrix,L.castShadow){const st=i.get(L);st.shadowBias=it.bias,st.shadowNormalBias=it.normalBias,st.shadowRadius=it.radius,st.shadowMapSize=it.mapSize,r.spotShadow[p]=st,r.spotShadowMap[p]=W,R++}p++}else if(L.isRectAreaLight){const X=e.get(L);X.color.copy(G).multiplyScalar(V),X.halfWidth.set(L.width*.5,0,0),X.halfHeight.set(0,L.height*.5,0),r.rectArea[E]=X,E++}else if(L.isPointLight){const X=e.get(L);if(X.color.copy(L.color).multiplyScalar(L.intensity*b),X.distance=L.distance,X.decay=L.decay,L.castShadow){const it=L.shadow,st=i.get(L);st.shadowBias=it.bias,st.shadowNormalBias=it.normalBias,st.shadowRadius=it.radius,st.shadowMapSize=it.mapSize,st.shadowCameraNear=it.camera.near,st.shadowCameraFar=it.camera.far,r.pointShadow[f]=st,r.pointShadowMap[f]=W,r.pointShadowMatrix[f]=L.shadow.matrix,D++}r.point[f]=X,f++}else if(L.isHemisphereLight){const X=e.get(L);X.skyColor.copy(L.color).multiplyScalar(V*b),X.groundColor.copy(L.groundColor).multiplyScalar(V*b),r.hemi[_]=X,_++}}E>0&&(t.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=at.LTC_FLOAT_1,r.rectAreaLTC2=at.LTC_FLOAT_2):(r.rectAreaLTC1=at.LTC_HALF_1,r.rectAreaLTC2=at.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=at.LTC_FLOAT_1,r.rectAreaLTC2=at.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=at.LTC_HALF_1,r.rectAreaLTC2=at.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=m,r.ambient[2]=v;const T=r.hash;(T.directionalLength!==x||T.pointLength!==f||T.spotLength!==p||T.rectAreaLength!==E||T.hemiLength!==_||T.numDirectionalShadows!==M||T.numPointShadows!==D||T.numSpotShadows!==R||T.numSpotMaps!==C||T.numLightProbes!==K)&&(r.directional.length=x,r.spot.length=p,r.rectArea.length=E,r.point.length=f,r.hemi.length=_,r.directionalShadow.length=M,r.directionalShadowMap.length=M,r.pointShadow.length=D,r.pointShadowMap.length=D,r.spotShadow.length=R,r.spotShadowMap.length=R,r.directionalShadowMatrix.length=M,r.pointShadowMatrix.length=D,r.spotLightMatrix.length=R+C-O,r.spotLightMap.length=C,r.numSpotLightShadowsWithMaps=O,r.numLightProbes=K,T.directionalLength=x,T.pointLength=f,T.spotLength=p,T.rectAreaLength=E,T.hemiLength=_,T.numDirectionalShadows=M,T.numPointShadows=D,T.numSpotShadows=R,T.numSpotMaps=C,T.numLightProbes=K,r.version=v0++)}function c(u,h){let d=0,m=0,v=0,x=0,f=0;const p=h.matrixWorldInverse;for(let E=0,_=u.length;E<_;E++){const M=u[E];if(M.isDirectionalLight){const D=r.directional[d];D.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),D.direction.sub(s),D.direction.transformDirection(p),d++}else if(M.isSpotLight){const D=r.spot[v];D.position.setFromMatrixPosition(M.matrixWorld),D.position.applyMatrix4(p),D.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),D.direction.sub(s),D.direction.transformDirection(p),v++}else if(M.isRectAreaLight){const D=r.rectArea[x];D.position.setFromMatrixPosition(M.matrixWorld),D.position.applyMatrix4(p),a.identity(),o.copy(M.matrixWorld),o.premultiply(p),a.extractRotation(o),D.halfWidth.set(M.width*.5,0,0),D.halfHeight.set(0,M.height*.5,0),D.halfWidth.applyMatrix4(a),D.halfHeight.applyMatrix4(a),x++}else if(M.isPointLight){const D=r.point[m];D.position.setFromMatrixPosition(M.matrixWorld),D.position.applyMatrix4(p),m++}else if(M.isHemisphereLight){const D=r.hemi[f];D.direction.setFromMatrixPosition(M.matrixWorld),D.direction.transformDirection(p),f++}}}return{setup:l,setupView:c,state:r}}function eu(n,t){const e=new g0(n,t),i=[],r=[];function s(){i.length=0,r.length=0}function o(h){i.push(h)}function a(h){r.push(h)}function l(h){e.setup(i,h)}function c(h){e.setupView(i,h)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:e},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function x0(n,t){let e=new WeakMap;function i(s,o=0){const a=e.get(s);let l;return a===void 0?(l=new eu(n,t),e.set(s,[l])):o>=a.length?(l=new eu(n,t),a.push(l)):l=a[o],l}function r(){e=new WeakMap}return{get:i,dispose:r}}class b0 extends Di{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Jp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class w0 extends Di{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const y0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,E0=`uniform sampler2D shadow_pass;
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
}`;function M0(n,t,e){let i=new Ph;const r=new lt,s=new lt,o=new Ae,a=new b0({depthPacking:Qp}),l=new w0,c={},u=e.maxTextureSize,h={[ei]:We,[We]:ei,[Ke]:Ke},d=new ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new lt},radius:{value:4}},vertexShader:y0,fragmentShader:E0}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const v=new _e;v.setAttribute("position",new dn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Oe(v,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=oh;let p=this.type;this.render=function(R,C,O){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||R.length===0)return;const K=n.getRenderTarget(),b=n.getActiveCubeFace(),T=n.getActiveMipmapLevel(),$=n.state;$.setBlending($n),$.buffers.color.setClear(1,1,1,1),$.buffers.depth.setTest(!0),$.setScissorTest(!1);const Z=p!==Cn&&this.type===Cn,L=p===Cn&&this.type!==Cn;for(let G=0,V=R.length;G<V;G++){const Y=R[G],W=Y.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);const X=W.getFrameExtents();if(r.multiply(X),s.copy(W.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/X.x),r.x=s.x*X.x,W.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/X.y),r.y=s.y*X.y,W.mapSize.y=s.y)),W.map===null||Z===!0||L===!0){const st=this.type!==Cn?{minFilter:Ne,magFilter:Ne}:{};W.map!==null&&W.map.dispose(),W.map=new Si(r.x,r.y,st),W.map.texture.name=Y.name+".shadowMap",W.camera.updateProjectionMatrix()}n.setRenderTarget(W.map),n.clear();const it=W.getViewportCount();for(let st=0;st<it;st++){const pt=W.getViewport(st);o.set(s.x*pt.x,s.y*pt.y,s.x*pt.z,s.y*pt.w),$.viewport(o),W.updateMatrices(Y,st),i=W.getFrustum(),M(C,O,W.camera,Y,this.type)}W.isPointLightShadow!==!0&&this.type===Cn&&E(W,O),W.needsUpdate=!1}p=this.type,f.needsUpdate=!1,n.setRenderTarget(K,b,T)};function E(R,C){const O=t.update(x);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Si(r.x,r.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(C,null,O,d,x,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(C,null,O,m,x,null)}function _(R,C,O,K){let b=null;const T=O.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(T!==void 0)b=T;else if(b=O.isPointLight===!0?l:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const $=b.uuid,Z=C.uuid;let L=c[$];L===void 0&&(L={},c[$]=L);let G=L[Z];G===void 0&&(G=b.clone(),L[Z]=G,C.addEventListener("dispose",D)),b=G}if(b.visible=C.visible,b.wireframe=C.wireframe,K===Cn?b.side=C.shadowSide!==null?C.shadowSide:C.side:b.side=C.shadowSide!==null?C.shadowSide:h[C.side],b.alphaMap=C.alphaMap,b.alphaTest=C.alphaTest,b.map=C.map,b.clipShadows=C.clipShadows,b.clippingPlanes=C.clippingPlanes,b.clipIntersection=C.clipIntersection,b.displacementMap=C.displacementMap,b.displacementScale=C.displacementScale,b.displacementBias=C.displacementBias,b.wireframeLinewidth=C.wireframeLinewidth,b.linewidth=C.linewidth,O.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const $=n.properties.get(b);$.light=O}return b}function M(R,C,O,K,b){if(R.visible===!1)return;if(R.layers.test(C.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&b===Cn)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,R.matrixWorld);const Z=t.update(R),L=R.material;if(Array.isArray(L)){const G=Z.groups;for(let V=0,Y=G.length;V<Y;V++){const W=G[V],X=L[W.materialIndex];if(X&&X.visible){const it=_(R,X,K,b);R.onBeforeShadow(n,R,C,O,Z,it,W),n.renderBufferDirect(O,null,Z,it,R,W),R.onAfterShadow(n,R,C,O,Z,it,W)}}}else if(L.visible){const G=_(R,L,K,b);R.onBeforeShadow(n,R,C,O,Z,G,null),n.renderBufferDirect(O,null,Z,G,R,null),R.onAfterShadow(n,R,C,O,Z,G,null)}}const $=R.children;for(let Z=0,L=$.length;Z<L;Z++)M($[Z],C,O,K,b)}function D(R){R.target.removeEventListener("dispose",D);for(const O in c){const K=c[O],b=R.target.uuid;b in K&&(K[b].dispose(),delete K[b])}}}function S0(n,t,e){const i=e.isWebGL2;function r(){let P=!1;const nt=new Ae;let N=null;const Q=new Ae(0,0,0,0);return{setMask:function(ut){N!==ut&&!P&&(n.colorMask(ut,ut,ut,ut),N=ut)},setLocked:function(ut){P=ut},setClear:function(ut,Gt,Zt,te,pe){pe===!0&&(ut*=te,Gt*=te,Zt*=te),nt.set(ut,Gt,Zt,te),Q.equals(nt)===!1&&(n.clearColor(ut,Gt,Zt,te),Q.copy(nt))},reset:function(){P=!1,N=null,Q.set(-1,0,0,0)}}}function s(){let P=!1,nt=null,N=null,Q=null;return{setTest:function(ut){ut?ft(n.DEPTH_TEST):Yt(n.DEPTH_TEST)},setMask:function(ut){nt!==ut&&!P&&(n.depthMask(ut),nt=ut)},setFunc:function(ut){if(N!==ut){switch(ut){case Ap:n.depthFunc(n.NEVER);break;case Pp:n.depthFunc(n.ALWAYS);break;case Rp:n.depthFunc(n.LESS);break;case ro:n.depthFunc(n.LEQUAL);break;case Lp:n.depthFunc(n.EQUAL);break;case Dp:n.depthFunc(n.GEQUAL);break;case Ip:n.depthFunc(n.GREATER);break;case Up:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}N=ut}},setLocked:function(ut){P=ut},setClear:function(ut){Q!==ut&&(n.clearDepth(ut),Q=ut)},reset:function(){P=!1,nt=null,N=null,Q=null}}}function o(){let P=!1,nt=null,N=null,Q=null,ut=null,Gt=null,Zt=null,te=null,pe=null;return{setTest:function(jt){P||(jt?ft(n.STENCIL_TEST):Yt(n.STENCIL_TEST))},setMask:function(jt){nt!==jt&&!P&&(n.stencilMask(jt),nt=jt)},setFunc:function(jt,ie,Pe){(N!==jt||Q!==ie||ut!==Pe)&&(n.stencilFunc(jt,ie,Pe),N=jt,Q=ie,ut=Pe)},setOp:function(jt,ie,Pe){(Gt!==jt||Zt!==ie||te!==Pe)&&(n.stencilOp(jt,ie,Pe),Gt=jt,Zt=ie,te=Pe)},setLocked:function(jt){P=jt},setClear:function(jt){pe!==jt&&(n.clearStencil(jt),pe=jt)},reset:function(){P=!1,nt=null,N=null,Q=null,ut=null,Gt=null,Zt=null,te=null,pe=null}}}const a=new r,l=new s,c=new o,u=new WeakMap,h=new WeakMap;let d={},m={},v=new WeakMap,x=[],f=null,p=!1,E=null,_=null,M=null,D=null,R=null,C=null,O=null,K=new Xt(0,0,0),b=0,T=!1,$=null,Z=null,L=null,G=null,V=null;const Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,X=0;const it=n.getParameter(n.VERSION);it.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(it)[1]),W=X>=1):it.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(it)[1]),W=X>=2);let st=null,pt={};const At=n.getParameter(n.SCISSOR_BOX),z=n.getParameter(n.VIEWPORT),tt=new Ae().fromArray(At),dt=new Ae().fromArray(z);function Tt(P,nt,N,Q){const ut=new Uint8Array(4),Gt=n.createTexture();n.bindTexture(P,Gt),n.texParameteri(P,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(P,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Zt=0;Zt<N;Zt++)i&&(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)?n.texImage3D(nt,0,n.RGBA,1,1,Q,0,n.RGBA,n.UNSIGNED_BYTE,ut):n.texImage2D(nt+Zt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ut);return Gt}const xt={};xt[n.TEXTURE_2D]=Tt(n.TEXTURE_2D,n.TEXTURE_2D,1),xt[n.TEXTURE_CUBE_MAP]=Tt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(xt[n.TEXTURE_2D_ARRAY]=Tt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),xt[n.TEXTURE_3D]=Tt(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),ft(n.DEPTH_TEST),l.setFunc(ro),Ut(!1),Ot(Nl),ft(n.CULL_FACE),yt($n);function ft(P){d[P]!==!0&&(n.enable(P),d[P]=!0)}function Yt(P){d[P]!==!1&&(n.disable(P),d[P]=!1)}function St(P,nt){return m[P]!==nt?(n.bindFramebuffer(P,nt),m[P]=nt,i&&(P===n.DRAW_FRAMEBUFFER&&(m[n.FRAMEBUFFER]=nt),P===n.FRAMEBUFFER&&(m[n.DRAW_FRAMEBUFFER]=nt)),!0):!1}function U(P,nt){let N=x,Q=!1;if(P){N=v.get(nt),N===void 0&&(N=[],v.set(nt,N));const ut=P.textures;if(N.length!==ut.length||N[0]!==n.COLOR_ATTACHMENT0){for(let Gt=0,Zt=ut.length;Gt<Zt;Gt++)N[Gt]=n.COLOR_ATTACHMENT0+Gt;N.length=ut.length,Q=!0}}else N[0]!==n.BACK&&(N[0]=n.BACK,Q=!0);if(Q)if(e.isWebGL2)n.drawBuffers(N);else if(t.has("WEBGL_draw_buffers")===!0)t.get("WEBGL_draw_buffers").drawBuffersWEBGL(N);else throw new Error("THREE.WebGLState: Usage of gl.drawBuffers() require WebGL2 or WEBGL_draw_buffers extension")}function be(P){return f!==P?(n.useProgram(P),f=P,!0):!1}const wt={[_i]:n.FUNC_ADD,[pp]:n.FUNC_SUBTRACT,[fp]:n.FUNC_REVERSE_SUBTRACT};if(i)wt[kl]=n.MIN,wt[Vl]=n.MAX;else{const P=t.get("EXT_blend_minmax");P!==null&&(wt[kl]=P.MIN_EXT,wt[Vl]=P.MAX_EXT)}const It={[mp]:n.ZERO,[vp]:n.ONE,[_p]:n.SRC_COLOR,[Ma]:n.SRC_ALPHA,[Ep]:n.SRC_ALPHA_SATURATE,[wp]:n.DST_COLOR,[xp]:n.DST_ALPHA,[gp]:n.ONE_MINUS_SRC_COLOR,[Sa]:n.ONE_MINUS_SRC_ALPHA,[yp]:n.ONE_MINUS_DST_COLOR,[bp]:n.ONE_MINUS_DST_ALPHA,[Mp]:n.CONSTANT_COLOR,[Sp]:n.ONE_MINUS_CONSTANT_COLOR,[Tp]:n.CONSTANT_ALPHA,[Cp]:n.ONE_MINUS_CONSTANT_ALPHA};function yt(P,nt,N,Q,ut,Gt,Zt,te,pe,jt){if(P===$n){p===!0&&(Yt(n.BLEND),p=!1);return}if(p===!1&&(ft(n.BLEND),p=!0),P!==dp){if(P!==E||jt!==T){if((_!==_i||R!==_i)&&(n.blendEquation(n.FUNC_ADD),_=_i,R=_i),jt)switch(P){case lr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ol:n.blendFunc(n.ONE,n.ONE);break;case Fl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Bl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case lr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ol:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Fl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Bl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}M=null,D=null,C=null,O=null,K.set(0,0,0),b=0,E=P,T=jt}return}ut=ut||nt,Gt=Gt||N,Zt=Zt||Q,(nt!==_||ut!==R)&&(n.blendEquationSeparate(wt[nt],wt[ut]),_=nt,R=ut),(N!==M||Q!==D||Gt!==C||Zt!==O)&&(n.blendFuncSeparate(It[N],It[Q],It[Gt],It[Zt]),M=N,D=Q,C=Gt,O=Zt),(te.equals(K)===!1||pe!==b)&&(n.blendColor(te.r,te.g,te.b,pe),K.copy(te),b=pe),E=P,T=!1}function Wt(P,nt){P.side===Ke?Yt(n.CULL_FACE):ft(n.CULL_FACE);let N=P.side===We;nt&&(N=!N),Ut(N),P.blending===lr&&P.transparent===!1?yt($n):yt(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),l.setFunc(P.depthFunc),l.setTest(P.depthTest),l.setMask(P.depthWrite),a.setMask(P.colorWrite);const Q=P.stencilWrite;c.setTest(Q),Q&&(c.setMask(P.stencilWriteMask),c.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),c.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),y(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?ft(n.SAMPLE_ALPHA_TO_COVERAGE):Yt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ut(P){$!==P&&(P?n.frontFace(n.CW):n.frontFace(n.CCW),$=P)}function Ot(P){P!==cp?(ft(n.CULL_FACE),P!==Z&&(P===Nl?n.cullFace(n.BACK):P===up?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Yt(n.CULL_FACE),Z=P}function ne(P){P!==L&&(W&&n.lineWidth(P),L=P)}function y(P,nt,N){P?(ft(n.POLYGON_OFFSET_FILL),(G!==nt||V!==N)&&(n.polygonOffset(nt,N),G=nt,V=N)):Yt(n.POLYGON_OFFSET_FILL)}function g(P){P?ft(n.SCISSOR_TEST):Yt(n.SCISSOR_TEST)}function H(P){P===void 0&&(P=n.TEXTURE0+Y-1),st!==P&&(n.activeTexture(P),st=P)}function q(P,nt,N){N===void 0&&(st===null?N=n.TEXTURE0+Y-1:N=st);let Q=pt[N];Q===void 0&&(Q={type:void 0,texture:void 0},pt[N]=Q),(Q.type!==P||Q.texture!==nt)&&(st!==N&&(n.activeTexture(N),st=N),n.bindTexture(P,nt||xt[P]),Q.type=P,Q.texture=nt)}function et(){const P=pt[st];P!==void 0&&P.type!==void 0&&(n.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function J(){try{n.compressedTexImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Pt(){try{n.compressedTexImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Et(){try{n.texSubImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ot(){try{n.texSubImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ct(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Rt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function rt(){try{n.texStorage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function de(){try{n.texStorage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Vt(){try{n.texImage2D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function bt(){try{n.texImage3D.apply(n,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function mt(P){tt.equals(P)===!1&&(n.scissor(P.x,P.y,P.z,P.w),tt.copy(P))}function _t(P){dt.equals(P)===!1&&(n.viewport(P.x,P.y,P.z,P.w),dt.copy(P))}function S(P,nt){let N=h.get(nt);N===void 0&&(N=new WeakMap,h.set(nt,N));let Q=N.get(P);Q===void 0&&(Q=n.getUniformBlockIndex(nt,P.name),N.set(P,Q))}function j(P,nt){const Q=h.get(nt).get(P);u.get(nt)!==Q&&(n.uniformBlockBinding(nt,Q,P.__bindingPointIndex),u.set(nt,Q))}function vt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},st=null,pt={},m={},v=new WeakMap,x=[],f=null,p=!1,E=null,_=null,M=null,D=null,R=null,C=null,O=null,K=new Xt(0,0,0),b=0,T=!1,$=null,Z=null,L=null,G=null,V=null,tt.set(0,0,n.canvas.width,n.canvas.height),dt.set(0,0,n.canvas.width,n.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:ft,disable:Yt,bindFramebuffer:St,drawBuffers:U,useProgram:be,setBlending:yt,setMaterial:Wt,setFlipSided:Ut,setCullFace:Ot,setLineWidth:ne,setPolygonOffset:y,setScissorTest:g,activeTexture:H,bindTexture:q,unbindTexture:et,compressedTexImage2D:J,compressedTexImage3D:Pt,texImage2D:Vt,texImage3D:bt,updateUBOMapping:S,uniformBlockBinding:j,texStorage2D:rt,texStorage3D:de,texSubImage2D:Et,texSubImage3D:ot,compressedTexSubImage2D:ct,compressedTexSubImage3D:Rt,scissor:mt,viewport:_t,reset:vt}}function T0(n,t,e,i,r,s,o){const a=r.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new lt,h=new WeakMap;let d;const m=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(y,g){return v?new OffscreenCanvas(y,g):uo("canvas")}function f(y,g,H,q){let et=1;const J=ne(y);if((J.width>q||J.height>q)&&(et=q/Math.max(J.width,J.height)),et<1||g===!0)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const Pt=g?co:Math.floor,Et=Pt(et*J.width),ot=Pt(et*J.height);d===void 0&&(d=x(Et,ot));const ct=H?x(Et,ot):d;return ct.width=Et,ct.height=ot,ct.getContext("2d").drawImage(y,0,0,Et,ot),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+Et+"x"+ot+")."),ct}else return"data"in y&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),y;return y}function p(y){const g=ne(y);return Da(g.width)&&Da(g.height)}function E(y){return a?!1:y.wrapS!==ln||y.wrapT!==ln||y.minFilter!==Ne&&y.minFilter!==ze}function _(y,g){return y.generateMipmaps&&g&&y.minFilter!==Ne&&y.minFilter!==ze}function M(y){n.generateMipmap(y)}function D(y,g,H,q,et=!1){if(a===!1)return g;if(y!==null){if(n[y]!==void 0)return n[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let J=g;if(g===n.RED&&(H===n.FLOAT&&(J=n.R32F),H===n.HALF_FLOAT&&(J=n.R16F),H===n.UNSIGNED_BYTE&&(J=n.R8)),g===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(J=n.R8UI),H===n.UNSIGNED_SHORT&&(J=n.R16UI),H===n.UNSIGNED_INT&&(J=n.R32UI),H===n.BYTE&&(J=n.R8I),H===n.SHORT&&(J=n.R16I),H===n.INT&&(J=n.R32I)),g===n.RG&&(H===n.FLOAT&&(J=n.RG32F),H===n.HALF_FLOAT&&(J=n.RG16F),H===n.UNSIGNED_BYTE&&(J=n.RG8)),g===n.RG_INTEGER&&(H===n.UNSIGNED_BYTE&&(J=n.RG8UI),H===n.UNSIGNED_SHORT&&(J=n.RG16UI),H===n.UNSIGNED_INT&&(J=n.RG32UI),H===n.BYTE&&(J=n.RG8I),H===n.SHORT&&(J=n.RG16I),H===n.INT&&(J=n.RG32I)),g===n.RGBA){const Pt=et?so:Qt.getTransfer(q);H===n.FLOAT&&(J=n.RGBA32F),H===n.HALF_FLOAT&&(J=n.RGBA16F),H===n.UNSIGNED_BYTE&&(J=Pt===se?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT_4_4_4_4&&(J=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(J=n.RGB5_A1)}return(J===n.R16F||J===n.R32F||J===n.RG16F||J===n.RG32F||J===n.RGBA16F||J===n.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function R(y,g,H){return _(y,H)===!0||y.isFramebufferTexture&&y.minFilter!==Ne&&y.minFilter!==ze?Math.log2(Math.max(g.width,g.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?g.mipmaps.length:1}function C(y){return y===Ne||y===zl||y===Tr?n.NEAREST:n.LINEAR}function O(y){const g=y.target;g.removeEventListener("dispose",O),b(g),g.isVideoTexture&&h.delete(g)}function K(y){const g=y.target;g.removeEventListener("dispose",K),$(g)}function b(y){const g=i.get(y);if(g.__webglInit===void 0)return;const H=y.source,q=m.get(H);if(q){const et=q[g.__cacheKey];et.usedTimes--,et.usedTimes===0&&T(y),Object.keys(q).length===0&&m.delete(H)}i.remove(y)}function T(y){const g=i.get(y);n.deleteTexture(g.__webglTexture);const H=y.source,q=m.get(H);delete q[g.__cacheKey],o.memory.textures--}function $(y){const g=i.get(y);if(y.depthTexture&&y.depthTexture.dispose(),y.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(g.__webglFramebuffer[q]))for(let et=0;et<g.__webglFramebuffer[q].length;et++)n.deleteFramebuffer(g.__webglFramebuffer[q][et]);else n.deleteFramebuffer(g.__webglFramebuffer[q]);g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer[q])}else{if(Array.isArray(g.__webglFramebuffer))for(let q=0;q<g.__webglFramebuffer.length;q++)n.deleteFramebuffer(g.__webglFramebuffer[q]);else n.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&n.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let q=0;q<g.__webglColorRenderbuffer.length;q++)g.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(g.__webglColorRenderbuffer[q]);g.__webglDepthRenderbuffer&&n.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const H=y.textures;for(let q=0,et=H.length;q<et;q++){const J=i.get(H[q]);J.__webglTexture&&(n.deleteTexture(J.__webglTexture),o.memory.textures--),i.remove(H[q])}i.remove(y)}let Z=0;function L(){Z=0}function G(){const y=Z;return y>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+r.maxTextures),Z+=1,y}function V(y){const g=[];return g.push(y.wrapS),g.push(y.wrapT),g.push(y.wrapR||0),g.push(y.magFilter),g.push(y.minFilter),g.push(y.anisotropy),g.push(y.internalFormat),g.push(y.format),g.push(y.type),g.push(y.generateMipmaps),g.push(y.premultiplyAlpha),g.push(y.flipY),g.push(y.unpackAlignment),g.push(y.colorSpace),g.join()}function Y(y,g){const H=i.get(y);if(y.isVideoTexture&&Ut(y),y.isRenderTargetTexture===!1&&y.version>0&&H.__version!==y.version){const q=y.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{dt(H,y,g);return}}e.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+g)}function W(y,g){const H=i.get(y);if(y.version>0&&H.__version!==y.version){dt(H,y,g);return}e.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+g)}function X(y,g){const H=i.get(y);if(y.version>0&&H.__version!==y.version){dt(H,y,g);return}e.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+g)}function it(y,g){const H=i.get(y);if(y.version>0&&H.__version!==y.version){Tt(H,y,g);return}e.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+g)}const st={[Aa]:n.REPEAT,[ln]:n.CLAMP_TO_EDGE,[Pa]:n.MIRRORED_REPEAT},pt={[Ne]:n.NEAREST,[zl]:n.NEAREST_MIPMAP_NEAREST,[Tr]:n.NEAREST_MIPMAP_LINEAR,[ze]:n.LINEAR,[Do]:n.LINEAR_MIPMAP_NEAREST,[bi]:n.LINEAR_MIPMAP_LINEAR},At={[nf]:n.NEVER,[cf]:n.ALWAYS,[rf]:n.LESS,[vh]:n.LEQUAL,[sf]:n.EQUAL,[lf]:n.GEQUAL,[of]:n.GREATER,[af]:n.NOTEQUAL};function z(y,g,H){if(g.type===An&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===ze||g.magFilter===Do||g.magFilter===Tr||g.magFilter===bi||g.minFilter===ze||g.minFilter===Do||g.minFilter===Tr||g.minFilter===bi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),H?(n.texParameteri(y,n.TEXTURE_WRAP_S,st[g.wrapS]),n.texParameteri(y,n.TEXTURE_WRAP_T,st[g.wrapT]),(y===n.TEXTURE_3D||y===n.TEXTURE_2D_ARRAY)&&n.texParameteri(y,n.TEXTURE_WRAP_R,st[g.wrapR]),n.texParameteri(y,n.TEXTURE_MAG_FILTER,pt[g.magFilter]),n.texParameteri(y,n.TEXTURE_MIN_FILTER,pt[g.minFilter])):(n.texParameteri(y,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(y,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(y===n.TEXTURE_3D||y===n.TEXTURE_2D_ARRAY)&&n.texParameteri(y,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(g.wrapS!==ln||g.wrapT!==ln)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(y,n.TEXTURE_MAG_FILTER,C(g.magFilter)),n.texParameteri(y,n.TEXTURE_MIN_FILTER,C(g.minFilter)),g.minFilter!==Ne&&g.minFilter!==ze&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),g.compareFunction&&(n.texParameteri(y,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(y,n.TEXTURE_COMPARE_FUNC,At[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Ne||g.minFilter!==Tr&&g.minFilter!==bi||g.type===An&&t.has("OES_texture_float_linear")===!1||a===!1&&g.type===Xr&&t.has("OES_texture_half_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){const q=t.get("EXT_texture_filter_anisotropic");n.texParameterf(y,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function tt(y,g){let H=!1;y.__webglInit===void 0&&(y.__webglInit=!0,g.addEventListener("dispose",O));const q=g.source;let et=m.get(q);et===void 0&&(et={},m.set(q,et));const J=V(g);if(J!==y.__cacheKey){et[J]===void 0&&(et[J]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,H=!0),et[J].usedTimes++;const Pt=et[y.__cacheKey];Pt!==void 0&&(et[y.__cacheKey].usedTimes--,Pt.usedTimes===0&&T(g)),y.__cacheKey=J,y.__webglTexture=et[J].texture}return H}function dt(y,g,H){let q=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&(q=n.TEXTURE_3D);const et=tt(y,g),J=g.source;e.bindTexture(q,y.__webglTexture,n.TEXTURE0+H);const Pt=i.get(J);if(J.version!==Pt.__version||et===!0){e.activeTexture(n.TEXTURE0+H);const Et=Qt.getPrimaries(Qt.workingColorSpace),ot=g.colorSpace===qn?null:Qt.getPrimaries(g.colorSpace),ct=g.colorSpace===qn||Et===ot?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct);const Rt=E(g)&&p(g.image)===!1;let rt=f(g.image,Rt,!1,r.maxTextureSize);rt=Ot(g,rt);const de=p(rt)||a,Vt=s.convert(g.format,g.colorSpace);let bt=s.convert(g.type),mt=D(g.internalFormat,Vt,bt,g.colorSpace,g.isVideoTexture);z(q,g,de);let _t;const S=g.mipmaps,j=a&&g.isVideoTexture!==!0&&mt!==mh,vt=Pt.__version===void 0||et===!0,P=J.dataReady,nt=R(g,rt,de);if(g.isDepthTexture)mt=n.DEPTH_COMPONENT,a?g.type===An?mt=n.DEPTH_COMPONENT32F:g.type===jn?mt=n.DEPTH_COMPONENT24:g.type===wi?mt=n.DEPTH24_STENCIL8:mt=n.DEPTH_COMPONENT16:g.type===An&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),g.format===yi&&mt===n.DEPTH_COMPONENT&&g.type!==Ya&&g.type!==jn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),g.type=jn,bt=s.convert(g.type)),g.format===vr&&mt===n.DEPTH_COMPONENT&&(mt=n.DEPTH_STENCIL,g.type!==wi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),g.type=wi,bt=s.convert(g.type))),vt&&(j?e.texStorage2D(n.TEXTURE_2D,1,mt,rt.width,rt.height):e.texImage2D(n.TEXTURE_2D,0,mt,rt.width,rt.height,0,Vt,bt,null));else if(g.isDataTexture)if(S.length>0&&de){j&&vt&&e.texStorage2D(n.TEXTURE_2D,nt,mt,S[0].width,S[0].height);for(let N=0,Q=S.length;N<Q;N++)_t=S[N],j?P&&e.texSubImage2D(n.TEXTURE_2D,N,0,0,_t.width,_t.height,Vt,bt,_t.data):e.texImage2D(n.TEXTURE_2D,N,mt,_t.width,_t.height,0,Vt,bt,_t.data);g.generateMipmaps=!1}else j?(vt&&e.texStorage2D(n.TEXTURE_2D,nt,mt,rt.width,rt.height),P&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,rt.width,rt.height,Vt,bt,rt.data)):e.texImage2D(n.TEXTURE_2D,0,mt,rt.width,rt.height,0,Vt,bt,rt.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){j&&vt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,nt,mt,S[0].width,S[0].height,rt.depth);for(let N=0,Q=S.length;N<Q;N++)_t=S[N],g.format!==cn?Vt!==null?j?P&&e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,N,0,0,0,_t.width,_t.height,rt.depth,Vt,_t.data,0,0):e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,N,mt,_t.width,_t.height,rt.depth,0,_t.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):j?P&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,N,0,0,0,_t.width,_t.height,rt.depth,Vt,bt,_t.data):e.texImage3D(n.TEXTURE_2D_ARRAY,N,mt,_t.width,_t.height,rt.depth,0,Vt,bt,_t.data)}else{j&&vt&&e.texStorage2D(n.TEXTURE_2D,nt,mt,S[0].width,S[0].height);for(let N=0,Q=S.length;N<Q;N++)_t=S[N],g.format!==cn?Vt!==null?j?P&&e.compressedTexSubImage2D(n.TEXTURE_2D,N,0,0,_t.width,_t.height,Vt,_t.data):e.compressedTexImage2D(n.TEXTURE_2D,N,mt,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):j?P&&e.texSubImage2D(n.TEXTURE_2D,N,0,0,_t.width,_t.height,Vt,bt,_t.data):e.texImage2D(n.TEXTURE_2D,N,mt,_t.width,_t.height,0,Vt,bt,_t.data)}else if(g.isDataArrayTexture)j?(vt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,nt,mt,rt.width,rt.height,rt.depth),P&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,rt.width,rt.height,rt.depth,Vt,bt,rt.data)):e.texImage3D(n.TEXTURE_2D_ARRAY,0,mt,rt.width,rt.height,rt.depth,0,Vt,bt,rt.data);else if(g.isData3DTexture)j?(vt&&e.texStorage3D(n.TEXTURE_3D,nt,mt,rt.width,rt.height,rt.depth),P&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,rt.width,rt.height,rt.depth,Vt,bt,rt.data)):e.texImage3D(n.TEXTURE_3D,0,mt,rt.width,rt.height,rt.depth,0,Vt,bt,rt.data);else if(g.isFramebufferTexture){if(vt)if(j)e.texStorage2D(n.TEXTURE_2D,nt,mt,rt.width,rt.height);else{let N=rt.width,Q=rt.height;for(let ut=0;ut<nt;ut++)e.texImage2D(n.TEXTURE_2D,ut,mt,N,Q,0,Vt,bt,null),N>>=1,Q>>=1}}else if(S.length>0&&de){if(j&&vt){const N=ne(S[0]);e.texStorage2D(n.TEXTURE_2D,nt,mt,N.width,N.height)}for(let N=0,Q=S.length;N<Q;N++)_t=S[N],j?P&&e.texSubImage2D(n.TEXTURE_2D,N,0,0,Vt,bt,_t):e.texImage2D(n.TEXTURE_2D,N,mt,Vt,bt,_t);g.generateMipmaps=!1}else if(j){if(vt){const N=ne(rt);e.texStorage2D(n.TEXTURE_2D,nt,mt,N.width,N.height)}P&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Vt,bt,rt)}else e.texImage2D(n.TEXTURE_2D,0,mt,Vt,bt,rt);_(g,de)&&M(q),Pt.__version=J.version,g.onUpdate&&g.onUpdate(g)}y.__version=g.version}function Tt(y,g,H){if(g.image.length!==6)return;const q=tt(y,g),et=g.source;e.bindTexture(n.TEXTURE_CUBE_MAP,y.__webglTexture,n.TEXTURE0+H);const J=i.get(et);if(et.version!==J.__version||q===!0){e.activeTexture(n.TEXTURE0+H);const Pt=Qt.getPrimaries(Qt.workingColorSpace),Et=g.colorSpace===qn?null:Qt.getPrimaries(g.colorSpace),ot=g.colorSpace===qn||Pt===Et?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ot);const ct=g.isCompressedTexture||g.image[0].isCompressedTexture,Rt=g.image[0]&&g.image[0].isDataTexture,rt=[];for(let N=0;N<6;N++)!ct&&!Rt?rt[N]=f(g.image[N],!1,!0,r.maxCubemapSize):rt[N]=Rt?g.image[N].image:g.image[N],rt[N]=Ot(g,rt[N]);const de=rt[0],Vt=p(de)||a,bt=s.convert(g.format,g.colorSpace),mt=s.convert(g.type),_t=D(g.internalFormat,bt,mt,g.colorSpace),S=a&&g.isVideoTexture!==!0,j=J.__version===void 0||q===!0,vt=et.dataReady;let P=R(g,de,Vt);z(n.TEXTURE_CUBE_MAP,g,Vt);let nt;if(ct){S&&j&&e.texStorage2D(n.TEXTURE_CUBE_MAP,P,_t,de.width,de.height);for(let N=0;N<6;N++){nt=rt[N].mipmaps;for(let Q=0;Q<nt.length;Q++){const ut=nt[Q];g.format!==cn?bt!==null?S?vt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+N,Q,0,0,ut.width,ut.height,bt,ut.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+N,Q,_t,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):S?vt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+N,Q,0,0,ut.width,ut.height,bt,mt,ut.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+N,Q,_t,ut.width,ut.height,0,bt,mt,ut.data)}}}else{if(nt=g.mipmaps,S&&j){nt.length>0&&P++;const N=ne(rt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,P,_t,N.width,N.height)}for(let N=0;N<6;N++)if(Rt){S?vt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+N,0,0,0,rt[N].width,rt[N].height,bt,mt,rt[N].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+N,0,_t,rt[N].width,rt[N].height,0,bt,mt,rt[N].data);for(let Q=0;Q<nt.length;Q++){const Gt=nt[Q].image[N].image;S?vt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+N,Q+1,0,0,Gt.width,Gt.height,bt,mt,Gt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+N,Q+1,_t,Gt.width,Gt.height,0,bt,mt,Gt.data)}}else{S?vt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+N,0,0,0,bt,mt,rt[N]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+N,0,_t,bt,mt,rt[N]);for(let Q=0;Q<nt.length;Q++){const ut=nt[Q];S?vt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+N,Q+1,0,0,bt,mt,ut.image[N]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+N,Q+1,_t,bt,mt,ut.image[N])}}}_(g,Vt)&&M(n.TEXTURE_CUBE_MAP),J.__version=et.version,g.onUpdate&&g.onUpdate(g)}y.__version=g.version}function xt(y,g,H,q,et,J){const Pt=s.convert(H.format,H.colorSpace),Et=s.convert(H.type),ot=D(H.internalFormat,Pt,Et,H.colorSpace);if(!i.get(g).__hasExternalTextures){const Rt=Math.max(1,g.width>>J),rt=Math.max(1,g.height>>J);et===n.TEXTURE_3D||et===n.TEXTURE_2D_ARRAY?e.texImage3D(et,J,ot,Rt,rt,g.depth,0,Pt,Et,null):e.texImage2D(et,J,ot,Rt,rt,0,Pt,Et,null)}e.bindFramebuffer(n.FRAMEBUFFER,y),Wt(g)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,et,i.get(H).__webglTexture,0,yt(g)):(et===n.TEXTURE_2D||et>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,et,i.get(H).__webglTexture,J),e.bindFramebuffer(n.FRAMEBUFFER,null)}function ft(y,g,H){if(n.bindRenderbuffer(n.RENDERBUFFER,y),g.depthBuffer&&!g.stencilBuffer){let q=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(H||Wt(g)){const et=g.depthTexture;et&&et.isDepthTexture&&(et.type===An?q=n.DEPTH_COMPONENT32F:et.type===jn&&(q=n.DEPTH_COMPONENT24));const J=yt(g);Wt(g)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,J,q,g.width,g.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,J,q,g.width,g.height)}else n.renderbufferStorage(n.RENDERBUFFER,q,g.width,g.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,y)}else if(g.depthBuffer&&g.stencilBuffer){const q=yt(g);H&&Wt(g)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,q,n.DEPTH24_STENCIL8,g.width,g.height):Wt(g)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,q,n.DEPTH24_STENCIL8,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,y)}else{const q=g.textures;for(let et=0;et<q.length;et++){const J=q[et],Pt=s.convert(J.format,J.colorSpace),Et=s.convert(J.type),ot=D(J.internalFormat,Pt,Et,J.colorSpace),ct=yt(g);H&&Wt(g)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct,ot,g.width,g.height):Wt(g)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct,ot,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,ot,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Yt(y,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,y),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(g.depthTexture).__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),Y(g.depthTexture,0);const q=i.get(g.depthTexture).__webglTexture,et=yt(g);if(g.depthTexture.format===yi)Wt(g)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,q,0,et):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,q,0);else if(g.depthTexture.format===vr)Wt(g)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,q,0,et):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,q,0);else throw new Error("Unknown depthTexture format")}function St(y){const g=i.get(y),H=y.isWebGLCubeRenderTarget===!0;if(y.depthTexture&&!g.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");Yt(g.__webglFramebuffer,y)}else if(H){g.__webglDepthbuffer=[];for(let q=0;q<6;q++)e.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[q]),g.__webglDepthbuffer[q]=n.createRenderbuffer(),ft(g.__webglDepthbuffer[q],y,!1)}else e.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer=n.createRenderbuffer(),ft(g.__webglDepthbuffer,y,!1);e.bindFramebuffer(n.FRAMEBUFFER,null)}function U(y,g,H){const q=i.get(y);g!==void 0&&xt(q.__webglFramebuffer,y,y.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&St(y)}function be(y){const g=y.texture,H=i.get(y),q=i.get(g);y.addEventListener("dispose",K);const et=y.textures,J=y.isWebGLCubeRenderTarget===!0,Pt=et.length>1,Et=p(y)||a;if(Pt||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=g.version,o.memory.textures++),J){H.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(a&&g.mipmaps&&g.mipmaps.length>0){H.__webglFramebuffer[ot]=[];for(let ct=0;ct<g.mipmaps.length;ct++)H.__webglFramebuffer[ot][ct]=n.createFramebuffer()}else H.__webglFramebuffer[ot]=n.createFramebuffer()}else{if(a&&g.mipmaps&&g.mipmaps.length>0){H.__webglFramebuffer=[];for(let ot=0;ot<g.mipmaps.length;ot++)H.__webglFramebuffer[ot]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(Pt)if(r.drawBuffers)for(let ot=0,ct=et.length;ot<ct;ot++){const Rt=i.get(et[ot]);Rt.__webglTexture===void 0&&(Rt.__webglTexture=n.createTexture(),o.memory.textures++)}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&y.samples>0&&Wt(y)===!1){H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ot=0;ot<et.length;ot++){const ct=et[ot];H.__webglColorRenderbuffer[ot]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[ot]);const Rt=s.convert(ct.format,ct.colorSpace),rt=s.convert(ct.type),de=D(ct.internalFormat,Rt,rt,ct.colorSpace,y.isXRRenderTarget===!0),Vt=yt(y);n.renderbufferStorageMultisample(n.RENDERBUFFER,Vt,de,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ot,n.RENDERBUFFER,H.__webglColorRenderbuffer[ot])}n.bindRenderbuffer(n.RENDERBUFFER,null),y.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),ft(H.__webglDepthRenderbuffer,y,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(J){e.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),z(n.TEXTURE_CUBE_MAP,g,Et);for(let ot=0;ot<6;ot++)if(a&&g.mipmaps&&g.mipmaps.length>0)for(let ct=0;ct<g.mipmaps.length;ct++)xt(H.__webglFramebuffer[ot][ct],y,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,ct);else xt(H.__webglFramebuffer[ot],y,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);_(g,Et)&&M(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Pt){for(let ot=0,ct=et.length;ot<ct;ot++){const Rt=et[ot],rt=i.get(Rt);e.bindTexture(n.TEXTURE_2D,rt.__webglTexture),z(n.TEXTURE_2D,Rt,Et),xt(H.__webglFramebuffer,y,Rt,n.COLOR_ATTACHMENT0+ot,n.TEXTURE_2D,0),_(Rt,Et)&&M(n.TEXTURE_2D)}e.unbindTexture()}else{let ot=n.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(a?ot=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(ot,q.__webglTexture),z(ot,g,Et),a&&g.mipmaps&&g.mipmaps.length>0)for(let ct=0;ct<g.mipmaps.length;ct++)xt(H.__webglFramebuffer[ct],y,g,n.COLOR_ATTACHMENT0,ot,ct);else xt(H.__webglFramebuffer,y,g,n.COLOR_ATTACHMENT0,ot,0);_(g,Et)&&M(ot),e.unbindTexture()}y.depthBuffer&&St(y)}function wt(y){const g=p(y)||a,H=y.textures;for(let q=0,et=H.length;q<et;q++){const J=H[q];if(_(J,g)){const Pt=y.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,Et=i.get(J).__webglTexture;e.bindTexture(Pt,Et),M(Pt),e.unbindTexture()}}}function It(y){if(a&&y.samples>0&&Wt(y)===!1){const g=y.textures,H=y.width,q=y.height;let et=n.COLOR_BUFFER_BIT;const J=[],Pt=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Et=i.get(y),ot=g.length>1;if(ot)for(let ct=0;ct<g.length;ct++)e.bindFramebuffer(n.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Et.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let ct=0;ct<g.length;ct++){J.push(n.COLOR_ATTACHMENT0+ct),y.depthBuffer&&J.push(Pt);const Rt=Et.__ignoreDepthValues!==void 0?Et.__ignoreDepthValues:!1;if(Rt===!1&&(y.depthBuffer&&(et|=n.DEPTH_BUFFER_BIT),y.stencilBuffer&&(et|=n.STENCIL_BUFFER_BIT)),ot&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Et.__webglColorRenderbuffer[ct]),Rt===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Pt]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Pt])),ot){const rt=i.get(g[ct]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,rt,0)}n.blitFramebuffer(0,0,H,q,0,0,H,q,et,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,J)}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ot)for(let ct=0;ct<g.length;ct++){e.bindFramebuffer(n.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.RENDERBUFFER,Et.__webglColorRenderbuffer[ct]);const Rt=i.get(g[ct]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Et.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.TEXTURE_2D,Rt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}}function yt(y){return Math.min(r.maxSamples,y.samples)}function Wt(y){const g=i.get(y);return a&&y.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function Ut(y){const g=o.render.frame;h.get(y)!==g&&(h.set(y,g),y.update())}function Ot(y,g){const H=y.colorSpace,q=y.format,et=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||y.format===La||H!==si&&H!==qn&&(Qt.getTransfer(H)===se?a===!1?t.has("EXT_sRGB")===!0&&q===cn?(y.format=La,y.minFilter=ze,y.generateMipmaps=!1):g=xh.sRGBToLinear(g):(q!==cn||et!==Jn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),g}function ne(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(u.width=y.naturalWidth||y.width,u.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(u.width=y.displayWidth,u.height=y.displayHeight):(u.width=y.width,u.height=y.height),u}this.allocateTextureUnit=G,this.resetTextureUnits=L,this.setTexture2D=Y,this.setTexture2DArray=W,this.setTexture3D=X,this.setTextureCube=it,this.rebindTextures=U,this.setupRenderTarget=be,this.updateRenderTargetMipmap=wt,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=St,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=Wt}function C0(n,t,e){const i=e.isWebGL2;function r(s,o=qn){let a;const l=Qt.getTransfer(o);if(s===Jn)return n.UNSIGNED_BYTE;if(s===uh)return n.UNSIGNED_SHORT_4_4_4_4;if(s===hh)return n.UNSIGNED_SHORT_5_5_5_1;if(s===Wp)return n.BYTE;if(s===Xp)return n.SHORT;if(s===Ya)return n.UNSIGNED_SHORT;if(s===ch)return n.INT;if(s===jn)return n.UNSIGNED_INT;if(s===An)return n.FLOAT;if(s===Xr)return i?n.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===qp)return n.ALPHA;if(s===cn)return n.RGBA;if(s===Yp)return n.LUMINANCE;if(s===jp)return n.LUMINANCE_ALPHA;if(s===yi)return n.DEPTH_COMPONENT;if(s===vr)return n.DEPTH_STENCIL;if(s===La)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Kp)return n.RED;if(s===dh)return n.RED_INTEGER;if(s===$p)return n.RG;if(s===ph)return n.RG_INTEGER;if(s===fh)return n.RGBA_INTEGER;if(s===Io||s===Uo||s===No||s===Oo)if(l===se)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Io)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Uo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===No)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Oo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Io)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Uo)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===No)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Oo)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Hl||s===Gl||s===Wl||s===Xl)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Hl)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Gl)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Wl)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Xl)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===mh)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===ql||s===Yl)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(s===ql)return l===se?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Yl)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===jl||s===Kl||s===$l||s===Zl||s===Jl||s===Ql||s===tc||s===ec||s===nc||s===ic||s===rc||s===sc||s===oc||s===ac)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(s===jl)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Kl)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===$l)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Zl)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Jl)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Ql)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===tc)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===ec)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===nc)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===ic)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===rc)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===sc)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===oc)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===ac)return l===se?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Fo||s===lc||s===cc)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(s===Fo)return l===se?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===lc)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===cc)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Zp||s===uc||s===hc||s===dc)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(s===Fo)return a.COMPRESSED_RED_RGTC1_EXT;if(s===uc)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===hc)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===dc)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===wi?i?n.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class A0 extends nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Fe extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}}const P0={type:"move"};class la{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const x of t.hand.values()){const f=e.getJointPose(x,i),p=this._getHandJoint(c,x);f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=f.radius),p.visible=f!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),m=.02,v=.005;c.inputState.pinching&&d>m+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=m-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(P0)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Fe;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const R0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,L0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class D0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new Be,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}render(t,e){if(this.texture!==null){if(this.mesh===null){const i=e.cameras[0].viewport,r=new ni({extensions:{fragDepth:!0},vertexShader:R0,fragmentShader:L0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new Oe(new wo(20,20),r)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}}class I0 extends Li{constructor(t,e){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,d=null,m=null,v=null;const x=new D0,f=e.getContextAttributes();let p=null,E=null;const _=[],M=[],D=new lt;let R=null;const C=new nn;C.layers.enable(1),C.viewport=new Ae;const O=new nn;O.layers.enable(2),O.viewport=new Ae;const K=[C,O],b=new A0;b.layers.enable(1),b.layers.enable(2);let T=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let tt=_[z];return tt===void 0&&(tt=new la,_[z]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(z){let tt=_[z];return tt===void 0&&(tt=new la,_[z]=tt),tt.getGripSpace()},this.getHand=function(z){let tt=_[z];return tt===void 0&&(tt=new la,_[z]=tt),tt.getHandSpace()};function Z(z){const tt=M.indexOf(z.inputSource);if(tt===-1)return;const dt=_[tt];dt!==void 0&&(dt.update(z.inputSource,z.frame,c||o),dt.dispatchEvent({type:z.type,data:z.inputSource}))}function L(){r.removeEventListener("select",Z),r.removeEventListener("selectstart",Z),r.removeEventListener("selectend",Z),r.removeEventListener("squeeze",Z),r.removeEventListener("squeezestart",Z),r.removeEventListener("squeezeend",Z),r.removeEventListener("end",L),r.removeEventListener("inputsourceschange",G);for(let z=0;z<_.length;z++){const tt=M[z];tt!==null&&(M[z]=null,_[z].disconnect(tt))}T=null,$=null,x.reset(),t.setRenderTarget(p),m=null,d=null,h=null,r=null,E=null,At.stop(),i.isPresenting=!1,t.setPixelRatio(R),t.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){s=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){a=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return h},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(z){if(r=z,r!==null){if(p=t.getRenderTarget(),r.addEventListener("select",Z),r.addEventListener("selectstart",Z),r.addEventListener("selectend",Z),r.addEventListener("squeeze",Z),r.addEventListener("squeezestart",Z),r.addEventListener("squeezeend",Z),r.addEventListener("end",L),r.addEventListener("inputsourceschange",G),f.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(D),r.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const tt={antialias:r.renderState.layers===void 0?f.antialias:!0,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,e,tt),r.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new Si(m.framebufferWidth,m.framebufferHeight,{format:cn,type:Jn,colorSpace:t.outputColorSpace,stencilBuffer:f.stencil})}else{let tt=null,dt=null,Tt=null;f.depth&&(Tt=f.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=f.stencil?vr:yi,dt=f.stencil?wi:jn);const xt={colorFormat:e.RGBA8,depthFormat:Tt,scaleFactor:s};h=new XRWebGLBinding(r,e),d=h.createProjectionLayer(xt),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),E=new Si(d.textureWidth,d.textureHeight,{format:cn,type:Jn,depthTexture:new Lh(d.textureWidth,d.textureHeight,dt,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:f.stencil,colorSpace:t.outputColorSpace,samples:f.antialias?4:0});const ft=t.properties.get(E);ft.__ignoreDepthValues=d.ignoreDepthValues}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),At.setContext(r),At.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function G(z){for(let tt=0;tt<z.removed.length;tt++){const dt=z.removed[tt],Tt=M.indexOf(dt);Tt>=0&&(M[Tt]=null,_[Tt].disconnect(dt))}for(let tt=0;tt<z.added.length;tt++){const dt=z.added[tt];let Tt=M.indexOf(dt);if(Tt===-1){for(let ft=0;ft<_.length;ft++)if(ft>=M.length){M.push(dt),Tt=ft;break}else if(M[ft]===null){M[ft]=dt,Tt=ft;break}if(Tt===-1)break}const xt=_[Tt];xt&&xt.connect(dt)}}const V=new A,Y=new A;function W(z,tt,dt){V.setFromMatrixPosition(tt.matrixWorld),Y.setFromMatrixPosition(dt.matrixWorld);const Tt=V.distanceTo(Y),xt=tt.projectionMatrix.elements,ft=dt.projectionMatrix.elements,Yt=xt[14]/(xt[10]-1),St=xt[14]/(xt[10]+1),U=(xt[9]+1)/xt[5],be=(xt[9]-1)/xt[5],wt=(xt[8]-1)/xt[0],It=(ft[8]+1)/ft[0],yt=Yt*wt,Wt=Yt*It,Ut=Tt/(-wt+It),Ot=Ut*-wt;tt.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(Ot),z.translateZ(Ut),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert();const ne=Yt+Ut,y=St+Ut,g=yt-Ot,H=Wt+(Tt-Ot),q=U*St/y*ne,et=be*St/y*ne;z.projectionMatrix.makePerspective(g,H,q,et,ne,y),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}function X(z,tt){tt===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(tt.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(r===null)return;x.texture!==null&&(z.near=x.depthNear,z.far=x.depthFar),b.near=O.near=C.near=z.near,b.far=O.far=C.far=z.far,(T!==b.near||$!==b.far)&&(r.updateRenderState({depthNear:b.near,depthFar:b.far}),T=b.near,$=b.far,C.near=T,C.far=$,O.near=T,O.far=$,C.updateProjectionMatrix(),O.updateProjectionMatrix(),z.updateProjectionMatrix());const tt=z.parent,dt=b.cameras;X(b,tt);for(let Tt=0;Tt<dt.length;Tt++)X(dt[Tt],tt);dt.length===2?W(b,C,O):b.projectionMatrix.copy(C.projectionMatrix),it(z,b,tt)};function it(z,tt,dt){dt===null?z.matrix.copy(tt.matrixWorld):(z.matrix.copy(dt.matrixWorld),z.matrix.invert(),z.matrix.multiply(tt.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(tt.projectionMatrix),z.projectionMatrixInverse.copy(tt.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=qr*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(d===null&&m===null))return l},this.setFoveation=function(z){l=z,d!==null&&(d.fixedFoveation=z),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=z)},this.hasDepthSensing=function(){return x.texture!==null};let st=null;function pt(z,tt){if(u=tt.getViewerPose(c||o),v=tt,u!==null){const dt=u.views;m!==null&&(t.setRenderTargetFramebuffer(E,m.framebuffer),t.setRenderTarget(E));let Tt=!1;dt.length!==b.cameras.length&&(b.cameras.length=0,Tt=!0);for(let ft=0;ft<dt.length;ft++){const Yt=dt[ft];let St=null;if(m!==null)St=m.getViewport(Yt);else{const be=h.getViewSubImage(d,Yt);St=be.viewport,ft===0&&(t.setRenderTargetTextures(E,be.colorTexture,d.ignoreDepthValues?void 0:be.depthStencilTexture),t.setRenderTarget(E))}let U=K[ft];U===void 0&&(U=new nn,U.layers.enable(ft),U.viewport=new Ae,K[ft]=U),U.matrix.fromArray(Yt.transform.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale),U.projectionMatrix.fromArray(Yt.projectionMatrix),U.projectionMatrixInverse.copy(U.projectionMatrix).invert(),U.viewport.set(St.x,St.y,St.width,St.height),ft===0&&(b.matrix.copy(U.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),Tt===!0&&b.cameras.push(U)}const xt=r.enabledFeatures;if(xt&&xt.includes("depth-sensing")){const ft=h.getDepthInformation(dt[0]);ft&&ft.isValid&&ft.texture&&x.init(t,ft,r.renderState)}}for(let dt=0;dt<_.length;dt++){const Tt=M[dt],xt=_[dt];Tt!==null&&xt!==void 0&&xt.update(Tt,tt,c||o)}x.render(t,b),st&&st(z,tt),tt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:tt}),v=null}const At=new Rh;At.setAnimationLoop(pt),this.setAnimationLoop=function(z){st=z},this.dispose=function(){}}}const fi=new Dn,U0=new ae;function N0(n,t){function e(f,p){f.matrixAutoUpdate===!0&&f.updateMatrix(),p.value.copy(f.matrix)}function i(f,p){p.color.getRGB(f.fogColor.value,Th(n)),p.isFog?(f.fogNear.value=p.near,f.fogFar.value=p.far):p.isFogExp2&&(f.fogDensity.value=p.density)}function r(f,p,E,_,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(f,p):p.isMeshToonMaterial?(s(f,p),h(f,p)):p.isMeshPhongMaterial?(s(f,p),u(f,p)):p.isMeshStandardMaterial?(s(f,p),d(f,p),p.isMeshPhysicalMaterial&&m(f,p,M)):p.isMeshMatcapMaterial?(s(f,p),v(f,p)):p.isMeshDepthMaterial?s(f,p):p.isMeshDistanceMaterial?(s(f,p),x(f,p)):p.isMeshNormalMaterial?s(f,p):p.isLineBasicMaterial?(o(f,p),p.isLineDashedMaterial&&a(f,p)):p.isPointsMaterial?l(f,p,E,_):p.isSpriteMaterial?c(f,p):p.isShadowMaterial?(f.color.value.copy(p.color),f.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(f,p){f.opacity.value=p.opacity,p.color&&f.diffuse.value.copy(p.color),p.emissive&&f.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(f.map.value=p.map,e(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.bumpMap&&(f.bumpMap.value=p.bumpMap,e(p.bumpMap,f.bumpMapTransform),f.bumpScale.value=p.bumpScale,p.side===We&&(f.bumpScale.value*=-1)),p.normalMap&&(f.normalMap.value=p.normalMap,e(p.normalMap,f.normalMapTransform),f.normalScale.value.copy(p.normalScale),p.side===We&&f.normalScale.value.negate()),p.displacementMap&&(f.displacementMap.value=p.displacementMap,e(p.displacementMap,f.displacementMapTransform),f.displacementScale.value=p.displacementScale,f.displacementBias.value=p.displacementBias),p.emissiveMap&&(f.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,f.emissiveMapTransform)),p.specularMap&&(f.specularMap.value=p.specularMap,e(p.specularMap,f.specularMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest);const E=t.get(p),_=E.envMap,M=E.envMapRotation;if(_&&(f.envMap.value=_,fi.copy(M),fi.x*=-1,fi.y*=-1,fi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(fi.y*=-1,fi.z*=-1),f.envMapRotation.value.setFromMatrix4(U0.makeRotationFromEuler(fi)),f.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=p.reflectivity,f.ior.value=p.ior,f.refractionRatio.value=p.refractionRatio),p.lightMap){f.lightMap.value=p.lightMap;const D=n._useLegacyLights===!0?Math.PI:1;f.lightMapIntensity.value=p.lightMapIntensity*D,e(p.lightMap,f.lightMapTransform)}p.aoMap&&(f.aoMap.value=p.aoMap,f.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,f.aoMapTransform))}function o(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,p.map&&(f.map.value=p.map,e(p.map,f.mapTransform))}function a(f,p){f.dashSize.value=p.dashSize,f.totalSize.value=p.dashSize+p.gapSize,f.scale.value=p.scale}function l(f,p,E,_){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.size.value=p.size*E,f.scale.value=_*.5,p.map&&(f.map.value=p.map,e(p.map,f.uvTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function c(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.rotation.value=p.rotation,p.map&&(f.map.value=p.map,e(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function u(f,p){f.specular.value.copy(p.specular),f.shininess.value=Math.max(p.shininess,1e-4)}function h(f,p){p.gradientMap&&(f.gradientMap.value=p.gradientMap)}function d(f,p){f.metalness.value=p.metalness,p.metalnessMap&&(f.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,f.metalnessMapTransform)),f.roughness.value=p.roughness,p.roughnessMap&&(f.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,f.roughnessMapTransform)),t.get(p).envMap&&(f.envMapIntensity.value=p.envMapIntensity)}function m(f,p,E){f.ior.value=p.ior,p.sheen>0&&(f.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),f.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(f.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,f.sheenColorMapTransform)),p.sheenRoughnessMap&&(f.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,f.sheenRoughnessMapTransform))),p.clearcoat>0&&(f.clearcoat.value=p.clearcoat,f.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(f.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,f.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(f.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===We&&f.clearcoatNormalScale.value.negate())),p.iridescence>0&&(f.iridescence.value=p.iridescence,f.iridescenceIOR.value=p.iridescenceIOR,f.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(f.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,f.iridescenceMapTransform)),p.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),p.transmission>0&&(f.transmission.value=p.transmission,f.transmissionSamplerMap.value=E.texture,f.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(f.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,f.transmissionMapTransform)),f.thickness.value=p.thickness,p.thicknessMap&&(f.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=p.attenuationDistance,f.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(f.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(f.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=p.specularIntensity,f.specularColor.value.copy(p.specularColor),p.specularColorMap&&(f.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,f.specularColorMapTransform)),p.specularIntensityMap&&(f.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,f.specularIntensityMapTransform))}function v(f,p){p.matcap&&(f.matcap.value=p.matcap)}function x(f,p){const E=t.get(p).light;f.referencePosition.value.setFromMatrixPosition(E.matrixWorld),f.nearDistance.value=E.shadow.camera.near,f.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function O0(n,t,e,i){let r={},s={},o=[];const a=e.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(E,_){const M=_.program;i.uniformBlockBinding(E,M)}function c(E,_){let M=r[E.id];M===void 0&&(v(E),M=u(E),r[E.id]=M,E.addEventListener("dispose",f));const D=_.program;i.updateUBOMapping(E,D);const R=t.render.frame;s[E.id]!==R&&(d(E),s[E.id]=R)}function u(E){const _=h();E.__bindingPointIndex=_;const M=n.createBuffer(),D=E.__size,R=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,D,R),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,_,M),M}function h(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){const _=r[E.id],M=E.uniforms,D=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let R=0,C=M.length;R<C;R++){const O=Array.isArray(M[R])?M[R]:[M[R]];for(let K=0,b=O.length;K<b;K++){const T=O[K];if(m(T,R,K,D)===!0){const $=T.__offset,Z=Array.isArray(T.value)?T.value:[T.value];let L=0;for(let G=0;G<Z.length;G++){const V=Z[G],Y=x(V);typeof V=="number"||typeof V=="boolean"?(T.__data[0]=V,n.bufferSubData(n.UNIFORM_BUFFER,$+L,T.__data)):V.isMatrix3?(T.__data[0]=V.elements[0],T.__data[1]=V.elements[1],T.__data[2]=V.elements[2],T.__data[3]=0,T.__data[4]=V.elements[3],T.__data[5]=V.elements[4],T.__data[6]=V.elements[5],T.__data[7]=0,T.__data[8]=V.elements[6],T.__data[9]=V.elements[7],T.__data[10]=V.elements[8],T.__data[11]=0):(V.toArray(T.__data,L),L+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,$,T.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(E,_,M,D){const R=E.value,C=_+"_"+M;if(D[C]===void 0)return typeof R=="number"||typeof R=="boolean"?D[C]=R:D[C]=R.clone(),!0;{const O=D[C];if(typeof R=="number"||typeof R=="boolean"){if(O!==R)return D[C]=R,!0}else if(O.equals(R)===!1)return O.copy(R),!0}return!1}function v(E){const _=E.uniforms;let M=0;const D=16;for(let C=0,O=_.length;C<O;C++){const K=Array.isArray(_[C])?_[C]:[_[C]];for(let b=0,T=K.length;b<T;b++){const $=K[b],Z=Array.isArray($.value)?$.value:[$.value];for(let L=0,G=Z.length;L<G;L++){const V=Z[L],Y=x(V),W=M%D;W!==0&&D-W<Y.boundary&&(M+=D-W),$.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=M,M+=Y.storage}}}const R=M%D;return R>0&&(M+=D-R),E.__size=M,E.__cache={},this}function x(E){const _={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(_.boundary=4,_.storage=4):E.isVector2?(_.boundary=8,_.storage=8):E.isVector3||E.isColor?(_.boundary=16,_.storage=12):E.isVector4?(_.boundary=16,_.storage=16):E.isMatrix3?(_.boundary=48,_.storage=48):E.isMatrix4?(_.boundary=64,_.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),_}function f(E){const _=E.target;_.removeEventListener("dispose",f);const M=o.indexOf(_.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(r[_.id]),delete r[_.id],delete s[_.id]}function p(){for(const E in r)n.deleteBuffer(r[E]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}class Fh{constructor(t={}){const{canvas:e=Sf(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=t;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=o;const m=new Uint32Array(4),v=new Int32Array(4);let x=null,f=null;const p=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=pn,this._useLegacyLights=!1,this.toneMapping=Zn,this.toneMappingExposure=1;const _=this;let M=!1,D=0,R=0,C=null,O=-1,K=null;const b=new Ae,T=new Ae;let $=null;const Z=new Xt(0);let L=0,G=e.width,V=e.height,Y=1,W=null,X=null;const it=new Ae(0,0,G,V),st=new Ae(0,0,G,V);let pt=!1;const At=new Ph;let z=!1,tt=!1,dt=null;const Tt=new ae,xt=new lt,ft=new A,Yt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function St(){return C===null?Y:1}let U=i;function be(w,I){for(let B=0;B<w.length;B++){const k=w[B],F=e.getContext(k,I);if(F!==null)return F}return null}try{const w={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${qa}`),e.addEventListener("webglcontextlost",vt,!1),e.addEventListener("webglcontextrestored",P,!1),e.addEventListener("webglcontextcreationerror",nt,!1),U===null){const I=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&I.shift(),U=be(I,w),U===null)throw be(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&U instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),U.getShaderPrecisionFormat===void 0&&(U.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let wt,It,yt,Wt,Ut,Ot,ne,y,g,H,q,et,J,Pt,Et,ot,ct,Rt,rt,de,Vt,bt,mt,_t;function S(){wt=new H_(U),It=new N_(U,wt,t),wt.init(It),bt=new C0(U,wt,It),yt=new S0(U,wt,It),Wt=new X_(U),Ut=new h0,Ot=new T0(U,wt,yt,Ut,It,bt,Wt),ne=new F_(_),y=new z_(_),g=new $f(U,It),mt=new I_(U,wt,g,It),H=new G_(U,g,Wt,mt),q=new K_(U,H,g,Wt),rt=new j_(U,It,Ot),ot=new O_(Ut),et=new u0(_,ne,y,wt,It,mt,ot),J=new N0(_,Ut),Pt=new p0,Et=new x0(wt,It),Rt=new D_(_,ne,y,yt,q,d,l),ct=new M0(_,q,It),_t=new O0(U,Wt,It,yt),de=new U_(U,wt,Wt,It),Vt=new W_(U,wt,Wt,It),Wt.programs=et.programs,_.capabilities=It,_.extensions=wt,_.properties=Ut,_.renderLists=Pt,_.shadowMap=ct,_.state=yt,_.info=Wt}S();const j=new I0(_,U);this.xr=j,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const w=wt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=wt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(w){w!==void 0&&(Y=w,this.setSize(G,V,!1))},this.getSize=function(w){return w.set(G,V)},this.setSize=function(w,I,B=!0){if(j.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=w,V=I,e.width=Math.floor(w*Y),e.height=Math.floor(I*Y),B===!0&&(e.style.width=w+"px",e.style.height=I+"px"),this.setViewport(0,0,w,I)},this.getDrawingBufferSize=function(w){return w.set(G*Y,V*Y).floor()},this.setDrawingBufferSize=function(w,I,B){G=w,V=I,Y=B,e.width=Math.floor(w*B),e.height=Math.floor(I*B),this.setViewport(0,0,w,I)},this.getCurrentViewport=function(w){return w.copy(b)},this.getViewport=function(w){return w.copy(it)},this.setViewport=function(w,I,B,k){w.isVector4?it.set(w.x,w.y,w.z,w.w):it.set(w,I,B,k),yt.viewport(b.copy(it).multiplyScalar(Y).round())},this.getScissor=function(w){return w.copy(st)},this.setScissor=function(w,I,B,k){w.isVector4?st.set(w.x,w.y,w.z,w.w):st.set(w,I,B,k),yt.scissor(T.copy(st).multiplyScalar(Y).round())},this.getScissorTest=function(){return pt},this.setScissorTest=function(w){yt.setScissorTest(pt=w)},this.setOpaqueSort=function(w){W=w},this.setTransparentSort=function(w){X=w},this.getClearColor=function(w){return w.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor.apply(Rt,arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha.apply(Rt,arguments)},this.clear=function(w=!0,I=!0,B=!0){let k=0;if(w){let F=!1;if(C!==null){const ht=C.texture.format;F=ht===fh||ht===ph||ht===dh}if(F){const ht=C.texture.type,gt=ht===Jn||ht===jn||ht===Ya||ht===wi||ht===uh||ht===hh,Mt=Rt.getClearColor(),Ct=Rt.getClearAlpha(),zt=Mt.r,Dt=Mt.g,Nt=Mt.b;gt?(m[0]=zt,m[1]=Dt,m[2]=Nt,m[3]=Ct,U.clearBufferuiv(U.COLOR,0,m)):(v[0]=zt,v[1]=Dt,v[2]=Nt,v[3]=Ct,U.clearBufferiv(U.COLOR,0,v))}else k|=U.COLOR_BUFFER_BIT}I&&(k|=U.DEPTH_BUFFER_BIT),B&&(k|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",vt,!1),e.removeEventListener("webglcontextrestored",P,!1),e.removeEventListener("webglcontextcreationerror",nt,!1),Pt.dispose(),Et.dispose(),Ut.dispose(),ne.dispose(),y.dispose(),q.dispose(),mt.dispose(),_t.dispose(),et.dispose(),j.dispose(),j.removeEventListener("sessionstart",pe),j.removeEventListener("sessionend",jt),dt&&(dt.dispose(),dt=null),ie.stop()};function vt(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function P(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const w=Wt.autoReset,I=ct.enabled,B=ct.autoUpdate,k=ct.needsUpdate,F=ct.type;S(),Wt.autoReset=w,ct.enabled=I,ct.autoUpdate=B,ct.needsUpdate=k,ct.type=F}function nt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function N(w){const I=w.target;I.removeEventListener("dispose",N),Q(I)}function Q(w){ut(w),Ut.remove(w)}function ut(w){const I=Ut.get(w).programs;I!==void 0&&(I.forEach(function(B){et.releaseProgram(B)}),w.isShaderMaterial&&et.releaseShaderCache(w))}this.renderBufferDirect=function(w,I,B,k,F,ht){I===null&&(I=Yt);const gt=F.isMesh&&F.matrixWorld.determinant()<0,Mt=Jd(w,I,B,k,F);yt.setMaterial(k,gt);let Ct=B.index,zt=1;if(k.wireframe===!0){if(Ct=H.getWireframeAttribute(B),Ct===void 0)return;zt=2}const Dt=B.drawRange,Nt=B.attributes.position;let ve=Dt.start*zt,qe=(Dt.start+Dt.count)*zt;ht!==null&&(ve=Math.max(ve,ht.start*zt),qe=Math.min(qe,(ht.start+ht.count)*zt)),Ct!==null?(ve=Math.max(ve,0),qe=Math.min(qe,Ct.count)):Nt!=null&&(ve=Math.max(ve,0),qe=Math.min(qe,Nt.count));const Me=qe-ve;if(Me<0||Me===1/0)return;mt.setup(F,k,Mt,B,Ct);let bn,ce=de;if(Ct!==null&&(bn=g.get(Ct),ce=Vt,ce.setIndex(bn)),F.isMesh)k.wireframe===!0?(yt.setLineWidth(k.wireframeLinewidth*St()),ce.setMode(U.LINES)):ce.setMode(U.TRIANGLES);else if(F.isLine){let Ft=k.linewidth;Ft===void 0&&(Ft=1),yt.setLineWidth(Ft*St()),F.isLineSegments?ce.setMode(U.LINES):F.isLineLoop?ce.setMode(U.LINE_LOOP):ce.setMode(U.LINE_STRIP)}else F.isPoints?ce.setMode(U.POINTS):F.isSprite&&ce.setMode(U.TRIANGLES);if(F.isBatchedMesh)ce.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else if(F.isInstancedMesh)ce.renderInstances(ve,Me,F.count);else if(B.isInstancedBufferGeometry){const Ft=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Ao=Math.min(B.instanceCount,Ft);ce.renderInstances(ve,Me,Ao)}else ce.render(ve,Me)};function Gt(w,I,B){w.transparent===!0&&w.side===Ke&&w.forceSinglePass===!1?(w.side=We,w.needsUpdate=!0,vs(w,I,B),w.side=ei,w.needsUpdate=!0,vs(w,I,B),w.side=Ke):vs(w,I,B)}this.compile=function(w,I,B=null){B===null&&(B=w),f=Et.get(B),f.init(),E.push(f),B.traverseVisible(function(F){F.isLight&&F.layers.test(I.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),w!==B&&w.traverseVisible(function(F){F.isLight&&F.layers.test(I.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),f.setupLights(_._useLegacyLights);const k=new Set;return w.traverse(function(F){const ht=F.material;if(ht)if(Array.isArray(ht))for(let gt=0;gt<ht.length;gt++){const Mt=ht[gt];Gt(Mt,B,F),k.add(Mt)}else Gt(ht,B,F),k.add(ht)}),E.pop(),f=null,k},this.compileAsync=function(w,I,B=null){const k=this.compile(w,I,B);return new Promise(F=>{function ht(){if(k.forEach(function(gt){Ut.get(gt).currentProgram.isReady()&&k.delete(gt)}),k.size===0){F(w);return}setTimeout(ht,10)}wt.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let Zt=null;function te(w){Zt&&Zt(w)}function pe(){ie.stop()}function jt(){ie.start()}const ie=new Rh;ie.setAnimationLoop(te),typeof self<"u"&&ie.setContext(self),this.setAnimationLoop=function(w){Zt=w,j.setAnimationLoop(w),w===null?ie.stop():ie.start()},j.addEventListener("sessionstart",pe),j.addEventListener("sessionend",jt),this.render=function(w,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(j.cameraAutoUpdate===!0&&j.updateCamera(I),I=j.getCamera()),w.isScene===!0&&w.onBeforeRender(_,w,I,C),f=Et.get(w,E.length),f.init(),E.push(f),Tt.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),At.setFromProjectionMatrix(Tt),tt=this.localClippingEnabled,z=ot.init(this.clippingPlanes,tt),x=Pt.get(w,p.length),x.init(),p.push(x),Pe(w,I,0,_.sortObjects),x.finish(),_.sortObjects===!0&&x.sort(W,X),this.info.render.frame++,z===!0&&ot.beginShadows();const B=f.state.shadowsArray;if(ct.render(B,w,I),z===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset(),(j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1)&&Rt.render(x,w),f.setupLights(_._useLegacyLights),I.isArrayCamera){const k=I.cameras;for(let F=0,ht=k.length;F<ht;F++){const gt=k[F];oi(x,w,gt,gt.viewport)}}else oi(x,w,I);C!==null&&(Ot.updateMultisampleRenderTarget(C),Ot.updateRenderTargetMipmap(C)),w.isScene===!0&&w.onAfterRender(_,w,I),mt.resetDefaultState(),O=-1,K=null,E.pop(),E.length>0?f=E[E.length-1]:f=null,p.pop(),p.length>0?x=p[p.length-1]:x=null};function Pe(w,I,B,k){if(w.visible===!1)return;if(w.layers.test(I.layers)){if(w.isGroup)B=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(I);else if(w.isLight)f.pushLight(w),w.castShadow&&f.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||At.intersectsSprite(w)){k&&ft.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Tt);const gt=q.update(w),Mt=w.material;Mt.visible&&x.push(w,gt,Mt,B,ft.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||At.intersectsObject(w))){const gt=q.update(w),Mt=w.material;if(k&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ft.copy(w.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),ft.copy(gt.boundingSphere.center)),ft.applyMatrix4(w.matrixWorld).applyMatrix4(Tt)),Array.isArray(Mt)){const Ct=gt.groups;for(let zt=0,Dt=Ct.length;zt<Dt;zt++){const Nt=Ct[zt],ve=Mt[Nt.materialIndex];ve&&ve.visible&&x.push(w,gt,ve,B,ft.z,Nt)}}else Mt.visible&&x.push(w,gt,Mt,B,ft.z,null)}}const ht=w.children;for(let gt=0,Mt=ht.length;gt<Mt;gt++)Pe(ht[gt],I,B,k)}function oi(w,I,B,k){const F=w.opaque,ht=w.transmissive,gt=w.transparent;f.setupLightsView(B),z===!0&&ot.setGlobalState(_.clippingPlanes,B),ht.length>0&&fs(F,ht,I,B),k&&yt.viewport(b.copy(k)),F.length>0&&ms(F,I,B),ht.length>0&&ms(ht,I,B),gt.length>0&&ms(gt,I,B),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function fs(w,I,B,k){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;const ht=It.isWebGL2;dt===null&&(dt=new Si(1,1,{generateMipmaps:!0,type:wt.has("EXT_color_buffer_half_float")?Xr:Jn,minFilter:bi,samples:ht?4:0})),_.getDrawingBufferSize(xt),ht?dt.setSize(xt.x,xt.y):dt.setSize(co(xt.x),co(xt.y));const gt=_.getRenderTarget();_.setRenderTarget(dt),_.getClearColor(Z),L=_.getClearAlpha(),L<1&&_.setClearColor(16777215,.5),_.clear();const Mt=_.toneMapping;_.toneMapping=Zn,ms(w,B,k),Ot.updateMultisampleRenderTarget(dt),Ot.updateRenderTargetMipmap(dt);let Ct=!1;for(let zt=0,Dt=I.length;zt<Dt;zt++){const Nt=I[zt],ve=Nt.object,qe=Nt.geometry,Me=Nt.material,bn=Nt.group;if(Me.side===Ke&&ve.layers.test(k.layers)){const ce=Me.side;Me.side=We,Me.needsUpdate=!0,Al(ve,B,k,qe,Me,bn),Me.side=ce,Me.needsUpdate=!0,Ct=!0}}Ct===!0&&(Ot.updateMultisampleRenderTarget(dt),Ot.updateRenderTargetMipmap(dt)),_.setRenderTarget(gt),_.setClearColor(Z,L),_.toneMapping=Mt}function ms(w,I,B){const k=I.isScene===!0?I.overrideMaterial:null;for(let F=0,ht=w.length;F<ht;F++){const gt=w[F],Mt=gt.object,Ct=gt.geometry,zt=k===null?gt.material:k,Dt=gt.group;Mt.layers.test(B.layers)&&Al(Mt,I,B,Ct,zt,Dt)}}function Al(w,I,B,k,F,ht){w.onBeforeRender(_,I,B,k,F,ht),w.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),F.onBeforeRender(_,I,B,k,w,ht),F.transparent===!0&&F.side===Ke&&F.forceSinglePass===!1?(F.side=We,F.needsUpdate=!0,_.renderBufferDirect(B,I,k,F,w,ht),F.side=ei,F.needsUpdate=!0,_.renderBufferDirect(B,I,k,F,w,ht),F.side=Ke):_.renderBufferDirect(B,I,k,F,w,ht),w.onAfterRender(_,I,B,k,F,ht)}function vs(w,I,B){I.isScene!==!0&&(I=Yt);const k=Ut.get(w),F=f.state.lights,ht=f.state.shadowsArray,gt=F.state.version,Mt=et.getParameters(w,F.state,ht,I,B),Ct=et.getProgramCacheKey(Mt);let zt=k.programs;k.environment=w.isMeshStandardMaterial?I.environment:null,k.fog=I.fog,k.envMap=(w.isMeshStandardMaterial?y:ne).get(w.envMap||k.environment),k.envMapRotation=k.environment!==null&&w.envMap===null?I.environmentRotation:w.envMapRotation,zt===void 0&&(w.addEventListener("dispose",N),zt=new Map,k.programs=zt);let Dt=zt.get(Ct);if(Dt!==void 0){if(k.currentProgram===Dt&&k.lightsStateVersion===gt)return Rl(w,Mt),Dt}else Mt.uniforms=et.getUniforms(w),w.onBuild(B,Mt,_),w.onBeforeCompile(Mt,_),Dt=et.acquireProgram(Mt,Ct),zt.set(Ct,Dt),k.uniforms=Mt.uniforms;const Nt=k.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Nt.clippingPlanes=ot.uniform),Rl(w,Mt),k.needsLights=tp(w),k.lightsStateVersion=gt,k.needsLights&&(Nt.ambientLightColor.value=F.state.ambient,Nt.lightProbe.value=F.state.probe,Nt.directionalLights.value=F.state.directional,Nt.directionalLightShadows.value=F.state.directionalShadow,Nt.spotLights.value=F.state.spot,Nt.spotLightShadows.value=F.state.spotShadow,Nt.rectAreaLights.value=F.state.rectArea,Nt.ltc_1.value=F.state.rectAreaLTC1,Nt.ltc_2.value=F.state.rectAreaLTC2,Nt.pointLights.value=F.state.point,Nt.pointLightShadows.value=F.state.pointShadow,Nt.hemisphereLights.value=F.state.hemi,Nt.directionalShadowMap.value=F.state.directionalShadowMap,Nt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Nt.spotShadowMap.value=F.state.spotShadowMap,Nt.spotLightMatrix.value=F.state.spotLightMatrix,Nt.spotLightMap.value=F.state.spotLightMap,Nt.pointShadowMap.value=F.state.pointShadowMap,Nt.pointShadowMatrix.value=F.state.pointShadowMatrix),k.currentProgram=Dt,k.uniformsList=null,Dt}function Pl(w){if(w.uniformsList===null){const I=w.currentProgram.getUniforms();w.uniformsList=Js.seqWithValue(I.seq,w.uniforms)}return w.uniformsList}function Rl(w,I){const B=Ut.get(w);B.outputColorSpace=I.outputColorSpace,B.batching=I.batching,B.instancing=I.instancing,B.instancingColor=I.instancingColor,B.instancingMorph=I.instancingMorph,B.skinning=I.skinning,B.morphTargets=I.morphTargets,B.morphNormals=I.morphNormals,B.morphColors=I.morphColors,B.morphTargetsCount=I.morphTargetsCount,B.numClippingPlanes=I.numClippingPlanes,B.numIntersection=I.numClipIntersection,B.vertexAlphas=I.vertexAlphas,B.vertexTangents=I.vertexTangents,B.toneMapping=I.toneMapping}function Jd(w,I,B,k,F){I.isScene!==!0&&(I=Yt),Ot.resetTextureUnits();const ht=I.fog,gt=k.isMeshStandardMaterial?I.environment:null,Mt=C===null?_.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:si,Ct=(k.isMeshStandardMaterial?y:ne).get(k.envMap||gt),zt=k.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Dt=!!B.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Nt=!!B.morphAttributes.position,ve=!!B.morphAttributes.normal,qe=!!B.morphAttributes.color;let Me=Zn;k.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Me=_.toneMapping);const bn=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ce=bn!==void 0?bn.length:0,Ft=Ut.get(k),Ao=f.state.lights;if(z===!0&&(tt===!0||w!==K)){const Je=w===K&&k.id===O;ot.setState(k,w,Je)}let oe=!1;k.version===Ft.__version?(Ft.needsLights&&Ft.lightsStateVersion!==Ao.state.version||Ft.outputColorSpace!==Mt||F.isBatchedMesh&&Ft.batching===!1||!F.isBatchedMesh&&Ft.batching===!0||F.isInstancedMesh&&Ft.instancing===!1||!F.isInstancedMesh&&Ft.instancing===!0||F.isSkinnedMesh&&Ft.skinning===!1||!F.isSkinnedMesh&&Ft.skinning===!0||F.isInstancedMesh&&Ft.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ft.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ft.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ft.instancingMorph===!1&&F.morphTexture!==null||Ft.envMap!==Ct||k.fog===!0&&Ft.fog!==ht||Ft.numClippingPlanes!==void 0&&(Ft.numClippingPlanes!==ot.numPlanes||Ft.numIntersection!==ot.numIntersection)||Ft.vertexAlphas!==zt||Ft.vertexTangents!==Dt||Ft.morphTargets!==Nt||Ft.morphNormals!==ve||Ft.morphColors!==qe||Ft.toneMapping!==Me||It.isWebGL2===!0&&Ft.morphTargetsCount!==ce)&&(oe=!0):(oe=!0,Ft.__version=k.version);let ai=Ft.currentProgram;oe===!0&&(ai=vs(k,I,F));let Ll=!1,Sr=!1,Po=!1;const Re=ai.getUniforms(),li=Ft.uniforms;if(yt.useProgram(ai.program)&&(Ll=!0,Sr=!0,Po=!0),k.id!==O&&(O=k.id,Sr=!0),Ll||K!==w){Re.setValue(U,"projectionMatrix",w.projectionMatrix),Re.setValue(U,"viewMatrix",w.matrixWorldInverse);const Je=Re.map.cameraPosition;Je!==void 0&&Je.setValue(U,ft.setFromMatrixPosition(w.matrixWorld)),It.logarithmicDepthBuffer&&Re.setValue(U,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&Re.setValue(U,"isOrthographic",w.isOrthographicCamera===!0),K!==w&&(K=w,Sr=!0,Po=!0)}if(F.isSkinnedMesh){Re.setOptional(U,F,"bindMatrix"),Re.setOptional(U,F,"bindMatrixInverse");const Je=F.skeleton;Je&&(It.floatVertexTextures?(Je.boneTexture===null&&Je.computeBoneTexture(),Re.setValue(U,"boneTexture",Je.boneTexture,Ot)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}F.isBatchedMesh&&(Re.setOptional(U,F,"batchingTexture"),Re.setValue(U,"batchingTexture",F._matricesTexture,Ot));const Ro=B.morphAttributes;if((Ro.position!==void 0||Ro.normal!==void 0||Ro.color!==void 0&&It.isWebGL2===!0)&&rt.update(F,B,ai),(Sr||Ft.receiveShadow!==F.receiveShadow)&&(Ft.receiveShadow=F.receiveShadow,Re.setValue(U,"receiveShadow",F.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(li.envMap.value=Ct,li.flipEnvMap.value=Ct.isCubeTexture&&Ct.isRenderTargetTexture===!1?-1:1),Sr&&(Re.setValue(U,"toneMappingExposure",_.toneMappingExposure),Ft.needsLights&&Qd(li,Po),ht&&k.fog===!0&&J.refreshFogUniforms(li,ht),J.refreshMaterialUniforms(li,k,Y,V,dt),Js.upload(U,Pl(Ft),li,Ot)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Js.upload(U,Pl(Ft),li,Ot),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&Re.setValue(U,"center",F.center),Re.setValue(U,"modelViewMatrix",F.modelViewMatrix),Re.setValue(U,"normalMatrix",F.normalMatrix),Re.setValue(U,"modelMatrix",F.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Je=k.uniformsGroups;for(let Lo=0,ep=Je.length;Lo<ep;Lo++)if(It.isWebGL2){const Dl=Je[Lo];_t.update(Dl,ai),_t.bind(Dl,ai)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ai}function Qd(w,I){w.ambientLightColor.needsUpdate=I,w.lightProbe.needsUpdate=I,w.directionalLights.needsUpdate=I,w.directionalLightShadows.needsUpdate=I,w.pointLights.needsUpdate=I,w.pointLightShadows.needsUpdate=I,w.spotLights.needsUpdate=I,w.spotLightShadows.needsUpdate=I,w.rectAreaLights.needsUpdate=I,w.hemisphereLights.needsUpdate=I}function tp(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(w,I,B){Ut.get(w.texture).__webglTexture=I,Ut.get(w.depthTexture).__webglTexture=B;const k=Ut.get(w);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=B===void 0,k.__autoAllocateDepthBuffer||wt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,I){const B=Ut.get(w);B.__webglFramebuffer=I,B.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(w,I=0,B=0){C=w,D=I,R=B;let k=!0,F=null,ht=!1,gt=!1;if(w){const Ct=Ut.get(w);Ct.__useDefaultFramebuffer!==void 0?(yt.bindFramebuffer(U.FRAMEBUFFER,null),k=!1):Ct.__webglFramebuffer===void 0?Ot.setupRenderTarget(w):Ct.__hasExternalTextures&&Ot.rebindTextures(w,Ut.get(w.texture).__webglTexture,Ut.get(w.depthTexture).__webglTexture);const zt=w.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(gt=!0);const Dt=Ut.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Dt[I])?F=Dt[I][B]:F=Dt[I],ht=!0):It.isWebGL2&&w.samples>0&&Ot.useMultisampledRTT(w)===!1?F=Ut.get(w).__webglMultisampledFramebuffer:Array.isArray(Dt)?F=Dt[B]:F=Dt,b.copy(w.viewport),T.copy(w.scissor),$=w.scissorTest}else b.copy(it).multiplyScalar(Y).floor(),T.copy(st).multiplyScalar(Y).floor(),$=pt;if(yt.bindFramebuffer(U.FRAMEBUFFER,F)&&It.drawBuffers&&k&&yt.drawBuffers(w,F),yt.viewport(b),yt.scissor(T),yt.setScissorTest($),ht){const Ct=Ut.get(w.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+I,Ct.__webglTexture,B)}else if(gt){const Ct=Ut.get(w.texture),zt=I||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ct.__webglTexture,B||0,zt)}O=-1},this.readRenderTargetPixels=function(w,I,B,k,F,ht,gt){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=Ut.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&gt!==void 0&&(Mt=Mt[gt]),Mt){yt.bindFramebuffer(U.FRAMEBUFFER,Mt);try{const Ct=w.texture,zt=Ct.format,Dt=Ct.type;if(zt!==cn&&bt.convert(zt)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Nt=Dt===Xr&&(wt.has("EXT_color_buffer_half_float")||It.isWebGL2&&wt.has("EXT_color_buffer_float"));if(Dt!==Jn&&bt.convert(Dt)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Dt===An&&(It.isWebGL2||wt.has("OES_texture_float")||wt.has("WEBGL_color_buffer_float")))&&!Nt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=w.width-k&&B>=0&&B<=w.height-F&&U.readPixels(I,B,k,F,bt.convert(zt),bt.convert(Dt),ht)}finally{const Ct=C!==null?Ut.get(C).__webglFramebuffer:null;yt.bindFramebuffer(U.FRAMEBUFFER,Ct)}}},this.copyFramebufferToTexture=function(w,I,B=0){const k=Math.pow(2,-B),F=Math.floor(I.image.width*k),ht=Math.floor(I.image.height*k);Ot.setTexture2D(I,0),U.copyTexSubImage2D(U.TEXTURE_2D,B,0,0,w.x,w.y,F,ht),yt.unbindTexture()},this.copyTextureToTexture=function(w,I,B,k=0){const F=I.image.width,ht=I.image.height,gt=bt.convert(B.format),Mt=bt.convert(B.type);Ot.setTexture2D(B,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,B.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,B.unpackAlignment),I.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,k,w.x,w.y,F,ht,gt,Mt,I.image.data):I.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,k,w.x,w.y,I.mipmaps[0].width,I.mipmaps[0].height,gt,I.mipmaps[0].data):U.texSubImage2D(U.TEXTURE_2D,k,w.x,w.y,gt,Mt,I.image),k===0&&B.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),yt.unbindTexture()},this.copyTextureToTexture3D=function(w,I,B,k,F=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ht=Math.round(w.max.x-w.min.x),gt=Math.round(w.max.y-w.min.y),Mt=w.max.z-w.min.z+1,Ct=bt.convert(k.format),zt=bt.convert(k.type);let Dt;if(k.isData3DTexture)Ot.setTexture3D(k,0),Dt=U.TEXTURE_3D;else if(k.isDataArrayTexture||k.isCompressedArrayTexture)Ot.setTexture2DArray(k,0),Dt=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,k.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,k.unpackAlignment);const Nt=U.getParameter(U.UNPACK_ROW_LENGTH),ve=U.getParameter(U.UNPACK_IMAGE_HEIGHT),qe=U.getParameter(U.UNPACK_SKIP_PIXELS),Me=U.getParameter(U.UNPACK_SKIP_ROWS),bn=U.getParameter(U.UNPACK_SKIP_IMAGES),ce=B.isCompressedTexture?B.mipmaps[F]:B.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,ce.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ce.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,w.min.x),U.pixelStorei(U.UNPACK_SKIP_ROWS,w.min.y),U.pixelStorei(U.UNPACK_SKIP_IMAGES,w.min.z),B.isDataTexture||B.isData3DTexture?U.texSubImage3D(Dt,F,I.x,I.y,I.z,ht,gt,Mt,Ct,zt,ce.data):k.isCompressedArrayTexture?U.compressedTexSubImage3D(Dt,F,I.x,I.y,I.z,ht,gt,Mt,Ct,ce.data):U.texSubImage3D(Dt,F,I.x,I.y,I.z,ht,gt,Mt,Ct,zt,ce),U.pixelStorei(U.UNPACK_ROW_LENGTH,Nt),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ve),U.pixelStorei(U.UNPACK_SKIP_PIXELS,qe),U.pixelStorei(U.UNPACK_SKIP_ROWS,Me),U.pixelStorei(U.UNPACK_SKIP_IMAGES,bn),F===0&&k.generateMipmaps&&U.generateMipmap(Dt),yt.unbindTexture()},this.initTexture=function(w){w.isCubeTexture?Ot.setTextureCube(w,0):w.isData3DTexture?Ot.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Ot.setTexture2DArray(w,0):Ot.setTexture2D(w,0),yt.unbindTexture()},this.resetState=function(){D=0,R=0,C=null,yt.reset(),mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===ja?"display-p3":"srgb",e.unpackColorSpace=Qt.workingColorSpace===xo?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class F0 extends Fh{}F0.prototype.isWebGL1Renderer=!0;class B0 extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Dn,this.environmentRotation=new Dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class k0{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ra,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=vn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return gh("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let r=0,s=this.stride;r<s;r++)this.array[t+r]=e.array[i+r];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ie=new A;class ho{constructor(t,e,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix4(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.applyNormalMatrix(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.transformDirection(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=un(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Jt(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=Jt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Jt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Jt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Jt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=un(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=un(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=un(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=un(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=Jt(e,this.array),i=Jt(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Jt(e,this.array),i=Jt(i,this.array),r=Jt(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this}setXYZW(t,e,i,r,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Jt(e,this.array),i=Jt(i,this.array),r=Jt(r,this.array),s=Jt(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=r,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return new dn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ho(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class V0 extends Di{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Xt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Qi;const Lr=new A,tr=new A,er=new A,nr=new lt,Dr=new lt,Bh=new ae,ks=new A,Ir=new A,Vs=new A,nu=new lt,ca=new lt,iu=new lt;class z0 extends Ce{constructor(t=new V0){if(super(),this.isSprite=!0,this.type="Sprite",Qi===void 0){Qi=new _e;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new k0(e,5);Qi.setIndex([0,1,2,0,2,3]),Qi.setAttribute("position",new ho(i,3,0,!1)),Qi.setAttribute("uv",new ho(i,2,3,!1))}this.geometry=Qi,this.material=t,this.center=new lt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),tr.setFromMatrixScale(this.matrixWorld),Bh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),er.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&tr.multiplyScalar(-er.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const o=this.center;zs(ks.set(-.5,-.5,0),er,o,tr,r,s),zs(Ir.set(.5,-.5,0),er,o,tr,r,s),zs(Vs.set(.5,.5,0),er,o,tr,r,s),nu.set(0,0),ca.set(1,0),iu.set(1,1);let a=t.ray.intersectTriangle(ks,Ir,Vs,!1,Lr);if(a===null&&(zs(Ir.set(-.5,.5,0),er,o,tr,r,s),ca.set(0,1),a=t.ray.intersectTriangle(ks,Vs,Ir,!1,Lr),a===null))return;const l=t.ray.origin.distanceTo(Lr);l<t.near||l>t.far||e.push({distance:l,point:Lr.clone(),uv:hn.getInterpolation(Lr,ks,Ir,Vs,nu,ca,iu,new lt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function zs(n,t,e,i,r,s){nr.subVectors(n,e).addScalar(.5).multiply(i),r!==void 0?(Dr.x=s*nr.x-r*nr.y,Dr.y=r*nr.x+s*nr.y):Dr.copy(nr),n.copy(t),n.x+=Dr.x,n.y+=Dr.y,n.applyMatrix4(Bh)}class ii extends Di{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Xt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ru=new A,su=new A,ou=new ae,ua=new bo,Hs=new is;class ur extends Ce{constructor(t=new _e,e=new ii){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let r=1,s=e.count;r<s;r++)ru.fromBufferAttribute(e,r-1),su.fromBufferAttribute(e,r),i[r]=i[r-1],i[r]+=ru.distanceTo(su);t.setAttribute("lineDistance",new me(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Hs.copy(i.boundingSphere),Hs.applyMatrix4(r),Hs.radius+=s,t.ray.intersectsSphere(Hs)===!1)return;ou.copy(r).invert(),ua.copy(t.ray).applyMatrix4(ou);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new A,u=new A,h=new A,d=new A,m=this.isLineSegments?2:1,v=i.index,f=i.attributes.position;if(v!==null){const p=Math.max(0,o.start),E=Math.min(v.count,o.start+o.count);for(let _=p,M=E-1;_<M;_+=m){const D=v.getX(_),R=v.getX(_+1);if(c.fromBufferAttribute(f,D),u.fromBufferAttribute(f,R),ua.distanceSqToSegment(c,u,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);const O=t.ray.origin.distanceTo(d);O<t.near||O>t.far||e.push({distance:O,point:h.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,o.start),E=Math.min(f.count,o.start+o.count);for(let _=p,M=E-1;_<M;_+=m){if(c.fromBufferAttribute(f,_),u.fromBufferAttribute(f,_+1),ua.distanceSqToSegment(c,u,d,h)>l)continue;d.applyMatrix4(this.matrixWorld);const R=t.ray.origin.distanceTo(d);R<t.near||R>t.far||e.push({distance:R,point:h.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const au=new A,lu=new A;class Za extends ur{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let r=0,s=e.count;r<s;r+=2)au.fromBufferAttribute(e,r),lu.fromBufferAttribute(e,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+au.distanceTo(lu);t.setAttribute("lineDistance",new me(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class kh extends Di{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const cu=new ae,Ua=new bo,Gs=new is,Ws=new A;class H0 extends Ce{constructor(t=new _e,e=new kh){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Gs.copy(i.boundingSphere),Gs.applyMatrix4(r),Gs.radius+=s,t.ray.intersectsSphere(Gs)===!1)return;cu.copy(r).invert(),Ua.copy(t.ray).applyMatrix4(cu);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,h=i.attributes.position;if(c!==null){const d=Math.max(0,o.start),m=Math.min(c.count,o.start+o.count);for(let v=d,x=m;v<x;v++){const f=c.getX(v);Ws.fromBufferAttribute(h,f),uu(Ws,f,l,r,t,e,this)}}else{const d=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let v=d,x=m;v<x;v++)Ws.fromBufferAttribute(h,v),uu(Ws,v,l,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function uu(n,t,e,i,r,s,o){const a=Ua.distanceSqToPoint(n);if(a<e){const l=new A;Ua.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,object:o})}}class xn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,r=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),s+=i.distanceTo(r),e.push(s),r=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let r=0;const s=i.length;let o;e?o=e:o=t*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const u=i[r],d=i[r+1]-u,m=(o-u)/d;return(r+m)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=e||(o.isVector2?new lt:new A);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new A,r=[],s=[],o=[],a=new A,l=new ae;for(let m=0;m<=t;m++){const v=m/t;r[m]=this.getTangentAt(v,new A)}s[0]=new A,o[0]=new A;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),d=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),d<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let m=1;m<=t;m++){if(s[m]=s[m-1].clone(),o[m]=o[m-1].clone(),a.crossVectors(r[m-1],r[m]),a.length()>Number.EPSILON){a.normalize();const v=Math.acos(Te(r[m-1].dot(r[m]),-1,1));s[m].applyMatrix4(l.makeRotationAxis(a,v))}o[m].crossVectors(r[m],s[m])}if(e===!0){let m=Math.acos(Te(s[0].dot(s[t]),-1,1));m/=t,r[0].dot(a.crossVectors(s[0],s[t]))>0&&(m=-m);for(let v=1;v<=t;v++)s[v].applyMatrix4(l.makeRotationAxis(r[v],m*v)),o[v].crossVectors(r[v],s[v])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ja extends xn{constructor(t=0,e=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new lt){const i=e,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,m=c-this.aY;l=d*u-m*h+this.aX,c=d*h+m*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class G0 extends Ja{constructor(t,e,i,r,s,o){super(t,e,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Qa(){let n=0,t=0,e=0,i=0;function r(s,o,a,l){n=s,t=a,e=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,h){let d=(o-s)/c-(a-s)/(c+u)+(a-o)/u,m=(a-o)/u-(l-o)/(u+h)+(l-a)/h;d*=u,m*=u,r(o,a,d,m)},calc:function(s){const o=s*s,a=o*s;return n+t*s+e*o+i*a}}}const Xs=new A,ha=new Qa,da=new Qa,pa=new Qa;class W0 extends xn{constructor(t=[],e=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=r}getPoint(t,e=new A){const i=e,r=this.points,s=r.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:(Xs.subVectors(r[0],r[1]).add(r[0]),c=Xs);const h=r[a%s],d=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(Xs.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Xs),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let v=Math.pow(c.distanceToSquared(h),m),x=Math.pow(h.distanceToSquared(d),m),f=Math.pow(d.distanceToSquared(u),m);x<1e-4&&(x=1),v<1e-4&&(v=x),f<1e-4&&(f=x),ha.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,v,x,f),da.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,v,x,f),pa.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,v,x,f)}else this.curveType==="catmullrom"&&(ha.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),da.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),pa.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return i.set(ha.calc(l),da.calc(l),pa.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(new A().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function hu(n,t,e,i,r){const s=(i-t)*.5,o=(r-e)*.5,a=n*n,l=n*a;return(2*e-2*i+s+o)*l+(-3*e+3*i-2*s-o)*a+s*n+e}function X0(n,t){const e=1-n;return e*e*t}function q0(n,t){return 2*(1-n)*n*t}function Y0(n,t){return n*n*t}function Vr(n,t,e,i){return X0(n,t)+q0(n,e)+Y0(n,i)}function j0(n,t){const e=1-n;return e*e*e*t}function K0(n,t){const e=1-n;return 3*e*e*n*t}function $0(n,t){return 3*(1-n)*n*n*t}function Z0(n,t){return n*n*n*t}function zr(n,t,e,i,r){return j0(n,t)+K0(n,e)+$0(n,i)+Z0(n,r)}class Vh extends xn{constructor(t=new lt,e=new lt,i=new lt,r=new lt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new lt){const i=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(zr(t,r.x,s.x,o.x,a.x),zr(t,r.y,s.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class J0 extends xn{constructor(t=new A,e=new A,i=new A,r=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=r}getPoint(t,e=new A){const i=e,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(zr(t,r.x,s.x,o.x,a.x),zr(t,r.y,s.y,o.y,a.y),zr(t,r.z,s.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class zh extends xn{constructor(t=new lt,e=new lt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new lt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new lt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Q0 extends xn{constructor(t=new A,e=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new A){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new A){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Hh extends xn{constructor(t=new lt,e=new lt,i=new lt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new lt){const i=e,r=this.v0,s=this.v1,o=this.v2;return i.set(Vr(t,r.x,s.x,o.x),Vr(t,r.y,s.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class tx extends xn{constructor(t=new A,e=new A,i=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new A){const i=e,r=this.v0,s=this.v1,o=this.v2;return i.set(Vr(t,r.x,s.x,o.x),Vr(t,r.y,s.y,o.y),Vr(t,r.z,s.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Gh extends xn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new lt){const i=e,r=this.points,s=(r.length-1)*t,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],u=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return i.set(hu(a,l.x,c.x,u.x,h.x),hu(a,l.y,c.y,u.y,h.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const r=t.points[e];this.points.push(new lt().fromArray(r))}return this}}var du=Object.freeze({__proto__:null,ArcCurve:G0,CatmullRomCurve3:W0,CubicBezierCurve:Vh,CubicBezierCurve3:J0,EllipseCurve:Ja,LineCurve:zh,LineCurve3:Q0,QuadraticBezierCurve:Hh,QuadraticBezierCurve3:tx,SplineCurve:Gh});class ex extends xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new du[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,r=this.curves.length;i<r;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const r=t.curves[e];this.curves.push(new du[r.type]().fromJSON(r))}return this}}class pu extends ex{constructor(t){super(),this.type="Path",this.currentPoint=new lt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new zh(this.currentPoint.clone(),new lt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,r){const s=new Hh(this.currentPoint.clone(),new lt(t,e),new lt(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(t,e,i,r,s,o){const a=new Vh(this.currentPoint.clone(),new lt(t,e),new lt(i,r),new lt(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new Gh(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,i,r,s,o),this}absarc(t,e,i,r,s,o){return this.absellipse(t,e,i,i,r,s,o),this}ellipse(t,e,i,r,s,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,i,r,s,o,a,l),this}absellipse(t,e,i,r,s,o,a,l){const c=new Ja(t,e,i,r,s,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class tl extends _e{constructor(t=1,e=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],d=[],m=[];let v=0;const x=[],f=i/2;let p=0;E(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new me(h,3)),this.setAttribute("normal",new me(d,3)),this.setAttribute("uv",new me(m,2));function E(){const M=new A,D=new A;let R=0;const C=(e-t)/i;for(let O=0;O<=s;O++){const K=[],b=O/s,T=b*(e-t)+t;for(let $=0;$<=r;$++){const Z=$/r,L=Z*l+a,G=Math.sin(L),V=Math.cos(L);D.x=T*G,D.y=-b*i+f,D.z=T*V,h.push(D.x,D.y,D.z),M.set(G,C,V).normalize(),d.push(M.x,M.y,M.z),m.push(Z,1-b),K.push(v++)}x.push(K)}for(let O=0;O<r;O++)for(let K=0;K<s;K++){const b=x[K][O],T=x[K+1][O],$=x[K+1][O+1],Z=x[K][O+1];u.push(b,T,Z),u.push(T,$,Z),R+=6}c.addGroup(p,R,0),p+=R}function _(M){const D=v,R=new lt,C=new A;let O=0;const K=M===!0?t:e,b=M===!0?1:-1;for(let $=1;$<=r;$++)h.push(0,f*b,0),d.push(0,b,0),m.push(.5,.5),v++;const T=v;for(let $=0;$<=r;$++){const L=$/r*l+a,G=Math.cos(L),V=Math.sin(L);C.x=K*V,C.y=f*b,C.z=K*G,h.push(C.x,C.y,C.z),d.push(0,b,0),R.x=G*.5+.5,R.y=V*.5*b+.5,m.push(R.x,R.y),v++}for(let $=0;$<r;$++){const Z=D+$,L=T+$;M===!0?u.push(L,L+1,Z):u.push(L+1,L,Z),O+=3}c.addGroup(p,O,M===!0?1:2),p+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tl(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Hr extends pu{constructor(t){super(t),this.uuid=vn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,r=this.holes.length;i<r;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const r=t.holes[e];this.holes.push(new pu().fromJSON(r))}return this}}const nx={triangulate:function(n,t,e=2){const i=t&&t.length,r=i?t[0]*e:n.length;let s=Wh(n,0,r,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,u,h,d,m;if(i&&(s=ax(n,t,s,e)),n.length>80*e){a=c=n[0],l=u=n[1];for(let v=e;v<r;v+=e)h=n[v],d=n[v+1],h<a&&(a=h),d<l&&(l=d),h>c&&(c=h),d>u&&(u=d);m=Math.max(c-a,u-l),m=m!==0?32767/m:0}return Yr(s,o,e,a,l,m,0),o}};function Wh(n,t,e,i,r){let s,o;if(r===gx(n,t,e,i)>0)for(s=t;s<e;s+=i)o=fu(s,n[s],n[s+1],o);else for(s=e-i;s>=t;s-=i)o=fu(s,n[s],n[s+1],o);return o&&Eo(o,o.next)&&(Kr(o),o=o.next),o}function Ci(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Eo(e,e.next)||ue(e.prev,e,e.next)===0)){if(Kr(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Yr(n,t,e,i,r,s,o){if(!n)return;!o&&s&&dx(n,i,r,s);let a=n,l,c;for(;n.prev!==n.next;){if(l=n.prev,c=n.next,s?rx(n,i,r,s):ix(n)){t.push(l.i/e|0),t.push(n.i/e|0),t.push(c.i/e|0),Kr(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=sx(Ci(n),t,e),Yr(n,t,e,i,r,s,2)):o===2&&ox(n,t,e,i,r,s):Yr(Ci(n),t,e,i,r,s,1);break}}}function ix(n){const t=n.prev,e=n,i=n.next;if(ue(t,e,i)>=0)return!1;const r=t.x,s=e.x,o=i.x,a=t.y,l=e.y,c=i.y,u=r<s?r<o?r:o:s<o?s:o,h=a<l?a<c?a:c:l<c?l:c,d=r>s?r>o?r:o:s>o?s:o,m=a>l?a>c?a:c:l>c?l:c;let v=i.next;for(;v!==t;){if(v.x>=u&&v.x<=d&&v.y>=h&&v.y<=m&&ar(r,a,s,l,o,c,v.x,v.y)&&ue(v.prev,v,v.next)>=0)return!1;v=v.next}return!0}function rx(n,t,e,i){const r=n.prev,s=n,o=n.next;if(ue(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,u=r.y,h=s.y,d=o.y,m=a<l?a<c?a:c:l<c?l:c,v=u<h?u<d?u:d:h<d?h:d,x=a>l?a>c?a:c:l>c?l:c,f=u>h?u>d?u:d:h>d?h:d,p=Na(m,v,t,e,i),E=Na(x,f,t,e,i);let _=n.prevZ,M=n.nextZ;for(;_&&_.z>=p&&M&&M.z<=E;){if(_.x>=m&&_.x<=x&&_.y>=v&&_.y<=f&&_!==r&&_!==o&&ar(a,u,l,h,c,d,_.x,_.y)&&ue(_.prev,_,_.next)>=0||(_=_.prevZ,M.x>=m&&M.x<=x&&M.y>=v&&M.y<=f&&M!==r&&M!==o&&ar(a,u,l,h,c,d,M.x,M.y)&&ue(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;_&&_.z>=p;){if(_.x>=m&&_.x<=x&&_.y>=v&&_.y<=f&&_!==r&&_!==o&&ar(a,u,l,h,c,d,_.x,_.y)&&ue(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;M&&M.z<=E;){if(M.x>=m&&M.x<=x&&M.y>=v&&M.y<=f&&M!==r&&M!==o&&ar(a,u,l,h,c,d,M.x,M.y)&&ue(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function sx(n,t,e){let i=n;do{const r=i.prev,s=i.next.next;!Eo(r,s)&&Xh(r,i,i.next,s)&&jr(r,s)&&jr(s,r)&&(t.push(r.i/e|0),t.push(i.i/e|0),t.push(s.i/e|0),Kr(i),Kr(i.next),i=n=s),i=i.next}while(i!==n);return Ci(i)}function ox(n,t,e,i,r,s){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&mx(o,a)){let l=qh(o,a);o=Ci(o,o.next),l=Ci(l,l.next),Yr(o,t,e,i,r,s,0),Yr(l,t,e,i,r,s,0);return}a=a.next}o=o.next}while(o!==n)}function ax(n,t,e,i){const r=[];let s,o,a,l,c;for(s=0,o=t.length;s<o;s++)a=t[s]*i,l=s<o-1?t[s+1]*i:n.length,c=Wh(n,a,l,i,!1),c===c.next&&(c.steiner=!0),r.push(fx(c));for(r.sort(lx),s=0;s<r.length;s++)e=cx(r[s],e);return e}function lx(n,t){return n.x-t.x}function cx(n,t){const e=ux(n,t);if(!e)return t;const i=qh(e,n);return Ci(i,i.next),Ci(e,e.next)}function ux(n,t){let e=t,i=-1/0,r;const s=n.x,o=n.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=s&&d>i&&(i=d,r=e.x<e.next.x?e:e.next,d===s))return r}e=e.next}while(e!==t);if(!r)return null;const a=r,l=r.x,c=r.y;let u=1/0,h;e=r;do s>=e.x&&e.x>=l&&s!==e.x&&ar(o<c?s:i,o,l,c,o<c?i:s,o,e.x,e.y)&&(h=Math.abs(o-e.y)/(s-e.x),jr(e,n)&&(h<u||h===u&&(e.x>r.x||e.x===r.x&&hx(r,e)))&&(r=e,u=h)),e=e.next;while(e!==a);return r}function hx(n,t){return ue(n.prev,n,t.prev)<0&&ue(t.next,n,n.next)<0}function dx(n,t,e,i){let r=n;do r.z===0&&(r.z=Na(r.x,r.y,t,e,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,px(r)}function px(n){let t,e,i,r,s,o,a,l,c=1;do{for(e=n,n=null,s=null,o=0;e;){for(o++,i=e,a=0,t=0;t<c&&(a++,i=i.nextZ,!!i);t++);for(l=c;a>0||l>0&&i;)a!==0&&(l===0||!i||e.z<=i.z)?(r=e,e=e.nextZ,a--):(r=i,i=i.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;e=i}s.nextZ=null,c*=2}while(o>1);return n}function Na(n,t,e,i,r){return n=(n-e)*r|0,t=(t-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function fx(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function ar(n,t,e,i,r,s,o,a){return(r-o)*(t-a)>=(n-o)*(s-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(r-o)*(i-a)}function mx(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!vx(n,t)&&(jr(n,t)&&jr(t,n)&&_x(n,t)&&(ue(n.prev,n,t.prev)||ue(n,t.prev,t))||Eo(n,t)&&ue(n.prev,n,n.next)>0&&ue(t.prev,t,t.next)>0)}function ue(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Eo(n,t){return n.x===t.x&&n.y===t.y}function Xh(n,t,e,i){const r=Ys(ue(n,t,e)),s=Ys(ue(n,t,i)),o=Ys(ue(e,i,n)),a=Ys(ue(e,i,t));return!!(r!==s&&o!==a||r===0&&qs(n,e,t)||s===0&&qs(n,i,t)||o===0&&qs(e,n,i)||a===0&&qs(e,t,i))}function qs(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function Ys(n){return n>0?1:n<0?-1:0}function vx(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Xh(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function jr(n,t){return ue(n.prev,n,n.next)<0?ue(n,t,n.next)>=0&&ue(n,n.prev,t)>=0:ue(n,t,n.prev)<0||ue(n,n.next,t)<0}function _x(n,t){let e=n,i=!1;const r=(n.x+t.x)/2,s=(n.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&r<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function qh(n,t){const e=new Oa(n.i,n.x,n.y),i=new Oa(t.i,t.x,t.y),r=n.next,s=t.prev;return n.next=t,t.prev=n,e.next=r,r.prev=e,i.next=e,e.prev=i,s.next=i,i.prev=s,i}function fu(n,t,e,i){const r=new Oa(n,t,e);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Kr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Oa(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function gx(n,t,e,i){let r=0;for(let s=t,o=e-i;s<e;s+=i)r+=(n[o]-n[s])*(n[s+1]+n[o+1]),o=s;return r}class Gr{static area(t){const e=t.length;let i=0;for(let r=e-1,s=0;s<e;r=s++)i+=t[r].x*t[s].y-t[s].x*t[r].y;return i*.5}static isClockWise(t){return Gr.area(t)<0}static triangulateShape(t,e){const i=[],r=[],s=[];mu(t),vu(i,t);let o=t.length;e.forEach(mu);for(let l=0;l<e.length;l++)r.push(o),o+=e[l].length,vu(i,e[l]);const a=nx.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function mu(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function vu(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class hr extends _e{constructor(t=new Hr([new lt(0,.5),new lt(-.5,-.5),new lt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],r=[],s=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let u=0;u<t.length;u++)c(t[u]),this.addGroup(a,l,u),a+=l,l=0;this.setIndex(i),this.setAttribute("position",new me(r,3)),this.setAttribute("normal",new me(s,3)),this.setAttribute("uv",new me(o,2));function c(u){const h=r.length/3,d=u.extractPoints(e);let m=d.shape;const v=d.holes;Gr.isClockWise(m)===!1&&(m=m.reverse());for(let f=0,p=v.length;f<p;f++){const E=v[f];Gr.isClockWise(E)===!0&&(v[f]=E.reverse())}const x=Gr.triangulateShape(m,v);for(let f=0,p=v.length;f<p;f++){const E=v[f];m=m.concat(E)}for(let f=0,p=m.length;f<p;f++){const E=m[f];r.push(E.x,E.y,0),s.push(0,0,1),o.push(E.x,E.y)}for(let f=0,p=x.length;f<p;f++){const E=x[f],_=E[0]+h,M=E[1]+h,D=E[2]+h;i.push(_,M,D),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return xx(e,t)}static fromJSON(t,e){const i=[];for(let r=0,s=t.shapes.length;r<s;r++){const o=e[t.shapes[r]];i.push(o)}return new hr(i,t.curveSegments)}}function xx(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const r=n[e];t.shapes.push(r.uuid)}else t.shapes.push(n.uuid);return t}class _u{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Te(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class bx extends Za{constructor(t=10,e=10,i=4473924,r=8947848){i=new Xt(i),r=new Xt(r);const s=e/2,o=t/e,a=t/2,l=[],c=[];for(let d=0,m=0,v=-a;d<=e;d++,v+=o){l.push(-a,0,v,a,0,v),l.push(v,0,-a,v,0,a);const x=d===s?i:r;x.toArray(c,m),m+=3,x.toArray(c,m),m+=3,x.toArray(c,m),m+=3,x.toArray(c,m),m+=3}const u=new _e;u.setAttribute("position",new me(l,3)),u.setAttribute("color",new me(c,3));const h=new ii({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}const gu=new A;let js,fa;class Ei extends Ce{constructor(t=new A(0,0,1),e=new A(0,0,0),i=1,r=16776960,s=i*.2,o=s*.2){super(),this.type="ArrowHelper",js===void 0&&(js=new _e,js.setAttribute("position",new me([0,0,0,0,1,0],3)),fa=new tl(0,.5,1,5,1),fa.translate(0,-.5,0)),this.position.copy(e),this.line=new ur(js,new ii({color:r,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Oe(fa,new Qn({color:r,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(i,s,o)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{gu.set(t.z,0,-t.x).normalize();const e=Math.acos(t.y);this.quaternion.setFromAxisAngle(gu,e)}}setLength(t,e=t*.2,i=e*.2){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(i,e,i),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qa);const xu={type:"change"},ma={type:"start"},bu={type:"end"},Ks=new bo,wu=new Xn,wx=Math.cos(70*Mf.DEG2RAD);class yx extends Li{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new A,this.cursor=new A,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ni.ROTATE,MIDDLE:Ni.DOLLY,RIGHT:Ni.PAN},this.touches={ONE:Oi.ROTATE,TWO:Oi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(S){S.addEventListener("keydown",Et),this._domElementKeyEvents=S},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Et),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(xu),i.update(),s=r.NONE},this.update=function(){const S=new A,j=new Ti().setFromUnitVectors(t.up,new A(0,1,0)),vt=j.clone().invert(),P=new A,nt=new Ti,N=new A,Q=2*Math.PI;return function(Gt=null){const Zt=i.object.position;S.copy(Zt).sub(i.target),S.applyQuaternion(j),a.setFromVector3(S),i.autoRotate&&s===r.NONE&&$(b(Gt)),i.enableDamping?(a.theta+=l.theta*i.dampingFactor,a.phi+=l.phi*i.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let te=i.minAzimuthAngle,pe=i.maxAzimuthAngle;isFinite(te)&&isFinite(pe)&&(te<-Math.PI?te+=Q:te>Math.PI&&(te-=Q),pe<-Math.PI?pe+=Q:pe>Math.PI&&(pe-=Q),te<=pe?a.theta=Math.max(te,Math.min(pe,a.theta)):a.theta=a.theta>(te+pe)/2?Math.max(te,a.theta):Math.min(pe,a.theta)),a.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,a.phi)),a.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor);let jt=!1;if(i.zoomToCursor&&R||i.object.isOrthographicCamera)a.radius=it(a.radius);else{const ie=a.radius;a.radius=it(a.radius*c),jt=ie!=a.radius}if(S.setFromSpherical(a),S.applyQuaternion(vt),Zt.copy(i.target).add(S),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),u.set(0,0,0)),i.zoomToCursor&&R){let ie=null;if(i.object.isPerspectiveCamera){const Pe=S.length();ie=it(Pe*c);const oi=Pe-ie;i.object.position.addScaledVector(M,oi),i.object.updateMatrixWorld(),jt=!!oi}else if(i.object.isOrthographicCamera){const Pe=new A(D.x,D.y,0);Pe.unproject(i.object);const oi=i.object.zoom;i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),jt=oi!==i.object.zoom;const fs=new A(D.x,D.y,0);fs.unproject(i.object),i.object.position.sub(fs).add(Pe),i.object.updateMatrixWorld(),ie=S.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;ie!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(ie).add(i.object.position):(Ks.origin.copy(i.object.position),Ks.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(Ks.direction))<wx?t.lookAt(i.target):(wu.setFromNormalAndCoplanarPoint(i.object.up,i.target),Ks.intersectPlane(wu,i.target))))}else if(i.object.isOrthographicCamera){const ie=i.object.zoom;i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),ie!==i.object.zoom&&(i.object.updateProjectionMatrix(),jt=!0)}return c=1,R=!1,jt||P.distanceToSquared(i.object.position)>o||8*(1-nt.dot(i.object.quaternion))>o||N.distanceToSquared(i.target)>o?(i.dispatchEvent(xu),P.copy(i.object.position),nt.copy(i.object.quaternion),N.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",Rt),i.domElement.removeEventListener("pointerdown",Ot),i.domElement.removeEventListener("pointercancel",y),i.domElement.removeEventListener("wheel",q),i.domElement.removeEventListener("pointermove",ne),i.domElement.removeEventListener("pointerup",y),i.domElement.getRootNode().removeEventListener("keydown",J,{capture:!0}),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",Et),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const o=1e-6,a=new _u,l=new _u;let c=1;const u=new A,h=new lt,d=new lt,m=new lt,v=new lt,x=new lt,f=new lt,p=new lt,E=new lt,_=new lt,M=new A,D=new lt;let R=!1;const C=[],O={};let K=!1;function b(S){return S!==null?2*Math.PI/60*i.autoRotateSpeed*S:2*Math.PI/60/60*i.autoRotateSpeed}function T(S){const j=Math.abs(S*.01);return Math.pow(.95,i.zoomSpeed*j)}function $(S){l.theta-=S}function Z(S){l.phi-=S}const L=function(){const S=new A;return function(vt,P){S.setFromMatrixColumn(P,0),S.multiplyScalar(-vt),u.add(S)}}(),G=function(){const S=new A;return function(vt,P){i.screenSpacePanning===!0?S.setFromMatrixColumn(P,1):(S.setFromMatrixColumn(P,0),S.crossVectors(i.object.up,S)),S.multiplyScalar(vt),u.add(S)}}(),V=function(){const S=new A;return function(vt,P){const nt=i.domElement;if(i.object.isPerspectiveCamera){const N=i.object.position;S.copy(N).sub(i.target);let Q=S.length();Q*=Math.tan(i.object.fov/2*Math.PI/180),L(2*vt*Q/nt.clientHeight,i.object.matrix),G(2*P*Q/nt.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(L(vt*(i.object.right-i.object.left)/i.object.zoom/nt.clientWidth,i.object.matrix),G(P*(i.object.top-i.object.bottom)/i.object.zoom/nt.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function Y(S){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c/=S:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function W(S){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c*=S:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function X(S,j){if(!i.zoomToCursor)return;R=!0;const vt=i.domElement.getBoundingClientRect(),P=S-vt.left,nt=j-vt.top,N=vt.width,Q=vt.height;D.x=P/N*2-1,D.y=-(nt/Q)*2+1,M.set(D.x,D.y,1).unproject(i.object).sub(i.object.position).normalize()}function it(S){return Math.max(i.minDistance,Math.min(i.maxDistance,S))}function st(S){h.set(S.clientX,S.clientY)}function pt(S){X(S.clientX,S.clientX),p.set(S.clientX,S.clientY)}function At(S){v.set(S.clientX,S.clientY)}function z(S){d.set(S.clientX,S.clientY),m.subVectors(d,h).multiplyScalar(i.rotateSpeed);const j=i.domElement;$(2*Math.PI*m.x/j.clientHeight),Z(2*Math.PI*m.y/j.clientHeight),h.copy(d),i.update()}function tt(S){E.set(S.clientX,S.clientY),_.subVectors(E,p),_.y>0?Y(T(_.y)):_.y<0&&W(T(_.y)),p.copy(E),i.update()}function dt(S){x.set(S.clientX,S.clientY),f.subVectors(x,v).multiplyScalar(i.panSpeed),V(f.x,f.y),v.copy(x),i.update()}function Tt(S){X(S.clientX,S.clientY),S.deltaY<0?W(T(S.deltaY)):S.deltaY>0&&Y(T(S.deltaY)),i.update()}function xt(S){let j=!1;switch(S.code){case i.keys.UP:S.ctrlKey||S.metaKey||S.shiftKey?Z(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):V(0,i.keyPanSpeed),j=!0;break;case i.keys.BOTTOM:S.ctrlKey||S.metaKey||S.shiftKey?Z(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):V(0,-i.keyPanSpeed),j=!0;break;case i.keys.LEFT:S.ctrlKey||S.metaKey||S.shiftKey?$(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):V(i.keyPanSpeed,0),j=!0;break;case i.keys.RIGHT:S.ctrlKey||S.metaKey||S.shiftKey?$(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):V(-i.keyPanSpeed,0),j=!0;break}j&&(S.preventDefault(),i.update())}function ft(S){if(C.length===1)h.set(S.pageX,S.pageY);else{const j=mt(S),vt=.5*(S.pageX+j.x),P=.5*(S.pageY+j.y);h.set(vt,P)}}function Yt(S){if(C.length===1)v.set(S.pageX,S.pageY);else{const j=mt(S),vt=.5*(S.pageX+j.x),P=.5*(S.pageY+j.y);v.set(vt,P)}}function St(S){const j=mt(S),vt=S.pageX-j.x,P=S.pageY-j.y,nt=Math.sqrt(vt*vt+P*P);p.set(0,nt)}function U(S){i.enableZoom&&St(S),i.enablePan&&Yt(S)}function be(S){i.enableZoom&&St(S),i.enableRotate&&ft(S)}function wt(S){if(C.length==1)d.set(S.pageX,S.pageY);else{const vt=mt(S),P=.5*(S.pageX+vt.x),nt=.5*(S.pageY+vt.y);d.set(P,nt)}m.subVectors(d,h).multiplyScalar(i.rotateSpeed);const j=i.domElement;$(2*Math.PI*m.x/j.clientHeight),Z(2*Math.PI*m.y/j.clientHeight),h.copy(d)}function It(S){if(C.length===1)x.set(S.pageX,S.pageY);else{const j=mt(S),vt=.5*(S.pageX+j.x),P=.5*(S.pageY+j.y);x.set(vt,P)}f.subVectors(x,v).multiplyScalar(i.panSpeed),V(f.x,f.y),v.copy(x)}function yt(S){const j=mt(S),vt=S.pageX-j.x,P=S.pageY-j.y,nt=Math.sqrt(vt*vt+P*P);E.set(0,nt),_.set(0,Math.pow(E.y/p.y,i.zoomSpeed)),Y(_.y),p.copy(E);const N=(S.pageX+j.x)*.5,Q=(S.pageY+j.y)*.5;X(N,Q)}function Wt(S){i.enableZoom&&yt(S),i.enablePan&&It(S)}function Ut(S){i.enableZoom&&yt(S),i.enableRotate&&wt(S)}function Ot(S){i.enabled!==!1&&(C.length===0&&(i.domElement.setPointerCapture(S.pointerId),i.domElement.addEventListener("pointermove",ne),i.domElement.addEventListener("pointerup",y)),!Vt(S)&&(rt(S),S.pointerType==="touch"?ot(S):g(S)))}function ne(S){i.enabled!==!1&&(S.pointerType==="touch"?ct(S):H(S))}function y(S){switch(de(S),C.length){case 0:i.domElement.releasePointerCapture(S.pointerId),i.domElement.removeEventListener("pointermove",ne),i.domElement.removeEventListener("pointerup",y),i.dispatchEvent(bu),s=r.NONE;break;case 1:const j=C[0],vt=O[j];ot({pointerId:j,pageX:vt.x,pageY:vt.y});break}}function g(S){let j;switch(S.button){case 0:j=i.mouseButtons.LEFT;break;case 1:j=i.mouseButtons.MIDDLE;break;case 2:j=i.mouseButtons.RIGHT;break;default:j=-1}switch(j){case Ni.DOLLY:if(i.enableZoom===!1)return;pt(S),s=r.DOLLY;break;case Ni.ROTATE:if(S.ctrlKey||S.metaKey||S.shiftKey){if(i.enablePan===!1)return;At(S),s=r.PAN}else{if(i.enableRotate===!1)return;st(S),s=r.ROTATE}break;case Ni.PAN:if(S.ctrlKey||S.metaKey||S.shiftKey){if(i.enableRotate===!1)return;st(S),s=r.ROTATE}else{if(i.enablePan===!1)return;At(S),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(ma)}function H(S){switch(s){case r.ROTATE:if(i.enableRotate===!1)return;z(S);break;case r.DOLLY:if(i.enableZoom===!1)return;tt(S);break;case r.PAN:if(i.enablePan===!1)return;dt(S);break}}function q(S){i.enabled===!1||i.enableZoom===!1||s!==r.NONE||(S.preventDefault(),i.dispatchEvent(ma),Tt(et(S)),i.dispatchEvent(bu))}function et(S){const j=S.deltaMode,vt={clientX:S.clientX,clientY:S.clientY,deltaY:S.deltaY};switch(j){case 1:vt.deltaY*=16;break;case 2:vt.deltaY*=100;break}return S.ctrlKey&&!K&&(vt.deltaY*=10),vt}function J(S){S.key==="Control"&&(K=!0,i.domElement.getRootNode().addEventListener("keyup",Pt,{passive:!0,capture:!0}))}function Pt(S){S.key==="Control"&&(K=!1,i.domElement.getRootNode().removeEventListener("keyup",Pt,{passive:!0,capture:!0}))}function Et(S){i.enabled===!1||i.enablePan===!1||xt(S)}function ot(S){switch(bt(S),C.length){case 1:switch(i.touches.ONE){case Oi.ROTATE:if(i.enableRotate===!1)return;ft(S),s=r.TOUCH_ROTATE;break;case Oi.PAN:if(i.enablePan===!1)return;Yt(S),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(i.touches.TWO){case Oi.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;U(S),s=r.TOUCH_DOLLY_PAN;break;case Oi.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;be(S),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(ma)}function ct(S){switch(bt(S),s){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;wt(S),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;It(S),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Wt(S),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Ut(S),i.update();break;default:s=r.NONE}}function Rt(S){i.enabled!==!1&&S.preventDefault()}function rt(S){C.push(S.pointerId)}function de(S){delete O[S.pointerId];for(let j=0;j<C.length;j++)if(C[j]==S.pointerId){C.splice(j,1);return}}function Vt(S){for(let j=0;j<C.length;j++)if(C[j]==S.pointerId)return!0;return!1}function bt(S){let j=O[S.pointerId];j===void 0&&(j=new lt,O[S.pointerId]=j),j.set(S.pageX,S.pageY)}function mt(S){const j=S.pointerId===C[0]?C[1]:C[0];return O[j]}i.domElement.addEventListener("contextmenu",Rt),i.domElement.addEventListener("pointerdown",Ot),i.domElement.addEventListener("pointercancel",y),i.domElement.addEventListener("wheel",q,{passive:!1}),i.domElement.getRootNode().addEventListener("keydown",J,{passive:!0,capture:!0}),this.update()}}function Ex(n,t,e){const i=new H0(new _e,new kh),r=.05*t.gridSize.val*.5;return i.frustumCulled=!1,kt.derive(()=>{i.visible=t.nodes.val,t.nodes.val&&i.geometry.setAttribute("position",new me(n.val.flat(),3))}),kt.derive(()=>{t.nodes.val&&(i.material.size=r*e.val)}),i}function Mx(n,t,e){const i=new Za(new _e,new ii);let r=n.val;return i.frustumCulled=!1,i.material.depthTest=!1,kt.derive(()=>r=n.val),kt.derive(()=>{if(e.deformedShape.val,i.visible=e.elements.val,!e.elements.val)return;const s=t.val.elements.map(o=>[...r[o[0]],...r[o[1]]]).flat();i.geometry.setAttribute("position",new me(s,3))}),i}function Sx(n){const t=new bx(n,20,4210752,4210752);return t.position.set(.5*n,.5*n,0),t.rotateX(Math.PI/2),t}function Tx(n,t,e,i){const r=new Fe,s=new xr(.5,.5,.5),o=new Qn({color:10166822}),a=.05*e.gridSize.val*.6;let l=i.val,c=n.val;return kt.derive(()=>c=n.val),kt.derive(()=>{e.deformedShape.val,r.visible=e.supports.val,e.supports.val&&(r.clear(),t.val.assignments.supports.forEach((u,h)=>{const d=new Oe(s,o);d.position.set(...c[h]);const m=a*l;d.scale.set(m,m,m),r.add(d)}))}),kt.derive(()=>{if(!e.supports.val)return;const u=a*i.val;r.children.forEach(h=>h.scale.set(u,u,u)),l=i.val}),r}function Cx(n,t,e,i){const r=new Fe,s=.05*e.gridSize.val;let o=i.val,a=n.val;return kt.derive(()=>a=n.val),kt.derive(()=>{e.deformedShape.val,r.visible=e.loads.val,e.loads.val&&(r.children.forEach(l=>l.dispose()),r.clear(),t.val.assignments.loads.forEach((l,c)=>{const u=new Ei(new A(...l).normalize(),new A(...a[c]),1,15637248,.3,.3),h=s*o;u.scale.set(h,h,h),r.add(u)}))}),kt.derive(()=>{if(!e.loads.val)return;const l=s*i.val;r.children.forEach(c=>c.scale.set(l,l,l)),o=i.val}),r}let He=class extends z0{constructor(e,i,r){super();re(this,"fontHeightPx");const s=30;this.fontHeightPx=s*devicePixelRatio,this.material.map=Ax(e,this.fontHeightPx,i,r),this.material.depthTest=!1,this.renderOrder=99,this.scale.set(this.material.map.image.width/this.fontHeightPx,1,1)}updateScale(e){var i,r;this.scale.set(((r=(i=this.material)==null?void 0:i.map)==null?void 0:r.image.width)/this.fontHeightPx*e,e,1)}dispose(){var e;this.geometry.dispose(),(e=this.material.map)==null||e.dispose(),this.material.dispose()}};function Ax(n,t,e,i){const r=document.createElement("canvas"),s=r.getContext("2d");if(s){s.font=`${t}px Arial`,r.width=s.measureText(n).width,r.height=t,i!="transparent"&&(s.fillStyle=i??"#0d0d0d"),s.fillRect(0,0,r.width,r.height),s.textAlign="center",s.textBaseline="middle",s.fillStyle=e??"#bbbcc4";const a=.9;s.font=`${t*a}px Arial`;const l=.08*r.height;s.fillText(n,r.width/2,r.height/2+l)}const o=new Be(r);return o.needsUpdate=!0,o}function Px(n,t,e){const i=new Fe,r=.05*t.gridSize.val*.6;let s=e.val;return kt.derive(()=>{i.visible=t.nodesIndexes.val,t.nodesIndexes.val&&(i.children.forEach(o=>o.dispose()),i.clear(),n.val.forEach((o,a)=>{const l=new He(`${a}`);l.position.set(...o),l.updateScale(r*s),i.add(l)}))}),kt.derive(()=>{t.nodesIndexes.val&&(i.children.forEach(o=>o.updateScale(r*e.val)),s=e.val)}),i}function Yh(n,t){return n==null?void 0:n.map((e,i)=>(e+t[i])*.5)}function Rx(n,t,e,i){const r=new Fe,s=.05*e.gridSize.val*.6;let o=i.val,a=n.val;return kt.derive(()=>a=n.val),kt.derive(()=>{e.deformedShape.val,r.visible=e.elementsIndexes.val,e.elementsIndexes.val&&(r.children.forEach(l=>l.dispose()),r.clear(),t.val.elements.forEach((l,c)=>{const u=new He(`${c}`,void 0,"#001219");u.position.set(...Yh(a[l[0]],a[l[1]])),u.updateScale(s*o),r.add(u)}))}),kt.derive(()=>{e.elementsIndexes.val&&(r.children.forEach(l=>l.updateScale(s*i.val)),o=i.val)}),r}function Lx(n){const t=new Fe,e=.05*n*1,i=new He("X","red","transparent"),r=new He("Y","green","transparent"),s=new He("Z","blue","transparent"),o=new Ei(new A(1,0,0),new A(0,0,0),1,6710886,.2,.2),a=new Ei(new A(0,1,0),new A(0,0,0),1,6710886,.2,.2),l=new Ei(new A(0,0,1),new A(0,0,0),1,6710886,.2,.2);return i.position.set(1.3*e,0,0),r.position.set(0,1.3*e,0),s.position.set(0,0,1.3*e),i.updateScale(.4*e),r.updateScale(.4*e),s.updateScale(.4*e),o.scale.set(e,e,e),a.scale.set(e,e,e),l.scale.set(e,e,e),t.add(o,a,l,i,r,s),t}function jh(n,t){const e=new A(...n),r=new A(...t).clone().sub(e),s=r.length(),o=r.dot(new A(1,0,0))/s,a=r.dot(new A(0,1,0))/s,l=r.dot(new A(0,0,1))/s,c=Math.sqrt(o**2+a**2);let u=new Lt().fromArray([[o,a,l],[-a/c,o/c,0],[-o*l/c,-a*l/c,c]].flat());return l===1&&(u=new Lt().fromArray([[0,0,1],[0,1,0],[-1,0,0]].flat())),l===-1&&(u=new Lt().fromArray([[0,0,-1],[0,1,0],[1,0,0]].flat())),new ae().setFromMatrix3(u)}function Fa(n,t){return n==null?void 0:n.map((e,i)=>(9*e+t[i])/10)}function Dx(n,t,e,i){const r=new Fe,s=new _e,o=new ii({vertexColors:!0}),a=.05*e.gridSize.val*.75;let l=i.val,c=n.val;kt.derive(()=>c=n.val);const u=[0,0,0],h=[1,0,0],d=[0,1,0],m=[0,0,1];s.setAttribute("position",new me([...u,...h,...u,...d,...u,...m],3));const v=[255,0,0],x=[0,255,0],f=[0,0,255];return s.setAttribute("color",new me([...v,...v,...x,...x,...f,...f],3)),kt.derive(()=>{e.deformedShape.val,r.visible=e.orientations.val,e.orientations.val&&(r.clear(),t.val.elements.forEach(p=>{const E=new Za(s,o),_=c[p[0]],M=c[p[1]];E.position.set(...Fa(_,M)),E.rotation.setFromRotationMatrix(jh(_,M));const D=a*l;E.scale.set(D,D,D),r.add(E)}))}),kt.derive(()=>{if(!e.orientations.val)return;const p=a*i.val;r.children.forEach(E=>E.scale.set(p,p,p)),l=i.val}),r}class $s extends Fe{constructor(e,i,r,s,o,a,l){super();re(this,"lines");re(this,"mesh");re(this,"text");re(this,"textPosition");re(this,"normalizedResult");const c=new Hr().moveTo(0,0).lineTo(0,a[0]).lineTo(r,a[0]).lineTo(r,0).lineTo(0,0),u=c.getPoints(),h=new _e().setFromPoints(u);this.lines=new ur(h,new ii({color:"white"})),this.lines.position.set(...e),this.lines.rotation.setFromRotationMatrix(s),l&&this.lines.rotateX(Math.PI/2),this.add(this.lines);const d=new hr(c),m=new Qn({color:a[0]>0?24435:11411474,side:Ke});this.mesh=new Oe(d,m),this.mesh.position.set(...e),this.mesh.rotation.setFromRotationMatrix(s),l&&this.mesh.rotateX(Math.PI/2),this.add(this.mesh),this.text=new He(`${o[0].toFixed(4)}`),this.normalizedResult=a,this.textPosition=Yh(e,i),this.text.position.set(...this.textPosition),this.text.rotation.setFromRotationMatrix(s),this.add(this.text)}updateScale(e){this.lines.scale.set(1,e*2,1),this.mesh.scale.set(1,e*2,1),this.text.updateScale(e*.6),this.text.position.set(...this.textPosition),this.text.translateZ(this.normalizedResult[0]*2.5*e)}dispose(){this.lines.geometry.dispose(),this.lines.material.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.text.dispose()}}class yu extends Fe{constructor(e,i,r,s,o,a,l){super();re(this,"lines");re(this,"lines2");re(this,"mesh");re(this,"mesh2");re(this,"text");re(this,"text2");re(this,"textPosition");re(this,"text2Position");re(this,"normalizedResult");const c=o[0]*r/(o[0]+o[1]),u=o[0]*o[1]>0;if(this.text=new He(`${o[0].toFixed(4)}`),this.text2=new He(`${-o[1].toFixed(4)}`),this.normalizedResult=a,this.textPosition=Fa(e,i),this.text2Position=Fa(i,e),this.text.position.set(...this.textPosition),this.text2.position.set(...this.text2Position),this.text.rotation.setFromRotationMatrix(s),this.text2.rotation.setFromRotationMatrix(s),this.add(this.text,this.text2),u){const h=new Hr().moveTo(0,0).lineTo(0,a[0]).lineTo(c,0).lineTo(0,0),d=new Hr().moveTo(c,0).lineTo(r,-a[1]).lineTo(r,0).lineTo(c,0),m=h.getPoints(),v=d.getPoints(),x=new _e().setFromPoints(m),f=new _e().setFromPoints(v),p=new ii({color:"white"});this.lines=new ur(x,p),this.lines2=new ur(f,p),this.lines.position.set(...e),this.lines2.position.set(...e),this.lines.rotation.setFromRotationMatrix(s),this.lines2.rotation.setFromRotationMatrix(s),l&&this.lines.rotateX(Math.PI/2),l&&this.lines2.rotateX(Math.PI/2),this.add(this.lines,this.lines2);const E=new hr(h),_=new hr(d),M=new Qn({color:a[0]>0?24435:11411474,side:Ke}),D=new Qn({color:-a[1]>0?24435:11411474,side:Ke});this.mesh=new Oe(E,M),this.mesh2=new Oe(_,D),this.mesh.position.set(...e),this.mesh2.position.set(...e),this.mesh.rotation.setFromRotationMatrix(s),this.mesh2.rotation.setFromRotationMatrix(s),l&&this.mesh.rotateX(Math.PI/2),l&&this.mesh2.rotateX(Math.PI/2),this.add(this.mesh,this.mesh2)}else{const h=new Hr().moveTo(0,0).lineTo(0,a[0]).lineTo(r,-a[1]).lineTo(r,0).lineTo(0,0),d=h.getPoints(),m=new _e().setFromPoints(d);this.lines=new ur(m,new ii({color:"white"})),this.lines.position.set(...e),this.lines.rotation.setFromRotationMatrix(s),l&&this.lines.rotateX(Math.PI/2),this.add(this.lines);const v=new hr(h),x=new Qn({color:a[0]>0?24435:11411474,side:Ke});this.mesh=new Oe(v,x),this.mesh.position.set(...e),this.mesh.rotation.setFromRotationMatrix(s),l&&this.mesh.rotateX(Math.PI/2),this.add(this.mesh)}}updateScale(e){var i,r;this.lines.scale.set(1,e*2,1),(i=this.lines2)==null||i.scale.set(1,e*2,1),this.mesh.scale.set(1,e*2,1),(r=this.mesh2)==null||r.scale.set(1,e*2,1),this.text.updateScale(e*.6),this.text2.updateScale(e*.6),this.text.position.set(...this.textPosition),this.text2.position.set(...this.text2Position),this.text.translateZ(this.normalizedResult[0]*2.5*e),this.text2.translateZ(-this.normalizedResult[1]*2.5*e)}dispose(){var e,i,r,s,o,a;this.lines.geometry.dispose(),(e=this.lines2)==null||e.geometry.dispose(),this.lines.material.dispose(),(r=(i=this.lines2)==null?void 0:i.material)==null||r.dispose(),this.mesh.geometry.dispose(),(s=this.mesh2)==null||s.geometry.dispose(),this.mesh.material.dispose(),(a=(o=this.mesh2)==null?void 0:o.material)==null||a.dispose(),this.text.dispose(),this.text2.dispose()}}var Kh=(n=>(n.normal="normal",n.shearY="shearY",n.shearZ="shearZ",n.torsion="torsion",n.bendingY="bendingY",n.bendingZ="bendingZ",n))(Kh||{});function Ix(n,t,e,i){const r=new Fe,s=.05*e.gridSize.val,o={normal:$s,shearY:$s,shearZ:$s,torsion:$s,bendingY:yu,bendingZ:yu};let a=i.val,l=n.val;return kt.derive(()=>l=n.val),kt.derive(()=>{if(e.deformedShape.val,r.visible=e.elementResults.val!="none",e.elementResults.val=="none")return;const c=Kh[e.elementResults.val];r.children.forEach(u=>u.dispose()),r.clear(),t.val.analysisResults[c].forEach((u,h)=>{const d=t.val.elements[h],m=l[d[0]],v=l[d[1]],x=new A(...v).distanceTo(new A(...m)),f=Math.max(...[...t.val.analysisResults[c].values()].flat().map(M=>Math.abs(M??0))),p=u==null?void 0:u.map(M=>M/(f===0?1:f)),E=jh(m,v),_=new o[c](m,v,x,E,u??[0,0],p??[0,0],!!["normal","shearZ","torsion","bendingY"].includes(c));_.updateScale(s*a),r.add(_)})}),kt.derive(()=>{e.elementResults.val!="none"&&(r.children.forEach(c=>c.updateScale(s*i.val)),a=i.val)}),r}class Ux extends Fe{constructor(e,i,r){super();re(this,"xArrow");re(this,"yArrow");re(this,"zArrow");re(this,"xText1");re(this,"xText2");re(this,"yText1");re(this,"yText2");re(this,"zText1");re(this,"zText2");const s=i===el.reaction;r[0]&&(this.xText1=new He(`${s?"Fx":"Dx"}: `+r[0].toFixed(4))),r[3]&&(this.xText2=new He(`${s?"Mx":"Rx"}: `+r[3].toFixed(4))),r[1]&&(this.yText1=new He(`${s?"Fy":"Dy"}: `+r[1].toFixed(4))),r[4]&&(this.yText2=new He(`${s?"My":"Ry"}: `+r[4].toFixed(4))),r[2]&&(this.zText1=new He(`${s?"Fz":"Dz"}: `+r[2].toFixed(4))),r[5]&&(this.zText2=new He(`${s?"Mz":"Rz"}: `+r[5].toFixed(4))),(r[0]||r[3])&&(this.xArrow=new Ei(new A(1,0,0),new A(0,0,0),1,15637248,.3,.3)),(r[1]||r[4])&&(this.yArrow=new Ei(new A(0,1,0),new A(0,0,0),1,15637248,.3,.3)),(r[2]||r[5])&&(this.zArrow=new Ei(new A(0,0,1),new A(0,0,0),1,15637248,.3,.3)),this.position.set(...e),this.xArrow&&this.add(this.xArrow),this.yArrow&&this.add(this.yArrow),this.zArrow&&this.add(this.zArrow),this.xText1&&this.add(this.xText1),this.xText2&&this.add(this.xText2),this.yText1&&this.add(this.yText1),this.yText2&&this.add(this.yText2),this.zText1&&this.add(this.zText1),this.zText2&&this.add(this.zText2)}updateScale(e){var i,r,s,o,a,l,c,u,h,d,m,v,x,f,p;(i=this.xArrow)==null||i.scale.set(e,e,e),(r=this.yArrow)==null||r.scale.set(e,e,e),(s=this.zArrow)==null||s.scale.set(e,e,e),(o=this.xText1)==null||o.position.set(1.3*e,0,0),(a=this.xText2)==null||a.position.set(1.3*e,0,.5*e),(l=this.yText1)==null||l.position.set(0,1.3*e,0),(c=this.yText2)==null||c.position.set(0,1.3*e,.5*e),(u=this.zText1)==null||u.position.set(0,0,1.3*e),(h=this.zText2)==null||h.position.set(0,0,1.3*e+.5*e),(d=this.xText1)==null||d.updateScale(.4*e),(m=this.xText2)==null||m.updateScale(.4*e),(v=this.yText1)==null||v.updateScale(.4*e),(x=this.yText2)==null||x.updateScale(.4*e),(f=this.zText1)==null||f.updateScale(.4*e),(p=this.zText2)==null||p.updateScale(.4*e)}dispose(){var e,i,r,s,o,a,l,c,u;(e=this.xArrow)==null||e.dispose(),(i=this.yArrow)==null||i.dispose(),(r=this.zArrow)==null||r.dispose(),(s=this.xText1)==null||s.dispose(),(o=this.xText2)==null||o.dispose(),(a=this.yText1)==null||a.dispose(),(l=this.yText2)==null||l.dispose(),(c=this.zText1)==null||c.dispose(),(u=this.zText2)==null||u.dispose()}}var el=(n=>(n.deformation="deformation",n.reaction="reaction",n))(el||{});function Nx(n,t,e,i){const r=new Fe,s=.05*e.gridSize.val;let o=i.val,a=n.val;return kt.derive(()=>a=n.val),kt.derive(()=>{if(e.deformedShape.val,r.visible=e.nodeResults.val!="none",e.nodeResults.val=="none")return;r.children.forEach(c=>c.dispose()),r.clear();const l=el[e.nodeResults.val];t.val.analysisResults[l].forEach((c,u)=>{const h=new Ux(a[u],l,c);h.updateScale(s*o),r.add(h)})}),kt.derive(()=>{e.nodeResults.val!="none"&&(r.children.forEach(l=>l.updateScale(s*i.val)),o=i.val)}),r}function Ox(n,t){Ce.DEFAULT_UP=new A(0,0,1);const e=new B0,i=new nn(45,window.innerWidth/window.innerHeight,.1,2*1e6),r=new Fh({antialias:!0}),s=new yx(i,r.domElement),o=t.gridSize.val,a=kt.derive(()=>t.displayScale.val===0?1:t.displayScale.val>0?t.displayScale.val:-1/t.displayScale.val),l=kt.derive(()=>t.deformedShape.val?n.val.nodes.map((u,h)=>{const d=n.val.analysisResults.deformation.get(h)??[0,0,0];return u.map((m,v)=>m+d[v])}):n.val.nodes);e.add(Sx(o),Lx(o),Ex(l,t,a),Mx(l,n,t),Px(l,t,a),Rx(l,n,t,a),Tx(l,n,t,a),Cx(l,n,t,a),Dx(l,n,t,a),Ix(l,n,t,a),Nx(l,n,t,a)),r.setPixelRatio(window.devicePixelRatio),r.setClearColor(0,1),r.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(r.domElement),document.body.style.margin="0";const c=o*.5+o*.5/Math.tan(45*.5);i.position.set(.5*o,.8*-c,.5*o),s.target.set(.5*o,.5*o,0),s.minDistance=1,s.maxDistance=c*1.5,s.zoomSpeed=10,s.update(),window.addEventListener("resize",()=>{i.aspect=window.innerWidth/window.innerHeight,i.updateProjectionMatrix(),r.setSize(window.innerWidth,window.innerHeight),r.render(e,i)}),s.addEventListener("change",()=>{r.render(e,i)}),kt.derive(()=>{n.val,t.displayScale.val,t.nodes.val,t.elements.val,t.nodesIndexes.val,t.elementsIndexes.val,t.orientations.val,t.supports.val,t.loads.val,t.deformedShape.val,t.elementResults.val,t.nodeResults.val,setTimeout(()=>r.render(e,i))})}/*! Tweakpane 4.0.3 (c) 2016 cocopon, licensed under the MIT license. */function ee(n){return n==null}function nl(n){return n!==null&&typeof n=="object"}function Ba(n){return n!==null&&typeof n=="object"}function Fx(n,t){if(n.length!==t.length)return!1;for(let e=0;e<n.length;e++)if(n[e]!==t[e])return!1;return!0}function Ai(n,t){return Array.from(new Set([...Object.keys(n),...Object.keys(t)])).reduce((i,r)=>{const s=n[r],o=t[r];return Ba(s)&&Ba(o)?Object.assign(Object.assign({},i),{[r]:Ai(s,o)}):Object.assign(Object.assign({},i),{[r]:r in t?o:s})},{})}function il(n){return nl(n)?"target"in n:!1}const Bx={alreadydisposed:()=>"View has been already disposed",invalidparams:n=>`Invalid parameters for '${n.name}'`,nomatchingcontroller:n=>`No matching controller for '${n.key}'`,nomatchingview:n=>`No matching view for '${JSON.stringify(n.params)}'`,notbindable:()=>"Value is not bindable",notcompatible:n=>`Not compatible with  plugin '${n.id}'`,propertynotfound:n=>`Property '${n.name}' not found`,shouldneverhappen:()=>"This error should never happen"};class fe{static alreadyDisposed(){return new fe({type:"alreadydisposed"})}static notBindable(){return new fe({type:"notbindable"})}static notCompatible(t,e){return new fe({type:"notcompatible",context:{id:`${t}.${e}`}})}static propertyNotFound(t){return new fe({type:"propertynotfound",context:{name:t}})}static shouldNeverHappen(){return new fe({type:"shouldneverhappen"})}constructor(t){var e;this.message=(e=Bx[t.type](t.context))!==null&&e!==void 0?e:"Unexpected error",this.name=this.constructor.name,this.stack=new Error(this.message).stack,this.type=t.type}toString(){return this.message}}class po{constructor(t,e){this.obj_=t,this.key=e}static isBindable(t){return!(t===null||typeof t!="object"&&typeof t!="function")}read(){return this.obj_[this.key]}write(t){this.obj_[this.key]=t}writeProperty(t,e){const i=this.read();if(!po.isBindable(i))throw fe.notBindable();if(!(t in i))throw fe.propertyNotFound(t);i[t]=e}}class xe{constructor(){this.observers_={}}on(t,e,i){var r;let s=this.observers_[t];return s||(s=this.observers_[t]=[]),s.push({handler:e,key:(r=i==null?void 0:i.key)!==null&&r!==void 0?r:e}),this}off(t,e){const i=this.observers_[t];return i&&(this.observers_[t]=i.filter(r=>r.key!==e)),this}emit(t,e){const i=this.observers_[t];i&&i.forEach(r=>{r.handler(e)})}}class kx{constructor(t,e){var i;this.constraint_=e==null?void 0:e.constraint,this.equals_=(i=e==null?void 0:e.equals)!==null&&i!==void 0?i:(r,s)=>r===s,this.emitter=new xe,this.rawValue_=t}get constraint(){return this.constraint_}get rawValue(){return this.rawValue_}set rawValue(t){this.setRawValue(t,{forceEmit:!1,last:!0})}setRawValue(t,e){const i=e??{forceEmit:!1,last:!0},r=this.constraint_?this.constraint_.constrain(t):t,s=this.rawValue_;this.equals_(s,r)&&!i.forceEmit||(this.emitter.emit("beforechange",{sender:this}),this.rawValue_=r,this.emitter.emit("change",{options:i,previousRawValue:s,rawValue:r,sender:this}))}}class Vx{constructor(t){this.emitter=new xe,this.value_=t}get rawValue(){return this.value_}set rawValue(t){this.setRawValue(t,{forceEmit:!1,last:!0})}setRawValue(t,e){const i=e??{forceEmit:!1,last:!0},r=this.value_;r===t&&!i.forceEmit||(this.emitter.emit("beforechange",{sender:this}),this.value_=t,this.emitter.emit("change",{options:i,previousRawValue:r,rawValue:this.value_,sender:this}))}}class zx{constructor(t){this.emitter=new xe,this.onValueBeforeChange_=this.onValueBeforeChange_.bind(this),this.onValueChange_=this.onValueChange_.bind(this),this.value_=t,this.value_.emitter.on("beforechange",this.onValueBeforeChange_),this.value_.emitter.on("change",this.onValueChange_)}get rawValue(){return this.value_.rawValue}onValueBeforeChange_(t){this.emitter.emit("beforechange",Object.assign(Object.assign({},t),{sender:this}))}onValueChange_(t){this.emitter.emit("change",Object.assign(Object.assign({},t),{sender:this}))}}function le(n,t){const e=t==null?void 0:t.constraint,i=t==null?void 0:t.equals;return!e&&!i?new Vx(n):new kx(n,t)}function Hx(n){return[new zx(n),(t,e)=>{n.setRawValue(t,e)}]}class Ht{constructor(t){this.emitter=new xe,this.valMap_=t;for(const e in this.valMap_)this.valMap_[e].emitter.on("change",()=>{this.emitter.emit("change",{key:e,sender:this})})}static createCore(t){return Object.keys(t).reduce((i,r)=>Object.assign(i,{[r]:le(t[r])}),{})}static fromObject(t){const e=this.createCore(t);return new Ht(e)}get(t){return this.valMap_[t].rawValue}set(t,e){this.valMap_[t].rawValue=e}value(t){return this.valMap_[t]}}class rs{constructor(t){this.values=Ht.fromObject({max:t.max,min:t.min})}constrain(t){const e=this.values.get("max"),i=this.values.get("min");return Math.min(Math.max(t,i),e)}}class Gx{constructor(t){this.values=Ht.fromObject({max:t.max,min:t.min})}constrain(t){const e=this.values.get("max"),i=this.values.get("min");let r=t;return ee(i)||(r=Math.max(r,i)),ee(e)||(r=Math.min(r,e)),r}}class Wx{constructor(t,e=0){this.step=t,this.origin=e}constrain(t){const e=this.origin%this.step,i=Math.round((t-e)/this.step);return e+i*this.step}}class Xx{constructor(t){this.text=t}evaluate(){return Number(this.text)}toString(){return this.text}}const qx={"**":(n,t)=>Math.pow(n,t),"*":(n,t)=>n*t,"/":(n,t)=>n/t,"%":(n,t)=>n%t,"+":(n,t)=>n+t,"-":(n,t)=>n-t,"<<":(n,t)=>n<<t,">>":(n,t)=>n>>t,">>>":(n,t)=>n>>>t,"&":(n,t)=>n&t,"^":(n,t)=>n^t,"|":(n,t)=>n|t};class Yx{constructor(t,e,i){this.left=e,this.operator=t,this.right=i}evaluate(){const t=qx[this.operator];if(!t)throw new Error(`unexpected binary operator: '${this.operator}`);return t(this.left.evaluate(),this.right.evaluate())}toString(){return["b(",this.left.toString(),this.operator,this.right.toString(),")"].join(" ")}}const jx={"+":n=>n,"-":n=>-n,"~":n=>~n};class Kx{constructor(t,e){this.operator=t,this.expression=e}evaluate(){const t=jx[this.operator];if(!t)throw new Error(`unexpected unary operator: '${this.operator}`);return t(this.expression.evaluate())}toString(){return["u(",this.operator,this.expression.toString(),")"].join(" ")}}function rl(n){return(t,e)=>{for(let i=0;i<n.length;i++){const r=n[i](t,e);if(r!=="")return r}return""}}function $r(n,t){var e;const i=n.substr(t).match(/^\s+/);return(e=i&&i[0])!==null&&e!==void 0?e:""}function $x(n,t){const e=n.substr(t,1);return e.match(/^[1-9]$/)?e:""}function Zr(n,t){var e;const i=n.substr(t).match(/^[0-9]+/);return(e=i&&i[0])!==null&&e!==void 0?e:""}function Zx(n,t){const e=Zr(n,t);if(e!=="")return e;const i=n.substr(t,1);if(t+=1,i!=="-"&&i!=="+")return"";const r=Zr(n,t);return r===""?"":i+r}function sl(n,t){const e=n.substr(t,1);if(t+=1,e.toLowerCase()!=="e")return"";const i=Zx(n,t);return i===""?"":e+i}function $h(n,t){const e=n.substr(t,1);if(e==="0")return e;const i=$x(n,t);return t+=i.length,i===""?"":i+Zr(n,t)}function Jx(n,t){const e=$h(n,t);if(t+=e.length,e==="")return"";const i=n.substr(t,1);if(t+=i.length,i!==".")return"";const r=Zr(n,t);return t+=r.length,e+i+r+sl(n,t)}function Qx(n,t){const e=n.substr(t,1);if(t+=e.length,e!==".")return"";const i=Zr(n,t);return t+=i.length,i===""?"":e+i+sl(n,t)}function tb(n,t){const e=$h(n,t);return t+=e.length,e===""?"":e+sl(n,t)}const eb=rl([Jx,Qx,tb]);function nb(n,t){var e;const i=n.substr(t).match(/^[01]+/);return(e=i&&i[0])!==null&&e!==void 0?e:""}function ib(n,t){const e=n.substr(t,2);if(t+=e.length,e.toLowerCase()!=="0b")return"";const i=nb(n,t);return i===""?"":e+i}function rb(n,t){var e;const i=n.substr(t).match(/^[0-7]+/);return(e=i&&i[0])!==null&&e!==void 0?e:""}function sb(n,t){const e=n.substr(t,2);if(t+=e.length,e.toLowerCase()!=="0o")return"";const i=rb(n,t);return i===""?"":e+i}function ob(n,t){var e;const i=n.substr(t).match(/^[0-9a-f]+/i);return(e=i&&i[0])!==null&&e!==void 0?e:""}function ab(n,t){const e=n.substr(t,2);if(t+=e.length,e.toLowerCase()!=="0x")return"";const i=ob(n,t);return i===""?"":e+i}const lb=rl([ib,sb,ab]),cb=rl([lb,eb]);function ub(n,t){const e=cb(n,t);return t+=e.length,e===""?null:{evaluable:new Xx(e),cursor:t}}function hb(n,t){const e=n.substr(t,1);if(t+=e.length,e!=="(")return null;const i=Jh(n,t);if(!i)return null;t=i.cursor,t+=$r(n,t).length;const r=n.substr(t,1);return t+=r.length,r!==")"?null:{evaluable:i.evaluable,cursor:t}}function db(n,t){var e;return(e=ub(n,t))!==null&&e!==void 0?e:hb(n,t)}function Zh(n,t){const e=db(n,t);if(e)return e;const i=n.substr(t,1);if(t+=i.length,i!=="+"&&i!=="-"&&i!=="~")return null;const r=Zh(n,t);return r?(t=r.cursor,{cursor:t,evaluable:new Kx(i,r.evaluable)}):null}function pb(n,t,e){e+=$r(t,e).length;const i=n.filter(r=>t.startsWith(r,e))[0];return i?(e+=i.length,e+=$r(t,e).length,{cursor:e,operator:i}):null}function fb(n,t){return(e,i)=>{const r=n(e,i);if(!r)return null;i=r.cursor;let s=r.evaluable;for(;;){const o=pb(t,e,i);if(!o)break;i=o.cursor;const a=n(e,i);if(!a)return null;i=a.cursor,s=new Yx(o.operator,s,a.evaluable)}return s?{cursor:i,evaluable:s}:null}}const mb=[["**"],["*","/","%"],["+","-"],["<<",">>>",">>"],["&"],["^"],["|"]].reduce((n,t)=>fb(n,t),Zh);function Jh(n,t){return t+=$r(n,t).length,mb(n,t)}function vb(n){const t=Jh(n,0);return!t||t.cursor+$r(n,t.cursor).length!==n.length?null:t.evaluable}function In(n){var t;const e=vb(n);return(t=e==null?void 0:e.evaluate())!==null&&t!==void 0?t:null}function Qh(n){if(typeof n=="number")return n;if(typeof n=="string"){const t=In(n);if(!ee(t))return t}return 0}function _b(n){return String(n)}function Xe(n){return t=>t.toFixed(Math.max(Math.min(n,20),0))}function $t(n,t,e,i,r){const s=(n-t)/(e-t);return i+s*(r-i)}function Eu(n){return String(n.toFixed(10)).split(".")[1].replace(/0+$/,"").length}function we(n,t,e){return Math.min(Math.max(n,t),e)}function td(n,t){return(n%t+t)%t}function gb(n,t){return ee(n.step)?Math.max(Eu(t),2):Eu(n.step)}function ed(n){var t;return(t=n.step)!==null&&t!==void 0?t:1}function nd(n,t){var e;const i=Math.abs((e=n.step)!==null&&e!==void 0?e:t);return i===0?.1:Math.pow(10,Math.floor(Math.log10(i))-1)}function id(n,t){return ee(n.step)?null:new Wx(n.step,t)}function rd(n){return!ee(n.max)&&!ee(n.min)?new rs({max:n.max,min:n.min}):!ee(n.max)||!ee(n.min)?new Gx({max:n.max,min:n.min}):null}function sd(n,t){var e,i,r;return{formatter:(e=n.format)!==null&&e!==void 0?e:Xe(gb(n,t)),keyScale:(i=n.keyScale)!==null&&i!==void 0?i:ed(n),pointerScale:(r=n.pointerScale)!==null&&r!==void 0?r:nd(n,t)}}function od(n){return{format:n.optional.function,keyScale:n.optional.number,max:n.optional.number,min:n.optional.number,pointerScale:n.optional.number,step:n.optional.number}}function ol(n){return{constraint:n.constraint,textProps:Ht.fromObject(sd(n.params,n.initialValue))}}class Ii{constructor(t){this.controller=t}get element(){return this.controller.view.element}get disabled(){return this.controller.viewProps.get("disabled")}set disabled(t){this.controller.viewProps.set("disabled",t)}get hidden(){return this.controller.viewProps.get("hidden")}set hidden(t){this.controller.viewProps.set("hidden",t)}dispose(){this.controller.viewProps.set("disposed",!0)}importState(t){return this.controller.importState(t)}exportState(){return this.controller.exportState()}}class Mo{constructor(t){this.target=t}}class ss extends Mo{constructor(t,e,i){super(t),this.value=e,this.last=i??!0}}class xb extends Mo{constructor(t,e){super(t),this.expanded=e}}class bb extends Mo{constructor(t,e){super(t),this.index=e}}class wb extends Mo{constructor(t,e){super(t),this.native=e}}class Jr extends Ii{constructor(t){super(t),this.onValueChange_=this.onValueChange_.bind(this),this.emitter_=new xe,this.controller.value.emitter.on("change",this.onValueChange_)}get label(){return this.controller.labelController.props.get("label")}set label(t){this.controller.labelController.props.set("label",t)}get key(){return this.controller.value.binding.target.key}get tag(){return this.controller.tag}set tag(t){this.controller.tag=t}on(t,e){const i=e.bind(this);return this.emitter_.on(t,r=>{i(r)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}refresh(){this.controller.value.fetch()}onValueChange_(t){const e=this.controller.value;this.emitter_.emit("change",new ss(this,e.binding.target.read(),t.options.last))}}class yb{constructor(t,e){this.onValueBeforeChange_=this.onValueBeforeChange_.bind(this),this.onValueChange_=this.onValueChange_.bind(this),this.binding=e,this.value_=t,this.value_.emitter.on("beforechange",this.onValueBeforeChange_),this.value_.emitter.on("change",this.onValueChange_),this.emitter=new xe}get rawValue(){return this.value_.rawValue}set rawValue(t){this.value_.rawValue=t}setRawValue(t,e){this.value_.setRawValue(t,e)}fetch(){this.value_.rawValue=this.binding.read()}push(){this.binding.write(this.value_.rawValue)}onValueBeforeChange_(t){this.emitter.emit("beforechange",Object.assign(Object.assign({},t),{sender:this}))}onValueChange_(t){this.push(),this.emitter.emit("change",Object.assign(Object.assign({},t),{sender:this}))}}function Eb(n){if(!("binding"in n))return!1;const t=n.binding;return il(t)&&"read"in t&&"write"in t}function Mb(n,t){const i=Object.keys(t).reduce((r,s)=>{if(r===void 0)return;const o=t[s],a=o(n[s]);return a.succeeded?Object.assign(Object.assign({},r),{[s]:a.value}):void 0},{});return i}function Sb(n,t){return n.reduce((e,i)=>{if(e===void 0)return;const r=t(i);if(!(!r.succeeded||r.value===void 0))return[...e,r.value]},[])}function Tb(n){return n===null?!1:typeof n=="object"}function Tn(n){return t=>e=>{if(!t&&e===void 0)return{succeeded:!1,value:void 0};if(t&&e===void 0)return{succeeded:!0,value:void 0};const i=n(e);return i!==void 0?{succeeded:!0,value:i}:{succeeded:!1,value:void 0}}}function Mu(n){return{custom:t=>Tn(t)(n),boolean:Tn(t=>typeof t=="boolean"?t:void 0)(n),number:Tn(t=>typeof t=="number"?t:void 0)(n),string:Tn(t=>typeof t=="string"?t:void 0)(n),function:Tn(t=>typeof t=="function"?t:void 0)(n),constant:t=>Tn(e=>e===t?t:void 0)(n),raw:Tn(t=>t)(n),object:t=>Tn(e=>{if(Tb(e))return Mb(e,t)})(n),array:t=>Tn(e=>{if(Array.isArray(e))return Sb(e,t)})(n)}}const ka={optional:Mu(!0),required:Mu(!1)};function he(n,t){const e=t(ka),i=ka.required.object(e)(n);return i.succeeded?i.value:void 0}function $e(n,t,e,i){if(t&&!t(n))return!1;const r=he(n,e);return r?i(r):!1}function Ze(n,t){var e;return Ai((e=n==null?void 0:n())!==null&&e!==void 0?e:{},t)}function Mi(n){return"value"in n}function ad(n){if(!nl(n)||!("binding"in n))return!1;const t=n.binding;return il(t)}const mn="http://www.w3.org/2000/svg";function fo(n){n.offsetHeight}function Cb(n,t){const e=n.style.transition;n.style.transition="none",t(),n.style.transition=e}function al(n){return n.ontouchstart!==void 0}function Ab(){return globalThis}function Pb(){return Ab().document}function Rb(n){const t=n.ownerDocument.defaultView;return t&&"document"in t?n.getContext("2d",{willReadFrequently:!0}):null}const Lb={check:'<path d="M2 8l4 4l8 -8"/>',dropdown:'<path d="M5 7h6l-3 3 z"/>',p2dpad:'<path d="M8 4v8"/><path d="M4 8h8"/><circle cx="12" cy="12" r="1.2"/>'};function So(n,t){const e=n.createElementNS(mn,"svg");return e.innerHTML=Lb[t],e}function ld(n,t,e){n.insertBefore(t,n.children[e])}function ll(n){n.parentElement&&n.parentElement.removeChild(n)}function cd(n){for(;n.children.length>0;)n.removeChild(n.children[0])}function Db(n){for(;n.childNodes.length>0;)n.removeChild(n.childNodes[0])}function ud(n){return n.relatedTarget?n.relatedTarget:"explicitOriginalTarget"in n?n.explicitOriginalTarget:null}function Ln(n,t){n.emitter.on("change",e=>{t(e.rawValue)}),t(n.rawValue)}function _n(n,t,e){Ln(n.value(t),e)}const Ib="tp";function qt(n){return(e,i)=>[Ib,"-",n,"v",e?`_${e}`:"",i?`-${i}`:""].join("")}const Ur=qt("lbl");function Ub(n,t){const e=n.createDocumentFragment();return t.split(`
`).map(r=>n.createTextNode(r)).forEach((r,s)=>{s>0&&e.appendChild(n.createElement("br")),e.appendChild(r)}),e}class hd{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(Ur()),e.viewProps.bindClassModifiers(this.element);const i=t.createElement("div");i.classList.add(Ur("l")),_n(e.props,"label",s=>{ee(s)?this.element.classList.add(Ur(void 0,"nol")):(this.element.classList.remove(Ur(void 0,"nol")),Db(i),i.appendChild(Ub(t,s)))}),this.element.appendChild(i),this.labelElement=i;const r=t.createElement("div");r.classList.add(Ur("v")),this.element.appendChild(r),this.valueElement=r}}class dd{constructor(t,e){this.props=e.props,this.valueController=e.valueController,this.viewProps=e.valueController.viewProps,this.view=new hd(t,{props:e.props,viewProps:this.viewProps}),this.view.valueElement.appendChild(this.valueController.view.element)}importProps(t){return $e(t,null,e=>({label:e.optional.string}),e=>(this.props.set("label",e.label),!0))}exportProps(){return Ze(null,{label:this.props.get("label")})}}function Nb(){return["veryfirst","first","last","verylast"]}const Su=qt(""),Tu={veryfirst:"vfst",first:"fst",last:"lst",verylast:"vlst"};class To{constructor(t){this.parent_=null,this.blade=t.blade,this.view=t.view,this.viewProps=t.viewProps;const e=this.view.element;this.blade.value("positions").emitter.on("change",()=>{Nb().forEach(i=>{e.classList.remove(Su(void 0,Tu[i]))}),this.blade.get("positions").forEach(i=>{e.classList.add(Su(void 0,Tu[i]))})}),this.viewProps.handleDispose(()=>{ll(e)})}get parent(){return this.parent_}set parent(t){this.parent_=t,this.viewProps.set("parent",this.parent_?this.parent_.viewProps:null)}importState(t){return $e(t,null,e=>({disabled:e.required.boolean,hidden:e.required.boolean}),e=>(this.viewProps.importState(e),!0))}exportState(){return Ze(null,Object.assign({},this.viewProps.exportState()))}}class Pi extends To{constructor(t,e){if(e.value!==e.valueController.value)throw fe.shouldNeverHappen();const i=e.valueController.viewProps,r=new dd(t,{blade:e.blade,props:e.props,valueController:e.valueController});super(Object.assign(Object.assign({},e),{view:new hd(t,{props:e.props,viewProps:i}),viewProps:i})),this.labelController=r,this.value=e.value,this.valueController=e.valueController,this.view.valueElement.appendChild(this.valueController.view.element)}importState(t){return $e(t,e=>{var i,r,s;return super.importState(e)&&this.labelController.importProps(e)&&((s=(r=(i=this.valueController).importProps)===null||r===void 0?void 0:r.call(i,t))!==null&&s!==void 0?s:!0)},e=>({value:e.optional.raw}),e=>(e.value&&(this.value.rawValue=e.value),!0))}exportState(){var t,e,i;return Ze(()=>super.exportState(),Object.assign(Object.assign({value:this.value.rawValue},this.labelController.exportProps()),(i=(e=(t=this.valueController).exportProps)===null||e===void 0?void 0:e.call(t))!==null&&i!==void 0?i:{}))}}function Cu(n){const t=Object.assign({},n);return delete t.value,t}class pd extends Pi{constructor(t,e){super(t,e),this.tag=e.tag}importState(t){return $e(t,e=>super.importState(Cu(t)),e=>({tag:e.optional.string}),e=>(this.tag=e.tag,!0))}exportState(){return Ze(()=>Cu(super.exportState()),{binding:{key:this.value.binding.target.key,value:this.value.binding.target.read()},tag:this.tag})}}function Ob(n){return Mi(n)&&ad(n.value)}class Fb extends pd{importState(t){return $e(t,e=>super.importState(e),e=>({binding:e.required.object({value:e.required.raw})}),e=>(this.value.binding.inject(e.binding.value),this.value.fetch(),!0))}}function Bb(n){return Mi(n)&&Eb(n.value)}function fd(n,t){for(;n.length<t;)n.push(void 0)}function kb(n){const t=[];return fd(t,n),t}function Vb(n){const t=n.indexOf(void 0);return t<0?n:n.slice(0,t)}function zb(n,t){const e=[...Vb(n),t];return e.length>n.length?e.splice(0,e.length-n.length):fd(e,n.length),e}class Hb{constructor(t){this.emitter=new xe,this.onTick_=this.onTick_.bind(this),this.onValueBeforeChange_=this.onValueBeforeChange_.bind(this),this.onValueChange_=this.onValueChange_.bind(this),this.binding=t.binding,this.value_=le(kb(t.bufferSize)),this.value_.emitter.on("beforechange",this.onValueBeforeChange_),this.value_.emitter.on("change",this.onValueChange_),this.ticker=t.ticker,this.ticker.emitter.on("tick",this.onTick_),this.fetch()}get rawValue(){return this.value_.rawValue}set rawValue(t){this.value_.rawValue=t}setRawValue(t,e){this.value_.setRawValue(t,e)}fetch(){this.value_.rawValue=zb(this.value_.rawValue,this.binding.read())}onTick_(){this.fetch()}onValueBeforeChange_(t){this.emitter.emit("beforechange",Object.assign(Object.assign({},t),{sender:this}))}onValueChange_(t){this.emitter.emit("change",Object.assign(Object.assign({},t),{sender:this}))}}function Gb(n){if(!("binding"in n))return!1;const t=n.binding;return il(t)&&"read"in t&&!("write"in t)}class Wb extends pd{exportState(){return Ze(()=>super.exportState(),{binding:{readonly:!0}})}}function Xb(n){return Mi(n)&&Gb(n.value)}class qb extends Ii{get label(){return this.controller.labelController.props.get("label")}set label(t){this.controller.labelController.props.set("label",t)}get title(){var t;return(t=this.controller.buttonController.props.get("title"))!==null&&t!==void 0?t:""}set title(t){this.controller.buttonController.props.set("title",t)}on(t,e){const i=e.bind(this);return this.controller.buttonController.emitter.on(t,s=>{i(new wb(this,s.nativeEvent))}),this}off(t,e){return this.controller.buttonController.emitter.off(t,e),this}}function Yb(n,t,e){e?n.classList.add(t):n.classList.remove(t)}function wr(n,t){return e=>{Yb(n,t,e)}}function cl(n,t){Ln(n,e=>{t.textContent=e??""})}const va=qt("btn");class jb{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(va()),e.viewProps.bindClassModifiers(this.element);const i=t.createElement("button");i.classList.add(va("b")),e.viewProps.bindDisabled(i),this.element.appendChild(i),this.buttonElement=i;const r=t.createElement("div");r.classList.add(va("t")),cl(e.props.value("title"),r),this.buttonElement.appendChild(r)}}class Kb{constructor(t,e){this.emitter=new xe,this.onClick_=this.onClick_.bind(this),this.props=e.props,this.viewProps=e.viewProps,this.view=new jb(t,{props:this.props,viewProps:this.viewProps}),this.view.buttonElement.addEventListener("click",this.onClick_)}importProps(t){return $e(t,null,e=>({title:e.optional.string}),e=>(this.props.set("title",e.title),!0))}exportProps(){return Ze(null,{title:this.props.get("title")})}onClick_(t){this.emitter.emit("click",{nativeEvent:t,sender:this})}}class Au extends To{constructor(t,e){const i=new Kb(t,{props:e.buttonProps,viewProps:e.viewProps}),r=new dd(t,{blade:e.blade,props:e.labelProps,valueController:i});super({blade:e.blade,view:r.view,viewProps:e.viewProps}),this.buttonController=i,this.labelController=r}importState(t){return $e(t,e=>super.importState(e)&&this.buttonController.importProps(e)&&this.labelController.importProps(e),()=>({}),()=>!0)}exportState(){return Ze(()=>super.exportState(),Object.assign(Object.assign({},this.buttonController.exportProps()),this.labelController.exportProps()))}}class md{constructor(t){const[e,i]=t.split("-"),r=e.split(".");this.major=parseInt(r[0],10),this.minor=parseInt(r[1],10),this.patch=parseInt(r[2],10),this.prerelease=i??null}toString(){const t=[this.major,this.minor,this.patch].join(".");return this.prerelease!==null?[t,this.prerelease].join("-"):t}}const yr=new md("2.0.3");function Ve(n){return Object.assign({core:yr},n)}const $b=Ve({id:"button",type:"blade",accept(n){const t=he(n,e=>({title:e.required.string,view:e.required.constant("button"),label:e.optional.string}));return t?{params:t}:null},controller(n){return new Au(n.document,{blade:n.blade,buttonProps:Ht.fromObject({title:n.params.title}),labelProps:Ht.fromObject({label:n.params.label}),viewProps:n.viewProps})},api(n){return n.controller instanceof Au?new qb(n.controller):null}});function Zb(n,t){return n.addBlade(Object.assign(Object.assign({},t),{view:"button"}))}function Jb(n,t){return n.addBlade(Object.assign(Object.assign({},t),{view:"folder"}))}function Qb(n,t){return n.addBlade(Object.assign(Object.assign({},t),{view:"tab"}))}function tw(n){return nl(n)?"refresh"in n&&typeof n.refresh=="function":!1}function ew(n,t){if(!po.isBindable(n))throw fe.notBindable();return new po(n,t)}class nw{constructor(t,e){this.onRackValueChange_=this.onRackValueChange_.bind(this),this.controller_=t,this.emitter_=new xe,this.pool_=e,this.controller_.rack.emitter.on("valuechange",this.onRackValueChange_)}get children(){return this.controller_.rack.children.map(t=>this.pool_.createApi(t))}addBinding(t,e,i){const r=i??{},s=this.controller_.element.ownerDocument,o=this.pool_.createBinding(s,ew(t,e),r),a=this.pool_.createBindingApi(o);return this.add(a,r.index)}addFolder(t){return Jb(this,t)}addButton(t){return Zb(this,t)}addTab(t){return Qb(this,t)}add(t,e){const i=t.controller;return this.controller_.rack.add(i,e),t}remove(t){this.controller_.rack.remove(t.controller)}addBlade(t){const e=this.controller_.element.ownerDocument,i=this.pool_.createBlade(e,t),r=this.pool_.createApi(i);return this.add(r,t.index)}on(t,e){const i=e.bind(this);return this.emitter_.on(t,r=>{i(r)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}refresh(){this.children.forEach(t=>{tw(t)&&t.refresh()})}onRackValueChange_(t){const e=t.bladeController,i=this.pool_.createApi(e),r=ad(e.value)?e.value.binding:null;this.emitter_.emit("change",new ss(i,r?r.target.read():e.value.rawValue,t.options.last))}}class ul extends Ii{constructor(t,e){super(t),this.rackApi_=new nw(t.rackController,e)}refresh(){this.rackApi_.refresh()}}class hl extends To{constructor(t){super({blade:t.blade,view:t.view,viewProps:t.rackController.viewProps}),this.rackController=t.rackController}importState(t){return $e(t,e=>super.importState(e),e=>({children:e.required.array(e.required.raw)}),e=>this.rackController.rack.children.every((i,r)=>i.importState(e.children[r])))}exportState(){return Ze(()=>super.exportState(),{children:this.rackController.rack.children.map(t=>t.exportState())})}}function Va(n){return"rackController"in n}class iw{constructor(t){this.emitter=new xe,this.items_=[],this.cache_=new Set,this.onSubListAdd_=this.onSubListAdd_.bind(this),this.onSubListRemove_=this.onSubListRemove_.bind(this),this.extract_=t}get items(){return this.items_}allItems(){return Array.from(this.cache_)}find(t){for(const e of this.allItems())if(t(e))return e;return null}includes(t){return this.cache_.has(t)}add(t,e){if(this.includes(t))throw fe.shouldNeverHappen();const i=e!==void 0?e:this.items_.length;this.items_.splice(i,0,t),this.cache_.add(t);const r=this.extract_(t);r&&(r.emitter.on("add",this.onSubListAdd_),r.emitter.on("remove",this.onSubListRemove_),r.allItems().forEach(s=>{this.cache_.add(s)})),this.emitter.emit("add",{index:i,item:t,root:this,target:this})}remove(t){const e=this.items_.indexOf(t);if(e<0)return;this.items_.splice(e,1),this.cache_.delete(t);const i=this.extract_(t);i&&(i.allItems().forEach(r=>{this.cache_.delete(r)}),i.emitter.off("add",this.onSubListAdd_),i.emitter.off("remove",this.onSubListRemove_)),this.emitter.emit("remove",{index:e,item:t,root:this,target:this})}onSubListAdd_(t){this.cache_.add(t.item),this.emitter.emit("add",{index:t.index,item:t.item,root:this,target:t.target})}onSubListRemove_(t){this.cache_.delete(t.item),this.emitter.emit("remove",{index:t.index,item:t.item,root:this,target:t.target})}}function rw(n,t){for(let e=0;e<n.length;e++){const i=n[e];if(Mi(i)&&i.value===t)return i}return null}function sw(n){return Va(n)?n.rackController.rack.bcSet_:null}class ow{constructor(t){var e,i;this.emitter=new xe,this.onBladePositionsChange_=this.onBladePositionsChange_.bind(this),this.onSetAdd_=this.onSetAdd_.bind(this),this.onSetRemove_=this.onSetRemove_.bind(this),this.onChildDispose_=this.onChildDispose_.bind(this),this.onChildPositionsChange_=this.onChildPositionsChange_.bind(this),this.onChildValueChange_=this.onChildValueChange_.bind(this),this.onChildViewPropsChange_=this.onChildViewPropsChange_.bind(this),this.onRackLayout_=this.onRackLayout_.bind(this),this.onRackValueChange_=this.onRackValueChange_.bind(this),this.blade_=(e=t.blade)!==null&&e!==void 0?e:null,(i=this.blade_)===null||i===void 0||i.value("positions").emitter.on("change",this.onBladePositionsChange_),this.viewProps=t.viewProps,this.bcSet_=new iw(sw),this.bcSet_.emitter.on("add",this.onSetAdd_),this.bcSet_.emitter.on("remove",this.onSetRemove_)}get children(){return this.bcSet_.items}add(t,e){var i;(i=t.parent)===null||i===void 0||i.remove(t),t.parent=this,this.bcSet_.add(t,e)}remove(t){t.parent=null,this.bcSet_.remove(t)}find(t){return this.bcSet_.allItems().filter(t)}onSetAdd_(t){this.updatePositions_();const e=t.target===t.root;if(this.emitter.emit("add",{bladeController:t.item,index:t.index,root:e,sender:this}),!e)return;const i=t.item;if(i.viewProps.emitter.on("change",this.onChildViewPropsChange_),i.blade.value("positions").emitter.on("change",this.onChildPositionsChange_),i.viewProps.handleDispose(this.onChildDispose_),Mi(i))i.value.emitter.on("change",this.onChildValueChange_);else if(Va(i)){const r=i.rackController.rack;if(r){const s=r.emitter;s.on("layout",this.onRackLayout_),s.on("valuechange",this.onRackValueChange_)}}}onSetRemove_(t){this.updatePositions_();const e=t.target===t.root;if(this.emitter.emit("remove",{bladeController:t.item,root:e,sender:this}),!e)return;const i=t.item;if(Mi(i))i.value.emitter.off("change",this.onChildValueChange_);else if(Va(i)){const r=i.rackController.rack;if(r){const s=r.emitter;s.off("layout",this.onRackLayout_),s.off("valuechange",this.onRackValueChange_)}}}updatePositions_(){const t=this.bcSet_.items.filter(r=>!r.viewProps.get("hidden")),e=t[0],i=t[t.length-1];this.bcSet_.items.forEach(r=>{const s=[];r===e&&(s.push("first"),(!this.blade_||this.blade_.get("positions").includes("veryfirst"))&&s.push("veryfirst")),r===i&&(s.push("last"),(!this.blade_||this.blade_.get("positions").includes("verylast"))&&s.push("verylast")),r.blade.set("positions",s)})}onChildPositionsChange_(){this.updatePositions_(),this.emitter.emit("layout",{sender:this})}onChildViewPropsChange_(t){this.updatePositions_(),this.emitter.emit("layout",{sender:this})}onChildDispose_(){this.bcSet_.items.filter(e=>e.viewProps.get("disposed")).forEach(e=>{this.bcSet_.remove(e)})}onChildValueChange_(t){const e=rw(this.find(Mi),t.sender);if(!e)throw fe.alreadyDisposed();this.emitter.emit("valuechange",{bladeController:e,options:t.options,sender:this})}onRackLayout_(t){this.updatePositions_(),this.emitter.emit("layout",{sender:this})}onRackValueChange_(t){this.emitter.emit("valuechange",{bladeController:t.bladeController,options:t.options,sender:this})}onBladePositionsChange_(){this.updatePositions_()}}class dl{constructor(t){this.onRackAdd_=this.onRackAdd_.bind(this),this.onRackRemove_=this.onRackRemove_.bind(this),this.element=t.element,this.viewProps=t.viewProps;const e=new ow({blade:t.root?void 0:t.blade,viewProps:t.viewProps});e.emitter.on("add",this.onRackAdd_),e.emitter.on("remove",this.onRackRemove_),this.rack=e,this.viewProps.handleDispose(()=>{for(let i=this.rack.children.length-1;i>=0;i--)this.rack.children[i].viewProps.set("disposed",!0)})}onRackAdd_(t){t.root&&ld(this.element,t.bladeController.view.element,t.index)}onRackRemove_(t){t.root&&ll(t.bladeController.view.element)}}function Er(){return new Ht({positions:le([],{equals:Fx})})}class os extends Ht{constructor(t){super(t)}static create(t){const e={completed:!0,expanded:t,expandedHeight:null,shouldFixHeight:!1,temporaryExpanded:null},i=Ht.createCore(e);return new os(i)}get styleExpanded(){var t;return(t=this.get("temporaryExpanded"))!==null&&t!==void 0?t:this.get("expanded")}get styleHeight(){if(!this.styleExpanded)return"0";const t=this.get("expandedHeight");return this.get("shouldFixHeight")&&!ee(t)?`${t}px`:"auto"}bindExpandedClass(t,e){const i=()=>{this.styleExpanded?t.classList.add(e):t.classList.remove(e)};_n(this,"expanded",i),_n(this,"temporaryExpanded",i)}cleanUpTransition(){this.set("shouldFixHeight",!1),this.set("expandedHeight",null),this.set("completed",!0)}}function aw(n,t){let e=0;return Cb(t,()=>{n.set("expandedHeight",null),n.set("temporaryExpanded",!0),fo(t),e=t.clientHeight,n.set("temporaryExpanded",null),fo(t)}),e}function Pu(n,t){t.style.height=n.styleHeight}function pl(n,t){n.value("expanded").emitter.on("beforechange",()=>{if(n.set("completed",!1),ee(n.get("expandedHeight"))){const e=aw(n,t);e>0&&n.set("expandedHeight",e)}n.set("shouldFixHeight",!0),fo(t)}),n.emitter.on("change",()=>{Pu(n,t)}),Pu(n,t),t.addEventListener("transitionend",e=>{e.propertyName==="height"&&n.cleanUpTransition()})}class vd extends ul{constructor(t,e){super(t,e),this.emitter_=new xe,this.controller.foldable.value("expanded").emitter.on("change",i=>{this.emitter_.emit("fold",new xb(this,i.sender.rawValue))}),this.rackApi_.on("change",i=>{this.emitter_.emit("change",i)})}get expanded(){return this.controller.foldable.get("expanded")}set expanded(t){this.controller.foldable.set("expanded",t)}get title(){return this.controller.props.get("title")}set title(t){this.controller.props.set("title",t)}get children(){return this.rackApi_.children}addBinding(t,e,i){return this.rackApi_.addBinding(t,e,i)}addFolder(t){return this.rackApi_.addFolder(t)}addButton(t){return this.rackApi_.addButton(t)}addTab(t){return this.rackApi_.addTab(t)}add(t,e){return this.rackApi_.add(t,e)}remove(t){this.rackApi_.remove(t)}addBlade(t){return this.rackApi_.addBlade(t)}on(t,e){const i=e.bind(this);return this.emitter_.on(t,r=>{i(r)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}}const _d=qt("cnt");class lw{constructor(t,e){var i;this.className_=qt((i=e.viewName)!==null&&i!==void 0?i:"fld"),this.element=t.createElement("div"),this.element.classList.add(this.className_(),_d()),e.viewProps.bindClassModifiers(this.element),this.foldable_=e.foldable,this.foldable_.bindExpandedClass(this.element,this.className_(void 0,"expanded")),_n(this.foldable_,"completed",wr(this.element,this.className_(void 0,"cpl")));const r=t.createElement("button");r.classList.add(this.className_("b")),_n(e.props,"title",c=>{ee(c)?this.element.classList.add(this.className_(void 0,"not")):this.element.classList.remove(this.className_(void 0,"not"))}),e.viewProps.bindDisabled(r),this.element.appendChild(r),this.buttonElement=r;const s=t.createElement("div");s.classList.add(this.className_("i")),this.element.appendChild(s);const o=t.createElement("div");o.classList.add(this.className_("t")),cl(e.props.value("title"),o),this.buttonElement.appendChild(o),this.titleElement=o;const a=t.createElement("div");a.classList.add(this.className_("m")),this.buttonElement.appendChild(a);const l=t.createElement("div");l.classList.add(this.className_("c")),this.element.appendChild(l),this.containerElement=l}}class za extends hl{constructor(t,e){var i;const r=os.create((i=e.expanded)!==null&&i!==void 0?i:!0),s=new lw(t,{foldable:r,props:e.props,viewName:e.root?"rot":void 0,viewProps:e.viewProps});super(Object.assign(Object.assign({},e),{rackController:new dl({blade:e.blade,element:s.containerElement,root:e.root,viewProps:e.viewProps}),view:s})),this.onTitleClick_=this.onTitleClick_.bind(this),this.props=e.props,this.foldable=r,pl(this.foldable,this.view.containerElement),this.rackController.rack.emitter.on("add",()=>{this.foldable.cleanUpTransition()}),this.rackController.rack.emitter.on("remove",()=>{this.foldable.cleanUpTransition()}),this.view.buttonElement.addEventListener("click",this.onTitleClick_)}get document(){return this.view.element.ownerDocument}importState(t){return $e(t,e=>super.importState(e),e=>({expanded:e.required.boolean,title:e.optional.string}),e=>(this.foldable.set("expanded",e.expanded),this.props.set("title",e.title),!0))}exportState(){return Ze(()=>super.exportState(),{expanded:this.foldable.get("expanded"),title:this.props.get("title")})}onTitleClick_(){this.foldable.set("expanded",!this.foldable.get("expanded"))}}const cw=Ve({id:"folder",type:"blade",accept(n){const t=he(n,e=>({title:e.required.string,view:e.required.constant("folder"),expanded:e.optional.boolean}));return t?{params:t}:null},controller(n){return new za(n.document,{blade:n.blade,expanded:n.params.expanded,props:Ht.fromObject({title:n.params.title}),viewProps:n.viewProps})},api(n){return n.controller instanceof za?new vd(n.controller,n.pool):null}}),uw=qt("");function Ru(n,t){return wr(n,uw(void 0,t))}class Nn extends Ht{constructor(t){var e;super(t),this.onDisabledChange_=this.onDisabledChange_.bind(this),this.onParentChange_=this.onParentChange_.bind(this),this.onParentGlobalDisabledChange_=this.onParentGlobalDisabledChange_.bind(this),[this.globalDisabled_,this.setGlobalDisabled_]=Hx(le(this.getGlobalDisabled_())),this.value("disabled").emitter.on("change",this.onDisabledChange_),this.value("parent").emitter.on("change",this.onParentChange_),(e=this.get("parent"))===null||e===void 0||e.globalDisabled.emitter.on("change",this.onParentGlobalDisabledChange_)}static create(t){var e,i,r;const s=t??{};return new Nn(Ht.createCore({disabled:(e=s.disabled)!==null&&e!==void 0?e:!1,disposed:!1,hidden:(i=s.hidden)!==null&&i!==void 0?i:!1,parent:(r=s.parent)!==null&&r!==void 0?r:null}))}get globalDisabled(){return this.globalDisabled_}bindClassModifiers(t){Ln(this.globalDisabled_,Ru(t,"disabled")),_n(this,"hidden",Ru(t,"hidden"))}bindDisabled(t){Ln(this.globalDisabled_,e=>{t.disabled=e})}bindTabIndex(t){Ln(this.globalDisabled_,e=>{t.tabIndex=e?-1:0})}handleDispose(t){this.value("disposed").emitter.on("change",e=>{e&&t()})}importState(t){this.set("disabled",t.disabled),this.set("hidden",t.hidden)}exportState(){return{disabled:this.get("disabled"),hidden:this.get("hidden")}}getGlobalDisabled_(){const t=this.get("parent");return(t?t.globalDisabled.rawValue:!1)||this.get("disabled")}updateGlobalDisabled_(){this.setGlobalDisabled_(this.getGlobalDisabled_())}onDisabledChange_(){this.updateGlobalDisabled_()}onParentGlobalDisabledChange_(){this.updateGlobalDisabled_()}onParentChange_(t){var e;const i=t.previousRawValue;i==null||i.globalDisabled.emitter.off("change",this.onParentGlobalDisabledChange_),(e=this.get("parent"))===null||e===void 0||e.globalDisabled.emitter.on("change",this.onParentGlobalDisabledChange_),this.updateGlobalDisabled_()}}const Lu=qt("tbp");class hw{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(Lu()),e.viewProps.bindClassModifiers(this.element);const i=t.createElement("div");i.classList.add(Lu("c")),this.element.appendChild(i),this.containerElement=i}}const Nr=qt("tbi");class dw{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(Nr()),e.viewProps.bindClassModifiers(this.element),_n(e.props,"selected",s=>{s?this.element.classList.add(Nr(void 0,"sel")):this.element.classList.remove(Nr(void 0,"sel"))});const i=t.createElement("button");i.classList.add(Nr("b")),e.viewProps.bindDisabled(i),this.element.appendChild(i),this.buttonElement=i;const r=t.createElement("div");r.classList.add(Nr("t")),cl(e.props.value("title"),r),this.buttonElement.appendChild(r),this.titleElement=r}}class pw{constructor(t,e){this.emitter=new xe,this.onClick_=this.onClick_.bind(this),this.props=e.props,this.viewProps=e.viewProps,this.view=new dw(t,{props:e.props,viewProps:e.viewProps}),this.view.buttonElement.addEventListener("click",this.onClick_)}onClick_(){this.emitter.emit("click",{sender:this})}}class Ha extends hl{constructor(t,e){const i=new hw(t,{viewProps:e.viewProps});super(Object.assign(Object.assign({},e),{rackController:new dl({blade:e.blade,element:i.containerElement,viewProps:e.viewProps}),view:i})),this.onItemClick_=this.onItemClick_.bind(this),this.ic_=new pw(t,{props:e.itemProps,viewProps:Nn.create()}),this.ic_.emitter.on("click",this.onItemClick_),this.props=e.props,_n(this.props,"selected",r=>{this.itemController.props.set("selected",r),this.viewProps.set("hidden",!r)})}get itemController(){return this.ic_}importState(t){return $e(t,e=>super.importState(e),e=>({selected:e.required.boolean,title:e.required.string}),e=>(this.ic_.props.set("selected",e.selected),this.ic_.props.set("title",e.title),!0))}exportState(){return Ze(()=>super.exportState(),{selected:this.ic_.props.get("selected"),title:this.ic_.props.get("title")})}onItemClick_(){this.props.set("selected",!0)}}class fw extends ul{constructor(t,e){super(t,e),this.emitter_=new xe,this.onSelect_=this.onSelect_.bind(this),this.pool_=e,this.rackApi_.on("change",i=>{this.emitter_.emit("change",i)}),this.controller.tab.selectedIndex.emitter.on("change",this.onSelect_)}get pages(){return this.rackApi_.children}addPage(t){const e=this.controller.view.element.ownerDocument,i=new Ha(e,{blade:Er(),itemProps:Ht.fromObject({selected:!1,title:t.title}),props:Ht.fromObject({selected:!1}),viewProps:Nn.create()}),r=this.pool_.createApi(i);return this.rackApi_.add(r,t.index)}removePage(t){this.rackApi_.remove(this.rackApi_.children[t])}on(t,e){const i=e.bind(this);return this.emitter_.on(t,r=>{i(r)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}onSelect_(t){this.emitter_.emit("select",new bb(this,t.rawValue))}}class mw extends ul{get title(){var t;return(t=this.controller.itemController.props.get("title"))!==null&&t!==void 0?t:""}set title(t){this.controller.itemController.props.set("title",t)}get selected(){return this.controller.props.get("selected")}set selected(t){this.controller.props.set("selected",t)}get children(){return this.rackApi_.children}addButton(t){return this.rackApi_.addButton(t)}addFolder(t){return this.rackApi_.addFolder(t)}addTab(t){return this.rackApi_.addTab(t)}add(t,e){this.rackApi_.add(t,e)}remove(t){this.rackApi_.remove(t)}addBinding(t,e,i){return this.rackApi_.addBinding(t,e,i)}addBlade(t){return this.rackApi_.addBlade(t)}}const Du=-1;class vw{constructor(){this.onItemSelectedChange_=this.onItemSelectedChange_.bind(this),this.empty=le(!0),this.selectedIndex=le(Du),this.items_=[]}add(t,e){const i=e??this.items_.length;this.items_.splice(i,0,t),t.emitter.on("change",this.onItemSelectedChange_),this.keepSelection_()}remove(t){const e=this.items_.indexOf(t);e<0||(this.items_.splice(e,1),t.emitter.off("change",this.onItemSelectedChange_),this.keepSelection_())}keepSelection_(){if(this.items_.length===0){this.selectedIndex.rawValue=Du,this.empty.rawValue=!0;return}const t=this.items_.findIndex(e=>e.rawValue);t<0?(this.items_.forEach((e,i)=>{e.rawValue=i===0}),this.selectedIndex.rawValue=0):(this.items_.forEach((e,i)=>{e.rawValue=i===t}),this.selectedIndex.rawValue=t),this.empty.rawValue=!1}onItemSelectedChange_(t){if(t.rawValue){const e=this.items_.findIndex(i=>i===t.sender);this.items_.forEach((i,r)=>{i.rawValue=r===e}),this.selectedIndex.rawValue=e}else this.keepSelection_()}}const Or=qt("tab");class _w{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(Or(),_d()),e.viewProps.bindClassModifiers(this.element),Ln(e.empty,wr(this.element,Or(void 0,"nop")));const i=t.createElement("div");i.classList.add(Or("t")),this.element.appendChild(i),this.itemsElement=i;const r=t.createElement("div");r.classList.add(Or("i")),this.element.appendChild(r);const s=t.createElement("div");s.classList.add(Or("c")),this.element.appendChild(s),this.contentsElement=s}}class Iu extends hl{constructor(t,e){const i=new vw,r=new _w(t,{empty:i.empty,viewProps:e.viewProps});super({blade:e.blade,rackController:new dl({blade:e.blade,element:r.contentsElement,viewProps:e.viewProps}),view:r}),this.onRackAdd_=this.onRackAdd_.bind(this),this.onRackRemove_=this.onRackRemove_.bind(this);const s=this.rackController.rack;s.emitter.on("add",this.onRackAdd_),s.emitter.on("remove",this.onRackRemove_),this.tab=i}add(t,e){this.rackController.rack.add(t,e)}remove(t){this.rackController.rack.remove(this.rackController.rack.children[t])}onRackAdd_(t){if(!t.root)return;const e=t.bladeController;ld(this.view.itemsElement,e.itemController.view.element,t.index),e.itemController.viewProps.set("parent",this.viewProps),this.tab.add(e.props.value("selected"))}onRackRemove_(t){if(!t.root)return;const e=t.bladeController;ll(e.itemController.view.element),e.itemController.viewProps.set("parent",null),this.tab.remove(e.props.value("selected"))}}const gd=Ve({id:"tab",type:"blade",accept(n){const t=he(n,e=>({pages:e.required.array(e.required.object({title:e.required.string})),view:e.required.constant("tab")}));return!t||t.pages.length===0?null:{params:t}},controller(n){const t=new Iu(n.document,{blade:n.blade,viewProps:n.viewProps});return n.params.pages.forEach(e=>{const i=new Ha(n.document,{blade:Er(),itemProps:Ht.fromObject({selected:!1,title:e.title}),props:Ht.fromObject({selected:!1}),viewProps:Nn.create()});t.add(i)}),t},api(n){return n.controller instanceof Iu?new fw(n.controller,n.pool):n.controller instanceof Ha?new mw(n.controller,n.pool):null}});function gw(n,t){const e=n.accept(t.params);if(!e)return null;const i=he(t.params,r=>({disabled:r.optional.boolean,hidden:r.optional.boolean}));return n.controller({blade:Er(),document:t.document,params:Object.assign(Object.assign({},e.params),{disabled:i==null?void 0:i.disabled,hidden:i==null?void 0:i.hidden}),viewProps:Nn.create({disabled:i==null?void 0:i.disabled,hidden:i==null?void 0:i.hidden})})}class fl extends Jr{get options(){return this.controller.valueController.props.get("options")}set options(t){this.controller.valueController.props.set("options",t)}}class xw{constructor(){this.disabled=!1,this.emitter=new xe}dispose(){}tick(){this.disabled||this.emitter.emit("tick",{sender:this})}}class bw{constructor(t,e){this.disabled_=!1,this.timerId_=null,this.onTick_=this.onTick_.bind(this),this.doc_=t,this.emitter=new xe,this.interval_=e,this.setTimer_()}get disabled(){return this.disabled_}set disabled(t){this.disabled_=t,this.disabled_?this.clearTimer_():this.setTimer_()}dispose(){this.clearTimer_()}clearTimer_(){if(this.timerId_===null)return;const t=this.doc_.defaultView;t&&t.clearInterval(this.timerId_),this.timerId_=null}setTimer_(){if(this.clearTimer_(),this.interval_<=0)return;const t=this.doc_.defaultView;t&&(this.timerId_=t.setInterval(this.onTick_,this.interval_))}onTick_(){this.disabled_||this.emitter.emit("tick",{sender:this})}}class as{constructor(t){this.constraints=t}constrain(t){return this.constraints.reduce((e,i)=>i.constrain(e),t)}}function mo(n,t){if(n instanceof t)return n;if(n instanceof as){const e=n.constraints.reduce((i,r)=>i||(r instanceof t?r:null),null);if(e)return e}return null}class ls{constructor(t){this.values=Ht.fromObject({options:t})}constrain(t){const e=this.values.get("options");return e.length===0||e.filter(r=>r.value===t).length>0?t:e[0].value}}function cs(n){var t;const e=ka;if(Array.isArray(n))return(t=he({items:n},i=>({items:i.required.array(i.required.object({text:i.required.string,value:i.required.raw}))})))===null||t===void 0?void 0:t.items;if(typeof n=="object")return e.required.raw(n).value}function ml(n){if(Array.isArray(n))return n;const t=[];return Object.keys(n).forEach(e=>{t.push({text:e,value:n[e]})}),t}function vl(n){return ee(n)?null:new ls(ml(n))}const _a=qt("lst");class ww{constructor(t,e){this.onValueChange_=this.onValueChange_.bind(this),this.props_=e.props,this.element=t.createElement("div"),this.element.classList.add(_a()),e.viewProps.bindClassModifiers(this.element);const i=t.createElement("select");i.classList.add(_a("s")),e.viewProps.bindDisabled(i),this.element.appendChild(i),this.selectElement=i;const r=t.createElement("div");r.classList.add(_a("m")),r.appendChild(So(t,"dropdown")),this.element.appendChild(r),e.value.emitter.on("change",this.onValueChange_),this.value_=e.value,_n(this.props_,"options",s=>{cd(this.selectElement),s.forEach(o=>{const a=t.createElement("option");a.textContent=o.text,this.selectElement.appendChild(a)}),this.update_()})}update_(){const t=this.props_.get("options").map(e=>e.value);this.selectElement.selectedIndex=t.indexOf(this.value_.rawValue)}onValueChange_(){this.update_()}}class ri{constructor(t,e){this.onSelectChange_=this.onSelectChange_.bind(this),this.props=e.props,this.value=e.value,this.viewProps=e.viewProps,this.view=new ww(t,{props:this.props,value:this.value,viewProps:this.viewProps}),this.view.selectElement.addEventListener("change",this.onSelectChange_)}onSelectChange_(t){const e=t.currentTarget;this.value.rawValue=this.props.get("options")[e.selectedIndex].value}importProps(t){return $e(t,null,e=>({options:e.required.custom(cs)}),e=>(this.props.set("options",ml(e.options)),!0))}exportProps(){return Ze(null,{options:this.props.get("options")})}}const Uu=qt("pop");class yw{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(Uu()),e.viewProps.bindClassModifiers(this.element),Ln(e.shows,wr(this.element,Uu(void 0,"v")))}}class xd{constructor(t,e){this.shows=le(!1),this.viewProps=e.viewProps,this.view=new yw(t,{shows:this.shows,viewProps:this.viewProps})}}const Nu=qt("txt");class Ew{constructor(t,e){this.onChange_=this.onChange_.bind(this),this.element=t.createElement("div"),this.element.classList.add(Nu()),e.viewProps.bindClassModifiers(this.element),this.props_=e.props,this.props_.emitter.on("change",this.onChange_);const i=t.createElement("input");i.classList.add(Nu("i")),i.type="text",e.viewProps.bindDisabled(i),this.element.appendChild(i),this.inputElement=i,e.value.emitter.on("change",this.onChange_),this.value_=e.value,this.refresh()}refresh(){const t=this.props_.get("formatter");this.inputElement.value=t(this.value_.rawValue)}onChange_(){this.refresh()}}class Qr{constructor(t,e){this.onInputChange_=this.onInputChange_.bind(this),this.parser_=e.parser,this.props=e.props,this.value=e.value,this.viewProps=e.viewProps,this.view=new Ew(t,{props:e.props,value:this.value,viewProps:this.viewProps}),this.view.inputElement.addEventListener("change",this.onInputChange_)}onInputChange_(t){const i=t.currentTarget.value,r=this.parser_(i);ee(r)||(this.value.rawValue=r),this.view.refresh()}}function Mw(n){return String(n)}function bd(n){return n==="false"?!1:!!n}function Ou(n){return Mw(n)}function Sw(n){return t=>n.reduce((e,i)=>e!==null?e:i(t),null)}const Tw=Xe(0);function vo(n){return Tw(n)+"%"}function wd(n){return String(n)}function Ga(n){return n}function Mr({primary:n,secondary:t,forward:e,backward:i}){let r=!1;function s(o){r||(r=!0,o(),r=!1)}n.emitter.on("change",o=>{s(()=>{t.setRawValue(e(n.rawValue,t.rawValue),o.options)})}),t.emitter.on("change",o=>{s(()=>{n.setRawValue(i(n.rawValue,t.rawValue),o.options)}),s(()=>{t.setRawValue(e(n.rawValue,t.rawValue),o.options)})}),s(()=>{t.setRawValue(e(n.rawValue,t.rawValue),{forceEmit:!1,last:!0})})}function Ge(n,t){const e=n*(t.altKey?.1:1)*(t.shiftKey?10:1);return t.upKey?+e:t.downKey?-e:0}function ts(n){return{altKey:n.altKey,downKey:n.key==="ArrowDown",shiftKey:n.shiftKey,upKey:n.key==="ArrowUp"}}function Un(n){return{altKey:n.altKey,downKey:n.key==="ArrowLeft",shiftKey:n.shiftKey,upKey:n.key==="ArrowRight"}}function Cw(n){return n==="ArrowUp"||n==="ArrowDown"}function yd(n){return Cw(n)||n==="ArrowLeft"||n==="ArrowRight"}function ga(n,t){var e,i;const r=t.ownerDocument.defaultView,s=t.getBoundingClientRect();return{x:n.pageX-(((e=r&&r.scrollX)!==null&&e!==void 0?e:0)+s.left),y:n.pageY-(((i=r&&r.scrollY)!==null&&i!==void 0?i:0)+s.top)}}class Ui{constructor(t){this.lastTouch_=null,this.onDocumentMouseMove_=this.onDocumentMouseMove_.bind(this),this.onDocumentMouseUp_=this.onDocumentMouseUp_.bind(this),this.onMouseDown_=this.onMouseDown_.bind(this),this.onTouchEnd_=this.onTouchEnd_.bind(this),this.onTouchMove_=this.onTouchMove_.bind(this),this.onTouchStart_=this.onTouchStart_.bind(this),this.elem_=t,this.emitter=new xe,t.addEventListener("touchstart",this.onTouchStart_,{passive:!1}),t.addEventListener("touchmove",this.onTouchMove_,{passive:!0}),t.addEventListener("touchend",this.onTouchEnd_),t.addEventListener("mousedown",this.onMouseDown_)}computePosition_(t){const e=this.elem_.getBoundingClientRect();return{bounds:{width:e.width,height:e.height},point:t?{x:t.x,y:t.y}:null}}onMouseDown_(t){var e;t.preventDefault(),(e=t.currentTarget)===null||e===void 0||e.focus();const i=this.elem_.ownerDocument;i.addEventListener("mousemove",this.onDocumentMouseMove_),i.addEventListener("mouseup",this.onDocumentMouseUp_),this.emitter.emit("down",{altKey:t.altKey,data:this.computePosition_(ga(t,this.elem_)),sender:this,shiftKey:t.shiftKey})}onDocumentMouseMove_(t){this.emitter.emit("move",{altKey:t.altKey,data:this.computePosition_(ga(t,this.elem_)),sender:this,shiftKey:t.shiftKey})}onDocumentMouseUp_(t){const e=this.elem_.ownerDocument;e.removeEventListener("mousemove",this.onDocumentMouseMove_),e.removeEventListener("mouseup",this.onDocumentMouseUp_),this.emitter.emit("up",{altKey:t.altKey,data:this.computePosition_(ga(t,this.elem_)),sender:this,shiftKey:t.shiftKey})}onTouchStart_(t){t.preventDefault();const e=t.targetTouches.item(0),i=this.elem_.getBoundingClientRect();this.emitter.emit("down",{altKey:t.altKey,data:this.computePosition_(e?{x:e.clientX-i.left,y:e.clientY-i.top}:void 0),sender:this,shiftKey:t.shiftKey}),this.lastTouch_=e}onTouchMove_(t){const e=t.targetTouches.item(0),i=this.elem_.getBoundingClientRect();this.emitter.emit("move",{altKey:t.altKey,data:this.computePosition_(e?{x:e.clientX-i.left,y:e.clientY-i.top}:void 0),sender:this,shiftKey:t.shiftKey}),this.lastTouch_=e}onTouchEnd_(t){var e;const i=(e=t.targetTouches.item(0))!==null&&e!==void 0?e:this.lastTouch_,r=this.elem_.getBoundingClientRect();this.emitter.emit("up",{altKey:t.altKey,data:this.computePosition_(i?{x:i.clientX-r.left,y:i.clientY-r.top}:void 0),sender:this,shiftKey:t.shiftKey})}}const tn=qt("txt");class Aw{constructor(t,e){this.onChange_=this.onChange_.bind(this),this.props_=e.props,this.props_.emitter.on("change",this.onChange_),this.element=t.createElement("div"),this.element.classList.add(tn(),tn(void 0,"num")),e.arrayPosition&&this.element.classList.add(tn(void 0,e.arrayPosition)),e.viewProps.bindClassModifiers(this.element);const i=t.createElement("input");i.classList.add(tn("i")),i.type="text",e.viewProps.bindDisabled(i),this.element.appendChild(i),this.inputElement=i,this.onDraggingChange_=this.onDraggingChange_.bind(this),this.dragging_=e.dragging,this.dragging_.emitter.on("change",this.onDraggingChange_),this.element.classList.add(tn()),this.inputElement.classList.add(tn("i"));const r=t.createElement("div");r.classList.add(tn("k")),this.element.appendChild(r),this.knobElement=r;const s=t.createElementNS(mn,"svg");s.classList.add(tn("g")),this.knobElement.appendChild(s);const o=t.createElementNS(mn,"path");o.classList.add(tn("gb")),s.appendChild(o),this.guideBodyElem_=o;const a=t.createElementNS(mn,"path");a.classList.add(tn("gh")),s.appendChild(a),this.guideHeadElem_=a;const l=t.createElement("div");l.classList.add(qt("tt")()),this.knobElement.appendChild(l),this.tooltipElem_=l,e.value.emitter.on("change",this.onChange_),this.value=e.value,this.refresh()}onDraggingChange_(t){if(t.rawValue===null){this.element.classList.remove(tn(void 0,"drg"));return}this.element.classList.add(tn(void 0,"drg"));const e=t.rawValue/this.props_.get("pointerScale"),i=e+(e>0?-1:e<0?1:0),r=we(-i,-4,4);this.guideHeadElem_.setAttributeNS(null,"d",[`M ${i+r},0 L${i},4 L${i+r},8`,`M ${e},-1 L${e},9`].join(" ")),this.guideBodyElem_.setAttributeNS(null,"d",`M 0,4 L${e},4`);const s=this.props_.get("formatter");this.tooltipElem_.textContent=s(this.value.rawValue),this.tooltipElem_.style.left=`${e}px`}refresh(){const t=this.props_.get("formatter");this.inputElement.value=t(this.value.rawValue)}onChange_(){this.refresh()}}class us{constructor(t,e){var i;this.originRawValue_=0,this.onInputChange_=this.onInputChange_.bind(this),this.onInputKeyDown_=this.onInputKeyDown_.bind(this),this.onInputKeyUp_=this.onInputKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.parser_=e.parser,this.props=e.props,this.sliderProps_=(i=e.sliderProps)!==null&&i!==void 0?i:null,this.value=e.value,this.viewProps=e.viewProps,this.dragging_=le(null),this.view=new Aw(t,{arrayPosition:e.arrayPosition,dragging:this.dragging_,props:this.props,value:this.value,viewProps:this.viewProps}),this.view.inputElement.addEventListener("change",this.onInputChange_),this.view.inputElement.addEventListener("keydown",this.onInputKeyDown_),this.view.inputElement.addEventListener("keyup",this.onInputKeyUp_);const r=new Ui(this.view.knobElement);r.emitter.on("down",this.onPointerDown_),r.emitter.on("move",this.onPointerMove_),r.emitter.on("up",this.onPointerUp_)}constrainValue_(t){var e,i;const r=(e=this.sliderProps_)===null||e===void 0?void 0:e.get("min"),s=(i=this.sliderProps_)===null||i===void 0?void 0:i.get("max");let o=t;return r!==void 0&&(o=Math.max(o,r)),s!==void 0&&(o=Math.min(o,s)),o}onInputChange_(t){const i=t.currentTarget.value,r=this.parser_(i);ee(r)||(this.value.rawValue=this.constrainValue_(r)),this.view.refresh()}onInputKeyDown_(t){const e=Ge(this.props.get("keyScale"),ts(t));e!==0&&this.value.setRawValue(this.constrainValue_(this.value.rawValue+e),{forceEmit:!1,last:!1})}onInputKeyUp_(t){Ge(this.props.get("keyScale"),ts(t))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}onPointerDown_(){this.originRawValue_=this.value.rawValue,this.dragging_.rawValue=0}computeDraggingValue_(t){if(!t.point)return null;const e=t.point.x-t.bounds.width/2;return this.constrainValue_(this.originRawValue_+e*this.props.get("pointerScale"))}onPointerMove_(t){const e=this.computeDraggingValue_(t.data);e!==null&&(this.value.setRawValue(e,{forceEmit:!1,last:!1}),this.dragging_.rawValue=this.value.rawValue-this.originRawValue_)}onPointerUp_(t){const e=this.computeDraggingValue_(t.data);e!==null&&(this.value.setRawValue(e,{forceEmit:!0,last:!0}),this.dragging_.rawValue=null)}}const xa=qt("sld");class Pw{constructor(t,e){this.onChange_=this.onChange_.bind(this),this.props_=e.props,this.props_.emitter.on("change",this.onChange_),this.element=t.createElement("div"),this.element.classList.add(xa()),e.viewProps.bindClassModifiers(this.element);const i=t.createElement("div");i.classList.add(xa("t")),e.viewProps.bindTabIndex(i),this.element.appendChild(i),this.trackElement=i;const r=t.createElement("div");r.classList.add(xa("k")),this.trackElement.appendChild(r),this.knobElement=r,e.value.emitter.on("change",this.onChange_),this.value=e.value,this.update_()}update_(){const t=we($t(this.value.rawValue,this.props_.get("min"),this.props_.get("max"),0,100),0,100);this.knobElement.style.width=`${t}%`}onChange_(){this.update_()}}class Rw{constructor(t,e){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDownOrMove_=this.onPointerDownOrMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.props=e.props,this.view=new Pw(t,{props:this.props,value:this.value,viewProps:this.viewProps}),this.ptHandler_=new Ui(this.view.trackElement),this.ptHandler_.emitter.on("down",this.onPointerDownOrMove_),this.ptHandler_.emitter.on("move",this.onPointerDownOrMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.trackElement.addEventListener("keydown",this.onKeyDown_),this.view.trackElement.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(t,e){t.point&&this.value.setRawValue($t(we(t.point.x,0,t.bounds.width),0,t.bounds.width,this.props.get("min"),this.props.get("max")),e)}onPointerDownOrMove_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerUp_(t){this.handlePointerEvent_(t.data,{forceEmit:!0,last:!0})}onKeyDown_(t){const e=Ge(this.props.get("keyScale"),Un(t));e!==0&&this.value.setRawValue(this.value.rawValue+e,{forceEmit:!1,last:!1})}onKeyUp_(t){Ge(this.props.get("keyScale"),Un(t))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}const ba=qt("sldtxt");class Lw{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(ba());const i=t.createElement("div");i.classList.add(ba("s")),this.sliderView_=e.sliderView,i.appendChild(this.sliderView_.element),this.element.appendChild(i);const r=t.createElement("div");r.classList.add(ba("t")),this.textView_=e.textView,r.appendChild(this.textView_.element),this.element.appendChild(r)}}class _o{constructor(t,e){this.value=e.value,this.viewProps=e.viewProps,this.sliderC_=new Rw(t,{props:e.sliderProps,value:e.value,viewProps:this.viewProps}),this.textC_=new us(t,{parser:e.parser,props:e.textProps,sliderProps:e.sliderProps,value:e.value,viewProps:e.viewProps}),this.view=new Lw(t,{sliderView:this.sliderC_.view,textView:this.textC_.view})}get sliderController(){return this.sliderC_}get textController(){return this.textC_}importProps(t){return $e(t,null,e=>({max:e.required.number,min:e.required.number}),e=>{const i=this.sliderC_.props;return i.set("max",e.max),i.set("min",e.min),!0})}exportProps(){const t=this.sliderC_.props;return Ze(null,{max:t.get("max"),min:t.get("min")})}}function Ed(n){return{sliderProps:new Ht({keyScale:n.keyScale,max:n.max,min:n.min}),textProps:new Ht({formatter:le(n.formatter),keyScale:n.keyScale,pointerScale:le(n.pointerScale)})}}const Dw={containerUnitSize:"cnt-usz"};function Md(n){return`--${Dw[n]}`}function es(n){return od(n)}function Kn(n){if(Ba(n))return he(n,es)}function Rn(n,t){if(!n)return;const e=[],i=id(n,t);i&&e.push(i);const r=rd(n);return r&&e.push(r),new as(e)}function Iw(n){return n?n.major===yr.major:!1}function Sd(n){if(n==="inline"||n==="popup")return n}function hs(n,t){n.write(t)}const Zs=qt("ckb");class Uw{constructor(t,e){this.onValueChange_=this.onValueChange_.bind(this),this.element=t.createElement("div"),this.element.classList.add(Zs()),e.viewProps.bindClassModifiers(this.element);const i=t.createElement("label");i.classList.add(Zs("l")),this.element.appendChild(i),this.labelElement=i;const r=t.createElement("input");r.classList.add(Zs("i")),r.type="checkbox",this.labelElement.appendChild(r),this.inputElement=r,e.viewProps.bindDisabled(this.inputElement);const s=t.createElement("div");s.classList.add(Zs("w")),this.labelElement.appendChild(s);const o=So(t,"check");s.appendChild(o),e.value.emitter.on("change",this.onValueChange_),this.value=e.value,this.update_()}update_(){this.inputElement.checked=this.value.rawValue}onValueChange_(){this.update_()}}class Nw{constructor(t,e){this.onInputChange_=this.onInputChange_.bind(this),this.onLabelMouseDown_=this.onLabelMouseDown_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.view=new Uw(t,{value:this.value,viewProps:this.viewProps}),this.view.inputElement.addEventListener("change",this.onInputChange_),this.view.labelElement.addEventListener("mousedown",this.onLabelMouseDown_)}onInputChange_(t){const e=t.currentTarget;this.value.rawValue=e.checked,t.preventDefault(),t.stopPropagation()}onLabelMouseDown_(t){t.preventDefault()}}function Ow(n){const t=[],e=vl(n.options);return e&&t.push(e),new as(t)}const Fw=Ve({id:"input-bool",type:"input",accept:(n,t)=>{if(typeof n!="boolean")return null;const e=he(t,i=>({options:i.optional.custom(cs),readonly:i.optional.constant(!1)}));return e?{initialValue:n,params:e}:null},binding:{reader:n=>bd,constraint:n=>Ow(n.params),writer:n=>hs},controller:n=>{const t=n.document,e=n.value,i=n.constraint,r=i&&mo(i,ls);return r?new ri(t,{props:new Ht({options:r.values.value("options")}),value:e,viewProps:n.viewProps}):new Nw(t,{value:e,viewProps:n.viewProps})},api(n){return typeof n.controller.value.rawValue!="boolean"?null:n.controller.valueController instanceof ri?new fl(n.controller):null}}),mi=qt("col");class Bw{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(mi()),e.foldable.bindExpandedClass(this.element,mi(void 0,"expanded")),_n(e.foldable,"completed",wr(this.element,mi(void 0,"cpl")));const i=t.createElement("div");i.classList.add(mi("h")),this.element.appendChild(i);const r=t.createElement("div");r.classList.add(mi("s")),i.appendChild(r),this.swatchElement=r;const s=t.createElement("div");if(s.classList.add(mi("t")),i.appendChild(s),this.textElement=s,e.pickerLayout==="inline"){const o=t.createElement("div");o.classList.add(mi("p")),this.element.appendChild(o),this.pickerElement=o}else this.pickerElement=null}}function kw(n,t,e){const i=we(n/255,0,1),r=we(t/255,0,1),s=we(e/255,0,1),o=Math.max(i,r,s),a=Math.min(i,r,s),l=o-a;let c=0,u=0;const h=(a+o)/2;return l!==0&&(u=l/(1-Math.abs(o+a-1)),i===o?c=(r-s)/l:r===o?c=2+(s-i)/l:c=4+(i-r)/l,c=c/6+(c<0?1:0)),[c*360,u*100,h*100]}function Vw(n,t,e){const i=(n%360+360)%360,r=we(t/100,0,1),s=we(e/100,0,1),o=(1-Math.abs(2*s-1))*r,a=o*(1-Math.abs(i/60%2-1)),l=s-o/2;let c,u,h;return i>=0&&i<60?[c,u,h]=[o,a,0]:i>=60&&i<120?[c,u,h]=[a,o,0]:i>=120&&i<180?[c,u,h]=[0,o,a]:i>=180&&i<240?[c,u,h]=[0,a,o]:i>=240&&i<300?[c,u,h]=[a,0,o]:[c,u,h]=[o,0,a],[(c+l)*255,(u+l)*255,(h+l)*255]}function zw(n,t,e){const i=we(n/255,0,1),r=we(t/255,0,1),s=we(e/255,0,1),o=Math.max(i,r,s),a=Math.min(i,r,s),l=o-a;let c;l===0?c=0:o===i?c=60*(((r-s)/l%6+6)%6):o===r?c=60*((s-i)/l+2):c=60*((i-r)/l+4);const u=o===0?0:l/o,h=o;return[c,u*100,h*100]}function Td(n,t,e){const i=td(n,360),r=we(t/100,0,1),s=we(e/100,0,1),o=s*r,a=o*(1-Math.abs(i/60%2-1)),l=s-o;let c,u,h;return i>=0&&i<60?[c,u,h]=[o,a,0]:i>=60&&i<120?[c,u,h]=[a,o,0]:i>=120&&i<180?[c,u,h]=[0,o,a]:i>=180&&i<240?[c,u,h]=[0,a,o]:i>=240&&i<300?[c,u,h]=[a,0,o]:[c,u,h]=[o,0,a],[(c+l)*255,(u+l)*255,(h+l)*255]}function Hw(n,t,e){const i=e+t*(100-Math.abs(2*e-100))/200;return[n,i!==0?t*(100-Math.abs(2*e-100))/i:0,e+t*(100-Math.abs(2*e-100))/(2*100)]}function Gw(n,t,e){const i=100-Math.abs(e*(200-t)/100-100);return[n,i!==0?t*e/i:0,e*(200-t)/(2*100)]}function gn(n){return[n[0],n[1],n[2]]}function Co(n,t){return[n[0],n[1],n[2],t]}const Ww={hsl:{hsl:(n,t,e)=>[n,t,e],hsv:Hw,rgb:Vw},hsv:{hsl:Gw,hsv:(n,t,e)=>[n,t,e],rgb:Td},rgb:{hsl:kw,hsv:zw,rgb:(n,t,e)=>[n,t,e]}};function gr(n,t){return[t==="float"?1:n==="rgb"?255:360,t==="float"?1:n==="rgb"?255:100,t==="float"?1:n==="rgb"?255:100]}function Xw(n,t){return n===t?t:td(n,t)}function Cd(n,t,e){var i;const r=gr(t,e);return[t==="rgb"?we(n[0],0,r[0]):Xw(n[0],r[0]),we(n[1],0,r[1]),we(n[2],0,r[2]),we((i=n[3])!==null&&i!==void 0?i:1,0,1)]}function Fu(n,t,e,i){const r=gr(t,e),s=gr(t,i);return n.map((o,a)=>o/r[a]*s[a])}function Ad(n,t,e){const i=Fu(n,t.mode,t.type,"int"),r=Ww[t.mode][e.mode](...i);return Fu(r,e.mode,"int",e.type)}class Kt{static black(){return new Kt([0,0,0],"rgb")}constructor(t,e){this.type="int",this.mode=e,this.comps_=Cd(t,e,this.type)}getComponents(t){return Co(Ad(gn(this.comps_),{mode:this.mode,type:this.type},{mode:t??this.mode,type:this.type}),this.comps_[3])}toRgbaObject(){const t=this.getComponents("rgb");return{r:t[0],g:t[1],b:t[2],a:t[3]}}}const Hn=qt("colp");class qw{constructor(t,e){this.alphaViews_=null,this.element=t.createElement("div"),this.element.classList.add(Hn()),e.viewProps.bindClassModifiers(this.element);const i=t.createElement("div");i.classList.add(Hn("hsv"));const r=t.createElement("div");r.classList.add(Hn("sv")),this.svPaletteView_=e.svPaletteView,r.appendChild(this.svPaletteView_.element),i.appendChild(r);const s=t.createElement("div");s.classList.add(Hn("h")),this.hPaletteView_=e.hPaletteView,s.appendChild(this.hPaletteView_.element),i.appendChild(s),this.element.appendChild(i);const o=t.createElement("div");if(o.classList.add(Hn("rgb")),this.textsView_=e.textsView,o.appendChild(this.textsView_.element),this.element.appendChild(o),e.alphaViews){this.alphaViews_={palette:e.alphaViews.palette,text:e.alphaViews.text};const a=t.createElement("div");a.classList.add(Hn("a"));const l=t.createElement("div");l.classList.add(Hn("ap")),l.appendChild(this.alphaViews_.palette.element),a.appendChild(l);const c=t.createElement("div");c.classList.add(Hn("at")),c.appendChild(this.alphaViews_.text.element),a.appendChild(c),this.element.appendChild(a)}}get allFocusableElements(){const t=[this.svPaletteView_.element,this.hPaletteView_.element,this.textsView_.modeSelectElement,...this.textsView_.inputViews.map(e=>e.inputElement)];return this.alphaViews_&&t.push(this.alphaViews_.palette.element,this.alphaViews_.text.inputElement),t}}function Yw(n){return n==="int"?"int":n==="float"?"float":void 0}function _l(n){return he(n,t=>({color:t.optional.object({alpha:t.optional.boolean,type:t.optional.custom(Yw)}),expanded:t.optional.boolean,picker:t.optional.custom(Sd),readonly:t.optional.constant(!1)}))}function Ri(n){return n?.1:1}function Pd(n){var t;return(t=n.color)===null||t===void 0?void 0:t.type}class gl{constructor(t,e){this.type="float",this.mode=e,this.comps_=Cd(t,e,this.type)}getComponents(t){return Co(Ad(gn(this.comps_),{mode:this.mode,type:this.type},{mode:t??this.mode,type:this.type}),this.comps_[3])}toRgbaObject(){const t=this.getComponents("rgb");return{r:t[0],g:t[1],b:t[2],a:t[3]}}}const jw={int:(n,t)=>new Kt(n,t),float:(n,t)=>new gl(n,t)};function xl(n,t,e){return jw[e](n,t)}function Kw(n){return n.type==="float"}function $w(n){return n.type==="int"}function Zw(n){const t=n.getComponents(),e=gr(n.mode,"int");return new Kt([Math.round($t(t[0],0,1,0,e[0])),Math.round($t(t[1],0,1,0,e[1])),Math.round($t(t[2],0,1,0,e[2])),t[3]],n.mode)}function Jw(n){const t=n.getComponents(),e=gr(n.mode,"int");return new gl([$t(t[0],0,e[0],0,1),$t(t[1],0,e[1],0,1),$t(t[2],0,e[2],0,1),t[3]],n.mode)}function ke(n,t){if(n.type===t)return n;if($w(n)&&t==="float")return Jw(n);if(Kw(n)&&t==="int")return Zw(n);throw fe.shouldNeverHappen()}function Qw(n,t){return n.alpha===t.alpha&&n.mode===t.mode&&n.notation===t.notation&&n.type===t.type}function rn(n,t){const e=n.match(/^(.+)%$/);return Math.min(e?parseFloat(e[1])*.01*t:parseFloat(n),t)}const ty={deg:n=>n,grad:n=>n*360/400,rad:n=>n*360/(2*Math.PI),turn:n=>n*360};function Rd(n){const t=n.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);if(!t)return parseFloat(n);const e=parseFloat(t[1]),i=t[2];return ty[i](e)}function Ld(n){const t=n.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;const e=[rn(t[1],255),rn(t[2],255),rn(t[3],255)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])?null:e}function ey(n){const t=Ld(n);return t?new Kt(t,"rgb"):null}function Dd(n){const t=n.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;const e=[rn(t[1],255),rn(t[2],255),rn(t[3],255),rn(t[4],1)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])||isNaN(e[3])?null:e}function ny(n){const t=Dd(n);return t?new Kt(t,"rgb"):null}function Id(n){const t=n.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;const e=[Rd(t[1]),rn(t[2],100),rn(t[3],100)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])?null:e}function iy(n){const t=Id(n);return t?new Kt(t,"hsl"):null}function Ud(n){const t=n.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);if(!t)return null;const e=[Rd(t[1]),rn(t[2],100),rn(t[3],100),rn(t[4],1)];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])||isNaN(e[3])?null:e}function ry(n){const t=Ud(n);return t?new Kt(t,"hsl"):null}function Nd(n){const t=n.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);if(t)return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)];const e=n.match(/^(?:#|0x)([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);return e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]:null}function sy(n){const t=Nd(n);return t?new Kt(t,"rgb"):null}function Od(n){const t=n.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);if(t)return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16),$t(parseInt(t[4]+t[4],16),0,255,0,1)];const e=n.match(/^(?:#|0x)?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);return e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16),$t(parseInt(e[4],16),0,255,0,1)]:null}function oy(n){const t=Od(n);return t?new Kt(t,"rgb"):null}function Fd(n){const t=n.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);if(!t)return null;const e=[parseFloat(t[1]),parseFloat(t[2]),parseFloat(t[3])];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])?null:e}function Bu(n){return t=>{const e=Fd(t);return e?xl(e,"rgb",n):null}}function Bd(n){const t=n.match(/^\{\s*r\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*g\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*b\s*:\s*([0-9A-Fa-f.]+%?)\s*,\s*a\s*:\s*([0-9A-Fa-f.]+%?)\s*\}$/);if(!t)return null;const e=[parseFloat(t[1]),parseFloat(t[2]),parseFloat(t[3]),parseFloat(t[4])];return isNaN(e[0])||isNaN(e[1])||isNaN(e[2])||isNaN(e[3])?null:e}function ku(n){return t=>{const e=Bd(t);return e?xl(e,"rgb",n):null}}const ay=[{parser:Nd,result:{alpha:!1,mode:"rgb",notation:"hex"}},{parser:Od,result:{alpha:!0,mode:"rgb",notation:"hex"}},{parser:Ld,result:{alpha:!1,mode:"rgb",notation:"func"}},{parser:Dd,result:{alpha:!0,mode:"rgb",notation:"func"}},{parser:Id,result:{alpha:!1,mode:"hsl",notation:"func"}},{parser:Ud,result:{alpha:!0,mode:"hsl",notation:"func"}},{parser:Fd,result:{alpha:!1,mode:"rgb",notation:"object"}},{parser:Bd,result:{alpha:!0,mode:"rgb",notation:"object"}}];function ly(n){return ay.reduce((t,{parser:e,result:i})=>t||(e(n)?i:null),null)}function cy(n,t="int"){const e=ly(n);return e?e.notation==="hex"&&t!=="float"?Object.assign(Object.assign({},e),{type:"int"}):e.notation==="func"?Object.assign(Object.assign({},e),{type:t}):null:null}function ds(n){const t=[sy,oy,ey,ny,iy,ry];n==="int"&&t.push(Bu("int"),ku("int")),n==="float"&&t.push(Bu("float"),ku("float"));const e=Sw(t);return i=>{const r=e(i);return r?ke(r,n):null}}function uy(n){const t=ds("int");if(typeof n!="string")return Kt.black();const e=t(n);return e??Kt.black()}function kd(n){const t=we(Math.floor(n),0,255).toString(16);return t.length===1?`0${t}`:t}function bl(n,t="#"){const e=gn(n.getComponents("rgb")).map(kd).join("");return`${t}${e}`}function wl(n,t="#"){const e=n.getComponents("rgb"),i=[e[0],e[1],e[2],e[3]*255].map(kd).join("");return`${t}${i}`}function Vd(n){const t=Xe(0),e=ke(n,"int");return`rgb(${gn(e.getComponents("rgb")).map(r=>t(r)).join(", ")})`}function Qs(n){const t=Xe(2),e=Xe(0);return`rgba(${ke(n,"int").getComponents("rgb").map((s,o)=>(o===3?t:e)(s)).join(", ")})`}function hy(n){const t=[Xe(0),vo,vo],e=ke(n,"int");return`hsl(${gn(e.getComponents("hsl")).map((r,s)=>t[s](r)).join(", ")})`}function dy(n){const t=[Xe(0),vo,vo,Xe(2)];return`hsla(${ke(n,"int").getComponents("hsl").map((r,s)=>t[s](r)).join(", ")})`}function zd(n,t){const e=Xe(t==="float"?2:0),i=["r","g","b"],r=ke(n,t);return`{${gn(r.getComponents("rgb")).map((o,a)=>`${i[a]}: ${e(o)}`).join(", ")}}`}function py(n){return t=>zd(t,n)}function Hd(n,t){const e=Xe(2),i=Xe(t==="float"?2:0),r=["r","g","b","a"];return`{${ke(n,t).getComponents("rgb").map((a,l)=>{const c=l===3?e:i;return`${r[l]}: ${c(a)}`}).join(", ")}}`}function fy(n){return t=>Hd(t,n)}const my=[{format:{alpha:!1,mode:"rgb",notation:"hex",type:"int"},stringifier:bl},{format:{alpha:!0,mode:"rgb",notation:"hex",type:"int"},stringifier:wl},{format:{alpha:!1,mode:"rgb",notation:"func",type:"int"},stringifier:Vd},{format:{alpha:!0,mode:"rgb",notation:"func",type:"int"},stringifier:Qs},{format:{alpha:!1,mode:"hsl",notation:"func",type:"int"},stringifier:hy},{format:{alpha:!0,mode:"hsl",notation:"func",type:"int"},stringifier:dy},...["int","float"].reduce((n,t)=>[...n,{format:{alpha:!1,mode:"rgb",notation:"object",type:t},stringifier:py(t)},{format:{alpha:!0,mode:"rgb",notation:"object",type:t},stringifier:fy(t)}],[])];function Gd(n){return my.reduce((t,e)=>t||(Qw(e.format,n)?e.stringifier:null),null)}const Fr=qt("apl");class vy{constructor(t,e){this.onValueChange_=this.onValueChange_.bind(this),this.value=e.value,this.value.emitter.on("change",this.onValueChange_),this.element=t.createElement("div"),this.element.classList.add(Fr()),e.viewProps.bindClassModifiers(this.element),e.viewProps.bindTabIndex(this.element);const i=t.createElement("div");i.classList.add(Fr("b")),this.element.appendChild(i);const r=t.createElement("div");r.classList.add(Fr("c")),i.appendChild(r),this.colorElem_=r;const s=t.createElement("div");s.classList.add(Fr("m")),this.element.appendChild(s),this.markerElem_=s;const o=t.createElement("div");o.classList.add(Fr("p")),this.markerElem_.appendChild(o),this.previewElem_=o,this.update_()}update_(){const t=this.value.rawValue,e=t.getComponents("rgb"),i=new Kt([e[0],e[1],e[2],0],"rgb"),r=new Kt([e[0],e[1],e[2],255],"rgb"),s=["to right",Qs(i),Qs(r)];this.colorElem_.style.background=`linear-gradient(${s.join(",")})`,this.previewElem_.style.backgroundColor=Qs(t);const o=$t(e[3],0,1,0,100);this.markerElem_.style.left=`${o}%`}onValueChange_(){this.update_()}}class _y{constructor(t,e){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.view=new vy(t,{value:this.value,viewProps:this.viewProps}),this.ptHandler_=new Ui(this.view.element),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.element.addEventListener("keydown",this.onKeyDown_),this.view.element.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(t,e){if(!t.point)return;const i=t.point.x/t.bounds.width,r=this.value.rawValue,[s,o,a]=r.getComponents("hsv");this.value.setRawValue(new Kt([s,o,a,i],"hsv"),e)}onPointerDown_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerMove_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerUp_(t){this.handlePointerEvent_(t.data,{forceEmit:!0,last:!0})}onKeyDown_(t){const e=Ge(Ri(!0),Un(t));if(e===0)return;const i=this.value.rawValue,[r,s,o,a]=i.getComponents("hsv");this.value.setRawValue(new Kt([r,s,o,a+e],"hsv"),{forceEmit:!1,last:!1})}onKeyUp_(t){Ge(Ri(!0),Un(t))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}const ir=qt("coltxt");function gy(n){const t=n.createElement("select"),e=[{text:"RGB",value:"rgb"},{text:"HSL",value:"hsl"},{text:"HSV",value:"hsv"},{text:"HEX",value:"hex"}];return t.appendChild(e.reduce((i,r)=>{const s=n.createElement("option");return s.textContent=r.text,s.value=r.value,i.appendChild(s),i},n.createDocumentFragment())),t}class xy{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(ir()),e.viewProps.bindClassModifiers(this.element);const i=t.createElement("div");i.classList.add(ir("m")),this.modeElem_=gy(t),this.modeElem_.classList.add(ir("ms")),i.appendChild(this.modeSelectElement),e.viewProps.bindDisabled(this.modeElem_);const r=t.createElement("div");r.classList.add(ir("mm")),r.appendChild(So(t,"dropdown")),i.appendChild(r),this.element.appendChild(i);const s=t.createElement("div");s.classList.add(ir("w")),this.element.appendChild(s),this.inputsElem_=s,this.inputViews_=e.inputViews,this.applyInputViews_(),Ln(e.mode,o=>{this.modeElem_.value=o})}get modeSelectElement(){return this.modeElem_}get inputViews(){return this.inputViews_}set inputViews(t){this.inputViews_=t,this.applyInputViews_()}applyInputViews_(){cd(this.inputsElem_);const t=this.element.ownerDocument;this.inputViews_.forEach(e=>{const i=t.createElement("div");i.classList.add(ir("c")),i.appendChild(e.element),this.inputsElem_.appendChild(i)})}}function by(n){return Xe(n==="float"?2:0)}function wy(n,t,e){const i=gr(n,t)[e];return new rs({min:0,max:i})}function yy(n,t,e){return new us(n,{arrayPosition:e===0?"fst":e===2?"lst":"mid",parser:t.parser,props:Ht.fromObject({formatter:by(t.colorType),keyScale:Ri(!1),pointerScale:t.colorType==="float"?.01:1}),value:le(0,{constraint:wy(t.colorMode,t.colorType,e)}),viewProps:t.viewProps})}function Ey(n,t){const e={colorMode:t.colorMode,colorType:t.colorType,parser:In,viewProps:t.viewProps};return[0,1,2].map(i=>{const r=yy(n,e,i);return Mr({primary:t.value,secondary:r.value,forward(s){return ke(s,t.colorType).getComponents(t.colorMode)[i]},backward(s,o){const a=t.colorMode,c=ke(s,t.colorType).getComponents(a);c[i]=o;const u=xl(Co(gn(c),c[3]),a,t.colorType);return ke(u,"int")}}),r})}function My(n,t){const e=new Qr(n,{parser:ds("int"),props:Ht.fromObject({formatter:bl}),value:le(Kt.black()),viewProps:t.viewProps});return Mr({primary:t.value,secondary:e.value,forward:i=>new Kt(gn(i.getComponents()),i.mode),backward:(i,r)=>new Kt(Co(gn(r.getComponents(i.mode)),i.getComponents()[3]),i.mode)}),[e]}function Sy(n){return n!=="hex"}class Ty{constructor(t,e){this.onModeSelectChange_=this.onModeSelectChange_.bind(this),this.colorType_=e.colorType,this.value=e.value,this.viewProps=e.viewProps,this.colorMode=le(this.value.rawValue.mode),this.ccs_=this.createComponentControllers_(t),this.view=new xy(t,{mode:this.colorMode,inputViews:[this.ccs_[0].view,this.ccs_[1].view,this.ccs_[2].view],viewProps:this.viewProps}),this.view.modeSelectElement.addEventListener("change",this.onModeSelectChange_)}createComponentControllers_(t){const e=this.colorMode.rawValue;return Sy(e)?Ey(t,{colorMode:e,colorType:this.colorType_,value:this.value,viewProps:this.viewProps}):My(t,{value:this.value,viewProps:this.viewProps})}onModeSelectChange_(t){const e=t.currentTarget;this.colorMode.rawValue=e.value,this.ccs_=this.createComponentControllers_(this.view.element.ownerDocument),this.view.inputViews=this.ccs_.map(i=>i.view)}}const wa=qt("hpl");class Cy{constructor(t,e){this.onValueChange_=this.onValueChange_.bind(this),this.value=e.value,this.value.emitter.on("change",this.onValueChange_),this.element=t.createElement("div"),this.element.classList.add(wa()),e.viewProps.bindClassModifiers(this.element),e.viewProps.bindTabIndex(this.element);const i=t.createElement("div");i.classList.add(wa("c")),this.element.appendChild(i);const r=t.createElement("div");r.classList.add(wa("m")),this.element.appendChild(r),this.markerElem_=r,this.update_()}update_(){const t=this.value.rawValue,[e]=t.getComponents("hsv");this.markerElem_.style.backgroundColor=Vd(new Kt([e,100,100],"hsv"));const i=$t(e,0,360,0,100);this.markerElem_.style.left=`${i}%`}onValueChange_(){this.update_()}}class Ay{constructor(t,e){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.view=new Cy(t,{value:this.value,viewProps:this.viewProps}),this.ptHandler_=new Ui(this.view.element),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.element.addEventListener("keydown",this.onKeyDown_),this.view.element.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(t,e){if(!t.point)return;const i=$t(we(t.point.x,0,t.bounds.width),0,t.bounds.width,0,360),r=this.value.rawValue,[,s,o,a]=r.getComponents("hsv");this.value.setRawValue(new Kt([i,s,o,a],"hsv"),e)}onPointerDown_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerMove_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerUp_(t){this.handlePointerEvent_(t.data,{forceEmit:!0,last:!0})}onKeyDown_(t){const e=Ge(Ri(!1),Un(t));if(e===0)return;const i=this.value.rawValue,[r,s,o,a]=i.getComponents("hsv");this.value.setRawValue(new Kt([r+e,s,o,a],"hsv"),{forceEmit:!1,last:!1})}onKeyUp_(t){Ge(Ri(!1),Un(t))!==0&&this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}const ya=qt("svp"),Vu=64;class Py{constructor(t,e){this.onValueChange_=this.onValueChange_.bind(this),this.value=e.value,this.value.emitter.on("change",this.onValueChange_),this.element=t.createElement("div"),this.element.classList.add(ya()),e.viewProps.bindClassModifiers(this.element),e.viewProps.bindTabIndex(this.element);const i=t.createElement("canvas");i.height=Vu,i.width=Vu,i.classList.add(ya("c")),this.element.appendChild(i),this.canvasElement=i;const r=t.createElement("div");r.classList.add(ya("m")),this.element.appendChild(r),this.markerElem_=r,this.update_()}update_(){const t=Rb(this.canvasElement);if(!t)return;const i=this.value.rawValue.getComponents("hsv"),r=this.canvasElement.width,s=this.canvasElement.height,o=t.getImageData(0,0,r,s),a=o.data;for(let u=0;u<s;u++)for(let h=0;h<r;h++){const d=$t(h,0,r,0,100),m=$t(u,0,s,100,0),v=Td(i[0],d,m),x=(u*r+h)*4;a[x]=v[0],a[x+1]=v[1],a[x+2]=v[2],a[x+3]=255}t.putImageData(o,0,0);const l=$t(i[1],0,100,0,100);this.markerElem_.style.left=`${l}%`;const c=$t(i[2],0,100,100,0);this.markerElem_.style.top=`${c}%`}onValueChange_(){this.update_()}}class Ry{constructor(t,e){this.onKeyDown_=this.onKeyDown_.bind(this),this.onKeyUp_=this.onKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.view=new Py(t,{value:this.value,viewProps:this.viewProps}),this.ptHandler_=new Ui(this.view.element),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.element.addEventListener("keydown",this.onKeyDown_),this.view.element.addEventListener("keyup",this.onKeyUp_)}handlePointerEvent_(t,e){if(!t.point)return;const i=$t(t.point.x,0,t.bounds.width,0,100),r=$t(t.point.y,0,t.bounds.height,100,0),[s,,,o]=this.value.rawValue.getComponents("hsv");this.value.setRawValue(new Kt([s,i,r,o],"hsv"),e)}onPointerDown_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerMove_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerUp_(t){this.handlePointerEvent_(t.data,{forceEmit:!0,last:!0})}onKeyDown_(t){yd(t.key)&&t.preventDefault();const[e,i,r,s]=this.value.rawValue.getComponents("hsv"),o=Ri(!1),a=Ge(o,Un(t)),l=Ge(o,ts(t));a===0&&l===0||this.value.setRawValue(new Kt([e,i+a,r+l,s],"hsv"),{forceEmit:!1,last:!1})}onKeyUp_(t){const e=Ri(!1),i=Ge(e,Un(t)),r=Ge(e,ts(t));i===0&&r===0||this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}class Ly{constructor(t,e){this.value=e.value,this.viewProps=e.viewProps,this.hPaletteC_=new Ay(t,{value:this.value,viewProps:this.viewProps}),this.svPaletteC_=new Ry(t,{value:this.value,viewProps:this.viewProps}),this.alphaIcs_=e.supportsAlpha?{palette:new _y(t,{value:this.value,viewProps:this.viewProps}),text:new us(t,{parser:In,props:Ht.fromObject({pointerScale:.01,keyScale:.1,formatter:Xe(2)}),value:le(0,{constraint:new rs({min:0,max:1})}),viewProps:this.viewProps})}:null,this.alphaIcs_&&Mr({primary:this.value,secondary:this.alphaIcs_.text.value,forward:i=>i.getComponents()[3],backward:(i,r)=>{const s=i.getComponents();return s[3]=r,new Kt(s,i.mode)}}),this.textsC_=new Ty(t,{colorType:e.colorType,value:this.value,viewProps:this.viewProps}),this.view=new qw(t,{alphaViews:this.alphaIcs_?{palette:this.alphaIcs_.palette.view,text:this.alphaIcs_.text.view}:null,hPaletteView:this.hPaletteC_.view,supportsAlpha:e.supportsAlpha,svPaletteView:this.svPaletteC_.view,textsView:this.textsC_.view,viewProps:this.viewProps})}get textsController(){return this.textsC_}}const Ea=qt("colsw");class Dy{constructor(t,e){this.onValueChange_=this.onValueChange_.bind(this),e.value.emitter.on("change",this.onValueChange_),this.value=e.value,this.element=t.createElement("div"),this.element.classList.add(Ea()),e.viewProps.bindClassModifiers(this.element);const i=t.createElement("div");i.classList.add(Ea("sw")),this.element.appendChild(i),this.swatchElem_=i;const r=t.createElement("button");r.classList.add(Ea("b")),e.viewProps.bindDisabled(r),this.element.appendChild(r),this.buttonElement=r,this.update_()}update_(){const t=this.value.rawValue;this.swatchElem_.style.backgroundColor=wl(t)}onValueChange_(){this.update_()}}class Iy{constructor(t,e){this.value=e.value,this.viewProps=e.viewProps,this.view=new Dy(t,{value:this.value,viewProps:this.viewProps})}}class yl{constructor(t,e){this.onButtonBlur_=this.onButtonBlur_.bind(this),this.onButtonClick_=this.onButtonClick_.bind(this),this.onPopupChildBlur_=this.onPopupChildBlur_.bind(this),this.onPopupChildKeydown_=this.onPopupChildKeydown_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.foldable_=os.create(e.expanded),this.swatchC_=new Iy(t,{value:this.value,viewProps:this.viewProps});const i=this.swatchC_.view.buttonElement;i.addEventListener("blur",this.onButtonBlur_),i.addEventListener("click",this.onButtonClick_),this.textC_=new Qr(t,{parser:e.parser,props:Ht.fromObject({formatter:e.formatter}),value:this.value,viewProps:this.viewProps}),this.view=new Bw(t,{foldable:this.foldable_,pickerLayout:e.pickerLayout}),this.view.swatchElement.appendChild(this.swatchC_.view.element),this.view.textElement.appendChild(this.textC_.view.element),this.popC_=e.pickerLayout==="popup"?new xd(t,{viewProps:this.viewProps}):null;const r=new Ly(t,{colorType:e.colorType,supportsAlpha:e.supportsAlpha,value:this.value,viewProps:this.viewProps});r.view.allFocusableElements.forEach(s=>{s.addEventListener("blur",this.onPopupChildBlur_),s.addEventListener("keydown",this.onPopupChildKeydown_)}),this.pickerC_=r,this.popC_?(this.view.element.appendChild(this.popC_.view.element),this.popC_.view.element.appendChild(r.view.element),Mr({primary:this.foldable_.value("expanded"),secondary:this.popC_.shows,forward:s=>s,backward:(s,o)=>o})):this.view.pickerElement&&(this.view.pickerElement.appendChild(this.pickerC_.view.element),pl(this.foldable_,this.view.pickerElement))}get textController(){return this.textC_}onButtonBlur_(t){if(!this.popC_)return;const e=this.view.element,i=t.relatedTarget;(!i||!e.contains(i))&&(this.popC_.shows.rawValue=!1)}onButtonClick_(){this.foldable_.set("expanded",!this.foldable_.get("expanded")),this.foldable_.get("expanded")&&this.pickerC_.view.allFocusableElements[0].focus()}onPopupChildBlur_(t){if(!this.popC_)return;const e=this.popC_.view.element,i=ud(t);i&&e.contains(i)||i&&i===this.swatchC_.view.buttonElement&&!al(e.ownerDocument)||(this.popC_.shows.rawValue=!1)}onPopupChildKeydown_(t){this.popC_?t.key==="Escape"&&(this.popC_.shows.rawValue=!1):this.view.pickerElement&&t.key==="Escape"&&this.swatchC_.view.buttonElement.focus()}}function Uy(n){return gn(n.getComponents("rgb")).reduce((t,e)=>t<<8|Math.floor(e)&255,0)}function Ny(n){return n.getComponents("rgb").reduce((t,e,i)=>{const r=Math.floor(i===3?e*255:e)&255;return t<<8|r},0)>>>0}function Oy(n){return new Kt([n>>16&255,n>>8&255,n&255],"rgb")}function Fy(n){return new Kt([n>>24&255,n>>16&255,n>>8&255,$t(n&255,0,255,0,1)],"rgb")}function By(n){return typeof n!="number"?Kt.black():Oy(n)}function ky(n){return typeof n!="number"?Kt.black():Fy(n)}function to(n,t){return typeof n!="object"||ee(n)?!1:t in n&&typeof n[t]=="number"}function Wd(n){return to(n,"r")&&to(n,"g")&&to(n,"b")}function Xd(n){return Wd(n)&&to(n,"a")}function qd(n){return Wd(n)}function El(n,t){if(n.mode!==t.mode||n.type!==t.type)return!1;const e=n.getComponents(),i=t.getComponents();for(let r=0;r<e.length;r++)if(e[r]!==i[r])return!1;return!0}function zu(n){return"a"in n?[n.r,n.g,n.b,n.a]:[n.r,n.g,n.b]}function Vy(n){const t=Gd(n);return t?(e,i)=>{hs(e,t(i))}:null}function zy(n){const t=n?Ny:Uy;return(e,i)=>{hs(e,t(i))}}function Hy(n,t,e){const r=ke(t,e).toRgbaObject();n.writeProperty("r",r.r),n.writeProperty("g",r.g),n.writeProperty("b",r.b),n.writeProperty("a",r.a)}function Gy(n,t,e){const r=ke(t,e).toRgbaObject();n.writeProperty("r",r.r),n.writeProperty("g",r.g),n.writeProperty("b",r.b)}function Wy(n,t){return(e,i)=>{n?Hy(e,i,t):Gy(e,i,t)}}function Xy(n){var t;return!!(!((t=n==null?void 0:n.color)===null||t===void 0)&&t.alpha)}function qy(n){return n?t=>wl(t,"0x"):t=>bl(t,"0x")}function Yy(n){return"color"in n||n.view==="color"}const jy=Ve({id:"input-color-number",type:"input",accept:(n,t)=>{if(typeof n!="number"||!Yy(t))return null;const e=_l(t);return e?{initialValue:n,params:Object.assign(Object.assign({},e),{supportsAlpha:Xy(t)})}:null},binding:{reader:n=>n.params.supportsAlpha?ky:By,equals:El,writer:n=>zy(n.params.supportsAlpha)},controller:n=>{var t,e;return new yl(n.document,{colorType:"int",expanded:(t=n.params.expanded)!==null&&t!==void 0?t:!1,formatter:qy(n.params.supportsAlpha),parser:ds("int"),pickerLayout:(e=n.params.picker)!==null&&e!==void 0?e:"popup",supportsAlpha:n.params.supportsAlpha,value:n.value,viewProps:n.viewProps})}});function Ky(n,t){if(!qd(n))return ke(Kt.black(),t);if(t==="int"){const e=zu(n);return new Kt(e,"rgb")}if(t==="float"){const e=zu(n);return new gl(e,"rgb")}return ke(Kt.black(),"int")}function $y(n){return Xd(n)}function Zy(n){return t=>{const e=Ky(t,n);return ke(e,"int")}}function Jy(n,t){return e=>n?Hd(e,t):zd(e,t)}const Qy=Ve({id:"input-color-object",type:"input",accept:(n,t)=>{var e;if(!qd(n))return null;const i=_l(t);return i?{initialValue:n,params:Object.assign(Object.assign({},i),{colorType:(e=Pd(t))!==null&&e!==void 0?e:"int"})}:null},binding:{reader:n=>Zy(n.params.colorType),equals:El,writer:n=>Wy($y(n.initialValue),n.params.colorType)},controller:n=>{var t,e;const i=Xd(n.initialValue);return new yl(n.document,{colorType:n.params.colorType,expanded:(t=n.params.expanded)!==null&&t!==void 0?t:!1,formatter:Jy(i,n.params.colorType),parser:ds("int"),pickerLayout:(e=n.params.picker)!==null&&e!==void 0?e:"popup",supportsAlpha:i,value:n.value,viewProps:n.viewProps})}}),tE=Ve({id:"input-color-string",type:"input",accept:(n,t)=>{if(typeof n!="string"||t.view==="text")return null;const e=cy(n,Pd(t));if(!e)return null;const i=Gd(e);if(!i)return null;const r=_l(t);return r?{initialValue:n,params:Object.assign(Object.assign({},r),{format:e,stringifier:i})}:null},binding:{reader:()=>uy,equals:El,writer:n=>{const t=Vy(n.params.format);if(!t)throw fe.notBindable();return t}},controller:n=>{var t,e;return new yl(n.document,{colorType:n.params.format.type,expanded:(t=n.params.expanded)!==null&&t!==void 0?t:!1,formatter:n.params.stringifier,parser:ds("int"),pickerLayout:(e=n.params.picker)!==null&&e!==void 0?e:"popup",supportsAlpha:n.params.format.alpha,value:n.value,viewProps:n.viewProps})}});class Ml{constructor(t){this.components=t.components,this.asm_=t.assembly}constrain(t){const e=this.asm_.toComponents(t).map((i,r)=>{var s,o;return(o=(s=this.components[r])===null||s===void 0?void 0:s.constrain(i))!==null&&o!==void 0?o:i});return this.asm_.fromComponents(e)}}const Hu=qt("pndtxt");class eE{constructor(t,e){this.textViews=e.textViews,this.element=t.createElement("div"),this.element.classList.add(Hu()),this.textViews.forEach(i=>{const r=t.createElement("div");r.classList.add(Hu("a")),r.appendChild(i.element),this.element.appendChild(r)})}}function nE(n,t,e){return new us(n,{arrayPosition:e===0?"fst":e===t.axes.length-1?"lst":"mid",parser:t.parser,props:t.axes[e].textProps,value:le(0,{constraint:t.axes[e].constraint}),viewProps:t.viewProps})}class Sl{constructor(t,e){this.value=e.value,this.viewProps=e.viewProps,this.acs_=e.axes.map((i,r)=>nE(t,e,r)),this.acs_.forEach((i,r)=>{Mr({primary:this.value,secondary:i.value,forward:s=>e.assembly.toComponents(s)[r],backward:(s,o)=>{const a=e.assembly.toComponents(s);return a[r]=o,e.assembly.fromComponents(a)}})}),this.view=new eE(t,{textViews:this.acs_.map(i=>i.view)})}get textControllers(){return this.acs_}}class iE extends Jr{get max(){return this.controller.valueController.sliderController.props.get("max")}set max(t){this.controller.valueController.sliderController.props.set("max",t)}get min(){return this.controller.valueController.sliderController.props.get("min")}set min(t){this.controller.valueController.sliderController.props.set("min",t)}}function rE(n,t){const e=[],i=id(n,t);i&&e.push(i);const r=rd(n);r&&e.push(r);const s=vl(n.options);return s&&e.push(s),new as(e)}const sE=Ve({id:"input-number",type:"input",accept:(n,t)=>{if(typeof n!="number")return null;const e=he(t,i=>Object.assign(Object.assign({},od(i)),{options:i.optional.custom(cs),readonly:i.optional.constant(!1)}));return e?{initialValue:n,params:e}:null},binding:{reader:n=>Qh,constraint:n=>rE(n.params,n.initialValue),writer:n=>hs},controller:n=>{const t=n.value,e=n.constraint,i=e&&mo(e,ls);if(i)return new ri(n.document,{props:new Ht({options:i.values.value("options")}),value:t,viewProps:n.viewProps});const r=sd(n.params,t.rawValue),s=e&&mo(e,rs);return s?new _o(n.document,Object.assign(Object.assign({},Ed(Object.assign(Object.assign({},r),{keyScale:le(r.keyScale),max:s.values.value("max"),min:s.values.value("min")}))),{parser:In,value:t,viewProps:n.viewProps})):new us(n.document,{parser:In,props:Ht.fromObject(r),value:t,viewProps:n.viewProps})},api(n){return typeof n.controller.value.rawValue!="number"?null:n.controller.valueController instanceof _o?new iE(n.controller):n.controller.valueController instanceof ri?new fl(n.controller):null}});class ti{constructor(t=0,e=0){this.x=t,this.y=e}getComponents(){return[this.x,this.y]}static isObject(t){if(ee(t))return!1;const e=t.x,i=t.y;return!(typeof e!="number"||typeof i!="number")}static equals(t,e){return t.x===e.x&&t.y===e.y}toObject(){return{x:this.x,y:this.y}}}const Yd={toComponents:n=>n.getComponents(),fromComponents:n=>new ti(...n)},rr=qt("p2d");class oE{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(rr()),e.viewProps.bindClassModifiers(this.element),Ln(e.expanded,wr(this.element,rr(void 0,"expanded")));const i=t.createElement("div");i.classList.add(rr("h")),this.element.appendChild(i);const r=t.createElement("button");r.classList.add(rr("b")),r.appendChild(So(t,"p2dpad")),e.viewProps.bindDisabled(r),i.appendChild(r),this.buttonElement=r;const s=t.createElement("div");if(s.classList.add(rr("t")),i.appendChild(s),this.textElement=s,e.pickerLayout==="inline"){const o=t.createElement("div");o.classList.add(rr("p")),this.element.appendChild(o),this.pickerElement=o}else this.pickerElement=null}}const Gn=qt("p2dp");class aE{constructor(t,e){this.onFoldableChange_=this.onFoldableChange_.bind(this),this.onPropsChange_=this.onPropsChange_.bind(this),this.onValueChange_=this.onValueChange_.bind(this),this.props_=e.props,this.props_.emitter.on("change",this.onPropsChange_),this.element=t.createElement("div"),this.element.classList.add(Gn()),e.layout==="popup"&&this.element.classList.add(Gn(void 0,"p")),e.viewProps.bindClassModifiers(this.element);const i=t.createElement("div");i.classList.add(Gn("p")),e.viewProps.bindTabIndex(i),this.element.appendChild(i),this.padElement=i;const r=t.createElementNS(mn,"svg");r.classList.add(Gn("g")),this.padElement.appendChild(r),this.svgElem_=r;const s=t.createElementNS(mn,"line");s.classList.add(Gn("ax")),s.setAttributeNS(null,"x1","0"),s.setAttributeNS(null,"y1","50%"),s.setAttributeNS(null,"x2","100%"),s.setAttributeNS(null,"y2","50%"),this.svgElem_.appendChild(s);const o=t.createElementNS(mn,"line");o.classList.add(Gn("ax")),o.setAttributeNS(null,"x1","50%"),o.setAttributeNS(null,"y1","0"),o.setAttributeNS(null,"x2","50%"),o.setAttributeNS(null,"y2","100%"),this.svgElem_.appendChild(o);const a=t.createElementNS(mn,"line");a.classList.add(Gn("l")),a.setAttributeNS(null,"x1","50%"),a.setAttributeNS(null,"y1","50%"),this.svgElem_.appendChild(a),this.lineElem_=a;const l=t.createElement("div");l.classList.add(Gn("m")),this.padElement.appendChild(l),this.markerElem_=l,e.value.emitter.on("change",this.onValueChange_),this.value=e.value,this.update_()}get allFocusableElements(){return[this.padElement]}update_(){const[t,e]=this.value.rawValue.getComponents(),i=this.props_.get("max"),r=$t(t,-i,+i,0,100),s=$t(e,-i,+i,0,100),o=this.props_.get("invertsY")?100-s:s;this.lineElem_.setAttributeNS(null,"x2",`${r}%`),this.lineElem_.setAttributeNS(null,"y2",`${o}%`),this.markerElem_.style.left=`${r}%`,this.markerElem_.style.top=`${o}%`}onValueChange_(){this.update_()}onPropsChange_(){this.update_()}onFoldableChange_(){this.update_()}}function Gu(n,t,e){return[Ge(t[0],Un(n)),Ge(t[1],ts(n))*(e?1:-1)]}class lE{constructor(t,e){this.onPadKeyDown_=this.onPadKeyDown_.bind(this),this.onPadKeyUp_=this.onPadKeyUp_.bind(this),this.onPointerDown_=this.onPointerDown_.bind(this),this.onPointerMove_=this.onPointerMove_.bind(this),this.onPointerUp_=this.onPointerUp_.bind(this),this.props=e.props,this.value=e.value,this.viewProps=e.viewProps,this.view=new aE(t,{layout:e.layout,props:this.props,value:this.value,viewProps:this.viewProps}),this.ptHandler_=new Ui(this.view.padElement),this.ptHandler_.emitter.on("down",this.onPointerDown_),this.ptHandler_.emitter.on("move",this.onPointerMove_),this.ptHandler_.emitter.on("up",this.onPointerUp_),this.view.padElement.addEventListener("keydown",this.onPadKeyDown_),this.view.padElement.addEventListener("keyup",this.onPadKeyUp_)}handlePointerEvent_(t,e){if(!t.point)return;const i=this.props.get("max"),r=$t(t.point.x,0,t.bounds.width,-i,+i),s=$t(this.props.get("invertsY")?t.bounds.height-t.point.y:t.point.y,0,t.bounds.height,-i,+i);this.value.setRawValue(new ti(r,s),e)}onPointerDown_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerMove_(t){this.handlePointerEvent_(t.data,{forceEmit:!1,last:!1})}onPointerUp_(t){this.handlePointerEvent_(t.data,{forceEmit:!0,last:!0})}onPadKeyDown_(t){yd(t.key)&&t.preventDefault();const[e,i]=Gu(t,[this.props.get("xKeyScale"),this.props.get("yKeyScale")],this.props.get("invertsY"));e===0&&i===0||this.value.setRawValue(new ti(this.value.rawValue.x+e,this.value.rawValue.y+i),{forceEmit:!1,last:!1})}onPadKeyUp_(t){const[e,i]=Gu(t,[this.props.get("xKeyScale"),this.props.get("yKeyScale")],this.props.get("invertsY"));e===0&&i===0||this.value.setRawValue(this.value.rawValue,{forceEmit:!0,last:!0})}}class cE{constructor(t,e){var i,r;this.onPopupChildBlur_=this.onPopupChildBlur_.bind(this),this.onPopupChildKeydown_=this.onPopupChildKeydown_.bind(this),this.onPadButtonBlur_=this.onPadButtonBlur_.bind(this),this.onPadButtonClick_=this.onPadButtonClick_.bind(this),this.value=e.value,this.viewProps=e.viewProps,this.foldable_=os.create(e.expanded),this.popC_=e.pickerLayout==="popup"?new xd(t,{viewProps:this.viewProps}):null;const s=new lE(t,{layout:e.pickerLayout,props:new Ht({invertsY:le(e.invertsY),max:le(e.max),xKeyScale:e.axes[0].textProps.value("keyScale"),yKeyScale:e.axes[1].textProps.value("keyScale")}),value:this.value,viewProps:this.viewProps});s.view.allFocusableElements.forEach(o=>{o.addEventListener("blur",this.onPopupChildBlur_),o.addEventListener("keydown",this.onPopupChildKeydown_)}),this.pickerC_=s,this.textC_=new Sl(t,{assembly:Yd,axes:e.axes,parser:e.parser,value:this.value,viewProps:this.viewProps}),this.view=new oE(t,{expanded:this.foldable_.value("expanded"),pickerLayout:e.pickerLayout,viewProps:this.viewProps}),this.view.textElement.appendChild(this.textC_.view.element),(i=this.view.buttonElement)===null||i===void 0||i.addEventListener("blur",this.onPadButtonBlur_),(r=this.view.buttonElement)===null||r===void 0||r.addEventListener("click",this.onPadButtonClick_),this.popC_?(this.view.element.appendChild(this.popC_.view.element),this.popC_.view.element.appendChild(this.pickerC_.view.element),Mr({primary:this.foldable_.value("expanded"),secondary:this.popC_.shows,forward:o=>o,backward:(o,a)=>a})):this.view.pickerElement&&(this.view.pickerElement.appendChild(this.pickerC_.view.element),pl(this.foldable_,this.view.pickerElement))}get textController(){return this.textC_}onPadButtonBlur_(t){if(!this.popC_)return;const e=this.view.element,i=t.relatedTarget;(!i||!e.contains(i))&&(this.popC_.shows.rawValue=!1)}onPadButtonClick_(){this.foldable_.set("expanded",!this.foldable_.get("expanded")),this.foldable_.get("expanded")&&this.pickerC_.view.allFocusableElements[0].focus()}onPopupChildBlur_(t){if(!this.popC_)return;const e=this.popC_.view.element,i=ud(t);i&&e.contains(i)||i&&i===this.view.buttonElement&&!al(e.ownerDocument)||(this.popC_.shows.rawValue=!1)}onPopupChildKeydown_(t){this.popC_?t.key==="Escape"&&(this.popC_.shows.rawValue=!1):this.view.pickerElement&&t.key==="Escape"&&this.view.buttonElement.focus()}}function uE(n){return ti.isObject(n)?new ti(n.x,n.y):new ti}function hE(n,t){n.writeProperty("x",t.x),n.writeProperty("y",t.y)}function dE(n,t){return new Ml({assembly:Yd,components:[Rn(Object.assign(Object.assign({},n),n.x),t.x),Rn(Object.assign(Object.assign({},n),n.y),t.y)]})}function Wu(n,t){var e,i;if(!ee(n.min)||!ee(n.max))return Math.max(Math.abs((e=n.min)!==null&&e!==void 0?e:0),Math.abs((i=n.max)!==null&&i!==void 0?i:0));const r=ed(n);return Math.max(Math.abs(r)*10,Math.abs(t)*10)}function pE(n,t){var e,i;const r=Wu(Ai(n,(e=n.x)!==null&&e!==void 0?e:{}),t.x),s=Wu(Ai(n,(i=n.y)!==null&&i!==void 0?i:{}),t.y);return Math.max(r,s)}function fE(n){if(!("y"in n))return!1;const t=n.y;return t&&"inverted"in t?!!t.inverted:!1}const mE=Ve({id:"input-point2d",type:"input",accept:(n,t)=>{if(!ti.isObject(n))return null;const e=he(t,i=>Object.assign(Object.assign({},es(i)),{expanded:i.optional.boolean,picker:i.optional.custom(Sd),readonly:i.optional.constant(!1),x:i.optional.custom(Kn),y:i.optional.object(Object.assign(Object.assign({},es(i)),{inverted:i.optional.boolean}))}));return e?{initialValue:n,params:e}:null},binding:{reader:()=>uE,constraint:n=>dE(n.params,n.initialValue),equals:ti.equals,writer:()=>hE},controller:n=>{var t,e;const i=n.document,r=n.value,s=n.constraint,o=[n.params.x,n.params.y];return new cE(i,{axes:r.rawValue.getComponents().map((a,l)=>{var c;return ol({constraint:s.components[l],initialValue:a,params:Ai(n.params,(c=o[l])!==null&&c!==void 0?c:{})})}),expanded:(t=n.params.expanded)!==null&&t!==void 0?t:!1,invertsY:fE(n.params),max:pE(n.params,r.rawValue),parser:In,pickerLayout:(e=n.params.picker)!==null&&e!==void 0?e:"popup",value:r,viewProps:n.viewProps})}});class dr{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}getComponents(){return[this.x,this.y,this.z]}static isObject(t){if(ee(t))return!1;const e=t.x,i=t.y,r=t.z;return!(typeof e!="number"||typeof i!="number"||typeof r!="number")}static equals(t,e){return t.x===e.x&&t.y===e.y&&t.z===e.z}toObject(){return{x:this.x,y:this.y,z:this.z}}}const jd={toComponents:n=>n.getComponents(),fromComponents:n=>new dr(...n)};function vE(n){return dr.isObject(n)?new dr(n.x,n.y,n.z):new dr}function _E(n,t){n.writeProperty("x",t.x),n.writeProperty("y",t.y),n.writeProperty("z",t.z)}function gE(n,t){return new Ml({assembly:jd,components:[Rn(Object.assign(Object.assign({},n),n.x),t.x),Rn(Object.assign(Object.assign({},n),n.y),t.y),Rn(Object.assign(Object.assign({},n),n.z),t.z)]})}const xE=Ve({id:"input-point3d",type:"input",accept:(n,t)=>{if(!dr.isObject(n))return null;const e=he(t,i=>Object.assign(Object.assign({},es(i)),{readonly:i.optional.constant(!1),x:i.optional.custom(Kn),y:i.optional.custom(Kn),z:i.optional.custom(Kn)}));return e?{initialValue:n,params:e}:null},binding:{reader:n=>vE,constraint:n=>gE(n.params,n.initialValue),equals:dr.equals,writer:n=>_E},controller:n=>{const t=n.value,e=n.constraint,i=[n.params.x,n.params.y,n.params.z];return new Sl(n.document,{assembly:jd,axes:t.rawValue.getComponents().map((r,s)=>{var o;return ol({constraint:e.components[s],initialValue:r,params:Ai(n.params,(o=i[s])!==null&&o!==void 0?o:{})})}),parser:In,value:t,viewProps:n.viewProps})}});class pr{constructor(t=0,e=0,i=0,r=0){this.x=t,this.y=e,this.z=i,this.w=r}getComponents(){return[this.x,this.y,this.z,this.w]}static isObject(t){if(ee(t))return!1;const e=t.x,i=t.y,r=t.z,s=t.w;return!(typeof e!="number"||typeof i!="number"||typeof r!="number"||typeof s!="number")}static equals(t,e){return t.x===e.x&&t.y===e.y&&t.z===e.z&&t.w===e.w}toObject(){return{x:this.x,y:this.y,z:this.z,w:this.w}}}const Kd={toComponents:n=>n.getComponents(),fromComponents:n=>new pr(...n)};function bE(n){return pr.isObject(n)?new pr(n.x,n.y,n.z,n.w):new pr}function wE(n,t){n.writeProperty("x",t.x),n.writeProperty("y",t.y),n.writeProperty("z",t.z),n.writeProperty("w",t.w)}function yE(n,t){return new Ml({assembly:Kd,components:[Rn(Object.assign(Object.assign({},n),n.x),t.x),Rn(Object.assign(Object.assign({},n),n.y),t.y),Rn(Object.assign(Object.assign({},n),n.z),t.z),Rn(Object.assign(Object.assign({},n),n.w),t.w)]})}const EE=Ve({id:"input-point4d",type:"input",accept:(n,t)=>{if(!pr.isObject(n))return null;const e=he(t,i=>Object.assign(Object.assign({},es(i)),{readonly:i.optional.constant(!1),w:i.optional.custom(Kn),x:i.optional.custom(Kn),y:i.optional.custom(Kn),z:i.optional.custom(Kn)}));return e?{initialValue:n,params:e}:null},binding:{reader:n=>bE,constraint:n=>yE(n.params,n.initialValue),equals:pr.equals,writer:n=>wE},controller:n=>{const t=n.value,e=n.constraint,i=[n.params.x,n.params.y,n.params.z,n.params.w];return new Sl(n.document,{assembly:Kd,axes:t.rawValue.getComponents().map((r,s)=>{var o;return ol({constraint:e.components[s],initialValue:r,params:Ai(n.params,(o=i[s])!==null&&o!==void 0?o:{})})}),parser:In,value:t,viewProps:n.viewProps})}});function ME(n){const t=[],e=vl(n.options);return e&&t.push(e),new as(t)}const SE=Ve({id:"input-string",type:"input",accept:(n,t)=>{if(typeof n!="string")return null;const e=he(t,i=>({readonly:i.optional.constant(!1),options:i.optional.custom(cs)}));return e?{initialValue:n,params:e}:null},binding:{reader:n=>wd,constraint:n=>ME(n.params),writer:n=>hs},controller:n=>{const t=n.document,e=n.value,i=n.constraint,r=i&&mo(i,ls);return r?new ri(t,{props:new Ht({options:r.values.value("options")}),value:e,viewProps:n.viewProps}):new Qr(t,{parser:s=>s,props:Ht.fromObject({formatter:Ga}),value:e,viewProps:n.viewProps})},api(n){return typeof n.controller.value.rawValue!="string"?null:n.controller.valueController instanceof ri?new fl(n.controller):null}}),ps={monitor:{defaultInterval:200,defaultRows:3}},Xu=qt("mll");class TE{constructor(t,e){this.onValueUpdate_=this.onValueUpdate_.bind(this),this.formatter_=e.formatter,this.element=t.createElement("div"),this.element.classList.add(Xu()),e.viewProps.bindClassModifiers(this.element);const i=t.createElement("textarea");i.classList.add(Xu("i")),i.style.height=`calc(var(${Md("containerUnitSize")}) * ${e.rows})`,i.readOnly=!0,e.viewProps.bindDisabled(i),this.element.appendChild(i),this.textareaElem_=i,e.value.emitter.on("change",this.onValueUpdate_),this.value=e.value,this.update_()}update_(){const t=this.textareaElem_,e=t.scrollTop===t.scrollHeight-t.clientHeight,i=[];this.value.rawValue.forEach(r=>{r!==void 0&&i.push(this.formatter_(r))}),t.textContent=i.join(`
`),e&&(t.scrollTop=t.scrollHeight)}onValueUpdate_(){this.update_()}}class Tl{constructor(t,e){this.value=e.value,this.viewProps=e.viewProps,this.view=new TE(t,{formatter:e.formatter,rows:e.rows,value:this.value,viewProps:this.viewProps})}}const qu=qt("sgl");class CE{constructor(t,e){this.onValueUpdate_=this.onValueUpdate_.bind(this),this.formatter_=e.formatter,this.element=t.createElement("div"),this.element.classList.add(qu()),e.viewProps.bindClassModifiers(this.element);const i=t.createElement("input");i.classList.add(qu("i")),i.readOnly=!0,i.type="text",e.viewProps.bindDisabled(i),this.element.appendChild(i),this.inputElement=i,e.value.emitter.on("change",this.onValueUpdate_),this.value=e.value,this.update_()}update_(){const t=this.value.rawValue,e=t[t.length-1];this.inputElement.value=e!==void 0?this.formatter_(e):""}onValueUpdate_(){this.update_()}}class Cl{constructor(t,e){this.value=e.value,this.viewProps=e.viewProps,this.view=new CE(t,{formatter:e.formatter,value:this.value,viewProps:this.viewProps})}}const AE=Ve({id:"monitor-bool",type:"monitor",accept:(n,t)=>{if(typeof n!="boolean")return null;const e=he(t,i=>({readonly:i.required.constant(!0),rows:i.optional.number}));return e?{initialValue:n,params:e}:null},binding:{reader:n=>bd},controller:n=>{var t;return n.value.rawValue.length===1?new Cl(n.document,{formatter:Ou,value:n.value,viewProps:n.viewProps}):new Tl(n.document,{formatter:Ou,rows:(t=n.params.rows)!==null&&t!==void 0?t:ps.monitor.defaultRows,value:n.value,viewProps:n.viewProps})}});class PE extends Jr{get max(){return this.controller.valueController.props.get("max")}set max(t){this.controller.valueController.props.set("max",t)}get min(){return this.controller.valueController.props.get("min")}set min(t){this.controller.valueController.props.set("min",t)}}const Wn=qt("grl");class RE{constructor(t,e){this.onCursorChange_=this.onCursorChange_.bind(this),this.onValueUpdate_=this.onValueUpdate_.bind(this),this.element=t.createElement("div"),this.element.classList.add(Wn()),e.viewProps.bindClassModifiers(this.element),this.formatter_=e.formatter,this.props_=e.props,this.cursor_=e.cursor,this.cursor_.emitter.on("change",this.onCursorChange_);const i=t.createElementNS(mn,"svg");i.classList.add(Wn("g")),i.style.height=`calc(var(${Md("containerUnitSize")}) * ${e.rows})`,this.element.appendChild(i),this.svgElem_=i;const r=t.createElementNS(mn,"polyline");this.svgElem_.appendChild(r),this.lineElem_=r;const s=t.createElement("div");s.classList.add(Wn("t"),qt("tt")()),this.element.appendChild(s),this.tooltipElem_=s,e.value.emitter.on("change",this.onValueUpdate_),this.value=e.value,this.update_()}get graphElement(){return this.svgElem_}update_(){const{clientWidth:t,clientHeight:e}=this.element,i=this.value.rawValue.length-1,r=this.props_.get("min"),s=this.props_.get("max"),o=[];this.value.rawValue.forEach((h,d)=>{if(h===void 0)return;const m=$t(d,0,i,0,t),v=$t(h,r,s,e,0);o.push([m,v].join(","))}),this.lineElem_.setAttributeNS(null,"points",o.join(" "));const a=this.tooltipElem_,l=this.value.rawValue[this.cursor_.rawValue];if(l===void 0){a.classList.remove(Wn("t","a"));return}const c=$t(this.cursor_.rawValue,0,i,0,t),u=$t(l,r,s,e,0);a.style.left=`${c}px`,a.style.top=`${u}px`,a.textContent=`${this.formatter_(l)}`,a.classList.contains(Wn("t","a"))||(a.classList.add(Wn("t","a"),Wn("t","in")),fo(a),a.classList.remove(Wn("t","in")))}onValueUpdate_(){this.update_()}onCursorChange_(){this.update_()}}class $d{constructor(t,e){if(this.onGraphMouseMove_=this.onGraphMouseMove_.bind(this),this.onGraphMouseLeave_=this.onGraphMouseLeave_.bind(this),this.onGraphPointerDown_=this.onGraphPointerDown_.bind(this),this.onGraphPointerMove_=this.onGraphPointerMove_.bind(this),this.onGraphPointerUp_=this.onGraphPointerUp_.bind(this),this.props=e.props,this.value=e.value,this.viewProps=e.viewProps,this.cursor_=le(-1),this.view=new RE(t,{cursor:this.cursor_,formatter:e.formatter,rows:e.rows,props:this.props,value:this.value,viewProps:this.viewProps}),!al(t))this.view.element.addEventListener("mousemove",this.onGraphMouseMove_),this.view.element.addEventListener("mouseleave",this.onGraphMouseLeave_);else{const i=new Ui(this.view.element);i.emitter.on("down",this.onGraphPointerDown_),i.emitter.on("move",this.onGraphPointerMove_),i.emitter.on("up",this.onGraphPointerUp_)}}importProps(t){return $e(t,null,e=>({max:e.required.number,min:e.required.number}),e=>(this.props.set("max",e.max),this.props.set("min",e.min),!0))}exportProps(){return Ze(null,{max:this.props.get("max"),min:this.props.get("min")})}onGraphMouseLeave_(){this.cursor_.rawValue=-1}onGraphMouseMove_(t){const{clientWidth:e}=this.view.element;this.cursor_.rawValue=Math.floor($t(t.offsetX,0,e,0,this.value.rawValue.length))}onGraphPointerDown_(t){this.onGraphPointerMove_(t)}onGraphPointerMove_(t){if(!t.data.point){this.cursor_.rawValue=-1;return}this.cursor_.rawValue=Math.floor($t(t.data.point.x,0,t.data.bounds.width,0,this.value.rawValue.length))}onGraphPointerUp_(){this.cursor_.rawValue=-1}}function Wa(n){return ee(n.format)?Xe(2):n.format}function LE(n){var t;return n.value.rawValue.length===1?new Cl(n.document,{formatter:Wa(n.params),value:n.value,viewProps:n.viewProps}):new Tl(n.document,{formatter:Wa(n.params),rows:(t=n.params.rows)!==null&&t!==void 0?t:ps.monitor.defaultRows,value:n.value,viewProps:n.viewProps})}function DE(n){var t,e,i;return new $d(n.document,{formatter:Wa(n.params),rows:(t=n.params.rows)!==null&&t!==void 0?t:ps.monitor.defaultRows,props:Ht.fromObject({max:(e=n.params.max)!==null&&e!==void 0?e:100,min:(i=n.params.min)!==null&&i!==void 0?i:0}),value:n.value,viewProps:n.viewProps})}function Yu(n){return n.view==="graph"}const IE=Ve({id:"monitor-number",type:"monitor",accept:(n,t)=>{if(typeof n!="number")return null;const e=he(t,i=>({format:i.optional.function,max:i.optional.number,min:i.optional.number,readonly:i.required.constant(!0),rows:i.optional.number,view:i.optional.string}));return e?{initialValue:n,params:e}:null},binding:{defaultBufferSize:n=>Yu(n)?64:1,reader:n=>Qh},controller:n=>Yu(n.params)?DE(n):LE(n),api:n=>n.controller.valueController instanceof $d?new PE(n.controller):null}),UE=Ve({id:"monitor-string",type:"monitor",accept:(n,t)=>{if(typeof n!="string")return null;const e=he(t,i=>({multiline:i.optional.boolean,readonly:i.required.constant(!0),rows:i.optional.number}));return e?{initialValue:n,params:e}:null},binding:{reader:n=>wd},controller:n=>{var t;const e=n.value;return e.rawValue.length>1||n.params.multiline?new Tl(n.document,{formatter:Ga,rows:(t=n.params.rows)!==null&&t!==void 0?t:ps.monitor.defaultRows,value:e,viewProps:n.viewProps}):new Cl(n.document,{formatter:Ga,value:e,viewProps:n.viewProps})}});class NE{constructor(){this.map_=new Map}get(t){var e;return(e=this.map_.get(t))!==null&&e!==void 0?e:null}has(t){return this.map_.has(t)}add(t,e){return this.map_.set(t,e),t.viewProps.handleDispose(()=>{this.map_.delete(t)}),e}}class OE{constructor(t){this.target=t.target,this.reader_=t.reader,this.writer_=t.writer}read(){return this.reader_(this.target.read())}write(t){this.writer_(this.target,t)}inject(t){this.write(this.reader_(t))}}function FE(n,t){var e;const i=n.accept(t.target.read(),t.params);if(ee(i))return null;const r={target:t.target,initialValue:i.initialValue,params:i.params},s=he(t.params,h=>({disabled:h.optional.boolean,hidden:h.optional.boolean,label:h.optional.string,tag:h.optional.string})),o=n.binding.reader(r),a=n.binding.constraint?n.binding.constraint(r):void 0,l=new OE({reader:o,target:t.target,writer:n.binding.writer(r)}),c=new yb(le(o(i.initialValue),{constraint:a,equals:n.binding.equals}),l),u=n.controller({constraint:a,document:t.document,initialValue:i.initialValue,params:i.params,value:c,viewProps:Nn.create({disabled:s==null?void 0:s.disabled,hidden:s==null?void 0:s.hidden})});return new Fb(t.document,{blade:Er(),props:Ht.fromObject({label:"label"in t.params?(e=s==null?void 0:s.label)!==null&&e!==void 0?e:null:t.target.key}),tag:s==null?void 0:s.tag,value:c,valueController:u})}class BE{constructor(t){this.target=t.target,this.reader_=t.reader}read(){return this.reader_(this.target.read())}}function kE(n,t){return t===0?new xw:new bw(n,t??ps.monitor.defaultInterval)}function VE(n,t){var e,i,r;const s=n.accept(t.target.read(),t.params);if(ee(s))return null;const o={target:t.target,initialValue:s.initialValue,params:s.params},a=he(t.params,d=>({bufferSize:d.optional.number,disabled:d.optional.boolean,hidden:d.optional.boolean,interval:d.optional.number,label:d.optional.string})),l=n.binding.reader(o),c=(i=(e=a==null?void 0:a.bufferSize)!==null&&e!==void 0?e:n.binding.defaultBufferSize&&n.binding.defaultBufferSize(s.params))!==null&&i!==void 0?i:1,u=new Hb({binding:new BE({reader:l,target:t.target}),bufferSize:c,ticker:kE(t.document,a==null?void 0:a.interval)}),h=n.controller({document:t.document,params:s.params,value:u,viewProps:Nn.create({disabled:a==null?void 0:a.disabled,hidden:a==null?void 0:a.hidden})});return h.viewProps.bindDisabled(u.ticker),h.viewProps.handleDispose(()=>{u.ticker.dispose()}),new Wb(t.document,{blade:Er(),props:Ht.fromObject({label:"label"in t.params?(r=a==null?void 0:a.label)!==null&&r!==void 0?r:null:t.target.key}),value:u,valueController:h})}class zE{constructor(t){this.pluginsMap_={blades:[],inputs:[],monitors:[]},this.apiCache_=t}getAll(){return[...this.pluginsMap_.blades,...this.pluginsMap_.inputs,...this.pluginsMap_.monitors]}register(t,e){if(!Iw(e.core))throw fe.notCompatible(t,e.id);e.type==="blade"?this.pluginsMap_.blades.unshift(e):e.type==="input"?this.pluginsMap_.inputs.unshift(e):e.type==="monitor"&&this.pluginsMap_.monitors.unshift(e)}createInput_(t,e,i){return this.pluginsMap_.inputs.reduce((r,s)=>r??FE(s,{document:t,target:e,params:i}),null)}createMonitor_(t,e,i){return this.pluginsMap_.monitors.reduce((r,s)=>r??VE(s,{document:t,params:i,target:e}),null)}createBinding(t,e,i){const r=e.read();if(ee(r))throw new fe({context:{key:e.key},type:"nomatchingcontroller"});const s=this.createInput_(t,e,i);if(s)return s;const o=this.createMonitor_(t,e,i);if(o)return o;throw new fe({context:{key:e.key},type:"nomatchingcontroller"})}createBlade(t,e){const i=this.pluginsMap_.blades.reduce((r,s)=>r??gw(s,{document:t,params:e}),null);if(!i)throw new fe({type:"nomatchingview",context:{params:e}});return i}createInputBindingApi_(t){const e=this.pluginsMap_.inputs.reduce((i,r)=>{var s,o;return i||((o=(s=r.api)===null||s===void 0?void 0:s.call(r,{controller:t}))!==null&&o!==void 0?o:null)},null);return this.apiCache_.add(t,e??new Jr(t))}createMonitorBindingApi_(t){const e=this.pluginsMap_.monitors.reduce((i,r)=>{var s,o;return i||((o=(s=r.api)===null||s===void 0?void 0:s.call(r,{controller:t}))!==null&&o!==void 0?o:null)},null);return this.apiCache_.add(t,e??new Jr(t))}createBindingApi(t){if(this.apiCache_.has(t))return this.apiCache_.get(t);if(Bb(t))return this.createInputBindingApi_(t);if(Xb(t))return this.createMonitorBindingApi_(t);throw fe.shouldNeverHappen()}createApi(t){if(this.apiCache_.has(t))return this.apiCache_.get(t);if(Ob(t))return this.createBindingApi(t);const e=this.pluginsMap_.blades.reduce((i,r)=>i??r.api({controller:t,pool:this}),null);if(!e)throw fe.shouldNeverHappen();return this.apiCache_.add(t,e)}}const HE=new NE;function GE(){const n=new zE(HE);return[mE,xE,EE,SE,sE,tE,Qy,jy,Fw,AE,UE,IE,$b,cw,gd].forEach(t=>{n.register("core",t)}),n}class WE extends Ii{constructor(t){super(t),this.emitter_=new xe,this.controller.value.emitter.on("change",e=>{this.emitter_.emit("change",new ss(this,e.rawValue))})}get label(){return this.controller.labelController.props.get("label")}set label(t){this.controller.labelController.props.set("label",t)}get options(){return this.controller.valueController.props.get("options")}set options(t){this.controller.valueController.props.set("options",t)}get value(){return this.controller.value.rawValue}set value(t){this.controller.value.rawValue=t}on(t,e){const i=e.bind(this);return this.emitter_.on(t,r=>{i(r)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}}class XE extends Ii{}class qE extends Ii{constructor(t){super(t),this.emitter_=new xe,this.controller.value.emitter.on("change",e=>{this.emitter_.emit("change",new ss(this,e.rawValue))})}get label(){return this.controller.labelController.props.get("label")}set label(t){this.controller.labelController.props.set("label",t)}get max(){return this.controller.valueController.sliderController.props.get("max")}set max(t){this.controller.valueController.sliderController.props.set("max",t)}get min(){return this.controller.valueController.sliderController.props.get("min")}set min(t){this.controller.valueController.sliderController.props.set("min",t)}get value(){return this.controller.value.rawValue}set value(t){this.controller.value.rawValue=t}on(t,e){const i=e.bind(this);return this.emitter_.on(t,r=>{i(r)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}}class YE extends Ii{constructor(t){super(t),this.emitter_=new xe,this.controller.value.emitter.on("change",e=>{this.emitter_.emit("change",new ss(this,e.rawValue))})}get label(){return this.controller.labelController.props.get("label")}set label(t){this.controller.labelController.props.set("label",t)}get formatter(){return this.controller.valueController.props.get("formatter")}set formatter(t){this.controller.valueController.props.set("formatter",t)}get value(){return this.controller.value.rawValue}set value(t){this.controller.value.rawValue=t}on(t,e){const i=e.bind(this);return this.emitter_.on(t,r=>{i(r)},{key:e}),this}off(t,e){return this.emitter_.off(t,e),this}}const jE=function(){return{id:"list",type:"blade",core:yr,accept(n){const t=he(n,e=>({options:e.required.custom(cs),value:e.required.raw,view:e.required.constant("list"),label:e.optional.string}));return t?{params:t}:null},controller(n){const t=new ls(ml(n.params.options)),e=le(n.params.value,{constraint:t}),i=new ri(n.document,{props:new Ht({options:t.values.value("options")}),value:e,viewProps:n.viewProps});return new Pi(n.document,{blade:n.blade,props:Ht.fromObject({label:n.params.label}),value:e,valueController:i})},api(n){return!(n.controller instanceof Pi)||!(n.controller.valueController instanceof ri)?null:new WE(n.controller)}}}();class KE extends vd{constructor(t,e){super(t,e)}get element(){return this.controller.view.element}}class $E extends za{constructor(t,e){super(t,{expanded:e.expanded,blade:e.blade,props:e.props,root:!0,viewProps:e.viewProps})}}const ju=qt("spr");class ZE{constructor(t,e){this.element=t.createElement("div"),this.element.classList.add(ju()),e.viewProps.bindClassModifiers(this.element);const i=t.createElement("hr");i.classList.add(ju("r")),this.element.appendChild(i)}}class Ku extends To{constructor(t,e){super(Object.assign(Object.assign({},e),{view:new ZE(t,{viewProps:e.viewProps})}))}}const JE={id:"separator",type:"blade",core:yr,accept(n){const t=he(n,e=>({view:e.required.constant("separator")}));return t?{params:t}:null},controller(n){return new Ku(n.document,{blade:n.blade,viewProps:n.viewProps})},api(n){return n.controller instanceof Ku?new XE(n.controller):null}},QE={id:"slider",type:"blade",core:yr,accept(n){const t=he(n,e=>({max:e.required.number,min:e.required.number,view:e.required.constant("slider"),format:e.optional.function,label:e.optional.string,value:e.optional.number}));return t?{params:t}:null},controller(n){var t,e;const i=(t=n.params.value)!==null&&t!==void 0?t:0,r=new rs({max:n.params.max,min:n.params.min}),s=le(i,{constraint:r}),o=new _o(n.document,Object.assign(Object.assign({},Ed({formatter:(e=n.params.format)!==null&&e!==void 0?e:_b,keyScale:le(1),max:r.values.value("max"),min:r.values.value("min"),pointerScale:nd(n.params,i)})),{parser:In,value:s,viewProps:n.viewProps}));return new Pi(n.document,{blade:n.blade,props:Ht.fromObject({label:n.params.label}),value:s,valueController:o})},api(n){return!(n.controller instanceof Pi)||!(n.controller.valueController instanceof _o)?null:new qE(n.controller)}},tM=function(){return{id:"text",type:"blade",core:yr,accept(n){const t=he(n,e=>({parse:e.required.function,value:e.required.raw,view:e.required.constant("text"),format:e.optional.function,label:e.optional.string}));return t?{params:t}:null},controller(n){var t;const e=le(n.params.value),i=new Qr(n.document,{parser:n.params.parse,props:Ht.fromObject({formatter:(t=n.params.format)!==null&&t!==void 0?t:r=>String(r)}),value:e,viewProps:n.viewProps});return new Pi(n.document,{blade:n.blade,props:Ht.fromObject({label:n.params.label}),value:e,valueController:i})},api(n){return!(n.controller instanceof Pi)||!(n.controller.valueController instanceof Qr)?null:new YE(n.controller)}}}();function eM(n){const t=n.createElement("div");return t.classList.add(qt("dfw")()),n.body&&n.body.appendChild(t),t}function nM(n,t,e){if(n.querySelector(`style[data-tp-style=${t}]`))return;const i=n.createElement("style");i.dataset.tpStyle=t,i.textContent=e,n.head.appendChild(i)}class Zd extends KE{constructor(t){var e,i;const r=t??{},s=(e=r.document)!==null&&e!==void 0?e:Pb(),o=GE(),a=new $E(s,{expanded:r.expanded,blade:Er(),props:Ht.fromObject({title:r.title}),viewProps:Nn.create()});super(a,o),this.pool_=o,this.containerElem_=(i=r.container)!==null&&i!==void 0?i:eM(s),this.containerElem_.appendChild(this.element),this.doc_=s,this.usesDefaultWrapper_=!r.container,this.setUpDefaultPlugins_()}get document(){if(!this.doc_)throw fe.alreadyDisposed();return this.doc_}dispose(){const t=this.containerElem_;if(!t)throw fe.alreadyDisposed();if(this.usesDefaultWrapper_){const e=t.parentElement;e&&e.removeChild(t)}this.containerElem_=null,this.doc_=null,super.dispose()}registerPlugin(t){t.css&&nM(this.document,`plugin-${t.id}`,t.css),("plugin"in t?[t.plugin]:"plugins"in t?t.plugins:[]).forEach(i=>{this.pool_.register(t.id,i)})}setUpDefaultPlugins_(){this.registerPlugin({id:"default",css:'.tp-tbiv_b,.tp-coltxtv_ms,.tp-colswv_b,.tp-ckbv_i,.tp-sglv_i,.tp-mllv_i,.tp-grlv_g,.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw,.tp-rotv_b,.tp-fldv_b,.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:rgba(0,0,0,0);border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0}.tp-p2dv_b,.tp-btnv_b,.tp-lstv_s{background-color:var(--btn-bg);border-radius:var(--bld-br);color:var(--btn-fg);cursor:pointer;display:block;font-weight:bold;height:var(--cnt-usz);line-height:var(--cnt-usz);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tp-p2dv_b:hover,.tp-btnv_b:hover,.tp-lstv_s:hover{background-color:var(--btn-bg-h)}.tp-p2dv_b:focus,.tp-btnv_b:focus,.tp-lstv_s:focus{background-color:var(--btn-bg-f)}.tp-p2dv_b:active,.tp-btnv_b:active,.tp-lstv_s:active{background-color:var(--btn-bg-a)}.tp-p2dv_b:disabled,.tp-btnv_b:disabled,.tp-lstv_s:disabled{opacity:.5}.tp-rotv_c>.tp-cntv.tp-v-lst,.tp-tbpv_c>.tp-cntv.tp-v-lst,.tp-fldv_c>.tp-cntv.tp-v-lst{margin-bottom:calc(-1*var(--cnt-vp))}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-tbpv_c>.tp-fldv.tp-v-lst .tp-fldv_c,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_c{border-bottom-left-radius:0}.tp-rotv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-tbpv_c>.tp-fldv.tp-v-lst .tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-v-lst .tp-fldv_b{border-bottom-left-radius:0}.tp-rotv_c>*:not(.tp-v-fst),.tp-tbpv_c>*:not(.tp-v-fst),.tp-fldv_c>*:not(.tp-v-fst){margin-top:var(--cnt-usp)}.tp-rotv_c>.tp-sprv:not(.tp-v-fst),.tp-tbpv_c>.tp-sprv:not(.tp-v-fst),.tp-fldv_c>.tp-sprv:not(.tp-v-fst),.tp-rotv_c>.tp-cntv:not(.tp-v-fst),.tp-tbpv_c>.tp-cntv:not(.tp-v-fst),.tp-fldv_c>.tp-cntv:not(.tp-v-fst){margin-top:var(--cnt-vp)}.tp-rotv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-tbpv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-sprv+*:not(.tp-v-hidden),.tp-rotv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-tbpv_c>.tp-cntv+*:not(.tp-v-hidden),.tp-fldv_c>.tp-cntv+*:not(.tp-v-hidden){margin-top:var(--cnt-vp)}.tp-rotv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-tbpv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-fldv_c>.tp-sprv:not(.tp-v-hidden)+.tp-sprv,.tp-rotv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-tbpv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv,.tp-fldv_c>.tp-cntv:not(.tp-v-hidden)+.tp-cntv{margin-top:0}.tp-tbpv_c>.tp-cntv,.tp-fldv_c>.tp-cntv{margin-left:4px}.tp-tbpv_c>.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-fldv>.tp-fldv_b{border-top-left-radius:var(--bld-br);border-bottom-left-radius:var(--bld-br)}.tp-tbpv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b,.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_b{border-bottom-left-radius:0}.tp-tbpv_c .tp-fldv>.tp-fldv_c,.tp-fldv_c .tp-fldv>.tp-fldv_c{border-bottom-left-radius:var(--bld-br)}.tp-tbpv_c>.tp-cntv+.tp-fldv>.tp-fldv_b,.tp-fldv_c>.tp-cntv+.tp-fldv>.tp-fldv_b{border-top-left-radius:0}.tp-tbpv_c>.tp-cntv+.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-cntv+.tp-tabv>.tp-tabv_t{border-top-left-radius:0}.tp-tbpv_c>.tp-tabv>.tp-tabv_t,.tp-fldv_c>.tp-tabv>.tp-tabv_t{border-top-left-radius:var(--bld-br)}.tp-tbpv_c .tp-tabv>.tp-tabv_c,.tp-fldv_c .tp-tabv>.tp-tabv_c{border-bottom-left-radius:var(--bld-br)}.tp-rotv_b,.tp-fldv_b{background-color:var(--cnt-bg);color:var(--cnt-fg);cursor:pointer;display:block;height:calc(var(--cnt-usz) + 4px);line-height:calc(var(--cnt-usz) + 4px);overflow:hidden;padding-left:var(--cnt-hp);padding-right:calc(4px + var(--cnt-usz) + var(--cnt-hp));position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-rotv_b:hover,.tp-fldv_b:hover{background-color:var(--cnt-bg-h)}.tp-rotv_b:focus,.tp-fldv_b:focus{background-color:var(--cnt-bg-f)}.tp-rotv_b:active,.tp-fldv_b:active{background-color:var(--cnt-bg-a)}.tp-rotv_b:disabled,.tp-fldv_b:disabled{opacity:.5}.tp-rotv_m,.tp-fldv_m{background:linear-gradient(to left, var(--cnt-fg), var(--cnt-fg) 2px, transparent 2px, transparent 4px, var(--cnt-fg) 4px);border-radius:2px;bottom:0;content:"";display:block;height:6px;right:calc(var(--cnt-hp) + (var(--cnt-usz) + 4px - 6px)/2 - 2px);margin:auto;opacity:.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-rotv.tp-rotv-expanded .tp-rotv_m,.tp-fldv.tp-fldv-expanded>.tp-fldv_b>.tp-fldv_m{transform:none}.tp-rotv_c,.tp-fldv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-rotv.tp-rotv-cpl:not(.tp-rotv-expanded) .tp-rotv_c,.tp-fldv.tp-fldv-cpl:not(.tp-fldv-expanded)>.tp-fldv_c{display:none}.tp-rotv.tp-rotv-expanded .tp-rotv_c,.tp-fldv.tp-fldv-expanded>.tp-fldv_c{opacity:1;padding-bottom:var(--cnt-vp);padding-top:var(--cnt-vp);transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-txtv_i,.tp-p2dpv_p,.tp-colswv_sw{background-color:var(--in-bg);border-radius:var(--bld-br);box-sizing:border-box;color:var(--in-fg);font-family:inherit;height:var(--cnt-usz);line-height:var(--cnt-usz);min-width:0;width:100%}.tp-txtv_i:hover,.tp-p2dpv_p:hover,.tp-colswv_sw:hover{background-color:var(--in-bg-h)}.tp-txtv_i:focus,.tp-p2dpv_p:focus,.tp-colswv_sw:focus{background-color:var(--in-bg-f)}.tp-txtv_i:active,.tp-p2dpv_p:active,.tp-colswv_sw:active{background-color:var(--in-bg-a)}.tp-txtv_i:disabled,.tp-p2dpv_p:disabled,.tp-colswv_sw:disabled{opacity:.5}.tp-lstv,.tp-coltxtv_m{position:relative}.tp-lstv_s{padding:0 20px 0 4px;width:100%}.tp-lstv_m,.tp-coltxtv_mm{bottom:0;margin:auto;pointer-events:none;position:absolute;right:2px;top:0}.tp-lstv_m svg,.tp-coltxtv_mm svg{bottom:0;height:16px;margin:auto;position:absolute;right:0;top:0;width:16px}.tp-lstv_m svg path,.tp-coltxtv_mm svg path{fill:currentColor}.tp-sglv_i,.tp-mllv_i,.tp-grlv_g{background-color:var(--mo-bg);border-radius:var(--bld-br);box-sizing:border-box;color:var(--mo-fg);height:var(--cnt-usz);scrollbar-color:currentColor rgba(0,0,0,0);scrollbar-width:thin;width:100%}.tp-sglv_i::-webkit-scrollbar,.tp-mllv_i::-webkit-scrollbar,.tp-grlv_g::-webkit-scrollbar{height:8px;width:8px}.tp-sglv_i::-webkit-scrollbar-corner,.tp-mllv_i::-webkit-scrollbar-corner,.tp-grlv_g::-webkit-scrollbar-corner{background-color:rgba(0,0,0,0)}.tp-sglv_i::-webkit-scrollbar-thumb,.tp-mllv_i::-webkit-scrollbar-thumb,.tp-grlv_g::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:currentColor;border:rgba(0,0,0,0) solid 2px;border-radius:4px}.tp-pndtxtv,.tp-coltxtv_w{display:flex}.tp-pndtxtv_a,.tp-coltxtv_c{width:100%}.tp-pndtxtv_a+.tp-pndtxtv_a,.tp-coltxtv_c+.tp-pndtxtv_a,.tp-pndtxtv_a+.tp-coltxtv_c,.tp-coltxtv_c+.tp-coltxtv_c{margin-left:2px}.tp-rotv{--bs-bg: var(--tp-base-background-color, hsl(230, 7%, 17%));--bs-br: var(--tp-base-border-radius, 6px);--bs-ff: var(--tp-base-font-family, Roboto Mono, Source Code Pro, Menlo, Courier, monospace);--bs-sh: var(--tp-base-shadow-color, rgba(0, 0, 0, 0.2));--bld-br: var(--tp-blade-border-radius, 2px);--bld-hp: var(--tp-blade-horizontal-padding, 4px);--bld-vw: var(--tp-blade-value-width, 160px);--btn-bg: var(--tp-button-background-color, hsl(230, 7%, 70%));--btn-bg-a: var(--tp-button-background-color-active, #d6d7db);--btn-bg-f: var(--tp-button-background-color-focus, #c8cad0);--btn-bg-h: var(--tp-button-background-color-hover, #bbbcc4);--btn-fg: var(--tp-button-foreground-color, hsl(230, 7%, 17%));--cnt-bg: var(--tp-container-background-color, rgba(187, 188, 196, 0.1));--cnt-bg-a: var(--tp-container-background-color-active, rgba(187, 188, 196, 0.25));--cnt-bg-f: var(--tp-container-background-color-focus, rgba(187, 188, 196, 0.2));--cnt-bg-h: var(--tp-container-background-color-hover, rgba(187, 188, 196, 0.15));--cnt-fg: var(--tp-container-foreground-color, hsl(230, 7%, 75%));--cnt-hp: var(--tp-container-horizontal-padding, 4px);--cnt-vp: var(--tp-container-vertical-padding, 4px);--cnt-usp: var(--tp-container-unit-spacing, 4px);--cnt-usz: var(--tp-container-unit-size, 20px);--in-bg: var(--tp-input-background-color, rgba(187, 188, 196, 0.1));--in-bg-a: var(--tp-input-background-color-active, rgba(187, 188, 196, 0.25));--in-bg-f: var(--tp-input-background-color-focus, rgba(187, 188, 196, 0.2));--in-bg-h: var(--tp-input-background-color-hover, rgba(187, 188, 196, 0.15));--in-fg: var(--tp-input-foreground-color, hsl(230, 7%, 75%));--lbl-fg: var(--tp-label-foreground-color, rgba(187, 188, 196, 0.7));--mo-bg: var(--tp-monitor-background-color, rgba(0, 0, 0, 0.2));--mo-fg: var(--tp-monitor-foreground-color, rgba(187, 188, 196, 0.7));--grv-fg: var(--tp-groove-foreground-color, rgba(187, 188, 196, 0.1))}.tp-btnv_b{width:100%}.tp-btnv_t{text-align:center}.tp-ckbv_l{display:block;position:relative}.tp-ckbv_i{left:0;opacity:0;position:absolute;top:0}.tp-ckbv_w{background-color:var(--in-bg);border-radius:var(--bld-br);cursor:pointer;display:block;height:var(--cnt-usz);position:relative;width:var(--cnt-usz)}.tp-ckbv_w svg{bottom:0;display:block;height:16px;left:0;margin:auto;opacity:0;position:absolute;right:0;top:0;width:16px}.tp-ckbv_w svg path{fill:none;stroke:var(--in-fg);stroke-width:2}.tp-ckbv_i:hover+.tp-ckbv_w{background-color:var(--in-bg-h)}.tp-ckbv_i:focus+.tp-ckbv_w{background-color:var(--in-bg-f)}.tp-ckbv_i:active+.tp-ckbv_w{background-color:var(--in-bg-a)}.tp-ckbv_i:checked+.tp-ckbv_w svg{opacity:1}.tp-ckbv.tp-v-disabled .tp-ckbv_w{opacity:.5}.tp-colv{position:relative}.tp-colv_h{display:flex}.tp-colv_s{flex-grow:0;flex-shrink:0;width:var(--cnt-usz)}.tp-colv_t{flex:1;margin-left:4px}.tp-colv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-colv.tp-colv-expanded.tp-colv-cpl .tp-colv_p{overflow:visible}.tp-colv.tp-colv-expanded .tp-colv_p{margin-top:var(--cnt-usp);opacity:1}.tp-colv .tp-popv{left:calc(-1*var(--cnt-hp));right:calc(-1*var(--cnt-hp));top:var(--cnt-usz)}.tp-colpv_h,.tp-colpv_ap{margin-left:6px;margin-right:6px}.tp-colpv_h{margin-top:var(--cnt-usp)}.tp-colpv_rgb{display:flex;margin-top:var(--cnt-usp);width:100%}.tp-colpv_a{display:flex;margin-top:var(--cnt-vp);padding-top:calc(var(--cnt-vp) + 2px);position:relative}.tp-colpv_a::before{background-color:var(--grv-fg);content:"";height:2px;left:calc(-1*var(--cnt-hp));position:absolute;right:calc(-1*var(--cnt-hp));top:0}.tp-colpv.tp-v-disabled .tp-colpv_a::before{opacity:.5}.tp-colpv_ap{align-items:center;display:flex;flex:3}.tp-colpv_at{flex:1;margin-left:4px}.tp-svpv{border-radius:var(--bld-br);outline:none;overflow:hidden;position:relative}.tp-svpv.tp-v-disabled{opacity:.5}.tp-svpv_c{cursor:crosshair;display:block;height:calc(var(--cnt-usz)*4);width:100%}.tp-svpv_m{border-radius:100%;border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0, 0, 0, 0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpv:focus .tp-svpv_m{border-color:#fff}.tp-hplv{cursor:pointer;height:var(--cnt-usz);outline:none;position:relative}.tp-hplv.tp-v-disabled{opacity:.5}.tp-hplv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hplv_m{border-radius:var(--bld-br);border:rgba(255,255,255,.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hplv:focus .tp-hplv_m{border-color:#fff}.tp-aplv{cursor:pointer;height:var(--cnt-usz);outline:none;position:relative;width:100%}.tp-aplv.tp-v-disabled{opacity:.5}.tp-aplv_b{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-aplv_c{bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv_m{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;border-radius:var(--bld-br);box-shadow:0 0 2px rgba(0,0,0,.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-aplv_p{border-radius:var(--bld-br);border:rgba(255,255,255,.75) solid 2px;box-sizing:border-box;bottom:0;left:0;position:absolute;right:0;top:0}.tp-aplv:focus .tp-aplv_p{border-color:#fff}.tp-colswv{background-color:#fff;background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;border-radius:var(--bld-br);overflow:hidden}.tp-colswv.tp-v-disabled{opacity:.5}.tp-colswv_sw{border-radius:0}.tp-colswv_b{cursor:pointer;display:block;height:var(--cnt-usz);left:0;position:absolute;top:0;width:var(--cnt-usz)}.tp-colswv_b:focus::after{border:rgba(255,255,255,.75) solid 2px;border-radius:var(--bld-br);bottom:0;content:"";display:block;left:0;position:absolute;right:0;top:0}.tp-coltxtv{display:flex;width:100%}.tp-coltxtv_m{margin-right:4px}.tp-coltxtv_ms{border-radius:var(--bld-br);color:var(--lbl-fg);cursor:pointer;height:var(--cnt-usz);line-height:var(--cnt-usz);padding:0 18px 0 4px}.tp-coltxtv_ms:hover{background-color:var(--in-bg-h)}.tp-coltxtv_ms:focus{background-color:var(--in-bg-f)}.tp-coltxtv_ms:active{background-color:var(--in-bg-a)}.tp-coltxtv_mm{color:var(--lbl-fg)}.tp-coltxtv.tp-v-disabled .tp-coltxtv_mm{opacity:.5}.tp-coltxtv_w{flex:1}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv{position:relative}.tp-fldv_t{padding-left:4px}.tp-fldv_b:disabled .tp-fldv_m{display:none}.tp-fldv_c{padding-left:4px}.tp-fldv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--cnt-usz) + 4px);width:max(var(--bs-br),4px)}.tp-fldv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-fldv_b:hover+.tp-fldv_i{color:var(--cnt-bg-h)}.tp-fldv_b:focus+.tp-fldv_i{color:var(--cnt-bg-f)}.tp-fldv_b:active+.tp-fldv_i{color:var(--cnt-bg-a)}.tp-fldv.tp-v-disabled>.tp-fldv_i{opacity:.5}.tp-grlv{position:relative}.tp-grlv_g{display:block;height:calc(var(--cnt-usz)*3)}.tp-grlv_g polyline{fill:none;stroke:var(--mo-fg);stroke-linejoin:round}.tp-grlv_t{margin-top:-4px;transition:left .05s,top .05s;visibility:hidden}.tp-grlv_t.tp-grlv_t-a{visibility:visible}.tp-grlv_t.tp-grlv_t-in{transition:none}.tp-grlv.tp-v-disabled .tp-grlv_g{opacity:.5}.tp-grlv .tp-ttv{background-color:var(--mo-fg)}.tp-grlv .tp-ttv::before{border-top-color:var(--mo-fg)}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:var(--cnt-hp);padding-right:var(--cnt-hp)}.tp-lblv.tp-lblv-nol{display:block}.tp-lblv_l{color:var(--lbl-fg);flex:1;-webkit-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv.tp-v-disabled .tp-lblv_l{opacity:.5}.tp-lblv.tp-lblv-nol .tp-lblv_l{display:none}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:var(--bld-vw)}.tp-lblv.tp-lblv-nol .tp-lblv_v{width:100%}.tp-lstv_s{padding:0 20px 0 var(--bld-hp);width:100%}.tp-lstv_m{color:var(--btn-fg)}.tp-sglv_i{padding-left:var(--bld-hp);padding-right:var(--bld-hp)}.tp-sglv.tp-v-disabled .tp-sglv_i{opacity:.5}.tp-mllv_i{display:block;height:calc(var(--cnt-usz)*3);line-height:var(--cnt-usz);padding-left:var(--bld-hp);padding-right:var(--bld-hp);resize:none;white-space:pre}.tp-mllv.tp-v-disabled .tp-mllv_i{opacity:.5}.tp-p2dv{position:relative}.tp-p2dv_h{display:flex}.tp-p2dv_b{height:var(--cnt-usz);margin-right:4px;position:relative;width:var(--cnt-usz)}.tp-p2dv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dv_b svg path{stroke:currentColor;stroke-width:2}.tp-p2dv_b svg circle{fill:currentColor}.tp-p2dv_t{flex:1}.tp-p2dv_p{height:0;margin-top:0;opacity:0;overflow:hidden;transition:height .2s ease-in-out,opacity .2s linear,margin .2s ease-in-out}.tp-p2dv.tp-p2dv-expanded .tp-p2dv_p{margin-top:var(--cnt-usp);opacity:1}.tp-p2dv .tp-popv{left:calc(-1*var(--cnt-hp));right:calc(-1*var(--cnt-hp));top:var(--cnt-usz)}.tp-p2dpv{padding-left:calc(var(--cnt-usz) + 4px)}.tp-p2dpv_p{cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpv.tp-v-disabled .tp-p2dpv_p{opacity:.5}.tp-p2dpv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpv_ax{opacity:.1;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_l{opacity:.5;stroke:var(--in-fg);stroke-dasharray:1}.tp-p2dpv_m{border:var(--in-fg) solid 1px;border-radius:50%;box-sizing:border-box;height:4px;margin-left:-2px;margin-top:-2px;position:absolute;width:4px}.tp-p2dpv_p:focus .tp-p2dpv_m{background-color:var(--in-fg);border-width:0}.tp-popv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);display:none;max-width:var(--bld-vw);padding:var(--cnt-vp) var(--cnt-hp);position:absolute;visibility:hidden;z-index:1000}.tp-popv.tp-popv-v{display:block;visibility:visible}.tp-sldv.tp-v-disabled{opacity:.5}.tp-sldv_t{box-sizing:border-box;cursor:pointer;height:var(--cnt-usz);margin:0 6px;outline:none;position:relative}.tp-sldv_t::before{background-color:var(--in-bg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin:auto;position:absolute;right:0;top:0}.tp-sldv_k{height:100%;left:0;position:absolute;top:0}.tp-sldv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";display:block;height:2px;left:0;margin-bottom:auto;margin-top:auto;position:absolute;right:0;top:0}.tp-sldv_k::after{background-color:var(--btn-bg);border-radius:var(--bld-br);bottom:0;content:"";display:block;height:12px;margin-bottom:auto;margin-top:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldv_t:hover .tp-sldv_k::after{background-color:var(--btn-bg-h)}.tp-sldv_t:focus .tp-sldv_k::after{background-color:var(--btn-bg-f)}.tp-sldv_t:active .tp-sldv_k::after{background-color:var(--btn-bg-a)}.tp-sldtxtv{display:flex}.tp-sldtxtv_s{flex:2}.tp-sldtxtv_t{flex:1;margin-left:4px}.tp-tabv{position:relative}.tp-tabv_t{align-items:flex-end;color:var(--cnt-bg);display:flex;overflow:hidden;position:relative}.tp-tabv_t:hover{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus){color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active){color:var(--cnt-bg-a)}.tp-tabv_t::before{background-color:currentColor;bottom:0;content:"";height:2px;left:0;pointer-events:none;position:absolute;right:0}.tp-tabv.tp-v-disabled .tp-tabv_t::before{opacity:.5}.tp-tabv.tp-tabv-nop .tp-tabv_t{height:calc(var(--cnt-usz) + 4px);position:relative}.tp-tabv.tp-tabv-nop .tp-tabv_t::before{background-color:var(--cnt-bg);bottom:0;content:"";height:2px;left:0;position:absolute;right:0}.tp-tabv_i{bottom:0;color:var(--cnt-bg);left:0;overflow:hidden;position:absolute;top:calc(var(--cnt-usz) + 4px);width:max(var(--bs-br),4px)}.tp-tabv_i::before{background-color:currentColor;bottom:0;content:"";left:0;position:absolute;top:0;width:4px}.tp-tabv_t:hover+.tp-tabv_i{color:var(--cnt-bg-h)}.tp-tabv_t:has(*:focus)+.tp-tabv_i{color:var(--cnt-bg-f)}.tp-tabv_t:has(*:active)+.tp-tabv_i{color:var(--cnt-bg-a)}.tp-tabv.tp-v-disabled>.tp-tabv_i{opacity:.5}.tp-tbiv{flex:1;min-width:0;position:relative}.tp-tbiv+.tp-tbiv{margin-left:2px}.tp-tbiv+.tp-tbiv.tp-v-disabled::before{opacity:.5}.tp-tbiv_b{display:block;padding-left:calc(var(--cnt-hp) + 4px);padding-right:calc(var(--cnt-hp) + 4px);position:relative;width:100%}.tp-tbiv_b:disabled{opacity:.5}.tp-tbiv_b::before{background-color:var(--cnt-bg);bottom:2px;content:"";left:0;pointer-events:none;position:absolute;right:0;top:0}.tp-tbiv_b:hover::before{background-color:var(--cnt-bg-h)}.tp-tbiv_b:focus::before{background-color:var(--cnt-bg-f)}.tp-tbiv_b:active::before{background-color:var(--cnt-bg-a)}.tp-tbiv_t{color:var(--cnt-fg);height:calc(var(--cnt-usz) + 4px);line-height:calc(var(--cnt-usz) + 4px);opacity:.5;overflow:hidden;position:relative;text-overflow:ellipsis}.tp-tbiv.tp-tbiv-sel .tp-tbiv_t{opacity:1}.tp-tbpv_c{padding-bottom:var(--cnt-vp);padding-left:4px;padding-top:var(--cnt-vp)}.tp-txtv{position:relative}.tp-txtv_i{padding-left:var(--bld-hp);padding-right:var(--bld-hp)}.tp-txtv.tp-txtv-fst .tp-txtv_i{border-bottom-right-radius:0;border-top-right-radius:0}.tp-txtv.tp-txtv-mid .tp-txtv_i{border-radius:0}.tp-txtv.tp-txtv-lst .tp-txtv_i{border-bottom-left-radius:0;border-top-left-radius:0}.tp-txtv.tp-txtv-num .tp-txtv_i{text-align:right}.tp-txtv.tp-txtv-drg .tp-txtv_i{opacity:.3}.tp-txtv_k{cursor:pointer;height:100%;left:calc(var(--bld-hp) - 5px);position:absolute;top:0;width:12px}.tp-txtv_k::before{background-color:var(--in-fg);border-radius:1px;bottom:0;content:"";height:calc(var(--cnt-usz) - 4px);left:50%;margin-bottom:auto;margin-left:-1px;margin-top:auto;opacity:.1;position:absolute;top:0;transition:border-radius .1s,height .1s,transform .1s,width .1s;width:2px}.tp-txtv_k:hover::before,.tp-txtv.tp-txtv-drg .tp-txtv_k::before{opacity:1}.tp-txtv.tp-txtv-drg .tp-txtv_k::before{border-radius:50%;height:4px;transform:translateX(-1px);width:4px}.tp-txtv_g{bottom:0;display:block;height:8px;left:50%;margin:auto;overflow:visible;pointer-events:none;position:absolute;top:0;visibility:hidden;width:100%}.tp-txtv.tp-txtv-drg .tp-txtv_g{visibility:visible}.tp-txtv_gb{fill:none;stroke:var(--in-fg);stroke-dasharray:1}.tp-txtv_gh{fill:none;stroke:var(--in-fg)}.tp-txtv .tp-ttv{margin-left:6px;visibility:hidden}.tp-txtv.tp-txtv-drg .tp-ttv{visibility:visible}.tp-ttv{background-color:var(--in-fg);border-radius:var(--bld-br);color:var(--bs-bg);padding:2px 4px;pointer-events:none;position:absolute;transform:translate(-50%, -100%)}.tp-ttv::before{border-color:var(--in-fg) rgba(0,0,0,0) rgba(0,0,0,0) rgba(0,0,0,0);border-style:solid;border-width:2px;box-sizing:border-box;content:"";font-size:.9em;height:4px;left:50%;margin-left:-2px;position:absolute;top:100%;width:4px}.tp-rotv{background-color:var(--bs-bg);border-radius:var(--bs-br);box-shadow:0 2px 4px var(--bs-sh);font-family:var(--bs-ff);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br);border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br);padding-left:calc(4px + var(--cnt-usz) + var(--cnt-hp));text-align:center}.tp-rotv.tp-rotv-expanded .tp-rotv_b{border-bottom-left-radius:0;border-bottom-right-radius:0;transition-delay:0s;transition-duration:0s}.tp-rotv.tp-rotv-not>.tp-rotv_b{display:none}.tp-rotv_b:disabled .tp-rotv_m{display:none}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst>.tp-fldv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-fldv.tp-v-lst.tp-fldv-expanded>.tp-fldv_b{transition-delay:0s;transition-duration:0s}.tp-rotv_c .tp-fldv.tp-v-vlst:not(.tp-fldv-expanded)>.tp-fldv_b{border-bottom-right-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst{margin-top:calc(-1*var(--cnt-vp))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-fldv.tp-v-fst>.tp-fldv_b{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_c{border-bottom-left-radius:var(--bs-br);border-bottom-right-radius:var(--bs-br)}.tp-rotv_c>.tp-tabv.tp-v-lst>.tp-tabv_i{border-bottom-left-radius:var(--bs-br)}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst{margin-top:calc(-1*var(--cnt-vp))}.tp-rotv.tp-rotv-not .tp-rotv_c>.tp-tabv.tp-v-fst>.tp-tabv_t{border-top-left-radius:var(--bs-br);border-top-right-radius:var(--bs-br)}.tp-rotv.tp-v-disabled,.tp-rotv .tp-v-disabled{pointer-events:none}.tp-rotv.tp-v-hidden,.tp-rotv .tp-v-hidden{display:none}.tp-sprv_r{background-color:var(--grv-fg);border-width:0;display:block;height:2px;margin:0;width:100%}.tp-sprv.tp-v-disabled .tp-sprv_r{opacity:.5}',plugins:[jE,JE,QE,gd,tM]})}}new md("4.0.3");function iM(n,t){const e=new Zd({title:"Parameters"}),i=rM(n),r=e.element.parentElement,s=new Map;r&&(r.style.top="inherit",r.style.bottom="0px",r.style.width="300px"),s.set("root",e),Object.entries(n).forEach(([o,a])=>{var l;a.folder&&!s.get(a.folder)&&s.set(a.folder,e.addFolder({title:a.folder})),(l=s.get(a.folder??"root"))==null||l.addBinding(i,o,{min:a.min||0,max:a.max||50,step:a.step||.5,label:a.label||o})}),e.on("change",o=>t==null?void 0:t(o))}const rM=n=>Object.entries(n).reduce((t,[e,i])=>(t[e]=i.value,t),{});function sM(n){const t=new Zd({title:"Settings",expanded:!1}),e=t.element.parentElement;e&&(e.style.top="0px",e.style.bottom="inherit",e.style.left="8px",e.style.width="300px"),t.addBinding(n.displayScale,"val",{label:"Display scale",min:-10,max:10,step:1}),t.addBinding(n.nodes,"val",{label:"Nodes"}),t.addBinding(n.elements,"val",{label:"Elements"}),t.addBinding(n.nodesIndexes,"val",{label:"Nodes indexes"}),t.addBinding(n.elementsIndexes,"val",{label:"Elements indexes"}),t.addBinding(n.orientations,"val",{label:"Orientations"}),t.addBinding(n.supports,"val",{label:"Supports"}),t.addBinding(n.loads,"val",{label:"Loads"}),t.addBinding(n.deformedShape,"val",{label:"Deformed shape"}),t.addBinding(n.elementResults,"val",{options:{none:"none",normal:"normal",shearY:"shearY",shearZ:"shearZ",torsion:"torsion",bendingY:"bendingY",bendingZ:"bendingZ"},label:"Element results"}),t.addBinding(n.nodeResults,"val",{options:{none:"none",deformation:"deformation",reaction:"reaction"},label:"Node results"})}function oM(n){const t={elasticities:new Map,areas:new Map,loads:new Map,supports:new Map,momentOfInertiaZs:new Map,momentOfInertiaYs:new Map,shearModuluses:new Map,torsionalConstants:new Map,distributedLoads:new Map};return n.forEach(e=>{"area"in e&&t.areas.set(e.element,e.area),"elasticity"in e&&t.elasticities.set(e.element,e.elasticity),"load"in e&&t.loads.set(e.node,e.load),"support"in e&&t.supports.set(e.node,e.support),"momentOfInertiaZ"in e&&t.momentOfInertiaZs.set(e.element,e.momentOfInertiaZ),"momentOfInertiaY"in e&&t.momentOfInertiaYs.set(e.element,e.momentOfInertiaY),"torsionalConstant"in e&&t.torsionalConstants.set(e.element,e.torsionalConstant),"shearModulus"in e&&t.shearModuluses.set(e.element,e.shearModulus),"distributedLoad"in e&&t.distributedLoads.set(e.element,e.distributedLoad)}),t}function aM(n){const t={normal:new Map,shearY:new Map,shearZ:new Map,torsion:new Map,bendingY:new Map,bendingZ:new Map,deformation:new Map,reaction:new Map};return n.default.forEach(e=>{"normal"in e&&t.normal.set(e.element,e.normal),"shearY"in e&&t.shearY.set(e.element,e.shearY),"shearZ"in e&&t.shearZ.set(e.element,e.shearZ),"torsion"in e&&t.torsion.set(e.element,e.torsion),"bendingY"in e&&t.bendingY.set(e.element,e.bendingY),"bendingZ"in e&&t.bendingZ.set(e.element,e.bendingZ),"deformation"in e&&t.deformation.set(e.node,e.deformation),"reaction"in e&&t.reaction.set(e.node,e.reaction)}),t}function uM({parameters:n,onParameterChange:t,settings:e}){const i=t==null?void 0:t(n??{}),r=kt.state($u(i)),s={gridSize:kt.state((e==null?void 0:e.gridSize)??20),displayScale:kt.state((e==null?void 0:e.displayScale)??1),nodes:kt.state((e==null?void 0:e.nodes)??!0),elements:kt.state((e==null?void 0:e.elements)??!0),nodesIndexes:kt.state((e==null?void 0:e.nodesIndexes)??!1),elementsIndexes:kt.state((e==null?void 0:e.elementsIndexes)??!1),orientations:kt.state((e==null?void 0:e.orientations)??!1),supports:kt.state((e==null?void 0:e.supports)??!0),loads:kt.state((e==null?void 0:e.loads)??!0),deformedShape:kt.state((e==null?void 0:e.deformedShape)??!1),elementResults:kt.state((e==null?void 0:e.elementResults)??"none"),nodeResults:kt.state((e==null?void 0:e.nodeResults)??"none")};Ox(r,s),sM(s),n&&t&&iM(n,o=>{n[o.target.key].value=o.value,r.val=$u(t(n))})}const $u=n=>({nodes:(n==null?void 0:n.nodes)??[],elements:(n==null?void 0:n.elements)??[],assignments:oM((n==null?void 0:n.assignments)??[]),analysisResults:aM((n==null?void 0:n.analysisResults)??{default:[]})});export{uM as a};
