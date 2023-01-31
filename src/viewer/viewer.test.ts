import * as THREE from "three";
import { GridHelper } from "three";
import { Lines } from "./lines";
import { OrbitControls } from "./utils/OrbitControls";
import { Model, Viewer } from "./viewer";

jest.mock("three");
jest.mock("./utils/OrbitControls");
jest.mock("./lines");

describe("Viewer", () => {
  const renderer = {
    setSize: jest.fn(),
    setAnimationLoop: jest.fn(),
    render: jest.fn(),
    domElement: {},
  };
  (THREE.WebGLRenderer as jest.Mock).mockReturnValue(renderer);
  const camera = { position: { set: jest.fn() } };
  (THREE.PerspectiveCamera as unknown as jest.Mock).mockReturnValue(camera);
  const grid = { position: { set: jest.fn() } };
  (THREE.GridHelper as unknown as jest.Mock).mockReturnValue(grid);
  const scene = { add: jest.fn() };
  (THREE.Scene as unknown as jest.Mock).mockReturnValue(scene);
  const lines = { update: jest.fn() };
  (Lines as unknown as jest.Mock).mockReturnValue(lines);

  test("should render a scene in animation loop on init", () => {
    new Viewer();

    expect(THREE.WebGLRenderer).toBeCalledWith({ antialias: true });
    expect(renderer.setSize).toHaveBeenCalledWith(
      window.innerWidth,
      window.innerHeight
    );
    expect(THREE.Scene).toHaveBeenCalled();
    expect(THREE.PerspectiveCamera).toHaveBeenCalledWith(
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
    new Viewer();

    expect(OrbitControls).toBeCalledWith(camera, renderer.domElement);
  });

  test("should add a grid on init", () => {
    new Viewer();

    expect(GridHelper).toHaveBeenCalledWith(10, 10);
    expect(grid.position.set).toHaveBeenCalledWith(0, -2, 0);
    expect(scene.add).toHaveBeenCalledWith(grid);
  });

  test("should add lines on init", () => {
    new Viewer();

    expect(Lines).toHaveBeenCalled();
    expect(scene.add).toHaveBeenCalledWith(lines);
  });

  describe("render", () => {
    test("should return the dom element", () => {
      const viewer = new Viewer();

      const rendered = viewer.render();

      expect(rendered).toBe(renderer.domElement);
    });
  });

  describe("update", () => {
    it("should update lines", () => {
      const viewer = new Viewer();
      const model: Model = {
        positions: [
          [0, 0, 0],
          [1, 2, 3],
        ],
        connectivities: [
          [1, 2],
          [3, 2],
        ],
      };

      viewer.update(model);

      expect(lines.update).toHaveBeenCalledWith(
        model.positions,
        model.connectivities
      );
    });
  });
});
