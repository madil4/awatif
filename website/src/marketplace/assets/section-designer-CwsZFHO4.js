import{B as T,R as j,V as B,S as _,M as E,b as D,L,c as X,d as z,e as F,D as H,P as q,f as U,a as f,F as I,l as V,t as J,m as K,s as Q,g as W,v as $,k as Z}from"./marketing-5hBvl2jc.js";function k(t,e,n,r,o){if(n(t)*n(e)>=0)return null;let i=t,s=0;for(;e-t>=r&&s<o&&(i=(t+e)/2,n(i)!=0);)n(t)*n(i)<0?e=i:t=i,s++;return i}const tt=1e5;function et(t){const e=g(t),[n,r]=b(t),[o,i]=N(t),[s,a]=it(t),{Sxt:l,Sxb:M,Syt:w,Syb:p}=rt(t),[d,m]=st(t),[S,P]=at(t,d,m);return{area:Math.round(e),Ixx:Math.round(n),Iyy:Math.round(r),centroid_x:Math.round(o),centroid_y:Math.round(i),rx:Math.round(s),ry:Math.round(a),Sxt:Math.round(l),Sxb:Math.round(M),Syt:Math.round(w),Syb:Math.round(p),PNAx:Math.round(d*100)/100,PNAy:Math.round(m*100)/100,Zxp:Math.round(S),Zyp:Math.round(P)}}function nt(t){return t.pointsInMesh.map(e=>[e[0],e[1]])}function ot(t){const e=ut(t),{basePoint:n,xDomain:r,yDomain:o}=lt(e),i=ct(n,r,o,tt),s=dt(i,e);return{mesh:e,basePoint:n,xDomain:r,yDomain:o,pointsInBox:i,pointsInMesh:s}}function g(t){const e=t.xDomain*t.yDomain;return t.pointsInMesh.length/t.pointsInBox.length*e}function b(t){const e=g(t),[n,r]=N(t);let o=0,i=0;t.pointsInMesh.forEach(l=>{o+=(l[1]-r)**2,i+=(l[0]-n)**2});const s=o/t.pointsInMesh.length*e,a=i/t.pointsInMesh.length*e;return[s,a]}function it(t){const e=g(t),[n,r]=b(t),o=Math.sqrt(n/e),i=Math.sqrt(r/e);return[o,i]}function rt(t){const[e,n]=b(t),[r,o]=N(t),i=t.basePoint[1]+t.yDomain-o,s=o-t.basePoint[1],a=t.basePoint[0]+t.xDomain-r,l=r-t.basePoint[0];return{Sxt:e/i,Sxb:e/s,Syt:n/a,Syb:n/l}}function st(t){function r(d,m){const[S,P]=ht(t.pointsInMesh,d,m);return(S-P)/t.pointsInMesh.length}const o=0,i=t.basePoint[o],s=t.basePoint[o]+t.xDomain,a=k(i,s,d=>r(d,o),.001*t.xDomain,100),l=1,M=t.basePoint[l],w=t.basePoint[l]+t.yDomain,p=k(M,w,d=>r(d,l),.001*t.yDomain,100);return[a,p]}function at(t,e,n){const r=g(t);let o=0,i=0;t.pointsInMesh.forEach(l=>{o+=Math.abs(l[0]-e),i+=Math.abs(l[1]-n)});const s=i/t.pointsInMesh.length*r,a=o/t.pointsInMesh.length*r;return[s,a]}function N(t){let e=0,n=0;t.pointsInMesh.forEach(i=>{e+=i[0],n+=i[1]});const r=e/t.pointsInMesh.length,o=n/t.pointsInMesh.length;return[r,o]}function lt(t){const e=new T().setFromObject(t),n=e.max.sub(e.min);return{basePoint:e.min.toArray(),xDomain:n.x,yDomain:n.y}}function ct(t,e,n,r){const o=[];for(let i=0;i<r;i++)o.push([t[0]+Math.random()*e,t[1]+Math.random()*n,0]);return o}function dt(t,e){const n=new j;return t.filter(o=>(n.set(new B(...o),new B(0,0,-1)),n.intersectObject(e).length))}function ut(t){const e=new _,n=t[0];e.moveTo(n[0],n[1]);for(const r of t.slice(1))e.lineTo(r[0],r[1]);return new E(new D(e))}function ht(t,e,n){let r=0,o=0;return t.forEach(i=>{i[n]>e?r++:o++}),[r,o]}function C(t,e,n=0){const r=[];for(let o=0;o<t.length;o+=2){const i=t[o],s=t[o+1];let a=[n,n,n];a[e.x]=i,a[e.y]=s,r.push(a)}return r.flat()}function yt(t,e,n=!1){if(t.length==0)return[new Array(e).fill(0)];const r=t.map(o=>o.map(i=>i===""?0:Number(i)));return n?r.map(o=>o.map(i=>i<0?0:i)):r}const u=165,h=10.2,y=201,x=6.2,c=f.state([[0,0],[u,0],[u,h],[(u-x)/2+x,h],[(u-x)/2+x,y-h],[u,y-h],[u,y],[0,y],[0,y-h],[(u-x)/2,y-h],[(u-x)/2,h],[0,h],[0,0]]),xt=f.state({modulusOfElasticity:2e5,shearModulus:3e4,massDensity:200}),G=f.state({area:0,Ixx:0,Iyy:0,centroid_x:0,centroid_y:0,rx:0,ry:0,Sxt:0,Sxb:0,Syt:0,Syb:0,PNAx:0,PNAy:0,Zxp:0,Zyp:0}),O=new L(new X,new z({color:"#c5d62f"})),v=new E(new D,new F({visible:!1,side:H})),Y=new q(new X,new U({color:"#c5d62f"})),A=f.state([O,v,Y]),R=new Map;R.set("SectionGeometry",{text:"Section Geometry",data:c,fields:[{field:"A",text:"X-coordinate",editable:{type:"float"}},{field:"B",text:"Y-coordinate",editable:{type:"float"}}]});const ft=({sheet:t,data:e})=>{t=="SectionGeometry"?c.val=yt(e,2):t=="MaterialProperties"&&(xt.val={modulusOfElasticity:e[0][1],shearModulus:e[1][1],massDensity:e[2][1]})};f.derive(()=>{O.geometry.setAttribute("position",new I(C(c.val.flat(),{x:0,y:2}),3));const t=new _;t.moveTo(c.val[0][0],c.val[0][1]);for(var e=1;e<c.val.length;++e)t.lineTo(c.val[e][0],c.val[e][1]);v.geometry=new D(t),v.rotation.x=Math.PI/2;const n=ot(c.val);Y.geometry.setAttribute("position",new I(C(nt(n).flat(),{x:0,y:2}),3)),A.val=[...A.rawVal],G.val=et(n)});document.body.append(V({topLeft:{element:J("Section Designer")},topRight:{element:K({getStarted:mt(),author:gt()})},main:{element:Q({sheets:R,onChange:ft}),title:"Inputs"},preview:{element:W({fields:[{field:"A",text:"Parameter",size:"225px",editable:!1},{field:"B",text:"Value"},{field:"area",text:"Area"},{field:"Ixx",text:"Ixx"},{field:"Iyy",text:"Iyy"},{field:"centroid_x",text:"Centroid X"},{field:"centroid_y",text:"Centroid Y"},{field:"rx",text:"Radius of Gyration X"},{field:"ry",text:"Radius of Gyration Y"},{field:"Sxt",text:"Elastic Section Modulus X (Top)"},{field:"Sxb",text:"Elastic Section Modulus X (Bottom)"},{field:"Syt",text:"Elastic Section Modulus Y (Top)"},{field:"Syb",text:"Elastic Section Modulus Y (Bottom)"},{field:"PNAx",text:"Plastic Neutral Axis X"},{field:"PNAy",text:"Plastic Neutral Axis Y"},{field:"Zxp",text:"Plastic Section Modulus X"},{field:"Zyp",text:"Plastic Section Modulus Y"}],data:G}),title:"Output"},right:{element:$({objects3D:A,settingsObj:{gridSize:450}})}}));function mt(){return Z`<p>
      In this short video you will learn why we build the app and how to use it:
    </p>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/SDsDUmGxNXo?si=37wdyNkapXZcaDsD"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>`}function gt(){return Z`
    <div style="display: flex; align-items: center;">
      <img
        width="45%"
        style="border-radius: 10%; filter: grayscale(100%); margin-right: 1rem;"
        src="https://awatif.co/img/services/kaison.jpg"
      />
      <div style="flex: 1 1 auto;">
        <p style="line-height: 1.6">
          Hi, I'm Kaison Cheung, a
          <strong>structural engineering software developer</strong> with
          experience in concrete design. I specialize in
          <strong>creating BIM and design automation tools</strong>
          using Python, C#, and JavaScript, aimed at improving efficiency and
          precision in structural engineering workflows. My commitment to
          advancing the field goes beyond my job and own projects—I'm dedicated
          to fostering an open-source structural engineering community through
          Awatif, where I collaborate with others to develop innovative
          solutions for the industry.
        </p>

        <p>
          If you'd like to chat about structural engineering, software
          development, or anything else, feel free to connect with me on
          LinkedIn:
          <a href="https://www.linkedin.com/in/siu-kai-cheung/" target="_blank"
            >https://www.linkedin.com/in/siu-kai-cheung/</a
          >
        </p>
      </div>
    </div>
  `}
