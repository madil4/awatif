#include "../data-model.h"
#include <vector>
#include <cmath>
#include <Eigen/Dense>
#include <iostream>
#include <iomanip>
#include <stdexcept>

// Declarations
Eigen::MatrixXd getTransformationMatrixFrame(const Node &n0, const Node &n1);
Eigen::MatrixXd getTransformationMatrixShell(const Node &n1, const Node &n2, const Node &n3);

// Main dispatch function based on number of nodes
Eigen::MatrixXd getTransformationMatrix(const std::vector<Node> &nodes)
{
    if (nodes.size() == 2)
    {
        return getTransformationMatrixFrame(nodes[0], nodes[1]);
    }

    if (nodes.size() == 3)
    {
        return getTransformationMatrixShell(nodes[0], nodes[1], nodes[2]);
    }

    throw std::runtime_error("Unsupported element type in getTransformationMatrix (must have 2 or 3 nodes).");
}

// Transformation matrix for 2-node frame/truss elements
Eigen::MatrixXd getTransformationMatrixFrame(const Node &n0, const Node &n1)
{
    Eigen::Vector3d vector(n1[0] - n0[0], n1[1] - n0[1], n1[2] - n0[2]);
    double length = vector.norm();
    if (length < 1e-12)
    { // Avoid division by zero for zero-length elements
        std::cerr << "Warning: Zero length element detected in getTransformationMatrixFrame. Returning identity matrix." << std::endl;
        return Eigen::MatrixXd::Identity(12, 12);
    }
    double l = vector.x() / length;
    double m = vector.y() / length;
    double n = vector.z() / length;
    double D = std::sqrt(l * l + m * m);

    Eigen::Matrix3d lambda; // Direction cosine matrix
    if (std::abs(D) < 1e-9)
    { // Element aligned with global Z-axis
        if (n > 0)
        { // Pointing up (positive Z)
            lambda << 0, 0, 1,
                0, 1, 0,
                -1, 0, 0;
        }
        else
        { // Pointing down (negative Z)
            lambda << 0, 0, -1,
                0, 1, 0,
                1, 0, 0;
        }
    }
    else
    { // General case
        lambda << l, m, n,
            -m / D, l / D, 0,
            (-l * n) / D, (-m * n) / D, D;
    }

    // Construct the 12x12 transformation matrix T
    Eigen::MatrixXd T = Eigen::MatrixXd::Zero(12, 12);
    for (int i = 0; i < 4; ++i)
    {
        T.block<3, 3>(i * 3, i * 3) = lambda;
    }

    return T;
}

