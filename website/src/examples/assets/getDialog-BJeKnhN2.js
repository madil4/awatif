import{E as v,v as _,e as m,x as y}from"./styles-Di8iHUIQ.js";/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const g=t=>t.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y={CHILD:2},C=t=>(...e)=>({_$litDirective$:t,values:e});class w{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,s,i){this._$Ct=e,this._$AM=s,this._$Ci=i}_$AS(e,s){return this.update(e,s)}update(e,s){return this.render(...s)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l=(t,e)=>{var i;const s=t._$AN;if(s===void 0)return!1;for(const n of s)(i=n._$AO)==null||i.call(n,e,!1),l(n,e);return!0},c=t=>{let e,s;do{if((e=t._$AM)===void 0)break;s=e._$AN,s.delete(t),t=e}while((s==null?void 0:s.size)===0)},p=t=>{for(let e;e=t._$AM;t=e){let s=e._$AN;if(s===void 0)e._$AN=s=new Set;else if(s.has(t))break;s.add(t),H(e)}};function z(t){this._$AN!==void 0?(c(this),this._$AM=t,p(this)):this._$AM=t}function b(t,e=!1,s=0){const i=this._$AH,n=this._$AN;if(n!==void 0&&n.size!==0)if(e)if(Array.isArray(i))for(let o=s;o<i.length;o++)l(i[o],!1),c(i[o]);else i!=null&&(l(i,!1),c(i));else l(this,t)}const H=t=>{t.type==Y.CHILD&&(t._$AP??(t._$AP=b),t._$AQ??(t._$AQ=z))};class M extends w{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,s,i){super._$AT(e,s,i),p(this),this.isConnected=e._$AU}_$AO(e,s=!0){var i,n;e!==this.isConnected&&(this.isConnected=e,e?(i=this.reconnected)==null||i.call(this):(n=this.disconnected)==null||n.call(this)),s&&(l(this,e),c(this))}setValue(e){if(g(this._$Ct))this._$Ct._$AI(e,this);else{const s=[...this._$Ct._$AH];s[this._$Ci]=e,this._$Ct._$AI(s,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const x=()=>new E;class E{}const d=new WeakMap,L=C(class extends M{render(t){return v}update(t,[e]){var i;const s=e!==this.Y;return s&&this.Y!==void 0&&this.rt(void 0),(s||this.lt!==this.ct)&&(this.Y=e,this.ht=(i=t.options)==null?void 0:i.host,this.rt(this.ct=t.element)),v}rt(t){if(this.isConnected||(t=void 0),typeof this.Y=="function"){const e=this.ht??globalThis;let s=d.get(e);s===void 0&&(s=new WeakMap,d.set(e,s)),s.get(this.Y)!==void 0&&this.Y.call(this.ht,void 0),s.set(this.Y,t),t!==void 0&&this.Y.call(this.ht,t)}else this.Y.value=t}get lt(){var t,e;return typeof this.Y=="function"?(t=d.get(this.ht??globalThis))==null?void 0:t.get(this.Y):(e=this.Y)==null?void 0:e.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});function D({dialogBody:t}){const e=document.createElement("div"),s=x();function i(){return y`
      <dialog ref=${L(s)}>
        <div class="dialog-header">
          <span class="close" @click=${n}>&times;</span>
        </div>

        <div class="dialog-body">${t.val}</div>

        <div class="resize-handle resize-handle-right"></div>
        <div class="resize-handle resize-handle-top"></div>
      </dialog>
    `}e.id="dialog",_.derive(()=>{m(i(),e)}),_.derive(()=>{var o;t.val&&((o=s.value)==null||o.show())});function n(){var o;(o=s.value)==null||o.close(),t.val=void 0}return N(s.value),e}function N(t){if(!t)return;const e=t.querySelector(".resize-handle-right"),s=t.querySelector(".resize-handle-top");let i=!1,n=0,o=0,a=0,u=0,$=0;e.addEventListener("mousedown",r=>{i=!0,n=r.clientX,a=t.offsetWidth,document.body.style.cursor="ew-resize",r.preventDefault()}),s.addEventListener("mousedown",r=>{i=!0,o=r.clientY,u=t.offsetHeight,$=parseFloat(getComputedStyle(t).top)||0,document.body.style.cursor="ns-resize",r.preventDefault()}),document.addEventListener("mousemove",r=>{if(i){if(document.body.style.cursor==="ew-resize"){const h=a+(r.clientX-n);t.style.width=`${h}px`}if(document.body.style.cursor==="ns-resize"){const h=r.clientY-o,f=u-h,A=$+h;f>100&&(t.style.height=`${f}px`,t.style.top=`${A}px`)}}}),document.addEventListener("mouseup",()=>{i=!1,document.body.style.cursor="default"})}export{D as g};
