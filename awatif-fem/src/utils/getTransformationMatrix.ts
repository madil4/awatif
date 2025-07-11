import { Node } from ".././data-model";
import {
  cross,
  dot,
  identity,
  inv,
  kron,
  MathCollection,
  Matrix,
  norm,
  subtract,
  zeros,
} from "mathjs";

// from global to local
export function getTransformationMatrix(nodes: Node[]): number[][] {
  if (nodes.length === 2)
    return getTransformationMatrixFrame(nodes[0], nodes[1]);

  if (nodes.length === 3)
    return getTransformationMatrixShell(nodes[0], nodes[1], nodes[2]);
}

function getTransformationMatrixFrame(n0: Node, n1: Node): number[][] {
  const vector = subtract(n1, n0);
  const length = norm(vector) as number;
  const l = dot(vector, [1, 0, 0]) / length;
  const m = dot(vector, [0, 1, 0]) / length;
  const n = dot(vector, [0, 0, 1]) / length;
  const D = Math.sqrt(l ** 2 + m ** 2);
  let lambda = [
    [l, m, n],
    [-m / D, l / D, 0],
    [(-l * n) / D, (-m * n) / D, D],
  ];

  if (n === 1) {
    lambda = [
      [0, 0, 1],
      [0, 1, 0],
      [-1, 0, 0],
    ];
  }

  if (n === -1) {
    lambda = [
      [0, 0, -1],
      [0, 1, 0],
      [1, 0, 0],
    ];
  }

  return kron(identity(4) as MathCollection, lambda).toArray() as number[][];
}

