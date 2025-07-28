import * as THREE from "three";
import van, { State } from "vanjs-core";

// Todo: refactor isInPlane to a function

export type Drawing = {
  points?: State<[number, number, number][]>;
  polylines?: State<number[][]>;
  gridTarget?: State<{
    position: [number, number, number];
    rotation: [number, number, number];
  }>;
};

export function drawing({
  drawingObj,
  gridObj,
  scene,
  camera,
  controls,
  gridSize,
  derivedDisplayScale,
  rendererElm,
  viewerRender,
}: {
  drawingObj: Drawing;
  gridObj: THREE.GridHelper;
  scene: THREE.Scene;
  camera: THREE.Camera;
  controls: THREE.Controls<any>;
  gridSize: number;
  derivedDisplayScale: State<number>;
  rendererElm: HTMLCanvasElement;
  viewerRender: () => void;
}) {
  // Init
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(gridSize, gridSize),
    new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })
  );
  const points = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial()
  );

  const indicationPoint = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({ color: "gray" })
  );

  const activePoints = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({ color: "orange", size: 0.8 })
  );
  scene.add(activePoints);

  // Update
  points.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(drawingObj.points.rawVal.flat(), 3)
  );
  points.geometry.computeBoundingSphere();
  points.frustumCulled = false;

  indicationPoint.frustumCulled = false;
  scene.add(indicationPoint);

  // Match initial grid position and rotation
  plane.position.set(0.5 * gridSize, 0.5 * gridSize, 0);
  plane.rotateX(Math.PI / 2);
  plane.geometry.rotateX(Math.PI / 2);
  plane.updateMatrixWorld(); // to fix intersect object

  // To start with an empty polyline and keep the provided ones
  if (drawingObj.polylines)
    drawingObj.polylines.val = [...drawingObj.polylines.rawVal, []];

  // Events
  // On gridTarget change, interpolate grid and update plane position and rotation
  van.derive(() => {
    if (!drawingObj.gridTarget) return;

    interpolate(
      gridObj,
      {
        position: new THREE.Vector3(...drawingObj.gridTarget.val.position),
        quaternion: new THREE.Quaternion().setFromEuler(
          new THREE.Euler(...drawingObj.gridTarget.val.rotation)
        ),
      },
      viewerRender
    );

    plane.position.set(...drawingObj.gridTarget.val.position);
    plane.quaternion.setFromEuler(
      new THREE.Euler(...drawingObj.gridTarget.val.rotation)
    );
    plane.updateMatrixWorld(); // to fix intersect object
  });

  // On points change, update points positions for intersections
  van.derive(() => {
    points.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(drawingObj.points.val.flat(), 3)
    );
    points.geometry.computeBoundingSphere();
  });

  // On derivedDisplayScale update indicationPoint size and point threshold
  van.derive(() => {
    const size = 0.05 * gridSize * 0.5 * derivedDisplayScale.val;

    indicationPoint.material.size = size;
    raycaster.params.Points.threshold = 0.4 * size;
  });

  van.derive(() => {
    const allPoints = drawingObj.points.val ?? [];
    const polylines = drawingObj.polylines?.val ?? [];
    const lastPolyline = polylines.at(-1) ?? [];
  
    const posArray: number[] = [];
  
    for (const i of lastPolyline) {
      const [x, y, z] = allPoints[i];
      posArray.push(x, y, z);
    }
  
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(posArray, 3)
    );
  
    activePoints.geometry.dispose();
    activePoints.geometry = geometry;
  });

  // Pointer events
  let pointerdown = false;
  let pointerDownAndMovedCount = 0;

  // Compute pointerDownAndMovedCount (dragging)
  rendererElm.addEventListener("pointerdown", () => {
    pointerdown = true;
  });

  rendererElm.addEventListener("pointerup", () => {
    pointerdown = false;
  });

  rendererElm.addEventListener("pointermove", () => {
    if (pointerdown) pointerDownAndMovedCount++;
  });

  // On pointer click, add a point and polyline
  rendererElm.addEventListener("click", (event: PointerEvent) => {
    // handle when rotation and click happen together
    if (pointerDownAndMovedCount > 5) {
      pointerDownAndMovedCount = 0;
      return;
    }
    pointerDownAndMovedCount = 0;

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersect = raycaster.intersectObject(plane);

    if (intersect.length) {
      let point = intersect[0].point;
      if (event.ctrlKey || event.metaKey) {
        point = new THREE.Vector3(
          Math.round(intersect[0].point.x),
          Math.round(intersect[0].point.y),
          Math.round(intersect[0].point.z)
        );
      }

      drawingObj.points.val = [...drawingObj.points.rawVal, point.toArray()];

      if (drawingObj.polylines) {
        drawingObj.polylines.val = [
          ...drawingObj.polylines.rawVal.slice(0, -1),
          [
            ...(drawingObj.polylines.rawVal.length
              ? drawingObj.polylines.rawVal.pop()
              : []),
            drawingObj.points.rawVal.length - 1,
          ],
        ];
      }
    }
  });

  // On contextmenu, add a new empty polyline
  rendererElm.addEventListener("contextmenu", () => {
    if (
      !drawingObj.polylines ||
      drawingObj.polylines.rawVal[drawingObj.polylines.rawVal.length - 1]
        .length === 0
    )
      return;

    drawingObj.polylines.val = [...drawingObj.polylines.rawVal, []];
  });

  // On pointer move and intersection with plan, show indication point
  rendererElm.addEventListener("pointermove", (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersect = raycaster.intersectObject(plane);

    indicationPoint.geometry.deleteAttribute("position"); // delete point if not intersection

    if (intersect.length) {
      let point = intersect[0].point;

      if (event.ctrlKey || event.metaKey) {
        point = new THREE.Vector3(
          Math.round(intersect[0].point.x),
          Math.round(intersect[0].point.y),
          Math.round(intersect[0].point.z)
        );
      }

      indicationPoint.geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(point.toArray(), 3)
      );
    }

    viewerRender();
  });

  // On pointer move and intersection with a point, hide indication point
  rendererElm.addEventListener("pointermove", (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    // Check if point in the plane
    let isPointInPlane = false;
    const intersectWithPoints = raycaster.intersectObject(points);
    const intersectWithPlane = raycaster.intersectObject(plane);
    if (intersectWithPoints.length && intersectWithPlane.length) {
      const point = new THREE.Vector3(
        ...drawingObj.points.rawVal[intersectWithPoints[0].index]
      );
      const planePoint = new THREE.Vector3(...intersectWithPlane[0].point);
      const planeToPoint = point.sub(planePoint);
      const planeNormal = intersectWithPlane[0].face?.normal;
      planeNormal.transformDirection(plane.matrixWorld);
      if (Math.abs(planeToPoint.dot(planeNormal)) < 1e-4) isPointInPlane = true;
    }

    indicationPoint.visible = isPointInPlane ? false : true;
  });

  // On pointer drag and intersection with a point and plane, update point position
  let isPointInPlaneWithoutControl = false;
  let pointIndex: number | undefined;
  rendererElm.addEventListener("pointermove", (event: PointerEvent) => {
    if (!pointerDownAndMovedCount) return;

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    // Check if point in the plane
    let isPointInPlane = false;
    const intersectWithPoints = raycaster.intersectObject(points);
    const intersectWithPlane = raycaster.intersectObject(plane);
    if (intersectWithPoints.length && intersectWithPlane.length) {
      const point = new THREE.Vector3(
        ...drawingObj.points.rawVal[intersectWithPoints[0].index]
      );
      const planePoint = new THREE.Vector3(...intersectWithPlane[0].point);
      const planeToPoint = point.sub(planePoint);
      const planeNormal = intersectWithPlane[0].face?.normal;
      planeNormal.transformDirection(plane.matrixWorld);
      if (Math.abs(planeToPoint.dot(planeNormal)) < 1e-4) isPointInPlane = true;
    }

    // < 5 to not trigger with rotation
    if (isPointInPlane && pointerDownAndMovedCount < 5) {
      isPointInPlaneWithoutControl = true;
      controls.enabled = false;
      pointIndex = intersectWithPoints[0].index;
    }

    if (!isPointInPlaneWithoutControl) return;

    if (pointerDownAndMovedCount % 2 !== 0) return; // slow movements for (parametric) performance opt 5

    const newPoints = [...drawingObj.points.rawVal];
    if (pointIndex !== undefined) {
      let newPosition = intersectWithPlane[0].point;

      if (event.ctrlKey || event.metaKey) {
        newPosition = new THREE.Vector3(
          Math.round(newPosition.x),
          Math.round(newPosition.y),
          Math.round(newPosition.z)
        );
      }

      newPoints[pointIndex] = newPosition.toArray();
      // newPoints[pointIndex] = intersectWithPlane[0].point.toArray();
    }
    drawingObj.points.val = newPoints;
  });

  rendererElm.addEventListener("pointerup", () => {
    controls.enabled = true;
    isPointInPlaneWithoutControl = false;
  });

  // On contextmenu move and point in the plane, delete the point and update polyline
  rendererElm.addEventListener("contextmenu", (event: PointerEvent) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    // Check if point in the plane
    let isPointInPlane = false;
    const intersectWithPoints = raycaster.intersectObject(points);
    const intersectWithPlane = raycaster.intersectObject(plane);
    if (intersectWithPoints.length && intersectWithPlane.length) {
      const point = new THREE.Vector3(
        ...drawingObj.points.rawVal[intersectWithPoints[0].index]
      );
      const planePoint = new THREE.Vector3(...intersectWithPlane[0].point);
      const planeToPoint = point.sub(planePoint);
      const planeNormal = intersectWithPlane[0].face?.normal;
      planeNormal.transformDirection(plane.matrixWorld);
      if (Math.abs(planeToPoint.dot(planeNormal)) < 1e-4) isPointInPlane = true;
    }

    if (!isPointInPlane) return;

    const newPoints = [...drawingObj.points.rawVal];
    newPoints.splice(intersectWithPoints[0].index, 1);
    drawingObj.points.val = newPoints;

    if (!drawingObj.polylines) return;

    const newPolylines = drawingObj.polylines.rawVal
      .map((polyline) =>
        polyline.filter((i) => i !== intersectWithPoints[0].index)
      ) // remove point index from polyline
      .map((polyline) =>
        polyline.map((i) => (i > intersectWithPoints[0].index ? i - 1 : i))
      ) // update polyline indices
      .filter((polyline) => polyline.length); // remove empty polylines

    newPolylines.push([]); // add new empty polyline

    drawingObj.polylines.val = newPolylines;
  });
}

// Utils
function interpolate(
  object3D: THREE.Object3D,
  target: { position: THREE.Vector3; quaternion: THREE.Quaternion },
  onAnimate?: () => void
) {
  const duration = 500; // In milliseconds
  const fps = 30; // Frames per second
  const steps = Math.round(duration / (1000 / fps));
  const origin = {
    position: object3D.position.clone(),
    quaternion: object3D.quaternion.clone(),
  };
  const animationID = setInterval(animate, 1000 / fps);

  let step = 0;
  function animate() {
    step++;

    const t = step / steps;
    object3D.position.lerpVectors(origin.position, target.position, t);
    object3D.quaternion.slerpQuaternions(
      origin.quaternion,
      target.quaternion,
      t
    );

    if (onAnimate) onAnimate();

    if (step == steps) clearInterval(animationID);
  }
}
