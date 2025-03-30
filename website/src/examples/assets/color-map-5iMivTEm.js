import{v as u,C as h,L as d,M as y,a as B,B as V,b as E,D as k,F as w,U as D,g as L}from"./styles-BT9ucHwM.js";import{g as S}from"./getParameters-BYp-3p_e.js";import{g as A}from"./getToolbar-CO4pQWZZ.js";import{m as T}from"./mesh-loiMPpJK.js";import{n as H,s as N}from"./pureFunctionsAny.generated-BITz6FsS.js";import"./complex-i8qiIvCl.js";function R(o,t=8){const e=document.createElement("div");e.id="legend";const i=Array.from({length:t+1},(n,r)=>r/t).reverse();let a,s;return i.forEach((n,r)=>{a=document.createElement("div"),a.id=`marker-${r}`,a.className="marker",a.style.marginTop=r==0?"0px":`calc(${50/t}vh - 1px)`,s=document.createElement("p"),s.id=`marker-text-${r}`,a.append(s),e.append(a)}),setTimeout(()=>{u.derive(()=>{i.forEach((n,r)=>{s=document.getElementById(`marker-text-${r}`),s.innerText=$(o.val,n).toString()})})}),e}function $(o,t){const e=Math.max(...o)-Math.min(...o);return(Math.min(...o)+t*e).toPrecision(3)}class j{constructor(t,e=32){this.isLut=!0,this.lut=[],this.map=[],this.n=0,this.minV=0,this.maxV=1,this.setColorMap(t,e)}set(t){return t.isLut===!0&&this.copy(t),this}setMin(t){return this.minV=t,this}setMax(t){return this.maxV=t,this}setColorMap(t,e=32){this.map=g[t]||g.rainbow,this.n=e;const i=1/this.n,a=new h,s=new h;this.lut.length=0,this.lut.push(new h(this.map[0][1]));for(let n=1;n<e;n++){const r=n*i;for(let m=0;m<this.map.length-1;m++)if(r>this.map[m][0]&&r<=this.map[m+1][0]){const c=this.map[m][0],p=this.map[m+1][0];a.setHex(this.map[m][1],d),s.setHex(this.map[m+1][1],d);const l=new h().lerpColors(a,s,(r-c)/(p-c));this.lut.push(l)}}return this.lut.push(new h(this.map[this.map.length-1][1])),this}copy(t){return this.lut=t.lut,this.map=t.map,this.n=t.n,this.minV=t.minV,this.maxV=t.maxV,this}getColor(t){t=y.clamp(t,this.minV,this.maxV),t=(t-this.minV)/(this.maxV-this.minV);const e=Math.round(t*this.n);return this.lut[e]}addColorMap(t,e){return g[t]=e,this}createCanvas(){const t=document.createElement("canvas");return t.width=1,t.height=this.n,this.updateCanvas(t),t}updateCanvas(t){const e=t.getContext("2d",{alpha:!1}),i=e.getImageData(0,0,1,this.n),a=i.data;let s=0;const n=1/this.n,r=new h,m=new h,c=new h;for(let p=1;p>=0;p-=n)for(let l=this.map.length-1;l>=0;l--)if(p<this.map[l][0]&&p>=this.map[l-1][0]){const C=this.map[l-1][0],v=this.map[l][0];r.setHex(this.map[l-1][1],d),m.setHex(this.map[l][1],d),c.lerpColors(r,m,(p-C)/(v-C)),a[s*4]=Math.round(c.r*255),a[s*4+1]=Math.round(c.g*255),a[s*4+2]=Math.round(c.b*255),a[s*4+3]=255,s+=1}return e.putImageData(i,0,0),t}}const g={rainbow:[[0,255],[.2,65535],[.5,65280],[.8,16776960],[1,16711680]],cooltowarm:[[0,3952322],[.2,10206463],[.5,14474460],[.8,16163717],[1,11797542]],blackbody:[[0,0],[.2,7864320],[.5,15086080],[.8,16776960],[1,16777215]],grayscale:[[0,0],[.2,4210752],[.5,8355712],[.8,12566463],[1,16777215]]};function G(o,t,e){const i=new j,a=new h,s=new B(new V,new E({side:k,vertexColors:!0}));i.setColorMap("rainbow"),s.renderOrder=-1,s.geometry.setAttribute("position",new w(o.flat(),3)),s.geometry.setIndex(new D(t.flat(),1)),s.geometry.setAttribute("color",new w(o.map(()=>[0,0,0]).flat(),3)),i.setMax(Math.max(...e)),i.setMin(Math.min(...e));for(let n=0;n<e.length;n++)a.copy(i.getColor(e[n])).convertSRGBToLinear(),a.multiplyScalar(.6),s.geometry.attributes.color.setXYZ(n,a.r,a.g,a.b);return s}const b={boundary:{value:u.state(10),min:1,max:10,step:.1,label:"Boundary point"}},x=u.state([]),F=u.state([]),M=u.state([]),f=u.state([]);u.derive(()=>{const o=[b.boundary.value.val,0,3],{nodes:t,elements:e}=T({points:[[0,0,0],[5,0,0],o,[8,0,7],[15,0,5],[15,0,0],[20,0,0],[20,0,10],[0,0,10],[0,0,0]],polygon:[0,1,2,3,4,5,6,7,8],maxMeshSize:1});x.val=t.val,F.val=e.val,f.val=P(o,x.val),M.val=[G(x.val,F.val,f.val)]});document.body.append(S(b),L({structure:{nodes:x,elements:F},objects3D:M}),R(f),A({sourceCode:"https://github.com/madil4/awatif/blob/main/examples/src/color-map/main.ts",author:"https://www.linkedin.com/in/siu-kai-cheung/"}));function P(o,t){return t.map(e=>H(N(e,o)))}
