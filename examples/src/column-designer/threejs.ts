import van, { State } from "vanjs-core";
import { Text } from "awatif-ui/src/viewer/objects/Text";
import * as THREE from "three";

export function renderThreeJs(
    slabInputs,
    designInputs,
    designResultsInterface
) {
  const lines = new THREE.Line(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial()
  );

  const points = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({})
  );

  const column = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 30),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
  );

  const noCols = designInputs.val.length;
  var text = new Text("Hello World");
  text.position.set(5, 5, 0);

  const objects3D = van.state([lines, points, text, column]);
  // on inputPolyline change: render lines
  var xyCoords = [];
  for (let i = 0; i < noCols; i++) {
    const xCord = designInputs.val[i][7] as number; // x-coordinate
    const yCord = designInputs.val[i][8] as number; // y-coordinate
    const zCord = 0; // z-coordinate

    xyCoords.push([xCord, yCord, zCord]); // Push coordinates as an array
  }

  // THREEJS
  van.derive(() => {
    //lines
    lines.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(slabInputs.val.flat(), 3)
    );
    lines.material.color.set(0x132e39); // Green lines

    //points
    const positions = xyCoords.flat();
    points.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    points.material.size = 1; // Larger points
    points.material.color.set(0xff0000); // Red points

    // columns
    // const column = createRectangularColumn(2, 5, 1, 0xff0000); // Red column with width=2, height=5, length=1

    // Position the column (optional, default is at the origin)

    //text
    // Clear existing text objects
    const currentTexts = objects3D.rawVal.filter((obj) => obj instanceof Text);
    currentTexts.forEach((textObj) =>
      objects3D.rawVal.splice(objects3D.rawVal.indexOf(textObj), 1)
    );

    // Add new text objects dynamically
    for (let i = 0; i < noCols; i++) {
      const xCord = designInputs.val[i][7] as number;
      const yCord = designInputs.val[i][8] as number;
      const zCord = 2;
      // const etaMax = Math.max(designResults.val[i][1], designResults.val[i][2]);
      const etaMax = (
        Math.max(
          designResultsInterface.val[i].maxEtaY,
          designResultsInterface.val[i].maxEtaZ
        ) * 100
      ).toFixed(0);

      // Multi-line text content
      const lines = [`Col${i + 1}`, `η: ${etaMax}%`];

      lines.forEach((line, index) => {
        const lineText = new Text(line);
        lineText.updateScale(0.7);
        lineText.position.set(xCord, yCord, zCord - index * 0.7); // Adjust yCord for each line
        objects3D.rawVal.push(lineText); // Add to objects
      });
    }

    // surface
    // Clear previous surfacesgit
    const currentSurfaces = objects3D.rawVal.filter(
      (obj) => obj instanceof THREE.Mesh
    );
    currentSurfaces.forEach((surface) => {
      surface.geometry.dispose(); // Dispose of geometry
      surface.material.dispose(); // Dispose of material
      objects3D.rawVal.splice(objects3D.rawVal.indexOf(surface), 1);
    });

    // Create and add the new surface
    const vertices = slabInputs.val.flat();
    const indices = [0, 1, 2, 0, 2, 3]; // Indices defining triangles
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const material = new THREE.MeshBasicMaterial({
      color: 0x132e39, // The color you want to use
      side: THREE.DoubleSide, // Make both sides of the object visible
    });

    const surface = new THREE.Mesh(geometry, material);
    //@ts-ignore
    objects3D.rawVal.push(surface);

    objects3D.val = [...objects3D.rawVal]; // trigger rendering
  });

  return objects3D;
}

function createSurface(scene, xyzArray, colorArray) {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];

    xyzArray.forEach((point, index) => {
        vertices.push(point.x, point.y, point.z);
        colors.push(colorArray[index].r, colorArray[index].g, colorArray[index].b);
    });

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.computeVertexNormals();

    const material = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    
    scene.add(mesh);
    return mesh;
}