function getTransformationMatrixShell(
  n1: number[],
  n2: number[],
  n3: number[]
): number[][] {
  // Direct transition from https://github.com/Dhondtguido/CalculiX/blob/master/src/us3_sub.f
  let e1 = [0, 0, 0];
  let e2 = [0, 0, 0];
  let e3 = [0, 0, 0];
  let dl: number;
  let dd: number;
  let xno = [0, 0, 0];

  let xi: number = 0.0;
  let et: number = 0.0;

  // xl in Fortran is declared as xl(3,8) but used as xl(3,3) in us3_csys. We'll use 3x3.
  const xl = (zeros(3, 3) as Matrix).toArray() as number[][];
  const xs = (zeros(3, 7) as Matrix).toArray() as number[][];
  const shp = (zeros(7, 3) as Matrix).toArray() as number[][];

  const a = (identity(3) as Matrix).toArray() as number[][];

  const tm = (zeros(3, 3) as Matrix).toArray() as number[][];
  const tmg = (zeros(18, 18) as Matrix).toArray() as number[][];

  // Fortran: do i=1,3; do j=1,3; xl(i,j) = xg(j,i); enddo; enddo
  // This copies xg (global coordinates) into xl (local coordinates for shape3tri)
  // Now using n1, n2, n3 directly
  const xg_array = [n1, n2, n3]; // Create a temporary array to mimic xg structure
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      xl[i][j] = xg_array[j][i];
    }
  }

  const iflag: number = 2;

  shape3tri(xi, et, xl, xno, xs, shp, iflag);

  dl = norm(xno) as number;
  for (let l = 0; l < 3; l++) {
    xno[l] = xno[l] / dl;
  }

  dd = a[0][0] * xno[0] + a[1][0] * xno[1] + a[2][0] * xno[2];
  if (Math.abs(dd) > 0.999999999536) {
    dd = a[0][2] * xno[0] + a[1][2] * xno[1] + a[2][2] * xno[2];
    for (let l = 0; l < 3; l++) {
      e1[l] = a[l][2] - dd * xno[l];
    }
  } else {
    for (let l = 0; l < 3; l++) {
      e1[l] = a[l][0] - dd * xno[l];
    }
  }

  dl = norm(e1) as number;
  for (let l = 0; l < 3; l++) {
    e1[l] = e1[l] / dl;
  }

  e2 = cross(xno, e1) as number[];

  dl = norm(e2) as number;
  for (let l = 0; l < 3; l++) {
    e2[l] = e2[l] / dl;
  }

  e3 = [...xno];

  for (let j = 0; j < 3; j++) {
    tm[0][j] = e1[j];
    tm[1][j] = e2[j];
    tm[2][j] = e3[j];
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      tmg[i][j] = tm[i][j];
      tmg[i + 3][j + 3] = tm[i][j];
      tmg[i + 6][j + 6] = tm[i][j];
      tmg[i + 9][j + 9] = tm[i][j];
      tmg[i + 12][j + 12] = tm[i][j];
      tmg[i + 15][j + 15] = tm[i][j];
    }
  }

  return tmg as number[][];

  // Calculates shape functions and derivatives for a 3-node linear isoparametric triangular element.
  function shape3tri(
    xi: number,
    et: number,
    xl: number[][],
    xsj: number[],
    xs: number[][],
    shp: number[][],
    iflag: number
  ): void {
    // Local variables
    const xsi = zeros(2, 3) as Matrix;
    const sh: number[] = [0, 0, 0];
    let d1: number, d2: number, d3: number;

    // Shape functions (N1, N2, N3)
    // N1 = 1 - xi - et
    // N2 = xi
    // N3 = et
    shp[3][0] = 1.0 - xi - et; // N1
    shp[3][1] = xi; // N2
    shp[3][2] = et; // N3

    if (iflag === 1) {
      return;
    }

    // Local derivatives of the shape functions: xi-derivative (dN/dxi)
    shp[0][0] = -1.0; // dN1/dxi
    shp[0][1] = 1.0; // dN2/dxi
    shp[0][2] = 0.0; // dN3/dxi

    // Local derivatives of the shape functions: eta-derivative (dN/det)
    shp[1][0] = -1.0; // dN1/det
    shp[1][1] = 0.0; // dN2/det
    shp[1][2] = 1.0; // dN3/det

    if (iflag === 5) {
      return;
    }

    // Computation of the local derivative of the global coordinates (Jacobian matrix J)
    // J = [dx/dxi  dx/det]
    //     [dy/dxi  dy/det]
    //     [dz/dxi  dz/det]
    // xs[coord_idx][local_deriv_idx]
    // xs[0][0] = dx/dxi, xs[0][1] = dx/det
    // xs[1][0] = dy/dxi, xs[1][1] = dy/det
    // xs[2][0] = dz/dxi, xs[2][1] = dz/det
    for (let i = 0; i < 3; i++) {
      // Iterate over global coordinates (x, y, z)
      for (let j = 0; j < 2; j++) {
        // Iterate over local derivatives (xi, eta)
        xs[i][j] = 0.0;
        for (let k = 0; k < 3; k++) {
          // Iterate over nodes
          xs[i][j] += xl[i][k] * shp[j][k];
        }
      }
    }

    // Computation of the Jacobian vector (normal to the surface)
    // This is the cross product of the column vectors of the Jacobian matrix J
    // xsj = (dx/dxi, dy/dxi, dz/dxi) x (dx/det, dy/det, dz/det)
    const dX_dxi = [xs[0][0], xs[1][0], xs[2][0]];
    const dX_det = [xs[0][1], xs[1][1], xs[2][1]];
    const jacobianVector = cross(dX_dxi, dX_det);
    xsj[0] = jacobianVector[0];
    xsj[1] = jacobianVector[1];
    xsj[2] = jacobianVector[2];

    if (iflag === 3) {
      // Computation of the global derivative of the local coordinates (inverse of J_2x2)
      // This involves selecting the 2x2 sub-matrix of J with the largest determinant
      // and inverting it to get d(xi,eta)/d(x,y) or d(xi,eta)/d(y,z) or d(xi,eta)/d(x,z)

      d1 = Math.abs(xsj[0]); // |J_yz|
      d2 = Math.abs(xsj[1]); // |J_xz|
      d3 = Math.abs(xsj[2]); // |J_xy|

      let J_2x2: number[][];
      let inv_J_2x2: number[][];

      if (d3 > d2 && d3 > d1) {
        // Max determinant is |J_xy|
        J_2x2 = [
          [xs[0][0], xs[0][1]],
          [xs[1][0], xs[1][1]],
        ]; // J_xy
        inv_J_2x2 = inv(J_2x2);
        xsi[0][0] = inv_J_2x2[0][0];
        xsi[0][1] = inv_J_2x2[0][1];
        xsi[1][0] = inv_J_2x2[1][0];
        xsi[1][1] = inv_J_2x2[1][1];

        // Handle the third component (z) for xsi
        if (d2 > d1) {
          // Use J_xz if it's larger than J_yz
          if (d2 < 1.0e-10) {
            xsi[0][2] = 0.0;
            xsi[1][2] = 0.0;
          } else {
            J_2x2 = [
              [xs[0][0], xs[0][1]],
              [xs[2][0], xs[2][1]],
            ]; // J_xz
            inv_J_2x2 = inv(J_2x2);
            xsi[0][2] = inv_J_2x2[0][1]; // d_xi/d_z
            xsi[1][2] = inv_J_2x2[1][1]; // d_eta/d_z
          }
        } else {
          // Use J_yz
          if (d1 < 1.0e-10) {
            xsi[0][2] = 0.0;
            xsi[1][2] = 0.0;
          } else {
            J_2x2 = [
              [xs[1][0], xs[1][1]],
              [xs[2][0], xs[2][1]],
            ]; // J_yz
            inv_J_2x2 = inv(J_2x2);
            xsi[0][2] = inv_J_2x2[0][1]; // d_xi/d_z
            xsi[1][2] = inv_J_2x2[1][1]; // d_eta/d_z
          }
        }
      } else if (d2 > d1 && d2 > d3) {
        // Max determinant is |J_xz|
        J_2x2 = [
          [xs[0][0], xs[0][1]],
          [xs[2][0], xs[2][1]],
        ]; // J_xz
        inv_J_2x2 = inv(J_2x2);
        xsi[0][0] = inv_J_2x2[0][0];
        xsi[0][2] = inv_J_2x2[0][1];
        xsi[1][0] = inv_J_2x2[1][0];
        xsi[1][2] = inv_J_2x2[1][1];

        // Handle the third component (y) for xsi
        if (d1 > d3) {
          // Use J_yz if it's larger than J_xy
          if (d1 < 1.0e-10) {
            xsi[0][1] = 0.0;
            xsi[1][1] = 0.0;
          } else {
            J_2x2 = [
              [xs[1][0], xs[1][1]],
              [xs[2][0], xs[2][1]],
            ]; // J_yz
            inv_J_2x2 = inv(J_2x2);
            xsi[0][1] = inv_J_2x2[0][1]; // d_xi/d_y
            xsi[1][1] = inv_J_2x2[1][1]; // d_eta/d_y
          }
        } else {
          // Use J_xy
          if (d3 < 1.0e-10) {
            xsi[0][1] = 0.0;
            xsi[1][1] = 0.0;
          } else {
            J_2x2 = [
              [xs[0][0], xs[0][1]],
              [xs[1][0], xs[1][1]],
            ]; // J_xy
            inv_J_2x2 = inv(J_2x2);
            xsi[0][1] = inv_J_2x2[0][1]; // d_xi/d_y
            xsi[1][1] = inv_J_2x2[1][1]; // d_eta/d_y
          }
        }
      } else {
        // Max determinant is |J_yz|
        J_2x2 = [
          [xs[1][0], xs[1][1]],
          [xs[2][0], xs[2][1]],
        ]; // J_yz
        inv_J_2x2 = inv(J_2x2);
        xsi[0][1] = inv_J_2x2[0][0];
        xsi[0][2] = inv_J_2x2[0][1];
        xsi[1][1] = inv_J_2x2[1][0];
        xsi[1][2] = inv_J_2x2[1][1];

        // Handle the third component (x) for xsi
        if (d3 > d2) {
          // Use J_xy if it's larger than J_xz
          if (d3 < 1.0e-10) {
            xsi[0][0] = 0.0;
            xsi[1][0] = 0.0;
          } else {
            J_2x2 = [
              [xs[0][0], xs[0][1]],
              [xs[1][0], xs[1][1]],
            ]; // J_xy
            inv_J_2x2 = inv(J_2x2);
            xsi[0][0] = inv_J_2x2[0][1]; // d_xi/d_x
            xsi[1][0] = inv_J_2x2[1][1]; // d_eta/d_x
          }
        } else {
          // Use J_xz
          if (d2 < 1.0e-10) {
            xsi[0][0] = 0.0;
            xsi[1][0] = 0.0;
          } else {
            J_2x2 = [
              [xs[0][0], xs[0][1]],
              [xs[2][0], xs[2][1]],
            ]; // J_xz
            inv_J_2x2 = inv(J_2x2);
            xsi[0][0] = inv_J_2x2[0][1]; // d_xi/d_x
            xsi[1][0] = inv_J_2x2[1][1]; // d_eta/d_x
          }
        }
      }

      // Computation of the global derivatives of the shape functions (dN/dx, dN/dy, dN/dz)
      // dN/dx = (dN/dxi * dxi/dx) + (dN/det * det/dx)
      // dN/dy = (dN/dxi * dxi/dy) + (dN/det * det/dy)
      // dN/dz = (dN/dxi * dxi/dz) + (dN/det * det/dz)
      // shp[j][k] = sh[j] where j is global derivative (0=x, 1=y, 2=z) and k is node index
      for (let k = 0; k < 3; k++) {
        // Iterate over nodes
        // Calculate sh = [dN_k/dx, dN_k/dy, dN_k/dz]
        sh[0] = shp[0][k] * xsi[0][0] + shp[1][k] * xsi[1][0]; // dN_k/dx
        sh[1] = shp[0][k] * xsi[0][1] + shp[1][k] * xsi[1][1]; // dN_k/dy
        sh[2] = shp[0][k] * xsi[0][2] + shp[1][k] * xsi[1][2]; // dN_k/dz

        // Assign sh to the correct row in shp
        shp[0][k] = sh[0]; // dN_k/dx
        shp[1][k] = sh[1]; // dN_k/dy
        shp[2][k] = sh[2]; // dN_k/dz
      }
    } else if (iflag === 4) {
      // Local 2nd order derivatives of the shape functions
      // All are zero for linear triangular elements
      shp[4][0] = 0.0; // d2N1/dxi2
      shp[4][1] = 0.0; // d2N2/dxi2
      shp[4][2] = 0.0; // d2N3/dxi2

      shp[5][0] = 0.0; // d2N1/dxidet
      shp[5][1] = 0.0; // d2N2/dxidet
      shp[5][2] = 0.0; // d2N3/dxidet

      shp[6][0] = 0.0; // d2N1/det2
      shp[6][1] = 0.0; // d2N2/det2
      shp[6][2] = 0.0; // d2N3/det2

      // Computation of the local 2nd derivatives of the global coordinates (xs)
      // All are zero for linear triangular elements
      for (let i = 0; i < 3; i++) {
        // Iterate over global coordinates (x, y, z)
        for (let j = 4; j < 7; j++) {
          // Iterate over 2nd derivatives
          xs[i][j] = 0.0;
        }
      }
    }
  }
}
