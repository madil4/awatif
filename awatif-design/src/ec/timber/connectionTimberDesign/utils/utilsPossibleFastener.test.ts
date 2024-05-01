import { calcPossibleFastener } from  './calcPossibleFastener';

describe('possible fastener function', () => {
    it('should calculate the possible fastener correctly', () => {
        
        const height: number = 800;
        const fastenerDiameter: number = 8;
        const axialForce: number = 50;
        const distances: number[] = [ 40, 26, 160, 322, 26 ];
        const F_vrd: number = 3.3;
        const sheetNo: number = 2;

        // Expected result
        const expectedResult = {

            noTotal: 28,
            noTotalEffective: 21.7,
            noAxial: 2,
            noAxialEffective: 1.55,
            noPerp: 14,
            F_vrdTotal: 217.0,
            fastenerCheck: 0.46,
            distancesFinal: [50, 26, 160, 231.0, 26]
        }

        // Function call
        const calcPossibleFastenerOutput = calcPossibleFastener( height, fastenerDiameter, axialForce, distances, F_vrd, sheetNo);

        // Check the result
        expect( calcPossibleFastenerOutput ).toEqual( expectedResult );
    });
});
