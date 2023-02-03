import { GridHelper, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { AnalysisResultType } from "../interfaces";
import { convertToColors } from "./utils/convert-to-colors";
import { convertToPositions } from "./utils/convert-to-positions";
import { LineSegments2 } from "./utils/lines/LineSegments2";
import { Lut } from "./utils/lut";
import { OrbitControls } from "./utils/OrbitControls";
import { Viewer } from "./viewer";

jest.mock("three");
jest.mock("./utils/OrbitControls");
jest.mock("./utils/lines/LineSegments2");
jest.mock("./utils/lut");
jest.mock("./utils/convert-to-positions");
jest.mock("./utils/convert-to-colors");

describe("Viewer", () => {
  const renderer = {
    setSize: jest.fn(),
    setAnimationLoop: jest.fn(),
    render: jest.fn(),
    domElement: {},
  };
  (WebGLRenderer as jest.Mock).mockReturnValue(renderer);
  const camera = { position: { set: jest.fn() } };
  (PerspectiveCamera as unknown as jest.Mock).mockReturnValue(camera);
  const grid = { position: { set: jest.fn() } };
  (GridHelper as unknown as jest.Mock).mockReturnValue(grid);
  const scene = { add: jest.fn() };
  (Scene as unknown as jest.Mock).mockReturnValue(scene);
  const lines = {
    material: {
      linewidth: 1,
      color: { set: jest.fn() },
      resolution: { set: jest.fn() },
      vertexColors: false,
    },
    geometry: {
      setPositions: jest.fn(),
      setColors: jest.fn(),
    },
  };
  (LineSegments2 as unknown as jest.Mock).mockReturnValue(lines);
  const colorMapper = { test: "name" };
  (Lut as unknown as jest.Mock).mockReturnValue(colorMapper);

  let viewer: Viewer;

  beforeEach(() => {
    viewer = new Viewer();
  });

  test("should render a scene in animation loop on init", () => {
    expect(WebGLRenderer).toBeCalledWith({ antialias: true });
    expect(renderer.setSize).toHaveBeenCalledWith(
      window.innerWidth,
      window.innerHeight
    );
    expect(Scene).toHaveBeenCalled();
    expect(PerspectiveCamera).toHaveBeenCalledWith(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      50
    );
    expect(camera.position.set).toHaveBeenCalledWith(0, 2, 10);
    expect(renderer.setAnimationLoop).toHaveBeenCalled();
    renderer.setAnimationLoop.mock.calls[0][0]();
    expect(renderer.render).toHaveBeenCalled();
  });

  test("should setup orbit controls on init", () => {
    expect(OrbitControls).toBeCalledWith(camera, renderer.domElement);
  });

  test("should add a grid on init", () => {
    expect(GridHelper).toHaveBeenCalledWith(10, 10);
    expect(grid.position.set).toHaveBeenCalledWith(0, -2, 0);
    expect(scene.add).toHaveBeenCalledWith(grid);
  });

  test("should add lines on init", () => {
    expect(LineSegments2).toHaveBeenCalled();
    expect(lines.material.linewidth).toBe(2);
    expect(lines.material.vertexColors).toBe(true);
    expect(lines.material.color.set).toHaveBeenCalledWith("white");
    expect(lines.material.resolution.set).toHaveBeenCalledWith(
      window.innerWidth,
      window.innerHeight
    );
    expect(scene.add).toHaveBeenCalledWith(lines);
  });

  test("should setup a color mapper on init", () => {
    expect(Lut).toHaveBeenCalledWith("cooltowarm");
  });

  describe("render", () => {
    test("should return the dom element", () => {
      const rendered = viewer.render();

      expect(rendered).toBe(renderer.domElement);
    });
  });

  describe("update", () => {
    it("should update lines positions and colors", () => {
      const positions = [[1, 2, 3]];
      const colors = [[4, 5, 6]];

      (convertToPositions as jest.Mock).mockReturnValue(positions);
      (convertToColors as jest.Mock).mockReturnValue(colors);
      const model = { positions: [], connectivities: [] };
      const analysisResults = {
        [0]: { type: AnalysisResultType.bar, stress: 10 },
        [1]: { type: AnalysisResultType.bar, stress: 20 },
      };

      viewer.update(model, analysisResults);

      expect(convertToPositions).toHaveBeenCalledWith(
        model.connectivities,
        model.positions
      );
      expect(lines.geometry.setPositions).toHaveBeenCalledWith(positions);
      expect(convertToColors).toHaveBeenCalledWith(
        model.connectivities,
        analysisResults,
        colorMapper
      );
      expect(lines.geometry.setColors).toHaveBeenCalledWith(colors);
    });

    it.todo("should update supports");
  });
});
