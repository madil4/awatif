import { getBasicInputs, getSectionProperties } from "./getSectionProperties";

describe("getSectionProperties", () => {
  test("W200x36's section properties (idealized) should be within 5% of error margin", () => {
    // W200x36 section geometry
    const bf = 165; // Flange width
    const tf = 10.2; // Flange thickness
    const d = 201; // Depth of the section
    const tw = 6.2; // Web thickness

    const vertices: [number, number][] = [
      // Bottom flange (starting from bottom left corner as origin)
      [0, 0], // Bottom left corner of the flange (origin)
      [bf, 0], // Bottom right corner of the flange
      [bf, tf], // Move vertically to the top of the flange
      [(bf - tw) / 2 + tw, tf], // Move horizontally to the edge of the web
      [(bf - tw) / 2 + tw, d - tf], // Move vertically to the bottom of the top flange
      [bf, d - tf], // Move horizontally to the edge of the top flange
      [bf, d], // Move vertically to the top of the section
      [0, d], // Move horizontally to the top left corner of the section
      [0, d - tf], // Move down to the bottom of the top flange
      [(bf - tw) / 2, d - tf], // Move horizontally to the edge of the web
      [(bf - tw) / 2, tf], // Move vertically to the bottom of the web
      [0, tf], // Move horizontally to the bottom left corner of the flange
      [0, 0], // Closing the section loop
    ];

    const tolerance = 0.05;

    const trueProperties = {
      area: 4485.72, // mm²
      Ixx: 33707120.33, // mm⁴
      Iyy: 7640199.336, // mm⁴
      centroid_x: 82.5, // mm
      centroid_y: 100.5, // mm
      rx: 86.6852, // mm
      ry: 41.2702, // mm
      Sxt: 335.394 * 1e3, // mm3
      Sxb: 335.394 * 1e3, // mm3
      Syt: 92.6085 * 1e3, // mm3
      Syb: 92.6085 * 1e3, // mm3
      PNAx: 82.5, // mm
      PNAy: 100.5, // mm
      Zxp: 371.672 * 1e3, // mm3
      Zyp: 140.583 * 1e3, // mm3
      // Ixy: -388818, // mm⁴
    };

    const calcProperties = getSectionProperties(getBasicInputs(vertices));

    let percentError = 0;
    for (var propName in trueProperties) {
      percentError = Math.abs(
        (calcProperties[propName] - trueProperties[propName]) /
          trueProperties[propName]
      );
      expect(percentError).toBeLessThanOrEqual(tolerance);
    }
  });
});
