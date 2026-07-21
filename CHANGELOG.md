# Changelog

## 3.3.0 - 2026-07-21

- Added end-to-end shell modeling and analysis with polygon geometry, triangle meshing, shell design properties, unified frame and shell solving, and supporting UI workflows.

## 3.2.0 - 2026-07-08

- Added Eurocode-based design components for concrete, steel, and timber members.

## 3.1.0 - 2026-05-25

- Added a C++/WASM-backed linear solver with TypeScript wrapper tests.
- Added support reaction post-processing and viewer/report integration.
- Improved viewer controls for 3D/2D navigation, local axes, extrusion, deformation scale, and point/line indices.
- Reoriented modeling around vertical Z and updated loads, supports, and results to match.
- Made `@awatif/components` and `@awatif/ui` more self-contained for npm publishing.
- Fixed key geometry, camera, support direction, and internal-force sign convention issues.

## 3.0.0 - 2026-04-13

- Added a new three-layer data model based on semantic, smooth, and discrete representations, enabling more general, flexible, and scalable structural modeling.
- Added a component-based architecture that improves modularity and collaboration, making it easier to organize features, extend the platform, and develop workflows in parallel.
- Added an integrated end-to-end workflow that brings modeling, analysis, design, and reporting together in one unified environment.

## 2.0.0 - 2025-09-26

- Added a FEM solver capable of simulating both membrane and shell elements.
- Added a fast and efficient triangulation-based meshing algorithm.
- Enhanced the user interface with support for color maps, interactive tables, and automated reports.
- Added a drawing module that allows the creation of polylines.
- Added a new example, Slab Designer, that demonstrates all these capabilities in practice.

## 1.0.0 - 2024-07-20

- Added an efficient data structure that uses maps instead of arrays.
- Added a well-tested FEM solver that simulates both bar and beam elements. However, it is not possible to mix them in the same model. This will be resolved in future updates.
- Added a well-optimized and refactored 3D viewer with simple parameters and settings panels as core components. Additional components can be added as plugins to the app.
- Added multiple examples that demonstrate the platform's capabilities.
- Added a website that serves as a presentation and documentation of the platform.