// Helper function for shape3tri
void shape3tri(
    double xi,
    double et,
    const Eigen::MatrixXd &xl,
    Eigen::Vector3d &xsj,
    Eigen::MatrixXd &xs,
    Eigen::MatrixXd &shp,
    int iflag)
{
    // Shape functions (N1, N2, N3)
    // N1 = 1 - xi - et
    // N2 = xi
    // N3 = et
    shp(3, 0) = 1.0 - xi - et; // N1
    shp(3, 1) = xi;            // N2
    shp(3, 2) = et;            // N3

    if (iflag == 1)
    {
        return;
    }

    // Local derivatives of the shape functions: xi-derivative (dN/dxi)
    shp(0, 0) = -1.0; // dN1/dxi
    shp(0, 1) = 1.0;  // dN2/dxi
    shp(0, 2) = 0.0;  // dN3/dxi

    // Local derivatives of the shape functions: eta-derivative (dN/det)
    shp(1, 0) = -1.0; // dN1/det
    shp(1, 1) = 0.0;  // dN2/det
    shp(1, 2) = 1.0;  // dN3/det

    if (iflag == 5)
    {
        return;
    }

    // Computation of the local derivative of the global coordinates (Jacobian matrix J)
    // J = [dx/dxi  dx/det]
    //     [dy/dxi  dy/det]
    //     [dz/dxi  dz/det]
    // xs[coord_idx][local_deriv_idx]
    // xs(0,0) = dx/dxi, xs(0,1) = dx/det
    // xs(1,0) = dy/dxi, xs(1,1) = dy/det
    // xs(2,0) = dz/dxi, xs(2,1) = dz/det
    for (int i = 0; i < 3; i++)
    {
        // Iterate over global coordinates (x, y, z)
        for (int j = 0; j < 2; j++)
        {
            // Iterate over local derivatives (xi, eta)
            xs(i, j) = 0.0;
            for (int k = 0; k < 3; k++)
            {
                // Iterate over nodes
                xs(i, j) += xl(i, k) * shp(j, k);
            }
        }
    }

    // Computation of the Jacobian vector (normal to the surface)
    // This is the cross product of the column vectors of the Jacobian matrix J
    // xsj = (dx/dxi, dy/dxi, dz/dxi) x (dx/det, dy/det, dz/det)
    Eigen::Vector3d dX_dxi(xs(0, 0), xs(1, 0), xs(2, 0));
    Eigen::Vector3d dX_det(xs(0, 1), xs(1, 1), xs(2, 1));
    Eigen::Vector3d jacobianVector = dX_dxi.cross(dX_det);
    xsj(0) = jacobianVector(0);
    xsj(1) = jacobianVector(1);
    xsj(2) = jacobianVector(2);

    if (iflag == 3)
    {
        // Computation of the global derivative of the local coordinates (inverse of J_2x2)
        // This involves selecting the 2x2 sub-matrix of J with the largest determinant
        // and inverting it to get d(xi,eta)/d(x,y) or d(xi,eta)/d(y,z) or d(xi,eta)/d(x,z)

        double d1 = std::abs(xsj(0)); // |J_yz|
        double d2 = std::abs(xsj(1)); // |J_xz|
        double d3 = std::abs(xsj(2)); // |J_xy|

        Eigen::Matrix2d J_2x2;
        Eigen::Matrix2d inv_J_2x2;
        Eigen::MatrixXd xsi_local = Eigen::MatrixXd::Zero(2, 3);

        if (d3 > d2 && d3 > d1)
        {
            // Max determinant is |J_xy|
            J_2x2 << xs(0, 0), xs(0, 1),
                xs(1, 0), xs(1, 1);
            inv_J_2x2 = J_2x2.inverse();
            xsi_local(0, 0) = inv_J_2x2(0, 0);
            xsi_local(0, 1) = inv_J_2x2(0, 1);
            xsi_local(1, 0) = inv_J_2x2(1, 0);
            xsi_local(1, 1) = inv_J_2x2(1, 1);

            // Handle the third component (z) for xsi
            if (d2 > d1)
            {
                // Use J_xz if it's larger than J_yz
                if (d2 < 1.0e-10)
                {
                    xsi_local(0, 2) = 0.0;
                    xsi_local(1, 2) = 0.0;
                }
                else
                {
                    J_2x2 << xs(0, 0), xs(0, 1),
                        xs(2, 0), xs(2, 1);
                    inv_J_2x2 = J_2x2.inverse();
                    xsi_local(0, 2) = inv_J_2x2(0, 1); // d_xi/d_z
                    xsi_local(1, 2) = inv_J_2x2(1, 1); // d_eta/d_z
                }
            }
            else
            {
                // Use J_yz
                if (d1 < 1.0e-10)
                {
                    xsi_local(0, 2) = 0.0;
                    xsi_local(1, 2) = 0.0;
                }
                else
                {
                    J_2x2 << xs(1, 0), xs(1, 1),
                        xs(2, 0), xs(2, 1);
                    inv_J_2x2 = J_2x2.inverse();
                    xsi_local(0, 2) = inv_J_2x2(0, 1); // d_xi/d_z
                    xsi_local(1, 2) = inv_J_2x2(1, 1); // d_eta/d_z
                }
            }
        }
        else if (d2 > d1 && d2 > d3)
        {
            // Max determinant is |J_xz|
            J_2x2 << xs(0, 0), xs(0, 1),
                xs(2, 0), xs(2, 1);
            inv_J_2x2 = J_2x2.inverse();
            xsi_local(0, 0) = inv_J_2x2(0, 0);
            xsi_local(0, 2) = inv_J_2x2(0, 1);
            xsi_local(1, 0) = inv_J_2x2(1, 0);
            xsi_local(1, 2) = inv_J_2x2(1, 1);

            // Handle the third component (y) for xsi
            if (d1 > d3)
            {
                // Use J_yz if it's larger than J_xy
                if (d1 < 1.0e-10)
                {
                    xsi_local(0, 1) = 0.0;
                    xsi_local(1, 1) = 0.0;
                }
                else
                {
                    J_2x2 << xs(1, 0), xs(1, 1),
                        xs(2, 0), xs(2, 1);
                    inv_J_2x2 = J_2x2.inverse();
                    xsi_local(0, 1) = inv_J_2x2(0, 1); // d_xi/d_y
                    xsi_local(1, 1) = inv_J_2x2(1, 1); // d_eta/d_y
                }
            }
            else
            {
                // Use J_xy
                if (d3 < 1.0e-10)
                {
                    xsi_local(0, 1) = 0.0;
                    xsi_local(1, 1) = 0.0;
                }
                else
                {
                    J_2x2 << xs(0, 0), xs(0, 1),
                        xs(1, 0), xs(1, 1);
                    inv_J_2x2 = J_2x2.inverse();
                    xsi_local(0, 1) = inv_J_2x2(0, 1); // d_xi/d_y
                    xsi_local(1, 1) = inv_J_2x2(1, 1); // d_eta/d_y
                }
            }
        }
        else
        {
            // Max determinant is |J_yz|
            J_2x2 << xs(1, 0), xs(1, 1),
                xs(2, 0), xs(2, 1);
            inv_J_2x2 = J_2x2.inverse();
            xsi_local(0, 1) = inv_J_2x2(0, 0);
            xsi_local(0, 2) = inv_J_2x2(0, 1);
            xsi_local(1, 1) = inv_J_2x2(1, 0);
            xsi_local(1, 2) = inv_J_2x2(1, 1);

            // Handle the third component (x) for xsi
            if (d3 > d2)
            {
                // Use J_xy if it's larger than J_xz
                if (d3 < 1.0e-10)
                {
                    xsi_local(0, 0) = 0.0;
                    xsi_local(1, 0) = 0.0;
                }
                else
                {
                    J_2x2 << xs(0, 0), xs(0, 1),
                        xs(1, 0), xs(1, 1);
                    inv_J_2x2 = J_2x2.inverse();
                    xsi_local(0, 0) = inv_J_2x2(0, 1); // d_xi/d_x
                    xsi_local(1, 0) = inv_J_2x2(1, 1); // d_eta/d_x
                }
            }
            else
            {
                // Use J_xz
                if (d2 < 1.0e-10)
                {
                    xsi_local(0, 0) = 0.0;
                    xsi_local(1, 0) = 0.0;
                }
                else
                {
                    J_2x2 << xs(0, 0), xs(0, 1),
                        xs(2, 0), xs(2, 1);
                    inv_J_2x2 = J_2x2.inverse();
                    xsi_local(0, 0) = inv_J_2x2(0, 1); // d_xi/d_x
                    xsi_local(1, 0) = inv_J_2x2(1, 1); // d_eta/d_x
                }
            }
        }

        // Computation of the global derivatives of the shape functions (dN/dx, dN/dy, dN/dz)
        // dN/dx = (dN/dxi * dxi/dx) + (dN/det * det/dx)
        // dN/dy = (dN/dxi * dxi/dy) + (dN/det * det/dy)
        // dN/dz = (dN/dxi * dxi/dz) + (dN/det * det/dz)
        // shp(j,k) = sh[j] where j is global derivative (0=x, 1=y, 2=z) and k is node index
        for (int k = 0; k < 3; k++)
        {
            // Iterate over nodes
            // Calculate sh = [dN_k/dx, dN_k/dy, dN_k/dz]
            double sh_x = shp(0, k) * xsi_local(0, 0) + shp(1, k) * xsi_local(1, 0); // dN_k/dx
            double sh_y = shp(0, k) * xsi_local(0, 1) + shp(1, k) * xsi_local(1, 1); // dN_k/dy
            double sh_z = shp(0, k) * xsi_local(0, 2) + shp(1, k) * xsi_local(1, 2); // dN_k/dz

            // Assign sh to the correct row in shp
            shp(0, k) = sh_x; // dN_k/dx
            shp(1, k) = sh_y; // dN_k/dy
            shp(2, k) = sh_z; // dN_k/dz
        }
    }
    else if (iflag == 4)
    {
        // Local 2nd order derivatives of the shape functions
        // All are zero for linear triangular elements
        shp(4, 0) = 0.0; // d2N1/dxi2
        shp(4, 1) = 0.0; // d2N2/dxi2
        shp(4, 2) = 0.0; // d2N3/dxi2

        shp(5, 0) = 0.0; // d2N1/dxidet
        shp(5, 1) = 0.0; // d2N2/dxidet
        shp(5, 2) = 0.0; // d2N3/dxidet

        shp(6, 0) = 0.0; // d2N1/det2
        shp(6, 1) = 0.0; // d2N2/det2
        shp(6, 2) = 0.0; // d2N3/det2

        // Computation of the local 2nd derivatives of the global coordinates (xs)
        // All are zero for linear triangular elements
        for (int i = 0; i < 3; i++)
        {
            // Iterate over global coordinates (x, y, z)
            for (int j = 4; j < 7; j++)
            {
                // Iterate over 2nd derivatives
                xs(i, j) = 0.0;
            }
        }
    }
}

