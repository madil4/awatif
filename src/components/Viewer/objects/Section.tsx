import * as THREE from "three";

type SectionProps = {
  start: any;
  end: any;
  section: any;
};

export function Section(props: SectionProps) {
  if (!props.start || !props.end || !props.section) return;
  if (
    props.start.length != 3 ||
    props.end.length != 3 ||
    props.start.some((e: any) => typeof e !== "number") ||
    props.end.some((e: any) => typeof e !== "number") ||
    typeof props.section !== "string"
  )
    return;

  const swapYZStart = [props.start[0], props.start[2], props.start[1]];
  const swapYZEnd = [props.end[0], props.end[2], props.end[1]];

  const { width, height } = extractDimensions(props.section);
  const geometry = new THREE.ExtrudeGeometry(
    createRectangleShape(width, height),
    {
      bevelEnabled: false,
      extrudePath: new THREE.LineCurve3(
        new THREE.Vector3(...swapYZStart),
        new THREE.Vector3(...swapYZEnd)
      ),
    }
  );

  const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());

  return <>{mesh}</>;
}

// helpers
function extractDimensions(section: string): {
  width: number;
  height: number;
} {
  const numbers = section.substring(1).split("x");
  return {
    width: (parseInt(numbers[0]) || 1) * 1e-3,
    height: (parseInt(numbers[1]) || 1) * 1e-3,
  };
}

function createRectangleShape(width: number, height: number): THREE.Shape {
  return new THREE.Shape()
    .moveTo(-width / 2, height / 2)
    .lineTo(width / 2, height / 2)
    .lineTo(width / 2, -height / 2)
    .lineTo(-width / 2, -height / 2)
    .lineTo(-width / 2, height / 2);
}
