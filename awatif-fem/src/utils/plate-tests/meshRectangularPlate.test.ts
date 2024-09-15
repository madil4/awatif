import { meshRectangularPlate } from '../meshRectanglularPlate';

describe('meshRectangularPlate', () => {
    test('Generates correct mesh for a 1x1 plate with 2 elements along each axis', () => {
      const L = 1;
      const B = 1;
      const Nx = 2;
      const Ny = 2;
      const loadstep = 1;
  
      const { coordinates, elements } = meshRectangularPlate(L, B, Nx, Ny);
  
      // Expected node coordinates
      const expectedCoordinates = [
        [0, 0, 0],
        [0.5, 0, 0],
        [1, 0, 0],
        [0, 0.5, 0],
        [0.5, 0.5, 0],
        [1, 0.5, 0],
        [0, 1, 0],
        [0.5, 1, 0],
        [1, 1, 0],
      ];
  
      // Expected element connectivity
      const expectedElements = [
        [0, 1, 4, 3],
        [1, 2, 5, 4],
        [3, 4, 7, 6],
        [4, 5, 8, 7],
      ];
  
      // Check that the coordinates match
      expect(coordinates).toEqual(expectedCoordinates);
  
      // Check that the elements match
      expect(elements).toEqual(expectedElements);
    });
  });