// Transformation matrix for 3-node shell elements
Eigen::MatrixXd getTransformationMatrixShell(
    const Node &n1_node,
    const Node &n2_node,
    const Node &n3_node)
{
    Eigen::Vector3d n1(n1_node[0], n1_node[1], n1_node[2]);
    Eigen::Vector3d n2(n2_node[0], n2_node[1], n2_node[2]);
    Eigen::Vector3d n3(n3_node[0], n3_node[1], n3_node[2]);

    Eigen::Vector3d e1_vec, e2_vec, e3_vec;
    double dl, dd;
    Eigen::Vector3d xno = Eigen::Vector3d::Zero();

    double xi = 0.0;
    double et = 0.0;

    Eigen::MatrixXd xl = Eigen::MatrixXd::Zero(3, 3);
    Eigen::MatrixXd xs = Eigen::MatrixXd::Zero(3, 7);
    Eigen::MatrixXd shp = Eigen::MatrixXd::Zero(7, 3);

    Eigen::Matrix3d a = Eigen::Matrix3d::Identity();

    Eigen::Matrix3d tm = Eigen::Matrix3d::Zero();
    Eigen::MatrixXd tmg = Eigen::MatrixXd::Zero(18, 18);

    // Copy xg (global coordinates) into xl (local coordinates for shape3tri)
    // This mimics the Fortran behavior where xg is effectively a 3x3 matrix of node coordinates
    xl.col(0) = n1;
    xl.col(1) = n2;
    xl.col(2) = n3;

    int iflag = 2;

    shape3tri(xi, et, xl, xno, xs, shp, iflag);

    dl = xno.norm();
    if (dl < 1e-12)
    {
        std::cerr << "Warning: Normal vector (xno) has zero length in getTransformationMatrixShell. Returning identity matrix." << std::endl;
        return Eigen::MatrixXd::Identity(18, 18);
    }
    xno.normalize();

    dd = a.col(0).dot(xno);
    if (std::abs(dd) > 0.999999999536)
    {
        dd = a.col(2).dot(xno);
        e1_vec = a.col(2) - dd * xno;
    }
    else
    {
        e1_vec = a.col(0) - dd * xno;
    }

    dl = e1_vec.norm();
    if (dl < 1e-12)
    {
        std::cerr << "Warning: e1_vec has zero length in getTransformationMatrixShell. Returning identity matrix." << std::endl;
        return Eigen::MatrixXd::Identity(18, 18);
    }
    e1_vec.normalize();

    e2_vec = xno.cross(e1_vec);

    dl = e2_vec.norm();
    if (dl < 1e-12)
    {
        std::cerr << "Warning: e2_vec has zero length in getTransformationMatrixShell. Returning identity matrix." << std::endl;
        return Eigen::MatrixXd::Identity(18, 18);
    }
    e2_vec.normalize();

    e3_vec = xno; // e3 is the normal vector

    tm.row(0) = e1_vec.transpose();
    tm.row(1) = e2_vec.transpose();
    tm.row(2) = e3_vec.transpose();

    for (int i = 0; i < 6; i++)
    {
        tmg.block<3, 3>(i * 3, i * 3) = tm;
    }

    return tmg;
}