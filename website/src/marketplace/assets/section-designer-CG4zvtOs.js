import{B as I,V as m,I as xe,F as ee,b as F,c as U,W as we,S as re,d as Se,U as ae,e as T,f as be,g as C,M as _e,L as Me,h as N,i as O,j as Ae,R as Ee,k as le,n as V,o as ze,a as B,l as Ue,t as Be,m as De,s as Le,p as Pe,v as Te}from"./marketing-DnbxWB1_.js";const te=new I,D=new m;class ce extends xe{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],n=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new ee(e,3)),this.setAttribute("uv",new ee(n,2))}applyMatrix4(e){const n=this.attributes.instanceStart,i=this.attributes.instanceEnd;return n!==void 0&&(n.applyMatrix4(e),i.applyMatrix4(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));const i=new F(n,6,1);return this.setAttribute("instanceStart",new U(i,3,0)),this.setAttribute("instanceEnd",new U(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));const i=new F(n,6,1);return this.setAttribute("instanceColorStart",new U(i,3,0)),this.setAttribute("instanceColorEnd",new U(i,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new we(e.geometry)),this}fromLineSegments(e){const n=e.geometry;return this.setPositions(n.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new I);const e=this.attributes.instanceStart,n=this.attributes.instanceEnd;e!==void 0&&n!==void 0&&(this.boundingBox.setFromBufferAttribute(e),te.setFromBufferAttribute(n),this.boundingBox.union(te))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new re),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,n=this.attributes.instanceEnd;if(e!==void 0&&n!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let t=0;for(let r=0,a=e.count;r<a;r++)D.fromBufferAttribute(e,r),t=Math.max(t,i.distanceToSquared(D)),D.fromBufferAttribute(n,r),t=Math.max(t,i.distanceToSquared(D));this.boundingSphere.radius=Math.sqrt(t),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}T.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Se(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};C.line={uniforms:ae.merge([T.common,T.fog,T.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class q extends be{constructor(e){super({type:"LineMaterial",uniforms:ae.clone(C.line.uniforms),vertexShader:C.line.vertexShader,fragmentShader:C.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const ne=new m,ie=new m,d=new O,f=new O,v=new O,G=new m,R=new _e,u=new Me,oe=new m,L=new I,P=new re,y=new O;let g,M;function se(o,e,n){return y.set(0,0,-e,1).applyMatrix4(o.projectionMatrix),y.multiplyScalar(1/y.w),y.x=M/n.width,y.y=M/n.height,y.applyMatrix4(o.projectionMatrixInverse),y.multiplyScalar(1/y.w),Math.abs(Math.max(y.x,y.y))}function Ce(o,e){const n=o.matrixWorld,i=o.geometry,t=i.attributes.instanceStart,r=i.attributes.instanceEnd,a=Math.min(i.instanceCount,t.count);for(let s=0,l=a;s<l;s++){u.start.fromBufferAttribute(t,s),u.end.fromBufferAttribute(r,s),u.applyMatrix4(n);const h=new m,p=new m;g.distanceSqToSegment(u.start,u.end,p,h),p.distanceTo(h)<M*.5&&e.push({point:p,pointOnLine:h,distance:g.origin.distanceTo(p),object:o,face:null,faceIndex:s,uv:null,uv1:null})}}function Ie(o,e,n){const i=e.projectionMatrix,r=o.material.resolution,a=o.matrixWorld,s=o.geometry,l=s.attributes.instanceStart,h=s.attributes.instanceEnd,p=Math.min(s.instanceCount,l.count),c=-e.near;g.at(1,v),v.w=1,v.applyMatrix4(e.matrixWorldInverse),v.applyMatrix4(i),v.multiplyScalar(1/v.w),v.x*=r.x/2,v.y*=r.y/2,v.z=0,G.copy(v),R.multiplyMatrices(e.matrixWorldInverse,a);for(let x=0,j=p;x<j;x++){if(d.fromBufferAttribute(l,x),f.fromBufferAttribute(h,x),d.w=1,f.w=1,d.applyMatrix4(R),f.applyMatrix4(R),d.z>c&&f.z>c)continue;if(d.z>c){const A=d.z-f.z,_=(d.z-c)/A;d.lerp(f,_)}else if(f.z>c){const A=f.z-d.z,_=(f.z-c)/A;f.lerp(d,_)}d.applyMatrix4(i),f.applyMatrix4(i),d.multiplyScalar(1/d.w),f.multiplyScalar(1/f.w),d.x*=r.x/2,d.y*=r.y/2,f.x*=r.x/2,f.y*=r.y/2,u.start.copy(d),u.start.z=0,u.end.copy(f),u.end.z=0;const Q=u.closestPointToPointParameter(G,!0);u.at(Q,oe);const Z=Ae.lerp(d.z,f.z,Q),ye=Z>=-1&&Z<=1,ge=G.distanceTo(oe)<M*.5;if(ye&&ge){u.start.fromBufferAttribute(l,x),u.end.fromBufferAttribute(h,x),u.start.applyMatrix4(a),u.end.applyMatrix4(a);const A=new m,_=new m;g.distanceSqToSegment(u.start,u.end,_,A),n.push({point:_,pointOnLine:A,distance:g.origin.distanceTo(_),object:o,face:null,faceIndex:x,uv:null,uv1:null})}}}class Oe extends N{constructor(e=new ce,n=new q({color:Math.random()*16777215})){super(e,n),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,n=e.attributes.instanceStart,i=e.attributes.instanceEnd,t=new Float32Array(2*n.count);for(let a=0,s=0,l=n.count;a<l;a++,s+=2)ne.fromBufferAttribute(n,a),ie.fromBufferAttribute(i,a),t[s]=s===0?0:t[s-1],t[s+1]=t[s]+ne.distanceTo(ie);const r=new F(t,2,1);return e.setAttribute("instanceDistanceStart",new U(r,1,0)),e.setAttribute("instanceDistanceEnd",new U(r,1,1)),this}raycast(e,n){const i=this.material.worldUnits,t=e.camera;t===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;g=e.ray;const a=this.matrixWorld,s=this.geometry,l=this.material;M=l.linewidth+r,s.boundingSphere===null&&s.computeBoundingSphere(),P.copy(s.boundingSphere).applyMatrix4(a);let h;if(i)h=M*.5;else{const c=Math.max(t.near,P.distanceToPoint(g.origin));h=se(t,c,l.resolution)}if(P.radius+=h,g.intersectsSphere(P)===!1)return;s.boundingBox===null&&s.computeBoundingBox(),L.copy(s.boundingBox).applyMatrix4(a);let p;if(i)p=M*.5;else{const c=Math.max(t.near,L.distanceToPoint(g.origin));p=se(t,c,l.resolution)}L.expandByScalar(p),g.intersectsBox(L)!==!1&&(i?Ce(this,n):Ie(this,t,n))}}class de extends ce{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const n=e.length-3,i=new Float32Array(2*n);for(let t=0;t<n;t+=3)i[2*t]=e[t],i[2*t+1]=e[t+1],i[2*t+2]=e[t+2],i[2*t+3]=e[t+3],i[2*t+4]=e[t+4],i[2*t+5]=e[t+5];return super.setPositions(i),this}setColors(e){const n=e.length-3,i=new Float32Array(2*n);for(let t=0;t<n;t+=3)i[2*t]=e[t],i[2*t+1]=e[t+1],i[2*t+2]=e[t+2],i[2*t+3]=e[t+3],i[2*t+4]=e[t+4],i[2*t+5]=e[t+5];return super.setColors(i),this}fromLine(e){const n=e.geometry;return this.setPositions(n.attributes.position.array),this}}class je extends Oe{constructor(e=new de,n=new q({color:Math.random()*16777215})){super(e,n),this.isLine2=!0,this.type="Line2"}}const k=1e5;function We(o){const e=fe(o),[n,i]=Ge(o),[t,r]=ue(o);return[Math.round(e),Math.round(n),Math.round(i),Math.round(t),Math.round(r)]}function fe(o){const e=$(o),{basePoint:n,xDomain:i,yDomain:t}=X(e),r=Y(n,i,t,k),a=J(r,e),s=i*t;return a.length/r.length*s}function Ge(o){const e=$(o),{basePoint:n,xDomain:i,yDomain:t}=X(e),r=Y(n,i,t,k),a=J(r,e),s=fe(o),[l,h]=ue(o);let p=0,c=0;a.forEach(W=>{p+=(W[1]-h)**2,c+=(W[0]-l)**2});const x=p/a.length*s,j=c/a.length*s;return[x,j]}function ue(o){const e=$(o),{basePoint:n,xDomain:i,yDomain:t}=X(e),r=Y(n,i,t,k),a=J(r,e);let s=0,l=0;a.forEach(c=>{s+=c[0],l+=c[1]});const h=s/a.length,p=l/a.length;return[h,p]}function X(o){const e=new I().setFromObject(o),n=e.max.sub(e.min);return{basePoint:e.min.toArray(),xDomain:n.x,yDomain:n.y}}function Y(o,e,n,i){const t=[];for(let r=0;r<i;r++)t.push([o[0]+Math.random()*e,o[1]+Math.random()*n,0]);return t}function J(o,e){const n=new Ee;return o.filter(t=>(n.set(new m(...t),new m(0,0,-1)),n.intersectObject(e).length))}function $(o){const e=new le,n=o[0];e.moveTo(n[0],n[1]);for(const i of o.slice(1))e.lineTo(i[0],i[1]);return new N(new V(e))}function Re(o,e,n=0){const i=[];for(let t=0;t<o.length;t+=2){const r=o[t],a=o[t+1];let s=[n,n,n];s[e.x]=r,s[e.y]=a,i.push(s)}return i.flat()}const S=165,b=10.2,E=201,z=6.2,w=B.state([[0,0],[S,0],[S,b],[(S-z)/2+z,b],[(S-z)/2+z,E-b],[S,E-b],[S,E],[0,E],[0,E-b],[(S-z)/2,E-b],[(S-z)/2,b],[0,b],[0,0]]),pe=B.state([[10,1e3,100]]),he=B.state([[0,0,0,0,0]]),me=new je(new de,new q({color:"#c5d62f",linewidth:7.5,alphaToCoverage:!1})),ve=new N(new V,new ze({color:"#046b58"})),H=B.state([me,ve]),K=new Map;K.set("SectionGeometry",{text:"Section Geometry",data:w,fields:[{field:"A",text:"X-coordinate",editable:{type:"float"}},{field:"B",text:"Y-coordinate",editable:{type:"float"}}]});K.set("MaterialProperties",{text:"Material Properties",data:pe,fields:[{field:"A",text:"Modulus of Elasticity",editable:{type:"float"}},{field:"B",text:"Shear Modulus",editable:{type:"float"}},{field:"C",text:"Mass Density",editable:{type:"float"}}]});const Fe=({sheet:o,data:e})=>{o=="SectionGeometry"?w.val=e:o=="MaterialProperties"&&(pe.val=e)};B.derive(()=>{me.geometry.setPositions(Re(w.val.flat(),{x:0,y:1}));const o=new le;o.moveTo(w.val[0][0],w.val[0][1]);for(var e=1;e<w.val.length;++e)o.lineTo(w.val[e][0],w.val[e][1]);ve.geometry=new V(o),H.val=[...H.rawVal]});B.derive(()=>{he.val=[We(w.val)]});document.body.append(Ue({topLeft:{element:Be("Section Designer")},topRight:{element:De({})},main:{element:Le({sheets:K,onChange:Fe}),title:"Inputs"},preview:{element:Pe({fields:[{field:"A",text:"Area"},{field:"B",text:"Ixx"},{field:"C",text:"Iyy"},{field:"D",text:"Centroid X"},{field:"E",text:"Centroid Y"}],data:he}),title:"Output"},right:{element:Te({objects3D:H,settingsObj:{gridSize:300}})}}));
