#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EMCC="${EMCC:-/Users/mohamed/Applications/emsdk/upstream/emscripten/emcc}"
export EMSDK_PYTHON="${EMSDK_PYTHON:-/Users/mohamed/Applications/emsdk/python/3.13.3_64bit/bin/python3}"

# predicates.c must NOT be compiled with fast-math: its exact arithmetic
# depends on strict IEEE double semantics (emcc -O3 preserves them).
"$EMCC" "$SCRIPT_DIR/mesher.cpp" "$SCRIPT_DIR/predicates.c" \
  -o "$SCRIPT_DIR/built/mesher.js" \
  -O3 \
  -flto \
  -DNDEBUG \
  -Wno-deprecated-non-prototype \
  -s ASSERTIONS=0 \
  -s ALLOW_MEMORY_GROWTH \
  -s MODULARIZE \
  -s EXPORT_ES6 \
  -s EXPORTED_FUNCTIONS=_malloc,_free,_mesh_polygon,_mesh_num_points,_mesh_num_triangles,_mesh_points,_mesh_triangles \
  -s EXPORTED_RUNTIME_METHODS=HEAPF64,HEAP32
