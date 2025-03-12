import van from "vanjs-core";
import { viewer } from "awatif-ui";
import * as THREE from "three";
import { createColumn, createNodes, createSurface, createText } from "./utils";
import { Pane } from "tweakpane";
import "./styles.css";

// Initialize reactive state
const PARAMS = { level: 1 };
const levelState = van.state(PARAMS.level);
const objects3D = van.state([]);

// Setup UI panel
const pane = new Pane();
pane.addBinding(PARAMS, "level", { options: { 1: 1, 2: 2, 3: 3 } });
pane.on("change", () => (levelState.val = PARAMS.level));

// Data for slabs and columns
const cordsSlabs = [
  { x: 0, y: 0, z: 3 }, { x: 15, y: 0, z: 3 }, { x: 15, y: 10, z: 3 }, { x: 0, y: 10, z: 3 },
  { x: 0, y: 0, z: 6 }, { x: 10, y: 0, z: 6 }, { x: 10, y: 10, z: 6 }, { x: 0, y: 10, z: 6 },
  { x: 0, y: 0, z: 9 }, { x: 5, y: 0, z: 9 }, { x: 5, y: 5, z: 9 }, { x: 0, y: 5, z: 9 },
];
const cordsCols = [
  { x: 0, y: 0, z: 0 }, { x: 5, y: 0, z: 0 }, { x: 10, y: 0, z: 0 }, { x: 15, y: 0, z: 0 },
  { x: 0, y: 5, z: 0 }, { x: 5, y: 5, z: 0 }, { x: 10, y: 5, z: 0 }, { x: 15, y: 5, z: 0 },
  { x: 0, y: 10, z: 0 }, { x: 5, y: 10, z: 0 }, { x: 10, y: 10, z: 0 }, { x: 15, y: 10, z: 0 },
  { x: 0, y: 0, z: 3 }, { x: 5, y: 0, z: 3 }, { x: 10, y: 0, z: 3 }, { x: 0, y: 5, z: 3 },
  { x: 5, y: 5, z: 3 }, { x: 10, y: 5, z: 3 }, { x: 0, y: 10, z: 3 }, { x: 5, y: 10, z: 3 },
  { x: 10, y: 10, z: 3 }, { x: 0, y: 0, z: 6 }, { x: 5, y: 0, z: 6 }, { x: 5, y: 5, z: 6 },
  { x: 0, y: 5, z: 6 },
];

// Group coordinates by unique Z values
const groupByZ = (data) => [...new Set(data.map((p) => p.z))].map((z) => data.filter((p) => p.z === z));
const filteredSlabCords = groupByZ(cordsSlabs);
const filteredColCords = groupByZ(cordsCols);
const uniqueZValues = [...new Set([...filteredColCords, ...filteredSlabCords].flat().map((p) => p.z))];
const columnLengths = uniqueZValues.slice(1).map((val, i) => val - uniqueZValues[i]);

// Colors
const colorBlue = 0x132e39;
const colorGrey = 0x29292E;
const colorWhite = 0xFFFFFF;
const colorNodeDefault = 0xff0000;

// Generate scene objects
van.derive(() => {
  const surfaces = filteredSlabCords.map((cords, i) => {
    const color = levelState.val === i + 1 ? colorBlue : colorGrey;
    const surface = createSurface(cords, color);
    surface.position.set(0, 0, uniqueZValues[i+1]);
    return surface;
  });

  const columns = [], points = [], texts = [];
  filteredColCords.forEach((cols, i) => {
    const length = columnLengths[i];
    cols.forEach((point, colNo) => {
      if (levelState.val === i + 1) {
        const colText = [`Col${colNo + 1}`, `Level ${i + 1}`];
        texts.push(...createText(point.x, point.y, point.z, length, colText));
        points.push(createNodes(point.x, point.y, point.z, colorNodeDefault));
        const nodesCopy = points[points.length - 1].clone();
        nodesCopy.position.z = length;
        points.push(nodesCopy);
        columns.push(createColumn(point.x, point.y, point.z, length, colorWhite));
      } else {
        columns.push(createColumn(point.x, point.y, point.z, length, colorGrey));
      }
    });
  });

  // Lights
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(10, 10, 30);
  light.castShadow = true;

  // Update objects
  objects3D.val = [...surfaces, ...columns, light, ...points, ...texts];
});

// Append to document
document.body.append(viewer({ objects3D }));
