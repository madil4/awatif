import{B as C,V as m,I as we,F as te,b as H,c as U,W as Se,S as ae,d as be,U as le,e as I,f as _e,g as O,M as Me,L as Ae,h as V,i as D,j as Ee,R as ze,k as ce,n as q,o as Ue,a as B,l as Be,t as De,m as Le,s as Pe,p as Te,v as Ie}from"./marketing-CWiThURo.js";const ne=new C,L=new m;class de extends we{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new te(e,3)),this.setAttribute("uv",new te(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const i=new H(t,6,1);return this.setAttribute("instanceStart",new U(i,3,0)),this.setAttribute("instanceEnd",new U(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const i=new H(t,6,1);return this.setAttribute("instanceColorStart",new U(i,3,0)),this.setAttribute("instanceColorEnd",new U(i,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new Se(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new C);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),ne.setFromBufferAttribute(t),this.boundingBox.union(ne))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ae),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let r=0,a=e.count;r<a;r++)L.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(L)),L.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(L));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}I.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new be(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};O.line={uniforms:le.merge([I.common,I.fog,I.line]),vertexShader:`
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
		`};class k extends _e{constructor(e){super({type:"LineMaterial",uniforms:le.clone(O.line.uniforms),vertexShader:O.line.vertexShader,fragmentShader:O.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const G=new D,ie=new m,oe=new m,d=new D,f=new D,v=new D,R=new m,F=new Me,u=new Ae,se=new m,P=new C,T=new ae,y=new D;let g,M;function re(o,e,t){return y.set(0,0,-e,1).applyMatrix4(o.projectionMatrix),y.multiplyScalar(1/y.w),y.x=M/t.width,y.y=M/t.height,y.applyMatrix4(o.projectionMatrixInverse),y.multiplyScalar(1/y.w),Math.abs(Math.max(y.x,y.y))}function Oe(o,e){const t=o.matrixWorld,i=o.geometry,n=i.attributes.instanceStart,r=i.attributes.instanceEnd,a=Math.min(i.instanceCount,n.count);for(let s=0,l=a;s<l;s++){u.start.fromBufferAttribute(n,s),u.end.fromBufferAttribute(r,s),u.applyMatrix4(t);const h=new m,p=new m;g.distanceSqToSegment(u.start,u.end,p,h),p.distanceTo(h)<M*.5&&e.push({point:p,pointOnLine:h,distance:g.origin.distanceTo(p),object:o,face:null,faceIndex:s,uv:null,uv1:null})}}function Ce(o,e,t){const i=e.projectionMatrix,r=o.material.resolution,a=o.matrixWorld,s=o.geometry,l=s.attributes.instanceStart,h=s.attributes.instanceEnd,p=Math.min(s.instanceCount,l.count),c=-e.near;g.at(1,v),v.w=1,v.applyMatrix4(e.matrixWorldInverse),v.applyMatrix4(i),v.multiplyScalar(1/v.w),v.x*=r.x/2,v.y*=r.y/2,v.z=0,R.copy(v),F.multiplyMatrices(e.matrixWorldInverse,a);for(let x=0,j=p;x<j;x++){if(d.fromBufferAttribute(l,x),f.fromBufferAttribute(h,x),d.w=1,f.w=1,d.applyMatrix4(F),f.applyMatrix4(F),d.z>c&&f.z>c)continue;if(d.z>c){const A=d.z-f.z,_=(d.z-c)/A;d.lerp(f,_)}else if(f.z>c){const A=f.z-d.z,_=(f.z-c)/A;f.lerp(d,_)}d.applyMatrix4(i),f.applyMatrix4(i),d.multiplyScalar(1/d.w),f.multiplyScalar(1/f.w),d.x*=r.x/2,d.y*=r.y/2,f.x*=r.x/2,f.y*=r.y/2,u.start.copy(d),u.start.z=0,u.end.copy(f),u.end.z=0;const Z=u.closestPointToPointParameter(R,!0);u.at(Z,se);const ee=Ee.lerp(d.z,f.z,Z),ge=ee>=-1&&ee<=1,xe=R.distanceTo(se)<M*.5;if(ge&&xe){u.start.fromBufferAttribute(l,x),u.end.fromBufferAttribute(h,x),u.start.applyMatrix4(a),u.end.applyMatrix4(a);const A=new m,_=new m;g.distanceSqToSegment(u.start,u.end,_,A),t.push({point:_,pointOnLine:A,distance:g.origin.distanceTo(_),object:o,face:null,faceIndex:x,uv:null,uv1:null})}}}class je extends V{constructor(e=new de,t=new k({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let a=0,s=0,l=t.count;a<l;a++,s+=2)ie.fromBufferAttribute(t,a),oe.fromBufferAttribute(i,a),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+ie.distanceTo(oe);const r=new H(n,2,1);return e.setAttribute("instanceDistanceStart",new U(r,1,0)),e.setAttribute("instanceDistanceEnd",new U(r,1,1)),this}raycast(e,t){const i=this.material.worldUnits,n=e.camera;n===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;g=e.ray;const a=this.matrixWorld,s=this.geometry,l=this.material;M=l.linewidth+r,s.boundingSphere===null&&s.computeBoundingSphere(),T.copy(s.boundingSphere).applyMatrix4(a);let h;if(i)h=M*.5;else{const c=Math.max(n.near,T.distanceToPoint(g.origin));h=re(n,c,l.resolution)}if(T.radius+=h,g.intersectsSphere(T)===!1)return;s.boundingBox===null&&s.computeBoundingBox(),P.copy(s.boundingBox).applyMatrix4(a);let p;if(i)p=M*.5;else{const c=Math.max(n.near,P.distanceToPoint(g.origin));p=re(n,c,l.resolution)}P.expandByScalar(p),g.intersectsBox(P)!==!1&&(i?Oe(this,t):Ce(this,n,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(G),this.material.uniforms.resolution.value.set(G.z,G.w))}}class fe extends de{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setPositions(i),this}setColors(e){const t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setColors(i),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class We extends je{constructor(e=new fe,t=new k({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const X=1e5;function Ge(o){const e=ue(o),[t,i]=Re(o),[n,r]=pe(o);return[Math.round(e),Math.round(t),Math.round(i),Math.round(n),Math.round(r)]}function ue(o){const e=K(o),{basePoint:t,xDomain:i,yDomain:n}=Y(e),r=J(t,i,n,X),a=$(r,e),s=i*n;return a.length/r.length*s}function Re(o){const e=K(o),{basePoint:t,xDomain:i,yDomain:n}=Y(e),r=J(t,i,n,X),a=$(r,e),s=ue(o),[l,h]=pe(o);let p=0,c=0;a.forEach(W=>{p+=(W[1]-h)**2,c+=(W[0]-l)**2});const x=p/a.length*s,j=c/a.length*s;return[x,j]}function pe(o){const e=K(o),{basePoint:t,xDomain:i,yDomain:n}=Y(e),r=J(t,i,n,X),a=$(r,e);let s=0,l=0;a.forEach(c=>{s+=c[0],l+=c[1]});const h=s/a.length,p=l/a.length;return[h,p]}function Y(o){const e=new C().setFromObject(o),t=e.max.sub(e.min);return{basePoint:e.min.toArray(),xDomain:t.x,yDomain:t.y}}function J(o,e,t,i){const n=[];for(let r=0;r<i;r++)n.push([o[0]+Math.random()*e,o[1]+Math.random()*t,0]);return n}function $(o,e){const t=new ze;return o.filter(n=>(t.set(new m(...n),new m(0,0,-1)),t.intersectObject(e).length))}function K(o){const e=new ce,t=o[0];e.moveTo(t[0],t[1]);for(const i of o.slice(1))e.lineTo(i[0],i[1]);return new V(new q(e))}function Fe(o,e,t=0){const i=[];for(let n=0;n<o.length;n+=2){const r=o[n],a=o[n+1];let s=[t,t,t];s[e.x]=r,s[e.y]=a,i.push(s)}return i.flat()}const S=165,b=10.2,E=201,z=6.2,w=B.state([[0,0],[S,0],[S,b],[(S-z)/2+z,b],[(S-z)/2+z,E-b],[S,E-b],[S,E],[0,E],[0,E-b],[(S-z)/2,E-b],[(S-z)/2,b],[0,b],[0,0]]),he=B.state([[10,1e3,100]]),me=B.state([[0,0,0,0,0]]),ve=new We(new fe,new k({color:"#c5d62f",linewidth:7.5,alphaToCoverage:!1})),ye=new V(new q,new Ue({color:"#046b58"})),N=B.state([ve,ye]),Q=new Map;Q.set("SectionGeometry",{text:"Section Geometry",data:w,columns:[{field:"0",text:"X-coordinate",editable:{type:"float"}},{field:"1",text:"Y-coordinate",editable:{type:"float"}}]});Q.set("MaterialProperties",{text:"Material Properties",data:he,columns:[{field:"0",text:"Modulus of Elasticity",editable:{type:"float"}},{field:"1",text:"Shear Modulus",editable:{type:"float"}},{field:"2",text:"Mass Density",editable:{type:"float"}}]});const He=({sheet:o,data:e})=>{o=="SectionGeometry"?w.val=e:o=="MaterialProperties"&&(he.val=e)};B.derive(()=>{ve.geometry.setPositions(Fe(w.val.flat(),{x:0,y:1}));const o=new ce;o.moveTo(w.val[0][0],w.val[0][1]);for(var e=1;e<w.val.length;++e)o.lineTo(w.val[e][0],w.val[e][1]);ye.geometry=new q(o),N.val=[...N.rawVal]});B.derive(()=>{me.val=[Ge(w.val)]});document.body.append(Be({topLeft:{element:De("Section Designer")},topRight:{element:Le()},main:{element:Pe(Q,He),title:"Inputs"},preview:{element:Te([{field:"0",text:"Area"},{field:"1",text:"Ixx"},{field:"2",text:"Iyy"},{field:"3",text:"Centroid X"},{field:"4",text:"Centroid Y"}],me),title:"Output"},right:{element:Ie({objects3D:N,settingsObj:{gridSize:300}})}}));
